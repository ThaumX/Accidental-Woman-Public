/*
███████╗██╗     ███████╗███████╗██████╗
██╔════╝██║     ██╔════╝██╔════╝██╔══██╗
███████╗██║     █████╗  █████╗  ██████╔╝
╚════██║██║     ██╔══╝  ██╔══╝  ██╔═══╝
███████║███████╗███████╗███████╗██║
╚══════╝╚══════╝╚══════╝╚══════╝╚═╝

TODO prevent sleeping more than once per day!
*/


interface setupSleep {
  bar: (t: number) => void;
  go: (passage?: string) => void;
  advance: (passage?: string | false) => void;
  bedtime: (passage?: string) => void;
  start: (passage?: string) => void;
  setWakeTime: () => void;
  dream: () => string;
  passedOutDream: () => string;
  sleepProc: () => void;
  sleepProcPassOut: () => void;
  print: (content) => void;
  wakingUp: () => void;
  startNap: () => void;
  npcStart: () => void;
  sleepTime: () => void;
  getMissed: () => number;
  loneliness: () => void;
  sleepIn: () => boolean;
  sleepTotal: () => boolean;
  status: () => void;
  groomItems: () => void;
  environmentEffect: () => void;
  goddessCheck: () => void;
  nap: (min: number) => void;
  morningText: (wu: string) => string;
}

interface awSleep {
  startTime: number;
  startDate: date;
  social: number;
  missed: number;
  earlyWakeMins: number;
  minsToWake: number;
  totalmins: number;
  extramins: number;
  sleepIn: boolean;
  timeUntilWork: number;
  slpMsg: string[];
  startLoc: [string, string, string | boolean];
  passedOut: boolean;
  passedOutType: string;
}


