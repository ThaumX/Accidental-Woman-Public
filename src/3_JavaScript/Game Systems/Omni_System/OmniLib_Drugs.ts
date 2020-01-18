
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
  run: `setup.status.tired(1, "Side effect of RoboThroat");
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
  run: `setup.status.tired(1, "Side effect of RoboThroat");
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
  run: `ↂ.flag.tempSkillBoost.sex += 5;`,
};

setup.omnItems.FocusTablet40 = {
  name: "Focus",
  type: "recurring",
  output: "notify",
  times: 3,
  interval: 140,
  icon: "IMGstatus_Focus",
  text: "You feel concentrated, confident and smart. Everything is easy.",
  run: `
  aw.L("pc");
  let usedTo = (Math.round((ↂ.pc.status.addict.focus * 0.1) - random(0,2)));
  if (usedTo < 1) {usedTo = 0}
  let msg = "You feel the effects of Focus";
  if (this.times === 3) {
    ↂ.pc.trait.will++;
    ↂ.flag.tempSkillBoost.org += (random(1, 5) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(1, 5) - usedTo);
    msg = "@@.change;Everything is easy, and you are sure in your abilities.@@"
  }
  if (this.times === 2) {
    ↂ.pc.trait.will++;
    ↂ.flag.tempSkillBoost.org += (random(3, 15) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(3, 15) - usedTo);
    msg = "@@.change;Calm and control feeling is overwhelming, you can achieve anything.@@"
  }
  if (this.times === 1) {
    ↂ.flag.tempSkillBoost.org += (random(3, 7) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(3, 7) - usedTo);
    msg = "@@.change;Is there anything you are not capable of dealing with? Probably not.@@"
  }
  if (ↂ.flag.tempSkillBoost.org < 1) {ↂ.flag.tempSkillBoost.org += 3};
  if (ↂ.flag.tempSkillBoost.probSolving < 1) {ↂ.flag.tempSkillBoost.probSolving += 3};
  if (this.times === 0) {
    ↂ.pc.trait.will = ↂ.flag.BackupTraits.will;
    ↂ.flag.tempSkillBoost.org = 0;
    ↂ.flag.tempSkillBoost.probSolving = 0;
    msg = "@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@"
  }
  setup.notify(msg);
  aw.S("pc");
  `,
};

setup.omnItems.FocusVial40 = {
  name: "Focus",
  type: "recurring",
  output: "notify",
  times: 3,
  interval: 140,
  icon: "IMGstatus_Focus",
  text: "You feel concentrated, confident and smart. Everything is easy.",
  run: `
  aw.L("pc");
  let usedTo = (Math.round((ↂ.pc.status.addict.focus * 0.1) - random(0,2)));
  if (usedTo < 1) {usedTo = 0}
  let msg = "You feel the effects of Focus";
  if (this.times === 3) {
    ↂ.pc.trait.will++;
    ↂ.flag.tempSkillBoost.org += (random(3, 15) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(3, 15) - usedTo);
    msg = "@@.change;Everything is easy, and you are sure in your abilities.@@"
  }
  if (this.times === 2) {
    ↂ.pc.trait.will++;
    ↂ.flag.tempSkillBoost.org += (random(3, 7) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(3, 7) - usedTo);
    msg = "@@.change;Calm and control feeling is overwhelming, you can achieve anything.@@"
  }
  if (this.times === 1) {
    ↂ.flag.tempSkillBoost.org += (random(1, 5) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(1, 5) - usedTo);
    msg = "@@.change;Is there anything you are not capable of dealing with? Probably not.@@"
  }
  if (ↂ.flag.tempSkillBoost.org < 1) {ↂ.flag.tempSkillBoost.org += 3};
  if (ↂ.flag.tempSkillBoost.probSolving < 1) {ↂ.flag.tempSkillBoost.probSolving += 3};
  if (this.times === 0) {
    ↂ.pc.trait.will = ↂ.flag.BackupTraits.will;
    ↂ.flag.tempSkillBoost.org = 0;
    ↂ.flag.tempSkillBoost.probSolving = 0;
    msg = "@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@"
  }
  setup.notify(msg);
  aw.S("pc");
  `,
};

