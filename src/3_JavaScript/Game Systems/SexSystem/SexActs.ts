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
      loc; //required location tags like furnature
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
  public button: string;
  public uniqueReq: () => void | boolean;
  constructor({name, key, label, hover, tab, cat, kink, skill, parts, effect, sex, menu, tags, req, forbid, special, uniqueReq = "none"}: {
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
    menu: false|string,
    req: string[],
    forbid: string[],
    special: (() => void),
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
    if (menu) { // <<hoverrevise ${key}Lab>>
      this.button = `<button id="${key}-button" onclick="window.SugarCube.Engine.link('dialog(${name},${menu})')">${label}</button>`;
    } else {
      this.button = `<button id="${key}-button" onclick="window.SugarCube.Engine.link('sex.sexAction(${key})')">${label}</button>`;
    }
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
      if (!aw.sexActRef[ↂ.sex.pos][ↂ.sex.target][this.key]) {
        return 1;
      }
    } catch (e) {
      aw.con.warn(`Failure in sexact allowed - sex.valid - ${e.name}: ${e.message}`);
    }
    const sx = ↂ.sex.npc[ↂ.sex.target].main;
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
      skill: {sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
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
    },
    squeezeBreasts: {
      name: "squeeze and heft breasts", // name of the action
      key: "squeezeBreasts", // key of the action
      label: "Rub . Breasts", // label for button/s for action
      hover: "Use your hands to squeeze and heft your target's breasts.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
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
    },
    suckNipples: {
      name: "suck nipples", // name of the action
      key: "suckNipples", // key of the action
      label: "Suck . Nipples", // label for button/s for action
      hover: "Suck on your target's nipples.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 10, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
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
    },
    cupBalls: {
      name: "cup balls", // name of the action
      key: "cupBalls", // key of the action
      label: "Cup . Balls", // label for button/s for action
      hover: "Cup and fondle the target's balls.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    slowDown: {
      name: "Slow Down", // name of the action
      key: "slowDown", // key of the action
      label: "- Slow Down -", // label for button/s for action
      hover: "Decrease the movement speed of the sex you're having, or urge the NPC fucking you to decrease their speed.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 0, exhibition: 0, seduction: 20, prostitute: 0}, // req skill to use action
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
      skill: {sex: 10, oral: 0, exhibition: 0, seduction: 20, prostitute: 0}, // req skill to use action
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
      skill: {sex: 30, oral: 0, exhibition: 0, seduction: 50, prostitute: 0}, // req skill to use action
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
    doNothing: {
      name: "do nothing", // name of the action
      key: "doNothing", // key of the action
      label: "Do Nothing", // label for button/s for action
      hover: "Imitate a sex doll, and do nothing on your own.", // tooltip text
      tab: "other", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
      skill: {sex: 0, oral: 30, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    fingerPussy: {
      name: "finger her pussy", // name of the action
      key: "fingerPussy", // key of the action
      label: "Finger . Pussy", // label for button/s for action
      hover: "Use your hand to to pleasure your target, and repeatedly insert your fingers.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 30, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    touchCock: {
      name: "touch cock", // name of the action
      key: "touchCock", // key of the action
      label: "Touch . Cock", // label for button/s for action
      hover: "Use your hand to feel your target's cock.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    testing: {
      name: "testing", // name of the action
      key: "testing", // key of the action
      label: "testing", // label for button/s for action
      hover: "dramatically increases pleasure and wetness.", // tooltip text
      tab: "touch", // the action tab that this action belongs in.
      cat: "handjob", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    playWithNipples: {
      name: "play with your nipples", // name of the action
      key: "playWithNipples", // key of the action
      label: "Play With Nipples", // label for button/s for action
      hover: "Use your hand to rub your target's chest in a firm but sensual manner.", // tooltip text
      tab: "self", // the action tab that this action belongs in.
      cat: "fap", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    rubOwnClit: {
      name: "rub your clit", // name of the action
      key: "rubOwnClit", // key of the action
      label: "Rub Your Clit", // label for button/s for action
      hover: "Use your fingers to rub your clit", // tooltip text
      tab: "self", // the action tab that this action belongs in.
      cat: "fap", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    passionateKiss: {
      name: "passionate kiss", // name of the action
      key: "passionateKiss", // key of the action
      label: "Kiss . Passionately", // label for button/s for action
      hover: "Kiss your target passionately and enthusiastically.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "kiss", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    sensualKiss: {
      name: "sensual kiss", // name of the action
      key: "sensualKiss", // key of the action
      label: "Kiss . Sensually", // label for button/s for action
      hover: "Use your hand to rub your target's chest in a firm but sensual manner.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "kiss", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    romanticKiss: {
      name: "romantic Kiss", // name of the action
      key: "romanticKiss", // key of the action
      label: "Kiss . Romantically", // label for button/s for action
      hover: "Kiss your target in an intimate and romantic manner.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "kiss", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    nibbleEar: {
      name: "nibble ear", // name of the action
      key: "nibbleEar", // key of the action
      label: "Nibble . Ear", // label for button/s for action
      hover: "Gently bite and kiss your target's ear.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 25, oral: 25, exhibition: 0, seduction: 25, prostitute: 0}, // req skill to use action
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
    },
    necking: {
      name: "necking", // name of the action
      key: "necking", // key of the action
      label: "Neck .", // label for button/s for action
      hover: "kiss, lick, and maybe even bite your target's neck and upper shoulder.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 25, oral: 25, exhibition: 0, seduction: 25, prostitute: 0}, // req skill to use action
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
    },
    lickCock: {
      name: "lick cock", // name of the action
      key: "lickCock", // key of the action
      label: "Lick . Cock", // label for button/s for action
      hover: "Lick your target's member like a lollipop.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 20, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
        cum: {face: 7, mouth: 3}, // can override cum destination from position. Needs Object if override!
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
    },
    kissCock: {
      name: "kiss cock", // name of the action
      key: "kissCock", // key of the action
      label: "Kiss . Cock", // label for button/s for action
      hover: "Plant some kisses on your target's cock, paying extra attention to the head.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 25, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
        cum: {face: 7, mouth: 3}, // can override cum destination from position. Needs Object if override!
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
    },
    exploreVulva: {
      name: "explore vulva with tongue", // name of the action
      key: "exploreVulva", // key of the action
      label: "Explore . Vulva", // label for button/s for action
      hover: "lick your target's vulva with your tongue, exploring her folds thoroughly.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 25, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
        cum: {hair: 5, back: 5}, // can override cum destination from position. Needs Object if override!
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
    },
    suckCockHead: {
      name: "suck on cockhead", // name of the action
      key: "suckCockHead", // key of the action
      label: "Suck . Cockhead", // label for button/s for action
      hover: "Suck on the head of your target's cock while using your tongue.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 30, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
        cum: {face: 1, mouth: 9}, // can override cum destination from position. Needs Object if override!
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
    },
    strokeVulvaTongue: {
      name: "stroke vulva with tongue", // name of the action
      key: "strokeVulvaTongue", // key of the action
      label: "Lick . Vulva", // label for button/s for action
      hover: "Lick your target's slit up and down with a steady pace.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 30, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
        cum: {hair: 5, back: 5}, // can override cum destination from position. Needs Object if override!
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
    },
    suckCockInOut: {
      name: "suck cock in and out of mouth", // name of the action
      key: "suckCockInOut", // key of the action
      label: "Suck . Cock In/Out", // label for button/s for action
      hover: "Use your mouth, sliding your target's cock in and out with a reasonably-quick pace.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 35, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
        cum: {face: 1, mouth: 9}, // can override cum destination from position. Needs Object if override!
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
    },
    lickClit: {
      name: "lick clit", // name of the action
      key: "lickClit", // key of the action
      label: "Lick . Clit", // label for button/s for action
      hover: "Use your tongue to stimulate your target's clit.", // tooltip text
      tab: "kiss", // the action tab that this action belongs in.
      cat: "oral", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 40, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
        cum: {hair: 5, back: 5}, // can override cum destination from position. Needs Object if override!
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
    },
    rubAgainstTarget: {
      name: "rub body against target", // name of the action
      key: "rubAgainstTarget", // key of the action
      label: "Rub Body Against .", // label for button/s for action
      hover: "Rub your body against the target.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
      parts: ["hand", "chest"], // the used parts - 0: player 1: target
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
    },
    grindVulvaAgainst: {
      name: "grind vulva against", // name of the action
      key: "grindVulvaAgainst", // key of the action
      label: "Grind Vulva Against .", // label for button/s for action
      hover: "Grind your vulva against the target to stimulate yourself.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 30, oral: 0, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
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
    },
    embrace: {
      name: "embrace", // name of the action
      key: "embrace", // key of the action
      label: "Embrace .", // label for button/s for action
      hover: "Hold your target close in a hug.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
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
    },
    passionateEmbrace: {
      name: "passionate embrace", // name of the action
      key: "passionateEmbrace", // key of the action
      label: "Embrace . Passionately", // label for button/s for action
      hover: "Hold your target close, squeezing tightly and pressing yourself against them.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "makeout", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 10, oral: 0, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
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
    },
    rockHips: {
      name: "rock hips", // name of the action
      key: "rockHips", // key of the action
      label: "Rock Your Hips", // label for button/s for action
      hover: "Rock your hips to increase the pleasure from getting fucked.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
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
    },
    liftLegsInAir: {
      name: "lift your legs", // name of the action
      key: "liftLegsInAir", // key of the action
      label: "Lift Your Legs", // label for button/s for action
      hover: "Spread your legs more, and lift or move them to angle your hips for deeper penetration.", // tooltip text
      tab: "move", // the action tab that this action belongs in.
      cat: "sex", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 50, oral: 0, exhibition: 0, seduction: 10, prostitute: 0}, // req skill to use action
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
        cum: {deep: 6, cervix: 4}, // can override cum destination from position. Needs Object if override!
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
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 40, prostitute: 0}, // req skill to use action
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
    },
    whisperInEar: {
      name: "whisper in ear", // name of the action
      key: "whisperInEar", // key of the action
      label: "Whisper In . Ear", // label for button/s for action
      hover: "Whisper something sexy into your target's ear.", // tooltip text
      tab: "speak", // the action tab that this action belongs in.
      cat: "talk", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 40, prostitute: 0}, // req skill to use action
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
    },
    requestCondom: {
      name: "request condom", // name of the action
      key: "requestCondom", // key of the action
      label: "Request Condom", // label for button/s for action
      hover: "Ask your target to put on a condom. If you wish to supply a condom, do so from the inventory tab. This action asks the target to wear a condom they have, and they will not wear a condom if they do not have one.", // tooltip text
      tab: "speak", // the action tab that this action belongs in.
      cat: "talk", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 20, prostitute: 0}, // req skill to use action
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
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
      special() {
        const ᛔ = State.active.variables;
        let condom = "default";
        if (setup.sexCondomTempType != null && setup.sexCondomTempType !== undefined) {
          condom = setup.sexCondomTempType;
          delete setup.sexCondomTempType;
        }
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn && !ↂ.sex.npcBC[ↂ.sex.target].condom.break) {
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you a confused look. <span class="npc">What do you mean? I'm already wearing one...</span>`;
          return;
        } else if (ↂ.sex.flag.askedCondom && !ↂ.sex.npcBC[ↂ.sex.target].condom.worn && condom === "default") {
          // already asked before
          ↂ.sex.encounter[1] = `${ↂ.T.main.name} gives you an annoyed look. <span class="npc">Why are you asking again? Didn't I say not to worry about it? I don't have one anyway.</span>`;
          return;
        }
        ↂ.sex.flag.askedCondom = true;
        const dc = random(12, 15);
        let owned = true;
        setup.SCfunc("SD", dc);
        let output = ᛔ.SCtext[0] + " ";
        if (condom === "default" && random(1, 3) < 3) {
          owned = false;
        }
        if (ᛔ.SCresult[0] && owned) {
          // wear condom.
          if (condom === "default") { condom = "trojancockUL"; }
          setup.sex.equipCondom(condom);
          output += setup.sex.library("putOnCondom", "N");
        } else {
          output += setup.sex.library("denyProtectionRequest", "N");
        }
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
      skill: {sex: 20, oral: 0, exhibition: 0, seduction: 45, prostitute: 0}, // req skill to use action
      parts: ["hand", "cock"], // the used parts - 0: player 1: target
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
      uniqueReq() {
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn) {
          return true;
        } else {
          return false;
        }
      },
      special() {
        if (random(1, 3) === 1) {
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
    removeOwnClothing: {
      name: "remove your clothing", // name of the action
      key: "removeOwnClothing", // key of the action
      label: "Remove Your Clothing", // label for button/s for action
      hover: "<span class='import'>[not implemented]</span> There's text here to read, but clothing still needs work before this action is implemented properly.", // tooltip text
      tab: "other", // the action tab that this action belongs in.
      cat: "other", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
      parts: ["skip", "chest"], // the used parts - 0: player 1: target
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
      special() {}, // special function to be run when action is taken.
    },
    removeTargetClothing: {
      name: "remove target clothing", // name of the action
      key: "removeTargetClothing", // key of the action
      label: "Remove . Clothing", // label for button/s for action
      hover: "<span class='import'>[not implemented]</span> There's text here to read, but clothing still needs work before this action is implemented properly.", // tooltip text
      tab: "other", // the action tab that this action belongs in.
      cat: "other", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
      parts: ["hand", "chest"], // the used parts - 0: player 1: target
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
      special() {}, // special function to be run when action is taken.
    },
    stopHavingSex: {
      name: "stop making out", // name of the action
      key: "stopHavingSex", // key of the action
      label: "Stop Making Out", // label for button/s for action
      hover: "Stop having sex.", // tooltip text
      tab: "other", // the action tab that this action belongs in.
      cat: "other", // category of the action ex: makeout sex oral handjob anal
      kink: ["none"], // any kinks action contains/implies for censorship purposes
      skill: {sex: 0, oral: 0, exhibition: 0, seduction: 0, prostitute: 0}, // req skill to use action
      parts: ["hand", "chest"], // the used parts - 0: player 1: target
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
    },
  };
  const keys = Object.keys(act);
  let cnt = 0;
  for (let i = 0, c = keys.length; i < c; i++) {
    aw.sexAct[keys[i]] = new SexAct(act[keys[i]]);
    cnt ++;
  }
  setup.sex.sexActList = Object.keys(aw.sexAct);
  aw.con.info(`${cnt} sex actions loaded.`);
})();


