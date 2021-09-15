
//   .d88888b.  888b     d888 888b    888 8888888      888      d8b 888
//  d88P" "Y88b 8888b   d8888 8888b   888   888        888      Y8P 888
//  888     888 88888b.d88888 88888b  888   888        888          888
//  888     888 888Y88888P888 888Y88b 888   888        888      888 88888b.
//  888     888 888 Y888P 888 888 Y88b888   888        888      888 888 "88b
//  888     888 888  Y8P  888 888  Y88888   888  88888 888      888 888  888
//  Y88b. .d88P 888   "   888 888   Y8888   888        888      888 888 d88P
//   "Y88888P"  888       888 888    Y888 8888888      88888888 888 88888P"

//  LIBRARY OF REUSABLE OMNI EVENTS

//  ███╗   ███╗ █████╗ ██╗███╗   ██╗
//  ████╗ ████║██╔══██╗██║████╗  ██║
//  ██╔████╔██║███████║██║██╔██╗ ██║
//  ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
//  ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
//  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

if (setup.omnItems == null) {
  setup.omnItems = {} as IsetupOmnItems;
}


// Omni Item Flag Interface - for tracking data about ongoing or multiple events.
// Use appropriate ↂ.flag location when possible.
interface IntFlagOmni {
  creamHypno: number; // tracker for creampie encouraging hypno effects to add preg kink.
  kukragene: number;
}

setup.omnItems.wombAbirth = {
  name: "Giving Birth WombA",
  type: "single",
  output: "scenario", // because takes out of normal play
  duration: 600,
  icon: "none",
  run: `setup.time.add(random(10, 20));
    if (ↂ.flag.challengeMode === "beth" || ↂ.flag.challengeMode === "mary" || ↂ.flag.challengeMode === "marge") {
      setup.omni.new("pregnancyTimer");
      setup.omni.new("pregnancyTimerWarn");
    };
    const opt = {
      passage: "GivingBirthScenarioA",
      content: "",
      image: "IMG-PregnantSidebar",
      topImage: "IMG-ArborVitaeBanner",
      title: "Delivering Babies",
      allowSave: false,
      sidebar: "<h2>Arbor Vitae</h2><h3>Maternity Ward</h3>",
      showTime: true,
      allowMenu: false,
    };
    setTimeout(() => setup.map.nav("residential", "medical", "main"), 100);
    setup.scenario.launch(opt);`,
};

setup.omnItems.questFail = {
  name: "QuestFail",
  type: "single",
  output: "scenario", // because takes out of normal play
  duration: 4500,
  icon: "none",
  run: `setup.badEnd("questFail");`,
};

setup.omnItems.angryDM = {
  name: "angryDM",
  type: "single",
  output: "scenario", // because takes out of normal play
  duration: 4500,
  icon: "none",
  run: `setup.badEnd("sacrifice");`,
};

setup.omnItems.wombBbirth = {
  name: "Giving Birth WombB",
  type: "single",
  output: "scenario", // because takes out of normal play
  duration: 600,
  icon: "none",
  run: `setup.time.add(random(10, 20));
    const opt = {
      passage: "GivingBirthScenarioB",
      content: "",
      image: "IMG-PregnantSidebar",
      topImage: "IMG-ArborVitaeBanner",
      title: "Delivering Babies",
      allowSave: false,
      sidebar: "<h2>Arbor Vitae</h2><h3>Maternity Ward</h3>",
      showTime: true,
      allowMenu: false,
    };
    setTimeout(() => setup.map.nav("residential", "medical", "main"), 100);
    setup.scenario.launch(opt);`,
};

setup.omnItems.doomClock = {
  name: "Doom Clock",
  type: "single",
  output: "none",
  interval: 480,
  icon: "none",
  text: "You may die soon...",
  run: `if (ↂ.flag.badEnd !== "none") { setup.badEnd(ↂ.flag.badEnd); }`,
};

setup.omnItems.unemployed1 = {
  name: "Unemployed1",
  type: "single",
  output: "dialog",
  duration: 720,
  icon: "none",
  run: `setup.dialog("Unemployment Reminder","<<include [[UnemploymentRemindOne]]>>");`,
};

setup.omnItems.unemployed2 = {
  name: "Unemployed2",
  type: "single",
  output: "dialog",
  duration: 720,
  icon: "none",
  run: `setup.dialog("Unemployment Reminder","<<include [[UnemploymentRemindTwo]]>>");`,
};

setup.omnItems.unemployed3 = {
  name: "Unemployed3",
  type: "single",
  output: "dialog",
  duration: 600,
  icon: "none",
  run: `setup.badEnd("unemployed");`,
};

setup.omnItems.killer = {
  name: "killer",
  type: "single",
  output: "dialog",
  duration: 5760,
  icon: "none",
  run: `setup.badEnd("killer");`,
};

setup.omnItems.pregnancyTimer = {
  name: "pregnancyTimer",
  type: "single",
  output: "none",
  duration: 172800,
  icon: "none",
  run: `setup.badEnd("challenge");`,
};

setup.omnItems.pregnancyTimerWarn = {
  name: "pregnancyTimerWarn",
  type: "single",
  output: "dialog",
  duration: 21600,
  icon: "none",
  run: `if (!ↂ.pc.status.wombA.preg || !ↂ.pc.status.wombB.preg) {setup.dialog("Challenge warning","Your body kindly reminds you of the need to get pregnant as soon as possible because of your mutation with a slight itch.") };`,
};

setup.omnItems.weddingDiscussion = {
  name: "weddingDiscussion",
  type: "single",
  output: "dialog",
  duration: 4000,
  icon: "none",
  run: `
  if (ↂ.flag.marriage.discussion.inProgress) {
   setup.interact.status.npc = ↂ.flag.marriage.npc;
    setup.interact.launch({passage: "timeToDiscuss", npcid: ↂ.flag.marriage.npc, content: "", block: false, title: "Phone message", size: 3});
    aw.S();
  }
  `,
};
