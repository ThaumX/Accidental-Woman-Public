
// ██╗███╗   ███╗
// ██║████╗ ████║
// ██║██╔████╔██║
// ██║██║╚██╔╝██║
// ██║██║ ╚═╝ ██║
// ╚═╝╚═╝     ╚═╝

interface SetupInteractMisc {
  tagText: (tag: string, name: string) => string;
  dateDecision: (npcId: string) => boolean;
  isDom: (npcId: string) => boolean;
  isSub: (npcId: string) => boolean;
  coconutBrain: (npcId: string, aiTags: string[]) => [number, string];
}

setup.interactionMisc = {} as SetupInteractMisc;

setup.interactionMisc.tagText = function(tag: string, name: string): string {
  let output = "You spend some time talking about ";
  switch (tag) {
    case "seriousIllness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine.`;
      break;
    case "illness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine.`;
      break;
    case "poorHealth":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine.`;
      break;
    case "amazingClothes":
      output += `just how nice your clothes are. It seems that ${name} is taken by your fashion sense.`;
      break;
    case "niceClothes":
      output += `the challenge of choosing the nice looking clothes. ${name} seems to enjoy it.`;
      break;
    case "formalClothing":
      output += `how you dressed so elegantly for the occasion.`;
      break;
    case "slovenlyClothes":
      output += `how slovenly you look today.`;
      break;
    case "superSexyClothes":
      output += `just how amazingly sexy your clothes are. ${name} is a bit stunned and has no idea why did you wear in such fashion.`;
      break;
    case "sexyClothes":
      output += `just how sexy your clothes are. ${name} is pretty sure this kind of outfit grants you all kind of attention.`;
      break;
    case "superCuteClothes":
      output += `how ludicrously cute your outfit is.`;
      break;
    case "cuteClothes":
      output += `how cute your outfit is.`;
      break;
    case "nakedBottom":
      output += `how you're walking around with your cunt exposed to the public, and how ${name} is not comfortable by your appearance.`;
      break;
    case "practNakedBottom":
      output += `how daring the lower portion of your outfit is.`;
      break;
    case "exhibitBottom":
      output += `how much the lower portion of your outfit shows off, and how ${name} is not comfortable by your appearance.`;
      break;
    case "nakedTop":
      output += `the freedom of being topless, and how ${name} is impressed by your appearance.`;
      break;
    case "buckNaked":
      output += `how you're walking around buck naked and basically begging to be arrested, and how ${name} is not comfortable by your appearance.`;
      break;
    case "practNakedTop":
      output += `how your top really frees your breasts. ${name} is impressed by your bravery.`;
      break;
    case "exhibitTop":
      output += `the eye-catching way your top <i>mostly</i> manages to barely conceal your breasts. ${name} is impressed by your bravery.`;
      break;
    case "pussyAccess":
    case "assAccess":
    case "buttAccess":
    case "nipAccess":
    case "titsAccess":
      output += `how your clothes conveniently allow access to certain parts of your anatomy.`;
      break;
    case "wetClothes":
      output += `how you ended up getting soaking wet just before you meet.`;
      break;
    case "stainedClothes":
      output += `how you ended up getting some rather suspicious stains on your clothes.`;
      break;
    case "damagedClothes":
      output += `how you ended up damaging your clothes so much.`;
      break;
    case "kinkyClothes":
      output += `just how sexy your clothes are. ${name} seems a bit disturbed.`;
      break;
    case "nightwear":
      output += `your decision to go outside in your lingerie, which is a pretty unusual attire to go out in.`;
      break;
    case "swimwear":
      output += `your unusual choice of wearing swimwear outside of the pool.`;
      break;
    case "athleticClothes":
      output += `your choice of convenient sport wear.`;
      break;
    case "lightPheromones":
      output += `how good you smell today.`;
      break;
    case "pheromones":
      output += `how disturbed ${name} is with that magnificent smell of yours.`;
      break;
    case "goddess":
      output += `how you manage to be so beautiful.`;
      break;
    case "hairyLegs":
      output += `about how long its been since you shaved your legs.`;
      break;
    case "hairyPits":
      output += `about the armpit hair poking out from between your arms.`;
      break;
    case "clownMakeup":
      output += `about your rather <i>special</i> choices with your makeup and how fun is too see you with it on.`;
      break;
    case "garishMakeup":
      output += `about your rather flashy makeup choices.`;
      break;
    case "bodywriting":
      output += `how humiliating it must be for you to have these words written on you with permanent marker`;
      break;
    case "scar":
      output += `how terrible this scar looks`;
      break;
    case "tattoo":
      output += `how nice are your tattoos`;
      break;
    case "lewdTattoo":
      output += `about rather "interesting" things noticeable on your skin`;
      break;
    case "addicted":
      const drug = ↂ.pc.status.addict.max;
      const drugText = {
        sex: "sex, and how you are thirsty for a good fucking.",
        alc: "booze, and how important is to wet your whistle as soon as possible.",
        heat: `heat, and how concerned is ${name} about your possible health issues.`,
        satyr: `satyr, and how concerned is ${name} about your possible health issues.`,
        focus: `focus, and how concerned is ${name} about your possible health issues.`,
        cum: `drinking cum, and how embarrassed ${name} feels with this topic.`,
        zone: `zone, and how concerned is ${name} about your possible health issues.`,
        cream: `your pussy being filled with cum, and how embarrassed ${name} feels with this topic.`,
      };
      output += `how much you <b>love</b> ${drugText[drug]}`;
      break;
    case "withdrawal":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine.`;
      break;
    case "stressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine.`;
      break;
    case "depressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine.`;
      break;
    case "sad":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine.`;
      break;
    case "aroused":
      output += `your skin is flushed and glowing making ${name} believe you being anxious for some reason.`;
      break;
    case "angry":
      output += `the stupid shit that's been going on in your life, and how pissed off you are about it.`;
      break;
    case "bimbo":
      output += `excited you are to spend some time together like bff, and stuff.`;
      break;
    case "perverted":
      output += `the porn the two of you have been watching lately.`;
      break;
    case "latePreg":
    case "preg":
      if (random(1, 3) === 1) {
        output += `how your pregnancy is coming along. You end up complaining a bit too much though.`;
      } else {
        output += `how your pregnancy is coming along, and just how much you love being pregnant.`;
      }
      break;
    case "drunk":
      output += `drunk you are right now.`;
      break;
    case "tipsy":
      output += `how good you feel after that drink you had just before you met ${name}.`;
      break;
    case "mindbreak":
      output += ``;
      break;
    case "fullTits":
      output += `how stuffed with milk your breasts are because you weren't able to pump them.`;
      break;
    default:
      output += either("a shocking story that hit the news recently.", "what you think of the cockmongering match that was aired the other night.", "how nice the weather has been recently.", "how awful the weather has been recently.", "about the trailer you saw for the Incubatrix sequel.", "last news.");
  }
  return output;
};

