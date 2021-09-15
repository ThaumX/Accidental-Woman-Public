//  ██████╗██╗  ██╗ █████╗ ██╗     ██╗     ███████╗███╗   ██╗ ██████╗ ███████╗███████╗
// ██╔════╝██║  ██║██╔══██╗██║     ██║     ██╔════╝████╗  ██║██╔════╝ ██╔════╝██╔════╝
// ██║     ███████║███████║██║     ██║     █████╗  ██╔██╗ ██║██║  ███╗█████╗  ███████╗
// ██║     ██╔══██║██╔══██║██║     ██║     ██╔══╝  ██║╚██╗██║██║   ██║██╔══╝  ╚════██║
// ╚██████╗██║  ██║██║  ██║███████╗███████╗███████╗██║ ╚████║╚██████╔╝███████╗███████║
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝

interface setupChallenge {
  check: () => void;
  info: object;
  characters: object;
}

// NAMESPACE
if (setup.challenge === null || setup.challenge === undefined) {
  setup.challenge = {} as setupChallenge;
}

// eats food - adds to stats and applies effects
setup.challenge.check = function(): void {
  if (ↂ.flag.challengeMode !== false && ↂ.flag.challengeMode !== undefined) {
    if (setup.challenge.characters[ↂ.flag.challengeMode] == null || setup.challenge.characters[ↂ.flag.challengeMode] == undefined) {
      aw.con.warn(`Setup.challenge.check failed to find ${ↂ.flag.challengeMode} character in setup.challenge.characters. Skipping the check.`);
    } else {
      if (!setup.challenge.characters[ↂ.flag.challengeMode].check()) {
        aw.con.info("Oops, failed the character challenge check! Penalty time!")
        setup.challenge.characters[ↂ.flag.challengeMode].penalty();
      }
    }
  };
};

