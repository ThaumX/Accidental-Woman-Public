
//   .d8888b.
//  d88P  Y88b
//  888    888
//  888         .d88b.  88888b.  888  888  .d88b.
//  888        d88""88b 888 "88b 888  888 d88""88b
//  888    888 888  888 888  888 Y88  88P 888  888
//  Y88b  d88P Y88..88P 888  888  Y8bd8P  Y88..88P
//   "Y8888P"   "Y88P"  888  888   Y88P    "Y88P"
//
//
//  88888888888
//      888
//      888
//      888   8888b.   .d88b.  .d8888b
//      888      "88b d88P"88b 88K
//      888  .d888888 888  888 "Y8888b.
//      888  888  888 Y88b 888      X88
//      888  "Y888888  "Y88888  88888P'
//                         888
//                    Y8b d88P
//                     "Y88P"


// NAMESPACE

if (setup.cTag === null || setup.cTag === undefined) {
  setup.cTag = {} as SetupConvoTags;
}

// INTERFACE

interface SetupConvoTags {
  location: () => string[];
  getTag: (minLevel: number, location: boolean) => string;
  build: (async: boolean) => void;
  tList: {
    [propName: string]: number[];
  };
  selfThoughts: {
    [propName: string]: string[];
  };
  priority: (level: number) => string[];
  getContent: (cluster: string, tag: string) => string;
}

// a listing of tags with weights and priority group
// [group, weight] group = 1 high to 3 low. 0 is self-only
setup.cTag.tList = {
  seriousIllness: [1, 10],
  illness: [1, 8],
  poorHealth: [2, 5],
  amazingClothes: [2, 4],
  niceClothes: [3, 2],
  formalClothing: [3, 4],
  slovenlyClothes: [2, 8],
  superSexyClothes: [2, 4],
  sexyClothes: [3, 2],
  superCuteClothes: [2, 4],
  cuteClothes: [3, 2],
  nakedBottom: [1, 10],
  practNakedBottom: [1, 8],
  exhibitBottom: [2, 8],
  nakedTop: [2, 7],
  buckNaked: [1, 25],
  practNakedTop: [3, 5],
  exhibitTop: [3, 3],
  pussyAccess: [2, 8],
  assAccess: [3, 5],
  buttAccess: [3, 1],
  nipAccess: [3, 3],
  titsAccess: [3, 2],
  wetClothes: [1, 7],
  stainedClothes: [2, 5],
  damagedClothes: [2, 4],
  kinkyClothes: [3, 4],
  nightwear: [2, 6],
  swimwear: [2, 4],
  athleticClothes: [3, 3],
  lightPheromones: [1, 4],
  pheromones: [1, 6],
  goddess: [1, 6],
  diaphragm: [0, 8],
  sponge: [0, 8],
  menstrualCup: [0, 8],
  onThePill: [0, 8],
  hairyLegs: [2, 7],
  hairyPits: [1, 8],
  clownMakeup: [1, 6],
  garishMakeup: [2, 3],
  addicted: [2, 3],
  withdrawal: [1, 6],
  stressed: [3, 3],
  depressed: [2, 5],
  sad: [3, 3],
  aroused: [2, 3],
  angry: [2, 6],
  bimbo: [3, 3],
  perverted: [3, 2],
  latePreg: [1, 5],
  preg: [2, 5],
  drunk: [1, 8],
  tipsy: [2, 5],
  risky: [0, 8],
  mindbreak: [1, 10],
  flooded: [2, 8],
  veryWet: [0, 6],
  wet: [0, 3],
  fullTits: [3, 3],
  milky: [0, 2],
  tattoo: [3, 2],
  scar: [3, 2],
  bodywriting: [1, 4],
  lewdTattoo: [2, 4],
};

setup.cTag.priority = function(level: number = 3): string[] {
  if (aw.cTag.includes("none")) {
    aw.cTag.delete("none");
  }
  const filtered: string[] = [];
  for (const tag of aw.cTag) {
    if (setup.cTag.tList[tag] == null) {
      aw.con.info(`bad or missing tag discovered: ${tag}`);
    } else {
      if (setup.cTag.tList[tag][0] <= level && setup.cTag.tList[tag][0] > 0) {
        filtered.push(tag);
      }
    }
  }
  return filtered;
};

setup.cTag.getTag = function(minLevel: number = 1, location: boolean = true): string {
  // basic tag list get
  const tags = setup.cTag.priority(minLevel);
  // array to hold relative weighting
  const amts: number[] = [];
  // variable for simple total of all weights
  let total = 0;
  for (const tag of tags) {
    // get each tag's weight, push to amts and add to total.
    let n = setup.cTag.tList[tag][1];
    amts.push(n);
    total += n;
  }
  if (location) {
    // if location included, must add a weight... use the average weight of all tags.
    const a = Math.ceil(total / tags.length);
    // get actual location tag/s (array)
    const t = setup.cTag.location();
    // add location tag/s to tags, similar step to add to amts and total.
    for (const tag of t) {
      tags.push(tag);
      amts.push(a);
      total += a;
    }
  }
  // random number fun - use to choose tag.
  let rand = random(1, total);
  // iterate through tags to find match.
  for (const tag of tags) {
    const num = amts.shift();
    if (num == null) {
      aw.con.warn("Missing number in setup.cTag.getTag nums array!");
      return either(...tags);
    }
    if (rand < num) {
      return tag;
    }
    rand -= num;
  }
  if (tags.length === 0) {
    return "random";
  }
  aw.con.warn("Somehow didn't find a valid conversation tag! setup.cTag.getTag");
  return either(...tags);
};

