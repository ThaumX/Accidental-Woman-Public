
//   ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ██╗
//  ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗██║
//  ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║██║
//  ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║██║
//  ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║███████╗
//   ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
//
//  ███╗   ███╗ █████╗  ██████╗██████╗  ██████╗ ███████╗
//  ████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝
//  ██╔████╔██║███████║██║     ██████╔╝██║   ██║███████╗
//  ██║╚██╔╝██║██╔══██║██║     ██╔══██╗██║   ██║╚════██║
//  ██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║╚██████╔╝███████║
//  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

// asynchronously copies relevant player variables
Macro.add("updatePlayerHistory", {
  handler() {
    setup.updatePlayerHistory();
  },
});

Macro.add("boober", {
  handler() {
    return new Wikifier(this.output, "<span class='hotpink big'>Ѡ</span>");
  },
});

Macro.add("reload", {
  handler() {
    Engine.play(aw.passage.previous[0], true);
  },
});

Macro.add("dp", {
  tags: [null],
  handler() {
    if (this.payload[0].args.length > 0) {
      const output = `<p class="pc">${this.payload[0].contents}</p>`;
      return new Wikifier(this.output, output);
    } else {
      const output = `<span class="pc">${this.payload[0].contents}</span>`;
      return new Wikifier(this.output, output);
    }
  },
});

Macro.add("dn", {
  tags: [null],
  handler() {
    if (this.payload[0].args.length > 0) {
      const output = `<p class="npc">${this.payload[0].contents}</p>`;
      return new Wikifier(this.output, output);
    } else {
      const output = `<span class="npc">${this.payload[0].contents}</span>`;
      return new Wikifier(this.output, output);
    }
  },
});

Macro.add("dm", {
  tags: [null],
  handler() {
    if (this.payload[0].args.length > 0) {
      const output = `<p class="mono">${this.payload[0].contents}</p>`;
      return new Wikifier(this.output, output);
    } else {
      const output = `<span class="mono">${this.payload[0].contents}</span>`;
      return new Wikifier(this.output, output);
    }
  },
});

Macro.add("npcinteract", {
  handler() {
    const npcList = ↂ.map.NPC;
    const npcFake: boolean[] = [];
    const npcName: string[] = [];
    const npcPort: string[] = [];
    // gets the representative face icon for the npc
    function port(npcid: string): string {
      let female = true;
      let age = 0;
      try {
        if (npcid.slice(0, 1) === "f") {
          age = aw.fakeNPC[npcid].age;
          female = (aw.fakeNPC[npcid].gender === 1) ? false : true;
        } else {
          age = aw.npc[npcid].main.age;
          female = aw.npc[npcid].main.female;
        }
      } catch (e) {
        aw.con.warn(`Bad npc id sent to npcinteract macro's port function. (${npcid})`);
      }
      let rets = "";
      if (female) {
        if (age < 25) {
          rets += "<img data-passage=\"IMG-IconFemaleTeen\" ";
        } else if (age < 35) {
          rets += "<img data-passage=\"IMG-IconFemaleYoungAdult\" ";
        } else if (age < 45) {
          rets += "<img data-passage=\"IMG-IconFemaleAdult\" ";
        } else if (age < 55) {
          rets += "<img data-passage=\"IMG-IconFemaleMiddleAge\" ";
        } else {
          rets += "<img data-passage=\"IMG-IconFemaleElderly\" ";
        }
      } else {
        if (age < 25) {
          rets += "<img data-passage=\"IMG-IconMaleTeen\" ";
        } else if (age < 35) {
          rets += "<img data-passage=\"IMG-IconMaleYoungAdult\" ";
        } else if (age < 45) {
          rets += "<img data-passage=\"IMG-IconMaleAdult\" ";
        } else if (age < 55) {
          rets += "<img data-passage=\"IMG-IconMaleMiddleAge\" ";
        } else {
          rets += "<img data-passage=\"IMG-IconMaleElderly\" ";
        }
      }
      rets += "style=\"height:50px;width:50px;display:inline-block;margin-right:15px;\">";
      return rets;
    }
    // cycle through NPCs and get relevant infos to combine
    for (let i = 0, c = npcList.length; i < c; i++) {
      if (npcList[i].slice(0, 1) === "f") {
        npcFake.push(true);
      } else {
        npcFake.push(false);
      }
      if (npcFake[i]) {
        npcName.push(aw.fakeNPC[npcList[i]].fullName + " ⒯");
      } else {
        npcName.push(aw.npc[npcList[i]].name);
      }
      npcPort.push(port(npcList[i]));
    }
    let output = `<div class="bluescales blackOutline" style="width:700px;min-height:650px;border-radius:15px;padding:15px;"><h3 class="quest white blackOutline">Please select a target to interact with</h3>`;
    let jizzQ = "<<timed 50ms>><<scr";
    jizzQ += "ipt>>";
    for (let i = 0, c = npcList.length; i < c; i++) {
      output += `<div id="npcTarget-${npcList[i]}" style="display:inline-block;width:300;height:50;text-align:left;background-color:rgba(0,0,0,0.7);border-radius:10px;font-size:1.15rem;cursor:pointer;padding:10px;margin:15px;">`;
      output += npcPort[i];
      output += npcName[i];
      output += "</div>";
      jizzQ += `$("#npcTarget-${npcList[i]}").click(function(){`;
      if (npcFake[i]) {
        jizzQ += `setup.interact.launch({passage: "WorldNPC-FakeInteract", block: false, content: "<<set _intNPC = '${npcList[i]}'>>", title: "NPC Interaction", size: 3}); `;
      } else {
        jizzQ += `setup.interact.launch({passage: "WorldNPC-BaseInteract", block: false, content: "<<set _intNPC = '${npcList[i]}'>>", npcid: "${npcList[i]}", title: "NPC Interaction", size: 3}); `;
      }
      jizzQ += "Dialog.close(); ";
      jizzQ += "}); ";
    }
    jizzQ += "<</scri";
    jizzQ += "pt>><</timed>>";
    output += jizzQ;
    output += "</div>";
    setup.dialog("NPC Interaction", output);
  },
});




/*
Macro.add("gotodev", {
  handler() {
    if (this.args.length < 1 || this.args.length > 2 || typeof this.args[0] !== "string") {
      return this.error(`Invalid macro argument for gotodev, or too many/too few arguments.`);
    }
    const passage = (setup.testes.test(this.args[0])) ? setup.awsc.parse(this.args[0]) : this.args[0];
    if (State.active.variables.swim === "[dev]" && State.active.variables.AW.debugPause) {
      const sec = (this.args.length > 1 && !isNaN(this.args[1])) ? Number(this.args[1]) : 2500;
      State.temporary.tempCunter = true;
      const output = `DEBUGGING PAUSE: Continuing automatically in ${sec} milliseconds.<br><<button "CONTINUE">><<run Engine.play("${passage}", true)>><</button>> <<button "PAUSE">><<set _tempCunter = false>><</button>>`;
      setTimeout(function() {
        if (State.temporary.tempCunter) {
          Engine.play(passage, true);
        }
      }, sec);
      return new Wikifier(this.output, output);
    } else {
      aw.go(passage);
    }
  },
});
*/

