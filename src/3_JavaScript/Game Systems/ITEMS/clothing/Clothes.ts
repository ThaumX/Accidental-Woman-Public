/*
-██████╗██╗      ██████╗ ████████╗██╗  ██╗███████╗███████╗
██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔════╝
██║     ██║     ██║   ██║   ██║   ███████║█████╗  ███████╗
██║     ██║     ██║   ██║   ██║   ██╔══██║██╔══╝  ╚════██║
╚██████╗███████╗╚██████╔╝   ██║   ██║  ██║███████╗███████║
-╚═════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝
*/

interface setupClothes {
  details: (key: string) => string;
  wardList: (...slot: string[]) => string;
  shopList: (store: string, slot: clothingCategory) => string;
  shopSalePrice: (store: string, slot: clothingCategory, price: number) => number;
  coordinate: (top: number, bottom: number) => 0 | 1 | 2 | 3;
  calculate: () => void;
  wear: (key: string, slot?: 0 | clothingSlot) => "ERROR!" | "Success!";
  referenceTryCount: number;
  referenceRebuild: () => void;
  remove: (slot: clothingSlot) => "ERROR!" | "Success!";
  delete: (key: string, force: boolean) => void;
  wearWords: (key: string) => string[] | string;
  wearKeyParse: (inpt: string) => string;
  sortButtons: (arrayVarString: string, cuntID: string, twinePrinter: string) => string;
  sort: (array: Garment[], key: string, ascend: boolean) => void;
  keyGen: () => string;
  basePrice: (type: clothingType, atr: number, formal: number, sexy: number, expose: number, origin: string) => number;
  initialize: () => void;
  defineObjects: () => void;
  atrWord: (val: number) => string;
  dirty: (val: number) => string;
  health: (val: number) => string;
  exposureWord: (val: number) => string;
  sexyWord: (val: number) => string;
  formalWord: (val: number) => string;
  colorHex: (code: number | string) => string;
  gameLoad: (string: string) => void;
  colorWord: (code: number) => string;
  icon: setupClothesIcon;
  hemWord: (num: number) => string;
  isOutfitName: () => string;
  PaperDollPrint: (type: string) => string;
  paperBody: () => string;
  paperClothes: () => string;
  paperAccessories: () => string;
  paperShoes: () => string;
  paperStatus: () => string;
  PaperDollOptions: () => string;
  clearStoreInv: () => void;
  prologueGiver: (type: string) => void;
  quickPrint: (slot: clothingCategory) => string;
  defineCustomClothes: () => void;
  outfitInitialize: () => void;
  dataExport: (key: string) => string;
  staining: (place: string, amt: number, type: string) => void;
  washing: () => void;
  drying: () => void;
  stained: boolean;
  kinky: boolean;
  wet: boolean;
  exposed: setupClothesExposed;
  access: setupClothesAccess;
  dress: boolean;
  athletic: boolean;
  nightwear: boolean;
  swimwear: boolean;
  damaged: boolean;
  wearingSkirt: boolean;
  outfit: setupClothesOutfit;
  gameSave: () => string;
  desc: setupClothesDesc;
  braWord: string; // gives noun (often with adjective) about bra. if no bra, returns "no bra"
  topWord: string; // gives noun (often with adjective) about top. if no top, returns "no top"
  topAndBraWord: string; // gives braWord and topWord in appropriate combination for current wear status.
  damage: (slot: string, amt: number) => void; // damages clothes by amount. Note: negative number will heal
  takeOff: (slot: string) => void; // sets clothes wear status to "off" for given slot, if clothes are worn in slot (safe) [players can reequip by changing wear]
  makeDirty: (slot: string, amt: number) => void; // makes clothes in a slot more dirty. (negative will clean)
  timeEffect: () => void; // runs with every 15-minute chunk and causes regular wear-and-tear on clothes as well as dirtiness.
}


// CLASS AND GENERAL FUNCTIONS



// Namespace
if (setup.clothes === null || setup.clothes === undefined) {
  setup.clothes = {} as setupClothes;
}

if (aw.clothes === null || aw.clothes === undefined) {
  aw.clothes = {};
  aw.slot = {
    panties: 0,
    bra: 0,
    leg: 0,
    top: 0,
    bottom: 0,
    coat: 0,
    bag: 0,
    accA: 0,
    accB: 0,
    accC: 0,
    accD: 0,
    shoes: 0,
  };
}

