/*
███████╗███████╗██╗  ██╗ █████╗  ██████╗████████╗███████╗
██╔════╝██╔════╝╚██╗██╔╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝
███████╗█████╗   ╚███╔╝ ███████║██║        ██║   ███████╗
╚════██║██╔══╝   ██╔██╗ ██╔══██║██║        ██║   ╚════██║
███████║███████╗██╔╝ ██╗██║  ██║╚██████╗   ██║   ███████║
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝
NPC ACTIONS
*/

if (aw.sexActN === null || aw.sexActN === undefined) {
  aw.sexActN = {};
}
if (setup.sex === null || setup.sex === undefined) {
  setup.sex = {} as setupSex;
}

class SexActN {
  public name: string;
  public key: string;
  public cat: string;
  public kink: string[];
  public parts: [string, string];
  public effect: sexEffectObject;
  public sex: sexGenderNumber;
  public tags: string[];
  public req: string[];
  public forbid: string[];
  public special: () => void;
  public uniqueReq: () => boolean;
  constructor({ name, key, cat, kink, parts, sex = 0, effect, tags, req, forbid, special, uniqueReq = "none" }: {
    name: string,
    key: string,
    cat: string,
    kink: string[],
    skill: any,
    parts: [string, string],
    effect: sexEffectObject,
    sex: sexGenderNumber,
    tags: string[],
    req: string[],
    forbid: string[],
    special: (() => void),
    uniqueReq: "none" | (() => boolean),
  }) {
    this.name = name;
    this.key = key;
    this.cat = cat;
    this.kink = jQuery.extend(true, [], kink);
    this.parts = [parts[0], parts[1]];
    this.effect = jQuery.extend(true, {}, effect);
    this.tags = jQuery.extend(true, [], tags);
    this.req = jQuery.extend(true, [], req);
    this.sex = sex;
    this.forbid = jQuery.extend(true, [], forbid);
    this.special = special;
    if ("object" !== typeof this.effect.wetness) {
      const x = this.effect.wetness;
      this.effect.wetness = {pcAmt: x, npcAmt: x, pcMax: 20, npcMax: 20};
    }
    if ("object" !== typeof this.effect.arousal) {
      const x = this.effect.arousal;
      this.effect.arousal = { pcAmt: x, npcAmt: x, pcMax: 10, npcMax: 10};
    }
    if ("object" !== typeof this.effect.pleasure) {
      const x = this.effect.pleasure;
      this.effect.pleasure = { pcAmt: x, npcAmt: x, pcMax: 120, npcMax: 120};
    }
    if (this.effect.wetness.pcMax === null || this.effect.wetness.pcMax === undefined) {
      this.effect.wetness.pcMax = 20;
    }
    if (this.effect.wetness.npcMax === null || this.effect.wetness.npcMax === undefined) {
      this.effect.wetness.npcMax = 20;
    }
    if (this.effect.arousal.pcMax === null || this.effect.arousal.pcMax === undefined) {
      this.effect.arousal.pcMax = 10;
    }
    if (this.effect.arousal.npcMax === null || this.effect.arousal.npcMax === undefined) {
      this.effect.arousal.npcMax = 10;
    }
    if (this.effect.pleasure.pcMax === null || this.effect.pleasure.pcMax === undefined) {
      this.effect.pleasure.pcMax = 100;
    }
    if (this.effect.pleasure.npcMax === null || this.effect.pleasure.npcMax === undefined) {
      this.effect.pleasure.npcMax = 100;
    }
    if (uniqueReq === "none") {
      this.uniqueReq = function() {return true; };
    } else {
      this.uniqueReq = uniqueReq;
    }
  }
  get allowed() { // return 0:good, 1:parts, 2:gender, 3:forbid enviro, 4:missing enviro, 5:censor, 6:insufficient skill
    const ᛔ = State.active.variables;
    try {
      if (!aw.sexActNRef[ↂ.sex.pos][ↂ.sex.target][this.key]) {
        return 1;
      }
    } catch (e) {
      aw.con.warn(`Failure in sexact allowed - sex.valid - ${e.name}: ${e.message}`);
    }
    const sx = ↂ.sex.npc[ↂ.sex.target].main;
    try {
      if (this.sex === 1 && !sx.male) {
        // aw.con.warn(`act ${this.key} failed due to sex`);
        return false;
      }
      if (this.sex === 2 && !sx.female) {
        // aw.con.warn(`act ${this.key} failed due to sex`);
        return false;
      }
      const sex = ↂ.sex;
      // TODO - enable selecting extra positions for group sex - check pos of target
      const blockA = aw.sexPos[sex.pos].pos[1].blocked;
      const occuA = aw.sexPos[sex.pos].pos[1].occupy;
      const blockB = aw.sexPos[sex.pos].pos[0].blocked;
      const occuB = aw.sexPos[sex.pos].pos[0].occupy;
      if (blockA.includes(this.parts[0])) {
        // aw.con.warn(`act ${this.key} failed blockA`);
        return false;
      }
      if (occuA.includes(this.parts[0])) {
        // aw.con.warn(`act ${this.key} failed occuA`);
        return false;
      }
      if (blockB.includes(this.parts[1])) {
        // aw.con.warn(`act ${this.key} failed blockB`);
        return false;
      }
      if (occuB.includes(this.parts[1])) {
        // aw.con.warn(`act ${this.key} failed occuB`);
        return false;
      }
      if (!this.uniqueReq()) {
        // aw.con.warn(`act ${this.key} failed unique`);
        return false;
      }
      for (let i = 0, c = this.forbid.length; i < c; i++) {
        if (this.forbid[i] !== "none" && sex.enviroTags.includes(this.forbid[i])) {
          // aw.con.warn(`act ${this.key} failed forbid`);
          return false;
        }
      }
      for (let i = 0, c = this.req.length; i < c; i++) {
        if (this.req[i] !== "none" && !sex.enviroTags.includes(this.req[i])) {
          // aw.con.warn(`act ${this.key} failed required`);
          return false;
        }
      }
      for (let i = 0, c = this.kink.length; i < c; i++) {
        if (ᛔ.censor.includes(this.kink[i])) {
          // aw.con.warn(`act ${this.key} failed censor`);
          return false;
        }
      }
    } catch (e) {
      aw.con.warn(`Failure in sexactN allowed - base checks - ${e.name}: ${e.message}`);
    }
    return true; // if nothing forbids the action, then it's good to go
  }
}

