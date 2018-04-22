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
    State.active.variables.UIimgFlag = true;
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
          id.push(State.active.variables.activeNPC[this.args[0]]);
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
    State.active.variables.UIimgFlag = true;
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
Macro.add("tag", {
  tags: null,
  handler: function () {
    //const pattern = RegExp(/[,\s\n\[\]\(\)]+/);
    let tags = this.payload.args.full.split(pattern);
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
  }
});
Macro.add("sp", {
  handler: function () {
    let out = "&nbsp;";
    if (this.args.length == 0) {
      //nothing
    } else if ("number" == typeof this.args[0]) {
      for (let i = 1; i < this.args[0]; i++) {
        out += "&nbsp;";
      }
    }
    return new Wikifier(this.output, out);
  }
});
Macro.add("tab", {
  handler: function () {
    let out = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    return new Wikifier(this.output, out);
  }
});

Macro.add("scrolltop", {
  handler: function () {
    if(this.args.length == 0){
      setup.alert(`No element id sent to scrolltop macro!`);
      return;
    }else if("string" == typeof this.args[0]){
      let id = this.args[0];
      if(id.slice(0,1) == "#"){
        $(id).animate({ scrollTop: 0 }, "fast");
      }else{
        setup.alert(`element id sent to scrolltop macro is missing #! ${this.args[0]}`);
      }
    }else{
      setup.alert(`invalid element id sent to scrolltop macro! ${this.args[0]}`);
    }
  }
});

