/*
.      ██████╗██╗      ██████╗ ████████╗██╗  ██╗██╗███╗   ██╗ ██████╗
.     ██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝
.     ██║     ██║     ██║   ██║   ██║   ███████║██║██╔██╗ ██║██║  ███╗
.     ██║     ██║     ██║   ██║   ██║   ██╔══██║██║██║╚██╗██║██║   ██║
.     ╚██████╗███████╗╚██████╔╝   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝
.      ╚═════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝

. ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
.██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
.██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
.██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
.╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
. ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
*/

interface setupClothesGen {
  panties: (...args: [number, number, number, number, number, string]) => string[];
  bra: (...args: [number, number, number, number, number, string]) => string[];
  stocking: (...args: [number, number, number, number, number, string]) => string[];
  upperBody: (...args: [number, number, number, number, number, string]) => string[];
  coat: (...args: [number, number, number, number, number, string]) => string[];
  dress: (...args: [number, number, number, number, number, string]) => string[];
  lowerBody: (...args: [number, number, number, number, number, string]) => string[];
  swimBottom: (...args: [number, number, number, number, number, string]) => string[];
  swimTop: (...args: [number, number, number, number, number, string]) => string[];
  shoes: (...args: [number, number, number, number, number, string]) => string[];
  countSwimL: number;
  amtSwimL: number;
  countSwimU: number;
  amtSwimU: number;
  countLowerBody: number;
  amtLowerBody: number;
  countDress: number;
  amtDress: number;
  countOverWear: number;
  amtOverWear: number;
  countUpBody: number;
  countupperBody: number;
  amtUpBody: number;
  amtupperBody: number;
  countLeg: number;
  amtLeg: number;
  countBras: number;
  amtBras: number;
  countPanties: number;
  amtPanties: number;
  countShoes: number;
  amtShoes: number;
}


// MACRO WRAPPERS

/*
PANTIES MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

Style: 0-everything equally, 1-no sexy-granny weighted, 2-no sexy-center weighted, 3-no granny-center weighted, 4-no granny-sexy weighted, 5-no extremes-center weighted, 6-fetish styles
Fabric: 0-standard, 1-conservative, 2-sexy, 3-extreme sexy (high transparency)
Color: 0-spectrum, 1-cute, 2-sexy
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genPanties", {
  handler() {
    ↂ.storeInv.panties = [];
    const result = setup.clothesGen.panties(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`Panties Generated: ${result}.`);
    } else {
      return this.error("something went wrong with panty generator, check console.");
    }
  },
});

/*
BRA MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

style: 0-everything equally, 1-average, 2-sexy, 3-fetish styles 4 - athletic
Fabric: 0-standard, 1-sexy, 2-extreme sexy (high transparency)
Color: 0-spectrum, 1-cute, 2-sexy not used
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genBra", {
  handler() {
    ↂ.storeInv.bra = [];
    const result = setup.clothesGen.bra(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`Bras Generated: ${result}.`);
    } else {
      return this.error("something went wrong with bra generator, check console.");
    }
  },
});

/*
STOCKING MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

Style: 0-everything equally, 1-standard, 2-sexy, 3-athletic only
Fabric: 0-standard, 1-fetish
Color:
Quality: -1 to 1 for change to attractiveness
*/
Macro.add("genStocking", {
  handler() {
    ↂ.storeInv.leg = [];
    const result = setup.clothesGen.stocking(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`Stocking Generated: ${result}.`);
    } else {
      return this.error("something went wrong with Stocking generator, check console.");
    }
  },
});

/*
UPPER BODY MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

Style: 0-everything equally, 1-no sexy, 2-some sexy, 3-all sexy, 4-mostly sexy 5-everything equally nightwear 6-sexy nightwear 7-athletic wear
Fabric: 0-standard, 1-conservative, 2-sexy, 3-fetish
Color: 0-spectrum, 1-cute, 2-sexy
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genUpperBody", {
  handler() {
    ↂ.storeInv.top = [];
    const result = setup.clothesGen.upperBody(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`UpperBody Generated: ${result}.`);
    } else {
      return this.error("something went wrong with UpperBody generator, check console.");
    }
  },
});

/*
OVERWEAR MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

Style: 0-everything equally, 1-standard
Fabric: 0-standard
Color:
Quality: -1 to 1 for change to attractiveness
*/
Macro.add("genOverWear", {
  handler() {
    ↂ.storeInv.coat = [];
    const result = setup.clothesGen.coat(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`OverWear Generated: ${result}.`);
    } else {
      return this.error("something went wrong with OverWear generator, check console.");
    }
  },
});

/*
DRESS MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

Style: 0-everything equally, 1-avg, 2-sexy,  3-mostly sexy
Fabric: 0-every, 1-standard, 2-fetish
Color: 0-spectrum, 1-cute, 2-sexy
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genDress", {
  handler() {
    ↂ.storeInv.dress = [];
    const result = setup.clothesGen.dress(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`Dress Generated: ${result}.`);
    } else {
      return this.error("something went wrong with Dress generator, check console.");
    }
  },
});

/*
LOWER BODY MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

Style: 0-everything equally, 1-distro, 2-pants, 3-shorts,  4-skirts, 5-sexy, 6-pyjama pants only :) 7 - athletic
Fabric: 0-standard, 1-fetish
Color: 0-everything equally, 1-conservative, 2-flashy
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genLowerBody", {
  handler() {
    ↂ.storeInv.bottom = [];
    const result = setup.clothesGen.lowerBody(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`LowerBody Generated: ${result}.`);
    } else {
      return this.error("something went wrong with LowerBody generator, check console.");
    }
  },
});

if (setup.clothesGen === null || setup.clothesGen === undefined) {
  setup.clothesGen = {} as setupClothesGen;
}

/*
SHOES MACRO
ARGUMENTS: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name

Style: 0-everything equally, 1-standard, 2-sporty, 3-punk, 4-bimbo
Fabric: 0-standard
Color: 0-standard, all others = all shoes will be that color.
Quality: -1 to 1 for change to attractiveness
*/
Macro.add("genShoes", {
  handler() {
    ↂ.storeInv.shoes = [];
    const result = setup.clothesGen.shoes(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`Shoes Generated: ${result}.`);
    } else {
      return this.error("something went wrong with shoes generator, check console.");
    }
  },
});

