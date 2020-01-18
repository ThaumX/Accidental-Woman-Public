/*
    ███████╗███████╗██╗  ██╗     ███╗   ███╗███████╗████████╗██╗  ██╗
    ██╔════╝██╔════╝╚██╗██╔╝     ████╗ ████║██╔════╝╚══██╔══╝██║  ██║
    ███████╗█████╗   ╚███╔╝█████╗██╔████╔██║█████╗     ██║   ███████║
    ╚════██║██╔══╝   ██╔██╗╚════╝██║╚██╔╝██║██╔══╝     ██║   ██╔══██║
    ███████║███████╗██╔╝ ██╗     ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║
    ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
*/
/*THIS FILE CONTAINS FUNCTIONS USED DURING SEX SCENES BY ACTIONS, POSITIONS, ETC*/

interface setupSex {
  defineAct: () => void ;
  defineActN: () => void ;
  sexActNList: string[];
  sexActList: string[];
  main: (act: SexAct | SexPos, { type, ret, arg }: { type?: "act" | "pos", ret?: string, arg?: string }) => void;
  library: (key: string, code: string, chapter?: string) => string ;
  npcActionSelect: (ind: number) => [string | number, string] ;
  modifier: (tgt, amt: number, sKink: kink[], sTrait: trait[], wKink: kink[], wTrait: trait[]) => number ;
  refresh: () => void ;
  effect: ({ pleasure, arousal, wetness, cum, satisfy, strong, weak}: sexEffectObject, target?: number) => boolean[];
  posEffect: ({ pleasure, arousal, wetness, strong, weak }: sexPositionEffectObject, char?: number) => number
  ;
  orgasmPC: (act: any, type?: "playerAction" | "npcAction" | "position" | "none") => void;
  orgasmNPC: (ind: number, act: SexAct | SexPos | "none", type?: "playerAction" | "npcAction" | "position" | "none") => void ;
  cumRiskText: (base: string, ind: number) => void ;
  cum: (ind: number, type: "playerAction" | "npcAction" | "position") => string ;
  cumCondIncrement: (val: string, vol: number) => string ;
  changePosition: (key: string) => void ;
  changePositionAct: (key: string, argu?: any) => void ;
  playerPosition: () => string ;
  sexAction: (key: string, argu?: any) => void ;
  changePositionNPC: (key: string, ind?: number) => void ;
  sexActionNPC: (key: string, ind?: number) => boolean ;
  dumbCount: number;
  actionButtonPrinter: () => void ;
  printText: { touch: string; self: string; kiss: string; speak: string; kink: string; move: string; position: string; item: string; other: string; hover: string };
  badAction: (num: number) => twee ;
  startSex: (...args: string[]) => void ;
  close: () => void ;
  valid: (partArr: any, tar: any, thePos: string) => boolean ;
  partRef: (part: string) => [string, string] | false ;
  validNPC: (partArr: any, tar: any, thePos: string) => boolean ;
  partDist: (part: string) => number ;
  statusBars: () => twee ;
  occupyPrinter: (i: number) => string ;
  wetIcon: (wet: number) => twee ;
  characterButtons: () => twee ;
  click: (num: "PC" | number) => void ;
  characterTargets: () => twee ;
  target: (ind: number) => void ;
  equipCondom: (type: string) => void ;
  definePos: () => void;
  sexPosList: string[];
  prebuild: () => void;
  hovererer: (ids: string[]) => void;
  domDelay: number;
  popup: (content: string) => void;
  popupKill: () => void;
}


if (setup.sex === null || setup.sex === undefined) {
  setup.sex = {} as setupSex;
}

setup.sex.domDelay = 20;

