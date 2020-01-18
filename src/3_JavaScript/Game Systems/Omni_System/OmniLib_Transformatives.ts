
//   .d88888b.  888b     d888 888b    888 8888888      888      d8b 888
//  d88P" "Y88b 8888b   d8888 8888b   888   888        888      Y8P 888
//  888     888 88888b.d88888 88888b  888   888        888          888
//  888     888 888Y88888P888 888Y88b 888   888        888      888 88888b.
//  888     888 888 Y888P 888 888 Y88b888   888        888      888 888 "88b
//  888     888 888  Y8P  888 888  Y88888   888  88888 888      888 888  888
//  Y88b. .d88P 888   "   888 888   Y8888   888        888      888 888 d88P
//   "Y88888P"  888       888 888    Y888 8888888      88888888 888 88888P"

//  LIBRARY OF REUSABLE OMNI EVENTS

//  ████████╗██████╗  █████╗ ███╗   ██╗███████╗
//  ╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝
//     ██║   ██████╔╝███████║██╔██╗ ██║███████╗
//     ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║
//     ██║   ██║  ██║██║  ██║██║ ╚████║███████║
//     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝

if (setup.omnItems == null) {
  setup.omnItems = {} as IsetupOmnItems;
}

setup.omnItems.powerTits = {
  name: "Itchy Anus",
  type: "single",
  output: "dialog",
  duration: 180,
  icon: "IMGstatus_CumAnus",
  text: "Your asshole is itchy from the PowerTits suppository",
  run: `
    aw.L("pc");
    const n = Math.min(ↂ.flag.drug.powerTits, 4);
    const tits = [10, 8, 4, 2, 0];
    const muscle = [10, 8, 4, 2, 0];
    const fat = [5, 4, 2, 1, 0];
    const beauty = [0, 1, 2, 3, 4];
    const hips = [0, 2, 4, 6, 8];
    const shoulder = [0, 2, 4, 6, 8];
    let hl = 0;
    let output = "<<f y>>our ass lets out an unexpected burst of gas with a loud sound. After glancing around quickly in embarrassment, you take stock of your body. You notice immediately a sense of relief from your back door, which is no longer itching. ";
    if (random(0, 9) < tits[n]) {
      ↂ.pc.body.tits.base.size += random(4, 10) * 10;
      setup.breastCalc();
      output += "Your breasts feel a little sore, but more full than when you inserted the suppository. ";
    }
    if (random(0, 9) < muscle[n] && ↂ.pc.body.tone < 6) {
      ↂ.pc.body.tone += 1;
      output += "It also feels like you're a little more toned than before. ";
    }
    output += "Your stomach rumbles, and you notice that you're ravenous, ";
    if (random(0, 9) < fat[n]) {
      ↂ.pc.body.weight -= 1;
      if (ↂ.pc.body.weight < 1) {
        ↂ.flag.badEnd = "starvation";
      }
      hl = random(2, 6) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "PowerTits Side Effects");
      output += "and you notice that parts of your clothes feel looser than before. ";
    } else {
      output += "like you haven't eaten in days. ";
    }
    if (random(1, 9) < beauty[n] && ↂ.pc.body.beauty > 1) {
      ↂ.pc.body.beauty -= 1;
      output += "Your jaw aches, and you notice the onset of a headache. ";
      hl = random(1, 4) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "PowerTits Side Effects");
    }
    if (random(1, 9) < hips[n]) {
      if (ↂ.pc.body.hips > 1) {
        ↂ.pc.body.hips -= 1;
      }
      if (ↂ.pc.body.pelvis > 1) {
        ↂ.pc.body.pelvis -= 1;
      }
      if (ↂ.pc.body.ass > 1) {
        ↂ.pc.body.ass -= 1;
      }
      hl = random(5, 10) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "PowerTits Side Effects");
      output += "Your rear end is feeling more compact as well, it definitely feels tighter and more muscular back there... of more concern are your hips, which are aching badly. ";
    }
    if (random(1, 9) < shoulder[n] && ↂ.pc.body.shoulders < 6) {
      ↂ.pc.body.shoulders += 1;
      hl = random(3, 6) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "PowerTits Side Effects");
      output += "You also notice that your shoulders and upper back are aching like you did a few too many reps at the gym. ";
    }
    ↂ.flag.drug.powerTits += 1;
    aw.S("pc");
    output += "The momentary bout of gas behind you, you go about your day.";
    setup.dialog("PowerTits!", output);`,
};

