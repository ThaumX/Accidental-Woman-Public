/*    oooo            .o8             .o8                .
.     `888           "888            "888              .o8
.      888  .ooooo.   888oooo.   .oooo888   .oooo.   .o888oo  .oooo.
.      888 d88' `88b  d88' `88b d88' `888  `P  )88b    888   `P  )88b
.      888 888   888  888   888 888   888   .oP"888    888    .oP"888
.      888 888   888  888   888 888   888  d8(  888    888 . d8(  888
.  .o. 88P `Y8bod8P'  `Y8bod8P' `Y8bod88P" `Y888""8o   "888" `Y888""8o
.  `Y888P
*/

// ======= INTERFACE ========

interface awJobData {
  [propName: string]: Job;
}

interface JobRank {
    rulesCutoffs: [number, number, number, number, number];
    vacationRate: number;
    vacationRatePaid: number;
    sickRate: number;
    pay: [number, number, number];
    statsRank: number;
    name: string;
    rulesBoss: string;
    promotionBonus: number;
}

interface Events {
    rank: number[];
    passage: string;
    image: string;
    content: string;
    random: boolean;
    odds: [number, number];
    condition: any;
    title: string;
}

interface Content {
  rank: number[];
  passage: string;
  image: string;
  content: string;
}

interface Job {
    employer: string;
    code: string;
    skills: string;
    desc: string;
    img: string;
    title: string;
    loc: [locationMain, string, string | false];
    apply: [string, number, string, number];
    pcJob: string;
    wallPaper: string;
    clothesRequired: () => [boolean, string?, string?, string?, string?];
    jobPercept: number;
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [number, [number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]];
    schedWorkDays: [number, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
    rulesTaskratio: [number, number, number, number, number, number];
    rulesTasks: number;
    rulesTaskA: jobTask;
    rulesTaskB: jobTask;
    rulesTaskC: jobTask;
    rulesTaskD: jobTask;
    rulesTaskE: jobTask;
    rulesTaskF: jobTask;
    rulesTaskG?: jobTask;
    rulesTaskH?: jobTask;
    rulesTaskI?: jobTask;
    rulesTaskJ?: jobTask;
    rulesWorktime: [number, number, number, number, number, number, number, number];
    rulesBreaktime: number;
    rulesStrict: boolean;
    ranks: number;
    jobContent: Content[];
    events: Events[];
    rank0: JobRank; // Dont judge me. Just dont. It works and I am ashamed enough already lol
    rank1?: JobRank; // Silently judging
    rank2?: JobRank;
    rank3?: JobRank;
    rank4?: JobRank;
    rank5?: JobRank;
    rank6?: JobRank;
    rank7?: JobRank;
    rank8?: JobRank;
    rank9?: JobRank;
    acceptance?: string[];
}

// NAMESPACE

if (aw.jobData == null) {
  aw.jobData = {} as any;
}

// ======= FUNCTIONS ========

// Setting new job for PC
setup.setNewJob = (place: string, rank: number): boolean => {
  aw.con.info("setup.setNewJob got that:" + place + " and " + rank); // TODO remove before flight
  if (place == null || rank == null) {
    aw.con.warn("Arguments for setup.job.setNewJob are either null or undefined!");
  }
  const stringifiedRank = String("rank" + rank);
  aw.con.info("Does it look look like rankX?: " + stringifiedRank);
  try {
    ↂ.flag.unemployedDays = 0;
    ↂ.flag.selfEmployed = false;
    ↂ.job.employer = aw.jobData[place].employer;
    ↂ.job.code = aw.jobData[place].code;
    ↂ.job.skills = aw.jobData[place].skills;
    ↂ.job.desc = aw.jobData[place].desc;
    ↂ.job.name = aw.jobData[place].pcJob;
    ↂ.job.percept = aw.jobData[place].jobPercept;
    ↂ.sched.workTime = aw.jobData[place].schedWorkTime.slice();
    ↂ.sched.workDays = aw.jobData[place].schedWorkDays.slice();
    ↂ.job.rules.taskratio = aw.jobData[place].rulesTaskratio.slice();
    ↂ.job.rules.tasks = aw.jobData[place].rulesTasks;
    ↂ.job.rules.taskA = aw.jobData[place].rulesTaskA;
    ↂ.job.rules.taskB = aw.jobData[place].rulesTaskB;
    ↂ.job.rules.taskC = aw.jobData[place].rulesTaskC;
    ↂ.job.rules.taskD = aw.jobData[place].rulesTaskD;
    ↂ.job.rules.taskE = aw.jobData[place].rulesTaskE;
    ↂ.job.rules.taskF = aw.jobData[place].rulesTaskF;
    ↂ.job.rules.worktime = aw.jobData[place].rulesWorktime.slice();
    ↂ.job.rules.breaktime = aw.jobData[place].rulesBreaktime;
    ↂ.job.rules.strict = aw.jobData[place].rulesStrict;
    ↂ.job.rules.cutoffs = aw.jobData[place][stringifiedRank].rulesCutoffs.slice();
    ↂ.job.vacation.rate = aw.jobData[place][stringifiedRank].vacationRate;
    ↂ.job.vacation.ratePaid = aw.jobData[place][stringifiedRank].vacationRatePaid;
    ↂ.job.sick.rate = aw.jobData[place][stringifiedRank].sickRate;
    // I decided to move all the logic of the payment here, work object now only contains 3 variables in array.
    // tslint:disable-next-line:max-line-length
    let difMod = 1;
    if (ↂ.flag.organDonor === 2) {
      difMod = 1.5;
    } else if (ↂ.flag.organDonor === 1) {
      difMod = 2;
    }
    ↂ.job.rules.payrate = Math.round(((aw.jobData[place][stringifiedRank].pay[0] * State.active.variables.AW.curBase) * aw.jobData[place][stringifiedRank].pay[1] / aw.jobData[place][stringifiedRank].pay[2]) * difMod);

    // tslint:disable-next-line:max-line-length
    ↂ.job.pay = Math.round(ↂ.job.rules.payrate * ↂ.job.rules.worktime[0]),
    ↂ.job.stats.rank = aw.jobData[place][stringifiedRank].statsRank;
    ↂ.job.name = aw.jobData[place][stringifiedRank].name;
    ↂ.job.rules.boss = aw.jobData[place][stringifiedRank].rulesBoss;
    ↂ.job.stats.performance = 10;
    ↂ.job.stats.boss = 10;
    ↂ.job.stats.progress = 0;
    ↂ.job.stats.promote = false;
    if (aw.jobData[place].loc !== null) {
      ↂ.job.loc = aw.jobData[place].loc;
    } else {
      ↂ.job.loc = ["world", "institute", false];
    }
    // aw.con.obj(ↂ.job); // TODO: remove before flight

  } catch (e) {
    aw.con.error("Error in setup.job.setNewJob()", e);
  }
  return true;
};

setup.promote = (coworkers: boolean, subord: boolean): boolean => {
  if (ↂ.job.stats.rank + 1 > aw.jobData[ↂ.job.code].ranks) {
    aw.con.warn("Player already reached the top rank.");
    return this.error("Player already reached the top rank.");
  }
  try {
    ↂ.flag.unemployedDays = 0;
    ↂ.flag.selfEmployed = false;
    ↂ.job.stats.rank += 1;
    const stringifiedRank = String("rank" + ↂ.job.stats.rank);
    ↂ.job.rules.cutoffs = aw.jobData[ↂ.job.code][stringifiedRank].rulesCutoffs;
    ↂ.job.vacation.rate = aw.jobData[ↂ.job.code][stringifiedRank].vacationRate;
    ↂ.job.vacation.ratePaid = aw.jobData[ↂ.job.code][stringifiedRank].vacationRatePaid;
    ↂ.job.sick.rate = aw.jobData[ↂ.job.code][stringifiedRank].sickRate;
    // tslint:disable-next-line:max-line-length
    ↂ.job.rules.payrate = Math.round((aw.jobData[ↂ.job.code][stringifiedRank].pay[0] * State.active.variables.AW.curBase) * aw.jobData[ↂ.job.code][stringifiedRank].pay[1] / aw.jobData[ↂ.job.code][stringifiedRank].pay[2]);
    ↂ.job.pay = Math.round(ↂ.job.rules.payrate * ↂ.job.rules.worktime[0]),
    ↂ.job.name = aw.jobData[ↂ.job.code][stringifiedRank].name;
    // Let's check if the boss is the same guy, if not - reset boss opinion.
    const oldBoss = ↂ.job.rules.boss;
    ↂ.job.rules.boss = aw.jobData[ↂ.job.code][stringifiedRank].rulesBoss;
    if (oldBoss !== ↂ.job.rules.boss) {
      ↂ.job.stats.boss = 50; // ...Meet the new boss, Same as the old boss...
    }
    ↂ.job.stats.performance = 50;
    ↂ.job.stats.progress = 10;
    ↂ.job.stats.promote = false;
    if (coworkers === true) { // Reset the coworkers opinion if the flag was set
      ↂ.job.stats.coworker = 50;
    }
    if (subord === true) { // Reset your subordinate drones opinion if the flag was set
      ↂ.job.stats.subord = 50;
    }
    aw.con.obj(ↂ.job); // TODO: remove before flight

  } catch (e) {
    aw.con.error("Error in setup.promote()", e);
  }
  return true;
};

setup.demote = (coworkers: boolean, subord: boolean): boolean => {
  if (ↂ.job.stats.rank - 1 === -1) {
    aw.con.warn("Player already reached the very bottom rank.");
    return this.error("Player already reached the very bottom rank.");
  }
  try {
    ↂ.job.stats.rank -= 1;
    const stringifiedRank = String("rank" + ↂ.job.stats.rank);
    ↂ.job.rules.cutoffs = aw.jobData[ↂ.job.code][stringifiedRank].rulesCutoffs.slice();
    ↂ.job.vacation.rate = aw.jobData[ↂ.job.code][stringifiedRank].vacationRate;
    ↂ.job.vacation.ratePaid = aw.jobData[ↂ.job.code][stringifiedRank].vacationRatePaid;
    ↂ.job.sick.rate = aw.jobData[ↂ.job.code][stringifiedRank].sickRate;

    // tslint:disable-next-line:max-line-length
    ↂ.job.rules.payrate = Math.round((aw.jobData[ↂ.job.code][stringifiedRank].pay[0] * State.active.variables.AW.curBase) * aw.jobData[ↂ.job.code][stringifiedRank].pay[1] / aw.jobData[ↂ.job.code][stringifiedRank].pay[2]);
    ↂ.job.pay = Math.round(ↂ.job.rules.payrate * ↂ.job.rules.worktime[0]),
    ↂ.job.name = aw.jobData[ↂ.job.code][stringifiedRank].name;

    // Well here we check if we return to the old boss. The opinion is reseted that way because we discarded it when we moved forward.
    const oldBoss = ↂ.job.rules.boss;
    ↂ.job.rules.boss = aw.jobData[ↂ.job.code][stringifiedRank].rulesBoss;
    if (oldBoss !== ↂ.job.rules.boss) {
      ↂ.job.stats.boss = 10; // ...Meet the old boss, Same as the new boss...
    }
    ↂ.job.stats.performance = 50;
    ↂ.job.stats.progress = 10;
    if (coworkers === true) { // Reset the coworkers opinion if the flag was set. Same problem as with the boss.
      ↂ.job.stats.coworker = 50;
    }
    if (subord === true) { // Reset your subordinate drones opinion if the flag was set. Same problem as with the boss.
      ↂ.job.stats.subord = 50;
    }
    aw.con.obj(ↂ.job); // TODO: remove before flight

  } catch (e) {
    aw.con.error("Error in setup.demote()", e);
  }
  return true;
};

setup.fire = function() {
  ↂ.job = {
    name: "Unemployed",
    employer: "None",
    code: "UE",
    skills: "none",
    percept: 0,
    desc: "none",
    loc: ["home", "foyer", false],
    late: {
      times: 0,
      called: 0,
      recent: 0,
      sick: 0,
      vacation: 0,
    },
    missed: {
      times: 0,
      recent: 0,
    },
    sick: {
      rate: 0, // hours
      balance: 0,
      caught: 0,
      used: 0,
    },
    vacation: {
      rate: 0,
      balance: 0, // hours
      used: 0,
      ratePaid: 0,
      balPaid: 0, // hours
      usedPaid: 0,
    },
    rules: {
      payrate: 0,
      taskratio: [0, 0, 0, 0],
      tasks: 0,
      taskA: {
        type: "CM",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskB: {
        type: "OG",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskC: {
        type: "PS",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskD: {
        type: "FI",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskE: {
        type: "FI",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskF: {
        type: "FI",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      cutoffs: [0, 0, 0, 0, 0],
      worktime: [40, 8, 8, 8, 8, 8, 0, 0],
      breaktime: 0,
      strict: true,
      boss: "nobody",
    },
    stats: {
      progress: 0,
      promote: false,
      fired: false,
      fireDanger: false,
      performance: 0,
      daysworked: 0,
      daysworkedTotal: 0,
      rank: 0,
      boss: 0,
      coworker: 0,
      subord: - 10,
    },
    flag: {},
    choose: {
      effort: 2,
      focus: "none",
    },
    pay: 0,
    moti: 0,
    att: {
      weekDays: 0,
      showed: [0, false, false, false, false, false, false, false],
      weekHours: 0,
    },
  };
  ↂ.sched.workTime = [
    0,
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  ↂ.sched.workDays = [0, false, false, false, false, false, false, false];
  ↂ.sched.vacation = [0, false, false, false, false, false, false, false];
  ↂ.sched.sick = [0, false, false, false, false, false, false, false];
  ↂ.sched.wakeTime = [8, 0];
  ↂ.sched.sleepTime = [24, 0];
  ↂ.sched.sleepWarn = [23, 0];
  aw.S("job");
};

// ======= MACROS =======

Macro.add("setNewJob", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
        return this.error("No arguments sent to job-setting macro!");
    } else if ("string" !== typeof String(this.args[0]) || "string" !== typeof  String(this.args[1])) {
      // tslint:disable-next-line:max-line-length
      return this.error("Incorrect data type for job-setting macro arguments - string and number expected. We tried to stringify both arguments but that still did not help.");
    }
    aw.con.info(this.args[0] + " and " + this.args[1]); // TODO remove before flight
    const success = setup.setNewJob(String(this.args[0]), this.args[1]);
    if (!success) {
      return this.error(`Invalid values provided to <<setNewJob>> macro (${this.args[0]}, ${this.args[1]}).`);
    }
  },
});
Macro.add("promote", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
        return this.error("No arguments sent to promote macro!");
    } else if ("boolean" !== typeof this.args[0] || "boolean" !== typeof this.args[1]) {
      return this.error("Incorrect data type for promote macro arguments - two booleans expected.");
    }
    aw.con.info(this.args[0] + " and " + this.args[1]); // TODO remove before flight
    const success = setup.promote(this.args[0], this.args[1]);
    if (!success) {
      return this.error(`Invalid values provided to <<promote>> macro (${this.args[0]}, ${this.args[1]}).`);
    }
  },
});
Macro.add("demote", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
        return this.error("No arguments sent to demote macro!");
    } else if ("boolean" !== typeof this.args[0] || "boolean" !== typeof this.args[1]) {
      return this.error("Incorrect data type for demote macro arguments - two booleans expected.");
    }
    aw.con.info(this.args[0] + " and " + this.args[1]); // TODO remove before flight
    const success = setup.demote(this.args[0], this.args[1]);
    if (!success) {
      return this.error(`Invalid values provided to <<demote>> macro (${this.args[0]}, ${this.args[1]}).`);
    }
  },
});