// primary function - runs each "turn" of the sex scene
setup.sex.main = function(act: SexAct|SexPos, {
  type = "act",
  ret = "none",
  arg = "none",
}: {type: "act"|"pos", ret: string, arg: string}): void {
  const t1 = performance.now();
  // aw.con.info(`setup.sex.main has been started!`); // TODO Remove eventually
  if ("object" !== typeof act) {
    aw.con.warn(`sex.main ran without appropriate act/pos object!`);
    // aw.con.obj(act, "sex.main object argument.");
    return;
  }
  ↂ.sex.cumInfo = [];
  ↂ.sex.pcOutput = "none";
  ↂ.sex.npcOutput = [];
  ↂ.sex.orgText = {};
  let org;
  let porg = "none";
  if (type === "act") {
    // aw.con.info(`setup.sex.main proceeding for action`); // TODO Remove eventually
    try {
      org = setup.sex.effect((act as SexAct).effect);
    } catch (e) {
      aw.con.warn(`Error with main -> setup.sex.effect. ${e.name}: ${e.message}`);
      org = [false, false];
    }
    if (org[0]) {
      try {
        setup.sex.orgasmPC(act, "playerAction");
      } catch (e) {
        aw.con.warn(`Error with main (pAction) -> setup.sex.orgasmPC. ${e.name}: ${e.message}`);
      }
      porg = "pAction";
    }
    if (org[1]) {
      try {
        setup.sex.orgasmNPC(ↂ.sex.target, act, "playerAction");
      } catch (e) {
        aw.con.warn(`Error with main (pAction) -> setup.sex.orgasmNPC. ${e.name}: ${e.message}`);
      }
    }
    // set action text for PC
    ↂ.sex.pcOutput = setup.sex.library(ↂ.sex.pcAct, "A");
  } else if (type === "pos") {
    // aw.con.info(`setup.sex.main action is position change.`); // TODO Remove eventually
    ↂ.sex.pcOutput = setup.sex.playerPosition();
  }
  // run position effects in loop for all occupants
  // setup.sex.posEffect
  try {
    org = setup.sex.posEffect(aw.sexPos[ↂ.sex.pos].pos[0].effect, -1);
  } catch (e) {
    aw.con.warn(`Error wih main -> setup.sex.posEffect. ${e.name}: ${e.message}.`);
  }
  if (org === -1 && porg === "none") {
    try {
      setup.sex.orgasmPC("none", "position");
    } catch (e) {
      aw.con.warn(`Error with main (position) -> setup.sex.orgasmPC. ${e.name}: ${e.message}.`);
    }
    porg = "position";
  }
  const npcOrg: number[] = [];
  let y: number;
  try {
    y = setup.sex.posEffect(aw.sexPos[ↂ.sex.pos].pos[1].effect, 0);
  } catch (e) {
    aw.con.warn(`Error with main -> setup.sex.posEffect. ${e.name}: ${e.message}.`);
    y = -1;
  }
  if (y > -1) {
    npcOrg.push(y); // y=npc index
    try {
    setup.sex.orgasmNPC(y, "none", "position");
    } catch (e) {
      aw.con.warn(`Error with main (position) -> setup.sex.orgasmNPC. ${e.name}: ${e.message}.`);
    }
  }
  /*for (let i = 1, c = aw.sexPos[ↂ.sex.pos].pos.length; i < c; i++) {
    for (let j = 0, d = ↂ.sex.activeNPC.length; j < d; j++) {
      if (i === ↂ.sex.inPosition[j]) {
        let y = setup.sex.posEffect(aw.sexPos[ↂ.sex.pos].pos[1].effect, j);
        if (y) {
          npcOrg.push[y]; //y=npc index
          setup.sex.orgasmNPC(y, "none", "position");
        }
      }
    }
  }*/
  // aw.con.info(`setup.sex.main checking condom break`); // TODO Remove eventually
  if (ↂ.sex.npcBC[0].condom.worn) {
    if (ↂ.sex.npcBC[0].condom.health >= 25 && aw.sexPos[ↂ.sex.pos].sex) {
      if (random(1, 5) === 1) {
        if (random(1, 3) === 1) {
          ↂ.sex.encounter[2] = setup.sex.library("condom.breakEvent", "N");
        }
        ↂ.sex.npcBC[0].condom.break = true;
      }
    }
  }
  // temporary insertion point
  let insertRes;
  if (aw.sexPos[ↂ.sex.pos].sex) {
    const dickVal = Math.round((ↂ.T.body.cock.girth / 10) * 2.5 + (ↂ.sex.speed / 4));
    ↂ.pc.status.wetness = ↂ.sex.pcWetness;
    if (aw.sexPos[ↂ.sex.pos].anal) {
      insertRes = ↂ.pc.body.asshole.insert(dickVal);
      setup.devirgin("A");
    } else {
      insertRes = ↂ.pc.body.pussy.insert(dickVal);
      setup.devirgin("P");
    }
  }
  // determine npc action
  // aw.con.info(`setup.sex.main squarepegging NPC action`); // TODO Remove eventually
  let npcAction;
  try {
    npcAction = setup.sex.npcActionSelect(0); // TODO set correct npc
  } catch (e) {
    aw.con.warn(`Error with main -> setup.sex.npcActionSelect. ${e.name}: ${e.message}.`);
  }
  // set some speed/thrusting based text for sex positions.
  if (npcAction[1] === "nothing") {
    // NPC goes with it
    ↂ.sex.npcOutput.push(setup.sex.library("fuckThrustText", "N"));
  } else if (npcAction[1] === "speed") {
    if (npcAction[0] > 1) {
      ↂ.sex.npcOutput.push("<<= ↂ.T.main.name>> picks up the pace, pounding your <<p pussy.n>> faster than before.");
      ↂ.sex.speed += 1;
      if (ↂ.sex.speed > 8) {
        ↂ.sex.speed = 8;
      }
    } else {
      ↂ.sex.npcOutput.push("<<= ↂ.T.main.name>> slows down a little, fucking your <<p pussy.n>> at a more leisurely pace.");
      ↂ.sex.speed -= 1;
      if (ↂ.sex.speed < 1) {
        ↂ.sex.speed = 1;
      }
    }
  } else if (npcAction[1] === "act") {
    let nporg;
    try {
      nporg = setup.sex.sexActionNPC(npcAction[0] as string, 0);
    } catch (e) {
      aw.con.warn(`Error with main -> setup.sex.sexActionNPC. ${e.name}: ${e.message}.`);
    }
    if (nporg && porg === "none") {
      porg = "npcAction";
    }
  } else if (npcAction[1] === "pos") {
    try {
      setup.sex.changePositionNPC(npcAction[0] as string, 0);
    } catch (e) {
      aw.con.warn(`Error with main -> setup.sex.changePositionNPC. ${e.name}: ${e.message}.`);
    }
  }
  // npc action results
  // aw.con.info(`setup.sex.main setting orgasm text/location if needed`); // TODO Remove eventually
  // set text
  if (porg === "pAction") {
    ↂ.sex.orgText.pca = setup.sex.library("pcOrgasm", "O");
  } else if (porg === "position" || porg === "npcAction") {
    ↂ.sex.orgText.pcb = setup.sex.library("pcOrgasm", "O");
  } else if (porg !== "none") {
    ↂ.sex.orgText.pca = setup.sex.library("pcOrgasm", "O");
  }
  // aw.con.info(`setup.sex.main housekeeping actions`); // TODO Remove eventually
  const wm = 10 + (ↂ.pc.body.pussy.wetness * 2);
  if (ↂ.sex.pcWetness > wm) {
    ↂ.sex.pcWetness = wm;
  }
  ↂ.sex.turns += 1;
  aw.S();
  const t = random(2, 3) + random(0, 1);
  ↂ.sex.timer += t;
  $("#actTarget").trigger("submit");
  $("#actTarget").off();
  setup.sex.refresh();
  const t2 = performance.now();
  aw.con.info(`setup.sex.main is finished! it took ${Math.round(t2 - t1)}ms.`);
  $("#sexSceneLoadingImage").addClass("hideIt");
  ↂ.toggleLoading = false;
};

// looks up library text for actions/position changes
setup.sex.library = function(key: string, code: string, chapter: string = "standard"): string {
  // aw.con.info(`setup.sex.library is starting`); // TODO Remove eventually
  let output = "PC none";
  try {
    switch (code) {
      case "A":
        output = setup.library.callSexAct(key, chapter);
        break;
      case "P":
        output = setup.library.callSexPos(key, chapter);
        break;
      case "N":
        output = setup.library.callSexActN(key, chapter);
        break;
      case "O":
        output = setup.library.callOrgasm(key, chapter);
        break;
      default:
        output = `[ERROR: code ${code} sent to sex.library function (key:${key}).]`;
        break;
    }
    if (output === null) {
      aw.con.warn(`Failed at retrieving library text from book ${key}, chapter ${chapter}.`);
      output = `A problem occurred, failed at retrieving library text from book ${key}, chapter ${chapter}.`;
    }
  } catch (e) {
    aw.con.warn(`Failed at retrieving library text from book ${key}, chapter ${chapter}. Error: ${e.name}, ${e.message}`);
    output = `An error occurred while retrieving library text from book ${key}, chapter ${chapter}. Error: ${e.name}, ${e.message}`;
  }
  // aw.con.info(`setup.sex.library returning output.`); // TODO Remove eventually
  return output;
};

