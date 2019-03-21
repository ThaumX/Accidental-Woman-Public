/*
..      888b     d888 8888888 .d8888b.   .d8888b.
..      8888b   d8888   888  d88P  Y88b d88P  Y88b
..      88888b.d88888   888  Y88b.      888    888
..      888Y88888P888   888   "Y888b.   888
..      888 Y888P 888   888      "Y88b. 888
..      888  Y8P  888   888        "888 888    888
..      888   "   888   888  Y88b  d88P Y88b  d88P
..      888       888 8888888 "Y8888P"   "Y8888P"
..
..
..         888          888    888
..         888          888    888
..         888          888    888
.. .d8888b 888  .d88b.  888888 88888b.   .d88b.  .d8888b
..d88P"    888 d88""88b 888    888 "88b d8P  Y8b 88K
..888      888 888  888 888    888  888 88888888 "Y8888b.
..Y88b.    888 Y88..88P Y88b.  888  888 Y8b.          X88
.. "Y8888P 888  "Y88P"   "Y888 888  888  "Y8888   88888P'
..
*/

interface setupClothesExposed {
  top: boolean;
  bottom: boolean;
}

interface setupClothesAccess {
  pussy: boolean;
  ass: boolean;
  nip: boolean;
  tits: boolean;
  butt: boolean;
}

interface setupClothesDesc {
  atr: number;
  sexy: number;
  formal: number;
  exposureTop: number;
  exposureBottom: number;
}

interface setupClothesOutfit {
  remove: () => void;
  wear: (name: string, rand?: boolean) => void;
  empty: (name: string) => void;
  delete: (name: string) => void;
  save: (name: string, group?: string, overwrite?: boolean) => boolean;
  print: () => string;
  check: () => string;
  prologue: () => boolean;
}

interface setupClothesIcon {
  panties: (num: number, sub?: number) => string;
  bra: (num: number, sub?: number) => string;
  "sports bra": (num: number) => string;
  stocking: (num: number, sub?: number) => string;
  top: (num: number, sub?: number) => string;
  bottoms: (num: number, sub?: number) => string;
  pants: (num: number, sub?: number) => string;
  shorts: (num: number, sub?: number) => string;
  skirt: (num: number, sub?: number) => string;
  dress: (num: number, sub?: number) => string;
  coat: (num: number, sub?: number) => string;
  swimTop: (num: number, sub?: number) => string;
  swimBottom: (num: number, sub?: number) => string;
  swimOnePiece: (num: number, sub?: number) => string;
  sportTop: (num: number, sub?: number) => string;
  athleticTop: (num: number, sub?: number) => string;
  sportBottom: (num: number, sub?: number) => string;
  athleticBottom: (num: number, sub?: number) => string;
  shoes: (num: number, sub?: number) => string;

}



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

// Initializes clothing variable objects
setup.clothes.initialize = function(): void {
  // Sets player clothing variables
  // creates some basic clothing items
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
  setup.clothes.defineObjects();
};

