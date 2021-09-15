/*
███████╗██╗      █████╗  ██████╗ ███████╗
██╔════╝██║     ██╔══██╗██╔════╝ ██╔════╝
█████╗  ██║     ███████║██║  ███╗███████╗
██╔══╝  ██║     ██╔══██║██║   ██║╚════██║
██║     ███████╗██║  ██║╚██████╔╝███████║
╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
*/


setup.initializeFlags = function() {
  ↂ.flag = {
    camShow: {
      nickname: "",
      popularity: 0,
      dailyStream: true,
      actualRequest: 0,
      daysAbsent: 0,
      followers: 0,
      stats: {
        expCap : 10,
        experience: 0,
        level: 1,
      },
      flags: [],
      story: {
        home_shows : 0,
        park_shows : 0,
      },
    },
    randomSkills: 0,
    LilyResult: [],
    sleepfailwarn: false,
    profane: false, // whether character's name is slutty/profanity
    triedForDeposit: false,
    BEnewClothes: true,
    Healthcare: true, // cheaper health care, unlocks more healthcare tomfuckery
    organDonor: 3, // difficulty level - 1=fap, 2=easy, 3=medium, 4=hard
    milkTank: 0, // amount of milk below a full container when pumping milk for sale
    selfThought: "none",
    challengeMode: false,
    challengeLost: false,
    lastSex: 130000,
    preBirthTightness: 0,
    LilyCoffee: true,
    LilyCoffeeSuc: false,
    LilyHouseAvailable: false,
    StaredLily: false,
    main: {
      male: {
        workResponse: 0,
        saraIntro: false,
      },
      female: {
        firstText: false,
        metLily: false,
        helpResp: 0,
        kimIntro: false,
        whatIsIt: false,
        kimSpecial: false,
        kimPregnant: false,
      },
      startText: false,
      mainStart: false,
      omniKey: 0,
      rangBellToday: false,
      active: [true, false, false, false, false, false, false, false, false],
      progress: [0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 to 1000 to represent one decimal place
      known: [true, false, false, false, false, false, false, false, false],
      deadline: [191520, 252000, 332640, 391680, 443520, 534240, 0, 0, 0],
      contacts: [false, false, false, 0, 0, 0, 0], // used only for obtain wire task
      components: [0, 0, 0, 0], // components obtaining states (0 = task not started, 1 = task started, 2 = task finished)
      componentsNames: ["IR Field Coherer", "Resonance Oscillator", "Magnetic Flux Capacitor", "Spectral lenses set"],
      componentsStartScene: ["IrFieldCoherer", "ResonanceOscillator", "MagneticFluxCapacitor", "SpectralLensesSet"],
      componentsImages: ["IMG-Component-Koherer", "IMG-Component-Oscillator", "IMG-Component-Capacitor", "IMG-Component-Lenses"],
      IrCooldown: true,
      oscillatorStage: ["none"],
      capacitorStage: ["none"],
      capacitorCode: "",
    },
    lilyTased: 0,
    buggedLily: 0,
    selfEmployed: false,
    unemployedDays: 0,
    selfEmployType: "none",
    lastRent: 0,
    recordBirths: 19,
    stretchCuntDown: 3,
    stretchAssDown: 2,
    job: {
      IT: {
        surgery: false,
        secLab: false,
        video: false,
        breedIntro: false,
        breedOne: false,
        breedTwo: false,
        breedThree: false,
        breedFinal: false,
        breedInsem: false,
        breedPunish: false,
        breedTrain: false,
        tittenSex: false,
        likeTits: false,
        hateTits: false,
        honest: false,
        ugly: false,
        breedRev: false,
      },
      IS: {
        sawChinese: false,
        metMarta: false,
        martaVolunteer: false,
        martaLounge: false,
        martaFriend: false,
        martaInterupt: false,
        martaRescue: false,
        martaDildo: false,
        martaBreak: false,
        martaAsked: false,
        martaSex: false,
      },
      IB: {
        responseTeam1: false,
        responseTeam2: false,
        responseTeamD: false,
      },
      PF: {
        briefing: false,
        birthCon: false,
        hips: false,
        moreHips: false,
        inseminated: false,
        splitter: false,
        boost: false,
        pregTest: false,
        firstInsem: false,
        saradberol: false,
        stretch: false,
        record: false,
        firstRecord: true,
      },
      HD: {
        braTrap: false,
        smallBras: false,
        hecow: false,
        training: false,
      },
    },
    drTittenCount: 0,
    milesDriven: 0, // miles driven during the game
    car: {
      make: "Missibitchi",
      model: "Lingual",
      year: 2026,
      mileage: random(85000, 95000),
    },
    OfferedHelpLily: 0,
    DamagedCar: 0, // how damaged player's car is (repair quest to be able to leave the valley)
    tempSkillBoost: { // temporary bonus to skills recorded here for later retraction
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
      cook: 0,
      martial: 0,
      firearms: 0,
    },
    BackupTraits: { // "real" personality of PC used for restoring
      will: 0,
      libido: 0,
      open: 0,
      vert: 0,
      diq: 0,
      iq: 0,
      op: true,
      cl: true,
      intro: true,
      extro: true,
      sexuality: 0,
      straight: true,
      bi: true,
      homo: true,
      bitch: 0,
      lowEsteem: 0,
    },
    BackupKinks: { // more of "real" personality of PC used for restoring
      risky: true,
      pregnancy: true,
      sizequeen: true,
      cumSlut: true,
      sub: true,
      exhibition: true,
      masochist: true,
      buttSlut: true,
      public: true,
      slut: true,
      superSlut: true,
      hyperSlut: true,
      oral: true,
      anal: true,
      force: true,
      rape: true,
      liberate: true,
      easy: true,
      nips: true,
      dom: true,
      water: true,
      bond: true,
      hard: true,
      fap: true,
      shame: true,
    },
    gameEvents: {
      map: {},
      story: {},
      mechanic: {},
    },
    StylistVisitA: 0, // records number of times seen the world's only 3 stylists
    StylistVisitB: 0,
    StylistVisitC: 0,
    door: { // unlock door/burger codes
      megaTits: 0,
      tries: 2,
      code: 1551,
      ultraFertile: 0,
      puddlingCunt: 0,
      pussyPheromones: 0,
    },
    Prologue: true, // IMPORTANT - whether or not in prologue
    prologueSunday: true, // important to prevent "sunday missed work issue"
    ProBoughtClothes: false,
    ProClothingQuest: {
      panties: false,
      bra: false,
      top: false,
      bottom: false,
      dress: false,
    },
    ProHospitalCheckedBody: false,
    CarWreckDmg: 0,
    GaveTobyName: false,
    weekTute: true,
    exes: [],
    finance: {
      foodNoSpend: false,
      goodsNoSpend: false,
      supplyNoSpend: false,
    },
    BEpharmacist: {
      met: false,
      firstMeet: 0,
      avail: true,
    },
    badEnd: "none", // IMPORTANT - type of bad ending triggered
    badEndInit: false, // whether bad-end launching omni-event has been set
    doomClock: false, // stores key to doomClock omni event for ending game
    lily: {
      weirdTalk: 0,
      fuckedBathLesson: false,
      fuckedBathLessonPCCame: false,
      fuckedBathLessonLilyCumLoc: 0,
    },
    proResistedFap: false,
    coffeeToday: 0, // amount of coffee drank in 1 day for limiting bonuses
    sawLadyWoods: false,
    metLadyWoods: false,
    ladyWoodsBred: 0,
    ladyWoodsFlee: false,
    sexTutorial: true,
    oystersWithMom: false,
    playerNotes: ["none"],
    bank: { // information on whether you have X bank account with the bank.
      faust: { saving: false, loan: false, credit: false, appLoan: false, appCred: false},
      indigo: { saving: false, loan: false, credit: false, appLoan: false, appCred: false},
      payment: 0,
    },
    listenToLily: 0,
    prologueBusReaction: [0],
    jobFairCheckedOut: [0, 0, 0, 0, 0, 0, 0],
    jobQuiz: {
      result: "none",
      number: 0,
      science: 0,
      hr: 0,
      janitor: 0,
      cow: 0,
      breed: 0,
      semen: 0,
      testSubject: 0,
      retail: 0,
    },
    jobsWorked: {
      IS: false,
      IT: false,
      IB: false,
      MD: false,
      FT: false,
      PF: false,
      HD: false,
    },
    parasite: { // general parasite recording/tracking
      vagina: {
        c39: {
          has: false,
          date: [0, 0, 0, 0],
        },
      },
      anus: {},
      breast: {},
      head: {},
      other: {},
    },
    prologueFemPaid: false,

    // Anenn Markup
    nurseryVisit: false,

    prologuePassedScience: 0,
    omni: {
      creamHypno: 0,
      kukragene: 0,
    },
    alarmClock: [false, 7, 0], // setting for the players wake-up alarm clock
    suicideList: [],
    schedHangs: [],
    schedDates: [],
    homeVisit: [0, "none"],
    doms: [],
    subs: [],
    keyHolding: ["none", "none"], // npcId and stage
    keyHolders: ["none", "none"], // npcId and stage
    sendKeyReturned: [false, false, false],
    sendKeyLost: [false, false, false],
    psycho: {
      caught: false,
    },
    victimName: "",
    jobEvents: {  // tracks job related events
      hucowFarm: {
        // Anenn Markup
        milkingFriend: false,
        newJobBreeding1: false,
        newJobBreeding2: false,
        myaFavour1: false,
        nudeYogaIntro: false,
      },
      progenerate: {
        // Anenn Markup
        pussyResearch: false,
        pussyResearch2: false,
      },
      services: {
        sawChinese: false,
      },
      sperm: {
        boardBoss: 0,

        // Anenn Markup
        AyaneCarl_E1: false,
        AyaneCarl_E2: false,

        NanobotsTroubleA1: false,

        tentacleBreed_A: false,
        tentacleBreed_B: false,

        Aesha_A: false,
        Aesha_B: false,
      },
      bureau: {},
      maid: {
        firstDay: true,
        fuckedUp: 0,
        fuckedUpFlag: false,
      },
      fairyTail: {
        firstDay: true,

        // Anenn markup
        newClient: false,
      },
      pimp: {
        askedForPractice: false,
        firstTime: true,
        hookerName: "Bunny Suxalot",
        payRate: 20,
        reputation: 0,
      },
      pollRiders: {
        vipClient: false,
      },
      streetwalk: {
        price: {
          striptease: 15,
          oral: 25,
          vaginal: 40,
          bareback: 80,
          anal: 60,
          titjob: 20,
          kinky: 60,
        },
        apdCaughtStreetWalking: 0,
        history: {
          striptease: 0,
          oral: 0,
          vaginal: 0,
          bareback: 0,
          anal: 0,
          titjob: 0,
          kinky: 0,
        },
      },
    },
    drug: { // IntDrugFlags
      powerTits: 0,
      lactaMax: 0,
      bovinex: false,
      teatEnhance: false,
      mammarex: 0,
      residentialPedroSwap: 666, // checker for refreshing drug dealer inventory
      residentialPedroWorks: true, // false if dealer is busted so he will not appear more at the corner.
      residentialPedroMet: false, // if pc ever met pedro - used for correct npc behavior when pc talks to him
      residentialHannaSwap: 666, // checker for refreshing drug dealer inventory
      residentialHannaWorks: true, // false if dealer is busted so he will not appear more at the corner.
      residentialHannaMet: false, // if pc ever met Hanna - used for correct npc behavior when pc talks to him
    },
    hannaStory: {
      stage: "none",
      money: 0,
    },
    farm: { // IntFarmFlags
      member: false,
      joinDate: [0, 0, 0, 0],
      milkPrice: 3,
      weekMilk: false,
      events: {
        mechBull: false,
        bullsJizz: false,
        lesbOffice: false,
      },
    },
    sawFertilitySealAd: false,
    school: {
      oppaidoGreenBelt: false,
    },
    apdCaughtNaked: 0,
    caveAdventure: false,
    addictWarned: false,
    stressWarned: false,
    nudeWarned: false,
    bedWarned: false,
    lonelyWarned: false,
    sexWarned: false,
    cleanWarned: false,
    jobManualShown: false,
    schoolManualShown: false,
    dateManualShown: false,
    statsManualShown: false,
    psychoAttend : { // doctor's name: [if subscribed to the doctor, last week number pc attended, last month number pc attended, last event text used]
      lecter: [false, 0, 0, 0],
    },
    churchAttend: {
      outer: false,
      cock: false,
      man: false,
    },
    plasticOperationType: "none", // because i need to store it somewhere
    plasticOperationSize: "none",
    expandP: false,
    plasticOperationCost: 0,
    tan: 0, // let's say 1-10
    mentalPrescription: false,
    escapeHatch: "not used",
    residentialDaisyMet: false,
    syntetixRead: false,
    shamelessRead: false,
    broodRead: false,
    wlgRead: false,
    magazinesCount: 0,
    magazinesTotal: 4,
    kegelator: false,
    shelterVisits: 0,
    bestialityExperience: false,
    fairMail: false,
    fairShooting: false,
    fairMilking: false,
    coopMilkAsk: false,
    fertilitySeal: false,
    envyTaken: false,
    anuwetTaken: false,
    fuckMachineDildo: "false",
    addictionClinic: {
      firstTime: true,
      stories: 0,
      visitedToday: false,
    },
    marriage: {
      date: [1, 1, 1, 2032],
      npc: "none",
      spouseAngry: 0,
      spouseAngryOverall: 0,
      discussion: {
        inProgress: false,
        date: false,
        vows: false,
        place: false,
        officiator: false,
        dress: false,
        guests: false,
        smallThings: ["none", "none", "none"],
      },
      vowsControl: { // false = broken vow
        noCondom: true,
        condom: true,
        noPill: true,
        noIUD: true,
        IUD: true,
        pregnant: true,
        noKids: true,
        kids: true,
        sub: true,
        dom: true,
        slave: true,
        exclusiveWomb: true,
        noTransform: true,
        houseWife: true,
        houseSpouse: true,
        pcCleans: true,
        npcCleans: true,
        hucow: true,
        nudity: true,
        titSize: true,
        moneyPC: true,
        moneyNPC: true,
      },
      NPCvows: ["none", "none", "none"], // obligatory, optional, optional
      PCvows: [],
      disinterested: 0,
      timeHasCome: false,
      attended: true,
      married: false,
      vowBroken: false,
    },
    npcInducedInteractions: {
      destination: 0,
      intType: "none",
      intNPC: "none",
    },
    fempro: {
      initResponse: 0,
      likedClothes: 0,
    },
    preg: {
      morningSickToday: false,
      firstKick: false,
      kickA: false,
      kickB: false,
      // info  Maint  Elasta Uteri
      elastic: [false, false, false],
      // info  Speed  Short  Quick
      boostA: [false, false, false],
      boostB: [false, false, false],
    },
    surrogateSignUp: false,

    // Anenn vars
    surrogate: {
      chosen: false,
      accept: false,
      type: "",
      person: "",
      value: 0,
      history: {
        postBreed: false,
        bitchType: "",
        breedingMeeting: 0,
        artificialFertilization: 0,
        ownKidsConceived: 0,
        otherKidsConceived: 0,
        rejectedBred: 0,
        rejectedArtf: 0,
      },
      wombA: false,
      wombB: false,
    },

    passedOut: 0,
    status: {
      happy: [],
      stress: [],
      lonely: [],
      fatigue: [],
      satisfy: [],
      health: [],
      bimbo: [],
    },
    pumpDumpUnlock: false,
    sexRecord: {
      makeout: 0,
      sex: 0,
      oral: 0,
      anal: 0,
      public: 0,
      domsub: 0,
      forced: 0,
      creampie: 0,
      accidentCP: 0,
      unprotected: 0,
      nocumNPC: 0,
      nocumPC: 0,
    },
    vows: {},
    liveTogether: false,
    liveWith: "none",
    moveInFlag: false,
    liveWithTier: 0,
    statistics: {
      stress: 0,
      arousal: 0,
      milk: 0,
      anger: 0,
    },
    doubleDonger: {
        used: 0,
        firstTime: true,
        loaded: true,
    },
    bookClub: {
      asked: false,
      level: "none",
      timeOpen: 0,
    },
    jobChooseTut: true,
    tentacle: {
      breeder: false,
      store: -1,
      foundShopfront: false,
      browsed: false,
    },
    tentacleStore: 0,
    skillup: {
      exhibition: false,
      prostitute: false,
      sex: false,
      oral: false,
      seduction: false,
      comm: false,
      org: false,
      probSolving: false,
      finance: false,
      art: false,
      athletic: false,
      dancing: false,
      clean: false,
      shop: false,
      cook: false,
      heels: false,
    },
  };

  aw.con.info("Initialized Flags.");
};



/*
██╗███╗   ██╗████████╗███████╗██████╗ ███████╗ █████╗  ██████╗███████╗
██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝
██║██╔██╗ ██║   ██║   █████╗  ██████╔╝█████╗  ███████║██║     █████╗
██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██╔══╝  ██╔══██║██║     ██╔══╝
██║██║ ╚████║   ██║   ███████╗██║  ██║██║     ██║  ██║╚██████╗███████╗
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝
*/


interface ↂflag {
  camShow: {
    nickname: string;
    popularity: number;
    daysAbsent: number;
    dailyStream: boolean;
    actualRequest: number;
    followers: number;
    stats: {
      expCap: number;
      experience: number;
      level: number;
    };
    flags: string[];
    story: {
      home_shows: number;
      park_shows: number;
    };
  };
  randomSkills: number;
  profane: boolean;
  sleepfailwarn: boolean;
  triedForDeposit: boolean;
  BEnewClothes: boolean;
  Healthcare: boolean;
  organDonor: 1 | 2 | 3 | 4;
  milkTank: number;
  selfThought: string;
  challengeMode: string | false;
  challengeLost: boolean;
  lastSex: number;
  preBirthTightness: number;
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
    components: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
    componentsNames: string[];
    componentsStartScene: string[];
    componentsImages: string[];
    IrCooldown: boolean;
    oscillatorStage: any[];
    capacitorStage: any[];
    capacitorCode: string;
  };
  lilyTased: number;
  buggedLily: number;
  selfEmployed: boolean;
  unemployedDays: number;
  selfEmployType: string;
  lastRent: number;
  recordBirths: number;
  stretchCuntDown: number;
  stretchAssDown: number;
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
  sawLadyWoods: boolean;
  metLadyWoods: boolean;
  ladyWoodsBred: number;
  ladyWoodsFlee: boolean;
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
  nurseryVisit: boolean;
  prologueFemPaid: boolean;
  parasite: IntFlagParasite;
  omni: IntFlagOmni;
  alarmClock: [boolean, number, number];
  suicideList: string[];
  schedDates: string[];
  homeVisit: [number, string];
  schedHangs: string[];
  doms: string[];
  subs: string[];
  keyHolding: [string, string];
  keyHolders: [string, string];
  sendKeyReturned: [boolean, boolean, boolean];
  sendKeyLost: [boolean, boolean, boolean];
  psycho: {
    caught: false,
  };
  victimName: string;
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
  stressWarned: boolean;
  nudeWarned: boolean;
  bedWarned: boolean;
  lonelyWarned: boolean;
  sexWarned: boolean;
  cleanWarned: boolean;
  jobManualShown: boolean;
  schoolManualShown: boolean;
  dateManualShown: boolean;
  statsManualShown: boolean;
  psychoAttend: {
    [propName: string]: [boolean, number, number, number];
  };
  churchAttend: {
    outer: boolean;
    cock: boolean;
    man: boolean;
  };
  plasticOperationType: string;
  plasticOperationSize: any;
  expandP: boolean;
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
  kegelator: boolean;
  shelterVisits: number;
  bestialityExperience: boolean;
  fairMail: boolean;
  fairShooting: boolean;
  fairMilking: boolean;
  coopMilkAsk: boolean;
  fertilitySeal: boolean;
  envyTaken: boolean;
  anuwetTaken: boolean;
  fuckMachineDildo: string;
  addictionClinic: {
    firstTime: boolean;
    stories: number;
    visitedToday: boolean;
  };
  marriage: {
    date: [number, number, number, number],
    npc: string,
    spouseAngry: number,
    spouseAngryOverall: number,
    discussion: {
      inProgress: boolean,
      date: false | string,
      vows: false | string,
      place: false | string,
      officiator: false | string,
      dress: false | string,
      guests: any,
      smallThings: [string, string, string],
    },
    vowsControl: {
      noCondom: boolean,
      condom: boolean,
      noPill: boolean,
      noIUD: boolean,
      IUD: boolean,
      pregnant: boolean,
      noKids: boolean,
      kids: boolean,
      sub: boolean,
      dom: boolean,
      slave: boolean,
      exclusiveWomb: boolean,
      noTransform: boolean,
      houseWife: boolean,
      houseSpouse: boolean,
      pcCleans: boolean,
      npcCleans: boolean,
      hucow: boolean,
      nudity: boolean,
      titSize: boolean,
      moneyPC: boolean,
      moneyNPC: boolean,
    }
    NPCvows: [string, string, string],
    PCvows: string[],
    disinterested: number,
    timeHasCome: boolean,
    attended: boolean,
    married: false | string,
    vowBroken: boolean,
  };
  npcInducedInteractions: {
    destination: any,
    intType: string,
    intNPC: string,
  };
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
  };
  surrogateSignUp: boolean;

  // Anenn Markup
  surrogate: {
    chosen: boolean;
    accept: boolean;
    type: string;
    person: string;
    value: number;
    history: {
      postBreed: boolean;
      bitchType: string;
      breedingMeeting: number;
      artificialFertilization: number;
      ownKidsConceived: number;
      otherKidsConceived: number;
      rejectedBred: number;
      rejectedArtf: number;
    };
    wombA: boolean;
    wombB: boolean;
  };

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
  statistics: {
    stress: number;
    arousal: number;
    milk: number;
    anger: number;
  };
  doubleDonger: {
      used: number;
      loaded: boolean;
      firstTime: boolean;
  };
  bookClub: {
    asked: boolean;
    level: string;
    timeOpen: number;
  };
  jobChooseTut: boolean;
  tentacleStore: number;
  tentacle: InterfaceTentacle;
  skillup: InterfaceSkillup;
}

