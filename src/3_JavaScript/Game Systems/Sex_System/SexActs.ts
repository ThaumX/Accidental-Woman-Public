/*
███████╗███████╗██╗  ██╗ █████╗  ██████╗████████╗███████╗
██╔════╝██╔════╝╚██╗██╔╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝
███████╗█████╗   ╚███╔╝ ███████║██║        ██║   ███████╗
╚════██║██╔══╝   ██╔██╗ ██╔══██║██║        ██║   ╚════██║
███████║███████╗██╔╝ ██╗██║  ██║╚██████╗   ██║   ███████║
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝

Variables used to define SexAct class object
    name; //pretty name of act
    key; //letiable key name
    effect = { //object with effects that are interpreted by control
    arousal: [20,0], //strength of action to increase arousal [pc,npc]
    wetness: [0,20], //strength of action to increase wetness [pc,npc]
    satisfy: [0,0], //modifier to satisfaction gain from orgasm this way. [pc,npc]
    cumDest: "default", //can override cum destination from position.
    strong: ["none"], //list of traits/kinks that enhance effect
    strongNPC: ["none"], //list of traits/kinks that enhance effect
    weak: ["none"], //list of traits/kinks that decrease effect
    weakNPC: ["none"], //list of traits/kinks that decrease effect
  };
    tags; //tags for the action
    cat; //category of sex act for tracking activities
    button; //button text
    hovname; //unique identifier for specific act
    hovtext; //description of action for hover text
    action; //function that mods letiables
    allowList; //list of relevant keys for content blocking
    req; //object containing tag requirements for action
      loc; //required location tags like furniture
      pos; //required position tags
      pcCanAccess; //required body access tags by pc hands to npc bodypart
      pcCanMouth; //required access by pc mouth to npc bodypart
      npcCanAccess; //required access ny npc to pc's bodypart
      npcCanMouth; //required access by npc mouth to pc's bodypart
    tab; //number, tab to be displayed on 1=touch, 2=kiss, 3=speak, 4=move, 5=kink, 6=other
  */


if (aw.sexAct === null || aw.sexAct === undefined) {
  aw.sexAct = {};
}
if (setup.sex === null || setup.sex === undefined) {
  setup.sex = {} as setupSex;
}

class SexAct {
  public name: string;
  public key: string;
  public label: string;
  public hover: string;
  public tab: string;
  public cat: string;
  public kink: string[];
  public skill: any;
  public parts: [string, string];
  public effect: sexEffectObject;
  public sex: sexGenderNumber;
  public tags: string[];
  public req: string[];
  public forbid: string[];
  public special: () => void;
  public condition: () => boolean;
  public button: string;
  public uniqueReq: () => void | boolean;
  constructor({ name, key, label, hover, tab, cat, kink, skill, parts, effect, sex, menu, tags, req, forbid, special, condition, uniqueReq = "none" }: {
    name: string,
    key: string,
    label: string,
    hover: string,
    tab: string,
    cat: string,
    kink: string[],
    skill: any,
    parts: [string, string],
    effect: sexEffectObject,
    sex: sexGenderNumber,
    tags: string[],
    menu: false | string,
    req: string[],
    forbid: string[],
    special: (() => void),
    condition: (() => boolean),
    uniqueReq: "none" | (() => void),
  }) {
    this.name = name;
    this.key = key;
    const lab = label.replace(/\s/g, "&nbsp;");
    label = lab.replace(".", "🎯");
    this.label = label;
    // <<insertion ${key}Lab>>
    this.hover = `<span id="${key}-hover"><span class="ship tit">[${label}]</span> ${name}: ${hover}</span>`;
    this.tab = tab;
    this.cat = cat;
    this.kink = jQuery.extend(true, [], kink);
    this.skill = jQuery.extend(true, {}, skill);
    this.parts = [parts[0], parts[1]];
    this.effect = jQuery.extend(true, {}, effect);
    this.sex = sex;
    this.tags = jQuery.extend(true, [], tags);
    this.req = jQuery.extend(true, [], req);
    this.forbid = jQuery.extend(true, [], forbid);
    this.special = special;
    this.condition = condition;
    if (menu) { // <<hoverrevise ${key}Lab>>
      this.button = `<button id="${key}-button" onclick="window.SugarCube.Engine.link('sex.popup(${menu})')">${label}</button>`;
    } else {
      this.button = `<button id="${key}-button" onclick="window.SugarCube.Engine.link('sex.sexAction(${key})')">${label}</button>`;
    }
    if ("object" !== typeof this.effect.wetness) {
      const x = this.effect.wetness;
      this.effect.wetness = { pcAmt: x, npcAmt: x, pcMax: 20, npcMax: 20 };
    }
    if ("object" !== typeof this.effect.arousal) {
      const x = this.effect.arousal;
      this.effect.arousal = { pcAmt: x, npcAmt: x, pcMax: 10, npcMax: 10 };
    }
    if ("object" !== typeof this.effect.pleasure) {
      const x = this.effect.pleasure;
      this.effect.pleasure = { pcAmt: x, npcAmt: x, pcMax: 120, npcMax: 120 };
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
      this.uniqueReq = function() { return true; };
    } else {
      this.uniqueReq = uniqueReq;
    }
  }
  get allowed() { // return 0:good, 1:parts, 2:gender, 3:forbid enviro, 4:missing enviro, 5:censor, 6:insufficient skill, 7:clothing
    const ᛔ = State.active.variables;
    try {
      if (!aw.sexActRef[ↂ.sex.pos][ↂ.sex.target][this.key]) {
        return 1;
      }
    } catch (e) {
      aw.con.warn(`Failure in sexact allowed - sex.valid - ${e.name}: ${e.message}`);
    }
    const sx = ↂ.sex.npc[ↂ.sex.target].main;
    if (!setup.sex.clothesBlockChecker("pc", this.parts[0])) {
      return 1;
    }
    if (!setup.sex.clothesBlockChecker(sx._k, this.parts[1])) {
      return 1;
    }
    if (setup.sexToys.check("pc", this.parts[0]) !== true) {
      return 1;
    }
    // aw.con.warn(`allowed: ${this.key}`);
    if (eval(aw.sexAct[this.key].condition()) === false) {
      return 1;
    }
    try {
      if (this.sex === 1 && !sx.male) {
        return 2;
      }
      if (this.sex === 2 && !sx.female) {
        return 2;
      }
      if (this.sex === 3 && sx.female) {
        return 2;
      }
      if (this.sex === 4 && sx.male) {
        return 2;
      }
      const sex = ↂ.sex;
      // TODO - enable selecting extra positions for group sex - check pos of target
      const blockA = aw.sexPos[sex.pos].pos[0].blocked;
      const occuA = aw.sexPos[sex.pos].pos[0].occupy;
      const blockB = aw.sexPos[sex.pos].pos[1].blocked;
      const occuB = aw.sexPos[sex.pos].pos[1].occupy;
      if (blockA.includes(this.parts[0])) {
        return 1;
      }
      if (occuA.includes(this.parts[0])) {
        return 1;
      }
      if (blockB.includes(this.parts[1])) {
        return 1;
      }
      if (occuB.includes(this.parts[1])) {
        return 1;
      }
      if (this.cat === "sex" && !aw.sexPos[sex.pos].sex) {
        return 9;
      }
      if (!this.uniqueReq()) {
        return 3;
      }
      for (let i = 0, c = this.forbid.length; i < c; i++) {
        if (this.forbid[i] !== "none" && sex.enviroTags.includes(this.forbid[i])) {
          return 3;
        }
      }
      for (let i = 0, c = this.req.length; i < c; i++) {
        if (this.req[i] !== "none" && !sex.enviroTags.includes(this.req[i])) {
          return 4;
        }
      }
      for (let i = 0, c = this.kink.length; i < c; i++) {
        if (ᛔ.censor.includes(this.kink[i])) {
          return 5;
        }
      }
      const keys = Object.keys(this.skill);
      for (let i = 0, c = keys.length; i < c; i++) {
        if (ↂ.skill[keys[i]] < this.skill[keys[i]]) {
          return 6;
        }
      }
    } catch (e) {
      aw.con.warn(`Failure in sexact allowed - base checks - ${e.name}: ${e.message}`);
    }
    return 0; // if nothing forbids the action, then it's good to go
  }
}