// defines all the special properties of garment getters
setup.clothes.defineObjects = function(): void {
  setup.clothes.desc = {} as setupClothesDesc;
  setup.clothes.access = {} as setupClothesAccess;
  setup.clothes.exposed = {} as setupClothesExposed;
  Object.defineProperty(setup.clothes, "dress", {
    set() { },
    get() {
      if (aw.slot.top !== 0 && "object" === typeof aw.slot.top) {
        if (aw.slot.top.type === "dress") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  });
  Object.defineProperty(setup.clothes, "nightwear", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].nightwear && ᛝ.worn[list[i]] !== "off") {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes, "athletic", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].athletic && ᛝ.worn[list[i]] !== "off") {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes, "swimwear", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].swimwear && ᛝ.worn[list[i]] !== "off") {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes, "kinky", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].kinky && ᛝ.worn[list[i]] !== "off") {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes, "wet", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (aw.slot[list[i]].wetness > 0 && ᛝ.worn[list[i]] !== "off") {
            return true;
          }
        }
      }
      return false;
    },
  });
  Object.defineProperty(setup.clothes, "stained", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (Object.keys(aw.slot[list[i]].cond).length > 0 && ᛝ.worn[list[i]] !== "off") {
            return true;
          }
        }
      }
      return false;
    },
  });
  Object.defineProperty(setup.clothes, "damaged", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (aw.slot[list[i]].values.damage > 2) {
            return true;
          }
        }
      }
      return false;
    },
  });
  Object.defineProperty(setup.clothes.desc, "atr", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      return setup.clothes.atrWord(ᛝ.stats.atr);
    },
  });
  Object.defineProperty(setup.clothes.desc, "sexy", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      return setup.clothes.sexyWord(ᛝ.stats.sexy);
    },
  });
  Object.defineProperty(setup.clothes.desc, "formal", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      return setup.clothes.formalWord(ᛝ.stats.formal);
    },
  });
  Object.defineProperty(setup.clothes.desc, "exposureTop", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      return setup.clothes.exposureWord(ᛝ.stats.exposureTop);
    },
  });
  Object.defineProperty(setup.clothes.desc, "exposureBottom", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      return setup.clothes.exposureWord(ᛝ.stats.exposureBot);
    },
  });
  Object.defineProperty(setup.clothes.access, "nip", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      const wear = ["normal", "strapsOff", "halfButton"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].access.nip && wear.includes(ᛝ.worn[list[i]])) {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes.access, "tits", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      const wear = ["normal", "strapsOff"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].access.tits && wear.includes(ᛝ.worn[list[i]])) {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes.access, "butt", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].access.butt && ᛝ.worn[list[i]] === "normal") {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes.access, "pussy", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      const wear = ["normal", "unzipped", "unbuttoned"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].access.pussy && wear.includes(ᛝ.worn[list[i]])) {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes.access, "ass", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "bra", "leg", "top", "bottom", "coat"];
      const wear = ["normal", "unzipped", "unbuttoned"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (!aw.slot[list[i]].access.ass && wear.includes(ᛝ.worn[list[i]])) {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes.exposed, "top", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["bra", "top", "coat"];
      const wear = ["normal", "strapsOff", "unbuttoned", "halfButton"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (aw.slot[list[i]].values.exposure < 40 && wear.includes(ᛝ.worn[list[i]])) {
            return false;
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes.exposed, "bottom", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      const list = ["panties", "leg", "bottom", "coat"];
      const wear = ["normal", "unzipped", "unbuttoned"];
      for (let i = 0; i < 6; i++) {
        if (aw.slot[list[i]] !== 0 && "object" === typeof aw.slot[list[i]]) {
          if (aw.slot[list[i]].values.exposure < 40 && wear.includes(ᛝ.worn[list[i]])) {
            if (aw.slot[list[i]].slot === "leg") {
              // check if blocks pussy to see if pantyhose
              if (!aw.slot[list[i]].access.pussy) {
                return false;
              }
            } else {
              return false;
            }
          }
        }
      }
      return true;
    },
  });
  Object.defineProperty(setup.clothes, "skirtDanger", {
    set() {},
    get() {
      const ᛝ = ↂ.pc.clothes;
      let hem = 0;
      if (aw.slot.top !== 0 && "object" === typeof aw.slot.top && aw.slot.top.type === "dress") {
        hem = aw.slot.top.flag.hem;
      } else if (aw.slot.bottom !== 0 && "object" === typeof aw.slot.bottom && aw.slot.bottom.type === "skirt") {
        hem = aw.slot.bottom.flag.hem;
      } else {
        return 0;
      }
      if (hem < 6) {
        return 0;
      }
      return hem - 5;
    },
  });
};

// returns word for attractiveness
setup.clothes.atrWord = function(val: number): string {
  if (val < -6) {
    val = -6;
  }
  val = Math.round(val + 5); // in case of decimals for some reason -Paeden-
  let out;
  switch (val) {
    case 0:
    case 1:
      out = "hideous";
      break;
    case 2:
      out = "awful";
      break;
    case 3:
    case 4:
      out = "ugly";
      break;
    case 5:
    case 6:
      out = "okay";
      break;
    case 7:
    case 8:
      out = "nice";
      break;
    case 9:
    case 10:
      out = "appealing";
      break;
    case 11:
    case 12:
      out = "pretty";
      break;
    case 13:
    case 14:
      out = "lovely";
      break;
    case 15:
    case 16:
      out = "splendid";
      break;
    case 17:
    case 18:
      out = "beautiful";
      break;
    case 19:
    case 20:
      out = "dazzling";
      break;
    case 21:
    case 22:
      out = "stunning";
      break;
    case 23:
    case 24:
      out = "exquisite";
      break;
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
      out = "magnificent";
      break;
    default:
      out = "shitfuck";
      break;
  }
  return out;
};

