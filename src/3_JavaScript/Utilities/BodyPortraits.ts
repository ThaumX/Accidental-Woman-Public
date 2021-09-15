


setup.bodyPortraitFemale = function(char: string = "pc"): string {
  let isPC = true;
  if (char !== "PC" && char !== "pc") {
    isPC = false;
    if (!setup.npcid.test(char)) {
      return `ERROR: Invalid NPCID ${char}`;
    }
    if (aw.npc[char] == null) {
      return `ERROR: NPC ${char} Doesn't Exist`;
    }
    if (!aw.npc[char].main.female) {
      return setup.bodyPortraitMale(char);
    }
  }
  const ᛝ = (char === "PC" || char === "pc") ? ↂ.pc : aw.npc[char];
  const hip = ᛝ.body.hips; // 1 to 8
  const shoulder = Math.min(4, ᛝ.body.shoulders); // 1 to 6 (4)
  const skin = "skin" + ᛝ.body.skinColor.replace(" ", "-");
  let output = "";
  // main body image
  output += `<img data-passage="IMG_BP_bodyH${hip}S${shoulder}" class="bodyPortrait ${skin}" style="z-index:2011">`;
  // body overlay muscle/skinny - 1: muscle 2: slight skinny 3: very skinny
  if (ᛝ.body.weight < 2) {
    output += `<img data-passage="IMG_BP_Skinny3s${shoulder}" class="bodyPortrait ${skin}" style="z-index:2012">`;
  } else if (ᛝ.body.weight === 2 || (ᛝ.body.weight < 4 && ᛝ.body.tone < 3)) {
    output += `<img data-passage="IMG_BP_Skinny2s${shoulder}" class="bodyPortrait ${skin}" style="z-index:2012">`;
  } else if (ᛝ.body.tone > 4) {
    output += `<img data-passage="IMG_BP_Skinny1s${shoulder}" class="bodyPortrait ${skin}" style="z-index:2012">`;
  }
  if (ᛝ.body.tone > 5) {
    output += `<img data-passage="IMG_BP_MuscArmS${shoulder}" class="bodyPortrait ${skin}" style="z-index:2013">`;
  }
  // Boobies!
  const breastCup = (ᛝ.body.tits.cupNum === 0) ? 0 : Math.min(30, Math.floor(ᛝ.body.tits.cupNum / 3) + 1);
  if (breastCup > 0) { // if size 0, use base body tits (no boobs) and no special nipples
    const cup = (breastCup < 10) ? "0" + breastCup : breastCup; // convert to 01 02 03 format
    // breast image
    output += `<img data-passage="IMG_BP_BreastBase${cup}" class="bodyPortrait ${skin}" style="z-index:2020">`;
    // large areola option
    if (ᛝ.body.tits.areola > 3) {
      output += `<img data-passage="IMG_BP_LrgAreola${cup}" class="bodyPortrait ${skin}" style="z-index:2021">`;
    }
    // inverted or huge nipple options
    if (ᛝ.body.tits.nipLength > 6) {
      output += `<img data-passage="IMG_BP_LrgNip${cup}" class="bodyPortrait ${skin}" style="z-index:2022">`;
    } else if (ᛝ.body.tits.nipLength < 3) {
      // inverted
      output += `<img data-passage="IMG_BP_InvNip${cup}" class="bodyPortrait ${skin}" style="z-index:2022">`;
    }

  }
  // Large Labia - IMG_BP_Labia1
  if (ᛝ.body.labia > 1) {
    const labia = ᛝ.body.labia - 1;
    output += `<img data-passage="IMG_BP_Labia${labia}" class="bodyPortrait ${skin}" style="z-index:2015">`;
  }
  // PUBES
  let pube = "0";
  switch (ᛝ.groom.pubeStyle) { // determine which pube image to use
    case "bushy":
      pube = "10";
    case "trimmed":
      pube = "10";
    case "garden":
      pube = "08";
    case "mohawk":
      pube = "06";
    case "neatly-trimmed":
      pube = "07";
      break;
    case "bikinitrim":
      pube = "10";
      break;
    case "bikiniline":
      pube = "09";
      break;
    case "triangular":
      pube = "07";
      break;
    case "martini":
      pube = "03";
      break;
    case "heart":
      pube = "04";
      break;
    case "neat patch":
      pube = "05";
      break;
    case "landing-strip":
      pube = "05";
      break;
    case "stamp":
      pube = "01";
      break;
    case "stubble":
      pube = "0";
      break;
    case "brazilian":
      pube = "02";
      break;
    case "shaved":
      pube = "0";
      break;
    case "hairless":
      pube = "0";
      break;
  }
  if (pube !== "0") { // no need for pube image if no pubes
    // add pube image
    output += `<img data-passage="IMG_BP_Pubes${pube}" class="bodyPortrait ${skin}" style="z-index:2017">`;
  }
  // pregnant belly & womb tattoo
  if (ᛝ.status.fundalHeight > 5) {
    if (ᛝ.status.fundalHeight > 70) {
      // still bigger
      if (isPC && ↂ.flag.fertilitySeal) {
        output += `<img data-passage="IMG_BP_PregBelly7t" class="bodyPortrait ${skin}" style="z-index:2016">`;
      } else {
        output += `<img data-passage="IMG_BP_PregBelly7" class="bodyPortrait ${skin}" style="z-index:2016">`;
      }
    } else if (ᛝ.status.fundalHeight > 56) {
      // even bigger
      if (isPC && ↂ.flag.fertilitySeal) {
        output += `<img data-passage="IMG_BP_PregBelly6t" class="bodyPortrait ${skin}" style="z-index:2016">`;
      } else {
        output += `<img data-passage="IMG_BP_PregBelly6" class="bodyPortrait ${skin}" style="z-index:2016">`;
      }
    } else if (ᛝ.status.fundalHeight > 42) {
      // even bigger
      if (isPC && ↂ.flag.fertilitySeal) {
        output += `<img data-passage="IMG_BP_PregBelly5t" class="bodyPortrait ${skin}" style="z-index:2016">`;
      } else {
        output += `<img data-passage="IMG_BP_PregBelly5" class="bodyPortrait ${skin}" style="z-index:2016">`;
      }
    } else if (ᛝ.status.fundalHeight > 30) {
      // even bigger
      if (isPC && ↂ.flag.fertilitySeal) {
        output += `<img data-passage="IMG_BP_PregBelly4t" class="bodyPortrait ${skin}" style="z-index:2016">`;
      } else {
        output += `<img data-passage="IMG_BP_PregBelly4" class="bodyPortrait ${skin}" style="z-index:2016">`;
      }
    } else if (ᛝ.status.fundalHeight > 20) {
      // bigger belly
      if (isPC && ↂ.flag.fertilitySeal) {
        output += `<img data-passage="IMG_BP_PregBelly3t" class="bodyPortrait ${skin}" style="z-index:2016">`;
      } else {
        output += `<img data-passage="IMG_BP_PregBelly3" class="bodyPortrait ${skin}" style="z-index:2016">`;
      }
    } else if (ᛝ.status.fundalHeight > 12) {
      // belly
      if (isPC && ↂ.flag.fertilitySeal) {
        output += `<img data-passage="IMG_BP_PregBelly2t" class="bodyPortrait ${skin}" style="z-index:2016">`;
      } else {
        output += `<img data-passage="IMG_BP_PregBelly2" class="bodyPortrait ${skin}" style="z-index:2016">`;
      }
    } else {
      // slight belly
      if (isPC && ↂ.flag.fertilitySeal) {
        output += `<img data-passage="IMG_BP_PregBelly1t" class="bodyPortrait ${skin}" style="z-index:2016">`;
      } else {
        output += `<img data-passage="IMG_BP_PregBelly1" class="bodyPortrait ${skin}" style="z-index:2016">`;
      }
    }
  } else {
    // womb tat plain - not used on preg bellies
    if (isPC && ↂ.flag.fertilitySeal) {
      output += `<img data-passage="IMG_BP_WombTat" class="bodyPortrait ${skin}" style="z-index:2016">`;
    }
  }
  // mess
  if ((ᛝ.cond.vagFluid.cum != null && ᛝ.cond.vagFluid.cum > 0) || (ᛝ.cond.genitals.cum != null && ᛝ.cond.genitals.cum.amt > 0) || (ᛝ.cond.groin.cum != null && ᛝ.cond.groin.cum.amt > 0)) {
    output += `<img data-passage="IMG_BP_Cream${hip}" class="bodyPortrait ${skin}" style="z-index:2014">`;
  }
  if (!isPC && ᛝ.main.male) { // FUTA PENIS! IMG_BP_Penis
    output += `<img data-passage="IMG_BP_Penis" class="bodyPortrait ${skin}" style="z-index:2018">`;
  }
  return output;
};

