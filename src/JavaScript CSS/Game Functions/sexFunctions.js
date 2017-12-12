/*THIS FILE CONTAINS FUNCTIONS USED DURING SEX SCENES BY ACTIONS, POSITIONS, ETC*/
setup.sex = {};
/*main variable change functions - simplifies writing actions*/
setup.sex.pleasure = function(amt,maxPer,npc = false){
  var maxP,tgt;
  if(npc == false){
    maxP = Math.floor(State.active.variables.sex.pcOrgasm * maxPer);
    if(State.active.variables.PC.status.pleasure < maxP){
      State.active.variables.PC.status.pleasure += amt;
    }
  }else{
    tgt = State.active.variables.sex.target;
    var nKey = State.active.variables.sex.activeNPC[tgt];
    maxP = Math.floor(State.active.variables.sex.npcOrgasm[tgt] * maxPer);
    if(State.active.variables.NPC[nKey].status.pleasure < maxP){
      State.active.variables.NPC[nKey].status.pleasure += amt;
    }
  }
};