(function(): void {
  const act = {
    rubMaleChest: {
      name: "rub chest", // name of the action
      key: "rubMaleChest", // key of the action
      label: "Rub . Chest", // label for button/s for action
      hover: "Use your hand to rub your target's chest in a firm but sensual manner.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["hand", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 2, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 5,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 3,
          npcAmt: 1,
          npcMax: 4,
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
      sex: 3, // required sex of the target. 0: none 1: male 2: female 3: not-female 4:not male
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    squeezeBreasts: {
      name: "squeeze and heft breasts", // name of the action
      key: "squeezeBreasts", // key of the action
      label: "Rub . Breasts", // label for button/s for action
      hover: "Use your hands to squeeze and heft your target's breasts.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["hand", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 4, // actual amount
          pcMax: 20, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 15,
          npcMax: 75,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 4,
          npcAmt: 2,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 2,
          npcMax: 12,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [3, 8], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 2, // required sex of the target. 0: none 1: male 2: female 3: not-female 4:not male
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    suckNipples: {
      name: "suck nipples", // name of the action
      key: "suckNipples", // key of the action
      label: "Suck . Nipples", // label for button/s for action
      hover: "Suck on your target's nipples.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 10, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["lips", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 50, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 30,
          npcMax: 85,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 2,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          pcMax: 14,
          npcAmt: 3,
          npcMax: 16,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [8, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 2, // required sex of the target. 0: none 1: male 2: female 3: not-female 4:not male
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    cupBalls: {
      name: "cup balls", // name of the action
      key: "cupBalls", // key of the action
      label: "Cup . Balls", // label for button/s for action
      hover: "Cup and fondle the target's balls.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "balls"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 40,
          npcMax: 90,
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
          pcKink: ["pregnancy", "risky", "cumSlut"],
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
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    slowDown: {
      name: "Slow Down", // name of the action
      key: "slowDown", // key of the action
      label: "- Slow Down -", // label for button/s for action
      hover: "Decrease the movement speed of the sex you're having, or urge the NPC fucking you to decrease their speed.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 0, exhibition: 0, seduction: 20, prostitute: 0 }, // req skill to use action
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
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
      label: "+ Speed Up +", // label for button/s for action
      hover: "Increase the movement speed of the sex you're having, or urge the NPC fucking you to increase their speed.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 0, exhibition: 0, seduction: 20, prostitute: 0 }, // req skill to use action
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
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
    speedUpDouble: {
      name: "Speed Up More", // name of the action
      key: "speedUpDouble", // key of the action
      label: "++ Speed Up ++", // label for button/s for action
      hover: "Increase the movement speed of the sex you're having, or urge the NPC fucking you to increase their speed.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 30, oral: 0, exhibition: 0, seduction: 50, prostitute: 0 }, // req skill to use action
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
      special() {
        const sex = ↂ.sex;
        sex.speed += 2;
        if (sex.speed > 8) {
          sex.speed = 8;
        }
        if (sex.speed > aw.sexPos[sex.pos].speed.max) {
          sex.speed = aw.sexPos[sex.pos].speed.max;
        }
      },
    },
    askPullOut: {
      name: "Ask to Pull Out", // name of the action
      key: "askPullOut", // key of the action
      label: "Ask to Pull Out", // label for button/s for action
      hover: "Ask your partner to pull out of you before ejaculating.", // tooltip text
      tab: "speak", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 30, prostitute: 0 }, // req skill to use action
      parts: ["skip", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
      special() {
        ↂ.sex.flag.askedPullOut = true;
      },
      uniqueReq() {
        if (ↂ.sex.flag.askedPullOut) {
          return false;
        }
        return true;
      },
    },
    askCumInside: {
      name: "Ask to Cum Inside", // name of the action
      key: "askCumInside", // key of the action
      label: "Ask to Cum Inside", // label for button/s for action
      hover: "Ask your partner to cum deep inside of you.", // tooltip text
      tab: "speak", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 30, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 15,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          npcAmt: 1,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
      special() {
        ↂ.sex.flag.askedCumInside = true;
      },
      uniqueReq() {
        if (ↂ.sex.flag.askedCumInside) {
          return false;
        }
        return true;
      },
    },
    doNothing: {
      name: "do nothing", // name of the action
      key: "doNothing", // key of the action
      label: "Do Nothing", // label for button/s for action
      hover: "Imitate a sex doll, and do nothing on your own.", // tooltip text
      tab: "other", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          npcAmt: 0,
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
        satisfy: [5, 5], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
      special() {}, // TODO dead fish check
    },
    strokeCock: {
      name: "stroke cock", // name of the action
      key: "strokeCock", // key of the action
      label: "Stroke . Cock", // label for button/s for action
      hover: "Use your hand to rub your target's penis in an up-and-down motion", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 30, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 50, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 60,
          npcMax: 101,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 15,
          npcAmt: 3,
          npcMax: 20,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["cumSlut"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["pregnancy"],
          pcTrait: ["none"],
          npcKink: ["pregnancy"],
          npcTrait: ["none"],
        },
      },
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    fingerPussy: {
      name: "finger her pussy", // name of the action
      key: "fingerPussy", // key of the action
      label: "Finger . Pussy", // label for button/s for action
      hover: "Use your hand to to pleasure your target, and repeatedly insert your fingers.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 30, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "pussy"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 50, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 60,
          npcMax: 101,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 15,
          npcAmt: 3,
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
      sex: 2, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    touchCock: {
      name: "touch cock", // name of the action
      key: "touchCock", // key of the action
      label: "Touch . Cock", // label for button/s for action
      hover: "Use your hand to feel your target's cock.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 2, // actual amount
          pcMax: 50, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 10,
          npcMax: 95,
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
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    testing: {
      name: "testing", // name of the action
      key: "testing", // key of the action
      label: "testing", // label for button/s for action
      hover: "dramatically increases pleasure and wetness.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 300, // actual amount
          pcMax: 99, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 300,
          npcMax: 99,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 15,
          pcMax: 20,
          npcAmt: 15,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    playWithNipples: {
      name: "play with your nipples", // name of the action
      key: "playWithNipples", // key of the action
      label: "Play With Nipples", // label for button/s for action
      hover: "Use your hand to rub your target's chest in a firm but sensual manner.", // tooltip text
      tab: "self", // the action tab that this action belongs in.
      cat: "fap", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 25, // actual amount
          pcMax: 90, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
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
    rubOwnVulva: {
      name: "rub your own vulva", // name of the action
      key: "rubOwnVulva", // key of the action
      label: "Rub Your Vulva", // label for button/s for action
      hover: "Use your hand to rub your vulva.", // tooltip text
      tab: "self", // the action tab that this action belongs in.
      cat: "fap", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
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
          pcKink: ["fap"],
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    rubOwnClit: {
      name: "rub your clit", // name of the action
      key: "rubOwnClit", // key of the action
      label: "Rub Your Clit", // label for button/s for action
      hover: "Use your fingers to rub your clit", // tooltip text
      tab: "self", // the action tab that this action belongs in.
      cat: "fap", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
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
          pcKink: ["fap"],
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    passionateKiss: {
      name: "passionate kiss", // name of the action
      key: "passionateKiss", // key of the action
      label: "Kiss . Passionately", // label for button/s for action
      hover: "Kiss your target passionately and enthusiastically.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    sensualKiss: {
      name: "sensual kiss", // name of the action
      key: "sensualKiss", // key of the action
      label: "Kiss . Sensually", // label for button/s for action
      hover: "Kiss your target in a sensual manner.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "lips"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 2, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 2,
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
          pcMax: 12,
          npcAmt: 1,
          npcMax: 12,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["flirty"],
          npcKink: ["none"],
          npcTrait: ["flirty"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["slut"],
          pcTrait: ["none"],
          npcKink: ["slut"],
          npcTrait: ["none"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    romanticKiss: {
      name: "romantic Kiss", // name of the action
      key: "romanticKiss", // key of the action
      label: "Kiss . Romantically", // label for button/s for action
      hover: "Kiss your target in an intimate and romantic manner.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "lips"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 2, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 2,
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
          pcMax: 12,
          npcAmt: 1,
          npcMax: 12,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["romantic", "caring"],
          npcKink: ["none"],
          npcTrait: ["romantic", "caring"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["slut"],
          pcTrait: ["-romantic"],
          npcKink: ["slut"],
          npcTrait: ["-romantic"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    nibbleEar: {
      name: "nibble ear", // name of the action
      key: "nibbleEar", // key of the action
      label: "Nibble . Ear", // label for button/s for action
      hover: "Gently bite and kiss your target's ear.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 25, oral: 25, exhibition: 0, seduction: 25, prostitute: 0 }, // req skill to use action
      parts: ["lips", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 1, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 3,
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
          pcMax: 10,
          npcAmt: 2,
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
          pcKink: ["shame"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    necking: {
      name: "necking", // name of the action
      key: "necking", // key of the action
      label: "Neck .", // label for button/s for action
      hover: "kiss, lick, and maybe even bite your target's neck and upper shoulder.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 25, oral: 25, exhibition: 0, seduction: 25, prostitute: 0 }, // req skill to use action
      parts: ["lips", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 1, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 3,
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
          pcMax: 10,
          npcAmt: 2,
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
          pcKink: ["shame"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    lickCock: {
      name: "lick cock", // name of the action
      key: "lickCock", // key of the action
      label: "Lick . Cock", // label for button/s for action
      hover: "Lick your target's member like a lollipop.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 20, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 35,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          npcAmt: 3,
        },
        cum: { face: 7, mouth: 3 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["sizequeen", "cumSlut"],
          pcTrait: ["none"],
          npcKink: ["dom"],
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
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    kissCock: {
      name: "kiss cock", // name of the action
      key: "kissCock", // key of the action
      label: "Kiss . Cock", // label for button/s for action
      hover: "Plant some kisses on your target's cock, paying extra attention to the head.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 25, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 30,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          npcAmt: 3,
        },
        cum: { face: 7, mouth: 3 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["sizequeen", "cumSlut"],
          pcTrait: ["none"],
          npcKink: ["dom"],
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
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    exploreVulva: {
      name: "explore vulva with tongue", // name of the action
      key: "exploreVulva", // key of the action
      label: "Explore . Vulva", // label for button/s for action
      hover: "lick your target's vulva with your tongue, exploring her folds thoroughly.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 25, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "vulva"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 30,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          npcAmt: 3,
        },
        cum: { hair: 5, back: 5 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["sizequeen", "cumSlut"],
          pcTrait: ["none"],
          npcKink: ["dom"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      sex: 2, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    suckCockHead: {
      name: "suck on cockhead", // name of the action
      key: "suckCockHead", // key of the action
      label: "Suck . Cockhead", // label for button/s for action
      hover: "Suck on the head of your target's cock while using your tongue.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 30, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 90, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 45,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          npcAmt: 3,
        },
        cum: { face: 1, mouth: 9 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["sizequeen", "cumSlut"],
          pcTrait: ["none"],
          npcKink: ["dom"],
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
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    strokeVulvaTongue: {
      name: "stroke vulva with tongue", // name of the action
      key: "strokeVulvaTongue", // key of the action
      label: "Lick . Vulva", // label for button/s for action
      hover: "Lick your target's slit up and down with a steady pace.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 30, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "vulva"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 90, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 45,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          npcAmt: 3,
        },
        cum: { hair: 5, back: 5 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["slut"],
          pcTrait: ["none"],
          npcKink: ["dom"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      sex: 2, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    suckCockInOut: {
      name: "suck cock in and out of mouth", // name of the action
      key: "suckCockInOut", // key of the action
      label: "Suck . Cock In/Out", // label for button/s for action
      hover: "Use your mouth, sliding your target's cock in and out with a reasonably-quick pace.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 35, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 55,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          npcAmt: 3,
        },
        cum: { face: 1, mouth: 9 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["sizequeen", "cumSlut", "slut"],
          pcTrait: ["none"],
          npcKink: ["dom"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["risky", "pregnancy"],
          pcTrait: ["bitch"],
          npcKink: ["risky", "pregnancy"],
          npcTrait: ["none"],
        },
      },
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    lickClit: {
      name: "lick clit", // name of the action
      key: "lickClit", // key of the action
      label: "Lick . Clit", // label for button/s for action
      hover: "Use your tongue to stimulate your target's clit.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 40, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["lips", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 80, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 55,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 10,
          npcAmt: 3,
          npcMax: 10,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          npcAmt: 3,
        },
        cum: { hair: 5, back: 5 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["none"],
          pcTrait: ["none"],
          npcKink: ["dom"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["none"],
          pcTrait: ["bitch"],
          npcKink: ["none"],
          npcTrait: ["none"],
        },
      },
      sex: 2, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    rubAgainstTarget: {
      name: "rub body against target", // name of the action
      key: "rubAgainstTarget", // key of the action
      label: "Rub Body Against .", // label for button/s for action
      hover: "Rub your body against the target.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["skip", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 1, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 1,
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
          pcMax: 10,
          npcAmt: 1,
          npcMax: 10,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [5, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    grindVulvaAgainst: {
      name: "grind vulva against", // name of the action
      key: "grindVulvaAgainst", // key of the action
      label: "Grind Vulva Against .", // label for button/s for action
      hover: "Grind your vulva against the target to stimulate yourself.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 30, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["groin", "groin"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 20, // actual amount
          pcMax: 100, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 3,
          npcMax: 75,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 1,
          npcMax: 10,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    embrace: {
      name: "embrace", // name of the action
      key: "embrace", // key of the action
      label: "Embrace .", // label for button/s for action
      hover: "Hold your target close in a hug.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    passionateEmbrace: {
      name: "passionate embrace", // name of the action
      key: "passionateEmbrace", // key of the action
      label: "Embrace . Passionately", // label for button/s for action
      hover: "Hold your target close, squeezing tightly and pressing yourself against them.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["chest", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 3, // actual amount
          pcMax: 45, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 3,
          npcMax: 45,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    rockHips: {
      name: "rock hips", // name of the action
      key: "rockHips", // key of the action
      label: "Rock Your Hips", // label for button/s for action
      hover: "Rock your hips to increase the pleasure from getting fucked.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 30, // actual amount
          pcMax: 105, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 25,
          npcMax: 105,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 12,
          npcAmt: 2,
          npcMax: 12,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 4,
          pcMax: 20,
          npcAmt: 3,
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
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    liftLegsInAir: {
      name: "lift your legs", // name of the action
      key: "liftLegsInAir", // key of the action
      label: "Lift Your Legs", // label for button/s for action
      hover: "Spread your legs more, and lift or move them to angle your hips for deeper penetration.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 50, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 30, // actual amount
          pcMax: 105, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 25,
          npcMax: 105,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 12,
          npcAmt: 2,
          npcMax: 12,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 4,
          pcMax: 20,
          npcAmt: 3,
          npcMax: 20,
        },
        cum: { deep: 6, cervix: 4 }, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["risky", "pregnancy"],
          pcTrait: ["maternal"],
          npcKink: ["risky", "pregnancy"],
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
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
      uniqueReq() {
        if (ↂ.sex.pos === "missionary") {
          return true;
        } else {
          return false;
        }
      },
    },
    saySomethingSexy: {
      name: "say something sexy", // name of the action
      key: "saySomethingSexy", // key of the action
      label: "Say Something Sexy", // label for button/s for action
      hover: "Use your hand to rub your target's chest in a firm but sensual manner.", // tooltip text
      tab: "speak", // the action tab that this action belongs in.
      cat: "talk", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 40, prostitute: 0 }, // req skill to use action
      parts: ["skip", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 2,
          npcMax: 10,
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
          pcKink: ["slut", "liberate"],
          pcTrait: ["none"],
          npcKink: ["slut", "liberate"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["none"],
          npcKink: ["shame"],
          npcTrait: ["none"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    whisperInEar: {
      name: "whisper in ear", // name of the action
      key: "whisperInEar", // key of the action
      label: "Whisper In . Ear", // label for button/s for action
      hover: "Whisper something sexy into your target's ear.", // tooltip text
      tab: "speak", // the action tab that this action belongs in.
      cat: "talk", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 40, prostitute: 0 }, // req skill to use action
      parts: ["lips", "head"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 2,
          pcMax: 10,
          npcAmt: 2,
          npcMax: 10,
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
          pcKink: ["slut", "liberate"],
          pcTrait: ["none"],
          npcKink: ["slut", "liberate"],
          npcTrait: ["none"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["none"],
          npcKink: ["shame"],
          npcTrait: ["none"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    putOnCondom: {
      name: "put on condom", // name of the action
      key: "putOnCondom", // key of the action
      label: "Put On Condom", // label for button/s for action
      hover: "Take a condom from your inventory and put it on the target's member. <i>You can also ask the target for a condom, but they may not have one available.</i>", // tooltip text
      tab: "kink", // the action tab that this action belongs in.
      cat: "talk", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 10, prostitute: 0 }, // req skill to use action
      parts: ["skip", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: -250, // actual amount
          pcMax: 99, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: -300,
          npcMax: 99,
        },
        arousal: -2,
        wetness: -1,
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
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      menu: `<<include [[SexSceneCondomMenu]]>>`,
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
      special() {
        const ᛔ = State.active.variables;
        let condom = "default";
        if (setup.sexCondomTempType != null && setup.sexCondomTempType !== undefined) {
          condom = setup.sexCondomTempType;
          delete setup.sexCondomTempType;
        }
        const vowList = ↂ.flag.marriage.PCvows.concat(ↂ.flag.marriage.NPCvows);
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn && !ↂ.sex.npcBC[ↂ.sex.target].condom.break) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you a confused look. <span class="npc">What do you mean? I'm already wearing one...</span>`;
          return;
        } else if (vowList.includes("noCondom") || vowList.includes("noPill")) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you a concerned look. <span class="npc">Hey, we vowed to never use this kind of protection, remember?</span>`;
          return;
        } else if (ↂ.sex.flag.knowsAcid) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you a concerned look. <span class="npc">I don't think that's such a great idea with those enzymes you've got...</span>`;
          return;
        } else if (ↂ.sex.flag.askedCondom && !ↂ.sex.npcBC[ↂ.sex.target].condom.worn && condom === "default") {
          // already asked before
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you an annoyed look. <span class="npc">Why are you asking again? Didn't I say not to worry about it? I don't have one anyway.</span>`;
          return;
        }
        ↂ.sex.flag.askedCondom = true;
        // TODO change dc to be based on specific npc
        const dc = random(10, 15);
        let owned = true;
        // seduction check to see if player convinces of condom
        setup.SCXfunc();
        setup.SCfunc("SD", dc);
        // set PC portion text up
        let pout = "";
        // set NPC portion text up
        let output = ᛔ.SCtext[1] + " ";
        if (condom === "default") { // asks for condom
          // simple random to see if npc owns a condom to use.
          pout = "Realizing that you don't have a condom yourself, you're forced to ask if <<n _t 'heshe.q'>> has one. <span class='pc'>Hey, you wouldn't happen to have a condom on you, would you?</span>";
          if (condom === "default" && random(1, 4) < 3) {
            owned = false;
          }
          // if pass seduction check and npc has condom
          if (ᛔ.SCresult[1] && owned) {
            // wear condom.
            condom = either("trojancockS","trojancockUL","trojancockUL","trojancockUL","trojancockUNL","pleasureburst","trojancockUNL-Sab1","trojancockUL-Sab2");
            setup.sex.equipCondom(condom);
            output += setup.sex.library("putOnCondom", "N");
          } else if (owned) { // fail check but has condom...
            output += setup.sex.library("denyProtectionRequest", "N");
          } else {
            output += `<<n _t "heshe.q">> makes an apologetic gesture. <span class="npc">Sorry, I don't have one with me... Besides, it feels so much better raw.</span>`;
          }
        } else { // player gives condom
          const cNames = {
            duremaxT: "Duremax Safe-T",
            duremaxPE: "Duremax Safe-PE",
            trojancockS: "Trojancock Sensations",
            trojancockUL: "Trojancock Uber",
            trojancockUNL: "Trojancock Uber",
            pleasureburst: "Pleasureburst",
            "duremaxT-Sab1": "sabotaged Duremax Safe-T",
            "duremaxPE-Sab1": "sabotaged Duremax Safe-PE",
            "trojancockS-Sab1": "sabotaged Trojancock Sensations",
            "trojancockUL-Sab1": "sabotaged Trojancock Uber",
            "trojancockUNL-Sab1": "sabotaged Trojancock Uber",
            "pleasureburst-Sab1": "sabotaged Pleasureburst",
            "duremaxT-Sab2": "expertly-sabotaged Duremax Safe-T",
            "duremaxPE-Sab2": "expertly-sabotaged Duremax Safe-PE",
            "trojancockS-Sab2": "expertly-sabotaged Trojancock Sensations",
            "trojancockUL-Sab2": "expertly-sabotaged Trojancock Uber",
            "trojancockUNL-Sab2": "expertly-sabotaged Trojancock Uber",
            "pleasureburst-Sab2": "expertly-sabotaged Pleasureburst",
          };
          if (ᛔ.SCresult[1]) {
            pout = `Grabbing a ${cNames[condom]} with one hand, you deftly tear open the foil wrapper and pull out the condom inside. `;
            pout += either(`Placing the condom between your lips, you align your face with ${ↂ.T.main.name}'s <<n _t 'cock.q'>> <<n _t 'cock.n'>>. You carefully catch <<n _t 'hisher.q'>> <<n _t 'cockhead.n'>> with the condom, and then slide it into your mouth. You take it as deep as you can, your lips unrolling the condom as you go. Your objective accomplished, you release <<n _t 'hisher.q'>> <<n _t 'cock.n'>>.`, `Grasping ${ↂ.T.main.name}'s <<n _t 'cock.n'>> with one hand, you give it a few sensual strokes before placing the condom on <<n _t 'hisher.q'>> <<n _t 'cockhead.n'>>. You continue your stroking motion, gently rolling the condom down <<n _t 'hisher.q'>> <<n _t 'cocklength.q'>> shaft.`);
            setup.sex.equipCondom(condom);
            output += `${ↂ.T.main.name} looks down at <<n _t "hisher.q">> newly-wrapped <<n _t "cock.n">>. <span class="npc">`;
            output += either("I guess I can wear one this time.", "These things kill the sensation, but I guess it's fine...", "Better safe than sorry, I guess.", "Hey, you're pretty good at that!", "If you want one, I guess I have no choice...");
            output += "</span>";
          } else {
            pout = `Fumbling until you find a ${cNames[condom]}, you toss it at ${ↂ.T.main.name}. <span class="pc">Hey, put that on.</span>`;
            output += setup.sex.library("denyProtectionRequest", "N");
          }
        }
        ↂ.sex.encounter[0] = pout;
        ↂ.sex.encounter[1] = output;
        setup.SCXfunc();
      }, // special function to be run when action is taken.
    },
    giveCondom: {
      name: "Give Condom", // name of the action
      key: "giveCondom", // key of the action
      label: "Give Condom", // label for button/s for action
      hover: "Take a condom from your inventory and put it on the target's member. <i>You can also ask the target for a condom, but they may not have one available.</i>", // tooltip text
      tab: "none", // the action tab that this action belongs in.
      cat: "talk", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["skip", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: -250, // actual amount
          pcMax: 99, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: -300,
          npcMax: 99,
        },
        arousal: -2,
        wetness: -1,
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
      sex: 1, // required sex of the target. 0: none 1: male 2: female
      menu: false,
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return false; },
      special() {
        const ᛔ = State.active.variables;
        let condom = "default";
        if (setup.sexCondomTempType != null && setup.sexCondomTempType !== undefined) {
          condom = setup.sexCondomTempType;
          delete setup.sexCondomTempType;
        }
        const vowList = ↂ.flag.marriage.PCvows.concat(ↂ.flag.marriage.NPCvows);
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn && !ↂ.sex.npcBC[ↂ.sex.target].condom.break) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you a confused look. <span class="npc">What do you mean? I'm already wearing one...</span>`;
          return;
        } else if (vowList.includes("noCondom") || vowList.includes("noPill")) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you a concerned look. <span class="npc">Hey, we vowed to never use this kind of protection, remember?</span>`;
          return;
        } else if (ↂ.sex.flag.knowsAcid) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you a concerned look. <span class="npc">I don't think that's such a great idea with those enzymes you've got...</span>`;
          return;
        } else if (ↂ.sex.flag.askedCondom && !ↂ.sex.npcBC[ↂ.sex.target].condom.worn && condom === "default") {
          // already asked before
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you an annoyed look. <span class="npc">Why are you asking again? Didn't I say not to worry about it?</span> With a quick flip of the wrist, the condom you offered goes flying away.`;
          return;
        }
        ↂ.sex.flag.askedCondom = true;
        // TODO change dc to be based on specific npc
        const dc = random(10, 15);
        let owned = true;
        // seduction check to see if player convinces of condom
        setup.SCXfunc();
        setup.SCfunc("SD", dc);
        // set PC portion text up
        let pout = "";
        // set NPC portion text up
        let output = ᛔ.SCtext[1] + " ";
        // player gives condom
        const cNames = {
          duremaxT: "Duremax Safe-T",
          duremaxPE: "Duremax Safe-PE",
          trojancockS: "Trojancock Sensations",
          trojancockUL: "Trojancock Uber",
          trojancockUNL: "Trojancock Uber",
          pleasureburst: "Pleasureburst",
          "duremaxT-Sab1": "sabotaged Duremax Safe-T",
          "duremaxPE-Sab1": "sabotaged Duremax Safe-PE",
          "trojancockS-Sab1": "sabotaged Trojancock Sensations",
          "trojancockUL-Sab1": "sabotaged Trojancock Uber",
          "trojancockUNL-Sab1": "sabotaged Trojancock Uber",
          "pleasureburst-Sab1": "sabotaged Pleasureburst",
          "duremaxT-Sab2": "expertly-sabotaged Duremax Safe-T",
          "duremaxPE-Sab2": "expertly-sabotaged Duremax Safe-PE",
          "trojancockS-Sab2": "expertly-sabotaged Trojancock Sensations",
          "trojancockUL-Sab2": "expertly-sabotaged Trojancock Uber",
          "trojancockUNL-Sab2": "expertly-sabotaged Trojancock Uber",
          "pleasureburst-Sab2": "expertly-sabotaged Pleasureburst",
        };
          if (ᛔ.SCresult[1]) {
            pout = `Grabbing a ${cNames[condom]} with one hand, you deftly tear open the foil wrapper and pull out the condom inside. `;
            pout += either(`Placing the condom between your lips, you align your face with ${ↂ.T.main.name}'s <<n _t 'cock.q'>> <<n _t 'cock.n'>>. You carefully catch <<n _t 'hisher.q'>> <<n _t 'cockhead.n'>> with the condom, and then slide it into your mouth. You take it as deep as you can, your lips unrolling the condom as you go. Your objective accomplished, you release <<n _t 'hisher.q'>> <<n _t 'cock.n'>>.", "Grasping ${ↂ.T.main.name}'s <<n _t 'cock.n'>> with one hand, you give it a few sensual strokes before placing the condom on <<n _t 'hisher.q'>> <<n _t 'cockhead.n'>>. You continue your stroking motion, gently rolling the condom down <<n _t 'hisher.q'>> <<n _t 'cocklength.q'>> shaft.`);
            setup.sex.equipCondom(condom);
            output += `${ↂ.T.main.name} looks down at <<n _t "hisher.q">> newly-wrapped <<n _t "cock.n">>. <span class="npc">`;
            output += either("I guess I can wear one this time.", "These things kill the sensation, but I guess it's fine...", "Better safe than sorry, I guess.", "Hey, you're pretty good at that!", "If you want one, I guess I have no choice...");
            output += "</span>";
          } else {
            pout = `Fumbling until you find a ${cNames[condom]}, you toss it at ${ↂ.T.main.name}. <span class="pc">Hey, put that on.</span>`;
            output += setup.sex.library("denyProtectionRequest", "N");
          }
        ↂ.sex.encounter[0] = pout;
        ↂ.sex.encounter[1] = output;
        setup.SCXfunc();
      }, // special function to be run when action is taken.
    },
    pullOffCondom: {
      name: "pull off condom", // name of the action
      key: "pullOffCondom", // key of the action
      label: "Pull Off . Condom", // label for button/s for action
      hover: "Try to take off your target's condom, or at least damage it a little.", // tooltip text
      tab: "kink", // the action tab that this action belongs in.
      cat: "other", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 20, oral: 0, exhibition: 0, seduction: 45, prostitute: 0 }, // req skill to use action
      parts: ["skip", "cock"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 50, // actual amount
          pcMax: 98, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 10,
          npcMax: 98,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 4,
          pcMax: 12,
          npcAmt: 3,
          npcMax: 12,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 5,
          pcMax: 20,
          npcAmt: 3,
          npcMax: 20,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [10, 10], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
      uniqueReq() {
        if (!ↂ.sex.npcBC[ↂ.sex.target].condom.worn) {
          return false;
        }
        if (ↂ.sex.flag.triedRemoveCondom === true) {
          return false;
        }
        return true;
      },
      special() {
        ↂ.sex.flag.triedRemoveCondom = true;
        if (random(1, 3) > 2 || ↂ.sex.flag.askedCondom) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} lets you take off the condom. <span class="npc">I guess it'll be fine without one, right?</span>`;
          ↂ.sex.npcBC[ↂ.sex.target].condom.worn = false;
          ↂ.sex.npcBC[ↂ.sex.target].condom.break = false;
          ↂ.sex.npcBC[ↂ.sex.target].condom.health = 0;
          ↂ.sex.npcBC[ↂ.sex.target].condom.sabo = 0;
          ↂ.sex.npcBC[ↂ.sex.target].condom.effect = 0;
        } else {
          ↂ.sex.encounter[1] = setup.sex.library("refuseCondomRemoval", "N");
          ↂ.sex.npcBC[ↂ.sex.target].condom.sabo += 1;
        }
      }, // special function to be run when action is taken.
    },
    removeOwnTop: {
      name: "remove own top", // name of the action
      key: "removeOwnTop", // key of the action
      label: "Remove Your Top", // label for button/s for action
      hover: "Remove your upper clothes", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.pc.clothes.worn.top = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.pc.clothes.worn.top === "off" || ↂ.pc.clothes.worn.top === 0) {
          return false;
        } else {
          return true;
        }
      },
    },
    removeOwnBra: {
      name: "remove own bra", // name of the action
      key: "removeOwnBra", // key of the action
      label: "Remove Your Bra", // label for button/s for action
      hover: "Remove your bra.", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.pc.clothes.worn.bra = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.pc.clothes.worn.bra === "off" || ↂ.pc.clothes.worn.bra === 0 || (ↂ.pc.clothes.worn.top === "normal" && typeof(ↂ.pc.clothes.worn.top) === "string")) {
          return false;
        } else {
          return true;
        }
      },
    },
    removeOwnBottom: {
      name: "remove own bottom", // name of the action
      key: "removeOwnBottom", // key of the action
      label: "Remove Your Bottom", // label for button/s for action
      hover: "Remove your bottom clothes.", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.pc.clothes.worn.bottom = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.pc.clothes.worn.bottom === "off" || ↂ.pc.clothes.worn.bottom === 0) {
          return false;
        } else {
          return true;
        }
      },
    },
    removeOwnPanties: {
      name: "remove own panties", // name of the action
      key: "removeOwnPanties", // key of the action
      label: "Remove Your Panties", // label for button/s for action
      hover: "Get rid of this pesky thing that gets in the way of the fun.", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.pc.clothes.worn.panties = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.pc.clothes.worn.panties === "off" || ↂ.pc.clothes.worn.panties === 0 || (ↂ.pc.clothes.worn.bottom === "normal" && typeof(ↂ.pc.clothes.worn.bottom) === "string")) {
          return false;
        } else {
          return true;
        }
      },
    },
    removeTargetTop: {
      name: "remove target top", // name of the action
      key: "removeTargetTop", // key of the action
      label: "Remove . Top", // label for button/s for action
      hover: "Remove the top of your sex partner.", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.T.clothes.worn.top = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.T.clothes.worn.top === "off" || ↂ.T.clothes.worn.top === false) {
          return false;
        } else {
          return true;
        }
      },
    },
    removeTargetBra: {
      name: "remove target bra", // name of the action
      key: "removeTargetBra", // key of the action
      label: "Remove . Bra", // label for button/s for action
      hover: "Remove the bra of your sex partner.", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.T.clothes.worn.bra = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.T.clothes.worn.bra === "off" || ↂ.T.clothes.worn.bra === false || (ↂ.T.clothes.worn.top === "normal" && typeof(ↂ.T.clothes.outfits.casual.top) === "string")) {
          return false;
        } else {
          return true;
        }
      },
    },
    removeTargetBottom: {
      name: "remove target bottom", // name of the action
      key: "removeTargetBottom", // key of the action
      label: "Remove . Bottom", // label for button/s for action
      hover: "Remove the bottom clothes of your sex partner.", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.T.clothes.worn.bottom = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.T.clothes.worn.bottom === "off" || ↂ.T.clothes.worn.bottom === false) {
          return false;
        } else {
          return true;
        }
      },
    },
    removeTargetPanties: {
      name: "remove target underwear", // name of the action
      key: "removeTargetPanties", // key of the action
      label: "Remove . Underwear", // label for button/s for action
      hover: "Remove the underwear of your sex partner.", // tooltip text
      tab: "item", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 6,
          npcAmt: 1,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 1,
          npcMax: 8,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [2, 2], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {
        ↂ.T.clothes.worn.panties = "off";
      }, // special function to be run when action is taken.
      condition() {
        if (ↂ.T.clothes.worn.panties === "off" || ↂ.T.clothes.worn.panties === false || (ↂ.T.clothes.worn.bottom === "normal" && typeof(ↂ.T.clothes.outfits.casual.bottom) === "string")) {
          return false;
        } else {
          return true;
        }
      },
    },
    slapFace: {
      name: "slap face with your hand", // name of the action
      key: "slapFace", // key of the action
      label: "Slap . Face", // label for button/s for action
      hover: "Use your hand to slap your target's cheek.", // tooltip text
      tab: "kink", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["bdsm", "domsub", "impact", "sadomasochism", "rough", "pain", "masochist", "sadist", "angry"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 20, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "face"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 25, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 5,
          npcMax: 60,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 4,
          npcAmt: 2,
          npcMax: 6,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 2,
          npcMax: 12,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["dom"],
          pcTrait: ["bitch", "crude"],
          npcKink: ["sub", "masochist", "hyperSlut"],
          npcTrait: ["lowEsteem"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["friendly", "romantic"],
          npcKink: ["none"],
          npcTrait: ["romantic"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female 3: not-female 4:not male
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["dom"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() {
        if (ↂ.pc.kink.dom || ↂ.pc.status.anger > 5) {
          return true;
        } else {
          return false;
        }
      },
      special() {
        let out = "error";
        if (ↂ.sex.npc[ↂ.sex.target].kink.sub || ↂ.sex.npc[ↂ.sex.target].kink.masochist) {
          out = either(`${ↂ.T.main.name} slowly turns <<n _t 'hisher.q'>> head back looking down and biting <<n _t 'hisher.q'>> lip obviously aroused.`, `${ↂ.T.main.name} sobs dealing with the pain and humiliation but seems to be eager to continue.`);
        } else if (ↂ.sex.npc[ↂ.sex.target].kink.slut) {
          out = `${ↂ.T.main.name} eagerly turns <<n _t 'hisher.q'>> head back ogling you with lust. <span class="npc">Yeah, bitch, fuck me!</span>`;
        } else {
          out = either(`${ↂ.T.main.name} winces and it seems <<n _t "heshe.q">> doesn't like such treatment.`, `${ↂ.T.main.name} shakes and makes an angry face. <span class="npc">Shit, are you mad? Behave yourself, you animal!</span>`);
        }
        ↂ.sex.encounter[1] = out;
      }, // special function to be run when action is taken.
    },
    spankButt: {
      name: "spank butt with your hand", // name of the action
      key: "spankAss", // key of the action
      label: "Spank . Butt", // label for button/s for action
      hover: "Use your hand to spank your target's bottom.", // tooltip text
      tab: "kink", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["bdsm", "domsub", "impact", "sadomasochism", "pain", "masochist", "sadist"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 15, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "butt"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 5, // actual amount
          pcMax: 35, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 10,
          npcMax: 70,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 4,
          npcAmt: 4,
          npcMax: 8,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 1,
          pcMax: 8,
          npcAmt: 4,
          npcMax: 18,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["dom"],
          pcTrait: ["bitch"],
          npcKink: ["sub", "masochist", "slut"],
          npcTrait: ["lowEsteem"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["friendly", "romantic"],
          npcKink: ["none"],
          npcTrait: ["romantic"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female 3: not-female 4:not male
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["dom"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() {
        if (ↂ.pc.kink.dom || ↂ.pc.status.anger > 5) {
          return true;
        } else {
          return false;
        }
      },
      special() {
        let out = "error";
        if (ↂ.sex.npc[ↂ.sex.target].kink.sub || ↂ.sex.npc[ↂ.sex.target].kink.masochist) {
          out = `${ↂ.T.main.name} is almost crying but seems to take the treatment like a champ.`;
        } else {
          out = `${ↂ.T.main.name} winces and it seems <<n _t "heshe.q">> doesn't like it much.`;
        }
        ↂ.sex.encounter[1] = out;
      }, // special function to be run when action is taken.
    },
    pinchNipples: {
      name: "pinch and squeeze nipples", // name of the action
      key: "pinchNipples", // key of the action
      label: "Pinch . Nipples", // label for button/s for action
      hover: "Inflict pain on target's nipples with your fingers.", // tooltip text
      tab: "kink", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["bdsm", "domsub", "sadomasochism", "pain", "masochist", "sadist"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 20, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "chest"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 15, // actual amount
          pcMax: 40, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 100,
        },
        arousal: { // arousal gain from action (base)
          pcAmt: 1,
          pcMax: 5,
          npcAmt: 1,
          npcMax: 7,
        },
        wetness: { // amount of wetness to increase
          pcAmt: 2,
          npcAmt: 1,
        },
        cum: false, // can override cum destination from position. Needs Object if override!
        satisfy: [1, 1], // modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc,npc]
        strong: { // list of traits/kinks that this action is strong for
          pcKink: ["dom"],
          pcTrait: ["bitch"],
          npcKink: ["sub", "masochist", "slut"],
          npcTrait: ["lowEsteem"],
        },
        weak: { // list of traits/kinks that decrease effect/weak for.
          pcKink: ["shame"],
          pcTrait: ["friendly", "romantic"],
          npcKink: ["none"],
          npcTrait: ["romantic"],
        },
      },
      sex: 0, // required sex of the target. 0: none 1: male 2: female 3: not-female 4:not male
      menu: false, // menu option - has dialog() text if a popup menu is necessary
      tags: ["dom"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() {
        if (ↂ.pc.kink.dom || ↂ.pc.status.anger > 5) {
          return true;
        } else {
          return false;
        }
       },
      special() {
        let out = "error";
        if (ↂ.sex.npc[ↂ.sex.target].kink.sub || ↂ.sex.npc[ↂ.sex.target].kink.masochist) {
          out = `${ↂ.T.main.name} pants heavily trying to deal with the pain, <<n _t "heshe.q">> areolas are red from the harsh treatment.`;
        } else {
          out = `${ↂ.T.main.name} winces and it seems <<n _t "heshe.q">> doesn't like it much.`;
        }
        ↂ.sex.encounter[1] = out;
      }, // special function to be run when action is taken.
    },
    stopHavingSex: {
      name: "stop making out", // name of the action
      key: "stopHavingSex", // key of the action
      label: "Stop Making Out", // label for button/s for action
      hover: "Stop having sex.", // tooltip text
      tab: "other", // the action tab that this action belongs in.
      cat: "other", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: 0,
        wetness: 0,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: "<<include [[SexEarlyEscapeMenu]]>>", // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      special() {}, // special function to be run when action is taken.
      condition() { return true; },
    },
    thatsEnough: {
      name: "that's enough", // name of the action
      key: "thatsEnough", // key of the action
      label: "That's Enough", // label for button/s for action
      hover: "Both of you have cum enough, go ahead and end the sex scene", // tooltip text
      tab: "other", // the action tab that this action belongs in.
      cat: "other", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: { sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0 }, // req skill to use action
      parts: ["hand", "skip"], // the used parts - 0: player 1: target
      effect: { // the effect information for the action
        pleasure: { // pleasure (prog to orgasm) given by action
          pcAmt: 0, // actual amount
          pcMax: 10, // max allowed percent  - won't increase pleasure above that point.
          npcAmt: 0,
          npcMax: 25,
        },
        arousal: 0,
        wetness: 0,
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
      sex: 0, // required sex of the target. 0: none 1: male 2: female
      menu: "", // menu option - has dialog() text if a popup menu is necessary
      tags: ["none"], // special tags for action, mainly for unique kink effects
      req: ["none"], // required environmental tags
      forbid: ["none"], // forbidden environmental tags
      condition() { return true; },
      special() {
        setup.sex.close();
      },
      uniqueReq() {
        if (ↂ.sex.orgCountNPC[0] > 0 && ↂ.sex.orgCountPC > 0 && ↂ.sex.maleCount === 0) {
          return true;
        }
        return false;
      },
    },
  };
  const keys = Object.keys(act);
  let cnt = 0;
  for (let i = 0, c = keys.length; i < c; i++) {
    aw.sexAct[keys[i]] = new SexAct(act[keys[i]]);
    cnt++;
  }
  setup.sex.sexActList = Object.keys(aw.sexAct);
  aw.con.info(`${cnt} sex actions loaded.`);
})();


