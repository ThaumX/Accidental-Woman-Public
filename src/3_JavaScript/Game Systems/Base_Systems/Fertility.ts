/*
███████╗███████╗██████╗ ████████╗██╗██╗     ██╗████████╗██╗   ██╗
██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
█████╗  █████╗  ██████╔╝   ██║   ██║██║     ██║   ██║    ╚████╔╝
██╔══╝  ██╔══╝  ██╔══██╗   ██║   ██║██║     ██║   ██║     ╚██╔╝
██║     ███████╗██║  ██║   ██║   ██║███████╗██║   ██║      ██║
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝
*/

interface setupFert {
  test: () => void;
  cycle: (tgt?: 0 | npcid) => void;
  riskyDay: (day: number, length: number) => number;
  cycDay: (day: number, days: number[]) => number;
  thinkBC: (tgt: 0 | npcid) => boolean | Error;
  thinkPreg: (tgt: 0 | npcid) => boolean | Error;
  dayOfCycle: (tgt: 0 | npcid) => number;
  daysTillOvulate: (tgt: 0 | npcid) => number;
  goddessCheck: (id: string) => void;
  playerStatsCalc: () => void;
  spread: (tgt: "pc" | npcid, dir: "time" | "in" | "out" | "plunger" | "scoop out" | "push in" | "scoop in" | "diaphragm") => void;
  finalMove: (tgt: "pc" | npcid) => void;
  migrate: (tgt: "pc" | npcid) => void;
  spermAge: (tgt: "pc" | npcid) => void;
  ovulate: (tgt: "pc" | npcid) => void;
  zygoteCheck: (tgt: "pc" | npcid) => void;
  printCum: () => string;
  printZygote: () => string;
  printFetus: () => string;
  dailyGrowth: (tgt: "pc" | npcid, womb: "A"|"B") => [number, number];
  fetusCheck: (tgt: "pc" | npcid) => void;
  birthCheck: (tgt: "pc" | npcid) => void;
  pcBirth: (womb: "A" | "B") => IntPcBirthReturn;
  birthingScene: (womb: "A" | "B") => twee;
  birthCon: () => void;
  fetusHeal: () => void;
  fetusGrow: () => void;
  tummyHugger: () => string;
  condomBreakCheck: ({ effect, health, sabo, acidPre, acidVag, powerEjac, bitchBreaker, cumVol}: intBreakData) => boolean;
  cleanseBirthCon: (tgt: "pc" | npcid) => void;
  progenerateInseminate: () => void;
  fetusHealth: (amt: number, tgt?: "pc" | npcid) => void;
}

setup.fert = {} as setupFert;

// fast pregnancy test - outputs to Dialog
setup.fert.test = function(): void {
  const ᛔ = State.active.variables;
  aw.L();
  let output = "<h3>Fertility Status</h3>";
  if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
    output += "<span style='font-size:1.15rem;'><b>PREGNANT</b></span>";
  } else {
    output += "<span style='font-size:1.15rem;'><b>NOT PREGNANT</b></span>";
  }
  output += `<div class="ship monospace" style="border-style:dotted;border-color:deepskyblue;border-width:1px;border-radius:5px;text-align:left;padding:8px;margin:10px 3px;">`;
  let days;
  if (ↂ.pc.status.wombA.days > ↂ.pc.status.wombB.days) {
    days = ↂ.pc.status.wombA.days;
  } else {
    days = ↂ.pc.status.wombB.days;
  }
  output += `<b>Pregnant For:</b> ${days} Days<br><b>Estimated Gestation Duration:</b> ${ↂ.pc.fert.pregTerm} Weeks<br><b>Fertility Score:</b> ${ↂ.pc.fert.fertility} (Progenerate Technologies Index)`;
  if (ↂ.pc.fert.boost > 0) {
    output += `<br><b>NOTICE:</b> Indication of fertility stimulation detected`;
  }
  output += "</div>";
  output += `<center><<button "TEXT DETAILED RESULTS">><<interact "Your Fertility Results" 1>><<include [[MENU-FertilityReport]]>><</interact>><<run Dialog.close()>><</button>></center>`;
  if (ↂ.pc.status.wombA.preg) {
    ↂ.pc.status.wombA.know = true;
  } else if (ↂ.pc.status.wombB.preg) {
    ↂ.pc.status.wombB.know = true;
  }
  aw.S();
  setup.dialog("Test Results", output);
};

/*Function for running a menstrual cyle of death*/
// updates npc/pc status variables for menstrual cycle
setup.fert.cycle = function(tgt: 0 | npcid = 0): void {
  const AW = State.active.variables;
  let cycDay: number;
  let cycLength: number;
  let char: PC | NPC;
  let ovuDays;
  let cycStart;
  let ovuMod;
  let sOv;
  let periodLeng: number;
  const d = AW.date;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if (tgt === 0) {
    char = ↂ.pc;
  } else if (pattern.test(tgt)) {
    char = aw.npc[tgt];
  } else {
    aw.con.warn(`invalid target: ${tgt} given to fert.cycle function.`);
    return;
  }
  cycLength = char.fert.cycle;
  cycStart = char.fert.cycStart;
  ovuMod = char.fert.ovuMod;
  periodLeng = char.fert.period;
  cycDay = setup.fert.dayOfCycle(tgt);
  if (cycDay === 1) {
    ovuMod = randomDist([2, 3, 3, 4, 3, 3, 2]) - 3;
    char.fert.ovuMod = ovuMod;
    ↂ.pc.fert.aftOvulate = false;
  } else if (cycDay === cycLength) {
    if (d[0] < 7) {
      cycStart = [d[0] + 1, d[1]];
    } else if (d[1] < 4) {
      cycStart = [1, d[1] + 1];
    } else {
      cycStart = [1, 1];
    }
    char.fert.cycStart = [cycStart[0], cycStart[1]];
  }
  if (char.mutate.cycle) {
    const m = Math.floor(cycLength / 2) + ovuMod;
    ovuDays = [m - 2, m , m + 2];
    sOv = m - 2;
  } else {
    const m = Math.floor(cycLength / 2) + ovuMod;
    ovuDays = [m];
    sOv = m;
  }
  if ((char.status.wombA.preg && char.status.wombA.know) || (char.status.wombB.preg && char.status.wombB.know)) {
    const w = (char.status.wombA.weeks >= char.status.wombB.weeks) ? char.status.wombA.weeks : char.status.wombB.weeks;
    char.status.fertText = `${w} weeks pregnant`;
    char.status.period = 0;
    char.status.risk = 0;
  }
  char.status.risk = setup.fert.riskyDay(cycDay, cycLength);
  char.status.cyc = setup.fert.cycDay(cycDay, ovuDays);
  const f = [
    "safe day",
    "safe day",
    "likely safe",
    "risky day",
    "dangerous day",
    "ovulating",
  ];
  if (!char.status.wombA.know && !char.status.wombB.know) {
    if (ↂ.flag.fertilitySeal || ↂ.home.upgrade.toiletFert) {
      char.status.fertText = f[char.status.cyc]; // accurate info on phone display
    } else {
      char.status.fertText = f[char.status.risk];
    }
  }
  aw.con.info(`Cycle info - Risky: ${char.status.risk}, Cycle: ${char.status.cyc}, Text: ${char.status.fertText}`);
  if (char.status.cyc === 5) { // ovulating
    if (char.status.wombA.zygote.length > 0 || (char.mutate.twinWomb && char.status.wombB.zygote.length > 0)) {
      aw.con.info(`Ovulation flag NOT set due to presence of zygotes in womb.`);
    } else {
      char.fert.ovuFlag = true;
      aw.con.info(`Ovulation flag set to true!`);
    }
  }
  if (cycDay <= periodLeng && !char.status.pregnant) {
    const str = [
      [69, 0],
      [69, 3],
      [69, 3, 1],
      [69, 2, 3, 1],
      [69, 2, 3, 2, 1],
      [69, 2, 3, 3, 2, 1],
      [69, 3, 4, 3, 2, 2, 1],
      [69, 3, 4, 3, 3, 2, 2, 1],
      [69, 3, 4, 3, 3, 2, 2, 2, 1],
    ];
    const desc = [
      "none",
      "light period",
      "period",
      "heavy period",
      "stuck pig",
    ];
    char.status.period = str[periodLeng][cycDay];
    char.status.fertText = desc[char.status.period];
  } else {
    char.status.period = 0;
  }
  if (tgt === 0) {
    aw.S();
  }
};

// subfunction, calculates the relative riskiness of day of cycle for cycle of length
setup.fert.riskyDay = function(day: number, length: number): number {
  const fov = (length < 26) ? 13 : 14;
  if (day < (fov - 7)) {
    return 1;
  } else if (day < (fov - 5)) {
    return 2;
  } else if (day < (fov - 3)) {
    return 3;
  } else if (day < fov) {
    return 4;
  } else if (day === fov) {
    return 5;
  } else if (day < (fov + 2)) {
    return 3;
  } else if (day < (fov + 4)) {
    return 2;
  } else {
    return 0;
  }
};

// as with riskyDay, except that it also includes the ovuMod change to ovulation day.
setup.fert.cycDay = function(day: number, days: number[]): number {
  let fov = (days.length === 1) ? days[0] : days[1];
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i] >= day) {
      fov = days[i];
    }
  }
  if (day < (fov - 7)) {
    return 1;
  } else if (day < (fov - 5)) {
    return 2;
  } else if (day < (fov - 3)) {
    return 3;
  } else if (day < fov) {
    return 4;
  } else if (day === fov) {
    return 5;
  } else if (day < (fov + 2)) {
    return 3;
  } else if (day < (fov + 4)) {
    return 2;
  } else {
    return 0;
  }
};

// returns if character thinks they are on birthcontrol
setup.fert.thinkBC = function(tgt: 0 | npcid = 0): boolean | Error {
  let char;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if (tgt === 0) {
    char = ↂ.pc;
  } else if (pattern.test(tgt)) {
    char = aw.npc[tgt];
  } else {
    return new SyntaxError(`invalid target: ${tgt} given to fert.thinkBC function.`);
  }
  if (char.status.birthCon.hormoneType === "none") { return false; }
  if (char.status.BCineffective && char.status.knowBCineffective) { return false; }
  return true;
};

