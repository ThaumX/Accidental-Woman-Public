//asynchronously copies relevant player variables
Macro.add('updatePlayerHistory', {
  tags: null,
  handler: function () {
    var multicount = 0;
    var histPCcopy = function () {
      State.variables.PChistory.PC = jQuery.extend(true, {}, State.variables.PC);
      multicount++;
    };
    var histstatuscopy = function () {
      State.variables.PChistory.status = jQuery.extend(true, {}, State.variables.PC.status);
      multicount++;
    };
    var histtraitcopy = function () {
      State.variables.PChistory.trait = jQuery.extend(true, {}, State.variables.PC.trait);
      multicount++;
    };
    var histmutatecopy = function () {
      State.variables.PChistory.mutate = jQuery.extend(true, {}, State.variables.PC.mutate);
      multicount++;
    };
    var histkinkcopy = function () {
      State.variables.PChistory.kink = jQuery.extend(true, {}, State.variables.PC.kink);
      multicount++;
    };
    var histskillcopy = function () {
      State.variables.PChistory.skill = jQuery.extend(true, {}, State.variables.PC.skill);
      multicount++;
    };
    var histitemcopy = function () {
      State.variables.PChistory.item = jQuery.extend(true, {}, State.variables.items);
      multicount++;
    };
    var histhomecopy = function () {
      State.variables.PChistory.home = jQuery.extend(true, {}, State.variables.home);
      multicount++;
    };
    var histjobcopy = function () {
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
    while (multicount < 9);
  }
});
Macro.add("saveStats", {
  handler: function () {
    setup.storeState();
  }
});

/************************************************/
/*          ╔═╗┌─┐┌┬┐┬┬  ┬┌─┐╔╗╔╔═╗╔═╗          */
/*          ╠═╣│   │ │└┐┌┘├┤ ║║║╠═╝║            */
/*          ╩ ╩└─┘ ┴ ┴ └┘ └─┘╝╚╝╩  ╚═╝          */
/************************************************/
Macro.add("activateNPC", {
  handler: function () {
    if (this.args.length == 0) {
      return this.error("Activate NPC Macro needs a valid npcid");
    }
    let id = [],
      s = true;
    if (this.args.length > 1) {
      for (let i = 0, c = this.args.length; i < c; i++) {
        if ("string" == typeof this.args[i]) {
          id.push(this.args[i]);
        } else {
          return this.error("Activate NPC Macro does not accept numbers, and only accepts a single array.");
        }
      }
    } else if (Array.isArray(this.args[0])) {
      for (let i = 0, c = this.args[0].length; i < c; i++) {
        if ("string" == typeof this.args[0][i]) {
          id.push(this.args[0][i]);
        } else {
          return this.error("Activate NPC Macro does not accept numbers.");
        }
      }
    } else {
      if ("string" == typeof this.args[0]) {
        id = [this.args[0]];
      } else {
        return this.error("Deactivate NPC Macro does not accept numbers, and only accepts a single array.");
      }
    }
    if ((State.active.variables.activeNPC.length + id.length) > 10) {
      let msg = "too many NPCs attempted to be added to activeNPC. Dropping extras from add list.";
      console.log(msg);
      alert(msg);
      let num = 10 - State.active.variables.activeNPC.length;
      let nid = [];
      for (let i = 0; i < num; i++) {
        nid.push(id[i]);
      }
      id = nid;
    }
    for (let i = 0, c = id.length; i < c; i++) {
      s = setup.restoreNPC(id[i]);
      if (!s) { //removes from list if restore failed
        id.delete(id[i]);
      } else {
        State.active.variables.activeNPC.push(id[i]);
      }
    }
  }
});
Macro.add("deactivateNPC", {
  handler: function () {
    if (this.args.length == 0) {
      return this.error("Activate NPC Macro needs a valid npcid");
    }
    let id = [],
      s = true;
    if (this.args.length > 1) {
      for (let i = 0, c = this.args.length; i < c; i++) {
        if ("string" == typeof this.args[i]) {
          id.push(this.args[i]);
        } else {
          return this.error("deactivate NPC Macro only accepts a single array or number (or an array OF numbers).");
        }
      }
    } else if (Array.isArray(this.args[0])) {
      for (let i = 0, c = this.args[0].length; i < c; i++) {
        if ("string" == typeof this.args[0][i]) {
          id.push(this.args[0][i]);
        } else {
          if (this.args[0][i] < State.active.variables.activeNPC.length) {
            id.push(State.active.variables.activeNPC[this.args[0][i]]);
          }
        }
      }
    } else {
      if ("string" == typeof this.args[0]) {
        id = [this.args[0]];
      } else {
        if (this.args[0] < State.active.variables.activeNPC.length) {
          id.push(State.active.variables.activeNPC[this.args[0][i]]);
        }
      }
    }
    //check to make sure that NPC is not stored, reverse cause delete
    for (let i = id.length - 1; i >= 0; i--) {
      if (!State.active.variables.npc.ready.includes(id[i]) || State.active.variables.npc.stored.includes(id[i])) {
        id.deleteAt(i);
      }
    }
    for (let i = 0, c = id.length; i < c; i++) {
      let s = setup.storeNPC(id[i]);
      if (!s) { //removes from list if store failed
        id.delete(id[i]);
      }
    }
    State.active.variables.activeNPC.delete(id);
  }
});
/************************************************************/
/************************************************************/
/************************************************************/
Macro.add("status", {
  handler: function () {
    if (this.args.length == 0 || this.args[0] == 0) {
      setup.statusSave();
    } else {
      setup.statusLoad();
    }
  }
});

Macro.add("decodeTime", {
  handler: function () {
    if (this.args.length < 1) {
      return this.error("No argument supplied to time decode function.");
    } else if (this.args.length > 1) {
      return this.error("Too many arguments sent to time decode function.");
    }
    var ar = setup.varanal(this.args[0]);
    if ("string" != typeof ar) {
      State.temporary["dhour"] = Math.floor(ar / 100);
      State.temporary["dmin"] = ar % 100;
      if (State.temporary["dmin"] >= 60) {
        State.temporary["dhour"] += 1;
        State.temporary["dmin"] -= 60;
      }
    } else {
      return this.error("String passed to time decode function.");
    }
  }
});
Macro.add("decodeTimeDif", {
  handler: function () {
    if (this.args.length < 2) {
      return this.error("Missing argument/s supplied to time decode difference function.");
    }
    var argu = [setup.varanal(this.args[0]), setup.varanal(this.args[1])];
    if ("string" != typeof argu[0] && "string" != typeof argu[1]) {
      var startHour = Math.floor(argu[0] / 100);
      var startMin = argu[0] % 100;
      if (startMin >= 60) {
        startHour += 1;
        startMin -= 60;
      }
      var endHour = Math.floor(argu[1] / 100);
      var endMin = argu[1] % 100;
      if (endMin >= 60) {
        endHour += 1;
        endMin -= 60;
      }
      var difMin = 0;
      difMin += (endHour - startHour) * 60;
      difMin += endMin - startMin;
      State.temporary["difMinTotal"] = Math.abs(difMin);
      State.temporary["difHour"] = Math.floor(Math.abs(difMin) / 60);
      State.temporary["difMin"] = Math.abs(difMin) % 60;
      if (difMin < 0) {
        return this.error("Time Difference is negative!");
      }
    } else {
      return this.error("String passed to time decode difference function.");
    }
  }
});
Macro.add("atrGarmentDiscript", {
  handler: function () {
    if (this.args.length < 1 || this.args.length > 1) {
      return this.error("Incorrect number of arguments sent, use 1 value only");
    }
    var num = Math.round(Number(eval(this.args.full)));
    if (num < -6) {
      num = -6;
    }
    num += 6;
    var out;
    switch (num) {
      case 0:
      case 1:
        out = "hideous";
        break;
      case 2:
        out = "awful";
        break;
      case 3:
      case 4:
        out = "ugly";
        break;
      case 5:
      case 6:
      case 7:
        out = "okay";
        break;
      case 8:
        out = "nice";
        break;
      case 9:
        out = "appealing";
        break;
      case 10:
        out = "pretty";
        break;
      case 11:
        out = "lovely";
        break;
      case 12:
        out = "splendid";
        break;
      case 13:
        out = "beautiful";
        break;
      case 14:
      case 15:
        out = "dazzling";
        break;
      case 16:
      case 17:
        out = "stunning";
        break;
      case 18:
      case 19:
        out = "exquisite";
        break;
      case 20:
      case 21:
        out = "magnificent";
        break;
      default:
        out = "shitfuck";
        break;
    }
    return new Wikifier(this.output, out);
  }
});
Macro.add("exposureGarmentDiscript", {
  handler: function () {
    if (this.args.length < 1 || this.args.length > 1) {
      return this.error("Incorrect number of arguments sent, use 1 value only");
    }
    var out;
    var val = Math.round((eval(this.args.full) * 10) / 2);
    switch (val) {
      case 0:
      case 1:
      case 2:
      case 3:
        out = "conservative";
        break;
      case 4:
      case 5:
        /*1.0*/
      case 6:
        out = "normal";
        break;
      case 7:
      case 8:
      case 9:
      case 10:
        /*2.0*/
        out = "slightly revealing";
        break;
      case 11:
      case 12:
      case 13:
      case 14:
        out = "revealing";
        break;
      case 15:
        /*3.0*/
      case 16:
      case 17:
      case 18:
        out = "very revealing";
        break;
      case 19:
      case 20:
        /*4.0*/
      case 21:
      case 22:
        out = "exhibitionist";
        break;
      case 23:
      case 24:
      case 25:
        /*5.o*/
        out = "practically naked";
        break;
      default:
        out = "wtf twine";
        break;
    }
    return new Wikifier(this.output, out);
  }
});
Macro.add("procS", {
  handler: function () {
    var txt = (this.args.length != 1) ? "basic" : this.args[0];
    State.active.variables.proc = {
      start: 0,
      stop: 0,
      time: 0,
      text: txt
    };
    State.active.variables.proc.start = performance.now();
  }
});
Macro.add("procE", {
  handler: function () {
    State.active.variables.proc.stop = performance.now();
    State.active.variables.proc.time = Math.round(State.active.variables.proc.stop - State.active.variables.proc.start);
  }
});