/*
<<widget "gotodev">>
<<set _pas = $args[0].trim()>>
<<if _pas[0] === "ↂ">>
  <<set _pas = setup.awsc.parse(_pas)>>
<</if>>
<<if $swim == "[dev]" && $AW.debugPause>>
  <<if ndef $args[1] || "number" != typeof $args[1]>>
  <<set _tim = "2000ms">>
  <<else>>
  <<set _tim = $args[1] + "ms">>
  <</if>>
  <<set _cunt = true>>
  @@.com;Debugging Pause (to check for errors) Automagically continuing in <<print _tim>>@@
  <br><br>
  @@.uibutton;<<button "Pause">><<set _cunt = false>><</button>>
  <<button "next passage">><<go _pas>><</button>>@@
  <<timed _tim>>
  <<if _cunt>>
  <<go _pas>>
  <</if>>
  <</timed>>
<<else>>
  <<go _pas>>
<</if>>
<</widget>>
*/

Macro.add("go", {
  handler() {
    if (this.args.length < 1 || this.args.length > 3) {
      // tslint:disable-next-line:max-line-length
      return this.error("Incorrect number of arguments to <<go>> macro. Format is: <<go 'passageName' ['link text' ['btn']]>>.");
    }
    const balls = /(\[|\])/;
    if ("string" !== typeof this.args[0] || balls.test(this.args[0])) {
      // tslint:disable-next-line:max-line-length
      return this.error(`Error in <<go>> macro. Wiki markup [[]] is not allowed. Arg must be a string, was given "${this.args[0]}".`);
    }
    if (this.args.length >= 2 && "string" !== typeof this.args[1]) {
      return this.error("Error in <<go>> Macro. Invalid link argument. Argument must be a string.");
    }
    let output: string;
    const passage = (setup.testes.test(this.args[0])) ? setup.awsc.parse(this.args[0]) : this.args[0];
    switch (this.args.length) {
      case 1:
        if (!Story.has(passage)) {
          return this.error(`passage "${passage}" does not exist`);
        } else {
          setTimeout(() => Engine.play(passage, true), minDomActionDelay);
        }
        return;
      case 2:
        output = `<<link "${this.args[1]}">><<run aw.go("${passage}")>><</link>>`;
        break;
      case 3:
        output = `<<button "${this.args[1]}">><<run aw.go("${passage}")>><</button>>`;
        break;
    }
    if (!output!) {
      output = "TimeCock Error. Causality has been broken, and the <<go>> macro did not work.";
    }
    return new Wikifier(this.output, output!);
  },
});

Macro.add("pri", {
  handler() {
    const raw = this.args.raw;
  },
});

Macro.add("saveStats", {
  handler() {
    setup.storeState();
  },
});

Macro.add("activateNPC", {
  handler() {
    const reg = /n[0-9]{3,5}/;
    if (Array.isArray(this.args[0])) {
      for (let i = 0, c = this.args[0].length; i < c; i++) {
        if (!State.active.variables.activeNPC.includes(this.args[0][i]) && reg.test(this.args[0][i])) {
          State.active.variables.activeNPC.push(this.args[0][i]);
        }
      }
    } else {
      if (!State.active.variables.activeNPC.includes(this.args[0]) && reg.test(this.args[0])) {
        State.active.variables.activeNPC.push(this.args[0]);
      }
    }
  },
});

Macro.add("deactivateNPC", {
  handler() {
    if (Array.isArray(this.args[0])) {
      for (let i = 0, c = this.args[0].length; i < c; i++) {
        State.active.variables.activeNPC.delete(this.args[0][i]);
      }
    } else {
        State.active.variables.activeNPC.delete(this.args[0]);
    }
  },
});


/************************************************/
/*          ╔═╗┌─┐┌┬┐┬┬  ┬┌─┐╔╗╔╔═╗╔═╗          */
/*          ╠═╣│   │ │└┐┌┘├┤ ║║║╠═╝║            */
/*          ╩ ╩└─┘ ┴ ┴ └┘ └─┘╝╚╝╩  ╚═╝          */
/************************************************/
Macro.add("restoreNPC", {
  handler() {
    if (this.args.length === 0) {
      return this.error("Activate NPC Macro needs a valid npcid");
    }
    let id: any[] = [];
    let s = true;
    if (this.args.length > 1) {
      for (let i = 0, c = this.args.length; i < c; i++) {
        if ("string" === typeof this.args[i]) {
          id.push(this.args[i]);
        } else {
          return this.error("Activate NPC Macro does not accept numbers, and only accepts a single array.");
        }
      }
    } else if (Array.isArray(this.args[0])) {
      for (let i = 0, c = this.args[0].length; i < c; i++) {
        if ("string" === typeof this.args[0][i]) {
          id.push(this.args[0][i]);
        } else {
          return this.error("Activate NPC Macro does not accept numbers.");
        }
      }
    } else {
      if ("string" === typeof this.args[0]) {
        id = [this.args[0]];
      } else {
        return this.error("Deactivate NPC Macro does not accept numbers, and only accepts a single array.");
      }
    }
    if ((State.active.variables.activeNPC.length + id.length) > 10) {
      const msg = "too many NPCs attempted to be added to activeNPC. Dropping extras from add list.";
      console.log(msg);
      UI.alert(msg);
      const num = 10 - State.active.variables.activeNPC.length;
      const nid: any[] = [];
      for (let i = 0; i < num; i++) {
        nid.push(id[i]);
      }
      id = nid;
    }
    for (let i = 0, c = id.length; i < c; i++) {
      s = setup.restoreNPC(id[i]);
      if (!s) { // removes from list if restore failed
        id.delete(id[i]);
      } else {
        State.active.variables.activeNPC.push(id[i]);
      }
    }
    State.active.variables.N = [];
    for (let i = 0, c = State.active.variables.activeNPC.length; i < c; i++) {
      State.active.variables.N.push(aw.npc[State.active.variables.activeNPC[i]]);
    }
    State.active.variables.UIimgFlag = true;
  },
});


Macro.add("storeNPC", {
  handler() {
    if (this.args.length === 0) {
      return this.error("Activate NPC Macro needs a valid npcid");
    }
    let id: string[] = [];
    const s = true;
    if (this.args.length > 1) {
      for (let i = 0, c = this.args.length; i < c; i++) {
        if ("string" === typeof this.args[i]) {
          id.push(this.args[i]);
        } else {
          return this.error("deactivate NPC Macro only accepts a single array or number (or an array OF numbers).");
        }
      }
    } else if (Array.isArray(this.args[0])) {
      for (let i = 0, c = this.args[0].length; i < c; i++) {
        if ("string" === typeof this.args[0][i]) {
          id.push(this.args[0][i]);
        } else {
          if (this.args[0][i] < State.active.variables.activeNPC.length) {
            id.push(State.active.variables.activeNPC[this.args[0][i]]);
          }
        }
      }
    } else {
      if ("string" === typeof this.args[0]) {
        id = [this.args[0]];
      } else {
        if (this.args[0] < State.active.variables.activeNPC.length) {
          id.push(State.active.variables.activeNPC[this.args[0]]);
        }
      }
    }
    // check to make sure that NPC is not stored, reverse cause delete
    for (let i = id.length - 1; i >= 0; i--) {
      if (!setup.npc.ready.includes(id[i]) || setup.npc.stored.includes(id[i])) {
        id.deleteAt(i);
      }
    }
    for (let i = 0, c = id.length; i < c; i++) {
      const s2 = setup.storeNPC(id[i]);
      if (!s2) { // removes from list if store failed
        id.delete(id[i]);
      }
    }
    State.active.variables.activeNPC.delete(id);
    State.active.variables.UIimgFlag = true;
    State.active.variables.N = [];
    for (let i = 0, c = State.active.variables.activeNPC.length; i < c; i++) {
      State.active.variables.N.push(aw.npc[State.active.variables.activeNPC[i]]);
    }
  },
});