setup.omnItems.FocusVial80 = {
  name: "Focus",
  type: "recurring",
  output: "notify",
  times: 3,
  interval: 140,
  icon: "IMGstatus_Focus",
  text: "You feel concentrated, confident and smart. Everything is easy.",
  run: `
  aw.L("pc");
  let usedTo = (Math.round((ↂ.pc.status.addict.focus * 0.1) - random(0,2)));
  if (usedTo < 1) {usedTo = 0}
  let msg = "You feel the effects of Focus";
  if (this.times === 3) {
    ↂ.pc.trait.will++;
    ↂ.flag.tempSkillBoost.org += (random(6, 30) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(6, 30) - usedTo);
    msg = "@@.change;Everything is easy, and you are sure in your abilities.@@"
  }
  if (this.times === 2) {
    ↂ.pc.trait.will++;
    ↂ.flag.tempSkillBoost.org += (random(6, 14) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(6, 14) - usedTo);
    msg = "@@.change;Calm and control feeling is overwhelming, you can achieve anything.@@"
  }
  if (this.times === 1) {
    ↂ.flag.tempSkillBoost.org += (random(2, 10) - usedTo);
    ↂ.flag.tempSkillBoost.probSolving += (random(2, 10) - usedTo);
    msg = "@@.change;Is there anything you are not capable of dealing with? Probably not.@@"
  }
  if (this.times === 0) {
    ↂ.pc.trait.will = ↂ.flag.BackupTraits.will;
    ↂ.flag.tempSkillBoost.org = 0;
    ↂ.flag.tempSkillBoost.probSolving = 0;
    msg = "@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@"
  }
  if (ↂ.flag.tempSkillBoost.org < 1) {ↂ.flag.tempSkillBoost.org += 3};
  if (ↂ.flag.tempSkillBoost.probSolving < 1) {ↂ.flag.tempSkillBoost.probSolving += 3};
  setup.notify(msg);
  aw.S("pc");
  `,
};

setup.omnItems.ZoneBottle1 = {
  name: "Zone",
  type: "recurring",
  output: "notify",
  times: 2,
  interval: 40,
  icon: "IMGstatus_Zone",
  text: "Serenity, calmness and energy is filling you.",
  run: `
  aw.L("pc");
  let usedTo = Math.round(ↂ.pc.status.addict.zone * 0.1);
  if (usedTo < 1) {usedTo = 0}
  if (usedTo > 7) {usedTo = 7}
  let add = (9 - usedTo);
  if (add < 1) {add = 1}
  if (add > 5) {add = 5}
  if (this.times === 2) {
    ↂ.pc.status.energy.amt += add;
    ↂ.flag.tempSkillBoost.exhibition += 2;
    ↂ.flag.tempSkillBoost.seduction += 2;
    ↂ.flag.tempSkillBoost.comm += 2;
    ↂ.flag.tempSkillBoost.org += 2;
    ↂ.flag.tempSkillBoost.probSolving += 2;
    ↂ.flag.tempSkillBoost.finance += 2;
    ↂ.flag.tempSkillBoost.art += 2;
    ↂ.flag.tempSkillBoost.shop += 2;
    ↂ.flag.tempSkillBoost.martial += 2;
    ↂ.flag.tempSkillBoost.firearms += 2;
  }
  if (this.times === 1) {
    ↂ.pc.status.energy.amt += add;
    ↂ.flag.tempSkillBoost.exhibition += 5 - add;
    ↂ.flag.tempSkillBoost.seduction += 5 - add;
    ↂ.flag.tempSkillBoost.comm += 5 - add;
    ↂ.flag.tempSkillBoost.org += 5 - add;
    ↂ.flag.tempSkillBoost.probSolving += 5 - add;
    ↂ.flag.tempSkillBoost.finance += 5 - add;
    ↂ.flag.tempSkillBoost.art += 5 - add;
    ↂ.flag.tempSkillBoost.shop += 5 - add;
    ↂ.flag.tempSkillBoost.martial += 5 - add;
    ↂ.flag.tempSkillBoost.firearms += 5 - add;
  }
  if (this.times === 0) {
    ↂ.pc.status.energy.amt += add;
    ↂ.flag.tempSkillBoost.exhibition = 0;
    ↂ.flag.tempSkillBoost.seduction = 0;
    ↂ.flag.tempSkillBoost.comm = 0;
    ↂ.flag.tempSkillBoost.org = 0;
    ↂ.flag.tempSkillBoost.probSolving = 0;
    ↂ.flag.tempSkillBoost.finance = 0;
    ↂ.flag.tempSkillBoost.art = 0;
    ↂ.flag.tempSkillBoost.shop = 0;
    ↂ.flag.tempSkillBoost.martial = 0;
    ↂ.flag.tempSkillBoost.firearms = 0;
    setup.notify("@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@");
  }
  aw.S("pc");
  `,
};

