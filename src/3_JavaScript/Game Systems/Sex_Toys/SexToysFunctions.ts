// ███████╗███████╗██╗  ██╗    ████████╗ ██████╗ ██╗   ██╗███████╗
// ██╔════╝██╔════╝╚██╗██╔╝    ╚══██╔══╝██╔═══██╗╚██╗ ██╔╝██╔════╝
// ███████╗█████╗   ╚███╔╝        ██║   ██║   ██║ ╚████╔╝ ███████╗
// ╚════██║██╔══╝   ██╔██╗        ██║   ██║   ██║  ╚██╔╝  ╚════██║
// ███████║███████╗██╔╝ ██╗       ██║   ╚██████╔╝   ██║   ███████║
// ╚══════╝╚══════╝╚═╝  ╚═╝       ╚═╝    ╚═════╝    ╚═╝   ╚══════╝

// wearable status is in ↂ.toys, the list of owned goes into the standard items list

// INTERFACES

interface setupSexToys {
  check: (npcId: string | "pc", part: string) => boolean | string;
  remove: (npcId: string | "pc", part: string) => void;
  insert: (npcId: string | "pc", part: string, toy: string) => true | string;
  use: (npcId: string | "pc", toy: string) => void;
  printer: () => string;
  SexSystemToysRemovePrinter: () => string;
  FuckMachineDildoPrinter: (machine: string) => string;
  list: () => string;
  shopping: () => void;
  hasDildo: () => false | string;
  chastityCheck: () => ["haveBoth" | "haveBothCageOff" | "noCage" | "noKey", string];
  toys: ToyData;
}

interface ToyData {
  [propName: string]: SexToy;
}

interface SexToy {
  key: string;
  name: string;
  desc: string;
  img: string;
  type: string[]; // "plug", "dildo", "gag", "vibrator", "strapon", "pussyPlug", "chastity", "bondage", "impact"
  quality: 1 | 2 | 3; // the amount of effect the toys inflicts. e.g. more quality dildo will give more satisfaction
  wearable: boolean; // is toy can be worn (butt plugs, vaginal balls/dildos, gags, restraints, )
  size: number; // diameter for Insertables 0-30 (cm)
  occupied: string[]; // what part item occupies: mouth, arms, legs, asshole, clit, vagina, groin, nipples, breasts
  removable: boolean; // for chastity
  price: number;
  canBuy: boolean; // will item appears on the shops
  button: string | false;
  menu: string | false;
  useText: string[];
  onUse: (n: number, toy: string) => void; // custom action to be run when used
}

// DECLARING

if (setup.sexToys === null || setup.sexToys === undefined) {
  setup.sexToys = {} as setupSexToys;
}

// FUNCTIONS

// checks if the orfice or other part of the body is free from toys, returns true is free and the key of the toy if not.
setup.sexToys.check = function(npcId: string | "pc", part: string): boolean | string {
  if (npcId === "pc") {
    // aw.con.warn(`setup.sexToys.check start1: ${part}`);
    switch (part) {
      case "pussy":
      case "cock":
      case "balls":
      case "vulva":
        part = "vagina";
        break;
      case "ass":
        part = "asshole";
        break;
      case "chest":
      case "titL":
      case "titR":
      case "boobs":
      case "breast":
        part = "breasts";
        break;
      case "feet":
        part = "legs";
        break;
      case "hand":
      case "handL":
      case "handR":
        part = "arms";
        break;
      case "lips":
        part = "mouth";
        break;
      case "skip":
        return true;
      default:
        break;
  }
  // aw.con.warn(`setup.sexToys.check start2: ${part}`);
  switch (part) {
    case "clit":  // chastity check
    case "vagina":
      if (ↂ.toys.parts.groin === false && ↂ.toys.parts[part] === false) {
        // aw.con.warn(`setup.sexToys.check0: ${part} of ${ↂ.toys.parts[part]}}`);
        return true;
      } else if (ↂ.toys.parts.groin !== false && ↂ.toys.parts[part] === false) {
        // aw.con.warn(`setup.sexToys.check1: ${part} of ${ↂ.toys.parts[part]}`);
        return `${setup.sexToys.toys[ↂ.toys.parts.groin].name} stays in the way of reaching your ${part}.`;
      } else if (ↂ.toys.parts.groin === false && ↂ.toys.parts[part] !== false) {
        // aw.con.warn(`setup.sexToys.check2: ${part} of ${ↂ.toys.parts[part]}`);
        return `Some toy stays in the way of reaching your ${part}.`;
      } else {
        // aw.con.warn(`setup.sexToys.check3: ${part} of ${ↂ.toys.parts[part]}`);
        return `Some toy stays in the way of reaching your ${part}.`;
      }
    default:
      // aw.con.warn(`setup.sexToys.check4: ${part} of ${ↂ.toys.parts[part]}}`);
      if (ↂ.toys.parts[part] === false) {
        // aw.con.warn(`setup.sexToys.check5: ${part}, ${ↂ.toys.parts[part]}`);
        return true;
      } else {
        // return `You suddenly remember that you hole is already occupied by ${setup.sexToys.toys[ↂ.toys.parts[part]].name}. @@.mono;Oh, how silly of me, giggle!@@`;
        // aw.con.warn(`setup.sexToys.check6: ${part}, ${ↂ.toys.parts[part]}`);
        return `You suddenly remember that you hole is already occupied by ${ↂ.toys.parts[part]}. @@.mono;Oh, how silly of me, giggle!@@`;
      }
    }
  } else {
    // aw.con.warn("setup.sexToys.check can't check NPC for parts occupied by sextoys for now.");
    return true;
  }
};