// returns word for clothing dirtiness
setup.clothes.dirty = function(val: number): string {
  switch (val) {
    case 0:
    case 1:
      return "clean";
    case 2:
    case 3:
      return "worn";
    case 4:
      return "dirty";
    case 5:
      return "stinky";
    default:
      return "filthy";
  }
};

// returns health word/s for health number
setup.clothes.health = function(val: number): string {
  if (val < 3) {
    return "brand new";
  }
  val = Math.round((val - 2) / 4);
  switch (val) {
    case 0:
      return "like new";
    case 1:
      return "good shape";
    case 2:
      return "well-worn";
    case 3:
      return "threadbare";
    case 4:
      return "rags";
    default:
      return "in tatters";
  }
};

// returns word for exposure value
setup.clothes.exposureWord = function(val: number): string {
  let out;
  val = Math.round(val);
  switch (val) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      out = "conservative";
      break;
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      out = "normal";
      break;
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
      out = "slightly revealing";
      break;
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
      out = "revealing";
      break;
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
      out = "very revealing";
      break;
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
      out = "exhibitionist";
      break;
    case 46:
    case 47:
    case 48:
    case 49:
    case 50:
      /*5.o*/
      out = "practically naked";
      break;
    default:
      out = "wtf twine";
      break;
  }
  return out;
};

// returns words for sexy value
setup.clothes.sexyWord = function(val: number): string {
  if (val >= 9) {
    return "super sexy";
  } else if (val >= 6) {
    return "very sexy";
  } else if (val >= 3) {
    return "sexy";
  } else if (val < -6) {
    return "super cute";
  } else if (val < -3) {
    return "very cute";
  } else if (val < 0) {
    return "cute";
  } else {
    return "average";
  }
};

// returns words for formal value
setup.clothes.formalWord = function(val: number): string {
  if (val > 6) {
    return "formal";
  } else if (val > 4) {
    return "semi-formal";
  } else if (val > 2) {
    return "business";
  } else if (val >= 0) {
    return "business casual";
  } else if (val >= -2) {
    return "casual";
  } else if (val >= -4) {
    return "very casual";
  } else {
    return "slovenly";
  }
};

// returns hex color code based on input color number
setup.clothes.colorHex = function(code: number|string): string {
  if ("string" === typeof code) {
    if (code.slice(0, 1) === "#") {
      return code;
    } else {
      return "#" + code;
    }
  }
  const colors = ["f5f5dc", "ffffff", "ffc0cb", "ff69b4", "add8e6", "98fb98", "fffacd", "dda0dd", "303030", "ff4500", "4169e1", "228b22", "9932cc", "a0522d", "ffd700", "d2b48c", "000080", "f0e68c", "006400", "800000", "d3d3d4", "696969", "505050", "87ceeb", "4682b4", "483d8b", "ffa500", "ffdab9"];
  return "#" + colors[code] || "#ddd";
};

// returns word for the color code of the clothing
setup.clothes.colorWord = function(code: number): string {
  const colors = ["beige", "white", "pink", "pink", "pastel-blue", "pastel-green", "pastel-yellow", "pastel-purple", "black", "red", "blue", "green", "purple", "brown", "yellow", "tan", "navy blue", "khaki", "dark green", "burgundy", "light grey", "grey", "clear", "light bluejean", "bluejean", "dark bluejean", "orange", "fleshtone"];
  return colors[code] || "unknown-color";
};

/*
0 "beige",
1 "white",
2 "pink",
3 "pink",
4 "pastel-blue",
5 "pastel-green",
6 "pastel-yellow",
7 "pastel-purple",
8 "black",
9 "red",
10 "blue",
11 "green",
12 "purple",
13 "brown",
14 "yellow",
15 "tan"m
16 "navy blue",
17 "khaki",
18 "dark green",
19 "burgundy",
20 "light grey",
21 "grey",
22 "clear",
23 "light bluejean",
24 "bluejean",
25 "dark bluejean",
26 "orange",
27 "fleshtone"
*/