class Garment {
  public key: string;
  public a;
  public nick: string;
  public type: clothingType;
  public slot: clothingSlot;
  public color: string;
  public style: string;
  public subStyle: string;
  public tertiary: string;
  public fabric: string;
  public wetness: number;
  public wear: string[];
  public cond: object;
  public price: number;
  public flag: {
    text?: string,
    hem?: number,
  };
  public origin: string;
  public swimwear: boolean;
  public nightwear: boolean;
  public athletic: boolean;
  public kinky: boolean;
  public access: {
    nip: boolean,
    pussy: boolean,
    ass: boolean,
    butt: boolean,
    tits: boolean,
  };
  public save: boolean;
  public img: string|0;
  public padoImg: string;
  public values: {
    atr: number,
    sexy: number,
    formal: number,
    exposure: number,
    style: number,
    subStyle: number,
    fabric: number,
    color: number,
    damage: number,
    dirty: number,
    price: number,
  };
  constructor({
    key = "none",
    nick = "none",
    type = "bra",
    slot = "bra",
    colorWord = "error",
    styleWord = "error",
    subStyleWord = "none",
    tertiaryWord = "na",
    fabricWord = "none",
    atr = 0,
    sexy = 0,
    formal = 0,
    exposure = 0,
    flag = {},
    damage = 0,
    cond = {},
    dirty = 0,
    wetness = 0,
    style,
    subStyle,
    fabric,
    color,
    origin = "TightThreads",
    price = "none",
    swimwear = false,
    nightwear = false,
    athletic = false,
    kinky = false,
    accessNip = false,
    accessPussy = false,
    accessButt = false,
    accessTits = false,
    accessAss = false,
    wear = ["normal", "off"],
    save = false,
    padoImg = "none",
    img = 0,
  // tslint:disable-next-line:max-line-length
  }: {key?: string, nick?: string, type: clothingType, slot: clothingSlot, colorWord: string, styleWord: string, subStyleWord: string, tertiaryWord: string, fabricWord: string, atr: number, sexy: number, formal: number, exposure: number, flag: object, damage: number, cond: object, dirty: number, wetness: number, style: number, subStyle: number, fabric: number, color: number, origin: string, price: number|"none", swimwear?: boolean, nightwear?: boolean, athletic?: boolean, kinky?: boolean, accessNip?: boolean, accessPussy?: boolean, accessButt?: false, accessTits?: boolean, accessAss?: boolean, wear?: string[], save: boolean, padoImg: string, img?: string|0} ) {
    if (key === "none") {
      this.key = setup.clothes.keyGen();
    } else {
      this.key = key;
    }
    this.nick = nick;
    this.type = type;
    this.slot = slot;
    this.color = colorWord;
    this.style = styleWord;
    this.subStyle = subStyleWord;
    this.tertiary = tertiaryWord;
    this.fabric = fabricWord;
    this.flag = clone(flag);
    this.cond = clone(cond);
    this.wear = clone(wear);
    this.wetness = wetness;
    if (price === "none") {
      this.price = setup.clothes.basePrice(type, atr, formal, sexy, exposure, origin);
    } else {
      this.price = price;
    }
    this.values = {
      atr,
      sexy,
      formal,
      exposure,
      style,
      subStyle,
      fabric,
      color,
      damage,
      dirty,
      price: this.price,
    };
    this.origin = origin;
    this.swimwear = swimwear;
    this.nightwear = nightwear;
    this.athletic = athletic;
    this.kinky = kinky;
    this.access = {
      nip: accessNip,
      pussy: accessPussy,
      ass: accessAss,
      butt: accessButt,
      tits: accessTits,
    };
    this.save = save;
    this.padoImg = padoImg;
    this.img = img;
  }
  get curExposure(): number {
    if (this.wetness > 2) {
      return (this.values.exposure + 10);
    } else {
      return this.values.exposure;
    }
  }
  // color hex code
  get hex(): string {
    return setup.clothes.colorHex(this.values.color);
  }
  // attraction word
  get atr(): string {
    return setup.clothes.atrWord(this.values.atr);
  }
  // exposure word
  get exposure(): string {
    return setup.clothes.exposureWord(this.curExposure);
  }
  // formal word
  get formal() {
    return setup.clothes.formalWord(this.values.formal);
  }
  // image string no brackets
  get image(): string {
    if (this.img === 0) {
      try {
        return setup.clothes.icon[this.type](this.values.style, this.values.subStyle);
      } catch (e) {
        aw.con.warn(`ERROR: setup.clothes.icon[${this.type}] is not a function error...`);
        return "IMGnotavailable";
      }
    } else {
      return this.img;
    }
  }
  // sexiness word
  get sexy(): string {
    return setup.clothes.sexyWord(this.values.sexy);
  }
  // returns dirtiness words
  get dirty(): string {
    return setup.clothes.dirty(this.values.dirty);
  }
  // returns words for damage
  get health(): string {
    return setup.clothes.health(this.values.damage);
  }
  // returns string describing the status (health, dirty, condition)
  get status(): string {
    const con = this.condition;
    if (con === "normal") {
      return `${this.health} condition, and ${this.dirty}`;
    } else {
      return `${this.health} condition, ${this.dirty}, and ${con}`;
    }
  }
  // describes condition
  get condition(): string {
    const keys = Object.keys(this.cond);
    if (keys.length === 0) {
      return "normal";
    }
    let output = "";
    switch (this.wetness) {
      case 0:
        output += "is crusted with ";
        break;
      case 1:
        output += "is damp with ";
        break;
      case 2:
      case 3:
        output += "is wet with ";
        break;
      case 4:
        output += "is soaked with ";
        break;
      default:
        output += "is drenched with ";
        break;
    }
    const quant = ["barely noticeable", "tiny", "small", "significant", "large", "huge", "ridiculous"];
    for (let i = 0, c = keys.length; i < c; i++) {
      if (i === (c - 1)) {
        output += ", and ";
      } else if (i !== 0) {
        output += ", ";
      }
      output += `a ${quant[this.cond[keys[i]]]} amount of ${keys[i]}`;
    }
    return output;
  }
  // runs setup.clothes.details on this for infos
  get details(): string {
    return setup.clothes.details(this.key);
  }
  public print(size = "big", cls = "none"): string {
    let classes;
    let sizer;
    let name;
    switch (size) {
      case "big":
      case "Big":
        sizer = "Big";
        break;
      case "Small":
      case "small":
        sizer = "Small";
        break;
      default:
        sizer = "";
        break;
    }
    if (cls === "none") {
      classes = "";
    } else {
      classes = " " + cls;
    }
    let output = `<div id="${this.key}" class="WardrobeGarment${sizer}${classes}">`;
    let icon = "";
    if (this.athletic) {
      icon += "[img[Athletic|IMG-AthleticwearIcon]]";
    }
    if (this.kinky) {
      icon += "[img[Kinky|IMG-KinkwearIcon]]";
    }
    if (this.nightwear) {
      icon += "[img[Nightwear|IMG-NitewearIcon]]";
    }
    if (this.swimwear) {
      icon += "[img[Swimwear|IMG-SwimwearIcon]]";
    }
    if (icon !== "") {
      icon = `<div class="WardrobeItemIcons">${icon}</div>`;
    }
    if (sizer === "Big") {
      output += `<div class="WardGarmentImagebox">${this.type}<br><img data-passage="${this.image}" style="background-color:${this.hex};">${icon}</div>`;
    }
    switch (State.active.variables.pref.clothingDetail) {
      case 1:
        name = `${this.color} ${this.style}`;
        break;
      case 2:
        if (this.subStyle === "regular" || this.subStyle === "none") {
          name = `${this.color} ${this.style}`;
        } else {
          name = `${this.color} ${this.subStyle} ${this.style}`;
        }
        break;
      case 3:
        if ((this.subStyle === "none" || this.subStyle === "regular") && this.tertiary === "na") {
          name = `${this.color} ${this.style}`;
        } else if (this.tertiary === "na") { //  || this.tertiary === 0
          name = `${this.color} ${this.subStyle} ${this.style}`;
        } else if (this.subStyle === "none" || this.subStyle === "regular") {
          name = `${this.color} ${this.style} <span class="wdFabric">(<i>${this.tertiary}</i>)</span>`;
        } else {
          name = `${this.color} ${this.subStyle} ${this.style} <span class="wdFabric">(<i>${this.tertiary}</i>)</span>`;
        }
        break;
      case 4:
      default:
        if ((this.subStyle === "none" || this.subStyle === "regular") && this.tertiary === "na") {
          if (this.slot !== "shoes") {
            name = `<span class="wdColor">${this.color}</span> <span class="wdFabric">${this.fabric}</span> ${this.style}`;
          } else {
            name = `<span class="wdColor">${this.color}</span> ${this.style}`;
          }
        } else if (this.tertiary === "na") {
          if (this.slot !== "shoes") {
            name = `<span class="wdColor">${this.color}</span> <span class="wdFabric">${this.fabric}</span> ${this.subStyle} ${this.style}`;
          } else {
            name = `<span class="wdColor">${this.color}</span> ${this.subStyle} ${this.style}`;
          }
        } else if (this.subStyle === "none" || this.subStyle === "regular") {
          if (this.slot !== "shoes") {
            name = `<span class="wdColor">${this.color}</span> <span class="wdFabric">${this.fabric}</span> ${this.style} <span class="wdFabric">(<i>${this.tertiary}</i>)</span>`;
          } else {
            name = `<span class="wdColor">${this.color}</span> ${this.style} <span class="wdFabric">(<i>${this.tertiary}</i>)</span>`;
          }
        } else {
          if (this.slot !== "shoes") {
            name = `<span class="wdColor">${this.color}</span> <span class="wdFabric">${this.fabric}</span> ${this.subStyle} ${this.style} <span class="wdFabric">(<i>${this.tertiary}</i>)</span>`;
          } else {
            name = `<span class="wdColor">${this.color}</span> ${this.subStyle} ${this.style} <span class="wdFabric">(<i>${this.tertiary}</i>)</span>`;
          }
        }
        break;
    }
    if (this.flag.text != null && this.flag.text !== undefined) {
      name += ` <span style="color:#ccc;">${this.flag.text}</span>`;
    }
    let fontSize = "20px";
    if (name.length > 172) {
      fontSize = "16px";
    } else if (name.length > 142) {
      fontSize = "18px";
    }
    const stat = `<img data-passage="IMG-WardrobeCloStatusIcon" class="wardrobeStatusHov imgButton" title="${this.status}">`;
    output += `<div class="WardGarmentTextbox"><span style="color:#ffcc92;font-size:${fontSize};"><b>${name}</b></span><br>ATR: ${this.atr} (${this.values.atr}), ${this.sexy}, Formality:&nbsp;${this.formal}, ${this.exposure}&nbsp;(${this.curExposure})<br><span style="font-size:75%">from</span>&nbsp;<span class="wdGray handwriting">${this.origin}</span> <span style="font-size:75%">for</span>&nbsp;<span class="money">₢${this.price}</span> ${stat}</div></div>`;
    return output;
  }
}
// returns twee for item details display
setup.clothes.details = function(key: string): string {
  if (aw.clothes[key] === null || aw.clothes[key] === undefined) {
    return `The clothing item with key ${key} does not exist. This is an error.`;
  }
  const ᛝ = aw.clothes[key];
  let output = `<div class="WardrobeGarmentDetail">`;
  let mainName;
  let nick = `<span style="font-size:1.2rem;">(no nickname)</span><br>`;
  if (ᛝ.nick) {
    nick = `<span style="font-size:135%"><b>${ᛝ.nick}</b></span><br>`;
  }
  if ((ᛝ.subStyle === "none" || ᛝ.subStyle === "regular") && ᛝ.tertiary === "na") {
    mainName = `<p id="mainName" style="font-size:1.3rem;color:#ffcc92;">${nick}<span class="wdColor">${ᛝ.color}</span> <span class="wdFabric">${ᛝ.fabric}</span> ${ᛝ.style}</p>`;
  } else if (ᛝ.tertiary === "na") {
    mainName = `<p id="mainName" style="font-size:1.3rem;color:#ffcc92;">${nick}<span class="wdColor">${ᛝ.color}</span> <span class="wdFabric">${ᛝ.fabric}</span> <i>${ᛝ.subStyle}</i> ${ᛝ.style}</p>`;
  } else if (ᛝ.subStyle === "none" || ᛝ.subStyle === "regular") {
    mainName = `<p id="mainName" style="font-size:1.3rem;color:#ffcc92;">${nick}<span class="wdColor">${ᛝ.color}</span> <span class="wdFabric">${ᛝ.fabric}</span> ${ᛝ.style} <span class="wdFabric">(<i>${ᛝ.tertiary}</i>)</span></p>`;
  } else {
    mainName = `<p id="mainName" style="font-size:1.3rem;color:#ffcc92;">${nick}<span class="wdColor">${ᛝ.color}</span> <span class="wdFabric">${ᛝ.fabric}</span> <i>${ᛝ.subStyle}</i> ${ᛝ.style} <span class="wdFabric">(<i>${ᛝ.tertiary}</i>)</span></p>`;
  }
  if (ᛝ.flag.text != null && ᛝ.flag.text !== undefined) {
    mainName += ` <span style="color:#ccc;">${ᛝ.flag.text}</span>`;
  }
  output += `<img data-passage="${ᛝ.image}" style="background-color:${ᛝ.hex};float: right;width:160px;height:auto;margin:5px 5px 20px 30px;">`;
  output += mainName;
  output += `<p>${ᛝ.status}</p>`;
  const tagA = (ᛝ.athletic) ? "Athletic:&nbsp;&nbsp;<span class='good'>True</span>" : "Athletic:&nbsp;&nbsp;False";
  const tagK = (ᛝ.kinky) ? "Kink/Fetish:&nbsp;&nbsp;<span class='good'>True</span>" : "Kink/Fetish:&nbsp;&nbsp;False";
  const tagN = (ᛝ.nightwear) ? "Nightwear:&nbsp;&nbsp;<span class='good'>True</span>" : "Nightwear:&nbsp;&nbsp;False";
  const tagS = (ᛝ.swimwear) ? "Swimwear:&nbsp;&nbsp;<span class='good'>True</span>" : "Swimwear:&nbsp;&nbsp;False";
  let access = "<b>Access:</b>&nbsp;&nbsp;";
  access += (ᛝ.access.pussy) ? "<span class='good'>[pussy]</span> " : "<span class='bad'>[pussy]</span> ";
  access += (ᛝ.access.ass) ? "<span class='good'>[asshole]</span> " : "<span class='bad'>[asshole]</span> ";
  access += (ᛝ.access.nip) ? "<span class='good'>[nipple]</span> " : "<span class='bad'>[nipple]</span> ";
  access += (ᛝ.access.tits) ? "<span class='good'>[tits]</span> " : "<span class='bad'>[tits]</span> ";
  access += (ᛝ.access.butt) ? "<span class='good'>[butt]</span> " : "<span class='bad'>[butt]</span> ";
  output += `<p class="monospace" style="font-size:1rem;"><span class="tit" style="font-size:1.2rem;color:#ffcc92;">Stats</span><br>`;
  let hem = "<br>";
  if (ᛝ.type === "dress" || ᛝ.type === "skirt") {
    if (ᛝ.flag.hem! > 5) {
      hem = "Skirt Danger:&nbsp;&nbsp;";
      if (ᛝ.flag.hem! > 7) {
        hem += "<span style='bad'>" + (ᛝ.flag.hem! - 5) + "</span><br>";
      } else {
        hem += "<span style='import'>" + (ᛝ.flag.hem! - 5) + "</span><br>";
      }
    }
  }
  output += `<div style="display:inline-block;width:47%;margin: 10px 2% 10px 0px;">Attractiveness:&nbsp;&nbsp;${ᛝ.atr}&nbsp;(${ᛝ.values.atr})<br>Formality:&nbsp;${ᛝ.formal}<br>Origin:&nbsp;&nbsp;<span class="handwriting wdGray">${ᛝ.origin}</span><br>${hem}${tagA}<br>${tagN}</div>`;
  output += `<div style="display:inline-block;width:47%;margin: 10px 0px 10px 2%;">Sexy/Cute:&nbsp;${ᛝ.sexy}<br>Exposure:&nbsp;${ᛝ.exposure}&nbsp;(${ᛝ.curExposure})<br>Price:&nbsp;&nbsp;<span class="monospace money">₢${ᛝ.price}</span><br><br>${tagK}<br>${tagS}</div><br>${access}</p>`;
  output += `<p><span class="tit" style="font-size:1.2rem;color:#ffcc92;">Wearable Positions:</span><br>${setup.clothes.wearWords(ᛝ.key)}</p>`;
  output += `<p><<textbox "_nickname" "Enter a name">><<button "Set Name">><<set aw.clothes.${ᛝ.key}.nick = _nickname>><<replace "#mainName">><<print _nickname>><br><</replace>><</button>> <<button "Reset Name">><<set aw.clothes.${ᛝ.key}.nick = false>><<replace "#mainName">>Name Reset!<br><</replace>><</button>></p>`;
  output += "</div>";
  return output;
};
// prints list of items from slots
setup.clothes.wardList = function(...slot: string[]): string {
  let output = "<div id='wardrobeLister' class='wardrobeLister argyle'>";
  const ᛝ = aw.clothes;
  for (let j = 0, d = slot.length; j < d; j++) {
    let ᚥ;
    try {
      ᚥ = ↂ.ward[slot[j]];
    } catch (e) {
      aw.con.error(`Error setting the wardrobe slot (${slot[j]})... `, e);
    }
    if (ᚥ == null || ᚥ === undefined) {
      aw.con.warn(`Error with wardrobe list, ${slot[j]} is null/empty.`);
    } else if (!Array.isArray(ᚥ)) {
      aw.con.warn(`Error with wardrobe list, ${slot[j]} is not an array.`);
    } else {
      for (let i = 0, c = ᚥ.length; i < c; i++) {
        let item = `<div id="box-${ᚥ[i]}" class="wardrobeListCunt"><div class="wardCunts" style="left:0px;">`;
        item += ᛝ[ᚥ[i]].print();
        item += `</div><div id="butt-${ᚥ[i]}" class="wardrobeCmdButts"><<button "WEAR">><<run setup.clothes.wear("${ᚥ[i]}")>><<go MainWardrobe>><<run Dialog.close()>><</button>><<if aw.clothes.${ᚥ[i]}.safe>><span class="disabled"><<button "DONATE">><</button>></span>[Protected]<<else>><div id="delete${ᚥ[i]}"><<button "DONATE">><<replace "#delete${ᚥ[i]}">><span class="warnButton"><<button "REALLY?">><<run setup.clothes.delete("${ᚥ[i]}")>><<run ↂ.ward.${slot[j]}.delete("${ᚥ[i]}")>><<replace "#box-${ᚥ[i]}">><center><br><span class="wdFabric">DONATED!</span></center><</replace>><</button>></span><</replace>><</button>></div><</if>><span class="wdFabric monospace px16">[${(i + 1)} of ${ᚥ.length}]</span></div></div>`;
        output += item;
      }
    }
  }
  output += "</div>";
  return output;
};

