//   .d8888b.  888             888
//  d88P  Y88b 888             888
//  Y88b.      888             888
//   "Y888b.   888888  8888b.  888888 888  888 .d8888b
//      "Y88b. 888        "88b 888    888  888 88K
//        "888 888    .d888888 888    888  888 "Y8888b.
//  Y88b  d88P Y88b.  888  888 Y88b.  Y88b 888      X88
//   "Y8888P"   "Y888 "Y888888  "Y888  "Y88888  88888P'


interface setupStatus {
  bind: () => void;
  mentalUnfuck: () => void;
  stress: (amt: number, tgt?: number | string, restore?: boolean) => void ;
  anger: (amt: number, tgt?: number | string, restore?: boolean) => void ;
  happy: (amt: number, tgt?: number | string, restore?: boolean) => void ;
  tired: (amt: number, tgt?: number | string, restore?: boolean) => void ;
  arousal: (amt: number | string, tgt?: number | string, restore?: boolean) => void ;
  satisfact: (amt: number, tgt?: number | string, restore?: boolean) => void ;
  getMilked: (pump: "hand" | "manual" | "electric" | "strong" | "super" | "industrial" | "magic") => void;
  milk: () => number|void;
  menuMilk: () => void;
  lonely: (amt: number, tgt?: number | string) => void;
}


setup.status = {} as setupStatus;


// bind - function constrains stat values into a safe range, used to wrangle stats together without
// completely removing changes from choices. Intended primarily for exiting the prologue.

setup.status.bind = function(): void {
  aw.L();
  const s = ↂ.pc.status;
  s.arousal = 1;
  s.pleasure = 0;
  s.need = 0;
  if (s.health < 96) {
    s.health = 96;
  }
  if (s.satisfaction < 45) {
    s.satisfaction = 45;
  } else if (s.satisfaction > 85) {
    s.satisfaction = 85;
  }
  if (s.stress > 60) {
    s.stress = 60;
  } else if (s.stress < 20) {
    s.stress = 20;
  }
  if (s.happy < 0) {
    s.happy = 0;
  } else if (s.happy > 6) {
    s.happy = 6;
  }
  if (s.anger > 1) {
    s.anger = 1;
  }
  if (s.lonely > 20) {
    s.lonely = 20;
  }
  s.overAnger = false;
  s.overStress = false;
  s.overDepress = false;
  s.underSatisfy = 0;
  const drugs = ["sex", "alc", "heat", "satyr", "focus", "cum", "cream"];
  for (const drug of drugs) {
    if (s.addict[drug] > 25) {
      s.addict[drug] = 25;
    }
  }
  const needs = ["sexNeed", "alcNeed", "heatNeed", "satyrNeed", "focusNeed", "cumNeed", "creamNeed"];
  for (const need of needs) {
    s.addict[need] = 0;
  }
  s.addict.jonesing = 0;
  s.addict.withdrawl = false;
  s.injury = ["none"];
  s.disease = ["none"];
  s.mindbreak = false;
  aw.S("pc");
};

// ... unfucks mental status. temporary hypno treatment.
setup.status.mentalUnfuck = function(): void {
  aw.L();
  const s = ↂ.pc.status;
  s.arousal = 0;
  s.pleasure = 0;
  s.need = 0;
  s.satisfaction = 95;
  s.stress = 5;
  if (s.happy < 0) {
    s.happy = 0;
  }
  s.happy += 3;
  if (s.happy > 8) {
    s.happy = 8;
  }
  s.anger = 0;
  s.lonely = 5;
  s.overAnger = false;
  s.overStress = false;
  s.overDepress = false;
  s.underSatisfy = 0;
  const drugs = ["sex", "alc", "heat", "satyr", "focus", "cum", "cream"];
  for (const drug of drugs) {
    if (s.addict[drug] > 15) {
      s.addict[drug] = 15;
    }
  }
  const needs = ["sexNeed", "alcNeed", "heatNeed", "satyrNeed", "focusNeed", "cumNeed", "creamNeed"];
  for (const need of needs) {
    s.addict[need] = 0;
  }
  s.addict.jonesing = 0;
  s.addict.withdrawl = false;
  s.mindbreak = false;
  s.bimbo += random(4, 6);
  if (s.bimbo > 80) {
    s.bimbo = 80;
  }
  s.perversion += random(3, 5);
  if (s.perversion > 80) {
    s.perversion = 80;
  }
  aw.S("pc");
};

