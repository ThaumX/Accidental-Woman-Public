/*
    ███████╗███████╗██╗  ██╗     ███╗   ███╗███████╗████████╗██╗  ██╗
    ██╔════╝██╔════╝╚██╗██╔╝     ████╗ ████║██╔════╝╚══██╔══╝██║  ██║
    ███████╗█████╗   ╚███╔╝█████╗██╔████╔██║█████╗     ██║   ███████║
    ╚════██║██╔══╝   ██╔██╗╚════╝██║╚██╔╝██║██╔══╝     ██║   ██╔══██║
    ███████║███████╗██╔╝ ██╗     ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║
    ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝

    MISC SEX FUNCTIONS: ONE-OFFS AND DISPLAY
*/
/*THIS FILE CONTAINS FUNCTIONS USED DURING SEX SCENES BY ACTIONS, POSITIONS, ETC*/
if (setup.sex === null || setup.sex === undefined) {
  setup.sex = {} as setupSex;
}

// determines if the sex action is valid - if parts can meet
setup.sex.valid = function(partArr: any, tar: any, thePos: string): boolean {
  //aw.con.info(`Starting setup.sex.valid.`); // TODO Remove eventually
  const partA = partArr[0];
  const partB = partArr[1];
  let selfie = false;
  if (partArr.length > 2) {
    selfie = true;
  }
  try {
    const pA = setup.sex.partRef(partA);
    const pB = setup.sex.partRef(partB);
    let cordA;
    let cordB;
    if (!pA || !pB) {
      aw.con.warn(`one or more parts invalid. 0: ${pA}, 1: ${pB}.`);
      // aw.con.info(`setup.sex.valid returned false due to invalid part.`); // TODO Remove eventually
      return false; // ignore the action as invalid
    }
    const pos = aw.sexPos[thePos];
    tar++;
    if (pA[0] === "hands") {
      cordA = [(pos.pos[0].handL[0] + pos.pos[0].handR[0]) / 2, (pos.pos[0].handL[1] + pos.pos[0].handR[1]) / 2, (pos.pos[0].handL[2] + pos.pos[0].handR[2]) / 2, pos.pos[0].handR[3]];
    } else if (pA[0] === "knees") {
      cordA = [(pos.pos[0].kneeL[0] + pos.pos[0].kneeR[0]) / 2, (pos.pos[0].kneeL[1] + pos.pos[0].kneeR[1]) / 2, (pos.pos[0].kneeL[2] + pos.pos[0].kneeR[2]) / 2, pos.pos[0].kneeR[3]];
    } else if (pA[0] === "feet") {
      cordA = [(pos.pos[0].footL[0] + pos.pos[0].footR[0]) / 2, (pos.pos[0].footL[1] + pos.pos[0].footR[1]) / 2, (pos.pos[0].footL[2] + pos.pos[0].footR[2]) / 2, pos.pos[0].footR[3]];
    } else if (pA[0] === "thigh") {
      cordA = [(pos.pos[0].groin[0] + pos.pos[0].kneeR[0]) / 2, (pos.pos[0].groin[1] + pos.pos[0].kneeR[1]) / 2, (pos.pos[0].groin[2] + pos.pos[0].kneeR[2]) / 2, pos.pos[0].groin[3]];
    } else {
      cordA = pos.pos[0][pA[0]];
    }
    if (pB[0] === "hands") {
      cordB = [(pos.pos[tar].handL[0] + pos.pos[tar].handR[0]) / 2, (pos.pos[tar].handL[1] + pos.pos[tar].handR[1]) / 2, (pos.pos[tar].handL[2] + pos.pos[tar].handR[2]) / 2, pos.pos[tar].handR[3]];
    } else if (pB[0] === "knees") {
      cordB = [(pos.pos[tar].kneeL[0] + pos.pos[tar].kneeR[0]) / 2, (pos.pos[tar].kneeL[1] + pos.pos[tar].kneeR[1]) / 2, (pos.pos[tar].kneeL[2] + pos.pos[tar].kneeR[2]) / 2, pos.pos[tar].kneeR[3]];
    } else if (pB[0] === "feet") {
      cordB = [(pos.pos[tar].footL[0] + pos.pos[tar].footR[0]) / 2, (pos.pos[tar].footL[1] + pos.pos[tar].footR[1]) / 2, (pos.pos[tar].footL[2] + pos.pos[tar].footR[2]) / 2, pos.pos[tar].footR[3]];
    } else if (pB[0] === "thigh") {
      cordB = [(pos.pos[tar].groin[0] + pos.pos[tar].kneeR[0]) / 2, (pos.pos[tar].groin[1] + pos.pos[tar].kneeR[1]) / 2, (pos.pos[tar].groin[2] + pos.pos[tar].kneeR[2]) / 2, pos.pos[tar].groin[3]];
    } else {
      cordB = pos.pos[tar][pB[0]];
    }
    const xD = Math.abs(cordA[0] - cordB[0]);
    const yD = Math.abs(cordA[1] - cordB[1]);
    const zD = Math.abs(cordA[2] - cordB[2]);
    let dist = Math.ceil(Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2) + Math.pow(zD, 2)));
    // TODO differentiate by facing for extra distance
    if (cordA[3] === cordB[3] && pA[1] === pB[1]) {
      dist += 1;
    }
    if (dist <= setup.sex.partDist(pA[0])) {
      //aw.con.info(`setup.sex.valid returns true`) // TODO Remove eventually
      return true;
    } else {
      // if (partB == "cock" || partB == "balls") {
        // aw.con.info(`cock distance wtf ${dist} > ${setup.sex.partDist(pA[0])} - type ${pB[0]}.`);
      // }
      //aw.con.info(`setup.sex.valid returns false`); // TODO Remove eventually
      return false;
    }
  } catch (e) {
    aw.con.warn(`Error in sex.valid - ${e.name}: ${e.message}`);
    // aw.con.info(`setup.sex.valid returns false due to error.`); // TODO Remove eventually
    return false;
  }
};

