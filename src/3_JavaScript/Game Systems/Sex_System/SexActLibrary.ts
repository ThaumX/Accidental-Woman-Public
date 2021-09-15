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
/* text in SexAct objects, I decided it would be better   */
/* to reduce memory usage by storing them in object       */
/* literals that can be sent to storage. They are looked  */
/* up using property keys, which is far faster than logic */
/* This will improve performance, and also keep descrip-  */
/* tive text in the same place.                           */
/*--------------------------------------------------------*/
/* TERMS:  book(action/position), chapter (situation),    */
/*         page (specific text in array).                 */
/* SAVED:  setup.library.sexact.book.chapter[page]        */
/* CALL:   setup.library.callSexAct(book,chapter,[page]). */
/* INIT:   setup.library.initSA() - loads variables       */
/* KILL:   setup.library.killSA() - deletes variables     */
/**********************************************************/
// check namespace
if (setup.library === null || setup.library === undefined) {
  setup.library = {} as setupLibrary;
}
if (aw.SAL == null) {
  aw.SAL = {};
}
// function to retrieve text from library
setup.library.callSexAct = function(book: string, chapter: string, page: string | -1 = -1, chapArray: 0 | any[] = 0): string {
  // first check to make sure the entry exists
  try {
    if (setup.library.sexact == null || "object" !== typeof setup.library.sexact) {
      aw.con.warn(`Library lookup failed, sexact library isn't initialized.`);
      return "error";
    } else if (setup.library.sexact[book] == null || "object" !== typeof setup.library.sexact[book]) {
      if (aw.SAL[book] != null && "object" === typeof aw.SAL[book]) {
        // has mod library book
        return setup.library.callModSexAct(book, chapter);
      } else {
        aw.con.warn(`Library lookup failed, couldn't find ${book} in sexacts.`);
        return "error";
      }
    } else if (setup.library.sexact[book][chapter] == null || (!Array.isArray(setup.library.sexact[book][chapter]) && "function" !== typeof setup.library.sexact[book][chapter])) {
      if (Array.isArray(chapArray)) {
        let good = false;
        const c = chapArray.length;
        for (let i = 0; i < c; i++) {
          if (setup.library.sexact[book][chapArray[i]] != null && Array.isArray(setup.library.sexact[book][chapArray[i]])) {
            chapter = chapArray[i];
            good = true;
            break;
          }
        }
        if (!good) {
          setup.alert(`Library lookup couldn't find ${chapter} in sexact book ${book}, and none of ${c} alternates could be found. Defaulted to standard.`);
          chapter = "standard"; // this is so that we can default to standard description
        }
      } else {
        setup.alert(`Library lookup couldn't find ${chapter} in sexact book ${book}, defaulting to standard (no alternates given).`);
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
  if ("function" === typeof setup.library.sexact[book][chapter]) {
    return setup.library.sexact[book][chapter]();
  }
  // Check value of page. normally -1 to randomize, but could request a specific page as index
  if (page !== -1 && setup.library.sexact[book][chapter][page] != null) {
    return setup.library.sexact[book][chapter][page];
  } else {
    const i = random(0, (setup.library.sexact[book][chapter].length - 1));
    return setup.library.sexact[book][chapter][i];
  }
};

// retrieves text from mod sexact
setup.library.callModSexAct = function(book: string, chapter: string) {
  try {
    if (aw.SAL[book][chapter] == null || aw.SAL[book][chapter] === "none") {
      chapter = "standard";
    }
    const i = random(0, (aw.SAL[book][chapter].length - 1));
    return setup.library.sexact[book][chapter][i];
  } catch (e) {
    return `Error retrieving mod sex action text - ${e.name}: ${e.message}`;
  }
};

// deletes the library, freeing memory. The library doesn't change, so doesn't need to be stored
setup.library.killSA = function() {
  setup.library.sexact = null;
};
// loads the library object.
setup.library.initSA = function() {
  const ᛔ = State.active.variables;
  /********************************************/
  //  ┌─┐┌┬┐┌─┐┬─┐┌┬┐
  //  └─┐ │ ├─┤├┬┘ │
  //  └─┘ ┴ ┴ ┴┴└─ ┴
  /********************************************/
  setup.library.sexact = {

    // Examples
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
        "each 'chapter' can have as many variations as necessary or desirable.",
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
    thatsEnough: {
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
        "each 'chapter' can have as many variations as necessary or desirable.",
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
    testing: {
      standard: [
        `This was a testing action that you <i>probably</i> shouldn't be able to see...`,
      ],
    },

    // Scenes properly
    rubMaleChest: {
      standard: [
        `Your hands make their way to <<= ↂ.T.main.name>>’s <<n _t "chest.n">>, fingertips lightly tracing against the <<n _t "skincolor.q">> skin as your hand explores further. <<n _t "nipples.n">> make themselves known to your roving touch, and a few moments pass as you give them some extra attention from your questing fingers. Moving onward, your motions become more insistent; soft fingertips replaced by the firm press of hands that express a growing need upon the <<if ↂ.T.body.muscle > 3 && ↂ.T.body.fat < 5>>firm<<elseif ↂ.T.body.fat >= 5>>flabby<<else>>smooth<</if>> flesh.`,
        `Your hands roam <<= ↂ.T.main.name>>’s <<n _t "chest.n">>, you feel the body heat that emanates from him increasing by the second. The skin on <<his>> body is smooth, the hair on <<his>> chest is rough and emanates <<his>> masculine odor. Every second you feel your body heat increase thanks to the intimate contact, you feel <<his>> attention totally turned to your body.`,
        `You allow your hands to roam <<his>> chest, feeling partly the smooth skin and partly the hair on Name's body, you then reach <<= ↂ.T.main.name>>'s nipples and feel that they are hard, as hard as your nipples. <<his>> nipples are not the only hard part though, just below <<his>> <<n _t "cock.n">> is erect like steel. Realizing that you are having such an effect makes you feel a hot and growing desire to be fucked.`
      ],
      nonCon: [
        `You place your hand on <<= ↂ.T.main.name>>'s <<n _t "chest.n">>, pressing firmly away from yourself. It's as if subconsciously you're trying to escape, even though mentally you've already resigned yourself to what is about to happen. Your pushing makes no difference to <<= ↂ.T.main.name>>, however, <<his>> <<if ↂ.T.body.muscle > 3 && ↂ.T.body.fat < 5>>firm<<elseif ↂ.T.body.fat >= 5>>flabby<<else>>smooth<</if>> <<n _t "skincolor.q">> flesh not budging at all.`,
        `You feel trapped when you press your hands against <<= ↂ.T.main.name>>'s chest, pressing against him in a nervous movement to take some space, like prey trying to get away from a predator. You can feel the fast beating of <<his>> body, a growing feeling of arousal that you share although this is not happening in a consensual way, your pussy body does not seem to obey.`,
        `You feel left out of <<= ↂ.T.main.name>>'s embrace, he grabs you with a force far beyond yours and you can't get rid of him, you put your hands on <<his>> chest to try to get some distance though uselessly. Feeling the heat emanating more and more from <<his>> body as things progress, you feel your heart racing and your vagina heat up against your will though, your body is getting ready to be fucked even in a relationship not exactly traditional.`
      ],
      romantic: [
        `You lovingly drag your fingertips up along <<= ↂ.T.main.name>>'s abdomen, enjoying the feel of the <<n _t "skincolor.q">> skin beneath your fingers. You begin to rub your hand against <<his>> chest, your hand sensually kneading the <<if ↂ.T.body.muscle > 3 && ↂ.T.body.fat < 5>>firm<<elseif ↂ.T.body.fat >= 5>>flabby<<else>>smooth<</if>> flesh. <<name s>>'s <<n _t "nipples.n">> perk up under your palms as you continue your massage.`,
        `You let your body respond to everything freely, feeling the warmth emanating from <<= ↂ.T.main.name>>'s chest as your hands roam <<his>> skin, you can feel the masculine scent while you feel your body heat up. At that moment your senses are heightened, and you feel an increasing need to be fucked, every second and every touch you feel on your body you respond, touching <<= ↂ.T.main.name>> back.`,
        `You die your lower lip feeling your vagina heat up to <<= ↂ.T.main.name>>'s mutual touches, your hands slide across the skin of <<his>> chest feeling a light touch of sweat settling and the beats increase more and more every second. You feel the same, <<his>> hands roam your body and it leaves you in an intense need to get fucked, your vagina warms up with it.`
      ],
      risky: [
        `You feel <<= ↂ.T.main.name>>'s touches on your body and, while you answer that by allowing your hands to slide over <<his>> chest, you get a little lost in your thoughts while you are being taken and probably creampied and ultimately impregnated. The thought of generating a baby makes you feel a hint of concern, but a great growing arousal in your vagina, hardening your clit and nipples. You bite your lower lip with the prospect of being successfully impregnated, giving a quick smile.`,
      ],
      preg: [
        `You feel the touch of <<= ↂ.T.main.name>> in your buttock, then a strong hug pressing you against him. Your hands pass over the skin of <<his>> chest, releasing the masculine scent and allowing you to feel the heat and notice the increasingly intense beating of <<his>> heart, which is already with the <<n _t "cock.n">> totally hard and ready to fuck you and get you pregnant. The prospect of a creampie and a successful insemination makes your vagina boil, you smile at him while remaining in your most submissive position possible, just waiting for the insemination.`
      ],
      isPreg: [
        `<<= ↂ.T.main.name>> keeps a small distance from you, as your belly allows him to get closer, and hugs you by holding you against him, you caress <<his>> chest feeling the heat shared between the three of you. Your heart races at the prospect of being fucked and your clit hardens while you smell the masculine aroma of <<= ↂ.T.main.name>>'s chest.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You slowly touch the chest of <<name _t>>, feeling your body pulse more intensely with each new moment and each new caress it makes on your body. You smile at yourself beginning to feel your pussy warm while you smell the masculine smell of <<name _t>>, and massage his chest until at some point you feel his erection. @@.mono;Is that... Really?@@ You ponder feeling his little penis, now erect against you. Instantly your mood drops and you feel deeply discouraged by going to have sex with a bad guy with a gift. @@.pc;Fucking shit, mate... You could have warned me that this dick is tiny BEFORE I start to get turned on, right? Ah shit...@@ You can't help but complain just looking into the eyes of your lover, who seems to go into a mixture of shame and anger when you say that.`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You feel the hug of <<name _t>> around your body, tight and hot, the masculine scent of it fills your insides making your pussy hotter every minute. You return the caress, massaging his chest and feeling the texture of his skin, the outline of the muscles and the heat emanating from it. Soon you can also feel the <<name _t>> erection, his dick hitting your skin, hard as iron. You can't help taking the measurements of it, quickly realizing that it is of average size. @@.mono;Satisfactory... I think.@@ You bite your bottom lip feeling it, pondering how far that cock can stretch you, and how deep it will go in your depths, but without creating great expectations though. @@.pc;Well, I think I can have a good time with what you have there, can you reach my cervix...? Let's test this...@@`;
        } else {
          // Magnificent!
          return `<<name _t>> wraps you in a tight hug, pressing his body against yours. You can feel the rhythmic pulse of his body, the heat emanating from it and the characteristic masculine smell, all of which leaves you more in more aroused by the minute. You give a mischievous smile while massaging his chest, feeling the hair between your fingers and the heat emanating from his skin. His cock is erect quickly with caresses, allowing you to feel it and make your conclusions about your lover's more than considerable penis. @@.pc;My, my... I can't wait to try this meaty stick, shit... I want to feel it stretching me! Let's go faster with foreplay, please?@@ You're starting to be controlled by your arousal and begging for a quick fuck, but he just laughs when you say that and keep teasing your body for now.`;
        }
      },
      sub: [
        `You touch <<= ↂ.T.main.name>>'s chest, feeling the heat shared between the bodies and your arousal growing with each touch and each caress on your body. You feel your instinct screaming for you to surrender submissively to your man, your clit is hard and emanating more and more heat, you feel that you just want to stay all fours for your "alpha male" and be properly creampied.`
      ],
      dom: [
        `The heat increases along with the friction between your bodies, you feel <<his>> touch and return it by putting light pressure on <<his>> chest, but in the failed attempt to take control of the situation. Your desire is to make <<= ↂ.T.main.name>> submissive, but this has become a perverted competition for the command, you feel more and more aroused as time goes by, and frustrated wanting to get the command.`
      ],
      degrade: [
        `You allow <<= ↂ.T.main.name>> to run through your entire body, feeling <<his>> touch while you just respond by sliding your hands across <<his>> chest, feeling that he is going to abuse you without you really wanting to resist your submissive position. Your vagina gets hotter and hotter as you face the prospect of being largely subjugated and fucked.`
      ],
      slut: [
        `You put on your most slutty expression and look at <<= ↂ.T.main.name>>, feeling your hands slide down <<his>> chest, sharing the mutual heat between the bodies until you feel <<his>> strong touch against your butt. You try to encourage him to treat you like you are, a whore begging to be fucked like a bitch in heat.`
      ],
      bimbo: [
        `You look at <<= ↂ.T.main.name>> with an innocent look, but eager to be fucked, he fulfills the foreplay gradually, touching your body as you touch <<his>> chest, sharing the mutual warmth and the growing arousal between their bodies. You, however, have already started it fully aroused, your slutty pussy is dripping and your mind can only think of a <<n _t "cock.n">> fucking you.`
      ],
    },
    squeezeBreasts: {
      standard: [
        `Reaching toward <<= ↂ.T.main.name>>’s chest, you place the palms of your hands against <<his>> <<n _t 'breasts.n'>>. <<if ↂ.T.body.tits.cupNum < 13>>Closing your outstretched fingers, you being to squeeze the soft <<n _t 'titshape.q'>> flesh, kneading it gently with the tips of your fingers.<<elseif ↂ.T.body.tits.cupNum > 22>>Sliding your hands down and under them, you heft the <<n _t 'titsize.q'>> masses that are <<if ↂ.T.body.tits.cupNum > 30>>far <</if>>too large to contain in a single hand.<<else>>Collapsing your hands to contain the delectable flesh, you begin pressing with your fingers. They sink in slightly as you begin a slow kneading motion.<</if>> You can feel the <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>> tightening up <<if ↂ.T.body.tits.nipLength > 2>>and pushing against <</if>>the palms of your hands. You enjoy the warmth of <<his>> <<n _t breasts.n>> as you continue to fondle them contentedly.`,
      ],
      lesbian: [
        `You take <<name s>> <<n _t 'breasts.n'>> and fondle them passionately. <<if ↂ.T.body.tits.cupNum > ↂ.pc.body.tits.cupNum>>Feeling a little bit jealous<<else>>Enjoying the warm soft skin under your fingers<</if>> you squeeze them against each other and gently knead them. <<name s>> smiles as you play with <<his>> boobs mesmerized by their softness and texture.`,
      ],
      public: [
        `Unconcerned about the time or place, you reach out to grab <<name s>>'s <<n _t 'breasts.n'>> with both hands. <<if ↂ.T.body.tits.cupNum < 13>>Closing your outstretched fingers, you being to squeeze the soft <<n _t 'titshape.q'>> flesh, kneading it gently with the tips of your fingers.<<elseif ↂ.T.body.tits.cupNum > 22>>Sliding your hands down and under them, you heft the <<n _t 'titsize.q'>> masses that are <<if ↂ.T.body.tits.cupNum > 30>>far <</if>>too large to contain in a single hand.<<else>>Collapsing your hands to contain the delectable flesh, you begin pressing with your fingers. They sink in slightly as you begin a slow kneading motion.<</if>> You can feel the <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>> tightening up <<if ↂ.T.body.tits.nipLength > 2>>and pushing against <</if>>the palms of your hands. <<if random(1,3) === 2>>You notice a passerby staring as you fondle <<name s>>'s breasts, and the extra attention sends a tingle down your spine.<<else>>Looking around, it seems that nobody is paying attention to your fondling.<</if>>`,
      ],
      openPublic: [
        `Despite the strange eyes fixed on you, you only allow him to grab your breasts and treat them as he likes. You feel your nipples harden when your mate just squeezes your breasts like two soft pillows, and then playing and squeezing your nipples sends a wave of pleasure echoing through your body. Your vagina, however, is much warmer by the strange eyes watching everything than by <<his>> touch.`
      ],
      nonCon: [
        `Despite your resistance, you are caught in a position where you can't do anything, he grabs you and starts to tighten your breasts in order to make you aroused. Although you try to act with a certain resistance, you soon begin to feel the effects of caresses on your breasts, your vagina begins to heat up and your clit hardens.`
      ],
      romantic: [
        `You allow him to have free access to your breasts, you wrap him in your arms and feel <<his>> touch squeezing your breasts, and then squeezing your nipples while looking at you. The act makes your vagina warm, your nipples are totally hard with the soft, but strong, touch of <<name _t>> who is doing a good job of leaving you in the ideal mood to be fucked.`
      ],
      risky: [
        `You feel <<name _t>>'s heavy touch against your breasts, playing with your nipples, squeezing and tugging non-stop while laughing at you, enjoying getting you in the mood to be fucked. In your mind, however, you feel you may be going to be impregnated with success, the total lack of care about sex for some reason leaves you furiously aroused, the thought of being inseminated makes you feel a mixture of arousal and worry, however much more arousal.`
      ],
      preg: [
        `<<name _t>>'s constant touch, squeezing your breasts, playing with one of your most sensitive regions in this way is making your arousal grow. He looks in your eyes realizing that you are getting more and more in the mood, in your mind you fantasize about your lactating breasts, and your pregnant belly, hoping that this will happen after today. The prospect of pregnancy after a consistent fuck makes your heart beat quickly and your clit harden, giving off heat to your lower regions.`
      ],
      isPreg: [
        `You feel your breasts being squeezed, <<name _t>> plays freely with your nipples, your breasts are now like two big pillows, but full of milk and you notice it dripping out with each touch. The fact that your breasts are full of milk and your uterus is occupied with your growing baby puts you in an intense feeling, a mixture between the maternal instinct and the arousal that warms your body.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `Each touch and each time <<name _t>> tightens your breasts you have two things in mind, the size of your breasts, which you always think should be bigger, and the size of <<name _t>> <<n _t "cock.n">> that will get you pretty fucked up. You fantasize about an absurdly wide dick fucking you while constantly being stimulated by your partner's touches, the thought makes you drip vaginal fluids of lust. However, your dreams are broken when you see the lump of <<name _t>> below you, touching your skin, and realize that it is a small stick. Ohh no... Your reaction is immediate, disillusionment takes over, and then a few seconds later you are filled with frustration and anger. @@.pc;Holy shit, man... Why didn't you let me know that you have a FUCKING tiny dick in the middle of your legs? This little thing is not even able to get half way to my cervix!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You are wrapped in the arms of <<name _t>>, feeling his caresses all over your body, pressing your most sensitive points. Your mind fantasizes about the upcoming fuck, a big cock fucking you and stretching your pussy to the limit. A few moments later you feel his hands grabbing your breasts, as if he is playing with a pair of water balloons. The <<name _t>> dick is totally visible to you now, hard as a rock but of moderate size, neither too small nor too big. You bite your bottom lip in perspective of how far that meatstick can reach your depths, but a part of you is disappointed, the instinctive part that wanted to be brutally fucked by a big cock. @@.pc;Well, let's go fast with foreplay... I hope you can hit my cervix with what you have there. Heh...@@`;
        } else {
          // Magnificent!
          return `<<name _t>> grab your breasts tightly, playing with it like you're holding two pillows. His caresses are firm, the touch is a little rough, but you feel more aroused like that. His dick is totally hard, when you look at it a hot sensation starts to pulse in your little pussy. @@.mono;That's what I wanted to see... Heh.@@ You bite your lower lip, feeling that heat grow more and more with each second and with each new touch. Soon you can barely contain your arousal and start begging to skip the foreplay and get fucked once. @@.pc;Hey... Aahh... Why don't we just- Hmm... Fuck now!? I can't wait any longer, I want to feel this cock inside me!@@`;
        }
      },
      sub: [
        `You make an innocent expression while surrendering totally and submissively to your partner, <<his>> expression is pure lust as he ponders what he will do to you. For now he squeezes your breasts, dividing <<his>> attention between that and squeezing and pulling your nipples, every time he does that your instinct screams for you to stay all fours and get fucked at once, your vagina gets hot with the perspective of submissive sex.`
      ],
      dom: [
        `Putting both of your hands over <<name s>>'s <<n _t 'breasts.n'>> you massage them in a soft but still dominative way. Making your grip harder with each second you end up mercilessly squeezing <<his>> <<n _t 'titsize.q'>> <<n _t 'titshape.q'>> boobs like a plushie while <<name s>> squirms and flinches being too shy and subby to stop you. Lifting <<his>> tits and squishing them together you enjoy them as much as you want not taking into any consideration what <<name s>> feels.`,
      ],
      degrade: [
        `Feeling the urge to humiliate <<name s>>, you rudely grab <<his>> <<n _t 'breasts.n'>> and lift one after another in your hands. <<if ↂ.T.body.tits.cupNum < 13>>@@.pc;These tiny sweater puppies are so small! They like belong to a teenager. Have consider getting a surgery or something?@@<<else>>@@.pc;Oh, these bags looks so obscene, <<name s>>. They would fit a cow rather than a human. De you imagine yourself being a cow sometimes, do you?@@<</if>> <<name s>> blushes and you know that your degraded <<his>> really harsh this time.`,
      ],
      slut: [
        `You just throw a malicious smile at <<name _t>> while he squeezes your breasts, stimulating him to continue with that, you also let out the moans each time he mistreats your hardened little nipples. You try to provoke him so that he continues to give you the treatment you deserve, like a little bitch ready to be fucked like a rutting animal.`
      ],
      bimbo: [
        `You feel your breasts being tightened and mistreated, your nipples being pulled and sending waves of pleasure through your body, the high body sensitivity that you have makes your vagina drip slowly with vaginal fluids. All you think about is getting fucked over and over, or until you're finally properly pregnant.`
      ],
    },
    suckNipples: {
      standard: [
        `Placing your hand on one of <<= ↂ.T.main.name>>’s <<n _t 'breasts.n'>>, you lean in and engulf the <<n _t nipple.n>> with your <<p lips.q>> lips. Swirling your tongue around <<his>> <<n _t 'nipple.n'>>, you begin groping at the other <<n _t 'breast.n'>> with your free hand, kneading your way to the <<n _t 'nipple.n'>>. You begin sucking more firmly, squeezing the <<n _t nipwidth.q>> flesh between your <<p lips.q>> lips while you likewise increase the intensity of your hand’s ministrations on <<his>> other <<n _t 'nipple.n'>>. <<if ↂ.T.status.milk > 0>>Your efforts have started the flow of milk, <<his>> fresh cream <<if ↂ.T.status.milk < 3 || ↂ.T.body.lactation  < 2>>leaking into<<elseif ↂ.T.body.lactation < 4>>filling<<else>>flooding<</if>> your mouth and wetting your fingers.<</if>>`,
      ],
      lesbian: [
        `You and <<name _t>> swap positions, sucking each other's nipples freely, she sucks you with enormous voracity, you can imagine how frustrated she must be. In spite of everything, you are as frustrated as she is and being sucked so intensely makes you feel more and more arousal, you touch your clit when you feel your vagina get wet and your body ready for more fun activity with your friend.`
      ],
      public: [
        `You suck your "friend's" breasts and end up partially ignoring that you are in public, with eyes hovering under you. When you switch shifts with <<his>> to have your nipples sucked, you feel a growing arousal while trying to look away from people watching you. Being watched while you are being sucked makes you feel especially naughty, you smile to yourself while enjoying the situation.`
      ],
      openPublic: [
        `You suck your friend's breasts, trying to avoid loud sounds so as not to attract the attention of the people around you. The feeling of being dirty hiding from others in a very risky way makes you feel hot, your nipples harden quickly and you have the opportunity to suck on your friend, who starts to serve your breasts carelessly until you pat <<his>> head so that she makes less sounds. She looks at you with a "Hey!" Look.`
      ],
      nonCon: [
        `Feeling trapped under <<his>> tight embrace, you feel your "attacker's" body heat against your skin, at that point he is focused on sucking your nipples, you feel <<his>> tongue running along your areola and small bites against your nipples. You regret and try to persuade him to stop, but in vain, he keeps playing with your breasts, mixing <<his>> efforts between mistreating your boobs and sucking your nipples. @@.pc; Please... Stop it... It's enough...@@`
      ],
      romantic: [
        `Your mate gently sucks your nipples, pressing you against the wall in a firm gesture of domination but without losing your kindness. You groan as he plays with your nipples, occasionally pressing your breasts carefully to ensure that you are aroused and wet enough when the time for sex comes. @@.pc;This is so good... Don't stop...@@`
      ],
      risky: [
        `You freely allow your friend to play with your breasts, leaving your body in a position submissive to him, you feel <<his>> tongue running through your nipples, warm and smooth, and then a few small bites causing waves of pleasure to echo through your body. Your body is more excited than usual, you wonder if you are possibly ovulating, and you are going to get pregnant, a mixture of worry and intense arousal cross your body with the thought of risky sex. @@.pc;Hmm... Aahh... This is good.@@`
      ],
      preg: [
        `You freely allow your friend to play with your breasts, leaving your body in a position submissive to him, you feel <<his>> tongue running through your nipples, warm and smooth, and then a few small bites causing waves of pleasure to echo through your body. You hope your body is hiding, thinking that your vaginal sensitivity is greater, as well as your arousal, you fantasize about the image of you feeling creampied and pregnant over the next 9 months, it fills you with great lust.`
      ],
      isPreg: [
        `You feel the high sensitivity of your breasts thanks to pregnancy, each touch and each small bite is amplified, causing your body to receive a great wave of pleasure. If there is a benefit to getting pregnant, this is it. You allow your mate free access to your breasts, he has fun playing with it and measuring your reactions a little exaggerated thanks to pregnancy.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `While you feel your partner playing with your breasts, in the middle of small bites and the sensation of <<his>> hot tongue running through your areolas, you fantasize about <<his>> huge penis, and the only unpleasant sensation at that moment is the fact that the <<n _t "cock.n">> in front of you will not be even bigger. You groan with more and more firm caresses until you can see his dick, erect beneath you, but it is not what you expected. @@.pc;Oh no... Holy shit! You didn't tell me that cock was tiny, insignificant! Grr...@@ You let your frustration explode in <<name _t>>, which blushes intensely humiliated when you declare.@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `<<name _t>> suck your breasts, you can feel his tongue running through your areola, playing with your nipples with constant intensity. Your body quickly warms up as it advances with the caresses, distributing its attention between your breasts. You can feel his breathing more intensely every second until at some point his dick is erect below you, touching your skin. You bite your lower lip, drawing your conclusions about your lover's pulsing tool. @@.pc;Heh... Is that the best you have? Not bad, but we will need- Uhh... Hmm! Test it! I want- Aahhh... Feel how deep you can stretch me!@@`;
        } else {
          // Magnificent!
          return `<<name _t>> suck your breasts intensely, looking mesmerized by your body while you just moan like a bitch in heat, feeling your body getting ready for the next fuck. At some point you feel his dick erect, below you, touching your skin. @@.mono;This... It's huge!@@ Your pussy gets more moist with the tempting view, you need to restrain yourself from pushing <<name _t>> and mount that cock right away, breaking the foreplay. @@.pc;Uhh! Please, let's start to- Ooohhhh... Fuck now? I can't do it anymore- Hmm... I need that cock inside me, or I'm going to go crazy!@@`;
        }
      },
      sub: [
        `You put yourself in the most submissive position possible, stuck against the wall and raise your arms so that your breasts are totally unprotected for your mate, just to give him the fun he is looking for. It mistreats your breasts, squeezing and occasionally biting while you are intensely sucked, almost as if it is trying to milk you, extracting the milk from inside you. The sensation however is very arousing, submission leads you to fantasize what will happen soon, you being fucked and creampied as you deserve.`
      ],
      dom: [
        `You are sucked intensely, but always trying to dispute the situation with your mate to get the control you deserve, albeit in vain. <<his>> strength is beyond what you can overcome for now and you feel a mixture of frustration and pleasure as he presses you against the wall and sucks your nipples intensely, having fun with your reaction. @@.pc;Aahhhhh... Shit!@@`
      ],
      degrade: [
        `You give your mate a chance to please you, allowing him full access to your breasts and savoring minute laguns while he sucks on your nipples, squeezing and lightly biting your nipples. @@.pc;I hoped you could do better, it looks like you have a shitty skill at it, huh?@@ You degrade your partner, mainly with the intention of provoking him.`
      ],
      slut: [
        `You lean into <<name s>>'s <<n _t 'breasts.n'>>, grabbing one firmly with your hand to position it, you hungrily engulf <<his>> <<n _t 'nipple.n'>> with your <<p lips.q>> lips. You suck firmly, taking the <<n _t 'areola.q'>> areola into your mouth as you rub and press against the <<n _t 'niplength.q'>> <<n _t 'nipple.n'>> with your tongue. You use your other hand to squeeze and twist at <<name s>>'s other <<n _t 'nipple.n'>> absentmindedly, your attention focused on your mouth. <<if ↂ.T.status.milk > 0>>Your firm suction seems to have started the flow of milk and <<his>> fresh cream <<if ↂ.T.status.milk < 3 || ↂ.T.body.lactation  < 2>>leaks into<<elseif ↂ.T.body.lactation < 4>>fills<<else>>floods<</if>> your mouth. You swallow the delicious liquid greedily, continuing to suck on the milky teat for more.<</if>>`,
      ],
      bimbo: [
        `You have a high natural sensitivity in your body, mainly because all you can think of most of the time is sex, even now while your breasts are sucked you can't stop fantasizing about being fucked by a big, thick cock. @@.pc;Ugh... Hehe, this is good! Aahhh...@@ Your nipples harden while being intensely sucked by your mate, who seems to be having a lot of fun with a bimbo like you.`
      ],
    },
    cupBalls: {
      standard: [
        `Gently moving your hand down between <<= ↂ.T.main.name>>'s legs, you start to slowly trail the tips of your fingers along the taut skin of <<n _t "hisher.q">> <<n _t "ballsack.n">>. <<= ↂ.T.main.name>> shudders slightly at your light touch, breath catching in <<n _t "hisher.q">> throat as <<n _t "heshe.q">> struggles to remain calm. You slide your hand fully under to cup <<n _t "hisher.q">> <<n _t "balls.q">> <<n _t "balls.n">> in your palm. Your fingertips softly pressing against <<n _t "hisher.q">> taint, you slowly and firmly enclose <<n _t "hisher.q">> <<n _t "ballsack.n">> in your grasping fingers. Playfully, you begin moving your fingers around and against the warm flesh of <<= ↂ.T.main.name>>'s <<n _t "ballsack.n">>, your digits twisting, twirling, and rotating <<n _t "hisher.q">> <<n _t "balls.n">> in all manner of directions. <<= ↂ.T.main.name>> watches with lips parted, breath ragged and strained as you entertain yourself with <<n _t "hisher.q">> <<n _t "ballsack.q">> <<n _t "ballsack.q">>. With every tug and stroke you give <<n _t "hisher.q">> dangling <<n _t "ballsack.n">>, you can see <<n _t "hisher.q">> <<n _t "cock.n">> pulsing and throbbing, the feeling of your hand engorging it with desire.`,
      ],
      lesbian: [
        `You want to taste the balls of a futa, you kneel in front of your friend and grab <<his>> <<n _t "cock.n">> with curiosity and examine every inch paying special attention to the balls, you start to lick it slowly while she smiles looking happy with yours attitude. You lick it and then start to suck it intensely, causing it to let out female moans, the balls have a mixed male and female smell, they are warm and soft, you spend a few minutes having fun with it.`
      ],
      public: [
        `Kneeling in front of him, you try to keep silent while you serve <<his>> balls, soft touches on the soft, warm skin make him need to contain the moans of pleasure. You then start to lambet and suck <<his>> balls, stretching and then releasing making <<his>> grunts become more intense and more difficult to contain.`
      ],
      openPublic: [
        `Deciding to ignore the eyes looking at you, you kneel in front of him and start taking care of the <<n _t "cock.n">> in need of attention, you start playing with <<his>> balls, the softest and most sensitive part of all sexual equipment. You serve the bag in front of you for a few minutes, sucking, licking and listening to some grunts of satisfaction as you submissively serve your mate.`
      ],
      nonCon: [
        `You kneel in front of him, reluctantly grabbing the <<n _t "cock.n">> upright and start licking it slowly as it hovers under you with a smile, hoping you will continue to serve. He tells you to take care of everything, you then divide your attention between <<his>> <<n _t "cock.n">> and <<his>> balls, the pulsating and soft part of the sexual equipment, you lick and suck it, although reluctantly, the densely hormonal and masculine scent make you feel feeling hotter and aroused, you start fantasizing about getting fucked while you serve <<his>> balls for the next few minutes.`
      ],
      romantic: [
        `You kneel to your man, thinking about playing with him a little and giving a little free pleasure during foreplay, you start to lick <<his>> penis, soon realizing that <<his>> balls demand your attention. He looks at you indicating that you go ahead, with a smile, you gently grab the pair of balls, feeling the heat emanating from the small factory of swimmers that will soon be inside you, you then start to lick it, it is smooth and soft, hot and pulsating, you spend a few minutes serving <<name _t>>.`
      ],
      risky: [
        `You reach your hand between <<name s>>'s, your hand roving until <<his>> <<n _t "balls.n">> are resting in the palm of your hand. You run your fingers over <<his>> <<n _t "ballsack.n">>, exploring and lifting to get a sense of their size. <<if aw.npc[_t].body.balls.size < 18>><<has pregnancy>>You're greatly disappointed to discover that <<his>> sack contains only <<n _t "balls.s">> <<n _t "balls.n">>. @@.mono;Will these even be able to  knock me up?@@<<or>>Part of you feels disappointed by the <<n _t "balls.s">> <<n _t "balls.n">>. @@.mono;At least I can enjoy a creampie without worrying about it much...@@<</has>><<elseif aw.npc[_t].body.balls.size < 22>>You discover a pair of <<n _t "balls.s">> <<n _t "balls.n">>, each one producing millions of sperm in the hopes of impregnating some lucky girl. You play with them gently, rolling them around as if to encourage their efforts.<<else>>You grin unconsciously when you feel the <<n _t "balls.s">> <<n _t "balls.n">> in your hand, knowing that each <<n _t "balls.s">> testicle is furiously working to produce a prodigous quantity of verile sperm. <<has pregnancy>>As you roll them in your hand and imagine their massive load deposited deep inside you, the anticipation causes you to shiver with delight.<<or>>Instinctively you realize that there's no way so much sperm would fail to fertilize any egg you happen to release; it's a thought that causes your womb to tingle naughtily despite your concern over taking such a large risk.<</has>><</if>>`,
      ],
      preg: [
        `You cup <<n _t "hisher.q">> <<n _t "balls.n">> with your hand, playing with them gently; mesmerized by the thought how much precious cum is stored inside the <<n _t "balls.q">> <<n _t "balls.n">>. Softly massaging <<= ↂ.T.main.name>>, you can't help but imagine all the thick semen deep inside your <<p "pussy.n">>, swimming into your womb. With your finger you tug and squeeze them, making <<n _t "hisher.q">> <<n _t "cock.n">> even harder than it was. You can feel <<n _t "hisher.q">> <<n _t "ballsack.n">> begin to tighten up, as if realizing that they're about to fulfil their purpose in life, namely filling a fertile woman with their potent seed. The thought sends shivers down your spine. @@.mono;Good luck, little guys.@@`,
      ],
      isPreg: [
        `Maybe pregnancy is making you especially naughty, you start touching <<his>> balls, starting to press lightly with your index finger and then you grab the <<n _t "cock.n">> upright with one hand, and the bag with the other and start licking it the way as provocative as you can get. Using your most sensual expression, you slowly start to serve your mate's balls while he just moans, allowing you to continue the work. After a few minutes you see an increasingly fierce look on <<his>> face, indicating that foreplay may be ending.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `Since you started serving <<his>> balls, you can't stop comparing this mentally with the biggest pair of balls you've ever seen. His dick is erect in front of you, although you avoid looking at it considering the small size, it is making you feel more and more frustrated and irritated. @@.mono;Shit... I shouldn't have chosen this guy, this is ridiculous!@@ Although you do your best to ignore this, you end up complaining at some point while serving your lover's balls. @@.pc;You could do a penis enlargement. Fuck, man... There are many ways to do that these days!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You are focused on the <<name _t>> balls, licking and caressing every part of your lover's soft flesh. The male scent fills you, making you feel more and more aroused, although you are still just a little frustrated by the average penis size of <<name _t>>. @@.mono;Well, this is not as big as I wanted, but it will do.@@ You ponder, still focusing on his balls. The feeling of controlling your lover's pleasure makes you feel especially naughty. @@.pc;Well, I'm going to enjoy watching you try to hit my cervix with this, not bad... But I'm used to... You know, bigger cocks! Heh@@`;
        } else {
          // Magnificent!
          return `You strive to focus on stroking and licking the balls of <<name _t>>, but his huge cock, erect and pulsating above it, is something too magnificent for you to just ignore. In spite of that, you try hard, listening to your lover's grunts of pleasure on each lick, then your little pussy is begging to be fucked, the drops of sweet female liquid stick in your love hole. @@.pc;Hmm... Let's go fast with this foreplay, I don't want to wait much longer to feel this dick inside me!@@`;
        }
      },
      sub: [
        `You kneel in front of him, and looking with a cute look in <<name _t>>'s eyes you place your hands on <<his>> cock, then you gently grab the bag below, feeling the intense and hormonal smell that exudes from it you soon start to lick. The texture is smooth, warm and soft, but it is pleasant to the touch. You feel more aroused with the situation though, serving <<name _t>> submissively for <<his>> pleasure pleases you deeply, physically and emotionally. The special attention of <<his>> balls soon results in light grunts of pleasure.`
      ],
      dom: [
        `You stick your hand down to reach <<n _t "hisher.q">> balls and grab them hard. <<= ↂ.T.main.name>> eyes widens. With a cruel smile you start squeezing them in your hand pressing <<n _t "hisher.q">> <<n _t "balls.q">> <<n _t "balls.n">> hard against each other. <<= ↂ.T.main.name>> squeals and flinces with pain, <<n _t "hisher.q">> mouth wide open in a almost inaudible scream as you absorb <<n _t "hisher.q">> ache and suffering. Tugging on the <<n _t "ballsack.n">> you force <= ↂ.T.main.name>> to lean forward to relieve tension on <<n _t "hisher.q">> poor ashing balls. In a surge of sadistic ecstasy you twist them pressing with a full grip finally making <<= ↂ.T.main.name>> to scream. When you finally release <<n _t "hisher.q">> well-tortured ballsack <<n _t "heshe.q">> sighs with a relief closing <<n _t "hisher.q">> eyes.`,
      ],
      degrade: [
        `Reaching <<n _t "hisher.q">> balls you start playing with the gentle scrotal skin between your fingers. @@.pc;Such a worthless little balls... are they even working, huh?@@ With a gentle tug on <<= ↂ.T.main.name>> <<n _t "balls.q">> <<n _t "balls.n">> you look into <<n _t "hisher.q">> eyes. @@.pc;Let's see if they worth something... Or else they maybe I should just snap them off maybe, mm?@@ With a gentle smirk you release them making <<= ↂ.T.main.name>> sigh with relief.`,
      ],
      slut: [
        `You kneel in front of <<name _t>> and grab <<his>> erect <<n _t "cock.n">> with your left hand, you lick your lips as you watch the pair of balls in front of you, deciding to serve him you quickly start sucking the balls, stretching the skin and then releasing, watching the bag retract to its original size in a few seconds and restarting the process while handjob him. You serve submissively, giving your man pleasure while he just moans intensely while you also play with the pair of balls in front of you.`
      ],
      bimbo: [
        `When you kneel in front of your man, you happily grab the <<n _t "cock.n">> upright in front of you and start playing with <<his>> balls, pulling the bag and watching it retract, you feel saliva rise in your mouth and start sucking it , dividing your attention and saliva between the balls and the pulsating and iron-hard <<n _t "cock.n">> in front of you. You couldn't resist a little play with <<name _t>>, and you savor every second of the intense masculine scent exhaling from the sexual equipment and enjoy <<his>> moans of pleasure, showing that your service is very much appreciated.`
      ],
    },
    slowDown: {
      standard: [
        `You urge <<= ↂ.T.main.name>> to slow down and take it a little easier on your hole.`,
      ],
      lesbian: [
        `You ask your friend to slow down, even though she is a girl she looks especially eager, just like a man.`
      ],
      public: [
        `You whisper to him then hoping that he will slow down, at this rate you will not be able to contain your moans, hoping not to be caught, you slow down.`
      ],
      openPublic: [`
        You ask <<= ↂ.T.main.name>> to slow down a bit. @@.pc;Let's give them all a good show, giggle!@@`,
      ],
      nonCon: [`
        You sqirm under <<= ↂ.T.main.name>> sobbing. @@.pc;Pleease, not so fast... don't do this...@@`,
      ],
      romantic: [`
        With a gentle smile you ask <<= ↂ.T.main.name>> to slow down a bit. @@.pc;No so fast, love, let's enjoy it...@@`,
      ],
      risky: [
        `Unprotected sex makes you feel especially aroused, you ask him to slow down so you don't lose control of the situation.`
      ],
      preg: [
        `Before you lose yourself in the situation and expect to be impregnated, you ask him to slow down, you want to enjoy this moment of pleasure more slowly.`
      ],
      isPreg: [
        "You rub your pregnant belly, entreating <<name s>> to take a more gentile pace.",
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You ask him to slow down, frustrated and irritated because of <<name _t>>'s small penis size, you are even considering dressing and walking away. @@.pc;Hey, let's take it easy, I... Maybe we can stop it?@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You touch the <<name _t>> penis, smiling softly at him and asking to take it easy. Heh, calm down... We don't need to skip the foreplay, let's... Enjoy this.@@ He returns a mischievous smile, looking at your wet pussy and deciding, and nods positively.`;
        } else {
          // Magnificent!
          return `Placing your hands under the <<name _t>> chest and smiling at him as you push him away, you ask for some calm about it, even though your body is begging to have his big penis stretching your depths. @@.pc;Heh... I don't want this to end quickly, come on... Go more slowly.@@ You look at the dick, big and pulsating, and you need to fight against your instincts not to just grab and put it inside you.`;
        }
      },
      sub: [
        `You look at your man submissively, then asking him to slow down, but still putting the situation under <<his>> control. @@.pc;Please... Ah... Slow down...@@`
      ],
      dom: [
        `You push <<= ↂ.T.main.name>> making <<n _t "himher.q">> to slow down. @@.pc;No cumming until I'll allow you, pet.@@`,
      ],
      degrade: [
        `You slap <<= ↂ.T.main.name>> making <<n _t "himher.q">> to slow down. @@.pc;Not so fast, you little piece of shit!@@`,
      ],
      slut: [
        `You grab <<name _t>>'s <<n _t "cock.n">> in an assertive gesture, he looks at you doubtfully when you whisper provocatively looking into <<his>> eyes. @@.pc;Take it easy... Hehe, let's enjoy this for a longer time, okay?@@`
      ],
      bimbo: [
        `You try to free the lustful thoughts from your mind for a second and ask your mate to calm down. @@.pc;Hey, you know, let's go slower, okay? That will be better!@@`
      ],
    },
    speedUp: {
      standard: [
        `You start thrusting your hips yourself, interrupting <<= ↂ.T.main.name>>'s rhythm slightly in an attempt to get <<n _t "himher.q">> to fuck you faster.`,
      ],
      lesbian: [
        `Feeling impatient, you look at <<= ↂ.T.main.name>>'s eyes and make a frustrated expression, then ask <<his>> to pick up the pace.`
      ],
      public: [
        `The threat of being caught doing this in public makes you furiously aroused, you want it to go faster, you decide to move your hips against <<= ↂ.T.main.name>>, indicating that he start to increase the pace.`
      ],
      openPublic: [
        `The look of people watching is making you furiously aroused, you feel you want it more intensely and you stare at Name. @@.pc;Come on... Hmm... Faster, we can- Aahhh... Do it better!@@`
      ],
      nonCon: [
        `You are not exactly in control here, but you have already lost control of your body that now begs to be fucked more intensely. @@Please- Aah... Faster! I want this!@@`
      ],
      romantic: [
        `You press your body against his, casting a mischievous smile as you move your hips against <<his>> body. @@.pc;Go fast, dear... I need more strength in this! Hmm...@@`
      ],
      risky: [
        `The feeling of risk to get pregnant takes over your body, making you want it more intensely and you put your hands on <<his>> face, then looking into <<his>> eyes and asking to go faster. @@.pc;Let's do this- Aahhh... Faster!@@`
      ],
      preg: [
        `You are seized by your maternal instinct at the same time that your body is seized by furious lust, your vagina is hot and you want it more quickly. @@.pc;If this is going to happen- Aahhh... Let's do it faster! Please- Hmm...@@`
      ],
      isPreg: [
        `Pregnancy is certainly something that makes you more out of control in sex, you feel like you need to increase the pace and ask <<name _t>> for it. @@.pc;Faster! Hmm... Please! I need it.@@`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You feel frustrated, but just try to stimulate <<name _t>> to fuck you as quickly and intensely as possible, although you don't feel like you're going to be satisfied with that little dick. @@.pc;Hmm... Come on, do it right! I want CUM!@@ His heavy breathing indicates that he is putting a lot of strength into it, although his small cock does not help him to satisfy your high demand.`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You instigate <<name _t>> to go deeper and deeper, and as intensely as possible against your pussy, in an attempt to extract as much pleasure from that dick as possible. @@.pc;Heh... Come on, put more intensity on it! I want to feel this stick stretching me, like... A LOT!@@ You help him by pressing your hips against his dick.`;
        } else {
          // Magnificent!
          return `You try to extract as much pleasure as possible from the big dick in front of you, impatient you ask for <<name _t>> to increase the pace. @@.pc;Let's go faster- Aah... We can do better than that!!!@@ Your instincts are more quickly quenched with a big dick, the only thing capable of fully calming your slutty pussy.`;
        }
      },
      sub: [
        `Sobbing with each thrust you turn to <<= ↂ.T.main.name>>. @@.pc;Faster, <<if ↂ.T.main.male>>daddy<<else>>mommy<</if>> please, pretty pleeease!@@`,
      ],
      dom: [
        `You push your hips gaining a pace and forcing <<= ↂ.T.main.name>> to follow the new rhythm.`,
      ],
      degrade: [
        `You grin at <<= ↂ.T.main.name>>. @@.pc;Come on, get some pace. Or that's all you got? You are so pathetic, gosh! <<if ↂ.T.main.male>>Or maybe little boy is afraid to cum too fast?<</if>>@@`,
      ],
      slut: [
        `A little bitch like you deserve and needs to be fucked properly, you get frustrated and ask <<name _t>> to increase the pace so that you can be properly fucked. @@.pc;Come on- Aahh... FUCK ME FASTER!@@`
      ],
      bimbo: [
        `You feel frustrated with the current rhythm, something in which you want to be fucked more fiercely like a bitch in heat. You just look at <<name _t>> with a slightly annoyed expression, it seems to make him understand your message.`
      ],
    },
    speedUpDouble: {
      standard: [
        `Thrusting your hips toward <<= ↂ.T.main.name>> forcefully, you urge <<n _t "himher.q">> to fuck you faster. @@.pc;Faster. Faster!@@`,
      ],
      lesbian: [
        `You feel very impatient and frustrated with the current fuck rhythm, you thrust your hips against it and, with a serious look, beg. @@.pc;Let's go faster, please!@@`
      ],
      public: [
        `You thrust your hips against him, unsatisfied with the current pace and whisper for a more intense fuck. @@.pc;C'mon, faster- Oh! Please!@@`
      ],
      openPublic: [
        `You feel warmer with your eyes watching you, it makes you more daring, you feel a growing desire for an intense fuck. @@.pc;C'mon, you can do it faster- Oh! Please?@@ You remain thrusting your hips towards <<his>> cock, impatient for a more intense fuck.`
      ],
      nonCon: [
        `You now feel the arousal control your body and you start to thrust your hips against <<name _t>>, and ask your abuser to fuck you faster, now you are just like a bitch in heat. @@.pc;Faster! Aahhh... I need this- Oh! Faster!@@`
      ],
      romantic: [
        `You caress <<name _t>>'s body during the fuck, he returns caresses and all of this together makes you feel more and more hot with each thrust of him. @@.pc;Do it faster- Oh! I need a fuck- Aahhh... Harder!@@ You remain thrusting your hips againd <<his>> body, impatient for a more intense fuck.`
      ],
      risky: [
        `You feel your arousal grow with every thrust it gives in your vagina, thinking about how risky it is for you to get pregnant in this situation, but it leaves you possessed by lust. @@.pc;Fuck me faster... Ohh! Faster!@@ You remain thrusting your hips towards <<his>> cock, craving for a big, virile load.`
      ],
      preg: [
        `You fantasize about being impregnated and with each thrust that he gives in your vagina, reaching more and more deeply, the feeling and the desire to get pregnant burns stronger inside you, increasing your arousal enormously. @@.pc;Fuck me more- Ohh! Faster! Please don't stop! Aahhh...@@ You remain thrusting your hips towards <<his>> cock, craving to be impregnated.`
      ],
      isPreg: [
        `You feel an intense desire to be brutally fucked, probably pregnancy is leaving your body out of control, you then beg for a quicker fuck. @@.pc;Faster- Ah! Faster Please!@@ You remain thrusting your hips towards <<his>> cock, just seeking to satisfy your pregnant body desires.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You fantasize about a huge dick fucking you brutally, it makes your libido burn more deeply inside you. @@.pc; Come on, fuck me- Hmm... Faster! Faster! @@ You keep pushing your hips towards him, excitement and frustration take over your body, which begs for a huge stick but only gets a small stick, which will not be able to touch your cervix and will hardly satisfy you.`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You smirk at <<name _t>> as he thrust against your pussy, but feeling a little dissatisfied with the pace and intensity of the fuck you ask him to increase it. @@.pc;Come on, fuck me faster! I'm a- Oohhh... An not a virgin, I can handle this!@@`;
        } else {
          // Magnificent!
          return `You feel your depths being stretched, finally satisfying your demanding instinct, but you still want more and stimulate <<name _t>> to fuck you more intensely. @@.pc;Do it! Faster! Aahhh! Fuck me MORE HARD! I- Oohhh... I NEED it!@@ You laugh as he increases the pace, but your laugh is soon broken to make room for intense, feminine moans while your lover meets your demand.`;
        }
      },
      sub: [
        `You are just fucked, giving your body to him submissively for you lover to satisfies <<his>> desire by fucking you at the pace he prefers and thrust your hips against <<his>> cock. You start to feel the deep desire for a more brutal fuck, and you beg for it. @@.pc;Fuck me faster! Aah! Please, I really want this! Oh!@@`
      ],
      dom: [
        `You don't feel the current rhythm satisfying your desire, your vagina feels hotter and hotter, and you start to be controlled by your arousal when you beg for a really brutal fuck. @@.pc;Fuck me faster! Oh... Faster!@@ You remain thrusting your hips againd <<his>> body, impatient for a more intense fuck.`
      ],
      degrade: [
        `The submissive feeling of being fucked makes you feel so much hotter, you then start degrading <<name _t>> when you feel that the current pace is not satisfying your libido. You press your hips against it and ask for more strength. @@.pc;Don't ruin that fucking shit like you- Ohh! Do it right, and fuck me faster!@@`
      ],
      slut: [
        `The feeling of being fucked like a little bitch that you are increases as the fuck progresses, with each thrust that your vagina receives, but soon the current rhythm does not satisfy you and you ask for more. @@.pc;Come on, fuck me- Oh! Faster, you can do- Aahhh... Better! You thrust your hips against him, still impatient to be fucked as you deserve.@@`
      ],
      bimbo: [
        `Starting to feel dissatisfied, you bite your lower lip when you start to thrust your hips against the erect and hot <<n _t "cock.n">> fucking your vagina, in order to increase the intensity of the fuck. @@.pc;Come on, big cock, fuck me faster! Oohhh... You can do this!@@`
      ],
    },
    doNothing: {
      standard: [
        `Enjoying what <<= ↂ.T.main.name>> is doing, you begin to go limp and lie there. You trust <<him>> and know <<n _t "heshe.q">> would never to anything to hurt you. It’s very easy to just surrender yourself to the pleasure he's causing you, and just relax as <<n _t "heshe.q">> works to bring you to a satisfying climax.`,
      ],
      lesbian: [
        `You decide to save your energy and let it continue to play with your body, realizing that you can only enjoy and receive the pleasure that <<= ↂ.T.main.name>> has to offer, you occasionally moan with <<his>> caresses running through your vagina.`
      ],
      public: [
        `You decide to stop and save some energy, also to keep silent, you just allow it to play with your body for a few minutes. You contain your moans as your mate plays with your pussy and your breasts, making you feel much hotter.`
      ],
      openPublic: [
        `You go passive and just accept everything that <<name s>> does. Enjoying you glance around trying to count the size of your audience but the pleasure <<name s>> brings you make it hard to concentrate.`,
      ],
      nonCon: [
        `Paralyzed by fear you just get limp under <<him>> too afraid to do or to say anything. Letting go of any hope to interrupt <<= ↂ.T.main.name>> you try to reconcile with inevitable abuse you are facing.`,
        `Without any chance to fight <<him>> you have no other option then to surrend yourself at <<n _t "hisher.q">> will just squealing with the fear you are trying to suppress.`,
      ],
      romantic: [
        `You just let <<name _t>>  take care of things for now, you allow him to have access to your body and he plays with your breasts and your femininity, dividing your attention around the most sensitive parts of your body. You groan taking advantage of this special attention, after several minutes you feel much hotter than before.`
      ],
      risky: [
        `You decide to do nothing, but just enjoy the special attention your breasts and vagina receive from <<name _t>>  now. You give him full access to serve you while you fantasize about the risky situation you are going in, knowing the chances of getting pregnant makes you feel worried, but much more aroused.`
      ],
      preg: [
        `You give <<name _t>>  access to your body, deciding to do nothing but enjoy <<his>> attention. The predominant feeling inside you is the arousal, and then the desire to get pregnant, you savor the pleasure of that little wave of feelings for several minutes, moaning in pleasure and with the expectation of a big and manly creampie.`
      ],
      isPreg: [
        `You decide not to act, but just enjoy the constant caresses to your body, and give it unrestricted access. Pregnancy is a great booster for your sensitivity, the touches, kisses and caresses make you moan in pleasure with powerful waves of pleasure.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You stop and decide to enjoy the caresses and kisses that <<name _t>> gives throughout your body. You can't stop analyzing <<his>> <<n _t "cock.n">> the size, drawing conclusions and wishing it could be bigger, you hope it can satisfy your loose vagina with such a small size. @@.mono;This guy... Man, it is difficult to find men so cutely small, what a shame!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You save your strength and let <<name _t>> take care of you, it travels your body caressing the most sensitive parts and giving you free pleasure. You look at his erect dick, feeling the heat emanating from it and seeing every pulse. @@.mono;Well... It could be bigger, but I think I can play with it a little... Heehee@@`;
        } else {
          // Magnificent!
          return `You decide to save your strength and let <<name _t>> take care of your body, his hands go through every most sensitive part of your intimacy, giving you some good time. His huge cock pulsates against your skin, you feel the heat emanating from it and you can see the pre-seminal fluids covering the head of his penis. @@.mono;That's fucking what I LIKE! Shit... I can't wait to have this thing inside me!@@`;
        }
      },
      sub: [
        `Letting go of control feels like a bliss and you let <<= ↂ.T.main.name>> to do anything <<n _t "heshe.q">> wants to do to you.`,
        `Feeling subby and obedient you just silently accept it and submerge into state of pure passive bliss gratefully enjoying anything <<= ↂ.T.main.name>> does to your body and soul.`,
      ],
      dom: [
      `For a moment you stop and just enjoy observing <<= ↂ.T.main.name>> the way any queen would look at <<his>> property.`,
      ],
      degrade: [
        `You decide not to act, but just wait and see what <<name _t>> will do. You receive good attention, being massaged along your body, each point on your body receives a portion of attention. You though feel much more aroused and dominant when you question <<his>> skill. @@.pc;You suck at this, come on... Put more strength into it! Or you won't be able to get me wet.@@`
      ],
      slut: [
        `You decide to wait <<name _t>> to do something bold, expecting a triple anal fingering or something, but you are satisfied with the caresses along your body. You moan over several minutes with each touch, and whimper it gives your sensitive nipples.`
      ],
      bimbo: [
        `You just wait, hoping that you will have your vagina used properly soon, and just try to be satisfied with the touches and caresses that <<name _t>> gives especially for your already wet pussy and waiting for a fuck.`
      ],
    },
    strokeCock: {
      standard: [
        `<<= ↂ.T.main.name>> grips the base of <<n _t "hisher.q">> rigid <<n _t "cock.n">>, presenting its swollen length and waiting for you to make the next move. <<n _t "hisher.q">> hard <<n _t "cock.n">>, rigid and standing out from <<n _t "hisher.q">> <<n _t "fat.q">> frame, bobs and pulses in vulgar anticipation of the touch of your hand. Reaching out, you take hold of him, <<= ↂ.T.main.name>> moving <<n _t "hisher.q">> own hand aside to give you unfettered access to <<n _t "hisher.q">> <<n _t "cock.n">>. Under <<n _t "hisher.q">> watchful eye, you slowly slide your fingers along the length of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. Your mouth curls into a slight smile, as you feel <<n _t "hisher.q">> <<n _t "cock.n">> slowly pulsing against your palm, <<= ↂ.T.main.name>>'s <<n _t "cock.n">> straining more with every stroke. As you work your fingers up and down <<n _t "hisher.q">> length, <<= ↂ.T.main.name>> gives a low moan, and you watch as a glistening drop of precum slowly trickles out of the head of <<n _t "hisher.q">> <<n _t "cock.n">>. Moving your thumb up to <<n _t "hisher.q">> <<n _t "cockhead.n">>, you rub against the light glisten of slick moisture, working the fluid around and between your fingers and then using it to lubricate <<n _t "hisher.q">> <<n _t "cock.n">> for your continued stroking.`,
      ],
      lesbian: [
        `With a mischievous smile, you grab <<his>> <<n _t "cock.n">> and start playing with it, you massage the <<n _t "cock.n">> upright for a few minutes before starting a more intense stroke. <<his>> moans indicate that you are succeeding in what you are doing, serving as a partner, or object of pleasure, for <<name _t>> .`
      ],
      public: [
        `Reaching for <<name s>> <<n _t "cock.s">> <<n _t "cock.n">> you grab it with your palm and start slowly stroking it up and down from <<his>> <<n _t "cockhead.n">> to the base and <<n _t "ballsack.n">>. <<name s>> opens <<his>> mouth a bit and pants nervously while you work <<his>> stiff shaft smearing the precum all over it. It seems <<print either("pretty nervous about being noticed by some passerby.", "doesn't care much about being found getting handjob in public.")>> You change the pace going from agonizingly slow strokes to rapid ones and enjoy the amount of control and joy you can provide to <<name s>>; <<his>> <<n _t "cock.n">> desperately leaks with clear fluid and <<his>> ballsack hangs high and tight.`,
      ],
      openPublic: [
        `The feeling of being observed during sex fills you with lust and makes you more relaxed than usual, you smile to yourself before kneeling and starting to play with <<name _t>> 's erect cock. After a few moments you start doing a little show for people watching, intensely stroking <<name _t>> 's cock and making him groan in pleasure. @@.mono;Hehe, this is fucking fun, I'm really a bitch...@@`
      ],
      nonCon: [
        `At that moment you need to obey <<name _t>> , you kneel under <<his>> command and he tells you to serve him. The upright and pulsating <<n _t "cock.n">> in front of you needs your attention, you reluctantly start playing, but soon you are stroking it, you feel more and more aroused you start to lose control of your body.`
      ],
      romantic: [
        `Smiling at each other, you want to please <<name _t>> , you then gently touch <<his>> cock, and start putting some pressure on it in a simple handjob. Soon you are stroking it more intensely and quickly, you feel hotter as you listen to your man's grunts of pleasure, feeling especially mischievous for making him crazy with lust for you.`
      ],
      risky: [
        `You look at <<name _t>> 's cock, the image of you being fucked and creampied by that <<n _t "cock.n">> makes you feel worried, you are unprotected and the thought of being impregnated fills you with lucidity, and a hint of worry. You start to stroke <<his>> <<n _t "cock.n">>, thinking of preparing it and make him craving with lust to release as much cum as possible when the correct time comes.`
      ],
      preg: [
        `In your mind, when you see the <<n _t "cock.n">> erect and pulsating in front of you, you just think of being impregnated by it. You kneel and lick your lips before you start playing and tease <<name _t>> , knowing that the crazier he is the more horny he will come. Potentializing the amount of cum to increase the chances of impregnation depends on you, and if you stroke it for several minutes, <<his>> groans show that you are successful in provoking him.`
      ],
      isPreg: [
        `Pregnancy is driving you more crazy than usual, wanting to provoke <<name _t>>  you kneel in front of him, casting him the most slutty expression you have and then turning your attention to the <<n _t "cock.n">> in front of you. You grab the <<n _t "cock.n">> and start massaging it, stroking the hard, pulsating meat stick for several minutes, until you realize that <<name _t>>  is almost losing control of <<his>> lust.`
      ],
      queen(){
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // lol tiny
          return `You chuckle as you reach out to grab <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">>. You squeeze the pitiful thing in your hand, as if checking to see if the <<n _t "hardness.q">> flesh is fully erect. @@.pc;So this is as big as it gets? You really expect to please a woman with this?@@ You jerk your hand up and down its length roughly a couple times, not waiting for a response. @@.pc;You should really go get this enlarged. Well, I hope your stamina is decent at least...@@ You begin to stroke the <<n _t "cock.s">> <<n _t "cock.n">> in a more sensual fashion, as if daring <<name s>> to disappoint you by cumming too soon.`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // okay...
          return `You reach out and grab <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">>, sighing audibly with disappointment as you grip it firmly. @@.pc;Well, I had been hoping for something better, but I suppose this is satisfactory...@@ You loosen your grip and slowly begin to slide your hand up and down <<his>> length. You can feel the <<n _t "hardness.q">> meat throb beneath your fingers to the beat of <<name s>>'s heart. You feel some moisture on your thumb so pay special attention to the head, rubbing it delicately for a few moments before resuming your languid stroking.`;
        } else {
          // yay
          return `You reach out and grab <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">>, grinning with appreciation for a tool worthy of piercing your <<p "pussy.n">>. @@.pc;Such a fine specimen you have here...@@ You begin to stroke the <<n _t "hardness.q">> meat with your hand, gripping gently as you slide your hand up and down its considerable length. You continue stroking as you imagine its bulk pushing its way inside you, your motions becoming somehow reverent, as if polishing a holy artifact. You can feel the powerful pulses of blood beneath your fingers as you continue to worship the <<n _t "cock.s">> <<n _t "cock.n">> with your touch.`;
        }
      },
      sub: [
        `You gently take <<his>> <<n _t "cock.n">> with both hands caressing it and slightly stroking looking into <<name s>> face catching hints of <<his>> approval. @@.pc;Do you like it, <<if ↂ.T.main.male>>master<<else>>mistress<</if>>?@@ Picking up a pace you stroke <<his>> shaft up and down feeling veins pulsing under the delicate skin of the <<n _t "cock.s">> <<n _t "cock.n">>. Biting your lip, you give up to the fucktoy's bliss serving <<name s>>'s pleasure.`,
      ],
      dom: [
        `You stop <<name _t>>  with your hands, then approaching him and stroking <<his>> cock, trying to avoid <<his>> movements, you put yourself in a dominant position. The moment of words is over, and you speak with deeds, massaging the stick of hot meat for a while to provoke <<name _t>> , dominance makes you feel hot and powerful.`
      ],
      degrade(){
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 50) {
          // lol tiny
          return `You take <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> with two fingers irradiating a disgust and disappointment. @@.pc;Did somebody ever told you how small and insignificant this tiny nub of yours is? I can bet I won't be the first to tell you it, ahaha!@@ Sliding your fingers up and down <<his>> cocklet you continue to mock it making <<name s>> blush. @@.pc;Oh, how cute, look, it tries so hard to stay stiff and impressive! Little brave peepee. Gosh, I saw so much cocks bigger than this one. Actually, to be honest, <i>all</i> of them were bigger, you know?@@ You raise your brows making a derisive face while <<his>> little cock twitches between your thumb and index fingers.`;
        } else {
          // yay
          return `You reach for <<his>> <<n _t "cock.s">> <<n _t "cock.n">> and begin to rudely work it with your hand. @@.pc;Enjoying this, faggot? Or you still dreaming about some hot ripped stud in my place? Let's hope you can maintain staying stiff when I put this worm inside me at least.@@ <<name s>>'s face goes tomato red with an embarrassment while you jerk <<his>> cock hard looking right into <<his>> eyes. @@.pc;I hope you are not a premature ejaculator? Are you?@@ <<his>> cock twitches in your palm as <<name s>> tries <<his>> best to hide <<his>> insecurity.`;
        }
      },
      slut: [
        `You smile to yourself before giving <<name _t>> a slutty expression. @@.pc;Just relax... Let me serve you.@@ You kneel and start licking the tip of <<his>> penis, when it is lubricated, you get an intense massage and stroking the throbbing meat stick for a few minutes, the male and intoxicating smell makes your vagina warm up in the prospect of a fuck eminent.`
      ],
      bimbo: [
        `You kneel in front of the cock, with your eyes full of interest in the piece of meat pulsing in front of you, you lick it until it is well lubricated and then you start to play with it with interest. You have fun massaging it intensely and squeezing the balls, making your mate groan intensely with pleasure.`
      ],
    },
    fingerPussy: {
      standard: [
        `<<if ↂ.sex.npcWetness[ↂ.sex.target] < 5>>Quickly sticking your first two fingers into your <<p mouth.n>> to prepare them first<<else>>Rubbing your first two fingers along the <<n _t wet.q>> folds of <<his>> <<n _t labia.n>><</if>>, you slip them inside <<his>> <<n _t pussy.q>> <<n _t "pussy.n">>. You feel <<his>> heat immediately, <<if ↂ.sex.npcWetness[ↂ.sex.target] > 4>>your fingers slick with <<his>> nectar.<<else>>your saliva mixing with <<his>> own nectar.<</if>> <<if ↂ.skill.oral < 25>>You start moving your fingers experimentally, exploring <<his>> depths as you push them deeper inside. When they can go no further<<elseif ↂ.skill.oral < 50>>You begin exploring <<his>> depths by touch, slowly pushing your fingers deeper inside. When they can go no further <<else>>With a deft touch you curl your fingers slightly, pressing with your fingertips as you push them deeper inside; waiting for the telltale twitch of <<his>> pleasure. Reaching your mark<</if>>, you begin sliding your fingers back out of <<his>> <<n _t pussy.n>> only to reverse their course to dive back inward. You continue drawing your fingers out only to plunge them back inside, your tempo slowly increasing into a rapid series of short thrusts<<if (ↂ.sex.npcOrgasm[ↂ.sex.target] / ↂ.T.status.pleasure) > 0.5>> to match <<his>> rapid breathing.<<else>>.<</if>> `,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: [
        `You put two fingers to the entrance of <<his>> <<n _t wet.q>> <<n _t labia.n>> and stick it in a dominant fashion. <<if ↂ.sex.npcWetness[ↂ.sex.target] < 5>><<name s>> squeals when your fingers intrude <<his>> dry <<n _t pussy.q>> <<n _t "pussy.n">> but you force them inside mercilessly until your knuckles get almost hidden in <<his>> vulva.<<else>><<name s>> bites <<his>> lip when your fingers slide into <<his>> vulva up to your knuckles.<</if>> @@.pc;You like this, slut, right?@@ <<name s>> nods with arousal on <<his>> face. @@.pc;Good little whore likes being intruded so much. Who's whore you are?@@ @@.npc;Your, <<= ↂ.pc.main.name>>!@@ You smile and add one more finger stretching <<his>> hole more and began thrusting them back and forth enjoying your dominance over <<name s>>.`,
      ],
      degrade: "none",
      slut: "none",
      bimbo: [
        `You place your hand over <<name s>>'s <<n _t wet.q>> <<n _t "labia.n">>, feeling the heat practically soak into your hand. @@.pc;OMG gurl, your <<n _t "pussy.n">> is sooo hawt!@@ You play with <<his>> pussy like a child with a new toy, feeling, pulling, squeezing, and exploring <<his>> <<n _t "labia.n">>. You pull your hand away and bring it to your face, slipping two fingers into your mouth and sucking on them lewdly. @@.pc;You're yummy!@@ You quickly place your hand back between <<his>> legs and slide your saliva-coated digits inside <<his>> <<n _t "pussy.n">>. You explore a bit, feeling <<his>> inner walls before you start fucking <<his>> with your fingers. @@.pc;I bet this feels goood!@@`,
      ],
    },
    touchCock: {
      standard: [
        `Reaching down between <<= ↂ.T.main.name>>'s legs, you place the tip of your finger gently against <<n _t "hisher.q">> <<n _t "cock.n">>, right against the sensitive ridge where the swell of <<n _t "hisher.q">> <<n _t "cockhead.n">> meets the rest of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. At a slow, tantalizing pace, you trail your finger down the length of <<n _t "hisher.q">> <<n _t "cock.n">>. Your fingertip brushes against one of the veins that run through <<n _t "hisher.q">> <<n _t "cock.n">>, and you can feel the steady thrum of <<n _t "hisher.q">> pulse inside of <<n _t "hisher.q">> swollen manhood as you lightly trail your way down to the base of <<n _t "hisher.q">> <<n _t "cock.n">>. With your finger down against where <<n _t "hisher.q">> <<n _t "cock.n">> meets the rest of <<n _t "hisher.q">> <<n _t "fat.q">> body, <<if ↂ.T.body.pubes != "shaved">>you trail your index finger around, enjoying the feel of <<n _t "hisher.q">> <<n _t "pubecolor.q">> pubic hair ticking against your skin, before reaching your hand down and underneath <<n _t "hisher.q">> <<n _t "cock.n">>.<<else>> you run the tip of your finger around the smooth skin at the base of <<n _t "hisher.q">> <<n _t "cock.n">>, before moving your hand down and underneath <<n _t "hisher.q">> <<n _t "cock.n">>.<</if>> Cupping <<= ↂ.T.main.name>>'s <<n _t "cock.n">> in your palm, you slowly curl your fingers around him, the feeling of <<n _t "hisher.q">> hot, <<n _t "cock.q">> length in your hand sending a warm shudder through your body. <<= ↂ.T.main.name>> watches with breath held as you enclose <<n _t "hisher.q">> <<n _t "cock.n">> in your firm grasp, fingers gripping firmly around <<him>>.`,
      ],
      lesbian: [
        `You venture to play with the most intimate region of <<name _t>>, she does nothing while just watching you run your fingers under every part of <<his>> <<n _t "cock.n">>. Starting with the base and feeling the pubic hair between your fingers, moisture settles on your skin and the strong odor exhales from it. You feel <<his>> pulse increase and <<his>> male equipment swell, pulsing faster and faster. You venture into the bulbous, pink head of <<his>> cock, the most sensitive region that makes <<his>> moan at the mere touch, you laugh at <<his>> while you continue to have fun in this foreplay.`
      ],
      public: [
        `You slowly and carefully bring your hand to the <<name _t>> cock, feeling the warmth emanating from <<his>> skin along with the intense masculine odor that fills you with arousal only after a few moments. You play with the head of <<his>> cock, squeezing it and making him moan, then passing your fingers along <<his>> skin, feeling the veins of the erect <<n _t "cock.n">> pulsing in your fingers, exhaling heat, the mere sight of it starts to make you wish it inside you. When you reach the base, you can see the balls pulsing, you run your fingers through the nase, feeling the accumulated humidity and the pubic hairs rubbing between your fingers.`
      ],
      openPublic: [
        `You feel especially naughty being watched, and you decide to do a little show for those who are watching you. You take your hand to the erect <<n _t "cock.n">> of <<name _t>>, and start playing with it, smiling at him you grab the head of <<his>> <<n _t "cock.n">> and, being able to feel an accelerated pulse and the heat exhaling <<his>> skin, you press that and hear him moan at each of your touches. You soon start to explore the rest, passing through the wet skin with pre-cum, feeling your hand touch the dense liquid and full of hormones, you feel your body getting warm with the intense and masculine smell you arrive at the base feel the heat , your hand is covered with moisture when you play, running your fingers through <<his>> pubic hair.`
      ],
      nonCon: [
        `<<name _t>> leans back, showing <<his>> erect cock to you, you understand the moment he wants you to serve him. You reluctantly start playing with <<his>> erect <<n _t "cock.n">>, touching the <<n _t "cock.n">>'s head, you feel the heat and start breathing the strong male odor that exudes from it. The smell starts to fill you up, making you feel warmer and more naughty, you then bite your lower lip when it starts to moan at your touch, you venture into the rest of the cock, feeling the heat exhaling from the damp skin, the veins pulsing against the skin of your fingers, you finally reach the base and feel the moisture from the pre-cum liquids; In the end you are more and more aroudes, soon you start to desire to be intensely fucked by that cock.`
      ],
      romantic: [
        `You reach out and touch <<name s>>'s <<n _t "cock.n">> gently, giving it a light pat as if patting a child on the head. @@.pc;I'm so glad you're excited to see me, big guy.@@ You smile reflexively at the silliness of talking to <<name s>>'s <<n _t "penis.n">>, but inside you're happy that you arouse <<him>>. You take ahold of the flesh, feeling the heat against your hand along with the gentle throbbing of <<name s>>'s pulse. You take your time holding it and exploring it through touch, feeling the springy veins beneath your fingertips or slowly running a finger over the curves of <<his>> head.`,
      ],
      risky: [
        `You smile at yourself with your poorly contained arousal and grab the <<name _t>> <<n _t "cock.n">>, feeling the heat emanating from it, you venture into <<his>> intimate region. You play and massage the head of <<his>> <<n _t "cock.n">>, making <<name _t>> moan, you have some fun before moving on to the rest, you finally reach the base, realizing that <<his>> skin is covered by pre-cum in the barely contained arousal of the prospect of getting fucked and probably getting pregnant. You feel deeply hot, your vagina starts to make more and more vaginal fluids when you realize that you can get pregnant today through that cock, getting slightly worried.`
      ],
      preg: [
        `Your outstretched hand slowly takes hold of <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">>, marveling at the shape and heat of the tool designed to get you pregnant. You run your hand over its <<n _t "hardness.q">> length, taking in the details beneath your questing fingertips. @@.mono;This is going to fill me with thick fertile <<w "cum.n">>.@@ You take note of its length, all the better to plant <<name s>>'s seed as deep as possible. You run your fingers over the head, all the better to stimulate your body for reproduction. The naughty thoughts only serve to heighten your need.`
      ],
      isPreg: [
        `Pregnancy is getting you almost out of control, you look at the <<name _t>> cock, erect and pulsating, and grab it with your hands, venturing into your partner's sexual equipment. He moans softly with each touch, you laugh at him when you start to discover the most sensitive point of the cock's head. Pressing this you feel the hot compressed humidity, the pre-cum gives off a strongly masculine odor that makes you feel a great hunger for cock. You reach the base of <<his>> <<n _t "cock.n">> and, playing with it, feel the especially wet pubic hair between your fingers, <<his>> balls pulsing with the cum of manly cum waiting to fill your most intimate depths where your baby is now.`
      ],
      queen(){
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // lol tiny
          const t = `You chuckle as you take hold of <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> between your forefinger and thumb. You try to bend it and pull it outward, making a show of inspecting the small <<n _t "cock.s">> and determining if it's actually erect. @@.pc;You know there are medical procedures to fix things like this, don't you?@@ You release it and slap it a few times with your fingers. @@.pc;The fact that you've kept this pitiful thing this way must mean you're into being humiliated or something, right?@@ You laugh again as you pantomime measuring it with your hand. @@.pc;This tiny thing definitely isn't good for anything. If you aren't going to fix it, perhaps you should just `;
          return t + either("keep it locked up?@@", "remove it altogether?@@");
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // okay...
          return `You reach out and touch the head of <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> with your forefinger. You sigh audibly with disappointment and take hold of it between your thumb and two fingers. @@.pc;I was hoping you'd have a decent package, but I guess this will have to do...@@ You squeeze the <<n _t "hardness.q">> flesh firmly between your fingers, tugging at it before releasing it and slapping it gently with your fingertips. @@.pc;I guess it isn't going to get any bigger, huh?@@ You continue toying with it for a few minutes as if weighing the options.`;
        } else {
          // yay
          return `With a hungry smile you reach out to caress <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">>. Your touch is gentle, your motions respectful to a <<n _t "cock.n">> that's actually worthy of piercing your <<p "vulva.n">>. You take hold of it, luxuriating in the sensation of its hot bulk in your hand. You move your hand slowly, as if studying each swollen vein along its considerable length. You smile as you try fruitlessly to bend it, the <<n _t "cock.s">> <<n _t "cock.n">> refusing to bend to your will.`;
        }
      },
      sub: [
        `You are happy to serve <<name _t>> when he leans back, waiting for you to caress <<his>> cock. You place your hands slowly under <<his>> erect sexual equipment, feeling the strong heat emanate from it, the veins pulsating intensely, the potent odor fills you making you feel a deep desire to be fucked and creampied. You just massage <<his>> cock, for now, making him moan and exploring every inch of it, you play with the head, the most sensitive part, while with the other hand you explore the center and the base, the humidity affects your hands, covering your fingers and filling you with lust that you will soon be unable to contain.`
      ],
      dom: [
        `You feel especially naughty and push <<name _t>>, he falls exposing <<his>> <<n _t "cock.n">> to you, he senses your excitement and allows you to serve him. You grab <<his>> <<n _t "cock.n">> and feel it pulse against your hands, starting to explore it, you press the <<n _t "cock.n">> head repeatedly, listening to <<his>> soft moans. Passing through the hot and moist skin of the <<n _t "cock.n">> with the other hand, you can feel the pulsating veins, faster and faster, the intensely masculine odor fills you and makes you feel a great urge to be fucked. You go on exploring and venturing by the cock, feeling your hands at the base, with the pubic hair brushing against your fingers and the pre-cum in your hands.`
      ],
      degrade: [
        `<<name _t>> is waiting for you to start serving him, you are tempted to see <<his>> <<n _t "cock.n">> erect in front of you and release your hands to grab it. You start by gently exploring the cock's head with your right hand, while running the rest of the pulsing tool's extension with your other hand. @@.pc;I expected more, you are a disappointing thing, you know? But there is hope for you... Just pay a penile increase. Hehe@@ You tease <<name _t>> while exploring <<his>> cock, feeling the veins pulsate intensely against your hands moistened by <<his>> pre-cum, when you reach the base you feel <<his>> rough hair against your fingers, the moisture in <<his>> warm skin and the intense smell exhaling constantly, making you feel hotter and hotter.`
      ],
      slut: [
        `<<name _t>> is in front of you, you look at <<his>> cock, as he leans back, and begins and begins to feel an increasing temptation to tease him. You quickly grab <<his>> pulsating <<n _t "cock.n">> and start playing with <<name _t>>'s sex tool, he seems to appreciate the idea and gently moans as you squeeze and explore each part of the cock, starting with the hair, massaging every red inch and going through the rest, feeling the veins pulse in contact with your skin. Your hands quickly get wet with the pre-cum, the masculine scent is almost intoxicating for you, knowing that this <<n _t "cock.n">> will soon be fucking your pussy makes you feel highly tempted to lie down and open your legs, you contain the urge to while though.`
      ],
      bimbo: [
        `<<name _t>> just stick to your fremte, indicating to <<his>> erect <<n _t "cock.n">> waiting for you, so you can serve him. You lick your lips, unable to contain yourself in the face of such a tempting sight, feeling more mischievous and aroused, you immediately grab the <<n _t "cock.n">> playing with bold movements, while squeezing and massaging your head and grabbing the rest with your other hand , being able to feel every pulse of the cock's veins erect. You explore every inch of <<name _t>>'s hot, pulsating tool, the strong, masculine scent just makes you more and more tempted and craving to be fucked brutally as you need.`
      ],
    },
    playWithNipples: {
      standard: [
        `Reaching up, you place the palms of your hands against your <<p breast.s>> <<p breasts.n>>, thumb and index fingers of each hand reaching up to brush against your areolae. <<if ↂ.pc.body.tits.nipLength  > 3>>Your <<p nipl.q>> <<p nipples.n>> are already stiff and sensitive, and before long you gasp as your fingertips brush against the hard nubs poking out from your <<p breasts.n>>.<<else>>As <<= ↂ.T.main.name>> watches, you slowly begin stroking your fingertips against the darkened circles, feeling the tender flesh begin to stiffen under your own touch. Soon enough, you can feel the tender buds of your <<p nipl.q>> <<p nipples.n>> emerge from hiding, and you are quick to grip them between the tips of your teasing digits.<</if>> You play delicately at first, but soon find yourself giving your <<p nipples.n>> a light tug, a gasp escaping your throat at the heady mix of pleasure and pain that hits your <<p fat.q>> body in one big jolt. Soon you go from tugging to twisting, moaning as you test your own limits and how much wonderful abuse your <<p nipw.q>> <<p nip.n>> can take.`,
      ],
      lesbian: "none",
      public: [
        `Ignoring what anyone happening to look your way may think, you grasp your <<p breast.s>> <<p breasts.n>> in your hands and send your thumbs and forefingers questing for their respective nipple. <<if ↂ.pc.body.tits.nipLength  > 3>>
        They run across your <<p areola.s>> areolae to grasp your already-stiff <<p nipples.n>>.<<else>>Your digits slide against your smooth areolae until they arrive at the concave dip of your hidden <<p nipples.n>>. You brush your fingers a few times over the top before squeezing to coax them out into the open.<</if>> You take hold of them firmly, <<if ↂ.pc.kink.nips>>the sensitive nubs practically electric with pleasure.<<else>>enjoying the tingle of pleasure from the sensation.<</if>> You spend some time alternating between tugging and twisting them with your fingertips, enjoying the sensations without restraint. `
      ],
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    rubOwnVulva: {
      standard: [
        `At a slow and deliberate pace, you run one hand down your own body. First sliding it down your neck, you brush down against one <<p boob.n>>, following its <<p breast.s>> curve down past your chest and against your stomach. After several tantalizing seconds, your hand finds the object of its quest. With the tips of your fingers, you begin rubbing in soft, lazy circles along the outer lips of your <<p pussy.n>>. <<if ↂ.sex.pcWetness > 6>>By this point, you are already dripping <<p curwet.q>>, and your hand is soon soaked with the juices of your arousal as you feel around the <<p labia.n>> of your <<p pussy.n>> under <<= ↂ.T.main.name>>'s watchful eye.<<else>>As you begin teasing and stimulating the sensitive folds of your <<p pussy.n>>, your breath begins to come faster and you can feel your face flush, as you brazenly play with yourself under <<= ↂ.T.main.name>>'s watchful eye.<</if>> Licking your lips, you quicken the pace of your strokes, pressing your fingers firmly against your horny <<p pussy.n>> as you tease yourself into a higher state of desperate arousal.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: [
        `As if by habit from all the times you do it during the day, you slip your hand down between your legs to cup your <<p vulva.n>>. A contented sigh escapes your lips at the familiar sensation of your fingers on your <<p curwet.q>> <<p labia.n>>. @@.pc;I luv my <<p pussy.n>>!@@ You begin to move your fingers, rubbing and squeezing your <<p labia.s>> pussylips. Occasionally, you dip a finger between them, rubbing it over the more sensitive flesh inside. Despite touching yourself this way all the time, the stimulation still brings a moan to your lips.`,
      ],
    },
    rubOwnClit: {
      standard: [
        `With two fingers, you spread apart the flesh at the very top of your <<p labia.n>>, exposing the tender flesh of your <<p clit.n>> underneath. Placing another finger against your <<p clit.s>> <<p clit.n>>, you begin to softly move it in a circle, jolting slightly at the feeling of hot pressure against the nerve-filled organ of pleasure between your legs. After several seconds of light, lazy self-stimulation, you know that you need more. Placing a second finger next to your first, you increase the pace of your strokes as you firmly rub and tease your horny <<p clit.n>>. Knowing that <<= ↂ.T.main.name>> is there with you as your hand works busily between your legs makes your self-pleasure feel all the more delightfully dirty, and soon your fingers move in rapid, desperate circles against your <<p clit.q>> throbbing <<p clit.n>>, your breath coming out in vulgar gasps with every flick of your wrist.`,
        `Pressing against the flesh of your <<p vulva.n>> firmly with your fingers and thumb, you lift upward while spreading your hand slightly. The action causes your <<p clit.s>> <<p clit.n>> to poke outward, exposed for the wet fingers of your other hand. Without hesitation you begin to rub the sensitive bead of flesh with your fingertips, dragging them over it in almost random directions as they search out what feels best. What begins as sensual rubbing slowly escalates in speed and intensity, and soon your fingers are practically flicking your clit as they push firmly against your flesh in a rapid up and down motion. Your legs quake with the intense stimulation.`,
      ],
      lesbian: [
        `You surrender to the arousing heat that you feel in your vagina and start rubbing it, <<name _t>> seems to enjoy the sight of your little out of control and watches you while doing the same. You bite your lower lip with small waves of pleasure that echo through your body as you play with the lip of your vagina, then you reach the clit and begin to squeeze the tender and tender flesh, causing you to lose control. more and let out intense female moans. You lose track of time and after a few minutes all that is audible in the room are your moans and hers, while you finish massaging your most intimate and sensitive spot.`
      ],
      public: [
        `You try to contain your tall arousal by massaging your clit a little, your most sensitive region, your pussy, it's hot and humid, begging for some attention. You bite your bottom lip when you start to squeeze and pull your clit, which quickly hardens doubling in size, your vagina then fills with moisture to the point that it starts to slowly flow down your thighs, you let out muffled moans in an attempt to not attracting attention, although your body is almost working on its own due to your arousal and more basic sexual instincts.`
      ],
      openPublic: [
        `You start to massage your vagina, giving a little show to your audience, you open your lip and start a constant massage, applying more and more pressure and almost starting a fingering. Soon you turn to your clit, the most sensitive and smooth region is hardened, showing your high arousal, when you massage it, squeezing and stretching, strong waves of pleasure echo through your body and cause you to constantly moan. Naturally, the warm feeling of being observed makes you much more aroused and sensitive; You feel like a dirty little bitch, ready to be fucked.`
      ],
      nonCon: [
        `You surrender to your arousal with the whole situation, you start to be carried by your highly aroused body and you touch your clit, beginning to massage your most sensitive and delicate region, now fully hardened. Your body has already decided to prepare for sex, even if you did not choose <<name _t>>, your vagina is hot and dripping a few drops of vaginal fluid, you squeeze, pull and massage your clit, moaning in the process and increasing a lot your arousal. <<name _t>> smiles and just masturbates watching you surrender to your sexual desire and poorly contained libido, soon you will be fucking furiously, at this rate.`
      ],
      romantic: [
        `You feel warm because of the closeness and intimacy with <<name _t>>, the arousal has started to take care of your body since it started and you cannot resist your desire for pleasure when you start to massage, squeeze and press your hardened clit. You bite your lower lip to lightly suppress moans while playing with it, the little waves of pleasure echo through your body and you go on doing a show that pleases <<name _t>>'s eyes. When you feel a small wave of tacky liquid seeping down your thighs you feel that it is enough, and then you decide to go to the next step.`
      ],
      risky: [
        `You start to be dominated by your arousal, you fantasize about the situation and all of this has worried you, the prospect of making risky love and getting pregnant is a powerful aphrodisiac for your body. You can not resist playing with your clit, hardened and pulsating, highly sensitive thanks to the high arousal, you press, play with it and squeeze, generating delicious waves of pleasure that make your body hair shiver a little. <<name _t>>'s eyes are fixed on you, who can see <<his>> erect <<n _t "cock.n">> ready to take you to the next step, the prospect of starting a risky fuck makes you burn inside.`
      ],
      preg: [
        `You smile at <<name _t>> before you start teasing him, and you start playing with your clit that is hard and pulsing between your fingers. When you squeeze it a wave of pleasure passes through your body, you occasionally moan as you carry it on, giving <<name _t>> a little show as you watch <<his>> <<n _t "cock.n">>, erect as iron, and the balls just below, loaded with manly sperm; The thought of being fucked and impregnated quickly makes your vagina warm and moist, the prospect makes you feel almost uncontrollably aroused.`
      ],
      isPreg: [
        `You smile to yourself when you start teasing <<name _t>>, pregnancy is something that is making you especially naughty and you start a show for him, massaging, tightening your hardened clit. You let your moans flow freely, knowing that the sound of your voice is calming to make him even more charged with desire for you, you are left with the expectation that he will not contain himself and take you at any time, giving you the fuck deserves and needs.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You feel the heat emanating intensely from your vagina, realizing that your hardened clitoris starts to play with it. You groan as you squeeze, pull and press the little piece of sensitive meat while you can't get around your thoughts and fantasies about being fucked by a huge horse <<n _t "cock.n">>. This is just fantasy though, every time you look at the tiny <<name _t>> cock you feel great frustration lowering your arousal. @@.mono;Ugh... Man, I shouldn't have chosen him... Even a fucking vibrator can do better than that!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `Your little clit is hardened, hot and vibrating, emanating pleasure to your body and you instinctively touch it in the search to intensify that feeling. It satisfies you and makes you moan, the touch in your most sensitive region is something warm and pleasant, you then look at the erect penis of <<name _t>> and estimate if it is able to satisfy you. @@.mono;He's just average... Hmm! But I think I can have fun with that! Heh@@`;
        } else {
          // Magnificent!
          return `Your body is pulsating intensely, your arousal is getting higher and higher and you can't resist touching your hardened clit, moaning like a little bitch in the expectation of being fucked. The <<name _t>> cock is in front of you, huge and hard as iron. Just looking at it makes your little love hole more moist and hot, you have a hard time restraining yourself in the face of it. @@.pc;You have a... Interesting tool down there. I need to feel it stretching me! Just let's fuck now, PLEASE!?@@ Breathing heavily, you will not be able to hold back much longer.`;
        }
      },
      sub: [
        `You feel the heat emanating intensely from your vagina, realizing your hardened clit you start to play with it. You groan as you squeeze the small point of sensitive flesh, dividing your attention between it and massaging the entrance to your highly moistened love hole, fantasizing about the moment when <<name _t>> will take you and fuck you as you deserve, the fantasy of being fucked by a dominant male makes you almost lose control of your arousal and jump on it begging for a fuck.`
      ],
      dom: [
        `You feel the heat emanating intensely from your vagina, realizing your hardened clit you start to play with it. You start fantasizing, while looking at <<name _t>> who smirks at you, mount him when the time to fuck finally comes. You try to provoke him by giving him a little show while you massage your clit, moaning freely but you don't think about giving up control, in fact the thought of fighting for control makes you feel even hotter than before.`
      ],
      degrade: [
        `You push <<name _t>> back while you feel the heat emanating intensely from your vagina, realizing your hardened clit you start playing with it. He starts to masturbate as you go along with the little show, you watch <<his>> erect <<n _t "cock.n">> and mention it, while you press on your clit, feeling especially dirty. @@.pc;Uh... I hope- Hmm... You don't mess up the whole fucking thing- Aah... Or I'll need to find a better <<n _t "cock.n">> capable of- Oh... Fuck me decently!@@`
      ],
      slut: [
        `You feel the heat emanating intensely from your vagina, realizing your hardened clit you start to play with it. <<name _t>> hugs you, but you still play with your clit, he just smiles at you who can now smell <<his>> masculine aroma, while you remain moaning and squeezing your most sensitive and hot spot. The prospect of a rough fuck makes your heart beat faster, when you feel a wave of vaginal fluids running down your thighs you know it's time to be fucked like a little bitch you are.`
      ],
      bimbo: [
        `You feel the heat emanating intensely from your vagina, realizing your hardened clit you start to play with it. Your slutty body is constantly asking to be brutally fucked, you groan with barely contained desire while trying to relieve it by squeezing and pressing your most sensitive spot, which releases hot and dense vaginal fluids preparing your love hole for a fuck. You are unable to be satisfied with it though, your body needs a big, thick <<n _t "cock.n">> to fuck you.`
      ],
    },
    passionateKiss: {
      standard: [
        `You lean your head in and press your lips heavily against <<n _t "hishers.q">>. <<= ↂ.T.main.name>> grabs at your arms and holds you closer, while your <<p lips.q>> lips and <<n _t "hisher.q">> dance tightly together. You both pull away to catch your breath, only to quickly draw together once again. Eyes closed, head turned, you grope your hands frantically against <<n _t "hisher.q">> back as you hungrily kiss him, your head swimming at the intensity of the passion. Another pause for breath, and you open your mouth to say something, only to feel <<= ↂ.T.main.name>>'s lips against you for a third time. You press harder with each repeated kiss and then finally release to let the moment linger.`,
      ],
      lesbian: [
        `You can't resist <<name _t>>'s feminine and floral scent, you lean forward and give <<his>> lips a soft kiss. The kiss lasts for a few seconds and becomes more and more intense, you wrap your arms around <<his>> neck and, feeling <<his>> return the kiss, you feel your arousal grow more and more, heating your vagina and preparing your body for something more.`
      ],
      public: [
        `You silently lean towards him and start kissing him firmly, feeling <<his>> arms wrap around your body and <<his>> firm hands tightening your buttock. After a long moment you start to feel your body heating up, your mind just fixed on the intense kiss and the heat shared between the bodies while you stay together, preparing your body for the next step.`
      ],
      openPublic: [
        `Ignoring the eyes watching every part of your movements, you go in the direction of <<name _t>> and start kissing him furiously. The kiss starts violent, expressing the huge arousal you are feeling, especially by the spectators measuring each action you do. Then <<name _t>> wraps <<his>> arms around your body and starts to massage your pussy and your tight butthole, preparing your body for the next step of the action.`
      ],
      nonCon: [
        `You feel your body being controlled by the growing arousal inside you, and you give up resisting it and lean towards <<name _t>> to kiss him, feeling <<his>> tongue invade your mouth you immediately respond by doing the same. After a few seconds you are wrapped in <<his>> arms, which now hug you tightly and caress your buttocks. You feel your body's pulse increase without breaking the kiss and decide that there is no escape but to be fucked.`
      ],
      romantic: [
        `You lean forward, starting a soft kiss and feeling your body fall into <<name _t>>'s firm but gentle embrace. He wraps <<his>> arms around you and presses your body against his, you feel <<his>> tongue invade your mouth, you respond furiously to the kiss turning it into a competition, you just break the kiss to moan while feeling the caresses him in your vagina, then continue the intense and passionate kiss.`
      ],
      risky: [
        `You lean forward, giving <<name _t>> a passionate kiss. He quickly returns the kiss and you feel <<his>> tongue invade your mouth, you feel <<his>> arms around your body, pressing you against <<his>> body. You fantasize about being taken, fucked and creampied in that risky moment, feeling a worry and arousal.`
      ],
      preg: [
        `You lean forward, giving <<name _t>> a passionate kiss. You feel him return the kiss, <<his>> tongue invades your mouth while <<his>> hands travel over your body, involving you, and caressing your sensitive parts. Everything leads you to fantasize about being impregnated, the feeling of arousal takes over your body and mind, propelling you to be properly mated.`
      ],
      isPreg: [
        `You lean forward, giving <<name _t>> a passionate kiss. Pregnancy makes you feel much warmer, more sensitive and aroused. Feeling <<name _t>>'s arms wrap around your body as the tongues intertwine and dance together, you share that sensitive moment with him, knowing that your body now needs a fuck to relieve the needs of your pregnancy.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `Trying to ignore the little <<name _t>> stick, you approach your lover and kiss him passionately. Knowing this is not going to be a satisfying fuck makes you wonder if you really want to continue with it though, despite that, he has his little meaty stick upright, hard as iron. @@.mono;Haha, this is ridiculous... Does he want to fuck me with this little thing? Ugh... I don't know if I want to take this further.@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You jump towards <<name _t>>, being more controlled by the arousal theme and wishing for a good fuck, you passionately kiss your lover. The heat increases quickly when the two bodies intertwine, you can then feel his medium sized dick against your skin. @@.mono;Hmm... Yes, I hope he can get to it. Maybe he can satisfy me?@@`;
        } else {
          // Magnificent!
          return `You lean forward, giving <<name _t>> a passionate kiss. Deciding to make things hot, you fantasize about getting fucked by his big cock and kisses him furiously when he starts to caress the most sensitive and delicate parts of your body making you even more aroused. His huge lump against your skin makes you feel a deep, burning desire to be fucked as soon as possible. @@.pc;L-Let's... Go faster with the foreplay, please? Me- Aahhh... I want to feel that cock inside me!@@`;
        }
      },
      sub: [
        `You slowly lean in to kiss <<name _t>>, deciding to give yourself totally and submissively to him, you feel him wrap you in <<his>> warm embrace and then caress your body as he returns the passionate kiss. <<his>> tongue invades your mouth, dancing with yours and greatly increasing your arousal while you surrender in such a submissive position.`
      ],
      dom: [
        `You wrap your arms around <<his>> neck, and start a passionate kiss, sticking your tongue in <<name _t>>'s mouth with enormous voracity you surrender to your arousal and the thirst you feel for sex. He wraps your body in a warm embrace and begins to caress you at your most sensitive points, preparing your body to be fucked soon.`
      ],
      degrade: [
        `You wrap your arms around <<his>> neck, and start a passionate kiss, sticking your tongue in <<name _t>>'s mouth with enormous voracity you surrender to your arousal and the thirst you feel for sex. After a few moments you break the kiss, feeling especially naughty and slutty. @@.pc;You haven't yet learned how to excite and prepare a woman, uh? What the fuck, man...@@`
      ],
      slut: [
        `You feel a great need to be taken and fucked, you move towards <<name _t>> and start kissing him furiously, and in the heat of the kiss he responds with the same voracity while slapping your ass by wrapping you in <<his>> arms. You hold your moans while being treated like a little whore you are, but satisfaction fills you and makes your vagina warm up faster.`
      ],
      bimbo: [
        `You jump towards <<name _t>>, he lifts you while you wrap your arms around <<his>> neck and your legs around <<his>> body and start a furious kiss moved by your uncontrolled arousal. Your body is hot and your vagina drips vaginal fluids, totally ready to be fucked.`
      ],
    },
    sensualKiss: {
      standard: [
        `You can hear the pace of your breathing increase and your heart flutter, as you and <<= ↂ.T.main.name>> move in closer to each other. Before long, you can feel the soft press of <<n _t "hisher.q">> lips against yours, as <<n _t "hisher.q">> hands reach around to grip you behind the back and pull you closer. Soon you find yourself mirroring <<n _t "hisher.q">> action, matching the intensity of <<n _t "hisher.q">> kiss as you reach around to embrace <<him>> around the waist. You can't help but moan as you feel <<n _t "hisher.q">> hands begin stroking along your back, your face flushing at the feeling of <<n _t "hisher.q">> arms around you, <<n _t "hisher.q">> <<n _t "fat.q">> body pressed tightly against yours. Sliding your hands up <<n _t "hisher.q">> back, you give <<him>> a light scratch with your nails. <<= ↂ.T.main.name>> gives a quick jerk of surprise, but from the way <<n _t "hisher.q">> kiss increases in intensity, it's obvious that <<n _t "heshe.q">> enjoyed the sudden feeling of light pain. Eventually, reluctantly, the two of you part, your eyes locking as you both consider what is to come next.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    romanticKiss: {
      standard: [
        `You find your eyes locked on <<= ↂ.T.main.name>>'s, the two of you staring at each other with obvious affection. Biting your lip, you shift closer to him, hoping that <<n _t "heshe.q">> picks up on your signals. From the way <<n _t "hisher.q">> head moves towards you, it's obvious that he's feeling the same as you are. Soon your lips softly meet, your heart pounding like a drum in your chest as you and <<= ↂ.T.main.name>> share a warm, tender kiss. You can feel <<n _t "hisher.q">> hand come up to rest against your cheek, while <<n _t "hisher.q">> other arm wraps around your waist, pulling you closer. Your own hand reaches up behind <<n _t "hisher.q">> neck, not wanting <<= ↂ.T.main.name>> or <<n _t "hisher.q">> soft lips to move a single inch from where they are right now.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    nibbleEar: {
      standard: [
        `Moving your mouth up to the side of <<n _t "hisher.q">> head, you signal your intention by lightly brushing the outer edge of <<= ↂ.T.main.name>>'s earlobe with your tongue. Taking the soft flesh into your mouth, you begin lightly nibbling, giving several spots on <<= ↂ.T.main.name>>'s ear the attention of your hot breath and gentle bite.`,
      ],
      lesbian() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "lesbian");
      },
      public() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "public");
      },
      openPublic() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "openPublic");
      },
      nonCon: "none",
      romantic() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "romantic");
      },
      risky() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "risky");
      },
      preg() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "preg");
      },
      isPreg() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "isPreg");
      },
      queen() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "queen");
      },
      sub() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "sub");
      },
      dom() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "dom");
      },
      degrade() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "degrade");
      },
      slut() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "slut");
      },
      bimbo() {
        return `You lean in close to <<name s>>, bringing your mouth to <<his>> neck and leaving a trail of kisses as you make your way upward. Reaching <<his>> ear, you playfully lick along the outside curve before taking <<his>> earlobe in your mouth and nibbling gently. You release it, taking the opportunity to whisper into <<name s>>'s ear. ` + setup.library.callSexAct("saySomethingSexy", "bimbo");
      },
    },
    necking: {
      standard: [
        `Leaning your head to the side, you being laying light kisses down <<= ↂ.T.main.name>>'s neck and shoulders. <<n _t "heshe.q">> leans <<n _t "hisher.q">> head away, giving your roaming lips better access to <<n _t "hisher.q">> <<n _t "skincolor.q">> flesh. A wicked thought crosses your mind, and picking a spot low on <<n _t "hisher.q">> neckline, you form your mouth into an O-shape and press down on <<n _t "hisher.q">> skin. <<= ↂ.T.main.name>> winces as you suck hard, and when you pull away after several seconds of hard suction, you can see the darkening of <<n _t "hisher.q">> flesh and smile. Whatever else happens tonight, you've left your mark on him.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    lickCock: {
      standard: [
        `You lick your lips as your <<= ↂ.pc.body.eyeColor>> eyes lock on <<= ↂ.T.main.name>>'s rigid <<n _t "cock.n">>. Staring at <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>, you're struck with the overwhelming urge to have a taste. Gripping your thumb and index finger around the base of <<n _t "hisher.q">> <<n _t "cock.n">>, you move your face in close, enjoying the musky aroma of <<n _t "hisher.q">> <<n _t "cock.n">>. You hear <<= ↂ.T.main.name>> make a long, low sound in the back of <<n _t "hisher.q">> throat, as the tip of your tongue makes wet contact with the very base of <<n _t "hisher.q">> prick. Eyes locked on <<n _t "hisher.q">> <<n _t "cock.q">> manhood, you slowly pivot your head upward. Your wet tongue leaves a gleaming trail as it navigates its way up <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>, as you breathe in deeply with your nose, enjoying having your senses of taste and smell both filled with nothing but <<= ↂ.T.main.name>>'s <<n _t "cock.n">>. Finally, your tongue makes the complete journey, and you flick the tip of it around the sensitive folds of skin where the head of <<n _t "hisher.q">> <<n _t "cock.n">> meets the <<n _t "cock.n">>.`,
      ],
      lesbian: [
        `You give in to curiosity and kneel in front of her, curious to know the taste of <<his>> cock, you grab it and start giving some initial licks. The scent is a mix between the masculine and manly scent, and the feminine and floral scent of the rest of <<his>> body, <<name _t>>'s sensitivity seems greater at this point although, with each lick you get closer and closer to the top of the cock, making with that she starts to moan more intensely and release more vaginal fluids that run down <<his>> legs. The skin looks very smooth, warm and you soon get lost in your little submissive fun.`
      ],
      public: [
        `You slowly and quietly kneel in front of <<name _t>>, unable to look away from <<his>> cock, you feel deeply hot with the situation and soon you grab the hot, pulsating piece of meat and start serving it. You lick it, starting at the base of it, being able to feel every pulsating vein in every touch, the incredibly masculine odor makes your vagina warm up and get wet, as you go until you reach the head of the <<n _t "cock.n">> you can hear <<his>> grunts intensifying , and when you reach the top, sucking the cock's head, he is forced to contain <<his>> own moans with <<his>> hand.`
      ],
      openPublic: [
        `Your audience seems to swarm when you kneel in front of him and grab the <<n _t "cock.n">> upright with your hand, the sensation of having eyes watching each of your movements makes you feel more liberated, dirty and aroused. You smile to yourself when you slowly start to lick <<his>> cock, feeling the intense male scent invade your body, passing through every inch of soft skin as you serve <<name _t>>. When you get to the top, you suck the <<n _t "cock.n">> head intensely, causing him to loud scream, you grab the cock with both hands and just serve it like a dirty little bitch, you do a little show for the spectators, making you feel very hot.`
      ],
      nonCon: [
        `You obey <<name _t>> and kneel in front of him when he indicates the cock, you fix your eyes on it, and in spite of everything you start to feel controlled by your arousal and grab it tightly before you start licking, accepting the submissive situation you are in. The intense masculine scent is intoxicating and you start to feel hotter and hotter, minute after minute, while you gently serve the piece of hot meat in front of you. Soon you start to get as dirty as a little bitch, I sit carried by your arousal, you smile to yourself when <<name _t>> starts to grunt with pleasure as you lick and suck the head of <<his>> cock intensely, feeling every pulse, yours body gets ready for the next step.`
      ],
      romantic: [
        `You smile at him, he nods positively when you kneel in front of him, then fix your eyes on the throbbing <<n _t "cock.n">> and, grabbing it with your right hand, starts licking it slowly. With each touch, you feel the heat emanating, the intense and masculine smell fills your insides with each breath, warming your vagina and making you feel a deep and strong desire for fuck. You pay special attention to the <<n _t "cock.n">>'s head, the most sensitive spot and amid <<name _t>>'s grunts of pleasure.`
      ],
      risky: [
        `You kneel in front of <<name _t>>, fixing your eyes on the <<n _t "cock.n">> and <<his>> balls, you can't get the thought of getting pregnant out of your mind, which makes you feel a mixture of worry and pleasure. However, you are controlled by your arousal, and you start to serve the <<n _t "cock.n">> with a huge hunger with each lick. Knowing that this is the <<n _t "cock.n">> that can get you pregnant, you feel almost ecstasy and a hint of concern, after a few minutes but you are burning with desire, finishing licking the cock head while <<name _t>> grunts.`
      ],
      preg: [
        `You hover in front of the erect and pulsating cock, fixing your eyes on it and kneel down and grab it, feeling the intense and masculine odor. The balls pulsate slowly below that, you are unable to take your eyes off the cock that may be about to get you pregnant and smile to yourself at the prospect, then you begin to lick it with enormous desire in each of your movements, if focusing entirely on serving <<name _t>> by licking every inch of smooth, warm skin. When you reach the top, you go around the head of the penis several times, it grunts in pleasure and you discover the most sensitive region of the cock, you persist in it until it almost cum, but it does not make it come now, saving its swimmers to their task within you.`
      ],
      isPreg: [
        `You kneel in front of <<name _t>>'s erect cock, feeling especially mischievous and aroused because of the pregnancy, you hold the <<n _t "cock.n">> tightly and, being able to feel every pulse of it and the heat emanating from the hot piece of meat, you start to lick it off with a great hunger. The strongly masculine scent that exudes from it, the warm and soft texture, and your hormones contribute to making you a cock hungry little bitch. You lick every part of it, paying attention to the most sensitive parts and being guided by <<name _t>>'s grunts of pleasure, who at each touch in these sensitive regions, look at you with a fury in their eyes, as if they were about to force you all fours and fuck you like a bitch in heat.`
      ],
      queen: [
        `You take the lead and kneel down, fixing your eyes on <<name _t>>'s erect cock, which, deciding to let you serve, just makes room for you to start. You take the conclusions while analyzing, touching and rubbing the cock a little, you are beginning to desire a bigger <<n _t "cock.n">> that is able to fully satisfy you, although you start to lick that piece of meat in the hope of getting some fun. For several minutes, you take care of licking every inch of smooth, warm skin, and you can feel your mate's pulse speed up as you go along serving it. Despite being dissatisfied with the size of that cock, you feel more and more aroused, the intoxicating smell invades your body, which begins to prepare for a real fuck.`
      ],
      sub: [
        `You kneel in front of <<name _t>> and, looking at the <<n _t "cock.n">> in front of you with great interest, start to touch it and smell the intense smell that emanates from the warm and soft meat; You lick your lips feeling your desire increase and soon you are licking the base, covering the entire length of the <<n _t "cock.n">> to the top, where you pay special attention, in each touch you can feel <<his>> pulse against your skin. <<name _t>> moans while you serve him, the feeling of submission fills and satisfies you, also warming up your vagina that gets ready for the eminent fuck.`
      ],
      dom: [
        `You push <<name _t>> back, and kneeling in front of him you fix your eyes on <<his>> cock. You bite your lip in perspective, when you touch it it is very hot, pulsating but soft, the sensation is pleasant and soon you start to lick it, serving it at the same time that you satisfy your desire to be in control of the situation. The heat and smell that emanates from it quickly makes you feel hotter, the instinct for submission and the desire for dominance come into conflict while you serve it.`
      ],
      degrade: [
        `You stare at <<his>> cock, drawing your conclusions, but you feel immediately hot and naughty and give it a little slap before you declare. Look at that ... Aren't you ashamed to show something so small and pathetic? You grab the <<n _t "cock.n">> and kneel, starting to lick it while you see <<name _t>>'s frustrated expression because of your words, <<his>> reaction makes you feel ecstasy and it pushes you to voraciously lick the pulsating and hot cock, you grab it the base of it and lick from the base to the top, feeling like a real slut bitch.`
      ],
      slut: [
        `With <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> so close you can't help but breath in deeply through your nose as you stare at it hungrily. Having a <<w cock.n>> so close makes it hard to hold yourself back. You extend your tongue, reaching out to lick the tip bobbing in front of you. You start underneath, dragging your tongue wetly upward over <<his>> slit and over the top. You savor the delicate flavor mixed with a hint of precum, but the taste only amplifies your hunger. Greedily you press most of your tongue against the very base of the <<n _t "cock.n">>, the tip of your tongue pressing against <<his>> <<n _t "ballsack.n">>. After a moment's pause you start dragging your tongue upward slowly, savoring the moment as you taste each millimeter.`,
      ],
      bimbo: [
        `You look at the <<n _t "cock.n">> in front of you, then you feel unable to contain your relentless hunger for cock and kneel in front of the hard, pulsating piece of meat, then you lick your lips and start licking it. Savoring every inch of moist skin, the scent is highly masculine and intoxicating for you. Your mind is totally focused on the art of licking centimeter after centimeter, from the base to the top, pink and pink, each moment in contact with that <<n _t "cock.n">> leaves you more and more immersed in your uncontrolled desire for fuck.`
      ],
    },
    kissCock: {
      standard: [
        `You stare at <<= ↂ.T.main.name>>'s <<n _t "cock.n">>. It pokes out rigidly from <<n _t "hisher.q">> hips, <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> standing at attention in front of you. Wetting your lips thoroughly with your tongue, you lean your head in close and plant a gentle kiss against the head of <<n _t "hisher.q">> <<n _t "cock.n">>. Your mouth lingers for several seconds, as you make sure that the spot where your lips meet <<n _t "hisher.q">> <<n _t "cock.n">> is thoroughly saturated with your saliva. As you pull away and see the light gleaming where your mouth had been, you make sure to let out a long, hot breath. <<= ↂ.T.main.name>> gasps as <<n _t "heshe.q">> feels your warm exhale against the dampened surface of <<n _t "hisher.q">> hard <<n _t "cock.n">>. <<name s>> watches as <<n _t "hisher.q">> manhood twitches with each impact of your lips against its taut surface.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: [
        `You stare lovingly at <<= ↂ.T.main.name>>'s <<n _t "cock.n">>. It pokes out rigidly from <<n _t "hisher.q">> hips, <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> standing at attention in front of you. Wetting your lips thoroughly with your tongue, you lean your head in close and plant a gentle kiss against the head. Your mouth lingers for several seconds, as you pucker and kiss it over and over. As you pull away and see the light gleaming where your mouth had been, you make sure to let out a long, hot breath. <<= ↂ.T.main.name>> gasps as <<n _t "heshe.q">> feels your warm exhale against the sensitive surface of <<n _t "hisher.q">> hard <<n _t "cock.n">>. You watch intently as <<n _t "hisher.q">> manhood twitches with lust. You love this <<n _t "cock.q">> <<n _t "cock.n">> so much, and by the time you're done raining kisses on it, there's no way that <<= ↂ.T.main.name>> doesn't see the depth of your affection.`,
      ],
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: [
        `You stare worshipfully at the <<n _t "cock.s">> <<n _t "cock.n">> bobbing rhythmically in front of you. Having a real life copy of the thing that occupies so many of your thoughts only <<if $AW.metric>>centimeters<<else>>inches<</if>> away is a profound--almost religious--experience for you. @@.mono;Gawd I luv cocks!@@ Though of course, your mind is incapable of expressing how you feel. Instead you lean forward and plant a kiss on the very tip, pausing for a moment before opening your <<p lips.q>> lips and allowing part of the head to slip inside your mouth. Your eyes closed, you passionately use your tongue to feel every detail, as if sharing an open mouth kiss with a lover.`,
      ],
    },
    exploreVulva: {
      standard: [
        `Spreading open <<his>> <<n _t 'vulva.n'>> with your mouth, you extend your tongue to start exploring the soft crevice of <<his>> <<n _t 'curwet.q'>> <<n _t 'vulva.n'>>. Taking a breath and holding it as if preparing to dive underwater, you push your face closer. <<if ↂ.sex.npcWetness[ↂ.sex.target] > 8>>Ignoring the nectar being smeared on your face by <<his>> <<n _t 'vulva.n'>>, you<<else>>You<</if>> begin a gentle study with your tongue, almost languidly tasting every succulent fold before you. `,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    suckCockHead: {
      standard: [
        `Taking the base of <<= ↂ.T.main.name>>'s <<n _t "cock.n">> in hand, you raise it up and bring <<n _t "hisher.q">> head close to your face. Parting your lips slightly, you take a deep breath before pressing your mouth down on the <<n _t "cockhead.n">> of <<= ↂ.T.main.name>>'s <<n _t "cock.q">> <<n _t "cock.n">>. <<= ↂ.pc.body.eyeColor>> eyes closed in sensual concentration, you begin working your tongue around the swollen glans filling your hot and eager mouth. A heated moan escapes <<= ↂ.T.main.name>>'s throat as <<n _t "heshe.q">> watches you lovingly slurp on <<n _t "hisher.q">> <<n _t "cockhead.n">>, the nerve endings clustered at the very tip of <<n _t "hisher.q">> <<n _t "cock.n">> sending waves of sensations directly to the pleasure center of <<n _t "hisher.q">> brain with every swirl of your tongue. All while you make muffled "mmm" noises, feeling the hot splash of <<n _t "hisher.q">> precum against your tongue and happily swallowing down every last drop of <<n _t "hisher.q">> arousal.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: [
        `Grasping <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> in your hand, you lean in and suck it into your mouth until you've engulfed the head. You continue sucking gently as you run your tongue over the sensitive tip of <<his>> <<n _t "cock.n">>. You feel it throb slightly between your lips and your tongue is greeted with a new flavor as a small amount of pre dribbles from <<his>> urethra. @@.mono;It's so rich... I bet there's sperm in this stuff too...@@ The thought sends a shiver of excitement through you as you continue to suck on <<name s>>'s <<n _t "cock.n">>.`,
      ],
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    strokeVulvaTongue: {
      standard: [
        `Parting your <<p lips.q>> lips, you reach out with your tongue to touch the bottom of <<his>> <<n _t vulva.n>>. Slowly, tantalizingly, you work your way up the line of <<his>> <<n _t "labia.n">>, teasing <<his>> <<n _t wet.q>> flesh. <<if ↂ.skill.oral < 50>>You finally reach the apex<<else>>You can sense <<his>> muscles tensing in anticipation as your reach the apex<</if>>, your tongue glancing across the sensitive bud waiting there. Moving back down you begin a regular stroke, licking upward with your tongue through the middle of <<his>> <<n _t wet.q>> <<n _t vulva.n>> before dragging it over <<his>> <<n _t "clit.n">>. You keep a steady pace that’s punctuated by the soft shudders of <<= ↂ.T.main.name>>’s growing arousal.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    suckCockInOut: {
      standard: [
        `Gripping <<n _t "hisher.q">> <<n _t "cock.n">> in one of your hands, you angle it upwards, putting it at just the right angle for what you have planned for it. Pressing your lips down onto <<n _t "hisher.q">> <<n _t "cockhead.n">>, you let your saliva drip out, to drip down onto <<him>> and lubricate <<n _t "hisher.q">> <<n _t "cock.n">>. Parting your lips further, you allow <<n _t "hisher.q">> <<n _t "cockhead.n">> to enter into your mouth, enjoying the taste of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> against your tongue. Slowly, teasing <<him>> just a little, you slide your mouth down around <<n _t "hisher.q">> <<n _t "cock.n">>, <<if ↂ.T.body.cock.length > 50>>stopping only when you feel the tip of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> starting to enter your throat.<<else>>until you have <<n _t "hisher.q">> entire <<n _t "cock.n">> in your mouth, down to the base.<</if>> Pulling your head back, you only allow yourself a second to catch a breath before ingesting <<n _t "hisher.q">> <<n _t "cock.n">> again. This time you keep it in for longer, working your head around between <<n _t "hisher.q">> legs and moving <<n _t "hisher.q">> <<n _t "cock.n">> around the hot interior of your mouth. Soon the air is filled with the wet sound of your sloppy, enthusiastic cock-sucking, along with <<= ↂ.T.main.name>> strained grunts as <<n _t "heshe.q">> watches you eagerly attack <<n _t "hisher.q">> <<n _t "cock.n">> with your mouth, leaving it dripping with your spit.`,
      ],
      lesbian: [
        `You kneel down to her, and grab <<his>> <<n _t "cock.n">> with curiosity in your eyes, you want to taste a girl's cock. When you put it on your lips, you can feel the lighter, floral scent mixed with the dense masculine scent, as you sink the <<n _t "cock.n">> upright and hot, making it bud, you can feel the heat emanating from it and the salty and smooth texture. When it is totally inside your mouth you feel the pulse, and a heat starts to build up inside you, heating your vagina, after a few seconds you start to release the cock, ending with a lick on the head of it.`
      ],
      public: [
        `Glancing around and hoping that nobody notices what you're about to do, you take hold of <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> with one hand and quickly take the <<n _t "cockhead.n">> into your mouth. Squeezing the <<n _t "hardness.q">> <<n _t "cock.n">> between your lips and pressing against the underside with your tongue, you begin bobbing your head. You take it into your mouth until it reaches the back of your throat, and then pull away until the crest of <<his>> head passes your lips. You move at a brisk pace, more concerned with keeping it brief than actually pleasing your partner. Still, <<he>> seems to enjoy your efforts, if the throbbing of <<his>> <<n _t "cock.n">> is any indication.`,
      ],
      openPublic: [
        `Feeling especially warm and mischievous with onlookers watching you, you kneel down and grab the upright, pulsating <<n _t "cock.n">> with your hand. You take it to your mouth and, feeling the highly masculine aroma, you press it on your lips, slowly and deeper and deeper, you swallow it down to the base, then feeling the salty taste and the heat emanating from the pulsing piece of meat inside from your mouth, all this makes you feel deeply aroused, your vagina begins to drip slightly preparing for the next fuck until you allow it to come out slowly, ending with a kiss on the bulbous head of <<his>> cock.`
      ],
      nonCon: [
        `You kneel in front of <<name _t>>, without much choice, you decide to let yourself be carried away by the growing arousal inside you and grab <<his>> erect cock, allowing it to start sinking into your lips. The smell is densely masculine, the piece of meat is smooth, pulsating and warm. You sink it deeper and deeper into the base, so you can feel it pulsing. The smell starts to invade your body and warm your vagina when you slowly release the cock, stopping at your head when you look at it, and give it one last lick.`
      ],
      romantic: [
        `You kneel in front of <<name _t>>, smiling at him, you decide to let yourself be carried away by the growing arousal inside you and grab <<his>> erect cock, allowing it to start sinking into your lips. You pay attention to <<his>> gaze and <<his>> moans, which intensify as you sink it into your mouth, soon reaching the base, being able to feel <<his>> body pulse increase, you become more and more aroused and start to release the cock, when you get to the top of that, you make a final suction that gets a grunt of pleasure out of him.`
      ],
      risky: [
        `You kneel in front of <<name _t>>, fantasizing about the dangerous sex you are going for, you decide to let yourself be carried away by the growing arousal inside you and grab <<his>> erect cock, allowing it to start sinking into your lips. You let the arousla control your body, and start teasing <<name _t>> by kissing the <<n _t "cock.n">> and allowing it to sink into your mouth, inch after inch until you swallow it down to the base. <<his>> groans of pleasure indicate your success, after a few moments of feeling the densely masculine aroma, the heat emanating from it and the salty taste, you allow it to come out of your mouth to repeat the movement, teasing <<name _t>> more and more.`
      ],
      preg: [
        `You take <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> into your mouth, sucking gently as you rub your tongue along the underside. You begin a steady motion with your head, allowing it to rub against your tongue as you drag as it makes short strokes inward and outward in your mouth. You hope to <<print either("prime the pump","get <<him>> worked up","help <<him>> build up a big load")>>, but you can't help but be concerned that <<he>>'ll cum too soon. @@.mono;Okay <<name>>, you'd better not cum until you're in my <<p "pussy.n">>!@@`,
      ],
      isPreg: [
        `You kneel in front of <<name _t>>, feeling the pregnancy set you on fire with a powerful libido taking over your pussy, you decide to let yourself be carried away by the growing arousal inside you and grab <<his>> erect cock, allowing it to start sinking into us your lips. You quickly swallow <<name _t>>'s cock, feeling it sink to the base, you taste for a few seconds the taste, the warm and salty texture of the piece of meat inside your mouth, then letting it out and giving a small kiss on the tip . <<name _t>> smiles at you when you repeat the movements, seeing that you are especially naughty.`
      ],
      queen: [
        `You kneel in front of <<name _t>>, grabbing <<his>> <<n _t "cock.n">> and, feeling dissatisfied with <<his>> size, you fantasize about an even bigger cock. You kiss the tip of it, then let the <<n _t "cock.n">> sink in your mouth, feeling the masculine scent, the salty and dense texture of the pre-seminal liquids, you soon reach the base. After a few seconds you start to slowly release the cock, listening to <<name _t>>'s moans, you end up with a strong hickey on the head of it, just to start the movement again.`
      ],
      sub: [
        `You kneel submissively in front of <<name _t>>, looking into <<his>> eyes as if indicating that you are going to serve him, he smiles at you giving you full access to the cock, you grab it without being able to take your eyes off it. You kiss the hot, pulsating piece of meat, allowing it to sink slowly into your lips, smelling the thick, masculine smell and the taste of pre-seminal liquids, salty and thick. You let it sink to the base, and after a few seconds listening to <<name _t>>'s moans of pleasure you let it come out of your mouth, kissing the head of the penis when it's out, just to start the movement again.`
      ],
      dom: [
        `You raise your arm, forcing <<name _t>> to lie down, so you align yourself with <<his>> <<n _t "cock.n">> in a dominant motion, albeit with <<his>> permission when he smiles at you. You bite your lip, unable to take your eyes off <<his>> cock, and grab the throbbing piece of meat in front of you, feeling it sink slowly into your mouth and down to the base. You keep it deep, savoring the masculine, salty taste of pre-seminal liquids while listening to <<name _t>>'s grunts of pleasure as you serve him. Some time later, you let it go, releasing the cock slowly, in a sensual movement, repeating the movement a few times.`
      ],
      degrade: [
        `You kneel in front of <<name _t>>'s cock, just to smirk at it and give it a little slap. @@.pc;Aren't you ashamed to show it? You need to increase this thing, it's a joke. Hah@@ You then grab the cock, grabbing it slowly and feeling, inch by inch, that it sinks to the bottom of your throat. The taste is hot, salty and thick, typical of male pre-seminal liquids, the experience warms you up and after a few seconds you start to release the cock, feeling naughty and hot, you repeat the movement a few times.`
      ],
      slut: [
        `You kneel in front of the upright and hot cock, smiling to yourself happy to serve like a little whore you are, you grab it with one hand and give an initial kiss to the hot meat, feeling it sink into your mouth slowly down to the base. You suck it inside your mouth, the suction causes strong waves of pleasure to <<name _t>>, who occasionally moans while you serve <<his>> cock. The masculine and dense smell makes you more and more aroused, you then allow it to slowly come out of your mouth to repeat the movement several times, taking the cock to the limit.`
      ],
      bimbo: [
        `You chuckle at yourself while staring at the erect cock, kneeling for it, you grab it with great enthusiasm and snap, allowing the <<n _t "cock.n">> to slide across your lips deeper and deeper into your mouth until it reaches the base. <<name _t>> moans as you keep the <<n _t "cock.n">> in, sucking it intensely to taste the salty taste of the pre-seminal liquids, the heat emanating from it and the smooth, warm texture make your vagina wet with the arousal. You soon allow it to come out, but only to repeat this movement several times.`
      ],
    },
    lickClit: {
      standard: [
        `Using the tips of your fingers, you gently expose the delicate flesh of <<his>> <<n _t 'clit.q'>> <<n _t 'clit.n'>>. A low moan escapes <<= ↂ.T.main.name>>’s lips as you give it a few quick flicks with the tip of your tongue, <<his>> hips shuddering lightly at the sudden contact. You begin rubbing your tongue back and forth across the sensitive button, slowly increasing the intensity until most of your tongue rubs against it with each stroke. You quickly find a rhythm, dragging your tongue in different directions as if tracing imaginary shapes; all the while you can feel the tension of <<his>> muscles slowly building as <<his>> pleasure mounts.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    rubAgainstTarget: {
      standard: [
        `Moving in close, you press yourself against <<n _t "himher.q">>, putting as much of your nude body against <<n _t "hisher.q">> as you can manage. You moan as you move your bare, <<p "tone.q">> frame against <<n _t "hishers.q">>, the flesh of <<n _t "hisher.q">> <<n _t "fat.q">> body pressing against yours. You make sure to push your <<p breasts.n>> into him, loving the feel of your <<p nipples.n>> rubbing against <<n _t "hisher.q">> <<n _t "chest.n">>.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: [
        `Pressing your body to <<name s>> you grind your <<p "tone.q">> body against <<his>> moaning and panting. Losing last traces of dignity you desperately hump <<name s>> body like a bitch in heat trying to absorb <<his>> odor and show your devotion while your <<p breasts.n>> stroke over <<him>>.`,
      ],
      dom: "none",
      degrade: "none",
      slut: [
        `Getting close to <<name s>> and pressing your <<print either('<<p "tone.q">>','<<p "fat.q">>')>> body against <<him>>, you position yourself so that you can grind your <<p "curwet.q">> <<p "vulva.n">> against <<him>>. You waste no time and start grinding your <<p "pussy.n">> against <<him>>, the motion of your body also causing your hard <<p "nipples.n">> to drag across <<his>> <<n _t "skincolor.q">> skin in a delicious fashion.`,
      ],
      bimbo: "none",
    },
    grindVulvaAgainst: {
      standard: [
        `Moving in close to <<= ↂ.T.main.name>>, you press the juncture between your legs forcefully against <<n _t "hisher.q">> thigh. The pressure of <<n _t "hisher.q">> leg against your <<p vulva.n>> sends a giddy buzz through your body, and soon you begin moving your hips up and down against <<him>>, the friction against your naked <<p pussy.n>> causing it to drip your horny juices all over <<n _t "hisher.q">> thigh.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: [
        `You get closer to <<name s>> and sit on <<his>> thigh. Looking <<him>> in the eyes with a touching expression on your face you start grinding back and forth against <<him>>. Stripped of any remaining dignity you hump <<his>> thigh like an animal in heat smearing your moisture all over <<his>> skin.`,
      ],
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    embrace: {
      standard: [
        `You maneuver yourself closer to <<= ↂ.T.main.name>>, the pace of your breathing increasing slightly as you feel <<him>> near to you. You're inches away now, and you can almost feel the heat radiating off <<n _t "hisher.q">> <<n _t "tone.q">> body. Your arms move slowly around <<n _t "hisher.q">> waist and you press your palms into <<n _t "hisher.q">> back, enfolding <<him>> into a soft embrace. You can feel <<= ↂ.T.main.name>>'s own arms around your neck, and you rest your head against him, warm and content.`,
      ],
      lesbian: [
        `You approach her, deciding to have a brief and calm moment with <<name _t>>, you wrap your arms around <<his>> neck and hug <<his>> lovingly. She returns the hug, and soon you are involved, you can feel the warmth of <<his>> body and the intensity of the hug as she caresses your body. You can feel <<his>> heart beating quickly though, <<his>> hard nipples and the moisture in <<his>> groin are indicating that <<his>> arousal has not dropped at all.`
      ],
      public: [
        `You quietly approach <<name _t>>, then slowly wrap your arms around <<his>> neck, hugging him in a quiet moment of contained sexual tension. Although he is still impatient, and returns the hug but massages your body with special attention to your buttocks. You smile to yourself as you feel the heat emanating from <<his>> body, realizing that you are making him crazy with lust.`
      ],
      openPublic: [
        `You quietly approach <<name _t>>, then slowly wrap your arms around <<his>> neck, it's a short break for onlookers who expected more assertive action. But you feel it envelop you in return to the embrace, so massaging your butthole, causing the calm embrace to form in a bold massage and making you moan a little.`
      ],
      nonCon: [
        `You decide to accept this and slowly wrap your arms around <<name _t>>'s neck, signaling your submission and acceptance, he then returns the hug and wraps <<his>> arms around your body kissing your neck and causing a wave smooth pleasure around your body. You groan as he does this, starting to surrender to your growing arousal, taking care of your body, while he continues to prepare your body for the eminent fuck.`
      ],
      romantic: [
        `You smile at him, then approaching <<name _t>> and wrapping your arms around <<his>> neck you decide to have a brief calm moment to savor the moment. He returns the hug and presses you against <<his>> body, you feel the warmth emanating from <<his>> skin, the masculine scent exhaling from him and soon he starts kissing your neck, making you burn in lust with the intense connection you are creating with him and the eminent fuck on the horizon.`
      ],
      risky: [
        `You get close to <<name _t>> and, deciding to get a quiet moment before you fuck, you wrap him in a hug. He smiles at you and then returns it, hugging you tightly and pressing your body against his, you feel the bodies share the heat and the male scent fills you, who feels deeply aroused thinking about the risky situation to get pregnant in which you're going, it's a hint of worry that fills you with fierce lust.`
      ],
      preg: [
        `You smile to yourself before wrapping <<name _t>> in a slow but warm embrace. He starts whispering some bold and romantic words in your ear, praising your body. When he starts to massage your vagina, feeling <<his>> hands caressing your skin, <<his>> masculine scent and the warmth of <<his>> voice make you feel a deep desire for sex, your maternal instinct is powerful and linked to your libido, you has a deep desire to become pregnant and has the prospect of being successfully fertilized.`
      ],
      isPreg: [
        `You approach <<name _t>> and, as your pregnant belly allows, you hug him, wrapping your hands around <<his>> neck. He whispers gallantry to you, you can smell <<his>> strongly masculine scent and the warmth of <<his>> words in your ear, you feel deeply aroused and the moment he starts massaging your body, you feel a growing desire to have the <<n _t "cock.n">> of him touching your vaginal depths.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You decide to calm your mind and have a moment of peace with <<name _t>>, then you approach him and wrap him in a warm hug. He gives it back, wrapping <<his>> arms around your body and massaging your skin, still fascinated with your body, despite the stimuli, you are frustrated and disappointed by your lover's little cock, knowing that it will hardly be difficult for you. to satisfy. @@.mono;This shit penis is not going to make me come... I don't know if I want to continue with this, what a shame!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You take a deep breath and try to calm your mind, looking at <<name _t>> you approach him and wrap your lover in a loving embrace. After a few seconds the heat increases and begins to be shared between the bodies, then you feel his erection below you, his dick is as hard as iron and although it has medium and satisfactory proportions, you can't help feeling a little of disappointment. @@.pc;This is good... I like it when- Ohh!@@ You feel his naughty caresses in your most sensitive regions, teasing you. @@.pc;Heh... I'm going to put your meati stick in a big test, I want to feel how deep it can get...@@`;
        } else {
          // Magnificent!
          return `You take a step closer to <<name _t>>, breathing calmly and trying to calm your body. He quickly takes the lead and wraps you in a tight hug, realizing that you were going to do this, his attitude is welcome though. Quickly <<name _t>> start stroking your pussy, playing with your love hole and throwing a mischievous smile at you while you moan. His over-sized cock is against your skin, pulsing intensely just in the hopes of fucking your pussy as soon as you beg for it. @@.mono;Uh... This is going to be fun... This thing is going to destroy my pussy, I can't wait for it!@@`;
        }
      },
      sub: [
        `You slowly approach him and embrace him in a calm embrace, trying to enjoy this moment and calm the lust within you, but <<name _t>> has other plans. You feel <<his>> hands roaming your body and submissively allow him to take control of your body, just moaning each time he presses the most sensitive points of your vagina, doing everything he can to make you crazy with lust before finally fuck you.`
      ],
      dom: [
        `You smile to yourself thinking about keeping the situation under control, you calm your sexual urges for a moment and hug <<name _t>>, wrapping your arms around him and allowing for a peaceful moment. You can't stop him when he returns the hug and, wrapping <<his>> arms around your body, starts to massage your most intimate and sensitive parts. Dominance is difficult to establish, and you continue in a small switching battle between dominant and submissive.`
      ],
      degrade: [
        `You bite down on the lower lip, feeling your arousal grow nonstop and, wishing to extend that moment, you try to calm your insects and move forward, giving <<name _t>> a soft hug. By wrapping your arms around him, he smiles at you and responds by doing the same, with a special plus of caressing your entire body; After a few moments you start to feel especially naughty again. @@.pc;Hmm... If you're as good at fucking as you are doing it, I'll need to find another cock.@@`
      ],
      slut: [
        `You try to calm your mating instincts, and slowly move forward to embrace your mate, when you wrap your arms around him you can feel the warmth of <<his>> body, the intense and masculine smell and while he returns the embrace, involving your body, you again feel the intense desire to be fucked and subdued like a bitch in heat, which you are. You whisper to him to mistreat your body, and the next few minutes of that warm embrace are marked by bold whispers and slaps in your buttocks.`
      ],
      bimbo: [
        `You jump towards <<name _t>>, wrapping your arms and legs around him, he then returns the "hug" and smiles at you before grabbing your buttctocks, lifting you up. This is a peaceful time when you share warm whispers, feeling and sharing body heat with each other, but you thought you were finally going to be taken and fucked until your mind went blank. @@.pc;Uh... I want to fuck.@@`
      ],
    },
    passionateEmbrace: {
      standard: [
        `Leaping at <<= ↂ.T.main.name>> you attack <<him>> with a powerful hug. Arms wrapped as tight as they’ll go around <<n _t "hisher.q">> back, you give <<him>> a hard, almost desperate squeeze. Almost by instinct, <<n _t "heshe.q">> returns your embrace and holds you close. Just tight enough to be comforting, and just on the edge of painful, <<n _t "hisher.q">> arms enfold you and press you close to him.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: [
        `With a sudden surge of warm feelings towards <<name s>> you hug <<him>> with a loving, hard squeeze. <<name s>> returns it keeping you in <<his>> arms and you just enjoy the moment if intimacy feeling safe and happy in <<name _t>>'s hug. You feel like you could just stand like this forever inhaling <<his>> lovely odor and feeling <<his>> warm skin pressed hard against yours.`,
      ],
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    rockHips: {
      standard: [
        `With <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">> still inside of you, you begin rolling your hips around against <<n _t "hishers.q">>, grinding and pressing against <<= ↂ.T.main.name>>. You can feel <<him>> watching you and make a show of it, reaching up to cup your <<p breast.s>> <<p breasts.n>> as you wiggle your pelvis around. With a slow motion, you move slightly away from <<him>>, dripping <<n _t "cock.s">> <<n _t "cock.n">> emerging slightly from your <<p "vulva.n">>, before pressing forward and burying <<him>> fully inside of you once again. Throwing your head back, your <<p hairl.q>> <<p haircolor.q>> hair flying around your head, you move against <<him>> with reckless abandon. <<n _t "hisher.q">> rigid manhood is dripping wet with your <<p vulva.n>> juices, and your head is swimming with the intensity of the moment as you try your best to make <<n _t "hisher.q">> <<n _t "cocklength.q">> <<n _t "cock.n">> touch every last inch of your inner walls.`,
      ],
      lesbian: [
        `You press your hips against <<name _t>>, even if <<him>> knows how to use <<him>> cock, you bite your bottom lip when pleasure starts to echo through your body. <<= ↂ.T.main.name>> looks at you expecting you to remain a good submissive bitch, pleading for pleasure, and laughs at you as she watches you.`
      ],
      public: [
        `You give up care and ignore the possibility of being caught, you make rhythmic movements pressing your hips against <<name _t>> for more pleasure and generating a constant humid sound. You contain your moans, but the waves of pleasure become more intense, he smiles at you as he watches you, looking satisfied.`
      ],
      openPublic: [
        `At that moment you forget about the eyes watching you and then you totally focus on the activity happening in the middle of your legs, wanting a greater intensity, you move your hips against <<his>> body. Soon you start to moan more intensely giving a little show to the spectators watching you, like a bitch in heat looking for a creampie.`
      ],
      nonCon: [
        `Although this is not a normal relationship, you are gradually becoming lustful and your vagina is hot. You want to be fucked more intensely and soon you lose control of your body and start a series of rhythmic movements, pressing your hips against <<name _t>>'s body in search of more pleasure.`
      ],
      romantic: [
        `You share the pleasure with <<he>>, both moaning together and enjoying each other. <<name _t>>'s rhythmic movement is soon not enough for you though, who begins to propel your hips against <<he>>, in the search for a more intense fuck. You start to moan with the waves of pleasure, he immediately laughs when he sees your expression.`
      ],
      risky() {
        let out = `You start to rock your <<p "hips.s">> hips in time with the thrusts from <<name s>>'s <<n _t "cock.n">>. `;
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn) {
          // condom changes text, see if player wanted it.
          if (ↂ.sex.flag.askedCondom && !ↂ.sex.flag.triedRemoveCondom) {
            if (ↂ.pc.mutate.acid) {
              out += `You hope the extra stimulation will help <<him>> cum before the enzymes in your <<p "pussy.n">> cause the condom to become worthless, but you can't be certain and that excites you. `;
            }
          } else if (ↂ.sex.flag.triedRemoveCondom) {
            if (ↂ.pc.mutate.acid) {
              out += `You hope that the extra speed and friction will help your <<p "pussy.n">>'s enzymes do their job to ruin the condom in time for <<him>> to fill you with <<n _t "cum.n">>. The naughty thoughts only serve to heighten your arousal. `;
            } else {
              out += `You find yourself fantasizing about how the extra speed and friction might just cause the condom to tear or even just weaken enough to allow <<his>> fertile <<n _t "cum.n">> to spill inside you. `;
            }
          } else {
            out += `Even though you know <<he>>'s wearing a condom, you can't help but fantasize about the chance of it breaking under the assault of your hips. `;
          }
        } else {
          // no condom, check about pulling out request etc.
          if (ↂ.sex.flag.askedPullOut) {
            out += `Even though you asked <<him>> to pull out before <<he>> cums inside you, a less rational part of your mind can't resist imagining the extra stimulation from your movements causing <<him>> to cum before he manages to pull out. `;
          } else if (ↂ.sex.flag.askedCumInside) {
            out += `The thought of your impending creampie only serves to amplify your pleasure as you move your hips in time with <<his>> powerful thrusts. `;
          } else {
            out += `While moving your hips this way simply feels good, you also seem to realize on an instinctual level that moving this way is a good way to make sure <<he>> cums inside you rather than trying to pull out at the last moment. `;
          }
        }
        out += `In addition to making the sex more intese, rocking your hips also causes <<his>> <<n _t "cock.n">> to hit just the right spots inside you and send pleasure racing through your body. The exertion causes you breathe more heavily, each exhale a sort of drawn-out moan as you express your pleasure without thinking.`;
        return out;
      },
      preg() {
        let out = `You start to rock your <<p "hips.s">> hips in time with the thrusts from <<name s>>'s <<n _t "cock.n">>. `;
        if (ↂ.sex.npcBC[ↂ.sex.target].condom.worn) {
          // condom changes text, see if player wanted it.
          if (ↂ.sex.flag.askedCondom && !ↂ.sex.flag.triedRemoveCondom) {
            if (ↂ.pc.mutate.acid) {
              out += `You hope the extra stimulation will help <<him>> cum before the enzymes in your <<p "pussy.n">> cause the condom to become worthless, but you can't be certain and that excites you. `;
            }
          } else if (ↂ.sex.flag.triedRemoveCondom) {
            if (ↂ.pc.mutate.acid) {
              out += `You hope that the extra speed and friction will help your <<p "pussy.n">>'s enzymes do their job to ruin the condom in time for <<him>> to fill you with <<n _t "cum.n">>. The naughty thoughts only serve to heighten your arousal. `;
            } else {
              out += `You find yourself fantasizing about how the extra speed and friction might just cause the condom to tear or even just weaken enough to allow <<his>> fertile <<n _t "cum.n">> to spill inside you. `;
            }
          } else {
            out += `Even though you know <<he>>'s wearing a condom, you can't help but fantasize about the chance of it breaking under the assault of your hips. `;
          }
        } else {
          // no condom, check about pulling out request etc.
          if (ↂ.sex.flag.askedPullOut) {
            out += `Even though you asked <<him>> to pull out before <<he>> cums inside you, a less rational part of your mind can't resist imagining the extra stimulation from your movements causing <<him>> to cum before he manages to pull out. `;
          } else if (ↂ.sex.flag.askedCumInside) {
            out += `The thought of your impending creampie only serves to amplify your pleasure as you move your hips in time with <<his>> powerful thrusts. `;
          } else {
            out += `While moving your hips this way simply feels good, you also seem to realize on an instinctual level that moving this way is a good way to make sure <<he>> cums inside you rather than trying to pull out at the last moment. `;
          }
        }
        out += `In addition to making the sex more intese, rocking your hips also causes <<his>> <<n _t "cock.n">> to hit just the right spots inside you and send pleasure racing through your body. The exertion causes you breathe more heavily, each exhale a sort of drawn-out moan as you express your pleasure without thinking.`;
        return out;
      },
      isPreg: [
        `Pregnancy requires more delicate sex, and you are just fucking slowly, although your body is begging for pleasure and a fair fuck. Impatient, you start to press your hips against <<name _t>>, increasing the pace of the fuck, he notices your initiative and smiles at you before increasing the pace and fucking you properly.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `Probably the size of your mate is not satisfying you as you deserve, you start to push your hips against <<his>> body, in a desperate movement to get more pleasure from the <<name _t>> cock. You feel your body frustrated, your wet pussy was looking for an object much bigger than what <<name _t>> has to offer you. @@.mono;If regret could kill... I could die now. This is a shame!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `As <<name _t>> thrusts against your pussy, you gradually feel a great and deep need for a more intense fuck. Your cunt is used to big cocks, and the medium sized dick of <<name _t>> has trouble satisfying you completely. You throw your hips against his penis, in an attempt to intensify the fuck, and repeat this movement again, and again, managing to amplify just a little bit the internal tension in your vagina. @@.mono;Ugh... That could- Oohhh... Be better, but that's okay, I think! I hope he can- Aaahhhh... Make me come!@@`;
        } else {
          // Magnificent!
          return `<<name _t>> continues thristing against you and although his huge cock is enough to make you feel every second of the fuck intensely, and stretching you deeply and touching your cervix, you want more. By throwing your hips against the cock repeatedly, you intensify the fuck and make your pussy have even more work to accept and behave the huge penis entering and leaving quickly, contracting intensely in a desperate attempt to regain its original size and releasing waves of pain and pleasure in your body. @@.mono;Aahhh... THAT! THAT was what I needed!@@`;
        }
      },
      sub: [
        `You beg <<name _t>> to go faster, giving an almost inaudible whisper between your moans of pleasure, you then decide to propel your hips against <<him>> and that gets your message across. He looks at you with a look begging for more fuck, and increases <<his>> pace.`
      ],
      dom: [
        `You wrap your legs around <<name _t>>, and start thrusting your hips against <<him>> in the search for a more intense fuck. You give <<him>> a mischievous smile and mention it. @@.pc;Okay, leave it to me... Aahhh... I'll take care of it, if you don't know- Hmm... Do it correctly, as I like it.@@`
      ],
      degrade: [
        `You look at <<name _t>> with an annoyed look when <<his>> rhythm doesn't seem to satisfy you, you decide to take it in your hands and start to propel your hips towards <<his>> cock, increasing the rhythm to satisfy you properly. @@.pc;Ahh... You really are bad at that, aren't you? Hmm... I need to help you with this.@@`
      ],
      slut: [
        `You want to be fucked harder, you want to feel your vagina have an orgasm around the pulsating <<n _t "cock.n">> fucking you and make you crazy with lust as a whore as you deserve. You start to move your hips against your partner in search of pleasure, you do it at a high pace and soon start to moan, also filling the room with the wet sound of fuck and intense moans.`
      ],
      bimbo: [
        `With <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> inside of you, you can't resist your urge to try and ride it. You begin rocking your hips in time with <<his>> thrusts, resulting in longer, faster strokes. Your <<p pussy.n>> loves it, and so do you. @@.pc;.nop;Oh Em Gee, this is sooo fucking good!@@ Each time <<he>> bottoms out in you with an audible smack you're reminded of why you love cocks so much.`,
      ],
    },
    liftLegsInAir: {
      standard: [
        `Shifting yourself around, you raise your legs into the air. Parting your thighs to give <<= ↂ.T.main.name>> better access to your <<p "vulva.n">>, you shift your weight back to your upper body. <<= ↂ.T.main.name>> sees you lifting and holding your legs apart, eagerly presenting your crotch to him.`,
      ],
      lesbian: [
        `You lift your legs together high, without separating your thighs, giving your vagina full access to it in a graceful and seductive movement.`
      ],
      public: [
        `You lift your legs high, opening this and separating reasonably giving <<name _t>> a wide view of your wet vagina. Provocative, sexy and sensual are appropriate words for the vision of your femininity.`
      ],
      openPublic: [
        `You separate your legs and lift it up in the air, keeping your thighs completely apart, also thinking of giving viewers a wide view of your vagina, you lift your hips a little more.`
      ],
      nonCon: [
        `You lift your legs in the air, separating it and trying to make a move to move <<name _t>> away from you, but it quickly becomes a sencual movement and he positions himself between your legs, having full access and a wide view of your moist vagina.`
      ],
      romantic: [
        `Thinking of pleasing <<name _t>>, you open your legs and lift it in the air to give him a perfect view of your wet femininity. You smile to yourself when he stands between your legs with <<his>> gaze fixed on your pussy.`
      ],
      risky: [
        `Opening your legs wider and shifting your hips forward, you lift your legs into the air. <<if ↂ.T.body.cock.length < 95>>Immediately you can feel the difference as <<name s>>'s body slams perfectly against your <<p vulva.n>>, hilting <<his>> <<print either('<<n _t "cock.s">>','rock-hard')>> <<n _t "cock.n">> even deeper than before.<<if ↂ.T.body.cock.length > 60>> You feel <<his>> <<n _t "cockhead.n">> shoving against your cervix with each thrust.<</if>> <<else>>Immediately you can tell the difference as <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> impacts your cervix more directly, literally repositioning your organs as it shoves your womb deeper inside you. <</if>>The knowledge that <<he>>'ll be able to cum as deep inside you as physically possible combines with the amazing sensations to render you nearly insensate as your legs sway in the air.`,
      ],
      preg: [
        `The desire to get pregnant has been making you fantasize about it since it started, you want to tease <<name _t>> and smile at yourself when you open your legs and lift it up in the air to tease you with the sight of your vagina, hot, wet and waiting for him.`
      ],
      isPreg: [
        `Pregnancy is making you horny, you want to provoke <<name _t>> and smile to yourself when you open your legs and lift it up in the air to tease him with the sight of your pussy, hot, wet and waiting for <<his>> cock.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You open your legs, spreading them apart as much as possible to give <<name _t>> to your femininity, you also have a vision of <<se>> erect penis, and feel a deep desire for it to get bigger, but to your disappointment it’s a tiny stick. Each time you look at it, a feeling of deep dissatisfaction burns you, leaving you less awake and making you wish the sex would just end soon. @@.mono;Shit... How long will he be doing this? I can barely feel that fucked penis!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `Keeping your legs open and raised in the air to give full access to <<name _t>> your pussy, you just enjoy sex feeling each new thrust. You can see and feel his medium sized dick in and out, your pussy totally swallows the average penis without difficulty, naturally adapted to huge cocks. Although your desire was exactly that, you are satisfied with this penis. @@.pc;Hmm... Come on, speed it up- Aahhh! That! I want to feel you touch my cervix... Oohhh!@@`;
        } else {
          // Magnificent!
          return `You lift your legs in the air, to facilitate the work of <<name _t>> while moaning freely as he thrust against your wet pussy. His huge penis does a good job, stretching you every time it enters, touching your depths and launching a constant wave of pain and pleasure into your body. @@.pc;Oohhh.... Don't stop! Do not stop! Hmm... I love it! Aahhh...@@ He grabs your thighs and uses the privileged position to increase the pace, satisfying your demanding arousal.`;
        }
      },
      sub: [
        `You feel deeply aroused thinking about being overwhelmed by him, you part your legs, lift this up into the air and expose your vagina, enhancing your submission to <<name _t>> who then stands between your thighs and smiles while touching your wet pussy.`
      ],
      dom: [
        `You reluctantly spread your legs apart, spread your thighs and lift them up in order to expose your slutty vagina to your mate. Such a submissive position does not please you, but you just swallow your pride and allow him to enjoy the sight of your vagina ready to be fucked.`
      ],
      degrade: [
        `You separate your legs and your thighs, lifting them up and giving <<name _t>> a wide, sensual view of your wet vagina. He admires this as he stands between your legs. @@.pc;So, are you just going to look at this? I expected more from you, come on... Or I'll look for someone else to satisfy me. Hehe@@`
      ],
      slut: [
        `You can't wait to be fucked, you spread your legs apart, spread your thighs and touch your vagina, opening your lip while lifting your feet up and exposing your pink, hot and wet pussy in anticipation of being fucked.`
      ],
      bimbo: [
        `You feel in a hurry to get fucked and spread your legs wide apart, lifting it upwards, exposing your experienced vagina and dripping vaginal fluids waiting for a cock. @@.pc;Come on, fuck me! I need a cock.@@`
      ],
    },
    saySomethingSexy: {
      standard: [
        `@@.pc;Seduce my mind and you can have my body.@@`,
        `@@.pc;I'm yours, <<= ↂ.T.main.name>>. This body, this <<p vulva.n>>, it's all yours tonight.@@`,
        `@@.pc;How many times do you think you can make me cum tonight? Come on, give me everything you've got!@@`,
        `@@.pc;Do you want me, baby? Don't just tell me. Show me how much you want me.@@`,
        `@@.pc;Is that all you've got, <<= ↂ.T.main.name>>? Come on. Make me feel it!@@`,
      ],
      lesbian: [
        `@@.pc;I just want to make your whole face wet with my juices!@@`,
        `@@.pc;I could spend all day between your legs!@@`,
        `@@.pc;Oh babe, your tits are so nice...@@`,
      ],
      public: [
        `@@.pc;Oh just imagine, someone could see us right now!@@`,
        `@@.pc;Mmm, I am soo turned on doing this in public!@@`,
        `@@.pc;Anybody can find us now... and I like it!@@`,
      ],
      openPublic: [
        `@@.pc;Oh my, they are all looking at us... that's hot!@@`,
        `@@.pc;Mmhm, let's make a nice show for our audience hehe.@@`,
        `@@.pc;They all look at us! Damn, this makes me really wet.@@`,
      ],
      nonCon: [
        `@@.pc;Please, don't do it, pleaase!@@`,
        `@@.pc;No, I don't want...@@`,
        `@@.pc;Why are you doing this to me?...@@`,
      ],
      romantic: [
        `@@.pc;I love you so much!@@`,
        `@@.pc;You make me feel so special...@@`,
        `@@.pc;You are the best lover ever, I am so in love with you!@@`,
      ],
      risky: [
        `@@.pc;I want your cum inside me soo hard...@@`,
        `@@.pc;Oh, I can get preggies...@@`,
        `@@.pc;Mmmhm, do you promise I won't get pregnant?@@`,
      ],
      preg: [
        `@@.pc;Yes, make me pregnant, baby!@@`,
        `@@.pc;I soo want to make babies, <<= ↂ.T.main.name>>.@@`,
        `@@.pc;Oh, <<= ↂ.T.main.name>>, my womb is soo ready, let's make some kids!@@`,
      ],
      isPreg: [
        `@@.pc;Fuck my pregnant cunt as hard as you can, <<= ↂ.T.main.name>>!@@`,
        `@@.pc;I know I'm pregnant already but this makes me want you even more...@@`,
        `@@.pc;Ravage my preggy pussy like you mean it, stud!@@`,
      ],
      queen: [
        `@@.pc;I really want to be stretched, come on, shove it deeeep, baby!@@`,
        `@@.pc;It is soo hard and big, I like it so much!@@`,
        `@@.pc;Big cocks are my thing. You won't disappoint me, won't you? You won't disappoint your baby?@@`,
      ],
      sub: [
        `@@.pc;I am all yours, my <<if ↂ.T.main.male>>master<<else>>mistress<</if>>...@@`,
        `@@.pc;I was suuuch a bad girl, <<if ↂ.T.main.male>>daddy<<else>>mommy<</if>>!@@`,
        `@@.pc;You won't punish me for being such a naughty girl, <<if ↂ.T.main.male>>master<<else>>mistress<</if>>?@@`,
        `@@.pc;Feeling you on top of me and in control is the hottest thing ever!@@`,
        `@@.pc;I just want to be used by you tonight. Can I be your personal toy?@@`,
      ],
      dom: [
        `@@.pc;Come on, bitch, I'll give you what you deserve.@@`,
        `@@.pc;Beg me <<if ↂ.T.main.male>>slave<<else>>slut<</if>>! You are such a whore!@@`,
        `@@.pc;Who was a bad puppy, mm? It was you, <<= ↂ.T.main.name>>.@@`,
        `@@.pc;I want to dominate you tonight, slut.@@`,
      ],
      degrade: [
        `Come on, <<if ↂ.T.main.male>>@@.pc;tiny-dick faggot,<<else>>saggy-tits<</if>>, show me that you worth something!@@`,
        `@@.pc;You are such a worthless piece of shit, I don't know why I am still fucking with you. Pity I guess.@@`,
        `@@.pc;<<if ↂ.T.main.male>>Are you into girls at all? I am not that sure anymore, fag.<<else>>You are such an ugly pussy-licking lesbian slut, you know?<</if>>@@`,
      ],
      slut: [
        `@@.pc;Mmm, yeeeas, fuck me hard, fuck me soo hard, <<if ↂ.T.main.male>>daddy<<else>>mommy<</if>>!@@`,
        `@@.pc;I don't ever want you to stop, it feels sooo good!@@`,
        `@@.pc;<<if ↂ.T.main.male>>Pound my little pussy with your big cock daddy!<<else>>I am such a slut for you!<</if>>@@`,
      ],
      bimbo: [
        `@@.pc;I want to get fuckies like sooo much!@@`,
        `@@.pc;Pleease, fuck me, <<if ↂ.T.main.male>>daddy<<else>>mommy<</if>>, uwu!@@`,
        `@@.pc;Gimme some hot action, baby!@@`,
      ],
    },
    whisperInEar: {
      standard: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I want you to lay me out like a floorplan and fuck me in every square inch of this room.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I can't wait to feel you inside me.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I'm so goddamn wet for you right now.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Fuck me, <<= ↂ.T.main.name>>. Fuck me till I scream.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;You think this is good? We're just getting started.@@`,
      ],
      lesbian: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;You are a little cute vixen, aren't you?@@`,
      ],
      public: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I feel so dirty doing this here, where anybody can see us...@@`,
      ],
      openPublic: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Oh, they all can look at us, that's soo dirty!@@`,
      ],
      nonCon: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Please... don't do it to me...@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Ah, you are raping me... please!@@`,
      ],
      romantic: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I love you so much, honey-bunny...@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I have never been so happy with anyone in my life yet...@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I am all yours, love...@@`,
      ],
      risky: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I want your hot cum so much...@@`,
      ],
      preg: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Hey, I think it's my fertile day... I need your help with that, please.@@`
      ],
      isPreg: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;This pregnancy... This is driving me crazy, I really need you now.@@`
      ],
      queen: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Come on, I hope you can handle me... With something this size. Hehe@@`
      ],
      sub: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I am yours, <<if ↂ.T.main.male>>daddy<<else>>mommy<</if>>...@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Please, use me as you wish, abuse me like a little whore I am...@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I was such a bad, naughty girl...@@`,
      ],
      dom: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I would fuck you so hard, little pet...@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;You are mine, <<name s>>. My little toy, my pleasure fuckdoll.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;You will scream for mercy after all the things I'll do to you...@@`,
      ],
      degrade: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;You are such a disappointment.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Such an inadequate, ugly piggy you are, you know it?@@`,
      ],
      slut: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Make this body scream, fuck me, fuck me sooo hard!@@`,
      ],
      bimbo: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Fuck me, sugar<<if ↂ.T.main.male>>daddy<<else>>mommy<</if>>!@@`,
      ],
    },
    putOnCondom: {
      standard: [
        `Feeling worried about getting pregnant, you ask <<name _t>> if he can put on a condom. @@.pc;H-Hey... <<name _t>>. I know this is annoying, but I'm not on the pill, can you put a condom on?@@`,
        `You feel worried about becoming pregnant with <<name _t>>, and ask him for some protection. @@.pc;You know... I'm not on the pill, could you put a condom on?@@`,
        `You feel worried and frustrated, but ask <<name _t>> to put on a condom before he can get you pregnant. @@.pc;I know this is boring, but could you put a condom on? I don't want to get pregnant.@@`
      ],
    },
    pullOffCondom: {
      standard: [
        `<<= ↂ.T.main.name>> feels so good inside you. But you need more. Need to feel the real <<him>> inside of you. Feel <<n _t "hisher.q">> <<n _t "cock.n">> against your inner walls, without anything separating the two of you. There are so many reasons why you shouldn't, but in the heat of the moment you want nothing more than to cast all of those doubts aside. Locking your gaze on <<n _t "hisher.q">> <<= ↂ.T.body.eyeColor>> eyes, you reach down to press a hand against <<n _t "hisher.q">> stomach, signaling without words for <<him>> to pull out of you. <<= ↂ.T.main.name>> is confused at first, not certain why you're putting a momentary stop to <<n _t "hisher.q">> eager thrusts inside of you. But <<n _t "heshe.q">> complies nonetheless, pulling <<n _t "hisher.q">> latex-sheathed <<n _t "cock.n">> out of you. Cocking an eyebrow, you reach a hand down to <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>, fingers finding the edge of the condom and slowly rolling it off. <<n _t "hisher.q">> eyes widen as <<n _t "heshe.q">> realizes what you're doing, but after giving <<him>> a confident nod, <<n _t "heshe.q">> holds still while you roll off and remove <<n _t "hisher.q">> condom. With a dismissive flick, you send it flying away, and a moan escapes your lips as <<n _t "heshe.q">> enters you again. Now with nothing separating <<n _t "hisher.q">> thrusting <<n _t "cock.n">> from your dripping <<p vulva.n>>. <<comment "Unfortunately the writer's take on this action doesn't match the <b>actual</b> action, which is more about pulling off a condom pre-sex and not in the middle of it. (also the NPC can say no!) This was interesting enough that I kept it, but will have to put it with a new action after some editing.">>`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    removeOwnTop: {
      standard: [
        `Reaching for the lower hem of your upper garment, you grab hold with both hands and begin to draw it slowly upward, past your <<p belly.n>> and <<p "breasts.n">> and up over your head, giving a toss of your <<p haircolor.q>> hair as you pull the garment away.`,
      ],
      lesbian: [
        `You grab your top outfit at the base and, thinking about doing a show for her, you take it off in the sexiest way you could think. In a few slow movements, you pass it over your neck and then over your head, slightly messing up your hair when you finally drop it on the floor.`
      ],
      public: [
        `You grab the bottom of your top outfit and, in a slow motion, start pulling it up without attracting attention. Doing whatever you can to make it a seyx movement, you smile to yourself when you drag your piece of clothing, past your neck and then over your head, messing up your hair a little after taking it off your body.`
      ],
      openPublic: [
        `You smile to yourself before grabbing your top piece of clothing by the base, and thinking of making it sexy for the people who are seeing it, start dragging it up slowly and provocatively; After passing it through your breasts, shoulders and then taking it completely out of your body, you drop it on the floor exposing your upper body.`
      ],
      nonCon: [
        `With no choice but to be moved by your growing arousal, you grab your upper clothing by the base and start shyly to take it off your body. Pulling it up, you take it out of your body slowly, gently messing up your hair before you finally have your upper half exposed.`
      ],
      romantic: [
        `You smile at <<name _t>>, before grabbing the base of the upper part of your clothes and, with a smooth and quick movement, you remove it leaving the upper part of your body now exposed and leaving your hair slightly more messy.`
      ],
      risky: [
        `You bite your bottom lip and start removing the top of your clothes, you feel more and more aroused as you move to undress, fantasizing about the probably risky sex you are going to have. When you remove the top of your clothing, dropping it on the floor, you can feel your nipples harden at the prospect.`
      ],
      preg: [
        `You smile at yourself thinking about finally getting pregnant, feeling more intensely aroused, you start to undress and grab the top of your clothes starting to remove it. When you remove the top of your clothing, dropping it on the floor, you can feel your nipples harden at the prospect of finally being impregnated.`
      ],
      isPreg: [
        `Pregnancy is warming up your body more, you feel more and more naughty when then you grab the upper part of your clothes and, with soft and sensual movements, you start to remove it from your body. You extend the little show to <<name _t>>, sensitizing each movement and finally exposing your pregnant belly while leaving the top of your clothes on the floor.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You start to take off the top of the clothes, grabbing the base and dragging upwards, you fancy looking at <<name _t>>. <<his>> <<n _t "cock.n">> seems to make you feel dissatisfied, you wanted to see something bigger, maybe that's the expectation of your fetish and inner desire, but when you finish undressing the top from the body you look at his tiny cock and declare. @@.pc;You... Ahh... For fuck, sake! Cover that shit with something, I don't want to see this tiny dick!@@ You complain, deeply dissatisfied, but your lover seems to be ashamed and irritated by the humiliation.`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You grab the base of your shirt and take it off slowly, if you take your eyes off the <<name _t>> penis. His average size gives you some expectation for sex, the hope of being fucked and having an orgasm, although you are frustrated that he is just a normal dick. @@.pc;Well... I think we're going to have some fun with this. Don't let me down, okay? Heh@@ You tease your lover, throwing him a sultry smile and trying to ignore your little frustration after leaving your shirt on the floor, behind you.`;
        } else {
          // Magnificent!
          return `<<name _t>> caresses his penis, throwing you a malicious smile as you take your shirt off, leaving it on the floor behind you and then facing the huge cock in front of you. @@.pc;This... It's pretty impressive. *heh* I hope you know how to use this tool...@@ You can't contain your high arousal, the desire to feel your pussy receive this big penis and be stretched to the limit overflowing, causing you to feel hot, you lick your lips in the perspective of the coming fuck.`;
        }
      },
      sub: [
        `You start to remove the top of your clothes, grabbing the base and dragging it upwards, you fantasize while staring at <<name _t>>. You feel a growing need and a burning desire to be taken and fucked by a dominant male, hoping that this is going to happen, you already make yourself available to <<name _t>> in the most submissive way possible.`
      ],
      dom: [
        `You start to remove the top of your clothes, grabbing the base and dragging it upwards, you fantasize while staring at <<name _t>> thinking of keeping him under your control. The battle for control is difficult when you are a woman fighting a dominant man, but the prospect of dominating him makes you burn with heat that spreads through your vagina. You soon let the top of your clothes fall to the floor, ready for the next step.`
      ],
      degrade: [
        `You push <<name _t>> to do a little show for him, and start to remove the top of your clothes in a sexy way, so you start to feel especially naughty and tease him. @@.pc;You better control yourself, or you're going to ruin this moment, I don't want to need to find another man just because you don't know how to do a foreplay correctly.@@ You feel your vagina warm up as you continue to degrade him, so you drop your top clothes on the floor, exposing your body.`
      ],
      slut: [
        `Feeling dirty and mischievous, you bite your bottom lip when you start to remove the top of your clothes, thinking about tease <<name _t>> you put the best moves on it. Exposing your breasts, and then passing it over your neck and removing it, slightly messing up your hair, you let the top piece of clothing fall to the floor before continuing.`
      ],
      bimbo: [
        `You are beginning to be controlled by your growing arousal, you grab the base of the top of your clothes and quickly take it off, thinking only of finally being able to be fucked and feeling your dirty pussy being filled with a hot, throbbing cock. Then you leave your top piece of clothing on the floor behind you, thinking about the next part.`
      ],
    },
    removeOwnBra: {
      standard: [
        `You draw your arms behind your back, reaching to undo the hooks of your bra. A quick motion later, and your <<p tits.q>> <<p tits.n>> are bare and exposed, your bra sliding down off your bare upper torso to hit the floor.`,
      ],
      lesbian: [
        `You decide to remove the bra, then grab the hooks from it, then you remove the underwear, leaving your breasts exposed for <<name _t>>. She seems to be interested in your breasts and, unable to take <<his>> eyes off it, she starts to squeeze and play with your nipples.`
      ],
      public: [
        `You decide to remove the bra, your movements are all smooth and very controlled, you are careful not to get anyone's attention, the constant danger of being caught makes you feel even hotter. Then grabbing the hooks of that you immediately remove the piece of underwear, then leaving your breasts exposed for <<name _t>>.`
      ],
      openPublic: [
        `You decide to remove your bra, being watched is a great booster for your arousal, you start to feel like a porn actress and make your movements purposely slower and sensual, then grabbing the hooks of that you immediately remove the piece of underwear , then leaving your breasts exposed for <<name _t>> and other people to see you.`
      ],
      nonCon: [
        `You decide to remove your bra, although the situation is not like normal consensual sex, you start to feel more and more excited and driven to accept it. Then grabbing the hooks of that you immediately remove the piece of underwear, then leaving your breasts exposed for <<name _t>>.`
      ],
      romantic: [
        `You decide to remove the bra, thinking of pleasing <<name _t>>, you put on the maximum sensuality you get in each movement, then grabbing the hooks of it you immediately remove the piece of underwear, then leaving your breasts exposed for <<name _t>>.`
      ],
      risky: [
        `You start to remove the bra, then grab the hooks from it, then you remove the underwear, leaving your breasts exposed for <<name _t>>. Thinking about having risky sex, not sure if you will get out of it pregnant or not, makes you burn intensely with lust and you start to be controlled by your arousal, despite the slight concern about being impregnated.`
      ],
      preg: [
        `You start to remove the bra, then grab the hooks from it, then you remove it, leaving your breasts exposed for <<name _t>>. You feel deeply aroused about going to have sex and, with the possibility of being impregnated, you feel a deep satisfaction from your maternal instinct.`
      ],
      isPreg: [
        `You start to remove the bra, then grab the hooks from it, then you remove it, leaving your breasts exposed for <<name _t>>. Pregnancy is making you extremely aroused, dirty and malicious. You feel a growing and almost uncontrollable need to be fucked, you need an ock inside you as fast as possible.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `You release your hands to take off your bra, grabbing the hooks and dropping it quickly and selflessly. <<name _t>> look at your hungry breasts in his eyes, although you look back and stare at his tiny cock, feeling a deep frustration, almost contempt. @@.mono;Do I really want to do this? I won't be able to feel this shit inside me... Shame!@@`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You grab your bra and decide to take it off, taking your hands to the back of it, and releasing the hooks, you just smile at <<name _t>> and drop it on the floor, exposing your boobs to him. His dick is average, of normal proportions and capable of providing a decent fuck, but does not stretch you over the limit and it makes you feel an interesting mix of lust and frustration. @@.pc;Well, I hope you know how to use your pulsating tool well... Heh I want an orgasm, you know?@@ You step forward, grabbing his penis and feeling the heat and pulsations of it against your hand.`;
        } else {
          // Magnificent!
          return `You decide to take off your bra while looking at <<name _t>>, eager for finally being dominated and fucked by a big, thick dick. There, grabbing the hooks of that, you immediately remove the bra, leaving your breasts exposed to the <<name _t>>. He licks his lips and you can see his animation reflecting on his huge dick, pulsing intensely between his legs and making you feel a deep internal heat, your pussy gets warm and your clit vibrates with the arousal and the prospect of fucking like two rutting animals.`;
        }
      },
      sub: [
        `You decide to remove the bra, then grab the hooks from it, then you remove the piece of underwear in the most provocative way in the perspective that <<name _t>> will take you and fuck you, leaving your breasts exposed for <<name _t>>. The fantasy of being submissively fucked makes your heart beat faster, warming your vagina.`
      ],
      dom: [
        `You decide to remove the bra, then grab the hooks from it, you immediately remove the piece of underwear and constantly thinking about home movement to keep control of the situation, which is not an easy task if you are with a dominant partner, so you leave your breasts exposed to <<name _t>>, the struggle for dominance makes your body warm up quickly though.`
      ],
      degrade: [
        `You decide to remove the bra, then grab the hooks from it, then you remove the underwear, leaving your breasts exposed for <<name _t>>. @@.pc;So... Are you going to stand there looking at them or are you going to act like a man, and take me?@@`
      ],
      slut: [
        `You decide to remove the bra, then grab the hooks from it, then you remove the underwear, leaving your breasts exposed for <<name _t>>. You bite your lower lip feeling your arousal start to slip out of your control, and wrap your arms around <<name _t>>'s neck giving him a quick kiss, before continuing on to the next foreplay step.`
      ],
      bimbo: [
        `You decide to remove the bra, then grab the hooks from it, then you remove the underwear, leaving your breasts exposed for <<name _t>>. As always, all you think about is a cock filling your dirty pussy to the edge, stretching you to the limit to finally satisfy your libido.`
      ],
    },
    removeOwnBottom: {
      standard: [
        `Reaching down to the waistband of your lower garment, you unfasten and slide it down to your ankles exposing your <<p ass.q>> <<p ass.n>>.`,
      ],
      lesbian: [
        `You grab your underwear and, with a subtle movement, you allow it to slide down your legs, then exposing your butt and thighs to <<name _t>>. She seems especially interested and approaches you with a mischievous smile before slapping your buttock.`
      ],
      public: [
        `You grab your underwear and, with a very subtle and silent movement so as not to attract anyone's attention, you allow it to slide down your legs, then exposing your butt and thighs to <<name _t>>.`
      ],
      openPublic: [
        `You grab your underwear and, with a sensual movement to provoke viewers watching you, unable to take your eyes off your butt, you allow it to slide down your legs, then exposing your butt and thighs to everyone.`
      ],
      nonCon: [
        `You grab your underwear and, with a reluctant movement, you allow it to slide down your legs, then exposing your butt and thighs to him. This is not exactly consensual sex, but you are more and more aroused thanks to <<his>> constant teasing and caresses on your body.`
      ],
      romantic: [
        `You grab your underwear and, with a gentle yet sensual movement, you allow it to slide down your legs, then exposing your butt and thighs to him. You smile at <<name _t>>, when he smiles back he approaches you, touching your butt firmly and shaking your buttock.`
      ],
      risky: [
        `You grab your underwear and, with a gentle but sensual movement, you allow it to slide down your legs, then exposing your butt and thighs to him. <<name _t>> approaches you, wrapping you in <<his>> arms and squeezing your buttocks tightly; You fantasize about the risky situation you're in, the prospect of possibly getting pregnant drives you crazy with lust.`
      ],
      preg: [
        `You grab your underwear and, with a quick movement moved by your tall arousal, you allow it to slide down your legs, then exposing your butt and thighs to him. You are unable to take your eyes off <<his>> cock, in the prospect of being fucked, filled and creampied, your heart begins to beat faster and faster yearning for the moment when you will be impregnated.`
      ],
      isPreg: [
        `You grab your underwear and, moving around a little awkwardly because of your pregnant belly, you allow it to slide down your legs, then exposing your butt and thighs to him. The arousal burning inside you is almost out of control, pregnancy is the most powerful aphrodisiac that a woman can experience.`
      ],
      queen() {
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
          // Tiny cock lol
          return `Grabbing the bottom of your clothes, you drop it in a quick, disinterested movement. The <<name _t>> small penis makes you feel a deep frustration and sadness when thinking about the perspective of sex. @@.mono;I don't want to do this to this guy... Look at this, I can't even feel it inside me!@@ You give an irritated look in the direction of the small erect penis, unable to satisfy your demanding demand, although <<name _t>> is totally focused on your body and does not notice your negative reaction.`;
        } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
          // Acceptable...
          return `You let the bottom of your clothes fall to the floor, doing this slowly to expose your butt and your thighs in a very sensual way. You have a hot feeling in tease <<name _t>>, unable to take your eyes off his medium-sized cock, you wonder if that penis can give you pleasure properly, considering your pussy used to dealing with bigger penis. @@.pc;You will need to know how to use this tool correctly... Or you will not be able to make me come. I hope you know how to properly please a woman... Heh@@`;
        } else {
          // Magnificent!
          return `You take your underwear and move in a hurry driven by your excitement and the growing desire to be filled and stretched by a huge stick, you allow it to slide down your legs, then exposing your butt and thighs. You hope that your current partner, with <<his>> big cock, can satisfy your demanding demand, which is not really difficult to happen. You bite your bottom lip unable to take your eyes off his huge meaty stick, the prospect of the coming fuck makes your pussy wetter and wetter.`;
        }
      },
      sub: [
        `You grab your underwear and, moving with a flirty expression to <<name _t>> yearning for him to finally take you, you allow it to slide down your legs, then exposing your butt and thighs to him. You tease your butt at him, teasing <<name _t>>.`
      ],
      dom: [
        `You grab your underwear and slowly allow your bottom piece to fall to the floor, then exposing your butt and thighs to it. Although you feel especially malicious, you still need to take care to contain <<name _t>> so that you don't lose control in the fight for dominance.`
      ],
      degrade: [
        `You grab your underwear and slowly allow your bottom piece to fall to the floor, then exposing your butt and thighs to it. You lift your butt back sensually, without taking your eyes off <<his>> expression, and after a few seconds you mention it. @@.pc;You are not going to do anything? If you want to be just a voyeur, I will need to find a real man to fuck me.@@`
      ],
      slut: [
        `You grab your underwear and, quickly in a single, decisive movement, you drop your underwear down on the floor and expose your butt and your thighs. You lift your butt sensually backwards, thinking of provoking <<name _t>>, he approaches you and grabs your buttocks, teasing you.`
      ],
      bimbo: [
        `All at once, you grab your underwear and allow it to fall to the floor, you are unable to control your arousal and the intense desire to be filled and fucked, the thought of being brutally fucked and finally creampied speeds up your body , making you sweat slightly yearning for brutal sex.`
      ],
    },
    removeOwnPanties: {
      standard: [
        `Your underwear comes off, as you bend down to slide them off your hips <<if setup.sexToys.check("pc", "groin") == true>>with nothing covering your <<p pubestyle.q>> pubes and <<p pussy.q>> <<p pussy.n>>.<<else>>exposing your <<p pussy.q>> <<p pussy.n>> covered by chastity.<</if>> <<if setup.sexToys.check("pc", "clit") !== true && setup.sexToys.check("pc", "groin") == true>>Your clit is out of reach and sight safely covered by a clit shield though.<</if>>`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: [
        `You tug on your underwear forcing it down to your knees exposing your <<if setup.sexToys.check("pc", "groin") == true>> bare <<p pussy.q>> <<p pussy.n>><<if setup.sexToys.check("pc", "clit") !== true && setup.sexToys.check("pc", "groin") == true>> with your clit safely covered by a shield.<</if>>.<<else>>chastity belt.<</if>>With a shy glance you seek <<name s>>'s approval. @@.pc;Do you... like it?@@`,
      ],
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    removeTargetTop: {
      standard: [
        `You wrap your hands around <<= ↂ.T.main.name>>'s back, moving them down <<n _t "hisher.q">> waist to take hold of the bottom of <<n _t "hisher.q">> upper garment. As you pull upward on <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.top>>, <<n _t "heshe.q">> leans forward with <<n _t "hisher.q">> arms raised overhead, allowing you to pull away <<n _t "hisher.q">> shirt and fling it aside, exposing <<n _t "hisher.q">> <<n _t "fat.q">> upper body.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: [
        `You lean forward and grab <<name s>>'s <<= ↂ.T.clothes.outfits.casual.top>>. Tugging it upwards, you remove it over <<his>> head without much consideration for <<his>> comfort. Tossing it away you smile observing <<name s>> <<n _t "fat.q">> upper body.`,
      ],
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    removeTargetBra: {
      standard: [
        `Reaching the buckle of <<n _t "heshe.q">> <<= ↂ.T.clothes.outfits.casual.bra>> you fight to unfasten it for some seconds until the damn thing submits and reveals <<= ↂ.T.main.name>>'s <<n _t 'breasts.n'>> and <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>>.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: [
        `You take <<name s>> bra by the front side and rudely toss it downwards putting <<his>> <<n _t 'breasts.n'>> on display. Blushing, <<name s>> reach to the buckle and unfastens it letting <<his>> <<= ↂ.T.clothes.outfits.casual.bra>> to fall on the ground.`,
      ],
      degrade: [
        `You tug on the <<name s>>'s <<= ↂ.T.clothes.outfits.casual.bra>> exposing <<his>> <<n _t 'breasts.n'>>. Feeling pretty dommy you think of some words to degrade <<him>>. @@.pc;Oh, you are such a cow, you know? Those jugs are just plain obcsene.@@ Lifting them one after another you pinch <<his>> <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>> making <<name s>> blush a little.`,
      ],
      slut: "none",
      bimbo: "none",
    },
    removeTargetBottom: {
      standard: [
        `Sliding down onto your knees, you begin to unfasten <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.bottom>>, playfully sliding it down <<n _t "hisher.q">> thighs. Before long, you've worked <<n _t "hisher.q">> lower garment down <<n _t "hisher.q">> legs, letting them fall down and puddle around <<n _t "hisher.q">> ankles. From your current position, you can see the outline of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> through the fabric of <<n _t "hisher.q">> underwear, and you can feel your mouth start to water in anticipation.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: [
        `You take a step closer to <<name s>>. Putting your hands on <<his>> <<= ↂ.T.clothes.outfits.casual.bottom>> you pull it down without breaking the eye contact. garment falls to the floor and you smile, finally lowering your eyes to observe <<his>> naked lower body. @@.pc;Let's see what we have here...@@`,
      ],
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    removeTargetPanties: {
      standard: [
        `Gently pushing on <<name s>>'s <<= ↂ.T.clothes.outfits.casual.panties>> you slide them down exposing <<his>> lovely <<n _t "cock.n">> in it's full glory.`,
      ],
      lesbian: [
        `You smile to yourself when you slowly remove <<name _t>>'s panties, she allows it to return a mischievous smile for you, so <<his>> pussy is totally unprotected and ready for you to do whatever you want with it.`
      ],
      public: [
        `You reach for <<name s>> waistband and slowly start pulling <<his>> <<= ↂ.T.clothes.outfits.casual.panties>> down. <<name s>> swallows nervously while glancing around and tries to cover <<his>> crotch. @@.pc;Don't worry silly, you should not be shy of such a gorgeous body!@@ With this you yank <<his>> underwear down completely and it falls to the ground exposing <<his>> <<n _t "cock.n">>.`,
      ],
      openPublic: [
        `You remove <<name _t>>'s underwear, slowly but with <<his>> permission. The audience seems to focus on a brief analysis of <<name _t>>'s <<n _t "cock.n">> when you do this, taking into consideration the size of your partner, you continue the little show for the eyes watching you.`
      ],
      nonCon: [
        `Reluctantly, you follow <<name _t>>'s instructions and kneel, slowly taking off <<his>> underwear, then revealing the totally stiff sexual equipment. You see it in front of you, hard as iron and pulsing, ready to creampie you; The prospect makes you nervous and aroused.`
      ],
      romantic: [
        `You kneel in front of <<name _t>>, smiling at him, you take off <<his>> underwear, dropping it on the floor and revealing <<his>> hard, pulsating <<n _t "cock.n">>. You lick your lips at the prospect of what you can do with it, or what it will do to you.`
      ],
      risky: [
        `Always trying to keep silent and avoid getting caught, you gently remove <<name _t>>'s underwear, dropping it on the floor and exposing <<his>> <<n _t "cock.n">>. You grab it with one hand and take the first measures and conclusions, you give a half smile with the prospect that it can get you pregnant, generating a mixture of worry and anxious pleasure.`
      ],
      preg: [
        `You have a mind filled with the fantasy of being impregnated, you bite your bottom lip when you remove <<name _t>>'s underwear, exposing <<his>> <<n _t "cock.n">> for you. Touching that, you feel the warmth emanating as you feel your heart pounding intensely at the thought of an impending pregnancy.`
      ],
      isPreg: [
        `You slowly take off <<name _t>>'s underwear, dropping it on the floor and exposing <<his>> tough <<n _t "cock.n">>. You are fully pregnant and now you feel much more free to have a pleasurable enjoyment, also taking advantage of the high sensitivity of pregnancy.`
      ],
      queen(){
        if (ↂ.T.main.male) {
          if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 80) {
            // lol tiny
            return `You get closer observing the bulge still covered by <<name s>> underwear. You your dismay it is barely noticeable under the tight fabric of <<his>> <<= ↂ.T.clothes.outfits.casual.panties>>. With a discrete sigh you massage it through the cloth for a bit before pulling the underwear down in a vile hope that <<name s>> is a grower. @@.npc;Is everything okay?@@ @@.pc;MMm... yes, it's all right...@@ Finally you decide that you should face the inevitable and slide <<his>> <<= ↂ.T.clothes.outfits.casual.panties>> down exposing <<his>> <<n _t "cock.s">> <<n _t "cock.n">>. @@.mono;Welp, I was hoping for something bigger but it is what it is, right?@@`;
          } else {
            // yay
            return `You get your hands on <<name s>> bulge to appreciate it's size. You can't but bite your lip massaging such an impressive tool through the thin fabric of <<= ↂ.T.clothes.outfits.casual.panties>>. The precious meatpole certainly feels compressed inside the underwear and you feel obligated to free it from clothes. It jumps up immediately in all it's glory and you sigh happily ogling <<his>> <<n _t "cock.s">> <<n _t "cock.n">> helping <<name s>> to step out of <<his>> underwear.`;
          }
        } else {
            return `Gently pushing on <<name s>>'s <<= ↂ.T.clothes.outfits.casual.panties>> you slide them down exposing <<his>> lovely <<n _t "cock.n">> in it's full glory.`;
        }
      },
      sub: [
        `You look at <<name _t>>, when he orders you to remove <<his>> underwear, you kneel and do it without question. Soon you see <<his>> <<n _t "cock.n">> exposed for you, touching it and feeling the pulse emanate more and more heat leaves you heavily aroused.`
      ],
      dom: [
        `Grabbing both sides of <<n _t "hisher.q">> waistband, you quickly yank <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.panties>> downward to the floor, leaving <<n _t "hisher.q">> lower body and <<n _t "cock.n">> fully exposed.`,
      ],
      degrade(){
        if (ↂ.T.main.male) {
          if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
            // lol tiny
            return `You observe <<his>> bulge with visible skepticism. @@.pc;Let's see what we have here...@@ This makes <<name s>> uncomfortable but <<n _t "heshe.q">> still tries to keep it cool until you start tugging <<his>> <<= ↂ.T.clothes.outfits.casual.panties>> down to <<his>> knees exposing the <<n _t "cock.s">> <<n _t "cock.n">>. You burst with a laughter exaggerating it on a purpose. @@.pc;Ahahaha! Well... I almost feel sorry for you. Almost. Hehe. This is like the smallest nub I have ever seen, you know?@@ <<name s>> tries to hide <<his>> embarrassment but you can see <<his>> cheeks going tomato red and you just can't stop yourself from mocking <<him>> a little bit more. @@.pc;Aww, don't have such a sad look, I guess it is not your fault that you got such a small tool. Well, it would be more sincere to call it an overgrown clit to be honest.@@`;
          } else {
            // yay
            return `You pull <<name s>>'s <<= ↂ.T.clothes.outfits.casual.panties>> down to <<his>> knees and take a closer look on the <<n _t "cock.s">> <<n _t "cock.n">>. @@.pc;Well, I hope this thing will stay stiff until I am satisfied... At least it is average sized.@@ It seems that <<name s>> is not agree with your words and frankly, you think that <<his>> <<n _t "cock.n">> is pretty big but you just can't stop yourself from degrading <<him>>.`;
          }
        } else {
            return `Gently pushing on <<name s>>'s <<= ↂ.T.clothes.outfits.casual.panties>> you slide them down exposing <<his>> lovely <<n _t "cock.n">> in it's full glory.`;
        }
      },
      slut: [
        `You give <<name _t>> a slutty smile, you immediately kneel to him and turn to the <<n _t "cock.n">> when you finish taking off <<his>> underwear. The sight of <<his>> <<n _t "cock.n">> in front of you makes your pussy more heated and moist, ready for action.`
      ],
      bimbo: [
        `As a professional sex worker, you kneel in front of <<name _t>> and take off <<his>> underwear, you feel saliva fill your mouth when you see <<his>> <<n _t "cock.n">> ready to fuck you.`
      ],
    },
    slapFace: {
      standard: [
        `Feeling the urge to imply pain you swing your hand and slap <<= ↂ.T.main.name>>'s face with enough power that <<n _t "hisher.q">> head wobbles to the side. The pink hand-shaped mark immediately appears on <<n _t "hisher.q">> face.`,
        `@@.pc;Look at me.@@ you order and slap <<= ↂ.T.main.name>>'s face with your hand. Impact is hard enough so <<n _t "hisher.q">> head bounces. <<n _t "hisher.q">> cheek turns red.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    spankButt: {
      standard: [
        `@@.pc;<<= either ("Time to work on this pretty ass of yours!","Your butt could use some harsh treatment... and hell I gonna give it!")>>@@ You lift your bare hand and spank <<= ↂ.T.main.name>>'s bottom which makes <<n _t "hisher.q">> flinch. Your rhythmical slaps get stronger and stronger and it takes not much time until <<n _t "hisher.q">> starts to moan with every hit. <<= ↂ.T.main.name>>'s butt twitches with each impact and <<n _t "hisher.q">> toes wiggle uncontrollably. @@.npc;Mmmhm!@@ Sobs and moans break out from <<n _t "hisher.q">> clenched teeth while you paint both <<= ↂ.T.main.name>>'s ass cheeks bright red.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    pinchNipples: {
      standard: [
        `You take <<= ↂ.T.main.name>>'s <<n _t "nipples.n">> in a pinch and see a glimpse of horror on <<n _t "hisher.q">> face. With a devious smile you squeeze <<n _t "hisher.q">> <<if ↂ.T.body.tits.nipLength > 3>>protruded <</if>>nipples hard and <<= ↂ.T.main.name>> whimpers with pain, all <<n _t "hisher.q">> body tenses. Mercilessly pulling and twisting <<n _t "hisher.q">> <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>> you manage to make <<= ↂ.T.main.name>> moan and twitch.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    stopHavingSex: {
      standard: [
        `It's all so much. So intense. In the heat of your passion, you realize that you need to take a break. But try as you might, you can make yourself form the words, the only sounds you're able to make a series of desperate, strained grunts as <<n _t "heshe.q">> continues <<n _t "hisher.q">> thrusting inside of you. Eventually, your eyes meet <<n _t "hishers.q">>, and somehow <<n _t "heshe.q">> is able to read the discomfort there. Part of you worries that <<n _t "heshe.q">> might keep going, so intent on <<n _t "hisher.q">> lovemaking that <<n _t "heshe.q">> ignores the intent in your stare. But instead, <<n _t "heshe.q">> immediately stops, pulling out and looking somewhat abashed.`,
      ],
      lesbian: [
        `Lesbian fun can be more exhausting than sex with a man properly, you are exhausted and ask <<name _t>> that you and she can have a break. Considering that she is as exhausted as you are, she accepts your proposal.`
      ],
      public: [
        `You and <<name _t>> have been doing this for a long time, avoiding being seen by people who could find you at any time. After your body can take no more effort, you whisper to have a break.`
      ],
      openPublic: [
        `After some time under the eyes of other people, you feel too tired to continue, although the feeling of lust is still alive inside you, you ask for a break.`
      ],
      nonCon: [
        `Your body doesn't have the energy to continue, and although you don't have much control here, you beg <<name _t>> to give you a break. @@.pc;Please... Let's stop now... I can't do this anymore...@@`
      ],
      romantic: [
        `You and <<name _t>> are lying down, both exhausts, you look into <<his>> eyes and there is no need for words to say how you enjoyed everything so far. Your body is exhausted, and you and <<name _t>> just decide to rest in a post-sex moment before taking a break until the next time.`
      ],
      risky: [
        `You want to continue, the feeling of having risky sex is a constant source of concern but much more pleasurable, knowing that you can get pregnant fills your body with warmth and lust; However you are exhausted and need an intervention. You realize that <<name _t>> is as tired as you are, and agree to a break.`
      ],
      preg: [
        `The feeling burning inside you after a sex session, the prospect of an impending pregnancy, everything keeps your body warm and craving sex. However you are tired and unable to continue, you give a tired look to <<name _t>>, who soon understands the message, even because they both need time to recover your energy.`
      ],
      isPreg: [
        `Pregnancy is probably leaving your hormones out of control, you are still hot and desiring sex, but you decide to take a prolonged break since your body is tired and you still need to take extra care for the child growing inside you. @@.pc;Hey, let's take a break... Okay? Let's go slowly.@@`
      ],
      queen: [
        `You are on the edge, even though you are still craving more sex with a bigger cock, you decide to give your tired body a deserved rest. <<name _t>> understands the message when you give an exhausted look, and sits down next to you to catch your breath.`
      ],
      sub: [
        `You are panting and your body is heavy, you look at <<name _t>> with an expression of exhaustion and murmur for him to give you a short break to regain energy. @@.pc;Give me a few minutes... Please.@@`
      ],
      dom: [
        `You feel like this is getting bored and you have no intention to continue. Backing from <<name s>> you sigh. @@.pc;That's enough.@@ <<name s>> looks surprised but obeys your order and stop.`,
      ],
      degrade: [
        `You are tired, but you feel you could continue, moved by your arousal or pride but you make fun of your partner who seems too tired to move on with more sex. @@.pc;I think someone needs a break, right? Pathetic...@@ Although you are as exhausted as he is.`
      ],
      slut: [
        `You don't really care about having sex, for you this is like a sport, a sport that you like a lot. Despite your natural aptitude, you understand the message of your body, which is tired, after all the activity you have just had and decide to take a short break to regain energy.`
      ],
      bimbo: [
        `You don't really want to stop, but your body is not energized enough to continue. Although internally you're still horny enough to propel you into more sex, you need to give your body some well-deserved rest.`
      ],
    },
    askCumInside: {
      standard(): string {
        // setup the pc "ask" text array for either()
        const pcText: string[] = [
          "I want to feel your hot <<w 'cum.n'>> inside me!",
          "I want your cum! Release it all inside!",
        ];
        if (!ↂ.pc.fert.iud && (ↂ.pc.status.birthCon.hormoneType === "none" || ↂ.pc.status.birthCon.knowIneffective)) {
          pcText.push("Give me your seed in my fertile cunt!");
          if (ↂ.pc.status.risk > 3) {
            pcText[1] = "I want your cum! Knock me up!";
          }
          if (ↂ.pc.status.risk > 4) {
            pcText.push("I'm going to ovulate soon, so you'd better pump my womb full of cum!");
          }
        } else {
          pcText[1] = "I want to feel you cum! It's fine, I'm protected.";
        }
        // setup the npc answers
        const npcText: string[] = [
          "<<n _t 'heshe.q'>> seems even more turned on. @@.npc;You got it babe, I'm gonna stuff your cunt with <<w 'cum.n'>>!@@",
          "<<n _t 'heshe.q'>> just keeps fucking you. @@.npc;I wouldn't have it any other way.@@",
          "<<n _t 'heshe.q'>> gives you a naughty smile. @@.npc;I hope you've got room for all the <<w 'cum.n'>> I'm gonna pump into you!@@",
          "<<n _t 'heshe.q'>> answers with a few extra-hard thrusts. @@.npc;Since you asked so nicely...@@",
          "<<n _t 'heshe.q'>> looks a little unsure. @@.npc;Well if that's what you want...",
        ];
        return `Looking at <<name _t>>, you stop moaning long enough to say @@.pc;${either(pcText)}@@<br><br>${either(npcText)}`;
      },
      lesbian: [
        `@@.pc;Aahh... Let's see if you know how- Hmm... Use it right, cum inside me!@@`
      ],
      public: [
        `The risk of being caught is making you more slutty and aroused than usual, you want to get the hot jizz inside you. @@pc;Cum inside- Aahhh... Please!@@`
      ],
      openPublic: [
        `The feeling of being about to be creampied with eyes watching is leaving you in ecstasy. Cum inside me! Aahhh ... Please, I want this!`
      ],
      nonCon: [
        `It started reluctantly, but you are now like a bitch in heat and want to be creampied by <<him>>, you soon start to beg for hot and manly cum inside of you. @@.pc;Creampie me! Please! Me- Aahhh! I want to feel this- Hmm! Inside!@@`
      ],
      romantic: [
        `You feel connected to him, ignoring any concern and care, you decide that you want to be creampied and then look him in the eyes begging for it. @@.pc;Do it! Creampie- Aahhh... Me! I want to feel it inside me!@@`
      ],
      risky: [
        `This is the moment that makes you most aroused, you are about to be creampied and the risk of being successfully impregnated makes you feel lost in an ocean of pleasure and concern. @@.pc;Cum inside- Aaahhh! Me! Fill me, please!@@`
      ],
      preg: [
        `You feel something deeply warm and motherly, your desire to get pregnant is controlling you right now and you look deeply into <<name _t>>'s eyes and beg to be creampied. @@.pc;Please do this- Aahhh... Fill me up! Get me pregnant!@@`
      ],
      isPreg: [
        `With pregnancy your body begs for an intense fuck, you feel a deep desire to be creampied and have manly semen oozing out of you. @@.pc;Come on... Do it! Aahhh... Fill my- Hmm! Pussy! Creampie me!@@`
      ],
      queen: [
        `Fantasizing about a huge cock fucking makes you very hot, you want to feel cum inside you and start asking to be creampied. @@.pc;Aahhh, please give me everything you have! I-I- Hmm...! I need it!@@`
      ],
      sub: [
        `You submissively get fucked, the hot feeling of submissive fuck leaves you deeply aroused and you then beg to be creampied, ignoring anything else. Crempie me! P-Please- Aahhh! Give me everything you have!`
      ],
      dom: [
        `The high arousal and the intensity of the moment make you forget the desire for dominance and you just beg to be creampied. @@.pc;Shit... Ahh... Creampie me! Now! I need- Ohh! That!@@`
      ],
      degrade: [
        `You look contemptuously at <<name _t>>, degrading him makes you feel even hotter and you insult slightly while begging for a creampie. @@.pc;D-Do it right- Ohh! Creampie me! I need- Hmm... I need this! Try not to ruin that too... Aahhh...@@`
      ],
      slut: [
        `You feel a burning desire deep inside you, your pussy is warm and your heart beats faster as <<name _t>>'s climax approaches. @@.pc;Oh... do it! Creampie- Aahhh... Me! Let me feel it inside me!@@`
      ],
      bimbo: [
        `Your body is made for fucking, all you have in mind now is to stay getting fucked and the sharp image of you sits fiercely creampied, your desire for a big, manly creampie increases a lot and you beg for it. @@.pc;Uh... Oh! Come on, big boy, creampie my dirty pussy! Do- Aahhh... That!@@`
      ],
    },
    askPullOut: {
      standard(): string {
        // setup the pc "ask" text array to randomize
        const pcText: string[] = [
          "Please don't cum inside me, I want you to pull out.",
          "Pull out before you cum, okay?",
        ];
        if (ↂ.pc.status.risk > 3) {
          pcText[1] = "Today's a risky day for me, so don't cum inside me.";
        }
        if (ↂ.pc.status.risk > 4) {
          pcText.push("Today is a super risky day, so please pull out before you cum!");
        }
        if (ↂ.pc.status.birthCon.hormoneType === "none" || ↂ.pc.status.birthCon.knowIneffective) {
          pcText.push("I'm not on birth control, so please don't cum inside me.");
        } else {
          pcText.push("I really don't want a mess, so don't cum inside me okay?");
        }
        if (ↂ.pc.fert.iud) {
          for (let i = 1, c = pcText.length; i < c; i++) {
            pcText[i] = "Creampies are gross, so you'd better not cum inside me!";
          }
          pcText.push("I really don't want a mess, so don't cum inside me okay?");
        }
        // setup the npc answers
        const npcText: string[] = [
          "<<name _t>> gives you a reassuring smile. @@.npc;Sure thing, I'll pull out.@@",
          "<<name _t>> raises an eyebrow, looking a little confused by your request. @@.npc;Okay, if that's what you want.@@",
          "<<name _t>> looks a little crestfallen. @@.npc;Can I at least cum on your <<p 'tits.n'>>?@@ When you nod your assent, <<n _t 'heshe.q'>> looks a little happier @@.npc;Okay then!@@",
          "<<name _t>> considers for a moment. @@.npc;I'll try.@@",
          "<<name _t>> looks a little unsure. @@.npc;I will if I can... I mean, I'll do my best.",
        ];
        return `Knowing you don't want cum inside you, you decide you'd better tell <<n _t 'himher.q'>> that. @@.pc;${either(pcText)}@@<br><br>${either(npcText)}`;
      },
      lesbian: [
        `@@.pc;Hey, just don't cum inside me, okay? Just because you have- Aahh... A cock, don't look like jerk men. Hmm...@@`
      ],
      public: [
        `You whisper to <<name _t>>, trying not to attract attention. @@.pc;H-Hey, try not- Hmm... Don't cum inside me, please!@@`
      ],
      openPublic: [
        `People watching the act seem to root for a creampie, you beg it not, though. @@.pc;Aahhh... Don't cum inside me- Hmm! Please!@@`
      ],
      nonCon: [
        `You are not in control here, however you try to convince <<name _t>> to not cum inside you. @@.pc;No... Don't cum inside me, please! Aaahhhh!@@`
      ],
      romantic: [
        `@@.pc;H-Hey... Just- Hmm... Don't cum inside me- Aahhh... Please, <<= ↂ.T.main.name>>.@@`
      ],
      risky: [
        `@@.pc;Don't cum- Aahhh... Inside me, please! I- Hmm... It's my risky day, I can- Aahhh! Get pregnant!@@`
      ],
      preg: [
        `@@.pc;As tempting and exciting as it is for you, you ask <<name _t>> to pull out. Cum outside, please. Aahhh... I'm sorry but I- Hmm! I must not get pregnant!@@`
      ],
      isPreg: [
        `You ask <<name _t>> cum outside, even if you are already pregnant. @@.pc;Cum outside, please- Aahhh!@@`
      ],
      queen: [
        `You feel a little dissatisfied about your partner's size, so you ask him to cum outside. @@.pc;Hmm... Just, cum outside, please. Don't be- Aahhh... An asshole.@@`
      ],
      sub: [
        `Despite your submissive position, you make an attempt and ask <<name _t>> to cum outside. @@.pc;Please just- Aahhh... Don't cum inside me!@@`
      ],
      dom: [
        `@@.pc;Be a good boy and- Hmm... Don't cum inside me, o-okay? Aahhh...@@`
      ],
      degrade: [
        `@@.pc;You suck, I don't want yours- Aahhh... Fucking cum inside me, you- Hmm ... Do you understand?@@`
      ],
      slut: [
        `You feel anxious and aroused at the prospect of a creampie, but you ask that your mate cum outside. @@.pc;Ahh... Come on, just don't cum inside me, okay? Hmm...@@`
      ],
      bimbo: [
        `You look with an innocent expression at <<name _t>>, and ask him to cum outside. @@.pc;Uh... Hmm... Just- C-Cum outside, okay?@@`
      ],
    },
  };
  aw.con.info(`Sex Act Library loaded.`);
};
