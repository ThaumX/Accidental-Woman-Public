/*********************************************************/
/*  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄   */
/* ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌  */
/*  ▀▀▀▀█░█▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀   */
/*      ▐░▌          ▐░▌     ▐░▌▐░▌ ▐░▌▐░▌▐░▌            */
/*      ▐░▌          ▐░▌     ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄   */
/*      ▐░▌          ▐░▌     ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌  */
/*      ▐░▌          ▐░▌     ▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀   */
/*      ▐░▌          ▐░▌     ▐░▌       ▐░▌▐░▌            */
/*      ▐░▌      ▄▄▄▄█░█▄▄▄▄ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄   */
/*      ▐░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌  */
/*       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀   */
/*.......................................................*/
/* Functions and Macros for controlling game time        */
/*********************************************************/

interface setupTime {
  daytime: () => "N" | "D" | "SR" | "SS";
  timeBackup: time;
  dateBackup: date;
  saver: () => void;
  add: (addMin: number, disable?: boolean | setupTimeAddArgs) => void;
  set: (hour: number, min?: number, newDay?: boolean, stats?: boolean) => void;
  chunk: (min: number) => void;
  dateChange: () => void;
  schedCheck: () => void;
  missedCheck: () => void;
  missed: (d: number, w: number) => number;
  socialCount: () => number;
  dayplans: (date?: false | date) => string;
  dayplansFull: (date?: number | false) => twee;
  upcoming: (date?: boolean | date) => twee;
  reminder: (msgs: string[]) => void;
  status: (count: number) => void;
  after: (hr: number | time, min?: number, aft?: boolean) => boolean;
  until: (hr: time | number, min?: number, aft?: boolean) => number;
  dayName: (d?: "no" | number) => string;
  monthName: (m?: "no" | number) => string;
  cycle: () => void;
  dif: (timeA: time, timeB: time) => number;
  now: () => [number, number, boolean];
  dateDisplay: (date?: false | date) => twee;
  format: (tim: time | number) => twee;
  toSleepMessage: () => false | string;
  appointmentAlert: (appt: AppointmentInfo) => string;
  addictNeedIncrease: () => void;
  withdrawl: (drug: string, names: string) => void;
  create: () => [number, number, number, number, number, number];
  toVal: (time: [number, number, boolean] | [number, number], date?: [number, number, number, number] | [number, number, number]) => number;
  toArray: (val: number) => [number, number];
  dateToVal: (date: [number, number, number, number] | [number, number, number]) => number;
  dateToArray: (val: number) => [number, number, number, number];
  totalToVal: (array: [number, number, number, number, number, number]) => number;
  totalToArray: (val: number) => [number, number, number, number, number, number];
  minutes: () => number;
  aftMidnight: boolean;
  today: () => number; // 00:00 start value of 'current day' based on last sleep (time.midnight-1440)
  nowDay: () => number;
  midnight: number; // 00:00 start value of next day from last sleep
  dayValue: number; // 00:00 start value of day from current aw.time
  convertToDate: (val: number) => string;
  humanInterfaceToDate: (day: number, month: number, nextyear: boolean) => [number, boolean];
}

// NAMESPACE
setup.time = {} as setupTime;

/*
Useful time values.
12 hrs: 720 min
1 day: 1,440 min
1 week: 10,080 min
1 month: 40,320 min
1 year*: 525,600 min
Omni start value = 10080
*/

aw.tBase = 130260; // reference value for game start "end of prologue".
aw.tVal = 120960; // primary time variable.
aw.timeArray = [0, 0, 0, 0, 0, 2032]; // min, hour, day, week, month, year
// State.active.variables.tVal = 120960;

Object.defineProperty(aw, "time", {
  get(): number {
    return aw.tVal;
  },
  set(val: number): void {
    aw.tVal = val;
    State.active.variables.tVal = val;
    const time = setup.time.create();
    aw.timeArray = clone(time);
    State.active.variables.time[0] = time[1];
    State.active.variables.time[1] = time[0];
    State.active.variables.time[2] = setup.time.aftMidnight;
    State.active.variables.date[0] = time[2];
    State.active.variables.date[1] = time[3];
    State.active.variables.date[2] = time[4];
    State.active.variables.date[3] = time[5];
  },
});

Object.defineProperty(setup.time, "aftMidnight", {
  get(): boolean {
    if (aw.tVal >= setup.time.midnight) {
      return true;
    } else {
      return false;
    }
  },
  set(value): void {
    aw.con.warn(`Attempted to set setup.time.aftMidnight property!`);
    aw.con.trace("aftMidnight");
  },
});

Object.defineProperty(setup.time, "dayValue", {
  get(): number {
    return Math.floor(aw.time / 1440) * 1440;
  },
  set(value): void {
    aw.con.warn(`Attempted to set setup.time.dayValue property!`);
    aw.con.trace("dayValue");
  },
});

Object.defineProperty(setup.time, "midnight", {
  get(): number {
    return State.active.variables.midnight;
  },
  set(value): void {
    aw.con.warn(`Attempted to set setup.time.midnight property!`);
    aw.con.trace("midnight");
  },
});

setup.time.create = function(): [number, number, number, number, number, number] {
  const time = aw.tVal;
  const year = 2032 + Math.floor(time / 525600);
  const y = time % 525600;
  const month = 1 + Math.floor(y / 40320);
  const m = y % 40320;
  const week = 1 + Math.floor(m / 10080);
  const w = m % 10080;
  const day = 1 + Math.floor(w / 1440);
  const d = w % 1440;
  const hour = Math.floor(d / 60);
  const mins = d % 60;
  if (month === 14) {
    // New Year Day - return a zero'd day/week/month
    return [mins, hour, 0, 0, 14, year];
  } else {
    return [mins, hour, day, week, month, year];
  }
};

setup.time.dateToVal = function(array: [number, number, number, number]|[number, number, number]): number {
  if (array.length < 4 || array[3] == null) {
    array.push(State.active.variables.date[3]);
  }
  let T = 0;
  if (array[3] as number > 2032) {
    T += (array[3] as number - 2032) * 525600;
  }
  T += (array[2] - 1) * 40320;
  T += (array[1] > 0) ? (array[1] - 1) * 10080 : 0;
  T += (array[0] > 0) ? (array[0] - 1) * 1440 : 0;
  return T;
};

setup.time.dateToArray = function(val: number): [number, number, number, number] {
  const year = 2032 + Math.floor(val / 525600);
  const y = val % 525600;
  const month = 1 + Math.floor(y / 40320);
  const m = y % 40320;
  const week = 1 + Math.floor(m / 10080);
  const w = m % 10080;
  const day = 1 + Math.floor(w / 1440);
  if (month === 14) {
    return [0, 0, 14, year];
  } else {
    return [day, week, month, year];
  }
};

// returns the minutes of the current day.
setup.time.minutes = function(): number {
  return aw.tVal % 1440;
};

setup.time.today = function(): number {
  return setup.time.midnight - 1440;
  /*if (random(1, 5) === 5) {
    const A = Math.floor(aw.time / 1440) * 1440;
    const B = setup.time.dateToVal([aw.timeArray[2], aw.timeArray[3], aw.timeArray[4], aw.timeArray[5]]);
    if (A !== B) {
      aw.con.warn(`TIME SYSTEM ERROR!\nThe regular check function comparing aw.time to aw.timeArray somehow returned a mismatch result.`);
    }
    return A;
  } else {
    return Math.floor(aw.time / 1440) * 1440;
  }*/
};

setup.time.nowDay = function(): number {
  return setup.time.dayValue;
}

setup.time.toVal = function(time: [number, number, boolean]): number {
  // create the base time values
  const MV = setup.time.midnight;
  const DV = setup.time.today();
  // create the input time value
  const IT = time[0] * 60 + time[1];
  // combine into total time
  const TT = (time[2]) ? MV + IT : DV + IT;
  return TT;
};

setup.time.toArray = function(value: number): [number, number] {
  const time = value;
  const y = time % 525600;
  const m = y % 40320;
  const w = m % 10080;
  const d = w % 1440;
  const hour = Math.floor(d / 60);
  const mins = d % 60;
  return [hour, mins];
};

setup.time.totalToVal = function(array: [number, number, number, number, number, number]): number {
  let T = (array[5] - 2032) * 525600;
  T += (array[4] - 1) * 40320;
  T += (array[3] > 0) ? (array[3] - 1) * 10080 : 0;
  T += (array[2] > 0) ? (array[2] - 1) * 1440 : 0;
  T += array[1] * 60;
  T += array[0];
  return T;
};

/*
1 day: 1,440 min
1 week: 10,080 min
1 month: 40,320 min
1 year*: 525,600 min
*/