// ======= SYSTEM DATA =======

aw.jobData = {
  IS: {
    employer: "The Institute",
    code: "IS",
    skills: "Cleaning & Organization",
    // tslint:disable-next-line:max-line-length
    desc: "This job basically involves cleaning part of the large institute complex. <i>Good science demands clean labs... and @@.smear;experimental subjects@@. But hey, the pay is good for this type of work, and high attrition rates just mean faster promotions, right?</i>",
    img: "IMG-JobCover-Services",
    title: "Janitor",
    loc: ["world", "institute", false],
    apply: ["CL", 10, "OG", 10],
    pcJob: "services",
    wallPaper: "IMG_InstituteWall",
    clothesRequired() {
      return [true];
    },
    jobPercept: 2,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [40, [0, 0, 0, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [0, 0, 0, 0], [8, 0, 17, 0], [8, 0, 17, 0]],
    schedWorkDays: [8, false, true, true, true, false, true, true],
    rulesTaskratio: [60, 22, 10, 5, 2, 1],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: {type: "CL", DC: 8, retry: true, effect: 1, stress: 1, hap: 0, desc: ["emptying the trash", "sweeping the hallways", "vacuuming offices", "mopping the hallways", "cleaning windows"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "CL", DC: 10, retry: true, effect: 1, stress: 3, hap: 0, desc: ["cleaning the bathroom", "wiping down the urinals", "cleaning the break room", "dusting"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "OG", DC: 10, retry: true, effect: 1, stress: 3, hap: 0, desc: ["putting away dishes", "arranging the cleaning supplies", "returning office items to where they belong"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "OG", DC: 12, retry: false, effect: 1, stress: 4, hap: 0, desc: ["refilling toilet paper dispensers", "refilling the hand sanitizer", "stocking new paper towels"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "CL", DC: 8, retry: false, effect: 2, stress: 4, hap: -2, desc: ["mopping up puke", "flushing a stranded turd", "scrubbing bathroom graffiti"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "CL", DC: 14, retry: false, effect: 3, stress: 6, hap: -1, desc: ["mopping up a strange chemical spill", "picking up broken glassware", "emptying an overfull sharps bin"]},
    rulesWorktime: [40, 0, 8, 8, 8, 0, 8, 8],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss1",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss1]]</center><br>",
        random: true,
        title: "Board member",
        odds: [1, 15],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 0) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss2",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss1]]</center><br>",
        random: true,
        title: "Laura Comstock",
        odds: [1, 10],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 1) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss3",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss3]]</center><br>",
        random: true,
        title: "Laura Comstock",
        odds: [1, 10],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 2) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2],
        passage: "BestyServicesEvent1-A",
        image: "IMG-ServicesSide",
        // tslint:disable-next-line:max-line-length
        content: "",
        random: true,
        odds: [1, 5],
        title: "Just another boring day at work",
        condition(rank) {
          if (ↂ.flag.jobEvents.services.sawChinese === null) {
            ↂ.flag.jobEvents.services.sawChinese = false;
          }
          if (ↂ.flag.jobEvents.services.sawChinese) {
            return false;
          }
          return true;
        },
      },
      {
        rank: [0, 1, 2],
        passage: "JobEvent-Services-B",
        image: "IMG-JobEventIS-Marta0",
        content: "<<set ↂ.flag.job.IS.metMarta = true>><<set setup.npc.acquainted.push('n1025')>>",
        random: true,
        odds: [1, 5],
        title: "Meeting A Coworker: Marta",
        condition(rank) {
          if (ↂ.flag.job.IS.metMarta) {
            return false;
          }
          return true;
        },
      },
      {
        rank: [1, 2, 3, 4],
        passage: "JobEvent-Services-C",
        image: "IMG-JobEventIS-Marta0",
        content: "<<set ↂ.flag.job.IS.martaVolunteer = true>>",
        random: true,
        odds: [1, 5],
        title: "An Unusual Coworker: Marta",
        condition(rank) {
          if (ↂ.flag.job.IS.metMarta && !ↂ.flag.job.IS.martaVolunteer) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [2, 3, 4],
        passage: "JobEvent-Services-D",
        image: "IMG-JobEventIS-Marta0",
        content: "",
        random: true,
        odds: [1, 8],
        title: "Running into Marta",
        condition(rank) {
          if (ↂ.flag.job.IS.martaVolunteer) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [2, 3, 4],
        passage: "JobEvent-Services-E",
        image: "IMG-JobEventIS-Marta0",
        content: "<<set ↂ.flag.job.IS.martaRescue = true>><<set setup.npc.friends.push('n1025')>><<set aw.npc.n1025.rship.friend = true>>",
        random: true,
        odds: [1, 3],
        title: "Marta to the Rescue!",
        condition(rank) {
          if (ↂ.flag.job.IS.martaVolunteer && !ↂ.flag.job.IS.martaRescue) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [2, 3, 4],
        passage: "JobEvent-Services-F",
        image: "IMG-JobEventIS-Marta0",
        content: "",
        random: true,
        odds: [1, 7],
        title: "A Break with Marta",
        condition(rank) {
          if (ↂ.flag.job.IS.martaVolunteer) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [2, 3, 4],
        passage: "JobEvent-Services-G",
        image: "IMG-JobEventIS-Marta0",
        content: "<<set ↂ.flag.job.IS.martaDildo = true>>",
        random: true,
        odds: [1, 3],
        title: "Marta Found Something",
        condition(rank) {
          if (ↂ.flag.job.IS.martaVolunteer && !ↂ.flag.job.IS.martaDildo) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [3, 4],
        passage: "JobEvent-Services-H",
        image: "IMG-JobEventIS-Marta0",
        content: "<<set ↂ.flag.job.IS.martaInterupt = true>>",
        random: true,
        odds: [1, 3],
        title: "Marta Interrupted",
        condition(rank) {
          if (ↂ.flag.job.IS.martaVolunteer && !ↂ.flag.job.IS.martaInterupt) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [2, 3, 4],
        passage: "JobEvent-Services-I",
        image: "IMG-JobEventIS-Marta0",
        content: "",
        random: true,
        odds: [1, 5],
        title: "Marta and the Forbidden Lounge",
        condition(rank) {
          if (ↂ.flag.job.IS.martaVolunteer) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [1, 2, 3, 4],
        passage: "JobEvent-Services-J",
        image: "IMG-JobEventIS-Marta0",
        content: "none",
        random: true,
        odds: [1, 8],
        title: "Marta Goes Home",
        condition(rank) {
          if (ↂ.flag.job.IS.metMarta) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [3, 4],
        passage: "JobEvent-Services-K",
        image: "IMG-JobEventIS-Marta0",
        content: "none",
        random: true,
        odds: [1, 5],
        title: "Interrupting Marta Again",
        condition(rank) {
          if (ↂ.flag.job.IS.martaLounge && ↂ.flag.job.IS.martaInterupt) {
            return true;
          }
          return false;
        },
      },

      // Anenn markup
      {
        rank: [1, 2, 3, 4],
        passage: "Sexperiment-Trouble-A1",
        image: "IMG-ServicesSide",
        content: "none",
        random: true,
        odds: [1, 5],
        title: "A couple of researchers... Arguing?",
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.AyaneCarl_E1) {
            return false;
          }
          return true;
        },
      },
      {
        rank: [1, 2, 3, 4],
        passage: "Sexperiment-Trouble-B1",
        image: "IMG-ServicesSide",
        content: "none",
        random: true,
        odds: [1, 5],
        title: "She... again?",
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.AyaneCarl_E1 && ↂ.flag.jobEvents.sperm.AyaneCarl_E1 !== 'rejected') {
            return true;
          }
          return false;
        },
      },
      {
        rank: [1, 2, 3, 4],
        passage: "NanobotsTrouble-Ev-A1",
        image: "IMG-ServicesSide",
        content: "none",
        random: true,
        odds: [1, 5],
        title: "That's a simple job... But wait.",
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.NanobotsTroubleA1) {
            return false;
          }
          return true;
        },
      },

      // Random events
      {
        rank: [1, 2, 3, 4],
        passage: "StepAndFuck-1",
        image: "IMG-ServicesSide",
        content: "none",
        random: true,
        odds: [1, 5],
        title: "Just another normal day at work, I suppose",
        condition(rank) {
          return true;
        },
      },
      {
        rank: [1, 2, 3, 4],
        passage: "TripleLesbianFun-1",
        image: "IMG-ServicesSide",
        content: "none",
        random: true,
        odds: [1, 5],
        title: "Now thats's a funny day!",
        condition(rank) {
          return true;
        },
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Goo",
        // tslint:disable-next-line:max-line-length
        content: "Another day, another mysterious pile of goo you're forced to clean up. At some point it stopped bothering you, after all it could be worse. @@.mono;Like vomit or shit or something... Yuck.@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Siren",
        // tslint:disable-next-line:max-line-length
        content: "Today you were treated to the sound of wailing sirens for nearly 30 minutes, it seems like something almost broke out of a lab again. When will those Biomedical guys learn?",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Puke",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Marta",
        // tslint:disable-next-line:max-line-length
        content: "The boss put out a request at the last minute looking for a volunteer for a special cleaning assignment. You were starting to get really nervous about being forced to volunteer when Marta casually announced that she was taking care of it. @@.mono;Thank cock it isn't her day off!@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Tunnel",
        // tslint:disable-next-line:max-line-lengt
        content: "Today another one of your coworkers got <i>promoted</i> out of the Services again. They worked in zone <<= either('A','B','C','E','F','G','H','I','J','K')>>, so you didn't really know them. It seems odd how fast people are promoted around here, but you can't really complain; after all, that means you'll be promoted faster too.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "GladysAudioMessages",
        image: "IMG-JobContentInst-Gladys",
        content: "",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobTesting",
        content: "All personnel was assigned to a scheduled security check today which means physical ans psychological examination as well as some paper tests. @@.mono;Gosh, I hate this stuff. Hmm, 'Do I have any acquaintances or relatives of Chinese descent?' I guess I'll put a mark into a 'no' checkbox... okay, now question 78...@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobChat",
        content: `<<= either("On your break you overheard","Moping the floors you heard","Coming to the cooler to have a cup of water you heard")>> <<= either("your coworkers discussing","two executives discussing", "a group of coworkers talking about")>> the recent <<= either("news","events")>>. <<= either("@@.npc;Have you heard about new security rules?@@","@@.npc;...those changes in corporate policy piss me off so much, god damned! I mean this is so inconvenient...@@","@@.npc;Yeah, well so they said I need a level five security clearance for that, can you imagine?@@")>> <<= either("@@.npd;Oh, that's suck a bag of dicks...@@","@@.npd;I talked with Craig, you know, that security guy from sector B, so, we talked about the stuff last week and it seems it will be this way for a long time now...@@","@@.npd;At this moment I'm just happy that they don't security check our asses every morning. Although, it seems it is a matter of a year or two until they start.@@")>>.`,
      },
      // Anenn markup
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "",
        content: "Another day of hard work, you are sent to clean some old equipment, when you get there you are faced with equipment of mysterious shape. @@.mono;I could have sworn it would fit my pussy perfectly...@@ You ponder for a few minutes, after cleaning all the equipment you realize that they have a perfect fit pattern for nipples, pussies and some in buttholes. You leave the room with a strange feeling. @@.mono;what exactly do they use these things for? I think I just cleared someone's... Fun stuff...@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "",
        content: "A new day of simple work, nothing but the normal routine. Cleaning, reviewing cleaning and cleaning again. You also regularly hear gloomy comments about the Institute, some myths about people who have been promoted and never been seen again, sex slaves and breeding slaves who now only serve to make babies for unknown reasons. It's just rumors though, you think your co-workers are probably overreacting. @@.mono;They are, I hope...@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "",
        content: "A group cleaning job with your co-workers, you are responsible for cleaning a large room for possibly another of the Institute's great experiments. The floor of the entire room soon becomes wet with cleaning products, you accidentally slip and fall on top of one of your co-workers, after the impact you realize that he starts to feel your breasts slightly, for a few moments you are without a reaction, but then you get up and after cursing him a bit you go to the locker room to exchange your wet uniform for dry clothes. @@.pc;Asshole...@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-hummingSound",
        content: `After finishing <<= either("with the toilets","with vacuuming the floors")>> you start to dust the documentation shelves in the <<= either("office D8","B-corps main offices","HR department offices")>>. After a while you realize that some light humming bothers you and turn your head trying to locate it. It takes you a minute or two until it becomes obvious to you that the buzzing comes from one of the desks. You look at the young woman looking busy at in the cubicle and she looks back. Her cheeks are blushing and the expression on her face finally solves the puzzle. The sounds comes not from her computer, it comes from the girl. She blushes even more and hide her eyes. @@.mono;Tee-hee@@ You smirk and return to your job. @@.mono;Somebody decided to spice the boring working day it seems. Maybe this is not the worst idea after all...@@`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-WCStallJob",
        content: `At the afternoon you enter the toilet to clean the stalls. It seems there is nobody in here so you put "Cleaning in progress, please use other WC" sign on the door and go inside the first stall. To your surprise it is occupied. Some women did not close the door and when you open the stall door you see her fucking her ass with a dildo with her skirt raised to her belly. She freeze staring at you still biting her lip and you feel extremely awkward. @@.pc;Ugh... I am sorry, the door was unlocked... ghhh, I'll come later.@@ You quickly leave and stand outside of the WC room. In a minute the woman rush outside trying not to look at you.`,
      },
    ],
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 4,
      vacationRatePaid: 0,
      sickRate: 0,
      // tslint:disable-next-line:max-line-length
      pay: [7.5, 4, 4],
      statsRank: 0,
      name: "Temporary Associate Janitorial Assistant",
      rulesBoss: "Jeb Cummings",
      promotionBonus: 2,
    },
    rank1: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 4,
      vacationRatePaid: 0,
      sickRate: 4,
      // tslint:disable-next-line:max-line-length
      pay: [8, 4, 4],
      statsRank: 1,
      name: "Associate Janitorial Assistant",
      rulesBoss: "Jeb Cummings",
      promotionBonus: 2,
    },
    rank2: {
      rulesCutoffs: [25, 40, 55, 70, 85],
      vacationRate: 4,
      vacationRatePaid: 4,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [9, 4, 4],
      statsRank: 2,
      name: "Janitorial Assistant",
      rulesBoss: "Jeb Cummings",
      promotionBonus: 1,
    },
    rank3: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 4,
      vacationRatePaid: 4,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [10, 4, 4],
      statsRank: 3,
      name: "Janitor",
      rulesBoss: "Richard Head", // Silly I know :D
      promotionBonus: 1,
    },
    rank4: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 8,
      vacationRatePaid: 8,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [11, 4, 4],
      statsRank: 4,
      name: "Senior Janitor",
      rulesBoss: "Richard Head",
      promotionBonus: 0,
    },
    acceptance: [
      `Congratulations! While you rated quite poorly on our application criteria, the Institute has a long and honorable tradition of offering employment to the cognitively challenged. Therefore, the Thornton Institute of Technology is happy to offer you a probationary position as a Temporary Associate Janitorial Assistant! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
      `Congratulations! While you only barely meet the minimum requirements for employment, the Institute has a long and honorable tradition of offering employment to the cognitively challenged. Therefore, the Thornton Institute of Technology is happy to offer you an entry-level position as a Associate Janitorial Assistant! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
      `Congratulations! You exceed the minimum standards for employment. The Institute is always looking for the best talent, and offers better starting positions to talented applicants. After all, <i>There's science to be done!</i> Therefore, the Thornton Institute of Technology is happy to offer you an entry-level position as a Janitorial Assistant! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
    ],
  },
  IT: {
    employer: "The Institute",
    code: "IT",
    skills: "Organization, Problem Solving, Cleaning",
    // tslint:disable-next-line:max-line-length
    desc: "This job is essentially organizing and setting up lab equipment for people several pay grades above you to use. Surely that acronym is unintentional... or at least nobody uses it, right?",
    img: "IMG-JobCover-Sperm",
    title: "Lab Technician",
    loc: ["world", "institute", false],
    apply: ["OG", 12, "PS", 14],
    pcJob: "SPERM",
    wallPaper: "IMG_InstituteWall",
    clothesRequired() {
      return [true];
    },
    jobPercept: 5,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [40, [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    schedWorkDays: [8, true, true, true, true, true, false, false],
    rulesTaskratio: [30, 15, 23, 20, 10, 2],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: {type: "OG", DC: 10, retry: true, effect: 1, stress: 2, hap: 0, desc: ["organizing gradiated glassware", "bringing the correct lasers out of storage", "pre-measuring hundreds of vials of regents", "labeling sample containers"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "OG", DC: 12, retry: true, effect: 1, stress: 4, hap: 0, desc: ["placing petri dishes in the correct sample fridge", "catalog research notes", "refilling electronic component bins", "setting up the requested light filters"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "PS", DC: 10, retry: false, effect: 2, stress: 4, hap: 0, desc: ["figuring out the best arrangement of requested chemicals", "decyphering handwritten lab requests", "choosing the correct microscope slides", "running the autoclave"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "CL", DC: 10, retry: true, effect: 1, stress: 6, hap: 0, desc: ["washing labratory glassware", "cleaning other employees' used dishes and coffee mugs", "wiping down table surfaces", "polishing optical lenses"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "CL", DC: 12, retry: true, effect: 1, stress: 6, hap: 0, desc: ["properly sanitizing surgical implements", "disinfecting petri dishes", "disposing of used needles and syringes"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "PS", DC: 14, retry: false, effect: 2, stress: 7, hap: -1, desc: ["finding the services employee that hasn't been secretly dosed yet", "covertly refilling the west wing second floor water cooler"]},
    rulesWorktime: [40, 8, 8, 8, 8, 8, 0, 0],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss1",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss1]]</center><br>",
        random: true,
        title: "Board member",
        odds: [1, 15],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 0) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss2",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss1]]</center><br>",
        random: true,
        title: "Laura Comstock",
        odds: [1, 10],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 1) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss3",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss3]]</center><br>",
        random: true,
        title: "Laura Comstock",
        odds: [1, 10],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 2) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2],
        passage: "SPERMjobRestrictedLab",
        image: "IMG-SpermSide",
        content: "<<set ↂ.flag.job.IT.secLab = true>><center>[img[IMG-JobIT-SealedDoor]]</center><br>",
        random: true,
        title: "Random-Ass Cleaning Duty",
        odds: [1, 7],
        condition(rank) {if (ↂ.flag.job.IT.surgery && !ↂ.flag.job.IT.secLab) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2],
        passage: "SPERMjobCavitySearch",
        image: "IMG-SpermSide",
        content: "<<set _randomer = random(1,3)>><<if _randomer == 3>><<set ↂ.flag.job.IT.video = false>><<set ↂ.flag.job.IT.secLab = false>><</if>><center>[img[IMG-JobIT-CavitySearch]]</center><br>",
        random: true,
        title: "Routine Cavity Search",
        odds: [1, 10],
        condition(rank) { if (ↂ.flag.job.IT.video) { return true; } else { return false; } },
      },
      {
        rank: [0, 1, 2],
        passage: "none",
        image: "IMG-SpermSide",
        // tslint:disable-next-line:max-line-length
        content: "<center>[img[IMG-JobIT-Surgery]]</center><br><<set ↂ.flag.job.IT.surgery = true>><<f T>>oday your name was randomly selected to do what your coworkers call 'random-ass cleaning duty'. This usually means cleaning up some special equipment, doing some cleaning for a restricted lab, or cleaning up after a failed(?) experiment. Your luck wasn't all that great this time, and you were tasked with cleaning up after a special surgery.<br><br>You look into the lab through windows on the door. <span class='mono'>They could have waited until after the surgery was over to send me over here... I really didn't need to see this.</span><br><center><<button 'CONTINUE'>><<sceneclose>><</button>></center>",
        random: true,
        title: "Random-Ass Cleaning Duty",
        odds: [1, 10],
        condition(rank) {return true; },
      },
      {
        rank: [0, 1, 2],
        passage: "none",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-JobIT-RobotArms]]</center><br><<f T>>oday your name was randomly selected to do what your coworkers call 'random-ass cleaning duty'. This usually means cleaning up some special equipment, doing some cleaning for a restricted lab, or cleaning up after a failed(?) experiment. Luckily you were only called to clean up some ceiling robot arms again.<br><br><span class='mono'>This place sure has a lot of robot arms mounted on the ceiling...</span><br><center><<button 'CONTINUE'>><<sceneclose>><</button>></center>",
        random: true,
        title: "Random-Ass Cleaning Duty",
        odds: [1, 5],
        condition(rank) { return true; },
      },
      {
        rank: [3, 4],
        passage: "SPERMjobBreederIntro",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "Temporary Assignment",
        odds: [1, 4],
        condition(rank) {
          if (!ↂ.flag.job.IT.breedIntro) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [3, 4],
        passage: "SPERMjobBreederOne",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "The CAPR Project Part 1",
        odds: [1, 5],
        condition(rank) {
          if (ↂ.flag.job.IT.breedIntro && !ↂ.flag.job.IT.breedOne) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [3, 4],
        passage: "SPERMjobBreederTwo",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "The CAPR Project Part 2",
        odds: [1, 6],
        condition(rank) {
          if (ↂ.flag.job.IT.breedOne && !ↂ.flag.job.IT.breedTwo) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [3, 4],
        passage: "SPERMjobBreederThree",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "The CAPR Project Part 3",
        odds: [1, 6],
        condition(rank) {
          if (ↂ.flag.job.IT.breedTwo && !ↂ.flag.job.IT.breedThree) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [3, 4],
        passage: "SPERMjobBreederFinal",
        image: "IMG-SpermSide",
        content: "",
        random: false,
        title: "The CAPR Project Conclusion",
        odds: [1, 1],
        condition(rank) {
          if (ↂ.flag.job.IT.breedThree && !ↂ.flag.job.IT.breedFinal) {
            ↂ.flag.drTittenCount ++;
            if (ↂ.flag.drTittenCount > 10) {
              return true;
            }
          }
          return false;
        },
      },
      {
        rank: [3, 4],
        passage: "SPERMjobBreederReview",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "CAPR Performance Review",
        odds: [1, 3],
        condition(rank) {
          if (ↂ.flag.job.IT.breedFinal && !ↂ.flag.job.IT.breedRev) {
            return true;
          }
          return false;
        },
      },

      // Anenn markup
      {
        rank: [2, 3, 4],
        passage: "SPERMTentacleBreedingExperiment-A1",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "A common work day",
        odds: [1, 3],
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.tentacleBreed_A) {
            return false;
          }
          return true;
        },
      },
      {
        rank: [2, 3, 4],
        passage: "SPERMTentacleBreedingExperiment-B1",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "New [REDACTED] proposal",
        odds: [1, 3],
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.tentacleBreed_A && ↂ.flag.jobEvents.sperm.tentacleBreed_A !== 'rejected') {
            return true;
          }
          return false;
        },
      },

      // Casual events
      {
        rank: [2, 3, 4],
        passage: "SPERMCasualTentacleTesting-A1",
        image: "IMG-SpermSide",
        content: "",
        random: true,
        title: "Irresistible proposal",
        odds: [1, 3],
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.tentacleBreed_B) {
            return true;
          }
          return false;
        },
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IT-Glass",
        content: "Nothing all that unusual happened today, which by itself is somewhat unusual. You performed your normal tasks without being interrupted by wailing sirens or an alert about a dangerous escaped creature.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Siren",
        // tslint:disable-next-line:max-line-length
        content: "Today you were treated to the sound of wailing sirens for nearly 30 minutes, it seems like something almost broke out of a lab again. When will those Biomedical guys learn?",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Puke",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IT-Gyno",
        // tslint:disable-next-line:max-line-length
        content: "Some of the middle-management guys came in today and announced some sort of last-minute medical exam. You had to wait in line with the other female technicians to have an unusual pelvic exam performed. You heard someone mention 'replication agents', but you're unsure what that could mean. Eventually you made it into the exam room and were cleared, but it messed up your whole morning schedule.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IT-TitInject",
        // tslint:disable-next-line:max-line-length
        content: "Today everyone got yet another strange 'preventative treatment' courtesy of some Institute doctors. Apparently some sort of bacteria that invade breast tissue was accidentally created and accidentally released somewhere. The doctor insisted that this procedure would prevent you from being infected.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IT-Blood",
        content: "Towards the end of the day there was an announcement that everyone needed to have their blood drawn for testing. Of course nobody could say <i>why</i> your blood needed to be tested. You had to wait in line for half an hour until a nurse could draw your blood.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IT-Pentadong",
        content: "During the day you received a bulletin telling you to be on the lookout for a bioengineered creature codenamed the Pentadong. The image included with the notice makes the creature look like someone took a starfish and gave it penises for arms.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IT-Penisnek",
        content: "There was a warning posted in the office when you arrived in the morning. It showed a somewhat blurry picture of a penis-like snake/tentacle/creature/thing along with a bold warning to not to approach and to contact your supervisor if you spot one. Fortunately you didn't run into it during your shift.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "GladysAudioMessages",
        image: "IMG-JobContentInst-Gladys",
        content: "",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobTesting",
        content: "All personnel were assigned to a scheduled security check today which means physical and psychological examination as well as some paper tests. @@.mono;Gosh, I hate this stuff. Hmm, 'Do I have any acquaintances or relatives of Chinese descent?' I guess I'll put a mark into a 'no' checkbox... okay, now question 78...@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobChat",
        content: `<<= either("On your break you overheard","You heard","Coming to the cooler for a cup of water you heard")>> <<= either("your coworkers discussing","two executives discussing", "a group of coworkers talking about")>> the recent <<= either("news","events")>>. <<= either("@@.npc;Have you heard about new security rules?@@","@@.npc;...those changes in corporate policy piss me off so much, god damned! I mean this is so inconvenient...@@","@@.npc;Yeah, well so they said I need a level five security clearance for that, can you imagine?@@")>> <<= either("@@.npd;Oh, that's suck a bag of dicks...@@","@@.npd;I talked with Craig, you know, that security guy from sector B, so, we talked about the stuff last week and it seems it will be this way for a long time now...@@","@@.npd;At this moment I'm just happy that they don't security check our asses every morning. Although, it seems it is a matter of a year or two until they start.@@")>>.`,
      },
    ],
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 4,
      vacationRatePaid: 0,
      sickRate: 4,
      // tslint:disable-next-line:max-line-length
      pay: [10, 4, 4],
      statsRank: 0,
      name: "Temporary Associate Assistant Technician",
      rulesBoss: "Wesley Horton",
      promotionBonus: 2,
    },
    rank1: {
      rulesCutoffs: [25, 40, 55, 70, 85],
      vacationRate: 4,
      vacationRatePaid: 4,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [12, 4, 4],
      statsRank: 1,
      name: "Associate Assistant Technician",
      rulesBoss: "Wesley Horton",
      promotionBonus: 2,
    },
    rank2: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 0,
      vacationRatePaid: 8,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [15, 4, 4],
      statsRank: 2,
      name: "Assistant Technician",
      rulesBoss: "Wesley Horton",
      promotionBonus: 1,
    },
    rank3: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 4,
      vacationRatePaid: 8,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [17, 4, 4],
      statsRank: 3,
      name: "Technician",
      rulesBoss: "Hanna Grossman",
      promotionBonus: 1,
    },
    rank4: {
      rulesCutoffs: [35, 50, 65, 80, 95],
      vacationRate: 4,
      vacationRatePaid: 8,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [19, 4, 4],
      statsRank: 4,
      name: "Senior Technician",
      rulesBoss: "Hanna Grossman",
      promotionBonus: 0,
    },
    acceptance: [
      `Congratulations! While you rated quite poorly on our application criteria, the Institute has a long and honorable tradition of offering employment to the cognitively challenged. Therefore, the Thornton Institute of Technology is happy to offer you a probationary position as a Temporary Associate Assistant Technician! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
      `Congratulations! While you only barely meet the minimum requirements for employment, the Institute has a long and honorable tradition of offering employment to the cognitively challenged. Therefore, the Thornton Institute of Technology is happy to offer you an entry-level position as a Associate Assistant Technician! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
      `Congratulations! You exceed the minimum standards for employment. The Institute is always looking for the best talent, and offers better starting positions to talented applicants. After all, <i>There's science to be done!</i> Therefore, the Thornton Institute of Technology is happy to offer you an entry-level position as a Assistant Technician! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
    ],
  },
  IB: {
    employer: "The Institute",
    code: "IB",
    skills: "Communication, Finance, Organization, Problem Solving",
    // tslint:disable-next-line:max-line-length
    desc: "This job is essentially working as a drone in the vast institute HR bureaucracy. <i>Save someone's career--or crush it--with a click of your all-powerful mouse. It's a thankless, soul-crushing job, but maybe things are different at the institute.</i>",
    img: "IMG-JobCover-Bureaucrat",
    title: "Office Clerk",
    loc: ["world", "institute", false],
    apply: ["CM", 12, "FI", 12],
    pcJob: "Bcorps",
    wallPaper: "IMG_InstituteWall",
    clothesRequired() {
      return [true];
    },
    jobPercept: 4,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [40, [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    schedWorkDays: [8, true, true, true, true, true, false, false],
    rulesTaskratio: [40, 24, 20, 8, 6, 2],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: {type: "CM", DC: 9, retry: true, effect: 1, stress: 3, hap: 0, desc: ["sending email", "filing tps reports", "adding things to the calendar", "reading email", "reading performance reports"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "FI", DC: 9, retry: true, effect: 1, stress: 3, hap: 0, desc: ["entering figures into a spreadsheet", "fixing timecard math", "calculating office supply expenditures", "copying figures from one spreadsheet to another"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "OG", DC: 9, retry: true, effect: 1, stress: 3, hap: 0, desc: ["filing paper copies", "organizing order requests", "attaching performance reviews to employee records", "sorting receipts by date"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "CM", DC: 12, retry: false, effect: 1, stress: 5, hap: -1, desc: ["watching training presentations", "avoiding the impression that you are human", "delivering a black envelope to an employee"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "FI", DC: 12, retry: false, effect: 2, stress: 5, hap: -1, desc: ["denying compensation claims", "rejecting expense vouchers"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "PS", DC: 14, retry: false, effect: 2, stress: 7, hap: -1, desc: ["avoiding blame for a random problem"]},
    rulesWorktime: [40, 8, 8, 8, 8, 8, 0, 0],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss1",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss1]]</center><br>",
        random: true,
        title: "Board member",
        odds: [1, 15],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 0) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss2",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss1]]</center><br>",
        random: true,
        title: "Laura Comstock",
        odds: [1, 10],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 1) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobBoardBoss3",
        image: "IMG-SpermSide",
        content: "<center>[img[IMG-BoardBoss3]]</center><br>",
        random: true,
        title: "Laura Comstock",
        odds: [1, 10],
        condition(rank) {if (ↂ.flag.jobEvents.sperm.boardBoss === 2) {return true; } else {return false; }},
      },
      {
        rank: [0, 1, 2],
        passage: "BcorpsEvent01-Start",
        image: "none",
        // tslint:disable-next-line:max-line-length
        content: "",
        random: true,
        odds: [1, 5],
        condition() {return true; },
        title: "Just another boring day at work",
      },
      {
        rank: [3, 4],
        passage: "BcorpsEvent-IncidentReview1",
        image: "IMG-CubicleSide",
        // tslint:disable-next-line:max-line-length
        content: "",
        random: true,
        odds: [1, 15],
        condition() { 
          if (!ↂ.flag.job.IB.responseTeam1) {
            return true;
          }
          return false;
          },
        title: "Incident Review 1",
      },
      {
        rank: [3, 4],
        passage: "BcorpsEvent-IncidentReview2",
        image: "IMG-CubicleSide",
        // tslint:disable-next-line:max-line-length
        content: "",
        random: true,
        odds: [1, 3],
        condition() {
          if (!ↂ.flag.job.IB.responseTeam2 && ↂ.flag.job.IB.responseTeam1) {
            return true;
          }
          return false;
        },
        title: "Incident Review 2",
      },
      {
        rank: [3, 4],
        passage: "BcorpsEvent-IncidentReview5",
        image: "IMG-CubicleSide",
        // tslint:disable-next-line:max-line-length
        content: "",
        random: true,
        odds: [1, 3],
        condition() {
          if (ↂ.flag.job.IB.responseTeamD) {
            return true;
          }
          return false;
        },
        title: "Incident Review Failure",
      },

      // Anenn markup
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobNewCoworker-A1",
        image: "IMG-CubicleSide",
        content: "none",
        random: true,
        odds: [1, 2],
        title: "A new coworker!",
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.Aesha_A) {
            return false;
          }
          return true;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "SPERMjobNewCoworker-B1",
        image: "IMG-CubicleSide",
        content: "none",
        random: true,
        odds: [1, 3],
        title: "A new chance with Aesha",
        condition(rank) {
          if (ↂ.flag.jobEvents.sperm.Aesha_A && ↂ.flag.jobEvents.sperm.Aesha_A !== 'rejected') {
            return true;
          }
          return false;
        },
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Siren",
        // tslint:disable-next-line:max-line-length
        content: "Today you were treated to the sound of wailing sirens for nearly 30 minutes, it seems like something almost broke out of a lab again. When will those Biomedical guys learn?",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Puke",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IT-Blood",
        // tslint:disable-next-line:max-line-length
        content: "Some of the middle-management guys came in today and announced some sort of last minute-blood test. You aren't sure what it was all about, but you distinctly remember hearing something about an emergency.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-IS-Tunnel",
        // tslint:disable-next-line:max-line-length
        content: "Today another one of your coworkers got <i>promoted</i> out of the department again. It seems odd how fast people are promoted around here, but you can't really complain; after all, that means you'll be promoted faster too.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "GladysAudioMessages",
        image: "IMG-JobContentInst-Gladys",
        content: "",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobTesting",
        content: "All personnel were assigned to a scheduled security check today which means physical and psychological examination as well as some paper tests. @@.mono;Gosh, I hate this stuff. Hmm, 'Do I have any acquaintances or relatives of Chinese descent?' I guess I'll put a mark into a 'no' checkbox... okay, now question 78...@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobChat",
        content: `<<= either("On your break you overheard","You heard","Coming to the cooler for a cup of water you heard")>> <<= either("your coworkers discussing","two executives discussing", "a group of coworkers talking about")>> the recent <<= either("news","events")>>. <<= either("@@.npc;Have you heard about new security rules?@@","@@.npc;...those changes in corporate policy piss me off so much, god damned! I mean this is so inconvenient...@@","@@.npc;Yeah, well so they said I need a level five security clearance for that, can you imagine?@@")>> <<= either("@@.npd;Oh, that's suck a bag of dicks...@@","@@.npd;I talked with Craig, you know, that security guy from sector B, so, we talked about the stuff last week and it seems it will be this way for a long time now...@@","@@.npd;At this moment I'm just happy that they don't security check our asses every morning. Although, it seems it is a matter of a year or two until they start.@@")>>.`,
      },
    ],
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 0,
      vacationRatePaid: 0,
      sickRate: 0,
      // tslint:disable-next-line:max-line-length
      pay: [9, 4, 4],
      statsRank: 0,
      name: "Temporary Associate Office Clerk Assistant",
      rulesBoss: "Diane Titter",
      promotionBonus: 2,
    },
    rank1: {
      rulesCutoffs: [25, 40, 55, 70, 85],
      vacationRate: 4,
      vacationRatePaid: 0,
      sickRate: 4,
      // tslint:disable-next-line:max-line-length
      pay: [10, 4, 4],
      statsRank: 1,
      name: "Associate Office Clerk Assistant",
      rulesBoss: "Diane Titter",
      promotionBonus: 2,
    },
    rank2: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 4,
      vacationRatePaid: 4,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [12, 4, 4],
      statsRank: 2,
      name: "Office Clerk Assistant",
      rulesBoss: "Diane Titter",
      promotionBonus: 1,
    },
    rank3: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 4,
      vacationRatePaid: 4,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [14, 4, 4],
      statsRank: 3,
      name: "Office Clerk",
      rulesBoss: "Michelle Hardmeat",
      promotionBonus: 1,
    },
    rank4: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 8,
      vacationRatePaid: 4,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [16, 4, 4],
      statsRank: 4,
      name: "Senior Office Clerk",
      rulesBoss: "Michelle Hardmeat",
      promotionBonus: 0,
    },
    acceptance: [
      `Congratulations! While you rated quite poorly on our application criteria, the Institute has a long and honorable tradition of offering employment to the cognitively challenged. Therefore, the Thornton Institute of Technology is happy to offer you a probationary position as a Temporary Associate Office Clerk Assistant! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
      `Congratulations! While you only barely meet the minimum requirements for employment, the Institute has a long and honorable tradition of offering employment to the cognitively challenged. Therefore, the Thornton Institute of Technology is happy to offer you an entry-level position as a Associate Office Clerk Assistant! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
      `Congratulations! You exceed the minimum standards for employment. The Institute is always looking for the best talent, and offers better starting positions to talented applicants. After all, <i>There's science to be done!</i> Therefore, the Thornton Institute of Technology is happy to offer you an entry-level position as a Office Clerk Assistant! Please read the follow up email for information about your new position at the Thornton Institute of Technology & Science.`,
    ],
  },
  MD: {
    employer: "Maid Pouffiasse",
    code: "MD",
    skills: "Cleaning, Aesthetics & Organization",
    // tslint:disable-next-line:max-line-length
    desc: "This job is all about cleaning houses of the rich twats while getting barely enough for living in return. The job seems to be focused on tidying up the houses of rich clients of that cleaning company. The salary is pretty mediocre but the schedule is quite nice and there is an opportunity for some useful acquaintances...",
    img: "IMG-JobCover-Pouffiasse",
    title: "Maid",
    loc: ["residential", "walkdowntown", false],
    apply: ["OG", 10, "CL", 10],
    pcJob: "maid",
    wallPaper: "IMG_MaidWall",
    clothesRequired() {
      let out;
      if (ↂ.flag.jobEvents.maid.fuckedUp < 2) {
        out = [true];
      } else {
        const passage = "MaidFuckedUp";
        const image = "none";
        const content = "";
        const title = "Problems at work";
        return [false, passage, image, content, title];
      }
      if (ↂ.pc.clothes.keys.top === "tvvv" || ↂ.flag.jobEvents.maid.firstDay) {
        out = [true];
      } else {
        const passage = "MaidNoDress";
        const image = "none";
        const content = "";
        const title = "Inappropriate Attire";
        return [false, passage, image, content, title];
      }
      return out;
    },
    jobPercept: 1,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [24, [7, 0, 13, 0], [0, 0, 0, 0], [7, 0, 13, 0], [0, 0, 0, 0], [7, 0, 13, 0], [0, 0, 0, 0], [7, 0, 13, 0]],
    schedWorkDays: [8, true, false, true, false, true, false, true],
    rulesTaskratio: [30, 20, 15, 10, 7, 3],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: {type: "CL", DC: 8, retry: true, effect: 1, stress: 2, hap: 0, desc: ["moping the floors", "doing the dishes", "vacuuming rooms", "scrubbing the dirt", "cleaning windows"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "CL", DC: 10, retry: true, effect: 1, stress: 5, hap: 0, desc: ["wiping the bathroom", "making beds", "doing laundry", "dusting the shelves"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "OG", DC: 10, retry: true, effect: 1, stress: 4, hap: 0, desc: ["making flower arrangements", "decorating the hall", "putting client's shoes in line"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "OG", DC: 12, retry: false, effect: 1, stress: 2, hap: 0, desc: ["watering flowers", "arranging things", "instructing the gardener"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "CL", DC: 8, retry: false, effect: 2, stress: 7, hap: -2, desc: ["dusting the cobwebs", "cleaning the toilet bowl", "shooing the mice"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "OG", DC: 14, retry: false, effect: 3, stress: 6, hap: -1, desc: ["ordering paper towels", "arguing with the delivery service", "hiding the broken vase"]},
    rulesWorktime: [24, 6, 0, 6, 0, 6, 0, 6],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
        rank: [0, 1, 2, 3],
        passage: "FirstDayEvent1",
        image: "IMG-MaidSide",
        content: "",
        random: false,
        odds: [1, 1],
        title: "First day at the new job",
        condition() {
          if (ↂ.flag.jobEvents.maid.firstDay === null) {
            ↂ.flag.jobEvents.maid.firstDay = true;
          }
          if (ↂ.flag.jobEvents.maid.firstDay) {return true; } else {return false; }
        },
      },
      {
        rank: [0, 1, 2, 3],
        passage: "MaidSex-1",
        image: "IMG-MaidSide",
        content: "",
        random: true,
        odds: [1, 10],
        title: "Horny boss",
        condition() {
          if (ↂ.flag.jobEvents.maid.firstDay) {return false; } else {return true; }
        },
      },
      {
        rank: [0, 1, 2, 3],
        passage: "MaidAshtray",
        image: "IMG-MaidSide",
        content: "",
        random: true,
        odds: [1, 15],
        title: "Special services",
        condition() {
          if (ↂ.flag.jobEvents.maid.firstDay) {return false; } else {return true; }
        },
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-BitchDaughter",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(0,'white')>>The client's older daughter <<= _namer>>, walked right in front of you over the white carpets you just cleaned. She still had her dirty boots on. It seems the bitch enjoys humiliating you.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-PeskyGardener",
        // tslint:disable-next-line:max-line-length
        content: "That ugly old gardener made pesky comments about your bootie when you passed the lawn today. Again.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-Pug",
        // tslint:disable-next-line:max-line-length
        content: "The client's dog chewed on your cleaning supplies while you were working again. It isn't a big deal, but the animal is becoming more and more annoying.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-Drawer",
        // tslint:disable-next-line:max-line-length
        content: "Laying things out in the wardrobe you have found silicone vagina in the socks drawer. It seems that client is a pretty lonely guy.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-MaidDuster",
        // tslint:disable-next-line:max-line-length
        content: "Your feather duster snapped when you dusted the shelves. @@.mono;Gosh, those things are not sturdy at all. If not those stupid company rules I'd switch to just using a mop long ago.@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-MaidSluts",
        // tslint:disable-next-line:max-line-length
        content: "It seems that <<= ↂ.job.rules.boss>> is pretty busy today, he didn't show up from his office since those two young and busty 'sales reps' came in the morning. @@.mono;Well, at least this means nobody will bother me today. But cleaning those stains from his table afterwards... brrr!@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-MaidWine",
        // tslint:disable-next-line:max-line-length
        content: "This evening <<= ↂ.job.rules.boss>> gathers a party which always means more cleaning and preparing than usual. Boss seems to be in an upbeat mood whistling and checking his wine collection while you make sure that every corner of the mansion is shining clean for the occasion. @@.mono;Ugh, those bastards will get shitfaced again... which always means more cleaning after them...@@",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-RedHeadConfession",
        // tslint:disable-next-line:max-line-length
        content: "<p>While visiting the Maid Poufiasse office to get some supplies you saw your old fellow, red-head girl. You had a brief chat and she told you that you better not upset your boss. It seems she ignored the dress code for a couple of days and her client made a call to the mademoiselle. She refused to tell what they did to her for this but assured you that she will never ignore the dress code anymore.</p><<if ↂ.flag.jobEvents.maid.fuckedUpFlag == false>><p>@@.mono;She looks like a tough one, I wonder what they did to make her so obedient to this silly rules. Better not risk it myself, though.@@</p><<else>><p>@@.mono;Oh, poor girl, I already know what they did to her...@@</p><</if>>",
      },
    ], // TO BE DONE YET
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 2,
      vacationRatePaid: 2,
      sickRate: 0,
      // tslint:disable-next-line:max-line-length
      pay: [7.5, 4, 4],
      statsRank: 0,
      name: "Mr. Jacobs's house maid",
      rulesBoss: "Timothy Jacobs",
      promotionBonus: 4,
    },
    rank1: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 2,
      vacationRatePaid: 2,
      sickRate: 0,
      // tslint:disable-next-line:max-line-length
      pay: [8, 4, 4],
      statsRank: 1,
      name: "Mr. Stafford's house maid",
      rulesBoss: "Aaron Stafford",
      promotionBonus: 3,
    },
    rank2: {
      rulesCutoffs: [25, 40, 55, 70, 85],
      vacationRate: 2,
      vacationRatePaid: 2,
      sickRate: 2,
      // tslint:disable-next-line:max-line-length
      pay: [9, 4, 4],
      statsRank: 2,
      name: "Dr. Limpio's mansion maid",
      rulesBoss: "Diego Limpio",
      promotionBonus: 3,
    },
    rank3: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 4,
      vacationRatePaid: 2,
      sickRate: 2,
      // tslint:disable-next-line:max-line-length
      pay: [10, 4, 4],
      statsRank: 3,
      name: "Mr. King's mansion maid",
      rulesBoss: "Thomas King", // Silly I know :D
      promotionBonus: 2,
    },
    rank4: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 4,
      vacationRatePaid: 2,
      sickRate: 2,
      // tslint:disable-next-line:max-line-length
      pay: [11, 4, 4],
      statsRank: 4,
      name: "Mr. Haden's mansion maid",
      rulesBoss: "Richard Haden",
      promotionBonus: 1,
    },
    acceptance: [
      `Maid Pouffiasse llc gladly welcomes you as our new maid! While your scores were just barely enough to pass, our company has a long-standing tradition of quality maid education that helps us to maintain the highest standards in our services! Please read the follow up email for information about your new employment at Maid Pouffiasse.`,
      `Maid Pouffiasse llc gladly welcomes you as our new maid! While your scores were rather mediocre, our company has a long-standing tradition of quality maid education that helps us to maintain the highest standards in our services! Please read the follow up email for information about your new employment at Maid Pouffiasse.`,
      `Maid Pouffiasse llc gladly welcomes you as our new maid! Your scores exceeded our expectations, so we are sure you will be able to maintain the highest standards in our maid services! Please read the follow up email for information about your new employment at Maid Pouffiasse.`,
    ],
  },
  FT: {
    employer: "Fairy Tail",
    code: "FT",
    skills: "Athletic, Oral, Sex & Seduction",
    // tslint:disable-next-line:max-line-length
    desc: "A masseuse job in a massage parlor, focused on giving <i>good treatments</i> to the clients. Working the full shift may be harsh but your income is in your hands!",
    img: "IMG-JobCover-FairyTail",
    title: "Masseuse",
    loc: ["downtown", "adult", false],
    apply: ["AT", 10, "SX", 10],
    pcJob: "masseuse",
    wallPaper: "IMG_FairyWall",
    clothesRequired() {
      return [true];
    },
    jobPercept: 1,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [40, [0, 0, 0, 0], [0, 0, 0, 0], [13, 0, 21, 0], [13, 0, 21, 0], [13, 0, 21, 0], [13, 0, 21, 0], [13, 0, 21, 0]],
    schedWorkDays: [8, false, false, true, true, true, true, true],
    rulesTaskratio: [40, 24, 20, 8, 6, 2],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: {type: "AT", DC: 8, retry: true, effect: 1, stress: 2, hap: 0, desc: ["giving back massage", "giving frontal massage", "giving legs massage", "giving neck massage"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "SX", DC: 10, retry: true, effect: 1, stress: 5, hap: -1, desc: ["giving happy endings", "jerking off customers", "giving cock massage"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "SX", DC: 10, retry: true, effect: 1, stress: 4, hap: -1, desc: ["giving prostate massage", "giving balls massage", "massaging customer's cock with boobs"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "OR", DC: 12, retry: false, effect: 1, stress: 2, hap: 0, desc: ["giving oral massage", "demonstrating oral skills"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "SD", DC: 8, retry: false, effect: 2, stress: 7, hap: 1, desc: ["dirty talking to the client", "doing some massage naked"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "OG", DC: 14, retry: false, effect: 3, stress: 5, hap: -2, desc: ["buying new massage oil", "cleaning up the workplace"]},
    rulesWorktime: [40, 0, 0, 8, 8, 8, 8, 8],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 2,
    events: [
      {
        rank: [0],
        passage: "FairyTailFirstDayEvent1",
        image: "IMG-FairySide",
        content: "",
        random: false,
        odds: [1, 1],
        title: "First day at the new job",
        condition() {
          if (ↂ.flag.jobEvents.fairyTail.firstDay === null) {
            ↂ.flag.jobEvents.fairyTail.firstDay = true;
          }
          if (ↂ.flag.jobEvents.fairyTail.firstDay) {return true; } else {return false; }
        },
      },
      {
        rank: [0, 1],
        passage: "FairyClient-1",
        image: "IMG-FairySide",
        content: "",
        random: true,
        odds: [1, 4],
        title: "New client",
        condition() {
          return true;
        },
      },
      {
        rank: [0, 1],
        passage: "FairyClient-2",
        image: "IMG-FairySide",
        content: "",
        random: true,
        odds: [1, 6],
        title: "Yet another client",
        condition() {
          return true;
        },
      },

      // Anenn Markup
      {
        rank: [0, 1],
        passage: "FairyTail-NewClient-A1",
        image: "IMG-FairySide",
        content: "",
        random: true,
        odds: [1, 3],
        title: "A new customer",
        condition() {
          if (ↂ.flag.jobEvents.fairyTail.newClient) {
            false
          }
          return true;
        },
      },
      {
        rank: [0, 1],
        passage: "FairyTail-NewClient-B1",
        image: "IMG-FairySide",
        content: "",
        random: true,
        odds: [1, 3],
        title: "A new customer",
        condition() {
          if (ↂ.flag.jobEvents.fairyTail.newClient && ↂ.flag.jobEvents.fairyTail.newClient !== 'rejected') {
            true
          }
          return false;
        },
      },
    ],
    jobContent: [
      {
        rank: [0, 1],
        passage: "none",
        image: "IMG-FairyTale-1",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(1,'white')>>Your coworker <<= _namer>> came to the workers dressing room in tears, one of clients was extremely rude to her. Sadly, there is not much you can do with this because of the laws.",
      },
      {
        rank: [0, 1],
        passage: "none",
        image: "IMG-FairyTale-2",
        // tslint:disable-next-line:max-line-length
        content: `<<set _namer = setup.nameRandomizer(1,'white')>>Your coworker <<= _namer>> was bragging with her new favorite customer who seems to be extremely rich and heavily into her hands... and <<= either("prostate massage","cock massage", "happy endings", "midtits massage")>>.`,
      },
      {
        rank: [0, 1],
        passage: "none",
        image: "IMG-FairyTale-3",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(1,'white')>><<= _namer>>, your regular client came for another breast massage. Her udders needs attention to avoid aching due to her high milk production. In normal situation the it could be cured by regular milking herself but she prefers it to be done by a professional.",
      },
      {
        rank: [0, 1],
        passage: "none",
        image: "IMG-FairyTale-4",
        // tslint:disable-next-line:max-line-length
        content: "Passing by the room you notice <<set _namer = setup.nameRandomizer(1,'white')>><<= _namer>> being a bit too enthusiastic about giving a happy ending to the client.",
      },
      {
        rank: [0, 1],
        passage: "none",
        image: "IMG-FairyJobTrans",
        // tslint:disable-next-line:max-line-length
        content: `<<= either("You","Passing along the office door you")>> <<= either("overhear the dialogue","hear a part of the dialogue")>> between <<= either("your boss and the manager","the owner and the manager")>>. <<= either("From what you can hear,","It seems,")>> the <<= either("business goes pretty well","they think about expanding the parlor")>> and they want to hire additional girls. <<= either("You giggle","You grin")>> when you hear that <<= either("company may need to hire","wants to hire")>> <<= either("some transgender maseusses","more big-breasted girls","maseusses with some oral skills")>>. <<= either("@@.mono;For some customers it would be a pleasant surprise I guess, tee-hee! But who am I to judge them after all?@@","@@.mono;They don't even pretend it is a genuine massage parlor it seems, heh.@@", "@@.mono;It seems they are pretty much aware what is the reason of the parlor's popularity...@@")>>`,
      },
      {
        rank: [0, 1],
        passage: "none",
        image: "IMG-FairyTail5",
        // tslint:disable-next-line:max-line-length
        content: `You hear three of your colleagues discussing recent events and join them. It turns out that APD came yesterday morning with the inspection because of the reports of prostitution services being provided at the parlor. Luckily for your boss it seems they found nothing and no workers admitted that they did anything sexual for money. Girl are giggling a little too sarcastic about "no sexual services" part. @@.mono;Well we all do it, it would be silly to deny it.@@`,
      },
    ], // TO BE DONE YET
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 2,
      vacationRatePaid: 2,
      sickRate: 0,
      // tslint:disable-next-line:max-line-length
      pay: [4.5, 4, 4],
      statsRank: 0,
      name: "Junior masseuse",
      rulesBoss: "Rebecca Bells",
      promotionBonus: 1,
    },
    rank1: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 2,
      vacationRatePaid: 2,
      sickRate: 2,
      // tslint:disable-next-line:max-line-length
      pay: [5, 4, 4],
      statsRank: 1,
      name: "Lead masseuse",
      rulesBoss: "Rebecca Bells",
      promotionBonus: 0,
    },
    acceptance: [
      `Hi, welcome aboard. Your results are below our expectations but as an equal opportunity employer we accept all candidates. - R.Bells`,
      `Hi, welcome aboard. Your results are pretty mediocre but as an equal opportunity employer we accept all candidates. - R.Bells`,
      `Hi, welcome aboard. Your results are pretty good and we are glad to include you in our team! - R.Bells`,
    ],
  },
  PR: {
    employer: "Poll Riders",
    code: "PR",
    skills: "Strip & Exhibition",
    // tslint:disable-next-line:max-line-length
    desc: "Classic and well-known job which is all about undressing in front of clients in a seductive fashion. Strippers wage mainly depends on tips so it requires some strong skills at showing off your body in a most lewd and drooling-inducing way.",
    img: "IMG-JobCover-Stripper",
    title: "Stripper",
    loc: ["residential", "walkdowntown", false],
    apply: ["ST", 10, "EX", 10],
    pcJob: "stripper",
    wallPaper: "IMG_StripperWall",
    clothesRequired() {
      return [true];
    },
    jobPercept: 1,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [24, [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [15, 0, 23, 0], [15, 0, 23, 0], [15, 0, 23, 0]],
    schedWorkDays: [8, false, false, false, false, true, true, true],
    rulesTaskratio: [30, 20, 15, 10, 7, 3],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: {type: "DA", DC: 8, retry: true, effect: 1, stress: 2, hap: 0, desc: ["dancing on a stage", "poll dancing"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "SD", DC: 10, retry: true, effect: 1, stress: 5, hap: 0, desc: ["flirting with clients", "seducing clients for tips"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "ST", DC: 10, retry: true, effect: 1, stress: 4, hap: 0, desc: ["lapdancing", "making a private show", "stripping for a client"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "ST", DC: 12, retry: false, effect: 1, stress: 2, hap: 0, desc: ["luring clients into the private booth", "flashing tits"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "SD", DC: 8, retry: false, effect: 2, stress: 7, hap: -2, desc: ["being groped", "getting rid of drunken clients"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "OG", DC: 14, retry: false, effect: 3, stress: 6, hap: -1, desc: ["arranging outfits", "cleaning jizz from your heels"]},
    rulesWorktime: [24, 0, 0, 0, 7, 6, 7, 7],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 2,
    events: [
      {
        rank: [0, 1, 2],
        passage: "StripperEvent1",
        image: "IMG-PoleRiderSide",
        content: "",
        random: true,
        odds: [1, 10],
        title: "VIP client",
        condition() {
          return true;
        },
      },
      {
        rank: [0, 1, 2],
        passage: "StripperEvent2",
        image: "IMG-PoleRiderSide",
        content: "",
        random: true,
        odds: [1, 15],
        title: "Shy guy",
        condition() {
          if (setup.gate(["chastity", "cbt", "domsub"])) {
            return false;
          } else {
            return true;
          }
        },
      },

      // Anenn Markup
      {
        rank: [0, 1, 2],
        passage: "Stripper-VipEvent-A1",
        image: "IMG-PoleRiderSide",
        content: "",
        random: true,
        odds: [1, 3],
        title: "New guy",
        condition() {
          if (ↂ.flag.jobEvents.pollRiders.vipClient) {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        rank: [0, 1, 2],
        passage: "Stripper-VipEvent-B1",
        image: "IMG-PoleRiderSide",
        content: "",
        random: true,
        odds: [1, 4],
        title: "New guy",
        condition() {
          if (ↂ.flag.jobEvents.pollRiders.vipClient === 'accept') {
            return true;
          } else {
            return false;
          }
        },
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2],
        passage: "none",
        image: "IMG-CatFight",
        // tslint:disable-next-line:max-line-length
        content: "At the end of the shift, <<set _namer = setup.nameRandomizer(0,'white')>><<set _namer2 = setup.nameRandomizer(0,'white')>><<= _namer>> said that <<= _namer2>> stole her tips while she was in the shower. The confrontation quickly turned into a catfight, and by the time the manager arrived <<= _namer>> had already forced the thief to apologize and return the money. It seems that <<= _namer2>> will be <<= _namer>>'s personal bitch for the foreseeable future.",
      },
      {
        rank: [0, 1, 2],
        passage: "none",
        image: "IMG-PollRidersArrogantBitch",
        // tslint:disable-next-line:max-line-length
        content: `<p><<= either("Early","Early","Late")>> in your shift, one of your fellow strippers stopped by to share some gossip during your break.</p>
        <p>@@.npc;Psst, see that girl near the bar?@@ She points to an elegant woman with long dark hair. @@.npc;Damn, don't ogle her so much! She is one of Besty's girls, heard of him? He owns that Slavsquat academy, but they say he's actually a gangster or something.@@ She looks you in the eyes. @@.npc;Just be careful around those types, you don't want to upset the wrong people.@@</p>
        <p>You nod. @@.pc;Yeah, thanks.@@</p>`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-SadStripper",
        // tslint:disable-next-line:max-line-length
        content: `<<set _namer = setup.nameRandomizer(0,'white')>><<= either("In the end of your shift", "Just before closing")>> you was getting ready to dress and leave when you saw <<= _namer>> in obviously sad mood smoking in the dressing room. After a brief talk it turned out that she was caught providing "additional services" by the APD and it seems she got some enormous fine.`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-PoleRidersCocktail",
        // tslint:disable-next-line:max-line-length
        content: `<<= either("The bartender","Stefanie")>> <<= either("seems bored since there is not too much people today.","stands with a bored look playing with a bottle in her hand at the bar.")>> <<= either("When she notices you she winks and prepares a small cocktail.","@@.npc;Pspsps, <<name>>!@@ With a couple swift motions she prepares a colorful-looking cocktail and puts it onto the counter before you.")>> <<= either("@@.npc;Don't tell anybody, heh.@@","@@.npc;I won't tell anybody.@@","@@.npc;Manager is away today so I decided to spoil my favorite girl a bit.@@")>> <<= either("The cocktail is yummy and smells mango.","The cocktail smells delicious and you genuinely enjoy it.","The cocktail is rather unusual but still pretty lovely.")>> <<= either("You nod Stefanie with a smile and return to your work.","@@.pc;Oh, Stefanie, you are way too nice to me, he-he.@@","@@.pc;You know how to please a hard-working girl for sure, tee-hee!@@")>><<eatdrug "alc" 3>>`,
      },
    ], // TO BE DONE YET
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 2,
      vacationRatePaid: 2,
      sickRate: 0,
      // tslint:disable-next-line:max-line-length
      pay: [7.5, 4, 4],
      statsRank: 0,
      name: "Newbie stripper",
      rulesBoss: "Ann Sparks",
      promotionBonus: 4,
    },
    rank1: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 2,
      vacationRatePaid: 3,
      sickRate: 1,
      // tslint:disable-next-line:max-line-length
      pay: [8, 4, 4],
      statsRank: 1,
      name: "Stripper",
      rulesBoss: "Ann Sparks",
      promotionBonus: 3,
    },
    rank2: {
      rulesCutoffs: [25, 40, 55, 70, 85],
      vacationRate: 3,
      vacationRatePaid: 3,
      sickRate: 2,
      // tslint:disable-next-line:max-line-length
      pay: [9, 4, 4],
      statsRank: 2,
      name: "Stripper",
      rulesBoss: "Ann Sparks",
      promotionBonus: 3,
    },
    acceptance: [
      `Hi, welcome to the team, newbie! You seem promising althought and we decided to give you a chance. Work hard and you'll get your tips skyrocket in no time.`,
      `Hi, welcome to the team! Seems that you have some skills and we hope that we made a right choice. Work hard and you'll get your tips skyrocket in no time.`,
      `Hi, welcome to the team! Your entry was pretty impressive, you have experience as a stripper, right? Anyway, we hope that you'll be one of ours best girls, good luck with tips and clients!`,
    ],
  },
  PF: {
    employer: "Progenerate Technologies GmbH",
    code: "PF",
    skills: "Finance, Organization, Communication",
    // tslint:disable-next-line:max-line-length
    desc: "This job is a high-paying position in the Fecundate Division. The position primarily involves administrative office work and light accounting duties. <i>Please note that this position requires a minimum level of fertility.</i>",
    img: "IMG-JobCover-Progenerate",
    title: "Fecundate Division",
    loc: ["downtown", "corp", false],
    apply: ["OG", 10, "FI", 10],
    pcJob: "Progenerate",
    wallPaper: "IMG-ProgenerateWallpaper",
    clothesRequired() {
      return [true];
    },
    jobPercept: 5,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [40, [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    schedWorkDays: [8, true, true, true, true, true, false, false],
    rulesTaskratio: [25, 15, 18, 20, 15, 2],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: { type: "OG", DC: 10, retry: true, effect: 1, stress: 2, hap: 0, desc: ["sorting inventory receipts", "sorting supply and inventory requests", "organizing accounts receivable records", "compiling a PTE report"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskB: { type: "OG", DC: 12, retry: true, effect: 1, stress: 4, hap: 0, desc: ["categorizing birth records", "organizing infant disposition records", "organizing new medical record information", "refiling incorrectly located documents"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskC: { type: "CO", DC: 10, retry: false, effect: 1, stress: 5, hap: 1, desc: ["taking a class on pregnancy nutrition", "learning about fetal development", "participating in a birthing class", "studying how to maximize the odds of multi-egg ovulation", "learning the principles of enhancing conception"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskD: { type: "FI", DC: 11, retry: true, effect: 1, stress: 6, hap: 0, desc: ["compiling project expense reports", "categorizing project expenses", "documenting financial transactions", "processing disbursement paperwork"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskE: { type: "FI", DC: 13, retry: true, effect: 1, stress: 8, hap: 0, desc: ["preparing asset, liability, and capital account entries", "reconciling financial discrepancies", "preparing payments by verifying documentation"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskF: { type: "FI", DC: 15, retry: false, effect: 2, stress: 10, hap: -1, desc: ["preparing a special financial report", "substantiating financial transactions by auditing documents"] },
    rulesWorktime: [40, 8, 8, 8, 8, 8, 0, 0],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateRecordParty",
        image: "IMG-FecundateSide",
        content: "<<set ↂ.flag.job.PF.record = false>><<run aw.S('flag')>>",
        random: false,
        title: "Birth Record Party!",
        odds: [1, 1],
        condition(rank) {
          if (ↂ.flag.job.PF.record) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateOrientation",
        image: "IMG-FecundateSide",
        content: "<<set ↂ.flag.job.PF.briefing = true>><<run aw.S('flag')>>",
        random: false,
        title: "New Employee Exam",
        odds: [1, 1],
        condition(rank) {
          if (!ↂ.flag.job.PF.briefing) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateBirthControl",
        image: "IMG-FecundateSide",
        content: "<<set ↂ.flag.job.PF.birthCon = true>><<run aw.S('flag')>>",
        random: false,
        title: "Birth Control Discovery",
        odds: [1, 1],
        condition(rank) {
          if (ↂ.pc.status.birthCon.hormone > 0 || ↂ.pc.status.birthCon.chems > 0 || ↂ.pc.fert.iud) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateInsemination",
        image: "IMG-FecundateSide",
        content: "",
        random: false,
        title: "Insemination Procedure",
        odds: [1, 1],
        condition(rank) {
          if (!ↂ.pc.status.wombA.preg || (ↂ.pc.mutate.twinWomb && !ↂ.pc.status.wombB.preg)) {
            if (setup.fert.daysTillOvulate(0) < 4 && !ↂ.pc.fert.aftOvulate && !ↂ.flag.job.PF.inseminated) {
              return true;
            }
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateFertBooster",
        image: "IMG-FecundateSide",
        content: "",
        random: false,
        title: "Fertility Booster",
        odds: [1, 1],
        condition(rank) {
          if (ↂ.flag.job.PF.inseminated && !ↂ.flag.job.PF.boost) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateZygSplitter",
        image: "IMG-FecundateSide",
        content: "",
        random: false,
        title: "Seradberol Injection",
        odds: [1, 1],
        condition(rank) {
          if (ↂ.flag.job.PF.inseminated && ↂ.flag.job.PF.boost && !ↂ.flag.job.PF.splitter) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundatePregTest",
        image: "IMG-FecundateSide",
        content: "",
        random: false,
        title: "Pregnancy Test",
        odds: [1, 1],
        condition(rank) {
          if (ↂ.pc.fert.aftOvulate && ↂ.flag.job.PF.pregTest && ↂ.pc.status.cyc < 3) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateElastic",
        image: "IMG-FecundateSide",
        content: "",
        random: true,
        title: "Elasticizing Treatment",
        odds: [1, 3],
        condition(rank) {
          if (ↂ.flag.preg.elastic == null) {
            ↂ.flag.preg.elastic = [false, false, false];
            return true;
          }
          if (!ↂ.flag.preg.elastic[2]) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateAccelerate",
        image: "IMG-FecundateSide",
        content: "",
        random: false,
        title: "Gestation Acceleration",
        odds: [1, 1],
        condition(rank) {
          if (ↂ.flag.preg.boostA == null) {
            ↂ.flag.preg.boostA = [false, false, false];
          }
          if (ↂ.flag.preg.boostB == null) {
            ↂ.flag.preg.boostB = [false, false, false];
          }
          if (ↂ.pc.status.wombA.preg && (!ↂ.flag.preg.boostA[0] || !ↂ.flag.preg.boostA[1] || !ↂ.flag.preg.boostA[2])) {
            return true;
          }
          if (ↂ.pc.status.wombB.preg && (!ↂ.flag.preg.boostB[0] || !ↂ.flag.preg.boostB[1] || !ↂ.flag.preg.boostB[2])) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateBasicFertility",
        image: "IMG-FecundateSide",
        content: "",
        random: true,
        title: "Fertility Exam",
        odds: [1, 4],
        condition(rank) {
          if (ↂ.pc.fert.fertility < 6) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateHipMeasurement",
        image: "IMG-FecundateSide",
        content: "",
        random: true,
        title: "Hip Measurement",
        odds: [1, 10],
        condition(rank) {
          if (!ↂ.flag.job.PF.moreHips && (ↂ.pc.body.hips < 7 || ↂ.pc.body.pelvis < 7)) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "FecundateStretch",
        image: "IMG-FecundateSide",
        content: "",
        random: true,
        title: "Vaginal Stretching",
        odds: [1, 4],
        condition(rank) {
          if (ↂ.pc.status.pregnant && ↂ.pc.body.pussy.tight < 9 && (ↂ.pc.status.wombA.growth > 49 || ↂ.pc.status.wombB.growth > 49)) {
            return true;
          }
          return false;
        },
      },

      // Anenn Markup
      {
        rank: [0, 1, 2, 3, 4],
        passage: "VaginalMedicalResearch-A1",
        image: "IMG-FecundateSide",
        content: "",
        random: true,
        title: "New medical research",
        odds: [1, 8],
        condition(rank) {
          if (ↂ.pc.status.pregnant || ↂ.flag.jobEvents.progenerate.pussyResearch) {
            return false;
          }
          return true;
        },
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "VaginalMedicalResearch-B1",
        image: "IMG-FecundateSide",
        content: "",
        random: true,
        title: "Maybe I want to help them again...?",
        odds: [1, 8],
        condition(rank) {
          if (!ↂ.pc.status.pregnant && ↂ.flag.jobEvents.progenerate.pussyResearch !== 'rejected') {
            return true;
          }
          return false;
        },
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-PF-Exam",
        // tslint:disable-next-line:max-line-length
        content: "Today you had one of the regular exams in the Clinical Division to check on the health of your body. You end up there a few times per week, but at least they seem to be checking you for different things each time.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-PF-Exercise",
        // tslint:disable-next-line:max-line-length
        content: "Today your section has an educational yoga session. You learn different ways to keep your body healthy and in shape while gestating babies. You all repeat the Fecundate Division mantra 'staying healthy is part of our job!'",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-PF-tummy",
        // tslint:disable-next-line:max-line-length
        content: "Today you had a <<= either('relaxing','comforting','pleasant')>> 'tummy session' with the other girls in your section. You went into a dim relaxation room and spent time rubbing and cherishing each other's pregnant tummies.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-PF-Sickness",
        // tslint:disable-next-line:max-line-length
        content: "<<= setup.randName()>> had morning sickness this morning, which isn't unusual in the Fecundate Division. She seemed to have it particularly rough today though, so you and a coworker spent some time comforting her.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-PF-buffet",
        // tslint:disable-next-line:max-line-length
        content: "Your section was given a 'craving buffet' during your lunch break today. There were all sorts of delicious things to eat: fresh veggies, cheese and dairy, pickles, peanut butter, crackers, chips, fresh cum, and more. It was delicious.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-PF-Cupcake",
        // tslint:disable-next-line:max-line-length
        content: "Today you all shared cupcakes to celebrate one of your coworkers giving birth to <<= either('seven','eight','nine','ten','eleven','eleven','twelve','twelve','thirteen','thirteen','fourteen','fourteen','fifteen','fifteen','sixteen','seventeen','eighteen')>> healthy babies. She can't wait to get pregnant again, so everyone wished her luck. The cum frosting decorations are always a big hit too.",
      },
    ],
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 4,
      vacationRatePaid: 0,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [13, 4, 4],
      statsRank: 0,
      name: "Probationary Junior Office Clerk",
      rulesBoss: "Kathryn Kidd",
      promotionBonus: 2,
    },
    rank1: {
      rulesCutoffs: [25, 40, 55, 70, 85],
      vacationRate: 0,
      vacationRatePaid: 4,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [14, 4, 4],
      statsRank: 1,
      name: "Junior Office Clerk",
      rulesBoss: "Kathryn Kidd",
      promotionBonus: 2,
    },
    rank2: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 0,
      vacationRatePaid: 8,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [15, 4, 4],
      statsRank: 2,
      name: "Junior Office Clerk",
      rulesBoss: "Kathryn Kidd",
      promotionBonus: 1,
    },
    rank3: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 0,
      vacationRatePaid: 12,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [16, 4, 4],
      statsRank: 3,
      name: "Office Clerk",
      rulesBoss: "Sara Broodmare",
      promotionBonus: 1,
    },
    rank4: {
      rulesCutoffs: [35, 50, 65, 80, 95],
      vacationRate: 0,
      vacationRatePaid: 12,
      sickRate: 8,
      // tslint:disable-next-line:max-line-length
      pay: [17, 4, 4],
      statsRank: 4,
      name: "Office Clerk",
      rulesBoss: "Sara Broodmare",
      promotionBonus: 0,
    },
    acceptance: [
      `Congratulations, and welcome to the Progenerate Fecundate Family! Your entrance tests didn't go as well as we would have hoped, but with on the job training and help from our wonderful medical staff, we're sure you'll be a great fit in no time at all!`,
      `Congratulations, and welcome to the Progenerate Fecundate Family! Your entrance tests met all of our requirements, you should have the knowledge, skills, and fertility needed to be a fully productive member of the team. We're looking forward to working with you!`,
      `Congratulations, and welcome to the Progenerate Fecundate Family! Your entrance test results were outstanding! It seems you not only posess the basic knowledge and skills needed; you have peerless fertility for someone without Progenerate medical assistance! We're excited to have you with us, we're sure you'll be a top producer in no time at all!`,
    ],
  },
  HD: {
    employer: "Muschi Valley Farm Coop",
    code: "HD",
    skills: "Cleaning, Oral, Communication, & Problem Solving",
    // tslint:disable-next-line:max-line-length
    desc: "The work of a modern dairy hand is unique and varied. Unlike traditional jobs involving livestock, a dairy hand works with hucows (human cows). This presents a unique challenge, as humans tend to be more demanding than animals to care for. As a dairy hand, you will assist with milking, maintaining the cleanliness of equipment, and caring for the hucows themselves.",
    img: "IMG-JobCover-Dairy",
    title: "Dairy Hand",
    loc: ["world", "coop", "dairy"],
    apply: ["CM", 10, "CL", 10],
    pcJob: "dairy",
    wallPaper: "IMG-DairyHandBackground",
    clothesRequired() {
      return [true];
    },
    jobPercept: 3,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [40, [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    schedWorkDays: [8, true, true, true, true, true, false, false],
    rulesTaskratio: [25, 15, 20, 20, 15, 5],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: { type: "CL", DC: 10, retry: true, effect: 1, stress: 3, hap: 0, desc: ["sanitizing the collection cups", "cleaning the milking benches", "mopping the floor", "wiping down the machines and hoses"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskB: { type: "PS", DC: 10, retry: true, effect: 1, stress: 5, hap: 0, desc: ["discovering a problem causing low suction", "noticing a leaking collection cup liner", "spotting a medical concern", "helping a hucow with her production problem"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskC: { type: "OG", DC: 10, retry: true, effect: 1, stress: 4, hap: 0, desc: ["finding a leaking collection hose", "inspecting hoses for wear and tear", "stocking the supplies shelf", "organizing the stowed collection equipment"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskD: { type: "OR", DC: 11, retry: false, effect: 2, stress: 3, hap: 0, desc: ["giving a standard udder massage", "giving a pussy massage", "giving an intense breast massage"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskE: { type: "CM", DC: 12, retry: false, effect: 2, stress: 7, hap: -2, desc: ["improving a hucow's mood", "giving a hucow life advice", "encouraging a new hucow", "helping a hucow with a personal problem"] },
    // tslint:disable-next-line:max-line-length
    rulesTaskF: { type: "OR", DC: 14, retry: false, effect: 3, stress: 6, hap: -1, desc: ["massaging a hecow's prostate", "giving a thorough breast massage", "massaging out a milk blockage"] },
    rulesWorktime: [40, 8, 8, 8, 8, 8, 0, 0],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 2,
    events: [
      {
        rank: [0, 1, 2],
        passage: "JobEvent-Hucow-Training",
        image: "IMG-DairySide",
        content: "",
        random: true,
        odds: [1, 3],
        title: "Hucow Training",
        condition() {
          if (!ↂ.flag.job.HD.training) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2],
        passage: "JobEvent-Hucow-Hecow",
        image: "IMG-DairySide",
        content: "",
        random: true,
        odds: [1, 3],
        title: "Hecow Training",
        condition() {
          if (!ↂ.flag.job.HD.hecow && ↂ.flag.job.HD.training) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3],
        passage: "JobEvent-Hucow-BraTrap",
        image: "IMG-DairySide",
        content: "",
        random: true,
        odds: [1, 10],
        title: "The Bra Trap",
        condition() {
          if (!ↂ.flag.job.HD.braTrap && ↂ.flag.job.HD.hecow) {
            return true;
          }
          return false;
        },
      },
      {
        rank: [0, 1, 2, 3],
        passage: "JobEvent-Hucow-SmallBras",
        image: "IMG-DairySide",
        content: "",
        random: true,
        odds: [1, 10],
        title: "Outgrowing Bras",
        condition() {
          if (ↂ.flag.job.HD.smallBras && !ↂ.flag.job.HD.hecow) {
            return false;
          } else {
            return true;
          }
        },
      },

      // Anenn markup
      // Anenn, breeding job
      {
        rank: [3, 4],
        passage: "JobEvent-Hucow-NewJob-A1",
        image: "IMG-DairySide",
        content: "",
        random: true,
        odds: [1, 4],
        title: "New farm job",
        condition() {
          if (ↂ.flag.job.HD.hecow || ↂ.flag.jobEvents.hucowFarm.newJobBreeding1) {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        rank: [3, 4],
        passage: "JobEvent-Hucow-NewJob-B1",
        image: "IMG-DairySide",
        content: "",
        random: true,
        odds: [1, 10],
        title: "Breeding day",
        condition() {
          if (ↂ.flag.jobEvents.hucowFarm.newJobBreeding1 === 'accept' && (aw.npc['n1018'].fert.ovuFlag || aw.npc['n1019'].fert.ovuFlag || aw.npc['n1020'].fert.ovuFlag || aw.npc['n1021'].fert.ovuFlag)) {
            return true;
          } else {
            return false;
          }
        },
      },

      // Cows birth ev
      {
        rank: [3, 4],
        passage: "JobEvent-NewJob-CowgirlsBirthing",
        image: "IMG-DairySide",
        content: "",
        random: true,
        odds: [1, 20],
        title: "Birth day!",
        condition() {
          if (setup.cowsPregCheck() && (ↂ.flag.jobEvents.hucowFarm.newJobBreeding1)) {
            return true;
          } else {
            return false;
          }
        },
      }
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-HD-Bukkake",
        // tslint:disable-next-line:max-line-length
        content: `A certain one of your coworkers--Mindy--had yet another "accident" with bull milk extraction. The whole barn is aware that she's basically doing it on purpose to get a fresh snack, though she always seems to come up with a new way to have an accident. It's frankly hilarious how she has managed to get a face full of cum in dozens of different ways, and the bulls certainly don't seem to mind getting a look at their product in action. While everyone in the barn seems to have accepted her occasional propensity for snacking, you aren't so sure about the paper pushers in the main office. You wonder if management will ever crack down on her over the wasted product...`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-HD-Milkvat",
        // tslint:disable-next-line:max-line-length
        content: `They were a little short handed in the processing portion of the dairy barn today, so you were sent over to lend a hand with some of the basic tasks for a couple hours. The dairy processing area is basically its own factory that happens to be in the same massive dairy barn structure. Even though the work in processing is more like generic factory work that doesn't require the skill of a dairy hand--and doesn't pay as well--you still enjoy seeing how the raw milk you help collect is turned into all sorts of products. You can easily spot all sorts of recognizable products, from the gallon milk jugs found on supermarket shelves, to cheese curd being packed into molds to eventually create rich cheese.`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "JobContent-Hucow-LeakTube",
        image: "IMG-JobContent-HD-LeakTube",
        content: "", // passage used to save space.
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "JobContent-Hucow-HugeNips",
        image: "IMG-JobContent-HD-HugeNips",
        content: "", // passage used to save space.
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "JobContent-Hucow-Niplux",
        image: "IMG-JobContent-HD-NippleCoat",
        content: "", // passage used to save space.
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-HD-AssMassage",
        content: `One of the hucows asks you for a little extra attention during her milking, which is a pretty common request when a hucow needs a little help to sate their occasionally ravenous libidos. While a full milking is usually good for a few orgasms, the hucows claim that they can feel a bit hollow or unsatisfying if they're feeling particularly needy. Because a little extra massage during the milking can make the experience more satisfying, it's a relatively easy way to help keep the hucows happy. After all, a happy hucow is a productive hucow. This particular hucow lays on her stomach for the milking, so you make sure to give her asshole a little love while you give the 'usual' extra attention to her clit and pussy.`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-HD-PussyMassage",
        content: `As you're making your rounds, you notice one of the hucows rubbing her thighs together. It's a newer girl, and she is absolutely <b><i>soaked</i></b> down there. Her pussy, her groin, and her thighs all glisten with her femlube. You guess the milking bench is probably soaked underneath her. @@.mono;Good thing the cushions are waterproof!@@ Normally the hucows will just ask if they'd like a little more fulfilling experience while milking, but perhaps this one is shy. Thinking that there's no reason to leave her to suffer by herself, you decide to give her a standard pussy massage.<br><br>As if voicing it's approval, her cunt lets out another flood of nectar as she has another nipple orgasm. You don't bother with lube, it's pretty obvious it won't be needed. You ease her into it by spending some time on her outer lips, squeezing them together to make something of a sandwich of the plump flesh. You're forced to admit that she has a rather attractive vulva, the color still the delicate pink of a woman who hasn't experienced late-term pregnancy. Her baby bump is pretty obvious at this point, so it won't be long until her flower ripens into a richer color. You stop teasing her, and use two fingers to penetrate her suddenly. Your efforts are rewarded with a spill of more lubricant; you begin the fingering and clit rub that makes up the "standard" pussy massage.<center>[img[IMG-WetPussyMassage]]</center>`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-HD-TitMassage",
        content: `<<set _hn = setup.hucowName()>>After finishing her milking, <<= _hn>> comes over and asks for a breast massage. It's pretty normal for the girls to ask for a massage during milking when their udders are over-full or a little sore. They usually ask before they start or sometimes during a milking; <<= _hn>> asks afterward though, which means her problem is a little more serious. Long and narrow tributary milk ducts leading to milk glands deeper in the udder can sometimes prevent those distant glands from properly letting down. This usually happens with newly developed gland tissue, commonly from a hucow treatment. With a little time the milk ducts will enlarge and become more sturdy, while the glands will get in sync with the rest of the breast in terms of production. Until that happens though, it can cause some deep-breast discomfort, which is what <<= _hn>> is complaining about.<br><br>After getting her laid down on a massage table kept in a nearby room, you give her a thorough breast massage. It takes a good chunk of your time--a solid twenty minutes--to properly massage her udders. While it's true that it takes you away from other work that needs to be done, it does make for a nice change of pace from the normal day-to-day. The fact that <<= _hn>> is so thankful afterwards is also a nice bonus, and hucows <i>know</i> how to be thankful.`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-HD-Creampie",
        content: `During the day as you're watching over the hucows getting milked and sanitizing a few of the used collection cups, Diesel swaggers into the milking bay. It seems one of the girls is ready for a baby, or perhaps just asked the bull <i>really nice</i> for a dose of cock during her milking. He looks around a bit, appreciating the flesh on display, as he looks for his target. He spots the lucky girl; his huge cock is rock-hard, pointing the way as he walks over to her bench. You can't hear what they may be talking about over the machines, but it isn't long until Diesel is pistoning in and out of her. You go back to cleaning the collection cups--not wanting to get yourself worked up--and discover that you ''can'' hear the sound of her moans over the machines.<br><br>After finishing with sanitizing the cups, you start to make the rounds of the bay, checking on the hucows, equipment, and taking care of newly-vacated benches. You hear Diesel give a satisfied grunt, and look over to see him unloading into a thoroughly-satisfied hucow's cunt. When he pulls out cum floods out of her over-stuffed pussy. @@.mono;Damn! I forgot the bulls could cum so much!@@ You look at the puddle of cum that has splashed onto the milking bench and has already begun to drip onto the floor. @@.mono;Fuck. I'm going to have to clean all that up...@@`,
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-JobContent-HD-FootMassage",
        content: `This morning <<= setup.hucowName()>> was complaining about discomfort in her udders. It seems she ended up sleeping on them in a rather awkward way, resulting in her present discomfort. You went for the usual mammary massage during her morning milking; fortunately the milking benches are quite versatile and you're able to do a pretty thorough massage while her udders hang free beneath her. Unfortunately, while the massage and milking seems to have helped her discomfort, it hasn't completely gone away. You also notice that her output was lower than expected. In the end you have to do a more intense massage to get her udders back in fighting shape. Because it's difficult to apply enough pressure with hands and arms alone, this means using your feet and legs. It takes some time, but the enthusiastic thanks you get afterward makes it feel worthwhile.`,
      },
    ],
    rank0: {
      rulesCutoffs: [20, 35, 50, 65, 80],
      vacationRate: 0,
      vacationRatePaid: 0,
      sickRate: 4,
      // tslint:disable-next-line:max-line-length
      pay: [9, 4, 4],
      statsRank: 0,
      name: "Probationary Assistant Dairy Hand",
      rulesBoss: "Buttercup Jugs",
      promotionBonus: 2,
    },
    rank1: {
      rulesCutoffs: [25, 40, 55, 70, 85],
      vacationRate: 4,
      vacationRatePaid: 0,
      sickRate: 4,
      // tslint:disable-next-line:max-line-length
      pay: [10, 4, 4],
      statsRank: 1,
      name: "Assistant Dairy Hand",
      rulesBoss: "Buttercup Jugs",
      promotionBonus: 2,
    },
    rank2: {
      rulesCutoffs: [30, 45, 60, 75, 90],
      vacationRate: 4,
      vacationRatePaid: 4,
      sickRate: 4,
      // tslint:disable-next-line:max-line-length
      pay: [12, 4, 4],
      statsRank: 2,
      name: "Junior Dairy Hand",
      rulesBoss: "Buttercup Jugs",
      promotionBonus: 1,
    },
    rank3: {
      rulesCutoffs: [40, 50, 65, 80, 95],
      vacationRate: 0,
      vacationRatePaid: 8,
      sickRate: 6,
      // tslint:disable-next-line:max-line-length
      pay: [14, 4, 4],
      statsRank: 3,
      name: "Dairy Hand",
      rulesBoss: "Clarabelle Rackful",
      promotionBonus: 1,
    },
    rank4: {
      rulesCutoffs: [50, 60, 70, 85, 95],
      vacationRate: 4,
      vacationRatePaid: 8,
      sickRate: 6,
      // tslint:disable-next-line:max-line-length
      pay: [16, 4, 4],
      statsRank: 4,
      name: "Senior Dairy Hand",
      rulesBoss: "Clarabelle Rackful",
      promotionBonus: 0,
    },
    acceptance: [
      `To be honest, you don't currently meet the requirements for the listed position. The Farm Coop Dairy takes caring for our hucows quite seriously, as I'm sure you'll understand. However, because you do do seem to have some potential, we're offering you a temporary position with lower pay. If you prove that you can learn and you have what it takes, you'll be able to advance to the listed position.`,
      `Thanks for applying for the Farm Coop Dairy's Dairy Hand position. You meet the requirements for the listed position. Taking care of our hucows and employees is a top priority here at the Dairy, so you can look forward to a rewarding career with us!`,
      `Thanks for applying for the Farm Coop Dairy's Dairy Hand position. Here at the Dairy, we make taking care of our hucows and employees a top priority. That said, we see that your qualifications exceed our requirements, and would like to offer you a higher position with us. This of course will mean salary more in line with your skills. We're looking forward to working with you!`,
    ],
  },
};
