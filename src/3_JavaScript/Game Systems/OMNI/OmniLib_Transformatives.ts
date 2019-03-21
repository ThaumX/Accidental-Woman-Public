
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
    let output = "<<f y>>our ass lets out an unexpected burst of gas with a loud "BLYAAAT" sound. After glancing around quickly in embarrassment, you take stock of your body. You notice immediately a sense of relief from your back door, which is no longer itching. ";
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
      ↂ.pc.status.health -= random(2, 6);
      output += "and you notice that parts of your clothes feel looser than before. ";
    } else {
      output += "like you haven't eaten in days. ";
    }
    if (random(1, 9) < beauty[n] && ↂ.pc.body.beauty > 1) {
      ↂ.pc.body.beauty -= 1;
      output += "Your jaw aches, and you notice the onset of a headache. ";
      ↂ.pc.status.health -= random(1, 4);
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
      ↂ.pc.status.health -= random(5, 10);
      output += "Your rear end is feeling more compact as well, it definitely feels tighter and more muscular back there... of more concern are your hips, which are aching badly. ";
    }
    if (random(1, 9) < shoulder[n] && ↂ.pc.body.shoulders < 6) {
      ↂ.pc.body.shoulders += 1;
      ↂ.pc.status.health -= random(3, 6);
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
    const m = (ↂ.pc.body.tits.size > 3000) ? 12 : 8;
    switch (round) {
      case 1:
        if (ↂ.pc.status.milk < 4 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        ↂ.flag.drug.lactaMax++;
        break;
      case 2:
        if (ↂ.pc.status.milk < 4 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        break;
      case 3:
        if (ↂ.pc.status.milk < 4 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        break;
      case 4:
        if (ↂ.pc.status.milk < 4 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        ↂ.pc.fert.egg += (ↂ.pc.fert.egg < 46) ? 1 : 0;
        break;
      case 5:
        if (ↂ.pc.status.milk < 4 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        ↂ.pc.fert.implant += (ↂ.pc.fert.implant < 38) ? 1 : 0;
        break;
      case 6:
        if (ↂ.pc.status.milk < 4 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        ↂ.pc.fert.vagHostile += (ↂ.pc.fert.vagHostile < 32) ? 1 : 0;
        break;
      case 7:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        ↂ.pc.fert.multEgg += (ↂ.pc.fert.multEgg < 500) ? 10 : 0;
        break;
      case 8:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        if (!ↂ.pc.fert.femaleFlag.includes("lactaMax")) {
          ↂ.pc.fert.femaleFlag.push("lactaMax");
        }
        break;
      case 9:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        break;
      case 10:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        if (ↂ.pc.fert.pregTerm > 5 && random(1, 4) === 4) {
          ↂ.pc.fert.pregTerm -= 1;
        }
        break;
      case 11:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        if (ↂ.pc.body.hips < 7 && random(1, 3) > 1 && ↂ.pc.body.hips <= ↂ.pc.body.pelvis) {
          ↂ.pc.body.hips += 1;
        }
        setup.breastCalc();
        break;
      case 12:
        if (ↂ.pc.status.milk < 5 && random(1, 2) === 2) {
          ↂ.pc.status.milk += 1;
        }
        for (let i = 0, c = random(5, m); i < c; i++) {
          amt += random(5, 15);
        }
        ↂ.pc.body.tits.base.size += amt;
        setup.breastCalc();
        if (ↂ.pc.body.pelvis < 7 && random(1, 3) > 1 && ↂ.pc.body.pelvis <= ↂ.pc.body.hips) {
          ↂ.pc.body.pelvis += 1;
        }
        break;
      case 0:

    }
    aw.S("pc");
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
    let msg = "You feel your tits swell a bit.";
    ↂ.pc.body.tits.base.size += random(20, 30);
    ↂ.pc.status.energy.amt -= 1;
    setup.breastCalc();
    if (random(1, 3) > 2) {
      msg = "Your feel a burning sensation in your tits.";
      ↂ.pc.status.health -= random(1, 3);
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
          ↂ.pc.status.health -= random(2, 4);
          msg = "<span class='orange'>Your breasts ache intensely.</span>";
        }
      }
    }
    aw.S("pc");
    setup.notify(msg);
    if (death) {
      super.die();
    }`,
};



