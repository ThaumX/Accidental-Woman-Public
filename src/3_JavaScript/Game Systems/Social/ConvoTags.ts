
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
  flooded: [1, 8],
  veryWet: [0, 6],
  wet: [0, 3],
  fullTits: [3, 3],
  milky: [0, 2],
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
          t.push("farmCOOP");
          break;
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
    if (setup.clothes.desc.exposureBottom === 50) {
      ᛟ.push("nakedBottom");
    } else if (setup.clothes.desc.exposureBottom >= 45) {
      ᛟ.push("practNakedBottom");
    } else if (setup.clothes.desc.exposureBottom >= 40) {
      ᛟ.push("exhibitBottom");
    }
    if (setup.clothes.desc.exposureTop === 50) {
      ᛟ.push("nakedTop");
      if (setup.clothes.desc.exposureBottom === 50) {
        ᛟ.push("buckNaked");
      }
    } else if (setup.clothes.desc.exposureTop >= 45) {
      ᛟ.push("practNakedTop");
    } else if (setup.clothes.desc.exposureTop >= 40) {
      ᛟ.push("exhibitTop");
    }
    if (setup.clothes.access.pussy) {
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
    return "Apologies, there has been an error retrieving conversation content. This conversation is probably dead. If you have time, please report this bug! :D";
  }
  const amt = aw.tagContent[cluster][tag].length - 1;
  if (amt < 0) {
    aw.con.warn(`empty array at (${cluster}, ${tag}) found by setup.cTag.getContent().`);
    return "Apologies, there has been an error retrieving conversation content. This conversation is probably dead. If you have time, please report this bug! :D";
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
    const output = setup.cTag.getContent(this.args[0], this.args[1]);
    // setup.interact.status.npc = "n101"; // FOR TESTING!!! REMOVE ME!!!
    return new Wikifier(this.output, output);
  },
});


// Macro for "self-thoughts"
Macro.add("selfthought", {
  handler() {
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
      const r = randomDist(probs); // get random tag based on weighting
      output = tags[r];
    }
    const max = setup.cTag.selfThoughts[output].length - 1;
    output = setup.cTag.selfThoughts[output][random(0, max)];
    const text = `<span class='sthought'>${output}</span>`;
    return new Wikifier(this.output, text);
  },
});

