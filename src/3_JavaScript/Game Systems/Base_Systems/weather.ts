/*
888       888                   888    888
888   o   888                   888    888
888  d8b  888                   888    888
888 d888b 888  .d88b.   8888b.  888888 88888b.   .d88b.  888d888
888d88888b888 d8P  Y8b     "88b 888    888 "88b d8P  Y8b 888P"
88888P Y88888 88888888 .d888888 888    888  888 88888888 888
8888P   Y8888 Y8b.     888  888 Y88b.  888  888 Y8b.     888
888P     Y888  "Y8888  "Y888888  "Y888 888  888  "Y8888  888


*/

interface setupClimate {
  maxTemp: number[];
  minTemp: number[];
  devTemp: number[];
  daysRainA: number[];
  daysRainB: number[];
  daysRainC: number[];
  daysRainD: number[];
  snowfall: number[];
  snowGround: number[]
}

interface setupWeather {
  seedGen: { (): void };
  daySummary: { (date?: 0 | date): wxObject };
  dist: { (num: number, dev: number): number };
  maxMin: { (wx: wxObject): [number, number, number] };
  curTemp: { (wx?: 0 | wxObject): number };
  tempPrint: { (): twee };
  dayWeather: { (input?: 0 | wxObject): { sky: string, con: string, mHour: number, leng: number } };
  curWeather: { (): twee };
  cloudWord: { (cld: string): string };
  wxWord: { (code: string): string };
  seed: any[];
}


setup.weather = {} as setupWeather;
setup.climate = {} as setupClimate;

