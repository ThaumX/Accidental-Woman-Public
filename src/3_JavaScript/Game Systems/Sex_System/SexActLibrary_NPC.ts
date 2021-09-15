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

    // NPCs actions properly
    strokeHair: {
      standard: [
        `<<= ↂ.T.main.name>> lifts up a hand, placing it lightly on the side of your head. <<n _t "hisher.q">> fingers drift through the <<p hairl.q>> strands of your <<p haircolor.q>> hair, feeling down your <<p haircurl.q>> locks with surprisingly gentleness. Soon, you can feel <<n _t "hisher.q">> fingertips tracing delicate paths against your scalp, the sensation sending a pleasant tingle through your body.`,
      ],
      lesbian: [
        `<<name _t>> approaches you with an affectionate smile on her face, she caresses your head, passing her hand lovingly between your strands of hair and repeatedly rubbing your scalp; You appreciate the affectionate gesture returning the smile to <<name _t>>.`
      ],
      public: [
        `<<name _t>> approaches you quietly and slowly, looking into your eyes he raises <<his>> hand against your head, beginning to caress you affectionately. Without wanting to draw anyone's attention, you and he just smile at each other when he continues to caress softly against your hair.`
      ],
      openPublic: [
        `<<name _t>> comes to you smiling and, with a slow gesture, he starts stroking your head in front of other people. The affectionate act is not exactly what the audience looking at you wants to see, but it is a welcome gesture. You give <<name _t>> a small smile as he continues to caress your hair.`
      ],
      nonCon: [
        `<<name _t>> approaches you with a smile full of lust on <<his>> face, without taking <<his>> eyes off your body. Although this is not a typical consensual relationship, he starts to caress your head while he devours your body with <<his>> gaze. <<his>> touch is just a little soft, a little rough too, but it is a welcome gesture even in this situation.`
      ],
      romantic: [
        `<<name _t>> gently caress your hair with <<his>> hand over your head. You purr from delight while <<n _t 'heshe.q'>> strokes and plays with your <<p hairl.q>> strands in a loving and romantic fashion. It feels deeply comforting and you drift into cozy state.`,
      ],
      risky: [
        `<<name _t>> approaches you smiling while looking into your eyes, then he starts to caress your head in a smooth and affectionate movement. The gesture is welcome, you approach him to the point where you can feel the warmth of <<his>> skin, and start fantasizing about the potential risk of getting pregnant this time. The sensation is a powerful mix of a large arousal with a hint of concern, although the intense arousal is increasingly controlling your body.`
      ],
      preg: [
        `<<name _t>> envelops you in <<his>> arms, then he starts affectionately caressing your head, passing <<his>> fingers between your arms and causing a pleasant sensation physically and emotionally. You smile at him as you feel <<his>> touch, the warmth emanating from <<his>> skin against you and start fantasizing about the coming sex, the prospect of being deeply creampied and successfully impregnated today makes you feel a great arousal and a growing happiness and satisfaction.`
      ],
      isPreg: [
        `<<name _t>> approaches you, looking at your pregnant belly and touching it tenderly while stroking your head with your other hand. <<his>> affectionate gesture is welcome and makes you smile at him while you feel him massage your scalp, you look at your pregnant belly feeling pure maternal satisfaction.`
      ],
      queen: [
        `<<name _t>> envelops you in a warm and gentle embrace, before smiling at you and lifting <<his>> hand up to your head, beginning to caress you gently. You can feel <<his>> upright profusion, although <<his>> gesture is gentle and calm, <<his>> body is pulsing fast and ready to fuck you at any moment. You fantasize about a huge cock though, you bite your bottom lip while unable to contain the arousal inside you elevated by your fantasy of being filled with a big, thick horsecock.`
      ],
      sub: [
        `<<name _t>> approaches you with a warm look, you allow him to wrap you in <<his>> arms just returning the smile to him when you feel him raise a hand to caress your head in a gentle and affectionate gesture. He runs <<his>> hand under your hair, massaging your scalp and making you let out a soft sigh with <<his>> gesture, the submissive position you are in is pleasant and makes your arousal gradually increase in each moment.`
      ],
      dom: [
        `<<name s>> reaches for your head in a simple but powerful motion. You feel <<his>> fingers playing with your <<p haircolor.q>> hair, fingers buried deep between <<p hairl.q>> strands. With your eyes closed you almost purr under <<his>> arm while stroking becomes more and more persistent. Wandering around your scalp <<name s>>'s hand comes to the bunch of <<p haircurl.q>> locks and grabs you forcing you to lean you head back while <<n _t 'heshe.q'>> pulls you in a gentle still strict fashion.`
      ],
      degrade: [
        "" // How to make an affectionate gesture like caressing your girl's head becomes a gesture of degradation?
      ],
      slut: [
        `<<name _t>> gently envelops you in <<his>> arms, whispering some gallantry in your ear and then he strokes your head affectionately, passing <<his>> hand slowly through your hair. <<his>> gesture is warm and welcome, but all this just makes you feel an even more burning and intense desire to be fucked, the little bitch inside you wants a brutal fuck and have her pussy well filled to the limit with a big , hard cock.`
      ],
      bimbo: [
        `<<name _t>> gently embraces you in an affectionate gesture just before you start stroking your head, looking into your eyes and smiling warmly at you. <<his>> gesture, although gentle and welcome, only arouses your furious hunger for cock even more, your body is screaming to be fucked and your pussy begs to be filled until you approach it with a big, thick cock.`
      ],
    },
    cupAss: {
      standard: [
        `<<name _t>> reaches out to your ${either("<<p 'buttshape.q'>>", "<<p 'butt.q'>>", "<<p 'butt.q'>>")} <<p 'butt.n'>>, cupping it with <<his>> hand. The gesture is gentle as <<he>> shows <<his>> appreciation for your <<p 'butt.n'>> over the course several moments; occasionally giving it a firm squeeze or hefting it with <<his>> hand.`,
      ],
      lesbian: [
        `<<name _t>> put her hand on your butt, squeezing it and taking you by surprise, a positive surprise though. You smile at her, feeling the little teasing and she mentions it. @@.npc;I love playing with other girls' bodies, it's so much fun... And hot!@@`
      ],
      public: [
        `<<name _t>> cups your <<p 'butt.n'>> with <<his>> hand and you almost jump. @@.pc;Oh, stop it, anybody can see us here!@@ <<name _t>> just smiles with <<his>> hand shamelessly groping and squeezing your <<p 'butt.q'>> butt.`,
      ],
      openPublic: [
        `<<name _t>> seems especially mischievous being watched, he grabs your butt and squeezes it tightly, you bite your bottom lip realizing that your every move is assisted. The words are left by the lake while he continues to play with you, teasing your butt, the curious eyes make you feel hotter and hotter and yearning for sex.`
      ],
      nonCon: [
        `Panting, <<name _t>> grabs your ${either("<<p 'buttshape.q'>>", "<<p 'butt.q'>>", "<<p 'butt.q'>>")} <<p 'butt.n'>> with <<his>> hand while you try to wiggle out from the grip. @@.pc;Please...@@ Paying no attention to your sobbing, <<name _t>> squeezes and gropes your butt to <<his>> heart's content and you squeal with each painful pinch.`,
      ],
      romantic: [
        `You get the look full of <<name _t>> desire, he approaches you hugging you and grabs your buttocks, squeezing it tightly. <<his>> caress is welcome, you smile at him noticing the rapid pulse of <<his>> body, in anticipation of sex, the heat emanating from <<his>> skin and the smell, all of which makes you feel more aroused, submissive and comfortable to be fucked.`
      ],
      risky: [
        `<<name _t>> smiles at you before approaching and grabbing your buttocks, shaking it a little, without taking your eyes off your body. You can feel the accelerated pulse of <<his>> body, certainly the expectation to fuck you and finally creampie you.`
      ],
      preg: [
        `<<name _t>> smiles at you, barely managing to contain <<his>> arousal, he breathes heavily while grabbing your butt and squeezing the tender flesh firmly; he looks into your eyes barely managing to suppress <<his>> desire to throw you down and fuck you, most likely expecting to get pregnant.`
      ],
      isPreg: [
        `<<name _t>> approaches you, he grabs your butt and squeezes it tightly surprising you, you just moan while you feel <<his>> caresses on your sensitive body because of the pregnancy. You can no longer properly contain your arousal and your libido that is higher thanks to the baby inside you, all you want now is to be filled by a big, hot cock.`
      ],
      queen: [
        `<<name _t>> gives you a mischievous smile just before taking a step towards you and grabbing your buttocks, stroking and then squeezing your tender flesh firmly. He seems to have fun while playing with you, making you let out soft moans and making you more receptive to the sex to come.`
      ],
      sub: [
        `<<name _t>> slowly grabs your buttocks, with shy movements he plays with you, always paying attention to your eyes and expression. <<his>> caresses are weak, but the feeling of controlling sex with a more submissive partner makes you feel more naughty.`
      ],
      dom: [
        `With both hands on your <<p 'butt.q'>> <<p 'butt.n'>> <<name _t>> start fondling it in a patronizing and bossy way squeezing and pinching your asscheeks hard. You squeak with pain while thinking that your butt is probably already bright pink from such harsh treatment.`,
      ],
      degrade: [
        `<<name _t>> looks at you with a cartoon expression and approaches, grabbing your buttocks tightly, and then he declares while teasing you. @@.npc;I wanted it to be bigger, you know... There are women with really bigger and beautiful butts.@@`
      ],
      slut: [
        `<<name _t>> surprises you when he grabs your buttocks tightly, starting to play with the tender meat and teasing you. He laughs at you when you groan in surprise, but you are receptive to <<his>> caress, pressing <<his>> body against you, he continues to caress you making you more aroused, your pussy is craving for a cock, you can barely contain yours hunger for cock while he continues foreplay.`
      ],
      bimbo: [
        `You feel <<name _t>> wrap <<his>> arms around you, so grabbing your buttocks and squeezing soft flesh acts firmly, <<his>> caress is welcome and doesn't take you by surprise. You are already hungry for cock and can no longer contain your arousal, which controls your body and you whisper to <<name _t>> so that he can finally fuck you as you need.`
      ],
    },
    slowDown: {
      standard: [
        `<<name _t>> look at you, with a friendly gesture he touches under your hand, calling your attention before saying. @@.npc;Let's slow it down a little bit, so we can enjoy things more, got it?@@`,
        `You feel the <<name _t>> hand under your face, he looks right in your eyes, seeming to break the rhythm and says. @@.npc;Let's go more slowly, I don't want this to end quickly... We can enjoy more and for longer, right?@@`,
        `<<name _t>> envelops you in <<his>> arms in a tight but calm embrace, he looks you in the eye and, smiling, approaches and whispers under your ear. @@.npc;Hey, let's take it easy with this, we don't want this to end so fast.@@`
      ],
    },
    speedUp: {
      standard: [
        `<<name _t>> looks at you with a dissatisfied look, but soon he seems to think about something and mentions it. @@.npc;Let's speed things up.@@`,
        `<<name _t>> seems to get more impatient, he looks at you seriously and declares. @@.npc;It's time to speed it up, or it will be boring!@@`,
        `The <<name _t>> expression becomes boring and he slaps your buttock, when you give a loud moan in surprise he laughs and declares. @@.npc;Heh, okay... Enough with that, let's speed things up!@@`
      ],
    },
    rubVulvaOutside: {
      standard: [
        `<<name _t>>'s hand drifts down to rest on <<if ↂ.pc.groom.pubeGrow < 2>>smooth skin of your pubic mound.<<else>>the <<p 'pubelength.q'>> hair of your pubic mound<<if ↂ.pc.groom.pubeGrow > 2>>, <<his>> hand gently playing with the ${either("<<p 'pubestyle.q'>>", "<<p 'pubecolor.q'>>")} hair.<<else>>.<</if>><</if>> Soon, <<his>> hand moves lower, rubbing over the top of your <<p 'curwet.q'>> <<p 'labia.n'>> with tantalizing gentleness. You move your hips forward in an attempt to get <<him>> to explore deeper, but <<he>> only continues <<his>> teasing touch.`,
      ],
      lesbian: [
        `<<name _t>> smiles at you before you can feel her hand reach your pussy, her fingers open your lip and start playing around your moist love hole, teasing you and making you moan occasionally while she has fun watching your reaction while your arousal just grows.`
      ],
      public: [
        `<<name _t>> reach <<his>> hand down to your pubic mound and you look around nervously expecting somebody would notice that while <<his>> fingers crawl lower and lower to your <<p vulva.n>>. Almost instantly <<his>> caressing and fumbling with your <<p labia.s>> labia and <<p clit.s>> <<p clit.n>> makes you pant heavily and you stop paying attention to your surroundings.`,
      ],
      openPublic: [
        `<<name _t>> approaches you, you can feel the weight of <<his>> presence instigated by people looking at what you are doing, he grabs your little pussy, starting to massage your clit and then focusing on your lips. He opens your lip and massages your love hole, feeling how hot and wet you are making him smile at you planning how he will fuck you soon.`
      ],
      nonCon: [
        `<<name _t>> hugs you, pressing your body against <<his>> before starting to play with your pussy. Do you feel him open your lip and have fun playing with your womanhoos, massaging the entrance to your sensitive and moist love hole, he realizes that you are quickly more and more aroused and gives you a satisfied smile, you are gradually feeling more hot and craving for sex, even though it started out as a non-consenting situation.`
      ],
      romantic: [
        `<<name _t>> embraces you warmly, you feel <<his>> arms wrap around your body, I can feel the warmth emanating from <<his>> skin and the characteristic masculine smell filling you. He takes <<his>> hand to your pussy and opens your lip, you bite your lower lip with the barely contained arousal while he plays with your love hole, teasing you and making you moan like a bitch in heat almost ready to give the pussy for him.`
      ],
      risky: [
        `<<name _t>> gives you a malicious smile as he looks at your wet pussy, he takes a step towards you and starts massaging your vulva, he opens your lip and caresses your love hole while you just groans looking at him. You can feel <<his>> erection against your skin, hard as iron and ready to creampie you.`
      ],
      preg: [
        `<<name _t>> looks at you with a warm expression, smiling, you can't imagine what he is planning. He approaches you and affectionately touches your pussy, starting to play with it, he opens your lip and massages more and stronger the entrance to your love hole, teasing you and making you moan. Soon you feel warmer, more moist and your clit hardens in the expectation of being fucked and in the barely contained arousal inside you.`
      ],
      isPreg: [
        `<<name _t>> focus <<his>> gaze on your pregnant belly, you ponder what he could be imagining but soon the answer hangs in front of you, when <<his>> cock pulsates with the barely contained arousal. He grabs your vagina quickly and starts teasing you, opening your lip and playing with your little love hole, massaging and caressing, making you moan and feel hotter and hotter as the caresses advance.`
      ],
      queen: [
        `<<name _t>> seems to analyze every part of your body, focusing on your breasts, butt and hips, finally he ends up giving you a charming smile before taking <<his>> hand to your horny wet pussy and opening yours labia, start playing with it. You feel <<his>> fingers roaming the entrance to your love hole, teasing more and more of your most sensitive region and making you moan until you can barely contain the growing arousal inside you.`
      ],
      sub: [
        `<<name _t>> timidly and slowly approaches you, eyes focused on yours, he takes <<his>> hand up to your pussy and starts teasing you. <<his>> movements are gentle and smooth, more than you would like, but you smile at him signaling that you are receptive and your submissive partner starts to increase the pace, opening up your lip and teasing more strongly and quickly your little hole of love, which is now more and more wet thanks to the growing arousal inside you.`
      ],
      dom: [
        `With a devious grin <<name _t>> puts <<his>> hand over your <<if ↂ.pc.groom.pubeGrow < 2>>smooth <</if>><<p vulva.n>> and you gasp. Her fingers start to slide up and down your <p 'curwet.q'>> <<p 'labia.n'>> in a demanding fashion. With <<his>> eyes are fixed on your face <<name _t>> absorbs your pleasure from hard pussy rubbing you are getting. @@.npc;Good girl...@@ Suddenly <<n _t 'heshe.q'>> spanks your <<p vulva.n>> with her palm and you squeal with pain and surprise but <<name _t>> resume caressing your <<p clit.s>> <<p clit.n>> and pleasure overwhelms you again. In some second another juicy smack makes you twitch just to be followed with more petting. Mixing pleasure and pain <<name _t>> brings you to the subby and squirmy state and you start gratefully accept both treatments.`,
      ],
      degrade: [
        `<<name _t>> take a step forward, grabbing your butt and forcing your body against it before it starts touching your vagina. Look at this, you are a fucking ninpho bitch, right? You're just a cock-crazy slut, I'll give you what you deserve. He teases you but before you can answer you groan with the strong caresses on your pussy, he opens your lip and caresses the most sensitive street, making you moan more and more and wish for a big and hot cock filling you.`
      ],
      slut: [
        `<<name _t>> seems to fix <<his>> gaze on your pussy, realizing that you are getting more aroused and moistened, he grabs your vagina, starting with a quick game running <<his>> fingers over your clit, then he reaches the vulva, opening the your lip and exploring your pink love hole. You groan, he smiles at you and continues teasing you, knowing you are a little bitch craving for a cock makes him feel especially aroudes too, you can feel how hard and ready to fuck you he is while he continues to caress your slutty pussy.`
      ],
      bimbo: [
        `<<name _t>> approaches you unable to take your eyes off your pussy, he touches your wet womanhood and you give him a laugh, indicating that you want him to caress you. He returns the smile to you as he plays with your vulva, opening your tongue and gently, but firmly caressing your wet love hole; your body is ready for a fuck, your vagina begs to receive a big and hot cock, but foreplay is just a fun that you don't give up.`
      ],
    },
    playWnipples: {
      standard: [
        `<<name _t>>'s hands reach out and grasp your <<p breasts>>, squeezing them softly before <<his>> fingers delicately trace their way to your ${either("<<p areolasize.q>>", "<<p areolapuffy.q>>")} areolas. Finally, they begin to play with your <<p nipples.n>>, <<if ↂ.pc.body.tits.nipLength < 4>>squeezing your areolas to coax them out into <<his>> hand, <</if>>rubbing and squeezing them gently. <<name _t>> plays with them for a while, <<if ↂ.pc.status.milk === 0>><<has nips>>which your sensitive nipples make quite enjoyable<<or>>seemingly enamored by your <<p nipples.n>>.<</has>><<elseif ↂ.pc.status.milk === 1>>coaxing a small drop of milk out of each by the time <<he>>'s done.<<elseif ↂ.pc.status.milk < 4>>coaxing out a few dribbles of fresh milk by the time <<he>>'s done.<<elseif ↂ.pc.status.milk === 4>>causing them to leak fresh cream all over <<his>> hands as <<he>> does so.<<else>>the attention causing sprays of fresh cream from your hyperactive <<p 'breasts.n'>>.<</if>>`,
      ],
      lesbian: [
        `She gives you a half smile before quickly approaching and grabbing your breasts, squeezing tight and then focusing on your nipples. You groan as you feel <<name _t>> playing with your nipples, squeezing, stretching and pulling. She plays as if it were more elastic than it really is, which soon causes you to let out an intense, feminine moan.`
      ],
      public: [
        `<<name _t>> approaches you carefree, then he silently puts <<his>> hands under your breasts and starts playing with your nipples. You contain your moans wishing you don't get someone's attention while struggling to resist the waves of pleasure as he plays carefree with your nipples, squeezing and pulling, causing waves of pleasure to press on one of your most sensitive places.`
      ],
      openPublic: [
        `<<name _t>> approaches you with quick steps, you soon realize that <<his>> target is your breasts, being watched makes you more malicious and aroused than usual and you give free access to your breasts. When he starts to squeeze and play with one of your most sensitive spots, you let the moans flow freely into the audience of observers. After a few intense moments with <<his>> "caresses", your body is more prepared for the next step.`
      ],
      nonCon: [
        `It moves towards your breasts, without you offering any resistance, probably starting to be controlled by your arousal, it grabs your breasts then focusing on your nipples. He spends a lot of time playing with one of your most sensitive spots without you offering real resistance, pulling, squeezing and playing while you try to contain your moans, which exposes how aroused you really are.`
      ],
      romantic: [
        `He approaches you with a smile, wrapping you in <<his>> arms in a romantic hug before fixing <<his>> gaze on your breasts. Realizing that you liked the idea, he gently grabs your breasts and starts to increase the pressure on your little nipples, pressing and squeezing trying not to cause discomfort, but still very firmly.`
      ],
      risky: [
        `In the expectation that you are unprotected, he feels more perverted and mischievous, staring at your breasts, he moves towards you quickly and begins to play freely with your already hardened nipples. You can't do much besides moaning as he keeps squeezing your nipples, trying to make you even more aroused and ready for sex than you already are.`
      ],
      preg: [
        `In the meantime <<name _t>> can only think if you are fertile, he keeps the expectation of getting you pregnant today and advances towards you, grabbing your breasts. You can see the malicious smile on <<his>> face as he starts to squeeze and massage your nipples and areola, making you moan in pleasure and after several intense minutes, you feel your vagina get hotter with the prospect of finally being filled with a cock.`
      ],
      isPreg: [
        `Enjoying the sight of your large breasts, full of milk thanks to your pregnancy, he moves forward to squeeze that. <<name _t>> spends a lot of time playing with your nipples, massaging your areolas and watching your reaction as he runs the milk out of your breasts, almost milking you while he keeps pressing your nipples.`
      ],
      queen: [
        `You give <<name _t>> access to play with your breasts, he immediately starts to focus on your hardened nipples. You just moan as he squeezes your hard nipples, also massaging your areolas, you constantly ponder the size of <<his>> cock though, worried if he will be able to satisfy you while the growing arousal makes you want a big horsecock inside you.`
      ],
      sub: [
        `He decides to move under you and starts to squeeze your breasts gently but firmly, you submit submissively to him, giving full access to your breasts. Submission makes you feel more intensely connected to him, the prospect of being taken and fucked greatly increases your arousal, plus the constant caresses on your hard nipples; He squeezes, strokes and occasionally sucks your nipples and massages your areola, making you burn with lust.`
      ],
      dom: [
        `He hovers under you, throwing you a half smile, <<his>> position is assertive and dominant, he then grabs your breasts lovingly while you bite your lower lip in the perspective of the caresses you are going to receive. For several minutes you groan as he plays with your hardened nipples, squeezing and sucking, also massaging your sensitive areolas, you can feel <<his>> fingers pressing on your most sensitive region.`
      ],
      degrade: [
        `<<name _t>> approaches you with a mischievous smile on <<his>> face, he grips your breasts firmly and squeezes your hard nipples tightly. @@.npc;Hehe... You're a fucking little bitch, aren't you? I will love to fuck that dirty pussy.@@ You don't have time to respond, he keeps pressing your nipples and you just groan like a prostitute serving another client for several minutes.`
      ],
      slut: [
        `<<name _t>> approaches you with a malicious smile on <<his>> face, he grips your breasts firmly and tightens your hard nipples by mistreating your breasts and constantly pulling and squeezing your nipples. Mistreatment makes you even more aroused though, you love being treated like a bitch in heat, since that is in fact what you are.`
      ],
      bimbo: [
        `Your keep approaches you, you then offer your breasts so that he can play freely, showing off your hard nipples with the prospect of sex. He smiles at you, unable to take <<his>> eyes off your body and plays by squeezing your breasts, then pulling on your nipples and caressing your areolas, it spreads a deep arousal, warming your vagina and making you want a cock stretching your depths as quickly and brutally as possible.`
      ],
    },
    heftBreasts: {
      standard: [
        `<<if ↂ.pc.body.tits.size < 400>>
        <<name _t>> reaches out to hold your <<p breasts>>, but due to their diminutive size <<he>> can't hold them so much as hide them with <<his>> hands. This doesn't stop <<him>>, however, and <<he>> uses <<his>> fingers to kneed the delicate flesh. Occasionally, <<he>> catches your <<p 'nipwidth.q'>> <<p 'nipples.n'>> between <<his>> fingers and gives them a delightful squeeze.
        <<elseif ↂ.pc.body.tits.size < 650>>
        <<name _t>> reaches out to hold your <<p breasts>>, cupping them in <<his>> hand. Gently squeezing, <<he>> kneads the soft flesh, occasionally giving one of your <<if ↂ.pc.status.milk > 2>>milky<<else>><<p 'nipwidth.q'>><</if>> <<p nipples.n>> a pinch or jiggling the your whole <<p tit.n>> as <<he>> plays with them.
        <<elseif ↂ.pc.body.tits.size < 1200>>
        <<name _t>> reaches out to hold your <<p breasts>>, gently cupping and lifting them from underneath. <<name _t>> hefts them experimentally, setting your <<p 'breastshape.q'>> <<p breasts.n>> jiggling as <<he>> feels their weight in <<his>> hands. @@.npc;These <<p tits.n>> are awesome@@ he says, before giving your <<if ↂ.pc.status.milk > 2>>milky<<else>><<p 'nipwidth.q'>><</if>> <<p 'nipples.n'>> a playful squeeze.
        <<else>>
        <<name _t>> reaches out to hold your <<p breasts>>, gently cupping and lifting them from underneath. The flesh of your <<p breast.q>> <<p breasts.n>> almost seems to spill out around <<his>> hands as <<he>> hefts them experimentally to feel their impressive weight. @@.npc;These <<p tits.n>> are absolutely amazing@@ he says in awe, before giving your <<if ↂ.pc.status.milk > 2>>milky<<else>><<p 'nipwidth.q'>><</if>> <<p 'nipples.n'>> a playful squeeze.
        <</if>>
        `,
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
    strokeClit: {
      standard: [
        `<<= ↂ.T.main.name>>'s hand moves quickly between your legs, <<his>> fingers homing in on your <<if setup.sexToys.check("pc", "clit") == true>><<p clit.n>> which <<p clitview.q>> your <<p labia.n>>. <<if ↂ.sex.pcWetness < 8>>Moist with saliva, <<his>> fingers reach your clit and send a shiver up your spine.<<else>>Picking up femlube from your <<p curwet.q>> <<p labia.n>>, <<his>> fingers finally reach your clit and send a shiver up your spine.<</if>> You let out a soft @@.pc;mmmmmm@@ sound as <<his>> fingers stroke your sensitive nub, the contact sending tingles of pleasure all the way up to your <<p womb.n>>. By the time <<he>> finishes you can't tell if you want him to continue, or would rather have <<him>> do something that feels even better.<<else>>clit shield covering your <<p clit.n>>. You let out a soft frustrated moan as <<his>> fingers stroke your the shield almost unable to feel anything on your nub.<</if>>`,
      ],
      lesbian: [
        `She throws her hand at your vagina and, smiling threateningly at you, like a predator looking at prey, <<name _t>> starts to tighten your clit. Uh ... Hmm ... You spread your legs feeling the waves of pleasure echoing through your body as it intensifies the stroking. You seem to have fun with this, uh? It strongly compresses your small hardened clit between your fingers, making you release a tall, feminine moan, continuing to play with your most sensitive region.`
      ],
      public: [
        `He grabs your vagina and, starting with a brief massage opening your lip, then <<name _t>> focuses on your little clit with gentle movements so as not to attract attention. Let's make you like this ... I want to see your pussy wet for me. You bite your lower lip and try to contain your moans of pleasure as he continues to massage, squeeze and play with your clit, the constant stroking makes you feel more and more aroused.`
      ],
      openPublic: [
        `He seems especially excited knowing there are people watching, you feel <<his>> firm hand touching your vagina, playing with your lip but when he notices your hardened clit it becomes <<name _t>>'s focus. Uhh ... This is- Hmm ... You just groan while receiving a strong massage, feeling it strokingo your clit added to the strong feeling of being watched makes you feel more and more hot as the special attention to your clit continues.`
      ],
      nonCon: [
        `You feel <<his>> hand reach your womanhood, knowing that you have no real control over the situation you just leave. He plays with your clit without restrictions, stroking it, massaging the areola and occasionally squeezing your most sensitive spot. He seems to have fun with this before he smiles at you and mentions it. You're almost done, aren't you? I can feel that tight little pussy getting wet.`
      ],
      romantic: [
        `<<name _t>> smiles at you before he abruptly approaches and reaches your vagina, starting a delicate kiss you feel him massage your soft but firm pussy, and when he realizes your hardened clit he gives you a special focus on your region more sensitiv. It squeezes, pulls and massages making you break the kiss repeatedly to moan femininely.`
      ],
      risky: [
        `It starts stroking your pussy quickly, occasionally opening your lip and checking your vaginal moisture. He seems to check your vagina while playing with your clit, faking it slightly and making you even wetter than before. @@.npc;I will love to come inside you, I want to see your pussy filled with my cum!@@`
      ],
      preg: [
        `<<name _t>> realizes that your vagina is getting very lubricated, fantasizing about creampie you, filling you to the brim with <<his>> cum and finally getting you pregnant, he approaches and with a malicious smile he starts to stroke your clit. You groan femininely but you can't resist <<name _t>>'s touch, feeling more and more ready to be fucked, you start to care less and less about being impregnated while you start to be controlled by your arousal.`
      ],
      isPreg: [
        `Realizing that pregnancy is changing your hormones, making your vagina moist, your clit hard and your body begging for sex, it grabs your vagina and starts playing with your most sensitive region. @@.npc;It looks like someone needs a cock, but are you ready? Your dirty little pussy says yes... Hah@@ He teases you, while you just moan at each touch, and every time he presses and strikes your clit.`
      ],
      queen: [
        `He moves towards you, not resisting to see your pussy getting wet and starts to tighten your clit strongly, only occasionally massaging the area around and smiling maliciously at you, lee listens to your moans while playing with your most sensitive region and delicate.`
      ],
      sub: [
        `You notice him looking at your vagina, unable to take <<his>> eyes off your most intimate and sensitive region, you take a step towards <<name _t>> by signaling him to do what he wants. He smiles at you, starting to stroking your vagina in a smooth movement, but that quickly gets more and more intense, as you moan more and more quickly. Your heart starts to beat faster, you seem to be more comfortable with a more submissive partner.`
      ],
      dom: [
        `<<name _t>> hand reaches your <<p clit.n>> and squeeze it in a sadistic fashion which makes you squeal. @@.npc;What is it, my little slut, your pleasure nub aches?@@ <<he>> asks while <<his>> fingers twist sensitive flesh of your clit. @@.pc;Auch, mmhm, please!@@ <<name _t>> grins going from torture to stroking and back. @@.pc;Please what?@@ Mixing pain and pleasure <<he>> plays with your <<p clit.n>> making you a dripping subby toy in <<his>> hands.`,
      ],
      degrade: [
        `He takes a confident step in front of you and launches <<his>> hand, starting to stroking your moist pussy assertively, making you moan without being able to resist. @@.npc;You're a dirty little bitch's whore, you know? I will love to break you...@@ <<his>> movements become more intense in the successful attempt to make you want a big, hot cock inside you, stretching you to the limit.`
      ],
      slut: [
        `He takes a confident step in front of you and launches <<his>> hand, starting to stroking your wet pussy assertively. Hah, I love to see little whores like you begging for sex, let's make you beg for cock. Before you can answer, he firmly squeezes your clit between <<his>> fingers, sending a powerful wave of pleasure through your body and causing an intense groan. You can't resist but just enjoy it while he continues the massage, causing the desire to be fucked to grow inside you.`
      ],
      bimbo: [
        `He takes a confident step in front of you and launches <<his>> hand, starting to stroking your wet pussy assertively. You smile at <<name _t>>, in an indication to continue, before allowing the moaning to come out freely showing how much you appreciate <<his>> massage. Before long your body, already highly aroused, is beginning to crave sex when your vagina starts dripping with vaginal fluids.`
      ],
    },
    rubInsideVulva: {
      standard: [
        `<<name _t>>'s hand drifts downward, brushing over the <<if ↂ.pc.groom.pubeGrow < 2>>>smooth skin of your pubic mound.<<else>>the <<p 'pubelength.q'>> hair of your pubic mound<<if ↂ.pc.groom.pubeGrow > 2>>, <<his>> hand gently playing with the ${either("<<p 'pubestyle.q'>>", "<<p 'pubecolor.q'>>")} hair.<<else>>.<</if>><</if>> Soon, <<his>> hand moves lower, rubbing over the top of your <<p 'curwet.q'>> <<p 'labia.n'>> before two of <<his>> fingers dive between your ${either("labia", "lips")} to explore inside. With both fingers gently pushing against you, <<he>> begins to rub them back and forth, stroking everything from your <<p clit.n>> to the entrance of your <<p pussy.n>> in the process. The sensation is wonderful, and soon you find yourself trying to grind against <<his>> hand as <<he>> strokes you.`,
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
        `Passionate intensity in <<n _t "hisher.q">> eyes, <<= ↂ.T.main.name>> grabs your shoulder and moves in close, the sudden motion causing you to gasp. Before you can even recover your composure, <<n _t 'heshe.q'>>'s moving in, <<n _t "hisher.q">> face close to yours and a playful glint in <<n _t "hisher.q">> look. And then <<n _t 'heshe.q'>>'s kissing you. The forceful thrust of <<n _t "hisher.q">> lips against yours sends your mind reeling, and it takes you a moment to start kissing <<n _t 'himher.q'>> back, trying your best to match <<n _t "hisher.q">> intensity. You feel a sudden pain as <<= ↂ.T.main.name>> gives one of your lips a sudden light bite. Releasing your lip and pulling away slightly, <<n _t "heshe.q">> glances at you, wanting to see your reaction to the unexpected nibble. You respond by grabbing the back of <<n _t "hisher.q">> neck and pulling <<n _t 'himher.q'>> back in again, the smack of your lips as you frantically make out filling the air.`,
      ],
      lesbian: [
        `You feel <<= ↂ.T.main.name>> embrace you in her arms, looking into your eyes with an expression that exudes a mixture of affection and unrestrained arousal, she begins to kiss you gently on the lips. In a few moments you return the kiss, the intensity and the heat start to increase, you then return the tight embrace, forcing the two lovers' bodies against each other while their tongues dance together. Your body begins to warm up more over time and the uninterrupted kiss accompanied by warm caresses.`
      ],
      public: [
        `<<= ↂ.T.main.name>> approaches you, touching your shoulder and with <<his>> gaze fixed on yours, he envelops you in a gentle and tight hug while letting <<his>> lips touch yours and begins a kiss slow and warm to avoid getting anyone's attention. You answer <<his>> kiss, accepting the embrace, being able to feel the heat and the smell that exude from <<name _t>>'s body, you start to feel more and more aroused, after some time you feel your vagina warm up in the percussive of the vine sex.`
      ],
      openPublic: [
        `<<= ↂ.T.main.name>> smiles at you when he approaches and wraps you in <<his>> arms in a tight hug, he starts a furious kiss on your lips that seems to cheer people up looking around. You feel more and more aroused, a mixture of feelings cross your body as you receive and return the hot kiss mixed with the caresses it makes along your body, but you also feel much more dirty doing it in front of others people.`
      ],
      nonCon: [
        `In a quick and decisive move to subdue you, <<= ↂ.T.main.name>> hugs you tightly and gives you a kiss, <<his>> act is firm but still gentle and you are taken aback by it, as long as this is not quite a consensual relationship. You have no option if you do not return the kiss and soon you feel your body become more tense and hot, your vagina begins to moisten with intense physical contact, so you feel more prepared to be fucked soon.`
      ],
      romantic: [
        `<<= ↂ.T.main.name>> I smile at you as you feel <<his>> arms wrap around your body in an affectionate gesture, <<name _t>>'s embrace is firm and soft. He takes a step forward when he kisses you firmly and romantically, waiting for you to return the kiss, which you do. The act quickly gets hotter and more intense when he starts to caress your body, you can then feel <<his>> hard cock, already prepared to fuck you, while you feel your vagina warm up and moisten the wait for the fuck to start soon.`
      ],
      risky: [
        `<<= ↂ.T.main.name>> touch your face before starting a kiss, you return the kiss that quickly becomes intense as he starts to caress your most sensitive parts, you just break the kiss to moan occasionally, then continue this. You start to be controlled by your arousal and fantasize about finally getting fucked by him, fantasizing about having risky sex makes you feel deeply aroused, and just a little worried.`
      ],
      preg: [
        `<<= ↂ.T.main.name>> touch your face before starting a kiss, you return the kiss that quickly becomes intense as he begins to caress your most sensitive parts. You feel <<his>> touches in your most sensitive and unprotected regions, while your vagina warms up more and more and begs to receive <<his>> cock, being filled by a big, hot and manly cock and finally being impregnated makes your arousal start to control your body and your actions, wishing to be impregnated with an especially powerful will.`
      ],
      isPreg: [
        `<<= ↂ.T.main.name>> touch your face before starting a kiss, you return the kiss that quickly becomes intense as he begins to caress your especially sensitive parts thanks to your pregnancy. Your pregnant belly slightly disrupts the kiss, making it a cute act, but your arousal is out of control. The baby inside of you gets rid of your hormones and libido, so you break the kiss just to beg to be fucked.`
      ],
      queen: [
        `<<= ↂ.T.main.name>> envelops you in a warm embrace and kisses you intensely, pressing your body against his, you only surrender while returning <<name _t>>'s affectionate and intense kiss. You can feel the bulge below, hard as iron, hot and throbbing, but you can only think of a big horsecock. You fantasize about being fucked by something like this, big, thick and bulbous, the prospect of a fuck by a smaller cock worries you if he can satisfy you.`
      ],
      sub: [
        `<<= ↂ.T.main.name>> slowly approaches you and gives you a soft hug, he seems to almost contain the lust inside him, but he waits for you to give a signal so he can kiss you, what do you do. You smile at <<name _t>> and when he kisses you, you return it then making the act more intense. You can feel <<his>> hot, erect cock below, realizing that he is not particularly a dominant man, but he is the partner you have chosen.`
      ],
      dom: [
        `<<= ↂ.T.main.name>> hugs you tightly looking at you with a desire barely contained in <<his>> eyes, you have already surrendered to <<name _t>> and just wait while he starts a passionate kiss on you, who soon returns it for him. You wrap your arms around <<his>> neck, while allowing him to caress your body, playing with your most intimate and unprotected regions as he prefers, the feeling of being going to be taken and fucked makes you feel a deep and submissive impulse to do whatever he wants.`
      ],
      degrade: [
        `<<= ↂ.T.main.name>> gives you a malicious smile as you wrap your arms around him, slapping your ass hard and then he declares. I already paid better prostitutes than you, I hope you at least know how to kiss properly. He doesn't give you a chance to respond when he kisses you passionately, stroking your most sensitive regions and playing with your body as he prefers. You feel frustrated and irritated by <<his>> attitude, but <<name _t>>'s assertiveness makes you feel more and more aroused, in the end you return the kiss.`
      ],
      slut: [
        `<<= ↂ.T.main.name>> smiles at you while looking into your eyes and, touching your face affectionately, gives you a soft kiss. You respond to the affectionate kiss, wrapping your arms around <<name _t>>'s neck and making it a hot act, then he grabs your buttock and starts playing with your vagina, squeezing your butt occasionally. You surrender to your desire and start to feel your vagina warmer, moisten more and more, so you are just wishing to be brutally fucked and filled to the limit, like a legitimate dirty little bitch you are.`
      ],
      bimbo: [
        `<<= ↂ.T.main.name>> hold you tight, starting a passionate kiss, you quickly wrap your arms around <<name _t>>'s neck returning the kiss and showing him how aroused you are. He touches your vagina and quickly feels <<his>> fingers being covered by your vaginal fluid, you soon break the kiss to say that you are more than ready to be fucked brutally, just as an aroused bitch deserves.`
      ],
    },
    kiss: {
      standard: [
        `For a quick moment, you both pause and glance at one another. You can see the intent in <<n _t "hisher.q">> <<= ↂ.T.body.eyeColor>> eyes, and you lean your head slightly in anticipation of <<n _t "hisher.q">> moving close. <<= ↂ.T.main.name>> leans in, planting a light kiss on your lips. It lasts for less than a second, but when <<n _t "heshe.q">> pulls away both you and <<n _t "heshe.q">> smile at each other.`,
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
    neckEar: {
      standard: [
        `With a gentle touch, <<n _t "heshe.q">> places <<n _t "hisher.q">> thumb and index finger on your chin, turning your head to the side and exposing your neck. Leaning in slowly, <<n _t "heshe.q">> takes <<n _t "hisher.q">> time as <<n _t "heshe.q">> begins placing soft kisses all along your neck. You can hear the soft wet pop of <<n _t "hisher.q">> lips with each press against your exposed neck-flesh, the feeling of <<n _t "hisher.q">> warm kisses sending a sensual buzz through your entire body. After a few seconds, you can feel <<n _t 'himher.q'>> moving up, <<n _t "hisher.q">> mouth finding your ear and placing more kisses along the sensitive lobe. <<= ↂ.T.main.name>> lovingly continues <<n _t "hisher.q">> oral worship of you, placing so many kisses along your neck and ear that it takes all of your inner reserve not to completely lose yourself to <<n _t "hisher.q">> passionate foreplay.`,
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
    exploreVulva: {
      standard: [
        `You can feel <<name _t>>'s breath hot against your <<p 'vulva.n'>> as <<he _t>> pauses; it's almost as if <<he _t>> can't decide where to start. <<if ↂ.pc.body.pussy.wetness > 2>>You feel some of your nectar run out from between your engorged lips as your anticipation builds;<<else>>Your anticipation continues to build as you wait;<</if>> it makes the first delicate touch of <<his _t>> tongue all the more pleasurable. Said tongue begins to explore your <<p 'vulva.n'>>, dragging across your tender flesh as it probes and explores every bump and crevice.`,
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
    suckNipple: {
      standard: [
        `<<name _t>>'s mouth latches on to the ${either("<<p 'areolapuffy.q'>>", "<<p 'areolasize.s'>>")} areola of one of your ${either("<<p 'breast.s'>>", "<<p 'titshape.q'>>", "<<p 'breast.s'>>")} <<p 'breasts.n'>> and begins to suck, while one of <<his _t>> reaches out to play with your other <<p 'nipple.n'>>. <<if ↂ.pc.status.milk > 2>>Milk starts to leak out of your engorged <<p 'breast.n'>>, which <<name _t>> happily swallows as <<he _t>> continues sucking.<<elseif ↂ.pc.body.tits.nipLength < 4>><<he>> sucks firmly on your <<p 'niplength.q'>> <<p 'nipple.n'>> until it finally emerges in <<his>> mouth and <<he>> starts exploring it with <<his>> tongue.<<else>>With your <<p 'nipwidth.s'>> <<p 'nipple.n'>> in your mouth, <<he>> rolls it around on <<his>> tongue and occasionally stops sucking long enough to give it a gentle nibble.<</if>>`,
      ],
      lesbian: [
        `<<name _t>> starts sucking on your nipples, she grabs your breasts and, squeezing it firmly but gently, she sucks on your little nipples with a voracious intent, as if trying to get milk from you. You feel the waves of pleasure reaching your body as she plays with you, lightly biting your nipples and then sucking on it again; Soon you feel your vagina get hotter, just waiting for more intense activity.`
      ],
      public: [
        `Gently and quietly <<name _t>> grab your breasts and suck on your nipples, <<his>> movements soon become more careless along with your moans of pleasure, although you work to contain it as the waves of pleasure travel the your body. You can feel the warmth of <<his>> lips against your nipple, every time he sucks, also <<his>> tongue running through your tongue, causing a deeply pleasant and satisfying sensation.`
      ],
      openPublic: [
        `<<name _t>> grab your breasts tightly and smile quickly, unable to take your eyes off your hardened nipples, before you start sucking on it. You immediately moan at the intensity at which he sucks and bites your nipples, for a few moments <<his>> tongue massages your areola, for a few moments you forget that you are being watched and just focus on the pleasure echoing through your body as he continues to suck your nipples.`
      ],
      nonCon: [
        `<<name _t>> grab your breasts tightly and smile quickly, unable to take your eyes off your hardened nipples, before you start sucking on it. You have no choice but to moan like a bitch in heat, being prepared to finally be fucked. Your body begins to obey <<his>> commands, as your arousal increases more and more responding to the stimuli of your current mate.`
      ],
      romantic: [
        `<<name _t>> grab your breasts tightly and smile at you, unable to take your eyes off your hardened nipples, before you start sucking on it. You return the smile to him, wrapping <<his>> head around your arms in a clear inventive way so that he continues, you groan as he massages your nipples, surrounding your areolas with <<his>> tongue and making your arousal increase even more, soon you are even more intensely attracted to him and yearning for sex.`
      ],
      risky: [
        `<<name _t>> grab your breasts tightly and smile at you, unable to take your eyes off your hardened nipples he starts sucking on it intensely while you just moan at him. Pleasure runs through your body and makes you want to be brutally fucked, the feeling of going for a risky fuck where you don't know if it will impregnate you for any reason brings you great satisfaction and arousal, despite some concern.`
      ],
      preg: [
        `<<name _t>> grab your breasts tightly and smile at you, unable to take your eyes off your hardened nipples he starts to suck it up intensely while you just moan at him fantasizing about finally being fucked and impregnated. You start to feel your pussy warming up more and more fearfully as he keeps sucking your nipples, massaging your areola with <<his>> tongue, you feel a deep and motherly desire to finally get pregnant.`
      ],
      isPreg: [
        `<<name _t>> grab your milk-swollen breasts tightly and smile at you, unable to take your eyes off your hardened nipples he starts to think hard about trying to milk you. Pregnancy raises your body's sensitivity, as well as increases your libido. You feel stronger waves of pleasure as he sucks, bites and squeezes your nipples between <<his>> teeth, intensifying your libido.`
      ],
      queen: [
        `<<name _t>> grab your breasts tightly and smile at you, unable to take your eyes off your hardened nipples he starts to suck you intensely. You groan freely looking at him, who seems to have fun playing with one of the most sensitive parts of your body, although you start fantasizing about being fucked, surrendering to your growing arousal, and feel that your vagina begs for a huge and thick horsecock to fully fill you over the limit.`
      ],
      sub: [
        `<<name _t>> grabs your breasts tightly and smiles at you, unable to take your eyes off your hardened nipples he starts to suck it intensely feeling satisfied to be in an especially submissive position. You do not contain your moans of pleasure as your nipples are intensely sucked, the waves of pleasure that run through your body prepare your vagina more and more for the sex to come, moistening it and hardening your clit.`
      ],
      dom: [
        `<<name _t>> grab your arms, pressing <<his>> body against you and smiling maliciously. You can't do anything when he grips your breasts tightly, then sucking on it and making you moan with the barely contained pleasure attached to your body. Your vagina takes on moisture, preparing to be fucked, the arousal burns more and more intensely within you as your breasts receive such caresses.`
      ],
      degrade: [
        `<<name _t>> grab your arms, pressing <<his>> body against you and smirking and declaring. You look like a dirty little bitch now, I already hired some better prostitutes ... Look at those fucking breasts. He grabs your breasts and starts sucking on it, making you moan before you can protest, you feel your body start to burn more intensely with the barely contained lust.`
      ],
      slut: [
        `<<name _t>> grab your breasts tightly and smile at you, unable to take your eyes off your hardened nipples he starts to suck it furiously. You look at him, with a sex-hungry look. You feel your vagina warm up and your clit harden and vibrate as your mind is flooded with thoughts of brutal fucking, you bite your bottom lip while it continues to massage your breasts, but more and more impatient and hungry for cock.`
      ],
      bimbo: [
        `<<name _t>> grab your breasts tightly and smile at you, unable to take your eyes off your hardened nipples he starts sucking on it gently trying to get you in the best mood to fuck you. Your body is sensitive and you feel every touch of <<his>> lips, <<his>> tongue running through your nipples and isola. Your vagina however is already more than ready to be fucked, very wet and ready to be stretched to the limit. You feel more and more impatient for a brutal fuck, hungry for a big cock.`
      ],
    },
    strokeClitTongue: {
      standard: [
        `With <<name _t>>'s head situated directly between your legs, you can feel <<his _t>> warm breath against your <<p 'curwet.q'>> <<p 'vulva.n'>>. When <<his _t>> tongue flicks out against your <<p 'clit.s'>> <<p 'clit.n'>>, you feel a tingle of pleasure shoot up your spine. Before the tingle has a chance to stop, <<name _t>> starts to lick your clit, dragging <<his _t>> tongue up and down the sensitive bud of flesh. <<name _t>> alternates the motion at regular intervals, moving <<his>> tongue side to side or in circles over your firm <<p 'clit.n'>>.`,
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
    suckClit: {
      standard: [
        `<<name _t>> moves between your legs now, <<= ↂ.T.body.eyeColor>> eyes focused intently on your <<p "vulva.n">>. Moving <<n _t "hisher.q">> lips like waves that crash and smack against your <<p clit.s>> <<p clit.n>>, <<n _t "hisher.q">> open jaw shuts and lips pucker as <<n _t "heshe.q">> eagerly services the sensitive nub of flesh. You moan and gasp as <<n _t "heshe.q">> works feverishly between your legs, the tip of <<n _t "hisher.q">> tongue doing a sinfully intoxicating dance against your most erogenous zone and sending your mind reeling from the waves of intense pleasure that <<n _t "heshe.q">> is delivering with each flick. You press yourself forward, hips moving intently against <<n _t "hisher.q">> hungry mouth, <<p "vulva.n">> dripping and leaving wet glistening streaks on <<= ↂ.T.main.name>>'s chin as <<n _t "heshe.q">> passionately pleasure your pussy. If <<n _t "heshe.q">> keeps going like this, you know for certain, it won't be long until you'll find yourself cumming all over <<n _t "hisher.q">> face.`,
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
    tongueClit: {
      standard: [
        `Wondering what's going to come next, your curiosity is answered as you feel <<name _t>>'s come to rest against your <<if setup.sexToys.check("pc", "clit") == true>>${either("aroused", "firm", "swollen")} <<p 'clit.n'>>. With a delicious pressure, you feel <<his _t>> tongue probe your clit; pushing it in different directions as it seems to explore. You feel a surprising shock of pleasure as the tongue moves overtop and tries to dive down beneath your hood. <<name _t>>'s exploration continues on for several moments, and you enjoy every delicious second of it.<<else>>locked clit. With a frustration, you feel <<his _t>> tongue circle your clit shield and pushing it in different directions. This doesn't feel like a lot at all and you feel humiliated by <<name _t>>'s cruel teasing.<</if>>`,
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
    fingerPussy: {
      standard: [
        `<<name _t>>'s hand slips between your legs, cupping your <<p 'curwet.q'>> <<p 'labia.n'>> for a moment before <<he _t>> slipping two fingers between your ${either("nether lips", "lips", "labia")}. After a couple tantalizing strokes from the opening of your <<p 'pussy.n'>> up to your <<if setup.sexToys.check("pc", "clit") == true>><<p 'clit.n'>><<else>>locked <<p 'clit.n'>><</if>>, the fingers suddenly plunge inside you. <<name _t>> begins a rhythm of nearly removing <<his _t>> fingers before thrusting them back inside. Though not as fulfilling as a real <<w 'cock.n'>>, the sensation is still quite pleasant, particularly when <<he _t>> starts to curve <<his _t>> fingers to press on your inner walls.`,
      ],
      lesbian: [
        `You feel the <<name _t>> hand between your legs, opening your lip and surprising you when it starts a quick fingering. You look her in the eye and before you can say anything you let out a female moan, she then starts to play more and more intensely with your vagina making you start to have as much fun as she does with the pleasure running through your body.`
      ],
      public: [
        `<<name _t>> take <<his>> hand to your vagina and, after opening your well-moistened lip, he starts fingering you gently but firmly. You contain your moans as <<his>> fingering becomes more intense and deep, you feel it deeper and deeper inside you, then he presses once against your special point, forcing you to contain a moan caused by a intense wave of pleasure that makes your clit hard as iron.`
      ],
      openPublic: [
        `<<name _t>> a malicious smile throws you, it opens your lip and starts the finger acts firmly and intensely on the vagina, quickly reaching your depths. He seems to be looking for your most sensitive spot, trying to find it and squirt you, you just groan as he ventures through your love hole, then <<his>> hand is covered with your vaginal moisture, for a brief moment you forget about people watching you and focuses only on the fingering going on between your legs.`
      ],
      nonCon: [
        `<<name _t>> smiles maliciously at you before touching your wet pussy, he soon opens your lip and starts to finger you. You just groan knowing that there is not much you can do, as the furious finbgering continues you can feel your body heat up, your vagina get even more wet as your clit hardens. Your body is getting ready to be fucked, even if it didn't start exactly like normal consensual sex.`
      ],
      romantic: [
        `<<name _t>> approaches you, slowly touching your vagina and exploring it, he opens your lip before letting <<his>> fingers slip into your love hole. You look him in the eye, smiling nervously as he continues to pretend, making you moan with barely contained pleasure, making your arousal grow gradually until you almost start to beg to be fucked.`
      ],
      risky: [
        `<<name _t>> approaches you, slowly touching your vagina and exploring your unprotected depths. You just moan as you let him continue the special caress, while you fantasize about the coming and risky sex, knowing that you might end up pregnant makes you feel a big, deep arousal burn inside you, a hint of worry that quickly disappears in the middle of all your barely contained lust.`
      ],
      preg: [
        `<<name _t>> approaches you, slowly touching your vagina and exploring your unprotected depths and, as you expect, probably fertile. You groan feminine as the fingering becomes more intense, you cannot contain your lust and fantasy about the coming sex, in the expectation of a big and manly crempie where you will be impregnated, this generates a deep feeling of maternal satisfaction and leaves you hungry for cock.`
      ],
      isPreg: [
        `<<name _t>> perceive your pussy dripping vaginal fluids and take <<his>> hand to your innermost region, opening your lip and smirking at you before beginning an intense fingering in your love hole. You bite your lower lip with waves of pleasure, now more intense caused by pregnancy, which makes your whole body more sensitive and your libido almost out of control, you are soon hungry for cock and yearning to be fucked as you deserve and need.`
      ],
      queen: [
        `<<name _t>> perceive your pussy dripping vaginal fluids and take <<his>> hand to your most sensitive area at that moment, your clit is as hard as iron when he shoves <<his>> fingers into your love hole and begins a intense fingering. You allow your moans to escape as you become more uncontrolled and hungry for cock, you start fantasizing about being fucked by a big, wide horsecock, being over the limit.`
      ],
      sub: [
        `<<name _t>> perceive your pussy dripping vaginal fluids and take <<his>> hand to your most sensitive region at that moment, you open your legs giving full access to <<name _t>> and then he opens your lip, sliding <<his>> fingers to in and starting a fingering. You just moan at him like a submissive bitch while he plays with you, pressing on your inner vaginal walls and looking for your most sensitive and intimate regions, making you almost beg to be fucked.`
      ],
      dom: [
        `<<name _t>> gets close to you, before you can say anything you feel <<his>> hand opening your lip and <<his>> fingers sliding down to your depths. You can't really do anything when he starts furiously fingering you, making you moan for him while he plays with your love hole, preparing your body to be fucked up soon. @@.npc;Just be quiet, behave like a good bitch, and I will soon reward you with my cock in your wet pussy.@@`
      ],
      degrade: [
        `<<name _t>> approaches you, before you can say anything you feel <<his>> hand opening your lip and <<his>> fingers slipping into your depths while he smiles at you maliciously, looking into your eyes, and declares. @@.npc;You're a shitty little bitch, you can't even contain yourself, can you? That slutty cunt of yours is begging for a cock, relax... I'll soon fuck you.@@ You cannot answer in words, but just moan at him, while he continues with intense fingering.`
      ],
      slut: [
        `<<name _t>> gets close to you, before you can say anything you feel <<his>> hand opening your lip and <<his>> fingers sliding down to your depths. You feel especially anxious while your vagina is hot, your clit hardened, and your body begs for a cock stretching your vaginal depths. You just moan for him though, while he plays with you, teasing you until you're almost begging for a fuck.`
      ],
      bimbo: [
        `<<name _t>> begins to finger you, he plays with your vagina before finally slipping <<his>> fingers into your wet love hole. Although you moan for him passionately, what you really want is to be fucked intensely, your pussy begs to be filled with a big cock, you can barely contain your arousal when he continues to pretend you, in the expectation that <<name _t>> finally take you and fuck you as you wish.`
      ],
    },
    spankButt: {
      standard: [
        `<<= ↂ.T.main.name>> lifts <<n _t "hisher.q">> bare hand and spanks your bottom and you flinch. Rhythmical slaps get stronger and stronger and it takes not much time until you start to moan with every hit, your butt twitches with each impact and your toes wiggling uncontrollably. @@.pc;Mmmhm!@@ Sobs and moans break out from your clenched teeth while <<= ↂ.T.main.name>> paints both of your ass cheeks bright red.`,
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
    strokeCock: {
      standard: [
        `Taking hold of <<n _t "hisher.q">> <<n _t "cockgirth.q">> <<n _t "cock.n">>, <<= ↂ.T.main.name>> begins working <<n _t "hisher.q">> hand up and down the <<n _t "cock.n">>. <<n _t "hisher.q">> <<= ↂ.T.body.eyeColor>> eyes remained focused on you, roaming every inch of your naked body with a look of passionate hunger. No doubt <<n _t "heshe.q">> is imagining all the things <<n _t "heshe.q">> is planning to do with that body as <<n _t "heshe.q">> works <<n _t "hisher.q">> fingers back and forth along <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>.`,
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
    huggies: {
      standard: [
        `<<= ↂ.T.main.name>> opens <<n _t "hisher.q">> arms wide, moving in close and enfolding you in <<n _t "hisher.q">> embrace. You relax in <<n _t "hisher.q">> gentle embrace, wrapping your own arms around <<n _t 'himher.q'>> and leaning in close to feel the warmth of <<n _t "hisher.q">> body against yours. <<n _t "heshe.q">> squeezes you tightly, and you sigh as you enjoy the feeling of <<name _t>>'s arms around you.`,
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
    complementBody: {
      standard: [
        `<<name _t>> compliments your body. @@.npc;God, I love your <<p breasts.n>>. <<if ↂ.pc.body.tits.cupNum > 18>>I just want to bury my face between them.<<else>>I just want to lick every last inch of them.<</if>>@@`,
        `<<name _t>> compliments your body. @@.npc;You look so sexy tonight, <<= ↂ.pc.main.name>>. Wish I could see you like this all the time: not a stitch of clothing on that <<n _t "tone.q">> body.@@`,
        `<<name _t>> compliments your body. @@.npc;You know how hard it is to control myself around you, <<= ↂ.pc.main.name>>? You drive me crazy with that <<n _t "tone.q">> body.@@`,
        `<<name _t>> compliments your body. @@.npc;Mmm, turn around, baby. Let me get a look at that ass.@@`,
      ],
      lesbian: [
        `<<name _t>> bite her lower lip, then praise your body. @@.npc;You're a cute and sexy thing, you know? I'm going to love playing with your little pussy.@@`
      ],
      public: [
        `<<name _t>> approaches you and whispers in your ear, pretending not to attract attention. @@.npc;I can't wait to fuck your little pussy, I want to see you try not to moan with my cock inside you.@@`
      ],
      openPublic: [
        `<<name _t>> smiles at you with a malicious expression, he takes a step towards you and declares. @@.npc;You are fucking hot, you know? I will love to fuck your brains out in front of all these people!@@`
      ],
      nonCon: [
        `<<name _t>> envelops you in <<his>> arms, you feel without escape but gradually you surrender to your arousal, so he praises you. @@.npc;You are a beautiful thing, I want to fuck your tight little pussy and make you mine, you will love it.@@`
      ],
      romantic: [
        `<<name _t>> approaches you by wrapping you in a warm, tight hug, you smile at him as he looks deeply into your eyes and praises you. @@.npc;I love looking at your body, it's hard to restrain myself from skipping our foreplay and I'm going to fuck you right now... I can't wait to feel your hot little pussy surrounding my dick.@@`
      ],
      risky: [
        `<<name _t>> smiles maliciously at you, he touches your butt and carefully analyzes your body before praising you. @@.npc;I really want to fuck you, you are one of the sexiest things I have seen... That little pussy of yours is begging to be creampied, you know?@@`
      ],
      preg: [
        `<<name _t>> breathes heavily with <<his>> barely contained arousal, although he tries hard not to skip the foreplay, he then praises you. @@.npc;You are a beautiful woman, this body is hot as hell... You will be a great mother, if you get pregnant. I hope...@@ He whispers the last part in an inaudible tone to you, it makes you feel a little nervous, but more eager to be fucked.`
      ],
      isPreg: [
        `<<name _t>> touches your pregnant belly, unable to take your eyes off your body and realizing your hunger for cock thanks to your wet vagina he declares. @@.npc;You're pretty sexy while you're pregnant, you know? I love pregnant women so they are like little nympho.@@ He says the last part, slapping you on the butt and making you moan, but making you even more submissive and eager to be fucked by him.`
      ],
      queen: [
        `<<name _t>> approaches you, touching your breasts, touching your butt and hips as if analyzing your body and praising you. @@.npc;You are a beautiful and warm thing, but... Well, it would be better if you had a little bigger breasts. Hehe@@ He says the last part in a playful tone, you disregard that though, but the small teasing makes you feel a little angry, and warmer.`
      ],
      sub: [
        `<<name _t>> approaches you, smiling while looking into your eyes and praising your body. @@.npc;You're fucking hot, I hope we can fuck soon... I mean, when you're ready.@@`
      ],
      dom: [
        `<<name _t>> grab your butt, then give yourself a little laugh and praise your body. @@.npc;It seems that you are almost ready, it is an honor to be going to fuck something as sexy as you, I think your body is perfect for a fuck!@@`
      ],
      degrade: "none" /* How can I compliment something that I need to degrade? lol */,
      slut: [
        `<<name _t>> tightly squeeze your buttock and laugh while watching your reaction, it then complements your body. @@.npc;Hehe, you're fucking sexy, I'm going to love every second when I'm fucking that wet slutty pussy.@@`
      ],
      bimbo: [
        `<<name _t>> notice your hunger for cock just by looking at your wet pussy and the small drops of vaginal fluid running down your thighs, he smiles and praises your body. @@.npc;You have a fucking hot body, that pussy is begging for my dick... We won't keep you waiting too long.@@`
      ],
    },
    putOnCondom: {
      standard: [
        `<<= ↂ.T.main.name>> undoes the wrapping of the condom, tearing along the serrated edge with <<n _t "hisher.q">> fingernails. Removing the condom itself from the packet, <<n _t "heshe.q">> begins to unroll it slightly over <<n _t "hisher.q">> index finger. Taking the condom and placing it against the <<n _t "cockhead.n">> of <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">>, <<n _t "heshe.q">> starts to roll the latex over <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">>. The lubed surface gives a slightly pleasant sensation as it rolls back over <<n _t "hisher.q">> cock and lubricates <<n _t "hisher.q">> <<n _t "cock.n">> down to the base near <<n _t "hisher.q">> <<n _t "balls.n">>. <<n _t "heshe.q">> rolls <<n _t "hisher.q">> fingers across it a few times, ensuring it’s securely placed over <<n _t "hisher.q">> <<n _t "cock.n">>.`,
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
    denyProtectionRequest: {
      standard: [
        `@@.npc;Don’t worry, I can pull out.@@ <<= ↂ.T.main.name>> doesn't put on a condom...`,
        `@@.npc;I'll be careful, <<= ↂ.pc.main.name>>.@@ <<= ↂ.T.main.name>> doesn't put on a condom...`,
        `@@.npc;I promise I won't cum inside you.@@ <<= ↂ.T.main.name>> doesn't put on a condom...`,
        `<<= ↂ.T.main.name>> thinks about it for only a moment before answering. <span class="npc">No thanks. Just relax, we don't need to worry about that kind of thing right now.</span>`,
      ],
      lesbian: [
        `<<= ↂ.T.main.name>> looks at you thoughtfully for a minute and responds. @@.npc;Nah... I won't do that. No way, relax, nothing will happen.@@`
      ],
      public: [
        `<<= ↂ.T.main.name>> ponders for a moment, and looks at you with a serious look before whispering to you. @@.npc;No, sorry, but I'm going to cum outside, okay?@@`
      ],
      openPublic: [
        `<<= ↂ.T.main.name>> looks seriously at you before answering. @@.npc;Don't even think about it, I'll take you raw. I will not cum inside you, relax.@@`
      ],
      nonCon: [
        `<<= ↂ.T.main.name>> look into your eyes with a dominant look and speak, touching your face. @@.npc;No, I will fuck you raw, if you get pregnant I will be very satisfied.@@`
      ],
      romantic: [
        `<<= ↂ.T.main.name>> I smile at you looking into your eyes and declare with a gentle touch on your face. @@.npc;No way, I want to make this something special, so we're going to make it raw.@@`
      ],
      risky: [
        `<<= ↂ.T.main.name>> hello to your vagina with a lush expression, then mention it to you. @@.npc;No, but don't worry, I will cum outside. We are not going to make it risky, right?@@`
      ],
      preg: [
        `<<= ↂ.T.main.name>> looks at you with a stern expression, almost irritated by your suggestion and declares. @@.npc;No, and please don't mention it again... I just have raw sex.@@`
      ],
      isPreg: [
        `@@.npc;Why would I need to cum out of you or wear a condom... You are already pregnant. We can take full advantage of this, raw.@@`
      ],
      queen: [
        `<<= ↂ.T.main.name>> analyze your body, seeming to contain almost no lust within it when it finally says. @@.npc;Nop, I want to take you raw, condoms are highly boring.@@`
      ],
      sub: [
        `@@.npc;Yeah, I'm sorry but... I prefer to do this without a condom, I just want to fuck you raw.@@`
      ],
      dom: [
        `He looks at you with a look of disappointment, but then he responds with a determined tone. @@.npc;Don't even think about it, don't be a bitch. I will not wear a condom, I want to fuck you raw.@@`
      ],
      degrade: [
        `@@.npc;No, dirty and cheap bitches like you have no right to choose. If I want, I'll fuck you without a condom.@@`
      ],
      slut: [
        `You get slapped on your right buttock when you mention it, but <<= ↂ.T.main.name>> soon answers you. @@.npc;Really... No. We are going to have a raw fuck, I cum outside of you, okay?@@`
      ],
      bimbo: [
        `@@.npc;I'm sorry but that won't happen, that little pussy of yours is craving to receive a big creampie.@@`
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
    pullOffCondom: {
      standard: [
        `Gripping the tip of the condom, <<n _t "heshe.q">> begins to pinch the latex around <<n _t "hisher.q">> <<n _t "cockhead.n">>. The condom has become a bit airtight around <<n _t "hisher.q">> <<n _t "cock.n">> due to <<n _t "hisher.q">> excessive insertions into your <<p vulva.n>>, which have in turn pushed out any air and condensed the plastic so it remains fastened to <<n _t "hisher.q">> erection. While waiting to become flaccid would probably be simpler, <<n _t "heshe.q">> opts to instead take the fold of the condom and let air back inside. With a simple tug of <<n _t "hisher.q">> wrist, the condom has been removed from <<n _t "hisher.q">> <<n _t "cock.n">> and <<n _t "heshe.q">> flings it in your direction.`,
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
    condomBreakEvent: {
      standard: [
        `While you and <<= ↂ.T.main.name>> continue your passionate lovemaking, you see a change come over your partner's expression. A look of contented release come over <<n _t 'himher.q'>>, while at the same time the feeling of <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">> in your <<p "vulva.n">> takes on a slightly different feeling. Is it your imagination, or does <<n _t "heshe.q">> feel hotter inside of you? More... unconstricted? You wonder if maybe the protective sheath around <<n _t "hisher.q">> <<n _t "cock.s">> <<n _t "cock.n">> might have broken somehow in the midst of your heated fucking. You try to catch <<n _t "hisher.q">> eye to confirm your suspicion, but <<= ↂ.T.main.name>> is too lost in <<n _t "hisher.q">> passion to stop.`,
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
    fuckThrustText: {
      standard: [
        `<<= ↂ.T.main.name>>'s thrusts into you are slow and sensuous. <<n _t "heshe.q">> takes <<n _t "hisher.q">> time to enjoy the feel of making love to you: first sliding out every inch of <<n _t "hisher.q">> <<n _t "cock.q">> <<n _t "cock.n">> until just the very tip of <<n _t "hisher.q">> <<n _t "cockhead.n">> teasingly rests between your pussy lips, before pressing <<n _t "hisher.q">> hips slowly forward and burying <<n _t 'himher.q'>>self to the hilt inside of your wet, horny hole. You can hear the slow, heated sound of <<n _t "hisher.q">> breathing as <<n _t "heshe.q">> gently fucks you, <<n _t "hisher.q">> <<n _t "cock.n">> softly rubbing around inside of you and stroking against your sensitive inner walls with every thrust.`,
        `<<= ↂ.T.main.name>>'s <<n _t "cock.s">> <<n _t "cock.n">> begins pounding a steady rhythm into your hole, your body quivering and shaking with each hard thrust between your legs. You clench your fists and moan as <<n _t "heshe.q">> begins fucking you in earnest, <<if ↂ.T.body.cock.length > 64 || ↂ.T.body.cock.girth > 17>><<n _t "cock.q">> <<n _t "cock.n">> stretching you open wider than you'd ever been before as <<n _t "heshe.q">> thrusts <<n _t "hisher.q">> impressive manhood deep into you<<else>>his <<n _t "cock.n">> forcing the wet hole open and burying itself balls-deep inside of you again and again<</if>>. The air is filled with the sound of your strained, heated moans, along with the wet slap of sweaty flesh against sweaty flesh as <<= ↂ.T.main.name>> slowly increases the pace of <<n _t "hisher.q">> thrusts, <<n _t "hisher.q">> <<n _t "balls.n">> bouncing against your body as <<n _t "heshe.q">> forcefully fucks you.`,
        `The passion has overwhelmed <<n _t 'himher.q'>> now, and <<= ↂ.T.main.name>>'s <<n _t "cock.s">> <<n _t "cock.n">> is attacking your hole with a surprising ferocity. You can't hold back your cries of passion, as <<n _t "hisher.q">> hard and frantic thrusts rock your body and send ferocious jolts of sensation straight from your dripping <<p vulva.n>> right to the carnal center of your brain. You know that you'll be walking funny for a day after this is all over, with how roughly <<= ↂ.T.main.name>> is taking you, but none of that matters right now. All that matters is the feel of that <<n _t "cock.q">> <<n _t "cock.n">> taking your hole over and over again. Conquering it, making it belong to <<= ↂ.T.main.name>>. Even through your own desperate moans, you can hear the rapid-fire rhythm of <<n _t "hisher.q">> hips and yours wetly slapping together, sweat dripping from both of your bodies at the force of the savage fucking taking place. Down between your legs, you can feel the impact of <<n _t "hisher.q">> <<n _t "balls.q">> <<n _t "balls.n">> against your skin. If <<n _t "heshe.q">> keeps this up, <<if ↂ.sex.npcBC[0].condom.worn>>it won't be long until <<n _t 'heshe.q'>>'s going to be emptying those <<n _t "balls.n">> into the condom <<n _t 'heshe.q'>>'s wearing, leaving it full of <<n _t "hisher.q">> hot <<n _t "cum.n">>.<<else>>it won't be long before <<n _t "heshe.q">> empties those balls directly into your hole, filling you up with every last drop of <<n _t "hisher.q">> hot <<n _t "cum.n">> and leaving you gaping and dripping with <<n _t "hisher.q">> <<n _t "cum.n">>.<</if>>`,
      ],
      lesbian: [
        `She continues thrusting against your pussy with a strength and greed that you would expect from a man. Probably full of lust for you, and full of male hormones in <<his>> body, she just keeps the frantic pace of fucking without giving you time to say anything. Not all girls have a cock, and you imagine that even fewer of them would know how to use it as well.`
      ],
      public: [
        `Pounding your <<p 'curwet.q'>> hole, <<name _t>> <<print either("seems to enjoy","seems to be nervous about")>> the possibility to be seen by strangers. <<name _t>>'s thrusts become more and more vigorous as if <<he>> tries to finish the job as fast as <<he>> can fucking you hard and deep, <<his>> <<n _t "cock.s">> <<n _t "cock.n">> entering your slit with a slurping sound. Moaning out loud you enjoy the good fuck not caring about potential passerby's catching you mid-process.`,
      ],
      openPublic: [
        `You just moan as he keeps the fuck going, thrusting against your vagina without you being able to do anything but stand and get fucked. Having your vagina fucked so intensely in front of prying eyes is a different experience though, the fuck and the looks make you much more aroused, perverted and sensitive. You can feel every part of <<his>> hard cock pulsing against your inner walls, <<name _t>> doesn't show signs of being tired and keeps fucking you like a great show for people watching you.`
      ],
      nonCon: [
        `You sob and clench while <<name _t>> ravages your hole in a constant stream of rapid merciless thrusts. Paying no attention to your comfort <<he>> pushes <<his>> <<n _t "cock.s">> <<n _t "cock.n">> deep down your slit painfully stretching your <<p 'curwet.q'>> <<p 'labia.n'>>, <<his>> panting mixes with your short moans and the slurping sound of <<name _t>>'s cock forcing inside your hole over and over again. <<has rape>>The horror makes your arousal even spicier and you genuinely enjoy the raping.<<or>>Hoping this to end you lose any sense of time feeling abused and humiliated.<</has>>. <<name _t>> doesn't seem like stopping anytime before <<he>> will shoot <<his>> jizz deep inside you, no matter of your opinion on this and you have no other options than to submit to the pounding.`,
      ],
      romantic: [
        `You smile at <<name _t>>, signaling that you want him to keep the current pace, he shows no signs of stopping and shows no sign of tiredness. You just moan as he grabs you firmly and thrust tirelessly against your unprotected vagina, with each blow you receive you feel your orgasm closer and closer, in addition to your pussy being stretched more and more, adapting to <<his>> cock size.`
      ],
      risky: [
        `You allow <<name _t>> full access to your vagina, which fucks you tirelessly with no signs of stopping, with each thrust that he puts in your love hole you feel it more and more stretched. Soon you feel it hitting against your cervix, the deepest and most intimate part of your body, you fantasized about that moment, the risky moment where you will be creampied and you don't know if it will impregnate you. The intense feeling brings you almost to orgasm, you look into <<his>> eyes in the expectation of being finally creampied while you moan.`
      ],
      preg: [
        `You allow <<name _t>> full access to your vagina, which fucks you tirelessly with no signs of stopping, with every thrust that he puts in your love hole you feel it more and more stretched until <<his>> cock finally hits your cervix, causing you a deep and warm feeling. You groan looking into <<his>> eyes, in the expectation that you are going to get pregnant, now you are being controlled by your arousal and maternal instinct and all you want is to fulfill your most basic instinct, to be mated.`
      ],
      isPreg: [
        `You allow <<name _t>> full access to your vagina, which fucks you tirelessly with no signs of stopping, with each thrust that he puts in your love hole you feel it more and more stretched. You are heavily dominated by your arousal, pregnancy is setting your body on fire and you just want to be fucked brutally until you finally satisfy your body’s demand, <<name _t>> keeps on fucking you, fulfilling your wish while you look at him and I smirked, just breaking the smile to moan at each thrust against your love hole, now occupied with your baby.`
      ],
      queen: [
        `You are fucked by <<name _t>> who seems almost insatiable, he thrust against your little pussy constantly, making you moan. You can see in each thrust, <<his>> cock leaving and then entering again, feeling it stretch your vaginal walls with each thrust, despite that although you feel the deep desire that he was bigger, you are a little bitch who wants a horsecock fucking you even beyond your limit, stretching you irreparably; You try to ignore it and be satisfied with that cock, anyway.`
      ],
      sub: [
        `You just keep your vagina perfectly aligned with <<name _t>>'s cock, making it easier for <<his>> cock to enter each thrust against your vagina. You feel it go deep, stretching you out and finally kissing your cervix. Feeling the tip of <<his>> cock press against your most intimate and deep part in such a submissive position makes you burn in lust, bringing your arousal closer and closer, you just moan as he fucks you with no signs of slowing down.`
      ],
      dom: [
        `With <<his>> <<n _t "cock.s">> <<n _t "cock.n">> deep down your slit <<name _t>> pounds you mercilessly establishing <<his>> dominance over your body and soul. <<if sexToys.check("pc", "arms") === true>>Feeling extremely humble <<else>>With your hands cuffed behind <</if>>you gratefully accept every thrust <<he>> makes moaning and twitching on <<his>> cock. Flesh impact sound sounds obscene and reminds you of most depraved porn you have ever saw while <<his>> sweaty body ravages yours in a series of long deep thrusts. <<if sexToys.check("pc", "mouth") === true>>Moaning <<else>>Moaning trough the gag <</if>>you encourage <<name _t>> to continue to fuck you as <<he>> wish.`,
      ],
      degrade: [
        `<<name _t>> pounds you in a steady rhythm, <<his>> <<n _t "cock.s">> <<n _t "cock.n">> making it's way in and out of your hole. With a visible delight, <<he>> pushes it deep down obviously enjoying <<him>>self. @@.npc;Whose bitch you are?@@ You sweat and blush feeling like a brainless fuckdoll for <<him>> moaning @@.pc;Yours, <<if ↂ.T.main.male>>master<<else>>mistress<</if>>!@@ @@.npc;Yes you are, you are such a pathetic disgusting fuckhole.@@ You just can't but make noises of agreement between sounds of your soft sweaty flesh slapping against <<him>>.`,
      ],
      slut: [
        `You groan looking at <<name _t>> with a malicious expression, in each thrust of <<his>> cock against your pussy you finally manage to calm your libido and your desire to be fucked like a dirty little bitch. You position your body to facilitate the fuck, in each thrust you can hear the wet sound when the thick cock enters, stretching your vagina and making you get closer and closer to your climax.`
      ],
      bimbo: [
        `You bite your bottom lip when you lift your butt to facilitate the access of <<his>> cock to your wet pussy, you taste every second of sex, satisfying yourself when you finally get fucked. You look at him, throwing a mischievous smile indicating that he doesn't stop, he takes a deep breath and increases the pace, pressing your cervix more severely with each thrust and making you moan in satisfaction.`
      ],
    },
    removeOwnTop: {
      standard: [
        `<<= ↂ.T.main.name>> pulls <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.top>> over the head exposing <<n _t "hisher.q">> <<n _t "fat.q">> upper body.`,
        `In a single swift motion <<= ↂ.T.main.name>> gets rid of <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.top>>.`,
      ],
      lesbian: [
        `<<= ↂ.T.main.name>> makes some sensual movements for you when she starts to take off the top of her clothes, then leaving her boos unprotected for your eyes.`
      ],
      public: [
        `<<= ↂ.T.main.name>> slowly but sensually begins to remove the upper part of <<his>> clothes, being careful not to attract attention, then he exposes more of <<his>> body to you.`
      ],
      openPublic: [
        `<<= ↂ.T.main.name>> smiles at you and starts taking off the top of <<his>> clothes. With a few quick movements he soon throws the garment on the floor, exposing <<his>> body to you and those who are looking.`
      ],
      nonCon: [
        `<<= ↂ.T.main.name>> takes off the top of <<his>> clothes, throwing them on the floor behind him. With that you're one more step closer to being fucked.`
      ],
      romantic: [
        `<<= ↂ.T.main.name>> smiles fondly at you, while you return the smile, he takes off the top of <<his>> clothes then throws it on the floor.`
      ],
      risky: [
        `<<= ↂ.T.main.name>> seems barely able to contain <<his>> arousal, probably fantasizing about the risky sex to come, and removes <<his>> upper part of <<his>> clothes exposing more of <<his>> body to you.`
      ],
      preg: [
        `<<= ↂ.T.main.name>> seems barely able to contain <<his>> arousal, probably fantasizing about impregnating you and quickly removes <<his>> upper part of <<his>> clothes, exposing more of <<his>> body to you.`
      ],
      isPreg: [
        `<<= ↂ.T.main.name>> seems especially aroused seeing your pregnant belly, for some reason this is instigating him, so he quickly removes the top of <<his>> shirt exposing <<his>> body for you.`
      ],
      queen: [
        `<<= ↂ.T.main.name>> gently pat each part of your body, seeming to carefully analyze you before quickly removing the top of <<his>> clothes.`
      ],
      sub: [
        `<<= ↂ.T.main.name>> slowly take off the top of <<his>> clothes, looking at you and hoping you enjoy the view, he sensitizes <<his>> movements a little to please you.`
      ],
      dom: [
        `<<= ↂ.T.main.name>> smiles confidently at you, enjoying the sight of your body and takes off the top of <<his>> clothes, exposing <<his>> body to you.`
      ],
      degrade: [
        `<<= ↂ.T.main.name>> looks at you contemptuously, but without mentioning a word he quickly removes the top of <<his>> clothing, dropping it on the floor before continuing.`
      ],
      slut: [
        `<<= ↂ.T.main.name>> gives you a mischievous smile before giving your butt a little slap, then he immediately removes the top of <<his>> clothes, throwing them on the floor.`
      ],
      bimbo: [
        `Unable to contain <<his>> own arousal, <<= ↂ.T.main.name>> take the top off <<his>> shirt and throw it on the floor, craving to fuck your pussy as soon as possible.`
      ],
    },
    removeOwnBra: {
      standard: [
        `With a subtle motion <<n _t "heshe.q">> unbuckles <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.bra>> and let it fall down on the floor. <<= ↂ.T.main.name>> smiles as you ogle <<n _t "hisher.q">> <<n _t 'breasts.n'>>. @@.npc;Like what you see?@@`,
        `Reaching for the buckle <<= ↂ.T.main.name>> removes <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.bra>> covering <<n _t "hisher.q">> <<n _t 'breasts.n'>> with arms before finally letting go and putting <<n _t "hisher.q">> goods on display.`,
      ],
      lesbian: [
        `<<= ↂ.T.main.name>> gives you a mischievous smile when she takes her hand to the bra hooks and quickly removes it, dropping it on the floor and showing off her boobs.`
      ],
      public: [
        `<<= ↂ.T.main.name>> seems nervous and anxious when she takes her hands to the back of her bra, grabbing the hooks and removing the cover from her breasts, exposing the bar of soft boobs.`
      ],
      openPublic: [
        `The exposure to prying eyes seems to make <<= ↂ.T.main.name>> more and more perverted, she smiles at you maliciously before taking her hands to the bra hooks and taking off the last piece of clothing protecting her soft breasts her.`
      ],
      nonCon: [
        `<<= ↂ.T.main.name>> looks at you like a predator watching your prey, she seems to have fun with every detail of the situation and then grabs the back of her bra, taking it off her body and exposing her soft boobs for you.`
      ],
      romantic: [
        `<<= ↂ.T.main.name>> and you smile at each other, she quickly moves away to take off her bra, grabbing the hooks at the back she soon takes off the last piece of clothing covering her boobs, which now they are loose swinging in front of you.`
      ],
      risky: [
        `<<= ↂ.T.main.name>> seems especially excited lost in her own thoughts when she smiles at you, while removing her bra, loosening the hooks on the back, and dropping it on the floor exposing her soft breasts and hardened nipples.`
      ],
      preg: [
        `<<= ↂ.T.main.name>> turns away from you and, with sensual and provocative movements, she does a little show while taking off her bras. She takes it off and shoots it on the floor, exposing her hard nipples, proving how aroused she is.`
      ],
      isPreg: [
        `<<= ↂ.T.main.name>> 's pregnancy seems to be leaving her highly aroused, she is panting with the barely contained livido and quickly removes her bra, showing her milky filled breasts and hardened nipples.`
      ],
      queen: [
        `<<= ↂ.T.main.name>> play with your breasts quickly, taking a brief analysis of your measurements, then she decides to continue and grabs her bra hooks, loosening that and releasing her soft breasts for you.`
      ],
      sub: [
        `<<= ↂ.T.main.name>> give you a quick and gentle kiss on your lips before taking a step back and, with sensual and light movements, she detaches her bra and exposes her boobs for you, now totally unprotected.`
      ],
      dom: [
        `<<= ↂ.T.main.name>> smiles maliciously at you and moves you away with her hand, in a simple gesture to start removing her bra with some suspense, sensualizing the movements; Soon she takes it off, leaving her boobs exposed and unprotected for you.`
      ],
      degrade: [
        `@@.npc;Look at this... I show you what real breasts are, something other than the shitty breasts you have there.@@ <<= ↂ.T.main.name>> steps away from you in a few steps, then quickly taking off her bra, throwing it on the floor and proudly exposing her soft breasts in front of you.`
      ],
      slut: [
        `<<= ↂ.T.main.name>> lick your lips watching your body, in each touch and caress it gets more and more aroused; she decides to take the next step and grabs her bra, taking it off her body and exposing her soft breasts and hard nipples with lust.`
      ],
      bimbo: [
        `With a look lost in pure lust, <<= ↂ.T.main.name>> take a step back and remove her bra, exposing her soft breasts and totally hard nipples with her poorly controlled lust for you.`
      ],
    },
    removeOwnBottom: {
      standard: [
        `Leaning forward <<n _t "heshe.q">> removes <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.bottom>> exposing the <<n _t "skincolor.q">> legs.`,
        `<<= ↂ.T.main.name>> playfully lowers <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.bottom>> and lets it to fall on the ground.`,
      ],
      lesbian: [
        `<<= ↂ.T.main.name>> smiles at you, she looks especially happy and grabs her pants, letting them fall to the floor and exposing the most intimate regions of her body.`
      ],
      public: [
        `<<= ↂ.T.main.name >> subtly and slowly grabs <<his>> pants and lets it fall to the floor, trying not to get anyone's attention.`
      ],
      openPublic: [
        `<<= ↂ.T.main.name>> grab <<his>> pants and drop it on the floor, seeming to make people watching more excited and wanting to see you get fucked.`
      ],
      nonCon: [
        `<<= ↂ.T.main.name>> stares into your eyes, like a predator that cornered its prey, when it lets its pants fall to the ground.`
      ],
      romantic: [
        `<<= ↂ.T.main.name>> and you look at each other affectionately when he decides to remove <<his>> pants, allowing it to fall to the floor.`
      ],
      risky: [
        `<<= ↂ.T.main.name>> smiles at you, seeming to be especially aroused with the risky sex to come and then he finally takes off <<his>> pants, tossing that to the floor.`
      ],
      preg: [
        `<<= ↂ.T.main.name>> gives you a smile full of lust, expecting to fuck you until you get pregnant. He hardly seems to contain <<his>> arousal when he takes off <<his>> pants, leaving it on the floor.`
      ],
      isPreg: [
        `<<= ↂ.T.main.name>> touch your pregnant belly, seeming to like it he gives you an affectionate smile and then grabs <<his>> pants, allowing it to fall to the floor.`
      ],
      queen: [
        `<<= ↂ.T.main.name>> quickly feel your breasts and lip, trying a little on your body, then he grabs <<his>> pants and lets it fall on the floor exposing <<his>> semi-erect cock under the underwear.`
      ],
      sub: [
        `<<= ↂ.T.main.name>> smiles at you, waiting for a signal so he can continue, you nod positively at him, then he takes off <<his>> pants exposing the cock erect under <<his>> underwear.`
      ],
      dom: [
        `<<= ↂ.T.main.name>> gives you a confident smile before grabbing <<his>> pants and letting it fall to the floor, exposing <<his>> semi-erect cock under <<his>> underwear.`
      ],
      degrade: [
        `<<= ↂ.T.main.name>> approaches you and slaps your butt, mistreating you a little before taking off <<his>> pants, letting it fall to the floor.`
      ],
      slut: [
        `<<= ↂ.T.main.name>> smiles at you, admiring your body as he lets <<his>> pants fall to the floor, exposing <<his>> erect cock under <<his>> underwear, excited to fuck a little bitch like you.`
      ],
      bimbo: [
        `<<= ↂ.T.main.name>> and you smile at each other, he then grabs <<his>> pants and lets it fall to the floor. You lick your lips with your barely contained hunger for cock when you see <<his>> cock erect under <<his>> underwear.`
      ],
    },
    removeOwnPanties: {
      standard: [
        `Slowly, <<n _t "heshe.q">> lowers <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.panties>> until it just falls down to join the pile of <<n _t "hisher.q">> clothes.`,
        `With a single fast tug <<= ↂ.T.main.name>> gets rid of <<n _t "hisher.q">> <<= ↂ.T.clothes.outfits.casual.panties>> and you can see <<n _t "hisher.q">> <<n _t "cock.n">> in all it's glory.`,
      ],
      lesbian: [
        `<<= ↂ.T.main.name>> is breathing heavily with barely contained lust, she soon grabs her panties and drops it on the floor, finally exposing her pink, hot and moist pussy.        `
      ],
      public: [
        `<<= ↂ.T.main.name>> looks around and, thinking of not attracting anyone's attention, slowly touches <<his>> underwear, allowing it to fall to the floor and exposing <<his>> erect and pulsating cock.`
      ],
      openPublic: [
        `<<= ↂ.T.main.name>> is panting, no longer able to contain <<his>> arousal, he takes off <<his>> underwear and drops it on the floor finally exposing <<his>> erect cock for everyone to see it.`
      ],
      nonCon: [
        `Panting, <<name _t>> removes <<his>> underwear in a single fast jerk wiggling <<his>> legs to get out of them. You can see <<his>> <<n _t "cock.n">> without anything covering it.`,
      ],
      romantic: [
        `<<= ↂ.T.main.name>> smiles at you, you can see the barely contained lust exhaling from him. He soon grabs <<his>> underwear and lets it fall to the floor, exposing the cock upright and ready to fuck you.`
      ],
      risky: [
        `<<= ↂ.T.main.name>> can barely contain <<his>> growing arousal looking at your body, he probably fantasizes about creampie you and then he drops <<his>> underwear on the floor, exposing <<his>> erect cock and pair of heavy balls full of cum for you.`
      ],
      preg: [
        `You see <<= ↂ.T.main.name>> smirking at you, unable to contain the arousal he feels, then he grabs and removes <<his>> underwear to expose <<his>> erect cock to you, followed by their balls, filled with manly cum that he hopes will impregnate you today.`
      ],
      isPreg: [
        `<<= ↂ.T.main.name>> smiles at you, unable to take your eyes off your pregnant belly. He doesn't seem to contain <<his>> arousal when he grabs <<his>> underwear and allows it to fall to the floor, exposing <<his>> erect cock to you.`
      ],
      queen: [
        `<<= ↂ.T.main.name>> gives you a half smile as he analyzes your boobs and hips in detail. Seeming to make <<his>> judgments, he takes off <<his>> underwear, dropping it on the floor, and exposing <<his>> erect and pulsating cock to you.`
      ],
      sub: [
        `<<= ↂ.T.main.name>> seems to be deeply aroused, you can see <<his>> erect cock under <<his>> underwear and you look at it with interest. Realizing that you want to see this, he allows <<his>> underwear to fall at <<his>> feet, exposing the dick to you.`
      ],
      dom: [
        `<<= ↂ.T.main.name>> gives you a confident smile when he can no longer resist seeing you and, without controlling <<his>> growing arousal, he grabs <<his>> underwear and takes it off <<his>> body exposing the cock straight as iron and ready to fuck your little pussy.`
      ],
      degrade: [
        `You feel the look of <<= ↂ.T.main.name>> roaming your body, almost disdaining your female outfit when he lets <<his>> underwear fall to the floor exposing <<his>> semi-erect cock almost dripping <<his>> pre-cum onto you.`
      ],
      slut: [
        `<<= ↂ.T.main.name>> is heavily panting when he can no longer contain <<his>> arousal and drops <<his>> underwear on the floor, exposing the semi-erect and pre-cum-lubricated cock ready to fuck you; The sight makes you feel a deep hunger for cock.`
      ],
      bimbo: [
        `<<= ↂ.T.main.name>> smiles at you and slaps you on the ass, you smirk at him as he grabs <<his>> underwear and lets it fall at <<his>> feet, exposing the semi-erect cock that soon it will be fucking you as you intensely desire.`
      ],
    },
    removeTop: {
      standard: [
        `Reaching for your upper body, <<= ↂ.T.main.name>> gently pulls your top over your head and tosses it away enjoying the view of your <<p tone.q>> torso.`,
        `Without any hesitation <<n _t "heshe.q">> removes your top exposing your <<p skincolor.q>> <<p tone.q>> torso.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: [
        `Making haste, <<name _t>> tugs on your top forcing it to your neck. Despite your attempts to stop <<him>> <<he>> pulls it over your head leaving your <<p tone.q>> torso nude.`,
      ],
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
    removeBra: {
      standard: [
        `After a second of fussing with the buckle <<= ↂ.T.main.name>> sets your <<p titshape.q>> <<p tits.n>> free.`,
        `<<= ↂ.T.main.name>> removes one strap of your bra after another and your <<p tits.q>> <<p tits.n>> gets fully exposed as the bra falls down to the floor.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: [
        `Taking hold on your bra <<he>> almost tears it <<if sexToys.check("pc", "arms") === true>>and you can't stop <<him>> with your arms tightly bound at your back.<<else>>while your desperately try to stop <<him>> with your arms.<</if>> With a hard jerk <<name _t>> rips it off your chest leaving your <<p tits.q>> <<p tits.n>> fully exposed.`,
      ],
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
    removeBottom: {
      standard: [
        `Tugging on the waistband <<n _t "heshe.q">> sets your legs free from clothes.`,
        `It takes just a moment for <<= ↂ.T.main.name>> to expose your legs and toss the attire away.`,
      ],
      lesbian: "none",
      public: "none",
      openPublic: "none",
      nonCon: [
        `With both hands <<name _t>> rudely pulls your bottom cloth down leaving you exposed and vulnerable before <<him>>.`,
      ],
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
    removePanties: {
      standard: [
        `Enjoying the process to the limit <<= ↂ.T.main.name>> lowers your panties and you feel air on your <<p pussy.q>> <<p pussy.n>>.`,
        `Obviously unable to wait anymore <<n _t "heshe.q">> pulls down your panties with a single fast motion exposing your <<if setup.sexToys.check("pc", "groin") == true>><<p pussy.q>> <<p pussy.n>> and ass.<<else>>locked pussy.<</if>>`,
      ],
      lesbian: [
        `<<name _t>> seems to get more and more impatient, and soon she can't wait any longer and jumps behind you, you can feel her intense breath under your skin when she pulls your panties down finally exposing your pussy.`
      ],
      public: [
        `<<name _t>> moves behind you slowly trying to avoid any attention and, hugging you by your teeth, soon you feel <<his>> hands under your panties and finally making it fall to the floor, exposing your wet pussy.`
      ],
      openPublic: [
        `You see <<name _t>>'s expression get more impatient before he approaches you, smiling he puts <<his>> hands under your hips and quickly removes your underwear, making it fall at your feet and exposing your moist womanhood to everyone those who are seeing.`
      ],
      nonCon: [
        `In a hurry, <<name _t>> tugs on your panties. <<if sexToys.check("pc", "arms") === true>>With your hands tied you can't stop <<him>> and just wiggle your legs in a vile attempt to save yourself.<<else>>You try to stop <<him>> holding on your underwear but <<name _t>> overpowers you.<</if>> After some fuss <<he>> pulls your panties down your legs exposing your <<if setup.sexToys.check("pc", "groin") == true>><<p pussy.q>> <<p pussy.n>> and ass<<else>>locked pussy<</if>> and you cross your legs hiding it from ravaging.`,
      ],
      romantic: [
        `You feel more aroused when <<name _t>> approaches you, smiling while looking into your eyes, he wraps you in a quick hug then placing <<his>> hands under your panties and slowly allowing it to fall on the floor exposing your tight pussy and moistened. @@.npc;It feels like you're getting into the mood.@@`
      ],
      risky: [
        `<<name _t>> grabs your hips, feeling your body being wrapped around <<his>> arms, he slowly lets your panties fall at your feet exposing your tight little pussy. This increases your arousal with the prospect of going to be fucked in a risky way makes you feel a little concern, but much more arousal that quickly warms and moistens your pussy.`
      ],
      preg: [
        `<<name _t>> grabs your hips, feeling your body being wrapped around <<his>> arms, he slowly drops your panties at your feet exposing your tight little pussy waiting for a big, manly creampie. You fantasize about what is going to happen, anxious to finally be impregnated, the prospect of getting pregnant by <<name _t>> makes you feel an uncontrollable lust inside you.`
      ],
      isPreg: [
        `<<name _t>> grabs your hips, feeling your body being wrapped around <<his>> arms makes you feel your heart beat faster and faster with the barely contained lust caused by your pregnancy, he slowly drops your panties at your feet exposing your tight little pussy. Feeling the heat of <<his>> body, and the intensely masculine scent that exudes from <<his>> skin, you feel an intense desire to have your pussy act filled and stretched to the limit with a big, hard cock.`
      ],
      queen: [
        `<<name _t>> wraps your body in a quick hug, directing <<his>> hands to your hips and grabbing your panties, then letting it fall to the floor to finally expose your wet pussy to him. He seems to analyze every part of your body, feeling your breasts thoroughly as if he were drawing conclusions about the size of your titties before fuck you.`
      ],
      sub: [
        `<<name _t>> approaches you but just stares at your hips, seeing your pussy still covered by your panties, you press your hips against him indicating for him to take it away from you. Then he grabs your panties allowing it to fall at your feet, finally exposing your moist and unprotected pussy.`
      ],
      dom: [
        `<<name _t>> wraps you in a quick, tight hug, allowing you to smell the strong, masculine odor of <<his>> body, then firmly gripping your panties and quickly taking it off you. He gives a smile when he finally exposes <<his>> wet pussy, and touches it by checking your humidity level. @@.pc;Someone is ready to be fucked... Hehe@@`
      ],
      degrade: [
        `<<name _t>> wraps you in a tight hug, allowing you to smell the strong, masculine odor of <<his>> body. He slaps your buttock before grabbing your panties and pulling it off your body, you just moan in surprise when he mistreats your ass and palms your vagina to feel you. @@.npc;I love to fuck little whores like you, your dirty pussy is more than ready for it.@@ He then shows you <<his>> fingers, covered with your vaginal moisture.`
      ],
      slut: [
        `<<name _t>> wraps you in a quick, tight hug, allowing you to smell the strong, masculine odor of <<his>> body when you whisper to him to take you. He smiles at you appreciating your desire to be fucked, and rips off your panties quickly, dropping it at your feet. You feel a growing desire to be brutally fucked, your pussy is begging to be filled.`
      ],
      bimbo: [
        `<<name _t>> hugs you tightly, you are eager to be fucked and puts <<his>> hands under your hips, indicating that he takes off your panties while you throw a malicious smile at him. He returns the gesture, removing your panties and finally exposing your pussy that is now beginning to absorb moisture and dripping, in the expectation of finally being fucked as you deserve and need.`
      ],
    },
  };
  aw.con.info("Sex Act NPC Library loaded.");
};
