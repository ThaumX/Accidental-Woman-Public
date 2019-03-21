/*
/* ███╗   ███╗ █████╗ ██╗  ██╗███████╗
/* ████╗ ████║██╔══██╗██║ ██╔╝██╔════╝
/* ██╔████╔██║███████║█████╔╝ █████╗
/* ██║╚██╔╝██║██╔══██║██╔═██╗ ██╔══╝
/* ██║ ╚═╝ ██║██║  ██║██║  ██╗███████╗
/* ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
/*
/*  ██╗████████╗    ██╗   ██╗██████╗
/*  ██║╚══██╔══╝    ██║   ██║██╔══██╗
/*  ██║   ██║       ██║   ██║██████╔╝
/*  ██║   ██║       ██║   ██║██╔═══╝
/*  ██║   ██║       ╚██████╔╝██║
/*  ╚═╝   ╚═╝        ╚═════╝ ╚═╝
*/

interface setupMakeup {
  calc: () => void;
  wash: () => string;
  smear: () => void;
  shower: () => void;
  applySet: (set: string) => string;
}

aw.makeup = {
  eye: {},
  lip: {},
  gen: {},
};

class EyeMakeup {
  public key: string;
  public name: string;
  public short: string;
  public long: string;
  public learn: number;
  public atr: number;
  public thick: number;
  public garish: number;
  public sexy: number;
  public time: number;
  public diff: number;
  public autoPass: number;
  public image: string|boolean;
  constructor({name, key, short = "makeup", long = "", learn = 10, atr = 0, time = 5, diff = 10, autoPass = 50, image = false, thick = 0, garish = 0, sexy = 0}: {name: string, key: string, short: string, long: string, learn: number, atr: number, thick: number, garish: number, sexy: number, time: number, autoPass: number, diff: number, image: string|boolean}) {
    this.key = key;
    this.name = name;
    this.short = short;
    if (long === "") {
      this.long = "A proper description for this makeup is pending.";
    } else {
      this.long = long;
    }
    this.learn = learn;
    this.atr = atr;
    this.thick = thick;
    this.garish = garish;
    this.sexy = sexy;
    this.time = time;
    this.diff = diff;
    this.autoPass = autoPass;
    if (!image) {
      this.image = "IMGplaceholder75";
    } else {
      this.image = image;
    }
  }
  public putOn() {
    if (!ↂ.makeup.eye.includes(this.key)) {
      setup.notify(`You don't know how to do ${this.name} makeup`);
      return false;
    }
    let msg;
    let tim = this.time;
    if (ↂ.pc.groom.eyeMU === this.key) {// if already have this hairstyle
      if (this.name === "none") {
        return "You're not wearing any eye makeup.";
      }
      setup.time.add(Math.floor(tim / 2));
      return `You quickly touch up your ${this.name} makeup.`;
    } else if (ↂ.pc.groom.eyeMU !== "none") {
      tim += random(3, 5);
      msg = "First carefully removing the old makeup, you ";
    } else {
      msg = "You ";
    }
    let res;
    let tex;
    if (ↂ.skill.art >= this.autoPass) {
      res = true;
      tex = "<span class='good'>[skill autopass]</span>";
    } else if (aw.chad.makeup) {
      res = true;
      tex = "<span class='ship'>[cheat]</span>";
    } else {
      setup.SCfunc("art", this.diff); // check to see if diff passed
      res = State.active.variables.SCresult.pop();
      tex = State.active.variables.SCtext.pop();
    }
    if (res) {
      setup.statusLoad();
      ↂ.pc.groom.eyeMU = this.key;
      setup.statusSave();
      setup.time.add(tim);
      msg += `take <span class="monospace white">${tim}</span> minutes to put ${this.name} on your face. ${tex}`;
    } else {
      setup.statusLoad();
      ↂ.pc.groom.eyeMU = "fail";
      setup.statusSave();
      setup.time.add(Math.round((this.time * 0.5) + tim));
      msg += `take <span class="monospace white">${Math.round((this.time * 0.5) + tim)}</span> minutes to attempt the ${this.name} style, <span class="bad">but it didn't turn out very well.</span> ${tex}`;
    }
    setup.makeup.calc();
    return msg;
  }
  public learnIt() {
    if (ↂ.makeup.eye.includes(this.key)) {
      return `You already know how to do ${this.name} makeup.`;
    }
    let msg = `applies makeup while you pay attention and ask the occasional question. You don't always understand what's going on, but you try to learn anyway. @@.change;Your eyes now have ${this.name} makeup.@@ `;
    setup.statusLoad();
    ↂ.pc.groom.eyeMU = this.key;
    setup.statusSave();
    setup.time.add((this.time * 2));
    setup.SCfunc("art", this.learn);
    const res = State.active.variables.SCresult.pop();
    const tex = State.active.variables.SCtext.pop();
    if (res) {
      ↂ.makeup.eye.push(this.key);
      msg += `@@.good;You learned the ${this.name} makeup style!@@ ${tex}`;
    } else {
      msg += `@@.bad;You failed to learn the ${this.name} makeup style.@@ ${tex}`;
    }
    return msg;
  }
  public print() {
    return `<div id="eye-${this.key}" class="makeup"><img id="eyeIMG-${this.key}" data-passage="${this.image}" class="makeup"><b>${aw.capital(this.name)}</b> ${this.long}</div>`;
  }
  public button(cmd) {
    return `<div id="eye-${this.key}" class="makeup"><img id="eyeIMG-${this.key}" data-passage="${this.image}" class="makeup"><<button "${aw.capital(this.name)}">>${cmd}<</button>> ${this.long}</div>`;
  }
}

