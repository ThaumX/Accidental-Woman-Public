
//   .d88888b.  888b     d888 888b    888 8888888      888      d8b 888
//  d88P" "Y88b 8888b   d8888 8888b   888   888        888      Y8P 888
//  888     888 88888b.d88888 88888b  888   888        888          888
//  888     888 888Y88888P888 888Y88b 888   888        888      888 88888b.
//  888     888 888 Y888P 888 888 Y88b888   888        888      888 888 "88b
//  888     888 888  Y8P  888 888  Y88888   888  88888 888      888 888  888
//  Y88b. .d88P 888   "   888 888   Y8888   888        888      888 888 d88P
//   "Y88888P"  888       888 888    Y888 8888888      88888888 888 88888P"

//  LIBRARY OF REUSABLE OMNI EVENTS

//  ██╗  ██╗███████╗ █████╗ ██╗  ████████╗██╗  ██╗
//  ██║  ██║██╔════╝██╔══██╗██║  ╚══██╔══╝██║  ██║
//  ███████║█████╗  ███████║██║     ██║   ███████║
//  ██╔══██║██╔══╝  ██╔══██║██║     ██║   ██╔══██║
//  ██║  ██║███████╗██║  ██║███████╗██║   ██║  ██║
//  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝  ╚═╝

if (setup.omnItems == null) {
  setup.omnItems = {} as IsetupOmnItems;
}

setup.omnItems.concussion = {
  name: "Concussion",
  type: "recurring",
  output: "notify",
  times: 6,
  interval: 180,
  icon: "IMGstatus_Injured",
  text: "That headache is really not pleasant at all.",
  run: `if (random(1, 3) > 1) { setup.notify("Your feel dizzy but the feeling subsides quickly."); }`,
};

setup.omnItems.postBoobsSurgery = {
  name: "Post surgery",
  type: "recurring",
  output: "notify",
  times: 24,
  interval: 180,
  icon: "IMGstatus_Injured",
  text: "You feel your tits are swollen and painful to touch.",
  run: `if (random(1, 3) > 1) { setup.notify("Your boobs ache but it gets better soon."); }`,
};

setup.omnItems.piercing = {
  name: "Pierced",
  type: "single",
  output: "none",
  duration: 360,
  icon: "IMGstatus_Injured",
  text: "Your new piercing tingles from time to time.",
  run: "",
};

setup.omnItems.lateMiscarriage = {
  name: "Miscarriage Bleeding",
  type: "recurring",
  output: "alert",
  times: 18,
  interval: 45,
  icon: "IMGstatus_Bleeding",
  text: "You are bleeding heavily after having a miscarriage.",
  run: `aw.L();
    if (this.count > 0) {
      const max = Math.max(1, Math.ceil(this.times / 3)) * 4;
      const min = Math.ceil(max * 0.75);
      const hl = random(min, max) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "Significant miscarriage")
      if (ↂ.pc.status.health < 1) {
        ↂ.flag.badEnd = "miscarriage";
        // that's it... game over man, game over.
        // flag isn't really used, because we go straight to the bad-end...
        setup.badEnd("miscarriage");
      }
    }
    aw.S();`,
};

setup.omnItems.bleeding = {
  name: "Bleeding",
  type: "recurring",
  output: "alert",
  times: 18,
  interval: 45,
  icon: "IMGstatus_Bleeding",
  text: "You are bleeding heavily after having a gunshot wound.",
  run: `aw.L();
    if (this.count > 0) {
      const max = Math.max(1, Math.ceil(this.times / 3)) * 4;
      const min = Math.ceil(max * 0.75);
      const hl = random(min, max) * -1;
      ↂ.pc.status.health += hl;
      setup.condition.add({ loc: "stomach", amt: 8, tgt: "pc", wet: 8, type: "blood"});
      setup.status.record("health", hl, "Significant bleeding");
      if (this.count === 7) {
        UI.alert("Blood is pouring from the wound. Your vision becomes blurry, your feel hard to stay straight.");
      }
      if (ↂ.pc.status.health < 1) {
        ↂ.flag.badEnd = "miscarriage";
        // that's it... game over man, game over.
        // flag isn't really used, because we go straight to the bad-end...
        setup.badEnd("miscarriage");
      }
    }
    aw.S();`,
};

setup.omnItems.alcoholPoisoning = {
  name: "Alcohol Poisoning",
  type: "single",
  output: "none",
  duration: 30,
  icon: "IMGstatus_Dead",
  text: "You are in critical danger.",
  run: `setup.badEnd("Alcohol Poisoning");`,
};

setup.omnItems.alcoholNausea = {
  name: "Nausea",
  type: "recurring",
  output: "dialog",
  times: 6,
  interval: 20,
  icon: "IMGstatus_Nausea",
  text: "You feel like you might throw up.",
  run: `const max = 16 - ↂ.pc.status.alcohol;
  if (ↂ.pc.status.alcohol > 6 && random(1, max) === 1) {
    setup.time.add(random(12,18));
    ↂ.pc.status.alcohol -= Math.max(0, (random(0,3) - 1));
    const vomit = {
      loc : "face",
      amt : 8,
      tgt : "pc",
      wet : 5,
      type : "vomit"
    }
    setup.condition.add(vomit);
    vomit.loc = "chest";
    vomit.amt = 12;
    setup.condition.add(vomit);
    vomit.loc = "hands";
    vomit.amt = 4;
    setup.condition.add(vomit);
    vomit.loc = "stomach";
    vomit.amt = 6;
    setup.condition.add(vomit);
    aw.S();
    setup.Dialog("Alcohol Nausea","<<include [[AlcoholThrowingUp]]>>");
  }`,
};

