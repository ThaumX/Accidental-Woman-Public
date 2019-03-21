
//  888b     d888        d8888 8888888b.
//  8888b   d8888       d88888 888   Y88b
//  88888b.d88888      d88P888 888    888
//  888Y88888P888     d88P 888 888   d88P
//  888 Y888P 888    d88P  888 8888888P"
//  888  Y8P  888   d88P   888 888
//  888   "   888  d8888888888 888
//  888       888 d88P     888 888
//
//  888b    888  8888888b.    .d8888b.
//  8888b   888  888   Y88b  d88P  Y88b
//  88888b  888  888    888  888    888
//  888Y88b 888  888   d88P  888
//  888 Y88b888  8888888P"   888
//  888  Y88888  888         888    888
//  888   Y8888  888         Y88b  d88P
//  888    Y888  888          "Y8888P"

/*
  Functions to place NPCs into the map system
*/

// INTERFACE

interface IntSetupMapNPC {
  setting: IntMapNPCSetting;
  get: (main: string, secondary: string, tertiary: string|false) => string[];
  zoneName: (main: string, secondary: string, tertiary?: string) => string;
  time: (zoneName: string) => number;
  getFakes: (amt: number) => string[];
  assignedNPCs: (main: string, sub: string, tert: string|false) => string[] | "none";
}

interface IntMapNPCSetting {
  max: number; // maximum NPCs in a zone
  min: number; // minimum NPCs in a zone
  rando: number[]; // [amt to modify, hard test, easy test, max] for varying people amounts
  base: number; // base number of npcs to populate in maps - global setting for all zones
  zone: { // base number of NPCs in each "zone" based on base setting (format 10 = 100%)
    [propName: string]: number;
  };
  timeDist: { // percentage of NPCs in a zone by hour of the day (format 10 = 100%)
    [propName: string]: number[];
  };
}

// NAMESPACE
if (setup.mapNPC == null) {
  setup.mapNPC = {} as IntSetupMapNPC;
}

// SETTINGS