Object.defineProperty(setup, "timeDisp", {
  get() {
    let output;
    if (State.active.variables.pref.twentyFour) {
      if (State.active.variables.time[0] === 0) {
        output = "00:";
      } else if (State.active.variables.time[0] < 10) {
        output = "0" + State.active.variables.time[0] + ":";
      } else {
        output = State.active.variables.time[0] + ":";
      }
      if (State.active.variables.time[1] < 10) {
        output += "0" + State.active.variables.time[1];
      } else {
        output += State.active.variables.time[1];
      }
    } else {
      if ((State.active.variables.time[0] % 12) === 0) {
        output = "12:";
      } else {
        output = (State.active.variables.time[0] % 12) + ":";
      }
      if (State.active.variables.time[1] < 10) {
        output += "0" + State.active.variables.time[1];
      } else {
        output += State.active.variables.time[1];
      }
      if (State.active.variables.time[0] >= 12) {
        output += "<sub>PM</sub>";
      } else {
        output += "<sub>AM</sub>";
      }
    }
    return output;
  },
  set() {
    UI.alert("You can't set timeDisp, it's a function!");
  },
});


Object.defineProperty(setup, "now", {
  get() {
    return [aw.timeArray[1], aw.timeArray[0], setup.time.aftMidnight];
  },
  set() {
    UI.alert("You can't set setup.time.now, it's a function!");
  },
});
// returns period of day, night day sunrise sunset
setup.time.daytime = function(): "N"|"D"|"SR"|"SS" {
  const mon = State.active.variables.date[2];
  const tim = State.active.variables.time[0];
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
  if (tim < (cum[mon][0] - 1) || tim >= (cum[mon][1] + 1)) {
    return "N";
  } else if (tim >= (cum[mon][0] - 1) && tim < cum[mon][0]) {
    return "SR";
  } else if (tim >= (cum[mon][1]) && tim < (cum[mon][1] + 1)) {
    return "SS";
  } else {
    return "D";
  }
};
setup.time.timeBackup = [10, 30, false];
setup.time.dateBackup = [1, 1, 4, 2032];
// checks time and date values to ensure they are valid, creates a backup if so, or restores from backup if not.
setup.time.saver = function(): void {
  if (aw.tVal == null || typeof aw.tVal !== "number") {
    if (State.active.variables.tVal == null || typeof aw.tVal !== "number") {
      aw.tVal = setup.omni.value + 110880;
      State.active.variables.tVal = setup.omni.value + 110880;
      aw.con.warn(`both tVals missing! reset using omni value.`);
    } else {
      aw.tVal = State.active.variables.tVal;
      aw.con.warn(`the aw tVal was missing, restored using State tVal.`);
    }
  }
  if (State.active.variables.tVal == null || typeof State.active.variables.tVal !== "number") {
    State.active.variables.tVal = aw.tVal;
    aw.con.warn(`the State tVal was missing, restored using the aw tVal.`);
  }
  /*if (State.active.variables.tVal !== aw.tVal) {
    // wtf time!
    aw.con.warn(`tVal disagreement aw: ${aw.tVal}, state: ${State.active.variables.tVal}. choosing winner using omni value.`);
    const state = Math.abs(State.active.variables.tVal - setup.omni.value);
    const awn = Math.abs(aw.tVal - setup.omni.value);
    if (awn < state) {
      State.active.variables.tVal = aw.tVal;
      aw.con.info(`winner is aw.tVal.`);
    } else {
      aw.tVal = State.active.variables.tVal;
      aw.con.info(`winner is State.`);
    }
  }*/
};

interface setupTimeAddArgs {
  omni?: boolean;
  event?: boolean;
  status?: boolean;
  sched?: boolean;
  gen?: boolean;
  all?: boolean;
};

// adds to the current time addMin minutes and proccesses mechanics
setup.time.add = function(addMin: number, disable: boolean | setupTimeAddArgs = false): void {
  const args = {} as setupTimeAddArgs;
  if (typeof disable === "boolean") {
    if (disable) {
      args.omni = false;
      args.event = false;
      args.status = false;
      args.sched = false;
      args.gen = true;
      args.all = false;
    } else {
      args.omni = false;
      args.event = false;
      args.status = false;
      args.sched = false;
      args.gen = false;
      args.all = false;
    }
  } else {
    args.omni = (disable.omni == null) ? false : disable.omni;
    args.event = (disable.event == null) ? false : disable.event;
    args.status = (disable.status == null) ? false : disable.status;
    args.sched = (disable.sched == null) ? false : disable.sched;
    args.gen = (disable.gen == null) ? false : disable.gen;
    args.all = (disable.all == null) ? false : disable.all;
  }
  if ("number" !== typeof addMin || isNaN(addMin)) {
    aw.con.warn(`Invalid value ${addMin} sent to setup.time.add ${aw.passage.title}`);
    aw.con.trace();
    return;
  }
  if (addMin < 0) {
    aw.con.warn(`Negative value sent to setup.time.add (${addMin}). ${aw.passage.title}`);
    aw.con.trace();
    return;
  }
  if (addMin === 0) {
    aw.con.info("A zero made it to setup.time.add, probably harmless.");
    aw.con.trace();
    return;
  }
  setup.time.saver();
  if (addMin > 0) {
    const time = State.active.variables.time;
    if (aw.chad.time && !disable) {
      addMin = Math.ceil(addMin / 2);
    }
    const newTime = aw.time + addMin;
    aw.time = newTime;
    aw.con.info(`NEW TIME: ${newTime} [add ${addMin}]`);
    // start the omni system update/check process
    if (!args.omni && !args.all) {
      setup.omni.add(addMin);
    } else {
      setup.omni.value += addMin;
    }
    setup.condition.dry();
    setup.vow.vowsControl();
    // start the event checking function
    if (!args.event && !args.all) {
      const delay = (args.omni) ? setup.event.delay : (setup.event.delay + setup.omni.delay);
      setTimeout(() => setup.event.check("all"), delay);
    }
    if (!args.gen && !args.all) {
      ↂ.sched.alertText = "";
      ↂ.sched.alertPend = false;
      if (!args.status) {
      try {
        setup.time.chunk(addMin);
        } catch (e) {
          aw.con.error("Error in setup.time.chunk() being run in setup.time.add()...", e);
        }
      }
      if (!args.sched) {
        try {
          setup.time.schedCheck();
        } catch (e) {
          aw.con.error("Error in setup.time.schedCheck() being run in setup.time.add()...", e);
        }
      }
    }
  }
};


// sets the time to a specific time
setup.time.set = function(hour: number, min: number = 0, newDay: boolean = true, stats: boolean = false): void {
  let day = false;
  if (hour == null) {
    aw.con.warn("time.set is missing required arguments. Trace below:");
    aw.con.trace();
    return;
  } else if ("number" !== typeof hour || "number" !== typeof min || hour > 23 || hour < 0 || min > 59 || min < 0) {
    aw.con.warn(`time.set given invalid input ${hour} and ${min}. Trace below:`);
    aw.con.trace();
    return;
  }
  const time = State.active.variables.time;
  // I debated going for minute level accuracy, but it seems more likely that
  // time would be going backward in that case. instead allowing a 60-119 min window.
  if (newDay && hour + 1 < time[0]) {
    day = true;
  }
  const newVal = setup.time.toVal([hour, min, day]);
  const minutes = newVal - aw.time;
  if (stats && minutes > 0) {
    setup.omni.add(minutes);
    setup.time.chunk(minutes);
  }
  aw.time = newVal;
};


/*TRACKS PASSAGE OF TIME IN SET TIME CHUNKS*/
setup.time.chunk = function(min: number): void {
  let timeChunk = State.active.variables.timeChunk;
  timeChunk += min;
  const chunks = Math.floor(timeChunk / 15);
  if (chunks > 0) {
    for (let i = 0; i < chunks; i++) {
      State.active.variables.timeCount++;
      setup.time.status(State.active.variables.timeCount);
    }
    timeChunk -= chunks * 15;
    State.active.variables.timeChunk = timeChunk;
    setup.cTag.build(false); // generates conversational tags - once per chunk group only.
    setup.clothes.drying();
    setup.challenge.check();
    setup.interactionMisc.spouseAngry();
    setup.interactionMisc.divorceCheck();
  }
};


