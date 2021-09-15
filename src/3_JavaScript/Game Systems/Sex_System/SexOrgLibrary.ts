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
/* text in orgasm objects, I decided it would be better   */
/* to reduce memory usage by storing them in object       */
/* literals that can be sent to storage. They are looked  */
/* up using property keys, which is far faster than logic */
/* This will improve performance, and also keep descrip-  */
/* tive text in the same place.                           */
/*--------------------------------------------------------*/
/* TERMS:  book(action/position), chapter (situation),    */
/*         page (specific text in array).                 */
/* SAVED:  setup.library.orgasm.book.chapter[page]        */
/* CALL:   setup.library.callorgasm(book,chapter,[page]). */
/* INIT:   setup.library.initSA() - loads variables       */
/* KILL:   setup.library.killSA() - deletes variables     */
/**********************************************************/
// check namespace
if (setup.library === null || setup.library === undefined) {
  setup.library = {} as setupLibrary;
}
// function to retrieve text from library
setup.library.callOrgasm = function(book: string, chapter: string, page: string|-1 = -1, chapArray: 0|string[] = 0) {
  // first check to make sure the entry exists
  try {
    if (setup.library.orgasm == null || "object" !== typeof setup.library.orgasm) {
      aw.con.warn(`Library lookup failed, orgasm library isn't initialized.`);
      return "error";
    } else if (setup.library.orgasm[book] == null || "object" !== typeof setup.library.orgasm[book]) {
      aw.con.warn(`Library lookup failed, couldn't find ${book} in orgasms.`);
      return "error";
    } else if (setup.library.orgasm[book][chapter] == null || (!Array.isArray(setup.library.orgasm[book][chapter]) && "function" !== typeof setup.library.orgasm[book][chapter])) {
      if (Array.isArray(chapArray)) {
        let good = false;
        const c = chapArray.length;
        for (let i = 0; i < c; i++) {
          if (setup.library.orgasm[book][chapArray[i]] != null && Array.isArray(setup.library.orgasm[book][chapArray[i]])) {
            chapter = chapArray[i];
            good = true;
            break;
          }
        }
        if (!good) {
          setup.alert(`Library lookup couldn't find ${chapter} in orgasm book ${book}, and none of ${c} alternates could be found. Defaulted to standard.`);
          chapter = "standard"; // this is so that we can default to standard description
        }
      } else {
        setup.alert(`Library lookup couldn't find ${chapter} in orgasm book ${book}, defaulting to standard (no alternates given).`);
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
  if ("function" === typeof setup.library.orgasm[book][chapter]) {
    return setup.library.orgasm[book][chapter]();
  }
  // Check value of page. normally -1 to randomize, but could request a specific page as index
  if (page !== -1 && setup.library.orgasm[book][chapter][page] != null) {
    return setup.library.orgasm[book][chapter][page];
  } else {
    const i = random(0, (setup.library.orgasm[book][chapter].length - 1));
    return setup.library.orgasm[book][chapter][i];
  }
};
// deletes the library, freeing memory. The library doesn't change, so doesn't need to be stored
setup.library.killSAO = function() {
  setup.library.orgasm = null;
};
// loads the library object.
setup.library.initSAO = function() {
  const ᛔ = State.active.variables;
  /********************************************/
  //  ┌─┐┌┬┐┌─┐┬─┐┌┬┐
  //  └─┐ │ ├─┤├┬┘ │
  //  └─┘ ┴ ┴ ┴┴└─ ┴
  /********************************************/
  setup.library.orgasm = {
    pcOrgasm: {
      standard():string {
        // use function to determine various situational information
        // position groups: "standing" "laying" ... "sitting"
        // girl on top positions: "RevCowgirl" "cowGirl"
        // categories: makeout, oralPC, oralNPC, sex
        let out: string = "You came so hard the game broke! [error]";
        const posKey = ↂ.sex.pos;
        const posGroup = aw.sexPos[posKey].group;
        const posCat = aw.sexPos[posKey].cat;
        function rando(): boolean {
          if (random(1, 10) > 5) {
            return true;
          }
          return false;
        }
        switch (posGroup) {
          case "standing":
            switch (posCat) {
              case "makeout":
                out = `As you stand there making out with <<name _t>>, you find yourself surprised as the tingling pleasure betwixt your legs radiates out from your abdomen. It quickly reaches a crescendo, and before you realize what's happening you find yourself having a somewhat unexpected orgasm. You grasp <<name _t>> for support as your leg muscles flex of their own accord. `;

                switch(ↂ.pc.body.pussy.wetness) {
                  case 0:
                  case 1:
                  case 2:
                    if (ↂ.pc.kink.shame && rando()) {
                      out += `You forget the shame during the furious orgasm, after this is over you feel a sudden weakness in your legs, it seems that it was more intense than you thought. <<name _t>> seems to laugh at you watching as you blush intensely looking at him, you feel his warm embrace and then his hands on your butt, while he whispers some hot galleries in your ear. Your arousal is not over after that, it is one of the good benefits of being a woman.`;
                    }
                    else if (ↂ.pc.kink.rape && rando()) {
                      out += `You hug <<name _t>> as you feel the heat and humidity rise quickly in your little pussy as the waves of pleasure echo through your body, as the orgasm advances you notice <<name _t>> hands walking your body, it takes advantage of the submissive situation you are in. @@.mono;Uh... That's... Aahhh, shit!@@ You surrender to the pleasure of orgasm and caresses, when it ends your legs are slightly weak and you receive an intense kiss from <<name _t>> while he plays with your pussy now even more moistened.`;
                    }
                    else if (ↂ.pc.kink.slut && rando()) {
                      out += `<<name _t>> caress your butt while you come, the humidity increases a lot when you finish your orgasm surprise you and feel a sudden weakness in your legs, so you hug even more <<name _t>>. He just plays with your body, realizing that your sensitivity is even higher after your orgasm, being a woman means enjoying multiple times and not losing your libido, but just having more of it and more sensitivity.`;
                    }
                    else if (ↂ.pc.kink.cumSlut && rando()) {
                      out += `<<name _t>> hugs you as you begin to feel the waves of orgasm pleasure spreading quickly and intensely to the rest of your body. Your legs get more and more shaky as you let out a few moans in appreciation of the climax, it increases your sexual desire instead of stopping it though. You look at <<name _t>> with an expression of pure lust while you cannot contain your desire to kneel in front of your current lover and suck his dick until you extract the cum, the curiosity to taste the male essence from <<name _t>> takes care of your thoughts, and they remain even after your orgasm is over, leaving behind only an even more aroused and crazy bitch to suck on a cock.`;
                    }
                    else if (ↂ.pc.kink.oral && rando()) {
                      out += `When you start to come, the soft and feminine moans escape through your mouth without restrictions, it alerts <<name _t>> of your climax starting. While your body and mind receive the waves of pleasure so desired, he hugs you tightly, caressing your body and smiling maliciously at you. For several seconds you revel in your orgasm while your pussy just contracts, your mind goes blank and when that is done your lust remains, filling you again with sexual thoughts, the desire to kneel and serve the dick of <<name _t>> is prevalent, only almost surpassed by your submission instinct. The hunger for cock is controlling you and you can't wait to suck his penis.`;
                    }
                    else {
                      out += [
                        "Your muscles feel a little weak when it's over, so you continue holding on to <<name _t>> for support. This time your grasp is more gentle; though your orgasm was unexpected, it wasn't unappreciated.",
                        "You feel more satisfied, but an orgasm generates even more lust and sensitivity, one of the advantages of being a woman. You hug <<name _t>> and continue with the makingout, enjoying every touch of it on your body and feeling its warmth and male scent. <<name _t>> certainly enjoyed your orgasm, he smiles at you with a malicious smile and whispers some spicy things in your ear, you can feel the heat emanating from his body and his voice against your skin.",
                      ].random();
                    }

                    break;
                  case 3:
                    if (ↂ.pc.kink.shame && rando()) {
                      out += `You hug the <<name _t>> tightly, unable to look him in the eye but just hug him tightly as you feel your legs weaken as the orgasm advances. Waves of sweet female fluid run down your legs, when the orgasm finally ends he laughs watching your fragility and takes advantage of you by grabbing your butt and playing with your pussy, now even more sensitive.`;
                    }
                    else if (ↂ.pc.kink.rape && rando()) {
                      out += `Despite the fact that the situation started in a rough way, your arousal comes to the surface suddenly making you come ferociously. Your legs are shaking and you hug <<name _t>> while feeling the drops of sweet and feminine liquid running down your legs, your body is better prepared than ever for a fuck and you are losing control of your arousal, <<name _t>> notice this and smirk at you as he strokes your sensitive and wet pussy.`;
                    }
                    else if (ↂ.pc.kink.slut && rando()) {
                      out += `You moan softly while your body feels the waves of pleasure from the surprise orgasm, then the accumulated vaginal moisture begins to trickle down your thighs in the form of small drops. <<name _t>> laugh at your reaction when he realizes your weakness, you hug him more tightly when he feels your legs weaker after the intense and welcome orgasm. The poorly contained arousal and the higher sensitivity speak louder now, making you want a cock inside you as soon as possible.`;
                    }
                    else if (ↂ.pc.kink.cumSlut && rando()) {
                      out += `You sigh in pleasure as your body begins to be hit by your climax, <<name _t>> wraps you in his arms in a firm embrace, he smiles at you realizing that you are coming, and is delighted by your moans. You are taken by surprise when you feel your pussy contracting internally and release some considerable amount of vaginal fluid, it runs down your thighs preparing your body and showing that you are more than ready to receive the <<name _t>> cock. After the intense climax is over, your mind is just filled with lust, the only thing running through your mind is the desire to kneel and suck the <<name _t>> cock, the desire to taste the masculine essence of your lover is implicit in your instinctive desires and awakens your hunger that can only be quenched with that precious liquid.`;
                    }
                    else if (ↂ.pc.kink.oral && rando()) {
                      out += `The pleasurable tingling starts to warm your pussy and quickly spreads to the rest of your body, occupying your mind. When <<name _t>> realizes this, he hugs you even more tightly and you allow the moans to come out of your mouth without restrictions, drops of sweet vaginal fluid drip down your thighs while your mind is filled with the intense desire to serve the your lover, the submission instinct takes over your interior and makes you want to be subdued, kneel down and suck the dick of <<name _t>>. The thought of texture, taste and warmth emanating from the hot piece of meat fills you with lust again, even after the orgasm is over, just leaving your legs shaking and the female liquid on your legs.`;
                    }
                    else {
                      out += [
                        "When it's over you can feel some of your nectar running down your inner thighs. Your thighs and the rest of your legs feel a little weak, so you continue holding on to <<name _t>> for support. This time your grasp is more gentle; though your orgasm was unexpected, it wasn't unappreciated.",
                        "You hug the <<name _t>> tightly, feeling the orgasm progress in your body sending waves of pleasure and rapidly increasing vaginal moisture. Soon the drops of sweet and feminine liquid run down your thighs, when the orgasm ends you feel your legs slightly weakened, <<name _t>> take advantage of this to tease your body even more.",
                      ].random();
                    }

                    break;
                  default:
                    if (ↂ.pc.kink.shame && rando()) {
                      out += `You look at ashamed <<name _t>> as you feel a torrent of vaginal fluids running down your legs, orgasm causes you strong waves of pleasure and a squirt. When this is over, you grab <<name _t>> feeling your legs weak, he feels your vulnerability and caresses your butt, whispering daring gallantry in your ear. You feel even more aroused and sensitive after the surprise orgasm, this is one of the benefits of being a woman.`;
                    }
                    else if (ↂ.pc.kink.rape && rando()) {
                      out += `Waves of pleasure cross your body as you hug <<name _t>>, during orgasm you feel your legs trembling and weak even as the vaginal liquid squirt from your wet pussy and drips down your thighs. <<name _t>> smiles to himself when he sees your reaction and envelops you in dlee's arms, caressing your body after the end of the surprise orgasm, now you are eager to be fucked, thanks to your arousal and increased sensitivity.`;
                    }
                    else if (ↂ.pc.kink.slut && rando()) {
                      out += `You groan as you feel the waves of pleasure coursing through your body, as the orgasm advances the vaginal fluid runs down your legs. You feel your legs weak when the surprise orgasm ends, and hold on to <<name _t>> for support, he wraps you in his arms and gives you a malicious smile as he plays with your most sensitive parts, leaving you even more eager to be fucked as soon as possible.`;
                    }
                    else if (ↂ.pc.kink.cumSlut && rando()) {
                      out += `The tingling pleasure that you have been waiting for begins, spreading waves of pleasure throughout your body and leaving your mind blank. <<name _t>> gives you a laugh, he hugs you tightly and plays with your most sensitive points, enhancing the orgasm that unfolds in your body. Every contraction of your pussy makes your lust only increase, you haven't had a stick inside you yet to satiate your arousal. Your hunger starts to grow, a hunger you know well, hunger for cum. You have a hard time controlling your urges to kneel and start serving your lover, milking to the last drop of his precious manly cum, but you can't get the desire out of you, I can only think of the taste, texture and temperature of the precious liquid contained in his balls.`;
                    }
                    else if (ↂ.pc.kink.oral && rando()) {
                      out += `The drops of the sweet vaginal liquid start to run down your thighs quickly after your orgasm begins, you groan looking at <<name _t>>, while he throws you a satisfied smile when he sees your climax and envelops you in a warm and tight, taking advantage of this to caress the most sensitive parts of your body. You begin to feel a deeply tempting desire to kneel in front of him and suck your lover's meaty stick, when the orgasm ends all you have left are the thoughts of pure lust and the submissive desire to suck his cock.`;
                    }
                    else {
                      out += [
                        "You feel a sudden wetness on your thighs, and you realize that your sodden <<p 'pussy.n'>> is squirting femcum as you orgasm. Your muscles feel a little weak when it's over, so you continue holding on to <<name _t>> for support. This time your grasp is more gentle; though your orgasm was unexpected, it wasn't unappreciated.",
                        "You feel the moisture start to run down your legs when your orgasm continues, your vagina squirt some jets of female fluid and when that is over you feel a sudden weakness in your legs and hold on to <<name _t>>. He takes advantage of your weakness though, he smiles seductively at you satisfied with your orgasm and caresses your butt, but also paying attention to your wet pussy and leaving you even more uncontrolled and eager for sex.",
                      ].random();
                    }

                    break;
                }

                break;
              case "oralPC":
                out = `As you stand there towering over <<name _t>> while <<n _t 'heshe.q'>> kneels between your legs, you feel your pleasure build to a fever pitch. You reach out to grab something to steady yourself, but find only <<name _t>>'s head. As your climax hits you find yourself clutching at <<n _t 'himher.q'>>, inadvertently burying <<n _t 'hisher.q'>> face in your <<p 'curwet.q'>> <<p 'vulva.n'>> as you attempt to remain standing. The firm contact combines with the jerking of your muscles to make it all the more intense, and you can't help but scream out in rapturous pleasure. `;

                if (ↂ.pc.body.pussy.wetness < 3) {
                  if (ↂ.pc.kink.shame && rando()) {
                    out += `Despite the poorly contained shame, you feel orgasm unfolding in your body, pleasure takes over your mind and it takes control, making you ignore the obscene act and the shame of participating in it to fully enjoy the pleasure while <<name _t>> suck your pussy. The vaginal fluids stick a little on his face, you reach out and hold his head, forcing it against your clit in the expectation that it intensifies, providing you with more pleasure. Shame is now behind you, and you look at him smiling and moaning like a bitch until the end of orgasm. When that is over, all that remains is your most tired body, but still aroused and wanting a good fuck, despite the shame to take care of you again.`;
                  }
                  else if (ↂ.pc.kink.rape && rando()) {
                    out += `<<name _t>> suck your pussy with more and more intensity, in a few minutes you feel an intense tingle of pleasure start when it squeezes your sensitive clitoris between your teeth, and your body begins to receive waves of pleasure as the climax happens. You are not in control here, just serve as a forced slave for <<name _t>>, he is delighting with your reaction, and with the vaginal fluid drops that drip from your pussy as your vagina convulses. When this is over you are breathless, but you are still totally enslaved by your abuser until he decides to free you, after satiating his libido with your body.`;
                  }
                  else if (ↂ.pc.kink.slut && rando()) {
                    out += `You wrap your legs around <<name _t>>'s head while he continues to suck your cunt, in a sign of mild dominance but much more poorly contained sexual desire. You smile at <<name _t>> and encourage him to continue, with more and more strength, when he puts his tongue into your love hole your orgasm finally begins. Your pussy warms up and quickly contracts around your lover's tongue, sending waves of pleasure very consistent around your body, making your mind go blank, you moan freely while grabbing <<name _t>>'s hair and laughs frantically now in anticipation of being fucked, even though you are enjoying it, it does not soften your arousal. When this is over you are panting but your mind doesn't want to rest, and your body ends up following it, your cunt begs to be finally filled.`;
                  }
                  else if (ↂ.pc.kink.cumSlut && rando()) {
                    out += `You grab your lover's hair and force his face against your pussy, feeling a great urge to finally receive an orgasm. When this finally happens you intensify the movement, feeling the waves of pleasure echo through your body with each new internal contraction of your pussy, and allowing your moans to flow freely echoing through the room. From start to finish, your orgasm just makes your hunger grow, you can't wait to suck every inch of <<name _t>>'s dick, finally milking every jet and every drop of his hot, manly cum, your mind it is filled with desire and you can barely contain the urge to grab and suck his cock.`;
                  }
                  else if (ↂ.pc.kink.oral && rando()) {
                    out += `<<name _t>> suck your clit very intensely, dividing your attention between your most sensitive spot and the entrance to your love hole. After some time you start to come, your climax quickly turns into powerful waves of pleasure, echoing through your body and making your mind go almost blank, except that the only thing you think about now is the desire to suck the meaty stick of <<name _t>>, your submission instinct starts screaming inside you, along with your growing arousal and even after the end of orgasm, the pussy acts begs to be properly fucked, but everything you can think of is to kneel before him and serve him well.`;
                  }
                  else {
                    out += [
                      "After it's over you finally remember that you have <<name _t>> buried between your legs and you release <<n _t 'himher.q'>>. Looking down, you see <<n _t 'himher.q'>> grinning up at you.",
                      "You just enjoy the constant pleasure while <<name _t>> sucks on your pussy, as it travels through your most sensitive parts you feel an orgasm approaching and finally reaching your body. By allowing moans to come out of your throat freely, you begin to feel your pussy squirming internally as the vaginal moisture is released on <<name _t>> 's face, your body pulsates more intensely, but when the climax ends you feel it an even deeper arousal, knowing that orgasm only served to leave you wanting a fuck even more intensely, you can't get your lover's cock out of your thinkings.",
                    ].random();
                  }

                } else {
                  if (ↂ.pc.kink.shame && rando()) {
                    out += `<<name _t>> tease you, sucking hard and occasionally biting your clit gently, knowing that you are very embarrassed but also almost cumming. When he does this one last time, it is enough to cause you an immediate orgasm, totally breaking your shy posture and making you immediately grab his hair forcing his face against your climaxing pussy, it becomes so intense that you start to expel a moderate squirting, covering the face of <<name _t>> with your vaginal juices, the sweet liquid covers his face quickly, but this is something welcome. At the end of it, you are tired and panting, but the little bitch inside you has been instigated and now your pussy begs for a fuck.`;
                  }
                  else if (ↂ.pc.kink.rape && rando()) {
                    out += `<<name _t>> keep teasing your pussy, pressing your clit between his teeth, he presses you until your body starts to climaxing although your reaction is unexpected. Even though this is a rape you grab his hair and force his face against your climaxing cunt, squirt jets quickly come out, spreading your sweet and feminine juices across his face, you groan like a bitch in heat and forget everything about rape or that this is an unauthorized relationship, after your orgasm ends your body is begging for it, your cunt is hot and screaming to finally receive a big and hot cock filling your depths.`;
                  }
                  else if (ↂ.pc.kink.slut && rando()) {
                    out += `Feeling the constant pleasure of being sucked, you wrap the head of <<name _t>> between your legs and pressure it, signaling to your lover that you want it, but more and more strongly. Smiling fiercely at him, your wicked expression is soon broken when he intensifies things, sucking and squeezing your clitoris between his teeth and finally bringing you the long-awaited orgasm. You just moan like a bitch in heat as you press his head tighter between your legs, his tongue is in your love hole when you start to squirt fiercely, exposing your immense excitement that is now released. After several jets and powerful waves of pleasure your body is tired, but your libido will only be satisfied after your cunt receives what it really needs, a fuck as you deserve.`;
                  }
                  else if (ↂ.pc.kink.cumSlut && rando()) {
                    out += `You moan more intensely as your orgasm approaches, the hot tongue of <<name _t>> travels around your love hole, teasing you, when it finally enters you can feel a pleasant, soft and warm sensation. At that point your climax begins and you feel the inner walls of your pussy squirming and releasing waves of pleasure, your body hairs shiver and you roll your eyes moaning very intensely. Grabbing your lover's hair, you feel the orgasm echo through your body and after several seconds it comes to an end, you are left tired and breathless, but your arousal has grown more after that, your hunger for cum is the only thing that you can think, your intense desire to kneel and suck the cock of <<name _t>> until you finally extract every drop of his male cum, the mere thought of the texture and the heat of the sticky substance makes you crave for it.`;
                  }
                  else if (ↂ.pc.kink.oral && rando()) {
                    out += `<<name _t>> tease you, he sucks you hard and since he already knows your weak point, he uses it against you, squeezing your hard little clit between his teeth causing a sharp and consistent sensation of pleasure. He can't hold his laughter when you groan like a bitch in heat in pleasure, but wave after wave of pleasure takes your body to climax. The orgasm causes you to release at once all the arousal contained within you in waves of pleasure even more intense, raising your body hair and making your pulsations very fast. You enjoy every second of it until the orgasm ends, making you tired and wetting the face of <<name _t>>, but it didn’t calm your libido though, your mind doesn’t keep calm but just think about kneeling and fulfilling your role serving your lover, and sucking his cock until he finally comes and covers you with his manly semen.`;
                  }
                  else {
                    out += [
                      "After it's over you finally remember that you have <<name _t>> buried between your legs and you release <<n _t 'himher.q'>>. Looking down, you see <<n _t 'himher.q'>> with a surprised look on <<n _t 'hisher.q'>> face, which happens to be thoroughly coated in your juices.",
                      "<<name _t>> sucks you hard, he gives constant attention to your clit and plays with your most sensitive point, pressing more and more, you just moan like a little bitch and in the end you grab his hair indicating that you are almost coming. After a few seconds you reach your climax, releasing some gentle squirting jets on your lover's face, he is not taken by surprise though, and seems to taste every drop of your sweet and feminine juices. Your mind goes blank with the waves of intense pleasure but the arousal that should decrease only increases, the benefits of being a woman can be profoundly rewarding after all. At the end of the orgasm your body is tired, your muscles a little stiff but your mind still boils with the growing arousal, your pussy is now begging for a big and hot cock, filling you to the limit.",
                    ].random();
                  }

                }
                break;
              case "oralNPC":
                if (ↂ.pc.kink.shame && rando()) {
                  out += `At this point, you are not too ashamed, because as you continue sucking on <<name _t>>'s penis, your shyness has diminished, losing space for your arousal, freeing the bitch in heat inside you to do this job. You keep your lover's cock almost whole in your mouth, enjoying the warm taste and texture of your skin, feeling like veins pulsing inside your mouth. The tension and accompanying awakening reach the maximum point and your body begins a climax, your pussy quickly warms up and pulsates intensely, squirming internally, and sending powerful and good waves of pleasure through your body. This erases the remnant of shyness that was inside you, just releasing your lover's cock to moan, you revel in orgasm for several seconds. When this is over, you look at the erect penis and remember that the real fuck is not over yet, despite your more tired and tense body.`;
                }
                else if (ↂ.pc.kink.rape && rando()) {
                  out += `You just accept your role here, and suck the <<name _t>> cock up while he looks at you, caressing your face while admiring you doing your job, submissive and with smooth movements. He gives you a smile full of lust, you hold the cock inside your mouth, letting yourself be carried away by your excitement that increases with each second you come in contact with the abuser's fleshy cock, the intense and sexual smell fills your interior and makes you start to lose control. At a certain point, your heart rate increases, your pussy quickly heats up and pulsates, when your inner walls contract strongly you are hit by powerful waves of pleasure, an orgasm has started. You release your dick to moan while your pussy twitches, as if trying to press a cock that is not inside, you feel that emptiness though, but continue to enjoy every second of the intense climax. When you finish, your pussy is hot and imposing for a cock while you continue to serve your abuser.`;
                }
                else if (ↂ.pc.kink.slut && rando()) {
                  out += `You smile at his scent as you firmly hold the pulsing meat stick and let it sink into your mouth, enjoying every second of the male flavor, the aroma takes over you and further increases your furious libido. <<name _t>> enjoy your every move and grunt with pleasure while playing with his cock inside your mouth, your spontaneity makes him smile at you occasionally. Putting all your strength and intensity into it, soon you are soon hit by an orgasm, your body reaches the limit of tension and arousal and explodes in an intense climax, you feel your pussy contract and drip while you do your best to maintain the focus on the erect dick inside your mouth, despite efforts you occasionally release penis to moan, enjoying every second of orgasm. When this is over your body is tense, but your arousal showed no signs of falling considerably and soon grows back, because the fuck is not over yet.`;
                }
                else if (ↂ.pc.kink.cumSlut && rando()) {
                  out += `You get on your knees and totally focused on your job, firmly gripping the base of the cock <<name _t>>, you suck hard at your lover's milking, taking care of every inch of your penis and making him grunt with pleasure that you are giving it to him. You are totally focused on it and you can feel it when your body's pulse increases, the sexual climate and the constant stimulus make you reach your climax, overflowing with lust you start to come ferociously, although you keep the cock inside your mouth, still serving your lover despite the waves of pleasure trying to distract you from your work. You remain milking his cock until the end of the orgasm, which just left you even more aroused and hungry for cum.`;
                }
                else if (ↂ.pc.kink.oral && rando()) {
                  out += `Kneeling in front of your lover, you ignore everything around you while sucking your cock fiercely. The grunts of pleasure take over the room as you milk your penis more and more intensely, your pulse increases rapidly as you press the head of your penis with your tongue. You lose track of time with ample satisfaction in serving <<name _t>>, but in spite of that your orgasm takes you by surprise when the warmth and the tingling pleasure start to emanate from your pussy to the rest of your body, making you sigh still with the cock in your mouth. Your desire to serve your lover is great and you try to stay focused on sucking the cock despite the waves of pleasure echoing through your body. After several seconds it ends, leaving you exhausted but even more aroused, your pussy starts to beg for a fuck despite the exhaustion taking over you.`;
                }
                else if (ↂ.pc.kink.sizequeen && rando()) {
                  if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                    // Tiny cock lol
                    out += `Holding the small <<name _t>> cock, you analyze it with disapproval in your eyes. But you decide to continue with this for some reason, since you are already aroused, you begin to serve your lover. By letting his little dick slip into your mouth, slowly sucking on it, you feel considerable frustration, but persist. After a few minutes you are sucking it more intensely, the pleasure of <<name _t>> is visible on his face as you intensify and milk his penis intensely. Despite your high demands, your body feels the effects of tension and arousal, and your pussy soon starts to come. You immediately release the cock, letting it slip out of your mouth and groan as the waves of pleasure spread through your body. You bite your lip when your vagina releases a small torrent of vaginal fluids, knowing that this is probably the maximum pleasure you will have. After orgasm is over, you return to serving the <<name _t>>'s cock.`;
                  } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                    // Acceptable...
                    out += `You kneel in front of the <<name _t>> middle cock, analyzing every part and every inch of the pulsating meatystick in your hands, you feel it is big enough for you to go ahead. By grabbing his penis, you slowly begin to serve your lover. Being in control of his pleasure brings you a warm feeling, as you intensify your movements and suck more strongly, he grunts in pleasure as he looks at you, the expression on his face after a few minutes, his sense of total pleasure is distorted . You know how to satisfy a man, letting his cock sink so deep into your mouth, you feel it hot, throbbing, and then press the head of it with your tongue, applying more pressure and sucking it to the point of starting a deepthroat. He lets out a fierce growl when you do this, although the tension in your body reaches the climax, causing you to orgasm. It takes you by surprise, but it's a welcome thing though. Your little pussy squirms internally, spreading waves of pleasure throughout your body, and releasing a lot of vaginal fluids in the process. You feel your body pulse strongly and release the dick from your mouth to moan, after several seconds the orgasm ends up taking much of your strength, but not reducing your arousal. You catch your breath for a few seconds before serving again <<name _t>>, knowing that the real fuck hasn't started yet.`;
                  } else {
                    // Magnificent!
                    out += `Submissively kneeling in front of <<name _t>>, you grab his big dick firmly and let it sink into your mouth. Your movements start slow, but you move to fast movements quickly, as you are more and more controlled by your arousal. Putting more intensity into it, you suck the meaty cock with a deep hunger for sex and cum. While this is in your mouth and your lover screams with pleasure at each of your movements, you ponder about his penis. Your mind cannot help comparing it to a big, virile horse, making you feel a deep and perverted desire to feel it by stretching the vaginal depths beyond your limit. Almost in response to this, your body reaches the limit of tension and attached excitement and you can feel your little clitoris harden, increase in size, however emanating a pleasant tingling in your body. At that point, you know that an orgasm has started, and in just a second, the pleasure begins to echo through your body like an electric shock, without you taking the stick out of your mouth. @@.mono; Uhh... Ahh! That's- Ooohhh... One of the best parts of this fuck!@@ For several seconds your pussy squirms internally, although there is no penis inside. When this is over, your libido increases, despite your tired body. You just release the <<name _t>> penis to breathe, then, looking at your lover's fleshy cock, you feel a certain regret in your heart when you are reminded by the reality that this is not a real horse, even he is well endowed.`;
                  }
                }
                else {
                  out += [
                    "You kneel there, <<if $T.main.male>>your face practically touching <<name _t>>'s <<n _t 'cocklength.q'>> throbbing <<n _t 'cock.n'>><<else>>your nose barely an inch from <<name _t>>'s <<n _t 'curwet.q'>> <<n _t 'vulva.q'>><</if>>, you bring yourself over the edge. Without even realizing it, you've wound up with both hands between your <<p 'weight.q'>> thighs, thoroughly working over your <<p 'curwet.q'>> <<p 'cunt.n'>>. You <<if $T.main.male>>inhale <<name _t>>'s cock into your mouth, moaning around it as you climax.<<else>>press your face against <<name _t>>'s <<n _t 'vulva.n'>>, moaning into her <<n _t 'labia.n'>> as you climax.<</if>> You stay that way for several moments as you recover, before finally leaning back ready to continue.",
                    "You hold the <<name _t>> stick inside your mouth, applying more intensity to the movement and at the same time using your tongue to play with the head of the penis. The moans <<name _t>> echo around the room, making you feel more dominant, after a few seconds although you can feel your pussy pulsing and getting hotter, the tingle of pleasure spreads from your hardened clit and quickly it turns into powerful waves of pleasure that compel you to release your lover's cock to moan, feeling drops of sweet vaginal liquid oozing out while your inner walls contract strongly. You breathe heavily feeling the pulse of your body, after several seconds of pleasure the orgasm ends, leaving you more tired but even more excited and hungry for a good fuck, the erect dick in front of you indicates that sex is far from coming to the end.",
                  ].random();
                }

                break;
              case "sex":
                switch (posKey) {
                  case "standingFacingAwaySex":
                    out = "Bouncing your <<p 'butt.q'>> <<p 'butt.n'>> into <<name _t>> in rhythm with <<n _t 'hisher.q'>> thrusts as <<n _t 'heshe.q'>> fucks you. ";
                    break;
                  case "standingHandsonWallSex":
                    out = "Pushing off the wall to bounce your <<p 'butt.q'>> <<p 'butt.n'>> into <<name _t>> in rhythm with <<n _t 'hisher.q'>> thrusts as <<n _t 'heshe.q'>> fucks you. ";
                    break;
                  default:
                    out = "Entwined with <<name _t>> as <<n _t 'heshe.q'>> stands there fucking you. ";
                    break;
                }

                if (ↂ.pc.kink.shame && rando()) {
                  out += `You press your hips against <<name _t>>, longing for an orgasm that approaches you with each new thrust. Although you avoid looking into your lover's eyes and blushing intensely, your shyness is no longer a barrier to your body, your sexual instinct has taken control of your will. You are now like a bitch in heat, your pussy soon starts to squirm more tightly around his dick, you understand that this is an orgasm when your body starts to tingle with intense pleasure as your pulsations increase quickly. Your moans flow freely down your throat, taking over the room while <<name _t>> keeps fucking you, but press his dick into your depths until the end of your climax, having fun while your legs are shaking and the female liquid drips down your thighs, after that is all that's left is a panting little bitch, but wanting even more fuck.`;
                }
                else if (ↂ.pc.kink.rape && rando()) {
                  out += `<<name _t>> remains gripping your hips tightly and thrusting against your pussy, with each thrust you get closer and closer to an orgasm. Although this is a rape, you have already lost control of your body to your arousal, the intensity of the pit and the feeling of having a big and thick cock fucking you is too much for you to maintain control, despite <<name _t> > be abusing your body. You are taken by surprise when he presses hard on his penis in your depths, it triggers an immediate orgasm taking you by surprise, the orgasm takes over your body, spreading strong waves of pleasure and leaving your mind blank, totally free from thoughts other than the activity going on in your little pussy now. Your vaginal fluids flow down your legs as he gives a satisfied laugh watching you climax, your moans only subside when the orgasm ends several seconds later, just for him to continue thrusting against your pussy until he finally comes.`;
                }
                else if (ↂ.pc.kink.slut && rando()) {
                  out += `You smile to yourself with satisfaction while <<name _t>> thrust against your wet pussy, dividing your mouth between smiles, encouragements and moans of pleasure. Your obscene sounds echo through the room, contaminating the air with the heavy smell of sex. Each thrust brings you closer and closer to an orgasm, you press your hips against your lover, wanting to feel the tip of his penis kiss your cervix, his balls hitting your unprotected clit, so all of that triggers your orgasm. Starting at your hard clit, the sensation of tingling pleasure soon spreads throughout your body, causing your pussy to compress the meaty stick inside you and release some vaginal fluid, <<name _t>> feel it and hold you, caressing you some of your most sensitive spots, teasing you until your orgasm is over, just leaving you even more aroused, with a tired body and shaky legs, but the fuck isn't over yet.`;
                }
                else if (ↂ.pc.kink.pregnancy && rando()) {
                  out += `Thrust after thrust, you are quickly taken by your high arousal and your powerful maternal instinct. With each movement, you feel the tip of the penis <<name _t>> touch your cervix, the sensation fills you and makes you moan in a mixture of satisfaction, pleasure and joy with the expectation of being properly impregnated. You just ignore anything else or thought, and encourage <<name _t>> to keep fucking you. Instinctively you press your butt against his dick, helping your lover's movements and giving him more access to your body. Inevitably you are caught by a climax, after countless thrusts, the smell of sex infests the room when you let out a high-pitched moan and start to come furiously, feeling your inner walls press against the cock inside you. Releasing vaginal fluids you enjoy every second of it, after orgasm your body is tired, your legs are shaking, but this will only end when <<name _t>> creampie you.`;
                }
                else if (ↂ.pc.kink.risky && rando()) {
                  out += `You allow your moans to echo freely filling the room while <<name _t>> thrust against your wet pussy, the feeling of having a dick in and out of your depths, touching your deepest and most intimate parts, makes you wish for a creampie despite the mixed feelings boiling inside you. Maternal instinct and arousal are battling your concern about getting pregnant, but despite your concern an insemination seems inevitable, and that leaves you in ecstasy. After countless thrusts you finally start to come, moaning intensely and feeling your body heat up and pulse quickly, you press your butt against your lover's meaty stick, he grabs your hips and lets it sink in while you enjoy the climax . For you, this is one of the best parts, your body convulses with pleasure and your internal walls press firmly against the penis in your depths until the end, leaving you tired but even more aroused when the furious climax ends.`;
                }
                else if (ↂ.pc.kink.sizequeen && rando()) {
                  if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                    // Tiny cock lol
                    out += `<<name _t>> put as much strength as possible and fuck you with all his breath, although you look at the cock in and out of your pussy and give a look of disapproval and frustration. Unable to get great pleasure from the fuck going on, your moans sound like a minor sound. You make no effort to pretend pleasure, but <<name _t>> is too distracted by the task of fucking your pussy to notice it. In spite of everything, the accumulation of lust, frustration and tension in your body reaches a limit, and leads you to a fast orgasm. Your little clit hardens and increases in size, pulsating and vibrating, emanating pleasure that quickly become powerful waves of pleasure that finally make you moan intensely while your pussy contracts around the <<name _t>> tiny penis. After several seconds the orgasm ends, letting your breath become heavy in what is a normal orgasm, although this increases your frustration, because now you want more than ever a real fuck with a real cock, of great proportions, but <<name _t>> is not over yet. @@.mono;Shit... How long will he keep doing this?@@`;
                  } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                    // Acceptable...
                    out += `<<name _t>> thrust quickly and intensely against your pussy, the humid sounds in each new thrust echo around the room filling the void with the sounds of sex. You complement the perverted chorus by moaning intensely, although not as intensely as you wish, considering the average penis of <<name _t>>, although it is enough to satisfy you reasonably. You begin to feel the tension and lust involved in your body, and in a few moments you begin an orgasm. Feeling your body pulsations accelerate in a few seconds, and the little pussy acts to warm up and vibrate, your inner walls contract rhythmically and intensely around the <<name _t>>'s cock, throwing waves of pleasure that leave your mind in White. Pleasure takes over you, making you moan intensely, vaginal fluids pour out of your climaxing cunt, even with the <<name _t>> penis in your depths. You revel in it for several pleasant seconds until the end, when you realize that the fuck isn't over yet.`;
                  } else {
                    // Magnificent!
                    out += `<<name _t>> press his body against yours while pushing against her pussy, the fuck makes sweat affect more and more on both bodies, the heat and friction increase making the sex more intense. With each new thrust <<name _t>> he sinks his penis with all his strength, trying to tease you at the same time he gets great pleasure from your body, both moan together filling the place with obscene fuck sounds, infesting the air with the strong smell of sex and pheromones. Although you are taking pleasure, you seem to be finally satisfied to be fucked by a huge cock, your mind is active and focused on it, while <<name _t>> thrust against you. The thought makes you more excited, making your body more sensitive to the real fuck that's going on. @@.pc;Aahhh... Come on, use that dick- Oohhh... and fuck me LIKE A REAL MAN!@@ Your satisfaction and tension with sex reaches its limit, and you express it, looking at <<name _t>>'s eyes with a mixture of pain and pleasure. Fortunately, your body is getting the much needed sexual satisfaction, and soon you get a long-awaited orgasm. @@.pc;Aaahhhhh! What! That- Ooohhhh! Like this!@@ Your dirty pussy starts to come, compressing the cock inside you and spreading pleasure all over your body, your pussy heats up quickly and you touch your clitoris in response, that is supersensitive at that moment and the orgasmic sensation takes over your mind until the end. In the end, you are panting, both are tired, but the fuck is not over yet. @@.pc; At least... Aahh... You're doing a decent job- Hmm... Work...@@`;
                  }
                }
                else {
                  out += [
                    "The pleasurable tension in your core just keeps building. Suddenly, as if a dam burst, you're washed into a powerful orgasm. Pleasure radiates from your <<p 'curwet.q'>> <<p 'pussy.n'>> through the spasming muscles of your limbs all the way to the tips of your fingers and toes. You're practically paralyzed as <<name _t>> continues to fuck you, mindlessly riding the waves of pleasure. Eventually your climax passes, but you can already feel a more intense pressure building as <<name _t>> continues to pound your <<p 'pussy.n'>>.",
                    "Your body receives wave after wave of pleasure, you bite your lip feeling the thrusts of <<name _t>>, your pussy receives his dick comfortably, smoothed by the good amount of vaginal fluids. Each thrust means a step closer to orgasm, each time the bulbous tip of his penis touches your cervix makes you moan with pleasure, occasionally you are hit by climax, feeling your pussy start to compress against the erect dick inside you, increasing sensitivity and making you moan loudly while releasing a soft squirt. <<name _t>> grab your hips and press the cock with all your might into your depths, expanding your orgasmic pleasure. Vaginal fluids trickle down your thighs while you come, feeling your internal looks spasm strongly, which lasts for several delicious seconds. In the end the furious climax served to just make you tired, but even more aroused in a fuck that isn't over yet.",
                  ].random();
                }

                break;
            }

            break;
          case "laying":
            switch (posCat) {
              case "makeout":
                out = "Laying down with <<name _t>>, partially intertwined, you are somewhat surprised to find yourself approaching orgasm so soon. There isn't any single cause, but the exploring touch of <<name _t>>'s <<if $T.main.female>>soft<<else>>firm<</if>> hands is a big part of it. You close your eyes, letting the intense sensation of your climax carry you moaning through an indeterminate number of moments. ";

                if (ↂ.pc.kink.shame && rando()) {
                  out += `The orgasm crosses your body spreading pleasure intensely, making you forget your shyness and shame for a few seconds. You moan more intensely stimulated by each firm touch of <<name _t>> in your glass, your lover perceives and appreciates your orgasm, giving you a smile full of lust you feel his hands roaming your body and caressing yours more sensitive points, amplifying the pleasure of orgasm until the end of it. `;
                }
                else if (ↂ.pc.kink.rape && rando()) {
                  out += `<<name _t>> wrap you in his arms and play with your most sensitive parts when he realizes that you are climaxing. You feel the intense waves of pleasure crossing your body and your vagina squirms internally, the vaginal moisture quickly begins to drain and your clit hardens completely. You moan until the end of it, when the waves of pleasure end you feel your body hot, more sensitive and slightly weak, <<name _t>> gives you a little laugh while you continue teasing your body. `;
                }
                else if (ↂ.pc.kink.slut && rando()) {
                  out += `As your orgasm advances you feel the hand of <<name _t>> slapping your right buttock, you groan in surprise and when you look at your lover you receive a smile full of lust and malice. You feel the waves of pleasure running through your body, the heat and pulsations in your body quickly increase. <<name _t>> quickly caress the most delicious parts of your body, you feel fully submission to <<name _t>> when at the end of your orgasm you feel your body weakened, but even more sensitive and eager for a fuck. `;
                }
                else if (ↂ.pc.kink.cumSlut && rando()) {
                  out += `<<name _t>> hugs you tightly, your body is intertwined next to his while you feel his hands roaming your body, your most sensitive parts, to tease you. Just by receiving the caresses you allow yourself to enjoy the moment, feeling his firm hands playing with your body, you kiss him allowing this perverted game to continue. Feeling the heat increase with the two bodies intertwined with each other, the sweat slowly settling on your skin and the smell of sex intensifying, so the sum of all factors makes you come. The orgasm is soft but intense, the waves of pleasure echo through your body like an electric shock, forcing you to break the kiss to moan intensely. But orgasm just brought you more arousal, and more hunger for fuck and cum. Now you are craving to be able to drink your lover's precious male liquid, barely able to restrain yourself from grabbing the erect cock and milk until the last precious drop of semen. `;
                }
                else if (ↂ.pc.kink.oral && rando()) {
                  out += `You give a smile to <<name _t>> when you are taken by surprise, his caresses intensify, stimulating your most intimate regions and making you moan more intensely, breaking your smile and turning your expression quickly into pure arousal. Your desire to grab the <<name _t>> cock and serve it grows more and more with each new touch, in a quick movement he starts a kiss, the heat increases rapidly between the intertwined bodies and at some point you reach the height of it, starting your climax. Breaking the kiss immediately after it starts, you groan as you feel the waves of pleasure echoing through your mind, leaving your thoughts blank except for the constant desire to grab the erect dick, pulsing against your skin, and suck it until you make it come.`;
                }
                else {
                  out += [
                    "When you finally return to the present, you find your <<p 'vulva.n'>> soaked, as if crying for <<name _t>> to fuck you already. ",
                    "<<name _t>> envelops you in a warm embrace, realizing that you are enjoying it intensely, he takes advantage of your sensitivity and whispers some hot gallows in your ear while you moan, caressing your moist pussy. You hold on to it tightly, each wave of pleasure makes your body vibrate and your body hair stands on end. As if hit by a powerful shock, after orgasm your body is weakened and you hug <<name _t>> while it continues teasing you, caressing the most intimate and sensitive parts of your wet pussy. "
                  ].random();
                }

                out += "Pleasure remains behind, tingling across your skin like electricity. You're already anticipating more.";
                break;
              case "oralPC":
                if (ↂ.pc.kink.shame && rando()) {
                  out += `You feel the language of <<name _t>> running every inch of your wet pussy, the heat and tingling begins to increase rapidly, hardening your clit and making your humidity rise even more, you know an orgasm is coming. When that happens, waves of pleasure cross your body, making you moan and temporarily forget your shyness and shame, you feel intense vaginal contractions as your orgasm continues, it makes you want more than anything to have your vagina filled with a big, thick cock. In the end, you are panting, <<name _t>> still playing with you, teasing your hardened clit and abusing your increased sensitivity. `;
                }
                else if (ↂ.pc.kink.rape && rando()) {
                  out += `<<name _t>> hold your legs, you just moan while you have no choice but to let him continue sucking your pussy intensely. You feel his tongue go through your wet love hole, and then he turns to your clit, gently biting it and making you moan. You feel your body warm up while the pleasurable tingling begins to emanate from your pussy, you know that, soon your body is hit by an orgasm. You groan while <<name _t>> remains holding your legs, then you start a soft squirt that wets his face, he seems to be receptive though, he smiles watching your pussy squirm internally, your clit hardens like iron and when it ends you feel your body slightly weak and your pulse quickened, it keeps sucking you away, teasing you until you are ready to beg for a cock inside you. `;
                }
                else if (ↂ.pc.kink.slut && rando()) {
                  out += `You are impatient waiting to be fucked, but enjoy while <<name _t>> licking your pussy, playing with your clit. Each touch of your most sensitive spot causes a small wave of pleasure to echo through your body, but soon you feel your vaginal heat and tingling waves rise rapidly, and then your body is hit by a sudden orgasm. This is a welcome surprise though, you moan intensely as you grab the <<name _t>> head and force it against your clit, he understands the message and sucks you more intensely, enhancing the intense pleasure of orgasm and you moan like a bitch in heat, enjoying every second until your orgasm ends, leaving you breathless and weakened, but much more hungry for cock. `;
                }
                else if (ↂ.pc.kink.cumSlut && rando()) {
                  out += `<<name _t>> lick your pussy vigorously, focusing his attention on your clit, knowing that it is your most sensitive point. He delights in tasting your female juices, and listening to your moans as he plays with your love hole. Internally your arousal just grows, along with the tension in your body caused by the desire to be fucked, which is only overcome by your enormous thirst for cum. Your mind is filled with submissive thoughts, you feel a great urge to grab the <<name _t>> cock and milk his meaty stick until you finally extract all the cum. Your body gives you a small but welcome surprise when you start to climax, reaching maximum tension, the waves of pleasure echo through your body helping to relieve your huge libido a little, but this is only temporary. When your orgasm ends, your thirst for cum and the urge to suck a dick has only increased. `;
                }
                else if (ↂ.pc.kink.oral && rando()) {
                  out += `You let your moans flow freely, just enjoying the small but welcome waves of pleasure while <<name _t>> sucks on your clit. He grabs your thighs and applies more force to it, occasionally pressing your little fleshy bit between his teeth, gradually bringing you closer to orgasm until finally your body starts to climax, releasing all the tension and arousal involved. Your moans take over the room while you feel the waves of pleasure very intense leaving your mind blank, except for your desire to suck the meaty stick of <<name _t>>, you are hungry for cock and the orgasm has just become it stronger inside you. After several seconds of pleasure, the climax ends, leaving you tired and breathless but applying your hunger, you can barely contain yourself thinking about submissively sucking the dick in front of you. `;
                }
                else {
                  out += [
                    "You lay there, staring blankly, as <<name _t>> occupies <<n _t 'himher.q'>>self between your legs. Your <<p 'pussy.n'>> is tingling; you can feel a tense hunger from deep inside begging to be sated. Your <<pcClitSize>> <<p 'clit.n'>> won't be ignored, however, the waves of pleasure emanating from it only serving to amplify the pleasurable tension in your core. Before you realize it, you've reached the turning point and find yourself cumming. Your <<p 'pussy.n'>> clenches and unclenches rhythmically, as if trying to hold on to a cock that isn't there. The orgasm is intense but brief, leaving you desperate for more.",
                    "<<name _t>> get totally occupied between your legs, playing with you, teasing every part of your pussy with his tongue and sucking your clit. Before long you feel a tingling appear in your virility, it spreads and grows quickly stimulated by the caresses of <<name _t>> and you have an orgasm. The waves of pleasure cross your body as your pussy splashes some smooth squirt jets into <<name _t>> 's mouth, you feel your pussy burn and squirm, as if trying to pin a cock, but the piece hot and pulsating meat isn't filling you yet. When this is over, you feel breathless and a little weaker, but much more eager for a real fuck."
                  ].random();
                }

                break;
              case "oralNPC":
                if (ↂ.pc.kink.shame && rando()) {
                  out += `<<name _t>> groans as you continue sucking his cock intensely, although you are totally embarrassed, your arousal now totally outshines the shy little girl inside you, turning her into a whore in heat. You grab the cock with both hands and suck for an indefinite amount of time, the arousal attached to your body soon explodes an orgasm, you widen your eyes when waves of pleasure cross your body, letting out a moan you begin to feel your pussy warms up and contracts, your inner walls twitch as if trying to pin a cock that is not inside you, your sensitivity increases and you can even feel your cervix relax after the orgasm is over. You then continue to serve <<name _t>>, but now more aroused, sensitive, panting and craving for sex. `;
                }
                else if (ↂ.pc.kink.rape && rando()) {
                  out += `You focus all your attention on serving the pulsating cock in front of you, kneeling before <<name _t>>, you suck the hot piece of meat intensely. It started forcibly, but now you are having a hard time resisting the intensely masculine scent exhaling from it, your arousal reaches its peak, controlling your body and making you want to be fucked while an orgasm starts to warm your pussy, causing a tingling that soon turns into powerful waves of pleasure, you let the penis out of your mouth for an instant to moan enjoying your surprise but welcome orgasm. You feel powerful contractions inside your pussy, heating your entire body and releasing more moisture, your clit vibrates and hardens like iron. When this is over you feel the deep desire to be fucked, your little pussy is screaming for a real fuck.`;
                }
                else if (ↂ.pc.kink.slut && rando()) {
                  out += `You serve <<name _t>>, on your knees in front of him sucking the erect penis, the smell of it is hard to describe, masculine and intoxicating, the texture is smooth and warm, you can feel every pulse of the erect penis inside your mouth . His moans intensify as you tease him, putting more strength and playing with the cock head with your tongue, your barely contained arousal is affected though, you quickly reach a surprise orgasm. You still moan with the cock inside your mouth while feeling the welcome orgasm start to echo through your body, releasing powerful waves of pleasure, you don't take your attention away from the erect penis in front of you though, feeling your pussy squirm strongly and beg for a cock filling the void within it. When your orgasm ends all that is left is the desire for sex, you are more sensitive than ever and almost begging to be fucked.`;
                }
                else if (ↂ.pc.kink.cumSlut && rando()) {
                  out += `Right now, you are totally focused on body and soul in serving <<name _t>>. Your every move is designed to give pleasure to your lover, and extract the semen from him as quickly as possible in order to quench your thirst. He moans intensely when you let it sink into your mouth, applying more force to it, you remain milking his meaty stick until the tension in your body reaches its limit, along with the high arousal, causing you to climax. Your pussy quickly starts to tingle and warm up, the clit is fully hardened and doubles in size when waves of pleasure spread quickly through your body. You start to sweat and moan, but it doesn't break the work you're doing and it keeps sucking your erect penis. When the climax is over you are tired and your body is tense, but your hunger for cum has only intensified further.`;
                }
                else if (ↂ.pc.kink.oral && rando()) {
                  out += `You look at <<name _t>> as he gives you a smile watching you submissively lick his dick, before sinking it into your mouth. Holding the base of the penis you know perfectly how to handle it, teasing the meaty stick inside your mouth and making your lover groan with pleasure. You press the head of the dick with your tongue, suck ferociously every inch and taste the salty and masculine taste of the pre-seminal liquids. You feel very pleased to do this, a deep feeling burns inside you making your pussy quickly start to orgasm while you still keep the fleshy object in your mouth. Closing your eyes, you receive climax and try not to break the work you are doing, but stay on it until the end of the orgasm just breaking your position to catch your breath at the end of the furious climax, but only to return to serving <<name _t>> again.`;
                }
                else if (ↂ.pc.kink.sizequeen && rando()) {
                  if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                    // Tiny cock lol
                    out += `Staring with disgust at the dick in front of you, you force yourself to caress it and decide to continue with the foreplay, allowing the tiny meatystick to sink into your mouth and starting to serve <<name _t>>. His moans quickly fill the room and after a few minutes milking the small penis, you feel deeply frustrated, although the arousal is settling on your body, you know that this penis is unable to make you have real pleasure, and that leaves you deeply upset at the prospect of bad sex. @@.mono;Hmm... I shouldn't go on with this! That penis shit can't even tickle me! Grr...@@ Tension and stress takes hold in your body, causing an orgasm. The heat starts strongly in your clit, hardening your most sensitive and fleshy point, and spreads quickly through your body. You release the cock and moan intensely, letting <<name _t>> know about your orgasm, but you know that this is possibly the maximum pleasure you will have now. When this is over, you again face the small meatystick for a few seconds, before continuing to serve it.`;
                  } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                    // Acceptable...
                    out += `You smile at yourself with brief satisfaction when you see the normal sized dick of <<name _t>>, and grabbing the base of it, you let the meatystick sink into your lips starting a blowjob that starts slowly, but quickly becomes more intense. After a few minutes of serving your lover's penis, the grunts of pleasure fill the room and make you feel hot for being in complete control of his pleasure. As the arousal and tension increase in your body though, you feel dissatisfaction increase as your instincts start to control your body, and you feel like you want a big dick to fuck your slutty pussy. Despite that, you know that this dick can give you a decent orgasm, and satisfy your hunger for sex. At a certain point, tension and arousal reach the climax, causing your body to orgasm and making you quickly release the pulsating meatystick and moan intensely, while your pussy contracts internally. @@.pc;Aahhhh... That! I hope this tool of yours can stretch me, at least- Oohhh... A little!@@ You declare, looking at the erect penis. After several seconds you go back to serving your lover, knowing that the fuck is not over.`;
                  } else {
                    // Magnificent!
                    out += `You lie down in front of the <<name _t>> penis, watching it carefully, measuring the details before grabbing the base of it, feeling the heat and humidity, and allowing it to sink into your mouth. Your arousal is high enough to warm your body and fill it for sex, the huge size of the <<name _t>> cock makes you feel a deep satisfaction in serving it. Sucking with all the experience you have, <<name _t's>> grunts of pleasure begin to flow around the room as you massage your penis with your tongue, feeling the salty texture of your pre-seminal fluids, the intense heat emanating the pulsing pulsing stick and the male perfume in the air make you want more and more fuck. Your arousal reaches its limit and soon you start to come, feeling your clitoris double in size and harden, emanating a torrent of tingling pleasure that warms your dirty vagina even more and spreads through your body like a wave of electricity. @@.mono; Aaahhh...! This is so good! Hmm...@@ Your pussy emanates an intense heat while your vaginal walls contract internally, the waves of pleasure are so intense that you release the cock from your mouth to moan, feeling your femejuices oozing out. You roll your eyes and smile to yourself until the end of the climax, when it ends your pulsations are still racing and your body is tired, although your desire to be fucked by this huge meatystick still remains.`;
                  }
                }
                else {
                  out += [
                    "On your hands and knees, <<if $T.main.male>>your face practically touching <<name _t>>'s <<n _t 'cocklength.q'>> throbbing <<n _t 'cock.n'>><<else>>your nose barely an inch from <<name _t>>'s <<n _t 'curwet.q'>> <<n _t 'vulva.q'>><</if>>, you bring yourself over the edge. Without even realizing it, you've wound up with both hands between your <<p 'weight.q'>> thighs, thoroughly working over your <<p 'curwet.q'>> <<p 'vulva.n'>>. Unbalanced now, you <<if $T.main.male>>inhale <<name _t>>'s cock into your mouth, letting it slip deep into your throat as if impaling yourself for support.<<else>> simply let yourself fall forward slightly, and up with your face pressed firmly against <<name _t>>'s <<n _t 'vulva.n'>>.<</if>> You climax, almost unaware of <<n _t 'hisher.q'>> <<if $T.main.male>><<n _t 'cock.n'>> down your throat<<else>><<n _t 'labia.s'>> <<n _t 'labia.n'>> suffocating you<</if>> due to the intense pleasure. You stay that way for several moments as you recover, before finally the need to breathe forces you to lift yourself away.",
                    "<<name _t>> moans while you serve his penis, grabbing the base of it and sucking as hard as you can. Although you are being controlled by your attached arousal, you are now hungry for cock and cannot resist the piece of meat pulsing in front of you. At some point your trapped arousal explodes, you feel the tingling quickly spread through your body as your pussy starts to contract internally, trying to trap a cock that is not there, the orgasm though is a welcome surprise. You groan without allowing the penis to come out of your mouth, but you let it go as you can't resist the waves of pleasure crossing your brain and need to moan. After that is over you again and turn to serve the cock, you feel tired, your body pulsates with the intense heat remaining from the climax, your sensitivity is higher and your hunger for cock greater than ever."
                  ].random();
                }

                break;
              case "sex":
                const tits = (ↂ.pc.body.tits.size > 500) ? true : false;

                if (posKey === "RevCowgirl" || posKey === "cowGirl") {
                  out = "You're riding <<name _t>>, "; // Player on top

                  if (ↂ.sex.speed < 4) {
                    out += "moving your <<p 'hips.s'>> hips sensually at a slow pace";
                    if (tits) {
                      out += " while your <<p 'breast.s'>> <<p 'breasts.n'>> jiggle in rhythm to your movements.";
                    } else {
                      out += ".";
                    }
                  } else if (ↂ.sex.speed < 7) {
                    out += "bouncing your <<p 'hips.s'>> hips up and down on <<n _t 'hisher.q'>> cock";
                    if (tits) {
                      out += " while your <<p 'breast.s'>> <<p 'breasts.n'>> bounce hypnotically.";
                    } else {
                      out += ", your body glistening with sweat.";
                    }
                  } else {
                    out += "jackhammering your <<p 'cunt.n'>> down onto <<n _t 'hisher.q'>> cock";
                    if (tits) {
                      out += ". Your upper body stays almost stationary as you support yourself with your arms, which causes your <<p 'breast.s'>> <<p 'breasts.n'>> to sway enticingly.";
                    } else {
                      out += " as you use your arms to support most of your weight.";
                    }
                  }

                  // Anenn: Orgasm variations here
                  if (ↂ.pc.kink.shame && rando()) {
                    out += " You go up and down, feeling the <<name _t>> cock rhythmically in and out from inside you. You put a moderate amount of force on each thrust while you mount the hardened penis, feeling it stretch your pussy on each descent making you moan. You touch the <<name _t>> chest looking for support, it allows you to increase the rhythm, which increases the pleasure, at some point you feel it finishes stretching your wet pussy and finally reaching your cervix, your point deeper and more intimate, when you feel that intense kiss you get a groan of satisfaction and press it, feeling every part and every pulse of the cock inside you, the bulbous head of it pressing against the entrance of your uterus makes you feel highly aroused like a bitch in heat. Your shyness is gone and now there is nothing left of the shy little girl, making room for a woman full of hormones and poorly contained arousal, hungry for an orgasm that arrives quickly after the cervical touch. You quickly feel the waves of pleasure start in your pussy and spread through your body, your inner walls contract powerfully around the <<name _t>> cock causing it to groan with mutual pleasure, when the intense orgasm it turns out you are breathless and tired, but even more intensely aroused.";
                  }
                  else if (ↂ.pc.kink.rape && rando()) {
                    out += " This time the sex didn't start out in a normal way, but although it started out as a rape, you gradually lost control of your arousal and your body. Now you are mounting intensely <<name _t>>, in rhythmic movements you feel his cock erect in and out of you. By holding his hands as a form of support, you let the moans flow freely down your throat, feeling the hot, hard meat reaching deeper and deeper into your depths with each step you lower your hips. You put more force into it, wishing for more than ever. Your body is presented with the long-awaited orgasm when you feel your pussy finish being stretched, the head of the <<name _t>>'s penis finally touches your sensitive cervix, a wet and audible sound takes over the room for a second signaling that your pussy is now definitely and fully stretched. You let out a loud moan, but the pain is a lesser feeling, which predominates here and now is pleasure. You press your hips against the cock, also applying more pressure to your cervix and an orgasm quickly takes over your body. Beginning in your pussy, the tingling of pleasure quickly intensifies and becomes strong waves of pleasure that make you scream in a mixture of pleasure and joy to be filled, feeling the inside walls of your pussy contracting and squeezing the hard dick inside. you. When the orgasm ends you notice that your pussy is even wetter after releasing a small squirt, but the intensity of your arousal has only increased and you are looking for another orgasm.";
                  }
                  else if ((ↂ.pc.kink.risky || ↂ.pc.kink.pregnancy) && rando()) {
                    out += " You continue mounting <<name _t>> for an indefinite period of time, holding his hands in a loving gesture to get support in your movements, you thrust rhythmically in your search for pleasure. The feeling of having a big, hot cock stretching your wet pussy is something unique, and you couldn't change that for anything else. Groaning freely you start to increase the pace, in one of the last thrusts against his erect and pulsating cock, you feel it hit your deepest and most intimate point: the cervix. It makes you feel an intense wave of pleasure sweeping your spine, a great deal of pleasure and a small amount of pain, mixed with the warm feeling of having the bulbous head of his penis pressing against your cervix that starts your orgasm. The waves of pleasure quickly and violently spread through your body, your moans of pleasure intensify and you feel your little pussy pressing tightly against the hot piece of meat from <<name _t>>, he moans along with you feeling the pleasure additional, it grabs your hips and presses you even harder against his body. Finally when the orgasm ends you are breathless and exhausted, but you still feel like you want more sex.";
                  }
                  else if (ↂ.pc.kink.slut && rando()) {
                    out += " You mount the cock of <<name _t>> furiously and intensely, feeling the piece of meat hot and hard as the iron penetrating deeper and deeper, stretching your pussy, with each thrust you give. In rhythmic movements, you go up and down, with each descent you can feel it stretch your little bit more, waves of pleasure and a little pain echo through your body every time you descend under the pulsating dick. You put strength into you're thrust, biting your lower lip and resting your hands on <<name _t>> chest, you go down, wanting to be fully stretched, in this movement you hear a soft sound and feel the head of the <<name _t>> finishing stretching your wet pussy and touching your cervix. @@.mono;Finally... This- Aahhh...@@ It's so fucking GOOD! You ponder, feeling the intense touch of his hot penis in your most intimate depths, you press your hips against the hot piece of meat, putting more pressure against your cervix and then initiating an orgasm. The tingling of pleasure begins to echo through your cunt, hardening your clit to the fullest and then spreading throughout your entire body, you let the moans flow freely just enjoying the intense pleasure of orgasm, your cunt contracts strongly around the cock erect, you can feel every pulse in the body of <<name _t>>, the heat increases rapidly in your body along with the pulsations and when the orgasm ends you feel tired, but your arousal is still high and your pussy is even more sensitive and begging for a creampie.";
                  }
                  else if (ↂ.pc.kink.cumSlut && rando()) {
                    out += `You shake your hips dancing on the <<name _t>> cock, feeling it against your internal vaginal walls, the sensation of being invaded by a raw penis is deeply pleasurable and awakens your most basic and primitive instincts, intensifying sex. You let your moans flow and echo through the room without restrictions, when you press your hips against the dick, the skin of <<name _t>> touches your small, hardened clit, added to the penis touching your sensitive cervix, this immediately triggers your orgasm. @@.pc;Aahhh... Shit!!!@@ You touch your lover's chest, leaning on it while the waves of pleasure weaken your body and leave your mind blank, making you moan even more intensely like a bitch in heat. Your pussy compresses the dick inside you until the end, the contractions make your lover feel it almost as intensely as you do and groan in pleasure too. At the end of it, you are exhausted and panting, but his penis is still erect inside you, waiting to continue the fuck until he comes. Despite your thirst for cum, you are instinctively satisfied with the prospect of having a big, manly creampie soon. @@.mono;Maybe about a little bit of that for me to taste, heh.@@`;
                  }
                  else if (ↂ.pc.kink.sizequeen && rando()) {
                    if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                      // Tiny cock lol
                      out += `You touch the <<name _t>> chest, taking support on your lover's body while you try to mount his small penis. You have some difficulty to mount this correctly, after all your pussy is used to well-endowed men. You give up riding this and try to make circular movements, so you find that this way you are able to feel the little meatystick inside you. @@.mono;I can't believe I'm doing this... Why...?@@ You make a great effort to try to get pleasure, although without much success. Your lover though seems to be enjoying the show, and moaning in pleasure feeling your pussy devour his penis. For several minutes the tension and exhaustion take over your body, feeling the skin of <<name _t>> rubbing on your clit makes you feel some pleasure, and in the end the accompanying arousal and tension cause you an orgasm. You roll your eyes and bite your lip feeling the waves of pleasure crossing your body like electric waves, satisfying your need for pleasure a little, although it lasts for a short time without a decent cock to fuck you.`;
                    } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                      // Acceptable...
                      out += `Assembling the middle penis of <<name _t>>, you moan gently while, on each descent, you feel your hungry pussy swallowing his penis. Although your cunt is not being fucked by a big cock, being stretched as you instinctively desire and expect, this is a satisfying sex though. <<name _t>> grunt in pleasure when you press your hips against his erect dick, you can feel the pulsations in each vein of the penis, your vagina contracts internally with the increase in tension and arousal in your body, as if he tried to move the dick further inward. @@.pc;Hmm... Ohh... Is that!?@@ You feel the pressure of the bulbous head of the penis against your cervix, and that is enough to make you come. The internal contractions become violent and put a heavy pressure on the penis inside you, with the powerful waves of pleasure spreading all over your body, you groan like a bitch in heat, accompanied by the smaller grunts of <<name _t>>. You enjoy yourself for several seconds while your pussy gets dirty, but when you finish you realize that the sex is not over yet, and put the meatystick back together more slowly while your body is tired.`;
                    } else {
                      // Magnificent!
                      out += `As you ride the <<name _t>>'s stick, you rest your hands on his chest to gain some additional mobility. You are in a privileged position to fuck and remain thrusting almost violently against the huge penis, feeling it in and out. With each new descent, her wet pussy totally swallows the large meatystick, making your lover moan with pleasure, but you are still not satisfied with that. With each stroke you feel it gently kiss your cervix while stretching your vaginal walls the way you wanted, this penis is the only thing that could satisfy a woman with your demands and you press your hips against his penis, making movements circular to get more pleasure, the tension in your body is controlled though. @@.pc; Uhh... This is fucking- Hmm... So good, you know? I want- Ooohhh... Come soon!@@ At that point, the internal tension in your pussy reaches its limit, and your body receives an immediate orgasm, you feel your pussy contracting strongly against the huge dick <<name _t>>, sending waves of pleasure to your body, making you scream like a bitch in heat. @@.pc;Aaahhhhh!!! This is- Hmm! It's SO good...@@ Your mind goes blank while your pussy contracts so intensely, generating only perverted pleasure. When this is over, you feel vaginal fluids running down your thighs, while your body is heavy, your muscles are rigid and sweat is breaking out on your skin. But the fuck is not over yet, you soon gather some energy and start to mount your lover again, until he comes correctly inside of you.`;
                    }
                  }
                  else {
                    out += [
                      ` You suddenly find yourself struggling to keep up your movements as you sail over the edge into a powerful orgasm. The intensity catches you off guard, and rather than collapse you slam your ${either("<<p 'curwet.q'>>", "<<p 'pussy.s'>>")} <<p 'pussy.n'>> down on <<n _t 'hisher.q'>> <<n _t 'cock.s'>> <<n _t 'cock.n'>>. You throw your head back as your muscles spasm, closing your eyes to enjoy the waves of pleasure coursing through your body. All too soon the climax is over, so you start riding <<name _t>> once more and attempt to resume your pace. You know that another mind-bending orgasm is right around the corner.`,
                      ` You mount <<name _t>> with some considerable intensity, going up and down, you can feel every trace of his pulsating cock inside your stretched pussy. You continue mounting the penis erect until, in a thrust, you feel it sink to your cervix, pressing on your most sensitive spot and starting an orgasm. You feel the heat and the tingling spread quickly and intensely throughout your body, keeping the cock pressing against your sensitive cervix you receive the long-awaited orgasm. The waves of pleasure pass through your spine and reach your brain, you groan intensely and close your eyes to feel the maximum orgasm. The pleasure is intensified when your vagina contracts powerfully against the penis inside you, milking every inch of the pulsating piece of meat, feeling the bulbous and hot head of it pressing against your cervix is ​​a unique sensation, you bite your lip savoring it until the end of orgasm, when you are finally able to catch your breath and some of your energy you continue riding the <<name _t>> cock.`,
                      ` You smile to yourself as you mount the <<name _t>> cock, feeling the pulsating piece of meat penetrate deeper and deeper into each of your thrusts. You groan with each descent unable to control yourself, feeling his penis stretch your vaginal walls, opening deeper and deeper into your womanhood, you start to put more strength into it and then at that point you feel the head of his cock strike against your cervix. That last blow hits one of your most intimate and sensitive points, making you start a surprise orgasm. You widen your eyes when you feel the sensation of tingling pleasure spreading through your pussy, hardening your clit and finally reaching the maximum point and spreading the pleasure all over your body, making you scream in satisfaction and joy while your pussy twitches powerfully around the <<name _t>> penis, compressing the hot piece of meat. You keep the hot meat in your depths, amplifying the pleasure to the maximum until the end of the orgasm, when you finish you feel that you released some considerable vaginal humidity becoming even more sensitive, but you continue mounting it in your hunger for more sex.`
                    ].random();
                  }
                }
                else {
                  out = "You're laying under <<name _t>> as <<he>> "; // underneath
                  if (ↂ.sex.speed < 4) {
                    out += "takes <<his>> time fucking you, delving into your pussy with long sensual strokes. ";
                    if (tits) {
                      out += "You moan your need as your <<p 'breast.s'>> <<p 'breasts.n'>> sway in time with <<n _t 'hisher.q'>> thrusts.";
                    } else {
                      out += "You moan your need gently with each thrust of <<n _t 'hisher.q'>> <<n _t 'cocklength.q'>> <<n _t 'cock.n'>>.";
                    }
                  } else {
                    out += `pounds your ${either("<<p 'curwet.q'>>", "<<p 'pussy.s'>>")} <<p 'pussy.n'>> with <<n _t 'hisher.q'>> ${either("rock-hard", "throbbing", "<<n _t 'cock.s'>>")} <<n _t 'cock.n'>>. `;
                    if (tits) {
                      out += "You moan loudly as your <<p 'breast.s'>> <<p 'breasts.n'>> bounce up and down in time with <<n _t 'hisher.q'>> powerful thrusts.";
                    } else {
                      out += "You moan loudly in time with each of <<n _t 'hisher.q'>> powerful thrusts.";
                    }
                  }

                  // Anenn: Orgasm variations here
                  if (ↂ.pc.kink.shame && rando()) {
                    out += " You've already left your embarrassed side almost totally forgotten, although you still avoid looking into <<name _t>>'s eyes while he fucks you, you just groan looking away, but enjoying every touch of it on your body, and every second in that his cock penetrates deeper and deeper, thrusting against your pussy. At some point you have an orgasm, he presses his penis against your depths, kissing your cervix, it fires your entire arousal in an intense orgasm. You allow your moans to flow freely as he continues to fuck you and the waves of pleasure wash over your body, <<name _t>> realize your orgasm and give a thrust, pressing his penis against your cerix while he moans feeling the walls of your pussy compressing his penis. The sensation is intense and makes your body warm up, your pulsations become rapid until the end of the intense orgasm, when it goes away you just feel empty, like a bitch in heat looking for more sex.";
                  }
                  else if (ↂ.pc.kink.rape && rando()) {
                    out += " <<name _t>> fucks you tirelessly, every thrust of him against your pussy makes you moan, he stretches your depths more and more, adapting your vagina to his cock. You are losing control more and more, surrendering to your intense arousal and his dominating presence. He finishes stretching your cunt, reaching the deepest and most intimate point: your cervix. Every blow of his against your cervix makes you groan at the sensation of his bulbous penis pressing the entrance of your womb, this soon makes you burn with lust and makes you start to come furiously. You let the moans flow down your throat freely as you get fucked and climaxing around the <<name _t>> penis, he notices your climax and smiles, pressing the penis in and amplifying the waves of pleasure that your orgasm brought you. You are totally broken for it and when the orgasm ends, you surrender to your most primitive instinct of desire to mate, now your pussy is fully stretched, burning with lust and your body pulsates intensely with the arousal, just craving for more fuck, and more sex.";
                  }
                  else if (ↂ.pc.kink.pregnancy && rando()) {
                    out += " You feel every thrust of <<name _t>> going deeper into your womanhood, he is putting all his strength to dig until it reaches your most intimate and deepest room. You groan freely, just enjoying the pleasure while <<name _t>> takes care of fucking you properly. You are feeling hot, especially aroused when you fantasize about being fertilized, you feel a strong arousal connected to your maternal instinct and encourage <<name _t>> to continue fucking you until it finally inseminates your uterus waiting. You reach the peak of your arousal, feeling your little voice burn and the tingle of pleasure spreads quickly throughout your body, becoming powerful waves that make you scream in a mixture of pleasure and joy, you envelop the body of <<name _t>> feeling him press his cock in your depths and kiss your cervix, the sensation is a great booster for your orgasm, you scratch the skin of <<name _t>> with your nails in an involuntary movement while Powerful waves of pleasure sweep your mind. When this is over you feel your body more tired, sensitive and your pussy even more eager by cock than before. <<name _t>> is not over yet though, you keep getting fucked until he creampie you, just like you want and deserve.";
                  }
                  else if (ↂ.pc.kink.risky && rando()) {
                    out += " You feel the thrusts of <<name _t>> tirelessly, penetrating your pussy deeper and deeper in search of reaching your deepest point. You can feel every pulse of the throbbing cock, moaning in each thrust, you feel the powerful blow in which it finally hits your cervix and initiates your orgasm. You feel your arousal grow to the maximum point, stimulated by your fantasy of being creampies and deeply fertilized, the feeling of worry and poorly contained arousal makes you reach the maximum point and the waves of pleasure quickly spread through your body making you scream in joy at the feeling of being fully stretched and filled with his big, thick penis. You don't try to contain your moans of pleasure, but just let it flow freely as you close your eyes to enjoy every second and every wave of pleasure to the fullest, the feeling of having a big meatstick stretching you to the max is something deeply satisfying, For now, this is the only thing that could satisfy you. When your orgasm finally ends, you realize that <<name _t>> has not yet come, although you are tired and panting, your pussy is still hungry for more sex, and you are in great anticipation for a manly creeampie.";
                  }
                  else if (ↂ.pc.kink.slut && rando()) {
                    out += " You get fucked more and more intensely, you can feel the rapid breathing and the pulsations of the <<name _t>> increasing as he increases the pace. He thrust against your taut little pussy, making you moan, but you smile with the satisfaction of the fuck. He sees it as a challenge and begins to rhtust more strongly, hitting your cervix with cyclic strokes. You groan in surprise at having your deepest and most sensitive point hit, he grabs your butt and repeats this movement a few more times before you reach your climax. Feeling your arousal explode all at once, you grab his skin while he keeps the penis pressing against your cervix, but now your little pussy is contracting strongly around his cock, the orgasm starts sending waves of pleasure your body, each vaginal contraction makes you moan intensely and for a few seconds you feel totally satisfied. When your orgasm is over, you are breathless but <<name _t>> is not over yet, he continues to fuck you, you are more sensitive, broken, submissive and hungry for more cock.";
                  }
                  else if (ↂ.pc.kink.cumSlut && rando()) {
                    out += `<<name _t>> continues to fuck you vigorously, thrusting against your pussy and enjoying it while he watches your reaction. You moan like a bitch in heat, but just encourage him to keep going, your pussy is wet and hot, the feeling of having a penis touching your depths, in and out, is the most pleasurable thing you could ever want . Your clit starts to tingle intensely warning you that an orgasm is coming, after a few seconds it becomes waves of pleasure that take over your body, <<name _t>> perceive your orgasm and deliberately sink his dick into your depths , making you let out a loud moan. Your pussy twitches strongly, trapping the cock in your depths. You can't wait to be creampied and when the orgasm ends your body is tense, and your legs are shaking, but your desire for cum and a big, manly creampie remain. `;
                  }
                  else if (ↂ.pc.kink.sizequeen && rando()) {
                    if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                      // Tiny cock lol
                      out += `<<name _t>> keep thrusting against your pussy, making a great effort to fuck you satisfactorily, although you don't show much emotion in it. You can see on each thrust, his little meatystick entering and leaving your vagina, the heavy breath of <<name _t>> hitting your skin and a few drops of sweat dripping down. @@.mono;If he was at least a decent size... That would be a good fuck. Shit, why did I let him fuck me?@@ Your frustration increases every minute, the tension in your body added to the arousal reaches its limit and you start to come, not because of the fuck, but because of the intense sexual desire contained within you added to the frustration. @@.pc;Hmm... Aahhh!@@ You enjoy what is probably the most pleasure you will have, and feel the powerful waves of orgasm crossing your mind as he continues his work. The orgasm has a duration and intensity less than usual, due to the small size of your current lover, although it was a brief ray of satisfaction, in a fuck that is not over yet.`;
                    } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                      // Acceptable...
                      out += `You feel the warm hug while <<name _t>> fucks you, his breath is fast and tense, he is putting all his strength into fucking your pussy. Each thrust comes quickly and intensely, you can see his medium erect dick going in and out, your vagina totally devours the meatystick without problems with each new thrust, since you are used to lovers of large proportions, his average penis is something relatively easy for you. The fuck is satisfying, nothing more than normal, and you can get some pleasure from it. The room is filled with the smell of sex and your soft, feminine moans. As the fuck progresses the tension settles in your body, a small dose of frustration grows on you so it is not a considerably bigger dick, but you can ignore that and focus on the flying part. After a few more minutes your pussy starts to warm up around the <<name _t>> penis, and you know that an orgasm started when your clit starts to vibrate intensely, spreading waves of tingling pleasure to your body, increasing your pulsations a lot, your pussy contracts around the penis in your depths. @@.pc;Ooohhh... That! Leave it inside! Aahhh...@@ <<name _t>> listen to your requests, he sinks his penis inside you and they both share the pleasure of orgasm while your vaginal walls contract by crushing his dick. In the end, you're tired and significantly more aroused, but luckily the fuck isn't over yet.`;
                    } else {
                      // Magnificent!
                      out += `The heat is increasing more and more, your body is intertwined with <<name _t>> while he fucks you, his movements are heavy. With each new thrust, his penis reaches your most intimate and unprotected regions, he grunts with satisfaction every time your stretched cunt squeezes his huge and bulbous penis, trying to recover the original size although in vain, causing pleasure for both. But you, despite being very aroused, wet and being fucked decently, still want more, you yearn to be creampied and have an orgasm. The thought gives you an exciting perspective, increasing your sensitivity. At some point your clitoris hardens completely, doubling in size and launching small waves of tingling pleasure that soon become something bigger. @@.pc;Ooohhhh.... Continue! That stick is- Hmm! So fucking GOOD! Fuck me MORE, please! Aahhh!@@ You declare and ask for a more intense fuck. As the orgasm continues, you roll your eyes as you groan like a bitch, feeling the <<name _t>> cock pressing against your pussy, while the waves of pleasure echo through your body and bring you great satisfaction. You wrap your legs around your hips <<name _t>>, trying to stick the stick deeper, it touches your cervix making you get what you wanted so much. At the end of the orgasm, it leaves you tired and breathless, with sweat and heat on your skin, but it's not over yet, you will be fucked until he finally comes, hopefully inside you.`;
                    }
                  }
                  else {
                    out += [
                      " Your vision seems to blur as an intense climax explodes from within you. Your muscles all seem to contract at once as your <<p 'pussy.n'>> attempts to clamp down on <<name _t>>'s <<n _t 'cock.n'>> with all its might. You close your eyes, biting back a scream as the overpowering waves of pleasure course through you. <<name _t>>'s continued thrusts prolong the already intense orgasm, and by the time it's over you're left trembling beneath <<n _t 'himher.q'>>. You can already feel your pleasure beginning to build to new heights.",
                      " You feel an orgasm suddenly reaching your body, your pussy twitching around the <<name _t>> penis as you feel the first waves of pleasure echo through your body. You moan gradually louder as the orgasm progresses, the tingling of pleasure becomes powerful waves that flow rhythmically together with the contractions of your vaginal walls around the <<name _t>> penis, you can feel every trace and every pulsation of the penis penetrating your interior, kissing your depths. You feel the hairs on your skin prickle slightly as the orgasm makes you moan, when this is over you feel your body's pulse racing, your skin takes on a little sweat and you also feel a great emptiness, wishing for more orgasm, still hungry for cock. You gather your energies to continue sex, it is not over yet."
                    ].random();
                  }
                }

                break;
            }

            break;
        }

        return out;
      },
    },
    npcOrgasm(risk): string {
      // risktext opts:
      // cum in mouth action: suckCockHead suckCockInOut
      // cum on face - cat = oralPC
      const posKey = ↂ.sex.pos;
      const pcAct = ↂ.sex.pcAct;
      const cat = aw.sexPos[posKey].cat;
      const anal = aw.sexPos[posKey].anal;
      function rando(): boolean {
        if (random(1, 10) > 5) {
          return true;
        }
        return false;
      }
      let out = `<<name _t>> suddenly groans, <<his>> cock twitches approaching ${either("orgasm", "the point of no return", "climax", "orgasm")}. `;
      if (cat === "oralNPC") {
        // check for face load or mouth load
        if (pcAct === "suckCockHead" || pcAct === "suckCockInOut") {
          out += "That brief warning was all you got before <<he>> started spraying <<n _t 'cum.n'>> into your mouth. The heady smell and rich taste assaults your senses almost immediately. ";

          if (ↂ.pc.status.addict.cum >= 30 || ↂ.pc.kink.cumSlut) {
            if (ↂ.pc.kink.shame && rando()) {
              out += `You feel the <<name _t>> pulsations start to intensify, he starts to gasp intensely and you realize that he is going to cum. Although you are embarrassed, you quickly forget that when you think of the manly cum that is starting to come out of the pulsating cock right into your mouth. You ignore the shame and for a second and, holding the base of the climaxing penis firmly, you sink it into your mouth and suck it hard, milking every jet of manly cum that comes out of it. Fuck this ... I can't live without it! I need this fucking thing, it's SO GOOD! You swallow every drop, intensely savoring the taste and texture of the <<name _t>> semen, just like a real little bitch, you don't let a drop get lost. `;
            }
            else if (ↂ.pc.kink.rape && rando()) {
              out += `You press your hands against the base of the <<name _t>> cock, you feel his pulse intensify and soon he starts to come furiously in your mouth. You taste the jets of hot cum and cannot resist the taste and texture, although this is not a consensual relationship, you have already surrendered to your lust that you are unable to contain. Shit ... I love it, this taste ... This is so good, I can't resist! You taste and swallow every drop of the precious cum that comes out of the <<name _t>> penis, it moans more strongly as you milk the penis, sucking it ferociously to extract every last drop and quench your thirst for cum. `;
            }
            else if (ↂ.pc.kink.slut && rando()) {
              out += `<<name _t>> starts to come furiously, when you realize that you sink the cock hard and pulsating in your mouth, grabbing the base of it with your hands and then you let the white liquid flow into you. @@.mono;This... It's so fucking hot! I don't want to live without it anymore...@@ You suck the climaxing penis intensely, making <<name _t>> moan intensely as you drink every jet and taste every drop of his manly cum, which at that moment finally quenches your thirst, for a while. `;
            }
            else if (ↂ.pc.kink.cumSlut && rando()) {
              out += `You totally lose yourself serving <<name _t>>, sucking every inch of the cock and feeling every drop of the salty and masculine substance that the erect dick emanates, his pre-cum is a small aperitif close to what is to come and when the his penis starts to pulse more and more intensely you know your main meal is approaching. He grunts more intensely when you increase the strength, allowing his cock to sink into your mouth and teasing him, pressing the cock head with your tongue, the fierce milking continues until he finally starts to come. You feel a profound joy and perverted satisfaction when the jets of hot, virile semen start to expel in your mouth, filling you with a warm and difficult to describe feeling. You happily receive each jet, taking care that no precious drops are wasted and when it ends after several seconds, your lover is exhausted looking at you, who doesn't waste a second before savoring the precious manly liquid and swallowing it, temporarily sating your hunger for cum.`;
            }
            else if (ↂ.pc.kink.oral && rando()) {
              out += `You kneel submissively serving the <<name _t>> penis, feeling the texture and warmth emanating from it is a comfortable feeling in your mouth, and you love every second of it. Looking at your lover's face while you serve that penis, his expression is one of pure lust and occasional grunts of pleasure. You do your job expertly, milking every inch of the cock, grabbing it at the base and ensuring that no area is left without stimulation. Your focus is on the sensitive head though, allowing it to sink completely into your mouth you press the bulbous and soft head of his penis with your tongue, making <<name _t>> grunt intensely with barely contained pleasure, after a few movements just like the meaty stick starts to pulse quickly, the <<name _t>> breath increases and it starts to come quickly in your mouth. @@.mono;Hmm.... This is... *Jets of cum inside your mouth* Shit, this is tasty... I can get used to it.@@ You let yourself be controlled by your arousal and stay with the dick in your mouth until the end of the climax, so enjoying the exotic, salty and masculine taste, you swallow it all at once before your lover's eyes.`;
            }
            else if (ↂ.pc.kink.sizequeen && rando()) {
              if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                // Tiny cock lol
                out += `Staring at the <<name _t>> dick, you feel a deep disdain for that little meatystick in front of you. But you decide to finish what you started and grab it with your hand, allowing it to sink into your lips and feeling the masculine texture and taste of it, the intensely hormonal smell fills you, making you feel more and more aroused as you suck the <<name _t>> penis, it just makes you feel even more frustrated though, you know that little meatystick is unable to make you orgasm, or give you a decent fuck. Milking his dick with more and more intensity, you aim to end it quickly by making your lover come soon. You then keep it inside your mouth completely, massaging the most sensitive parts of the dick with your tongue and making it groan in pleasure with each movement, being in control of his pleasure is still hot, and it fills you with a feeling dominant. Your pussy starts to get wet and ask for a big dick to fuck when the dick inside your mouth pulsates quickly and intensely, starting an orgasm and ejaculating strongly. @@.mono;Finally...@@ You breathe more intensely with the barely contained aroma until <<name _t>> finishes emptying his balls in your mouth, and then letting his penis drain out. As a last effort, you swallow his cum, feeling the hot, sticky substance fill your stomach.`;
              } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                // Acceptable...
                out += `You kneel in front of the <<name _t>> cock, quickly analyzing this, it is just a medium sized penis, it is satisfactory although only satisfactory. @@.mono;Well, it's better than a small dick...@@ You are satisfied, knowing that a dick like that can give you some decent pleasure. By biting your lower lip, you let it sink into your mouth and let your arousal speak for itself, milking intensely the erect dick from the start. Your movements are intense, letting the cock enter your mouth almost completely, and applying internal pressure against the <<name _t>> meatystick. Holding it in your mouth, you can taste the masculine, salty and warm taste. He grunts in pleasure for several minutes as you continue in complete control of your lover's pleasure, it makes you feel naughty and hot, further increasing your desire to be fucked. You have fun with it, but after some time you feel the pulse of the penis intensify, the stick hardens even more in your mouth and in a few seconds it starts to ejaculate, filling the empty space with hot semen, fresh from the balls. <<name _t>>. Without taking the dick out of your mouth, you accept and keep every drop of semen, feeling the almost indescribable and masculine texture in your mouth, just letting the stick slip out when he has just come, then swallowing the liquid. *Swallows*`;
              } else {
                // Magnificent!
                out += `Kneeling before <<name _t>> you grab his huge erect cock, you slowly start to suck the tasty fleshy cock. The taste and texture are what you like, it is salty, warm and soft. Your movements start smoothly and you can see in your lover's expression that he is enjoying it, but the sexual tension settles in you and in a few minutes your movements become more and more intense. You quickly break the perverted caress to comment. @@.pc; Hmm... Heh, I can't wait to feel it inside me! I hope you know how to fuck a girl properly...@@ He grunts as you intensify your movements, milking his erect cock hard. In and out, you massage the base of the penis with both hands, letting it sink for a few seconds, pressing the head of the penis with your tongue and, after a few moments, letting it out and repeating the movement. At some point, the pulsations and heat emanating from the <<name _t>> penis increase rapidly, you can feel each vein pulsing. @@.mono; He will cum... Okay, let's feel it! I hope at least his fucking is- Hmm!@@ He starts to come in your mouth, breaking your thoughts with the hot fuck invading you. The jets sneeze intensely, the first goes down your throat, while you use your tongue to trap others, savoring it. Subsequent jets fill your mouth with sperm before it weakens and runs out, leaving <<name _t>> breathless and tired. Your mouth is full of sticky substance, the sensation is warm and satisfying, although you watch your semi-erect cock and continue to disapprove of it before swallowing the semen. *Swallows* The manly seed quenches your thirst for now.`;
              }
            }
            else {
              out += [
                "@@.mono;God I love this@@ you think to yourself as you let your mouth fill with <<name _t>>'s <<w 'cum.n'>> before the flood forces you to swallow. You hold <<his>> <<n _t 'cocksize.q'>> <<n _t 'cock.n'>> in your mouth until <<he>> finishes, savoring the flavor of fresh cum. When <<his>> orgasm has tapered off you spend a few extra moments milking his <<n _t 'cock.n'>> of any extra cum that didn't make it into your mouth. Even after <<he>> pulls back some time later, you spend several moments distractedly enjoying your treat before finally swallowing it all. ",
                "You grab the base of the <<name _t>> hard cock with your hands and keep sucking it while he exhales the jets of hot cum vigorously out. This is fucking good ... Damn it, I couldn't live without it! You delight in the taste and texture of the hot cum while <<name _t>> just moans in pleasure while you keep milking his cock. You swallow every drop without missing any of the precious liquid that, at that moment, is one of the only things that can satisfy your thirst. ",
                "<<name _t>> starts to come, you then grab his erect cock and, squeezing it firmly, you suck hard until you start to feel the jets being released and filling your mouth with the precious liquid. You just keep milking the climaxing penis, drinking and enjoying every jet and every drop it releases, <<name _t>> moans at the intensity of the blowjob you're giving, but that's just an instinctive move for you to finally kill yours voracious thirst for cum. I couldn't live without this shit, that's... So fucking good!@@ "
              ].random();
            }

            setup.drug.eatDrug("cum", random(10, 15));
          }
          else {
            if (ↂ.pc.kink.shame && rando()) {
              out += `You gently and timidly grab the <<name _t>> cock when you feel it start to pulse more and more intensely, the <<name _t>> breath becomes heavy and you know he is going to come. You start to feel the bursts of hot and thick cum filling your mouth, the taste is smooth and it starts to please you, intensifying your arousal, you quickly start to give up the shame to grab the climaxing cock with your two hands and milking this with your mouth, sucking it intensely. Soon the shy girl is turned into a small bitch in heat, thirsty for cum. @@.mono;Fuck, I like that! The taste of cum is so good... I want it all!@@`;
            }
            else if (ↂ.pc.kink.rape && rando()) {
              out += `You start to be controlled by your arousal and grab the base of the <<name _t>> cock, happily sucking on the pulsating and hot penis when it starts to come. You are taken by surprise for a second, but when you taste the hot, dense substance starting to flow freely in your mouth you are quickly taken over by it. @@.mono;Hmm... Okay, this thing is delicious. I can really get used to it. Hehe@@ You swallow every drop and receive every burst of his manly semen with a feeling of satisfaction, although your abuser started it in a non-compliant way, you were finally broken into a cum-hungry bitch in heat.`;
            }
            else if (ↂ.pc.kink.slut && rando()) {
              out += `<<name _t>> grab your head and sink his cock in your mouth when then he starts to come, you open your eyes wide when his act surprises you, but that is welcome though. You taste his fresh and hot cum, each burst fills your mouth more and more, then you swallow it with great satisfaction while <<name _t>> uses you as a small bucket of personal cum. @@.mono;I shouldn't let this asshole use me like that... But it feels so good! Shit, I like that.@@ You cannot resist the fresh semen filling your mouth and surrender to the feeling of satisfaction and the perverted taste.`;
            }
            else if (ↂ.pc.kink.oral && rando()) {
              out += `As you suck the cock in front of you, mixed feelings burn inside you. You love doing it, the texture, taste and warmth emanating from the <<name _t>> meaty stick is just the best thing you could do for fun. His expression is one of pure pleasure when you repeat your movements. In and out, you grab the base of his dick and allow it to sink to the depths of your mouth, and then you do your art, pressing the most sensitive points of the dick with your tongue and delighting yourself when <<name _t>> grunt in pleasure, his face contorts with pleasure while you enjoy the salty and masculine texture and taste. The smell of sex fills you, warming your pussy and leaving you in the perfect mood to be fucked, but not until you have finished having fun with your lover. You let his penis slide out, giving him a rough laugh before again aligning the pulsating meaty stick on your lips and feeling it sink, starting the perverted cycle again. After several moments the <<name _t>> resistance reaches its limit, his body pulsates more intensely and his dick heats up and vibrates in your mouth, his cum starts to flow in fast and intense jets. You receive all his male coal in your mouth with great pleasure, savoring the tasty texture while he grunts loudly in pleasure, touching your head. You can't hold a laugh while watching his reaction, but it ends after a few jets, leaving <<name _t>> exhausted. You allow the cock to slip out, while giving your lover an innocent look and swallowing his semen.`;
            }
            else if (ↂ.pc.kink.sizequeen && rando()) {
              if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                // Tiny cock lol
                out += `You stare at the <<name _t>> small penis for a few seconds, wondering if you want to continue with this. Deciding it's the quickest way out, you grab it by the base and let the tiny meatystick sink into your lips, applying pressure from the start and milking your lover's penis hard, in order to get it over with quickly. Sucking intensely every inch of his cock, quickly his grunts of pleasure take over the room, the masculine scent exhaling from his body makes you feel more aroused by the minute, but more and more frustrated to know that this penis is unable to satisfy, and all your energy in serving it will be in vain. By pressing each most sensitive point on the penis with your tongue, you can quickly make <<name _t>> start to come inside your mouth, although you are especially frustrated by the whole situation, and then you let the cock slip into out, spreading part of his seed across your breasts on your face. @@.pc;Hmm... Shit, did you need to dirty me like that!?@@ You declare, in a frustrated tone. Your bad mood is justified, <<name _t>> was the only one who got pleasure so far and now you are covered in semen, knowing that this little dick can never satisfy you properly.`;
              } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                // Acceptable...
                out += `You apply more force while still milking the <<name _t>> cock, the masculine and salty taste is exactly what you like, in addition to being in control of your lover's pleasure by listening to his pleasure grunts in each one of your movements. You laugh to yourself when you let it sink completely into your mouth, then using your tongue to play with the hot, pulsating meatystick. Letting your tall arousal speak louder, you suck every inch of your lover's median penis by applying maximum pressure at each point, his pleasure is evident in the distorted expression on his face, especially when you press the cock head with the your language. After a few minutes of repeating these movements he reaches the climax, and with a strong growl of pleasure he begins to come inside your mouth, filling the empty space with hot cum. You close your eyes and let out a groan feeling him empty his balls in your mouth, the indescribable and masculine taste is satisfactory, although exotic, but it is welcome for you. After a few long moments he finishes coming, feeling that his dick is now semi-erect, you let it slip out of your mouth, swallowing the semen at the end, before the eyes of <<name _t>>, who smiles at you.`;
              } else {
                // Magnificent!
                out += `You kneel down sucking <<name _t>>'s dick, knowing he's enjoying it makes you feel some satisfaction. @@.pc;This is so... fucking big. Shit, I want to feel it INSIDE ME!@@ Frustration takes over you. Although you soon serve him again, your hunger for sex becomes more and more intense, it makes you more aroused and putting more strength in milking your lover's penis, soon you notice his distorted face of pleasure above you. @@.mono; Hmm... Come on, come on! I want to feel this cum in my mouth...@@ You apply more and more intensity, feeling your pussy warm and your clit vibrating with the arousal, your body is getting ready for the fuck. As the smell of sex takes over your body, your pussy gets more and more lubricated, moistening quickly, then your feminine liquid begins to drain. He grabs your hair and forces your cock as deep as possible, surprising you and placing it in your throat. Uhh! What it is- He then starts to come, in a few seconds his pulsations reach the maximum, his cock is hard as iron and the bursts of semen invade your interior, filling your stomach with the masculine substance. You open your eyes wide, but accept until the end.`;
              }
            }
            else {
              out += [
                "You begin to swallow it almost immediately to keep up with the torrent of hot <<w 'cum.n'>> spraying into your mouth. @@.mono;This is pretty good... I could definitely get used to it.@@ Eventually <<his>> orgasm finishes, and you give <<his>> <<n _t 'cock.n'>> a final suck to clean <<him>> off.",
                "<<name _t>> start to come and you keep it in your mouth, your arousal is in control and you are acting like a bitch in heat. You swallow the thick cum of name _t>> enjoying every drop, the intense flavor quickly fills you. @@.mono;This... It's nice, I can really get used to it.@@",
                "<<name _t>> achieve his climax, quickly starting to release the hot bursts of semen in your mouth, you are taken aback though but quickly you start to like it. Hmm ... This is nice, I really don't mind swallowing it. Hehe You start to feel more and more dirty, like a bitch in heat you allow the climaxing cock to fill your mouth with hot semen and start to swallow it, savoring every drop."
              ].random();
            }

            setup.drug.eatDrug("cum", 10);
          }
        }
        else {
          out += "That brief warning was all you got before <<he>> started spraying <<n _t 'cum.n'>> onto your face. ";

          if (ↂ.pc.status.addict.cum >= 30 || ↂ.pc.kink.cumSlut) {
            if (ↂ.pc.kink.shame && rando()) {
              out += `The shy little girl inside you disappears when you realize that <<name _t>> released his cum on your face, a lot of it now also runs down his penis making you dissatisfied and angry. @@.pc;Shit, this should be in my mouth, you can't do anything right!?@@ You grab his cock tightly and start licking and sucking every inch, making him moan as you collect the precious cum. When you end up still feeling dissatisfied, you try to take what is on your face to end your intense thirst for semen. `;
            }
            else if (ↂ.pc.kink.rape && rando()) {
              out += `You look at the cum flowing freely down the <<name _t>> cock, although it started out as an abusive relationship, you are possessed by your arousal and feel frustrated and irritated by that precious semen being wasted out of your mouth. You grab the penis trying to prevent more of the precious white liquid from being wasted and start sucking every inch of it, from the head to the base, in an attempt to drink as much semen as possible and quench your huge thirst for sperm. @@.mono;This fucking asshole... He can't even get it right!@@ `;
            }
            else if (ↂ.pc.kink.slut && rando()) {
              out += `You feel infuriated when you realize that all the cum of <<name _t>> is wasted and now drips out of your mouth. Without saying anything you grab his cock and start licking every inch trying to collect what you can rescue from the precious liquid. You suck hard on the head of his penis at the end, drinking a little warm white ambrosia to try to quench your huge thirst. Realizing that this is still on your face you decide to play with it a little more, passing your index finger over your face and then bringing the cum into your mouth, you throw an angry look at <<name _t>>. `;
            }
            else if (ↂ.pc.kink.sizequeen && rando()) {
              if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                // Tiny cock lol
                out += `<<name _t>> let the jets of sperm run down your face, you open your mouth and let the precious liquid come out of his cock. His cum starts to fill your mouth, the taste and texture of the semen is the only thing that could quench your thirst now. @@.mono;Hmm... This is what I wanted! Even if this fucked-up dick is tiny, shit... Whatever...@@ You decide to ignore the thoughts about the size of <<name _t>> while occupying your mind with the taste of the viscous liquid in your mouth. When he finishes coming you can see the fatigue on his face, but you ignore him to swallow all the sperm you managed to capture. @@.pc;This is a fucking TASTY! Heh *Swallows*@@ Part of it escaped and covers her face and breasts. You try to recover that, considering that the male essence is too precious to be wasted.`;
              } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                // Acceptable...
                out += `When <<name _t>> starts to come towards your face, you act in quick reflexes and make a small jump towards the climaxing cock, grabbing the base of it and sucking the head of the penis. In a second, your mouth starts to be flooded with the nutritious and sticky substance. @@.mono;Hmm... This is what I was hoping for... Finally!@@ You feel your mouth fill with the semen of <<name _t>>, savoring every little drop, and every second of masculine and difficult taste in words of your lover's precious liquid. He grunts furiously as you milk his dick for several seconds, ensuring that no streams are wasted. At the end you release the semi-erect dick after climax, and spend a few seconds savoring the wonderful taste before letting it run down your throat, swallowing it, and finally quenching your thirst, for now.`;
              } else {
                // Magnificent!
                out += `When you realize that <<name _t>> is about to start coming, you immediately jump towards the climaxing dick in front of you, grabbing it with both hands and quickly opening your mouth so that the precious substance is not lost. @@.mono;That dick is huge like- Ugh... that cum is MINE!@@ The first jet comes out, along with your lover's grunts of pleasure, as you finish your thoughts. Stimulated by his huge dick, you concentrate on sipping the precious liquid that now comes out in hot, intense bursts directly to your mouth. Jet after jet, the empty space is filled with semen until <<name _t>> finally ends the climax. @@.pc;This is delicious... I needed it like hell.@@ You close your eyes for a few seconds, just feeling the masculine, slimy taste of the male substance before you swallow it, temporarily quenching your thirst.`;
              }
            }
            else {
              out += [
                "@@.mono;Damn! that belongs in my mouth!@@ You quickly suck <<his>> cockhead into your mouth so you can catch the rest of the hot ambrosia on your tongue. When <<his>> orgasm finally finds down you spend several seconds milking the rest of the <<w 'cum.n'>> from <<his>> <<n _t 'cock.n'>>. Finished with that load, you slowly start scooping up the cooling cum from your face so you can enjoy that too. ",
                "When <<name _t>> starts to come spreading his hot cum all over your face, you quickly feel angry about it. @@.pc;No... This is not the right place for that precious cum.@@ You then start to lick the cock's head, collecting every small amount and drop of its semen spread over each part of the semi-erect penis. When you finish collecting all the precious white liquid from the penis, you use your fingers to take what you can get from his cum on your face, then also swallowing it. ",
                "Frustration takes over you when <<name _t>> lets his cum gush on your face, deciding that this is a big waste you start to lick every inch of the semi-erect penis in front of you. Grr ... He did shit. Damn, this should all be in my mouth! You ponder, feeling irritated by having to collect the precious cum along the skin of his penis, and then you take what is spread on your face in an attempt to satisfy your intense thirst for cum. "
              ].random();
            }

            setup.drug.eatDrug("cum", 10);
          }
          else {
            if (ↂ.pc.kink.shame && rando()) {
              out += `You hover in front of the <<name _t>> upright penis, watching it finish spouting the last jets of hot semen as you blush intensely. You let <<name _t>> end his orgasm, feeling it run through your hands and down your face makes you feel especially shy and submissive. `;
            }
            else if (ↂ.pc.kink.rape && rando()) {
              out += `Quickly the <<name _t>> penis erupts and releases all the manly charge of it under your face, you openly receive all the bursts of hot white liquid on your face. When this is over you can feel it everywhere, in your hands, face and dripping down your lips. But at least you are saved from a creampie and an insemination from an abuser. `;
            }
            else if (ↂ.pc.kink.slut && rando()) {
              out += `You watch the <<name _t>> cock finish, when the last jets of hot seed splash on your face you look at the mess he made, covering your hands and your face with his seed. @@.pc;Shit, you could have made less of a mess, right? You spread all your shit on me!@@ `;
            }
            else if (ↂ.pc.kink.sizequeen && rando()) {
              if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                // Tiny cock lol
                out += `<<name _t>> sperm splashes on your face, the sticky substance takes some time to run down your skin until it drips onto your breasts. You smell the intense, masculine smell of it filling you, jet after jet, until it empties its balls at you. The smell makes you tense and excited, but you turn to the <<name _t>> cock, semi-erect, and give a disapproving look again. @@.pc; Yes... Maybe I need to find a bigger man next time.@@ You can't resist touching your sperm and tasting it, tasting it salty and hard to describe. @@.npc; You, bitch nymphs, just think about fucking horses, they only serve to be fucked!@@ He throws at you, clearly furious with your statement.`;
              } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                // Acceptable...
                out += `You feel the tension emanating from the body and the pleasure grunts of <<name _t>> when he starts to ejaculate, allowing his cum to start covering your skin. The hot substance bounces on your breasts, drips down your nipples and then to the rest of your lower parts quickly, after a few seconds, it releases the last jet on your face before the cock starts to become more flexible, entering the semi-state upright. Heh, that was fun, you know ... You look at the flaccid penis, giving the meatystick a smile, you notice a little bit of cum left over it and you take the dense liquid with your index finger, taking it to your mouth and tasting the semen.`;
              } else {
                // Magnificent!
                out += `<<name _t>> grunt tightly as he strokes his huge dick towards you, you face the penis climaxing and soon you start to receive the hot jets under your skin. The substance quickly covers you, jet after jet, <<name _t>> deflates his balls. The intense smell quickly fills you, it is a difficult aroma to describe, but it increases your arousal. Quickly, the overload of cum seeps through your breasts, covering your nipples, passing through your belly and the lower parts of your body. @@.mono;He was very frustrated...@@ You bite your lower lip, watching your dick go limp after the climax. Feeling especially mischievous, you end up reaching for the soft meatystick and licking it off, savoring the remnants of cum.`;
              }
            }
            else {
              out += [
                "You let <<him>> finish, already mentally complaining about having to clean up the mess.",
                "You decide to let him end it, feeling every burst of his semen against your face until his balls are finally empty and the babymaking liquid flows freely down your face and hands.",
                "You let <<name _t>> finish his orgasm, when all his balls are finally empty you can see it dripping down the semi-erect cock, and then feeling it down your face."
              ].random();
            }
          }
        }
      }
      else if (cat === "sex") {
        if (!anal) {
          switch (risk) {
            case "condom broke":
              if (ↂ.pc.kink.shame && rando()) {
                out += `You realize what has just happened and, looking at it and blushing a lot, you bite your lower lip feeling a great mixture of feelings, worry, fear, maternal affection and a still poorly contained arousal caused by everything that is happening right now. @@.pc;H-Hey, I think... This condom made a big mess inside me, n-I don't know what to think...@@`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `You feel your lover's warm, dense, manly semen spreading deep into your vagina, the feeling of being creampied so deeply is always wonderful and you really appreciate it, even if it shouldn't happen. After a few seconds you smile at your partner, feeling a great maternal affection for the expectation of getting pregnant, he returns a smile that is tired but still full of lust, as if he was gathering more energy to fuck you again. @@.pc;Hehe, I think that was a surprise, but it feels so good... I never get tired of it. I hope your swimmers are successful.@@`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `<<name _t>>'s hot seed quickly spreads through your most intimate and deep depths, you feel the warmth and dense texture of his white and manly cream inside you. Your mind is quickly filled with thoughts of a possible pregnancy, getting pregnant from an abuser would certainly not be something especially pleasant but despite this you feel your maternal instinct being activated by your pleasure, causing an emotional battle within you, a mixture of fear and worry, and then high maternal and arousal affection. You say nothing and just look away from his eyes, trying to banish the dark thoughts from your mind.`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `You feel his hot seed spreading through your depths, immediately you feel a growing arousal burning inside you. The prospect of getting pregnant by this cock makes you feel a powerful mix of feelings, the worry is constant, but the pleasure is above that. You bite your lower lip while your mind is filled with thoughts of pregnancy, while you savor your ambiguous feelings. @@.pc;Hah... I think you made a nice mess down there, what if I get pregnant?@@`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `You quickly realize what happened, feeling his seed spreading across your most intimate and fertile depths. You feel a deep rage and give your lover a furious look before you start cursing him a lot. @@.pc;You piece of shit, you had to be careful with that fucking thing! Look what you did, if I get pregnant I will make sure that you take responsibility for it!@@`;
              }
              else {
                out += [
                  "With one final thrust <<he>> hilts <<him>>self deep inside you and begins to spray <<his>> load of <<w 'cum.n'>> into <<his>> condom. More than a minute later, <<he>> finally pulls out of your <<p 'pussy.q'>> <<p 'pussy.n'>>. You can see the condom bulging with seed as <<he>> moves away; as soon as <<he>> starts to pull it off, however, it ruptures making a mess. ",
                  "<<name _t>> gather his last strength in that final moment, he thrust against your tight pussy as intensely as he can. You can feel his heavy breathing and the fast pulse of his body the moment his climax approaches, when it finally begins you feel his tight embrace around your body, and then his penis, pulsing frantically, begins to pour his manly load inside you into the condom he’s wearing. After several seconds of some pleasure, you feel him release you and start to release his penis out, then he pulls on the condom that quickly bursts thanks to the large amount of thick semen inside it, spreading through your depths. ",
                  "<<name _t>> keep thrusting against your little pussy, now not so tight, it shows no signs of stopping but accelerates. You hear the heavy sound of his breathing, getting stronger and stronger, the pulsations of his penis increase as his climax approaches and after a few seconds, you let out an intense groan when he grabs your hips and sinks his cock in your depths, releasing his white, hot and virile load inside you and filling the condom with it, you quickly feel it inflate by pressing lightly on your vaginal walls, the heat emanates from it making you feel some pleasure only overshadowed by the latex of the condom. "
                ].random();
              }

              break;
            case "condom broke and came inside":
              if (ↂ.pc.kink.shame && rando()) {
                out += `You feel the <<name _t>> arms around you as his thrusts increase, the heat emanates from his body more and more strongly as his climax approaches, you can feel his heavy breathing while you just groan and blush looking at your lover when he gives you one last thrust, grabbing your body, and finally releasing his white, manly charge inside you. You groan with the warm feeling as he inflates the condom with his semen, you feel it swell more and more and presume you are safe from it, when you then feel the dense and sticky substance quickly cover the depths of your vagina. @@.pc;Shit... That really happened, the condom broke...@@`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `<<name _t>> hugs you while he increases the pace of his thrusts, he is at the deepest point and beats against your cervix, with each attack you feel an intense pleasure crossing your body. Then he gathers the last strength and a last thrust, striking your deepest point and releasing his manly cum in a condom, the only barrier that protects your helpless uterus from his manly seed. You feel a growing warmth as you feel it swell inside of you, but soon you feel his cum quickly spread into your depths, even entering your fertile womb and biting your lower lip feeling a mixture of deep and arousal maternal desire that now it burns intensely within you, you surround your lover for a few moments feeling it happen. Soon you feel his penis come out of you, semi-erect and the broken condom oozes out afterwards.`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `<<name _t>> keeps you safe surrounded by his arms, almost as if he wants to restrict your movements. You feel instinctively more and more aroused with every powerful thrust he gives into your tight pussy, moaning as you feel his heavy breath against your skin. Soon he reaches climax, grabbing your hips and pressing his cock as deeply as possible inside of you, pressing hard on your cervix and releasing his manly against the latex condom, stretching it out with each jet. You think you are safe against pregnancy when you soon feel his semen spread through your vaginal looks, entering your uterus. You can't really do anything, but just groan looking into his eyes. @@.pc;You... Hmm! That condom broke, I feel your cum inside me, please... Aahhhh... Take your cock now!@@ He then removes his penis while throwing you a satisfied smile, you can see, the condom broke and you have just been inseminated.`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `You relax your body leaving the job to <<name _t>>, it continues thrusting against your tight pussy, making you moan every time his penis head kisses your cervix. You feel his rhythm increase and intensify along with his breathing, then he reaches the climax, grabbing your hips and sinking his penis in your most intimate and deepest point before releasing his white and manly load against the condom, the only protection of your fertile and unprotected womb. You bite your lower lip with your poorly contained arousal, fantasizing about the risky situation, almost hoping that the condom will break, when you feel the hot, sticky and manly substance filling your uterus you realize that your fantasy has come true. You groan as he finishes the insemination, now that the condom is broken you are possibly going to get pregnant from it. @@.pc;You... You broke that condom, you better get your cock out of me now, please?@@ After a few seconds, he takes the semi-erect penis out of you, then the condom is completely broken.`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `<<name _t>> grab your butt and, with faster and more intense thrusts, get ready to cum when he grabs your hips and sinks his cock in your depths with all the strength he has before he starts to cum furiously inflating the condom. You bite your lower lip in satisfaction at being safe from it, but it dissolves in seconds when you feel his cum fill your insides, the manly substance fills your vagina quickly and you soon realize what happened. @@.pc;Hey! Not! The condom broke, shit! Get that shitty penis out of me NOW! Asshole!@@`;
              }
              else {
                out += [
                  `<<name _t>> grab your hips and give a powerful boost at the end, on his last thrust, and soon you feel the condom inflating inside you, filling with his cum. It quickly grows and you think you are safe from it when you soon feel the thick, sticky substance spreading through your uterus quickly, it takes you a few seconds to understand what happened. @@.pc;Shit... That fucking condom broke inside ME!@@ He looks at you, giving a satisfied smile before taking his penis with a condom, the latex object is in tatters and his cum is free in your depths.`,
                  `With one final thrust <<he>> hilts <<him>>self deep inside you and sprays <<his>> load of <<w 'cum.n'>> into <<his>> condom. At least, that's what you thought happened, but you soon notice a distinct wet heat near your <<p 'womb.n'>>. @@.pc;Oh fuck, I think the condom broke.@@ It takes <<name _t>> a few more moments to register your words before <<he>> finally pulls out. When <<he>> does, you see that the condom is a tattered mess.`,
                  `You feel the heavy breathing of <<name _t>>, when he gives one last impulse to reach the deepest point of your vagina, you immediately feel his final grunt of pleasure accompanied by climax. The condom starts to inflate inside you, you can feel it filling with his manly cum and you think you are safe, although soon you feel the highly hot, manly and dense substance painting your inner walls, spreading through your uterus. @@.pc;Oh no, no no no... That condom broke! You're cumming inside me!@@ You can't do anything else, after a few seconds he pulls his cock, semi-erect, out of you and pulls out the broken condom right after.`
                ].random();
              }

              break;
            case "came inside":
              if (ↂ.pc.kink.shame && rando()) {
                out += `You feel the heat and the heavy breath of <<name _t>> against your body, sweat begins to cover his skin more and more with each thrust against your tight pussy. You just look at him blushing fiercely as he continues to fuck you, you just give full access to your body and get submissively fucked while moaning like a bitch in heat. Soon he reaches his climax, grabbing your butt and pressing his penis against your cervix, then splashing his manly seed into your most intimate and unprotected depths, ready to look for your egg and impregnate you. You let out a shy moan when you feel his hot jets of semen filling your depths, but do nothing but allow it submissively, letting him do his job and inseminate you as he should, when he finishes after several seconds you feel he pulls the semi-upright cock out, a part of the cum comes out but a good part remains inside.`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `You just moan with pleasure while <<name _t>> fucks you relentlessly, in each thrust you feel the strokes of his cock against your depths, the tip of the penis kissing your cervix makes you feel a strong desire to be creampied, which activates your maternal instinct and makes you want to get pregnant with all your strength. You feel his pulse getting more intense together with the wheezing, he then grabs your hips and, with a unique and powerful impulse, he starts to come deep inside you, certainly aiming at your cervix. Each burst of hot semen makes you horny, your vagina twitches around your lover's climaxing cock and you can then feel the pleasure travel through your body as he deposits his sperm in your womb, you then moan in joy and pleasure at the prospect of finally being impregnated. @@.pc;Give me everything you have! Get me pregnant please! I really wanted this... Aahhh! Do it!@@ You encourage him, after a few seconds the furious orgasm ends and you release his penis from your vagina, allowing it to come out with a part of the semen, most of which, however, remains in your depths.`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `<<name _t>> keep his rhythm fucking your little pussy, at some point you can feel his rhythm become unsteady and quickly increase, the pressure he puts on each thrust presses his penis more and more intensely against yours cervix, his breathing reaches a great intensity when he starts to cum furiously inside you. You just moan as he releases the hot bursts of thick cum in your depths, painting your vaginal walls with manly white, so you can feel it even inside your uterus as a little trickles out. @@.pc;Aahhhh... That's- Hmm... It's the best part!@@ You groan as you declare your satisfaction in being creampied, when he takes the cock out of you, semi-erect, you can feel the warm semen still within your depths.`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `With a greater and greater rhythm, you feel the breath of <<name _t>> intensify along with the pulsations of his body. You feel the most intense thrusts until, with one last and powerful thrust, he sinks his penis in your depths and releases his semen against your unprotected cervix. Hmm! Aahhh ... This is always- Hmm ... The best part of this fucking thing! Hah You totally accept the creampie, feeling it warming you and spreading through your depths, you feel a powerful mixture of arousal and concern about the risk of becoming pregnant.`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `<<name _t>> keep thrusting more and more fiercely against your slutty pussy, you just let him fuck you while you moan, pleased to finally be fucked and filled with a big, hot cock. When he reaches climax, you feel his heavy breath against your skin before he grabs your butt and sinks his penis against your depths, releasing gust after gust of hot, virile semeen into your unprotected vagina, filling you with sticky white, you soon feel it entering your womb, warming your insides and making you feel a deep satisfaction. @@.pc;Hmm... That, dear. Just cum inside me, give it to me! Give me everything you have! I need this so much... Aahhh...!@@ After a few intense seconds he just inseminates you and, panting, he pulls his penis out of your depths just leaving his swimmers to look for your egg.`;
              }
              else if (ↂ.pc.kink.cumSlut && rando()) {
                out += `<<name _t>> stay thrusting against your pussy, in and out, you just moan like a bitch in heat feeling your lover's thrustd. Soon you feel the pulsations of his body becoming more intense, his breathing becomes heavy and he grabs your hips, sinking his erect dick into your depths, at that point you know he is going to creampie you. There is nothing you can do, just look into his eyes with an innocent look as you feel his penis pulse intensely, feeling every vein of it against your vaginal walls, until he starts ejaculating after a few seconds. @@.pc;Ooohhhh! Aahhh... *Panting* Both breathe heavily, the obscene sound of sex takes over the room and the animalistic grunts of pleasure are the dominant sound in the middle of orgasm. The jets of dense semen hit your cervix repeatedly, filling you to the limit. Several moments later both are tired and the muscles in your body are tense, it then lets the flabby dick drain out of you, bringing a small amount of semen together. @@.npc;That was... *panting* Fucking good.@@ I loved that little pussy! You just look at his dick, realizing that there is still semen there, you kneel down and try to rescue the remnants of the precious liquid to quench your thirst. Although most of that is in your depths, now oozing out, you are still hungry for cum.`;
              }
              else if (ↂ.pc.kink.sizequeen && rando()) {
                if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                  // Tiny cock lol
                  out += `You thrust your hips against the <<name _t>> dick while he fucks you, your movements are merely instinctive and express your poorly contained arousal and the dissatisfaction and frustration that burn within you. @@.mono;Shit... This dick is so small... I can barely feel it! Why did I leave this guy... Fuck me!?@@ You avoid looking at the tiny meeatystick entering and leaving your vagina, you are hardly able to feel enough pleasure to let out a moan, but <<name _t>> doesn't seem to be paying attention to it and fucks you without thinking about anything else. He grunts in pleasure, obtaining great satisfaction with your wet love hole, after a few minutes in that boring fuck, he grabs your buttocks and sinks the little cock inside you, without reaching your cervix, and starts to come in yours vaginal canal. You can feel the warmth of the substance inside you, it generates a small touch of satisfaction in each jet, probably the maximum pleasure you can get from the fuck. The distorted expression on his face expresses the pleasure of creampie you, when the orgasm is over, his body is rigid and he still grabs your butt for a few seconds before letting his penis, semi-erect, slip out of your pussy bringing a wave of cum out.`;
                } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                  // Acceptable...
                  out += `<<name _t>> grab your butt to fuck you better, forcing his medium cock deeper into your depths, you feel it stretching you to some level, and pressing against your sensitive and unprotected cervix. @@.pc;Oohhh... Aaahhh! This is the best fuck- Hmm! Part!@@ You declare, feeling your instincts being satisfied, although not entirely, the average <<name _t>> cock doesn't stretch as far as your perverted desire desires, although that is still a decent fuck. Each thrust increases the heat, the two bodies intertwine to facilitate mating, at a certain point it reaches his climax, reaching the height of tension and arousal. <<name _t>> grunts louder when he keeps his penis in your depths, getting the pleasure of feeling your pussy squeezing the pulsating meatystick when it starts to climax, releasing hot, manly jets directly into your cervix. The sensation for you is like an electric wave of pleasure, in each jet, you feel your reasonably stretched depths invaded by the masculine substance of <<name _t>>. @@.pc;Ooohhh... Yeah! Give me- Aahhhh! Give me everything you have!@@ You just enjoy the pleasure of being creampied, after several seconds the climax ends, only leaving the body of <<name _t>> tense and tired, but still connected to you.`;
                } else {
                  // Magnificent!
                  out += `<<name _t>> keeps fucking you, while grabbing your hips, he pushes repeatedly against your dirty pussy. You groan like a bitch in heat, in this fuck your satisfaction can be complete since <<name _t>> has a large cock, capable of meeting your demands. The two of them fuck for several minutes until their body reaches the limit, and with a heavy breath he grabs your body, hugging you tightly before sinking your cock in your depths and starting to ejaculate immediately. @@.pc;Aaahhhh... That's- Oohhh... The best part of it!@@ You declare, satisfied with the feeling of hot seed spilling against your sensitive and unprotected cervix. The heat between the bodies increases rapidly with furious sexual intercourse, your skin is covered with sweat and both grunt with pleasure like two animals mating, filling the room with the obscene sounds of sex. It only ends after several delicious seconds, when you feel the slow movements of your tired body releasing your body and taking his penis, now semi-erect, from your well-fucked pussy.`;
                }
              }
              else {
                out += [
                  `With one final thrust <<he>> hilts <<him>>self deep inside you and begins to pump <<his>> ${either("fertile", "potent", "thick")} cum deep inside you. You can feel the hot liquid splashing against your ${either("cervix", "cervix", "<<w 'womb.n'>>")}<<has risky || pregnancy>>, the sensation sends waves of pleasure radiating out from your <<w 'womb.n'>> as you have a light orgasm.<<or>>, a sensation that feels oddly satisfying.<</has>> <<name _t>> stays buried inside you for over a minute before finally <<he>> finally pulls out.`,
                  `<<name _t>> he climaxes himself, gathering his strength and giving the last and strongest thrusts against your tight pussy soon you hear his growl of pleasure before he starts to come deep inside you. You feel the pressure of his penis against your cervix and then the hot jets being splashed against your most intimate and sensitive region, each jet is hot, thick and makes you groan in waves of rhythmic pleasure. @@.pc;Aahhh... Shit, this is- Hmmm! So good!@@ You surrender to the pleasure of being creampied and decide to ignore any risk of being impregnated to enjoy the intense pleasure of sex. After a few seconds he pulls his cock out of you, which can still feel the warm seed inside your womb as a small part comes out.`,
                ].random();
              }

              break;
            case "came inside PO":
              if (ↂ.pc.kink.shame && rando()) {
                out += `<<name _t>> increase his pace, thrusting against you more intensely and after a few seconds you feel his strong embrace against your body when he starts to cum inside you. You just groan looking at him shyly and after a few moments he pulls his cock out, still upright, and you can see the last bursts of cum coming out, most of it is inside of you. @@.npc;That was before what I wanted, I'm sorry. Do you have any cum inside you... Hehe@@`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `<<name _t>> breathes intensely, becoming breathless when his cum hits his body quickly and he finally releases his manly cum in your depths. For a few seconds you feel his hot jets in your most intimate and fertile depths, feeling a growing, warm and maternal feeling in the deep desire to get pregnant. He takes the penis out of you before he finishes though, so you can see the last sense jets splashed out of the cock. @@.npc;Y-Yeah... I think I came before what I was planning, this can be considered a creampie. Heh@@`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `<<name _t>> thrust more and more fiercely against your little pussy, you start to be taken by the sexual desire barely contained within you and the intensity of the fuck. You then feel him grab your hips and start to cum furiously in your depths, you just moan like a bitch in heat while you are creampied, but he quickly takes the penis out of you, still finishing to come. @@.npc;Uh... I came sooner than I should, that was bad... But you have a decent creampie in there.@@`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `<<name _t>> thrust more and more strongly into your pussy, with each impulse you fantasize about the situation, wishing for a big, raw creampie. Your maternal instinct speaks to the same extent as your concern and fear of becoming pregnant when, in one last impulse, he grabs your butt and starts to come, sinking his cock inside you. You groan intensely feeling each hot load coming out of his penis directly to your cervix, but before he finishes he pulls the penis out of you, who can see the thread of sexual liquids connecting your vagina to his penis head still erect. There is no need for words, he is heavily panting and you can feel much of his manly semen in your depths, if you wanted risky sex, you got it now.`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `<<name _t>> starts to dye his climax, he is heavily panting and with one last push against your tight pussy he starts to cum furiously inside you. @@.pc;Yeah... Cum inside me! Hmm... Hehe This is the best fucking part!@@ After a few seconds he pulls the penis out, however, still upright and you can see some semen coming out of it while you feel most of it in your depths though. @@.npc;Well, that was sooner than I wanted, but I think it was worth it, you have a pretty creampie there.@@`;
              }
              else if (ↂ.pc.kink.cumSlut && rando()) {
                out += `<<name _t>> hugs you tight when he feels his dick is about to erupt, you receive his hug with a groan of surprise before he presses the meaty stick into your depths and starts to come furiously, filling your interior unprotected with manly semen. You widen your eyes and let out a groan of pleasure when you feel the jets shooting into your depths, a few moments later he takes it away from you, although you still feel his hot, dense semen. @@.npc;Uh... That was good, but I couldn't take it and... Well, you have my seed inside you. Heh@@ You touch your pussy, feeling the semen seep out, and you can't resist taking it to your mouth feeling the taste of the precious masculine substance. You then look at the <<name _t>> semi-erect cock and surprise your lover when you kneel, licking every drop of it left on the flabby meaty stick. @@.pc;This fucking thing is great, I can't live without it!@@`;
              }
              else if (ↂ.pc.kink.sizequeen && rando()) {
                if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                  // Tiny cock lol
                  out += `<<name _t>> thrust against your wet pussy, with each blow the wet sound of thrust echoes through the room, along with his groan. Your sounds of pleasure are notably absent from the scene, since that little stick cannot make you feel real pleasure, satisfying your desires. You regret letting such a man fuck you, but since you started this, you only give your body full access so that it ends at once. The breaths get more intense every minute, he starts to thrust more quickly, without being able to reach your depths. Despite that he seems to be having fun with your body, after several minutes he engulfs your body in his arms, squeezes your breasts tightly and sinks his little cock in your vagina, starting to come and shoot the semen contained in his balls into your vaginal canal. @@.mono;This... Aahhh... He didn't even get it right...@@ You just feel some soft pleasure with the jets of cum being expelled against your vaginal walls. The sensation makes you more willing to be fucked for real, but you try to ignore it. When he finishes, he releases your body, looking pleased to see his cum seep out, almost completely.`;
                } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                  // Acceptable...
                  out += `<<name _t>> wrap his arms vigorously around your body before pressing his dick into your depths, you feel his heavy breath hitting your skin before his thrusts get more and more intense. His meatystick pulsates and vibrates quickly, you notice that he is almost coming. His thrusts make you moan, despite being a moderate dick, he manages to reach the most sensitive parts of your pussy. After a few more moments of tension, he grabs your hips and sinks it fully, pressing against your depths and moaning intensely before he starts to ejaculate. @@.pc;Aahhhh.... That's always the fuck- Ohhh! BEST PART!@@ You feel a pleasant euphoria running through your body in each jet of hot semen fired at your cervix, filling your depths and promoting a very decent insemination. The intense pleasure lasts until the end, after the last jet of cum, their bodies are tense and sweating when the semi-erect penis begins to slip out of your well-fucked pussy, leaving just a little cum to escape, but keeping most in your unprotected depths.`;
                } else {
                  // Magnificent!
                  out += `You feel a quick hug of <<name _t>>, he wraps his arms around you and squeezes tightly before pressing the stick against your wet pussy. You look at him, but before you can say anything, his dick starts to vibrate, getting hard as iron and then the hot bursts of dense semen start to expel in your depths, directly in your cervix. You open your mouth, but only a mixed groan of pleasure and surprise comes out as he holds you in his arms. Feeling a big and bulbous cock coming in your depths, fertilizing you properly, is an indescribable feeling that satisfies your most basic instincts. After a few seconds, he releases your body, freeing you from the embrace and letting his penis out of your depths, a torrent of sperm comes out of it. @@.npc; Uh, hah... That was good. His cunt is great! I hope you get pregnant with my baby, heh...@@`;
                }
              }
              else {
                out += [
                  `Thrusting even harder than before, you know <<he>> must be close. With another groan <<he>> pulls out of you in a rush, the final dregs of <<his>> orgasm dribbling out of <<his>> <<n _t 'cocksize.q'>> <<n _t 'cock.n'>>. You can tell that the rest of it was deposited inside you. @@.npc;Sorry about that, I came a little sooner than I expected...@@`,
                  `<<name _t>> quickly accelerates and in a few seconds you can feel his breathless and intense breathing against your skin, then you feel his hands firmly gripping your body when he, with a last and powerful thrust, sinks the penis of him in your depths and then begins to come furiously, releasing his manly load. You feel the heat emanating with the jets of dense, thick liquid, just moaning. @@.npc;Aahhh... That was, fucking good, you have a great quality pussy there.@@ He removes the penis, even before his orgasm ends, leaving a trail of cum and a trickle of sexual liquids connecting the head of his cock to your tight pussy.`,
                ].random();
              }

              break;
            case "safe":
              if (ↂ.pc.kink.shame && rando()) {
                out += `<<name _t>> starts to ejaculate furiously, but his white, manly liquid is totally wasted, you do nothing but maintain eye contact with him and blush furiously as he continues.`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `<<name _t>> starts to come, however much you were waiting for a manly creampie filling your most intimate and fertile depths, you feel heavily disappointed with your lover when he totally wastes his semen.`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `You are wrapped in the arms of <<name _t>> when he starts to come furiously, every blast of his semen is wasted away. You are relieved when you realize that it will not impregnate you.`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `You feel <<name _t>>'s hands against your skin holding you tightly, but when he' s starting to come he lets you go, you can see his semen totally wasted on every jizz. You feel partially disappointed since a part of you wants a big crempie.`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `<<name _t>> hits his climax quickly and starts releasing the bursts of cum, the white and dense substance however is totally wasted. Your perverted arousal was looking forward to a creampie though, you look at him in disappointment as he finishes.`;
              }
              else if (ↂ.pc.kink.cumSlut && rando()) {
                out += `<<name _t>> starts to come, although you know that this is totally wasted and will not get you pregnant, you feel a deep anger and frustration when you see his semen being wasted. The male essence was the only thing that could quench your wicked thirst for cum, you give him a look full of anger, but just look him in the eye in disappointment.`;
              }
              else if (ↂ.pc.kink.sizequeen && rando()) {
                if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 60) {
                  // Tiny cock lol
                  out += `<<name _t>> cums fiercely, the jets of semen come out with tremendous pressure and speed, although you know you're not really going to get pregnant. You look at the climax of the erect penis of <<name _t>> feeling a mixture of feelings, the strongest is the wish that it was a big, thick dick, but at least you feel some relief knowing that such a small penis does not will be the father of your baby. @@ mono; Maybe next time... I'll find someone with a decent dick.@@`;
                } else if (ↂ.sex.npc[ↂ.sex.target].body.cock.length < 90) {
                  // Acceptable...
                  out += `You feel the hug of <<name _t>> around your body, intense and strong, in the same way as his jets of cum being fired at your depths. His cock is average, he successfully hit your cervix and is doing a good job fertilizing you, and making you moan intensely. Although this is totally safe sex and you know you won't get pregnant, a little bit of sadness hits you though, maybe the intense creampie may have momentarily awakened your maternal and mating instinct, anyway, soon it finishes fertilizing you and let go of your body, allowing the semi-erect cock to slip out of your well-fucked pussy.`;
                } else {
                  // Magnificent!
                  out += `<<name _t>> grab your hips, using this as a base to thrust more quickly and reach a deeper point in your pussy. You don't look at your lover while he fucks you, frustrated and irritated by not getting real pleasure from sex, since his dick is tiny, especially for a woman with your demanding demands. In the expectation that he will soon cum, you feel a dose of joy when he grunts intensely, sinking his cock totally in your vagina and starts to furiously gorge, emptying his balls in the middle of your vaginal canal, even now he is unable to reach your deepest point. After a few seconds, he finally finishes his job, freeing your body from the tight embrace, and letting the cock slide out, bringing along a considerable torrent of semen that now runs down your thighs.`;
                }
              }
              else {
                out += [
                  "Immediately after, <<his>> <<n _t 'cock.n'>> starts spraying <<w cum.n>> pointlessly. @@.mono;Well, that wasn't what I was expecting to happen...@@",
                  `Soon and quickly, <<name _t>> starts to come, his semen is totally wasted and every jizz of eviril white liquid is lost, at least you are safe against unwanted insemination for now.`,
                ].random();
              }

              break;
            case "came in condom":
              if (ↂ.pc.kink.shame && rando()) {
                out += `You just moan while being fucked by <<name _t>>, then he is about to hit his climax and then, with one last powerful thrust, he sinks his cock inside of you before starting to fill every inch of the condom with his manly cum. You feel it swell up inside you before he pulls it out, showing all of his charge contained in the latex.`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `<<name _t>> thrust against your pussy more and more intensely, you can feel his heavy, hot breath against your skin when he starts to come furiously, filling the condom while sinking the hard penis into your depths. You feel disappointed when you feel his semen contained by a condom, instead of filling your fertile depths to impregnate you. When he takes it off, you can see all the semen contained in the latex and feel deeply disappointed. @@.mono;What a waste, really... This could be my baby.@@`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `<<name _t>> hold your hands, preventing your movements while he continues thrusting against your pussy more and more. The pulse of his body increases rapidly as he approaches the climax, when he finally starts to come you feel the condom expand rapidly, you just groan with the feeling of risk if it breaks, but it doesn't. When he takes off the condom you can see all the white, dense and manly content contained in the latex, preserving you from pregnancy.`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `<<name _t>> grabs your butt tightly as he increases thrusts, his pace gets more intense until he finally starts to cum inside you. You groan as he presses your cervix, ejaculating and filling the condom with his white and manly content, after a few seconds he takes out the cock, showing you the intact condom containing his semen and making you feel very disappointed by such waste. @@.mono;Shit... This is a shame, men today are shit.@@`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `You feel the coolness of <<name _t>> grasping your hips, giving more and more strength in each thrust, when he finally hits his climax and starts to come on the condom. You feel it swell inside you for several seconds before it pulls the semi-erect cock out, showing the condom filled with the white, manly substance.`;
              }
              else {
                out += [
                  "With one final thrust <<he>> hilts <<him>>self deep inside you and begins to spray <<his>> load of <<w 'cum.n'>> into <<his>> condom. More than a minute later, <<he>> finally pulls out of your <<p 'pussy.q'>> <<p 'pussy.n'>>. You can see the condom bulging with seed as <<he>> moves away. <<has 'risky||pregnancy||cumSlut'>>@@.mono;What a waste...@@<</has>>",
                  `<<name _t>> give one last thrust against your tight little pussy, gathering all his strength, and start coming right away starting to fill the condom in each jizz. You feel it swelling when he pulls his penis out, then you can see the swollen condom containing all of his manly cum, saving you from pregnancy.`,
                ].random();
              }

              break;
            case "pulled out":
              if (ↂ.pc.kink.shame && rando()) {
                out += `<<name _t>> increase the pace more and more, fucking your pussy as he approaches an orgasm, you are embarrassed and avoid looking into his eyes. When he phonically climaxes, he quickly pulls his cock out and you can see the jets of thick white liquid coming out, settling outside and avoiding insemination.`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `You groan intensely as <<name _t>> continues his work and fucks your wet pussy, you fantasize about being finally inseminated until, when he starts to come, he pulls his cock out and starts to splash white and manly liquid on your skin. You look at it, with a broken expectation and feel a deep sadness and disappointment. @@.mono;This... It's disappointing... What a fucking waste. What's wrong with men today?@@`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `<<name _t>> gradually increase the pace while fucking your wet pussy, despite everything you are feeling very aorused and almost wanting to be creampied. When he starts to come, he takes his penis out of you though, spreading the sticky, dense substance over your skin. You are mostly relieved not to be inseminated, but a small, wild part of you wanted to be creampied.`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `<<name _t>> fucks you without showing signs of tiredness, he increases the pace of thrust until he is almost cumming. You feel the heavy breathing and the intense pulsations of his body and look forward to a big creampie, however he takes his penis away an instant before he starts to come, totally wasting the white and manly liquid that now flows freely and settles down on your skin. @@.mono;This is deplorable... What a waste! Today's men are a disappointment.@@`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `You keep submissive while <<name _t>> keeps fucking you, every thrust against your wet pussy gets him closer to the climax. When he is finally about to come you are expecting a creampie, but he immediately pulls his penis out letting the white, manly contents escape out, each jet on your skin avoiding insemination.`;
              }
              else {
                out += [
                  "<<name _t>> quickly jerks backward, pulling <<his>> <<n _t 'cocklength.q'>> <<n _t 'cock.n'>> from your <<p 'curwet.q'>> <<p 'pussy.n'>>. A moment later thick ropes of <<w 'cum.n'>> begin to spray from <<his>> cockhead, landing on your groin and thighs.",
                  `<<name _t>> thrust at you, his rhythm intensifies along with his hot, heavy breathing, but the moment he starts to cum he quickly pulls his cock out of you. You feel the white, sticky substance against your skin, the jizz jets stick to the outside, saving you from a creampie.`,
                ].random();
              }

              break;
            case "pulled out fail":
              if (ↂ.pc.kink.shame && rando()) {
                out += `<<name _t>> grab your hips and give more and more powerful impulses against your tight little pussy, you are feeling ashamed and shy, unable to look into his eyes. His pace gets more ferocious until he starts to come, he feels it and when he realizes that his climax has started he immediately takes the cock out of you, allowing the semen to spread through your skin, but some of it is in your depths. @@.npc;Uh... That was close, but I think everything is okay.@@`;
              }
              else if (ↂ.pc.kink.pregnancy && rando()) {
                out += `You just groan while <<name _t>> grabs your hips and thrust successively against your wet and fertile pussy, you can't wait to be creampied and look at him expectantly. When he is about to cum however he quickly takes his penis out of you, releasing his manly cum on your skin, you can feel some of it inside you however, realizing that even so little has the chance to get pregnant. @@.mono;This is not a creampie... Shit, how disappointing, it's hard to find a real man these days.@@`;
              }
              else if (ↂ.pc.kink.rape && rando()) {
                out += `You keep your eyes away from <<name _t>>, just moaning as he fucks you by holding your arms, there's not much you can do but be fucked like a bitch in heat. He increases the pace until he is panting and close to cum, you feel his cock pulse intensely when then he starts to come, but at that point he quickly pulls the penis out and releases the hot and manly semen on your skin, one little of it is inside of you, you can feel it hot and dense, touching your inner walls.`;
              }
              else if (ↂ.pc.kink.risky && rando()) {
                out += `<<name _t>> fucks you more and more quickly, the pulsations of his body intensify with each new thrust that he takes, reaching your cervix. You are expecting to be creampied, your arousla is poorly contained and overshadows your concern to be impregnated, but when he is about to come he only takes a second to get his cock out, releasing the white and hot load on yours skin. @@.npc;Shit... That was close, although I think you would be an great pregnant bitch.@@ Your desire to be creampie is now much greater than your concern about being impregnated, you feel disappointed.`;
              }
              else if (ↂ.pc.kink.slut && rando()) {
                out += `<<name _t>> fucks you more and more intensely, you just smile at him while watching his effort to go as deep as possible inside your wet and slutty pussy. You just moan as you get fucked until he starts to come, when he realizes it he quickly takes his penis out of you, although a small amount of semen is left in your depths, the rest is released on your skin. @@.npc;Well... I don't think that will generate any risks, right? Hehe@@`;
              }
              else {
                out += [
                  "<<name _t>> quickly jerks backward, pulling <<his>> <<n _t 'cocklength.q'>> <<n _t 'cock.n'>> from your <<p 'curwet.q'>> <<p 'pussy.n'>>. The moment it emerges, thick ropes of <<w 'cum.n'>> begin to spray from <<his>> cockhead, splashing against your <<p 'vulva.n'>> and groin. When it's over you're something of a mess. @@.npc;Whew, that was a close one!@@",
                  `<<name _t>> keep fucking you, he holds your butt forcing his penis deeper inside you and making you moan intensely, when he realizes he is starting to come. In a quick movement he pulls his cock out, leaving his hoy meatstick head and your wet pussy connected by a thread of semen before he starts ejaculating, releasing all of it on your skin.`,
                ].random();
              }

              break;
          }
        }
        else {
          if (ↂ.pc.kink.shame && rando()) {
            out += `<<name _t>> press deeper and deeper into your little butthole, getting fucked like that makes you feel deeply ashamed and you can't look your lover in the eye. You just moan as he continues to stretch your butthole now not too tight, feeling your inner looks trying to get back to the original size and compressing his erect cock, when he finally starts to cum you can feel his semen invading your wet hole, filling you with the hot, sticky substance.`;
          }
          else if (ↂ.pc.kink.rape && rando()) {
            out += `<<name _t>> thrust violently against your butthole, with each blow you feel your inner walls more and more stretched, waves of pain and pleasure cross your body with each new thrust where he sinks his cock in your depths. Soon your arousal gets high enough, your body adapts and the pleasure starts to predominate, the feeling of being fucked becomes more intense and you then hear his breathing intensify along with acting, then he grabs your hips and sinks the penis inside you, then starting the climax and releasing all the hot seed inside you. You groan with surprise, the sensation of being anally filled is strange, but pleasurable, after all your abuser managed to satisfy you in the end.`;
          }
          else if (ↂ.pc.kink.slut && rando()) {
            out += `<<name _t>> continues to fuck your tight butthole more and more intensely, you are satisfied to finally be fucked as you deserve. Having your body used in this way is deeply satisfying for your intense sexual desire, you hear his moans when he starts to come, grabbing your hips and going as deep as possible into your butthole, then releasing his white and manly load in your depths. You groan loudly when you feel it, having your depths so stretched is painful, but deeply pleasurable.`;
          }
          else {
            out += [
              `<<name _t>> start fucking your <<p asshole.q>> <<p asshole.n>> faster and faster; for a second <<he>> stops and with a groan pushes <<his>> <<n _t 'cocklength.q'>> <<n _t 'cock.n'>> deep into your rear hole spraying <<his>> thick hot cum with a series of a short twitches.<<run setup.omni.new("assPie")>>`,
              `<<name _t>> grab your buttocks for more pressure and intensity while he fucks your tight butthole. You groan as you look into his eyes, he looks especially comfortable in what he's doing, you can feel your little butthole stretching more and more with each thrust. As he continues, his body's pulse increases and intensifies along with the warm breath against your skin, at some point you feel his cock start to pulse against the inside walls of your tight ass, before you can speak something you feel him depositing his cum deep in your tight ass, just moaning with the warm sensation of being anally creampied.`
            ].random();
          }
        }
      }
      else {
        if (ↂ.pc.kink.shame && rando()) {
          out += `<<name _t>> starts to cum furiously, you forget for a few moments your shyness to make room for an expression of surprise and disappointment when you see all his seed pouring into waste. @@.mono;Well... This is disappointing, where the hell would that happen?@@`;
        }
        else if (ↂ.pc.kink.rape && rando()) {
          out += `<<name _t>> groans just before he starts to come, releasing his furious bursts of hot cum on the floor. You look at it feeling a mixture of relief and disappointment, your wildest and most aroused part wanted to be well fucked, but at least you avoided being inseminated by an abuser.`;
        }
        else if (ↂ.pc.kink.slut && rando()) {
          out += `You are surprised when <<name _t>> starts to come, totally wasting his cum on the floor. You are immediately furious when you see this, your time of pleasure totally thrown away. @@.pc;What the hell... What the hell is this? You're the most pathetic thing I've ever seen, honestly.@@`;
        }
        else if (ↂ.pc.kink.cumSlut && rando()) {
          out += `<<name _t>> starts to aggravate in front of you, the act takes you by surprise and immediately makes you angry, you blush with the barely contained hatred. @@.pc;But... what the fuck is that !? I- Uh... I can't believe you wasted ALL your cum like that! Grr...@@ You hover in front of your lover while he finishes cgozar, trying to recover some of the white substance before everything is lost, you kneel in front of him and try to rescue the last drops of it by licking his semi-erect dick. But most of that is gone and is now on the ground. @@.pc;Fuck, man... This is ridiculous!@@`;
        }
        else {
          out += [
            `Immediately after, <<his>> <<n _t 'cock.n'>> starts spraying <<w cum.n>> pointlessly. @@.mono;Well, that wasn't what I was expecting to happen...@@`,
            `<<name _t>> surprises you when he starts to come, wasting his semen completely. You see it in front of you, quickly changing your expression from lust to disappointment when you see the seed pouring out uselessly. @@.pc;This is disappointing... Damn it, it's ridiculous.@@`,
            `<<name _t>> starts to come furiously, his dick is pulsing intensely but you see every jet of semen being wasted hitting the ground. You feel an immediate frustration and your arousal quickly becomes a feeling of loss. @@.mono;It is not possible... Holy shit.@@`
          ].random();
        }
      }

      return out;
    },
  };
  aw.con.info("Sex Orgasm Library loaded.");
};