setup.clothes.icon = {
  "panties"(num: number, sub: number = 0): string {
    const img = [
      "IMG-panties-2",
      "IMG-panties-2",
      "IMG-panties-5",
      "IMG-panties-3",
      "IMG-panties-18",
      "IMG-panties-16",
      "IMG-panties-8",
      "IMG-panties-9",
      "IMG-panties-6",
      "IMG-panties-7",
      "IMG-panties-19",
      "IMG-panties-13",
      "IMG-panties-12",
      "IMG-CI-HarnessBottom",
    ];
    return img[num] || "IMGnotavailable";
  },
  "bra"(num: number, sub: number = 0): string {
    const img = [
      "IMG-bra-7",
      "IMG-bra-7",
      "IMG-bra-1",
      "IMG-bra-4",
      "IMG-bra-8",
      "IMG-bra-2",
      "IMG-bra-11",
      "IMG-bra-9",
      "IMG-bra-3",
      "IMG-bra-9",
      "IMG-bra-9",
      "IMG-bra-10",
      "IMG-CI-OpenCupBikini",
      "IMG-CI-HarnessTop",
    ];
    return img[num] || "IMGnotavailable";
  },
  "sports bra"(num: number): string {
    return setup.clothes.icon.bra(num);
  },
  "stocking"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMG-stocking-3",
      "IMG-stocking-2",
      "IMG-stocking-4",
      "IMG-stocking-4",
      "IMG-stocking-4",
      "IMG-stocking-6",
      "IMG-stocking-6",
      "IMG-stocking-5",
      "IMG-stocking-5",
    ];
    return img[num] || "IMGnotavailable";
  },
  "top"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMG_Shirt_31",
      "IMG_Shirt_16",
      "IMG_Shirt_15",
      "IMG_Shirt_34",
      "IMG_Shirt_37",
      "IMG_Shirt_30",
      "IMG_Shirt_12",
      "IMG_Shirt_33",
      "IMG_Shirt_12B",
      "IMG_Shirt_18",
      "IMG_Shirt_22",
      "IMG_Shirt_26",
      "IMG_Shirt_38",
      "IMG_Shirt_19",
      "IMG_niteU_1",
      "IMG_niteU_2",
      "IMG_niteU_3",
      "IMG_niteU_4",
      "IMG_niteU_5",
      "IMG_niteU_6",
      "IMG_Shirt_7",

    ];
    return img[num] || "IMGnotavailable";
  },
  "bottoms"(num: number, sub: number = 0): string {// pants, shorts, skirt
    const img = [
      "IMGnotavailable",
      "IMG_skirt25",
      "IMG_skirt1",
      "IMG_skirt15",
      "IMG_skirt16",
      "IMG_skirt26",
      "IMG_skirt20",
      "IMG_skirt8",
      "IMG_skirt21",
      "IMG_skirt3",
      "IMG_skirt5",
      "IMG_skirt6",
      "IMG_skirt23",
      "IMG_skirt24",
      "IMG_shorts1",
      "IMG_shorts5",
      "IMG_shorts3",
      "IMG_shorts2",
      "IMG_pants1",
      "IMG_pants5",
      "IMG_pants6",
      "IMG_pants7",
      "IMGnotavailable",
      "IMG_pants4",
      "IMG_pants3",
      "IMG_leggings2",
      "IMG_niteB_1",
    ];
    return img[num] || "IMGnotavailable";
  },
  "pants"(num: number, sub: number = 0): string {
    return setup.clothes.icon.bottoms(num, sub);
  },
  "shorts"(num: number, sub: number = 0): string {
    return setup.clothes.icon.bottoms(num, sub);
  },
  "skirt"(num: number, sub: number = 0): string {
    return setup.clothes.icon.bottoms(num, sub);
  },
  "dress"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMG_dress_27",
      "IMG_dress_23",
      "IMG_dress_11",
      "IMG_dress_1",
      "IMG_dress_22",
      "IMG_dress_9",
      "IMG_dress_3",
      "IMG_dress_18",
      "IMG_dress_33",
      "IMG_dress_25",
      "IMG_dress_31",
    ];
    return img[num] || "IMGnotavailable";
  },
  "coat"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMG-CIOW-PleatedCoat",
      "IMG-CIOW-Jacket",
      "IMG-CIOW-FancyCoat",
      "IMG-CIOW-longCoat",
      "IMG-CIOW-longCoat",
      "IMG-CIOW-Jacket",
      "IMG-CIOW-FancyCoat",
      "IMG-CIOW-Jacket",
      "IMG-CIOW-Hoodie",
      "IMGnotavailable", // cardigan
      "IMGnotavailable", // turtleneck
      "IMG-CIOW-Hoodie",
    ];
    return img[num] || "IMGnotavailable";
  },
  "swimTop"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMGnotavailable",
      "IMGnotavailable",
      "IMGnotavailable",
      "IMGnotavailable",
      "IMGnotavailable",
      "IMG-CI-TankiniTop",
      "IMG-CI-FlounceTop",
      "IMG-CI-HalterTop",
      "IMG-CI-BandeauTop",
      "IMG-CI-StraplessTop",
      "IMG-CI-TriangleTop",
      "IMG-CI-TriangleTop",
      "IMG-CI-MicroBikiniTop",
      "IMG-CI-NanoBikiniTop",
      "IMG-CI-OpenCupBikini",
    ];
    let res = img[num] || "IMGnotavailable";
    if (sub === 7) {
      res = "IMG-CI-ExtremeNanoBikiniTop";
    }
    return res;
  },
  "swimBottom"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMG-CI-HighWaist",
      "IMG-CI-SwimSkirt",
      "IMG-panties-1",
      "IMG-CI-HipsterBottom",
      "IMG-CI-Boyshorts",
      "IMG-CI-CheekyBottom",
      "IMG-CI-BikiniBottom",
      "IMG-CI-Vbottom",
      "IMG-panties-7",
      "IMG-panties-12",
      "IMG-CI-NanoGstring",
      "IMG-CI-OpenBottom",
    ];
    return img[num] || "IMGnotavailable";
  },
  "swimOnePiece"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMG-CI-SwimOnepiece",
      "IMG-CI-SwimHighLeg",
      "IMG-CI-OnepieceAthletic",
      "IMG-CI-BandageOnepiece",
      "IMG-CI-SlingSwim",
    ];
    return img[num] || "IMGnotavailable";
  },
  "sportTop"(num: number, sub: number = 0): string {
    const img = "IMGnotavailable";
    return img;
  },
  "athleticTop"(num: number, sub: number = 0): string {
    const img = "IMGnotavailable";
    return img;
  },
  "sportBottom"(num: number, sub: number = 0): string {
    const img = "IMGnotavailable";
    return img;
  },
  "athleticBottom"(num: number, sub: number = 0): string {
    const img = "IMGnotavailable";
    return img;
  },
  "shoes"(num: number, sub: number = 0): string {
    const img = [
      "IMGnotavailable",
      "IMG-HighBoots1",
      "IMG-Snickers1",
      "IMG-Kittenheels",
      "IMG-Pumps",
      "IMG-Stiletto",
      "IMG-Wedge",
      "IMG-WSandals",
      "IMG-ConeHeels",
      "IMG-AnkleBooties",
      "IMG-SpoolHeels",
      "IMG-CutOutHeels",
      "IMG-DanceShoes",
      "IMG-ChunkyHeels",
      "IMG-Boots",
      "IMG-Flats",
      "IMG-Flops",
    ];
    return img[num] || "IMGnotavailable";
  },
}; // sportBottom

