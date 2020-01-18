// ████████╗ █████╗ ████████╗████████╗ ██████╗  ██████╗
// ╚══██╔══╝██╔══██╗╚══██╔══╝╚══██╔══╝██╔═══██╗██╔═══██╗
//    ██║   ███████║   ██║      ██║   ██║   ██║██║   ██║
//    ██║   ██╔══██║   ██║      ██║   ██║   ██║██║   ██║
//    ██║   ██║  ██║   ██║      ██║   ╚██████╔╝╚██████╔╝
//    ╚═╝   ╚═╝  ╚═╝   ╚═╝      ╚═╝    ╚═════╝  ╚═════╝

interface setupTattoo {
  tattooLib: tattooLib[];
  list: () => string;
  simpleList: () => string;
  removeList: () => string;
  parlorList: (type: string, place: string, parlor: string) => string;
  get: (lib: true | tattooLib, place: string,  free: boolean, tattooKey?: string) => void;
  remove: (place: string, key: string) => void;
  bodWrite: (text: string, place: string) => void;
  wash: () => void;
  create: () => string;
  download: (item?: string) => void;
  upload: (item: string) => void;
  showLast: () => string;
  imgUpload: () => void;
  temporary: {item: TempItem};
}

interface TempItem {
  key: string;
  positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
  shortDesc: string;
  longDesc: string;
  img: string | false;
  text: string | false;
  type: "tattoo" | "bodywriting" | "scar";
  lewd: boolean;
  temp: boolean;
  atr: number;
  unique: boolean;
  cost: number;
  custom: boolean;
}

interface tattooLib {
  key: string;
  positions: string[];
  shortDesc: string;
  longDesc: string;
  img: string | false;
  text: string | false;
  type: "tattoo" | "bodywriting" | "scar";
  lewd: boolean;
  temp: boolean;
  atr: number;
  unique: boolean;
  cost: number;
  custom: boolean;
}

if (setup.tattoo === null || setup.tattoo === undefined) {
  setup.tattoo = {} as setupTattoo;
}

setup.tattoo.parlorList = function(type: string, place: string, parlor: string): string {
  let out = "";
  let imgType = `data-passage="`;
  for (let index = 0; index < setup.tattoo.tattooLib.length; index++) {
    if (setup.tattoo.tattooLib[index].positions.includes(place) && setup.tattoo.tattooLib[index].type === type && !setup.tattoo.tattooLib[index].unique) {
      let stats = (setup.tattoo.tattooLib[index].temp) ? "Temporary " : "Permanent ";
      stats += (setup.tattoo.tattooLib[index].lewd) ? "lewd " : "";
      stats += setup.tattoo.tattooLib[index].type;
      if (setup.tattoo.tattooLib[index].custom) {
        imgType = `src="`;
      } else {
        imgType = `data-passage="`;
      }
      out += `<div style="width: 200px; height: 400px; background-color: #380c0c; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><img ${imgType}${setup.tattoo.tattooLib[index].img}" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 200px; height: 200px;"><span style="float: left;"><span class="wdColor"><b>${setup.tattoo.tattooLib[index].shortDesc}</b></span><br><span class="handwriting wdGray"><small>${stats}</small></span><br><small>${setup.tattoo.tattooLib[index].longDesc}</small><br>ATR: ${setup.tattoo.tattooLib[index].atr}<br></span><span style="float: right">@@.money;<<mon>>${setup.tattoo.tattooLib[index].cost}@@&nbsp;&nbsp;<<button "Choose">><<run Dialog.close();>><<run setup.tattoo.get(true, "${place}", false, "${setup.tattoo.tattooLib[index].key}")>><<goto "${parlor}">><</button>></span></div>`;
    }
  }
  return out;
};