// returns if character knows they are pregnant
setup.fert.thinkPreg = function(tgt: 0 | npcid = 0): boolean | Error {
  let char: PC | NPC;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if (tgt === 0) {
    char = ↂ.pc;
  } else if (pattern.test(tgt)) {
    char = aw.npc[tgt];
  } else {
    return new SyntaxError(`invalid target: ${tgt} given to fert.thinkBC function.`);
  }
  if (char.status.wombA.know || char.status.wombB.know) {
    return true;
  } else {
    return false;
  }
};

// returns current day of character's cycle
setup.fert.dayOfCycle = function(tgt: 0 | npcid = 0): number {
  const d = State.active.variables.date;
  let dDays;
  let cDays;
  let char;
  let c;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if (tgt === 0) {
    char = ↂ.pc;
  } else if (pattern.test(tgt)) {
    char = aw.npc[tgt];
  } else {
    throw SyntaxError(`invalid target: ${tgt} given to dayOfCycle function.`);
  }
  c = char.fert.cycStart;
  dDays = (d[1] - 1) * 7 + d[0];
  cDays = (c[1] - 1) * 7 + c[0];
  if (cDays === dDays) {
    return 1;
  } else if (dDays > cDays) {
    return (dDays - cDays) + 1;
  } else if (dDays < cDays) {
    dDays += 28;
    return (dDays - cDays) + 1;
  } else {
    setup.alert(`WTF error with fert.dayOfCycle - month days = ${dDays}, cycle days = ${cDays}.`);
    return 0;
  }
};

setup.fert.daysTillOvulate = function(tgt: 0 | npcid = 0): number {
  let char: PC | NPC;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if (tgt === 0) {
    char = ↂ.pc;
  } else if (pattern.test(tgt)) {
    char = aw.npc[tgt];
  } else {
    aw.con.warn(`invalid target: ${tgt} given to fert.thinkBC function.`);
    return 99;
  }
  const cycleDay: number = setup.fert.dayOfCycle(tgt);
  let halfway: number = Math.ceil(char.fert.cycle / 2) + char.fert.ovuMod;
  if (char.mutate.cycle) {
    const ovuDays = [halfway - 2, halfway, halfway + 2];
    for (let i = 2; i >= 0; i--) {
      if (ovuDays[i] >= cycleDay) {
        halfway = ovuDays[i];
      }
    }
  }
  if (halfway === cycleDay) {
    return 0;
  } else if (cycleDay < halfway) {
    return halfway - cycleDay;
  } else {
    return (char.fert.cycle - cycleDay) + halfway;
  }
};

setup.fert.goddessCheck = function(id: string = "pc"): void {
  let ᚠ: PC | NPC = ↂ.pc;
  if (id !== "pc") {
    ᚠ = aw.npc[id];
  }
  // check if fertility storm mutation is true FIRST.
  if (ᚠ.mutate.cycle && ᚠ.mutate.multiple && ᚠ.mutate.twinWomb && ᚠ.fert.fertility >= 5 && ᚠ.body.hips >= 5 && ᚠ.body.pelvis >= 5 && ᚠ.kink.risky && ᚠ.body.tits.base.cupNum > 14) {
    ᚠ.mutate.fertStorm = true;
    ᚠ.fert.fertility += 1;
    if (ᚠ.fert.fertility < 7) {
      ᚠ.fert.fertility += 7;
    } else if (ᚠ.fert.fertility > 8) {
      ᚠ.fert.fertility = 8;
    }
    aw.con.info(`Fertility Storm check passed.`);
  } else {
    ᚠ.mutate.fertStorm = false;
    if (ᚠ.fert.fertility > 7) {
      ᚠ.fert.fertility = 7;
    }
  }
  // Now check for fertility goddess (only possible if also fertr storm)
  if (ᚠ.mutate.fertStorm && ᚠ.fert.fertility >= 7 && ᚠ.mutate.birthCon && ᚠ.mutate.gestate && ᚠ.body.hips >= 6 && ᚠ.body.pelvis >= 6 && ᚠ.kink.pregnancy && (ᚠ.mutate.acid || ᚠ.mutate.mouth) && ᚠ.trait.libido >= 5 && ᚠ.body.tits.base.cupNum > 19) {
    ᚠ.mutate.goddess = true;
    ᚠ.fert.fertility += 1;
    if (ᚠ.fert.fertility < 8) {
      ᚠ.fert.fertility = 8;
    } else if (ᚠ.fert.fertility > 9) {
      ᚠ.fert.fertility = 9;
    }
    aw.con.info(`Fertility Goddess check passed.`);
  } else {
    ᚠ.mutate.goddess = false;
    if (ᚠ.fert.fertility > 8) {
      ᚠ.fert.fertility = 8;
    }
  }
  aw.S();
};

setup.fert.playerStatsCalc = function(): void {
  const f = ↂ.pc.fert;
  f.fertility = Number(f.fertility);
  switch (f.fertility) {
    case 0:
      f.egg = 1;
      f.implant = 2;
      f.vagHostile = random(1, 3);
      f.period = 4;
      f.wombHealth = 2;
      f.multEgg = 1;
      f.barren = true;
      f.femaleFlag = ["barren"];
      break;
    case 1:
      f.egg = 5;
      f.implant = 7;
      f.vagHostile = random(5, 7);
      f.period = 6;
      f.wombHealth = 1;
      f.multEgg = 3;
      f.femaleFlag = ["barely"];
      break;
    case 2:
      f.egg = 10;
      f.implant = 7;
      f.vagHostile = random(8, 10);
      f.period = 5;
      f.multEgg = 10;
      f.femaleFlag = ["none"];
      break;
    case 3:
      f.egg = 14;
      f.implant = 10;
      f.vagHostile = random(11, 13);
      f.period = 4;
      f.multEgg = 15;
      f.femaleFlag = ["none"];
      break;
    case 4:
      f.egg = 17;
      f.implant = 12;
      f.vagHostile = random(14, 16);
      f.period = 3;
      f.multEgg = 18;
      f.femaleFlag = ["none"];
      break;
    case 5:
      f.egg = 20;
      f.implant = 15;
      f.vagHostile = random(17, 19);
      f.period = 2;
      f.multEgg = 24;
      f.femaleFlag = ["none"];
      break;
    case 6:
      f.egg = 23;
      f.implant = 18;
      f.vagHostile = random(20, 22);
      f.period = 2;
      f.multEgg = 36;
      f.femaleFlag = ["none"];
      break;
    case 7:
      f.egg = 26;
      f.implant = 24;
      f.vagHostile = random(23, 25);
      f.period = 1;
      f.wombHealth = -1;
      f.multEgg = 54;
      f.femaleFlag = ["fertStorm"];
      break;
    case 8:
      f.egg = 30;
      f.implant = 30;
      f.vagHostile = random(26, 28);
      f.period = 1;
      f.wombHealth = -2;
      f.multEgg = 78;
      f.femaleFlag = ["fertStorm", "goddess"];
      break;
    case 9:
      f.egg = 46;
      f.implant = 38;
      f.vagHostile = 30;
      f.period = 1;
      f.wombHealth = -3;
      f.multEgg = 114;
      f.femaleFlag = ["fertStorm", "goddess", "broodmother"];
      break;
    default:
      f.egg = 17;
      f.implant = 12;
      f.vagHostile = random(16, 18);
      f.period = 3;
      f.multEgg = 18;
      aw.con.warn(`Invalid ↂ.pc.fert.fertility value discovered! (value: ${f.fertility})`);
      break;
  }
  if (ↂ.pc.mutate.multiple) {
    f.multEgg += 200;
  }
  if (ↂ.pc.mutate.cycle) {
    f.period = 1;
  }
  if (ↂ.pc.mutate.period) {
    f.period = 0;
  }
  f.cycle = 31 - ↂ.pc.fert.fertility;
  if (ↂ.pc.fert.cycle > 28) {
    f.cycle = 28;
  } else if (ↂ.pc.fert.cycle < 23) {
    f.cycle = 23;
  }
  if (ↂ.pc.mutate.twinWomb) {
    ↂ.pc.status.wombB.exists = true;
  } else {
    ↂ.pc.status.wombB.exists = false;
  }
  aw.S();
};