setup.interactionMisc.dateDecision = function(npcId: string): boolean {
  let out = false;
  let prefs = 0;
  let overall = 0;
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Error in setup.interactionMisc.dateDecision, ${npcId} was not found in aw.npc!`);
    return out;
  }
  const cat = aw.npc[npcId].rship.category;
  const npcPrefs = setup.week.insanePrefChecker(npcId);
  for (let index = 0; index < npcPrefs.length; index++) {
    prefs += npcPrefs[index];
  }
  overall = aw.npc[npcId].rship.lovePC + (aw.npc[npcId].trait.libido * 2) + (ↂ.pc.status.atr * 4) + (prefs * 4);
  if (aw.npc[npcId].main.female && !aw.npc[npcId].trait.bi && !aw.npc[npcId].trait.homo) {
    overall -= 30;
  }
  if (!aw.npc[npcId].main.female && aw.npc[npcId].main.male && !aw.npc[npcId].trait.bi && aw.npc[npcId].trait.homo) {
    overall -= 30;
  }
  aw.con.info(`${npcId} setup.interactionMisc.dateDecision is ${overall}, cat is ${cat}`);
  switch (cat) {
    case "acquaint":
      if (overall > 30) { out = true; };
      break;
    case "friend":
      if (overall > 60) { out = true; };
      break;
    case "engaged":
    case "lovers":
    case "exclusive":
    case "dating":
    case "married":
      if (overall > 10) { out = true; };
      break;
    case "enemies":
      if (overall > 100) { out = true; }; // lul
      break;
    default:
      if (overall > 50) { out = true; };
    break;
  }
  return out;
}

setup.interactionMisc.isDom = function(npcId: string): boolean {
  let res = false;
  for (let index = 0; index < ↂ.flag.doms.length; index++) {
    if (ↂ.flag.doms[index] === npcId) {
      res = true;
    }
  }
  return res;
}

setup.interactionMisc.isSub = function(npcId: string): boolean {
  let res = false;
  for (let index = 0; index < ↂ.flag.doms.length; index++) {
    if (ↂ.flag.subs[index] === npcId) {
      res = true;
    }
  }
  return res;
}

setup.interactionMisc.coconutBrain = function(npcId: string, aiTags: string[]): [number, string] {
  const tags = ["actLover", "neutEthic", "group", "sex", "neutral", "casual", "eat", "crowd", "crude", "intimate", "fancy", "sloppy", "nice", "drink", "travel", "play", "violence"];
  let opinion = 0;
  const goodReasons = [] as string[];
  const badReasons = [] as string[];
  if (aw.npc[npcId] !== null) {
    if (aiTags.length < 1) {
      aw.con.warn(`coconutBrain error! aiTags ${aiTags} are empty!`);
      return [5, "Error in CB system, please report it!"];
    }
    for (let index = 0; index < aiTags.length; index++) {
      if (!tags.includes(aiTags[index])) {
        aiTags.splice(index, 1);
      }
    }
    for (let ii = 0; ii < aiTags.length; ii++) {
      switch (aiTags[ii]) {
        case "actLover":
          opinion += aw.npc[npcId].pref.romance;
          break;
        case "neutEthic":
          break;
        case "group":
          if (aw.npc[npcId].trait.extro) {
            opinion += 1;
            goodReasons.push("I like people around");
          } else if (aw.npc[npcId].trait.intro) {
            opinion -= 1;
            badReasons.push("There is a tad too many people for my tastes.");
          }
          break;
        case "sex":
          opinion += Math.floor(aw.npc[npcId].trait.libido / 2);
          goodReasons.push("Mmm, sounds sexy!");
          break;
        case "casual":
          opinion += aw.npc[npcId].pref.popular;
          if (aw.npc[npcId].pref.popular > 1) {
            goodReasons.push("I am glad you proposed this, sounds like good normal fun!");
          } else {
            goodReasons.push("Not hipster enough for me. Hey, I don't say I am a hipster... ugh.");
          }
          break;
        case "eat":
          opinion += 1;
          break;
        case "crowd":
          if (aw.npc[npcId].trait.extro) {
            opinion += 2;
            goodReasons.push("Nice, to be honest, I really like being around other people!");
          } else if (aw.npc[npcId].trait.intro) {
            opinion -= 2;
            badReasons.push("It is way too crowded in my opinion.");
          }
          break;
        case "crude":
          opinion += (aw.npc[npcId].pref.fancy * -1);
          if (aw.npc[npcId].pref.fancy > 1) {
            badReasons.push("I personally prefer something more... fancy if you understand what I mean.");
          } else {
            goodReasons.push("Yay, this is cool! I don't like the overly-sophisticated stuff.");
          }
            break;
        case "intimate":
          opinion += aw.npc[npcId].pref.romance;
          break;
        case "fancy":
          opinion += aw.npc[npcId].pref.fancy;
          if (aw.npc[npcId].pref.fancy > 1) {
            goodReasons.push("That's fancy! I must admit it pleases me.");
          } else {
            goodReasons.push("I am not a big fan of such fancy stuff.");
          }
          break;
        case "sloppy":
          opinion += (aw.npc[npcId].pref.fancy * -1);
          if (aw.npc[npcId].pref.fancy > 1) {
            badReasons.push("I don't want to sound like a snob but it is a bit too sloppy for me.");
          }
          break;
        case "nice":
          opinion += 1; // lol everybody likes those
          break;
        case "drink":
          if (aw.npc[npcId].status.addict.alc > 60) {
            opinion += 3;
            goodReasons.push("Booze is always the answer!");
          } else if (aw.npc[npcId].status.addict.alc > 40) {
            opinion += 2;
            goodReasons.push("A drink or two never hurts.");
          } else if (aw.npc[npcId].status.addict.alc > 20) {
            opinion += 1;
          }
          if (aw.npc[npcId].status.addict.alcNeed > 60) {
            opinion += 8;
            goodReasons.push("I could really use some booze right now!");
          }
          break;
        case "travel":
          opinion += aw.npc[npcId].pref.active;
          if (aw.npc[npcId].pref.active > 1) {
            badReasons.push("I really like to go outside.");
          } else {
            goodReasons.push("I'd prefer staying inside.");
          }
          break;
        case "play":
          opinion += aw.npc[npcId].pref.excite;
          if (aw.npc[npcId].pref.excite > 1) {
            badReasons.push("I must admit I like games and whatnot.");
          } else {
            goodReasons.push("I am not a big fan of such stuff.");
          }
          break;
        case "violence":
          if (aw.npc[npcId].kink.sub || aw.npc[npcId].kink.dom || aw.npc[npcId].kink.masochist) {
            opinion += 1;
          } else {
            opinion -= 2;
            badReasons.push("Ugh, that's... unorthodox.");
          }
          if (aw.npc[npcId].trait.open) {
            opinion += 1;
          }
          if (badReasons.length < 1) {
            badReasons.push("");
          }
          if (goodReasons.length < 1) {
            goodReasons.push("");
          }
          break;
        default:
          break;
      }
    }
    aw.con.info(`coconutBrain results: ${opinion}`);
    if (opinion > 8) {
      opinion = 8;
    }
    if (opinion < 0) {
      opinion = 0;
    }
    if (opinion > 4) {
      return [opinion, either(goodReasons)];
    } else if (opinion === 4) {
      return [opinion, " "];
    } else {
      return [opinion, either(badReasons)];
    }
  } else {
    aw.con.warn(`coconutBrain error! npcId ${npcId} was not found in aw.npc :(`);
    return [5, "Error in CB system, please report it!"];
  }
}