// TODO - AI
// selects the NPCs action for the turn
setup.sex.npcActionSelect = function(ind: number): [string|number, string] {
  const t1 = performance.now();
  // aw.con.info(`setup.sex.npcActionSelect is Starting`); // TODO Remove eventually
  const sex = ↂ.sex;
  const pos = aw.sexPos[sex.pos];
  const npc = sex.npc[ind];
  const actKeys = Object.keys(aw.sexActN);
  const actLeng = actKeys.length;
  const posKeys: string[] = Object.keys(aw.sexPos);
  const posLeng = posKeys.length;
  const pcAct = sex.pcAct;
  const list: string[] = [];
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
  // aw.con.info(`Possible actions (${actLeng}): ${actKeys}`);
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
  const n = Object.keys(odds);
  let tot = 0;
  let cat = "error";
  for (let i = 0, c = n.length; i < c; i++) {
    tot += odds[n[i]];
  }
  const r = random(0, tot);
  for (let i = 0, c = n.length; i < c; i++) {
    if (r < odds[n[i]]) {
      cat = n[i];
    }
  }
  if (cat === "gen") {
    return [0, "nothing"];
  } else if (cat === "speed") {
    return [random(1, 4), "speed"];
  } else if (cat === "sex" || (cat === "posit" && grp === "sex")) {
    for (let i = 0; i < posLeng; i++) {
      if (aw.sexPos[posKeys[i]].sex && aw.sexPos[posKeys[i]].allowed && aw.sexPos[posKeys[i]].basic === pos.basic) {
        list.push(posKeys[i]);
      }
    }
    type = "pos";
  } else if (cat === "posit") {
    for (let i = 0; i < posLeng; i++) {
      if (!aw.sexPos[posKeys[i]].sex && aw.sexPos[posKeys[i]].allowed) {
        list.push(posKeys[i]);
      }
    }
    type = "pos";
  } else if (cat === "oral") {
    for (let i = 0; i < posLeng; i++) {
      if (aw.sexPos[posKeys[i]].allowed && !aw.sexPos[posKeys[i]].sex && aw.sexPos[posKeys[i]].cat === "oralPC") {
        list.push(posKeys[i]);
      }
    }
    type = "pos";
  } else if (cat === "makeout" || cat === "oralNPC") {
    for (let i = 0; i < actLeng; i++) {
      if (aw.sexActN[actKeys[i]].allowed && (aw.sexActN[actKeys[i]].cat === "makeout" || aw.sexActN[actKeys[i]].cat === "talk")) {
        list.push(actKeys[i]);
      } else {
        // aw.con.info(`act rejected (makeout): ${actKeys[i]}`);
      }
    }
    type = "act";
  } else if (cat === "oralPC") {
    for (let i = 0; i < actLeng; i++) {
      if (aw.sexActN[actKeys[i]].allowed && aw.sexActN[actKeys[i]].cat === "oral") {
        list.push(actKeys[i]);
      } else {
        // aw.con.info(`act rejected (oralPC): ${actKeys[i]}`);
      }
    }
    type = "act";
  } else {
    aw.con.warn("no appropriate act group for NPC...");
    for (let i = 0; i < actLeng; i++) {
      if (aw.sexActN[actKeys[i]].allowed) {
        list.push(actKeys[i]);
      } else {
        // aw.con.info(`act rejected: ${actKeys[i]}`);
      }
    }
    type = "act";
  }
  const u = list.length - 1;
  const uu = random(0, u);
  let result = list[uu];
  aw.con.info(`the result of NPC action selection is: ${result}. List length is: ${u}. cat = ${cat}, type = ${type}, grp = ${grp}.`);
  if (result === undefined) {
    aw.con.warn(`for some reason NPC action selection resulted in an undefined action. replacing with default complementBody`);
    result = "complementBody";
    type = "act";
  }
  const t2 = performance.now();
  aw.con.info(`setup.sex.npcActionSelect is finished, chose Result: ${result}, Type: ${type}. it took ${Math.round(t2 - t1)}ms.`); // TODO Remove eventually
  return [result, type];
};

// calculates basic modifier based on character traits & kinks
setup.sex.modifier = function(tgt, amt: number, sKink: kink[], sTrait: trait[], wKink: kink[], wTrait: trait[]): number {
  // aw.con.obj(tgt, `setup.sex.modifier tgt argument is starting with tgt arg:`);
  let sCount = 0;
  let wCount = 0;
  if (tgt.kink != null && tgt.kink !== undefined) {
    for (let i = 0, c = sKink.length; i < c; i++) {
      if (sKink[i] !== "none") {
        if (tgt.kink[sKink[i]]) {
          sCount += 1;
        }
      }
    }
  } else {
    aw.con.warn(`setup.sex.modifier: tgt.kink == null`);
  }
  if (tgt.trait != null && tgt.trait !== undefined) {
    for (let i = 0, c = sTrait.length; i < c; i++) {
      let x = false;
      let t = sTrait[i];
      if (t !== "none") {
        if (t.slice(0, 1) === "-") {
          x = true;
          t = sTrait[i].slice(1) as trait;
        }
        if (tgt.trait[t] === 1 && !x) {
          sCount += 1;
        } else if (tgt.trait[t] === -1 && x) {
          sCount += 1;
        }
      }
    }
  } else {
    aw.con.warn(`setup.sex.modifier tgt.trait == null`);
  }
  if (tgt.kink != null && tgt.kink !== undefined) {
    for (let i = 0, c = wKink.length; i < c; i++) {
      if (wKink[i] !== "none") {
        if (tgt.kink[wKink[i]]) {
          wCount += 1;
        }
      }
    }
  }
  if (tgt.trait != null && tgt.trait !== undefined) {
    for (let i = 0, c = wTrait.length; i < c; i++) {
      let x = false;
      let t = wTrait[i];
      if (t !== "none") {
        if (t.slice(0, 1) === "-") {
          x = true;
          t = wTrait[i].slice(1) as trait;
        }
        if (tgt.trait[t] === 1 && !x) {
          wCount += 1;
        } else if (tgt.trait[t] === -1 && x) {
          wCount += 1;
        }
      }
    }
  }
  for (let i = 0; i < wCount; i++) {
    amt *= 0.8;
  }
  for (let i = 0; i < sCount; i++) {
    amt *= 1.15;
  }
  amt = Math.round(amt);
  // aw.con.info(`setup.sex.modifier is returning amt ${amt}.`); // TODO Remove eventually
  return amt;
};

// refreshes the display w/o passage transition.
setup.sex.refresh = function(): void {
  const t1 = performance.now();
  aw.replace("#sexInfoDisp", "<<include [[SexSceneInfoDisplay]]>>");
  const t2 = performance.now();
  // TODO change how often the action bar should actually be replaced (pos change only?)
  aw.replace("#sexActionBarMain", "<<include [[SexSceneActionBarContents]]>>");
  const t3 = performance.now()
  aw.replace("#sexMainShitter", "<<include [[SexSceneTextDisplay]]>>");
  const t4 = performance.now();
  aw.con.info(`Sex Display Refreshed! [setup.sex.refresh] Total Time: ${Math.round(t4 - t1)}ms. #sexInfoDisp: ${Math.round(t2 - t1)}ms. #sexActionBarMain: ${Math.round(t3 - t2)}ms. #sexMainShitter: ${Math.round(t4 - t3)}ms.`); // TODO Remove eventually
};

