
//  ███████╗██████╗ ██╗███████╗███╗   ██╗██████╗
//  ██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔══██╗
//  █████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║  ██║
//  ██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║  ██║
//  ██║     ██║  ██║██║███████╗██║ ╚████║██████╔╝
//  ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝
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

aw.tagContent.friend = {} as IntTagContent;

// RANDOMS

aw.tagContent.friend.random = [`
@@.npc;Who is more powerful, Captain Bull or Busty Woman?@@<br>
@@.pc;It depends. Captain is stronger but Busty has her hypno tricks, so it is hard to tell actually. Hmm. I d say it will be Busty Woman after all.@@<br>
@@.npc;Captain can use his "Hammertime" ability! Did you thought about that?@@<br>
@@.pc;But Busty can also do her "Devastating blow" so Captain will have no chances.@@<br>
@@.npc;Meh, Bull is much cooler and he will certainly win.@@<br>
@@.pc;You are wrong, but I'll let you live with this. So...@@<br>
<<include [[NPCinteraction-FriendsContinue]]>>`,
`@@.npc;Did you heard? That girl got lost in the woods.@@<br>
@@.pc;Angler Woods you mean?@@<br>
@@.npc;Yeah, they can't find her three days straight already.@@<br>
@@.pc;Well, let's hope for the best. So...@@<br>
<<include [[NPCinteraction-FriendsContinue]]>>`,
`@@.npc;Congratulations to me, I got promoted!@@<br>
@@.pc;Yay! I hope the wage skyrocketed too, hehe.@@<br>
@@.npc;Well, not that much but still, it is pretty nice.@@<br>
@@.pc;I am really glad for you! So...@@<br>
<<include [[NPCinteraction-FriendsContinue]]>>`,
`@@.npc;The weather is shitty, why this city is not in Florida or somewhere?@@<br>
@@.pc;Come on, New England is a nice place, don't be such a grumbler!@@<br>
@@.npc;Brr.@@<br>
@@.pc;Just dress better and you ll be fine, pussy. So...@@<br>
<<include [[NPCinteraction-FriendsContinue]]>>`,
];

// PRIORITY ONE TAGS