/************************************************************/
/************************************************************/
/************************************************************/
Macro.add("status", {
  handler() {
    if (this.args.length === 0 || this.args[0] === 0) {
      setup.statusSave();
    } else {
      setup.statusLoad();
    }
  },
});


Macro.add("procS", {
  handler() {
    const txt = (this.args.length !== 1) ? "basic" : this.args[0];
    State.active.variables.proc = {
      start: 0,
      stop: 0,
      time: 0,
      text: txt,
    };
    State.active.variables.proc.start = performance.now();
  },
});


Macro.add("procE", {
  handler() {
    State.active.variables.proc.stop = performance.now();
    State.active.variables.proc.time = Math.round(State.active.variables.proc.stop - State.active.variables.proc.start);
  },
});


Macro.add("tag", {
  tags: null,
  handler() {
    const pattern = RegExp(/[,\s\n\[\]\(\)]+/);
    const tags = this.payload.args.full.split(pattern);
    if (this.args.length === 0) {
      State.active.variables.scenario = jQuery.extend(true, [], tags);
    } else if (this.args[0] === "add") {
      for (let i = 0, c = tags.length; i < c; i++) {
        if (!State.active.variables.scenario.includes(tags[i])) {
          State.active.variables.scenario.push(tags[i]);
        }
      }
    } else if (this.args[0] === "rem") {
      for (let i = 0, c = tags.length; i < c; i++) {
        State.active.variables.scenario.delete(tags[i]);
      }
    } else if (this.args[0] === "del") {
      State.active.variables.scenario = [];
    } else {
      return this.error("Too many arguments sent to tags macro. valid: add, rem, del");
    }
  },
});


Macro.add("sp", {
  handler() {
    let out = "&nbsp;";
    if (this.args.length === 0) {
      // nothing
    } else if ("number" === typeof this.args[0]) {
      for (let i = 1; i < this.args[0]; i++) {
        out += "&nbsp;";
      }
    }
    return new Wikifier(this.output, out);
  },
});


Macro.add("tab", {
  handler() {
    const out = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    return new Wikifier(this.output, out);
  },
});


Macro.add("cash", {
  handler() {
    if (this.args.length < 1) {
      return this.error("Must provide a value to the cash macro.");
    }
    if (this.args.length === 1) {
      aw.cash(this.args[0]);
    } else {
      aw.cash(this.args[0], this.args[1]);
    }
  },
});


Macro.add("img", {
  handler() {
    if (this.args.length < 1) {
      return this.error("Must provide data passage name at least. Format = <<img 'data-passage' 'style' 'classes'>>");
    }
    let output;
    switch (this.args.length) {
      case 1:
        output = `<img data-passage="${this.args[0]}">`;
        break;
      case 2:
        output = `<img data-passage="${this.args[0]}" style="${this.args[1]}">`;
        break;
      case 3:
        output = `<img data-passage="${this.args[0]}" class="${this.args[2]}" style="${this.args[1]}">`;
        break;
      default:
        return this.error("Malformed or excessive arguments. Format = <<img 'data-passage' 'style' 'classes'>>");
    }
    return new Wikifier(this.output, output);
  },
});


Macro.add("scrolltop", {
  handler() {
    if (this.args.length === 0) {
      setup.alert(`No element id sent to scrolltop macro!`);
      return;
    } else if ("string" === typeof this.args[0]) {
      const id = this.args[0];
      if (id.slice(0, 1) === "#") {
        $(id).animate({ scrollTop: 0 }, "fast");
      } else {
        setup.alert(`element id sent to scrolltop macro is missing #! ${this.args[0]}`);
      }
    } else {
      setup.alert(`invalid element id sent to scrolltop macro! ${this.args[0]}`);
    }
  },
});

Macro.add("scrollbottom", {
  handler() {
    if (this.args.length === 0) {
      aw.con.warn(`No element id sent to scrollbottom macro!`);
      return;
    } else if ("string" === typeof this.args[0]) {
      setTimeout(() => setup.scrollBottom(this.args[0]), 50);
    } else {
      aw.con.warn(`invalid element id sent to scrollbottom macro! ${this.args[0]}`);
    }
  },
});


Macro.add("space", {
  tags: null,
  handler() {
    let str = this.payload[0].contents;
    let ind = str.search(/(<<)(.)+(>>)/);
    if (ind !== -1) { // there are macros inside that need to be preserved
      let wrk;
      let newstr = "";
      do {
        wrk = str.slice(0, ind);
        str = str.slice(ind);
        wrk = wrk.replace(/(\n|\r)/g, "<br>");
        wrk = wrk.replace(/\s/g, "&nbsp;");
        newstr += wrk;
        ind = str.search(">>") + 2;
        newstr += str.slice(0, ind);
        str = str.slice(ind);
        ind = str.search(/(<<)(.)+(>>)/);
      }
      while (ind >= 0);
      str = newstr;
    } else {
      str = str.replace(/(\n|\r)/g, "<br>");
      str = str.replace(/\s/g, "&nbsp;");
    }
    return new Wikifier(this.output, str);
  },
});


Macro.add(["npcLove", "npclove"], {
  handler() {
    let amt = 1;
    let npc = "none";
    let tgt = 0;
    const AW = State.active.variables;
    const coded = new RegExp(/n[0-9]{3,5}$/);
    if (this.args.length < 2 || this.args.length > 3) {
      return this.error("Incorrect number of arguments sent to npcLove macro. amt npc [tgt]");
    }
    if ("number" === typeof this.args[0]) {
      amt = Math.round(this.args[0]);
    } else {
      return this.error(`Bad amount value ${this.args[0]} sent to npcLove macro. Must be a number.`);
    }
    if ("number" === typeof this.args[1]) {
      try {
        npc = AW.activeNPC[this.args[1]];
      } catch (e) {
        return this.error(`invalid activeNPC index ${this.args[1]}sent to npcLove macro.`);
      }
    } else if ("string" === typeof this.args[1] && coded.test(this.args[1])) {
      npc = this.args[1];
    } else {
      return this.error(`invalid npc id ${this.args[1]} sent to npcLove macro.`);
    }
    if (this.args.length === 3 && "number" === typeof this.args[2]) {
      tgt = this.args[2];
    }
    switch (tgt) {
    case 0: // affects both
      aw.npc[npc].rship.lovePC += amt;
      aw.npc[npc].rship.loveNPC += amt;
      break;
    case 1: // affects only PC feelings
      aw.npc[npc].rship.loveNPC += amt;
      break;
    case 2: // affects only NPC feelings
      aw.npc[npc].rship.lovePC += amt;
      break;
    default: // default affects both
      aw.npc[npc].rship.lovePC += amt;
      aw.npc[npc].rship.loveNPC += amt;
      break;
    }
  },
});


