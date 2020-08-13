/***
*          888       888                   888
*          888   o   888                   888
*          888  d8b  888                   888
*          888 d888b 888  .d88b.   .d88b.  888  888
*          888d88888b888 d8P  Y8b d8P  Y8b 888 .88P
*          88888P Y88888 88888888 88888888 888888K
*          8888P   Y8888 Y8b.     Y8b.     888 "88b
*          888P     Y888  "Y8888   "Y8888  888  888
*
*
*
*    888    888 d8b          888
*    888    888 Y8P          888
*    888    888              888
*    8888888888 888 .d8888b  888888 .d88b.  888d888 888  888
*    888    888 888 88K      888   d88""88b 888P"   888  888
*    888    888 888 "Y8888b. 888   888  888 888     888  888
*    888    888 888      X88 Y88b. Y88..88P 888     Y88b 888
*    888    888 888  88888P'  "Y888 "Y88P"  888      "Y88888
*                                                        888
*                                                   Y8b d88P
*                                                    "Y88P"
*/


interface IntↂTempHistory {
  jobChange: string;
  pcChange: string[];
  statusChange: string[];
  traitChange: string[];
  kinkChange: string[];
  mutateChange: string[];
  skillChange: string;
  rChange: string;
}

// function to copy PC values to the history object
setup.updatePlayerHistory = function(): void {
  function acq() {
    const ids = Object.keys(aw.npc);
    const r: string[] = [];
    for (const id of ids) {
      if (aw.npc[id].rship.category === "acquaint") {
        r.push(id);
      }
    }
    return r;
  }
  function friends() {
    const ids = Object.keys(aw.npc);
    const r: string[] = [];
    for (const id of ids) {
      if (aw.npc[id].rship.category === "friend") {
        r.push(id);
      }
    }
    return r;
  }
  function lovers() {
    const ids = Object.keys(aw.npc);
    const a = ["dating", "exclusive", "lovers", "engaged", "married"];
    const r: string[] = [];
    for (const id of ids) {
      if (a.includes(aw.npc[id].rship.category)) {
        r.push(id);
      }
    }
    return r;
  }

  ↂ.pcHistory = {};
  ↂ.pcHistory.main = jQuery.extend(true, {}, ↂ.pc.main);
  ↂ.pcHistory.body = jQuery.extend(true, {}, ↂ.pc.body);
  ↂ.pcHistory.fert = jQuery.extend(true, {}, ↂ.pc.fert);
  ↂ.pcHistory.status = jQuery.extend(true, {}, ↂ.pc.status);
  ↂ.pcHistory.trait = jQuery.extend(true, {}, ↂ.pc.trait);
  ↂ.pcHistory.mutate = jQuery.extend(true, {}, ↂ.pc.mutate);
  ↂ.pcHistory.kink = jQuery.extend(true, {}, ↂ.pc.kink);
  ↂ.pcHistory.skill = jQuery.extend(true, {}, ↂ.skill);
  ↂ.pcHistory.job = jQuery.extend(true, {}, ↂ.job);
  ↂ.pcHistory.rship = {
    acquaint: acq(),
    friends: friends(),
    lovers: lovers(),
  }
};






