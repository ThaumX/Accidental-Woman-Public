/*
.                                888 d8b 888    d8b
.                                888 Y8P 888    Y8P
.                                888     888
.  .d8888b .d88b.  88888b.   .d88888 888 888888 888  .d88b.  88888b.
. d88P"   d88""88b 888 "88b d88" 888 888 888    888 d88""88b 888 "88b
. 888     888  888 888  888 888  888 888 888    888 888  888 888  888
. Y88b.   Y88..88P 888  888 Y88b 888 888 Y88b.  888 Y88..88P 888  888
.  "Y8888P "Y88P"  888  888  "Y88888 888  "Y888 888  "Y88P"  888  888
.
*/

interface setupCondition {
  add: ({ loc, amt, tgt, wet, type }: { loc: conditionLocation|"pussy"|"anus", amt?: number, tgt?: string, wet?: number, type?: string; }) => void;
  dry: () => void;
  fluid: { (loc?: "pussy" | "asshole"): string };
  print: { (input: any): string };
}


if (setup.condition === null || setup.condition === undefined) {
  setup.condition = {} as setupCondition;
}

setup.condition.add = function({ loc, amt, tgt, wet, type}: { loc: conditionLocation, amt?: number, tgt?: string, wet?: number, type?: string; }): void {
  let cond;
  const pussy = ["pussy", "vag", "vagina", "vagFluid"];
  const ass = ["anus", "anal", "asshole", "anusFluid"];
  if (tgt == null) {
    tgt = "pc";
  }
  if (type == null) {
    type = "water";
  }
  if (amt == null) {
    amt = 4;
  }
  if (wet == null) {
    wet = amt;
  }
  if (tgt === "pc") {
    cond = ↂ.pc.cond;
  } else {
    try {
      cond = aw.npc[tgt].cond;
    } catch (e) {
      aw.con.warn(`Bad target (${tgt}) given to condition.add!`);
      return;
    }
  }
  amt = Number(amt);
  if (pussy.includes(loc)) {
    // adds to pussy fluid
    if (cond.vagFluid[type] == null || cond.vagFluid[type] === undefined) {
      cond.vagFluid[type] = amt;
    } else {
      cond.vagFluid[type] += amt;
    }
  } else if (ass.includes(loc)) {
    // ass to anus
    if (cond.anusFluid[type] == null || cond.anusFluid[type] === undefined) {
      cond.anusFluid[type] = amt;
    } else {
      cond.anusFluid[type] += amt;
    }
  } else {
    if (type === "water") { wet = 0; }
    if (cond[loc] === null || cond[loc] === undefined) {
      aw.con.warn(`Invalid location (${loc}) given to condition.add function. ${tgt} ${type} ${amt}`);
      return;
    }
    if (cond[loc][type] === null || cond[loc][type] === undefined) {
      cond[loc][type] = {amt, wet};
    } else {
      cond[loc][type].amt += amt;
      cond[loc][type].wet = Math.max(wet, cond[loc][type].wet);
    }
  }
  // splattering!
  const tggt = tgt;
  if (amt > 3) {
    const amt2 = Math.round(amt / 3);
    const wet2 = wet;
    const type2 = type;
    switch (loc) {
      case "hair":
      setup.condition.add({loc : "face", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "face":
      setup.condition.add({loc : "chest", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "chest":
      setup.condition.add({loc : "stomach", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "stomach":
      setup.condition.add({loc : "groin", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "groin":
      setup.condition.add({loc : "genitals", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "genitals":
      setup.condition.add({loc : "thighs", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "butt":
      setup.condition.add({loc : "groin", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "thighs":
      setup.condition.add({loc : "legs", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "legs":
      setup.condition.add({loc : "feet", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "butt":
      setup.condition.add({loc : "groin", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      case "vagFluid":
      case "anusFluid":
      setup.condition.add({loc : "genitals", amt : amt2, tgt : tggt, wet : wet2, type : type2});
      break;
      default:
      break;
    }
  }
  if (tgt === "pc") {
      setup.clothes.staining(loc, amt, type);
      // makeshift pc clean level changing TODO
      ↂ.pc.status.clean ++;
      aw.S();
    }
};

setup.condition.dry = function(): void {
  const places = ["back", "butt", "chest", "face", "feet", "genitals", "groin", "hair", "hands", "legs", "stomach", "thighs"];
  for (let index = 0; index < places.length; index++) {
    if (Object.keys(ↂ.pc.cond[places[index]]).length !== 0) {
      const liquids = clone(Object.keys(ↂ.pc.cond[places[index]]));
      for (let i = 0; i < liquids.length; i++) {
        if (ↂ.pc.cond[places[index]][liquids[i]] === "water") {
          if (random(0, 1) === 1) {
            if (ↂ.pc.cond[places[index]].water.amt === 1) {
              delete(ↂ.pc.cond[places[index]].water);
              aw.con.info(`${places[index]} dried off completely.`);
            } else {
              ↂ.pc.cond[places[index]].water.amt -= 1;
              aw.con.info(`Removed 1 amt of water from ${places[index]}.`);
            }
          }
        } else if ( ↂ.pc.cond[places[index]][liquids[i]] !== undefined || ↂ.pc.cond[places[index]][liquids[i]].wet !== undefined) {
          if (random(0, 1) === 1) {
            if (ↂ.pc.cond[places[index]][liquids[i]].wet > 0) {
              ↂ.pc.cond[places[index]][liquids[i]].wet--;
              aw.con.info(`Removed 1 amt of ${liquids[i]} from ${places[index]}.`);
              if (ↂ.pc.cond[places[index]][liquids[i]].wet === 0) {
                aw.con.info(`${liquids[i]} at ${places[index]} dried off but still there as a stain.`);
              }
            }
          }
        }
      }
    }
  }
  aw.S();
};

// reports on condition of an orifice
setup.condition.fluid = function(loc: "pussy"|"asshole" = "pussy"): string {
  let cond;
  if (loc === "pussy") {
    cond = ↂ.pc.cond.vagFluid;
  } else {
    cond = ↂ.pc.cond.anusFluid;
  }
  const key = Object.keys(cond);
  if (key.length === 0) {
    return '<span class="good">Empty.</span>';
  }
  let output = "";
  for (let i = 0, c = key.length; i < c; i++) {
    if (i > 0) { output += ", "; }
    output += `${cond[key[i]]}ml of ${key[i]}`;
  }
  output += ".";
  return output;
};

// prints description of current condtion. input cond object or location
setup.condition.print = function(input: any = 0): string {
  const ᛝ = ↂ.pc.cond;
  if ("object" !== typeof input) {
    switch (input) {
      case "hair":
        input = ᛝ.hair;
        break;
      case "face":
        input = ᛝ.face;
        break;
      case "chest":
        input = ᛝ.chest;
        break;
      case "back":
        input = ᛝ.back;
        break;
      case "hands":
        input = ᛝ.hands;
        break;
      case "stomach":
        input = ᛝ.stomach;
        break;
      case "butt":
        input = ᛝ.butt;
        break;
      case "groin":
        input = ᛝ.groin;
        break;
      case "genitals":
        input = ᛝ.genitals;
        break;
      case "thighs":
        input = ᛝ.thighs;
        break;
      case "legs":
        input = ᛝ.legs;
        break;
      case "feet":
        input = ᛝ.feet;
        break;
      default:
        return "ERROR - No object supplied!";
    }
  }
  const keys = Object.keys(input);
  if (keys.length === 0) { return '<span class="good">Clean.</span>'; }
  let output = "";
  for (let i = 0, c = keys.length; i < c; i++) {
    let wetness;
    let amount;
    if (i > 0) { output += ", "; }
    if (keys[i] === "water" && input[keys[i]].amt === 0) {
      // do nothing
    } else if (keys[i] === "water") {
      // water simply dries, no thickness/stains/etc
      const a = input[keys[i]].amt;
      if (a <= 1) {
        amount = "barely noticeable";
      } else if (a < 3) {
        amount = "tiny";
      } else if (a < 6) {
        amount = "small";
      } else if (a < 12) {
        amount = "significant";
      } else if (a < 24) {
        amount = "large";
      } else if (a < 48) {
        amount = "huge";
      } else {
        amount = "ridiculous";
      }
      output += `a ${amount} amount of water.`;
      return output;
    } else {
      switch (input[keys[i]].wet) {
        case 0:
          wetness = "dried";
          break;
        case 1:
          wetness = "sticky";
          break;
        case 2:
          wetness = "thick";
          break;
        case 4:
          wetness = "wet";
          break;
        default:
          wetness = "fresh";
          break;
      }
    }
    const a = input[keys[i]].amt;
    if (a <= 1) {
      amount = "barely noticeable";
    } else if (a < 3) {
      amount = "tiny";
    } else if (a < 6) {
      amount = "small";
    } else if (a < 12) {
      amount = "significant";
    } else if (a < 24) {
      amount = "large";
    } else if (a < 48) {
      amount = "huge";
    } else {
      amount = "ridiculous";
    }
    output += `a ${amount} amount of ${wetness} ${keys[i]}`;
  }
  output += ".";
  return output;
};

// initializes the condition variables
setup.initCond = function(): void {
  ↂ.pc.cond.hair = {};
  ↂ.pc.cond.face = {};
  ↂ.pc.cond.chest = {};
  ↂ.pc.cond.back = {};
  ↂ.pc.cond.hands = {};
  ↂ.pc.cond.stomach = {};
  ↂ.pc.cond.butt = {};
  ↂ.pc.cond.groin = {};
  ↂ.pc.cond.genitals = {};
  ↂ.pc.cond.thighs = {};
  ↂ.pc.cond.legs = {};
  ↂ.pc.cond.feet = {};
  ↂ.pc.cond.vagFluid = {};
  ↂ.pc.cond.anusFluid = {};
};
