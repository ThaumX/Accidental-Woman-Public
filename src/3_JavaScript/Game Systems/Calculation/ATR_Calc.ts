
//  ██╗  ██╗ █████╗ ██╗    ██╗████████╗
//  ██║  ██║██╔══██╗██║    ██║╚══██╔══╝
//  ███████║███████║██║ █╗ ██║   ██║
//  ██╔══██║██╔══██║██║███╗██║   ██║
//  ██║  ██║██║  ██║╚███╔███╔╝   ██║
//  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝    ╚═╝
//
//  ███╗   ██╗██╗   ██╗███╗   ███╗██████╗ ██████╗ ███████╗
//  ████╗  ██║██║   ██║████╗ ████║██╔══██╗██╔══██╗██╔════╝
//  ██╔██╗ ██║██║   ██║██╔████╔██║██████╔╝██████╔╝███████╗
//  ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██╗██╔══██╗╚════██║
//  ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██████╔╝██║  ██║███████║
//  ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝

setup.atr = {} as IntSetupAtr;

interface IntSetupAtr {
  npcATRword: (npcid: string) => string;
  read: (group: string) => string;
  prefs: (npcid: string, tgt: "pc"|"npc") => number;
}

setup.atr.npcATRword = function(npcid: string): string {
  const atr = setup.atr.prefs(npcid, "npc");
  const female = aw.npc[npcid].main.female;
  if (atr < -4) {
    return "grotesque";
  } else if (atr < -2) {
    return "hideous";
  } else if (atr < 0) {
    return "gross";
  } else if (atr < 2) {
    return "ugly";
  } else if (atr < 4) {
    return "homely";
  } else if (atr < 7) {
    return "average";
  } else if (atr < 9) {
    return "good-looking";
  } else if (atr < 11) {
    if (female) {
      return "pretty";
    } else {
      return "appealing";
    }
  } else if (atr < 13) {
    if (female) {
      return "beautiful";
    } else {
      return "handsome";
    }
  } else if (atr < 15) {
    if (female) {
      return "gorgeous";
    } else {
      return "magnetic";
    }
  } else if (atr < 17) {
    return "stunning";
  } else if (atr < 19) {
    if (female) {
      return "radiant";
    } else {
      return "superb";
    }
  } else if (atr < 21) {
    return "captivating";
  } else {
    return "divine";
  }
};

setup.atr.read = function(group: string = "all"): string {
  let keys;
  if (group === "all") {
    keys = Object.keys(aw.npc);
  } else {
    try {
      keys = setup.npc[group];
    } catch (e) {
      aw.con.info(`setup.atr.read given invalid group ${group}. Used "all" instead`);
      keys = Object.keys(aw.npc);
    }
  }
  let total = 0;
  let max = 0;
  let min = 0;
  const num = keys.length;
  for (const key of keys) {
    const atr = setup.atr.prefs(key, "npc");
    if (atr > max) {
      max = atr;
    } else if (atr < min) {
      min = atr;
    }
    total += atr;
  }
  const avg = total / num;
  return `NPC ATR Results - Group: ${group} [avg: ${avg}, max: ${max}, min: ${min}, total: ${total}, number: ${num}]`;
};

setup.atr.prefs = function(npcid: string, tgt: "pc"|"npc"): number {
  if (aw.npc[npcid] == null) {
    aw.con.warn(`attempted to get setup.atr.prefs with bad npcid: ${npcid}.`);
    return 0;
  }
  if (tgt === "npc") {
    setup.npcTotalATR(npcid);
  }
  const pref = (tgt === "npc") ? ↂ.pref : aw.npc[npcid].pref;
  const base = (tgt === "npc") ? aw.npc[npcid].status.atr : ↂ.pc.status.atr;
  const body = (tgt === "npc") ? aw.npc[npcid].body : ↂ.pc.body;
  const trait = (tgt === "npc") ? aw.npc[npcid].trait : ↂ.pc.trait;
  const varb = (tgt == "pc" || aw.npc[npcid].main.female) ? ["Fweight", "Fmuscle", "Fheight", "Fother"] : ["weight", "muscle", "height", "other"];
  const weight = pref[varb[0]][Math.min(6, body.weight) - 1];
  const muscle = pref[varb[1]][body.tone - 1];
  const hset = (tgt === "pc" || aw.npc[npcid].main.female) ? [61, 63, 67, 70] : [66, 69, 72, 75];
  let h = 4;
  for (let i = 0; i < 4; i++) {
    if (body.height < hset[i]) {
      h = i;
      break;
    }
  }
  const height = pref[varb[2]][h];
  let result = base + weight + muscle + height + weight + muscle + height;
  if (varb[3] === "Fother") {
    // female
    if (body.tits.cupNum > 21) {
      // large tits
      result += pref.Fother[0];
    } else if (body.tits.cupNum < 11) {
      // small tits
      result += pref.Fother[1];
    }
    const hip = Math.round((body.hips + body.pelvis) / 2);
    if (hip > 5) {
      // wide
      result += pref.Fother[2];
    } else if (hip < 4) {
      // narrow
      result += pref.Fother[3];
    }
    if (trait.op && trait.intro) {
      // smrt
      result += pref.Fother[4];
    } else if (trait.cl && trait.extro) {
      // durm
      result += pref.Fother[5];
    }
    // TODO checks for finicky things like glasses, style, & makeup
    if (body.ass > 4) {
      // biggen
      result += pref.Fother[9];
    } else if (body.ass < 3) {
      // will never be in a rap video
      result += pref.Fother[10];
    }
  } else {
    // male
    if (trait.op && trait.intro) {
      // smrt
      result += pref.Fother[3];
    } else if (trait.cl && trait.extro) {
      // durm
      result += pref.Fother[4];
    }
    // wealth is already in status.atr for npcs...
    if ((body.cock.length > 60 && body.cock.girth > 14) || (body.cock.length > 50 && body.cock.girth > 20)) {
      // large
      result += pref.Fother[8];
    } else if (body.cock.length < 50 || body.cock.girth < 15) {
      // small
      result += pref.Fother[9];
    }
  }
  return result;
};