class LipMakeup {
  public key: string;
  public name: string;
  public short: string;
  public long: string;
  public learn: number;
  public atr: number;
  public thick: number;
  public garish: number;
  public sexy: number;
  public time: number;
  public diff: number;
  public autoPass: number;
  public image: string | boolean;
  constructor({ name, key, short = "makeup", long = "", learn = 10, atr = 0, time = 5, diff = 10, autoPass = 50, image = false, thick = 0, garish = 0, sexy = 0 }: { name: string, key: string, short: string, long: string, learn: number, atr: number, thick: number, garish: number, sexy: number, time: number, autoPass: number, diff: number, image: string | boolean }) {
    this.key = key;
    this.name = name;
    this.short = short;
    if (long === "") {
      this.long = "A proper description for this makeup is pending.";
    } else {
      this.long = long;
    }
    this.learn = learn;
    this.atr = atr;
    this.thick = thick;
    this.garish = garish;
    this.sexy = sexy;
    this.time = time;
    this.diff = diff;
    this.autoPass = autoPass;
    if (!image) {
      this.image = "IMGplaceholder75";
    } else {
      this.image = image;
    }
  }
  public putOn() {
    if (!ↂ.makeup.lip.includes(this.key)) {
      setup.notify(`You don't know how to do ${this.name} makeup`);
      return false;
    }
    let msg;
    let tim = this.time;
    if (ↂ.pc.groom.lipMU === this.key) {// if already have this hairstyle
      if (this.name === "none") {
        return "You're not wearing any lip makeup.";
      }
      setup.time.add(Math.floor(tim / 2));
      return `You quickly touch up your ${this.name} makeup.`;
    } else if (ↂ.pc.groom.lipMU !== "none") {
      tim += random(3, 5);
      msg = "First carefully removing the old makeup, you ";
    } else {
      msg = "You ";
    }
    let res;
    let tex;
    if (ↂ.skill.art >= this.autoPass) {
      res = true;
      tex = "<span class='good'>[skill autopass]</span>";
    } else if (aw.chad.makeup) {
      res = true;
      tex = "<span class='ship'>[cheat]</span>";
    } else {
      setup.SCfunc("art", this.diff); // check to see if diff passed
      res = State.active.variables.SCresult.pop();
      tex = State.active.variables.SCtext.pop();
    }
    if (res) {
      setup.statusLoad();
      ↂ.pc.groom.lipMU = this.key;
      setup.statusSave();
      setup.time.add(tim);
      msg += `take <span class="monospace white">${tim}</span> minutes to put ${this.name} on your face. ${tex}`;
    } else {
      setup.statusLoad();
      ↂ.pc.groom.lipMU = "fail";
      setup.statusSave();
      setup.time.add(Math.round((this.time * 0.5) + tim));
      msg += `take <span class="monospace white">${Math.round((this.time * 0.5) + tim)}</span> minutes to attempt the ${this.name} style, <span class="bad">but it didn't turn out very well.</span> ${tex}`;
    }
    setup.makeup.calc();
    return msg;
  }
  public learnIt() {
    if (ↂ.makeup.lip.includes(this.key)) {
      return `You already know how to do ${this.name} makeup.`;
    }
    let msg = `applies makeup while you pay attention and ask the occasional question. You don't always understand what's going on, but you try to learn anyway. @@.change;Your lips now have ${this.name} makeup.@@ `;
    setup.statusLoad();
    ↂ.pc.groom.lipMU = this.key;
    setup.statusSave();
    setup.time.add((this.time * 2));
    setup.SCfunc("art", this.learn);
    const res = State.active.variables.SCresult.pop();
    const tex = State.active.variables.SCtext.pop();
    if (res) {
      ↂ.makeup.lip.push(this.key);
      msg += `@@.good;You learned the ${this.name} makeup style!@@ ${tex}`;
    } else {
      msg += `@@.bad;You failed to learn the ${this.name} makeup style.@@ ${tex}`;
    }
    return msg;
  }
  public print() {
    return `<div id="lip-${this.key}" class="makeup"><img id="lipIMG-${this.key}" data-passage="${this.image}" class="makeup"><b>${aw.capital(this.name)}</b> ${this.long}</div>`;
  }
  public button(cmd) {
    return `<div id="lip-${this.key}" class="makeup"><img id="lipIMG-${this.key}" data-passage="${this.image}" class="makeup"><<button "${aw.capital(this.name)}">>${cmd}<</button>> ${this.long}</div>`;
  }
}