setup.fert.spread = function(tgt: "pc"|npcid = "pc",
                             dir: "time"|"in"|"out"|"plunger"|"scoop out"|"push in"|"scoop in"|"diaphragm"|"douche" = "time"): void {
  // subfunction to get reference to correct fertility object
  const refGet = function(): Fert {
    if (tgt === "pc") {
      return ↂ.pc.fert;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt].fert;
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.spread.`);
      return ↂ.pc.fert;
    }
  };
  const message = ["none"]; // to track "drip" messages
  // merges cum objects from same owner/time to reduce clutter
  const merge = function(at: "all" | FemaleReproTract = "all"): void {
    const locs: string[] = [];
    if (at === "all") {
      locs.push("vulva", "vest", "mid", "deep", "cervix", "womb", "ovary");
    } else {
      locs.push(at);
    }
    for (const loc of locs) {
      if (ᚥ.fluid[loc].length > 1) { // only need to merge if there are multiple Cum objects
        const ᚠ = ᚥ.fluid[loc];
        for (let i = 0, c = ᚠ.length; i < c; i++) {
          const current = ᚠ[i];
          const toDelete: number[] = [];
          for (let j = i + 1, d = ᚠ.length; j < d; j++) {
            if (current.owner === ᚠ[j].owner && current.omniTime === ᚠ[j].omniTime) {
              // it's a match, merge those puppies!
              current.vol = Math.round(current.vol + ᚠ[j].vol);
              current.amt = Math.round(current.amt + ᚠ[j].amt); // add important values
              toDelete.unshift(j); // add index to delete list. deleting now would cause skippage
            }
          }
          if (toDelete.length > 0) { // delete the merged cums
            ᚠ.deleteAt(...toDelete);
          }
        }
      }
    }
  };
    // moves percentage of cum from one area to another
  const move = function(from: FemaleReproTract, direction: "inward"|"outward"|"cervward", percent: number): void {
    // note that cervix placement means not all move is necessarily straight line
    const dests = {
      inward : {
        vulva: "vest",
        vest: "mid",
        mid: ["deep", "cervix"],
        deep: ["deep", "cervix"],
        cervix: "womb",
      },
      outward : {
        deep: ["cervix", "mid"],
        cervix: ["mid", "womb"],
        mid: "vest",
        vest: "vulva",
        vulva: "delete",
      },
      cervward : {
        vulva: "vest",
        vest: "mid",
        mid: "cervix",
        deep: "cervix",
        cervix: "womb",
      },
    };
    const drugs = setup.drug.isOn();
    const survivalBase = (drugs.includes("satyrfert")) ? 80 : 90; // something of a setting here, higher = more sperm death
    const desto = dests[direction][from]; // set destination/s
    const per = percent / 100;
    for (const cum of ᚥ.fluid[from]) {
      if (cum.vol > 0) {
        // death const is percentage of sperm that survive per operation.
        const death = Math.max(0.01, Math.min(0.98, (100 - (survivalBase - (cum.surv * 4 + Math.round(ᚥ.vagHostile * 2)))) / 100));
        cum.amt = Math.round(cum.amt * death);
        if (desto === "womb") {
          if (!drugs.includes("heatfert")) { // dialates cervix, all sperm penetrate
            const pene = Math.max(0, Math.min(1, (ᚥ.vagHostile * 4 + cum.surv * 2 - 38) / 100));
            cum.amt = Math.round(cum.amt * pene);
          }
        }
        if (((Array.isArray(desto) && desto.includes("cervix")) || desto === "cervix") && tgt === "pc" && ↂ.pc.status.birthCon.diaphragm.worn) {
          const multo = (100 - (ↂ.pc.status.birthCon.diaphragm.effect - (ↂ.pc.status.birthCon.diaphragm.sabo * 4))) / 100;
          cum.amt = Math.round(cum.amt * multo);
          cum.vol = Math.round(cum.vol * multo);
        }
        const nuCum = {
          owner: cum.owner,
          vol: Math.round(cum.vol * per),
          qual: cum.qual,
          surv: cum.surv,
          quant: cum.quant,
          amt: Math.round(cum.amt * per),
          time: clone(cum.time),
          date: clone(cum.date),
          omniTime: cum.omniTime,
        };
        // subtract new cum from original
        cum.vol -= Math.round(nuCum.vol);
        cum.amt -= Math.round(nuCum.amt);
        if (Array.isArray(desto)) {
          // must split nuCum in half, and then push to array locs
          nuCum.vol = Math.floor(nuCum.vol / 2);
          nuCum.amt = Math.floor(nuCum.amt / 2);
          // now push to locations, start w/ index 0
          ᚥ.fluid[desto[0]].push(new Cum(nuCum));
          // merge any cum from same owner&time in the destination
          merge(desto[0]);
          // now array index 1
          if (desto[1] === "womb") { // pre condense if traveling to womb
            nuCum.vol = 0;
            nuCum.quant = 0;
            nuCum.amt = Math.round(nuCum.amt * 0.35 * death * death * death);
          }
          // move to singular array.
          ᚥ.fluid[desto[1]].push(new Cum(nuCum));
          // merge any cum from same owner&time in the destination
          merge(desto[1]);
        } else if (desto === "delete") {
          // actually do nothing with the cum, this cum is lost...
          message.push("leg");
        } else {
          if (desto === "womb") { // pre condense if traveling to womb
            nuCum.vol = 0;
            nuCum.quant = 0;
            nuCum.amt = Math.round(nuCum.amt * 0.35 * death * death * death);
          } else if (desto === "vulva") {
            message.push("vulva");
          }
          // move to singular array.
          ᚥ.fluid[desto].push(new Cum(nuCum));
          // merge any cum from same owner&time in the destination
          merge(desto);
        }
      }
    }
  };
  // run condense method for all cum objects
  const dry = function(): void {
    const arrList = ["vulva", "vest", "mid", "deep", "cervix"];
    for (let i = 0; i < 5; i++) {
      for (const cum of ᚥ.fluid[arrList[i]]) {
        if (cum.condense != null) {
          cum.condense();
        } else {
          try {
            aw.con.warn(`Invalid cum object found! (dry subfunction) INFO: owner: ${cum.owner}, vol: ${cum.vol}, amt: ${cum.amt}.`);
          } catch {
            aw.con.warn(`Invalid cum object found in the dry subfunction, data error prevented printing details on the cum object.`);
          }
        }
      }
    }
  };
  // get a reference to the target
  const ᚥ = refGet();
  // merge sperm objects before starting
  merge();
  // switch between spread operations to move in different ways.
  switch (dir) {
    case "time":
      move("deep", "outward", 95);
      move("vulva", "cervward", 5);
      move("vest", "cervward", 10);
      move("mid", "cervward", 20);
      move("cervix", "cervward", 40);
      // dry out
      dry();
      break;
    case "in":
      move("vulva", "inward", 45);
      move("vest", "inward", 50);
      move("mid", "inward", 50);
      move("cervix", "inward", 35);
      move("deep", "inward", 50);
      break;
    case "out":
      move("deep", "outward", 50);
      move("cervix", "outward", 10);
      move("mid", "outward", 50);
      move("vest", "outward", 50);
      move("vulva", "outward", 30);
      break;
    case "plunger":
      move("vulva", "cervward", 60);
      move("vest", "cervward", 90);
      move("mid", "cervward", 90);
      move("deep", "cervward", 35);
      move("cervix", "cervward", 50);
      break;
    case "push in":
      move("vulva", "cervward", 50);
      move("vest", "cervward", 80);
      move("mid", "cervward", 40);
      break;
    case "scoop out":
      move("mid", "outward", 50);
      move("vest", "outward", 85);
      move("vulva", "outward", 95);
      break;
    case "scoop in":
      move("vulva", "inward", 95);
      move("vest", "inward", 90);
      move("mid", "inward", 30);
      move("cervix", "inward", 10);
      break;
    case "diaphragm":
      move("vulva", "cervward", 95);
      move("vest", "cervward", 95);
      move("mid", "cervward", 95);
      move("deep", "cervward", 90);
      move("cervix", "cervward", 80);
      break;
    case "douche":
      move("deep", "outward", 90);
      move("cervix", "outward", 90);
      move("mid", "outward", 95);
      move("vest", "outward", 95);
      move("vulva", "outward", 95);
      break;
    default:
      aw.con.warn(`setup.fert.spread ran without proper action/dir given: ${dir}`);
  }
  // check message variable for notifications
  if (dir === "time" || dir === "out") {
    if (message.includes("leg")) {
      setTimeout(() => setup.notify("Cum drips out of your pussy"), 5000);
    } else if (message.includes("vulva")) {
      setTimeout(() => setup.notify("Your vulva becomes wet with cum seeping out of your pussy"), 5000);
    }
  }
};

setup.fert.finalMove = function(tgt: "pc"|npcid = "pc"): void {
  const refGet = function(): Fert {
    if (tgt === "pc") {
      return ↂ.pc.fert;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt].fert;
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.finalMove.`);
      return ↂ.pc.fert;
    }
  };
  const merge = function(at: "all" | FemaleReproTract = "all"): void {
    const locs: string[] = [];
    if (at === "all") {
      locs.push("vulva", "vest", "mid", "deep", "cervix", "womb", "ovary");
    } else {
      locs.push(at);
    }
    for (const loc of locs) {
      if (ᚥ.fluid[loc].length > 1) { // only need to merge if there are multiple Cum objects
        const ᚠ = ᚥ.fluid[loc];
        for (let i = 0, c = ᚠ.length; i < c; i++) {
          const current = ᚠ[i];
          const toDelete: number[] = [];
          for (let j = i + 1, d = ᚠ.length; j < d; j++) {
            if (current.owner === ᚠ[j].owner && current.time === ᚠ[j].time && current.date === ᚠ[j].date) {
              // it's a match, merge those puppies!
              current.vol += ᚠ[j].vol;
              current.amt += ᚠ[j].amt; // add important values
              toDelete.unshift(j); // add index to delete list. deleting now would cause skippage
            }
          }
          if (toDelete.length > 0) { // delete the merged cums
            ᚠ.deleteAt(...toDelete);
          }
        }
      }
    }
  };
  const ᚥ = refGet();
  merge("cervix");
  for (const cum of ᚥ.fluid.cervix) {
    const death = (100 - Math.max(0, (50 - (ᚥ.vagHostile + cum.surv + cum.surv)))) / 100;
    const nuCum = {
      owner: cum.owner,
      vol: 0,
      qual: cum.qual,
      surv: cum.surv,
      quant: 0,
      amt: Math.round(cum.amt * 0.35 * death * death * death * death),
      time: clone(cum.time),
      date: clone(cum.date),
      omniTime: cum.omniTime,
      killer: cum.killer,
    };
    ᚥ.fluid.womb.push(new Cum(nuCum));
  }
  merge("womb");
  ᚥ.fluid.deep = [];
  ᚥ.fluid.cervix = [];
  ᚥ.fluid.mid = [];
  ᚥ.fluid.vest = [];
  ᚥ.fluid.vulva = [];
};