// determines if NPC's action is valid based on locations
setup.sex.validNPC = function (partArr: any, tar: any, thePos: string): boolean {
  //aw.con.info(`setup.sex.validNPC Starting...`); 
  const partA = partArr[1];
  const partB = partArr[0];
  let selfie = false;
  if (partArr.length > 2) {
    selfie = true;
  }
  try {
    const pA = setup.sex.partRef(partA);
    const pB = setup.sex.partRef(partB);
    let cordA;
    let cordB;
    if (!pA || !pB) {
      aw.con.warn(`one or more parts invalid. 0: ${pA}, 1: ${pB}.`);
      //aw.con.info(`setup.sex.validNPC returns false due to invalid part.`);
      return false; // ignore the action as invalid
    }
    const pos = aw.sexPos[thePos];
    tar++;
    if (pA[0] === "hands") {
      cordA = [(pos.pos[0].handL[0] + pos.pos[0].handR[0]) / 2, (pos.pos[0].handL[1] + pos.pos[0].handR[1]) / 2, (pos.pos[0].handL[2] + pos.pos[0].handR[2]) / 2, pos.pos[0].handR[3]];
    } else if (pA[0] === "knees") {
      cordA = [(pos.pos[0].kneeL[0] + pos.pos[0].kneeR[0]) / 2, (pos.pos[0].kneeL[1] + pos.pos[0].kneeR[1]) / 2, (pos.pos[0].kneeL[2] + pos.pos[0].kneeR[2]) / 2, pos.pos[0].kneeR[3]];
    } else if (pA[0] === "feet") {
      cordA = [(pos.pos[0].footL[0] + pos.pos[0].footR[0]) / 2, (pos.pos[0].footL[1] + pos.pos[0].footR[1]) / 2, (pos.pos[0].footL[2] + pos.pos[0].footR[2]) / 2, pos.pos[0].footR[3]];
    } else if (pA[0] === "thigh") {
      cordA = [(pos.pos[0].groin[0] + pos.pos[0].kneeR[0]) / 2, (pos.pos[0].groin[1] + pos.pos[0].kneeR[1]) / 2, (pos.pos[0].groin[2] + pos.pos[0].kneeR[2]) / 2, pos.pos[0].groin[3]];
    } else {
      cordA = pos.pos[0][pA[0]];
    }
    if (pB[0] === "hands") {
      cordB = [(pos.pos[tar].handL[0] + pos.pos[tar].handR[0]) / 2, (pos.pos[tar].handL[1] + pos.pos[tar].handR[1]) / 2, (pos.pos[tar].handL[2] + pos.pos[tar].handR[2]) / 2, pos.pos[tar].handR[3]];
    } else if (pB[0] === "knees") {
      cordB = [(pos.pos[tar].kneeL[0] + pos.pos[tar].kneeR[0]) / 2, (pos.pos[tar].kneeL[1] + pos.pos[tar].kneeR[1]) / 2, (pos.pos[tar].kneeL[2] + pos.pos[tar].kneeR[2]) / 2, pos.pos[tar].kneeR[3]];
    } else if (pB[0] === "feet") {
      cordB = [(pos.pos[tar].footL[0] + pos.pos[tar].footR[0]) / 2, (pos.pos[tar].footL[1] + pos.pos[tar].footR[1]) / 2, (pos.pos[tar].footL[2] + pos.pos[tar].footR[2]) / 2, pos.pos[tar].footR[3]];
    } else if (pB[0] === "thigh") {
      cordB = [(pos.pos[tar].groin[0] + pos.pos[tar].kneeR[0]) / 2, (pos.pos[tar].groin[1] + pos.pos[tar].kneeR[1]) / 2, (pos.pos[tar].groin[2] + pos.pos[tar].kneeR[2]) / 2, pos.pos[tar].groin[3]];
    } else {
      cordB = pos.pos[tar][pB[0]];
    }
    const xD = Math.abs(cordA[0] - cordB[0]);
    const yD = Math.abs(cordA[1] - cordB[1]);
    const zD = Math.abs(cordA[2] - cordB[2]);
    let dist = Math.ceil(Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2) + Math.pow(zD, 2)));
    // TODO differentiate by facing for extra distance
    if (cordA[3] === cordB[3] && pA[1] === pB[1]) {
      dist += 1;
    }
    if (dist <= setup.sex.partDist(pA[0])) {
      //aw.con.info(`setup.sex.validNPC returns true`);
      return true;
    } else {
      // if (partB == "cock" || partB == "balls") {
        // aw.con.info(`cock distance wtf ${dist} > ${setup.sex.partDist(pA[0])} - type ${pB[0]}.`);
      // }
      //aw.con.info(`setup.sex.valid returns false (normal).`);
      return false;
    }
  } catch (e) {
    aw.con.warn(`Error in sex.valid - ${e.name}: ${e.message}`);
  }
  return false;
};

