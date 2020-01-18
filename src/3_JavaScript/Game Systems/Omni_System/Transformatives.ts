/*
// ████████╗███████╗
// ╚══██╔══╝██╔════╝
//    ██║   █████╗
//    ██║   ██╔══╝
//    ██║   ██║
//    ╚═╝   ╚═╝
*/

interface setupTF {
  list: (corp: string) => twee;
  generate: (corp: string, drug: string) => void;
  corps: object;
  medicine: object;
  sideEffects: object;
}


// NAMESPACE
if (setup.tf === null || setup.tf === undefined) {
  setup.tf = {} as setupTF;
}

setup.tf.list = function(corp: string): twee {
  let out = "";
  const corps = ["elitref", "pliant", "genomics", "succulence", "slimogen", "xiee", "queerist"];
  if (setup.tf.corps[corp] !== null) {
    if (setup.tf.corps[corp].img !== null && setup.tf.corps[corp].img !== false && setup.tf.corps[corp].img !== "none") {
      out += `<center>[img[${setup.tf.corps[corp].img}]]<br></center>`;
    }
    out += `${setup.tf.corps[corp].text}<br><div style="border-width:2px;border-style:dotted;border-color:#dfe;border-radius:12px;padding:6px 20px;">`;
    for (let index = 0; index < setup.tf.corps[corp].medicine.length; index++) {
      out += `<<button "${setup.tf.medicine[setup.tf.corps[corp].medicine[index]].shortName[corps.indexOf(corp)]}">><<run Dialog.close()>><<run setup.tf.generate("${corp}","${setup.tf.medicine[setup.tf.corps[corp].medicine[index]].key}")>><</button>> - @@.money;₢${(setup.tf.corps[corp].price + setup.tf.medicine[setup.tf.corps[corp].medicine[index]].basePrice)}@@ - ${setup.tf.medicine[setup.tf.corps[corp].medicine[index]].description}<br>`;
    }
    out += `</div>`;
    return out;
  } else {
    aw.con.warn("Corp was not found in setup.tf.list!");
    return "Corp was not found in setup.tf.list! Please report about this bug!";
  }
};