setup.sexToys.use = function(npcId: string | "pc", toy: string): void {
  if (setup.sexToys.toys[toy] !== null) {
    if (npcId === "pc") {
      if (setup.sexToys.toys[toy].menu !== false) {
        setup.dialog(`${setup.sexToys.toys[toy].name}`, `<center>[img[${setup.sexToys.toys[toy].img}]]</center><br>${setup.sexToys.toys[toy].menu}<<button "Nothing">><<run Dialog.close()>><</button>>`);
      } else {
        setup.sexToys.toys[toy].onUse(1, toy);
      }
    } else {
      aw.con.warn("setup.sexToys.use can't use toys on NPC for now.");
    }
  } else {
    aw.con.warn(`setup.sexToys.use cant find the ${toy} toy!`);
  }
};

setup.sexToys.remove = function(npcId: string | "pc", part: string): void {
  if (npcId === "pc") {
    if (ↂ.toys.parts[part] !== false) {
      if (setup.omni.matching(setup.sexToys.toys[ↂ.toys.parts[part]].name) !== 0) {
        for (const omniKey of Object.keys(aw.omni)) {
          if (aw.omni[omniKey].name === setup.sexToys.toys[ↂ.toys.parts[part]].name) {
            setup.omni.kill(omniKey);
          }
        }
      }
      if (part === "vagina") {
        if (setup.sexToys.check("pc", "groin") === true) {
          ↂ.toys.parts[part] = false;
        } else {
          setup.notify("You can't remove it, something is in the way!");
        }
      } else {
        ↂ.toys.parts[part] = false;
      }
      aw.S();
    }
  } else {
    aw.con.warn("setup.sexToys.remove can't manage NPC toys for now.");
  }
};

setup.sexToys.insert = function(npcId: string | "pc", part: string, toy: string): true | string {
  if (npcId === "pc") {
    if (setup.sexToys.toys[toy] !== null) {
      if (setup.sexToys.check("pc", part) === true) {
        ↂ.toys.parts[part] = setup.sexToys.toys[toy].key;
        aw.S();
        return true;
      } else {
        aw.con.warn(`setup.sexToys.insert found that ${part} slot is occupied by ${ↂ.toys.parts[part]}`);
        return "The place is blocked by some other toy!";
      }
    } else {
      aw.con.warn(`setup.sexToys.insert cant find the ${toy} toy!`);
      return "Error happened, please report!";
    }
  } else {
    aw.con.warn("setup.sexToys.insert can't manage NPC toys for now.");
    return "Error happened, please report!";
  }
};

setup.sexToys.printer = function(): string {
  let out = "";
  for (const toy of Object.keys(setup.sexToys.toys)) {
    if (setup.sexToys.toys[toy].menu === false) {
      if (ↂ.toys.parts[setup.sexToys.toys[toy].occupied[0]] !== setup.sexToys.toys[toy].key && State.active.variables.items.has(setup.sexToys.toys[toy].name)) {
        out += `<<button "${setup.sexToys.toys[toy].name}">><<set _toy = "${toy}">><<run setup.sexToys.use("pc", "${toy}")>><</button>>`;
      }
    } else {
      if (State.active.variables.items.has(setup.sexToys.toys[toy].name)) {
        out += `<<button "${setup.sexToys.toys[toy].name}">><<set _toy = "${toy}">><<run setup.sexToys.use("pc", "${toy}")>><</button>>`;
      }
    }
  }
  for (const part of Object.keys(ↂ.toys.parts)) {
    if (ↂ.toys.parts[part] !== false) {
      if (setup.sexToys.toys[ↂ.toys.parts[part]].removable) {
        out += `<<button "Remove ${setup.sexToys.toys[ↂ.toys.parts[part]].name}">><<run setup.sexToys.remove("pc", "${part}")>><<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><</button>>`;
      } /* else {
        out += `@@.disabled;<<button "Can't remove ${setup.sexToys.toys[ↂ.toys.parts[part]].name}">><</button>>@@`;
      } */
    }
  }
  return out;
};