class GenMakeup {
  public key: string;
  public name: string;
  public short: string;
  public long: string;
  public learn: number;
  public atr: number;
  public thick: number;
  public garish: number;
  public sexy: number;
  public time: number;
  public diff: number;
  public autoPass: number;
  public image: string | boolean;
  constructor({ name, key, short = "makeup", long = "", learn = 10, atr = 0, time = 5, diff = 10, autoPass = 50, image = false, thick = 0, garish = 0, sexy = 0 }: { name: string, key: string, short: string, long: string, learn: number, atr: number, thick: number, garish: number, sexy: number, time: number, autoPass: number, diff: number, image: string | boolean }) {
    this.key = key;
    this.name = name;
    this.short = short;
    if (long === "") {
      this.long = "A proper description for this makeup is pending.";
    } else {
      this.long = long;
    }
    this.learn = learn;
    this.atr = atr;
    this.thick = thick;
    this.garish = garish;
    this.sexy = sexy;
    this.time = time;
    this.diff = diff;
    this.autoPass = autoPass;
    if (!image) {
      this.image = "IMGplaceholder75";
    } else {
      this.image = image;
    }
  }
  public putOn() {
    if (!ↂ.makeup.gen.includes(this.key)) {
      setup.notify(`You don't know how to do ${this.name} makeup`);
      return false;
    }
    let msg;
    let tim = this.time;
    if (ↂ.pc.groom.genMU === this.key) {// if already have this makeup
      if (this.name === "none") {
        return "You're not wearing any foundation or blush.";
      }
      setup.time.add(Math.floor(tim / 2));
      return `You quickly touch up your ${this.name} makeup.`;
    } else if (ↂ.pc.groom.genMU !== "none") {
      tim += random(3, 5);
      msg = "First carefully removing the old makeup, you ";
    } else {
      msg = "You ";
    }
    let res;
    let tex;
    if (ↂ.skill.art >= this.autoPass) {
      res = true;
      tex = "<span class='good'>[skill autopass]</span>";
    } else if (aw.chad.makeup) {
      res = true;
      tex = "<span class='ship'>[cheat]</span>";
    } else {
      setup.SCfunc("art", this.diff); // check to see if diff passed
      res = State.active.variables.SCresult.pop();
      tex = State.active.variables.SCtext.pop();
    }
    if (res) {
      setup.statusLoad();
      ↂ.pc.groom.genMU = this.key;
      setup.statusSave();
      setup.time.add(tim);
      msg += `take <span class="monospace white">${tim}</span> minutes to put ${this.name} on your face. ${tex}`;
    } else {
      setup.statusLoad();
      ↂ.pc.groom.genMU = "fail";
      setup.statusSave();
      setup.time.add(Math.round((this.time * 0.5) + tim));
      msg += `take <span class="monospace white">${Math.round((this.time * 0.5) + tim)}</span> minutes to attempt the ${this.name} style, <span class="bad">but it didn't turn out very well.</span> ${tex}`;
    }
    setup.makeup.calc();
    return msg;
  }
  public learnIt() {
    if (ↂ.makeup.gen.includes(this.key)) {
      return `You already know how to do ${this.name} makeup.`;
    }
    let msg = `applies makeup while you pay attention and ask the occasional question. You don't always understand what's going on, but you try to learn anyway. @@.change;Your face now has ${this.name} makeup.@@ `;
    setup.statusLoad();
    ↂ.pc.groom.genMU = this.key;
    setup.statusSave();
    setup.time.add((this.time * 2));
    setup.SCfunc("art", this.learn);
    const res = State.active.variables.SCresult.pop();
    const tex = State.active.variables.SCtext.pop();
    if (res) {
      ↂ.makeup.gen.push(this.key);
      msg += `@@.good;You learned the ${this.name} makeup style!@@ ${tex}`;
    } else {
      msg += `@@.bad;You failed to learn the ${this.name} makeup style.@@ ${tex}`;
    }
    return msg;
  }
  public print() {
    return `<div id="gen-${this.key}" class="makeup"><img id="genIMG-${this.key}" data-passage="${this.image}" class="makeup"><b>${aw.capital(this.name)}</b> ${this.long}</div>`;
  }
  public button(cmd) {
    return `<div id="gen-${this.key}" class="makeup"><img id="genIMG-${this.key}" data-passage="${this.image}" class="makeup"><<button "${aw.capital(this.name)}">>${cmd}<</button>> ${this.long}</div>`;
  }
}

