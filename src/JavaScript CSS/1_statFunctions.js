/**********************************************************************************/
/*  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  */
/* ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌ */
/* ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀  */
/* ▐░▌               ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░▌       ▐░▌▐░▌           */
/* ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄  */
/* ▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌     ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌ */
/*  ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░█▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌ */
/*           ▐░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░▌       ▐░▌          ▐░▌ */
/*  ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌ */
/* ▐░░░░░░░░░░░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌ */
/*  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀         ▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  */
/*                                                                                */
/*  ThaumX - Functions to control character status variables                      */
/**********************************************************************************/
setup.status = {};
/********************************************************/
/*  ╔═╗┌┬┐┬─┐┌─┐┌─┐┌─┐   Alters the PC or NPC's stress  */
/*  ╚═╗ │ ├┬┘├┤ └─┐└─┐   variable by accounting for the */
/*  ╚═╝ ┴ ┴└─└─┘└─┘└─┘   impact from other variables    */
/********************************************************/
setup.status.stress = function (amt, tgt = -1, restore = false) {
  //tgt is set as default to -1. calling .status.stress(3); will target PC.
  //restore is default false. it true, isActive function will restore them if stored.
  //first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let result, pc, id, tit, trait; //variable to hold result from isActive
  //if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt == -1) {
    pc = true;
    id = "none";
    //assign object key based on target since we don't know if PC or not.
    trait = "trait";
    tit = State.active.variables.PC; //create tit as reference to correct object
  } else if ("number" == typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; //notice NPC uses core instead of trait
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else if ("string" == typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; //notice NPC uses core instead of trait
    result = setup.isActive(tgt, restore);
    if (result == "stored") {
      let msg = "can't modify stress, NPC isn't active and restore isn't set to true. ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    } else if (result == "nonexist") {
      let msg = "The passed npcid doesn't exist! (stress function) ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    }
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else {
    //we have bad input, meaning we throw an error and return.
    let msg = "Stress function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    //need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim == "[dev]") {
      alert(msg);
    }
    return false;
  }
  //load status !!important!!
  if (pc) {
    setup.statusLoad();
  }
  //now we have the correct N/PC to edit. let's set some default values for ease.
  let stress = tit.status.stress; //returns character's stress, and we can manipulate freely.
  let mod = 0; //start with zero to make reversing sign easier later.
  //this isn't really necessary, but can save time if you're using the same thing a lot.
  const open = tit[trait].op,
    closed = tit[trait].cl,
    intro = tit[trait].intro,
    extro = tit[trait].extro;
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
  if (pc && tit[trait].relaxed == 1) {
    mod -= 0.2;
  } else if (pc && tit[trait].relaxed == -1) {
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
  //time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; //adjust to proper multiplier
  mod = Math.max(0.25, mod); //keep modifier within range
  mod = Math.min(2.5, mod);
  amt = Math.round(amt * mod); //finally adjust amount
  //for cheat
  if (pc && aw.chad.stress && amt >= 0) {
    amt = 0;
  }
  tit.status.stress += amt;
  //check for over or under values
  if (tit.status.stress > 100) {
    if (pc && tit.status.overStress) {
      State.active.variables.flag.badEnd = "stress";
    } else {
      tit.status.overStress = true;
      setup.AW.notify("You are dangerously stressed!","red");
    }
    tit.status.stress = 100 - random(0, 3);
  } else if (tit.status.stress < 0) {
    tit.status.stress = 0;
  }
  if (pc) {
    setup.statusSave();
  }
  if (result == "restored") {
    setup.storeNPC(tgt);
  }
};

/*******************************************/
/* ╔═╗┌┐┌┌─┐┌─┐┬─┐  Alters the N/PC anger  */
/* ╠═╣││││ ┬├┤ ├┬┘  stat by accounting for */
/* ╩ ╩┘└┘└─┘└─┘┴└─  other variables.       */
/*******************************************/
/* This function mirrors the functionality of the stress function */
setup.status.anger = function (amt, tgt = -1, restore = false) {
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let result, pc, id, tit, trait;
  if (tgt == -1) {
    pc = true;
    id = "none";
    trait = "trait";
    setup.statusLoad();
    tit = State.active.variables.PC; //create tit as reference to correct object
  } else if ("number" == typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; //notice NPC uses core instead of trait
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else if ("string" == typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; //notice NPC uses core instead of trait
    result = setup.isActive(tgt, restore);
    if (result == "stored") {
      let msg = "can't modify stress, NPC isn't active and restore isn't set to true. ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    } else if (result == "nonexist") {
      let msg = "The passed npcid doesn't exist! (stress function) ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    }
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else {
    //we have bad input, meaning we throw an error and return.
    let msg = "Stress function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    //need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim == "[dev]") {
      alert(msg);
    }
    return false;
  }
  let anger = tit.status.anger;
  let mod = 0;
  const open = tit[trait].op,
    closed = tit[trait].cl;
  if (tit[trait].bitch == 1) {
    mod += 0.25;
  } else if (tit[trait].bitch == -1) {
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
  //time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; //adjust to proper multiplier
  mod = Math.max(0.25, mod); //keep modifier within range
  mod = Math.min(2.5, mod);
  amt = Math.round(amt * mod); //finally adjust amount
  //for cheat
  if (pc && aw.chad.anger && amt >= 0 && tit.status.anger >= 5) {
    amt = 0;
  }
  tit.status.stress += amt;
  //check for over or under values
  if (tit.status.anger > 10) {
    if (pc && tit.status.overAnger) {
      State.active.variables.flag.badEnd = "anger";
    } else {
      tit.status.overAnger = true;
      if (pc) {
        setup.AW.notify("You are dangerously angry!","red");
      }
    }
    tit.status.anger = 10;
  } else if (tit.status.anger < 0) {
    tit.status.anger = 0;
  }
  if (pc) {
    setup.statusSave();
  }
  if (result == "restored") {
    setup.storeNPC(tgt);
  }
};

/*******************************************/
/* ╦ ╦┌─┐┌─┐┌─┐┬ ┬  Yep, it's another one  */
/* ╠═╣├─┤├─┘├─┘└┬┘  of these things.       */
/* ╩ ╩┴ ┴┴  ┴   ┴                          */
/*******************************************/

setup.status.happy = function (amt, tgt = -1, restore = false) {
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let result, pc, id, tit, trait;
  if (tgt == -1) {
    pc = true;
    id = "none";
    //assign object key based on target since we don't know if PC or not.
    trait = "trait";
    setup.statusLoad();
    tit = State.active.variables.PC; //create tit as reference to correct object
  } else if ("number" == typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; //notice NPC uses core instead of trait
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else if ("string" == typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; //notice NPC uses core instead of trait
    result = setup.isActive(tgt, restore);
    if (result == "stored") {
      let msg = "can't modify happiness, NPC isn't active and restore isn't set to true. ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    } else if (result == "nonexist") {
      let msg = "The passed npcid doesn't exist! (happiness function) ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    }
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else {
    //we have bad input, meaning we throw an error and return.
    let msg = "Happiness function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    //need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim == "[dev]") {
      alert(msg);
    }
    return false;
  }
  let mod = 0;
  const open = tit[trait].op,
    closed = tit[trait].cl,
    intro = tit[trait].intro,
    extro = tit[trait].extro;
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
  if (tit[trait].lowEsteem != 0) {
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
  //time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; //adjust to proper multiplier
  mod = Math.max(0, mod); //keep modifier within range
  mod = Math.min(2.5, mod);
  amt = Math.round(amt * mod); //finally adjust amount
  //for cheat
  if (pc && aw.chad.happy && amt <= 0 && tit.status.happy <= 0) {
    amt = 0;
  }
  tit.status.happy += amt;
  //check for over or under values
  if (tit.status.happy < -9) {
    if (pc && tit.status.overDepress) {
      State.active.variables.flag.badEnd = "depression";
    } else {
      tit.status.overDepress = true;
      if (pc) {
        setup.AW.notify("You are dangerously depressed!","red");
      }
    }
    tit.status.happy = -10 + random(1, 2);
  } else if (tit.status.happy > 10) {
    tit.status.happy = 10;
  }
  if (pc) {
    setup.statusSave();
  }
  if (result == "restored") {
    setup.storeNPC(tgt);
  }
};

/*******************************************/
/* ╔╦╗┬┬─┐┌─┐┌┬┐  Increases the fatigue of */
/*  ║ │├┬┘├┤  ││  the N/PC. Reduces hp if  */
/*  ╩ ┴┴└─└─┘─┴┘  fatigue is too high.     */
/*******************************************/

setup.status.tired = function (amt, tgt = -1, restore = false) {
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let result, pc, id, tit, trait;
  if (tgt == -1) {
    pc = true;
    id = "none";
    setup.statusLoad();
    tit = State.active.variables.PC; //create tit as reference to correct object
  } else if ("number" == typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else if ("string" == typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    result = setup.isActive(tgt, restore);
    if (result == "stored") {
      let msg = "can't modify fatigue, NPC isn't active and restore isn't set to true. ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    } else if (result == "nonexist") {
      let msg = "The passed npcid doesn't exist! (fatigue function) ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    }
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else {
    //we have bad input, meaning we throw an error and return.
    let msg = "fatigue function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    //need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim == "[dev]") {
      alert(msg);
    }
    return false;
  }
  let mod = 0;
  mod += tit.status.disease.length > 1 ? 0.5 : 0;
  mod += tit.status.withdrawl ? 0.3 : 0;
  /******************************/
  /* SITUATION TAGS PLACEHOLDER */
  /******************************/
  //time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; //adjust to proper multiplier
  mod = Math.max(0.3, mod); //keep modifier within range
  mod = Math.min(2, mod);
  amt = Math.round(amt * mod); //finally adjust amount
  //for cheat
  if (pc && aw.chad.tired && amt > 0 && tit.status.fatigue >= 7) {
    amt = 0;
  }
  tit.status.fatigue += amt;
  //check for over or under values
  if (tit.status.fatigue >= 10) {
    if (pc) {
      setup.AW.notify("You are extremely tired.","red");
    }
    tit.status.fatigue = 10;
    tit.status.health -= random(1, 5);
  } else if (tit.status.fatigue < 0) {
    tit.status.fatigue = 0;
  }
  if (pc) {
    setup.statusSave();
  }
  if (result == "restored") {
    setup.storeNPC(tgt);
  }
};

/**********************************************/
/* ╔═╗┬─┐┌─┐┬ ┬┌─┐┌─┐┬    Adds arousal to     */
/* ╠═╣├┬┘│ ││ │└─┐├─┤│    N/PC based on basic */
/* ╩ ╩┴└─└─┘└─┘└─┘┴ ┴┴─┘  characteristics.    */
/**********************************************/
setup.status.arousal = function (amt, tgt = -1, restore = false) {
  //tgt is set as default to -1. calling .status.stress(3); will target PC.
  //restore is default false. it true, isActive function will restore them if stored.
  //first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  const coded = new RegExp(/(X|x)[0-9]{1,2}$/);
  let result, pc, id, tit, trait, rolls, arousal, prob = 30,
    cunt = 0; //variable to hold result from isActive
  //if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt == -1) {
    pc = true;
    id = "none";
    //assign object key based on target since we don't know if PC or not.
    trait = "trait";
    setup.statusLoad();
    tit = State.active.variables.PC; //create tit as reference to correct object
  } else if ("number" == typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; //notice NPC uses core instead of trait
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else if ("string" == typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; //notice NPC uses core instead of trait
    result = setup.isActive(tgt, restore);
    if (result == "stored") {
      let msg = "can't modify arousal, NPC isn't active and restore isn't set to true. ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    } else if (result == "nonexist") {
      let msg = "The passed npcid doesn't exist! (arouse function) ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    }
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else {
    //we have bad input, meaning we throw an error and return.
    let msg = "Arouse function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    //need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim == "[dev]") {
      alert(msg);
    }
    return false;
  }
  //Time to check for optional value that allow for reset
  if (amt === "X" || amt === "x") { //entering X as amount zeros arousal
    tit.status.arousal = 0;
  } else if (coded.test(amt)) { //entering X# as amount sets to that amount
    let v = Number(amt.slice(1));
    v = Math.max(0, Math.min(15, v));
    tit.status.arousal = v;
  } else { //proceed normally
    arousal = tit.status.arousal;
    let mod = 0;
    rolls = 0; //start with zero to make reversing sign easier later.
    const open = tit[trait].op,
      closed = tit[trait].cl,
      extro = tit[trait].extro,
      libido = tit[trait].libido;
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
      0.8
    ];
    mod += libmod[libido];
    /******************************/
    /* TAG PLACEHOLDER # 1        */
    /******************************/
    //time for sign flip
    if (amt < 0) {
      mod *= -1;
    }
    mod += 1; //adjust to proper multiplier
    mod = Math.max(0.1, mod);
    rolls = Math.max(1, Math.round(3 * amt * mod)); //determine number of rolls
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
    } else { //for subtracting from arousal, negative amt
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
    //first set up maximum arousal
    let max = 10 + Math.ceil((1 + libido) / 2);
    let top;
    for (let i = 0; i < rolls; i++) {
      if(amt > 0){
        top = Math.round((Math.max(0,(tit.status.arousal + cunt - 3)) / max)*500) + 100;
      }else{
        top = (tit.status.arousal <= (max/2)) ? (150) : 80;
      }
      let n = random(1, top);
      if (n <= prob) {
        cunt++;
      }
    }
    if (amt < 0) { //flip final amount if subtracting
      cunt *= -1;
    } else if (pc && tit.kink.shame) {
      if (tit.status.arousal + cunt > 2) {
        tit.status.stress += cunt * random(1, 3);
      }
    }
    tit.status.arousal += cunt;
    //check for over or under values... more complicated!
    if (pc && tit.kink.slut) {
      max = 15;
    }
    if (tit.status.arousal >= (max - 2)) {
      if (pc) {
        setup.notify("You are dangerously aroused!","bad");
        tit.status.bimbo += random(0, 2) + random(0, 2);
        if (tit.status.bimbo > 100) {
          tit.status.bimbo = 100;
        }
      } else {
        tit.core.bimbo += random(3, 8);
        if (tit.core.bimbo > 100) {
          tit.core.bimbo = 100;
        }
      }
    }
    if (tit.status.arousal > max) {
      tit.status.arousal = max;
      if (pc && random(1, 4) == 1) {
        tit.status.mindbreak = true;
      }
    }
  }
  if (State.variables.debu){
    let ms = `Arousal details- amt:${amt}, rolls:${rolls} @${prob}%, added:${cunt}, start:${arousal}, final:` + tit.status.arousal + ", tgt:";
    ms += pc ? "PC" : "NPC";
    aw.con.info(ms);
  }
  if (pc) {
    setup.statusSave();
  }
  if (result == "restored") {
    setup.storeNPC(tgt);
  }
};

/*
<<elseif $args[0] == "N">>
	<<if ndef $args[1]>>
		<<set $AW.error += ", arousal setting error - no args sent to function in passage: ">>
		<<set $AW.error += passage()>>
		<<set $PC.status.arousal = 0>>
	<<else>>
		<<switch $args[1]>>
		<<case 1>>
			<<set $PC.status.arousal = -1>>
		<<case 2>>
			<<set $PC.status.arousal = -2>>
		<<case 3>>
			<<set $PC.status.arousal = -3>>
		<<case 4>>
			<<set $PC.status.arousal = -4>>
		<<case 5>>
			<<set $PC.status.arousal = -5>>
		<<case 6>>
			<<set $PC.status.arousal = -6>>
		<<case default>>
			<<set $PC.status.arousal = -1>>
		<</switch>>
	<</if>>
	<<set $PC.status.arousal += $args[0]>>
	<<if $PC.kink.hyperSlut>>
		<<set $PC.status.arousal += 2>>
	<<elseif $PC.kink.superSlut>>
		<<set $PC.status.arousal += 1>>
	<<elseif $PC.kink.slut>>
		<<set $PC.status.arousal += either(0,0,1)>>
	<</if>>
	<<if $PC.trait.libido > 7>>
		<<set $PC.status.arousal += 1>>
	<</if>>
	<<if $PC.status.arousal < -6>>
		<<set $PC.status.arousal = -6>>
	<<elseif $PC.status.arousal > 0>>
		<<set $PC.status.arousal = 0>>
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
setup.status.satisfact = function (amt, tgt = -1, restore = false) {
  //tgt is set as default to -1. calling .status.stress(3); will target PC.
  //restore is default false. it true, isActive function will restore them if stored.
  //first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let result, pc, id, tit, trait; //variable to hold result from isActive
  //if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt == -1) {
    pc = true;
    id = "none";
    //assign object key based on target since we don't know if PC or not.
    trait = "trait";
    tit = State.active.variables.PC; //create tit as reference to correct object
  } else if ("number" == typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    pc = false;
    id = State.active.variables.activeNPC[tgt];
    trait = "core"; //notice NPC uses core instead of trait
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else if ("string" == typeof tgt && pattern.test(tgt)) {
    pc = false;
    id = tgt;
    trait = "core"; //notice NPC uses core instead of trait
    result = setup.isActive(tgt, restore);
    if (result == "stored") {
      let msg = "can't modify satisfaction, NPC isn't active and restore arg isn't set to true. ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    } else if (result == "nonexist") {
      let msg = "The passed npcid doesn't exist! (satisfaction function) ID: " + id;
      aw.con.warn(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    }
    tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else {
    //we have bad input, meaning we throw an error and return.
    let msg = "Satisfaction function given invalid target, either not active, bad index, or bad id.";
    aw.con.warn(msg);
    //need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim == "[dev]") {
      alert(msg);
    }
    return false;
  }
  if(!pc || !aw.chad.satisfy){
    //load status !!important!!
    if (pc) {
      setup.statusLoad();
    }
    //now we have the correct N/PC to edit. let's set some default values for ease.
    let stress = tit.status.stress; //returns character's stress, and we can manipulate freely.
    let mod = 0; //start with zero to make reversing sign easier later.
    //this isn't really necessary, but can save time if you're using the same thing a lot.
    const open = tit[trait].op,
      closed = tit[trait].cl,
      intro = tit[trait].intro,
      extro = tit[trait].extro;
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
      if(tit.kink.hyperSlut){
        mod -= 0.8;
      }else if(tit.kink.superSlut){
        mod -= 0.5;
      }else{
        mod -= 0.3;
      }
    }
    if (pc){
      if(tit[trait].lowEsteem == 1){
        mod += 0.1;
      }
      if (tit[trait].picky == 1){
        mod -= 0.15;
      }else if(tit[trait].picky == -1){
        mod += 0.15;
      }
      if (tit.kink.fap){
        mod -= 0.1;
      }
      if (tit.kink.hard){
        mod -= 0.25;
      }
      if (tit.kink.shame){
        mod -= 0.2;
      }
    }
    if (tit[trait].morality < 25){
      mod -= 0.2;
    }else if(tit[trait].morality < 50){
      mod -= 0.1;
    }
    if (tit[trait].perversion >= 90 || tit[trait].bimbo >= 90){
      mod -= 0.6;
    }else if(tit[trait].perversion >= 60 || tit[trait].bimbo >= 60){
      mod -= 0.4;
    }else if(tit[trait].perversion >= 30 || tit[trait].bimbo >= 30){
      mod -= 0.2;
    }
    /******************************/
    /* SITUATION TAGS PLACEHOLDER */
    /******************************/
    //time for sign flip
    let r,a = 1;
    if (amt < 0) {
      mod *= -1;
      a = -1;
    }
    mod += 1; //adjust to proper multiplier
    mod = Math.max(0.05, mod); //keep modifier within range
    mod = Math.min(2, mod);
    if(mod < 1){
      let odds = Math.floor(mod * 100);
      let nRoll = Math.abs(amt);
      for(let i = 0; i < nRoll; i++){
        r = random(0,99);
        if (r < odds){
          tit.status.satisfaction += a;
        }
      }
    }else{
      tit.status.satisfaction += amt;
      let odds = Math.floor((mod-1) * 100);
      let nRoll = Math.abs(amt);
      for(let i = 0; i < nRoll; i++){
        r = random(0,99);
        if (r < odds){
          tit.status.satisfaction += a;
        }
      }
    }
  }
  //check for over or under values
  if (tit.status.satisfaction > 100){
    tit.status.satisfaction = 100;
  }else if (tit.status.satisfaction <= 0) {
    tit.status.underSatisfy += Math.abs(tit.status.satisfaction);
    tit.status.satisfaction = random(5,15);
    let x = 4 + Math.floor(tit[trait].libido / 2);
    x += (pc && tit.kink.slut) ? 1 : 0;
    if(x >= random(1,10)){
      tit.status.need += 1;
      if (pc && tit.status.need > 4) {
        let o = random(0,4);
        if(o === 0){
          State.active.variables.flag.badEnd = "need";
        }
      } else if(tit.status.need > 3) {
        let o = random(0,20);
        if(o === 0){
          State.active.variables.flag.badEnd = "need";
        }
      } else {
        setup.AW.notify("Your sexual need has increased!","red");
      }
    }else{
      setup.AW.notify("Your sexual satisfaction is very low!","orange");
    }
  }
  if (pc) {
    setup.statusSave();
  }
  if (result == "restored") {
    setup.storeNPC(tgt);
  }
};