// prints shopping list for store and item slot/type
setup.clothes.shopList = function(store: string, slot: clothingCategory): string {
  if (setup.shopInv[store] == null || setup.shopInv[store] === undefined) {
    aw.con.warn(`Bad shop/store name sent to clothes.shopList function! shop ${store} does not exist!`);
    return setup.eMsg("Missing/Bad store name in shopList function");
  }
  if (setup.shopInv[store][slot] == null || setup.shopInv[store][slot] === undefined) {
    aw.con.warn(`Bad slot/category name sent to clothes.shopList function! slot ${slot} does not exist!`);
    return setup.eMsg("Missing/Bad category name in shopList function");
  }
  const ᛝ = aw.clothes;
  const ᚥ = setup.shopInv[store][slot];
  let output = "<div id='wardrobeLister' class='storeClothesLister'>";
  for (let i = 0, c = ᚥ.length; i < c; i++) {
    const creds = setup.clothes.shopSalePrice(store, slot, ᛝ[ᚥ[i]].price);
    const namo = `${ᛝ[ᚥ[i]].color} ${ᛝ[ᚥ[i]].style} (${ᛝ[ᚥ[i]].type})`;
    let item = `<div id="box-${ᚥ[i]}" class="wardrobeListCunt"><div class="wardCunts" style="left:0px;">`;
    aw.con.info(`${ᛝ[ᚥ[i]]}`);
    item += ᛝ[ᚥ[i]].print();
    item += `</div><div id="butt-${ᚥ[i]}" class="wardrobeCmdButts"><<button "ADD 🛒">><<run $cart.push(["${namo}","${slot}",${creds},"${ᚥ[i]}"])>><<replace "#msg${ᚥ[i]}">><<fadeout 3s>>Added!<</fadeout>><</replace>><<replace "#cartTotal">><<include [[ClothesShoppingCartTotal]]>><</replace>><</button>><<button "DETAILS">><<dialog "Clothing Detail">><<print aw.clothes["${[ᚥ[i]]}"].details>><</dialog>><</button>><span class="money monospace px22">( ₢${creds} )</span><br><span class="wdFabric px18" id="msg${ᚥ[i]}">-</span></div></div>`;
    output += item;
  }
  output += "</div>";
  return output;
};

