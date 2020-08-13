
//  ███╗   ██╗██████╗  ██████╗    ██████╗ ██████╗  ██████╗  ██████╗
//  ████╗  ██║██╔══██╗██╔════╝    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝
//  ██╔██╗ ██║██████╔╝██║         ██████╔╝██████╔╝██║   ██║██║
//  ██║╚██╗██║██╔═══╝ ██║         ██╔═══╝ ██╔══██╗██║   ██║██║
//  ██║ ╚████║██║     ╚██████╗    ██║     ██║  ██║╚██████╔╝╚██████╗
//  ╚═╝  ╚═══╝╚═╝      ╚═════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝

// main function to process NPC data overnight.

setup.npcProc = function(): void {
  const npcs = Object.keys(aw.npc);
  const increment = function(nid: npcid) {
    // increments the basic data of each NPC
    aw.npc[nid].main.lifetime++;
    aw.npc[nid].rship.daysince++;
  };
  const companionship = function(nid: npcid) {
    const rates = { // rate of decay & contact rand max 1-r if less than 10 contacts
      acquaint: [1, 2, 1000],
      friend: [3, 5, 50],
      dating: [7, 9, 20],
      lovers: [12, 15, 15],
      engaged: [12, 15, 12],
      married: [14, 18, 11],
    };
    // get some base vals
    const rship = aw.npc[nid].rship.category;
    if (rship === "none") { // no need to reduce if no relationship (fallback)
      return;
    }
    const vals = rates[rship];
    // randomize amount to reduce
    let reduct = random(vals[0], vals[1]);
    // adjust reduction based in intro/extroversion of chars
    if (aw.npc[nid].trait.extro) {
      reduct += Math.round(reduct * 0.33);
    } else if (aw.npc[nid].trait.intro) {
      reduct -= Math.round(reduct * 0.16);
    }
    if (ↂ.pc.trait.extro) {
      reduct += Math.round(reduct * 0.33);
    } else if (ↂ.pc.trait.intro) {
      reduct -= Math.round(reduct * 0.16);
    }
    const already = (aw.npc[nid].rship.companion === 0) ? true : false;
    aw.npc[nid].rship.companion -= reduct;
    if (aw.npc[nid].rship.companion < 0) {
      aw.npc[nid].rship.companion = 0;
    }
    if (already) { // reduce the rship vals
      reduction(nid, rship);
    } else if (aw.npc[nid].rship.companion === 0) { // check for last contact
      if (random(1, vals[2]) < 10) {
        // TODO actual contact
        // setup.notify(`If implemented, ${aw.npc[nid].name} would try to contact you today.`);
      }
    } else if (aw.npc[nid].rship.companion < 35) { // check for less frequent contact
      if (random(1, vals[2]) < 5) {
        // TODO actual contact
        // setup.notify(`If implemented, ${aw.npc[nid].name} would try to contact you today.`);
      }
    }
  };
  const reduction = function(nid: string, rship: string): void {
    // reduce rship values.
    if (aw.chad.decay) {
      return; // cheat stops this decay from happening.
    }
    let odds = 100;
    switch (rship) {
      case "married":
        odds = 5;
        break;
      case "engaged":
        odds = 4;
        break;
      case "lovers":
        odds = 2;
        break;
      case "exclusive":
        odds = 1;
        break;
      case "dating":
        odds = 1;
        break;
      case "friend":
        odds = 5;
        break;
      case "acquaint":
        odds = 20;
        break;
    }
    if (odds === 1 || random(1, odds) === 1) {
      // reduce
      if (aw.npc[nid].rship.lovePC > 0) {
        aw.npc[nid].rship.lovePC -= 1;
      }
      if (aw.npc[nid].rship.loveNPC > 0) {
        aw.npc[nid].rship.loveNPC -= 1;
      }
      if (aw.npc[nid].rship.likePC > 0) {
        aw.npc[nid].rship.likePC -= 1;
      }
      if (aw.npc[nid].rship.likeNPC > 0) {
        aw.npc[nid].rship.likeNPC -= 1;
      }
    }
    return;
  };
  const status = function(nid: string): void {
    if (aw.npc[nid].main.male) {
      aw.npc[nid].fert.cumRegen();
    }
    if (aw.npc[nid].main.female) {
      setup.fert.cycle(nid);
      if (aw.npc[nid].fert.hasFluid) {
        setup.fert.spread(nid, "time");
        setup.fert.spread(nid, "time");
        setup.fert.finalMove(nid);
        setup.fert.migrate(nid);
        setup.fert.spermAge(nid);
        if (aw.npc[nid].fert.ovuFlag) {
          setup.fert.ovulate(nid);
          aw.npc[nid].fert.ovuFlag = false;
        }
      }
      if ((aw.npc[nid].status.wombA.exists && aw.npc[nid].status.wombA.zygote.length > 0) || (aw.npc[nid].status.wombB.exists && aw.npc[nid].status.wombB.zygote.length > 0)) {
        setup.fert.zygoteCheck(nid);
      }
      if (aw.npc[nid].status.wombA.preg || aw.npc[nid].status.wombB.preg) {
        setup.fert.fetusCheck(nid);
        setup.fert.birthCheck(nid);
      }
    }
  };
  const suspicion = function(nid: string): void {
    // to decrease or increase suspicion over time.
    let change = -2;
    if (aw.npc[nid].trait.iq < 95) {
      change -= 1;
    }
    if (ↂ.pc.status.bimbo > 79) {
      change += 1;
    } else if (ↂ.pc.status.bimbo > 39) {
      change += random(0, 1);
    }
    if (ↂ.pc.status.addict.sex > 79 || ↂ.pc.status.addict.cream > 79 || ↂ.pc.status.addict.cum > 79) {
      change += 3;
    } else if (ↂ.pc.status.addict.sex > 39 || ↂ.pc.status.addict.cream > 39 || ↂ.pc.status.addict.cum > 39) {
      change += 1;
    }
    if (ↂ.pc.status.perversion > 49) {
      change += random(0, 1);
    }
    if (ↂ.pc.kink.hyperSlut) {
      change += 4;
    } else if (ↂ.pc.kink.superSlut) {
      change += 3;
    } else if (ↂ.pc.kink.slut) {
      change += 2;
    } else if (ↂ.pc.kink.liberate) {
      change += 1;
    }
    if (ↂ.job.code === "FT" || ↂ.job.code === "PR") {
      change += 2;
    }
    if (aw.npc[nid].record.cheat.suspicion > 49) {
      change += 2;
    } else if (aw.npc[nid].record.cheat.suspicion > 29) {
      change += 1;
    }
    if (change > 0 && (ↂ.pc.trait.isDevious || ↂ.pc.trait.isDeceptive)) {
      change = Math.max(0, change - 2);
    }
    if (ↂ.pc.trait.isFlirty) {
      change += 1;
    }
    aw.npc[nid].record.cheat.suspicion += change;
    if (aw.chad.ninja) {
      aw.npc[nid].record.cheat.suspicion = 0;
    }
    // ===== PC's Suspicion! ========
    change = -2;
    if (ↂ.pc.trait.extro) {
      change -= 1;
    }
    if (ↂ.pc.trait.isDeceptive || ↂ.pc.trait.isDevious) {
      change += random(1, 2);
    }
    if (ↂ.pc.trait.isOblivious) {
      change -= 2;
    }
    if (ↂ.pc.trait.isPerceptive && aw.npc[nid].record.cheat.cheatonPC[0] > aw.npc[nid].record.cheat.cheatonPC[1]) {
      change += 2;
    }
    if (aw.npc[nid].status.bimbo > 79) {
      change += 1;
    } else if (aw.npc[nid].status.bimbo > 39) {
      change += random(0, 1);
    }
    if (aw.npc[nid].status.addict.sex > 79 || aw.npc[nid].status.addict.cream > 79 || aw.npc[nid].status.addict.cum > 79) {
      change += 3;
    } else if (aw.npc[nid].status.addict.sex > 39 || aw.npc[nid].status.addict.cream > 39 || aw.npc[nid].status.addict.cum > 39) {
      change += 1;
    }
    if (aw.npc[nid].status.perversion > 49) {
      change += random(0, 1);
    }
    if (aw.npc[nid].kink.hyperSlut) {
      change += 4;
    } else if (aw.npc[nid].kink.superSlut) {
      change += 3;
    } else if (aw.npc[nid].kink.slut) {
      change += 2;
    } else if (aw.npc[nid].kink.liberate) {
      change += 1;
    }
    aw.npc[nid].record.cheat.PCsuspicion += change;
  };
  const cheat = function(nid: string): void {
    // did the npc cheat on the player today?
    const n = aw.npc[nid];
    let a = 1;
    if (n.kink.hyperSlut) {
      a += 80;
    } else if (n.kink.superSlut) {
      a += 50;
    } else if (n.kink.slut) {
      a += 20;
    }
    if (n.trait.extro) {
      a += 5;
    }
    if (!n.trait.intro) {
      a += 5;
    }
    a -= Math.max(0, Math.round((n.rship.lovePC - 40) / 3));
    a -= Math.max(0, Math.round((n.rship.likePC - 50) / 5));
    a = Math.max(1, a); // always a 1% change of cheating.
    if (n.main.female) {
      a += 9;
    }
    if (random(0, 99) < a) {
      // cheated.
      const t = randomDist([3, 6, 9]); // type of cheating 0 = sex, 1 = oral, 2 = makeout
      aw.npc[nid].record.cheat.cheatonPC[t * 2] += 1; // array indexes are 0, 2, 4
      let diff = Math.min(aw.npc[nid].record.cheat.cheatonNPC[t * 2] - aw.npc[nid].record.cheat.cheatonNPC[(t * 2) + 1], 5);
      if (ↂ.pc.trait.isOblivious) {
        diff = 1;
      } else if (ↂ.pc.trait.isPerceptive) {
        diff += 2;
      }
      aw.npc[nid].record.cheat.PCsuspicion += (3 - t) * diff;
      if (ↂ.pc.trait.intro) {
        aw.npc[nid].record.cheat.PCsuspicion += (5 - t);
      }
      if (ↂ.pc.trait.isGoodMemory) {
        aw.npc[nid].record.cheat.PCsuspicion += (3 - t);
      }
      if (ↂ.pc.trait.isNarcissist || ↂ.pc.trait.isBitch) {
        aw.npc[nid].record.cheat.PCsuspicion -= (4 - t);
      }
    }
  };
  // Begin the actual process
  for (const key of npcs) {
    increment(key);
    companionship(key);
    try {
      status(key);
    } catch (e) {
      aw.con.warn(`Error in npcProc status function for npc ${key}.\n  ${e.name}: ${e.message}`);
    }
    const t = aw.npc[key].rship.category;
    if (t === "exclusive" || t === "lovers" || t === "engaged" || t === "married") {
      suspicion(key);
      cheat(key);
    }
  }
};