// return some location tags.
setup.cTag.location = function(): string[] {
  const map = ↂ.map.loc;
  const lastMap = ↂ.map.lastLoc;
  const t: string[] = [];
  // the list of tags here is currently quite simple.
  // The intent is to expand them as content exists that can utilize it.
  switch (map[0]) {
    case "bullseye":
      t.push("bullseye");
      break;
    case "downtown":
      switch (map[1]) {
        case "mall":
          t.push("mall");
          break;
        case "holefoods":
          t.push("holefoods");
          break;
        case "park":
        case "community":
        case "square":
          t.push("park");
          break;
        case "adult":
          t.push("adultDist");
          break;
        case "club":
          t.push("clubDist");
          break;
        default:
          t.push("downtown");
          break;
      }
      break;
    case "home":
      const average = Math.round((ↂ.home.clean.floors + ↂ.home.clean.surfaces + ↂ.home.clean.kitchen + ↂ.home.clean.bathroom + ↂ.home.clean.neatness + (ↂ.home.clean.dishes * 10) + (ↂ.home.clean.laundry * 10) + (ↂ.home.clean.bed * 10) + ↂ.home.clean.deepclean) / 10);
      if (average < 4) {
        t.push("homeDirty");
      } else if (average > 8) {
        t.push("homeSparkles");
      }
      const quality = setup.homeItems.qualityCalculator("pcHome");
      if (quality < 2) {
        t.push("homeCheap");
      } else if (quality > 2) {
        t.push("homeLuxury");
      }
      t.push("home");
      break;
    case "BFhome":
      t.push("BFhome");
      break;
    case "residential":
      switch (map[1]) {
        case "common":
          t.push("apartment");
          break;
        case "recreation":
          t.push("recreation");
          break;
        case "cumandgo":
          t.push("cumandgo");
          break;
        case "walkdowntown":
          t.push("walkingDowntown");
          break;
        case "jogging":
          t.push("jogging");
          break;
        case "reservoir":
          t.push("reservoir");
          break;
        case "medical":
          t.push("medicalArea");
          break;
        case "industrial":
          t.push("industrial");
          break;
        case "government":
          t.push("government");
          break;
        default:
          t.push("residential");
          break;
      }
      break;
    case "world":
      switch (map[1]) {
        case "institute":
          t.push("institute");
          break;
        case "coop":
          if (map[2] === "FertCorpsFair") {
            t.push("FertCorpsFair");
            break;
          } else {
            t.push("farmCOOP");
            break;
          }
      }
      break;
  }
  return t;
};


// the purpose of this function is to build an array of tags
// that represent valid conversational topics. This only creates a list of
// tags. Weighting, randomization, and everything else is handled when a
// conversation is required. This reduces the per-passage cost.
setup.cTag.build = function(async: boolean = true): void {
  aw.cTag = [];
  const ᛟ = aw.cTag;
  const ᛔ = State.active.variables;
  const pc = ↂ.pc;
  // splitting this into a subfunction to make later async easier
  function checks(): void {
    if (pc.status.health < 50) {
      ᛟ.push("seriousIllness");
    } else if (pc.status.health < 80) {
      ᛟ.push("illness");
    } else if (pc.status.health < 90) {
      ᛟ.push("poorHealth");
    }
    if (pc.clothes.stats.atr > 15) {
      ᛟ.push("amazingClothes");
    } else if (pc.clothes.stats.atr > 10) {
      ᛟ.push("niceClothes");
    }
    if (pc.clothes.stats.formal > 6) {
      ᛟ.push("formalClothing");
    } else if (pc.clothes.stats.formal < -3) {
      ᛟ.push("slovenlyClothes");
    }
    if (pc.clothes.stats.sexy > 5) {
      ᛟ.push("superSexyClothes");
    } else if (setup.clothes.desc.sexy > 3) {
      ᛟ.push("sexyClothes");
    } else if (setup.clothes.desc.sexy < -5) {
      ᛟ.push("superCuteClothes");
    } else if (setup.clothes.desc.sexy < -3) {
      ᛟ.push("cuteClothes");
    }
    if (ↂ.pc.clothes.stats.exposureBot === 50) {
      ᛟ.push("nakedBottom");
    } else if (ↂ.pc.clothes.stats.exposureBot >= 45) {
      ᛟ.push("practNakedBottom");
    } else if (ↂ.pc.clothes.stats.exposureBot >= 40 && ↂ.toys.parts.groin === false) {
      ᛟ.push("exhibitBottom");
    }
    if (ↂ.pc.clothes.stats.exposureTop === 50) {
      ᛟ.push("nakedTop");
      if (ↂ.pc.clothes.stats.exposureBot === 50) {
        ᛟ.push("buckNaked");
      }
    } else if (ↂ.pc.clothes.stats.exposureTop >= 45) {
      ᛟ.push("practNakedTop");
    } else if (ↂ.pc.clothes.stats.exposureTop >= 40) {
      ᛟ.push("exhibitTop");
    }
    if (setup.clothes.access.pussy && ↂ.toys.parts.groin === false) {
      ᛟ.push("pussyAccess");
    }
    if (setup.clothes.access.ass) {
      ᛟ.push("assAccess");
    } else if (setup.clothes.access.butt) {
      ᛟ.push("buttAccess");
    }
    if (setup.clothes.access.nip) {
      ᛟ.push("nipAccess");
    } else if (setup.clothes.access.tits) {
      ᛟ.push("titsAccess");
    }
    if (setup.clothes.wet) {
      ᛟ.push("wetClothes");
    }
    if (setup.clothes.stained) {
      ᛟ.push("stainedClothes");
    }
    if (setup.clothes.damaged) {
      ᛟ.push("damagedClothes");
    }
    if (setup.clothes.kinky) {
      ᛟ.push("kinkyClothes");
    }
    if (setup.clothes.nightwear) {
      ᛟ.push("nightwear");
    }
    if (setup.clothes.swimwear) {
      ᛟ.push("swimwear");
    }
    if (setup.clothes.athletic) {
      ᛟ.push("athleticClothes");
    }
    if (pc.mutate.litePhero) {
      ᛟ.push("lightPheromones");
    }
    if (pc.mutate.pheromone) {
      ᛟ.push("pheromones");
    }
    if (pc.mutate.goddess) {
      ᛟ.push("goddess");
    }
    if (pc.status.birthCon.worn) {
      if (pc.status.birthCon.diaphragm.worn) {
        ᛟ.push("diaphragm");
      }
      if (pc.status.birthCon.sponge.worn) {
        ᛟ.push("sponge");
      }
      if (pc.status.birthCon.menstrualCup.worn) {
        ᛟ.push("menstrualCup");
      }
    }
    if (pc.status.birthCon.hormoneType !== "none" && !pc.status.birthCon.knowIneffective) {
      ᛟ.push("onThePill");
    }
    if (pc.groom.leghair > 2) {
      ᛟ.push("hairyLegs");
    }
    if (pc.groom.armpit > 3) {
      ᛟ.push("hairyPits");
    }
    if (pc.groom.makeup.clown) {
      ᛟ.push("clownMakeup");
    }
    try {
      if ((aw.makeup.eye[pc.groom.eyeMU].garish + aw.makeup.gen[pc.groom.genMU].garish + aw.makeup.lip[pc.groom.lipMU].garish) >= 12) {
        ᛟ.push("garishMakeup");
      }
    } catch (e) {
      aw.con.info("makeup check doesn't work :P");
    }
    if (pc.status.addict.maxValue > 50) {
      ᛟ.push("addicted");
    }
    if (pc.status.addict.withdrawl) {
      ᛟ.push("withdrawal");
    }
    if (pc.status.stress > 60) {
      ᛟ.push("stressed");
    }
    if (pc.status.happy < -6) {
      ᛟ.push("depressed");
    } else if (pc.status.happy < -3) {
      ᛟ.push("sad");
    }
    if (pc.status.arousal >= 8) {
      ᛟ.push("aroused");
    }
    if (pc.status.anger > 5) {
      ᛟ.push("angry");
    }
    if (pc.status.bimbo > 79) {
      ᛟ.push("bimbo");
    }
    if (pc.status.perversion > 79) {
      ᛟ.push("perverted");
    }
    try {
      if (pc.status.wombA.preg) {
        if (pc.status.wombA.fetus[0].grow[0] >= 80) {
          ᛟ.push("latePreg");
        } else if (pc.status.wombA.fetus[0].grow[0] >= 50) {
          ᛟ.push("preg");
        }
      }
    } catch (e) {
      aw.con.warn(`[minor] error in convo tags generation. (womb A) ${e.name}: ${e.message}.`);
    }
    try {
      if (pc.status.wombB.exists && pc.status.wombB.preg) {
        if (pc.status.wombB.fetus[0].grow[0] >= 80) {
          ᛟ.push("latePreg");
        } else if (pc.status.wombB.fetus[0].grow[0] >= 50) {
          ᛟ.push("preg");
        }
      }
    } catch (e) {
      aw.con.warn(`[minor] error in convo tags generation. (womb B) ${e.name}: ${e.message}.`);
    }
    if (pc.status.alcohol > 3) {
      ᛟ.push("drunk");
    } else if (pc.status.alcohol > 1) {
      ᛟ.push("tipsy");
    }
    if (pc.status.risk > 3) {
      ᛟ.push("risky");
    }
    if (pc.status.mindbreak) {
      ᛟ.push("mindbreak");
    }
    if (pc.status.wetness > 14) {
      ᛟ.push("flooded");
    } else if (pc.status.wetness > 9) {
      ᛟ.push("veryWet");
    } else if (pc.status.wetness > 4) {
      ᛟ.push("wet");
    }
    if (pc.status.injury.length > 0) {
      ᛟ.push(...pc.status.injury);
    }
    if (pc.status.milk > 2) {
      ᛟ.push("milky");
    }
    if (pc.status.milkStore > pc.body.lactCapacity) {
      ᛟ.push("fullTits");
    }
    if (ↂ.pc.tattoo.visible[0] && ↂ.pc.tattoo.visible[2]) {
      ᛟ.push("tattoo");
    }
    if (ↂ.pc.tattoo.visible[0] && ↂ.pc.tattoo.visible[1] && ↂ.pc.tattoo.visible[2]) {
      ᛟ.push("lewdTattoo");
    }
    if (ↂ.pc.tattoo.visible[0] && ↂ.pc.tattoo.visible[3]) {
      ᛟ.push("bodywriting");
    }
    if (ↂ.pc.tattoo.visible[0] && ↂ.pc.tattoo.visible[4]) {
      ᛟ.push("scar");
    }
    if (ↂ.toys.parts.groin !== false || ↂ.toys.parts.clit === "clitShield") {
      ᛟ.push("chastity");
    }
    if (ↂ.toys.parts.mouth !== false) {
      ᛟ.push("gag");
    }
    if (ↂ.toys.parts.vagina !== false) {
      ᛟ.push("vagToy");
    }
    if (ↂ.toys.parts.asshole !== false) {
      ᛟ.push("assToy");
    }
    aw.con.info(`Conversation Tags Generated.`);
  }
  if (async) {
    setTimeout(checks, 40);
  } else {
    checks();
  }
};