Macro.add(["npcLike", "npclike"], {
  handler() {
    let amt = 1;
    let npc = "none";
    let tgt = 0;
    const AW = State.active.variables;
    const coded = new RegExp(/n[0-9]{3,5}$/);
    if (this.args.length < 2 || this.args.length > 3) {
      return this.error("Incorrect number of arguments sent to npcLike macro. amt npc [tgt]");
    }
    if ("number" === typeof this.args[0]) {
      amt = Math.round(this.args[0]);
    } else {
      return this.error(`Bad amount value ${this.args[0]} sent to npcLike macro. Must be a number.`);
    }
    if ("number" === typeof this.args[1]) {
      try {
        npc = AW.activeNPC[this.args[1]];
      } catch (e) {
        return this.error(`invalid activeNPC index ${this.args[1]}sent to npcLike macro.`);
      }
    } else if ("string" === typeof this.args[1] && coded.test(this.args[1])) {
      npc = this.args[1];
    } else {
      return this.error(`invalid npc id ${this.args[1]} sent to npcLike macro.`);
    }
    if (this.args.length === 3 && "number" === typeof this.args[2]) {
      tgt = this.args[2];
    }
    switch (tgt) {
    case 0: // affects both
      aw.npc[npc].rship.likePC += amt;
      aw.npc[npc].rship.likeNPC += amt;
      break;
    case 1: // affects only PC feelings
      aw.npc[npc].rship.likeNPC += amt;
      break;
    case 2: // affects only NPC feelings
      aw.npc[npc].rship.likePC += amt;
      break;
    default: // default affects both
      aw.npc[npc].rship.likePC += amt;
      aw.npc[npc].rship.likeNPC += amt;
      break;
    }
  },
});

Macro.add("safetoclose", {
  handler() {
    const msg = `<br><center><span class="monospace ship" style="font-size:85%;">⦗ IT IS SAFE TO CLOSE THIS WINDOW ⦘</span></center>`;
    return new Wikifier(this.output, msg);
  },
});

Macro.add("colorpick", {
  handler() {
    let jesusfuck;
    let cumsuck;
    if (this.args.length === 0) {
      jesusfuck = "testesfucker";
    } else {
      jesusfuck = this.args[0];
    }
    if (this.args.length === 2) {
      cumsuck = this.args[1];
    } else {
      cumsuck = "#ffaa88";
    }
    const inn = document.createElement("input");
    const picker = new jscolor(inn);
    const cls = `setup.updatecolorpick(this)`;
    picker.fromString(cumsuck);
    jQuery(inn).attr({id : jesusfuck, name : jesusfuck, class : "jscolor"}).on("change", function() {
      const nam = this.id;
      if (aw.theme[nam] != null) {
        const hex = "#" + this.value;
        aw.theme[nam] = hex;
        setup.log(`New color is ${hex}.`);
      }
    }).appendTo(this.output);
  },
});


Macro.add("emo", {
  handler() {
    if (this.args.length !== 1) {
      return this.error(`The emo macro requires 1 emotion argument, ${this.args.length} were supplied.`);
    }
    if (!State.variables.pref.dispEmoji) {
      return;
    }
    const images = {
      angel: "[img[Angelic|IMG_EmoAngel]]",
      angry: "[img[Angry|IMG_EmoAngry]]",
      arrogant: "[img[Arrogant|IMG_EmoArrogant]]",
      awkward: "[img[Awkward|IMG_EmoAwkward]]",
      bored: "[img[Bored|IMG_EmoBored]]",
      confused: "[img[Confused|IMG_EmoConfused]]",
      cool: "[img[Cool|IMG_EmoCool]]",
      cry: "[img[Cry|IMG_EmoCry]]",
      cute: "[img[Cute|IMG_EmoCute]]",
      dead: "[img[Dead|IMG_EmoDead]]",
      dismay: "[img[Dismay|IMG_EmoDismay]]",
      disturbed: "[img[Disturbed|IMG_EmoDisturbed]]",
      excited: "[img[Excited|IMG_EmoExcited]]",
      greed: "[img[Greed|IMG_EmoGreed]]",
      happy: "[img[Happy|IMG_EmoHappy]]",
      hilarious: "[img[Hilarious|IMG_EmoHilarious]]",
      joke: "[img[Joking|IMG_EmoJoke]]",
      kiss: "[img[Kiss|IMG_EmoKiss]]",
      kissheart: "[img[Romantic Kiss|IMG_EmoKissHeart]]",
      laugh: "[img[Laugh|IMG_EmoLaugh]]",
      love: "[img[Love|IMG_EmoLove]]",
      mad: "[img[Mad|IMG_EmoMad]]",
      muted: "[img[Muted|IMG_EmoMuted]]",
      neutral: "[img[Neutral|IMG_EmoNeutral]]",
      pain: "[img[In Pain|IMG_EmoPain]]",
      pleased: "[img[Pleased|IMG_EmoPleased]]",
      proud: "[img[Proud|IMG_EmoProud]]",
      sad: "[img[Sad|IMG_EmoSad]]",
      scared: "[img[Scared|IMG_EmoScared]]",
      sick: "[img[Sick|IMG_EmoSick]]",
      silly: "[img[Silly|IMG_EmoSilly]]",
      sleepy: "[img[Sleepy|IMG_EmoSleepy]]",
      smile: "[img[Smile|IMG_EmoSmile]]",
      smug: "[img[Smug|IMG_EmoSmug]]",
      sob: "[img[Sob|IMG_EmoSob]]",
      surprised: "[img[Surprised|IMG_EmoSurprised]]",
      suspicious: "[img[Suspicious|IMG_EmoSuspicious]]",
      tired: "[img[Tired|IMG_EmoTired]]",
      tongue: "[img[Tongue Out|IMG_EmoTongue]]",
      unamused: "[img[Unamused|IMG_EmoUnamused]]",
      unhappy: "[img[Unhappy|IMG_EmoUnhappy]]",
      wink: "[img[Winking|IMG_EmoWink]]",
      bimbo: "[img[Bimbo|IMG_EmoBimbo]]",
      slut: "[img[Slut|IMG_EmoSlut]]",
      doomguy: "[img[Doomguy|IMG_EmoDoomguy]]",
    };
    let ome;
    if (images[this.args[0]] == null) {
      ome = "[img[IMG_EmoUnknown]]";
    } else {
      ome = images[this.args[0]];
    }
    const op = `<span style="vertical-align: -8px;">${ome}</span>`;
    return new Wikifier(this.output, op);
  },
});


Macro.add("info", {
  handler() {
    if (this.args.length !== 2) {
      return this.error(`The info(link) macro requires two arguments: link text and guide item, ${this.args.length} were supplied.`);
    }
    let op;
    if (!Story.has(this.args[1])) {
      if (Story.has(this.args[0]) && "string" === typeof this.args[1]) {
        op = `<span class="infoLink"><<link "${this.args[1]}">><<set $AW.infoLink = "${this.args[0]}">><<replace "#guidecontainer">><<include [[UIGuideContainer]]>><</replace>><</link>></span>`;
      } else {
        op = `<span class="infoLink"><<link "${this.args[0]}">><<set $AW.infoLink = "guideNotAvailable">><<replace "#guidecontainer">><<include [[UIGuideContainer]]>><</replace>><</link>></span>`;
      }
    } else {
      op = `<span class="infoLink"><<link "${this.args[0]}">><<set $AW.infoLink = "${this.args[1]}">><<replace "#guidecontainer">><<include [[UIGuideContainer]]>><</replace>><</link>></span>`;
    }
    return new Wikifier(this.output, op);
  },
});


