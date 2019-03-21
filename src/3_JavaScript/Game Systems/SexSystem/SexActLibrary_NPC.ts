/**********************************************************/
/*  ██╗     ██╗██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗  */
/*  ██║     ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝  */
/*  ██║     ██║██████╔╝██████╔╝███████║██████╔╝ ╚████╔╝   */
/*  ██║     ██║██╔══██╗██╔══██╗██╔══██║██╔══██╗  ╚██╔╝    */
/*  ███████╗██║██████╔╝██║  ██║██║  ██║██║  ██║   ██║     */
/*  ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝     */
/*                                                        */
/*               ╔═╗┌─┐─┐ ┬╔═╗┌─┐┌┬┐┌─┐                   */
/*               ╚═╗├┤ ┌┴┬┘╠═╣│   │ └─┐                   */
/*               ╚═╝└─┘┴ └─╩ ╩└─┘ ┴ └─┘                   */
/* This is the sex act library. Rather than store output  */
/* text in sexActN objects, I decided it would be better   */
/* to reduce memory usage by storing them in object       */
/* literals that can be sent to storage. They are looked  */
/* up using property keys, which is far faster than logic */
/* This will improve performance, and also keep descrip-  */
/* tive text in the same place.                           */
/*--------------------------------------------------------*/
/* TERMS:  book(action/position), chapter (situation),    */
/*         page (specific text in array).                 */
/* SAVED:  setup.library.sexActN.book.chapter[page]        */
/* CALL:   setup.library.callSexActN(book,chapter,[page]). */
/* INIT:   setup.library.initSA() - loads variables       */
/* KILL:   setup.library.killSA() - deletes variables     */
/**********************************************************/
// check namespace
if (setup.library === null || setup.library === undefined) {
  setup.library = {} as setupLibrary;
}
// function to retrieve text from library
setup.library.callSexActN = function(book: string, chapter: string, page: string|-1 = -1, chapArray: 0|any[] = 0): string {
  // first check to make sure the entry exists
  try {
    if (setup.library.sexActN == null || "object" !== typeof setup.library.sexActN) {
      aw.con.warn(`Library lookup failed, sexActN library isn't initialized.`);
      return "error";
    } else if (setup.library.sexActN[book] == null || "object" !== typeof setup.library.sexActN[book]) {
      aw.con.warn(`Library lookup failed, couldn't find ${book} in sexActNs.`);
      return "error";
    } else if (setup.library.sexActN[book][chapter] == null || (!Array.isArray(setup.library.sexActN[book][chapter]) && "function" !== typeof setup.library.sexActN[book][chapter])) {
      if (Array.isArray(chapArray)) {
        let good = false;
        const c = chapArray.length;
        for (let i = 0; i < c; i++) {
          if (setup.library.sexActN[book][chapArray[i]] != null && Array.isArray(setup.library.sexActN[book][chapArray[i]])) {
            chapter = chapArray[i];
            good = true;
            break;
          }
        }
        if (!good) {
          setup.alert(`Library lookup couldn't find ${chapter} in sexActN book ${book}, and none of ${c} alternates could be found. Defaulted to standard.`);
          chapter = "standard"; // this is so that we can default to standard description
        }
      } else {
        setup.alert(`Library lookup couldn't find ${chapter} in sexActN book ${book}, defaulting to standard (no alternates given).`);
        chapter = "standard"; // this is so that we can default to standard description
      }
    }
  } catch (e) {
    setup.alert(`Something unfathomable happened with the library, wtf! ${e.name}: ${e.message}.`);
  }
  // Sanity protection: check against primary content restrictors to force-block text just in case.
  // $noForce $noViolent $noExtreme
  if (State.active.variables.noForce) {
    const censored = ["noncon", "connoncon", "force", "rape"];
    if (censored.includes(chapter)) {
      chapter = "standard";
    }
  }
  if (State.active.variables.noViolent) {
    const censored = ["violent", "rape", "angry", "masochist", "sadist", "pain"];
    if (censored.includes(chapter)) {
      chapter = "standard";
    }
  }
  if (State.active.variables.noExtreme) { // the most pansy of them all, it's a whitelist
    const allowed = ["standard", "lesbian", "public", "vanilla"];
    if (!allowed.includes(chapter)) {
      chapter = "standard";
    }
  }
  if ("function" === typeof setup.library.sexActN[book][chapter]) {
    return setup.library.sexActN[book][chapter]();
  }
  // Check value of page. normally -1 to randomize, but could request a specific page as index
  if (page !== -1 && setup.library.sexActN[book][chapter][page] != null) {
    return setup.library.sexActN[book][chapter][page];
  } else {
    const i = random(0, (setup.library.sexActN[book][chapter].length - 1));
    return setup.library.sexActN[book][chapter][i];
  }
};
// deletes the library, freeing memory. The library doesn't change, so doesn't need to be stored
setup.library.killSAN = function(): void {
  setup.library.sexActN = null;
};
// loads the library object.
setup.library.initSAN = function() {
  const ᛔ = State.active.variables;
  /********************************************/
  //  ┌─┐┌┬┐┌─┐┬─┐┌┬┐
  //  └─┐ │ ├─┤├┬┘ │
  //  └─┘ ┴ ┴ ┴┴└─ ┴
  /********************************************/
  setup.library.sexActN = {
    exampleAct: {
      standard: [
        `This is a standard example action that doesn't really mean anything.`,
        `This is the second example showing how template literals allow
        you to break text in fun ways and insert variables like ${ↂ.pc.body.tits.size} randomly.`,
        `you can even do calculation: 2 * 2 * 2 = ${2 * 2 * 2} cool!`,
      ],
      lesbian: [
        "this is an example of the lesbian description for the example action.",
        "this text can include SugarCube macros like so: <<clitSize>>",
        "and things like <br> or other html.",
      ],
      public: [
        "each 'chapter' can have as many variations as necessary or desireable.",
      ],
      openPublic: "or none",
      nonCon: [
        "the sex scene system looks for relevant chapters for an action or position.",
        "Then it sends them to the function to try in order of priority.",
        "If there aren't any, it defaults to the standard.",
      ],
      threesome: [
        "The 'Standard' chapter must have at least 1 page. Otherwise, the number and order doesn't matter.",
      ],
      get romantic() {
        return "Or you can even put in a function instead for more custom control!";
      },
    },
    strokeHair: {
      standard: [
        `<<= ↂ.T.main.name>> lifts up a hand, placing it lightly on the side of your head. <<n _t "hisher.q">> fingers drift through the <<p hairl.q>> strands of your <<p haircolor.q>> hair, feeling down your <<p haircurl.q>> locks with surprisingly gentleness. Soon, you can feel <<n _t "hisher.q">> fingertips tracing delicate paths against your scrap, the sensation sending a pleasant tingle through your body.`,
      ],
    },
    cupAss: {
      standard: [
        `The writer didn't complete this action (NPC grabbing your ass)... So this will be fixed soon.`,
      ],
    },
    slowDown: {
      standard: [
        ``,
      ],
    },
    speedUp: {
      standard: [
        ``,
      ],
    },
    rubVulvaOutside: {
      standard: [
        `The writer didn't complete this action (NPC rubbing your cunt)... So this will be fixed soon.`,
      ],
    },
    playWnipples: {
      standard: [
        `The writer didn't complete this action (NPC playing with your nipples)... So this will be fixed soon.`,
      ],
    },
    heftBreasts: {
      standard: [
        `The writer didn't complete this action (NPC playing with your boobs)... So this will be fixed soon.`,
      ],
    },
    strokeClit: {
      standard: [
        `The writer didn't complete this action (NPC stroking your clit with <<n _t "hisher.q">> hand)... So this will be fixed soon.`,
      ],
    },
    rubInsideVulva: {
      standard: [
        `The writer didn't complete this action (NPC rubbing your cunt)... So this will be fixed soon.`,
      ],
    },
    passionateKiss: {
      standard: [
        `Passionate intensity in <<n _t "hisher.q">> eyes, <<= ↂ.T.main.name>> takes hold of your waist and pulls you in close, the sudden motion towards him causing you to gasp. Before you can even recover your composure, he's moving in, <<n _t "hisher.q">> face close to yours and a playful glint in <<n _t "hisher.q">> look. And then he's kissing you. The forceful thrust of <<n _t "hisher.q">> lips against yours sends your mind reeling, and it takes you a moment to start kissing him back, trying your best to match <<n _t "hisher.q">> intensity. You feel a sudden pain as <<= ↂ.T.main.name>> gives one of your lips a sudden light bite. Releasing your lip and pulling away slightly, <<n _t "heshe.q">> glances at you, wanting to see your reaction to the unexpected nibble. You respond by grabbing the back of <<n _t "hisher.q">> neck and pulling him back in again, the smack of your lips as you frantically make out filling the air.`,
      ],
    },
    kiss: {
      standard: [
        `For a quick moment, you both pause and glance at one another. You can see the intent in <<n _t "hisher.q">> <<= ↂ.T.body.eyeColor>> eyes, and you lean your head slightly in anticipation of <<n _t "hisher.q">> moving close. <<= ↂ.T.main.name>> leans in, planting a light kiss on your lips. It lasts for less than a second, but when <<n _t "heshe.q">> pulls away both you and <<n _t "heshe.q">> smile at each other.`,
      ],
    },
    neckEar: {
      standard: [
        `With a gentle touch, <<n _t "heshe.q">> places <<n _t "hisher.q">> thumb and index finger on your chin, turning your head to the side and exposing your neck. Leaning in slowly, <<n _t "heshe.q">> takes <<n _t "hisher.q">> time as <<n _t "heshe.q">> begins placing soft kisses all along your neck. You can hear the soft wet pop of <<n _t "hisher.q">> lips with each press against your exposed neck-flesh, the feeling of <<n _t "hisher.q">> warm kisses sending a sensual buzz through your entire body. After a few seconds, you can feel him moving up, <<n _t "hisher.q">> mouth finding your ear and placing more kisses along the sensitive lobe. <<= ↂ.T.main.name>> lovingly continues <<n _t "hisher.q">> oral worship of you, placing so many kisses along your neck and ear that it takes all of your inner reserve not to completely lose yourself to <<n _t "hisher.q">> passionate foreplay.`,
      ],
    },
    exploreVulva: {
      standard: [
        `The writer didn't complete this action (NPC exploring your vulva with <<n _t "hisher.q">> tongue)... So this will be fixed soon.`,
      ],
    },
    suckNipple: {
      standard: [
        `The writer didn't complete this action (NPC sucking on your nipple/s)... So this will be fixed soon.`,
      ],
    },
    strokeClitTongue: {
      standard: [
        `The writer didn't complete this action (NPC stroking up and down your slit with <<n _t "hisher.q">> tongue)... So this will be fixed soon.`,
      ],
    },
    suckClit: {
      standard: [
        `He moves between your legs now, <<= ↂ.T.body.eyeColor>> eyes focused intently on your <<p "vulva.n">>. Moving <<n _t "hisher.q">> lips like waves that crash and smack against your <<p clit.s>> <<p clit.n>>, <<n _t "hisher.q">> open jaw shuts and lips pucker as <<n _t "heshe.q">> eagerly services the sensitive nub of flesh. You moan and gasp as <<n _t "heshe.q">> works feverishly between your legs, the tip of <<n _t "hisher.q">> tongue doing a sinfully intoxicating dance against your most erogenous zone and sending your mind reeling from the waves of intense pleasure that <<n _t "heshe.q">> is delivering with each flick. You press yourself forward, hips moving intently against <<n _t "hisher.q">> hungry mouth, <<p "vulva.n">> dripping and leaving wet glistening streaks on <<= ↂ.T.main.name>>'s chin as <<n _t "heshe.q">> passionately pleasure your pussy. If <<n _t "heshe.q">> keeps going like this, you know for certain, it won't be long until you'll find yourself cumming all over <<n _t "hisher.q">> face.`,
      ],
    },
    tongueClit: {
      standard: [
        `The writer didn't complete this action (NPC focusing on your clit with <<n _t "hisher.q">> tongue)... So this will be fixed soon.`,
      ],
    },
    fingerPussy: {
      standard: [
        `The writer didn't complete this action (NPC focusing on your clit with <<n _t "hisher.q">> tongue)... So this will be fixed soon.`,
      ],
    },
    strokeCock: {
      standard: [
        `Taking hold of <<n _t "hisher.q">> <<n _t "cockgirth.q">> <<n _t "cock.n">>, <<= ↂ.T.main.name>> begins working <<n _t "hisher.q">> hand up and down the <<n _t "cock.n">>. <<n _t "hisher.q">> <<= ↂ.T.body.eyeColor>> eyes remained focused on you, roaming every inch of your naked body with a look of passionate hunger. No doubt <<n _t "heshe.q">> is imagining all the things <<n _t "heshe.q">> is planning to do with that body as <<n _t "heshe.q">> works <<n _t "hisher.q">> fingers back and forth along <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>.`,
      ],
    },
    huggies: {
      standard: [
        `<<= ↂ.T.main.name>> opens <<n _t "hisher.q">> arms wide, moving in close and enfolding you in <<n _t "hisher.q">> embrace. You relax in <<n _t "hisher.q">> gentle embrace, wrapping your own arms around him and leaning in close to feel the warmth of <<n _t "hisher.q">> body against yours. <<n _t "heshe.q">> squeezes you tightly, and you sigh as you enjoy the feeling of your lover's arms around you.`,
      ],
    },
    complementBody: {
      standard: [
        `@@.npc;God, I love your <<p breasts.n>>. <<if ↂ.pc.body.tits.cupNum > 18>>I just want to bury my face between them.<<else>>I just want to lick every last inch of them.<</if>>@@`,
        `@@.npc;You look so sexy tonight, <<= ↂ.pc.main.name>>. Wish I could see you like this all the time: not a stitch of clothing on that <<n _t "tone.q">> body.@@`,
        `@@.npc;You know how hard it is to control myself around you, <<= ↂ.pc.main.name>>? You drive me crazy with that <<n _t "tone.q">> body.@@`,
        `@@.npc;Mmm, turn around, baby. Let me get a look at that ass.@@`,
      ],
    },
    putOnCondom: {
      standard: [
        `<<= ↂ.T.main.name>> undoes the wrapping of the condom, tearing along the serrated edge with <<n _t "hisher.q">> fingernails. Removing the condom itself from the packet, <<n _t "heshe.q">> begins to unroll it slightly over <<n _t "hisher.q">> index finger. Taking the condom and placing it against the <<n _t "cockhead.n">> of <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">>, <<n _t "heshe.q">> starts to roll the latex over <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. The lubed surface gives a slightly pleasant sensation as it rolls back over <<n _t "hisher.q">> cock and lubricates <<n _t "hisher.q">> <<n _t "cock.n">> down to the base near <<n _t "hisher.q">> <<n _t "balls.n">>. <<n _t "heshe.q">> rolls <<n _t "hisher.q">> fingers across it a few times, ensuring it’s securely placed over <<n _t "hisher.q">> <<n _t "cock.n">>.`,
      ],
    },
    denyProtectionRequest: {
      standard: [
        `@@.npc;Don’t worry, I can pull out.@@ <<= ↂ.T.main.name>> doesn't put on a condom...`,
        `@@.npc;I'll be careful, <<= ↂ.pc.main.name>>.@@ <<= ↂ.T.main.name>> doesn't put on a condom...`,
        `@@.npc;I promise I won't cum inside you.@@ <<= ↂ.T.main.name>> doesn't put on a condom...`,
        `<<= ↂ.T.main.name>> thinks about it for only a moment before answering. <span class="npc">No thanks. Just relax, we don't need to worry about that kind of thing right now.</span>`,
      ],
    },
    refuseCondomRemoval: {
      standard: [
        `<<= ↂ.T.main.name>> stops you from removing the condom. @@.npc;I don’t want to get you pregnant.@@`,
        `<<= ↂ.T.main.name>> stops you from removing the condom. @@.npc;Let's not risk it, <<= ↂ.pc.main.name>>.@@`,
        `<<= ↂ.T.main.name>> stops you from removing the condom. @@.npc;Maybe next time, baby. We'll play it safe for now.@@`,
        `<<= ↂ.T.main.name>> stops you from removing the condom. @@.npc;I want to, <<= ↂ.pc.main.name>>, but it's too risky.@@`,
        `<<= ↂ.T.main.name>> realizes what you're doing and stops you. <span class="npc">Hey, what are you doing? I think I'll keep this on, thank you.</span>`,
      ],
    },
    pullOffCondom: {
      standard: [
        `Gripping the tip of the condom, <<n _t "heshe.q">> begins to pinch the latex around <<n _t "hisher.q">> <<n _t "cockhead.n">>. The condom has become a bit airtight around <<n _t "hisher.q">> <<n _t "cock.n">> due to <<n _t "hisher.q">> excessive insertions into your <<p vulva.n>>, which have in turn pushed out any air and condensed the plastic so it remains fastened to <<n _t "hisher.q">> erection. While waiting to become flaccid would probably be simpler, <<n _t "heshe.q">> opts to instead take the fold of the condom and let air back inside. With a simple tug of <<n _t "hisher.q">> wrist, the condom has been removed from <<n _t "hisher.q">> <<n _t "cock.n">> and <<n _t "heshe.q">> flings it in your direction.`,
      ],
    },
    condomBreakEvent: {
      standard: [
        `While you and <<= ↂ.T.main.name>> continue your passionate lovemaking, you see a change come over your partner's expression. A look of contented release come over him, while at the same time the feeling of <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">> in your <<p "vulva.n">> takes on a slightly different feeling. Is it your imagination, or does <<n _t "heshe.q">> feel hotter inside of you? More... unconstricted? You wonder if maybe the protective sheath around <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">> might have broken somehow in the midst of your heated fucking. You try to catch <<n _t "hisher.q">> eye to confirm your suspicion, but <<= ↂ.T.main.name>> is too lost in <<n _t "hisher.q">> passion to stop.`,
      ],
    },
    fuckThrustText: {
      standard: [
        `<<= ↂ.T.main.name>>'s thrusts into you are slow and sensuous. <<n _t "heshe.q">> takes <<n _t "hisher.q">> time to enjoy the feel of making love to you: first sliding out every inch of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> until just the very tip of <<n _t "hisher.q">> <<n _t "cockhead.n">> teasingly rests between your pussy lips, before pressing <<n _t "hisher.q">> hips slowly forward and burying himself to the hilt inside of your wet, horny <<p "vulva.n">>. You can hear the slow, heated sound of <<n _t "hisher.q">> breathing as <<n _t "heshe.q">> gently fucks you, <<n _t "hisher.q">> <<n _t "cock.n">> softly rubbing around inside of you and stroking against your sensitive inner walls with every thrust.`,
        `<<= ↂ.T.main.name>>'s <<n _t "cock.s">> <<n _t "cock.n">> begins pounding a steady rhythm into your <<p "vulva.n">>, your body quivering and shaking with each hard thrust between your legs. You clench your fists and moan as <<n _t "heshe.q">> begins fucking you in earnest, <<if ↂ.T.body.cock.length > 64 || ↂ.T.body.cock.girth > 17>><<n _t "cock.q">> <<n _t "cock.n">> stretching you open wider than you'd ever been before as <<n _t "heshe.q">> thrusts <<n _t "hisher.q">> impressive manhood deep into your <<p vulva.n>><<else>>his <<n _t "cock.n">> forcing the wet <<p labia.n>> of your <<p "vulva.n">> open and burying itself balls-deep inside of you again and again<</if>>. The air is filled with the sound of your strained, heated moans, along with the wet slap of sweaty flesh against sweaty flesh as <<= ↂ.T.main.name>> slowly increases the pace of <<n _t "hisher.q">> thrusts, <<n _t "hisher.q">> <<n _t "balls.n">> bouncing against your body as <<n _t "heshe.q">> forcefully fucks you.`,
        `The passion has overwhelmed him now, and <<= ↂ.T.main.name>>'s <<n _t "cock.s">> <<n _t "cock.n">> is attacking your <<p "vulva.n">> with a surprising ferocity. You can't hold back your cries of passion, as <<n _t "hisher.q">> hard and frantic thrusts rock your body and send ferocious jolts of sensation straight from your dripping <<p vulva.n>> right to the carnal center of your brain. You know that you'll be walking funny for a day after this is all over, with how roughly <<= ↂ.T.main.name>> is taking you, but none of that matters right now. All that matters is the feel of that <<n _t "cock.q">> <<n _t "cock.n">> taking your <<p "vulva.n">> over and over again. Conquering it, making it belong to <<= ↂ.T.main.name>>. Even through your own desperate moans, you can hear the rapid-fire rhythm of <<n _t "hisher.q">> hips and yours wetly slapping together, sweat dripping from both of your bodies at the force of the savage fucking taking place. Down between your legs, you can feel the impact of <<n _t "hisher.q">> <<n _t "balls.q">> <<n _t "balls.n">> against your skin. If <<n _t "heshe.q">> keeps this up, <<if ↂ.sex.npcBC[0].condom.worn>>it won't be long until he's going to be emptying those <<n _t "balls.n">> into the condom he's wearing, leaving it full of <<n _t "hisher.q">> hot <<n _t "cum.n">>.<<else>>it won't be long before <<n _t "heshe.q">> empties those balls directly into your <<p "pussy.n">>, filling you up with every last drop of <<n _t "hisher.q">> hot <<n _t "cum.n">> and leaving you gaping and dripping with <<n _t "hisher.q">> <<n _t "cum.n">>.<</if>>`,
      ],
    },
  };
  aw.con.info("Sex Act NPC Library loaded.");
};
