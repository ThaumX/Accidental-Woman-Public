
//  █████╗  ██████╗ ██████╗ ██╗   ██╗ █████╗ ██╗███╗   ██╗████████╗ █████╗ ███╗   ██╗ ██████╗███████╗
//  ██╔══██╗██╔════╝██╔═══██╗██║   ██║██╔══██╗██║████╗  ██║╚══██╔══╝██╔══██╗████╗  ██║██╔════╝██╔════╝
//  ███████║██║     ██║   ██║██║   ██║███████║██║██╔██╗ ██║   ██║   ███████║██╔██╗ ██║██║     █████╗
//  ██╔══██║██║     ██║▄▄ ██║██║   ██║██╔══██║██║██║╚██╗██║   ██║   ██╔══██║██║╚██╗██║██║     ██╔══╝
//  ██║  ██║╚██████╗╚██████╔╝╚██████╔╝██║  ██║██║██║ ╚████║   ██║   ██║  ██║██║ ╚████║╚██████╗███████╗
//  ╚═╝  ╚═╝ ╚═════╝ ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
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

aw.tagContent.acquaintance = {} as IntTagContent;

// RANDOMS

aw.tagContent.acquaintance.random = [
  `@@.npc;Did you heard about this accident with power network?@@<br>
  @@.pc;Not sure. What is the deal with it?@@<br>
  @@.npc;They said somebody in the downtown overloaded it with some power consuming machinery so it got off for a whole hour or so. Institute is pretty mad about that it seems, they said they will start investigation.@@<br>
  @@.pc;That is weird. I hope everything will be okay.@@<br>
  @@.npc;Hope so. If they find the poor guy or gal I have no idea what they will do.@@<br>
  @@.pc;Ugh.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
  `@@.npc;Aah. So, where do you work?@@<br>
  <<if ↂ.job.name == "Unemployed">> @@.pc;Oh, I am unemployed.@@<br>
  @@.npc;Aah. Cool.@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5>>
  <<else>>@@.pc;Oh, I am <<print ↂ.job.name>> at <<print ↂ.job.employer>>.@@<br>
  <<if ↂ.job.percept > 2>>@@.npc;Oh, nice place!@@<<set aw.npc[setup.interact.status.npc].rship.likePC += 5>><<else>>@@.npc;Aah. Cool.@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5>><</if>>
  @@.pc;Well, it is just a job as many others.@@<br><</if>>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
  `<<n setup.interact.status.npc "heshe.q">> looks at you with a curious expression on the face.<br>
  @@.npc;How long are you in Appletree?@@<br>
  @@.pc;Not very much actually, I am still new here.@@<br>
  You take an expansive look around for show, as if seeing the place for the first time.<br>
  @@.npc;Well, I hope you like it as much as I do!@@<br>
  @@.pc;We'll see.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
  `@@.npc;Ugh, my <<= either("friend","uncle","coworker")>> is a local lore gatherer and he told me super interesting things about Muchi Valley yesterday. It seems there is a net of ancient tunnels under the ground on the north-west part, around springs and such. I wonder if somebody went there.@@<br>
  @@.pc;Well, maybe they should make an expedition to see how deep the rabbit hole is.@@<br>
  @@.npc;Yeah, I even feel tempted to go and look there by myself, but to be honest I am afraid of small places and darkness so I am not sure I'll get enough courage.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
  `@@.npc;So, have you ever been to Shake'n Pop club? This place is wicked!@@<br>
  @@.pc;Oh, maybe I should pay it a visit this week.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
  `@@.npc;Have you been in medical district? My aunt is super into these transformatives.@@<br>
  @@.pc;Ugh? Like body changing drugs?@@<br>
  @@.npc;Yep, ugh indeed. She already spent like all the money she had after divorce, and to be honest I barely recognize her now.@@<br>
  @@.pc;Well, they seem to do wonders now with these things.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

// PRIORITY ONE TAGS

aw.tagContent.acquaintance.seriousIllness = [
  `@@.npc;You looks terrible, friend. Are you okay?@@
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "acquaintance" "seriousIllnessOkay">><</intreplace>>
    <<dtext "confused">>Yeah, I am mostly okay, thanks.
    <<dbutt "Help me">><<intreplace>><<ctagcontent "acquaintance" "seriousIllnessHelp">><</intreplace>>
    <<dtext "sick">>I feel really bad... I gonna pass out now...
  <</dialogchoice>>`,
];
aw.tagContent.acquaintance.seriousIllnessOkay = [
  `@@.npc;Are you sure? You really look terrible.@@<br>
  <<if ↂ.pc.trait>>@@.pc;Oh, nice to see somebody care. I ll be fine soon, I hope.@@<<else>>@@.pc;I really hope I get well soon, I am feeling even worse than I look.@@<</if>><br>
  @@.npc;Ugh, really, go see a doctor or something, I don't want you to die on my hands goddamit.@@<br>
  @@.pc;Gonna do that.@@<br>
<<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.seriousIllnessHelp = [
  `@@.npc;I better call the ambulance, hang in there, <<print ↂ.pc.main.name>>, help will come soon!@@<br>
  NPC calls the ambulance<br>
  <<if ↂ.flag.Healthcare>>
    NPC stay with you until institute doctors take you to the weird medical place. Placeholder thingy for now.<br>
    <<link "Being drugged">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <<else>>
    NPC stay with you until general ambulance comes and takes you to the hospital. Placeholder thingy for now.<br>
    <<link "Sleep exhausted in the ambulance">><<go ResidentialMedical>><<run setup.interact.exit()>><</link>>
  <</if>>
`,
];
aw.tagContent.acquaintance.illness = [
  `@@.npc;Are you okay? You seem a bit ill.@@
  <<dialogchoice>>
    <<dbutt "Sarcasm" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "acquaintance" "illnessBitchy">><</intreplace>>
    <<dtext "mad">>Am I look okay? No. Because I am not, dumbass.
    <<dbutt "Okay">><<intreplace>><<ctagcontent "acquaintance" "illnessOkay">><</intreplace>>
    <<dtext "smile">>Nope, I am good.
    <<dbutt "No">><<intreplace>><<ctagcontent "acquaintance" "illnessBad">><</intreplace>>
    <<dtext "unamused">>That is true, I am a bit sick actually.
  <</dialogchoice>>`,
];
aw.tagContent.acquaintance.illnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >>
  @@.npc;Oh, come on, no need to act like this all the time, <<print ↂ.pc.main.name>>.@@<br>
  @@.pc;Then don't tell me what to do.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.illnessOkay = [
  `@@.npc;Well if you think so... be safe anyway.@@<br>
  @@.pc;Thanks.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.illnessBad = [
  `@@.npc;You should totally see a doctor, better not ignore such things.@@<br>
  @@.pc;Yeah, I know.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.nakedBottom = [
  `<<if aw.npc[setup.interact.status.npc].kink.exhibition || aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Oh, wow. Nice day for giving your kitten some fresh air, mm? Looking good by the way, I certainly like the view!@@<br><<elseif aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, damn, <<print ↂ.pc.main.name>> please, cover your butt with something!@@<br><<else>>@@.npc;Oh... well... I am pretty sure that you are aware that you are half naked, huh?@@<br><</if>>
  <<has exhibition>>You can't but wiggle your <<p assSize>> butt a bit, presenting your nakedness to <<if aw.npc[setup.interact.status.npc].main.female>>her<<else>>him<</if>>.<br><br>@@.mono;Oh yes, stare at me. Damn, that is exciting!@@<br>@@.pc;Do you like it?@@<br><<arouse 2>><<orhas slut>><<arouse 2>>You can't but enjoy the attention to your naked bottom and pussy.<br><br><<orhas liberate>>You feel pretty comfortable with your lower part naked.<br><br><<orhas shame>><<stress 10 "Naked Pussy Convo">>You feel terribly insecure and going tomato red from embarassment.<br><<arouse -2>>@@.mono;How did I ever allow that to happen? I want just die right now.@@<br><<or>><<stress 7 "Naked Pussy Convo">>You feel pretty uncomfortable being exposed like this especially in front of the person you know.<br><<arouse -1>><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "acquaintance" "NakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give <<print aw.npc[setup.interact.status.npc].main.name>> a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "acquaintance" "NakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Apologize and cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "acquaintance" "NakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.acquaintance.NakedBottomPresent = [
  `<<SCX>>
  <<SC "SD" "15">>
  You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "acquaintance" "NakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "acquaintance" "NakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "acquaintance" "NakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.acquaintance.NakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.NakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.acquaintance.NakedBottomCover = [
  `You try to cover yourself and go on with the convo.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.NakedBottomCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed properly.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>><</if>>
  `,
];
aw.tagContent.acquaintance.NakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, that all is pretty weird to be honest. If that was a way to move forward with our relations then I am really confused.@@<br><</if>>
  <<link "Well... So...">><<intgo "NPCinteraction-AcquaintContinue">><</link>>
  `,
];
aw.tagContent.acquaintance.practNakedBottom = [
  `
  <<print aw.npc[setup.interact.status.npc].main.name>>'s stare reminds you about your risky dress choice. Your pussy and ass are almost visible to <<if aw.npc[setup.interact.status.npc].main.female>>her<<else>>him<</if>> <<has exhibition>><<arouse 2>>which makes you more aroused.<br>
  @@.mono;If I lean a bit all my private parts will be visible, mmm...@@<br><<orhas slut || liberate>>which is pretty comfortable for you in fact.<br>
  @@.mono;I am pretty sure <<print aw.npc[setup.interact.status.npc].main.name>> likes the view, hehe.@@<br><<orhas shame>><<arouse -2>><<stress 5 "Naked Pussy Convo">>which makes you really nervous.<br>@@.mono;I shoudn't dress like that in a first place, oh, what I was even thinking about?@@<br><<or>><<stress 3 "Naked Pussy Convo">>which makes you feel a bit uneasy.<br>
  @@.mono;Well, I am dressed risky today for sure. What will <<print aw.npc[setup.interact.status.npc].main.name>> think about me?@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, you have really risky clothes today. I'd never dare to dress like that being in your place!@@<br>
  <<else>>@@.npc;Wow, pretty revealing clothes you have there. Enjoying the fresh air, huh?@@<br><</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "acquaintance" "practNakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give <<print aw.npc[setup.interact.status.npc].main.name>> a bit better view on your lady bits.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "acquaintance" "practNakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.acquaintance.practNakedBottomPresent = [
  `<<SCX>>
  <<SC "SD" "15">>
  You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "acquaintance" "practNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and NPC surprised by your behavior.<br>
  @@.npc;Well, this is a bit weird, can you please stop wiggling your ass like this?@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "acquaintance" "practNakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "acquaintance" "practNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.acquaintance.practNakedBottomCool = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.practNakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.practNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, that all is pretty weird to be honest.@@<br><</if>>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.practNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.acquaintance.buckNaked = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> stares at your nude body <<has exhibition>><<aroused 2>>which makes you more aroused<br>
  @@.mono;Oh yeah, I can't believe I am doing that!@@<br><<orhas slut || liberate>>which you can deal with.<br>
  @@.mono;That is prety exciting!@@<br><<orhas shame>><<aroused -2>><<stress 25 "Naked Convo">>which makes you panic.<br>
  @@.mono;AAA! I am totally naked in view of <<print aw.npc[setup.interact.status.npc].main.name>>!!!@@<br><<or>><<stress 15 "Naked Convo">>which makes you feel terrible.<br>
  @@.mono;Oops, I am totally naked.@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>
  @@.npc;Oh my gosh, <<print ↂ.pc.main.name>>, why are you naked?@@<<else>>@@.npc;Oh. Well, you have left all your clothes somewhere, huh?@@<</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "acquaintance" "buckNakedPresent">><</intreplace>>
      <<dtext "smug">>Rotate exposing yourself further.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "acquaintance" "buckNakedCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "acquaintance" "buckNakedCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Say bye awkwardly and run away.
  <</dialogchoice>>`,
];
aw.tagContent.acquaintance.buckNakedPresent = [
  `<<SCX>><<SC "SD" "10">>You expose your body to <<print aw.npc[setup.interact.status.npc].main.name>> in suggestive manner.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "acquaintance" "buckNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@<br>
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "acquaintance" "buckNakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "acquaintance" "buckNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.acquaintance.buckNakedPresentChat = [
  `@@.pc;Ehh... Sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.buckNakedCover = [
  `You try to cover your body with hands which is not super effective. NPC tries his best to ignore your nakedness.<br>
  @@.npc;W-well, what were we talking about?@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.buckNakedCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  <<else>>@@.pc;Yeah...@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  <</if>>
  <</if>>`,
];
aw.tagContent.acquaintance.buckNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, you are such a weirdo, you know?@@<br><</if>>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];
aw.tagContent.acquaintance.buckNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.acquaintance.wetClothes = [
  `<<if ↂ.pc.clothes.keys.bra === 0>>
  You notice <<print aw.npc[setup.interact.status.npc].main.name>> looks at your chest and realise that your <<p nipl.q>> <<p nipples.n>> are visible through the wet clothes.<br>
  <<has exhibition>><<arouse 1>>@@.mono;Oh yeah, I like that.@@<br><<orhas slut>>@@.mono;That is certainly drawing some attention.@@<br><<orhas shame>><<stress 7 "Wet Clothes Convo">>@@.mono;Oh shit, my nipples are showing!@@<br><<or>><<stress 2 "Wet Clothes Convo">>@@.mono;Oops, better cover that!@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>It seems, <<if aw.npc[setup.interact.status.npc].main.female>>she is doing her<<else>>he is doing his best<</if>> to ignore your clearly visible nipples.<<else>>It seems, <<print aw.npc[setup.interact.status.npc].main.name>> is pretty okay with your nipples showing.<</if>>
  <<dialogchoice>>
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "acquaintance" "wetClothesCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "acquaintance" "wetClothesCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>
  <<else>>
  @@.npc;You better change before you catch cold.@@<br>
  @@.pc;Yeah... that was pretty hilarious situation that got me wet like this. So...@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  <</if>>`,
];
aw.tagContent.acquaintance.wetClothesCover = [
  `You cover your <<p breastShape>> breast with your hand.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.wetClothesCool = [
  `<<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;Ugh, yeah... were we talking about?@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  <<else>>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  <</if>>`,
];
aw.tagContent.acquaintance.lightPheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 3 >>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 3 >><</if>>
  <<intgo "NPCinteraction-AcquaintContinue">>`,
];
aw.tagContent.acquaintance.pheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>
  <<intgo "NPCinteraction-AcquaintContinue">><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>You notice some sexual interest sparkling in the eyes of <<print aw.npc[setup.interact.status.npc].main.name>>.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>><</if>>
  `,
];
aw.tagContent.acquaintance.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>
  @@.npc;Oh, you know that you are some kind of magnetical? What do you do to be like that? Pilates? Yoga? Meditations? Really, it is just not fair to be so attractive!@@<br>
  <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> looks a bit confused with sudden confession but still feels comfortable around you glancing with some awe.<br>
  @@.pc;Hehe, thanks. No idea actually.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.hairyPits = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>
  <<print aw.npc[setup.interact.status.npc].main.name>> noticed your armpit bushes and it seems <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> is not very fond of them.<br>
  @@.mono;Ugh, I need to get rid of them I guess?@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
`,
];
aw.tagContent.acquaintance.clownMakeup = [
  `<<stress 5 "Clown Makeup Convo">><<print aw.npc[setup.interact.status.npc].main.name>> starts laughing.<br>
  @@.npc;He-he, ugh, sorry. Just... your makeup, it is pretty... destroyed, you know?@@<br>
  <<dialogchoice>>
    <<dbutt "Laugh" "!ↂ.pc.trait.intro">><<intreplace>><<ctagcontent "acquaintance" "clownMakeupLaugh">><</intreplace>>
    <<dtext "awkward">>Yeah, I know, he-he, looking pretty ridiculous.
    <<dbutt "Act cool">><<intreplace>><<ctagcontent "acquaintance" "clownMakeupCool">><</intreplace>>
    <<dtext "cool">>Go on with the convo ignoring the chuckles.
    <<dbutt "Sad">><<intreplace>><<ctagcontent "acquaintance" "clownMakeupSad">><</intreplace>>
    <<dtext "cry">>Oh, I really look that bad?
  <</dialogchoice>>`,
];
aw.tagContent.acquaintance.clownMakeupLaugh = [
  `@@.pc;Yeah, I know, he-he, looking pretty ridiculous.@@<br>
  @@.npc;Oh, so fix it, he-he. You are a lady or who after all?@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.clownMakeupCool = [
  `You go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.clownMakeupSad = [
  `<<stress 5 "Clown Makeup Convo">>
  @@.pc;Oh, I really look that bad?@@<br>
  Your eyes start watering and <<print aw.npc[setup.interact.status.npc].main.name>> finally stops giggling.<br>
  @@.npc;Oww, sorry I didn't meant to...@@<br>
  @@.pc;You think this is funny? That I look like a scank?@@<br>
  @@.npc;No, I was just... See, I am sorry! Please don't cry.@@<br>
  After some time you feel better and stop crying.<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.withdrawal = [
  `@@.mono;Oh I actually feel pretty shitty.@@<br>
  @@.npc;Hey, <<print ↂ.pc.main.name>>, are you ok?@@<br>
  @@.pc;Ah? Yes-yes, it is okay, I just drifted in thoughts for a moment.@@<br>
  @@.mono;Ugh, I really need to deal with that withdrawal soon.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.latePreg = [
  `@@.npc;Oh, that is some solid belly, congratulations!@@<br>
  <<if ↂ.pc.trait.maternal == 1>>@@.pc;Yes, I ll pop some beautiful baby any time soon. I am soo happy!@@<br>
  <<else>>@@.pc;Yeah. This is hard to carry around already, hope I ll give birth soon!@@<br>
  <</if>>@@.npc;I am so happy for you!@@<br>
  @@.pc;Thanks!@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];
aw.tagContent.acquaintance.drunk = [
  `@@.pc;Hii, <<print aw.npc[setup.interact.status.npc].main.name>>! Long time no see!@@<br>
  @@.npc;Oh, you are drunk, yeah?@@
  <<dialogchoice>>
    <<dbutt "Nah" >><<intreplace>><<ctagcontent "acquaintance" "drunkYeah">><</intreplace>>
    <<dtext "laugh">>What? No, I m sobr as a jdge!
    <<dbutt "Yeeah">><<intreplace>><<ctagcontent "acquaintance" "drunkYeah">><</intreplace>>
    <<dtext "proud">>Bloody hell I am!
    <<dbutt "Horny">><<intreplace>><<ctagcontent "acquaintance" "drunkFuck">><</intreplace>>
    <<dtext "love">>Wanna fuck me? I want to fuck rght now!
    <<dbutt "Pass out">><<run setup.interact.exit()>><<run setup.sleep.go();>>
    <<dtext "sleep">>I am sooo slepy, beter lay dwn just fur a tiny sec...
  <</dialogchoice>>`,
];
aw.tagContent.acquaintance.drunkYeah = [
  `@@.npc;Oh, I better call a taxi for you.@@<br>
  @@.pc;But I wanna prty!@@<br>
  @@.npc;Well, the party is certainly over for you, heh. Come on, you need to get home and sleep.@@<br>
  <<link "Screw it! Gonna prty!">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.acquaintance.drunkFuck = [
  `<<if aw.npc[setup.interact.status.npc].main.female === true>>@@.pc;Wanna fuck? I ll lck you so hrd you will forget bout anything!@@<br>
    @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
    <<link "You dnt want me?">><<intreplace>><<ctagcontent "acquaintance" "drunkYeah">><</intreplace>><</link>>
  <<else>><<SCX>><<SC "SD" 20>><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 7 >>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Hmm... I hope you won't remember it tomorrow though...@@<br>
      <<link "Uhm? We are gonna fck or wht?">><<run setup.interact.exit()>><</link>>
    <<else>>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
      <<link "You dnt like me?">><<intreplace>><<ctagcontent "acquaintance" "drunkYeah">><</intreplace>><</link>>
    <</if>>
  <</if>>`,
];
aw.tagContent.acquaintance.mindbreak = [
  `You start to cry all of a sudden.<br>
  @@.npc;<<print ↂ.pc.main.name>>, what happened?@@<br>
  @@.pc;I... I just... I feel like everything goes to hell. Whole my life is ...sob... shattered...@@<br>
  @@.npc;Ugh, there, there. It will be okay, I am sure.@@<br>
  @@.pc;You just don't understand, all that happened ...sob... to me, it is just too much to handle...@@<br>
  <<if ↂ.pc.trait.will > 4 >>You somehow manage to gain your reason back<br><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>
  @@.pc;I am so sorry. It was really tough times lately.@@<br>
  @@.npc;Oh, it is okay.@@<br>
  <<else>><<addtime 13>><<set ↂ.pc.groom.makeup.clown = true>><<stress -10 "Mindbroken Convo">>You start histerically giggling.<br>
  @@.npc;Oh, poor you. Try to calm down, I ll drive you home...@@<br>
  You cry all the way while <<print aw.npc[setup.interact.status.npc].main.name>> drive the car to your house, but start to feel better when you get to the house. <<print aw.npc[setup.interact.status.npc].main.name>> leaves you in your house after getting sure you are okay now.<br>
  <<link "Say goodbye">><<addtime 54>><<gotomap "home" "foyer">><<run setup.interact.exit()>><</link>>
  <</if>>`,
];
aw.tagContent.acquaintance.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>You feel your juices running down your inner thights with no panties in a way to stop them<br>
    <<has exhibition>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will notice that. That is so embarassingly exciting!@@<br><<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<br><</has>>
  <<else>>You feel your juices making a slippery mess slowly soaking through your panties.<br><<has slut>>@@.mono;Speaking with a person while being flooded like that is so naughty!@@<br><<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<br><</has>>
  <</if>>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];

aw.tagContent.acquaintance.pussyAccess = [
  `<p>@@.mono;Oh, I fell a breeze on my bare pussy. I wonder if <<n setup.interact.status.npc "heshe.q">> notices that I don't wear any panties, tee-hee.@@</p>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];

// OTHER TAGS

aw.tagContent.acquaintance.stressed = [
  `@@.npc;Hey, is everything okay?@@<br>
  @@.pc;Mm? Why asking?@@<br>
  @@.npc;Well, you seem stressed to be honest.@@
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "acquaintance" "stressedNope">><</intreplace>>
    <<dtext "smile">>It is okay.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "acquaintance" "stressedAbit">><</intreplace>>
    <<dtext "scared">>Yeah, I feel not that good.
  <</dialogchoice>>
  `,
];

aw.tagContent.acquaintance.stressedNope = [
  `@@.pc;It is okay. Don't worry.@@<br>
  @@.npc;Oh, sorry then, I just thought you was... whatever.@@<br>
  @@.pc;No problems.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.stressedAbit = [
  `<<has extro>>@@.pc;Yeah, I feel not that good. Work and everything in general you know. Don't know if I can deal with all this much longer...<<stress -1 "Talking about stress">>@@<br><<or>>@@.pc;Yeah, it was not very nice last days.@@<br><</has>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >>
  @@.npc;Ouch, hang in there, girl. Maybe you should play some games or something? I heard they have this arcades in the mall...@@<br>
  @@.pc;Well, maybe.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.depressed = [
  `@@.npc;Hey, why the long face, <<print ↂ.pc.main.name>>?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "acquaintance" "depressedNo">><</intreplace>>
    <<dtext "smile">>I am okay, don't worry. Just a lack of sleep.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "acquaintance" "depressedYes">><</intreplace>>
    <<dtext "sad">>Eh, it is true, I feel depressed lately.
  <</dialogchoice>>
  `,
];

aw.tagContent.acquaintance.depressedNo = [
  `@@.pc;I am okay, don't worry. Just a lack of sleep.@@<br>
  @@.npc;Yeah, I got to bed late yesterday too. Hang in there, girl!@@<br>
  @@.pc;Will do.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>`,
];

aw.tagContent.acquaintance.depressedYes = [
  `@@.pc;Eh, it is true, I feel depressed lately...@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >>
  @@.npc;Hey, you know what will cheer you up? A nice night in a club! Try going to the Shake'n Pop today! Pretty cool place it is.@@<br>
  @@.pc;Well, maybe I ll go, thanks.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.tipsy = [
  `@@.npc;Hey, party time! Where I can find booze for myself too?@@<br>
  @@.pc;Ha-ha, jealous?@@<br>
  @@.npc;You bet!@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.athleticClothes = [
  `@@.npc;Going for a jog or something?@@<br>
  @@.pc;Well, yeah, trying to keep myself in shape.@@<br>
  @@.npc;Good for you I guess...@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
  `@@.npc;Got ready to pump iron?@@<br>
  @@.pc;It is really good for health and weight too actually.@@<br>
  @@.npc;Way too go then.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.kinkyClothes = [
  `<<if aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Pretty sexy view, girl! I like it!@@<br><<elseif aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh my, this clothes are so lewd, are you sure it is okay to wear it in public?@@<br><<else>>@@.npc;He-he, decided to dress sexy, <<print ↂ.pc.main.name>>?@@<br><</if>>
  <<has liberate>>@@.pc;Life is too short to dress modestly!@@<br><<orhas slut>>@@.pc;I like drawing attention to my most delicious parts you know.@@<br><<orhas shame>><<stress 3 "Kinky clothes convo">>@@.pc;I really don't know how I wound up wearing this, I am really blushing all the day long.@@<br><<or>>@@.pc;Well, can a girl wear something sexy from time to time, right?@@<br><</has>>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.nightwear = [
  `@@.npc;You are dressed for sleep?@@<br>
  @@.pc;Well... yeah...@@<br>
  @@.npc;It is okay, my uncle also walked in his sleep. Nothing to worry about, I can understand it, really. He was rolled over by a train though.@@<br>
  @@.pc;Well thanks for this lovely story.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.cuteClothes = [
  `@@.npc;Cute outfit you have there!@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC += 1 >>
  @@.pc;Thanks!@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.superCuteClothes = [
  `@@.npc;You would win a "Cutest outfit of the year" competition for sure!@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC += 2 >>
  @@.pc;Of course I'd win!@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.slovenlyClothes = [
  `@@.npc;Well, to be honest you look a bit slovenly.@@<br>
  @@.pc;I am aware, gosh.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.swimwear = [
  `@@.npc;Care for swimming? Nice swimsuit by the way!@@<br>
  @@.pc;Thanks, heh.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.sexyClothes = [
  `@@.npc;Oh, you look pretty hot, you know it? I mean this clothes are... well pretty sexy.@@<br>
  @@.pc;Thanks, heh.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.superSexyClothes = [
  `@@.npc;Oh, you look pretty hot, you know it? I mean this clothes are... well pretty sexy.@@<br>
  @@.pc;Thanks, heh.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.damagedClothes = [
  `@@.npc;You clothes, they are...@@<br>
  @@.pc;What?@@<br>
  @@.pc;Well, maybe you should consider buying new ones.@@<br>
  <<has bitch>>@@.pc;I did not ask for an advice.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>><<or>>@@.pc;Well it seems so.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>><</has>>
  `,
];

aw.tagContent.acquaintance.stainedClothes = [
  `@@.npc;Hm, what is this on your clothes?@@<br>
  @@.pc;I had it stained or something?@@<br>
  @@.pc;Pretty much so.@@
  <<dialogchoice>>
    <<dbutt "Cum" "ↂ.pc.kink.slut">><<intreplace>><<ctagcontent "acquaintance" "stainedClothesCum">><</intreplace>>
    <<dtext "cool">>This is cum, silly.
    <<dbutt "Dunno">><<intreplace>><<ctagcontent "acquaintance" "stainedClothesDunno">><</intreplace>>
    <<dtext "awkward">>He-he. I don't know what is this, pretty silly, yeah?
  <</dialogchoice>>
  `,
];

aw.tagContent.acquaintance.stainedClothesCum = [
  `@@.pc;This is cum, silly.@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 4 >>
  @@.npc;Well, you are not a shamefest, don't you? Better clean yourself anyway.@@<br>
  @@.pc;Well, will do.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.stainedClothesDunno = [
  `@@.pc;He-he. I don't know what is this, pretty silly, yeah? I am such a clumsy!@@<br>
  <<has shame>>@@.mono;Oh shit! <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>>noticed! Panic!@@<br><<stress 8 "Stained clothe convo">><</has>>
  @@.npc;Heh. We all are like this sometimes. Just clean this and you'll be okay.@@<br>
  @@.pc;Yeah, will do.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.angry = [
  `@@.npc;Hey, what's up? Why so grumpy?@@<br>
  <<has bitch>>@@.pc;I am grumpy? DID I FUCKING ASKED FOR YOUR OPINION? I AM MAD AS FUCK! Goddamit, you better hide from my view now, before I'll go berserk!!@@<br><<or>>@@.pc;Yes, I am angry. If you'll keep asking you'll be the next victim.@@<br><</has>>
  @@.npc;Ugh, okay, calm down girl!@@<br>
  @@.pc;It is not that easy.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.poorHealth = [
  `@@.npc;Hey, you looks ill@@<br>
  @@.pc;I am okay.@@<br>
  <<include [[NPCinteraction-AcquaintContinue]]>>
  `,
];

aw.tagContent.acquaintance.bodywriting = [
  `@@.npc;Emm, sorry, what is written there?@@<br>
  @@.pc;Umm, where?@@<br>
  @@.npc;Is it... oh, "<<= ↂ.pc.tattoo.getText>>", really? Did not know you are into such things to be honest.@@<br>
  <<link "Uhm...">><<intgo "NPCinteraction-AcquaintContinue">><</link>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 4>>
  `,
];

aw.tagContent.acquaintance.lewdTattoo = [
  `@@.npc;Nice tattoo you have there... oh.@@<br>
  @@.pc;What?@@<br>
  @@.npc;It is just... ugh, nevermind...@@<br>
  <<link "Emm...">><<intgo "NPCinteraction-AcquaintContinue">><</link>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 4>>
  `,
];
