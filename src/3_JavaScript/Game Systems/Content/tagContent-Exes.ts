
//  ███████╗██╗  ██╗███████╗███████╗
//  ██╔════╝╚██╗██╔╝██╔════╝██╔════╝
//  █████╗   ╚███╔╝ █████╗  ███████╗
//  ██╔══╝   ██╔██╗ ██╔══╝  ╚════██║
//  ███████╗██╔╝ ██╗███████╗███████║
//  ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
//
//  ████████╗ █████╗  ██████╗  ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗
//  ╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝
//     ██║   ███████║██║  ███╗██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║
//     ██║   ██╔══██║██║   ██║██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║
//     ██║   ██║  ██║╚██████╔╝╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║
//     ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝

// Namespace
if (aw.tagContent == null) {
  aw.tagContent = {};
}

aw.tagContent.exes = {} as IntTagContent;

// RANDOMS

aw.tagContent.exes.random = [
  `@@.npc;Soo... how it is going?@@<br>
  <<dialogchoice>>
    <<dbutt "Perfect">><<intreplace>><<ctagcontent "exes" "randomPerfect">><</intreplace>>
    <<dtext "arrogant">>I am doing well lately. I'd even say wonderful.
    <<dbutt "Okay">><<intreplace>><<ctagcontent "exes" "randomOkay">><</intreplace>>
    <<dtext "smile">>Well, it is okay I guess.
    <<dbutt "Not really" "ↂ.pc.trait.extro">><<intreplace>><<ctagcontent "exes" "randomOpen">><</intreplace>>
    <<dtext "confused">>Not that good actually.
  <</dialogchoice>>`,
  `@@.npc;The weather is particulary shitty last days...@@<br>
  @@.pc;Well, yeah, better dress warm...@@<br>
  @@.npc;Weather guy said yesterday  it will get better next week.@@<br>
  @@.pc;Yeah...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.randomPerfect = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 9 >>@@.pc;I am doing well lately. I'd even say wonderful.@@<br>
  @@.npc;Ugh. Glad that you... got back in the saddle so quickly.@@<br>
  @@.pc;Yeah...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.randomOkay = [
  `@@.pc;Well, it is okay I guess. And how do you do?@@<br>
  @@.npc;Mmmm... I am fine too.@@<br>
  @@.pc;Yeah...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.randomOpen = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >>@@.pc;Not that good actually. Still recovering and everything like this.@@<br>
  @@.npc;Ouch, sorry to hear that.@@<br>
  @@.pc;Yeah...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

// PRIORITY ONE TAGS

aw.tagContent.exes.seriousIllness = [
  `@@.npc;You looks not very good. Evertything is ok?@@<br>
  <<dialogchoice>>
    <<dbutt "Bitchy" "ↂ.pc.trait.bitch = 1">><<intreplace>><<ctagcontent "exes" "seriousIllnessBitchy">><</intreplace>>
    <<dtext "mad">>Oh just look, now you care!
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "exes" "seriousIllnessOkay">><</intreplace>>
    <<dtext "confused">>Yeah, I am good...mostly. Thanks for asking.
    <<dbutt "Help me">><<intreplace>><<ctagcontent "exes" "seriousIllnessHelp">><</intreplace>>
    <<dtext "sick">>I feel really bad... I gonna pass out now...
  <</dialogchoice>>`,
];
aw.tagContent.exes.seriousIllnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 10 >>@@.pc;Oh just look, now you care!@@<br>
  @@.npc;Hey, I just trying to be nice.@@<br>
  @@.pc;Yeah, "trying". So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.seriousIllnessOkay = [
  `@@.npc;Maybe it is none of my business now, but I still advise you to see a doc.@@<br>
  @@.pc;Be sure I will. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.seriousIllnessHelp = [
  `@@.npc;I better call the ambulance, hang in there, help will come soon!@@<br>
  NPC calls the ambulance<br>
  <<if ↂ.flag.Healthcare>>NPC stay with you until institute doctors take you to the weird medical place. Placeholder thingy for now.<br>
    <<link "Being drugged">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <<else>>NPC stay with you until general ambulance comes and takes you to the hospital. Placeholder thingy for now.<br>
    <<link "Sleep exhausted in the ambulance">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <</if>>
`,
];
aw.tagContent.exes.illness = [
  `@@.npc;You look unhealty. Are you ok?@@<br>
  <<dialogchoice>>
    <<dbutt "Bitchy" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "exes" "illnessBitchy">><</intreplace>>
    <<dtext "mad">>Don't even pretend that you care.
    <<dbutt "Okay">><<intreplace>><<ctagcontent "exes" "illnessOkay">><</intreplace>>
    <<dtext "smile">It is okay, thanks.
    <<dbutt "Not very">><<intreplace>><<ctagcontent "exes" "illnessBad">><</intreplace>>
    <<dtext "unamused">>I really feel not that good.
  <</dialogchoice>>`,
];
aw.tagContent.exes.illnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 10 >@@.npc;Huh, okay, please calm down. I just tried to be friendly.@@<br>
  @@.pc;Yeah, whatever. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.illnessOkay = [
  `@@.pc;It is okay, thanks@@<br>
  @@.npc;Well... good for you. You better take care.@@<br>
  @@.pc;Yeah. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.illnessBad = [
  `@@.npc;You should really seek some medical assistance.@@<br>
  @@.pc;Yeah, I know, will do. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.nakedBottom = [
  `You notice that <<print aw.npc[setup.interact.status.npc].main.name>> is <<if aw.npc[setup.interact.status.npc].kink.exhibition>><<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >> looking at your naked bottom smiling.<<elseif aw.npc[setup.interact.status.npc].kink.liberate>> staring at your nudity with interest.<<elseif aw.npc[setup.interact.status.npc].kink.shame>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >> blushing heavily averting eyes your naked bottom.<<else>> making quick amused glances at your bare bottom.<</if>><<has exhibition>>You can't but wiggle your <<assSize>> butt a bit, presenting your nakedness.<br>@@.mono;Oh yes, stare at me. Remember what are you missing now? Damn, this is exciting!@@<br><<arouse 2>><<orhas slut>><<arouse 2>>You can't but enjoy the attention to your naked bottom and pussy.<br><<orhas liberate>>You feel pretty comfortable with your lower part naked.<br><<orhas shame>><<stress 15 "Naked pussy convo">>You feel terribly insecure and going tomato red from embarassment. <br><<arouse -2>>@@.mono;How did I ever allow that to happen? I want just die right now. I wonder what <<print aw.npc[setup.interact.status.npc].main.name>> will think about me now.@@<br><<or>><<stress 7 "Naked pussy convo">>You feel pretty uncomfortable being exposed like this.<br><<arouse -1>><<stress 5 "Naked pussy convo">><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "exes" "NakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "exes" "NakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "exes" "NakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "pain">>Run away in embarassment.
  <</dialogchoice>>`,
];
aw.tagContent.exes.NakedBottomPresent = [
  `<<SCX>><<SC "SD" "20">>You lean forward, obcenely exposing your lady bits.<br> @@.mono;Ha, missing that perfect booty now, don't you? I can see it in your eyes.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>.
  @@.npc;Oh, shit. You are still as gorgeous as the day we met, babe!@@<br>
  @@.pc;Thanks, heh. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>You failed the check and NPC is pissed off.<br>
  @@.npc;What for you are doing this? Not to say you are running around the streets with your bare ass visible to all the people but damn, <<print ↂ.pc.main.name>>, that is your way to return me? Really?@@
  <<dialogchoice>>
      <<dbutt "Run" "ↂ.pc.kink.exhibition">><<run setup.interact.exit()>>
      <<dtext "disturbed">>Run away in embarassment
      <<dbutt "Talk">><<intreplace>><<ctagcontent "exes" "NakedBottomPresentChat">>
      <<dtext "tired">>Oh... Yes, you are right...
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.exes.NakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.NakedBottomCover = [
  `You try to cover yourself and go on with the convo.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.NakedBottomCool = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.practNakedBottom = [
  `<<print aw.npc[setup.interact.status.npc].main.name>>s look make you remember that your bottom is practically naked.<br><br><<has exhibition>><<arouse 2>>@@.mono;Maybe I should lean just a tiny bit to show my goods?@@<br><<orhas slut || liberate>>@@.mono;I guess this will remind <<if aw.npc[setup.interact.status.npc].main.female>>her<<else>>him<</if>> what <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> has lost, ha.@@<br><<orhas shame>><<arouse -2>><<stress 10 "Naked pussy convo">>@@.mono;Perfect. Just perfect. Now <<print aw.npc[setup.interact.status.npc].main.name>> will think that I became a total slut.@@<br><<or>><<stress 5 "Naked pussy convo">>@@.mono;Well, I am dressed risky today for sure. I wonder if <<print aw.npc[setup.interact.status.npc].main.name>> is regretting now about our past together.@@<br><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "exes" "practNakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "exes" "practNakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "exes" "practNakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.exes.practNakedBottomPresent = [
  `<<SCX>><<SC "SD" "20">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Ha, missing that perfect body now, don't you? I can see it in your eyes.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>.<br>
  @@.npc;Oh, shit. You are still as gorgeous as the day we met, babe!@@<br>
  @@.pc;Thanks, heh. So...@@
  <<include [[NPCinteraction-ExesContinue]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >><br>You failed the check and NPC is pissed off.<br>
  @@.npc;What for you are doing this? Not to say you are running around the streets with your bare ass visible to all the people but damn, <<print ↂ.pc.main.name>>, that is your way to return me? Really?@@<br>
  <<dialogchoice>>
      <<dbutt "Run" "ↂ.pc.kink.exhibition">><<run setup.interact.exit()>>
      <<dtext "disturbed">>Run away in embarassment
      <<dbutt "Talk">><<intreplace>><<ctagcontent "exes" "practNakedBottomPresentChat">>
      <<dtext "tired">>Oh... Yes, you are right...sorry.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.exes.practNakedBottomPresentChat = [
  `@@.pc;Oh... Yes, you are right...sorry.@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.practNakedBottomCover = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.buckNaked = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> stare at your nude body.<br><<has exhibition>><<aroused 2>>@@.mono;Oh yeah, look at me!@@<br><<orhas slut || liberate>>@@.mono;That is prety exciting! I wonder, what <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> is thinking about now?@@<br><<orhas shame>><<aroused -2>><<stress 25 "Naked convo">>@@.mono;Oh my. Oh my. I want to die right now.@@<br><<or>><<stress 15 "Naked convo">>@@.mono;Oh, shit. I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will not tell anybody.@@<br><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "exes" "buckNakedPresent">><</intreplace>>
      <<dtext "smug">>Rotate exposing yourself further.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "exes" "buckNakedCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "exes" "buckNakedCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Run away in embarassment
  <</dialogchoice>>`,
];
aw.tagContent.exes.buckNakedPresent = [
  `<<SCX>><<SC "SD" "20">>You expose your buck naked body to the ex.<br>
  @@.pc;Like what you see?@@<br>
  <<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 10 >>@@.npc;Oh... yeah. You look gorgeous!@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>You failed the check and NPC is pissed off.<br>
  @@.npc;Please, can you cover or something? That is plain obscene to be naked like that.@@<br>
  <<dialogchoice>>
      <<dbutt "Run" "ↂ.pc.kink.exhibition">><<run setup.interact.exit()>>
      <<dtext "disturbed">>Run away in embarassment
      <<dbutt "Talk">><<intreplace>><<ctagcontent "exes" "buckNakedPresentChat">><</intreplace>>
      <<dtext "awkward">>Ehh.. sure, sorry...
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.exes.buckNakedPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.buckNakedCover = [
  `You try to cover your body with hands which is not super effective. NPC tries his best to ignore your clothing choice.<br>
  @@.npc;W-well, what were we talking about?@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.buckNakedCool = [
  `You prefer to act normally and go on with your convo. NPC is nervous.<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <<else>>@@.pc;Sorry for that.@@<br>
  @@.npc;Yeah... So what were we talking about?@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <</if>>`,
];
aw.tagContent.exes.wetClothes = [
  `<<if ↂ.pc.clothes.keys.bra === 0>>You notice the exes looks at your chest and realise that your <<p nipl.q>> nipples are visible through the wet clothes.<br>
  <<has exhibition>><<arouse 1>>@@.mono;Oh yeah, I like that.@@<br><<orhas slut>>@@.mono;That is certainly drawing <<if aw.npc[setup.interact.status.npc].main.female>>her<<else>>his<</if>> attention.@@<br><<orhas shame>><<stress 7 "Wet clothes convo">>@@.mono;Oh shit, shit, shit, my nipples are showing!@@<br><<or>><<stress 2 "Wet clothes convo">>@@.mono;Oops, better cover that!@@<br><</has>>
  <<dialogchoice>>
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "exes" "wetClothesCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "exes" "wetClothesCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Run away in embarassment
  <</dialogchoice>>
  <<else>>
  @@.npc;Hey, somebody forgot to take an umbrella today?@@<br>
  @@.pc;Yeah... such a shame. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <</if>>`,
];
aw.tagContent.exes.wetClothesCover = [
  `You cover your <<p breasts.n>> breast with your hand.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.wetClothesCool = [
  `<<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <<else>>@@.pc;Brr, it is really chilly today.@@<br>
  @@.npc;Yeah... So what were we talking about?@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <</if>>`,
];
aw.tagContent.exes.lightPheromones = [
  `@@.npc;Hmm, I felt that smell again. You still use this weird parfume?@@<br>
  @@.pc;Don't know what are you talking about. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.pheromones = [
  `@@.npc;Hmm, I felt that smell again. You still use this weird parfume?@@<br>
  @@.pc;Don't know what are you talking about. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> looks a bit disturbed and averting <<if aw.npc[setup.interact.status.npc].main.female>>her<<else>>his<</if>> eyes.<br>
  @@.pc;What's wrong?@@<br>
  @@.npc;I suddenly felt... that does not matter, forget about it.@@<br>
  @@.pc;Hmm, okay. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>`,
];
aw.tagContent.exes.hairyPits = [
  `While talking your realise that your hairy armpit bushes are showing through the thin fabric. The exes seems to be <<set _r = random(0,5)>><<if _r > 2 >><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>pretty disgusted by <<else>>okay with <</if>>that.<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];
aw.tagContent.exes.clownMakeup = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>You notice that exes looks at your face in some weird fashion.<br>
  <<set _r = random(0,2)>><<if _r === 1 >>Suddenly, <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> starts giggling.<br>
  <<dialogchoice>>
    <<dbutt "Confront" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "exes" "clownMakeupConfront">><</intreplace>>
    <<dtext "mad">>Do you fucking think that it is funny?
    <<dbutt "Ask">><<intreplace>><<ctagcontent "exes" "clownMakeupAsk">><</intreplace>>
    <<dtext "confused">>Hey, why are you laughing?
    <<dbutt "Act cool">><<intreplace>><<ctagcontent "exes" "clownMakeupCool">><</intreplace>>
    <<dtext "cool">>Go on with the convo ignoring the chuckles
    <<dbutt "Sarcasm">><<intreplace>><<ctagcontent "exes" "clownMakeupSarcasm">><</intreplace>>
    <<dtext "cool">>Sarcasm.
  <</dialogchoice>>
  <<else>>@@.pc;What?@@<br>
  @@.npc;Well, it is your makeup, <<print ↂ.pc.main.name>>. Like totally ruined.@@<br>
  @@.pc;Yeah, I am aware of that, thanks.@@<br>
  @@.mono;Oh shit, I better clean makeup asap. That is just embarassing.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <</if>>`,
];
aw.tagContent.exes.clownMakeupConfront = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>@@.pc;Do you fucking think that it is funny, yeah? You better stop before I make you regret this.@@<br>
  @@.npc;Ah-ha-ha, you look just ridiculous!@@<br>
  @@.pc;Screw you, shithead!@@<br>
  @@.mono;I need to fix it asap...@@<br>
  @@.npc;He-he!@@<br>
  <<link "Oh, just go fuck yourself, I am out.">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.exes.clownMakeupAsk = [
  `@@.pc;Hey, why are you laughing?@@<br>
  @@.npc;Well, it is your makeup, <<print ↂ.pc.main.name>>. Like totally ruined.@@<br>
  @@.pc;Well, yeah, that was a tough morning for sure.@@<br>
  @@.mono;Oh shit, I better clean makeup asap. That is just embarrassing.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>`,
];
aw.tagContent.exes.clownMakeupCool = [
  `You go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-ExesContinue]]>>`,
];
aw.tagContent.exes.clownMakeupSarcasm = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>@@.pc;My makeup is so good it made you histerical, yeah?@@<br>
  @@.npc;What?@@<br>
  @@.pc;Whatever.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>`,
];
aw.tagContent.exes.withdrawal = [
  `@@.mono;Shit, I need to find a way to beat that withdrawal soon.@@<br>
  @@.npc;Hey, <<print ↂ.pc.main.name>>, are you ok?@@<br>
  @@.pc;Ah? Y-yep.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>`,
];
aw.tagContent.exes.latePreg = [
  `@@.npc;You look like a watermelon with legs. Any time soon, yeah?@@<br>
  <<if ↂ.pc.trait.maternal == 1>>@@.pc;Hey, that was not nice at all! Have some respect before soon-to-be mother!@@<br>
  <<else>>@@.pc;Yeah. This is hard to carry around already, hope I ll give birth soon!@@<br>
  <</if>>@@.npc;Well... I hope it will go well.@@<br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>`,
];
aw.tagContent.exes.drunk = [
  `@@.pc;Ha, you again! Long tme no see!@@<br>
  @@.npc;Are you drunk again?@@<br>
  <<dialogchoice>>
    <<dbutt "Nah" >><<intreplace>><<ctagcontent "exes" "drunkYeah">><</intreplace>>
    <<dtext "laugh">>What? Npe! I'm just a bit tpsy!
    <<dbutt "Yeeah">><<intreplace>><<ctagcontent "exes" "drunkYeah">><</intreplace>>
    <<dtext "proud">>I drunk sooooooooo mch!
    <<dbutt "Horny">><<intreplace>><<ctagcontent "exes" "drunkFuck">><</intreplace>>
    <<dtext "love">>Wanna fuck me? I wanna fck you again!
    <<dbutt "Puke">><<intreplace>><<ctagcontent "flirty" "drunkPuke">><</intreplace>>
    <<dtext "sick">>I feel trrble, I'm gnna...
  <</dialogchoice>>`,
];
aw.tagContent.exes.drunkYeah = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>@@.npc;You are really shitfaced. Some things never change, yeah?@@<br>
  @@.pc;Wht? Are you saying I'm an aclho... alchcol... alchoholic?!@@<br>
  @@.npc;No, no. I am not saying anything. <<print ↂ.pc.main.name>>, go sleep already god dammit. Bye.@@<br>
  <<link "Wait, tlk to me!">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.exes.drunkPuke = [
  `You try to hold it but fail and throw the content of your stomach on the floor in front of <<print aw.npc[setup.interact.status.npc].main.name>>.<br>
  @@.npc;Oh damn! I really have to go. And you need to drink less, really.@@<br>
  <<link "Bwwwyaaa">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.exes.drunkFuck = [
  `@@.pc;Wanna fuck? I ll lck you so hrd you will forget bout anything!@@<br>
    <<SCX>><<SC "SD" 20>><<if $SCresult[1]>>@@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Hmm... you pretty much won't remember this tomorrow anyway, yes? Why don't take the opportunity...@@<br>
      <<link "That means ys?">><<run setup.interact.exit()>><</link>>
    <<else>>@@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;<<print ↂ.pc.main.name>>, please stop.@@<br>
      <<link "You dnt like me anymre?">><<intreplace>><<ctagcontent "exes" "drunkYeah">><</intreplace>><</link>>
    <</if>>`,
];
aw.tagContent.exes.mindbreak = [
  `You feel starting sobbing uncontrollably.<br>
  @@.npc;<<print ↂ.pc.main.name>>, what is wrong?@@<br>
  @@.pc;I... I just... I feel like everything goes to hell. Whole my life is ...sob... shattered...@@<br>
  @@.npc;Ugh, there, there. It will be okay, I am sure.@@<br>
  @@.pc;You just don't understand, all that happened ...sob... to me, it is just too much to handle...@@<br>
  <<if ↂ.pc.trait.will > 4 >>You somehow manage to gain your reason back.<br>
  <<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>@@.pc;I am so sorry. It was really tough times lately.@@<br>
  @@.npc;Oh, it is okay.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  <<else>><<addtime 13>><<set ↂ.pc.groom.makeup.clown = true>><<stress -10 "Mindbroken convo">>You start histerically giggling.<br>
  @@.npc;Oh, I better go, you... just be safe you know? I ll call you later...maybe...@@<br>
  You cry ang laugh alone sitting on the floor for some time before you finally start to feel better.<br>
  <<link "Get up">><<run setup.interact.exit()>><</link>>
  <</if>>`,
];
aw.tagContent.exes.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>
    You feel your juices running down your inner thights with no panties in a way to stop them.<br>
    <<has exhibition>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will notice that. That is so embarassingly exciting!@@<br><<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will not notice that.@@<br><</has>>
  <<else>>You feel your juices making a slippery mess slowly soaking through your panties.<br><<has slut>>@@.mono;Speaking with a person while being flooded like that is so naughty!@@<br><<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will not notice that.@@<br><</has>>
  <</if>><<include [[NPCinteraction-ExesContinue]]>>`,
];

aw.tagContent.exes.pussyAccess = [
  `<p>@@.mono;Oh, I fell a breeze on my bare pussy. I wonder if <<n setup.interact.status.npc "heshe.q">> notices that I don't wear any panties, tee-hee.@@</p>
  <<include [[NPCinteraction-ExesContinue]]>>`,
];

// OTHER TAGS

aw.tagContent.exes.stressed = [
  `@@.npc;Hey, is everything okay?@@<br>
  @@.pc;Mm? Why asking?@@<br>
  @@.npc;Well, you seem stressed to be honest.@@<br>
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "exes" "stressedNope">><</intreplace>>
    <<dtext "smile">>It is okay.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "exes" "stressedAbit">><</intreplace>>
    <<dtext "scared">>Yeah, I feel not that good.
  <</dialogchoice>>
  `,
];

aw.tagContent.exes.stressedNope = [
  `@@.pc;It is okay. Don't worry.@@<br>
  @@.npc;Oh, sorry then, I just thought you was... whatever.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.stressedAbit = [
  `<<has extro>>@@.pc;Yeah, I feel not that good. Work and everything in general you know. Don't know if I can deal with all this much longer...<<stress -1 "Talking about stress">>@@<<or>>@@.pc;Yeah, it was not very nice last days.@@<</has>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><br>
  @@.npc;Oh, I am sure it will be okay...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.tipsy = [
  `@@.npc;What is that smell? Did you drink?@@<br>
  @@.pc;Well, you think I can't? It is not like it is your business now.@@<br>
  @@.npc;Well no, I just was...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.athleticClothes = [
  `@@.npc;Going for a jog or something?@@<br>
  @@.pc;Well, yeah, trying to keep myself in shape.@@<br>
  @@.npc;Good for you I guess...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
  `@@.npc;Got ready to pump iron?@@<br>
  @@.pc;It is really good for health and weight too actually.@@<br>
  @@.npc;Way too go then.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.kinkyClothes = [
  `<<if aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;It seems that you enjoying your life, heh. Glad that you recovered.@@<<elseif aw.npc[setup.interact.status.npc].kink.shame>><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 7 >>@@.npc;Oh, now I suddenly remember why we separated. Those clothes are... lewd.@@<<else>>@@.npc;You seem to be not that upset now, <<print ↂ.pc.main.name>>. At least you find a way to cheer yourself up with those clothes.@@<</if>><br>
  <<has liberate>>@@.pc;Life is too short to dress modestly, <<print aw.npc[setup.interact.status.npc].main.name>>!@@<br><<orhas slut>>@@.pc;I just like drawing attention to my most delicious parts you always knew that.@@<br><<orhas shame>><<stress 8 "kinky clothes convo">>@@.pc;I just thought I will feel sexy in those and now I regret every moment.@@<br><<or>>@@.pc;Well, can a girl wear something sexy from time to time, right?@@<br><</has>><br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.nightwear = [
  `@@.npc;Is this a nightwear? Why are you dressed in it here?@@<br>
  @@.pc;I have nothing to answer actually.@@<br>
  @@.npc;Well, that's why we are now not together. Because you are weird.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.cuteClothes = [
  `@@.npc;Hey, pretty cute dress.@@<<set aw.npc[setup.interact.status.npc].rship.lovePC += 1 >><br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.cuteClothes = [
  `@@.npc;Hey, very cute dress!@@<<set aw.npc[setup.interact.status.npc].rship.lovePC += 1 >><br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.slovenlyClothes = [
  `@@.npc;Well, <<print ↂ.pc.main.name>>, you really should care about yourself. This clothes are a disaster.@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.swimwear = [
  `@@.npc;Care for swimming? Nice swimsuit by the way.@@<br>
  @@.pc;Thanks, heh. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.damagedClothes = [
  `@@.npc;<<print ↂ.pc.main.name>>, our breakup is not a reason to stop caring about yourself, really.@@<br>
  @@.pc;What?@@<br>
  @@.npc;Buy new clothes, chill a bit, really. It is not the end of the world.@@<br>
  <<has bitch>>@@.pc;I did not ask for an advice by the way. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>><<or>>@@.pc;You are right. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>><</has>>
  `,
];

aw.tagContent.exes.stainedClothes = [
  `@@.npc;Your clothes are stained in something you know?@@<<stress 3 "stained clothes convo">><br>
  @@.mono;Now <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will think that I am a slob, perfect.@@<br>
  @@.pc;Yeah, I am aware. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];

aw.tagContent.exes.angry = [
  `@@.npc;You seems angry.@@<br>
  <<has bitch>>@@.pc;Because I am, dammit!@@<<or>>@@.pc;Yeah, I am really pissed off now.@@<</has>><br>
  @@.npc;Oh, don't be like that. I know you are not like this usually.@@<<anger -1>><br>
  @@.pc;Maybe. So...@@<br>
  <<include [[NPCinteraction-ExesContinue]]>>
  `,
];