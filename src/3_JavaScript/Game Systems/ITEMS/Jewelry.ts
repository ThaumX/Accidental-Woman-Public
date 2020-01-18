/*
/*      ██╗███████╗██╗    ██╗███████╗██╗
/*      ██║██╔════╝██║    ██║██╔════╝██║
/*      ██║█████╗  ██║ █╗ ██║█████╗  ██║
/* ██   ██║██╔══╝  ██║███╗██║██╔══╝  ██║
/* ╚█████╔╝███████╗╚███╔███╔╝███████╗███████╗
/*  ╚════╝ ╚══════╝ ╚══╝╚══╝ ╚══════╝╚══════╝
*/

interface setupJewel {
  prop: (slot: jewelSlot, prop: string) => any ;
  slot: (slot: jewelSlot) => false | string | string[] ;
  slotNames: jewelSlot[];
  comboNames: string[];
  worn: (jewel: string) => false | jewelSlot ;
  exists: (jewel: string) => boolean ;
  find: (jewel: string) => false | jewelSlot | "owned";
  owned: (jewel: string) => boolean ;
  removeAll: () => string ;
  putOn: (item: string, slot: jewelSlot, give?: boolean) => boolean | Error ;
  takeOff: (name: string) => void ;
  lose: (name: string | jewelSlot) => void ;
  print: ({ owned, slot, wearButt, removeButt, max, min, small }: { owned: boolean, slot: false | jewelSlot, wearButt: boolean, removeButt: boolean, max: false | number, min: false | number, small: boolean }) => string ;
  sale: ({ names, slots, wearButt, removeButt, max, min, small }: { names?: boolean | string[], slots?: false | jewelSlot[], wearButt?: boolean, removeButt?: boolean, max?: false | number, min?: false | number, small?: boolean }) => string ;
  printWorn: () => string ;
  wearCount: () => number ;
  buttonGen: (combo: jewelSlot, key: string) => string ;
  comboSlots: {
    wrist: string[];
    hand: string[];
    ring: string[];
    ear: string[];
    nip: string[]
  };
  slotWords: (slot: jewelSlot) => string ;
  slotChecker: (jew: string, slot: jewelSlot) => boolean ;
}


aw.jewel = {};
class Jewel {
  public key: string;
  public short: string;
  public long: string;
  public slot: jewelSlot;
  public atr: number;
  public cost: number;
  public type: string;
  public image: string;
  public name: string;
  constructor({name,
    key,
    short = "a jewel",
    long = "a piece of kid's costume jewelry",
    slot = "none",
    atr = 0,
    cost = 1,
    type = "norm",
    image = "IMGnone75",
  }: {key: string, name: string, short: string, long: string, slot: jewelSlot, atr: number, cost: number, type: string, image: string}) {
    this.name = name;
    this.key = key;
    this.short = short;
    this.long = long;
    this.slot = slot;
    this.atr = atr;
    this.cost = cost;
    this.type = type;
    if (!image) {
      this.image = "IMGjewelPlaceholder";
    } else {
      this.image = image;
    }
  }
}