setup.tattoo.list = function(): string {
  const places = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
  const placesNames = ["Face", "Neck", "Left shoulder", "Right shoulder", "Left arm", "Right arm", "Left palm", "Right palm", "Breast", "Belly", "Pubic", "Left thigh", "Right thigh", "Left calf", "Right calf", "Left feet", "Right feet", "Upper back", "Lower back", "Butt", "Asshole", "Vagina"];
  let out = "";
  let imgType = `data-passage="`;
  for (let index = 0; index < places.length; index++) {
    for (let ii = 0; ii < ↂ.pc.tattoo[places[index]].length; ii++) {
      const T = ↂ.pc.tattoo[places[index]][ii];
      let stats = (T.temp) ? "Temporary " : "Permanent ";
      stats += (T.lewd) ? "lewd " : "";
      stats += T.type;
      if (T.type === "bodywriting") {
        out += `<div style="width: 200px; height: 320px; background-color: #380c0c; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><img data-passage="IMG-Tattoo-SkinBg" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px;"><div class="rotateBodyWriting">${T.text}</div><span style="float: left;"><span class="wdColor">${T.shortDesc}</span><br><span class="handwriting wdGray"><small>${stats}</small></span><br><small><span class="megrim">${placesNames[index]}</span></small></span></div>`;
      } else {
        if (T.custom) {
          imgType = `src="`;
        } else {
          imgType = `data-passage="`;
        }
        out += `<div style="width: 200px; height: 320px; background-color: #380c0c; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><img ${imgType}${T.img}" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 100%;"><span style="float: left; width: 200px; height: 200px;"><span class="wdColor">${T.shortDesc}</span><br><span class="megrim"><small>${placesNames[index]}&nbsp;ATR: ${T.atr}</small></span><br><span class="handwriting wdGray"><small>${stats}</small></span><br><small>${T.longDesc}</small></span></div>`;
      }
    }
  }
  return out;
};

setup.tattoo.removeList = function(): string {
  const places = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
  const placesNames = ["Face", "Neck", "Left shoulder", "Right shoulder", "Left arm", "Right arm", "Left palm", "Right palm", "Breast", "Belly", "Pubic", "Left thigh", "Right thigh", "Left calf", "Right calf", "Left feet", "Right feet", "Upper back", "Lower back", "Butt", "Asshole", "Vagina"];
  let out = ``;
  let imgType = `data-passage="`;
  for (let index = 0; index < places.length; index++) {
    for (let ii = 0; ii < ↂ.pc.tattoo[places[index]].length; ii++) {
      const T = ↂ.pc.tattoo[places[index]][ii];
      if (T.type === "tattoo") {
        if (T.custom) {
          imgType = `src="`;
        } else {
          imgType = `data-passage="`;
        }
        out += `<span style="float: left; margin-right: 10px; margin-bottom: 10px;"><img ${imgType}${T.img}" style="border-radius: 10px; width: 120px; height: 120px;"><br><span class="megrim"><small>${placesNames[index]}</small></span><br><<button "Remove">><<run setup.tattoo.remove("${places[index]}", "${T.key}")>><<replace "#tattooSpan">><<include [[ResidentialMedicalDoctorTattooRemDone]]>><</replace>><</button>></span>`;
      }
    }
  }
  return out;
};

setup.tattoo.simpleList = function(): string {
  const places = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
  const placesNames = ["Face", "Neck", "Left shoulder", "Right shoulder", "Left arm", "Right arm", "Left palm", "Right palm", "Breast", "Belly", "Pubic", "Left thigh", "Right thigh", "Left calf", "Right calf", "Left feet", "Right feet", "Upper back", "Lower back", "Butt", "Asshole", "Vagina"];
  let out = `<center>`;
  let imgType = `data-passage="`;
  for (let index = 0; index < places.length; index++) {
    for (let ii = 0; ii < ↂ.pc.tattoo[places[index]].length; ii++) {
      const T = ↂ.pc.tattoo[places[index]][ii];
      if (T.type === "bodywriting") {
      out += `"${T.text}" is written on your ${placesNames[index]}.<br>`;
      }
    }
  }
  out += "</center><br><br>";
  for (let index = 0; index < places.length; index++) {
    for (let ii = 0; ii < ↂ.pc.tattoo[places[index]].length; ii++) {
      const T = ↂ.pc.tattoo[places[index]][ii];
      if (T.type === "tattoo" || T.type === "scar") {
        if (T.custom) {
          imgType = `src="`;
        } else {
          imgType = `data-passage="`;
        }
        out += `<img ${imgType}${T.img}" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 10px; width: 120px; height: 120px;">`;
        }
      }
    }
  return out;
};

