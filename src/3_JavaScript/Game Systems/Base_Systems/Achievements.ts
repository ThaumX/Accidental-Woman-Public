
//         d8888          888      d8b
//        d88888          888      Y8P
//       d88P888          888
//      d88P 888  .d8888b 88888b.  888  .d88b.  888  888  .d88b.
//     d88P  888 d88P"    888 "88b 888 d8P  Y8b 888  888 d8P  Y8b
//    d88P   888 888      888  888 888 88888888 Y88  88P 88888888
//   d8888888888 Y88b.    888  888 888 Y8b.      Y8bd8P  Y8b.
//  d88P     888  "Y8888P 888  888 888  "Y8888    Y88P    "Y8888

// ======= INTERFACE ========

interface setupAchieve {
  new: (name: string) => boolean;
  unlock: (name: string) => boolean;
  isUnlocked: (name: string) => boolean;
  reset: (isSilent: "silent" | null) => void;
  load: () => void | Error;
  cleanNotification: () => void;
}

interface awAchieve {
  [propName: string]: {
    name: string;
    image: string;
    description: string;
  };
}
// NAMESPACE

if (aw.achieve == null) {
  aw.achieve = {} as any;
}
if (aw.unlocks == null) {
  aw.unlocks = {} as any;
}
if (setup.achieve == null) {
  setup.achieve = {} as any;
}

// ======= FUNCTIONS ========

// Add new achievement, display achievement popup if a new one
setup.achieve.new = function(name: string): boolean {
  const stored = setup.AW.localRestore("localAchieveList");
  if (stored == null || stored === "error") {
    aw.con.warn("Data recovery for setup.achieve.new did not function properly!");
  }
  let tempAchieveList;
  try {
    tempAchieveList = JSON.parse(atob(stored));
  } catch (e) {
    aw.con.error("parsing in setup.achieve.new()", e);
    tempAchieveList = [];
  }
  if (aw.achieve[name] === undefined || aw.achieve[name] === null) {
      return false;
  } else if (!tempAchieveList.includes(name)) { // TODO: Check for bs in the storage
    tempAchieveList.push(name);
    setup.AW.localStore("localAchieveList", btoa(JSON.stringify(tempAchieveList)));
    aw.append("#achieveDiv", `<div id="achievement" class="bounceInDown animated"><br>New achievement!<br><img data-passage="${aw.achieve[name].image}"><br>${aw.achieve[name].name}</div><<timed 3000ms>><<animexit "achievement" "bounceInDown" "bounceOutDown" "achieveDiv">><</timed>>`);
  }
  return true;
};

// Add new unlock if not already there
setup.achieve.unlock = function(name: string): boolean {
  const stored = setup.AW.localRestore("localUnlockList");
  if (stored == null || stored === "error") {
    aw.con.warn("Data recovery for setup.achieve.unlock did not function properly!");
    setup.achieve.reset("silent");
  }
  let tempUnlockList;
  try {
    tempUnlockList = JSON.parse(atob(stored));
  } catch (e) {
    aw.con.error("parsing in setup.achieve.unlock()", e);
    tempUnlockList = [];
  }
  if (!aw.unlocks.includes(name)) {
    return false;
  } else if (!tempUnlockList.includes(name)) { // TODO: Check for bs in the storage
    tempUnlockList.push(name);
    setup.AW.localStore("localUnlockList", btoa(JSON.stringify(tempUnlockList)));
    setup.notify("Unlocked " + name);
  }
  return true;
};

// Return true if item is unlocked, used for checks
setup.achieve.isUnlocked = function(name: string) {
  const data = setup.AW.localRestore("localUnlockList");
  if (data === "error") {
    // then data doesn't exist or is corrupt - reset it.
    setup.achieve.reset("silent");
    aw.con.info("Reset game state data as it was not discovered in local store (achieve.isUnlocked)");
    return false;
  }
  let tempUnlockList;
  try {
    tempUnlockList = JSON.parse(atob(data));
  } catch (e) {
    setup.achieve.reset("silent");
    aw.con.info("Reset game state data as it was old or corrupted. (achieve.isUnlocked)");
    tempUnlockList = [];
  }
  if (!tempUnlockList.includes(name)) {
    aw.con.info(name + " is NOT unlocked.");
    return false;
  } else {
    aw.con.info(name + " is unlocked.");
    return true;
  }
};