// a lookup reference to turn "normal" part names into cooresponding matrix words
setup.sex.partRef = function(part: string): [string, string]|false {
  //aw.con.info(`setup.sex.partRef Starting [no return notice]`);
  part = part.toLowerCase();
  switch (part) {
    case "face":
    case "forehead":
    case "nose":
    case "eye":
    case "eyes":
    case "lips":
    case "lip":
    case "chin":
    case "cheek":
    case "tongue":
    case "mouth":
      return ["head", "front"];
    case "hair":
    case "head":
    case "ear":
    case "ears":
    case "neck":
      return ["head", "side"];
    case "chest":
    case "breast":
    case "breasts":
    case "nipple":
    case "nipples":
      return ["chest", "front"];
    case "shoulders":
    case "shoulder":
      return ["chest", "side"];
    case "back":
      return ["chest", "back"];
    case "belly":
    case "bellybutton":
    case "abs":
      return ["belly", "front"];
    case "lowerback":
    case "lowback":
      return ["belly", "back"];
    case "ass":
    case "butt":
      return ["groin", "rear"];
    case "pubic":
    case "cock":
      return ["groin", "front"];
    case "vulva":
    case "vagina":
    case "pussy":
    case "clit":
    case "groin":
    case "balls":
      return ["groin", "bottom"];
    case "hip":
    case "hips":
      return ["groin", "side"];
    case "thigh":
    case "thighs":
      return ["thigh", "front"];
    case "arm":
    case "arms":
    case "hand":
    case "hands":
      return ["hands", "none"];
    case "armr":
    case "handr":
      return ["handR", "none"];
    case "arml":
    case "handl":
      return ["handL", "none"];
    case "knee":
    case "knees":
      return ["knees", "none"];
    case "kneer":
      return ["kneeR", "none"];
    case "kneel":
      return ["kneeL", "none"];
    case "calf":
    case "calves":
      return ["calf", "none"];
    case "foot":
    case "feet":
      return ["feet", "none"];
    case "footr":
      return ["footR", "none"];
    case "footl":
      return ["footL", "none"];
    default:
      aw.con.warn(`Invalid part name ${part} from sex action! [setup.sex.partRef]`);
      return false;
  }
};

