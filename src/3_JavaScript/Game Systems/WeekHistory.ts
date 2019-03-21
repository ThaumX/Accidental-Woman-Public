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
  itemChange: string;
}


// creates text for changes that occurred over the week
setup.playerHistoryComparison = function(): void {
  const ᛔ = State.active.variables;
  ↂ.tempHistory = {} as IntↂTempHistory;
  const ᛝ = ↂ.tempHistory;
  let completecheck = 0;
  function pcChanges() {
    const chList: string[] = [];

    ᛝ.pcChange = [];
    try {
      for (let i = 0, names = Object.keys(ↂ.pc.main); i < names.length; i++) {
        try {
          if (ↂ.pc.main[names[i]] !== ↂ.pcHistory.main[names[i]] && names[i] !== "_k") {
            if (names[i] !== "name") {
              chList.push(names[i]);
            }
          }
        } catch (err) {
          ᛔ.AW.error += "error inside history main comparison loop, variable: ";
          ᛔ.AW.error += names[i];
          aw.con.warn(`error INSIDE PC.main comparison loop w/ variable ${names[i]}, ${err.name}: ${err.message}`);
        }
      }
      const bodyExclude = ["tits", "pussy", "asshole"];
      const names = ["race", "skinColor", "tone", "weight", "shoulders", "hips", "waist", "pelvis", "height", "ass", "clit", "labia", "beauty", "face", "brow", "nose", "lips", "jaw", "eyeColor", "lactation", "lactCapacity", "orgasm", "energy", "ears", "topATR", "botATR", "ATR"];
      for (let i = 0, c = names.length; i < c; i++) {
        try {
          if (ↂ.pc.body[names[i]] !== ↂ.pcHistory.body.dta[i] && names[i] !== "_k" && names[i] !== "parent") {
            chList.push(names[i]);
          }
        } catch (err) {
          ᛔ.AW.error += "error inside history body comparison loop, variable: ";
          ᛔ.AW.error += names[i];
          aw.con.warn(`error INSIDE PC.body comparison loop w/ variable ${names[i]}, ${err.name}: ${err.message}`);
        }
      }
      for (let i = 0, c = bodyExclude.length; i < c; i++) {
        if (ↂ.pc.body[bodyExclude[i]] !== ↂ.pcHistory.body[bodyExclude[i]]) {
          chList.push(names[i]);
        }
      }
      const fertNames = ["fertility", "egg", "implant", "vagHostile", "period", "wombHealth", "multEgg", "barren", "cycle", "boost", "ovuMod", "pregTerm", "quality", "ejac", "resMax", "reserve", "refact", "quantity", "surv", "ovuFlag", "iud"];
      for (let i = 0, c = fertNames.length; i < c; i++) {
        try {
          if (ↂ.pc.fert[fertNames[i]] !== ↂ.pcHistory.fert.dta[i] && fertNames[i] !== "_k") {
            chList.push(fertNames[i]);
          }
        } catch (err) {
          ᛔ.AW.error += "error inside history fert comparison loop, variable: ";
          ᛔ.AW.error += fertNames[i];
          aw.con.warn(`error INSIDE PC.fert comparison loop w/ variable ${fertNames[i]}, ${err.name}: ${err.message}`);
        }
      }
    } catch (errs) {
      ᛔ.AW.error += " loop run error in history PC comparison loop: " + errs.name + ", " + errs.message;
      aw.con.warn(`error in main/body/fert comparison loop, ${errs.name}: ${errs.message}`);
    }
    try {
      /*yes, this is lazy as fuck. Ican add proper crap if needed*/
      if (chList.includes("age")) {
        ᛝ.pcChange.push(`You're a year @@.change;older@@ now`);
      }
      if (chList.includes("name")) {
        ᛝ.pcChange.push(("Your @@.change;name@@ has been officially changed to " + ↂ.pc.main.name));
      }
      if (chList.includes("race")) {
        ᛝ.pcChange.push(("Somehow, your @@.change;race@@ changed to " + ↂ.pc.body.race));
      }
      if (chList.includes("skinColor")) {
        ᛝ.pcChange.push(("Your @@.change;skin color@@ changed, and is now " + ↂ.pc.body.skinColor));
      }
      if (chList.includes("tone")) {
        if (ↂ.pc.body.tone > ↂ.pcHistory.body.tone) {
          ᛝ.pcChange.push(`You've developed some @@.change;muscle@@ this week, and are now <<p tone.q>>.`);
        } else {
          ᛝ.pcChange.push(`You've lost some @@.change;muscle@@ this week, and are now <<p tone.q>>.`);
        }
      }
      if (chList.includes("weight")) {
        if (ↂ.pc.body.weight > ↂ.pcHistory.body.weight) {
          ᛝ.pcChange.push(`You've been gaining @@.change;weight@@, and have passed the threshold to be considered <<p weight.q>>.`);
        } else {
          ᛝ.pcChange.push(`You've been losing @@.change;weight@@, and have finally passed the threshold to be considered <<p weight.q>>.`);
        }
      }
      if (chList.includes("shoulders")) {
        if (ↂ.pc.body.shoulders > ↂ.pcHistory.body.shoulders) {
          ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.change;shoulders@@ have widened to be <<p shoulders.q>>.`);
        } else {
          ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.good;shoulders@@ have narrowed to be <<p shoulders.q>>.`);
        }
      }
      if (chList.includes("hips")) {
        if (ↂ.pc.body.hips > ↂ.pcHistory.body.hips) {
          ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.good;hips@@ have widened to be <<p hips.q>>.`);
        } else {
          ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.change;hips@@ have narrowed to be <<p hips.q>>.`);
        }
      }
      if (chList.includes("height")) {
        if (ↂ.pc.body.height > ↂ.pcHistory.body.height) {
          ᛝ.pcChange.push(`By some miracle--or horror--of modern science, you've grown @@.change;taller@@.`);
        } else {
          ᛝ.pcChange.push(`By some miracle--or horror--of modern science, your @@.change;height@@ has shrunk.`);
        }
      }
      if (chList.includes("ass")) {
        if (ↂ.pc.body.ass > ↂ.pcHistory.body.ass) {
          ᛝ.pcChange.push(`Your @@.change;hindquarters@@ have grown, and can now be considered <<p ass.q>>.`);
        } else {
          ᛝ.pcChange.push(`Your @@.change;hindquarters@@ have shrunk, and can now be considered <<p ass.q>>.`);
        }
      }
      if (chList.includes("tits")) {
        ᛝ.pcChange.push(`Your <<p tits.n>> have changed this week, you now have <<p tits.q>> <<p tits.n>> that are a <<p titshape.q>> shape.`);
      }
      /*for orifice sizes*/
      if (chList.includes("pussy")) {
        if (ↂ.pc.body.pussy.tight > ↂ.pcHistory.body.pussy.tight) {
          ᛝ.pcChange.push(`Your <<p natwetness.q>> @@.change;pussy@@ has gotten some use, and has stretched into a <<p pussy.q>> cunt.`);
        } else {
          ᛝ.pcChange.push(`Your <<p natwetness.q>> @@.change;pussy@@ has somehow managed to tighten up into a <<p pussy.q>> cunt.`);
        }
      }
      if (chList.includes("asshole")) {
        if (ↂ.pc.body.asshole.tight > ↂ.pcHistory.body.asshole.tight) {
          ᛝ.pcChange.push(`Your rear end has gotten some use, and has stretched into a <<p asshole.q>> @@.change;asshole@@.`);
        } else {
          ᛝ.pcChange.push(`Your rear end has somehow managed to tighten up into a <<p asshole.q>> @@.change;asshole@@.`);
        }
      }
      /*more generic items*/
      if (chList.includes("clit")) {
        if (ↂ.pc.body.clit > ↂ.pcHistory.body.clit) {
          ᛝ.pcChange.push(`Your @@.change;clit@@ has grown in size, becoming <<p clit.q>>.`);
        } else {
          ᛝ.pcChange.push(`Your @@.change;clit@@ has shrunk in size, becoming <<p clit.q>>.`);
        }
      }
      if (chList.includes("labia")) {
        if (ↂ.pc.body.labia > ↂ.pcHistory.body.labia) {
          ᛝ.pcChange.push(`Your @@.change;pussy lips@@ have gotten larger, becoming <<p labia.q>>.`);
        } else {
          ᛝ.pcChange.push(`Your @@.change;pussy lips@@ have gotten smaller, becoming <<p labia.q>>.`);
        }
      }
      if (chList.includes("beauty")) {
        if (ↂ.pc.body.beauty > ↂ.pcHistory.body.beauty) {
          ᛝ.pcChange.push(`Your @@.good;face@@ has changed somewhat, morphing ever so lightly, resulting in you becoming more beautiful.`);
        } else {
          ᛝ.pcChange.push(`Your @@.bad;face@@ has changed somewhat, morphing ever so lightly, resulting in you becoming less attractive.`);
        }
      }
      if (chList.includes("face")) {
        ᛝ.pcChange.push(`Your @@.change;face@@ has changed somewhat, morphing ever so lightly, resulting in a more <<= ↂ.pc.body.face>> appearance.`);
      }
      if (chList.includes("wetness")) {
        if (ↂ.pc.body.pussy.wetness > ↂ.pcHistory.body.pussy.wetness) {
          ᛝ.pcChange.push(`Your <<p natwetness.q>> pussy seems to have become more @@.change;wet@@ overall, and seems to get @@.change;wet@@ faster as well.`);
        } else {
          ᛝ.pcChange.push(`Your <<p natwetness.q>> pussy seems to have become less @@.change;wet@@ overall, and it also seems to take longer to get @@.change;wet@@ as well.`);
        }
      }
      if (chList.includes("fertility")) {
        if (ↂ.pc.fert.fertility > ↂ.pcHistory.fert.fertility) {
          ᛝ.pcChange.push(`Something must be going right, because you have the feeling that your @@.good;fertility@@ has increased. You're now <<p fertility.q>>.`);
        } else {
          ᛝ.pcChange.push(`Something must have gone horribly wrong, because you have the feeling that your @@.bad;fertility@@ has decreased. You're now <<p fertility.q>>.`);
        }
      }
      if (chList.includes("pregTerm")) {
        if (ↂ.pc.fert.pregTerm > ↂ.pcHistory.fert.pregTerm) {
          ᛝ.pcChange.push(`Your smart toilet has informed you that based on this week's hormonal analysis, it seems that your body's @@.change;gestation@@ process for babies will take longer.`);
        } else {
          ᛝ.pcChange.push(`Your smart toilet has informed you that based on this week's hormonal analysis, it seems that your body has gotten better at growing babies, meaning that @@.change;gestation@@ will be shorter.`);
        }
      }
      if (chList.includes("lactation")) {
        if (ↂ.pc.body.lactation > ↂ.pcHistory.body.lactation) {
          ᛝ.pcChange.push(`Your breasts have gotten better at making @@.good;milk@@, and they will produce it faster than before.`);
        } else {
          ᛝ.pcChange.push(`Your breasts have lost some of their ability to make @@.bad;milk@@, and they will produce it slower than before.`);
        }
      }
      if (chList.includes("orgasm")) {
        if (ↂ.pc.body.orgasm > ↂ.pcHistory.body.orgasm) {
          ᛝ.pcChange.push(`Your @@.bad;genitals@@ have gotten less sensitive for some reason, and you've noticed that it seems to take you longer to reach orgasm.`);
        } else {
          ᛝ.pcChange.push(`Your @@.good;genitals@@ have gotten more sensitive lately, and you've noticed that you seem to be able to reach orgasm quicker.`);
        }
      }
      if (chList.includes("energy")) {
        if (ↂ.pc.body.energy > ↂ.pcHistory.body.energy) {
          ᛝ.pcChange.push(`Your improving fitness seems to be resulting in some extra @@.good;stamina@@, it takes you longer to get worn out.`);
        } else {
          ᛝ.pcChange.push(`Your health and fitness don't seem to be in the best shape, resulting in reduced @@.bad;stamina@@.`);
        }
      }
      if (chList.includes("nipple")) {
        ᛝ.pcChange.push(`You've noticed that your @@.change;nipples@@ look a bit different than before, and now look <<=ↂ.pc.body.tits.nipple>>.`);
      }
      if (chList.includes("eyeColor")) {
        ᛝ.pcChange.push(`your @@.change;eye color@@ has somehow changed! They are now <<= ↂ.pc.body.eyeColor>>.`);
      }
      /*debatable... will have to see how this plays out, but it probably will be okay to include in a weekly report.*/
      if (chList.includes("ATR")) {
        if (ↂ.pc.body.ATR > ↂ.pcHistory.body.ATR) {
          ᛝ.pcChange.push(`Overall, your body has become @@.good;more attractive@@ over the last week.`);
        } else {
          ᛝ.pcChange.push(`Overall, your body has become @@.bad;less attractive@@ over the last week.`);
        }
      }
    } catch (err) {
      ᛔ.AW.error += "Error generating array of body change texts, PC changes in history function. Error: " + err.name;
      aw.con.warn(`Error generating text for body changes, ${err.name}: ${err.message}`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => statusChanges(), 20);
  }
  function statusChanges() {
    const chList: string[] = [];
    const names = ["alcohol", "wetness", "fertText", "risk", "cyc", "period", "milk", "milkStore", "arousal", "pleasure", "need", "satisfaction", "atr", "stress", "happy", "anger", "lonely", "fatigue", "sleep", "health", "will", "overAnger", "overStress", "overDepress", "underSatisfy", "clean", "mindbreak", "morality", "corrupt", "perversion", "bimbo", "kids", "exercise"];
    ᛝ.statusChange = [];
    try {
      for (let i = 0, c = names.length; i < c; i++) {
        try {
          if (ↂ.pc.status[names[i]] !== ↂ.pcHistory.status.dta[i] && names[i] !== "_k") {
            chList.push(names[i]);
          }
        } catch (err) {
          ᛔ.AW.error += "error inside history status comparison loop, variable: ";
          ᛔ.AW.error += names[i];
          aw.con.warn(`error INSIDE PC.status comparison loop w/ variable ${names[i]}, ${err.name}: ${err.message}`);
        }
      }
    } catch (errs) {
      ᛔ.AW.error += " loop run error in history status comparison loop: " + errs + ", ";
      UI.alert(`ERROR: loop run error in history status comparison loop!`);
    }
    try {
      if (chList.includes("birthConType")) {
        ᛝ.statusChange.push(`Your birth control changed this week, you're <<if ↂ.pc.status.birthCon.hormoneType == 'none'>>not using birth control anymore<<else>>now using <<= ↂ.pc.status.birthCon.hormoneType>>.`);
      }
      if (chList.includes("pregA")) {
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
      if (chList.includes("pregB")) {
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
      if (chList.includes("happy")) {
        if (ↂ.pc.status.happy > (ↂ.pcHistory.status.happy + 4)) {
          ᛝ.statusChange.push(`Your @@.good;happiness@@ has improved considerably this week.`);
        } else if (ↂ.pc.status.happy < (ↂ.pcHistory.status.happy - 4)) {
          ᛝ.statusChange.push(`You're a lot less @@.bad;happy@@ than you were before.`);
        }
      }
      if (chList.includes("lonely")) {
        if (ↂ.pc.status.lonely > (ↂ.pcHistory.status.lonely + 35)) {
          ᛝ.statusChange.push(`You haven't been interacting much with other people this week, and you seem to be a lot more @@.bad;lonely@@ than before.`);
        } else if (ↂ.pc.status.lonely < (ↂ.pcHistory.status.lonely - 35)) {
          ᛝ.statusChange.push(`You were able to enjoy a lot of social activities this week, and you're a lot less @@.good;lonely@@ than you were before.`);
        }
      }
      if (chList.includes("health")) {
        if (ↂ.pc.status.health > (ↂ.pcHistory.status.health + 30)) {
          ᛝ.statusChange.push(`Your @@.good;health@@ has improved a great deal this week, and you're feeling much better as a result.`);
        } else if (ↂ.pc.status.health < (ↂ.pcHistory.status.health - 30)) {
          ᛝ.statusChange.push(`Your @@.bad;health@@ took a nosedive this week, and you certainly don't feel at your best.`);
        }
      }
      if (chList.includes("stress")) {
        if (ↂ.pc.status.stress > (ↂ.pcHistory.status.stress + 30)) {
          ᛝ.statusChange.push(`Your @@.bad;stress@@ has skyrocketed this week, and you feel much more on-edge.`);
        } else if (ↂ.pc.status.stress < (ↂ.pcHistory.status.stress - 30)) {
          ᛝ.statusChange.push(`Your @@.good;stress@@ level dropped considerably this week, and you certainly feel more at ease.`);
        }
      }
      if (chList.includes("morality")) {
        if (ↂ.pc.status.morality > (ↂ.pcHistory.status.morality + 20)) {
          ᛝ.statusChange.push(`Your @@.good;morality@@ has improved a great deal this week, and you're feeling like a better person.`);
        } else if (ↂ.pc.status.morality < (ↂ.pcHistory.status.morality - 20)) {
          ᛝ.statusChange.push(`Your @@.bad;morality@@ decreased significantly this week.`);
        }
      }
      if (chList.includes("perversion")) {
        if (ↂ.pc.status.perversion > (ↂ.pcHistory.status.perversion + 20)) {
          ᛝ.statusChange.push(`Your @@.change;perversion@@ has increased significantly this week`);
        } else if (ↂ.pc.status.perversion < (ↂ.pcHistory.status.perversion - 20)) {
          ᛝ.statusChange.push(`Your @@.change;perversion@@ has decreased significantly this week.`);
        }
      }
      if (chList.includes("bimbo")) {
        if (ↂ.pc.status.bimbo > (ↂ.pcHistory.status.bimbo + 25)) {
          ᛝ.statusChange.push(`You feel, like, @@;way better@@ about things.`);
        } else if (ↂ.pc.status.bimbo < (ↂ.pcHistory.status.bimbo - 25)) {
          ᛝ.statusChange.push(`You feel a lot @@.good;more aware@@ about the course your life is taking than you did last week.`);
        }
      }
      if (chList.includes("addictSex")) {
        if (ↂ.pc.status.addict.sex > (ↂ.pcHistory.status.addict.sex + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;sex addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.sex < (ↂ.pcHistory.status.addict.sex - 10)) {
          ᛝ.statusChange.push(`Your @@.good;sex addiction@@ decreased noticeably this week.`);
        }
      }
      if (chList.includes("addictAlc")) {
        if (ↂ.pc.status.addict.alc > (ↂ.pcHistory.status.addict.alc + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;alcohol addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.alc < (ↂ.pcHistory.status.addict.alc - 10)) {
          ᛝ.statusChange.push(`Your @@.good;alcohol addiction@@ decreased noticeably this week.`);
        }
      }
      if (chList.includes("addictHeat")) {
        if (ↂ.pc.status.addict.heat > (ↂ.pcHistory.status.addict.heat + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;heat addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.heat < (ↂ.pcHistory.status.addict.heat - 10)) {
          ᛝ.statusChange.push(`Your @@.good;heat addiction@@ decreased noticeably this week.`);
        }
      }
      if (chList.includes("addictSatyr")) {
        if (ↂ.pc.status.addict.satyr > (ↂ.pcHistory.status.addict.satyr + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;satyr addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.satyr < (ↂ.pcHistory.status.addict.satyr - 10)) {
          ᛝ.statusChange.push(`Your @@.good;satyr addiction@@ decreased noticeably this week.`);
        }
      }
      if (chList.includes("addictFocus")) {
        if (ↂ.pc.status.addict.focus > (ↂ.pcHistory.status.addict.focus + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;focus addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.focus < (ↂ.pcHistory.status.addict.focus - 10)) {
          ᛝ.statusChange.push(`Your @@.good;focus addiction@@ decreased noticeably this week.`);
        }
      }
      if (chList.includes("addictCum")) {
        if (ↂ.pc.status.addict.cum > (ↂ.pcHistory.status.addict.cum + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;cum addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.cum < (ↂ.pcHistory.status.addict.cum - 10)) {
          ᛝ.statusChange.push(`Your @@.good;cum addiction@@ decreased noticeably this week.`);
        }
      }
      if (chList.includes("addictZone")) {
        if (ↂ.pc.status.addict.zone > (ↂ.pcHistory.status.addict.zone + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;zone addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.zone < (ↂ.pcHistory.status.addict.zone - 10)) {
          ᛝ.statusChange.push(`Your @@.good;zone addiction@@ decreased noticeably this week.`);
        }
      }
      if (chList.includes("addictCream")) {
        if (ↂ.pc.status.addict.cream > (ↂ.pcHistory.status.addict.cream + 10)) {
          ᛝ.statusChange.push(`Your @@.bad;creampie addiction@@ increased noticeably this week.`);
        } else if (ↂ.pc.status.addict.cream < (ↂ.pcHistory.status.addict.cream - 10)) {
          ᛝ.statusChange.push(`Your @@.good;creampie addiction@@ decreased noticeably this week.`);
        }
      }
    } catch (err) {
      ᛔ.AW.error += "Error generating array of status change texts, status changes in history function. Error: " + err;
      UI.alert(`Error generating text for status changes, see debug menu for details.`);
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => traitChanges(), 20);
  }
  function traitChanges() {
    const chList: string[] = [];
    const names = ["vert", "intro", "extro", "open", "op", "cl", "will", "libido", "caring", "bitch", "maternal", "romantic", "deceptive", "devious", "persuasive", "perceptive", "forgetful", "forgiving", "lowEsteem", "picky", "crude", "friendly", "approachable", "relaxed", "flirty", "materialist"];
    ᛝ.traitChange = [];
    try {
      for (let i = 0, c = names.length; i < c; i++) {
        try {
          if (ↂ.pc.trait[names[i]] !== ↂ.pcHistory.trait.dta[i] && names[i] !== "_k") {
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
        if (chList[j] === "IE" || chList[j] === "IN" || chList[j] === "EX" || chList[j] === "OC"
        || chList[j] === "OP" || chList[j] === "CL" ) {
          ᛝ.traitChange.push(`@@.bad;font-size:1.25rem;You are the bad kind of cheater, that is, the one who breaks their game trying to cheat. Try again without editing a variable that will break the game.@@`);
        } else {
          cuntNoodle = "You feel like your personality has changed somehow... Something to do with ";
          cuntNoodle += chList[j];
          cuntNoodle += ", perhaps.";
          ᛝ.traitChange.push(cuntNoodle);
        }
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
          if (ↂ.pc.kink[names[i]] !== ↂ.pcHistory.kink.dta[i] && names[i] !== "_k") {
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
          if (ↂ.pc.mutate[names[i]] !== ↂ.pcHistory.mutate.dta[i] && names[i] !== "_k") {
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
    ᛝ.itemChange = "";
    let newItems = "''You obtained these items during the week`:`''";
    let newCunt = 0;
    let lostItems = "''You lost these items during the week`:`''";
    let lostCunt = 0;
    try {
      for (let i = 0, names = Object.keys(ᛔ.items); i < names.length; i++) {
        try {
          if (names[i] !== "Condoms" && names[i] !== "CondomsSab" && names[i] !== "CondomsSabGood"
          && names[i] !== "CondomsSabSupr" && names[i] !== "FertiliTea") {
            if (ᛔ.items[names[i]] && !ↂ.pcHistory.item[names[i]]) {
              if (newCunt !== 0) {
                newItems += ",";
              }
              newItems += " " + [names[i]];
              newCunt++;
            } else if (!ᛔ.items[names[i]] && ↂ.pcHistory.item[names[i]]) {
              if (lostCunt !== 0) {
                lostItems += ",";
              }
              lostItems += " " + [names[i]];
              lostCunt++;
            }
          }
        } catch (err) {
          ᛔ.AW.error += "error in history item comparison loop, variable: ";
          ᛔ.AW.error += ᛔ.items[names[i]] + "-" + err;
          UI.alert(`error in item comparison loop, check debug for specific variable.`);
        }
      }
    } catch (errs) {
      ᛔ.AW.error += " loop run error in history item comparison loop: " + errs + ", ";
      aw.con.warn(`ERROR: loop run error in history item comparison loop!`);
    }
    ᛝ.itemChange = "@@.head3;Inventory Changes@@<br>";
    if (newCunt === 0 && lostCunt === 0) {
      ᛝ.itemChange += "No changes to items this week.<br>";
    }
    if (newCunt !== 0) {
      newItems += "." + "<br>";
      ᛝ.itemChange += newItems;
    }
    if (lostCunt !== 0) {
      lostItems += "." + "<br>";
      ᛝ.itemChange += lostItems;
    }
    completecheck++;
    setup.sleep.bar(2);
    setTimeout(() => homeChanges());
  }
  /* actually complete home comparison when home system variables ready*/
  function homeChanges() {
    ↂ.home.finance.spending = ᛔ.AW.cash - ↂ.home.finance.cash;
    ↂ.home.finance.cash = ᛔ.AW.cash;
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
