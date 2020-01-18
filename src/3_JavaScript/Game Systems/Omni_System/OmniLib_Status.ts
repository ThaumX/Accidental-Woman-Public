
//   .d88888b.  888b     d888 888b    888 8888888      888      d8b 888
//  d88P" "Y88b 8888b   d8888 8888b   888   888        888      Y8P 888
//  888     888 88888b.d88888 88888b  888   888        888          888
//  888     888 888Y88888P888 888Y88b 888   888        888      888 88888b.
//  888     888 888 Y888P 888 888 Y88b888   888        888      888 888 "88b
//  888     888 888  Y8P  888 888  Y88888   888  88888 888      888 888  888
//  Y88b. .d88P 888   "   888 888   Y8888   888        888      888 888 d88P
//   "Y88888P"  888       888 888    Y888 8888888      88888888 888 88888P"

//  LIBRARY OF REUSABLE OMNI EVENTS

//  ███████╗████████╗ █████╗ ████████╗██╗   ██╗███████╗
//  ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║   ██║██╔════╝
//  ███████╗   ██║   ███████║   ██║   ██║   ██║███████╗
//  ╚════██║   ██║   ██╔══██║   ██║   ██║   ██║╚════██║
//  ███████║   ██║   ██║  ██║   ██║   ╚██████╔╝███████║
//  ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝

if (setup.omnItems == null) {
  setup.omnItems = {} as IsetupOmnItems;
}

setup.omnItems.alcohol = {
  name: "alcohol",
  type: "recurring",
  output: "notify",
  interval: 60,
  times: 3,
  icon: "none",
  run: `if (random(1, 3) > 2) {
      setup.status.happy(1, "Glorious alcohol");
      setup.notify("Booze made you feel happy.");
      aw.S("pc");
    }`,
};

setup.omnItems.scared = {
  name: "Scared",
  type: "single",
  output: "none",
  duration: 60,
  icon: "IMGstatus_Scared",
  text: "You are seriously scared.",
  run: "",
};

setup.omnItems.cumMouth = {
  name: "Cum Breath",
  type: "single",
  output: "none",
  duration: 60,
  icon: "IMGstatus_CumMouth",
  text: "You can still taste the jizz.",
  run: "",
};

setup.omnItems.soreButt = {
  name: "Sore butt",
  type: "single",
  output: "none",
  duration: 1800,
  icon: "IMGstatus_Injured",
  text: "You feel your butt ache.",
  run: "",
};

setup.omnItems.sorePuss = {
  name: "Sore Pussy",
  type: "single",
  output: "none",
  duration: 1800,
  icon: "IMGstatus_Injured",
  text: "You feel your pussy ache.",
  run: "",
};

setup.omnItems.creamPie = {
  name: "Semen in Vagina",
  type: "recurring",
  output: "none",
  times: 3,
  interval: 60,
  icon: "IMGstatus_CumVag",
  text: "Your pussy has cum in it",
  run: `aw.L("pc");
    if (this.times > 0) {
      setup.fert.spread("pc", "out");
    } else if (this.times < 1) {
      setup.fert.spread("pc", "time");
    }
    aw.S("pc");`,
};

setup.omnItems.creamVulva = {
  name: "Semen on Vulva",
  type: "recurring",
  output: "none",
  times: 3,
  interval: 60,
  run: `aw.L("pc");
    if (this.times > 0) {
      setup.fert.spread("pc", "out");
    } else if (this.times < 1) {
      setup.fert.spread("pc", "time");
    }
    aw.S("pc");`,
};
