//
// █████╗  ██████╗ ██████╗ ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║  ██║██║  ██║██║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║  ██║██║  ██║██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║██████╔╝██████╔╝██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

interface setupDrug {
  eatDrug: (drug: "sex" | "alc" | "heat" | "satyr" | "focus" | "cum" | "zone" | "cream", amt: number) => void;
  omniGen: (drug: "sex" | "alc" | "heat" | "satyr" | "focus" | "cum" | "zone" | "cream") => {};
  jonesing: (drug) => void;
}

if (setup.drug === null || setup.drug === undefined) {
  setup.drug = {} as setupDrug;
}

setup.drug.jonesing = function(drug) {
  const need = String(drug + "Need");
  if (ↂ.pc.status.addict[drug] !== null && (ↂ.pc.status.addict[drug] + ↂ.pc.status.addict[need]) > 30) {
    const blah = Math.floor(ↂ.pc.status.addict[drug] / 10);
    const curve = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (random(curve[blah], 10) === 10) {
      if (random(1, 5) === 7) { // approximate of 24 hours in case of 50 addiction.
        ↂ.pc.status.addict.jonesing++;
      }
    }
  }
};

setup.drug.eatDrug = function(drug, amt) { // VODKA
  if (ↂ.pc.status.addict[drug] !== null) {
    const need = String(drug) + "Need";
    // makeshift need lowering func
    ↂ.pc.status.addict[need] = 0;
    // removing withdrawal
    if (amt > 0 && amt > Math.floor(ↂ.pc.status.addict[drug] / 11)) {
      if (setup.omni.matching("Withdrawal") !== 0) {
        setup.omni.kill("Withdrawal");
      }
      ↂ.pc.status.addict.jonesing = 0;
      if (ↂ.pc.status.addict.withdrawl === true) {
        ↂ.pc.status.addict.withdrawl = false;
        ↂ.pc.trait.libido = ↂ.flag.BackupTraits.libido;
        ↂ.pc.trait.bitch = ↂ.flag.BackupTraits.bitch;
        ↂ.pc.trait.will = ↂ.flag.BackupTraits.will;
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
        UI.alert("You feel much better now when you withdrawal was cured.");
      }
    }
    // adding to addiction
    const foo = Math.floor(Math.log(amt) * 3);
    const blah = Math.floor(ↂ.pc.status.addict[drug] / 10);
    const curve = [0.2, 0.3, 0.4, 0.6, 0.8, 1, 1.2, 1.3, 1.4, 1.5, 1.5];
    if (!aw.chad.addict) {
      if (drug === "cum" || drug === "cream" || drug === "sex") {
        ↂ.pc.status.addict[drug] += Math.floor(foo * curve[blah]) + 1;
      } else {
        ↂ.pc.status.addict[drug] += Math.floor(foo * curve[blah]) + 3;
      }
    }
    // aw.con.info(`Drug system inf: foo = ${foo}, blah = ${blah}, += = ${Math.floor(foo * curve[blah])}`);
    aw.S("pc");
  }
};