setup.tf.generate = function(corp: string, drug: string): void {
  if (setup.tf.medicine[drug] !== null && setup.tf.corps[corp] !== null) {
    let effect = `aw.L("pc");`;
    const power = setup.tf.corps[corp].effect;
    let chance = (random(0, 100) - (setup.tf.corps[corp].quality * 4));
    if (chance < 0) {chance = 0;}
    switch (drug) {
      case "EyeColorPurple":
        if (chance < 70) {
          effect += `ↂ.pc.body.eyeColor = either("purple", "magenta", "dark purple", "deep purple", "amethyst", "lavender", "raspberry", "amethyst and lavender heterochromatic");
          setup.notify("It seems the eye coloring drug worked well.");
          aw.S();`;
        } else if (chance < 90) {
          effect += `ↂ.pc.body.eyeColor = either("black", "white", "yellow and red heterochromatic", "green and raspberry heterochromatic", "purple and brown heterochromatic", "red and yellow heterochromatic");
          setup.notify("Oh, snap, eye coloring drug messed up with your iris color a lot.");
          aw.S();`;
        } else {
          effect += `ↂ.pc.body.eyeColor = "white";
          ↂ.pc.status.health -= random(5, 12);
          setup.dialog("Something is wrong...", "<center>[IMG[IMG-EyesColorSideEffect]]</center> You feel your eyes itch a lot and the skin around is swelled. You get a mirror to look at yourself and realize that instead of purple your iris gone off-white and, even worse, you realize that you lost some vision, everything got a bit blurry.<br>@@.mono;Oh, shit... what should I do now?@@");
          aw.S();
          setup.status.stress(30, "Transformative Side Effects");`;
        }
        break;
      case "EyeColorRed":
        if (chance < 70) {
          effect += `ↂ.pc.body.eyeColor = either("light red", "red", "dark red", "crimson", "carmine", "maroon", "maroon and light red heterochromatic");
          setup.notify("It seems the eye coloring drug worked well.");
          aw.S();`;
        } else if (chance < 90) {
          effect += `ↂ.pc.body.eyeColor = either("black", "white", "green and red heterochromatic", "maroon and white heterochromatic", "black and crimson heterochromatic", "red and dark red heterochromatic");
          setup.notify("Oh, snap, eye coloring drug messed up with your iris color a lot.");
          aw.S();`;
        } else {
          effect += `ↂ.pc.body.eyeColor = "white";
          ↂ.pc.status.health -= random(5, 12);
          setup.dialog("Something is wrong...", "<center>[IMG[IMG-EyesColorSideEffect]]</center> You feel your eyes itch a lot and the skin around is swelled. You get a mirror to look at yourself and realize that instead of red your iris gone off-white and, even worse, you realize that you lost some vision, everything got a bit blurry.<br>@@.mono;Oh, shit... what should I do now?@@");
          aw.S();
          setup.status.stress(30, "Transformative Side Effects");`;
        }
        break;
      case "EyeColorPink":
        if (chance < 70) {
          effect += `ↂ.pc.body.eyeColor = either("fuchsia", "pink", "dark pink", "bright pink", "hot pink", "cerise", "cerise and pink heterochromatic");
          setup.notify("It seems the eye coloring drug worked well.");
          aw.S();`;
        } else if (chance < 90) {
          effect += `ↂ.pc.body.eyeColor = either("black", "white", "pink and red heterochromatic", "green and pink heterochromatic", "fuchsia and brown heterochromatic", "black and pink heterochromatic");
          setup.notify("Oh, snap, eye coloring drug messed up with your iris color a lot.");
          aw.S();`;
        } else {
          effect += `ↂ.pc.body.eyeColor = "white";
          ↂ.pc.status.health -= random(5, 12);
          setup.dialog("Something is wrong...", "<center>[IMG[IMG-EyesColorSideEffect]]</center> You feel your eyes itch a lot and the skin around is swelled. You get a mirror to look at yourself and realize that instead of pink your iris gone off-white and, even worse, you realize that you lost some vision, everything got a bit blurry.<br>@@.mono;Oh, shit... what should I do now?@@");
          aw.S();
          setup.status.stress(30, "Transformative Side Effects");`;
        }
        break;
      case "lipEnchance1":
          if (chance < 60) {
            effect += `
            if (ↂ.pc.body.lips < 6) {ↂ.pc.body.lips++;}
            setup.notify("It seems the transformative drug worked well.");
            aw.S();`;
          } else if (chance < 70) {
            effect += `setup.notify("It seems that transformative worked and you feel sooo enthusiastic about it!");
            if (ↂ.pc.body.lips < 6) {ↂ.pc.body.lips++;}
            ↂ.pc.kink.oral = true;
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else if (chance < 90) {
            effect += `setup.notify("Oh, it seems that transformative drug gave nothing but ache and itching.");
            ↂ.pc.status.health -= random(5, 12);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.status.health -= random(5, 12);
            if (ↂ.pc.body.lips < 6) {ↂ.pc.body.lips--;}
            setup.notify("It seems that transformative drug made your lips ache a lot and made them even smaller instead of enlarging them.");
            aw.S();
            setup.status.stress(10, "Transformative Side Effects");`;
          }
        break;
      case "lipEnchance2":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.lips += 2;
            if (ↂ.pc.body.lips > 6) {ↂ.pc.body.lips = 6;}
            setup.notify("It seems the transformative drug worked well.");
            aw.S();`;
          } else if (chance < 70) {
            effect += `setup.notify("It seems that transformative worked and you feel sooo enthusiastic about it!");
            ↂ.pc.body.lips += 2;
            if (ↂ.pc.body.lips > 6) {ↂ.pc.body.lips = 6;}
            ↂ.pc.kink.oral = true;
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked but had some nasty side effects on your lower face structure.");
            ↂ.pc.body.lips += 2;
            ↂ.pc.body.jaw = either("large","wide","jutting", "masculine");
            if (ↂ.pc.body.lips > 6) {ↂ.pc.body.lips = 6;}
            ↂ.pc.status.health -= random(8, 15);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.status.health -= random(5, 12);
            if (ↂ.pc.body.lips < 6) {ↂ.pc.body.lips--;}
            setup.notify("It seems that transformative drug made your lips ache a lot and made them even smaller instead of enlarging them.");
            aw.S();
            setup.status.stress(10, "Transformative Side Effects");`;
          }
        break;
      case "jawcompact":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.jaw = "elegant";
            ↂ.pc.status.health -= random(3, 7);
            setup.notify("It seems the transformative drug worked well.");
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked but had some side effects on your lips size.");
            ↂ.pc.body.lips += 2;
            if (ↂ.pc.body.lips > 6) {ↂ.pc.body.lips = 6;}
            ↂ.pc.status.health -= random(8, 15);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.status.health -= random(5, 12);
            ↂ.pc.body.jaw = either("large","wide","jutting", "masculine");
            setup.notify("It seems that transformative drug made situation with your jawline even worse.");
            aw.S();
            setup.status.stress(30, "Transformative Side Effects");`;
          }
        break;
      case "facetype":
          if (chance < 15) {
            effect += `
            ↂ.pc.body.face = "cute";
            ↂ.pc.body.beauty++;
            ↂ.pc.status.health -= random(3, 17);
            setup.notify("It seems the transformative drug worked even better than expected. Your face form changed and it got more attractive too.");
            aw.S();`;
          } else if (chance < 70) {
            effect += `setup.notify("It seems the transformative drug worked. Your face form changed.");
            ↂ.pc.body.face = "cute";
            ↂ.pc.status.health -= random(8, 15);
            aw.S();`;
          } else {
            effect += `
            ↂ.pc.status.health -= random(5, 12);
            ↂ.pc.body.face = "cute";
            ↂ.pc.body.beauty--;
            setup.notify("It seems the transformative drug had side effects. Your face form changed but you got uglier.");
            aw.S();
            setup.status.stress(30, "Transformative Side Effects");`;
          }
        break;
      case "toneplus":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.tone ++;
            ↂ.pc.status.health -= random(1, 9);
            setup.notify("It seems the transformative drug worked well.");
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked, too well in fact!");
            ↂ.pc.body.tone += 3;
            ↂ.pc.status.health -= random(8, 15);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.body.tone --;
            ↂ.pc.body.weight ++;
            ↂ.pc.status.health -= random(8, 15);
            setup.notify("It seems that transformative drug made situation with your muscles and fat even worse...");
            aw.S();
            setup.status.stress(30, "Transformative Side Effects");`;
          }
        break;
      case "slim":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.weight--;
            ↂ.pc.status.health -= random(9, 19);
            setup.notify("It seems the transformative drug worked well.");
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked, too well in fact!");
            ↂ.pc.body.weight -= 2;
            ↂ.pc.body.tone -= 1;
            ↂ.pc.status.health -= random(13, 25);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.body.tone --;
            ↂ.pc.body.weight ++;
            ↂ.pc.status.health -= random(8, 15);
            setup.notify("It seems that transformative drug backfired...");
            aw.S();
            setup.status.stress(30, "Transformative Side Effects");`;
          }
        break;
      case "gain":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.weight++;
            ↂ.pc.status.health -= random(9, 19);
            setup.notify("It seems the transformative drug worked well.");
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked, too well in fact!");
            ↂ.pc.body.weight += 3;
            ↂ.pc.status.health -= random(13, 25);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.body.weight --;
            ↂ.pc.status.health -= random(8, 15);
            setup.notify("It seems that transformative drug backfired...");
            aw.S();
            setup.status.stress(30, "Transformative Side Effects");`;
          }
        break;
      case "perfbutt":
          if (chance < 40) {
            effect += `
            ↂ.pc.body.waist++;
            ↂ.pc.body.hips++;
            ↂ.pc.body.pelvis++;
            ↂ.pc.body.ass++;
            ↂ.pc.status.health -= random(9, 19);
            setup.notify("It seems the transformative drug worked well.");
            aw.S();`;
          } else if (chance < 60) {
            effect += `setup.notify("It seems that transformative worked, at least partially.");
            ↂ.pc.body.hips++;
            ↂ.pc.body.pelvis++;
            ↂ.pc.status.health -= random(5, 14);
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative somewhat worked.");
            ↂ.pc.body.ass++;
            ↂ.pc.body.waist++;
            ↂ.pc.status.health -= random(4, 12);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.body.waist -=2;
            ↂ.pc.body.hips--;
            ↂ.pc.body.pelvis--;
            ↂ.pc.body.ass +=2;
            ↂ.pc.status.health -= random(12, 24);
            setup.notify("It seems that transformative drug backfired hard...");
            aw.S();
            setup.status.stress(30, "Transformative Side Effects");`;
          }
        break;
        case "titgrow":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.tits.base.size += random(150, 200);
            ↂ.pc.status.health -= random(3, 15);
            if (ↂ.pc.status.milk < 4 && random(1, 2) === 2) {
              ↂ.pc.status.milk += 1;
            }
            setup.notify("It seems the transformative drug worked well.");
            setup.breastCalc();
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked, too well in fact!");
            ↂ.pc.body.tits.base.size += random(250, 500);
            ↂ.pc.status.health -= random(3, 15);
            ↂ.pc.status.milk += 2;
            setup.breastCalc();
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.body.ass += 2;
            ↂ.pc.body.tits.base.size -= random(50, 100);
            ↂ.pc.status.health -= random(8, 15);
            setup.notify("Shit, my ass grew instead of boobs!");
            setup.breastCalc();
            aw.S();
            setup.status.stress(30, "Transformative Side Effects");`;
          }
        break;
        case "heightPlus":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.height += 2;
            ↂ.pc.status.health -= random(3, 15);
            setup.notify("It seems the transformative drug worked well, your height changed.");
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked, too well in fact!");
            ↂ.pc.body.height += 4;
            ↂ.pc.status.health -= random(9, 22);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.body.height -= random(1,2);
            ↂ.pc.status.health -= random(8, 15);
            setup.notify("Shit, I lost some height instead of gaining it!");
            aw.S();
            setup.status.stress(25, "Transformative Side Effects");`;
          }
        break;
        case "heightMinus":
          if (chance < 60) {
            effect += `
            ↂ.pc.body.height -= 2;
            ↂ.pc.status.health -= random(3, 15);
            setup.notify("It seems the transformative drug worked well, your height changed.");
            aw.S();`;
          } else if (chance < 90) {
            effect += `setup.notify("It seems that transformative worked, too well in fact!");
            ↂ.pc.body.height -= 4;
            ↂ.pc.status.health -= random(9, 22);
            aw.S();
            setup.status.stress(8, "Transformative Side Effects");`;
          } else {
            effect += `
            ↂ.pc.body.height += random(2,4);
            ↂ.pc.status.health += random(8, 15);
            setup.notify("Shit, I gained some height instead of losing it!");
            aw.S();
            setup.status.stress(25, "Transformative Side Effects");`;
          }
        break;
      default:
        break;
    }
    const time = random(600,800);
    const corps = ["elitref", "pliant", "genomics", "succulence", "slimogen", "xiee", "queerist"];
    let omni = {
      name: `${setup.tf.medicine[drug].shortName[corps.indexOf(corp)]}`,
      type: "single",
      output: "notify",
      duration: time,
    icon: "IMGstatus_Drug",
      text: "You feel the transformative drug working.",
      run: `${effect}`,
    } as IntOmniData;
    const scene = {
      passage: "none",
      content: `<<= either("Young", "Middle-aged")>> nurse dressed in ${setup.tf.corps[corp].name} lab coat welcomes you to the <<= either("off-white room", "comfortable-looking room", "luxurious room")>> and asks you to sit on <<= either("the comfortable recliner", "the stool", "the modern-looking sofa")>>.<br><br>@@.npc;Please wait, doctor will see you soon.@@<br><br>After <<= either("about ten minutes", "five minutes", "a minute")>> door opens and <<= either("a bearded middle-aged man", "pretty young woman in glasses", "bald man a bit older than you", "elder lady")>> comes in. <<= either("Without much talking", "After a little chit-chat", "After explaining the procedure")>> doctor starts the process of generating the drug using the slate, obviously connected to the large white machine. While it <<= either("produces humming sounds", "make odd noises and clacking")>> nurse applies the intradermal catheter to your arm. The machine stops with a soft chime and doctor opens the chamber to get a vial of the transformative. After placing it in the catheter and pressing the release button doc gives a quick glance to see your body reaction to the drug. You feel a little tickling feeling inside your vein while the content of the vial injects, but the feeling subsides quickly.<br><br>@@.npc;How are you feeling? Good. Now the ${setup.tf.medicine[drug].shortName[corps.indexOf(corp)]} is applied, it will start working within the 24 hours. Please abstain from alcohol and any drugs until the process will finish. You can pay at the reception. Thank you for choosing "${setup.tf.corps[corp].name}"!@@<br><br>@@.pc;Any possible side-effects I should be aware of?@@<br><br>@@.npc;No, not at all! The success rate is extremely high and we await no side effects!@@<br><br><<button "Pay and leave">><<sceneclose>><</button>>`,
      image: "IMG-TransformativeScene",
      topImage: "IMG-ArborVitaeBanner",
      title: "Transformative drug",
      allowSave: false,
      sidebar: `<h2>Private practice</h2><h3>${setup.tf.corps[corp].name}</h3>`,
      showTime: false,
      allowMenu: false,
    };
    Dialog.close();
    setup.scenario.launch(scene);
    setup.omni.new(omni);
    const cash = ((random (1, 9) + (setup.tf.corps[corp].price + setup.tf.medicine[drug].basePrice)) * -1);
    aw.cash(cash, "medical");
    aw.S();
  } else {
    aw.con.warn(`Error in setup.tf.generate! Corp: ${corp}, Drug: ${drug}`);
  }
};