setup.bodyPortraitMale = function(char: string): string {
  if (!setup.npcid.test(char)) {
    return `ERROR: Invalid NPCID ${char}`;
  }
  if (aw.npc[char] == null) {
    return `ERROR: NPC ${char} Doesn't Exist`;
  }
  const ᛝ = aw.npc[char];
  const hip = Math.ceil(ᛝ.body.hips / 2); // 1 to 4
  const shoulder = Math.min(4, ᛝ.body.shoulders); // 1 to 7
  const skin = "skin" + ᛝ.body.skinColor.replace(" ", "-");
  let output = "";
  // main body image
  output += `<img data-passage="IMG_BP_M_body${shoulder}${hip}" class="bodyPortrait ${skin}" style="z-index:2011">`;
  // body overlay muscle/skinny - 1: muscle 2: slight skinny 3: very skinny
  if (ᛝ.body.weight < 2) {
    output += `<img data-passage="IMG_BP_M_Skinny3s${shoulder}" class="bodyPortrait ${skin}" style="z-index:2012">`;
  } else if (ᛝ.body.weight === 2 || (ᛝ.body.weight < 4 && ᛝ.body.tone < 3)) {
    output += `<img data-passage="IMG_BP_M_Skinny2s${shoulder}" class="bodyPortrait ${skin}" style="z-index:2012">`;
  } else if (ᛝ.body.tone > 4) {
    output += `<img data-passage="IMG_BP_m_Skinny1s${shoulder}" class="bodyPortrait ${skin}" style="z-index:2012">`;
  }
  if (ᛝ.body.tone > 5) {
    output += `<img data-passage="IMG_BP_MuscArmS${shoulder}" class="bodyPortrait ${skin}" style="z-index:2013">`;
  }
  // PUBES
  let pube = "0";
  switch (ᛝ.groom.pubeStyle) { // determine which pube image to use
    case "bushy":
      pube = "10";
    case "trimmed":
      pube = "10";
    case "garden":
      pube = "08";
    case "mohawk":
      pube = "06";
    case "neatly-trimmed":
      pube = "07";
      break;
    case "bikinitrim":
      pube = "10";
      break;
    case "bikiniline":
      pube = "09";
      break;
    case "triangular":
      pube = "07";
      break;
    case "martini":
      pube = "03";
      break;
    case "heart":
      pube = "04";
      break;
    case "neat patch":
      pube = "05";
      break;
    case "landing-strip":
      pube = "05";
      break;
    case "stamp":
      pube = "01";
      break;
    case "stubble":
      pube = "0";
      break;
    case "brazilian":
      pube = "02";
      break;
    case "shaved":
      pube = "0";
      break;
    case "hairless":
      pube = "0";
      break;
  }
  if (pube !== "0") { // no need for pube image if no pubes
    // add pube image
    output += `<img data-passage="IMG_BP_Pubes${pube}" class="bodyPortrait ${skin}" style="z-index:2015">`;
  }
  // BALLS!
  if (ᛝ.body.balls.count < 1) { // nothing
    output += "";
  } else if (ᛝ.body.balls.size < 10) {
    output += `<img data-passage="IMG_BP_M_B1" class="bodyPortrait ${skin}" style="z-index:2017">`;
  } else if (ᛝ.body.balls.size < 30) {
    output += `<img data-passage="IMG_BP_M_B2" class="bodyPortrait ${skin}" style="z-index:2017">`;
  } else { // besty!
    output += `<img data-passage="IMG_BP_M_B3" class="bodyPortrait ${skin}" style="z-index:2017">`;
  }
  // PINUS!
  if (ᛝ.body.cock.length < 10) { // haha pindick
    output += `<img data-passage="IMG_BP_M_Penis1" class="bodyPortrait ${skin}" style="z-index:2018">`;
  } else if (ᛝ.body.cock.length < 30) {
    output += `<img data-passage="IMG_BP_M_Penis2" class="bodyPortrait ${skin}" style="z-index:2018">`;
  } else if (ᛝ.body.cock.length < 60) {
    output += `<img data-passage="IMG_BP_M_Penis3" class="bodyPortrait ${skin}" style="z-index:2018">`;
  } else if (ᛝ.body.cock.length < 70) {
    output += `<img data-passage="IMG_BP_M_Penis4" class="bodyPortrait ${skin}" style="z-index:2018">`;
  } else if (ᛝ.body.cock.length < 90) {
    output += `<img data-passage="IMG_BP_M_Penis5" class="bodyPortrait ${skin}" style="z-index:2018">`;
  } else { // besty!
    output += `<img data-passage="IMG_BP_M_Penis6" class="bodyPortrait ${skin}" style="z-index:2018">`;
  }
  // mess
  if ((ᛝ.cond.vagFluid.cum != null && ᛝ.cond.vagFluid.cum > 0) || (ᛝ.cond.genitals.cum != null && ᛝ.cond.genitals.cum.amt > 0) || (ᛝ.cond.groin.cum != null && ᛝ.cond.groin.cum.amt > 0)) {
    output += `<img data-passage="IMG_BP_Cream${hip}" class="bodyPortrait ${skin}" style="z-index:2014">`;
  }
  return output;
};
