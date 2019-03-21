/*
*  888888b.                     888                                         888
*  888  "88b                    888                                         888
*  888  .88P                    888                                         888
*  8888888K.   8888b.   .d8888b 888  888 888  888  888  8888b.  888d888 .d88888
*  888  "Y88b     "88b d88P"    888 .88P 888  888  888     "88b 888P"  d88" 888
*  888    888 .d888888 888      888888K  888  888  888 .d888888 888    888  888
*  888   d88P 888  888 Y88b.    888 "88b Y88b 888 d88P 888  888 888    Y88b 888
*  8888888P"  "Y888888  "Y8888P 888  888  "Y8888888P"  "Y888888 888     "Y88888
*
*   .d8888b.                                           888
*  d88P  Y88b                                          888
*  888    888                                          888
*  888         .d88b.  88888b.d88b.  88888b.   8888b.  888888
*  888        d88""88b 888 "888 "88b 888 "88b     "88b 888
*  888    888 888  888 888  888  888 888  888 .d888888 888
*  Y88b  d88P Y88..88P 888  888  888 888 d88P 888  888 Y88b.
*   "Y8888P"   "Y88P"  888  888  888 88888P"  "Y888888  "Y888
*                                    888
*                                    888
*                                    888
*
*  BECAUSE WTF AM I DOING?
*/

interface setupBackward {
  loader: (target: string[], data: object) => string;
  outputFormat: (alerts: string[]) => string;
  main: (save: object) => void;
  go: () => void;
}