// determines current sales price if any
setup.clothes.shopSalePrice = function(store: string, slot: clothingCategory, price: number): number {
  let mod;
  switch (slot) {
    case "panties":
    case "bra":
    case "leg":
    case "niteU":
    case "niteL":
      mod = setup.shopInv[store].sales.underwear;
      break;
    case "top":
    case "bottom":
      mod = setup.shopInv[store].sales.clothes;
      break;
    case "coat":
      mod = setup.shopInv[store].sales.coats;
      break;
    case "acc":
      mod = setup.shopInv[store].sales.acc;
      break;
    case "shoes":
      mod = setup.shopInv[store].sales.shoes;
      break;
    default:
      mod = setup.shopInv[store].sales.all;
      break;
  }
  if (mod > setup.shopInv[store].sales.all) {
    mod = setup.shopInv[store].sales.all;
  }
  return Math.round(price * mod);
};

// determines if top and bottom colors are coordinated
setup.clothes.coordinate = function(top: number, bottom: number): 0|1|2|3 {
  const bottomColors = [1, 8, 15, 17, 20, 21, 23, 24, 25];
  const topColors = [1, 8, 13, 16, 17, 20, 21];
  const colorGroup = [[0, 1, 14, 15, 17], [2, 3, 9, 14, 6, 19, 26], [4, 10, 16], [5, 11, 18], [7, 12]];
  if (top === bottom) {
    return 1;
  }
  if (bottomColors.includes(bottom) || topColors.includes(top)) {
    return 2;
  }
  if (colorGroup.includes(top) && colorGroup.includes(bottom)) {
    return 3;
  }
  return 0;
};