setup.clothesGen.panties = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", Panties Generator function ran with missing control variables - Passage: " + aw.passage.title;
    aw.con.warn("!Panties Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running Panties Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countPanties = 0;
  setup.clothesGen.amtPanties = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 7],
    [1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8],
    [3, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 10],
    [4, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 11],
    [2, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9],
    [8, 9, 9, 9, 10, 10, 11, 11, 11, 12, 12, 13, 13],
  ];
  const styleList = sLists[args[1]] || [1];
  let fabricList;
  if (args[2] === 0) {
    fabricList = [0, 1, 2, 3, 4, 5, 6];
  } else if (args[2] === 1) {
    fabricList = [0, 0, 1, 1, 2, 3, 3, 4];
  } else if (args[2] === 2) {
    fabricList = [4, 4, 5, 5, 6, 7, 8];
  } else {
    fabricList = [6, 6, 7, 7, 8, 9];
  }
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a, fabricList) {
    let subStyleList;
    let panties;
    let colorList;
    let style;
    let kinky = false;
    const worn = ["normal", "pulledAside", "pulledDown", "off"];
    const access = {
      nip: true,
      pussy: false,
      butt: true,
      tits: true,
      ass: false,
    };
    /*panties array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    panties = [
      ["na", "na", "na", "na", "na", "PA"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    panties[6] = either(styleList);
    /*substyles: 0-none, 1-lace border, 2-lace waist, 3-lace covered, 4-low back, 5-V back, 6-low front, 7-V front, 8-open paneled*/
    switch (panties[6]) {
      case 1:
        panties[0][1] = "classic briefs";
        subStyleList = [0, 0, 0, 0, 1, 2];
        panties[1] += either(-5, -5, -5, -4); /*attractiveness*/
        panties[2] += either(0, 0, 0, 0, -1); /*+sexy or -cute*/
        panties[3] += either(-3, -3, -4, -2); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 2:
        panties[0][1] = "control briefs";
        subStyleList = [0, 0, 0, 1, 1, 2];
        panties[1] += either(-5, -4, -4, -3); /*attractiveness*/
        panties[2] += either(0, 0, 0, 0, 0, 0, -1); /*+sexy or -cute*/
        panties[3] += either(-3, -2, -2, -2, -1); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 3:
        panties[0][1] = "high-cut briefs";
        subStyleList = [0, 0, 0, 1, 1, 2];
        panties[1] += either(-4, -3, -3, -3, -2); /*attractiveness*/
        panties[2] += either(0, -1, 1, 0); /*+sexy or -cute*/
        panties[3] += either(-4, -3, -2, -2, -2, -2, -1); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 4:
        panties[0][1] = "bikini briefs";
        subStyleList = [0, 0, 0, 1, 1, 2, 2, 3, 5, 7];
        panties[1] += either(-2, -2, -1); /*attractiveness*/
        panties[2] += either(-1, -1, -2, 0); /*+sexy or -cute*/
        panties[3] += either(-2, -1, -1, 0, 0, 0, 1); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 5:
        panties[0][1] = "bikini";
        subStyleList = [0, 0, 0, 2, 1, 1, 4, 5, 6, 7, 8];
        panties[1] += either(0, 1); /*attractiveness*/
        panties[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
        panties[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
        panties[4] += either(0.4, 0.3, 0.2, 0.1); /*exposure level 0-5*/
        break;
      case 6:
        panties[0][1] = "boyshorts";
        subStyleList = [0, 0, 0, 0, 1, 1, 2];
        panties[1] += either(0, 0, 0, 1, 2); /*attractiveness*/
        panties[2] += either(-3, -2, -2, -1, -1, -1, -1); /*+sexy or -cute*/
        panties[3] += either(-3, -2, -2, -1); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 7:
        panties[0][1] = "tanga";
        subStyleList = [0, 0, 0, 2, 1, 1, 4, 5, 6, 7, 8];
        panties[1] += either(0, 1, 1, 2); /*attractiveness*/
        panties[2] += either(0, 1, 1, 2); /*+sexy or -cute*/
        panties[3] += either(-1, 0, 1); /*+formal or -casual*/
        panties[4] += either(0.5, 0.6, 0.7); /*exposure level 0-5*/
        break;
      case 8:
        panties[0][1] = "thong";
        subStyleList = [0, 0, 0, 2, 1, 1, 4, 5, 6, 7, 8];
        panties[1] += either(1, 2, 2, 3); /*attractiveness*/
        panties[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
        panties[3] += 0; /*+formal or -casual*/
        panties[4] += 1; /*exposure level 0-5*/
        access.ass = true;
        break;
      case 9:
        panties[0][1] = "G-string";
        subStyleList = [0, 0, 0, 4, 5, 6, 7, 8];
        panties[1] += either(2, 3, 3, 4); /*attractiveness*/
        panties[2] += either(2, 3, 3, 4); /*+sexy or -cute*/
        panties[3] += either(0, 1, 2); /*+formal or -casual*/
        panties[4] += 1.5; /*exposure level 0-5*/
        access.ass = true;
        break;
      case 10:
        panties[0][1] = "C-string";
        subStyleList = [0];
        panties[1] += either(3, 3, 4); /*attractiveness*/
        panties[2] += either(1, 2, 3, 3, 4); /*+sexy or -cute*/
        panties[3] += either(1, 2, 3); /*+formal or -casual*/
        panties[4] += either(2, 1.5); /*exposure level 0-5*/
        access.pussy = true;
        access.ass = true;
        break;
      case 11:
        panties[0][1] = "crotchless";
        subStyleList = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8];
        panties[1] += either(3, 4, 5); /*attractiveness*/
        panties[2] += either(4, 5, 5); /*+sexy or -cute*/
        panties[3] += either(-1, 0, 1); /*+formal or -casual*/
        panties[4] += either(3.8, 4, 4.3); /*exposure level 0-5*/
        access.pussy = true;
        access.ass = true;
        worn.push("spreadOpen");
        kinky = true;
        break;
      case 12:
        panties[0][1] = "micro G-string";
        subStyleList = [0, 0, 0, 4, 5, 6, 7, 8];
        panties[1] += either(4, 5, 5); /*attractiveness*/
        panties[2] += either(4, 5, 5); /*+sexy or -cute*/
        panties[3] += 0; /*+formal or -casual*/
        panties[4] += either(3.8, 4, 4.3); /*exposure level 0-5*/
        access.pussy = true;
        access.ass = true;
        kinky = true;
        break;
      case 13:
        panties[0][1] = "harness";
        subStyleList = [0];
        panties[1] += either(6, 7, 8); /*attractiveness*/
        panties[2] += either(4, 5, 5); /*+sexy or -cute*/
        panties[3] += either(-5, -5, -4); /*+formal or -casual*/
        panties[4] += either(5); /*exposure level 0-5*/
        access.pussy = true;
        access.ass = true;
        kinky = true;
        break;
      default:
        style = "bad arg to pantiesStyle";
    }
    panties[7] = either(subStyleList);
    switch (panties[7]) {
      case 0:
        panties[0][2] = "regular";
        break;
      case 1:
        panties[0][2] = "lace-bordered";
        panties[1] += either(0, 0.3, 0.5); /*attractiveness*/
        panties[2] += either(-1, -1, 0, 0, 1); /*+sexy or -cute*/
        break;
      case 2:
        panties[0][2] = "lace-waisted";
        panties[1] += either(-1, -0.5, 0, 0.5, 1, 1, 1); /*attractiveness*/
        panties[2] += either(-1, -0.5, 0.5, 1, 1, 1); /*+sexy or -cute*/
        panties[3] += either(0.5, 1, 1, 2, 2); /*+formal or -casual*/
        panties[4] += either(0, 0, 0, 0.1, 0.2); /*exposure level 0-5*/
        break;
      case 3:
        panties[0][2] = "lace-covered";
        panties[1] += either(-2, -1, 0, 0, 0, 1, 1, 2); /*attractiveness*/
        panties[2] += either(-2, -2, -1); /*+sexy or -cute*/
        panties[3] += either(1, 1, 2, 2, 3); /*+formal or -casual*/
        panties[4] += -1; /*exposure level 0-5*/
        break;
      case 4:
        panties[0][2] = "low-back";
        panties[1] += either(0, 0.5, 1, 1); /*attractiveness*/
        panties[2] += either(0, 1, 1); /*+sexy or -cute*/
        panties[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
        panties[4] += either(0.2, 0.3, 0.4, 0.5); /*exposure level 0-5*/
        break;
      case 5:
        panties[0][2] = "V-back";
        panties[1] += either(0, 0.5, 1, 1); /*attractiveness*/
        panties[2] += either(1, 1, 1.5, 2, 2.5); /*+sexy or -cute*/
        panties[4] += either(0.2, 0.3, 0.4, 0.5); /*exposure level 0-5*/
        break;
      case 6:
        panties[0][2] = "low-front";
        panties[1] += either(1, 2, 3); /*attractiveness*/
        panties[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
        panties[4] += either(0.4, 0.5, 0.6, 0.7); /*exposure level 0-5*/
        break;
      case 7:
        panties[0][2] = "V-front";
        panties[1] += either(1, 2, 3); /*attractiveness*/
        panties[2] += either(1, 1, 2, 2); /*+sexy or -cute*/
        panties[4] += either(0.8, 0.6, 0.7, 0.9); /*exposure level 0-5*/
        break;
      case 8:
        panties[0][2] = "open-paneled";
        panties[1] += either(1, 2, 3); /*attractiveness*/
        panties[2] += either(1, 1, 2, 2); /*+sexy or -cute*/
        panties[4] += either(0.5, 0.6, 0.7); /*exposure level 0-5*/
        break;
    }
    /*fabrics: 0-cotton, 1-cotton blend, 2-lycra, 3-cotton knit, 4-nylon, 5-silk, 6-sheer nylon, 7-can't remember, 8-lingerie mesh, transparent latex */
    panties[8] = either(fabricList);
    switch (panties[8]) {
      case 0:
        panties[0][4] = "cotton";
        panties[1] += either(-2, -1, -1, -0.5); /*attractiveness*/
        panties[3] += either(-1, -2, -2); /*+formal or -casual*/
        break;
      case 1:
        panties[0][4] = "cotton blend";
        panties[1] += either(-1, -1, -0.5); /*attractiveness*/
        panties[3] += either(-1, -1, -2); /*+formal or -casual*/
        break;
      case 2:
        panties[0][4] = "lycra";
        panties[1] += either(-1, -1, 0); /*attractiveness*/
        panties[3] += either(-2, -3, -2); /*+formal or -casual*/
        break;
      case 3:
        panties[0][4] = "cotton-knit";
        panties[2] += either(0, 0, -1); /*+sexy or -cute*/
        panties[3] += either(-1, 0); /*+formal or -casual*/
        break;
      case 4:
        panties[0][4] = "nylon";
        panties[1] += either(0, 0, 1); /*attractiveness*/
        panties[2] += either(0, 0, 1); /*+sexy or -cute*/
        panties[3] += either(0, 0, 1); /*+formal or -casual*/
        panties[4] += either(0, 0, 0.2); /*exposure level 0-5*/
        break;
      case 5:
        panties[0][4] = "silk";
        panties[1] += either(1, 2, 2, 3); /*attractiveness*/
        panties[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        panties[3] += either(2, 2, 3); /*+formal or -casual*/
        panties[4] += either(0.1, 0.2, 0.3, 0.4); /*exposure level 0-5*/
        break;
      case 6:
        panties[0][4] = "sheer-nylon";
        panties[1] += either(2, 3, 3, 4); /*attractiveness*/
        panties[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        panties[3] += either(2, 3, 3); /*+formal or -casual*/
        panties[4] += either(2, 3, 3, 4); /*exposure level 0-5*/
        break;
      case 7:
        panties[0][4] = "chifon";
        panties[1] += either(3, 4, 4, 5); /*attractiveness*/
        panties[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        panties[3] += either(3, 3, 4); /*+formal or -casual*/
        panties[4] += either(3, 4, 4); /*exposure level 0-5*/
        break;
      case 8:
        panties[0][4] = "silk-mesh";
        panties[1] += either(4, 5, 5, 6); /*attractiveness*/
        panties[2] += either(4, 5, 5, 8); /*+sexy or -cute*/
        panties[3] += either(3, 3, 4); /*+formal or -casual*/
        panties[4] += either(4, 4, 4.5); /*exposure level 0-5*/
        break;
      case 9:
        panties[0][4] = "translucent-latex";
        panties[1] += either(3, 4, 4, 5); /*attractiveness*/
        panties[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        panties[4] += either(3, 4, 4); /*exposure level 0-5*/
        break;
    }
    /*color: 0-beige, 1-white, 2-pink, 4-pastel blue, 5-pastel green, 6-pastel yellow, 7-pastel purple, 8-black, 9-red */
    /*pattern: A-none, B-striped, C-checked, D-flower print ????? */
    colorList = [0, 0, 0, 1, 1, 1, 1, 2, 2, 4, 5, 6, 7, 8, 8, 8, 8, 8, 9, 9, 9];
    if (args[3] === 4) {
      colorList = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 9];
    }
    panties[9] = either(colorList);
    switch (panties[9]) {
      case 0:
        panties[0][0] = "beige";
        panties[1] += either(-2, -1, -1);
        panties[3] += either(-2, -1, 0); /*+formal or -casual*/
        break;
      case 1:
        panties[0][0] = "white";
        if (panties[2] > 0) {
          panties[2] += either(1, 2); /*+sexy or -cute*/
        } else {
          panties[2] += either(-3, -2, -2, -1); /*+sexy or -cute*/
        }
        panties[3] += either(1, 2, 3); /*+formal or -casual*/
        break;
      case 2:
        panties[0][0] = "pink";
        if (panties[2] < 0) {
          panties[2] += either(-3, -2, -1); /*+sexy or -cute*/
        }
        panties[3] += either(-1, 0, 1); /*+formal or -casual*/
        break;
      case 4:
        panties[0][0] = "pastel-blue";
        if (panties[2] < 0) {
          panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
        }
        panties[3] += either(-1, 0, 0); /*+formal or -casual*/
        break;
      case 5:
        panties[0][0] = "pastel-green";
        if (panties[2] < 0) {
          panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
        }
        panties[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 6:
        panties[0][0] = "pastel-yellow";
        if (panties[2] < 0) {
          panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
        }
        panties[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 7:
        panties[0][0] = "pastel-purple";
        if (panties[2] < 0) {
          panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
        }
        panties[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 8:
        panties[0][0] = "black";
        if (panties[2] > 0) {
          panties[2] += either(1, 1, 2, 3); /*+sexy or -cute*/
        }
        panties[3] += either(1, 2); /*+formal or -casual*/
        break;
      case 9:
        panties[0][0] = "red";
        if (panties[2] > 0) {
          panties[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        }
        panties[3] += either(1, 2); /*+formal or -casual*/
        break;
    }
    panties[4] = Math.max(0, Math.min(50, Math.floor(panties[4] * 10)));
    panties[1] = Math.round(panties[1]);
    panties[2] = panties[2] > 0 ? Math.floor(panties[2]) : Math.ceil(panties[2]);
    panties[3] = panties[3] > 0 ? Math.floor(panties[3]) : Math.ceil(panties[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.75, 1, 1.25, 1.5, 1.8];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.2, 1.5];
    if (panties[1] < 0) {
      panties[1] = Math.max(-6, Math.round(panties[1] * atrNeg[a]));
    } else {
      panties[1] = Math.round(panties[1] * atr[a] + random(aw.base.clothingAtrMod.panties[0], aw.base.clothingAtrMod.panties[1]));
    }
    panties[4] = Math.min(expCap[a], panties[4]);
    panties[2] = Math.round(panties[2] * sexy[a]);
    if (panties[1] > 0) {
      panties[1] = Math.round(panties[1] * 1.35);
    }
    const atrCap = [8, 12, 16, 18, 20];
    if (panties[1] > atrCap[a]) {
      panties[1] = atrCap[a];
    }
    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type: "panties",
      slot: "panties",
      colorWord: panties[0][0],
      styleWord: panties[0][1],
      subStyleWord: panties[0][2],
      tertiaryWord: panties[0][3],
      fabricWord: panties[0][4],
      atr: panties[1],
      sexy: panties[2],
      formal: panties[3],
      exposure: panties[4],
      style: panties[6],
      subStyle: panties[7],
      fabric: panties[8],
      color: panties[9],
      origin: panties[10],
      swimwear: false,
      nightwear: false,
      athletic: false,
      kinky,
      accessNip: access.nip,
      accessPussy: access.pussy,
      accessButt: access.butt,
      accessTits: access.tits,
      accessAss: access.ass,
      wear: worn,
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.panties.push(key);
    results.push(key);
    setup.clothesGen.countPanties += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a, fabricList);
  }
  /*
  const safe = function() {
    if (setup.clothesGen.countPanties < setup.clothesGen.amtPanties) {
      aw.con.warn(`Panty Generator timed out!`);
      setup.clothesGen.countPanties = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countPanties < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} panties.`);
  return results;
};

setup.clothesGen.bra = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", Bra Generator function ran with missing control variables - Passage: " + aw.passage.title;
    aw.con.warn("!Bra Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running Bra Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countBras = 0;
  setup.clothesGen.amtBras = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7],
    [4, 5, 6, 6, 7, 7, 8, 8, 9, 9],
    [7, 8, 8, 9, 10, 11, 11, 12, 13],
    [1],
  ];
  const styleList = sLists[args[1]] || [1];
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a, fabArray) {
    let style,
      access = {
        nip: false,
        pussy: true,
        butt: true,
        tits: false,
        ass: true,
      },
      worn = ["normal", "off", "strapsOff", "titsOut", "flippedDown"],
      athletic = false,
      kinky = false,
      type: clothingType = "bra",
      subStyleList,
      bra,
      fabricList,
      colorList;
    /*bra array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    bra = [
      ["na", "na", "na", "na", "na", "BR"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    bra[6] = either(styleList);
    /*substyles: 0-none, 1-lace border, 2-convertable, 3-strapless, 4-lace covered, 5-front fasten, 6-wide strap, 7spaghetti strap*/
    switch (bra[6]) {
      case 1:
        bra[0][1] = "active bra";
        subStyleList = [0, 0, 6, 6, 6, 3];
        bra[1] += either(-2, -1, 0, 1, 2); /*attractiveness*/
        bra[2] += either(1, 0, 0, 0, -1); /*+sexy or -cute*/
        bra[3] += either(-3, -3, -4, -2); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        athletic = true;
        type = "sports bra";
        worn.delete("titsOut");
        break;
      case 2:
        bra[0][1] = "contour bra";
        subStyleList = [0, 0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 6, 7];
        bra[1] += either(-2, -1, 0, 0, 1, 2); /*attractiveness*/
        bra[2] += either(1, 0, 0, 0, 0, 0, -1); /*+sexy or -cute*/
        bra[3] += either(0, 0, 0, 1, 1, 2, -2, -1); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        break;
      case 3:
        bra[0][1] = "demi-cup bra";
        subStyleList = [0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 6, 7];
        bra[1] += either(0, 0, -1, 1, 1, 2); /*attractiveness*/
        bra[2] += either(0, -1, 1, 0, 1, 1); /*+sexy or -cute*/
        bra[3] += either(-2, -1, -1, 0, 0, 0, 1, 1, 2); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        break;
      case 4:
        bra[0][1] = "t-shirt bra";
        subStyleList = [0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 6, 7];
        bra[1] += either(-2, -1, -1, 0, 0, 0, 1, 1); /*attractiveness*/
        bra[2] += either(-1, -1, -2, 0); /*+sexy or -cute*/
        bra[3] += either(-2, -1, -1, 0, 0, 0, 1); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        break;
      case 5:
        bra[0][1] = "push-up bra";
        subStyleList = [0, 0, 0, 1, 1, 4, 4, 5, 6, 7];
        bra[1] += either(0, 1, 1, 2, 2, 3); /*attractiveness*/
        bra[2] += either(0, 1, 2, 2, 3); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
        bra[4] += either(0.4, 0.3, 0.2, 0.1); /*exposure level 0-5*/
        break;
      case 6:
        bra[0][1] = "plunge bra";
        subStyleList = [0, 0, 0, 1, 1, 4, 4, 5, 6, 7];
        bra[1] += either(0, 1, 2, 2, 3, 3, 4); /*attractiveness*/
        bra[2] += either(0, 1, 2, 2, 3); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
        bra[4] += either(0.5, 0.6, 0.7); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 7:
        bra[0][1] = "bandeau bra";
        subStyleList = [0, 0, 0, 1];
        bra[1] += either(0, 1, 1, 2, 3); /*attractiveness*/
        bra[2] += either(-1, -1, 0, 1, 1, 2); /*+sexy or -cute*/
        bra[3] += either(-1, -1, -1, -2, -2, -3, 0, 1); /*+formal or -casual*/
        bra[4] += either(0.8, 0.7, 0.6); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 8:
        bra[0][1] = "balconette bra";
        subStyleList = [0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 6, 7];
        bra[1] += either(0, 1, 2, 2, 3, 3, 4); /*attractiveness*/
        bra[2] += either(0, 1, 2, 2, 3); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
        bra[4] += either(1.5, 1, 0.8); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 9:
        bra[0][1] = "molded bra";
        subStyleList = [0, 0, 0, 1, 2, 3, 5, 6, 7, 7];
        bra[1] += either(2, 3, 3, 4); /*attractiveness*/
        bra[2] += either(3, 3, 4, 5); /*+sexy or -cute*/
        bra[3] += either(0, 1, 2); /*+formal or -casual*/
        bra[4] += either(1.5, 2, 2); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 10:
        bra[0][1] = "peephole bra";
        subStyleList = [0, 0, 0, 1, 2, 3, 5, 6, 7, 7];
        bra[1] += either(3, 3, 4, 4, 5); /*attractiveness*/
        bra[2] += either(5, 4, 3, 3, 4); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 1); /*+formal or -casual*/
        bra[4] += either(3, 3.5, 4); /*exposure level 0-5*/
        access.tits = true;
        access.nip = true;
        kinky = true;
        break;
      case 11:
        bra[0][1] = "shelf bra";
        subStyleList = [0, 0, 0, 1, 3, 5, 6, 7, 7];
        bra[1] += either(4, 5, 5, 6); /*attractiveness*/
        bra[2] += either(4.5, 5, 5); /*+sexy or -cute*/
        bra[3] += either(2, 3, 1); /*+formal or -casual*/
        bra[4] += either(4, 4.5, 5); /*exposure level 0-5*/
        access.tits = true;
        access.nip = true;
        worn.delete("titsOut");
        break;
      case 12:
        bra[0][1] = "cupless bra";
        subStyleList = [0, 0, 0, 1, 3, 5, 6, 7, 7];
        bra[1] += either(5, 6, 6, 7); /*attractiveness*/
        bra[2] += either(4.5, 5, 5); /*+sexy or -cute*/
        bra[3] += 0; /*+formal or -casual*/
        bra[4] += 6; /*exposure level 0-5*/
        access.tits = true;
        access.nip = true;
        worn.delete("titsOut");
        kinky = true;
        break;
      case 13:
        bra[0][1] = "harness bra";
        subStyleList = [0];
        bra[1] += either(6, 6, 7, 7); /*attractiveness*/
        bra[2] += either(4.5, 5, 5); /*+sexy or -cute*/
        bra[3] += -2; /*+formal or -casual*/
        bra[4] += 5; /*exposure level 0-5*/
        access.tits = true;
        access.nip = true;
        worn.delete("titsOut");
        kinky = true;
        break;
      default:
        style = "bad arg to braStyle";
    }
    bra[7] = either(subStyleList);
    switch (bra[7]) {
      case 0:
        bra[0][2] = "regular";
        break;
      case 1:
        bra[0][2] = "lace-edged";
        bra[1] += either(0, 0.3, 0.5); /*attractiveness*/
        if (bra[2] >= 0) {
          bra[2] += either(0, 0.5, 1);
        } else {
          bra[2] += either(0, -0.5, -1);
        } /*+sexy or -cute*/
        break;
      case 2:
        bra[0][2] = "convertable";
        bra[1] += either(-1, -0.5, -0.5, 0, 0, 0.5); /*attractiveness*/
        bra[2] += 0; /*+sexy or -cute*/
        bra[3] += either(0, -1, 1); /*+formal or -casual*/
        bra[4] += either(0, 0, 0, 0.1, 0.2); /*exposure level 0-5*/
        break;
      case 3:
        bra[0][2] = "strapless";
        bra[1] += either(0.5, 1, 1, 2); /*attractiveness*/
        bra[2] += either(0, 1, 1, 2); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
        bra[4] += either(0.1, 0.2, 0.2, 0.3); /*exposure level 0-5*/
        worn.delete("strapsOff");
        break;
      case 4:
        bra[0][2] = "lace-covered";
        bra[1] += either(-1, 0, 0, 0, 1, 1); /*attractiveness*/
        if (bra[2] >= 0) {
          bra[2] += either(0, 0, 1);
        } else {
          bra[2] += either(-2, -2, -1);
        } /*+sexy or -cute*/
        bra[3] += either(0, 0, 1, 1, 2); /*+formal or -casual*/
        bra[4] += -1; /*exposure level 0-5*/
        break;
      case 5:
        bra[0][2] = "front-fasten";
        bra[1] += either(0, 0, 0, 0.5); /*attractiveness*/
        break;
      case 6:
        bra[0][2] = "wide-strap";
        bra[1] += either(-1, -2, -1, -2, -3); /*attractiveness*/
        if (bra[6] > 1) {
          bra[2] += either(-1, -2, -2, 0);
        } /*+sexy or -cute*/
        bra[4] += either(-0.3, -0.4, -0.4, -0.5); /*exposure level 0-5*/
        break;
      case 7:
        bra[0][2] = "spaghetti-strap";
        bra[1] += either(0, 1, 1, 1, 2); /*attractiveness*/
        if (bra[2] >= 0) {
          bra[2] += either(1, 1, 2, 2);
        } else {
          bra[2] += either(-1, -1, -2, -2);
        } /*+sexy or -cute*/
        bra[4] += either(0.2, 0.2, 0.3); /*exposure level 0-5*/
        break;
    }
    /*fabrics: 0Cotton Blend, 1Cotton Knit, 2Microfiber, 3Satin, 4Embroidery, 5Lace, 6Guipure, 7Tulle, 8translucent-latex */
    if (fabArray === 0) {
      if (bra[6] === 0) {
        fabricList = [0, 1, 1, 2, 2, 2];
      } else if (bra[6] < 4) {
        fabricList = [0, 0, 1, 1, 2, 3, 3, 4];
      } else if (bra[6] === 4) {
        fabricList = [1, 1, 1, 2, 3];
      } else if (bra[6] < 7) {
        fabricList = [0, 1, 2, 2, 3, 3, 3, 4, 4];
      }
      fabricList = [0, 3, 3, 3, 4, 4];
    } else if (fabArray === 1) {
      if (bra[6] === 0) {
        fabricList = [2, 2, 3];
      } else if (bra[6] < 4) {
        fabricList = [2, 3, 3, 4, 4, 5, 5];
      } else if (bra[6] === 4) {
        fabricList = [1, 2, 2, 3, 3, 3];
      } else if (bra[6] < 7) {
        fabricList = [3, 3, 4, 4, 4, 5, 5];
      } else {
        fabricList = [4, 4, 5, 5, 5];
      }
    } else {
      if (bra[6] === 0) {
        fabricList = [7, 8, 8];
      } else if (bra[6] < 4) {
        fabricList = [5, 5, 6, 6, 7, 7, 8];
      } else if (bra[6] === 4) {
        fabricList = [7, 8, 8];
      } else if (bra[6] < 7) {
        fabricList = [5, 6, 6, 7, 7, 8];
      } else {
        fabricList = [5, 6, 6, 7, 7, 8];
      }
    }
    bra[8] = either(fabricList);
    switch (bra[8]) {
      case 0:
        bra[0][4] = "cotton blend";
        bra[1] += either(-1, -0.5, 0, 0, 1, 1); /*attractiveness*/
        if (bra[2] >= 0) {
          bra[2] += either(0, 0, 1);
        } else {
          bra[2] += either(0, -1, -1);
        }
        bra[3] += either(-1, -2, -2); /*+formal or -casual*/
        break;
      case 1:
        bra[0][4] = "cotton-knit";
        bra[1] += either(-1, 0, 1, 1); /*attractiveness*/
        if (bra[2] >= 0) {
          bra[2] += either(0, 0, 1);
        } else {
          bra[2] += either(0, -1, -2);
        }
        bra[3] += either(-1, -2, -2); /*+formal or -casual*/
        break;
      case 2:
        bra[0][4] = "microfiber";
        if (bra[6] === 0 || bra[6] === 7) {
          bra[1] += either(-1, 0, 1, 1, 2);
        } else {
          bra[1] += either(-2, -1, 0, 1, 1);
        }
        bra[3] += either(-2, -3, -2); /*+formal or -casual*/
        break;
      case 3:
        bra[0][4] = "satin";
        bra[1] += either(0, 1, 1); /*+sexy or -cute*/
        if (bra[2] < 0) {
          bra[2] += either(0, 0, -1);
        } else {
          bra[2] += either(0, 1, 2);
        }
        bra[3] += either(1, 2, 2, 3); /*+formal or -casual*/
        break;
      case 4:
        bra[0][4] = "embroidery";
        if (bra[6] < 7) {
          bra[1] += either(0, 1, 1);
          bra[2] += either(0, 1, 1);
        } else {
          bra[2] += either(1, 2, 2);
          bra[1] += either(1, 2, 2);
          bra[4] += either(0, 0.2, 0.4);
        }
        bra[3] += either(0, 1, 2);
        break;
      case 5:
        bra[0][4] = "lace";
        if (bra[6] < 7) {
          bra[1] += either(1, 2, 2);
        } else {
          bra[1] += either(2, 3, 3);
          bra[4] += either(0.5, 0.8, 1, 1);
        }
        bra[2] += either(1, 2, 2, 3);
        bra[2] += either(1, 2, 2, 3);
        break;
      case 6:
        bra[0][4] = "guipure";
        bra[1] += either(2, 3, 3, 4); /*attractiveness*/
        bra[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        bra[3] += either(2, 3, 3); /*+formal or -casual*/
        bra[4] += either(2, 3, 3, 4); /*exposure level 0-5*/
        break;
      case 7:
        bra[0][4] = "tulle";
        bra[1] += either(3, 4, 4, 5); /*attractiveness*/
        bra[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        bra[3] += either(3, 3, 4); /*+formal or -casual*/
        bra[4] += either(3, 4, 4); /*exposure level 0-5*/
        break;
      case 8:
        bra[0][4] = "translucent-latex";
        bra[1] += either(4, 5, 5, 6); /*attractiveness*/
        bra[2] += either(4, 5, 5, 8); /*+sexy or -cute*/
        bra[3] += either(3, 3, 4); /*+formal or -casual*/
        bra[4] += either(3.5, 4, 4); /*exposure level 0-5*/
        break;
    }
    /*color: 0-beige, 1-white, 2-pink, , 6-pastel yellow, 7-pastel purple, 8-black, 9-red, 10-blue, 11-green */
    /*pattern: A-none, B-striped, C-checked, D-flower print ????? */
    colorList = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 6, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 10, 11];
    if (args[3] === 4) {
      colorList = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 9];
    }
    bra[9] = either(colorList);
    switch (bra[9]) {
      case 0:
        bra[0][0] = "beige";
        bra[1] += either(-2, -1, -1);
        bra[3] += either(-2, -1, 0); /*+formal or -casual*/
        break;
      case 1:
        bra[0][0] = "white";
        if (bra[2] > 0) {
          bra[2] += either(1, 2); /*+sexy or -cute*/
        } else {
          bra[2] += either(-3, -2, -2, -1); /*+sexy or -cute*/
        }
        bra[3] += either(1, 2, 3); /*+formal or -casual*/
        break;
      case 2:
        bra[0][0] = "pink";
        if (bra[2] < 0) {
          bra[2] += either(-3, -2, -1); /*+sexy or -cute*/
        }
        bra[3] += either(-1, 0, 1); /*+formal or -casual*/
        break;
      case 6:
        bra[0][0] = "pastel-yellow";
        if (bra[2] < 0) {
          bra[2] += either(-2, -1, 0); /*+sexy or -cute*/
        }
        bra[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 7:
        bra[0][0] = "pastel-purple";
        if (bra[2] < 0) {
          bra[2] += either(-2, -1, 0); /*+sexy or -cute*/
        }
        bra[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 8:
        bra[0][0] = "black";
        if (bra[2] > 0) {
          bra[2] += either(1, 1, 2, 3); /*+sexy or -cute*/
        }
        bra[3] += either(1, 2); /*+formal or -casual*/
        break;
      case 9:
        bra[0][0] = "red";
        if (bra[2] > 0) {
          bra[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        }
        bra[3] += either(1, 2); /*+formal or -casual*/
        break;
      case 10:
        bra[0][0] = "blue";
        bra[2] += either(-1, 0, 1, 1, 1); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0); /*+formal or -casual*/
        break;
      case 11:
        bra[0][0] = "green";
        bra[2] += either(-1, 0, 1, 1, 1); /*+sexy or -cute*/
        bra[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
    }
    bra[4] = Math.max(0, Math.min(50, Math.floor(bra[4] * 10)));
    bra[1] = Math.round(bra[1]);
    bra[2] = bra[2] > 0 ? Math.floor(bra[2]) : Math.ceil(bra[2]);
    bra[3] = bra[3] > 0 ? Math.floor(bra[3]) : Math.ceil(bra[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.75, 1, 1.25, 1.5, 1.8];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.3, 1.6];
    if (bra[1] < 0) {
      bra[1] = Math.max(-6, Math.round(bra[1] * atrNeg[a]));
    } else {
      bra[1] = Math.round(bra[1] * atr[a] + random(aw.base.clothingAtrMod.bra[0], aw.base.clothingAtrMod.bra[1]));
    }
    bra[4] = Math.min(expCap[a], bra[4]);
    bra[2] = Math.round(bra[2] * sexy[a]);
    if (bra[1] > 0) {
      bra[1] = Math.round(bra[1] * 1.45);
    }
    const atrCap = [8, 12, 16, 18, 20];
    if (bra[1] > atrCap[a]) {
      bra[1] = atrCap[a];
    }
    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type,
      slot: "bra",
      colorWord: bra[0][0],
      styleWord: bra[0][1],
      subStyleWord: bra[0][2],
      tertiaryWord: bra[0][3],
      fabricWord: bra[0][4],
      atr: bra[1],
      sexy: bra[2],
      formal: bra[3],
      exposure: bra[4],
      style: bra[6],
      subStyle: bra[7],
      fabric: bra[8],
      color: bra[9],
      origin: bra[10],
      swimwear: false,
      nightwear: false,
      athletic,
      kinky,
      accessNip: access.nip,
      accessTits: access.tits,
      accessPussy: access.pussy,
      accessButt: access.butt,
      accessAss: access.ass,
      wear: worn,
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.bra.push(key);
    results.push(key);
    setup.clothesGen.countBras += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a, args[2]);
  }
  /*const safe = function() {
    if (setup.clothesGen.countBras < setup.clothesGen.amtBras) {
      aw.con.warn(`Bra Generator timed out!`);
      setup.clothesGen.countBras = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.amtBras < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} bras.`);
  return results;
};

setup.clothesGen.stocking = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", stocking Generator function ran with missing control variables - Passage: " + aw.passage.title;
    aw.con.warn("!stocking Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running Stocking Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countLeg = 0;
  setup.clothesGen.amtLeg = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 2, 3, 4, 4, 4, 5, 5, 6],
    [5, 6, 7, 7, 8, 8, 9, 9],
  ];
  const styleList = sLists[args[1]] || [1];
  let fabricList;
  if (args[2] === 0) {
    fabricList = [0];
  } else if (args[2] === 1) {
    fabricList = [0, 1];
  }
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a, fabricList) {
    let style,
      access = {
        nip: true,
        pussy: true,
        butt: true,
        tits: true,
        ass: true,
      },
      worn = ["normal", "off"],
      stocking,
      colorList;
    /*stocking array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    stocking = [
      ["na", "na", "na", "na", "na", "LG"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    stocking[6] = either(styleList);
    /*substyles: 0-none, 1-lace border, 2-convertable, 3-strapless, 4-lace covered, 5-front fasten, 6-wide strap, 7spaghetti strap*/
    switch (stocking[6]) {
      case 1:
        stocking[0][1] = "knee-high socks";
        stocking[1] += either(0, 0.4, 1); /*attractiveness*/
        stocking[2] += either(0, 0, -1, -1, -1); /*+sexy or -cute*/
        stocking[4] = 2; /*exposure level 0-5*/
        break;
      case 2:
        stocking[0][1] = "over-knee socks";
        stocking[1] += either(0, 1, 1, 2); /*attractiveness*/
        stocking[2] += either(-1, -1, -1, -2, -2, -3); /*+sexy or -cute*/
        stocking[4] = 1; /*exposure level 0-5*/
        break;
      case 3:
        stocking[0][1] = "opaque stockings";
        stocking[1] += either(1, 1, 2); /*attractiveness*/
        stocking[2] += either(0, 1, 1); /*+sexy or -cute*/
        stocking[4] = 1; /*exposure level 0-5*/
        access.pussy = false;
        access.ass = false;
        worn.push("pulledDown");
        break;
      case 4:
        stocking[0][1] = "pantyhose";
        stocking[1] += either(0, 1, 1); /*attractiveness*/
        stocking[2] += either(0, 1, 1); /*+sexy or -cute*/
        stocking[4] = 0; /*exposure level 0-5*/
        access.pussy = false;
        access.ass = false;
        worn.push("pulledDown");
        break;
      case 5:
        stocking[0][1] = "sheer stockings";
        stocking[1] += either(1, 2, 2); /*attractiveness*/
        stocking[2] += either(1, 2, 2); /*+sexy or -cute*/
        stocking[4] = 2; /*exposure level 0-5*/
        access.pussy = false;
        access.ass = false;
        worn.push("pulledDown");
        break;
      case 6:
        stocking[0][1] = "garter stockings";
        stocking[1] += either(2, 2, 2, 3); /*attractiveness*/
        stocking[2] += either(2, 2, 3); /*+sexy or -cute*/
        stocking[4] = 1; /*exposure level 0-5*/
        break;
      case 7:
        stocking[0][1] = "lace stockings";
        stocking[1] += either(2, 2, 3); /*attractiveness*/
        stocking[2] += either(2, 3, 3); /*+sexy or -cute*/
        stocking[4] = 2; /*exposure level 0-5*/
        break;
      case 8:
        stocking[0][1] = "fishnet stockings";
        stocking[1] += either(2, 3, 3); /*attractiveness*/
        stocking[2] += either(3, 3, 4); /*+sexy or -cute*/
        stocking[4] = 3; /*exposure level 0-5*/
        break;
      case 9:
        stocking[0][1] = "fencenet stockings";
        stocking[1] += either(3, 3, 4); /*attractiveness*/
        stocking[2] += either(3, 4); /*+sexy or -cute*/
        stocking[4] = 3; /*exposure level 0-5*/
        break;
      default:
        style = "bad arg to stockingStyle: " + styleList + "actual " + stocking;
    }
    stocking[8] = either(fabricList);
    switch (stocking[8]) {
      case 0:
        stocking[0][4] = 0;
        break;
      case 1:
        stocking[0][4] = "latex";
        stocking[1] += either(1, 2, 2); /*attractiveness*/
        stocking[2] += either(1, 2, 1); /*+sexy or -cute*/
        break;
    }
    /*color: 1-white, 2-pink, , 8-black, 9-red, 10-blue, 11-green, 12-purple, 27-peach */
    /*pattern: A-none, B-striped, C-checked, D-flower print ????? */
    colorList = [1, 1, 1, 2, 8, 8, 8, 8, 8, 9, 9, 9, 10, 11, 12, 27, 27, 27, 27, 27];
    if (args[3] === 4) {
      colorList = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 9];
    }
    stocking[9] = either(colorList);
    switch (stocking[9]) {
      case 1:
        stocking[0][0] = "white";
        if (stocking[2] > 0) {
          stocking[2] += either(1, 2); /*+sexy or -cute*/
        } else {
          stocking[2] += either(-2, -2, -1); /*+sexy or -cute*/
        }
        stocking[3] += either(1, 2, 3); /*+formal or -casual*/
        break;
      case 2:
        stocking[0][0] = "pink";
        if (stocking[2] < 0) {
          stocking[2] += either(-3, -2, -1); /*+sexy or -cute*/
        }
        break;
      case 8:
        stocking[0][0] = "black";
        if (stocking[2] > 0) {
          stocking[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        }
        break;
      case 9:
        stocking[0][0] = "red";
        if (stocking[2] > 0) {
          stocking[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        }
        break;
      case 10:
        stocking[0][0] = "blue";
        if (stocking[2] < 0) {
          stocking[2] += either(-1, -1, 0); /*+sexy or -cute*/
        }
        break;
      case 11:
        stocking[0][0] = "green";
        if (stocking[2] < 0) {
          stocking[2] += either(-1, -1, 0); /*+sexy or -cute*/
        }
        break;
      case 12:
        stocking[0][0] = "purple";
        if (stocking[2] < 0) {
          stocking[2] += either(-1, -1, 0); /*+sexy or -cute*/
        }
        break;
      case 27:
        stocking[0][0] = "peach";
        stocking[1] += either(1, 0, -1);
        break;
    }
    stocking[4] = Math.max(0, Math.min(50, Math.floor(stocking[4] * 10)));
    stocking[1] = Math.round(stocking[1]);
    stocking[2] = stocking[2] > 0 ? Math.floor(stocking[2]) : Math.ceil(stocking[2]);
    stocking[3] = stocking[3] > 0 ? Math.floor(stocking[3]) : Math.ceil(stocking[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.75, 1, 1.25, 1.5, 1.75];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.2, 1.4];
    if (stocking[1] < 0) {
      stocking[1] = Math.max(-6, Math.round(stocking[1] * atrNeg[a]));
    } else {
      stocking[1] = Math.round(stocking[1] * atr[a] + random(aw.base.clothingAtrMod.leg[0], aw.base.clothingAtrMod.leg[1]));
    }
    stocking[4] = Math.min(expCap[a], stocking[4]);
    stocking[2] = Math.round(stocking[2] * sexy[a]);

    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type: "stocking",
      slot: "leg",
      colorWord: stocking[0][0],
      styleWord: stocking[0][1],
      subStyleWord: "none",
      tertiaryWord: "none",
      fabricWord: stocking[0][4],
      atr: stocking[1],
      sexy: stocking[2],
      formal: stocking[3],
      exposure: stocking[4],
      style: stocking[6],
      subStyle: stocking[7],
      fabric: stocking[8],
      color: stocking[9],
      origin: stocking[10],
      swimwear: false,
      nightwear: false,
      athletic: false,
      wear: worn,
      accessNip: access.nip,
      accessTits: access.tits,
      accessPussy: access.pussy,
      accessButt: access.butt,
      accessAss: access.ass,
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.leg.push(key);
    results.push(key);
    setup.clothesGen.countLeg += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a, fabricList);
  }
  /*const safe = function() {
    if (setup.clothesGen.countLeg < setup.clothesGen.amtLeg) {
      aw.con.warn(`Leg Generator timed out!`);
      setup.clothesGen.countLeg = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countLeg < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} stockings.`);
  return results;
};

setup.clothesGen.upperBody = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", upperBody Generator function ran with missing control variables - Passage: " + aw.passage.title;
    aw.con.warn("!upperBody Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running upperBody Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countupperBody = 0;
  setup.clothesGen.amtupperBody = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9],
    [3, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9, 10, 10, 13],
    [3, 4, 5, 6, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 13, 13, 14],
    [9, 9, 10, 10, 10, 11, 11, 12, 13, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [16, 17, 21, 21, 21, 21],
    [22, 23],
  ];
  const subsLists = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3],
    [0, 0, 0, 1, 1, 2, 2, 3, 3, 4],
    [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7],
    [4, 4, 5, 5, 6, 6, 7],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3],
    [4, 4, 5, 5, 6, 6, 7],
  ];
  const styleList = sLists[args[1]] || [1];
  const subStyleList = subsLists[args[1]] || [0];
  const a = args[4] + 2;
  const genSub = function(styleList, subStyleList, storeName, a, args) {
    let style,
      upperBody,
      access = {
        nip: false,
        pussy: true,
        butt: true,
        tits: false,
        ass: true,
      },
      fabricList,
      worn = ["normal", "off", "pulledUp"], // titsOut flippedDown halfButton unbuttoned
      colorList,
      neckRand,
      nite = false,
      athl = false,
      sleeveRand,
      necklineList,
      sleeveList,
      hemList,
      nightwear = false,
      athletic = false,
      substyleRand;
    /*upperBody array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    upperBody = [
      ["na", "na", "na", "N/A", "na", "UP"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    upperBody[6] = either(styleList);
    upperBody[7] = either(subStyleList);
    /*substyles: 0-none, 100-thin, 200-cropped, 300-sheer, 400-thin+cropped, 500-ultrasheer, 600-cropped+sheer, 700-all*/
    /*neckline: 0-jewel/collar, 10-scoop, 20-boat, 30-square, 40-V, 50-deep V, 60-sweetheart, 70-halter, 80-keyhole, 90-plunge*/
    /*sleeves: 0-sleeveless, 1-long, 2-short, 3-cap, 4-3/4, 5-half, 6-puff, 7-raglan, 8 bishop, 9-bell*/
    switch (upperBody[6]) {
      case 1:
        upperBody[0][1] = "button-down shirt";
        necklineList = [0];
        sleeveList = [1, 1, 1, 4, 4, 5, 8];
        upperBody[1] += either(1, 1, 0.5); /*attractiveness*/
        upperBody[2] += either(0, 0, 0.5); /*+sexy or -cute*/
        upperBody[3] += either(2, 3, 4); /*+formal or -casual*/
        upperBody[4] += 0; /*exposure level 0-5*/
        worn.push("titsOut");
        worn.push("halfButton");
        worn.push("unbuttoned");
        break;
      case 2:
        upperBody[0][1] = "polo shirt";
        necklineList = [0];
        sleeveList = [2];
        upperBody[1] += either(0, 0, 0.5); /*attractiveness*/
        upperBody[2] += either(-3, -2, -1, -1); /*+sexy or -cute*/
        break;
      case 3:
        upperBody[0][1] = "tunic";
        necklineList = [0, 2, 2, 4, 4, 5, 8];
        sleeveList = [2, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9, 9, 9];
        upperBody[1] += either(1, 1, 2); /*attractiveness*/
        upperBody[2] += either(-2, -1, -1, 1); /*+sexy or -cute*/
        upperBody[3] += either(-2, -1, -1); /*+formal or -casual*/
        upperBody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
        break;
      case 4:
        upperBody[0][1] = "kaftan";
        necklineList = [0, 2, 2, 4, 4, 5, 8];
        sleeveList = [2, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9, 9, 9];
        upperBody[1] += either(1, 2, 2); /*attractiveness*/
        upperBody[2] += either(-2, -2, -1, 1, 1, 2); /*+sexy or -cute*/
        upperBody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        break;
      case 5:
        upperBody[0][1] = "tee-shirt";
        necklineList = [0, 0, 1, 4, 4, 5, 5];
        sleeveList = [1, 2, 2, 3, 3, 4, 5, 7, 7];
        upperBody[1] += either(0, 1, 1, 2); /*attractiveness*/
        upperBody[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
        upperBody[3] += either(-3, -3, -4); /*+formal or -casual*/
        upperBody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        nite = true;
        break;
      case 6:
        upperBody[0][1] = "button-down blouse";
        necklineList = [1, 2, 2, 3, 4, 4, 4, 5, 5];
        sleeveList = [1, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9];
        upperBody[1] += either(1, 1, 2); /*attractiveness*/
        upperBody[2] += either(1, 1, 2); /*+sexy or -cute*/
        upperBody[3] += either(3, 3, 4); /*+formal or -casual*/
        upperBody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        worn.push("titsOut");
        worn.push("halfButton");
        worn.push("unbuttoned");
        break;
      case 7:
        upperBody[0][1] = "wrap blouse";
        necklineList = [4, 4, 4, 5, 5];
        sleeveList = [1, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9];
        upperBody[1] += either(1, 2, 2); /*attractiveness*/
        upperBody[2] += either(1, 2, 2); /*+sexy or -cute*/
        upperBody[3] += either(3, 3, 4); /*+formal or -casual*/
        upperBody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        break;
      case 8:
        upperBody[0][1] = "peasant blouse";
        necklineList = [1, 1, 2, 3, 4, 4, 5, 8, 8];
        sleeveList = [0, 2, 3, 3, 5, 6, 7, 7, 8, 9, 9];
        upperBody[1] += either(1, 1, 2); /*attractiveness*/
        upperBody[2] += either(-1, -2, -3, -3); /*+sexy or -cute*/
        upperBody[3] += either(0, -1, -2, -2, -3); /*+formal or -casual*/
        upperBody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        break;
      case 9:
        upperBody[0][1] = "wrap top";
        necklineList = [4, 4, 4, 5, 5, 7, 9];
        sleeveList = [0, 1, 2, 3, 4, 5, 7, 7, 9];
        upperBody[1] += either(2, 3, 3); /*attractiveness*/
        upperBody[2] += either(2, 2, 3); /*+sexy or -cute*/
        upperBody[3] += either(0, 1, 1, 2); /*+formal or -casual*/
        upperBody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        worn.push("titsOut");
        worn.push("unbuttoned");
        break;
      case 10:
        upperBody[0][1] = "strappy top";
        necklineList = [3, 3, 6, 7];
        sleeveList = 0;
        upperBody[1] += either(3, 4, 3.5); /*attractiveness*/
        upperBody[2] += either(-3, -2, 2, 3, 4); /*+sexy or -cute*/
        upperBody[3] += either(-3, -2, -1, 0, 0); /*+formal or -casual*/
        upperBody[4] += either(1, 1.5, 1); /*exposure level 0-5*/
        break;
      case 11:
        upperBody[0][1] = "body top";
        necklineList = [0, 1, 1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
        sleeveList = [0, 0, 0, 0, 3, 5, 2, 7];
        upperBody[1] += either(3, 4, 4); /*attractiveness*/
        upperBody[2] += either(2, 3, 4, 4); /*+sexy or -cute*/
        upperBody[3] += either(1, 1.5, 2); /*+formal or -casual*/
        break;
      case 12:
        upperBody[0][1] = "corset top";
        necklineList = [1, 1, 3, 3, 3, 4, 4, 5, 8];
        sleeveList = [0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9];
        upperBody[1] += either(3, 4, 5); /*attractiveness*/
        upperBody[2] += either(-2, 2, 3, 3, 4); /*+sexy or -cute*/
        upperBody[3] += either(-3, -2, -2, -1); /*+formal or -casual*/
        upperBody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        worn.push("titsOut");
        worn.push("unbuttoned");
        access.tits = true;
        break;
      case 13:
        upperBody[0][1] = "tube top";
        necklineList = -1;
        sleeveList = [0, 0];
        upperBody[1] += either(4, 5, 6); /*attractiveness*/
        upperBody[2] += either(3, 4, 4); /*+sexy or -cute*/
        upperBody[3] += either(-3, -3, -2); /*+formal or -casual*/
        upperBody[4] += either(1.5, 2); /*exposure level 0-5*/
        worn.push("titsOut");
        worn.push("flippedDown");
        access.tits = true;
        break;
      case 14:
        upperBody[0][1] = "bustier";
        necklineList = -1;
        sleeveList = [0, 0];
        upperBody[1] += either(6, 7, 7, 8); /*attractiveness*/
        upperBody[2] += either(4, 5, 5, 6); /*+sexy or -cute*/
        upperBody[3] += either(2, 3, 4, 4, 5); /*+formal or -casual*/
        upperBody[4] += either(1.5, 2); /*exposure level 0-5*/
        worn.push("titsOut");
        access.tits = true;
        break;
      case 15:
        upperBody[0][1] = "night shirt";
        necklineList = [0, 1, 1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
        sleeveList = [1, 1, 2, 2, 3, 3, 4, 5];
        hemList = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10];
        upperBody[1] += either(6, 7, 7, 8); /*attractiveness*/
        upperBody[2] += either(-4, -3, -2, -1, 0, 1); /*+sexy or -cute*/
        upperBody[3] += either(-6); /*+formal or -casual*/
        upperBody[4] += either(0.5, 1.5); /*exposure level 0-5*/
        worn.push("unbuttoned");
        worn.push("halfButton");
        access.tits = true;
        access.butt = true;
        access.pussy = true;
        nightwear = true;
        break;
      case 16:
        upperBody[0][1] = "bathrobe";
        necklineList = [0, 1, 1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
        sleeveList = [1, 1, 1, 1, 2, 3, 4, 5];
        hemList = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10];
        upperBody[1] += either(4, 5, 5, 6); /*attractiveness*/
        upperBody[2] += either(-3, -2, -2, -1, -1, 0, 1, 2, 3); /*+sexy or -cute*/
        upperBody[3] += either(-6); /*+formal or -casual*/
        upperBody[4] += either(0, 1); /*exposure level 0-5*/
        worn.push("titsOut");
        access.tits = true;
        access.butt = true;
        access.pussy = true;
        nightwear = true;
        break;
      case 17:
        upperBody[0][1] = "night dress";
        necklineList = [0, 1, 1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
        sleeveList = [0, 0, 0, 0, 3, 5, 2, 7];
        hemList = [5, 6, 7, 8, 8, 9, 9, 9, 10];
        upperBody[1] += either(6, 7, 7, 8); /*attractiveness*/
        upperBody[2] += either(-3, -2, -2, -1, -1, 0, 1, 2, 3); /*+sexy or -cute*/
        upperBody[3] += either(-6); /*+formal or -casual*/
        upperBody[4] += either(0, 1, 1, 2, 2.5); /*exposure level 0-5*/
        worn.push("titsOut");
        access.tits = true;
        access.butt = true;
        access.pussy = true;
        nightwear = true;
        break;
      case 18:
        upperBody[0][1] = "jumpsuit";
        necklineList = -1;
        sleeveList = [0, 0, 0, 0, 3, 5, 2, 7];
        upperBody[1] += either(3, 4, 4, 5); /*attractiveness*/
        upperBody[2] += either(-3, -2, -2, -1, -1, 0, 1); /*+sexy or -cute*/
        upperBody[3] += either(-6); /*+formal or -casual*/
        upperBody[4] += either(1, 2, 2, 2, 2.5); /*exposure level 0-5*/
        access.tits = true;
        nightwear = true;
        break;
      case 19:
        upperBody[0][1] = "nightgown";
        necklineList = [0, 1, 1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
        sleeveList = [0, 0, 0, 0, 3, 5, 2, 7];
        hemList = [1, 1, 1, 2, 2, 3, 3, 4, 4];
        upperBody[1] += either(-2, -1, 0, 1, 2); /*attractiveness*/
        upperBody[2] += either(-5, -4, -3, -3, -2, -1, -1); /*+sexy or -cute*/
        upperBody[3] += either(-6); /*+formal or -casual*/
        upperBody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        worn.push("titsOut");
        access.tits = true;
        nightwear = true;
        break;
      case 20:
        upperBody[0][1] = "pyjama top";
        necklineList = [0, 1, 1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
        sleeveList = [0, 0, 0, 0, 3, 5, 2, 7];
        upperBody[1] += either(3, 4, 4, 5); /*attractiveness*/
        upperBody[2] += either(-3, -2, -2, -1, -1, 0, 1); /*+sexy or -cute*/
        upperBody[3] += either(-6); /*+formal or -casual*/
        upperBody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
        worn.push("titsOut");
        worn.push("unbuttoned");
        worn.push("halfButton");
        access.tits = true;
        nightwear = true;
        break;
      case 21:
        upperBody[0][1] = "babydoll";
        necklineList = -1;
        sleeveList = [0];
        hemList = [5, 6, 7, 8, 8, 9, 9, 10, 10];
        upperBody[1] += either(3, 4, 5, 6, 7); /*attractiveness*/
        upperBody[2] += either(3, 2, 2, 1, 1); /*+sexy or -cute*/
        upperBody[3] += either(-6); /*+formal or -casual*/
        upperBody[4] += either(1, 2.5, 3); /*exposure level 0-5*/
        access.tits = true;
        access.butt = true;
        access.pussy = true;
        nightwear = true;
        break;
      case 22:
        upperBody[0][1] = "tank top";
        necklineList = -1;
        sleeveList = [0];
        upperBody[1] += either(-1, 0, 0, 1, 2, 2, 3, 4); /*attractiveness*/
        upperBody[2] += either(2, 2, 1, 1, 0); /*+sexy or -cute*/
        upperBody[3] += either(-6, -5, -5, -4); /*+formal or -casual*/
        upperBody[4] += either(1, 1, 2); /*exposure level 0-5*/
        access.butt = true;
        access.pussy = true;
        athl = true;
        worn.push("titsOut");
        break;
      case 23:
        upperBody[0][1] = "pinnie";
        necklineList = -1;
        sleeveList = [0];
        upperBody[1] += either(-3, -2, -2, -1, 0, 0, 1, 2); /*attractiveness*/
        upperBody[2] += either(-2, -2, -1, -1, 0); /*+sexy or -cute*/
        upperBody[3] += either(-6, -5, -5, -4); /*+formal or -casual*/
        upperBody[4] += either(0, 0, 1); /*exposure level 0-5*/
        access.butt = true;
        access.pussy = true;
        athl = true;
        worn.push("titsOut");
        break;
      default:
        style = "bad arg to upperBodyStyle";
    }

    substyleRand = either(subStyleList);
    if (upperBody[6] === 13 || upperBody[6] === 14) {
      upperBody[7] = substyleRand * 100;
      neckRand = -1;
      sleeveRand = 0;
    } else {
      neckRand = either(necklineList);
      if (neckRand === 7 || upperBody[6] === 10) {
        sleeveRand = 0;
      } else {
        sleeveRand = either(sleeveList);
      }
      upperBody[7] = substyleRand;
    }
    switch (substyleRand) {
      case 0:
        upperBody[0][2] = "regular";
        upperBody[1] += either(0, 0, 1); /*attractiveness*/
        break;
      case 1:
        upperBody[0][2] = "thin";
        upperBody[1] += either(1, 2, 2, 3); /*attractiveness*/
        upperBody[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        upperBody[4] += either(0.5, 0, 0.5); /*exposure level 0-5*/
        break;
      case 2:
        upperBody[0][2] = "cropped";
        upperBody[1] += either(1, 1, 2); /*attractiveness*/
        upperBody[2] += either(2, 2, 3); /*+sexy or -cute*/
        upperBody[3] += either(-1, -2, -2); /*+formal or -casual*/
        break;
      case 3:
        upperBody[0][2] = "sheer";
        upperBody[1] += either(2, 3, 3); /*attractiveness*/
        upperBody[2] += either(2, 3, 3); /*+sexy or -cute*/
        upperBody[3] += either(1, 1, 2); /*+formal or -casual*/
        upperBody[4] += either(2, 1, 2); /*exposure level 0-5*/
        break;
      case 4:
        upperBody[0][2] = "cropped thin";
        upperBody[1] += either(2, 3, 3); /*attractiveness*/
        upperBody[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        upperBody[3] += either(-1, -2); /*+formal or -casual*/
        upperBody[4] += either(0.5, 0, 0.5); /*exposure level 0-5*/
        break;
      case 5:
        upperBody[0][2] = "ultrasheer";
        upperBody[1] += either(3, 4, 5, 5); /*attractiveness*/
        upperBody[2] += either(4, 5, 5); /*+sexy or -cute*/
        upperBody[3] += either(2, 2, 3); /*+formal or -casual*/
        upperBody[4] += either(3.5, 3, 4); /*exposure level 0-5*/
        break;
      case 6:
        upperBody[0][2] = "cropped sheer";
        upperBody[1] += either(2, 3, 3); /*attractiveness*/
        upperBody[2] += either(4, 4, 5); /*+sexy or -cute*/
        upperBody[3] += either(-1, -2); /*+formal or -casual*/
        upperBody[4] += either(2, 1, 2); /*exposure level 0-5*/
        break;
      case 7:
        upperBody[0][2] = "cropped ultrasheer";
        upperBody[1] += either(5, 5, 65, 5, 6); /*attractiveness*/
        upperBody[2] += either(5, 5, 6); /*+sexy or -cute*/
        upperBody[3] += either(1, 2, 2); /*+formal or -casual*/
        upperBody[4] += either(3.5, 3, 4); /*exposure level 0-5*/
        break;
    }
    switch (neckRand) {
      case -1:
        upperBody[0][3] = "neckless";
        upperBody[1] += either(1, 2); /*attractiveness*/
        upperBody[2] += either(2, 2, 3); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 0:
        upperBody[0][3] = "jewel-neck";
        upperBody[1] += either(0, -1, -1); /*attractiveness*/
        upperBody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        break;
      case 1:
        upperBody[0][3] = "scoop-neck";
        upperBody[1] += either(2, 2, 3); /*attractiveness*/
        upperBody[2] += either(1, 1, 2); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 2:
        upperBody[0][3] = "boat-neck";
        upperBody[1] += either(-1, 0, 0, 1, 1); /*attractiveness*/
        upperBody[3] += either(2, 2, 3); /*+formal or -casual*/
        break;
      case 3:
        upperBody[0][3] = "square-neck";
        upperBody[1] += either(2, 3, 3); /*attractiveness*/
        upperBody[2] += either(1, 2, 2); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 4:
        upperBody[0][3] = "V-neck";
        upperBody[1] += either(0, 1, 1); /*attractiveness*/
        break;
      case 5:
        upperBody[0][3] = "deep-V-neck";
        upperBody[1] += either(2, 3, 3); /*attractiveness*/
        upperBody[2] += either(2, 3, 3); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 6:
        upperBody[0][3] = "sweetheart-neck";
        upperBody[1] += either(3, 4, 3); /*attractiveness*/
        upperBody[2] += either(3, 3, 4); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 7:
        upperBody[0][3] = "halter-neckline";
        upperBody[1] += either(1, 2, 2); /*attractiveness*/
        upperBody[2] += either(1, 1, 2); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 8:
        upperBody[0][3] = "keyhole-neck";
        upperBody[1] += either(0, 1, 1); /*attractiveness*/
        upperBody[2] += either(-1, 1, 2); /*+sexy or -cute*/
        break;
      case 9:
        upperBody[0][3] = "plunge-neck";
        upperBody[1] += either(4, 4, 5); /*attractiveness*/
        upperBody[2] += either(3, 4, 4); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
    }
    switch (sleeveRand) {
      case 0:
        upperBody[0][3] += ", sleeveless";
        upperBody[1] += either(0, 1, 1); /*attractiveness*/
        upperBody[1] += either(-1, 0); /*attractiveness*/
        break;
      case 1:
        upperBody[0][3] += ", long sleeves";
        upperBody[1] += either(-0.5, -1, 0); /*attractiveness*/
        upperBody[3] += either(1, 2, 2); /*+formal or -casual*/
        break;
      case 2:
        upperBody[0][3] += ", short sleeves";
        upperBody[1] += either(0, 0, 0.5); /*attractiveness*/
        upperBody[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 3:
        upperBody[0][3] += ", cap sleeves";
        upperBody[1] += either(0, 1, 1); /*attractiveness*/
        upperBody[3] += either(0, 1, 2); /*+formal or -casual*/
        break;
      case 4:
        upperBody[0][3] += ", three-quarter sleeves";
        upperBody[1] += either(0, 1, 0.5, -0.5); /*attractiveness*/
        upperBody[3] += either(0, 1); /*+formal or -casual*/
        break;
      case 5:
        upperBody[0][3] += ", half sleeves";
        upperBody[1] += either(0, 0, 0.5); /*attractiveness*/
        upperBody[3] += either(1, 1, 0); /*+formal or -casual*/
        break;
      case 6:
        upperBody[0][3] += ", puff sleeves";
        upperBody[1] += either(0, 1, 1); /*attractiveness*/
        upperBody[3] += either(1, 1, 2); /*+formal or -casual*/
        break;
      case 7:
        upperBody[0][3] += ", raglan sleeves";
        upperBody[1] += either(1, 1, 2); /*attractiveness*/
        upperBody[3] += either(0, 1, 2); /*+formal or -casual*/
        break;
      case 8:
        upperBody[0][3] += ", bishop sleeves";
        upperBody[1] += either(-0.5, 0, 0, 1); /*attractiveness*/
        upperBody[3] += either(2, 3, 3, 4); /*+formal or -casual*/
        break;
      case 9:
        upperBody[0][3] += ", bell sleeves";
        upperBody[1] += either(0, 1, 1); /*attractiveness*/
        upperBody[3] += either(-1, 0); /*+formal or -casual*/
        break;
    }

    const hemRand = either(hemList);
    switch (hemRand) {
      case 0:
      upperBody[0][3] += "ankle hem";
      break;
      case 1:
      upperBody[0][3] += "midi hem";
      break;
      case 2:
      upperBody[0][3] += "calf hem";
      break;
      case 3:
      upperBody[0][3] += "above calf hem";
      break;
      case 4:
      upperBody[0][3] += "knee hem";
      break;
      case 5:
      upperBody[0][3] += "above knee hem";
      break;
      case 6:
      upperBody[0][3] += "mid thigh hem";
      break;
      case 7:
      upperBody[0][3] += "upper thigh hem";
      break;
      case 8:
      upperBody[0][3] += "above thigh hem";
      break;
      case 9:
      upperBody[0][3] += "groin hem";
      break;
      case 10:
      upperBody[0][3] += "above groin hem";
      break;
      default:
        break;
    }

    if (args[2] === 0) {
      fabricList = [0, 1, 2, 3, 4, 5, 6];
    } else if (args[2] === 1) {
      fabricList = [0, 0, 1, 1, 2, 3, 3, 4];
    } else if (args[2] === 2) {
      fabricList = [4, 4, 5, 5, 6, 7, 8];
    } else if (args[2] === 3) {
      fabricList = [0, 1, 2, 3, 4, 5, 6, 7 ];
    } else {
      fabricList = [6, 6, 7, 7, 8, 9];
    }
    if (upperBody[6] === 2 || upperBody[6] === 5) {
      fabricList = [0, 1, 3];
    }
    upperBody[8] = either(fabricList);
    switch (upperBody[8]) {
      case 0:
        upperBody[0][4] = "cotton";
        upperBody[1] += either(-1, -0.5, -0.5, 0); /*attractiveness*/
        upperBody[3] += either(-1, -1, -2); /*+formal or -casual*/
        break;
      case 1:
        upperBody[0][4] = "cotton blend";
        upperBody[1] += either(-1, -0.5, 0, 0); /*attractiveness*/
        upperBody[3] += either(-1, 0, 0); /*+formal or -casual*/
        break;
      case 2:
        upperBody[0][4] = "lycra";
        upperBody[1] += either(-1, 0, 1, 1); /*attractiveness*/
        upperBody[3] += either(-1, -1, -2); /*+formal or -casual*/
        break;
      case 3:
        upperBody[0][4] = "cotton-knit";
        upperBody[2] += either(0, 0, -1); /*+sexy or -cute*/
        upperBody[3] += either(-1, 0); /*+formal or -casual*/
        upperBody[4] += either(-1, -0.5, -0.5, -1); /*exposure level 0-5*/
        break;
      case 4:
        upperBody[0][4] = "nylon";
        upperBody[1] += either(1, 1, 2); /*attractiveness*/
        upperBody[2] += either(1, 1, 2); /*+sexy or -cute*/
        upperBody[3] += either(1, 1, 2); /*+formal or -casual*/
        upperBody[4] += either(1, 0.5, 0.5, 1.5); /*exposure level 0-5*/
        break;
      case 5:
        upperBody[0][4] = "silk";
        upperBody[1] += either(2, 2, 3); /*attractiveness*/
        upperBody[2] += either(2, 2, 3); /*+sexy or -cute*/
        upperBody[3] += either(2, 3, 3); /*+formal or -casual*/
        upperBody[4] += either(0.5, 1.5, 1.5, 1); /*exposure level 0-5*/
        break;
      case 6:
        upperBody[0][4] = "nylon organza";
        upperBody[1] += either(3, 4, 4); /*attractiveness*/
        upperBody[2] += either(4, 4, 5); /*+sexy or -cute*/
        upperBody[3] += either(2, 3, 3); /*+formal or -casual*/
        upperBody[4] += either(2, 2.5, 3); /*exposure level 0-5*/
        break;
      case 7:
        upperBody[0][4] = "chifon";
        upperBody[1] += either(4, 5, 5); /*attractiveness*/
        upperBody[2] += either(4, 5, 5); /*+sexy or -cute*/
        upperBody[3] += either(3, 3, 4); /*+formal or -casual*/
        upperBody[4] += either(2, 3, 3.5); /*exposure level 0-5*/
        break;
      case 8:
        upperBody[0][4] = "leather";
        upperBody[1] += either(2, 3, 3, 4); /*attractiveness*/
        upperBody[2] += either(3, 4, 4); /*+sexy or -cute*/
        upperBody[3] += either(-2, -3, -3); /*+formal or -casual*/
        upperBody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        break;
      case 9:
        upperBody[0][4] = "translucent-latex";
        upperBody[1] += either(4, 4, 5); /*attractiveness*/
        upperBody[2] += either(4, 5, 6); /*+sexy or -cute*/
        upperBody[4] += either(3, 3, 3.5); /*exposure level 0-5*/
        break;
    }
    colorList = [1, 2, 8, 9, 10, 11, 12, 13, 14];
    if (args[2] === 4) {
      colorList = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 9];
    }
    upperBody[9] = either(colorList);
    upperBody[10] = args[5];
    switch (upperBody[9]) {
      case 1:
        upperBody[0][0] = "white";
        if (upperBody[2] > 0) {
          upperBody[2] += either(1, 2);
        } else {
          upperBody[2] += either(-3, -2, -2, -1);
        }
        upperBody[3] += either(1, 2, 1);
        break;
      case 2:
        upperBody[0][0] = "pink";
        if (upperBody[2] < 0) {
          upperBody[2] += either(-3, -2, -1);
        }
        upperBody[3] += either(-1, -1, 0, 1);
        break;
      case 8:
        upperBody[0][0] = "black";
        if (upperBody[2] > 0) {
          upperBody[2] += either(2, 2, 3, 4);
        }
        upperBody[3] += either(2, 2, 3);
        break;
      case 9:
        upperBody[0][0] = "red";
        if (upperBody[2] > 0) {
          upperBody[2] += either(2, 2, 3, 4);
        }
        upperBody[3] += either(2, 2, 3);
        break;
      case 10:
        upperBody[0][0] = "blue";
        if (upperBody[2] < 0) {
          upperBody[2] += either(1, 2, 2);
        }
        upperBody[3] += either(1, 2, 0);
        break;
      case 11:
        upperBody[0][0] = "green";
        if (upperBody[2] < 0) {
          upperBody[2] += either(1, 1, 2);
        }
        upperBody[3] += either(1, 2, 0);
        break;
      case 12:
        upperBody[0][0] = "purple";
        if (upperBody[2] < 0) {
          upperBody[2] += either(1, -1, 0);
        }
        upperBody[3] += either(-1, -1, 0);
        break;
      case 13:
        upperBody[0][0] = "brown";
        upperBody[1] += either(0, 0, 1);
        upperBody[3] += either(0, 1, 1);
        break;
      case 14:
        upperBody[0][0] = "yellow";
        if (upperBody[2] < 0) {
          upperBody[2] += either(0, 1, 0);
        }
        upperBody[3] += either(-1, 1, 0);
        break;
    }
    upperBody[4] = Math.max(0, Math.min(50, Math.floor(upperBody[4] * 10)));
    upperBody[1] = Math.round(upperBody[1]);
    upperBody[2] = upperBody[2] > 0 ? Math.floor(upperBody[2]) : Math.ceil(upperBody[2]);
    upperBody[3] = upperBody[3] > 0 ? Math.floor(upperBody[3]) : Math.ceil(upperBody[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.75, 1, 1.25, 1.5, 1.75];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.2, 1.4];
    if (upperBody[1] < 0) {
      upperBody[1] = Math.max(-6, Math.round(upperBody[1] * atrNeg[a]));
    } else {
      upperBody[1] = Math.round(upperBody[1] * atr[a] + random(aw.base.clothingAtrMod.top[0], aw.base.clothingAtrMod.top[1]));
    }
    upperBody[4] = Math.min(expCap[a], upperBody[4]);
    upperBody[2] = Math.round(upperBody[2] * sexy[a]);

    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();
    if (upperBody[1] > 0) {
      upperBody[1] = Math.round(upperBody[1] * 0.55);
    }
    const atrCap = [8, 12, 16, 18, 20];
    if (upperBody[1] > atrCap[a]) {
      upperBody[1] = atrCap[a];
    }

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type: "top",
      slot: "top",
      colorWord: upperBody[0][0],
      styleWord: upperBody[0][1],
      subStyleWord: upperBody[0][2],
      tertiaryWord: upperBody[0][3],
      fabricWord: upperBody[0][4],
      flag: {neck: neckRand, sleeve: sleeveRand},
      atr: upperBody[1],
      sexy: upperBody[2],
      formal: upperBody[3],
      exposure: upperBody[4],
      style: upperBody[6],
      subStyle: upperBody[7],
      fabric: upperBody[8],
      color: upperBody[9],
      origin: upperBody[10],
      swimwear: false,
      nightwear: nite,
      athletic: athl,
      wear: worn,
      accessNip: access.nip,
      accessTits: access.tits,
      accessPussy: access.pussy,
      accessButt: access.butt,
      accessAss: access.ass,
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.top.push(key);
    results.push(key);
    setup.clothesGen.countUpBody += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, subStyleList, args[5], a, args);
  }
  /*const safe = function() {
    if (setup.clothesGen.countUpBody < setup.clothesGen.amtUpBody) {
      aw.con.warn(`Bra Generator timed out!`);
      setup.clothesGen.countUpBody = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countUpBody < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} tops.`);
  return results;
};

setup.clothesGen.coat = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", overwear Generator function ran with missing control variables - Passage: "
    + aw.passage.title;
    aw.con.warn("!overwear Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running OverWear Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countOverWear = 0;
  setup.clothesGen.amtOverWear = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 11, 12, 12],
  ];
  const styleList = sLists[args[1]] || [1];
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a) {
    let style,
      access = {
        nip: false,
        pussy: false,
        butt: false,
        tits: false,
        ass: false,
      },
      worn = ["normal", "off", "unbuttoned", "halfButton"],
      overwear,
      fabricList,
      colorList;
    /*overwear array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    overwear = [
      ["na", "na", "na", "na", "na", "OW"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    overwear[6] = either(styleList);
    /*substyles: 0-none, 1-lace border, 2-lace waist, 3-lace covered, 4-low back, 5-V back, 6-low front, 7-V front, 8-open paneled*/
    switch (overwear[6]) {
      case 1:
        overwear[0][1] = "classic trench";
        fabricList = [7, 7, 8];
        colorList = [1, 8, 8, 13, 13, 13, 15, 15, 15, 16, 17, 17, 20, 21];
        overwear[1] += either(0, 1, 1, 2); /*attractiveness*/
        overwear[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
        overwear[3] += either(0, 1, 1); /*+formal or -casual*/
        break;
      case 2:
        overwear[0][1] = "denim jacket";
        fabricList = [0];
        colorList = [1, 8, 16, 16, 21, 20];
        overwear[1] += either(-2, -1, -2); /*attractiveness*/
        overwear[2] += either(-2, -1, -1); /*+sexy or -cute*/
        overwear[3] += either(-4, -3, -3); /*+formal or -casual*/
        break;
      case 3:
        overwear[0][1] = "overcoat";
        fabricList = [1, 1, 2, 3, 3, 3, 7];
        colorList = [1, 1, 13, 15, 15, 16, 17, 17, 18, 8, 19, 20, 20, 21];
        overwear[1] += either(1, 2, 2); /*attractiveness*/
        overwear[2] += either(-2, -2, 1, 2); /*+sexy or -cute*/
        overwear[3] += either(2, 3, 3); /*+formal or -casual*/
        break;
      case 4:
        overwear[0][1] = "evening coat";
        fabricList = [1, 1, 2, 2, 3];
        colorList = [1, 8, 8, 13, 16, 16, 18, 18, 19, 19, 20, 21, 21];
        overwear[1] += either(2, 2, 3); /*attractiveness*/
        overwear[2] += either(1, 2, 2); /*+sexy or -cute*/
        overwear[3] += either(3, 4, 4); /*+formal or -casual*/
        break;
      case 5:
        overwear[0][1] = "raincoat";
        fabricList = [4, 4, 4, 7, 7, 8];
        colorList = [1, 8, 13, 15, 16, 17, 18, 19, 20, 21];
        overwear[1] += either(0, -1); /*attractiveness*/
        overwear[2] += either(-2, -1, -1, 0, 0, 0); /*+sexy or -cute*/
        overwear[3] += either(-3, -3, -2); /*+formal or -casual*/
        break;
      case 6:
        overwear[0][1] = "leather jacket";
        fabricList = [6, 6, 2];
        colorList = [];
        overwear[1] += either(-2, -2, -1, 0, 1, 2, 3); /*attractiveness*/
        overwear[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        overwear[3] += either(-2, -1, -1, 0); /*+formal or -casual*/
        break;
      case 7:
        overwear[0][1] = "peacoat";
        fabricList = [1, 1, 2, 3, 3];
        colorList = [1, 1, 8, 13, 15, 15, 16, 17, 17, 18, 19, 20, 20, 21];
        overwear[1] += either(1, 2, 2); /*attractiveness*/
        overwear[2] += either(-2, -2, 1, 2); /*+sexy or -cute*/
        overwear[3] += either(3, 3, 4); /*+formal or -casual*/
        break;
      case 8:
        overwear[0][1] = "windbreaker";
        fabricList = [4, 4, 5, 5, 7, 8];
        colorList = [1, 8, 13, 15, 16, 17, 18, 19, 20, 21];
        overwear[1] += either(-1, -1, 0, 1, 1); /*attractiveness*/
        overwear[2] += either(-2, -1, 0, 0, 0, 0); /*+sexy or -cute*/
        overwear[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 9:
        overwear[0][1] = "pullover";
        fabricList = [6, 6, 5, 1, 3];
        colorList = [8, 13, 15, 16, 17, 18, 19, 20, 21];
        overwear[1] += either(1, 1, 2); /*attractiveness*/
        overwear[2] += either(-2, -2, -1, 1, 2); /*+sexy or -cute*/
        overwear[3] += either(-1, 0, 1); /*+formal or -casual*/
        worn.delete("unbuttoned");
        worn.delete("halfButton");
        break;
      case 10:
        overwear[0][1] = "cardigan";
        fabricList = [1, 3, 6, 6, 6];
        colorList = [1, 8, 8, 13, 13, 13, 15, 15, 16, 16, 16, 17, 18, 18, 19, 19, 20, 21];
        overwear[1] += either(2, 2, 3); /*attractiveness*/
        overwear[2] += either(-2, -1, 1, 2, 2); /*+sexy or -cute*/
        overwear[3] += either(1, 2, 3); /*+formal or -casual*/
        break;
      case 11:
        overwear[0][1] = "turtleneck";
        fabricList = [6, 6, 7, 3];
        colorList = [1, 8, 8, 13, 13, 13, 15, 15, 16, 16, 16, 17, 18, 18, 19, 19, 20, 21];
        overwear[1] += either(0, 1, 2); /*attractiveness*/
        overwear[2] += either(-1, 0, 1); /*+sexy or -cute*/
        overwear[3] += either(1, 2, 3); /*+formal or -casual*/
        worn.delete("unbuttoned");
        worn.delete("halfButton");
        break;
      case 12:
        overwear[0][1] = "hoodie";
        fabricList = [7, 7, 5];
        colorList = [1, 8, 13, 15, 16, 17, 18, 19, 20, 21];
        overwear[1] += either(-2, -1, 0, 0); /*attractiveness*/
        overwear[2] += either(-2, -1, -1, 0, 0, 0, 0); /*+sexy or -cute*/
        overwear[3] += either(-4, 3, 3); /*+formal or -casual*/
        worn.delete("unbuttoned");
        worn.delete("halfButton");
        break;
      default:
        style = "bad arg to overwearStyle";
    }
    if (args[2] === 4) {
      colorList = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 9];
    }
    overwear[8] = either(fabricList);
    switch (overwear[8]) {
      case 0:
        overwear[0][4] = 0;
        break;
      case 1:
        overwear[0][4] = "wool";
        overwear[1] += either(0, 1); /*attractiveness*/
        overwear[3] += either(0, 1); /*+sexy or -cute*/
        break;
      case 2:
        overwear[0][4] = "tweed";
        overwear[1] += either(0, 1, 1); /*attractiveness*/
        overwear[3] += either(1, 1, 2); /*+formal or -casual*/
        break;
      case 3:
        overwear[0][4] = "wool/poly blend";
        overwear[1] += either(0, 1); /*attractiveness*/
        overwear[3] += either(0, 0, 1); /*+formal or -casual*/
        break;
      case 4:
        overwear[0][4] = "nylon";
        overwear[1] += either(-1, -1, 0); /*attractiveness*/
        overwear[3] += either(-2, -2, -1); /*+formal or -casual*/
        break;
      case 5:
        overwear[0][4] = "fleece";
        overwear[2] += either(-1, 0); /*attractiveness*/
        overwear[3] += either(-2, -1, -1); /*+formal or -casual*/
        break;
      case 6:
        overwear[0][4] = "sweater";
        overwear[1] += either(-1, 0, 0, 1); /*attractiveness*/
        overwear[3] += either(0, 1, 1); /*+formal or -casual*/
        break;
      case 7:
        overwear[0][4] = "cotton/poly blend";
        overwear[1] += either(-1, 0, 0, 0, 1); /*attractiveness*/
        overwear[3] += either(-1, 0, 0, 1, 1); /*+formal or -casual*/
        break;
      case 8:
        overwear[0][4] = "cotton";
        overwear[1] += either(-1, 0, 0, 0, 1); /*attractiveness*/
        overwear[3] += either(-1, 0, 0, 1, 1); /*+formal or -casual*/
        break;
    }
    /*color: 0-flesh, 1-white, 2-pink, 3 blue, 4-green, 6-purple, 7-black, 8-red */
    /*pattern: A-none, B-striped, C-checked, D-flower print ????? */
    overwear[9] = either(colorList);
    switch (overwear[9]) {
      case 1:
        overwear[0][0] = "white";
        break;
      case 8:
        overwear[0][0] = "black";
        break;
      case 13:
        overwear[0][0] = "brown";
        break;
      case 15:
        overwear[0][0] = "tan";
        break;
      case 16:
        overwear[0][0] = "navy blue";
        break;
      case 17:
        overwear[0][0] = "khaki";
        break;
      case 18:
        overwear[0][0] = "dark green";
        break;
      case 19:
        overwear[0][0] = "burgundy";
        break;
      case 20:
        overwear[0][0] = "light grey";
        break;
      case 21:
        overwear[0][0] = "dark grey";
        break;
    }
    overwear[4] = Math.max(0, Math.min(50, Math.floor(overwear[4] * 10)));
    overwear[1] = Math.round(overwear[1]);
    overwear[2] = overwear[2] > 0 ? Math.floor(overwear[2]) : Math.ceil(overwear[2]);
    overwear[3] = overwear[3] > 0 ? Math.floor(overwear[3]) : Math.ceil(overwear[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.75, 1, 1.25, 1.5, 1.75];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.2, 1.4];
    if (overwear[1] < 0) {
      overwear[1] = Math.max(-6, Math.round(overwear[1] * atrNeg[a]));
    } else {
      overwear[1] = Math.round(overwear[1] * atr[a] + random(aw.base.clothingAtrMod.coat[0], aw.base.clothingAtrMod.coat[1]));
    }
    overwear[4] = Math.min(expCap[a], overwear[4]);
    overwear[2] = Math.round(overwear[2] * sexy[a]);
    const atrCap = [8, 12, 16, 18, 20];
    if (overwear[1] > atrCap[a]) {
      overwear[1] = atrCap[a];
    }

    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type: "coat",
      slot: "coat",
      colorWord: overwear[0][0],
      styleWord: overwear[0][1],
      subStyleWord: overwear[0][2],
      tertiaryWord: overwear[0][3],
      fabricWord: overwear[0][4],
      atr: overwear[1],
      sexy: overwear[2],
      formal: overwear[3],
      exposure: overwear[4],
      style: overwear[6],
      subStyle: overwear[7],
      fabric: overwear[8],
      color: overwear[9],
      origin: overwear[10],
      swimwear: false,
      nightwear: false,
      athletic: false,
      wear: worn,
      accessNip: access.nip,
      accessTits: access.tits,
      accessPussy: access.pussy,
      accessButt: access.butt,
      accessAss: access.ass,
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.coat.push(key);
    results.push(key);
    setup.clothesGen.countOverWear += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a);
  }
  /*const safe = function() {
    if (setup.clothesGen.countOverWear < setup.clothesGen.amtOverWear) {
      aw.con.warn(`Bra Generator timed out!`);
      setup.clothesGen.countOverWear = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countOverWear < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} coats.`);
  return results;
};

setup.clothesGen.dress = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", dress Generator function ran with missing control variables - Passage: " + aw.passage.title;
    aw.con.warn("!dress Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running Dress Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countDress = 0;
  setup.clothesGen.amtDress = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9, 10, 10],
    [1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 10, 11],
    [2, 3, 3, 5, 5, 5, 7, 11, 11],
  ];
  const subsLists = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 0, 0, 1, 1, 2, 2, 3, 3, 4],
    [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7],
    [4, 4, 5, 5, 6, 6, 7],
  ];
  const styleList = sLists[args[1]] || [1];
  const subStyleList = subsLists[args[1]] || [0];
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a, args) {
    let style,
      access = {
        nip: false,
        pussy: false,
        butt: false,
        tits: false,
        ass: false,
      },
      worn = ["normal", "off", "pulledUp"], // titsOut
      hemList,
      dress,
      fabricList,
      colorList,
      necklineList,
      neckRand,
      substyleRand;
    /*dress array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    dress = [
      ["na", "na", "na", "na", "na", "DR"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    dress[6] = either(styleList);
    dress[7] = either(subStyleList);
    /*substyles: 0-none, 10-thin, 20-cropped, 30-sheer, 40-thin+cropped, 50-ultrasheer, 60-cropped+sheer, 70-all*/
    /*neckline: 0-jewel, 1-scoop, 2-boat, 3-square, 4-V, 5-deep V, 6-sweetheart, 7-halter, 8-keyhole, 9-plunge*/
    switch (dress[6]) {
      case 1:
        dress[0][1] = "A-line dress";
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hemList = [0, 0, 1, 1, 2];
        dress[1] += either(1, 2, 2, 3); /*attractiveness*/
        dress[2] += either(-2, -1, -1, 1, 1); /*+sexy or -cute*/
        dress[3] += either(-1, 0, 0, 1, 2, 3); /*+formal or -casual*/
        break;
      case 2:
        dress[0][1] = "shift dress";
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hemList = [3, 4, 4, 5, 5];
        dress[1] += either(2, 2, 3); /*attractiveness*/
        dress[2] += either(-1, -1, 0, 1, 2, 2, 3); /*+sexy or -cute*/
        dress[3] += either(0, 0, 1, 2, 3); /*+formal or -casual*/
        break;
      case 3:
        dress[0][1] = "sheath dress";
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hemList = [4, 5, 5, 6];
        dress[1] += either(3, 3, 4); /*attractiveness*/
        dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
        dress[3] += either(0, 1, 2, 3); /*+formal or -casual*/
        dress[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        break;
      case 4:
        dress[0][1] = "empire dress";
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hemList = [0, 0, 0, 1];
        dress[1] += either(2, 3, 4); /*attractiveness*/
        dress[2] += either(-2, -2, 2, 2, 3); /*+sexy or -cute*/
        dress[3] += either(3, 4, 4, 5); /*+formal or -casual*/
        break;
      case 5:
        dress[0][1] = "BodyCon dress";
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hemList = [4, 5, 5, 6, 6, 7];
        dress[1] += either(4, 4, 5); /*attractiveness*/
        dress[2] += either(4, 4, 5); /*+sexy or -cute*/
        dress[3] += either(2, 3, 3, 4); /*+formal or -casual*/
        dress[4] += either(1, 0, 0.5); /*exposure level 0-5*/
        break;
      case 6:
        dress[0][1] = "princess dress";
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hemList = [0, 0, 0, 1];
        dress[1] += either(3, 3, 4); /*attractiveness*/
        dress[2] += either(-3, -2, -2, -1, 1, 2); /*+sexy or -cute*/
        dress[3] += either(4, 4, 5); /*+formal or -casual*/
        break;
      case 7:
        dress[0][1] = "maxi dress";
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        hemList = [1, 2, 2, 3, 3, 4];
        dress[1] += either(2, 3, 4); /*attractiveness*/
        dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
        dress[3] += either(2, 3, 3); /*+formal or -casual*/
        break;
      case 8:
        dress[0][1] = "mermaid dress";
        hemList = [0, 0, 0, 1];
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        dress[1] += either(2, 3, 3); /*attractiveness*/
        dress[2] += either(-2, -1, -1, 1, 1); /*+sexy or -cute*/
        dress[3] += either(5, 5, 6); /*+formal or -casual*/
        break;
      case 9:
        dress[0][1] = "trumpet dress";
        hemList = [0, 0, 1, 1, 2, 3];
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        dress[1] += either(2, 3, 3); /*attractiveness*/
        dress[2] += either(-1, 1, 2, 2); /*+sexy or -cute*/
        dress[3] += either(4, 5, 6); /*+formal or -casual*/
        break;
      case 10:
        dress[0][1] = "blouson dress";
        hemList = [0, 0, 1, 1, 2, 3];
        necklineList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        dress[1] += either(2, 2, 3); /*attractiveness*/
        dress[2] += either(-2, -1, 0, 1, 1, 2, 2); /*+sexy or -cute*/
        dress[3] += either(-2, -1, 0, 1, 2); /*+formal or -casual*/
        break;
      case 11:
        dress[0][1] = "basque dress";
        hemList = [0, 0, 0, 1, 1];
        necklineList = [1, 3, 4, 5, 6, 7, 8, 9];
        dress[1] += either(4, 5, 5); /*attractiveness*/
        dress[2] += either(2, 3, 4, 5); /*+sexy or -cute*/
        dress[3] += either(4, 5, 6); /*+formal or -casual*/
        dress[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        break;
      default:
        style = "bad arg to dressStyle";
    }
    substyleRand = either(subStyleList);
    neckRand = either(necklineList);
    const hemRand = either(hemList);
    dress[7] = (substyleRand * 10) + neckRand;
    switch (substyleRand) {
      case 0:
        dress[0][2] = "regular";
        dress[1] += either(0, 0, 1); /*attractiveness*/
        break;
      case 1:
        dress[0][2] = "thin";
        dress[1] += either(2, 3, 3, 4); /*attractiveness*/
        dress[2] += either(2, 3, 3, 4); /*+sexy or -cute*/
        dress[4] += either(1, 0.5, 1); /*exposure level 0-5*/
        dress[3] += either(1, 1, 2); /*+formal or -casual*/
        break;
      case 2:
        dress[0][2] = "cutout";
        dress[1] += either(2, 2, 3); /*attractiveness*/
        dress[2] += either(3, 3, 4); /*+sexy or -cute*/
        dress[3] += either(1, 2, 2); /*+formal or -casual*/
        dress[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        break;
      case 3:
        dress[0][2] = "sheer";
        dress[1] += either(3, 4, 4); /*attractiveness*/
        dress[2] += either(3, 4, 4); /*+sexy or -cute*/
        dress[3] += either(2, 3, 3); /*+formal or -casual*/
        dress[4] += either(2, 2, 3); /*exposure level 0-5*/
        break;
      case 4:
        dress[0][2] = "cutout thin";
        dress[1] += either(2, 3, 3); /*attractiveness*/
        dress[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        dress[3] += either(1, 2, 3); /*+formal or -casual*/
        dress[4] += either(1, 1, 2); /*exposure level 0-5*/
        break;
      case 5:
        dress[0][2] = "ultrasheer";
        dress[1] += either(4, 5, 6, 6); /*attractiveness*/
        dress[2] += either(5, 6, 6); /*+sexy or -cute*/
        dress[3] += either(3, 3, 4); /*+formal or -casual*/
        dress[4] += either(3.5, 3.5, 4); /*exposure level 0-5*/
        break;
      case 6:
        dress[0][2] = "cutout sheer";
        dress[1] += either(3, 4, 5); /*attractiveness*/
        dress[2] += either(3, 4, 5); /*+sexy or -cute*/
        dress[3] += either(2, 3, 4); /*+formal or -casual*/
        dress[4] += either(2, 2, 3); /*exposure level 0-5*/
        break;
      case 7:
        dress[0][2] = "cutout ultrasheer";
        dress[1] += either(5, 6, 6, 7); /*attractiveness*/
        dress[2] += either(6, 6, 7); /*+sexy or -cute*/
        dress[3] += either(3, 4, 4); /*+formal or -casual*/
        dress[4] += either(4, 4, 4.5); /*exposure level 0-5*/
        break;
    }
    switch (neckRand) {
      case 0:
        dress[0][3] = "jewel-neck, ";
        dress[1] += either(0, 0, -1); /*attractiveness*/
        dress[2] += either(-1, 0, 0); /*+sexy or -cute*/
        dress[3] += either(1, 1, 2); /*+formal or -casual*/
        break;
      case 1:
        dress[0][3] = "scoop-neck, ";
        dress[1] += either(2, 2, 3); /*attractiveness*/
        dress[2] += either(1, 1, 2); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 2:
        dress[0][3] = "boat-neck, ";
        dress[1] += either(-1, 0, 0, 1, 1); /*attractiveness*/
        dress[3] += either(2, 2, 3); /*+formal or -casual*/
        break;
      case 3:
        dress[0][3] = "square-neck, ";
        dress[1] += either(2, 3, 3); /*attractiveness*/
        dress[2] += either(1, 2, 2); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 4:
        dress[0][3] = "V-neck, ";
        dress[1] += either(0, 1, 1); /*attractiveness*/
        break;
      case 5:
        dress[0][3] = "deep-V-neck, ";
        dress[1] += either(2, 3, 3); /*attractiveness*/
        dress[2] += either(2, 3, 3); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 6:
        dress[0][3] = "sweetheart-neck, ";
        dress[1] += either(3, 4, 3); /*attractiveness*/
        dress[2] += either(3, 3, 4); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 7:
        dress[0][3] = "halter-neckline, ";
        dress[1] += either(1, 2, 2); /*attractiveness*/
        dress[2] += either(1, 1, 2); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
      case 8:
        dress[0][3] = "keyhole-neck, ";
        dress[1] += either(0, 1, 1); /*attractiveness*/
        dress[2] += either(-1, 1, 2); /*+sexy or -cute*/
        break;
      case 9:
        dress[0][3] = "plunge-neck, ";
        dress[1] += either(4, 4, 5); /*attractiveness*/
        dress[2] += either(3, 4, 4); /*+sexy or -cute*/
        worn.push("titsOut");
        break;
    }
    switch (hemRand) {
      case 0:
        dress[0][3] += "ankle";
        break;
      case 1:
        dress[0][3] += "midi";
        break;
      case 2:
        dress[0][3] += "calf";
        break;
      case 3:
        dress[0][3] += "above calf";
        break;
      case 4:
        dress[0][3] += "knee";
        break;
      case 5:
        dress[0][3] += "above knee";
        break;
      case 6:
        dress[0][3] += "mid thigh";
        break;
      case 7:
        dress[0][3] += "upper thigh";
        break;
      case 8:
        dress[0][3] += "above thigh";
        break;
      case 9:
        dress[0][3] += "groin";
        break;
      case 10:
        dress[0][3] += "above groin";
        break;
    }
    dress[0][3] += " hem";
    /*fabrics: 0-cotton, 1-linen, 2-nylon, 3-silk, 4-taffeta, 5-organza, 6-chiffon, 7-tulle, 8-leather, 9-latex */
    if (args[2] === 0) {
      fabricList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    } else if (args[2] === 1) {
      fabricList = [0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7];
    } else {
      fabricList = [4, 5, 5, 6, 6, 7, 7, 8, 9];
    }
    dress[8] = either(fabricList);
    switch (dress[8]) {
      case 0:
        dress[0][4] = "cotton";
        dress[1] += either(-2, -1, -1.5); /*attractiveness*/
        dress[2] += either(-1, -2, -1); /*+sexy or -cute*/
        dress[3] += either(-3, -3, -4); /*+formal or -casual*/
        break;
      case 1:
        dress[0][4] = "linen";
        dress[1] += either(-1, 0, -1); /*attractiveness*/
        dress[2] += either(-1, -2, -1); /*+sexy or -cute*/
        dress[3] += either(-3, -2, -2); /*+formal or -casual*/
        break;
      case 2:
        dress[0][4] = "nylon";
        dress[1] += either(-1, 0, 1); /*attractiveness*/
        dress[3] += either(-1, -1, -2); /*+formal or -casual*/
        break;
      case 3:
        dress[0][4] = "silk";
        dress[1] += either(0, 1, 2); /*attractiveness*/
        dress[3] += either(0, 0, 1); /*+formal or -casual*/
        dress[4] += either(-0.1, -0.2, -0.3); /*exposure level 0-5*/
        break;
      case 4:
        dress[0][4] = "taffeta";
        dress[1] += either(1, 1, 2); /*attractiveness*/
        dress[2] += either(1, 1, 2); /*+sexy or -cute*/
        dress[3] += either(1, 1, 2); /*+formal or -casual*/
        dress[4] += either(1, 0.5, 0.8, 1.2); /*exposure level 0-5*/
        break;
      case 5:
        dress[0][4] = "organza";
        dress[1] += either(2, 2, 3); /*attractiveness*/
        dress[2] += either(2, 2, 3); /*+sexy or -cute*/
        dress[3] += either(2, 3, 3); /*+formal or -casual*/
        dress[4] += either(1, 1.5, 1.2, 1); /*exposure level 0-5*/
        break;
      case 6:
        dress[0][4] = "chiffon";
        dress[1] += either(3, 4, 4); /*attractiveness*/
        dress[2] += either(4, 4, 5); /*+sexy or -cute*/
        dress[3] += either(2, 3, 3); /*+formal or -casual*/
        dress[4] += either(2, 1.5, 1.8); /*exposure level 0-5*/
        break;
      case 7:
        dress[0][4] = "tulle";
        dress[1] += either(4, 5, 5); /*attractiveness*/
        dress[2] += either(4, 5, 5); /*+sexy or -cute*/
        dress[3] += either(3, 3, 4); /*+formal or -casual*/
        dress[4] += either(3, 2.5, 2.8); /*exposure level 0-5*/
        break;
      case 8:
        dress[0][4] = "leather";
        dress[1] += either(1, 2, 3); /*attractiveness*/
        dress[2] += either(3, 4, 4); /*+sexy or -cute*/
        dress[3] += either(-5, -4, -4); /*+formal or -casual*/
        dress[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        break;
      case 9:
        dress[0][4] = "latex";
        dress[1] += either(4, 4, 5); /*attractiveness*/
        dress[2] += either(4, 5, 6); /*+sexy or -cute*/
        dress[4] += either(3, 3, 3.5); /*exposure level 0-5*/
        break;
    }
    /*color: 0-beige, 1-white, 2-pink, 3-pastel blue, 4-pastel green, 5-pastel yellow, 6-pastel purple, 7-black, 8-red */
    /*pattern: A-none, B-striped, C-checked, D-flower print ????? */
    if (args[3] === 1) {
      colorList = [1, 1, 2, 2, 8, 8, 9, 9, 10, 10, 11, 11, 12, 14, 15];
    } else if (args[3] === 2) {
      colorList = [1, 2, 8, 8, 8, 9, 9, 9, 10, 11, 12];
    } else if (args[3] === 4) {
      colorList = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 9];
    } else {
      colorList = [1, 2, 8, 9, 10, 11, 12, 14, 15];
    }
    dress[9] = either(colorList);
    switch (dress[9]) {
      case 1:
        dress[0][0] = "white";
        if (dress[2] > 0) {
          dress[2] += either(1, 2);
        } else {
          dress[2] += either(-3, -2, -2, -1);
        }
        break;
      case 2:
        dress[0][0] = "pink";
        dress[2] += either(-3, -2, -1); /*+sexy or -cute*/
        break;
      case 8:
        dress[0][0] = "black";
        dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
        break;
      case 9:
        dress[0][0] = "red";
        dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
        break;
      case 10:
        dress[0][0] = "blue";
        dress[2] += either(1, 2, 2); /*+sexy or -cute*/
        break;
      case 11:
        dress[0][0] = "green";
        dress[2] += either(1, 1, 2); /*+sexy or -cute*/
        break;
      case 12:
        dress[0][0] = "purple";
        dress[2] += either(1, -1, 0); /*+sexy or -cute*/
        break;
      case 14:
        dress[0][0] = "yellow";
        dress[2] += either(0, 1, 0); /*+sexy or -cute*/
        break;
      case 15:
        dress[0][0] = "tan";
        dress[1] += either(0, 0, 1);
        break;
    }
    dress[4] = Math.max(0, Math.min(50, Math.floor(dress[4] * 10)));
    dress[1] = Math.round(dress[1]);
    dress[2] = dress[2] > 0 ? Math.floor(dress[2]) : Math.ceil(dress[2]);
    dress[3] = dress[3] > 0 ? Math.floor(dress[3]) : Math.ceil(dress[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.7, 0.9, 1.1, 1.3, 1.5];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.25, 1.5];
    if (dress[1] < 0) {
      dress[1] = Math.max(-10, Math.round(dress[1] * atrNeg[a]));
    } else {
      dress[1] = Math.round(dress[1] * atr[a] + random(aw.base.clothingAtrMod.dress[0], aw.base.clothingAtrMod.dress[1]));
    }
    dress[4] = Math.min(expCap[a], dress[4]);
    dress[2] = Math.round(dress[2] * sexy[a]);
    const atrCap = [8, 12, 16, 18, 20];
    if (dress[1] > atrCap[a]) {
      dress[1] = atrCap[a];
    }

    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type: "dress",
      slot: "top",
      colorWord: dress[0][0],
      styleWord: dress[0][1],
      subStyleWord: dress[0][2],
      tertiaryWord: dress[0][3],
      fabricWord: dress[0][4],
      atr: dress[1],
      sexy: dress[2],
      formal: dress[3],
      exposure: dress[4],
      style: dress[6],
      subStyle: dress[7],
      fabric: dress[8],
      color: dress[9],
      origin: dress[10],
      swimwear: false,
      nightwear: false,
      athletic: false,
      wear: worn,
      accessNip: access.nip,
      accessTits: access.tits,
      accessPussy: access.pussy,
      accessButt: access.butt,
      accessAss: access.ass,
      flag: {hem: hemRand},
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.dress.push(key);
    results.push(key);
    setup.clothesGen.countDress += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a, args);
  }
  /*const safe = function() {
    if (setup.clothesGen.countDress < setup.clothesGen.amtDress) {
      aw.con.warn(`Bra Generator timed out!`);
      setup.clothesGen.countDress = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countDress < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} dresses.`);
  return results;
};

setup.clothesGen.lowerBody = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", lowerbody Generator function ran with missing control variables - Passage: " + aw.passage.title;
    aw.con.warn("!lowerbody Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running Stocking Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countLowerBody = 0;
  setup.clothesGen.amtLowerBody = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 18, 19, 20, 21, 22, 23, 24, 25],
    [1, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 9, 10, 11, 11, 12, 14, 15, 16, 16, 17, 18, 19, 19, 19, 19, 20, 21, 21, 21, 22, 22, 22, 23, 24, 25, 25, 25],
    [18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 22, 22, 22, 23, 23, 24, 25, 25, 25],
    [14, 14, 15, 16, 16, 16, 17, 17],
    [1, 1, 1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 9, 9, 10, 11, 11, 11, 12, 12, 13],
    [7, 8, 8, 11, 11, 11, 12, 12, 13, 13, 15, 15, 17],
    [26],
    [17, 25],
  ];
  const styleList = sLists[args[1]] || [1];
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a, args) {
    let style,
      access = {
        nip: true,
        pussy: false,
        butt: false,
        tits: true,
        ass: false,
      },
      worn = ["normal", "off"], // pulledUp unzipped pulledDown flipped
      type: clothingType,
      athletic = false,
      nightwear = false,
      kinky = false,
      subStyleList,
      hemlinelist,
      hemRand,
      lowerbody,
      fabricList,
      substyleRand,
      colorList;
    /*lowerbody array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    lowerbody = [
      ["na", "na", "na", "na", "na", "LB"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    lowerbody[6] = either(styleList);
    /*substyles: 0-none, 1-lace border, 2-lace waist, 3-lace covered, 4-low back, 5-V back, 6-low front, 7-V front, 8-open paneled*/
    switch (lowerbody[6]) {
      case 1:
        lowerbody[0][1] = "A-line skirt";
        subStyleList = [0, 0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6, 10, 14, 14];
        hemlinelist = [2, 3, 3, 4, 4, 5];
        fabricList = [0, 1, 1, 2, 2, 3, 4, 9];
        lowerbody[1] += either(1, 2, 3); /*attractiveness*/
        lowerbody[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(1, 2, 2, 3); /*+formal or -casual*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 2:
        lowerbody[0][1] = "asymmetrical skirt";
        subStyleList = [0, 0, 0, 1, 1, 2, 3, 5, 5, 6, 10, 14, 14];
        hemlinelist = [3, 4, 4, 5, 5];
        fabricList = [0, 1, 1, 2, 2, 3, 4, 9, 9];
        lowerbody[1] += either(2, 2, 3); /*attractiveness*/
        lowerbody[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(-2, -1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 3:
        lowerbody[0][1] = "circle skirt";
        subStyleList = [0, 0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6, 10, 14, 14];
        hemlinelist = [3, 4, 4, 5, 5];
        fabricList = [0, 1, 1, 2, 2, 3, 4, 9];
        lowerbody[1] += either(0, 1, 2); /*attractiveness*/
        lowerbody[2] += either(-3, -2, -2, -1, 0, 1); /*+sexy or -cute*/
        lowerbody[3] += either(-2, -1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 4:
        lowerbody[0][1] = "draped skirt";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 5, 5, 6, 10, 14, 14, 12, 12];
        hemlinelist = [2, 3, 3, 4, 4, 5];
        fabricList = [0, 1, 1, 2, 2, 3, 4, 9];
        lowerbody[1] += either(2, 3, 3); /*attractiveness*/
        lowerbody[2] += either(2, 3, 3); /*+sexy or -cute*/
        lowerbody[3] += either(2, 3, 3); /*+formal or -casual*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 5:
        lowerbody[0][1] = "gypsy skirt";
        subStyleList = [0, 0, 0, 1, 1, 2, 3, 5, 5, 6, 10, 14, 14];
        hemlinelist = [0, 1, 1, 2, 2, 2, 3, 3, 4];
        fabricList = [0, 1, 1, 4, 9, 9, 9];
        lowerbody[1] += either(1, 2, 2, 3); /*attractiveness*/
        lowerbody[2] += either(-3, -3, -2); /*+sexy or -cute*/
        lowerbody[3] += either(-3, -3, -2); /*+formal or -casual*/
        lowerbody[4] += either(-1, -0.5); /*exposure level 0-5*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 6:
        lowerbody[0][1] = "knife-pleated skirt";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 6, 10, 14, 14, 11];
        hemlinelist = [3, 4, 4, 4, 5, 5, 6];
        fabricList = [1, 2, 2, 4, 4, 9];
        lowerbody[1] += either(1, 2, 2, 3); /*attractiveness*/
        lowerbody[2] += either(-2, -1, 1, 2, 3); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1, 2, 2, 3); /*+formal or -casual*/
        lowerbody[4] += either(-1, -0.5); /*exposure level 0-5*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 7:
        lowerbody[0][1] = "pencil skirt";
        subStyleList = [0, 0, 0, 1, 1, 2, 3, 6, 6, 10, 10, 14, 14];
        hemlinelist = [2, 3, 3, 4, 4, 5];
        fabricList = [0, 1, 1, 2, 2, 3, 4, 9];
        lowerbody[1] += either(3, 3, 4); /*attractiveness*/
        lowerbody[2] += either(3, 3, 4); /*+sexy or -cute*/
        lowerbody[3] += either(2, 3, 4); /*+formal or -casual*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 8:
        lowerbody[0][1] = "tube skirt";
        subStyleList = [0, 0, 0, 2, 2, 2, 3, 3, 6, 10, 14, 14];
        hemlinelist = [4, 4, 4, 5, 5, 6];
        fabricList = [2, 2, 3, 6, 6, 6, 6, 7, 7, 7];
        lowerbody[1] += either(3, 4, 5); /*attractiveness*/
        lowerbody[2] += either(4, 4, 5); /*+sexy or -cute*/
        lowerbody[3] += either(-1, 0, 1, 2); /*+formal or -casual*/
        lowerbody[4] += either(0.5, 1, 1, 1.5); /*exposure level 0-5*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 9:
        lowerbody[0][1] = "straight skirt";
        subStyleList = [0, 0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6, 10, 14, 14];
        hemlinelist = [2, 3, 3, 4, 4, 5];
        fabricList = [0, 1, 1, 2, 2, 3, 4, 9];
        lowerbody[1] += either(2, 3, 3, 4); /*attractiveness*/
        lowerbody[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        lowerbody[3] += either(2, 2, 3, 4); /*+formal or -casual*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 10:
        lowerbody[0][1] = "layered skirt";
        subStyleList = [0, 0, 0, 1, 1, 2, 3, 5, 5, 6, 10, 14, 14];
        hemlinelist = [1, 2, 2, 3, 3, 3, 4, 4, 5];
        fabricList = [0, 1, 1, 4, 9, 9, 9];
        lowerbody[1] += either(2, 3, 3); /*attractiveness*/
        lowerbody[2] += either(-3, -3, -2); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1, 1, 2); /*+formal or -casual*/
        lowerbody[4] += either(-1, -0.5); /*exposure level 0-5*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 11:
        lowerbody[0][1] = "mini skirt";
        subStyleList = [0, 0, 0, 2, 2, 3, 4, 6, 10, 12, 14, 14];
        hemlinelist = [6, 7, 7];
        fabricList = [1, 2, 2, 3, 6, 6, 7];
        lowerbody[1] += either(4, 4, 5); /*attractiveness*/
        lowerbody[2] += either(3, 4, 5); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
        lowerbody[4] += either(0.5, 1, 1); /*exposure level 0-5*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        break;
      case 12:
        lowerbody[0][1] = "micro skirt";
        subStyleList = [0, 0, 0, 2, 2, 3, 4, 6, 10, 12, 14, 14];
        hemlinelist = [8, 8];
        fabricList = [1, 2, 2, 3, 3, 6, 6, 7, 7];
        lowerbody[1] += either(4, 5, 6); /*attractiveness*/
        lowerbody[2] += either(4, 5, 6); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
        lowerbody[4] += either(1, 1.5, 1.5); /*exposure level 0-5*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        kinky = true;
        break;
      case 13:
        lowerbody[0][1] = "nano skirt";
        subStyleList = [0, 0, 0, 2, 2, 3, 4, 6, 10, 12, 14, 14];
        hemlinelist = [9, 9];
        fabricList = [1, 2, 3, 3, 6, 7, 7];
        lowerbody[1] += either(5, 6, 7); /*attractiveness*/
        lowerbody[2] += either(4, 5, 6); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
        lowerbody[4] += either(2, 2.5, 2.5); /*exposure level 0-5*/
        worn.push("pulledUp");
        worn.push("pulledDown");
        worn.push("flipped");
        access.butt = true;
        access.pussy = true;
        access.ass = true;
        kinky = true;
        break;
      case 14:
        lowerbody[0][1] = "boy shorts";
        subStyleList = [0, 0, 0, 2, 2, 1, 7, 11, 14];
        hemlinelist = [5, 6, 6];
        fabricList = [0, 0, 1, 1, 1, 2, 2, 8];
        lowerbody[1] += either(1, 1, 2, 2, 3, 4); /*attractiveness*/
        lowerbody[2] += either(-3, -2, -2, -1, 0, 1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(-3, -2, -2, -1); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 15:
        lowerbody[0][1] = "hot pants";
        subStyleList = [0, 0, 0, 2, 2, 3, 10, 12, 14, 15];
        hemlinelist = [9, 9];
        fabricList = [1, 2, 2, 3, 5, 6, 6, 7];
        lowerbody[1] += either(4, 5, 6); /*attractiveness*/
        lowerbody[2] += either(4, 5, 6); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
        lowerbody[4] += either(1, 1, 1.5); /*exposure level 0-5*/
        worn.push("pulledDown");
        worn.push("unzipped");
        worn.push("pulledAside");
        kinky = true;
        break;
      case 16:
        lowerbody[0][1] = "cut-off shorts";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 10, 11, 12, 14];
        hemlinelist = [4, 5, 6, 6, 7, 7];
        fabricList = [0, 0, 1, 1, 1, 2, 2, 3, 5, 6];
        lowerbody[1] += either(1, 1, 2, 2, 3, 4); /*attractiveness*/
        lowerbody[2] += either(-3, -2, -2, -1, 0, 1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(-3, -2, -2); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 17:
        lowerbody[0][1] = "short shorts";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 10, 11, 12, 14, 15, 15];
        hemlinelist = [8, 8];
        fabricList = [1, 1, 2, 2, 3, 5, 6, 7];
        lowerbody[1] += either(4, 4, 5); /*attractiveness*/
        lowerbody[2] += either(3, 4, 5); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
        lowerbody[4] += either(0.5, 0.5, 1); /*exposure level 0-5*/
        worn.push("pulledDown");
        worn.push("unzipped");
        athletic = true;
        break;
      case 18:
        lowerbody[0][1] = "skinny pants";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 7, 8, 10, 11, 12, 14, 15];
        hemlinelist = [0, 0, 1];
        fabricList = [0, 1, 1, 2, 6, 6];
        lowerbody[1] += either(0, 1, 2, 2); /*attractiveness*/
        lowerbody[2] += either(-2, -1, 0, 0); /*+sexy or -cute*/
        lowerbody[3] += either(-3, -2, -1); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 19:
        lowerbody[0][1] = "skinny jeans";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 7, 8, 9, 10, 11, 12, 14, 15];
        hemlinelist = [0, 0, 1];
        fabricList = [5, 5];
        lowerbody[1] += either(0, 1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(-2, -1, -1, 0, 0, 1); /*+sexy or -cute*/
        lowerbody[3] += either(-4, -3); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 20:
        lowerbody[0][1] = "slacks";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 10, 11, 14];
        hemlinelist = [0, 0, 1];
        fabricList = [0, 1, 1, 1, 1, 2, 4, 9];
        lowerbody[1] += either(1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        lowerbody[3] += either(2, 3, 4); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 21:
        lowerbody[0][1] = "straight jeans";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 7, 8, 9, 10, 11, 12, 14, 15];
        hemlinelist = [0, 0, 1];
        fabricList = [5, 5];
        lowerbody[1] += either(1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(-2, -1, 0, 0); /*+sexy or -cute*/
        lowerbody[3] += either(-3, -2, -1); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 22:
        lowerbody[0][1] = "capris";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 10, 11, 14];
        hemlinelist = [1, 2, 2, 3];
        fabricList = [0, 1, 1, 1, 1, 2, 9];
        lowerbody[1] += either(2, 2, 3); /*attractiveness*/
        lowerbody[2] += either(-3, -2, -2, -1, 1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(-2, -1, 0); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 23:
        lowerbody[0][1] = "flared pants";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 10, 12, 14, 14];
        hemlinelist = [0, 0, 1];
        fabricList = [0, 0, 1, 1, 2, 9, 9];
        lowerbody[1] += either(1, 2, 3); /*attractiveness*/
        lowerbody[2] += either(-1, 0, 0, 1); /*+sexy or -cute*/
        lowerbody[3] += either(-2, -1, 0, 1); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 24:
        lowerbody[0][1] = "palazzo pants";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 10, 12, 14, 14];
        hemlinelist = [0, 0, 1];
        fabricList = [0, 0, 1, 1, 2, 9, 9, 9];
        lowerbody[1] += either(1, 1, 2, 2, 3); /*attractiveness*/
        lowerbody[2] += either(-3, -2, 2, 2); /*+sexy or -cute*/
        lowerbody[3] += either(-1, 1, 2, 2, 3); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        break;
      case 25:
        lowerbody[0][1] = "leggings";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 9, 10, 10, 11, 12, 14, 14];
        hemlinelist = [0, 1, 1, 2];
        fabricList = [6, 6, 7];
        lowerbody[1] += either(2, 3, 4); /*attractiveness*/
        lowerbody[2] += either(-1, 2, 3, 3, 4); /*+sexy or -cute*/
        lowerbody[3] += either(-4, -3); /*+formal or -casual*/
        worn.push("pulledDown");
        worn.push("unzipped");
        athletic = true;
        break;
      case 26:
        lowerbody[0][1] = "pyjama pants";
        subStyleList = [0, 0, 0, 1, 2, 2, 3, 9, 10, 10, 11, 12, 14, 14];
        hemlinelist = [0, 0, 1];
        fabricList = [0, 0, 1, 1, 2, 9, 9, 9];
        lowerbody[1] += either(2, 3, 3); /*attractiveness*/
        lowerbody[2] += either(-4, -3, -3, -2, -1); /*+sexy or -cute*/
        lowerbody[3] += either(-6, -5); /*+formal or -casual*/
        worn.push("pulledDown");
        nightwear = true;
        break;
      default:
        style = "bad arg to lowerbodyStyle";
    }
    substyleRand = either(subStyleList);
    hemRand = either(hemlinelist);
    lowerbody[7] = substyleRand;
    switch (substyleRand) {
      case 0:
        lowerbody[0][2] = "regular";
        lowerbody[1] += either(0, 0, 1);
        break;
      case 1:
        lowerbody[0][2] = "high waist";
        lowerbody[1] += either(-1, 0, 0); /*attractiveness*/
        lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        lowerbody[3] += either(1, 1, 2); /*+formal or -casual*/
        hemRand += either(0, 1);
        break;
      case 2:
        lowerbody[0][2] = "low waist";
        lowerbody[1] += either(1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(-1, 0); /*+formal or -casual*/
        lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
        break;
      case 3:
        lowerbody[0][2] = "very-low waist";
        lowerbody[1] += either(2, 2, 3); /*attractiveness*/
        lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
        lowerbody[3] += either(-1, -1, 0); /*+formal or -casual*/
        lowerbody[4] += either(0.5, 1, 1); /*exposure level 0-5*/
        access.butt = true;
        break;
      case 4:
        lowerbody[0][2] = "slitted";
        lowerbody[1] += either(0, 1, 1); /*attractiveness*/
        lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(0, 1); /*+formal or -casual*/
        lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        break;
      case 5:
        lowerbody[0][2] = "decorative hem";
        lowerbody[1] += either(0, 1); /*attractiveness*/
        lowerbody[2] += either(-1, -1, 0); /*+sexy or -cute*/
        lowerbody[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
        break;
      case 6:
        lowerbody[0][2] = "extra-high hem";
        lowerbody[1] += either(2, 2, 3); /*attractiveness*/
        lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
        hemRand += 1;
        break;
      case 7:
        lowerbody[0][2] = "faded";
        lowerbody[1] += either(-1, 0, 0, 1, 1); /*attractiveness*/
        lowerbody[2] += either(-2, -1, 0, 0); /*+sexy or -cute*/
        lowerbody[3] += either(-2, -1, -1); /*+formal or -casual*/
        break;
      case 8:
        lowerbody[0][2] = "holed";
        lowerbody[1] += either(0, 0, 1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        lowerbody[3] += either(-3, -2, -1); /*+formal or -casual*/
        lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        break;
      case 9:
        lowerbody[0][2] = "well-worn";
        lowerbody[1] += either(0, 1, 2); /*attractiveness*/
        lowerbody[2] += either(-1, 1); /*+sexy or -cute*/
        lowerbody[3] += either(-1, 0); /*+formal or -casual*/
        break;
      case 10:
        lowerbody[0][2] = "thin";
        lowerbody[1] += either(1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(1, 2, 2); /*+sexy or -cute*/
        lowerbody[3] += either(0, 0, 1); /*+formal or -casual*/
        lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
        access.butt = true;
        break;
      case 11:
        lowerbody[0][2] = "rolled hem";
        lowerbody[1] += either(0, 1); /*attractiveness*/
        lowerbody[2] += either(-2, -1, 0, 0, 0); /*+sexy or -cute*/
        break;
      case 12:
        lowerbody[0][2] = "stretchy";
        lowerbody[1] += either(0.5, 1, 1); /*attractiveness*/
        lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(-2, -1, -1); /*+formal or -casual*/
        lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
        access.butt = true;
        break;
      case 13:
        lowerbody[0][2] = "cutout";
        lowerbody[1] += either(1, 2, 3); /*attractiveness*/
        lowerbody[2] += either(1, 2, 3); /*+sexy or -cute*/
        lowerbody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
        break;
      case 14:
        lowerbody[0][2] = "elastic waist";
        lowerbody[2] += either(-1, 1, 1, 1); /*+sexy or -cute*/
        access.butt = true;
        break;
      case 15:
        lowerbody[0][2] = "long zipper";
        lowerbody[1] += either(1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(3, 3, 4); /*+sexy or -cute*/
        lowerbody[3] += either(0, -1); /*+formal or -casual*/
        worn.push("totalZip");
        break;
    }
    if (lowerbody[6] < 14) {// skirts
      type = "skirt";
      switch (hemRand) {
        case 0:
          lowerbody[0][3] = "ankle";
          lowerbody[2] += either(-1, -2, -2); /*+sexy or -cute*/
          access.ass = false;
          access.pussy = false;
          break;
        case 1:
          lowerbody[0][3] = "midi";
          lowerbody[2] += either(-1, -1, -2); /*+sexy or -cute*/
          access.ass = false;
          access.pussy = false;
          break;
        case 2:
          lowerbody[0][3] = "calf";
          lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
          access.ass = false;
          access.pussy = false;
          break;
        case 3:
          lowerbody[0][3] = "above calf";
          lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
          access.ass = false;
          access.pussy = false;
          break;
        case 4:
          lowerbody[0][3] = "knee";
          lowerbody[2] += either(0, 0, -1); /*+sexy or -cute*/
          access.ass = false;
          access.pussy = false;
          break;
        case 5:
          lowerbody[0][3] = "above knee";
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
          access.ass = false;
          access.pussy = false;
          break;
        case 6:
          lowerbody[0][3] = "mid thigh";
          lowerbody[1] += either(0, 1, 1); /*attractiveness*/
          lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
          lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
          access.ass = false;
          access.pussy = false;
          break;
        case 7:
          lowerbody[0][3] = "upper thigh";
          lowerbody[1] += either(1, 1, 2); /*attractiveness*/
          lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
          lowerbody[4] += either(1, 0.5, 0.5); /*exposure level 0-5*/
          break;
        case 8:
          lowerbody[0][3] = "above thigh";
          lowerbody[1] += either(1, 2, 2); /*attractiveness*/
          lowerbody[2] += either(1, 2, 2); /*+sexy or -cute*/
          lowerbody[4] += either(1, 1.5, 1.5); /*exposure level 0-5*/
          break;
        case 9:
          lowerbody[0][3] = "groin";
          lowerbody[1] += either(2, 2, 3); /*attractiveness*/
          lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
          lowerbody[4] += either(1.5, 2, 2); /*exposure level 0-5*/
          break;
        case 10:
          lowerbody[0][3] = "above groin";
          lowerbody[1] += either(2, 3, 3); /*attractiveness*/
          lowerbody[2] += either(2, 3, 3); /*+sexy or -cute*/
          lowerbody[4] += either(2, 2, 2.5); /*exposure level 0-5*/
          break;
      }
    } else if (lowerbody[6] < 18) { // shorts
      type = "shorts";
      switch (hemRand) {
        case 0:
          lowerbody[0][3] = "ankle";
          lowerbody[2] += either(-1, -2, -2); /*+sexy or -cute*/
          break;
        case 1:
          lowerbody[0][3] = "midi";
          lowerbody[2] += either(-1, -1, -2); /*+sexy or -cute*/
          break;
        case 2:
          lowerbody[0][3] = "calf";
          lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
          break;
        case 3:
          lowerbody[0][3] = "above calf";
          lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
          break;
        case 4:
          lowerbody[0][3] = "knee";
          lowerbody[2] += either(0, 0, -1); /*+sexy or -cute*/
          break;
        case 5:
          lowerbody[0][3] = "above knee";
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
          break;
        case 6:
          lowerbody[0][3] = "mid thigh";
          lowerbody[1] += either(0, 1, 1); /*attractiveness*/
          lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
          break;
        case 7:
          lowerbody[0][3] = "upper thigh";
          lowerbody[1] += either(1, 1, 2); /*attractiveness*/
          lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
          break;
        case 8:
          lowerbody[0][3] = "above thigh";
          lowerbody[1] += either(1, 2, 2); /*attractiveness*/
          lowerbody[2] += either(1, 2, 2); /*+sexy or -cute*/
          lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
          break;
        case 9:
          lowerbody[0][3] = "groin";
          lowerbody[1] += either(2, 2, 3); /*attractiveness*/
          lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
          lowerbody[4] += either(0.5, 0.5, 1); /*exposure level 0-5*/
          break;
        case 10:
          lowerbody[0][3] = "above groin";
          lowerbody[1] += either(2, 3, 3); /*attractiveness*/
          lowerbody[2] += either(2, 3, 3); /*+sexy or -cute*/
          lowerbody[4] += either(1, 1, 0.5); /*exposure level 0-5*/
          break;
      }
    } else {
      type = "pants";
      switch (hemRand) {
        case 0:
          lowerbody[0][3] = "ankle";
          break;
        case 1:
          lowerbody[0][3] = "midi";
          break;
        case 2:
          lowerbody[0][3] = "calf";
          break;
        case 3:
          lowerbody[0][3] = "above calf";
          break;
        case 4:
          lowerbody[0][3] = "knee";
          break;
        case 5:
          lowerbody[0][3] = "above knee";
          break;
        case 6:
          lowerbody[0][3] = "mid thigh";
          break;
        case 7:
          lowerbody[0][3] = "upper thigh";
          break;
        case 8:
          lowerbody[0][3] = "above thigh";
          break;
        case 9:
          lowerbody[0][3] = "groin";
          break;
        case 10:
          lowerbody[0][3] = "above groin";
          break;
      }
    }
    if (args[3] === 2) {
      fabricList = [3, 3, 7, 7, 10, 10, 11, 11];
    }
    lowerbody[8] = either(fabricList);
    /*fabrics: 0-cotton, 1 cotton poly blend, 2-nylon, 3-sheer nylon, 4-wool, 5-denim, 6-lycra-cotton blend, 7-thin lycra, 8-cotton knit, 9-linen, 10-leather, 11-latex*/
    switch (lowerbody[8]) {
      case 0:
        lowerbody[0][4] = "cotton";
        lowerbody[2] += either(0, -0.5); /*attractiveness*/
        lowerbody[3] += either(0, -0.5); /*+formal or -casual*/
        break;
      case 1:
        lowerbody[0][4] = "cotton/poly blend";
        lowerbody[2] += either(0, 0.5); /*attractiveness*/
        lowerbody[3] += either(0, 0.5); /*+formal or -casual*/
        break;
      case 2:
        lowerbody[0][4] = "nylon";
        lowerbody[1] += either(0, 0.5); /*attractiveness*/
        lowerbody[2] += either(0, 0.5, 1); /*+formal or -casual*/
        lowerbody[3] += either(0, 0.5, 1); /*+formal or -casual*/
        break;
      case 3:
        lowerbody[0][4] = "sheer nylon";
        lowerbody[1] += either(1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(1, 1, 2); /*+formal or -casual*/
        lowerbody[4] += either(0.5, 1, 1); /*exposure level 0-5*/
        break;
      case 4:
        lowerbody[0][4] = "wool";
        lowerbody[1] += either(1, 2); /*attractiveness*/
        lowerbody[3] += either(2, 2, 3); /*+formal or -casual*/
        lowerbody[4] += either(-1, 0, -0.5); /*exposure level 0-5*/
        break;
      case 5:
        lowerbody[0][4] = "denim";
        lowerbody[3] += either(-0.5, -1); /*+formal or -casual*/
        break;
      case 6:
        lowerbody[0][4] = "lycra/cotton blend";
        lowerbody[1] += either(1, 0.5); /*attractiveness*/
        lowerbody[2] += either(0.5, 1, 1); /*+sexy or -cute*/
        lowerbody[3] += either(0, -0.5, -1); /*+formal or -casual*/
        break;
      case 7:
        lowerbody[0][4] = "thin lycra";
        lowerbody[1] += either(1, 1, 2); /*attractiveness*/
        lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
        lowerbody[3] += either(0, 0, 1); /*+formal or -casual*/
        lowerbody[4] += either(0.5, 0, 0.5); /*exposure level 0-5*/
        break;
      case 8:
        lowerbody[0][4] = "cotton knit";
        lowerbody[2] += either(-2, -1, -1); /*+sexy or -cute*/
        lowerbody[3] += either(-1, -1, -0.5); /*+formal or -casual*/
        break;
      case 9:
        lowerbody[0][4] = "linen";
        lowerbody[1] += either(0, 1, 2); /*attractiveness*/
        lowerbody[2] += either(-1, 0, 1); /*+sexy or -cute*/
        lowerbody[3] += either(-2, -1, 0, 1); /*+formal or -casual*/
        lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
        break;
      case 10:
        lowerbody[0][4] = "leather";
        lowerbody[1] += either(2, 3, 3); /*attractiveness*/
        lowerbody[2] += either(3, 3, 4); /*+sexy or -cute*/
        lowerbody[3] += either(-1, -1, -0.5); /*+formal or -casual*/
        break;
      case 11:
        lowerbody[0][4] = "latex";
        lowerbody[1] += either(3, 3, 4); /*attractiveness*/
        lowerbody[2] += either(3, 4, 5); /*+sexy or -cute*/
        lowerbody[4] += either(1, 1.5, 2); /*exposure level 0-5*/
        break;
    }
    /*color: 0-clear, 1 tan, 2 khaki, 3 brown, 4-dark green, 5-navy blue, 6-burgundy, 7-black, 8-white, 9-light, 10-standard, 11-dark, 12-red, 13-blue, 14-green, 15-yellow, 16-orange, 17-purple,*/
    if (args[3] === 0) {
      colorList = [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26];
    } else if (args[3] === 1) {
      colorList = [1, 8, 8, 8, 13, 15, 15, 15, 16, 16, 17, 17, 18, 19];
    } else if (args[3] === 4) {
      colorList = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 9];
    } else {
      colorList = [1, 8, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 18, 18, 19, 19, 26];
    }
    if (lowerbody[8] === 11) {
      colorList.push(0);
      colorList.push(0);
      colorList.push(0);
      colorList.push(0);
    }
    if (lowerbody[8] === 5 && args[3] !== 3) {
      colorList = [1, 8, 17, 23, 23, 23, 24, 24, 24, 24, 24, 25, 25, 25, 25];
    }
    lowerbody[9] = either(colorList);
    switch (lowerbody[9]) {
      case 1:
        lowerbody[0][0] = "white";
        lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, -2, -2); /*+sexy or -cute*/
        }
        lowerbody[3] += either(1, 1, 0); /*+formal or -casual*/
        break;
      case 8:
        lowerbody[0][0] = "black";
        lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(2, 1, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, -1, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(1, 1, 0); /*+formal or -casual*/
        break;
      case 9:
        lowerbody[0][0] = "red";
        lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(0, -0.5, 0); /*+formal or -casual*/
        break;
      case 10:
        lowerbody[0][0] = "blue";
        lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, -1, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(-0.5, 0, 0); /*+formal or -casual*/
        break;
      case 11:
        lowerbody[0][0] = "green";
        lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
        break;
      case 12:
        lowerbody[0][0] = "purple";
        lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
        break;
      case 13:
        lowerbody[0][0] = "brown";
        lowerbody[3] += either(1.5, 0.5, 1); /*+formal or -casual*/
        break;
      case 14:
        lowerbody[0][0] = "yellow";
        lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
        break;
      case 15:
        lowerbody[0][0] = "tan";
        lowerbody[1] += either(0.5, 0, 0); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0.5, 0, 0); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-0.5, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(1, 1, 0.5); /*+formal or -casual*/
        break;
      case 16:
        lowerbody[0][0] = "navy blue";
        lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(0.5, 0.5, 0); /*+formal or -casual*/
        break;
      case 17:
        lowerbody[0][0] = "khaki";
        lowerbody[3] += either(0.5, 1, 0.5); /*+formal or -casual*/
        break;
      case 18:
        lowerbody[0][0] = "dark green";
        lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(0.5, 0.5, 0); /*+formal or -casual*/
        break;
      case 19:
        lowerbody[0][0] = "burgundy";
        lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(0.5, 0.5, 0); /*+formal or -casual*/
        break;
      case 22:
        lowerbody[0][0] = "clear";
        lowerbody[1] += either(2, 3, 3); /*attractiveness*/
        lowerbody[2] += either(3, 4, 4); /*+sexy or -cute*/
        lowerbody[4] += either(1, 1.5, 2); /*exposure level 0-5*/
        break;
      case 23:
        lowerbody[0][0] = "light bluejean";
        lowerbody[1] += either(0, 0, -0.5); /*attractiveness*/
        break;
      case 24:
        lowerbody[0][0] = "bluejean";
        lowerbody[1] += either(0, 0, 1); /*attractiveness*/
        lowerbody[3] += either(0, 0, 1); /*+formal or -casual*/
        break;
      case 25:
        lowerbody[0][0] = "dark bluejean";
        lowerbody[1] += either(0, 1, 1); /*attractiveness*/
        lowerbody[3] += either(0, 1, 1); /*+formal or -casual*/
        break;
      case 26:
        lowerbody[0][0] = "orange";
        lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
        if (lowerbody[2] > 0) {
          lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
        } else {
          lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
        }
        lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
        break;
    }
    lowerbody[4] = Math.max(0, Math.min(50, Math.floor(lowerbody[4] * 10)));
    lowerbody[1] = Math.round(lowerbody[1]);
    lowerbody[2] = lowerbody[2] > 0 ? Math.floor(lowerbody[2]) : Math.ceil(lowerbody[2]);
    lowerbody[3] = lowerbody[3] > 0 ? Math.floor(lowerbody[3]) : Math.ceil(lowerbody[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.8, 1, 1.2, 1.4, 1.6];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.2, 1.4];
    if (lowerbody[1] < 0) {
      lowerbody[1] = Math.max(-6, Math.round(lowerbody[1] * atrNeg[a]));
    } else {
      lowerbody[1] = Math.round(lowerbody[1] * atr[a] + random(aw.base.clothingAtrMod.bottom[0], aw.base.clothingAtrMod.bottom[1]));
    }
    lowerbody[4] = Math.min(expCap[a], lowerbody[4]);
    lowerbody[2] = Math.round(lowerbody[2] * sexy[a]);
    const atrCap = [8, 12, 16, 18, 20];
    if (lowerbody[1] > atrCap[a]) {
      lowerbody[1] = atrCap[a];
    }

    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type,
      slot: "bottom",
      colorWord: lowerbody[0][0],
      styleWord: lowerbody[0][1],
      subStyleWord: lowerbody[0][2],
      tertiaryWord: lowerbody[0][3],
      fabricWord: lowerbody[0][4],
      atr: lowerbody[1],
      sexy: lowerbody[2],
      formal: lowerbody[3],
      exposure: lowerbody[4],
      style: lowerbody[6],
      subStyle: lowerbody[7],
      fabric: lowerbody[8],
      color: lowerbody[9],
      origin: lowerbody[10],
      swimwear: false,
      nightwear,
      athletic,
      kinky,
      wear: worn,
      accessNip: access.nip,
      accessTits: access.tits,
      accessPussy: access.pussy,
      accessButt: access.butt,
      accessAss: access.ass,
      flag: {hem: hemRand},
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.bottom.push(key);
    results.push(key);
    setup.clothesGen.countLowerBody += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a, args);
  }
  /*const safe = function() {
    if (setup.clothesGen.countLowerBody < setup.clothesGen.amtLowerBody) {
      aw.con.warn(`LowerBody Generator timed out!`);
      setup.clothesGen.countLowerBody = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countLowerBody < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} bottoms.`);
  return results;
};

setup.clothesGen.shoes = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", shoes Generator function ran with missing control variables - Passage: "
    + aw.passage.title;
    aw.con.warn("!shoes Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running shoes Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countShoes = 0;
  setup.clothesGen.amtShoes = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14, 14, 15, 16],
    [2, 17],
    [1, 1, 1, 5, 5, 13, 13, 14, 14, 9],
    [4, 4, 4, 5, 5, 5, 6, 13],
  ];
  const styleList = sLists[args[1]];
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a) {
    let style,
      worn = ["normal", "off"],
      shoes,
      substyleRand,
      subStyleList,
      colorList,
      athletic = false,
      kinky = false;
    /*shoes array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    shoes = [
      ["na", "na", "na", "na", "na", "LB"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    shoes[8] = "";
    shoes[6] = either(styleList);
    switch (shoes[6]) {
      case 1:
        shoes[0][1] = "heavy boots";
        colorList = [1, 1, 7, 7, 7, 13];
        subStyleList = [2, 2, 2, 6, 6, 6, 7, 7, 7, 8];
        shoes[1] += either(-3, -2, -1, 0, 1); /*attractiveness*/
        shoes[2] += either(-1, 1, 3, 4); /*+sexy or -cute*/
        shoes[3] += either(-3, -3, -2); /*+formal or -casual*/
        kinky = true;
        break;
      case 2:
        shoes[0][1] = "sneakers";
        colorList = [1, 2, 2, 2, 3, 4, 6, 7, 8, 13];
        subStyleList = [0, 0, 13];
        shoes[1] += either(-2, 1, 2, 3); /*attractiveness*/
        shoes[2] += either(-3, -2, -1, 1, 1); /*+sexy or -cute*/
        shoes[3] += either(-2, -1, 0); /*+formal or -casual*/
        break;
      case 3:
        shoes[0][1] = "kitten heels";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 0, 1); /*attractiveness*/
        shoes[2] += either(-1, 0, 0); /*+sexy or -cute*/
        shoes[3] += either(-1, -1, 0); /*+formal or -casual*/
        break;
      case 4:
        shoes[0][1] = "pumps";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(0, 1, 1, 2, 2, 3); /*+sexy or -cute*/
        shoes[3] += either(0, 1, 1, 2, 2); /*+formal or -casual*/
        break;
      case 5:
        shoes[0][1] = "stilettos";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(1, 2, 2); /*attractiveness*/
        shoes[2] += either(0, 1, 2, 2, 2, 3, 4); /*+sexy or -cute*/
        shoes[3] += either(2, 3, 4, 4); /*+formal or -casual*/
        break;
      case 6:
        shoes[0][1] = "wedge heels";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(-2, -2, -1, 0); /*+sexy or -cute*/
        shoes[3] += either(-2, -2, -1, 0); /*+formal or -casual*/
        break;
      case 7:
        shoes[0][1] = "wedge sandals";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(-2, -1, 0); /*+sexy or -cute*/
        shoes[3] += either(-2, -1, 0, 1, 2, 3); /*+formal or -casual*/
        break;
      case 8:
        shoes[0][1] = "cone heels";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(-1, 0, 1); /*+sexy or -cute*/
        shoes[3] += either(1, 1, 2, 2, 2, 3); /*+formal or -casual*/
        break;
      case 9:
        shoes[0][1] = "ankle booties";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(-1, 0, 1); /*+sexy or -cute*/
        shoes[3] += either(-2, -1, 0, 1, 2, 3); /*+formal or -casual*/
        break;
      case 10:
        shoes[0][1] = "spool heels";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 0, 1); /*attractiveness*/
        shoes[2] += either(-1, 0, 1); /*+sexy or -cute*/
        shoes[3] += either(-2, -1, 0, 1, 2, 3); /*+formal or -casual*/
        break;
      case 11:
        shoes[0][1] = "cut-out heels";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(-1, -1, 0); /*+sexy or -cute*/
        shoes[3] += either(-2, -1, 1, 2, 3, 4); /*+formal or -casual*/
        break;
      case 12:
        shoes[0][1] = "dance shoes";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(-1, -1, 0); /*+sexy or -cute*/
        shoes[3] += either(1, 1, 2, 2); /*+formal or -casual*/
        break;
      case 13:
        shoes[0][1] = "chunky heels";
        colorList = [1, 2, 3, 4, 6, 7, 7, 7, 8, 13];
        subStyleList = [0, 1, 2, 3, 4, 5];
        shoes[1] += either(0, 1, 1); /*attractiveness*/
        shoes[2] += either(0, 1, 1, 2); /*+sexy or -cute*/
        shoes[3] += either(2, 3, 4, 5); /*+formal or -casual*/
        break;
      case 14:
        shoes[0][1] = "boots";
        colorList = [1, 7, 7, 7, 13];
        subStyleList = [0, 0, 6, 6, 7, 7, 8, 9, 9, 9, 10, 11, 12];
        shoes[1] += either(-2, -1, -1, 0, 1, 2, 2, 3); /*attractiveness*/
        shoes[2] += either(-1, 1, 2, 3); /*+sexy or -cute*/
        shoes[3] += either(-1, 0, 1, 1, 2, 2, 3); /*+formal or -casual*/
        break;
      case 15:
        shoes[0][1] = "flats";
        colorList = [7, 7, 7, 13];
        subStyleList = [0, 0, 1];
        shoes[1] += either(-3, -2, -1, 0, 1, 2); /*attractiveness*/
        shoes[2] += either(-4, -3, -2, -2, -1, -1, 0); /*+sexy or -cute*/
        shoes[3] += either(-2, -2, -2, -1, 0, 0, 1, 1, 2); /*+formal or -casual*/
        break;
      case 16:
        shoes[0][1] = "flip-flops";
        colorList = [1, 1, 1, 2];
        subStyleList = [0, 0, 13];
        shoes[1] += either(-3, -2, -1, 0, 1, 1); /*attractiveness*/
        shoes[2] += either(-5, -4, -4, -3, -3, -2, -1); /*+sexy or -cute*/
        shoes[3] += either(-4, -4, -3, -2); /*+formal or -casual*/
        break;
      case 17:
        shoes[0][1] = "running shoes";
        colorList = [1, 2, 2, 2, 3, 4, 6, 7, 8, 13];
        subStyleList = [0];
        shoes[1] += either(-1, 1, 2, 3); /*attractiveness*/
        shoes[2] += either(-2, -1, -1, 0, 1, 2); /*+sexy or -cute*/
        shoes[3] += either(-3, -2, -1, 0); /*+formal or -casual*/
        athletic = true;
        break;
      default:
        style = "bad arg to shoesStyle";
    }
    shoes[8] = 0;
    shoes[0][4] = 0;
    substyleRand = either(subStyleList);
    shoes[7] = substyleRand;
    switch (substyleRand) {
      case 0:
        shoes[0][2] = "regular";
        shoes[1] += either(0, 0, 1); /*attractiveness*/
        break;
      case 1:
        shoes[0][2] = "ankle strap";
        shoes[1] += either(0, 0, 1); /*attractiveness*/
        shoes[2] += either(0, 0, 1); /*+sexy or -cute*/
        shoes[3] += either(1, 1, 2); /*+formal or -casual*/
        break;
      case 2:
        shoes[0][2] = "platform";
        shoes[2] += either(-1, 0); /*+sexy or -cute*/
        shoes[3] += either(-2, -1, 0); /*+formal or -casual*/
        break;
      case 3:
        shoes[0][2] = "sandals";
        shoes[3] += either(-2, -1); /*+formal or -casual*/
        break;
      case 4:
        shoes[0][2] = "mule";
        shoes[2] += either(-2, -1); /*+sexy or -cute*/
        shoes[3] += either(-2, -1); /*+formal or -casual*/
        break;
      case 5:
        shoes[0][2] = "corset";
        shoes[2] += either(1, 2); /*+sexy or -cute*/
        break;
      case 6:
        shoes[0][2] = "mid-calf";
        shoes[2] += either(-1, 0, 1); /*+sexy or -cute*/
        break;
      case 7:
        shoes[0][2] = "knee high";
        shoes[2] += either(0, 1); /*+sexy or -cute*/
        break;
      case 8:
        shoes[0][2] = "over knee";
        shoes[2] += either(1, 2); /*+sexy or -cute*/
        break;
      case 9:
        shoes[0][2] = "heeled";
        shoes[2] += either(1, 2, 3); /*+sexy or -cute*/
        break;
      case 11:
        shoes[0][2] = "gladiator";
        shoes[2] += either(1, 2, 3); /*+sexy or -cute*/
        shoes[3] += either(-2, -1); /*+formal or -casual*/
        break;
      case 12:
        shoes[0][2] = "ballet";
        shoes[2] += either(1, 3, 3); /*+sexy or -cute*/
        shoes[3] += either(-5, -4, -3); /*+formal or -casual*/
        kinky = true;
        break;
      case 13:
        shoes[0][2] = "running";
        athletic = true;
        shoes[3] += either(-2, -1); /*+formal or -casual*/
        break;
    }
    if (args[3] === 0) {
      shoes[9] = either(colorList);
    } else {
      shoes[9] = args[3];
    }
    switch (shoes[9]) {
      case 0:
        shoes[0][0] = "flesh";
        break;
      case 1:
        shoes[0][0] = "white";
        break;
      case 2:
        shoes[0][0] = "strawberry";
        break;
      case 3:
        shoes[0][0] = "pink";
        break;
      case 4:
        shoes[0][0] = "green";
        break;
      case 6:
        shoes[0][0] = "purple";
        break;
      case 7:
        shoes[0][0] = "light pink";
        break;
      case 8:
        shoes[0][0] = "black";
        break;
      case 13:
        shoes[0][0] = "brown";
        break;
      default:
        shoes[0][0] = "ERROR";
        break;
    }
    shoes[4] = Math.max(0, Math.min(50, Math.floor(shoes[4] * 10)));
    shoes[1] = Math.round(shoes[1]);
    shoes[2] = shoes[2] > 0 ? Math.floor(shoes[2]) : Math.ceil(shoes[2]);
    shoes[3] = shoes[3] > 0 ? Math.floor(shoes[3]) : Math.ceil(shoes[3]);
    /*Define modifiers to clothes based on quality argument args[4]*/
    const atr = [0.75, 1, 1.25, 1.5, 1.75];
    const atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
    const expCap = [25, 30, 40, 50, 50];
    const sexy = [0.6, 0.8, 1, 1.2, 1.4];
    if (shoes[1] < 0) {
      shoes[1] = Math.max(-6, Math.round(shoes[1] * atrNeg[a]));
    } else {
      shoes[1] = Math.round(shoes[1] * atr[a] + random(aw.base.clothingAtrMod.shoes[0], aw.base.clothingAtrMod.shoes[1]));
    }
    shoes[4] = Math.min(expCap[a], shoes[4]);
    shoes[2] = Math.round(shoes[2] * sexy[a]);
    const atrCap = [8, 12, 16, 18, 20];
    if (shoes[1] > atrCap[a]) {
      shoes[1] = atrCap[a];
    }

    // create new key to store the impending clothing item under
    const key = setup.clothes.keyGen();

    // prep values sent to Garment constructor
    const obj: any = {
      key,
      type: "shoes",
      slot: "shoes",
      colorWord: shoes[0][0],
      styleWord: shoes[0][1],
      subStyleWord: shoes[0][2],
      tertiaryWord: shoes[0][3],
      fabricWord: shoes[0][4],
      atr: shoes[1],
      sexy: shoes[2],
      formal: shoes[3],
      style: shoes[6],
      subStyle: shoes[7],
      fabric: "",
      color: shoes[9],
      origin: shoes[10],
      athletic,
      wear: worn,
    };
    // create and store Garment object!
    aw.clothes[key] = new Garment(obj);
    // push key to store inventory!
    ↂ.storeInv.shoes.push(key);
    results.push(key);
    setup.clothesGen.countShoes += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a);
  }
  /*const safe = function() {
    if (setup.clothesGen.countshoes < setup.clothesGen.amtshoes) {
      aw.con.warn(`Bra Generator timed out!`);
      setup.clothesGen.countshoes = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countshoes < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} coats.`);
  return results;
};
