/*
.        d8888 888    888                             888    d8b
.       d88888 888    888                             888    Y8P
.      d88P888 888    888                             888
.     d88P 888 888888 888888 888d888 8888b.   .d8888b 888888 888  .d88b.  88888b.
.    d88P  888 888    888    888P"      "88b d88P"    888    888 d88""88b 888 "88b
.   d88P   888 888    888    888    .d888888 888      888    888 888  888 888  888
.  d8888888888 Y88b.  Y88b.  888    888  888 Y88b.    Y88b.  888 Y88..88P 888  888
. d88P     888  "Y888  "Y888 888    "Y888888  "Y8888P  "Y888 888  "Y88P"  888  888


*/

Macro.add("calcPhysicalATR", {
  handler() {
    setup.physicalATR();
  },
});

// calculates the physical attractiveness of the character
setup.physicalATR = function(): void {
  setup.statusLoad();
  let atr = 5;
  const PC = ↂ.pc;
  const age = PC.main.age;
  const body = PC.body;
  const s1 = [16, 18, 20, 22, 26, 28, 30, 33, 35, 37, 39, 41, 45];
  const s2 = [-2, -1, 0, 1, 2, 1, 0, -1, -2, -3, -4, -6, -8];
  for (let i = 0; i < s1.length; i++) {
    if (age < s1[i]) {
      atr += s2[i];
      break;
    }
  }
  const weight = [0, -3, -1, 1, 1, -1, -3, -4, -5, -6];
  atr += weight[body.weight];
  const tone = [0, -2, 0, 1, 1, -3, -5];
  atr += tone[body.tone];
  const shoulders = [0, 3, 2, 0, -2, -4, -6];
  atr += shoulders[body.shoulders];
  const hips = [0, -6, -4, -2, 0, 2, 4];
  atr += hips[body.hips];
  const waist = [0, -3, -1, 1, 3];
  atr += waist[body.waist];
  const fertility = [-4, -2, -1, 0, 1, 2, 3, 4, 5, 6];
  atr += fertility[PC.fert.fertility];
  const risk = [0, -1, 0, 0, 1, 2, -2];
  atr += risk[PC.status.risk];
  const beauty = [0, -4, -2, 0, 2, 4];
  atr += beauty[body.beauty];
  if (PC.status.birthCon.hormone > 0) {
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
    atr += 4;
  }
  atr = Math.floor(atr / 2);
  let top = atr;
  let bot = atr;
  const ass = [0, -2, -1, 0, 1, 2, 1, 0, -1];
  bot += ass[body.ass];
  const pelv = [0, -4, -3, -1, 0, 1, 2, 2];
  bot += pelv[body.pelvis];
  if (body.tits.cupNum < 7) {
    top -= 2;
  } else if (body.tits.cupNum < 12) {
    top -= 1;
  } else if (body.tits.cupNum > 35) {
    top += 4;
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

Macro.add("pcTotalATR", {
  handler() {
    setup.totalATR();
  },
});

// calculates the total ATR stats
setup.totalATR = function(): void {
  setup.statusLoad();
  setup.physicalATR();
  // setup.outfitCombine();
  // TODO new clothing ATR
  const PC = ↂ.pc;
  let atrM = PC.body.ATR;
  atrM += (PC.clothes.stats.atr > 0) ? Math.round(PC.clothes.stats.atr / 4) : PC.clothes.stats.atr;
  atrM -= (PC.status.clean - 1);
  if (PC.mutate.goddess) {
    atrM += 4;
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
  atrM += PC.groom.makeup.atr;
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
  PC.status.atr = atrM;
  setup.statusSave();
};

// needs work, placeholder~!
setup.calculateNPCATR = function(main: NPCmain, body: Body, fert: Fert, trait: NPCtraits, status: any, mutate: Mutation): [number, number, number] {
  let atr = 5;
  const age = main.age;
  const s1 = [16, 18, 20, 22, 26, 28, 30, 33, 35, 37, 39, 41, 45];
  const s2 = [-2, -1, 0, 1, 2, 1, 0, -1, -2, -3, -4, -6, -8];
  for (let i = 0; i < s1.length; i++) {
    if (age < s1[i]) {
      atr += s2[i];
      break;
    }
  }
  const weight = [0, -3, -1, 1, 1, -1, -3, -4, -5, -6];
  atr += weight[body.weight];
  const tone = [0, -2, 0, 1, 1, -3, -5];
  atr += tone[body.tone];
  const shoulders = [0, 3, 2, 0, -2, -4, -6];
  atr += shoulders[body.shoulders];
  const hips = [0, -6, -4, -2, 0, 2, 4];
  atr += hips[body.hips];
  const waist = [0, -3, -1, 1, 3];
  atr += waist[body.waist];
  const fertility = [-4, -2, -1, 0, 1, 2, 3, 4, 5, 6];
  atr += fertility[fert.fertility];
  const beauty = [0, -4, -2, 0, 2, 4];
  atr += beauty[body.beauty];
  if (status.birthCon != null) {
    if (status.birthCon.hormone > 0) {
      atr -= 3;
    }
  } else {
    if (status.birthConType !== "none") {
      atr -= 3;
    }
  }
  if (trait.extro) {
    atr += 1;
  }
  if (trait.cl) {
    atr -= 1;
  }
  if (trait.libido < 3) {
    atr -= 2;
  }
  if (trait.libido > 6) {
    atr += 2;
  } else if (trait.libido > 4) {
    atr += 1;
  }
  if (mutate.smooth) {
    atr += 5;
  }
  atr = Math.floor(atr / 2);
  let top = atr;
  let bot = atr;
  const ass = [0, -2, -1, 0, 1, 2, 1, 0, -1];
  bot += ass[body.ass];
  const pelv = [0, -4, -3, -1, 0, 1, 2, 2];
  bot += pelv[body.pelvis];
  if (body.tits.cupNum < 7) {
    top -= 2;
  } else if (body.tits.cupNum < 12) {
    top -= 1;
  } else if (body.tits.cupNum > 35) {
    top += 4;
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
  return [Math.round(top + bot), Math.round(top), Math.round(bot)];
};

setup.npcTotalATR = function(npcid: string): number {

  if (aw.npc[npcid] == null) {
    aw.con.warn(`Invalid npcid sent to setup.npcTotalATR somehow. npcid = ${npcid}.`);
    return 0;
  }
  const npc = aw.npc[npcid];
  let atrM = npc.body.ATR;
  // atrM += npc.clothes.stats.atr;
  atrM -= (npc.status.clean - 1);
  if (npc.mutate.goddess) {
    atrM += 12;
  }
  if (npc.status.health >= 90) {
    atrM += 1;
  } else if (npc.status.health < 70) {
    let temp = Math.round(npc.status.health / 10);
    temp += -8;
    atrM += temp;
  }
  if (npc.status.anger > 4) {
    atrM -= 1;
  }
  if (npc.status.stress > 50) {
    atrM -= 1;
  }
  if (npc.status.stress > 80) {
    atrM -= 1;
  }
  if (npc.status.fatigue > 7) {
    atrM -= 1;
  }
  if (npc.status.happy > 4) {
    atrM += 1;
  }
  if (npc.status.happy < -2) {
    atrM -= 1;
  }
  if (npc.status.happy < -5) {
    atrM -= 1;
  }
  if (npc.status.wombA.weeks > 0 || npc.status.wombB.weeks > 0) {
    atrM += 3;
  }
  if (npc.status.milk > 0) {
    atrM += 1;
  }
  if (!npc.main.female) {
    atrM += Math.pow(npc.background.wealth, 2);
  } else {
    atrM += npc.background.wealth;
  }
  atrM += npc.groom.makeup.atr;
  npc.status.atr = atrM;
  return atrM;
};
