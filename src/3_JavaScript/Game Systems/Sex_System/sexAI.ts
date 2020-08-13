



// TODO - AI
// selects the NPCs action for the turn
setup.sex.npcActionSelect = function(ind: number): [string|number, string] {
  // const t1 = performance.now();
  // aw.con.info(`setup.sex.npcActionSelect is Starting`); // TODO Remove eventually
  const sex = ↂ.sex;
  const pos = aw.sexPos[sex.pos];
  const npc = sex.npc[ind];
  const actKeys = Object.keys(aw.sexActN);
  const actLeng = actKeys.length;
  const posKeys: string[] = Object.keys(aw.sexPos);
  const posLeng = posKeys.length;
  const pcAct = sex.pcAct;
  const list = {
    sex: [],
    posit: [],
    oral: [],
    makeout: [],
    oralPC: [],
    all: []
  } as {
    [propName: string]: string[];
  };
  let odds;
  let type;
  let grp;
  let oddSet;
  if (sex.pcWetness < 5) {
    // no sexstart
    oddSet = {
      notSex: {
        makeout: 79,
        posit: 5,
        oral: 8,
      },
      oralNPC: {
        oralNPC: 94,
        oral: 5,
      },
      oralPC: {
        oralPC: 80,
        makeout: 5,
      },
      sex: {
        gen: 50,
        posit: 2,
        makeout: 38,
        speed: 10,
      },
    };
  } else {
    oddSet = {
      notSex: {
        makeout: 79,
        posit: 5,
        oral: 8,
        sex: 3,
      },
      oralNPC: {
        oralNPC: 94,
        oral: 5,
        sex: 1,
      },
      oralPC: {
        oralPC: 80,
        sex: 15,
        makeout: 5,
      },
      sex: {
        gen: 50,
        posit: 2,
        makeout: 38,
        speed: 10,
      },
    };
  }
  // determining which set of odds to use
  if (pos.sex) {
    odds = clone(oddSet.sex);
    grp = "sex";
  } else if (pos.cat === "makeout") {
    odds = clone(oddSet.notSex);
    grp = "makeout";
  } else if (pos.cat === "oralNPC") {
    odds = clone(oddSet.oralNPC);
    grp = "oralNPC";
  } else if (pos.cat === "oralPC") {
    odds = clone(oddSet.oralPC);
    grp = "oralPC";
  } else {
    aw.con.warn(`Position Category incorrect: ${pos.cat}`);
    odds = {make: 100};
  }

  // populate list object with valid actions
  // iterate through positions to see if position is valid for change position action
  for (let i = 0; i < posLeng; i++) {
    if (aw.sexPos[posKeys[i]].sex && aw.sexPos[posKeys[i]].allowed === true && aw.sexPos[posKeys[i]].basic === pos.basic) {
      list.sex.push(posKeys[i]);
    }
    if (!aw.sexPos[posKeys[i]].sex && aw.sexPos[posKeys[i]].allowed === true) {
      list.posit.push(posKeys[i]);
    }
    if (aw.sexPos[posKeys[i]].allowed === true && !aw.sexPos[posKeys[i]].sex && aw.sexPos[posKeys[i]].cat === "oralPC") {
      list.oral.push(posKeys[i]);
    }
  }
  // iterate thru npc actions
  for (let i = 0; i < actLeng; i++) {
    if (aw.sexActN[actKeys[i]].allowed === true && (aw.sexActN[actKeys[i]].cat === "makeout" || aw.sexActN[actKeys[i]].cat === "talk")) {
      list.makeout.push(actKeys[i]);
    }
    if (aw.sexActN[actKeys[i]].allowed === true && aw.sexActN[actKeys[i]].cat === "oral") {
      list.oralPC.push(actKeys[i]);
    }
    if (aw.sexActN[actKeys[i]].allowed === true) {
      list.all.push(actKeys[i]);
    }
  }
  // randomize the action/pos-change category
  const n = Object.keys(odds);
  let tot = 0;
  let cat = "error";
  // delete categories that don't have any valid actions
  for (let i = n.length - 1; i >= 0; i--) {
    if (n[i] !== "gen") {
      if (n[i] === "oralNPC" && list.makeout.length < 1) {
        n.splice(i, 1);
      } else if (n[i] !== "oralNPC" && list[n[i]] != null && list[n[i]].length < 1) {
        n.splice(i, 1);
      }
    }
  }
  // total up the odds numbers for each category
  for (let i = 0, c = n.length; i < c; i++) {
    tot += odds[n[i]];
  }
  // gen a random number that is within that range
  let r = random(0, tot);
  // cycle through odds to compare to random number
  for (let i = 0, c = n.length; i < c; i++) {
    if (r < odds[n[i]]) {
      cat = n[i];
      break;
    } else { // if not less than, need to subtract that odds item from r
      r -= odds[n[i]];
    }
  }
  // set the action group for randomization based on choice above
  let bb = "all";
  if (cat === "gen") {
    return [0, "nothing"];
  } else if (cat === "speed") {
    return [random(1, 4), "speed"];
  } else if (cat === "sex" || (cat === "posit" && grp === "sex")) {
    bb = "sex";
    type = "pos";
  } else if (cat === "posit") {
    bb = "posit";
    type = "pos";
  } else if (cat === "oral") {
    bb = "oral";
    type = "pos";
  } else if (cat === "makeout" || cat === "oralNPC") {
    bb = "makeout";
    type = "act";
  } else if (cat === "oralPC") {
    bb = "oralPC"
    type = "act";
  } else {
    aw.con.warn("Somehow didn't pick valid act group for NPC...");
    bb = "all";
    type = "act";
  }
  // actually randomize specific action
  const u = list[bb].length - 1;
  const uu = random(0, u);
  let result = list[bb][uu];
  aw.con.info(`the result of NPC action selection is: ${result}. List length is: ${u}. cat = ${cat}, type = ${type}, grp = ${grp}.`);
  // failsafe
  if (result == null) {
    aw.con.warn(`for some reason NPC action selection resulted in an undefined action. replacing with default complementBody`);
    result = "complementBody";
    type = "act";
  }
  // const t2 = performance.now();
  // aw.con.info(`setup.sex.npcActionSelect is finished, chose Result: ${result}, Type: ${type}. it took ${Math.round(t2 - t1)}ms.`); // TODO Remove eventually
  return [result, type];
};