/********************************************************/
/*  ╔═╗┌┬┐┬─┐┌─┐┌─┐┌─┐   Alters the PC or NPC's stress  */
/*  ╚═╗ │ ├┬┘├┤ └─┐└─┐   variable by accounting for the */
/*  ╚═╝ ┴ ┴└─└─┘└─┘└─┘   impact from other variables    */
/********************************************************/
setup.status.stress = function(amt, tgt = -1) {
  // tgt is set as default to -1. calling .status.stress(3); will target PC.
  // restore is default false. it true, isActive function will restore them if stored.
  // first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);

  let pc;
  let id;
  let tit;
  let trait; // variable to hold result from isActive
  // if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt === -1) {
    pc = true;
    id = "none";
    // assign object key based on target since we don't know if PC or not.
    trait = "trait";
    // load status !!important!!
    setup.statusLoad("pc");
    tit = ↂ.pc; // create tit as reference to correct object
  } else if ("number" === typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else if ("string" === typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else {
    // we have bad input, meaning we throw an error and return.
    const msg = "Stress function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    // need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim === "[dev]") {
      UI.alert(msg);
    }
    return;
  }
  // now we have the correct N/PC to edit. let's set some default values for ease.
  const stress = tit.status.stress; // returns character's stress, and we can manipulate freely.
  let mod = 0; // start with zero to make reversing sign easier later.
  // this isn't really necessary, but can save time if you're using the same thing a lot.
  const open = tit[trait].op;
  const closed = tit[trait].cl;
  const intro = tit[trait].intro;
  const extro = tit[trait].extro;
  if (open) {
    mod -= 0.3;
  } else if (closed) {
    mod += 0.3;
  }
  if (intro) {
    mod -= 0.2;
  } else if (extro) {
    mod += 0.2;
  }
  if (pc && tit[trait].relaxed === 1) {
    mod -= 0.2;
  } else if (pc && tit[trait].relaxed === -1) {
    mod += 0.2;
  }
  if (tit.status.need > 4) {
    mod += 1;
  } else if (tit.status.need > 3) {
    mod += 0.75;
  } else if (tit.status.need > 1) {
    mod += 0.5;
  } else if (tit.status.need > 0) {
    mod += 0.25;
  }
  /******************************/
  /* SITUATION TAGS PLACEHOLDER */
  /******************************/
  // time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; // adjust to proper multiplier
  mod = Math.max(0.25, mod); // keep modifier within range
  mod = Math.min(2.5, mod);
  amt = Math.round(amt * mod); // finally adjust amount
  // for cheat
  if (pc && aw.chad.stress && amt >= 0) {
    amt = 0;
  }
  tit.status.stress += amt;
  // check for over or under values
  if (tit.status.stress > 100) {
    if (pc && tit.status.overStress) {
      ↂ.flag.badEnd = "stress";
    } else if (pc && ↂ.flag.organDonor) {
      ↂ.flag.badEnd = "stress";
    } else {
      tit.status.overStress = true;
      setup.notify("<span class='bad'>You are dangerously stressed!</span>");
    }
    tit.status.stress = 100 - random(0, 3);
  } else if (tit.status.stress < 0) {
    tit.status.stress = 0;
  }
  if (pc) {
    setup.statusSave("pc");
  }
};