(function() {
  const act = {
    strokeHair: {
      name: "rub chest", // name of the action
      key: "strokeHair", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      parts: ["hand", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 1, // actual amount
          pcMax: 20, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 1,
          npcMax: 10,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 4,
          npcAmt: 1,
          npcMax: 3,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 5,
          npcAmt: 1,
          npcMax: 5,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    cupAss: {
      name: "squeeze ass", // name of the action
      key: "cupAss", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["hand", "ass"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 5,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 15,
          npcAmt: 1,
          npcMax: 15,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [8, 8], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    slowDown: {
      name: "Slow Down", // name of the action
      key: "slowDown", // key of the action
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["skip", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 10, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 10,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 0,
          npcAmt: 0,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 0,
          npcAmt: 0,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        const sex = ↂ.sex;
        sex.speed -= 1;
        if (sex.speed < 1) {
          sex.speed = 1;
        }
        if (sex.speed < aw.sexPos[sex.pos].speed.min) {
          sex.speed = aw.sexPos[sex.pos].speed.min;
        }
      },
    },
    speedUp: {
      name: "Speed Up", // name of the action
      key: "speedUp", // key of the action
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["skip", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 30, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 30,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 0,
          npcAmt: 0,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          npcAmt: 1,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        const sex = ↂ.sex;
        sex.speed += 1;
        if (sex.speed > 8) {
          sex.speed = 8;
        }
        if (sex.speed > aw.sexPos[sex.pos].speed.max) {
          sex.speed = aw.sexPos[sex.pos].speed.max;
        }
      },
    },
    rubVulvaOutside: {
      name: "rub vulva", // name of the action
      key: "strokeCock", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["hand", "vulva"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 40, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 5,
          npcMax: 80,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          pcMax: 20,
          npcAmt: 1,
          npcMax: 10,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    playWnipples: {
      name: "play with nipples", // name of the action
      key: "playWnipples", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["hand", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 20, // actual amount
          pcMax: 95, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 5,
          npcMax: 85,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 15,
          npcAmt: 1,
          npcMax: 15,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["nips"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        try {
          if (ↂ.pc.kink.nips) {
            this.effect.pleasure.pcMax = 100;
            this.effect.pleasure.pcAmt = 30;
          }
        } catch (e) {
          aw.con.warn(`It seems that this.effect.pleasure modification from the sexAct.special function doesn't work because ${e.name}: ${e.message}`);
        }
      }, // special function to be run when action is taken.
    },
    heftBreasts: {
      name: "squeeze/heft breasts", // name of the action
      key: "heftBreasts", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 15, // actual amount
          pcMax: 90, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 5,
          npcMax: 10,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          npcAmt: 1,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["nips"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    rubInsideVulva: {
      name: "rub inside vulva", // name of the action
      key: "rubOwnVulva", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["hand", "pussy"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 40, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 3,
          npcAmt: 1,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    strokeClit: {
      name: "stroke clit", // name of the action
      key: "strokeClit", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["hand", "pussy"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 60, // actual amount
          pcMax: 105, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 3,
          pcMax: 20,
          npcAmt: 0,
          npcMax: 20,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    passionateKiss: {
      name: "passionate kiss", // name of the action
      key: "passionateKiss", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "lips"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 2, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 2,
          npcMax: 10,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 8,
          npcAmt: 2,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          pcMax: 15,
          npcAmt: 2,
          npcMax: 15,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["slut"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    kiss: {
      name: "normal kiss", // name of the action
      key: "kiss", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "lips"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 1, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 1,
          npcMax: 10,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 10,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["flirty"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["slut"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    neckEar: {
      name: "kiss neck/ear", // name of the action
      key: "neckEar", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 3, // actual amount
          pcMax: 30, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 1,
          npcMax: 15,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 10,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    exploreVulva: {
      name: "explore vulva with tongue", // name of the action
      key: "exploreVulva", // key of the action
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "groin"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          npcAmt: 5, // actual amount
          npcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          pcAmt: 35,
          pcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          npcAmt: 2,
          npcMax: 10,
          pcAmt: 3,
          pcMax: 10,
        },
        wetness: { // amount of wetness to increase
          npcAmt: 2,
          pcAmt: 3,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["dom", "slut"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["sub"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    suckNipple: {
      name: "suck on nipple", // name of the action
      key: "suckNipple", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          npcAmt: 5, // actual amount
          npcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          pcAmt: 20,
          pcMax: 95,
        },
        arousal: { // arousal gain from action (base)
          npcAmt: 2,
          npcMax: 10,
          pcAmt: 3,
          pcMax: 10,
        },
        wetness: { // amount of wetness to increase
          npcAmt: 2,
          pcAmt: 3,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 3], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        try {
          if (ↂ.pc.kink.nips) {
            this.effect.pleasure.pcMax = 100;
            this.effect.pleasure.pcAmt = 35;
          }
        } catch (e) {
          aw.con.warn(`It seems that this.effect.pleasure modification from the sexAct.special function doesn't work because ${e.name}: ${e.message}`);
        }
      }, // special function to be run when action is taken.
    },
    strokeClitTongue: {
      name: "stroke clit with tongue", // name of the action
      key: "strokeClitTongue", // key of the action
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "vulva"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          npcAmt: 5, // actual amount
          npcMax: 90, // max allowed percent  - won't increase pleasure above that point.
          pcAmt: 45,
          pcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          npcAmt: 2,
          npcMax: 10,
          pcAmt: 3,
          pcMax: 10,
        },
        wetness: { // amount of wetness to increase
          npcAmt: 2,
          pcAmt: 3,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["dom"],
          pcTrait: ["none"],
          npcKink: ["sub"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["sub"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    suckClit: {
      name: "suck clit area", // name of the action
      key: "suckClit", // key of the action
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "vulva"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          npcAmt: 5, // actual amount
          npcMax: 90, // max allowed percent  - won't increase pleasure above that point.
          pcAmt: 45,
          pcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          npcAmt: 2,
          npcMax: 10,
          pcAmt: 3,
          pcMax: 10,
        },
        wetness: { // amount of wetness to increase
          npcAmt: 2,
          pcAmt: 3,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["dom"],
          pcTrait: ["none"],
          npcKink: ["sub"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["sub"],
          pcTrait: ["none"],
          npcKink: ["dom"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    tongueClit: {
      name: "rub clit with tongue", // name of the action
      key: "tongueClit", // key of the action
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["lips", "vulva"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          npcAmt: 5, // actual amount
          npcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          pcAmt: 55,
          pcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          npcAmt: 1,
          npcMax: 10,
          pcAmt: 3,
          pcMax: 10,
        },
        wetness: { // amount of wetness to increase
          npcAmt: 1,
          pcAmt: 3,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["dom", "slut"],
          pcTrait: ["bitch"],
          npcKink: ["sub"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["sub"],
          pcTrait: ["none"],
          npcKink: ["dom"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    fingerPussy: {
      name: "finger pussy", // name of the action
      key: "fingerPussy", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["hand", "vulva"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 40, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 1,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 3,
          pcMax: 20,
          npcAmt: 1,
          npcMax: 10,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    spankButt: {
      name: "spank butt", // name of the action
      key: "spankButt", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["bdsm", "domsub", "impact", "sadomasochism", "pain", "masochist", "sadist"], // any kinks action contains/implies for censorship
      parts: ["hand", "butt"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 10, // actual amount
          pcMax: 70, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 5,
          npcMax: 35,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 4,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 4,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 4,
          pcMax: 18,
          npcAmt: 1,
          npcMax: 4,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["sub", "masochist", "slut"],
          pcTrait: ["lowEsteem"],
          npcKink: ["dom"],
          npcTrait: ["bitch"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["romantic"],
          npcKink: ["shame"],
          npcTrait: ["friendly", "romantic"],
        },
      },
      tags: ["dom"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    strokeCock: {
      name: "stroke own cock", // name of the action
      key: "gstrokeCock", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["skip", "groin"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 25,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 0,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 0,
          pcMax: 10,
          npcAmt: 2,
          npcMax: 20,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    huggies: {
      name: "give hug", // name of the action
      key: "huggies", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["chest", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 1, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 1,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 5,
          npcAmt: 1,
          npcMax: 5,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 10,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["romantic"],
          npcKink: ["none"],
          npcTrait: ["romantic"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["-romantic"],
          npcKink: ["none"],
          npcTrait: ["-romantic"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    complementBody: {
      name: "complement body", // name of the action
      key: "complementBody", // key of the action
      cat: "talk", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 10,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["none"],
          npcKink: ["shame"],
          npcTrait: ["none"],
        },
      },
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
    },
    putOnCondom: {
      name: "put on condom", // name of the action
      key: "putOnCondom", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: -150, // actual amount
          pcMax: 99, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: -150,
          npcMax: 99,
        },
        arousal: -2,
        wetness: -1,
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["pregnancy", "risky"],
          pcTrait: ["none"],
          npcKink: ["pregnancy", "risky"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        const ᛔ = State.active.variables;
        ↂ.sex.npcBC[ↂ.sex.target].condom.worn = true;
        ↂ.sex.npcBC[ↂ.sex.target].condom.break = false;
        ↂ.sex.npcBC[ↂ.sex.target].condom.health = 0;
        ↂ.sex.npcBC[ↂ.sex.target].condom.sabo = 0;
        ↂ.sex.npcBC[ↂ.sex.target].condom.effect = 85;
      }, // special function to be run when action is taken.
      uniqueReq() {
        const ᛔ = State.active.variables;
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn) {
          return false; // can't wear an extra condom
        }
        if (ↂ.sex.flag.npcTookOffCondom != null) {
          if (ↂ.sex.flag.npcTookOffCondom) {
            return false; // not gonna put one on if already took one off
          }
        }
        if (aw.sexPos[ↂ.sex.pos].sex) {
          return false; // not gonna stop during sex for one
        }
        if (ↂ.sex.flag.askedCondom) {
          return false; // npc already refused, isn't going to put on now
        }
        if (ↂ.sex.flag.knowsAcid) {
          return false;
        }
        return true;
      },
    },
    pullOffCondom: {
      name: "pull off condom", // name of the action
      key: "pullOffCondom", // key of the action
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship
      parts: ["skip", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 10, // actual amount
          pcMax: 98, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 20,
          npcMax: 98,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 4,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 5,
          pcMax: 20,
          npcAmt: 3,
          npcMax: 20,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["pregnancy", "risky", "cumSlut"],
          pcTrait: ["maternal"],
          npcKink: ["pregnancy", "risky"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["-maternal"],
          npcKink: ["shame"],
          npcTrait: ["none"],
        },
      },
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      uniqueReq() {
        const ᛔ = State.active.variables;
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn) {
          return true;
        } else {
          return false;
        }
      },
      special() {
        const ᛔ = State.active.variables;
        ↂ.sex.npcBC[ↂ.sex.target].condom.worn = false;
        ↂ.sex.npcBC[ↂ.sex.target].condom.break = false;
        ↂ.sex.npcBC[ↂ.sex.target].condom.health = 0;
        ↂ.sex.npcBC[ↂ.sex.target].condom.sabo = 0;
        ↂ.sex.npcBC[ↂ.sex.target].condom.effect = 0;
        ↂ.sex.flag.npcTookOffCondom = true;
      }, // special function to be run when action is taken.
    },
  };
  const keys = Object.keys(act);
  let cnt = 0;
  for (let i = 0, c = keys.length; i < c; i++) {
    aw.sexActN[keys[i]] = new SexActN(act[keys[i]]);
    cnt ++;
  }
  setup.sex.sexActNList = Object.keys(aw.sexActN);
  aw.con.info(`${cnt} npc sex actions loaded.`);
})();

