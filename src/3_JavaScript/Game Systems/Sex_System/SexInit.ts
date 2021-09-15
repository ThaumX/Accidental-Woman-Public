/*
    ███████╗███████╗██╗  ██╗     ███╗   ███╗███████╗████████╗██╗  ██╗
    ██╔════╝██╔════╝╚██╗██╔╝     ████╗ ████║██╔════╝╚══██╔══╝██║  ██║
    ███████╗█████╗   ╚███╔╝█████╗██╔████╔██║█████╗     ██║   ███████║
    ╚════██║██╔══╝   ██╔██╗╚════╝██║╚██╔╝██║██╔══╝     ██║   ██╔══██║
    ███████║███████╗██╔╝ ██╗     ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║
    ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝

    SEX SCENE INITIALIZATION AND CLOSURE FUNCTIONS
*/

// sex data interface
interface ↂsex {
  tabs: number;
  pos: string;
  posNPC: string[];
  lastPos: string;
  pcAct: string;
  pcLastAct: string;
  pcActRecord: string[];
  npcAct: string[];
  npcLastAct: string[];
  npcActRecord: string[][];
  inPosition: number[];
  target: number;
  enviroTags: string[];
  situOrg: number;
  pcOrgasm: number;
  npcOrgasm: number[];
  turns: number;
  start: boolean;
  rape: boolean;
  activeNPC: string[];
  npcCount: number;
  startTime: 0 | time;
  film: boolean;
  pcOutput: string;
  npcOutput: string[];
  orgText: {
    [propName: string]: string;
  };
  cumInfo: any[];
  encounter: string[];
  speed: number;
  pcBC: any;
  npcBC: BirthCon[];
  fucking: boolean;
  pcWetness: number;
  npcWetness: number[];
  pcLube: lubeObject;
  npcLube: lubeObject[];
  pcOrgQuality: any[];
  npcOrgQuality: 0 | any[];
  earlyOut: boolean;
  passage: string;
  risky: boolean;
  orgCountPC: number;
  orgCountNPC: number[];
  maleCount: number;
  endFlag: boolean;
  persona: string;
  flag: {
    askedPullOut: boolean;
    askedCumInside: boolean;
    askedCondom: boolean;
    triedRemoveCondom: boolean;
    pickedDom: number;
    pickedSub: number;
    anal: boolean;
    oral: boolean;
    vag: boolean;
    [propName: string]: any;
  };
  scene: boolean;
  npc: NPC[];
  timer: number;
  menu: false | string;
}



/*THIS FILE CONTAINS FUNCTIONS USED DURING SEX SCENES BY ACTIONS, POSITIONS, ETC*/
if (setup.sex === null || setup.sex === undefined) {
  setup.sex = {} as setupSex;
}



Macro.add("startSex", {
  handler() {
    // s
    const ᛔ = State.active.variables;
    if (this.args.length < 1) {
      aw.con.warn("Tried to initialize a sex scene with no supplied NPCs!");
      if (ᛔ.activeNPC.length > 0) {
        this.args.push(ᛔ.activeNPC[0]);
      } else {
        aw.con.warn("--No active NPCs to fallback to. aborting");
        UI.alert("An error has occurred: no NPCs were supplied to have sex with.");
        return;
      }
    }
    setup.sex.startSex(this.args);
  },
});

