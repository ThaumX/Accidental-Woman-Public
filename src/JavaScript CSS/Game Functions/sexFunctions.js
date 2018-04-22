/*
    ███████╗███████╗██╗  ██╗     ███╗   ███╗███████╗████████╗██╗  ██╗
    ██╔════╝██╔════╝╚██╗██╔╝     ████╗ ████║██╔════╝╚══██╔══╝██║  ██║
    ███████╗█████╗   ╚███╔╝█████╗██╔████╔██║█████╗     ██║   ███████║
    ╚════██║██╔══╝   ██╔██╗╚════╝██║╚██╔╝██║██╔══╝     ██║   ██╔══██║
    ███████║███████╗██╔╝ ██╗     ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║
    ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
*/
/*THIS FILE CONTAINS FUNCTIONS USED DURING SEX SCENES BY ACTIONS, POSITIONS, ETC*/
setup.sex = {};
/*main variable change functions - simplifies writing actions*/
setup.sex.action = function (key) {
  let sex = setup.sexActs[key];
  setup.statusLoad();
  sex.action();
  if(sex.effectPC.pleasure[0] != "none"){
    setup.sex.pleasure(sex.effectPC.pleasure[0],sex.effectPC.pleasure[1]);
  }
  if(sex.effectNPC.pleasure[0] != "none"){
    setup.sex.pleasure(sex.effectNPC.pleasure[0],sex.effectNPC.pleasure[1],true);
  }
  setup.statusSave();
  if(sex.effectPC.arousal[0] != "none"){
    if(State.active.variables.PC.status.arousal < sex.effectPC.arousal[1]){
      setup.status.arousal(sex.effectPC.arousal[0]);
    }
  }
  let chapter = "standard";
  try{
    State.active.variables.sex.pcOutput = setup.library.callSexAct(key,chapter);
    if(null == State.active.variables.sex.pcOutput){
      setup.alert(`Failed at retrieving library text from book ${key}, chapter ${chapter}.`);
      State.active.variables.sex.pcOutput = setup.library.sexact[key][chapter][0];
    }
  }
  catch(e){
    setup.alert(`Failed at retrieving library text from book ${key}, chapter ${chapter}. Error: ${e.name}, ${e.message}`);
  }
};
setup.sex.pleasure = function (amt, maxPer, npc = false) {
  let maxP, tgt;
  if (npc == false) {
    maxP = Math.floor(State.active.variables.sex.pcOrgasm * maxPer);
    if (State.active.variables.PC.status.pleasure < maxP) {
      State.active.variables.PC.status.pleasure += amt;
      setup.log(`Added ${amt} to PC pleasure [max ${State.active.variables.sex.pcOrgasm}]`);
    }
  } else {
    tgt = State.active.variables.sex.target;
    let nKey = State.active.variables.sex.activeNPC[tgt];
    maxP = Math.floor(State.active.variables.sex.npcOrgasm[tgt] * maxPer);
    if (State.active.variables.NPC[nKey].status.pleasure < maxP) {
      State.active.variables.NPC[nKey].status.pleasure += amt;
    }
  }
};