// applies effects from effects object
setup.sex.effect = function({
  pleasure,
  arousal,
  wetness,
  cum,
  satisfy = [10, 10],
  strong = {
    pcKink: ["none"],
    pcTrait: ["none"],
    npcKink: ["none"],
    npcTrait: ["none"],
  },
  weak = {
    pcKink: ["none"],
    pcTrait: ["none"],
    npcKink: ["none"],
    npcTrait: ["none"],
  },
}: sexEffectObject, target: number = -5): boolean[] {
  // aw.con.info(`setup.sex.effect is Starting`); // TODO Remove eventually
  const sex = ↂ.sex;
  const orgasm = [false, false];
  // create target references
  const pc = ↂ.pc;
  if (target === -5) {
    target = sex.target;
  }
  const npc = sex.npc[target];
  if ("object" === typeof pleasure) {
    let a;
    let nw;
    let per;
    if (pleasure.pcAmt === undefined) {
      pleasure.pcAmt = 0;
    }
    a = setup.sex.modifier(pc, pleasure.pcAmt, strong.pcKink, strong.pcTrait, weak.pcKink, weak.pcTrait);
    a = Math.round(a * aw.sexPos[sex.pos].mult);
    if (pc.kink.easy) {
      a = Math.round(a * 1.2);
    } else if (pc.kink.hard) {
      a = Math.round(a * 0.8);
    }
    aw.con.info(`pleasure from action to pc = ${a}. previous pleasure: ${pc.status.pleasure}`);
    nw = a + pc.status.pleasure;
    aw.con.info(`New PC pleasure = ${nw}`);
    per = (nw / sex.pcOrgasm) * 100;
    if (per > pleasure.pcMax) {
      nw = Math.round(sex.pcOrgasm * (pleasure.pcMax / 100));
      if (nw > pc.status.pleasure) {
        pc.status.pleasure = nw;
      }
    } else {
      pc.status.pleasure = nw;
    }
    if (pc.status.pleasure >= sex.pcOrgasm) {
      sex.orgCountPC += 1;
      orgasm[0] = true;
    }
    if (pc.status.pleasure < 0) {
      pc.status.pleasure = 0;
    }
    try {
      a = setup.sex.modifier(npc, pleasure.npcAmt, strong.npcKink, strong.npcTrait, weak.npcKink, weak.npcTrait);
    } catch (e) {
      aw.con.warn(`Error with sex.effect -> sex.modifier() #1. ${e.name}: ${e.message}.`);
      a = 0;
    }
    if ((sex.npcBC[target].condom.worn || sex.npcBC[target].headCap.worn) && (sex.pcAct.search(".") === -1 && (aw.sexAct[sex.pcAct].cat === "handjob" || aw.sexAct[sex.pcAct].cat === "oral"))) {
      a = Math.round(a * 0.5);
      if (sex.npcBC[target].condom.worn) {
        sex.npcBC[target].condom.health += 4;
      }
      if (sex.npcBC[target].headCap.worn) {
        sex.npcBC[target].headCap.health += 4;
      }
    }
    // aw.con.info(`pleasure from action to npc = ${a}.`);
    nw = a + npc.status.pleasure;
    per = (nw / sex.npcOrgasm[target]) * 100;
    if (per > pleasure.npcMax) {
      nw = Math.round(sex.npcOrgasm[target] * (pleasure.npcMax / 100));
      if (nw > npc.status.pleasure) {
        npc.status.pleasure = nw;
      }
    } else {
      npc.status.pleasure = nw;
    }
    if (npc.status.pleasure >= sex.npcOrgasm[target]) {
      sex.orgCountNPC[target] += 1;
      orgasm[1] = true;
    }
    if (npc.status.pleasure < 0) {
      npc.status.pleasure = 0;
    }
  }
  if ("object" === typeof wetness) {
    let a;
    let nw;
    let v;
    try {
      a = setup.sex.modifier(pc, wetness.pcAmt, strong.pcKink, strong.pcTrait, weak.pcKink, weak.pcTrait);
    } catch (e) {
      aw.con.warn(`Error with sex.effect -> sex.modifier() #2. ${e.name}: ${e.message}.`);
      a = 0;
    }
    nw = sex.pcWetness;
    v = 8 - pc.body.pussy.wetness;
    for (let i = 0; i < a; i++) {
      if (random(1, v) === 1) {
        nw += 1;
      }
    }
    if (nw > (pc.body.pussy.wetness + 15)) {
      nw = pc.body.pussy.wetness + 15;
    }
    if (nw > wetness.pcMax) {
      nw = wetness.pcMax;
      if (nw > sex.pcWetness) {
        sex.pcWetness = nw;
      }
    } else {
      sex.pcWetness = nw;
    }
    try {
      a = setup.sex.modifier(npc, wetness.npcAmt, strong.npcKink, strong.npcTrait, weak.npcKink, weak.npcTrait);
    } catch (e) {
      aw.con.warn(`Error with sex.effect -> sex.modifier() #3. ${e.name}: ${e.message}.`);
      a = 0;
    }
    nw = sex.npcWetness[target];
    v = 8 - npc.body.pussy.wetness;
    for (let i = 0; i < a; i++) {
      if (random(1, v) === 5) {
        nw += 1;
      }
    }
    if (nw > (npc.body.pussy.wetness + 15)) {
      nw = npc.body.pussy.wetness + 15;
    }
    if (nw > wetness.npcMax) {
      nw = wetness.npcMax;
      if (nw > sex.npcWetness[target]) {
        sex.npcWetness[target] = nw;
      }
    } else {
      sex.npcWetness[target] = nw;
    }
  }
  aw.S();
  if ("object" === typeof arousal) {
    if (pc.status.arousal < arousal.pcMax) {
      setup.status.arousal(arousal.pcAmt, -1);
      if (pc.status.arousal > arousal.pcMax) {
        pc.status.arousal = arousal.pcMax;
        aw.S();
      }
    }
    if (npc.status.arousal < arousal.npcMax) {
      setup.status.arousal(arousal.npcAmt, sex.activeNPC[target]);
      if (npc.status.arousal > arousal.npcMax) {
        npc.status.arousal = arousal.npcMax;
        aw.S();
      }
    }
  }
  // aw.con.info(`setup.sex.effect is returning ${orgasm}`); // TODO Remove eventually
  return orgasm;
};