interface InterfaceTentacle {
  breeder: boolean;
  store: number;
  foundShopfront: boolean;
  browsed: boolean;
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
  events: {
    mechBull: boolean;
    bullsJizz: boolean;
    lesbOffice: any;
  };
}

interface IntJobEventFlags {
  hucowFarm: {
    milkingFriend: any;
    newJobBreeding1: any;
    newJobBreeding2: any;
    myaFavour1: any;
    nudeYogaIntro: boolean;
  };
  progenerate: {
    pussyResearch: any,
    pussyResearch2: any,
  };
  services: {
    sawChinese: boolean;
  };
  sperm: {
    boardBoss: number;
    AyaneCarl_E1: any;
    AyaneCarl_E2: any;
    NanobotsTroubleA1: any;
    tentacleBreed_A: any;
    tentacleBreed_B: any;
    Aesha_A: any;
    Aesha_B: any;
  };
  bureau: {};
  maid: {
    firstDay: boolean;
    fuckedUp: 0 | 1 | 2 | 3;
    fuckedUpFlag: boolean;
  };
  fairyTail: {
    firstDay: boolean;
    newClient: any;
  };
  pimp: {
    askedForPractice: boolean;
    firstTime: boolean;
    payRate: number;
    hookerName: string;
    reputation: number;
  };
  pollRiders: {
    vipClient: any;
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
    // Anenn prostitution counter
    history: {
      striptease: number;
      oral: number;
      vaginal: number;
      bareback: number;
      anal: number;
      titjob: number;
      kinky: number;
    }
  };
}

interface IntFlagParasite {
  vagina: {
    [propName: string]: IntFlagParasiteItem;
  };
  anus: {
    [propName: string]: IntFlagParasiteItem;
  };
  breast: {
    [propName: string]: IntFlagParasiteItem;
  };
  head: {
    [propName: string]: IntFlagParasiteItem;
  };
  other: {
    [propName: string]: IntFlagParasiteItem;
  };
}

interface IntFlagParasiteItem {
  has: boolean;
  date: date;
}

interface JobQuiz {
  result: string;
  number: number;
  science: number;
  hr: number;
  janitor: number;
  cow: number;
  breed: number;
  semen: number;
  testSubject: number;
  retail: number;
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
  bimbo: string[];
}

interface InterfaceSkillup {
  exhibition: boolean;
  prostitute: boolean;
  sex: boolean;
  oral: boolean;
  seduction: boolean;
  comm: boolean;
  org: boolean;
  probSolving: boolean;
  finance: boolean;
  art: boolean;
  athletic: boolean;
  dancing: boolean;
  clean: boolean;
  shop: boolean;
  cook: boolean;
  heels: boolean;
}
