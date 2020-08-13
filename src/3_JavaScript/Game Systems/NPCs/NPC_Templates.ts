/*
888b    888 8888888b.   .d8888b. 88888888888
8888b   888 888   Y88b d88P  Y88b    888
88888b  888 888    888 888    888    888
888Y88b 888 888   d88P 888           888
888 Y88b888 8888888P"  888           888
888  Y88888 888        888    888    888
888   Y8888 888        Y88b  d88P    888
888    Y888 888         "Y8888P"     888
*/



interface IntSetupNPCtemplate {
  populate: () => string;
  listener: (...keys: string[]) => void;
  click: (key) => void;
  makeNew: () => void;
  delete: () => void;
  rename: () => void;
  save: () => string;
  import: (data) => void;
  generate: () => NPCinputData;
}

interface IntAWnpcTemplate {
  // storage for npc templates
  [propName: string]: NPCinputData;
}

aw.npcTemplate = {};



setup.npcTemplate = {
  populate() {
    const keys = Object.keys(aw.npcTemplate);
    let output = "";
    for (const k of keys) {
      output += `<div id="npct-${k}" class="npcTempItem">${k}</div>`;
    }
    setTimeout(() => setup.npcTemplate.listener(...keys), 100);
    return output;
  },
  listener(...keys) {
    // adds a click handler to any items
    for (const key of keys) {
      const id = "#npct-" + key;
      $(id).click(() => setup.npcTemplate.click(key));
    }
  },
  click(key) {
    const keys = Object.keys(aw.npcTemplate);
    State.temporary.nSelected = key;
    for (const k of keys) {
      const id = "#npct-" + k;
      $(id).removeClass("npcSelected");
    }
    $("#npct-" + key).addClass("npcSelected");
  },
  makeNew() {
    const num = Object.keys(aw.npcTemplate).length;
    if (num > 9) {
      UI.alert("You have reached the maximum number of templates!");
      return;
    }
    const name = "New_Template_" + (num + 1);
    aw.npcTemplate[name] = setup.npcTemplate.generate();
    State.temporary.nCunt += 1;
    aw.append("#templateList", `<div id="npct-${name}" class="npcTempItem">${name}</div>`);
    setTimeout(() => setup.npcTemplate.listener(name), 50);
  },
  delete() {
    if (State.temporary.nSelected === "none") {
      UI.alert(`You must select a template to delete first!`);
      return;
    }
    delete aw.npcTemplate[State.temporary.nSelected];
    State.temporary.nCunt -= 1;
    State.temporary.nSelected = "none";
    aw.replace("#templateList", "<<= setup.npcTemplate.populate()>>");
  },
  rename() {
    const new_name = Util.slugify(State.temporary.nName);
    const old_key = State.temporary.nSelected;
    if (Object.keys(aw.npcTemplate).includes(new_name) || old_key === new_name) {
      UI.alert("Your new template name must be unique!");
      return;
    }
    aw.npcTemplate[new_name] = clone(aw.npcTemplate[old_key]);
    delete aw.npcTemplate[old_key];
    State.temporary.nSelected = "none";
    aw.replace("#templateList", "<<= setup.npcTemplate.populate()>>");
  },
  save() {
    if (State.temporary.npcSelected === "none") {
      UI.alert("Please select an NPC template before attempting to export it.");
      return "fail";
    }
    let data = JSON.stringify(aw.npcTemplate);
    try {
      const encrypted = CryptoJS.AES.encrypt(data, "IamAtemplaTe");
      data = encrypted.toString();
    } catch (e) {
      alert(`Template data writing failed. ${e.name}: ${e.message}.`);
      return "fail";
    }
    return data;
  },
  import(data) {
    let decode;
    let tob;
    if (data == null) {
      UI.alert("No file selected, or no suitable data in file.");
      return "error";
    }
    try {
      const decrypted = CryptoJS.AES.decrypt(data, "IamAtemplaTe");
      decode = decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      UI.alert(`The template data could not be read, ensure you are loading a valid awt file.`);
      return "error";
    }
    try {
      tob = JSON.parse(decode);
    } catch (e) {
      UI.alert(`Unable to parse template data. Ensure you are loading the correct template type. ${e.name}: ${e.message}`);
      return "error";
    }
    const old_keys = Object.keys(aw.npcTemplate);
    const new_keys = Object.keys(tob);
    for (const key of new_keys) {
      let name = key;
      if (old_keys.includes(key)) { // avoid overwriting existing template
        name = key + "_loaded";
      }
      aw.npcTemplate[name] = clone(tob[key]);
    }
    return "good";
  },
  generate() {
    const npc: NPCinputData = {
      body: {},
      main: {},
      sched: {},
      bground: {},
      rship: {},
      sex: {},
      flags: {},
      friends: [],
      clothes: {},
      status: {},
      cond: {},
      outfit: {},
      mutate: {},
      pref: {},
      core: {},
      fert: {},
      makeout: [],
    };
    npc.body = {
      race: "white",
      skinColor: "fair",
      eyeColor: "blue",
      hairColor: "brown",
      hairCurl: 1,
      pubeColor: "black",
      height: 72,
      tone: 5,
      weight: 3,
      ass: 2,
      shoulders: 5,
      hips: 2,
      waist: 3,
      pubes: "trimmed",
      hairdye: "none",
      tits: {
        shape: "flat",
        nipple: "normal",
        nipLength: 3,
        nipGirth: 1,
        areola: 1,
        puffy: 1,
        band: 0,
        silicone: 0,
        base: {
          bra: 0,
          cup: 0,
          cupNum: 0,
          cupRaw: 0,
          size: 0,
        },
        lact: {
          on: false,
          max: 0,
          size: 0,
          cupNum: 0,
          cup: 0,
          bra: 0,
        },
      },
      lactation: 0,
      lactCapacity: 0,
      pussy: {
        virgin: true,
        tight: -1,
        stretch: -1,
        time: -1,
        wetness: -1,
        tags: [],
      },
      clit: 0,
      labia: 0,
      asshole: {
        virgin: true,
        tight: 1,
        stretch: 0,
        wetness: 0,
        time: 0,
        tags: ["none"],
      },
      cock: {
        length: 76,
        girth: 28,
        head: "normal",
        circum: false,
        hard: 4,
        smegma: false,
        tags: ["girthy"],
      },
      balls: {
        count: 2,
        size: 26,
        hang: 0,
        sac: 1,
        tags: ["none"],
      },
      beauty: 4,
      face: "normal",
      jaw: "normal",
      nose: "normal",
      ears: "normal",
      brow: "normal",
      orgasm: 30,
      energy: 16,
      ATR: 10,
      topATR: 5,
      bottomATR: 5,
      tags: ["none"],
      makeup: {},
    };
    npc.main = {
      id: 0,
      age: 24,
      bd: [5, 1, 5, 2003],
      female: false,
      male: true,
      genes: "XY",
      seen: true,
      interact: true,
      relation: true,
      lifetime: 0,
      tags: [],
      name: "Template",
      surname: "Template",
      nickname: "none",
      portrait: "none",
    };
    npc.sched = {
      workdays: [true, true, true, true, true, false, false],
      workhours: [8, 17],
      workLoc: "institute",
      outhours: [0, 3],
      locations: [],
    };
    npc.bground = {
      hschool: true,
      college: true,
      associate: true,
      bachelor: true,
      master: false,
      doctor: false,
      inschool: false,
      education: 4,
      homeParents: true,
      wealth: 2,
      cash: 1620,
      bank: 3525,
      debt: 1420,
      home: 5,
      job: "Institute Office Clerk",
      car: ["Toyoda", "Priapism", "used"],
      timeApple: 2,
      sister: 0,
      sisterYounger: false,
      brother: 0,
      brotherYounger: false,
      stepParent: "na",
      dadDead: true,
      momDead: false,
      married: false,
      exSpouse: 0,
    };
    npc.rship = {
      friend: false,
      acquaint: false,
      dating: false,
      lovers: false,
      exclusive: false,
      engaged: false,
      married: false,
      likePC: 0,
      likeNPC: 0,
      lovePC: 0,
      loveNPC: 0,
      companion: 0,
      domsub: 70,
      mesh: 0,
      daysince: 0,
      space: 0,
      dates: 0,
      hangout: 0,
      met: 0,
      sleptover: 0,
      pcslept: 0,
    };
    npc.sex = {
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
      saboPCbc: 0,
      caughtSabo: 0,
      PCsaboBC: 0,
      PCsaboCaught: 0,
      sexlocs: ["none"],
      tags: ["none"],
    };
    npc.friends = ["none"];
    npc.clothes = {
      empty: true,
    };
    npc.status = {
      birthCon: 0,
      birthConType: "none",
      // tslint:disable-next-line:max-line-length
      bc: { dia: false, diaType: "none", diaEf: 0, diaHealth: 0, diaBreak: false, diaSab: 0, femCon: false, femConHealth: 0, femConEf: 0, femConType: "none", femConBreak: false, femConSab: 0, menCup: false, menCupType: "none", menCupHealth: 0, menCupEf: 0, menCupBreak: false, menCupSab: 0, sponge: false, spongeType: "none", spongeEf: 0, spongeSab: 0, condom: false, condomType: "none", condomHealth: 0, condomEf: 0, condomBreak: false, condomSab: 0, headCap: false, headCapType: "none", headCapHealth: 0, headCapEf: 0, headCapBreak: false, headCapSab: 0 },
      alcohol: 0,
      drugs: [0, 0, 0, 0, 0],
      fertText: "none",
      status: [],
      risk: 0,
      wombA: {
        preg: false,
        know: false,
        weeks: 0,
        days: 0,
        birth: 0,
        count: 0,
      },
      wombB: {
        preg: false,
        know: false,
        weeks: 0,
        days: 0,
        birth: 0,
        count: 0,
      },
      period: false,
      milk: 0,
      milkStore: 0,
      arousal: random(2, 5),
      pleasure: 0,
      satisfaction: random(25, 75),
      need: 0,
      ATR: 12,
      stress: random(25, 75),
      happy: random(0, 3),
      anger: 0,
      lonely: random(25, 75),
      fatigue: 0,
      asleep: false,
      health: random(98, 100),
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
        sex: 0,
        alco: 0,
        heat: 0,
        satyr: 0,
        focus: 0,
        cum: 0,
        zone: 0,
        cream: 0,
      },
      addictNeed: {
        sex: 0,
        alco: 0,
        heat: 0,
        satyr: 0,
        focus: 0,
        cum: 0,
        zone: 0,
        cream: 0,
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
      feet: [1, "A", "A"],
    };
    npc.outfit = {
      empty: true,
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
      LitePhero: false,
      MegaNuts: false,
      Multgasm: false,
      PowerEjac: false,
      AcidPre: false,
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
      active: random(0, 4) - 2,
      romance: random(0, 4) - 2,
      novel: random(0, 4) - 2,
      excite: random(0, 4) - 2,
      night: random(0, 4) - 2,
      expensive: random(0, 4) - 2,
      fancy: random(0, 4) - 2,
      popular: random(0, 4) - 2,
      // tslint:disable-next-line:max-line-length
      position: ["facetoface", "cowgirl", "missionary", "doggy", "speedbump", "spoon", "squat", "reversecowgirl", "sides", "standing"],
      sexact: ["vaginal", "anal", "recOral", "giveOral", "makeout", "recHand", "giveHand"],
      kinks: ["risky", "cumSlut", "liberate", "dom", "nips"],
    };
    npc.core = {
      will: 3,
      libido: random(3, 5),
      open: 1,
      vert: -2,
      perv: random(0, 30) + random(0, 30),
      corrupt: random(0, 25) + random(0, 25),
      diq: 1,
      iq: 101,
      bimbo: random(0, 60),
      op: false,
      cl: false,
      intro: false,
      extro: true,
      sexuality: 1,
      straight: true,
      bi: false,
      homo: false,
      procreate: {
        str: 3,
        secure: -3,
        preg: 1,
        kids: -1,
        evolve: 2,
        pleasure: 2,
      },
      morality: {
        str: 3,
        life: 1,
        liberty: 3,
        property: 1,
        honesty: -1,
        integrity: 2,
      },
      agreeable: {
        str: 2,
        interest: -1,
        empathy: 1,
        caring: 2,
        trust: -1,
        altruism: 2,
      },
      conscient: {
        str: 4,
        thoughtful: 2,
        responsible: 3,
        attention: 3,
        trustworthy: 1,
        structure: -1,
      },
      loyalty: {
        str: 4,
        betrayal: 2,
        cheating: 1,
        effort: 2,
        permanence: 3,
        family: 3,
      },
      curiosity: {
        str: 5,
        complex: 3,
        learning: 3,
        abstract: 3,
        curiosity: 2,
        novelty: 2,
      },
      neurotic: {
        str: 3,
        impulsive: 2,
        unstable: -2,
        addiction: -2,
        anxiety: 1,
        sensitive: -1,
        anger: -2,
        sadness: 2,
      },
      ego: {
        str: 2,
        selfinterest: -1,
        selfworth: 2,
        confidence: 1,
        fragility: -1,
        selfimage: 2,
        mach: 2,
        risk: -1,
      },
    };
    npc.fert = {
      barren: false,
      egg: 0,
      implant: 0,
      vagHostility: 0,
      cycle: 0,
      cycStart: [random(1, 7), random(1, 4)],
      ovuMod: 0,
      period: 0,
      multEgg: 0,
      wombHealth: 0,
      iud: false,
      pregTerm: 34,
      fertility: 5,
      flagF: ["none"],
      quality: 18,
      ejac: 60,
      resMax: 188,
      reserve: 142,
      refract: 8,
      quantity: 28,
      surv: 5,
      flagM: ["none"],
    };
    npc.flags = {
      other: ["none"],
      knows: ["none"],
      rumor: ["none"],
      exes: ["none"],
      kids: 0,
      kidsPC: 0,
      toys: false,
      toysPublic: false,
      knowPCpreg: false,
      isFather: false,
      thinkFather: false,
      knowsAcidVag: true,
      openRship: false,
    };
    npc.info = {
      bodyGeneral: false,
      bodyJunk: false,
      bodyTits: false,
      bodyDetail: false,
      status: 3,
      fert: 1,
      trait: 3,
      kink: 2,
      mutate: false,
      core: 2,
      pref: 2,
      sched: true,
      bGround: 3,
    };
    return npc;
  },
};