/*ADDS TO PLAYTIME AND PROCS VARIOUS CALCULATIONS*/
setup.time.dateChange = function(): void {
  // don't count prologue as a gameplay day
  if (!ↂ.flag.Prologue) {
    State.active.variables.dayTotal += 1;
    State.active.variables.week = Math.floor(State.active.variables.dayTotal / 7);
    State.active.variables.year = Math.floor(State.active.variables.week / 52);
  }
  // some checks for this running total called midnight...
  if (typeof State.active.variables.midnight !== "number" || isNaN(State.active.variables.midnight)) {
    aw.con.warn(`TIME SYSTEM ERROR\n$midnight value is incorrect type! ${setup.time.midnight} : ${typeof State.active.variables.midnight}.`);
    if (aw.timeArray[1] < 8) {
      State.active.variables.midnight = Math.floor(aw.time / 1440) * 1440;
    } else {
      State.active.variables.midnight = (Math.floor(aw.time / 1440) * 1440) + 1440;
    }
  } else if (State.active.variables.midnight % 1440 !== 0) {
    aw.con.warn(`TIME SYSTEM ERROR!\n$midnight value invalid. value: ${State.active.variables.midnight}`);
    if (aw.timeArray[1] < 8) {
      State.active.variables.midnight = Math.floor(aw.time / 1440) * 1440;
    } else {
      State.active.variables.midnight = (Math.floor(aw.time / 1440) * 1440) + 1440;
    }
  }
  State.active.variables.midnight += 1440;
  if (setup.time.midnight < aw.time) {
    aw.con.warn(`TIME SYSTEM ERROR!\nAlready past new midnight value! Adjusting forward.`);
    State.active.variables.midnight += 1440;
  }
  aw.con.info(`New midnight: ${State.active.variables.midnight}mins for date ${aw.timeArray[2]}-${aw.timeArray[3]}-${aw.timeArray[4]}.`);
};

// UPDATES STATUS VARIABLES WITH TIME

