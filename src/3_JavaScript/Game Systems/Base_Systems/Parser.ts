/*
/  ██████╗  █████╗ ██████╗ ███████╗███████╗██████╗
/  ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗
/  ██████╔╝███████║██████╔╝███████╗█████╗  ██████╔╝
/  ██╔═══╝ ██╔══██║██╔══██╗╚════██║██╔══╝  ██╔══██╗
/  ██║     ██║  ██║██║  ██║███████║███████╗██║  ██║
/  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
*/

/*********************************************************************
Macros - p for player, n for npc
arg 0: NPC ID or activeNPC index to use. (set to player for <<p macro)
arg 1: parser call (command) determining what to return.
arg [...] optional modifier settings for the parser.
*********************************************************************/

Macro.add("p", {
  handler() {
    if (this.args.length < 1) {
      return this.error("The player parser requires at least 1 argument to generate output.");
    }
    let out;
    if (this.args.length > 1) {
      const arg: any[] = [];
      for (let i = 1, c = this.args.length; i < c; i++) {
        arg.push(this.args[i]);
      }
      out = aw.parse(-1, this.args[0], arg);
    } else {
      out = aw.parse(-1, this.args[0]);
    }
    if (out == null || out === false) {
      out = `[PARSE ERROR: no return value "${this.args[0]}"]`;
    }
    return new Wikifier(this.output, out);
  },
});

Macro.add("w", {
  handler() {
    if (this.args.length < 1) {
      return this.error("The word parser requires at least 1 argument to generate output.");
    }
    let out;
    if (this.args.length > 1) {
      const arg: any[] = [];
      for (let i = 1, c = this.args.length; i < c; i++) {
        arg.push(this.args[i]);
      }
      out = aw.parse("word", this.args[0], arg);
    } else {
      out = aw.parse("word", this.args[0]);
    }
    if (out == null || out === false) {
      out = `[PARSE ERROR: no return value "${this.args[0]}"]`;
    }
    return new Wikifier(this.output, out);
  },
});

Macro.add("n", {
  handler() {
    if (this.args.length < 1) {
      return this.error("The NPC parser requires at least 2 arguments to generate output.");
    }
    let out;
    const npc = this.args[0];
    if ("number" === typeof npc) {
      // check if valid
      if (npc < 0 || npc > 9) {
        return this.error(`Parser error - Out-of-bounds NPC index(${npc}). Must be 0 to 9.`);
      } else if (npc >= State.active.variables.activeNPC.length) {
        // TODO convert to soft fail w/ console error (reduce index val) when parser more mature.
        return this.error(`Parser error - Invalid NPC index (${npc}). No NPC active at that index. (total NPCs ${State.active.variables.activeNPC.length}).`);
      }
    } else if ("string" === typeof npc) {
      // check if valid
      const keys = Object.keys(aw.npc);
      if (!keys.includes(npc)) {
        return this.error(`Parser error - NPC "${npc}" doesn't exist.`);
      }
    } else {
      return this.error("Invalid NPC id given to parser macro, must be index # or npcid.");
    }
    if (this.args.length > 2) {
      const arg: any[] = [];
      for (let i = 2, c = this.args.length; i < c; i++) {
        arg.push(this.args[i]);
      }
      out = aw.parse(npc, this.args[1], arg);
    } else {
      out = aw.parse(npc, this.args[1]);
    }
    if (out == null || out === false) {
      out = `[PARSE ERROR: no return value "${this.args[1]}"]`;
    }
    return new Wikifier(this.output, out);
  },
});

/* --------------------------------------------------
    Handy Macros!
-------------------------------------------------- */

Macro.add("he", {
  handler() {
    if (this.args.length > 1) {
      return this.error("The he macro requires a single argument, the npcid. <<he npcid>>");
    }
    let arg;
    if (this.args.length === 1) {
      arg = this.args[0];
    } else if (State.temporary.t != null) {
      arg = State.temporary.t;
    } else {
      return this.error("The he macro requires a single argument, the npcid. <<he npcid>>");
    }
    const out = aw.parse(arg, "heshe.q");
    return new Wikifier(this.output, out);
  },
});

Macro.add("him", {
  handler() {
    if (this.args.length > 1) {
      return this.error("The he macro requires a single argument, the npcid. <<he npcid>>");
    }
    let arg;
    if (this.args.length === 1) {
      arg = this.args[0];
    } else if (State.temporary.t != null) {
      arg = State.temporary.t;
    } else {
      return this.error("The he macro requires a single argument, the npcid. <<he npcid>>");
    }
    const out = aw.parse(arg, "himher.q");
    return new Wikifier(this.output, out);
  },
});

Macro.add("his", {
  handler() {
    if (this.args.length > 1) {
      return this.error("The he macro requires a single argument, the npcid. <<he npcid>>");
    }
    let arg;
    if (this.args.length === 1) {
      arg = this.args[0];
    } else if (State.temporary.t != null) {
      arg = State.temporary.t;
    } else {
      return this.error("The he macro requires a single argument, the npcid. <<he npcid>>");
    }
    const out = aw.parse(arg, "hisher.q");
    return new Wikifier(this.output, out);
  },
});


/*************************************************
    MAIN FUNCTION
*************************************************/

