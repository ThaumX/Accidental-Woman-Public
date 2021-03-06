/*
███████╗██╗      █████╗  ██████╗ ███████╗
██╔════╝██║     ██╔══██╗██╔════╝ ██╔════╝
█████╗  ██║     ███████║██║  ███╗███████╗
██╔══╝  ██║     ██╔══██║██║   ██║╚════██║
██║     ███████╗██║  ██║╚██████╔╝███████║
╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
*/

interface ↂflag {
  camShow: {
    nickname      : string;
    popularity    : number;
    daysAbsent    : number;
    dailyStream   : boolean;
    actualRequest : number;
    followers     : number;
    stats : {
      expCap      : number;
      experience  : number;
      level       : number;
    };
    flags         : string[];
    story         : {
      home_shows : number;
      park_shows : number;
    };
  };
  profane: boolean;
  sleepfailwarn: boolean;
  triedForDeposit: boolean;
  BEnewClothes: boolean;
  Healthcare: boolean;
  organDonor: boolean;
  milkTank: number;
  selfThought: string;
  LilyCoffee: boolean;
  LilyCoffeeSuc: boolean;
  LilyHouseAvailable: boolean;
  LilyResult: [boolean?, number?, string?, number?, string?, string?];
  StaredLily: boolean;
  OfferedHelpLily: number;
  main: {
    male: {
      workResponse: number;
      saraIntro: boolean;
    };
    female: {
      firstText: boolean;
      metLily: boolean;
      helpResp: 0|1|2|3|4|string;
      kimIntro: boolean;
      whatIsIt: boolean;
      kimSpecial: boolean;
      kimPregnant: boolean;
    };
    startText: boolean;
    mainStart: boolean;
    omniKey: 0 | string;
    rangBellToday: boolean;
    active: boolean[];
    progress: number[];
    known: boolean[];
    deadline: number[];
    contacts: [boolean, boolean, boolean, number, number, number, number];
  };
  lilyTased: number;
  buggedLily: number;
  selfEmployed: boolean;
  unemployedDays: number;
  selfEmployType: string;
  job: {
    [propName: string]: InterfaceJobFlags;
  };
  milesDriven: number;
  car: {
    make: string;
    model: string;
    year: number;
    mileage: number;
  };
  DamagedCar: number;
  tempSkillBoost: {
    exhibition: number;
    prostitute: number;
    sex: number;
    oral: number;
    seduction: number;
    comm: number;
    org: number;
    probSolving: number;
    finance: number;
    art: number;
    athletic: number;
    dancing: number;
    clean: number;
    shop: number;
    cook: number;
    martial: number;
    firearms: number;
  };
  BackupTraits: {
    will: number;
    libido: number;
    open: number;
    vert: number;
    diq: number;
    iq: number;
    op: boolean;
    cl: boolean;
    intro: boolean;
    extro: boolean;
    sexuality: number;
    straight: boolean;
    bi: boolean;
    homo: boolean;
    bitch: number;
    lowEsteem: number;
  };
  BackupKinks: {
    risky: boolean;
    pregnancy: boolean;
    sizequeen: boolean;
    cumSlut: boolean;
    sub: boolean;
    exhibition: boolean;
    masochist: boolean;
    buttSlut: boolean;
    public: boolean;
    slut: boolean;
    superSlut: boolean;
    hyperSlut: boolean;
    oral: boolean;
    anal: boolean;
    force: boolean;
    rape: boolean;
    liberate: boolean;
    easy: boolean;
    nips: boolean;
    dom: boolean;
    water: boolean;
    bond: boolean;
    hard: boolean;
    fap: boolean;
    shame: boolean;
  };
  gameEvents: {
    map: {
      [propName: string]: number;
    };
    story: {
      [propName: string]: number;
    };
    mechanic: {
      [propName: string]: number;
    };
  };
  StylistVisitA: number;
  StylistVisitB: number;
  StylistVisitC: number;
  door: {
    megaTits: number;
    tries: number;
    code: number;
    ultraFertile: number;
    puddlingCunt: number;
    pussyPheromones: number;
  };
  Prologue: boolean;
  prologueSunday: boolean;
  ProBoughtClothes: boolean;
  ProClothingQuest: ProClothingQuest;
  CarWreckDmg: number;
  ProHospitalCheckedBody: boolean;
  GaveTobyName: boolean;
  weekTute: boolean;
  exes: string[];
  finance: Finance;
  BEpharmacist: BEpharmacist;
  badEnd: string;
  badEndInit: boolean;
  doomClock: false | string;
  lily: Lily;
  proResistedFap: boolean;
  coffeeToday: number;
  sexTutorial: boolean;
  playerNotes: string[];
  oystersWithMom: boolean;
  bank: Bank;
  listenToLily: number;
  prologueBusReaction: number[];
  jobFairCheckedOut: number[];
  jobQuiz: JobQuiz;
  jobsWorked: {
    IS: boolean;
    IT: boolean;
    IB: boolean;
    MD: boolean;
    [propName: string]: boolean;
  };
  drTittenCount: number;
  prologuePassedScience: boolean | 0;
  prologueFemPaid: boolean;
  parasite: IntFlagParasite;
  omni: IntFlagOmni;
  alarmClock: [boolean, number, number];
  suicideList: string[];
  schedDates: string[];
  homeVisit: [number, string],
  schedHangs: string[];
  doms: string[];
  subs: string[];
  keyHolding: [string, string];
  keyHolders: [string, string];
  sendKeyReturned: [boolean, boolean, boolean];
  sendKeyLost: [boolean, boolean, boolean];
  psycho: {
    caught: false,
  },
  victimName: string,
  jobEvents: IntJobEventFlags;
  drug: IntDrugFlags;
  hannaStory: {
    stage: string;
    money: number;
  };
  farm: IntFarmFlags;
  sawFertilitySealAd: boolean;
  school: {
    [propName: string]: any;
  };
  apdCaughtNaked: number;
  caveAdventure: boolean;
  addictWarned: boolean;
  jobManualShown: boolean,
  schoolManualShown: boolean,
  dateManualShown: boolean,
  statsManualShown: boolean,
  psychoAttend: {
    [propName: string]: [boolean, number, number, number];
  }
  churchAttend: {
    outer: boolean;
    cock: boolean;
    man: boolean;
  };
  plasticOperationType: string;
  plasticOperationSize: any;
  expandP: boolean,
  plasticOperationCost: number;
  tan: number;
  mentalPrescription: boolean;
  escapeHatch: string;
  residentialDaisyMet: boolean;
  syntetixRead: boolean;
  shamelessRead: boolean;
  wlgRead: boolean;
  broodRead: boolean;
  magazinesCount: number;
  magazinesTotal: number;
  shelterVisits: number;
  bestialityExperience: boolean;
  fairMail: boolean;
  fairShooting: boolean;
  fairMilking: boolean;
  fertilitySeal: boolean;
  fuckMachineDildo: string;
  marriage: {
    date: [number, number, number, number],
    npc: string,
    discussion: boolean,
    NPCvows: [string, string, string],
    PCvows: string[],
  }
  npcInducedInteractions: {
    destination: any,
    intType: string,
    intNPC: string,
  },
  fempro: {
    initResponse: number;
    likedClothes: number;
  };
  preg: {
    morningSickToday: boolean;
    firstKick: boolean;
    kickA: boolean;
    kickB: boolean;
    elastic: [boolean, boolean, boolean];
    boostA: [boolean, boolean, boolean];
    boostB: [boolean, boolean, boolean];
  }
  surrogateSignUp: boolean;
  passedOut: number;
  status: IntStatusFlags;
  pumpDumpUnlock: boolean;
  sexRecord: {
    makeout: number;
    sex: number;
    oral: number;
    anal: number;
    public: number;
    domsub: number;
    forced: number;
    creampie: number;
    accidentCP: number;
    unprotected: number;
    nocumNPC: number;
    nocumPC: number;
  };
  vows: {
    [propName: string]: Vows;
  };
  liveTogether: boolean;
  liveWith: string;
  moveInFlag: boolean;
  liveWithTier: number;
}


