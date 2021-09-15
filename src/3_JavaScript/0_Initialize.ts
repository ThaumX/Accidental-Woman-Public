/*
. 8888888 888b    888 8888888 88888888888
.   888   8888b   888   888       888
.   888   88888b  888   888       888
.   888   888Y88b 888   888       888
.   888   888 Y88b888   888       888
.   888   888  Y88888   888       888
.   888   888   Y8888   888       888
. 8888888 888    Y888 8888888     888
.
. NEW GAME DATA INITIALIZATION
*/

interface setupInitialize {
  zero: () => void;
  one: () => void;
  two: () => void;
  three: () => void;
  four: () => void;
  five: () => void;
  six: () => void;
  seven: () => void;
  sevenHalf: () => void;
  eight: () => void;
  nine: () => void;
  ten: () => void;
  eleven: () => void;
  twelve: () => void;
  thirteen: () => void;
  fourteen: () => void;
  fifteen: () => void;
  final: () => void;
  savePrefs: () => void;
  resetPrefs: () => void;
  prefInit: () => void;
}

setup.initialize = {} as setupInitialize;

// Anenn markup!
aw.npcTemplates = {};

State.variables.clothes = "Casual";
State.variables.hair = "Casual";
State.variables.makeup = "Casual";

setup.initialize.zero = function() {
  // should be running mod loading commandos
  const balls = function() {
  try {
    aw.conLoad.autoLoad();
  } catch (e) {
    aw.con.warn(`Error loading mod package... ${e.name}: ${e.message}`);
  }
  aw.replace("#infos", "Base Variables...");
  setTimeout(() => setup.initialize.one(), 50);
  State.temporary.bypass = false;
  };
  setTimeout(balls, 200);
};

setup.initialize.one = function() {
  aw.replace("#barCunt", "");
  State.active.variables.showNewGame = false;
  State.active.variables.location = "Initializing Variables";
  // **********************************************************************************/
  //               PRIMARY GAME VARIABLES  $AW   or $                                 */
  // **********************************************************************************/
  State.active.variables.SCresult = ["filler"];
  State.active.variables.SCtext = ["filler"];
  State.active.variables.activeNPC = [];
  State.active.variables.return = "none";
  State.active.variables.scenario = [];
  State.active.variables.notes = [];
  State.active.variables.scene = { pc: "blank", npcs: ["none"], group: "blank", loc: "blank" };
  State.active.variables.AW.metric = false;
  State.active.variables.AW.tutorials = true;
  State.active.variables.AW.startMale = true;
  State.active.variables.AW.randomBody = 0;
  State.active.variables.AW.quickStart = 0;
  State.active.variables.AW.randomMind = 0;
  State.active.variables.AW.randomSexuality = 0;
  State.active.variables.AW.randomAttraction = 0;
  State.active.variables.AW.randomMutation = 0;
  State.active.variables.AW.cash = either(1900, 1950, 1950, 2000, 2000, 2000, 2050, 2050, 2100);
  State.active.variables.AW.cash += random(0, 24) + random(0, 25);
  State.active.variables.AW.diff = 1;
  State.active.variables.AW.premade = 0;
  State.active.variables.AW.author = true;
  State.active.variables.AW.medChange = false;
  State.active.variables.AW.locOwner = "Spot Holder";
  State.active.variables.AW.error = "Errors";
  State.active.variables.AW.weather = [];
  State.active.variables.AW.wxChance = 0;
  State.active.variables.AW.paperBlush = 0;
  State.active.variables.AW.paperOver = true;
  State.active.variables.AW.skyCon = "CLR";
  State.active.variables.AW.wxReport = "missing";
  State.active.variables.AW.sCheck = false;
  State.active.variables.AW.curBase = 1;
  State.active.variables.AW.weekReady = 0;
  State.active.variables.AW.toStoreNPCs = [];
  State.active.variables.AW.pcPortrait = "[img[You|IMGpcPort]]";

  State.active.variables.npcTemplate = {
    enabled: false,
    ratio: 25,
    count: 0,
  };

  // TIME AND DATE STUFFS*/
  State.active.variables.time = [18, 0, false];
  State.active.variables.date = [1, 1, 4, 2032]; // in-game date day, week, month, year*/
  State.active.variables.timeChunk = 0;
  State.active.variables.timeCount = 0;
  State.active.variables.tVal = 120960;

  // BF Homes
  State.active.variables.BFid = "n101";
  State.active.variables.BFname = "Lily";
  State.active.variables.BFnum = 4;
  State.active.variables.BFlove = false;
  State.active.variables.BFhome = false;
  State.active.variables.BFroom = "living room";

  // play time*/
  State.active.variables.week = 0;
  State.active.variables.year = 0;
  State.active.variables.dayTotal = 0;
  State.active.variables.midnight = 122400;
  aw.replace("#infos", "Creating Basic Player");
  setTimeout(() => setup.initialize.two(), 50);
};

