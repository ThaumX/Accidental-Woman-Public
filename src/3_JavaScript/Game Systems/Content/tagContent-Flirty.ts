
//  ███████╗██╗     ██╗██████╗ ████████╗██╗   ██╗
//  ██╔════╝██║     ██║██╔══██╗╚══██╔══╝╚██╗ ██╔╝
//  █████╗  ██║     ██║██████╔╝   ██║    ╚████╔╝
//  ██╔══╝  ██║     ██║██╔══██╗   ██║     ╚██╔╝
//  ██║     ███████╗██║██║  ██║   ██║      ██║
//  ╚═╝     ╚══════╝╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝
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

aw.tagContent.flirty = {} as IntTagContent;

// RANDOMS

aw.tagContent.flirty.random = [
  `@@.npc;Oh by the way, friendly warning, don't eat at this Burger Tsar place in downtown. It tastes awful.@@<br>
  @@.pc;Oh I know, shitty place.@@<br>
  @@.npc;Yeah, made my stomach ache. Better never touch fastfood again.@@<br>
  @@.pc;Yeah, it is bad for you. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
  `@@.npc;So, do you like the city?@@
  <<dialogchoice>>
  <<dbutt "Yes">><<intreplace>><<ctagcontent "exes" "randomCityYes">><</intreplace>>
  <<dtext "excited">>It is a wonderful city! I like it so much!
  <<dbutt "No">><<intreplace>><<ctagcontent "exes" "randomCityNo">><</intreplace>>
  <<dtext "muted">>Not much to be honest.
<</dialogchoice>>
  `,
];

aw.tagContent.flirty.randomCityYes = [
  `@@.pc;It is a wonderful city! I like it so much!@@<br>
  @@.npc;Heh, nice to hear that. It is relatively small community here, but people are generally nice here.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.randomCityNo = [
  `@@.pc;Not much to be honest. This place looks like it have its own dark secrets. Weird feeling actually.@@<br>
  @@.npc;Hmm. Not sure if I get you but maybe you are right.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

// PRIORITY ONE TAGS

aw.tagContent.flirty.seriousIllness = [
  `
  @@.npc;It seems that you are really ill, how do you feel?@@
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "flirty" "seriousIllnessOkay">><</intreplace>>
    <<dtext "confused">>Yeah, I am mostly okay, thanks.
    <<dbutt "Help me">><<intreplace>><<ctagcontent "flirty" "seriousIllnessHelp">><</intreplace>>
    <<dtext "sick">>I feel really bad... I am gonna pass out now...
  <</dialogchoice>>`,
];
aw.tagContent.flirty.seriousIllnessOkay = [
  `
  @@.npc;Are you sure? You really look terrible.@@<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;Oh thanks, I had literally no idea! What a news!@@<<else>>@@.pc;I really hope I get well soon, I am feeling even worse than I look.@@<</if>><br>
  @@.npc;Oh, we don't want to see such precious girl like you ill, right? Take care of your, pretty one.@@<br>
  @@.pc;Gonna do that. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.seriousIllnessHelp = [
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
aw.tagContent.flirty.illness = [
  `@@.npc;Are you okay? You seem a bit ill.@@
  <<dialogchoice>>
    <<dbutt "Sarcasm" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "flirty" "illnessBitchy">><</intreplace>>
    <<dtext "joke">>Still looks better than you, ha.
    <<dbutt "Okay">><<intreplace>><<ctagcontent "flirty" "illnessOkay">><</intreplace>>
    <<dtext "smile">>Nope, I am okay.
    <<dbutt "No">><<intreplace>><<ctagcontent "flirty" "illnessBad">><</intreplace>>
    <<dtext "unamused">>That is true, I am a bit sick actually.
  <</dialogchoice>>`,
];
aw.tagContent.flirty.illnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >>@@.npc;Well, I'd wont say so to be honest.@@<br>
  @@.pc;Yeah, whatever. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.illnessOkay = [
  `@@.npc;Well if you think so... be safe anyway.@@<br>
  @@.pc;Thanks. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.illnessBad = [
  `@@.npc;You should totally see a doctor, better not ignore such things.@@<br>
  @@.pc;Yeah, I know, I ll follow your advice soon I guess. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.nakedBottom = [
  `<<if aw.npc[setup.interact.status.npc].kink.exhibition || aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Oh, wow. Nice day for giving your kitten some fresh air, mm? Looking good by the way, I certainly like the view, but what if somebody else see you like that?@@<<elseif aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, damn, <<print ↂ.pc.main.name>> please, cover your butt with something! People can see you!@@<<else>>@@.npc;Oh... well... I am pretty sure that you are aware that you are half naked, huh? Feeling bold today?@@<</if>><br>
  <<has exhibition>>You can't but wiggle your <<p assSize>> butt a bit, presenting your nakedness to the flirty.<br>
  @@.mono;Oh yes, stare at me. Damn, that is exciting!@@<br>
  @@.pc;Do you like it?@@<<arouse 2>><<orhas slut>><<arouse 2>>You can't but enjoy the attention to your naked bottom and pussy.<br>
  <<orhas liberate>>You feel pretty comfortable with your lower part naked.<br>
  <<orhas shame>><<stress 10>>You feel terribly insecure and going tomato red from embarassment.<<arouse -2>><br>
  @@.mono;How did I ever allow that to happen? I want just die right now. What will <<print aw.npc[setup.interact.status.npc].main.name>> think about me?@@<br>
  <<or>><<stress 7>>You feel pretty uncomfortable being exposed like this even with a flirty.<<arouse -1>><br><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "flirty" "NakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give <<print aw.npc[setup.interact.status.npc].main.name>> a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "flirty" "NakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Apologize and cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "flirty" "NakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.flirty.NakedBottomPresent = [
  `<<SCX>><<SC "SD" "15">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>><br>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "flirty" "NakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and NPC is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<<intreplace>><<ctagcontent "flirty" "NakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "flirty" "NakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.flirty.NakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.NakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;You know what? Just leave me already.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.flirty.NakedBottomCover = [
  `You try to cover yourself and go on with the convo.<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.NakedBottomCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed properly.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br><</if>>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.NakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5>>@@.npc;Well, that all is pretty weird to be honest.@@<</if>><br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.practNakedBottom = [
  `
  <<print aw.npc[setup.interact.status.npc].main.name>>'s stare reminds you about your risky dress choice. Your pussy and ass are almost visible to your flirty <<has exhibition>><<arouse 2>>which makes you more arouse.<br>
  @@.mono;If I lean a bit all my private parts will be visible, mmm.@@<br>
  <<orhas slut || liberate>>which is pretty comfortable for you in fact.<br>
  @@.mono;I am pretty sure <<print aw.npc[setup.interact.status.npc].main.name>> likes the view, hehe.@@
  <<orhas shame>><<arouse -2>><<stress 5>>which makes you really nervous.<br>
  @@.mono;I shoudn't dress like that in a first place, oh, what I was even thinking about?@@
  <<or>><<stress 3>>which makes you feel uneasy.<br>
  @@.mono;Well, I am dressed risky today for sure. <<print aw.npc[setup.interact.status.npc].main.name>> will surely think I am a slut or something.@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, you have really risky clothes today. I'd never dare to dress like that being in your place!@@
  <<else>>@@.npc;Wow, pretty revealing clothes you have there. Enjoying the fresh air, huh?@@<</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "flirty" "practNakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give <<print aw.npc[setup.interact.status.npc].main.name>> a bit better view on your lady bits.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "flirty" "practNakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Ask">><<intreplace>><<ctagcontent "flirty" "practNakedBottomAsk">><</intreplace>>
      <<dtext "happy">>Ask about <<print aw.npc[setup.interact.status.npc].main.name>> for opinion on your clothes.
  <</dialogchoice>>`,
];
aw.tagContent.flirty.practNakedBottomPresent = [
  `<<SCX>><<SC "SD" "15">>You lean forward, obcenely exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<br><<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>><br>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "flirty" "practNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  You failed the check and <<print aw.npc[setup.interact.status.npc].main.name>> is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<<intreplace>><<ctagcontent "flirty" "practNakedBottomPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "flirty" "practNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.flirty.practNakedBottomAsk = [
  `@@.pc;So, what do you think about this one? How do I look?@@<br>
  You spin in front of <<print aw.npc[setup.interact.status.npc].main.name>> presenting yourself.<br>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Well, it looks good on you, just a tiny bit... revealing, don't you think?@@
  <<else>>@@.npc;Pretty nice! I like the way you dress, so... brave I guess.@@<</if>><br>
  @@.pc;Thanks, hehe. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.practNakedBottomCool = [
  `You prefer to act normally and go on with your convo.<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.practNakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.practNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, that all is pretty weird to be honest.@@<</if>><br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.practNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;Okay, it seems you are not in the mood today, we better talk next time when you ll get all that sand out of your clearly visible vagina.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.flirty.buckNaked = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> stares at your nude body <<has exhibition>><<aroused 2>>which makes you more aroused<br>
  @@.mono;Oh yeah, I can't believe I am doing that! Presenting "the goods" to <<print aw.npc[setup.interact.status.npc].main.name>>, oh, I gonna get moist now!@@<br>
  <<orhas slut || liberate>>which you can deal with.<br>
  @@.mono;That is prety exciting, not sure if <<print aw.npc[setup.interact.status.npc].main.name>> will like that though.@@
  <<orhas shame>><<aroused -2>><<stress 25>>which makes you panic.<br>
  @@.mono;Shit, <<print aw.npc[setup.interact.status.npc].main.name>> will think that I am batshit crazy or something!@@<br>
  <<or>><<stress 15>>which makes you feel terrible.<br>
  @@.mono;Oops, I am totally naked. <<print aw.npc[setup.interact.status.npc].main.name>> is watching. I am screwed.@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh my gosh, <<print ↂ.pc.main.name>>, why are you naked? What happened?@@<br>
  <<elseif aw.npc[setup.interact.status.npc].kink.exhibition || aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Wow. You girl is really bold, huh? I like it!@@<br>
  <<else>>@@.npc;Oh. You, well, what happened? Where are your clothes?@@<br><</if>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "flirty" "buckNakedPresent">><</intreplace>>
      <<dtext "smug">>Rotate exposing yourself further.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "flirty" "buckNakedCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "flirty" "buckNakedCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Say bye awkwardly and run away.
  <</dialogchoice>>`,
];
aw.tagContent.flirty.buckNakedPresent = [
  `<<SCX>><<SC "SD" "10">>You expose your body to <<print aw.npc[setup.interact.status.npc].main.name>> in suggestive manner.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@<<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 15>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 13>><br>
  That arouses <<print aw.npc[setup.interact.status.npc].main.name>>. They propose you to have sex. Right here and right now.
  <<dialogchoice>>
      <<dbutt "Yes">>
      <<dtext "smug">>At last, I was sure you ll never propose this! (need to call sexscene here)
      <<dbutt "No">><<intreplace>><<ctagcontent "flirty" "buckNakedBottomPresentRefuse">><</intreplace>>
      <<dtext "muted">>Well... no, thanks.
  <</dialogchoice>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>You failed the check and <<print aw.npc[setup.interact.status.npc].main.name>> is pissed off.<br>
  @@.npc;Oh come on, really? That is the way you try to move our relations forward? Please, cover yourself already, gosh!@@
  <<dialogchoice>>
      <<dbutt "Sorry">><<intreplace>><<ctagcontent "flirty" "buckNakedPresentChat">><</intreplace>>
      <<dtext "unhappy">>Apologize for acting stupid.
      <<dbutt "Not sorry" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "flirty" "buckNakedBottomPresentNotsorry">><</intreplace>>
      <<dtext "arrogant">>Oh, screw you.
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.flirty.buckNakedPresentChat = [
  `@@.pc;Ehh... Sorry...@@<br>
  @@.npc;Well... you better dress up before anybody shows up.@@<br>
  <<link "Yeah...">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.flirty.buckNakedCover = [
  `You try to cover your body with hands which is not super effective.<<if aw.npc[setup.interact.status.npc].kink.shame>><br>
  @@.npc;S-sorry, you really better dress now, it is just so weird...@@<br>
  <<link "Yeah...">><<run setup.interact.exit()>><</link>><<else>>
  NPC tries his best to ignore your nakedness.<br>
  @@.npc;W-well, what were we talking about?@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>><</if>>
  `,
];
aw.tagContent.flirty.buckNakedCool = [
  `<<if aw.npc[setup.interact.status.npc].kink.shame>>@@.npc;Oh, really, I can't stand it. We better talk some another day, really. When you will be dressed.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>><<else>>You prefer to act normally and go on with your convo.<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  <<else>>
  <<include [[NPCinteraction-FlirtyTag]]>>
  <</if>>
  <</if>>`,
];
aw.tagContent.flirty.buckNakedBottomPresentRefuse = [
  `<<if aw.npc[setup.interact.status.npc].sub>><<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;Oh, you are such a tease, you know? Damn.@@<<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 1>>@@.npc;Well, you are such a weirdo, you know?@@<</if>><br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.buckNakedBottomPresentNotsorry = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;Okay, it seems you are not in the mood today. Maybe next time you will act more like a adult human being. And clothed one too.@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.flirty.wetClothes = [
  `<<if ↂ.pc.clothes.keys.bra === 0>>You notice <<print aw.npc[setup.interact.status.npc].main.name>> looks at your chest and realise that your <<p nipl.q>> <<p nipples.n>> are visible through the wet clothes.<br>
  <<has exhibition>><<arouse 1>>@@.mono;Oh yeah, I like that.@@<br>
  <<orhas slut>>@@.mono;That is certainly drawing some attention.@@<br>
  <<orhas shame>><<stress 7>>@@.mono;Oh shit, my nipples are showing!@@<br>
  <<or>><<stress 2>>@@.mono;Oops, better cover that!@@<br><</has>>
  <<if aw.npc[setup.interact.status.npc].kink.shame>>It seems, <<if aw.npc[setup.interact.status.npc].main.female>>she is doing her<<else>>he is doing his best<</if>> to ignore your clearly visible nipples.<<else>>@@.npc;You are aware about your nipples being visible, yep?@@<</if>>
  <<dialogchoice>>
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "flirty" "wetClothesCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "flirty" "wetClothesCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>
  <<else>>
  @@.npc;You better change before you catch cold.@@<br>
  @@.pc;Yeah... that was pretty hilarious situation that got me wet like this, hehe. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  <</if>>`,
];
aw.tagContent.flirty.wetClothesCover = [
  `You cover your <<p breastShape.n>> breast with your hand.<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.wetClothesCool = [
  `<<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@<br>
  @@.npc;S-sorry... So what were we talking about?@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  <<else>>
  <<include [[NPCinteraction-FlirtyTag]]>>
  <</if>>`,
];
aw.tagContent.flirty.lightPheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 3 >>
  It seems that <<print aw.npc[setup.interact.status.npc].main.name>> is fighting with some hostility towards you for some reason.<<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 3 >>It seems that <<print aw.npc[setup.interact.status.npc].main.name>> is eating you with eyes full of sudden lust.<</if>><br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.pheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 8 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 8 >>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 8 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 8 >>You notice some sexual interest sparkling in the eyes of <<print aw.npc[setup.interact.status.npc].main.name>>.<br><</if>>
  <<include [[NPCinteraction-FlirtyTag]]>>`,
];
aw.tagContent.flirty.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC += 1>>@@.npc;You are so magnetic you know? Are kind of a witch or something?@@<br>
  @@.pc;Yeah, just some dark rituals and a bit of ancient gods blessings. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.hairyPits = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>@@.npc;Oh, please, do you really like this armpit hairs?@@<br>
  @@.pc;What is the problem with it?@@<br>
  @@.npc;Come on, it is 2032 already, nobody grows those novadays.@@
  <<dialogchoice>>
    <<dbutt "Okay">><<intreplace>><<ctagcontent "flirty" "hairyPitsOkay">><</intreplace>>
    <<dtext "neutral">>Maybe, just maybe I ll get rid of them. Happy now?
    <<dbutt "Nope">><<intreplace>><<ctagcontent "flirty" "hairyPitsNope">><</intreplace>>
    <<dtext "silly">>Nope, I like it the natural way.
    <<dbutt "Bitch" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "flirty" "hairyPitsBitch">><</intreplace>>
    <<dtext "mad">>I'll keep it the way i want you opressive fuck.
  <</dialogchoice>>`,
];
aw.tagContent.flirty.hairyPitsOkay = [`
@@.pc;Okay, maybe, just maybe I ll get rid of them. Happy now?@@<br>
@@.npc;Oh yeah, such a relief! I was a bit frightened to ask because, you know... Glad that you are okay with this.@@<br>
@@.pc;If you like it I'll do that, heh.@@<br>
@@.npc;That will make me happiest <<if aw.npc[setup.interact.status.npc].main.female>>woman<<else>>man<</if>> on Earth.@@<br>
@@.pc;You're welcome. So...@@<br>
<<include [[NPCinteraction-FlirtyTag]]>>
`];
aw.tagContent.flirty.hairyPitsBitch = [`
<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 16 >><<set aw.npc[setup.interact.status.npc].rship.likePC -= 13 >>@@.pc;I'll keep it the way I want you opressive fuck@@<br>
@@.npc;Ouch, that was pretty rude. You... I better go, I don't feel like talking now honestly.@@<br>
<<link "Well screw you then">><<run setup.interact.exit()>><</link>>
`];
aw.tagContent.flirty.hairyPitsNope = [`
<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 6 >>@@.pc;Nope, I like it the natural way.@@<br>
@@.npc;Ugh, okay. I can't insist, do I?@@<br>
@@.pc;Nope, you can't. So...@@<br>
<<include [[NPCinteraction-FlirtyTag]]>>
`];
aw.tagContent.flirty.clownMakeup = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> looking on you frowning.<br>
  @@.pc;What?@@<br>
  @@.npc;It is your makeup... it seems to be a little... blurred?@@
  <<dialogchoice>>
    <<dbutt "Act cool">><<intreplace>><<ctagcontent "flirty" "clownMakeupCool">><</intreplace>>
    <<dtext "cool">>Yeah, It got ruined, pretty funny. I ll fix it later.
    <<dbutt "Panic">><<run setup.interact.exit()>>
    <<dtext "dismay">>Oh, really? I need to fix it right now, don't go anywhere!
  <</dialogchoice>>`,
];
aw.tagContent.flirty.clownMakeupCool = [
  `@@.pc;Yeah, It got ruined, pretty funny. I ll fix it later.@@<br>
  @@.npc;Okay.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.withdrawal = [
  `@@.mono;Oh I feel terrible.@@<br>
  @@.npc;Hmm. What is wrong? Is it okay?@@<br>
  @@.pc;Ah? Yes-yes, it is good, I am okay. Just got a bit distracted.@@<br>
  @@.mono;Ugh, even <<print aw.npc[setup.interact.status.npc].main.name>> noticed.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];
aw.tagContent.flirty.latePreg = [
  `@@.npc;You really will become mother soon. Do it kicks already?@@<br>
  <<if ↂ.pc.trait.maternal == 1>>@@.pc;Most of the time and I feel so happy to feel that! I hope I will be really good mother!@@<br>
  <<else>>@@.pc;Yeah. This is pretty uncomfortable sometimes, but it worth it after all, right?@@<br>
  <</if>>@@.npc;Of course you will!@@<br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>`,
];
aw.tagContent.flirty.drunk = [
  `@@.pc;Oh hai thr! It is you I lookd fr!@@<br>
  @@.npc;Oh. Shit, how much did you drunk, girl?@@
  <<dialogchoice>>
    <<dbutt "Not mch" >><<intreplace>><<ctagcontent "flirty" "drunkYeah">><</intreplace>>
    <<dtext "tongue">>Jst a glss or two maybe...
    <<dbutt "Loots">><<intreplace>><<ctagcontent "flirty" "drunkYeah">><</intreplace>>
    <<dtext "laugh">>All I could fnd he-he-he-he!
    <<dbutt "Puke">><<intreplace>><<ctagcontent "flirty" "drunkPuke">><</intreplace>>
    <<dtext "sick">>I feel trrble, I'm gnna...
  <</dialogchoice>>`,
];
aw.tagContent.flirty.drunkYeah = [
  `@@.npc;Oh my. Are you always drinking so much or it was just special occasion?@@<br>
  @@.pc;I dnt drink much! I'm a dcent girl you knw?@@<br>
  @@.npc;Yeah, whatever...@@<br>
  @@.pc;You knw what? Thts is bullshit. I wasn't lke that all my lfe! I was diffrent!@@<br>
  @@.npc;You mean, drinked a lot or something?@@<br>
  @@.pc;No! I mean I ws not the girl, I was a guy bfore the accidnt and...@@<br>
  @@.npc;What? You are transgender or something? I don't get your mumblings.@@<br>
  @@.pc;Wht? Who, me? No I'm not damn! Wht did we tlked about? I knw! I wnt to drnk! Whre drinks are?@@<br>
  @@.npc;Oh i really have to go actually. Have fun or anything...@@<br>
  <<link "Wait, you dnt want to drink wth me?">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.flirty.drunkPuke = [
  `You try to hold it but fail and throw the content of your stomach on the floor in front of <<print aw.npc[setup.interact.status.npc].main.name>>.<br>
  @@.npc;Oh damn! I really have to go. And you need to drink less, really.@@<br>
  <<link "Bwwwyaaa">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.flirty.mindbreak = [
  `You start to cry all of a sudden.<br>
  @@.npc;Oh my. Why... why are you crying, <<print ↂ.pc.main.name>>?@@<br>
  @@.pc;It all goes... to pieces! All my life...@@<br>
  @@.npc;Ugh, hush, hush. It will be okay, I promise.@@<br>
  @@.pc;sob... It is just...sob...too much for one person...@@<br>
  <<if ↂ.pc.trait.will > 4 >>You somehow manage to gain your reason back<<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><br>
  @@.pc;I am so sorry. It was really tough times lately.@@<br>
  @@.npc;Oh, it is okay. Here, take the handkerchief.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  <<else>><<addtime 13>><<set ↂ.pc.groom.makeup.clown = true>><<stress -10>>You start switching randomly between crying and histerically giggling.<br>
  @@.npc;Oh, poor you. Try to calm down, I ll drive you home...@@<br>
  You cry all the way while <<print aw.npc[setup.interact.status.npc].main.name>> drive the car to your house, but start to feel better when you get to the house. <<print aw.npc[setup.interact.status.npc].main.name>> leaves you in your house after getting sure you are okay now.<br>
  <<link "Say goodbye">><<addtime 54>><<gotomap "home" "foyer">><<run setup.interact.exit()>><</link>>
  <</if>>`,
];
aw.tagContent.flirty.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>
    You feel your juices running down your inner thights with no panties in a way to stop them.<br>
    <<has exhibition>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will notice that. That is so embarassingly exciting!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>><br>
  <<else>>
    You feel your juices making a slippery mess slowly soaking through your panties.<<has slut>>@@.mono;Speaking with a person while being flooded like that is so naughty!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> won't notice that.@@<</has>><br>
  <</if>>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.pussyAccess = [
  `Apologies. No content has been written for this tag [pussyAccess].<br>
  <<include [[NPCinteraction-FlirtyTag]]>>`,
];

// OTHER TAGS

aw.tagContent.flirty.stressed = [
  `@@.npc;Why so nice girl like you are nervous? What could make you stressed?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "flirty" "stressedNope">><</intreplace>>
    <<dtext "smile">>It is nothing, I am good.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "flirty" "stressedAbit">><</intreplace>>
    <<dtext "scared">>Oh, I am stressed in fact.
    <<dbutt "Confront" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "flirty" "stressedBitch">><</intreplace>>
    <<dtext "unamused">>Stop acting like a moron.
  <</dialogchoice>>
  `,
];

aw.tagContent.flirty.stressedNope = [
  `@@.pc;It is nothing, I am good.@@<br>
  @@.npc;Well, I just thought you was under some pressure. Nice to hear that you are okay.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.stressedAbit = [
  `<<has extro>>@@.pc;Oh, I am stressed in fact. It was really hard to cope with all this lately. You see? Even my arm are trembling.<<stress -5>>@@<<or>>@@.pc;Oh, I am stressed in fact.@@<</has>><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >><br>
  @@.npc;Oh, poor you. Maybe some date with a decent <<if aw.npc[setup.interact.status.npc].main.female>>girl<<else>>guy<</if>> will help? I heard this can help a lot.@@
  <<dialogchoice>>
    <<dbutt "Sure">><<intreplace>><<datescheduler setup.interact.status.npc>><</intreplace>>
    <<dtext "wink">>He-he, okay, sounds like a nice idea!
    <<dbutt "Maybe">><<intreplace>><<ctagcontent "flirty" "stressedRefuse">><</intreplace>>
    <<dtext "muted">>Well, I am not in the mood actually.
  <</dialogchoice>>
  `,
];

aw.tagContent.flirty.stressedRefuse = [
  `@@.pc;Well, I am not in the mood actually.@@<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 9 >><br>
  @@.npc;Oh, okay. Maybe next time then.@@<br>
  @@.pc;Yeah, maybe. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.depressed = [
  `@@.npc;Hey, you looks sad, what happened?@@
  <<dialogchoice>>
    <<dbutt "Nope">><<intreplace>><<ctagcontent "flirty" "depressedNo">><</intreplace>>
    <<dtext "smile">>It is nothing, I am good.
    <<dbutt "A bit">><<intreplace>><<ctagcontent "flirty" "depressedYes">><</intreplace>>
    <<dtext "sad">>Just a hard day.
  <</dialogchoice>>
  `,
];

aw.tagContent.flirty.depressedNo = [
  `@@.pc;It is nothing, I am good.@@<br>
  @@.npc;Oh, okay.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.depressedYes = [
  `@@.pc;Just a hard day.@@<br>
  @@.npc;Hey, Maybe I could cheer you up? Like a date this week or next?@@<br>
  <<dialogchoice>>
    <<dbutt "Sure">><<intreplace>><<datescheduler setup.interact.status.npc>><</intreplace>>
    <<dtext "wink">>He-he, okay, sounds like a nice idea!
    <<dbutt "Maybe">><<intreplace>><<ctagcontent "flirty" "depressedRefuseDate">><</intreplace>>
    <<dtext "muted">>Well, I am not in the mood actually.
  <</dialogchoice>>
  `,
];

aw.tagContent.flirty.depressedRefuseDate = [
  `@@.pc;Well, I am not in the mood actually.@@<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 4 >><br>
  @@.npc;Oh, okay.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.tipsy = [
  `@@.npc;You look pretty with that blush on your cheeks you know?@@<br>
  @@.pc;A little drink never hurts, yes?@@<br>
  @@.npc;No, it don't, heh.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.athleticClothes = [
  `@@.npc;Going for a jog or something?@@<br>
  @@.pc;Well, yeah, trying to keep myself in shape.@@<br>
  @@.npc;Good for you I guess...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
  `@@.npc;Got ready to pump iron?@@<br>
  @@.pc;It is really good for health and weight too actually.@@<br>
  @@.npc;Way too go then.@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.kinkyClothes = [
  `<<if aw.npc[setup.interact.status.npc].kink.liberate>>@@.npc;Wow, did you dress like that for me? I like it!@@
  <<elseif aw.npc[setup.interact.status.npc].kink.shame>><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 7 >>@@.npc;Gosh! <<print ↂ.pc.main.name>>, what the fuck? You are dressed like a streetwalker! Is there anything I must know about you?@@<br>
  <<else>>@@.npc;He-he, decided to dress sexy, <<print ↂ.pc.main.name>>?@@<</if>><br>
  <<has liberate>>@@.pc;Life is too short to dress modestly, <<print aw.npc[setup.interact.status.npc].main.name>>!@@<br>
  <<orhas slut>>@@.pc;I just like drawing attention to my most delicious parts you know.@@<br>
  <<orhas shame>><<stress 8>>@@.pc;Please, don't be mad! I have no idea how I wound up dressed like this, honestly. I just thought that I must push my boundaries and now I feel stupid and lewd.@@<br>
  <<or>>@@.pc;Well, can a girl wear something sexy from time to time, right?@@<br><</has>>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.nightwear = [
  `@@.npc;Is this a nightwear? Why are you dressed in it here?@@<br>
  @@.pc;I have nothing to answer actually.@@<br>
  @@.npc;Sometimes you are really weird, you know?@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.cuteClothes = [
  `@@.npc;Aw, you are dressed so cute today!@@<<set aw.npc[setup.interact.status.npc].rship.likePC += 1 >><br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.superCuteClothes = [
  `@@.npc;I just don't know how to react to such cute girl! You look super nice today!@@<<set aw.npc[setup.interact.status.npc].rship.lovePC += 3 >><br>
  @@.pc;You like it? Nice, he-he. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.slovenlyClothes = [
  `@@.npc;<<print ↂ.pc.main.name>>, honey, you should really dress better, come on.@@<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 3 >><br>
  @@.pc;Ugh. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.swimwear = [
  `@@.npc;This swimsuit really fits you, <<print ↂ.pc.main.name>>! You look gorgeous!@@<br>
  @@.pc;Thanks! So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.damagedClothes = [
  `@@.npc;You...@@<br>
  @@.pc;What?@@<br>
  @@.npc;You really should buy new clothes. Those you wearing are in really bad condition honestly.@@<br>
  <<has bitch>>@@.pc;I did not ask for an advice by the way. So...@@<<or>>@@.pc;You are right. So...@@<</has>><br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.stainedClothes = [
  `@@.npc;Hey, what is it on your clothes?@@<br>
  @@.pc;What do you mean?@@<br>
  @@.pc;Those stains. Looks weird.@@
  <<dialogchoice>>
    <<dbutt "Cum" "ↂ.pc.kink.slut">><<intreplace>><<ctagcontent "flirty" "stainedClothesCum">><</intreplace>>
    <<dtext "cool">>I am pretty sure this is cum, silly.
    <<dbutt "Dunno">><<intreplace>><<ctagcontent "flirty" "stainedClothesDunno">><</intreplace>>
    <<dtext "awkward">>No idea actually. Mayo, maybe?
  <</dialogchoice>>
  `,
];

aw.tagContent.flirty.stainedClothesCum = [
  `@@.pc;I am pretty sure this is cum, silly.@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC -= 7 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 14 >>
  @@.npc;W-what? Whose cum is this?... Wait, I don't want to know actually. I better go now.@@<br>
  <<link "As you wish">><<run setup.interact.exit()>><</link>>
  `,
];

aw.tagContent.flirty.stainedClothesDunno = [
  `@@.pc;No idea actually. Mayo, maybe?@@<br>
  <<has shame>>@@.mono;Oh shit! <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>>noticed! Panic!@@<<stress 8>><br><</has>>
  @@.npc;Looks more like... whatever, you should clean this, girl!@@<br>
  @@.pc;Yeah, will do. So...@@<br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];

aw.tagContent.flirty.angry = [
  `@@.npc;Hey, what's up? Why so grumpy?@@<br>
  <<has bitch>>@@.pc;You really better hide or I'll bite your pretty mug off!@@<<or>>@@.pc;I am really angry now, better not to touch me with a stick.@@<br><</has>>
  @@.npc;Oh, girl! It will be okay, don't be like that.@@<<angry -5>><br>
  <<include [[NPCinteraction-FlirtyTag]]>>
  `,
];