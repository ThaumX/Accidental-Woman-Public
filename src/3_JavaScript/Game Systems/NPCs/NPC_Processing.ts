
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
  };

  // Begin the actual process
  for (const key of npcs) {
    increment(key);
    companionship(key);
  }
};