/*******************************************/
/* ╔═╗┌┐┌┌─┐┌─┐┬─┐  Alters the N/PC anger  */
/* ╠═╣││││ ┬├┤ ├┬┘  stat by accounting for */
/* ╩ ╩┘└┘└─┘└─┘┴└─  other variables.       */
/*******************************************/
/* This function mirrors the functionality of the stress function */
setup.status.anger = function(amt, tgt = -1) {
  const pattern = new RegExp(/n[0-9]{3,5}$/);

  let pc;
  let id;
  let tit;
  let trait;
  if (tgt === -1) {
    pc = true;
    id = "none";
    trait = "trait";
    setup.statusLoad("pc");
    tit = ↂ.pc; // create tit as reference to correct object
  } else if ("number" === typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else if ("string" === typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else {
    // we have bad input, meaning we throw an error and return.
    const msg = "Stress function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    // need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim === "[dev]") {
      UI.alert(msg);
    }
    return;
  }
  const anger = tit.status.anger;
  let mod = 0;
  const open = tit[trait].op;
  const closed = tit[trait].cl;
  if (tit[trait].bitch === 1) {
    mod += 0.25;
  } else if (tit[trait].bitch === -1) {
    mod -= 0.25;
  }
  if (tit[trait].op) {
    mod -= 0.2;
  } else if (tit[trait].cl) {
    mod += 0.5;
  }
  if (tit.status.need > 4) {
    mod += 1;
  } else if (tit.status.need > 3) {
    mod += 0.75;
  } else if (tit.status.need > 2) {
    mod += 0.5;
  } else if (tit.status.need > 0) {
    mod += 0.25;
  }
  /******************************/
  /* SITUATION TAGS PLACEHOLDER */
  /******************************/
  // time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; // adjust to proper multiplier
  mod = Math.max(0.25, mod); // keep modifier within range
  mod = Math.min(2.5, mod);
  amt = Math.round(amt * mod); // finally adjust amount
  // for cheat
  if (pc && aw.chad.anger && amt >= 0 && tit.status.anger >= 5) {
    amt = 0;
  }
  const chk = tit.status.anger + amt;
  tit.status.anger += amt;
  // check for over or under values
  if (chk > 10) {
    if (pc && tit.status.overAnger) {
      ↂ.flag.badEnd = "anger";
    } else if (pc && ↂ.flag.organDonor) {
      ↂ.flag.badEnd = "anger";
    } else {
      tit.status.overAnger = true;
      if (pc) {
        setup.notify("<span class='bad'>You are dangerously angry!</span>");
      }
    }
  }
  if (pc) {
    setup.statusSave("pc");
  }
};

/*******************************************/
/* ╦ ╦┌─┐┌─┐┌─┐┬ ┬  Yep, it's another one  */
/* ╠═╣├─┤├─┘├─┘└┬┘  of these things.       */
/* ╩ ╩┴ ┴┴  ┴   ┴                          */
/*******************************************/

setup.status.happy = function(amt, tgt = -1) {
  const pattern = new RegExp(/n[0-9]{3,5}$/);

  let pc;
  let id;
  let tit;
  let trait;
  if (tgt === -1) {
    pc = true;
    id = "none";
    // assign object key based on target since we don't know if PC or not.
    trait = "trait";
    setup.statusLoad("pc");
    tit = ↂ.pc; // create tit as reference to correct object
  } else if ("number" === typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else if ("string" === typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else {
    // we have bad input, meaning we throw an error and return.
    const msg = "Happiness function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    // need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim === "[dev]") {
      UI.alert(msg);
    }
    return;
  }
  let mod = 0;
  const open = tit[trait].op;
  const closed = tit[trait].cl;
  const intro = tit[trait].intro;
  const extro = tit[trait].extro;
  if (open) {
    mod += random(0, 2) / 10;
  } else if (closed) {
    mod -= random(2, 4) / 10;
  }
  if (intro) {
    mod -= random(1, 2) / 10;
  } else if (extro) {
    mod += random(3, 5) / 10;
  }
  if (tit[trait].lowEsteem !== 0) {
    mod -= 0.2;
  }
  if (tit.status.need > 4) {
    mod -= 1;
  } else if (tit.status.need > 3) {
    mod -= 0.75;
  } else if (tit.status.need > 1) {
    mod -= 0.5;
  } else if (tit.status.need > 0) {
    mod -= 0.25;
  }
  /******************************/
  /* SITUATION TAGS PLACEHOLDER */
  /******************************/
  // time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; // adjust to proper multiplier
  mod = Math.max(0, mod); // keep modifier within range
  mod = Math.min(2.5, mod);
  amt = Math.round(amt * mod); // finally adjust amount
  // for cheat
  if (pc && aw.chad.happy && amt <= 0 && tit.status.happy <= 0) {
    amt = 0;
  }
  const chk = tit.status.happy += amt;
  tit.status.happy += amt;
  // check for over or under values
  if (chk < -9 && pc) {
    if (tit.status.overDepress) {
      ↂ.flag.badEnd = "depression";
    } else if (ↂ.flag.organDonor) {
      ↂ.flag.badEnd = "depression";
    } else {
      tit.status.overDepress = true;
      setup.notify("<span class='bad'>You are dangerously depressed!</span>");
    }
    tit.status.happy = -10 + random(1, 2);
  }
  if (pc) {
    setup.statusSave("pc");
  }
};

/*******************************************/
/* ╔╦╗┬┬─┐┌─┐┌┬┐  Increases the fatigue of */
/*  ║ │├┬┘├┤  ││  the N/PC. Reduces hp if  */
/*  ╩ ┴┴└─└─┘─┴┘  fatigue is too high.     */
/*******************************************/

setup.status.tired = function(amt, tgt = -1) {
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let pc;
  let id;
  let tit;
  if (tgt === -1) {
    pc = true;
    id = "none";
    setup.statusLoad("pc");
    tit = ↂ.pc; // create tit as reference to correct object
  } else if ("number" === typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else if ("string" === typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else {
    // we have bad input, meaning we throw an error and return.
    const msg = "fatigue function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    // need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim === "[dev]") {
      UI.alert(msg);
    }
    return;
  }
  let mod = 0;
  mod += tit.status.disease.length > 1 ? 0.5 : 0;
  mod += tit.status.addict.withdrawl ? 0.3 : 0;
  /******************************/
  /* SITUATION TAGS PLACEHOLDER */
  /******************************/
  // time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; // adjust to proper multiplier
  mod = Math.max(0.3, mod); // keep modifier within range
  mod = Math.min(2, mod);
  amt = Math.round(amt * mod); // finally adjust amount
  // for cheat
  if (pc && aw.chad.tired && amt > 0 && tit.status.fatigue >= 7) {
    amt = 0;
  }
  tit.status.fatigue += amt;
  // check for over or under values
  if (tit.status.fatigue >= 10 && pc) {
    setup.notify("<span class='bad'>You are extremely tired.</span>");
    tit.status.health -= random(1, 5);
  }
  if (pc) {
    setup.statusSave("pc");
  }
};

/**********************************************/
/* ╔═╗┬─┐┌─┐┬ ┬┌─┐┌─┐┬    Adds arousal to     */
/* ╠═╣├┬┘│ ││ │└─┐├─┤│    N/PC based on basic */
/* ╩ ╩┴└─└─┘└─┘└─┘┴ ┴┴─┘  characteristics.    */
/**********************************************/
setup.status.arousal = function(amt, tgt = -1) {
  // tgt is set as default to -1. calling .status.stress(3); will target PC.
  // restore is default false. it true, isActive function will restore them if stored.
  // first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  const coded = new RegExp(/(X|x)[0-9]{1,2}$/);

  let pc;
  let id;
  let tit;
  let trait;
  let rolls;
  let arousal;
  let prob = 30;
  let cunt = 0; // variable to hold result from isActive
  // if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt === -1) {
    pc = true;
    id = "none";
    // assign object key based on target since we don't know if PC or not.
    trait = "trait";
    setup.statusLoad("pc");
    tit = ↂ.pc; // create tit as reference to correct object
  } else if ("number" === typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else if ("string" === typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else {
    // we have bad input, meaning we throw an error and return.
    const msg = "Arouse function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    // need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim === "[dev]") {
      UI.alert(msg);
    }
    return;
  }
  // Time to check for optional value that allow for reset
  if (amt === "X" || amt === "x") { // entering X as amount zeros arousal
    tit.status.arousal = 0;
  } else if ("string" === typeof amt && coded.test(amt as string)) { // entering X# as amount sets to that amount
    let v = Number(amt.slice(1));
    v = Math.max(0, Math.min(15, v));
    tit.status.arousal = v;
  } else if ("number" === typeof amt) { // proceed normally
    arousal = tit.status.arousal;
    let mod = 0;
    rolls = 0; // start with zero to make reversing sign easier later.
    const open = tit[trait].op;
    const closed = tit[trait].cl;
    const extro = tit[trait].extro;
    const libido = tit[trait].libido;
    /*first mod factor is based on general personality, slut impacts are different*/
    if (open) {
      mod += 0.1;
    } else if (closed) {
      mod -= 0.2;
    }
    if (extro) {
      mod += 0.2;
    }
    const libmod = [-1, -0.6, -0.4,
      0,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.8,
    ];
    mod += libmod[libido];
    /******************************/
    /* TAG PLACEHOLDER # 1        */
    /******************************/
    // time for sign flip
    if (amt < 0) {
      mod *= -1;
    }
    mod += 1; // adjust to proper multiplier
    mod = Math.max(0.1, mod);
    rolls = Math.max(1, Math.round(3 * amt * mod)); // determine number of rolls
    rolls = Math.min(rolls, (amt * 8));
    /*second effect adjusts probability of each roll*/
    prob -= arousal;
    if (amt > 0) {
      if (tit.status.need > 4) {
        prob += 50;
      } else if (tit.status.need > 3) {
        prob += 45;
      } else if (tit.status.need > 2) {
        prob += 40;
      } else if (tit.status.need > 1) {
        prob += 30;
      } else if (tit.status.need > 0) {
        prob += 10;
      }
      if (pc) {
        if (tit.kink.hyperSlut) {
          prob += 40;
          rolls += random(1, 2);
        } else if (tit.kink.superSlut) {
          prob += 25;
          rolls += 1;
        } else if (tit.kink.slut) {
          prob += 10;
          rolls += random(0, 1);
        }
      }
      prob = Math.min(95, prob);
    } else { // for subtracting from arousal, negative amt
      if (tit.status.need > 3) {
        prob = 5;
      } else if (tit.status.need > 1) {
        prob = 15;
      } else if (tit.status.need > 0) {
        prob = 20;
      }
      if (pc) {
        if (tit.kink.hyperSlut) {
          prob -= 20;
          rolls -= random(1, 2);
        } else if (tit.kink.superSlut) {
          prob -= 15;
          rolls -= 1;
        } else if (tit.kink.slut) {
          prob -= 10;
          rolls -= random(0, 1);
        }
      }
      prob = Math.max(5, prob);
      rolls = Math.max(1, rolls);
    }
    // first set up maximum arousal
    let max = 10 + Math.ceil((1 + libido) / 2);
    let top;
    for (let i = 0; i < rolls; i++) {
      if (amt > 0) {
        top = Math.round((Math.max(0, (tit.status.arousal + cunt - 3)) / max) * 500) + 100;
      } else {
        top = (tit.status.arousal <= (max / 2)) ? (150) : 80;
      }
      const n = random(1, top);
      if (n <= prob) {
        cunt++;
      }
    }
    if (amt < 0) { // flip final amount if subtracting
      cunt *= -1;
    } else if (pc && tit.kink.shame) {
      if (tit.status.arousal + cunt > 2) {
        tit.status.stress += cunt * random(1, 3);
      }
    }
    tit.status.arousal += cunt;
    // check for over or under values... more complicated!
    if (pc && tit.kink.slut) {
      max = 15;
    }
    if (tit.status.arousal >= (max - 2)) {
      if (pc) {
        if (!ↂ.sex.scene) {
          setup.notify("<span class='bad'>You are dangerously aroused!</span>");
        }
        tit.status.bimbo += random(0, 2) + random(0, 2);
      } else {
        tit.core.bimbo += random(3, 8);
      }
    }
    if (tit.status.arousal > max) {
      tit.status.arousal = max;
      if (pc && random(1, 4) === 1) {
        tit.status.mindbreak = true;
      }
    }
  }
  if (State.variables.debu) {
    let ms = `Arousal details- amt:${amt}, rolls:${rolls} @${prob}%, added:${cunt}, start:${arousal}, final:` + tit.status.arousal + ", tgt:";
    ms += pc ? "PC" : "NPC";
    aw.con.info(ms);
  }
  if (pc) {
    setup.statusSave("pc");
  }
};

setup.status.getMilked = function(pump: "hand"|"manual"|"electric"|"strong"|"super"|"industrial"|"magic" = "hand"): void {
  aw.L("pc");
  const ᛔ = ↂ.pc;
  const T = State.temporary;
  T.milk = {};
  T.milk.amt = ᛔ.status.milkStore;
  T.milk.cum = false;
  T.milk.type = pump;
  T.milk.cans = 0;
  T.milk.incr = false;
  const pumps = {
    hand: 10,
    manual: 13,
    electric: 16,
    strong: 19,
    super: 22,
    industrial: 26,
    magic: 30,
  };
  const rate = Math.floor(ᛔ.body.totalMilkCapacity / 75) + pumps[pump];
  const base = Math.ceil(T.milk.amt / rate);
  const mod = 1 - ((ᛔ.body.tits.nipGirth - 3) / 10);
  const time = Math.round(mod * base);
  T.milk.time = time;
  ᛔ.status.milkStore = 0;
  // calc for milk canisters
  const totalMilk = T.milk.amt + ↂ.flag.milkTank;
  if (pump !== "hand") {
    T.milk.cans = Math.floor(totalMilk / 4000); // 4000ml = 4 liter milk cans
    ↂ.flag.milkTank = totalMilk % 4000; // remainder goes to milk store
    if (T.milk.cans > 0) { // add tanks to inventory if 1 or more
      setup.consumables.add("breastMilkA", T.milk.cans);
    }
  }
  aw.S("pc");
  setup.time.add(time);
  T.milk.amt += ᛔ.status.milkStore;
  ᛔ.status.milkStore = 0;
  setup.lactBreastCalc();
  aw.S("pc");
  let cumtime = 20;
  if (pump === "industrial" || pump === "magic") {
    cumtime = 5;
  } else if (pump === "strong" || pump === "super") {
    cumtime = 10;
  } else if (pump === "electric" || pump === "manual") {
    cumtime = 15;
  }
  const m = ᛔ.status.milk;
  switch (pump) {
    case "magic":
      if (m < 10 && random(1, 10) === 10) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      } else if (m < 7) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      }
      break;
    case "industrial":
      if (m < 9 && random(1, 10) === 10) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      } else if (m < 6) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      }
      break;
    case "super":
      if (m < 7 && random(1, 10) === 10) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      } else if (m < 4) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      }
      break;
    case "strong":
      if (m < 5 && random(1, 10) === 10) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      } else if (m < 2) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      }
      break;
    case "electric":
      if (m < 4 && random(1, 10) === 10) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      }
      break;
    case "manual":
      if (m < 3 && random(1, 10) === 10) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      }
      break;
    case "hand":
      if (m < 2 && random(1, 10) === 10) {
        ᛔ.status.milk += 1;
        T.milk.incr = true;
      }
      break;
  }
  if ((ᛔ.status.arousal >= 3 && ᛔ.kink.nips && time >= cumtime) || (ᛔ.status.arousal >= 6 && time >= cumtime + 5)
  || (ᛔ.status.arousal >= 8 && time >= cumtime)) {
    aw.L("pc");
    ↂ.pc.status.arousal = 2;
    T.milk.cum = true;
    aw.S("pc");
    setup.status.satisfact(random(3, 5));
  } else {
    setup.status.satisfact(1);
    setup.status.arousal(2);
  }
};