setup.fert.migrate = function(tgt: "pc"|npcid): void {
  const refGet = function(): Fert {
    if (tgt === "pc") {
      return ↂ.pc.fert;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt].fert;
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.migrate.`);
      return ↂ.pc.fert;
    }
  };
  const merge = function(at: "all" | FemaleReproTract = "all"): void {
    const locs: string[] = [];
    if (at === "all") {
      locs.push("vulva", "vest", "mid", "deep", "cervix", "womb", "ovary");
    } else {
      locs.push(at);
    }
    for (const loc of locs) {
      if (ᚥ.fluid[loc].length > 1) { // only need to merge if there are multiple Cum objects
        const ᚠ = ᚥ.fluid[loc];
        for (let i = 0, c = ᚠ.length; i < c; i++) {
          const current = ᚠ[i];
          const toDelete: number[] = [];
          for (let j = i + 1, d = ᚠ.length; j < d; j++) {
            if (current.owner === ᚠ[j].owner && current.time === ᚠ[j].time && current.date === ᚠ[j].date) {
              // it's a match, merge those puppies!
              current.vol += ᚠ[j].vol;
              current.amt += ᚠ[j].amt; // add important values
              toDelete.unshift(j); // add index to delete list. deleting now would cause skippage
            }
          }
          if (toDelete.length > 0) { // delete the merged cums
            ᚠ.deleteAt(...toDelete);
          }
        }
      }
    }
  };
  const ᚥ = refGet();
  for (const cum of ᚥ.fluid.womb) {
    const survive = cum.qual / 10;
    const nuCum = {
      owner: cum.owner,
      vol: 0,
      qual: cum.qual,
      surv: cum.surv,
      quant: 0,
      amt: Math.round(cum.amt * survive * 0.4),
      time: clone(cum.time),
      date: clone(cum.date),
      omniTime: cum.omniTime,
    };
    ᚥ.fluid.ovary.push(new Cum(nuCum));
  }
  ᚥ.fluid.womb = [];
  merge("ovary");
};

setup.fert.spermAge = function(tgt: "pc"|npcid = "pc"): void {
  const refGet = function(): Fert {
    if (tgt === "pc") {
      return ↂ.pc.fert;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt].fert;
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.spermage.`);
      return ↂ.pc.fert;
    }
  };
  const ᚥ = refGet();
  const mute = (tgt === "pc") ? ↂ.pc.mutate.cycle : aw.npc[tgt].mutate.cycle;
  for (let i = 0, c = ᚥ.fluid.ovary.length; i < c; i++) {
    if (ᚥ.fluid.ovary[i].halfLife != null) {
      const drugs = setup.drug.isOn();
      const hostile = (drugs.includes("satyrfert")) ? ᚥ.vagHostile + 5 : ᚥ.vagHostile;
      ᚥ.fluid.ovary[i].halfLife(hostile, mute);
    } else {
      aw.con.warn(`setup.fert.spermAge -> fert.fluid.ovary index [${i}] is not a Cum object.`);
    }
  }
};

setup.fert.ovulate = function(tgt: "pc"|npcid = "pc"): void {
  const refGet = function(): PC|NPC {
    if (tgt === "pc") {
      return ↂ.pc;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt];
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.ovulate.`);
      return ↂ.pc;
    }
  };
  const ᚥ = refGet();
  const eggRelease = (ᚥ.status.birthCon.ineffective || ᚥ.status.birthCon.hormone <= 0) ?
    (ᚥ.fert.egg + ᚥ.fert.boost) * 5 :
    ((ᚥ.fert.egg + ᚥ.fert.boost) * 5) - ᚥ.status.birthCon.hormone;
  const multiple = Math.round(((ᚥ.fert.multEgg + (ᚥ.fert.boost * 10)) * 0.3) - ᚥ.status.birthCon.hormone);
  let released = 0;
  const drugs = setup.drug.isOn();
  if (random(1, 100) < eggRelease || drugs.includes("heatfert")) {
    released++;
    if (eggRelease > 100 && random(1, 100) < (eggRelease - 80)) {
      released++; // super fertile egg release bonus
    }
  }
  if (released > 0) {
    if (random(1, 100) < multiple) {
      released++;
      let count = 0;
      let pass = true;
      do {
        count++;
        if (random(1, 100) < (multiple - (4 * Math.max(0, (count - 2))))) {
          released++;
        } else {
          pass = false;
        }
      } while (pass);
    }
  }
  aw.con.info(`[Ovulate] ${tgt} ovulated ${released} eggs.`);
  if (ᚥ.fert.fluid.ovary.length <= 0) {
    // no spermies, no zygotes :(
    return;
  }
  // perform check for killer sperm effects
  let killerSperm = false;
  const killers: number[] = [];
  for (const cum of ᚥ.fert.fluid.ovary) {
    if (cum.killer) {
      killerSperm = true;
      killers.push(Math.ceil(cum.amt / 2)); // designate the killer sperms
      cum.amt = Math.floor(cum.amt); // set "proper" sperm level
    } else {
      killers.push(0);
    }
  }
  if (killerSperm && killers.length > 1) {
    // only need to do something if this is true.
    const divisor = killers.length - 1;
    for (let i = 0, c = killers.length; i < c; i++) {
      if (killers[i] > 0) {
        const toKill = Math.round(killers[i] / divisor);
        for (let j = 0; j < c; j++) {
          if (j !== i) {
            ᚥ.fert.fluid.ovary[j].amt -= toKill;
          }
        }
      }
    }
    // remove cum objects with amt <= 0!
    for (let i = killers.length - 1; i > -1; i--) {
      if (ᚥ.fert.fluid.ovary[i].amt <= 0) {
        ᚥ.fert.fluid.ovary.deleteAt(i);
      }
    }
  }
  // start checking sperm for potential fertilization
  let totalSperm = 0;
  const owners = {};
  for (const cum of ᚥ.fert.fluid.ovary) {
    let amt = cum.amt;
    if (cum.qual > 7) {
      amt = Math.round(amt * 1.2);
    } else if (cum.qual < 3) {
      amt = Math.round(amt * 0.3);
    } else if (cum.qual < 5) {
      amt = Math.round(amt * 0.7);
    }
    totalSperm += amt;
    if (owners[cum.owner] == null) {
      owners[cum.owner] = amt;
    } else {
      owners[cum.owner] += amt;
    }
  }
  const keys = Object.keys(owners);
  if (totalSperm > 0 && keys.length > 0) {
    // randomize the dad for each egg
    for (let i = 0; i < released; i++) {
      // pick a random number
      let r = random(1, totalSperm);
      let dad;
      // cycle through sperm donors until find the winner
      for (let j = 0, c = keys.length; j < c; j++) {
        if (r <= owners[keys[j]]) {
          // winner!
          dad = keys[j];
          break;
        } else {
          r -= owners[keys[j]];
        }
      }
      // create zygote
      const zyg = {
        mother: ᚥ.fert._k,
        father: dad,
        time: setup.omni.value,
        count: 0,
      };
      // check wombs
      if (ᚥ.status.wombA.exists && !ᚥ.status.wombA.preg) {
        ᚥ.status.wombA.zygote.push(new Zygote(zyg));
        aw.con.info(`Egg ${i + 1} of ${released} fertilized by ${dad} and added to WombA. ^-^`);
      } else if (ᚥ.status.wombB.exists && !ᚥ.status.wombB.preg) {
        ᚥ.status.wombB.zygote.push(new Zygote(zyg));
        aw.con.info(`Egg ${i + 1} of ${released} fertilized by ${dad} and added to WombB. ^-^`);
      } else {
        // no valid wombs
        aw.con.info(`zygote created, but no valid wombs!`);
      }
    }
    ᚥ.fert.fluid.ovary = [];
  } else {
    aw.con.info("Ovulated, but insufficient sperm to fertilize");
  }
};

setup.fert.zygoteCheck = function(tgt: "pc" | npcid = "pc"): void {
  const refGet = function(): PC | NPC {
    if (tgt === "pc") {
      return ↂ.pc;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt];
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.zygoteCheck.`);
      return ↂ.pc;
    }
  };
  const ᚥ = refGet();
  const implantCount = 8 - Math.ceil(ᚥ.fert.fertility / 2);
  if (ᚥ.status.wombA.exists && ᚥ.status.wombA.zygote.length > 0) {
    let implant = false;
    // cycle through zygotes and add to count property, check if time to implant
    for (const zyg of ᚥ.status.wombA.zygote) {
      zyg.count++;
      if (zyg.count >= implantCount) {
        implant = true;
      }
    }
    // implant them if ready
    // creates a number > 0. 100 is max effect, but no harm if it's higher.
    const implantRate = Math.max(1, (Math.round((ᚥ.fert.implant + ᚥ.fert.boost) * 3.5) - (ᚥ.fert.wombHealth * 7)));
    const gender = (setup.npcSetting.gender[0]) ? setup.npcSetting.gender[1] : 50;
    for (const zyg of ᚥ.status.wombA.zygote) {
      if (random(0, 99) < implantRate && !ᚥ.fert.iud) { // if true, implants
        const fet = {
          mother: zyg.mother,
          father: zyg.father,
          fertTime: zyg.time,
          implantTime: setup.omni.value,
          health: (ᚥ.fert.wombHealth > 0) ? random(88, 94) : random(97, 100),
          gender: setup.fakeNPC.genGender(gender),
          growth: 0,
          flag: ["natural"],
        };
        ᚥ.status.wombA.know = false;
        if (zyg.father.slice(0, 4) === "PTSC") {
          ↂ.flag.surrogate.wombA = true;
        }
        ᚥ.status.wombA.fetus.push(new Fetus(fet));
        aw.con.info(`A zygote implanted successfully in womb A! Father: ${zyg.father} :D`);
        if (aw.npc[zyg.father] != null) {
          aw.npc[zyg.father].record.flag.knowPCpreg = false;
          aw.npc[zyg.father].record.flag.isFather = true;
          aw.npc[zyg.father].record.flag.knowPCpreg = false;
        }
        if (ᚥ.fert.splitter && random(1, 3) === 1) {
          fet.flag.push("twin");
          ᚥ.status.wombA.fetus.push(new Fetus(fet));
          aw.con.info(`The previous zygote split, and both implanted!`);
        }
        // check for first pregnancy achievement
        if (tgt === "pc") {
          setup.achieve.new("firstPreggo");
        }
      } else {
        aw.con.info(`A zygote failed to implant D:`);
      }
    }
    ᚥ.status.wombA.zygote = [];
    ᚥ.fert.splitter = false;
  }
  if (ᚥ.status.wombB.exists && ᚥ.status.wombB.zygote.length > 0) {
    let implant = false;
    // cycle through zygotes and add to count property, check if time to implant
    for (const zyg of ᚥ.status.wombB.zygote) {
      zyg.count++;
      if (zyg.count >= implantCount) {
        implant = true;
      }
    }
    // implant them if ready
    // creates a number > 0. 100 is max effect, but no harm if it's higher.
    const implantRate = Math.max(1, (Math.round(ᚥ.fert.implant * 3.5) - (ᚥ.fert.wombHealth * 7)));
    const gender = (setup.npcSetting.gender[0]) ? setup.npcSetting.gender[1] : 50;
    for (const zyg of ᚥ.status.wombB.zygote) {
      if (random(0, 99) < implantRate && !ᚥ.fert.iud) { // if true, implants
        const fet = {
          mother: zyg.mother,
          father: zyg.father,
          fertTime: zyg.time,
          implantTime: setup.omni.value,
          health: (ᚥ.fert.wombHealth > 0) ? random(88, 94) : random(97, 100),
          gender: setup.fakeNPC.genGender(gender),
          growth: 0,
          flag: ["natural"],
        };
        if (zyg.father.slice(0, 4) === "PTSC") {
          ↂ.flag.surrogate.wombB = true;
        }
        ᚥ.status.wombB.fetus.push(new Fetus(fet));
        ᚥ.status.wombB.know = false;
        aw.con.info(`A zygote implanted successfully in womb B! :D`);
        if (ᚥ.fert.splitter && random(1, 3) === 3) {
          ᚥ.status.wombB.fetus.push(new Fetus(fet));
          aw.con.info(`The previous zygote split, and both implanted!`);
        }
      } else {
        aw.con.info(`A zygote failed to implant D:`);
      }
    }
    ᚥ.status.wombB.zygote = [];
    ᚥ.fert.splitter = false;
  }
};