setup.jewel = {
  // returns specified property
  prop(slot: jewelSlot, prop: string): any {
    prop = setup.prop(prop);
    return aw.jewel[ↂ.pc.jewel[slot]][prop];
  },
  // returns key of jewels in specified slot
  slot(slot: jewelSlot): false|string|string[] { // checks slot/s for jewelry. returns name or array of names or false
    let item: any = false;
    const s = setup.jewel.slotNames.includes(slot);
    const c = setup.jewel.comboNames.includes(slot);
    if (!s && !c) {
      throw new TypeError(`Invalid slot name "${slot}" sent to jewel.slot function!`);
    } else if (c) {
      item = [];
      const keys = setup.jewel.comboSlots[slot];
      const leng = keys.length;
      for (let i = 0; i < leng; i++) {
        if (ↂ.pc.jewel[keys[i]] !== "none") {
          item.push(ↂ.pc.jewel[keys[i]]);
        }
      }
      if (item.length === 0) {
        return false;
      } else {
        return item;
      }
    }
    if (ↂ.pc.jewel[slot] === "none") {
      return false;
    } else {
      return ↂ.pc.jewel[slot];
    }
  },
  // determines if jewel key is being worn, returns slot if so, or false
  worn(jewel: string): false|jewelSlot { // returns slot name or false if jewelry item is worn or not
    if (setup.jewel.exists(jewel)) {
      let found: string|false = false;
      for (let i = 0, a = setup.jewel.slotNames.length; i < a; i++) {
        if (ↂ.pc.jewel[setup.jewel.slotNames[i]] === jewel) {
          found = setup.jewel.slotNames[i];
          break;
        }
        return found;
      }
    }
    return false;
  },
  // searches all existing jewelry in aw.jewel to see if key exists
  exists(jewel: string): boolean {
    const keys = Object.keys(aw.jewel);
    if (keys.includes(jewel)) {
      return true;
    } else {
      setup.log(`jewel.exists searched for jewel "${jewel}" and didn't find it.`);
      return false;
    }
  },
  // returns location of jewel, either slot, owned, or false
  find(jewel: string): false|jewelSlot|"owned" { // returns location of jewel, or false if not owned
    let x: jewelSlot | "owned" | false = setup.jewel.worn(jewel);
    if (!x) {
      x = (setup.jewel.owned(jewel)) ? "owned" : false;
    }
    return x;
  },
  // returns true/false if jewel is owned
  owned(jewel: string): boolean { // returns true/false if player owns item at all
    if (ↂ.pc.jewel.owned.includes(jewel)) {
      return true;
    }
    if (setup.jewel.worn(jewel)) {
      return true;
    }
    return false;
  },
  // removes all jewelry in jewelry slots
  removeAll(): string {
    const leng = setup.jewel.slotNames.length;
    for (let i = 0; i < leng; i++) {
      const x = setup.jewel.slot(setup.jewel.slotNames[i]);
      if (x) {
        setup.jewel.takeOff(x as string);
      }
    }
    return "All worn jewelry removed!";
  },
  // equips jewelry in specified slot, give bool to give item to player if not owned. (piercings)
  putOn(item: string, slot: jewelSlot, give: boolean = false): boolean|Error {
    if (!setup.jewel.exists(item)) {
      return new ReferenceError(`Invalid jewel key "${item}" sent to jewel.putOn function!`);
    }
    if (!setup.jewel.slotNames.includes(slot)) {
      return new ReferenceError(`Invalid slot key "${slot}" sent to jewel.putOn function!`);
    }
    if (!setup.jewel.owned(item) && !give) {
      return false;
    }
    if (!ↂ.pc.jewel.pierced[slot]) {
      setup.notify("<span class='orange'><b>You need to be pierced to wear that!</b></span>");
    }
    if (ↂ.pc.jewel[slot] !== "none") {
      ↂ.pc.jewel.owned.push(ↂ.pc.jewel[slot]);
    }
    if (ↂ.pc.jewel.owned.includes(item)) {
      ↂ.pc.jewel.owned.deleteAt(ↂ.pc.jewel.owned.indexOf(item));
    } else if (setup.jewel.worn(item)) {
      ↂ.pc.jewel[setup.jewel.worn(item) as string] = "none";
    }
    ↂ.pc.jewel[slot] = item;
    return true;
  },
  // takes off a piece of jewelry. supply either slot or jewel key
  takeOff(name: string): void {
    if (setup.jewel.slotNames.includes(name)) {
      const m = ↂ.pc.jewel[name];
      if (m !== "none") {
        ↂ.pc.jewel.owned.push(m);
        ↂ.pc.jewel[name] = "none";
      }
    } else {
      const k = setup.jewel.worn(name);
      if (k) {
        ↂ.pc.jewel[k] = "none";
        ↂ.pc.jewel.owned.push(name);
      }
    }
    // Nothing to take off
  },
  // removes jewelry item from player's inventory, and unequips
  lose(name: string|jewelSlot): void {
    if (setup.jewel.slotNames.includes(name)) {
      const x = ↂ.pc.jewel[name];
      ↂ.pc.jewel[name] = "none";
      setup.notify(`<span class="bad">You lost the ${aw.jewel[x].name} you were wearing!</span>`);
    } else {
      const k = setup.jewel.worn(name);
      if (k) {
        ↂ.pc.jewel[k] = "none";
        setup.notify(`<span class="bad">You lost the ${aw.jewel[name].name} you were wearing!</span>`);
      }
    }
  },

  // prints a formatted list of jewelry items
  print({ owned = true, slot = false, wearButt = false, removeButt = false, max = false, min = false, small = false }: { owned: boolean, slot: false | jewelSlot, wearButt: boolean, removeButt: boolean, max: false | number, min: false | number, small: boolean } = {owned, slot, wearButt, removeButt, max, min, small}): string {
    const keys = Object.keys(aw.jewel);
    const leng = keys.length;
    let out = "";
    if (wearButt && removeButt) {
      return "<span class='bad'>ERROR: can't have both a wear button and a remove button!</span>";
    }
    for (let i = 0; i < leng; i++) {
      let ck = true;
      if (slot && aw.jewel[keys[i]].slot !== slot) {
        ck = false;
      } else if (owned && !setup.jewel.owned(keys[i])) {
        ck = false;
      } else if (max && aw.jewel[keys[i]].cost >= max) {
        ck = false;
      } else if (min && aw.jewel[keys[i]].cost < min) {
        ck = false;
      }
      if (ck) {
        const k = aw.jewel[keys[i]];
        if (small) {
          out += `<div id="${k}" class="jewelryItemSmall">`;
        } else {
          out += `<div id="${k}" class="jewelryItem">`;
        }
        out += `<img data-passage="${k.image}">`;
        if (wearButt) {
          if (setup.jewel.comboNames.includes(k.slot)) {
            out += `<<button "${aw.capital(k.name)}">>${setup.jewel.buttonGen(k.slot, keys[i])}<</button>>`;
          } else {
            out += `<<button "${aw.capital(k.name)}">><<run setup.jewel.putOn("${k}","${k.slot}")>><<run aw.killit("#${k}")>><<run setup.refresh()>><</button>>`;
          }
        } else if (removeButt) {
          out += `<<button "${aw.capital(k.name)}">><<run setup.jewel.takeOff("${k}")>><<run aw.killit("#${k}")>><</button>>`;
        } else {
          out += `<span class="head"><b>${aw.capital(k.name)}</b></span> `;
        }
        if (small) {
          out += `ATR: ${k.atr}, slot: ${k.slot}</div>`;
        } else {
          out += `${k.long}. ATR: ${k.atr}, slot: ${k.slot}</div>`;
        }
      }
    }
    return out;
  },
  // TODO store specific names
  // Prints a list of jewelry items to be sold.
  sale({names = false, slots = false, max = false, min = false, small = false}= {}): string {
    const keys = Object.keys(aw.jewel);
    const leng = keys.length;
    let out = "<div id='jewContainer' class='displayFlex fadeInUp animated'>";
    for (let i = 0; i < leng; i++) {
      let ck = true;
      if (Array.isArray(slots) && !slots.includes(aw.jewel[keys[i]].slot)) {
        ck = false;
      } else if (max && aw.jewel[keys[i]].cost >= max) {
        ck = false;
      } else if (min && aw.jewel[keys[i]].cost < min) {
        ck = false;
      }
      if (aw.jewel[keys[i]].cost === 0) {
        ck = false;
      }
      if (ck) {
        const k = aw.jewel[keys[i]];
        if (small) {
          out += `<div id="${k}" class="jewelryItemSmall">`;
        } else {
          out += `<div id="${k}" class="jewelryItem" style="width:400px;">`;
        }
        out += `<img data-passage="${k.image}">`;
        out += `<span class="head">${aw.capital(k.name)}</span><<sp 2>><span class="money"><<mon>>${k.cost}</span><<sp 2>><<button "Add to Cart">><<set State.active.variables.cart.push(["${k.name}","jew",${k.cost},"${k.key}"])>><<prepend "#jewOutput">>${aw.capital(k.name)}...${k.cost}<br><</prepend>><</button>><br>`;
        if (small) {
          out += `ATR: ${k.atr}, slot: ${k.slot}</div>`;
        } else {
          out += `${k.long}. ATR: ${k.atr}, slot: ${k.slot}</div>`;
        }
      }
    }
    out += "</div><div id='jewOutput' class='monospace zoomInDown animated ghettoShopOutput'><div class='lato' style='position:absolute;bottom:5px;left:5px;right:5px;font-size:24px;'>Shopping Results</div></div>";
    return out;
    /*
    [img[$jewel.neck.goldChain[3]]]</td><td>@@.storeitem;Gold Chain@@--<<print $jewel.neck.goldChain[1]>> @@.money;<<mon>>65@@. <span id="addcart2"><<link "Add to Cart">><<set _temp = ["Gold Chain",75]>><<set $cart.item.push(_temp)>><<replace "#addcart2">>@@.exp;Gold Chain added to cart.@@<</replace>><</link>></span>
    */
  },
  // prints a list of currently-worn jewelry
  printWorn(): string {
    const slot: jewelSlot[] = setup.jewel.slotNames;
    let out = "";
    for (let i = 0, c = slot.length; i < c; i++) {
      const k = ↂ.pc.jewel[slot[i]];
      out += `<div id="${slot[i]}Worn" class="jewelryItem">`;
      try {
        if (ↂ.pc.jewel.pierced[slot[i]]) {
          out += `<img data-passage='${aw.jewel[k].image}'><span class="head"><b>`;
          out += setup.jewel.slotWords(slot[i]);
          out += `</b></span><br>${aw.jewel[k].name}</div>`;
        } else {
          out += "<img data-passage='IMG-NotPierced'><span class='head'><b>";
          out += setup.jewel.slotWords(slot[i]);
          out += "</b></span><br>[not pierced]</div>";
        }
      } catch (e) {
        out += `[Some shit failed. ${e.name}: ${e.message}]`;
      }
    }
    return out;
  },
  // returns number of jewelry items currently being worn;
  wearCount(): number {
    let found = 0;
    for (let i = 0, a = setup.jewel.slotNames.length; i < a; i++) {
      if (ↂ.pc.jewel[setup.jewel.slotNames[i]] !== "none") {
        found += 1;
      }
    }
    return found;
  },
  // subfunction for equipping jewlry that has multiple possible slots.
  buttonGen(combo: jewelSlot, key: string): string {
    let out = `<<dialog "Choose A Slot">>@@.head3;C@@hoose the specific slot you would like to wear the ${aw.jewel[key].name}, or close this dialog to cancel.<br><center>`;
    const slots = setup.jewel.comboSlots[combo];
    for (let i = 0, l = slots.length; i < l; i++) {
      out += `<<button "${setup.jewel.slotWords(slots[i])}">><<run setup.jewel.putOn("${key}","${slots[i]}")>><<run aw.killit("#${key}")>><<run setup.refresh()>><<run Dialog.close()>><</button>>`;
    }
    out += "</center><</dialog>>";
    return out;
  },
  slotNames: [
    "neck",
    "wristR",
    "wristL",
    "handR",
    "handL",
    "ringR",
    "ringL",
    "nose",
    "lip",
    "tongue",
    "brow",
    "earR",
    "earL",
    "upEar",
    "belly",
    "nipR",
    "nipL",
    "clit",
    "labia",
  ],
  comboNames: [
    "wrist",
    "hand",
    "ring",
    "ear",
    "nip",
  ],
  comboSlots: {
    wrist: ["wristR", "wristL"],
    hand: ["handL", "handR", "ringL", "ringR"],
    ring: ["handL", "handR", "ringL", "ringR"],
    ear: ["earR", "earL"],
    nip: ["nipR", "nipL"],
  },
  // returns normal text for a specific slot
  slotWords(slot: jewelSlot): string {
    let res;
    switch (slot) {
    case "wristR":
      res = "right wrist";
      break;
    case "wristL":
      res = "left wrist";
      break;
    case "handL":
      res = "left index finger";
      break;
    case "handR":
      res = "right index finger";
      break;
    case "ringL":
      res = "left ring finger";
      break;
    case "ringR":
      res = "right ring finger";
      break;
    case "earR":
      res = "right ear piercing";
      break;
    case "earL":
      res = "left ear piercing";
      break;
    case "nipR":
      res = "right nipple piercing";
      break;
    case "nipL":
      res = "left nipple piercing";
      break;
    case "upEar":
      res = "upper ears";
      break;
    default:
      res = slot;
      break;
    }
    return res;
  },
  // check if a piece will fit in a certain slot;
  slotChecker(jew: string, slot: jewelSlot): boolean {
    const jewSlot = aw.jewel[jew].slot;
    const chk = {
      wrist: ["wristR", "wristL"],
      hand: ["handL", "handR", "ringL", "ringR"],
      ring: ["handL", "handR", "ringL", "ringR"],
      ear: ["earR", "earL"],
      nip: ["nipR", "nipL"],
      upEar: ["upEar"],
      clit: ["clit"],
      labia: ["labia"],
      nose: ["nose"],
      lip: ["lip"],
      tongue: ["tongue"],
      neck: ["neck"],
      belly: ["belly"],
    };
    if (chk[jewSlot].includes(slot)) {
      return true;
    }
    return false;
  },
};