setup.omnItems.lactaMax = {
  name: "lactaMax",
  type: "recurring",
  output: "notify",
  interval: 360,
  times: 12,
  icon: "IMGstatus_Drug",
  text: "You are still under the effects of LactaMax",
  run: `
    const round = 12 - this.times;
    aw.L("pc");
    let amt = 0;
    let m = Math.max(4, Math.ceil(ↂ.pc.body.tits.size / 250) + ↂ.flag.drug.lactaMax) ;
    switch (round) {
      case 1:
        if (ↂ.pc.status.milk < 10 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        ↂ.flag.drug.lactaMax++;
        break;
      case 2:
        if (ↂ.pc.status.milk < 9 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        break;
      case 3:
        if (ↂ.pc.status.milk < 8 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        break;
      case 4:
        if (ↂ.pc.status.milk < 7 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        ↂ.pc.fert.egg += (ↂ.pc.fert.egg < 46) ? 1 : 0;
        break;
      case 5:
        if (ↂ.pc.status.milk < 6 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        ↂ.pc.fert.implant += (ↂ.pc.fert.implant < 38) ? 1 : 0;
        break;
      case 6:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        ↂ.pc.fert.vagHostile += (ↂ.pc.fert.vagHostile < 32) ? 1 : 0;
        break;
      case 7:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        ↂ.pc.fert.multEgg += (ↂ.pc.fert.multEgg < 500) ? 10 : 0;
        break;
      case 8:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        if (!ↂ.pc.fert.femaleFlag.includes("lactaMax")) {
          ↂ.pc.fert.femaleFlag.push("lactaMax");
        }
        if (ↂ.flag.drug.lactaMax > 1) {
          ↂ.pc.kink.nips = true;
        }
        break;
      case 9:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        if (ↂ.pc.body.lactation < 5) {
          ↂ.pc.body.lactation += 1;
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        if (ↂ.flag.drug.lactaMax > 1) {
          ↂ.pc.kink.risky = true;
          if (ↂ.flag.drug.lactaMax > 3) {
            ↂ.pc.trait.libido += 1;
          }
        }
        break;
      case 10:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        if (ↂ.pc.body.lactation < 4) {
          ↂ.pc.body.lactation += 1;
        }
        setup.breastCalc();
        if (ↂ.pc.fert.pregTerm > 5 && random(1, 4) === 4) {
          ↂ.pc.fert.pregTerm -= 1;
        }
        break;
      case 11:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        if (ↂ.pc.body.hips < 7 && random(1, 3) > 1 && ↂ.pc.body.hips <= ↂ.pc.body.pelvis) {
          ↂ.pc.body.hips += 1;
        }
        if (ↂ.pc.body.lactation < 3) {
          ↂ.pc.body.lactation += 1;
        }
        setup.breastCalc();
        break;
      case 12:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.base.size += random(2, m) * 5;
        setup.breastCalc();
        if (ↂ.pc.body.pelvis < 7 && random(1, 3) > 1 && ↂ.pc.body.pelvis <= ↂ.pc.body.hips) {
          ↂ.pc.body.pelvis += 1;
        }
        break;
    }
    aw.S("pc");
    setup.status.arousal(2);
    setup.notify(either("Your breasts are hot and tingly.",
      "Your nipples are hard as diamonds and won't stop tingling pleasurably.",
      "You notice your breasts seem to be more jiggly than usual."));`,
};

setup.omnItems.kukragene = {
  name: "Kukragene",
  type: "recurring",
  output: "notify",
  interval: 288,
  count: 5,
  icon: "IMGstatus_Drug",
  text: "Your tits itch from the Kukragene creme.",
  run: `
    aw.L("pc");
    let hl = 0;
    let msg = "You feel your tits swell a bit.";
    ↂ.pc.body.tits.base.size += random(20, 30);
    ↂ.pc.status.energy.amt -= 1;
    setup.breastCalc();
    if (random(1, 3) > 2) {
      msg = "Your feel a burning sensation in your tits.";
      hl = random(1, 3) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "Besty's own Kukragene");
      ↂ.pc.status.energy.amt -= random(1, 2);
    }
    const amt = setup.omni.matching("Kukragene");
    let death = false;
    if (amt > 1) { // saggy time
      if (random(0, 5) < amt) {
        if (ↂ.pc.body.tits.shape !== "thin" && ↂ.pc.body.tits.shape !== "relaxed") {
          death = true;
          ↂ.pc.body.tits.shape = "relaxed";
          msg = "<span class='bad'>You feel your ache intensely as they begin to sag.</span>";
        } else if (ↂ.pc.body.tits.shape === "relaxed") {
          death = true;
          ↂ.pc.body.tits.shape = "thin";
          msg = "<span class='bad'>Your tits ache intensely as they lose their structure.</span>";
        } else {
          hl = random(2, 4) * -1;
          ↂ.pc.status.health += hl;
          setup.status.record("health", hl, "Besty's own Kukragene");
          msg = "<span class='orange'>Your breasts ache intensely.</span>";
        }
      }
    }
    aw.S("pc");
    setup.notify(msg);
    if (death) {
      setup.omni.kill("Kukragene");
    }`,
};