setup.time.status = function(count: number): void {
  const ᛔ = ↂ.pc;
  // escape function if still in prologue
  if (ↂ.flag.Prologue) {
    return;
  }
  // start by checking fatigue
  if (count % 10 === 0) {
    setup.status.tired(1, "Just being awake");
  }
  setup.statusLoad();
  // get grungier
  if (count % 24 === 0 && ᛔ.status.clean < 5) {
    ᛔ.status.clean++;
  }
  // regen energy if not too tired
  if (ᛔ.status.fatigue < 8 && ᛔ.status.energy.regen && ᛔ.status.health >= 50) {
    let rate = ᛔ.status.energy.rate;
    if (ᛔ.status.health < 75) {
      rate = Math.round(rate * 2.5);
    } else if (ᛔ.status.health < 90) {
      rate = Math.round(rate * 1.5);
    }
    if (ᛔ.status.addict.withdrawl) {
      rate = Math.round(rate * 1.5);
    }
    if (count % rate === 0) {
      ᛔ.status.energy.amt += 1;
    }
    if (ᛔ.status.energy.amt > ᛔ.status.energy.max) { ᛔ.status.energy.amt = ᛔ.status.energy.max; }
  }
  const milk = setup.status.milk();
  if (milk == null) {
    if (random(1, 20) === 20) {
      setup.notify("Your breasts tingle pleasurably as they produce milk.");
      if (random(1, 5) === 5) {
        ↂ.pc.status.happy += 1;
        setup.status.record("happy", 1, "Happy lactation tingles");
        ↂ.pc.status.stress -= 3;
        setup.status.record("stress", -3, "Happy lactation tingles");
      }
    }
  } else if (milk === -2) {
    let msg = `<p class='orangered'><b>Lactation Reduction:</b> Your milk production has decreased from disuse and being overly-full, so you are now producing milk at a slower rate. `;
    if ((aw.chad.allowed && State.active.variables.cheat.noLeak) || State.active.variables.items.has("EvreDrop Milk Saver")) {
      msg += `Luckily your milk savers kept you from making a mess.</p>`;
    } else {
      setup.condition.add({ loc: "chest", amt: 5, type: "milk" });
      msg += `Your breasts have leaked milk, making a mess.</p>`;
    }
    UI.alert(msg);
  } else if (milk === -1) {
    setup.notify("Your breasts are starting to get full, you should consider milking them soon.");
  } else if (milk === -3) {
    setup.notify("<span class='orange'>Your breasts ache from being overly-full.</span>");
  } else if (milk === -4) {
    UI.alert("<span class='orangered'>Your breasts are painful from the pressure of breastmilk!</span>");
  } else if (milk > 0 && typeof milk === "number") {
    if ((aw.chad.allowed && State.active.variables.cheat.noLeak) || State.active.variables.items.has("EvreDrop Milk Saver")) {
      setup.notify("Your breasts spilt some milk into your milk savers.");
    } else {
      UI.alert("<span class='orangered'>Your overly-full breasts have let-down and spilt milk!</span>");
      const a = Math.ceil(milk / 30);
      setup.condition.add({ loc: "chest", amt: a, type: "milk" });
    }
  }
  if (ↂ.pc.body.tits.base.size >= 25000) {
    setup.badEnd("breastSize");
  }
  if (ↂ.pc.status.alcohol > 0) {
    const max = (ↂ.pc.status.alcohol > 4) ? 3 : 2; // reduce rate of alcohol lowering when more than tipsy.
    if (random(1, max) === 1) {
      ↂ.pc.status.alcohol -= 1;
    }
  }
  const drugs = ["sex", "alc", "heat", "satyr", "focus", "cum", "zone", "cream"]; // raising jonesing for drugs
  let addictMax = ["error", 0, 0];
  const drugFullName = ["sex", "booze", "Heat", "Satyr", "Focus", "cum", "Zone", "creampie"];
  for (let index = 0; index < drugs.length; index++) {
    setup.drug.jonesing(drugs[index]);
  }
  for (let index = 0; index < drugs.length; index++) {
    if (ↂ.pc.status.addict[drugs[index]] > addictMax[1]) {
      addictMax[0] = drugs[index];
      addictMax[1] = ↂ.pc.status.addict[drugs[index]];
      addictMax[2] = index;
    }
  }
  if (ↂ.pc.status.addict.jonesing > 3) {
    setup.notify(either(`Hmm I wouldn't mind having some ${drugFullName[addictMax[2]]} soon.`, `Silly thing, I just remembered how good ${drugFullName[addictMax[2]]} actually is.`));
  } else if (ↂ.pc.status.addict.jonesing > 5) {
    setup.notify(either(`Oh, would be nice to have ${drugFullName[addictMax[2]]} now.`, `I just thought, why don't enjoy some ${drugFullName[addictMax[2]]}?`));
  } else if (ↂ.pc.status.addict.jonesing > 6) {
    setup.notify(either(`Mmmm, ${drugFullName[addictMax[2]]}. I could really enjoy it right now. Why I ever deny myself?`, `I feel tempted to have some ${drugFullName[addictMax[2]]}. Better get it fast.`));
  } else if (ↂ.pc.status.addict.jonesing > 7) {
    setup.notify(either(`Oh, I really need ${drugFullName[addictMax[2]]} now. Can't wait until I get some.`, `${drugFullName[addictMax[2]]}, ${drugFullName[addictMax[2]]}, ${drugFullName[addictMax[2]]}... Really need it.`));
  } else if (ↂ.pc.status.addict.jonesing > 8) {
    setup.notify(either(`Shit, I feel like I am dying without ${drugFullName[addictMax[2]]}.`, `Damn! I want ${drugFullName[addictMax[2]]} and I want it NOW.`));
  } else if (ↂ.pc.status.addict.jonesing > 9) {
    setup.notify(either(`Fuck, I can't thing about anything than ${drugFullName[addictMax[2]]} now!`, `I. Want. ${drugFullName[addictMax[2]]}. Right. Now.`));
  }
  setup.statusSave();
  if (ᛔ.status.arousal > 9) {
    setup.status.arousal(-1);
  }
  let th = Math.floor(ᛔ.status.arousal / 2);
  th += Math.ceil(ᛔ.trait.libido / 2);
  if (th > random(0, 20)) {
    setup.status.satisfact(-1, "Being alive");
  }
  if (ᛔ.status.inPublic) {
    let exp = 0;
    if (setup.clothes.stained) {
      exp += 1;
    }
    if (setup.clothes.kinky) {
      exp += 1;
    }
    try {
      if (setup.clothes.exposed.top) {
        exp += Math.min(Math.round((ᛔ.clothes.stats.exposureTop - 25) / 5), 4);
      }
      if (setup.clothes.exposed.bottom) {
        exp += Math.min(Math.round((ᛔ.clothes.stats.exposureBot - 15) / 5), 6);
      }
      if (setup.clothes.access.pussy) {
        exp += 2;
      }
      if (setup.clothes.access.ass) {
        exp += 1;
      }
      if (setup.clothes.access.nip) {
        exp += 1;
      }
    } catch (e) {
      aw.con.warn("seems like clothes.exp is fudged.");
    }
    if (ᛔ.kink.exhibition && ᛔ.kink.public) {
      exp *= 3;
    } else if (ᛔ.kink.exhibition) {
      exp *= 2;
    }
    const max = Math.pow((ᛔ.status.arousal + (9 - ᛔ.trait.libido)), 2);
    if (exp >= random(1, max)) {
      setup.status.arousal(1);
    }
  }
  let cap = ᛔ.trait.libido;
  if (ᛔ.kink.slut) {
    if (ᛔ.kink.hyperSlut) {
      cap += 6;
    } else if (ᛔ.kink.superSlut) {
      cap += 3;
    } else {
      cap += 1;
    }
  }
  cap += ᛔ.status.need;
  // TODO other cap raisers like drugs
  if (ᛔ.status.arousal < cap) {
    let base = 1;
    base += (10 - Math.round(ᛔ.status.satisfaction / 10));
    base += ᛔ.trait.libido;
    const top = Math.round(Math.pow(ᛔ.status.arousal, 3.5) + 50);
    if (base >= random(1, top)) {
      setup.status.arousal(1);
    }
    if (State.active.variables.AW.tutorials && !ↂ.flag.stressWarned && ᛔ.status.stress > 70) {
      setup.dialog("Stress",`<div style="border: 3px solid #ff5d3d;background-color:#000;text-align:center;padding:20px;min-width:500px;color: #ffc16b;"><span style="font-size:1.4rem;color:#ff5d3d;">Stress Warning</span><br><br>We have noticed that your character's stress levels are haywiring. Having high stress can result in a mental breakdown and many more nasty mental effects leading your character to the game over so you may want to take some time to manage it. One of the easiest options is to meditate in your living room, other include swimming in the pool, going to the massage parlor and many more.<br><br>Stress comes from number of various sources but the main thing causing it is your job. Note that working "hard" means putting all possible efforts into working and my not be the best option on a long run for your character stats, maybe taking it easier is a good idea?</div><br><center><<button "Will do something about that">><<run Dialog.close()>><</button>></center><<set ↂ.flag.stressWarned = true>><<status 0>>`);
    }
    if (State.active.variables.AW.tutorials && !ↂ.flag.lonelyWarned && ᛔ.status.lonely > 70) {
      setup.dialog("Companionship",`<div style="border: 3px solid #ff5d3d;background-color:#000;text-align:center;padding:20px;min-width:500px;color: #ffc16b;"><span style="font-size:1.4rem;color:#ff5d3d;">Companionship Warning</span><br><br>Houston we have a problem. Well not us, but your character does indeed. As Bob Ross said "Everybody needs a friend" and so your character too. Your companionship status shows that your character feels lonely and this makes her not too happy. Introvert characters are less affected by this but in the end of the day, you probably want to avoid negative effects on <<name>> caused by loneliness. Good news is that you can fix it easily by hanging out, asking people to go on the dates, even talking on the street with other citizens may help!</div><br><center><<button "I guess I need to meet somebody">><<run Dialog.close()>><</button>></center><<set ↂ.flag.lonelyWarned = true>><<status 0>>`);
    }
    if (State.active.variables.AW.tutorials && !ↂ.flag.sexWarned && ᛔ.status.satisfaction < 15) {
      setup.dialog("I can't get no satisfaction",`<div style="border: 3px solid #ff5d3d;background-color:#000;text-align:center;padding:20px;min-width:500px;color: #ffc16b;"><span style="font-size:1.4rem;color:#ff5d3d;">Satisfaction Warning</span><br><br>Yet another annoying warning for you, don't worry, it will only show once. The problem is <<name>>'s satisfaction level. She needs sex and she needs it now. Being overly chaste affects your character's happiness and also can cause lust-induced insanity. While being a fun idea by itself this will lead to game over which is not so good.<br><br>A notable exception is wearing some actual chastity which may... alter the mechanics ;) But usually you really want to keep your precious character satisfied and there is a solution to this! There are plenty of characters of all genders in the valley who are ready to fuck. Don't want to interact with those pesky humans? Well, there are some possibilities to satisfy yourself with masturbation or various sex toys you can buy at the adult store at the north of downtown.</div><br><center><<button "Time to fuck like there is no tomorrow!">><<run Dialog.close()>><</button>></center><<set ↂ.flag.sexWarned = true>><<status 0>>`);
    }
    if (State.active.variables.AW.tutorials && !ↂ.flag.cleanWarned && ↂ.home.clean.floors < 25) {
      setup.dialog("What a mess!",`<div style="border: 3px solid #ff5d3d;background-color:#000;text-align:center;padding:20px;min-width:500px;color: #ffc16b;"><span style="font-size:1.4rem;color:#ff5d3d;">Cleanliness Warning</span><br><br>It seems your flat got very dirty. This severely affects your character's mood and happiness. Who would prefer to live in a messy house, right? One method of cleaning is doing a "Quick clean" by pressing on the broom icon on your home map. Better and long-term solution would be adjusting the frequency of cleaning in the home management menu. Also you may consider buying a cleaning robot at the electronic sections of some stores.</div><br><center><<button "Time to clean this all!">><<run Dialog.close()>><</button>></center><<set ↂ.flag.cleanWarned = true>><<status 0>>`);
    }
  }
  /********************************************/
  /* PUT CONDITION ITEMS HERE, WETNESS, MILK,
     CLOTHES, *OTHER* LiQUIDS, ETC.           */
  /********************************************/
  const condos = Object.keys(ᛔ.cond);
  for (let i = 0, c = condos.length; i < c; i++) {
    if (condos[i] !== "vagFluid" && condos[i] !== "anusFluid") {
      const keys = Object.keys(ᛔ.cond[condos[i]]);
      for (let j = 0, d = keys.length; j < d; j++) {
        if (ᛔ.cond[condos[i]][keys[j]].wet > 0) {
          ᛔ.cond[condos[i]][keys[j]].wet -= 1;
        }
      }
    }
  }
  const vk = Object.keys(ᛔ.cond.vagFluid);
  const ak = Object.keys(ᛔ.cond.anusFluid);
  if (vk.length > 0) {
    // decrease vagina contents
    for (let i = 0, c = vk.length; i < c; i++) {
      if (isNaN(ᛔ.cond.vagFluid[vk[i]])) {
        try {
          delete ᛔ.cond.vagFluid[vk[i]];
        } catch (e) {
          aw.con.info(`time.status null vagFluid handler failed. ${e.name}: ${e.message}`);
        }
      } else if (ᛔ.cond.vagFluid[vk[i]] <= 1) {
        if (random(0, 5) === 5) {
          delete ᛔ.cond.vagFluid[vk[i]];
        }
      } else {
        ᛔ.cond.vagFluid[vk[i]] -= Math.round(ᛔ.cond.vagFluid[vk[i]] / 3);
      }
    }
  }
  if (ak.length > 0) {
    // decrease anus contents
    for (let i = 0, c = ak.length; i < c; i++) {
      if (isNaN(ᛔ.cond.anusFluid[vk[i]])) {
        try {
          delete ᛔ.cond.anusFluid[vk[i]];
        } catch (e) {
          aw.con.info(`time.status null anusFluid handler failed. ${e.name}: ${e.message}`);
        }
      } else if (ᛔ.cond.anusFluid[ak[i]] <= 1) {
        if (random(0, 5) === 5) {
          delete ᛔ.cond.anusFluid[ak[i]];
        }
      } else {
        ᛔ.cond.anusFluid[ak[i]] -= Math.floor(ᛔ.cond.anusFluid[ak[i]] / 2);
      }
    }
  }
  if (ↂ.pc.status.clean > 2) {
    const itemsToStain = ["bottom", "bra", "coat", "leg", "panties", "top"];
    for (let index = 0; index < itemsToStain.length; index++) {
      if (ↂ.pc.clothes.keys[itemsToStain[index]] !== 0) {
        if (random(ↂ.pc.status.clean, 10) === 10) {
          if (random(1, 2) === 2) { // approximate of 24 hours to get clothes to the filthy status if pc skin is filthy herself. Way too generous but I want to avoid too much micro with washing clothes daily and stuff.
            aw.clothes[ↂ.pc.clothes.keys[itemsToStain[index]]].values.dirty++;
          }
        }
      }
    }
  }
  setup.clothes.timeEffect(); // regular chance of damage and dirty for worn clothes.
  // ==================================================
  // !!! Bad Ending Check !!!
  // ==================================================
  if (ↂ.flag.badEnd !== "none" && !ↂ.flag.badEndInit && setup.omni.matching("Doom Clock") === 0) {
    ↂ.flag.doomClock = setup.omni.new("doomClock");
  }
  // FINISHED - SAVE and wrap up.
  aw.S();
  try {
    // TODO start increasing need when addiction is properly implemented.
    setup.time.addictNeedIncrease();
  } catch (e) {
    aw.con.error("addict need increase failure.", e);
  }
};




