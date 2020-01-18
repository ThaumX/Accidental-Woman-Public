/*
███████╗███████╗██╗  ██╗    ██████╗  ██████╗ ███████╗
██╔════╝██╔════╝╚██╗██╔╝    ██╔══██╗██╔═══██╗██╔════╝
███████╗█████╗   ╚███╔╝     ██████╔╝██║   ██║███████╗
╚════██║██╔══╝   ██╔██╗     ██╔═══╝ ██║   ██║╚════██║
███████║███████╗██╔╝ ██╗    ██║     ╚██████╔╝███████║
╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝      ╚═════╝ ╚══════╝
*/


if (aw.sexPos === null || aw.sexPos === undefined) {
  aw.sexPos = {};
}
if (setup.sex === null || setup.sex === undefined) {
  setup.sex = {} as setupSex;
}
// ❣⚹
interface Ipos {
  head: [number, number, number, string];
  chest: [number, number, number, string];
  belly: [number, number, number, string];
  groin: [number, number, number, string];
  kneeR: false | [number, number, number, string];
  kneeL: false | [number, number, number, string];
  footR: false | [number, number, number, string];
  footL: false | [number, number, number, string];
  handR: false | [number, number, number, string];
  handL: false | [number, number, number, string];
  blocked: posBodyPart[];
  occupy: posBodyPart[];
  sex: sexGenderNumber; // required gender 0:none 1:male 2:female (requires parts, so 1 can be futa)
  effect: sexEffectObject;
}
class SexPos {
  public name: string;
  public key: string;
  public desc: string;
  public movText: string;
  public img: string;
  public cat: string;
  public basic: string;
  public kink: string[];
  public min: number;
  public count: number;
  public sex: boolean;
  public anal: boolean;
  public speed: {max: number, min: number};
  public cum: [{any}];
  public mult: number;
  public req: string[];
  public forbid: string[];
  public control: [boolean, number];
  public tags: string[];
  public pos: Ipos[];
  public group: string;
  public special: () => void;
  public action: () => void;
  public label: string;
  public hover: string;
  public button: string;
  constructor({ name, key, desc, movText, cat, basic, kink, img, min, count, sex, speed, cum, mult, req, forbid, control, tags, pos, special, action, group, label, hover, anal = false }: { name: string, key: string, desc: string, movText: string, cat: string, basic: string, kink: string[], img: string, min: number, count: number, sex: boolean, speed: { max: number, min: number }, cum: [{ any }], mult: number, req: string[], forbid: string[], control: [boolean, number], tags: string[], pos: Ipos[], special: (() => void), action: (() => void), label: string, hover: string, group: string, anal: boolean}) {
    this.name = name;
    this.key = key;
    this.desc = desc;
    this.movText = movText;
    this.img = `[img[${img}]]`;
    this.cat = cat;
    this.basic = basic;
    this.kink = jQuery.extend(true, [], kink);
    this.min = min;
    this.count = count;
    this.sex = sex;
    this.anal = anal;
    this.speed = jQuery.extend(true, {}, speed);
    this.cum = jQuery.extend(true, [], cum);
    this.mult = mult;
    this.req = jQuery.extend(true, [], req);
    this.forbid = jQuery.extend(true, [], forbid);
    this.control = jQuery.extend(true, [], control);
    this.tags = jQuery.extend(true, [], tags);
    this.pos = jQuery.extend(true, [], pos);
    this.special = special;
    this.action = action;
    this.group = group;
    let lab = label.replace(/\./g, "❣");
    label = lab.replace(/\*/g, "✶");
    lab = label.replace(/\s/g, "&nbsp;");
    label = lab;
    this.label = label;
    let mark = "(⚬)";
    if (sex) {mark = "❣SEX❣"; }
    if (anal) {mark = "✶ASS✶"; }
    // <<insertion ${key}Label>>
    this.hover = `<span id="pos-${key}-hover"><span style="color:deeppink;font-size:115%;">${mark}</span> <span class="ship tit">[${label}]</span> ${name}: ${hover} (${group})</span>`;
    // <<hoverrevise ${key}Label>>
    this.button = `<button id="pos-${key}-button" onclick="window.SugarCube.Engine.link('sex.changePosition(${key})')">${label}</button>`;

    for (let i = 0, c = this.pos.length; i < c; i++) {
      if (this.pos[i].handR === false) {
        this.pos[i].handR = [this.pos[i].chest[0], this.pos[i].chest[1], this.pos[i].chest[2], this.pos[i].chest[3]];
        this.pos[i].handL = [this.pos[i].chest[0], this.pos[i].chest[1], this.pos[i].chest[2], this.pos[i].chest[3]];
      }
      if (this.pos[i].kneeR === false) {
        this.pos[i].kneeR = [(this.pos[i].groin[0] + (this.pos[i].groin[0] - this.pos[i].belly[0])), (this.pos[i].groin[1] + (this.pos[i].groin[1] - this.pos[i].belly[1])), (this.pos[i].groin[2] + (this.pos[i].groin[2] - this.pos[i].belly[2])), this.pos[i].groin[3]];
        this.pos[i].kneeL = [(this.pos[i].groin[0] + (this.pos[i].groin[0] - this.pos[i].belly[0])), (this.pos[i].groin[1] + (this.pos[i].groin[1] - this.pos[i].belly[1])), (this.pos[i].groin[2] + (this.pos[i].groin[2] - this.pos[i].belly[2])), this.pos[i].groin[3]];
      }
      if (this.pos[i].footR === false) {
        this.pos[i].footR = [(this.pos[i].kneeR[0] + (this.pos[i].kneeR[0] - this.pos[i].groin[0])), (this.pos[i].kneeR[1] + (this.pos[i].kneeR[1] - this.pos[i].groin[1])), (this.pos[i].kneeR[2] + (this.pos[i].kneeR[2] - this.pos[i].groin[2])), this.pos[i].kneeR[3]];
        this.pos[i].footL = [(this.pos[i].kneeL[0] + (this.pos[i].kneeL[0] - this.pos[i].groin[0])), (this.pos[i].kneeL[1] + (this.pos[i].kneeL[1] - this.pos[i].groin[1])), (this.pos[i].kneeL[2] + (this.pos[i].kneeL[2] - this.pos[i].groin[2])), this.pos[i].kneeL[3]];
      }
    }
  }
  public npc() { setup.sex.changePositionNPC(this.key); }
  get allowed() {
    const ᛔ = State.active.variables;
    const sex = ↂ.sex;
    if (this.key === sex.pos) {
      return 8;
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
    if (sex.pcWetness < 4 && this.cat === "sex") {
      return 11;
    }
    const curPos = aw.sexPos[sex.pos];
    if (curPos.sex) {
      if (this.basic !== curPos.basic) {
        return 10;
      }
      if (!this.sex) {
        return 10;
      }
    }
    let rm = 0;
    let rf = 0;
    for (let i = 1, c = this.pos.length; i < c; i++) {
      if (this.pos[i].sex === 1) {
        rm++;
      } else if (this.pos[i].sex === 2) {
        rf++;
      }
    }
    let m = 0;
    let f = 0;
    let h = 0;
    for (let i = 0, c = sex.activeNPC.length; i < c; i++) {
      if (aw.npc[sex.activeNPC[i]].main.genes === "XX") {
        f++;
      } else if (aw.npc[sex.activeNPC[i]].main.genes === "XY") {
        m++;
      } else {
        h++;
      }
    }
    if (rm > m && rm > (m + h)) {
      return 7;
    }
    if (rf > f && rf > (f + h)) {
      return 7;
    }
    for (let i = 0, c = this.kink.length; i < c; i++) {
      if (ᛔ.censor.includes(this.kink[i])) {
        return 5;
      }
    }
    return 0;
  }

}

(function(): void {
  const pos = {
    standFaceTogether: {
      name: "standing and facing each other", // name of position
      key: "standFaceTogether", // variable key (property name)
      desc: "You and <<= aw.npc[ↂ.sex.activeNPC[0]].main.name>> are standing close together, facing one another.", // basic description of the position.
      movText: "so that you're standing close together, facing each other.", // sentence fragment that can be used to describe a change in position.
      group: "standing", // label to cluster together similar positions
      label: "face each other", // basically the words on the button
      hover: "Stand close together while facing each other.", // hovertext displayed when hovering over button.
      img: "IMGsexP_doubleReach",
      cat: "makeout", // category of position, makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"], // included kinks for censorship purposes.
      min: 2, // min number of characters incl PC
      count: 2, // number of primary 'spots' in this position
      sex: false, // whether sex or not
      anal: false,
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{belly: 5, pubic: 3, vulva: 1}, {bukkake: 1}], // location cum goes for NPCs, array in position order
      mult: 1, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation necessary for the position
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // if a particular character is in control, prohibiting PC control of position
      tags: ["none"], // tags, any special/extra stuff basically.
      pos: [ // array of positions starting with player, relative position of NPC/s stored in story var
        { // 0
          head: [1, 5, 0, "ri"],
          chest: [1, 4, 0, "ri"],
          belly: [1, 3, 0, "ri"],
          groin: [1, 2, 0, "ri"],
          kneeR: [1, 0, 0, "ri"],
          kneeL: [1, 0, 0, "ri"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"], // let's uh, go with parts here.
          occupy: ["none"], // [mouth ,handL, handR, titL, titR, pussy, clit, asshole, cock, balls]
          sex: 0, // required gender 0:none 1:male 2:female (requires parts, so 1 can be futa)
          effect: { // the effect information for the action
            pleasure: { // pleasure (prog to orgasm) given by action
              amt: 0, // actual amount
              max: 10, // max allowed %- won't increase pleasure above that point.
            },
            arousal: false,
            wetness: 0,
            strong: { // list of traits/kinks that this action is strong for
              kink: ["none"],
              trait: ["none"],
            },
            weak: { // list of traits/kinks that decrease effect/weak for.
              kink: ["none"],
              trait: ["none"],
            },
          },
        },
        { // 1
          head: [2, 5, 0, "le"],
          chest: [2, 4, 0, "le"],
          belly: [2, 3, 0, "le"],
          groin: [2, 2, 0, "le"],
          kneeR: [2, 0, 0, "le"],
          kneeL: [2, 0, 0, "le"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          info: "Standing in front of the PC",
          sex: 1,
          effect: { // the effect information for the action
            pleasure: { // pleasure (prog to orgasm) given by action
              amt: 0, // actual amount
              max: 10, // max allowed %- won't increase pleasure above that point.
            },
            arousal: false,
            wetness: 0,
            strong: { // list of traits/kinks that this action is strong for
              kink: ["none"],
              trait: ["none"],
            },
            weak: { // list of traits/kinks that decrease effect/weak for.
              kink: ["none"],
              trait: ["none"],
            },
          },
        },
      ],
      action() { // function to run every turn while in the position
        // none
      },
      special() { // unique action that occurs when this position is chosen.
        // none
      },
    },
    standBJ: {
      name: "you on your knees in front of <<n _t 'himher.q'>>", // name of position
      key: "standBJ", // variable key (property name)
      desc: "You are kneeling in front of <<= ↂ.T.main.name>>, your head is right in front of <<n _t hisher.q>> crotch.", // basic description of the position.
      movText: "so that you're kneeling in front of <<n _t 'himher.q'>>.", // sentence fragment that can be used to describe a change in position.
      group: "standing", // label to cluster together similar positions
      label: "On Your Knees", // basically the words on the button
      hover: "Kneel down in front of someone to put their groin at face level.", // hovertext displayed when hovering over button.
      img: "IMGsexP_blowjobStanding",
      cat: "oralNPC", // category of position, makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"], // included kinks for censorship purposes.
      min: 2, // min number of characters incl PC
      count: 2, // number of primary 'spots' in this position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{hair: 3, face: 5, mouth: 2}, {bukkake: 1}], // location cum goes for NPCs, array in position order
      mult: 1, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation necessary for the position
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // if a particular character is in control, prohibiting PC control of position
      tags: ["none"], // tags, any special/extra stuff basically.
      pos: [ // array of positions starting with player, relative position of NPC/s stored in story var
        {
          head: [2, 3, 0, "ri"],
          chest: [1, 2, 0, "ri"],
          belly: [1, 1, 0, "ri"],
          groin: [1, 0, 0, "ri"],
          kneeR: [3, 0, 1, "do"],
          kneeL: [3, 0, -1, "do"],
          footR: [0, 0, 1, "do"],
          footL: [0, 0, -1, "do"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 0, max: 10},
            arousal: false,
            wetness: 0,
            strong: {kink: ["cumSlut"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [3, 6, 0, "le"],
          chest: [3, 5, 0, "le"],
          belly: [3, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [3, 1, 0, "le"],
          kneeL: [3, 1, 0, "le"],
          footR: [3, 0, 0, "le"],
          footL: [3, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 0, max: 10},
            arousal: true,
            wetness: 0,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // function to run every turn while in the position
        // none
      },
      special() { // unique action that occurs when this position is chosen.
        // none
      },
    },
    standOral: {
      name: "standing while someone else kneels", // name of position
      key: "standOral", // variable key (property name)
      desc: "You are standing in front of <<= ↂ.T.main.name>>, who is kneeling in front of you.", // basic description of the position.
      movText: "so that <<n _t 'heshe.q'>> is kneeling in front of you.", // sentence fragment that can be used to describe a change in position.
      group: "standing", // label to cluster together similar positions
      label: "NPC On Knees", // basically the words on the button
      hover: "Stand while the NPC kneels in front of you, giving their mouth access to your lady bits.", // hovertext displayed when hovering over button.
      img: "IMGsexP-ManKneeling",
      cat: "oralPC", // category of position, makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"], // included kinks for censorship purposes.
      min: 2, // min number of characters incl PC
      count: 2, // number of primary 'spots' in this position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{floor: 1}, {bukkake: 1}], // location cum goes for NPCs, array in position order
      mult: 1, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation necessary for the position
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // if a particular character is in control, prohibiting PC control of position
      tags: ["none"], // tags, any special/extra stuff basically.
      pos: [ // array of positions starting with player, relative position of NPC/s stored in story var
        {
          head: [3, 6, 0, "le"],
          chest: [3, 5, 0, "le"],
          belly: [3, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [3, 1, 0, "le"],
          kneeL: [3, 1, 0, "le"],
          footR: [3, 0, 0, "le"],
          footL: [3, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [2, 3, 0, "ri"],
          chest: [1, 2, 0, "ri"],
          belly: [1, 1, 0, "ri"],
          groin: [1, 0, 0, "ri"],
          kneeR: [3, 0, 1, "do"],
          kneeL: [3, 0, -1, "do"],
          footR: [0, 0, 1, "do"],
          footL: [0, 0, -1, "do"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["mouth", "lips"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: false,
            wetness: 0,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // function to run every turn while in the position
        // none
      },
      special() { // unique action that occurs when this position is chosen.
        // none
      },
    },
    standingFacingNPCback: {
      name: "standing facing NPC's back",
      key: "standingFacingNPCback",
      desc: "You and <<= ↂ.sex.npc[0].main.name>> are standing close together, <<n _t 'hisher.q'>> back facing you.",
      movText: "and turn <<n _t 'himher.q'>> so that you're both standing and you're facing <<n _t 'hisher.q'>> back.", // sentence fragment
      group: "standing", // standing sitting laying
      label: "face his back",
      hover: "Stand close together while facing <<n _t 'hisher.q'>> back.",
      img: "IMGsexP_doubleReach",
      cat: "makeout", // makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{floor: 1}, {bukkake: 1}],
      mult: 1, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [2, 6, 0, "ri"],
          chest: [2, 5, 0, "ri"],
          belly: [2, 4, 0, "ri"],
          groin: [2, 3, 0, "ri"],
          kneeR: [2, 1, 0, "ri"],
          kneeL: [2, 1, 0, "ri"],
          footR: [2, 0, 0, "ri"],
          footL: [2, 0, 0, "ri"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 0, max: 10},
            arousal: false,
            wetness: 0,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [3, 6, 0, "ri"],
          chest: [3, 5, 0, "ri"],
          belly: [3, 4, 0, "ri"],
          groin: [3, 3, 0, "ri"],
          kneeR: [3, 1, 0, "ri"],
          kneeL: [3, 1, 0, "ri"],
          footR: [3, 0, 0, "ri"],
          footL: [3, 0, 0, "ri"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 0, max: 10},
            arousal: false,
            wetness: 0,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    standingFacingAway: {
      name: "stand facing away",
      key: "standingFacingAway",
      desc: "You are standing with your back to <<print ↂ.sex.npc[0].main.name>>, facing away from <<n _t 'himher.q'>>",
      movText: "move so that your back is facing toward <<n _t 'himher.q'>>.", // sentence fragment
      group: "standing", // standing sitting laying
      label: "Stand Facing Away",
      hover: "Stand close together while facing each other.",
      img: "IMGsexP-ManStandBehind",
      cat: "makeout", // makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{back: 5, butt: 3, vulva: 1}, {bukkake: 1}],
      mult: 1, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [2, 6, 0, "le"],
          chest: [2, 5, 0, "le"],
          belly: [2, 4, 0, "le"],
          groin: [2, 3, 0, "le"],
          kneeR: [2, 1, 0, "le"],
          kneeL: [2, 1, 0, "le"],
          footR: [2, 0, 0, "le"],
          footL: [2, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [3, 6, 0, "le"],
          chest: [3, 5, 0, "le"],
          belly: [3, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [3, 1, 0, "le"],
          kneeL: [3, 1, 0, "le"],
          footR: [3, 0, 0, "le"],
          footL: [3, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    standingFacingAwaySex: {
      name: "standing and getting fucked from behind",
      key: "standingFacingAwaySex",
      desc: "<<= ↂ.sex.npc[0].main.name>> is standing behind you, holding you as <<n _t 'heshe.q'>> fucks you.",
      movText: "moving until <<n _t 'heshe.q'>> is in just the right spot behind you, and <<n _t 'hisher.q'>> <<n _t 'cock.n'>> slides inside you.", // sentence fragment
      group: "standing", // standing sitting laying
      label: ".Stand Facing Away.",
      hover: "Stand facing away from your partner, arching your back as they support you so that you can be fucked from behind.",
      img: "IMGsexP-ManStandBehindSex",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: {max: 6, min: 1}, // if sex, a min and max fuck speed possible
      cum: [{deep: 1, mid: 4, vest: 5}, {bukkake: 1}],
      mult: 1.2, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [1, 6, 0, "le"],
          chest: [1, 5, 0, "le"],
          belly: [1, 4, 0, "le"],
          groin: [2, 3, 0, "le"],
          kneeR: [2, 1, 0, "le"],
          kneeL: [2, 1, 0, "le"],
          footR: [2, 0, 0, "le"],
          footL: [2, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: {amt: 50, max: 100},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [3, 6, 0, "le"],
          chest: [3, 5, 0, "le"],
          belly: [3, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [3, 1, 0, "le"],
          kneeL: [3, 1, 0, "le"],
          footR: [3, 0, 0, "le"],
          footL: [3, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: {amt: 50, max: 100},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    StandingFacingNPCsex: {
      name: "standing and getting fucked face-to-face",
      key: "StandingFacingNPCsex",
      desc: "<<= ↂ.sex.npc[0].main.name>> is standing face-to-face with you, holding one of your legs as <<n _t 'heshe.q'>> fucks you.",
      movText: "moving until your <<p vulva.n>> is in just the right spot, and <<n _t 'hisher.q'>> <<n _t 'cock.n'>> slides inside you.", // sentence fragment
      group: "standing", // standing sitting laying
      label: ".Stand Face-2-Face.",
      hover: "Stand face-to-face with your partner, leaning back and lifting a leg as they support you so that you can be fucked while standing.",
      img: "IMGsexP_fuckingOnCounter",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: {max: 6, min: 1}, // if sex, a min and max fuck speed possible
      cum: [{deep: 2, mid: 6, vest: 2}, {bukkake: 1}],
      mult: 1.1, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [2, 6, 0, "ri"],
          chest: [2, 5, 0, "ri"],
          belly: [2, 4, 0, "ri"],
          groin: [2, 3, 0, "ri"],
          kneeR: [4, 2, 0, "ri"],
          kneeL: [4, 2, 0, "ri"],
          footR: [3, 0, 0, "ri"],
          footL: [3, 0, 0, "ri"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: {amt: 50, max: 100},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [3, 6, 0, "le"],
          chest: [3, 5, 0, "le"],
          belly: [3, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [3, 1, 0, "le"],
          kneeL: [3, 1, 0, "le"],
          footR: [3, 0, 0, "le"],
          footL: [3, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: {amt: 50, max: 100},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    standingAgainstWallSex: {
      name: "against the wall sex",
      key: "standingAgainstWallSex",
      desc: "Your back is against the wall, <<= ↂ.T.main.name>>'s body pinning you there with your legs up around <<n _t 'himher.q'>> as <<n _t 'heshe.q'>> fucks you.",
      movText: "you feel yourself slide up against the wall as you spread your legs, lifting them to wrap them around <<= ↂ.T.main.name>>. <<n _t 'hisher.q'>> <<n _t 'cock.s'>> <<n _t 'cock.n'>> parts your <<p 'labia.n'>> and slides inside you.", // sentence fragment
      group: "standing", // standing sitting laying 
      label: ".Against the Wall.",
      hover: "Get pinned against the wall by your partner as they fuck you.",
      img: "IMGsexP-AgainstWallSex",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: {max: 7, min: 1}, // if sex, a min and max fuck speed possible
      cum: [{deep: 5, mid: 4, vest: 1}, {bukkake: 1}],
      mult: 1.3, // multiplier to pleasure from position
      req: ["wall"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [3, 6, 0, "ri"],
          chest: [2, 5, 0, "ri"],
          belly: [2, 4, 0, "ri"],
          groin: [2, 3, 0, "ri"],
          kneeR: [4, 2, 0, "ri"],
          kneeL: [4, 2, 0, "ri"],
          footR: [2, 1, 0, "ri"],
          footL: [2, 1, 0, "ri"],
          handR: false,
          handL: false,
          blocked: ["ass", "back"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: {amt: 50, max: 100},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [3, 5, 0, "le"],
          chest: [3, 4, 0, "le"],
          belly: [3, 3, 0, "le"],
          groin: [3, 2, 0, "le"],
          kneeR: [3, 0, 0, "le"],
          kneeL: [3, 0, 0, "le"],
          footR: [3, -1, 0, "le"],
          footL: [3, -1, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: {amt: 50, max: 100},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    standingHandsonWallSex: {
      name: "fucked with your hands on the wall",
      key: "standingHandsonWallSex",
      desc: "You're standing, bent forward with your hands on the wall to support you as <<= ↂ.T.main.name>> fucks you from behind.",
      movText: "you bend over, holding yourself up with your hands on the wall and wait until you feel <<= ↂ.T.main.name>>'s <<n _t 'cock.s'>> <<n _t 'cock.n'>> penetrate your <<p curwet.q>> <<p pussy.n>>.", // sentence fragment
      group: "standing", // standing sitting laying
      label: ".Hands on Wall.",
      hover: "Put your hands on the wall and get fucked.",
      img: "IMGsexP-HandsOnWallSex",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: {max: 8, min: 1}, // if sex, a min and max fuck speed possible
      cum: [{deep: 5, mid: 4, vest: 1}, {bukkake: 1}],
      mult: 1.3, // multiplier to pleasure from position
      req: ["wall"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [1, 6, 0, "le"],
          chest: [1, 5, 0, "le"],
          belly: [2, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [3, 1, 0, "le"],
          kneeL: [3, 1, 0, "le"],
          footR: [3, 0, 0, "le"],
          footL: [3, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["face"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: {amt: 50, max: 101},
            arousal: true,
            wetness: 1,
            strong: {kink: ["slut", "liberated"], trait: ["none"]},
            weak: {kink: ["shame"], trait: ["none"]},
          },
        },
        {
          head: [4, 6, 0, "le"],
          chest: [4, 5, 0, "le"],
          belly: [4, 4, 0, "le"],
          groin: [4, 3, 0, "le"],
          kneeR: [4, 1, 0, "le"],
          kneeL: [4, 1, 0, "le"],
          footR: [4, 0, 0, "le"],
          footL: [4, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: {amt: 50, max: 105},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    standingHandsonWallAnal: {
      name: "fucked in the ass with your hands on the wall",
      key: "standingHandsonWallAnal",
      desc: "You're standing, bent forward with your hands on the wall to support you as <<= ↂ.T.main.name>> fucks your asshole from behind.",
      movText: "you bend over, holding yourself up with your hands on the wall and wait until you feel <<= ↂ.T.main.name>>'s <<n _t 'cock.s'>> <<n _t 'cock.n'>> penetrate your <<p asshole.q>> <<p asshole.n>>.", // sentence fragment
      group: "standing", // standing sitting laying
      label: "*Hands on Wall*",
      hover: "Put your hands on the wall and get fucked in the ass.",
      img: "IMGsexP-HandsOnWallSex",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "stand",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      anal: true,
      speed: { max: 7, min: 1 }, // if sex, a min and max fuck speed possible
      cum: [{ anus: 10 }, { bukkake: 1 }],
      mult: 1.1, // multiplier to pleasure from position
      req: ["wall"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [1, 6, 0, "le"],
          chest: [1, 5, 0, "le"],
          belly: [2, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [3, 1, 0, "le"],
          kneeL: [3, 1, 0, "le"],
          footR: [3, 0, 0, "le"],
          footL: [3, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["face"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: { amt: 50, max: 85 },
            arousal: true,
            wetness: 1,
            strong: { kink: ["slut", "liberated"], trait: ["none"] },
            weak: { kink: ["shame"], trait: ["none"] },
          },
        },
        {
          head: [4, 6, 0, "le"],
          chest: [4, 5, 0, "le"],
          belly: [4, 4, 0, "le"],
          groin: [4, 3, 0, "le"],
          kneeR: [4, 1, 0, "le"],
          kneeL: [4, 1, 0, "le"],
          footR: [4, 0, 0, "le"],
          footL: [4, 0, 0, "le"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: { amt: 50, max: 105 },
            arousal: true,
            wetness: 1,
            strong: { kink: ["none"], trait: ["none"] },
            weak: { kink: ["none"], trait: ["none"] },
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    LayingSidebySide: {
      name: "laying side by side",
      key: "LayingSidebySide",
      desc: "You are laying down next to <<= ↂ.T.main.name>>.",
      movText: "move to lay down on your side, facing <<= ↂ.T.main.name>>.", // sentence fragment
      group: "laying", // standing sitting laying
      label: "Lay Side-by-Side",
      hover: "Lay down side-by-side, facing each other.",
      img: "IMGsexP-LayingSideBySide",
      cat: "makeout", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{belly: 3, pubic: 3, floor: 3}, {bukkake: 1}],
      mult: 1, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [6, 2, 0, "aw"],
          chest: [5, 2, 0, "aw"],
          belly: [4, 2, 0, "aw"],
          groin: [3, 2, 0, "aw"],
          kneeR: [1, 2, 0, "aw"],
          kneeL: [1, 2, 0, "aw"],
          footR: [0, 2, 0, "aw"],
          footL: [0, 2, 0, "aw"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [6, 2, 0, "to"],
          chest: [5, 2, 0, "to"],
          belly: [4, 2, 0, "to"],
          groin: [3, 2, 0, "to"],
          kneeR: [1, 2, 0, "to"],
          kneeL: [1, 2, 0, "to"],
          footR: [0, 2, 0, "to"],
          footL: [0, 2, 0, "to"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    LayingNPContop: {
      name: "laying underneath your partner",
      key: "LayingNPContop",
      desc: "You are laying down on your back with <<= ↂ.T.main.name>> on top of you.",
      movText: "roll onto your back and invite <<= ↂ.T.main.name>> to climb on top of you.", // sentence fragment
      group: "laying", // standing sitting laying
      label: "Lay Underneath",
      hover: "Lay on your back while your partner lays on top of you.",
      img: "IMGsexP-ManOnTop",
      cat: "makeout", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{belly: 1, pubic: 5, vulva: 4}, {bukkake: 1}],
      mult: 1, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [6, 2, 0, "up"],
          chest: [5, 2, 0, "up"],
          belly: [4, 2, 0, "up"],
          groin: [3, 2, 0, "up"],
          kneeR: [1, 3, 0, "up"],
          kneeL: [1, 3, 0, "up"],
          footR: [0, 2, 0, "up"],
          footL: [0, 2, 0, "up"],
          handR: false,
          handL: false,
          blocked: ["butt", "back"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 5, max: 70},
            arousal: true,
            wetness: 2,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [5, 3, 0, "ri"],
          chest: [4, 3, 0, "do"],
          belly: [3, 3, 0, "do"],
          groin: [2, 3, 0, "do"],
          kneeR: [0, 2, 0, "do"],
          kneeL: [0, 2, 0, "do"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 4, max: 70},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    missionary: {
      name: "getting fucked in the missionary position",
      key: "missionary",
      desc: "You are laying underneath <<= ↂ.T.main.name>>, getting fucked in the classic missionary position.",
      movText: "lay back and open your legs, giving <<= ↂ.T.main.name>> plenty of room to stick <<n _t 'hisher.q'>> <<n _t 'cock.s'>> <<n _t 'cock.n'>> inside you. It doesn't take long before your feel your <<p pussy.s>> <<p pussy.n>> being invaded.", // sentence fragment
      group: "laying", // standing sitting laying
      label: ".Missionary Sex.",
      hover: "Get fucked in the time-honored missionary position. It may not be fancy, but it's effective!",
      img: "IMGsexP_bedLegsUp",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: {max: 8, min: 1}, // if sex, a min and max fuck speed possible
      cum: [{deep: 5, mid: 3, vest: 1, cervix: 1}, {bukkake: 1}],
      mult: 1.2, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [6, 2, 0, "up"],
          chest: [5, 2, 0, "up"],
          belly: [4, 2, 0, "up"],
          groin: [3, 2, 0, "up"],
          kneeR: [1, 3, 0, "up"],
          kneeL: [1, 3, 0, "up"],
          footR: [0, 2, 0, "up"],
          footL: [0, 2, 0, "up"],
          handR: false,
          handL: false,
          blocked: ["butt", "back"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: {amt: 50, max: 105},
            arousal: true,
            wetness: 1,
            strong: {kink: ["pregnancy", "risky"], trait: ["caring", "maternal"]},
            weak: {kink: ["fap"], trait: ["bitch", "-caring"]},
          },
        },
        {
          head: [5, 3, 0, "ri"],
          chest: [4, 3, 0, "do"],
          belly: [3, 3, 0, "do"],
          groin: [2, 3, 0, "do"],
          kneeR: [0, 2, 0, "do"],
          kneeL: [0, 2, 0, "do"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: {amt: 50, max: 105},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    cowGirl: {
      name: "riding your partner cowgirl style",
      key: "cowGirl",
      desc: "You're atop <<= ↂ.T.main.name>>, sitting up and riding <<n _t 'hisher.q'>> <<n _t 'cock.n'>> cowgirl style.",
      movText: "you climb atop <<= ↂ.T.main.name>>, straddling <<n _t 'himher.q'>> before lowering your <<p 'curwet.s'>> <<p vulva.n>> onto <<n _t 'hisher.q'>> <<n _t 'cockhead.q'>> <<n _t 'cockhead.n'>>.", // sentence fragment
      group: "laying", // standing sitting laying
      label: ".Ride Cowgirl.",
      hover: "Climb aboard your partner and ride <<n _t 'himher.q'>> like a cowgirl.",
      img: "IMGsexP-CowGirl",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: {max: 7, min: 1}, // if sex, a min and max fuck speed possible
      cum: [{deep: 2, cervix: 2, mid: 3, vest: 3}, {bukkake: 1}],
      mult: 1.2, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [3, 6, 0, "ri"],
          chest: [3, 5, 0, "ri"],
          belly: [3, 4, 0, "ri"],
          groin: [3, 3, 0, "ri"],
          kneeR: [5, 3, 1, "ri"],
          kneeL: [5, 3, -1, "ri"],
          footR: [3, 2, 1, "ri"],
          footL: [3, 2, -1, "ri"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: {amt: 55, max: 105},
            arousal: true,
            wetness: 1,
            strong: {kink: ["slut", "liberate"], trait: ["none"]},
            weak: {kink: ["shame"], trait: ["none"]},
          },
        },
        {
          head: [6, 2, 0, "up"],
          chest: [5, 2, 0, "up"],
          belly: [4, 2, 0, "up"],
          groin: [3, 2, 0, "up"],
          kneeR: [1, 3, 0, "up"],
          kneeL: [1, 3, 0, "up"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["butt", "back"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: {amt: 45, max: 105},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    RevCowgirl: {
      name: "riding your partner reverse cowgirl style",
      key: "RevCowgirl",
      desc: "You're atop <<= ↂ.T.main.name>>, facing <<n _t 'hisher.q'>> feet and riding <<n _t 'hisher.q'>> <<n _t 'cock.n'>> reverse cowgirl style.",
      movText: "you climb atop <<= ↂ.T.main.name>>, straddling <<n _t 'himher.q'>> and taking a good look at <<n _t 'hisher.q'>> package before lowering your <<p 'curwet.s'>> <<p vulva.n>> onto <<n _t 'hisher.q'>> <<n _t 'cock.q'>> <<n _t 'cock.n'>>.", // sentence fragment
      group: "laying", // standing sitting laying
      label: ".Reverse Cowgirl.",
      hover: "Climb aboard your partner and ride <<n _t 'himher.q'>> like a cowgirl, only in reverse.",
      img: "IMGsexP-RevCowGirl",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: {max: 6, min: 1}, // if sex, a min and max fuck speed possible
      cum: [{deep: 2, cervix: 2, mid: 3, vest: 3}, {bukkake: 1}],
      mult: 1.2, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [3, 6, 0, "le"],
          chest: [3, 5, 0, "le"],
          belly: [3, 4, 0, "le"],
          groin: [3, 3, 0, "le"],
          kneeR: [1, 3, 1, "ri"],
          kneeL: [1, 3, -1, "ri"],
          footR: [3, 2, 1, "ri"],
          footL: [3, 2, -1, "ri"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: {amt: 55, max: 105},
            arousal: true,
            wetness: 1,
            strong: {kink: ["slut", "liberate"], trait: ["none"]},
            weak: {kink: ["shame"], trait: ["none"]},
          },
        },
        {
          head: [6, 2, 0, "up"],
          chest: [5, 2, 0, "up"],
          belly: [4, 2, 0, "up"],
          groin: [3, 2, 0, "up"],
          kneeR: [1, 3, 0, "up"],
          kneeL: [1, 3, 0, "up"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["butt", "back"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: {amt: 45, max: 105},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    layingBJposition: {
      name: "you down by your partner's legs",
      key: "layingBJposition",
      desc: "You're on your hands and knees, straddling <<= ↂ.T.main.name>>'s legs with your face directly over <<if ↂ.T.main.male>><<n _t 'hisher.q'>> <<n _t 'cock.s'>> <<n _t 'cock.n'>> and <<n _t 'balls.s'>> <<n _t 'balls.n'>>.<<else>><<n _t 'hisher.q'>> <<n _t 'curwet.q'>> <<n _t 'vulva.n'>>.<</if>>",
      movText: "scoot down and straddle <<n _t 'hisher.q'>> legs until your face is mere <<if $metric>>centimeters<<else>>inches<</if>> from <<if ↂ.T.main.male>><<n _t 'hisher.q'>> <<n _t 'cock.s'>> <<n _t 'cock.n'>> and <<n _t 'balls.s'>> <<n _t 'balls.n'>>.<<else>><<n _t 'hisher.q'>> <<n _t 'curwet.q'>> <<n _t 'vulva.n'>>.<</if>>", // sentence fragment
      group: "laying", // standing sitting laying
      label: "Oral Laying Down",
      hover: "Get down by your partner's legs so that your head is near their groin",
      img: "IMGsexP_blowjobStanding",
      cat: "oralNPC", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{face: 5, mouth: 3, hair: 1}, {bukkake: 1}],
      mult: 1, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [3, 3, 0, "do"],
          chest: [2, 3, 0, "do"],
          belly: [1, 3, 0, "do"],
          groin: [0, 2, 0, "do"],
          kneeR: [2, 2, 1, "do"],
          kneeL: [2, 2, -1, "do"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [6, 2, 0, "up"],
          chest: [5, 2, 0, "up"],
          belly: [4, 2, 0, "up"],
          groin: [3, 2, 0, "up"],
          kneeR: [1, 2, 0, "up"],
          kneeL: [1, 2, 0, "up"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["butt", "back"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    layingMunchPosition: {
      name: "legs spread with your partner's head between them",
      key: "layingMunchPosition",
      desc: "You're laying on your back with your legs spread, while <<= ↂ.T.main.name>> has <<n _t 'hisher.q'>> head between them.",
      movText: "lay back and open your legs wide to allow <<= ↂ.T.main.name>> to position <<n _t 'himher.q'>>self between them.", // sentence fragment
      group: "laying", // standing sitting laying
      label: "Get Eaten Out",
      hover: "Open your legs and give your partner room to put their head between them. (doesn't guarantee they'll actually follow through though!)",
      img: "IMGsexP_blowjobStanding",
      cat: "oralPC", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{floor: 1}, {bukkake: 1}],
      mult: 1, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [6, 2, 0, "up"],
          chest: [5, 2, 0, "up"],
          belly: [4, 2, 0, "up"],
          groin: [3, 2, 0, "up"],
          kneeR: [1, 2, 0, "up"],
          kneeL: [1, 2, 0, "up"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["butt", "back"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [3, 3, 0, "do"],
          chest: [2, 3, 0, "do"],
          belly: [1, 3, 0, "do"],
          groin: [0, 2, 0, "do"],
          kneeR: [2, 2, 1, "do"],
          kneeL: [2, 2, -1, "do"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    SixtyNinePConTop: {
      name: "the fabled sixty-nine position",
      key: "SixtyNinePConTop",
      desc: "You are in the well-known sixty-nine position with <<= ↂ.T.main.name>>, with you on top.",
      movText: "turn around and climb over <<= ↂ.T.main.name>> so that you're straddling <<n _t 'hisher.q'>> face, with your own face hovering over <<if ↂ.T.main.male>><<n _t 'hisher.q'>> <<n _t 'cock.s'>> <<n _t 'cock.n'>> and <<n _t 'balls.s'>> <<n _t 'balls.n'>>.<<else>><<n _t 'hisher.q'>> <<n _t 'curwet.q'>> <<n _t 'vulva.n'>>.<</if>>", // sentence fragment
      group: "laying", // standing sitting laying
      label: "Sixty-Nine",
      hover: "Climb over your partner so that your cunt is in their face and you have easy access to their junk too.",
      img: "IMGsexP_blowjobStanding",
      cat: "oralNPC", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: false, // whether sex or not
      speed: {max: 0, min: 0}, // if sex, a min and max fuck speed possible
      cum: [{face: 5, mouth: 3, hair: 1}, {bukkake: 1}],
      mult: 1, // multiplier to pleasure from position
      req: ["bed"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [2, 3, 0, "do"],
          chest: [3, 3, 0, "do"],
          belly: [4, 3, 0, "do"],
          groin: [5, 3, 0, "do"],
          kneeR: [6, 2, 0, "do"],
          kneeL: [6, 2, 0, "do"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
        {
          head: [5, 2, 0, "up"],
          chest: [4, 2, 0, "up"],
          belly: [3, 2, 0, "up"],
          groin: [2, 2, 0, "up"],
          kneeR: [0, 2, 0, "up"],
          kneeL: [0, 2, 0, "up"],
          footR: false,
          footL: false,
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["none"],
          sex: 0,
          effect: {
            pleasure: {amt: 1, max: 10},
            arousal: true,
            wetness: 1,
            strong: {kink: ["none"], trait: ["none"]},
            weak: {kink: ["none"], trait: ["none"]},
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    doggyStyleSex: {
      name: "fucked doggy style",
      key: "doggyStyleSex",
      desc: "You're on your hands and knees with <<= ↂ.T.main.name>> fucking you from behind.",
      movText: "you get on your hands and knees, positioning yourself for <<= ↂ.T.main.name>>'s <<n _t 'cock.s'>> <<n _t 'cock.n'>> to penetrate your <<p curwet.q>> <<p pussy.n>>.", // sentence fragment
      group: "laying", // standing sitting laying
      label: ".DoggyStyle.",
      hover: "Get on your hands and knees to be fucked from behind.",
      img: "IMGsexP_doggyStyle",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      speed: { max: 8, min: 1 }, // if sex, a min and max fuck speed possible
      cum: [{ deep: 5, mid: 4, vest: 1 }, { bukkake: 1 }],
      mult: 1.3, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [6, 3, 0, "do"],
          chest: [5, 3, 0, "do"],
          belly: [4, 3, 0, "do"],
          groin: [3, 3, 0, "do"],
          kneeR: [3, 1, 1, "do"],
          kneeL: [3, 1, -1, "do"],
          footR: [1, 1, 0, "do"],
          footL: [1, 1, 0, "do"],
          handR: false,
          handL: false,
          blocked: ["face"],
          occupy: ["pussy"],
          sex: 0,
          effect: {
            pleasure: { amt: 50, max: 101 },
            arousal: true,
            wetness: 1,
            strong: { kink: ["slut", "liberated"], trait: ["none"] },
            weak: { kink: ["shame"], trait: ["none"] },
          },
        },
        {
          head: [2, 6, 0, "ri"],
          chest: [2, 5, 0, "ri"],
          belly: [2, 4, 0, "ri"],
          groin: [2, 3, 0, "ri"],
          kneeR: [2, 1, 0, "do"],
          kneeL: [2, 1, 0, "do"],
          footR: [0, 1, 0, "do"],
          footL: [0, 1, 0, "do"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: { amt: 50, max: 105 },
            arousal: true,
            wetness: 1,
            strong: { kink: ["none"], trait: ["none"] },
            weak: { kink: ["none"], trait: ["none"] },
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
    doggyStyleAnal: {
      name: "fucked doggy style",
      key: "doggyStyleAnal",
      desc: "You're on your hands and knees with <<= ↂ.T.main.name>> fucking your ass from behind.",
      movText: "you get on your hands and knees, positioning yourself for <<= ↂ.T.main.name>>'s <<n _t 'cock.s'>> <<n _t 'cock.n'>> to penetrate your <<p asshole.q>> <<p asshole.n>>.", // sentence fragment
      group: "laying", // standing sitting laying
      label: "*DoggyStyle*",
      hover: "Get on your hands and knees to be fucked anally from behind.",
      img: "IMGsexP_doggyStyle",
      cat: "sex", // makeout, oralPC, oralNPC, sex
      basic: "lay",
      kink: ["none"],
      min: 2, // incl PC
      count: 2, // primary 'spots' in position
      sex: true, // whether sex or not
      anal: true,
      speed: { max: 7, min: 1 }, // if sex, a min and max fuck speed possible
      cum: [{ anus: 10 }, { bukkake: 1 }],
      mult: 1.1, // multiplier to pleasure from position
      req: ["none"], // required furniture/situation
      forbid: ["none"], // tags that make this position forbidden.
      control: [false, 0], // [true/false,index]
      tags: ["none"], // tags
      pos: [
        {
          head: [6, 3, 0, "do"],
          chest: [5, 3, 0, "do"],
          belly: [4, 3, 0, "do"],
          groin: [3, 3, 0, "do"],
          kneeR: [3, 1, 1, "do"],
          kneeL: [3, 1, -1, "do"],
          footR: [1, 1, 0, "do"],
          footL: [1, 1, 0, "do"],
          handR: false,
          handL: false,
          blocked: ["face"],
          occupy: ["asshole"],
          sex: 0,
          effect: {
            pleasure: { amt: 50, max: 85 },
            arousal: true,
            wetness: 1,
            strong: { kink: ["slut", "liberated"], trait: ["none"] },
            weak: { kink: ["shame"], trait: ["none"] },
          },
        },
        {
          head: [2, 6, 0, "ri"],
          chest: [2, 5, 0, "ri"],
          belly: [2, 4, 0, "ri"],
          groin: [2, 3, 0, "ri"],
          kneeR: [2, 1, 0, "do"],
          kneeL: [2, 1, 0, "do"],
          footR: [0, 1, 0, "do"],
          footL: [0, 1, 0, "do"],
          handR: false,
          handL: false,
          blocked: ["none"],
          occupy: ["cock"],
          sex: 1,
          effect: {
            pleasure: { amt: 60, max: 105 },
            arousal: true,
            wetness: 1,
            strong: { kink: ["none"], trait: ["none"] },
            weak: { kink: ["none"], trait: ["none"] },
          },
        },
      ],
      action() { // run every turn
        // none
      },
      special() { // occurs when chosen.
        // none
      },
    },
  };
  const keys = Object.keys(pos);
  let cnt = 0;
  for (let i = 0, c = keys.length; i < c; i++) {
    aw.sexPos[keys[i]] = new SexPos(pos[keys[i]]);
    cnt ++;
  }
  setup.sex.sexPosList = Object.keys(aw.sexPos);
  aw.con.info(`${cnt} sex positions loaded.`);
})();