setup.fert.printCum = function(): string {
  const list = ["ovary", "womb", "cervix", "deep", "mid", "vest", "vulva"];
  const names = ["Fallopian Tubes", "Uterus", "Cervix", "Deep Vagina", "Middle Vagina", "Vestibule", "Vulva"];
  let output = "<dl>";
  for (let i = 0; i < 7; i++) {
    output += `<dt>${names[i]}</dt><dd>`;
    if (ↂ.pc.fert.fluid[list[i]].length === 0) {
      output += "None";
    } else {
      for (const cum of ↂ.pc.fert.fluid[list[i]]) {
        let name;
        if (cum.owner === 'Progenerate Technologies GmbH') {
          name = "Progenerate Technologies GmbH";
        }
        else if (cum.owner === 'Unknown') {
          name = "Unknown";
        }
        else if (setup.testes.test(cum.owner)) {
          name = aw.npc[cum.owner].name;
        }
        else {
          name = cum.owner;
        }
        output += `<b>Donor:</b> ${name} <b>Amount:</b> ${cum.amt}K sperm<br>`;
      }
    }
    output += "</dd>";
  }
  output += "</dl>";
  return output;
};

setup.fert.printZygote = function(): string {
  let output = "<dl><dt>Womb A</dt>";
  if (ↂ.pc.status.wombA.zygote.length === 0) {
    output += "<dd>No Zygotes Present</dd>";
  } else {
    output += "<dd>";
    for (const zyg of ↂ.pc.status.wombA.zygote) {
      output += `<b>Mother:</b> ${zyg.mother}, <b>Father:</b> ${zyg.father}, <b>Age:</b> apx ${zyg.count} days<br>`;
    }
    output += "</dd>";
  }
  if (ↂ.pc.status.wombB.exists) {
    output += "<dt>Womb B</dt>";
    if (ↂ.pc.status.wombB.zygote.length === 0) {
      output += "<dd>No Zygotes Present</dd>";
    } else {
      output += "<dd>";
      for (const zyg of ↂ.pc.status.wombB.zygote) {
        output += `<b>Mother:</b> ${zyg.mother}, <b>Father:</b> ${zyg.father}, <b>Age:</b> apx ${zyg.count} days<br>`;
      }
      output += "</dd>";
    }
  }
  output += "</dl>";
  return output;
};

setup.fert.printFetus = function(): string {
  let output = "<dl><dt>Womb A</dt>";
  if (ↂ.pc.status.wombA.fetus.length === 0) {
    output += "<dd>No Fetuses Present</dd>";
  } else {
    output += "<dd>";
    for (const fet of ↂ.pc.status.wombA.fetus) {
      output += `<b>Mother:</b> ${fet.mother}, <b>Father:</b> ${fet.father}, <b>Health:</b> ${fet.health}%, <b>Growth:</b> ${fet.growth}%<br>`;
    }
    output += "</dd>";
  }
  if (ↂ.pc.status.wombB.exists) {
    output += "<dt>Womb B</dt>";
    if (ↂ.pc.status.wombB.fetus.length === 0) {
      output += "<dd>No Fetuses Present</dd>";
    } else {
      output += "<dd>";
      for (const fet of ↂ.pc.status.wombB.fetus) {
        output += `<b>Mother:</b> ${fet.mother}, <b>Father:</b> ${fet.father}, <b>Health:</b> ${fet.health}%, <b>Growth:</b> ${fet.growth}%<br>`;
      }
      output += "</dd>";
    }
  }
  output += "</dl>";
  return output;
};

setup.fert.dailyGrowth = function(tgt: "pc" | npcid = "pc", womb: "A"|"B" = "A"): [number, number] {
  // determine the percentage amount of growth of a fetus per day
  const refGet = function(): PC|NPC {
    if (tgt === "pc") {
      return ↂ.pc;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt];
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.dailyGrowth.`);
      return ↂ.pc;
    }
  };
  const ᚥ = refGet();
  const boost = (womb === "A") ? ᚥ.status.wombA.boost : ᚥ.status.wombB.boost;
  const weeks = Math.max(2, (ᚥ.fert.pregTerm - boost));
  const termDays = weeks * 7;
  const perXX = Math.round(10000 / termDays);
  const output: [number, number] = [0, 0];
  output[0] = Math.floor(perXX / 100);
  output[1] = perXX % 100;
  return output;
};

setup.fert.fetusCheck = function(tgt: "pc" | npcid = "pc"): void {
  // to perform daily check on fetuses and apply growth and health impacts
  const refGet = function(): PC|NPC {
    if (tgt === "pc") {
      return ↂ.pc;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt];
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.fetusCheck.`);
      return ↂ.pc;
    }
  };
  /*const growth = function(): [number, number] {
    const termDays = ᚥ.fert.pregTerm * 7;
    const perXX = Math.round(10000 / termDays);
    const output: [number, number] = [0, 0];
    output[0] = Math.floor(perXX / 100);
    output[1] = perXX % 100;
    return output;
  };*/
  const ᚥ = refGet();
  const growA = setup.fert.dailyGrowth(tgt, "A");
  const growB = setup.fert.dailyGrowth(tgt, "B");
  let milk = 0;
  let milkbase = Math.max(0, ᚥ.body.lactation - 3);
  milkbase += (ᚥ.mutate.milk) ? 2 : 0;
  try {
    if (ᚥ.status.wombA.fetus.length > 0) {
      for (const fetus of ᚥ.status.wombA.fetus) {
        fetus.grow[0] += growA[0];
        fetus.grow[1] += growA[1];
        if (fetus.grow[1] > 99) {
          fetus.grow[1] -= 100;
          fetus.grow[0] += 1;
        }
        if (fetus.grow[0] > 79 && milk < milkbase + 4) {
          milk = milkbase + 4;
        } else if (fetus.grow[0] > 69 && milk < milkbase + 3) {
          milk = milkbase + 3;
        } else if (fetus.grow[0] > 54 && milk < milkbase + 2) {
          milk = milkbase + 2;
        } else if (fetus.grow[0] > 29 && milk < milkbase + 1) {
          milk = milkbase + 1;
        }
        // TODO check various factors like player health, drugs, etc to affect fetus health and growth!
        if (ᚥ.status.health < 90) {
          if (ᚥ.status.health > 79) {
            fetus.health -= random(0, 1);
          } else if (ᚥ.status.health > 49) {
            fetus.health -= random(1, 2);
          } else if (ᚥ.status.health > 19) {
            fetus.health -= random(4, 6);
          } else {
            fetus.health -= random(10, 15);
          }
          if (fetus.health < 0) {
            fetus.health = 0;
          }
        }
        // create number to widen potential birth range in increments of 10.
        const level = Math.max(0, Math.min(50, ((Math.ceil((100 - fetus.health) / 10) - 2) * 10)));
        if (fetus.grow[0] >= 90 - level) {
          fetus.birth = true; // set possible birth flag
        }
      }
    }
  } catch (e) {
    aw.con.warn(`Error in fert.fetusCheck() wombA func1. ${e.name}: ${e.message}`);
  }
  try {
    if (ᚥ.status.wombB.fetus.length > 0) {
      for (const fetus of ᚥ.status.wombB.fetus) {
        fetus.grow[0] += growB[0];
        fetus.grow[1] += growB[1];
        if (fetus.grow[1] > 99) {
          fetus.grow[1] -= 100;
          fetus.grow[0] += 1;
        }
        if (fetus.grow[0] > 79 && milk < milkbase + 4) {
          milk = milkbase + 4;
        } else if (fetus.grow[0] > 69 && milk < milkbase + 3) {
          milk = milkbase + 3;
        } else if (fetus.grow[0] > 54 && milk < milkbase + 2) {
          milk = milkbase + 2;
        } else if (fetus.grow[0] > 29 && milk < milkbase + 1) {
          milk = milkbase + 1;
        }
        // TODO check various factors like player health, drugs, etc to affect fetus health and growth!
        if (ᚥ.status.health < 90) {
          if (ᚥ.status.health > 79) {
            fetus.health -= random(2, 5);
          } else if (ᚥ.status.health > 49) {
            fetus.health -= random(6, 10);
          } else if (ᚥ.status.health > 19) {
            fetus.health -= random(12, 20);
          } else {
            fetus.health -= random(25, 50);
          }
          if (fetus.health < 0) {
            fetus.health = 0;
          }
        }
        // create number to widen potential birth range in increments of 10.
        const level = Math.max(0, Math.min(50, ((Math.ceil((100 - fetus.health) / 10) - 2) * 10)));
        if (fetus.grow[0] >= 90 - level) {
          fetus.birth = true; // set possible birth flag
        }
      }
    }
  } catch (e) {
    aw.con.warn(`Error in fert.fetusCheck() wombB func1. ${e.name}: ${e.message}`);
  }
  if (State.active.variables.pref.miscarriage) {
    const mRate = 26 - (ᚥ.fert.fertility * 2);
    const maxi = 7500; // calculated for consecutive randomizations to bring odds to right point (80 draws)
    let misCount = 0;
    let lateTerm = false;
    const tCheck = Math.floor(38 / ᚥ.fert.pregTerm); // shorter pregnancies get more checks.
    try {
      if (ᚥ.status.wombA.fetus.length > 0) {
        for (let i = ᚥ.status.wombA.fetus.length - 1; i >= 0; i--) {
          if (ᚥ.status.wombA.fetus[i].health < 11) {
            if (ᚥ.status.wombA.fetus[i].health === 0 || random(0, ᚥ.status.wombA.fetus[i].health) === 0) {
              // miscarriage
              misCount++;
              ᚥ.status.wombA.miscarry++;
              ᚥ.status.wombA.total++;
              if (ᚥ.status.wombA.fetus[i].grow[0] > 30) {
                lateTerm = true;
                ᚥ.status.health -= random(10, 15);
              } else {
                ᚥ.status.health -= random(2, 6);
              }
              ᚥ.status.wombA.fetus.deleteAt(i);
            }
          }
          if (ᚥ.status.wombA.fetus[i].grow[0] < 31) {
            // normal miscarry check because shit happens. (irl rates are 20-25% of pregnancies end in miscarriage)
            for (let j = 0; j < tCheck; j++) {
              if (random(0, maxi) < mRate) {
                misCount++;
                ᚥ.status.wombA.miscarry++;
                ᚥ.status.wombA.total++;
                ᚥ.status.wombA.fetus.deleteAt(i);
                aw.con.info(`Miscarriage in womb a`);
                break;
              }
            }
          }
        }
      }
    } catch (e) {
      aw.con.warn(`Error in fert.fetusCheck() wombA misscarriage check. ${e.name}: ${e.message}`);
    }
    try {
      if (ᚥ.status.wombB.fetus.length > 0) {
        for (let i = ᚥ.status.wombB.fetus.length - 1; i >= 0; i--) {
          if (ᚥ.status.wombB.fetus[i].health < 11) {
            if (ᚥ.status.wombB.fetus[i].health === 0 || random(0, ᚥ.status.wombB.fetus[i].health) === 0) {
              // miscarriage
              misCount++;
              ᚥ.status.wombB.miscarry ++;
              ᚥ.status.wombB.total ++;
              if (ᚥ.status.wombB.fetus[i].grow[0] > 30) {
                lateTerm = true;
                ᚥ.status.health -= random(10, 15);
              } else {
                ᚥ.status.health -= random(2, 6);
              }
              ᚥ.status.wombB.fetus.deleteAt(i);
            }
          }
          if (ᚥ.status.wombB.fetus[i].grow[0] < 31) {
            // normal miscarry check because shit happens. (irl rates are 20-25% of pregnancies end in miscarriage)
            for (let j = 0; j < tCheck; j++) {
              if (random(0, maxi) < mRate) {
                misCount++;
                ᚥ.status.wombB.miscarry++;
                ᚥ.status.wombB.total++;
                ᚥ.status.wombA.fetus.deleteAt(i);
                aw.con.info(`Miscarriage in womb B`);
                break;
              }
            }
          }
        }
      }
    } catch (e) {
      aw.con.warn(`Error in fert.fetusCheck() wombB misscarriage check. ${e.name}: ${e.message}`);
    }
    if (misCount > 0 && tgt === "pc") {
      const img = (lateTerm) ? "[img[IMG-BloodSplatter]]" : "[img[IMG-BloodDrops]]";
      let content = `<h2>Bad News...</h2><br><center>${img}</center><br>`;
      if (lateTerm) {
        content += "It seems like you had a miscarriage overnight... The bed is a mess, but more importantly you really don't feel well...<br>";
        content += "@@.mono;I should probably go see a doctor...@@";
        content += "<br><center>@@.note;You lost ${misCount} babies@@</center>";
        setup.omni.new("lateMiscarriage");
      } else {
        content += "You notice some cramps after waking up, and after getting up you spot some blood on the bed.<br>";
        content += "@@.mono;I'm having my period? That's odd...@@";
        content += `<br><center>@@.note;You lost ${misCount} fetuses@@</center>`;
      }
      setup.dialog("Miscarriage", content);
    }
  }
  if (milk > ᚥ.status.milk) {
    ᚥ.status.milk = milk;
  }
  // BURST CHECK! If there are just too many babies... bad end?
  let burst = false;
  let fundal = Math.min(200, Math.max(80, (ᚥ.fert.fertility * 20))) + (Math.pow(ᚥ.fert.elastic, 2) * 20);
  let max = Math.max(3, (ᚥ.fert.fertility + (Math.pow(ᚥ.fert.elastic, 2) * 2)));
  if (ᚥ.mutate.goddess) {
    fundal += 40;
    max += 3;
  }
  if (ᚥ.status.fundalHeight > fundal && ↂ.job.code !== "PF") {
    burst = true;
  } else if (ᚥ.status.wombA.count > max || ᚥ.status.wombB.count > max) {
    if (ᚥ.status.wombA.count > max && ᚥ.status.wombA.growth > 85 && ↂ.job.code !== "PF") {
      burst = true;
    }
    if (ᚥ.status.wombB.count > max && ᚥ.status.wombB.growth > 85 && ↂ.job.code !== "PF") {
      burst = true;
    }
  }
  if (burst) {
    setup.badEnd("burst");
  }
};