// Reset the player’s saved game data
setup.achieve.reset = function(isSilent: string|null): void {
  try {
    if (State.active.variables.gamestate === undefined || State.active.variables.gamestate === null) {
      State.active.variables.gamestate = {};
    }
    State.active.variables.gamestate.playedIntro = false;
    State.active.variables.gamestate.completePrologue = false;
    State.active.variables.gamestate.completeGame = false;
    State.active.variables.gamestate.points = 0;
    State.active.variables.gamestate.characters = 0;
    State.active.variables.gamestate.lastversion = "none";
    State.active.variables.gamestate.unlockTotal = 0;
    State.active.variables.gamestate.achieve = ["none"]; // just to clean up
    State.active.variables.gamestate.unlocks = ["none"]; // same
    State.active.variables.gamestate.devmsg = true;
    State.active.variables.gamestate.newPlayerMsg = true;
    setup.storeState();
    const localAchieveList = ["none"];
    const localUnlockList = ["none"];
    setup.AW.localStore("localUnlockList", btoa(JSON.stringify(localUnlockList)));
    setup.AW.localStore("localAchieveList", btoa(JSON.stringify(localAchieveList)));
    if (isSilent !== "silent") {
        UI.alert("Reset was greatly successful.");
    }
  } catch (e) {
    aw.con.error("setup.achieve.reset", e);
    return e;
  }
};

// Load achieves and unlocks
setup.achieve.load = function() {
  try {
    const tempA = setup.AW.localRestore("localAchieveList");
    const tempU = setup.AW.localRestore("localUnlockList");
    if (tempA === "error" || tempU === "error") {
      const localAchieveList = ["none"];
      const localUnlockList = ["none"];
      setup.AW.localStore("localUnlockList", btoa(JSON.stringify(localUnlockList)));
      setup.AW.localStore("localAchieveList", btoa(JSON.stringify(localAchieveList)));
      aw.con.warn("Achievements or unlocks gone corrupted or missing in local storage, making them from scratch.");
      State.active.variables.gamestate.achieve = ["none"];
      State.active.variables.gamestate.unlocks = ["none"];
    } else {
      State.active.variables.gamestate.achieve = JSON.parse(atob(tempA));
      State.active.variables.gamestate.unlocks = JSON.parse(atob(tempU));
    }
  } catch (e) {
    aw.con.error("setup.achieve.load", e);
    return e;
  }
};

// ======= MACROS =======

Macro.add("achieve", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
        return this.error("Achieve Macro requires a name of the achievement.");
    } else if ("string" !== typeof String(this.args)) {
        return this.error("Incorrect data type for achieve macro - string expected.");
    }
    const success = setup.achieve.new(String(this.args));
    if (!success) {
      return this.error(`Invalid achievement provided to <<achieve>> macro (${this.args[0]}).`);
    }
  },
});

Macro.add("unlock", { // uncock lol
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
        return this.error("Unlock Macro requires a value.");
    } else if ("string" !== typeof this.args[0]) {
        return this.error("Incorrect data type for unlock macro - string expected.");
    }
    const success = setup.achieve.unlock(String(this.args));
    if (!success) {
      return this.error(`Invalid unlock provided to <<unlock>> macro (${this.args[0]}).`);
    }
  },
});

// ======= SYSTEM DATA =======