setup.drug.omniGen = function(drug) { // VODKA
  const addict = ↂ.pc.status.addict;
  let severity = 1 as number;
  let NeedName = "error";
  switch (drug) {
    case "sex":
    NeedName = "Sex";
    break;
    case "alc":
    NeedName = "Booze";
    break;
    case "heat":
    NeedName = "Heat.";
    break;
    case "satyr":
    NeedName = "Satyr";
    break;
    case "focus":
    NeedName = "Focus";
    break;
    case "cum":
    NeedName = "Cum";
    break;
    case "zone":
    NeedName = "Zone";
    break;
    case "cream":
    NeedName = "Creampie";
    break;
    default:
    NeedName = "ERROR :(";
    break;
  }
  let PCtext = ["withdrawal text stage 8 error", "withdrawal text stage 7 error", "withdrawal text stage 6 error", "withdrawal text stage 5 error", "withdrawal text stage 4 error", "withdrawal text stage 3 error", "withdrawal text stage 2 error", "withdrawal text stage 1 error"];
  if (addict[drug] >= 90) {
    severity = 5;
    PCtext = ["Oh I feel it starting...", `Shit, shit, SHIT, I need to get some ${NeedName} right fucking now.`, `${NeedName}. ${NeedName}. ${NeedName}. ${NeedName}!!!`, `Sob... All I really want is a ${NeedName}...`, "Why does it happening to me?", `I am not sure I can hold much longer without a ${NeedName}`, "I feel a little bit better than last days...", "Oh... it seems I am finally feeling better after all this..."];
  } else if (addict[drug] >= 70) {
    PCtext = ["Oh no, I already can feel withdrawal kicking in...", `Ugh, need to get some ${NeedName} really fast!`, `Just a tiny bit, where can I found bloody fucking damned bit of ${NeedName} in this damned city?!`, "I want to die already...", `When this will ever end? If only I could get some ${NeedName}...`, `I swear I'll never touch this addictive shit again.`, "I feel a little bit better than last days...", "Oh... it seems I am finally feeling better after all this..."];
    severity = 4;
  } else if (addict[drug] >= 50) {
    PCtext = ["Damn, I feel shitty.", `Where can I find a ${NeedName} in this time of day?!`, `${NeedName} is really all I need right now.`, `Oh it would be so awesome to cure all this by just having one tiny ${NeedName}...`, "This is plain terrible... sob...", `I am not sure I can hold much longer without a ${NeedName}`, "I feel a little bit better than last days...", "Oh... I can't believe it is over finally!"];
    severity = 3;
  } else if (addict[drug] >= 35) {
    PCtext = ["Ugh, what is wrong with me?", `I feel really shitty now. Maybe some ${NeedName} will help?`, `This withdrawal sucks really fucking hard.`, `I need ${NeedName}... I really mean it.`, "Is it getting better? I am not sure...", `Bloody ${NeedName}, this withdrawal is killing me!`, "Oh, I feel certainly better now.", "I am almost okay... finally..."];
    severity = 2;
  } else if (addict[drug] >= 15) {
    PCtext = ["What is this itch?", "Feeling pretty nauseous, what is wrong with me?", `Oh, this must be the ${NeedName} withdrawal! Terrible feeling!`, `Maybe I could cure it by ${NeedName}? I don;t like it at all.`, "Phew, this addictionous things sucks.", `This ache for some ${NeedName} is really strong...`, "I feel a certainly better than last days...", "I am okay finally. It was pretty bad last days though."];
    severity = 1;
  }
  let NeedTextString = "error";
  switch (drug) {
    case "sex":
    NeedTextString = "I really want, I NEED to have sex right now.";
    break;
    case "alc":
    NeedTextString = "I really could pay anything for some booze.";
    break;
    case "heat":
    NeedTextString = "I need Heat. I should really find some, no matter where and how.";
    break;
    case "satyr":
    NeedTextString = "I don't feel sexy at all. I feel sick and miserable.";
    break;
    case "focus":
    NeedTextString = "So hard to concentrate... Without some Focus life is shit.";
    break;
    case "cum":
    NeedTextString = "I am sooo thirsty for some cum, can't think about anything else.";
    break;
    case "zone":
    NeedTextString = "ZONE. ZONE. ZONE. I. NEED. ZONE.";
    break;
    case "cream":
    NeedTextString = "My pussy feels so empty without any cream... And I feel same, empty and worthless...";
    break;
    default:
    NeedTextString = "ERROR :(";
    break;
  }
  let effects = "";
  const vomit = `
  if (random(${severity}, 5) === 5 && this.times > 3 && flagAnxiety !== true && flagPsycho !== true && flagObsession !== true && flagMemoryLoss !== true) {
    const vomit = {
      loc : "face",
      amt : 8,
      tgt : "pc",
      wet : 5,
      type : "vomit"
    }
    setup.condition.add(vomit);
    vomit.loc = "chest";
    vomit.amt = 12;
    setup.condition.add(vomit);
    vomit.loc = "stomach";
    vomit.amt = 6;
    setup.condition.add(vomit);
    setup.Dialog("Nausea","<<include [[WithdrawalThrowingUp]]>>");
    flagVomit = true;
  }
  `;
  const anxiety = `
  if (random(${(severity + 1)}, 5) === 5 && this.times > 2 && flagVomit !== true && flagPsycho !== true && flagObsession !== true && flagMemoryLoss !== true) {
    setup.status.stress(${(severity * 5)}, "Drugs");
    setup.status.happy(-${severity}, "Drugs")
    setup.Dialog("Anxiety","<<include [[WithdrawalAnxiety]]>>");
    flagAnxiety = true;
  }
  `;
  const psycho = `
  if (random(${(severity + 1)}, 5) === 5 && this.times > 2 && flagVomit !== true && flagAnxiety !== true && flagObsession !== true && flagMemoryLoss !== true) {
    setup.status.stress(${(severity * 6)}, "Drugs");
    setup.status.happy(-${severity}, "Drugs")
    setup.status.lonely(-${random(1, 2)}, "Drugs");
    setup.Dialog("New friend!","<<include [[WithdrawalPsycho]]>>");
    flagPsycho = true;
  }
  `;
  const obsession = `
  if (random(${(severity + 1)}, 5) === 5 && this.times > 2 && flagVomit !== true && flagAnxiety !== true && flagPsycho !== true && flagMemoryLoss !== true) {
    setup.status.stress(${(severity * 3)}, "Drugs");
    setup.status.happy(-${severity}, "Drugs")
    setup.Dialog("Craving","<<include [[WithdrawalObsession]]>>");
    flagPsycho = true;
  }
  `;
  const memoryLoss = `
  if (random(${(severity + 1)}, 5) === 5 && this.times > 3 && flagVomit !== true && flagAnxiety !== true && flagPsycho !== true && flagObsession !== true) {
    setup.status.stress(${(severity * 2)}, "Drugs");
    setup.Dialog("Where am I?!","<<include [[WithdrawalMemoryLoss]]>>");
    flagMemoryLoss = true;
  }
  `;
  const skillImpact = `
  ↂ.flag.tempSkillBoost.exhibition -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.seduction -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.comm -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.org -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.probSolving -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.finance -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.art -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.shop -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.martial -= ${(severity / 2)};
  ↂ.flag.tempSkillBoost.firearms -= ${(severity / 2)};
  `;
  const skillBack = `
  ↂ.flag.tempSkillBoost.exhibition += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.seduction += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.comm += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.org += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.probSolving += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.finance += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.art += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.shop += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.martial += ${((severity / 2) * 3)};
  ↂ.flag.tempSkillBoost.firearms += ${((severity / 2) * 3)};
  `;
  const sexualStuff = `
  if (random(${(severity + 1)}, 5) === 5) {
    ↂ.pc.trait.libido++;
  }
  `;
  let healthImpact = "true";
  switch (drug) {
    case "satyr":
      effects += vomit + psycho + obsession;
    case "heat":
      effects += vomit + obsession + memoryLoss;
    case "zone":
      effects += psycho + anxiety + obsession;
    case "focus":
      effects += vomit + anxiety + obsession;
    case "alc":
      effects += vomit + obsession + memoryLoss;
      break;
    case "cum":
    case "cream":
    case "sex":
      effects += obsession + sexualStuff;
      healthImpact = "false";
      break;
    default:
    break;
  }
  if (ↂ.pc.mutate.cumpire && drug === "cum") {
    healthImpact = "true";
  }
  let oIcon = "IMGstatus_Withdrawl";
  if (addict[drug] >= 50) {
    oIcon = "IMGstatus_WithdrawlBad";
  }

  const omni = {
    name: "Withdrawal",
    type: "recurring",
    output: "none",
    times: 8,
    interval: 680,
    icon: oIcon,
    text: NeedTextString,
    run: `
    let flagVomit = false;
    let flagAnxiety = false;
    let flagPsycho = false;
    let flagObsession = false;
    let flagMemoryLoss = false;
    let hl = 0;
    switch(this.times){
      case 8:
        UI.alert("${PCtext[0]}");
        if (${healthImpact}) {
          hl = (random(1, ${severity}) + 2) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Drug withdrawal");
        }
        ${effects}
        ${skillImpact}
        aw.S();
        break;
      case 7:
        UI.alert("${PCtext[1]}");
        if (${healthImpact}) {
          hl = (random(1, ${severity}) + 3) * -1;
        ↂ.pc.status.health += hl ;
        setup.status.record("health", hl, "Drug withdrawal");
        }
        ↂ.pc.trait.bitch = true;
        ${effects}
        ${skillImpact}
        aw.S();
        break;
      case 6:
        UI.alert("${PCtext[2]}");
        if (${healthImpact}) {
          hl = (random(1, ${severity}) + 2) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Drug withdrawal");
        }
        ${effects}
        ${skillImpact}
        aw.S();
        break;
      case 5:
        UI.alert("${PCtext[3]}");
        if (${healthImpact}) {
          hl = (random(1, ${severity}) + 1) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Drug withdrawal");
        }
        ${effects}
        aw.S();
        break;
      case 4:
        this.text = "${PCtext[4]}";
        if (${healthImpact}) {
          hl = random(1, ${severity}) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Drug withdrawal");
        }
        ${effects}
        aw.S();
        break;
      case 3:
        UI.alert("${PCtext[5]}");
        if (${healthImpact}) {
          hl = random(1, ${severity}) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Drug withdrawal");
        }
        ${effects}
        aw.S();
        break;
      case 2:
        UI.alert("${PCtext[6]}");
        if (${healthImpact}) {
          hl = random(1, ${severity}) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Drug withdrawal");
        }
        ${effects}
        aw.S();
        break;
      case 1:
        UI.alert("${PCtext[7]}");
        if (${healthImpact}) {
          hl = random(1, ${severity}) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Drug withdrawal");
        }
        ${effects}
        ${skillBack}
        aw.S();
        break;
      case 0:
        ↂ.pc.status.addict.withdrawl = false;
        ↂ.pc.trait.libido = ↂ.flag.BackupTraits.libido;
        ↂ.pc.trait.bitch = ↂ.flag.BackupTraits.bitch;
      default:
    }`,
  };
  return omni;
};

// MACROS

Macro.add("eatdrug", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("No arguments sent to eatDrug macro!");
    } else if ("string" !== typeof this.args[0] || "number" !== typeof  this.args[1]) {
      return this.error("Incorrect data type for agecheck macro arguments - string and number expected.");
    } else if (leng > 2) {
      return this.error("No arguments sent to eatDrug macro!");
    }
    setup.drug.eatDrug(this.args[0] as "sex" | "alc" | "heat" | "satyr" | "focus" | "cum" | "zone" | "cream", this.args[1]);
  },
});