setup.omnItems.hipsTreatment = {
  name: "Hips Treatment",
  type: "recurring",
  output: "notify",
  interval: 3000,
  count: 3,
  icon: "IMGstatus_Drug",
  text: "You got a Progenerate hip widening treatment.",
  run: `
    aw.L("pc");
    const round = 3 - this.times;
    let out = "ERROR - Hips Treatment";
    switch (round) {
      case 1:
        out = "Your hips ache noticeably as they grow.";
        break;
      case 2:
        if (ↂ.pc.body.hips !== ↂ.pc.body.pelvis) {
          if (ↂ.pc.body.hips < ↂ.pc.body.pelvis) {
            ↂ.pc.body.hips += 1;
            out = "Your hips grow slightly to be more in balance.";
          } else {
            ↂ.pc.body.pelvis += 1;
            out = "Your pelvic girdle grows slightly to be more in balance.";
          }
        } else {
          if (ↂ.pc.body.hips < 7) {
            ↂ.pc.body.hips += 1;
            ↂ.pc.body.pelvis += 1;
          }
          out = "Your hips seem to be larger than they were before.";
        }
        break;
      case 3:
        ↂ.pc.body.hips += 1;
        ↂ.pc.body.pelvis += 1;
        out = "Your hips seem to be larger than they were before.";
        break;
    }
    setup.notify(out);
    aw.S("pc");
    `,
};

setup.omnItems.basicFertilityTreat = {
  name: "Progenerate Fertility Treatment",
  type: "single",
  output: "none",
  duration: 1800,
  icon: "IMGstatus_RejSickness",
  text: "Your reproductive tract aches from the treatment.",
  run: "",
};


setup.omnItems.catTrans = {
  name: "Cat-A Tonic",
  type: "recurring",
  output: "notify",
  interval: 300,
  times: 6,
  icon: "IMGstatus_Drug",
  text: "You are still under the effects of the Cat-A tonic",
  run: `
    const round = 6 - this.times;
    aw.L("pc");
    switch (round) {
      case 1:
        setup.notify("Your scalp tingles insistently");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 2:
        setup.notify("your tailbone feels like pins and needles");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 3:
        setup.notify("Your scalp itches furiously");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 4:
        setup.notify("New appendages are starting to grow");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 5:
        setup.notify("Your new ears and tail continue to grow");
        ↂ.pc.body.tail = "cat";
        ↂ.pc.body.ears = "cat";
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 6:
        setup.notify("Your new ears and tail have finished growing");
        ↂ.pc.body.tail = "cat";
        ↂ.pc.body.ears = "cat";
        break;
    }
    aw.S("pc");
  `,
};

setup.omnItems.dogTrans = {
  name: "PUPS Tonic",
  type: "recurring",
  output: "notify",
  interval: 300,
  times: 6,
  icon: "IMGstatus_Drug",
  text: "You are still under the effects of the PUPS tonic",
  run: `
    const round = 6 - this.times;
    aw.L("pc");
    switch (round) {
      case 1:
        setup.notify("Your scalp tingles insistently");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 2:
        setup.notify("your tailbone feels like pins and needles");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 3:
        setup.notify("Your scalp itches furiously");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 4:
        setup.notify("New appendages are starting to grow!");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 5:
        setup.notify("Your new ears and tail continue to grow");
        ↂ.pc.body.tail = "dog";
        ↂ.pc.body.ears = "dog";
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 6:
        setup.notify("Your new ears and tail have finished growing");
        ↂ.pc.body.tail = "dog";
        ↂ.pc.body.ears = "dog";
        break;
    }
    aw.S("pc");
  `,
};

