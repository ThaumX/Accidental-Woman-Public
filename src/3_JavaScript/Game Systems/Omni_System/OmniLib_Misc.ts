
//   .d88888b.  888b     d888 888b    888 8888888      888      d8b 888
//  d88P" "Y88b 8888b   d8888 8888b   888   888        888      Y8P 888
//  888     888 88888b.d88888 88888b  888   888        888          888
//  888     888 888Y88888P888 888Y88b 888   888        888      888 88888b.
//  888     888 888 Y888P 888 888 Y88b888   888        888      888 888 "88b
//  888     888 888  Y8P  888 888  Y88888   888  88888 888      888 888  888
//  Y88b. .d88P 888   "   888 888   Y8888   888        888      888 888 d88P
//   "Y88888P"  888       888 888    Y888 8888888      88888888 888 88888P"

//  LIBRARY OF REUSABLE OMNI EVENTS

//  ███╗   ███╗██╗███████╗ ██████╗
//  ████╗ ████║██║██╔════╝██╔════╝
//  ██╔████╔██║██║███████╗██║
//  ██║╚██╔╝██║██║╚════██║██║
//  ██║ ╚═╝ ██║██║███████║╚██████╗
//  ╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝

if (setup.omnItems == null) {
  setup.omnItems = {} as IsetupOmnItems;
}

setup.omnItems.prairieOysters = {
  name: "Prairie Oysters",
  type: "condition",
  output: "none", // prologue, limited potential for interference
  duration: 1440,
  timeArray: 10,
  icon: "IMGstatus_Balls",
  text: "The succulent meal has lasting effects.",
  run: `if (random(1, 3) > 1) {
      aw.L("pc");
      ↂ.pc.status.addict.cum += 1;
      aw.S("pc");
      if (random(1,2) === 2){
        setup.notify("Your mind drifts back to the delicious flavor of those prairie oysters.");
      }
    }`,
};

setup.omnItems.babyHypno = {
  name: "Hypnotics-CP1",
  type: "recurring",
  output: "none",
  times: 12,
  interval: 120,
  icon: "IMGstatus_Hypno",
  text: "Your mind feels a little floaty, and drifts to certain cravings.",
  run: `aw.L("pc");
    const x = (ↂ.pc.kink.pregnancy) ? 3 : 2;
    ↂ.flag.omni.creamHypno += 1;
    ↂ.pc.status.addict.cream += random(1, x);
    ↂ.pc.status.addict.creamNeed += random(1, x);
    if (ↂ.flag.omni.creamHypno > 29 && !ↂ.pc.kink.risky || ↂ.pc.status.addict.cream >= 40) {
      ↂ.pc.kink.risky = true;
    }
    if (ↂ.flag.omni.creamHypno > 29 && !ↂ.pc.kink.pregnancy) {
      ↂ.pc.kink.risky = (random(1, 4) === 4) ? true : false;
    }
    aw.S("pc");
    if (random(1, 4) === 4) {
      setup.notify("You have a hungry hollow feeling in your abdomen.");
    }`,
};

setup.omnItems.rejuvSickness = {
  name: "Rejuvenator Sickness",
  type: "condition",
  output: "none",
  duration: 3400,
  timeArray: 8,
  icon: "IMGstatus_RejSickness",
  text: "You are recovering from the effects of the accident",
  run: `if (random(1, 3) > 1) {
      aw.L("pc");
      const hl = random(3, 5) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "Rejuvenator Sickness");
      aw.S("pc");
      setup.status.tired(1, "Rejuvenator Sickness");
    }`,
};

setup.omnItems.pussyBot = {
  name: "UnkN0wN",
  type: "recurring",
  output: "none",
  times: 33,
  interval: 360,
  icon: "IMGstatus_MicroBot",
  text: "ERR0rin-s93sKaf9sdsSs7fhsDSFO: F0re1gn 1T3m d3T3KteD",
  run: `if (random(1, 3) > 1) {
      aw.L("pc");
      const hl = random(1, 2) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "UnkN0wN Pussy Bot");
      aw.S("pc");
    }`,
};

setup.omnItems.keysBelt = {
  name: "keysBelt",
  type: "single",
  output: "none",
  duration: 6100,
  icon: "none",
  run: `if (random(0,10) > 8) {
    ↂ.flag.sendKeyReturned[0] == true;
  } else {
    ↂ.flag.sendKeyLost[0] == true;
  }
  as.S();`,
};

setup.omnItems.keysPlate = {
  name: "keysPlate",
  type: "single",
  output: "none",
  duration: 5900,
  icon: "none",
  run: `if (random(0,10) > 8) {
    ↂ.flag.sendKeyReturned[1] == true;
  } else {
    ↂ.flag.sendKeyLost[1] == true;
  }
  as.S();`,
};

setup.omnItems.keysClit = {
  name: "keysClit",
  type: "single",
  output: "none",
  duration: 5750,
  icon: "none",
  run: `if (random(0,10) > 8) {
    ↂ.flag.sendKeyReturned[2] == true;
  } else {
    ↂ.flag.sendKeyLost[2] == true;
  }
  as.S();`,
};


setup.omnItems.keysShortage = {
  name: "keysShortage",
  type: "single",
  output: "none",
  duration: 7750,
  icon: "none",
  run: `
  ↂ.flag.sendKeyLost[0] = false;
  ↂ.flag.sendKeyLost[1] = false;
  ↂ.flag.sendKeyLost[2] = false;
  as.S();`,
};