// calculates distance from center for parts
setup.sex.partDist = function(part: string): number {
  //aw.con.info(`setup.sex.partDist Starting [no return notice]`);
  part = part.toLowerCase();
  switch (part) {
    case "chest":
    case "belly":
    case "groin":
      return 1;
    case "head":
    case "thigh":
      return 2;
    case "hands":
    case "handL":
    case "handR":
    case "knees":
    case "kneeR":
    case "kneeL":
    case "calf":
    case "feet":
    case "footR":
    case "footL":
      return 3;
    default:
      return 0;
  }
};

// returns twee to create progress bars
setup.sex.statusBars = function(): twee {
  // aw.con.info(`setup.sex.statusBars starting`); // TODO Remove eventually
  try {
    const sex = ↂ.sex;
    let p;
    let anim = ">>";
    let name;
    p = Math.round((ↂ.pc.status.pleasure / ↂ.sex.pcOrgasm) * 100);
    //aw.con.info(`setup.sex.statusBars info: P Value: ${p}, PC Pleasure: ${ↂ.pc.status.pleasure}, Org Thresh: ${ↂ.sex.pcOrgasm}`);
    if (p >= 100) {
      p = 100;
      anim = ' "stripes">>';
    } else if (p >= 75) {
      anim = ' "glow">>';
    }
    //aw.con.info(`lets see what it is two ${p}`);
    let out = `<span id="sexPleasureDispPC" class="blackOutline"><<progressbar ${p} "PC Pleasure" "pink"${anim}</span><span id="sexPleasureDispNPC" class="blackOutline">`;
    let c = sex.activeNPC.length;
    if (c > 5) {
      c = 5;
    }
    for (let i = 0; i < 5; i++) {
      if (i < c) {
        //aw.con.info(`setup.sex.statusBars info for NPC: ${ↂ.sex.activeNPC[i]}, P Value: ${p}, Pleasure: ${ↂ.sex.npc[i].status.pleasure}, Org Thresh: ${ↂ.sex.npcOrgasm[i]}`);
        p = Math.round((ↂ.sex.npc[i].status.pleasure / ↂ.sex.npcOrgasm[i]) * 100);
        anim = ">>";
        name = aw.npc[sex.activeNPC[i]].main.name + " " + aw.npc[sex.activeNPC[i]].main.surname.slice(0, 1);
        if (sex.target === i) {
          name += " 🎯";
        }
        if (p >= 100) {
          p = 100;
          anim = ' "stripes">>';
        } else if (p >= 75) {
          anim = ' "glow">>';
        }
        out += `<<progressbar ${p} "${name}" "pink"${anim}`;
      } else {
        out += `<div style="height:20px;border-radius:10px;background-color:rgba(0,0,0,0.4);"></div>`;
      }
    }
    out += "</span>";
    //aw.con.info(`setup.sex.statusBars Returns text.`);
    return out;
  } catch (e) {
    aw.con.error("pbars", e);
  }
  return "ERROR W/Bars";
};