setup.tattoo.get = function(lib: true | tattooLib, place: string, free: boolean, tattooKey?: string): void {
  let tat = {} as tattooLib;
  if (typeof lib === "boolean" && lib === true) { // using one of the precreated tattoos or mod
    if (tattooKey == null) {
      aw.con.warn(`Error in setup.tattoo.tattooGet, function need a tattooKey if lib variable is true.`);
      return;
    }
    for (let index = 0; index < setup.tattoo.tattooLib.length; index++) {
      if (setup.tattoo.tattooLib[index].key === tattooKey) {
        tat = setup.tattoo.tattooLib[index];
      }
    }
    if (tat.key == null) {
      aw.con.warn(`Error in setup.tattoo.tattooGet, ${tattooKey} was not found in setup.tattoo.tattooLib.`);
      return;
    }
  } else if (typeof lib === "object") { // using user designed tattoo
    tat = lib;
  } else {
    aw.con.warn(`Error in setup.tattoo.tattooGet, wrong lib argument supplied (${lib}).`);
    return;
  }
  if (ↂ.pc.tattoo[place] == null) {
    aw.con.warn(`Error in setup.tattoo.tattooGet, function need a tattooKey if lib variable is true.`);
    return;
  } else if (!tat.positions.includes(place)) {
    aw.con.warn(`Error in setup.tattoo.tattooGet, wrong position ${place} for ${tat.key}`);
    return;
  } else {
    if (ↂ.pc.tattoo[place] === false) {
      ↂ.pc.tattoo[place] = [];
      aw.S();
    }
    ↂ.pc.tattoo[place].push(tat);
    aw.S();
  }
  if (!free) {
    aw.cash(-tat.cost, "salon");
  }
};

setup.tattoo.remove = function(place: string, key: string): void {
  let res = false;
  for (let index = 0; index < ↂ.pc.tattoo[place].length; index++) {
    if (ↂ.pc.tattoo[place][index].key === key) {
      ↂ.pc.tattoo[place].splice(index, 1);
      aw.S();
      res = true;
    }
    if (ↂ.pc.tattoo[place].length === 0) {
      ↂ.pc.tattoo[place] = false;
      aw.S();
    }
  }
  if (res) {
    aw.con.info(`Deleted ${key} tattoo on ${place}`);
  } else {
    aw.con.warn(`setup.tattoo.remove failed to find ${key} tattoo on ${place}`);
  }
};

setup.tattoo.bodWrite = function(text: string, place: string): void {
  const BWthingy = {
    key: text,
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: text,
    longDesc: ``,
    img: "IMG-Tattoo-SkinBg",
    text: text,
    type: "bodywriting",
    lewd: true,
    temp: true,
    atr: 0,
    unique: true,
    cost: 0,
    custom: true,
  } as tattooLib;
  setup.tattoo.get(BWthingy, place, true);
  aw.S();
};

setup.tattoo.wash = function(): void {
  let result = false;
  let type = "type";
  const places = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
  for (let index = 0; index < places.length; index++) {
    for (let ii = 0; ii < ↂ.pc.tattoo[places[index]].length; ii++) {
      if (ↂ.pc.tattoo[places[index]][ii].temp) {
        type = ↂ.pc.tattoo[places[index]][ii].type;
        setup.tattoo.remove(places[index], ↂ.pc.tattoo[places[index]][ii].key);
        result = true;
        aw.S();
      }
    }
  }
  if (result) {
    setup.notify(`Your temporary ${type} washed off.`);
  }
};