setup.initialize.two = function() {

  // PLAYER CHARACTER DATA INITIALIZATION

  // .MAIN OBJECT
  const pc: any = {};

  pc.main = {
    ageOriginal: 30, // Age before transformation, variable exists for alternate starts.*/
    age: 21, // Age in years - Appearance only*/
    ageID: 21,
    idCard: "adult",
    name: either("Alice", "Beth", "Carla", "Diane", "Fiona", "Genevieve", "Holly", "Joan", "Kelly", "Leah", "Melissa", "Naomi", "Ophelia", "Polly", "Rachael", "Samantha", "Theresa", "Violet", "Wendy", "Zoe"), // limited name list*/
    // tslint:disable-next-line:max-line-length
    surname: either("Smith", "Jones", "Thompson", "Williams", "Drumph", "Hayes", "Miller", "Simpson", "MacDonald", "Murphy", "Young", "David", "Nevels", "North", "Waffle", "Gobble"),
    background: "homeless gloryhole worker",
    nickname: "none",
    bd: [5, 2, 6, 2002],
    female: true,
    male: false,
    genes: "XX",
    portrait: "none",
    suicide: false,
  };

  // .BODY OBJECT

  pc.body = {
    race: "white",
    skinColor: "tanned",
    tone: 3, // Muscles-Tone-Overall Health, 0-resvd, 1-frail, 2-weak, 3-normal, 4-toned, 5-muscular, 6-bodybuilder*/
    weight: 3, // fatness, 0-resvd, 1-anorexic, 2-thin, 3-normal, 4-plush, 5-chubby 6-fat*/
    shoulders: 3, // Width of Shoulder - 1-V-Narrow, 2-Narrow, 3-Average, 4-Broad, 5-V-Broad*/
    hips: 4, // Width of Hips - 1-V-Narrow, 2-Narrow, 3-Average, 4-Broad, 5-V-Broad, 6-Broodmother*/
    waist: 3, // comparative size of waist - 1-straight, 2-masculine, 3-curvy, 4-hourglass*/
    height: 67, // height in inches*/
    ass: 3, // Size of Butt - 1-practically none, 2-small, 3-normal, 4-large, 5-huge, 6-ridiculous*/
    pelvis: 4,

    tits: {
      shape: "teardrop",
      nipple: "normal", // normal, large, puffy, partially inverted, inverted,cow teat*/
      nipLength: 5, // 1 to 8 - 1=inverted grade 2, 3=flat, 5=med, 7=v-long 8=ridiculous*/
      nipGirth: 3, // 1 to 5 - 3=normal*/
      areola: 3, // 1 to 5 - 3 = normal*/
      puffy: 2, // 1=Flat 2=Average 3=littl Puffy 4=Puffy 5=very puffy*/
      silicone: 0,
      band: 34,
      base: {
        size: 740,
        cupNum: 16,
        cupRaw: 16,
        cup: "E-cup",
        bra: "34E",
      },
      lact: {
        on: false, // note on value relates to whether milk is in breast or not, not if currently lactating*/
        max: 860,
        size: 740,
        cupNum: 16,
        cup: "E-cup",
        bra: "34E",
      },
    },
    pussy: {
      tight: 0,
      stretch: 0,
      virgin: true,
      time: 0,
      wetness: 2,
      tags: ["none"],
    }, // Looseness of Pussy - 0-virginal, 1-2:Tight, 3-5:average, 6-little loose, 8-very loose, 9-gaping, 12-useless*/
    asshole: {
      tight: 0,
      stretch: 0,
      virgin: true,
      time: 0,
      wetness: 2,
    },
    cock: {
      length: 0,
      girth: 0,
      head: "none",
      vol: 0,
      circum: false,
      hard: 0,
      smegma: false,
      tags: ["none"],
    },
    balls: {
      count: 0,
      size: 0,
      sac: 0,
      hang: 0,
      tags: ["none"],
    },
    clit: 2, // Size of Clit - 1: small, 2: normal, 3: big, 4-huge, 5-futa*/
    labia: 2,
    beauty: 3, // 1-ugly 3-avg 5-gorgeous*/
    face: "normal", // normal, sensual, exotic, cute, androgynous*/
    brow: "normal",
    lips: 3,
    nose: "normal",
    jaw: "normal",
    ears: "normal",
    tail: "none",
    eyeColor: "brown",
    lactation: 2, // lactating production - 1-leaks a little, 2-normal, 3-productive, 4-cow 5-megacow*/
    lactCapacity: 240, // milk capacity in ml*/
    orgasm: 25, // threshold for reaching orgasm*/
    energy: 10, // max energy based on athletic*/
    topATR: 5,
    botATR: 5,
    ATR: 10,
    tags: ["none"],
  };

  // .FERT OBJECT
  // fertility is overall fertility status. 0-totally infertile no preg at all, 1= iud, 2-low, 3-Normal, 4-High, 5-Super, 6-ULTRA*/

  pc.fert = {
    fertility: 3,
    egg: 3,
    implant: 3,
    vagHostile: 3,
    period: 5,
    wombHealth: 0,
    multEgg: 3,
    barren: false,
    iud: false,
    femaleFlag: ["none"],
    cycle: 28,
    cycStart: [2, 1], // [day, week]
    boost: 0,
    ovuMod: either(-3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3),
    pregTerm: 38, // normal time to give birth*/
    quality: -1,
    ejac: -1,
    resMax: -1,
    reserve: -1,
    refact: -1,
    quantity: -1,
    ovuFlag: false,
    surv: -1,
    maleFlag: ["none"],
    fluid: {
      vulva: [],
      vest: [],
      mid: [],
      deep: [],
      cervix: [],
      womb: [],
      ovary: [],
    },
  };

  // .MUTATE OBJECT

  pc.mutate = {
    milk: false,
    acid: false,
    birthCon: false,
    multiple: false,
    gestate: false,
    cycle: false,
    twinWomb: false,
    period: false,
    immune: false,
    mouth: false,
    contort: false,
    cumpire: false,
    pseudoPreg: false,
    elastic: false,
    litePhero: false,
    pheromone: false,
    fertStorm: false,
    goddess: false,
    smooth: false,
    lilithCurse: false,
    noRefract: false,
    megaNuts: false,
    killerSperm: false,
    bitchBreaker: false,
    megaLong: false,
    iron: false,
    virile: false,
    acidPre: false,
    girth: false,
    powerEjac: false,
    multgasm: false,
  };

  aw.replace("#infos", "Loading Status Information");

  // INITIALIZE PLAYER CLOTHING VARIABLES

  setup.clothes.initialize();

  pc.clothes = {
    worn: {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      bag: 0,
      coat: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      shoes: 0,
    },
    keys: {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      bag: 0,
      coat: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      shoes: 0,
    },
    stats: {
      atr: 0,
      sexy: 0,
      formal: 0,
      exposureTop: 0,
      exposureBot: 0,
    },
    coordinate: {
      outfit: false,
      shoes: false,
      coat: false,
    },
    spots: {
      mouth: false,
      nipL: false,
      nipR: false,
      clit: false,
      pussy: false,
      ass: false,
      face: false,
      head: false,
      handL: false,
      handR: false,
    },
  };

  // .STATUS OBJECT

  pc.status = {
    birthCon: {
      diaphragm: {
        worn: false,
        type: "none",
        effect: 0,
        health: 0,
        break: false,
        sabo: 0,
      },
      femaleCondom: {
        worn: false,
        type: "none",
        effect: 0,
        health: 0,
        break: false,
        sabo: 0,
      },
      menstrualCup: {
        worn: false,
        type: "none",
        effect: 0,
        health: 0,
        break: false,
        sabo: 0,
      },
      sponge: {
        worn: false,
        type: "none",
        effect: 0,
        health: 0,
        break: false,
        sabo: 0,
      },
      condom: {
        worn: false,
        type: "none",
        effect: 0,
        health: 0,
        break: false,
        sabo: 0,
      },
      headCap: {
        worn: false,
        type: "none",
        effect: 0,
        health: 0,
        break: false,
        sabo: 0,
      },
      hormone: 0,
      hormoneType: "none",
      knowIneffective: false,
      ineffective: false,
      chems: 0,
    },
    alcohol: 0, // level of intoxication*/
    drugs: 0, // level of intoxication 0-5*/
    wetness: 1, // as low as 0, to 20*/
    fertText: "cycle starting...",
    risk: 0, // level of  risk for pregnancy based on cycle - 0: no risk, 1: very low, 2: low, 3: moderate, 4: pre ovulation, 5: ovulation day - calendar only
    cyc: 0, // actual level of risk as above.
    wombA: {
      exists: true,
      preg: false,
      know: false,
      birthed: 0,
      miscarry: 0,
      aborts: 0,
      fetus: [],
      zygote: [],
      boost: 0,
    },
    wombB: {
      exists: false,
      preg: false,
      know: false,
      birthed: 0,
      miscarry: 0,
      aborts: 0,
      fetus: [],
      zygote: [],
      boost: 0,
    },
    period: 0, // 0: no period, 1= light, 2: mdt, 3: heavy*/
    milk: 0, // Actual milk production level/stage, 0: not lactating 1-barely, 2-beginning, 3-nearly full, 4-full, 5-overproductive, 6-drug*/
    milkStore: 0, // in ml*/
    arousal: 0, // how turned on the PC is, 0: not at all, negative: repulsed, 1-little, 2-moderate, 3-strong, 4-desperate*/
    pleasure: 0, // counter for reaching orgasm*/
    need: 0, // denotes player's need for cock from time without, reset when satisfaction is full*/
    satisfaction: random(45, 55), // 0-100 scale rating satisfaction from sexual encounters during the week. lost if doesn't cum, 100 - satisfied*/
    atr: 0,
    stress: random(45, 50), // 0-100 scale for stress, going over 70 causes negative effects.*/
    happy: 2, // happiness, negative is depression, 10 is blissful*/
    anger: 0, // anger, 0 is not angry, 10 is in a murderous rage*/
    lonely: 20, // 0-100 loneliness*/
    fatigue: 3, // determines player's current energy level or sleepiness. 0 to 10 scale where 10 is dead tired*/
    sleep: false, // flag to indicate player is asleep. Allows correct status display during dreams*/
    health: random(96, 100),
    healthOld: random(94, 96),
    will: 3, // effective willpower for widget use to speed up willpower checks*/
    overAnger: false,
    overStress: false,
    overDepress: false,
    underSatisfy: 0,
    addict: {
      sex: 0,
      alc: 0,
      heat: 0,
      satyr: 0,
      focus: 0,
      cum: 0,
      zone: 0,
      cream: 0,
      sexNeed: 0,
      alcNeed: 0,
      heatNeed: 0,
      satyrNeed: 0,
      focusNeed: 0,
      cumNeed: 0,
      zoneNeed: 0,
      creamNeed: 0,
      jonesing: 0,
      withdrawl: false,
    },
    energy: {
      amt: 7,
      rate: 8,
      regen: true,
      max: 10,
    },
    kids: 0,
    morality: 0,
    corrupt: 0,
    perversion: 0,
    clean: 1,
    exercise: 0,
    bimbo: 0,
    inPublic: false,
    injury: ["none"],
    disease: ["none"],
    mindbreak: false,
    nutrition: {
      normal: 0,
      dessert: 0,
      health: 0,
      diet: 0,
      junk: 0,
      realWeight: 0,
    },
  };

  // .COND Object

  pc.cond = {
    hair: {},
    face: {},
    chest: {},
    back: {},
    hands: {},
    stomach: {},
    butt: {},
    groin: {},
    genitals: {},
    thighs: {},
    legs: {},
    feet: {},
    vagFluid: {},
    anusFluid: {},
  };

  aw.replace("#infos", "Psychoanalysis");


  // .TRAIT OBJECT

  pc.trait = {
    vert: "neither",
    intro: false,
    extro: false,
    open: "neither",
    op: false,
    cl: false,
    will: 3,
    libido: 3, // 1  vlow, 3-norm, 5-vhigh
    caring: 0, // uncaring
    bitch: 0, // kind
    maternal: 0, // hateskids
    romantic: 0, // aromantic
    deceptive: 0, // honest
    devious: 0, // straightforward
    persuasive: 0, // follower
    perceptive: 0, // oblivious
    forgetful: 0, // good memory
    forgiving: 0, // vengeful
    lowEsteem: 0, // narsissistic
    picky: 0, // low standards
    crude: 0, // refined
    friendly: 0, // unfriendly
    approachable: 0, // unapproachable
    relaxed: 0, // ambitious
    flirty: 0, // shy
    materialist: 0,
  };

  // .PERSONA OBJECT

  pc.persona = {
    type: "normal",
    bCon: 0,
    mentionFertile: false,
    fidelity: 0,
    sweet: false,
    sexy: false,
    slutty: false,
    lookingFor: "love",
  };

  // .KINK OBJECT

  pc.kink = {
    risky: false,
    pregnancy: false,
    sizequeen: false,
    cumSlut: false,
    sub: false,
    exhibition: false,
    masochist: false,
    buttSlut: false,
    public: false,
    slut: false,
    superSlut: false,
    hyperSlut: false,
    oral: true,
    anal: true,
    force: true,
    rape: false,
    liberate: false,
    easy: false,
    nips: false,
    dom: false,
    water: false,
    bond: false,
    hard: false,
    fap: false,
    shame: false,
  };

  // .GROOM OBJECT

  pc.groom = {
    hairLength: 12, // HairLength in Inches
    hairColor: "brown",
    hairCurl: 1, // 0-straight 1-slightly wavy 2-wavy 3-very wavy 4-curly 5-very curly 6-kinked
    hairStyle: "unkempt",
    hairFlag: 0,
    // tslint:disable-next-line:max-line-length
    hairSets: { "standard": "unkempt", "fancy": "unkempt", "casual": "unkempt", "custom 1": "unkempt", "custom 2": "unkempt", "custom 3": "unkempt" },
    hairDefaultFancy: "unkempt",
    hairDefaultCasual: "unkempt",
    pubeColor: "black",
    pubeStyle: "trimmed",
    pubeGrow: 3, // main pube hairs length
    pubeFreq: 3, // trim freq
    pube: 1, // bikini hair length
    bikiniFreq: 1, // bikini trim freq
    bikiniCount: 0,
    pubeCount: 0, // grow count
    pubeShape: 0,
    leghair: 1, // length 0lazerd, 1none,5fullgrown
    leghairCount: 1,
    leghairFreq: 1,
    armpit: 1, // length 0lazerd, 1none,5fullgrown
    armpitCount: 0,
    armpitFreq: 0,
    eyeMU: "none",
    lipMU: "none",
    genMU: "none",
    makeup: {
      atr: 0,
      sexy: 0,
      clown: false,
      type: "norm",
      desc: "is free of makeup.",
      look: "none",
    },
    teeth: "natural",
    toothHealth: 5,
    toothbrush: 1,
    lastToothbrush: [6, 1, 1, 4], // hour day week month
  };

  // .JEWEL OBJECT
  pc.jewel = {
    neck: "none",
    wristR: "none",
    wristL: "none",
    handR: "none",
    handL: "none",
    ringR: "none",
    ringL: "none",
    nose: "none",
    lip: "none",
    tongue: "none",
    brow: "none",
    earR: "none",
    earL: "none",
    upEar: "none",
    belly: "none",
    nipR: "none",
    nipL: "none",
    clit: "none",
    labia: "none",
    owned: ["purityRing"],
    pierced: {
      neck: true,
      wristR: true,
      wristL: true,
      handR: true,
      ringR: true,
      ringL: true,
      handL: true,
      nose: false,
      lip: false,
      tongue: false,
      brow: false,
      earR: false,
      earL: false,
      upEar: false,
      belly: false,
      nipR: false,
      nipL: false,
      clit: false,
      labia: false,
    },
  };

  // .TATTOO OBJECT
  pc.tattoo = {
    face: false,
    neck: false,
    shoulderLeft: false,
    shoulderRight: false,
    armLeft: false,
    armRight: false,
    palmLeft: false,
    palmRight: false,
    breast: false,
    belly: false,
    pubic: false,
    thighLeft: false,
    thighRight: false,
    calfLeft: false,
    calfRight: false,
    feetLeft: false,
    feetRight: false,
    backUpper: false,
    backLower: false,
    butt: false,
    asshole: false,
    vagina: false,
  };

  try {
    ↂ.pc = new PC(pc);
  } catch (e) {
    UI.alert(`Error initializing PC data - ${e.name}: ${e.message}.`);
  }
  aw.con.info(`Initialized PC`);
  aw.replace("#infos", "Placing you in the world...");
  setTimeout(function() { setup.initialize.five(); }, 100);
};