// returns twee to print icon describing current situation
setup.sex.occupyPrinter = function(i: number = 0): string {
  //aw.con.info(`setup.sex.occupyPrinter Starting...`);
  const p = ↂ.sex.pos;
  const poser = aw.sexPos[p].pos[i].occupy;
  let out = '<div id="sexOccupiedContainer">';
  if (poser.includes("mouth")) {
    out += "[img[Mouth Occupied|IMGsexLipsIconBW]] ";
  } else {
    out += "[img[Mouth Available|IMGsexLipsIcon]] ";
  }
  if (poser.includes("breasts")) {
    out += "[img[Breasts Occupied|IMGsexBreastsBW]] ";
  } else {
    out += "[img[Breasts Available|IMGsexBreasts]] ";
  }
  if (poser.includes("pussy")) {
    out += "[img[Pussy Occupied|IMGsexVagIconBW]] ";
  } else {
    out += "[img[Pussy Available|IMGsexVagIcon]] ";
  }
  if (poser.includes("asshole")) {
    out += "[img[Asshole Occupied|IMGsexAssholeBW]] ";
  } else {
    out += "[img[Asshole Available|IMGsexAsshole]] ";
  }
  if (poser.includes("handL")) {
    out += "[img[Left Hand Occupied|IMGsexHandLeftBW]] ";
  } else {
    out += "[img[Left Hand Available|IMGsexHandLeft]] ";
  }
  if (poser.includes("handR")) {
    out += "[img[Right Hand Occupied|IMGsexHandRightBW]] ";
  } else {
    out += "[img[Right Hand Available|IMGsexHandRight]] ";
  }
  if (ↂ.pc.status.inPublic) {
    out += "[img[In Public Place|IMGsexPrivate]] ";
  } else {
    out += "[img[In Private|IMGsexPrivateBW]] ";
  }
  if (ↂ.sex.film) {
    out += "[img[You are being recorded|IMGsexPhotos]] ";
  } else {
    out += "[img[Not being recorded|IMGsexPhotosBW]] ";
  }
  out += "</div>";
  //aw.con.info(`setup.sex.occupyPrinter returning text`);
  return out;
};
// returns appropriate icon for wetness level
setup.sex.wetIcon = function(wet: number): twee {
  //aw.con.info(`setup.sex.wetIcon Running [No return will be logged]`);
  switch (wet) {
    case 0:
    case 1:
    case 2:
      return "[img[IMGhalfDroplet]][img[IMGemptyDroplet]][img[IMGemptyDroplet]]";
    case 3:
    case 4:
    case 5:
      return "[img[IMGdroplet]][img[IMGemptyDroplet]][img[IMGemptyDroplet]]";
    case 6:
    case 7:
    case 8:
      return "[img[IMGdroplet]][img[IMGhalfDroplet]][img[IMGemptyDroplet]]";
    case 9:
    case 10:
    case 11:
      return "[img[IMGdroplet]][img[IMGdroplet]][img[IMGemptyDroplet]]";
    case 12:
    case 13:
    case 14:
      return "[img[IMGdroplet]][img[IMGdroplet]][img[IMGhalfDroplet]]";
    case 15:
    case 16:
    case 17:
      return "[img[IMGdroplet]][img[IMGdroplet]][img[IMGdroplet]]";
    case 18:
    case 19:
    case 20:
      return `[img[IMGtsunami${random(1, 3)}]]`;
    default:
      aw.con.warn(`Invalid value sent to setup.sex.wetIcon! Value: ${wet}.`)
      return "[img[IMGemptyDroplet]]ERROR";
  }
};

