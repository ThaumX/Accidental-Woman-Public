/*
███████╗██╗  ██╗██╗██╗     ██╗      ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝
███████╗█████╔╝ ██║██║     ██║     ██║     ███████║█████╗  ██║     █████╔╝
╚════██║██╔═██╗ ██║██║     ██║     ██║     ██╔══██║██╔══╝  ██║     ██╔═██╗
███████║██║  ██╗██║███████╗███████╗╚██████╗██║  ██║███████╗╚██████╗██║  ██╗
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝
*/

Macro.add("SCX", {
  handler() {
    setup.SCXfunc();
  },
});
Macro.add("SC", {
  handler() {
    setup.SCfunc(this.args[0], this.args[1], this.args[2], this.args[3]);
  },
});

Macro.add("skillup", {
  handler() {
    const out = setup.skillup(this.args[0]);
    return new Wikifier(this.output, out);
  },
});

setup.SCXfunc = function(): void {
  State.variables.SCresult = ["error"];
  State.variables.SCtext = ["error"];
  return;
};

setup.SCfunc = function(skillType: any, DCnum?: number, diceSize?: string | number, bonusVal?: number): boolean {
  const PC = ↂ.pc;
  /*error checking*/
  let dc;
  let type;
  let dice;
  let mod;
  if (skillType === undefined) {
    dc = 15;
    type = "D";
    setup.alert(", no args passed to skillcheck");
  } else if ("string" === typeof skillType && isNaN(skillType as any)) {
    dc = DCnum;
    type = skillType;
  } else {
    /*in case of 'just a roll' w/no skill*/
    dc = skillType;
  }
  /*roll some shit*/
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  dice = getRandom(0, 10);
  dice += getRandom(1, 10);
  /*see if we need to reroll some shit or have a mod value*/
  mod = 0;
  let ex = "Weight=N";
  if (diceSize === undefined) {
    /*nuthin*/
  } else {
    if (isNaN(diceSize as any)) {
      if (diceSize === "d6") {
        dice = getRandom(1, 6);
        dice += getRandom(0, 7);
        dice += getRandom(0, 7);
        ex = "Weight=S";
      } else if (diceSize === "d4") {
        dice = getRandom(1, 5);
        dice += getRandom(0, 5);
        dice += getRandom(0, 5);
        dice += getRandom(0, 5);
        ex = "Weight=SS";
      } else if (diceSize === "d8") {
        dice = getRandom(1, 8);
        dice += getRandom(2, 8);
        dice += getRandom(2, 8);
        if (dice > 20) {
          dice -= getRandom(4, 10);
        }
        ex = "Weight=E";
      } else {
        setup.alert(", bad arg2 dcode passed to skillcheck");
      }
      if (bonusVal === undefined) {
        /*no mod value*/
      } else if (isNaN(bonusVal)) {
        setup.alert(", bad arg3 mod passed to skillcheck");
      } else {
        mod = bonusVal;
      }
    } else {
      mod = diceSize;
    }
  }
  /*check for actual skill used*/
  let skill;
  switch (type) {
  case "EX":
  case "ex":
  case "exhibit":
    skill = ↂ.skill.exhibition + ↂ.flag.tempSkillBoost.exhibition;
    type = "exhib";
    if (PC.trait.open === "closed") {
      mod -= 2;
    }
    if (PC.kink.exhibition && PC.kink.public) {
      mod += 3;
    } else if (PC.kink.exhibition) {
      mod += 2;
    } else if (PC.kink.public) {
      mod += 1;
    }
    if (PC.kink.liberate || PC.kink.slut) {
      mod += 1;
    }
    break;
  case "PR":
  case "pr":
  case "prost":
    skill = ↂ.skill.prostitute + ↂ.flag.tempSkillBoost.prostitute;
    type = "ho";
    if (PC.trait.open === "closed") {
      mod -= 2;
    }
    break;
  case "SX":
  case "sx":
  case "sex":
    skill = ↂ.skill.sex + ↂ.flag.tempSkillBoost.sex;
    type = "sex";
    if (PC.trait.open === "closed") {
      mod -= 1;
    }
    if (PC.kink.liberate || PC.kink.slut) {
      mod += 1;
    }
    if (!PC.kink.anal) {
      mod -= 2;
    } else if (PC.kink.buttSlut) {
      mod += 1;
    }
    if (PC.kink.pregnancy && PC.kink.risky) {
      mod += 2;
    } else if (PC.kink.pregnancy || PC.kink.risky) {
      mod += 1;
    }
    break;
  case "OR":
  case "or":
  case "oral":
    skill = ↂ.skill.oral + ↂ.flag.tempSkillBoost.oral;
    type = "oral";
    if (PC.trait.open === "closed") {
      mod -= 1;
    }
    if (!PC.kink.oral) {
      mod -= 3;
    }
    if (PC.kink.cumSlut) {
      mod += 2;
    }
    if (PC.kink.liberate || PC.kink.slut) {
      mod += 1;
    }
    break;
  case "SD":
  case "sd":
  case "SED":
  case "sed":
  case "seduct":
    skill = ↂ.skill.seduction + ↂ.flag.tempSkillBoost.seduction;
    type = "sed";
    if (PC.trait.flirty === -1) {
      mod -= 2;
    } else if (PC.trait.flirty === 1) {
      mod += 1;
    }
    if (PC.trait.vert === "introverted") {
      mod -= 1;
    } else if (PC.trait.vert === "extroverted") {
      mod += 1;
    }
    if (State.variables.pub) {
      if (aw.chad.dom) {
        mod += 50;
      }
    }
    if (PC.mutate.goddess) {
      mod += 15;
    } else if (PC.mutate.fertStorm) {
      mod += 5;
    }
    if (PC.kink.liberate || PC.kink.slut || PC.kink.pregnancy || PC.kink.risky) {
      mod += 1;
    }
    if (PC.kink.liberate || PC.kink.slut || PC.kink.pregnancy || PC.kink.risky) {
      mod += 1;
    }
    if (PC.trait.persuasive === -1) {
      mod -= 2;
    } else if (PC.trait.persuasive === 1) {
      mod += 1;
    }
    break;
  case "CM":
  case "cm":
  case "COM":
  case "com":
    skill = ↂ.skill.comm + ↂ.flag.tempSkillBoost.comm;
    type = "com";
    if (PC.trait.vert === "introverted") {
      mod -= 1;
    } else if (PC.trait.vert === "extroverted") {
      mod += 1;
    }
    if (PC.trait.persuasive === -1) {
      mod -= 2;
    } else if (PC.trait.persuasive === 1) {
      mod += 1;
    }
    if (State.variables.pub) {
      if (State.variables.cheat.dom) {
        mod += 50;
      }
    }
    break;
  case "OG":
  case "og":
  case "ORG":
  case "org":
    skill = ↂ.skill.org + ↂ.flag.tempSkillBoost.org;
    type = "org";
    if (PC.trait.open === "closed") {
      mod += 1;
    } else if (PC.trait.open === "open") {
      mod -= 1;
    }
    break;
  case "PS":
  case "ps":
  case "prob":
  case "probsolve":
    skill = ↂ.skill.probSolving + ↂ.flag.tempSkillBoost.probSolving;
    type = "prob";
    if (PC.trait.vert === "introverted") {
      mod += 1;
    } else if (PC.trait.vert === "extroverted") {
      mod -= 2;
    }
    break;
  case "FI":
  case "fi":
  case "FN":
  case "fn":
    skill = ↂ.skill.finance + ↂ.flag.tempSkillBoost.finance;
    type = "fin";
    if (PC.trait.vert === "introverted") {
      mod += 1;
    } else if (PC.trait.vert === "extroverted") {
      mod -= 1;
    }
    if (PC.trait.open === "closed") {
      mod += 1;
    }
    break;
  case "AS":
  case "as":
  case "art":
  case "Art":
  case "AST":
  case "ast":
    skill = ↂ.skill.art + ↂ.flag.tempSkillBoost.art;
    type = "art";
    if (PC.trait.open === "closed") {
      mod -= 3;
    }
    break;
  case "AT":
  case "at":
  case "ATH":
  case "ath":
    skill = ↂ.skill.athletic + ↂ.flag.tempSkillBoost.athletic;
    type = "ath";
    break;
  case "DA":
  case "da":
    skill = ↂ.skill.dancing + ↂ.flag.tempSkillBoost.dancing;
    type = "dance";
    if (PC.trait.open === "closed") {
      mod -= 1;
    }
    break;
  case "CL":
  case "cl":
    skill = ↂ.skill.clean + ↂ.flag.tempSkillBoost.clean;
    type = "clean";
    if (PC.trait.open === "closed") {
      mod += 2;
    }
    break;
  case "SH":
  case "sh":
  case "SP":
  case "sp":
  case "shop":
    skill = ↂ.skill.shop + ↂ.flag.tempSkillBoost.shop;
    type = "shop";
    break;
  case "CO":
  case "co":
  case "cook":
  case "CK":
    skill = ↂ.skill.cook + ↂ.flag.tempSkillBoost.cook;
    type = "cook";
    break;
  case "WI":
  case "will":
  case "wil":
    skill = Math.round((ↂ.pc.status.will * 13) + 15);
    type = "will";
  case "LIE":
  case "lie":
    skill = ↂ.skill.comm + ↂ.flag.tempSkillBoost.comm + ↂ.skill.seduction + ↂ.flag.tempSkillBoost.seduction;
    skill = Math.round(skill / 2);
    if (PC.trait.deceptive === 1 && PC.trait.devious === 1) {
      mod += 3;
    } else if (PC.trait.deceptive === 1 && PC.trait.devious !== -1) {
      mod += 2;
    } else if (PC.trait.deceptive === 1) {
      mod += 1;
    } else if (PC.trait.devious === 1 && PC.trait.deceptive !== -1) {
      mod += 1;
    } else if (PC.trait.deceptive === -1 && PC.trait.devious === 1) {
      mod -= 1;
    } else if (PC.trait.deceptive === -1 && PC.trait.devious === -1) {
      mod -= 3;
    } else if (PC.trait.deceptive === -1) {
      mod -= 2;
    } else if (PC.trait.devious === -1) {
      mod -= 1;
    }
    if (PC.trait.open === "closed") {
      mod -= 1;
    }
    type = "lie";
    break;
  case "FA":
  case "firearms":
  case "gun":
    skill = ↂ.skill.firearms + ↂ.flag.tempSkillBoost.firearms;
    type = "firearms";
    break;
  default:
    skill = "NONE";
    type = "gen";
  }
  /*compute bonus*/
  let bonus;
  let total;
  bonus = setup.skillModCalc(skill);
  total = dice + bonus + mod;
  const AW = State.variables.AW;
  if (dice === 1) {
    AW.sCheck = false;
  } else if (dice === 20) {
    AW.sCheck = true;
  } else if (total >= dc) {
    AW.sCheck = true;
  } else {
    AW.sCheck = false;
  }
  let gain = false;
  if (AW.sCheck) {
    const forbid = ["gen", "will", "lie"];
    if (!forbid.includes(type)) {
      gain = setup.skillGain(type, dc);
    }
  }
  State.variables.SCresult.push(AW.sCheck);
  let output;
  if (State.variables.showSkillCheck && aw.chad.scDetail) {
    if (AW.sCheck) {
      if (mod !== 0) {
        output = " @@.good;[" + type + " check ✔ (" + ex + " roll = " + dice + " + Bonus = " + bonus + " + Mod = " + mod + " = " + total + " Total vs " + dc + ")]@@ ";
      } else {
        output = " @@.good;[" + type + " check ✔ (" + ex + " roll = " + dice + " + Bonus = " + bonus + " = " + total + " Total vs " + dc + ")]@@ ";
      }
    } else {
      if (mod !== 0) {
        output = " @@.bad;[" + type + " check ✘ (" + ex + " roll = " + dice + " + Bonus = " + bonus + " + Mod = " + mod + " = " + total + " Total vs " + dc + ")]@@ ";
      } else {
        output = " @@.bad;[" + type + " check ✘ (" + ex + " roll = " + dice + " + Bonus = " + bonus + " = " + total + " Total vs " + dc + ")]@@ ";
      }
    }
    if (gain) {
      output += "<span class='ship' style='font-size:1.15rem; font-weight:bold;'>[++]</span>";
    }
    State.variables.SCtext.push(output);
  } else if (State.variables.showSkillCheck) {
    if (AW.sCheck) {
      output = " @@.good;[" + type + " ✔ (" + total + ")]@@ ";
    } else {
      output = " @@.bad;[" + type + " ✘ (" + total + ")]@@ ";
    }
    if (gain) {
      output += "<span class='ship' style='font-size:1.15rem; font-weight:bold;'>[++]</span>";
    }
    State.variables.SCtext.push(output);
  } else {
    if (AW.sCheck) {
      output = "@@.good;[✔]@@";
      if (gain) {
        output += "<span class='ship' style='font-size:1.15rem; font-weight:bold;'>[++]</span>";
      }
    } else {
      output = "@@.bad;[✘]@@";
    }
    State.variables.SCtext.push(output);
  }
  return AW.sCheck;
};
setup.skillup = function(skillType: string): string {
  let out;
  if (skillType === undefined) {
    out = "<span class='ship' style='font-size:1.15rem; font-weight:bold;'>[++]</span>";
  } else {
    if (State.variables.showSkillCheck) {
      out = "<span class='ship' style='font-size:1.15rem; font-weight:bold;'>[" + skillType + "++]</span>";
    } else {
      out = "<span class='ship' style='font-size:1.15rem; font-weight:bold;'>[++]</span>";
    }
  }
  return out;
};

