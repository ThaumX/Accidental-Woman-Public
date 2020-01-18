
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
        setup.notify(`If implemented, ${aw.npc[nid].name} would try to contact you today.`);
      }
    } else if (aw.npc[nid].rship.companion < 35) { // check for less frequent contact
      if (random(1, vals[2]) < 5) {
        // TODO actual contact
        setup.notify(`If implemented, ${aw.npc[nid].name} would try to contact you today.`);
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
  // Begin the actual process
  for (const key of npcs) {
    increment(key);
    companionship(key);
    try {
      status(key);
    } catch (e) {
      aw.con.warn(`Error in npcProc status function for npc ${key}.\n  ${e.name}: ${e.message}`);
    }
  }
};