setup.omnItems.sstd_dripsA = {
  name: "Fever",
  type: "recurring",
  output: "none",
  times: 5,
  interval: 480,
  icon: "IMGstatus_Sick",
  text: "You feel under the weather.",
  run: `
  if (!ↂ.pc.status.disease.includes("fever")) {
    super.die();
  } else {
    switch(this.times){
      case 4:
        UI.alert("You notice that you're feeling a bit under the weather, your throat feels a little scratchy.");
        break;
      case 3:
        status.dialog("Sick with a Cold","<center><<= either("[img[IMG-SweatyThree]]","[img[IMG-SweatyFour]]")>><br>You're feeling feverish and generally under the weather, perhaps you have a cold?</center>");
        break;
      case 2:
        status.dialog("Sick with a Cold","<center><<= either("[img[IMG-SweatySix]]","[img[IMG-SweatyFive]]")>><br>Your fever persists, though your throat and nose seem to be much improved. Maybe your cold is almost over?</center>");
        break;
      case 1:
        status.dialog("Sick with a Cold","<center><<= either("[img[IMG-SweatyOne]]","[img[IMG-SweatyTwo]]")>><br>You still have a weak fever, and remain a little fatigued, but you definitely feel better than before. You've noticed that it tingles a little when you pee, and resolve to drink some more water.</center>");
        break;
      case 0:
      default:
        aw.L();
        if (setup.omni.matching("the Drips") === 0) {
          ↂ.pc.status.disease.push("drips");
          setup.omni.new("sstd_dripsB");
        }
        ↂ.pc.status.disease.delete("fever");
        aw.S();
        UI.alert("Finally, your fever seems to have gone away.");
    }
  }`,
};

setup.omnItems.sstd_dripsB = {
  name: "the Drips",
  type: "perpetual",
  output: "none",
  interval: 60,
  icon: "IMGstatus_SickVag",
  text: "You are infected with Scortumbacter Ducatus aka The Drips.",
  run: `aw.L("pc");
  if (random(1, 250) === 250) {
    UI.alert("It seems like your case of the drips has finally cleared up!");
    ↂ.pc.status.disease.delete("drips")
    aw.S("pc");
  }
  if (!ↂ.pc.status.disease.includes("drips")) {
    super.die();
  } else {
    ↂ.pc.status.wetness += 10;
    setup.condition.add({ loc:"vagFluid", amt:5, tgt:"pc", wet:5, type:"femlube"});
    setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"});
    if (ↂ.pc.body.pussy.wetness < 5) {
      ↂ.pc.body.pussy.wetness = 5;
    }
    if (random(1, 48) === 1) {

      if (random(1, 3) > 1) {
        ↂ.pc.body.labia += 1;
        UI.alert("You had noticed some discomfort down below, and when you check you realize that your labia have grown larger!");
      } else {
        ↂ.pc.body.clit += 1;
        UI.alert("Having noticed some discomfort from your clit, you realize that it's as hard as a rock... and when you explore it briefly with your fingers, discover that it also seems to have grown.");
      }
    }
    aw.S("pc");
  }`,
};

setup.omnItems.cold = {
  name: "A Cold",
  type: "recurring",
  output: "none",
  times: 5,
  interval: 480,
  icon: "IMGstatus_Sick",
  text: "You feel under the weather.",
  run: `
  if (!ↂ.pc.status.disease.includes("cold")) {
    super.die();
  } else {
    switch(this.times){
      case 4:
        UI.alert("You notice that you're feeling a bit under the weather, your throat feels a little scratchy.");
        break;
      case 3:
        status.dialog("Sick with a Cold","<center><<= either("[img[IMG-SweatyThree]]","[img[IMG-SweatyFour]]")>><br>You're feeling feverish and generally under the weather, perhaps you have a cold?</center>");
        break;
      case 2:
        status.dialog("Sick with a Cold","<center><<= either("[img[IMG-SweatySix]]","[img[IMG-SweatyFive]]")>><br>Your fever persists, though your throat and nose seem to be much improved. Maybe your cold is almost over?</center>");
        break;
      case 1:
        status.dialog("Sick with a Cold","<center><<= either("[img[IMG-SweatyOne]]","[img[IMG-SweatyTwo]]")>><br>You still have a week fever, and remain a little fatigued, but you definitely feel better than before. You've noticed that it tingles a little when you pee, and resolve to drink some more water.</center>");
        break;
      case 0:
      default:
        UI.alert("Finally, your fever seems to have gone away.");
        aw.L();
        ↂ.pc.status.disease.delete("cold");
        aw.S();
    }
  }`,
};