aw.jewel = {};

(function() {
  const jews = {
    none: {
      name: "none",
      key: "none",
      short: "nothing",
      long: "a complete absence of jewelry",
      slot: "none",
      atr: 0,
      cost: 0,
      type: "norm",
      image: "IMGmakeupNone",
    },
    silverChain: {
      name: "silver chain",
      key: "silverChain",
      short: "thin silver chain",
      long: "a delicate chain made of interlocking silver links",
      slot: "neck",
      atr: 1,
      cost: 40,
      type: "norm",
      image: "IMGjewelSchain",
    },
    goldChain: {
      name: "gold chain",
      key: "goldChain",
      short: "thin gold chain",
      long: "a delicate chain made of gold links",
      slot: "neck",
      atr: 2,
      cost: 80,
      type: "norm",
      image: "IMGjewelGoldchain",
    },
    whiteGoldChain: {
      name: "white gold chain",
      key: "whiteGoldChain",
      short: "thin white-gold chain",
      long: "a delicate chain made of white gold links",
      slot: "neck",
      atr: 2,
      cost: 90,
      type: "norm",
      image: "IMGjewelWGchain",
    },
    spiralGoldBracelet: {
      name: "spiral gold bracelet",
      key: "spiralGoldBracelet",
      short: "spiraling gold bracelet",
      long: "a gold bracelet made of spiraling gold links",
      slot: "wrist",
      atr: 2,
      cost: 165,
      type: "norm",
      image: "IMGjewelTwistGoldB",
    },
    silverCharmBracelet: {
      name: "silver charm bracelet",
      key: "silverCharmBracelet",
      short: "silver charm bracelet",
      long: "a silver chain with several heart charms dangling from it",
      slot: "wrist",
      atr: 1,
      cost: 85,
      type: "norm",
      image: "IMGjewelSilverCharmB",
    },
    sWatchPink: {
      name: "pink SWatch",
      key: "sWatchPink",
      short: "pink SWatch",
      long: "a pink Slut-Watch brand watch",
      slot: "wrist",
      atr: 1,
      cost: 75,
      type: "bimbo",
      image: "IMGjewelSWatchPink",
    },
    catRing: {
      name: "cat ring",
      key: "catRing",
      short: "silver cat ring",
      long: "a silver ring with stylized cat ears",
      slot: "ring",
      atr: 1,
      cost: 45,
      type: "cute",
      image: "IMGjewelCatRing",
    },
    purityRing: {
      name: "purity ring",
      key: "purityRing",
      short: "purity ring",
      long: "a ring to tell people how dumb you are",
      slot: "ring",
      atr: -1,
      cost: 69,
      type: "bimbo",
      image: "IMGjewelPurityRing",
    },
    goldHeartRing: {
      name: "gold heart ring",
      key: "goldHeartRing",
      short: "gold heart ring",
      long: "a gold ring with heart cutout",
      slot: "ring",
      atr: 2,
      cost: 105,
      type: "cute",
      image: "IMGjewelGheartRing",
    },
    turquioseStoneRing: {
      name: "turquiose stone ring",
      key: "turquioseStoneRing",
      short: "turquiose ring",
      long: "a silver ring topped with a turquiose",
      slot: "ring",
      atr: 2,
      cost: 165,
      type: "norm",
      image: "IMGjewelTurqStoneRing",
    },
    goldSlutRing: {
      name: "gold slut ring",
      key: "goldSlutRing",
      short: "slut ring",
      long: "a gold ring shaped to spell 'slut' in cursive",
      slot: "ring",
      atr: 1,
      cost: 69,
      type: "bimbo",
      image: "IMGjewelGoldSlutRing",
    },
    fertilityBracelet: {
      name: "fertility bracelet",
      key: "fertilityBracelet",
      short: "fertility bracelet",
      long: "a silver bracelet with sperm links chasing the egg clasp",
      slot: "wrist",
      atr: 3,
      cost: 120,
      type: "norm",
      image: false,
    },
    diamondStuds: {
      name: "diamond stud earrings",
      key: "diamondStuds",
      short: "diamond earrings",
      long: "a pair of .25 carat diamond earrings",
      slot: "ear",
      atr: 3,
      cost: 200,
      type: "norm",
      image: "IMGjewelDiamondER",
    },
    pearlEarrings: {
      name: "pearl earrings",
      key: "pearlEarrings",
      short: "pearl earrings",
      long: "a pair of cultured pearl earrings",
      slot: "ear",
      atr: 2,
      cost: 185,
      type: "norm",
      image: "IMGjewelPearlER",
    },
    diamondNoseRing: {
      name: "diamond nose ring",
      key: "diamondNoseRing",
      short: "diamond nose ring",
      long: "a gold bar topped with a diamond",
      slot: "nose",
      atr: 2,
      cost: 165,
      type: "norm",
      image: "IMGjewelDiamondNR",
    },
    silverHoopEarrings: {
      name: "silver hoop earrings",
      key: "silverHoopEarrings",
      short: "silver hoop earrings",
      long: "a pair of silver hoop earrings",
      slot: "ear",
      atr: 2,
      cost: 185,
      type: "norm",
      image: "IMGjewelSilverHER",
    },
    goldNoseRing: {
      name: "gold nose ring",
      key: "goldNoseRing",
      short: "gold nose ring",
      long: "a gold nose rings",
      slot: "nose",
      atr: 2,
      cost: 185,
      type: "norm",
      image: "IMGjewelGoldNR",
    },
    goldHoopEarrings: {
      name: "gold hoop earrings",
      key: "goldHoopEarrings",
      short: "gold hoop earrings",
      long: "a pair of gold hoop earrings",
      slot: "ear",
      atr: 3,
      cost: 225,
      type: "norm",
      image: "IMGjewelgoldHER",
    },
    chromoEarrings: {
      name: "chromosome earrings",
      key: "chromoEarrings",
      short: "chromosome earrings",
      long: "a pair of silver chromosome earrings",
      slot: "ear",
      atr: 3,
      cost: 225,
      type: "norm",
      image: "IMGjewelChromoER",
    },
    dnaPendent: {
      name: "DNA pendent",
      key: "dnaPendent",
      short: "DNA pendent",
      long: "a silver DNA pendent",
      slot: "neck",
      atr: 3,
      cost: 225,
      type: "norm",
      image: "IMGjewelDNAP",
    },
    ballEar: {
      name: "Pink Ear Ball",
      key: "ballEar",
      short: "pink ear ball",
      long: "a large pink ball ear stud.",
      slot: "ear",
      atr: 1,
      cost: 25,
      type: "bimbo",
      image: "IMGjewelBallEar",
    },
    browBarbell: {
      name: "Brow Barbell",
      key: "browBarbell",
      short: "simple brow barbell",
      long: "a simple barbell in an eyebrow piercing.",
      slot: "brow",
      atr: 1,
      cost: 25,
      type: "norm",
      image: "IMGjewelBarebellBrow",
    },
    monsBarbell: {
      name: "Mons Barbell",
      key: "monsBarbell",
      short: "pubic mound barbell",
      long: "A piercing of the pubic mound starting above the clitoral hood.",
      slot: "clit",
      atr: 2,
      cost: 80,
      type: "norm",
      image: "IMGjewelBarebellClit",
    },
    jeweledBellyBarbell: {
      name: "Jeweled Navel",
      key: "jeweledBellyBarbell",
      short: "jeweled navel barbell",
      long: "A simple curved navel barbell with jeweled ends.",
      slot: "belly",
      atr: 3,
      cost: 175,
      type: "norm",
      image: "IMGjewelBarebellNavel",
    },
    nippleBarbell: {
      name: "Nipple Barbell",
      key: "nippleBarbell",
      short: "nipple barbell",
      long: "A simple steel nipple barbell.",
      slot: "nip",
      atr: 1,
      cost: 30,
      type: "norm",
      image: "IMGjewelBarebellNip",
    },
    lipSpiral: {
      name: "Lip Spiral",
      key: "lipSpiral",
      short: "lip spiral",
      long: "A spiral horseshoe barbell for the lip.",
      slot: "lip",
      atr: 2,
      cost: 100,
      type: "norm",
      image: "IMGjewelBitesLip",
    },
    earBranch: {
      name: "Diamond Ear Branch",
      key: "earBranch",
      short: "diamond ear branch",
      long: "A gold earring with leaf-shaped diamonds in the shape of a branch.",
      slot: "ear",
      atr: 3,
      cost: 275,
      type: "norm",
      image: "IMGjewel-ear-branch",
    },
    earDangle: {
      name: "Pearl Ear Dangle",
      key: "earDangle",
      short: "pearl ear dangle",
      long: "A long gold chain strung though the ear, with a pearl at one end.",
      slot: "ear",
      atr: 3,
      cost: 225,
      type: "norm",
      image: "IMGjewel-ear-dangle",
    },
    earFlower: {
      name: "Silver Flower Earring",
      key: "earFlower",
      short: "silver flower earring",
      long: "A series of silver flowers dangling from the ear",
      slot: "ear",
      atr: 2,
      cost: 100,
      type: "norm",
      image: "IMGjewel-ear-flower",
    },
    earGecko: {
      name: "Gecko Earring",
      key: "earGecko",
      short: "gecko earring",
      long: "a rhinestone encrusted silver gecko earring.",
      slot: "ear",
      atr: 2,
      cost: 120,
      type: "norm",
      image: "IMGjewel-ear-gecko",
    },
    earHoop: {
      name: "Silver Hoop Earring",
      key: "earHoop",
      short: "silver hoop earring",
      long: "An old fashion still around today, the hoop earring.",
      slot: "ear",
      atr: 1,
      cost: 50,
      type: "bimbo",
      image: "IMGjewel-ear-hoop",
    },
    snekEarBrace: {
      name: "Snake Ear Brace",
      key: "snekEarBrace",
      short: "snake ear brace",
      long: "a silver-alloy snake ear brace whispering dirty thoughts to its wearer.",
      slot: "ear",
      atr: 2,
      cost: 100,
      type: "slut",
      image: "IMGjewel-ear-snake",
    },
    flowerLipSpiral: {
      name: "Flower Tip Lip Spiral",
      key: "flowerLipSpiral",
      short: "flower tip lip spiral",
      long: "A spiraling lip piercing, the ends are tipped with diamond flowers.",
      slot: "lip",
      atr: 3,
      cost: 230,
      type: "norm",
      image: "IMGjewelFirstLip",
    },
    hchCaptiveBead: {
      name: "HCH Captive Bead Ring",
      key: "hchCaptiveBead",
      short: "horizontal clit hood ring",
      long: "A simple silver captive bead ring for the clitoral hood.",
      slot: "clit",
      atr: 2,
      cost: 100,
      type: "norm",
      image: "IMGjewelHCH-jewelRing",
    },
    hchvch: {
      name: "HCH+VCH Ring and Stud",
      key: "hchvch",
      short: "clit hood ring and stud",
      long: "A vertical clit hood stud combined with a horizontal clit hood ring.",
      slot: "clit",
      atr: 3,
      cost: 210,
      type: "norm",
      image: "IMGjewelHCH-VCH",
    },
    hchvchDangle: {
      name: "HCH+VCH Ring and Dangle",
      key: "hchvchDangle",
      short: "clit hood ring and dangle",
      long: "A vertical clit hood stud and dangle combined with a horizontal clit hood ring.",
      slot: "clit",
      atr: 2,
      cost: 150,
      type: "slut",
      image: "IMGjewelHCH-VCHdangle",
    },
    clitHorseshoe: {
      name: "Clit Horseshoe Piercing",
      key: "clitHorseshoe",
      short: "clit horseshoe piercing",
      long: "A horseshoe bar piercing the clit made of white gold.",
      slot: "clit",
      atr: 3,
      cost: 230,
      type: "slut",
      image: "IMGjewelhorseshoeClit",
    },
    labiaSixRing: {
      name: "Six Labia Rings",
      key: "labiaSixRing",
      short: "six labia rings",
      long: "A set of six steel captive bead labia rings, three on each lip.",
      slot: "labia",
      atr: 1,
      cost: 150,
      type: "norm",
      image: "IMGjewelLabia-siz",
    },
    labiaTwoRing: {
      name: "Two Labia Rings",
      key: "labiaTwoRing",
      short: "two labia rings",
      long: "A set of two steel captive bead labia rings, one on each lip.",
      slot: "labia",
      atr: 1,
      cost: 50,
      type: "norm",
      image: "IMGjewelLabia-two",
    },
    lipBlackBall: {
      name: "Black Bead Lip Ring",
      key: "lipBlackBall",
      short: "black bead lip ring",
      long: "A steel captive bead lip ring with a black ceramic bead.",
      slot: "lip",
      atr: 2,
      cost: 95,
      type: "norm",
      image: "IMGjewel-lip-blackBall",
    },
    lipTwoHorse: {
      name: "Paired Lip Horseshoes",
      key: "lipTwoHorse",
      short: "paired lip horseshoes",
      long: "A set of different diameter steel lip horseshoe bar piercings.",
      slot: "2",
      atr: 2,
      cost: 105,
      type: "norm",
      image: "IMGjewel-lip-twoHorse",
    },
    monroeLip: {
      name: "Steel Monroe Lip",
      key: "monroeLip",
      short: "steel monroe lip",
      long: "A steel ball stud piercing through the upper lip.",
      slot: "lip",
      atr: 1,
      cost: 50,
      type: "bimbo",
      image: "IMGjewelMonroeLip",
    },
    nipCircle: {
      name: "Nipple Stretch Ring",
      key: "nipCircle",
      short: "nipple stretch ring",
      long: "A simple steel ring and barbell that force the nipple to stay extended.",
      slot: "nip",
      atr: 2,
      cost: 100,
      type: "slut",
      image: "IMGjewel-nipple-circle",
    },
    nipCumpire: {
      name: "Nipple Cumpire",
      key: "nipCumpire",
      short: "nipple cumpire",
      long: "A white gold cumpire-themed nipple piercing.",
      slot: "nip",
      atr: 3,
      cost: 280,
      type: "slut",
      image: "IMGjewel-nipple-cumpire",
    },
    nipShield: {
      name: "Nipple Shield Ring",
      key: "nipShield",
      short: "nipple shield ring",
      long: "a steel shield held in place by a captured bead nipple ring.",
      slot: "nip",
      atr: 1,
      cost: 60,
      type: "norm",
      image: "IMGjewel-nipple-shieldRing",
    },
    nipSpiral: {
      name: "Nipple Spiral",
      key: "nipSpiral",
      short: "nipple spiral",
      long: "A thin metal spiral extending outward from a simple nipple barbell.",
      slot: "nip",
      atr: 2,
      cost: 115,
      type: "norm",
      image: "IMGjewel-nipple-spiral",
    },
    nipStretch: {
      name: "Nipple Stretcher",
      key: "nipStretch",
      short: "nipple stretcher",
      long: "A steel collar and barbell piercing that stretches the nipple outward.",
      slot: "nip",
      atr: 1,
      cost: 95,
      type: "slut",
      image: "IMGjewel-nipple-stretch",
    },
    noseBlack: {
      name: "Black Nose Ring",
      key: "noseBlack",
      short: "black nose ring",
      long: "A simple black narrow-gauge nose ring.",
      slot: "nose",
      atr: 1,
      cost: 50,
      type: "norm",
      image: "IMGjewel-nose-simpleBlack",
    },
    noseSpike: {
      name: "Black Spiky Septum",
      key: "noseSpike",
      short: "black spiky septum",
      long: "A black horseshoe barbell septum piercing with spiked ends.",
      slot: "nose",
      atr: 2,
      cost: 100,
      type: "norm",
      image: "IMGjewel-nose-spikeSeptum",
    },
    nosePin: {
      name: "Nose Pin",
      key: "nosePin",
      short: "nose pin",
      long: "A tiny jeweled nose stud.",
      slot: "nose",
      atr: 2,
      cost: 101,
      type: "norm",
      image: "IMGjewelPinNose",
    },
    browRing: {
      name: "Eyebrow Ring",
      key: "browRing",
      short: "eyebrow ring",
      long: "A simple steel captive bead eyebrow ring.",
      slot: "brow",
      atr: 1,
      cost: 50,
      type: "norm",
      image: "IMGjewelRingBrow",
    },
    clitRing: {
      name: "Titanium Clit Ring",
      key: "clitRing",
      short: "clit ring",
      long: "A titanium captive bead clitoris piercing.",
      slot: "clit",
      atr: 2,
      cost: 146,
      type: "slut",
      image: "IMGjewelRingClit",
    },
    nipRing: {
      name: "Steel Nipple Ring",
      key: "nipRing",
      short: "steel nipple ring",
      long: "A simple steel captive bead nipple ring.",
      slot: "nip",
      atr: 1,
      cost: 48,
      type: "norm",
      image: "IMGjewelRingNip",
    },
    labMajRing: {
      name: "Steel Majora Rings",
      key: "labMajRing",
      short: "steel majora rings",
      long: "A set of steel captive bead rings piercing the labia majora.",
      slot: "labia",
      atr: 1,
      cost: 69,
      type: "slut",
      image: "IMGjewelRingsLabia",
    },
    lipBall: {
      name: "Under Lip Bar",
      key: "lipBall",
      short: "under lip bar",
      long: "A steel under-lip bar",
      slot: "lip",
      atr: 1,
      cost: 54,
      type: "norm",
      image: "IMGjewelSecondLip",
    },
    lipRing: {
      name: "Steel Lip Ring",
      key: "lipRing",
      short: "steel lip ring",
      long: "A simple steel captive bead lip ring.",
      slot: "lip",
      atr: 1,
      cost: 58,
      type: "norm",
      image: "IMGjewelThirdLip",
    },
    tongueBall: {
      name: "Steel Tongue Bar",
      key: "tongueBall",
      short: "steel tongue bar",
      long: "A basic steel tongue bar.",
      slot: "tongue",
      atr: 1,
      cost: 74,
      type: "norm",
      image: "IMGjewel-tongue-classic",
    },
    tongueCock: {
      name: "Gold Tongue Cock",
      key: "tongueCock",
      short: "gold tongue cock",
      long: "A gold tongue bar capped by a large cock and balls ornament.",
      slot: "tongue",
      atr: 2,
      cost: 185,
      type: "slut",
      image: "IMGjewel-tongue-cock",
    },
    tongueFinger: {
      name: "Unoriginal Tongue Finger",
      key: "tongueFinger",
      short: "tongue middle finger",
      long: "A silver tongue bar with a middle-finger ornament",
      slot: "tongue",
      atr: 1,
      cost: 90,
      type: "norm",
      image: "IMGjewel-tongue-middleFinger",
    },
    tongueWtf: {
      name: "Tongue Zipper",
      key: "tongueWtf",
      short: "tongue zipper",
      long: "A series of piercings in a split tongue to look like a zipper.",
      slot: "tongue",
      atr: 1,
      cost: 310,
      type: "bimbo",
      image: "IMGjewel-tongue-zipper",
    },
    tragusEar: {
      name: "Heavy Metal Tragus Bar",
      key: "tragusEar",
      short: "tragus barbell",
      long: "A tragus barbell made of heavy metal alloy for acoustics.",
      slot: "upEar",
      atr: 1,
      cost: 84,
      type: "norm",
      image: "IMGjewelTragusEar",
    },
    earCrown: {
      name: "Silver Crown Upper Earring",
      key: "earCrown",
      short: "silver crown upper earring",
      long: "A small crown-shaped silver upper ear piercing",
      slot: "upEar",
      atr: 2,
      cost: 130,
      type: "norm",
      image: "IMGjewel-UpEar-crownRing",
    },
    earDouble: {
      name: "Upper Earring Pair",
      key: "earDouble",
      short: "pair of upper earrings",
      long: "A pair of steel captive bead earrings.",
      slot: "upEar",
      atr: 1,
      cost: 70,
      type: "norm",
      image: "IMGjewel-UpEar-doubleRingBall",
    },
    earDoubleStud: {
      name: "Diamond Ear Stud Pair",
      key: "earDoubleStud",
      short: "pair of diamond ear studs",
      long: "A pair of upper ear diamond studs.",
      slot: "upEar",
      atr: 2,
      cost: 153,
      type: "norm",
      image: "IMGjewel-UpEar-doubleStud",
    },
    earFlowers: {
      name: "Upper Ear Flowers",
      key: "earFlowers",
      short: "upper ear flowers",
      long: "A white gold upper ear stud with a trio of diamond flowers.",
      slot: "upEar",
      atr: 3,
      cost: 230,
      type: "norm",
      image: "IMGjewel-upEar-flowers",
    },
    upEarStud: {
      name: "Upper Ear Diamond Stud",
      key: "upEarStud",
      short: "upper ear diamond stud",
      long: "Guaranteed conflict diamond upper ear stud.",
      slot: "upEar",
      atr: 1,
      cost: 98,
      type: "norm",
      image: "IMGjewel-UpEar-singleStud",
    },
    upEarTriple: {
      name: "Gold Triple-Ring Earring",
      key: "upEarTriple",
      short: "gold triple-ring earring",
      long: "A matched set of small gold rings for the upper ear.",
      slot: "upEar",
      atr: 2,
      cost: 150,
      type: "norm",
      image: "IMGjewel-UpEar-tripleRing",
    },
    upEarIdiot: {
      name: "Upper Ear Pincushion Set",
      key: "upEarIdiot",
      short: "upper ear pincushion set",
      long: "A special set of ugly metal bars and studs for no reason.",
      slot: "upEar",
      atr: 1,
      cost: 150,
      type: "norm",
      image: "IMGjewel-UpEar-wtf",
    },
    vchBarbell: {
      name: "VCH Steel Barbell",
      key: "vchBarbell",
      short: "clit hood barbell",
      long: "A steel barbell placed vertically through the clitoral hood.",
      slot: "clit",
      atr: 1,
      cost: 80,
      type: "norm",
      image: "IMGjewelVCH-barbell",
    },
    vchFlower: {
      name: "VCH Flower Bar",
      key: "vchFlower",
      short: "clit hood flowers",
      long: "A white gold vertical clitoral hood bar with diamond flowers.",
      slot: "clit",
      atr: 3,
      cost: 250,
      type: "norm",
      image: "IMGjewelVCH-flower",
    },
    vchStud: {
      name: "VCH Jewelled Barbell",
      key: "vchStud",
      short: "clit hood jewelled bar",
      long: "A steel vertical clitoral hood barbell with artificial blue stone.",
      slot: "clit",
      atr: 2,
      cost: 100,
      type: "bimbo",
      image: "IMGjewelVCH-jewelStud",
    },
    labiaHolder: {
      name: "Labia Holder",
      key: "labiaHolder",
      short: "labia holder",
      long: "A large piece of jewelry connecting multiple piercings to hold the labia open.",
      slot: "labia",
      atr: 1,
      cost: 200,
      type: "slut",
      image: "IMGjewelVCH-spreadem",
    },
    vertClit: {
      name: "Vertical Clit Barbell",
      key: "vertClit",
      short: "vertical clit barbell",
      long: "A simple barbell that pierces the clitoris.",
      slot: "clit",
      atr: 2,
      cost: 145,
      type: "slut",
      image: "IMGjewelVertClit",
    },
    nipWing: {
      name: "Silver Nipple Wings",
      key: "nipWing",
      short: "nipple wings",
      long: "A silver nipple bar with decorative wings.",
      slot: "",
      atr: 2,
      cost: 120,
      type: "norm",
      image: "IMGjewelWingsNip",
    },
    nippleHeavy: {
      name: "Heavy Nipple Ring",
      key: "nippleHeavy",
      short: "heavy nipple ring",
      long: "A thick and heavy steel captive bead nipple ring.",
      slot: "nip",
      atr: 1,
      cost: 70,
      type: "slut",
      image: "IMGjewel-nipple-cow",
    },
    nippleHeart: {
      name: "Gold Heart Nipple",
      key: "nippleHeart",
      short: "gold heart nipple",
      long: "A gold diamond-encrusted ring held in place by a barbell.",
      slot: "nip",
      atr: 3,
      cost: 320,
      type: "norm",
      image: "IMGjewel-nipple-heart",
    },
    nipDuct: {
      name: "Diamond Milk Duct Stud",
      key: "nipDuct",
      short: "diamond milk duct stud",
      long: "A complicated three-way nipple piercing with a barbell and diamond stud.",
      slot: "nip",
      atr: 3,
      cost: 390,
      type: "bimbo",
      image: "IMGjewel-nipple-tip",
    },
    bellyMask: {
      name: "Masque Navel Piercing",
      key: "bellyMask",
      short: "masque navel piercing",
      long: "A gold belly barbell with a dangling mask on two chains.",
      slot: "belly",
      atr: 1,
      cost: 120,
      type: "slut",
      image: "IMGjewel-belly-mask",
    },
    bellySlut: {
      name: "Slut Navel Piercing",
      key: "bellySlut",
      short: "slut navel piercing",
      long: "A belly button piercing with pink stones and a Slut dangle.",
      slot: "belly",
      atr: 2,
      cost: 120,
      type: "bimbo",
      image: "IMGjewel-belly-pinkSlut",
    },
    bellyFuck: {
      name: "Fuck Me Navel Piercing",
      key: "bellyFuck",
      short: "fuck me navel piercing",
      long: "A simple steel belly button piercing with a Fuck Me dangle.",
      slot: "belly",
      atr: 1,
      cost: 60,
      type: "slut",
      image: "IMGjewel-belly-fuckme",
    },
    bellyWomb: {
      name: "Womb Navel Piercing",
      key: "bellyWomb",
      short: "womb navel piercing",
      long: "An elegant gold navel piercing with diamond and pearls forming a fertile womb.",
      slot: "belly",
      atr: 4,
      cost: 390,
      type: "norm",
      image: "IMGjewel-belly-fertile",
    },
    noseDiamond: {
      name: "Diamond Septum Ring",
      key: "noseDiamond",
      short: "diamond septum ring",
      long: "A gold septum ring with diamond insets.",
      slot: "nose",
      atr: 3,
      cost: 310,
      type: "bimbo",
      image: "IMGjewel-nose-diamondseptum",
    },
    thickClitRing: {
      name: "Thick Clit Ring",
      key: "thickClitRing",
      short: "very thick ring",
      long: "Stainless steel ring of monstrous diameter.",
      slot: "clit",
      atr: 2,
      cost: 90,
      type: "slut",
      image: "IMGjewel-giantRing-Clit",
    },
    BlackCollar: {
      name: "Black Collar",
      key: "BlackCollar",
      short: "wide black collar",
      long: "An elegant black collar made of black beads.",
      slot: "neck",
      atr: 3,
      cost: 120,
      type: "norm",
      image: "IMGjewelBlackCollar",
    },
    ClassicWatch: {
      name: "Classic Watch",
      key: "ClassicWatch",
      short: "classic womans watch",
      long: "Fake gold and silver classical-looking watch.",
      slot: "wrist",
      atr: 3,
      cost: 80,
      type: "norm",
      image: "IMGjewelClassicWatch",
    },
    DiamondWatch: {
      name: "Diamond Watch",
      key: "DiamondWatch",
      short: "fancy looking watch",
      long: "Watch with small fake diamonds around the face.",
      slot: "wrist",
      atr: 2,
      cost: 60,
      type: "bimbo",
      image: "IMGjewelDiamondWatch",
    },
    FashionWatch: {
      name: "Fashion Watch",
      key: "FashionWatch",
      short: "italian fashion watch",
      long: "Quality watch from one of the Italian fashion houses.",
      slot: "wrist",
      atr: 4,
      cost: 240,
      type: "norm",
      image: "IMGjewelFashionWatch",
    },
    FitnessWatch: {
      name: "Fitness Watch",
      key: "FitnessWatch",
      short: "advanced sport fitness tracker ",
      long: "Modern fitness tracker, tons of functions, seems they can show time too.",
      slot: "wrist",
      atr: 2,
      cost: 199,
      type: "norm",
      image: "IMGjewelFitnessWatch",
    },
    DiamondRing: {
      name: "Diamond Ring",
      key: "DiamondRing",
      short: "fancy looking ring",
      long: "Real jewelry made of high quality gold with some pretty big diamond.",
      slot: "ring",
      atr: 4,
      cost: 500,
      type: "none",
      image: "IMGjewelDiamondRing",
    },
    GoldRing: {
      name: "Golden Ring",
      key: "GoldRing",
      short: "plain golden ring",
      long: "Basically just a piece of gold without any decorations.",
      slot: "ring",
      atr: 2,
      cost: 160,
      type: "none",
      image: "IMGjewelGoldRing",
    },
    SilverRing: {
      name: "Silver Ring",
      key: "SilverRing",
      short: "plain silver ring",
      long: "Basically just a piece of silver without any decorations.",
      slot: "ring",
      atr: 2,
      cost: 55,
      type: "none",
      image: "IMGjewelSilverRing",
    },
    RubyRing: {
      name: "Ruby Ring",
      key: "RubyRing",
      short: "silver ring with ruby",
      long: "Looking like something you vampire granny keeps in her locket.",
      slot: "ring",
      atr: 3,
      cost: 190,
      type: "none",
      image: "IMGjewelRubyRing",
    },
    FriendshipBracelet: {
      name: "Friendship Bracelet",
      key: "FriendshipBracelet",
      short: "cheap bracelet with green beads",
      long: "You don't need friends to wear a friendship bracelet, but it's much more sad this way.",
      slot: "wrist",
      atr: 1,
      cost: 15,
      type: "none",
      image: "IMGjewelFriendshipBracelet",
    },
    LettersBracelet: {
      name: "Letters Bracelet",
      key: "LettersBracelet",
      short: "cheap bracelet with letters",
      long: "Letters form 'bimbo!' text for some reason.",
      slot: "wrist",
      atr: 1,
      cost: 20,
      type: "bimbo",
      image: "IMGjewelLettersBracelet",
    },
    WeavedBracelet: {
      name: "Weaved Bracelet",
      key: "WeavedBracelet",
      short: "boho-styled bracelet",
      long: "For some reason it seems boho stuff is still selling all around.",
      slot: "wrist",
      atr: 1,
      cost: 30,
      type: "none",
      image: "IMGjewelWeavedBracelet",
    },
    SpikedWristband: {
      name: "Spiked Wristband",
      key: "SpikedWristband",
      short: "leather wristband",
      long: "Looking pretty punkish. Or maybe bdsm lover could wear this one too.",
      slot: "wrist",
      atr: 2,
      cost: 45,
      type: "slut",
      image: "IMGjewelSpikedWristband",
    },
    InfinityNecklace: {
      name: "Infinity Necklace",
      key: "InfinityNecklace",
      short: "infinity symbol necklace",
      long: "Silver neckalce with infinity symbol decorated with fake diamonds.",
      slot: "neck",
      atr: 2,
      cost: 55,
      type: "none",
      image: "IMGjewelInfinityNecklace",
    },
    LeatherChocker: {
      name: "Leather Chocker",
      key: "LeatherChocker",
      short: "a choker with heart in the center",
      long: "Leather chocker with heart symbol, was pretty popular last decade.",
      slot: "neck",
      atr: 3,
      cost: 70,
      type: "slut",
      image: "IMGjewelLeatherChocker",
    },
    LeatherCollar: {
      name: "Leather Collar",
      key: "LeatherCollar",
      short: "a collar with a ring",
      long: "Leather collar with a ring, very bdsm-looking.",
      slot: "neck",
      atr: 2,
      cost: 85,
      type: "slut",
      image: "IMGjewelLeatherCollar",
    },
    MoonNecklace: {
      name: "Moon Necklace",
      key: "MoonNecklace",
      short: "moon on a chain",
      long: "A chain with a little golden moon",
      slot: "neck",
      atr: 2,
      cost: 95,
      type: "none",
      image: "IMGjewelMoonNecklace",
    },
    PearlNecklace: {
      name: "Pearl Necklace",
      key: "PearlNecklace",
      short: "pearls on a thread",
      long: "Rather classic pearls beads, seems natural.",
      slot: "neck",
      atr: 3,
      cost: 150,
      type: "none",
      image: "IMGjewelPearlNecklace",
    },
    QuarzNecklace: {
      name: "Quarz Necklace",
      key: "QuarzNecklace",
      short: "quarz on a chain",
      long: "A chain with a quarz in a golden frame.",
      slot: "neck",
      atr: 3,
      cost: 110,
      type: "none",
      image: "IMGjewelQuarzNecklace",
    },
    SpikedCollar: {
      name: "Spiked Collar",
      key: "SpikedCollar",
      short: "leather collar",
      long: "A black leather collar with spikes all around. Dream of any punk girl.",
      slot: "neck",
      atr: 2,
      cost: 95,
      type: "slut",
      image: "IMGjewelSpikedCollar",
    },
    VintageChocker: {
      name: "Vintage Chocker",
      key: "VintageChocker",
      short: "old style chocker",
      long: "Those were popular in 90s. It is a surprise to see they are still produced.",
      slot: "neck",
      atr: 1,
      cost: 5,
      type: "slut",
      image: "IMGjewelVintageChocker",
    },
    FlufferTag: {
      name: "Fluffer Tag",
      key: "FlufferTag",
      short: "A chain with a lewd tag",
      long: "A chain with 'Best horse fluffer 2032' text you won by sucking stallion's cock on a fair.",
      slot: "neck",
      atr: 3,
      cost: 0,
      type: "slut",
      image: "IMGjewelHorseFluffer",
    },
  };
  const keys = Object.keys(jews);
  const n = keys.length;
  for (let i = 0; i < n; i++) {
    aw.jewel[jews[keys[i]].key] = new Jewel(jews[keys[i]]);
  }
})();


