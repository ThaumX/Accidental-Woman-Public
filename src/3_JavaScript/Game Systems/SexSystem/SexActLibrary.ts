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
// function to retrieve text from library
setup.library.callSexAct = function(book: string, chapter: string, page: string | -1 = -1, chapArray: 0 | any[] = 0): string {
  // first check to make sure the entry exists
  try {
    if (setup.library.sexact == null || "object" !== typeof setup.library.sexact) {
      aw.con.warn(`Library lookup failed, sexact library isn't initialized.`);
      return "error";
    } else if (setup.library.sexact[book] == null || "object" !== typeof setup.library.sexact[book]) {
      aw.con.warn(`Library lookup failed, couldn't find ${book} in sexacts.`);
      return "error";
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
    },
    squeezeBreasts: {
      standard: [
        `Reaching toward <<= ↂ.T.main.name>>’s chest, you place the palms of your hands against her <<n _t 'breasts.n'>>. <<if ↂ.T.body.tits.cupNum < 13>>Closing your outstretched fingers, you being to squeeze the soft <<n _t 'titshape.q'>> flesh, kneading it gently with the tips of your fingers.<<elseif ↂ.T.body.tits.cupNum > 22>>Sliding your hands down and under them, you heft the <<n _t 'titsize.q'>> masses that are <<if ↂ.T.body.tits.cupNum > 30>>far <</if>>too large to contain in a single hand.<<else>>Collapsing your hands to contain the delectable flesh, you begin pressing with your fingers. They sink in slightly as you begin a slow kneading motion.<</if>> You can feel the <<n _t 'areolapuffy.q'>> <<n _t 'nipples.n'>> tightening up <<if ↂ.T.body.tits.nipLength > 2>>and pushing against <</if>>the palms of your hands. You enjoy the warmth of her <<n _t breasts.n>> as you continue to fondle them contentedly.`,
      ],
    },
    suckNipples: {
      standard: [
        `Placing your hand on one of <<= ↂ.T.main.name>>’s <<n _t 'breasts.n'>>, you lean in and engulf the <<n _t nipple.n>> with your <<p lips.n>>. Swirling your tongue around her <<n _t 'nipple.n'>>, you begin groping at the other <<n _t 'breast.n'>> with your free hand, kneading your way to the <<n _t 'nipple.n'>>. You begin sucking more firmly, squeezing the <<n _t nipwidth.q>> flesh between your <<p lips.q>> lips while you likewise increase the intensity of your hand’s ministrations on her other <<n _t 'nipple.n'>>. <<if ↂ.T.status.milk > 0>>Your efforts have started the flow of milk, her fresh cream <<if ↂ.T.status.milk < 3 || ↂ.T.body.lactation  < 2>>leaking into<<elseif ↂ.T.body.lactation < 4>>filling<<else>>flooding<</if>> your mouth and wetting your fingers.<</if>>`,
      ],
    },
    cupBalls: {
      standard: [
        `Gently moving your hand down between <<= ↂ.T.main.name>>'s legs, you start to slowly trail the tips of your fingers along the taut skin of <<n _t "hisher.q">> <<n _t "ballsack.n">>. <<= ↂ.T.main.name>> shudders slightly at your light touch, breath catching in <<n _t "hisher.q">> throat as <<n _t "heshe.q">> struggles to remain calm. You slide your hand fully under to cup <<n _t "hisher.q">> <<n _t "balls.q">> <<n _t "balls.n">> in your palm. Your fingertips softly pressing against <<n _t "hisher.q">> taint, you slowly and firmly enclose <<n _t "hisher.q">> <<n _t "ballsack.n">> in your grasping fingers. Playfully, you begin moving your fingers around and against the warm flesh of <<= ↂ.T.main.name>>'s <<n _t "ballsack.n">>, your digits twisting, twirling, and rotating <<n _t "hisher.q">> <<n _t "balls.n">> in all manner of directions. <<= ↂ.T.main.name>> watches with lips parted, breath ragged and strained as you entertain yourself with <<n _t "hisher.q">> <<n _t "ballsack.q">> <<n _t "ballsack.q">>. With every tug and stroke you give <<n _t "hisher.q">> dangling <<n _t "ballsack.n">>, you can see <<n _t "hisher.q">> <<n _t "cock.n">> pulsing and throbbing, the feeling of your hand engorging it with desire.`,
      ],
    },
    slowDown: {
      standard: [
        `You urge <<= ↂ.T.main.name>> to slow down and take it a little easier on your <<p pussy.q>> <<p pussy.n>>.`,
      ],
    },
    speedUp: {
      standard: [
        `You start thrusting your hips yourself, interrupting <<= ↂ.T.main.name>>'s rhythm slightly in an attempt to get <<n _t "himher.q">> to fuck you faster.`,
      ],
    },
    speedUpDouble: {
      standard: [
        `Thrusting your hips toward <<= ↂ.T.main.name>> forcefully, you urge <<n _t "himher.q">> to fuck you faster. @@.pc;Faster. Faster!@@`,
      ],
    },
    doNothing: {
      standard: [
        `Enjoying what <<= ↂ.T.main.name>> is doing, you begin to go limp and lie there. You trust him and know <<n _t "heshe.q">> would never to anything to hurt you. It’s very easy to just surrender yourself to the pleasure he's causing you, and just relax as <<n _t "heshe.q">> works to bring you to a satisfying climax.`,
      ],
    },
    strokeCock: {
      standard: [
        `<<= ↂ.T.main.name>> grips the base of <<n _t "hisher.q">> rigid <<n _t "cock.n">>, presenting its swollen length and waiting for you to make the next move. <<n _t "hisher.q">> hard <<n _t "cock.n">>, rigid and standing out from <<n _t "hisher.q">> <<n _t "fat.q">> frame, bobs and pulses in vulgar anticipation of the touch of your hand. Reaching out, you take hold of him, <<= ↂ.T.main.name>> moving <<n _t "hisher.q">> own hand aside to give you unfettered access to <<n _t "hisher.q">> <<n _t "cock.n">>. Under <<n _t "hisher.q">> watchful eye, you slowly slide your fingers along the length of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. Your mouth curls into a slight smile, as you feel <<n _t "hisher.q">> <<n _t "cock.n">> slowly pulsing against your palm, <<= ↂ.T.main.name>>'s <<n _t "cock.n">> straining more with every stroke. As you work your fingers up and down <<n _t "hisher.q">> length, <<= ↂ.T.main.name>> gives a low moan, and you watch as a glistening drop of precum slowly trickles out of the head of <<n _t "hisher.q">> <<n _t "cock.n">>. Moving your thumb up to <<n _t "hisher.q">> <<n _t "cockhead.n">>, you rub against the light glisten of slick moisture, working the fluid around and between your fingers and then using it to lubricate <<n _t "hisher.q">> <<n _t "cock.n">> for your continued stroking.`,
      ],
    },
    fingerPussy: {
      standard: [
        `<<if ↂ.sex.npcWetness[ↂ.sex.target] < 5>>Quickly sticking your first two fingers into your <<p mouth.n>> to prepare them first<<else>>Rubbing your first two fingers along the <<n _t wet.q>> folds of her <<n _t labia.n>><</if>>, you slip them inside her <<n _t pussy.q>> <<n _t "pussy.n">>. You feel her heat immediately, <<if ↂ.sex.npcWetness[ↂ.sex.target] > 4>>your fingers slick with her nectar.<<else>>your saliva mixing with her own nectar.<</if>> <<if ↂ.skill.oral < 25>>You start moving your fingers experimentally, exploring her depths as you push them deeper inside. When they can go no further<<elseif ↂ.skill.oral < 50>>You begin exploring her depths by touch, slowly pushing your fingers deeper inside. When they can go no further <<else>>With a deft touch you curl your fingers slightly, pressing with your fingertips as you push them deeper inside; waiting for the telltale twitch of her pleasure. Reaching your mark<</if>>, you begin sliding your fingers back out of her <<n _t pussy.n>> only to reverse their course to dive back inward. You continue drawing your fingers out only to plunge them back inside, your tempo slowly increasing into a rapid series of short thrusts<<if (ↂ.sex.npcOrgasm[ↂ.sex.target] / ↂ.T.status.pleasure) > 0.5>> to match her rapid breathing.<<else>>.<</if>> `,
      ],
    },
    touchCock: {
      standard: [
        `Reaching down between <<= ↂ.T.main.name>>'s legs, you place the tip of your finger gently against <<n _t "hisher.q">> <<n _t "cock.n">>, right against the sensitive ridge where the swell of <<n _t "hisher.q">> <<n _t "cockhead.n">> meets the rest of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. At a slow, tantalizing pace, you trail your finger down the length of <<n _t "hisher.q">> <<n _t "cock.n">>. Your fingertip brushes against one of the veins that run through <<n _t "hisher.q">> <<n _t "cock.n">>, and you can feel the steady thrum of <<n _t "hisher.q">> pulse inside of <<n _t "hisher.q">> swollen manhood as you lightly trail your way down to the base of <<n _t "hisher.q">> <<n _t "cock.n">>. With your finger down against where <<n _t "hisher.q">> <<n _t "cock.n">> meets the rest of <<n _t "hisher.q">> <<n _t "fat.q">> body, <<if ↂ.T.body.pubes != "shaved">>you trail your index finger around, enjoying the feel of <<n _t "hisher.q">> <<n _t "pubecolor.q">> pubic hair ticking against your skin, before reaching your hand down and underneath <<n _t "hisher.q">> <<n _t "cock.n">>.<<else>> you run the tip of your finger around the smooth skin at the base of <<n _t "hisher.q">> <<n _t "cock.n">>, before moving your hand down and underneath <<n _t "hisher.q">> <<n _t "cock.n">>.<</if>> Cupping <<= ↂ.T.main.name>>'s <<n _t "cock.n">> in your palm, you slowly curl your fingers around him, the feeling of <<n _t "hisher.q">> hot, <<n _t "cock.q">> length in your hand sending a warm shudder through your body. <<= ↂ.T.main.name>> watches with breath held as you enclose <<n _t "hisher.q">> <<n _t "cock.n">> in your firm grasp, fingers gripping firmly around him.`,
      ],
    },
    playWithNipples: {
      standard: [
        `Reaching up, you place the palms of your hands against your <<p breast.s>> <<p breasts.n>>, thumb and index fingers of each hand reaching up to brush against your areolae. <<if ↂ.pc.body.tits.nipLength  > 3>>Your <<p nipl.q>> <<p nipples.n>> are already stiff and sensitive, and before long you gasp as your fingertips brush against the hard nubs poking out from your <<p breasts.n>>.<<else>>As <<= ↂ.T.main.name>> watches, you slowly begin stroking your fingertips against the darkened circles, feeling the tender flesh begin to stiffen under your own touch. Soon enough, you can feel the tender buds of your <<p nipl.q>> <<p nipples.n>> emerge from hiding, and you are quick to grip them between the tips of your teasing digits.<</if>> You play delicately at first, but soon find yourself giving your <<p nipples.n>> a light tug, a gasp escaping your throat at the heady mix of pleasure and pain that hits your <<p fat.q>> body in one big jolt. Soon you go from tugging to twisting, moaning as you test your own limits and how much wonderful abuse your <<p nipw.q>> <<p nip.n>> can take.`,
      ],
    },
    rubOwnVulva: {
      standard: [
        `At a slow and deliberate pace, you run one hand down your own body. First sliding it down your neck, you brush down against one <<p boob.n>>, following its <<p breast.s>> curve down past your chest and against your stomach. After several tantalizing seconds, your hand finds the object of its quest. With the tips of your fingers, you begin rubbing in soft, lazy circles along the outer lips of your <<p pussy.n>>. <<if ↂ.sex.pcWetness > 6>>By this point, you are already dripping <<p curwet.q>>, and your hand is soon soaked with the juices of your arousal as you feel around the <<p labia.n>> of your <<p pussy.n>> under <<= ↂ.T.main.name>>'s watchful eye.<<else>>As you begin teasing and stimulating the sensitive folds of your <<p pussy.n>>, your breath begins to come faster and you can feel your face flush, as you brazenly play with yourself under <<= ↂ.T.main.name>>'s watchful eye.<</if>> Licking your lips, you quicken the pace of your strokes, pressing your fingers firmly against your horny <<p pussy.n>> as you tease yourself into a higher state of desperate arousal.`,
      ],
    },
    rubOwnClit: {
      standard: [
        `With two fingers, you spread apart the flesh at the very top of your <<p pussy.n>>, exposing the tender flesh of your <<p clit.n>> underneath. Placing another finger against your <<p clit.s>> <<p clit.n>>, you begin to softly move it in a circle, jolting slightly at the feeling of hot pressure against the nerve-filled organ of pleasure between your legs. After several seconds of light, lazy self-stimulation, you know that you need more. Placing a second finger next to your first, you increase the pace of your strokes as you firmly rub and tease your horny <<p clit.n>>. Knowing that <<= ↂ.T.main.name>> is there with you as your hand works busily between your legs makes your self-pleasure feel all the more delightfully dirty, and soon your fingers move in rapid, desperate circles against your <<p clit.q>> throbbing <<p clit.n>>, your breath coming out in vulgar gasps with every flick of your wrist.`,
      ],
    },
    passionateKiss: {
      standard: [
        `You lean your head in and press your lips heavily against <<n _t "hishers.q">>. <<= ↂ.T.main.name>> grabs at your arms and holds you closer, while your <<p lips.q>> lips and <<n _t "hisher.q">> dance tightly together. You both pull away to catch your breath, only to quickly draw together once again. Eyes closed, head turned, you grope your hands frantically against <<n _t "hisher.q">> back as you hungrily kiss him, your head swimming at the intensity of the passion. Another pause for breath, and you open your mouth to say something, only to feel <<= ↂ.T.main.name>>'s lips against you for a third time. You press harder with each repeated kiss and then finally release to let the moment linger.`,
      ],
    },
    sensualKiss: {
      standard: [
        `You can hear the pace of your breathing increase and your heart flutter, as you and <<= ↂ.T.main.name>> move in closer to each other. Before long, you can feel the soft press of <<n _t "hisher.q">> lips against yours, as <<n _t "hisher.q">> hands reach around to grip you behind the back and pull you closer. Soon you find yourself mirroring <<n _t "hisher.q">> action, matching the intensity of <<n _t "hisher.q">> kiss as you reach around to embrace him around the waist. You can't help but moan as you feel <<n _t "hisher.q">> hands begin stroking along your back, your face flushing at the feeling of <<n _t "hisher.q">> arms around you, <<n _t "hisher.q">> <<n _t "fat.q">> body pressed tightly against yours. Sliding your hands up <<n _t "hisher.q">> back, you give him a light scratch with your nails. <<= ↂ.T.main.name>> gives a quick jerk of surprise, but from the way <<n _t "hisher.q">> kiss increases in intensity, it's obvious that <<n _t "heshe.q">> enjoyed the sudden feeling of light pain. Eventually, reluctantly, the two of you part, your eyes locking as you both consider what is to come next.`,
      ],
    },
    romanticKiss: {
      standard: [
        `You find your eyes locked on <<= ↂ.T.main.name>>'s, the two of you staring at each other with obvious affection. Biting your lip, you shift closer to him, hoping that <<n _t "heshe.q">> picks up on your signals. From the way <<n _t "hisher.q">> head moves towards you, it's obvious that he's feeling the same as you are. Soon your lips softly meet, your heart pounding like a drum in your chest as you and <<= ↂ.T.main.name>> share a warm, tender kiss. You can feel <<n _t "hisher.q">> hand come up to rest against your cheek, while <<n _t "hisher.q">> other arm wraps around your waist, pulling you closer. Your own hand reaches up behind <<n _t "hisher.q">> neck, not wanting <<= ↂ.T.main.name>> or <<n _t "hisher.q">> soft lips to move a single inch from where they are right now.`,
      ],
    },
    nibbleEar: {
      standard: [
        `Moving your mouth up to the side of <<n _t "hisher.q">> head, you signal your intention by lightly brushing the outer edge of <<= ↂ.T.main.name>>'s earlobe with your tongue. Taking the soft flesh into your mouth, you begin lightly nibbling, giving several spots on <<= ↂ.T.main.name>>'s ear the attention of your hot breath and gentle bite.`,
      ],
    },
    necking: {
      standard: [
        `Leaning your head to the side, you being laying light kisses down <<= ↂ.T.main.name>>'s neck and shoulders. <<n _t "heshe.q">> leans <<n _t "hisher.q">> head away, giving your roaming lips better access to <<n _t "hisher.q">> <<n _t "skincolor.q">> flesh. A wicked thought crosses your mind, and picking a spot low on <<n _t "hisher.q">> neckline, you form your mouth into an O-shape and press down on <<n _t "hisher.q">> skin. <<= ↂ.T.main.name>> winces as you suck hard, and when you pull away after several seconds of hard suction, you can see the darkening of <<n _t "hisher.q">> flesh and smile. Whatever else happens tonight, you've left your mark on him.`,
      ],
    },
    lickCock: {
      standard: [
        `You lick your lips as your <<= ↂ.pc.body.eyeColor>> eyes lock on <<= ↂ.T.main.name>>'s rigid <<n _t "cock.n">>. Staring at <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>, you're struck with the overwhelming urge to have a taste. Gripping your thumb and index finger around the base of <<n _t "hisher.q">> <<n _t "cock.n">>, you move your face in close, enjoying the musky aroma of <<n _t "hisher.q">> <<n _t "cock.n">>. You hear <<= ↂ.T.main.name>> make a long, low sound in the back of <<n _t "hisher.q">> throat, as the tip of your tongue makes wet contact with the very base of <<n _t "hisher.q">> prick. Eyes locked on <<n _t "hisher.q">> <<n _t "cock.q">> manhood, you slowly pivot your head upward. Your wet tongue leaves a gleaming trail as it navigates its way up <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>, as you breathe in deeply with your nose, enjoying having your senses of taste and smell both filled with nothing but <<= ↂ.T.main.name>>'s <<n _t "cock.n">>. Finally, your tongue makes the complete journey, and you flick the tip of it around the sensitive folds of skin where the head of <<n _t "hisher.q">> <<n _t "cock.n">> meets the <<n _t "cock.n">>.`,
      ],
    },
    kissCock: {
      standard: [
        `You stare lovingly at <<= ↂ.T.main.name>>'s <<n _t "cock.n">> in front of you. It pokes out rigidly from <<n _t "hisher.q">> hips, <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> standing at attention in front of you. Wetting your lips thoroughly with your tongue, you lean your head in close and plant a gentle kiss against the head of <<n _t "hisher.q">> <<n _t "cock.n">>. Your mouth lingers for several seconds, as you make sure that the spot where your lips meet <<n _t "hisher.q">> <<n _t "cock.n">> is thoroughly saturated with your saliva. As you pull away and see the light gleaming where your mouth had been, you make sure to let out a long, hot breath. <<= ↂ.T.main.name>> gasps as <<n _t "heshe.q">> feels your warm exhale against the dampened surface of <<n _t "hisher.q">> hard <<n _t "cock.n">> watching as <<n _t "hisher.q">> manhood twitches with each impact of your lips against its slowly expanding surface. You love this <<n _t "cock.q">> <<n _t "cock.n">> so much, and by the time you're done raining kisses on it, there's no way that <<= ↂ.T.main.name>> doesn't see the depth of your affection.`,
      ],
    },
    exploreVulva: {
      standard: [
        `Spreading open her <<n _t 'vulva.n'>> with your mouth, you extend your tongue to start exploring the soft crevice of her <<n _t 'curwet.q'>> <<n _t 'vulva.n'>>. Taking a breath and holding it as if preparing to dive underwater, you push your face closer. <<if ↂ.sex.npcWetness[ↂ.sex.target] > 8>>Ignoring the nectar being smeared on your face by her <<n _t 'vulva.n'>>, you<<else>>You<</if>> begin a gentle study with your tongue, almost languidly tasting every succulent fold before you. `,
      ],
    },
    suckCockHead: {
      standard: [
        `Taking the base of <<= ↂ.T.main.name>>'s <<n _t "cock.n">> in hand, you raise it up and bring <<n _t "hisher.q">> head close to your face. Parting your lips slightly, you take a deep breath before pressing your mouth down on the <<n _t "cockhead.n">> of <<= ↂ.T.main.name>>'s <<n _t "cock.q">> <<n _t "cock.n">>. <<= ↂ.pc.body.eyeColor>> eyes closed in sensual concentration, you begin working your tongue around the swollen glans filling your hot and eager mouth. A heated moan escapes <<= ↂ.T.main.name>>'s throat as <<n _t "heshe.q">> watches you lovingly slurp on <<n _t "hisher.q">> <<n _t "cockhead.n">>, the nerve endings clustered at the very tip of <<n _t "hisher.q">> <<n _t "cock.n">> sending waves of sensations directly to the pleasure center of <<n _t "hisher.q">> brain with every swirl of your tongue. All while you make muffled "mmm" noises, feeling the hot splash of <<n _t "hisher.q">> early <<n _t "cum.n">> against your tongue and happily swallowing down every last drop of <<n _t "hisher.q">> arousal.`,
      ],
    },
    strokeVulvaTongue: {
      standard: [
        `Parting your <<p lips.n>>, you reach out with your tongue to touch the bottom of her <<n _t vulva.n>>. Slowly, tantalizingly, you work your way up the line of her <<n _t "labia.n">>, teasing her <<n _t wet.q>> flesh. <<if ↂ.skill.oral < 50>>You finally reach the apex<<else>>You can sense her muscles tensing in anticipation as your reach the apex<</if>>, your tongue glancing across the sensitive bud waiting there. Moving back down you begin a regular stroke, licking upward with your tongue through the middle of her <<n _t wet.q>> <<n _t vulva.n>> before dragging it over her <<n _t "clit.n">>. You keep a steady pace that’s punctuated by the soft shudders of <<= ↂ.T.main.name>>’s growing arousal.`,
      ],
    },
    suckCockInOut: {
      standard: [
        `Gripping <<n _t "hisher.q">> <<n _t "cock.n">> in one of your hands, you angle it upwards, putting it at just the right angle for what you have planned for <<n _t "hisher.q">> <<n _t "cock.n">>. Pressing your lips down onto <<n _t "hisher.q">> <<n _t "cockhead.n">>, you let your saliva drip out, to drip down onto him and lubricate <<n _t "hisher.q">> <<n _t "cock.n">>. Parting your lips further, you allow <<n _t "hisher.q">> <<n _t "cockhead.n">> to enter into your mouth, enjoying the taste of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> against your tongue. Slowly, teasing him just a little, you slid your mouth down around <<n _t "hisher.q">> <<n _t "cock.n">>, <<if ↂ.T.body.cock.length > 50>>stopping only when you feel the tip of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> starting to enter your throat.<<else>>until you have <<n _t "hisher.q">> entire <<n _t "cock.n">> in your mouth, down to the base.<</if>> Pulling your head back, you only allow yourself a second to catch a breath before ingesting <<n _t "hisher.q">> <<n _t "cock.n">> again. This time you keep it in for longer, working your head around between <<n _t "hisher.q">> legs and moving <<n _t "hisher.q">> cock around the hot interior of your mouth. Soon the air is filled with the wet sound of your sloppy, enthusiastic cock-sucking, along with <<= ↂ.T.main.name>> strained grunts as <<n _t "heshe.q">> watches you eagerly attack <<n _t "hisher.q">> <<n _t "cock.n">> with your mouth, leaving it dripping with your spit.`,
      ],
    },
    lickClit: {
      standard: [
        `Using the tips of your fingers, you gently expose the delicate flesh of her <<n _t 'clit.q'>> <<n _t 'clit.n'>>. A low moan escapes <<= ↂ.T.main.name>>’s lips as you give it a few quick flicks with the tip of your tongue, her hips shuddering lightly at the sudden contact. You begin rubbing your tongue back and forth across the sensitive button, slowly increasing the intensity until most of your tongue rubs against it with each stroke. You quickly find a rhythm, dragging your tongue in different directions as if tracing imaginary shapes; all the while you can feel the tension of her muscles slowly building as her pleasure mounts.`,
      ],
    },
    rubAgainstTarget: {
      standard: [
        `Moving in close, you press yourself against him, putting as much of your nude body against <<n _t "hisher.q">> as you can manage. You moan as you move your bare, <<n _t "tone.q">> frame against <<n _t "hishers.q">>, the flesh of <<n _t "hisher.q">> <<n _t "fat.q">> body pressing against yours. You make sure to push your <<p breasts>> into him, loving the feel of your <<p nipples.n>> rubbing against <<n _t "hisher.q">> <<n _t "chest.n">>.`,
      ],
    },
    grindVulvaAgainst: {
      standard: [
        `Moving in close to <<= ↂ.T.main.name>>, you press the juncture between your legs forcefully against <<n _t "hisher.q">> thigh. The pressure of <<n _t "hisher.q">> leg against your <<p vulva.n>> sends a giddy buzz through your body, and soon you begin moving your hips up and down against him, the friction against your naked <<p pussy.n>> causing it to drip your horny juices all over <<n _t "hisher.q">> thigh.`,
      ],
    },
    embrace: {
      standard: [
        `You maneuver yourself closer to <<= ↂ.T.main.name>>, the pace of your breathing increasing slightly as you feel him near to you. You're inches away now, and you can almost feel the heat radiating off <<n _t "hisher.q">> naked body. Your arms move slowly around <<n _t "hisher.q">> waist and you press your palms into <<n _t "hisher.q">> back, enfolding him into a soft embrace. You can feel <<= ↂ.T.main.name>>'s own arms around your neck, and you rest your head against him, warm and content.`,
      ],
    },
    passionateEmbrace: {
      standard: [
        `Leaping at <<= ↂ.T.main.name>> you attack him with a powerful hug. Arms wrapped as tight as they’ll go around <<n _t "hisher.q">> back, you give him a hard, almost desperate squeeze. Almost by instinct, <<n _t "heshe.q">> returns your embrace and holds you close. Just tight enough to be comforting, and just on the edge of painful, <<n _t "hisher.q">> arms enfold you and press you close to him.`,
      ],
    },
    rockHips: {
      standard: [
        `With <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">> still inside of you, you begin rolling your hips around against <<n _t "hishers.q">>, grinding and pressing against <<= ↂ.T.main.name>>. You can feel him watching you and make a show of it, reaching up to cup your <<p breast.s>> <<p breasts.n>> as you wiggle your pelvis around. With a slow motion, you move slightly away from him, dripping <<n _t "cock.s">> <<n _t "cock.n">> emerging slightly from your <<p "vulva.n">>, before pressing forward and burying him fully inside of you once again. Throwing your head back, your <<p hairl.q>> <<p haircolor.q>> hair flying around your head, you move against him with reckless abandon. <<n _t "hisher.q">> rigid manhood is dripping wet with your <<p vulva.n>> juices, and your head is swimming with the intensity of the moment as you try your best to make <<n _t "hisher.q">> <<n _t "cocklength.q">> <<n _t "cock.n">> touch every last inch of your inner walls.`,
      ],
    },
    liftLegsInAir: {
      standard: [
        `Shifting yourself around, you raise your legs into the air. Parting your thighs to give <<= ↂ.T.main.name>> better access to your <<p "vulva.n">>, you shift your weight back to your upper body. <<= ↂ.T.main.name>> sees you lifting and holding your legs apart, eagerly presenting your crotch to him.`,
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
    },
    whisperInEar: {
      standard: [
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I want you to lay me out like a floorplan and fuck me in every square inch of this room.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I can't wait to feel you inside me.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;I'm so goddamn wet for you right now.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;Fuck me, <<= ↂ.T.main.name>>. Fuck me till I scream.@@`,
        `You lean in close and whisper into <<= ↂ.T.main.name>>'s ear. @@.pc;You think this is good? We're just getting started.@@`,
      ],
    },
    requestCondom: {
      standard: [
        `Getting worried about the risk of pregnancy, you make a request. @@.pc;Can you put a condom on?@@`,
        `Getting worried about the risk of pregnancy, you make a request. @@.pc;Hey, I'm not on the pill. Could you wear protection, <<= ↂ.T.main.name>>?@@`,
        `Getting worried about the risk of pregnancy, you make a request. @@.pc;Slow down a second, <<= ↂ.T.main.name>>. Let's play it safe, okay?@@`,
      ],
    },
    pullOffCondom: {
      standard: [
        `<<= ↂ.T.main.name>> feels so good inside you. But you need more. Need to feel the real him inside of you. Feel <<n _t "hisher.q">> <<n _t "cock.n">> against your inner walls, without anything separating the two of you. There are so many reasons why you shouldn't, but in the heat of the moment you want nothing more than to cast all of those doubts aside. Locking your gaze on <<n _t "hisher.q">> <<= ↂ.T.body.eyeColor>> eyes, you reach down to press a hand against <<n _t "hisher.q">> stomach, signaling without words for him to pull out of you. <<= ↂ.T.main.name>> is confused at first, not certain why you're putting a momentary stop to <<n _t "hisher.q">> eager thrusts inside of you. But <<n _t "heshe.q">> complies nonetheless, pulling <<n _t "hisher.q">> latex-sheathed <<n _t "cock.n">> out of you. Cocking an eyebrow, you reach a hand down to <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>, fingers finding the edge of the condom and slowly rolling it off. <<n _t "hisher.q">> eyes widen as <<n _t "heshe.q">> realizes what you're doing, but after giving him a confident nod, <<n _t "heshe.q">> holds still while you roll off and remove <<n _t "hisher.q">> condom. With a dismissive flick, you send it flying away, and a moan escapes your lips as <<n _t "heshe.q">> enters you again. Now with nothing separating <<n _t "hisher.q">> thrusting <<n _t "cock.n">> from your dripping <<p vulva.n>>. <<comment "Unfortunately the writer's take on this action doesn't match the <b>actual</b> action, which is more about pulling off a condom pre-sex and not in the middle of it. (also the NPC can say no!) This was interesting enough that I kept it, but will have to put it with a new action after some editing.">>`,
      ],
    },
    removeOwnClothing: {
      standard: [
        `Reaching for the lower hem of your upper garment, you grab hold with both hands and begin to draw it slowly upward, past your <<p belly.n>> and <<p "breasts.n">> and up over your head, giving a toss of your <<p haircolor.q>> hair as you pull the garment away. Casually tossing the article of clothing away, you then draw your arms behind your back, reaching to undo the hooks of your bra. A quick motion later, and your <<p tits.q>> <<p tits.n>> are bare and exposed, your bra sliding down off your bare upper torso to hit the floor. Reaching down to the waistband of your lower garment, you unfasten and slide the last remaining piece of outerwear down to your ankles. Your underwear comes off in nearly the same way, as you bend down to slide them off your hips. You now stand completely nude before <<= ↂ.T.main.name>>. <<comment "better clothing removal actions (targeted, for one thing) will happen when clothing gets it's update & fixes!">>`,
      ],
    },
    removeTargetClothing: {
      standard: [
        `You wrap your hands around <<= ↂ.T.main.name>>'s back, moving them down <<n _t "hisher.q">> waist to take hold of the bottom of <<n _t "hisher.q">> upper garment. As you pull upward on <<n _t "hisher.q">> clothes, <<n _t "heshe.q">> leans forward with <<n _t "hisher.q">> arms raised overhead, allowing you to pull away <<n _t "hisher.q">> shirt and fling it aside, exposing <<n _t "hisher.q">> <<n _t "fat.q">> upper body. Sliding down onto your knees, you begin to unfasten <<n _t "hisher.q">> pants, playfully sliding them down <<n _t "hisher.q">> thighs. Before long, you've worked <<n _t "hisher.q">> lower garment down <<n _t "hisher.q">> legs, letting them fall down and puddle around <<n _t "hisher.q">> ankles. From your current position, you can see the outline of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> through the fabric of <<n _t "hisher.q">> underwear, and you can feel your mouth start to water in anticipation. Grabbing both sides of <<n _t "hisher.q">> waistband, you quickly yank them downward to join <<n _t "hisher.q">> pants, leaving <<n _t "hisher.q">> lower body and <<n _t "cock.n">> fully exposed. Stepping out of <<n _t "hisher.q">> crumpled lower garments, <<n _t "heshe.q">> stands before you, not a stitch of clothing on <<n _t "hisher.q">> <<n _t "fat.q">> body.`,
      ],
    },
    stopHavingSex: {
      standard: [
        `It's all so much. So intense. In the heat of your passion, you realize that you need to take a break. But try as you might, you can make yourself form the words, the only sounds you're able to make a series of desperate, strained grunts as <<n _t "heshe.q">> continues <<n _t "hisher.q">> thrusting inside of you. Eventually, your eyes meet <<n _t "hishers.q">>, and somehow <<n _t "heshe.q">> is able to read the discomfort there. Part of you worries that <<n _t "heshe.q">> might keep going, so intent on <<n _t "hisher.q">> lovemaking that <<n _t "heshe.q">> ignores the intent in your stare. But instead, <<n _t "heshe.q">> immediately stops, pulling out and looking somewhat abashed.`,
      ],
    },
  };
  aw.con.info(`Sex Act Library loaded.`);
};