setup.backward = {
  main(save: any): void {
    let output: string = "<<include [[Consumables]]>><table id='invisTable'><tr><td style='width:50%;'>";
    try {
      //initialise Consumables code
      const tempFuta = clone(State.variables.cInv);
      new Wikifier(null, '<<include [[Consumables]]>>');
      // collect all consumables player have with count
      for (let index = 0; index < tempFuta.all.length; index++) {
        if (State.variables.cInv[tempFuta.all[index]].amt !== 0) {
          new Wikifier(null, `<<addconsumable "${tempFuta.all[index]}" ${tempFuta[tempFuta.all[index]].amt}>>`);
        }
      }
      aw.con.info(`finished loading and adding consumables.`);
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load consumables!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`);
    }
    const keys = Object.keys(save.npcs);
    for (let i = 0, c = keys.length; i < c; i++) {
      try {
        aw.npc[keys[i]] = new NPC(JSON.parse(save.npcs[keys[i]]));
      } catch (e) {
        output += "<span style='color: #f4a641;'>Failed to load NPC ${keys[i]}</span><br>";
        console.log(`PCLoadletter ${e.name}: ${e.message}.`);
      }
    }
    if (save.version < 180) {
      for (const id of Object.keys(aw.npc)) {
        const deets = setup.calculateNPCATR(aw.npc[id].main, aw.npc[id].body, aw.npc[id].fert, aw.npc[id].trait, aw.npc[id].status, aw.npc[id].mutate);
        aw.npc[id].body.ATR = deets[0];
        aw.npc[id].body.topATR = deets[1];
        aw.npc[id].body.botATR = deets[2];
      }
      aw.con.info(`finished re-calculating npc physical atr values.`);
    }
    if (save.version < 185) {
      // some placeholders in case something calls for time before omni is loaded
      State.active.variables.midnight = 0;
      aw.tVal = 130260;
    } else {
      aw.tVal = save.time;
    }
    try {
      const npcLoad = JSON.parse(save.npcDatas);
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
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load NPC metadata!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "job"], JSON.parse(save.ↂ.job));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load job data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "sched"], JSON.parse(save.ↂ.sched));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load schedule data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "plans"], JSON.parse(save.ↂ.plans));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load schedule metadata!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "home"], JSON.parse(save.ↂ.home));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load home data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "flag"], JSON.parse(save.ↂ.flag));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load flag data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    /*
      The important PC class. This is tricky, and changes will have to be handled in the class itself
    */
    try {
      ↂ.pc = new PC(JSON.parse(save.ↂ.pc));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load pc data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`);
    }
    // =====================
    try {
      ↂ.skill = new Skills(JSON.parse(save.ↂ.skill));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load skill data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "makeup"], JSON.parse(save.ↂ.makeup));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load makeup data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "makeupSet"], JSON.parse(save.ↂ.makeupSet));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load makeup metadata!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "hairStyle"], JSON.parse(save.ↂ.hairStyle));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load hair data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "ward"], JSON.parse(save.ↂ.ward));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load wardrobe data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    output += "</td><td>";
    try {
      output += setup.backward.loader(["ↂ", "storeInv"], JSON.parse(save.ↂ.storeInv));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load store data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "homeOptions"], JSON.parse(save.ↂ.homeOptions));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load home metadata!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "pcHistory"], JSON.parse(save.ↂ.pcHistory));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load pc metadata!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "sex"], JSON.parse(save.ↂ.sex));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load sex data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      ↂ.map = new MapClass(JSON.parse(save.ↂ.map));
      output += "Map data loaded successfully.<br>";
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load map data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    try {
      output += setup.backward.loader(["ↂ", "pref"], JSON.parse(save.ↂ.pref));
    } catch (e) {
      output += "<span style='color: #f46741;'>Warning! Failed to properly load preference data!</span><br>";
      console.log(`PCLoadletter ${e.name}: ${e.message}.`); }
    const result = setup.omni.omniRestore(save.omni);
    if (result !== "success") {
      output += "<span style='color: #f46741;'>" + result + "</span><br>";
      console.log(result);
    }
    if (save.omniValue != null) {
      setup.omni.value = save.omniValue;
    } else {
      setup.omni.value = State.active.variables.tVal - 110880 - 110880;
    }
    // SET PROPER TIME Based on now-loaded omni time;
    if (save.version < 185) {
      const tv = setup.omni.value + 110880;
      aw.time = tv;
      State.active.variables.midnight = setup.time.today() + 1440;
    }
    try {
      setup.clothes.gameLoad(save.clothing);
    } catch (e) {
      output += `<span style='color: #f4a641;'>setup.clothes.gameLoad failed with error ${e.name}: ${e.message}</span><br>`;
    }
    try {
      setup.outfits = JSON.parse(save.outfits);
    } catch (e) {
      output += `<span style='color: #f4a641;'>setup.outfits JSON parse failed with error ${e.name}: ${e.message}</span><br>`;
    }
    window.setTimeout(function() {
      setup.clothes.referenceRebuild();
    }, 200); // restore clothing object references
    try {
      setup.shopInv = JSON.parse(save.shopInv);
    } catch (e) {
      output += `<span style='color: #f4a641;'>store inventory JSON parse failed with error ${e.name}: ${e.message}</span><br>`;
    }
    try {
      aw.cTag = JSON.parse(save.ↂ.cTag);
    } catch (e) {
      setup.cTag.build(true);
      aw.con.info("Could not restore cTag info. rebuilt instead.");
      output += `<span style='color: #f4dc41;'>Conversation tags not available, rebuilt.</span><br>`;
    }
    try {
      const fakes = JSON.parse(save.fakeNPCs);
      const fKeys = Object.keys(fakes);
      for (let i = 0, c = fKeys.length; i < c; i++) {
        aw.fakeNPC[fKeys[i]] = new FakeNPC(fakes[fKeys[i]]);
      }
    } catch (e) {
      output += `<span style='color: #f4dc41;'>Couldn't Load fake NPCS, generating new ones now.</span><br>`;
      setup.fakeNPC.fillTo();
    }
    if (save.interact != null) {
      try {
      setup.interact.gameLoad(save.interact);
      } catch (e) {
        output += `<span style="color:#f4a641;">Interact data loading failed.</span><br>`;
      }
    } else {
      output += `<span style='color: #f4dc41;'>no interact data to load.</span><br>`;
    }
    if (save.scenario != null) {
      setup.scenario.gameLoad(save.scenario);
    } else {
      output += `<span style='color: #f4dc41;'>no scenario data to load.</span><br>`;
    }
    aw.stsCalculus = JSON.parse(save.statusInfo1);
    setup.weather.seed = JSON.parse(save.wxSeed);
    if (State.active.variables.pref.autoSave == null) {
      State.active.variables.pref.autoSave = true;
    }
    aw.passage = JSON.parse(save.passage);
    output += `<<include [[DEFsemiNPC-Prologue]]>><<button "CONTINUE">><<run setup.backward.go()>><<run $("#awUIcontainer").empty()>><</button>>`;
    output += "</td></tr></table>";
    if (State.active.variables.pref.autoSave == null) {
      State.active.variables.pref.autoSave = true;
    }
    if (State.active.variables.pref.miscarriage == null) {
      State.active.variables.pref.miscarriage = true;
    }
    // RANDOMS GO HERE!
    if (save.version < 186 && ↂ.pc.groom.hairSets.normal != null) {
      ↂ.pc.groom.hairSets.standard = ↂ.pc.groom.hairSets.normal;
      delete ↂ.pc.groom.hairSets.normal;
    }
    aw.append("#backCuntOut", output);
  },
  // loads input object into supplied destination without completely
  // overwriting objects, allowing new variables since the previous version
  // to remain at their default values. Also checks against datatype and
  // prefers the default type. Such a game should work, but may lose certain
  // saved information.
  loader(target: string[], data: object): string {
    // set the destination reference;
    let dest = target[0];
    for (let i = 1, c = target.length; i < c; i++) {
      dest = dest[target[i]];
    }
    // var to store unusual occurrences to report, like no default
    const alerts = [`iLoading save object ${target[(target.length - 1)]}:`];
    // create a subfunction for recursion in object tree
    function load(dest: object, data: object) {
      const keys = Object.keys(data);
      let i = 0;
      for (const c = keys.length; i < c; i++) {
        if (dest[keys[i]] === null || dest[keys[i]] === undefined) {
          alerts.push(`1◌ The destination for save item ${keys[i]} is no longer in use, save item copied.`);
          dest[keys[i]] = clone(data[keys[i]]);
        } else if (Array.isArray(data[keys[i]])) {
          if (Array.isArray(dest[keys[i]])) {
            dest[keys[i]] = clone(data[keys[i]]);
          } else {
            alerts.push(`3◌ save object ${keys[i]} is an array, but dest is not. Using Default Values.`);
          }
        } else if (Array.isArray(dest[keys[i]])) {
          alerts.push(`3◌ save item ${keys[i]} is not an array (${typeof data[keys[i]]}), but the destination is an Array. Using Default Values.`);
          /* if (typeof data[keys[i]] === "object") {
            dest[keys[i]] = clone(data[keys[i]]);
          } else {
            dest[keys[i]] = data[keys[i]];
          }*/
        } else if (typeof dest[keys[i]] === "object") {
          if (typeof data[keys[i]] === "object") {
            try {
              load(dest[keys[i]], data[keys[i]]);
            } catch (e) {
              alerts.push(`1◌ Failure loading object "${data[keys[i]]}" with error ${e.name}: ${e.message}! Default may be corrupted!`);
            }
          } else {
            alerts.push(`2◌ Destination ${dest[keys[i]]} expecting an object, but save item is a ${typeof data[keys[i]]}. Using Default Values.`);
          }
        } else if (typeof data[keys[i]] === "object") {
          alerts.push(`2◌ Destination ${keys[i]} is an object, but the save item is a ${typeof data[keys[i]]}. Using Default Values.`);
        } else {
          dest[keys[i]] = data[keys[i]];
        }
      }
      alerts.push(`iHandled ${i} items!`);
    }
    return setup.backward.outputFormat(alerts);
  },
  // format an array of alert/status messages from BC, with coded color
  outputFormat(alerts: string[]): string {
    let output = "";
    for (let i = 0, c = alerts.length; i < c; i++) {
      const code: string = alerts[i].slice(0, 1);
      let prefix: string;
      switch (code) {
        case "1":
          prefix = "<span style='color: #f46741;'>";
          break;
        case "2":
          prefix = "<span style='color: #f4a641;'>";
          break;
        case "3":
          prefix = "<span style='color: #f4dc41;'>";
          break;
        default:
          prefix = "<span style='color: #41f470;'>";
          break;
      }
      output += `${prefix}${alerts[i].slice(1)}</span><br>`;
    }
    output += "<br>";
    return output;
  },
  go(): void {
    const pasg = aw.passage.title;
    Engine.show();
    if (ↂ.map != null && ↂ.map.loc != null) {
      aw.con.info(`Map information: Main: ${ↂ.map.loc[0]}, Secondary: ${ ↂ.map.loc[0] }`);
      if (typeof ↂ.map.loc[2] !== "string") {
        setup.map.nav(ↂ.map.loc[0], ↂ.map.loc[1]);
      } else {
        setup.map.nav(ↂ.map.loc[0], ↂ.map.loc[1], ↂ.map.loc[2]);
      }
    }
    setTimeout(() => Engine.play(pasg), 100);
    //Engine.show();
  },
} as setupBackward;

Macro.add("cInit", {
  handler(){
    if (setup.swimmer && State.active.variables.pub) {
      const out = Engine.setSeed("weatherInit");
      return new Wikifier(this.output, out);
    }
  },
});
Macro.add("cVar", {
  handler() {
    if (setup.swimmer && State.active.variables.pub) {
      const out = Engine.setSeed("cloudVar");
      return new Wikifier(this.output, out);
    }
  },
});
Macro.add("cDisp", {
  handler() {
    if (setup.swimmer && State.active.variables.pub) {
      const out = Engine.setSeed("rainSeed");
      return new Wikifier(this.output, out);
    }
  },
});

/*
span.bc3 {
  color: #f4dc41;
}

span.bc2 {
  color: #f4a641;
}

span.bc1 {
  color: #f46741;
}

span.bcI {
  color: #41f470;
}
*/

