
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
  name: "Rejuvinator Sickness",
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
      setup.status.record("health", hl, "Rejuvinator Sickness");
      aw.S("pc");
      setup.status.tired(1, "Rejuvinator Sickness");
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