aw.tagContent.friend.seriousIllness = [
  `
  @@.npc;You looks terrible. Are you okay?@@
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "friend" "seriousIllnessOkay">><</intreplace>>
    <<dtext "confused">>Yeah, I am mostly okay, thanks.
    <<dbutt "Help me">><<intreplace>><<ctagcontent "friend" "seriousIllnessHelp">><</intreplace>>
    <<dtext "sick">>I feel really bad... I am gonna pass out now...
  <</dialogchoice>>`,
];
aw.tagContent.friend.seriousIllnessOkay = [
  `
  @@.npc;Are you sure? You really look terrible.@@<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;Oh thanks, I had literally no idea! What a news!@@<br><<else>>@@.pc;I really hope I get well soon, I am feeling even worse than I look.@@<br><</if>>
  @@.npc;Ugh, really, go see a doctor or something, I don't want you to die on my hands goddamit.@@<br>
  @@.pc;Gonna do that. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.seriousIllnessHelp = [
  `@@.npc;I better call the ambulance, hang in there, girl, help will come soon!@@<br>
  NPC calls the ambulance<br><br>
  <<if ↂ.flag.Healthcare>>
    NPC stay with you until institute doctors take you to the weird medical place. Placeholder thingy for now.<br>
    <<link "Being drugged">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <<else>>
    NPC stay with you until general ambulance comes and takes you to the hospital. Placeholder thingy for now.<br>
    <<link "Sleep exhausted in the ambulance">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <</if>>
`,
];
aw.tagContent.friend.illness = [
  `
  @@.npc;Are you okay? You seems a bit ill.@@
  <<dialogchoice>>
    <<dbutt "Sarcasm" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "friend" "illnessBitchy">><</intreplace>>
    <<dtext "joke">>Still looks better than you, ha.
    <<dbutt "Okay">><<intreplace>><<ctagcontent "friend" "illnessOkay">><</intreplace>>
    <<dtext "smile">>Nope, I am okay.
    <<dbutt "No">><<intreplace>><<ctagcontent "friend" "illnessBad">><</intreplace>>
    <<dtext "unamused">>That is true, I am a bit sick actually.
  <</dialogchoice>>`,
];
aw.tagContent.friend.illnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >>
  @@.npc;Well, I'd wont say so to be honest.@@<br>
  @@.pc;Yeah, whatever. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.illnessOkay = [
  `
  @@.npc;Well if you think so... be safe anyway.@@<br>
  @@.pc;Thanks. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.illnessBad = [
  `
  @@.npc;You should totally see a doctor, better not ignore such things.@@<br>
  @@.pc;Yeah, I know, I ll follow your advice soon I guess. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.nakedBottom = [
  `
  <<if aw.npc[setup.interact.status.npc].kink.exhibition || aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Oh, wow. Nice day for giving your kitten some fresh air, mm? Looking good by the way.@@<<elseif aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, damn, <<print ↂ.pc.main.name>> please, cover your butt with something!@@<<else>>@@.npc;Oh... well... I am pretty sure that you are aware that you are half naked, huh?@@<</if>><br>
  <<has exhibition>>You can't but wiggle your <<p assSize>> butt a bit, presenting your nakedness to the friend.<br>@@.mono;Oh yes, stare at me. Damn, that is exciting!@@<br>
  @@.pc;Do you like it?@@<br><<arouse 2>><<orhas slut>><<arouse 2>>You can't but enjoy the attention to your naked bottom and pussy.<br><<orhas liberate>>You feel pretty comfortable with your lower part naked.<br><<orhas shame>><<stress 10 "Naked pussy convo">>You feel terribly insecure and going tomato red from embarassment.<br><<arouse -2>>@@.mono;How did I ever allow that to happen? I want just die right now.@@<br><<or>><<stress 7 "Naked pussy convo">>You feel pretty uncomfortable being exposed like this even with a friend.<br><<arouse -1>><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "friend" "NakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give your friend a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "friend" "NakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Apologize and cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "friend" "NakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.friend.NakedBottomPresent = [
  `<<SCX>><<SC "SD" "15">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses the friend. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "friend" "NakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and <<print aw.npc[setup.interact.status.npc].main.name>> is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "friend" "NakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "friend" "NakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.friend.NakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.NakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.friend.NakedBottomCover = [
  `You try to cover yourself and go on with the convo.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.NakedBottomCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed properly.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-FriendsContinue]]>><</if>>
  `,
];
aw.tagContent.friend.NakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, that all is pretty weird to be honest.@@<br><</if>>
  <<include [[NPCinteraction-FriendsContinue]]>><</link>>
  `,
];
aw.tagContent.friend.practNakedBottom = [
  `
  <<print aw.npc[setup.interact.status.npc].main.name>>'s stare reminds you about your risky dress choice. Your pussy and ass are almost visible to your friend <<has exhibition>><<arouse 2>>which makes you more arouse <br>
  @@.mono;If I lean a bit all my private parts will be visible, mmm@@<br><<orhas slut || liberate>>which is pretty comfortable for you in fact.<br>
  @@.mono;I am pretty sure <<print aw.npc[setup.interact.status.npc].main.name>> likes the view, hehe.@@<br><<orhas shame>><<arouse -2>><<stress 5 "Naked pussy convo">>which makes you really nervous.<br>@@.mono;I shoudn't dress like that in a first place, oh, what I was even thinking about?@@<br><<or>><<stress 3 "Naked pussy convo">>which makes you feel uneasy.<br>
  @@.mono;Well, I am dressed risky today for sure. What will <<print aw.npc[setup.interact.status.npc].main.name>> think about me?@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, you have really risky clothes today. I'd never dare to dress like that being in your place!@@<br>
  <<else>>@@.npc;Wow, pretty revealing clothes you have there. Enjoying the fresh air, huh?@@<br><</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "friend" "practNakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give a friend a bit better view on your lady bits.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "friend" "practNakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Ask">><<intreplace>><<ctagcontent "friend" "practNakedBottomAsk">><</intreplace>>
      <<dtext "happy">>Ask about your friend for opinion on your clothes.
  <</dialogchoice>>`,
];
aw.tagContent.friend.practNakedBottomPresent = [
  `<<SCX>><<SC "SD" "15">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses the friend. They propose you to have sex.<br>
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "friend" "practNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@<br>
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "friend" "practNakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "friend" "practNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.friend.practNakedBottomAsk = [
  `@@.pc;So, what do you think? Do it fits me?@@<br>
  You spin in front of <<print aw.npc[setup.interact.status.npc].main.name>> presenting yourself.<br>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Well, it is pretty... obscene to be honest. Don't get me wrong, it looks good on you, just really slutty.@@<br>
  <<else>>@@.npc;Pretty nice! You are really brave with those outfits hehe. Looks good on you though.@@<br><</if>>
  @@.pc;Thanks, hehe. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.practNakedBottomCool = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.practNakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.NakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, that all is pretty weird to be honest.@@<br><</if>>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.practNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.friend.buckNaked = [
  `Friend stares at your nude body <<has exhibition>><<aroused 2>>which makes you more aroused<br>
  @@.mono;Oh yeah, I can't believe I am doing that!@@<br><<orhas slut || liberate>>which you can deal with.<br>
  @@.mono;That is prety exciting!@@<<orhas shame>><<aroused -2>><<stress 25 "Naked convo">>which makes you panic.<br>
  @@.mono;AAA! I am totally naked in view of <<print aw.npc[setup.interact.status.npc].main.name>>!!!@@<<or>><<stress 15 "Naked convo">>which makes you feel terrible.<br>
  @@.mono;Oops, I am totally naked.@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh my gosh, <<print ↂ.pc.main.name>>, why are you naked?@@<br><<else>>@@.npc;Oh. Well, you have left all your clothes somewhere, huh?@@<br><</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "friend" "buckNakedPresent">><</intreplace>>
      <<dtext "smug">>Rotate before the friend exposing yourself further.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "friend" "buckNakedCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "friend" "buckNakedCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Say bye awkwardly and run away.
  <</dialogchoice>>`,
];
aw.tagContent.friend.buckNakedPresent = [
  `<<SCX>><<SC "SD" "15">>You expose your body to your friend in suggestive manner.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses the friend. They propose you to have sex.<br>
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "friend" "buckNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@<br>
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "friend" "buckNakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "friend" "buckNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.friend.buckNakedPresentChat = [
  `@@.pc;Ehh... Sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.buckNakedCover = [
  `You try to cover your body with hands which is not super effective. NPC tries his best to ignore your nakedness.<br>
  @@.npc;W-well, what were we talking about?@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.buckNakedCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  <<else>>
  <<include [[NPCinteraction-FriendsContinue]]>>
  <</if>>
  <</if>>`,
];
aw.tagContent.friend.buckNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, you are such a weirdo, you know?@@<br><</if>>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];
aw.tagContent.friend.buckNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.friend.wetClothes = [
  `<<if ↂ.pc.clothes.keys.bra === 0>>You notice <<print aw.npc[setup.interact.status.npc].main.name>> looks at your chest and realise that your <<p nipl.q>> <<p nipples.n>> are visible through the wet clothes.<br>
  <<has exhibition>><<arouse 1>>@@.mono;Oh yeah, I like that.@@<<orhas slut>>@@.mono;That is certainly drawing some attention.@@<<orhas shame>><<stress 7 "wet clothes convo">>@@.mono;Oh shit, my nipples are showing!@@<<or>><<stress 2 "wet clothes convo">>@@.mono;Oops, better cover that!@@<</has>><br>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>It seems, <<if aw.npc[setup.interact.status.npc].main.female>>she is doing her<<else>>he is doing his best<</if>> to ignore your clearly visible nipples.<br><<else>>@@.npc;You are aware about your nipples being visible, yep?@@<br><</if>>
  <<dialogchoice>>
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "friend" "wetClothesCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "friend" "wetClothesCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>
  <<else>>
  @@.npc;You better change before you catch cold.@@<br>
  @@.pc;Yeah... that was pretty hilarious situation that got me wet like this. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  <</if>>`,
];
aw.tagContent.friend.wetClothesCover = [
  `You cover your <<p breastShape>> breast with your hand.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.wetClothesCool = [
  `<<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  <<else>>
  <<include [[NPCinteraction-FriendsContinue]]>>
  <</if>>`,
];
aw.tagContent.friend.lightPheromones = [
  `<<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.pheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 1 >>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 1 >><</if>>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>
  @@.npc;Well, I just wanted to say, I am pretty happy that you are my friend. I know, that sounds weird, but I really like hanging on with you.@@<br>
  <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> looks a bit confused with sudden confession but still feels comfortable around you glancing with some awe.<br>
  @@.pc;Hehe, thanks. BFF, right? So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.hairyPits = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 1 >>@@.npc;Will you ever get rid of those bushes?@@<br>
  @@.pc;What?@@<br>
  @@.npc;Armpit ones. It is not 1970, you know? Gosh, shave them off, please.@@<br>
  <<dialogchoice>>
    <<dbutt "Okay">><<intreplace>><<ctagcontent "friend" "hairyPitsOkay">><</intreplace>>
    <<dtext "neutral">>Okay, okay. I ll do it, happy now?
    <<dbutt "Nope">><<intreplace>><<ctagcontent "friend" "hairyPitsNope">><</intreplace>>
    <<dtext "silly">>My armpits - my business. Deal with this.
  <</dialogchoice>>`,
];
aw.tagContent.friend.hairyPitsOkay = [`
@@.pc;Okay, okay. I ll do it, happy now?@@<br>
@@.npc;Wohoo!@@<br>
<<include [[NPCinteraction-FriendsContinue]]>>
`];
aw.tagContent.friend.hairyPitsNope = [`
@@.pc;My armpits - my business. Deal with this.@@<br>
@@.npc;Eww, you are disgusting.@@<br>
@@.pc;I know. So...@@<br>
<<include [[NPCinteraction-FriendsContinue]]>>
`];
aw.tagContent.friend.clownMakeup = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> starts laughing.<br>
  @@.npc;Ha-ha, you girl look particularly good today! That makeup is really clown-like!@@<br>
  <<dialogchoice>>
    <<dbutt "Screw you" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "friend" "clownMakeupConfront">><</intreplace>>
    <<dtext "neutral">>Go fuck yourself.
    <<dbutt "Laugh" "!ↂ.pc.trait.intro">><<intreplace>><<ctagcontent "friend" "clownMakeupLaugh">><</intreplace>>
    <<dtext "awkward">>Yeah, I know, he-he, looking pretty ridiculous.
    <<dbutt "Act cool">><<intreplace>><<ctagcontent "friend" "clownMakeupCool">><</intreplace>>
    <<dtext "cool">>Go on with the convo ignoring the chuckles
    <<dbutt "Sad">><<intreplace>><<ctagcontent "friend" "clownMakeupSad">><</intreplace>>
    <<dtext "cry">>Oh, I really look that bad?
  <</dialogchoice>>`,
];
aw.tagContent.friend.clownMakeupConfront = [
  `@@.pc;Oh, just go fuck yourself.@@<br>
  NPC doesn't seem to take your rebuff closely.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.clownMakeupLaugh = [
  `@@.pc;Yeah, I know, he-he, looking pretty ridiculous.@@<br>
  @@.npc;Oh, so fix it, he-he. You are a girl or what?@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.clownMakeupCool = [
  `You go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.clownMakeupSad = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<stress 5 "clown makeup convo">>
  @@.pc;Oh, I really look that bad?@@<br>
  Your eyes start watering and <<print aw.npc[setup.interact.status.npc].main.name>> finally stops giggling.<br>
  @@.npc;Oww, sorry I didn't meant to...@@<br>
  @@.pc;You think this is funny? That I look like a scank?@@<br>
  @@.npc;No, I was just... See, I am sorry! Please don't cry.@@<br>
  After some time you feel better and stop crying.<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.withdrawal = [
  `@@.mono;Oh I don't feel pretty shitty.@@<br>
  @@.npc;Hey, <<print ↂ.pc.main.name>>, are you ok?@@<br>
  @@.pc;Ah? Yes-yes, it is okay, I just drifted in thoughts for a moment.@@<br>
  @@.mono;Ugh, I really need to deal with that withdrawal soon.@@<br>`,
];
aw.tagContent.friend.latePreg = [
  `@@.npc;Oh, that is some solid belly, he-he.@@<br>
  <<if ↂ.pc.trait.maternal == 1>>@@.pc;Yes, I ll pop some beautiful baby any time soon. I am soo happy!@@<br>
  <<else>>@@.pc;Yeah. This is hard to carry around already, hope I ll give birth soon!@@<br>
  <</if>>@@.npc;I am so happy for you!@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];
aw.tagContent.friend.drunk = [
  `@@.pc;Hii frend! Long time no see!@@<br>
  @@.npc;Oh, you are so shitfaced. You can't even stand straight, ha-ha!@@<br>
  <<dialogchoice>>
    <<dbutt "Nah" >><<intreplace>><<ctagcontent "friend" "drunkYeah">><</intreplace>>
    <<dtext "laugh">>What? No, I m sobr as a jdge!
    <<dbutt "Yeeah">><<intreplace>><<ctagcontent "friend" "drunkYeah">><</intreplace>>
    <<dtext "proud">>Bloody hell I am!
    <<dbutt "Horny">><<intreplace>><<ctagcontent "friend" "drunkFuck">><</intreplace>>
    <<dtext "love">>Wanna fuck me? I want to fuck rght now!
    <<dbutt "Pass out">><<run setup.interact.exit()>><<run setup.sleep.go();>>
    <<dtext "sleep">>I am sooo slepy, beter lay dwn just fur a tiny sec... 
  <</dialogchoice>>`,
];
aw.tagContent.friend.drunkYeah = [
  `@@.npc;Oh, I better take you to your home.@@<br>
  @@.pc;But I wanna prty!@@<br>
  @@.npc;Well, the party is certainly over for you, heh. Come on, let's get you to the bed.@@<br>
  <<link "Wait, whre are we gong?">><<addtime 54>><<gotomap "home" "foyer">><<run setup.sleep.go();>><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.friend.drunkFuck = [
  `<<if aw.npc[setup.interact.status.npc].main.female === true>>@@.pc;Wanna fuck? I ll lck you so hrd you will forget bout anything!@@<br>
    @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
    <<link "You dnt want me?">><<intreplace>><<ctagcontent "friend" "drunkYeah">><</intreplace>><</link>>
  <<else>><<SCX>><<SC "SD" 20>><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 7 >>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Hmm... you pretty much won't remember this tomorrow anyway, yes?@@<br>
      <<link "Uhm? We are gonna fck?">><<run setup.interact.exit()>><</link>>
    <<else>>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
      <<link "You dnt like me?">><<intreplace>><<ctagcontent "friend" "drunkYeah">><</intreplace>><</link>>
    <</if>>
  <</if>>`,
];
aw.tagContent.friend.mindbreak = [
  `You start to cry all of a sudden.<br>
  @@.npc;<<print ↂ.pc.main.name>>, what happened, dear?@@<br>
  @@.pc;I... I just... I feel like everything goes to hell. Whole my life is ...sob... shattered...@@<br>
  @@.npc;Ugh, there, there. It will be okay, I am sure.@@<br>
  @@.pc;You just don't understand, all that happened ...sob... to me, it is just too much to handle...@@<br>
  <<if ↂ.pc.trait.will > 4 >>You somehow manage to gain your reason back<<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >>
  @@.pc;I am so sorry. It was really tough times lately.@@<br>
  @@.npc;Oh, it is okay.@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  <<else>><<addtime 13>><<set ↂ.pc.groom.makeup.clown = true>><<stress -10 "mindbreak convo">>You start histerically giggling.<br>
  @@.npc;Oh, poor you. Try to calm down, I ll drive you home...@@<br><<addtime 54>>
  You cry all the way while <<print aw.npc[setup.interact.status.npc].main.name>> drive the car to your house, but start to feel better when you get to the house. <<print aw.npc[setup.interact.status.npc].main.name>> leaves you in your house after getting sure you are okay now.<br>
  <<link "Say goodbye">><<addtime 54>><<gotomap "home" "foyer">><<run setup.interact.exit()>><</link>>
  <</if>>`,
];
aw.tagContent.friend.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>
    You feel your juices running down your inner thights with no panties in a way to stop them.<br>
    <<has exhibition>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will notice that. That is so embarassingly exciting!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>>
  <<else>>
    You feel your juices making a slippery mess slowly soaking through your panties.<br><<has slut>>@@.mono;Speaking with a person while being flooded like that is so naughty!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>>
  <</if>>
  <<include [[NPCinteraction-FriendsContinue]]>>`,
];

aw.tagContent.friend.pussyAccess = [
  `<p>@@.mono;Oh, I fell a breeze on my bare pussy. I wonder if <<n setup.interact.status.npc "heshe.q">> notices that I don't wear any panties, tee-hee.@@</p>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

// OTHER TAGS

aw.tagContent.friend.stressed = [
  `@@.npc;Hey, you seem nervous. What's the deal?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "friend" "stressedNope">><</intreplace>>
    <<dtext "smile">>Ugh? Nope, I am okay, why did you ever thought so?
    <<dbutt "A bit">><<intreplace>><<ctagcontent "friend" "stressedAbit">><</intreplace>>
    <<dtext "scared">>Yeah, I am under a pressure lately.
    <<dbutt "Confront" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "friend" "stressedBitch">><</intreplace>>
    <<dtext "unamused">>Stop asking stupid questions, damn.
  <</dialogchoice>>
  `,
];

aw.tagContent.friend.stressedNope = [
  `@@.pc;Ugh? Nope, I am okay, why did you ever thought so?@@<br>
  @@.npc;I just know you, you are more calm usually.@@<br>
  @@.pc;Oh, I just had too much coffee today, it is okay.@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.stressedAbit = [
  `<<has extro>>@@.pc;Yeah, I am under a pressure lately. Work and everything in general you know. Don't know if I can deal with all this much longer...<<stress -5 "Talking about stress">>@@<<or>>@@.pc;Yeah, I am under a pressure lately.@@<</has>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><br>
  @@.npc;Oh, thats sucks. You really need a vacation, maybe you should take a trip to the Lake Clitea, or that hiking tour in Angler Woods? Fresh air, nature, all this stuff to calm you down a bit?@@<br>
  @@.pc;Well, that may be a solution. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.stressedBitch = [
  `@@.pc;Stop asking stupid questions, damn. If I would want to talk about it I'd started myself. I am okay, got it? O.K.A.Y!@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >>
  @@.npc;Wow, wow, easy girl, easy!@@<br>
  @@.pc;Yeah, thats what she said. So..@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.depressed = [
  `@@.npc;Hey, you looks sad, what happened, <<print ↂ.pc.main.name>>?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "friend" "depressedNo">><</intreplace>>
    <<dtext "smile">>Why? Nope, I am good, really.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "friend" "depressedYes">><</intreplace>>
    <<dtext "sad">>Just this shitty mood, you know.
  <</dialogchoice>>
  `,
];

aw.tagContent.friend.depressedNo = [
  `@@.pc;Why? Nope, I am good, really.@@<br>
  @@.npc;Well if you insist.@@<br>
  @@.pc;Yeah, it is good.@@<br>
  @@.npc;Just remember I am right here if you want to talk about anything.@@<br>
  @@.pc;Thanks, I know I can count on you. So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.depressedYes = [
  `<<has extro>>@@.pc;Just this shitty mood, you know... I feel so useless and I don't know if I can hold much longer...@@<<or>>@@.pc;It was pretty hard day for me.@@<</has>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><br>
  @@.npc;Hey, it will be okay, don't be like that! I am here with you, it will be better tommorow, I promise!@@<<happy +6 "Cheered up by friend">><br>
  @@.pc;I am so glad I have you with me.@@<br>
  @@.npc;Because I care about you, silly!@@<br>
  @@.pc;I know you do and thankful for it.@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.tipsy = [
  `@@.npc;Hey, party time! Where I can find booze for myself too?@@<br>
  @@.pc;Ha-ha, jealous?@@<br>
  @@.npc;You bet!@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.athleticClothes = [
  `@@.npc;Going for a jog or something?@@<br>
  @@.pc;Well, yeah, trying to keep myself in shape.@@<br>
  @@.npc;Good for you I guess...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
  `@@.npc;Got ready to pump iron?@@<br>
  @@.pc;It is really good for health and weight too actually.@@<br>
  @@.npc;Way too go then.@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.kinkyClothes = [
  `<<if aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Wow, neat! What a kink clothes, girl!@@<<elseif aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh my, this clothes are so lewd, are you sure it is okay to wear it in public?@@<<else>>@@.npc;He-he, decided to dress in that porn style, <<print ↂ.pc.main.name>>?@@<</if>><br>
  <<has liberate>>@@.pc;Life is too short to dress modestly!@@<<orhas slut>>@@.pc;I like drawing attention to my most delicious parts you know.@@<<orhas shame>><<stress 2 "kinky clothes">>@@.pc;I really don't know how I wound up wearing this, I am really blushing all the day long.@@<<or>>@@.pc;Well, can a girl wear something sexy from time to time, right?@@<</has>>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.nightwear = [
  `@@.npc;Well, it seems you forgot to dress in the morning. Nice pajama, though!@@<br>
  @@.pc;Yeah, all I need now is a towel and I am ready for space adventures.@@<br>
  @@.npc;What?@@<br>
  @@.pc;You have not read Douglas Adams?@@<br>
  @@.npc;Who is him?@@<br>
  @@.pc;Whatever. So...@@<br>
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.cuteClothes = [
  `@@.npc;Hey, pretty nice dress, girl!@@<<set aw.npc[setup.interact.status.npc].rship.likePC += 1 >><br>
  @@.pc;Thank! So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.superCuteClothes = [
  `@@.npc;Wow, you a dressed so cute I want to hug you!@@<<set aw.npc[setup.interact.status.npc].rship.likePC += 2 >><br>
  @@.pc;Thank! So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.slovenlyClothes = [
  `@@.npc;Not feeling like being overdressed today, huh?@@<br>
  @@.pc;Gosh, don't even ask. So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.swimwear = [
  `@@.npc;Care for swimming? Nice swimsuit by the way!@@<br>
  @@.pc;Thank! So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.damagedClothes = [
  `@@.npc;Hey, what happened to your outfit?@@<br>
  @@.pc;What is wrong with it?@@<br>
  @@.npc;Well, you look like a hobo, you really need to buy some new shit.@@<br>
  @@.pc;Damn! So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.stainedClothes = [
  `@@.npc;Hey, what is it on your clothes?@@<br>
  @@.pc;What do you mean?@@<br>
  @@.npc;Those stains. Looks weird.@@
  <<dialogchoice>>
    <<dbutt "Cum" "ↂ.pc.kink.slut">><<intreplace>><<ctagcontent "friend" "stainedClothesCum">><</intreplace>>
    <<dtext "cool">>I am pretty sure this is cum, silly.
    <<dbutt "Dunno">><<intreplace>><<ctagcontent "friend" "stainedClothesDunno">><</intreplace>>
    <<dtext "awkward">>No idea actually. Mayo, maybe?
  <</dialogchoice>>
  `,
];

aw.tagContent.friend.stainedClothesCum = [
  `@@.pc;I am pretty sure this is cum, silly.@@<br>
  @@.npc;Oh, okay. Well, heh. Maybe you should consider cleaning this.@@<br>
  @@.pc;Maybe. So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.stainedClothesDunno = [
  `@@.pc;No idea actually. Mayo, maybe?@@<br>
  <<has shame>>@@.mono;Oh shit! <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>>noticed! Panic!@@<br><<stress 8 "stained clothes convo">><</has>>
  @@.npc;Looks more like... whatever, you should clean this, girl!@@<br>
  @@.pc;Yeah, will do. So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];

aw.tagContent.friend.angry = [
  `@@.npc;Hey, what's up? Why so grumpy?@@<br>
  <<has bitch>>@@.pc;I am grumpy? DID I FUCKING ASKED FOR YOUR OPINION? I AM MAD AS FUCK! Goddamit, you better hide from my view now, before I'll go berserk!!@@<<or>>@@.pc;Yes, I am angry. If you'll keep asking you'll be the next victim.@@<</has>><br>
  @@.npc;Oh. Don't forget that "anger is to the dark side way," hehe.@@<br>
  @@.pc;Aargh. 1...2...3...4...5. Phew. So...@@
  <<include [[NPCinteraction-FriendsContinue]]>>
  `,
];