setup.defineFixedNPCs = function () {
  function defineLily() {
    var npc = {
      body: {},
      main: {},
      sched: {},
      bground: {},
      rship: {},
      sex: {},
      flag: {},
      friends: [],
      clothes: {},
      status: {},
      cond: {},
      outfit: {},
      mutate: {},
      pref: {},
      core: {},
      fert: {},
    };
    npc.body = {
      race: "white",
      skinColor: "fair",
      eyeColor: "green",
      hairColor: "strawberry blonde",
      hairCurl: 1,
      pubeColor: "dark blonde",
      height: 66,
      tone: 3,
      weight: 4,
      ass: 4,
      shoulders: 2,
      hips: 5,
      waist: 3,
      pubes: "triangular",
      hairdye: "none",
      tits: {
        size: 900,
        band: 34,
        cupNum: 21,
        cupRaw: 24,
        cup: "H-cup",
        bra: "34G",
        shape: "perky",
        nipple: "normal"
      },
      lactation: 3,
      pussy: {
        virgin: false,
        tight: 2,
        stretch: 0,
        wetness: 3,
        time: 0,
        tags: ["none"]
      },
      clit: 1,
      labia: 3,
      asshole: {
        virgin: true,
        tight: 1,
        stretch: 0,
        wetness: 0,
        time: 0,
        tags: ["none"]
      },
      cock: {
        length: 61,
        girth: 21,
        head: "normal",
        vol: 0,
        circum: false,
        hard: 4,
        smegma: false,
        tags: ["girthy"]
      },
      balls: {
        count: 2,
        size: 19,
        hang: 0,
        sac: 1,
        tags: ["none"]
      },
      beauty: 4,
      face: "cute",
      jaw: "normal",
      nose: "normal",
      ears: "pierced",
      brow: "normal",
      orgasm: 20,
      energy: 12,
      ATR: 10,
      topATR: 5,
      bottomATR: 5,
      tags: ["none"]
    };
    npc.main = {
      id: 101,
      age: 29,
      bd: [7, 2, 7, 2003],
      female: true,
      male: true,
      genes: "XXY",
      seen: true,
      interact: true,
      relation: true,
      tags: ["fixed", "plot"],
      name: "Lily",
      surname: "Richards",
      nickname: "Lils",
      portrait: "[img[IMG_NPC_Lily]]"
    };
    npc.sched = {
      workdays: [true, true, true, true, true, false, false],
      workhours: [8, 17],
      workLoc: "institute",
      outhours: [0, 3],
      locations: []
    };
    npc.bground = {
      hschool: true,
      college: true,
      associate: true,
      bachelor: true,
      master: true,
      doctor: true,
      inschool: false,
      education: 6,
      homeParents: false,
      wealth: 2,
      cash: 3820,
      bank: 6925,
      debt: 420,
      home: 9,
      job: "Institute scientist",
      car: ["Sukayu", "Impregna", "new"],
      timeApple: 2,
      sister: 0,
      sisterYounger: false,
      brother: 0,
      brotherYounger: false,
      stepParent: "na",
      dadDead: false,
      momDead: true,
      married: false,
      exSpouse: 0
    };
    npc.rship = {
      friend: true,
      acquaint: true,
      dating: false,
      lovers: false,
      exclusive: false,
      engaged: false,
      married: false,
      likePC: 90,
      likeNPC: 90,
      lovePC: 55,
      loveNPC: 55,
      companion: 0,
      domsub: 70,
      mesh: 0,
      daysince: 0,
      space: 0,
      dates: 0,
      hangout: 0,
      met: 0,
      sleptover: 0,
      pcslept: 0
    };
    npc.sex = {
      vanilla: 0,
      oralPC: 0,
      oralNPC: 0,
      anal: 0,
      public: 0,
      swallowed: 0,
      creampie: 0,
      accidentCP: 0,
      forced: 0,
      unprotected: 0,
      interupted: 0,
      nocumNPC: 0,
      nocumPC: 0,
      mob: 0,
      bondage: 0,
      sadoMaso: 0,
      watersport: 0,
      domsub: 0,
      roleplay: 0,
      fetish: 0,
      exhibit: 0,
      rapist: 0,
      raped: 0,
      saboPCbc: 0,
      caughtSabo: 0,
      PCsaboBC: 0,
      PCsaboCaught: 0,
      sexlocs: ["none"],
      tags: ["none"]
    };
    npc.friends = ["none"];
    npc.clothes = {
      empty: true
    };
    npc.status = {
      birthCon: 87,
      birthConType: "patch",
      alcohol: 0,
      drugs: [0, 0, 0, 0, 0],
      fertText: "on the patch",
      status: [],
      risk: 0,
      pregA: 0,
      pregB: 0,
      wombAcount: 0,
      wombBcount: 0,
      period: false,
      milk: 0,
      milkStore: 0,
      arousal: 2,
      pleasure: 0,
      satisfaction: 38,
      need: 0,
      ATR: 12,
      stress: 82,
      happy: 1,
      anger: 0,
      lonely: 22,
      fatigue: 0,
      asleep: false,
      health: 99,
      knowPregA: false,
      knowPregB: false,
      knowBCfail: false,
      BCfail: false,
      overAnger: false,
      overStress: false,
      overDepress: false,
      underSat: false,
      addictMax: 12,
      jonesing: 0,
      withdrawl: false,
      energy: 9,
      energyRegen: true,
      clean: 1,
      injury: [0],
      disease: [0],
      diseaseRate: 9,
      bored: 5,
      addict: {
        sex: 6,
        alco: 2,
        heat: 0,
        satyr: 0,
        focus: 12,
        cum: 8,
        zone: 9,
        cream: 1
      },
      addictNeed: {
        sex: 0,
        alco: 0,
        heat: 0,
        satyr: 0,
        focus: 0,
        cum: 0,
        zone: 0,
        cream: 0
      },
    };
    npc.cond = {
      hair: [1, "A", "A"],
      face: [1, "A", "A"],
      chest: [1, "A", "A"],
      back: [1, "A", "A"],
      hands: [1, "A", "A"],
      belly: [1, "A", "A"],
      butt: [1, "A", "A"],
      pubis: [1, "A", "A"],
      anus: [1, "A", "A"],
      anusFluid: 0,
      vagina: [1, "A", "A"],
      vagFluid: 0,
      cock: [1, "A", "A"],
      legs: [1, "A", "A"],
      feet: [1, "A", "A"]
    };
    npc.outfit = {
      empty: true
    };
    npc.mutate = {
      Milk: false,
      Acid: false,
      BC: false,
      Multiple: false,
      Gestate: false,
      Cycle: false,
      TwinWomb: false,
      Pheromone: false,
      Period: false,
      Immune: false,
      Mouth: false,
      Contort: false,
      Cumpire: false,
      PseudoPreg: false,
      Elastic: false,
      LitePhero: false
    };
    npc.pref = {
      Fweight: [-2, -2, 0, 2, 0, -2],
      Mweight: [-2, -2, 1, 1, -1, -2],
      Fheight: [0, 1, 2, 1, 0],
      Mheight: [-2, -2, 0, 1, -1],
      Fmuscle: [-2, -2, 1, 2, -1, -2],
      Mmuscle: [-2, -2, 0, 2, 0, -2],
      Fother: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Mother: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      active: 1,
      romance: 2,
      novel: 3,
      excite: 1,
      night: 2,
      expensive: -1,
      fancy: -1,
      popular: -2,
      position: ["facetoface", "cowgirl", "missionary", "doggy", "speedbump", "spoon", "squat", "reversecowgirl", "sides", "standing"],
      sexact: ["vaginal", "anal", "recOral", "giveOral", "makeout", "recHand", "giveHand"],
      kinks: ["not yet..."]
    };
    npc.core = {
      will: 3,
      libido: 5,
      open: 3,
      vert: 2,
      perv: 22,
      corrupt: 15,
      diq: 9,
      iq: 147,
      bimbo: 0,
      op: true,
      cl: false,
      intro: true,
      extro: false,
      sexuality: 1,
      straight: false,
      bi: true,
      homo: false,
      procreate: {
        str: 3,
        secure: -3,
        preg: 1,
        kids: -1,
        evolve: 2,
        pleasure: 2
      },
      morality: {
        str: 3,
        liberty: 3,
        property: 1,
        honesty: -1,
        integrity: 2
      },
      agreeable: {
        str: 2,
        interest: -1,
        empathy: 1,
        caring: 2,
        trust: -1,
        altruism: 2
      },
      conscient: {
        str: 4,
        thoughtful: 2,
        responsible: 3,
        attention: 3,
        trustworthy: 1,
        structure: -1
      },
      loyalty: {
        str: 4,
        betrayal: 2,
        cheating: 1,
        effort: 2,
        permanence: 3,
        family: 3
      },
      curiosity: {
        str: 5,
        complex: 3,
        learning: 3,
        abstract: 3,
        curiosity: 2,
        novelty: 2
      },
      neurotic: {
        str: 3,
        impulsive: 2,
        unstable: -2,
        addiction: -2,
        anxiety: 1,
        sensitive: -1,
        anger: -2,
        sadness: 2
      },
      ego: {
        str: 2,
        selfinterest: -1,
        selfworth: 2,
        confidence: 1,
        fragility: -1,
        selfimage: 2,
        mach: 2,
        risk: -1
      },
    };
    npc.fert = {
      barren: false,
      egg: 17,
      implant: 10,
      vagHostility: 14,
      cycle: 26,
      cycStart: [random(1,7),random(1,4)],
      ovuMod: randomDist([2,3,3,4,3,3,2])-4,
      period: 3,
      multEgg: 12,
      wombHealth: 0,
      iud: false,
      pregTerm: 34,
      fertility: 5,
      flagF: ["none"],
      quality: 8,
      ejac: 8,
      resMax: 28,
      reserve: 25,
      refract: 5,
      quantity: 4,
      surv: 6,
      flagM: ["none"]
    };
    npc.flag = {
      other: ["none"],
      knows: ["none"],
      rumor: ["none"],
      exes: ["none"],
      kids: 0,
      kidsPC: 0,
      cheatonPC: 0,
      cheatedon: 0,
      cheatWithPC: 0,
      knowPCcheated: 0,
      PCknowCheated: 0,
      toys: false,
      toysPublic: false,
      knowPCpreg: false,
      isFather: false,
      thinkFather: false,
      suspicion: 0,
      PCsuspicion: 0,
      thinkPCfaithful: true,
      thinkNPCfaithful: true
    };
    var pName = "n101";
    try {
      State.active.variables.NPC[pName] = new NPC(npc.body, npc.main, npc.sched, npc.bground, npc.rship, npc.sex, npc.flag, npc.friends, npc.clothes, npc.status, npc.cond, npc.outfit, npc.mutate, npc.pref, npc.core, npc.fert, npc.makeout);
    } catch (er) {
      let ermsg = "Error with NPC constructor for NPCID:" + npcid + " error: " + er;
      console.log(ermsg);
      alert(ermsg);
    }
    State.active.variables.npc.ready.push(pName);
    State.active.variables.npc.friends.push(pName);
    State.active.variables.npc.bFriend.push(pName);
    State.active.variables.npc.interested.push(pName);
    State.active.variables.npc.age28to33.push(pName);
    State.active.variables.npc.futa.push(pName);
    State.active.variables.npc.single.push(pName);
  }
  setTimeout(defineLily());
};