setup.challenge.characters = {
  paris: {
    name: "paris",
    fullname: "Paris Swan",
    desc: `''The Skank Challenge:'' Paris is the ultimate slut, with mediocre looks and weak skills outside of sex. Her sexual skills are impressive, but she has an extreme demand for sexual activity and will quickly fall into depression without a constant supply of cock. <i>Try to survive the game without getting a bad end like becoming homeless or getting sent to prison.</i>`,
    check() {
      if ((aw.time - ↂ.flag.lastSex) > 3000) {
        return false;
      } else {
        return true;
      }
    },
    penalty() {
      if (random(0,3) === 3) {
        ↂ.pc.status.happy -= 1;
        setup.status.record("happy", -1, "You miss having sex.");
        setup.notify("You miss having sex.");
      }
    },
  },
  evelyn: {
    name: "evelyn",
    fullname: "Evelyn Green",
    desc: `''The Childless Challenge 1:'' Evelyn is an attractive character that also happens to have a high fertility. On top of that she has a strong libido, and unfortunately for her, the NPCs are all out to get her pregnant! She has strong stats otherwise, but just can't afford to get knocked up. <i>Try to make it through the game without getting pregnant, which will trap you as an idiot slut for the rest of the game.</i>`,
    check() {
      if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
        return false;
      } else {
        return true;
      }
    },
    penalty() {
      if (!ↂ.flag.challengeLost) {
      ↂ.pc.status.bimbo = 100;
      ↂ.pc.trait.will = 1;
      ↂ.pc.trait.deceptive = -1;
      ↂ.pc.trait.persuasive = -1;
      ↂ.pc.trait.libido = 12;
      ↂ.flag.challengeLost = true;
      ↂ.pc.trait.extro = true;
      ↂ.pc.trait.open = "closed";
      ↂ.skill.art = 5,
      ↂ.skill.curArt -= 35,
      ↂ.skill.athletic -= 35,
      ↂ.skill.curAthletic -= 35,
      ↂ.skill.clean -= 35,
      ↂ.skill.curClean -= 35,
      ↂ.skill.comm -= 35,
      ↂ.skill.curComm -= 35,
      ↂ.skill.cook -= 35,
      ↂ.skill.curCook -= 35,
      ↂ.skill.crime -= 35,
      ↂ.skill.curDancing -= 35,
      ↂ.skill.curExhibition -= 35,
      ↂ.skill.firearms -= 35,
      ↂ.skill.curFirearms -= 35,
      ↂ.skill.oral -= 35,
      ↂ.skill.curOral -= 35,
      ↂ.skill.org -= 35,
      ↂ.skill.curOrg -= 35,
      ↂ.skill.probSolving -= 35,
      ↂ.skill.curProbSolving -= 35,
      ↂ.skill.prost -= 35,
      ↂ.skill.prostitute -= 35,
      ↂ.skill.curProstitute -= 35,
      ↂ.skill.prostitution -= 35,
      ↂ.skill.sed -= 35,
      ↂ.skill.curSeduction -= 35,
      ↂ.skill.shop -= 35,
      ↂ.skill.curShop -= 35,
      ↂ.skill.dance -= 35,
      ↂ.skill.dancing -= 35,
      ↂ.skill.exhib -= 35,
      ↂ.skill.exhibit -= 35,
      ↂ.skill.exhibition -= 35,
      ↂ.skill.curFinance -= 35,
      ↂ.skill.finance -= 35,
      ↂ.skill.heels -= 35,
      ↂ.skill.kegel -= 35,
      ↂ.skill.manage -= 35,
      ↂ.skill.martial -= 35,
      ↂ.skill.curMartial -= 35,
      ↂ.skill.perform -= 35,
      ↂ.skill.probSolve -= 35,
      ↂ.skill.seduction -= 35,
      ↂ.skill.strip -= 35,
      ↂ.skill.whore -= 35,
      aw.S();
      setup.dialog("Pregnancy","<<f a>>s little zygote starts to grow inside your womb your body reacts in a unusual way as a side-effect of the rejuvenation process. The chain of enzymes and chemicals reactions start all over your body flooding it with toxic products. Chemical agents are not that harmful to the most of your body but they are highly toxic for your brain matter and you almost cry in horror as you feel your intelligence slips away. In a matter of minutes you are barely able to form any coherent thoughts. Downgraded to the idiotic state by the massive neurotoxic damage you babble incoherently sitting on the floor. It could be avoided if only you were more cautious but now you are a retard for life. Well, silver lining — you will have a baby!");
      }
    },
  },
  eve: {
    name: "eve",
    fullname: "Eve Mendez",
    desc: `''The Childless Challenge 2:'' Eve is an attractive character that also happens to have some of the mutations encouraging pregnancy. On top of that she has a strong libido and a love of bareback sex. In addition, she isn't quite as observant as Evelyn, and her memory is only average. Unfortunately for her, the NPCs are all out to get her pregnant! She has strong stats otherwise, but just can't afford to get knocked up. <i>Try to make it through the game without getting pregnant, which will trap you as an idiot slut for the rest of the game.</i>`,
    check() {
      if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
        return false;
      } else {
        return true;
      }
    },
    penalty() {
      if (!ↂ.flag.challengeLost) {
      ↂ.pc.status.bimbo = 100;
      ↂ.pc.trait.will = 1;
      ↂ.pc.trait.deceptive = -1;
      ↂ.pc.trait.persuasive = -1;
      ↂ.pc.trait.libido = 12;
      ↂ.flag.challengeLost = true;
      ↂ.pc.trait.extro = true;
      ↂ.pc.trait.open = "closed";
      ↂ.skill.art = 5,
      ↂ.skill.curArt -= 35,
      ↂ.skill.athletic -= 35,
      ↂ.skill.curAthletic -= 35,
      ↂ.skill.clean -= 35,
      ↂ.skill.curClean -= 35,
      ↂ.skill.comm -= 35,
      ↂ.skill.curComm -= 35,
      ↂ.skill.cook -= 35,
      ↂ.skill.curCook -= 35,
      ↂ.skill.crime -= 35,
      ↂ.skill.curDancing -= 35,
      ↂ.skill.curExhibition -= 35,
      ↂ.skill.firearms -= 35,
      ↂ.skill.curFirearms -= 35,
      ↂ.skill.oral -= 35,
      ↂ.skill.curOral -= 35,
      ↂ.skill.org -= 35,
      ↂ.skill.curOrg -= 35,
      ↂ.skill.probSolving -= 35,
      ↂ.skill.curProbSolving -= 35,
      ↂ.skill.prost -= 35,
      ↂ.skill.prostitute -= 35,
      ↂ.skill.curProstitute -= 35,
      ↂ.skill.prostitution -= 35,
      ↂ.skill.sed -= 35,
      ↂ.skill.curSeduction -= 35,
      ↂ.skill.shop -= 35,
      ↂ.skill.curShop -= 35,
      ↂ.skill.dance -= 35,
      ↂ.skill.dancing -= 35,
      ↂ.skill.exhib -= 35,
      ↂ.skill.exhibit -= 35,
      ↂ.skill.exhibition -= 35,
      ↂ.skill.curFinance -= 35,
      ↂ.skill.finance -= 35,
      ↂ.skill.heels -= 35,
      ↂ.skill.kegel -= 35,
      ↂ.skill.manage -= 35,
      ↂ.skill.martial -= 35,
      ↂ.skill.curMartial -= 35,
      ↂ.skill.perform -= 35,
      ↂ.skill.probSolve -= 35,
      ↂ.skill.seduction -= 35,
      ↂ.skill.strip -= 35,
      ↂ.skill.whore -= 35,
      aw.S();
      setup.dialog("Pregnancy","<<f a>>s little zygote starts to grow inside your womb your body reacts in a unusual way as a side-effect of the rejuvenation process. The chain of enzymes and chemicals reactions start all over your body flooding it with toxic products. Chemical agents are not that harmful to the most of your body but they are highly toxic for your brain matter and you almost cry in horror as you feel your intelligence slips away. In a matter of minutes you are barely able to form any coherent thoughts. Downgraded to the idiotic state by the massive neurotoxic damage you babble incoherently sitting on the floor. It could be avoided if only you were more cautious but now you are a retard for life. Well, silver lining — you will have a baby!");
      }
    },
  },
  heather: {
    name: "heather",
    fullname: "Heather Miller",
    desc: `''The Childless Challenge 3:'' Heather is an attractive character that also happens to have all of the mutations encouraging pregnancy. On top of that she has a strong libido and a love of bareback sex, with a budding pregnancy fetish. In addition she is oblivious to her surroundings, forgetful, and puts herself in dangerous situations due to a rape fetish. Unfortunately for her, the NPCs are all out to get her pregnant! She has strong stats otherwise, but just can't afford to get knocked up. <i>Try to make it through the game without getting pregnant, which will trap you as an idiot slut for the rest of the game. Pulling this off is probably impossible.</i>`,
    check() {
      if (ↂ.pc.status.wombA.preg || ↂ.pc.status.wombB.preg) {
        return false;
      } else {
        return true;
      }
    },
    penalty() {
      if (!ↂ.flag.challengeLost) {
      ↂ.pc.status.bimbo = 100;
      ↂ.pc.trait.will = 1;
      ↂ.pc.trait.deceptive = -1;
      ↂ.pc.trait.persuasive = -1;
      ↂ.pc.trait.libido = 12;
      ↂ.flag.challengeLost = true;
      ↂ.pc.trait.extro = true;
      ↂ.pc.trait.open = "closed";
      ↂ.skill.art = 5,
      ↂ.skill.curArt -= 35,
      ↂ.skill.athletic -= 35,
      ↂ.skill.curAthletic -= 35,
      ↂ.skill.clean -= 35,
      ↂ.skill.curClean -= 35,
      ↂ.skill.comm -= 35,
      ↂ.skill.curComm -= 35,
      ↂ.skill.cook -= 35,
      ↂ.skill.curCook -= 35,
      ↂ.skill.crime -= 35,
      ↂ.skill.curDancing -= 35,
      ↂ.skill.curExhibition -= 35,
      ↂ.skill.firearms -= 35,
      ↂ.skill.curFirearms -= 35,
      ↂ.skill.oral -= 35,
      ↂ.skill.curOral -= 35,
      ↂ.skill.org -= 35,
      ↂ.skill.curOrg -= 35,
      ↂ.skill.probSolving -= 35,
      ↂ.skill.curProbSolving -= 35,
      ↂ.skill.prost -= 35,
      ↂ.skill.prostitute -= 35,
      ↂ.skill.curProstitute -= 35,
      ↂ.skill.prostitution -= 35,
      ↂ.skill.sed -= 35,
      ↂ.skill.curSeduction -= 35,
      ↂ.skill.shop -= 35,
      ↂ.skill.curShop -= 35,
      ↂ.skill.dance -= 35,
      ↂ.skill.dancing -= 35,
      ↂ.skill.exhib -= 35,
      ↂ.skill.exhibit -= 35,
      ↂ.skill.exhibition -= 35,
      ↂ.skill.curFinance -= 35,
      ↂ.skill.finance -= 35,
      ↂ.skill.heels -= 35,
      ↂ.skill.kegel -= 35,
      ↂ.skill.manage -= 35,
      ↂ.skill.martial -= 35,
      ↂ.skill.curMartial -= 35,
      ↂ.skill.perform -= 35,
      ↂ.skill.probSolve -= 35,
      ↂ.skill.seduction -= 35,
      ↂ.skill.strip -= 35,
      ↂ.skill.whore -= 35,
      aw.S();
      setup.dialog("Pregnancy","<<f a>>s little zygote starts to grow inside your womb your body reacts in a unusual way as a side-effect of the rejuvenation process. The chain of enzymes and chemicals reactions start all over your body flooding it with toxic products. Chemical agents are not that harmful to the most of your body but they are highly toxic for your brain matter and you almost cry in horror as you feel your intelligence slips away. In a matter of minutes you are barely able to form any coherent thoughts. Downgraded to the idiotic state by the massive neurotoxic damage you babble incoherently sitting on the floor. It could be avoided if only you were more cautious but now you are a retard for life. Well, silver lining — you will have a baby!");
      }
    },
  },
  beth: {
    name: "beth",
    fullname: "Beth Davis",
    desc: `''The Breeder Challenge 1:'' Beth is downright sexy, and has everything she needs to get pregnant with a high fertility and encouraging mutations. The only problem is that none of the NPCs are willing to breed her! <i>Beth has to have kids, lots of kids, in order to successfully survive her time as a woman. A dangerous mutation will kill her if she tries to turn back to a man before having ten children, or if she goes too long without being pregnant.</i>`,
    check() {
      return true;
    },
    penalty() {
      // blep
    },
  },
  mary: {
    name: "mary",
    fullname: "Mary Hill",
    desc: `''The Breeder Challenge 2:'' Mary isn't bad looking, and has everything she needs to get pregnant with a high fertility. The only problem is that none of the NPCs are willing to breed her! <i>Mary has to have kids, lots of kids, in order to successfully survive her time as a woman. A dangerous mutation will kill her if she tries to turn back to a man before having ten children, or if she goes too long without being pregnant.</i>`,
    check() {
      return true;
    },
    penalty() {
      // blep
    },
  },
  marge: {
    name: "marge",
    fullname: "Marge Flores",
    desc: `''The Breeder Challenge 3:'' Marge isn't attractive at all, and she's saddled with low fertility, and doesn't even like the idea of bareback sex or getting pregnant. Even worse, none of the NPCs are willing to breed her! <i>Marge has to have kids, lots of kids, in order to successfully survive her time as a woman. A dangerous mutation will kill her if she tries to turn back to a man before having ten children, or if she goes too long without being pregnant.</i>`,
    check() {
      return true;
    },
    penalty() {
      // blep
    },
  },
};