// returns word for hem length based on hem value
setup.clothes.hemWord = function(num: number): string {
  switch (num) {
    case 0:
      return "ankle";
    case 1:
      return "midi";
    case 2:
      return "calf";
    case 3:
      return "above calf";
    case 4:
      return "knee";
    case 5:
      return "above knee";
    case 6:
      return "mid thigh";
    case 7:
      return "upper thigh";
    case 8:
      return "above thigh";
    case 9:
      return "groin";
    case 10:
      return "above groin";
    default:
      return "error";
  }
};

// returns the name of a saved outfit if worn items match outfit
setup.clothes.isOutfitName = function(): string {
  const ᛝ = ↂ.pc.clothes;
  const outfits = setup.outfits;
  const slots = ["panties", "bra", "leg", "top", "bottom"];
  const outKeys = Object.keys(outfits);
  for (let i = 0, c = outKeys.length; i < c; i++) {
    let match = true;
    for (let j = 0; j < 5; j++) {
      if (ᛝ.keys[slots[j]] !== outfits[outKeys[i]][slots[j]]) {
        match = false;
      }
    }
    if (match) {
      return outKeys[i];
    }
  }
  return "Custom (not an outfit)";
};



// deletes all clothing in store inventories
// TODO delete from aw.clothes if not purchased
setup.clothes.clearStoreInv = function(): void {
  ↂ.storeInv = {
    panties : [],
    leg : [],
    bottom : [],
    bra : [],
    top : [],
    dress : [],
    swimU : [],
    swimL : [],
    athU : [],
    athL : [],
    coat : [],
    niteU : [],
    niteL : [],
    acc : [],
    bag : [],
    shoes : [],
  };
};

