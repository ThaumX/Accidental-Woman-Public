/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/
/******************************************
|   ███╗   ███╗ █████╗ ██████╗ ███████╗   |
|   ████╗ ████║██╔══██╗██╔══██╗██╔════╝   |
|   ██╔████╔██║███████║██████╔╝███████╗   |
|   ██║╚██╔╝██║██╔══██║██╔═══╝ ╚════██║   |
|   ██║ ╚═╝ ██║██║  ██║██║     ███████║   |
|   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝   |
|   ThaumX - Game area navigation code.   |
******************************************/

// INTERFACE

interface setupMap {
  nav: (main: locationMain, sub: string, tert?: string | boolean) => void;
  time: (start?: "def" | "current" | string[], dest?: "def" | "work" | "home" | string[]) => number;
  downtownTime: (s: string, st: string, d: string, dt: string) => number;
  bullseyeTime: (s: string, d: string) => number;
  residentialTime: (s: string, d: string) => number;
  carTime: (dist: number) => number;
  worldDistance: (s: string, d: string) => number;
  distToExit: (m: locationMain, s?: 0 | string, t?: 0 | string) => number;
  lookup: (loc: null | mapLocArray) => locationInfo;
}

// NAMESPACE

if (setup.map == null) {
  setup.map = {} as setupMap;
}

// FUNCTIONS

/******************************************
ONCLICK NAVIGATION FUNCTION
navigates to next location based on
imagemap click. Saves pasage load time
******************************************/
setup.map.nav = function(main: locationMain, sub: string, tert: string|false = false): void {
  let dest;
  const homes = ["homeT1", "homeT2", "homeT3", "homeT4", "homeT5"];
  const BFhomes = ["BFhomeT1", "BFhomeT2", "BFhomeT3", "BFhomeT4", "BFhomeT5"];
  if (State.active.variables.cart.length > 0 && ↂ.map.loc[0] !== "bullseye" && ↂ.map.loc[1] !== "cumandgo") {
    setup.notify("Can't leave without paying!");
    return;
  }
  if (main === "start") {
    aw.go("Start");
  }
  // this area sets the NPCs in the map location the player is visiting.
  if (ↂ.map != null) {
    if (homes.includes(main)) {
      main = "home";
    } else if (BFhomes.includes(main)) {
      main = "BFhome";
    }
    ↂ.map.NPC = [];
    if (main === "home" || main === "BFhome") {
      ↂ.map.NPCactive = false;
      aw.L("pc");
      if (ↂ.pc.clothes.keys.shoes !== 0) {
        ↂ.pc.clothes.worn.shoes = "off";
      }
      if (ↂ.pc.clothes.keys.coat !== 0) {
        ↂ.pc.clothes.worn.coat = "off"; // "normal"
      }
      aw.S("pc");
    } else {
      ↂ.map.NPCactive = true;
      if (homes.includes(ↂ.map.loc[0]) || BFhomes.includes(ↂ.map.loc[0])) {
        aw.L("pc");
        if (ↂ.pc.clothes.keys.shoes !== 0) {
          ↂ.pc.clothes.worn.shoes = "normal";
        }
        if (ↂ.pc.clothes.keys.coat !== 0) {
          ↂ.pc.clothes.worn.coat = "normal";
        }
        if (setup.clothes.exposed.top) {
          setup.achieve.new("titsExhibi");
        }
        if (setup.clothes.exposed.top && setup.clothes.exposed.bottom) {
          setup.achieve.new("fullExhibi");
        }
        aw.S("pc");
      }
      try {
        const mapNPCs = setup.mapNPC.get(main, sub, tert);
        const locNPCs = setup.mapNPC.assignedNPCs(main, sub, tert);
        if (locNPCs !== "none") {
          ↂ.map.NPC.push(...locNPCs);
        }
        if (mapNPCs.length > 0) {
          ↂ.map.NPC.push(...mapNPCs);
        }
      } catch (e) {
        aw.con.warn(`The map.ts code to set ↂ.map.NPC map NPCs failed with error ${e.name}: ${e.message}.`);
      }
    }
  }
  // this sets the proper destination passage
  if (ↂ.map.loc[0] === main) {
    switch (main) {
      case "bullseye":
        dest = "controlBullseye";
        break;
      case "downtown":
        dest = "controlDowntown";
        break;
      case "residential":
        dest = "controlResidential";
        break;
      case "home":
        dest = "homeControl";
        break;
      case "BFhome":
        dest = "BFhomeControl";
        break;
      case "world":
        if (sub === "main") { // We want to skip map control for these map-only passages as there is no movement yet.
          aw.go("MuschiValleyMap");
        } else if (sub === "appletree") {
          aw.go("AppletreeMap");
        }
        dest = "worldControl";
        break;
      default:
        setup.alert(`map.nav function ran with invalid main map value: ${main}! (sub: ${sub}.) Navigation aborted.`);
        return;
    }
  } else { // if it's not intra-map travel, we shunt to intermap control first to handle intermap events
    dest = "intermapControl";
  }
  try {
    if (ↂ.map.history.length > 4) {
      ↂ.map.history.pop();
    }
    ↂ.map.history.unshift([ↂ.map.lastLoc[0], ↂ.map.lastLoc[1], ↂ.map.lastLoc[2]]);
    const ttt = (ↂ.map.loc[2] == null) ? "main" : ↂ.map.loc[2];
    ↂ.map.lastLoc = [ↂ.map.loc[0], ↂ.map.loc[1], ttt];
    ↂ.map.loc = [main, sub, tert];
    State.active.variables.returnTo = aw.passage.title; // automatically set the default return passage
  } catch (e) {
    setup.alert(`map.nav function failed at setting coordinates or retrieving current passage with error ${e.name}: ${e.message}.`);
  }
  aw.go(dest);
};
/******************************************
TRAVEL TIME FUNCTION
determine the time required to travel between two points.
******************************************/
Macro.add("gotomap", {
  handler() {
    let main;
    let sub;
    let tert;
    let cmd;
    if (Array.isArray(this.args[0])) {
      if (this.args[0].length >= 3) {
        main = this.args[0][0];
        sub = this.args[0][1];
        tert = this.args[0][2];
        cmd = this.args.length > 1 ? this.args[1] : false;
      } else if (this.args[0].length === 2) {
        main = this.args[0][0];
        sub = this.args[0][1];
        tert = false;
        cmd = this.args.length > 1 ? this.args[1] : false;
      } else {
        return this.error("malformed destination array.");
      }
    } else if (this.args.length >= 2) {
      switch (this.args.length) {
        case 4:
          cmd = this.args[3];
          tert = this.args[2];
          sub = this.args[1];
          main = this.args[0]; // because eslint was mad at me for fallthrough...
          break;
        case 3:
          tert = this.args[2];
          sub = this.args[1];
          main = this.args[0];
          break;
        case 2:
          sub = this.args[1];
          main = this.args[0];
          break;
        default:
          return this.error("Excessive arguments sent to gotomap.");
      }
    } else {
      return this.error("Too few arguments.");
    }
    setup.map.nav(main, sub, tert);
  },
});
/******************************************
TRAVEL MACRO
handles all the repetitive tasks of setting
some variables and returns time in _mapTime
******************************************/
Macro.add("mapProcessMove", {
  handler() {
    State.temporary.mapTime = setup.map.time();
    if ("number" !== typeof State.temporary.mapTime || isNaN(State.temporary.mapTime)) {
      if (State.temporary.mapTime == null) {
        aw.con.warn("mapProcessMove macro called setup.map.time() and received a result that is not a number. (value = null)");
      } else {
        aw.con.warn(`mapProcessMove macro called setup.map.time() and received a result that is not a number. Value: ${State.temporary.mapTime}`);
      }
    }
    const data = setup.map.lookup(ↂ.map.loc);
    const ᛔ = ↂ.map;
    ᛔ.imageName = data.image;
    ᛔ.lastName = ᛔ.name;
    ᛔ.name = data.name;
    ᛔ.lastPassage = ᛔ.passage;
    ᛔ.passage = data.passage;
    State.active.variables.location = data.loc;
    State.temporary.mapDesc = data.desc;
  },
});