// returns twee to create the quick action buttons
setup.sex.characterButtons = function(): twee {
  // aw.con.info(`setup.sex.characterButtons Starting`); // TODO Remove eventually
  const sex = ↂ.sex;
  let timed = "<<timed 50ms>><<sc";
  timed += "ript>>";
  timed += `$("#sexCharacterButtonPC").click(function(){
    setup.sex.click("PC");
  });`;
  let wet = setup.sex.wetIcon(sex.pcWetness);
  let out = `<div id="sexCharacterButtonPC" class="sexInfoCharacter">[img[IMGsexFemaleSymbol]]<span style="font-size:24px;font-weight:bold;"><<= ↂ.pc.main.name.slice(0,7)>></span> (you)<<sp 2>>Oh! <span class="monospace" style="color:deeppink;"><<print (Math.min(100,Math.round((ↂ.pc.status.pleasure/ↂ.sex.pcOrgasm)*100))+"%")>></span><br><span class="wetness">${wet}</span><<sp 2>>BC: <<if ↂ.sex.pcBC.diaphragm.worn>>Diaphram<<elseif ↂ.sex.pcBC.femaleCondom.worn>>FemCondom<<elseif ↂ.sex.pcBC.menstrualCup.worn>>M-Cup<<elseif ↂ.sex.pcBC.sponge.worn>>Sponge<<else>>None<</if>></div>`;
  for (let i = 0; i < 6; i++) {
    if (i < sex.activeNPC.length) {
      wet = setup.sex.wetIcon(sex.npcWetness[i]);
      out += `<div id="sexCharacterButton${i}" class="sexInfoCharacter"><<if ↂ.sex.npc[${i}].main.female && ↂ.sex.npc[${i}].main.male>>[img[IMGsexFutaSymbol]]<<elseif ↂ.sex.npc[${i}].main.female>>[img[IMGsexFemaleSymbol]]<<else>>[img[IMGsexMaleSymbol]]<</if>><span style="font-size:24px;font-weight:bold;"><<= ↂ.sex.npc[${i}].main.name.slice(0,8)>> <<= ↂ.sex.npc[${i}].main.surname.slice(0,1)>><<if ↂ.sex.target == ${i}>><<sp 2>><b>@@.red;🎯@@</b><</if>></span><<sp 2>>Oh! <span class="monospace" style="color:deeppink;"><<print (Math.min(100,Math.round((ↂ.sex.npc[${i}].status.pleasure/ↂ.sex.npcOrgasm[${i}])*100))+"%")>></span><br><span class="wetness">${wet}</span><<sp 2>>BC: <<if ↂ.sex.npcBC[${i}].diaphragm.worn>>Diaphram<<elseif ↂ.sex.npcBC[${i}].femaleCondom.worn>>FemCondom<<elseif ↂ.sex.npcBC[${i}].menstrualCup.worn>>M-Cup<<elseif ↂ.sex.npcBC[${i}].sponge.worn>>Sponge<<elseif ↂ.sex.npcBC[${i}].condom.worn>>Condom<<elseif ↂ.sex.npcBC[${i}].headCap.worn>>Head-Cap<<else>>None<</if>></div>`;
      timed += `
      $("#sexCharacterButton${i}").click(function(){
        setup.sex.click(${i});
      });`;
    } else {
      out += `<div id="sexCharacterButton${i}" class="sexInfoCharacterBlank">[img[IMGsexEmptySymbol]]</div>`;
    }
  }
  timed += "<</scri";
  timed += "pt>><</timed>>";
  out += timed;
  //aw.con.info(`setup.sex.characterButtons returning twee`);
  return out;
};

// launches character display for provided character
setup.sex.click = function(num: "PC"|number): void {
  // aw.con.info(`setup.sex.click triggered`); // TODO Remove eventually
  let txt;
  let name;
  if (num === "PC") {
    txt = `<<set _char = "PC">><<include [[SexSceneCharacterDisplay]]>>`;
    name = ↂ.pc.main.name + " (you)";
  } else {
    txt = `<<set _char = ${num}>><<include [[SexSceneCharacterDisplay]]>>`;
    if (num > ↂ.sex.npc.length) {
      aw.con.warn(`Attempting to show sex info on NPC ${num}, but number is too high.`);
      return;
    }
    name = ↂ.sex.npc[num].main.name + " " + ↂ.sex.npc[num].main.surname.slice(0, 1) + ".";
  }
  setup.dialog(name, txt);
};

// returns twee to print character boxes
setup.sex.characterTargets = function(): twee {
  // aw.con.info(`setup.sex.targets Starting`); // TODO Remove eventually
  const sex = ↂ.sex;
  let timed = "<<timed 50ms>><<sc";
  timed += "ript>>";
  let wet = setup.sex.wetIcon(sex.pcWetness);
  let out = "";
  for (let i = 0, c = sex.activeNPC.length; i < c; i++) {
    wet = setup.sex.wetIcon(sex.npcWetness[i]);
    out += `<div id="sexTargetButton${i}" class="sexInfoCharacter"><<if ↂ.sex.npc[${i}].main.female && ↂ.sex.npc[${i}].main.male>>[img[IMGsexFutaSymbol]]<<elseif ↂ.sex.npc[${i}].main.female>>[img[IMGsexFemaleSymbol]]<<else>>[img[IMGsexMaleSymbol]]<</if>><span style="font-size:24px;font-weight:bold;"><<= ↂ.sex.npc[${i}].main.name.slice(0,8)>> <<= ↂ.sex.npc[${i}].main.surname.slice(0,1)>><<if ↂ.sex.target == ${i}>><<sp 2>><b>@@.red;🎯@@</b><</if>></span><<sp 2>>Oh! <span class="monospace" style="color:deeppink;"><<print (Math.min(100,Math.round((ↂ.sex.npc[${i}].status.pleasure/ↂ.sex.npcOrgasm[${i}])*100))+"%")>></span><br><span class="wetness">${wet}</span><<sp 2>>BC: <<if ↂ.sex.npcBC[${i}].diaphragm.worn>>Diaphram<<elseif ↂ.sex.npcBC[${i}].femaleCondom.worn>>FemCondom<<elseif ↂ.sex.npcBC[${i}].menstrualCup.worn>>M-Cup<<elseif ↂ.sex.npcBC[${i}].sponge.worn>>Sponge<<elseif ↂ.sex.npcBC[${i}].condom.worn>>Condom<<elseif ↂ.sex.npcBC[${i}].headCap>>Head-Cap<<else>>None<</if>></div>`;
    timed += `
      $("#sexTargetButton${i}").click(function(){
        setup.sex.target(${i});
      });`;
  }
  timed += "<</scri";
  timed += "pt>><</timed>>";
  out += timed;
  //aw.con.info(`setup.sex.characterTargets returning twee`);
  return out;
};