// CHECKS FOR IMPENDING APPOINTMENTS AND SLEEP
// TODO - SPLIT APPOINTMENT REMINDERS INTO NOTIFY @ 1HR, ALERT AT 30MIN
setup.time.schedCheck = function(): void { // VODKA
  const ᛔ = State.active.variables;
  const msgs: string[] = [];
  if (ↂ.sched.sleepWarnOn && !setup.time.after(ↂ.sched.sleepWarn)) {
    ↂ.sched.sleepWarnOn = false;
    const x = setup.time.toSleepMessage();
    if (x) {
      msgs.push(x);
    }
  }
  if (!setup.time.after(ↂ.sched.sleepWarn)) {
    ↂ.sched.fastSleep = true;
  }
  const plan = ↂ.plans.current as AppointmentInfo[];
  if (ↂ.sched.alerts && plan.length > 0) {
    for (let i = 0, c = plan.length; i < c; i++) {
      if (plan[i].alert && aw.time > (plan[i].start - 60)) {
        plan[i].alert = false;
        // setup.time.reminder(ↂ.plans[ᛔ.date[1]][ᛔ.date[0]][i]);
        msgs.push(setup.time.appointmentAlert(plan[i]));
      }
    }
  }
  if (msgs.length > 0) {
    setup.time.reminder(msgs);
  }
};

// TODO
// checks for missed appointments to update, and set flags if necessary
setup.time.missedCheck = function(): void { // VODKA
  // this function is a todo that needs to be done
  // besty: for now on added the check for dates
  for (let i = 0; i < ↂ.plans.current.length; i++) {
    const time = (setup.time.nowDay() + setup.time.minutes());
    const lastCall = (ↂ.plans.current[i].start + 60);
    try {
      if (ↂ.plans.current[i].type === "date" && ↂ.plans.current[i].missed === true) {
        if (ↂ.flag.schedDates.includes(ↂ.plans.current[i].npc[0]) && time > lastCall) {
          setup.interact.status.npc = ↂ.plans.current[i].npc[0];
          aw.npc[setup.interact.status.npc].rship.likePC -= 13;
          aw.npc[setup.interact.status.npc].rship.lovePC -= 3;
          setup.interact.launch({passage: "missedDateChat", block: false, title: "Phone message", size: 3});
          setup.npcDate.remove(ↂ.plans.current[i].npc[0]);
        }
      }
    } catch (e) {
      aw.con.warn(`Bestybug detected in time.missedCheck on dating checks. ${e.name}: ${e.message}`);
    }
    try {
      if (ↂ.plans.current[i].type === "hangout") {
        if (ↂ.flag.schedHangs.includes(ↂ.plans.current[i].npc[0]) && time > lastCall) {
          setup.interact.status.npc = ↂ.plans.current[i].npc[0];
          aw.npc[setup.interact.status.npc].rship.likePC -= 7;
          setup.interact.launch({passage: "missedHangChat", block: false, title: "Phone message", size: 3});
          setup.hang.remove(ↂ.plans.current[i].npc[0]);
        }
      }
    } catch (e) {
      aw.con.warn(`Bestybug detected in time.missedCheck on hangout checks. ${e.name}: ${e.message}`);
    }
  }
};

// TODO
// returns names of missed appointments for info purposes
setup.time.missed = function(d: number, w: number): number {
  if (d === w) {
    aw.con.info(`placeholder function time.missed seems to be doing things... ${d} | ${w}`);
  }
  return 0;
};

// TODO
// returns number of social events for the day
setup.time.socialCount = function(): number {
  const ᛔ = State.active.variables;
  const cunt = 0;
  let d = ᛔ.date[0];
  let w = ᛔ.date[1];
  if (ᛔ.time[2]) {// correction if after midnight and date has changed
    d--;
    if (d < 1) {
      d = 7;
      w -= 1;
      if (w < 1) {
        w = 4;
      }
    }
  }
  /*try{
    if(ↂ.sched.plans[w][d].length > 0){//iterates through plans, if not missed and social type, increments cunt
      for(let i = 0; i < ↂ.sched.plans[w][d].length; i++){
        if(ↂ.sched.plans[w][d][i].missed != null && !ↂ.sched.plans[w][d][i].missed && ↂ.sched.plans[w][d][i].type > 1){
          cunt += 1;
        }
      }
    }
  }
  catch(e){
    setup.log(`setup.time.socialCount error ${e.name}: ${e.message}`)
  }*/
  return cunt;
};

// returns name and time of next upcoming appointment/s in twee
setup.time.dayplans = function(date: false|date = false): string {
  let out = "<span class='head' style='font-size:1.1rem;'>Schedule:</span>";
  const long = ↂ.plans.current.length;
  if (long > 0) {
    for (let i = 0; i < long; i++) {
      out += "<br>''Name:''";
      out += ↂ.plans.current[i].name;
      out += " | time: <span class='monospace'>";
      out += setup.time.toArray(ↂ.plans.current[i].start)[0] + ":" + setup.time.toArray(ↂ.plans.current[i].start)[1];
      out += "</span>";
      if (ↂ.plans.current[i].place != null) {
        out += " ''Place:'' " + ↂ.plans.current[i].place;
      }
      out += "<br><span class='note'>";
      out += ↂ.plans.current[i].disc;
      out += "</span>";
    }
  } else {
    out += "<br>''No Plans''";
  }
  return out;
};

// returns name and time of upcoming appointment/s
setup.time.dayplansFull = function(date: number | false): twee {
  let displayVar = [] as plan[] | false;
  if (date == null || date === false) {
    const today = setup.time.today();
    displayVar = setup.sched.appointments(today);
  } else {
    displayVar = setup.sched.appointments(date);
  }
  let out = "<span class='head' style='font-size:1.1rem;'>Schedule:</span><br>";
  if (displayVar == null || displayVar === false || displayVar.length === 0) {
    out += "<br>''No Plans''";
    return out;
  }
  const long = (displayVar as AppointmentInfo[]).length;
  if (long > 0) {
    for (let i = 0; i < long; i++) {
      out += "<br>''Name: ''";
      out += displayVar[i].name;
      out += " | ''Time:'' <span class='monospace'>";
      if (setup.time.toArray(displayVar[i].start)[1] < 10) {
        out += setup.time.toArray(displayVar[i].start)[0] + ":0" + setup.time.toArray(displayVar[i].start)[1];
      } else if (setup.time.toArray(displayVar[i].start)[1] === 0) {
        out += setup.time.toArray(displayVar[i].start)[0] + ":" + setup.time.toArray(displayVar[i].start)[1] + "0";
      } else {
        out += setup.time.toArray(displayVar[i].start)[0] + ":" + setup.time.toArray(displayVar[i].start)[1];
      }
      out += "</span>";
      if (displayVar[i].place !== null && displayVar[i].place !== false) {
        out += " | ''Place:'' " + displayVar[i].place;
      }
      const timeNow = (setup.time.today() + setup.time.minutes());
      if (timeNow > displayVar[i].start && displayVar[i].missed === true) {
        out += " | <span class='monospace'>''MISSED!''</span>";
      }
      out += "<br><span class='note'>";
      if (displayVar[i].msg !== null && displayVar[i].msg !== false) {
      out += displayVar[i].msg;
      } else if (displayVar[i].disc != null && displayVar[i].disc !== false) {
      out += displayVar[i].disc;
      }
      out += "</span><br>";
    }
  } else {
    out += "<br>''No Plans''";
  }
  return out;
};