Macro.add("animexit", {
  handler() {
    if (this.args.length < 3) {
      setup.alert(`Incorrect number of arguments supplied to 'animexit' macro! need element id, class to remove (or 0), and class to add for exit animation. [optional '#elementToEmptyOnFinish']`);
      return;
    } else if (this.args[0].search("#") !== -1) {
      setup.alert("The animexit macro can only be used with an element id in the plain-JS style, no # sign!");
      return;
    }
    let kil = false;
    let it;
    if (this.args[3] != null) {
      if (this.args[3]) {
        it = "#" + this.args[0];
        kil = true;
      }
    }
    const element = document.getElementById(this.args[0]);
    if (this.args[1] !== 0) {
      if (Array.isArray(this.args[1])) {
        // array
        for (let i = 0, c = this.args[1].length; i < c; i++) {
          if (element != null) {
            element.classList.remove(this.args[1][i]);
          }
        }
      } else {
        if (element != null) {
          element.classList.remove(this.args[1]);
        }
      }
    }
    if (kil) {
      if (element != null) {
        element.addEventListener("webkitAnimationEnd", function() {$(it).remove(); }, false);
        element.addEventListener("animationend", function() {$(it).remove(); }, false);
        element.addEventListener("oanimationend", function() {$(it).remove(); }, false);
      }
    }
    if (element != null) {
      // tslint:disable-next-line:no-unused-expression
      void element.offsetWidth;
      element.classList.add(this.args[2]);
    }
  },
});


Macro.add("silly", {
  tags: null,
  handler() {
    if (State.variables.AW.sillyMode != null && State.variables.AW.sillyMode) {
      return new Wikifier(this.output, `<span style="border-width:1px;border-style:dotted;border-color:#8effca;border-radius:4px;">${this.payload[0].contents}</span>`);
    }
  },
});


Macro.add("f", {
  handler() {
    const str = this.args[0].toUpperCase();
    return new Wikifier(this.output, `<span class="head3">${str}</span>`);
  },
});


Macro.add("tutorial", {
  tags: null,
  handler() {
    if (!State.active.variables.AW.tutorials) {
      return "";
    }
    const ᛔ = State.active.variables;
    let title;
    let output = "";
    let useTitle = false;
    if (this.payload[0].args.length > 0) {
      title = this.payload[0].args[0];
      useTitle = true;
      aw.con.info("One-time tutorial encountered.");
    }
    if (useTitle) {
      if (ᛔ.tutorials[title] == null || ᛔ.tutorials[title] === undefined) {
        ᛔ.tutorials[title] = 1;
        output = `<span id="tut-${title}" class="tutorial">${this.payload[0].contents}</span>`;
      } else if (ᛔ.tutorials[title] === 0) {
        ᛔ.tutorials[title] = 1;
        output = `<span id="tut-${title}" class="tutorial">${this.payload[0].contents}</span>`;
      } else {
        return "";
      }
    } else {
      output = `<span id="tut-${title}" class="tutorial">${this.payload[0].contents}</span>`;
    }
    return new Wikifier(this.output, output);
  },
});

// OPENHOURS MACRO
// <<openhours opHour clHour [opHour clHour...]>>
Macro.add("openhours", {
  tags: ["closed"],
  handler() {
    const timeLeng: number = this.payload[0].args.length;
    if (timeLeng < 2) {
      return this.error("The openhours macro requires at least two time values!");
    } else if (timeLeng % 2 === 1) {
      return this.error("If using multiple open and close times with the openhours macro, they must come in pairs.");
    } else {
      for (let i = 0; i < timeLeng; i++) {
        if (isNaN(this.payload[0].args[i])) {
          return this.error("the openhours macro accepts only numeric arguments for times!");
        }
        if (i > 0 && this.payload[0].args[i] <= this.payload[0].args[i - 1]) {
          return this.error(`the openhours macro requires that times be given in chronological order, and may not match!`);
        }
      }
    }
    // validation done.
    const hour: number = State.active.variables.time[0];
    let open: boolean = false;
    for (let i = 0; i < timeLeng; i++) {
      if ((i + 1) % 2 === 1) {
        if (hour < this.payload[0].args[i]) { // if before an open time, then it's closed
          open = false;
          break;
        }
      } else {
        if (hour < this.payload[0].args[i]) { // if after open time, but before close, then open
          open = true;
          break;
        }
      }
      // if reach end of args without being true, then must be after final closing -> closed
    }
    if (open) {
      return new Wikifier(this.output, this.payload[0].contents);
    } else {
      if (this.payload.length <= 1) {
        return; // no closed option
      } else if (this.payload[1].args.length > 0) { // shortcut for empty button
        let output: string;
        if (this.payload[1].args.length > 1) {
          output = `<<hoverrevise ${this.payload[1].args[0]}>><span class="disabled" title="This location is closed"><<button "${this.payload[1].args[1]}>><</button>></span><<endhoverrevise>>`;
        } else {
          output = `<span class="disabled" title="This location is closed"><<button "${this.payload[1].args[0]}">><</button>></span>`;
        }
        return new Wikifier(this.output, output);
      } else {
        return new Wikifier(this.output, this.payload[1].contents);
      }
    }
  },
});

Macro.add("testes", {
  handler() {
    let output: string;
    if (setup.testes.test(this.args[0])) {
      output = "Looks like this one failed: " + this.args[0];
    } else {
      output = "looks like this one passed! " + this.args[0];
    }
    return new Wikifier(this.output, output);
  },
});

Macro.add("colorcode", {
  handler() {
    if (this.args.length < 2) {
      return this.error(`colorcode macro requires a value and array of thresholds.`);
    }
    const colors = ["#5ded31", "#dfe52d", "#efae2d", "#f44d1a"];
    let reverse: boolean = false;
    let output: string = `<span style="color:#e0e0e0;">${this.args[0]}</span>`;
    if (this.args[1][0] > this.args[1][this.args[1].length - 1]) {
      reverse = true;
    }
    for (let i = 0, c = this.args[1].length; i < c; i++) {
      if (reverse) {
        if (this.args[0] >= this.args[1][i]) {
          output = `<span style="color:${colors[i]};">${this.args[0]}</span>`;
          break;
        }
      } else {
        if (this.args[0] < this.args[1][i]) {
          output = `<span style="color:${colors[i]};">${this.args[0]}</span>`;
          break;
        }
      }
    }
    return new Wikifier(this.output, output);
  },
});

