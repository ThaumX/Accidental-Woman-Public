/*
/*    ██╗  ██╗ █████╗ ██╗██████╗
/*    ██║  ██║██╔══██╗██║██╔══██╗
/*    ███████║███████║██║██████╔╝
/*    ██╔══██║██╔══██║██║██╔══██╗
/*    ██║  ██║██║  ██║██║██║  ██║
/*    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
/*
/* ███████╗████████╗██╗   ██╗██╗
/* ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║
/* ███████╗   ██║    ╚████╔╝ ██║
/* ╚════██║   ██║     ╚██╔╝  ██║
/* ███████║   ██║      ██║   ███████╗
/* ╚══════╝   ╚═╝      ╚═╝   ╚══════╝
*/

interface setupHair {
  prop: (prop: string) => any;
  stylist: (hairstyle: string) => string | Error;
  do: (hairstyle: string) => string | Error;
  undo: () => void;
  shower: () => void;
  print: (limit?: number) => string;
  known: () => string;
  printButton: (cunt: string, limit?: number) => string;
  printWear: () => string;
  doSet: (set: string) => any;
}

aw.hair = {};
class Hairstyle {
  public name: string;
  public key: string;
  public sDesc: string;
  public lDesc: string;
  public learn: number;
  public atr: number;
  public time: number;
  public diff: number;
  public autoPass: number;
  public image: string;
  public max: number;
  public min: number;
  constructor({name, key, sDesc = "a hairstyle", lDesc = "a hairstyle", learn = 10, atr = 0, time = 10, diff = 5, image = "IMG-HOMEITEM-Placeholder", max = 99, min = 0}: {name: string, key: string, sDesc: string, lDesc: string, learn: number, atr: number, time: number, diff: number, image: string, max: number, min: number}) {
    this.name = name;
    this.key = key;
    this.sDesc = sDesc;
    if (lDesc === "") {
      this.lDesc = "A proper description for this hairstyle is pending.";
    } else {
      this.lDesc = lDesc;
    }
    this.learn = learn;
    this.atr = atr;
    this.time = time;
    this.diff = diff;
    this.autoPass = diff * 5;
    if (!image) {
      image = "IMG-HOMEITEM-Placeholder";
    }
    this.image = `<img id="img-${key}" data-passage="${image}" class="hairstyle">`;
    this.max = max;
    this.min = min;
  }
}
setup.hair = {
  // shortcut to access property of current hairstyle
  prop(prop: string): any {
    const x = ↂ.pc.groom.hairStyle;
    let y;
    switch (prop) {
    case "name":
    case "Name":
    case "type":
      y = "name";
      break;
    case "key":
    case "Key":
    case "var":
      y = "key";
      break;
    case "sDesc":
    case "sdesc":
    case "desc":
    case "Desc":
      y = "sDesc";
      break;
    case "lDesc":
    case "ldesc":
    case "description":
      y = "lDesc";
      break;
    case "DC":
    case "dc":
    case "learn":
    case "Learn":
      y = "learn";
      break;
    case "atr":
    case "ATR":
    case "Atr":
      y = "atr";
      break;
    case "Time":
    case "time":
      y = "time";
      break;
    case "diff":
    case "Diff":
    case "difficult":
    case "CR":
    case "cr":
      y = "diff";
      break;
    case "image":
    case "Image":
    case "img":
    case "IMG":
    case "Img":
      y = "image";
      break;
    default:
      y = "name";
      break;
    }
    return aw.hair[x][y];
  },
  // returns twee to create hairstylist choose style stuff
  stylist(hairstyle: string): string|Error {
    if (!Object.keys(aw.hair).includes(hairstyle)) {
      return new ReferenceError(`Invalid hairstyle ${hairstyle} sent to stylist function!`);
    }
    let msg = `styles your hair while you pay attention and ask the occasional question. You don't always understand what's going on, but you try to learn anyway. @@.change;Your hair is now in a ${aw.hair[hairstyle].name}.@@ `;
    if (ↂ.pc.groom.hairLength >= aw.hair[hairstyle].min && ↂ.pc.groom.hairLength <= aw.hair[hairstyle].max) {
      setup.statusLoad();
      ↂ.pc.groom.hairStyle = hairstyle;
      if (ↂ.hairStyle.includes(hairstyle)) {// already know style
        msg += "@@.import;You already knew this hairstyle.@@";
      } else {
        setup.SCfunc("art", aw.hair[hairstyle].learn);
        const res = State.active.variables.SCresult.pop();
        const tex = State.active.variables.SCtext.pop();
        if (res) {
          ↂ.hairStyle.push(hairstyle);
          msg += `@@.good;You learned the ${aw.hair[hairstyle].name} hairstyle!@@ ${tex}`;
        } else {
          msg += `@@.bad;You failed to learn the ${aw.hair[hairstyle].name} hairstyle.@@ ${tex}`;
        }
      }
      setup.statusSave();
      setup.time.add((aw.hair[hairstyle].time * 2));
    } else {
      const fuk = (ↂ.pc.groom.hairLength > aw.hair[hairstyle].max) ? "long" : "short";
      msg = `Unfortunately, your hair was too ${fuk} to work for a ${aw.hair[hairstyle].name} hairstyle.`;
    }
    return msg;
  },
  // equips the hairstyle
  do(hairstyle: string): string|Error {
    if (!Object.keys(aw.hair).includes(hairstyle)) {
      return new ReferenceError(`Invalid hairstyle ${hairstyle} sent to hair.do function!`);
    }
    let msg;
    if (ↂ.pc.groom.hairLength < aw.hair[hairstyle].min || ↂ.pc.groom.hairLength > aw.hair[hairstyle].max) {
      setup.statusLoad();
      ↂ.pc.groom.hairStyle = "messy";
      setup.statusSave();
      setup.time.add(Math.round(aw.hair[hairstyle].time * 1.5));
      return `Your hair isn't the right length for the ${aw.hair[hairstyle].name} style, so you ended up making a mess of your hair.`;
    } else if (ↂ.pc.groom.hairStyle === hairstyle) {// if already have this hairstyle
      setup.time.add(Math.floor(aw.hair[hairstyle].time / 2));
      return `You quickly touch up your ${aw.hair[hairstyle].name} hairstyle.`;
    }
    let res;
    let tex;
    if (ↂ.skill.art >= aw.hair[hairstyle].autoPass) {
      res = true;
      tex = "<span class='good'>[skill autopass]</span>";
    } else if (aw.chad.hair) {
      res = true;
      tex = "<span class='ship'>[cheat]</span>";
    } else {
      setup.SCfunc("art", aw.hair[hairstyle].diff); // check to see if dif passed
      res = State.active.variables.SCresult.pop();
      tex = State.active.variables.SCtext.pop();
    }
    if (res) {
      setup.statusLoad();
      ↂ.pc.groom.hairStyle = hairstyle;
      State.active.variables.AW.pcPortrait = setup.porn.femaleNPC(ↂ.pc, true);
      setup.statusSave();
      setup.time.add(aw.hair[hairstyle].time);
      msg = `You take <span class="monospace white">${aw.hair[hairstyle].time}</span> minutes to style your hair so it ${setup.hair.prop("sDesc")}. ${tex}`; // example, 2 ways to do same thing.
    } else {
      setup.statusLoad();
      ↂ.pc.groom.hairStyle = "fail";
      State.active.variables.AW.pcPortrait = setup.porn.femaleNPC(ↂ.pc, true);
      setup.statusSave();
      setup.time.add(Math.round(aw.hair[hairstyle].time * 1.5));
      msg = `You take <span class="monospace white">${Math.round(aw.hair[hairstyle].time * 1.5)}</span> minutes to style your hair into a ${aw.hair[hairstyle].name}, <span class="bad">but you fail and leave your hair a mess.</span> ${tex}`;
    }
    State.active.variables.AW.pcPortrait = setup.porn.femaleNPC(ↂ.pc, true);
    setup.statusSave();
    return msg;
  },
  // weakens/musses hair
  undo(): void {
    const x = ↂ.pc.groom.hairStyle;
    let y;
    switch (x) {
    case "neat":
      y = "unkempt";
      break;
    case "unkempt":
    case "messy":
      y = "messy";
      break;
    case "cumSoaked":
    case "cumStained":
    case "dirty":
    case "cumSplattered":
    case "cornrows":
    case "dreadlocks":
      y = x;
      break;
    default:
      y = "neat";
      break;
    }
    setup.statusLoad();
    ↂ.pc.groom.hairStyle = y;
    setup.statusSave();
  },
  // sets hairstyle to neat after shower unless gross style
  shower(): void {
    const arrr = ["cornrows", "dreadlocks", "messy"];
    if (!arrr.includes(ↂ.pc.groom.hairStyle)) {
      setup.statusLoad();
      ↂ.pc.groom.hairStyle = "neat";
      setup.statusSave();
    } else {
      setup.notify(`Your hair is still ${ↂ.pc.groom.hairStyle}.`);
    }
  },
  // prints hairstyle if below learn limit
  print(limit: number = 50): string {
    const keys = Object.keys(aw.hair);
    let res = "";
    for (let i = 0, c = keys.length; i < c; i++) {
      if (aw.hair[keys[i]].learn <= limit) {
        res += `<div id="${keys[i]}" class="hairstyle">${aw.hair[keys[i]].image}<b>${aw.capital(aw.hair[keys[i]].name)}</b> ${aw.hair[keys[i]].lDesc}</div>`;
      }
    }
    return res;
  },
  // returns twee for known hairstyles
  known(): string {
    const keys = ↂ.hairStyle;
    let res = "";
    for (let i = 0, c = keys.length; i < c; i++) {
      res += `<div id="${keys[i]}" class="hairstyle">${aw.hair[keys[i]].image}<b>${aw.capital(aw.hair[keys[i]].name)}</b> ${aw.hair[keys[i]].lDesc}</div>`;
    }
    return res;
  },
  // prints styles with button to learn
  printButton(cunt: string, limit: number= 50): string {
    const keys = Object.keys(aw.hair);
    let res = "";
    for (let i = 0, c = keys.length; i < c; i++) {
      if (aw.hair[keys[i]].learn <= limit && !ↂ.hairStyle.includes(keys[i])) {
        res += `<div id="${keys[i]}" class="hairstyle" style="height:135px;">${aw.hair[keys[i]].image}<<button "${aw.capital(aw.hair[keys[i]].name)}">><<replace "${cunt}">><<print setup.hair.stylist("${keys[i]}")>><</replace>><<updatebar>><</button>> ${aw.hair[keys[i]].lDesc}</div>`;
      }
    }
    return res;
  },
  // returns twee to equip hairstyle
  printWear(): string {
    const keys = ↂ.hairStyle;
    let res = "";
    for (let i = 0, c = keys.length; i < c; i++) {
      res += `<div id="${keys[i]}" class="hairstyle" style="height:135px;display:inline-block;">${aw.hair[keys[i]].image}<<button "${aw.capital(aw.hair[keys[i]].name)}">><<notify>><<print setup.hair.do("${keys[i]}")>><</notify>><</button>> ${aw.hair[keys[i]].lDesc}</div>`;
    }
    return res;
  },
  doSet(set: string): any {
    const style = ↂ.pc.groom.hairSets[set];
    return setup.hair.do(style);
  },
};

