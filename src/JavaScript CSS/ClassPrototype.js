/*define NPCs as a class with specific properties and methods*/
class NPC {
  constructor(body, main, sched, bground, rship, sex, flag, friends, clothes, status, cond, outfit, mutate, pref, core, fert, sexPref, makeout) {
    this.body = jQuery.extend(true, {}, body);
    this.main = jQuery.extend(true, {}, main);
    this.sched = jQuery.extend(true, {}, sched);
    this.bground = jQuery.extend(true, {}, bground);
    this.rship = jQuery.extend(true, {}, rship);
    this.sex = jQuery.extend(true, {}, sex);
    this.flag = jQuery.extend(true, {}, flag);
    this.friends = jQuery.extend(true, [], friends);
    this.clothes = jQuery.extend(true, {}, clothes);
    this.status = jQuery.extend(true, {}, status);
    this.cond = jQuery.extend(true, {}, cond);
    this.outfit = jQuery.extend(true, {}, outfit);
    this.mutate = jQuery.extend(true, {}, mutate);
    this.pref = jQuery.extend(true, {}, pref);
    this.core = jQuery.extend(true, {}, core);
    this.fert = jQuery.extend(true, {}, fert);
    this.makeout = jQuery.extend(true, [], makeout);
    this.name = function () {
      return (this.main.name + " " + this.main.surname);
    };
  }
}
class SexAct {
  constructor(name, key, library, effects, tags, cat, button, hovname, hovtext, action, allowList, req, tab, spec = "none") {
    this.longName = name;
    this.keyName = key;
    this.lib = jQuery.extend(true, {}, library);
    this.effect = jQuery.extend(true, {}, effects);
    this.tags = tags;
    this.cat = cat;
    this.hovname = hovname;
    this.button = "<<hoverrevise " + hovname + ">><<button " + button + ">><<run setup.sexActs." + key + ".action()>><<set $sex.pcLastAct = $sex.pcAct>><<run $sex.pcActRecord.push('" + key + "')>><<set $sex.pcAct = '" + key + "'>><<goto [[sexSceneControl]]>><</button>><<endhoverrevise>>";
    this.hovtext = "<<insertion " + hovname + ">>" + hovtext + "<<endinsertion>>";
    this.action = action;
    this.allowList = allowList;
    this.req = jQuery.extend(true, {}, req);
    this.tab = tab;
    this.spec = jQuery.extend(true, {}, spec);
  }
  get allowed() { // HEY! ME! USE includesAll() instead of a for loop.
    /*return false quickly if wrong tab*/
    var faild = "DEBUG: reasons to fail: ";
    if (this.tab != State.active.variables.sex.tabs) {
      return false;
    }
    var list = this.allowList;
    var tar = State.active.variables.sex.target;
    var n = list.length;
    if (list[0] != "none") {
      for (let i = 0; i < n; i++) {
        if (!State.active.variables.pref[list[i]]) {
          faild += "allowedListFailure.";
          alert(faild);
          return false;
        }
      }
    }
    if (this.req.pcCanAccess[0] != "none") {
      var npcAcc = State.active.variables.sex.npcAccessTags[tar];
      n = this.req.pcCanAccess.length;
      for (let i = 0; i < n; i++) {
        if (!npcAcc.includes(this.req.pcCanAccess[i])) {
          faild += "pc can access fail.";
          alert(faild);
          return false;
        }
      }
    }
    if (this.req.pcCanMouth[0] != "none") {
      var npcAccM = State.active.variables.sex.npcAccessMtags[tar];
      n = this.req.pcCanMouth.length;
      for (let i = 0; i < n; i++) {
        if (!npcAccM.includes(this.req.pcCanMouth[i])) {
          faild += "pc can access w/ mouth fail.";
          alert(faild);
          return false;
        }
      }
    }
    if (this.req.npcCanAccess[0] != "none") {
      var pcAcc = State.active.variables.sex.pcAccessTags;
      n = this.req.npcCanAccess.length;
      for (let i = 0; i < n; i++) {
        if (!pcAcc.includes(this.req.npcCanAccess[i])) {
          faild += "npc can access fail.";
          alert(faild);
          return false;
        }
      }
    }
    if (this.req.npcCanMouth[0] != "none") {
      var pcAccM = State.active.variables.sex.pcAccessMtags;
      n = this.req.npcCanMouth.length;
      for (let i = 0; i < n; i++) {
        if (!pcAccM.includes(this.req.npcCanMouth[i])) {
          faild += "npc can access w/ mouth fail.";
          alert(faild);
          return false;
        }
      }
    }
    if (this.req.loc[0] != "none") {
      var locTags = State.active.variables.sex.locTags;
      n = this.req.loc.length;
      for (let i = 0; i < n; i++) {
        if (!locTags.includes(this.req.loc[i])) {
          faild += "missing req location tag.";
          alert(faild);
          return false;
        }
      }
    }
    if (this.req.pos[0] != "none" && this.req.pos[0] != "specific") {
      var posTags = State.active.variables.sex.posTags;
      n = this.req.pos.length;
      for (let i = 0; i < n; i++) {
        if (!posTags.includes(this.req.pos[i])) {
          faild += "missing req pos tags.";
          alert(faild);
          return false;
        }
      }
    } else if (this.req.pos[0] == "specific") {
      var allow = this.req.pos;
      if (!allow.includes(State.active.variables.sex.pos)) {
        faild += "not in correct specific position.";
        alert(faild);
        return false;
      }
    }
    /*HOOK for checking for special ability-type stuff like cumpire if required for a special action*/
    return true;
  }
}
/*class SexActCloth {}*/
/*class SexActNPC {}*/
class SexPos {
  constructor(longName, keyName, library, prime, tags, cat, occupy, effect, action, req, jizz, control, inPos, move, wet, sPace, hovname, hovtext, button) {
    this.longName = longName;
    this.keyName = keyName;
    this.lib = jQuery.extend(true, {}, library);
    this.prime = jQuery.extend(true, {}, prime);
    this.tags = jQuery.extend(true, {}, tags);
    this.cat = cat;
    this.occupy = jQuery.extend(true, {}, occupy);
    this.effect = jQuery.extend(true, {}, effect);
    this.action = action;
    this.req = jQuery.extend(true, {}, req);
    this.jizz = jizz;
    this.control = jQuery.extend(true, {}, control);
    this.inPos = jQuery.extend(true, {}, inPos);
    this.move = jQuery.extend(true, {}, move);
    this.wet = jQuery.extend(true, {}, wet);
    this.sPace = sPace;
    this.hovname = hovname;
    this.button = "<<hoverrevise " + hovname + ">><<button " + button + ">><<set $sex.LastPos = $sex.pos>><<set $sex.pos = '" + keyName + "'>><<set $sex.pcOutput = 'You change position... god placeholders are lame.'>><<goto [[sexSceneControl]]>><</button>><<endhoverrevise>>";
    this.hovtext = "<<insertion " + hovname + ">>" + hovtext + "<<endinsertion>>";
  }
  get allowed() {
    return true;
  }
}