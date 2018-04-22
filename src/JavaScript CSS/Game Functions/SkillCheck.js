/*
███████╗██╗  ██╗██╗██╗     ██╗      ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝
███████╗█████╔╝ ██║██║     ██║     ██║     ███████║█████╗  ██║     █████╔╝
╚════██║██╔═██╗ ██║██║     ██║     ██║     ██╔══██║██╔══╝  ██║     ██╔═██╗
███████║██║  ██╗██║███████╗███████╗╚██████╗██║  ██║███████╗╚██████╗██║  ██╗
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝
*/

Macro.add("SCX", {
  handler: function () {
    setup.SCXfunc();
  }
});
Macro.add("SC", {
  handler: function () {
    setup.SCfunc(this.args[0], this.args[1], this.args[2], this.args[3]);
  }
});

Macro.add("skillup", {
  handler: function () {
    let out = setup.skillup(this.args[0], this.args[1]);
    return new Wikifier(this.output, out);
  }
});

setup.SCXfunc = function () {
  State.variables.SCresult = ["error"];
  State.variables.SCtext = ["error"];
  return;
};

setup.SCfunc = function (args0, args1, args2, args3) {
  let PC = State.variables.PC;
  /*error checking*/
  let dc, type, dice, mod;
  if (args0 === undefined) {
    dc = 15;
    type = "D";
    setup.alert(", no args passed to skillcheck");
  } else if (isNaN(args0)) {
    dc = args1;
    type = args0;
  } else {
    /*in case of 'just a roll' w/no skill*/
    dc = args0;
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
  if (args2 === undefined) {
    /*nuthin*/
  } else {
    if (isNaN(args2)) {
      if (args2 == "d6") {
        dice = getRandom(1, 6);
        dice += getRandom(0, 7);
        dice += getRandom(0, 7);
        ex = "Weight=S";
      } else if (args2 == "d4") {
        dice = getRandom(1, 5);
        dice += getRandom(0, 5);
        dice += getRandom(0, 5);
        dice += getRandom(0, 5);
        ex = "Weight=SS";
      } else if (args2 == "d8") {
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
      if (args3 === undefined) {
        /*no mod value*/
      } else if (isNaN(args3)) {
        setup.alert(", bad arg3 mod passed to skillcheck");
      } else {
        mod = args3;
      }
    } else {
      mod = args2;
    }
  }
  /*check for actual skill used*/
  let skill;
  switch (type) {
  case "EX":
  case "ex":
  case "exhibit":
    skill = PC.skill.exhibition;
    type = "exhib";
    if (PC.trait.open == "closed") {
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
    skill = PC.skill.prostitute;
    type = "ho";
    if (PC.trait.open == "closed") {
      mod -= 2;
    }
    break;
  case "SX":
  case "sx":
  case "sex":
    skill = PC.skill.sex;
    type = "sex";
    if (PC.trait.open == "closed") {
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
    skill = PC.skill.oral;
    type = "oral";
    if (PC.trait.open == "closed") {
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
    skill = PC.skill.seduction;
    type = "sed";
    if (PC.trait.flirty == -1) {
      mod -= 2;
    } else if (PC.trait.flirty == 1) {
      mod += 1;
    }
    if (PC.trait.vert == "introverted") {
      mod -= 1;
    } else if (PC.trait.vert == "extroverted") {
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
    if (PC.trait.persuasive == -1) {
      mod -= 2;
    } else if (PC.trait.persuasive == 1) {
      mod += 1;
    }
    break;
  case "CM":
  case "cm":
  case "COM":
  case "com":
    skill = PC.skill.comm;
    type = "com";
    if (PC.trait.vert == "introverted") {
      mod -= 1;
    } else if (PC.trait.vert == "extroverted") {
      mod += 1;
    }
    if (PC.trait.persuasive == -1) {
      mod -= 2;
    } else if (PC.trait.persuasive == 1) {
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
    skill = PC.skill.org;
    type = "org";
    if (PC.trait.open == "closed") {
      mod += 1;
    } else if (PC.trait.open == "open") {
      mod -= 1;
    }
    break;
  case "PS":
  case "ps":
  case "prob":
  case "probsolve":
    skill = PC.skill.probSolving;
    type = "prob";
    if (PC.trait.vert == "introverted") {
      mod += 1;
    } else if (PC.trait.vert == "extroverted") {
      mod -= 2;
    }
    break;
  case "FI":
  case "fi":
  case "FN":
  case "fn":
    skill = PC.skill.finance;
    type = "fin";
    if (PC.trait.vert == "introverted") {
      mod += 1;
    } else if (PC.trait.vert == "extroverted") {
      mod -= 1;
    }
    if (PC.trait.open == "closed") {
      mod += 1;
    }
    break;
  case "AS":
  case "as":
  case "art":
  case "Art":
  case "AST":
  case "ast":
    skill = PC.skill.art;
    type = "art";
    if (PC.trait.open == "closed") {
      mod -= 3;
    }
    break;
  case "AT":
  case "at":
  case "ATH":
  case "ath":
    skill = PC.skill.athletic;
    type = "ath";
    break;
  case "DA":
  case "da":
    skill = PC.skill.dancing;
    type = "dance";
    if (PC.trait.open == "closed") {
      mod -= 1;
    }
    break;
  case "CL":
  case "cl":
    skill = PC.skill.clean;
    type = "clean";
    if (PC.trait.open == "closed") {
      mod += 2;
    }
    break;
  case "SH":
  case "sh":
  case "SP":
  case "sp":
  case "shop":
    skill = PC.skill.shop;
    type = "shop";
    break;
  case "CO":
  case "co":
  case "cook":
  case "CK":
    skill = PC.skill.cook;
    type = "cook";
    break;
  case "LIE":
  case "lie":
    skill = PC.skill.comm + PC.skill.seduction;
    skill = Math.round(skill / 2);
    if (PC.trait.deceptive == 1 && PC.trait.devious == 1) {
      mod += 3;
    } else if (PC.trait.deceptive == 1 && PC.trait.devious != -1) {
      mod += 2;
    } else if (PC.trait.deceptive == 1) {
      mod += 1;
    } else if (PC.trait.devious == 1 && PC.trait.deceptive != -1) {
      mod += 1;
    } else if (PC.trait.deceptive == -1 && PC.trait.devious == 1) {
      mod -= 1;
    } else if (PC.trait.deceptive == -1 && PC.trait.devious == -1) {
      mod -= 3;
    } else if (PC.trait.deceptive == -1) {
      mod -= 2;
    } else if (PC.trait.devious == -1) {
      mod -= 1;
    }
    if (PC.trait.open == "closed") {
      mod -= 1;
    }
    type = "lie";
    break;
  default:
    skill = "NONE";
    type = "gen";
  }
  /*compute bonus*/
  let bonus, total;
  bonus = setup.skillModCalc(skill);
  total = dice + bonus + mod;
  let AW = State.variables.AW;
  if (dice == 1) {
    AW.sCheck = false;
  } else if (dice == 20) {
    AW.sCheck = true;
  } else if (total >= dc) {
    AW.sCheck = true;
  } else {
    AW.sCheck = false;
  }
  let gain = false;
  if(AW.sCheck){
    gain = setup.skillGain(type,dc,bonus);
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
    if(gain){
      output += "<span class='ship' style='font-size:115%; font-weight:bold;'>[++]</span>";
    }
    State.variables.SCtext.push(output);
  } else if (State.variables.showSkillCheck) {
    if (AW.sCheck) {
      output = " @@.good;[" + type + " ✔ (" + total + ")]@@ ";
    } else {
      output = " @@.bad;[" + type + " ✘ (" + total + ")]@@ ";
    }
    if(gain){
      output += "<span class='ship' style='font-size:115%; font-weight:bold;'>[++]</span>";
    }
    State.variables.SCtext.push(output);
  } else {
    if (AW.sCheck) {
      output = "@@.good;[✔]@@";
      if(gain){
        output += "<span class='ship' style='font-size:115%; font-weight:bold;'>[++]</span>";
      }
    } else {
      output = "@@.bad;[✘]@@";
    }
    State.variables.SCtext.push(output);
  }
};
setup.skillup = function (args0, args1) {
  let out;
  if (args0 === undefined) {
    out = "<span class='ship' style='font-size:115%; font-weight:bold;'>[++]</span>";
  } else if (args1 === undefined) {
    if (State.variables.showSkillCheck) {
      out = "<span class='ship' style='font-size:115%; font-weight:bold;'>[' + $args[0] + '++]</span>";
    } else {
      out = "<span class='ship' style='font-size:115%; font-weight:bold;'>[++]</span>";
    }
  } else {
    if (isNaN(args1)) {
      if (State.variables.showSkillCheck) {
        out = "<span class='ship' style='font-size:125%; font-weight:bold;'>[' + args[0] + '++]</span>";
      } else {
        out = "<span class='ship' style='font-size:125%; font-weight:bold;'>[++]</span>";
      }
    } else {
      out = "<span class='ship' style='font-size:125%; font-weight:bold;'>[++]</span>";
    }
  }
  return out;
};

setup.skillGain = function(type,dc,bonus){
  if(type === "gen"){return false;}
  let typer = {
    exhib: "exhibition",
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
    lie: (random(1,3) == 3)? "seduction" : "comm",
  };
  let skill = State.active.variables.PC.skill[typer[type]];
  let base = skill;
  if(!bonus){
    bonus = setup.skillModCalc(skill);
  }
  bonus += 9;
  if(bonus > dc){
    let x = Math.min(2,((bonus-dc)*0.25)+1);
    base = Math.round(skill * x);
  }else if(dc > bonus){
    let x = Math.max(0.75,(1-(0.05*(dc-bonus))));
    base = Math.round(skill * x);
  }
  let diff = Math.round(Math.pow(base,1.66));
  if(random(0,diff) < skill){
    //skill up
    State.active.variables.PC.skill[typer[type]] += 1;
    aw.S();
    setup.notify(`<span class="good" style="font-size:125%">Skill Up!</span> Your ${typer[type]} skill increased!`);
    return true;
  }
  return false;
};

setup.skillModCalc = function(skill){
  let bonus;
  if(skill < 100){
    bonus = Math.floor((skill / 10) - 3);
  }else if(skill < 115){
    bonus = 7;
  }else if(skill < 135){
    bonus = 8;
  }else if(skill < 160){
    bonus = 9;
  }else if(skill < 200){
    bonus = 10;
  }else if(skill == 200){
    bonus = 15;
  }else{
    bonus = 0;
  }
  return bonus;
};