setup.status.milk = function(): number|void {
  const ᛔ = ↂ.pc;
  const quality = ᛔ.body.lactation;
  const capacity = ᛔ.body.totalMilkCapacity;
  if (ᛔ.status.milk > 10) {
    ᛔ.status.milk = 10;
  }
  const level = ᛔ.status.milk;
  if (level <= 0) {
    ᛔ.body.tits.lact.on = false;
    if (ᛔ.status.milkStore > 0) {
      ᛔ.status.milkStore -= random(1, 3);
      if (ᛔ.status.milkStore <= 0) {
        ᛔ.status.milkStore = 0;
      } else {
        ᛔ.body.tits.lact.on = true;
      }
      setup.lactBreastCalc();
      aw.S();
    }
    return 0;
  }
  ᛔ.body.tits.lact.on = true;
  const q = [0, 0.75, 1, 1.25, 1.75, 2.5]; // body.lactation - base ability: 0-5
  const w = [0, 0.1, 0.5, 1, 1.2, 1, 0.8, 0.6, 0.4, 0.2]; // weight-based lact adjust
  const p = [0, 0.1, 0.3, 0.6, 0.8, 1, 1.2, 1.5, 1.9, 2.4, 3]; // status.milk (current lact) 0-10
  let rate = Math.round(capacity / 8); // basic lact speed is based on breast/gland size, true fact
  if (ᛔ.status.health < 95) {
    rate = Math.round(rate * (ᛔ.status.health / 120)); // adjust for poor health
  }
  rate = Math.round(rate * w[ᛔ.body.weight]); // adjust for weight
  rate = Math.round(rate * q[quality]); // adjust for base lact ability
  rate = Math.round(rate * p[level]); // lactation level adjust
  rate = Math.round(rate / 4); // adjust for 15min increment from hourly calc
  ᛔ.status.milkStore += rate;
  let titsize = ᛔ.body.tits.base.size + Math.round(ᛔ.status.milkStore / 4);
  if (titsize > ᛔ.body.tits.lact.max) {
    titsize = ᛔ.body.tits.lact.max;
  }
  ᛔ.body.tits.lact.size = titsize;
  setup.lactBreastCalc();
  aw.S();
  if (setup.eventAllowed) {
    if (ᛔ.status.milkStore > capacity * 1.3) {
      if (random(1, 2) === 1) {
        const spill = ᛔ.status.milkStore - capacity;
        ᛔ.status.milkStore = capacity + Math.round(spill * 0.1);
        if (random(1, 5) === 5) {
          ᛔ.status.stress += random(1, 2);
          ᛔ.status.satisfaction -= random(1, 3);
        }
        if (random(1, 30) === 1) {
          ᛔ.status.health -= 1;
          ᛔ.status.happy -= 1;
        }
        if (random(1, 69) === 1) {
          if (State.active.variables.pub && State.active.variables.cheat.permaLact) {
            // no red
          } else {
            ᛔ.status.milk -= 1;
            return -2;
          }
        }
        return spill;
      } else {
        return -4;
      }
    }
    if (ᛔ.status.milkStore > capacity) {
      return -3;
    }
    if (ᛔ.status.milkStore >= (capacity * 0.8)) {
      return -1;
    }
  } else {
    setup.status.menuMilk();
  }
};