aw.parse = function(npc: string|number, cmd: string, ...args: any[]): string {
  const ᛔ = State.active.variables; // sortcut reference
  const target = getReference(); // get ref to target - function is hoisted
  cmd = parseCmd(cmd);
  /******************************************************
   * Command Handling - fetch word from subfunction
   */
  function runCommand() {
    const chk = cmd.search(/\./);
    let func;
    if (chk < 2) {
      func = "none";
    } else {
      func = cmd.slice(chk + 1);
      cmd = cmd.slice(0, chk);
    }
    if (func === "adj" || func === "a") {
      // adjective request
    } else if (func === "noun" || func === "n") {
      // noun request
      switch (cmd) {
        case "ass":
        case "butt":
          return noun.ass();
        case "anus":
        case "asshole":
        case "butthole":
          return noun.asshole();
        case "buttcheek":
        case "asscheek":
          return noun.buttcheek();
        case "breast":
        case "tit":
        case "boob":
          return noun.breast();
        case "breasts":
        case "tits":
        case "boobs":
          return noun.breasts();
        case "nipple":
        case "nip":
          return noun.nipple();
        case "nipples":
        case "nips":
          return noun.nipples();
        case "chest":
          return noun.chest();
        case "cock":
        case "dick":
        case "penis":
          return noun.cock();
        case "cocks":
        case "dicks":
        case "penises":
          return noun.cocks();
        case "cockhead":
          return noun.cockhead();
        case "ball":
        case "nut":
        case "testicle":
          return noun.ball();
        case "balls":
        case "nuts":
        case "testicles":
          return noun.balls();
        case "sack":
        case "ballsack":
        case "scrotum":
          return noun.sack();
        case "clit":
          return noun.clit();
        case "pussy":
        case "cunt":
        case "vagina":
          return noun.pussy();
        case "vulva":
        case "slit":
        case "labia":
          return noun.vulva();
        case "womb":
        case "uterus":
          return noun.uterus();
        case "cum":
        case "semen":
        case "jizz":
          return noun.semen();
        case "mouth":
          return noun.mouth();
        case "belly":
          return noun.belly();
        default:
          return `parser error - ${cmd}.n function unavailable`;
      }
    } else if (func === "desc" || func === "d") {
      // detailed description
    } else if (func === "verb" || func === "v") {
      // verb-type stuff, like tit-sway or poundin'
    } else if (func === "size" || func === "qual" || func === "s" || func === "q") {
      // Qualitative request
      let v: any = null;
      let m: number = 0;
      if (npc === "word") { // must supply a value - no ref'd character
        v = args[0];
        if (isNaN(v)) {
          return `[Parser Error - invalid value argument (${v})]`;
        }
      }
      const tso: any = "mod";
      if (args.includes("mod")) {// modifier value supplied
        const q = args.findIndex(tso) + 1;
        m = args[q];
      }
      let ar;
      switch (cmd) {
        case "ass":
        case "butt":
          return qual.ass(v, m);
        case "anus":
        case "butthole":
        case "asshole":
          return qual.asshole(v, m);
        case "pussy":
        case "vagina":
        case "cunt":
          return qual.pussy(v, m);
        case "breast":
        case "boob":
        case "tit":
        case "breasts":
        case "boobs":
        case "tits":
          return qual.breast(v, m);
        case "brasize":
          return qual.braSize(v, m);
        case "cupsize":
          return qual.cupSize(v, m);
        case "nomilkcup":
        case "cupsizenm":
          return qual.cupSizeNM(v, m);
        case "nomilkbra":
        case "brasizenm":
          return qual.braSizeNM(v, m);
        case "shoulder":
        case "shoulders":
          return qual.shoulder(v, m);
        case "hip":
        case "hips":
          return qual.hips(v, m);
        case "pelvis":
        case "gap":
          return qual.pelvis(v, m);
        case "buttshape":
        case "assshape":
        case "asshape":
          return qual.buttShape();
        case "fert":
        case "fertility":
          return qual.fertility(v, m);
        case "tone":
        case "muscle":
        case "muscles":
          return qual.tone(v, m);
        case "weight":
        case "fat":
          return qual.weight(v, m);
        case "clit":
          return qual.clit(v, m);
        case "wetness":
        case "natwet":
        case "natwetness":
          return qual.wetness(v, m);
        case "wet":
        case "curwet":
        case "curwetness":
          return qual.curwet(v, m);
        case "labia":
          return qual.labia(v, m);
        case "clitview":
          return qual.clitview();
        case "waist":
          return qual.waist(v, m);
        case "beauty":
          return qual.beauty(v, m);
        case "facetype":
          return qual.faceType(v);
        case "lips":
          return qual.lips(v, m);
        case "niplength":
        case "nipl":
          return qual.nipLength(v, m);
        case "nipwidth":
        case "nipw":
          return qual.nipWidth(v, m);
        case "areola":
        case "areolasize":
        case "areolawidth":
          return qual.areolaSize(v, m);
        case "areolapuffy":
        case "nipplepuffy":
          return qual.areolaPuffy(v, m);
        case "breastshape":
        case "boobshape":
        case "titshape":
          return qual.breastShape(v, m);
        case "arousal":
          return qual.arousal(v, m);
        case "libido":
          return qual.libido(v, m);
        case "pubelength":
        case "pubeslength":
        case "pubel":
        case "pubesl":
          return qual.pubeLength(v, m);
        case "pubestyle":
        case "pubesstyle":
          return qual.pubeStyle();
        case "pubeshape":
        case "pubesshape":
          return qual.pubeShape(v, m);
        case "pubewet":
        case "pubeswet":
          return qual.pubeWet(v, m);
        case "pubecolor":
        case "pubescolor":
          return qual.pubeColor(v, m);
        case "leghairlength":
        case "leghairl":
        case "leghair":
          return qual.legHairLength(v, m);
        case "armpitlength":
        case "armpitl":
        case "armpit":
          return qual.armpitLength(v, m);
        case "haircurl":
          return qual.hairCurl(v, m);
        case "hairlength":
        case "hairl":
          return qual.hairLength(v, m);
        case "hairstyle":
          return qual.hairStyle(v, m);
        case "haircolor":
          return qual.hairColor(v, m);
        case "tall":
          return qual.height(v, m);
        case "height":
        case "heightNum":
          return qual.heightNum(v, m);
        case "jaw":
          return qual.jaw(v, m);
        case "brow":
          return qual.brow(v, m);
        case "age":
          return qual.age(v, m);
        case "cock":
        case "cocksize":
          return qual.cockSize(v, m);
        case "cockcircum":
        case "circum":
          return qual.cockCircum();
        case "cockstr":
        case "cockhard":
        case "hardness":
          return qual.cockStr(v, m);
        case "cockhead":
          return qual.cockHead();
        case "cockgirth":
        case "cgirth":
        case "cockg":
          return qual.cockGirth(v, m);
        case "cocklength":
        case "clength":
        case "cockl":
        case "cocklong":
          return qual.cockLength(v, m);
        case "ballsize":
        case "balls":
          return qual.ballSize(v, m);
        case "ballsack":
          return qual.ballsack(v, m);
        case "ballsag":
          return qual.ballsag(v, m);
        case "pronounheshe":
        case "proheshe":
        case "pheshe":
        case "heshe":
          return qual.pronounHEshe(v, m);
        case "pronounhishers":
        case "prohishers":
        case "phishers":
        case "hishers":
          return qual.pronounHIShers(v, m);
        case "pronounhisher":
        case "prohisher":
        case "phisher":
        case "hisher":
          return qual.pronounHISher(v, m);
        case "pronounhimher":
        case "prohimher":
        case "phimher":
        case "himher":
          return qual.pronounHIMher(v, m);
        case "race":
          return qual.race(v, m);
        case "skincolor":
          return qual.skinColor(v, m);
        case "energy":
          return qual.energy(v, m);
        case "health":
          return qual.health(v, m);
        case "pregBelly":
        case "pregbelly":
          return qual.pregBelly(v, m);
        case "babysize":
        case "babySize":
          return qual.babySize(v, m);
        case "makeup":
          return qual.makeup(v, m);
        case "makeuplip":
        case "makeupl":
          return qual.makeupLip(v, m);
        case "makeupeye":
        case "makeupe":
          return qual.makeupEye(v, m);
        case "makeupgen":
        case "makeupg":
          return qual.makeupGen(v, m);
        case "clothesformal":
        case "clothesf":
          return qual.clothesFormal(v, m);
        case "clothessexy":
        case "clothess":
          return qual.clothesSexy(v, m);
        case "clothesatr":
        case "clothesa":
          return qual.clothesAtr(v, m);
        case "clothesqual":
        case "clothesq":
          return qual.clothesQual(v, m);
        case "clothesexp":
        case "clothese":
        case "clothesx":
          return qual.clothesExp(v, m);
        case "tail":
        case "tailDesc":
          return qual.tail_descript(v, m);
        case "ear":
        case "ears":
          return qual.ear_descript(v, m);
        case "qual":
          ar = Object.keys(qual);
          return `There are ${ar.length} qualitative parser functions.`;
        default:
          return `parser error - ${cmd}.s function unavailable`;
      }
    } else if (func === "none") {
      // standard description
      if (npc === "word") {
        return "[parser error: nontargeted call with compound function.]";
      }
      switch (cmd) {
        case "tits":
        case "breasts":
        case "boobs":
          return qual.COMP_breasts();
      }
    } else {
      return `[Parsing Error: bad command function {${func}}]`;
    }
  }
  /******************************************************
   * Section for compound word functions
   * ****************************************************/
  const compound = {}; // neutered due to uglifyJS issues
  /******************************************************
   * Section for single word functions
   * ****************************************************/
  const adj = {};
  /*SIZE LIBRARY*/
  const qual = {
    COMP_breasts(): string {
      let non;
      let size;
      if (target.status.milk > 0 && random(1, 2) === 2) {
        non = eth("milky", "leaking", "lactating", "milky") + " " + noun.breasts();
      } else {
        non = noun.breasts();
      }
      if (random(1, 2) === 2) {
        size = qual.breast(null, 0) + " ";
      } else if (random(1, 2) === 2) {
        size = qual.breastShape(null, 0) + " ";
      } else {
        size = "";
      }
      return size + non;
    },
    tail_descript(size, mod) {
      if (size == null) {
        size = target.body.tail;
      }
      switch (size) {
        case "none":
          return "tailless behind";
        case "cat":
          return either("agile feline tail", "long furry cat tail");
        case "dog":
          return either("short fluffy dog tail", "stout canine tail");
        case "fox":
          return either("long fluffy fox tail", "soft poofy fox tail");
        case "cow":
          return either("delicate tufted hucow tail", "long hucow tail with a poof at the end");
      }
      return "[error tail description]";
    },
    ear_descript(size, mod) {
      if (size == null) {
        size = target.body.ears;
      }
      switch (size) {
        case "cat":
          return either("fluffy cat ears", "pointed feline ears") + either(" rest atop your head", " peak out from your hair");
        case "dog":
          return either("floppy dog ears", "hairy canine ears") + either(" rest atop your head", " peak out from your hair");
        case "fox":
          return either("furry fox ears", "long fox ears") + either(" rest atop your head", " peak out from your hair");
        case "cow":
          return either("floppy hucow ears", "delicate hucow ears") + either(" extend from the sides of your head", " peak out from your hair");
        case "normal":
          return either("normal ears", "average ears");
        case "large":
          return either("big ears", "large ears");
        case "protruding":
          return either("protruding ears", "obvious ears");
        case "cauliflower":
          return either("cauliflower ears", "boxer's ears");
      }
      return "[error ear description]";
    },
    ass(size, mod = 0) {
      if (size == null) {
        size = target.body.ass;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
        case 1:
          return eth("flat", "flat", "nonexistent", "tiny");
        case 2:
          return eth("small", "small", "insubstantial", "compact");
        case 3:
          return eth("average", "healthy", "healthy", "ordinary");
        case 4:
          return eth("womanly", "plump", "sexy");
        case 5:
          return eth("large", "substantial", "huge", "sizeable");
        case 6:
        case 7:
          return eth("massive", "enormous", "gigantic");
        case 8:
        case 9:
        case 10:
          return eth("titanic", "monstrous", "humongous");
        default:
          return `[ass-size out of bounds (${size})]`;
      }
    },
    asshole(size, mod = 0) {
      if (size == null) {
        size = target.body.asshole.tight;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("virginal", "virginal", "unused");
        case 1:
        case 2: // tight
          return eth("tight", "tight", "hardly-used", "inexperienced");
        case 3:
        case 4:
        case 5: // avg
          return eth("reasonably-tight", "reasonably-tight", "snug", "barely-yeilding");
        case 6:
        case 7: // little loose
          return eth("experienced", "somewhat-loose", "experienced");
        case 8:
        case 9: // very loose
          return eth("loose", "well-used", "loose", "easily-yeilding");
        case 10:
        case 11: // gaping
          return eth("gaping", "gaping", "wide-open", "stretched-out");
        case 12:
        case 13:
        case 14: // useless
          return eth("cavernous", "ruined", "cavernous", "mineshaft-like");
        default:
          return `[asshole-size out of bounds (${size})]`;
      }
    },
    pussy(size, mod = 0) {
      if (size == null) {
        size = target.body.pussy.tight;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("virginal", "virginal", "unused");
        case 1:
        case 2: // tight
          return eth("tight", "tight", "hardly-used", "inexperienced");
        case 3:
        case 4:
        case 5: // avg
          return eth("reasonably-tight", "somewhat-tight", "snug", "barely-yeilding");
        case 6:
        case 7: // little loose
          return eth("experienced", "somewhat-loose", "experienced");
        case 8:
        case 9: // very loose
          return eth("loose", "well-used", "loose", "easily-yeilding");
        case 10:
        case 11: // gaping
          return eth("gaping", "gaping", "wide-open", "stretched-out");
        case 12:
        case 13:
        case 14: // useless
          return eth("cavernous", "ruined", "cavernous", "mineshaft-like");
        default:
          return `[pussy-size out of bounds (${size})]`;
      }
    },
    breast(size, mod = 0) {
      if (size == null) {
        if (!target.main.female) {
          return "nonexistent";
        }
        try {
          size = target.body.tits.cupNum;
        } catch (e) {
          size = target.body.tits.cupNum;
        }
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case -1: // male
        case 0: // none
        case 1: // AA-Cup
          return eth("nonexistent", "flat");
        case 2: // small A-cup
        case 3:
        case 4: // large A-cup
          return eth("budding", "bee-sting", "minuscule", "washboard");
        case 5:
        case 6: // B-cup
        case 7:
          return eth("tiny", "very small", "insubstantial", "meager");
        case 8:
        case 9: // C-cup
        case 10:
          return eth("small", "compact", "underdeveloped");
        case 11:
        case 12: // D-Cup
        case 13:
          return eth("below-average", "cute", "petite");
        case 14:
        case 15: // E-Cup
        case 16:
          return eth("average-sized", "healthy", "normal-size");
        case 17:
        case 18: // F-Cup
        case 19:
        case 20:
        case 21: // G-Cup
        case 22:
          return eth("above-average", "full", "full", "ample");
        case 23:
        case 24: // H-Cup
        case 25:
        case 26:
        case 27: // I-Cup
        case 28:
          return eth("large", "big", "heavy", "heavy");
        case 29:
        case 30: // J-Cup
        case 31:
        case 32:
        case 33: // K-Cup
        case 34:
          return eth("huge", "ponderous", "substantial");
        case 35:
        case 36: // L-Cup
        case 37:
        case 38:
        case 39: // M-Cup
        case 40:
        case 41:
        case 42: // N-Cup
        case 43:
          return eth("enormous", "massive", "gigantic");
      }
      if (size < 71) {
        return eth("titanic", "gargantuan", "humongous");
      } else {
        return eth("unbelievably-large", "monstrous", "colossal");
      }
    },
    shoulder(size, mod = 0) {
      if (size == null) {
        size = target.body.shoulders;
      }
      size = Number(size) + Number(mod);
      if (target.main.male && !target.main.female) {
        switch (size) {
          case 1:
          case 2:
            return eth("narrow", "delicate");
          case 3:
            return eth("feminine", "feminine", "sleek");
          case 4:
            return eth("sturdy", "solid", "athletic");
          case 5:
            return eth("manly", "broad", "masculine");
          case 6:
            return eth("hulkish", "very broad", "very broad");
          default:
            return `[shoulder-size out of bounds (${size})]`;
        }
      } else {
        switch (size) {
          case 1:
            return eth("narrow", "delicate");
          case 2:
            return eth("feminine", "feminine", "sleek");
          case 3:
            return eth("sturdy", "solid", "athletic", "large");
          case 4:
            return eth("manly", "broad", "masculine");
          case 5:
          case 6:
            return eth("freakishly-wide", "giantess-like", "very broad", "very broad");
          default:
            return `[shoulder-size out of bounds (${size})]`;
        }
      }
    },
    hips(size, mod = 0) {
      if (size == null) {
        size = target.body.hips;
      }
      size = Number(size) + Number(mod);
      if (target.main.male && !target.main.female) {
        switch (size) {
          case 1:
          case 2:
            return eth("masculine", "manly", "athletic");
          case 3:
            return eth("sturdy", "androgynous");
          case 4:
            return eth("very feminine", "overly-wide", "broad");
          case 5:
            return eth("obviously-female", "unnaturally-wide");
          case 6:
          case 7:
          case 8:
            return "freakishly-wide";
          default:
            return `[hip-size out of bounds (${size})]`;
        }
      } else {
        switch (size) {
          case 1:
            return eth("freakishly-narrow", "disturbingly-small");
          case 2:
            return eth("very-narrow", "childish", "manly");
          case 3:
            return eth("narrow", "meager", "narrow", "compact");
          case 4:
            return eth("feminine", "sporty", "svelte", "feminine");
          case 5:
            return eth("womanly", "curvy", "wide");
          case 6:
            return eth("broad", "child-bearing", "alluring", "broad");
          case 7:
            return eth("extra-broad", "spacious", "expansive");
          case 8:
            return eth("broodmother-sized", "fertility goddess");
          default:
            return `[hip-size out of bounds (${size})]`;
        }
      }
    },
    pelvis(size, mod = 0) {
      if (size == null) {
        size = target.body.pelvis;
      }
      size = Number(size) + Number(mod);
      if (target.main.male && !target.main.female) {
        switch (size) {
          case 1:
          case 2:
            return eth("masculine", "manly", "athletic");
          case 3:
            return eth("sturdy", "androgynous");
          case 4:
            return eth("very feminine", "overly-wide", "broad");
          case 5:
            return eth("obviously-female", "unnaturally-wide");
          case 6:
          case 7:
          case 8:
            return "freakishly-wide";
          default:
            return `[pelvis-size out of bounds (${size})]`;
        }
      } else {
        switch (size) {
          case 1:
            return eth("freakishly-narrow", "disturbingly-small");
          case 2:
            return eth("very-narrow", "childish", "manly");
          case 3:
            return eth("narrow", "meager", "narrow", "compact");
          case 4:
            return eth("feminine", "sporty", "svelte", "feminine");
          case 5:
            return eth("womanly", "curvy", "wide");
          case 6:
            return eth("broad", "child-bearing", "alluring", "broad");
          case 7:
            return eth("extra-broad", "spacious", "expansive");
          case 8:
            return eth("broodmother-sized", "fertility goddess");
          default:
            return `[pelvis-size out of bounds (${size})]`;
        }
      }
    },
    buttShape() {
      const waist = (5 - target.body.waist) * 2;
      const hips = target.body.hips;
      const pelvis = target.body.pelvis;
      if ((waist >= hips - 1 && hips > pelvis) || hips < 3 || (hips === 3 && hips >= pelvis)) {
        return "triangle";
      } else if (waist >= hips - 1 && waist <= hips + 1 && pelvis >= hips - 1 && pelvis <= hips + 1) {
        return "square";
      } else if (pelvis >= hips && hips >= 5 && waist < 5 && (hips - waist > 2
        || hips - waist >= 2 && target.body.fat <= 4)) {
        return "heart";
      } else if (hips > pelvis && hips > waist && hips >= 4) {
        return "circle";
      } else if (pelvis < waist || pelvis < hips) {
        return "triangle";
      } else {
        return "square";
      }
    },
    fertility(size, mod = 0) {
      if (size == null) {
        size = target.fert.fertility;
      }
      if (target.main.male && !target.main.female) {
        switch (size) {
          case 0:
            return "VasGel-protected";
          case 1:
            return "barren";
          case 2:
            return "barely fertile";
          case 3:
            return "fertile";
          case 4:
            return "very fertile";
          case 5:
            return "super fertile";
          case 6:
            return "extremely fertile";
          case 7:
            return "insanely fertile";
          case 8:
            return "fertility god";
          case 9:
            return "impossibly fertile";
        }
      } else {
        switch (size) {
          case 0:
            return "IUD-protected";
          case 1:
            return "barren";
          case 2:
            return "barely fertile";
          case 3:
            return "fertile";
          case 4:
            return "very fertile";
          case 5:
            return "super fertile";
          case 6:
            return "extremely fertile";
          case 7:
            return "insanely fertile";
          case 8:
            return "fertility goddess";
          case 9:
            return "impossibly fertile";
        }
      }
      return "error";
    },
    tone(size, mod = 0) {
      if (size == null) {
        size = target.body.tone;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return "undead";
        case 1:
          return eth("frail", "puny");
        case 2:
          return eth("weak", "underdeveloped");
        case 3:
          return eth("average", "normal");
        case 4:
          return eth("toned", "fit");
        case 5:
          return eth("muscular", "bulky");
        case 6:
        case 7:
          return eth("body-builder", "hulking");
        default:
          return `[tone value out of bounds (${size})]`;
      }
    },
    weight(size, mod = 0) {
      if (size == null) {
        size = target.body.weight;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return "dead";
        case 1:
          return eth("skeletal", "starving", "near-death");
        case 2:
          return eth("skinny", "sallow", "unhealthy", "anorexic");
        case 3:
          return eth("lithe", "slim", "thin");
        case 4:
          return eth("plush", "curvy", "healthy");
        case 5:
          return eth("chubby", "pudgy", "plump");
        case 6:
          return eth("fat", "obese", "overweight", "hefty");
        case 7:
          return eth("grossly fat", "bluberous");
        case 8:
          return eth("morbidly obese", "nearly immobile");
        case 9:
          return eth("immobilized by fat");
        default:
          return `Weight value out of bounds (${size})`;
      }
    },
    clit(size, mod = 0) {
      if (size == null) {
        size = target.body.clit;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return "nonexistent";
        case 1:
          return eth("tiny", "vestigial", "miniature");
        case 2:
          return eth("delicate", "petite");
        case 3:
          return eth("sensitive", "ordinary");
        case 4:
          return eth("large", "big");
        case 5:
          return eth("huge", "giant");
        case 6:
          return eth("massive", "enormous");
        case 7:
          return eth("dick-like", "colosal");
      }
      size = Number(size) + Number(mod);
    },
    wetness(size, mod = 0) {
      if (size == null) {
        size = target.body.pussy.wetness;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return eth("normally-dry", "normally-dry", "poorly lubricated");
        case 2:
          return eth("averagely-lubricated", "normal-moistness");
        case 3:
          return eth("well-lubricated", "typically-damp");
        case 4:
          return eth("constantly-lubricated", "normally-wet");
        case 5:
          return eth("overly-lubricated", "normally-soaked");
        default:
          return `wetness out of bounds (${size})`;
      }
    },
    curwet(size, mod = 0) {
      if (size == null) {
        if (ↂ.sex.scene) {
          try {
            if (setup.testes.test(target.main.id)) {
              let nid = ↂ.sex.activeNPC.indexOf(target.main.id);
              if (nid === -1) { nid = 0; }
              size = ↂ.sex.npcWetness[nid];
            } else {
              size = ↂ.sex.pcWetness;
            }
          } catch (e) {
            aw.con.warn(`Error retrieving sex wetness.\n ${e.name}: ${e.message}`);
            size = target.status.wetness;
          }
        } else {
          size = target.status.wetness;
        }
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("bone dry", "totally dry");
        case 1:
        case 2:
          return eth({ dry: 6, unexcited: 1, unaroused: 1 });
        case 3:
        case 4:
          return eth("slightly moist", "slightly damp");
        case 5:
        case 6:
          return eth("moist", "damp");
        case 7:
        case 8:
          return eth("wet", "wet", "ready", "aroused");
        case 9:
        case 10:
          return eth("saturated", "soaked", "soaked");
        case 11:
        case 12:
          return eth("sodden", "drenched", "dripping");
        case 13:
        case 14:
        case 15:
        case 16:
          return eth("pouring", "running", "streaming");
        case 17:
        case 18:
        case 19:
        case 20:
          return eth("gushing", "flooding", "cascading");
        default:
          return "[[55 gallon drum|"
            + "https://www.amazon.com/Passion-Lubes-Natural-Water-Based-Lubricant/dp/B005MR3IVO?th=1]]";
      }
    },
    labia(size, mod = 0) {
      if (size == null) {
        size = target.body.labia;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("nonexistent", "imaginary");
        case 1:
          return eth("minimal", "tiny", "hidden");
        case 2:
          return eth("average", "normal");
        case 3:
          return eth("large", "protruding", "big");
        case 4:
          return eth("dangling", "huge", "stretched-out");
        default:
          return `labiasize out of bounds (${size})`;
      }
    },
    clitview() {
      const clit = target.body.clit;
      const labia = target.body.labia;
      if (labia > clit) {
        return "is hidden by";
      } else if (labia === clit) {
        return "peeks out of";
      } else {
        return "protrudes proudly from";
      }
    },
    waist(size, mod = 0) {
      if (size == null) {
        size = target.body.waist;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return eth("oddly straight", "burly", "manly");
        case 2:
          return eth("thick", "masculine", "sturdy");
        case 3:
          return eth("slightly-curved", "unremarkable", "average");
        case 4:
          return eth("feminine", "alluring", "enticing", "curvy");
        case 5:
          return eth("hourglass", "pinched", "very narrow");
        default:
          return `waist size out of bounds (${size})`;
      }
    },
    beauty(size, mod = 0) {
      if (size == null) {
        size = target.body.beauty;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return eth("homely", "ugly", "unattractive");
        case 2:
          return eth("mediocre", "humdrum", "passable");
        case 3:
          return eth("attractive", "appealing", "pleasing");
        case 4:
          return eth("beautiful", "alluring", "stunning");
        case 5:
          return eth("gorgeous", "exquisite", "ravishing");
        case 6:
          return eth("angelic", "glorious", "picturesque");
        default:
          return `beauty value out of bounds (${size})`;
      }
    },
    faceType(size) {
      if (size == null) {
        size = target.body.face;
      }
      switch (size) {
        case "normal":
          return eth("unremarkable", "common", "average");
        case "androgynous":
          return eth("androgynous", "confusing", "perplexing");
        case "cute":
          return eth("cute", "sweet", "friendly");
        case "sensual":
          return eth("sensual", "seductive", "enticing");
        case "exotic":
          return eth("unusual", "exotic", "strange");
        default:
          return `facetype error - value ${size}`;
      }
    },
    lips(size, mod = 0) {
      if (size == null) {
        size = target.body.lips;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return eth("unnaturally-thin", "lizard-like", "gaunt", "gaunt");
        case 2:
          return eth("thin", "slim", "meager");
        case 3:
          return eth("delicate", "soft", "feminine");
        case 4:
          return eth("plump", "plush", "big");
        case 5:
          return eth("thick", "pouty", "large");
        case 6:
          return eth("pillowy", "huge", "dick-pillow");
        default:
          return `lipsize out of bounds (${size})`;
      }
    },
    nipLength(size, mod = 0) {
      if (size == null) {
        size = target.body.tits.nipLength;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("nonexistent", "missing");
        case 1:
          return eth({"fully-inverted": 1, "buried": 2, "innie": 1});
        case 2:
          return eth("inverted", "hidden", "shy");
        case 3:
          return eth("flat", "recessed", "demure");
        case 4:
          return eth("short", "compact", "sturdy");
        case 5:
          return eth("unremarkable", "normal", "healthy");
        case 6:
          return eth("long", "proud", "lengthy");
        case 7:
        case 8:
          return eth({"towering": 3, "elongated": 2, "dick-like": 1});
        default:
          return `nipple length out of bounds (${size})`;
      }
    },
    nipWidth(size, mod = 0) {
      if (size == null) {
        size = target.body.tits.nipGirth;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return eth("skinny", "slender", "scant");
        case 2:
          return eth("thin", "narrow", "dainty");
        case 3:
          return eth("ordinary", "normal", "healthy");
        case 4:
          return eth("thick", "sturdy", "wide");
        case 5:
        case 6:
          return eth("stout", "girthy", "broad");
        default:
          return `nipple width out of bounds (${size})`;
      }
    },
    areolaSize(size, mod = 0) {
      if (size == null) {
        size = target.body.tits.areola;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return "nonexistent";
        case 1:
          return eth("tiny", "miniature", "oddly small");
        case 2:
          return eth("small", "diminutive", "petite");
        case 3:
          return eth("feminine", "average", "fairly standard");
        case 4:
          return eth("substantial", "large", "pronounced");
        case 5:
          return eth("huge", "gigantic", "massive");
        case 6:
        case 7:
        case 8:
          return eth("pancake-like", "colossal", "humongous");
        default:
          return `areola width out of bounds (${size})`;
      }
    },
    areolaPuffy(size, mod = 0) {
      if (size == null) {
        size = target.body.tits.puffy;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return "sunken";
        case 1:
          return eth("flat", "painted-on", "smooth");
        case 2:
          return eth("soft", "healthy", "normal");
        case 3:
          return eth("puffy", "full", "springy");
        case 4:
          return eth("domed", "tumid", "puffed up");
        case 5:
          return eth("bulging", "protruding", "tumescent");
        default:
          return `areola puff out of bounds (${size})`;
      }
    },
    breastShape(size, mod = 0) {
      if (size == null) {
        size = target.body.tits.shape;
      }
      switch (size) {
        case "athletic":
        case "perky":
          if (target.body.tits.size < 500) {
            return eth("pointy", "underdeveloped", "underwhelming");
          } else {
            return eth("cone-shaped", "pointy", "angular");
          }
          break;
        case "bell":
          if (target.status.milk > 0) {
            return eth("bountiful", "succulent", "full", "motherly");
          } else {
            return eth("enticing", "curvaceous", "full", "succulent");
          }
        case "relaxed":
          return eth("relaxed", "hanging", "floppy");
        case "round":
          if (target.body.tits.silicone === 0) {
            return eth("dome-like", "round", "firm");
          } else {
            return eth("round", "taut", "fake", "artificial", "round");
          }
        case "teardrop":
          return eth("perfectly-formed", "shapely", "perky", "enticing");
        case "thin":
          if (target.body.tits.base.size < 1000) {
            return eth("empty", "flat", "downward-facing", "tuberous");
          } else if (target.body.tits.base.size < 1700) {
            return eth("tuberous", "narrow", "protuding");
          } else {
            return eth("narrow", "protuding", "protuding", "torpedo-shaped");
          }
        case "wideset":
          if (target.body.tits.silicone === 0) {
            return eth("spaced-out", "wide-set", "wide-set", "separated");
          } else {
            return eth("spaced-out", "wide-set", "bolted-on");
          }
      }
    },
    braSize(size, mod = 0) {
      if (size == null) {
        if (!target.main.female) {
          return "no-size";
        }
        try {
          size = target.body.tits.lact.bra;
        } catch (e) {
          size = target.body.tits.bra;
        }
      }
      return size;
    },
    cupSize(size, mod = 0) {
      if (size == null) {
        if (!target.main.female) {
          return "no-cup";
        }
        try {
          size = target.body.tits.lact.bra.slice(2, 3) + "-cup";
        } catch (e) {
          size = target.body.tits.bra.slice(2, 3) + "-cup";
        }
      }
      return size;
    },
    braSizeNM(size, mod = 0) {
      if (size == null) {
        size = target.body.tits.bra;
      }
      return size;
    },
    cupSizeNM(size, mod = 0) {
      if (size == null) {
        size = target.body.tits.cup;
      }
      return size;
    },
    arousal(size, mod = 0) {
      if (size == null) {
        size = target.status.arousal;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case -6:
        case -5:
          return "disturbed";
        case -4:
        case -3:
          return "disgusted";
        case -2:
        case -1:
          return "repulsed";
        case 0:
        case 1:
          return "not aroused";
        case 2:
        case 3:
          return "slight";
        case 4:
        case 5:
          return "moderate";
        case 6:
        case 7:
          return "strong";
        case 8:
        case 9:
          return "desperate";
        case 10:
        case 11:
          return "extreme";
        case 12:
        case 13:
          return "uncontrollable";
        case 14:
        case 15:
          return "mad with lust";
        default:
          return `arousal out of bounds (${size})`;
      }
    },
    libido(size, mod = 0) {
      if (size == null) {
        size = target.trait.libido;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return "practically asexual";
        case 2:
          return "weak";
        case 3:
          return "average";
        case 4:
          return "above average";
        case 5:
          return "strong";
        case 6:
          return "very strong";
        case 7:
          return "insatiable";
        case 8:
        case 9:
          return "uncontrollable";
        case 10:
        case 11:
        case 12:
          return "Nymphomania";
        default:
          return `libido out of bounds (${size})`;
      }
    },
    pubeLength(size, mod = 0) {
      if (size === null || typeof size !== "number") {
        size = target.groom.pubeGrow;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("hairless", "permanently-smooth", "lasered");
        case 1:
          return eth("smooth", "shaved", "hairless");
        case 2:
          return eth("prickly", "stubbly", "very-short");
        case 3:
          return eth("short", "closely-cut", "finely-trimmed");
        case 4:
          return eth("neatly-trimmed", "manicured", "well-groomed");
        case 5:
          return eth("luxurious", "full", "thick");
        case 6:
          return eth("bushy", "untamed", "gnarly");
        default:
          return `pube length out of bounds (${size})`;
      }
    },
    pubeStyle() {
      let size;
      if (target.groom == null || target.groom === undefined) {
        size = target.body.pubeStyle;
      } else {
        size = target.groom.pubeStyle;
      }
      switch (size) {
        case "bushy":
          return "untamed bush";
        case "trimmed":
          return "trimmed bush";
        case "garden":
          return "elegant garden";
        case "mohawk":
          return "spiky strip";
        case "neatly-trimmed":
          return "manicured bush";
        case "bikinitrim":
          return "trimmed bush";
        case "bikiniline":
          return "manicured bush";
        case "triangular":
          return "triangular fluff";
        case "martini":
          return "small short triangle";
        case "heart":
          return "cute heart shape";
        case "neat patch":
          return "well-groomed patch";
        case "landing-strip":
          return "long narrow strip";
        case "stamp":
          return "little square";
        case "stubble":
          return "short stubble";
        case "brazilian":
          return "tiny line";
        case "shaved":
          return "completely smooth";
        case "hairless":
          return "completely smooth";
        default:
          return `pube style out of bounds (${size})`;
      }
    },
    pubeShape(size, mod = 0) {
      if (size == null) {
        if (target.groom == null || target.groom === undefined) {
          size = target.body.pubeShape;
        } else {
          size = target.groom.pubeShape;
        }
      }
      switch (size) {
        case "bush":
          return eth("bush", "carpet", "pelt");
        case "patch":
          return eth("patch", "area", "patch");
        case "strip":
          return eth("strip", "line", "path");
        case "triangle":
          return eth("triangle", "wedge", "arrow");
        case "square":
          return eth("square", "patch", "square");
        case "none":
          return eth("bare", "exposed");
        default:
          return `pube shape out of bounds (${size})`;
      }
    },
    pubeWet(size, mod = 0) {
      if (size == null) {
        if (ↂ.sex.scene) {
          size = ↂ.sex.pcWetness;
        } else {
          size = target.status.wetness;
        }
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("bone dry", "totally dry");
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          return eth({unmoistened: 3, dry: 2, crisp: 1});
        case 6:
        case 7:
        case 8:
        case 9:
          return eth("damp", "moist", "damp");
        case 10:
        case 11:
        case 12:
          return eth("dewy", "wet", "wet");
        case 13:
        case 14:
        case 15:
        case 16:
          return eth("soaked", "soaked", "dripping", "dripping", "saturated");
        case 17:
        case 18:
        case 19:
        case 20:
          return eth("sodden", "inundated", "sodden");
        default:
          return "[[55 gallon drum|"
          + "https://www.amazon.com/Passion-Lubes-Natural-Water-Based-Lubricant/dp/B005MR3IVO?th=1]]";
      }
    },
    pubeColor(size, mod = 0) {
      if (size == null) {
        if (target.groom == null || target.groom === undefined) {
          size = target.body.pubeColor;
        } else {
          size = target.groom.pubeColor;
        }
      }
      return size;
    },
    bikiniLength(size, mod = 0) {
      if (target.groom == null || target.groom === undefined) {
        size = target.body.pube;
      } else {
        size = target.groom.pube;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("hairless", "permenantly-smooth", "lasered");
        case 1:
          return eth("smooth", "shaved", "hairless");
        case 2:
          return eth("prickly", "stubbly", "very-short");
        case 3:
          return eth("short", "growing", "noticeable");
        case 4:
          return eth("grown-out", "obvious", "ungroomed");
        case 5:
          return eth("bushy", "untamed", "gnarly");
        default:
          return `bikini length out of bounds (${size})`;
      }
    },
    legHairLength(size, mod = 0) {
      if (size == null) {
        size = target.groom.leghair;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("hairless", "permenantly-smooth", "lasered");
        case 1:
          return eth("smooth", "shaved", "hairless");
        case 2:
          return eth("prickly", "stubbly", "very-short");
        case 3:
          return eth("short", "growing", "noticeable");
        case 4:
          return eth("grown-out", "obvious", "ungroomed");
        case 5:
          return eth("bushy", "untamed", "gnarly");
        default:
          return `leghair length out of bounds (${size})`;
      }
    },
    armpitLength(size, mod = 0) {
      if (size == null) {
        size = target.groom.armpit;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("hairless", "permenantly-smooth", "lasered");
        case 1:
          return eth("smooth", "shaved", "hairless");
        case 2:
          return eth("prickly", "stubbly", "very-short");
        case 3:
          return eth("short", "growing", "noticeable");
        case 4:
          return eth("grown-out", "obvious", "ungroomed");
        case 5:
          return eth("bushy", "untamed", "gnarly");
        default:
          return `armpit hair out of bounds (${size})`;
      }
    },
    hairCurl(size, mod = 0) {
      if (size == null) {
        if (target.groom == null || target.groom === undefined) {
          size = target.body.hairCurl;
        } else {
          size = target.groom.hairCurl;
        }
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 0:
          return eth("straight", "unbent");
        case 1:
          return eth("slightly wavy", "slightly undulating");
        case 2:
          return eth("wavy", "undulating", "waving");
        case 3:
          return eth("very wavy", "deeply undulating");
        case 4:
          return eth("curly", "looping");
        case 5:
          return eth("very curly", "coiled");
        case 6:
          return eth("kinked", "crimped", "rucked");
        default:
          return `hair curl out of bounds (${size})`;
      }
    },
    hairLength(size, mod = 0) {
      if (size == null) {
        if (target.groom == null || target.groom === undefined) {
          size = target.body.hairLength;
        } else {
          size = target.groom.hairLength;
        }
      }
      if (State.active.variables.AW.metric) {
        // size = Math.round(size / 2.54);
      }
      size = Number(size) + Number(mod);
      size = Math.round(size);
      switch (size) {
        case 0:
          return eth("bald", "shaved", "shorn");
        case 1:
        case 2:
        case 3:
          return eth("extremely short", "masculine", "crew-length");
        case 4:
        case 5:
        case 6:
          return eth("short", "pixie-length", "ear-length");
        case 7:
        case 8:
          return eth("chin-length", "bob-length", "somewhat-short");
        case 9:
        case 10:
        case 11:
          return eth("neck-length", "medium-length", "neck-length");
        case 12:
        case 13:
          return eth("shoulder-length", "shoulder-length", "slightly-long");
        case 14:
        case 15:
        case 16:
        case 17:
          return eth("long", "upper-back-length", "shoulder-blade-length");
        case 18:
        case 19:
        case 20:
        case 21:
          return eth("long", "mid-back-length", "long");
        case 22:
        case 23:
        case 24:
        case 25:
          return eth("very-long", "lower-back-length");
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
          return eth("ass-length", "butt-length", "very-long");
        default:
          return eth("incredibly-long", "extremely long");
      }
    },
    hairStyle(size, mod = 0) {
      if (size == null) {
        if (target.groom == null || target.groom === undefined) {
          size = target.body.hairStyle;
        } else {
          size = target.groom.hairStyle;
        }
      }
      return aw.hair[size].sDesc;
    },
    hairColor(size, mod = 0) {
      if (size == null) {
        if (target.groom == null || target.groom === undefined) {
          size = target.body.hairColor;
        } else {
          size = target.groom.hairColor;
        }
      }
      return size;
    },
    height(size, mod = 0) {
      if (size == null) {
        size = target.body.height;
      }
      size = Number(size) + Number(mod);
      if (target.main.male && !target.main.female) {
        // male
        if (size < 66) {
          return eth("very short", "stunted", "diminutive");
        } else if (size < 69) {
          return eth("short", "petite");
        } else if (size < 72) {
          return eth("average", "normal", "unremarkable");
        } else if (size < 75) {
          return eth("tall", "above-average", "tall");
        } else {
          return eth("very tall", "giant", "lanky");
        }
      } else {
        // female + futa
        if (size < 61) {
          return eth("very short", "stunted", "diminutive");
        } else if (size < 63) {
          return eth("short", "petite");
        } else if (size < 67) {
          return eth("average", "normal", "unremarkable");
        } else if (size < 70) {
          return eth("tall", "above-average", "tall");
        } else {
          return eth("very tall", "giant", "lanky");
        }
      }
    },
    heightNum(size, mod = 0) {
      if (size == null) {
        size = target.body.height;
      }
      size = Number(size) + Number(mod);
      if (State.active.variables.AW.metric) {
        size = Math.round(size * 2.54);
        return size + " centimeters";
      } else {
        const foot = setup.numWord(Math.floor(size / 12));
        const inch = setup.numWord(size % 12);
        return foot + "-foot-" + inch;
      }
    },
    jaw(size, mod = 0) {
      if (size == null) {
        size = target.body.jaw;
      }
      switch (size) {
        case "normal":
          return eth("soft", "understated", "unremarkable");
        case "masculine":
          return eth("manly", "heavy", "big");
        case "elegant":
          return eth("elegant", "stately", "refined");
        case "large":
          return eth("bulky", "large", "thick");
        case "wide":
          return eth("broad", "wide", "rugged");
        case "jutting":
          return eth("protruding", "jutting", "prominant");
        default:
          return `jaw out of bounds (${size})`;
      }
    },
    brow(size, mod = 0) {
      if (size == null) {
        size = target.body.brow;
      }
      if (target.main.male && !target.main.female) {
        switch (size) {
          case "normal":
            return eth("normal", "unremarkable", "masculine");
          case "unibrow":
            return eth("unibrow", "single-eyebrow");
          case "thick":
            return eth("brooding", "thick", "protruding");
          case "heavy":
            return eth("heavy", "primative", "caveman");
          default:
            return `brow out of bounds (${size})`;
        }
      } else {
        switch (size) {
          case "normal":
            return eth("normal", "average", "feminine");
          case "unibrow":
            return eth("unibrow", "single-eyebrow", "heavy-eyebrow");
          case "thick":
            return eth("masculine", "brooding", "thick");
          case "heavy":
            return eth("primative", "huge", "caveman", "heavy");
          default:
            return `brow out of bounds (${size})`;
        }
      }
    },
    age(size, mod = 0) {
      if (size == null) {
        size = target.main.age;
      }
      size = Number(size) + Number(mod);
      const age = Math.floor(size / 5);
      switch (age) {
        case 0:
          switch (size) {
            case 0:
              return "infant";
            case 1:
              return "baby";
            case 2:
            case 3:
              return "toddler";
            case 4:
              return "small child";
          }
          break;
        case 1:
          return "child";
        case 2:
          if (size < 13) {
            return "pre-teen";
          } else {
            return "teenager";
          }
        case 3:
          return "teenager";
        case 4:
          return "young adult";
        case 5:
          if (size < 28) {
            return "young adult";
          } else {
            return "adult";
          }
        case 6:
        case 7:
          return "adult"; // 25 to 39
        case 8:
        case 9:
        case 10:
          return "middled-aged adult"; // 40 to 54
        case 11:
        case 12:
        case 13:
          return "older adult"; // 55 to 69
        default:
          return "elderly person";
      }
      return "error";
    },
    cockLength(size, mod = 0) {
      if (size == null) {
        size = target.body.cock.length;
      }
      size = Math.floor(size / 10);
      if (ↂ.pc.kink.sizequeen) {
        size -= 1;
        if (size < 0) {
          size = 0;
        }
      }
      let desc;
      switch (size) {
        case 0:
          desc = eth("infintesimal", "infant", "clit-length");
          break;
        case 1:
        case 2:
          desc = eth("miniature", "tiny", "minuscule", "puny");
          break;
        case 3:
        case 4:
          desc = eth("underwhelming", "meager", "diminutive", "short");
          break;
        case 5:
          desc = eth("average-length", "unremarkable", "passable", "middling", "moderate", "ordinary");
          break;
        case 6:
        case 7:
          desc = eth("big", "large", "lengthy", "impressive", "lengthy", "outstanding", "superior");
          break;
        case 8:
        case 9:
          desc = eth("imposing", "prodigious", "gigantic", "tremendous", "huge", "giant");
          break;
        case 10:
        case 11:
          desc = eth("magnificent", "massive", "monumental", "sublime", "tremendous");
          break;
        case 12:
          desc = eth("colossal", "magnificent", "massive", "monumental", "sublime", "tremendous", "foot-long", "foot-long");
          break;
        default:
          desc = eth("transcendent", "stupendous", "unmatchable", "unbelievable", "colossal");
          break;
      }
      size++;
      if (random(1, 4) === 1) {
        // add length
        if (State.active.variables.AW.metric) {
          size = Math.round(size * 2.54);
          desc += ` ${size}cm`;
        } else {
          desc += ` ${size}-inch`;
        }
      }
      return desc;
    },
    cockGirth(size, mod = 0) {
      if (size == null) {
        size = target.body.cock.girth;
      }
      if (ↂ.pc.kink.sizequeen) {
        size -= 2;
        if (size < 0) {
          size = 0;
        }
      }
      size = Number(size) + Number(mod);
      if (size < 12) {
        return eth("dinky", "puny", "miniscule");
      } else if (size < 14) {
        return eth("underwhelming", "meager", "diminutive", "slight", "narrow");
      } else if (size < 16) {
        return eth("average", "unremarkable", "passable", "middling", "moderate", "ordinary");
      } else if (size < 18) {
        return eth("thick", "heavy", "wide", "stocky");
      } else if (size < 20) {
        return eth("broad", "burly", "substantial", "fat");
      } else {
        return eth("massive", "stupendous", "sublime", "heavy-duty");
      }
    },
    cockHead() {
      // "normal", "bulbous", "tapered", "blunt", "small"
      const size = target.body.cock.head;
      switch (size) {
        case "normal":
          return eth("normal", "average", "middling", "moderate");
        case "bulbous":
          return eth("bulbous", "hefty", "big", "sizeable");
        case "tapered":
          return eth("tapered", "pointy", "narrow");
        case "blunt":
          return eth("blunt", "broad", "stumpy", "flattened");
        case "small":
          return eth("small", "undersized", "unerwhelming", "diminutive");
        default:
          return `invalid cockhead (${size})`;
      }
    },
    cockStr(size, mod = 0) {
      if (size == null) {
        size = target.body.cock.hard;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return eth("limp", "impotent", "worthless");
        case 2:
          return eth("soft", "flimsy", "floppy");
        case 3:
          return eth("firm", "hard", "stiff");
        case 4:
          return eth("unyeilding", "rock-hard", "rigid");
        case 5:
          return eth("iron-hard", "steel-like", "unstoppable");
        default:
          return `cock hardness out of bounds (${size})`;
      }
    },
    cockCircum() {
      // trufals
      const size = target.body.cock.circum;
      if (size) {
        return eth("chopped", "cut", "snipped", "kosher");
      } else {
        return eth("uncut", "natural", "intact");
      }
    },
    cockSize(size, mod = 0) {
      if (size == null) {
        size = target.body.cock.length;
      }
      /*
      TODO figure out way to describe cock girth in non-confusing way.
      size = Math.floor(size / 10);
      mod = target.body.cock.girth;
      let r = random(1, 10);
      if (size < 5) {
        r = 1;
      } else if (mod < 14) {
        r += 6;
      }
      if (r > 8) {
        return qual.cockGirth(null);
      } else {
        
      }
      */
      return qual.cockLength(null);
    },
    ballSize(size, mod = 0) {
      if (size == null) {
        size = target.body.balls.size;
      }
      if (ↂ.pc.kink.cumSlut) {
        size -= 4;
      }
      size = Number(size) + Number(mod);
      if (size < 12) {
        return eth("infintesimal", "infant", "undeveloped");
      }
      switch (size) {
        case 12:
        case 13:
        case 14:
          return eth("miniature", "tiny", "minuscule", "puny");
        case 15:
        case 16:
        case 17:
          return eth("underwhelming", "meager", "diminutive", "small");
        case 18:
        case 19:
        case 20:
          return eth("average", "unremarkable", "passable", "middling", "moderately-sized", "ordinary");
        case 21:
        case 22:
        case 23:
          return eth("big", "large", "hefty", "impressive", "hefty", "outstanding", "superior");
        case 24:
        case 25:
        case 26:
          return eth("imposing", "prodigious", "gigantic", "tremendous", "huge", "giant");
        case 27:
        case 28:
        case 29:
          return eth("magnificent", "massive", "monumental", "sublime", "tremendous");
        default:
          return eth("transcendent", "stupendous", "unmatchable", "unbelievable", "colossal");
      }
    },
    ballsack(size, mod = 0) {
      if (size == null) {
        size = target.body.balls.sac;
      }
      size = Number(size) + Number(mod);
      switch (size) {
        case 1:
          return eth("taut", "straining");
        case 2:
          return eth("tight", "full");
        case 3:
          return eth("comfortable", "adequate");
        case 4:
          return eth("roomy", "loose");
        case 5:
          return eth("empty", "overly-big");
        default:
          return `ballsack out of bounds (${size})`;
      }
    },
    ballsag(size, mod = 0) {
      if (size == null) {
        size = target.body.balls.hang;
      }
      size = Number(size) + Number(mod);
      size = Math.floor(size / 2);
      switch (size) {
        case 0:
          return "hanging";
        case 1:
        case 2:
          return "dangling";
        case 3:
          return "drooping";
        default:
          return "sagging";
      }
    },
    pronounHEshe(size, mod = 0) {
      size = target.main.female;
      if (size) {
        return "she";
      } else {
        return "he";
      }
    },
    pronounHIShers(size, mod = 0) {
      size = target.main.female;
      if (size) {
        return "hers";
      } else {
        return "his";
      }
    },
    pronounHISher(size, mod = 0) {
      size = target.main.female;
      if (size) {
        return "her";
      } else {
        return "his";
      }
    },
    pronounHIMher(size, mod = 0) {
      size = target.main.female;
      if (size) {
        return "her";
      } else {
        return "him";
      }
    },
    race(size, mod = 0) {
      if (size == null) {
        size = target.body.race;
      }
      size = Number(size) + Number(mod);
      return size;
    },
    skinColor(size, mod = 0) {
      if (size == null) {
        size = target.body.skinColor;
      }
      switch (size) {
        case "pale":
          return eth({pale: 4, light: 1});
        case "fair":
          return eth({fair: 4, light: 1});
        case "tanned":
          return eth({tanned: 4, sunkissed: 1});
        case "bronzed":
          return eth({bronzed: 4, sunkissed: 1});
        case "light":
          return eth({light: 4, ochre: 1});
        case "dusky":
          return eth({dusky: 4, ochre: 1});
        case "dark":
          return eth({dark: 4, ochre: 1});
        case "light brown":
          return eth({"light brown": 4, "dark": 1});
        case "brown":
          return eth({brown: 4, dark: 1});
        case "dark brown":
          return eth({"dark brown": 4, "black": 1});
        case 4:
          return eth({midnight: 4, black: 1});
        default:
          return `skincolor out of bounds (${size})`;
      }
    },
    energy(size, mod = 0) {
      if (size == null) {
        size = target.status.energy.amt;
      }
      size = Number(size) + Number(mod);
      const max = target.status.energy.max;
      size = Math.round((size / max) * 10);
      if (size > 8) {
        return eth("rested", "vigorous", "energetic", "spirited");
      } else if (size > 5) {
        return eth("alert", "lusty", "spry");
      } else if (size > 3) {
        return eth("tired", "leaden", "lethargic");
      } else {
        return eth("worn out", "spent", "enervated");
      }
    },
    health(size, mod = 0) {
      if (size == null) {
        size = target.status.health;
      }
      size = Number(size) + Number(mod);
      size = Math.floor(size / 10);
      switch (size) {
        case 0:
          return eth("near death", "dying");
        case 1:
          return eth("dangerously ill", "debilitated", "wasting");
        case 2:
        case 3:
          return eth("extremely sick", "infirm");
        case 4:
        case 5:
          return eth("seriously ill", "weakened", "feeble");
        case 6:
        case 7:
          return eth("sick", "unwell", "ailing");
        case 8:
          return eth("under the weather", "out of sorts"); // "feeling bad",
        case 9:
        case 10:
          return eth("healthy", "healthful", "healthy", "able-bodied");
        default:
          return `health out of bounds (${size})`;
      }
    },
    pregBelly(size, mod = 0) {
      // describe size of the pregnancy belly
      if (size == null) {
        size = target.status.fundalHeight;
      }
      size = Number(size) + Number(mod);
      if (size < 10) {
        return "Your pregnancy isn't showing yet.";
      }
      switch (size) {
        case 10:
        case 11:
          return "You don't have the telltale bump yet, but maybe your belly looks a little bigger.";
        case 12:
        case 13:
        case 14:
          return "You have a slight curve on your lower belly, but it isn't much of a bump yet.";
        case 15:
        case 16:
        case 17:
          return "You have a small baby bump on your lower belly, but it isn't really obvious yet.";
        case 18:
        case 19:
        case 20:
          return "You have a baby bump on your lower tummy, but isn't very noticeable yet.";
        case 21:
        case 22:
        case 23:
          return "You have a baby bump that sits mostly on your lower belly, it's starting to become obvious that you're pregnant.";
        case 24:
        case 25:
        case 26:
          return "You have a noticeable baby bump that curves your stomach. It's fairly obvious that you're pregnant.";
        case 27:
        case 28:
        case 29:
          return "You have an obvious baby bump that has started to extend outward from your stomach.";
        case 30:
        case 31:
        case 32:
        case 33:
          return "Your stomach has grown a good deal and it's obvious at a glance that you're pregnant.";
        case 34:
        case 35:
        case 36:
        case 37:
          return "Your belly has grown quite large, extending out in front of you and hiding your feet.";
        case 38:
        case 39:
        case 40:
        case 41:
          return "Your belly is swollen with child, and has become somewhat inconvenient to carry around.";
        case 42:
        case 43:
        case 44:
        case 45:
          return "Your belly has grown to be so large that it's obvious you're pregnant with more than one child.";
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
          return "Your tummy has expanded to be quite large, sticking out far in front of you.";
      }
      if (size < 61) {
        return "Your pregnant belly has grown to a huge size, and seems to droop down below your pubic bone as it grows ever outward.";
      } else if (size < 71) {
        return "Your hugely gravid stomach now seems to curve upward from your ribcage, and you often find yourself supporting it from underneath with your hands.";
      } else if (size < 91) {
        return "Your truly enormous belly has started growing out to the sides, becoming more round.";
      } else if (size < 111) {
        return "Your ponderous tummy is now the widest part of your body. You're forced to keep your back arched while standing to maintain your balance.";
      } else if (size < 131) {
        return "Your enormous baby-filled belly has extended so far that you find it painful to go too long without supporting it with your arms.";
      } else if (size < 151) {
        return "Your gigantic baby-filled tummy is now so large that you're no longer able to touch your belly button.";
      } else if (size < 181) {
        return "Your colossal baby-stuffed belly has come to dominate your frame. You're forced to sit with your legs spread wide to make room for it.";
      } else {
        return "Your titanic baby-stuffed midsection has grown so large that it resembles an inflatable exercise ball. Remaining mobile, or even just resting comfortably has become a major ordeal.";
      }
    },
    babySize(size, mod = 0) {
      if (size == null) {
        const a = target.status.wombA.growth;
        const b = target.status.wombB.growth;
        const g = (a >= b) ? a : b;
        size = Math.round(40 * (g / 100));
      }
      switch (size) {
        case 1:
        case 2:
        case 3:
          return "smaller than a poppy seed";
        case 4:
          return "a seasame seed";
        case 5:
          return "an apple seed";
        case 6:
          return "a sweet pea";
        case 7:
          return "a blueberry";
        case 8:
          return "a raspberry";
        case 9:
          return "a green olive";
        case 10:
          return "a prune";
        case 11:
          return "a lime";
        case 12:
          return "a plum";
        case 13:
          return "a peach";
        case 14:
          return "an apple";
        case 15:
          return "a navel orange";
        case 16:
          return "an avocado";
        case 17:
          return "a large onion";
        case 18:
          return "a sweet potato";
        case 19:
          return "a mango";
        case 20:
          return "an artichoke";
        case 21:
          return "a pomegranate";
        case 22:
          return "a papaya";
        case 23:
          return "a grapefruit";
        case 24:
          return "a cantaloupe";
        case 25:
          return "a head of cauliflower";
        case 26:
          return "a head of lettuce";
        case 27:
          return "a rutabaga";
        case 28:
          return "an eggplant";
        case 29:
          return "a cabbage";
        case 30:
          return "an acorn squash";
        case 31:
          return "a squash";
        case 32:
          return "a pineapple";
        case 33:
          return "a durian";
        case 34:
          return "a butternut squash";
        case 35:
          return "a coconut";
        case 36:
          return "a honeydew";
        case 37:
          return "a winter melon";
        case 38:
          return "a pumpkin";
        case 39:
          return "a watermelon";
        case 40:
          return "a jackfruit";
        default:
          return "error in baby size parse";
      }
    },
    makeup(size, mod = 0) {
      return target.groom.makeup.desc;
    },
    makeupLip(size, mod = 0) {
      return aw.makeup.lip[target.groom.lipMU];
    },
    makeupEye(size, mod = 0) {
      return aw.makeup.eye[target.groom.eyeMU];
    },
    makeupGen(size, mod = 0) {
      return aw.makeup.gen[target.groom.genMU];
    },
    clothesFormal(size, mod = 0) {
      return target.clothes.form;
    },
    clothesSexy(size, mod = 0) {
      return target.clothes.sex;
    },
    clothesAtr(size, mod = 0) {
      if (size == null) {
        size = target.clothes.atr;
      }
      size = Number(size) + Number(mod);
      if (size < -6) {
        size = -6;
      }
      size += 6;
      switch (size) {
        case 0:
        case 1:
          return "hideous";

        case 2:
          return "awful";

        case 3:
        case 4:
          return "ugly";

        case 5:
        case 6:
        case 7:
          return "okay";

        case 8:
          return "nice";

        case 9:
          return "appealing";

        case 10:
          return "pretty";

        case 11:
          return "lovely";

        case 12:
          return "splendid";

        case 13:
          return "beautiful";

        case 14:
        case 15:
          return "dazzling";

        case 16:
        case 17:
          return "stunning";

        case 18:
        case 19:
          return "exquisite";

        case 20:
        case 21:
          return "magnificent";

        default:
          return ` out of bounds (${size})`;
      }
    },
    clothesQual(size, mod = 0) {
      return "[clothing quality]";
    },
    clothesExp(size, mod = 0) {
      if (size == null) {
        const worn = target.clothes.exp;
        if (worn[0] > worn[1]) {
          size = worn[0];
        } else {
          size = worn[1];
        }
      }
      switch (size) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          return "conservative";
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          return "normal";
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
          return "slightly revealing";
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
          return "revealing";
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
          return "very revealing";
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
          return "exhibitionist";
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
        /*5.o*/
          return "practically naked";
        default:
          return `invalid exposure value (${size})`;
      }
    },
    clothesDirty(size, mod = 0) {
      if (target.clothes.wet) {
        return "wet";
      }
      if (target.clothes.stain) {
        return "stained";
      }
      return "clean†";
    },
  };
  /*NOUNS*/
  const noun = {
    ass() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.body.ass >= 5) {
          v = 3;
        } else if (target.body.ass < 3) {
          v = 1;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "ass": a(30, 0),
        "arse": a(4, 0),
        "badonkadonk": a(4, 5),
        "behind": a(15, 2),
        "booty": a(5, 4),
        "butt": a(15, 0),
        "bum": a(2, 3),
        "buns": a(2, 3),
        "caboose": a(2, 3),
        "fanny": a(2, 2),
        "keister": a(2, 0),
        "rear": a(4, 0),
        "rump": a(3, 4),
        "tush": a(2, 3),
        "tushie": a(4, 1),
        "tuchus": a(1, 0),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    asshole() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.body.asshole.tight >= 6) {
          v = 3;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "asshole": a(30, 0),
        "back door": a(10, 0),
        "browneye": a(2, 0),
        "cornhole": a(4, 0),
        "growler": a(3, 4),
        "ham flower": a(2, 4),
        "o-ring": a(2, 0),
        "poop-chute": a(1, 0),
        "prison purse": a(2, 0),
        "starfish": a(6, 4),
        "turd cutter": a(1, 4),
        "ass-pussy": a(8, 4),
        "brown hole": a(2, 5),
        "shit cavern": a(2, 5),
        "rear cum-dump": a(8, 4),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    buttcheek() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.body.ass > 5) {
          v = 3;
        } else if (target.body.ass < 3) {
          v = 1;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "cheek": a(5, 0),
        "buttcheek": a(10, 0),
        "ass cheek": a(5, 0),
        "glute": a(2, 0),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    breast() {
      let v = 2;
      let milk = false;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word" && target.main.female) {
        if (target.body.tits.lact.on) {
          milk = true;
          if (target.body.tits.lact.cupNum >= 22) {
            v = 3;
          } else if (target.body.tits.lact.cupNum < 12) {
            v = 1;
          }
        } else {
          if (target.body.tits.cupNum >= 22) {
            v = 3;
          } else if (target.body.tits.cupNum < 6) {
            v = 1;
          }
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0, m= false) {
        if (m && !milk) {
          return 0;
        } else {
          return weight(n, s, v);
        }
      }
      // use function to assign weighted value
      const lib = {
        "breast": a(24, 0),
        "boob": a(12, 0),
        "boobie": a(2, 0),
        "tit": a(30, 4),
        "breasticle": a(1, 3),
        "can": a(1, 2),
        "chesticle": a(1, 3),
        "feeder": a(2, 3, true),
        "fun bag": a(4, 4),
        "gazonga": a(1, 3),
        "hooter": a(4, 4),
        "jug": a(4, 4),
        "melon": a(8, 4),
        "mosquito bite": a(4, 1),
        "mammary": a(1, 0),
        "sweater puppie": a(4, 4),
        "titty": a(24, 4),
        "udder": a(6, 5, true),
        "bee sting": a(8, 1),
        "itty-bitty-titty": a(4, 1),
        "sweater meat": a(2, 0),
        "headlight": a(2, 0),
        "milk bag": a(4, 3, true),
        "dairy factory": a(2, 4, true),
        "milk tank": a(6, 4, true),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    breasts() {
      let v = 2;
      let milk = false;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word" && target.main.female) {
        if (target.body.tits.lact.on) {
          milk = true;
          if (target.body.tits.lact.cupNum >= 22) {
            v = 3;
          } else if (target.body.tits.lact.cupNum < 12) {
            v = 1;
          }
        } else {
          if (target.body.tits.cupNum >= 22) {
            v = 3;
          } else if (target.body.tits.cupNum < 6) {
            v = 1;
          }
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0, m= false) {
        if (m && !milk) {
          return 0;
        } else {
          return weight(n, s, v);
        }
      }
      // use function to assign weighted value
      const lib = {
        "breasts": a(36, 0),
        // "rack": a(6, 4),
        "boobs": a(22, 0),
        "boobies": a(2, 0),
        "tits": a(38, 4),
        "breasticles": a(1, 3),
        "cans": a(1, 2),
        "chesticles": a(1, 3),
        "feeders": a(2, 3, true),
        "fun bags": a(4, 4),
        "gazongas": a(1, 3),
        "hooters": a(8, 4),
        "jugs": a(12, 4),
        "melons": a(12, 4),
        "mosquito bites": a(4, 1),
        "mammaries": a(1, 0),
        "sweater puppies": a(4, 4),
        "titties": a(28, 4),
        "udders": a(6, 5, true),
        "bee stings": a(8, 1),
        "itty-bitty-titties": a(4, 1),
        "sweater meat": a(2, 0),
        "headlights": a(2, 0),
        "milk bags": a(4, 3, true),
        "dairy factories": a(2, 4, true),
        "milk tanks": a(6, 4, true),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    nipple() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.body.tits.nipLength >= 6 || target.body.tits.nipGirth >= 4) {
          v = 3;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        nipple: a(16, 0),
        nip: a(4, 0),
        point: a(4, 2),
        teat: a(6, 4),
        tip: a(2, 0),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    nipples() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.body.tits.nipLength >= 6 || target.body.tits.nipGirth >= 4) {
          v = 3;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        nipples: a(20, 0),
        nips: a(4, 0),
        points: a(4, 2),
        teats: a(8, 4),
        tips: a(2, 0),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    chest() {// unisex function - to return appropriate word
      const v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.main.female) {
          if (target.body.tits.cupNum > 8) {
            return noun.breasts();
          } else {
            const chance = random(0, 9);
            if (chance < target.body.tits.cupNum) {
              return noun.breasts();
            }
          }
        }
      }
      return eth({chest: 6, breast: 2, pecs: 2, ribcage: 1});
    },
    cock() {
      let v = 2;
      let q = 350;
      let w = 200;
      if (ↂ.pc.kink.sizequeen) {
        q = 450;
        w = 300;
      }
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.main.male) {
          if (target.body.cock.vol >= q) {
            v = 3;
          } else if (target.body.cock.vol < w) {
            v = 1;
          } else {
            v = 2;
          }
        } else {
          return noun.vulva();
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "member": a(30, 0),
        "phallus": a(4, 3),
        "cock": a(40, 3),
        "dick": a(20, 0),
        "pole": a(3, 3),
        "rod": a(16, 4),
        "pecker": a(6, 2),
        "prick": a(6, 3),
        "shaft": a(20, 3),
        "tool": a(16, 3),
        "johnson": a(6, 3),
        "manhood": a(8, 3),
        "schlong": a(4, 3),
        "wood": a(4, 3),
        "sausage": a(2, 3),
        "meat-hammer": a(6, 5),
        "womb-broom": a(6, 4),
        "tallywacker": a(2, 3),
        "microdick": a(6, 1),
        "minicock": a(6, 1),
        "twig": a(6, 2),
        "mushroom": a(4, 2),
        "unit": a(2, 3),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    cocks() {
      let v = 2;
      let q = 350;
      let w = 200;
      if (ↂ.pc.kink.sizequeen) {
        q = 450;
        w = 350;
      }
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.main.male) {
          if (target.body.cock.vol >= q) {
            v = 3;
          } else if (target.body.cock.vol < w) {
            v = 1;
          } else {
            v = 2;
          }
        } else {
          return noun.vulva();
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "members": a(20, 0),
        "phalluses": a(4, 3),
        "cocks": a(40, 3),
        "dicks": a(28, 0),
        "poles": a(3, 3),
        "rods": a(16, 4),
        "peckers": a(6, 2),
        "pricks": a(6, 3),
        "shafts": a(14, 3),
        "tools": a(8, 3),
        "johnsons": a(6, 3),
        "manhoods": a(2, 3),
        "schlongs": a(2, 3),
        "sausages": a(2, 3),
        "meat-hammers": a(6, 5),
        "womb-brooms": a(6, 4),
        "tallywackers": a(2, 3),
        "microdicks": a(8, 1),
        "minicocks": a(6, 1),
        "twigs": a(6, 2),
        "mushrooms": a(4, 2),
        "units": a(2, 3),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    cockhead() {
      const lib = [
        "head",
        "cockhead",
        "head",
        "helmet",
        "tip",
        "head",
        "cockhead",
      ];
      return lib[random(0, 6)];
    },
    ball() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.body.balls.size >= 22) {
          v = 3;
        } else if (target.body.balls.size < 18) {
          v = 1;
        } else {
          v = 2;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "ball": a(20, 0),
        "nut": a(20, 0),
        "bollock": a(1, 0),
        "cojone": a(2, 4),
        "family jewel": a(3, 3),
        "knacker": a(1, 3),
        "nad": a(2, 0),
        "rock": a(1, 3),
        "testicle": a(10, 0),
        "plum": a(4, 5),
        "kiwi": a(2, 5),
        "grape": a(6, 1),
        "stone": a(4, 4),
        "teste": a(1, 0),
        "acorn": a(6, 2),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    balls() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        let q = target.body.balls.size;
        if (ↂ.pc.kink.pregnancy || ↂ.pc.kink.risky
          || ↂ.pc.kink.cumSlut) {
          q -= 2;
        }
        if (q >= 22) {
          v = 3;
        } else if (q < 18) {
          v = 1;
        } else {
          v = 2;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "balls": a(30, 0),
        "nuts": a(20, 0),
        "bollocks": a(1, 0),
        "cojones": a(2, 4),
        "family jewels": a(3, 3),
        "knackers": a(1, 3),
        "nads": a(2, 0),
        "rocks": a(1, 3),
        "testicles": a(10, 0),
        "plums": a(4, 5),
        "kiwis": a(2, 5),
        "grapes": a(6, 1),
        "stones": a(10, 4),
        "testes": a(1, 0),
        "acorns": a(6, 2),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    sack() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.body.balls.size >= 22) {
          v = 3;
        } else if (target.body.balls.size < 18) {
          v = 1;
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "sack": a(16, 0),
        "scrotum": a(10, 0),
        "ballsack": a(12, 0),
        "coin purse": a(2, 0),
        "yam bag": a(3, 4),
        "plum pouch": a(4, 5),
        "nutsack": a(12, 0),
        // "cherrybag": a(6, 1),
        "gear bag": a(3, 3),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    clit() {
      return eth({"clit": 12, "rosebud": 8, "bean": 5, "hooded lady": 1, "little man in the boat": 1});
    },
    pussy() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.main.female) {
          if (target.body.pussy.tight > 6) {
            v = 3;
          } else if (target.body.pussy.tight < 3) {
            v = 1;
          } else {
            v = 2;
          }
        } else {
          return noun.asshole();
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {
        return weight(n, s, v);
      }
      // use function to assign weighted value
      const lib = {
        "pussy": a(40, 0),
        "box": a(6, 0),
        // "cock pocket": a(2, 3),
        "cooch": a(1, 0),
        "cunny": a(2, 0),
        "cunt": a(12, 0),
        "cherry": a(16, 1),
        // "bat cave": a(4, 5),
        // "jizz cave": a(4, 5),
        "fuck hole": a(4, 4),
        // "hoo-hoo": a(2, 1),
        "kitty": a(12, 2),
        "nookie": a(2, 0),
        "sausage wallet": a(4, 4),
        "sausage cavern": a(4, 5),
        // "poon": a(1, 0),
        "quim": a(8, 2),
        "snatch": a(12, 0),
        "love tunnel": a(6, 5),
        // "cock cave": a(8, 5),
        "vag": a(6, 0),
        // "baby cannon": a(4, 4),
        // "clown hole": a(2, 4),
        "main cum dump": a(12, 4),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    vulva() {
      let v = 2;
      // Assign a relative size value 3=big 1=small
      if (npc !== "word") {
        if (target.main.female) {
          if (target.body.labia > 3) {
            v = 3;
          } else if (target.body.labia < 2) {
            v = 1;
          } else {
            v = 2;
          }
        } else {
          return noun.sack();
        }
      }
      // call weight function to assign relative weight
      function a(n, s= 0, hair = 0) {
        let hl = 0;
        try {
          hl = target.groom.pube;
        } catch (e) {
          hl = 0;
        }
        if (hair === 2) {
          if (hl > 1) {
            return weight(n, s, v);
          } else {
            return 0;
          }
        } else if (hair === 1) {
          if (hl > 1) {
            return 0;
          } else {
            return weight(n, s, v);
          }
        } else {
          return weight(n, s, v);
        }
      }
      // use function to assign weighted value
      const lib = {
        // "bearded clam": a(4, 0, 2),
        "beaver": a(8, 0, 2),
        "beef curtains": a(6, 5, 1),
        "clunge": a(2, 0, 2),
        "cooter": a(4, 2, 0),
        "fish taco": a(4, 2, 1),
        // "fur burger": a(2, 3, 2),
        // "fur pie": a(2, 3, 2),
        // "ham wallet": a(6, 4, 0),
        // "axe wound": a(2, 1, 0),
        // "love taco": a(2, 3, 0),
        // "meat curtains": a(6, 6, 0),
        // "meat wallet": a(2, 3, 0),
        "minge": a(4, 2, 2),
        // "pink canoe": a(4, 1, 1),
        "muff": a(6, 0, 2),
        "quim": a(2, 2, 0),
        // "roast beef": a(2, 4, 0),
        // "roast beef curtains": a(4, 5, 0),
        "slit": a(24, 2, 1),
        "twat": a(18, 2, 0),
        "trim": a(12, 2, 0),
        "cunt": a(12, 2, 0),
        // "vertical smile": a(1, 0, 1),
        // "whisker biscuit": a(2, 0, 2),
        // "wizard sleeve": a(2, 5, 0),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    uterus() {
      let v = 0;
      // Assign a relative size value 3=big 1=small
      if (ↂ.pc.kink.pregnancy || ↂ.pc.kink.risky
        || ↂ.pc.kink.slut) {
        v = 1;
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {// special kink limit
        if (s === 0) {
          return n;
        } else if (v === 1) {
          return n;
        } else {
          return 0;
        }
      }
      // use function to assign weighted value
      const lib = {
        // "cum depository": a(15, 1),
        "baby chamber": a(2, 0),
        "baby room": a(2, 1),
        "sperm bank": a(3, 1),
        "baby maker": a(9, 1),
        "womb": a(24, 0),
        "uterus": a(9, 0),
        "baby factory": a(18, 0),
        // "jizz vacuum": a(6, 1),
        "mommy bag": a(8, 1),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    semen() {
      let v = 0;
      // Assign a relative size value 3=big 1=small
      if (ↂ.pc.kink.cumSlut || ↂ.pc.kink.slut) {
        v = 1;
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {// special kink limit
        if (s === 0) {
          return n;
        } else if (v === 1) {
          return n;
        } else {
          return 0;
        }
      }
      // use function to assign weighted value
      const lib = {
        "cum": a(24, 0),
        "semen": a(12, 0),
        "jizz": a(18, 0),
        "jism": a(12, 0),
        "man chowder": a(4, 1),
        "seed": a(12, 0),
        "nut butter": a(4, 0),
        "cock juice": a(4, 0),
        "splooge": a(2, 0),
        "trouser gravy": a(2, 1),
        "desert cream": a(6, 1),
        "yummy protein": a(6, 1),
        "man milk": a(4, 1),
        "sperm": a(4, 0),
        "cunt swimmers": a(2, 0),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    mouth() {
      let v = 0;
      // Assign a relative size value 3=big 1=small
      if (ↂ.pc.kink.cumSlut || ↂ.pc.kink.slut) {
        v = 1;
      }
      // call weight function to assign relative weight
      function a(n, s= 0) {// special kink limit
        if (s === 0) {
          return n;
        } else if (v === 1) {
          return n;
        } else {
          return 0;
        }
      }
      // use function to assign weighted value
      const lib = {
        "mouth": a(46, 0),
        "cake hole": a(2, 0),
        "cock pocket": a(6, 1),
        "cum dumpster": a(10, 1),
        "gob": a(6, 0),
        "hatch": a(8, 0),
        "pie hole": a(4, 0),
        "word hole": a(2, 0),
        "yap": a(4, 0),
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
    belly() {
      const lib = {
        belly: 4,
        tummy: 2,
        stomach: 3,
      };
      const list = Object.keys(lib); // get object keys "words"
      const pops: string[] = [];
      for (let i = 0, c = list.length; i < c; i++) {
        if (lib[list[i]] > 0) {
          for (const j = 0; j < lib[list[i]]; i++) {
            pops.push(list[i]);
          }
        }
      }
      const r = random(1, pops.length) - 1;
      return pops[r];
    },
  };
  const misc = {};
  const verb = {
    tithang() {},
    titbounce() {},
    titswing() {},
  };
  /*UTILITY FUNCTIONS*/
  function weight(n, s, v) {
    let r;
    if (!target) { // word only no size ref
      if (s !== 1 && s !== 5) {
        return n;
      } else {
        return 0;
      }
    } else if (v === 3) {// big
      switch (s) {
        case 0:
          r = n;
          break;
        case 1:
        case 2:
          r = 0;
          break;
        case 3:
          r = Math.floor(n / 2);
          break;
        case 4:
          r = n;
          break;
        case 5:
          r = n * 2;
          break;
        default:
          r = 0;
          break;
      }
      return r;
    } else if (v === 1) {// small
      switch (s) {
        case 0:
          r = n;
          break;
        case 5:
        case 4:
          r = 0;
          break;
        case 3:
          r = Math.floor(n / 2);
          break;
        case 2:
          r = n;
          break;
        case 1:
          r = n * 2;
          break;
        default:
          r = 0;
          break;
      }
      return r;
    } else {// just right
      switch (s) {
        case 0:
          r = n;
          break;
        case 1:
          r = 0;
          break;
        case 2:
          r = Math.floor(n / 2);
          break;
        case 3:
          r = n;
          break;
        case 4:
          r = Math.floor(n / 2);
          break;
        case 5:
          r = 0;
          break;
        default:
          r = 0;
          break;
      }
      return r;
    }
  }
  /***************************************************
   * UTILITY FUNCTIONS
   ***************************************************/
  function eth(...ar) {
    if ("string" === typeof ar[0]) {
      const r = random(1, ar.length) - 1;
      return ar[r];
    } else if ("object" === typeof ar[0]) {
      const props = Object.keys(ar[0]);
      const ta: string[] = [];
      for (let i = 0, c = props.length; i < c; i++) {
        const n = ar[0][props[i]];
        for (let j = 0; j < n; j++) {
          ta.push(props[i]);
        }
      }
      const r = random(1, ta.length) - 1;
      return ta[r];
    } else {
      aw.con.warn(`Invalid value sent to parse subfunction eith. Value: ${ar}`);
      return "Error eth(invalid value)";
    }
  }
  function parseCmd(cmd) {
    // this is a bit of a 'safety' function to help fix issues with variations due to capitalization and such.
    // could add typo fixes or common word confusions later.
    let out = cmd.toLowerCase();
    out = out.trim();
    return out;
  }
  function getReference(): any {
    if (npc === -1) {
      return ↂ.pc as PC; // returns PC object reference
    }
    if ("string" === typeof npc && npc === "word") {
      return false; // returns a false value to trigger generic word search
    }
    if ("string" === typeof npc && aw.npc[npc] !== null) {
      return aw.npc[npc] as NPC; // returns ref to specific NPC
    }
    if ("number" === typeof npc && npc >= 0 && npc < ᛔ.activeNPC.length) {
      return aw.npc[ᛔ.activeNPC[npc]] as NPC; // returns ref to specific NPC (based on index)
    }
    if ("object" === typeof npc && !Array.isArray(npc) && Object.keys(npc).includes("body")
    && Object.keys(npc).includes("status")) {
      return npc as NPC; // in weird case that an NPC ref is passed to the parser for some reason
    }
    return new ReferenceError("Parser: Unable to return reference to npc based on supplied argument.");
  }
  // Finally return the result.
  const result = runCommand();
  return result;
};