setup.initialize.five = function() {


  // MAKEUP AND HAIR INVENTORY
  ↂ.makeup = {
    eye: ["none", "shimmery"],
    lip: ["none", "chapstick"],
    gen: ["none", "slut"],
  };
  ↂ.makeupSet = {
    "none": ["none", "none", "none"],
    "casual": ["none", "none", "none"],
    "standard": ["none", "none", "none"],
    "fancy": ["none", "none", "none"],
    "custom 1": ["none", "none", "none"],
    "custom 2": ["none", "none", "none"],
    "custom 3": ["none", "none", "none"],
  };
  ↂ.hairStyle = ["neat", "unkempt", "messy"];
  aw.con.info("Initialized styles.");
  // PLAYER SKILLS

  const slit = {
  exhibition: 0,
  prostitute: 0,
  sex: 0,
  oral: 0,
  seduction: 0,
  comm: 0,
  org: 0,
  probSolving: 0,
  finance: 0,
  art: 0,
  athletic: 0,
  dancing: 0,
  clean: 0,
  shop: 0,
  cook: 10,
  martial: 0,
  firearms: 0,
  // crime - derived skill
  // strip - derived skill
  // manage - derived skill
  // perform - derived skill
  // kegel - derived skill
  } as PCskills;
  ↂ.skill = new Skills(slit);
  aw.con.info("Initialized skills.");
  // MAP SYSTEM VARIABLES
  const map = {
    loc: ["bullseye", "parking", false], // Map location - main, sub, tert/false
    lastLoc: ["bullseye", "parking", false], // previous location
    imageName: "none", // name of image for map location passage
    history: [],
    lastName: "none", // text descriptive name of previous location
    name: "none", // text descriptive name of current location
    movmt: 0, // map distance moved for time/fatigue purposes
    movmtList: [], // array containing locations for each step of journey to new map spot
    lastPassage: "none", // prev passage
    passage: "none", // name of map location passage
    dirNS: "north", // direction of journey
    dirEW: "south", // direction of journey
    wxCover: [], // array of variables for each step of journey, can add descript based on weather
    dice: 0, // 1-20 random number based on 1d11+1d10
    // MAP EVENT ~~~~~~~~~~~~~~~~*/
    NPCroom: 0, // room view description of npc that isn't activeNPC
    NPC: [],
    NPCactive: false,
    NPCroomview: 0,
    mainEvent: 0,
    minorEvent: 0,
  } as IntMapBuild;
  ↂ.map = new MapClass(map);

/*  ↂ.map.loc = new Proxy(ↂ.map.loc, {
    get(obj, prop) {
      return obj[prop];
    },
    set(obj, prop, value) {
      if (typeof value !== "string" && prop !== 2) {
        aw.con.warn(`Attempted to set ↂ.map.loc[${String(prop)}] to a non-string value!`);
      } else if (prop === 2 && typeof value !== "string" && typeof value !== "boolean") {
        aw.con.warn(`Attempted to set ↂ.map.loc[${String(prop)}] to a non-string/boolean value!`);
      }
      if (prop === 0) {
        if (["world", "residential", "bullseye", "downtown", "home", "start", "BFhome", "homeT1", "homeT2", "homeT3", "BFhomeT4", "BFhomeT1", "BFhomeT2", "BFhomeT3", "BFhomeT4"].includes(value)) {
          obj[prop] = value;
        } else {
          aw.con.warn(`Invalid primary location (${value}) attempted to be set to ↂ.map.loc[0].`);
        }
      } else {
        obj[prop] = value;
      }
      return true;
    },
  }),*/

  aw.replace("#infos", "Setting up clothing system...");
  setTimeout(function() { setup.initialize.six(); }, 100);
};