setup.status.menuMilk = function(): void {
  const milk = ↂ.pc.status.milkStore;
  const cap = ↂ.pc.body.totalMilkCapacity;
  const collect = Math.floor(cap * 0.85);
  if (milk > collect) {
    ↂ.flag.milkTank += milk - collect;
    ↂ.pc.status.milkStore = collect;
  }
  setup.lactBreastCalc();
  aw.S("pc");
};



/*
<<elseif $args[0] == "N">>
	<<if ndef $args[1]>>
		<<set $AW.error += ", arousal setting error - no args sent to function in passage: ">>
		<<set $AW.error += aw.passage.title>>
		<<set ↂ.pc.status.arousal = 0>>
	<<else>>
		<<switch $args[1]>>
		<<case 1>>
			<<set ↂ.pc.status.arousal = -1>>
		<<case 2>>
			<<set ↂ.pc.status.arousal = -2>>
		<<case 3>>
			<<set ↂ.pc.status.arousal = -3>>
		<<case 4>>
			<<set ↂ.pc.status.arousal = -4>>
		<<case 5>>
			<<set ↂ.pc.status.arousal = -5>>
		<<case 6>>
			<<set ↂ.pc.status.arousal = -6>>
		<<case default>>
			<<set ↂ.pc.status.arousal = -1>>
		<</switch>>
	<</if>>
	<<set ↂ.pc.status.arousal += $args[0]>>
	<<if ↂ.pc.kink.hyperSlut>>
		<<set ↂ.pc.status.arousal += 2>>
	<<elseif ↂ.pc.kink.superSlut>>
		<<set ↂ.pc.status.arousal += 1>>
	<<elseif ↂ.pc.kink.slut>>
		<<set ↂ.pc.status.arousal += either(0,0,1)>>
	<</if>>
	<<if ↂ.pc.trait.libido > 7>>
		<<set ↂ.pc.status.arousal += 1>>
	<</if>>
	<<if ↂ.pc.status.arousal < -6>>
		<<set ↂ.pc.status.arousal = -6>>
	<<elseif ↂ.pc.status.arousal > 0>>
		<<set ↂ.pc.status.arousal = 0>>
  <</if>>
*/
/*****************************************
  ╔═╗┌─┐┌┬┐┬┌─┐
  ╚═╗├─┤ │ │└─┐───
  ╚═╝┴ ┴ ┴ ┴└─┘
┌─┐┌─┐┌─┐┌┬┐┬┌─┐┌┐┌
├┤ ├─┤│   │ ││ ││││
└  ┴ ┴└─┘ ┴ ┴└─┘┘└┘
*****************************************/
setup.status.satisfact = function(amt, tgt = -1) {
  // tgt is set as default to -1. calling .status.stress(3); will target PC.
  // restore is default false. it true, isActive function will restore them if stored.
  // first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);

  let pc;
  let id;
  let tit;
  let trait; // variable to hold result from isActive
  // if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt === -1) {
    pc = true;
    id = "none";
    // assign object key based on target since we don't know if PC or not.
    trait = "trait";
    tit = ↂ.pc; // create tit as reference to correct object
  } else if ("number" === typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else if ("string" === typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else {
    // we have bad input, meaning we throw an error and return.
    const msg = "Satisfaction function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    // need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim === "[dev]") {
      UI.alert(msg);
    }
    return;
  }
  let chk = ↂ.pc.status.satisfaction;
  if (!aw.chad.satisfy) {
    // load status !!important!!
    if (pc) {
      setup.statusLoad("pc");
    }
    // now we have the correct N/PC to edit. let's set some default values for ease.
    const stress = tit.status.stress; // returns character's stress, and we can manipulate freely.
    let mod = 0; // start with zero to make reversing sign easier later.
    // this isn't really necessary, but can save time if you're using the same thing a lot.
    const open = tit[trait].op;
    const closed = tit[trait].cl;
    const intro = tit[trait].intro;
    const extro = tit[trait].extro;
    if (open) {
      mod += 0.1;
    } else if (closed) {
      mod += 0.1;
    }
    if (intro) {
      mod += 0.3;
    } else if (extro) {
      mod -= 0.4;
    }
    if (pc && tit.kink.slut) {
      if (tit.kink.hyperSlut) {
        mod -= 0.8;
      } else if (tit.kink.superSlut) {
        mod -= 0.5;
      } else {
        mod -= 0.3;
      }
    }
    if (pc) {
      if (tit[trait].lowEsteem === 1) {
        mod += 0.1;
      }
      if (tit[trait].picky === 1) {
        mod -= 0.15;
      } else if (tit[trait].picky === -1) {
        mod += 0.15;
      }
      if (tit.kink.fap) {
        mod -= 0.1;
      }
      if (tit.kink.hard) {
        mod -= 0.25;
      }
      if (tit.kink.shame) {
        mod -= 0.2;
      }
    }
    if (tit[trait].morality < 25) {
      mod -= 0.2;
    } else if (tit[trait].morality < 50) {
      mod -= 0.1;
    }
    if (tit[trait].perversion >= 90 || tit[trait].bimbo >= 90) {
      mod -= 0.6;
    } else if (tit[trait].perversion >= 60 || tit[trait].bimbo >= 60) {
      mod -= 0.4;
    } else if (tit[trait].perversion >= 30 || tit[trait].bimbo >= 30) {
      mod -= 0.2;
    }
    /******************************/
    /* SITUATION TAGS PLACEHOLDER */
    /******************************/
    // time for sign flip
    let r;
    let a = 1;
    if (amt < 0) {
      mod *= -1;
      a = -1;
    }
    mod += 1; // adjust to proper multiplier
    mod = Math.max(0.05, mod); // keep modifier within range
    mod = Math.min(2, mod);
    if (mod < 1) {
      const odds = Math.floor(mod * 100);
      const nRoll = Math.abs(amt);
      for (let i = 0; i < nRoll; i++) {
        r = random(0, 99);
        if (r < odds) {
          ↂ.pc.status.satisfaction += a;
          chk += a;
        }
      }
    } else {
      ↂ.pc.status.satisfaction += amt;
      const odds = Math.floor((mod - 1) * 100);
      const nRoll = Math.abs(amt);
      for (let i = 0; i < nRoll; i++) {
        r = random(0, 99);
        if (r < odds) {
          ↂ.pc.status.satisfaction += a;
          chk += a;
        }
      }
    }
  }
  // check for over or under values
  if (chk <= 0) {
    tit.status.underSatisfy += Math.abs(chk);
    tit.status.satisfaction = random(5, 15);
    let x = 4 + Math.floor(tit[trait].libido / 2);
    x += (pc && tit.kink.slut) ? 1 : 0;
    if (x >= random(1, 10)) {
      tit.status.need += 1;
      if (pc && tit.status.need > 4) {
        if (pc && ↂ.flag.organDonor) {
          ↂ.flag.badEnd = "need";
        } else if (random(0, 3) === 0) {
          ↂ.flag.badEnd = "need";
        }
      } else if (tit.status.need > 3) {
        const o = (ↂ.flag.organDonor) ? random(0, 4) : random(0, 20);
        if (o === 0) {
          ↂ.flag.badEnd = "need";
        }
      } else {
        setup.notify("<span class='bad'>Your sexual need has increased!</span>");
      }
    } else {
      setup.notify("<span class='orange'>Your sexual satisfaction is very low!</span>");
    }
  }
  if (pc) {
    setup.statusSave("pc");
  }
};