// returns randomized content for given cluster and tag, with error handling
setup.cTag.getContent = function(cluster: string, tag: string): string {
  if (aw.tagContent[cluster] == null || aw.tagContent[cluster][tag] == null) {
    aw.con.warn(`Invalid cluster or tag names (${cluster}, ${tag}) given to setup.cTag.getContent()!`);
    return `Our Apologies, the ${cluster} conversation tag ${tag} content hasn't been written just yet. We'll be getting more of these written and edited soon, so thanks for your patience!<br><<include "NPCinteraction-AcquaintContinue">>`;
  }
  const amt = aw.tagContent[cluster][tag].length - 1;
  if (amt < 0) {
    aw.con.warn(`empty array at (${cluster}, ${tag}) found by setup.cTag.getContent(). Let's shove some random line to fix thing.`);
    return aw.tagContent[cluster].random[random(0, (aw.tagContent[cluster].random.length - 1))];
    // return "Apologies, there has been an error retrieving conversation content. This conversation is probably dead. If you have time, please report this bug! :D";
  }
  const r = (amt === 0) ? 0 : random(0, amt);
  return aw.tagContent[cluster][tag][r];
};

// Macro to get content
//  <<ctagcontent "cluster" "tag">>
Macro.add("ctagcontent", {
  handler() {
    if (this.args.length < 2 || this.args.length > 2) {
      return this.error(`Incorrect number of arguments. ${this.args.length} were given, 2 are required. cluster, tag`);
    }
    let output: string;
    try {
      output = setup.cTag.getContent(this.args[0], this.args[1]);
    } catch (e) {
      aw.con.info(`Unable to retrieve conversation tag [${this.args[0]}, ${this.args[1]}].`);
      output = `Our Apologies, the ${this.args[0]} conversation tag ${this.args[1]} content hasn't been written just yet. We'll be getting more of these written and edited soon, so thanks for your patience!`;
    }
    if (output == null) {
      aw.con.info(`Unable to retrieve conversation tag [${this.args[0]}, ${this.args[1]}].`);
      output = `Our Apologies, the ${this.args[0]} conversation tag ${this.args[1]} content hasn't been written just yet. We'll be getting more of these written and edited soon, so thanks for your patience!`;
    }
    return new Wikifier(this.output, output);
  },
});


