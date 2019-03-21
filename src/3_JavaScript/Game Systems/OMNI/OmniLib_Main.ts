
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
  type: "recurring",
  output: "none",
  times: 6,
  interval: 120,
  icon: "IMGstatus_DeathSick",
  text: "You may die soon...",
  run: `if (ↂ.flag.badEnd !== "none") { setup.badEnd(ↂ.flag.badEnd); }`,
};



