
//   ██████╗  █████╗ ███╗   ███╗███████╗
//  ██╔════╝ ██╔══██╗████╗ ████║██╔════╝
//  ██║  ███╗███████║██╔████╔██║█████╗
//  ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝
//  ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
//   ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
//
//  ███████╗ █████╗ ██╗   ██╗███████╗███████╗
//  ██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝
//  ███████╗███████║██║   ██║█████╗  ███████╗
//  ╚════██║██╔══██║╚██╗ ██╔╝██╔══╝  ╚════██║
//  ███████║██║  ██║ ╚████╔╝ ███████╗███████║
//  ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝

/*************************************************************/
/* functions to save and recover game data                   */
/*************************************************************/

Config.saves.onSave = function(save): void {
  if (typeof ↂ.map.name !== "string" || ↂ.map.name === "none") {
    save.title = "Prologgin'";
  } else {
    save.title = ↂ.map.name;
  }
  if (save.metadata == null) {
    //aw.con.info("Hey, the save.metadata be empty yo!");
    save.metadata = {};
  }
  if (save.metadata.sleepAutosave != null && save.metadata.sleepAutosave) {
    aw.asbs = (save.metadata.asPassage == null) ? null : save.metadata.asPassage;
  }
  save.metadata.passage = JSON.stringify(aw.passage);
  save.metadata.time = aw.tVal;
  save.metadata.version = setup.ver;
  save.metadata.npcs = {};
  const keys = Object.keys(aw.npc);
  try {
    for (let i = 0, c = keys.length; i < c; i++) {
      save.metadata.npcs[keys[i]] = JSON.stringify(aw.npc[keys[i]], (key, value) => {
        if (key !== "parent" && typeof value !== "function") {
          return value;
        }
      });
    }
  } catch (e) {
    aw.con.warn(`SAVE ERROR! NPC save loop. ${e.name}: ${e.message}`);
    alert(`Warning: The game did not save correctly! Please try saving again from another area. If you still have problems, please report this error: NPC stringify - ${aw.passage.title} - ${e.name}: ${e.message}.`);
  }
  save.metadata.npcDatas = JSON.stringify(setup.npc);
  save.metadata.ↂ = {
    job: JSON.stringify(ↂ.job),
    sched: JSON.stringify(ↂ.sched),
    plans: JSON.stringify(ↂ.plans),
    home: JSON.stringify(ↂ.home),
    flag: JSON.stringify(ↂ.flag),
    pc: "",
    skill: JSON.stringify(ↂ.skill),
    makeup: JSON.stringify(ↂ.makeup),
    makeupSet: JSON.stringify(ↂ.makeupSet),
    hairStyle: JSON.stringify(ↂ.hairStyle),
    ward: JSON.stringify(ↂ.ward),
    storeInv: JSON.stringify(ↂ.storeInv),
    homeOptions: JSON.stringify(ↂ.homeOptions),
    pcHistory: "",
    sex: JSON.stringify(ↂ.sex),
    map: JSON.stringify(ↂ.map),
    pref: JSON.stringify(ↂ.pref),
    cTag: JSON.stringify(aw.cTag),
    child: JSON.stringify(ↂ.child),
    toys: JSON.stringify(ↂ.toys),
    buttons: [],
    parse: JSON.stringify(setup.parse),
  };
  save.metadata.tempy = JSON.stringify(State.temporary);
  const bID = Object.keys(ↂ.buttons);
  if (bID.length > 0) {
    for (const id of bID) {
      save.metadata.ↂ.buttons.push(JSON.stringify(ↂ.buttons[id]));
    }
  }
  try {
    save.metadata.ↂ.pc = JSON.stringify(ↂ.pc, (key, value) => {
      if (key !== "parent" && typeof value !== "function") {
        return value;
      }
    });
  } catch (e) {
    aw.con.warn(`SAVE ERROR! PC Data. ${e.name}: ${e.message}`);
    alert(`Warning: The game did not save correctly! Please try saving again from another area. If you still have problems, please report this error: PC data stringify - ${aw.passage.title} - ${e.name}: ${e.message}.`);
  }
  try {
    save.metadata.ↂ.pcHistory = JSON.stringify(ↂ.pcHistory, (key, value) => {
      if (key !== "parent" && typeof value !== "function") {
        return value;
      }
    });
  } catch (e) {
    aw.con.warn(`SAVE ERROR! PC History Data. ${e.name}: ${e.message}`);
    alert(`Warning: The game did not save correctly! Please try saving again from another area. If you still have problems, please report this error: PC History data stringify - ${aw.passage.title} - ${e.name}: ${e.message}.`);
  }
  save.metadata.fakeNPCs = JSON.stringify(aw.fakeNPC);
  save.metadata.statusInfo1 = JSON.stringify(aw.stsCalculus);
  save.metadata.omni = clone(setup.omni.stringify());
  save.metadata.omniValue = setup.omni.value;
  // aw.con.info(save.metadata.omni);
  save.metadata.clothing = setup.clothes.gameSave();
  save.metadata.shopInv = JSON.stringify(setup.shopInv);
  save.metadata.outfits = JSON.stringify(setup.outfits);
  save.metadata.interact = setup.interact.gameSave();
  save.metadata.scenario = setup.scenario.gameSave();
  save.metadata.npcTemplate = JSON.stringify(aw.npcTemplate);
  save.metadata.wxSeed = JSON.stringify(setup.weather.seed);
  // aw.con.obj(save.metadata, "METADATA from saving the game!");


};