// Macro for "self-thoughts"
Macro.add("selfthought", {
  handler() {
    try {
      const threshold = 3; // x of 10 times doesn't think anything
      let output = "<span class='sthought'>...</span>";
      if (random(1, 10) <= threshold) {
        return new Wikifier(this.output, output);
      }
      const tags = aw.cTag;
      const loc = setup.cTag.location();
      if (!loc.includes(ↂ.flag.selfThought)) {
        ↂ.flag.selfThought = loc[0];
        output = loc[0];
        if (setup.cTag.selfThoughts[output] == null) { // failsafe
          output = "<span class='sthought'>...</span>";
          return new Wikifier(this.output, output);
        }
      } else {
        ↂ.flag.selfThought = loc[0];
        const probs: number[] = [];
        for (const tag of tags) {
          if (setup.cTag.tList[tag] != null && setup.cTag.selfThoughts[tag] != null) { // make sure there's text for the tag
            probs.push(setup.cTag.tList[tag][1]);
          } else {
            probs.push(0);
          }
        }
        aw.con.info(`selfthought results 1: ${probs}`);
        if (probs !== null && probs.length > 1){ // more failsafe
          const r = randomDist(probs); // get random tag based on weighting
          output = tags[r];
        }
      }
      aw.con.info(`selfthought results 2: ${output}, ${setup.cTag.selfThoughts[output]} `);
      if (setup.cTag.selfThoughts[output] != null && output != null) {
        const max = setup.cTag.selfThoughts[output].length - 1;
        output = setup.cTag.selfThoughts[output][random(0, max)];
        const text = `<span class='sthought'>${output}</span>`;
        return new Wikifier(this.output, text);
      } else {
        return new Wikifier(this.output, `<span class='sthought'><<= either("I wonder if birds have penises", "How does my voice sound to other people?", "Did I lock the door last time I left home?", "...", "...", "...", "...", "...")>></span>`);
      }
    } catch (e) {
      aw.con.info(`Selfthought macro failed with error ${e.name}: ${e.message}`);
      return new Wikifier(this.output, "<span class='sthought'>...La la laaa la...</span>");
    }
  },
});