setup.omnItems.foxTrans = {
  name: "Fox-E Tonic",
  type: "recurring",
  output: "notify",
  interval: 300,
  times: 6,
  icon: "IMGstatus_Drug",
  text: "You are still under the effects of the Fox-E tonic",
  run: `
    const round = 6 - this.times;
    aw.L("pc");
    switch (round) {
      case 1:
        setup.notify("Your scalp tingles insistently");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 2:
        setup.notify("your tailbone feels like pins and needles");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 3:
        setup.notify("Your scalp itches furiously");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 4:
        setup.notify("New appendages are starting to grow!");
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 5:
        setup.notify("Your new ears and tail continue to grow");
        ↂ.pc.body.tail = "fox";
        ↂ.pc.body.ears = "fox";
        ↂ.pc.status.energy.amt -= 3;
        break;
      case 6:
        setup.notify("Your new ears and tail have finished growing");
        ↂ.pc.body.tail = "fox";
        ↂ.pc.body.ears = "fox";
        break;
    }
    aw.S("pc");
  `,
};

setup.omnItems.bovinex = {
  name: "Bovinex",
  type: "recurring",
  output: "notify",
  interval: 360,
  times: 7,
  icon: "IMGstatus_Drug",
  text: "You are still under the effects of Bovinex",
  run: `
    const round = 7 - this.times;
    aw.L("pc");
    switch (round) {
      case 1:
        setup.notify("Your scalp tingles insistently");
        ↂ.flag.drug.bovinex = true;
        break;
      case 2:
        setup.notify("Your tailbone feels like pins and needles");
        break;
      case 3:
        setup.notify("Your breasts ache as grow rapidly");
        if (ↂ.pc.body.tits.base.size < 1600) {
          ↂ.pc.body.tits.base.size = random(320, 360) * 5;
        } else {
          let amt = random(40, 60) * 5;
          ↂ.pc.body.tits.base.size += amt;
        }
        if (ↂ.pc.body.tits.nipLength < 5) {
          ↂ.pc.body.tits.nipLength = 5;
        } else {
          ↂ.pc.body.tits.nipLength += 1;
        }
        if (ↂ.pc.body.tits.nipGirth < 3) {
          ↂ.pc.body.tits.nipGirth = 3;
        } else {
          ↂ.pc.body.tits.nipLength += 1;
        }
        ↂ.pc.status.bimbo += random(5,10);
        ↂ.pc.kink.nips = true;
        setup.breastCalc();
        break;
      case 4:
        setup.notify("Your tits ache feel hot and productive");
        if (ↂ.pc.body.lactation < 4) {
          ↂ.pc.body.lactation = 5;
        } else {
          ↂ.pc.body.lactation = 6;
        }
        if (ↂ.pc.status.milk < 4) {
          ↂ.pc.status.milk += 3;
        } else if (ↂ.pc.status.milk < 7) {
          ↂ.pc.status.milk += 2;
        } else if (ↂ.pc.status.milk < 10) {
          ↂ.pc.status.milk += 1;
        }
        ↂ.pc.body.tits.areola += 1;
        ↂ.pc.body.tits.puffy += 1;
        ↂ.pc.mutate.milk = true;
        ↂ.pc.status.bimbo += random(5,10);
        let amtTwo = random(30, 40) * 5;
        ↂ.pc.body.tits.base.size += amtTwo;
        setup.breastCalc();
        break;
      case 5:
        setup.notify("You've started to grow hucow ears and tail");
        if (ↂ.pc.fert.fertility < 3) {
          ↂ.pc.fert.fertility = 3;
          setup.fert.playerStatsCalc();
        } else if (ↂ.pc.fert.fertility < 5) {
          ↂ.pc.fert.fertility = 5;
          setup.fert.playerStatsCalc();
        }
        if (!ↂ.pc.kink.slut) {
          ↂ.pc.kink.slut = true;
        } else if (!ↂ.pc.kink.superSlut) {
          ↂ.pc.kink.superSlut = true;
        } else if (!ↂ.pc.kink.hyperSlut) {
          ↂ.pc.kink.hyperSlut = true;
        }
        ↂ.pc.kink.easy = true;
        ↂ.pc.status.bimbo += random(5,10);
        break;
      case 6:
        setup.notify("Your new ears and tail continue to grow");
        if (ↂ.pc.body.clit < 3) {
          ↂ.pc.body.clit = random(3, 4);
        } else {
          ↂ.pc.body.clit = 5;
        }
        ↂ.pc.trait.libido += 1;
        if (random(1,3) > 1) {
          if (!ↂ.pc.kink.slut) {
            ↂ.pc.kink.slut = true;
          } else if (!ↂ.pc.kink.superSlut) {
            ↂ.pc.kink.superSlut = true;
          } else if (!ↂ.pc.kink.hyperSlut) {
            ↂ.pc.kink.hyperSlut = true;
          }
        }
        ↂ.pc.kink.risky = true;
        ↂ.pc.kink.pregnancy = true;
        ↂ.pc.body.tail = "cow";
        ↂ.pc.body.ears = "cow";
        break;
      case 7:
        ↂ.pc.body.tail = "cow";
        ↂ.pc.body.ears = "cow";
        setup.dialog("Bovinex", "<p>You've experienced several changes as the Bovinex treatment ran its course. Your new ears and tail have finished growing. In addition to the expected breast growth and increase in your ability to lactate, you've also grown your own set of hucow ears and a cute hucow tail. Your nipples have gotten a little larger, you <i>feel</i> a little more fertile, <<if ↂ.pc.status.milk < 4>>and you even started lactating.<<else>>and your lactation training increased.<</if>>. The most unusual--though not unpleasant--change has been the increase in your sex drive, and the way your mind seems more preoccupied with sex. <<if ↂ.pc.kink.hyperSlut>>You're definitely a hyper-slut now, yay!<<elseif ↂ.pc.kink.superSlut>>You're definitely a super-slut now, yay!<<else>>You're definitely a slut now!<</if>></p><center>[img[IMG-Slutify-ahegao]]</center>");
        break;
    }
    let x = random(1,3);
    ↂ.pc.status.energy.amt -= x;
    aw.S("pc");
    setup.status.arousal(x);
  `,
};