setup.omnItems.moronovirus = {
  name: "Weird feeling",
  type: "recurring",
  output: "none",
  times: 5,
  interval: 520,
  icon: "IMGstatus_Sick",
  text: "You feel funny; is it your brain itches?",
  run: `
  if (!ↂ.pc.status.disease.includes("moronovirus")) {
    super.die();
  } else {
    switch(this.times){
      case 4:
        UI.alert("You notice that your mood improved recently.");
        ↂ.pc.status.happy += 2;
        setup.status.record("happy", 2, "That brain itch makes you happy it seems");
        ↂ.pc.status.bimbo += 5;
        setup.status.record("bimbo", 5, "Moronovirus infection");
        aw.S();
        break;
      case 3:
        UI.alert("You feel really great!");
        ↂ.pc.status.happy += 3;
        setup.status.record("happy", 3, "That brain itch makes you happy it seems");
        ↂ.pc.status.bimbo += 7;
        setup.status.record("bimbo", 7, "Moronovirus infection");
        aw.S();
        break;
      case 2:
        UI.alert("It is a bit hard to concentrate but this doesn't bother you too much.");
        ↂ.pc.status.happy += 3;
        ↂ.pc.trait.libido += 1;
        setup.status.record("happy", 3, "That brain itch makes you happy it seems");
        ↂ.pc.status.bimbo += 10;
        setup.status.record("bimbo", 10, "Moronovirus infection");
        aw.S();
        break;
      case 1:
        UI.alert("You feel not that happy as you were recently but at least that tingle in your brain starts to lessen out.");
        ↂ.pc.status.happy += 1;
        ↂ.pc.trait.libido += 1;
        setup.status.record("happy", 1, "That brain itch makes you happy it seems");
        ↂ.pc.status.bimbo += 15;
        setup.status.record("bimbo", 15, "Moronovirus infection");
        aw.S();
        break;
      case 0:
      default:
        UI.alert("Finally, you feel healthy ones again.");
        aw.L();
        ↂ.pc.status.bimbo -= 20;
        setup.status.record("bimbo", -20, "Recovered from Moronovirus");
        ↂ.pc.status.happy -= 1;
        ↂ.pc.trait.libido -= 1;
        setup.status.record("happy", -1, "You miss being happy for no reason...");
        ↂ.pc.status.disease.delete("moronovirus");
        aw.S();
    }
  }`,
};

setup.omnItems.sstd_WetHeat = {
  name: "Wet Heat",
  type: "perpetual",
  output: "none",
  interval: 60,
  icon: "IMGstatus_Sick",
  text: "You are infected with the Wet Heat disease.",
  run: `aw.L("pc");
  if (random(1, 250) === 250) {
    UI.alert("It seems like your case of the Wet Heat has cleared up on its own!");
    ↂ.pc.status.disease.delete("wetHeat")
    aw.S("pc");
  }
  if (!ↂ.pc.status.disease.includes("wetHeat")) {
    super.die();
  } else {
    ↂ.pc.status.wetness += 5;
    setup.condition.add({ loc:"vagFluid", amt:5, tgt:"pc", wet:5, type:"femlube"});
    const locs = ["hair", "face", "chest", "back", "hands", "stomach", "butt", "groin", "genitals", "thighs", "legs", "feet"];
    for (let i = 0, c = locs.length; i < c; i++) {
      const l = locs[i] as "hair" | "face" | "chest" | "back" | "hands" | "stomach" | "butt" | "groin" | "genitals" | "thighs" | "legs" | "feet";
      setup.condition.add({ loc: l, amt: 5, tgt: "pc", wet: 5, type: "sweat" });
    }
    let msg = "<center>[img[IMG-Sweats" + random(1,9) + "]]<br>Your case of the Wet Heat has caused your body to once again be soaked with sweat. You feel the craving for a big hot creampie building within you as your body maintains its constant state of arousal.</center>";
    if (ↂ.pc.status.arousal < 4) {
      ↂ.pc.status.arousal = 4;
    }
    if (random(1, 2) === 1) {
      ↂ.pc.status.addict.cream += 1;
    }
    ↂ.pc.status.addict.creamNeed += 1;
    if (random(1, 48) === 1) {
      ↂ.pc.status.bimbo += 3;
      setup.status.record("bimbo", 3, "Wet Heat Disease");
      if (!ↂ.pc.kink.risky) {
        ↂ.pc.kink.risky = true;
        msg += "<center>@@.change;You have developed a kink for risky sex.@@</center>";
      } else if (!ↂ.pc.kink.pregnancy) {
        ↂ.pc.kink.pregnancy = true;
        msg += "<center>@@.change;You have developed a kink for getting pregnant.@@</center>";
      } else if (!ↂ.pc.kink.cumSlut){
        ↂ.pc.kink.cumSlut = true;
        msg += "<center>@@.change;You have developed a love of semen, you're a cumslut now.@@</center>";
      } else {
        msg += "<center>@@.change;Your need for a creampie is dulling your wits.@@</center>";
      }
    }
    aw.S("pc");
    setup.dialog("Wet Heat", msg);
  }`,
};