// applies effects from current sex position
setup.sex.posEffect = function({
  pleasure,
  arousal,
  wetness,
  strong = {
    kink: ["none"],
    trait: ["none"],
  },
  weak = {
    kink: ["none"],
    trait: ["none"],
  },
}: sexPositionEffectObject, char: number = -1): number {
  // aw.con.info(`setup.sex.posEffect is Starting`); // TODO Remove eventually
  // aw.L(); temporary comment
  const sex = ↂ.sex;
  const speed = ↂ.sex.speed;
  let bcMod = 1;
  const org = false;
  let tgt;
  // create target references
  if (char === -1) {
    tgt = ↂ.pc;
    if (sex.pcBC.diaphragm.worn || sex.pcBC.menstrualCup.worn || sex.pcBC.sponge.worn || sex.pcBC.femaleCondom.worn) {
      bcMod = 0.75;
      if (aw.sexPos[sex.pos].sex) {
        if (sex.pcBC[char].diaphragm.worn) {
          sex.npcBC[char].diaphragm.health += Math.round(sex.speed / 2);
        }
        if (sex.pcBC[char].menstrualCup.worn) {
          sex.npcBC[char].menstrualCup.health += Math.round(sex.speed / 2);
        }
        if (sex.pcBC[char].sponge.worn) {
          sex.npcBC[char].sponge.health += Math.round(sex.speed / 2);
        }
        if (sex.pcBC[char].femaleCondom.worn) {
          sex.npcBC[char].femaleCondom.health += Math.round(sex.speed / 2);
        }
      }
    }
    if (ↂ.pc.kink.easy) {
      bcMod += 0.15;
    } else if (ↂ.pc.kink.hard) {
      bcMod -= 0.15;
    }
  } else {
    try {
      tgt = sex.npc[char];
    } catch (e) {
      tgt = sex.npc[0];
      aw.con.warn(`Invalid npc target reference (${char}) sent to sex.posEffect - used 0`);
    }
    if (sex.npcBC[char].condom.worn || sex.npcBC[char].headCap) {
      bcMod = 0.75;
      if (aw.sexPos[sex.pos].sex) {
        if (sex.npcBC[char].condom.worn) {
          sex.npcBC[char].condom.health += Math.round(sex.speed / 2);
        }
        if (sex.npcBC[char].headCap) {
          sex.npcBC[char].headCap.health += Math.round(sex.speed / 2);
        }
      }
    }
  }
  if ("object" === typeof pleasure) {
    let a;
    let nw;
    let per;
    let org;
    a = setup.sex.modifier(tgt, pleasure.amt, strong.kink, strong.trait, weak.kink, weak.trait);
    a = Math.round(a * ((speed / 3) + 1));
    a = Math.round(a * bcMod);
    aw.con.info(`${tgt.main.name} pleasure info -- pleasure from pos: ${a}, pc final: ${ↂ.pc.status.pleasure}.`);
    nw = a + tgt.status.pleasure;
    aw.con.info(`New pleasure amount = ${nw}.`);
    if (char === -1) {
      org = sex.pcOrgasm;
    } else {
      org = sex.npcOrgasm[char];
    }
    if (tgt.status.pleasure >= org) {
      org = true;
      if (char === -1) {
        sex.pcOrgasm += 1;
      } else {
        sex.npcOrgasm[char] += 1;
      }
    }
    per = (nw / org) * 100;
    if (per > pleasure.max) {
      nw = Math.round(org * (pleasure.max / 100));
      if (nw > tgt.status.pleasure) {
        tgt.status.pleasure = nw;
      }
    } else {
      tgt.status.pleasure = nw;
    }
    aw.con.info(`new pleasure from position (aft adjustment): ${nw}`);
  }
  if ("object" === typeof wetness) {
    let a;
    let nw;
    let v;
    a = setup.sex.modifier(tgt, wetness.amt, strong.kink, strong.trait, weak.kink, weak.trait);
    if (char === -1) {
      nw = sex.pcWetness;
    } else {
      nw = sex.npcWetness[char];
    }
    v = 8 - tgt.body.pussy.wetness;
    for (let i = 0; i < a; i++) {
      if (random(1, v) === 1) {
        nw += 1;
      }
    }
    if (nw > (tgt.body.pussy.wetness + 15)) {
      nw = tgt.body.pussy.wetness + 15;
    }
    if (char === -1) {
      sex.pcWetness = nw;
    } else {
      sex.npcWetness[char] = nw;
    }
  }
  aw.S();
  if ("object" === typeof arousal) {
    if (arousal && random(1, 8) === 1) {
      setup.status.arousal(1, char);
    }
  }
  // aw.con.info(`setup.sex.posEffect returning. Org: ${org}`); // TODO Remove eventually
  if (org) {
    return char;
  } else {
    return -2;
  }
};

setup.sex.orgasmPC = function(act: any, type: string = "none"): void {
  // aw.con.info(`setup.sex.orgasmPC is starting [no return logging]`); // TODO Remove eventually
  const sex = ↂ.sex;
  // specific state changes from orgasm.
  // record orgasm quality
  if (type === "playerAction" || type === "npcAction") {
    sex.pcOrgQuality.push(act.effect.satisfy[0]);
  } else if (type === "position") {
    sex.pcOrgQuality.push(10);
  }
  ↂ.pc.status.pleasure = Math.round(sex.pcOrgasm * (ↂ.pc.trait.libido / 10));
  aw.S();
  // TODO femcum location!
};

// processes the NPC having an orgasm
setup.sex.orgasmNPC = function(ind: number, act: SexAct | SexPos, type: "playerAction"|"npcAction"|"position"|"none" = "none"): void {
  // aw.con.info(`setup.sex.orgasmNPC is starting for npc index: ${ind}`); // TODO Remove eventually
  const sex = ↂ.sex;
  if (type === "playerAction" || type === "npcAction") {
    sex.npcOrgQuality[ind].push((act as SexAct).effect.satisfy[1]);
  } else if (type === "position") {
    sex.npcOrgQuality[ind].push(10);
  }
  if (sex.npc[ind].main.male) {
    sex.npc[ind].status.pleasure = Math.round(sex.npcOrgasm[ind] * 0.1);
  } else {
    sex.npc[ind].status.pleasure = Math.round(sex.npcOrgasm[ind] * (sex.npc[ind].trait.libido / 10));
  }
  // aw.con.info(`NPC pleasure now ${sex.npc[ind].status.pleasure} after orgasm.`);
  if (sex.npc[ind].main.male) {
    const cres = setup.sex.cum(ind, type as "playerAction" | "npcAction" | "position");
    // aw.con.info(`returned cum text was ${cres}`);
    try {
      sex.orgText.npcb = setup.library.orgasm.npcOrgasm(cres);
    } catch (e) {
      sex.orgText.npcb = `<b>[ERROR IN ORGASM LIBRARY]</b> ${e.name}: ${e.message}`;
    }
    setup.sex.cumRiskText(cres, ind);
    sex.maleCount -= 1;
    if (sex.maleCount <= 0) {
      sex.endFlag = true;
    }
  } else {
    sex.orgText.npcb = "<<= ↂ.T.main.name>> came, but I don't have special text female NPC orgasms yet, sadly. Sorry about that!";
  }
  aw.S();
};

