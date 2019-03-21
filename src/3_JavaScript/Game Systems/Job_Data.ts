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
    events?: Events[];
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
    ↂ.job.rules.payrate = Math.round((aw.jobData[place][stringifiedRank].pay[0] * State.active.variables.AW.curBase) * aw.jobData[place][stringifiedRank].pay[1] / aw.jobData[place][stringifiedRank].pay[2]);
    // tslint:disable-next-line:max-line-length
    ↂ.job.pay = Math.round(ↂ.job.rules.payrate * ↂ.job.rules.worktime[0]),
    ↂ.job.stats.rank = aw.jobData[place][stringifiedRank].statsRank;
    ↂ.job.name = aw.jobData[place][stringifiedRank].name;
    ↂ.job.rules.boss = aw.jobData[place][stringifiedRank].rulesBoss;
    ↂ.job.stats.performance = 10;
    ↂ.job.stats.boss = 10;
    ↂ.job.stats.progress = 0;
    ↂ.job.stats.promote = false;
    aw.con.obj(ↂ.job); // TODO: remove before flight

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
    apply: ["CL", 10, "OG", 10],
    pcJob: "services",
    wallPaper: "IMG_InstituteWall",
    clothesRequired() {
      return [true];
  },
    jobPercept: 1,
    // tslint:disable-next-line:max-line-length
    schedWorkTime: [40, [0, 0, 0, 0], [8, 0, 17, 0], [8, 0, 17, 0], [8, 0, 17, 0], [0, 0, 0, 0], [8, 0, 17, 0], [8, 0, 17, 0]],
    schedWorkDays: [8, false, true, true, true, false, true, true],
    rulesTaskratio: [60, 22, 10, 5, 2, 1],
    rulesTasks: 4,
    // tslint:disable-next-line:max-line-length
    rulesTaskA: {type: "CL", DC: 8, retry: true, effect: 1, stress: 2, hap: 0, desc: ["emptying the trash", "sweeping the hallways", "vacuuming offices", "mopping the hallways", "cleaning windows"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "CL", DC: 10, retry: true, effect: 1, stress: 4, hap: 0, desc: ["cleaning the bathroom", "wiping down the urinals", "cleaning the break room", "dusting"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "OG", DC: 10, retry: true, effect: 1, stress: 4, hap: 0, desc: ["putting away dishes", "arranging the cleaning supplies", "returning office items to where they belong"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "OG", DC: 12, retry: false, effect: 1, stress: 5, hap: 0, desc: ["refilling toilet paper dispensers", "refilling the hand sanitizer", "stocking new paper towels"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "CL", DC: 8, retry: false, effect: 2, stress: 5, hap: -2, desc: ["mopping up puke", "flushing a stranded turd", "scrubbing bathroom graffiti"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "CL", DC: 14, retry: false, effect: 3, stress: 10, hap: -1, desc: ["mopping up a strange chemical spill", "picking up broken glassware", "emptying an overfull sharps bin"]},
    rulesWorktime: [40, 0, 8, 8, 8, 0, 8, 8],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
      rank: [0, 1],
      passage: "BestyServicesEvent1-A",
      image: "none",
      // tslint:disable-next-line:max-line-length
      content: "",
      random: true,
      odds: [1, 5],
      title: "Just another boring day at work",
      condition(rank) {
        if (ↂ.flag.jobEvents.services.sawChinese === null) {
          ↂ.flag.jobEvents.services.sawChinese = false;
        }
        if (rank > 5 || ↂ.flag.jobEvents.services.sawChinese) {
          return false;
        }
        return true;
      },
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Today you were treated to the sound of wailing sirens for nearly 30 minutes, it seems like something almost broke out of a lab again. When will those Biomedical guys learn?",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Some of the middle-management guys came in today and announced some sort of last minute-blood test. You aren't sure what it was all about, but you distinctly remember hearing something about an emergency.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Today another one of your coworkers got <i>promoted</i> out of the department again. It seems odd how fast people are promoted around here, but you can't really complain; after all, that means you'll be promoted faster too.",
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
    desc: "This job is essentially organizing and setting up lab equipment for people several pay grades above you to use. <i>Surely that acronym is unintentional... or at least nobody uses it, right?</i>",
    img: "IMG-JobCover-Sperm",
    title: "Lab Technician",
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
    rulesTaskA: {type: "OG", DC: 10, retry: true, effect: 1, stress: 3, hap: 0, desc: ["organizing gradiated glassware", "bringing the correct lasers out of storage", "pre-measuring hundreds of vials of regents", "labeling sample containers"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "OG", DC: 12, retry: true, effect: 1, stress: 5, hap: 0, desc: ["placing petri dishes in the correct sample fridge", "catalog research notes", "refilling electronic component bins", "setting up the requested light filters"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "PS", DC: 10, retry: false, effect: 2, stress: 5, hap: 0, desc: ["figuring out the best arrangement of requested chemicals", "decyphering handwritten lab requests", "choosing the correct microscope slides", "running the autoclave"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "CL", DC: 10, retry: true, effect: 1, stress: 8, hap: 0, desc: ["washing labratory glassware", "cleaning other employees' used dishes and coffee mugs", "wiping down table surfaces", "polishing optical lenses"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "CL", DC: 12, retry: true, effect: 1, stress: 8, hap: 0, desc: ["properly sanitizing surgical implements", "disinfecting petri dishes", "disposing of used needles and syringes"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "PS", DC: 14, retry: false, effect: 2, stress: 10, hap: -1, desc: ["finding the services employee that hasn't been secretly dosed yet", "covertly refilling the west wing second floor water cooler"]},
    rulesWorktime: [40, 8, 8, 8, 8, 8, 0, 0],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
      rank: [0, 1],
      passage: "none",
      image: "none",
      // tslint:disable-next-line:max-line-length
      content: "First placeholder event for SPERM. In fact, I am gonna write a bit here, just to make it more interesting. You see, there is nothing more dull and boring than seeing something as plain as 'Placeholder'. If you are supplied with some text it gets much more funny, agree?",
      random: true,
      title: "Just another boring day at work",
      odds: [1, 3],
      condition(rank) {if (rank === "rank0" || rank === "rank1") {return true; } else {return false; }},
      },
      {
      rank: [0, 1],
      passage: "none",
      image: "none",
      // tslint:disable-next-line:max-line-length
      content: "Second placeholder event for SPERM. In fact, I am gonna write a bit here, just to make it more interesting. You see, there is nothing more dull and boring than seeing something as plain as 'Placeholder'. If you are supplied with some text it gets much more funny, agree?",
      random: true,
      title: "Just another boring day at work",
      odds: [1, 3],
      condition(rank) {if (rank === "rank0" || rank === "rank1") {return true; } else {return false; }},
      },
      {
      rank: [0, 1],
      passage: "none",
      image: "none",
      // tslint:disable-next-line:max-line-length
      content: "Third placeholder event for SPERM. In fact, I am gonna write a bit here, just to make it more interesting. You see, there is nothing more dull and boring than seeing something as plain as 'Placeholder'. If you are supplied with some text it gets much more funny, agree?",
      random: true,
      title: "Just another boring day at work",
      odds: [1, 3],
      condition(rank) {if (rank === "rank0" || rank === "rank1") {return true; } else {return false; }},
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Today you were treated to the sound of wailing sirens for nearly 30 minutes, it seems like something almost broke out of a lab again. When will those Biomedical guys learn?",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Some of the middle-management guys came in today and announced some sort of last minute-blood test. You aren't sure what it was all about, but you distinctly remember hearing something about an emergency.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Today another one of your coworkers got <i>promoted</i> out of the department again. It seems odd how fast people are promoted around here, but you can't really complain; after all, that means you'll be promoted faster too.",
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
    rulesTaskA: {type: "CM", DC: 9, retry: true, effect: 1, stress: 4, hap: 0, desc: ["sending email", "filing tps reports", "adding things to the calendar", "reading email", "reading performance reports"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "FI", DC: 9, retry: true, effect: 1, stress: 4, hap: 0, desc: ["entering figures into a spreadsheet", "fixing timecard math", "calculating office supply expenditures", "copying figures from one spreadsheet to another"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "OG", DC: 9, retry: true, effect: 1, stress: 4, hap: 0, desc: ["filing paper copies", "organizing order requests", "attaching performance reviews to employee records", "sorting receipts by date"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "CM", DC: 12, retry: false, effect: 1, stress: 6, hap: -1, desc: ["watching training presentations", "avoiding the impression that you are human", "delivering a black envelope to an employee"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "FI", DC: 12, retry: false, effect: 2, stress: 6, hap: -1, desc: ["denying compensation claims", "rejecting expense vouchers"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "PS", DC: 14, retry: false, effect: 2, stress: 8, hap: -1, desc: ["avoiding blame for a random problem"]},
    rulesWorktime: [40, 8, 8, 8, 8, 8, 0, 0],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
      rank: [0, 1],
      passage: "none",
      image: "none",
      // tslint:disable-next-line:max-line-length
      content: "Some placeholder event for BCorps. In fact, I am gonna write a bit here, just to make it more interesting. You see, there is nothing more dull and boring than seeing something as plain as 'Placeholder'. If you are supplied with some text it gets much more funny, agree?",
      random: true,
      odds: [1, 3],
      condition(rank) {if (rank === "rank0" || rank === "rank1") {return true; } else {return false; }},
      title: "Just another boring day at work",
      },
    ],
    jobContent: [
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Today you were treated to the sound of wailing sirens for nearly 30 minutes, it seems like something almost broke out of a lab again. When will those Biomedical guys learn?",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Some of the middle-management guys came in today and announced some sort of last minute-blood test. You aren't sure what it was all about, but you distinctly remember hearing something about an emergency.",
      },
      {
        rank: [0, 1, 2, 3, 4],
        passage: "none",
        image: "IMG-EventPlaceholder",
        // tslint:disable-next-line:max-line-length
        content: "Today another one of your coworkers got <i>promoted</i> out of the department again. It seems odd how fast people are promoted around here, but you can't really complain; after all, that means you'll be promoted faster too.",
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
    desc: "This job is all about cleaning houses of the rich twats getting barely enough for living in return. <i>The job seems to be focused on tidying up the houses of rich clients of that cleaning company. The salary is pretty mediocre but the schedule is quite nice and there is an opportunity for some useful acquaintances...</i>",
    img: "IMG-JobCover-Pouffiasse",
    title: "Maid",
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
        const title = "Unapropriate attire";
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
    rulesTaskA: {type: "CL", DC: 8, retry: true, effect: 1, stress: 3, hap: 0, desc: ["moping the floors", "doing the dishes", "vacuuming rooms", "scrubing the dirt", "cleaning windows"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskB: {type: "CL", DC: 10, retry: true, effect: 1, stress: 6, hap: 0, desc: ["wiping the bathroom", "making beds", "doing laundry", "dusting the shelves"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskC: {type: "OG", DC: 10, retry: true, effect: 1, stress: 5, hap: 0, desc: ["making flower arrangements", "decorating the hall", "putting client's shoes in line"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskD: {type: "OG", DC: 12, retry: false, effect: 1, stress: 3, hap: 0, desc: ["watering flowers", "arranging things", "instructing the gardener"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskE: {type: "CL", DC: 8, retry: false, effect: 2, stress: 10, hap: -2, desc: ["dusting the cobwebs", "cleaning the toilet bowl", "shooing the mices"]},
    // tslint:disable-next-line:max-line-length
    rulesTaskF: {type: "OG", DC: 14, retry: false, effect: 3, stress: 7, hap: -1, desc: ["ordering paper towels", "arguing with the delivery service", "hiding the broken vase"]},
    rulesWorktime: [24, 6, 0, 6, 0, 6, 0, 6],
    rulesBreaktime: 60,
    rulesStrict: true,
    ranks: 4,
    events: [
      {
        rank: [0, 1, 2, 3],
        passage: "FirstDayEvent1",
        image: "none",
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
      name: "mr. Stafford's house maid",
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
      name: "dr. Baker's mansion maid",
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
      name: "mr. King's mansion maid",
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
      name: "mr. Haden's mansion maid",
      rulesBoss: "Richard Haden",
      promotionBonus: 1,
    },
    acceptance: [
      `Maid Pouffiasse llc gladly welcomes you as our new maid! While your scores were just barely enough to pass, our company has a long-standing tradition of quality maid education that helps us to maintain the highest standards in our services! Please read the follow up email for information about your new employment at Maid Pouffiasse.`,
      `Maid Pouffiasse llc gladly welcomes you as our new maid! While your scores were rather mediocre, our company has a long-standing tradition of quality maid education that helps us to maintain the highest standards in our services! Please read the follow up email for information about your new employment at Maid Pouffiasse.`,
      `Maid Pouffiasse llc gladly welcomes you as our new maid! Your scores exceeded our expectations, so we are sure you will be able to maintain the highest standards in our maid services! Please read the follow up email for information about your new employment at Maid Pouffiasse.`,
    ],
  },
};

