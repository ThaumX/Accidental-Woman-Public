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
        switch (posGroup) {
          case "standing":
            //
            switch (posCat) {
              case "makeout":
                //
                out = `As you stand there making out with <<name _t>>, you find yourself surprised as the tingling pleasure betwixt your legs radiates out from your abdomen. It quickly reaches a crescendo, and before you realize what's happening you find yourself having a somewhat unexpected orgasm. You grasp <<name _t>> for support as your leg muscles flex of their own accord. `;
                switch(ↂ.pc.body.pussy.wetness) {
                  case 0:
                  case 1:
                  case 2:
                    //
                    out += "Your muscles feel a little weak when it's over, so you continue holding on to <<name _t>> for support. This time your grasp is more gentle; though your orgasm was unexpected, it wasn't unappreciated.";
                    break;
                  case 3:
                    //
                    out += "When it's over you can feel some of your nectar running down your inner thighs. Your thighs and the rest of your legs feel a little weak, so you continue holding on to <<name _t>> for support. This time your grasp is more gentle; though your orgasm was unexpected, it wasn't unappreciated.";
                    break;
                  default:
                    //
                    out += "You feel a sudden wetness on your thighs, and you realize that your sodden <<p 'pussy.n'>> is squirting femcum as you orgasm. Your muscles feel a little weak when it's over, so you continue holding on to <<name _t>> for support. This time your grasp is more gentle; though your orgasm was unexpected, it wasn't unappreciated.";
                    break;
                }
                break;
              case "oralPC":
                //
                out = `As you stand there towering over <<name _t>> while <<n _t 'heshe.q'>> kneels between your legs, you feel your pleasure build to a fever pitch. You reach out to grab something to steady yourself, but find only <<name _t>>'s head. As your climax hits you find yourself clutching at <<n _t 'himher.q'>>, inadvertently burying <<n _t 'hisher.q'>> face in your <<p 'curwet.q'>> <<p 'vulva.n'>> as you attempt to remain standing. The firm contact combines with the jerking of your muscles to make it all the more intense, and you can't help but scream out in rapturous pleasure. `;
                if (ↂ.pc.body.pussy.wetness < 3) {
                  out += "After it's over you finally remember that you have <<name _t>> buried between your legs and you release <<n _t 'himher.q'>>. Looking down, you see <<n _t 'himher.q'>> grinning up at you.";
                } else {
                  out += "After it's over you finally remember that you have <<name _t>> buried between your legs and you release <<n _t 'himher.q'>>. Looking down, you see <<n _t 'himher.q'>> with a surprised look on <<n _t 'hisher.q'>> face, which happens to be thouroughly coated in your juices.";
                }
                break;
              case "oralNPC":
                //
                out = "You kneel there, <<if $T.main.male>>your face practically touching <<name _t>>'s <<n _t 'cocklength.q'>> throbbing <<n _t 'cock.n'>><<else>>your nose barely an inch from <<name _t>>'s <<n _t 'curwet.q'>> <<n _t 'vulva.q'>><</if>>, you bring yourself over the edge. Without even realizing it, you've wound up with both hands between your <<p 'weight.q'>> thighs, thoroughly working over your <<p 'curwet.q'>> <<p 'cunt.n'>>. You <<if $T.main.male>>inhale <<name _t>>'s cock into your mouth, moaning around it as you climax.<<else>>press your face against <<name _t>>'s <<n _t 'vulva.n'>>, moaning into her <<n _t 'labia.n'>> as you climax.<</if>> You stay that way for several moments as you recover, before finally leaning back ready to continue.";
                break;
              case "sex":
                //
                switch (posKey) {
                  case "standingFacingAwaySex":
                    //
                    out = "Bouncing your <<p 'butt.q'>> <<p 'butt.n'>> into <<name _t>> in rhythm with <<n _t 'hisher.q'>> thrusts as <<n _t 'heshe.q'>> fucks you, ";
                    break;
                  case "standingHandsonWallSex":
                    //
                    out = "Pushing off the wall to bounce your <<p 'butt.q'>> <<p 'butt.n'>> into <<name _t>> in rhythm with <<n _t 'hisher.q'>> thrusts as <<n _t 'heshe.q'>> fucks you, ";
                    break;
                  default:
                    //
                    out = "Entwined with <<name _t>> as <<n _t 'heshe.q'>> stands there fucking you, ";
                    break;
                }
                out += "the pleasurable tension in your core just keeps building. Suddenly, as if a dam burst, you're washed into a powerful orgasm. Pleasure radiates from your <<p 'curwet.q'>> <<p 'pussy.n'>> through the spasming muscles of your limbs all the way to the tips of your fingers and toes. You're practically paralized as <<name _t>> continues to fuck you, mindlessly riding the waves of pleasure. Eventually your climax passes, but you can already feel a more intense pressure building as <<name _t>> continues to pound your <<p 'pussy.n'>>.";
                break;
            }
            break;
          case "laying":
            //
            switch (posCat) {
              case "makeout":
                //
                out = "Laying down with <<name _t>>, partially intertwined, you are somewhat surprised to find yourself approaching orgasm so soon. There isn't any single cause, but the exploring touch of <<name _t>>'s <<if $T.main.female>>soft<<else>>firm<</if>> hands is a big part of it. You close your eyes, letting the intense sensation of your climax carry you moaning through an indeterminate number of moments. ";
                if (ↂ.pc.body.pussy.wetness > 2) {
                  out += "When you finally return to the present, you find your <<p 'vulva.n'>> soaked, as if crying for <<name _t>> to fuck you already. ";
                } else {
                  out += "Eventually you return to the present. ";
                }
                out += "Pleasure remains behind, tingling across your skin like electricity. You're already anticipating more.";
                break;
              case "oralPC":
                //
                out = "You lay there, staring blankly, as <<name _t>> occupies <<n _t 'himher.q'>>self between your legs. Your <<p 'pussy.n'>> is tingling; you can feel a tense hunger from deep inside begging to be sated. Your <<pcClitSize>> <<p 'clit.n'>> won't be ignored, however, the waves of pleasure emanating from it only serving to amplify the pleasurable tension in your core. Before you realize it, you've reached the turning point and find yourself cumming. Your <<p 'pussy.n'>> clenches and unclenches rhythmically, as if trying to hold on to a cock that isn't there. The orgasm is intense but brief, leaving you desperate for more.";
                break;
              case "oralNPC":
                //
                out = "On your hands and knees, <<if $T.main.male>>your face practically touching <<name _t>>'s <<n _t 'cocklength.q'>> throbbing <<n _t 'cock.n'>><<else>>your nose barely an inch from <<name _t>>'s <<n _t 'curwet.q'>> <<n _t 'vulva.q'>><</if>>, you bring yourself over the edge. Without even realizing it, you've wound up with both hands between your <<p 'weight.q'>> thighs, thoroughly working over your <<p 'curwet.q'>> <<p 'vulva.n'>>. Unbalanced now, you <<if $T.main.male>>inhale <<name _t>>'s cock into your mouth, letting it slip deep into your throat as if impaling yourself for support.<<else>> simply let yourself fall forward slightly, and up with your face pressed firmly against <<name _t>>'s <<n _t 'vulva.n'>>.<</if>> You climax, almost unaware of <<n _t 'hisher.q'>> <<if $T.main.male>><<n _t 'cock.n'>> down your throat<<else>><<n _t 'labia.s'>> <<n _t 'labia.n'>> suffocating you<</if>> due to the intense pleasure. You stay that way for several moments as you recover, before finally the need to breathe forces you to lift yourself away.";
                break;
              case "sex":
                //
                const tits = (ↂ.pc.body.tits.size > 500) ? true : false;
                if (posKey === "RevCowgirl" || posKey === "cowGirl") {
                  // on top
                  out = "You're riding <<name _t>>, ";
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
                  out += ` You suddenly find yourself struggling to keep up your movements as you sail over the edge into a powerful orgasm. The intensity catches you off guard, and rather than collapse you slam your ${either("<<p 'curwet.q'>>", "<<p 'pussy.s'>>")} <<p 'pussy.n'>> down on <<n _t 'hisher.q'>> <<n _t 'cock.s'>> <<n _t 'cock.n'>>. You throw your head back as your muscles spasm, closing your eyes to enjoy the waves of pleasure coursing through your body. All too soon the climax is over, so you start riding <<name _t>> once more and attempt to resume your pace. You know that another mind-bending orgasm is right around the corner.`;
                } else {
                  // underneath
                  out = "You're laying under <<name _t>> as <<he>> ";
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
                  out += " Your vision seems to blur as an intense climax explodes from within you. Your muscles all seem to contract at once as your <<p 'pussy.n'>> attempts to clamp down on <<name _t>>'s <<n _t 'cock.n'>> with all its might. You close your eyes, biting back a scream as the overpowering waves of pleasure course through you. <<name _t>>'s continued thrusts prolong the already intense orgasm, and by the time it's over you're left trembling beneath <<n _t 'himher.q'>>. You can already feel your pleasure beginning to build to new heights.";
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
      let out = `<<name _t>> suddenly groans, cock twitching as <<he>> approaches ${either("orgasm", "the point of no return", "climax", "orgasm")}. `;
      if (cat === "oralNPC") {
        // check for face load or mouth load
        if (pcAct === "suckCockHead" || pcAct === "suckCockInOut") {
          out += "That brief warning was all you got before <<he>> started spraying <<n _t 'cum.n'>> into your mouth. The heady smell and rich taste assaults your senses almost immediately. ";
          if (ↂ.pc.status.addict.cum >= 30 || ↂ.pc.kink.cumSlut) {
            out += "@@.mono;God I love this@@ you think to yourself as you let your mouth fill with <<name _t>>'s <<w 'cum.n'>> before the flood forces you to swallow. You hold <<his>> <<n _t 'cocksize.q'>> <<n _t 'cock.n'>> in your mouth until <<he>> finishes, savoring the flavor of fresh cum. When <<his>> orgasm has tapered off you spend a few extra moments milking his <<n _t 'cock.n'>> of any extra cum that didn't make it into your mouth. Even after <<he>> pulls back some time later, you spend several moments distractedly enjoying your treat before finally swallowing it all.";
            setup.drug.eatDrug("cum", random(10, 15));
          } else {
            out += "You begin to swallow it almost immediately to keep up with the torrent of hot <<w 'cum.n'>> spraying into your mouth. @@.mono;This is pretty good... I could definitely get used to it.@@ Eventually <<his>> orgasm finishes, and you give <<his>> <<n _t 'cock.n'>> a final suck to clean <<him>> off.";
            setup.drug.eatDrug("cum", 10);
          }
        } else {
          out += "That brief warning was all you got before <<he>> started spraying <<n _t 'cum.n'>> onto your face. ";
          if (ↂ.pc.status.addict.cum >= 30 || ↂ.pc.kink.cumSlut) {
            out += "@@.mono;Damn! that belongs in my mouth!@@ You quickly suck <<his>> cockhead into your mouth so you can catch the rest of the hot ambrosia on your tongue. When <<his>> orgasm finally finds down you spend several seconds milking the rest of the <<w 'cum.n'>> from <<his>> <<n _t 'cock.n'>>. Finished with that load, you slowly start scooping up the cooling cum from your face so you can enjoy that too.";
            setup.drug.eatDrug("cum", 10);
          } else {
            out += "You let <<him>> finish, already mentally complaining about having to clean up the mess.";
          }
        }
      } else if (cat === "sex") {
        switch (risk) {
          case "condom broke":
            out += "With one final thrust <<he>> hilts <<him>>self deep inside you and begins to spray <<his>> load of <<w 'cum.n'>> into <<his>> condom. More than a minute later, <<he>> finally pulls out of your <<p 'pussy.q'>> <<p 'pussy.n'>>. You can see the condom bulging with seed as <<he>> moves away; as soon as <<he>> starts to pull it off, however, it ruptures making a mess.";
            break;
          case "condom broke and came inside":
            out += "With one final thrust <<he>> hilts <<him>>self deep inside you and sprays <<his>> load of <<w 'cum.n'>> into <<his>> condom. At least, that's what you thought happened, but you soon notice a distinct wet heat near your <<p 'womb.n'>>. @@.pc;Oh fuck, I think the condom broke.@@ It takes <<name _t>> a few more moments to register your words before <<he>> finally pulls out. When <<he>> does, you see that the condom is a tattered mess.";
            break;
          case "came inside":
            out += `With one final thrust <<he>> hilts <<him>>self deep inside you and begins to pump <<his>> ${either("fertile", "potent", "thick")} cum deep inside you. You can feel the hot liquid splashing against your ${either("cervix", "cervix", "<<w 'womb.n'>>")}<<has risky || pregnant>>, the sensation sends waves of pleasure radiating out from your <<w 'womb.n'>> as you have a light orgasm.<<or>>, a sensation that feels oddly satisfying.<</has>> <<name _t>> stays buried inside you for over a minute before finally <<he>> finally pulls out.`;
            break;
          case "came inside PO":
            out += "Thrusting even harder than before, you know <<he>> must be close. With another groan <<he>> pulls out of you in a rush, the final dregs of <<his>> orgasm dribbling out of <<his>> <<n _t 'cocksize.q'>> <<n _t 'cock.n'>>. You can tell that the rest of it was deposited inside you. @@.npc;Sorry about that, I came a little sooner than I expected...@@";
            break;
          case "safe":
            out += "Immediately after, <<his>> <<n _t 'cock.n'>> starts spraying <<w cum.n>> pointlessly. @@.mono;Well, that wasn't what I was expecting to happen...@@";
            break;
          case "came in condom":
            out += "With one final thrust <<he>> hilts <<him>>self deep inside you and begins to spray <<his>> load of <<w 'cum.n'>> into <<his>> condom. More than a minute later, <<he>> finally pulls out of your <<p 'pussy.q'>> <<p 'pussy.n'>>. You can see the condom bulging with seed as <<he>> moves away. <<has 'risky||pregnant||cumSlut'>>@@.mono;What a waste...@@<</has>>";
            break;
          case "pulled out":
            out += "<<name _name>> quickly jerks backward, pulling <<his>> <<n _t 'cocklength.q'>> <<n _t 'cock.n'>> from your <<p 'curwet.q'>> <<p 'pussy.n'>>. A moment later thick ropes of <<w 'cum.n'>> begin to spray from <<his>> cockhead, landing on your groin and thighs.";
            break;
          case "pulled out fail":
            out += "<<name _name>> quickly jerks backward, pulling <<his>> <<n _t 'cocklength.q'>> <<n _t 'cock.n'>> from your <<p 'curwet.q'>> <<p 'pussy.n'>>. The moment it emerges, thick ropes of <<w 'cum.n'>> begin to spray from <<his>> cockhead, splashing against your <<p 'vulva.n'>> and groin. When it's over you're something of a mess. @@.npc;Whew, that was a close one!@@";
            break;
        }
      } else {
        out += "Immediately after, <<his>> <<n _t 'cock.n'>> starts spraying <<w cum.n>> pointlessly. @@.mono;Well, that wasn't what I was expecting to happen...@@";
      }
      return out;
    },
  };
  aw.con.info("Sex Orgasm Library loaded.");
};