/* === HAS MACRO ===
----- BASICS -----
Used like <<if>> default sugarcube macro.
This version parses pc character values to save time.
it uses JS logical operators && and || for multiple clauses.
Use parenthesis to distinguish clauses if necessary.
!!! leave space between logical operators and parenthesis and values.!!!
Example: <<has ( slut || liberated ) && cumSlut>>

It will parse the values for kinks, traits, and mutations so that
you can use only the name instead of the full ↂ.pc.blah.item to save a little time.
It will also parse the numerical value for "will" and "libido" (rest of check still required)

It will also check whatever JS value you specify, including basic logic. In these cases, you
should NOT use any space between the variables/values and operators.
Example: <<has libido>3>> for libido > 3. (libido is parsed)
.        <<has ↂ.pc.body.tits.size<=2000>> will show content if titsize <= 2000
.        <<has 2+2===4>> will always show the content, but you get the idea here...

----- TAGS -----
<<has ...>> Equivalent to <<if>>. Like <<if>>, do not use quotes for the arguments
.           except to contain a specific string. <<has _word=="cock">>
<<orhas>> Equivalent to <<elseif>>
<<or>> Equivalent to <<else>>
<</has>> - Closing tag

Macro can be used for dialog or code, just as normal <<if>> macro set.
*/
Macro.add("has", {
  tags: ["orhas", "or"],
  handler() {
    const tagNum: number = this.payload.length;
    let output: string;
    // tslint:disable-next-line:max-line-length
    const kinkList = ["risky", "pregnancy", "sizequeen", "cumSlut", "sub", "exhibition", "masochist", "buttSlut", "public", "slut", "superSlut", "hyperSlut", "oral", "anal", "force", "rape", "liberate", "easy", "nips", "dom", "water", "bond", "hard", "fap", "shame"];
    // tslint:disable-next-line:max-line-length
    const muteList = ["milk", "acid", "birthCon", "multiple", "gestate", "cycle", "twinWomb", "period", "immune", "mouth", "contort", "cumpire", "pseudoPreg", "elastic", "litePhero", "fertStorm", "goddess", "pheromone"];
    const otherList = ["intro", "extro", "op", "cl"];
    // tslint:disable-next-line:max-line-length
    const traitList = ["caring", "bitch", "maternal", "romantic", "deceptive", "devious", "persuasive", "perceptive", "forgetful", "forgiving", "lowEsteem", "picky", "crude", "friendly", "approachable", "relaxed", "flirty", "materialist"];
    // tslint:disable-next-line:max-line-length
    const inTraitList = ["uncaring", "kind", "hatesKids", "aromantic", "honest", "straightForward", "follower", "oblivious", "goodMemory", "vengeful", "narcissist", "lowStandards", "refined", "unfriendly", "unapproachable", "ambitious", "shy", "hippy"];
    const varbs = /(libido|will)/g;
    // const opers = /[<>=]{1,2}/g;
    for (let i = 0; i < tagNum; i++) {
      if (this.payload[i].name === "or") {
        output = this.payload[i].contents;
        break;
      }
      if (this.payload[i].args.length < 1) {
        return this.error(`The ${this.payload[i].name} tag requires at least one argument.`);
      }
      const content = this.payload[i].args.raw.trim();
      const args = content.split(" ");
      const checked: any[] = [];
      for (let j = 0, d = args.length; j < d; j++) {
        const not = (args[j].slice(0, 1) === "!") ? true : false;
        const item = (not) ? args[j].slice(1) : args[j];
        aw.con.info(`Has macro item is ${item}`); // TODO REMOVE ME!
        if (item === "&&" || item === "||" || item === "(" || item === ")") {
          checked.push(item);
        } else if (kinkList.includes(item)) {
          // check against kinks.
          const kink = ↂ.pc.kink[item];
          if (not && !kink) {
            checked.push(true);
          } else if (!not && kink) {
            checked.push(true);
          } else {
            checked.push(false);
          }
        } else if (traitList.includes(item)) {
          // standard traits
          const trait = (ↂ.pc.trait[item] === 1) ? true : false;
          if (not && !trait) {
            checked.push(true);
          } else if (!not && trait) {
            checked.push(true);
          } else {
            checked.push(false);
          }
        } else if (inTraitList.includes(item)) {
          // inverse traits must be -1 to be true.
          // use traitlist to get proper variable
          const index = inTraitList.findIndex(item);
          const trait = (ↂ.pc.trait[traitList[index]] === -1) ? true : false;
          if (not && !trait) {
            checked.push(true);
          } else if (!not && trait) {
            checked.push(true);
          } else {
            checked.push(false);
          }
        } else if (otherList.includes(item)) {
          // other items
          const trait = ↂ.pc.trait[item];
          if (not && !trait) {
            checked.push(true);
          } else if (!not && trait) {
            checked.push(true);
          } else {
            checked.push(false);
          }
        } else if (muteList.includes(item)) {
          // check mutes
          const mute = ↂ.pc.mutate[item];
          if (not && !mute) {
            checked.push(true);
          } else if (!not && mute) {
            checked.push(true);
          } else {
            checked.push(false);
          }
        } else if (varbs.test(item)) {
          if (item.slice(0, 4) === "will") {
            const val = ↂ.pc.status.will;
            const stringer = val + " " + item.slice(4);
            let res = false;
            try {
              res = eval(stringer);
            } catch (e) {
              aw.con.warn(`Bad logic in <<has macro. Item = "${item}". error = ${e.name}: ${e.message}.`);
            }
            if (typeof res !== "boolean") {
              res = false;
              aw.con.warn(`Bad logic in <<has macro. Item = "${item}". evaluates as non-boolean value.`);
            }
            checked.push(res);
          } else if (item.slice(0, 6) === "libido") {
            const val = ↂ.pc.trait.libido;
            const stringer = val + " " + item.slice(6);
            let res = false;
            try {
              res = eval(stringer);
            } catch (e) {
              aw.con.warn(`Bad logic in <<has macro. Item = "${item}". error = ${e.name}: ${e.message}.`);
            }
            if (typeof res !== "boolean") {
              res = false;
              aw.con.warn(`Bad logic in <<has macro. Item = "${item}". evaluates as non-boolean value.`);
            }
            checked.push(res);
          }
        } else {
          // just try a standard eval for logic...
          let res = false;
          try {
            res = eval(item);
          } catch (e) {
            aw.con.warn(`Bad logic in <<has macro. Item = "${item}". error = ${e.name}: ${e.message}.`);
          }
          if (typeof res !== "boolean") {
            res = false;
            aw.con.warn(`Bad logic in <<has macro. Item = "${item}". evaluates as non-boolean value.`);
          }
          checked.push(res);
        }
      }
      // we now have an array of booleans and operators
      // we want to implement an implicit "&&" between booleans that don't have a specified operator
      const implicit: any[] = [];
      let mem = "true";
      let nem = -1;
      for (let j = 0, d = checked.length; j < d; j++) {
        if (typeof checked[j] === "string") { // means it's an operator and not a boolean
          implicit.push(checked[j]);
          mem = checked[j];
          nem++;
        } else if (typeof checked[j] === "boolean" && typeof mem === "string") { // new boolean after an operator
          const vWord = (checked[j]) ? "true" : "false";
          implicit.push(vWord);
          mem = checked[j];
          nem ++;
        } else if (typeof checked[j] === "boolean" && typeof mem === "boolean") {
          // don't increment or change mem because previous was already boolean.
          if (mem && !checked[j]) {
            implicit[nem] = "false";
          }
        } else {
          aw.con.warn(`Some kind of crazy error happened with has macro. given value ${checked[j]}`);
        }
      }
      const sum = "( " + implicit.join(" ") + ")"; // turns result into a single parseable string
      let answer = false;
      try {
        answer = eval(sum);
      } catch (e) {
        aw.con.warn(`has macro sum eval failure. given text: "${sum}".`);
      }
      if (answer && typeof answer === "boolean") {
        output = this.payload[i].contents;
        break;
      }
    }
    return new Wikifier(this.output, output!);
  },
});