Macro.add("space", {
  tags: null,
  handler: function () {
    let str = this.payload[0].contents;
    let txt, macs;
    let ind = str.search(/(<<)(.)+(>>)/);
    if (ind !== -1) { //there are macros inside that need to be preserved
      let wrk, newstr = "";
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
  }
});
Macro.add("npcLove", {
  handler: function () {
    let amt = 1,
      npc = "none",
      tgt = 0;
    let AW = State.active.variables;
    const coded = new RegExp(/n[0-9]{3,5}$/);
    if (this.args.length < 2 || this.args.length > 3) {
      return this.error("Incorrect number of arguments sent to npcLove macro. amt npc [tgt]");
    }
    if ("number" == typeof this.args[0]) {
      amt = Math.round(this.args[0]);
    } else {
      return this.error(`Bad amount value ${this.args[0]} sent to npcLove macro. Must be a number.`);
    }
    if ("number" == typeof this.args[1]) {
      try {
        npc = AW.activeNPC[this.args[1]];
      } catch (e) {
        return this.error(`invalid activeNPC index ${this.args[1]}sent to npcLove macro.`);
      }
    } else if ("string" == typeof this.args[1] && coded.test(this.args[1])) {
      npc = this.args[1];
    } else {
      return this.error(`invalid npc id ${this.args[1]} sent to npcLove macro.`);
    }
    if (this.args.length == 3 && "number" == typeof this.args[2]) {
      tgt = this.args[2];
    }
    switch (tgt) {
    case 0: //affects both
      AW.NPC[npc].rship.lovePC += amt;
      AW.NPC[npc].rship.loveNPC += amt;
      break;
    case 1: //affects only PC feelings
      AW.NPC[npc].rship.loveNPC += amt;
      break;
    case 2: //affects only NPC feelings
      AW.NPC[npc].rship.lovePC += amt;
      break;
    default: //default affects both
      AW.NPC[npc].rship.lovePC += amt;
      AW.NPC[npc].rship.loveNPC += amt;
      break;
    }
  }
});
Macro.add("npcLike", {
  handler: function () {
    let amt = 1,
      npc = "none",
      tgt = 0;
    let AW = State.active.variables;
    const coded = new RegExp(/n[0-9]{3,5}$/);
    if (this.args.length < 2 || this.args.length > 3) {
      return this.error("Incorrect number of arguments sent to npcLike macro. amt npc [tgt]");
    }
    if ("number" == typeof this.args[0]) {
      amt = Math.round(this.args[0]);
    } else {
      return this.error(`Bad amount value ${this.args[0]} sent to npcLike macro. Must be a number.`);
    }
    if ("number" == typeof this.args[1]) {
      try {
        npc = AW.activeNPC[this.args[1]];
      } catch (e) {
        return this.error(`invalid activeNPC index ${this.args[1]}sent to npcLike macro.`);
      }
    } else if ("string" == typeof this.args[1] && coded.test(this.args[1])) {
      npc = this.args[1];
    } else {
      return this.error(`invalid npc id ${this.args[1]} sent to npcLike macro.`);
    }
    if (this.args.length == 3 && "number" == typeof this.args[2]) {
      tgt = this.args[2];
    }
    switch (tgt) {
    case 0: //affects both
      AW.NPC[npc].rship.likePC += amt;
      AW.NPC[npc].rship.likeNPC += amt;
      break;
    case 1: //affects only PC feelings
      AW.NPC[npc].rship.likeNPC += amt;
      break;
    case 2: //affects only NPC feelings
      AW.NPC[npc].rship.likePC += amt;
      break;
    default: //default affects both
      AW.NPC[npc].rship.likePC += amt;
      AW.NPC[npc].rship.likeNPC += amt;
      break;
    }
  }
});

Macro.add("colorpick",{
  handler: function(){
    let jesusfuck,cumsuck;
    if(this.args.length == 0){
      jesusfuck = "testesfucker";
    }else{
      jesusfuck = this.args[0];
    }
    if(this.args.length == 2){
      cumsuck = this.args[1];
    }else{
      cumsuck = "#ffaa88";
    }
    var inn = document.createElement('input');
    var picker = new jscolor(inn);
    var cls = `setup.updatecolorpick(this)`;
    picker.fromString(cumsuck);
    jQuery(inn).attr({id : jesusfuck, name : jesusfuck, class : "jscolor"}).on("change",function(){
      let nam = this.id;
      if(State.variables.pref.theme[nam] != null){
        let hex = "#" + this.value;
        State.variables.pref.theme[nam] = hex;
        setup.log(`New color is ${hex}.`);
      }
    }).appendTo(this.output);
  }
});

Macro.add("emo",{
  handler: function(){
    if(this.args.length != 1){
      return this.error(`The emo macro requires 1 emotion argument, ${this.args.length} were supplied.`);
    }
    if(!State.variables.pref.dispEmoji){
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
    };
    if(images[this.args[0]] == null){
      return this.error(`Supplied argument ${this.args[0]} does not match any valid emoji.`);
    }
    let op = `<span style="vertical-align: -8px;">${images[this.args[0]]}</span>`;
    return new Wikifier(this.output, op);
  }
});

Macro.add("info",{
  handler: function(){
    if(this.args.length != 2){
      return this.error(`The info(link) macro requires two arguments: link text and guide item, ${this.args.length} were supplied.`);
    }
    let op;
    if(!Story.has(this.args[1])){
      if(Story.has(this.args[0]) && "string" == typeof this.args[1]){
        op = `<span class="infoLink"><<link "${this.args[1]}">><<set $AW.infoLink = "${this.args[0]}">><<replace "#guidecontainer">><<include [[UIGuideContainer]]>><</replace>><</link>></span>`;
      }else{
        op = `<span class="infoLink"><<link "${this.args[0]}">><<set $AW.infoLink = "guideNotAvailable">><<replace "#guidecontainer">><<include [[UIGuideContainer]]>><</replace>><</link>></span>`;
      }
    }else{
      op = `<span class="infoLink"><<link "${this.args[0]}">><<set $AW.infoLink = "${this.args[1]}">><<replace "#guidecontainer">><<include [[UIGuideContainer]]>><</replace>><</link>></span>`;
    }
    return new Wikifier(this.output, op);
  }
});

Macro.add("animexit",{
  handler: function(){
    if(this.args.length < 3){
      setup.alert("Incorrect number of arguments supplied to 'animexit' macro! need element id, class to remove (or 0), and class to add for exit animation. [optional '#elementToEmptyOnFinish']");
      return;
    }else if(this.args[0].search("#") != -1){
      setup.alert("The animexit macro can only be used with an element id in the plain-JS style, no # sign!");
      return;
    }
    let kil = false, it;
    if(this.args[3] != null){
      if(this.args[3]){
        it = "#" + this.args[0];
        kil = true;
      }
    }
    var element = document.getElementById(this.args[0]);
    if(this.args[1] != 0){
      element.classList.remove(this.args[1]);
    }
    if(kil){
      element.addEventListener("webkitAnimationEnd", function(){$(it).remove();},false);
      element.addEventListener("animationend", function(){$(it).remove();},false);
      element.addEventListener("oanimationend", function(){$(it).remove();},false);
    }
    void element.offsetWidth;
    element.classList.add(this.args[2]);

  }
});

Macro.add("silly",{
  tags: null,
  handler: function(){
    if(State.variables.AW.sillyMode != null && State.variables.AW.sillyMode){
      return new Wikifier(this.output, `<span style="border-width:1px;border-style:dotted;border-color:#8effca;border-radius:4px;">${this.payload[0].contents}</span>`);
    }
  }
});