// $AW.startMale
/* tslint:disable:max-line-length */
setup.cTag.selfThoughts = {
  seriousIllness: [
    "So weak... I really think I might die this time...",
    "I really need to get to a hospital...",
  ],
  illness: [
    "I feel awful... I think maybe it's time to go see a doctor.",
  ],
  poorHealth: [
    "Ugg. I feel particularly shitty today.",
  ],
  amazingClothes: [
    "Damn these clothes look good!",
  ],
  niceClothes: [
    "I'm glad I was able to get a nice outfit together.",
  ],
  formalClothing: [
    "These clothes feel so restrictive... At least I don't have to wear a suit and tie...",
  ],
  slovenlyClothes: [
    "I feel a little like a pig... maybe I should get cleaned up.",
  ],
  superSexyClothes: [
    "I am positively hawt in these clothes!",
    "I bet everyone is going to be checking me out while I'm dressed so sexy. mmmmm...",
  ],
  sexyClothes: [
    "I bet everyone is going to be checking me out while I'm dressed so sexy. mmmmm...",
    "It's nice to feel sexy in clothes like these.",
  ],
  superCuteClothes: [
    "I wonder if these clothes are too childish... maybe I went overboard?",
    "This outfit is soooo cute. Where's a mirror I want to check it out again!",
  ],
  cuteClothes: [
    "This outfit is soooo cute. Where's a mirror I want to check it out again!",
    "Nothing like cute clothes to brighten your day!",
  ],
  nakedBottom: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Holy shit, exposing my pussy like this is fucking amazing!<<or>>Holy shit, I can't believe I'm exposing my pussy like this!<</has>><<else>>My pussy feels so nice in the fresh air without any clothes on.<</if>>",
    "<<if ↂ.pc.status.inPublic>>I really hope I don't get arrested for this...<<else>>I'd better remember to put on pants before going outside!<</if>>",
  ],
  practNakedBottom: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Holy shit, exposing my pussy like this is fucking amazing!<<or>>Holy shit, I can't believe I'm exposing my pussy like this!<</has>><<else>>I'd probably better put on some more clothes before going out, I think this might be pushing it.<</if>>",
  ],
  exhibitBottom: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Knowing that my pussy is nearly exposed is so sexy!<<or>>I've gotta remember to be extra careful so I don't flash my pussy.<</has>><<else>>...<</if>>",
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Anyone who takes a good look at me right now will probably be able to make out my pussy... and see just how turned-on that makes me.<<or>>I've gotta remember to be extra careful so I don't flash my pussy.<</has>><<else>>...<</if>>",
  ],
  nakedTop: [
    "<<if ↂ.pc.status.inPublic>>Everyone can see my breasts. ♥<<elseif ↂ.body.tits.cupNum > 14>>My tits are so much more comfortable like this...<<else>>...<</if>>",
  ],
  buckNaked: [
    "<<if ↂ.pc.status.inPublic>><<has exhibition>>Holy shit, being totally naked in public like this is fucking amazing!<<or>>Holy shit, I can't believe I'm walking around naked!<</has>><<else>>Hmmm humm hmmm <i>Let's go sunniiing</i>...<</if>>",
    "<<if ↂ.pc.status.inPublic>>I really hope I don't get arrested for this...<<else>>I'd better remember to get dressed before going outside!<</if>>",
  ],
  pussyAccess: [
    "The occasional breeze on my nether lips feels nice.",
  ],
  assAccess: [
    "<i>Ahhh,</i> it feels nice not to have any clothing chafing between my legs.",
  ],
  // buttAccess: [],
  nipAccess: [
    "My nipples have gotten pretty hard, haven't they?",
  ],
  // titsAccess: [],
  wetClothes: [
    "I hate the way wet clothes cling to your skin.",
    "I should really change into something nice and dry...",
  ],
  stainedClothes: [
    "<<has slut>>I hope someone notices these cum stains... maybe they'll give me some more!<<or>>I hope nobody notices the stains on my clothes...<</has>>",
  ],
  damagedClothes: [
    "I really need to look into buying some new clothes... These are really worn out.",
  ],
  kinkyClothes: [
    "<<if ↂ.pc.status.inPublic>>Mmmmm. These clothes are even better when I wear them in public.<<else>>Naughty clothes are the best.<</if>>",
  ],
  nightwear: [
    "<<if ↂ.pc.status.inPublic>>I wonder if I should have gotten changed before coming out?<<else>>...<</if>>",
  ],
  // swimwear: [],
  // athleticClothes: [],
  // lightPheromones: [],
  // pheromones: [],
  // goddess: [],
  diaphragm: [
    "<<if ↂ.pc.fert.fluid.cervix.length > 0>><i>Ahn!</i> every once in a while I feel the diaphragm inside me when I move... My cervix's little cum-filled bathtub is so sexy...<<else>>Ugg, I felt it again. I thought you weren't supposed to be able to tell a diaphragm is even there? Maybe I should just take it out for now...<</if>>",
  ],
  // sponge: [],
  // menstrualCup: [],
  onThePill: [
    "<<if ↂ.pc.trait.forgetful === 1>>...<<else>>Did I remember to take my birth control pill today?",
  ],
  hairyLegs: [
    "People will definitely notice I haven't shaved my legs in a while... maybe I should do that.",
  ],
  hairyPits: [
    "I'd better remember not to lift my arms, otherwise people are going to see my hairy armpits...",
  ],
  clownMakeup: [
    "I wonder what people will think about this makeup...",
  ],
  // garishMakeup: [],
  addicted: [
    `<<switch ↂ.pc.status.addict.max>><<case "sex">>I wonder when I'll get fucked again?<<case "alc">>I should go out for some drinks later.<<case "heat">>You know, that heat stuff made me feel <b>amazing</b>.<<case "satyr">>You know, that satyr stuff made me feel <b>amazing</b>.<<case "focus">>I could get so much done with focus, I feel slow now.<<case "cum">>I never really appreciated just how yummy cum is... Nature is amazing.<<case "zone">>Things feel so blah these days.<<case "cream">>I could use a deposit right about now.<</switch>>`,
  ],
  withdrawal: [
    `<<switch ↂ.pc.status.addict.max >><<case "sex">> I can't stop thinking about getting fucked... I could really use some cock right now.<<case "alc">>God I need a drink!<<case "heat">>I feel so <i>cold</i> inside... I should get some more of that heat.<<case "satyr">>Where did all my stamina go? Some satyr would help me get through this bullshit.<<case "focus">>Why can't I pay attention? Oh, look at that!<<case "cum">>I'm so thirsty... I could really go for a mouthful of nice, thick, yummy sperm.<<case "zone">>I'm a failure, I know it. There's no way I can do this by myself.<<case "cream">>My womb is seriously aching right now... I need to find someone to feed her...<</switch>>`,
  ],
  stressed: [
    "I could seriously use a break, I'm so stressed out...",
    "I don't know how much more of this I can take...",
  ],
  depressed: [
    "What's the point? My life is meaningless.",
    "I wish I was never born, it'd be so much better that way.",
  ],
  sad: [
    "Life has just been so shitty lately.",
    "I have a bad feeling, like something awful is going to happen.",
  ],
  aroused: [
    "I feel like I could lock myself in my room and cum my brains out for hours.",
    "What does an attractive woman have to do to get some cock in this town?",
  ],
  angry: [
    "I swear, I'm going to slap the next person who annoys me.",
  ],
  bimbo: [
    "What was I thinking again? I'm such a bimbo, tehe!",
    "I bet if I did that, it'd feel really good...",
    "It's so much easier when I don't have to think!",
    "I wonder if it's time for a makeover yet?",
    "Pink is such a pretty color!",
    "I really feel like sucking on something...",
  ],
  // perverted: [],
  latePreg: [
    "Oh! I just felt the baby kick!",
    "<<has pregnancy>>I'll be giving birth soon... I wonder how long it'll take to get pregnant again?<<or>>Not too much longer now, I'll be giving birth soon.<</has>>",
    "My back aches, this belly is heavy!<<has pregnancy>> It's so worth it though!<</has>>",
    "<<has pregnancy>>I just <b>love</b> being pregnant!<<or>>My feet are so swollen these days, I can't wait to get this over with.<</has>>",
  ],
  preg: [
    "<<has pregnancy>>I'm so happy that I got pregnant, it's wonderful!<<orhas risky>>Well, it's no wonder I ended up pregnant... at least it was fun!<<or>>I can't believe I ended up pregnant...<</has>>",
    "I'm really craving some <<print either('pickles', 'peanut butter', 'bbq', 'prairie oysters', 'ice cream')>> right now...",
  ],
  drunk: [
    "Wha? I'm totery not drunk yet!",
    "I wanna eat something... Maybe cock?",
  ],
  tipsy: [
    "I'm feeling pretty good!",
    "This is so much fun!",
  ],
  risky: [
    "I don't know why, but I am really craving a good fucking right now.",
    "My little kitty is acting seriously hungry today.",
  ],
  mindbreak: [
    "Cock? Cock!",
    "Ummmmmmmmmm... Cock?",
  ],
  flooded: [
    "I am completely soaked down there! It's running down my legs... <<if ↂ.pc.status.inPublic>>People are totally going to notice...<</if>>",
  ],
  veryWet: [
    "My pussy is <b><i>SO</i></b> wet. <<if ↂ.pc.status.inPublic>>People can probably tell...<</if>>",
  ],
  wet: [
    "All this moisture between my legs is a little distracting...",
  ],
  fullTits: [
    "Damn my boobs ache... they're rock-hard too. I need to get milked asap!",
    "I need to pump, my tits are killing me!",
  ],
  milky: [
    "The way my breasts tingle is pretty nice when I stop to think about it.",
  ],
  bullseye: [
    "I wonder if I'll spot anyone worthy of <i>'The People of Bullseye'</i>?",
    "This place always annoys me somehow...",
    "I'm just going to grab what I need and get out of here.",
  ],
  mall: [
    "So many choices... where should I go first?",
  ],
  // holefoods: [],
  park: [
    "The park is nice, but there's also something creepy about it...",
  ],
  adultDist: [
    "Ohh, it seems Toys and Stuffed is getting a delivery. I wonder if they have something new?",
    "Now this is the kind of place for me...",
  ],
  clubDist: [
    "<<if $time[0] > 18 || $time[0] < 4>>Some <i>'dancing'</i> sounds really good right about now!<<else>>It really looks different during the day...<</if>>",
    `I wonder if anyone actually believes that "dancing" or "girl's night" is the real reason we come here?`,
  ],
  downtown: [
    "I still can't get over how nice it is here...",
    "You know, it wouldn't take much and this area could have a really convincing 1950s theme going on!",
  ],
  home: [
    "There is no place like home",
  ],
  homeDirty: [
    "This place looks like a barn. It desperately needs some cleaning.",
    "My home is really dirty. How did I ever let that to happen?",
    "It is so dirty here that I feel like a hobo.",
  ],
  homeSparkles: [
    "It is such a pleasure to see my home so clean and tidy.",
    "This place looks really sparkles today!",
  ],
  homeCheap: [
    "This place looks poor, all the furniture is either too old either in shitty condition. I don't like it.",
    "My furniture looks really bad.",
  ],
  homeLuxury: [
    "I love my home! It looks luxurious.",
    "That furniture is neat.",
  ],
  // BFhome: [],
  // apartment: ["Even though they're just apartment buildings, they still have a pretty homey feeling to them..."],
  // recreation: [],
  // cumandgo: [],
  walkingDowntown: [
    "I'd never dream of walking so far back in the city, too dangerous...",
  ],
  // jogging: [],
  reservoir: [
    "The water seems pretty <<print either('tranquil', 'murky', 'clear')>> today.",
  ],
  medicalArea: [
    "The medical district seems so big... I guess it's good to have though.",
    "I wonder if I should look into getting some cosmetic treatments here...",
  ],
  industrial: [],
  government: [
    "The Appletree government is pretty imposing...",
    "I wonder how separate the government here really is from the Institute...",
  ],
  // residential: [],
  institute: [
    "I always get a strange feeling when I come here.",
  ],
  farmCOOP: [
    "The hucows here look so happy...",
  ],
};