// generates text for cum risk
setup.sex.cumRiskText = function(base: string, ind: number): void {
  // aw.con.info(`setup.sex.cumRiskText is starting`); // TODO Remove eventually
  const name = ↂ.sex.npc[ind].main.name;
  let txt;
  switch (base) {
    case "condom broke":
      txt = `${name}'s condom broke, but you don't think any cum got inside you.`;
      if (ↂ.pc.kink.risky || ↂ.pc.kink.pregnancy) {
        txt += ".. Damn.";
      }
      break;
    case "condom broke and came inside":
      txt = `${name}'s condom broke, spilling fertile seed inside you.`;
      if (ↂ.pc.kink.risky || ↂ.pc.kink.pregnancy) {
        txt += ".. Awesome!";
      }
      break;
    case "came inside":
      txt = `${name} released fertile seed inside you.`;
      if (ↂ.pc.kink.risky || ↂ.pc.kink.pregnancy) {
        txt += ".. That felt great!";
      }
      break;
    case "came inside PO":
      txt = `${name} didn't pull out in time and released fertile seed inside you.`;
      if (ↂ.pc.kink.risky || ↂ.pc.kink.pregnancy) {
        txt += ".. That felt great!";
      }
      break;
    case "safe":
      if (aw.sexPos[ↂ.sex.pos].anal) {
        // came inside asshole
        txt = `${name} came inside your asshole.`;
      } else {
        txt = `${name} didn't cum anywhere near your pussy.`;
      }
      if (ↂ.pc.kink.risky || ↂ.pc.kink.pregnancy) {
        txt += ".. Unfortunately.";
      }
      break;
    case "came in condom":
      txt = `${name} came into a condom.`;
      break;
    case "pulled out":
      txt = `${name} successfully pulled out and avoided cumming inside you.`;
      break;
    case "pulled out fail":
      txt = `${name} tried to pull out at the last second and sprayed your vulva with cum.`;
      break;
  }
  // aw.con.info(`setup.sex.cumRiskText finished, pushed ${txt}`); // TODO Remove eventually
  ↂ.sex.cumInfo.push(txt);
};

// handles what happens to semen from an NPC
setup.sex.cum = function(ind: number, type: "playerAction"|"npcAction"|"position"): string {
  // aw.con.info(`setup.sex.cum is starting`); // TODO Remove eventually
  const sex = ↂ.sex;
  const src = sex.npc[ind];
  let vol = sex.npc[ind].fert.getCumVol();
  const fData = src.fert.cumData();
  let pos;
  let jizz = "none";
  const bc = sex.npcBC[ind];
  let risk = false;
  // {dia:false,diaType:"none",diaEf:0,diaHealth:0,diaBreak:false,diaSab:0,femCon:false,femConHealth:0,femConEf:0,femConType:"none",femConBreak:false,femConSab:0,menCup:false,menCupType:"none",menCupHealth:0,menCupEf:0,menCupBreak:false,menCupSab:0,sponge:false,spongeType:"none",spongeEf:0,spongeSab:0,condom:false,condomType:"none",condom.health:0,condomEf:0,condom.break:false,condomSab:0,headCap:false,headCapType:"none",headCapHealth:0,headCapEf:0,headCapBreak:false,headCapSab:0}

  if (bc.condom.worn && !bc.condom.break) {
    const condomData: intBreakData = {
      effect: bc.condom.effect,
      health: bc.condom.health,
      sabo: bc.condom.sabo,
      acidPre: src.mutate.acidPre,
      acidVag: ↂ.pc.mutate.acid,
      powerEjac: src.mutate.powerEjac,
      bitchBreaker: src.mutate.bitchBreaker,
      cumVol: vol,
    };
    const condomBreak = setup.fert.condomBreakCheck(condomData);

    if (condomBreak) {
      jizz = "condom broke";
    } else {
      return "came in condom";
    }
  } else if (bc.condom.worn && bc.condom.break) {
    jizz = "condom broke";
  }
  try {
    if (type === "playerAction" && "object" === typeof aw.sexAct[sex.pcAct].cum) {
      pos = jQuery.extend(true, {}, aw.sexAct[sex.pcAct].cum);
    } else if (type === "npcAction" && "object" === typeof aw.sexActN[sex.npcAct[ind]].cum) {
      pos = jQuery.extend(true, {}, aw.sexActN[sex.npcAct[ind]].cum);
    } else {
      pos = jQuery.extend(true, {}, aw.sexPos[sex.pos].cum[0]);
    }
  } catch (e) {
    aw.con.error(`sex.cum w/ index ${ind} for type ${type} - jExtend cum dest object`, e);
    pos = jQuery.extend(true, {}, aw.sexPos[sex.pos].cum[0]);
  }
  // pull-out opportunity (redirect pos)
  const internal = ["vest", "vestibule", "mid", "deep", "cervix", "womb", "vagina", "pussy"];
  if (!sex.flag.askedCumInside) {
    const po = random(1, 10);
    if (sex.flag.askedPullOut) {
      if (po < 4) { // pulls out successfully
        jizz = "pulled out";
        pos = { thighs: 3, groin: 5, vulva: 2};
      } else if (po < 8) { // pulls out some
        jizz = "pulled out fail";
        pos = { vulva: 5, mid: 2, vest: 3};
      } else { // cums inside normally
        jizz = "came inside PO";
      }
    } else {
      if (po === 2) {
        // change to pull out
        jizz = "pulled out fail";
        pos = { vulva: 5, mid: 2, vest: 3};
      }
    }
  } else {
    // asked to cum inside, so potential depth bonus
    if (pos.deep != null) {
      pos.deep += random(2, 3);
    } else {
      pos.deep = random(1, 2);
    }
    if (pos.cervix != null) {
      pos.cervix += random(1, 2);
    } else {
      pos.cervix = 1;
    }
  }
  const keys = Object.keys(pos);
  let div = 0;
  const c = keys.length;
  for (let i = 0; i < c; i++) { // calc value of total distribution
    div += pos[keys[i]];
  }
  const cvu = Math.max(1, Math.round(vol / div)); // cum volume unit
  const m = ["hair", "face", "chest", "back", "stomach", "butt", "groin", "thigh", "legs", "feet"];
  const ccodes = ["A", "O", "P", "Q"];
  // aw.con.info(`the cum volume unit is ${cvu} deci-ml times ${div}. (vol = ${vol})`);
  for (let i = 0; i < c; i++) {
    const key = keys[i];
    let fert = false;
    let cond;
    switch (key) { // probably a better way to do this, but it serves as a kind of validation (mods)
      case "bukkake":
        cond = m[random(0, 8)];
        break;
      case "hair":
        cond = "hair";
        break;
      case "face":
        cond = "face";
        break;
      case "chest":
        cond = "chest";
        break;
      case "back":
        cond = "back";
        break;
      case "hand":
      case "hands":
        cond = "hands";
        break;
      case "belly":
      case "stomach":
        cond = "stomach";
        break;
      case "butt":
      case "ass":
        cond = "butt";
        break;
      case "pubis":
      case "pubic":
      case "groin":
        cond = "groin";
        break;
      case "anus":
      case "asshole":
        cond = "anusFluid";
        break;
      case "leg":
      case "legs":
        cond = "legs";
        break;
      case "thigh":
      case "thighs":
        cond = "thighs";
        break;
      case "feet":
      case "foot":
        cond = "feet";
        break;
      case "vulva":
        cond = "genitals";
        fert = true;
        break;
      case "vest":
      case "vestibule":
      case "mid":
      case "deep":
      case "cervix":
      case "womb":
      case "vagina":
      case "pussy":
        cond = "vagFluid";
        fert = true;
        break;
      default:
        cond = "floor";
        break;
    }
    if (cond !== "floor") {
      let stainVol;
      if (cond !== "vagFluid" && cond !== "anusFluid") {
        stainVol = Math.ceil(((cvu * pos[key]) / 10) / 25); // convert to ounces
      } else {
        stainVol = Math.ceil((cvu * pos[key]) / 9); // convert to ml
      }
      setup.condition.add({loc: cond, amt: stainVol, type: "cum"});
      // old condition code
      /*let v1 = ↂ.pc.cond[cond][1],
        v2 = ↂ.pc.cond[cond][1],
        g, e, f;
      if (ccodes.includes(v1)) {
        g = pos[key] * cvu;
        e = setup.sex.cumCondIncrement(v1, g);
        ↂ.pc.cond[cond][1] = e;
      } else if (ccodes.includes(v2)) {
        g = pos[key] * cvu;
        e = setup.sex.cumCondIncrement(v1, g);
        ↂ.pc.cond[cond][2] = e;
      } else {
        ↂ.pc.cond[cond][1] = "O";
      }*/
      let f;
      if (fert) {
        if (key === "pussy" || key === "vagina") {
          const r = ["vest", "mid", "deep"];
          f = r[random(0, 2)];
        } else if (key === "vestibule") {
          f = "vest";
        } else {
          f = key;
        }
        if (ↂ.pc.status.birthCon.diaphragm.worn && f === "cervix") {
          f = "deep";
        }
        ↂ.pc.fert.inseminate(sex.activeNPC[ind], (pos[key] * cvu), f);
        risk = true;
      }
    }
  }
  if (risk) {
    setup.drug.eatDrug("cream", vol);
  }
  // aw.con.info(`setup.sex.cum is finished! Risk: ${risk} - msg: ${jizz}`); // TODO Remove eventually
  if (jizz === "pulled out") {
    setup.omni.new("creamVulva");
  } else if (risk) {
    const opt = {
      text: `The result of a recent encounter with ${src.main.name}.`,
    };
    setup.omni.new("creamPie", opt);
  }
  if (jizz !== "none") {
    if (jizz === "came inside PO" || jizz === "pulled out fail") {
      sex.risky = true;
      return jizz;
    } else if (jizz === "pulled out") {
      return jizz;
    }
    if (risk) {
      sex.risky = true;
      jizz += " and came inside";
    }
    return jizz;
  } else if (risk) {
    sex.risky = true;
    return "came inside";
  } else {
    return "safe";
  }
};

