/*************************************************************/
/*  ╔═╗┌┬┐┌─┐┬─┐┌─┐  ╔╗╔╔═╗╔═╗┌─┐      Accidental Woman      */
/*  ╚═╗ │ │ │├┬┘├┤   ║║║╠═╝║  └─┐           ThaumX           */
/*  ╚═╝ ┴ └─┘┴└─└─┘  ╝╚╝╩  ╚═╝└─┘                            */
/*  Functions to compress NPCs and other items using custom  */
/*  compression algorithm sequence. Can call from Macro too  */
/*************************************************************/

setup.storeNPC = function(npcid){
  if("string" !=typeof npcid || npcid.search("n") != 0){
    let mess = "NPC storage function requires a valid npcid string!";
    console.log(mess);
    alert(mess);
    return false;
  }
  const npc = setup.AW.compress(State.active.variables.NPC[npcid]);
  if(npc == "error"){
    let msg = "NPC compression failed for NPC with id " + npcid + ".\n\nProcess aborted. Check the console log for details.";
    alert(msg);
    return false;
  }
  /*load into local storage*/
  let id = "NPCStore-"+npcid;
  let success = setup.AW.localStore(id,npc);
  if(success != "error"){
    setup.NPCStoreList.push(id);
    State.active.variables.NPC[npcid] = "stored";
    State.active.variables.npc.ready.delete(npcid);
    State.active.variables.npc.stored.push(npcid);
    return true;
  }
  return false;//something magical fucked up
};
setup.restoreNPC = function(npcid){
  if("string" !=typeof npcid || npcid.search("n") != 0){
    let mess = "NPC storage function requires a valid npcid string!";
    setup.alert(mess);
    return false;
  }
  const id = "NPCStore-"+npcid;
  const npc = setup.AW.localRestore(id);
  if(npc == "error"){return false;}
  try{
    State.active.variables.NPC[npcid] = setup.AW.decompress(npc);
  }
  catch(e){
    let msg = "Error setting story variable for some reason... "+e.name+": "+e.message;
    alert(msg);
    console.log(msg);
    return false;
  }
  if("string" == typeof State.active.variables.NPC[npcid]){
    let m = "NPC decompression failed for NPC with id " + npcid + ".\n"+State.active.variables.NPC[npcid]+"\nProcess aborted.";
    alert(m);
    return false;
  }
  /*cleanup*/
  setup.NPCStoreList.delete(id);
  State.active.variables.npc.ready.push(npcid);
  State.active.variables.npc.stored.delete(npcid);
  return true;
};
/*deep clone array to remove references*/
setup.bulkStoreNPC = function(npcidAr){
  let NPCs = [];
  for(let i = 0, c = npcidAr.length;i<c;i++){
    NPCs.push(npcidAr[i]);
  }
  setTimeout(setup.asyncBulkStoreNPC(NPCs));
};
setup.asyncBulkStoreNPC = function(NPCs){
  let suc = true, fail = [], cunt = 0, msg = "Some NPCs failed to store! IDs: ";
  let start = performance.now();
  for(let i = 0, c = NPCs.length;i<c;i++){
    suc = setup.storeNPC(NPCs[i]);
    if(!suc){
      fail.push(NPCs[i]);
      msg += (NPCs[i]+", ");
    }else{
      cunt++;
    }
  }
  if(fail.length > 0){
    console.log(msg);
    alert(msg);
    State.temporary.failStore = fail;
  }
  start = Math.floor(performance.now() - start);
  console.log(("successfully stored "+cunt+" NPCs in "+start+"ms."));
};

/********************************************************/
/* ╔═╗┌─┐┌┬┐┬┬  ┬┌─┐  ╔═╗┬ ┬┌─┐┌─┐┬┌─  Check if NPC is  */
/* ╠═╣│   │ │└┐┌┘├┤   ║  ├─┤├┤ │  ├┴┐  active, activate */
/* ╩ ╩└─┘ ┴ ┴ └┘ └─┘  ╚═╝┴ ┴└─┘└─┘┴ ┴  if not.          */
/********************************************************/
setup.isActive = function(npcid,restore){
  let active, result;
  if(State.active.variables.NPC[npcid] == null){
    return "nonexist"; //returns nonexist if null or undefined
  }
  if(State.active.variables.NPC[npcid] == "stored"){
    active = false;
    result = "stored";
  }else{
    active = true;
    result = "active";
  }
  if(!active && restore){
    let suc = true;
    try{
      setup.restoreNPC(npcid);
    }
    catch(e){
      let msg = "unable to restore NPC from isActive function error: "+e.name+": "+e.message;
      console.log(msg);
      if(State.active.variables.swim == "[dev]"){alert(msg);}
      suc = false;
    }
    if(suc){
      result = "restored";
    }
  }
  return result;
};