// formats upcoming event/appointment display, optionally different day
setup.time.upcoming = function(date: boolean|date = false): twee { // VODKA
  const ᛔ = State.active.variables;
  let day = ᛔ.date[0];
  let week = ᛔ.date[1];
  if (Array.isArray(date)) {
    day = ("number" === typeof date[0]) ? date[0] : day;
    week = ("number" === typeof date[1]) ? date[1] : week;
  }
  let out = `<div id="uiReminder" class="blackOutline" style="background-color:rgba(0,0,0,${State.active.variables.phoneDataBG});"><table id='layout'><tr><td colspan=3><span class='head' style='font-size:1rem;'>Schedule:</span></td></tr>`;

  if (ↂ.sched.workDays[ᛔ.date[0]] && !ↂ.flag.prologueSunday) {
    if (ↂ.job.att.showed[ᛔ.date[0]]) {
      out += "<tr><td class='yellowgreen' style='width:35%;font-size:16px;'><b>Work</b></td>"
      + "<td width='25%' class='monospace yellowgreen'>";
      out += ↂ.sched.workTime[ᛔ.date[0]][0] + ":";
      if (ↂ.sched.workTime[ᛔ.date[0]][1] < 10) {
        out += "0" + ↂ.sched.workTime[ᛔ.date[0]][1];
      } else {
        out += ↂ.sched.workTime[ᛔ.date[0]][1];
      }
      out += "</td><td class='yellowgreen' style='width:40%;font-size:16px;'>Work ✔</td></tr>";
    } else if (ↂ.sched.vacation[ᛔ.date[0]]) {
      out += "<tr><td colspan=3 style='font-size:16px;color:#BBB;'>Vacation Day - No Work</td></tr>";
    } else if (ↂ.sched.sick[ᛔ.date[0]]) {
      out += "<tr><td colspan=3 style='font-size:16px;color:#EBB;'>Sick Day - No Work</td></tr>";
    } else {
      let cls = "white";
      let moo = ↂ.job.rules.worktime[ᛔ.date[0]] + " hours";
      if (ᛔ.time[0] < ↂ.sched.workTime[ᛔ.date[0]][0] && ᛔ.time[0] >= (ↂ.sched.workTime[ᛔ.date[0]][0] - 2)) {
        cls = "import";
      } else if ( ᛔ.time[0] >= ↂ.sched.workTime[ᛔ.date[0]][0]) {
        cls = "bad";
        moo = "Late/Missed!";
      }
      out += `<tr><td class='${cls}' style='width:35%;font-size:16px;'><b>Work</b></td><td width='25%' class='monospace ${cls}'>`;
      out += ↂ.sched.workTime[ᛔ.date[0]][0] + ":";
      if (ↂ.sched.workTime[ᛔ.date[0]][1] < 10) {
        out += "0" + ↂ.sched.workTime[ᛔ.date[0]][1];
      } else {
        out += ↂ.sched.workTime[ᛔ.date[0]][1];
      }
      out += `</td><td class='${cls}' style='width:40%;font-size:16px;'>${moo}</td></tr>`;
    }
  } else {
    out += "<tr><td colspan=3 style='font-size:16px;color:#BBB;'>Day Off - No Work Today</td></tr>";
  }
  if (ↂ.plans.current.length > 0) {
    for (let i = 0; i < ↂ.plans.current.length; i++) {
      // if (ↂ.plans.current[i].start[0] >= ᛔ.time[0]) {
        out += "<tr><td style='width:35%;font-size:16px;'><b>";
        out += ↂ.plans.current[i].name;
        out += "</b></td><td width='25%' class='monospace'>";
        const analChainsaw = setup.time.toArray(ↂ.plans.current[i].start);
        out += analChainsaw[0] + ":";
        if (analChainsaw[1] < 10) {
          out += "0" + analChainsaw[1];
        } else {
          out += analChainsaw[1];
        }
        out += "</td><td style='width:40%;font-size:16px;'>";
        if (ↂ.plans.current[i].place != null) {
          out += " | " + ↂ.plans.current[i].place;
        }
        out += "</td></tr>";
      // }
    }
  } else {
    out += "<tr><td colspan=3><b>No Plans</b></td></tr>";
  }
  out += "</table></div>";
  return out;
};

// launches Dialog with reminder messages joined together
setup.time.reminder = function(msgs: string[]|string): void {
  let typefuck: string;
  if (Array.isArray(msgs)) {
    typefuck = msgs.join("<br><br>");
  } else {
    typefuck = msgs;
  }
  //if (!Dialog.isOpen()) {
  setup.dialog("Phone Reminder", typefuck);
  /*} else {
    function closeFucker(shit: string) {
      setTimeout(function() {
        if (!Dialog.isOpen()) {
          setup.dialog("Phone Reminder", shit);
        } else {
          closeFucker(shit);
        }
      }, 10000);
    }
    closeFucker(typefuck);
  }*/
};

/*RETURNS TRUE IF INPUT TIME IS AFTER CURRENT GAME TIME*/
setup.time.after = function(hr: number|time, min: number = 0, aft: boolean = false): boolean {
  if (Array.isArray(hr)) {
    if ("number" !== typeof hr[0] || "number" !== typeof hr[1]) {
      aw.con.warn(`Invalid value ${hr} sent to time.after function. Times must be numbers or array of numbers.`);
      return false;
    } else if (hr.length < 2) {
      aw.con.warn("Incomplete time array sent to time.after function. Arrays must include minute value.");
      return false;
    } else {
      min = hr[1];
      aft = (hr.length === 3) ? hr[2] : false;
      hr = hr[0];
    }
  }
  const input = setup.time.toVal([hr, min, aft]);
  const now = aw.time;
  if (input > now) {
    return true;
  } else {
    return false;
  }
};


// returns the minutes until input time, -1 if past input time
setup.time.until = function(hr: time|number, min: number = 0, aft: boolean = false): number {
  if (Array.isArray(hr)) {
    if ("number" !== typeof hr[0] || "number" !== typeof hr[1]) {
      throw new TypeError(`Invalid value ${hr} sent to time.until function. Times must be numbers or array of numbers.`);
    } else if (hr.length < 2) {
      throw new SyntaxError("Incomplete time array sent to time.until function. Arrays must include minute value.");
    } else {
      min = hr[1];
      aft = (hr.length === 3) ? hr[2] : false;
      hr = hr[0];
    }
  }
  if ("number" !== typeof hr || "number" !== typeof min) {
    throw new TypeError(`Invalid value ${hr} : ${min} sent to time.after function. Times must be numbers or array of numbers.`);
  }
  const input = setup.time.toVal([hr, min, aft]);
  const now = aw.time;
  if (input < now) {
    return -1;
  } else {
    return input - now;
  }
};

