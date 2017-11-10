
//asynchronously copies relevant player variables
Macro.add('updatePlayerHistory', {
	   tags : null,
	handler : function () {
		var multicount = 0;
		var histPCcopy = function(){
			State.variables.PChistory.PC = jQuery.extend(true, {}, State.variables.PC);
			multicount++;
		};
		var histstatuscopy = function(){
			State.variables.PChistory.status = jQuery.extend(true, {}, State.variables.status);
			multicount++;
		};
		var histtraitcopy = function(){
			State.variables.PChistory.trait = jQuery.extend(true, {}, State.variables.trait);
			multicount++;
		};
		var histmutatecopy = function(){
			State.variables.PChistory.mutate = jQuery.extend(true, {}, State.variables.mutate);
			multicount++;
		};
		var histkinkcopy = function(){
			State.variables.PChistory.kink = jQuery.extend(true, {}, State.variables.kink);
			multicount++;
		};
		var histskillcopy = function(){
			State.variables.PChistory.skill = jQuery.extend(true, {}, State.variables.skill);
			multicount++;
		};
		var histitemcopy = function(){
			State.variables.PChistory.item = jQuery.extend(true, {}, State.variables.item);
			multicount++;
		};
		var histhomecopy = function(){
			State.variables.PChistory.home = jQuery.extend(true, {}, State.variables.home);
			multicount++;
		};
		var histjobcopy = function(){
			State.variables.PChistory.job = jQuery.extend(true, {}, State.variables.job);
			multicount++;
		};
		setTimeout(histPCcopy());
		setTimeout(histstatuscopy());
		setTimeout(histtraitcopy());
		setTimeout(histmutatecopy());
		setTimeout(histkinkcopy());
		setTimeout(histskillcopy());
		setTimeout(histitemcopy());
		setTimeout(histhomecopy());
		setTimeout(histjobcopy());
		while(multicount < 9);
	}
});
Macro.add("decodeTime", {
  handler : function() {
    if(this.args.length<1){
      return this.error("No argument supplied to time decode function.");
    }
    if( "string" !=typeof this.args[0]){
      State.temporary["dhour"] = Math.floor(this.args[0]/100);
			State.temporary["dmin"] = this.args[0] % 100;
			if(State.temporary["dmin"] >= 60){
				State.temporary["dhour"] += 1;
				State.temporary["dmin"] -= 60;
			}
    }else{
			return this.error("String passed to time decode function.");
		}
  }
});
Macro.add("decodeTimeDif", {
  handler : function() {
    if(this.args.length<2){
      return this.error("Missing argument/s supplied to time decode difference function.");
    }
    if( "string" !=typeof this.args[0] && "string" !=typeof this.args[1]){
			var startHour = Math.floor(this.args[0]/100);
			var startMin = this.args[0] % 100;
			if(startMin >= 60){
				startHour += 1;
				startMin -= 60;
			}
			var endHour = Math.floor(this.args[1]/100);
			var endMin = this.args[1] % 100;
			if(endMin >= 60){
				endHour += 1;
				endMin -= 60;
			}
			var difMin = 0;
			difMin += (endHour - startHour) * 60;
			difMin += endMin - startMin;
			State.temporary["difMinTotal"] = Math.abs(difMin);
			State.temporary["difHour"] = Math.floor(Math.abs(difMin)/60);
			State.temporary["difMin"] = Math.abs(difMin) % 60;
			if(difMin < 0){
				return this.error("Time Difference is negative!");
			}
    }else{
			return this.error("String passed to time decode difference function.");
		}
  }
});