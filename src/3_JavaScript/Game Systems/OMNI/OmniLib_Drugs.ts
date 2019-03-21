
//   .d88888b.  888b     d888 888b    888 8888888      888      d8b 888
//  d88P" "Y88b 8888b   d8888 8888b   888   888        888      Y8P 888
//  888     888 88888b.d88888 88888b  888   888        888          888
//  888     888 888Y88888P888 888Y88b 888   888        888      888 88888b.
//  888     888 888 Y888P 888 888 Y88b888   888        888      888 888 "88b
//  888     888 888  Y8P  888 888  Y88888   888  88888 888      888 888  888
//  Y88b. .d88P 888   "   888 888   Y8888   888        888      888 888 d88P
//   "Y88888P"  888       888 888    Y888 8888888      88888888 888 88888P"

//  LIBRARY OF REUSABLE OMNI EVENTS

//  ██████╗ ██████╗ ██╗   ██╗ ██████╗ ███████╗
//  ██╔══██╗██╔══██╗██║   ██║██╔════╝ ██╔════╝
//  ██║  ██║██████╔╝██║   ██║██║  ███╗███████╗
//  ██║  ██║██╔══██╗██║   ██║██║   ██║╚════██║
//  ██████╔╝██║  ██║╚██████╔╝╚██████╔╝███████║
//  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝

if (setup.omnItems == null) {
  setup.omnItems = {} as IsetupOmnItems;
}

setup.omnItems.roboThroat = {
  name: "RoboThroat",
  type: "single",
  output: "none",
  duration: 180,
  icon: "IMGstatus_Drug",
  text: "You are under the effect of RoboThroat. Oral skill + 15, cannibalism skill + 5.",
  run: `setup.status.tired(1);
    ↂ.flag.tempSkillBoost.oral -= 15;
    ↂ.skill.comm -= random(0, 1);
    ↂ.flag.tempSkillBoost.comm += 5;
    aw.S();`,
};

setup.omnItems.roboThroatCannibal = {
  name: "RoboThroat",
  type: "single",
  output: "none",
  duration: 180,
  icon: "IMGstatus_Drug",
  text: "You are under the effect of RoboThroat. Cannibalism skill + 5.",
  run: `setup.status.tired(1);
    ↂ.skill.comm -= (random(0, 1) + random(0, 1));
    ↂ.flag.tempSkillBoost.comm += 5;
    aw.S();`,
};

setup.omnItems.cumquat = {
  name: "Cumquat",
  type: "recurring",
  output: "notify",
  times: 3,
  interval: 120,
  icon: "IMGstatus_Drug",
  text: "You feel warmth from eating the cumquat.",
  run: `
    setup.status.arousal(2);
    let msg = "You feel burst of arousal";
    if (this.times === 0 && random(1,10) === 1) {
      aw.L("pc");
      ↂ.pc.trait.libido += 1;
      aw.S("pc");
      msg = "@@.change;You suspect that the fruit worked a bit too hard on you.@@"
    }
    setup.notify(msg);`,
};

setup.omnItems.cumquatBoost = {
  name: "Sex boost",
  type: "single",
  output: "none",
  duration: 360,
  icon: "IMGstatus_SkillUp",
  text: "You feel more confident with your sex skills",
  run: `ↂ.flag.tempSkillBoost.sex -= 5;`,
};
