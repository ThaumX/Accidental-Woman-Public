/*do not use double-slash comments! it will break things*/
Macro.add("assSize", {
  handler : function() {
    var char, val, output;
    /*this little bit here checks the incomming argument to make sure it's the right amount and type. The original widget didn't have arguments, because it only checked the pc, however this javascript version will be able to check NPCs too so requires an argument to specify which ass size to use*/
    /*in order, this checks if the arguments are none, if so, it assumes the PC and sets 'char' to 0. it then checks if there are 2 or more arguments, which is too many, and indicate that there has been a mistake. In that case, it returns an error object with the details in the quotes. it shows up as red-highlighted text in-game. Then it makes sure that the supplied argument isn't a string, which might accidentally happen with a contributing writer or something, and returns an error. finally, if no errors were found, it sets 'char' to the supplied argument.*/
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    /*you can basically copy this code for other parser macros that use arguments. I want to convert all the "pc" widgets into general "assSize" type macros. You don't need to worry about the NPC part for now.*/
    if(char == 0){
      /*setting value from PC variable. Notice that it's still PC.ass, but instead of $ we use State.active.variables.[whatever] to access game variables.*/
      val = State.active.variables.PC.body.ass;
    }else if(char <= 10){
      /*I will do stuff here later.*/
    }else{
      /*same here. this will lookup arg from NPC id*/
    }
    /*we pre-set output to a soft-fail value. This is in case the supplied variable exceeds the expected range. Unknown lets us know, without causing a big annoying error message.*/
    output = "unknown";
    /*now check the value - note that either() is a function that just returns one of a list of supplied arguments.*/
    switch(val){
      case 1:
        output = either("flat","nonexistent");
        break;
      case 2:
        output = either("small","insubstantial");
        break;
      case 3:
        output = either("average","normal","healthy");
        break;
      case 4:
        output = either("above-average","plump","sexy");
        break;
      case 5:
        output = either("large","substantial","huge");
        break;
      case 6:
        output = either("massive","gigantic","enormous");
        break;
    }
    /*now we check if output is still unknown and write some info if so to the console log for debugging.*/
    if(output == "unknown"){
      var er = "did not match ass size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("pussySize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.pussy;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 0:
        output = either("virgin","unused","virgin");
        break;
      case 1:
        output = either("tight","inexperienced","tight");
        break;
      case 2:
        output = either("average","normal","healthy");
        break;
      case 3:
        output = either("loose","well-used","experienced");
        break;
      case 4:
        output = either("gaping","stretched-out","gaping");
        break;
      case 5:
        output = either("cavernous","abused","wide-open");
        break;
    }
    if(output == "unknown"){
      var er = "did not match pussy size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("boobSize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.tits.cupNum;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 0:
        output = either("nonexistent","flat");
        break;
      case 1:
      case 2:
      case 3:
        output = either("budding","minuscule");
        break;
      case 4:
      case 5:
      case 6:
        output = either("tiny","very small");
        break;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        output = either("small","compact");
        break;
      case 12:
      case 13:
      case 14:
        output = either("below-average","slightly-small");
        break;
      case 15:
      case 16:
      case 17:
        output = either("average","healthy");
        break;
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
        output = either("above-average","full");
        break;
      case 24:
      case 25:
      case 26:
        output = either("large","big","heavy");
        break;
      case 27:
      case 28:
      case 29:
        output = either("huge","ponderous");
        break;
      case 30:
      case 31:
      case 32:
        output = either("enormous","massive");
        break;
      case 33:
      case 34:
      case 35:
        output = either("gigantic","titanic","gargantuan");
        break;
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
        output = either("titanic","gargantuan","humongous");
        break;
      default:
        output = either("unbelievably-large","ridiculously-big");
        break;
    }
    if(output == "unknown"){
      var er = "did not match boob size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("cupSize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.tits.cup;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = val;
    return output;
  }
});
Macro.add("braSize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.tits.bra;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = val;
    return output;
  }
});
Macro.add("chest", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.tits.cupNum;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 0:
        output = either("a strangely-flat chest");
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        output = either("a tiny pair of budding breasts");
        break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        output = either("a compact set of small breasts");
        break;
      case 12:
      case 13:
      case 14:
        output = either("a healthy set of below-average breasts");
        break;
      case 15:
      case 16:
      case 17:
        output = either("an average pair of healthy breasts");
        break;
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
        output = either("an above-average pair of healthy breasts");
        break;
      case 24:
      case 25:
      case 26:
        output = either("a big pair of full breasts");
        break;
      case 27:
      case 28:
      case 29:
        output = either("a heavy set of large breasts");
        break;
      case 30:
      case 31:
      case 32:
        output = either("a ponderous pair of huge breasts");
        break;
      case 33:
      case 34:
      case 35:
        output = either("two gigantic masses of breast-flesh");
        break;
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
        output = either("two sublime mountains of breast");
        break;
      default:
        output = either("two unbelievably-enormous breasts");
        break;
    }
    if(output == "two unbelievably-enormous breasts"){
      var er = "did not match cup number of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("shoulderSize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.shoulders;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 1:
        output = "narrow";
        break;
      case 2:
        output = "feminine";
        break;
      case 3:
        output = "average";
        break;
      case 4:
        output = "prominent";
        break;
      case 5:
        output = "broad";
        break;
      case 6:
        output = "extremely wide";
        break;
    }
    if(output == "unknown"){
      var er = "did not match shoulder size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("hipSize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.hips;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 1:
        output = "oddly narrow";
        break;
      case 2:
        output = "narrow";
        break;
      case 3:
        output = "svelte";
        break;
      case 4:
        output = "feminine";
        break;
      case 5:
        output = "broad";
        break;
      case 6:
        output = "broodmother-sized";
        break;
    }
    if(output == "unknown"){
      var er = "did not match hip size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("fertility", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.fert.fertility;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 0:
        output = "barren";
        break;
      case 1:
        output = "IUD-protected";
        break;
      case 2:
        output = "barely fertile";
        break;
      case 3:
        output = "fertile";
        break;
      case 4:
        output = "very fertile";
        break;
      case 5:
        output = "super fertile";
        break;
      case 6:
        output = "extremely fertile";
        break;
	  case 7:
        output = "insanely fertile";
        break;
	  case 8:
        output = "fertility goddess";
        break;
    }
    if(output == "unknown"){
      var er = "did not match fertility rate of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("tone", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.tone;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 1:
        output = "frail";
        break;
      case 2:
        output = "weak";
        break;
      case 3:
        output = "normal";
        break;
      case 4:
        output = "toned";
        break;
      case 5:
        output = "muscular";
        break;
      case 6:
        output = "body-builder";
        break;
    }
    if(output == "unknown"){
      var er = "did not match tone size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("weight", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.weight;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 1:
        output = "anorexic";
        break;
      case 2:
        output = "skinny";
        break;
      case 3:
        output = "lithe";
        break;
      case 4:
        output = "plush";
        break;
      case 5:
        output = "chubby";
        break;
      case 6:
        output = "fat";
        break;
    }
    if(output == "unknown"){
      var er = "did not match weight of " + char + " with value of " + val + " on passage " + passage(); 
      console.log(er);
    }
    return output;
  }
});
Macro.add("clitSize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.clit;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 1:
        output = either("small","tiny","vestigial");
        break;
      case 2:
        output = either("average","normal","healthy");
        break;
      case 3:
        output = either("large","big","above-average");
        break;
      case 4:
        output = either("huge","giant");
        break;
      case 5:
        output = either("enormous","massive");
        break;
      }
    if(output == "unknown"){
      var er = "did not match clit size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("wetness", {
  handler : function() {
    var char, val, output, temp;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.wetness;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    /* temp = val? */
	if(this.args[0] == undefined || this.args[0] == 0){
		temp = State.active.variables.PC.body.wetness;
	}else{
		temp = State.active.variables.PC.body.wetness + this.args[0];
		if(temp>5){temp = 5;}
	}
	output = "unknown";
    switch(temp){
      case 1:
        output = "dry";
        break;
      case 2:
        output = either("moist","damp","moist");
        break;
      case 3:
        output = either("wet","well-lubricated","wet");
        break;
      case 4:
        output = either("dripping","soaked","puddling");
        break;
      case 5:
        output = either("flooding","pouring","drenched");
        break;
      }
    if(output == "unknown"){
      var er = "did not match the wetness of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("labiaSize", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.labia;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 0:
        output = either("nonexistent","imaginary");
        break;
      case 1:
        output = either("minimal","tiny","hidden");
        break;
      case 2:
        output = either("average","normal");
        break;
      case 3:
        output = either("large","protruding","big");
        break;
      case 4:
        output = either("dangling","huge","stretched-out");
        break;
    }
    if(output == "unknown"){
      var er = "did not match labia size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("clitView", {
  handler : function() {
    var char, val, output, labia;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
	  val = State.active.variables.PC.body.clit;
	  labia = State.active.variables.PC.body.labia;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
	output = "unknown";
    if(labia>=val){
		output = "is hidden by";
	} else if(labia == val){
		output = "peeks out of";
	} else{
		output = "protrudes proudly from";
	}
    return output;
  }
});
Macro.add("waist", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.waist;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    switch(val){
      case 1:
        output = either("unusual","straight","disproportionate","thick");
        break;
      case 2:
        output = either("masculine","manly","masculine","sturdy");
        break;
      case 3:
        output = either("feminine","womanly","normal","curved");
        break;
      case 4:
        output = either("hourglass","alluring","enticing");
        break;
    }
    if(output == "unknown"){
      var er = "did not match waist size of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("beauty", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.beauty;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    switch(val){
      case 2:
        output = either("is mediocre in looks","is a tad humdrum","has passable looks");
        break;
      case 3:
        output = either("is definitely attractive","is rather appealing");
        break;
      case 4:
        output = either("is noticeably beautiful","is alluringly beautiful");
        break;
      case 5:
        output = either("is stunningly gorgeous","is exquisitely gorgeous");
        break;
      default:
        output = either("is rather unattractive","is somewhat off-putting","is unfortunately ugly");
        break;
    }
	  if(output == "unknown"){
      var er = "did not match the beauty value of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("faceDescript", {
  handler : function() {
    var char, val, output, outputB, temp, face;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.beauty;
      face = State.active.variables.PC.body.face;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    outputB = "unknown";
    if(val == 5){
		temp = 2;
		output = either("is stunningly gorgeous","is exquisitely gorgeous");
	}else if(val == 4){
		temp = 1;
		output = either("is noticeably beautiful","is alluringly beautiful");
	}else if(val == 3){
		temp = 1;
		output = either("is definitely attractive","is rather appealing");
	}else if(val == 2){
		temp = 0;
		output = either("is mediocre in looks","is a tad humdrum","has passable looks");
	}else{
		temp = 0;
		output = either("is rather unattractive","is somewhat off-putting","is unfortunately ugly");
	}
	if(temp == 2){
	  switch(face){
	    case "normal":
			outputB = " according to classical standards";
			break;
		case "androgynous":
			outputB = " despite your ambiguous features";
			break;
		case "cute":
			outputB = " but somehow remains open and approachable";
			break;
		case "sensual":
			outputB = " and so enticingly sensual that its almost sexual";
			break;
		case "exotic":
			outputB = " despite your unusual features";
			break;
		}
	} else if(temp == 1){
	    switch(face){
		  case "normal":
			outputB = " to the average person";
			break;
		  case "androgynous":
			outputB = " thanks to a fortunate mix of male and female features";
			break;
		  case "cute":
			outputB = " and the perfect picture of 'the girl next door'";
			break;
		  case "sensual":
			outputB = " and enticingly sensual";
			break;
		  case "exotic":
			outputB = " thanks to exotic features that draw the eye";
			break;
		}
	}else if(temp == 0){
	    switch(face){
		  case "normal":
			outputB = " to the average person";
			break;
		  case "androgynous":
			outputB = ", and is confusingly ambiguous";
			break;
		  case "cute":
			outputB = ", though its warmth makes it more appealing";
			break;
		  case "sensual":
			outputB = ", though it has a certain animal magnetism";
			break;
		  case "exotic":
			outputB = " with unusual features that set you apart";
			break;
		}
	}
    if(output == "unknown" || outputB == "unknown"){
      var er = "did not match face description of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output + outputB;
  }
});
Macro.add("like", {
  handler : function() {
    var output, temp;
    if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if(this.args.length < 1){
      return this.error("Insufficient arguments specified!");
    }else{
      temp = setup.varanal(this.args[0]);
    }
    if("string" ==typeof temp){
      return this.error("only numeric values allowed.");
    }
    output = "unknown";
    switch(temp){
      case -2:
        output = "hate";
        break;
	  case -1:
        output = "dislike";
        break;
	  case 0:
        output = "neutral";
        break;
      case 1:
        output = "like";
        break;
      case 2:
        output = "love";
        break;
      }
    if(output == "unknown"){
      var er = "unable to determine like with value of " + temp + "! original variable: " + this.args[0];
      console.log(er);
      alert(er);
    }
    return new Wikifier(this.output,output);
  }
});
Macro.add("nipple", {
  handler : function() {
    var char, val, output, temp;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.tits.nipple;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "rather unusual";
    switch(val){
      case "normal":
        output = either("delicate","alluring");
        break;
      case "large":
        output = either("large","motherly");
        break;
      case "inverted":
        output = either("normally-hidden","shy");
        break;
      case "puffy":
        output = either("delectable","enticingly full","beautiful");
        break;
      case "huge":
        output = either("cow-like","huge");
        break;
    }
	if (State.active.variables.PC.kink.nips){
		temp = either(1,2,3);
		if(temp == 1){
			output += " and very sensitive";
		}
	}
    return output;
  }
});
Macro.add("titShape", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.body.tits.shape;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "rather unusual";
    switch(val){
      case "round":
        output = either("rounded","shapely");
        break;
      case "perky":
        output = either("youthful","perfectly-formed","perky");
        break;
      case "firm":
        output = either("firm","sturdy");
        break;
      case "protruding":
        output = either("proudly standing","gravity-defying");
        break;
      case "wide-set":
        output = either("outward-facing","wide-set");
        break;
    }
    return output;
  }
});
Macro.add("curArousal", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.status.arousal;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "arousal function bug";
    switch(val){
	  case -6:
	  case -5:
        output = "disturbed";
        break;
	  case -4:
	  case -3:
        output = "disgusted";
        break;
	  case -2:
	  case -1:
        output = "repulsed";
        break;
	  case 0:
	  case 1:
        output = "not aroused";
        break;
	  case 2:
	  case 3:
        output = "slight";
        break;
	  case 4:
	  case 5:
        output = "moderate";
        break;
      case 6:
      case 7:
        output = "strong";
        break;
      case 8:
      case 9:
        output = "desperate";
        break;
      case 10:
      case 11:
        output = "extreme";
        break;
      case 12:
      case 13:
        output = "uncontrollable";
        break;
      case 14:
      case 15:
        output = "mad with lust";
        break;
    }
    if(output == "arousal function bug"){
      var er = "did not match the amount of arousal of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("libido", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.trait.libido;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "Libido function bug";
    switch(val){
      case 1:
        output = "practically asexual";
        break;
      case 2:
        output = "weak";
        break;
      case 3:
        output = "average";
        break;
      case 4:
        output = "above average";
        break;
      case 5:
        output = "strong";
        break;
      case 6:
        output = "very strong";
        break;
	  case 7:
        output = "insatiable";
        break;
	  case 8:
	  case 9:
        output = "uncontrollable";
        break;
	  case 10:
	  case 11:
	  case 12:
        output = "Nymphomania";
        break;
    }
    if(output == "Libido function bug"){
      var er = "did not match libido of " + char + " with value of " + val + " on passage " + passage(); 
      console.log(er);
    }
    return output;
  }
});
Macro.add("pubes", {
  handler : function() {
    var char, val, output, temp;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.groom.pubeStyle;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "unknown";
    if(this.args[0] == undefined || this.args[0] == 0){
		switch(val){
		  case "hairless":
			output = "the smooth skin of your hairless crotch.";
			break;
		  case "bushy":
			output = "the damp tangle of your overgrown bush.";
			break;
		  case "trimmed":
			output = "your damp manicured bush.";
			break;
		  case "neatly trimmed":
			output = "the short hair of your neatly-trimmed pubes.";
			break;
		  case "landing strip":
			temp = either(1,2,3);
			if(temp == 1){
				output = "the narrow strip of short hair that leads the way to your eager cunt.";
			}else{
				output = "the narrow strip of short hair above your slit.";
			}
			break;
		  case "triangular":
			temp = either(1,2,3);
			if(temp == 1){
				output = "the neatly-shaped triangle of short hair.";
			}else{
				output = "the neatly-shaped triangle of short hair that points the way to your eager cunt.";
			}
			break;
		  case "neat patch":
			temp = either(1,2,3);
			if(temp == 1){
				output = "the patch of short hair.";
			}else{
				output = "the patch of short hair above your eager cunt.";
			}
			break;
		  case "shaved":
			output = "a hint of stubble from your shaved snatch.";
			break;
		}
	}else if(this.args[0] == 1){
		switch(val){
		  case "bushy":
			output = "The damp tangle of your overgrown bush";
		    break;
		  case "trimmed":
			output = "The short hair of your neatly-trimmed pubes";
		    break;
		  case "landing strip":
			temp = either(1,2,3);
			if(temp == 1){
				output = "Your narrow strip of short hair that leads the way to your eager cunt";
			}else{
				output = "Your narrow strip of short hair above your slit";
			}
		    break;
		  case "triangular":
			temp = either(1,2,3);
			if(temp == 1){
				output = "Your neatly-shaped triangle of short hair that points the way to your eager cunt";
			}else{
				output = "Your neatly-shaped triangle of short hair";
			}
		    break;
		  case "neat patch":
			temp = either(1,2,3);
			if(temp == 1){
				output = "Your neatly-trimmed patch of short hair above your eager cunt";
			}else{
				output = "Your neatly-trimmed patch of short hair";
			}
		    break;
		  case "shaved":
			output = "The stubble from your shaved snatch";
		    break;
		  case "hairless":
			output = "The smooth skin of your hairless snatch";
		    break;
		}
	}
    if(output == "unknown"){
      var er = "did not match pubes style of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
Macro.add("hairCurl", {
  handler : function() {
    var char, val, output;
    if(this.args.length<1){char = 0;}else if(this.args.length>1){
      return this.error("too many arguments specified!");
    }else if("string" == typeof this.args[0]){
      return this.error("only numeric values allowed. use 0 for pc, 1-10 for active npcs, or full npc id number.");
    }else{
      char = this.args[0];
    }
    if(char == 0){
      val = State.active.variables.PC.groom.hairCurl;
    }else if(char <= 10){
      /*waiting*/
    }else{
      /*waiting*/
    }
    output = "pc hair curl parser error";
    switch(val){
      case 0:
        output = "straight";
        break;
      case 1:
        output = "slightly wavy";
        break;
      case 2:
        output = "wavy";
        break;
      case 3:
        output = "slightly curly";
        break;
      case 4:
        output = "curly";
        break;
      case 5:
        output = "very curly";
        break;
      case 6:
        output = "kinked";
        break;
    }
    if(output == "unknown"){
      var er = "did not match hair style of " + char + " with value of " + val + " on passage " + passage();
      console.log(er);
    }
    return output;
  }
});