// BIRTHCHECK - Checks wombs for birth potential, then checks for random birth
// if PC, creates some omni-events for giving birth. if npc just births them.
setup.fert.birthCheck = function(tgt: "pc" | npcid): void {
  const refGet = function(): PC | NPC {
    if (tgt === "pc") {
      return ↂ.pc;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt];
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.birthCheck.`);
      return ↂ.pc;
    }
  };
  let anyBirth = false;
  const ᚥ = refGet();
  // check wombs for birth potential
  if (ᚥ.status.wombA.fetus.length > 0) {
    let birth = false;
    for (const fetus of ᚥ.status.wombA.fetus) {
      if (fetus.birth) {
        const odds = Math.min(30, Math.max(1, 100 - fetus.grow[0])) + 1;
        if (random(1, odds) === 1) {
          birth = true;
          anyBirth = true;
        }
      }
    }
    if (birth && tgt === "pc") { // add omni only if PC
      // set the omni event to trigger :D
      const dur = random(500, 840);
      setup.omni.new("wombAbirth", {duration: dur});
      aw.con.info("Birth Omni set!!!");
    } else if (birth) {
      // npc just gives birth
      const babies = ᚥ.status.wombA.fetus.length;
      ᚥ.status.wombA.know = false;
      ᚥ.status.wombA.fetus = [];
      aw.con.info(`fetuses born from ${tgt}`);
      ᚥ.status.wombA.birthed += babies;
      ᚥ.status.wombA.total += babies;
    }
  }
  if (ᚥ.status.wombB.fetus.length > 0) {
    let birth = false;
    for (const fetus of ᚥ.status.wombB.fetus) {
      if (fetus.birth) {
        const odds = Math.min(30, Math.max(1, 100 - fetus.grow[0])) + 1;
        if (random(1, odds) === 1) {
          birth = true;
          anyBirth = true;
        }
      }
    }
    if (birth && tgt === "pc") {
      // set the omni event to trigger :D
      const dur = random(500, 840);
      setup.omni.new("wombBbirth", { duration: dur });
    } else if (birth) {
      // npc just gives birth
      const babies = ᚥ.status.wombB.fetus.length;
      ᚥ.status.wombB.know = false;
      ᚥ.status.wombB.fetus = [];
      aw.con.info(`fetuses born from ${tgt}`);
      ᚥ.status.wombB.birthed += babies;
      ᚥ.status.wombB.total += babies;
    }
  }
  // idiotic besty's inclusion to make nipples bigger due to pregnancy
  if (anyBirth) {
    if (ᚥ.body.tits.areola < 5) {
      ᚥ.body.tits.areola += 1;
    }
    if (ᚥ.body.tits.nipGirth < 5) {
      ᚥ.body.tits.nipGirth += 1;
    }
    if (ᚥ.body.tits.nipLength < 5) {
      ᚥ.body.tits.nipLength += 1;
    }
  }
};

interface IntPcBirthReturn {
  amt: number;
  comp: number;
  badComp: number;
  difficult: boolean;
  cSec: boolean;
  nearDie: boolean;
  male: number;
  female: number;
  futa: number;
}

setup.fert.pcBirth = function(womb: "A" | "B"): IntPcBirthReturn {
  const w = "womb" + womb;
  aw.L();
  const babies = ↂ.pc.status[w].fetus.length;
  let comp = 0;
  let badComp = 0;
  let difficult = false;
  let cSec = false;
  let male = 0;
  let female = 0;
  let futa = 0;
  let surrogate = false;
  let reward = 0;
  for (const fetus of ↂ.pc.status[w].fetus) {
    if (fetus.health < 50) {
      badComp++;
      difficult = true;
      if (fetus.health < 30) {
        cSec = true;
      }
    } else if (fetus.health < 80) {
      comp++;
    }
    switch (fetus.gender) {
      case 1:
        male++;
        break;
      case 2:
        female++;
        break;
      default:
        futa++;
        break;
    }
    // record kids to npc
    if (aw.npc[fetus.father] != null) {
      aw.npc[fetus.father].record.flag.kidsPC += 1;
    }
    if (fetus.father.slice(0, 4) === "PTSC") {
      surrogate = true;
    }
  }
  if (!surrogate && womb === "A") {
    ↂ.flag.surrogate.wombA = false;
  } else if (!surrogate && womb === "B") {
    ↂ.flag.surrogate.wombB = false;
  } else if (surrogate && womb === "A") {
    ↂ.flag.surrogate.wombA = true;
  } else if (surrogate && womb === "B") {
    ↂ.flag.surrogate.wombB = true;
  }
  if (ↂ.pc.body.hips < 3 || ↂ.pc.body.pelvis < 3) {
    difficult = true;
    if (random(1, 10) > ↂ.pc.body.hips) {
      cSec = true;
    }
  } else if (ↂ.pc.body.hips === 3 || ↂ.pc.body.pelvis === 3) {
    if (comp > 0 || badComp > 0 || difficult || random(1, 3) < 3) {
      cSec = true;
    }
    difficult = true;
  } else if (ↂ.pc.body.hips === 4 || ↂ.pc.body.pelvis === 4) {
    if (badComp > 0 || difficult || (comp > 0 && random(1, 3) < 3) || random(1, 4) === 1) {
      cSec = true;
      difficult = true;
    } else if (comp > 0) {
      difficult = true;
    }
  } else {
    if (badComp > 0 && random(1, 2) === 1) {
      cSec = true;
      difficult = true;
    } else if (badComp > 0) {
      difficult = true;
    }
  }
  // Generate babies ============================================
  let yourBabies = true;
  if (ↂ.job.code === "PF") {
    yourBabies = false;
  }
  if (ↂ.flag.surrogate.wombA && womb === "A") {
    yourBabies = false;
    reward += setup.cashDiff(ↂ.flag.surrogate.value);
    ↂ.flag.surrogate.wombA = false;
    ↂ.flag.surrogate.value = 0;
  } else if (ↂ.flag.surrogate.wombB && womb === "B") {
    yourBabies = false;
    reward += setup.cashDiff(ↂ.flag.surrogate.value);
    ↂ.flag.surrogate.wombB = false;
    ↂ.flag.surrogate.value = 0;
  }
  if (yourBabies) {
    setup.genetics.babyGen(difficult, cSec, ↂ.pc.status[w].fetus);
  }
  // ============================================================
  // record keeping
  ↂ.pc.status[w].know = false;
  ↂ.pc.status[w].fetus = [];
  ↂ.pc.status[w].birthed += babies;
  ↂ.pc.status[w].total += babies;
  ↂ.pc.status.kids += (yourBabies) ? babies : 0;
  // womb health adjustment (damage)
  const dmg = 2 + babies;
  if (random(0, dmg) > ↂ.pc.fert.fertility) {
    ↂ.pc.fert.wombHealth++;
  }
  if (difficult) {
    ↂ.pc.fert.wombHealth++;
  }
  let hl = 0;
  if (cSec) {
    ↂ.pc.fert.wombHealth++;
    hl = random(30, 50) * -1;
    ↂ.pc.status.health += hl;
    setup.status.record("health", hl, "Difficult birth with C-Section surgery");
  } else if (difficult) {
    hl = random(20, 30) * -1;
    ↂ.pc.status.health += hl;
    setup.status.record("health", hl, "Difficult birth with complications");
  }
  const nearDie = (ↂ.pc.status.health < 10) ? true : false;
  if (ↂ.pc.status.health < 10) {
    ↂ.pc.status.health = 10;
  }
  // stretching
  ↂ.flag.preBirthTightness = ↂ.pc.body.pussy.tight;
  if (ↂ.pc.body.pussy.tight < 10) {
    ↂ.pc.body.pussy.tight = 10;
  }
  ↂ.pc.body.pussy.insert(12);
  const timer: IntOmniData = {
    name: "Sore Vagina",
    type: "single",
    output: "notify",
    duration: 2880,
    icon: "IMGstatus_Injured",
    text: "Your vagina is sore and uncomfortable from giving birth.",
    run: `setup.notify("Your pussy feels better now");
    if(ↂ.flag.preBirthTightness < 10) {
      aw.L();
      ↂ.pc.body.pussy.tight = ↂ.flag.preBirthTightness;
      if (ↂ.flag.preBirthTightness < 8) {
        ↂ.pc.body.pussy.tight = 8;
      }
      aw.S();
    }`,
  };
  setup.omni.new(timer);
  // IMPORTANT - SAVE DATA BEFORE CASH
  aw.S();
  reward += setup.cashDiff((!yourBabies) ? babies * 300 : babies * 125);
  if (!ↂ.flag.Healthcare && yourBabies) {
    reward -= 1000;
    if (reward > 0) {
      aw.cash(reward, "birth");
    } else {
      aw.cash(reward, "medical");
    }
  } else {
    aw.cash(reward, "birth");
  }
  // achievements
  if (ↂ.pc.status.wombA.birthed + ↂ.pc.status.wombB.birthed >= 20) {
    setup.achieve.new("broodMother");
  } else if (ↂ.pc.status.wombA.birthed + ↂ.pc.status.wombB.birthed >= 5) {
    setup.achieve.new("repopulation");
  }
  // setup data to send to birthing scene
  const data = {
    amt: babies,
    comp,
    badComp,
    difficult,
    cSec,
    nearDie,
    male,
    female,
    futa,
  };
  return data;
};

setup.fert.birthingScene = function(womb: "A" | "B"): twee {
  // generates the birthing scene
  const b = setup.fert.pcBirth(womb);
  // resets preg flags
  if (womb === "A") {
    ↂ.flag.preg.kickA = false;
    ↂ.flag.preg.boostA = [false, false, false];
    ↂ.pc.status.wombA.boost = 0;
  } else {
    ↂ.flag.preg.kickB = false;
    ↂ.flag.preg.boostB = [false, false, false];
    ↂ.pc.status.wombB.boost = 0;
  }
  let time = random((40 + b.amt * 5), (120 + b.amt * 15)) + (b.comp * 20) + (b.badComp * 35);
  time *= (b.difficult) ? 1.5 : 1;
  time += (b.cSec) ? random(120, 240) : 0;
  time = Math.round(time);
  const record = (b.amt > ↂ.flag.recordBirths) ? true : false;
  if (b.amt > ↂ.flag.recordBirths) {
    ↂ.flag.recordBirths = b.amt;
    if (ↂ.job.code === "PF") {
      ↂ.flag.job.PF.record = true;
    }
    aw.S("flag");
  }
  const mins = time % 60;
  const hours = Math.floor(time / 60);
  const hw = (hours !== 1) ? "hours" : "hour";
  const mw = (mins !== 1) ? "minutes" : "minute";
  const bw = (b.amt > 1) ? "babies" : "baby";
  const bcompw = (b.badComp > 1) ? "babies" : "baby";
  const compw = (b.comp > 1) ? "babies" : "baby";
  let output = "<p>";
  if (b.cSec) {
    output +=
      `<<f y>>ou struggle for to give birth to your ${setup.numWord(b.amt)} ${bw}, but your best efforts aren't enough. Eventually you're prepped for surgery and taken back for a c-section. The whole ordeal took ${setup.numWord(hours)} ${hw} and ${setup.numWord(mins)} ${mw}. `;
  } else if (b.difficult) {
    output +=
      `<<f y>>ou struggle for ${setup.numWord(hours)} ${hw} and ${setup.numWord(mins)} ${mw} to give birth to ${setup.numWord(b.amt)} ${bw}. The experience wasn't what you'd hoped for, but at least you were able to avoid a c-section. `;
  } else {
    output +=
      `<<f y>>ou work hard for to give birth, and the process goes as smoothly as you'd hoped. After pushing for ${setup.numWord(hours)} ${hw} and ${setup.numWord(mins)} ${mw}, you were rewarded with the birth of ${setup.numWord(b.amt)} ${bw}. `;
  }
  if (b.badComp > 0) {
    output += "Unfortunately you weren't able to enjoy a normal bonding experience afterward. Right after birth ";
    if (b.amt === 1) {
      output += "your baby was taken to the infant ICU thanks to severe complications. ";
    } else {
      output += `${setup.numWord(b.badComp)} ${bcompw} were taken to the infant ICU thanks to severe complications.`;
    }
    if (b.comp > 0) {
      output += `After a few minutes ${setup.numWord(b.comp)} ${compw} joined their siblings in the infant ICU as a precaution. `;
    }
  } else if (b.comp > 0) {
    output += `Unfortunately things didn't go completely as expected for your ${bw}, and there were some complications. `;
    if (b.amt === 1) {
      output += "While you were able to spend a little time together, your baby was soon taken to the infant ICU for additional care. ";
    } else {
      output += `While you were able to spend a little time together, ${setup.numWord(b.comp)} ${compw} were taken to the infant ICU for additional care.`;
    }
  } else {
    output += `Thankfully, your ${bw} turned out to be nice and healthy, and you were able to spend some time together before getting some rest.`;
  }
  const malew = (b.male > 1) ? "boys" : "boy";
  const femw = (b.female > 1) ? "girls" : "girl";
  const futaw = (b.futa > 1) ? "babies" : "baby";
  if (b.male > 0 && b.female > 0) {
    output += `You gave birth to ${setup.numWord(b.male)} ${malew} and ${setup.numWord(b.female)} ${femw}. `;
  } else if (b.male > 0) {
    output += `You gave birth to ${setup.numWord(b.male)} baby ${malew}. `;
  } else if (b.female > 0) {
    output += `You gave birth to ${setup.numWord(b.female)} baby ${femw}. `;
  } else {
    output += `You gave birth to ${setup.numWord(b.futa)} ${futaw} of mixed gender. `;
  }
  if (b.futa > 0 && b.male + b.female > 0) {
    output += `You also gave birth to ${setup.numWord(b.futa)} ${futaw} of mixed gender. `;
  }
  if (record) {
    output += `One of the nurses informs you that with ${b.amt} babies, you've beaten the Appletree record for live births!`;
  }
  output += "</p>";
  if (ↂ.job.code === "PF") {
    output += `<p>Because you are a surrogate in the Progenerate Technologies Fecundate Division, the babies you gave birth to are immediately reported to Progenerate for handling. Your birthing bonus is handled automatically. Unfortunately, that also means you don't even get the chance to name them.</p><center><<button "CONTINUE">><<run setup.scenario.close()>><<if $time[2] && $time[0] > 1>><<run setup.sleep.go()>><</if>><</button>></center>`;
  } else if ((womb === "A" && ↂ.flag.surrogate.wombA) || (womb === "B" && ↂ.flag.surrogate.wombB)) {
    output += `<p>Because you are a surrogate for the Progenerate Technologies Surrogacy Center, the babies you gave birth to are immediately reported to Progenerate for handling. Your birthing bonus is handled automatically. Unfortunately, that also means you don't even get the chance to name them.</p><center><<button "CONTINUE">><<run setup.scenario.close()>><<if $time[2] && $time[0] > 1>><<run setup.sleep.go()>><</if>><</button>></center>`;
    if (womb === "A") {
      ↂ.flag.surrogate.wombA = false;
    } else {
      ↂ.flag.surrogate.wombB = false;
    }
    aw.S("flag");
  } else {
    output += `<center><<button "CONTINUE">><<scenego "BirthChildNaming">><</button>></center>`;
  }
  if (b.male + b.female + b.futa > 1) {
    State.temporary.plur = true;
  } else {
    State.temporary.plur = false;
  }
  return output;
};

