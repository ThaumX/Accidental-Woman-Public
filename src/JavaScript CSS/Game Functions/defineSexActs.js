setup.defineSexActs = function(){
  /*Variables used to define SexAct class object
  var name; //pretty name of act
  var key; //variable key name
  var library; //action text
  var effect = { //object with effects that are interpreted by control
    arousal: [20,0], //strength of action to increase arousal [pc,npc]
    wetness: [0,20], //strength of action to increase wetness [pc,npc]
    satisfy: [0,0], //modifier to satisfaction gain from orgasm this way. [pc,npc]
    cumDest: "default", //can override cum destination from position.
    strong: ["none"], //list of traits/kinks that enhance effect
    strongNPC: ["none"], //list of traits/kinks that enhance effect
    weak: ["none"], //list of traits/kinks that decrease effect
    weakNPC: ["none"], //list of traits/kinks that decrease effect
  };
  var tags; //tags for the action
  var cat; //category of sex act for tracking activities
  var button; //button text
  var hovname; //unique identifier for specific act
  var hovtext; //description of action for hover text
  var action; //function that mods variables
  var allowList; //list of relevant keys for content blocking
  var req; //object containing tag requirements for action
  req.loc; //required location tags like furnature
  req.pos; //required position tags
  req.pcCanAccess; //required body access tags by pc hands to npc bodypart
  req.pcCanMouth; //required access by pc mouth to npc bodypart
  req.npcCanAccess; //required access ny npc to pc's bodypart
  req.npcCanMouth; //required access by npc mouth to pc's bodypart
  var tab; //number, tab to be displayed on 1=touch, 2=kiss, 3=speak, 4=move, 5=kink, 6=other
  */
  /*define sexAct object only if undefined or not an object*/
  setup.sexActs = {};
  /*set up an object of subfunctions to define sex methods if undefined*/
  var funks = {};
  var cunt = 0;
  /*==========Start defining SexActs==========*/
  funks.passKiss = function(){
    var name = "passionate kiss";
    var keyName = "passKiss";
    var tags = ["distracting"];
    var cat = "kiss";
    var button = "Passionate_Kiss";
    var hovname = "PassionateKissHover";
    var hovtext = "Kiss the targeted person passionately.";
    var allowList = ["none"];
    var req = {
      loc: ["none"],
      pos: ["none"],
      pcCanAccess: ["none"],
      pcCanMouth: ["lips"],
      npcCanAccess: ["none"],
      npcCanMouth: ["lips"],
    };
    var tab = 2;
    var effect = {
      arousal: [3,3],
      wetness: [2,2],
      satisfy: 0,
      cumDest: "default",
      strong: ["romantic"],
      strongNPC: ["romantic"],
      weak: ["unromantic"],
      weakNPC: ["unromantic"],
    };
    var action = function(){
      var pl = 5, pln = 5, max = 0.2;
      var rom = State.active.variables.PC.trait.romantic;
      if(rom == 1){rom=2;}
      pl += rom;
      setup.sex.pleasure(pl,max);
      setup.sex.pleasure(pln,max,true);
    };
    var library = {
      main: {
        a: "placeholder main description a.",
        b: "placeholder main description b.",
        c: "placeholder main description c."
      }, /*primary descriptive text*/
      lesbian: {
        a: "placeholder lesbian des a.",
        b: "placeholder lesbian des b."
      }, /*special text for lesbian kissing*/
      noncon: {
        a: "placeholder rapin' npc a",
        b: "placeholder rapin' npc b"
      }, /*special text for raping npc*/
      openPublic: {
        a: "placeholder for making out in public openly a",
        b: "placeholder for making out in public openly a"
      },
      public: {
        a: "placeholder for secretly doing shit in public a",
        b: "placeholder for secretly doing shit in public a"
      }
    };
    cunt++;
    /*create the SexAct class object*/
    try{
      setup.sexActs.passKiss = new SexAct(name,keyName,library,effect,tags,cat,button,hovname,hovtext,action,allowList,req,tab);
    }
    catch(e){
      let mes = "sexacts "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  funks.muteMast = function(){
    var name = "mutual masturbation";
    var keyName = "muteMast";
    var tags = ["distracting"];
    var cat = "kiss";
    var button = "Mutual_Fap";
    var hovname = "funfunfapHover";
    var hovtext = "Play with each other's genitals until something good happens.";
    var allowList = ["none"];
    var req = {
      loc: ["none"],
      pos: ["none"],
      pcCanAccess: ["none"],
      pcCanMouth: ["none"],
      npcCanAccess: ["none"],
      npcCanMouth: ["none"],
    };
    var tab = 2;
    var effect = {
      arousal: [3,3],
      wetness: [2,2],
      satisfy: 0,
      cumDest: "default",
      strong: ["romantic"],
      strongNPC: ["romantic"],
      weak: ["unromantic"],
      weakNPC: ["unromantic"],
    };
    var action = function(){
      var pl = 100, pln = 90, max = 1;
      setup.sex.pleasure(pl,max);
      setup.sex.pleasure(pln,max,true);
    };
    var library = {
      main: {
        a: "placeholder fapper description a.",
        b: "placeholder main description b.",
        c: "placeholder main description c."
      }, /*primary descriptive text*/
      lesbian: {
        a: "placeholder lesbian des a.",
        b: "placeholder lesbian des b."
      }, /*special text for lesbian kissing*/
      noncon: {
        a: "placeholder rapin' npc a",
        b: "placeholder rapin' npc b"
      }, /*special text for raping npc*/
      openPublic: {
        a: "placeholder for making out in public openly a",
        b: "placeholder for making out in public openly a"
      },
      public: {
        a: "placeholder for secretly doing shit in public a",
        b: "placeholder for secretly doing shit in public a"
      }
    };
    cunt++;
    /*create the SexAct class object*/
    try{
      setup.sexActs.muteMast = new SexAct(name,keyName,library,effect,tags,cat,button,hovname,hovtext,action,allowList,req,tab);
    }
    catch(e){
      let mes = "sexacts "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  funks.pushAgainst = function(){
    var name = "push against";
    var keyName = "pushAgainst";
    var tags = ["none"];
    var cat = "hug";
    var button = "Push Against";
    var hovname = "PushAgainstHover";
    var hovtext = "Push your body up close to the target, providing firm contact with your more delicate areas.";
    var allowList = ["none"];
    var req = {
      loc: ["none"],
      pos: ["specific","standing","holdClose"],
      pcCanAccess: ["none"],
      pcCanMouth: ["none"],
      npcCanAccess: ["none"],
      npcCanMouth: ["none"],
    };
    var tab = 1;
    var effect = {
      arousal: [3,3],
      wetness: [2,2],
      satisfy: 0,
      cumDest: "default",
      strong: ["romantic"],
      strongNPC: ["romantic"],
      weak: ["unromantic"],
      weakNPC: ["unromantic"],
    };
    var action = function(){
      var pl = 10, pln = 5, max = 0.5;
      var rom = State.active.variables.PC.trait.romantic;
      if(rom == 1){rom=2;}
      pl += rom;
      setup.sex.pleasure(pl,max);
      setup.sex.pleasure(pln,max,true);
    };
    var library = {
      main: {
        a: "placeholder main description a.",
        b: "placeholder main description b.",
        c: "placeholder main description c."
      }, /*primary descriptive text*/
      lesbian: {
        a: "placeholder lesbian des a.",
        b: "placeholder lesbian des b."
      }, /*special text for lesbian kissing*/
      noncon: {
        a: "placeholder rapin' npc a",
        b: "placeholder rapin' npc b"
      }, /*special text for raping npc*/
      openPublic: {
        a: "placeholder for making out in public openly a",
        b: "placeholder for making out in public openly a"
      },
      public: {
        a: "placeholder for secretly doing shit in public a",
        b: "placeholder for secretly doing shit in public a"
      }
    };
    cunt++;
    /*create the SexAct class object*/
    try{
      setup.sexActs[keyName] = new SexAct(name,keyName,library,effect,tags,cat,button,hovname,hovtext,action,allowList,req,tab);
    }
    catch(e){
      let mes = "sexacts "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  funks.rubBulge = function(){
    var name = "rub bulge";
    var keyName = "rubBulge";
    var tags = ["none"];
    var cat = "handjob";
    var button = "Rub Bulge";
    var hovname = "RubBulgeHover";
    var hovtext = "Give the target's package a little attention through their clothes.";
    var allowList = ["none"];
    var req = {
      loc: ["none"],
      pos: ["none"],
      pcCanAccess: ["groin"],
      pcCanMouth: ["none"],
      npcCanAccess: ["none"],
      npcCanMouth: ["none"],
    };
    var tab = 1;
    var effect = {
      arousal: [3,3],
      wetness: [2,2],
      satisfy: 0,
      cumDest: "default",
      strong: ["romantic"],
      strongNPC: ["romantic"],
      weak: ["unromantic"],
      weakNPC: ["unromantic"],
    };
    var action = function(){
      var pl = 0, pln = 15, max = 0.8;
      var rom = State.active.variables.PC.trait.romantic;
      if(rom == 1){rom=2;}
      pl += rom;
      //setup.sex.pleasure(pl,max);
      setup.sex.pleasure(pln,max,true);
    };
    var library = {
      main: {
        a: "placeholder main description a.",
        b: "placeholder main description b.",
        c: "placeholder main description c."
      }, /*primary descriptive text*/
      lesbian: {
        a: "placeholder lesbian des a.",
        b: "placeholder lesbian des b."
      }, /*special text for lesbian kissing*/
      noncon: {
        a: "placeholder rapin' npc a",
        b: "placeholder rapin' npc b"
      }, /*special text for raping npc*/
      openPublic: {
        a: "placeholder for making out in public openly a",
        b: "placeholder for making out in public openly a"
      },
      public: {
        a: "placeholder for secretly doing shit in public a",
        b: "placeholder for secretly doing shit in public a"
      }
    };
    cunt++;
    /*create the SexAct class object*/
    try{
      setup.sexActs[keyName] = new SexAct(name,keyName,library,effect,tags,cat,button,hovname,hovtext,action,allowList,req,tab);
    }
    catch(e){
      let mes = "sexacts "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  funks.encourage = function(){
    var name = "encourage";
    var keyName = "encourage";
    var tags = ["none"];
    var cat = "handjob";
    var button = "Encourage";
    var hovname = "EncourageHover";
    var hovtext = "Encourage your target to be a little more bold or pick up the pace.";
    var allowList = ["none"];
    var req = {
      loc: ["none"],
      pos: ["none"],
      pcCanAccess: ["none"],
      pcCanMouth: ["none"],
      npcCanAccess: ["none"],
      npcCanMouth: ["none"],
    };
    var tab = 3;
    var effect = {
      arousal: [3,3],
      wetness: [2,2],
      satisfy: 0,
      cumDest: "default",
      strong: ["romantic"],
      strongNPC: ["romantic"],
      weak: ["unromantic"],
      weakNPC: ["unromantic"],
    };
    var action = function(){
      var pl = 0, pln = 0, max = 0.8;
    };
    var library = {
      main: {
        a: "Exasperated, you shout <span class='pc'>Hurry the fuck up!!!</span>",
        b: "placeholder main description b.",
        c: "placeholder main description c."
      }, /*primary descriptive text*/
      lesbian: {
        a: "placeholder lesbian des a.",
        b: "placeholder lesbian des b."
      }, /*special text for lesbian kissing*/
      noncon: {
        a: "placeholder rapin' npc a",
        b: "placeholder rapin' npc b"
      }, /*special text for raping npc*/
      openPublic: {
        a: "placeholder for making out in public openly a",
        b: "placeholder for making out in public openly a"
      },
      public: {
        a: "placeholder for secretly doing shit in public a",
        b: "placeholder for secretly doing shit in public a"
      }
    };
    cunt++;
    /*create the SexAct class object*/
    try{
      setup.sexActs[keyName] = new SexAct(name,keyName,library,effect,tags,cat,button,hovname,hovtext,action,allowList,req,tab);
    }
    catch(e){
      let mes = "sexacts "+keyName+" failed with error: "+e;
      console.log(mes);
      alert(mes);
    }
  };
  /**************************************************************************/
  /*  End of def functions, now run them                                    */
  /**************************************************************************/
  let n = Object.keys(funks).length;
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