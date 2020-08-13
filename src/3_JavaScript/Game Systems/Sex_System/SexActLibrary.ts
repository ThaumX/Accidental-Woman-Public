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
    testing: {
      standard: [
        `This was a testing action that you <i>probably</i> shouldn't be able to see...`,
      ],
    },
    rubMaleChest: {
      standard: [
        `Your hands make their way to <<= ↂ.T.main.name>>’s <<n _t "chest.n">>, fingertips lightly tracing against the <<n _t "skincolor.q">> skin as your hand explores further. <<n _t "nipples.n">> make themselves known to your roving touch, and a few moments pass as you give them some extra attention from your questing fingers. Moving onward, your motions become more insistent; soft fingertips replaced by the firm press of hands that express a growing need upon the <<if ↂ.T.body.muscle > 3 && ↂ.T.body.fat < 5>>firm<<elseif ↂ.T.body.fat >= 5>>flabby<<else>>smooth<</if>> flesh.`,
      ],
      nonCon: [
        `You place your hand on <<= ↂ.T.main.name>>'s <<n _t "chest.n">>, pressing firmly away from yourself. It's as if subconsciously you're trying to escape, even though mentally you've already resigned yourself to what is about to happen. Your pushing makes no difference to <<= ↂ.T.main.name>>, however, <<his>> <<if ↂ.T.body.muscle > 3 && ↂ.T.body.fat < 5>>firm<<elseif ↂ.T.body.fat >= 5>>flabby<<else>>smooth<</if>> <<n _t "skincolor.q">> flesh not budging at all.`,
      ],
      romantic: [
        `You lovingly drag your fingertips up along <<name s>>'s abdomen, enjoying the feel of the <<n _t "skincolor.q">> skin beneath your fingers. You begin to rub your hand against <<his>> chest, your hand sensually kneading the <<if ↂ.T.body.muscle > 3 && ↂ.T.body.fat < 5>>firm<<elseif ↂ.T.body.fat >= 5>>flabby<<else>>smooth<</if>> flesh. <<name s>>'s <<n _t "nipples.n">> perk up under your palms as you continue your massage.`,
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
    squeezeBreasts: {
      standard: [
        `Reaching toward <<= ↂ.T.main.name>>’s chest, you place the palms of your hands against <<his>> <<n _t 'breasts.n'>>. <<if ↂ.T.body.tits.cupNum < 13>>Closing your outstretched fingers, you being to squeeze the soft <<n _t 'titshape.q'>> flesh, kneading it gently with the tips of your fingers.<<elseif ↂ.T.body.tits.cupNum > 22>>Sliding your hands down and under them, you heft the <<n _t 'titsize.q'>> masses that are <<if ↂ.T.body.tits.cupNum > 30>>far <</if>>too large to contain in a single hand.<<else>>Collapsing your hands to contain the delectable flesh, you begin pressing with your fingers. They sink in slightly as you begin a slow kneading motion.<</if>> You can feel the <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>> tightening up <<if ↂ.T.body.tits.nipLength > 2>>and pushing against <</if>>the palms of your hands. You enjoy the warmth of <<his>> <<n _t breasts.n>> as you continue to fondle them contentedly.`,
      ],
      lesbian: [
        `You take <<name s>> <<n _t 'breasts.n'>> and fondle them passionately. <<if ↂ.T.body.tits.cupNum > ↂ.pc.body.tits.cupNum>>Feeling a little bit jealous<<else>>Enjoying the warm soft skin ynder your fingers<</if>> you squeeze them against each other and gently knead them. <<name s>> smiles as you play with <<his>> boobs mesmerized by their softness and texture.`,
      ],
      public: [
        `Unconcerned about the time or place, you reach out to grab <<name s>>'s <<n _t 'breasts.n'>> with both hands. <<if ↂ.T.body.tits.cupNum < 13>>Closing your outstretched fingers, you being to squeeze the soft <<n _t 'titshape.q'>> flesh, kneading it gently with the tips of your fingers.<<elseif ↂ.T.body.tits.cupNum > 22>>Sliding your hands down and under them, you heft the <<n _t 'titsize.q'>> masses that are <<if ↂ.T.body.tits.cupNum > 30>>far <</if>>too large to contain in a single hand.<<else>>Collapsing your hands to contain the delectable flesh, you begin pressing with your fingers. They sink in slightly as you begin a slow kneading motion.<</if>> You can feel the <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>> tightening up <<if ↂ.T.body.tits.nipLength > 2>>and pushing against <</if>>the palms of your hands. <<if random(1,3) === 2>>You notice a passerby staring as you fondle <<name s>>'s breasts, and the extra attention sends a tingle down your spine.<<else>>Looking around, it seems that nobody is paying attention to your fondling.<</if>>`,
      ],
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: [
        `Putting both of your hands over <<name s>>'s <<n _t 'breasts.n'>> you massage them in a soft but still dominative way. Making your grip harder with each second you end up mercilessly sqeezing <<his>> <<n _t 'titsize.q'>> <<n _t 'titshape.q'>> boobs like a plushie while <<name s>> squirms and flinches being too shy and subby to stop you. Lifting <<his>> tits and squishing them together you enjoy them as much as you want not taking into any consideration what <<name s>> feels.`,
      ],
      degrade: [
        `Feeling the urge to humiliate <<name s>>, you rudely grab <<his>> <<n _t 'breasts.n'>> and lift one after another in your hands. <<if ↂ.T.body.tits.cupNum < 13>>@@.pc;These tiny sweater puppies are so small! They like belong to a teenager. Have consider getting a surgery or something?@@<<else>>@@.pc;Oh, these bags looks so obscene, <<name s>>. They would fit a cow rather than a human. De you imagine yourself being a cow sometimes, do you?@@<</if>> <<name s>> blushes and you know that your degraded <<his>> really harsh this time.`,
      ],
      slut: "none",
      bimbo: "none",
    },
    suckNipples: {
      standard: [
        `Placing your hand on one of <<= ↂ.T.main.name>>’s <<n _t 'breasts.n'>>, you lean in and engulf the <<n _t nipple.n>> with your <<p lips.q>> lips. Swirling your tongue around <<his>> <<n _t 'nipple.n'>>, you begin groping at the other <<n _t 'breast.n'>> with your free hand, kneading your way to the <<n _t 'nipple.n'>>. You begin sucking more firmly, squeezing the <<n _t nipwidth.q>> flesh between your <<p lips.q>> lips while you likewise increase the intensity of your hand’s ministrations on <<his>> other <<n _t 'nipple.n'>>. <<if ↂ.T.status.milk > 0>>Your efforts have started the flow of milk, <<his>> fresh cream <<if ↂ.T.status.milk < 3 || ↂ.T.body.lactation  < 2>>leaking into<<elseif ↂ.T.body.lactation < 4>>filling<<else>>flooding<</if>> your mouth and wetting your fingers.<</if>>`,
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
      slut: [
        `You lean into <<name s>>'s <<n _t 'breasts.n'>>, grabbing one firmly with your hand to position it, you hungrily engulf <<his>> <<n _t 'nipple.n'>> with your <<p lips.n>>. You suck firmly, taking the <<n _t 'areola.q'>> areola into your mouth as you rub and press against the <<n _t 'niplength.q'>> <<n _t 'nipple.n'>> with your tongue. You use your other hand to squeeze and twist at <<name s>>'s other <<n _t 'nipple.n'>> absentmindedly, your attention focused on your mouth. <<if ↂ.T.status.milk > 0>>Your firm suction seems to have started the flow of milk and <<his>> fresh cream <<if ↂ.T.status.milk < 3 || ↂ.T.body.lactation  < 2>>leaks into<<elseif ↂ.T.body.lactation < 4>>fills<<else>>floods<</if>> your mouth. You swallow the delicious liquid greedily, continuing to suck on the milky teat for more.<</if>>`,
      ],
      bimbo: "none",
    },
    cupBalls: {
      standard: [
        `Gently moving your hand down between <<= ↂ.T.main.name>>'s legs, you start to slowly trail the tips of your fingers along the taut skin of <<n _t "hisher.q">> <<n _t "ballsack.n">>. <<= ↂ.T.main.name>> shudders slightly at your light touch, breath catching in <<n _t "hisher.q">> throat as <<n _t "heshe.q">> struggles to remain calm. You slide your hand fully under to cup <<n _t "hisher.q">> <<n _t "balls.q">> <<n _t "balls.n">> in your palm. Your fingertips softly pressing against <<n _t "hisher.q">> taint, you slowly and firmly enclose <<n _t "hisher.q">> <<n _t "ballsack.n">> in your grasping fingers. Playfully, you begin moving your fingers around and against the warm flesh of <<= ↂ.T.main.name>>'s <<n _t "ballsack.n">>, your digits twisting, twirling, and rotating <<n _t "hisher.q">> <<n _t "balls.n">> in all manner of directions. <<= ↂ.T.main.name>> watches with lips parted, breath ragged and strained as you entertain yourself with <<n _t "hisher.q">> <<n _t "ballsack.q">> <<n _t "ballsack.q">>. With every tug and stroke you give <<n _t "hisher.q">> dangling <<n _t "ballsack.n">>, you can see <<n _t "hisher.q">> <<n _t "cock.n">> pulsing and throbbing, the feeling of your hand engorging it with desire.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: [
        `You reach your hand between <<name s>>'s, your hand roving until <<his>> <<n _t "balls.n">> are resting in the palm of your hand. You run your fingers over <<his>> <<n _t "ballsack.n">>, exploring and lifting to get a sense of their size. <<if aw.npc[_t].body.balls.size < 18>><<has pregnancy>>You're greatly disappointed to discover that <<his>> sack contains only <<n _t "balls.s">> <<n _t "balls.n">>. @@.mono;Will these even be able to  knock me up?@@<<or>>Part of you feels disappointed by the <<n _t "balls.s">> <<n _t "balls.n">>. @@.mono;At least I can enjoy a creampie without worrying about it much...@@<</has>><<elseif aw.npc[_t].body.balls.size < 22>>You discover a pair of <<n _t "balls.s">> <<n _t "balls.n">>, each one producing millions of sperm in the hopes of impregnating some lucky girl. You play with them gently, rolling them around as if to encourage their efforts.<<else>>You grin unconsciously when you feel the <<n _t "balls.s">> <<n _t "balls.n">> in your hand, knowing that each <<n _t "balls.s">> testicle is furiously working to produce a prodigous quantity of verile sperm. <<has pregnancy>>As you roll them in your hand and imagine their massive load deposited deep inside you, the anticipation causes you to shiver with delight.<<or>>Instinctively you realize that there's no way so much sperm would fail to fertilize any egg you happen to release; it's a thought that causes your womb to tingle naughtily despite your concern over taking such a large risk.<</has>><</if>>`,
      ],
      preg: [
        `You cup <<n _t "hisher.q">> <<n _t "balls.n">> with your hand, playing with them gently; mesmerized by the thought how much precious cum is stored inside the <<n _t "balls.q">> <<n _t "balls.n">>. Softly massaging <<= ↂ.T.main.name>>, you can't help but imagine all the thick semen deep inside your <<p "pussy.n">>, swimming into your womb. With your finger you tug and squeeze them, making <<n _t "hisher.q">> <<n _t "cock.n">> even harder than it was. You can feel <<n _t "hisher.q">> <<n _t "ballsack.n">> begin to tighten up, as if realizing that they're about to fulfil their purpose in life, namely filling a fertile woman with their potent seed. The thought sends shivers down your spine. @@.mono;Good luck, little guys.@@`,
      ],
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: [
        `You stick your hand down to reach <<n _t "hisher.q">> balls and grab them hard. <<= ↂ.T.main.name>> eyes widens. With a cruel smile you start squeezing them in your hand pressing <<n _t "hisher.q">> <<n _t "balls.q">> <<n _t "balls.n">> hard against each other. <<= ↂ.T.main.name>> squeals and flinces with pain, <<n _t "hisher.q">> mouth wide open in a almost inaudible scream as you absorb <<n _t "hisher.q">> ache and suffering. Tugging on the <<n _t "ballsack.n">> you force <= ↂ.T.main.name>> to lean forward to relieve tension on <<n _t "hisher.q">> poor ashing balls. In a surge of sadistic ecstasy you twist them pressing with a full grip finally making <<= ↂ.T.main.name>> to scream. When you finally release <<n _t "hisher.q">> well-tortured ballsack <<n _t "heshe.q">> sighs with a relief closing <<n _t "hisher.q">> eyes.`,
      ],
      degrade: [
        `Reaching <<n _t "hisher.q">> balls you start playing with the gentle scrotal skin between your fingers. @@.pc;Such a worthless little balls... are they even working, huh?@@ With a gentle tug on <<= ↂ.T.main.name>> <<n _t "balls.q">> <<n _t "balls.n">> you look into <<n _t "hisher.q">> eyes. @@.pc;Let's see if they worth something... Or else they maybe I should just snap them off maybe, mm?@@ With a gentle smirk you release them making <<= ↂ.T.main.name>> sigh with relief.`,
      ],
      slut: "none",
      bimbo: "none",
    },
    slowDown: {
      standard: [
        `You urge <<= ↂ.T.main.name>> to slow down and take it a little easier on your hole.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: [`
        You ask <<= ↂ.T.main.name>> to slow down a bit. @@.pc;Let's give them all a good show, giggle!@@`,
      ],
      nonCon: [`
        You sqirm under <<= ↂ.T.main.name>> sobbing. @@.pc;Pleease, not so fast... don't do this...@@`,
      ],
      romantic: [`
        With a gentle smile you ask <<= ↂ.T.main.name>> to slow down a bit. @@.pc;No so fast, love, let's enjoy it...@@`,
      ],
      risky: "none",
      preg: "none",
      isPreg: [
        "You rub your pregnant belly, entreating <<name s>> to take a more gentile pace.",
      ],
      queen: "none",
      sub: "none",
      dom: [
        `You push <<= ↂ.T.main.name>> making <<n _t "himher.q">> to slow down. @@.pc;No cumming until I'll allow you, pet.@@`,
      ],
      degrade: [
        `You slap <<= ↂ.T.main.name>> making <<n _t "himher.q">> to slow down. @@.pc;Not so fast, you little piece of shit!@@`,
      ],
      slut: "none",
      bimbo: "none",
    },
    speedUp: {
      standard: [
        `You start thrusting your hips yourself, interrupting <<= ↂ.T.main.name>>'s rhythm slightly in an attempt to get <<n _t "himher.q">> to fuck you faster.`,
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
        `Sobbing with each thrust you turn to <<= ↂ.T.main.name>>. @@.pc;Faster, <<if ↂ.T.main.male>>daddy<<else>>mommy<</if>> please, pretty pleeease!@@`,
      ],
      dom: [
        `You push your hips gaining a pace and forcing <<= ↂ.T.main.name>> to follow the new rhythm.`,
      ],
      degrade: [
        `You grin at <<= ↂ.T.main.name>>. @@.pc;Come on, get some pace. Or that's all you got? You are so pathetic, gosh! <<if ↂ.T.main.male>>Or maybe little boy is afraid to cum too fast?<</if>>@@`,
      ],
      slut: "none",
      bimbo: "none",
    },
    speedUpDouble: {
      standard: [
        `Thrusting your hips toward <<= ↂ.T.main.name>> forcefully, you urge <<n _t "himher.q">> to fuck you faster. @@.pc;Faster. Faster!@@`,
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
    doNothing: {
      standard: [
        `Enjoying what <<= ↂ.T.main.name>> is doing, you begin to go limp and lie there. You trust <<him>> and know <<n _t "heshe.q">> would never to anything to hurt you. It’s very easy to just surrender yourself to the pleasure he's causing you, and just relax as <<n _t "heshe.q">> works to bring you to a satisfying climax.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: [
        `You go passive and just accept everything that <<name s>> does. Enjoying you glance around trying to count the size of your audience but the pleasure <<name s>> brings you make it hard to concentrate.`,
      ],
      nonCon: [
        `Paralyzed by fear you just get limp under <<him>> too afraid to do or to say anything. Letting go of any hope to interrupt <<= ↂ.T.main.name>> you try to reconcile with inevitable abuse you are facing.`,
        `Without any chance to fight <<him>> you have no other option then to surrend yourself at <<n _t "hisher.q">> will just squealing with the fear you are trying to suppress.`,
      ],
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
      queen: "none",
      sub: [
        `Letting go of control feels like a bliss and you let <<= ↂ.T.main.name>> to do anything <<n _t "heshe.q">> wants to do to you.`,
        `Feeling subby and obedient you just silently accept it and submerge into state of pure passive bliss gratefully enjoying anything <<= ↂ.T.main.name>> does to your body and soul.`,
      ],
      dom: [
      `For a moment you stop and just enjoy observing <<= ↂ.T.main.name>> the way any queen would look at her property.`,
      ],
      degrade: "none",
      slut: "none",
      bimbo: "none",
    },
    strokeCock: {
      standard: [
        `<<= ↂ.T.main.name>> grips the base of <<n _t "hisher.q">> rigid <<n _t "cock.n">>, presenting its swollen length and waiting for you to make the next move. <<n _t "hisher.q">> hard <<n _t "cock.n">>, rigid and standing out from <<n _t "hisher.q">> <<n _t "fat.q">> frame, bobs and pulses in vulgar anticipation of the touch of your hand. Reaching out, you take hold of him, <<= ↂ.T.main.name>> moving <<n _t "hisher.q">> own hand aside to give you unfettered access to <<n _t "hisher.q">> <<n _t "cock.n">>. Under <<n _t "hisher.q">> watchful eye, you slowly slide your fingers along the length of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. Your mouth curls into a slight smile, as you feel <<n _t "hisher.q">> <<n _t "cock.n">> slowly pulsing against your palm, <<= ↂ.T.main.name>>'s <<n _t "cock.n">> straining more with every stroke. As you work your fingers up and down <<n _t "hisher.q">> length, <<= ↂ.T.main.name>> gives a low moan, and you watch as a glistening drop of precum slowly trickles out of the head of <<n _t "hisher.q">> <<n _t "cock.n">>. Moving your thumb up to <<n _t "hisher.q">> <<n _t "cockhead.n">>, you rub against the light glisten of slick moisture, working the fluid around and between your fingers and then using it to lubricate <<n _t "hisher.q">> <<n _t "cock.n">> for your continued stroking.`,
      ],
      lesbian: "none",
      public: [
        `Reaching for <<name s>> <<n _t "cock.s">> <<n _t "cock.n">> you grab it with your palm and start slowly stroking it up and down from <<his>> <<n _t "cockhead.n">> to the base and <<n _t "ballsack.n">>. <<name s>> opens <<his>> mouth a bit and pants nervously while you work <<his>> stiff shaft smearing the precum all over it. It seems <<print either("pretty nervous about being noticed by some passerby.", "doesn't care much about being found getting handjob in public.")>> You change the pace going from agonizingly slow strokes to rapid ones and enjoy the amount of control and joy you can provide to <<name s>>; <<his>> <<n _t "cock.n">> desperately leaks with clear fluid and <<his>> ballsack hangs high and tight.`,
      ],
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
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
        `You gently take <<his>> cock with both hands caressing it and slightly stroking looking into <<name s>> face catching hints of <<his>> approval. @@.pc;Do you like it, <<if ↂ.T.main.male>>master<<else>>mistress<</if>>?@@ Picking up a pace you stroke <<his>> shaft up and down feeling veins pulsing under the delicate skin of the <<n _t "cock.s">> <<n _t "cock.n">>. Biting your lip, you give up to the fucktoy's bliss serving <<name s>>'s pleasure.`,
      ],
      dom: "none",
      degrade(){
        if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 50) {
          // lol tiny
          return `You take <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> with two fingers irradiating a disgust and disappointment. @@.pc;Did somebody ever told you how small and insignificant this tiny nub of yours is? I can bet I won't be the first to tell you it, ahaha!@@ Sliding your fingers up and down <<his>> cocklet you continue to mock it making <<name s>> blush. @@.pc;Oh, how cute, look, it tries so hard to stay stiff and impressive! Little brave peepee. Gosh, I saw so much cocks bigger than this one. Actually, to be honest, <i>all</i> of them were bigger, you know?@@ You raise your brows making a derisive face while <<his>> little cock twitches between your thumb and index fingers.`;
        } else {
          // yay
          return `You reach for <<his>> <<n _t "cock.s">> <<n _t "cock.n">> and begin to rudely work it with your hand. @@.pc;Enjoying this, faggot? Or you still dreaming about some hot ripped stud in my place? Let's hope you can maintain staying stiff when I put this worm inside me at least.@@ <<name s>>'s face goes tomato red with an embarrassment while you jerk <<his>> cock hard looking right into <<his>> eyes. @@.pc;I hope you are not a premature ejaculator? Are you?@@ His cock twitches in your palm as <<name s>> tries <<his>> best to hide <<his>> insecurity.`;
        }
      },
      slut: "none",
      bimbo: "none",
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
        `You put two fingers to the entrance of <<his>> <<n _t wet.q>> <<n _t labia.n>> and stick it in a dominant fashion. <<if ↂ.sex.npcWetness[ↂ.sex.target] < 5>><<name s>> squeals when your fingers intrude <<his>> dry <<n _t pussy.q>> <<n _t "pussy.n">> but you force them inside mercilessly until your knuckles get almost hidden in her vulva.<<else>><<name s>> bites <<his>> lip when your fingers slide into her vulva up to your knuckles.<</if>> @@.pc;You like this, slut, right?@@ <<name s>> nods with arousal on <<his>> face. @@.pc;Good little whore likes being intruded so much. Who's whore you are?@@ @@.npc;Your, <<= ↂ.pc.main.name>>!@@ You smile and add one more finger stretching <<his>> hole more and began thrusting them back and forth enjoying your dominance over <<name s>>.`,
      ],
      degrade: "none",
      slut: "none",
      bimbo: [
        `You place your hand over <<name s>>'s <<n _t wet.q>> <<n _t "labia.n">>, feeling the heat practically soak into your hand. @@.pc;OMG gurl, your <<n _t "pussy.n">> is sooo hawt!@@ You play with <<his>> pussy like a child with a new toy, feeling, pulling, squeezing, and exploring her <<n _t "labia.n">>. You pull your hand away and bring it to your face, slipping two fingers into your mouth and sucking on them lewdly. @@.pc;You're yummy!@@ You quickly place your hand back between <<his>> legs and slide your saliva-coated digits inside <<his>> <<n _t "pussy.n">>. You explore a bit, feeling <<his>> inner walls before you start fucking her with your fingers. @@.pc;I bet this feels goood!@@`,
      ],
    },
    touchCock: {
      standard: [
        `Reaching down between <<= ↂ.T.main.name>>'s legs, you place the tip of your finger gently against <<n _t "hisher.q">> <<n _t "cock.n">>, right against the sensitive ridge where the swell of <<n _t "hisher.q">> <<n _t "cockhead.n">> meets the rest of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. At a slow, tantalizing pace, you trail your finger down the length of <<n _t "hisher.q">> <<n _t "cock.n">>. Your fingertip brushes against one of the veins that run through <<n _t "hisher.q">> <<n _t "cock.n">>, and you can feel the steady thrum of <<n _t "hisher.q">> pulse inside of <<n _t "hisher.q">> swollen manhood as you lightly trail your way down to the base of <<n _t "hisher.q">> <<n _t "cock.n">>. With your finger down against where <<n _t "hisher.q">> <<n _t "cock.n">> meets the rest of <<n _t "hisher.q">> <<n _t "fat.q">> body, <<if ↂ.T.body.pubes != "shaved">>you trail your index finger around, enjoying the feel of <<n _t "hisher.q">> <<n _t "pubecolor.q">> pubic hair ticking against your skin, before reaching your hand down and underneath <<n _t "hisher.q">> <<n _t "cock.n">>.<<else>> you run the tip of your finger around the smooth skin at the base of <<n _t "hisher.q">> <<n _t "cock.n">>, before moving your hand down and underneath <<n _t "hisher.q">> <<n _t "cock.n">>.<</if>> Cupping <<= ↂ.T.main.name>>'s <<n _t "cock.n">> in your palm, you slowly curl your fingers around him, the feeling of <<n _t "hisher.q">> hot, <<n _t "cock.q">> length in your hand sending a warm shudder through your body. <<= ↂ.T.main.name>> watches with breath held as you enclose <<n _t "hisher.q">> <<n _t "cock.n">> in your firm grasp, fingers gripping firmly around <<him>>.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: [
        `You reach out and touch <<name s>>'s <<n _t "cock.n">> gently, giving it a light pat as if patting a child on the head. @@.pc;I'm so glad you're excited to see me, big guy.@@ You smile reflexively at the silliness of talking to <<name s>>'s <<n _t "penis.n">>, but inside you're happy that you arouse <<him>>. You take ahold of the flesh, feeling the heat against your hand along with the gentle throbbing of <<name s>>'s pulse. You take your time holding it and exploring it through touch, feeling the springy veins beneath your fingertips or slowly running a finger over the curves of <<his>> head.`,
      ],
      risky: "none",
      preg: [
        `Your outstretched hand slowly takes hold of <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">>, marveling at the shape and heat of the tool designed to get you pregnant. You run your hand over its <<n _t "hardness.q">> length, taking in the details beneath your questing fingertips. @@.mono;This is going to fill me with thick fertile <<w "cum.n">>.@@ You take note of its length, all the better to plant <<name s>>'s seed as deep as possible. You run your fingers over the head, all the better to stimulate your body for reproduction. The naughty thoughts only serve to heighten your need.`
      ],
      isPreg: "none",
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
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
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
    passionateKiss: {
      standard: [
        `You lean your head in and press your lips heavily against <<n _t "hishers.q">>. <<= ↂ.T.main.name>> grabs at your arms and holds you closer, while your <<p lips.q>> lips and <<n _t "hisher.q">> dance tightly together. You both pull away to catch your breath, only to quickly draw together once again. Eyes closed, head turned, you grope your hands frantically against <<n _t "hisher.q">> back as you hungrily kiss him, your head swimming at the intensity of the passion. Another pause for breath, and you open your mouth to say something, only to feel <<= ↂ.T.main.name>>'s lips against you for a third time. You press harder with each repeated kiss and then finally release to let the moment linger.`,
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
      slut: [
        `With <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> so close you can't help but breath in deeply through your nose as you stare at it hungrily. Having a <<w cock.n>> so close makes it hard to hold yourself back. You extend your tongue, reaching out to lick the tip bobbing in front of you. You start underneath, dragging your tongue wetly upward over <<his>> slit and over the top. You savor the delicate flavor mixed with a hint of precum, but the taste only amplifies your hunger. Greedily you press most of your tongue against the very base of the <<n _t "cock.n">>, the tip of your tongue pressing against <<his>> <<n _t "ballsack.n">>. After a moment's pause you start dragging your tongue upward slowly, savoring the moment as you taste each millimeter.`,
      ],
      bimbo: "none",
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
        `Parting your <<p lips.n>>, you reach out with your tongue to touch the bottom of <<his>> <<n _t vulva.n>>. Slowly, tantalizingly, you work your way up the line of <<his>> <<n _t "labia.n">>, teasing <<his>> <<n _t wet.q>> flesh. <<if ↂ.skill.oral < 50>>You finally reach the apex<<else>>You can sense <<his>> muscles tensing in anticipation as your reach the apex<</if>>, your tongue glancing across the sensitive bud waiting there. Moving back down you begin a regular stroke, licking upward with your tongue through the middle of <<his>> <<n _t wet.q>> <<n _t vulva.n>> before dragging it over <<his>> <<n _t "clit.n">>. You keep a steady pace that’s punctuated by the soft shudders of <<= ↂ.T.main.name>>’s growing arousal.`,
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
        `Gripping <<n _t "hisher.q">> <<n _t "cock.n">> in one of your hands, you angle it upwards, putting it at just the right angle for what you have planned for it. Pressing your lips down onto <<n _t "hisher.q">> <<n _t "cockhead.n">>, you let your saliva drip out, to drip down onto <<him>> and lubricate <<n _t "hisher.q">> <<n _t "cock.n">>. Parting your lips further, you allow <<n _t "hisher.q">> <<n _t "cockhead.n">> to enter into your mouth, enjoying the taste of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> against your tongue. Slowly, teasing <<him>> just a little, you slide your mouth down around <<n _t "hisher.q">> <<n _t "cock.n">>, <<if ↂ.T.body.cock.length > 50>>stopping only when you feel the tip of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> starting to enter your throat.<<else>>until you have <<n _t "hisher.q">> entire <<n _t "cock.n">> in your mouth, down to the base.<</if>> Pulling your head back, you only allow yourself a second to catch a breath before ingesting <<n _t "hisher.q">> <<n _t "cock.n">> again. This time you keep it in for longer, working your head around between <<n _t "hisher.q">> legs and moving <<n _t "hisher.q">> cock around the hot interior of your mouth. Soon the air is filled with the wet sound of your sloppy, enthusiastic cock-sucking, along with <<= ↂ.T.main.name>> strained grunts as <<n _t "heshe.q">> watches you eagerly attack <<n _t "hisher.q">> <<n _t "cock.n">> with your mouth, leaving it dripping with your spit.`,
      ],
      lesbian: "none",
      public: [
        `Glancing around and hoping that nobody notices what you're about to do, you take hold of <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> with one hand and quickly take the <<n _t "cockhead.n">> into your mouth. Squeezing the <<n _t "hardness.q">> <<n _t "cock.n">> between your lips and pressing against the underside with your tongue, you begin bobbing your head. You take it into your mouth until it reaches the back of your throat, and then pull away until the crest of his head passes your lips. You move at a brisk pace, more concerned with keeping it brief than actually pleasing your partner. Still, <<he>> seems to enjoy your efforts, if the throbbing of <<his>> <<n _t "cock.n">> is any indication.`,
      ],
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: [
        `You take <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> into your mouth, sucking gently as you rub your tongue along the underside. You begin a steady motion with your head, allowing it to rub against your tongue as you drag as it makes short strokes inward and outward in your mouth. You hope to <<print either("prime the pump","get <<him>> worked up","help <<him>> build up a big load")>>, but you can't help but be concerned that <<he>>'ll cum too soon. @@.mono;Okay <<name>>, you'd better not cum until you're in my <<p "pussy.n">>!@@`,
      ],
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: "none",
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
    passionateEmbrace: {
      standard: [
        `Leaping at <<= ↂ.T.main.name>> you attack <<him>> with a powerful hug. Arms wrapped as tight as they’ll go around <<n _t "hisher.q">> back, you give <<him>> a hard, almost desperate squeeze. Almost by instinct, <<n _t "heshe.q">> returns your embrace and holds you close. Just tight enough to be comforting, and just on the edge of painful, <<n _t "hisher.q">> arms enfold you and press you close to him.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: [
        `With a sudden surge of warm feelings towards <<name s>> you hug <<him>> with a loving, hard squeeze. <<name s>> returns it keeping you in <<his>> arms and you just enjoy the moment if intimacy feeling safe and happy in your lover's hug. You feel like you could just stand like this forever inhaling <<his>> lovely odor and feeling <<his>> warm skin pressed hard against yours.`,
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
        `With <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">> still inside of you, you begin rolling your hips around against <<n _t "hishers.q">>, grinding and pressing against <<= ↂ.T.main.name>>. You can feel <<him>> watching you and make a show of it, reaching up to cup your <<p breast.s>> <<p breasts.n>> as you wiggle your pelvis around. With a slow motion, you move slightly away from him, dripping <<n _t "cock.s">> <<n _t "cock.n">> emerging slightly from your <<p "vulva.n">>, before pressing forward and burying <<him>> fully inside of you once again. Throwing your head back, your <<p hairl.q>> <<p haircolor.q>> hair flying around your head, you move against <<him>> with reckless abandon. <<n _t "hisher.q">> rigid manhood is dripping wet with your <<p vulva.n>> juices, and your head is swimming with the intensity of the moment as you try your best to make <<n _t "hisher.q">> <<n _t "cocklength.q">> <<n _t "cock.n">> touch every last inch of your inner walls.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
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
              out += `You find yourself fantasizing about how the extra speed and friction might just cause the condom to tear or even just weaken enough to allow his fertile <<n _t "cum.n">> to spill inside you. `;
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
              out += `You find yourself fantasizing about how the extra speed and friction might just cause the condom to tear or even just weaken enough to allow his fertile <<n _t "cum.n">> to spill inside you. `;
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
      isPreg: "none",
      queen: "none",
      sub: "none",
      dom: "none",
      degrade: "none",
      slut: "none",
      bimbo: [
        `With <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> inside of you, you can't resist your urge to try and ride it. You begin rocking your hips in time with <<his>> thrusts, resulting in longer, faster strokes. Your <<p pussy.n>> loves it, and so do you. @@.pc;.nop;Oh Em Gee, this is sooo fucking good!@@ Each time <<he>> bottoms out in you with an audible smack you're reminded of why you love cocks so much.`,
      ],
    },
    liftLegsInAir: {
      standard: [
        `Shifting yourself around, you raise your legs into the air. Parting your thighs to give <<= ↂ.T.main.name>> better access to your <<p "vulva.n">>, you shift your weight back to your upper body. <<= ↂ.T.main.name>> sees you lifting and holding your legs apart, eagerly presenting your crotch to him.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: [
        `Opening your legs wider and shifting your hips forward, you lift your legs into the air. <<if ↂ.T.body.cock.length < 95>>Immediately you can feel the difference as <<name s>>'s body slams perfectly against your <<p vulva.n>>, hilting <<his>> <<print either('<<n _t "cock.s">>','rock-hard')>> <<n _t "cock.n">> even deeper than before.<<if ↂ.T.body.cock.length > 60>> You feel his <<n _t "cockhead.n">> shoving against your cervix with each thrust.<</if>> <<else>>Immediately you can tell the difference as <<name s>>'s <<n _t "cock.s">> <<n _t "cock.n">> impacts your cervix more directly, literally repositioning your organs as it shoves your womb deeper inside you. <</if>>The knowledge that <<he>>'ll be able to cum as deep inside you as physically possible combines with the amazing sensations to render you nearly insensate as your legs sway in the air.`,
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
      preg: "none",
      isPreg: "none",
      queen: "none",
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
        /*`Getting worried about the risk of pregnancy, you make a request. @@.pc;Can you put a condom on?@@`,
        `Getting worried about the risk of pregnancy, you make a request. @@.pc;Hey, I'm not on the pill. Could you wear protection, <<= ↂ.T.main.name>>?@@`,
        `Getting worried about the risk of pregnancy, you make a request. @@.pc;Slow down a second, <<= ↂ.T.main.name>>. Let's play it safe, okay?@@`,*/
        " ",
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
    removeOwnBra: {
      standard: [
        `You draw your arms behind your back, reaching to undo the hooks of your bra. A quick motion later, and your <<p tits.q>> <<p tits.n>> are bare and exposed, your bra sliding down off your bare upper torso to hit the floor.`,
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
    removeOwnBottom: {
      standard: [
        `Reaching down to the waistband of your lower garment, you unfasten and slide it down to your ankles exposing your <<p ass.q>> <<p ass.n>>.`,
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
      lesbian: "none",
      public: [
        `You reach for <<name s>> waistband and slowly start pulling <<his>> <<= ↂ.T.clothes.outfits.casual.panties>> down. <<name s>> swallows nerviously while glancing around and tries to cover <<his>> crotch. @@.pc;Don't worry silly, you should not be shy of such a gorgeous body!@@ With this you yank <<his>> underwear down completely and it falls to the ground exposing <<his>> <<n _t "cock.n">>.`,
      ],
      openPublic: "none",
      nonCon: "none",
      romantic: "none",
      risky: "none",
      preg: "none",
      isPreg: "none",
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
      sub: "none",
      dom: [
        `Grabbing both sides of <<n _t "hisher.q">> waistband, you quickly yank <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.panties>> downward to the floor, leaving <<n _t "hisher.q">> lower body and <<n _t "cock.n">> fully exposed.`,
      ],
      degrade(){
        if (ↂ.T.main.male) {
          if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
            // lol tiny
            return `You observe <<his>> bulge with visible scepticism. @@.pc;Let's see what we have here...@@ This makes <<name s>> uncomfortable but <<n _t "heshe.q">> still tries to keep it cool until you start tugging <<his>> <<= ↂ.T.clothes.outfits.casual.panties>> down to <<his>> knees exposing the <<n _t "cock.s">> <<n _t "cock.n">>. You burst with a laughter exaggerating it on a purpose. @@.pc;Ahahaha! Well... I almost feel sorry for you. Almost. Hehe. This is like the smallest nub I have ever seen, you know?@@ <<name s>> tries to hide his embarassment but you can see <<his>> cheeks going tomato red and you just can't stop yourself from mocking <<him>> a little bit more. @@.pc;Aww, don't have such a sad look, I guess it is not your fault that you got such a small tool. Well, it would be more sincere to call it an overgrown clit to be honest.@@`;
          } else {
            // yay
            return `You pull <<name s>>'s <<= ↂ.T.clothes.outfits.casual.panties>> down to <<his>> knees and take a closer look on the <<n _t "cock.s">> <<n _t "cock.n">>. @@.pc;Well, I hope this thing will stay stiff until I am satisfied... At least it is average sized.@@ It seems that <<name s>> is not agree with your words and frankly, you think that <<his>> cock is pretty big but you just can't stop yourself from degradading <<him>>.`;
          }
        } else {
            return `Gently pushing on <<name s>>'s <<= ↂ.T.clothes.outfits.casual.panties>> you slide them down exposing <<his>> lovely <<n _t "cock.n">> in it's full glory.`;
        }
      },
      slut: "none",
      bimbo: "none",
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
        `You feel like this is getting bored and you have no intention to continue. Backing from <<name s>> you sigh. @@.pc;That's enough.@@ <<name s>> looks surprised but obeys your order and stop.`,
      ],
      degrade: "none",
      slut: "none",
      bimbo: "none",
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
  };
  aw.con.info(`Sex Act Library loaded.`);
};
