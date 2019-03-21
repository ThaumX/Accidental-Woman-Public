
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
  icon: "IMGstatus_VerySick",
  text: "You are bleeding heavily after having a miscarriage.",
  run: `aw.L();
    if (this.count > 0) {
      const max = Math.max(1, Math.ceil(this.times / 3)) * 4;
      const min = Math.ceil(max * 0.75);
      ↂ.pc.status.health -= random(min, max);
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
  times: 6,
  interval: 480,
  icon: "none",
  text: "none",
  run: `switch(this.times){
    case 5:
      UI.alert("You notice that you're feeling a bit under the weather, your throat feels a little scratchy.");
      break;
    case 4:
      this.icon = "IMGstatus_Sick";
      this.text = "You feel feverish and generally under the weather.";
      break;
    case 3:
      UI.alert("Your fever persists, though your throat and nose seem to be much improved. Maybe your cold is almost over?");
      break;
    case 2:
      UI.alert("You still have a week fever, and remain a little fatigued, but you definitely feel better than before. You've noticed that it tingles a little when you pee, and resolve to drink some more water.");
      break;
    case 1:
      this.icon = "none";
      this.text = "none";
      UI.alert("Finally, your fever seems to have gone away.");
      break;
    case 0:
    default:
      if (setup.omni.matching("the Drips") === 0) {
        setup.omni.new("sstd_dripsB");
      }
  }`,
};

setup.omnItems.sstd_dripsB = {
  name: "the Drips",
  type: "perpetual",
  output: "none",
  interval: 60,
  icon: "IMGstatus_SickVag",
  text: "You are infected with Scortumbacter Ducatus.",
  run: `aw.L("pc");
  ↂ.pc.status.wetness += 10;
  setup.condition.add({ loc:"groin", amt:5, tgt:"pc", wet:5, type:"femlube"});
  if (ↂ.pc.body.pussy.wetness < 5) {
    ↂ.pc.body.pussy.wetness = 5;
  }
  if (ↂ.pc.status.wetess > 10) {
    // get some clothes wet
    if (aw.slot.panties !== 0) {
      aw.slot.panties.wetness = random(3, 5);
      if (aw.slot.panties.cond.femlube == null) {
        aw.slot.panties.cond.femlube = random(2, 4);
      } else {
        aw.slot.panties.cond.femlube += 5;
      }
    }
    if (aw.slot.bottom !== 0 && ↂ.pc.status.wetness > 18) {
      aw.slot.bottom.wetness += 3;
      aw.slot.bottom.cond.femlube = 5;
    }
  }
  if (random(1, 48) === 1) {

    if (random(1, 3) > 1) {
      ↂ.pc.body.labia += 1;
      UI.alert("You notice some discomfort down below, and suddenly realize that your labia have grown larger");
    } else {
      ↂ.pc.body.clit += 1;
      UI.alert("Noticing some discomfort from your clit, you realize that it's as hard as a rock... and it also seems to have grown somewhat.");
    }
  }
  if (random(1, 250) === 250) {
    UI.alert("It seems like your case of the drips has finally cleared up!");
    aw.S("pc");
    super.die();
  }
  aw.S("pc");`,
};