/*
DIALOG CHOICE MACRO
<<dialogchoice>> is just a wrapper for the sub-tags:
<<dbutt "button text" ["logic"]>> (TWEE)
  adds a button. on click performs the twee after the tag.
  argument "logic" is a valid javascript expression or simply a variable. if true, button is enabled
  if false, the button is "disabled". any falsy value disables the button. ex: "ↂ.kink.rape" disables
  if no rape kink. Another example: "(State.temporary.balls > 1)" is enabled if more than 1 ball.
<<dtext [emojikey]>> (TWEE)
  adds hover text (the twee after the tag) to the preceding button.
  optional emojikey will display an emoji as well if the player has that enabled. the keys are the same
  as the ones for the <<emo>> macro above.
*/
Macro.add("dialogchoice", {
  tags: ["dbutt", "dtext"],
  handler() {
    if (this.payload.length < 3) {
      return this.error("hey, what are you doing? the dialogchoice macro needs at LEAST one option!");
    }
    let buttons = '<div id="dialog-choice-buttons">';
    let desc = '<div id="dialog-choice-text">';
    let revTag;
    function hoverz(triggerId: string, showId: string) {
      $(triggerId).hover(
        function() {
          $(showId).show();
        }, function() {
          $(showId).hide();
        },
      );
      $(showId).hide();
    }
    const space = /\s/g;
    const symbol = /\W/g;
    for (const payload of this.payload) {
      if (payload.name === "dbutt") {
        if (payload.args.length < 1) {
          return this.error(`Dialog Choice macro button tag is missing the button text argument!`);
        } else if (payload.args.length > 2) {
          return this.error(`too many arguments (${payload.args.length}) in the dialog choice button tag!`);
        }
        revTag = payload.args[0].replace(space, "_");
        revTag = revTag.replace(symbol, "");
        let txt;
        if (payload.args.length === 2) {
          let test = false;
          try {
            test = eval(payload.args[1]);
          } catch (e) {
            // do nothing and stick with test = false. this will "disable" the button.
          }
          if (test) { // if eval returns true, then allow the button like an "if" check
            txt = `<span id="${revTag}-butt"><<button "${payload.args[0].toUpperCase()}">>${payload.contents}<</button>></span>`;
          } else {
            txt = `<span id="${revTag}-butt"><span class="disabled"><<tooltip "${setup.reasonYouCant(payload.args[1])}">><<button "${payload.args[0].toUpperCase()}">><</button>><</tooltip>><<run setup.tooltipper()>></span></span>`;
          }
        } else {
          txt = `<span id="${revTag}-butt"><<button "${payload.args[0].toUpperCase()}">>${payload.contents}<</button>></span>`;
        }
        buttons += txt;
      } else if (payload.name === "dtext") {
        if (revTag == null) {
          return this.error("Dialog Choice Error - dtext tag must come AFTER dbutt tag.");
        }
        let emo = "";
        if (payload.args.length > 0) {
          emo = `<<emo ${payload.args[0]}>> &nbsp; &nbsp; `;
        }
        desc += `<span id="${revTag}">${emo}${payload.contents}</span>`;
        const tg = "#" + revTag + "-butt";
        const hi = "#" + revTag;
        setTimeout(() => hoverz(tg, hi), 50);
      }
    }
    const output = `<div id="dialog-choice-cunt">${buttons}</div>${desc}</div></div>`;
    return new Wikifier(this.output, output);
  },
});

Macro.add("ctn", {
  tags: [null],
  handler() {
    if (this.payload[0].args.length > 0) {
      const output = `<span class="ctn"><span class="${this.payload[0].args[0]}">${this.payload[0].contents}</span></span>`;
      return new Wikifier(this.output, output);
    } else {
      const output = `<span class="ctn">${this.payload[0].contents}</span>`;
      return new Wikifier(this.output, output);
    }
  },
});


Macro.add("pcCleanStatus", {
  handler() {
    const out = setup.cleanStatus();
    return new Wikifier(this.output, out);
  },
});

Macro.add("gate", {
  tags: [null],
  handler() {
    let output = "<span class='bad'><b>ERROR in <<gate>> macro!</b></span>";
    if (this.payload[0].args.length < 1) {
      output += " <span class='bad'>No content names provided <<gate [content]>></span>";
    } else {
      const content = this.payload[0].args; // .flatten();
      if (setup.gate(content)) {
        output = `<div id="blockedContent" class='import gold'>&lt;[Content has been blocked due to your allowed content settings. <<link "&lt;view anyway&gt;">><<replace "#blockedContent">>${this.payload[0].contents}<</replace>><</link>>]&gt;</div>`;
      } else {
        output = this.payload[0].contents;
      }
    }
    return new Wikifier(this.output, output);
  },
});

Macro.add("hovrev", {
  tags: [null],
  handler() {
    const revise = function(nid: string): void {
      const fid = "#hovrev-" + nid;
      const showId = "#hovtxt-" + nid;
      $(fid).hover(
        function() {
          $(showId).show();
        }, function() {
          $(showId).hide();
        },
      );
    };
    const id = this.payload[0].args[0];
    const output = `<span id="hovrev-${id}">${this.payload[0].contents}</span>`;
    setTimeout(() => revise(id), 75);
    return new Wikifier(this.output, output);
  },
});

Macro.add("hovins", {
  tags: [null],
  handler() {
    const hider = function(nid: string): void {
      const fid = "#hovtxt-" + nid;
      $(fid).hide();
    };
    const id = this.payload[0].args[0];
    const output = `<span id="hovtxt-${id}">${this.payload[0].contents}</span>`;
    setTimeout(() => hider(id), 55);
    return new Wikifier(this.output, output);
  },
});

Macro.add("publicPrivacy", {
  handler() {
    let out = "error";
    switch (ↂ.map.loc[0]) {
      case "residential":
        switch (ↂ.map.loc[1]) {
          case "common":
            out = "dark corner of the common area";
            break;
          case "parking":
            out = "space between two cars";
            break;
          case "cumandgo":
            out = "dark corner of the store";
            break;
          case "recreation":
            out = "space between some hedges";
            break;
          case "reservoir":
          case "jogging":
            out = "grassy area between some bushes";
            break;
          default:
            out = "spot between two buildings";
            break;
        }
        break;
      case "downtown":
        switch (ↂ.map.loc[1]) {
          case "parking":
            out = "dark area of the parking garage";
            break;
          case "park":
          case "community":
            out = "hidden spot between some trees and bushes";
            break;
          case "mall":
            if (ↂ.map.loc[2] === "exterior") {
              out = "recess formed by a mall service entrance";
            } else {
              out = "employee service hallway";
            }
            break;
          case "townhall":
          case "square":
            out = "gap between the hedges and the town hall building";
            break;
          case "adult":
            out = "dark and narrow alleyway";
            break;
          default:
            out = "secluded spot in a nook between two buildings";
            break;
        }
        break;
      case "bullseye":
        switch (ↂ.map.loc[1]) {
          case "parking":
            out = "space between two large cars";
            break;
          case "womens1":
          case "womens2":
          case "lingerie":
          case "changing":
          case "girls":
          case "boys":
          case "mens":
            out = "changing room for trying on clothes";
            break;
          default:
            out = "slightly-hidden spot near the end of the aisle";
            break;
        }
      case "world":
        switch (ↂ.map.loc[1]) {
          case "appletree":
          case "institute":
            out = "secluded spot in an alley between buildings";
            break;
          case "bridge":
            out = "hidden spot under the bridge";
            break;
          case "spring":
          case "woods":
          case "forest":
            out = "grassy open spot surrounded by trees";
            break;
          case "visitor":
            out = "nook behind a brochure rack and large Muschi Valley map";
            break;
          default:
            out = "secluded spot away from prying eyes";
            break;
        }
        break;
      default:
        out = "secluded spot away from prying eyes";
        break;
    }
    return new Wikifier(this.output, out);
  },
});

