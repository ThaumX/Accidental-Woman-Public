
/*
███████╗████████╗ ██████╗ ██████╗ ██╗   ██╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗
██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
███████╗   ██║   ██║   ██║██████╔╝ ╚████╔╝     █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
╚════██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝      ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
███████║   ██║   ╚██████╔╝██║  ██║   ██║       ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝
*/


setTimeout(() => (function() {
  if (aw.event == null || aw.event.story == null) {
    alert(`---WARNING---\nEvent System - Story events\nAttempting to build event library before initiating event class.`);
  }
  const events: IntGameEventArgs[] = [
    {
      name: "MorningSickness",
      odds: 1000,
      output: "dialog",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if (!ↂ.flag.preg.morningSickToday && (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg)) {
          // check age
          const growA = ↂ.pc.status.wombA.growth;
          const growB = ↂ.pc.status.wombB.growth;
          if ((growA > 8 && growA < 37) || (growB > 8 && growB < 37)) {
            const t = aw.time - setup.time.today();
            if (t > 360 && t < 700) {
              if (random(1, 10) < ↂ.pc.fert.fertility) {
                ↂ.flag.preg.morningSickToday = true;
                return false;
              }
              return true;
            }
          }
        }
        return false;
      },
      action(count) {
        // effect
        ↂ.flag.preg.morningSickToday = true;
        setup.dialog("Morning Sickness", "<<include [[MorningSicknessEvent]]>>");
      },
    },
    {
      name: "FirstBabyKick",
      odds: 0,
      output: "dialog",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if ((ↂ.pc.status.wombA.preg && !ↂ.flag.preg.kickA) || (ↂ.pc.status.wombB.preg && !ↂ.flag.preg.kickB)) {
          const per = (ↂ.flag.preg.firstKick) ? 40 : 65;
          const growA = ↂ.pc.status.wombA.growth;
          const growB = ↂ.pc.status.wombB.growth;
          if (growA > per || growB > per) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        if (!ↂ.flag.preg.kickA && ↂ.pc.status.wombA.growth > ↂ.pc.status.wombB.growth) {
          ↂ.flag.preg.kickA = true;
        } else {
          ↂ.flag.preg.kickB = true;
        }
        setup.dialog("Baby's First Kick", "<<include[[BabyFirstKick]]>>");
      },
    },
    {
      name: "PregnancyCraving",
      odds: 150,
      output: "dialog",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
          const growA = ↂ.pc.status.wombA.growth;
          const growB = ↂ.pc.status.wombB.growth;
          if ((growA > 30 && growA < 86) || (growB > 30 && growB < 86)) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        setup.dialog("Food Craving", "<<include[[PregnancyCravings]]>>");
      },
    },
    {
      name: "PregnancyHorny",
      odds: 100,
      output: "dialog",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
          const growA = ↂ.pc.status.wombA.growth;
          const growB = ↂ.pc.status.wombB.growth;
          if (growA > 49 || growB > 49) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        aw.L();
        if (ↂ.pc.status.arousal < 6) {
          ↂ.pc.status.arousal = 6;
        } else {
          ↂ.pc.status.arousal += 1;
        }
        aw.S("pc");
        setup.dialog("Pregnancy Arousal", "<<include[[PregnancyHorny]]>>");
      },
    },
    {
      name: "PregnancyActive",
      odds: 75,
      output: "dialog",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
          const growA = ↂ.pc.status.wombA.growth;
          const growB = ↂ.pc.status.wombB.growth;
          if (growA > 74 || growB > 74) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        aw.L();
        if (ↂ.pc.status.arousal < 5) {
          ↂ.pc.status.arousal = 5;
        } else {
          ↂ.pc.status.arousal += 1;
        }
        ↂ.pc.status.health -= 2;
        setup.status.record("health", -2, "Pregnancy!");
        ↂ.pc.status.energy.amt -= 5;
        aw.S("pc");
        setup.status.tired(1, "Pregnancy");
        setup.dialog("Kicking Baby", "<<include[[PregnancyActive]]>>");
      },
    },
    {
      name: "residentialRoryBus",
      odds: 1500,
      output: "scene",
      lifetime: [0, [1, 1, 10, 2032]],
      region: ["residential"],
      condition() {
        // check
        if (setup.loliCheck()) {
          // more check
          if (aw.timeArray[2] > 5 && (aw.timeArray[1] > 9 && aw.timeArray[1] < 20)) {
            return true;
          } else if (aw.timeArray[2] < 6 && (aw.timeArray[1] > 14 && aw.timeArray[1] < 20)) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        try {
          this.odds = 100;
        } catch (e) {
          aw.con.warn(`NOTICE:\nAdjustment of event via this.property from event class action function ineffective.\nError ${e.name}: ${e.message}.`);
        }
        if (count < 3) {
          setup.time.add(5, {event: false});
          const sn = {
            passage: "GE_RoryBus",
            image: "IMG-roryIRL",
            sidebar: `<center><h3>${ↂ.map.name}</h3></center><br><<silly>><i>A wild sock collector appears!</i><</silly>>`,
            topImage: "IMG-RoryBus",
            title: "Free Candy: Rory Bus",
            allowSave: false,
            showTime: true,
            allowMenu: false,
          };
          setup.scenario.launch(sn);
        } else {
          aw.con.info(`~~~EVENT NOTICE~~~\nRory Event Count: ${count}\nEvent not performed`);
        }
      },
    },
    {
      name: "LilyIntroduction",
      odds: 0,
      output: "dialog",
      lifetime: [130560, 131440],
      repeat: false,
      region: ["any"],
      condition() {
        // check
        if (!State.active.variables.AW.startMale && random(1, 2) === 1) {
          return true;
        }
        return false;
      },
      action(count) {
        // effect
        ↂ.flag.main.female.firstText = true;
        aw.S("flag");
        setup.interact.launch({
          passage: "MSF-FirstText",
          block: false,
          npcid: "n101",
          title: "Strange Text Message",
          size: 3,
        });
        ↂ.buttons.FemLilyFirstMeeting = new CAB({
          id: "FemLilyFirstMeeting",
          text: "Meet with Lily",
          action: `<<addtime 24>><<run setup.scenario.launch({passage: "MSF-FirstMeeting", image: "IMG_NPC_Lily", title: "Meeting Dr. Richards", allowSave: true, showTime: true, allowMenu: true})>>`,
          cond: `if (aw.timeArray[1] > 16 && aw.timeArray[1] < 21 && aw.timeArray[2] !== 7){ return true;} return false;`,
          oneTime: true,
        });
        ↂ.flag.main.female.helpResp = setup.omni.new("questFail");
      },
    },
    {
      name: "MainQuestStart",
      odds: 0,
      output: "interact",
        lifetime: [147960, 151220],
      repeat: false,
      region: ["any"],
      condition() {
        // check
        if (!ↂ.flag.main.startText) {
          if (State.active.variables.AW.startMale) {
            return true;
          }
          if (ↂ.flag.main.female.metLily) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        ↂ.flag.main.startText = true;
        aw.S("flag");
        setup.interact.launch({
          passage: (State.active.variables.AW.startMale) ? "MSM-StartText" : "MSF-StartText",
          block: false,
          npcid: "n101",
          title: "Strange Text Message",
          size: 3,
        });
        ↂ.buttons.VisitingLilyHouse = new CAB({
          id: "VisitingLilyHouse",
          text: "Meet with Lily",
          action: `<<addTime 8>><<go "LilysPlace">>`,
          cond: `if (aw.timeArray[1] > 7 && aw.timeArray[1] <= 23 && aw.timeArray[2] > 5){ return true;} return false;`,
          oneTime: true,
        });
        if (!State.active.variables.AW.startMale) {
          ↂ.flag.main.omniKey = setup.omni.new("questFail", {duration: 3600});
        } else {
          ↂ.flag.main.omniKey = setup.omni.new("angryDM", {duration: 3600});
        }
      },
    },

    // Anenn Markup BFhome
    {
      name: "PregnancyHornyCrisis",
      odds: 100,
      output: "dialog",
      lifetime: [0, 0],
      repeat: true,
      region: ["homeT1", "homeT2", "homeT3", "homeT4", "homeT5"],
      condition() {
        // check
        if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
          const growA = ↂ.pc.status.wombA.growth;
          const growB = ↂ.pc.status.wombB.growth;
          if (growA > 49 || growB > 49) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        aw.L();
        if (ↂ.pc.status.arousal < 6) {
          ↂ.pc.status.arousal = 6;
        } else {
          ↂ.pc.status.arousal += 3;
        }
        aw.S("pc");
        setup.dialog("Pregnancy horny crisis", "<<include [[PregnancyHornyCrisis]]>>");
      },
    },

    {
      name: "cookingSpouse",
      odds: 100,
      output: "dialog",
      lifetime: [0, 0],
      repeat: true,
      region: ["homeT1", "homeT2", "homeT3", "homeT4", "homeT5", "BFhome"],
      condition() {
        // check
        if (!ↂ.flag.marriage.spouseAngry && State.variables.time[0] >= 19 && State.variables.location === "Home - Kitchen") {
          const _chance = either(true, false, false, false, false);

          if (_chance) { return true }
        }
        return false;
      },
      action(count) {
        setup.dialog("Special dinner", "<<include [[cookingSpouse]]>>");
      },
    },
    {
      name: "spouseGoingOutAsk",
      odds: 100,
      output: "dialog",
      lifetime: [0, 0],
      repeat: true,
      region: ["homeT1", "homeT2", "homeT3", "homeT4", "homeT5", "BFhome"],
      condition() {
        // check
        if (!ↂ.flag.marriage.spouseAngry && State.variables.time[0] >= 16) {
          const _chance = either(true, false, false, false, false);

          if (_chance) { return true }
        }
        return false;
      },
      action(count) {
        setup.dialog("Going out together?", "<<include [[spouseGoingOutAsk]]>>");
      },
    },
    {
      name: "spouseRelaxingCouch",
      odds: 100,
      output: "dialog",
      lifetime: [0, 0],
      repeat: true,
      region: ["homeT1", "homeT2", "homeT3", "homeT4", "homeT5", "BFhome"],
      condition() {
        // check
        if (!ↂ.flag.marriage.spouseAngry && State.variables.time[0] >= 16 && State.variables.location === "Home - Living Room") {
          const _chance = either(true, false, false, false, false);

          if (_chance) { return true }
        }
        return false;
      },
      action(count) {
        setup.dialog("Wanna join me?", "<<include [[spouseRelaxingCouch]]>>");
      },
    },
  ];
  for (const event of events) {
    event.category = "story";
    aw.event.story.push(new GameEvent(event));
  }
})(), 1000);

/* ██████ REFERENCE ██████
  name: string; // Name of the event, must be unique!
  category: "map" | "story" | "mechanic"; // category of the event.
  odds?: number; // x in 10,000 chance of occurring. 0 = not random
  lifetime?: [number | [number, number, number, number], number | [number, number, number, number]]; // game time that event is valid between. [start, end] 0 = no start or end valid time.
  repeat?: boolean; // if the event can be repeated, or if it's once only (default true, repeatable)
  priorEvent?: string | string[];  // required event or events that must have happened first. (default "none")
  interupt?: boolean; // interrupt event processing when this event occurs (default false)
  output?: string; // either "interact" or "scene" if one of those outputs is used, otherwise "none"
  omni?: string; // name of an omni that must be active for the event to run, or "none"
  region?: string | string[]; // name of game region that event can occur in (or "any"). checks either loc[1] if loc[0] is "world", or loc[0]. ex: ["residential", "downtown"]
  condition: string | (() => boolean); // function or stringified function assignment to check for event conditions.
  action: string | (() => void); // function or stringified function to run when event occurs. supplied argument num for number of times executed, starting with 1 the first time it runs.
*/