// starts a sex scene
setup.sex.startSex = function(...args: string[]): void {
  // add a general loading image controlled via css to show while actions pending.
  aw.replace("#awUIcontainer", `<div id="sexSceneLoadingImage"></div>`);
  // removed the building load image <img data-passage="IMG-BuildingALoading"> from above
  ↂ.toggleLoading = true;
  setup.eventAllowed = false;
  // it looks weird to have a subfunction, but the purpose is basically to add a DOM delay for the loading gif
  function domDelay(): void {
    const ᛔ = State.active.variables;
    const sex = ↂ.sex;
    if (args.length < 1) {
      aw.con.warn("Tried to initialize a sex scene with no supplied NPCs!");
      if (ᛔ.activeNPC.length > 0) {
        args.push(ᛔ.activeNPC[0]);
      } else {
        aw.con.warn("--No active NPCs to fallback to. aborting");
        UI.alert("An error has occurred: no NPCs were supplied to have sex with.");
        return;
      }
    }
    // create activeNPC list of npcids
    sex.activeNPC = []; // set array of active NPCs in the sex scenario
    if (Array.isArray(args[0])) {
      for (let i = 0, c = args[0].length; i < c; i++) {
        if ("number" === typeof args[0][i]) {
          sex.activeNPC.push(ᛔ.activeNPC[args[0][i]]);
        } else {
          sex.activeNPC.push(args[0][i]);
        }
      }
    } else {
      for (let i = 0, c = args.length; i < c; i++) {
        if ("number" === typeof args[i]) {
          sex.activeNPC.push(ᛔ.activeNPC[args[i]]);
        } else {
          sex.activeNPC.push(args[i]);
        }
      }
    }
    // build direct references to npcs
    sex.npc = [];
    for (let i = 0, c = sex.activeNPC.length; i < c; i++) {
      sex.npc.push(aw.npc[sex.activeNPC[i]]);
    }
    for (let i = 0, c = sex.npc.length; i < c; i++) {
      if (sex.npc[i].main.age < 14) {
        setup.dialog("Pedo Error", "The sex system has a hard age cap preventing inclusion of NPCs that are children. The sex scene will now close.");
        setup.sex.close();
      }
    }
    sex.maleCount = 0;
    for (let i = 0, c = sex.activeNPC.length; i < c; i++) {
      if (sex.npc[i].main.male) {
        sex.maleCount += 1;
      }
    }
    // check npc flags for special knowledge
    for (let i = 0, c = sex.npc.length; i < c; i++) {
      if (ↂ.pc.mutate.acid) {
        if (sex.npc[i].record.flag.knowsAcidVag) {
          sex.flag.knowsAcid = true;
        }
      }
    }
    sex.startTime = jQuery.extend(true, [], ᛔ.time);
    if (sex.pos === "none") {
      aw.con.info("No sex position set, using default 'standing'.");
      sex.pos = "standFaceTogether";
    }
    if (ↂ.pc.status.inPublic) {
      sex.enviroTags.push("public");
    }
    if (ↂ.sex.passage.substr(0, 4) === "home") {
      for (let index = 0; index < ↂ.home.item.bedroom.length; index++) {
        switch (aw.homeItems[ↂ.home.item.bedroom[index]].tags[0]) {
          case "table":
            sex.enviroTags.push("table");
            break;
          case "chair":
            sex.enviroTags.push("chair");
            break;
          case "sexmachine":
            sex.enviroTags.push("sexmachine");
            break;
          case "bed":
            sex.enviroTags.push("bed");
            break;
          case "couch":
            sex.enviroTags.push("couch");
            break;
          case "sexaid":
            sex.enviroTags.push("sexaid");
            break;
          default:
            break;
        }
      }
      sex.enviroTags.push("public");
    }
    sex.npcCount = sex.activeNPC.length;
    if (sex.pcOutput === "none") {
      sex.pcOutput = "No custom opening text specified - default openings not yet implemented.";
    }
    if (sex.npcOutput.length < 1) {
      sex.npcOutput = [];
    }
    const tA = performance.now();
    setup.library.initSA();
    setup.library.initSAN();
    setup.library.initSP();
    setup.library.initSAO();
    const tB = performance.now();
    const res = Math.round(tB - tA);
    aw.con.info(`The sexPos library took ${res}ms to load.`);
    sex.endFlag = false;
    sex.flag = {
      askedPullOut: false,
      askedCumInside: false,
      askedCondom: false,
      triedRemoveCondom: false,
      pickedDom: 0,
      pickedSub: 0,
      anal: false,
      oral: false,
      vag: false,
    };
    sex.turns = 0;
    sex.speed = 0;
    sex.risky = false;
    if (sex.persona === null || sex.persona === undefined) {
      sex.persona = "norm";
    }
    sex.lastPos = "none";
    sex.pcLastAct = "none";
    sex.pcActRecord = ["start"];
    sex.npcLastAct = [];
    sex.npcActRecord = [];
    sex.cumInfo = [];
    sex.npcOrgasm = [];
    sex.inPosition = [];
    sex.pcOrgQuality = [];
    sex.npcOrgQuality = [];
    if (ᛔ.pref.sexSceneSpeed === undefined) { // WEEEIRD Bestiness
      aw.con.warn("Pref unset, wtf?");
      ᛔ.pref.sexSceneSpeed = 2;
    }
    for (let i = 0; i < sex.npcCount; i++) {
      sex.npcLastAct.push("none");
      sex.npcOrgQuality.push([]);
      sex.npcActRecord.push(["start"]);
      const norg = Math.round(((aw.npc[sex.activeNPC[i]].body.orgasm + ((ᛔ.pref.sexSceneSpeed + sex.situOrg) * 5)) * 5) * 5);
      sex.npcOrgasm.push(norg);
      sex.inPosition.push(i);
    }

    sex.pcOrgasm = Math.round(((ↂ.pc.body.orgasm + ((ᛔ.pref.sexSceneSpeed + ↂ.sex.situOrg) * 5)) * 8) * 5);
    // sex.encounter = ["none","none","none"];
    sex.target = 0;
    ↂ.T = aw.npc[sex.activeNPC[0]];
    State.temporary.t = sex.activeNPC[0];
    sex.pcBC = jQuery.extend(true, {}, ↂ.pc.status.birthCon);
    sex.npcBC = [];
    for (let i = 0; i < sex.npcCount; i++) {
      sex.npcBC.push(aw.npc[sex.activeNPC[i]].status.birthCon);
    }
    sex.fucking = false;
    const wetD = [6, 6, 5, 3, 2, 1, 1, 1];
    sex.pcWetness = Math.min(15, Math.round((ↂ.pc.status.arousal * ᛔ.pref.startWet) / wetD[ↂ.pc.body.pussy.wetness]));
    sex.npcWetness = [];
    sex.npcLube = [];
    sex.orgCountNPC = [];
    for (let i = 0; i < sex.npcCount; i++) {
      sex.npcWetness.push(Math.min(15, Math.round(aw.npc[sex.activeNPC[i]].status.arousal / wetD[aw.npc[sex.activeNPC[i]].body.pussy.wetness])));
      sex.npcLube.push({
        used: false,
        amt: 0,
        effective: 0,
        type: "none",
        pleasure: 0,
        prevType: "none",
      });
      sex.orgCountNPC.push(0);
    }
    aw.con.info(`PC starting wetness is ${sex.pcWetness}. NPCs ${sex.npcWetness}`);
    sex.scene = true;
    sex.pcLube = {
      used: false,
      amt: 0,
      effective: 0,
      type: "none",
      pleasure: 0,
      prevType: "none",
    };
    sex.orgCountPC = 0;
    sex.orgText = {};
    ↂ.pc.status.pleasure = random(25, 50) + Math.floor(ↂ.pc.status.arousal * 15);
    if (sex.passage === "empty" || sex.passage === "none") {
      sex.passage = aw.passage.title;
    }
    sex.timer = 0;
    aw.S();
    for (let index = 0; index < sex.npc.length; index++) {
      setup.sex.NpcClothes(ↂ.sex.npc[index].key);
      ↂ.sex.npcBC[index].condom.worn = false;
      ↂ.sex.npcBC[index].condom.break = false;
      ↂ.sex.npcBC[index].condom.health = 0;
      ↂ.sex.npcBC[index].condom.sabo = 0;
      ↂ.sex.npcBC[index].condom.effect = 0;
    }
    setup.forbiddenList();
    aw.go("SexScenePrimaryDisplay");
    State.temporary.t = sex.activeNPC[0];
  }
  setTimeout(domDelay, setup.sex.domDelay);
};