setup.makeup = {
  // Calculates the cumulative effect of different makeups
  calc(): void {
    const eye = aw.makeup.eye[ↂ.pc.groom.eyeMU];
    const lip = aw.makeup.lip[ↂ.pc.groom.lipMU];
    const gen = aw.makeup.gen[ↂ.pc.groom.genMU];
    let garish = Math.round(((gen.garish * 1.5) + eye.garish + (lip.garish / 2)) / 3); // Range 1-5
    let thick = Math.round(((gen.thick * 1.5) + eye.thick + (lip.thick / 2)) / 3); // range 1-5
    let sexy = Math.round(((gen.sexy / 2) + eye.sexy + (lip.sexy * 1.5)) / 3); // Has a range of -3 to 3
    let atr = Math.round((eye.atr + lip.atr + gen.atr) / 2);
    if (garish > 5) {garish = 5; } else if (garish < 1) {garish = 1; }
    if (thick > 5) {thick = 5; } else if (thick < 1) {thick = 1; }
    if (sexy > 3) {sexy = 3; } else if (sexy < -2) {sexy = -2; }
    let fail = 0;
    fail += (eye.key === "fail") ? 1 : 0;
    fail += (lip.key === "fail") ? 1 : 0;
    fail += (gen.key === "fail") ? 1 : 0;
    if (fail >= 2 || ((thick === 5 || garish === 5) && fail >= 1)) {// clownin'
      setup.statusLoad();
      ↂ.pc.groom.makeup.clown = true;
      ↂ.pc.groom.makeup.type = "clown";
      ↂ.pc.groom.makeup.atr = -5;
      ↂ.pc.groom.makeup.sexy = 0;
      ↂ.pc.groom.makeup.desc = "is so poorly made up it looks clownish.";
      setup.statusSave();
      return;
    }
    let type;
    const desc: string[] = [];
    switch (garish) {
    case 1:
      desc.push("barely noticeable");
      if (thick > 2 && thick < 3) {atr += 1; }
      break;
    case 2:
      desc.push("subdued");
      break;
    case 3:
      desc.push("obvious");
      break;
    case 4:
      desc.push("loud");
      atr -= 1;
      break;
    case 5:
      desc.push("garish");
      atr -= 2;
      break;
    }
    switch (thick) {
    case 1:
      desc.push("very light");
      break;
    case 2:
      desc.push("light");
      break;
    case 3:
      desc.push("moderate");
      break;
    case 4:
      desc.push("heavy");
      atr -= 1;
      break;
    case 5:
      desc.push("thick");
      atr -= 2;
      break;
    }
    if (atr > 5) {atr = 5; }
    const x = Math.ceil((garish + thick) / 2);
    if (x > 4 && sexy < 0) {
      sexy = 0;
      atr -= 2;
    } else if (x > 2 && sexy < 0) {
      sexy += 1;
      atr -= 1;
    } else if (x > 3 && sexy === 0) {
      sexy += 1;
      atr += (x === 4) ? 1 : 0;
    }
    switch (sexy) {
    case -2:
      desc.push("cute");
      type = "cute";
      break;
    case -1:
      desc.push("slightly cute");
      type = "cute";
      break;
    case 0:
      if (atr < 4 && x < 4) {
        desc.push("professional");
        type = "neutral";
      } else if (x > 3 && atr < 4) {
        desc.push("fake");
        type = "fake";
      } else if (atr > 3 && x < 4) {
        desc.push("girl-next-door");
        type = "neutral";
      } else {
        desc.push("valley girl");
        type = "bimbo";
      }
      break;
    case 1:
      if (x >= 4 && atr < 4) {
        desc.push("plastic");
        type = "fake";
      } else if (x >= 4) {
        desc.push("sorority girl");
        type = "bimbo";
      } else {
        desc.push("alluring");
        type = "neutral";
      }
      break;
    case 2:
      if (x >= 4 && atr < 2) {
        desc.push("skank-like");
        type = "slut";
      } else if (x >= 4 && atr < 4) {
        desc.push("slutty");
        type = "slut";
      } else if (x >= 4) {
        desc.push("bimbo");
        type = "bimbo";
      } else if (atr > 3) {
        desc.push("seductive");
        type = "sexy";
      } else if (atr > 1) {
        desc.push("sexy");
        type = "sexy";
      } else {
        desc.push("somewhat slutty");
        type = "slut";
      }
      break;
    case 3:
      if (x >= 4) {
        if (atr > 3) {
          desc.push("whorish");
          type = "slut";
        } else if (atr > 1) {
          desc.push("very slutty");
          type = "slut";
        } else {
          desc.push("nympho-skank");
          type = "slut";
        }
      } else {
        if (atr >= 4 && x <= 2) {
          desc.push("mesmerizing");
          type = "sexy";
        } else if (atr >= 4) {
          desc.push("very sexy");
          type = "sexy";
        } else if (atr > 1) {
          desc.push("horny bimbo");
          type = "bimbo";
        } else {
          desc.push("free-use bimbo");
          type = "slut";
        }
      }
      break;
    }
    setup.statusLoad();
    ↂ.pc.groom.makeup.clown = false;
    ↂ.pc.groom.makeup.type = type;
    ↂ.pc.groom.makeup.look = desc[3];
    ↂ.pc.groom.makeup.atr = atr;
    ↂ.pc.groom.makeup.sexy = sexy;
    ↂ.pc.groom.makeup.desc = `is made up in a ${desc[0]} way with a ${desc[1]} application of makeup. Overall, you have a ${desc[3]} appearance.`;
    setup.statusSave();
    return;
  },
  // cleans face and sets all makeup to none
  wash(): string {
    setup.statusLoad();
    ↂ.pc.cond.face = {};
    ↂ.pc.groom.eyeMU = "none";
    ↂ.pc.groom.lipMU = "none";
    ↂ.pc.groom.genMU = "none";
    ↂ.pc.groom.makeup.clown = false;
    ↂ.pc.groom.makeup.atr = 0;
    ↂ.pc.groom.makeup.sexy = 0;
    ↂ.pc.groom.makeup.look = "none";
    ↂ.pc.groom.makeup.type = "none";
    ↂ.pc.groom.makeup.desc = "is free of makeup.";
    setup.statusSave();
    setup.time.add(random(4, 6));
    return "You wash your face, leaving it nice and clean.";
  },
  // smears makeup that is currently worn
  smear(): void {
    setup.statusLoad();
    ↂ.pc.groom.eyeMU = "smeared";
    ↂ.pc.groom.lipMU = "smeared";
    ↂ.pc.groom.genMU = "smeared";
    setup.statusSave();
    setup.makeup.calc();
  },
  // cleans face without adding time for use in shower
  shower(): void {
    setup.statusLoad();
    ↂ.pc.groom.eyeMU = "none";
    ↂ.pc.groom.lipMU = "none";
    ↂ.pc.groom.genMU = "none";
    ↂ.pc.groom.makeup.clown = false;
    ↂ.pc.groom.makeup.atr = 0;
    ↂ.pc.groom.makeup.sexy = 0;
    ↂ.pc.groom.makeup.look = "none";
    ↂ.pc.groom.makeup.type = "none";
    ↂ.pc.groom.makeup.desc = "is free of makeup.";
    setup.statusSave();
  },
  // applies a saved set of makeup
  applySet(set: string): string {
    const eye = ↂ.makeupSet[set][0];
    const lip = ↂ.makeupSet[set][1];
    const gen = ↂ.makeupSet[set][2];
    let output = "<p>";
    output += aw.makeup.eye[eye].putOn();
    output += "<br>";
    output += aw.makeup.lip[lip].putOn();
    output += "<br>";
    output += aw.makeup.gen[gen].putOn();
    output += "</p>";
    return output;
  },
};
aw.makeup.eye = {};
(function(): void {
  const eyes = {
    none: {
      name: "none",
      key: "none",
      short: "no eyeshadow",
      long: "no eyeshadow",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: 0,
      thick: 1,
      garish: 1,
      sexy: 0,
      image: "IMGmakeupNone",
    },
    smeared: {
      name: "smeared",
      key: "smeared",
      short: "smeared eyeshadow",
      long: "eye makeup that has been smeared all over",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: -3,
      thick: 2,
      garish: 5,
      sexy: 1,
      image: "IMGeyeSmeared",
    },
    fail: {
      name: "failed",
      key: "fail",
      short: "failed eyeshadow",
      long: "a complete failure at eye makeup",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: -5,
      thick: 2,
      garish: 5,
      sexy: 1,
      image: "IMGeyeFail",
    },
    cateye: {
      name: "cat",
      key: "cateye",
      short: "cat-like eyeshadow",
      long: "a feline-looking eyeshadow",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 5,
      atr: 2,
      thick: 3,
      garish: 4,
      sexy: 0,
      image: "IMGeyeCateye",
    },
    cutCreaseShadow: {
      name: "cut-crease",
      key: "cutCreaseShadow",
      short: "cut-crease eyeshadow",
      long: "eye shadow blended into the crease of the eye",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 5,
      atr: 1,
      thick: 3,
      garish: 2,
      sexy: 1,
      image: "IMGeyeCutcrease",
    },
    doubleWing: {
      name: "double wing",
      key: "doubleWing",
      short: "double wing eyeshadow",
      long: "bold eyeshadow in a classic seductive style",
      learn: 11,
      diff: 7,
      autopass: 50,
      time: 5,
      atr: 3,
      thick: 4,
      garish: 4,
      sexy: 3,
      image: "IMGeyeDoublewing",
    },
    gradient: {
      name: "gradient",
      key: "gradient",
      short: "gradient eyeshadow",
      long: "eyeshadow blended outward for a somewhat-subtle look",
      learn: 14,
      diff: 10,
      autopass: 80,
      time: 5,
      atr: 2,
      thick: 4,
      garish: 2,
      sexy: 1,
      image: "IMGeyeGradient",
    },
    graphicEyeliner: {
      name: "graphic",
      key: "graphicEyeliner",
      short: "graphic eyeliner",
      long: "colorful high-contrast eyeliner for a bold statement",
      learn: 11,
      diff: 7,
      autopass: 50,
      time: 5,
      atr: 1,
      thick: 4,
      garish: 5,
      sexy: -1,
      image: "IMGeyeGraphic",
    },
    heavyEyeliner: {
      name: "heavy",
      key: "heavyEyeliner",
      short: "heavy eyeliner",
      long: "a bold ring of eyeliner around the eye",
      learn: 9,
      diff: 5,
      autopass: 30,
      time: 5,
      atr: 2,
      thick: 4,
      garish: 3,
      sexy: 2,
      image: "IMGeyeHeavyeyeliner",
    },
    natural: {
      name: "natural",
      key: "natural",
      short: "natural-looking eyeshadow",
      long: "a carefully blended eyeshadow for the no-makeup look",
      learn: 14,
      diff: 10,
      autopass: 80,
      time: 5,
      atr: 2,
      thick: 2,
      garish: 1,
      sexy: 0,
      image: "IMGeyeNatural",
    },
    sharpEdged: {
      name: "sharp-edged",
      key: "sharpEdged",
      short: "sharp eyeshadow",
      long: "",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 5,
      atr: 2,
      thick: 3,
      garish: 3,
      sexy: 2,
      image: "IMGeyeSharpedged",
    },
    shimmery: {
      name: "shimmery",
      key: "shimmery",
      short: "shimmery eyeshadow",
      long: "eyeshadow with a healthy dose of glitter for a cute look",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 5,
      atr: 1,
      thick: 2,
      garish: 4,
      sexy: -1,
      image: "IMGeyeShimmery",
    },
    smokeyEyes: {
      name: "smokey",
      key: "smokeyEyes",
      short: "smokey eyes",
      long: "a sexy style that doesn't stand out too much",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 5,
      atr: 3,
      thick: 4,
      garish: 2,
      sexy: 3,
      image: "IMGeyeSmokey",
    },
  };
  const keys = Object.keys(eyes);
  const n = keys.length;
  for (let i = 0; i < n; i++) {
    aw.makeup.eye[keys[i]] = new EyeMakeup(eyes[keys[i]]);
  }
})();