setup.sleep = {
  // adds to the jQueryUI progress bar
  bar(t: number = 5): void {
    setup.pBar.add("#skypbar", t);
  },
  // check if it's safe to sleep, and generally start sleep.
  // USE THIS FUNCTION to start sleep unless you need to skip the autosave.
  go(passage): void {
    const diff = setup.time.midnight - aw.time;
    if (diff > 240) { // too early to sleep, idiot!
      let text: string = "";
      // we must forward passage var if it exists
      if (passage != null && typeof passage === "string") {
        text += `<<set _psg = "${passage}">>`;
      } else {
        text += "<<set _psg = false>>";
      }
      text += "<<include [[SleepRestless]]>>";
      setup.dialog("Restless Sleep", text);
      // spend time for nap
      setup.time.add(random(30, 40));
      // give bonus to fatigue and energy for the nap
      ↂ.pc.status.fatigue -= 1;
      setup.status.record("fatigue", -1, "Taking a nap");
      ↂ.pc.status.energy.amt += 1;
      aw.S();
    } else { // run the sleep, yo
      if (State.active.variables.pref.autoSave && State.active.variables.lastSaveTime !== aw.time) {
      aw.replace("#awUIcontainer", `<div id="autosavePic"></div>`);
      }
      setTimeout(function() {
        setup.sleep.bedtime(passage);
      }, 50);
    }
  },
  // advances time to appropriate sleep time and then starts sleep.
  advance(passage): void {
    const diff = (setup.time.midnight - aw.time) - 240;
    if (diff > 0) {
      setup.time.add(diff); // forward to 20:00
      // reduce fatigue further for forced rest - in case of fatigue overload situation
      ↂ.pc.status.fatigue -= Math.floor(diff / 60); // 1 per full hour
      setup.status.record("fatigue", Math.floor(diff / 60), "Resting before going to sleep");
      aw.S();
    }
    if (passage) {
      setup.sleep.bedtime(passage);
    } else {
      setup.sleep.bedtime();
    }
  },
  // just autosaves the game before sleep.
  bedtime(passage): void {
    if (State.active.variables.pref.autoSave && State.active.variables.lastSaveTime !== aw.time) {
      let labe = setup.time.dayName(State.active.variables.date[0]) + " Evening, ";
      labe += (State.active.variables.date[0] + (State.active.variables.date[1] * 7));
      labe += "-" + State.active.variables.date[2] + "-" + State.active.variables.date[3];
      try { // why besty... , { sleepAutosave: labe, passover: setup.startsPassage}
        Save.autosave.save(labe);
      } catch (e) {
        aw.con.warn(`Autosave failed with error - ${e.name}: ${e.message}`);
        UI.alert(`It seems like the autosave function failed due to an ${e.name} error. We're working on the issue, but for now you can turn off autosaves in the game settings menu.`);
      }
    }
    setTimeout(function() {
      aw.replace("#awUIcontainer", ` `);
      setup.sleep.start(passage);
    }, 1000);
  },
  // starts the sleeping process
  start(passage): void {
    // chintzy code to reset prologue flags
    ↂ.flag.Prologue = false;
    ↂ.flag.prologueSunday = false;
    
    // end chintzy code
    setup.sleep.setWakeTime();
    setup.escape.sit = "sleep";
    const ᛔ = State.active.variables;
    if (Dialog.isOpen()) {
      Dialog.close();
    }
    if (setup.interact.isOpen()) {
      setup.interact.kill();
    }
    if (setup.scenario.isOpen()) {
      setup.scenario.close();
    }
    setup.eventAllowed = false;
    aw.sleep = {} as awSleep;
    aw.sleep.startTime = aw.time;
    aw.sleep.startDate = [aw.timeArray[2], aw.timeArray[3], aw.timeArray[4], aw.timeArray[5]];
    aw.sleep.passedOut = false;
    ↂ.flag.sleepfailwarn = false;
    if (passage === "PassedOut") {
      aw.con.warn("PLAYER PASSED OUT AND WAS FORCED INTO SLEEP");
      setup.startsPassage = aw.passage.title;
      aw.sleep.passedOut = true;
    } else if (passage !== null && passage !== undefined) {
      setup.startsPassage  = passage;
    } else {
      setup.startsPassage = aw.passage.title;
    }
    aw.sleep.startLoc = [ↂ.map.loc[0], ↂ.map.loc[1], (ↂ.map.loc[2] == null) ? "main" : ↂ.map.loc[2]];
    aw.L();
    setup.dirtyHome();
    // ↂ.pc.status.sleep = true;
    // ᛔ.showMenuButton = false;
    aw.S();
    Engine.play("SleepStart", false);
    setTimeout(function() {
      setup.sleep.npcStart();
    }, 50);
  },
  // checks job information to set appropriate scheduled wake time
  setWakeTime() {
    let hour = 12;
    for (let i = 1; i < 8; i++) {
      if (ↂ.sched.workTime[i][0] > 0 && ↂ.sched.workTime[i][0] < hour) {
        hour = ↂ.sched.workTime[i][0];
      }
      hour -= 1;
      ↂ.sched.wakeTime[0] = hour;
    }
  },
  // runs the dream portion, displays warnings and dream text
  dream(): string {
    const ᛔ = State.active.variables;
    let output = "";
    if (ↂ.pc.status.health < 30) {
      output += "<div class='fadeIn animated'>@@.warning;WARNING!@@ Your health is very low. You should seek "
      + "medical treatment immediately.</div>";
    } else if ((ↂ.pc.status.healthOld - ↂ.pc.status.health) >= 15) {
      output += "<div class='fadeIn animated'>@@.import;CAUTION@@ Your health dropped significantly today, "
      + "you may want to seek medical attention.</div>";
    } else if (ᛔ.AW.medChange) {
      output += "<div class='fadeIn animated'>This is a Placeholder for a body/mind altering event/process "
        + "that happens overnight.</div>";
    } else if (ↂ.pc.status.mindbreak) {
      output += "<div class='fadeIn animated'>Placeholder for mindbreak message.</div>";
    } else if (ↂ.pc.status.need > 2) {
      output += "<div class='fadeIn animated'>@@.import;CAUTION@@ Your need is getting high. See the "
        + "encyclopedia for more information on need and other character stats.</div>";
    }
    /*******************************************************
    determine dreams, if any
    This is the place to add checks for new "special dreams"
    or expand the list of standard dreams
    *******************************************************/
    const dreams = ["none", "standard", "standard"];
    if (ↂ.pc.status.satisfaction < 30) {
      dreams.push("unsatisfied");
    }
    if (ↂ.pc.status.need > 0) {
      for (let i = 0; i < ↂ.pc.status.need; i++) {
        dreams.push("needy");
      }
    }
    if (ↂ.pc.status.wombA.weeks > 0 && (ↂ.pc.fert.pregTerm - ↂ.pc.status.wombA.weeks) < 4) {
      dreams.push("latepreg");
      dreams.push("latepreg");
    } else if (ↂ.pc.status.wombA.weeks > 0) {
      dreams.push("preg");
    }
    if (ↂ.pc.status.wombB.weeks > 0 && (ↂ.pc.fert.pregTerm - ↂ.pc.status.wombB.weeks ) < 4) {
      dreams.push("latepreg");
      dreams.push("latepreg");
    } else if (ↂ.pc.status.wombB.weeks > 0) {
      dreams.push("preg");
    }
    const z = dreams.length - 1;
    const r = random(0, z);
    let dream;
    try {
      dream = aw.dreams[dreams[r]]();
    } catch (e) {
      dream = "uh-oh... looks like a probs";
      console.log(`Making a dream, dream ${dreams[r]}, resulted in error ${e.name}: ${e.message}`);
    }
    output += `<div class='fadeIn animated'>${dream}</div>`;
    output += "<div class='fadeIn animated'><center><span class='head1'>. . . . .</span></center></div>";
    setTimeout(function() {
      setup.sleep.sleepProc();
    }, 500);
    return output;
  },
  passedOutDream(){
    let output = "<div class='fadeIn animated'><center>[img[IMG-PassedOutAsleep]]</center>";
    output += `<p>As if someone reached out and flipped a switch, you lose consciousness where you stand...</p></div>`;
    setTimeout(function () {
      setup.sleep.sleepProcPassOut();
    }, 500);
    return output;
  },
  // processes mechanic items that occur nightly
  sleepProc(): void {
    const ᛔ = State.active.variables;
    // setup.time.missedCheck();//last check for missed apts
    aw.sleep.social = setup.time.socialCount();
    aw.sleep.missed = setup.sleep.getMissed();
    setup.sleep.sleepTime();
    setup.sleep.loneliness();
    let r;
    if (setup.job.time.today() && !ↂ.sched.vacation[aw.timeArray[2]] && !ↂ.sched.sick[aw.timeArray[2]]) {
      const shit = setup.sleep.sleepIn();
      if (shit) {
        // late wake msg
        r = "latework";
      } else {
        if (aw.sleep.earlyWakeMins < aw.sleep.minsToWake - 60) {
          aw.sleep.totalmins -= Math.round((aw.sleep.minsToWake - aw.sleep.earlyWakeMins) / random(2, 6));
          // early wake msg
          r = "earlywork";
        } else {
          // normal wake msg
          r = "normwork";
        }
      }
    } else {
      const shit = setup.sleep.sleepTotal();
      if (shit) {
        // sleeping in :)
        r = "sleptin";
      } else {
        if (aw.sleep.earlyWakeMins < aw.sleep.minsToWake - 60) {
          aw.sleep.totalmins -= Math.round((aw.sleep.minsToWake - aw.sleep.earlyWakeMins) / random(2, 6));
          // early wake msg
          r = "early";
        } else {
          // normal wake msg
          r = "normal";
        }
      }
    }
    if (ↂ.job.code === "UE" && !ↂ.flag.selfEmployed) {
      ↂ.flag.unemployedDays++;
      if (ↂ.flag.unemployedDays === 2) {
        setup.omni.new("unemployed1");
      } else if (ↂ.flag.unemployedDays === 6) {
        setup.omni.new("unemployed2");
      } else if (ↂ.flag.unemployedDays > 9) {
        setup.omni.new("unemployed3");
      }
    }
    if ("number" !== typeof aw.sleep.totalmins || isNaN(aw.sleep.totalmins)) {
      aw.con.warn(`aw.sleep.totalmins is not a number! value = ${aw.sleep.totalmins}`);
      if ("number" !== typeof aw.sleep.minsToWake || isNaN(aw.sleep.minsToWake)) {
        aw.con.warn(`aw.sleep.minsToWake is not a number! using default 6 hours. value = ${aw.sleep.minsToWake}`);
        aw.sleep.totalmins = 360;
      } else {
        aw.sleep.totalmins = aw.sleep.minsToWake;
      }
    }
    setup.time.add(aw.sleep.totalmins, true);
    setup.time.dateChange();
    try {
      setup.sched.process(); // moves the events in calendar
    } catch (e) {
      aw.con.warn(`Error in the Besty sched.process function.\nThaumX's error handling saved the game from a total crash.\nSchedule Processing not completed with error ${e.name}: ${e.message}.`);
    }
    try {
      setup.sched.cleaner(); // and clean really old events ( > 30 days old)
    } catch (e) {
      aw.con.warn(`Error in the Besty sched.cleaner function.\nThaumX's error handling saved the game from a total crash.\nSchedule Cleanup not completed with error ${e.name}: ${e.message}.`);
    }
    try {
      setup.fert.cycle();
    } catch (e) {
      aw.con.error("time-fert.cycle", e);
    }
    setup.sleep.status();
    setup.fert.birthCon();
    // semen functions
    setup.fert.finalMove("pc");
    setup.fert.migrate("pc");
    // fetus checking function
    setup.fert.fetusCheck("pc");
    // zygote checking
    setup.fert.zygoteCheck("pc");
    // ovulation check
    if (ↂ.pc.fert.ovuFlag && ↂ.pc.status.cyc < 5) { // time to ovulate!
      ↂ.pc.fert.ovuFlag = false;
      ↂ.pc.fert.aftOvulate = true;
      setup.fert.ovulate("pc");
    }
    // aging jizz so they die off over time
    setup.fert.spermAge("pc");
    // checking fetuses for birth
    setup.fert.birthCheck("pc");
    aw.S();
    // other items
    setup.sleep.groomItems();
    setup.sleep.goddessCheck();
    ↂ.sched.fastSleep = false;
    ↂ.sched.sleepWarnOn = true;
    ↂ.job.late.called = 0;
    if (aw.timeArray[2] === 1) {
      ↂ.sched.vacation[7] = false;
      ↂ.sched.sick[7] = false;
    } else {
      const vvv = aw.timeArray[2] - 1;
      ↂ.sched.vacation[vvv] = false;
      ↂ.sched.sick[vvv] = false;
    }
    ↂ.sched.showered = false;
    ↂ.flag.preg.morningSickToday = false;
    ↂ.flag.coffeeToday = 0;
    aw.S();
    setup.sleep.environmentEffect();
    setup.totalATR();
    setup.calcEnergyRate();
    /*set the time to when you awake*/
    setup.sleep.print(setup.sleep.morningText(r));
    // contentBoxer
    // msg += "<<include [[sleepinBullshit]]>>";
    setup.sleep.wakingUp();
  },
  sleepProcPassOut(): void {
    const ᛔ = State.active.variables;
    // setup.time.missedCheck();//last check for missed apts
    aw.sleep.social = setup.time.socialCount();
    aw.sleep.missed = setup.sleep.getMissed();
    aw.sleep.minsToWake = random(160, 200);
    aw.sleep.earlyWakeMins = aw.sleep.minsToWake;
    setup.sleep.loneliness();
    if (ↂ.job.code === "UE" && !ↂ.flag.selfEmployed) {
      ↂ.flag.unemployedDays++;
    }
    let r;
    aw.sleep.extramins = 0;
    aw.sleep.totalmins = aw.sleep.minsToWake;
    aw.sleep.sleepIn = false;
    r = "passedOut";
    setup.time.add(aw.sleep.totalmins, true);
    setup.time.dateChange();
    try {
      setup.sched.process(); // moves the events in calendar
    } catch (e) {
      aw.con.warn(`Error in the Besty sched.process function.\nThaumX's error handling saved the game from a total crash.\nSchedule Processing not completed with error ${e.name}: ${e.message}.`);
    }
    try {
      setup.sched.cleaner(); // and clean really old events ( > 30 days old)
    } catch (e) {
      aw.con.warn(`Error in the Besty sched.cleaner function.\nThaumX's error handling saved the game from a total crash.\nSchedule Cleanup not completed with error ${e.name}: ${e.message}.`);
    }
    try {
      setup.fert.cycle();
    } catch (e) {
      aw.con.error("time-fert.cycle", e);
    }
    setup.sleep.status();
    setup.fert.birthCon();
    // semen functions
    setup.fert.finalMove("pc");
    setup.fert.migrate("pc");
    // fetus checking function
    setup.fert.fetusCheck("pc");
    // zygote checking
    setup.fert.zygoteCheck("pc");
    // ovulation check
    if (ↂ.pc.fert.ovuFlag && ↂ.pc.status.cyc < 5) { // time to ovulate!
      ↂ.pc.fert.ovuFlag = false;
      ↂ.pc.fert.aftOvulate = true;
      setup.fert.ovulate("pc");
    }
    // aging jizz so they die off over time
    setup.fert.spermAge("pc");
    // checking fetuses for birth
    setup.fert.birthCheck("pc");
    aw.S();
    // other items
    setup.sleep.groomItems();
    setup.sleep.goddessCheck();
    ↂ.sched.fastSleep = false;
    ↂ.sched.sleepWarnOn = true;
    ↂ.job.late.called = 0;
    if (aw.timeArray[2] === 1) {
      ↂ.sched.vacation[7] = false;
      ↂ.sched.sick[7] = false;
    } else {
      const vvv = aw.timeArray[2] - 1;
      ↂ.sched.vacation[vvv] = false;
      ↂ.sched.sick[vvv] = false;
    }
    ↂ.sched.showered = false;
    ↂ.flag.preg.morningSickToday = false;
    aw.S();
    setup.status.happy(-3, "Waking up and realizing you passed out");
    setup.status.stress(25, "Waking up and realizing you passed out");
    setup.status.satisfact(-15, "Waking up and realizing you passed out");
    setup.totalATR();
    setup.calcEnergyRate();
    // determine unique wakeup condition
    aw.sleep.passedOutType = "fine";
    ↂ.flag.passedOut++;
    const outcomes = ["fine", "creampie", "hugeCreampie", "bukkake", "stretch", "dongRemoval", "mermaid"];
    let odds = [74, 49, 24, 0];
    if (ↂ.flag.passedOut > 2) {
      odds = [98, 95, 90, 75, 60, 20, 0];
    } else if (ↂ.flag.passedOut === 2) {
      odds = [95, 85, 70, 50, 30, 5, 0];
    }
    const rand = random(1, 100);
    for (let i = 0, c = odds.length; i < c; i++){
      if (rand > odds[i]) {
        aw.sleep.passedOutType = outcomes[i];
        break;
      }
    }
    let texts = "<p>";
    switch (aw.sleep.passedOutType) {
      case "fine":
        texts += "By some miracle of the elder gods, you wake up unmolested...";
        break;
      case "creampie":
        texts += "You dream of having drunken sex, someone thrusting into your pussy without caring about your pleasure.";
        setup.devirgin();
        ↂ.pc.fert.creampie("unknown", -99, "default");
        setup.condition.add({ loc: "thighs", amt: 5, tgt: "pc", wet: 5, type: "cum" });
        break;
      case "hugeCreampie":
        texts += "You have a strange sex dream during your sleep. When the man finishes inside you, he seems to just keep cuming and cuming without stopping.";
        setup.devirgin();
        ↂ.pc.fert.creampie("unknown", 120, "deep");
        setup.condition.add({ loc: "thighs", amt: 20, tgt: "pc", wet: 20, type: "cum" });
        break;
      case "bukkake":
        texts += "You dream of the rain, warm droplets falling from the sky to coat your skin. Eventually being soaked leaves you feeling cold, and the dream retreats.";
        setup.bukkake();
        break;
      case "stretch":
        texts += "You have a strange dream where you discover that your lover has a gargantuan cock. The two of you try with all your might, and eventually you're able to take him inside you.";
        setup.devirgin();
        let res = "notfit";
        do {
          res = ↂ.pc.body.pussy.insert(10);
        } while (res === "notfit");
        ↂ.pc.fert.creampie("unknown", 60, "deep");
        break;
      case "dongRemoval":
        texts += "You dream of giving birth, it happens too quickly so you give birth on the way to the hospital without any pain relief. Eventually though, you're comforted by the hums and beeps of hospital equipment.";
        let str = "notfit";
        do {
          str = ↂ.pc.body.pussy.insert(15);
        } while (str === "notfit");
        ↂ.pc.body.pussy.tight = 15;
        ↂ.pc.status.health -= 20;
        setup.status.record("health", -20, "Giant dong removal surgery");
        setup.startsPassage = "ResidentialMedicalHospital";
        ↂ.map.loc = ["residential", "medical", "hospital"];
        break;
      case "mermaid":
        texts += "You dream that you meet a wizened old wizard who casts a spell to let you breathe underwater.";
        break;
      default:
        texts += "Rather impossibly, there has been an error!";
        break;
    }
    aw.S();
    texts += "</p>";
    setup.sleep.print(texts);
    // contentBoxer
    // msg += "<<include [[sleepinBullshit]]>>";
    setup.sleep.wakingUp();
  },
  // appends twee content to sleep screen
  print(content): void {
    const frag = document.createDocumentFragment();
    // tslint:disable-next-line:no-unused-expression
    new Wikifier(frag, content);
    $("#contentBoxer").append(frag);
  },
  // adds last to progress bar (allows wakeup)
  wakingUp(): void {
    setup.sleep.bar(40);
  },
  // function to take a nap
  startNap(): void {
    let msg;
    const ᛔ = State.active.varables;
    if (aw.tVal > (setup.time.midnight - 180)) {
      msg = "@@.head3;Y@@ou realize that it's simply too late to take a nap, and that you should probably "
        + "consider sleeping instead.";
    } else if (ↂ.pc.status.fatigue > 2 && ↂ.pc.status.fatigue < 7) {
      const t = 10 * ↂ.pc.status.fatigue + random(0, 9);
      setup.sleep.nap(t);
      msg = `@@.head3;Y@@ou lay down for a nice nap, and wake up after ${t} minutes feeling refreshed.`;
    } else if (ↂ.pc.status.fatigue < 3) {
      msg = "@@.head3;Y@@ou lay down for half an hour but are simply to awake to get any good sleep.";
      setup.time.add(random(30, 36));
    } else if (ↂ.pc.status.fatigue < 10) {
      const t = 15 * ↂ.pc.status.fatigue + random(0, 9);
      setup.sleep.nap(t);
      const h: number|string = Math.floor(t / 60);
      const m: number|string = t % 60;
      const hs: string = (h > 1) ? h + " hours" : h + " hour";
      const ms: string = (m === 1) ? m + " minute" : m + " minutes";
      msg = `@@.head3;Y@@ou lay down for a nap, but you're so tired that you end up sleeping for ${hs} and ${ms}.`;
    } else {
      msg = "@@.head3;Y@@ou're simply too tired for a nap, and after laying down you end up sleeping for the night.";
      setTimeout(function() {
        setup.sleep.go();
      }, 3000);
    }
    const output = `<center>[img[IMG-SleepingNapTime]]</center><p>${msg}</p>`;
    setup.dialog("Taking A Nap", output);
  },
  // npc processing function
  npcStart(): void {
    /*for (let npc of Object.keys(aw.npc)) {  obliviated by npcproc functions?
      setTimeout(() => aw.npc[npc].rship.update(), 20);
    }*/
    if ((aw.sleep.startDate[0] === 7 && !setup.time.aftMidnight) || (aw.sleep.startDate[0] === 1 && setup.time.aftMidnight)) {
      setup.playerHistoryComparison();
    } else {
      setTimeout(function() {
        setup.sleep.bar(8);
      }, 500);
      setTimeout(function() {
        setup.sleep.bar(10);
      }, 600);
    }
    setTimeout(function() {
      setup.sleep.bar(5);
    }, 400);
    setTimeout(function() {
      setup.npcSched.generate();
      setup.sleep.bar(12);
    }, 75);
    setTimeout(function() {
      const x = setup.suicide.check();
      if (x > 0) {
        aw.con.info(`NPC check complete. Had to generate ${x} new NPCs`);
      } else if (x < 0) {
        aw.con.info(`NPC check complete. had to suicide ${x} NPCs.`);
      } else {
        aw.con.info("NPC check complete. no change in NPC numbers needed.");
      }
      setup.sleep.bar(15);
    }, 50);
    setTimeout(function() {
      try {
        setup.npcProc();
      } catch (e) {
        aw.con.error("sleep -> setup.npcProc()", e);
      }
      setup.sleep.bar(13);
    }, 70);
  },
  // calculates the sleeping time
  sleepTime(): void {
    const t = aw.sleep.startTime;
    if (t !== aw.time) {
      aw.con.warn(`SLEEP TIME WARNING:\nMismatch between aw.sleep.startTime & aw.time.`);
    }
    // update waketime based on Job to be 1.5 hours before work starts
    if (ↂ.sched.workDays != null) {
      let xD;
      for (let i = 1; i < 8; i++) {
        if (ↂ.sched.workDays[i]) {
          xD = i;
          break;
        }
      }
      if (ↂ.sched.workTime != null && ↂ.sched.workTime[xD] != null && ↂ.sched.workTime[xD][0] != null) {
        let xH = ↂ.sched.workTime[xD][0];
        let xM = ↂ.sched.workTime[xD][1];
        xH -= 1;
        xM -= 30;
        if (xM < 0) {
          xM += 60;
          xH -= 1;
        }
        ↂ.sched.wakeTime = [xH, xM];
      }
    }
    // get values for waketime and alarm (if on)
    let w = setup.time.toVal([ↂ.sched.wakeTime[0], ↂ.sched.wakeTime[1], true]);
    if (ↂ.flag.alarmClock[0]) {
      w = setup.time.toVal([ↂ.flag.alarmClock[1], ↂ.flag.alarmClock[2], true]);
    }
    try {
      aw.sleep.minsToWake = w - t;
      aw.con.info(`Base sleeping minutes = ${aw.sleep.minsToWake} (${Math.floor(aw.sleep.minsToWake / 60)}:${(aw.sleep.minsToWake % 60)}).`);
      if (aw.sleep.minsToWake > 480) {
        aw.sleep.earlyWakeMins = 480;
      } else {
        aw.sleep.earlyWakeMins = aw.sleep.minsToWake;
      }
    } catch (e) {
      aw.con.error("sleepTime", e);
      aw.sleep.minsToWake = 420;
      aw.sleep.earlyWakeMins = aw.sleep.minsToWake;
    }
    // make sure don't wake up too early...
    const minwake = (aw.time + aw.sleep.minsToWake) % 1440;
    if (minwake < 210) {
      aw.sleep.minsToWake += (210 - minwake);
    }
    const earlyminwake = (aw.time + aw.sleep.earlyWakeMins) % 1440;
    if (earlyminwake < 210) {
      aw.sleep.earlyWakeMins += (210 - earlyminwake);
    }
    return;
  },
  // gets missed dates/appointments
  getMissed(): number {
    try {
      const ᛔ = State.active.variables;
      let d = aw.timeArray[2];
      let w = aw.timeArray[3];
      if (ᛔ.time[2]) {// correction if after midnight and date has changed
        d--;
        if (d < 1) {
          d = 7;
          w -= 1;
          if (w < 1) {
            w = 4;
          }
        }
      }
      return setup.time.missed(d, w);
    } catch (e) {
      aw.con.error("getMissed", e);
      return 0;
    }
  },
  // process stats based on social interaction
  loneliness(): void {
    try {
      const ᛔ = State.active.variables;
      let s = aw.sleep.social;
      const distro = [
        [0, 0, 1, 3, 3, 3, 2],
        [0, 0, 0, 0, 3, 4, 5],
        [0, 1, 1, 2, 2, 3],
        [-1, 1, 1.75, 2.33, 2.75, 3],
      ];
      if (s > 5) {
        s = 5;
      } else if (s < 0) {// how? lol
        s = 0;
      }
      const m = distro[3][s];
      let c = 0;
      if (s <= 0) {
        c += randomDist(distro[0]);
        if (!ↂ.pc.trait.intro) {
          c += randomDist(distro[1]);
          if (ↂ.pc.trait.extro) {
            c += randomDist(distro[0]);
          }
        }
        if (ↂ.pc.trait.lowEsteem !== 0) {
          c += randomDist(distro[2]);
        }
        if (ↂ.pc.trait.romantic === 1) {
          c += randomDist(distro[2]);
        }
        ↂ.pc.status.lonely += c;
        const lmsg = "A brand new day of " + either("being alone", "loneliness", "forever alone status");
        setup.status.record("lonely", c, lmsg);
        if (ↂ.pc.status.lonely >= 100) {
          const x = random(1, 3);
          ↂ.pc.status.lonely = 100 - (x * 6);
          ↂ.pc.status.happy -= x;
          setup.status.record("happy", x * -1, "Loneliness");
        } else if (ↂ.pc.status.lonely >= 70) {
          ↂ.pc.status.happy -= 1;
          setup.status.record("happy", -1, "Loneliness");
        }
      } else {
        c += randomDist(distro[0]) * m;
        if (!ↂ.pc.trait.extro) {
          c += randomDist(distro[1]) * m;
          if (ↂ.pc.trait.intro) {
            c += randomDist(distro[0]) * m;
          }
        }
        ↂ.pc.status.lonely -= Math.round(c);
        setup.status.record("lonely", c, "Plenty of social interaction today");
        if (ↂ.pc.status.lonely === 0) {
          if (ↂ.pc.trait.intro) {
            const ls = random(3, 7);
            ↂ.pc.status.stress += ls;
            setup.status.record("stress", ls, "Too much social activity");
            const lh = random(0, 1);
            ↂ.pc.status.happy -= lh;
            setup.status.record("happy",lh * -1, "Too much social activity");
          } else if (ↂ.pc.trait.extro) {
            ↂ.pc.status.happy += 1;
            setup.status.record("happy", 1, "Too much social activity");
          }
          ↂ.pc.status.lonely = 0;
        } else if (ↂ.pc.trait.intro && ↂ.pc.status.lonely <= 35) {
          ↂ.pc.status.happy += 1;
          setup.status.record("happy", 1, "Good social balance");
        } else if (!ↂ.pc.trait.extro && ↂ.pc.status.lonely <= 15) {
          ↂ.pc.status.happy += 1;
          setup.status.record("happy", 1, "Good social balance");
        }
      }
      if (ↂ.pc.status.nutrition !== undefined && setup.valToBMI(ↂ.pc.status.nutrition.realWeight) < 14) {
        setup.badEnd("starvation");
      }
      aw.S();
    } catch (e) {
      aw.con.error("loneliness", e);
    }
  },
  // determine if the player oversleeps
  sleepIn(): boolean {
    const ᛔ = State.active.variables;
    try {
      const hours = Math.floor(aw.sleep.minsToWake / 60);
      const sit = ["your body just needed the extra rest"];
      let th = 100;
      switch (hours) {
        case 9:
          th = 100 + 11 * (hours - 8);
          break;
        case 7:
          th = (ↂ.pc.status.fatigue > 5) ? 98 : 100;
          break;
        case 6:
          th = (ↂ.pc.status.fatigue > 5) ? 96 : 98;
          sit.push("you didn't sleep long enough");
          break;
        case 5:
          th = (ↂ.pc.status.fatigue > 5) ? 94 : 96;
          sit.push("you didn't sleep long enough");
          break;
        case 4:
          th = (ↂ.pc.status.fatigue > 5) ? 85 : 95;
          sit.push("you didn't leave nearly enough time to sleep");
          break;
        case 3:
          th = (ↂ.pc.status.fatigue > 5) ? 70 : 85;
          sit.push("you didn't leave nearly enough time to sleep");
          break;
        case 2:
          th = (ↂ.pc.status.fatigue > 5) ? 60 : 70;
          sit.push("you didn't leave nearly enough time to sleep");
          break;
        case 1:
          th = (ↂ.pc.status.fatigue > 5) ? 50 : 60;
          sit.push("you didn't leave nearly enough time to sleep");
          break;
        case 0:
          th = (ↂ.pc.status.fatigue > 5) ? 25 : 40;
          sit.push("you didn't leave nearly enough time to sleep");
          break;
      }
      if (ↂ.pc.status.fatigue === 9) {
        th -= 5;
        sit.push("you had a tiring day yesterday");
      } else if (ↂ.pc.status.fatigue > 9) {
        th -= 20;
        sit.push("you had a tiring day yesterday");
      }
      if (ↂ.pc.status.energy.amt <= 2) {
        switch (ↂ.pc.status.energy.amt) {
          case 2:
            th -= 2;
            break;
          case 1:
            th -= 5;
            sit.push("you over-exerted yourself yesterday");
            break;
          case 0:
            th -= 15;
            sit.push("you over-exerted yourself yesterday");
            break;
        }
      }
      if (ↂ.pc.status.health < 30) {
        th -= 75;
        sit.push("you're perilously ill");
      } else if (ↂ.pc.status.health < 50) {
        th -= 50;
        sit.push("you're seriously ill");
      } else if (ↂ.pc.status.health < 70) {
        th -= 25;
        sit.push("your poor health");
      }
      if (ↂ.pc.status.addict.withdrawl) {
        th -= 20;
        sit.push("your withdrawal symptoms");
      }
      // tslint:disable-next-line:max-line-length
      if ((ↂ.pc.status.drugs[0] + ↂ.pc.status.drugs[1] + ↂ.pc.status.drugs[2] + ↂ.pc.status.drugs[3] + ↂ.pc.status.drugs[4]) > 2) {
        th -= 30;
        sit.push("the drugs");
      }
      if (ↂ.pc.status.alcohol > 2) {
        th -= 50;
        sit.push("the alcohol");
      }
      const alarming = (ↂ.flag.alarmClock[0]) ? 75 : 100;
      const roll = random(1, alarming);
      aw.sleep.slpMsg = jQuery.extend(true, [], sit);
      if (roll > th && !ↂ.sched.sleepinOverride) {
        aw.sleep.sleepIn = true;
        const ehr = Math.floor((100 - th) / 10);
        if (ehr <= 1) {
          aw.sleep.extramins = random(15, 50);
        } else {
          aw.sleep.extramins = ((ehr - 1) * 60) + random (3, 40);
        }
        aw.sleep.totalmins = aw.sleep.minsToWake + aw.sleep.extramins;
        return true;
      } else {
        aw.sleep.extramins = 0;
        aw.sleep.totalmins = aw.sleep.minsToWake;
        aw.sleep.sleepIn = false;
        return false;
      }
    } catch (e) {
      aw.con.error("sleepIn", e);
      aw.sleep.extramins = 0;
      aw.sleep.totalmins = aw.sleep.minsToWake;
      aw.sleep.sleepIn = false;
      return false;
    }
  },
  // final combiner of sleep times and oversleep
  sleepTotal(): boolean {
    try {
      const ᛔ = State.active.variables;
      if (aw.sleep.minsToWake < 360) {
        aw.sleep.minsToWake = 360;
      }
      const sit = ["your body just needed the extra rest"];
      let th = 100;
      if (ↂ.pc.status.fatigue === 9) {
        th -= 5;
        sit.push("you had a tiring day yesterday");
      } else if (ↂ.pc.status.fatigue > 9) {
        th -= 20;
        sit.push("you had a tiring day yesterday");
      }
      if (ↂ.pc.status.energy.amt <= 2) {
        switch (ↂ.pc.status.energy.amt) {
          case 2:
            th -= 2;
            break;
          case 1:
            th -= 5;
            sit.push("you over-exerted yourself yesterday");
            break;
          case 0:
            th -= 15;
            sit.push("you over-exerted yourself yesterday");
            break;
        }
      }
      if (ↂ.pc.status.health < 30) {
        th -= 75;
        sit.push("you're perilously ill");
      } else if (ↂ.pc.status.health < 50) {
        th -= 50;
        sit.push("you're seriously ill");
      } else if (ↂ.pc.status.health < 70) {
        th -= 25;
        sit.push("your poor health");
      }
      if (ↂ.pc.status.addict.withdrawl) {
        th -= 20;
        sit.push("your withdrawal symptoms");
      }
      // tslint:disable-next-line:max-line-length
      if ((ↂ.pc.status.drugs[0] + ↂ.pc.status.drugs[1] + ↂ.pc.status.drugs[2] + ↂ.pc.status.drugs[3] + ↂ.pc.status.drugs[4]) > 2) {
        th -= 30;
        sit.push("the drugs");
      }
      if (ↂ.pc.status.alcohol > 2) {
        th -= 50;
        sit.push("the alcohol");
      }
      const roll = random(1, 100);
      aw.sleep.slpMsg = jQuery.extend(true, [], sit);
      if (roll > th && !ↂ.sched.sleepinOverride) {
        aw.sleep.sleepIn = false;
        const ehr = Math.floor((100 - th) / 10);
        if (ehr <= 1) {
          aw.sleep.extramins = random(15, 50);
        } else {
          aw.sleep.extramins = ((ehr - 1) * 60) + random (3, 40);
        }
        aw.sleep.totalmins = aw.sleep.minsToWake + aw.sleep.extramins;
        return true;
      } else {
        aw.sleep.extramins = 0;
        aw.sleep.totalmins = aw.sleep.minsToWake;
        aw.sleep.sleepIn = false;
        return false;
      }
    } catch (e) {
      aw.con.error("sleepTotal", e);
      aw.sleep.extramins = 0;
      aw.sleep.totalmins = aw.sleep.minsToWake;
      aw.sleep.sleepIn = false;
      return false;
    }
  },
  // calculates changes in status that occur overnight
  status(): void {
    /*regen fatigue energy and whatnot based on sleep time*/
    const ᛔ = State.active.variables;
    try {
      const hr = Math.floor(aw.sleep.totalmins / 60);
      const c = Math.floor((hr + 1) / 3);
      let a;
      let b;
      let hl;
      for (let i = 0; i < c; i++) {
        if (ↂ.pc.status.addict.withdrawl && ↂ.pc.status.addict.maxValue >= 80) {
          a = i * 4 + 1;
          hl = random(0, 5) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Withdrawal with high addiction {overnight}");
        } else if (ↂ.pc.status.addict.withdrawl && ↂ.pc.status.addict.maxValue >= 50) {
          hl = random(0, 3) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Withdrawal with moderate addiction {overnight}");
        } else if (ↂ.pc.status.addict.maxValue >= 50) {
          a = Math.floor(ↂ.pc.status.addict.maxValue / 20) * -1;
          b = Math.abs(a) + 1;
          hl = random(a, b);
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Sleeping (with addiction)");
        } else {
          hl = random(1, i + 2);
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Sleeping");
        }
        if (!ↂ.pc.trait.cl && ↂ.pc.trait.forgiving !== -1) {
          ↂ.pc.status.anger -= random(1, 2);
        } else if (ↂ.pc.trait.cl || ↂ.pc.trait.forgiving === -1) {
          ↂ.pc.status.anger -= random(0, 1);
        } else {
          ↂ.pc.status.anger -= 1;
        }
        if (ↂ.pc.status.anger < 0) {
          ↂ.pc.status.anger = 0;
          if (ↂ.pc.status.overAnger) {
            ↂ.pc.status.overAnger = (random(0, 1) === 1) ? false : true;
          }
        }
      }
      const fatigueReduct = Math.round(hr * Math.max(((ↂ.pc.status.health / 100) * (1 - (Math.min(ↂ.pc.status.arousal, 12) * 0.075))), 1));
      ↂ.pc.status.fatigue -= fatigueReduct;
      setup.status.record("fatigue", (fatigueReduct * -1), "Sleeping");
      aw.S("flag");
      setup.calc_energy_base(); // calculate body's max energy value - pc.body.energy
      // calculate effective max energy based on status for the day (status.energy.max)
      let er = 0;
      if (ↂ.pc.status.health < 30) {
        er = 10; // dying = very little energy
      } else if (ↂ.pc.status.health < 50) {
        er = 6; // extremely ill = very little energy
      } else if (ↂ.pc.status.health < 70) {
        er = 3; // sick, flu, lot less energy
      } else if (ↂ.pc.status.health < 90) {
        er = 1; // off your game
      }
      if (ↂ.pc.status.addict.maxValue > 90) {
        er += 2;
      } else if (ↂ.pc.status.addict.maxValue > 60) {
        er += 1;
      }
      if (ↂ.pc.status.pregnant) {
        if (ↂ.pc.status.wombA.boost > 0 || ↂ.pc.status.wombB.boost > 0) {
          er += 1; // pregnancy boost (faster gestation) uses more energy, so lower max.
        }
        if (ↂ.pc.status.wombA.growth > 69) {
          er += 1; // carrying around 3rd trimester babies reduces max energy.
        }
        if (ↂ.pc.status.wombB.growth > 69) {
          er += 1;
        }
      }
      if (ↂ.pc.body.tits.base.cupRaw > 68) {
        er += 1; // giant tits reduce energy
      }
      if (ↂ.pc.body.tits.base.cupRaw > 136) {
        er += 1; // gigantic impossible knockers further reduce energy
      }
      if (ↂ.pc.status.milk >= 5 && ↂ.pc.body.lactation > 4) {
        er += 1; // high milk production reduces energy.
      }
      if (ↂ.pc.status.happy < -2) {
        er += 1; // sadness reduces energy
      }
      if (ↂ.pc.status.happy < -5) {
        er += 1; // depression further reduces energy
      }
      ↂ.pc.status.energy.max = Math.max(2, ↂ.pc.body.energy - er); // actually set effective max energy
      // REGENERATE ENERGY overnight while sleeping.
      if (hr >= 7) {
        ↂ.pc.status.energy.amt += 7 + Math.round((hr - 7) / 2);
      } else {
        ↂ.pc.status.energy.amt += hr;
      }
      if (ↂ.pc.status.energy.amt > ↂ.pc.status.energy.max) {
        ↂ.pc.status.energy.amt = ↂ.pc.status.energy.max;
      }
      ↂ.pc.status.arousal -= Math.floor(hr * Math.max(0.25, (ↂ.pc.status.satisfaction / 100)));
      if (ↂ.pc.status.arousal < 0) {
        ↂ.pc.status.arousal = 0;
      }
      // basic recurring
      if (ↂ.pc.fert.boost > 15) {
        ↂ.pc.fert.boost = 15;
      }
      if (ↂ.pc.fert.boost > 0 && random(1, 3) < 3) {
        ↂ.pc.fert.boost -= 1;
      }
      aw.S();
    } catch (e) {
      aw.con.error("sleep.status", e);
      ↂ.pc.status.fatigue = 1;
      ↂ.pc.status.energy.amt = ↂ.pc.status.energy.max - 2;
      ↂ.pc.status.arousal = 0;
      ↂ.pc.status.anger = 0;
    }
  },
  // change grooming status, grow hair, etc.
  groomItems(): void {
    const groom = ↂ.pc.groom;
    /*perform standard actions and calculations*/
    groom.armpitCount += (groom.armpit !== 0) ? 1 : 0;
    groom.leghairCount += (groom.leghair !== 0) ? 1 : 0;
    groom.pubeCount += (groom.pubeGrow !== 0) ? 1 : 0;
    groom.bikiniCount += (groom.pube !== 0) ? 1 : 0;
    const main = ["armpit", "leghair", "pubeGrow", "pube"];
    const cunt = ["armpitCount", "leghairCount", "pubeCount", "bikiniCount"];
    for (let i = 0; i < 4; i++) {
      const m = groom[main[i]];
      const c = groom[cunt[i]];
      switch (m) {
        case 0:
          // do nothing
          break;
        case 1:
          if (c > 1) {
            groom[main[i]] = 2;
            groom[cunt[i]] = 0;
          }
          break;
        case 2:
          if (c > 3) {
            groom[main[i]] = 3;
            groom[cunt[i]] = 0;
          }
          break;
        case 3:
          if (c > 5) {
            groom[main[i]] = 4;
            groom[cunt[i]] = 0;
          }
          break;
        case 4:
          if (c > 5) {
            groom[main[i]] = 5;
            groom[cunt[i]] = 0;
          }
          break;
        case 5:
          if (c > 5) {
            groom[main[i]] = 6;
            groom[cunt[i]] = 0;
          }
          break;
      }
    }
    aw.S();
    try {
      if (groom.genMU !== "none" || groom.eyeMU !== "none" || groom.lipMU !== "none") {
        setup.makeup.smear();
      }
      setup.hair.undo();
    } catch (e) {
      aw.con.error("sleep.groomItems-hair/makeup", e);
    }
  },
  // check effect of home quality on the player
  environmentEffect(): void {
    const quality = Math.round((setup.homeItems.qualityCalculator("pcHome") - 3.5) * 50);
    const ment = ↂ.home.ment;
    const items = ["floors", "surfaces", "kitchen", "bathroom", "neatness", "deepclean"];
    const otherItems = ["bed", "dishes", "laundry"];
    let clean = 0;
    for (let i = 0; i < 6; i++) {
      clean += Math.min(100, (ↂ.home.clean[items[i]] * 2) - 80);
    }
    for (let i = 0; i < 3; i++) {
      clean += Math.min(100, (ↂ.home.clean[otherItems[i]] * 10) - 80);
    }
    clean = clean / 9;
    const weights = [2, 1.5, 3];
    let divisor = 6.5;
    if (ↂ.pc.trait.cl) {
      weights[2] = 4;
      divisor += 1;
    } else if (ↂ.pc.trait.op) {
      weights[2] = 2;
      divisor -= 1;
    }
    if (ↂ.pc.trait.isMaterialist) {
      weights[1] = 2;
      divisor += 0.5;
    } else if (ↂ.pc.trait.isHippy) {
      weights[1] = 1;
      divisor -= 0.5;
    }
    const score = Math.round(((quality * weights[0]) + (ment * weights[1]) + (clean * weights[2])) / divisor);
    aw.con.info(`Environment Score: ${score}, derived from items ${quality}, home ${ment}, clean ${clean}`);
    const msgy = `Environment Effects: ${score} - items ${quality}, home ${ment}, clean ${clean}`;
    let hap = 0;
    let stress = 0;
    let sat = 0;
    if (score > 84) {
      hap = 3;
      stress = 6;
      sat = 8;
    } else if (score > 69) {
      hap = 2;
      stress = 4;
      sat = 4;
    } else if (score > 49) {
      hap = 1;
      stress = 2;
      sat = 2;
    } else if (score > -1) {
      // 0
    } else if (score > -21) {
      hap = 1;
      stress = 5;
      sat = 2;
    } else if (score > -41) {
      hap = 2;
      stress = 8;
      sat = 4;
    } else if (score > -61) {
      hap = 3;
      stress = 10;
      sat = 8;
    } else {
      hap = 4;
      stress = 12;
      sat = 10;
    }
    hap *= (score < 0) ? -1 : 1;
    stress *= (score < 0) ? 1 : -1;
    sat *= (score < 0) ? -1 : 0.5;
    sat = Math.round(sat);
    if (hap > 0) {
      hap -= 1;
    }
    // failsafe to prevent the environmental effects from going too far, as they should not
    // kill the player by themselves normally.
    if (hap < 0 && ↂ.pc.status.happy + hap < -7) {
      hap = Math.min(0, (7 - Math.abs(ↂ.pc.status.happy)) * -1);
    } else if (hap > 0 && ↂ.pc.status.happy + hap > 6) {
      hap = Math.max(0, (6 - ↂ.pc.status.happy));
    }
    if (stress > 0 && ↂ.pc.status.stress + stress > 90) {
      stress = Math.max(0, 90 - ↂ.pc.status.stress);
    } else if (stress < 0 && ↂ.pc.status.stress + stress < 20) {
      stress = Math.min(0, (ↂ.pc.status.stress - 20) * -1);
    }
    if (sat > 0 && ↂ.pc.status.satisfaction + sat > 50) {
      sat = Math.max(0, 50 - ↂ.pc.status.satisfaction);
    } else if (sat < 0 && ↂ.pc.status.satisfaction + sat < 10) {
      sat = Math.min(0, (ↂ.pc.status.satisfaction - 10) * -1);
    }
    setup.status.happy(hap, msgy);
    setup.status.stress(stress, msgy);
    setup.status.satisfact(sat, msgy);
  },
  // determine if PC still meets goddess requirements
  goddessCheck(): void {
    const ᚠ: PC = ↂ.pc;
    // check if fertility storm mutation is true FIRST.
    if (ᚠ.mutate.cycle && ᚠ.mutate.multiple && ᚠ.mutate.twinWomb &&
      ᚠ.fert.fertility >= 5 && ᚠ.body.hips >= 5 && ᚠ.body.pelvis >= 5 && ᚠ.kink.risky && ᚠ.body.tits.base.cupNum > 14) {
      ᚠ.mutate.fertStorm = true;
      ᚠ.fert.fertility += 1;
      if (ᚠ.fert.fertility < 7) {
        ᚠ.fert.fertility += 7;
      } else if (ᚠ.fert.fertility > 8) {
        ᚠ.fert.fertility = 8;
      }
      aw.con.info(`Fertility Storm check passed.`);
    } else {
      ᚠ.mutate.fertStorm = false;
      if (ᚠ.fert.fertility > 7) {
        ᚠ.fert.fertility = 7;
      }
    }
    // Now check for fertility goddess (only possible if also fertr storm)
    if (ᚠ.mutate.fertStorm && ᚠ.fert.fertility >= 7 && ᚠ.mutate.birthCon && ᚠ.mutate.gestate &&
      ᚠ.body.hips >= 6 && ᚠ.body.pelvis >= 6 && ᚠ.kink.pregnancy && (ᚠ.mutate.acid || ᚠ.mutate.mouth) && ᚠ.trait.libido >= 5 && ᚠ.body.tits.base.cupNum > 19) {
      ᚠ.mutate.goddess = true;
      ᚠ.fert.fertility += 1;
      if (ᚠ.fert.fertility < 8) {
        ᚠ.fert.fertility = 8;
      } else if (ᚠ.fert.fertility > 9) {
        ᚠ.fert.fertility = 9;
      }
      aw.con.info(`Fertility Goddess check passed.`);
    } else {
      ᚠ.mutate.goddess = false;
      if (ᚠ.fert.fertility > 8) {
        ᚠ.fert.fertility = 8;
      }
    }
    aw.S();
  },
  // performs nap status changes over given minutes
  nap(min: number): void {
    aw.L();
    const hr = Math.floor(min / 30);
    const ᛔ = State.active.variables;
    const fat = Math.min(3, Math.round(hr * Math.max(((ↂ.pc.status.health / 100) * (1 - (Math.min(ↂ.pc.status.arousal, 12) * 0.1))), 1)));
    ↂ.pc.status.fatigue -= fat;
    setup.status.record("fatigue", (fat * -1), "From taking a nap");
    if (ↂ.pc.status.fatigue < 0) {
      ↂ.pc.status.fatigue = 0;
    }
    ↂ.pc.status.energy.amt += Math.round(hr / 4);
    if (ↂ.pc.status.energy.amt > ↂ.pc.status.energy.max) {
      ↂ.pc.status.energy.amt = ↂ.pc.status.energy.max;
    }
    ↂ.pc.status.arousal -= Math.floor(hr * Math.max(0, (ↂ.pc.status.satisfaction / 100)));
    if (ↂ.pc.status.arousal < 0) {
      ↂ.pc.status.arousal = 0;
    }
    aw.S();
    setup.time.add(min);
  },
  // outputs text for wakeup
  morningText(wu: string): string {
    const ᛔ = State.active.variables;
    let msg = '<div class="fadeIn animated"><p style="font-size:1.2rem;"><span class="clock">'
      + "<<print setup.timeDisp>></span> <<print setup.time.dateDisplay()>><br>";
    // setup.time.format
    let minToWork;
    let leftTxt;
    try {
      if (setup.job.time.today()) {
        const t = aw.time;
        const w = setup.time.toVal([ↂ.sched.workTime[aw.timeArray[2]][0], ↂ.sched.workTime[aw.timeArray[2]][1], false]);
        aw.con.info (t + " and " + w);
        try {
          minToWork = w - t;
          aw.sleep.timeUntilWork = minToWork;
        } catch (e) {
          aw.con.error("morningText", e);
          minToWork = 20;
        }
        if (minToWork < 0) {
          minToWork *= -1;
          leftTxt = `<span class='bad'>You're already ${setup.time.format(minToWork)} late for work!</span></p>`;
          wu = "verylate";
        } else if (minToWork < 30) {
          leftTxt = `<span class='import'>You only have ${setup.time.format(minToWork)} until work!</span></p>`;
        } else {
          leftTxt = `You have to be at work in ${setup.time.format(minToWork)}.</p>`;
        }
      } else {
        leftTxt = "You don't have work today.</p>";
      }
    } catch (e) {
      aw.con.error("Morning text, getting info on work...", e);
      leftTxt = "there was an error";
    }
    let ttw;
    let ttest;
    try {
      ttw = setup.map.time("current", ↂ.job.loc as string[]);
      // ttest = Math.ceil(minToWork / 5) * 5 + 5; HMMM
      ttest = Math.ceil(minToWork - ttw); //  Better now
    } catch (e) {
      ttw = 15;
      ttest = 15;
      aw.con.error("sleep.morningText", e);
    }
    msg += leftTxt;
    msg += "<p>";
    let r;
    switch (wu) {
      case "verylate":
        r = random(0, (aw.sleep.slpMsg.length - 1));
        msg += `@@.head3;Y@@ou fumble for your phone, staring with bleary eyes until you finally grasp the meaning of the numbers on the screen. @@.mono;Shit! I overslept. I've got to get to work!@@ You don't know whether it was because ${aw.sleep.slpMsg[r]}, or just plain bad luck, but you've definitely overslept.</p><p>Doing some fuzzy mental math, you try to figure out the time. You realize that you're already late for work, which started ${setup.time.format(minToWork)} ago. @@.mono;Damn, it's going to take me at least ${setup.time.format(ttest)} to get there too.@@</p>`;
        break;
      case "latework":
        r = random(0, (aw.sleep.slpMsg.length - 1));
        msg += `@@.head3;Y@@ou fumble for your phone, staring with bleary eyes until you finally grasp the meaning of the numbers on the screen. @@.mono;Shit! I overslept. I've got to get to work!@@ You don't know whether it was because ${aw.sleep.slpMsg[r]}, or just plain bad luck, but you've definitely overslept.</p><p>Doing some fuzzy mental math, you try to figure out the time. You realize that `;
        if (minToWork < (ttw + 10)) {
          msg += `you aren't late yet, but work is starting in ${setup.time.format(minToWork)}, and you'll never make it on time. @@.mono;It's going to take me at least ${setup.time.format(ttest)} to get there...@@</p>`;
        } else {
          msg += `you have a little time before work, but certainly not as much as you'd planned on. @@.mono;Let's see, it's going to take at least ${setup.time.format(ttest)} to get there, which leaves me ${setup.time.format((minToWork - ttest))}...</p>`;
        }
        break;
      case "earlywork":
        msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and grab your phone to check the time. @@.mono;Looks like my alarm hasn't even gone off yet...@@ You do some mental math to figure out how much time you have to get ready. @@.mono;Well it looks like I have ${setup.time.format((minToWork - ttest))} before I need to leave.@@</p>`;
        break;
      case "normwork":
        msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and silence your phone alarm. @@.mono;Guess it's time to get ready for work...@@ You do some mental math to figure out how much time you have to get ready. @@.mono;Well it looks like I have ${setup.time.format((minToWork - ttest))} before I need to leave.@@</p>`;
        break;
      case "sleptin":
        r = random(0, (aw.sleep.slpMsg.length - 1));
        msg += `@@.head3;Y@@ou fumble for your phone, staring with bleary eyes until you finally grasp the meaning of the numbers on the screen. @@.mono;Oh wow, I slept a lot@@ You don't know whether it was because ${aw.sleep.slpMsg[r]}, or just plain bad luck, but you've definitely slept in. @@.mono;Thank goodness I don't have work today!@@</p>`;
        break;
      case "early":
        msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and grab your phone to check the time. @@.mono;I wonder why I woke up so early?@@</p>`;
        break;
      case "normal":
        msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and stare bleakly at your phone. @@.mono;Well, I guess I'm awake now.@@</p>`;
        break;
      default:
        msg += `It seems like there was a strange error with my wakeup code... This is a bug. wu = ${wu}.</p>`;
        break;
    }
    if (ↂ.pc.body.tits.lact.on && State.active.variables.items.has("e-vie Overnight Breast Pump")) {
      const cans = Math.floor(ↂ.flag.milkTank / 4000); // 4000ml = 4 liter milk cans
      const ml = ↂ.flag.milkTank;
      ↂ.flag.milkTank = ↂ.flag.milkTank % 4000; // remainder goes to milk store
      if (cans > 0) { // add tanks to inventory if 1 or more
        setup.consumables.add("breastMilkA", cans);
        msg += `<p>While you were sleeping, your e-vie overnight pump filled ${cans} cryo-canisters with breast milk.</p>`;
      } else {
        msg += `<p>While you were sleeping, your e-vie overnight pump collected ${ml}ml of breast milk.</p>`;
      }
      aw.S();
    } else if (ↂ.pc.body.tits.lact.on && ↂ.flag.milkTank > 0) {
      const leaked = ↂ.flag.milkTank;
      ↂ.flag.milkTank = 0;
      msg += `<p>While you were sleeping, ${leaked}ml of milk leaked from your breasts. `;
      if (leaked > 1000) {
        msg += `@@.mono;I really should consider getting an overnight pump or something...@@</p>`;
      } else {
        msg += "</p>";
      }
      aw.S();
    }
    msg += "</div>";
    msg += setup.getReadySettings();
    return msg;
  },
};