/******************************************
TRAVEL TIME FUNCTION
look up the information for a place
returns an object with info
******************************************/
setup.map.time = function(start: "def"|"current"|string[] = "def", dest: "def"|"work"|"home"|string[] = "def"): number {
  let sMain;
  let sSub;
  let sTert;
  let dMain;
  let dSub;
  let dTert;
  if (Array.isArray(start)) {
    sMain = start[0];
    sSub = (start[1] == null) ? "error" : start[1];
    sTert = (start[2] == null) ? "main" : start[2];
  } else if (start === "def") {
    sMain = ↂ.map.lastLoc[0];
    sSub = ↂ.map.lastLoc[1];
    sTert = ↂ.map.lastLoc[2];
  } else if (start === "current") {
    sMain = ↂ.map.loc[0];
    sSub = ↂ.map.loc[1];
    sTert = ↂ.map.loc[2];
  } else {
    setup.alert(`Invalid start location passed to travel time calculator: ${start}.`);
    return 5;
  }
  if (Array.isArray(dest)) {
    dMain = dest[0];
    dSub = (dest[1] == null) ? "error" : start[1];
    dTert = (dest[2] == null) ? "main" : start[2];
  } else if (dest === "def") {
    dMain = ↂ.map.loc[0];
    dSub = ↂ.map.loc[1];
    dTert = ↂ.map.loc[2];
  } else if (dest === "work") {
    dMain = ↂ.job.loc[0];
    dSub = ↂ.job.loc[1];
    dTert = ↂ.job.loc[2];
  } else if (dest === "home") {
    dMain = "home";
    dSub = "foyer";
    dTert = "main";
  } else {
    setup.alert(`Invalid destination location passed to travel time calculator: ${dest}.`);
    return 5;
  }
  // Time to actually get down to bidness
  let sum = 0;
  let s = sSub;
  let d = dSub;
  if (dMain === sMain && dMain !== "world") {
    switch (dMain) {
      case "residential":
        sum += setup.map.residentialTime(sSub, dSub);
        break;
      case "bullseye":
        sum += setup.map.bullseyeTime(sSub, dSub);
        break;
      case "downtown":
        sum += setup.map.downtownTime(sSub, sTert, dSub, dTert);
        break;
      case "home":
        sum += setup.randomDist([0, 90, 10]);
        break;
      case "BFhome":
        sum += setup.randomDist([0, 90, 10]);
        break;
    }
  } else {
    switch (dMain) {
      case "residential":
        if (sMain !== "home") {
          sum += setup.map.distToExit(dMain, dSub, dTert);
        }
        d = "appletree";
        break;
      case "bullseye":
        sum += setup.map.distToExit(dMain, dSub, dTert);
        d = "bullseye";
        break;
      case "downtown":
        sum += setup.map.distToExit(dMain, dSub, dTert);
        d = "appletree";
        break;
      case "BFhome":
        sum += setup.map.distToExit(dMain, dSub, dTert);
        d = "appletree";
        break;
      case "home":
        if (sMain !== "residential") {
          sum += setup.map.distToExit("residential", "common", "main");
        }
        sum += setup.map.distToExit(dMain, dSub, dTert);
        d = "appletree";
        break;
      default:
        sum += random(2, 4);
        d = "appletree";
        break;
    }
    switch (sMain) {
      case "residential":
        sum += setup.map.distToExit(sMain, sSub, sTert);
        if (dMain === "home") {
          sum -= (6 - ↂ.home.stats.location) * 2;
        }
        s = "appletree";
        break;
      case "bullseye":
        sum += setup.map.distToExit(sMain, sSub, sTert);
        d = "bullseye";
        break;
      case "downtown":
        sum += setup.map.distToExit(sMain, sSub, sTert);
        d = "appletree";
        break;
      case "BFhome":
        sum += setup.map.distToExit(sMain, sSub, sTert);
        d = "appletree";
        break;
      case "home":
        if (dMain !== "residential") {
          sum += setup.map.distToExit("residential", "common", "main");
        }
        sum += setup.map.distToExit(sMain, sSub, sTert);
        d = "appletree";
        break;
      default:
        sum += random(2, 4);
        d = "appletree";
        break;
    }
    sum += setup.map.carTime(setup.map.worldDistance(s, d));
  }
  if (sum < 1) {sum = 1; }
  return Math.round(sum);
};
// returns time to travel within downtown
setup.map.downtownTime = function(s: string, st: string, d: string, dt: string): number {
  const grid = {
    parking: [1, 1],
    bank: [1, 1.5],
    corp: [1, 2.5],
    holefoods: [1, 4],
    southeast: [2, 1],
    townhall: [2, 2.5],
    southwest: [2, 4],
    east: [3, 1],
    park: [3, 2.5],
    square: [2.5, 2.5],
    community: [3.5, 3.5],
    west: [3, 4],
    northeast: [4, 1],
    club: [4, 2],
    mall: [4, 3],
    northwest: [4, 4],
    adult: [5, 1],
    amuse: [5, 2.5],

  };
  let x;
  let y;
  let sum = 0;
  if (st !== "main") {
    sum += random(4, 6);
  }
  if (dt !== "main") {
    sum += random(4, 6);
  }
  x = Math.abs(grid[s][0] - grid[d][0]);
  y = Math.abs(grid[s][1] - grid[d][1]);
  if (y === 0 || x === 0) {
    x = y + x;
    sum += Math.round(1.1 * x * 5);
  } else {
    sum += Math.round((Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + ((x + y) * 0.20)) * 5);
  }
  aw.con.info(`setup.map.downtownTime returns ${sum}.`);
  return sum;
};
// returns time to travel within bullseye
setup.map.bullseyeTime = function(s: string, d: string): number {
  const grid = {
    hardware: [1, 1],
    electronics: [1, 2],
    toys: [1, 3],
    baby: [1, 4],
    grocery1: [1, 5],
    housewares1: [2, 1],
    womens1: [2, 2],
    womens2: [2, 3],
    lingerie: [2, 4],
    grocery2: [2, 5],
    changing: [2.5, 3],
    housewares2: [3, 1],
    girls: [3, 2],
    boys: [3, 3],
    mens: [3, 4],
    grocery3: [3, 5],
    pharmacy: [4, 1],
    glasses: [4, 2],
    barber: [4, 3],
    custserv: [4, 4],
    produce: [4, 5],
    parking: [5, 4],
  };
  const x = Math.ceil(Math.abs(grid[s][0] - grid[d][0]) + Math.abs(grid[s][1] - grid[d][1]));
  aw.con.info(`setup.map.bullseyeTime returns ${x}.`);
  return x;
};
// returns time to travel within residential area
setup.map.residentialTime = function(s: string, d: string): number {
  let sum = 0;
  const ar = ["medical", "reservoir", "industrial", "government"];
  if (ar.includes(s) && !ar.includes(d)) {
    if (s !== "reservoir") {
      sum += (6 - ↂ.home.stats.location) * 2;
    } else {
      sum += ↂ.home.stats.location * 2;
    }
    sum += 4;
  } else if (ar.includes(d) && !ar.includes(s)) {
    if (d !== "reservoir") {
      sum += (6 - ↂ.home.stats.location) * 2;
    } else {
      sum += ↂ.home.stats.location * 2;
    }
    sum += 4;
  } else if (ar.includes(d) && ar.includes(s)) {
    if (s !== "reservoir" && d !== "reservoir") {
      sum += 1;
    } else {
      sum += 10;
    }
    sum += 4;
  } else {
    let arr;
    switch (s) {
      case "common":
        arr = {
          parking: 2,
          sidewalk: 2,
          cumandgo: 5,
          recreation: 3,
          walkdowntown: 6,
          jogging: 10,
        };
        break;
      case "parking":
        arr = {
          common: 2,
          sidewalk: 3,
          cumandgo: 6,
          recreation: 2,
          walkdowntown: 7,
          jogging: 11,
        };
        break;
      case "sidewalk":
        arr = {
          common: 2,
          parking: 3,
          cumandgo: 4,
          recreation: 4,
          walkdowntown: 5 ,
          jogging: 9,
        };
        break;
      case "cumandgo":
        arr = {
          common: 5,
          parking: 6,
          sidewalk: 4,
          recreation: 8,
          walkdowntown: 1,
          jogging: 10,
        };
        break;
      case "recreation":
        arr = {
          common: 3,
          parking: 2,
          sidewalk: 4,
          cumandgo: 8,
          walkdowntown: 8,
          jogging: 10,
        };
        break;
      case "walkdowntown":
        arr = {
          common: 6,
          parking: 7,
          sidewalk: 5,
          cumandgo: 1,
          recreation: 8,
          jogging: 12,
        };
        break;
      case "jogging":
        arr = {
          common: 10,
          parking: 11,
          sidewalk: 9,
          cumandgo: 10,
          recreation: 10,
          walkdowntown: 12,
        };
        break;
    }
    let v = arr[d];
    if (v == null) {v = random(2, 3); }
    aw.con.info(`setup.map.residential returns ${v}. S: ${s} D:${d}.`);
    return v;
  }
  aw.con.info(`setup.map.residential returns ${sum}. S: ${s} D:${d}.`);
  return sum;
};
// calculates time to drive a certain distance (miles)
setup.map.carTime = function(dist: number): number {
  const r = ((random(50, 65) + random(50, 65) + random(55, 60)) / 3) / 60;
  return Math.round(dist / r);
};
// returns distance in miles between world locations
setup.map.worldDistance = function(s: string, d: string): number {
  let ob;
  switch (s) {
    case "appletree":
      ob = {
        appletree : 0,
        institute : 8.7,
        bullseye : 15.5,
        visitor : 9.5,
        spring : 11.7,
        woods : 4.2,
        forest : 14,
        city : 68,
        coop : 20.8,
        lake : 28.3,
        restricted : 11.5,
        bridge : 5.5,
        unknown : 20,
      };
      break;
    case "institute":
      ob = {
        appletree : 8.7,
        institute : 0,
        bullseye : 24.2,
        visitor : 18.2,
        spring : 17.4,
        woods : 10,
        forest : 22.7,
        city : 76.7,
        coop : 26.9,
        lake : 24.9,
        restricted : 9.3,
        bridge : 14.2,
        unknown : 17,
      };
      break;
    case "bullseye":
      ob = {
        appletree : 15.5,
        institute : 24.2,
        bullseye : 0,
        visitor : 6,
        spring : 25.7,
        woods : 19.7,
        forest : 12.5,
        city : 53.2,
        coop : 6.7,
        lake : 23.3,
        restricted : 17.9,
        bridge : 9.6,
        unknown : 22,
      };
      break;
    case "visitor":
      ob = {
        appletree : 9.5,
        institute : 18.2,
        bullseye : 6,
        visitor : 0,
        spring : 19.7,
        woods : 13.7,
        forest : 6.5,
        city : 59.2,
        coop : 11.3,
        lake : 17.3,
        restricted : 12.9,
        bridge : 3.6,
        unknown : 22,
      };
      break;
    case "spring":
      ob = {
        appletree : 11.7,
        institute : 17.4,
        bullseye : 27.2,
        visitor : 21.2,
        spring : 0,
        woods : 7.5,
        forest : 25.7,
        city : 79.7,
        coop : 32.5,
        lake : 38.5,
        restricted : 23.2,
        bridge : 17.2,
        unknown : 31.7,
      };
      break;
    case "woods":
      ob = {
        appletree : 4.2,
        institute : 9.9,
        bullseye : 19.7,
        visitor : 13.7,
        spring : 7.5,
        woods : 0,
        forest : 18.2,
        city : 72.2,
        coop : 25.0,
        lake : 31.0,
        restricted : 15.7,
        bridge : 8.7,
        unknown : 24.2,
      };
      break;
    case "forest":
    case "city":
    case "coop":
      ob = {
        appletree : 20.8,
        institute : 26.9,
        bullseye : 6.7,
        visitor : 11.3,
        spring : 32.5,
        woods : 25.0,
        forest : 17.7,
        city : 59.9,
        coop : 0,
        lake : 13.4,
        restricted : 23.1,
        bridge : 14.8,
        unknown : 22,
      };
      break;
    case "lake":
      ob = {
        appletree : 28.3,
        institute : 24.9,
        bullseye : 23.3,
        visitor : 17.3,
        spring : 38.5,
        woods : 31.0,
        forest : 23.7,
        city : 73.3,
        coop : 13.4,
        lake : 0,
        restricted : 15.5,
        bridge : 19.1,
        unknown : 22,
      };
      break;
    case "restricted":
      ob = {
        appletree : 11.6,
        institute : 9.3,
        bullseye : 18.9,
        visitor : 12.9,
        spring : 23.2,
        woods : 15.7,
        forest : 17.4,
        city : 64.6,
        coop : 23.1,
        lake : 15.5,
        restricted : 0,
        bridge : 8.9,
        unknown : 22,
      };
      break;
    case "bridge":
      ob = {
        appletree : 5.5,
        institute : 14.2,
        bullseye : 10,
        visitor : 4,
        spring : 17.2,
        woods : 9.7,
        forest : 8.5,
        city : 62.5,
        coop : 15.3,
        lake : 22.7,
        restricted : 8.9,
        bridge : 0,
        unknown : 25,
      };
      break;
    case "unknown":
    default:
      ob = {
        appletree : 20,
        institute : 20,
        bullseye : 20,
        visitor : 20,
        spring : 20,
        woods : 20,
        forest : 20,
        city : 20,
        coop : 20,
        lake : 20,
        restricted : 20,
        bridge : 20,
        unknown : 20,
      };
      break;
  }
  let miles = 20;
  try {
    aw.con.info(`setup.map.worldDistance returns ${ob[d]}. S: ${s} D:${d}.`);
    miles = ob[d] + 1;
  } catch (e) {
    aw.con.warn(`Error finding distance between ${s} and ${d}.`);
  }
  ↂ.home.finance.miles += miles;
  ↂ.flag.milesDriven += miles;
  ↂ.flag.car.mileage += miles;
  return miles;
};
// time to travel to the map zone exit from location
setup.map.distToExit = function(m: locationMain, s: 0 | string = 0, t: 0 | string = 0 ): number {
  const times = {
    home() {
      const ts = {
        foyer: 1,
        living: 2,
        kitchen: 2,
        bedroom: 3,
        bath: 3,
        balcony: 3,
        clean: 10,
        bed2: 3,
        bed3: 3,
      };
      return ts[s];
    },
    BFhome() {
      const ts = {
        exterior: 10,
        living: 11,
        kitchen: 11,
        bedroom: 12,
        bath: 12,
      };
      return ts[s];
    },
    residential() {
      let ts;
      const p = (6 - ↂ.home.stats.location) * 2;
      switch (s) {
        case "common":
          switch (t) {
            case "mail": ts = 2 + p; break;
            case "gym": ts = 3 + p; break;
            case "party": ts = 3 + p; break;
            case "main": ts = 2 + p; break;
            default: ts = 2 + p; break;
          }
          break;
        case "parking": ts = 1 + p; break;
        case "sidewalk": ts = 3 + p; break;
        case "cumandgo":
          switch (t) {
            case "checkout": ts = 6 + p; break;
            case "shop1": ts = 7 + p; break;
            case "shop2": ts = 7 + p; break;
            case "shop3": ts = 7 + p; break;
            case "shop4": ts = 7 + p; break;
            case "exterior": ts = 5 + p; break;
            default: ts = 5 + p; break;
          }
          break;
        case "recreation":
          switch (t) {
            case "playground": ts = 2 + p; break;
            case "gazebo": ts = 3 + p; break;
            case "tanning": ts = 4 + p; break;
            case "pool": ts = 6 + p; break;
            case "sports": ts = 4 + p; break;
            case "main": ts = 2 + p; break;
            default: ts = 2 + p; break;
          }
          break;
        case "home": ts = 10; break;
        case "walkdowntown": ts = (6 - ↂ.home.stats.location) * 6; break;
        case "jogging": ts = 13; break;
        case "reservoir": ts = 14; break;
        case "medical": ts = 5; break;
        case "industrial": ts = 5; break;
        case "government": ts = 3; break;
        default: ts = 3 + p; break;
      }
      return ts;
    },
    downtown() {
      let ts;
      const d = 3;
      const pyth = function(x, y) {
        let dist;
        const st = 5;
        if (y === 0 || x === 0) {
          x = y + x;
          dist = Math.round(1.1 * x * st);
        } else {
          dist = Math.round((Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + ((x + y) * 0.20)) * st);
        }
        dist += d;
        return dist;
      };
      switch (s) {
        case "parking": ts = 1 + d; break;
        case "holefoods": ts = pyth(3, 0); break;
        case "corp": ts = pyth(1.5, 0); break;
        case "bank": ts = pyth(0.5, 0); break;
        case "townhall": ts = pyth(1.5, 1); break;
        case "park": ts = pyth(2, 2); break;
        case "community": ts = pyth(2.5, 2.5); break;
        case "mall":
          switch (t) {
            case "exterior": ts = pyth(2, 3); break;
            case "foodcourt": ts = pyth(2, 3) + 4; break;
            case "fmovies": ts = pyth(2, 3) + 6; break;
            case "fitta": ts = pyth(2, 3) + 6; break;
            case "westshop": ts = pyth(2, 3) + 5; break;
            case "bbb": ts = pyth(2, 3) + 6; break;
            case "northshop": ts = pyth(2, 3) + 5; break;
            case "southshop": ts = pyth(2, 3) + 4; break;
            case "voidshop": ts = pyth(2, 3) + 5; break;
            default: ts = pyth(2, 3); break;
          }
          break;
        case "club":
          if (t === "main" || !t) {
            ts = pyth(1, 3);
          } else {
            ts = pyth(1, 3) + 3;
          }
          break;
        case "amuse": ts = pyth(1.5, 4); break;
        case "adult": ts = pyth(0, 4); break;
        case "northwest": ts = pyth(3, 3); break;
        case "west": ts = pyth(3, 2); break;
        case "southwest": ts = pyth(3, 1); break;
        case "northeast": ts = pyth(0, 3); break;
        case "east": ts = pyth(0, 2); break;
        case "southeast": ts = pyth(0, 1); break;
        case "square": ts = pyth(1.5, 2); break;
      }
      return ts;
    },
    bullseye() {
      const po = {
        parking: 1,
        hardware: 8,
        electronics: 7,
        toys: 6,
        baby: 5,
        grocery1: 6,
        grocery2: 5,
        grocery3: 4,
        produce: 3,
        housewares1: 7,
        housewares2: 6,
        pharmacy: 5,
        womens1: 6,
        womens2: 5,
        lingerie: 4,
        girls: 5,
        boys: 4,
        glasses: 4,
        barber: 3,
        custserv: 2,
        changing: 4,
        mens: 3,
      };
      return po[s];
    },
  };
  const q = times[m]();
  aw.con.info(`setup.map.distToExit returns ${q}. S: ${s} M:${m}.`);
  return q;
};
/******************************************
LOOKUP FUNCTION
look up the information for a place
returns an object with info
******************************************/
setup.map.lookup = function(loc: mapLocArray): locationInfo {
  let main;
  let sub;
  let tert;
  let ret = {
    image: "IMGtestLocImage",
    name: "Error",
    passage: "none",
    loc: "Error",
    desc: "None, there was a problem yo!",
  };
  if (loc != null && Array.isArray(loc)) {
    try {
      main = loc[0];
      sub = loc[1];
      tert = (loc[2] == null) ? "none" : loc[2];
    } catch (e) {
      setup.alert(`Error with map.lookup function input. ${e.name}: ${e.message}.`);
      main = ↂ.map.loc[0];
      sub = ↂ.map.loc[1];
      tert = ↂ.map.loc[2];
    }
  } else {
    main = ↂ.map.loc[0];
    sub = ↂ.map.loc[1];
    tert = ↂ.map.loc[2];
  }
  switch (main) {
    case "bullseye":
      switch (sub) {
        case "parking":
          ret = {
            name: "Bullseye Parking Lot",
            image: "IMGBullseye",
            passage: "BEparking",
            loc: "Bullseye Parking Lot",
            desc: "You are walking, which is mostly what people do in parking lots. Well, except for that...",
          };
          break;
        case "hardware":
          ret = {
            name: "Bullseye Hardware Department",
            image: "IMGBullseyeHardware",
            passage: "BEhardware",
            loc: "Bullseye - Hardware",
            desc: "You are standing in the main aisle, gazing at the rows of DIY and home improvement goods.",
          };
          break;
        case "electronics":
          ret = {
            name: "Bullseye Electronics Department",
            image: "IMGBullseyeElectronics",
            passage: "BEelectronics",
            loc: "Bullseye - Electronics",
            desc: "You are staring at the wall of display televisions, wondering if you should turn them all to different channels.",
          };
          break;
        case "toys":
          ret = {
            name: "Bullseye Toy Department",
            image: "IMGBullseyeToys",
            passage: "BEtoys",
            loc: "Bullseye - Toys",
            desc: "You are looking around, marveling at how toys have changed since you were a kid.",
          };
          break;
        case "baby":
          ret = {
            name: "Bullseye Baby Department",
            image: "IMGBullseyeBaby",
            passage: "BEbaby",
            loc: "Bullseye - Baby",
            desc: "Looking around at all the cute baby things has you wondering what it would be like to have your own baby.",
          };
          if (ↂ.pc.kink.pregnancy) {
            ret.desc = "You realize that just standing here is getting you to think about making babies, and you're getting worked up.";
          } else if (ↂ.pc.status.kids > 0) {
            if (ↂ.pc.status.kids === 1) {
              ret.desc = "When you look around the baby section, it reminds you of your own children. All the cute things kind of make you think about having another one.";
            } else {
              ret.desc = "When you look around the baby section, it reminds you of your own child. All the cute things kind of make you think about having another one.";
            }
          }
          break;
        case "grocery1":
          ret = {
            name: "Bullseye Grocery Department - Cooler Section",
            image: "IMGBullseyeGrocery2",
            passage: "BEgrocery1",
            loc: "Bullseye - Grocery",
            desc: "The cooler air in the part of the store gives you slight goosebumps.",
          };
          break;
        case "housewares1":
          ret = {
            name: "Bullseye Housewares Department",
            image: "IMGBullseyeHousewares1",
            passage: "BEhousewares1",
            loc: "Bullseye - Housewares",
            desc: "An 'as seen on TV' shelf draws your attention, full of things that seem both innovative and useless.",
          };
          break;
        case "womens1":
          ret = {
            name: "Bullseye Women's Clothing Department",
            image: "IMGBullseyeWomens2",
            passage: "BEwomens1",
            loc: "Bullseye - Women's",
            desc: "you look at the variety of the clothing that seems to be displayed following absolutely no organising method whatsoever.",
          };
          break;
        case "womens2":
          ret = {
            name: "Bullseye Women's Clothing Department",
            image: "IMGBullseyeWomens1",
            passage: "BEwomens2",
            loc: "Bullseye - Women's",
            desc: "you look at the variety of the clothing that seems to be displayed following absolutely no organising method whatsoever.",
          };
          break;
        case "lingerie":
          ret = {
            name: "Bullseye Lingerie & Jewelry Departments",
            image: "IMGBullseyeLingerie",
            passage: "BElingerie",
            loc: "Bullseye - Lingerie",
            desc: "You look around, distracted. There's a lot here to catch the eye.",
          };
          break;
        case "grocery2":
          ret = {
            name: "Bullseye Grocery Department - Bulk Goods",
            image: "IMGBullseyeGrocery",
            passage: "BEgrocery2",
            loc: "Bullseye - Grocery",
            desc: "As you look around, you remember when you only had the relatively small men's toiletries section to deal with.",
          };
          break;
        case "housewares2":
          ret = {
            name: "Bullseye Housewares Department",
            image: "IMGBullseyeHousewares1",
            passage: "BEhousewares2",
            loc: "Bullseye - Housewares",
            desc: "Some vibrant pink caught your eye in the athletic equipment aisle, and when you take a look you see that it was a set of dainty pink weights that look rediculous next to the larger weights meant for men.",
          };
          break;
        case "girls":
          ret = {
            name: "Bullseye Girl's Clothing Department",
            image: "IMGBullseyeGirls",
            passage: "BEchild1",
            loc: "Bullseye - Girl's",
            desc: "As you stand looking at all the children's clothing, you find yourself thinking that one tiny outfit or another is super cute.",
          };
          break;
        case "boys":
          ret = {
            name: "Bullseye Boy's Clothing Department",
            image: "IMGBullseyeBoys",
            passage: "BEchild2",
            loc: "Bullseye - Boy's",
            desc: "As you stand looking at all the children's clothing, you find yourself thinking that one tiny outfit or another is super cute.",
          };
          break;
        case "mens":
          ret = {
            name: "Bullseye Men's Clothing Department",
            image: "IMGBullseyeMens",
            passage: "BEmens",
            loc: "Bullseye - Men's",
            desc: "You can't help but think that buying clothes as a man was so much more convenient.",
          };
          break;
        case "grocery3":
          ret = {
            name: "Bullseye Grocery Department - Dry Goods",
            image: "IMGBullseyeGrocery2",
            passage: "BEgrocery3",
            loc: "Bullseye - Grocery",
            desc: "You're starting to get hungry from looking at all the food.",
          };
          break;
        case "pharmacy":
          ret = {
            name: "Bullseye Pharmacy Department",
            image: "IMGBullseyePharmacy",
            passage: "BEpharmacy",
            loc: "Bullseye - Pharmacy",
            desc: "Looking around, it seems like someone took a larger pharmacy and split it between the grocery section and this smaller one. You were thinking how much of a pain it'd be to walk across the store, but then you realize that's probably the whole point.",
          };
          break;
        case "glasses":
          ret = {
            name: "Bat's Optometry Clinic",
            image: "IMGBullseyeGlasses",
            passage: "BEglasses",
            loc: "Bullseye Vendor",
            desc: "The cute logo on the sign of a cartoon bat wearing glasses is obviously meant to imply that they can even give bats good vision... but you wonder if a bat is really the best mascot for an optometrist.",
          };
          break;
        case "barber":
          ret = {
            name: "BEST HEAD! - Barbershop",
            image: "IMGBullseyeHair",
            passage: "BEbarber",
            loc: "Bullseye Vender",
            desc: "Aside from the funny name, you aren't entirely sure about the quality of this salon. It's cheap and convenient though... perhaps if you keep it simple?",
          };
          break;
        case "custserv":
          ret = {
            name: "Bullseye Customer Service",
            image: "IMGBullseye",
            passage: "BEcustserv",
            loc: "Bullseye - Checkout",
            desc: "This area of the store is kind of depressing for some reason, so you try not to think about it.",
          };
          break;
        case "produce":
          ret = {
            name: "Bullseye Produce Department",
            image: "IMGBullseyeProduce",
            passage: "BEproduce",
            loc: "Bullseye - Produce",
            desc: "You watch a woman who seems to be around 30 years old as she browses the produce. She spends a strange amount of time examining jumbo cucumbers before moving on to the eggplants.",
          };
          break;
        case "changing":
          ret = {
            name: "Bullseye Changing Rooms",
            image: "IMGBullseyeChanging",
            passage: "BEchanging",
            loc: "Bullseye - Changing",
            desc: "A small set of rooms that offer a presumption of privacy to try on clothes. You can't help but wonder just how private they really are though...",
          };
          break;
      }
      break;
    case "residential":
      switch (sub) {
        case "common":
          switch (tert) {
            case "mail":
              ret = {
                name: "Apartment Building - Mail Room",
                image: "IMGresidentialMail",
                passage: "ResidentialMailRoom",
                loc: "Apartment - Mail Room",
                desc: "A small room with boxes for mail delivery, as well as a deposit slot to mail letters.",
              };
              break;
            case "gym":
              ret = {
                name: "Apartment Building - Gym",
                image: "IMGresidentialGym",
                passage: "ResidentialWorkoutRoom",
                loc: "Apartment - Gym",
                desc: "You're in the small common exercise area provided for residents to use.",
              };
              break;
            case "party":
              ret = {
                name: "Apartment Building - Common Room",
                image: "IMGresidentialCommonRoom",
                passage: "ResidentialCommonRoom",
                loc: "Apartment - Common Room",
                desc: "You're in the apartment building's common room, an area used to hold parties and other events for residents.",
              };
              break;
            case "main":
            default:
              ret = {
                name: "Apartment Building - Common Area",
                image: "IMGresidentialCommonArea",
                passage: "ResidentialCommonArea",
                loc: "Apartment - Common Area",
                desc: "You're standing in the small downstairs common area of your apartment building. Opposite of the elevator and stairwell there's a sitting area that consists of a couch and a few upholstered chairs surrounding a simple coffee table. Closer to the main entry is an open doorway leading to the mailroom. Further inside, the common area ends with hallways splitting off in each direction. Next to the front entrance is a small exercise room, and a larger common room for gatherings.",
              };
              break;
          }
          break;
        case "parking":
          ret = {
            name: "Apartment Parking Lot",
            image: "IMGresidentialCourtyard2",
            passage: "ResidentialParkingLot",
            loc: "Parking Lot",
            desc: "You are in the common area at the center of a block of buildings that includes your apartment building. The square block of buildings has a large opening at the center, leaving plenty of room for parking as well as a small neighborhood park. While there isn't a lot of space, they've managed to fit a small playground, some picnic tables, a half-sized basketball court, a BBQ area, and a small grassy area for tanning in the park.",
          };
          break;
        case "sidewalk":
          ret = {
            name: "Residential Area Sidewalk",
            image: "IMGresidentialOutside2",
            passage: "ResidentialSidewalk",
            loc: "Your Neighborhood",
            desc: "You are standing on the sidewalk next to your apartment building, it's a short walk downtown from here, and there is a bike trail nearby.",
          };
          break;
        case "cumandgo":
          switch (tert) {
            case "checkout":
              ret = {
                name: "Cum & Go Convenience Store",
                image: "IMGkum&goStore2",
                passage: "ResidentialCornerInteriorA",
                loc: "Cum & Go",
                desc: "You're near the checkout counter of the Cum & Go convenience store.",
              };
              break;
            case "shop1":
              ret = {
                name: "Cum & Go Cleaning, Health & Hygiene",
                image: "IMGkum&goStore2",
                passage: "ResidentialCornerInteriorB",
                loc: "Cum & Go",
                desc: "You are in the section the store that has cleaning, hygiene, and medicine items.",
              };
              break;
            case "shop2":
              ret = {
                name: "Cum & Go Cooler Section",
                image: "IMGkum&goStore2",
                passage: "ResidentialCornerInteriorC",
                loc: "Cum & Go",
                desc: "You are in the cooler section of Cum & Go that has all the refrigerated food and drinks.",
              };
              break;
            case "shop3":
              ret = {
                name: "Cum & Go Miscellaneous",
                image: "IMGkum&goStore2",
                passage: "ResidentialCornerInteriorD",
                loc: "Cum & Go",
                desc: "You're in an aisle with a odd mixture of items that wouldn't fit with a larger category. What the hell is blinker fluid, anway?",
              };
              break;
            case "shop4":
              ret = {
                name: "Cum & Go Food Section",
                image: "IMGkum&goStore2",
                passage: "ResidentialCornerInteriorE",
                loc: "Cum & Go",
                desc: "You are surrounded by items that could technically be called food, though you have to look at a few labels to be sure.",
              };
              break;
            case "exterior":
            default:
              ret = {
                name: "Cum & Go Exterior",
                image: "IMGkum&goStore2",
                passage: "ResidentialCornerExterior",
                loc: "Cum & Go",
                desc: "You're standing outside a typical convenience store, creatively named 'Cum & Go.",
              };
              break;
          }
          break;
        case "recreation":
          switch (tert) {
            case "playground":
              ret = {
                name: "Neighborhood Playground",
                image: "IMGresidentialCourtyard2",
                passage: "ResidentialPlayground",
                loc: "Residential - Recreation",
                desc: "",
              };
              break;
            case "gazebo":
              ret = {
                name: "Community Gazebo",
                image: "IMGresidentialGazebo",
                passage: "ResidentialGazebo",
                loc: "Residential - Recreation",
                desc: "You're in a nice wooden gazebo that contains some picinic tables. Nearby are the standard steel grills found in parks everywhere.",
              };
              break;
            case "tanning":
              ret = {
                name: "Grassy Picnic Area",
                image: "IMGsunbathing1",
                passage: "ResidentialTanning",
                loc: "Residential - Recreation",
                desc: "You're in a grassy area surrounded by hedges. It seems to be intended more for tanning and relaxation than picnics though.",
              };
              break;
            case "pool":
              ret = {
                name: "Neighborhood Pool",
                image: "IMGresidentialPool",
                passage: "ResidentialPool",
                loc: "Residential - Recreation",
                desc: "You're near a pool for residents of the apartment complex. It's on the small side, but the water looks clean.",
              };
              break;
            case "sports":
              ret = {
                name: "Neighborhood Sports Field",
                image: "IMGresidentialCourtyard2",
                passage: "ResidentialSports",
                loc: "Residential - Sports",
                desc: "You're standing on an open grassy area clearly designated for sports, there's a half-court for basketball on the far side.",
              };
              break;
            case "main":
            default:
              ret = {
                name: "Neighborhood Recreation Area",
                image: "IMGresidentialCourtyard2",
                passage: "ResidentialRecreation",
                loc: "Residential Courtyard",
                desc: "You are in the common area at the center of a block of buildings that includes your apartment building. The square block of buildings has a large opening at the center, leaving plenty of room for parking as well as a small neighborhood park. While there isn't a lot of space, they've managed to fit a small playground, some picnic tables, a half-sized basketball court, a BBQ area, and a small grassy area for tanning in the park.",
              };
              break;
          }
          break;
        case "walkdowntown":
          ret = {
            name: "Walking Downtown",
            image: "IMGresidentialOutside2",
            passage: "ResidentialGoDowntown",
            loc: "Appletree",
            desc: "The residential area of Appletree.",
          };
          break;
        case "jogging":
          ret = {
            name: "Jogging Path",
            image: "IMGresidentialJogging",
            passage: "ResidentialJogging",
            loc: "Jogging Path",
            desc: "You're on one of several designated bike and jogging paths that crisscross Appletree.",
          };
          break;
        case "reservoir":
          ret = {
            name: "Tesla Reservoir",
            image: "IMGTeslaLocImage",
            passage: "ResidentialReservoir",
            loc: "Tesla Reservoir",
            desc: "You are standing next to a man-made lake that holds Appletree's water supply, though it seems to be treated more like a recreational area.",
          };
          break;
        case "medical":
        switch (tert) {
          case "hospital":
            ret = {
              name: "Arbor Vitae Regional Hospital",
              image: "IMG-LocationMedicalOutpatient",
              passage: "ResidentialMedicalHospital",
              loc: "Arbor Vitae Regional Hospital",
              desc: "You are in the main lobby of the Arbor Vitae Regional Hospital.",
            };
            break;
          case "applecare":
            ret = {
              name: "AppleCare Offices",
              image: "IMG-LocationMedicalAppleCare",
              passage: "ResidentialMedicalAppleCare",
              loc: "Medical District Applecare Offices",
              desc: "You are outside the AppleCare, medical district.",
            };
            break;
          case "research":
            ret = {
              name: "Medical Research Area",
              image: "IMG-LocationMedicalResearch",
              passage: "ResidentialMedicalResearch",
              loc: "Medical District Research Area",
              desc: "You are in the research area of the medical district.",
            };
            break;
          case "outpatient":
            ret = {
              name: "Outpatient Area",
              image: "IMG-LocationMedicalPrivate",
              passage: "ResidentialMedicalOutpatient",
              loc: "Medical District Outpatient Area",
              desc: "You are in the outpatient area, in the medical district.",
            };
            break;
          case "doctor":
            ret = {
              name: "Dr Weiner's Waiting Room",
              image: "IMG-DoctorWaitingRoom",
              passage: "MedicalDoctorWeiner",
              loc: "Doctor Weiner's General Practice Clinic",
              desc: "You are in the waiting room of Dr. Weiner's clinic",
            };
            break;
          case "irresistible":
            ret = {
              name: "Irresistible Clinic Waiting Room",
              image: "IMG-Loc-IrresistibleWaiting",
              passage: "MedicalIrresistible",
              loc: "Irresistible Clinic",
              desc: "You are in the waiting room of the Irresistible Clinic.",
            };
            break;
          case "gestique":
            ret = {
              name: "Gestique Fertility Center Waiting Room",
              image: "IMG-Loc-GestiqueOBGYN",
              passage: "MedicalGestique",
              loc: "Gestique Fertility Center & Spa",
              desc: "You are in the waiting room of the Gestique clinic.",
            };
            break;
          case "proliferant":
            ret = {
              name: "Proliferant Clinic Waiting Room",
              image: "IMG-Loc-ProliferantWaiting",
              passage: "MedicalProliferant",
              loc: "Proliferant Gene Therapy Clinic",
              desc: "You are in the waiting room of the Proliferant clinic.",
            };
            break;
          case "dollmaker":
            ret = {
              name: "Dollmaker Cosmetic Surgery Waiting Room",
              image: "IMG-Loc-DollmakerWaiting",
              passage: "MedicalDollmaker",
              loc: "Dollmaker Cosmetic Surgery Center",
              desc: "You are in the waiting room of the Dollmaker clinic.",
            };
            break;
          case "lecter":
            ret = {
              name: "H. Lecter's Psychiatric Clinic",
              image: "IMG-LecterWaiting",
              passage: "MedicalPsychiatrist",
              loc: "H. Lecter M.D. Psychiatric Clinic",
              desc: "You are in the waiting room of Dr. Lecter's Psychiatric Clinic",
            };
            break;
          default:
            ret = {
              name: "Private Practice Area",
              image: "IMG-LocationMedical",
              passage: "ResidentialMedical",
              loc: "Medical District - Private Practice Offices",
              desc: "You are in the private practice area of the medical district.",
            };
            break;
        }
        break;
        case "industrial":
          ret = {
            name: "Appletree Industrial District",
            image: "IMG-Location-IndustArea",
            passage: "ResidentialIndustrial",
            loc: "Industrial District",
            desc: "You are in the industrial district of Appletree.",
          };
          break;
        case "government":
          switch (tert) {
            case "college":
              ret = {
                name: "Appletree College",
                image: "IMG-Location-GovtCol",
                passage: "ResidentialGovernmentCollege",
                loc: "Appletree College",
                desc: "You are standing in front of the college building.",
              };
              break;
            case "school":
              ret = {
                name: "Appletree School",
                image: "IMG-Location-GovtSchool",
                passage: "ResidentialGovernmentSchool",
                loc: "Appletree School",
                desc: "You are standing in front of the school building.",
              };
              break;
            case "kindergarden":
              ret = {
                name: "Appletree Creche and Kindergarden",
                image: "IMG-Location-GovtCreche",
                passage: "ResidentialGovernmentCreche",
                loc: "Creche & Kindergarden",
                desc: "You are in the creche building.",
              };
              break;
            case "uni":
              ret = {
                name: "Appletree University",
                image: "IMG-Location-GovtUni",
                passage: "ResidentialGovernmentUniversity",
                loc: "Appletree University",
                desc: "You are front of the Appletree university main building.",
              };
              break;
            case "stadium":
              ret = {
                name: "Appletree City Stadium",
                image: "IMG-Location-GovtStadium",
                passage: "ResidentialGovernmentStadium",
                loc: "City Stadium",
                desc: "You are at the only town's stadium.",
              };
              break;
            case "police":
              ret = {
                name: "Appletree Police Dept",
                image: "IMG-Location-GovtPolice",
                passage: "ResidentialGovernmentPolice",
                loc: "Appletree Police Dept.",
                desc: "You are standing in the police department.",
              };
              break;
            default:
              ret = {
                name: "Appletree Government Services District",
                image: "IMG-Location-GovtArea",
                passage: "ResidentialGovernment",
                loc: "Government District",
                desc: "You are in the government district of Appletree.",
              };
              break;
            };
            break;
      }
      break;
    case "homeT1":
      switch (sub) {
        case "kitchen":
          ret = {
            name: "Your Kitchen",
            image: "IMGhomeKitchen",
            passage: "homeT1kitchen",
            loc: "Home - Kitchen",
            desc: "You are standing in your kitchen.",
          };
          break;
        case "bath":
          ret = {
            name: "Your Bathroom",
            image: "IMGhomeBathRoom",
            passage: "homeT1bath",
            loc: "Home - Bathroom",
            desc: "You are standing in your bathroom.",
          };
          break;
        case "balcony":
          ret = {
            name: "Your Balcony",
            image: "IMGhomeBalcony",
            passage: "homeT1balcony",
            loc: "Home - Balcony",
            desc: "You are standing on your balcony.",
          };
          break;
        case "clean":
          ret = {
            name: "Cleaning Options",
            image: "IMGhomePlaceholder",
            passage: "homeT2clean",
            loc: "Home Management",
            desc: "You're inside your home.",
          };
          break;
        case "bed2":
        case "bed3":
        case "bedroom":
          ret = {
            name: "Your Bedroom",
            image: "IMGhomeBedRoom",
            passage: "homeT1bedroom",
            loc: "Home - Bedroom",
            desc: "You are standing in your bedroom.",
          };
          break;
        case "living":
          ret = {
            name: "Your Living Room",
            image: "IMGhomeLivingRoom",
            passage: "homeT1livingroom",
            loc: "Home - Living Room",
            desc: "You are standing in your living room.",
          };
          break;
        case "foyer":
        default:
          ret = {
            name: "Your Foyer",
            image: "IMGhomeFoyer",
            passage: "homeT1foyer",
            loc: "Home - Foyer",
            desc: "You are standing in your foyer.",
          };
          break;
      }
      break;
    case "homeT2":
      switch (sub) {
        case "kitchen":
          ret = {
            name: "Your Kitchen",
            image: "IMGhomeKitchen",
            passage: "homeT2kitchen",
            loc: "Home - Kitchen",
            desc: "You are standing in your kitchen.",
          };
          break;
        case "bath":
          ret = {
            name: "Your Bathroom",
            image: "IMGhomeBathRoom",
            passage: "homeT2bath",
            loc: "Home - Bathroom",
            desc: "You are standing in your bathroom.",
          };
          break;
        case "balcony":
          ret = {
            name: "Your Balcony",
            image: "IMGhomeBalcony",
            passage: "homeT2balcony",
            loc: "Home - Balcony",
            desc: "You are standing on your balcony.",
          };
          break;
        case "clean":
          ret = {
            name: "Cleaning Options",
            image: "IMGhomePlaceholder",
            passage: "homeT2clean",
            loc: "Home Management",
            desc: "You're inside your home.",
          };
          break;
        case "bed2":
        case "bed3":
        case "bedroom":
          ret = {
            name: "Your Bedroom",
            image: "IMGhomeBedRoom",
            passage: "homeT2bedroom",
            loc: "Home - Bedroom",
            desc: "You are standing in your bedroom.",
          };
          break;
        case "living":
          ret = {
            name: "Your Living Room",
            image: "IMGhomeLivingRoom",
            passage: "homeT2livingroom",
            loc: "Home - Living Room",
            desc: "You are standing in your living room.",
          };
          break;
        case "foyer":
        default:
          ret = {
            name: "Your Foyer",
            image: "IMGhomeFoyer",
            passage: "homeT2foyer",
            loc: "Home - Foyer",
            desc: "You are standing in your foyer.",
          };
          break;
      }
      break;
    case "homeT3":
      switch (sub) {
        case "kitchen":
          ret = {
            name: "Your Kitchen",
            image: "IMGhomeKitchen",
            passage: "homeT3kitchen",
            loc: "Home - Kitchen",
            desc: "You are standing in your kitchen.",
          };
          break;
        case "bath":
          ret = {
            name: "Your Bathroom",
            image: "IMGhomeBathRoom",
            passage: "homeT3bath",
            loc: "Home - Bathroom",
            desc: "You are standing in your bathroom.",
          };
          break;
        case "balcony":
          ret = {
            name: "Your Balcony",
            image: "IMGhomeBalcony",
            passage: "homeT3balcony",
            loc: "Home - Balcony",
            desc: "You are standing on your balcony.",
          };
          break;
        case "clean":
          ret = {
            name: "Cleaning Options",
            image: "IMGhomePlaceholder",
            passage: "homeT2clean",
            loc: "Home Management",
            desc: "You're inside your home.",
          };
          break;
        case "bed2":
          ret = {
            name: "Spare Bedroom",
            image: "IMGhomeBedRoom",
            passage: "homeT3bed2",
            loc: "Home - Spare Bedroom",
            desc: "You are standing in your spare bedroom.",
          };
          break;
        case "bed3":
        case "bedroom":
          ret = {
            name: "Your Bedroom",
            image: "IMGhomeBedRoom",
            passage: "homeT3bedroom",
            loc: "Home - Bedroom",
            desc: "You are standing in your bedroom.",
          };
          break;
        case "living":
          ret = {
            name: "Your Living Room",
            image: "IMGhomeLivingRoom",
            passage: "homeT3livingroom",
            loc: "Home - Living Room",
            desc: "You are standing in your living room.",
          };
          break;
        case "foyer":
        default:
          ret = {
            name: "Your Foyer",
            image: "IMGhomeFoyer",
            passage: "homeT3foyer",
            loc: "Home - Foyer",
            desc: "You are standing in your foyer.",
          };
          break;
      }
      break;
    case "homeT4":
    case "homeT5":
      switch (sub) {
        case "kitchen":
          ret = {
            name: "Your Kitchen",
            image: "IMGhomeKitchen",
            passage: "homeT4kitchen",
            loc: "Home - Kitchen",
            desc: "You are standing in your kitchen.",
          };
          break;
        case "bath":
          ret = {
            name: "Your Bathroom",
            image: "IMGhomeBathRoom",
            passage: "homeT4bath",
            loc: "Home - Bathroom",
            desc: "You are standing in your bathroom.",
          };
          break;
        case "balcony":
          ret = {
            name: "Your Balcony",
            image: "IMGhomeBalcony",
            passage: "homeT4balcony",
            loc: "Home - Balcony",
            desc: "You are standing on your balcony.",
          };
          break;
        case "clean":
          ret = {
            name: "Cleaning Options",
            image: "IMGhomePlaceholder",
            passage: "homeT2clean",
            loc: "Home Management",
            desc: "You're inside your home.",
          };
          break;
        case "bed2":
          ret = {
            name: "Spare Bedroom",
            image: "IMGhomeBedRoom",
            passage: "homeT4bed2",
            loc: "Home - Spare Bedroom",
            desc: "You are standing in your spare bedroom.",
          };
          break;
        case "bed3":
          ret = {
            name: "Home Office",
            image: "IMG-HomeBedroomThree",
            passage: "homeT4bed2",
            loc: "Home - Home Office",
            desc: "You are standing in your home office, which is really just a third bedroom.",
          };
          break;
        case "bedroom":
          ret = {
            name: "Your Bedroom",
            image: "IMGhomeBedRoom",
            passage: "homeT4bedroom",
            loc: "Home - Bedroom",
            desc: "You are standing in your bedroom.",
          };
          break;
        case "living":
          ret = {
            name: "Your Living Room",
            image: "IMGhomeLivingRoom",
            passage: "homeT4livingroom",
            loc: "Home - Living Room",
            desc: "You are standing in your living room.",
          };
          break;
        case "foyer":
        default:
          ret = {
            name: "Your Foyer",
            image: "IMGhomeFoyer",
            passage: "homeT4foyer",
            loc: "Home - Foyer",
            desc: "You are standing in your foyer.",
          };
          break;
      }
      break;
    case "BFhome":
      // get relevant BF infos
      const bfname = (State.active.variables.BFname != null) ? State.active.variables.BFname : "Error";
      const bfnum = (State.active.variables.BFnum != null) ? State.active.variables.BFnum : 4;
      switch (sub) {
        case "kitchen":
          ret = {
            name: `${bfname}'s Kitchen`,
            image: `IMG-BFkitchen${bfnum}`,
            passage: "homeBFkitchen",
            loc: `${bfname}'s Kitchen`,
            desc: `You are standing in ${bfname}'s kitchen.`,
          };
          break;
        case "bath":
          ret = {
            name: `${bfname}'s Bathroom`,
            image: `IMG-BFbath${bfnum}`,
            passage: "homeBFbath",
            loc: `${bfname}'s Bathroom`,
            desc: `You are standing in ${bfname}'s bathroom.`,
          };
          break;
        case "bedroom":
          ret = {
            name: `${bfname}'s Bedroom`,
            image: `IMG-BFbed${bfnum}`,
            passage: "homeBFbedroom",
            loc: `${bfname}'s Bedroom`,
            desc: `You are standing in ${bfname}'s bedroom.`,
          };
          break;
        case "living":
          ret = {
            name: `${bfname}'s Living Room`,
            image: `IMG-BFliving${bfnum}`,
            passage: "homeBFlivingroom",
            loc: `${bfname}'s Living Room`,
            desc: `You are standing in ${bfname}'s living room.`,
          };
          break;
        case "exterior":
        default:
          ret = {
            name: `${bfname}'s Place`,
            image: (bfnum > 4) ? `IMG-BFdoor2` : `IMG-BFdoor1`,
            passage: "homeBFexterior",
            loc: `${bfname}'s Place`,
            desc: `You are standing in front of ${bfname}'s front door.`,
          }
      }
      break;
    case "downtown":
      switch (sub) {
        case "parking":
          ret = {
            name: "Southeast Parking Garage",
            image: "IMG_City4",
            passage: "DowntownParking",
            loc: "Downtown Parking",
            desc: "You're in the monolithic parking garage servicing the downtown area. Despite it's gigantic size and utilitarian nature, it's relatively well lit.",
          };
          break;
        case "holefoods":
          switch (tert) {
            case "inside":
              ret = {
                name: "Hole Foods inside",
                image: "IMG-HoleFoodsInside",
                passage: "DowntownHoleinside",
                loc: "Hole Foods Inside",
                desc: "You're in the spacious grocery store full of all kinds of goods. It seems, they have like every possible food you can think of.",
              };
              break;
            case "outside":
              ret = {
                name: "Hole Foods Marketplace",
                image: "IMG_HoleFoodsExt",
                passage: "DowntownHole",
                loc: "Hole Foods Exterior",
                desc: "You're standing outside the Hole Foods Marketplace. It's a rather ritzy-looking grocery store, that seems to focus on the health and <i>lifestyle</i> benefits of a good diet.",
                };
                break;
          };
          break;
        case "corp":
          ret = {
            name: "Downtown Corporate Campus",
            image: "IMG_City2",
            passage: "DowntownCorp",
            loc: "Downtown Corp Campus",
            desc: "You're standing on the edge of Appletree's premier corporate campus. The two main structures are larger, and have a more modern aesthetic, causing them to clash somewhat with the normal feel of the place.",
          };
          break;
        case "bank":
          ret = {
            name: "Finance Row",
            image: "IMGdowntownShops2",
            passage: "DowntownBank",
            loc: "Downtown Finance",
            desc: "You're standing at the row of buildings nicknamed Finance Row, which are mostly occupied by banking services and the town's only real estate firm.",
          };
          break;
        case "townhall":
          ret = {
            name: "Town Hall",
            image: "IMGdowntownTownHall",
            passage: "DowntownTownhall",
            loc: "Downtown Town Hall",
            desc: "You're standing in front of a massive government building, designed to look like a classic American town hall. It's a bit too large for that, but it does consolidate all the normal government offices into one convenient location.",
          };
          break;
        case "square":
          ret = {
            name: "Town Square",
            image: "IMG_ParkBridge2",
            passage: "DowntownSquare",
            loc: "Downtown Town Square",
            desc: "You're standing in a large plaza that is partially surrounded by the large town hall building. A decorative fountain serve's as the plaza's centerpiece, but there's still plenty of room for public functions and festivals.",
          };
          break;
        case "park":
          ret = {
            name: "Central Park",
            image: "IMG_CentralPark",
            passage: "DowntownPark",
            loc: "Downtown Park",
            desc: "You're standing in the huge Samuel Steele Memorial Park, colloquially known as 'Central Park' to residents. The park has several winding paths, along with plenty of trees and shrubs to give a more isolated nature feeling. The center of the park features a nice pond.",
          };
          break;
        case "community":
          ret = {
            name: "Community Center",
            image: "IMGdowntownCommunity",
            passage: "DowntownCommunity",
            loc: "Downtown Community",
            desc: "You're standing in a community recreation area set in the Northwest corner of Central Park. It features a large children's playground, and an open-air building with tables and chairs that is popular for board games or eating lunch outside.",
          };
          break;
        case "mall":
          switch (tert) {
            case "foodcourt":
              ret = {
                name: "Applewood Food Court",
                image: "IMGdowntownApplewood",
                passage: "DowntownFoodcourt",
                loc: "Applewood Food Court",
                desc: "You're standing in a well thought-out food court that features relaxed and comfortable seating without feeling trapped by garish and overly-busy food stalls. The food offerings here are much higher quality than you were expecting.",
              };
              break;
            case "exterior":
            default:
              ret = {
                name: "",
                image: "IMGdowntownMall",
                passage: "DowntownMall",
                loc: "Downtown Mall Ext.",
                desc: "You're standing outside the large Applewood mall. It's one of the new styles of recreational mall, which focuses more on experience, entertainment, and services. The rise of internet shopping has shifted focus away from simple retail malls.",
              };
              break;
            case "movies":
              ret = {
                name: "Applewood Peeper's Cineplex",
                image: "IMGdowntownApplewood",
                passage: "DowntownMallPeeper",
                loc: "Applewood Peeper's Cineplex",
                desc: "You're standing in the Applewood Mall, which has a rather elegant appearance for a shopping mall. Despite this is remains quite approachable and comfortable. The walkways are wide and open, making it easy to move around even when there are plenty of other shoppers roaming the mall.",
              };
              break;
            case "fitta":
              ret = {
                name: "Applewood Fitta",
                image: "IMG-Store-Fitta",
                passage: "DowntownMallFitta",
                loc: "Applewood Fitta",
                desc: "You're standing in the Applewood Mall, which has a rather elegant appearance for a shopping mall. Despite this is remains quite approachable and comfortable. The walkways are wide and open, making it easy to move around even when there are plenty of other shoppers roaming the mall.",
              };
              break;
            case "westshop":
              ret = {
                name: "Applewood West Concourse",
                image: "IMGdowntownApplewood",
                passage: "DowntownMallWest",
                loc: "Applewood West Concourse",
                desc: "You're standing in a well thought-out food court that features relaxed and comfortable seating without feeling trapped by garish and overly-busy food stalls. The food offerings here are much higher quality than you were expecting.",
              };
              break;
            case "bbb":
              ret = {
                name: "Applewood BB&B",
                image: "IMG-Store-BBaB",
                passage: "DowntownMallBeyond",
                loc: "Applewood BB&B",
                desc: "You're standing in a well thought-out food court that features relaxed and comfortable seating without feeling trapped by garish and overly-busy food stalls. The food offerings here are much higher quality than you were expecting.",
              };
              break;
            case "northshop":
              ret = {
                name: "Applewood North Concourse",
                image: "IMGdowntownApplewood",
                passage: "DowntownMallNorth",
                loc: "Applewood North Concourse",
                desc: "You're standing in the Applewood Mall, which has a rather elegant appearance for a shopping mall. Despite this is remains quite approachable and comfortable. The walkways are wide and open, making it easy to move around even when there are plenty of other shoppers roaming the mall.",
              };
              break;
            case "southshop":
              ret = {
                name: "Applewood South Concourse",
                image: "IMGdowntownApplewood",
                passage: "DowntownMallSouth",
                loc: "Applewood South Concourse",
                desc: "You're standing in the Applewood Mall, which has a rather elegant appearance for a shopping mall. Despite this is remains quite approachable and comfortable. The walkways are wide and open, making it easy to move around even when there are plenty of other shoppers roaming the mall.",
              };
              break;
            case "voidshop":
              ret = {
                name: "Pleasure Buzzer Arcade",
                image: "IMG-PleasureBuzzer",
                passage: "DowntownMallVoid",
                loc: "Pleasure Buzzer Arcade",
                desc: "You're standing in the Applewood Mall, which has a rather elegant appearance for a shopping mall. Despite this is remains quite approachable and comfortable. The walkways are wide and open, making it easy to move around even when there are plenty of other shoppers roaming the mall.",
              };
              break;
          }
          break;
        case "club":
          switch (tert) {
          case "shakenpopentrance":
            ret = {
              name: "Shake & Pop Entrance",
              image: "IMG-MapLoc-SPopEntrance",
              passage: "DowntownClubShakeEntrance",
              loc: "Shake & Pop - Entrance",
              desc: "You're in the entrance of Shake & Pop nightclub in club district of downtown Appletree, pretty popular place with a line of people waiting to be let in",
            };
            break;
          case "shakenpopdance":
            ret = {
              name: "Shake & Pop Dance Floor",
              image: "IMG-MapLoc-SPopDance",
              passage: "DowntownClubShakeDance",
              loc: "Shake & Pop - Dance floor",
              desc: "You're in the dancing area of Shake & Pop nightclub in club district of downtown Appletree. Place seems dark with bright lights of different colors lighting over the dance floor.",
            };
            break;
          case "shakenpopbar":
            ret = {
              name: "Shake & Pop Bar",
              image: "IMG-MapLoc-SPopBar",
              passage: "DowntownClubShakeBar",
              loc: "Shake & Pop - Bar",
              desc: "You're in the bar area of Shake & Pop nightclub in club district of downtown Appletree.",
            };
            break;
          case "shakenpopwc":
            ret = {
              name: "Shake & Pop Restroom",
              image: "IMG-MapLoc-SPopWC",
              passage: "DowntownClubShakeWC",
              loc: "Shake & Pop - WC",
              desc: "You're in the unisex toilet Shake & Pop nightclub in club district of downtown Appletree.",
            };
            break;
          case "shakenpopchillout":
            ret = {
              name: "Shake & Pop Lounge",
              image: "IMG-MapLoc-SPopLounge",
              passage: "DowntownClubShakeChill",
              loc: "Shake & Pop - Chillout",
              desc: "You're in the chillout zone of Shake & Pop nightclub in club district of downtown Appletree.",
            };
            break;
          case "pollridersentrance":
            ret = {
              name: "Poll Riders entrance",
              image: "IMG-LocationPoleRidersEntrance",
              passage: "DowntownClubRidersEntrance",
              loc: "Poll Riders - Entrance",
              desc: "You're in the entrance of Poll Riders striptease in the club district of Appletree, the hall is dark and you can hear the rambling and music coming from the lounge.",
            };
            break;
          case "pollriderslounge":
            ret = {
              name: "Poll Riders lounge",
              image: "IMG-LocationPoleRidersLounge",
              passage: "DowntownClubRidersLounge",
              loc: "Poll Riders - Lounge",
              desc: "You're in the lounge of Poll Riders striptease in the club district of Appletree, The music is pretty loud <<set _qwe = random(0,1)>><<if _qwe == 0>>and there is a stripper dancing on the stage dressed just in glittering thongs.<<else>>but there is nobody on a stage right now so visitors just enjoy their drinks and having chats with strippers, strolling around the lounge.<</if>>",
            };
            break;
          case "pollridersbar":
            ret = {
              name: "Poll Riders bar",
              image: "IMG-LocationPoleRidersBar",
              passage: "DowntownClubRidersBar",
              loc: "Poll Riders - Bar",
              desc: "You're in the bar of Poll Riders striptease in the club district of Appletree. The bartender girl has her tits out and it seems that helps with the sales, a little crowd gathered around the bar asking her to do 'her trick' whatever it means.",
            };
            break;
          case "pollriderswc":
            ret = {
              name: "Poll Riders wc",
              image: "IMG-LocationPoleRiderswc",
              passage: "DowntownClubRidersWc",
              loc: "Poll Riders - WC",
              desc: "You're in the wc of Poll Riders striptease in the club district of Appletree. The bathroom is rather small with just three unisex urinals and one stall. It is pretty silent here and the music from lounge sounds muffed from behind the door so you can hear some rhytmical floppy sound coming from the closed stall door.",
            };
            break;
          case "pollridersstaff":
            ret = {
              name: "Poll Riders staff area",
              image: "IMG-LocationPoleRidersBackstage",
              passage: "DowntownClubRidersStaff",
              loc: "Poll Riders - Staff",
              desc: "You're in the staff area of Poll Riders striptease in the club district of Appletree. Here are the small closet for bar supplies, the backstage for strippers and a big wardrobe of rather laughably tiny lingeries. In the end of the hall there is a door to the managers office.",
            };
            break;
          case "pollridersprivate":
            ret = {
              name: "Poll Riders private stall",
              image: "IMG-LocationPoleRidersPrivate",
              passage: "DowntownClubRidersPrivate",
              loc: "Poll Riders - Private",
              desc: "You're in the private stall of Poll Riders striptease in the club district of Appletree. The room is quite small and resembles a clothes shop fitting booth with a curtain. There is a strip pole and a comfortable red couch, the room is lit much better because clients probably want to be able to see all the details of what they have paid for.",
            };
            break;
          case "main":
            ret = {
              name: "Club District",
              image: "IMG_CityNight2",
              passage: "DowntownClub",
              loc: "Downtown Clubs",
              desc: "You're standing on a street seemingly dedicated to nightclubs, bars, and other adult social locations. It's certainly convenient to go bar hopping in Appletree. The fare ranges from a posh nightclub to a dance club that's essentially an open indoor industrial space.",
            };
            break;
        }
          break;
        case "amuse":
          ret = {
            name: "Amusement District",
            image: "IMG_DowntownAmusePark",
            passage: "DowntownAmuse",
            loc: "Downtown Amusement",
            desc: "You're in the Amusement district of downtown Appletree, which has a few recreational businesses such as a bowling alley, but is dominated by the local theme park Erotika Land. Despite the <i>very</i> adult theme, the park is open to all ages.",
          };
          break;
        case "adult":
          ret = {
            name: "Downtown Adult District",
            image: "IMGdowntownAdult",
            passage: "DowntownAdult",
            loc: "Downtown Adult",
            desc: "You're in a small area on the outskirts of downtown known as the adult district. The area features a different layout, composed of several alleyways that branch off of a still-narrow walking street. Driving down the street outside, you'd never realize that it's the local redlight district.",
          };
          break;
        case "northwest":
          ret = {
            name: "Northwest Downtown",
            image: "IMGdowntownShops3",
            passage: "DowntownNW",
            loc: "Northwest Downtown",
            desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
          };
          break;
        case "west":
          ret = {
            name: "West Downtown",
            image: "IMGdowntownShops4",
            passage: "DowntownW",
            loc: "West Downtown",
            desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
          };
          break;
        case "southwest":
          ret = {
            name: "Southwest Downtown",
            image: "IMGdowntownShops5",
            passage: "DowntownSW",
            loc: "Southwest Downtown",
            desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
          };
          break;
        case "northeast":
          ret = {
            name: "Northeast Downtown",
            image: "IMGdowntownShops4",
            passage: "DowntownNE",
            loc: "Northeast Downtown",
            desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
          };
          break;
        case "east":
          ret = {
            name: "East Downtown",
            image: "IMGdowntownShops5",
            passage: "DowntownE",
            loc: "East Downtown",
            desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
          };
          break;
        case "southeast":
          ret = {
            name: "Southeast Downtown",
            image: "IMGdowntownShops1",
            passage: "DowntownSE",
            loc: "Southeast Downtown",
            desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
          };
          break;
      }
      break;
    case "world":
      switch (sub) {
        case "appletree":
          ret = {
            name: "",
            image: "",
            passage: "AppletreeMap",
            loc: "",
            desc: "",
          };
          break;
        case "institute":
          ret = {
            name: "T.I.T.S. Muschi Valley Research Complex",
            image: "IMG-InstituteLocation",
            passage: "MapInstitute",
            loc: "T.I.T.S. Muschi Valley Research Complex",
            desc: "You're engulfed by the massive Institute research complex buldings. They're fashioned in all different shapes and sizes, with no end in sight. There's even an entire subterranian transportation network to help cross the facility.",
          };
          break;
        case "restricted":
          switch (tert) {
            case "enter":
              ret = {
                name: "Entrance",
                image: "IMG-restrictedEntrance",
                passage: "MapRestrictedEntrance",
                loc: "Farm entrance",
                desc: "You're standing in front of the fence gates, you can see some crop fields and silos behind it. There is also a small booth with a guard near the gates.",
              };
              break;
          }
          break;
        case "coop":
          switch (tert) {
            case "main":
              ret = {
                name: "Farm Coop Entrance",
                image: "IMG-FarmCoopMain",
                passage: "MapFarmCoopMain",
                loc: "Muschi Valley Farm Cooperative Entrance",
                desc: "You're standing around at the entrance to the Farm COOP facility. It's quite lively, and there are plenty of smiling HuCows wandering about helping out and getting exercise.",
              };
              break;
            case "market":
              ret = {
                name: "Farm Coop Market",
                image: "IMG-FarmCoopMarketLoc",
                passage: "MapFarmCoopMarket",
                loc: "Muschi Valley Farm Cooperative Market",
                desc: "description pending...",
              };
              break;
            case "dairy":
              ret = {
                name: "Farm Coop Dairy",
                image: "IMG-FarmCoopDairyLoc",
                passage: "MapFarmCoopDairy",
                loc: "Muschi Valley Farm Cooperative Dairy",
                desc: "description pending...",
              };
              break;
            case "barn":
              ret = {
                name: "Farm Coop Barn",
                image: "IMG-FarmCoopBarnLoc",
                passage: "MapFarmCoopBarn",
                loc: "Muschi Valley Farm Cooperative Barn",
                desc: "description pending...",
              };
              break;
            case "dorms":
              ret = {
                name: "Farm Coop HuCow Dorms",
                image: "IMG-MapLoc-CoopDorms",
                passage: "MapFarmCoopDorms",
                loc: "Muschi Valley Farm Cooperative Dorms",
                desc: "description pending...",
              };
              break;
            case "office":
              ret = {
                name: "Farm Coop Office",
                image: "IMG-FarmCoopOfficeLoc",
                passage: "MapFarmCoopOffice",
                loc: "Muschi Valley Farm Cooperative Office",
                desc: "description pending...",
              };
              break;
            case "warehouse":
              ret = {
                name: "Farm Coop Warehouse",
                image: "IMG-FarmCoopWarehouseLoc",
                passage: "MapFarmCoopWarehouse",
                loc: "Muschi Valley Farm Cooperative Warehouse",
                desc: "description pending...",
              };
              break;
            case "fair":
              ret = {
                name: "Farm Coop Fair Grounds",
                image: "IMG-FarmCoopFairLoc",
                passage: "MapFarmCoopFair",
                loc: "Muschi Valley Farm Cooperative Fair Grounds",
                desc: "description pending...",
              };
              break;
            case "FertCorpsFair":
              ret = {
                name: "Farm Coop Fair Grounds - Fert Corps fest",
                image: "IMG-FarmCoopFCFair",
                passage: "FarmCoopFCFair",
                loc: "Muschi Valley Farm Cooperative Fair Grounds",
                desc: "You're standing at the fair ground near Farm Coop, today is a day of the Fert Corps annual open Fair and there are a lot of tents, cars, semi- or fully nude drunken people.",
              };
              break;
            case "parking":
              ret = {
                name: "Farm Coop Equipment Parking",
                image: "IMG-FarmCoopParkingLoc",
                passage: "MapFarmCoopParking",
                loc: "Muschi Valley Farm Cooperative Equipment Parking",
                desc: "description pending...",
              };
              break;
          }
          break;
        case "lake":
          ret = {
            name: "",
            image: "",
            passage: "",
            loc: "",
            desc: "",
          };
          break;
        case "visitor":
          switch (tert) {
            case "parking":
              ret = {
                name: "Parking",
                image: "IMG-VisitorsParking",
                passage: "MapVisitorParking",
                loc: "Visitors centre parking",
                desc: "You're standing on the gravel parking near the visitors centre.",
              };
              break;
            case "centre":
              ret = {
                name: "Visitors centre",
                image: "IMG-VisitorsInside",
                passage: "MapVisitorCentre",
                loc: "Visitors centre building",
                desc: "You're standing in the hall of Muchi Valley visitors centre.",
              };
              break;
          }
          break;
        case "forest":
          ret = {
            name: "",
            image: "",
            passage: "",
            loc: "",
            desc: "",
          };
          break;
        case "woods":
          ret = {
            name: "",
            image: "",
            passage: "",
            loc: "",
            desc: "",
          };
          break;
        case "unknown":
          ret = {
            name: "",
            image: "",
            passage: "",
            loc: "",
            desc: "",
          };
          break;
        case "city":
          ret = {
            name: "",
            image: "",
            passage: "",
            loc: "",
            desc: "",
          };
          break;
        case "spring":
        switch (tert) {
          case "recreation":
            ret = {
              name: "Recreation center",
              image: "IMG-SpringsRecreational",
              passage: "MapSpringsRecreation",
              loc: "Springs Recreation center",
              desc: "You're standing in the hall of the small recreation center building.",
            };
            break;
          case "changing":
            ret = {
              name: "Changing booth",
              image: "IMG-SpringsChanging",
              passage: "MapSpringsChanging",
              loc: "Springs Changing booth and WC",
              desc: "You're standing in the tiny builing with 3 changing booth and a bathroom.",
            };
            break;
          case "woods":
            ret = {
              name: "Woods",
              image: "IMG-SpringsWoods",
              passage: "MapSpringsWoods",
              loc: "Woods near the springs",
              desc: "You're standing between the shadows of the trees in the small wood near the springs.",
            };
            break;
          case "parking":
            ret = {
              name: "Parking",
              image: "IMG-BridgeParking",
              passage: "MapSpringsParking",
              loc: "Parking near the springs",
              desc: "You're standing on the asphalted parking in the springs area. A small concrete path leads to the beach, recreation center and changing booth. At the north the cliff is separated from you with a small wood.",
            };
            break;
          case "beach":
            ret = {
              name: "Beach",
              image: "IMG-SpringsBeach",
              passage: "MapSpringsBeach",
              loc: "Beach of the springs",
              desc: "You're standing on the shore near the springs. The sand seems to be delievered here by trucks in order to create an artifical beach. There are some recliners and parasols.",
            };
            break;
          case "cave":
            ret = {
              name: "Cave",
              image: "IMG-SpringsCave",
              passage: "MapSpringsCave",
              loc: "Cave entrance in the springs area",
              desc: "You're standing near the cave entrance on the surface of the cliff. The darkness coming from the slit beckoning to you.",
            };
            break;
          }
        break;
        case "bridge":
          switch (tert) {
            case "bridge":
              ret = {
                name: "Bridge",
                image: "IMG-BridgeBridge",
                passage: "MapBridgeBridge",
                loc: "Muschi Valley Bridge",
                desc: "You're standing on the asphalted bridge over a river. It is pretty high above the water and you can see the stream flowing beneath.",
              };
              break;
            case "parking":
              ret = {
                name: "Parking",
                image: "IMG-BridgeParking",
                passage: "MapBridgeParking",
                loc: "Muschi Valley Bridge",
                desc: "You're standing on the gravel parking near the bridge over the river.",
              };
              break;
            case "riverbank":
              ret = {
                name: "Riverbank",
                image: "IMG-BridgeRiverbank",
                passage: "MapBridgeRiverbank",
                loc: "Muschi Valley Riverbank",
                desc: "You're standing on the shore of the river, slow waters softly lisping to the south.",
              };
              break;
          }
          break;
          case "resort":
            switch (tert) {
              case "boating":
                ret = {
                  name: "Boating shop",
                  image: "IMG-ResortBoating",
                  passage: "MapResortBoating",
                  loc: "Clitea lake resort Boating shop",
                  desc: "You're standing in the boating shop.",
                };
                break;
              case "beach":
                ret = {
                  name: "Beach",
                  image: "IMG-ResortBeach",
                  passage: "MapResortBeach",
                  loc: "Clitea lake resort beach",
                  desc: "You're standing on the manmade beach of the Clitea lake resort.",
                };
                break;
              case "restaurant":
                ret = {
                  name: "Lakefront Restaurant",
                  image: "IMG-ResortRestaurant",
                  passage: "MapResortRestaurant",
                  loc: "Clitea lake resort restaurant",
                  desc: "You're standing in the lakefront restaurant.",
                };
                break;
              case "bar":
                ret = {
                  name: "Beach bar",
                  image: "IMG-ResortBar",
                  passage: "MapResortBar",
                  loc: "Clitea lake resort beach bar",
                  desc: "You're standing in the beach bar.",
                };
                break;
              case "waterpark":
                ret = {
                  name: "Water park",
                  image: "IMG-ResortWaterPark",
                  passage: "MapResortWaterPark",
                  loc: "Clitea lake resort water park",
                  desc: "You're standing in the one and only water park in the valley.",
                };
                break;
              case "docks":
                ret = {
                  name: "Boat docks",
                  image: "IMG-ResortDocks",
                  passage: "MapResortDocks",
                  loc: "Clitea lake resort boat docks",
                  desc: "You're standing on the wooden planks of the dock.",
                };
                break;
              case "hotel":
                ret = {
                  name: "Hotel",
                  image: "IMG-ResortHotel",
                  passage: "MapResortHotel",
                  loc: "Clitea lake resort hotel",
                  desc: "You're standing in the foyer of the Clitea lake Resort hotel",
                };
                break;
              case "golf":
                ret = {
                  name: "Golf club",
                  image: "IMG-ResortGolf",
                  passage: "MapResortGolf",
                  loc: "Clitea lake resort golf club",
                  desc: "You're standing on the grass in front of the golf club building.",
                };
                break;
            }
            break;
        case "main":
        default:
          ret = {
            name: "",
            image: "",
            passage: "MuschiValleyMap",
            loc: "",
            desc: "",
          };
          break;
      }
      break;
    default:
      setup.alert(`There was a problem with map data lookup - arguments main: ${main}, sub: ${sub}, tert: ${tert}.`);
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
  }
  return {name: ret.name, image: ret.image, passage: ret.passage, loc: ret.loc, desc: ret.desc};
};