// <OUTDATED> adds volume of semen to condition object
setup.sex.cumCondIncrement = function(val: string, vol: number = 10): string {
  let x;
  let y = 2;
  if (vol < 20) {
    y = 1;
  } else if (vol >= 50) {
    y = 3;
  }
  switch (val) {
    case "O":
      x = 6;
      break;
    case "P":
      x = 12;
      break;
    case "Q":
      return "Q";
    default:
      return "O";
  }
  if (random(1, x) <= y) {
    if (val === "P") {
      return "Q";
    } else {
      return "P";
    }
  } else {
    return val;
  }
};

// starts a change position menu
setup.sex.changePosition = function(key: string): void {
  // aw.con.info(`setup.sex.change position starting`); // TODO Remove eventually
  let wet = setup.sex.wetIcon(ↂ.sex.pcWetness);
  State.temporary.posc = {
    key,
    length: aw.sexPos[key].pos.length,
    pc: `<div id="sexCharacterButtonPC" class="sexInfoCharacter">[img[IMGsexFemaleSymbol]]<span style="font-size:24px;font-weight:bold;display:inline-block;margin-left:50px;"><<= ↂ.pc.main.name.slice(0,7)>></span> (you)<<sp 2>>Oh! <span class="monospace" style="color:deeppink;"><<print (Math.min(100,Math.round((ↂ.pc.status.pleasure/ↂ.sex.pcOrgasm)*100))+"%")>></span><br><span class="wetness">${wet}</span><<sp 2>>BC: <<if ↂ.sex.pcBC.diaphragm.worn>>Diaphram<<elseif ↂ.sex.pcBC.femaleCondom.worn>>FemCondom<<elseif ↂ.sex.pcBC.menstrualCup.worn>>M-Cup<<elseif ↂ.sex.pcBC.sponge.worn>>Sponge<<else>>None<</if>></div>`,
    npc: "",
    button: `<<button "ACCEPT">><<run setup.sex.changePositionAct("${key}")>><<run Dialog.close()>><</button>>`,
    info: `<h3>${aw.sexPos[key].name}</h3>`,
  };
  for (let i = 0, c = ↂ.sex.activeNPC.length; i < c; i++) {
    wet = setup.sex.wetIcon(ↂ.sex.npcWetness[i]);
    State.temporary.posc.npc += `<div id="npcNum${i}" class="sexInfoCharacter"><<if ↂ.sex.npc[${i}].main.female && ↂ.sex.npc[${i}].main.male>>[img[IMGsexFutaSymbol]]<<elseif ↂ.sex.npc[${i}].main.female>>[img[IMGsexFemaleSymbol]]<<else>>[img[IMGsexMaleSymbol]]<</if>><span style="font-size:24px;font-weight:bold;"><<= ↂ.sex.npc[${i}].main.name.slice(0,8)>> <<= ↂ.sex.npc[${i}].main.surname.slice(0,1)>><<if ↂ.sex.target == ${i}>><<sp 2>><b>@@.red;🎯@@</b><</if>></span><<sp 2>>Oh! <span class="monospace" style="color:deeppink;"><<print (Math.min(100,Math.round((ↂ.sex.npc[${i}].status.pleasure/ↂ.sex.npcOrgasm[${i}])*100))+"%")>></span><br><span class="wetness">${wet}</span><<sp 2>>BC: <<if ↂ.sex.npcBC[${i}].diaphragm.worn>>Diaphragm<<elseif ↂ.sex.npcBC[${i}].femaleCondom.worn>>FemCondom<<elseif ↂ.sex.npcBC[${i}].menstrualCup.worn>>M-Cup<<elseif ↂ.sex.npcBC[${i}].sponge.worn>>Sponge<<elseif ↂ.sex.npcBC[${i}].condom.worn>>Condom<<elseif ↂ.sex.npcBC[${i}].headCap>>Head-Cap<<else>>None<</if>></div>`;
  }
  for (let i = 1, c = aw.sexPos[key].pos.length; i < c; i++) {
    if (aw.sexPos[key].pos[i].info !== undefined) {
      State.temporary.posc.info += `<b>Spot ${i}:</b> ${aw.sexPos[key].pos[i].info}.<br>`;
    }
  }
  // aw.con.info(`setup.sex.change position finished, launching dialog`); // TODO Remove eventually
  setup.dialog("Change Position", "<<include [[SexPositionChangeMenu]]>>");
};