aw.makeup.lip = {};
(function(): void {
  const lips = {
    none: {
      name: "none",
      key: "none",
      short: "no lipstick",
      long: "no lipstick",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: 0,
      thick: 1,
      garish: 1,
      sexy: 0,
      image: "IMGmakeupNone",
    },
    smeared: {
      name: "smeared lipstick",
      key: "smeared",
      short: "smeared lipstick",
      long: "lipstick (or gloss) that has been smeared around your face",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: -2,
      thick: 2,
      garish: 4,
      sexy: 1,
      image: "IMGlipSmeared",
    },
    fail: {
      name: "fail",
      key: "fail",
      short: "makeup fail",
      long: "a complete failure at makeup application",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: -5,
      thick: 3,
      garish: 5,
      sexy: 0,
      image: "IMGlipFail",
    },
    chapstick: {
      name: "chapstick",
      key: "chapstick",
      short: "",
      long: "simple chapstick for moist-looking lips.",
      learn: 8,
      diff: 4,
      autopass: 20,
      time: 5,
      atr: 0,
      thick: 2,
      garish: 1,
      sexy: -1,
      image: "IMGlipChapstick",
    },
    lipGloss: {
      name: "lip gloss",
      key: "lipGloss",
      short: "glossy lips",
      long: "lip gloss for shiny-wet lips.",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 5,
      atr: 1,
      thick: 4,
      garish: 4,
      sexy: 2,
      image: "IMGlipLipgloss",
    },
    satinLipstick: {
      name: "satin lipstick",
      key: "satinLipstick",
      short: "satin lipstick",
      long: "satin lipstick for a classic appearance.",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 5,
      atr: 1,
      thick: 4,
      garish: 3,
      sexy: 1,
      image: "IMGlipSatin",
    },
    matteLipstick: {
      name: "matte lipstick",
      key: "matteLipstick",
      short: "matte lipstick",
      long: "matte lipstick for a slightly more conservative look.",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 5,
      atr: 1,
      thick: 3,
      garish: 2,
      sexy: 0,
      image: "IMGlipMatte",
    },
    liquidLipstick: {
      name: "liquid lipstick",
      key: "liquidLipstick",
      short: "liquid lipstick",
      long: "liquid lipstick for plumper-looking lips.",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 5,
      atr: 3,
      thick: 5,
      garish: 3,
      sexy: 3,
      image: "IMGlipLiquid",
    },
    creamMatteLipstick: {
      name: "cream matte lipstick",
      key: "creamMatteLipstick",
      short: "cream lipstick",
      long: "cream matte lipstick to make your lips look soft.",
      learn: 11,
      diff: 7,
      autopass: 50,
      time: 5,
      atr: 3,
      thick: 4,
      garish: 2,
      sexy: 1,
      image: "IMGlipMattecream",
    },
    pearlLipstick: {
      name: "pearlescent lipstick",
      key: "pearlLipstick",
      short: "shimmery lips",
      long: "pearlescent lipstick that catches the eye.",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 5,
      atr: 1,
      thick: 3,
      garish: 5,
      sexy: 2,
      image: "IMGlipPearl",
    },
    lipStain: {
      name: "lip stain",
      key: "lipStain",
      short: "stained lips",
      long: "lip stain that adds color while leaving the natural textue of your lips.",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 5,
      atr: 3,
      thick: 2,
      garish: 2,
      sexy: 1,
      image: "IMGlipLipstain",
    },
  };
  const keys = Object.keys(lips);
  const n = keys.length;
  for (let i = 0; i < n; i++) {
    aw.makeup.lip[keys[i]] = new LipMakeup(lips[keys[i]]);
  }
})();