// ends a sex scene
setup.sex.close = function(): void {
  const ᛔ = State.active.variables;
  const sex = ↂ.sex;
  const passage = (sex.passage === "JobberCon") ? "JobberConSex" : sex.passage;
  sex.passage = "none";
  try {
    Dialog.close();
  } catch (e) {
    aw.con.error("sex.close dialog closer", e);
  }
  $("#endTarget").trigger("submit");
  $("#endTarget").off();
  setup.library.killSA();
  setup.library.killSAN();
  setup.library.killSP();
  setup.library.killSAO();
  let z = 0;
  let ss = 0;
  for (let i = 0, c = sex.pcOrgQuality.length; i < c; i++) {
    z += Math.round(setup.flipsat * (sex.pcOrgQuality[i] / 10));
    ss += Math.round(10 * (sex.pcOrgQuality[i] / 10));
  }
  if (sex.orgCountPC > 0) {
    sex.flag.pcCame = true;
    ↂ.pc.status.arousal = 1;
    aw.S("pc");
  } else {
    sex.flag.pcCame = false;
  }
  if (sex.orgCountNPC[0] > 0) {
    sex.flag.npcCame = true;
  } else {
    sex.flag.npcCame = false;
  }
  ss *= -1;
  setup.status.satisfact(z, "Orgasming from having sexytimes");
  if (!sex.earlyOut) {
    setup.status.stress(ss, "Sexing reduces stress");
    setup.status.happy(sex.orgCountPC, "Sex makes you happy!");
  } else {
    for (let i = 0, c = sex.activeNPC.length; i < c; i++) {
      sex.npc[i].rship.lovePC -= random(4, 8);
      sex.npc[i].rship.likePC -= random(6, 10);
    }
  }
  for (let i = 0, c = sex.activeNPC.length; i < c; i++) {
    if (ↂ.sex.flag.oral) {
      sex.npc[i].record.sex.oral += 1;
      setup.hadSexWith("n" + sex.npc[i].main.id, 2);
    }
    if (ↂ.sex.flag.vag) {
      sex.npc[i].record.sex.sex += 1;
      if (!ↂ.sex.npcBC[0].condom.worn) {
        ↂ.flag.marriage.vowsControl.IUD = false;
      }
    }
    if (ↂ.sex.flag.anal) {
      sex.npc[i].record.sex.anal += 1;
      ↂ.flag.sexRecord.anal += 1;
    }
    if (ↂ.sex.flag.vag || ↂ.sex.flag.anal) {
      setup.hadSexWith("n" + sex.npc[i].main.id, 1);
    }
    if (!ↂ.sex.flag.vag && !ↂ.sex.flag.anal && !ↂ.sex.flag.oral) {
      setup.hadSexWith("n" + sex.npc[i].main.id, 3);
    }
    if (ↂ.pc.status.inPublic) {
      sex.npc[i].record.sex.public += 1;
      ↂ.flag.sexRecord.public += 1;
    }
    if (ↂ.sex.rape) {
      sex.npc[i].record.sex.forced += 1;
      ↂ.flag.sexRecord.forced += 1;
    }
    if (!ↂ.sex.flag.npcCame) {
      sex.npc[i].record.sex.nocumNPC += 1;
      ↂ.flag.sexRecord.nocumNPC += 1;
    }
    if (!ↂ.sex.flag.pcCame) {
      sex.npc[i].record.sex.nocumPC += 1;
      ↂ.flag.sexRecord.nocumPC += 1;
    }
    if (ↂ.sex.flag.pickedDom > 3 || ↂ.sex.flag.pickedSub > 3) {
      sex.npc[i].record.sex.domsub += 1;
      ↂ.flag.sexRecord.domsub += 1;
    }
  }
  setup.status.tired(sex.orgCountPC, "Having orgasms wears you out");
  ↂ.pc.status.energy.amt -= sex.orgCountPC * 2;
  if (ↂ.pc.status.energy.amt < 0) {
    ↂ.pc.status.energy.amt = 0;
    const hl = random(2, 5) * -1;
    ↂ.pc.status.health += hl;
    setup.status.record("health", hl, "Overexerting yourself while fucking");
  }
  ↂ.pc.status.wetness = sex.pcWetness;
  ↂ.pc.status.pleasure = 0;
  setup.drug.eatDrug("sex", 10);
  aw.S();
  if (passage !== "JobberConSex") {
    setup.time.add(sex.timer);
  }
  aw.replace("#awUIcontainer", ""); // remove load image at end of scene
  // TODO specifics of actions sorting, for kink and NPC rship var
  // lubricant effect
  // wetness transfer
  sex.activeNPC = []; // set array of active NPCs in the sex scenario
  sex.npc = [];
  sex.pos = "none";
  sex.enviroTags = [];
  sex.pcOutput = "none";
  sex.npcOutput = [];
  sex.speed = 0;
  sex.lastPos = "none";
  sex.pcLastAct = "none";
  sex.rape = false;
  sex.pcActRecord = [];
  sex.npcLastAct = [];
  sex.npcActRecord = [];
  sex.cumInfo = [];
  sex.npcOrgasm = [];
  sex.inPosition = [];
  sex.pcOrgQuality = [];
  sex.npcOrgQuality = [];
  sex.encounter = ["none", "none", "none"];
  sex.target = 0;
  ᛔ.T = "empty";
  sex.pcBC = 0;
  sex.npcBC = [];
  sex.fucking = false;
  sex.scene = false;
  sex.npcWetness = [];
  sex.npcLube = [];
  sex.orgCountNPC = [];
  sex.orgCountPC = 0;
  sex.orgText = {};
  sex.endFlag = false;
  sex.timer = 0;
  sex.flag.knowsAcid = false;
  sex.flag.askedPullOut = false;
  sex.flag.askedCumInside = false;
  setup.eventAllowed = true;
  aw.go(passage);
};