// sets sex scene target
setup.sex.target = function(ind: number): void {
  // aw.con.info(`setup.sex.target is setting new target variable values for index ${ind}.`); // TODO Remove eventually
  const sex = ↂ.sex;
  sex.target = ind;
  State.temporary.t = sex.activeNPC[ind];
  ↂ.T = sex.npc[ind];
  setup.sex.refresh();
  Dialog.close();
};

/*
CONDOM EFFECTIVENESS:
"duremaxT" effect = 98;
"duremaxPE" effect = 99;
"trojancockS" effect = 96;
"trojancockUL" effect = 93;
"trojancockUNL": effect = 90;
"pleasureburst": effect = 80;
default: effect = 95;
*/
// equips a condom and sets its stats
setup.sex.equipCondom = function(type: string): void {
  // aw.con.info(`setup.sex.equipCondom Starting`); // TODO Remove eventually
  const bc = ↂ.sex.npcBC[ↂ.sex.target].condom;
  let sabo = false;
  // check for earlier sab -Sab1
  if (type.slice(-5) === "-Sab1") {
    sabo = true;
    type = type.slice(0, -5);
  }
  switch (type) {
    case "duremaxT":
      bc.worn = true;
      bc.break = false;
      bc.type = "duremaxT";
      bc.health = 0;
      bc.effect = 98;
      bc.sabo = 0;
      break;
    case "duremaxPE":
      bc.worn = true;
      bc.break = false;
      bc.type = "duremaxPE";
      bc.health = 0;
      bc.effect = 99;
      bc.sabo = 0;
      break;
    case "trojancockS":
      bc.worn = true;
      bc.break = false;
      bc.type = "trojancockS";
      bc.health = 0;
      bc.effect = 96;
      bc.sabo = 0;
      break;
    case "trojancockUL":
      bc.worn = true;
      bc.break = false;
      bc.type = "trojancockUL";
      bc.health = 0;
      bc.effect = 93;
      bc.sabo = 0;
      break;
    case "trojancockUNL":
      bc.worn = true;
      bc.break = false;
      bc.type = "trojancockUNL";
      bc.health = 0;
      bc.effect = 90;
      bc.sabo = 0;
      break;
    case "pleasureburst":
      bc.worn = true;
      bc.break = false;
      bc.type = "pleasureburst";
      bc.health = 0;
      bc.effect = 80;
      bc.sabo = 10;
      break;
    default:
      bc.worn = true;
      bc.break = false;
      bc.type = "generic";
      bc.health = 0;
      bc.effect = 95;
      bc.sabo = 0;
      break;
  }
  if (sabo) {
    bc.health += 5;
    bc.sabo = 20;
    bc.effect = 60;
  }
  // aw.con.info(`setup.sex.equipCondom finished`); // TODO Remove eventually
};


setup.sex.popup = function(content: string): void {
  // target is awUIcontainer
  const output = `<div id="sexPopUp"><div id="sexPopUpContents">${content}</div></div>`;
  aw.replace("#awUIcontainer", output);
};

setup.sex.popupKill = function(): void {
  aw.replace("#awUIcontainer", "");
};


