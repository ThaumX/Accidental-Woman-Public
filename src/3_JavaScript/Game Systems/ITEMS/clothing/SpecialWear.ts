if (setup.clothesGen === null || setup.clothesGen === undefined) {
  setup.clothesGen = {} as setupClothesGen;
}

/* ARGUMENTS GEN SWIM BOTTOM
0: quantity
1: style  0: equal, 1: conservative, 2: average (no-fet), 3: sexy (no-fet) 4: sexy + fetish
2: fabric  0: all, 1: normal, 2: normal + sexy, 3: sexy only
3: color: no options
4: quality -2 to 2
5: store name
*/

Macro.add("genSwimBottom", {
  handler() {
    ↂ.storeInv.swimL = [];
    const result = setup.clothesGen.swimBottom(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`SwimL Generated: ${result}.`);
    } else {
      return this.error("something went wrong with swim bottom generator, check console.");
    }
  },
});

setup.clothesGen.swimBottom = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    State.active.variables.error += ", swimBottom Generator function ran with missing control variables - Passage: " + aw.passage.title;
    aw.con.warn("!swimbottom Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
    return [];
  }
  // aw.con.info(`Running Panties Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countSwimL = 0;
  setup.clothesGen.amtSwimL = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [1, 1, 2, 2, 2, 3, 4, 5, 5, 6],
    [1, 2, 2, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 9],
    [4, 6, 7, 7, 8, 8, 9, 9],
    [8, 9, 9, 10, 10, 11],
  ];
  const styleList = sLists[args[1]] || [1];
  let fabricList;
  switch (args[2]) {
    case 0:
      fabricList = [1, 2, 3, 4, 5, 6];
      break;
    case 1:
      fabricList = [1, 1, 2, 2, 3];
      break;
    case 2:
      fabricList = [3, 3, 3, 4, 4, 5];
      break;
    case 3:
      fabricList = [4, 4, 5, 6, 6];
      break;
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
        panties[0][1] = "high-waist bottom";
        subStyleList = [0, 0, 0, 0, 1, 6];
        panties[1] += either(-5, -5, -5, -4); /*attractiveness*/
        panties[2] += either(0, 0, 0, 0, -1); /*+sexy or -cute*/
        panties[3] += either(-3, -3, -4, -2); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 2:
        panties[0][1] = "skirted bottom";
        subStyleList = [0, 0, 0, 1, 1, 2, 6];
        panties[1] += either(-4, -3, -3, -3, -2); /*attractiveness*/
        panties[2] += either(0, -1, 1, 0); /*+sexy or -cute*/
        panties[3] += either(-4, -3, -2, -2, -2, -2, -1); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 3:
        panties[0][1] = "high-cut bottom";
        subStyleList = [0, 0, 0, 1, 1, 6];
        panties[1] += either(-2, -2, -1); /*attractiveness*/
        panties[2] += either(-1, -1, -2, 0); /*+sexy or -cute*/
        panties[3] += either(-2, -1, -1, 0, 0, 0, 1); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 4:
        panties[0][1] = "bikini";
        subStyleList = [0, 0, 0, 0, 0, 2, 2, 3, 3, 4, 5, 6];
        panties[1] += either(0, 1); /*attractiveness*/
        panties[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
        panties[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
        panties[4] += either(0.4, 0.3, 0.2, 0.1); /*exposure level 0-5*/
        break;
      case 5:
        panties[0][1] = "boyshorts";
        subStyleList = [0, 0, 0, 0, 0, 2, 4];
        panties[1] += either(0, 0, 0, 1, 2); /*attractiveness*/
        panties[2] += either(-3, -2, -2, -1, -1, -1, -1); /*+sexy or -cute*/
        panties[3] += either(-3, -2, -2, -1); /*+formal or -casual*/
        panties[4] += 0; /*exposure level 0-5*/
        break;
      case 6:
        panties[0][1] = "cheeky"; // tanga
        subStyleList = [0, 0, 0, 1, 2, 3, 3, 4, 4, 5];
        panties[1] += either(0, 1, 1, 2); /*attractiveness*/
        panties[2] += either(0, 1, 1, 2); /*+sexy or -cute*/
        panties[3] += either(-1, 0, 1); /*+formal or -casual*/
        panties[4] += either(0.5, 0.6, 0.7); /*exposure level 0-5*/
        break;
      case 7:
        panties[0][1] = "thong";
        subStyleList = [0, 0, 0, 2, 2, 3, 4, 4, 4, 5, 6];
        panties[1] += either(1, 2, 2, 3); /*attractiveness*/
        panties[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
        panties[3] += 0; /*+formal or -casual*/
        panties[4] += 1; /*exposure level 0-5*/
        break;
      case 8:
        panties[0][1] = "V bottom";
        subStyleList = [0, 0, 0, 0, 0, 4, 4, 4, 6];
        panties[1] += either(2, 3, 3, 4); /*attractiveness*/
        panties[2] += either(2, 3, 3, 4); /*+sexy or -cute*/
        panties[3] += either(0, 1, 2); /*+formal or -casual*/
        panties[4] += 1.5; /*exposure level 0-5*/
        break;
      case 9:
        panties[0][1] = "G-string bottom";
        subStyleList = [0, 0, 0, 0, 0, 0, 2, 3, 3, 4, 4, 4, 5, 5, 6];
        panties[1] += either(3, 3, 4); /*attractiveness*/
        panties[2] += either(1, 2, 3, 3, 4); /*+sexy or -cute*/
        panties[3] += either(1, 2, 3); /*+formal or -casual*/
        panties[4] += either(2, 1.5); /*exposure level 0-5*/
        access.ass = true;
        break;
      case 10:
        panties[0][1] = "micro G-string";
        subStyleList = [0, 0, 0, 2, 3, 3, 4, 4, 4, 5, 5];
        panties[1] += either(4, 5, 5); /*attractiveness*/
        panties[2] += either(4, 5, 5); /*+sexy or -cute*/
        panties[3] += 0; /*+formal or -casual*/
        panties[4] += either(4, 4.3, 4.6); /*exposure level 0-5*/
        access.pussy = true;
        access.ass = true;
        kinky = true;
        fabricList.delete(1);
        break;
      case 11:
        panties[0][1] = "nano G-string";
        subStyleList = [0, 4, 4];
        panties[1] += either(4, 5, 6); /*attractiveness*/
        panties[2] += either(4, 5, 5); /*+sexy or -cute*/
        panties[3] += either(-2, -1); /*+formal or -casual*/
        panties[4] += either(4.8, 4.5, 4.8); /*exposure level 0-5*/
        access.pussy = true;
        access.ass = true;
        fabricList.delete(1);
        kinky = true;
        break;
      case 12:
        panties[0][1] = "string bottom";
        subStyleList = [0, 4, 4];
        panties[1] += either(5, 6); /*attractiveness*/
        panties[2] += either(5, 6); /*+sexy or -cute*/
        panties[3] += either(-2, -1); /*+formal or -casual*/
        panties[4] += either(4.8, 5, 5); /*exposure level 0-5*/
        access.pussy = true;
        access.ass = true;
        worn.push("spreadOpen");
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
        panties[0][2] = "frilled";
        panties[1] += either(0, 0.3, 0.5); /*attractiveness*/
        panties[2] += either(-2, -1, -0.5, 0); /*+sexy or -cute*/
        break;
      case 2:
        panties[0][2] = "low-back";
        panties[1] += either(0, 0.5, 1, 1); /*attractiveness*/
        panties[2] += either(0, 1, 1); /*+sexy or -cute*/
        panties[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
        panties[4] += either(0.2, 0.3, 0.4, 0.5); /*exposure level 0-5*/
        break;
      case 3:
        panties[0][2] = "V-back";
        panties[1] += either(0, 0.5, 1, 1); /*attractiveness*/
        panties[2] += either(1, 1, 1.5, 2, 2.5); /*+sexy or -cute*/
        panties[4] += either(0.2, 0.3, 0.4, 0.5); /*exposure level 0-5*/
        break;
      case 4:
        panties[0][2] = "low-waist";
        panties[1] += either(1, 2, 3); /*attractiveness*/
        panties[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
        panties[4] += either(0.4, 0.5, 0.6, 0.7); /*exposure level 0-5*/
        break;
      case 5:
        panties[0][2] = "V-front";
        panties[1] += either(1, 2, 3); /*attractiveness*/
        panties[2] += either(1, 1, 2, 2); /*+sexy or -cute*/
        panties[4] += either(0.8, 0.6, 0.7, 0.9); /*exposure level 0-5*/
        break;
      case 6:
        panties[0][2] = "open-paneled";
        panties[1] += either(1, 2, 3); /*attractiveness*/
        panties[2] += either(1, 1, 2, 2); /*+sexy or -cute*/
        panties[4] += either(1.1, 1.2, 1.3); /*exposure level 0-5*/
        break;
    }
    /*fabrics: 0-cotton, 1-cotton blend, 2-lycra, 3-cotton knit, 4-nylon, 5-silk, 6-sheer nylon, 7-can't remember, 8-lingerie mesh, transparent latex */
    panties[8] = either(fabricList);
    switch (panties[8]) {
      case 1:
        panties[0][4] = "padded blend";
        panties[1] += either(-1.5, 0, -1, -0.5); /*attractiveness*/
        panties[2] += either(-2, -2, -1); /*+sexy or -cute*/
        panties[3] += either(1, 1, 0); /*+formal or -casual*/
        break;
      case 2:
        panties[0][4] = "Poly-cotton";
        panties[1] += either(1, 0, 1.5, 2); /*attractiveness*/
        panties[2] += either(0, -1, -1); /*+sexy or -cute*/
        panties[3] += either(0, 0, 1); /*+formal or -casual*/
        break;
      case 3:
        panties[0][4] = "nylon-lycra";
        panties[1] += either(1, 2, 3); /*attractiveness*/
        panties[2] += either(0, 2, 1); /*+sexy or -cute*/
        panties[3] += either(0, 0, 1); /*+formal or -casual*/
        panties[4] += either(0.1, 0.3, 0.2); /*exposure level 0-5*/
        break;
      case 4:
        panties[0][4] = "microfiber";
        panties[1] += either(1, 2, 2, 3); /*attractiveness*/
        panties[2] += either(3, 4, 5); /*+sexy or -cute*/
        panties[3] += either(1, 1, 2); /*+formal or -casual*/
        panties[4] += either(0.5, 0.8, 1); /*exposure level 0-5*/
        break;
      case 5:
        panties[0][4] = "crochet";
        panties[1] += either(2, 3, 3, 4); /*attractiveness*/
        panties[2] += either(4, 4, 5, 6); /*+sexy or -cute*/
        panties[3] += either(0, 1, 2); /*+formal or -casual*/
        panties[4] += either(0.5, 0.8, 1, 1.2); /*exposure level 0-5*/
        break;
      case 6:
        panties[0][4] = "fishnet";
        panties[1] += either(4, 5, 5, 6); /*attractiveness*/
        panties[2] += either(5, 6, 7, 8); /*+sexy or -cute*/
        panties[3] += either(-2, -1, 0); /*+formal or -casual*/
        panties[4] += either(2.5, 2.8, 3); /*exposure level 0-5*/
        break;
    }
    /*color: 0-beige, 1-white, 2-pink, 4-pastel blue, 5-pastel green, 6-pastel yellow, 7-pastel purple, 8-black, 9-red */
    /*pattern: A-none, B-striped, C-checked, D-flower print ????? */
    colorList = [1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 8, 8, 9, 9, 10, 10, 11, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 26];
    panties[9] = either(colorList);
    panties[2] += either(0, 1, 2);
    panties[1] += either(0, 1, 0);
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
      panties[1] = Math.round(panties[1] * atr[a] + random(aw.base.clothingAtrMod.swimBottom[0], aw.base.clothingAtrMod.swimBottom[1]));
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
      type: "swimBottom",
      slot: "panties",
      colorWord: setup.clothes.colorWord(panties[9]),
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
      swimwear: true,
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
    ↂ.storeInv.swimL.push(key);
    results.push(key);
    setup.clothesGen.countSwimL += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a, fabricList);
  }
  /*const safe = function() {
    if (setup.clothesGen.countSwimL < setup.clothesGen.amtSwimL) {
      aw.con.warn(`Panty Generator timed out!`);
      setup.clothesGen.countSwimL = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.countSwimL < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} panties.`);
  return results;
};

/* ARGUMENTS - GEN SWIM TOP
0: quantity
1: style  0: equal, 1: conservative, 2: average (no-fet), 3: sexy (no-fet) 4: sexy + some fetish, 5: super sexyfetish
2: fabric  0: all, 1: normal, 2: normal + sexy, 3: sexy only
3: color: no options
4: quality -2 to 2
5: store name
*/
Macro.add("genSwimTop", {
  handler() {
    ↂ.storeInv.swimU = [];
    const result = setup.clothesGen.swimTop(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5]);
    if (Array.isArray(result)) {
      // aw.con.info(`SwimU Generated: ${result}.`);
    } else {
      return this.error("something went wrong with swim top generator, check console.");
    }
  },
});

setup.clothesGen.swimTop = function(...args: [number, number, number, number, number, string]): string[] {
  if (args.length < 6) {
    aw.con.warn("SwimTop generator ran with insufficient arguments.");
  }
  // aw.con.info(`Running SwimTop Generator with args ${args}`);
  const results: string[] = [];
  setup.clothesGen.countSwimU = 0;
  setup.clothesGen.amtSwimU = args[0];
  const sLists = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [1, 1, 2, 2, 3, 6, 6, 7, 7, 8, 8, 9, 10, 11],
    [1, 2, 3, 3, 4, 4, 7, 8, 9, 9, 10, 10, 11, 11, 11, 12],
    [2, 3, 4, 4, 9, 10, 10, 10, 9, 9, 11, 11, 11, 12, 12, 12, 13, 13 ],
    [3, 4, 4, 4, 5, 9, 10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15],
    [5, 12, 13, 14, 15],
    [3, 3, 3, 3, 2, 2],
  ];
  const styleList = sLists[args[1]] || [1];
  const a = args[4] + 2;
  const genSub = function(styleList, storeName, a, fabArray) {
    let style;
    const access = {
        nip: false,
        pussy: true,
        butt: true,
        tits: false,
        ass: true,
    };
    const worn = ["normal", "off", "strapsOff", "titsOut", "flippedDown"];
    let athletic = false;
    let kinky = false;
    let type = "swimTop";
    let subStyleList;
    let bra;
    let fabricList;
    let colorList;
    switch (args[2]) {
      case 0:
        fabricList = [1, 2, 3, 4, 5, 6];
        break;
      case 1:
        fabricList = [1, 1, 2, 2, 3];
        break;
      case 2:
        fabricList = [3, 3, 3, 4, 4, 5];
        break;
      case 3:
        fabricList = [4, 4, 5, 6, 6];
        break;
    }
    /*bra array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
    bra = [
      ["na", "na", "na", "na", "na", "BR"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0,
    ];
    bra[6] = either(styleList);
    /*substyles: 0-none, 1-lace border, 2-convertible, 3-strapless, 4-lace covered, 5-front fasten, 6-wide strap, 7spaghetti strap*/
    switch (bra[6]) {
      case 1:
        bra[0][1] = "high-neck onepiece";
        subStyleList = [0, 0, 0, 1, 1, 2, 5, 5];
        bra[1] += either(-2, -1, 0, 1); /*attractiveness*/
        bra[2] += either(0, 0, -2, -1, -1); /*+sexy or -cute*/
        bra[3] += either(0, 1, 1, 2); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        type = "swimOnePiece";
        access.pussy = false;
        access.ass = false;
        worn.delete("titsOut");
        worn.push("pulledAside");
        break;
      case 2:
        bra[0][1] = "standard onepiece";
        subStyleList = [0, 0, 0, 1, 1, 3, 2, 5, 5];
        bra[1] += either(-2, -1, -1, 0, -1, 1); /*attractiveness*/
        bra[2] += either(0, 0, -2, -1, -1); /*+sexy or -cute*/
        bra[3] += either(0, 1, 1, 2); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        type = "swimOnePiece";
        access.pussy = false;
        access.ass = false;
        worn.push("pulledAside");
        break;
      case 3:
        bra[0][1] = "athletic onepiece";
        subStyleList = [0, 0, 0, 1, 1, 1, 3, 2];
        bra[1] += either(0, 0, -1, 1, 1); /*attractiveness*/
        bra[2] += either(0, -1, 1, 0, 1, 1); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, 0, 1, 1, 2); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        type = "swimOnePiece";
        access.pussy = false;
        access.ass = false;
        worn.push("pulledAside");
        worn.delete("titsOut");
        athletic = true;
        break;
      case 4:
        bra[0][1] = "strap onepiece";
        subStyleList = [0, 0, 0, 1, 1, 1, 3, 3, 3, 5];
        bra[1] += either( -1, 0, 1, 1, 2, 2); /*attractiveness*/
        bra[2] += either(-1, 0, 1, 1); /*+sexy or -cute*/
        bra[3] += either(-1, -1, 0, 0, 0, 1); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        type = "swimOnePiece";
        access.pussy = false;
        access.ass = false;
        worn.push("pulledAside");
        break;
      case 5:
        bra[0][1] = "sling onepiece";
        subStyleList = [0, 0, 0, 2, 2, 7];
        bra[1] += either(7, 4, 4, 5, 5, 6); /*attractiveness*/
        bra[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, -1, -1, -2, 1); /*+formal or -casual*/
        bra[4] += either(3, 3, 3.5, 4); /*exposure level 0-5*/
        type = "swimOnePiece";
        access.tits = true;
        access.pussy = false;
        access.ass = false;
        worn.push("pulledAside");
        break;
      case 6:
        bra[0][1] = "tankini top";
        subStyleList = [0, 0, 0, 2, 2, 3, 4, 5];
        bra[1] += either(0, -1, -2, 0, 1, 1, 0); /*attractiveness*/
        bra[2] += either(0, -1, -2, -2, 0); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
        bra[4] += 0; /*exposure level 0-5*/
        access.tits = true;
        break;
      case 7:
        bra[0][1] = "flounce top";
        subStyleList = [0, 0, 0, 2, 2, 3, 5];
        bra[1] += either(0, 1, 1, 2, 3); /*attractiveness*/
        bra[2] += either(-1, -1, 0, 1, 1, -2); /*+sexy or -cute*/
        bra[3] += either(-1, -1, -1, -2, -2, -3, 0, 1); /*+formal or -casual*/
        bra[4] += either(0.2, 0.3, 0.4); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 8:
        bra[0][1] = "halter top";
        subStyleList = [0, 0, 0, 2, 2, 3, 3, 4, 5];
        bra[1] += either(0, 1, 1, 2, 2, 3); /*attractiveness*/
        bra[2] += either(0, 1, 1, 2, -1); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
        bra[4] += either(0.3, 0.4, 0.6); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 9:
        bra[0][1] = "bandeau top";
        subStyleList = [0, 0, 0, 2, 3, 3, 4, 5];
        bra[1] += either(2, 3, 3, 4); /*attractiveness*/
        bra[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
        bra[3] += either(0, -1, 1); /*+formal or -casual*/
        bra[4] += either(1, 1.5, 2); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 10:
        bra[0][1] = "strapless";
        subStyleList = [0, 0, 0, 2, 3, 3, 3, 4, 5];
        bra[1] += either(3, 4); /*attractiveness*/
        bra[2] += either(5, 4, 3, 3, 4); /*+sexy or -cute*/
        bra[3] += either(-1, 0, 1); /*+formal or -casual*/
        bra[4] += either(1.2, 1.8, 2.2); /*exposure level 0-5*/
        access.tits = true;
        kinky = true;
        break;
      case 11:
        bra[0][1] = "bikini top";
        subStyleList = [0, 0, 0, 0, 2, 4, 5];
        bra[1] += either(3, 4, 4, 5); /*attractiveness*/
        bra[2] += either(4, 2, 3); /*+sexy or -cute*/
        bra[3] += either(0, 0, 1, -1, -1); /*+formal or -casual*/
        bra[4] += either(1.8, 2, 2.2); /*exposure level 0-5*/
        access.tits = true;
        worn.delete("titsOut");
        break;
      case 12:
        bra[0][1] = "mini bikini top";
        subStyleList = [0, 0, 0, 2, 6, 5];
        bra[1] += either(4, 5); /*attractiveness*/
        bra[2] += either(3.5, 4, 4.5); /*+sexy or -cute*/
        bra[3] += either(0, -2, 0, -1, -1); /*+formal or -casual*/
        bra[4] += either(2.5, 2.8); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 13:
        bra[0][1] = "micro bikini top";
        subStyleList = [0, 0, 0, 2, 6];
        bra[1] += either(4, 5, 5, 6, 6); /*attractiveness*/
        bra[2] += either(4.5, 5, 5); /*+sexy or -cute*/
        bra[3] += either(0, -2, -1, -2, -1); /*+formal or -casual*/
        bra[4] += either(3, 3.2, 3.5); /*exposure level 0-5*/
        access.tits = true;
        break;
      case 14:
        bra[0][1] = "nano bikini top";
        subStyleList = [0, 0, 0, 7, 6, 7];
        bra[1] += either(6, 6, 7); /*attractiveness*/
        bra[2] += either(5, 6, 6); /*+sexy or -cute*/
        bra[3] += either(0, -2, -1, -2, -1); /*+formal or -casual*/
        bra[4] += either(3.8, 4, 4.2); /*exposure level 0-5*/
        access.tits = true;
        access.nip = true;
        kinky = true;
        fabricList.delete(1);
        fabricList.delete(5);
        break;
      case 15:
        bra[0][1] = "open bikini top";
        subStyleList = [0, 0, 0, 0, 6];
        bra[1] += either(7, 7, 8); /*attractiveness*/
        bra[2] += either(6, 6, 7); /*+sexy or -cute*/
        bra[3] += either(0, -2, -1, -2, -1); /*+formal or -casual*/
        bra[4] += 5; /*exposure level 0-5*/
        access.tits = true;
        access.nip = true;
        worn.delete("titsOut"); // tits are already out!
        fabricList.delete(1);
        fabricList.delete(5);
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
        bra[0][2] = "high-leg";
        bra[1] += either(0, 0.3, 0.5); /*attractiveness*/
        if (bra[2] >= 0) {
          bra[2] += either(0, 0.5, 1);
        } /*+sexy or -cute*/
        bra[4] += either(0.1, 0.2, 0.3); /*exposure level 0-5*/
        break;
      case 2:
        bra[0][2] = "cutout";
        bra[1] += either(0, 0.5, 1, 2, 0.5); /*attractiveness*/
        bra[2] += either(1, 1, 2); /*+sexy or -cute*/
        bra[3] += either(0, -1, 0); /*+formal or -casual*/
        bra[4] += either(0.4, 0.6, 0.8); /*exposure level 0-5*/
        if (bra[6] > 10) {
          bra[2] += 1;
          bra[4] += either(0.2, 0.4, 0.6);
        }
        break;
      case 3:
        bra[0][2] = "plunge";
        bra[1] += either(0, 0.5, 1, 2, 0.5); /*attractiveness*/
        bra[2] += either(1, 1, 2); /*+sexy or -cute*/
        bra[3] += either(0, -1, 0); /*+formal or -casual*/
        bra[4] += either(0.3, 0.5, 0.7); /*exposure level 0-5*/
        break;
      case 4:
        bra[0][2] = "fringe";
        bra[1] += either(-1, 0, 0, 0, -1, 1); /*attractiveness*/
        if (bra[2] >= 0) {
          bra[2] += either(0, 0, -1);
        } else {
          bra[2] += either(-3, -2, -1);
        } /*+sexy or -cute*/
        bra[3] += either(0, 0, 1, 1, 2); /*+formal or -casual*/
        if (bra[4] >= 0.3) {
          bra[4] += -0.3; /*exposure level 0-5*/
        }
        break;
      case 5:
        bra[0][2] = "decorative";
        bra[1] += either(-1, 0, 0, 0.5, 0.5); /*attractiveness*/
        bra[2] += either(-2, -1, 0);
        break;
      case 6:
        bra[0][2] = "oval-cup";
        bra[1] += either(1, 2, 2, 1, 3); /*attractiveness*/
        if (bra[2] > 0) {
          bra[2] += either(1, 1, 1, 2, 2);
        } /*+sexy or -cute*/
        bra[4] += either(-0.3, -0.4, -0.4, -0.5); /*exposure level 0-5*/
        break;
      case 7:
        bra[0][2] = "extreme";
        bra[1] += either(1, 2); /*attractiveness*/
        bra[2] += either(1, 2); /*+sexy or -cute*/
        bra[4] = 4.7; /*exposure level 0-5*/
        break;
    }
    /*fabrics: 0Cotton Blend, 1Cotton Knit, 2Microfiber, 3Satin, 4Embroidery, 5Lace, 6Guipure, 7Tulle, 8translucent-latex */

    bra[8] = either(fabricList);
    switch (bra[8]) {
      case 1:
        bra[0][4] = "padded blend";
        bra[1] += either(-1.5, 0, -1, -0.5); /*attractiveness*/
        bra[2] += either(-2, -2, -1); /*+sexy or -cute*/
        bra[3] += either(1, 1, 0); /*+formal or -casual*/
        break;
      case 2:
        bra[0][4] = "Poly-cotton";
        bra[1] += either(1, 0, 1.5, 2); /*attractiveness*/
        bra[2] += either(0, -1, -1); /*+sexy or -cute*/
        bra[3] += either(0, 0, 1); /*+formal or -casual*/
        break;
      case 3:
        bra[0][4] = "nylon-lycra";
        bra[1] += either(1, 2, 3); /*attractiveness*/
        bra[2] += either(0, 2, 1); /*+sexy or -cute*/
        bra[3] += either(0, 0, 1); /*+formal or -casual*/
        bra[4] += either(0.1, 0.3, 0.2); /*exposure level 0-5*/
        break;
      case 4:
        bra[0][4] = "microfiber";
        bra[1] += either(1, 2, 2, 3); /*attractiveness*/
        bra[2] += either(3, 4, 5); /*+sexy or -cute*/
        bra[3] += either(1, 1, 2); /*+formal or -casual*/
        bra[4] += either(0.5, 0.8, 1); /*exposure level 0-5*/
        break;
      case 5:
        bra[0][4] = "crochet";
        bra[1] += either(2, 3, 3, 4); /*attractiveness*/
        bra[2] += either(4, 4, 5, 6); /*+sexy or -cute*/
        bra[3] += either(0, 1, 2); /*+formal or -casual*/
        bra[4] += either(1, 1.3, 1.7, 2); /*exposure level 0-5*/
        break;
      case 6:
        bra[0][4] = "fishnet";
        bra[1] += either(4, 5, 5, 6); /*attractiveness*/
        bra[2] += either(5, 6, 7, 8); /*+sexy or -cute*/
        bra[3] += either(-2, -1, 0); /*+formal or -casual*/
        bra[4] += either(2.5, 2.8, 3); /*exposure level 0-5*/
        break;
    }
    colorList = [1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 8, 8, 9, 9, 10, 10, 11, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 26];
    bra[9] = either(colorList);
    bra[0][0] = setup.clothes.colorWord(bra[9]);
    bra[1] += either(-1, 0, 1, 1);
    bra[3] += either(-2, -1, 0); /*+formal or -casual*/
    if (bra[2] > 0) {
      bra[2] += either(1, 1, 2); /*+sexy or -cute*/
    } else {
      bra[2] += either(-2, -1, -1); /*+sexy or -cute*/
    }
    if (bra[6] === 14 && bra[4] < 4.5) {
      bra[4] = 4.5;
    }
    bra[4] = Math.max(0, Math.min(48, Math.floor(bra[4] * 10)));
    if (bra[6] === 15) {
      bra[4] = 50;
    }
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
      let m;
      if (type === "swimTop") {
        m = random(aw.base.clothingAtrMod.swimTop[0], aw.base.clothingAtrMod.swimTop[1]);
      } else {
        m = random(aw.base.clothingAtrMod.swimOnePiece[0], aw.base.clothingAtrMod.swimOnePiece[1]);
      }
      bra[1] = Math.round(bra[1] * atr[a] + m);
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
      swimwear: true,
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
    ↂ.storeInv.swimU.push(key);
    results.push(key);
    setup.clothesGen.countSwimU += 1;
  };
  for (let i = 0; i < args[0]; i++) {
    genSub(styleList, args[5], a, args[2]);
  }
  /*const safe = function() {
    if (setup.clothesGen.countSwimU < setup.clothesGen.amtSwimU) {
      aw.con.warn(`SwimTop Generator timed out!`);
      setup.clothesGen.countSwimU = 100000;
    }
  };
  setTimeout(() => safe(), 3000);
  while (setup.clothesGen.amtSwimU < args[0]) { }*/
  // aw.con.info(`Generated ${args[0]} bras.`);
  return results;
};
