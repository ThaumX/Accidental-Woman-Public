Macro.add("calcPhysicalATR", {
  handler: function () {
    setup.physicalATR();
  }
});
Macro.add("calcOutfitCombine", {
  handler: function () {
    setup.outfitCombine();
  }
});
Macro.add("calcClothingStatus", {
  handler: function () {
    setup.clothingStatus(this.args[0], this.args[1], this.args[2]);
  }
});
Macro.add("pcTotalATR", {
  handler: function () {
    setup.totalATR();
  }
});
Macro.add("pcCleanStatus", {
  handler: function () {
    let out = setup.cleanStatus();
    return new Wikifier(this.output, out);
  }
});
Macro.add("pcBreastCalc", {
  handler: function () {
    setup.breastCalc();
  }
});

setup.physicalATR = function () {
  setup.statusLoad();
  let atr = 5;
  let PC = State.variables.PC;
  let age = PC.main.age;
  let body = PC.body;
  let s1 = [16, 18, 20, 22, 26, 28, 30, 33, 35, 37, 39, 41, 45];
  let s2 = [-2, -1, 0, 1, 2, 1, 0, -1, -2, -3, -4, -6, -8];
  for (let i = 0; i < s1.length; i++) {
    if (age < s1[i]) {
      atr += s2[i];
      break;
    }
  }
  let weight = [0, -3, -1, 1, 1, -1, -3];
  atr += weight[body.weight];
  let tone = [0, -2, 0, 1, 1, -3, -5];
  atr += tone[body.tone];
  let shoulders = [0, 3, 2, 0, -2, -4, -6];
  atr += shoulders[body.shoulders];
  let hips = [0, -6, -4, -2, 0, 2, 4];
  atr += hips[body.hips];
  let waist = [0, -3, -1, 1, 3];
  atr += waist[body.waist];
  let fertility = [-4, -2, -1, 0, 1, 2, 3];
  atr += fertility[PC.fert.fertility];
  let risk = [0, -1, 0, 0, 1, 2, -2];
  atr += risk[PC.risk];
  let beauty = [0, -4, -2, 0, 2, 4];
  atr += beauty[body.beauty];
  if (PC.status.birthCon > 0) {
    atr -= 2;
  }
  if (PC.trait.extro) {
    atr += 1;
  }
  if (PC.trait.cl) {
    atr -= 1;
  }
  if (PC.trait.libido < 3) {
    atr -= 2;
  }
  if (PC.trait.libido > 6) {
    atr += 2;
  } else if (PC.trait.libido > 4) {
    atr += 1;
  }
  if (PC.mutate.fertStorm) {
    atr += 8;
  }
  atr = Math.trunc(atr / 2);
  let top = atr;
  let bot = atr;
  let ass = [0, -2, -1, 0, 1, 1, 0];
  bot += ass[body.ass];
  if (body.tits.cupNum < 7) {
    top -= 2;
  } else if (body.tits.cupNum < 12) {
    top -= 1;
  } else if (body.tits.cupNum > 29) {
    top += 3;
  } else if (body.tits.cupNum > 23) {
    top += 2;
  } else if (body.tits.cupNum > 17) {
    top += 1;
  }
  bot *= 4;
  bot /= 7;
  top *= 4;
  top /= 7;
  body.topATR = Math.round(top);
  body.botATR = Math.round(bot);
  body.ATR = Math.round(top + bot);
  setup.statusSave();
};
setup.clothingStatus = function () {
  let empty = true;
};
setup.outfitCombine = function (args0, args1, args2) {
  setup.statusLoad();
  let PC = State.variables.PC;
  let top = true;
  let bot = true;
  let acc = true;
  let exp = [0, 0];
  let coordType = 0;
  let A, B, C;
  if (!args0) {
    A = 0;
    B = 0;
    C = 0;
  } else if (!args1) {
    A = args0;
    B = 0;
    C = 0;
  } else if (!args2) {
    A = args0;
    B = args1;
    C = 0;
  } else {
    A = args0;
    B = args1;
    C = args2;
  }
  if (A == "S" || B == "S" || C == "S") {
    top = false;
  }
  if (A == "L" || B == "L" || C == "L") {
    bot = false;
  }
  if (A == "A" || B == "A" || C == "A") {
    acc = false;
  }
  if (top) {
    /*traits*/
    if ((PC.clothes.upper[12] == "N" || PC.clothes.upper[12] == -1) && (PC.clothes.lower[12] == "N" || PC.clothes.lower[12] == -1)) {
      PC.clothes.nite = true;
    } else {
      PC.clothes.nite = false;
    }
    if ((PC.clothes.upper[12] == "A" || PC.clothes.lower[12] == "A") && (PC.clothes.upper[12] == "A" || PC.clothes.upper[12] == -1) && (PC.clothes.lower[12] == "A" || PC.clothes.lower[12] == -1)) {
      PC.clothes.ath = true;
    } else {
      PC.clothes.ath = false;
    }
    if (PC.clothes.dress && (PC.clothes.lower[6] == 3 || PC.clothes.lower[6] == 5)) {
      PC.clothes.accessO = true;
    } else if (!PC.clothes.dress && PC.clothes.lower[6] <= 13) {
      PC.clothes.accessO = true;
    } else if (PC.clothes.lower[12] == -1) {
      PC.clothes.accessO = true;
    } else {
      PC.clothes.accessO = false;
    }
    /*color coordination*/
    if (PC.clothes.dress) {
      PC.clothes.coordOver = true;
      coordType = 1;
    } else {
      if (PC.clothes.lower[9] == 1 || PC.clothes.lower[9] == 2 || PC.clothes.lower[9] == 3 || PC.clothes.lower[9] == 7 || PC.clothes.lower[9] == 8 || PC.clothes.lower[9] == 9 || PC.clothes.lower[9] == 10 || PC.clothes.lower[9] == 11) {
        PC.clothes.coordOver = true;
        coordType = 2;
      } else if (PC.clothes.upper[9] == 7 || PC.clothes.upper[9] == 1) {
        PC.clothes.coordOver = true;
        coordType = 3;
      } else if ((PC.clothes.upper[9] == 2 || PC.clothes.upper[9] == 8) && PC.clothes.lower[9] == 12) {
        PC.clothes.coordOver = true;
        coordType = 4;
      } else if (PC.clothes.upper[9] == 3 && (PC.clothes.lower[9] == 13 || PC.clothes.lower[9] == 5)) {
        PC.clothes.coordOver = true;
        coordType = 4;
      } else if (PC.clothes.upper[9] == 4 && PC.clothes.lower[9] == 14) {
        PC.clothes.coordOver = true;
        coordType = 4;
      } else if (PC.clothes.upper[9] == 6 && PC.clothes.lower[9] == 17) {
        PC.clothes.coordOver = true;
        coordType = 4;
      } else {
        PC.clothes.coordOver = false;
        coordType = 0;
      }
    }
  }
  if (bot) {
    if ((PC.clothes.panties[12] == "S" || PC.clothes.panties[12] == -1) && (PC.clothes.bra[12] == "S" || PC.clothes.bra[12] == -1) && PC.clothes.leg[12] == -1) {
      PC.clothes.swim = true;
    } else {
      PC.clothes.swim = false;
    }
    if (PC.clothes.panties[6] >= 11 && PC.clothes.bra[6] >= 10) {
      PC.clothes.accessP = true;
      PC.clothes.accessB = true;
    } else if (PC.clothes.panties[6] >= 11) {
      PC.clothes.accessP = true;
      PC.clothes.accessB = false;
    } else if (PC.clothes.bra[6] >= 10) {
      PC.clothes.accessP = false;
      PC.clothes.accessB = true;
    } else {
      PC.clothes.accessP = false;
      PC.clothes.accessB = false;
    }
    if (PC.clothes.panties[12] == -1) {
      PC.clothes.accessP = true;
    }
    if (PC.clothes.bra[12] == -1) {
      PC.clothes.accessB = true;
    }
    /*pantyhose has crotch that blocks access*/
    if (PC.clothes.leg[6] == 4) {
      PC.clothes.accessP = false;
    }
    if (PC.clothes.panties[9] == PC.clothes.bra[9] && PC.clothes.panties[12] != -1) {
      PC.clothes.coordUnder = true;
    } else {
      PC.clothes.coordUnder = false;
    }
  }
  if (acc) {
    if (PC.clothes.accA[1] == "V" || PC.clothes.accB[1] == "V" || PC.clothes.accC[1] == "V" || PC.clothes.accD[1] == "V") {
      PC.clothes.pussy = true;
    } else {
      PC.clothes.pussy = false;
    }
    if (PC.clothes.accA[1] == "A" || PC.clothes.accB[1] == "A" || PC.clothes.accC[1] == "A" || PC.clothes.accD[1] == "A") {
      PC.clothes.ass = true;
    } else {
      PC.clothes.ass = false;
    }
    if (PC.clothes.accA[1] == "N" || PC.clothes.accB[1] == "N" || PC.clothes.accC[1] == "N" || PC.clothes.accD[1] == "N") {
      PC.clothes.nips = true;
    } else {
      PC.clothes.nips = false;
    }
    if (PC.clothes.accA[1] == "F" || PC.clothes.accB[1] == "F" || PC.clothes.accC[1] == "F" || PC.clothes.accD[1] == "F") {
      PC.clothes.face = true;
    } else {
      PC.clothes.face = false;
    }
    if (PC.clothes.accA[1] == "H" || PC.clothes.accB[1] == "H" || PC.clothes.accC[1] == "H" || PC.clothes.accD[1] == "H") {
      PC.clothes.head = true;
    } else {
      PC.clothes.head = false;
    }
  }
  if (PC.clothes.swim && (PC.clothes.lower[12] != -1 || PC.clothes.upper[12] != -1)) {
    PC.clothes.swim = false;
  }
  /*skirt danger!*/
  if (PC.clothes.dress && (PC.clothes.lower[6] == 3 || PC.clothes.lower[6] == 5)) {
    PC.clothes.skirtDanger = 1;
  } else if (!PC.clothes.dress && PC.clothes.lower[6] <= 13 && PC.clothes.lower[12] != -1) {
    let hemread = PC.clothes.lower[7] + "F";
    let hem;
    if (hemread.length == 3) {
      hem = hemread.slice(1, 2);
      hem -= 6;
    } else if (hemread.length == 4) {
      hem = hemread.slice(2, 3);
      hem -= 6;
    } else if (hemread.length == 2) {
      hem = 0;
    } else {
      setup.alert(`Error decoding hem length`);
      hem = 0;
    }
    if (hem > 0) {
      PC.clothes.skirtDanger = hem;
    } else {
      PC.clothes.skirtDanger = 0;
    }
  } else {
    PC.clothes.skirtDanger = 0;
  }
  /*determine the actual stats based on layering... fun*/
  let pieces = 0;
  let sexyTotal = 0;
  let formTotal = 0;
  let topLayers, topATR, mult;
  /*start with the upper body*/
  if (PC.clothes.upper[12] == -1 && PC.clothes.bra[12] == -1) {
    topLayers = 0;
    topATR = 6 + PC.body.topATR;
    sexyTotal += 6;
    formTotal -= 4;
    exp[0] = 5;
  } else if (PC.clothes.upper[12] == -1) {
    topLayers = 1;
    pieces += 1;
    sexyTotal += PC.clothes.bra[2];
    formTotal -= 2;
    formTotal += PC.clothes.bra[3];
    exp[0] = PC.clothes.bra[4];
    if (PC.clothes.bra[4] > 2.5) {
      mult = PC.clothes.bra[4] - 2.5;
      mult = Math.round(mult * 40);
      mult /= 100;
      topATR = Math.trunc(mult * PC.body.topATR);
      sexyTotal += Math.trunc(mult * 4);
      topATR += PC.clothes.bra[1];
    } else {
      topATR = PC.clothes.bra[1];
    }
  } else if (PC.clothes.bra[12] == -1) {
    topLayers = 1;
    pieces += 1;
    sexyTotal += PC.clothes.upper[2];
    formTotal += PC.clothes.upper[3];
    exp[0] = PC.clothes.upper[4];
    if (PC.clothes.upper[4] > 2.5) {
      mult = PC.clothes.upper[4] - 2.5;
      mult = Math.round(mult * 40);
      mult /= 100;
      topATR = Math.trunc(mult * PC.body.topATR);
      sexyTotal += Math.trunc(mult * 4);
      topATR += PC.clothes.upper[1];
    } else {
      topATR = PC.clothes.upper[1];
    }
  } else {
    topLayers = 2;
    pieces += 2;
    sexyTotal += PC.clothes.upper[2];
    formTotal += PC.clothes.upper[3];
    exp[0] = PC.clothes.upper[4];
    if (exp[0] > PC.clothes.bra[4]) {
      exp[0] = PC.clothes.bra[4];
    }
    if (PC.clothes.upper[4] > 2.5) {
      mult = PC.clothes.upper[4] - 2.5;
      mult = Math.round(mult * 40);
      mult /= 100;
      topATR = Math.trunc(mult * PC.clothes.bra[1]);
      sexyTotal += Math.trunc(mult * PC.clothes.bra[2]);
      topATR += PC.clothes.upper[1];
    } else {
      topATR = PC.clothes.upper[1];
    }
  }
  /*then the lower body*/
  let botLayers, botATR;
  if (PC.clothes.lower[12] == -1 && PC.clothes.panties[12] == -1) {
    botLayers = 0;
    botATR = 6 + PC.body.topATR;
    sexyTotal += 6;
    formTotal -= 5;
    exp[1] = 5;
  } else if (PC.clothes.lower[12] == -1) {
    botLayers = 1;
    pieces += 1;
    sexyTotal += PC.clothes.panties[2];
    formTotal -= 3;
    formTotal += PC.clothes.panties[3];
    exp[1] = PC.clothes.panties[4];
    if (PC.clothes.panties[4] > 2.5) {
      mult = PC.clothes.panties[4] - 2.5;
      mult = Math.round(mult * 40);
      mult /= 100;
      botATR = Math.trunc(mult * PC.body.topATR);
      sexyTotal += Math.trunc(mult * 4);
      botATR += PC.clothes.panties[1];
    } else {
      botATR = PC.clothes.panties[1];
    }
  } else if (PC.clothes.panties[12] == -1) {
    botLayers = 1;
    pieces += 1;
    sexyTotal += PC.clothes.lower[2];
    formTotal += PC.clothes.lower[3];
    exp[1] = PC.clothes.lower[4];
    if (PC.clothes.lower[4] > 2.5) {
      mult = PC.clothes.lower[4] - 2.5;
      mult = Math.round(mult * 40);
      mult /= 100;
      botATR = Math.trunc(mult * PC.body.topATR);
      sexyTotal += Math.trunc(mult * 4);
      botATR += PC.clothes.lower[1];
    } else {
      botATR = PC.clothes.lower[1];
    }
  } else {
    botLayers = 2;
    pieces += 2;
    sexyTotal += PC.clothes.lower[2];
    formTotal += PC.clothes.lower[3];
    exp[1] = PC.clothes.lower[4];
    if (exp[1] > PC.clothes.panties[4]) {
      exp[1] = PC.clothes.panties[4];
    }
    if (PC.clothes.lower[4] > 2.5) {
      mult = PC.clothes.lower[4] - 2.5;
      mult = Math.round(mult * 40);
      mult /= 100;
      botATR = Math.trunc(mult * PC.clothes.panties[1]);
      sexyTotal += Math.trunc(mult * PC.clothes.panties[2]);
      botATR += PC.clothes.lower[1];
    } else {
      botATR = PC.clothes.lower[1];
    }
  }
  let layers = 0;
  if (topLayers > 0) {
    layers += 1;
  }
  if (botLayers > 0) {
    layers += 1;
  }
  if (PC.clothes.leg[12] != -1) {
    if (layers === 0) {
      sexyTotal += Math.trunc(PC.clothes.leg[2] / 3);
      botATR += Math.trunc(PC.clothes.leg[1] / 2);
    } else if (layers == 1) {
      sexyTotal += Math.trunc(PC.clothes.leg[2] / 2);
      botATR += Math.trunc(PC.clothes.leg[1] / 2);
    } else {
      sexyTotal += PC.clothes.leg[2];
      botATR += PC.clothes.leg[1];
    }
    layers += 1;
    formTotal += PC.clothes.leg[3];
    if (exp[1] > PC.clothes.leg[4]) {
      exp[1] = PC.clothes.leg[4];
    }
  }
  let formal, sexy;
  if (layers > 0) {
    formal = Math.round(formTotal / layers);
    sexy = Math.round(sexyTotal / layers);
  } else {
    formal = Math.round(formTotal);
    sexy = Math.round(formTotal);
  }
  if (PC.clothes.dress) {
    topATR = Math.trunc(topATR / 2);
  }
  PC.clothes.atr = Math.round(topATR + botATR);
  if (PC.clothes.coordOver) {
    PC.clothes.atr += 2;
  }
  if (PC.clothes.coordUnder) {
    PC.clothes.atr += 1;
  }
  if (PC.clothes.coordUnder) {
    PC.clothes.atr += 1;
  }
  PC.clothes.exp = exp;
  if (formal >= 7) {
    PC.clothes.form = "black tie";
    PC.clothes.formCode = 3;
  } else if (formal >= 5) {
    PC.clothes.form = "formal";
    PC.clothes.formCode = 2;
  } else if (formal >= 3) {
    PC.clothes.form = "semi-formal";
    PC.clothes.formCode = 1;
  } else if (formal <= -4) {
    PC.clothes.form = "very casual";
    PC.clothes.formCode = -2;
  } else if (formal <= -1) {
    PC.clothes.form = "casual";
    PC.clothes.formCode = -1;
  } else {
    PC.clothes.form = "dressy";
    PC.clothes.formCode = 0;
  }
  if (sexy >= 8) {
    PC.clothes.sex = "slutty";
    PC.clothes.sexCode = 3;
  } else if (sexy >= 5) {
    PC.clothes.sex = "super-sexy";
    PC.clothes.sexCode = 2;
  } else if (sexy >= 3) {
    PC.clothes.sex = "sexy";
    PC.clothes.sexCode = 1;
  } else if (sexy <= -4) {
    PC.clothes.sex = "very cute";
    PC.clothes.sexCode = -2;
  } else if (sexy <= -1) {
    PC.clothes.sex = "cute";
    PC.clothes.sexCode = -1;
  } else {
    PC.clothes.sex = "normal";
    PC.clothes.sexCode = 0;
  }
  setup.statusSave();
};
setup.totalATR = function () {
  setup.statusLoad();
  setup.physicalATR();
  setup.outfitCombine();
  let PC = State.variables.PC;
  let atrM = PC.body.ATR;
  atrM += PC.clothes.atr;
  atrM += PC.clothes.statATR;
  atrM -= (PC.status.clean - 1);
  if (PC.mutate.goddess) {
    atrM += 12;
  }
  if (PC.status.health >= 90) {
    atrM += 1;
  } else if (PC.status.health < 70) {
    let temp = Math.round(PC.status.health / 10);
    temp += -8;
    atrM += temp;
  }
  if (PC.status.anger > 4) {
    atrM -= 1;
  }
  if (PC.status.stress > 50) {
    atrM -= 1;
  }
  if (PC.status.stress > 80) {
    atrM -= 1;
  }
  if (PC.status.fatigue > 7) {
    atrM -= 1;
  }
  if (PC.status.happy > 4) {
    atrM += 1;
  }
  if (PC.status.happy < -2) {
    atrM -= 1;
  }
  if (PC.status.happy < -5) {
    atrM -= 1;
  }
  if (PC.status.wombA.weeks > 0 || PC.status.wombB.weeks > 0) {
    atrM += 3;
  }
  if (PC.status.milk > 0) {
    atrM += 1;
  }
  atrM += setup.hair.prop("atr");
  atrM += PC.groom.makeupATR;
  atrM += (PC.groom.toothHealth - 4);
  if (PC.groom.leghair > 3) {
    atrM -= 4;
  } else if (PC.groom.leghair > 2) {
    atrM -= 2;
  }
  if (PC.groom.armpit > 3) {
    atrM -= 5;
  } else if (PC.groom.armpit > 2) {
    atrM -= 2;
  }
  PC.status.ATR = atrM;
  setup.statusSave();
};
setup.cleanStatus = function () {
  let status = ["Clean", "Normal", "Grungy", "Smelly", "Dirty", "Filthy"];
  let out = status[State.variables.PC.status.clean];
  return out;
};
setup.breastCalc = function () {
  let PC = State.variables.PC;
  let body = PC.body;
  let bandCase = [0, 30, 32, 34, 36, 38, 40];
  let band = bandCase[body.shoulders] || 34;
  band += (2 * body.weight) - 4;
  body.tits.band = band;
  let size = Math.round(body.tits.size / 10);
  let cup;
  let sizeCase = [15, 25, 30, 35, 37, 39, 41, 44, 46, 49, 52, 56, 59, 63, 67, 71, 76, 80, 85, 90, 96, 101, 107, 113, 119, 126, 132, 139, 146, 154, 161, 169, 177, 177, 185, 194, 202, 211, 220, 230, 239, 249, 259, 269, 280, 290, 301, 312, 324, 335, 347, 359, 371, 384, 396, 409, 422, 436, 449, 463, 477, 491, 506, 520, 535, 550, 566, 581, 597, 613, 629, 646, 662, 679, 696, 714, 731, 749, 767, 785, 804, 822];
  if (size < 13) {
    cup = -50;
  } else {
    for (let i = 0; i < sizeCase.length; i++) {
      if (size < sizeCase[i]) {
        cup = i;
        break;
      } else {
        cup = 99;
      }
    }
  }
  let bm = (17 - (band / 2)) * 3;
  let cupAdj = cup + bm;
  let cupStart, cupStop, cupLet, cupFraq, braLet;
  if (cup < 0) {
    body.tits.cupNum = -1;
    body.tits.cupRaw = -1;
    body.tits.cup = "nonexistant";
    body.tits.bra = "playing dress-up";
  } else if (cup <= 0) {
    body.tits.cupNum = 0;
    body.tits.cupRaw = 0;
    body.tits.cup = "budding";
    body.tits.bra = band + "AAA";
  } else {
    body.tits.cupNum = cupAdj;
    body.tits.cupRaw = cup;
    cupStart = Math.round((cup + 2) / 3);
    cupStop = cupStart + 1;
    if (cupStart == 1) {
      cupStart = 0;
    }
    if (cupStop == 1) {
      cupStop += 1;
    }
    let string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZ";
    cupLet = string.slice(cupStart, cupStop);
    cupFraq = ((cup + 2) / 3) % 1;
    if (cupFraq !== 0) {
      cupFraq = Math.round(cupFraq);
      if (cupFraq == 1) {
        cupLet = "small " + cupLet;
      } else {
        cupLet = "large " + cupLet;
      }
    }
    cupLet += "-cup";
    body.tits.cup = cupLet;
    if (cupAdj <= 0) {
      body.tits.bra = band + "AAA";
    } else {
      cupStart = Math.round((cupAdj + 2) / 3);
      cupStop = cupStart + 1;
      if (cupStart <= 0) {
        braLet = "AAA";
      } else {
        if (cupStart == 1) {
          cupStart = 0;
        }
        if (cupStop == 1) {
          cupStop += 1;
        }
        string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZ";
        braLet = string.slice(cupStart, cupStop);
        body.tits.bra = band + braLet;
      }
    }
  }
};