setup.sexToys.SexSystemToysRemovePrinter = function(): string {
  let out = "";
  for (const part of Object.keys(ↂ.toys.parts)) {
    if (ↂ.toys.parts[part] !== false) {
      if (setup.sexToys.toys[ↂ.toys.parts[part]].removable) {
        out += `<<button "Remove ${setup.sexToys.toys[ↂ.toys.parts[part]].name}">><<run setup.sexToys.remove("pc", "${part}")>><<run setup.sex.actionButtonPrinter()>><<run Dialog.close()>><</button>>`;
      }
    }
  }
  return out;
};

setup.sexToys.FuckMachineDildoPrinter = function(machine: string): string {
  let out = "";
  let counter = 0;
  for (const toy of Object.keys(setup.sexToys.toys)) {
    if (setup.sexToys.toys[toy].type[0] === "dildo") {
      if (State.active.variables.items.has(setup.sexToys.toys[toy].name)) {
        out += `<<button "Use vaginally with ${setup.sexToys.toys[toy].name}">><<set ↂ.flag.fuckMachineDildo = "${toy}">><<run aw.homeItems.${machine}.action(1)>><<run Dialog.close()>><</button>><<tab>>`;
        out += `<<button "Use anally with ${setup.sexToys.toys[toy].name}">><<set ↂ.flag.fuckMachineDildo = "${toy}">><<run aw.homeItems.${machine}.action(2)>><<run Dialog.close()>><</button>><<tab>>`;
        counter++;
      }
    }
  }
  if (counter === 0) {
    out += `@@.disabled;<<button "Can't use without dildos!">><</button>>@@<<tab>>`;
  }
  return out;
};

setup.sexToys.list = function(): string {
  let out = "";
  const list = {
    mouth: "in your mouth",
    arms: "on your arms",
    legs: "on your legs",
    asshole: "in your asshole",
    clit: "on your clit",
    vagina: "on your vagina",
    groin: "covering your groin",
    nipples: "on your nipples",
    breasts: "on your tits",
  };
  for (const part of Object.keys(ↂ.toys.parts)) {
    if (ↂ.toys.parts[part] !== false) {
      out += `${list[part]}: ${setup.sexToys.toys[ↂ.toys.parts[part]].name} <br>`;
    }
  }
  return out;
};

setup.sexToys.shopping = function(): string {
  let out = "";
  let count = 0;
  for (const toy of Object.keys(setup.sexToys.toys)) {
    if (!State.active.variables.items.has(setup.sexToys.toys[toy].name)) {
      let sizing;
      if (setup.sexToys.toys[toy].type[0] === "dildo" || setup.sexToys.toys[toy].type[0] === "plug") {
        sizing = `${setup.sexToys.toys[toy].size} cm (${Math.round(setup.sexToys.toys[toy].size / 2.54)} inch) in diameter.`;
      } else {
        sizing = "";
      }
      out += `<tr><td class="storeitem" style="width:20%;">
        ${setup.sexToys.toys[toy].name}
        <img data-passage="${setup.sexToys.toys[toy].img}" style="width:100px;height:auto;display:block;">
      </td><td style="padding-bottom:10px;">
        ${setup.sexToys.toys[toy].desc} ${sizing}
      </td><td style="width:15%;padding-left:15px;">
        @@.money;<<mon>>${setup.sexToys.toys[toy].price}@@ <span id="buyshit${count}"></span><br><<button "Add to Cart">><<set $cart.push(["${setup.sexToys.toys[toy].name}", "simple", ${setup.sexToys.toys[toy].price}, "${setup.sexToys.toys[toy].name}", 1])>><<replace "#buyshit${count}">>@@.exp;Added!@@<</replace>><</button>>
      </td></tr>`;
      count += 1;
    }
  }
  return out;
};

setup.sexToys.hasDildo = function(): false | string {
  const keys = Object.keys(setup.sexToys.toys);
  const dildoList = [] as string[];
    for (let index = 0; index < keys.length; index++) {
      if (setup.sexToys.toys[keys[index]].type[0] === "dildo" && State.active.variables.items.has(setup.sexToys.toys[keys[index]].name)) {
        dildoList.push(setup.sexToys.toys[keys[index]].name);
      }
    }
    if (dildoList.length > 0) {
      const chosenOne = either(dildoList);
      return chosenOne;
    } else {
      return false;
    }
  return false;
};