// calculates the game stats for the outfit
setup.clothes.calculate = function(): void {
  // calculates the stats for the outfit ^-^
  // determine coordination - first check for exterior clothes
  const ᛔ = State.active.variables;
  const ᛝ = ↂ.pc.clothes;
  let topColor;
  let bottomColor;
  let coord;
  let dressy = false;
  const exterior: {top: string|0, bottom: string|0} = {top: 0, bottom: 0};
  if (ᛝ.keys.top !== 0 && ᛝ.worn.top !== "off") {
    exterior.top = "top";
  } else if (ᛝ.keys.bra !== 0 && ᛝ.worn.bra !== "off") {
    exterior.top = "bra";
  } else {
    exterior.top = "nude";
    topColor = "nude";
  }
  if (exterior.top !== "nude") {
    topColor = aw.slot[exterior.top].values.color;
  }
  if (ᛝ.keys.top !== 0 && ᛝ.worn.top !== "off" && aw.slot.top.type === "dress") {
    dressy = true;
    exterior.bottom = "top";
  } else if (ᛝ.keys.top !== 0 && ᛝ.worn.top !== "off" && aw.slot.top.type === "onepiece") {
    dressy = true;
    exterior.bottom = "bra";
  } else if (ᛝ.keys.bra !== 0 && ᛝ.worn.bra !== "off" && aw.slot.bra.type === "swimOnePiece") {
    dressy = true;
    exterior.bottom = "bra";
  } else if (ᛝ.keys.bottom !== 0 && ᛝ.worn.bottom !== "off") {
    // clothes
    exterior.bottom = "bottom";
  } else if (ᛝ.keys.panties !== 0 && ᛝ.worn.panties !== "off") {
    exterior.bottom = "panties";
  } else {
    exterior.bottom = "nude";
    bottomColor = "nude";
  }
  if (exterior.bottom !== "nude") {
    bottomColor = aw.slot[exterior.bottom].values.color;
  }
  coord = setup.clothes.coordinate(topColor, bottomColor);
  ᛝ.coordinate.outfit = (coord > 0) ? true : false;
  let atrTotal = 0;
  let sexyTotal = 0;
  let formalTotal = 0;
  let expTop;
  let expBot;
  let divisor = 4.5;
  try {
    if (exterior.top === "top" && ᛝ.keys.bra !== 0) {
      expTop = Math.round(ↂ.pc.body.topATR * (aw.slot.top.curExposure / 50) * (aw.slot.bra.curExposure / 50));
      ᛝ.stats.exposureTop = Math.round((aw.slot.top.curExposure / 50) * (aw.slot.bra.curExposure / 50) * 50);
    } else if (exterior.top === "nude") {
      expTop = ↂ.pc.body.topATR;
      ᛝ.stats.exposureTop = 50;
    } else {
      expTop = Math.round(ↂ.pc.body.topATR * (aw.slot[exterior.top].curExposure / 50));
      ᛝ.stats.exposureTop = aw.slot[exterior.top].curExposure;
    }
  } catch (e) {
    console.log(`Failed at area 1 with values error - ${e.name}: ${e.message}.`);
  }
  try {
    if (exterior.bottom === "bottom" && ᛝ.keys.panties !== 0) {
      expBot = Math.round(ↂ.pc.body.botATR * (aw.slot.bottom.curExposure / 50) * (aw.slot.panties.curExposure / 50));
      ᛝ.stats.exposureBot = Math.round((aw.slot.bottom.curExposure / 50) * (aw.slot.panties.curExposure / 50) * 50);
    } else if (exterior.bottom === "top" && ᛝ.keys.panties !== 0) {
      expBot = Math.round(ↂ.pc.body.botATR * (aw.slot.top.curExposure / 50) * (aw.slot.panties.curExposure / 50));
      ᛝ.stats.exposureBot = Math.round((aw.slot.top.curExposure / 50) * (aw.slot.panties.curExposure / 50) * 50);
    } else if (exterior.bottom === "nude") {
      expBot = ↂ.pc.body.botATR;
      ᛝ.stats.exposureBot = 50;
    } else {
      expBot = Math.round(ↂ.pc.body.botATR * (aw.slot[exterior.bottom].curExposure / 50));
      ᛝ.stats.exposureBot = aw.slot[exterior.bottom].curExposure;
    }
  } catch (e) {
    console.log(`Failed at area 2 with values error - ${e.name}: ${e.message}.`);
  }
  try {
    if (exterior.top === "nude") {
      atrTotal += ↂ.pc.body.topATR + ↂ.pc.body.topATR + 12;
      sexyTotal += 12;
      formalTotal -= 8;
    } else {
      atrTotal += aw.slot[exterior.top].values.atr + aw.slot[exterior.top].values.atr;
      sexyTotal += aw.slot[exterior.top].values.sexy + aw.slot[exterior.top].values.sexy;
      formalTotal += aw.slot[exterior.top].values.formal + aw.slot[exterior.top].values.formal;
      if (ᛝ.keys.bra === 0 || ᛝ.worn.bra !== "off") {
        sexyTotal += 2;
      }
      if (ᛝ.keys.top === 0 || ᛝ.worn.top === "off") {
        sexyTotal += 3;
        formalTotal -= 2;
      }
    }
  } catch (e) {
    console.log(`Failed at area 3 with values error - ${e.name}: ${e.message}.`);
  }
  try {
    if (exterior.bottom === "nude") {
      atrTotal += ↂ.pc.body.botATR + ↂ.pc.body.botATR;
      sexyTotal += 12;
      formalTotal -= 8;
    } else {
      atrTotal += aw.slot[exterior.bottom].values.atr + aw.slot[exterior.bottom].values.atr;
      sexyTotal += aw.slot[exterior.bottom].values.sexy + aw.slot[exterior.bottom].values.sexy;
      formalTotal += aw.slot[exterior.bottom].values.formal + aw.slot[exterior.bottom].values.formal;
      if (ᛝ.keys.panties === 0 || ᛝ.worn.panties === "off") {
        sexyTotal += 4;
      }
    }
    if (ᛝ.keys.leg !== 0 && ᛝ.worn.leg !== "off") {
      divisor = 5;
      atrTotal += aw.slot.leg.values.atr;
      sexyTotal += aw.slot.leg.values.sexy;
      formalTotal += aw.slot.leg.values.formal;
    }
  } catch (e) {
    console.log(`Failed at area 4 with values error - ${e.name}: ${e.message}.`);
  }
  atrTotal = Math.max(-6, Math.round(atrTotal / divisor + ((expTop + expBot) / 2)));
  sexyTotal = Math.max(-8, Math.round(sexyTotal / divisor));
  formalTotal = Math.max(-8, Math.round(formalTotal / divisor));
  atrTotal = Math.min(25, atrTotal);
  sexyTotal = Math.min(12, sexyTotal);
  formalTotal = Math.min(8, formalTotal);
  ᛝ.stats.atr = atrTotal;
  ᛝ.stats.sexy = sexyTotal;
  ᛝ.stats.formal = formalTotal;
  aw.S();
};

// equips clothing item into slot to wear it
setup.clothes.wear = function(key: string, slot: 0|clothingSlot = 0): "ERROR!"|"Success!" {
  // equips item into slot
  if (aw.clothes[key] == null || aw.clothes[key] === undefined) {
    aw.con.warn(`Attempted to wear nonexistent garment with key: ${key}. Skipping.`);
    return "ERROR!";
  }
  const ᛝ = ↂ.pc.clothes;
  if (slot === 0 || !Object.keys(aw.slot).includes(slot)) {
    slot = aw.clothes[key].slot;
  }
  aw.slot[slot] = aw.clothes[key]; // assign reference
  ᛝ.keys[slot] = key;
  ᛝ.worn[slot] = "normal";
  aw.S();
  setup.clothes.calculate();
  return "Success!";
};

setup.clothes.referenceTryCount = 0;

// rebuilds the reference methods based on the PC - aw.slot object
setup.clothes.referenceRebuild = function(): void {
  if (ↂ.pc == null || ↂ.pc.clothes == null) {
    setup.clothes.referenceTryCount += 1;
    if (setup.clothes.referenceTryCount < 31) {
      window.setTimeout(function() {setup.clothes.referenceRebuild(); }, 200);
      return;
    } else {
      UI.alert(`The ↂ.pc object isn't ready yet, loading timed out after 6 seconds...`);
    }
  }
  const ᛝ = ↂ.pc.clothes;
  const keys = Object.keys(aw.slot);
  for (let i = 0, c = keys.length; i < c; i++) {
    if (ᛝ.keys[keys[i]] !== 0) {
      aw.slot[keys[i]] = aw.clothes[ᛝ.keys[keys[i]]];
    }
  }
};