// function to give potential skill gain
setup.skillGain = function(type: string, dc: number): boolean {
  if (type === "gen") {return false; }
  const typer = {
    exhib: "exhibition",
    ex: "exhibition",
    ho: "prostitute",
    sex: "sex",
    oral: "oral",
    sed: "seduction",
    com: "comm",
    org: "org",
    prob: "probSolving",
    fin: "finance",
    art: "art",
    ath: "athletic",
    dance: "dancing",
    clean: "clean",
    shop: "shop",
    cook: "cook",
    kegel: "kegel",
    firearms: "firearms",
    lie: (random(1, 3) === 3) ? "seduction" : "comm",
  };
  const typeKeys = Object.keys(typer);
  let skill;
  let skillWord;
  if (typeKeys.includes(type)) {
    skill = ↂ.skill[typer[type]];
    skillWord = typer[type];
  } else {
    try {
      skill = ↂ.skill[type];
      skillWord = type;
    } catch (e) {
      aw.con.warn(`somehow a bad skill name "${type}" made it into skill levelup function!`);
      return false;
    }
  }
  let base = skill;
  let bonus = setup.skillModCalc(skill);
  bonus += 9;
  if (bonus >= dc) {
    const x = Math.min(2, ((bonus - dc) * 0.25) + 1);
    base = Math.round(skill * x);
  } else if (dc > bonus) {
    const x = Math.max(0.75, (1 - (0.05 * (dc - bonus))));
    base = Math.round(skill * x);
  }
  const diff = Math.round(Math.pow(base, 1.66));
  const huh = Math.round(Math.max(1, diff));
  const r = random(0, huh);
  aw.con.info(`skill gain check (${type}): random of 0 to ${huh} must be less than ${skill}. Result ${r}.`);
  if (r < skill) {
    // skill up
    ↂ.skill[skillWord] += 1;
    aw.S();
    setup.notify(`<span class="good" style="font-size:1.25rem">Skill Up!</span> Your ${typer[type]} skill increased!`);
    return true;
  }
  return false;
};

// calculate basevalue for skill leveling
setup.skillModCalc = function(skill: number): number {
  let bonus;
  if (skill < 100) {
    bonus = Math.floor((skill / 10) - 3);
  } else if (skill < 115) {
    bonus = 7;
  } else if (skill < 135) {
    bonus = 8;
  } else if (skill < 160) {
    bonus = 9;
  } else if (skill < 200) {
    bonus = 10;
  } else if (skill === 200) {
    bonus = 15;
  } else {
    bonus = 0;
  }
  return bonus;
};