setup.omnItems.teatEnhance = {
  name: "Teat Enhancement",
  type: "recurring",
  output: "notify",
  interval: 300,
  times: 3,
  icon: "IMGstatus_Drug",
  text: "You are still under the effects of the Teat Enhancement",
  run: `
    const round = 3 - this.times;
    aw.L("pc");
    switch (round) {
      case 1:
        setup.notify("Your nipples tingle pleasurably");
        setup.status.arousal(3);
        break;
      case 2:
        setup.notify("Your nipples throb with pleasure");
        setup.status.arousal(3);
        aw.S("pc");
        break;
      case 3:
        setup.notify("Your nipples ache from growing");
        ↂ.pc.status.energy.amt -= 3;
        if (ↂ.pc.body.tits.nipLength < 6) {
          ↂ.pc.body.tits.nipLength = 6;
        } else {
          ↂ.pc.body.tits.nipLength += 1;
        }
        if (ↂ.pc.body.tits.nipGirth < 4) {
          ↂ.pc.body.tits.nipGirth = 4;
        } else {
          ↂ.pc.body.tits.nipLength = 5;
        }
        if (ↂ.pc.body.tits.areola < 3) {
          ↂ.pc.body.tits.areola = 3
        } else {
          if (random(1, ↂ.pc.body.tits.areola * 2) === 1) {
            ↂ.pc.body.tits.areola += 1;
          }
        }
        if (ↂ.pc.body.tits.puffy < 3) {
          ↂ.pc.body.tits.puffy = 3;
        } else {
          ↂ.pc.body.tits.puffy += 1;
        }
        let amd = random(150, 300) * 5;
        ↂ.pc.body.tits.base.size += amd;
        ↂ.pc.kink.nips = true;
        setup.breastCalc();
        aw.S("pc");
        break;
    }
  `,
};

setup.omnItems.mammarex = {
  name: "Mammarex",
  type: "recurring",
  output: "notify",
  interval: 400,
  times: 3,
  icon: "IMGstatus_Drug",
  text: "You are still under the effects of Mammarex",
  run: `
    const round = 3 - this.times;
    aw.L("pc");
    switch (round) {
      case 1:
        setup.notify("Your breasts tingle pleasurably");
        ↂ.pc.status.energy.amt -= 2;
        ↂ.flag.drug.mammarex++;
        if (random(0, 4) < ↂ.flag.drug.mammarex) {
          ↂ.pc.kink.nips = true;
        }
        break;
      case 2:
        setup.notify("Your breasts feel warm and swollen");
        ↂ.pc.status.energy.amt -= 2;
        if (ↂ.pc.status.milk < 3) {
          ↂ.pc.status.milk += 1;
        } else if (random(1, ↂ.pc.status.milk) === 1) {
          ↂ.pc.status.milk += 1;
        }
        break;
      case 3:
        const div = Math.max(8, Math.max(10, 15 - ↂ.flag.drug.mammarex));
        const amt = Math.floor(ↂ.pc.body.tits.base.size / div) + (random(5,10) * 10);
        const msg = "your breasts have grown " + amt + "cc larger";
        setup.notify(msg);
        ↂ.pc.status.bimbo += 3 * ↂ.flag.drug.mammarex;
        ↂ.pc.status.energy.amt -= 2;
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        break;
    }
    aw.S("pc");
    setup.status.arousal(3);
  `,
};