setup.mapNPC.setting = {
  max: 20,
  min: 0,
  rando: [1, 5, 15, 25],
  base: 8,
  zone: {
    bullseye: 6,
    world: 7,
    gov: 5,
    business: 6,
    noWeekend: 3,
    residential: 8,
    resWeekend: 9,
    downtown: 10,
    downWeekend: 12,
    mall: 7,
    mallWeekend: 9,
    holefoods: 6,
    institute: 10,
    adult: 6,
    amuse: 8,
    common: 4,
    cumgo: 3,
    deserted: 1,
    default: 10,
  },
  timeDist: { //  00                  10                  20
              //  0-1 2-3 4-5 6-7 8-9 0-1 2-3 4-5 6-7 8-9 2-1 2-3
    bullseye:    [ 1,  1,  2,  3,  4,  4,  6,  5,  8, 10,  6,  3],
    world:       [ 3,  2,  1,  4,  8, 10, 10, 10, 10, 10,  8,  5],
    gov:         [ 1,  1,  3,  7, 10, 10, 10, 10,  8,  3,  1,  1],
    business:    [ 1,  1,  3,  6,  9, 10, 10, 10,  9,  5,  1,  1],
    noWeekend:   [ 0,  0,  1,  1,  2,  2,  2,  2,  1,  1,  0,  0],
    residential: [ 2,  1,  5,  8, 10,  6,  6,  6,  8, 10, 10,  5],
    resWeekend:  [ 4,  2,  3,  5,  8, 10, 10, 10, 10,  8,  6,  5],
    downtown:    [ 1,  1,  2,  2,  4,  2,  5,  4,  8, 10,  8,  5],
    downWeekend: [ 4,  1,  1,  1,  2,  6,  8, 10, 10,  8,  6,  5],
    mall:        [ 0,  0,  0,  0,  4,  2,  5,  3,  5, 10,  8,  0],
    mallWeekend: [ 0,  0,  0,  0,  5,  8, 10, 10, 10,  8,  6,  0],
    holefoods:   [ 0,  0,  0,  0,  4,  3,  4,  5,  8, 10,  8,  0],
    institute:   [ 2,  3,  4,  8, 10, 10, 10, 10,  8,  6,  5,  3],
    adult:       [ 5,  3,  1,  0,  0,  2,  3,  5,  6,  8, 10, 10],
    amuse:       [ 3,  2,  1,  1,  4, 7,  10, 10, 10, 10,  7,  5],
    common:      [ 3,  1,  1,  8, 10,  3,  3,  3,  6, 10, 10,  5],
    cumgo:       [ 6,  4,  8, 10, 10,  8, 10,  8,  8, 10, 10,  8],
    deserted:    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
    default:     [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  },
};

// FUNCTIONS

// the important one. returns array of npc ids that are in the area.
setup.mapNPC.get = function(main: string, secondary: string, tertiary: string|false = "main"): string[] {
  if (!tertiary) {
    tertiary = "main";
  }
  const zoneName = setup.mapNPC.zoneName(main, secondary, tertiary);
  const numNPC = setup.mapNPC.time(zoneName);
  let npcs: string[] = [];
  try {
    npcs = setup.npcSched.mapGet(main, numNPC);
  } catch (e) {
    aw.con.warn(`[setup.mapNPC.get] fetching list of local NPCs (setup.npcSched.mapGet) failed with error ${e.name}: ${e.message}.`);
  }
  try {
    const fakes = setup.mapNPC.getFakes(numNPC - npcs.length);
    npcs.push(...fakes);
  } catch (e) {
    aw.con.warn(`[setup.mapNPC.get] fetching list of fake NPCs (setup.mapNPC.getFakes) failed with error ${e.name}: ${e.message}.`);
  }
  return npcs;
};

// returns the proper zone property name to use for location
setup.mapNPC.zoneName = function(main: string, secondary: string, tertiary?: string): string {
  // check weekend status to return weekend-zone property
  const weekend = (State.active.variables.date[0] === 6 || State.active.variables.date[0] === 7) ?
    true : false;
  switch (main) {
    case "bullseye":
      // no special sub-zones in use
      return "bullseye";
    case "downtown":
      switch (secondary) {
        case "holefoods":
          return "holefoods";
        case "corp":
        case "bank":
          return "business";
        case "townhall":
        case "square":
          return "gov";
        case "mall":
          if (weekend) {
            return "mallWeekend";
          }
          return "mall";
        case "club":
        case "adult":
        case "PrudeShop":
          return "adult";
        case "amuse":
          return "amuse";
        default:
          if (weekend) {
            return "downWeekend";
          }
          return "downtown";
      }
    case "residential":
      switch (secondary) {
        case "common":
          return "common";
        case "cumandgo":
          return "cumgo";
        case "medical":
        case "industrial":
          if (weekend) {
            return "noWeekend";
          }
          return "business";
        case "government":
        case "reservoir":
          if (weekend) {
            return "noWeekend";
          }
          return "gov";
        default:
          if (weekend) {
            return "resWeekend";
          }
          return "residential";
      }
    case "home":
    case "BFhome":
      return "none";
    case "world":
      switch (secondary) {
        case "institute":
          if (weekend) {
            return "noWeekend";
          }
          return "institute";
        case "spring":
        case "lake":
          return "amuse";
        case "woods":
        case "forest":
          return "deserted";
        default:
          return "world";
      }
    default:
      aw.con.warn(`setup.mapNPC.zoneName - no match for main name ${main}! used default`);
      return "default";
  }
};

// determine appropriate number of NPCs based on game time
setup.mapNPC.time = function(zoneName: string): number {
  const hour = (State.active.variables.time[1] > 44 && State.active.variables.time[0] < 23) ?
    State.active.variables.time[0] + 1 : State.active.variables.time[0];
  const time = Math.floor(hour / 2);
  const zoneAmt = Math.floor((setup.mapNPC.setting.zone[zoneName] / 10) * setup.mapNPC.setting.base);
  let mod = 0;
  const rands = setup.mapNPC.setting.rando;
  const val = random(0, rands[3]);
  if (val < rands[1]) {
    mod = (random(0, 1) === 1) ? rands[0] * 2 : rands[0] * -2;
  } else if (val < rands[2]) {
    mod = (random(0, 1) === 1) ? rands[0] : rands[0] * -1;
  }
  const newBase = zoneAmt + mod;
  const ᚥ = setup.mapNPC.setting.timeDist[zoneName][time];
  return Math.floor((ᚥ / 10) * newBase);
};

setup.mapNPC.getFakes = function(amt: number): string[] {
  const npcs: string[] = [];
  const fakes = Object.keys(aw.fakeNPC);
  for (let i = 0; i < amt; i++) {
    const n = fakes[random(0, fakes.length - 1)];
    if (npcs.includes(n)) {
      i--;
    } else {
      npcs.push(n);
    }
  }
  return npcs;
};

setup.mapNPC.assignedNPCs = function(main: string, sub: string, tert: string|false = "main"): string[] | "none" {
  if (!tert) {
    tert = "main";
  }
  function hours(times: number[]|number[][]): boolean {
    // TODO this subfunction should check the listed hours to make sure the NPC should be present at
    //      the current game time. format is [startHour, endHour] for availability, or an array of them.
    return true;
  }
  const npcs: string[] = [];
  if (aw.mapNPC[main] != null) {
    if (aw.mapNPC[main][sub] != null) {
      const subKeys = Object.keys(aw.mapNPC[main][sub]);
      const testes = /n[0-9]+/;
      for (let i = 0, c = subKeys.length; i < c; i++) {
        if (testes.test(subKeys[i])) {
          if (hours(aw.mapNPC[main][sub][subKeys[i]].times) &&
            (aw.mapNPC[main][sub][subKeys[i]].cond == null || aw.mapNPC[main][sub][subKeys[i]].cond())) {
            npcs.push(subKeys[i]);
          }
        }
      }
      if (aw.mapNPC[main][sub][tert] != null) {
        const tertKeys = Object.keys(aw.mapNPC[main][sub][tert]);
        for (let i = 0, c = tertKeys.length; i < c; i++) {
          if (hours(aw.mapNPC[main][sub][tert][tertKeys[i]].times) &&
            (aw.mapNPC[main][sub][tert][tertKeys[i]].cond == null || aw.mapNPC[main][sub][tert][tertKeys[i]].cond())) {
            npcs.push(tertKeys[i]);
          }
        }
      }
    }
  }
  if (npcs.length > 0) {
    return npcs;
  } else {
    return "none";
  }
};




// MACROS

