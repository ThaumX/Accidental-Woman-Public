/*
/  ██████╗  █████╗ ██████╗ ███████╗███████╗██████╗
/  ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗
/  ██████╔╝███████║██████╔╝███████╗█████╗  ██████╔╝
/  ██╔═══╝ ██╔══██║██╔══██╗╚════██║██╔══╝  ██╔══██╗
/  ██║     ██║  ██║██║  ██║███████║███████╗██║  ██║
/  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
*/

/*********************************************************************
Macros - p for player, n for npc
arg 0: NPC ID or activeNPC index to use. (set to player for <<p macro)
arg 1: parser call (command) determining what to return.
arg [...] optional modifier settings for the parser.
*********************************************************************/

Macro.add("p", {
  handler: function () {
    if(this.args.length < 1){
      return this.error("The player parser requires at least 1 argument to generate output.");
    }
    let out;
    if(this.args.length > 1){
      let arg = [];
      for(let i = 1, c = this.args.length; i < c; i++){
        arg.push(this.args[i]);
      }
      out = aw.parse(false, this.args[0], arg);
    }else{
      out = aw.parse(false, this.args[0]);
    }
    if(!out){
      out = "[PARSE ERROR]";
    }
    return new Wikifier(this.output, out);
  }
});

Macro.add("n", {
  handler: function () {
    if(this.args.length < 1){
      return this.error("The NPC parser requires at least 2 arguments to generate output.");
    }
    let out,npc = this.args[0];
    if("number" === typeof npc){
      //check if valid
      if(npc < 0 || npc > 9){
        return this.error(`Parser error - Out-of-bounds NPC index(${npc}). Must be 0 to 9.`);
      }else if(npc >= State.active.variables.activeNPC.length){
        //TODO convert to soft fail w/ console error (reduce index val) when parser more mature.
        return this.error(`Parser error - Invalid NPC index (${npc}). No NPC active at that index. (total NPCs ${State.active.variables.activeNPC.length}).`);
      }
    }else if("string" === typeof npc){
      //check if valid
      if(!State.active.variables.activeNPC.includes(npc)){
        return this.error(`Parser error - NPC "${npc}" isn't active or doesn't exist.`);
      }
    }else{
      return this.error("Invalid NPC id given to parser macro, must be index # or npcid.");
    }
    if(this.args.length > 2){
      let arg = [];
      for(let i = 2, c = this.args.length; i < c; i++){
        arg.push(this.args[i]);
      }
      out = aw.parse(npc, this.args[1], arg);
    }else{
      out = aw.parse(npc, this.args[1]);
    }
    if(!out){
      out = "[PARSE ERROR]";
    }
    return new Wikifier(this.output, out);
  }
});

aw.parse = function(npc,cmd,...args){
  var Ꜹ = State.active.variables; //sortcut reference
  var target = getReference(); //get ref to target - function is hoisted
  /*NOUN LIBRARY*/
  var noun = {
    ass: function(){},
    asshole: function(){},
    buttcheek: function(){},
    buttcheeks: function(){},
    breast: function(){},
    breasts: function(){},
    chest: function(){},
    titjob: function(){},
    cock: function(){},
    cocks: function(){},
  };
  var motion = {
    tithang: function(){},
    titbounce: function(){},
    titswing: function(){},
  };
  /*UTILITY FUNCTIONS*/
  function parseCommands(){}
  function parseArguments(){}
  function getReference(){
    if(!npc){
      return State.active.variables.PC; //returns PC object reference
    }
    if("string" === typeof npc && npc === "word"){
      return false; //returns a false value to trigger generic word search
    }
    if("string" === typeof npc && Ꜹ.activeNPC.includes(npc)){
      return State.active.variables.NPC[npc]; //returns ref to specific NPC
    }
    if("number" === typeof npc && npc >= 0 && npc < Ꜹ.activeNPC.length){
      return State.active.variables.NPC[Ꜹ.activeNPC[npc]]; //returns ref to specific NPC (based on index)
    }
    if("object" === typeof npc && !Array.isArray(npc) && Object.keys(npc).includes("body") && Object.keys(npc).includes("status")){
      return npc; //in weird case that an NPC ref is passed to the parser for some reason
    }
    return new ReferenceError("Parser: Unable to return reference to npc based on supplied argument.");
  }
};