setup.status.lonely = function(amt, tgt = -1): void {
  // tgt is set as default to -1. calling .status.stress(3); will target PC.
  // first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let pc;
  let id;
  let tit;
  let trait; // variable to hold result from isActive
  // if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt === -1) {
    pc = true;
    id = "none";
    // assign object key based on target since we don't know if PC or not.
    trait = "trait";
    tit = ↂ.pc; // create tit as reference to correct object
  } else if ("number" === typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else if ("string" === typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; // notice NPC uses core instead of trait
    tit = aw.npc[id]; // we're setting the reference to the NPC instead
  } else {
    // we have bad input, meaning we throw an error and return.
    const msg = "Satisfaction function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    // need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim === "[dev]") {
      UI.alert(msg);
    }
    return;
  }
  if (pc) {
    aw.L("pc");
  }
  const extro = tit[trait].extro;
  const intro = tit[trait].intro;
  const open = tit[trait].op;
  const clos = tit[trait].cl;
  let mod = 100;
  let neg = false;
  if (amt < 0) {
    // loneliness decreases
    neg = true;
    if (extro) {
      mod -= 20;
    }
    if (!intro) {
      mod -= 20;
    }
    if (clos) {
      mod -= 5;
    }
    if (!open) {
      mod -= 5;
    }
    if (intro) {
      tit.status.stress += random(1, 2);
    } else if (extro) {
      tit.status.stress -= random(0, 1);
    }
  } else {
    // loneliness increases
    if (intro) {
      mod -= 20;
    }
    if (!extro) {
      mod -= 20;
    }
    if (open) {
      mod -= 5;
    }
    if (!clos) {
      mod -= 5;
    }
    if (extro) {
      tit.status.stress += random(1, 2);
    } else if (intro) {
      tit.status.stress -= random(0, 1);
    }
  }
  let effect = 0;
  for (let i = 0, c = Math.abs(amt); i < c; i++) {
    if (random(0, 120) < mod) {
      effect++;
    }
  }
  if (neg) {
    effect *= -1;
  }
  if (pc) {
    aw.con.info(`status.lonely() mod: ${mod}, effect: ${effect}, result: ${(tit.status.lonely + effect)}`);
    ↂ.pc.status.lonely += effect;
  } else {
    tit.status.lonely += effect;
  }
  const chk = tit.status.lonely + effect;
  if (chk < 0) {
    tit.status.happy += 1;
  } else if (chk >= 100) {
    tit.status.happy -= 1;
    setup.notify("<span class='bad'>You are extremely lonely!</span>");
    if (pc) {
      const th = (ↂ.flag.organDonor) ? 3 : 1;
      if (random(0, 4) < th) {
        ↂ.flag.badEnd = "Loneliness";
      }
    }
  } else if (chk >= 80 && pc) {
    tit.status.happy -= random(0, 1);
    setup.notify("<span class='peepbad'>You are very lonely!</span>");
  }
  if (pc) {
    aw.S("pc");
  }
};