setup.weather = {
  seed: [],
  // generates the seed used to randomize weather
  seedGen(): void {
    const ran = function() {
      return random(0, 99);
    };
    setup.weather.seed = [];
    setup.weather.seed.push(ran());
    for (let i = 1; i <= 13; i++) {
      const month: (number | number[]) [] = [];
      month.push(i);
      for (let j = 1; j <= 4; j++) {
        const week: number[] = [];
        week.push(j);
        for (let k = 0; k < 7; k++) {
          week.push(ran());
        }
        month.push(week);
      }
      setup.weather.seed.push(month);
    }
  },
  // returns the wx object for the day
  daySummary(date: 0|date = 0): wxObject {
    const ᛔ = State.active.variables;
    let day;
    let week;
    let month;
    if (Array.isArray(date)) {
      day = date[0];
      week = date[1];
      month = date[2];
    } else if (date === 0) {
      day = ᛔ.date[0];
      week = ᛔ.date[1];
      month = ᛔ.date[2];
    }
    let tSeed;
    if (day < 7) {
      tSeed = setup.weather.seed[month][week][(day + 1)];
    } else if (day === 7 && week !== 4) {
      tSeed = setup.weather.seed[month][(week + 1)][1];
    } else {
      tSeed = setup.weather.seed[(month + 1)][1][1];
    }
    const wx: wxObject = {
      seed: setup.weather.seed[month][week][day],
      max: setup.climate.maxTemp[month],
      min: setup.climate.minTemp[month],
      dev: setup.climate.devTemp[month],
      precip: [
        setup.climate.daysRainA[month],
        setup.climate.daysRainB[month],
        setup.climate.daysRainC[month],
        setup.climate.daysRainD[month],
      ],
      snowfall: setup.climate.snowfall[month],
      snowGround: setup.climate.snowGround[month],
      tSeed,
    };
    return wx;
  },
  // math function for interpolating deviation
  dist(num: number, dev: number): number {
    const co = [2, 16, 50, 84, 98]; // sets values for standard deviations starting at -3σ to -2σ group
    if (num < co[0]) {
      if (num === 0) {
        return dev * -2.6;
      } else {
        return dev * -2.2;
      }
    } else if (num < co[1]) {
      let x = (-1 / 14) * (num - 1);
      x += -1;
      return dev * x;
    } else if (num < co[2]) {
      const x = (-1 / 34) * (num - 1);
      return dev * x;
    } else if (num < co[3]) {
      const x = (1 / 34) * (num - 1);
      return dev * x;
    } else if (num < co[4]) {
      let x = (1 / 14) * (num - 1);
      x += 1;
      return dev * x;
    } else {
      if (num === 99) {
        return dev * 2.6;
      } else {
        return dev * 2.2;
      }
    }
  },
  // calculates max-min temp for the day
  maxMin(wx: wxObject): [number, number, number] {
    const maxTemp = Math.round(wx.max + setup.weather.dist(wx.seed, wx.dev));
    const minTemp = Math.round(wx.min + setup.weather.dist(wx.seed, wx.dev));
    const tomMin = Math.round(wx.min + setup.weather.dist(wx.tSeed, wx.dev));
    return [maxTemp, minTemp, tomMin];
  },
  // calculates current temperature based on time and max/min
  curTemp(wx: 0|wxObject = 0): number {
    if (wx === 0) {
      wx = setup.weather.daySummary();
    }
    const maxMin = setup.weather.maxMin(wx);
    const hr = State.active.variables.time[0];
    const min = State.active.variables.time[1];
    const month = State.active.variables.date[2];
    const t = hr * 60 + min;
    let temp;
    let x;
    let y;
    const dif = maxMin[0] - maxMin[1];
    const cum = [
      [0, 0],
      [8, 18], // jan
      [8, 18],
      [7, 19], // mar
      [6, 19],
      [6, 19], // may
      [5, 20],
      [5, 20], // sol
      [5, 20],
      [7, 20], // aug
      [7, 20],
      [7, 19], // oct
      [7, 19],
      [8, 18], // dec
    ];
    const per = [
      0.75,
      0.25,
      0.1,
      0.9,
    ];
    const time = {
      min: cum[month][0] * 60,
      mid: Math.round((840 - (cum[month][0] * 60)) / 2 + 840),
      max: 840,
      set: cum[month][1] * 60,
    };
    if (t < time.min) {
      x = 1440 - time.set + time.min;
      y = (dif * per[3]) / x;
      temp = maxMin[0] - Math.round((t + 1440 - time.set) * y);
    } else if (t < time.mid) {
      x = time.mid - time.min;
      y = (dif * per[0]) / x;
      temp = Math.round((t - time.min) * y) + maxMin[1];
    } else if (t < time.max) {
      x = time.max - time.mid;
      y = (dif * per[1]) / x;
      temp = Math.round((t - time.mid) * y) + maxMin[1];
    } else if (t < time.set) {
      x = time.set - time.max;
      y = (dif * per[2]) / x;
      temp = maxMin[0] - Math.round((t - time.max) * y);
    } else {
      x = 1440 - time.set + time.min;
      y = ((maxMin[0] - maxMin[2]) * per[3]) / x;
      temp = maxMin[0] - Math.round((t - time.set) * y);
    }
    return temp;
  },
  // generates twee to display temperature
  tempPrint(): twee {
    let temp = setup.weather.curTemp();
    let outs: string;
    if (State.active.variables.AW.metric) {
      // check for down syndrome°
      temp = Math.round((temp - 32) * 5 / 9);
      const temp2 = Math.round((temp + 459.67) * 5 / 9);
      outs = '<span style="font-size:0.85rem;">' + temp;
      outs += "°C</span>";
      outs += '<span style="font-size:0.6rem;"> ';
      outs += temp2;
      outs += "K</span>";
    } else {
      outs = temp + "°F";
    }
    return outs;
  },
  // generates the day's weather
  dayWeather(input: 0 | wxObject = 0): {sky: string, con: string, mHour: number, leng: number} {
    let wx: {
      seed: number;
      max: number;
      min: number;
      dev: number;
      precip: number[];
      snowfall: number;
      snowGround: number;
      tSeed: number;
    };
    if (input === 0) {
      wx = setup.weather.daySummary();
    } else {
      wx = clone(input);
    }
    const hr = State.active.variables.time[0];
    const min = State.active.variables.time[1];
    const month = State.active.variables.date[2];
    let mSeed = ((wx.seed + 1) % 10) + 1;
    const p = wx.precip;
    const m = Math.floor(wx.seed / 10);
    if (m < 3) {
      // don't need to add anything, 1 to 10
    } else if (m < 6) {
      mSeed += 10; // for 11 to 20
    } else if (m < 9) {
      mSeed += 20; // for 21 to 30
    } else {
      if (wx.tSeed < 33) {
        // nothing again
      } else if (wx.tSeed < 66) {
        mSeed += 10;
      } else {
        mSeed += 20; // tiny bias to good wx
      }
    }
    // we now have mSeed with a value of 1 to 30, to compare against climate day averages.
    const sSeed = (wx.seed + wx.tSeed) % 10;
    // and another seed
    const exSeed = (wx.seed * wx.tSeed) % 24;
    // and the last seed... lol
    let sky: string = "CLR";
    let con: string = "";
    let mHour = 15;
    let leng = 360;
    if (mSeed <= p[3]) {
      switch (sSeed) {
        case 0:
        case 1:
        case 2:
        case 3:
          sky = "BKN";
          con = "+TSRA";
          mHour = exSeed;
          leng = 120;
          break;
        case 4:
        case 5:
        case 6:
          sky = "BKN";
          con = "TSRA";
          mHour = exSeed;
          leng = 120;
          break;
        case 7:
        case 8:
        case 9:
        default:
          sky = "OVC";
          con = "+RA";
          mHour = exSeed;
          leng = 180;
          break;
      }
    } else if (mSeed <= p[2]) {
      switch (sSeed) {
        case 0:
        case 1:
        case 2:
        case 3:
          sky = "BKN";
          con = "-TSRA";
          leng = 90;
          break;
        case 5:
        case 6:
        case 7:
          sky = "BKN";
          con = "+SHRA";
          leng = 90;
          break;
        case 8:
        case 9:
        default:
          sky = "BKN";
          con = "SHRA";
          leng = 90;
      }
    } else if (mSeed <= p[1]) {
      switch (sSeed) {
        case 0:
        case 1:
        case 2:
          sky = "OVC";
          con = "RA";
          mHour = exSeed;
          leng = 240;
          break;
        case 3:
        case 4:
        case 5:
          sky = "OVC";
          con = "-RA";
          mHour = exSeed;
          leng = 240;
          break;
        case 6:
        case 7:
        case 8:
        case 9:
        default:
          sky = "SCT";
          con = "SHRA";
          leng = 90;
          break;
      }
    } else if (mSeed <= p[0]) {
      if (sSeed < 4) {
        sky = "SCT";
        con = "-SHRA";
        leng = 60;
      } else {
        sky = "FEW";
        con = "-SHRA";
        leng = 60;
      }
    } else {
      if (sSeed === 0) {
        sky = "BKN";
        con = "NA";
      } else if (sSeed === 1) {
        sky = "CLR";
        con = "FG";
        mHour = 7;
        leng = 60;
      } else if (sSeed < 4) {
        sky = "CLR";
        con = "BR";
        mHour = 7;
        leng = 40;
      } else if (sSeed < 8) {
        sky = "FEW";
        con = "NA";
      } else {
        sky = "SCT";
        con = "NA";
      }
    }
    return {sky, con, mHour, leng};
  },
  // generates twee to display current weather
  curWeather(): twee {
    const wx = setup.weather.daySummary();
    const weather = setup.weather.dayWeather(wx);
    let temp = setup.weather.curTemp(wx);
    if (State.active.variables.AW.metric) {
      // check for down syndrome°
      temp = Math.round((temp - 32) * 5 / 9);
    }
    let time = State.active.variables.time[0] * 60;
    time += State.active.variables.time[1];
    const cen = weather.mHour * 60;
    let code = "NA";
    let sky = "CLR";
    const t = {
      start: cen - (weather.leng + Math.floor(weather.leng / 2)),
      main: cen - weather.leng,
      calm: cen + weather.leng,
      end: cen + weather.leng + Math.floor(weather.leng / 2),
    };
    const cloudDec = function(cld) {
      switch (cld) {
        case "CLR":
          return "CLR";
        case "FEW":
          return "FEW";
        case "SCT":
          return "FEW";
        case "BKN":
          return "SCT";
        case "OVC":
          return "BKN";
        default:
          aw.con.warn(`invalid cloud value ${cld} given to cloudDec in curWeather function.`);
          return "FEW";
      }
    };
    if (time < t.start) {
      code = "NA";
      sky = cloudDec(weather.sky);
    } else if (time < t.main) {
      code = weather.con;
      sky = weather.sky;
    } else if (time < t.calm) {
      code = weather.con;
      sky = weather.sky;
    } else if (time < t.end) {
      code = weather.con;
      sky = weather.sky;
    } else {
      code = "NA";
      sky = cloudDec(weather.sky);
    }
    sky = setup.weather.cloudWord(sky),
    code = setup.weather.wxWord(code);
    return `<span id="altergale" class="quest" style="color:#7fdfff;font-weight:800;">The weather outside is ${sky}${code}. The temperature is ${temp} degrees.</span>`;
  },
  // returns plain text for sky condition
  cloudWord(cld: string): string {
    const fook = {
      CLR: "clear skies",
      FEW: "mostly sunny skies",
      SCT: "partly cloudy skies",
      BKN: "mostly cloudy skies",
      OVC: "cloudy skies",
    };
    return fook[cld] || `error (${cld})`;
  },
  // returns plain text for current weather
  wxWord(code: string): string {
    const fook = {
      "+TSRA": " with heavy showers and ominous thunderstorms",
      "TSRA": " with heavy showers and thunderstorms",
      "-TSRA": " with showers with small thunderstorms",
      "+SHRA": " with heavy drenching rainshowers",
      "SHRA": " with a mix of light and heavy rainshowers",
      "-SHRA": " with light rainshowers",
      "+RA": " with continuous rain with heavy rainshowers",
      "RA": " with continuous rain",
      "-RA": " with dreary light rain",
      "BR": " with a thin patchy fog",
      "FG": " with a thick dense fog",
      "NA": " ",
    };
    return fook[code] || `error (${code})`;
  },
};

setup.climate = {
  maxTemp: [
    -1,
    39,
    43,
    52,
    63,
    70,
    77,
    77,
    80,
    79,
    73,
    63,
    53,
    42,
  ],
  minTemp: [
    -1,
    23,
    26,
    32,
    41,
    49,
    58,
    58,
    61,
    60,
    53,
    43,
    35,
    26,
  ],
  devTemp: [
    -1,
    5,
    4,
    4,
    3,
    3,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    6,
  ],
  daysRainA: [
    -1,
    15,
    14,
    16,
    14,
    15,
    13,
    13,
    13,
    11,
    10,
    10,
    12,
    15,
  ],
  daysRainB: [
    -1,
    7,
    7,
    8,
    8,
    10,
    9,
    9,
    9,
    7,
    6,
    6,
    7,
    7,
  ],
  daysRainC: [
    -1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    2,
    2,
    1,
    2,
    2,
  ],
  daysRainD: [
    -1,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
  ],
  snowfall: [
    -1,
    18,
    17,
    9,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    13,
  ],
  snowGround: [
    -1,
    12,
    10,
    4,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    9,
  ],
};