aw.hair = {};
(function() {
  const style = {
    fail: {
      name: "failed style",
      key: "fail",
      sDesc: "is a complete mess",
      lDesc: "",
      learn: 0,
      atr: -5,
      time: 5,
      diff: 0,
      image: false,
      max: 99,
      min: 0,
    },
    neat: {
      name: "neat",
      key: "neat",
      sDesc: "is neatly brushed",
      lDesc: "",
      learn: 9,
      atr: -1,
      time: 5,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    unkempt: {
      name: "unkempt",
      key: "unkempt",
      sDesc: "is somewhat unkempt",
      lDesc: "",
      learn: 6,
      atr: -3,
      time: 3,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    messy: {
      name: "messy",
      key: "messy",
      sDesc: "is very messy",
      lDesc: "",
      learn: 3,
      atr: -5,
      time: 1,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    frenchBun: {
      name: "French bun",
      key: "frenchBun",
      sDesc: "is up in a french bun",
      lDesc: "",
      learn: 18,
      atr: 3,
      time: 15,
      diff: 8,
      image: false,
      max: 99,
      min: 0,
    },
    frenchTwist: {
      name: "French twist",
      key: "frenchTwist",
      sDesc: "is up in a french twist",
      lDesc: "",
      learn: 21,
      atr: 4,
      time: 15,
      diff: 11,
      image: false,
      max: 99,
      min: 0,
    },
    twistedBun: {
      name: "twisted bun",
      key: "twistedBun",
      sDesc: "is up in a twisted bun",
      lDesc: "",
      learn: 18,
      atr: 3,
      time: 15,
      diff: 8,
      image: false,
      max: 99,
      min: 0,
    },
    chigonBun: {
      name: "chigon bun",
      key: "chigonBun",
      sDesc: "is up in a chigon bun",
      lDesc: "",
      learn: 17,
      atr: 2,
      time: 13,
      diff: 7,
      image: false,
      max: 99,
      min: 0,
    },
    looseBun: {
      name: "loose bun",
      key: "looseBun",
      sDesc: "is up in a loose bun",
      lDesc: "",
      learn: 14,
      atr: 1,
      time: 10,
      diff: 4,
      image: false,
      max: 99,
      min: 0,
    },
    bobbed: {
      name: "bobbed",
      key: "bobbed",
      sDesc: "is bobbed",
      lDesc: "",
      learn: 15,
      atr: 2,
      time: 10,
      diff: 5,
      image: false,
      max: 99,
      min: 0,
    },
    braided: {
      name: "braided",
      key: "braided",
      sDesc: "is braided",
      lDesc: "",
      learn: 13,
      atr: 1,
      time: 15,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    putUp: {
      name: "put up",
      key: "putUp",
      sDesc: "is put up in a loose updo",
      lDesc: "",
      learn: 13,
      atr: 1,
      time: 10,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    fingerWave: {
      name: "finger wave",
      key: "fingerWave",
      sDesc: "is in a classic finger wave",
      lDesc: "",
      learn: 20,
      atr: 4,
      time: 15,
      diff: 10,
      image: false,
      max: 99,
      min: 0,
    },
    bouffant: {
      name: "bouffant",
      key: "bouffant",
      sDesc: "is a volumous bouffant",
      lDesc: "",
      learn: 19,
      atr: 3,
      time: 20,
      diff: 9,
      image: false,
      max: 99,
      min: 0,
    },
    featheredFlip: {
      name: "feathered flip",
      key: "featheredFlip",
      sDesc: "has a feathered flip",
      lDesc: "",
      learn: 15,
      atr: 2,
      time: 15,
      diff: 5,
      image: false,
      max: 99,
      min: 0,
    },
    libertySpikes: {
      name: "liberty spikes",
      key: "libertySpikes",
      sDesc: "is styled into large spikes",
      lDesc: "",
      learn: 13,
      atr: 1,
      time: 15,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    cornrows: {
      name: "cornrows",
      key: "cornrows",
      sDesc: "is braided into cornrows",
      lDesc: "",
      learn: 15,
      atr: 0,
      time: 30,
      diff: 5,
      image: false,
      max: 99,
      min: 0,
    },
    dreadlocks: {
      name: "dreadlocks",
      key: "dreadlocks",
      sDesc: "is a messy mass of dreadlocks",
      lDesc: "",
      learn: 13,
      atr: -4,
      time: 30,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    sallyShag: {
      name: "sally shag",
      key: "sallyShag",
      sDesc: "is in a classic sally shag",
      lDesc: "",
      learn: 18,
      atr: 3,
      time: 15,
      diff: 8,
      image: false,
      max: 99,
      min: 0,
    },
    retroWaves: {
      name: "retro waves",
      key: "retroWaves",
      sDesc: "has stylish retro waves",
      lDesc: "",
      learn: 20,
      atr: 4,
      time: 20,
      diff: 10,
      image: false,
      max: 99,
      min: 0,
    },
    highTopknot: {
      name: "high topknot",
      key: "highTopknot",
      sDesc: "is up in a high topnot",
      lDesc: "",
      learn: 14,
      atr: 1,
      time: 10,
      diff: 4,
      image: false,
      max: 99,
      min: 0,
    },
    lowTopknot: {
      name: "low topknot",
      key: "lowTopknot",
      sDesc: "is pulled into a topnot",
      lDesc: "",
      learn: 13,
      atr: 1,
      time: 10,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    highPonytail: {
      name: "high ponytail",
      key: "highPonytail",
      sDesc: "is up in a high ponytail",
      lDesc: "",
      learn: 11,
      atr: 0,
      time: 10,
      diff: 2,
      image: false,
      max: 99,
      min: 0,
    },
    ponytail: {
      name: "ponytail",
      key: "ponytail",
      sDesc: "is up in a ponytail",
      lDesc: "",
      learn: 10,
      atr: 0,
      time: 10,
      diff: 1,
      image: false,
      max: 99,
      min: 0,
    },
    flowery: {
      name: "flowery waves",
      key: "flowery",
      sDesc: "is pulled back and hangs down in flowery waves",
      lDesc: "",
      learn: 22,
      atr: 0,
      time: 25,
      diff: 12,
      image: false,
      max: 99,
      min: 0,
    },
    fishtailBraid: {
      name: "fishtail braid",
      key: "fishtailBraid",
      sDesc: "is in an elegant fishtail braid",
      lDesc: "",
      learn: 20,
      atr: 4,
      time: 20,
      diff: 10,
      image: false,
      max: 99,
      min: 0,
    },
    braidedUpdo: {
      name: "braided updo",
      key: "braidedUpdo",
      sDesc: "is pulled up in a braided updo",
      lDesc: "",
      learn: 19,
      atr: 3,
      time: 20,
      diff: 9,
      image: false,
      max: 99,
      min: 0,
    },
    centerPart: {
      name: "center part",
      key: "centerPart",
      sDesc: "is parted in the center",
      lDesc: "",
      learn: 12,
      atr: 0,
      time: 10,
      diff: 2,
      image: false,
      max: 99,
      min: 0,
    },
    flaredBottom: {
      name: "flared bottom",
      key: "flaredBottom",
      sDesc: "hangs naturally with a flair at the bottom",
      lDesc: "",
      learn: 14,
      atr: 1,
      time: 15,
      diff: 5,
      image: false,
      max: 99,
      min: 0,
    },
    spiralCurls: {
      name: "spiral curls",
      key: "spiralCurls",
      sDesc: "hangs down in spiraling curls",
      lDesc: "",
      learn: 18,
      atr: 3,
      time: 20,
      diff: 8,
      image: false,
      max: 99,
      min: 0,
    },
    curled: {
      name: "curled",
      key: "curled",
      sDesc: "hangs loosely in medium curls",
      lDesc: "",
      learn: 13,
      atr: 1,
      time: 20,
      diff: 3,
      image: false,
      max: 99,
      min: 0,
    },
    tightCurl: {
      name: "tight curls",
      key: "tightCurl",
      sDesc: "is bouncy with tight curls",
      lDesc: "",
      learn: 14,
      atr: 1,
      time: 25,
      diff: 5,
      image: false,
      max: 99,
      min: 0,
    },
    looseCurl: {
      name: "loose curls",
      key: "looseCurl",
      sDesc: "hangs naturally in loose curls",
      lDesc: "",
      learn: 15,
      atr: 2,
      time: 15,
      diff: 5,
      image: false,
      max: 99,
      min: 0,
    },
    smoothStraight: {
      name: "smooth and straight",
      key: "smoothStraight",
      sDesc: "hangs down very smooth and straight",
      lDesc: "",
      learn: 12,
      atr: 1,
      time: 10,
      diff: 2,
      image: false,
      max: 99,
      min: 0,
    },
    shagStraight: {
      name: "straight shag",
      key: "shagStraight",
      sDesc: "looks slightly ruffled as it hangs naturally",
      lDesc: "",
      learn: 17,
      atr: 2,
      time: 15,
      diff: 7,
      image: false,
      max: 99,
      min: 0,
    },
    pigtails: {
      name: "pigtails",
      key: "pigtails",
      sDesc: "is pulled into pigtails",
      lDesc: "",
      learn: 12,
      atr: 1,
      time: 10,
      diff: 2,
      image: false,
      max: 99,
      min: 0,
    },
    sideSweptUpdo: {
      name: "side-swept updo",
      key: "sideSweptUpdo",
      sDesc: "is in a side-swept updo",
      lDesc: "",
      learn: 16,
      atr: 2,
      time: 12,
      diff: 6,
      image: false,
      max: 99,
      min: 0,
    },
    sideBraid: {
      name: "side braid",
      key: "sideBraid",
      sDesc: "is in an off-center braid",
      lDesc: "",
      learn: 14,
      atr: 1,
      time: 18,
      diff: 5,
      image: false,
      max: 99,
      min: 0,
    },
    sidePonytail: {
      name: "side ponytail",
      key: "sidePonytail",
      sDesc: "is in an off-center ponytail",
      lDesc: "",
      learn: 11,
      atr: 0,
      time: 10,
      diff: 2,
      image: false,
      max: 99,
      min: 0,
    },
  };
  const keys = Object.keys(style);
  const n = keys.length;
  for (let i = 0; i < n; i++) {
    aw.hair[keys[i]] = new Hairstyle(style[keys[i]]);
  }
})();