setup.tattoo.create = function(): string {
  setup.tattoo.temporary.item.key = State.active.variables.TcustomKey;
  setup.tattoo.temporary.item.shortDesc = State.active.variables.TcustomShortDesc;
  setup.tattoo.temporary.item.longDesc = State.active.variables.TcustomLongDesc;
  if (State.active.variables.TcustomAtr > 4 || State.active.variables.TcustomAtr < 0) {
    State.active.variables.TcustomAtr = 0;
  }
  setup.tattoo.temporary.item.atr = State.active.variables.TcustomAtr;
  setup.tattoo.temporary.item.text = State.active.variables.TcustomText;
  setup.tattoo.temporary.item.lewd = State.active.variables.TcustomLewd;
  setup.tattoo.temporary.item.cost = (setup.tattoo.temporary.item.atr * 30) + 30 + random(10, 25);
  setup.tattoo.tattooLib.push(setup.tattoo.temporary.item);
  aw.S();
  let stats = (setup.tattoo.temporary.item.temp) ? "Temporary " : "Permanent ";
  stats += (setup.tattoo.temporary.item.lewd) ? "lewd " : "";
  stats += setup.tattoo.temporary.item.type;
  return `Tattoo was created successfully! You can purchase it now in the parlor.<br><center><<button "Download mod">><<replace "#creatorSpan">><<print setup.tattoo.download()>><</replace>><</button>></center><br><div style="width: 200px; height: 320px; background-color: #380c0c; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><img src="${setup.tattoo.temporary.item.img}" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 200px; height: 200px;"><span style="float: left;"><span class="wdColor">${setup.tattoo.temporary.item.shortDesc}</span><br><span class="megrim"><small>ATR: ${setup.tattoo.temporary.item.atr}</small></span><br><span class="handwriting wdGray"><small>${stats}</small></span><br><small>${setup.tattoo.temporary.item.longDesc}</small></span></div>`;
};

setup.tattoo.download = function(item?: string): string {
  const dummy = JSON.stringify(setup.tattoo.temporary.item);
  const type = "data:application/octet-stream;base64, ";
  const text = dummy;
  const base = btoa(text);
  const res = type + base;
  return `<a download="${setup.tattoo.temporary.item.key}-mod.awm" id="dl" href="${res}">DOWNLOAD MOD</a>`;
};

setup.tattoo.upload = function(item: string): void {
  try {
  aw.con.info(`${item}`);
  const object = JSON.parse(item);
  if (object !== null) {
    setup.tattoo.tattooLib.push(object);
    aw.S();
  } else {
    aw.con.warn(`setup.tattoo.upload found that supplied mod is damaged or not a single clothes tattoo mod!`);
    alert("Mod is damaged or not single tattoo item mod!");
  }
  } catch (e) {
    aw.con.warn(`setup.tattoo.upload died with error: ${e.name}: ${e.message}.`);
    alert(`setup.tattoo.upload died with error: ${e.name}: ${e.message}.`);
  }
};

setup.tattoo.showLast = function(): string {
  const T = setup.tattoo.tattooLib[setup.tattoo.tattooLib.length - 1];
  if (T.custom) {
    let stats = (T.temp) ? "Temporary " : "Permanent ";
    stats += (T.lewd) ? "lewd " : "";
    stats += T.type;
    return `Tattoo was uploaded successfully! You can purchase it now in the parlor.<br><div style="width: 200px; height: 320px; background-color: #380c0c; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><img src="${T.img}" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 200px; height: 200px;"><span style="float: left;"><span class="wdColor">${T.shortDesc}</span><br><span class="megrim"><small>ATR: ${T.atr}</small></span><br><span class="handwriting wdGray"><small>${stats}</small></span><br><small>${T.longDesc}</small></span></div>`;
  } else {
    return "It seems there was some error :( Maybe the file is corrupted?";
  }
};


setup.tattoo.imgUpload = function(): void {
  const reader = new FileReader();
  const file = document.getElementById("fileselector") as any;
  if (file) {
    reader.addEventListener("load", function(e) {
      if (e.target) {
        aw.con.info(`${reader.result}`);
        setup.tattoo.temporary.item.img = String(reader.result);
      }
    });
    reader.readAsDataURL( file.files[0] );
  }
};

setup.tattoo.temporary = {
  item: {
    key: "Whore",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `Whore`,
    longDesc: `a "Whore" cursive writing`,
    img: "IMG-Tattoo-SkinBg",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 0,
    unique: false,
    cost: 0,
    custom: true,
  },
};

