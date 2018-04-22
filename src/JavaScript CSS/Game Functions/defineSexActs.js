/*
███████╗███████╗██╗  ██╗ █████╗  ██████╗████████╗███████╗
██╔════╝██╔════╝╚██╗██╔╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝
███████╗█████╗   ╚███╔╝ ███████║██║        ██║   ███████╗
╚════██║██╔══╝   ██╔██╗ ██╔══██║██║        ██║   ╚════██║
███████║███████╗██╔╝ ██╗██║  ██║╚██████╗   ██║   ███████║
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝

Variables used to define SexAct class object
    name; //pretty name of act
    key; //letiable key name
    effect = { //object with effects that are interpreted by control
    arousal: [20,0], //strength of action to increase arousal [pc,npc]
    wetness: [0,20], //strength of action to increase wetness [pc,npc]
    satisfy: [0,0], //modifier to satisfaction gain from orgasm this way. [pc,npc]
    cumDest: "default", //can override cum destination from position.
    strong: ["none"], //list of traits/kinks that enhance effect
    strongNPC: ["none"], //list of traits/kinks that enhance effect
    weak: ["none"], //list of traits/kinks that decrease effect
    weakNPC: ["none"], //list of traits/kinks that decrease effect
  };
    tags; //tags for the action
    cat; //category of sex act for tracking activities
    button; //button text
    hovname; //unique identifier for specific act
    hovtext; //description of action for hover text
    action; //function that mods letiables
    allowList; //list of relevant keys for content blocking
    req; //object containing tag requirements for action
      loc; //required location tags like furnature
      pos; //required position tags
      pcCanAccess; //required body access tags by pc hands to npc bodypart
      pcCanMouth; //required access by pc mouth to npc bodypart
      npcCanAccess; //required access ny npc to pc's bodypart
      npcCanMouth; //required access by npc mouth to pc's bodypart
    tab; //number, tab to be displayed on 1=touch, 2=kiss, 3=speak, 4=move, 5=kink, 6=other
  */
