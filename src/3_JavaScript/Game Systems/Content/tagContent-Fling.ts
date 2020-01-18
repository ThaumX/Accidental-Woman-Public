
//  ███████╗██╗     ██╗███╗   ██╗ ██████╗
//  ██╔════╝██║     ██║████╗  ██║██╔════╝
//  █████╗  ██║     ██║██╔██╗ ██║██║  ███╗
//  ██╔══╝  ██║     ██║██║╚██╗██║██║   ██║
//  ██║     ███████╗██║██║ ╚████║╚██████╔╝
//  ╚═╝     ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝
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

aw.tagContent.fling = {} as IntTagContent;

// RANDOMS

aw.tagContent.fling.random = [
  `@@.npc;So, what dp you like? Music, maybe sports?@@<br>
  @@.pc;Well, I am into a lot of things actually, he-he.@@<br>
  @@.npc;We certainly need to know each other better.@@<br>
  @@.pc;Yep. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>`,
];

// PRIORITY ONE TAGS

aw.tagContent.fling.seriousIllness = [
  `
  @@.npc;You looks terrible. Are you okay?@@
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "fling" "seriousIllnessOkay">><</intreplace>>
    <<dtext "confused">>Yeah, I am mostly okay, thanks.
    <<dbutt "Help me">><<intreplace>><<ctagcontent "fling" "seriousIllnessHelp">><</intreplace>>
    <<dtext "sick">>I feel really bad... I gonna pass out now...
  <</dialogchoice>>`,
];
aw.tagContent.fling.seriousIllnessOkay = [
  `
  @@.npc;Are you sure? You really look terrible.@@<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;Oh thanks, I had literally no idea! What a news!@@<<else>>@@.pc;I really hope I get well soon, I am feeling even worse than I look.@@<</if>><br>
  @@.npc;Ugh, really, go see a doctor or something, I don't want you to die on my hands goddamit.@@<br>
  @@.pc;Gonna do that. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.seriousIllnessHelp = [
  `
  @@.npc;I better call the ambulance, hang in there, <<print ↂ.pc.main.name>>, help will come soon!@@<br>
  NPC calls the ambulance<br>
  <<if ↂ.flag.Healthcare>>
    NPC stay with you until institute doctors take you to the weird medical place. Placeholder thingy for now.
    <<link "Being drugged">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <<else>>
    NPC stay with you until general ambulance comes and takes you to the hospital. Placeholder thingy for now.
    <<link "Sleep exhausted in the ambulance">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <</if>>
`,
];
aw.tagContent.fling.illness = [
  `
  @@.npc;Are you okay? You seem a bit ill.@@
  <<dialogchoice>>
    <<dbutt "Sarcasm" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "fling" "illnessBitchy">><</intreplace>>
    <<dtext "joke">>Still looks better than you, ha.
    <<dbutt "Okay">><<intreplace>><<ctagcontent "fling" "illnessOkay">><</intreplace>>
    <<dtext "smile">>Nope, I am okay.
    <<dbutt "No">><<intreplace>><<ctagcontent "fling" "illnessBad">><</intreplace>>
    <<dtext "unamused">>That is true, I am a bit sick actually.
  <</dialogchoice>>`,
];
aw.tagContent.fling.illnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >>@@.npc;Well, I'd wont say so to be honest.@@<br>
  @@.pc;Yeah, whatever. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.illnessOkay = [
  `
  @@.npc;Well if you think so... be safe anyway.@@<br>
  @@.pc;Thanks. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.illnessBad = [
  `
  @@.npc;You should totally see a doctor, better not ignore such things.@@<br>
  @@.pc;Yeah, I know, I ll follow your advice soon I guess. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.nakedBottom = [
  `
  <<if aw.npc[setup.interact.status.npc].kink.exhibition || aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Oh, wow. Nice day for giving your kitten some fresh air, mm? Looking good by the way, I certainly like the view!@@<<elseif aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, damn, <<print ↂ.pc.main.name>> please, cover your butt with something!@@<<else>>@@.npc;Oh... well... I am pretty sure that you are aware that you are half naked, huh?@@<</if>><br>
  <<has exhibition>>You can't but wiggle your <<p assSize>> butt a bit, presenting your nakedness to the fling.<br>@@.mono;Oh yes, stare at me. Damn, that is exciting!@@<br><<arouse 2>><<orhas slut>><<arouse 2>>You can't but enjoy the attention to your naked bottom and pussy.<br><<orhas liberate>>You feel pretty comfortable with your lower part naked.<br><<orhas shame>><<stress 10 "Naked pussy convo">>You feel terribly insecure and going tomato red from embarassment.<br><<arouse -2>>@@.mono;How did I ever allow that to happen? I want just die right now.@@<br><<or>><<stress 7 "Naked pussy convo">>You feel pretty uncomfortable being exposed like this even with a fling.<br><<arouse -1>><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "fling" "NakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give <<print aw.npc[setup.interact.status.npc].main.name>> a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "fling" "NakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Apologize and cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "fling" "NakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.fling.NakedBottomPresent = [
  `<<SCX>><<SC "SD" "15">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "fling" "NakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "fling" "NakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "fling" "NakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.fling.NakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.NakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.fling.NakedBottomCover = [
  `You try to cover yourself and go on with the convo.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.NakedBottomCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed properly.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  <</if>>
  `,
];
aw.tagContent.fling.NakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, that all is pretty weird to be honest.@@<br><</if>>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.practNakedBottom = [
  `
  <<print aw.npc[setup.interact.status.npc].main.name>>'s stare reminds you about your risky dress choice. Your pussy and ass are almost visible to your fling <<has exhibition>><<arouse 2>>which makes you more arouse.<br>
  @@.mono;If I lean a bit all my private parts will be visible, mmm@@<br><<orhas slut || liberate>>which is pretty comfortable for you in fact.<br>
  @@.mono;I am pretty sure <<print aw.npc[setup.interact.status.npc].main.name>> likes the view, hehe.@@<br><<orhas shame>><<arouse -2>><<stress 5 "Naked pussy convo">>which makes you really nervous.<br><br>@@.mono;I shoudn't dress like that in a first place, oh, what I was even thinking about?@@<br><<or>><<stress 3 "Naked pussy convo">>which makes you feel uneasy.<br>
  @@.mono;Well, I am dressed risky today for sure. What will <<print aw.npc[setup.interact.status.npc].main.name>> think about me?@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, you have really risky clothes today. I'd never dare to dress like that being in your place!@@
  <<else>>@@.npc;Wow, pretty revealing clothes you have there. Enjoying the fresh air, huh?@@<</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "fling" "practNakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give <<print aw.npc[setup.interact.status.npc].main.name>> a bit better view on your lady bits.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "fling" "practNakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Ask">><<intreplace>><<ctagcontent "fling" "practNakedBottomAsk">><</intreplace>>
      <<dtext "happy">>Ask about <<print aw.npc[setup.interact.status.npc].main.name>> for opinion on your clothes.
  <</dialogchoice>>`,
];
aw.tagContent.fling.practNakedBottomPresent = [
  `<<SCX>><<SC "SD" "15">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "fling" "practNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "fling" "practNakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "fling" "practNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.fling.practNakedBottomAsk = [
  `@@.pc;So, what do you think? Do it fits me?@@<br>
  You spin in front of <<print aw.npc[setup.interact.status.npc].main.name>> presenting yourself.<br>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Well, it is pretty... obscene to be honest. Don't get me wrong, it looks good on you, just really slutty.@@<br>
  <<else>>@@.npc;Pretty nice! You are really brave with those outfits hehe. Looks good on you though.@@<br><</if>>
  @@.pc;Thanks, hehe. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.practNakedBottomCool = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.practNakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.practNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, that all is pretty weird to be honest.@@<</if>><br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.practNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.fling.buckNaked = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> stares at your nude body <<has exhibition>><<aroused 2>>which makes you more aroused.<br>
  @@.mono;Oh yeah, I can't believe I am doing that!@@<<orhas slut || liberate>>which you can deal with.<br>
  @@.mono;That is prety exciting!@@<<orhas shame>><<aroused -2>><<stress 25 "Naked convo">>which makes you panic.<br>
  @@.mono;AAA! I am totally naked in view of <<print aw.npc[setup.interact.status.npc].main.name>>!!!@@<<or>><<stress 15 "Naked convo">>which makes you feel terrible.<br>
  @@.mono;Oops, I am totally naked.@@<</has>><br>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>
  @@.npc;Oh my gosh, <<print ↂ.pc.main.name>>, why are you naked?@@<<else>>@@.npc;Oh. Well, you have left all your clothes somewhere, huh?@@<</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "fling" "buckNakedPresent">><</intreplace>>
      <<dtext "smug">>Rotate exposing yourself further.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "fling" "buckNakedCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "fling" "buckNakedCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Say bye awkwardly and run away.
  <</dialogchoice>>`,
];
aw.tagContent.fling.buckNakedPresent = [
  `<<SCX>><<SC "SD" "10">>You expose your body to <<print aw.npc[setup.interact.status.npc].main.name>> in suggestive manner.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  Aroused <<print aw.npc[setup.interact.status.npc].main.name>> propose you to have sex.<br>
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "fling" "buckNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "fling" "buckNakedPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "fling" "buckNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.fling.buckNakedPresentChat = [
  `@@.pc;Ehh... Sorry...@@<br>
  You try to go on with the convo as if nothing happened.
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.buckNakedCover = [
  `You try to cover your body with hands which is not super effective. NPC tries his best to ignore your nakedness.<br>
  @@.npc;W-well, what were we talking about?@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.buckNakedCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  <<else>>
  <<include [[NPCinteraction-FlingContinue]]>>
  <</if>>
  <</if>>`,
];
aw.tagContent.fling.buckNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, you are such a weirdo, you know?@@<</if>><br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.buckNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.fling.wetClothes = [
  `<<if ↂ.pc.clothes.keys.bra === 0>>You notice <<print aw.npc[setup.interact.status.npc].main.name>> looks at your chest and realise that your <<p nipl.q>> <<p nipples.n>> are visible through the wet clothes.<br>
  <<has exhibition>><<arouse 1>>@@.mono;Oh yeah, I like that.@@<<orhas slut>>@@.mono;That is certainly drawing some attention.@@<<orhas shame>><<stress 7 "Wet clothes convo">>@@.mono;Oh shit, my nipples are showing!@@<<or>><<stress 2 "Wet clothes convo">>@@.mono;Oops, better cover that!@@<</has>><br>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>It seems, <<if aw.npc[setup.interact.status.npc].main.female>>she is doing her<<else>>he is doing his best<</if>> to ignore your clearly visible nipples.<<else>>@@.npc;You are aware about your nipples being visible, yep?@@<</if>>
  <<dialogchoice>>
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "fling" "wetClothesCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "fling" "wetClothesCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>
  <<else>>@@.npc;You better change before you catch cold.@@<br>
  @@.pc;Yeah... that was pretty hilarious situation that got me wet like this. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  <</if>>`,
];
aw.tagContent.fling.wetClothesCover = [
  `You cover your <<p breastShape>> breast with your hand.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.wetClothesCool = [
  `<<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  <<else>>
  <<include [[NPCinteraction-FlingContinue]]>>
  <</if>>`,
];
aw.tagContent.fling.lightPheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 3 >>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 3 >><</if>><<include [[NPCinteraction-FlingContinue]]>>`,
];
aw.tagContent.fling.pheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>You notice some sexual interest sparkling in the eyes of <<print aw.npc[setup.interact.status.npc].main.name>>.<</if>>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Well, I just wanted to say, I am pretty happy to be together with you. I know, that sounds weird, but I really like hanging on with you.@@<br>
  <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> looks a bit confused with sudden confession but still feels comfortable around you glancing with some awe.<br>
  @@.pc;Hehe, thanks. BFF, right? So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.hairyPits = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>@@.npc;Will you ever get rid of those bushes?@@<br>
  @@.pc;What?@@<br>
  @@.npc;Armpit ones. It is not 1970, you know? Gosh, shave them off, please.@@
  <<dialogchoice>>
    <<dbutt "Okay">><<intreplace>><<ctagcontent "fling" "hairyPitsOkay">><</intreplace>>
    <<dtext "neutral">>Okay, okay. I ll do it, happy now?
    <<dbutt "Nope">><<intreplace>><<ctagcontent "fling" "hairyPitsNope">><</intreplace>>
    <<dtext "silly">>My armpits - my business. Deal with this.
  <</dialogchoice>>`,
];
aw.tagContent.fling.hairyPitsOkay = [`
@@.pc;Okay, okay. I ll do it, happy now?@@<br>
@@.npc;Wohoo!@@<br>
<<include [[NPCinteraction-FlingContinue]]>>
`];
aw.tagContent.fling.hairyPitsNope = [`
<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>@@.pc;My armpits - my business. Deal with this.@@<br>
@@.npc;Eww, you are disgusting.@@<br>
@@.pc;I know. So...@@<br>
<<include [[NPCinteraction-FlingContinue]]>>
`];
aw.tagContent.fling.clownMakeup = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> starts laughing.<br>
  @@.npc;Ha-ha, you girl look particularly good today! That makeup is really clown-like!@@
  <<dialogchoice>>
    <<dbutt "Screw you" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "fling" "clownMakeupConfront">><</intreplace>>
    <<dtext "neutral">>Go fuck yourself.
    <<dbutt "Laugh" "!ↂ.pc.trait.intro">><<intreplace>><<ctagcontent "fling" "clownMakeupLaugh">><</intreplace>>
    <<dtext "awkward">>Yeah, I know, he-he, looking pretty ridiculous.
    <<dbutt "Act cool">><<intreplace>><<ctagcontent "fling" "clownMakeupCool">><</intreplace>>
    <<dtext "cool">>Go on with the convo ignoring the chuckles
    <<dbutt "Sad">><<intreplace>><<ctagcontent "fling" "clownMakeupSad">><</intreplace>>
    <<dtext "cry">>Oh, I really look that bad?
  <</dialogchoice>>`,
];
aw.tagContent.fling.clownMakeupConfront = [
  `@@.pc;Oh, just go fuck yourself.@@<br>
  <<print aw.npc[setup.interact.status.npc].main.name>> doesn't seem to take your rebuff closely.
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.clownMakeupLaugh = [
  `@@.pc;Yeah, I know, he-he, looking pretty ridiculous.@@<br>
  @@.npc;Oh, so fix it, he-he. You are a girl or what?@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.clownMakeupCool = [
  `You go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.clownMakeupSad = [
  `<<stress 5 "Clown makeup convo">>@@.pc;Oh, I really look that bad?@@<br>
  Your eyes start watering and <<print aw.npc[setup.interact.status.npc].main.name>> finally stops giggling.<br>
  @@.npc;Oww, sorry I didn't meant to...@@<br>
  @@.pc;You think this is funny? That I look like a scank?@@<br>
  @@.npc;No, I was just... See, I am sorry! Please don't cry.@@<br>
  After some time you feel better and stop crying.<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.withdrawal = [
  `@@.mono;I really need to get some...@@<br>
  @@.npc;<<print ↂ.pc.main.name>>, do you even listening?@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];
aw.tagContent.fling.latePreg = [
  `@@.npc;Oh, that is some solid belly, he-he.@@<br>
  <<if ↂ.pc.trait.maternal == 1>>@@.pc;Yes, I ll pop some beautiful baby any time soon. I am soo happy!@@<br>
  <<else>>@@.pc;Yeah. This is hard to carry around already, hope I ll give birth soon!@@<br>
  <</if>>@@.npc;I am so happy for you!@@<br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>`,
];
aw.tagContent.fling.drunk = [
  `@@.pc;Hii frend! Long time no see!@@<br>
  @@.npc;Oh, you are so shitfaced. You can't even stand straight, ha-ha!@@
  <<dialogchoice>>
    <<dbutt "Nah" >><<intreplace>><<ctagcontent "fling" "drunkYeah">><</intreplace>>
    <<dtext "laugh">>What? No, I m sobr as a jdge!
    <<dbutt "Yeeah">><<intreplace>><<ctagcontent "fling" "drunkYeah">><</intreplace>>
    <<dtext "proud">>Bloody hell I am!
    <<dbutt "Horny">><<intreplace>><<ctagcontent "fling" "drunkFuck">><</intreplace>>
    <<dtext "love">>Wanna fuck me? I want to fuck rght now!
    <<dbutt "Pass out">><<run setup.interact.exit()>><<run setup.sleep.go();>>
    <<dtext "sleep">>I am sooo slepy, beter lay dwn just fur a tiny sec...
  <</dialogchoice>>`,
];
aw.tagContent.fling.drunkYeah = [
  `@@.npc;Oh, I better take you to your home.@@<br>
  @@.pc;But I wanna prty!@@<br>
  @@.npc;Well, the party is certainly over for you, heh. Come on, let's get you to the bed.@@<br>
  <<link "Wait, whre are we gong?">><<addtime 54>><<gotomap "home" "foyer">><<run setup.sleep.go();>><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.fling.drunkFuck = [
  `<<if aw.npc[setup.interact.status.npc].main.female === true>>@@.pc;Wanna fuck? I ll lck you so hrd you will forget bout anything!@@<br>
    @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
    <<link "You dnt want me?">><<intreplace>><<ctagcontent "fling" "drunkYeah">><</intreplace>><</link>>
  <<else>><<SCX>><<SC "SD" 20>><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 7 >>@@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Hmm... why not? I hope you won't regret it tomorrow though...@@<br>
      <<link "Uhm? We are gonna fck or wht?">><<run setup.interact.exit()>><</link>>
    <<else>>@@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
      <<link "You dnt like me?">><<intreplace>><<ctagcontent "fling" "drunkYeah">><</intreplace>><</link>>
    <</if>>
  <</if>>`,
];
aw.tagContent.fling.mindbreak = [
  `You start to cry all of a sudden.<br>
  @@.npc;<<print ↂ.pc.main.name>>, what happened, dear?@@<br>
  @@.pc;I... I just... I feel like everything goes to hell. Whole my life is ...sob... shattered...@@<br>
  @@.npc;Ugh, there, there. It will be okay, I am sure.@@<br>
  @@.pc;You just don't understand, all that happened ...sob... to me, it is just too much to handle...@@<br>
  <<if ↂ.pc.trait.will > 4 >>You somehow manage to gain your reason back<<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><br>
  @@.pc;I am so sorry. It was really tough times lately.@@<br>
  @@.npc;Oh, it is okay.@@
  <<include [[NPCinteraction-FlingContinue]]>>
  <<else>><<addtime 13>><<set ↂ.pc.groom.makeup.clown = true>><<stress -10 "Mindbreak convo">>You start histerically giggling.<br>
  @@.npc;Oh, poor you. Try to calm down, I ll drive you home...@@<br>
  You cry all the way while <<print aw.npc[setup.interact.status.npc].main.name>> drive the car to your house, but start to feel better when you get to the house. <<print aw.npc[setup.interact.status.npc].main.name>> leaves you in your house after getting sure you are okay now.<br>
  <<link "Say goodbye">><<addtime 54>><<gotomap "home" "foyer">><<run setup.interact.exit()>><</link>>
  <</if>>`,
];
aw.tagContent.fling.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>
    You feel your juices running down your inner thights with no panties in a way to stop them.<br>
    <<has exhibition>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will notice that. That is so embarassingly exciting!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>><br>
  <<else>>
    You feel your juices making a slippery mess slowly soaking through your panties.<br>
    <<has slut>>@@.mono;Speaking with a person while being flooded like that is so naughty!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>><br>
  <</if>><<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.pussyAccess = [
  `<p>@@.mono;Oh, I fell a breeze on my bare pussy. I wonder if <<n setup.interact.status.npc "heshe.q">> notices that I don't wear any panties, tee-hee.@@</p>
  <<include [[NPCinteraction-FlingContinue]]>>`,
];

// OTHER TAGS

aw.tagContent.fling.stressed = [
  `@@.npc;Hey, you seem stressed. What happened?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "fling" "stressedNope">><</intreplace>>
    <<dtext "smile">>It is fine, really.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "fling" "stressedAbit">><</intreplace>>
    <<dtext "scared">>I am really stressed these days.
    <<dbutt "Confront" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "fling" "stressedBitch">><</intreplace>>
    <<dtext "unamused">>Did I ask you for opinion?
  <</dialogchoice>>
  `,
];

aw.tagContent.fling.stressedNope = [
  `@@.pc;It is fine, really.@@<br>
  @@.npc;Oh, good to hear.@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.stressedAbit = [
  `<<has extro>>@@.pc;I am really stressed these days. It was complicated, I mean work and everything in general. Just want to hide now honestly.@@<<or>>@@.pc;I am really stressed these days.@@<</has>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><br>
  @@.npc;Ouch, poor girl. Maybe take a break on your work or maybe you should arrange a date with somebody nice, just to chill out a bit you know...@@
  <<dialogchoice>>
    <<dbutt "Sure">><<intreplace>><<set _npc = setup.interact.status.npc>><<datescheduler _npc>><</intreplace>>
    <<dtext "wink">>I got your hint, hehe. Sure, why not?
    <<dbutt "Maybe">><<intreplace>><<ctagcontent "fling" "stressedYes">><</intreplace>>
    <<dtext "muted">>Well, maybe I really should take a break, you are right.
  <</dialogchoice>>
  `,
];

aw.tagContent.fling.stressedYes = [
  `@@.pc;Well, maybe I really should take a break, you are right.@@<br>
  @@.npc;Hmmm. Yeah.@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.depressed = [
  `@@.npc;Hey, you looks sad, what happened?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "fling" "depressedNo">><</intreplace>>
    <<dtext "smile">>It is fine, really.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "fling" "depressedYes">><</intreplace>>
    <<dtext "sad">>Yeah, I am not in particularly bright mood today actually.
  <</dialogchoice>>
  `,
];

aw.tagContent.fling.depressedNo = [
  `@@.pc;It is fine, really.@@<br>
  @@.npc;Oh, okay. Just don't let this bad mood conquer you.@@<br>
  @@.pc;Yeah. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.depressedYes = [
  `@@.pc;Yeah, I am not in particularly bright mood today actually.@@<br>
  @@.npc;Hey, Maybe I could cheer you up? Like a date this week or next?@@
  <<dialogchoice>>
    <<dbutt "Sure">><<intreplace>><<set _npc = setup.interact.status.npc>><<datescheduler _npc>><</intreplace>>
    <<dtext "wink">>He-he, okay, sounds like a nice idea!
    <<dbutt "Maybe">><<intreplace>><<ctagcontent "fling" "depressedRefuseDate">><</intreplace>>
    <<dtext "muted">>Well, I am not in the mood actually.
  <</dialogchoice>>
  `,
];

aw.tagContent.fling.depressedRefuseDate = [
  `@@.pc;Well, I am not in the mood actually.@@<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 4 >><br>
  @@.npc;Oh, okay.@@<br>
  @@.pc;Yeah. So...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.tipsy = [
  `@@.npc;Hey, party time! Where I can find booze for myself too?@@<br>
  @@.pc;Ha-ha, jealous?@@<br>
  @@.npc;You bet!@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.athleticClothes = [
  `@@.npc;Going for a jog or something?@@<br>
  @@.pc;Well, yeah, trying to keep myself in shape.@@<br>
  @@.npc;Good for you I guess...@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
  `@@.npc;Got ready to pump iron?@@<br>
  @@.pc;It is really good for health and weight too actually.@@<br>
  @@.npc;Way too go then.@@
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.kinkyClothes = [
  `<<if aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Wow, neat! What a sexy clothes, girl!@@<<elseif aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh my, this clothes are so lewd, are you sure it is okay to wear it in public?@@<<else>>@@.npc;He-he, decided to dress slutty, <<print ↂ.pc.main.name>>?@@<</if>><br>
  <<has liberate>>@@.pc;Life is too short to dress modestly!@@<<orhas slut>>@@.pc;I like drawing attention to my most delicious parts you know.@@<<orhas shame>><<stress 4 "Kinky clothes convo">>@@.pc;I really don't know how I wound up wearing this, I am really blushing all the day long.@@<<or>>@@.pc;Well, can a girl wear something sexy from time to time, right?@@<</has>><br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.nightwear = [
  `@@.npc;Is this a nightwear? Why are you dressed in it here?@@<br>
  @@.pc;I have nothing to answer actually.@@<br>
  @@.npc;Sometimes you are really weird, you know?@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.cuteClothes = [
  `@@.npc;Aw, you are dressed so cute today!@@<<set aw.npc[setup.interact.status.npc].rship.likePC += 1 >><br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.superCuteClothes = [
  `@@.npc;Wow, you a dressed amazingly cute!@@<<set aw.npc[setup.interact.status.npc].rship.likePC += 2 >><br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.slovenlyClothes = [
  `@@.npc;Not feeling like being overdressed today, huh?@@<br>
  @@.pc;Gosh, don't even ask. So...@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.swimwear = [
  `@@.npc;Care for swimming? Nice swimsuit by the way!@@<br>
  @@.pc;Thanks, heh. So...@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.damagedClothes = [
  `@@.npc;You clothes, they are...@@<br>
  @@.pc;What?@@<br>
  @@.pc;Well, maybe you should consider buying new ones.@@<br>
  <<has bitch>>@@.pc;I did not ask for an advice. So...@@<<or>>@@.pc;Well it seems so. So...@@<</has>><br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.stainedClothes = [
  `@@.npc;Hey, what is it on your clothes?@@<br>
  @@.pc;What do you mean?@@<br>
  @@.pc;Those stains. Looks weird.@@
  <<dialogchoice>>
    <<dbutt "Cum" "ↂ.pc.kink.slut">><<intreplace>><<ctagcontent "fling" "stainedClothesCum">><</intreplace>>
    <<dtext "cool">>I am pretty sure this is cum, silly.
    <<dbutt "Dunno">><<intreplace>><<ctagcontent "fling" "stainedClothesDunno">><</intreplace>>
    <<dtext "awkward">>No idea actually. Mayo, maybe?
  <</dialogchoice>>
  `,
];

aw.tagContent.fling.stainedClothesCum = [
  `@@.pc;I am pretty sure this is cum, silly.@@<<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 4 >><br>
  @@.npc;Wow. You are pretty open with all this stuff, you know? Better clean yourself though.@@<br>
  @@.pc;Well, will do. So...@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.stainedClothesDunno = [
  `@@.pc;No idea actually. Mayo, maybe?@@<br>
  <<has shame>>@@.mono;Oh shit! <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>>noticed! Panic!@@<<stress 8 "stained clothes convo">><</has>><br>
  @@.npc;Looks more like... whatever, you should clean this, girl!@@<br>
  @@.pc;Yeah, will do. So...@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];

aw.tagContent.fling.angry = [
  `@@.npc;Hey, what's up? Why so grumpy?@@<br>
  <<has bitch>>@@.pc;I am grumpy? DID I FUCKING ASKED FOR YOUR OPINION? I AM MAD AS FUCK! Goddamit, you better hide from my view now, before I'll go berserk!!@@<<or>>@@.pc;Yes, I am angry. If you'll keep asking you'll be the next victim.@@<</has>><br>
  @@.npc;Ugh, okay, calm down girl!@@<br>
  @@.pc;It is not that easy. So...@@<br>
  <<include [[NPCinteraction-FlingContinue]]>>
  `,
];