// remove clothing item that is currently in slot
setup.clothes.remove = function(slot: clothingSlot): "ERROR!"|"Success!" {
  // removes item from slot
  const ᛝ = ↂ.pc.clothes;
  if (!Object.keys(aw.slot).includes(slot)) {
    aw.con.warn(`Attempted to remove clothing from bad slot name! (${slot}).`);
    return "ERROR!";
  }
  aw.slot[slot] = 0;
  ᛝ.keys[slot] = 0;
  ᛝ.worn[slot] = 0;
  aw.S();
  setup.clothes.calculate();
  return "Success!";
};

// deletes clothing from object store aw.clothes
setup.clothes.delete = function(key: string, force: boolean = false): void {
  if (aw.clothes[key] == null || aw.clothes[key] === undefined) {
    aw.con.warn(`Attempted to delete nonexistent garment with key: ${key}. Skipping.`);
    return;
  }
  if (aw.clothes[key].save && !force) {
    return; // don't delete safe objects
  }
  const slut = aw.clothes[key].slot; // get slot of item.
  const inSlut = ↂ.pc.clothes.keys[slut]; // get key of current item in slot
  if (inSlut === key) { // if item is being warn, removes it before deleting.
    setup.clothes.remove(slut);
  }
  delete aw.clothes[key];
  const ᚥ = ↂ.ward;
  const grps = Object.keys(ᚥ);
  for (let i = 0, c = grps.length; i < c; i++) {
    ᚥ[grps[i]].delete(key);
  }
};
/*
!!!SLOTS!!!
panties: 0,
bra: 0,
leg: 0,
top: 0,
bottom: 0,
coat: 0,
bag: 0,
accA: 0,
accB: 0,
accC: 0,
accD: 0,
shoes: 0,
*/

// returns written form of different wearable positions as array
setup.clothes.wearWords = function(key: string): string[]|string {
  if (aw.clothes[key] === null || aw.clothes[key] === undefined) {
    return `The clothing item with key ${key} does not exist. This is an error.`;
  }
  const ᛝ = aw.clothes[key];
  const res: string[] = [];
  for (let i = 0, c = ᛝ.wear.length; i < c; i++) {
    let word = ᛝ.wear[i];
    switch (word) {
      case "normal":
        word = " Normal";
        break;
      case "off":
        word = " Taken Off";
        break;
      case "pulledUp":
        word = " Pulled Up";
        break;
      case "pulledDown":
        word = " Pulled Down";
        break;
      case "unzipped":
        word = " Unzipped";
        break;
      case "unbuttoned":
        word = " Unbuttoned";
        break;
      case "halfButton":
        word = " Halfway Buttoned";
        break;
      case "flippedUp":
        word = " Flipped Up";
        break;
      case "flippedDown":
        word = " Flipped Down";
        break;
      case "titsOut":
        word = " Tits Pulled Out";
        break;
      case "pulledAside":
        word = " Pulled Aside";
        break;
      case "strapsOff":
        word = " Straps Off";
        break;
      case "untied":
        word = " Untied";
        break;
    }
    res.push(word);
  }
  return res;
};

// converts keyword string to normal word
setup.clothes.wearKeyParse = function(inpt: string): string {
  let word;
  switch (inpt) {
    case "normal":
      word = "Normal";
      break;
    case "off":
      word = "Taken Off";
      break;
    case "pulledUp":
      word = "Pulled Up";
      break;
    case "pulledDown":
      word = "Pulled Down";
      break;
    case "unzipped":
      word = "Unzipped";
      break;
    case "unbuttoned":
      word = "Unbuttoned";
      break;
    case "halfButton":
      word = "Halfway Buttoned";
      break;
    case "flippedUp":
      word = "Flipped Up";
      break;
    case "flippedDown":
      word = "Flipped Down";
      break;
    case "titsOut":
      word = "Tits Pulled Out";
      break;
    case "pulledAside":
      word = "Pulled Aside";
      break;
    case "strapsOff":
      word = "Straps Off";
      break;
    case "untied":
      word = "Untied";
      break;
    default:
      word = "Unknown! (" + inpt + ")";
  }
  return word;
};

// generates a set of buttons to sort clothing items in display
setup.clothes.sortButtons = function(arrayVarString: string, cuntID: string, twinePrinter: string): string {
  // sort the clothing with buttons
  let sortUp = "";
  let sortDown = "";
  let output = `<div class="WardrobeSortButtons argyle">SORT:`;
  const list = ["atr", "sexy", "formal", "exposure", "price"];
  const label = ["ATR", "SEX", "FRM", "EXP", "₢₢₢"];
  if (Array.isArray(arrayVarString)) {
    // check each argument
    for (let i = 0, c = arrayVarString.length; i < c; i++) {
      if (arrayVarString[i].slice(0, 1) === "ↂ" ||
        arrayVarString[i].slice(0, 1) === "$" ||
        arrayVarString[i].slice(0, 1) === "_" ||
        arrayVarString[i].slice(0, 13) === "setup.shopInv") {
        sortUp += `<<run setup.clothes.sort(${arrayVarString[i]}, _st,true)>>`;
        sortDown += `<<run setup.clothes.sort(${arrayVarString[i]}, _st,false)>>`;
      } else {
        aw.con.warn(`wardrobe sort buttons - ${arrayVarString} missing sigil.`);
      }
    }
  } else {
    if (arrayVarString.slice(0, 1) === "ↂ" || arrayVarString.slice(0, 1) === "$" || arrayVarString.slice(0, 1) === "_" || arrayVarString.slice(0, 13) === "setup.shopInv") {
      sortUp = `<<run setup.clothes.sort(${arrayVarString}, _st,true)>>`;
      sortDown = `<<run setup.clothes.sort(${arrayVarString}, _st,false)>>`;
    } else {
      aw.con.warn(`wardrobe sort buttons - ${arrayVarString} missing sigil.`);
    }
  }
  for (let i = 0, c = list.length; i < c; i++) {
    output += ` <<button "🡱">><<set _st = "${list[i]}">>${sortUp}<<replace "${cuntID}">>${twinePrinter}<</replace>> <</button>>${label[i]}<<button "🡳">><<set _st = "${list[i]}">>${sortDown}<<replace ${cuntID}>>${twinePrinter}<</replace>><</button>>`;
  }
  output += "</div>";
  aw.con.info(output);
  return output;
};
// <<run setup.clothes.sort(${arrayVarString},"${list[i]}",true)>> <<run setup.clothes.sort(${arrayVarString},"${list[i]}",false)>>

// sorts clothing by provided key
setup.clothes.sort = function(array: Garment[], key: string, ascend: boolean = false): void {
  if (!Array.isArray(array)) {
    aw.con.warn(`Variable sent to slothes.sort is invalid - not an array: ${array}`);
    return;
  }
  function compare(a, b) {
    const valueA = aw.clothes[a].values[key];
    const valueB = aw.clothes[b].values[key];
    let comparison = 0;
    if (ascend) {
      // ascending
      if (valueA < valueB) {
        comparison = 1;
      } else if (valueA > valueB) {
        comparison = -1;
      }
    } else {
      // descending
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }
    }
    return comparison;
  }
  array = array.sort(compare);
};

// generates a unique key for the clothing
setup.clothes.keyGen = function(): string {
  let count = State.active.variables.AW.wardrobeCount;
  State.active.variables.AW.wardrobeCount += 1;
  count += "";
  const letters = ["b", "c", "d", "f", "g", "h", "j", "k", "m", "n", "p"];
  let work = "";
  let j = 0;
  let num;
  for (let i = 0, c = count.length; i < c; i++) {
    j = i + 1;
    num = Number(count.slice(i, j));
    work += letters[num];
  }
  return work;
};