interface InterfaceJobFlags {
  [propName: string]: boolean;
}

interface IntDrugFlags {
  powerTits: number;
  lactaMax: number;
  bovinex: boolean;
  teatEnhance: boolean;
  mammarex: number;
  residentialPedroSwap: number;
  residentialPedroWorks: boolean;
  residentialPedroMet: boolean;
  residentialHannaSwap: number;
  residentialHannaWorks: boolean;
  residentialHannaMet: boolean;
}

interface IntFarmFlags {
  member: boolean;
  joinDate: date;
  milkPrice: number;
  weekMilk: boolean;
}

interface IntJobEventFlags {
  services: {
    sawChinese: boolean;
  };
  sperm: {
    boardBoss: number;
  };
  bureau: {};
  maid: {
    firstDay: boolean;
    fuckedUp: 0 | 1 | 2 | 3;
    fuckedUpFlag: boolean;
  };
  fairyTail: {
    firstDay: boolean;
  };
  pimp: {
    askedForPractice: boolean;
    firstTime: boolean;
    payRate: number;
    hookerName: string;
    reputation: number;
  };
  streetwalk: {
    price: {
      striptease: number;
      oral: number;
      vaginal: number;
      bareback: number;
      anal: number;
      titjob: number;
      kinky: number;
    },
    apdCaughtStreetWalking: number;
  },
}

interface IntFlagParasite {
  vagina: {
    [propName: string]: IntFlagParasiteItem;
  }
  anus: {
    [propName: string]: IntFlagParasiteItem;
  }
  breast: {
    [propName: string]: IntFlagParasiteItem;
  }
  head: {
    [propName: string]: IntFlagParasiteItem;
  }
  other: {
    [propName: string]: IntFlagParasiteItem;
  }
}

interface IntFlagParasiteItem {
  has: boolean;
  date: date;
}

interface JobQuiz {
  result: string;
  number: number,
  science: number,
  hr: number,
  janitor: number,
  cow: number,
  breed: number,
  semen: number,
  testSubject: number,
  retail: number,
}

interface Bank {
  faust: {
    saving: boolean;
    loan: boolean;
    credit: boolean;
    appLoan: boolean;
    appCred: boolean;
  };
  indigo: {
    saving: boolean;
    loan: boolean;
    credit: boolean;
    appLoan: boolean;
    appCred: boolean;
  };
  payment: number;
}

interface Lily {
  weirdTalk: number;
  fuckedBathLesson: boolean;
  fuckedBathLessonPCCame: boolean;
  fuckedBathLessonLilyCumLoc: number;
}

interface BEpharmacist {
  met: boolean;
  firstMeet: number;
  avail: boolean;
}

interface Finance {
  foodNoSpend: boolean;
  goodsNoSpend: boolean;
  supplyNoSpend: boolean;
}

interface ProClothingQuest {
  panties: boolean;
  bra: boolean;
  top: boolean;
  bottom: boolean;
  dress: boolean;
}

interface IntStatusFlags {
  happy: string[];
  stress: string[];
  lonely: string[];
  fatigue: string[];
  satisfy: string[];
  health: string[];
}