aw.makeup.gen = {};
(function(): void {
  const eyes = {
    none: {
      name: "none",
      key: "none",
      short: "no makeup",
      long: "no makeup",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: 0,
      thick: 0,
      garish: 0,
      sexy: 0,
      image: "IMGmakeupNone",
    },
    smeared: {
      name: "smeared",
      key: "smeared",
      short: "smeared makeup",
      long: "smeared makeup",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: -2,
      thick: 2,
      garish: 4,
      sexy: 1,
      image: "IMGgenSmeared",
    },
    fail: {
      name: "fail",
      key: "fail",
      short: "failed makeup",
      long: "failed makeup",
      learn: 0,
      diff: 0,
      autopass: 0,
      time: 5,
      atr: -5,
      thick: 2,
      garish: 5,
      sexy: 0,
      image: "IMGgenFail",
    },
    natural: {
      name: "subtle natural",
      key: "natural",
      short: "subtle makeup",
      long: "a subtle application of makeup",
      learn: 14,
      diff: 10,
      autopass: 80,
      time: 20,
      atr: 2,
      thick: 2,
      garish: 1,
      sexy: 0,
      image: "IMGgenLight",
    },
    evening: {
      name: "alluring evening",
      key: "evening",
      short: "alluring evening",
      long: "alluring evening",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 20,
      atr: 2,
      thick: 3,
      garish: 4,
      sexy: 3,
      image: "IMGplaceholder75",
    },
    prom: {
      name: "flashy prom",
      key: "prom",
      short: "flashy prom",
      long: "flashy prom",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 20,
      atr: 2,
      thick: 4,
      garish: 4,
      sexy: 2,
      image: false,
    },
    formal: {
      name: "refined formal",
      key: "formal",
      short: "refined formal",
      long: "refined formal",
      learn: 12,
      diff: 8,
      autopass: 60,
      time: 20,
      atr: 1,
      thick: 4,
      garish: 3,
      sexy: 1,
      image: "IMGgenModerate",
    },
    gothic: {
      name: "stark gothic",
      key: "gothic",
      short: "stark gothic",
      long: "stark gothic",
      learn: 9,
      diff: 5,
      autopass: 30,
      time: 20,
      atr: 1,
      thick: 5,
      garish: 4,
      sexy: -1,
      image: "IMGplaceholder75",
    },
    minimal: {
      name: "light makeup",
      key: "minimal",
      short: "light makeup",
      long: "light makeup",
      learn: 13,
      diff: 9,
      autopass: 70,
      time: 20,
      atr: 3,
      thick: 2,
      garish: 2,
      sexy: 0,
      image: "IMGplaceholder75",
    },
    classic: {
      name: "50s glamour",
      key: "classic",
      short: "50s glamour",
      long: "50s glamour",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 20,
      atr: 3,
      thick: 4,
      garish: 3,
      sexy: 3,
      image: "IMGplaceholder75",
    },
    whorish: {
      name: "naughty bordello",
      key: "whorish",
      short: "",
      long: "",
      learn: 9,
      diff: 5,
      autopass: 50,
      time: 30,
      atr: 1,
      thick: 4,
      garish: 4,
      sexy: 3,
      image: "IMGgenSkank",
    },
    slut: {
      name: "hyper-sexualized",
      key: "slut",
      short: "hyper-sexualized",
      long: "hyper-sexualized",
      learn: 8,
      diff: 4,
      autopass: 20,
      time: 20,
      atr: 1,
      thick: 5,
      garish: 5,
      sexy: 3,
      image: "IMGgenHeavy",
    },
    bimbo: {
      name: "stereotypical bimbo",
      key: "bimbo",
      short: "stereotypical bimbo",
      long: "stereotypical bimbo",
      learn: 10,
      diff: 6,
      autopass: 40,
      time: 20,
      atr: 2,
      thick: 3,
      garish: 4,
      sexy: 2,
      image: "IMGgenBimbo",
    },
  };
  const keys = Object.keys(eyes);
  const n = keys.length;
  for (let i = 0; i < n; i++) {
    aw.makeup.gen[keys[i]] = new GenMakeup(eyes[keys[i]]);
  }
})();