setup.initialize.six = function() {
  // **********************************************************************************/
  //               ACTION BUTTONS VARIABLES  ↂ.buttons                               */
  // **********************************************************************************/
  ↂ.buttons = {};

  // **********************************************************************************/
  //               WARDROBE SYSTEMS VARIABLES  ↂ.ward                                */
  // **********************************************************************************/
  ↂ.ward = {
    leg: [],
    bra: [],
    panties: [],
    bottom: [],
    top: [],
    dress: [],
    athU: [],
    athL: [],
    swimU: [],
    swimL: [],
    niteL: [],
    niteU: [],
    coat: [],
    acc: [],
    bag: [],
    shoes: [],
  };

  // **********************************************************************************/
  //               SHOPPING SYSTEM  VARIABLES                                         */
  // **********************************************************************************/

  // clothing generator output arrays
  ↂ.storeInv = {
  panties: [],
  leg: [],
  bottom: [],
  bra: [],
  top: [],
  dress: [],
  swimU: [],
  swimL: [],
  athU: [],
  athL: [],
  coat: [],
  niteU: [],
  niteL: [],
  acc: [],
  bag: [],
  shoes: [],
  };
  aw.con.info("Initialized store inventory.");

  // **********************************************************************************/
  //               OUTFIT VARIABLES ↂ.ward.                                            */
  // **********************************************************************************/
  try {
    setup.clothes.outfitInitialize();
  } catch (e) {
    aw.con.warn(`Uh-Oh, seems that setup.clothes.outfitInitialized is fucked - ${e.name}: ${e.message}.`);
  }
  try {
    setup.clothes.defineCustomClothes();
  } catch (e) {
    aw.con.warn(`Uh-Oh, seems that setup.clothes.defineCustomClothes is fucked - ${e.name}: ${e.message}.`);
  }
  aw.replace("#infos", "Generating the latest fashions...");
  setTimeout(() => setup.initialize.seven(), 50);
};

