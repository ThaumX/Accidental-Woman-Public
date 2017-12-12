/**********************************************************************************/
/*  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  */
/* ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌ */
/* ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀  */
/* ▐░▌               ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░▌       ▐░▌▐░▌           */
/* ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄  */
/* ▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌     ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌ */
/*  ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░█▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌ */
/*           ▐░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░▌       ▐░▌          ▐░▌ */
/*  ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌ */
/* ▐░░░░░░░░░░░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌ */
/*  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀         ▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  */
/*                                                                                */
/*  ThaumX - Functions to control character status variables                      */
/**********************************************************************************/
setup.status = {};
/********************************************************/
/*  ╔═╗┌┬┐┬─┐┌─┐┌─┐┌─┐   Alters the PC or NPC's stress  */
/*  ╚═╗ │ ├┬┘├┤ └─┐└─┐   variable by accounting for the */
/*  ╚═╝ ┴ ┴└─└─┘└─┘└─┘   impact from other variables    */
/********************************************************/
setup.status.stress = function (amt, tgt = -1, restore = false) {
  //tgt is set as default to -1. calling .status.stress(3); will target PC.
  //restore is default false. it true, isActive function will restore them if stored.
  //first create a pattern to test any string to ensure the npcid is correct.
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  let result; //variable to hold result from isActive 
  //if it isn't the PC, we check that the input is valid, and that the NPC is active to edit.
  if (tgt == -1) {
    const pc = true,
      id = "none";
    //assign object key based on target since we don't know if PC or not.
    const trait = "trait";
    const tit = State.active.variables.PC; //create tit as reference to correct object
  } else if ("number" == typeof tgt && tgt >= 0 && tgt < State.active.variables.activeNPC.length) {
    const pc = false,
      id = State.active.variables.activeNPC[tgt];
    const trait = "core"; //notice NPC uses core instead of trait
    const tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else if ("string" == typeof tgt && pattern.test(tgt)) {
    const pc = false,
      id = tgt;
    const trait = "core"; //notice NPC uses core instead of trait
    result = setup.isActive(tgt, restore);
    if (result == "stored") {
      let msg = "can't modify stress, NPC isn't active and restore isn't set to true. ID: " + id;
      console.log(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    } else if (result == "nonexist") {
      let msg = "The passed npcid doesn't exist! (stress function) ID: " + id;
      console.log(msg);
      if (State.active.variables.swim == "[dev]") {
        alert(msg);
      }
      return;
    }
    const tit = State.active.variables.NPC[id]; //we're setting the reference to the NPC instead
  } else {
    //we have bad input, meaning we throw an error and return.
    msg = "Stress function given invalid target, either not active, bad index, or bad id.";
    console.log(msg);
    //need to do this more regularly so that players don't get alerts they don't need.
    if (State.active.variables.swim == "[dev]") {
      alert(msg);
    }
    return false;
  }
  //load status !!important!!
  if (pc) {
    setup.statusLoad();
  }
  //now we have the correct N/PC to edit. let's set some default values for ease.
  let stress = tit.status.stress; //returns character's stress, and we can manipulate freely.
  let mod = 0; //start with zero to make reversing sign easier later.
  //this isn't really necessary, but can save time if you're using the same thing a lot.
  const open = tit[trait].op,
    closed = tit[trait].cl,
    intro = tit[trait].intro,
    extro = tit[trait].extro;
  if (open) {
    mod -= 0.3;
  } else if (closed) {
    mod += 0.3;
  }
  if (intro) {
    mod -= 0.2;
  } else if (extro) {
    mod += 0.2;
  }
  if (pc && tit[trait].relaxed == 1) {
    mod -= 0.2;
  } else if (pc && tit[trait].relaxed == -1) {
    mod += 0.2;
  }
  if (tit.status.need > 4) {
    mod += 1;
  } else if (tit.status.need > 3) {
    mod += 0.75;
  } else if (tit.status.need > 1) {
    mod += 0.5;
  } else if (tit.status.need > 0) {
    mod += 0.25;
  }
  /******************************/
  /* SITUATION TAGS PLACEHOLDER */
  /******************************/
  //time for sign flip
  if (amt < 0) {
    mod *= -1;
  }
  mod += 1; //adjust to proper multiplier
  mod = Math.max(0.25, mod); //keep modifier within range
  mod = Math.min(2.5, mod);
  amt = Math.round(amt * mod); //finally adjust amount
  //for cheat
  if (State.active.variables.cheatStress && amt >= 0) {
    amt = 0;
  }
  tit.status.stress += amt;
  //check for over or under values
  if (tit.status.stress > 100) {
    tit.status.overStress = true;
    tit.status.stress = 100 - random(0, 4);
  } else if (tit.status.stress < 0) {
    tit.status.stress = 0;
  }
  if (pc) {
    setup.statusSave();
  }
  if (result == "restored") {
    setup.storeNPC(tgt);
  }
};
/*
	<<set $PC.status.stress += _temp>>
	<<if $PC.status.stress > 100>>
		<<set $PC.status.overStress = true>>
		<<set $PC.status.stress = 100>>
	<</if>>
<<elseif _temp < 0>>
	<<if $PC.trait.vert == "introverted" && $PC.trait.open == "open">>
		<<set _temp *= 0.5>>
	<<elseif $PC.trait.vert != "extroverted" && $PC.trait.open == "open">>
		<<set _temp *= 0.7>>
	<<elseif $PC.trait.vert == "introverted" && $PC.trait.open != "closed">>
		<<set _temp *= 0.9>>
	<<elseif $PC.trait.vert == "introverted" && $PC.trait.open == "closed">>
		<<set _temp *= 1.2>>
	<<elseif $PC.trait.vert == "extroverted" && $PC.trait.open == "open">>
		<<set _temp *= 0.8>>
	<<elseif $PC.trait.vert == "extroverted" && $PC.trait.open == "closed">>
		<<set _temp *= 1.5>>
	<<elseif $PC.trait.open == "closed">>
		<<set _temp *= 1.3>>
	<<elseif $PC.trait.vert == "extroverted">>
		<<set _temp *= 1.1>>
	<</if>>
	<<if $PC.status.need > 1>>
		<<set _temp *= 0.5>>
	<</if>>
	<<set $PC.status.stress += _temp>>
	<<if $PC.status.stress < 0>>
		<<set $PC.status.stress = 0>>
	<</if>>
<<else>>
<</if>>
<<status 0>>
<</widget>>

<<widget "anger">>
<<if ndef $args[0]>>
	<<set _temp = passage()>>
	<<set $AW.error += ", anger setting error - no args sent to anger function in passage: ">>
	<<set $AW.error += _temp>>
	<<set _temp = 0>>
<<else>>
	<<set _temp = $args[0]>>
<</if>>
<<status 1>>
<<if _temp > 0>>
	<<if $PC.trait.open == "closed">>
		<<set _temp *= 1.5>>
	<</if>>
	<<if $PC.trait.bitch == 1>>
		<<set _temp *= 1.25>>
	<<elseif $PC.trait.bitch == -1>>
		<<set _temp *= 0.75>>
	<</if>>
	<<if $PC.status.need > 4>>
		<<set _temp *= 2>>
	<<elseif $PC.status.need == 4>>
		<<set _temp *= 1.75>>
	<<elseif $PC.status.need > 1>>
		<<set _Temp *= 1.5>>
	<<elseif $PC.status.need > 0>>
		<<set _temp *= 1.25>>
	<</if>>
	<<set $PC.status.anger += _temp>>
	<<if $PC.status.anger > 10>>
		<<set $PC.status.overAnger = true>>
		<<set $PC.status.anger = 10>>
	<</if>>
<<elseif _temp < 0>>
	<<if $PC.trait.forgiving == -1>>
		<<set _temp *= 0.75>>
	<<elseif $PC.trait.forgiving == 1>>
		<<set _temp *= 1.5>>
	<</if>>
	<<if $PC.status.need > 1>>
		<<set _temp *= 0.5>>
	<</if>>
	<<set $PC.status.anger += _temp>>
	<<if $PC.status.anger < 0>>
		<<set $PC.status.anger = 0>>
	<</if>>
<</if>>
<<status 0>>
<</widget>>

<<widget "happy">>
<<if ndef $args[0]>>
	<<set _temp = passage()>>
	<<set $AW.error += ", setting error - no args sent to happiness function in passage: ">>
	<<set $AW.error += _temp>>
	<<set _temp = 0>>
<<else>>
	<<set _temp = $args[0]>>
<</if>>
<<status 1>>
<<if _temp > 0>>
	<<if $PC.trait.vert == "extroverted">>
		<<set _temp *= 1.5>>
	<</if>>
	<<if $PC.trait.open == "closed">>
		<<set _temp *= 2/3>>
	<</if>>
	<<if $PC.trait.lowEsteem != 0>>
		<<set _temp *= 0.9>>
	<</if>>
	<<if $PC.status.need > 1>>
		<<set _temp *= 0.75>>
	<</if>>
	<<set $PC.status.happy += _temp>>
	<<if $PC.status.happy > 10>>
		<<set $PC.status.happy = 10>>
	<</if>>
<<elseif _temp < 0>>
	<<if $PC.trait.open == "closed">>
		<<set _temp *= 2/3>>
	<</if>>
	<<if $PC.trait.vert == "introverted">>
		<<set _temp *= 1.25>>
	<</if>>
	<<if $PC.trait.lowEsteem != 0>>
		<<set _temp *= 1.2>>
	<</if>>
	<<if $PC.status.need > 1>>
		<<set _temp *= 1.25>>
	<</if>>
	<<set $PC.status.happy += _temp>>
	<<if $PC.status.happy < -10>>
		<<set $PC.status.overDepress = true>>
		<<set $PC.status.happy = -10>>
	<</if>>
<</if>>
<<status 0>>
<</widget>>

<<widget "tired">>
<<if ndef $args[0]>>
	<<set _temp = passage()>>
	<<set $AW.error += ", fatigue setting error - no args sent to tired function in passage: ">>
	<<set $AW.error += _temp>>
	<<set _temp = 0>>
<<else>>
	<<set _temp = $args[0]>>
<</if>>
<<status 1>>
<<set $PC.status.fatigue += _temp>>
	<<if $PC.status.fatigue > 10>>
		<<set $PC.status.fatigue = 10>>
		<<set $PC.status.health -= random(5,10)>>
	<<elseif $PC.status.fatigue < 0>>
		<<set $PC.status.fatigue = 0>>
	<</if>>
<<status 0>>
<</widget>>

<<widget "arousal">>
<<if ndef $args[0]>>
	<<set $AW.error += ", arousal setting error - no args sent to function in passage: ">>
	<<set $AW.error += passage()>>
	<<set $args[0] = 0>>
<</if>>
<<status 1>>
<<if $args[0] == "X">>
	<<set $PC.status.arousal = 0>>
<<elseif $args[0] == "N">>
	<<if ndef $args[1]>>
		<<set $AW.error += ", arousal setting error - no args sent to function in passage: ">>
		<<set $AW.error += passage()>>
		<<set $PC.status.arousal = 0>>
	<<else>>
		<<switch $args[1]>>
		<<case 1>>
			<<set $PC.status.arousal = -1>>
		<<case 2>>
			<<set $PC.status.arousal = -2>>
		<<case 3>>
			<<set $PC.status.arousal = -3>>
		<<case 4>>
			<<set $PC.status.arousal = -4>>
		<<case 5>>
			<<set $PC.status.arousal = -5>>
		<<case 6>>
			<<set $PC.status.arousal = -6>>
		<<case default>>
			<<set $PC.status.arousal = -1>>
		<</switch>>
	<</if>>
<<elseif $PC.status.arousal < 0>>
	<<set $PC.status.arousal += $args[0]>>
	<<if $PC.kink.hyperSlut>>
		<<set $PC.status.arousal += 2>>
	<<elseif $PC.kink.superSlut>>
		<<set $PC.status.arousal += 1>>
	<<elseif $PC.kink.slut>>
		<<set $PC.status.arousal += either(0,0,1)>>
	<</if>>
	<<if $PC.trait.libido > 7>>
		<<set $PC.status.arousal += 1>>
	<</if>>
	<<if $PC.status.arousal < -6>>
		<<set $PC.status.arousal = -6>>
	<<elseif $PC.status.arousal > 0>>
		<<set $PC.status.arousal = 0>>
	<</if>>
<<else>>
	<<if $args[0] < 0>>
		<<set _mod = 1>>
		<<switch $PC.trait.libido>>
		<<case 1>>
			<<set _mod += 0.6>>
		<<case 2>>
			<<set _mod += 0.3>>
		<<case 3>>
			<<set _mod += 0>>
		<<case 4>>
			<<set _mod -= 0.1>>
		<<case 5>>
			<<set _mod -= 0.2>>
		<<case 6>>
			<<set _mod -= 0.3>>
		<<case 7>>
			<<set _mod -= 0.4>>
		<<case 8>>
			<<set _mod -= 0.5>>
		<<case 9>>
			<<set _mod -= 0.6>>
		<<case 10>>
			<<set _mod -= 0.8>>
		<</switch>>
		<<if $PC.kink.slut && $PC.kink.liberate>>
			<<set _mod -= 0.3>>
		<<elseif $PC.kink.slut>>
			<<set _mod -= 0.2>>
		<<elseif $PC.kink.liberate || $PC.kink.exhibition || $PC.kink.cumSlut || $PC.kink.sub || $PC.kink.risky>>
			<<set _mod -= 0.1>>
		<</if>>
		<<if $PC.kink.rape || $PC.kink.pregnancy || $PC.kink.masochist || $PC.kink.public || $PC.kink.sizequeen>>
			<<set _mod -= 0.1>>
		<</if>>
		<<if $PC.mutate.acid || $PC.mutate.birthCon || $PC.mutate.multiple || $PC.mutate.cycle || $PC.mutate.twinWomb || $PC.mutate.phero>>
			<<set _mod -= 0.1>>
		<</if>>
		<<if $PC.status.arousal > 9 && _mod < 0.5>>
			<<set _mod = 0.5>>
		<<elseif $PC.status.arousal > 9 && _mod < 1>>
			<<set _mod = 1>>
		<<elseif _mod <= 0>>
			<<set _mod = 0.1>>
		<</if>>
		<<set _temp = Math.round($args[0] * _mod)>>
	<<elseif $args[0] >= 0>>
		<<set _mod = 1>>
		<<switch $PC.trait.libido>>
		<<case 1>>
			<<set _mod -= 0.6>>
		<<case 2>>
			<<set _mod -= 0.3>>
		<<case 3>>
			<<set _mod -= 0>>
		<<case 4>>
			<<set _mod += 0.1>>
		<<case 5>>
			<<set _mod += 0.2>>
		<<case 6>>
			<<set _mod += 0.3>>
		<<case 7>>
			<<set _mod += 0.4>>
		<<case 8>>
			<<set _mod += 0.5>>
		<<case 9>>
			<<set _mod += 0.6>>
		<<case 10>>
			<<set _mod += 0.8>>
		<</switch>>
		<<if $PC.kink.slut && $PC.kink.liberate>>
			<<set _mod += 0.3>>
		<<elseif $PC.kink.slut>>
			<<set _mod += 0.2>>
		<<elseif $PC.kink.liberate || $PC.kink.exhibition || $PC.kink.cumSlut || $PC.kink.sub || $PC.kink.risky>>
			<<set _mod += 0.1>>
		<</if>>
		<<if $PC.kink.rape || $PC.kink.pregnancy || $PC.kink.masochist || $PC.kink.public || $PC.kink.sizequeen>>
			<<set _mod += 0.1>>
		<</if>>
		<<if $PC.mutate.acid || $PC.mutate.birthCon || $PC.mutate.multiple || $PC.mutate.cycle || $PC.mutate.twinWomb || $PC.mutate.phero>>
			<<set _mod += 0.1>>
		<</if>>
		<<if $PC.status.arousal > 9 && _mod > 2>>
			<<set _mod = 2>>
		<<elseif $PC.status.arousal > 9 && _mod > 1.5>>
			<<set _mod = 1.5>>
		<<elseif $PC.status.arousal > 9 && _mod > 1>>
			<<set _mod = 1>>
		<</if>>
		<<set _temp = Math.round($args[0] * _mod)>>
	<</if>>
	<<set $PC.status.arousal += _temp>>
	<<if $PC.status.arousal > 15>>
		<<set $PC.status.arousal = 15>>
		<<status 1>>
		<<if not $PC.status.mindbreak>>
			<<set $PC.status.mindbreak = either(true,false,false,false,false,false,false,false)>>
			<<if $PC.status.mindbreak>><<status 0>><<set alert("your mind is now broken")>><</if>>
		<</if>>
	<<elseif $PC.status.arousal < 0>>
		<<set $PC.status.arousal = 0>>
	<</if>>
<</if>>
<<status 0>>
<<if $PC.status.arousal > 13>>
	<<set alert("Your arousal is dangerously high!")>>
<</if>>
<</widget>>

<<widget "satisfaction">>
<<if ndef $args[0]>>
	<<set $AW.error += ", satisfaction setting error - no args sent to function in passage: ">>
	<<set $AW.error += passage()>>
	<<set $args[0] = 0>>
<</if>>
<<status 1>>
<<set $PC.status.satisfaction += $args[0]>>
<<if $PC.kink.slut && $args[0] < 0>>
	<<set $PC.status.satisfaction += Math.round($args[0] * 0.3)>>
<</if>>
<<if ( $PC.kink.superSlut || $PC.kink.hyperSlut ) && $args[0] < 0>>
	<<set $PC.status.satisfaction += Math.round($args[0] * 0.5)>>
<</if>>
<<if $PC.trait.libido > 7 && $args[0] < 0>>
	<<set $PC.status.satisfaction += Math.round($args[0] * 0.2)>>
<</if>>
<<if $PC.status.satisfaction < 0 >>
	<<set $PC.status.underSatisfy += 1>>
	<<set $PC.status.satisfaction = 2>>
	<<set _rand = random(0,95)>>
	<<if $PC.kink.slut>><<set _rand += 10>><</if>>
	<<set _rand += $PC.trait.libido>>
	<<if _rand > 50>>
		<<status 1>>
		<<set $PC.status.need += 1>>
		<<status 0>>
	<</if>>
<<elseif $PC.status.satisfaction > 100>>
	<<set $PC.status.satisfaction = 100>>
	<<status 1>>
	<<if $PC.status.need > 0>>
		<<set $PC.status.need -= 1>>
		<<status 0>>
	<</if>>
<</if>>
<<status 0>>
<</widget>>
*/