Macro.add("clothStatus", {
  handler() {
    const out = aw.slot[this.args[0]].status();
    return new Wikifier(this.output, out);
  },
});

setup.clothes.basePrice = function(type: clothingType, atr: number, formal: number, sexy: number, expose: number, origin: string): number {
  const ᛔ = State.active.variables;
  let storeMod;
  let base;
  let frac;
  let lowerLimit;
  try {
    storeMod = aw.base.storeMod[origin];
  } catch (e) {
    aw.con.warn(`CLOTHING GEN: Origin StoreMod not found for ${origin} while pricing garment type: ${type}.`);
    storeMod = 2;
  }
  switch (type) {
    case "panties":
      base = aw.base.shop.panties;
      break;
    case "bra":
      base = aw.base.shop.bras + Math.round(ↂ.pc.body.tits.cupNum / 2);
      break;
    case "stocking":
      base = aw.base.shop.stockings;
      break;
    case "skirt":
    case "pants":
    case "shorts":
      base = aw.base.shop.lower;
      break;
    case "top":
      base = aw.base.shop.upper;
      break;
    case "dress":
      base = aw.base.shop.dress;
      break;
    case "coat":
    case "jacket":
      base = aw.base.shop.coats;
      break;
    case "swimBottom":
      base = aw.base.shop.swimBottom;
      break;
    case "swimTop":
      base = aw.base.shop.swimTop + Math.round(ↂ.pc.body.tits.cupNum / 4);
      break;
    case "swimOnePiece":
      base = aw.base.shop.swimOnePiece;
      break;
    case "sportBottom":
      base = aw.base.shop.athleticBottom;
      break;
    case "sportTop":
      base = aw.base.shop.athleticTop;
      break;
    case "sports bra":
      base = aw.base.shop.athleticBra + ↂ.pc.body.tits.cupNum;
      break;
    case "shoes":
      base = aw.base.shop.shoes;
      break;
    default:
      aw.con.warn(`CLOTHING: missing base price info or bad type value for type ${type}.`);
      base = 20;
  }
  frac = base / 24;
  lowerLimit = frac * -2;
  base += Math.max(lowerLimit, Math.floor(frac * (atr + 5)));
  base += Math.max(lowerLimit, Math.floor(frac * (formal + 6)));
  base += Math.max(lowerLimit, Math.floor(frac * Math.abs(sexy + 2)));
  if (sexy > 1) {
    base += Math.max(lowerLimit, Math.floor(frac * (expose / 5)));
  } else {
    base += Math.max(lowerLimit, Math.floor(frac * (expose / 10)));
  }
  base *= storeMod;
  return Math.round(base);
};

// compresses garments into a single json
setup.clothes.gameSave = function(): string {
  const data = {};
  const keys = Object.keys(aw.clothes);
  let toAlert = true;
  for (let i = 0, c = keys.length; i < c; i++) {
    const key = keys[i];
    const ᛝ = aw.clothes[key];
    try {
      data[key] = {
        key,
        nick : ᛝ.nick,
        type : ᛝ.type,
        slot : ᛝ.slot,
        colorWord : ᛝ.color,
        styleWord : ᛝ.style,
        subStyleWord : ᛝ.subStyle,
        tertiaryWord : ᛝ.tertiary,
        fabricWord : ᛝ.fabric,
        atr : ᛝ.values.atr,
        sexy : ᛝ.values.sexy,
        formal : ᛝ.values.formal,
        exposure : ᛝ.values.exposure,
        flag : clone(ᛝ.flag),
        damage : ᛝ.values.damage,
        cond : clone(ᛝ.cond),
        dirty : ᛝ.values.dirty,
        wetness : ᛝ.wetness,
        style : ᛝ.values.style,
        subStyle : ᛝ.values.subStyle,
        fabric : ᛝ.values.fabric,
        color : ᛝ.values.color,
        origin : ᛝ.origin,
        price : ᛝ.price,
        swimwear :  ᛝ.swimwear,
        nightwear : ᛝ.nightwear,
        athletic : ᛝ.athletic,
        kinky : ᛝ.kinky,
        accessNip : ᛝ.access.nip,
        accessPussy : ᛝ.access.pussy,
        accessButt : ᛝ.access.butt,
        accessTits : ᛝ.access.tits,
        accessAss : ᛝ.access.ass,
        wear : clone(ᛝ.wear),
        save : ᛝ.save,
        img : ᛝ.img,
      };
    } catch (e) {
      if (toAlert) {
        toAlert = false;
        UI.alert(`failed to convert clothing item with key ${key} with the error ${e.name}: ${e.message}! The save process will continue, however not all data will be saved.`);
      } else {
        aw.con.warn(`failed to convert clothing item with key ${key} with the error ${e.name}: ${e.message}!`);
      }
    }
  }
  return JSON.stringify(data);
};

// interprets stringified Garments and recreates objects
setup.clothes.gameLoad = function(stringo: string): void {
  const data = JSON.parse(stringo);
  const keys = Object.keys(data);
  aw.con.info(`Discovered ${keys.length} keys in clothing string. Loading...`);
  let stop;
  const start = performance.now();
  aw.clothes = {};
  for (let i = 0, c = keys.length; i < c; i++) {
    aw.clothes[keys[i]] = new Garment(data[keys[i]]);
  }
  stop = performance.now();
  const time = stop - start;
  aw.con.info(`Garment proto loading complete in ${time}ms.`);
};

setup.clothes.dataExport = function(key: string): string {
  const ᛝ = aw.clothes[key];
  const data = {
      key,
      nick: ᛝ.nick,
      type: ᛝ.type,
      slot: ᛝ.slot,
      colorWord: ᛝ.color,
      styleWord: ᛝ.style,
      subStyleWord: ᛝ.subStyle,
      tertiaryWord: ᛝ.tertiary,
      fabricWord: ᛝ.fabric,
      atr: ᛝ.values.atr,
      sexy: ᛝ.values.sexy,
      formal: ᛝ.values.formal,
      exposure: ᛝ.values.exposure,
      flag: clone(ᛝ.flag),
      damage: ᛝ.values.damage,
      cond: clone(ᛝ.cond),
      dirty: ᛝ.values.dirty,
      wetness: ᛝ.wetness,
      style: ᛝ.values.style,
      subStyle: ᛝ.values.subStyle,
      fabric: ᛝ.values.fabric,
      color: ᛝ.values.color,
      origin: ᛝ.origin,
      price: ᛝ.price,
      swimwear: ᛝ.swimwear,
      nightwear: ᛝ.nightwear,
      athletic: ᛝ.athletic,
      kinky: ᛝ.kinky,
      accessNip: ᛝ.access.nip,
      accessPussy: ᛝ.access.pussy,
      accessButt: ᛝ.access.butt,
      accessTits: ᛝ.access.tits,
      accessAss: ᛝ.access.ass,
      wear: clone(ᛝ.wear),
      save: ᛝ.save,
      img: ᛝ.img,
    };
  const out = JSON.stringify(data);
  return out;
};

