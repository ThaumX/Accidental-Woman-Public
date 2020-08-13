/*
.   ██████╗██╗  ██╗███████╗ █████╗ ████████╗██╗███╗   ██╗ ██████╗
.  ██╔════╝██║  ██║██╔════╝██╔══██╗╚══██╔══╝██║████╗  ██║██╔════╝
.  ██║     ███████║█████╗  ███████║   ██║   ██║██╔██╗ ██║██║  ███╗
.  ██║     ██╔══██║██╔══╝  ██╔══██║   ██║   ██║██║╚██╗██║██║   ██║
.  ╚██████╗██║  ██║███████╗██║  ██║   ██║   ██║██║ ╚████║╚██████╔╝
.   ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝

Function to determine infidelity across multiple relationships. Records
activity to relevant NPC records.

 */


setup.hadSexWith = function(npc: npcid, level: number = 1) {
  // levels 3 = makeout, 2 = oral, 1 = sex
  const ships = setup.getExclusive();
  if (aw.npc[npc] != null) {
    switch (level) {
      case 3:
        aw.npc[npc].record.sex.sex += 1;
        ↂ.flag.sexRecord.sex += 1;
        break;
      case 2:
        aw.npc[npc].record.sex.oral += 1;
        ↂ.flag.sexRecord.oral += 1;
        break;
      case 1:
        aw.npc[npc].record.sex.makeout += 1;
        ↂ.flag.sexRecord.makeout += 1;
        break;
    }
  }
  if ((ships.includes(npc) && ships.length === 1) || ships.length === 0) {
    // not cheating
    return;
  }
  // record cheated WITH this NPC
  if (aw.npc[npc] != null) {
    aw.npc[npc].record.cheat.cheatWithPC[level - 1] += 1;
  }
  // record cheating with all relationship NPCs
  for (const n of ships) {
    if (!aw.npc[n].record.flag.openRship) {
      aw.npc[n].record.cheat.cheatonNPC[(level - 1) * 2] += 1;
      if (!aw.chad.ninja) {
        const diff = Math.min(aw.npc[n].record.cheat.cheatonNPC[(level - 1) * 2] - aw.npc[n].record.cheat.cheatonNPC[((level - 1) * 2) + 1], 5);
        aw.npc[n].record.cheat.suspicion += (4 - level) * diff;
      }
    }
  }
};

setup.isSuspicious = function(npcid): boolean {
  const x = aw.npc[npcid].record.cheat.suspicion - (200 - aw.npc[npcid].trait.iq);
  if (x > 0 && setup.getExclusive().includes(npcid)) {
    if (x > random(0, 200)) {
      return true;
    }
  }
  return false;
};







