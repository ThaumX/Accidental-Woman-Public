
//  ██████╗  ██████╗  ██████╗ ██████╗
//  ██╔══██╗██╔═══██╗██╔═══██╗██╔══██╗
//  ██████╔╝██║   ██║██║   ██║██████╔╝
//  ██╔══██╗██║   ██║██║   ██║██╔══██╗
//  ██████╔╝╚██████╔╝╚██████╔╝██████╔╝
//  ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝
//
//   ██████╗ █████╗ ██╗      ██████╗
//  ██╔════╝██╔══██╗██║     ██╔════╝
//  ██║     ███████║██║     ██║
//  ██║     ██╔══██║██║     ██║
//  ╚██████╗██║  ██║███████╗╚██████╗
//   ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝



Macro.add("pcBreastCalc", {
  handler() {
    setup.breastCalc();
  },
});

// calculates milk capacity of a breast
setup.calcMilkCap = function(size: number, lact: number): number {
  let vol = Math.floor(size / 200); // base capacity is 1oz per 200cc of breast
  if (vol > 1) {
    vol += 3; // adjustment to bring oz in-line with empirical values
  }
  const mod = [0, 0.5, 1, 1.3, 1.8, 2.4, 3]; // lactation ability capacity modifier
  const maxes = [0, 5, 15, 30, 75, 150, 500]; // soft caps
  const smax = [0, 10, 30, 60, 250, 600, 2500]; // hard caps
  vol = Math.round(vol * mod[lact]); // change capacity based on mod
  if (vol > maxes[lact]) { // if size exceeds soft cap...
    vol = maxes[lact]; // set at soft cap
    const lu = Math.round(maxes[lact] * (200 / mod[lact])); // calc soft cap cc val
    const lb = Math.min(Math.max(0, (Math.round(((size - lu) / (50000 - lu)) * smax[lact]) - maxes[lact])), (smax[lact] - maxes[lact])); // calculate extra capacity based on breast size
    vol += lb; // add lact bonus to capped value
    aw.con.info(`BREAST MILK CAPACITY:\nlact ability ${lact} soft cap of ${maxes[lact]}oz reached.\nDiminished returns, adds ${lb}oz to total capacity (${vol}oz).`);
  }
  vol *= 30; // convert to ml from floz
  if (aw.chad.springer) {
    vol *= 4;
  }
  return vol;
};