setup.fert.birthCon = function(): void {
  ↂ.pc.status.birthCon.setHormone();
};

setup.fert.fetusHeal = function(): void {
  if (ↂ.pc.status.wombA.fetus.length > 0) {
    for (const fetus of ↂ.pc.status.wombA.fetus) {
      fetus.health = 100;
    }
  }
  if (ↂ.pc.status.wombB.fetus.length > 0) {
    for (const fetus of ↂ.pc.status.wombB.fetus) {
      fetus.health = 100;
    }
  }
  aw.S();
};

setup.fert.fetusGrow = function(): void {
  if (ↂ.pc.status.wombA.fetus.length > 0) {
    for (const fetus of ↂ.pc.status.wombA.fetus) {
      fetus.grow[0] += 10;
    }
  }
  if (ↂ.pc.status.wombB.fetus.length > 0) {
    for (const fetus of ↂ.pc.status.wombB.fetus) {
      fetus.grow[0] += 10;
    }
  }
  aw.S();
};

setup.fert.tummyHugger = function(): string {
  let output = "<div class='background1 monospace' style='position: relative; width:90%; margin: 5px auto; border: 2px solid #303030;border-radius:6px;text-align:justify;padding: 10px;color: #e0e0e0;'><img data-passage='IMG-PregnantWomanIcon' style='float: left; margin: 0px 25px 20px 0px;'>";
  output += "<center class='head' style='font-size:1.25rem;'>Pregnancy Scan Results</center>";
  if (ↂ.pc.status.wombB.exists) {
    output += "<center class='gold' style='font-size:1.1rem; font-weight:bold;'>Caution! Unusual Womb Configuration Detected!</center>";
  }
  output += "<br>";
  if (ↂ.pc.status.wombA.fetus.length === 0 && (!ↂ.pc.status.wombB.exists || ↂ.pc.status.wombB.fetus.length === 0)) {
    output += "No bundles of joy are present, keep trying!";
  } else {
    const fetuses: Fetus[] = []; // create an array of ALL fetuses.
    const a = fetuses.push(...ↂ.pc.status.wombA.fetus);
    const b = fetuses.push(...ↂ.pc.status.wombB.fetus);
    // check the fetus growth -> tummy hugger only can't read details of jelly beans.
    let jellybeans = 0;
    let scanable = 0;
    let maxGrow = [0, 0];
    for (const fetus of fetuses) {
      if (fetus.grow[0] < 6) {
        jellybeans++;
      } else {
        scanable++;
      }
      if (fetus.grow[0] > maxGrow[0]) {
        maxGrow = [fetus.grow[0], fetus.grow[1]];
      } else if (fetus.grow[0] === maxGrow[0]) {
        if (fetus.grow[1] > maxGrow[1]) {
          maxGrow[1] = fetus.grow[1];
        }
      }
    }
    if (scanable === 0) {
      const bun = (jellybeans > 1) ? "bundles" : "bundle";
      const plu = (jellybeans > 1) ? "babies are" : "baby is";
      output += `Congratulations new mommy!<br>Your scan has discovered ${jellybeans} ${bun} of joy inside your tummy!<br><br>Currently your ${plu} too small for a detailed scan.<br><i>The advanced scanning technology requires a fetus to be at least the size of a walnut before detailed results can be determined</i>`;
    } else {
      const bun = (jellybeans + scanable > 1) ? "bundles" : "bundle";
      let cunt = 0;
      let warn = false;
      output += `Congratulations new mommy!<br>Your scan has discovered ${(jellybeans + scanable)} ${bun} of joy inside your tummy!<br><br><b>Detailed Scan Results:</b>`;
      for (const fet of ↂ.pc.status.wombA.fetus) {
        cunt++;
        const c = (cunt < 10) ? "0" + cunt : cunt;
        output += `<br><b><span class="head">${c})</span> -</b> `;
        if (fet.grow[0] < 6) {
          output += `too young for detailed scan. Estimated Growth: ${fet.grow[0]}% ± 0.8%`;
        } else {
          output += `Growth Progress: ${fet.grow[0]}.${(Math.round(fet.grow[1] / 10))}% ± 0.1% - Health Checkup: `;
          if (fet.health > 91) {
            output += `<span class="good">Good</span>`;
          } else if (fet.health > 83) {
            output += `<span class="money">Okay</span>`;
          } else if (fet.health > 75) {
            output += `<span class="gold">Poor</span>`;
          } else if (fet.health > 64) {
            output += `<span class="orange">CAUTION</span>`;
            warn = true;
          } else {
            output += `<span class="orangered">WARNING</span>`;
            warn = true;
          }
          /*if (aw.chad.springer) {
            const dad = (aw.npc[fet.father] == null) ? "not a living NPC" : aw.npc[fet.father].name;
            output += `<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Springer Paternity: ${dad}</i>`;
          }*/
        }
      }
      if (warn) {
        output += `<br><span class="gold" style="font-size:0.9rem">It is recommended that you see your OB/GYN as soon as possible.</span>`;
      }
      const growth = function(): number {
        const termDays = ↂ.pc.fert.pregTerm * 7;
        const perXX = Math.round(10000 / termDays);
        return perXX / 100;
      };
      const gestDays = ↂ.pc.fert.pregTerm * 7;
      const growRate = growth();
      const growRemain = 100 - (maxGrow[0] + (maxGrow[1] / 100));
      const days = Math.round(growRemain / growRate);
      const weeks = Math.floor(days / 7);
      const wd = days % 7;
      output += `<br><span style="font-size:1.2rem;">StorkTracker® Results:</span><br>Maximum Growth: ${maxGrow[0]}.${Math.round(maxGrow[1] / 10)}%  Pregnancy Days Remaining: ${days}.<br>You are expected to give birth in approximately ${weeks} weeks and ${wd} days!`;
    }
  }
  output += "</div>";
  return output;
};

