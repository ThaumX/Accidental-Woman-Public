
// ██╗███╗   ███╗
// ██║████╗ ████║
// ██║██╔████╔██║
// ██║██║╚██╔╝██║
// ██║██║ ╚═╝ ██║
// ╚═╝╚═╝     ╚═╝

interface SetupInteractMisc {
  tagText: (tag: string, name: string) => string;
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