setup.omnItems.ZoneBottle3 = {
  name: "Zone",
  type: "recurring",
  output: "notify",
  times: 2,
  interval: 40,
  icon: "IMGstatus_Zone",
  text: "Serenity, calmness and energy is filling you.",
  run: `
  aw.L("pc");
  let usedTo = Math.round(ↂ.pc.status.addict.zone * 0.1);
  if (usedTo < 1) {usedTo = 0}
  if (usedTo > 7) {usedTo = 7}
  let add = (12 - usedTo);
  if (add < 2) {add = 2}
  if (add > 7) {add = 7}
  if (this.times === 2) {
    ↂ.pc.status.energy.amt += add;
    ↂ.flag.tempSkillBoost.exhibition += 5;
    ↂ.flag.tempSkillBoost.seduction += 5;
    ↂ.flag.tempSkillBoost.comm += 5;
    ↂ.flag.tempSkillBoost.org += 5;
    ↂ.flag.tempSkillBoost.probSolving += 5;
    ↂ.flag.tempSkillBoost.finance += 5;
    ↂ.flag.tempSkillBoost.art += 5;
    ↂ.flag.tempSkillBoost.shop += 5;
    ↂ.flag.tempSkillBoost.martial += 5;
    ↂ.flag.tempSkillBoost.firearms += 5;
  }
  if (this.times === 1) {
    ↂ.pc.status.energy.amt += add;
    ↂ.flag.tempSkillBoost.exhibition += 8 - add;
    ↂ.flag.tempSkillBoost.seduction += 8 - add;
    ↂ.flag.tempSkillBoost.comm += 8 - add;
    ↂ.flag.tempSkillBoost.org += 8 - add;
    ↂ.flag.tempSkillBoost.probSolving += 8 - add;
    ↂ.flag.tempSkillBoost.finance += 8 - add;
    ↂ.flag.tempSkillBoost.art += 8 - add;
    ↂ.flag.tempSkillBoost.shop += 8 - add;
    ↂ.flag.tempSkillBoost.martial += 8 - add;
    ↂ.flag.tempSkillBoost.firearms += 8 - add;
  }
  if (this.times === 0) {
    ↂ.pc.status.energy.amt += add;
    ↂ.flag.tempSkillBoost.exhibition = 0;
    ↂ.flag.tempSkillBoost.seduction = 0;
    ↂ.flag.tempSkillBoost.comm = 0;
    ↂ.flag.tempSkillBoost.org = 0;
    ↂ.flag.tempSkillBoost.probSolving = 0;
    ↂ.flag.tempSkillBoost.finance = 0;
    ↂ.flag.tempSkillBoost.art = 0;
    ↂ.flag.tempSkillBoost.shop = 0;
    ↂ.flag.tempSkillBoost.martial = 0;
    ↂ.flag.tempSkillBoost.firearms = 0;
    setup.notify("@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@");
  }
  aw.S("pc");
  `,
};

setup.omnItems.ZoneInhaler3 = {
  name: "Zone",
  type: "single",
  output: "notify",
  duration: 15,
  icon: "IMGstatus_Zone",
  text: "Serenity, calmness and energy is filling you.",
  run: `
  aw.L("pc");
  ↂ.flag.tempSkillBoost.exhibition = 0;
  ↂ.flag.tempSkillBoost.seduction = 0;
  ↂ.flag.tempSkillBoost.comm = 0;
  ↂ.flag.tempSkillBoost.org = 0;
  ↂ.flag.tempSkillBoost.probSolving = 0;
  ↂ.flag.tempSkillBoost.finance = 0;
  ↂ.flag.tempSkillBoost.art = 0;
  ↂ.flag.tempSkillBoost.shop = 0;
  ↂ.flag.tempSkillBoost.martial = 0;
  ↂ.flag.tempSkillBoost.firearms = 0;
  setup.notify("@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@");
  aw.S("pc");
  `,
};