Config.saves.onLoad = function(save) {
  // need to kill any existing interact/scenario/menu windows
  aw.replace("#awUIcontainer", "");
  aw.replace("#interactContainer", "");
  aw.replace("#scenarioContainer", "");
  /*if (save.metadata.sleepAutosave != null) {
    aw.con.info(`found the sleep return passage: ${save.metadata.passover}.`);
    setup.startsPassage = save.metadata.passover;
  }*/
  // const list = save.metadata.list;
  if (State.active.variables.ver < 340 || setup.ver - State.active.variables.ver > 12) {
    const content = `<div id='menuBlackout'></div><div id="backwardCunt"><h2>Game Save Invalid</h2><p>Sorry, it seems that you have tried to load a save from before version 0.34.0. Saves prior to version 0.34.0 are not supported. I'm sorry for the inconvenience, but you should still be able to use that save in an older version of the game if you are attached to it.</p><center><<button "TO START PAGE">><<goto "Start">><<script>>aw.replace("#awUIcontainer", "");<</script>><</button>></center></div>`;
    aw.replace("#awUIcontainer", content);
    return false;
  } else if ((setup.ver > State.active.variables.ver || setup.ver > save.metadata.version ) && save.metadata.AShole != null) {
    const content = `<div id='menuBlackout'></div><div id="backwardCunt"><h2>Game Save Invalid</h2><p>Sorry, it seems that you have tried to load an autosave from a previous version. Autosaves are only supported for the game version they are created in. I'm sorry for the inconvenience, but you should still be able to use that save in its version of the game, and then create a normal save after loading it. That normal save can probably be converted.</p><center><<button "TO START PAGE">><<goto "Start">><<script>>aw.replace("#awUIcontainer", "");<</script>><</button>></center></div>`;
    aw.replace("#awUIcontainer", content);
    return false;
  } else if (save.metadata.version == null || setup.ver > State.active.variables.ver || setup.ver > save.metadata.version) {
    // tslint:disable-next-line:max-line-length
    const content = `<div id='menuBlackout'></div><div id="backwardCunt"><h1>Auto Backward Compatibility</h1><p>The game has detected that the save you just clicked to load is from a previous version of the game. The backward compatibility system is currently loading data from your save into the current game format. You should see the results appear below momentarily (if they haven't already).</p><p><b>HOW IT WORKS:</b> When your save is missing variables found in the new version, or if some data format is incompatible, default values for the current version will be used. This may result in minor changes to the game compared to the version your save is from. <span class="import"><b>This system isn't foolproof, however, so if you notice bugs after loading a save, please check to see if they appear in a normal game before reporting them.</b></span> (This helps differentiate between an issue with this compatibility system, or an issue with the game code.)</p><p><b>COLOR KEY:</b> A color key is used to relate how significant alerts about your save file are. As expected: <span style="color: #f46741;">red is bad</span>, <span style="color: #f4a641;">orange isn't good</span>, and <span style="color: #f4dc41;">yellow is probably okay</span>. Note that except in the case of red, defaults will have been used, and the game should be playable.</p><h3>LOAD RESULTS</h3><p id="backCuntOut"></p></div>`;
    aw.replace("#awUIcontainer", content);
    //setTimeout(() => setup.backward.main(save.metadata), 200);
    return setup.backward.main(save.metadata);
  } else {
    const keys = Object.keys(save.metadata.npcs);
    // setup.NPCStoreList = [];
    // for (let i = 0, c = keys.length; i < c; i++) {
    //   ck = setup.AW.localStore(keys[i], save.metadata.npcs[keys[i]]);
    //   if (!ck) {
    //     const msg = "error storing saved NPC data: " + keys[i];
    //     console.log(msg);
    //     window.alert(msg);
    //   } else {
    //     setup.NPCStoreList.push(keys[i]);
    //   }
    // }
    aw.tVal = save.metadata.time;
    for (let i = 0, c = keys.length; i < c; i++) {
      aw.npc[keys[i]] = new NPC(JSON.parse(save.metadata.npcs[keys[i]]));
    }
    try {
      const npcLoad = JSON.parse(save.metadata.npcDatas);
      const fixed = clone(setup.npc.fixedIDs);
      setup.npc = {
        fixedIDs: clone(fixed),
        ready: (npcLoad.ready != null) ? clone(npcLoad.ready) : [],
        stored: (npcLoad.stored != null) ? clone(npcLoad.stored) : [],
        single: (npcLoad.single != null) ? clone(npcLoad.single) : [],
        rShip: (npcLoad.rShip != null) ? clone(npcLoad.rShip) : [],
        married: (npcLoad.married != null) ? clone(npcLoad.married) : [],
        male: (npcLoad.male != null) ? clone(npcLoad.male) : [],
        female: (npcLoad.female != null) ? clone(npcLoad.female) : [],
        futa: (npcLoad.futa != null) ? clone(npcLoad.futa) : [],
        age13to17: (npcLoad.age13to17 != null) ? clone(npcLoad.age13to17) : [],
        age18to21: (npcLoad.age18to21 != null) ? clone(npcLoad.age18to21) : [],
        age22to27: (npcLoad.age22to27 != null) ? clone(npcLoad.age22to27) : [],
        age28to33: (npcLoad.age28to33 != null) ? clone(npcLoad.age28to33) : [],
        age34to39: (npcLoad.age34to39 != null) ? clone(npcLoad.age34to39) : [],
        age40to49: (npcLoad.age40to49 != null) ? clone(npcLoad.age40to49) : [],
        age50to59: (npcLoad.age50to59 != null) ? clone(npcLoad.age50to59) : [],
        age60plus: (npcLoad.age60plus != null) ? clone(npcLoad.age60plus) : [],
        poor: (npcLoad.poor != null) ? clone(npcLoad.poor) : [],
        middle: (npcLoad.middle != null) ? clone(npcLoad.middle) : [],
        wealthy: (npcLoad.wealthy != null) ? clone(npcLoad.wealthy) : [],
        education: {
          dropout: (npcLoad.dropout != null) ? clone(npcLoad.dropout) : [],
          hschool: (npcLoad.hschool != null) ? clone(npcLoad.hschool) : [],
          assoc: (npcLoad.assoc != null) ? clone(npcLoad.assoc) : [],
          bach: (npcLoad.bach != null) ? clone(npcLoad.bach) : [],
          master: (npcLoad.master != null) ? clone(npcLoad.master) : [],
          doctor: (npcLoad.doctor != null) ? clone(npcLoad.doctor) : [],
        },
        friends: (npcLoad.friends != null) ? clone(npcLoad.friends) : [],
        bff: (npcLoad.bff != null) ? clone(npcLoad.bff) : [],
        acquainted: (npcLoad.acquainted != null) ? clone(npcLoad.acquainted) : [],
        lover: (npcLoad.lover != null) ? clone(npcLoad.lover) : [],
        interested: (npcLoad.interested != null) ? clone(npcLoad.interested) : [],
        fling: (npcLoad.fling != null) ? clone(npcLoad.fling) : [],
        exes: (npcLoad.exes != null) ? clone(npcLoad.exes) : [],
        enemies: (npcLoad.enemies != null) ? clone(npcLoad.enemies) : [],
      };
    } catch (e) { window.alert("Warning! Failed to properly load NPC metadata!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.job = JSON.parse(save.metadata.ↂ.job);
    } catch (e) { window.alert("Warning! Failed to properly load job data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.sched = JSON.parse(save.metadata.ↂ.sched);
    } catch (e) { window.alert("Warning! Failed to properly load schedule data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.plans = JSON.parse(save.metadata.ↂ.plans);
    } catch (e) { window.alert("Warning! Failed to properly load schedule metadata!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.home = JSON.parse(save.metadata.ↂ.home);
    } catch (e) { window.alert("Warning! Failed to properly load home data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.flag = JSON.parse(save.metadata.ↂ.flag);
    } catch (e) { window.alert("Warning! Failed to properly load flag data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.pc = new PC(JSON.parse(save.metadata.ↂ.pc));
    } catch (e) { window.alert("Warning! Failed to properly load pc data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.skill = new Skills(JSON.parse(save.metadata.ↂ.skill));
    } catch (e) { window.alert("Warning! Failed to properly load skill data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.makeup = JSON.parse(save.metadata.ↂ.makeup);
    } catch (e) { window.alert("Warning! Failed to properly load makeup data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.makeupSet = JSON.parse(save.metadata.ↂ.makeupSet);
    } catch (e) { window.alert("Warning! Failed to properly load makeup metadata!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.hairStyle = JSON.parse(save.metadata.ↂ.hairStyle);
    } catch (e) { window.alert("Warning! Failed to properly load hair data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.ward = JSON.parse(save.metadata.ↂ.ward);
    } catch (e) { window.alert("Warning! Failed to properly load wardrobe data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.storeInv = JSON.parse(save.metadata.ↂ.storeInv);
    } catch (e) { window.alert("Warning! Failed to properly load store data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.homeOptions = JSON.parse(save.metadata.ↂ.homeOptions);
    } catch (e) { window.alert("Warning! Failed to properly load home metadata!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.toys = JSON.parse(save.metadata.ↂ.toys);
    } catch (e) { /*window.alert("Warning! Failed to properly load toys metadata!");*/ console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      if (save.metadata.ↂ.pcHistory != null) {
        ↂ.pcHistory = JSON.parse(save.metadata.ↂ.pcHistory);
      } else {
        // tslint:disable-next-line:max-line-length
        console.log("No PC metadata found in the save. This is normal for saves from the early prologue. If this message appears for saves after the prologue is over, it is an error!");
      }
    } catch (e) { window.alert("Warning! Failed to properly load pc metadata!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.sex = JSON.parse(save.metadata.ↂ.sex);
    } catch (e) { window.alert("Warning! Failed to properly load sex data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.map = new MapClass(JSON.parse(save.metadata.ↂ.map));
    } catch (e) { window.alert("Warning! Failed to properly load map data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      const temps = JSON.parse(save.metadata.tempy);
      const ks = Object.keys(temps);
      for (let i = 0, c = ks.length; i < c; i++){
        State.temporary[ks[i]] = temps[ks[i]];
      }
      console.log(`Successfully loaded ${ks.length} temporary state properties.`);
    } catch (e) {
      window.alert(`Caution: Failed to properly load state temporary variables. The game will probably still work okay, but there may be minor errors that appear temporarily. Error: ${e.name}`);
      console.log(`Error Loading Temporary ${e.name}: ${e.message}.`);
    }
    try {
      ↂ.buttons = {};
      if (save.metadata.ↂ.buttons.length > 0) {
        for (const butt of save.metadata.ↂ.buttons) {
          const b = JSON.parse(butt);
          ↂ.buttons[b.id] = new CAB(b);
        }
      }
    } catch (e) {
      window.alert("Warning! Failed to properly load Custom Action Buttons!");
      console.log(`Failed loading custom action buttons from save - ${e.name}: ${e.message}`);
    }
    try {
      ↂ.pref = JSON.parse(save.metadata.ↂ.pref);
    } catch (e) { window.alert("Warning! Failed to properly load preference data!"); console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      aw.cTag = JSON.parse(save.metadata.ↂ.cTag);
    } catch (e) {
      setup.cTag.build(true);
      aw.con.info("Could not restore cTag info. rebuilt instead.");
    }
    try {
      ↂ.child = [];
      if (save.metadata.ↂ.child != null) {
        let childs = JSON.parse(save.metadata.ↂ.child);
        for (const c of childs) {
          ↂ.child.push(new Child(c));
        }
        childs = null;
      } else {
        aw.con.info(`No child data present for ↂ.child`);
      }
    } catch (e) {
      aw.con.warn(`ERROR Restoring Child Data. ${e.name}: ${e.message}`);
    }
    try {
      if (save.metadata.ↂ.parse != null) {
        setup.parse = JSON.parse(save.metadata.ↂ.parse);
      }
    } catch (e) {
      aw.con.warn(`ERROR restoring setup.parse values. ${e.name}: ${e.message}`);
    }
    if (save.metadata.omniValue != null) {
      setup.omni.value = save.metadata.omniValue;
    } else {
      setup.omni.value = State.active.variables.tVal - 110880;
    }
    const result = setup.omni.omniRestore(save.metadata.omni);
    if (result !== "success") {
      window.alert(result); console.log(result);
    }

    if (setup.clothes.dress === null || setup.clothes.dress === undefined) {
      setup.clothes.defineObjects(); // load object methods
    }
    try {
      setup.clothes.gameLoad(save.metadata.clothing);
    } catch (e) {
      window.alert(`setup.clothes.gameLoad failed with error ${e.name}: ${e.message}`);
    }
    try {
      setup.outfits = JSON.parse(save.metadata.outfits);
    } catch (e) {
      window.alert(`setup.outfits JSON parse failed with error ${e.name}: ${e.message}`);
    }
    try {
      const fakes = JSON.parse(save.metadata.fakeNPCs);
      const fKeys = Object.keys(fakes);
      for (let i = 0, c = fKeys.length; i < c; i++) {
        aw.fakeNPC[fKeys[i]] = new FakeNPC(fakes[fKeys[i]]);
      }
    } catch (e) {
      aw.con.info(`Didn't Load fake NPCS, generating new ones now.`);
      setup.fakeNPC.fillTo();
    }
    Dialog.close();
    window.setTimeout(function() {
      setup.clothes.referenceRebuild();
    }, 100); // restore clothing object references
    try {
      setup.shopInv = JSON.parse(save.metadata.shopInv);
    } catch (e) {
      window.alert(`setup.outfits JSON parse failed with error ${e.name}: ${e.message}`);
    }
    if (save.metadata.interact != null) {
      setup.interact.gameLoad(save.metadata.interact);
    } else {
      aw.con.info("No Interact data to load.");
    }
    if (save.metadata.scenario != null) {
      setup.scenario.gameLoad(save.metadata.scenario);
    } else {
      aw.con.info("no scenario data to load.");
    }
    try {
      aw.npcTemplate = JSON.parse(save.metadata.npcTemplate);
    } catch (e) {
      aw.con.info("failed to parse aw.npcTemplate");
    }
    aw.stsCalculus = JSON.parse(save.metadata.statusInfo1);
    setup.weather.seed = JSON.parse(save.metadata.wxSeed);
    aw.passage = JSON.parse(save.metadata.passage);
    const pasg = aw.passage.title;
    aw.sleep = {
      passedOut: false,
      passedOutType: "none",
    } as awSleep;
    if (ↂ.map != null && ↂ.map.loc != null) {
      if (typeof ↂ.map.loc[2] !== "string") {
        setup.map.nav(ↂ.map.loc[0], ↂ.map.loc[1]);
      } else {
        setup.map.nav(ↂ.map.loc[0], ↂ.map.loc[1], ↂ.map.loc[2]);
      }
    }
    Dialog.close();
    setup.cTag.build(true);
    const outie = `<center><h3>Your save has been loaded!</h3><<scri` + `pt>>if (State.active.variables.pref.sound == null) {
      State.active.variables.pref.sound = {
        on: true,
        volume: 0.5,
        track: "utopia",
        paused: false,
        mute: false,
      };
    }<</scr` + `ipt>><<button "CONTINUE">><<setPCportrait>><<if $pref.sound.on>><<if $pref.sound.track === "utopia">><<playlist "bgm_utopia" loop volume $pref.sound.volume play>><</if>><</if>><<run Dialog.close()>><</button>></center>`;
    setup.dialog("Save Loaded", outie);
    // setTimeout(() => Engine.play(pasg), 100);
    // aw.L();
    State.active.variables.lastSaveTime = clone(aw.time);
    aw.S();
    return pasg;
  }
};