setup.getReadySettings = function(): string {
  State.active.variables.enabledMorning = true;
  State.active.variables.clothesMorning = "standard";
  State.active.variables.lingMorning = "standard";
  State.active.variables.overMorning = "standard";
  State.active.variables.makeupMorning = "standard";
  State.active.variables.hairMorning = "standard";
  State.temporary.outfits = Object.keys(setup.outfits);
  State.temporary.hairsets = Object.keys(ↂ.pc.groom.hairSets);
  State.temporary.makeupsets = Object.keys(ↂ.makeupSet);
  let out = "<div class='fadeIn animated'><p><span class='head3'>Quick Prep:</span><br>";
  out += `Enabled <<checkboxB "$enabledMorning" false true>><<tab>>Hair<<dropdown "$hairMorning" _hairsets>><<tab>>Makeup<<dropdown "$makeupMorning" _makeupsets>><<tab>>Clothes<<dropdown "$clothesMorning" _outfits>></p></div><br>`;
  return out;
};

setup.calcEnergyRate = function(): number {
  aw.L();
  const pc = ↂ.pc;
  let rate = 10 - Math.max(7, Math.floor(ↂ.skill.athletic / 50));
  if (pc.status.health < 30) {
    rate += 8;
  } else if (pc.status.health < 50) {
    rate += 4;
  } else if (pc.status.health < 70) {
    rate += 2;
  }
  if (pc.status.addict.jonesing > 0) {
    rate += pc.status.addict.jonesing;
  }
  if (pc.status.addict.withdrawl) {
    rate += 2;
  }
  if (pc.status.fatigue > 3) {
    rate += 2;
  } else if (pc.status.fatigue > 2) {
    rate += 1;
  }
  if (pc.status.stress >= 70) {
    rate += 2;
  }
  pc.status.energy.rate = rate;
  aw.S();
  return rate;
};