// creates text for changes that occurred over the week
setup.playerHistoryComparison = function(): void {
  const ᛔ = State.active.variables;
  ↂ.tempHistory = {} as IntↂTempHistory;
  const ᛝ = ↂ.tempHistory;
  let completecheck = 0;

  function pcChanges() {
    ᛝ.pcChange = [];
    const ᚥ = ↂ.pcHistory;
    const ᛞ = ↂ.pc;
    if (ᚥ.main.dta[1] !== ᛞ.main.dta[1]) {
      ᛝ.pcChange.push(`You're a year @@.change;older@@ now`);
    }
    if (ᚥ.main.dta[4] !== ᛞ.main.dta[4]) {
      ᛝ.pcChange.push(("Your @@.change;name@@ has been officially changed to " + ↂ.pc.main.name));
    }
    if (ᚥ.body.dta[0] !== ᛞ.body.dta[0]) {
      ᛝ.pcChange.push(("Somehow, your @@.change;race@@ changed to " + ↂ.pc.body.race));
    }
    if (ᚥ.body.dta[1] !== ᛞ.body.dta[1]) {
      ᛝ.pcChange.push(("Your @@.change;skin color@@ changed, and is now " + ᛞ.body.dta[1]));
    }
    if (ᚥ.body.dta[2] !== ᛞ.body.dta[2]) {
      if (ᚥ.body.dta[2] < ᛞ.body.dta[2]) {
        ᛝ.pcChange.push(`You've developed some @@.change;muscle@@ this week, and are now <<p tone.q>>.`);
      } else {
        ᛝ.pcChange.push(`You've lost some @@.change;muscle@@ this week, and are now <<p tone.q>>.`);
      }
    }
    if (ᚥ.body.dta[3] !== ᛞ.body.dta[3]) {
      if (ᚥ.body.dta[3] < ᛞ.body.dta[3]) {
        ᛝ.pcChange.push(`You've been gaining @@.change;weight@@, and have passed the threshold to be considered <<p weight.q>>.`);
      } else {
        ᛝ.pcChange.push(`You've been losing @@.change;weight@@, and have finally passed the threshold to be considered <<p weight.q>>.`);
      }
    }
    if (ᚥ.body.dta[4] !== ᛞ.body.dta[4]) {
      if (ᚥ.body.dta[4] < ᛞ.body.dta[4]) {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.change;shoulders@@ have widened to be <<p shoulders.q>>.`);
      } else {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.good;shoulders@@ have narrowed to be <<p shoulders.q>>.`);
      }
    }
    if (ᚥ.body.dta[5] !== ᛞ.body.dta[5]) {
      if (ᚥ.body.dta[5] < ᛞ.body.dta[5]) {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.good;hips@@ have widened to be <<p hips.q>>.`);
      } else {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.change;hips@@ have narrowed to be <<p hips.q>>.`);
      }
    }
    if (ᚥ.body.dta[6] !== ᛞ.body.dta[6]) {
      if (ᚥ.body.dta[6] < ᛞ.body.dta[6]) {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.good;waist@@ has widened to be <<p waist.q>>.`);
      } else {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.change;waist@@ has narrowed to be <<p waist.q>>.`);
      }
    }
    if (ᚥ.body.dta[8] !== ᛞ.body.dta[8]) {
      if (ᚥ.body.dta[8] < ᛞ.body.dta[8]) {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, you've grown @@.change;taller@@.`);
      } else {
        ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.change;height@@ has shrunk.`);
      }
    }
    if (ᚥ.body.dta[9] !== ᛞ.body.dta[9]) {
      if (ᚥ.body.dta[9] < ᛞ.body.dta[9]) {
        ᛝ.pcChange.push(`Your @@.change;hindquarters@@ have grown, and can now be considered <<p ass.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;hindquarters@@ have shrunk, and can now be considered <<p ass.q>>.`);
      }
    }
    if (ᚥ.body.tits.base.size !== ᛞ.body.tits.base.size) {
      if (ᚥ.body.tits.base.size < ᛞ.body.tits.base.size) {
        ᛝ.pcChange.push(`Your @@.change;breasts@@ have grown. They are ${ᛞ.body.tits.base.size}cc and can now be considered <<p tits.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;breasts@@ have shrunk. They are ${ᛞ.body.tits.base.size}cc and can now be considered <<p tits.q>>.`);
      }
    }
    if (ᚥ.body.tits.boob[0] !== ᛞ.body.tits.boob[0]) {
      if (ᚥ.body.tits.boob[0] < ᛞ.body.tits.boob[0]) {
        ᛝ.pcChange.push(`Your @@.change;bra band size@@ has grown, and is now ${ᛞ.body.tits.boob[0]} inches.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;bra band size@@ has shrunk, and is now ${ᛞ.body.tits.boob[0]} inches.`);
      }
    }
    if (ᚥ.body.tits.boob[1] !== ᛞ.body.tits.boob[1]) {
      if (ᚥ.body.tits.boob[1] < ᛞ.body.tits.boob[1]) {
        ᛝ.pcChange.push(`Your @@.change;nipple length@@ has grown, and is now <<p niplength.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;nipple length@@ has shrunk, and is now <<p niplength.q>>.`);
      }
    }
    if (ᚥ.body.tits.boob[2] !== ᛞ.body.tits.boob[2]) {
      if (ᚥ.body.tits.boob[2] < ᛞ.body.tits.boob[2]) {
        ᛝ.pcChange.push(`Your @@.change;nipple girth@@ has grown, and is now <<p nipgirth.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;nipple girth@@ has shrunk, and is now <<p nipgirth.q>>.`);
      }
    }
    if (ᚥ.body.tits.boob[3] !== ᛞ.body.tits.boob[3]) {
      if (ᚥ.body.tits.boob[3] < ᛞ.body.tits.boob[3]) {
        ᛝ.pcChange.push(`Your @@.change;areola size@@ has grown, and is now <<p areola.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;areola size@@ has shrunk, and is now <<p areola.q>>.`);
      }
    }
    if (ᚥ.body.tits.boob[4] !== ᛞ.body.tits.boob[4]) {
      if (ᚥ.body.tits.boob[4] < ᛞ.body.tits.boob[4]) {
        ᛝ.pcChange.push(`Your @@.change;areola puffiness@@ has increased.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;areola puffiness@@ has decreased.`);
      }
    }
    if (ᚥ.body.tits.boob[5] !== ᛞ.body.tits.boob[5]) {
      ᛝ.pcChange.push(`The amount of silicone in your breasts changed this week, you now have ${ᛞ.body.tits.boob[5]}cc of silicone each.`);
    }
    /*for orifice sizes*/
    if (ᚥ.body.pussy.tight !== ᛞ.body.pussy.tight) {
      if (ᚥ.body.pussy.tight < ᛞ.body.pussy.tight) {
        ᛝ.pcChange.push(`Your <<p natwetness.q>> @@.change;pussy@@ has gotten some use, and has stretched into a <<p pussy.q>> cunt.`);
      } else {
        ᛝ.pcChange.push(`Your <<p natwetness.q>> @@.change;pussy@@ has somehow managed to tighten up into a <<p pussy.q>> cunt.`);
      }
    }
    if (ᚥ.body.pussy.wetness !== ᛞ.body.pussy.wetness) {
      if (ᚥ.body.pussy.wetness < ᛞ.body.pussy.wetness) {
        ᛝ.pcChange.push(`Your @@.change;pussy@@ has become more naturally wet, and is now <<p natwetness.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;pussy@@ has become less naturally wet, and is now <<p natwetness.q>>.`);
      }
    }
    if (ᚥ.body.asshole.tight !== ᛞ.body.asshole.tight) {
      if (ᚥ.body.asshole.tight < ᛞ.body.asshole.tight) {
        ᛝ.pcChange.push(`Your rear end has gotten some use, and has stretched into a <<p asshole.q>> @@.change;asshole@@.`);
      } else {
        ᛝ.pcChange.push(`Your rear end has somehow managed to tighten up into a <<p asshole.q>> @@.change;asshole@@.`);
      }
    }
    /*more generic items*/
    if (ᚥ.body.dta[10] !== ᛞ.body.dta[10]) {
      if (ᚥ.body.dta[10] < ᛞ.body.dta[10]) {
        ᛝ.pcChange.push(`Your @@.change;clit@@ has grown in size, becoming <<p clit.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;clit@@ has shrunk in size, becoming <<p clit.q>>.`);
      }
    }
    if (ᚥ.body.dta[11] !== ᛞ.body.dta[11]) {
      if (ᚥ.body.dta[11] < ᛞ.body.dta[11]) {
        ᛝ.pcChange.push(`Your @@.change;pussy lips@@ have gotten larger, becoming <<p labia.q>>.`);
      } else {
        ᛝ.pcChange.push(`Your @@.change;pussy lips@@ have gotten smaller, becoming <<p labia.q>>.`);
      }
    }
    if (ᚥ.body.dta[12] !== ᛞ.body.dta[12]) {
      if (ᚥ.body.dta[12] < ᛞ.body.dta[12]) {
        ᛝ.pcChange.push(`Your @@.good;face@@ has changed somewhat, morphing ever so lightly, resulting in you becoming more beautiful.`);
      } else {
        ᛝ.pcChange.push(`Your @@.bad;face@@ has changed somewhat, morphing ever so lightly, resulting in you becoming less attractive.`);
      }
    }
    if (ᚥ.body.dta[13] !== ᛞ.body.dta[13]) {
      ᛝ.pcChange.push(`Your @@.change;face@@ has changed somewhat, morphing ever so lightly, resulting in a more <<= ↂ.pc.body.face>> appearance.`);
    }
    if (ᚥ.fert.fertility !== ᛞ.fert.fertility) {
      if (ᚥ.fert.fertility < ᛞ.fert.fertility) {
        ᛝ.pcChange.push(`Something must be going right, because you have the feeling that your @@.good;fertility@@ has increased. You're now <<p fertility.q>>.`);
      } else {
        ᛝ.pcChange.push(`Something must have gone horribly wrong, because you have the feeling that your @@.bad;fertility@@ has decreased. You're now <<p fertility.q>>.`);
      }
    }
    if (ᚥ.fert.pregTerm !== ᛞ.fert.pregTerm) {
      if (ᚥ.fert.pregTerm < ᛞ.fert.pregTerm) {
        ᛝ.pcChange.push(`Your smart toilet has informed you that based on this week's hormonal analysis, it seems that your body's @@.change;gestation@@ process for babies will take longer.`);
      } else {
        ᛝ.pcChange.push(`Your smart toilet has informed you that based on this week's hormonal analysis, it seems that your body has gotten better at growing babies, meaning that @@.change;gestation@@ will be shorter.`);
      }
    }
    if (ᚥ.body.dta[19] !== ᛞ.body.dta[19]) {
      if (ᚥ.body.dta[19] < ᛞ.body.dta[19]) {
        ᛝ.pcChange.push(`Your breasts have gotten better at making @@.good;milk@@, and they will produce it faster than before.`);
      } else {
        ᛝ.pcChange.push(`Your breasts have lost some of their ability to make @@.bad;milk@@, and they will produce it slower than before.`);
      }
    }
    if (ᚥ.body.dta[21] !== ᛞ.body.dta[21]) {
      if (ᚥ.body.dta[21] !== ᛞ.body.dta[21]) {
        ᛝ.pcChange.push(`Your @@.bad;genitals@@ have gotten less sensitive for some reason, and you've noticed that it seems to take you longer to reach orgasm.`);
      } else {
        ᛝ.pcChange.push(`Your @@.good;genitals@@ have gotten more sensitive lately, and you've noticed that you seem to be able to reach orgasm quicker.`);
      }
    }
    if (ᚥ.body.dta[22] !== ᛞ.body.dta[22]) {
      if (ᚥ.body.dta[22] !== ᛞ.body.dta[22]) {
        ᛝ.pcChange.push(`Your improving fitness seems to be resulting in some extra @@.good;stamina@@, it takes you longer to get worn out.`);
      } else {
        ᛝ.pcChange.push(`Your health and fitness don't seem to be in the best shape, resulting in reduced @@.bad;stamina@@.`);
      }
    }
    if (ᚥ.body.dta[18] !== ᛞ.body.dta[18]) {
      ᛝ.pcChange.push(`your @@.change;eye color@@ has somehow changed! They are now <<= ↂ.pc.body.eyeColor>>.`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => statusChanges(), 20);
  }

  function statusChanges() {
    ᛝ.statusChange = [];
    const ᚥ = ↂ.pcHistory;
    const ᛞ = ↂ.pc;
    if (ᚥ.status.birthCon.hormoneType !== ᛞ.status.birthCon.hormoneType) {
      ᛝ.statusChange.push(`Your birth control changed this week, you're <<if ↂ.pc.status.birthCon.hormoneType == 'none'>>not using birth control anymore<<else>>now using <<= ↂ.pc.status.birthCon.hormoneType>>.`);
    }
    if ((ᚥ.status.wombA.fetus.length > 0) !== (ᛞ.status.wombA.fetus.length > 0)) {
      if (ↂ.pc.status.wombA.weeks !== 0) {
        if (ↂ.pc.status.wombA.know) {
          ᛝ.statusChange.push(`Your smart toilet reports pointlessly that you're still pregnant.`);
        } else {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you are pregnant. @@.mono;They don't program these things for sensitivity, do they?@@`);
          ↂ.pc.status.wombA.know = true;
        }
      } else if (ↂ.pc.status.wombA.know) {
        if (ↂ.pcHistory.status.wombA.weeks <= 5) {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;They don't program these things for sensitivity, do they?@@`);
        } else {
          ᛝ.statusChange.push(`Your smart toilet tells you that you've given birth to your pregnancy. @@.mono;Yeah, no shit.@@`);
        }
      } else {
        /*just for GreZZo...*/
        if (ↂ.pcHistory.status.wombA.weeks <= 5) {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;What the?.. I didn't even know I was pregnant!@@`);
        } else {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you've given birth to your pregnancy. @@.mono;No shit. Wish you'd told me ''before'' I gave birth.@@`);
        }
      }
    }
    if ((ᚥ.status.wombB.fetus.length > 0) !== (ᛞ.status.wombB.fetus.length > 0)) {
      if (ↂ.pc.status.wombB.weeks !== 0) {
        if (ↂ.pc.status.wombB.know) {
          ᛝ.statusChange.push(`Your smart toilet reports pointlessly that you're still pregnant.`);
        } else {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you are pregnant. @@.mono;They don't program these things for sensitivity, do they?@@`);
          ↂ.pc.status.wombB.know = true;
        }
      } else if (ↂ.pc.status.wombB.know) {
        if (ↂ.pcHistory.status.wombB.weeks <= 5) {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;They don't program these things for sensitivity, do they?@@`);
        } else {
          ᛝ.statusChange.push(`Your smart toilet tells you that you've given birth to your pregnancy. @@.mono;Yeah, no shit.@@`);
        }
      } else {
        /*just for GreZZo...*/
        if (ↂ.pcHistory.status.wombB.weeks <= 5) {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;What the?.. I didn't even know I was pregnant!@@`);
        } else {
          ᛝ.statusChange.push(`Your smart toilet unceremoniously tells you that you've given birth to your pregnancy. @@.mono;No shit. Wish you'd told me ''before'' I gave birth.@@`);
        }
      }
    }
    if (Math.abs(ᚥ.status.data[14] - ᛞ.status.data[14]) > 3) {
      if (ᚥ.status.data[14] < ᛞ.status.data[14]) {
        ᛝ.statusChange.push(`Your @@.good;happiness@@ has improved considerably this week.`);
      } else {
        ᛝ.statusChange.push(`You're a lot less @@.bad;happy@@ than you were before.`);
      }
    }
    if (Math.abs(ᚥ.status.data[16] - ᛞ.status.data[16]) > 30) {
      if (ᚥ.status.data[16] < ᛞ.status.data[16]) {
        ᛝ.statusChange.push(`You haven't been interacting much with other people this week, and you seem to be a lot more @@.bad;lonely@@ than before.`);
      } else {
        ᛝ.statusChange.push(`You were able to enjoy a lot of social activities this week, and you're a lot less @@.good;lonely@@ than you were before.`);
      }
    }
    if (Math.abs(ᚥ.status.data[19] - ᛞ.status.data[19]) > 25) {
      if (ᚥ.status.data[19] < ᛞ.status.data[19]) {
        ᛝ.statusChange.push(`Your @@.good;health@@ has improved a great deal this week, and you're feeling much better as a result.`);
      } else if (ↂ.pc.status.health < (ↂ.pcHistory.status.health - 30)) {
        ᛝ.statusChange.push(`Your @@.bad;health@@ took a nosedive this week, and you certainly don't feel at your best.`);
      }
    }
    if (Math.abs(ᚥ.status.data[13] - ᛞ.status.data[13]) > 35) {
      if (ᚥ.status.data[13] < ᛞ.status.data[13]) {
        ᛝ.statusChange.push(`Your @@.bad;stress@@ has skyrocketed this week, and you feel much more on-edge.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;stress@@ level dropped considerably this week, and you certainly feel more at ease.`);
      }
    }
    if (Math.abs(ᚥ.status.data[27] - ᛞ.status.data[27]) > 5) {
      if (ᚥ.status.data[27] < ᛞ.status.data[27]) {
        ᛝ.statusChange.push(`Your @@.good;morality@@ has improved a great deal this week, and you're feeling like a better person.`);
      } else {
        ᛝ.statusChange.push(`Your @@.bad;morality@@ decreased significantly this week.`);
      }
    }
    if (Math.abs(ᚥ.status.data[29] - ᛞ.status.data[29]) > 5) {
      if (ᚥ.status.data[29] < ᛞ.status.data[29]) {
        ᛝ.statusChange.push(`Your @@.change;perversion@@ has increased significantly this week`);
      } else {
        ᛝ.statusChange.push(`Your @@.change;perversion@@ has decreased significantly this week.`);
      }
    }
    if (Math.abs(ᚥ.status.data[30] - ᛞ.status.data[30]) > 5) {
      if (ᚥ.status.data[30] < ᛞ.status.data[30]) {
        ᛝ.statusChange.push(`You feel, like, @@.bad;way better@@ about things.`);
      } else {
        ᛝ.statusChange.push(`You feel a lot @@.good;more aware@@ about the course your life is taking than you did last week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[0] - ᛞ.status.addict.dta[0]) > 10) {
      if (ᚥ.status.addict.dta[0] < ᛞ.status.addict.dta[0]) {
        ᛝ.statusChange.push(`Your @@.bad;sex addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;sex addiction@@ decreased noticeably this week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[1] - ᛞ.status.addict.dta[1]) > 10) {
      if (ᚥ.status.addict.dta[1] < ᛞ.status.addict.dta[1]) {
        ᛝ.statusChange.push(`Your @@.bad;alcohol addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;alcohol addiction@@ decreased noticeably this week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[2] - ᛞ.status.addict.dta[2]) > 10) {
      if (ᚥ.status.addict.dta[2] < ᛞ.status.addict.dta[2]) {
        ᛝ.statusChange.push(`Your @@.bad;heat addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;heat addiction@@ decreased noticeably this week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[3] - ᛞ.status.addict.dta[3]) > 10) {
      if (ᚥ.status.addict.dta[3] < ᛞ.status.addict.dta[3]) {
        ᛝ.statusChange.push(`Your @@.bad;satyr addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;satyr addiction@@ decreased noticeably this week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[4] - ᛞ.status.addict.dta[4]) > 10) {
      if (ᚥ.status.addict.dta[4] < ᛞ.status.addict.dta[4]) {
        ᛝ.statusChange.push(`Your @@.bad;focus addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;focus addiction@@ decreased noticeably this week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[5] - ᛞ.status.addict.dta[5]) > 10) {
      if (ᚥ.status.addict.dta[5] < ᛞ.status.addict.dta[5]) {
        ᛝ.statusChange.push(`Your @@.bad;cum addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;cum addiction@@ decreased noticeably this week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[6] - ᛞ.status.addict.dta[6]) > 10) {
      if (ᚥ.status.addict.dta[6] < ᛞ.status.addict.dta[6]) {
        ᛝ.statusChange.push(`Your @@.bad;zone addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;zone addiction@@ decreased noticeably this week.`);
      }
    }
    if (Math.abs(ᚥ.status.addict.dta[7] - ᛞ.status.addict.dta[7]) > 10) {
      if (ᚥ.status.addict.dta[7] < ᛞ.status.addict.dta[7]) {
        ᛝ.statusChange.push(`Your @@.bad;creampie addiction@@ increased noticeably this week.`);
      } else {
        ᛝ.statusChange.push(`Your @@.good;creampie addiction@@ decreased noticeably this week.`);
      }
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => traitChanges(), 20);
  }

  function traitChanges() {
    const chList: string[] = [];
    ᛝ.traitChange = [];
    const names = ["vert", "intro", "extro", "open", "op", "cl", "will", "libido", "caring", "bitch", "maternal", "romantic", "deceptive", "devious", "persuasive", "perceptive", "forgetful", "forgiving", "lowEsteem", "picky", "crude", "friendly", "approachable", "relaxed", "flirty", "materialist"];
    const ᚥ = ↂ.pcHistory;
    const ᛞ = ↂ.pc;
    try {
      for (let i = 7; i < 26; i++) {
        try {
          if (ᛞ.trait.dta[i] !== ᚥ.trait.dta[i]) {
            chList.push(names[i]);
          }
        } catch (err) {
          ᛔ.AW.error += "error in history trait comparison loop, variable: ";
          ᛔ.AW.error += ↂ.pc.trait[names[i]] + "-" + err;
          UI.alert(`error in trait comparison loop, check debug for specific variable.`);
        }
      }
    } catch (errs) {
      ᛔ.AW.error += " loop run error in history trait comparison loop: " + errs + ", ";
      UI.alert(`ERROR: loop run error in history trait comparison loop!`);
    }
    try {
      let cuntNoodle;
      for (let j = 0; j < chList.length; j++) {
          cuntNoodle = "You feel like your personality has changed somehow... Something to do with @@.change;";
          cuntNoodle += chList[j];
          cuntNoodle += "@@, perhaps.";
          ᛝ.traitChange.push(cuntNoodle);
      }
    } catch (err) {
      ᛔ.AW.error += "Error generating array of trait change texts, trait changes in history function. Error: " + err;
      UI.alert(`Error generating text for trait changes, see debug menu for details, motherfucker.`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => kinkChanges());
  }
  function kinkChanges() {
    const chList: string[] = [];
    const names = ["risky", "pregnancy", "sizequeen", "cumSlut", "sub", "exhibition", "masochist", "buttSlut", "publix", "slut", "superSlut", "hyperSlut", "oral", "anal", "force", "rape", "liberate", "easy", "nips", "dom", "water", "bond", "hard", "fap", "shame"];
    ᛝ.kinkChange = [];
    try {
      for (let i = 0, c = names.length; i < c; i++) {
        try {
          if (ↂ.pc.kink.dta[i] !== ↂ.pcHistory.kink.dta[i]) {
            chList.push(names[i]);
          }
        } catch (err) {
          ᛔ.AW.error += "error in history kink comparison loop, variable: ";
          ᛔ.AW.error += ↂ.pc.kink[names[i]] + "-" + err;
          UI.alert(`error in kink comparison loop, check debug for specific variable.`);
        }
      }
    } catch (errs) {
      ᛔ.AW.error += " loop run error in history kink comparison loop: " + errs + ", ";
      UI.alert(`ERROR: loop run error in history kink comparison loop!`);
    }
    try {
      let cuntNoodle = "empty";
      for (let j = 0; j < chList.length; j++) {
        if (ↂ.pc.kink[chList[j]]) {
          cuntNoodle = "You've gained the " + chList[j] + " kink this week.";
          ᛝ.kinkChange.push(cuntNoodle);
        } else {
          cuntNoodle = "You lost the " + chList[j] + " kink this week.";
          ᛝ.kinkChange.push(cuntNoodle);
        }
      }
    } catch (err) {
      ᛔ.AW.error += "Error generating array of kink change texts, kink changes in history function. Error: " + err;
      UI.alert(`Error generating text for kink changes, see debug menu for details.`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => mutateChanges(), 25);
  }
  function mutateChanges() {
    const chList: string[] = [];
    const names = ["smooth", "lilithCurse", "noRefract", "megaNuts", "killerSperm", "bitchBreaker", "megaLong", "iron", "virile", "acidPre", "girth", "contort", "cumpire", "powerEjac", "multgasm", "immune", "milk", "acid", "birthCon", "multiple", "gestate", "cycle", "twinWomb", "pheromone", "period", "mouth", "pseudoPreg", "elastic", "litePhero", "goddess", "fertStorm"];
    ᛝ.mutateChange = [];
    try {
      for (let i = 0, c = names.length; i < c; i++) {
        try {
          if (ↂ.pc.mutate.dta[i] !== ↂ.pcHistory.mutate.dta[i]) {
            chList.push(names[i]);
          }
        } catch (err) {
          ᛔ.AW.error += "error in history mutate comparison loop, variable: ";
          ᛔ.AW.error += ↂ.pc.mutate[names[i]] + "-" + err;
          UI.alert(`error in mutate comparison loop, check debug for specific variable.`);
        }
      }
    } catch (errs) {
      ᛔ.AW.error += " loop run error in history mutate comparison loop: " + errs + ", ";
      UI.alert(`ERROR: loop run error in history mutate comparison loop!`);
    }
    try {
      let cuntNoodle;
      for (let j = 0; j < chList.length; j++) {
        if (ↂ.pc.mutate[chList[j]]) {
          cuntNoodle = "You gained the " + chList[j] + " mutation this week.";
          ᛝ.mutateChange.push(cuntNoodle);
        } else {
          cuntNoodle = "You lost the " + chList[j] + " mutation this week.";
          ᛝ.mutateChange.push(cuntNoodle);
        }
      }
    } catch (err) {
      ᛔ.AW.error += "Error generating array of mutate change texts, mutate changes in history function. Error: " + err;
      UI.alert(`Error generating text for mutate changes, see debug menu for details.`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => skillChanges());
  }
  function skillChanges() {
    const chList: string[] = [];
    const names = ["exhibition", "prostitute", "sex", "oral", "seduction", "comm", "org", "probSolving", "finance", "art", "athletic", "dancing", "clean", "shop", "cook", "martial", "crime", "manage", "perform", "heels", "kegel", "firearms"];
    ᛝ.skillChange = "";
    try {
      for (let i = 0, c = names.length; i < c; i++) {
        try {
          if (ↂ.skill[names[i]] !== ↂ.pcHistory.skill.dta[i] && names[i] !== "_k") {
            chList.push(names[i]);
          }
        } catch (err) {
          ᛔ.AW.error += "error in history skill comparison loop, variable: ";
          ᛔ.AW.error += ↂ.skill[names[i]] + "-" + err;
          UI.alert(`error in skill comparison loop, check debug for specific variable.`);
        }
      }
    } catch (errs) {
      ᛔ.AW.error += (` loop run error in history skill comparison loop: `) + errs + ", ";
      UI.alert(`ERROR: loop run error in history skill comparison loop!`);
    }
    try {
      let tits;
      ᛝ.skillChange = (`<table><tr ><td colspan='2'>@@.head2;Skill Changes@@</td></tr><tr><td width='50%'><table><tr><td colspan='2'>@@.head4;Sex Skill Changes@@</td></tr>`);
      if (chList.includes("sex")) {
        tits = "<tr><td width='70%'>''Sex Skill''</td><td>";
        if (ↂ.skill.sex > ↂ.pcHistory.skill.sex) {
          tits += "@@.good;";
          tits += (ↂ.skill.sex - ↂ.pcHistory.skill.sex);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.sex - ↂ.skill.sex);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("oral")) {
        tits = "<tr><td width='70%'>''Oral Skill''</td><td>";
        if (ↂ.skill.oral > ↂ.pcHistory.skill.oral) {
          tits += "@@.good;";
          tits += (ↂ.skill.oral - ↂ.pcHistory.skill.oral);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.oral - ↂ.skill.oral);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("exhibition")) {
        tits = "<tr><td width='70%'>''Exhibitionism Level''</td><td>";
        if (ↂ.skill.exhibition > ↂ.pcHistory.skill.exhibition) {
          tits += "@@.good;";
          tits += (ↂ.skill.exhibition - ↂ.pcHistory.skill.exhibition);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.exhibition - ↂ.skill.exhibition);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("prostitute")) {
        tits = "<tr><td width='70%'>''Prostitution Skill''</td><td>";
        if (ↂ.skill.prostitute > ↂ.pcHistory.skill.prostitute) {
          tits += "@@.good;";
          tits += (ↂ.skill.prostitute - ↂ.pcHistory.skill.prostitute);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.prostitute - ↂ.skill.prostitute);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("seduction")) {
        tits = "<tr><td width='70%'>''Seduction Skill''</td><td>";
        if (ↂ.skill.seduction > ↂ.pcHistory.skill.seduction) {
          tits += "@@.good;";
          tits += (ↂ.skill.seduction - ↂ.pcHistory.skill.seduction);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.seduction - ↂ.skill.seduction);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      ᛝ.skillChange += (`</table></td><td><table><tr><td colspan='2'>@@.head4;Work Skill Changes@@</td></tr>`);
      if (chList.includes("comm")) {
        tits = "<tr><td width='70%'>''Communication Skill''</td><td>";
        if (ↂ.skill.comm > ↂ.pcHistory.skill.comm) {
          tits += "@@.good;";
          tits += (ↂ.skill.comm - ↂ.pcHistory.skill.comm);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.comm - ↂ.skill.comm);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("org")) {
        tits = "<tr><td width='70%'>''Organization Skill''</td><td>";
        if (ↂ.skill.org > ↂ.pcHistory.skill.org) {
          tits += "@@.good;";
          tits += (ↂ.skill.org - ↂ.pcHistory.skill.org);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.org - ↂ.skill.org);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("probSolving")) {
        tits = "<tr><td width='70%'>''Problem Solving Skill''</td><td>";
        if (ↂ.skill.probSolving > ↂ.pcHistory.skill.probSolving) {
          tits += "@@.good;";
          tits += (ↂ.skill.probSolving - ↂ.pcHistory.skill.probSolving);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.probSolving - ↂ.skill.probSolving);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("finance")) {
        tits = "<tr><td width='70%'>''Finance Skill''</td><td>";
        if (ↂ.skill.finance > ↂ.pcHistory.skill.finance) {
          tits += "@@.good;";
          tits += (ↂ.skill.finance - ↂ.pcHistory.skill.finance);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.finance - ↂ.skill.finance);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      ᛝ.skillChange += (`</table></td></tr><tr><td><table><tr><td colspan='2'>@@.head4;Other Skill Changes@@</td></tr>`);
      if (chList.includes("art")) {
        tits = "<tr><td width='70%'>''Aesthetics Skill''</td><td>";
        if (ↂ.skill.art > ↂ.pcHistory.skill.art) {
          tits += "@@.good;";
          tits += (ↂ.skill.art - ↂ.pcHistory.skill.art);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.art - ↂ.skill.art);
          tits += ")@@</td></tr>";
        }
      }
      if (chList.includes("athletic")) {
        tits = "<tr><td width='70%'>''Aesthetics Skill''</td><td>";
        if (ↂ.skill.art > ↂ.pcHistory.skill.art) {
          tits += "@@.good;";
          tits += (ↂ.skill.art - ↂ.pcHistory.skill.art);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.art - ↂ.skill.art);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("dancing")) {
        tits = "<tr><td width='70%'>''Dancing Skill''</td><td>";
        if (ↂ.skill.dancing > ↂ.pcHistory.skill.dancing) {
          tits += "@@.good;";
          tits += (ↂ.skill.dancing - ↂ.pcHistory.skill.dancing);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.dancing - ↂ.skill.dancing);
          tits += ")@@</td></tr>";
        }
      }
      if (chList.includes("clean")) {
        tits = "<tr><td width='70%'>''Cleaning Skill''</td><td>";
        if (ↂ.skill.clean > ↂ.pcHistory.skill.clean) {
          tits += "@@.good;";
          tits += (ↂ.skill.clean - ↂ.pcHistory.skill.clean);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.clean - ↂ.skill.clean);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      if (chList.includes("shop")) {
        tits = "<tr><td width='70%'>''Shopping Skill''</td><td>";
        if (ↂ.skill.shop > ↂ.pcHistory.skill.shop) {
          tits += "@@.good;";
          tits += (ↂ.skill.shop - ↂ.pcHistory.skill.shop);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.shop - ↂ.skill.shop);
          tits += ")@@</td></tr>";
        }
      }
      if (chList.includes("cook")) {
        tits = "<tr><td width='70%'>''Cooking Skill''</td><td>";
        if (ↂ.skill.cook > ↂ.pcHistory.skill.cook) {
          tits += "@@.good;";
          tits += (ↂ.skill.cook - ↂ.pcHistory.skill.cook);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (ↂ.pcHistory.skill.cook - ↂ.skill.cook);
          tits += ")@@</td></tr>";
        }
        ᛝ.skillChange += tits;
      }
      ᛝ.skillChange += "</table></td><td></td></tr></table>";
    } catch (err) {
      ᛔ.AW.error += "Error generating array of skill change texts, skill changes in history function. Error: " + err;
      UI.alert(`Error generating text for skill changes, see debug menu for details.`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => itemChanges());
  }
  /* check future items properties for array types to exclude generic item counts from change report.*/
  function itemChanges() {
    ᛝ.rChange = "";
    function acq() {
      const ids = Object.keys(aw.npc);
      const r: string[] = [];
      for (const id of ids) {
        if (aw.npc[id].rship.category === "acquaint") {
          r.push(id);
        }
      }
      return r;
    }
    function friends() {
      const ids = Object.keys(aw.npc);
      const r: string[] = [];
      for (const id of ids) {
        if (aw.npc[id].rship.category === "friend") {
          r.push(id);
        }
      }
      return r;
    }
    function lovers() {
      const ids = Object.keys(aw.npc);
      const a = ["dating", "exclusive", "lovers", "engaged", "married"];
      const r: string[] = [];
      for (const id of ids) {
        if (a.includes(aw.npc[id].rship.category)) {
          r.push(id);
        }
      }
      return r;
    }
    try {
      const curAcquaint = acq();
      const curFriends = friends();
      const curLovers = lovers();
      const a = curAcquaint.length - ↂ.pcHistory.rship.acquaint.length;
      if (a < 0) {
        ᛝ.rChange += `You @@.peepbad;lost@@ ${Math.abs(a)} acquaintances this week.<br><br>`;
      } else if (a > 0) {
        ᛝ.rChange += `You @@.peepgood;made@@ ${a} new acquaintances this week.<br><br>`;
      } else {
        ᛝ.rChange += "The number of acquaintances you have hasn't changed this week.<br><br>";
      }
      const f = curFriends.length - ↂ.pcHistory.rship.friends.length;
      if (f < 0) {
        ᛝ.rChange += `You @@.peepbad;lost@@ ${Math.abs(f)} friends this week.<br><br>`;
      } else if (f > 0) {
        ᛝ.rChange += `You @@.peepgood;made@@ ${f} new friends this week.<br><br>`;
      } else {
        ᛝ.rChange += "The number of friends you have hasn't changed this week.<br><br>";
      }
      const l = curFriends.length - ↂ.pcHistory.rship.friends.length;
      if (l < 0) {
        ᛝ.rChange += `You @@.peepbad;lost@@ ${Math.abs(l)} romantic partners this week.`;
      } else if (l > 0) {
        ᛝ.rChange += `You @@.peepgood;made@@ ${l} new romantic partners this week.`;
      } else {
        ᛝ.rChange += "The number of romantic partners you have hasn't changed this week.";
      }
    } catch (e) {
      aw.con.warn(`Week History Social Changes failed with error ${e.name}: ${e.message}`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => homeChanges());
  }
  /* actually complete home comparison when home system variables ready*/
  function homeChanges() {

    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => jobChanges());
  }
  // diferent because most job change information is covered at "end of day" in the job system.
  // Only going to cover certain items here.
  function jobChanges() {
    ᛝ.jobChange = "";
    let tits = 0;
    try {
      ᛝ.jobChange = "@@.head3;Employment Changes@@<br>";
      if (ↂ.job.employer !== ↂ.pcHistory.job.employer) {
        tits++;
        ᛝ.jobChange += "''New Employer'' " + ↂ.job.employer + "<br>";
        ᛝ.jobChange += "''New Job'' " + ↂ.job.name + "<br>";
      }
      if (ↂ.job.stats.rank !== ↂ.pcHistory.job.stats.rank) {
        if (ↂ.job.name !== ↂ.pcHistory.job.name) {
          tits++;
          ᛝ.jobChange += "''Promoted To'' " + ↂ.job.name + "<br>";
        } else {
          ᛝ.jobChange += "''You Received a Promotion''<br>";
        }
        tits++;
      }
      let payd;
      if (ↂ.job.rules.payrate > ↂ.pcHistory.job.rules.payrate) {
        payd = ↂ.job.rules.payrate - ↂ.pcHistory.job.rules.payrate;
        ᛝ.jobChange += "@@.good;''You Got A Raise!''@@ Wages increased by @@.money;<<mon>>"
        + payd + "@@/hr to a total of @@.money;<<mon>>" + ↂ.job.rules.payrate + "@@/hr.";
        tits++;
      } else if (ↂ.job.rules.payrate < ↂ.pcHistory.job.rules.payrate) {
        payd = ↂ.pcHistory.job.rules.payrate - ↂ.job.rules.payrate;
        ᛝ.jobChange += "@@.bad;''Your Pay Was Cut!''@@ Wages reduced by @@.money;<<mon>>"
        + payd + "@@/hr to a total of @@.money;<<mon>>" + ↂ.job.rules.payrate + "@@/hr.";
        tits++;
      }
      if (tits === 0) {
        ᛝ.jobChange += "No significant changes this week.";
      }
    } catch (err) {
      ᛔ.AW.error += "Error generating job changes in history function. Error: " + err;
      UI.alert(`Error generating text for job changes, see debug menu for details.`);
    }
    completecheck++;
    setup.sleep.bar(2);
  }
  // safety function (for safety.)
  setTimeout(function() {
    if (completecheck < 9) {
      aw.con.warn(`Week History function failed to complete w/i 15 seconds, ${completecheck} of 9 subfunctions complete.`);
      setup.sleep.bar(18);
    }
  }, 15000);

  setTimeout(() => pcChanges());
};