// performs position change action
setup.sex.changePositionAct = function(key: string, argu: any = "none"): void {
  $("#sexSceneLoadingImage").removeClass("hideIt");
  ↂ.toggleLoading = true;
  function delayDom() {
    // aw.con.info(`Change Position chosen, key: ${key}, argument: ${argu}.`);
    const sex = ↂ.sex;
    sex.encounter = ["none", "none", "none"];
    let r;
    const pos = aw.sexPos[key];
    if (argu !== "none") {
      r = pos.special(argu);
    } else {
      r = pos.special();
    }
    const m: { type: "act"| "pos", ret: string, arg: string} = {
      type: "pos",
      ret: r,
      arg: argu,
    };
    sex.lastPos = sex.pos;
    sex.pos = pos.key;
    sex.pcLastAct = sex.pcAct;
    sex.pcActRecord.push(sex.pcAct);
    sex.pcAct = `positionChange.${pos.key}`;
    if (sex.speed < aw.sexPos[sex.pos].speed.min) {
      sex.speed = aw.sexPos[sex.pos].speed.min;
    }
    if (sex.speed > aw.sexPos[sex.pos].speed.max) {
      sex.speed = aw.sexPos[sex.pos].speed.max;
    }
    // aw.con.info(`setup.sex.changePositionAct finished, running setup.sex.main`); // TODO Remove eventually
    setup.sex.main(pos, m);
  }
  setTimeout(delayDom, setup.sex.domDelay);
};

// creates text for player position change action
setup.sex.playerPosition = function(): string {
  // aw.con.info(`setup.sex.playerPosition is starting`); // TODO Remove eventually
  const sex = ↂ.sex;
  const words: string[] = [];
  switch (sex.persona) {
    case "norm":
      words.push("casually");
      words.push("distractedly");
      break;
    case "eager":
      words.push("hurriedly");
      words.push("eagerly");
      break;
    case "reluctant":
      words.push("reluctantly");
      words.push("hesitantly");
      words.push("reluctantly");
      words.push("hesitantly");
      break;
    case "romantic":
      words.push("romantically");
      words.push("lovingly");
      break;
    case "sensual":
      words.push("sensually");
      words.push("seductively");
      break;
    case "meek":
      words.push("submissively");
      words.push("obediently");
      words.push("submissively");
      words.push("obediently");
      break;
    case "angry":
      words.push("confidently");
      words.push("demandingly");
      break;
    default:
      aw.con.warn(`PC's sex persona didn't match, was set to ${sex.persona} resetting...`);
      sex.persona = "norm";
      words.push("distractedly");
      break;
  }
  const s = ↂ.skill.sex;
  if (s < 30) {
    words.push("clumsily");
    words.push("ineptly");
  } else if (s < 60) {
    words.push("manage to");
  } else {
    words.push("expertly");
    words.push("skillfully");
  }
  const openings = [`Deciding that a change is in order, you quickly settle on ${aw.sexPos[sex.pos].name}.`, `Hoping to move things along a little, you decide that ${aw.sexPos[sex.pos].name} would fit the bill nicely.`, `Your mind drifts somewhat, and gets fixed on the idea of ${aw.sexPos[sex.pos].name}.`];
  const outputs = `${openings[random(0, 2)]} You ${words[random(0, (words.length - 1))]} ${aw.sexPos[sex.pos].movText}`;
  // aw.con.info(`setup.sex.playerPosition returning`); // TODO Remove eventually
  return outputs;
};

// initiates a sex action
setup.sex.sexAction = function(key: string, argu: any = "none"): void {
  $("#sexSceneLoadingImage").removeClass("hideIt");
  aw.con.info(`Chosen sex action key = ${key}`);
  function delayDom() {
    if (key.slice(0, 1) === "'" || key.slice(0, 1) === '"') {
      key = key.slice(1, -1);
    }
    ↂ.toggleLoading = true;
    // aw.con.info(`Action chosen, key: ${key}, argument: ${argu}.`);
    const sex = ↂ.sex;
    const act = (key === "repeat") ? aw.sexAct[sex.pcAct] : aw.sexAct[key];
    sex.encounter = ["none", "none", "none"];
    let r;
    if (argu !== "none") {
      r = act.special(argu);
    } else {
      r = act.special();
    }
    const m: { type: "act" | "pos", ret: string, arg: string } = {
      type: "act",
      ret: r,
      arg: argu,
    };
    sex.pcLastAct = sex.pcAct;
    sex.pcActRecord.push(sex.pcAct);
    sex.pcAct = act.key;
    // aw.con.info(`setup.sex.sexAction is finished, running setup.sex.main`); // TODO Remove eventually
    setup.sex.main(act, m);
  }
  setTimeout(delayDom, setup.sex.domDelay);
};

// npc action - change position
setup.sex.changePositionNPC = function(key: string, ind: number = 0): void {
  // aw.con.info(`NPC change Position chosen, key: ${key}.`);
  const sex = ↂ.sex;
  const act = aw.sexPos[key];
  act.special();
  sex.npcActRecord[ind].push(sex.npcAct[ind]);
  sex.npcLastAct[ind] = sex.npcAct[ind];
  sex.npcAct[ind] = `positionChange.${key}`;
  aw.sexPos[key].special();
  sex.lastPos = sex.pos;
  sex.pos = key;
  if (sex.speed < aw.sexPos[key].speed.min) {
    sex.speed = aw.sexPos[key].speed.min;
  }
  if (sex.speed > aw.sexPos[key].speed.max) {
    sex.speed = aw.sexPos[key].speed.max;
  }
  sex.npcOutput.push(setup.sex.library(key, "P"));
};

// performs NPC's sex action
setup.sex.sexActionNPC = function(key: string, ind: number = 0): boolean {
  // aw.con.info(`NPC action chosen, key: ${key}.`);
  const act = aw.sexActN[key];
  const sex = ↂ.sex;
  act.special();
  sex.npcLastAct[ind] = sex.npcAct[ind];
  sex.npcActRecord[ind].push(sex.npcAct[ind]);
  sex.npcAct[ind] = key;
  // aw.con.info("NPC Action Effects:");
  const org = setup.sex.effect(act.effect);
  if (org[0]) {
    setup.sex.orgasmPC(act, "npcAction");
  }
  if (org[1]) {
    setup.sex.orgasmNPC(sex.target, act, "npcAction");
  }
  sex.npcOutput.push(setup.sex.library(key, "N"));
  return org[0];
};