// calculates breast values
setup.breastCalc = function(): void {
  const PC = ↂ.pc;
  let body = ↂ.pc.body;
  const bandCase = [0, 30, 32, 34, 36, 38, 40];
  let band = bandCase[body.shoulders] || 34;
  band += (2 * body.weight) - 4;
  body.tits.band = band as braBandType;
  const sizeSiliconed = body.tits.base.size + body.tits.silicone;
  body.lactCapacity = setup.calcMilkCap(body.tits.base.size, body.lactation); //per breast capacity
  aw.con.info(`Calculated PC Breastmilk Capacity: ${body.lactCapacity}ml per breast.`);
  body.tits.lact.max = body.tits.base.size + Math.floor(body.lactCapacity / 3); // less than 1to1 size incr
  const size = Math.round(sizeSiliconed / 10);
  let cup;
  const sizeCase = [15, 25, 30, 35, 37, 39, 41, 44, 46, 49, 52, 56, 59, 63, 67, 71, 76, 80, 85, 90, 96, 101, 107, 113, 119, 126, 132, 139, 146, 154, 161, 169, 177, 177, 185, 194, 202, 211, 220, 230, 239, 249, 259, 269, 280, 290, 301, 312, 324, 335, 347, 359, 371, 384, 396, 409, 422, 436, 449, 463, 477, 491, 506, 520, 535, 550, 566, 581, 597, 613, 629, 646, 662, 679, 696, 714, 731, 749, 767, 785, 804, 823, 841, 860, 880, 898, 918, 938, 958, 978, 999, 1019, 1040, 1062, 1082, 1104, 1126, 1148, 1170, 1193, 1215, 1238, 1262, 1284, 1308, 1332, 1356, 1380, 1405, 1429, 1454, 1480, 1504, 1530, 1556, 1582, 1608, 1635, 1661, 1688, 1716, 1742, 1770, 1798, 1826, 1854, 1883, 1911, 1940, 1970, 1998, 2028, 2058, 2088, 2118, 2149, 2179, 2210, 2242, 2272, 2304, 2336, 2368, 2400, 2433, 2465, 2498, 2532, 2564, 2598, 2632, 2666, 2700, 2735, 2769, 2804, 2840, 2874, 2910, 2946, 2982, 3018, 3055, 3091, 3128, 3166, 3202, 3240, 3278, 3316, 3354, 3393, 3431, 3470, 3510, 3548, 3588, 3628, 3668, 3708, 3749, 3789, 3830, 3872, 3912, 3954, 3996, 4038, 4080, 4123, 4165, 4208, 4252, 4294, 4338, 4382, 4426, 4470, 4515, 4559, 4604, 4650, 4694, 4740, 4786, 4832, 4878, 4925, 4971, 5018, 5066, 5112, 5160, 5208, 5256, 5304, 5353, 5401, 5450, 5500, 5548, 5598, 5648, 5698, 5748, 5799, 5849, 5900, 5952, 6002, 6054, 6106, 6158, 6210, 6263, 6315, 6368];
  if (size < 13) {
    cup = -50;
  } else {
    cup = 99;
    for (let i = 0; i < sizeCase.length; i++) {
      if (size < sizeCase[i]) {
        cup = i;
        break;
      }
    }
  }
  const bm = (17 - (band / 2)) * 3;
  const cupAdj = cup + bm;
  let cupStart, cupStop, cupLet, cupFraq, braLet;
  if (cup < 0) {
    body.tits.base.cupNum = -1;
    body.tits.base.cupRaw = -1;
    body.tits.base.cup = "nonexistent";
    body.tits.base.bra = "playing dress-up";
  } else if (cup === 0) {
    body.tits.base.cupNum = 0;
    body.tits.base.cupRaw = 0;
    body.tits.base.cup = "budding";
    body.tits.base.bra = band + "AAA";
  } else {
    body.tits.base.cupNum = cupAdj;
    body.tits.base.cupRaw = cup;
    cupStart = Math.round((cup + 2) / 3);
    cupStop = cupStart + 1;
    if (cupStart === 1) {
      cupStart = 0;
    }
    if (cupStop === 1) {
      cupStop += 1;
    }
    let string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
    cupLet = string.slice(cupStart, cupStop);
    cupFraq = ((cup + 2) / 3) % 1;
    if (cupStop > 54) {
      // omega
      cupLet = "&#8486;&#8486;" + cupLet;
    } else if (cupStop > 28) {
      // super
      cupLet = "&#8486;" + cupLet;
    }
    if (cupFraq !== 0) {
      cupFraq = Math.round(cupFraq);
      if (cupFraq === 1) {
        cupLet = "small " + cupLet;
      } else {
        cupLet = "large " + cupLet;
      }
    }
    cupLet += "-cup";
    body.tits.base.cup = cupLet;
    if (cupAdj <= 0) {
      body.tits.base.bra = band + "AAA";
    } else {
      cupStart = Math.round((cupAdj + 2) / 3);
      cupStop = cupStart + 1;
      if (cupStart <= 0) {
        braLet = "AAA";
      } else {
        if (cupStart === 1) {
          cupStart = 0;
        }
        if (cupStop === 1) {
          cupStop += 1;
        }
        string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
        braLet = string.slice(cupStart, cupStop);
        if (cupStop > 54) {
          // omega
          braLet = "&#8486;&#8486;" + braLet;
        } else if (cupStop > 28) {
          // super
          braLet = "&#8486;" + braLet;
        }
        body.tits.base.bra = band + braLet;
      }
    }
  }
  aw.S("pc");
  setup.lactBreastCalc();
};