setup.clothes.staining = function(place: string, amt: number, type: string): void {
  let msg = "none";
  let FullAmount = Math.floor(amt / 2);
  let SmallAmount = Math.floor(amt / 3);
  const WaterFullAmount = Math.floor(amt / 2);
  const WaterSmallAmount = Math.floor(amt / 3);
  if (type === "water") {
    FullAmount = 0;
    SmallAmount = 0;
    msg = "wet";
  } else {
    msg = "dirty";
  }
  aw.con.info(`${FullAmount}, ${SmallAmount}, ${WaterFullAmount}, ${WaterSmallAmount}`); // REMOVE ME
  if (place !== "vagFluid" && place !== "anusFluid") { // staining from outside
    if (ↂ.pc.clothes.worn.coat === "normal" && ↂ.pc.clothes.keys.coat !== 0) { // overwear is stained but protects other clothes
      switch (place) {
        case "chest":
        case "back":
        case "stomach":
        case "butt":
        case "groin":
        case "genitals":
        case "thighs":
        case "legs":
        aw.clothes[ↂ.pc.clothes.keys.coat].values.dirty += FullAmount;
        aw.clothes[ↂ.pc.clothes.keys.coat].wetness += WaterFullAmount;
        break;
        default:
          break;
      }
    } else { // no overwear, stain everything!
        switch (place) {
          case "chest":
          case "back":
          case "stomach":
            if (ↂ.pc.clothes.worn.top === "normal" && ↂ.pc.clothes.keys.top !== 0) { // top is here
              aw.clothes[ↂ.pc.clothes.keys.top].values.dirty += FullAmount;
              aw.clothes[ↂ.pc.clothes.keys.top].wetness += WaterFullAmount;
              if (ↂ.pc.clothes.worn.bra === "normal" && amt > 10 && ↂ.pc.clothes.keys.bra !== 0) { // bra is here too, stain it a bit
                aw.clothes[ↂ.pc.clothes.keys.bra].values.dirty += SmallAmount;
                aw.clothes[ↂ.pc.clothes.keys.bra].wetness += WaterSmallAmount;
              }
            } else if (ↂ.pc.clothes.worn.bra === "normal" && ↂ.pc.clothes.keys.bra !== 0) { // no top but bra is here
              aw.clothes[ↂ.pc.clothes.keys.bra].values.dirty += FullAmount;
              aw.clothes[ↂ.pc.clothes.keys.bra].wetness += WaterFullAmount;
            }
            break;
          case "butt":
          case "groin":
          case "genitals":
            if (ↂ.pc.clothes.worn.bottom === "normal" && ↂ.pc.clothes.keys.bottom !== 0) { // bottom is here
              aw.clothes[ↂ.pc.clothes.keys.bottom].values.dirty += FullAmount;
              aw.clothes[ↂ.pc.clothes.keys.bottom].wetness += WaterFullAmount;
              if (ↂ.pc.clothes.worn.panties === "normal" && amt > 10 && ↂ.pc.clothes.keys.panties !== 0) { // panties are here too, stain em a bit
                aw.clothes[ↂ.pc.clothes.keys.panties].values.dirty += SmallAmount;
                aw.clothes[ↂ.pc.clothes.keys.panties].wetness += WaterSmallAmount;
              }
            } else if (ↂ.pc.clothes.worn.panties === "normal" && ↂ.pc.clothes.keys.panties !== 0) { // no bottom but panties are here
              aw.clothes[ↂ.pc.clothes.keys.panties].values.dirty += FullAmount;
              aw.clothes[ↂ.pc.clothes.keys.panties].wetness += WaterFullAmount;
            }
            break;
          case "thighs":
          case "legs":
            if (ↂ.pc.clothes.worn.bottom === "normal" && ↂ.pc.clothes.keys.bottom !== 0) { // bottom is here
              aw.clothes[ↂ.pc.clothes.keys.bottom].values.dirty += FullAmount;
              aw.clothes[ↂ.pc.clothes.keys.bottom].wetness += WaterFullAmount;
              if (ↂ.pc.clothes.worn.leg === "normal" && amt > 10 && ↂ.pc.clothes.keys.leg !== 0) { // stockings are here too, stain em a bit
                aw.clothes[ↂ.pc.clothes.keys.leg].values.dirty += SmallAmount;
                aw.clothes[ↂ.pc.clothes.keys.leg].wetness += WaterSmallAmount;
              }
            } else if (ↂ.pc.clothes.worn.leg === "normal" && ↂ.pc.clothes.keys.leg !== 0) { // no bottom but stockings are here
              aw.clothes[ↂ.pc.clothes.keys.leg].values.dirty += FullAmount;
              aw.clothes[ↂ.pc.clothes.keys.leg].wetness += WaterFullAmount;
            }
            break;
          default:
            break;
        }
    }
  } else { // staining from inside out
    // TODO check for various toys e.g. chastity belts, buttplugs, dildos and whatnot can block the leaking.
    if (ↂ.pc.clothes.worn.panties === "normal") { // panties are here
      aw.clothes[ↂ.pc.clothes.keys.panties].values.dirty += FullAmount;
      if (ↂ.pc.clothes.worn.bottom === "normal" && amt > 10) { // bottom is here too, stain it a bit if the amount is serious
        aw.clothes[ↂ.pc.clothes.keys.bottom].values.dirty += SmallAmount;
      }
    } else if (ↂ.pc.clothes.worn.bottom === "normal") { // bad girl did not wear her panties! At least she wears something to cover her bottom part
      aw.clothes[ↂ.pc.clothes.keys.bottom].values.dirty += FullAmount;
    }
  }
  if (msg === "dirty") {setup.notify("Your clothes got dirty.")}
  if (msg === "wet") {setup.notify("Your clothes got wet.")}
  aw.S("pc");
  aw.con.info(`setup.clothes.staining complete. Input: ${place} ${amt} ${type}.`);
};

setup.clothes.washing = function(): void {
  const slots = ["athL", "athU", "bottom", "bra", "coat", "dress", "leg", "niteL", "niteU", "panties", "swimL", "swimU", "top"];
  let ownedList = [];
  for (let index = 0; index < slots.length; index++) {
    if (ↂ.ward[slots[index]] !== null && ↂ.ward[slots[index]] !== []) {
    ownedList = ownedList.concat(ↂ.ward[slots[index]]);
    }
  }
  aw.con.info(`${ownedList}`);
  if (ownedList.length !== 0) {
    for (let index = 0; index < ownedList.length; index++) {
      if (aw.clothes[ownedList[index]].values.dirty !== null) {
        aw.clothes[ownedList[index]].values.dirty = 0;
      }
      if (aw.clothes[ownedList[index]].wetness !== null) {
        aw.clothes[ownedList[index]].wetness = 0;
      }
    }
  }
};

setup.clothes.drying = function(): void {
  const slots = ["athL", "athU", "bottom", "bra", "coat", "dress", "leg", "niteL", "niteU", "panties", "swimL", "swimU", "top"];
  let ownedList = [];
  for (let index = 0; index < slots.length; index++) {
    if (ↂ.ward[slots[index]] !== null && ↂ.ward[slots[index]] !== []) {
    ownedList = ownedList.concat(ↂ.ward[slots[index]]);
    }
  }
  aw.con.info(`${ownedList}`);
  if (ownedList.length !== 0) {
    for (let index = 0; index < ownedList.length; index++) {
      if (aw.clothes[ownedList[index]].wetness !== null) {
        aw.clothes[ownedList[index]].wetness -= 1;
      }
    }
  }
};