setup.defineSexActs = function () {
  /*define sexAct object only if undefined or not an object*/
  setup.sexActs = {};
  /*set up an object of subfunctions to define sex methods if undefined*/
  var funks = {};
  var cunt = true;
  /*==========Start defining SexActs==========*/
  funks.passKiss = function () {
    let sex = {
      name: "passionate kiss",
      key: "passKiss",
      tags: ["distracting"],
      cat: "kiss",
      button: "Kiss Passionately",
      hovtext: "Kiss the targeted person passionately",
      allowList: ["none"],
      tab: 2,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["lips"],
        npcCanAccess: ["none"],
        npcCanMouth: ["lips"],
      },
      effectPC: {
        strong: ["romantic"],
        vStrong: ["none"],
        weak: ["unromantic"],
        vWeak: ["none"],
        arousal: [1,7,"none"],
        wetness: [1,50,"none"],
        pleasure: [5,0.2,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["romantic"],
        vStrong: ["none"],
        weak: ["unromantic"],
        vWeak: ["none"],
        arousal: [1,7,"none"],
        wetness: [1,50,"none"],
        pleasure: [5,0.2,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.sensualKiss = function () {
    let sex = {
      name: "sensual kiss",
      key: "sensualKiss",
      tags: ["none"],
      cat: "kiss",
      button: "Sensual Kiss",
      hovtext: "Kiss your target slowly and sensually",
      allowList: ["none"],
      tab: 2,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["lips"],
        npcCanAccess: ["none"],
        npcCanMouth: ["lips"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,5,"none"],
        wetness: [1,50,"none"],
        pleasure: [5,0.2,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,5,"none"],
        wetness: [1,50,"none"],
        pleasure: [4,0.2,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.romanticKiss = function () {
    let sex = {
      name: "romantic kiss",
      key: "romanticKiss",
      tags: ["none"],
      cat: "kiss",
      button: "Romantic Kiss",
      hovtext: "Kiss your target with loving affection",
      allowList: ["none"],
      tab: 2,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["lips"],
        npcCanAccess: ["none"],
        npcCanMouth: ["lips"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,4,"none"],
        wetness: [1,50,"none"],
        pleasure: [3,0.2,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,4,"none"],
        wetness: [1,50,"none"],
        pleasure: [3,0.2,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.lickSomething = function () {
    let sex = {
      name: "lick something",
      key: "lickSomething",
      tags: ["none"],
      cat: "kiss",
      button: "Lick [placehold]",
      hovtext: "Lick your target's [placehold] and get a good taste",
      allowList: ["none"],
      tab: "lick",
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["none"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,8,"none"],
        wetness: [1,50,"none"],
        pleasure: [5,0.4,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,8,"none"],
        wetness: [1,50,"none"],
        pleasure: [15,0.7,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
        Dialog.close();
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockKiss = function () {
    let sex = {
      name: "kiss cock",
      key: "cockKiss",
      tags: ["none"],
      cat: "bj",
      button: "Kiss Cock",
      hovtext: "Shower your target's member with kisses",
      allowList: ["none"],
      tab: 2,
      cumdest: "face",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,7,"none"],
        wetness: [1,50,"none"],
        pleasure: [3,0.2,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,8,"none"],
        wetness: [1,50,"none"],
        pleasure: [10,0.8,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockSuckHead = function () {
    let sex = {
      name: "suck cock",
      key: "cockSuckHead",
      tags: ["none"],
      cat: "bj",
      button: "Suck Cockhead",
      hovtext: "Suck on your target's cockhead",
      allowList: ["none"],
      tab: 2,
      cumdest: "mouth",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,8,"none"],
        wetness: [5,100,"none"],
        pleasure: [8,0.7,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,8,"none"],
        wetness: [5,100,"none"],
        pleasure: [20,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockBobHead = function () {
    let sex = {
      name: "bob head on cock",
      key: "cockBobHead",
      tags: ["none"],
      cat: "bj",
      button: "Bob Head on Cock",
      hovtext: "Slide your target's cock in and out of your mouth",
      allowList: ["none"],
      tab: 2,
      cumdest: "mouth",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [7,100,"none"],
        pleasure: [8,0.8,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [8,100,"none"],
        pleasure: [40,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockSuck = function () {
    let sex = {
      name: "suck cock",
      key: "cockSuck",
      tags: ["none"],
      cat: "bj",
      button: "Suck Cock",
      hovtext: "Put your target's cock in your mouth and suck it like a popsickle",
      allowList: ["none"],
      tab: 2,
      cumdest: "mouth",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [7,100,"none"],
        pleasure: [8,0.8,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [8,100,"none"],
        pleasure: [35,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockDeepthroat = function () {
    let sex = {
      name: "deepthroat cock",
      key: "cockDeepthroat",
      tags: ["none"],
      cat: "bj",
      button: "Deepthroat Cock",
      hovtext: "Slide your target's cock as deep as you can into your mouth",
      allowList: ["none"],
      tab: 2,
      cumdest: "mouth",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [7,100,"none"],
        pleasure: [8,0.8,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [8,100,"none"],
        pleasure: [50,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockSuckBalls = function () {
    let sex = {
      name: "suck balls",
      key: "cockSuckBalls",
      tags: ["none"],
      cat: "bj",
      button: "Suck on Balls",
      hovtext: "Put your target's balls in your mouth and pleasure them",
      allowList: ["none"],
      tab: 2,
      cumdest: "mouth",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [7,100,"none"],
        pleasure: [8,0.8,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [10,100,"none"],
        pleasure: [25,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.hug = function () {
    let sex = {
      name: "hug",
      key: "hug",
      tags: ["none"],
      cat: "hug",
      button: "Hug",
      hovtext: "Give your target a hug",
      allowList: ["none"],
      tab: 4,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["none"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,4,"none"],
        wetness: [1,20,"none"],
        pleasure: [1,0.1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,4,"none"],
        wetness: [1,20,"none"],
        pleasure: [1,0.1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.grindCrotch = function () {
    let sex = {
      name: "grind crotch",
      key: "grindCrotch",
      tags: ["none"],
      cat: "hug",
      button: "Grind Crotch",
      hovtext: "Grind your crotch against the target",
      allowList: ["none"],
      tab: 4,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["none"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [7,100,"none"],
        pleasure: [30,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,6,"none"],
        wetness: [1,30,"none"],
        pleasure: [1,0.1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockStroke = function () {
    let sex = {
      name: "stroke cock",
      key: "cockStroke",
      tags: ["none"],
      cat: "handjob",
      button: "Stroke Cock",
      hovtext: "Slide your hand up and down your target's cock",
      allowList: ["none"],
      tab: 1,
      cumdest: "hand",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,8,"none"],
        wetness: [7,100,"none"],
        pleasure: [5,0.5,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [8,100,"none"],
        pleasure: [30,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cockHold = function () {
    let sex = {
      name: "hold cock",
      key: "cockHold",
      tags: ["none"],
      cat: "handjob",
      button: "Hold Cock",
      hovtext: "Take your target's cock in your hand and rub it gently",
      allowList: ["none"],
      tab: 1,
      cumdest: "hand",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [5,100,"none"],
        pleasure: [8,0.8,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [8,100,"none"],
        pleasure: [25,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.cupBalls = function () {
    let sex = {
      name: "cup balls",
      key: "cupBalls",
      tags: ["none"],
      cat: "handjob",
      button: "Cup Balls",
      hovtext: "Cup your target's balls in your hand and fondle them gently",
      allowList: ["none"],
      tab: 2,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [7,100,"none"],
        pleasure: [7,0.8,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,9,"none"],
        wetness: [10,100,"none"],
        pleasure: [30,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
        alert("Normally this action will encourage a larger ejaculation from the target!");
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.strokeVulva = function () {
    let sex = {
      name: "stroke vulva",
      key: "strokeVulva",
      tags: ["none"],
      cat: "mastur",
      button: "Stroke Vulva",
      hovtext: "Stroke your fingers up and down your slit",
      allowList: ["none"],
      tab: 1,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,10,"none"],
        wetness: [8,100,"none"],
        pleasure: [30,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,6,"none"],
        wetness: [3,100,"none"],
        pleasure: ["none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  funks.rubClit = function () {
    let sex = {
      name: "rub clit",
      key: "rubClit",
      tags: ["none"],
      cat: "mastur",
      button: "Rub Clit",
      hovtext: "Use your fingers to gently rub your clit",
      allowList: ["none"],
      tab: 1,
      cumdest: "default",
      kinks: ["none"],
      req: {
        loc: ["none"],
        pos: ["none"],
        pcCanAccess: ["none"],
        pcCanMouth: ["cock"],
        npcCanAccess: ["none"],
        npcCanMouth: ["none"],
      },
      effectPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,10,"none"],
        wetness: [8,100,"none"],
        pleasure: [80,1,"none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      effectNPC: {
        strong: ["none"],
        vStrong: ["none"],
        weak: ["none"],
        vWeak: ["none"],
        arousal: [1,6,"none"],
        wetness: [3,100,"none"],
        pleasure: ["none"],
        stretch: false,
        anger: false,
        stress: false,
        happy: false,
        pain: false,
        health: false,
        addict: false,
        drug: false,
        bc: false,
        fert: false,
      },
      action: function () {
        /*special ability of action programmed here*/
      },
    };
    sex.hovname = sex.key + "Hover";
    /*create the SexAct class object*/
    try {
      setup.sexActs[sex.key] = new SexAct(sex);
    } catch (e) {
      let msg = `Defining sexact ${sex.keyName} failed with error ${e.name}: ${e.message}.`;
      setup.alert(msg);
    }
  };
  /**************************************************************************/
  /*  End of def functions, now run them                                    */
  /**************************************************************************/
  let n = Object.keys(funks).length;
  for (let i = 0, k = Object.keys(funks); i < n; i++) {
    setTimeout(funks[k[i]]);
  }
  funks.timer = function(){
    cunt = false;
  };
  setTimeout(funks.timer(),250);
  while(cunt){}
};