// DATA!

setup.tf.corps = {
  elitref: {
    name: "Eli-tref",
    text: `You enter Eli-tref office and the older man at the reception welcomes you. He asks about what kind of treatment you want. [PLACEHOLDER]`,
    img: "IMG-EliTref", // or "none"
    quality: 9, // 1 to 10
    effect: 2, // 0 to 3
    price: 30, // price modificator
    medicine: ["lipEnchance1", "lipEnchance2", "EyeColorRed", "EyeColorPink", "EyeColorPurple", "slim", "gain", "titgrow", "heightMinus"], // what types of transformatives company sells
    sideEffects: [], // uniqie and favorite side effects for the tf drugs of the company
  },
  pliant: {
    name: "Pliant Pharma",
    text: `You enter Eli-tref office and the older man at the reception welcomes you. He asks about what kind of treatment you want. [PLACEHOLDER]`,
    img: "IMG-PliantPharma",
    quality: 3,
    effect: 3,
    price: 17,
    medicine: ["lipEnchance2", "perfbutt", "toneplus", "facetype", "jawcompact", "heightPlus"],
    sideEffects: [],
  },
  genomics: {
    name: "Genomics",
    text: `You enter Eli-tref office and the older man at the reception welcomes you. He asks about what kind of treatment you want. [PLACEHOLDER]`,
    img: "IMG-Genomics",
    quality: 8,
    effect: 3,
    price: 45,
    medicine: ["lipEnchance1", "facetype", "jawcompact", "EyeColorPink", "EyeColorRed", "perfbutt", "heightPlus", "heightMinus"],
    sideEffects: [],
  },
  succulence: {
    name: "Succulence",
    text: `You enter Eli-tref office and the older man at the reception welcomes you. He asks about what kind of treatment you want. [PLACEHOLDER]`,
    img: "IMG-Succulence",
    quality: 4,
    effect: 2,
    price: 30,
    medicine: ["lipEnchance1", "lipEnchance2"],
    sideEffects: [],
  },
  slimogen: {
    name: "Slimogen Bio",
    text: `You enter Eli-tref office and the older man at the reception welcomes you. He asks about what kind of treatment you want. [PLACEHOLDER]`,
    img: "IMG-EliTref",
    quality: 6,
    effect: 3,
    price: 35,
    medicine: ["lipEnchance1", "lipEnchance2", "slim", "gain", "titgrow", "jawcompact", "gain", "heightMinus"],
    sideEffects: [],
  },
  xiee: {
    name: "Xiee China",
    text: `You enter Eli-tref office and the older man at the reception welcomes you. He asks about what kind of treatment you want. [PLACEHOLDER]`,
    img: "IMG-XieeChina",
    quality: 1,
    effect: 0,
    price: 3,
    medicine: ["perfbutt", "gain", "slim", "titgrow", "toneplus", "lipEnchance2", "EyeColorPurple", "facetype"],
    sideEffects: [],
  },
  queerist: {
    name: "Queerist Russia",
    text: `You enter Eli-tref office and the older man at the reception welcomes you. He asks about what kind of treatment you want. [PLACEHOLDER]`,
    img: "IMG-QueeristRussia",
    quality: 2,
    effect: 3,
    price: 5,
    medicine: ["jawcompact", "facetype", "toneplus", "titgrow", "perfbutt", "slim", "EyeColorPink", "lipEnchance1", "heightPlus", "heightMinus"],
    sideEffects: [],
  },
};