setup.tattoo.tattooLib = [
  {
    key: "bornToFuck",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Born to Fuck`,
    longDesc: `a "Born to Fuck" cursive writing`,
    img: "IMG-Tattoo-BorntoFuck",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 1,
    unique: false,
    cost: 70,
    custom: false,
  },
  {
    key: "trampStamp",
    positions: ["backLower", "butt"],
    shortDesc: `Tramp stamp`,
    longDesc: `a widely known curvy shaped "tramp stamp"`,
    img: "IMG-Tattoo-TrampStamp",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 2,
    unique: false,
    cost: 60,
    custom: false,
  },
  {
    key: "trampStamp2",
    positions: ["backLower", "butt"],
    shortDesc: `Tramp stamp`,
    longDesc: `a widely known curvy shaped "tramp stamp"`,
    img: "IMG-Tattoo-TrampStamp2",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 3,
    unique: false,
    cost: 80,
    custom: false,
  },
  {
    key: "trampStamp3",
    positions: ["backLower", "butt"],
    shortDesc: `Tramp stamp`,
    longDesc: `a widely known curvy shaped "tramp stamp"`,
    img: "IMG-Tattoo-TrampStamp3",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 2,
    unique: false,
    cost: 70,
    custom: false,
  },
  {
    key: "flowerSkull",
    positions: ["neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "backUpper", "backLower", "butt"],
    shortDesc: `Flower Skull`,
    longDesc: `a skull, surrounded by flowers`,
    img: "IMG-Tattoo-FlowerSkull",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 3,
    unique: false,
    cost: 90,
    custom: false,
  },
  {
    key: "bdsm",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `BDSM symbol`,
    longDesc: `a popular BDSM symbol`,
    img: "IMG-Tattoo-bdsm",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 0,
    unique: false,
    cost: 30,
    custom: false,
  },
  {
    key: "deathEater",
    positions: ["shoulderLeft", "shoulderRight", "armLeft", "armRight"],
    shortDesc: `Death Eater`,
    longDesc: `a Death Eater mark from popular book franchise`,
    img: "IMG-Tattoo-DeathEater",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 1,
    unique: false,
    cost: 60,
    custom: false,
  },
  {
    key: "whore",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Whore`,
    longDesc: `a whore tattoo with a cute pink heart`,
    img: "IMG-Tattoo-Whore",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 1,
    unique: false,
    cost: 20,
    custom: false,
  },
  {
    key: "hetero",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Hetero`,
    longDesc: `a hetero tattoo with male and female symbols`,
    img: "IMG-Tattoo-Het",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 1,
    unique: false,
    cost: 40,
    custom: false,
  },
  {
    key: "lesbian",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Lesbian`,
    longDesc: `a lesbian tattoo with two female symbols`,
    img: "IMG-Tattoo-Lesb",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 1,
    unique: false,
    cost: 40,
    custom: false,
  },
  {
    key: "trans",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Trans`,
    longDesc: `a transsexual lover tattoo with a female and trans symbols`,
    img: "IMG-Tattoo-Trans",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 1,
    unique: false,
    cost: 40,
    custom: false,
  },
  {
    key: "adultFlavor",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Adult Flavor`,
    longDesc: `a tattoo with a phrase "Adult Flavor" written in Hanzi`,
    img: "IMG-Tattoo-AdultFlavor",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 2,
    unique: false,
    cost: 60,
    custom: false,
  },
  {
    key: "lotr",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `Elven runes`,
    longDesc: `a tattoo of elven runes in a circle shape`,
    img: "IMG-Tattoo-Lotr",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 3,
    unique: false,
    cost: 90,
    custom: false,
  },
  {
    key: "semenTreatment",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Semen Treatment`,
    longDesc: `a tattoo with a phrase "Semen Treatment" written in Hanzi`,
    img: "IMG-Tattoo-SemenTreatment",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 1,
    unique: false,
    cost: 70,
    custom: false,
  },
  {
    key: "pregnancyDefeat",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Pregnancy Defeat`,
    longDesc: `a tattoo with a phrase "Pregnancy Defeat" written in Hanzi`,
    img: "IMG-Tattoo-PregnancyDefeat",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 1,
    unique: false,
    cost: 65,
    custom: false,
  },
  {
    key: "cumDumpster",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Cum Dumpster`,
    longDesc: `a tattoo with a phrase "Cum Dumpster"`,
    img: "IMG-Tattoo-CumDumpster",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 1,
    unique: false,
    cost: 50,
    custom: false,
  },
  {
    key: "publicSlut",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Public Slut`,
    longDesc: `a tattoo with a phrase "Public Slut"`,
    img: "IMG-Tattoo-PublicSlut",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 1,
    unique: false,
    cost: 45,
    custom: false,
  },
  {
    key: "bow",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Bow`,
    longDesc: `a tattoo with a cute bow`,
    img: "IMG-Tattoo-Bow",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 3,
    unique: false,
    cost: 75,
    custom: false,
  },
  {
    key: "blacked",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `BBC`,
    longDesc: `a BBC lover tattoo`,
    img: "IMG-Tattoo-Blacked",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 2,
    unique: false,
    cost: 45,
    custom: false,
  },
  {
    key: "slut",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `Slut`,
    longDesc: `a tattoo with a "Slut" text`,
    img: "IMG-Tattoo-Slut",
    text: false,
    type: "tattoo",
    lewd: true,
    temp: false,
    atr: 1,
    unique: false,
    cost: 55,
    custom: false,
  },
  {
    key: "daddy",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `Daddy girl`,
    longDesc: `a "Daddy's girl" tattoo with a funny text`,
    img: "IMG-Tattoo-MyDaddy",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 2,
    unique: false,
    cost: 70,
    custom: false,
  },
  {
    key: "ilat",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `Appletree`,
    longDesc: `a tattoo with Appletree symbol`,
    img: "IMG-Tattoo-ILoveAT",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 2,
    unique: false,
    cost: 35,
    custom: false,
  },
  {
    key: "arcanist",
    positions: ["neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Arcanist`,
    longDesc: `a cool Arcanist tattoo with tentacles and a skull`,
    img: "IMG-Tattoo-Arcanist",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 4,
    unique: false,
    cost: 110,
    custom: false,
  },
  {
    key: "fertSeal",
    positions: ["belly", "pubic"],
    shortDesc: `Fertility Seal`,
    longDesc: `a nanotech fertility seal tattoo`,
    img: "IMG-Tattoo-FertSeal",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 2,
    unique: true,
    cost: 0,
    custom: false,
  },
  {
    key: "tribal",
    positions: ["neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Tribal`,
    longDesc: `a typical tribal tattoo`,
    img: "IMG-Tattoo-Tribal1",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 2,
    unique: false,
    cost: 70,
    custom: false,
  },
  {
    key: "aquila",
    positions: ["neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Aquila`,
    longDesc: `an two-headed aquila tattoo`,
    img: "IMG-Tattoo-Aquila",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 2,
    unique: false,
    cost: 90,
    custom: false,
  },
  {
    key: "fleur",
    positions: ["neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `Fleur De Lis`,
    longDesc: `a traditional french flower tattoo`,
    img: "IMG-Tattoo-FleurDeLis",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 3,
    unique: false,
    cost: 90,
    custom: false,
  },
  {
    key: "mehendi",
    positions: ["neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt"],
    shortDesc: `Mehendi`,
    longDesc: `a traditional mehendi-styled tattoo`,
    img: "IMG-Tattoo-IndianEye",
    text: false,
    type: "tattoo",
    lewd: false,
    temp: false,
    atr: 2,
    unique: false,
    cost: 70,
    custom: false,
  },
  {
    key: "scar",
    positions: ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"],
    shortDesc: `Scar`,
    longDesc: "",
    img: "IMG-Tattoo-Scar",
    text: false,
    type: "scar",
    lewd: false,
    temp: false,
    atr: -1,
    unique: true,
    cost: 0,
    custom: false,
  },
];
