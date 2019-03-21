/*************************************************************/
/*  ╔═╗┌┬┐┌─┐┬─┐┌─┐  ╔╗╔╔═╗╔═╗┌─┐      Accidental Woman      */
/*  ╚═╗ │ │ │├┬┘├┤   ║║║╠═╝║  └─┐           ThaumX           */
/*  ╚═╝ ┴ └─┘┴└─└─┘  ╝╚╝╩  ╚═╝└─┘                            */
/*  Functions to compress NPCs and other items using custom  */
/*  compression algorithm sequence. Can call from Macro too  */
/*************************************************************/

setup.storeNPC = function(npcid: npcid): boolean {
  if ("string" !== typeof npcid || npcid.search("n") !== 0) {
    const mess = "NPC storage function requires a valid npcid string!";
    console.log(mess);
    UI.alert(mess);
    return false;
  }
  const npc = setup.AW.compress(aw.npc[npcid]);
  if (npc === "error") {
    const msg = "NPC compression failed for NPC with id " + npcid
    + ".\n\nProcess aborted. Check the console log for details.";
    UI.alert(msg);
    return false;
  }
  /*load into local storage*/
  const id = "NPCStore-" + npcid;
  const success = setup.AW.localStore(id, npc);
  if (success) {
    setup.NPCStoreList.push(id);
    // aw.npc[npcid] = "stored";
    setup.npc.ready.delete(npcid);
    setup.npc.stored.push(npcid);
    return true;
  }
  return false; // something magical fucked up
};
setup.restoreNPC = function(npcid: npcid): boolean {
  if ("string" !== typeof npcid || npcid.search("n") !== 0) {
    const mess = "NPC storage function requires a valid npcid string!";
    setup.alert(mess);
    return false;
  }
  const id = "NPCStore-" + npcid;
  const npc = setup.AW.localRestore(id);
  if (npc === "error") {return false; }
  try {
    // aw.npc[npcid] = setup.AW.decompress(npc);
  } catch (e) {
    const msg = "Error setting story variable for some reason... " + e.name + ": " + e.message;
    aw.con.warn(msg);
    return false;
  }
  if ("string" === typeof aw.npc[npcid]) {
    const m = "NPC decompression failed for NPC with id " + npcid + ".\n" + aw.npc[npcid] + "\nProcess aborted.";
    aw.con.warn(m);
    return false;
  }
  /*cleanup*/
  setup.NPCStoreList.delete(id);
  setup.npc.ready.push(npcid);
  setup.npc.stored.delete(npcid);
  return true;
};
/*deep clone array to remove references*/
setup.bulkStoreNPC = function(npcidAr: npcid[]): void {
  /*const NPCs = [];
  for (let i = 0, c = npcidAr.length; i < c; i++) {
    NPCs.push(npcidAr[i]);
  }
  setTimeout(() => setup.asyncBulkStoreNPC(NPCs));*/
  return;
};
setup.asyncBulkStoreNPC = function(NPCs: npcid[]): void {
  let suc = true;
  const fail: string[] = [];
  let cunt = 0;
  let msg = "Some NPCs failed to store! IDs: ";
  let start = performance.now();
  for (let i = 0, c = NPCs.length; i < c; i++) {
    suc = setup.storeNPC(NPCs[i]);
    if (!suc) {
      fail.push(NPCs[i]);
      msg += (NPCs[i] + ", ");
    } else {
      cunt++;
    }
  }
  if (fail.length > 0) {
    aw.con.warn(msg);
    UI.alert(msg);
    State.temporary.failStore = fail;
  }
  start = Math.floor(performance.now() - start);
  console.log(("successfully stored " + cunt + " NPCs in " + start + "ms."));
};

/********************************************************/
/* ╔═╗┌─┐┌┬┐┬┬  ┬┌─┐  ╔═╗┬ ┬┌─┐┌─┐┬┌─  Check if NPC is  */
/* ╠═╣│   │ │└┐┌┘├┤   ║  ├─┤├┤ │  ├┴┐  active, activate */
/* ╩ ╩└─┘ ┴ ┴ └┘ └─┘  ╚═╝┴ ┴└─┘└─┘┴ ┴  if not.          */
/********************************************************/
setup.isActive = function(npcid: npcid, restore: boolean): string {
  let active;
  let result;
  if (aw.npc[npcid] == null) {
    return "nonexist"; // returns nonexist if null or undefined
  }
  active = true;
  result = "active";
  if (!active && restore) {
    let suc = true;
    try {
      setup.restoreNPC(npcid);
    } catch (e) {
      const msg = "unable to restore NPC from isActive function error: " + e.name + ": " + e.message;
      console.log(msg);
      if (State.active.variables.swim === "[dev]") {alert(msg); }
      suc = false;
    }
    if (suc) {
      result = "restored";
    }
  }
  return result;
};