aw.achieve = {
  prologue: {
    name: "Welcome to the city",
    image: "IMG-PrologueAch",
    description: "You finished the prologue. What happens next? It is up to you.",
  },
  sadFlowered: {
    name: "Sadflowered!",
    image: "IMG-TomfuckeryAch",
    description: "You've proved your baldness by annoying the fuck out of Lily. Way to go, social you!",
  },
  sperm: {
    name: "For science",
    image: "IMG-SpermAch",
    description: "You dedicated your life to research. What are you wearing under that labcoat?",
  },
  bCorps: {
    name: "For papers",
    image: "IMG-BcorpsAch",
    description: "You dedicated your life to the Institute Bureaucracy. Don't sit on the copier.",
  },
  serviceDivision: {
    name: "For mopping",
    image: "IMG-ServiceDivisionAch",
    description: "You dedicated your life to the serving. Pun intended.",
  },
  maid: {
    name: "Oh-la-la!",
    image: "IMG-MaidAch",
    description: "Don't forget to arch your back when moping the floors!",
  },
  tsar: {
    name: "Tsar juices",
    image: "IMG-TsarAch",
    description: "Super secret one. Besty is proud of you.",
  },
  boss: {
    name: "Becoming the boss",
    image: "IMG-BossAch",
    description: "One way or another you made it to the top, now show 'em who's the boss around here!",
  },
  skill100: {
    name: "Live and learn",
    image: "IMG-skill100Ach",
    description: "You was dedicated enough to rise one of the skills to the quite serious level.",
  },
  hairStyles: {
    name: "Gotta style them all!",
    image: "IMG-HairStylesAch",
    description: "You unlocked all the basic hair styles.",
  },
  pinCushion: {
    name: "Pincushion",
    image: "IMG-pinCushionAch",
    description: "Seems like you are really into piercings. Or pain. Or both? We're not judging.",
  },
  mooHucow: {
    name: "Moo hucow",
    image: "IMG-MooHucowAch",
    description: "Your milk production was prodigeous enough to rival a hucow.",
  },
  titsExhibi: {
    name: "Show them the sun",
    image: "IMG-TitsExhibiAch",
    description: "To celebrate your first public topless encounter.",
  },
  fullExhibi: {
    name: "No restrictions",
    image: "IMG-FullExhibiAch",
    description: "You were daring enough to be completely naked in public, impressive.",
  },
  firstPreggo: {
    name: "Something in there",
    image: "IMG-FirstPreggoAch",
    description: "You got pregnant for the very first time.",
  },
  repopulation: {
    name: "Repopulation",
    image: "IMG-RepopulationAch",
    description: "You successfully delivered 5 babies. That's quite a crowd already!",
  },
  broodMother: {
    name: "Brood mother",
    image: "IMG-BroodMotherAch",
    description: "You successfully delivered 20 babies! Don't you feel a little sore down there?",
  },
  threesome: {
    name: "Threesome!",
    image: "IMG-ThreesomeAch",
    description: "The more the merrier!",
  },
  orgymaster: {
    name: "Orgy master",
    image: "IMG-OrgyMasterAch",
    description: "Keeping ten people busy at once is hard work.",
  },
  hoeing: {
    name: "Hoeing",
    image: "IMG-PlaceholderAch",
    description: "That was some easy money. Want another client?",
  },
  died: {
    name: "Goodnight, sweetheart",
    image: "IMG-DiedAch",
    description: "Seems like you failed at life... Literally.",
  },
  p2771: {
    name: "Vote Yes for Prop 2771",
    image: "IMG-P2771Ach",
    description: "Successfully propositioned Lily. Oh yeah.",
  },
  inconsiderate: {
    name: "Inconsiderate",
    image: "IMG-InconsiderateAch",
    description: "Never considered your best friend's feelings.",
  },
  megaMilk: {
    name: "Mega milk",
    image: "IMG-MegaMilkAch",
    description: "Discovered the tits door code.",
  },
  megaFertile: {
    name: "Mega Fertile",
    image: "IMG-MegaEggsAch",
    description: "Discovered the eggs door code.",
  },
  megaWet: {
    name: "Mega Wet",
    image: "IMG-MegaWetAch",
    description: "Discovered the cunt door code.",
  },
  weegirl: {
    name: "Wee girl",
    image: "IMG-MegaWetAch",
    description: "You have closed 20 vents in the Weegirl minigame which is 30% better than Besty's best!",
  },
  lucky: {
    name: "Lucky",
    image: "IMG-LuckyAch",
    description: "Sometimes wishes come true.",
  },
  chainBanged: {
    name: "Chain Banged",
    image: "IMG_chainBangedAch",
    description: "Ended up as a prison pacifier.",
  },
  spelunker: {
    name: "Spelunker",
    image: "IMG-SpelunkerAch",
    description: "Escaped Hoden Cavern with your life.",
  },
  indianaJones: {
    name: "Indiana Jones",
    image: "IMG-IndianaJonesAch",
    description: "Collected both relics in Hoden Cavern.",
  },
  doubleDead: {
    name: "Double Dead",
    image: "IMG-DiedTwiceAch",
    description: "Died twice in the female prologue.",
  },
  worstFriend: {
    name: "Worst Friend",
    image: "IMG-WorstFriendAch",
    description: "Being the worst-possible friend in the male prologue.",
  },
  heartbreaker: {
    name: "Heartbreaker",
    image: "IMG-HeartbreakerAch",
    description: "You finally won Lily's heart, only to break it.",
  },
  sparky: {
    name: "Sparky",
    image: "IMG-SparkyAch",
    description: "You were tasered by Lily's door defense system.",
  },
  jehovah: {
    name: "Jehovah's Witness",
    image: "IMG-JehovahAch",
    description: "You really like showing up randomly at people's front door.",
  },
  killer: {
    name: "Till death do us part",
    image: "IMG-KillerAch",
    description: "You murdered your first NPC.",
  },
};
aw.unlocks = ["Prologue skip", "Mega Tits", "Mega Fertile", "Mega Wet", "FemaleQuickStart", "contentMessage"];