setup.sexToys.chastityCheck = function(): ["haveBoth" | "haveBothCageOff" | "noCage" | "noKey", string] { // [do PC has a belt on her AND a key?, what is the belt]
  const res = ["noCage", "none"] as ["haveBoth" | "haveBothCageOff" | "noCage" | "noKey", string];
  if (ↂ.toys.parts.groin === "chastityBelt") {
    res[1] = "chastityBelt";
    res[0] = "noKey";
    if (State.active.variables.items.has("Chastity belt key")) {
      res[0] = "haveBoth";
    }
  }
  if (ↂ.toys.parts.groin === "cPlate") {
    res[1] = "cPlate";
    res[0] = "noKey";
    if (State.active.variables.items.has("Cplate 200 remote")) {
      res[0] = "haveBoth";
    }
  }
  if (ↂ.toys.parts.clit === "clitShield") {
    res[1] = "clitShield";
    res[0] = "noKey";
    if (State.active.variables.items.has("Clit shield remote")) {
      res[0] = "haveBoth";
    }
  }
  if (ↂ.toys.parts.groin === false && ↂ.toys.parts.clit === false) {
    if (State.active.variables.items.has("Chastity belt") && State.active.variables.items.has("Chastity belt key")) {
      res[1] = "chastityBelt";
      res[0] = "haveBothCageOff";
    }
    if (State.active.variables.items.has("Cplate 200") && State.active.variables.items.has("Cplate 200 remote")) {
      res[1] = "cPlate";
      res[0] = "haveBothCageOff";
    }
    if (State.active.variables.items.has("Clit shield") && State.active.variables.items.has("Clit shield remote")) {
      res[1] = "clitShield";
      res[0] = "haveBothCageOff";
    }
  }
  return res;
}

// MACROS

Macro.add("removetoys", {
  handler() {
    if (this.args.length === 0) {
      return this.error("removetoys Macro requires a place argument!");
    } else if ("string" !== typeof this.args[0]) {
      return this.error("Incorrect data type for removetoys macro - string expected.");
    }
    let out = "";
    if (ↂ.toys.parts[this.args[0]] === false) {
      switch (ↂ.toys.parts[this.args[0]]) {
        case "asshole": // chastity check
        case "clit":
        case "vagina":
          if (ↂ.toys.parts.groin !== false) {
            if (setup.sexToys.toys[ↂ.toys.parts.groin].key === "chastityBelt") {
              out += `@@.npc;Hey, there is a ${setup.sexToys.toys[ↂ.toys.parts.groin].name} covering your ${this.args[0]}!@@ <<if State.active.variables.items.has("Chastity belt key")>>You giggle and get the key out of your pocket. @@.npc;Phew! Now we are talking!@@<<else>>@@.pc;I... don't have the key.@@<br><br>@@.npc;Oh... So what we gonna do now then?@@<</if>><br><br>}`;
              if (State.active.variables.items.has("Chastity belt key")) {
                setup.sexToys.remove("pc", this.args[0]);
                aw.S();
              }
            } else if (setup.sexToys.toys[ↂ.toys.parts.groin].key === "cPlate") {
              out += `@@.npc;Hey, there is a ${setup.sexToys.toys[ↂ.toys.parts.groin].name} covering your ${this.args[0]}!@@ <<if State.active.variables.items.has("Cplate 200 remote")>>You giggle and get the remote out of your pocket. @@.npc;Phew! Now we are talking!@@<<else>>@@.pc;I... don't have the remote.@@<br><br>@@.npc;Oh... So what we gonna do now then?@@<</if>><br><br>}`;
              if (State.active.variables.items.has("plate 200 remote")) {
                setup.sexToys.remove("pc", this.args[0]);
                aw.S();
              }
            }
          }
          break;
        default:
          break;
      }
    } else {
      out += `@@.npc;Hey, there is a ${setup.sexToys.toys[ↂ.toys.parts[this.args[0]]].name} at your ${this.args[0]}!@@ You smile and reach it with a hand. @@.pc;Let's remove it then...@@`;
      setup.sexToys.remove("pc", this.args[0]);
      aw.S();
    }
    return new Wikifier(this.output, out);
  },
});

Macro.add("toysprintermenu", {
  handler() {
    const out = setup.sexToys.SexSystemToysRemovePrinter();
    return new Wikifier(this.output, out);
  },
});