Macro.add("cavemap", {
  handler() {
    const dirs = this.args[0].toUpperCase().split("");
    const P = "⚇"; // ¤
    const N = (dirs.includes("N")) ? " ⮝ " : "███";
    const E = (dirs.includes("E")) ? "⮞&nbsp;" : "██";
    const W = (dirs.includes("W")) ? "&nbsp;⮜" : "██";
    const S = (dirs.includes("S")) ? " ⮟ " : "███";
    let out = `<div style="position: absolute; top:3%; left: 3%; width: 14%; height: 20%;text-align:center;font-size:1.75rem;line-height: 1.6; z-index:5005; font-family: NovaMono;"><br>`;
    const corners: string[] = [];
    if (this.args.length > 1) {
      for (let i = 1; i < this.args.length; i++) {
        corners.push(this.args[i].toUpperCase());
      }
    }
    const NW = (corners.includes("NW")) ? "&nbsp;&nbsp;" : "██";
    const NE = (corners.includes("NE")) ? "&nbsp;&nbsp;" : "██";
    const SW = (corners.includes("SW")) ? "&nbsp;&nbsp;" : "██";
    const SE = (corners.includes("SE")) ? "&nbsp;&nbsp;" : "██";
    out += `${NW}${N}${NE}<br>`;
    out += `${W} ${P} ${E}<br>`;
    out += `${SW}${S}${SE}`;
    out += "</div>";
    return new Wikifier(this.output, out);
  },
});

Macro.add("cavebat", {
  handler() {
    const per = Math.ceil(Number(this.args[0]) / 6.65);
    const inv = 15 - per;
    let out = `<div style="position: absolute; top:25%;left:2%;width: 16%;z-index:5005;overflow:hidden;line-height: 1.2;">`;
    out += "Phone Battery:<br><span style='font-size:0.9rem;'>[";
    for (let i = 0; i < per; i++) {
      out += "◼";
    }
    for (let i = 0; i < inv; i++) {
      out += "◻";
    }
    out += `]</span></div>`;
    return new Wikifier(this.output, out);
  },
});

// ▙ ▟ ▛ ▜ ▓▓    ▮⮜ ⮞ ⮝ ⮟

Macro.add("dev", {
  tags: [null],
  handler() {
    if (State.active.variables.swim === "[dev]") {
      const output = `<span class="devNote">⮜ ${this.payload[0].contents} ⮞</span>`;
      return new Wikifier(this.output, output);
    }
  },
});

Macro.add("name", {
  handler() {
    let out = " ERROR IN NAME MACRO :( ";
    if (this.args.length < 1) {
      out = ↂ.pc.main.name;
    } else if (this.args.length === 1) {
      if (this.args[0] === "s") {
        out = ↂ.T.main.name;
      } else if (this.args[0] === "h") {
        out = State.active.variables.BFname;
      } else if (this.args[0] === "w") {
        out = aw.npc[ↂ.flag.liveWith].main.name;
      } else if (aw.npc[this.args[0]] !== null) {
        out = aw.npc[this.args[0]].main.name;
      } else {
        out = "[NPC Name Error]";
      }
    } else {
      out = " ERROR IN NAME MACRO, TOO MANY ARGUMENTS PROVIDED. ";
    }
    return new Wikifier(this.output, out);
    },
});

Macro.add("surname", {
  handler() {
    let out = " ERROR IN NAME MACRO :( ";
    if (this.args.length < 1) {
      out = ↂ.pc.main.surname;
    } else if (this.args.length === 1) {
      out = aw.npc[this.args[0]].main.surname;
    } else {
      out = " ERROR IN NAME MACRO, TOO MANY ARGUMENTS PROVIDED. ";
    }
    return new Wikifier(this.output, out);
  },
});

Macro.add("redact", {
  handler() {
    const out = "<span class='redacted'>[REDACTED]</span>";
    return new Wikifier(this.output, out);
  },
});

Macro.add("fetishes", {
  handler() {
    let out = "";
    const kinks = ["risky", "pregnancy", "sizequeen", "cumSlut", "sub", "exhibition", "masochist", "buttSlut", "public", "slut", "superSlut", "hyperSlut", "oral", "force", "dom", "water", "bond", "fap"];
    const kinksNames = ["into risky sex", "into pregnancy", "into big cocks", "a cum slut", "a submissive", "into exhibition", "a masochist", "love anal", "into public sex", "a slut", "a total slut", "very much into everything", "into sucking cocks", "into being taken by force", "into being a domme", "into piss play", "into bondage", "a big fan of fapping"];
    const final = [] as string[];
    for (let index = 0; index < kinks.length; index++) {
      if (ↂ.pc.kink[kinks[index]]) {
        final.push(kinksNames[index]);
      }
    }
    if (final.length > 2) {
      out = `I am ${final[0]}, ${final[1]} and ${final[2]}.`;
    } else if (final.length > 0) {
      out = `I am ${final[0]}.`;
    } else {
      out = `To be honest, I don't know if I am into something specific.`;
    }
    return new Wikifier(this.output, out);
  },
});

Macro.add("race", {
  handler() {
    if (!ↂ.pc.body.race) {
      throw new TypeError(`Player race is not defined!`);
    }

    const playerRace = ↂ.pc.body.race;

    return new Wikifier(this.output, playerRace);
  }
});

Macro.add("fert", {
  handler() {
    if (!ↂ.pc.fert.fertility) {
      throw new TypeError(`Player fertility is not defined!`);
    }

    let fertilityDesc;

    if (ↂ.pc.fert.fertility === 0) {
      fertilityDesc = "Barren";
    } else if (ↂ.pc.fert.fertility === 1) {
      fertilityDesc = "Very low";
    } else if (ↂ.pc.fert.fertility === 2) {
      fertilityDesc = "Low";
    } else if (ↂ.pc.fert.fertility === 3) {
      fertilityDesc = "Normal";
    } else if (ↂ.pc.fert.fertility === 4) {
      fertilityDesc = "High";
    } else if (ↂ.pc.fert.fertility > 4) {
      fertilityDesc = "Very high";
    }

    return new Wikifier(this.output, fertilityDesc);
  }
});