/*
ↂ.pc.fert.egg * 5
ↂ.pc.fert.multEgg * 0.3
"vulva" | "vest" | "mid" | "deep" | "cervix" | "womb" | "ovary"
"time"|"in"|"out"|"plunger"|"scoop out"|"push in"|"scoop in"|"diaphragm"|"douche"
public owner: npcid;
public vol: number;
public qual: number;
public surv: number;
public quant: number;
public amt: number;
public time: time;
public date: date;
*/

/*******************************
CONDOM BREAK CHECKS
*******************************/

interface intBreakData {
  effect: number;
  health: number;
  sabo: number;
  acidPre: boolean;
  acidVag: boolean;
  powerEjac: boolean;
  bitchBreaker: boolean;
  cumVol: number;
}

/*
CONDOM EFFECTIVENESS:
"duremaxT" effect = 98;
"duremaxPE" effect = 99;
"trojancockS" effect = 96;
"trojancockUL" effect = 93;
"trojancockUNL": effect = 90;
"pleasureburst": effect = 80;
default: effect = 95;

Sabotaged Condoms {
  bc.health += 5+;
  bc.sabo = 20+;
  bc.effect = 60 or less;
}
*/

// returns true if condom breaks
setup.fert.condomBreakCheck = function({effect, health, sabo, acidPre, acidVag, powerEjac, bitchBreaker, cumVol}: intBreakData): boolean {
  let brk = (100 - effect) * 10;
  brk += health;
  if (bitchBreaker) {
    health += 25;
    sabo += 5;
  }
  if (acidVag) {
    brk += health * 7;
  }
  if (acidPre) {
    brk += health * 7;
  }
  brk = Math.round(brk * (1 + ((sabo + 1) * 0.5)));
  if (powerEjac) {
    brk *= 2;
  }
  const v = 1000 - cumVol;
  if (random(1, v) <= brk) {
    return true;
  } else {
    return false;
  }
};

setup.fert.cleanseBirthCon = function(tgt: "pc"|npcid = "pc"): void {
  if (tgt === "pc") {
    aw.L("pc");
    ↂ.pc.status.birthCon.hormone = 0;
    ↂ.pc.status.birthCon.hormoneType = "none";
    ↂ.pc.status.birthCon.knowIneffective = false;
    ↂ.pc.status.birthCon.ineffective = true;
    ↂ.pc.status.birthCon.chems = 0;
    ↂ.pc.fert.iud = false;
    aw.S("pc");
  } else {
    aw.npc[tgt].status.birthCon.hormone = 0;
    aw.npc[tgt].status.birthCon.hormoneType = "none";
    aw.npc[tgt].status.birthCon.knowIneffective = false;
    aw.npc[tgt].status.birthCon.ineffective = true;
    aw.npc[tgt].status.birthCon.chems = 0;
    aw.npc[tgt].fert.iud = false;
  }
};

setup.fert.progenerateInseminate = function(): void {
  aw.L("pc");
  const cData = {
    owner: "Progenerate Technologies GmbH",
    vol: 0,
    qual: 20,
    surv: 10,
    quant: 30,
    amt: 1500000,
    killer: true,
  };
  ↂ.pc.fert.fluid.ovary.push(new Cum(cData));
  ↂ.pc.fert.creampie("Progenerate Technologies GmbH", 30, "deep");
  aw.S("pc");
};

setup.fert.fetusHealth = function(amt: number, tgt: "pc" | npcid = "pc"): void {
  const refGet = function(): PC | NPC {
    if (tgt === "pc") {
      return ↂ.pc;
    } else if (setup.npcid.test(tgt)) {
      return aw.npc[tgt];
    } else {
      aw.con.warn(`Invalid tgt (${tgt}) given to setup.fert.birthCheck.`);
      return ↂ.pc;
    }
  };
  const ᚥ = refGet();
  if (amt == null) {
    amt = 10;
  }
  if (ᚥ.status.wombA.preg) {
    for (const fetus of ᚥ.status.wombA.fetus) {
      fetus.health += amt;
      if (fetus.health > 100) {
        fetus.health = 100;
      } else if (fetus.health < 0) {
        fetus.health = 0;
      }
    }
  }
  if (ᚥ.status.wombB.preg) {
    for (const fetus of ᚥ.status.wombB.fetus) {
      fetus.health += amt;
      if (fetus.health > 100) {
        fetus.health = 100;
      } else if (fetus.health < 0) {
        fetus.health = 0;
      }
    }
  }
};