// calculates lactation breast size values
setup.lactBreastCalc = function(): void {
  const PC = ↂ.pc;
  const body = PC.body;
  const band = body.tits.band;
  let size;
  body.tits.lact.size = Math.min((body.tits.base.size + Math.round(PC.status.milkStore / 3)), body.tits.lact.max);
  size = Math.round((body.tits.lact.size + body.tits.silicone) / 10);
  if (isNaN(size)) {
    alert(`Something's fucky - milkStore: ${PC.status.milkStore}, lact.size: ${size}.`);
  }
  let cup;
  const sizeCase = [15, 25, 30, 35, 37, 39, 41, 44, 46, 49, 52, 56, 59, 63, 67, 71, 76, 80, 85, 90, 96, 101, 107, 113, 119, 126, 132, 139, 146, 154, 161, 169, 177, 177, 185, 194, 202, 211, 220, 230, 239, 249, 259, 269, 280, 290, 301, 312, 324, 335, 347, 359, 371, 384, 396, 409, 422, 436, 449, 463, 477, 491, 506, 520, 535, 550, 566, 581, 597, 613, 629, 646, 662, 679, 696, 714, 731, 749, 767, 785, 804, 823, 841, 860, 880, 898, 918, 938, 958, 978, 999, 1019, 1040, 1062, 1082, 1104, 1126, 1148, 1170, 1193, 1215, 1238, 1262, 1284, 1308, 1332, 1356, 1380, 1405, 1429, 1454, 1480, 1504, 1530, 1556, 1582, 1608, 1635, 1661, 1688, 1716, 1742, 1770, 1798, 1826, 1854, 1883, 1911, 1940, 1970, 1998, 2028, 2058, 2088, 2118, 2149, 2179, 2210, 2242, 2272, 2304, 2336, 2368, 2400, 2433, 2465, 2498, 2532, 2564, 2598, 2632, 2666, 2700, 2735, 2769, 2804, 2840, 2874, 2910, 2946, 2982, 3018, 3055, 3091, 3128, 3166, 3202, 3240, 3278, 3316, 3354, 3393, 3431, 3470, 3510, 3548, 3588, 3628, 3668, 3708, 3749, 3789, 3830, 3872, 3912, 3954, 3996, 4038, 4080, 4123, 4165, 4208, 4252, 4294, 4338, 4382, 4426, 4470, 4515, 4559, 4604, 4650, 4694, 4740, 4786, 4832, 4878, 4925, 4971, 5018, 5066, 5112, 5160, 5208, 5256, 5304, 5353, 5401, 5450, 5500, 5548, 5598, 5648, 5698, 5748, 5799, 5849, 5900, 5952, 6002, 6054, 6106, 6158, 6210, 6263, 6315, 6368];
  if (size < 13) {
    cup = -50;
  } else {
    cup = 99;
    for (let i = 0; i < sizeCase.length; i++) {
      if (size < sizeCase[i]) {
        cup = i;
        break;
      }
    }
  }
  const bm = (17 - (band / 2)) * 3;
  const cupAdj = cup + bm;
  let cupStart, cupStop, cupLet, cupFraq, braLet;
  if (cup < 0) {
    body.tits.lact.cupNum = -1;
    body.tits.lact.cup = "nonexistent";
    body.tits.lact.bra = "playing dress-up";
  } else if (cup === 0) {
    body.tits.lact.cupNum = 0;
    body.tits.lact.cup = "budding";
    body.tits.lact.bra = band + "AAA";
  } else {
    body.tits.lact.cupNum = cupAdj;
    cupStart = Math.round((cup + 2) / 3);
    cupStop = cupStart + 1;
    if (cupStart === 1) {
      cupStart = 0;
    }
    if (cupStop === 1) {
      cupStop += 1;
    }
    let string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
    cupLet = string.slice(cupStart, cupStop);
    if ("string" !== typeof cupLet || cupLet === "") {
      alert("non-string cupLet!");
    }
    if (cupStop > 54) {
      // omega
      cupLet = "&#8486;&#8486;" + cupLet;
    } else if (cupStop > 28) {
      // super
      cupLet = "&#8486;" + cupLet;
    }
    cupFraq = ((cup + 2) / 3) % 1;
    if (cupFraq !== 0) {
      cupFraq = Math.round(cupFraq);
      if (cupFraq === 1) {
        cupLet = "small " + cupLet;
      } else {
        cupLet = "large " + cupLet;
      }
    }
    cupLet += "-cup";
    body.tits.lact.cup = cupLet;
    if (cupAdj <= 0) {
      body.tits.lact.bra = band + "AAA";
    } else {
      cupStart = Math.round((cupAdj + 2) / 3);
      cupStop = cupStart + 1;
      if (cupStart <= 0) {
        braLet = "AAA";
      } else {
        if (cupStart === 1) {
          cupStart = 0;
        }
        if (cupStop === 1) {
          cupStop += 1;
        }
        string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
        braLet = string.slice(cupStart, cupStop);
        if (cupStop > 54) {
          // omega
          braLet = "&#8486;&#8486;" + braLet;
        } else if (cupStop > 28) {
          // super
          braLet = "&#8486;" + braLet;
        }
        body.tits.lact.bra = band + braLet;
      }
    }
  }
  aw.S("pc");
};

// calculates breast shape based on input and returns real shape
setup.calcBreastShape = function({ size, silicone, weight, band, shape,
}: { size: number, silicone: number, weight: number, band: number, shape: string } = { size, silicone, weight, band, shape }): string {
  let res = shape;
  if ((size >= 700 || weight > 4) && shape === "athletic") {
    if (size < 800 || silicone > 0) {
      res = "round";
    } else {
      res = "thin";
    }
  }
  if (res === "round" && size >= 800 && silicone === 0) {
    res = "relaxed";
  }
  if (shape === "teardrop" && size > (band * 40)) {
    res = "bell";
  }
  if (shape === "relaxed" && size >= 1000) {
    res = "thin";
  }
  if (size < (band * 18) && shape !== "relaxed" && shape !== "thin") {
    res = "athletic";
  } else if (size < (band * 25) && shape !== "athletic" && shape !== "relaxed" && shape !== "thin") {
    if (band < 32) {
      res = "athletic";
    } else {
      res = "wideset";
      aw.con.info(`breasts set to wideset from function. input values: size: ${size} shape: ${shape} band: ${band} weight: ${weight} silicone: ${silicone}`);
    }
  }
  return res;
};