// gives clothing during prologue
setup.clothes.prologueGiver = function(type: string): void {
  aw.L();
  setup.clothes.clearStoreInv();
  let count;
  let halfCount;
  let countBig;
  if (type === "cheat") {
    count = 4;
    halfCount = 2;
    countBig = 6;
    setup.clothesGen.panties(count, 4, 2, 2, 1, "CazzoFottere");
    setup.clothesGen.bra(count, 2, 1, 2, 1, "CazzoFottere");
    setup.clothesGen.stocking(halfCount, 2, 0, 0, 1, "CazzoFottere");
    setup.clothesGen.upperBody(count, 3, 2, 2, 1, "CazzoFottere");
    setup.clothesGen.dress(halfCount, 3, 0, 2, 1, "CazzoFottere");
    setup.clothesGen.lowerBody(countBig, 5, 0, 2, 1, "CazzoFottere");
    setup.clothesGen.shoes(count, 1, 0, 0, 1, "Shoegasm");
  } else if (type === "backer") {
    count = 2;
    halfCount = 1;
    countBig = 3;
    setup.clothesGen.panties(count, 3, 0, 0, 0, "ThighGap");
    setup.clothesGen.bra(count, 1, 0, 1, 0, "ThighGap");
    setup.clothesGen.stocking(halfCount, 1, 0, 2, 0, "ThighGap");
    setup.clothesGen.upperBody(count, 2, 0, 0, 0, "ThighGap");
    setup.clothesGen.dress(halfCount, 1, 1, 0, 0, "ThighGap");
    setup.clothesGen.lowerBody(countBig, 2, 0, 0, 0, "ThighGap");
    setup.clothesGen.shoes(count, 1, 0, 0, 1, "Shoegasm");
  } else {
    if (type === "good") {
      count = 3;
      halfCount = 2;
      countBig = 4;
    } else if (type === "okay") {
      count = 2;
      halfCount = 1;
      countBig = 3;
    } else {
      count = 1;
      halfCount = 1;
      countBig = 2;
    }
    setup.clothesGen.panties(count, 2, 0, 1, -1, "UniHoe");
    setup.clothesGen.bra(count, 1, 0, 1, -1, "UniHoe");
    setup.clothesGen.stocking(halfCount, 1, 0, 0, -1, "UniHoe");
    setup.clothesGen.upperBody(count, 2, 1, 1, -1, "UniHoe");
    setup.clothesGen.dress(halfCount, 1, 1, 1, -1, "UniHoe");
    setup.clothesGen.lowerBody(countBig, 1, 0, 1, -1, "UniHoe");
    setup.clothesGen.shoes(count, 1, 0, 0, 1, "Shoegasm");
  }

  const ᚥ = ↂ.storeInv;
  const ᛝ = ↂ.ward;
  const groups = ["panties", "bra", "leg", "bottom", "top", "leg", "shoes"];
  for (let i = 0, c = groups.length; i < c; i++) {
    for (let j = 0, d = ᚥ[groups[i]].length; j < d; j++) {
      ᛝ[groups[i]].push(ᚥ[groups[i]][j]);
    }
  }
  setup.clothes.clearStoreInv();
  aw.S();
};

// prints multiple items quickly
setup.clothes.quickPrint = function(slot: clothingCategory): string {
  const keys = ↂ.ward[slot];
  let output = "";
  for (let i = 0, c = keys.length; i < c; i++) {
    output += aw.clothes[keys[i]].print();
  }
  return output;
};
