setup.defineSexPositions = function(){
  /*Variables used to define SexAct class object*/
  setup.sexPos = {};
  /*set up an object of subfunctions to define sex methods if undefined*/
  var funks = {};
  var cunt = 0;
  /*==========Start defining SexActs==========*/
  funks.standing = function(){
    var longName = "Standing";
    var keyName = "standing";
    var prime = {
      pcFacing: "front",
      npcFacing: "front",
      connected: false,
      pcConPoint: "none",
      npcConPoint: "none",
    };
    var tags = {
      placeholder: "fucker",
    };
    var cat = "makeout";
    var occupy = {
      pc: ["none"],
      npcMain: ["none"],
      npcSec: ["none"],
      npcTer: ["none"],
      npc1: ["none"],
      npc2: ["none"],
      npc3: ["none"],
      npc4: ["none"],
      npc5: ["none"],
      npc6: ["none"],
      npc7: ["none"],
      npc8: ["none"],
    };
    var effect = {
      placeholder: "fucker",
    };
    var action = function(){
      return true;
    };
    var req = {
      loc: ["none"],
      start: ["none"],
      pcCanAccess: ["none"],
      pcCanMouth: ["lips"],
      npcCanAccess: ["none"],
      npcCanMouth: ["lips"],
    };
    var jizz = "lower-front";
    var control = {
      placeholder: "fucker",
    };
    var inPos = {
      placeholder: "fucker",
    };
    var move = {
      placeholder: "fucker",
    };
    var wet = {
      placeholder: "fucker",
    };
    var sPace = 0;
    var library = {
      placeholder: "fucker",
    };
    var button = "Standing";
    var hovname = "StandingPositionHover";
    var hovtext = "Stand close to your partner/s.";
    /*create the SexAct class object*/
    cunt += 1;
    try{
      setup.sexPos.standing = new SexPos(longName,keyName,library,prime,tags,cat,occupy,effect,action,req,jizz,control,inPos,move,wet,sPace,hovname,hovtext,button);
    }
    catch(e){
      let mes = "initializing sexact "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  funks.holdClose = function(){
    var longName = "Hold Close";
    var keyName = "holdClose";
    var prime = {
      pcFacing: "front",
      npcFacing: "front",
      connected: false,
      pcConPoint: "none",
      npcConPoint: "none",
    };
    var tags = {
      placeholder: "fucker",
    };
    var cat = "makeout";
    var occupy = {
      pc: ["none"],
      npcMain: ["none"],
      npcSec: ["none"],
      npcTer: ["none"],
      npc1: ["none"],
      npc2: ["none"],
      npc3: ["none"],
      npc4: ["none"],
      npc5: ["none"],
      npc6: ["none"],
      npc7: ["none"],
      npc8: ["none"],
    };
    var effect = {
      placeholder: "fucker",
    };
    var action = function(){
      return true;
    };
    var req = {
      loc: ["none"],
      start: ["none"],
      pcCanAccess: ["none"],
      pcCanMouth: ["lips"],
      npcCanAccess: ["none"],
      npcCanMouth: ["lips"],
    };
    var jizz = "lower-front";
    var control = {
      placeholder: "fucker",
    };
    var inPos = {
      placeholder: "fucker",
    };
    var move = {
      placeholder: "fucker",
    };
    var wet = {
      placeholder: "fucker",
    };
    var sPace = 0;
    var library = {
      placeholder: "fucker",
    };
    var button = "Hold Close";
    var hovname = "HoldClosePositionHover";
    var hovtext = "Pull your partner close so that your whole bodies touch.";
    /*create the SexAct class object*/
    cunt += 1;
    try{
      setup.sexPos.holdClose = new SexPos(longName,keyName,library,prime,tags,cat,occupy,effect,action,req,jizz,control,inPos,move,wet,sPace,hovname,hovtext,button);
    }
    catch(e){
      let mes = "initializing sexact "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  funks.sitting = function(){
    var longName = "Sitting";
    var keyName = "sitting";
    var prime = {
      pcFacing: "front",
      npcFacing: "front",
      connected: false,
      pcConPoint: "none",
      npcConPoint: "none",
    };
    var tags = {
      placeholder: "fucker",
    };
    var cat = "makeout";
    var occupy = {
      pc: ["none"],
      npcMain: ["none"],
      npcSec: ["none"],
      npcTer: ["none"],
      npc1: ["none"],
      npc2: ["none"],
      npc3: ["none"],
      npc4: ["none"],
      npc5: ["none"],
      npc6: ["none"],
      npc7: ["none"],
      npc8: ["none"],
    };
    var effect = {
      placeholder: "fucker",
    };
    var action = function(){
      return true;
    };
    var req = {
      loc: ["none"],
      start: ["none"],
      pcCanAccess: ["none"],
      pcCanMouth: ["lips"],
      npcCanAccess: ["none"],
      npcCanMouth: ["lips"],
    };
    var jizz = "lower-front";
    var control = {
      placeholder: "fucker",
    };
    var inPos = {
      placeholder: "fucker",
    };
    var move = {
      placeholder: "fucker",
    };
    var wet = {
      placeholder: "fucker",
    };
    var sPace = 0;
    var library = {
      placeholder: "fucker",
    };
    var button = "Sit Down";
    var hovname = "sitPositionHover";
    var hovtext = "sit down somewhere I guess.";
    /*create the SexAct class object*/
    cunt += 1;
    try{
      setup.sexPos.sitting = new SexPos(longName,keyName,library,prime,tags,cat,occupy,effect,action,req,jizz,control,inPos,move,wet,sPace,hovname,hovtext,button);
    }
    catch(e){
      let mes = "initializing sexact "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  var n = 2;/*Object.keys(funks).length;*/
  for(let i = 0, k = Object.keys(funks); i < n; i++){
    setTimeout(funks[k[i]]);
  }
  /*var backupPlan = function(){
    if(cunt < n){
      let c = cunt;
      cunt += n;
      let msg = "For some reason the sex position initialization function timed out... "+c+" "+n;
      alert(msg);
      console.log(msg);
    }
  }
  setTimeout(backupPlan(),5000);
  while(cunt<n);*/
};