setup.tf.medicine = {
  EyeColorPurple: {
    key: "EyeColorPurple",
    shortName: ["SeeThrough Violet", "Purple E.Y.E.", "Colorizer Ultra Purplish", "EyeRainbow Glow", "X5163", "Besteyes-Hotpurple", "Fioletovaya Charovnitca"], // EliTref, PliantPharma, Genomics, Succulence, SlimogenBio, XieeChina, QueeristRussia
    description: "Changes the user's eye color to various shade of purple. The precise result is hardly predictable at current tech level.",
    basePrice: 30,
  },
  EyeColorRed: {
    key: "EyeColorRed",
    shortName: ["SeeThrough Red", "Crimson E.Y.E.", "Colorizer Ultra Red", "EyeRainbow Hot", "X5165", "Besteyes-Hotred", "Alaya Charovnitca"],
    description: "Changes the user's eye color to various shade of red. The precise result is hardly predictable at current tech level.",
    basePrice: 30,
  },
  EyeColorPink: {
    key: "EyeColorPink",
    shortName: ["SeeThrough Pink", "Bimbo E.Y.E.", "Colorizer Ultra Pink", "EyeRainbow Heat", "X5161", "Besteyes-Hotpink", "Rozovaya Charovnitca"],
    description: "Changes the user's eye color to various shade of pink. The precise result is hardly predictable at current tech level.",
    basePrice: 30,
  },
  lipEnchance1: {
    key: "lipEnchance1",
    shortName: ["Lip-works", "KissBooster", "PrettyLips", "Kisser MKI", "X4382", "Sugar hug", "Guboshlep-47"],
    description: "A drug focused on user's lips volume and puffiness.",
    basePrice: 30,
  },
  lipEnchance2: {
    key: "lipEnchance2",
    shortName: ["Lip-works XTRA", "KissBooster+", "PrettiestLips", "Kisser MKII", "X4378", "Sugar hug+", "Guboshlep-74"],
    description: "More potent serum focused on user's lips volume and puffiness. Testing shown less side effects and better results.",
    basePrice: 45,
  },
  jawcompact: {
    key: "jawcompact",
    shortName: ["Jaw-compact", "Jaws+", "PrettyFace/J", "MouthWorks", "X8392", "Sugar jaw", "Chelusti alpha"],
    description: "The purpose of this transformative is to give the user more feminine and elegant jawline.",
    basePrice: 75,
  },
  facetype: {
    key: "facetype",
    shortName: ["Cutie+", "Nextdoor Faceworks", "PrettyFace/F", "A.W.W.W", "X1853", "Cutifier", "Super Mordashka"],
    description: "Made for changing the face type towards more cute appearance.",
    basePrice: 95,
  },
  toneplus: {
    key: "toneplus",
    shortName: ["Gain+", "GymPro", "Bodytone/G", "Muscle Works", "X9936", "Work/out", "Fito-nyasha"],
    description: "Workout-free way to gain muscle mass.",
    basePrice: 65,
  },
  slim: {
    key: "slim",
    shortName: ["EasySlim", "Weightless", "Bodytone/S", "Slim Works", "X1337", "Fat/out", "Glista-3000"],
    description: "Weight control drug which helps to lower your body mass.",
    basePrice: 85,
  },
  gain: {
    key: "gain",
    shortName: ["EasyFat", "O.B.E.S.E", "Bodytone/F", "Fat Works", "X1338", "Slim/out", "Jirobas"],
    description: "Drug intended to slow down the metabolism and get some body mass.",
    basePrice: 65,
  },
  perfbutt: {
    key: "perfbutt",
    shortName: ["Perfect Butt", "Bootymax", "Bodytone/B", "Butt Works", "X1616", "Butt+", "Popetc"],
    description: "Complex transformative affecting waist, hips, glutens and pelvic girdle in order to create more desirable lower part.",
    basePrice: 165,
  },
  titgrow: {
    key: "titgrow",
    shortName: ["Size+", "Breastmax", "Bodytone/T", "Boobs Works", "X1516", "Tits++", "Korovyaka-34"],
    description: "Non-surgery solution for growing breast size. About 200cc per injection.",
    basePrice: 80,
  },
  heightPlus: {
    key: "heightPlus",
    shortName: ["Giantesse", "HeightMax", "Bodyheight/Up", "Height Works", "X1631", "Height++", "Loshyad-55"],
    description: "Height grow inducing drug. Estimated results are about +5% of previous height.",
    basePrice: 120,
  },
  heightMinus: {
    key: "heightMinus",
    shortName: ["Loliheight", "HeightMin", "Bodyheight/Down", "Midget Works", "X1639", "Height--", "Gnomik-15"],
    description: "Height shrinkage drug. Estimated results are about -5% of previous height.",
    basePrice: 140,
  },
};

setup.tf.sideEffects = {

};