/* GET THE DAY WORD for the day number */
setup.time.dayName = function(d: "no"|number = "no"): string {
  /* can't use system default because order*/
  const names = [
    "New Year",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = State.active.variables.date[2];
  if ("number" === typeof d && d > 0 && d < 8) {
    day = d;
  }
  return names[day];
};


/* GET THE MONTH WORD for the month number */
setup.time.monthName = function(m: "no"|number = "no"): string {
  /* can't use defaults because of 13th month */
  const names = [
    "error",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Sol",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = State.active.variables.date[2];
  if ("number" === typeof m && m > 0 && m < 14) {
    month = m;
  }
  return names[month];
};


// returns the difference in minutes between two times
setup.time.dif = function(timeA: time, timeB: time): number {
  if (!Array.isArray(timeA) || !Array.isArray(timeB)) {
    setup.alert(`non-array time values to time dif. A = ${typeof timeA}, B = ${typeof timeB}`);
    return 0;
  }
  let a = timeA[0] * 60 + timeA[1];
  let b = timeB[0] * 60 + timeB[1];
  a += timeA[2] ? (24 * 60) : 0 ;
  b += timeB[2] ? (24 * 60) : 0 ;
  return Math.abs(a - b);
};


// returns a clone of the current time array
setup.time.now = function(): [number, number, boolean] {
  return [aw.timeArray[1], aw.timeArray[0], setup.time.aftMidnight];
};

// creates a twee display for the current or supplied date
setup.time.dateDisplay = function(date: false|date = false): twee {
  if (!Array.isArray(date)) {
    date = State.active.variables.date;
  }
  let dateStr;
  if (date[0] === 6 || date[0] === 7 || date[0] === 0) {
    dateStr = "<span class='pink'>";
  } else {
    dateStr = "<span class='white'>";
  }
  const monthday = (date[0] + (date[1] - 1) * 7);
  dateStr += setup.time.dayName(date[0]) + "</span>";
  dateStr += ", " + setup.time.monthName(date[2]);
  dateStr += " " + monthday + "<span class='px14'>" + setup.numberLetAbrv(monthday) + "</span>";
  dateStr += ", " + date[3];
  /* note setup.numberLetAbrv is in general functions*/
  return dateStr;
};

// accepts input of time array or minutes, returns text time.
setup.time.format = function(tim: time|number): twee {
  if (tim == null) {
    aw.con.warn("No time sent to setup.time.format function");
    console.trace();
    return "[Error check console]";
  }
  let h = 0;
  let m = 0;
  let hw;
  let mw;
  if (Array.isArray(tim)) {
    h = tim[0];
    m = tim[1];
    if (m >= 60) {
      h += Math.floor(m / 60);
      m = m % 60;
    }
  } else if ("number" === typeof tim) {
    h += Math.floor(tim / 60);
    m = tim % 60;

  } else {
    aw.con.warn("Bad time sent to setup.time.format function");
    console.trace();
    return "[Error check console]";
  }
  aw.con.info ("Result of the time format func:" + h + " and " + m);
  hw = (h === 1) ? "hour" : "hours";
  mw = (m === 1) ? "minute" : "minutes";
  if (h > 0) {
    return `${h} ${hw} and ${m} ${mw}`;
  } else {
    return `${m} ${mw}`;
  }
};

/*Alerts players that they should go to sleep*/
setup.time.toSleepMessage = function(): false|string {
  const ᛔ = State.active.variables;
  let j = ᛔ.date[0];
  let msg;
  if (!ᛔ.time[2]) {
    j += 1;
    if (j > 7) {
      j = 1;
    }
  }
  if (ↂ.sched.workDays[j] && !ↂ.sched.vacation[j] && !ↂ.sched.sick[j]) {
    msg = "<center><span class='white blurrier' style='font-size:120%'>It's getting late...</span></center><br><br>";
    msg += "Perhaps you should consider getting ready for bed...";
    return msg;
  }
  return false;
};


// generates text for upcoming appointment alert
setup.time.appointmentAlert = function(appt: AppointmentInfo): string {
  let msg;
  try {
    switch (appt.type) {
    case "quest": // game or quest alert
      msg = `<span class='head3'>${appt.name} Reminder:</span><br><br>`;
      if (appt.msg != null && appt.msg !== "none") {
        msg += appt.msg;
      } else {
        msg += "There doesn't seem to be any further details.";
      }
      break;
    case "reminder": // player custom reminder
      msg = `<span class='head3'>Custom Reminder:</span> ${appt.name}<br><br>`;
      if (appt.msg != null && appt.msg !== "none") {
        msg += appt.msg;
      } else {
        msg += "Looks like you didn't bother to actually record a message.";
      }
      break;
      // Seems we dont use it now anyway
    /*case "reminder": // standard type appointment doctor/office/etc
      msg = `<span class='head3'>Appointment Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${appt.start}`;
      if (appt.msg != null && appt.msg && appt.msg !== "none") {
        msg += "<br>" + appt.msg;
      }
      break; */
    case "npcPlans": // plans with NPC (not a date)
      msg = `<span class='head3'>Meetup Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${appt.start}`;
      if (appt.msg != null && appt.msg && appt.msg !== "none") {
        msg += "<br>" + appt.msg;
      }
      break;
    case "groupPlans": // group NPC plans
      msg = `<span class='head3'>Meetup Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${appt.start}`;
      if (appt.msg != null && appt.msg && appt.msg !== "none") {
        msg += "<br>" + appt.msg;
      }
      break;
    case "date": // A DATE!
      msg = `<span class='head3'>Date Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${setup.time.toArray(appt.start)[0]}:${setup.time.toArray(appt.start)[1]}`;
      if (appt.msg != null && appt.msg && appt.msg !== "none") {
        msg += "<br>" + appt.msg;
      }
      break;
    case "hangout": // speaks for itself
      msg = `<span class='head3'>Hangout Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${setup.time.toArray(appt.start)[0]}:${setup.time.toArray(appt.start)[1]}`;
      if (appt.msg != null && appt.msg && appt.msg !== "none") {
        msg += "<br>" + appt.msg;
      }
      break;
    default:
      msg = "Error: Invalid appointment type in appointment object.";
    }
  } catch (e) {
    aw.con.error("Something went wrong with setup.time.appointmentAlert", e);
    msg = "Some kind of error happened when formatting the appointment reminder.";
  }
  return msg;
};

// increases drug need with time - automatic
setup.time.addictNeedIncrease = function(): void {
  const addict = ↂ.pc.status.addict;
  const adds = ["sex", "alc", "heat", "satyr", "focus", "cum", "zone", "cream"];
  const needs = ["sexNeed", "alcNeed", "heatNeed", "satyrNeed", "focusNeed", "cumNeed", "zoneNeed", "creamNeed"];
  const names = ["sex", "alcohol", "Heat", "Satyr", "Focus", "Cum", "Zone", "Cream"];
  for (let i = 0; i < adds.length; i++) {
    if (addict[adds[i]] >= 90) {
      addict[needs[i]] += 4;
      if (random(1, 400) === 300) {
        addict[adds[i]] -= 1;
      }
    } else if (addict[adds[i]] >= 70) {
      addict[needs[i]] += 3;
      if (random(1, 300) === 300) {
        addict[adds[i]] -= 1;
      }
    } else if (addict[adds[i]] >= 50) {
      addict[needs[i]] += 2;
      if (random(1, 300) === 300) {
        addict[adds[i]] -= 1;
      }
    } else if (addict[adds[i]] >= 35) {
      addict[needs[i]] += 1;
      if (random(1, 200) === 200) {
        addict[adds[i]] -= 1;
      }
    } else if (addict[adds[i]] < 25 && addict[adds[i]] > 0) {
      if (random(1, 100) === 100) {
        addict[adds[i]] -= 1;
      }
    }
    if (addict[needs[i]] >= 99 && ↂ.pc.status.addict.withdrawl === false) {
      setTimeout(function() {
        setup.time.withdrawl(adds[i], names[i]);
      });
    }
  }
  aw.S();
  return;
};

// applies drug withdrawal effects
setup.time.withdrawl = function(drug: "sex" | "alc" | "heat" | "satyr" | "focus" | "cum" | "zone" | "cream", names: string): void {
  if (setup.omni.matching("Withdrawal") === 0) {
  const omni = setup.drug.omniGen(drug) as IntOmniData;
  setup.omni.new(omni);
  setup.notify(`<span class="bad">You have went into ${names} withdrawal!</span>`);
  }
  

};


setup.time.convertToDate = function(val: number): string {
  let aw = val;
  const year = Math.floor(aw / 525600) + 2032;
  aw = aw % 525600;
  let month = 1 + Math.floor(aw / 40320);
  if (month === 14) {
    month = 0;
  }
  aw = aw % 40320;
  const day = 1 + Math.floor(aw / 1440);
  aw = aw % 1440;
  const hour = Math.floor(aw / 60);
  aw = aw % 60;
  const min = (aw < 10) ? "0" + aw : aw;
  const daynames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekday = daynames[(day % 7)];
  if (hour === 0 && min === "00") {
    return `Midnight ${weekday} morning, ${setup.monthName(month)} ${setup.numberLetAbrv(day)}, ${year}.`;
  }
  return `${hour}:${min} ${weekday}, ${setup.monthName(month)} ${setup.numberLetAbrv(day)}, ${year}.`;
};

setup.time.humanInterfaceToDate = function(day: number, month: number, nextyear: boolean): [number, boolean] { // returns aw.time styled date, true if date is okay, false is it is borked.
  if (day < 1 || day > 28 || month < 1 || month > 13) {
    aw.con.warn(`setup.time.humanInterfaceToDate was supplied with broken date: ${day}, ${month}, ${nextyear}`);
    return [0, false];
  } else {
    const formatWeek = (Math.floor((day - 1) / 7) + 1);
    const formatDay = (Math.floor(formatWeek / (Math.floor((formatWeek - 1) / 7) + 1)));
    let formatYear = 2032;
    if (nextyear) {
      formatYear = (aw.timeArray[5] + 1);
    } else {
      formatYear = aw.timeArray[5];
    }
    return [setup.time.dateToVal([formatDay, formatWeek, month, formatYear]), true];
  }
};


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*  ███╗   ███╗ █████╗  ██████╗██████╗  ██████╗ ███████╗  */
/*  ████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝  */
/*  ██╔████╔██║███████║██║     ██████╔╝██║   ██║███████╗  */
/*  ██║╚██╔╝██║██╔══██║██║     ██╔══██╗██║   ██║╚════██║  */
/*  ██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║╚██████╔╝███████║  */
/*  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝  */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

Macro.add(["dayName", "dayname"], {
  handler() {
    let name: string;
    if ("number" !== typeof this.args[0] || this.args[0] < 0 || this.args[0] > 7) {
      name = setup.eMsg("Bad day number given to day name macro. [valid = number 0-7]");
    } else {
      name = setup.time.dayName(this.args[0]);
    }
    return new Wikifier(this.output, name);
  },
});
Macro.add(["monthName", "monthname"], {
  handler() {
    let name: string;
    if ("number" !== typeof this.args[0] || this.args[0] < 0 || this.args[0] > 13) {
      name = setup.eMsg("Bad month number given to day name macro. [valid = number 0-13]");
    } else {
      name = setup.time.monthName(this.args[0]);
    }
    return new Wikifier(this.output, name);
  },
});
Macro.add(["dateDisplay", "datedisplay"], {
  handler() {
    const dateStr = setup.time.dateDisplay();
    return new Wikifier(this.output, dateStr);
  },
});
Macro.add("dateCalculate", {
  handler() {
    setup.time.dateChange();
  },
});
Macro.add(["addTime", "addtime"], {
  handler() {
    let t;
    if (this.args.length < 1) {
      return this.error("addTime macro is missing time argument.");
    } else if (this.args.length === 1 && "number" === typeof this.args[0]) {
      setup.time.add(this.args[0]);
    } else if (this.args.length === 2 && "number" === typeof this.args[0] && "number" === typeof this.args[1]) {
      t = (this.args[0] * 60) + this.args[1];
      setup.time.add(t);
    } else if (this.args.length === 2 && "number" === typeof this.args[0] && "boolean" === typeof this.args[1]) {
      setup.time.add(this.args[0], this.args[1]);
    } else if (this.args.length === 3 && "number" === typeof this.args[0] && "number" === typeof this.args[1]
    && "boolean" === typeof this.args[2]) {
      t = (this.args[0] * 60) + this.args[1];
      try {
      setup.time.add(t, this.args[2]);
      } catch (e) {
        aw.con.error("ERROR addTime macro error executing setup.time.add()...", e);
      }
    } else {
      return this.error("Invalid argument/s");
    }
  },
});
Macro.add(["setTime", "settime"], {
  handler() {
    if (this.args.length < 1) {
      return this.error("setTime macro is missing time argument.");
    } else if (this.args.length === 1 && "number" === typeof this.args[0]) {
      setup.time.set(this.args[0]);
    } else if (this.args.length >= 2 && "number" === typeof this.args[0] && "number" === typeof this.args[1]) {
      if (this.args.length === 2) {
        setup.time.set(this.args[0], this.args[1]);
      } else if (this.args.length === 3 && "boolean" === typeof this.args[2]) {
        setup.time.set(this.args[0], this.args[1], this.args[2]);
      } else if (this.args.length === 4 && "boolean" === typeof this.args[2] && "boolean" === typeof this.args[3]) {
        setup.time.set(this.args[0], this.args[1], this.args[2], this.args[3]);
      } else {
        return this.error("Invalid argument/s");
      }
    } else if (Array.isArray(this.args[0])) {
      switch (this.args[0].length) {
      case 1:
        setup.time.set(this.args[0][0]);
        break;
      case 2:
        setup.time.set(this.args[0][0], this.args[0][1]);
        break;
      case 3:
        setup.time.set(this.args[0][0], this.args[0][1], this.args[0][2]);
        break;
      case 4:
        setup.time.set(this.args[0][0], this.args[0][1], this.args[0][2], this.args[0][3]);
        break;
      }
    } else {
      return this.error("Invalid argument/s");
    }
  },
});
Macro.add("greetings", { // time aware greeting because i am too bored to write the logic every time from scratch.
  handler() {
    let out = "";
    const tim = setup.time.minutes();
    if (tim < 360) {
      out = "Good night!";
    } else if (tim < 720) {
      out = "Good morning!";
    } else if (tim < 1020) {
      out = "Good afternoon!";
    } else {
      out = "Good evening!";
    }
    return new Wikifier(this.output, out);
  },
});
/*

OLD TIME SAVER CODE:
setup.time.saver = function(){
  const ᛔ = State.active.variables;
  let okay = true;
  if (ᛔ.time == null) {
    aw.con.warn(`$time CORRUPTED: Null Value - restoring from backup. (${setup.time.timeBackup})`);
    ᛔ.time = [setup.time.timeBackup[0], setup.time.timeBackup[1], setup.time.timeBackup[2]];
    okay = false;
  }
  if (!Array.isArray(ᛔ.time)) {
    aw.con.warn(`$time CORRUPTED: Non-Array - restoring from backup. (${setup.time.timeBackup})`);
    ᛔ.time = [setup.time.timeBackup[0], setup.time.timeBackup[1], setup.time.timeBackup[2]];
    okay = false;
  } else {
    if (isNaN(ᛔ.time[0])) {
      aw.con.warn(`$time CORRUPTED: Non-numeric hour value. Will restore from backup.`);
      ᛔ.time = [setup.time.timeBackup[0], setup.time.timeBackup[1], setup.time.timeBackup[2]];
      okay = false;
    } else if (isNaN(ᛔ.time[1])) {
      aw.con.warn(`$time CORRUPTED: Non-numeric minute value. Will restore from backup.`);
      ᛔ.time = [setup.time.timeBackup[0], setup.time.timeBackup[1], setup.time.timeBackup[2]];
      okay = false;
    } else if ("boolean" !== typeof ᛔ.time[2]) {
      aw.con.warn(`$time CORRUPTED: Non-boolean aft value. Will restore from backup.`);
      ᛔ.time = [setup.time.timeBackup[0], setup.time.timeBackup[1], setup.time.timeBackup[2]];
      okay = false;
    }
  }
  if (okay) {
    setup.time.timeBackup = [ᛔ.time[0], ᛔ.time[1], ᛔ.time[2]];
  }
  okay = true;
  if (ᛔ.date == null) {
    aw.con.warn(`$date CORRUPTED: Null Value - restoring from backup. (${setup.time.dateBackup})`);
    ᛔ.date = [setup.time.dateBackup[0], setup.time.dateBackup[1], setup.time.dateBackup[2], setup.time.dateBackup[3]];
    okay = false;
  }
  if (!Array.isArray(ᛔ.date)) {
    aw.con.warn(`$date CORRUPTED: Non-Array - restoring from backup. (${setup.time.dateBackup})`);
    ᛔ.date = [setup.time.dateBackup[0], setup.time.dateBackup[1], setup.time.dateBackup[2], setup.time.dateBackup[3]];
    okay = false;
  }
  if (okay) {
    setup.time.dateBackup = [ᛔ.date[0], ᛔ.date[1], ᛔ.date[2], ᛔ.date[3]];
  }
  aw.S();
  return;
};

OLD AFTER AND UNTIL FUNCTIONS

setup.time.after = function(hr: number|time, min: number = 0, aft: boolean = false): boolean {
  if (Array.isArray(hr)) {
    if ("number" !== typeof hr[0] || "number" !== typeof hr[1]) {
      aw.con.warn(`Invalid value ${hr} sent to time.after function. Times must be numbers or array of numbers.`);
      return false;
    } else if (hr.length < 2) {
      aw.con.warn("Incomplete time array sent to time.after function. Arrays must include minute value.");
      return false;
    } else {
      min = hr[1];
      aft = (hr.length === 3) ? hr[2] : false;
      hr = hr[0];
    }
  }
  if ("number" !== typeof hr || "number" !== typeof min) {
    aw.con.warn(`Invalid value ${hr} sent to time.after function. Times must be numbers or array of numbers.`);
    return false;
  }
  const time = State.active.variables.time;
  const t1 = (time[0] * 60) + time[1];
  const t2 = (hr * 60) + min;
  if (t2 > t1 && !time[2]) {
    return true;
  } else if (!time[2] && aft) {
    return true;
  } else {
    return false;
  }
};


// returns the minutes until input time, -1 if past input time
setup.time.until = function(hr: time|number, min: number = 0, aft: boolean = false): number {
  if (Array.isArray(hr)) {
    if ("number" !== typeof hr[0] || "number" !== typeof hr[1]) {
      throw new TypeError(`Invalid value ${hr} sent to time.until function. Times must be numbers or array of numbers.`);
    } else if (hr.length < 2) {
      throw new SyntaxError("Incomplete time array sent to time.until function. Arrays must include minute value.");
    } else {
      min = hr[1];
      aft = (hr.length === 3) ? hr[2] : false;
      hr = hr[0];
    }
  }
  if ("number" !== typeof hr || "number" !== typeof min) {
    throw new TypeError(`Invalid value ${hr} sent to time.after function. Times must be numbers or array of numbers.`);
  }
  const time = State.active.variables.time;
  const after = setup.time.after(hr, min, aft);
  if (!after) {
    let t1 = (time[0] * 60) + time[1];
    let t2 = (hr * 60) + min;
    t1 += time[2] ? 1440 : 0;
    t2 += aft ? 1440 : 0;
    let res = t2 - t1;
    res *= (res > 0) ? -1 : 1;
    return res;
  } else {
    let t1 = (time[0] * 60) + time[1];
    let t2 = (hr * 60) + min;
    t1 += time[2] ? 1440 : 0;
    t2 += aft ? 1440 : 0;
    let res = t2 - t1;
    res *= (res < 0) ? -1 : 1;
    return res;
  }
};




*/