// $AW.startMale
/* tslint:disable:max-line-length */
setup.cTag.selfThoughts = {
  seriousIllness: [
    "So weak... I really think I might die this time...",
    "I really need to get to a hospital...",
    "I must call an ambulance immediately!",
    "Shit, I really feel I am dying!",
  ],
  illness: [
    "I feel awful... I think maybe it's time to go see a doctor.",
    "I feel bad. Is there any drug store?",
    "It seems that I have caught something. What a nasty feeling!",
  ],
  poorHealth: [
    "Ugg. I feel particularly shitty today.",
    "It seems that I am sick. I need to lie down.",
    "My health leaves something to be desired.",
  ],
  amazingClothes: [
    "Damn these clothes look good!",
    "I have never looked so amazing!",
    "What an incredible dressing! I will have all eyes locked on me!",
  ],
  niceClothes: [
    "I'm glad I was able to get a nice outfit together.",
    "These clothes do deserve to supplement my wardrobe.",
    "This dressing should flatter my beauty.",
  ],
  formalClothing: [
    "These clothes feel so restrictive... At least I don't have to wear a suit and tie...",
    "Well, I look like a business woman.",
    "This body can look sexy even in the formal clothing.",
  ],
  slovenlyClothes: [
    "I feel a little like a pig... maybe I should get cleaned up.",
    "Even dirty clothes cannot ruin true beauty! Sounds like a quote of some famous writer...",
    "Is it enough to dust my clothes off to look better?",
  ],
  superSexyClothes: [
    "I am positively hawt in these clothes!",
    "I bet everyone is going to be checking me out while I'm dressed so sexy. mmmmm...",
    "I have never felt so sexy! It seems I spread the lust around me.",
    "Ha! If I take pictures of me and sell them to the erotic magazine, I will soon get rich!",
  ],
  sexyClothes: [
    "I bet everyone is going to be checking me out while I'm dressed so sexy. mmmmm...",
    "It's nice to feel sexy in clothes like these.",
    "Where is a mirror? What a pretty chicklet I will see!",
    "If I wear these clothes walking outside, I’ll be a cause of many car incidents!",
  ],
  superCuteClothes: [
    "I wonder if these clothes are too childish... maybe I went overboard?",
    "This outfit is soooo cute. Where's a mirror I want to check it out again!",
    "I look so cute in these clothes that I have to buy a big gun, for contrast.",
    "I look like the dream of a child molester!",
  ],
  cuteClothes: [
    "This outfit is soooo cute. Where's a mirror I want to check it out again!",
    "Nothing like cute clothes to brighten your day!",
    "I would give candy to the girl dressed like this!",
    "Sometimes I can afford to wake up my inner child.",
  ],
  nakedBottom: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Holy shit, exposing my pussy like this is fucking amazing!<<or>>Holy shit, I can't believe I'm exposing my pussy like this!<</has>><<else>>My pussy feels so nice in the fresh air without any clothes on.<</if>>",
    "<<if ↂ.pc.status.inPublic>>I really hope I don't get arrested for this...<<else>>I'd better remember to put on pants before going outside!<</if>>",
    "<<if ↂ.pc.status.inPublic>>I wonder why all these people are staring at me. Ah, yes, my pussy is naked. I have almost forgotten!<<else>>Well, ok. I can have the naked pussy and the poker face at the same time.<</if>>",
    "<<if ↂ.pc.status.inPublic>>Well, the woman body has an edge. When its bottom is naked, it does not inconvenience walking.<<else>>Oh shit, the wind is touching my pussy like it eats me! Ah… it is amazing!<</if>>",
  ],
  practNakedBottom: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Holy shit, exposing my pussy like this is fucking amazing!<<or>>Holy shit, I can't believe I'm exposing my pussy like this!<</has>><<else>>I'd probably better put on some more clothes before going out, I think this might be pushing it.<</if>>",
    "<<if ↂ.pc.status.inPublic>>I feel so sexy! And the people around me appear to feel the same. Amazing!<<else>>I wonder whether I wear a short skirt or a wide belt...<</if>>",
    "<<if ↂ.pc.status.inPublic>>Oh shit, my pussy is almost naked! Ha… should I care after all?<<else>>Perhaps I should take all my clothes off. It might be comfier.<</if>>",
  ],
  exhibitBottom: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Knowing that my pussy is nearly exposed is so sexy!<<or>>I've gotta remember to be extra careful so I don't flash my pussy.<</has>><<else>>...<</if>>",
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Anyone who takes a good look at me right now will probably be able to make out my pussy... and see just how turned-on that makes me.<<or>>I've gotta remember to be extra careful so I don't flash my pussy.<</has>><<else>>...<</if>>",
    "<<if ↂ.pc.status.inPublic>>Fuck, fuck, fuck… eh… I wonder whether the people heard the swearing or the encouragement... I should be careful in words.<<else>>It is the best clothes for a woman looking for sex. However, am I looking today?<</if>>",
    "<<if ↂ.pc.status.inPublic>>That APD officer is looking at me funny. Is she resenting or envying?<<else>>Well, these clothes look intriguing and exciting.<</if>>",
  ],
  nakedTop: [
    "<<if ↂ.pc.status.inPublic>>Everyone can see my breasts. ♥<<elseif ↂ.body.tits.cupNum > 14>>My tits are so much more comfortable like this...<<else>>...<</if>>",
    "<<if ↂ.pc.status.inPublic>>It seems that the people enjoy seeing my tits. I wonder what they would feel if I took all my clothes off.<<else>>It’s too warm today… Do I have to put on a T-shirt going outside? I am a sexy woman, after all!<</if>>",
    "<<if ↂ.pc.status.inPublic>>Oh, fucking shit, my boobs are naked! I have forgotten again that this body has knockers!<<else>>My tits are certainly pretty! Maybe I should pierce my nips to make them completely amazing!<</if>>",
  ],
  buckNaked: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Holy shit, being totally naked in public like this is fucking amazing!<<or>>Holy shit, I can't believe I'm walking around naked!<</has>><<else>>Hmmm humm hmmm <i>Let's go sunniiing</i>...<</if>>",
    "<<if ↂ.pc.status.inPublic>>I really hope I don't get arrested for this...<<else>>I'd better remember to get dressed before going outside!<</if>>",
    "<<if ↂ.pc.status.inPublic>>I feel like a bitch at the dog wedding... Holy shit, and I like this feeling!<<else>>My naked beauty it certainly too amazing to hide it.<</if>>",
    "<<if ↂ.pc.status.inPublic>>This funny guy looks like he is wanking off to me just now. I am even flattered. <<else>>If I go outside, I will be a cause of many car incidents.<</if>>",
  ],
  pussyAccess: [
    "The occasional breeze on my nether lips feels nice.",
    "Fuck, I have no knickers! Thank goodness, I have no menses as well...",
    "Well, if I desire to wank, it will be much easier.",
  ],
  assAccess: [
    "<i>Ahhh,</i> it feels nice not to have any clothing chafing between my legs.",
    "Well, if I want to take a dump, it will be much easier.",
    "By the way, mommy told me not to sit on rocks too long to avoid piles. Why have I suddenly remembered it? Ah yes. Because my ass is naked.",
  ],
  buttAccess: [
    "This feeling of the wind on my butt... thee-hee.",
    "I should avoid sitting on wet benches.",
    "Of course, my butt is pretty, and people like seeing it… But I should better put on a belt.",
  ],
  nipAccess: [
    "My nipples have gotten pretty hard, haven't they?",
    "My tits are certainly too amazing to hide them.",
    "Once I said to my girlfriend that her boobs fit my hand and I am in awe of it. I wonder if someone can say the same about my knockers...",
  ],
  // titsAccess: [],
  wetClothes: [
    "I hate the way wet clothes cling to your skin.",
    "I should really change into something nice and dry...",
    "The wet clothes certainly flatter the shape of my boobs.",
    "I feel like I am wearing soaked doormats! My clothes are so wet that I could squeeze them.",
  ],
  stainedClothes: [
    "<<has slut>>I hope someone notices these cum stains... maybe they'll give me some more!<<or>>I hope nobody notices the stains on my clothes...<</has>>",
    "This dirty stain on my sleeve looks like a small octopus.",
    "Oh shit, there is a stain on my clothes. I wonder whether it is dirt or cum...",
  ],
  damagedClothes: [
    "I really need to look into buying some new clothes... These are really worn out.",
    "Even a hobo will feel ashamed in such clothes!",
    "I should check the trash bin nearby. Perhaps I will find better clothes there!",
  ],
  kinkyClothes: [
    "<<if ↂ.pc.status.inPublic>>Mmmmm. These clothes are even better when I wear them in public.<<else>>Naughty clothes are the best.<</if>>",
    "<<if ↂ.pc.status.inPublic>>Oh shit, they all ogle me! What will I do if somebody comes to me offering to bang?<<else>>If I take my bra off, this cute wearing will become naughty and tempting. The people outside will go crazy, I think.<</if>>",
    "<<if ↂ.pc.status.inPublic>>I certainly look defiant wearing these clothes. And I do like it so much that I feel butterflies in my stomach!<<else>>These clothes will make everybody wanting to undress me!</if>>",
  ],
  nightwear: [
    "<<if ↂ.pc.status.inPublic>>I wonder if I should have gotten changed before coming out?<<else>>...<</if>>",
    "<<if ↂ.pc.status.inPublic>>Perhaps I look like a ghost in this nightgown.<<else>>If it were a bit warmer, I would better sleep naked.<</if>>",
    "<<if ↂ.pc.status.inPublic>>It is a bit bold to wear pajamas in public places, of course. However, all new fashion trends were defiant tricks in the beginning.<<else>>The cotton pajama is very comfortable. What a pity that I cannot wear it outside! Or… should I care?<</if>>",
  ],
    swimwear: [
    "<<if ↂ.pc.status.inPublic>>OK, I am ready to swim. Where is a beach?<<else>>Am I going to a beach or to a dating party?<</if>>",
    "<<if ↂ.pc.status.inPublic>>This swimsuit is too tight for me! My knockers will soon fall out of the brassiere!<<else>>I have never imagined how sexy I am in the swimsuit!<</if>>",
  ],
  athleticClothes: [
    "<<if ↂ.pc.status.inPublic>>I’m going to jog… I’m going to jog… Ha! Who am I kidding? I am going to flatter my shapes, of course.<<else>>This sportswear seems to be too warm. If there is sunny weather outside, I will sweat like a pig!<</if>>",
    "<<if ↂ.pc.status.inPublic>>OK, I am ready to visit the fitness club. Where is it?<<else>>This sportswear certainly goes great with my eyes color!<</if>>",
  ],
  // lightPheromones: [],
  // pheromones: [],
  // goddess: [],
  diaphragm: [
    "<<if ↂ.pc.fert.fluid.cervix.length > 0>><i>Ahn!</i> every once in a while I feel the diaphragm inside me when I move... My cervix's little cum-filled bathtub is so sexy...<<else>>Ugg, I felt it again. I thought you weren't supposed to be able to tell a diaphragm is even there? Maybe I should just take it out for now...<</if>>",
  ],
  // sponge: [],
  // menstrualCup: [],
  onThePill: [
    "<<if ↂ.pc.trait.forgetful === 1>>...<<else>>Did I remember to take my birth control pill today?<</if>>",
    "I wonder whether these pills do prevent the conceiving or I have to insist on using condoms anyway...",
    "Birth control pills are the greatest invention in the world! I may enjoy a naked cock in me without fear!",
  ],
  hairyLegs: [
    "People will definitely notice I haven't shaved my legs in a while... maybe I should do that.",
    "I should buy a razor to shave my legs if I want to be sexy.",
    "When I was a man, I never thought that hairy legs are a reason to feel ashamed.",
  ],
  hairyPits: [
    "I'd better remember not to lift my arms, otherwise people are going to see my hairy armpits...",
    "I should find a razor to shave my armpits if I want to look sexy.",
    "I have to either shave armpits or wear something with sleeves.",
  ],
  clownMakeup: [
    "I wonder what people will think about this makeup...",
    "Well, I am ready to look for a job in a circus. They will be happy to hire such a sexy clown!",
    "My face looks like a nightmare! I should immediately find a better makeup artist!",
  ],
  // garishMakeup: [],
  addicted: [
    `<<switch ↂ.pc.status.addict.max>><<case "sex">>I wonder when I'll get fucked again?<<case "alc">>I should go out for some drinks later.<<case "heat">>You know, that heat stuff made me feel <b>amazing</b>.<<case "satyr">>You know, that satyr stuff made me feel <b>amazing</b>.<<case "focus">>I could get so much done with focus, I feel slow now.<<case "cum">>I never really appreciated just how yummy cum is... Nature is amazing.<<case "zone">>Things feel so blah these days.<<case "cream">>I could use a deposit right about now.<</switch>>`,
    `<<switch ↂ.pc.status.addict.max>><<case "sex">>How long it’s been since my last orgasm. Do I have a vibrator?<<case "alc">>I should check my fridge. There was a bottle of wine.<<case "heat">>I never thought that I could be addicted to heat stuff...<<case "satyr">>I never thought that I could be addicted to satyr stuff...<<case "focus">>I feel like a slow dying snail.<<case "cum">>I am dreaming of the amazing taste of cum…<<case "zone">>I often think that life is boring.<<case "cream">>My womb is so empty… It needs some life inside.<</switch>>`,
    `<<switch ↂ.pc.status.addict.max>><<case "sex">>Ah… I feel a rush of hormones. I do need two or three orgasms to calm it down!<<case "alc">>Sobriety is boring. I need a glass of whiskey to make my life better.<<case "heat">>It’s time to get some heat, I suggest.<<case "satyr">>I need some satyr to improve my stamina.</b>.<<case "focus">>It’s so noisy! I am a bit distracted and need a focus.<<case "cum">>Sometimes I feel that cum is the best treat in the world...<<case "zone">>I am a weak man… er… a weak woman, of course.<<case "cream">>Well, if the most of women have such feelings in wombs from time to time, the humanity will never go extinct.<</switch>>`,
  ],
  withdrawal: [
    `<<switch ↂ.pc.status.addict.max >><<case "sex">> I can't stop thinking about getting fucked... I could really use some cock right now.<<case "alc">>God I need a drink!<<case "heat">>I feel so <i>cold</i> inside... I should get some more of that heat.<<case "satyr">>Where did all my stamina go? Some satyr would help me get through this bullshit.<<case "focus">>Why can't I pay attention? Oh, look at that!<<case "cum">>I'm so thirsty... I could really go for a mouthful of nice, thick, yummy sperm.<<case "zone">>I'm a failure, I know it. There's no way I can do this by myself.<<case "cream">>My womb is seriously aching right now... I need to find someone to feed her...<</switch>>`,
    `<<switch ↂ.pc.status.addict.max >><<case "sex">>I can only think of getting fucked. It seems that I have become a slut!<<case "alc">>I need some brandy… a bottle or two.<<case "heat">>I hate feeling cold inside! Some heat will surely help.<<case "satyr">>I am totally zonked out to live a full life. Some satyr will make me feel alive.<<case "focus">>I am totally distracted! Life without a focus is empty!<<case "cum">>Oh shit… I cannot stop dreaming of cum. At least one small sip...<<case "zone">>I’m a piece of shit. And I have no option to be anything else, I always knew it...<<case "cream">I am a slave of my womb, a victim of a breeding instinct.<</switch>>`,
    `<<switch ↂ.pc.status.addict.max >><<case "sex">>I will soon go mad if I had no cock inside!<<case "alc">>I’ll soon be ready to drink glass cleaner if it contains alcohol!<<case "heat">>It’s so hard to warm out! I need more and more heat to stop trembling!<<case "satyr">>I feel overpowering weakness… I need a satyr, or I will surely die!<<case "focus">>What the fuck, I cannot even remember my name! Ah, look, the sky is blue!<<case "cum">>I would give all treasures of the world to get a good mouthful of cum!<<case "zone">>I will never have a reason to self-respect… I am a total loser.<<case "cream">>My womb is going mad! I can’t stop dreaming of the conceiving!<</switch>>`,
  ],
  stressed: [
    "I could seriously use a break, I'm so stressed out...",
    "I don't know how much more of this I can take...",
    "If I want to remain sane, I need a moment to myself.",
    "Everything annoys me. I should get some rest.",
  ],
  depressed: [
    "What's the point? My life is meaningless.",
    "I wish I was never born, it'd be so much better that way.",
    "What’s the point of being alive if my life is so miserable...",
    "Sometimes I envy the dead. They quietly lay in graves having no concerns, fears, and sorrows...",
  ],
  sad: [
    "Life has just been so shitty lately.",
    "I have a bad feeling, like something awful is going to happen.",
    "I really hate being bored. And I hate having no other choice.",
    "All people are the small pieces of shit living on a large piece of dirt.",
  ],
  aroused: [
    "I feel like I could lock myself in my room and cum my brains out for hours.",
    "What does an attractive woman have to do to get some cock in this town?",
    "Do I know somebody to invite him into my lair for some banging?",
    "I would get some man with cock… or some woman with strap-on... Well, I have a wide choice in this town.",
  ],
  angry: [
    "I swear, I'm going to slap the next person who annoys me.",
    "If I had a gun, I would already have shoot somebody...",
    "I hate this town, these people, this Institute… Honestly, I do hate everything!",
  ],
  bimbo: [
    "What was I thinking again? I'm such a bimbo, tehe!",
    "I bet if I did that, it'd feel really good...",
    "It's so much easier when I don't have to think!",
    "I wonder if it's time for a makeover yet?",
    "Pink is such a pretty color!",
    "I really feel like sucking on something...",
    "I am happy, just like a hucow!",
    "Look, what a cute fluffy pussycat!",
  ],
  // perverted: [],
  latePreg: [
    "Oh! I just felt the baby kick!",
    "<<has pregnancy>>I'll be giving birth soon... I wonder how long it'll take to get pregnant again?<<or>>Not too much longer now, I'll be giving birth soon.<</has>>",
    "My back aches, this belly is heavy!<<has pregnancy>> It's so worth it though!<</has>>",
    "<<has pregnancy>>I just <b>love</b> being pregnant!<<or>>My feet are so swollen these days, I can't wait to get this over with.<</has>>",
    "I look like a clumsy duck with this belly!<<has pregnancy>>Eh… should I care, after all? My baby surely doesn’t!<</has>>",
    "I should start finding money to pay for a maternity home service.",
  ],
  preg: [
    "<<has pregnancy>>I'm so happy that I got pregnant, it's wonderful!<<orhas risky>>Well, it's no wonder I ended up pregnant... at least it was fun!<<or>>I can't believe I ended up pregnant...<</has>>",
    "I'm really craving some <<print either('pickles', 'peanut butter', 'bbq', 'prairie oysters', 'ice cream')>> right now...",
    "Pink is such a pretty color!",
    "I really feel like sucking on something...",
    "Why do I want to eat some <<print either('smoked tofu', 'fried tomato', 'buckwheat', 'eggnog', 'pineapple chips')>>all day? I never liked it so much.",
    "Shit, I will soon turn my inside out. I have nothing to puke up anymore!",
  ],
  drunk: [
    "Wha? I'm totery not drunk yet!",
    "I wanna eat something... Maybe cock?",
    "Hey, give me a glass of whiskey and a glass of brandy! And an empty beer glass… Now let’s mix the drinks...",
    "The people around me are so pretty and sexy! I love them! I must kiss everybody...",
  ],
  tipsy: [
    "I'm feeling pretty good!",
    "This is so much fun!",
    "The life is amazing!",
    "I love everybody!",
  ],
  risky: [
    "I don't know why, but I am really craving a good fucking right now.",
    "My little kitty is acting seriously hungry today.",
  ],
  mindbreak: [
    "Cock? Cock!",
    "Ummmmmmmmmm... Cock?",
    "Cock... Cock. Cock! Cock-a-doodle-do!",
    "Cock? Suck! Fuck...",
  ],
  flooded: [
    "I am completely soaked down there! It's running down my legs... <<if ↂ.pc.status.inPublic>>People are totally going to notice...<</if>>",
    "I got soaked to the skin, and I am cold! <<if ↂ.pc.status.inPublic>>I have to find some warm place to undress and dry my clothes out!<</if>>",
    "If I were a duck, I would feel pretty good... But now I am feeling like a wet hen!",
  ],
  veryWet: [
    "My pussy is <b><i>SO</i></b> wet. <<if ↂ.pc.status.inPublic>>People can probably tell...<</if>>",
    "It seems that I can fill a whole pond with this moisture...",
    "I must put a plug in my pussy if I want not to make a puddle under my legs!",
  ],
  wet: [
    "All this moisture between my legs is a little distracting...",
    "I have much moisture in my pussy and no cock to use it. What’s a waste!",
    "I wonder why I am so wet. <<if ↂ.pc.status.inPublic>>Perhaps somebody around me uses strong pheromones...<</if>>",
  ],
  fullTits: [
    "Damn my boobs ache... they're rock-hard too. I need to get milked asap!",
    "I need to pump, my tits are killing me!",
    "Oh shit, I look like a hucow escaped from a ranch!",
    "I hope my tits will not look like ears of spaniel after they are out of the milk!",
  ],
  tattoo: [
    "Mmm, I like my tattoos, they make me feel unique",
    "It seems to be a good idea to tattoo a dolphin near my pussy.",
    "If I ever become a man again, I will look funny with tattoos fitting to an attractive woman...",
  ],
  scar: [
    "Hmm. Maybe I need to remove this scar surgically?",
    "This scar looks ugly.",
    "I have no option but to turn to man again with this scar. The scars look good on men only.",
    "Hmm. This scar does not look too ugly. Honestly, it even flatter the beauty of my face.",
  ],
  bodywriting: [
    "Oh, anybody can notice this lewdness written on my body!",
    "Wearing this writings on my body for everybody too see is so humiliating...",
    "Wearing this writings on my body is so humiliating… and so arousing!",
    "My body now looks like an invitation to fuck me.",
  ],
  lewdTattoo: [
    "Oh, these tattoos are so lewd and visible to anybody...",
    "I wonder if anyone will notice my not-that-modest tattoos...",
    "My tattoos now look like an invitation to fuck me.",
    "Looking to my tattoos, even I become wet!",
  ],
  chastity: [
    "Ugh, I really want to touch my clit...",
    "Wearing this chastity is so humiliating...",
  ],
  gag: [
    "I hope nobody would start a convo with me while I am wearing this gag.",
    "I wonder if anybody notice me wearing a gag...",
    "If some cop wants to throw me in jail, he will save on a gag.",
    "Wearing this gag is so humiliating… and arousing!",
  ],
  vagToy: [
    "Mmm having my pussy filled feels so nice...",
    "Oh I like this thing in my pussy!",
    "Wow! This thing inside me is even better than many cocks!",
    "I like this toy in me… but a cock would be better.",
  ],
  assToy: [
    "Mmmhm, my ass is stretched so nicely all the time...",
    "It feels so full with this plug up my ass...",
    "I never thought that the feeling of a plug in my ass is so amazing!",
    "I should buy more ass toys! I am in awe of them!",
  ],
  milky: [
    "The way my breasts tingle is pretty nice when I stop to think about it.",
    "I heard some adult guys love sucking the milky tits. Perhaps I need to find some of them.",
    "I’ll soon have to buy bras of the larger size.",
  ],
  bullseye: [
    "I wonder if I'll spot anyone worthy of <i>'The People of Bullseye'</i>?",
    "This place always annoys me somehow...",
    "I'm just going to grab what I need and get out of here.",
    "If I want to do the shopping, I have to find a cart.",
    "This place is overstocked with food and beverages. Meanwhile, the kids in Africa are hungry and thirsty. Ha… should I care?",
  ],
  mall: [
    "So many choices... where should I go first?",
    "I should buy something pinky here! Am I a bimbo, after all?",
    "It’s too warm here. I want an ice cream cone before I go shopping.",
  ],
  FertCorpsFair: [
    "Never been to a country fair, it is interesting to see how local country folk have fun.",
    "Ah, they sell mulled wine in that stall! I must drink a glass of it!",
    "This tough farmer guy keeps eyes on me. He does look sexy... I would like to know what he hides under jeans! Is there some hayloft in the backyard?",
  ],
  // holefoods: [],
  park: [
    "The park is nice, but there's also something creepy about it...",
    "Ah, lilacs bloom everywhere! I like their fragrance so much!",
    "Perhaps I should rent a bike and have some riding...",
  ],
  adultDist: [
    "Ohh, it seems Toys and Stuffed is getting a delivery. I wonder if they have something new?",
    "Now this is the kind of place for me...",
    "How many pretty toys I see here! I wonder if the shop owners allow test drive of them...",
    "Wow! What is it? I can’t even imagine how to use this toy! Ah… this is a cane! The buyer of it should indeed be a brave man to use a penis-shaped walking stick!",
  ],
  clubDist: [
    "<<if $time[0] > 18 || $time[0] < 4>>Some <i>'dancing'</i> sounds really good right about now!<<else>>It really looks different during the day...<</if>>",
    `I wonder if anyone actually believes that "dancing" or "girl's night" is the real reason we come here?`,
    "This lonely guy at the corner table looks like he has money. Perhaps I may ask him to buy me a drink...",
    "Wow, they mix strong cocktails here! After I drink a couple of glasses more, I will start dancing on a bar!",
  ],
  downtown: [
    "I still can't get over how nice it is here...",
    "You know, it wouldn't take much and this area could have a really convincing 1950s theme going on!",
    "Appletree is nice. It always seems to me like an elaborately decorated cover of the Pandora’s box.",
    "The people around me look happy. And busy.",
  ],
  home: [
    "There is no place like home",
    "Home. Sweet home.",
    "I don’t still take this place as home.",
  ],
  homeDirty: [
    "This place looks like a barn. It desperately needs some cleaning.",
    "My home is really dirty. How did I ever let that to happen?",
    "It is so dirty here that I feel like a hobo.",
    "Even a hobo would feel ashamed living in such a mess!",
    "This place does need a cleaning day.",
  ],
  homeSparkles: [
    "It is such a pleasure to see my home so clean and tidy.",
    "This place looks really sparkles today!",
    "My home is now sterile, like an operating room!",
    "The modern cleaning supplies work wonders! I feel like I live in a palace!",
  ],
  homeCheap: [
    "This place looks poor, all the furniture is either too old either in shitty condition. I don't like it.",
    "My furniture looks really bad.",
    "Is it a flat or a flophouse?",
    "This furniture looks like it is dragged from junkyards!",
  ],
  homeLuxury: [
    "I love my home! It looks luxurious.",
    "That furniture is neat.",
    "This place looks like a palace!",
    "How luxurious! I even feel a bit awkward, surrounded by all these expensive stuff!",
  ],
  // BFhome: [],
  // apartment: ["Even though they're just apartment buildings, they still have a pretty homey feeling to them..."],
  // recreation: [],
  // cumandgo: [],
  walkingDowntown: [
    "I'd never dream of walking so far back in the city, too dangerous...",
    "I am tired a bit. Is there a bench to sit for a short time?",
    "Looks like it's going to rain. I should find a shelter or an umbrella.",
  ],
  // jogging: [],
  reservoir: [
    "The water seems pretty <<print either('tranquil', 'murky', 'clear')>> today.",
    "<<print either('Gulls', 'Ravens', 'Crows')>> are cawing... ",
    "Flies are pacing just above the water.",
  ],
  medicalArea: [
    "The medical district seems so big... I guess it's good to have though.",
    "I wonder if I should look into getting some cosmetic treatments here...",
    "I wonder if these hospitals are owned by the Institute too...",
    "Well, Appletree has no lack of hospitals.",
  ],
  industrial: [
    "Is it a plant or a hospital? Sometimes it is hard to tell one from the other.",
    "I wonder what they produce here...",
  ],
  government: [
    "The Appletree government is pretty imposing...",
    "I wonder how separate the government here really is from the Institute...",
    "I would not like being a major of Appletree. He has too many chiefs and not enough Indians.",
    "Being a major here is not a sinecure. He decides nothing. Decisions are made by the Thornton HQ, but the major is blamed for their failures.",
  ],
  // residential: [],
  institute: [
    "I always get a strange feeling when I come here.",
    "This is the heart of Appletree. Beating crooked heart... ",
    "I should be careful here. They definitely still look for me as an offender...",
  ],
  farmCOOP: [
    "The hucows here look so happy...",
    "I wonder if they also slay their cattle for meat...",
    "A farm and a brothel in the same place...",
  ],
};