setup.omnItems.Heat = {
  name: "Heat",
  type: "single",
  output: "notify",
  duration: 160,
  icon: "IMGstatus_Heat",
  text: "All your body is sensitive, feeling of vibrant pleasure overwhelms you.",
  run: `
  aw.L("pc");
    ↂ.flag.tempSkillBoost.sex += 4;
    ↂ.flag.tempSkillBoost.oral += 4;
    ↂ.flag.tempSkillBoost.seduction += 16;
    ↂ.pc.kink.superSlut = ↂ.flag.BackupKinks.superSlut;
    ↂ.pc.kink.hyperSlut = ↂ.flag.BackupKinks.hyperSlut;
    ↂ.pc.kink.slut = ↂ.flag.BackupKinks.slut;
    ↂ.pc.trait.op = ↂ.flag.BackupTraits.op;
    ↂ.pc.trait.libido = (ↂ.flag.BackupTraits.libido + 1);
    setup.omni.new("HeatLingering");
  aw.S("pc");
  `,
};

setup.omnItems.HeatLingering = {
  name: "Heat lingering effects",
  type: "single",
  output: "notify",
  duration: 600,
  icon: "IMGstatus_Heat",
  text: "You feel residual effects of Heat still circulation through your body.",
  run: `
  aw.L("pc");
  ↂ.pc.status.arousal++;
  ↂ.flag.tempSkillBoost.sex = -5;
  ↂ.flag.tempSkillBoost.oral = -5;
  ↂ.flag.tempSkillBoost.seduction -= 10;
  setup.notify("@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@");
  ↂ.pc.trait.libido = (ↂ.flag.BackupTraits.libido - 1);
  setup.omni.new("HeatBackfire");
  aw.S("pc");
  `,
};

setup.omnItems.HeatBackfire = {
  name: "Heat effects",
  type: "single",
  output: "notify",
  duration: 600,
  icon: "IMGstatus_SkillDown",
  text: "Your body sensations and libido are lowered.",
  run: `
  aw.L("pc");
  ↂ.pc.status.arousal--;
  ↂ.flag.tempSkillBoost.sex = 0;
  ↂ.flag.tempSkillBoost.oral = 0;
  ↂ.flag.tempSkillBoost.seduction = 0;
  ↂ.pc.trait.libido = ↂ.flag.BackupTraits.libido;
  aw.S("pc");
  `,
};

setup.omnItems.Satyr = {
  name: "Satyr",
  type: "recurring",
  output: "notify",
  times: 8,
  interval: 120,
  icon: "IMGstatus_Satyr",
  text: "You feel in a need of a good sex.",
  run: `
  aw.L("pc");
  this.times
    ↂ.pc.status.arousal += Math.floor(this.times / 3);
    pc.status.wetness += Math.floor(this.times / 2);
    if (random(1,3) === 3) {ↂ.pc.trait.will--;}
    ↂ.pc.status.energy.amt += Math.floor(this.times / 2);
    ↂ.flag.tempSkillBoost.sex = this.times;
    ↂ.flag.tempSkillBoost.oral = this.times;
    ↂ.pc.kink.slut = true;
    if (this.times === 0) {
      ↂ.pc.trait.will = ↂ.flag.BackupTraits.will;
      ↂ.pc.kink.slut = true; = ↂ.flag.BackupKinks.slut;
      ↂ.flag.tempSkillBoost.sex = 0;
      ↂ.flag.tempSkillBoost.oral = 0;
      setup.notify("@@.change;Seems that drug is worn out, you don't feel any effects anymore.@@");
    }
  aw.S("pc");
  `,
};

setup.omnItems.mentalPills = {
  name: "Mental pills",
  type: "recurring",
  output: "notify",
  times: 6,
  interval: 180,
  icon: "IMGstatus_Drug",
  text: "You have taken some prescribed pills",
  run: `if (random(1, 3) > 1) { setup.notify("It seems those pills make you feel better.");
  if (ↂ.pc.status.stress > 50) {setup.status.stress(-8, "Mental Pills");}
  if (ↂ.pc.status.anger > 3) {ↂ.pc.status.anger -= 1;}
  if (ↂ.pc.status.happy < 3) {setup.status.happy(1, "Mental Pills");}
  if (ↂ.pc.status.addict.jonesing > 5) {ↂ.pc.status.jonesing -= 2;}
  const needs = ["sexNeed", "alcNeed", "heatNeed", "satyrNeed", "focusNeed", "cumNeed", "creamNeed"];
  for (const need of needs) {
    if (ↂ.pc.status.addict[need] > 50) {ↂ.pc.status.addict[need] -= 5};
  }
  }`,
};
