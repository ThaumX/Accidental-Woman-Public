/*
███████╗██╗     ███████╗███████╗██████╗
██╔════╝██║     ██╔════╝██╔════╝██╔══██╗
███████╗██║     █████╗  █████╗  ██████╔╝
╚════██║██║     ██╔══╝  ██╔══╝  ██╔═══╝
███████║███████╗███████╗███████╗██║
╚══════╝╚══════╝╚══════╝╚══════╝╚═╝
*/

interface setupSleep {
  bar: (t: number) => void;
  start: () => void;
  dream: () => string;
  sleepProc: () => void;
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
  furnitureQualityEffect: () => void;
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
}


setup.sleep = {
  // adds to the jQueryUI progress bar
  bar(t: number = 5): void {
    setup.pBar.add("#skypbar", t);
  },
  // starts the sleeping process
  start(): void {
    const ᛔ = State.active.variables;
    if (Dialog.isOpen()) {
      Dialog.close();
    }
    setup.eventAllowed = false;
    aw.sleep = {} as awSleep;
    aw.sleep.startTime = aw.time;
    aw.sleep.startDate = [aw.timeArray[2], aw.timeArray[3], aw.timeArray[4], aw.timeArray[5]];
    setup.startsPassage = aw.passage.title;
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
  // processes mechanic items that occur nightly
  sleepProc(): void {
    const ᛔ = State.active.variables;
    // setup.time.missedCheck();//last check for missed apts
    aw.sleep.social = setup.time.socialCount();
    aw.sleep.missed = setup.sleep.getMissed();
    setup.sleep.sleepTime();
    setup.sleep.loneliness();
    let r;
    if (ↂ.sched.workDays[ᛔ.date[0]] && !ↂ.sched.vacation[ᛔ.date[0]] && !ↂ.sched.sick[ᛔ.date[0]]) {
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
    if ("number" !== typeof aw.sleep.totalmins || isNaN(aw.sleep.totalmins)) {
      if ("number" !== typeof aw.sleep.minsToWake || isNaN(aw.sleep.minsToWake)) {
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
      setup.fert.ovulate("pc");
    }
    // aging jizz so they die off over time
    setup.fert.spermAge("pc");
    // checking fetuses for birth
    setup.fert.birthCheck("pc");
    aw.S();
    // other items
    setup.sleep.groomItems();
    setup.sleep.furnitureQualityEffect();
    setup.sleep.goddessCheck();
    ↂ.sched.fastSleep = false;
    ↂ.sched.sleepWarnOn = true;
    ↂ.job.late.called = 0;
    if (ᛔ.date[0] === 1) {
      ↂ.sched.vacation[7] = false;
      ↂ.sched.sick[7] = false;
    } else {
      const vvv = ᛔ.date[0] - 1;
      ↂ.sched.vacation[vvv] = false;
      ↂ.sched.sick[vvv] = false;
    }
    ↂ.sched.showered = false;
    aw.S();
    setup.totalATR();
    setup.calcEnergyRate();
    /*set the time to when you awake*/
    setup.sleep.print(setup.sleep.morningText(r));
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
    setup.sleep.bar(10);
  },
  // function to take a nap
  startNap(): void {
    let msg;
    const ᛔ = State.active.varables;
    if (aw.tVal > (ᛔ.midnight - 180)) {
      msg = "@@.head3;Y@@ou realize that it's simply too late to take a nap, and that you should probably "
        + "consider sleeping instead.";
    } else if (ↂ.pc.status.fatigue > 2 && ↂ.pc.status.fatigue < 8) {
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
        setup.sleep.start();
      }, 3000);
    }
    return msg;
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
    setTimeout(function() {
      if (aw.timeArray[2] > 1 && State.active.variables.pref.autoSave) {
        let labe = setup.time.dayName(State.active.variables.date[0] + 1) + " Morning, ";
        labe += (State.active.variables.date[0] + (State.active.variables.date[1] * 7));
        labe += "-" + State.active.variables.date[2] + "-" + State.active.variables.date[3];
        Save.autosave.save(labe, { sleepAutosave: labe, passover: setup.startsPassage});
        setup.sleep.bar(27);
      } else {
        setup.sleep.bar(27);
      }
    }, 1500);
  },
  // calculates the sleeping time
  sleepTime(): void {
    const t = aw.sleep.startTime;
    if (t !== aw.time) {
      aw.con.warn(`SLEEP TIME WARNING:\nMismatch between aw.sleep.startTime & aw.time.`);
    }
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
    return;
  },
  // gets missed dates/appointments
  getMissed(): number {
    try {
      const ᛔ = State.active.variables;
      let d = ᛔ.date[0];
      let w = ᛔ.date[1];
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
        if (ↂ.pc.status.lonely >= 100) {
          const x = random(1, 3);
          ↂ.pc.status.lonely = 100 - (x * 6);
          ↂ.pc.status.happy -= x;
        } else if (ↂ.pc.status.lonely >= 70) {
          ↂ.pc.status.happy -= 1;
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
        if (ↂ.pc.status.lonely < 0) {
          if (ↂ.pc.trait.intro) {
            ↂ.pc.status.stress += random(3, 7);
            ↂ.pc.status.happy -= random(0, 1);
          } else if (ↂ.pc.trait.extro) {
            ↂ.pc.status.happy += 1;
          }
          ↂ.pc.status.lonely = 0;
        } else if (ↂ.pc.trait.intro && ↂ.pc.status.lonely <= 35) {
          ↂ.pc.status.happy += 1;
        } else if (!ↂ.pc.trait.extro && ↂ.pc.status.lonely <= 15) {
          ↂ.pc.status.happy += 1;
        }
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
      if (aw.sleep.minsToWake < 420) {
        aw.sleep.minsToWake = 420;
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
      for (let i = 0; i < c; i++) {
        if (ↂ.pc.status.addict.withdrawl && ↂ.pc.status.addict.maxValue >= 80) {
          a = i * 4 + 1;
          ↂ.pc.status.health -= random(0, a);
        } else if (ↂ.pc.status.addict.withdrawl && ↂ.pc.status.addict.maxValue >= 50) {
          a = i * random(2, 3) + 1;
          ↂ.pc.status.health -= random(0, a);
        } else if (ↂ.pc.status.addict.maxValue >= 50) {
          a = Math.floor(ↂ.pc.status.addict.maxValue / 20) * -1;
          b = Math.max(2, i);
          ↂ.pc.status.health += random(a, b);
        } else {
          ↂ.pc.status.health += random(-1, i + 1);
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
      ↂ.pc.status.fatigue -= Math.round(hr * Math.max(((ↂ.pc.status.health / 100)
        * (1 - (Math.min(ↂ.pc.status.arousal, 12) * 0.075))), 0.25));
      if (ↂ.pc.status.fatigue < 0) {
        ↂ.pc.status.fatigue = 0;
      }
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
  furnitureQualityEffect(): void {
    const quality = setup.homeItems.qualityCalculator("pcHome");
    if (quality < 3) {
      ↂ.pc.status.happy -= 1;
    } else if (quality > 3) {
      ↂ.pc.status.happy += 1;
    }
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
    ↂ.pc.status.fatigue -= Math.min(2, Math.round(hr * Math.max(((ↂ.pc.status.health / 100)
      * (1 - (Math.min(ↂ.pc.status.arousal, 12) * 0.075))), 0.25)));
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
        const t = aw.tVal;
        const w = setup.time.toVal([ↂ.sched.workTime[ᛔ.date[0]][0], ↂ.sched.workTime[ᛔ.date[0]][1], false]);
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
        msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and grab your phone to check the time. @@.mono;Looks like my alarm hasn't even gone off yet... Why did I even set my alarm for my day off, anyway?@@</p>`;
        break;
      case "normal":
        msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and silence your phone alarm. @@.mono;Guess it's time to wake up... Why did I even set my alarm for my day off, anyway?@@</p>`;
        break;
      default:
        msg += `It seems like there was a strange error with my wakeup code... This is a bug. wu = ${wu}.</p>`;
        break;
    }
    msg += "</div>";
    msg += setup.getReadySettings();
    return msg;
  },
};

setup.getReadySettings = function(): string {
  State.temporary.enabled = true;
  State.temporary.clothes = "standard";
  State.temporary.ling = "standard";
  State.temporary.over = "standard";
  State.temporary.makeup = "standard";
  State.temporary.hair = "standard";
  State.temporary.outfits = Object.keys(setup.outfits);
  State.temporary.hairsets = Object.keys(ↂ.pc.groom.hairSets);
  State.temporary.makeupsets = Object.keys(ↂ.makeupSet);
  let out = "<div class='fadeIn animated'><p><span class='head3'>Quick Prep:</span><br>";
  out += `Enabled <<checkboxB "_enabled" false true>><<tab>>Hair<<dropdown "_hair" _hairsets>><<tab>>Makeup<<dropdown "_makeup" _makeupsets>><<tab>>Clothes<<dropdown "_clothes" _outfits>></p></div><br>`;
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

aw.dreams = {
  standard() {
    const x = random(1, 10);
    return `<p>@@.head3;Y@@ou lay peacefully in your bed, your <<pcBoobSize>> chest rising and falling with your slow breathing. There is a sigh of wind and your sleeping form shivers slightly, your <<pcShoulderSize>> shoulders hunching slightly under the covers. A bony, almost skeletal hand comes to rest on your lower abdomen, just above <<pcPubes 0>></p><p><span class="npc" style="color:#1ff455;">Rest young one... There is so much in store for you...</span> A tingle of pleasure shoots up your spine. <span class="npc" style="color:#1ff455;">You're having a standard ordinary dream (placeholder) ${x} of 10... Just wait until the <i>real</i> dreaming begins.</span> With an almost inaudible chuckle, the ancient presence is gone...</p>`;
  },
  none() {
    return `<p>@@.head3;Y@@ou rest peacefully through the night. You likely have many dreams, but none that you still remember by the time you awake in the morning.</p>`;
  },
  unsatisfied() {
    return "You're having an erotic dream caused by your lack of satisfaction recently (placeholder).";
  },
  needy() {
    return "You're having a needy dream, but it hasn't been written yet!";
  },
  preg() {
    return "You're having a pregnancy dream, but it hasn't been written yet!";
  },
  latePreg() {
    return `You're having a dream near the end of pregnancy somehow... Aside from that not being possible, it isn't written yet...`;
  },
};
