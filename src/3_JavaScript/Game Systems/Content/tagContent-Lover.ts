
//  ██╗      ██████╗ ██╗   ██╗███████╗██████╗
//  ██║     ██╔═══██╗██║   ██║██╔════╝██╔══██╗
//  ██║     ██║   ██║██║   ██║█████╗  ██████╔╝
//  ██║     ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗
//  ███████╗╚██████╔╝ ╚████╔╝ ███████╗██║  ██║
//  ╚══════╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝
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

aw.tagContent.lover = {} as IntTagContent;

// RANDOMS

aw.tagContent.lover.random = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC += 1 >>@@.npc;How do you do, beatiful?@@<br>
  @@.pc;Good I guess. What is the deal?@@<br>
  @@.npc;Just wanted to say that I really like being with you.@@<br>
  @@.pc;Awww. That is pretty sweet! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>`,
  `@@.npc;I am happy that I found you.@@<br>
  @@.pc;Why all of sudden?@@<br>
  @@.npc;Just wanted you to know, heh.@@<br>
  @@.pc;Awww. So cute! I like to be with you too! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

// PRIORITY ONE TAGS

aw.tagContent.lover.seriousIllness = [
  `@@.npc;You looks terrible. Are you okay?@@
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "lover" "seriousIllnessOkay">><</intreplace>>
    <<dtext "confused">>Yeah, I am mostly okay, thanks.
    <<dbutt "Help me">><<intreplace>><<ctagcontent "lover" "seriousIllnessHelp">><</intreplace>>
    <<dtext "sick">>I feel really bad... I gonna pass out now...
  <</dialogchoice>>`,
];
aw.tagContent.lover.seriousIllnessOkay = [
  `@@.npc;Are you sure? You really look terrible.@@<br>
  @@.pc;I really hope I get well soon, I am feeling even worse than I look.@@<br>
  @@.npc;Ugh, really, go see a doctor or something, you should really care about you health, darling.@@<br>
  @@.pc;Gonna do that. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.seriousIllnessHelp = [
  `@@.npc;I better call the ambulance, hang in there, <<print ↂ.pc.main.name>>, help will come soon!@@<br>
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
aw.tagContent.lover.illness = [
  `@@.npc;Are you okay? You seem a bit ill.@@
  <<dialogchoice>>
    <<dbutt "Okay">><<intreplace>><<ctagcontent "lover" "illnessOkay">><</intreplace>>
    <<dtext "smile">>I am okay, just a cold.
    <<dbutt "No">><<intreplace>><<ctagcontent "lover" "illnessBad">><</intreplace>>
    <<dtext "unamused">>That is true, I am a bit sick actually.
  <</dialogchoice>>`,
];
aw.tagContent.lover.illnessOkay = [
  `@@.npc;Well if you think so... be safe anyway. Don't want you to feel bad.@@<br>
  @@.pc;Thanks. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.illnessBad = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC += 7 >>@@.npc;You should totally see a doctor, better not ignore such things.@@<br>
  @@.pc;Yeah, I know, I ll do it. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.nakedBottom = [
  `<<if aw.npc[setup.interact.status.npc].kink.exhibition>>@@.npc;Oh, <<print ↂ.pc.main.name>>, I just LOVE how you expose yourself, brave little girl, heh. Come on, wiggle that butt for me!@@
  <<dialogchoice>>
      <<dbutt "Wiggle" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "lover" "NakedBottomPresent">><</intreplace>>
      <<dtext "slut">>Make a little show.
      <<dbutt "Nope" "">><<intreplace>><<ctagcontent "lover" "NakedBottomChat">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3>>@@.npc;<<print ↂ.pc.main.name>>, are you insane? Cover yourself right now!@@
  <<dialogchoice>>
      <<dbutt "Cover">><<run setup.interact.exit()>>
      <<dtext "unhappy">>Okay, I ll dress now, don't be so mad!
      <<dbutt "Nope">><<intreplace>><<ctagcontent "lover" "NakedBottomCool">><</intreplace>>
      <<dtext "arrogant">>Don't tell me what to do!
  <</dialogchoice>>
  <</if>>
`,
];
aw.tagContent.lover.NakedBottomPresent = [
  `<<SCX>><<SC "SD" "20">>You lean forward, obcenely exposing your lady bits.<br>
  <<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>That arouses <<print aw.npc[setup.interact.status.npc].main.name>>.<br>
  @@.npc;Oh, shit. You are still as gorgeous as the day we met, babe!@@<br>
  @@.pc;Thanks, heh. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>You failed the check and NPC is pissed off.<br>
  @@.npc;What for you are doing this? Damn, <<print ↂ.pc.main.name>>, there are people around!@@
  <<dialogchoice>>
      <<dbutt "Run" "ↂ.pc.kink.exhibition">><<run setup.interact.exit()>>
      <<dtext "disturbed">>Run away in embarassment
      <<dbutt "Talk">><<intreplace>><<ctagcontent "exes" "NakedBottomPresentChat">>
      <<dtext "tired">>Oh... Yes, you are right...
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.lover.NakedBottomChat = [
  `You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-LoverTag]]>>`,
];
aw.tagContent.lover.NakedBottomCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 10 >>@@.npc;I said dress your butt! Everybody can see you any moment with your pussy out!!@@<br>
  <<link "Damn!">><<run setup.interact.exit()>><</link>><<else>>
  @@.npc;Oh, really? Okay, but don't bitch if somebody see you like that here and call the cops. I won't help you!@@<br>
  @@.pc;Whatever. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>><</if>>
  `,
];
aw.tagContent.lover.NakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>>@@.npc;Oh, I ll do dirty things to you later at home. Very dirty, heh.@@<</if>><br>
  @@.pc;He-he. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.practNakedBottom = [
  `<<print aw.npc[setup.interact.status.npc].main.name>>'s stare reminds you about your risky dress choice. Your pussy and ass are almost visible to <<print aw.npc[setup.interact.status.npc].main.name>> <<has exhibition>><<arouse 2>>which makes you more aroused.<br>
  @@.mono;If I lean a bit all my private parts will be visible, mmm@@<br>
  <<orhas slut || liberate>>which is pretty comfortable for you in fact.<br>
  @@.mono;I am pretty sure <<print aw.npc[setup.interact.status.npc].main.name>> likes the view, hehe.@@<br>
  <<orhas shame>><<arouse -2>><<stress 1>>which makes you a bit nervous.<br>
  @@.mono;I shoudn't dress like that in a first place, oh, what I was even thinking about?@@
  <<or>>which makes you feel pretty okay while you are in company of your lover.<br>
  @@.mono;Well, I am dressed risky today for sure. I wonder if <<print aw.npc[setup.interact.status.npc].main.name>> likes this?@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, this looks pretty slutty actually. Not sure if I want you to dress like that.@@<br>
  <<else>>@@.npc;Wow, revealing, I like it!@@<</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "lover" "practNakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give <<print aw.npc[setup.interact.status.npc].main.name>> a bit better view on your lady bits.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "lover" "practNakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Ask">><<intreplace>><<ctagcontent "lover" "practNakedBottomAsk">><</intreplace>>
      <<dtext "happy">>Ask about <<print aw.npc[setup.interact.status.npc].main.name>> for opinion on your clothes.
  <</dialogchoice>>`,
];
aw.tagContent.lover.practNakedBottomPresent = [
  `<<SCX>><<SC "SD" "20">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Wanna touch this perfect body, don't you? I can see it in your eyes.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>.<br>
  @@.npc;Oh, shit. You are still as gorgeous as the day we met, babe!@@<br>
  @@.pc;Thanks, heh. So...@@
  <<include [[NPCinteraction-LoverTag]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >><br>You failed the check and NPC is pissed off.<br>
  @@.npc;What for you are doing this? Did you completely lost your sense?@@<br>
  <<dialogchoice>>
      <<dbutt "Run" "ↂ.pc.kink.exhibition">><<run setup.interact.exit()>>
      <<dtext "disturbed">>Run away in embarassment
      <<dbutt "Talk">><<intreplace>><<ctagcontent "exes" "practNakedBottomPresentChat">>
      <<dtext "tired">>Oh... Yes, you are right...sorry.
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.lover.practNakedBottomAsk = [
  `@@.pc;So, what do you think? Do it fits me?@@<br>
  You spin in front of <<print aw.npc[setup.interact.status.npc].main.name>> presenting yourself.<br>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Well, it is pretty... obscene to be honest. Don't get me wrong, it looks good on you, just really slutty.@@<br>
  <<else>>@@.npc;Pretty nice! You are really brave with those outfits hehe. Looks good on you though.@@<br><</if>>
  @@.pc;Thenks, hehe. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.practNakedBottomCool = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-LoverTag]]>>`,
];
aw.tagContent.lover.practNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>>@@.npc;Oh, I ll do dirty things to you later at home. Very dirty, heh.@@<</if>><br>
  @@.pc;He-he. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.buckNaked = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> stares at your nude body <<has exhibition>><<aroused 2>>which makes you more aroused.<br>
  @@.mono;Oh yeah, I can't believe I am doing that!@@<br>
  <<orhas slut || liberate>>which you can deal with easily.<br>
  @@.mono;That is prety exciting!@@<br>
  <<orhas shame>><<stress 10>>which makes you feel uneasy.<br>
  @@.mono;Oh, that is a very wrong place to be naked!@@<br>
  <<or>><<stress 5>>which makes you feel not really good.<br>
  @@.mono;Oops, I am totally naked. At least it is only <<print aw.npc[setup.interact.status.npc].main.name>> looking at me.@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh my gosh, <<print ↂ.pc.main.name>>, cover yourself, people can see you!@@<<elseif aw.npc[setup.interact.status.npc].kink.exhibition>>@@.npc;Oh, you are so beautiful naked, you know?@@<<else>>Why are you naked?<</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "lover" "buckNakedPresent">><</intreplace>>
      <<dtext "smug">>Rotate exposing yourself further.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "lover" "buckNakedCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Say bye awkwardly and run away.
  <</dialogchoice>>`,
];
aw.tagContent.lover.buckNakedPresent = [
  `You turn around, obcenely exposing your body to <<print aw.npc[setup.interact.status.npc].main.name>>.<br>
  @@.pc;Like what you see?@@<br><<if $SCresult[1]>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5>><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5>>@@.npc;Oh, come on, cover yourself already!@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5>>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>Oh yes, let's do it right here! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "lover" "buckNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Nope, not now, not here.
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.lover.buckNakedCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, dress, damn! I am not joking!@@<br>
  <<link "Ugh, okay">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-LoverTag]]>><</if>>
  `,
];
aw.tagContent.lover.buckNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>>@@.npc;Oh, I ll do dirty things to you later at home. Very dirty, heh.@@<</if>><br>
  @@.pc;He-he. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.wetClothes = [
  `<<if ↂ.pc.clothes.keys.bra === 0>>You notice <<print aw.npc[setup.interact.status.npc].main.name>> looks at your chest and realise that your <<p nipl.q>> <<p nipples.n>> are visible through the wet clothes.<br>
  <<has exhibition>><<arouse 1>>@@.mono;Oh yeah, I like that.@@<br>
  <<orhas slut>>@@.mono;That is certainly drawing some attention.@@<br>
  <<orhas shame>><<stress 7>>@@.mono;Oh shit, my nipples are showing!@@<br>
  <<or>><<stress 2>>@@.mono;Oops, better cover that!@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, your nipples are visible! Better wear something over to hide it!@@<<else>>@@.npc;You are aware about your nipples being clearly visible, yep?@@<</if>>
  <<dialogchoice>>
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "lover" "wetClothesCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "lover" "wetClothesCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>
  <<else>>@@.npc;You better change before you catch cold.@@<br>
  @@.pc;Yeah... So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  <</if>>`,
];
aw.tagContent.lover.wetClothesCover = [
  `You cover your <<p breastShape>> breast with your hand.<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.wetClothesCool = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.lightPheromones = [
  `@@,npc;Hmm, I felt that smell again. I wonder what it is?@@<br>
  @@.pc;No idea. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>`,
];
aw.tagContent.lover.pheromones = [
  `@@,npc;Hmm, I felt that smell again. I wonder what it is?@@<br>
  @@.pc;No idea. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>`,
];
aw.tagContent.lover.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC += 1>>@@.npc;Well, I just wanted to say, I am pretty happy to be together with you, you know?@@<br>
  <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> looks really into you now.<br>
  @@.pc;Hehe, thanks. I am glad too. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>`,
];
aw.tagContent.lover.hairyPits = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>@@.npc;Will you ever get rid of those bushes?@@<br>
  @@.pc;What?@@<br>
  @@.npc;Armpit ones. It is not 1970, you know? Gosh, shave them off, please. For me.@@
  <<dialogchoice>>
    <<dbutt "Okay">><<intreplace>><<ctagcontent "lover" "hairyPitsOkay">><</intreplace>>
    <<dtext "neutral">>Okay, okay. I ll do it, happy now?
    <<dbutt "Nope">><<intreplace>><<ctagcontent "lover" "hairyPitsNope">><</intreplace>>
    <<dtext "silly">>My armpits - my business. Deal with this.
  <</dialogchoice>>`,
];
aw.tagContent.lover.hairyPitsOkay = [`
@@.pc;Okay, okay. I ll do it, happy now?@@<br>
@@.npc;Wohoo!@@<br>
<<include [[NPCinteraction-LoverTag]]>>
`];
aw.tagContent.lover.hairyPitsNope = [`
<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>@@.pc;My armpits - my business. Deal with this.@@<br>
@@.npc;Eww, okay. Maybe I'll just shave them while you are sleeping, who knows...@@<br>
@@.pc;Hey!@@<br>
@@.npc;What?@@<br>
@@pc;Don't you even dare. So...@@<br>
<<include [[NPCinteraction-LoverTag]]>>
`];
aw.tagContent.lover.clownMakeup = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 7 >><<print aw.npc[setup.interact.status.npc].main.name>> starts laughing.<br>
  @@.npc;Ha-ha, you girl look particularly good today! That makeup is really clown-like!@@
  <<dialogchoice>>
    <<dbutt "Screw you" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "lover" "clownMakeupConfront">><</intreplace>>
    <<dtext "neutral">>Oh, screw you.
    <<dbutt "Laugh" "!ↂ.pc.trait.intro">><<intreplace>><<ctagcontent "lover" "clownMakeupLaugh">><</intreplace>>
    <<dtext "awkward">>Yeah, I know, he-he, looking pretty ridiculous.
    <<dbutt "Act cool">><<intreplace>><<ctagcontent "lover" "clownMakeupCool">><</intreplace>>
    <<dtext "cool">>Go on with the convo ignoring the chuckles
    <<dbutt "Sad">><<intreplace>><<ctagcontent "lover" "clownMakeupSad">><</intreplace>>
    <<dtext "cry">>Oh, I really look that bad?
  <</dialogchoice>>
  `,
];
aw.tagContent.lover.clownMakeupConfront = [
  `@@.pc;Oh, just go fuck yourself.@@<br>
  <<print aw.npc[setup.interact.status.npc].main.name>> doesn't seem to take your rebuff closely.<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.clownMakeupLaugh = [
  `@@.pc;Yeah, I know, he-he, looking pretty ridiculous.@@<br>
  @@.npc;Oh, so fix it, he-he. You are a girl or who?@@<br>
  @@.pc;Yeah, yeah. Girl of course. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.clownMakeupCool = [
  `You go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.clownMakeupSad = [
  `<<stress 5>>@@.pc;Oh, I really look that bad?@@<br>
  Your eyes start watering and <<print aw.npc[setup.interact.status.npc].main.name>> finally stops giggling.<br>
  @@.npc;Oww, sorry I didn't meant to...@@<br>
  @@.pc;You think this is funny? That I look like a scank?@@<br>
  @@.npc;No, I was just... See, I am sorry! Please don't cry.@@<br>
  After some time you feel better and stop crying.<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.withdrawal = [
  `@@.mono;Oh I actually feel pretty shitty.@@<br>
  @@.npc;Hey, <<print ↂ.pc.main.name>>, are you ok?@@<br>
  @@.pc;Ah? Yes-yes, it is okay, I just drifted in thoughts for a moment.@@<br>
  @@.mono;Ugh, I really need to deal with that withdrawal soon.@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.latePreg = [
  `@@.npc;Oh, that it is growing bigger every day!@@<br>
  <<if ↂ.pc.trait.maternal == 1>>@@.pc;Yes, I ll pop some beautiful baby any time soon. I am soo happy!@@<br>
  <<else>>@@.pc;Yeah. This is hard to carry around already, hope I ll give birth soon!@@<br>
  <</if>>@@.npc;I am so happy for you!@@<br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
aw.tagContent.lover.drunk = [
  `@@.pc;Hii honey! Its me, srprised?!@@<br>
  @@.npc;Oh, you are so shitfaced. You can't even stand straight, ha-ha!@@
  <<dialogchoice>>
    <<dbutt "Nah" >><<intreplace>><<ctagcontent "lover" "drunkYeah">><</intreplace>>
    <<dtext "laugh">>What? No, I m sobr as a jdge!
    <<dbutt "Yeeah">><<intreplace>><<ctagcontent "lover" "drunkYeah">><</intreplace>>
    <<dtext "proud">>Bloody hell I am!
    <<dbutt "Horny">><<intreplace>><<ctagcontent "lover" "drunkFuck">><</intreplace>>
    <<dtext "love">>Wanna fuck me? I want to fuck rght now!
    <<dbutt "Pass out">><<run setup.interact.exit()>><<run setup.sleep.start();>>
    <<dtext "sleep">>I am sooo slepy, beter lay dwn just fur a tiny sec...
  <</dialogchoice>>
  `,
];
aw.tagContent.lover.drunkYeah = [
  `@@.npc;Oh, I better take you to your home.@@<br>
  @@.pc;But I wanna prty!@@<br>
  @@.npc;Well, the party is certainly over for you, heh. Come on, let's get you to the bed, honey.@@<br>
  <<link "Wait, whre are we gong?">><<addtime 54>><<gotomap "home" "foyer">><<run setup.sleep.start();>><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.lover.drunkFuck = [
  `<<if aw.npc[setup.interact.status.npc].main.female === true>>@@.pc;Wanna fuck? I ll lck you so hrd you will forget bout anything!@@<br>
    @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
    <<link "You dnt want me?">><<intreplace>><<ctagcontent "lover" "drunkYeah">><</intreplace>><</link>>
  <<else>><<SCX>><<SC "SD" 20>><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 7 >>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Oh, right here? Okay if you really want it.@@<br>
      <<link "Uhm? We are gonna fck or wht?">><<run setup.interact.exit()>><</link>>
    <<else>>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@<br>
      @@.npc;Oh, it is even worse than I thought. You really have drunk too much.@@<br>
      <<link "You dnt like me?">><<intreplace>><<ctagcontent "lover" "drunkYeah">><</intreplace>><</link>>
    <</if>>
  <</if>>
  `,
];
aw.tagContent.lover.mindbreak = [
  `You start to cry all of a sudden.<br>
  @@.npc;<<print ↂ.pc.main.name>>, what happened?!@@<br>
  @@.pc;I... I just... I feel like everything goes to hell. Whole my life is ...sob... shattered...@@<br>
  @@.npc;Ugh, there, there. It will be okay, I am sure. I am here with you.@@<br>
  @@.pc;You just don't understand, all that happened ...sob... to me, it is just too much to handle...@@<br>
  <<if ↂ.pc.trait.will > 4 >>You somehow manage to gain your reason back<<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><br>
  @@.pc;I am so sorry. It was really tough times lately.@@<br>
  @@.npc;Oh, it is okay, dont take it so close.@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  <<else>><<addtime 13>><<set ↂ.pc.groom.makeup.clown = true>><<stress -10>>You start histerically giggling.<br>
  @@.npc;Oh, poor you. Try to calm down, I ll drive you home...@@<br>
  You cry all the way while <<print aw.npc[setup.interact.status.npc].main.name>> drive the car to your house, but start to feel better when you get to the house. <<print aw.npc[setup.interact.status.npc].main.name>> leaves you in your house after getting sure you are okay now.<br>
  <<link "Say goodbye">><<addtime 54>><<gotomap "home" "foyer">><<run setup.interact.exit()>><</link>>
  <</if>>
  `,
];
aw.tagContent.lover.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>
    You feel your juices running down your inner thights with no panties in a way to stop them.<br>
    <<has exhibition>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will notice that. That is so embarassingly exciting!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>><br>
  <<else>>You feel your juices making a slippery mess slowly soaking through your panties.<<has slut>>@@.mono;Speaking with a person while being flooded like that is so naughty!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>><br><</if>>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.pussyAccess = [
  `Apologies. No content has been written for this tag [pussyAccess].<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

// OTHER TAGS

aw.tagContent.lover.stressed = [
  `@@.npc;Why my girl is so stressed? Is everything okay, sweetheart?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "lover" "stressedNope">><</intreplace>>
    <<dtext "smile">>Me? Nope, I am not stressed at all, everything is great!
    <<dbutt "A bit">><<intreplace>><<ctagcontent "lover" "stressedAbit">><</intreplace>>
    <<dtext "scared">>Yeah, so much pressure lately.
    <<dbutt "Confront" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "flirty" "stressedBitch">><</intreplace>>
    <<dtext "unamused">>Oh come on, don't act like you care.
  <</dialogchoice>>
  `,
];

aw.tagContent.lover.stressedNope = [
  `@@.pc;Me? Nope, I am not stressed at all, everything is great!@@<br>
  @@.npc;Sure? Okay, just remember that I am near if you want to talk or something.@@<br>
  @@.pc;I know, thanks. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.stressedAbit = [
  `<<has extro>>@@.pc;Yeah, so much pressure lately. It was really hard to cope with all this things in my life.@@<<else>>@@.pc;Yeah, so much pressure lately.@@<</if>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><br>
  @@.npc;Oh, poor girl. It will be okay, I promise! Don't you dare to surrender!@@<<stress -8>><br>
  @@.pc;Oh, you are so supportive. I don't know what I'd do without you to be honest.@@<br>
  @@.npc;Because I care about you, silly!@@<br>
  @@.pc;I know you do and thankful for it@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.stressedBitch = [
  `@@.pc;Oh come on, don't act like you care.@@<<set aw.npc[setup.interact.status.npc].rship.likePC -= 6 >><br>
  @@.npc;But I care, damn! Why you always need to be that hard?@@<br>
  @@.pc;Dunno. Just deal with it. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.depressed = [
  `@@.npc;Hey, you looks sad, what happened, <<print ↂ.pc.main.name>>?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "lover" "depressedNo">><</intreplace>>
    <<dtext "smile">>It is nothing.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "lover" "depressedYes">><</intreplace>>
    <<dtext "sad">>It was pretty hard day for me.
  <</dialogchoice>>
  `,
];

aw.tagContent.lover.depressedNo = [
  `@@.pc;It is nothing, I am okay, really.@@<br>
  @@.npc;Oh, you really mist not hide yourself, I can understand you.@@<br>
  @@.pc;I am okay, really, don't worry about it.@@<br>
  @@.npc;As you wish. But I am here if you need me, don't forget.@@<br>
  @@.pc;I will not. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.depressedYes = [
  `<<has extro>>@@.pc;It was pretty hard day for me. I feel really sad and depressed now... I wonder is it a good thing that I am alive at all...@@<<or>>@@.pc;It was pretty hard day for me.@@<</has>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><br>
  @@.npc;Hey, it will be okay, don't be like that! I am here with you, it will be better tommorow, I promise!@@<<happy +6>><br>
  @@.pc;I am so glad I have you with me.@@<br>
  @@.npc;Because I care about you, silly!@@<br>
  @@.pc;I know you do and thankful for it.@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.tipsy = [
  `@@.npc;You look pretty with that blush on your cheeks you know?@@<br>
  @@.pc;A little drink never hurts, yes?@@<br>
  @@.npc;No, it don't, heh.@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.athleticClothes = [
  `@@.npc;Going for a jog or something?@@<br>
  @@.pc;Well, yeah, trying to keep myself in shape.@@<br>
  @@.npc;Good luck then he-he.@@<br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
  `@@.npc;Got ready to pump iron?@@<br>
  @@.pc;It is really good for health and weight too actually. Maybe you should try too?@@<br>
  @@.npc;Mhmhm...@@<br>
  @@.pc;Ha-ha! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.kinkyClothes = [
  `<<if aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Wow, did you dress like that for me? I like it!@@<br>
  <<elseif aw.npc[setup.interact.status.npc].kink.shame>><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 7 >>@@.npc;Gosh! <<print ↂ.pc.main.name>>, what the fuck? You are dressed like a streetwalker! Is there anything I must know about you?@@<br>
  <<else>>@@.npc;He-he, decided to dress sexy, <<print ↂ.pc.main.name>>?@@<br><</if>>
  <<has liberate>>@@.pc;Life is too short to dress modestly, <<print aw.npc[setup.interact.status.npc].main.name>>!@@<br>
  <<orhas slut>>@@.pc;I just like drawing attention to my most delicious parts you know.@@<br>
  <<orhas shame>><<stress 8>>@@.pc;I... I can explain... It was just I had no other clothes to wear and... Oh...@@<br>
  <<or>>@@.pc;Well, can a girl wear something sexy from time to time, right?@@<</has>>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.nightwear = [
  `@@.npc;What happened? Why are you dressed in the nightwear?@@<br>
  @@.pc;I have nothing to answer actually.@@<br>
  @@.npc;Sometimes you are really weird, you know? You better get home and dress properly.@@<br>
  @@.pc;Yeah. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.cuteClothes = [
  `@@.npc;You are the cutest girl ever, you know that?@@<<set aw.npc[setup.interact.status.npc].rship.likePC += 1 >><br>
  @@.pc;Awww! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.superCuteClothes = [
  `@@.npc;I just love the way you dressed today!@@<<set aw.npc[setup.interact.status.npc].rship.lovePC += 2 >><br>
  @@.pc;I did it for you, glad you like it! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.slovenlyClothes = [
  `@@.npc;<<print ↂ.pc.main.name>>, honey, you should really dress better, come on.@@<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 3 >><br>
  @@.pc;Ugh. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.swimwear = [
  `@@.npc;You look pretty in this swimsuit, darling!@@<br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.damagedClothes = [
  `@@.npc;Honey, don't be slob. You really should buy new clothes.@@<br>
  <<has bitch>>@@.pc;I did not ask for an advice by the way. So...@@<<or>>@@.pc;You are right. So...@@<</has>><br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.stainedClothes = [
  `@@.npc;Is that... what are those stains on your clothes?@@
  <<dialogchoice>>
    <<dbutt "Cum" "ↂ.pc.kink.slut">><<intreplace>><<ctagcontent "lover" "stainedClothesCum">><</intreplace>>
    <<dtext "cool">>I am pretty sure this is cum, sweetheart.
    <<dbutt "Dunno">><<intreplace>><<ctagcontent "lover" "stainedClothesDunno">><</intreplace>>
    <<dtext "awkward">>No idea actually. Mayo, maybe?
  <</dialogchoice>>
  `,
];

aw.tagContent.lover.stainedClothesCum = [
  `@@.pc;I am pretty sure this is cum, silly.@@<<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 4 >><br>
  @@.npc;Wow. You are pretty open with all this stuff, you know? Better clean yourself though.@@<br>
  @@.pc;Well, will do. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.stainedClothesDunno = [
  `@@.pc;No idea actually. Mayo, maybe?@@<br>
  <<has shame>>@@.mono;Oh shit! <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>>noticed! Panic!@@<<stress 8>><</has>><br>
  @@.npc;Looks more like... whatever, you should clean this, girl!@@<br>
  @@.pc;Yeah, will do. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];

aw.tagContent.lover.angry = [
  `@@.npc;Hey, what's up? Why so grumpy?@@<br>
  <<has bitch>>@@.pc;You really better hide or I'll bite your pretty mug off!@@<<or>>@@.pc;I am really angry now, better not to touch me with a stick.@@<</has>><br>
  @@.npc;Oh, girl! It will be okay, don't be like that.@@<<angry -5>><br>
  @@.pc;Ugh. So...@@<br>
  <<include [[NPCinteraction-LoverTag]]>>
  `,
];