setup.omnItems.hannaAsksForMore = {
  name: "hannaAsksForMore",
  type: "single",
  output: "none",
  duration: 11622,
  icon: "none",
  run: `setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "Hannaasks", npcid: "n1014", content: '', block: true, title: "Phone message", size: 3});
    aw.S();`,
};

setup.omnItems.hannaInTroubles = {
  name: "hannaInTroubles",
  type: "single",
  output: "none",
  duration: 11622,
  icon: "none",
  run: `setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "hannaInTroublesText", npcid: "n1014", content: '', block: false, title: "Phone message", size: 3});
    aw.mapNPC.downtown.club.n1014.cond = function() { return false };
    aw.S();`,
};

setup.omnItems.hannaDeathCounter = {
  name: "hannaDeathCounter",
  type: "single",
  output: "none",
  duration: 600,
  icon: "none",
  run: `
  ↂ.flag.hannaStory.stage = "died"
  delete aw.npc["n1014"];
  aw.S();
  `,
};

setup.omnItems.heartBroken = {
  name: "Heartbroken",
  type: "single",
  output: "none",
  duration: 2880,
  icon: "IMGstatus_BrokenHeart",
  text: "You feel Heartbroken.",
  run: `
  `,
};

setup.omnItems.love = {
  name: "Love",
  type: "single",
  output: "none",
  duration: 2880,
  icon: "IMGstatus_Love",
  text: "You are in love!",
  run: `
  `,
};

setup.omnItems.hannaReturnsMoney = {
  name: "hannaReturnsMoney",
  type: "single",
  output: "none",
  duration: 21522,
  icon: "none",
  run: `
  setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "hannaReturnsMoney", npcid: "n1014", content: "", block: false, title: "Phone message", size: 3});
    aw.mapNPC.downtown.club.n1014.cond = function() { return false };
    aw.S();
  `,
};

setup.omnItems.phoenixAnswer = {
  name: "phoenixAnswer",
  type: "single",
  output: "none",
  duration: 2605,
  icon: "none",
  run: `
    let timeo = (setup.time.dateToVal(State.active.variables.date) + 200);
    setup.sched.new("Phoenix Nest", "reminder", true, timeo, false, false, false, true, false, "You was invited to your first Phoenix club meeting!", "Book club meeting");
    ↂ.flag.bookClub.timeOpen = timeo;
    setup.interact.launch({passage: "PhoenixInvite", npcid: "none", content: "", block: false, title: "Phone message", size: 3});
    aw.S();
  `,
};

setup.omnItems.phoenixPartyCall = {
  name: "phoenixPartyCall",
  type: "single",
  output: "none",
  duration: 9800,
  icon: "none",
  run: `
    let timeo = (setup.time.dateToVal(State.active.variables.date) + 200);
    setup.sched.new("Phoenix Nest", "reminder", true, timeo, false, false, false, true, false, "You was invited to your first Phoenix club meeting!", "Book club meeting");
    ↂ.flag.bookClub.timeOpen = timeo;
    setup.interact.launch({passage: "PhoenixSecondInvite", npcid: "none", content: "", block: false, title: "Phone message", size: 3});
    aw.S();
  `,
};

setup.omnItems.IRcooldown = {
  name: "IRcooldown",
  type: "single",
  output: "none",
  duration: 1200,
  icon: "none",
  run: `
  ↂ.flag.main.IrCooldown = true;
  aw.S();
  `,
};

setup.omnItems.olegProblems = {
  name: "olegProblems",
  type: "single",
  output: "interact",
  duration: 4000,
  icon: "none",
  run: `
  setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "Oleg-Problems", npcid: "none", content: "", block: false, title: "Phone message", size: 3});
    ↂ.flag.main.capacitorStage[0] = "warned";
    aw.S();
  `,
};

setup.omnItems.olegProblems2 = {
  name: "olegProblems2",
  type: "single",
  output: "interact",
  duration: 8300,
  icon: "none",
  run: `
  setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "Oleg-Problems-two", npcid: "none", content: "", block: false, title: "Phone message", size: 3});
    ↂ.flag.main.capacitorStage[0] = "warned";
    aw.S();
  `,
};

setup.omnItems.olegProblems3 = {
  name: "olegProblems3",
  type: "single",
  output: "none",
  duration: 12620,
  icon: "none",
  run: `
  setup.badEnd("psycho");
  `,
};

setup.omnItems.ladyWoods = {
  name: "Lady of the Woods",
  type: "recurring",
  output: "notify",
  times: 18,
  interval: 120,
  icon: "IMGstatus_LadyWoods",
  text: "You keep thinking of the Lady with happy floaty feelings.",
  run: `
    setup.status.stress(-5, "Aftereffect: Giving birth for the Lady of the Woods");
    setup.status.happy(1, "Aftereffect: Giving birth for the Lady of the Woods")
    let ntxt = either("I really want to visit the Lady again", "The Lady was so gentle but it felt SO GOOD.", "I hope next time I can give the Lady a child.", "Just remembering the Lady makes me feel good!", "The Lady has me floating on a cloud...", "I can't wait to visit the Lady again!", "I really miss the Lady, I must visit soon!");
    setup.notify(ntxt);
    `,
};
