

//                  888b    888 8888888b.   .d8888b.
//                  8888b   888 888   Y88b d88P  Y88b
//                  88888b  888 888    888 888    888
//                  888Y88b 888 888   d88P 888
//                  888 Y88b888 8888888P"  888
//                  888  Y88888 888        888    888
//                  888   Y8888 888        Y88b  d88P
//                  888    Y888 888         "Y8888P"
//
//
//   .d8888b.           888                    888          888
//  d88P  Y88b          888                    888          888
//  Y88b.               888                    888          888
//   "Y888b.    .d8888b 88888b.   .d88b.   .d88888 888  888 888  .d88b.
//      "Y88b. d88P"    888 "88b d8P  Y8b d88" 888 888  888 888 d8P  Y8b
//        "888 888      888  888 88888888 888  888 888  888 888 88888888
//  Y88b  d88P Y88b.    888  888 Y8b.     Y88b 888 Y88b 888 888 Y8b.
//   "Y8888P"   "Y8888P 888  888  "Y8888   "Y88888  "Y88888 888  "Y8888

// NAMESPACE
if (setup.npcSched == null) {
  setup.npcSched = {} as IntSetupNPCSched;
}

// INTERFACE
interface IntSetupNPCSched {
  mapGet: (main: string, maxAmt: number) => string[];
  generate: () => void;
  bucket: () => string[][];
  zone: (bucket: string[][]) => {[propName: string]: string[][]};
}

// FUNCTIONS

// collects NPCs
setup.npcSched.mapGet = function(main: string, maxAmt: number): string[] {
  const hr = State.active.variables.time[0];
  const npcs = clone(aw.npcSchedule[main][hr]);
  /*const zones = {
    bullseye : 10,
    residential: 10,
    downtown: 10,
    world: 10,
  };*/
  const maxZone = Math.round(npcs.length / 10); // originally div zones[main]
  const max = (maxZone < maxAmt) ? maxZone : maxAmt;
  const result: string[] = [];
  for (let i = 0; i < max; i++) {
    const t = npcs.length - 1;
    const r = random(0, t);
    result.push(npcs[r]);
    npcs.deleteAt(r);
  }
  return result;
};

// main function for generating day's schedule.
setup.npcSched.generate = function(): void {
  try {
    const bucket = setup.npcSched.bucket();
    const zone = setup.npcSched.zone(bucket);
    aw.npcSchedule = clone(zone);
  } catch (e) {
    aw.con.warn(`[setup.npcSched.generate] failed with error ${e.name}: ${e.message}.`);
  }
};

// sorts npcs into time-based array
setup.npcSched.bucket = function(): string[][] {
  const npcs = Object.keys(aw.npc);
  const npcCount = npcs.length;
  const bucket: string[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  for (let i = 0; i < npcCount; i++) {
    const working = (State.active.variables.date[0] !== 0) ?
      aw.npc[npcs[i]].sched.workdays[(State.active.variables.date[0] - 1)] : false;
    const wHrs = aw.npc[npcs[i]].sched.workhours;
    const oHrs = aw.npc[npcs[i]].sched.outhours;
    const avail: number[] = [];
    if (working) {
      avail.push(wHrs[0]);
      avail.push(wHrs[1]);
      if (oHrs[0] >= 1) {
        for (let j = 1; j <= oHrs[0]; j++) {
          if (wHrs[0] - j >= 0 && wHrs[0] < 24) {
            avail.push(wHrs[0] - j);
          }
        }
      }
      if (oHrs[1] >= 1) {
        for (let j = 1; j <= oHrs[1]; j++) {
          if (wHrs[1] + j >= 0 && wHrs[1] + j < 24) {
            avail.push(wHrs[1] + j);
          }
        }
      }
    } else {
      let ender = wHrs[1] + oHrs[1];
      if (ender > 23) {
        ender = 23;
      }
      for (let j = wHrs[0]; j <= ender; j++) {
        if (random(1, 3) > 1) {
          avail.push(j);
        }
      }
    }
    const c = avail.length;
    for (let j = 0; j < c; j++) {
      if (bucket[avail[j]] != null) {
        bucket[avail[j]].push(npcs[i]);
      } else {
        aw.con.warn(`[setup.npcSched.bucket] bucket[${avail[j]}] doesn't exist to push ${npcs[i]}.`);
      }
    }
  }
  return bucket;
};

// sorts bucket of NPCs into area-specific list
setup.npcSched.zone = function(bucket): {[propName: string]: string[][]} {
  // NOTE: zones var determines assigned zones AND comparative frequency
  const zones = [
    "bullseye",
    "downtown", "downtown", "downtown",
    "residential", "residential", "residential",
    "world", "world",
  ];
  const m = zones.length - 1;
  const npcs = Object.keys(aw.npc);
  const assign = {};
  // assign NPCs to specific areas for the day. seems preferable to having them jump around the map at random...
  for (let i = 0, c = npcs.length; i < c; i++) {
    assign[npcs[i]] = zones[random(0, m)];
  }
  aw.con.obj(assign, "npc assignments in setup.npcSched.zone");
  const zone = {
    bullseye: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    residential: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    downtown: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    world: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  };
  for (let i = 0; i < 24; i++) {
    for (let j = 0, c = bucket[i].length; j < c; j++) {
      const id = bucket[i][j];
      try {
        zone[assign[id]][i].push(id);
      } catch (e) {
        setup.alert(`Error pushing npc to zone bucket ${assign[id]} hour ${i}: ${e.name}: ${e.message}.`);
      }
    }
  }
  return zone;
};