setup.initialize.seven = function() {
  // set up the initial store inventory
  try {
    setup.generateStoreClothes();
  } catch (e) {
    aw.con.warn(`Uh-Oh, seems that setup.generateStoreClothes is fucked - ${e.name}: ${e.message}.`);
  }
  aw.replace("#infos", "Unleashing the NPCs...");
  setTimeout(function() { setup.initialize.eight(); }, 150);
};

setup.initialize.eight = function() {
  // **********************************************************************************/
  //               NPC VARIABLES  (npcs defined individually in js)                   */
  // **********************************************************************************/
  // NPC{} init is in [[StoryInit]]
  State.active.variables.NPCount = 10000;
  State.active.variables.NPCsemi = 1000;
  State.active.variables.NPCfixed = 100;
  State.active.variables.NPCfake = 10000;
  State.active.variables.activeNPC = []; // list of NPC IDs that are "active"
  State.active.variables.npc = {
    roomview: 0,
    roomviewGroup: 0,
    activeHist: [],
    active: false,
  };
  setup.npc = {
    fixedIDs: { lily: "n101" },
    ready: [],
    stored: [],
    //  NPC LISTS - LISTS OF NPCS THAT HAVE CERTAIN ATTRIBUTES
    single: [],
    rShip: [],
    married: [],
    male: [],
    female: [],
    futa: [],
    age13to17: [],
    age18to21: [],
    age22to27: [],
    age28to33: [],
    age34to39: [],
    age40to49: [],
    age50to59: [],
    age60plus: [],
    poor: [],
    middle: [],
    wealthy: [],
    education: { dropout: [], hschool: [], assoc: [], bach: [], master: [], doctor: [] },
    friends: [],
    bff: [],
    acquainted: [],
    lover: [],
    interested: [],
    fling: [],
    exes: [],
    enemies: [],
  };
  aw.con.info("NPC groups initialized!");

  // **********************************************************************************/
  //               NPC SETTINGS  VARIABLES                                            */
  // **********************************************************************************/
  setup.settingsSaveObj = localStorage.getItem( "settingObj" );

  if (setup.settingsSaveObj) {
    setup.npcSetting = JSON.parse( setup.settingsSaveObj );

    aw.con.info("Initialized NPCsetting.");
    aw.replace("#infos", "Getting Sexy...");
    setTimeout(function() { setup.initialize.nine(); }, 100);
  } else {
    setup.npcSetting = {
      orgasmAdjust: 0,
      futaRate: 10,
      futaMale: true,
      gender: [false, 50],
      arch: [false, [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
      wealth: [false, 0, 0],
      age: [false, [18, 30], [30, 45]],
      homo: [false, [true, 0, true, 0]],
      race: [false, [0, 0, 0, 0, 0, 0]],
      height: [false, [5, 20, 50, 20, 5], [5, 20, 50, 20, 5]],
      tone: [false, [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
      weight: [false, [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
      fertility: [false, 0, 0],
      cock: [false, -1],
      pussy: [false, 0],
      circum: [false, 0],
      beauty: [false, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
      orgasm: [false, 0, 0],
      pregTerm: [false, -1],
      tits: [false, 0],
      mutate: [false, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      married: [false, 0],
      open: [false, 0, 0],
      vert: [false, 0, 0],
      iq: [false, 0, 0],
      names: [false, [0], [0], [0]],
      persCore: [
        false,
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      pref: {
        enabled: false,
        Fweight: [0, 0, 0, 0, 0, 0],
        Mweight: [0, 0, 0, 0, 0, 0],
        Fheight: [0, 0, 0, 0, 0],
        Mheight: [0, 0, 0, 0, 0],
        Fmuscle: [0, 0, 0, 0, 0, 0],
        Mmuscle: [0, 0, 0, 0, 0, 0],
        Fother: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Mother: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    };
    aw.con.info("Initialized NPCsetting.");
    aw.replace("#infos", "Getting Sexy...");
    setTimeout(function() { setup.initialize.nine(); }, 100);
  }
};

setup.initialize.nine = function() {
  // **********************************************************************************/
  //               SEX SCENE VARIABLES                                                */
  // **********************************************************************************/
  ↂ.sex = {
    tabs: 1, // activetab
    pos: "none", // setup.sexPos key
    posNPC: [], // order of npcs in sex positions - NPCID
    lastPos: "none", // setup.sexPos key
    pcAct: "none", // setup.sexAct key
    pcLastAct: "none", // setup.sexAct key
    pcActRecord: [],
    npcAct: [],
    npcLastAct: [],
    npcActRecord: [[], [], [], [], [], [], [], [], [], []],
    inPosition: [], // npc/s in sex position with pc. index
    target: 0, // npc in sex scene targeted by action
    enviroTags: [],
    situOrg: 3, // situational sex speed. Higher is slower!
    pcOrgasm: 25,
    npcOrgasm: [],
    turns: 0,
    start: true,
    rape: false,
    activeNPC: [],
    npcCount: 0,
    startTime: 0,
    film: false,
    pcOutput: "none",
    npcOutput: [],
    orgText: {},
    cumInfo: [],
    encounter: ["none", "none", "none"],
    speed: 0,
    pcBC: {},
    npcBC: [],
    fucking: false,
    pcWetness: 0,
    npcWetness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pcLube: {
      used: false,
      amt: 0,
      effective: 0,
      type: "none",
      pleasure: 0,
      prevType: "none",
    },
    npcLube: [],
    pcOrgQuality: [],
    npcOrgQuality: 0,
    earlyOut: false,
    passage: "none",
    risky: false,
    orgCountPC: 0,
    orgCountNPC: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    maleCount: 0,
    endFlag: false,
    persona: "norm",
    flag: {
      askedPullOut: false,
      askedCumInside: false,
      askedCondom: false,
      triedRemoveCondom: false,
      pickedDom: 0,
      pickedSub: 0,
      anal: false,
      oral: false,
      vag: false,
    },
    scene: false,
    npc: [],
    timer: 0,
    menu: false,
  };
  aw.con.info("Initialized Sex.");

  ↂ.homeOptions = "none";


  aw.replace("#infos", "Setting up the cameras...");
  setTimeout(function() { setup.initialize.ten(); }, 100);
};

setup.initialize.ten = function() {

  // CHILDS ARRAY
  ↂ.child = [];

  // SEXTOYS OBJECT AND STUFF
  ↂ.toys = {
  parts : {
    mouth: false,
    arms: false,
    legs: false,
    asshole: false,
    clit: false,
    vagina: false,
    groin: false,
    nipples: false,
    breasts: false,
    },
  };

  // GAME FLAGGERS

  setup.initializeFlags();

  // **********************************************************************************/
  //               HOME SYSTEM VARIABLES                                              */
  // **********************************************************************************/
  ↂ.home = {
    upgrade: {
      toiletFert: false,
    },
    item: {
      owned: [],
      furnature: [],
      exercise: [],
      electronic: [],
      decor: [],
      health: [],
      other: [],
      kitchen: [],
      bath: [],
      balcony: [],
      bed2: [],
      bed3: [],
      bedroom: [],
      living: [],
      foyer: [],
      trash: [],
    },
    decor: {},
    finance: {
      rent: 0,
      food: 0,
      goods: 0,
      supplies: 0,
      misc: 0,
      isp: 0,
      cable: 0,
      maid: 0,
      car: 0,
      miles: 0, // miles traveled during the week.
      gas: 0,
      maint: 0,
      insurance: 0,
      electric: 0,
      water: 0,
      grooming: 0,
      streaming: 0,
      porn: 0,
      patreon: 0,
      gym: 0,
      lessons: 0,
      cash: State.active.variables.AW.cash,
      spending: 0,
      miscIncome: 0,
      income: {
        lotto: 0,
        milk: 0,
        gambling: 0,
        sugarDaddy: 0,
        prostitute: 0,
        yardSale: 0,
        child: 0,
        surrogate: 0,
        oddjobs: 0,
      },
      jobIncome: 0,
      totalIncome: 0,
      totalExpense: 0,
      bank: 0,
      bankInterestPer: 2,
      bankInterest: 0,
      loan: 0,
      loanPayment: 0,
      loanInterest: 0,
      loanInterestPer: 5,
      creditInterestPer: 8,
      creditInterest: 0,
      credit: 0,
      sett: {
        foodLevel: 3,
        goodsLevel: 3,
        supplyLevel: 3,
      },
    },
    clean: {
      floors: 85,
      surfaces: 85,
      bathroom: 85,
      kitchen: 85,
      dishes: 8,
      laundry: 8,
      neatness: 95,
      bed: 8,
      deepclean: 80,
      doCleaning: 3,
      pickingUp: 3,
      doDishes: 3,
      doLaundry: 3,
      doBed: 3,
      increment: 4,
      cleaningTime: 0,
    },
    ment: 0,
    stats: {
      location: 3,
      tier: 2,
      finish: 2,
      upkeep: 2,
      nhood: 2,
      rent: 0,
      street: "none",
      name: "none",
    },
  };

  // tslint:disable-next-line:max-line-length
  if (ↂ.flag.marriage.married) {
    ↂ.home.clean.cleaningTime = Math.round(((ↂ.home.clean.doCleaning + ↂ.home.clean.doCleaning + ↂ.home.clean.doCleaning + ↂ.home.clean.pickingUp + ↂ.home.clean.pickingUp + ↂ.home.clean.doDishes + ↂ.home.clean.doLaundry + ↂ.home.clean.doBed) / 8) * (5 * ↂ.home.clean.increment) / 2);
  }
  else {
    ↂ.home.clean.cleaningTime = Math.round(((ↂ.home.clean.doCleaning + ↂ.home.clean.doCleaning + ↂ.home.clean.doCleaning + ↂ.home.clean.pickingUp + ↂ.home.clean.pickingUp + ↂ.home.clean.doDishes + ↂ.home.clean.doLaundry + ↂ.home.clean.doBed) / 8) * (5 * ↂ.home.clean.increment));
  }

  ↂ.home.item.owned.push("brokenCoffee");
  ↂ.home.item.owned.push("bustedStool");
  ↂ.home.item.owned.push("someBlankets");
  ↂ.home.item.owned.push("bustedLawnchair");
  ↂ.home.item.owned.push("oldThrowPillow");
  aw.con.info("Initialized Home.");
  aw.replace("#infos", "Writing the schedule...");
  setTimeout(function() { setup.initialize.eleven(); }, 100);
};

setup.initialize.eleven = function() {
  // **********************************************************************************/
  //               SCHEDULE SYSTEM  VARIABLES                                         */
  // **********************************************************************************/
  ↂ.sched = {
    workTime: [
      40,
      [8, 0, 17, 0],
      [8, 0, 17, 0],
      [8, 0, 17, 0],
      [8, 0, 17, 0],
      [8, 0, 17, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    workDays: [0, false, false, false, false, false, false, false],
    vacation: [0, false, false, false, false, false, false, false],
    sick: [0, false, false, false, false, false, false, false],
    wakeTime: [7, 0],
    sleepTime: [23, 0],
    sleepWarn: [22, 0],
    sleepWarnOn: false,
    alarmClock: [0, 0, false],
    actualWake: 700,
    alerts: true,
    extraAlerts: false,
    goto: false,
    fastForward: false,
    fastSleep: false,
    showChange: false,
    showMedical: false,
    dream: "none",
    school: [],
    sleepin: false,
    sleepinOverride: false,
    sleepinText: [],
    sleepPassage: "none",
    runop: 0,
    showered: false,
    alertText: "none",
    alertPend: false,
    npcDate: {none : [1, false, 7, "none", false, "none"]},
    npcHang: {none : [1, false, 7, "none", false, "none"]},
  };
  ↂ.plans = {
    upcoming: [],
    current: [],
    past: [],
  };
  aw.con.info("Initialized schedule.");
  /* APPOINTMENT OBJECT FORMAT!
  {
    name: "date with joe",
    type: 1,
    alert: true,
    start: [18,0],
    end: false,
    place: "Bullseye",
    locmap: "bullseye",
    loc: [0,0],
    code: 0,
    msg: false,
    missed: true
  }
  TYPE: 0-game or quest alert, 1-user set reminder, 2-appointment, 3-plans with NPC, 4-group NPC plans, 5-Date
  msg: delicious, and also additional message text used for reminders. set to false if there's no message.
  missed: important for tracking missed dates and such, because if you don't go to one, code isn't executed.
  this should be set to true, and changed to false if the date is kept!
  */
  // tslint:disable-next-line:max-line-length
  ↂ.plans.upcoming.push({ name: "Tutorial", type: "quest", alert: true, start: 131670, end: false, place: false, locmap: false, msg: "This is a tutorial message, demonstrating how reminder alerts work. During the game, you'll get phone reminders about upcoming dates, appointments, and other events 1 hour before they start. You'll often see a link to take you straight to the event location. Other times, you'll see reminders from the game about quests or other happenings. You can even set reminders for yourself!", npc: false, missed: true, disc: "A tutorial reminder" });
  // tslint:disable-next-line:max-line-length
  ↂ.plans.upcoming.push({ name: "Meet Lily", type: "quest", alert: true, start: 132000, end: false, place: false, locmap: false, msg: "You're supposed to be meeting Lily after she's done with work to get started on your new paperwork and identification. You don't want to miss it!", npc: ["n101"], missed: true, disc: "Get a fake ID" });

  aw.replace("#infos", "Jobbing it up...");
  setTimeout(function() { setup.initialize.twelve(); }, 100);
};

setup.initialize.twelve = function() {
  // **********************************************************************************/
  //               JOB SYSTEM   VARIABLES                                             */
  // **********************************************************************************/
  ↂ.job = {
    name : "Unemployed",
    employer : "None",
    code : "UE",
    skills : "none",
    percept : 0,
    desc : "none",
    loc: ["home", "foyer", false],
    late : {
      times : 0,
      called : 0,
      recent : 0,
      sick : 0,
      vacation : 0,
    },
    missed : {
      times: 0,
      recent : 0,
    },
    sick : {
      rate : 0, // hours
      balance : 0,
      caught : 0,
      used : 0,
    },
    vacation : {
      rate : 0,
      balance : 0, // hours
      used : 0,
      ratePaid : 0,
      balPaid : 0, // hours
      usedPaid : 0,
    },
    rules : {
      payrate : 0,
      taskratio : [0, 0, 0, 0],
      tasks : 0,
      taskA : {
        type: "CM",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskB : {
        type: "OG",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskC : {
        type: "PS",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskD : {
        type: "FI",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskE: {
        type: "FI",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      taskF: {
        type: "FI",
        DC: 15,
        retry: false,
        effect: 1,
        stress: 1,
        hap: 1,
        desc: ["none"],
      },
      cutoffs : [0, 0, 0, 0, 0],
      worktime : [40, 8, 8, 8, 8, 8, 0, 0],
      breaktime : 0,
      strict : true,
      boss : "nobody",
    },
    stats : {
      progress : 0,
      promote : false,
      fired : false,
      fireDanger : false,
      performance : 0,
      daysworked : 0,
      daysworkedTotal : 0,
      rank : 0,
      boss : 0,
      coworker : 0,
      subord : - 10,
    },
    flag : {},
    choose : {
      effort: 2,
      focus: "none",
    },
    pay : 0,
    moti : 0,
    att : {
      weekDays: 0,
      showed: [0, false, false, false, false, false, false, false],
      weekHours: 0,
    },
  };
  aw.con.info("Initialized job.");
  aw.replace("#infos", "Loading Preferences...");
  setTimeout(function() { setup.initialize.thirteen(); }, 100);
};

setup.initialize.thirteen = function() {
  setup.escape.init();
  // **********************************************************************************/
  //               GAME PREFERENCE  VARIABLES                                         */
  // **********************************************************************************/
  // State.active.variables.pref = {}; set in story init
  ↂ.pref = {
    weight: [-2, -1, 1, 0, -1, -2],
    muscle: [-2, -1, 0, 2, 1, 0],
    height: [-2, -1, 0, 1, -1, "no mod"],
    other: [-1, 1, 0, 1, -1, 1, -1, 1, 1, -1],
    Fweight: [-2, -1, 1, 1, -1, -2],
    Fmuscle: [-2, 0, 1, 2, -1, -2],
    Fheight: [0, 1, 2, 0, -2, "no mod"],
    Fother: [1, -1, 1, -1, 1, -1, 1, 1, 1, 1, -1],
  };
  const creampie = setup.AW.localRestore("AW-PrefStore");
  if (creampie === "error") {
    setup.initialize.prefInit();
  } else {
    try {
      State.active.variables.pref = JSON.parse(atob(creampie));
    } catch (e) {
      console.log(`Restoring game preferences from local storage failed. ${e.name}: ${e.message}.`);
      setup.initialize.prefInit();
    }
  }
  // Add new preferences here to ensure they are initialized! (also backward compatability ts)
  if (State.active.variables.pref.autoSave == null) {
    State.active.variables.pref.autoSave = true;
  }
  if (State.active.variables.pref.miscarriage == null) {
    State.active.variables.pref.miscarriage = true;
  }
  if (State.active.variables.pref.shortcuts == null) {
    State.active.variables.pref.shortcuts = [true, true, true, true, false, false, true, true, false, false, false, false];
  }
  if (State.active.variables.pref.sound == null) {
    State.active.variables.pref.sound = {
      on: true,
      volume: 0.5,
      track: "utopia",
      paused: false,
      mute: false,
    };
  }
  aw.replace("#infos", "Prodding Lily");
  setTimeout(function() { setup.initialize.fourteen(); }, 100);
};

setup.initialize.fourteen = function() {
  // ********************************************************************************/
  // *****************FINAL STEPS - DEFINE PERMANENT NPCS ***************************/
  // ********************************************************************************/
  try {
    setup.defineFixedNPCs();
  } catch (e) { aw.con.error("it seems lily is dead jim", e); }
  State.active.variables.gamestate.lastversion = State.active.variables.version;
  State.active.variables.activeNPC.push("n101");
  try {
    setup.statusSave();
  } catch (e) {
    aw.con.warn(`Uh-Oh, seems that setup.statusSave is fucked - ${e.name}: ${e.message}.`);
  }
  aw.replace("#infos", "Pre-calculating Sex Position Geometry");
  setTimeout(function() { setup.initialize.fifteen(); }, 100);
};


setup.initialize.fifteen = function(): void {
  setup.sex.prebuild();
  aw.replace("#infos", "Finished!");
  setTimeout(function() { setup.initialize.final(); }, 100);
};


setup.initialize.final = function() {
  console.log("Completed game variable initialization!");
  Engine.play("Introduction", true);
};


setup.initialize.savePrefs = function(): void {
  const poop = btoa(JSON.stringify(State.active.variables.pref));
  setup.AW.localStore("AW-PrefStore", poop);
};

setup.initialize.resetPrefs = function(): void {
  setup.initialize.prefInit();
  setup.initialize.savePrefs();
  setup.notify("Game Preferences Reset!");
};

setup.initialize.prefInit = function() {
  State.active.variables.pref.sexSceneSpeed = 2; // sex speed setting. Higher is slower!
  // attractiveness settings
  State.active.variables.pref.autoSave = true;
  State.active.variables.pref.fapmode = false;
  State.active.variables.pref.clothingDetail = 4;
  State.active.variables.pref.dispSceneImg = true;
  State.active.variables.pref.dispNPCImg = true;
  State.active.variables.pref.dispPCImg = true;
  State.active.variables.pref.dispEmoji = true;
  State.active.variables.pref.showUnavailAction = true;
  State.active.variables.pref.enableMutation = 1;
  State.active.variables.pref.enableCheats = 1;
  State.active.variables.pref.startWet = 2;
  State.active.variables.pref.twentyFour = false;
  State.active.variables.pref.miscarriage = true;
  State.active.variables.pref.shortcuts = [true, true, true, true, false, false, true, true, false, false, false, false];
  State.active.variables.pref.sound = {
    on: true,
    volume: 0.5,
    track: "utopia",
    paused: false,
    mute: false,
  };
  // ************************/
  // kink gates             */
  // ************************/
  State.active.variables.pref.anal = true;
  State.active.variables.pref.bestiality = false;
  State.active.variables.pref.bdsm = true;
  State.active.variables.pref.bondage = true;
  State.active.variables.pref.bukkake = true;
  State.active.variables.pref.chastity = true;
  State.active.variables.pref.choking = true;
  State.active.variables.pref.cbt = false;
  State.active.variables.pref.collar = true;
  State.active.variables.pref.connoncon = true;
  State.active.variables.pref.domsub = true;
  State.active.variables.pref.edging = true;
  State.active.variables.pref.enema = true;
  State.active.variables.pref.fisting = false;
  State.active.variables.pref.furry = false;
  State.active.variables.pref.gaping = true;
  State.active.variables.pref.group = true;
  State.active.variables.pref.handHolding = true;
  State.active.variables.pref.impact = true;
  State.active.variables.pref.incest = true;
  State.active.variables.pref.sadomasochism = true;
  State.active.variables.pref.masterslave = true;
  State.active.variables.pref.medical = true;
  State.active.variables.pref.necro = false;
  State.active.variables.pref.noncon = true;
  State.active.variables.pref.petplay = true;
  State.active.variables.pref.rape = false;
  State.active.variables.pref.religion = true;
  State.active.variables.pref.rough = true;
  State.active.variables.pref.scat = false;
  State.active.variables.pref.shibari = true;
  State.active.variables.pref.smells = false;
  State.active.variables.pref.sounding = false;
  State.active.variables.pref.torture = false;
  State.active.variables.pref.vore = false;
  State.active.variables.pref.waterworks = true;
  State.active.variables.pref.yandere = true;
};

