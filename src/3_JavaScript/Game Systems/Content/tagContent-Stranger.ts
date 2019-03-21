
//  ███████╗████████╗██████╗  █████╗ ███╗   ██╗ ██████╗ ███████╗██████╗
//  ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝ ██╔════╝██╔══██╗
//  ███████╗   ██║   ██████╔╝███████║██╔██╗ ██║██║  ███╗█████╗  ██████╔╝
//  ╚════██║   ██║   ██╔══██╗██╔══██║██║╚██╗██║██║   ██║██╔══╝  ██╔══██╗
//  ███████║   ██║   ██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗██║  ██║
//  ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
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

aw.tagContent.stranger = {} as IntTagContent;

// RANDOMS

aw.tagContent.stranger.random = [
  `@@.npc;So, you are new in town?@@<br>
  @@.pc;Well kinda. I got here not so long ago actually.@@<br>
  @@.npc;I hope you will like it. As I say, there is no place as Appletree!@@<br>
  @@.pc;I hope so too. Well...@@<br><<include [[NPCinteraction-StrangerContinue]]>>`,
  `@@.npc;You should totally watch this new movie! I went to the cinema yesterday and it is really good!@@<br>
  @@.pc;Which one?@@<br>
  @@.npc;"Ice-something". I honestly forgot the second word but I really liked it!@@<br>
  @@.npc;I ll take a look, thanks! Well...@@<br><<include [[NPCinteraction-StrangerContinue]]>>`,
];

// PRIORITY ONE TAGS

aw.tagContent.stranger.seriousIllness = [
  `
  @@.npc;You looks terrible. Are you okay?@@
  <<dialogchoice>>
    <<dbutt "Bitchy" "ↂ.pc.trait.bitch = 1">><<intreplace>><<ctagcontent "stranger" "seriousIllnessBitchy">><</intreplace>>
    <<dtext "mad">>Cough...That is none of your business, you fuck.
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "stranger" "seriousIllnessOkay">><</intreplace>>
    <<dtext "confused">>Yeah, I am good...mostly. Thanks for asking.
    <<dbutt "Help me">><<intreplace>><<ctagcontent "stranger" "seriousIllnessHelp">><</intreplace>>
    <<dtext "sick">>I feel really bad... I gonna pass out now...
  <</dialogchoice>>`,
];
aw.tagContent.stranger.seriousIllnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 10 >>@@.npc;Ugh, okay. Whatever. No need to be so rude, miss. I just wanted to help.@@<br>
  @@.pc;Yeah, whatever. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.seriousIllnessOkay = [
  `
  @@.npc;Okay, that is none of my business but I still advise you to see a doc.@@<br>
  @@.pc;I most certainly gonna do that soon. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.seriousIllnessHelp = [ 
  `@@.npc;I better call the ambulance, hang in there, help will come soon!@@<br>
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
aw.tagContent.stranger.illness = [
  `@@.npc;Are you okay? You seems a bit ill.@@
  <<dialogchoice>>
    <<dbutt "Bitchy" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "stranger" "illnessBitchy">><</intreplace>>
    <<dtext "mad">>Did I ask for your opinion? It seems not. So shut your bloody mouth.
    <<dbutt "Okay">><<intreplace>><<ctagcontent "stranger" "illnessOkay">><</intreplace>>
    <<dtext "smile">>I am okay. Thanks for asking.
    <<dbutt "Nope">><<intreplace>><<ctagcontent "stranger" "illnessBad">><</intreplace>>
    <<dtext "unamused">>I am a bit sick actually.
  <</dialogchoice>>`,
];
aw.tagContent.stranger.illnessBitchy = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 10 >>@@.npc;Huh, okay, please calm down. I just tried to be friendly.@@<br>
  @@.pc;Yeah, whatever. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.illnessOkay = [
  `
  @@.npc;That is good, sorry, I just thought... (npc must be a bit confused here - he/she cant say "but you looks terrible" obviously)@@<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.illnessBad = [
  `
  @@.npc;You should totally see a doctor, better not ignore such things.@@<br>
  @@.pc;Yeah, I know, I ll follow your advice soon I guess. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.nakedBottom = [
  `
  You notice that <<print aw.npc[setup.interact.status.npc].main.name>> is <<if aw.npc[setup.interact.status.npc].kink.exhibition>><<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >> ogling your naked bottom with arousal.<<elseif aw.npc[setup.interact.status.npc].kink.liberate>> staring at your nudity with interest.<<elseif aw.npc[setup.interact.status.npc].kink.shame>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >> blushing while trying to avoid staring at your naked bottom.<<else>> making quick amused glances at your bare bottom.<</if>><br>
  <<has exhibition>>You can't but wiggle your <<assSize>> butt a bit, presenting your nakedness to the stranger.@@.mono;Oh yes, stare at me. Damn, that is exciting!@@<<arouse 2>><<orhas slut>><<arouse 2>>You can't but enjoy the attention to your naked bottom and pussy.<<orhas liberate>>You feel pretty comfortable with your lower part naked around strangers.<<orhas shame>><<stress 15>>You feel terribly insecure and going tomato red from embarassment. <<arouse -2>>@@.mono;How did I ever allow that to happen? I want just die right now.@@<<or>><<stress 7>>You feel pretty uncomfortable being exposed like this.<<arouse -1>><</has>>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "stranger" "NakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give a stranger a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "stranger" "NakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "stranger" "NakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.stranger.NakedBottomPresent = [
  `<<SCX>><<SC "SD" "20">>You lean forward, obcenely exposing your lady bits. @@.mono;Let's see what will you do if I ll act like that.@@<<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><br>
  That arouses the stranger.<br>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>You failed the check and NPC is pissed off. @@.npc;Please, can you cover or something? That is plain obscene.@@
  <<dialogchoice>>
      <<dbutt "Run" "ↂ.pc.kink.exhibition">><<run setup.interact.exit()>>
      <<dtext "disturbed">>Run away in embarassment
      <<dbutt "Talk">><<intreplace>><<ctagcontent "stranger" "NakedBottomPresentChat">>
      <<dtext "awkward">>Ehh.. sure, sorry...
  <</dialogchoice>>
  <</if>>
  `,
];
aw.tagContent.stranger.NakedBottomPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@<br>
  You try to go on with the convo as if nothing happened.<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.NakedBottomCover = [
  `You try to cover yourself and go on with the convo.<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.NakedBottomCool = [
  `You prefer to act normally and go on with your convo.<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.practNakedBottom = [
  `
  Strangers stare reminds you about your risky dress choice. Your pussy and ass are almost visible to the stranger 
  <<has exhibition>><<arouse 2>>which makes you more arouse.<br>
  @@.mono;If I lean a bit all my private parts will be visible, mmm@@
  <<orhas slut || liberate>>which is pretty comfortable for you in fact.
  @@.mono;I like the attention@@<br>
  <<orhas shame>><<arouse -2>><<stress 10>>which makes you really nervous.
  @@.mono;I shoudn't dress like that in a first place, oh, what I was even thinking about?@@
  <<or>><<stress 5>>which makes you feel uneasy.<br>
  @@.mono;Well, I am dressed risky today for sure@@<</has>><br>
  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "stranger" "practNakedBottomPresent">><</intreplace>>
      <<dtext "smug">>Give a stranger a bit better view on your lady bits.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "stranger" "practNakedBottomCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool">><<intreplace>><<ctagcontent "stranger" "practNakedBottomCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
  <</dialogchoice>>`,
];
aw.tagContent.stranger.practNakedBottomPresent = [
  `<<SCX>><<SC "SD">>You lean forward, innocently exposing your lady bits.<br>
  @@.mono;Let's see what will you do if I ll act like that.@@
  <<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 7 >>
  That arouses the stranger.<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <<else>>
  <<set aw.npc[setup.interact.status.npc].rship.likePC -= 7 >>
  You failed the check and NPC is pissed off.
  @@.npc;Please, can you cover or something? That is plain obscene.@@
  Feeling a bit stupid you go on with the convo.
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <</if>>
  `,
];
aw.tagContent.stranger.practNakedBottomCover = [
  `You try to cover yourself and go on with the convo.<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.buckNaked = [
  `Stranger stare at your nude body <<has exhibition>><<aroused 2>>which makes you more aroused @@.mono;Oh yeah, I can't believe I am doing that!@@<<orhas superSlut || hyperSlut || liberate>>which you can deal with. @@.mono;That is prety exciting!@@<<orhas shame>><<aroused -2>><<stress 25>>which makes you panic. @@.mono;AAA! I am totally naked in view of total stranger!!!@@<<or>><<stress 15>>which makes you feel terrible. @@.mono;Oh, I am totally naked and I can't even cover properly...@@<</has>>

  <<dialogchoice>>
      <<dbutt "Present" "ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "stranger" "buckNakedPresent">><</intreplace>>
      <<dtext "smug">>Rotate before the stranger exposing yourself further.
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "stranger" "buckNakedCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "stranger" "buckNakedCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Run away in embarassment
  <</dialogchoice>>`,
];
aw.tagContent.stranger.buckNakedPresent = [
  `<<SCX>><<SC "SD" "20">>You expose your buck naked body to a stranger.<br>
  @@.pc;Like what you see?@@<br>
  <<if $SCresult[1]>><<set aw.npc[setup.interact.status.npc].rship.likePC += 10 >>
  @@.npc;Oh... yeah. You look gorgeous!@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>You failed the check and NPC is pissed off.
  @@.npc;Please, can you cover or something? That is plain obscene to be naked like that.@@
  <<dialogchoice>>
      <<dbutt "Run" "ↂ.pc.kink.exhibition">><<run setup.interact.exit()>>
      <<dtext "disturbed">>Run away in embarassment
      <<dbutt "Talk">><<intreplace>><<ctagcontent "stranger" "buckNakedPresentChat">><</intreplace>>
      <<dtext "awkward">>Ehh.. sure, sorry...
  <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.stranger.buckNakedPresentChat = [
  `@@.pc;Ehh.. sure, sorry...@@
  You try to go on with the convo as if nothing happened.
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.buckNakedCover = [
  `You try to cover your body with hands which is not super effective. NPC tries his best to ignore your clothing choice.
  @@.npc;W-well, what were we talking about?@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.buckNakedCool = [
  `You prefer to act normally and go on with your convo. NPC is nervous.
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@
  @@.npc;S-sorry... So what were we talking about?@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <<else>>
  @@.pc;Sorry for that.@@
  @@.npc;Yeah... So what were we talking about?@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <</if>>`,
];
aw.tagContent.stranger.wetClothes = [
  `<<if ↂ.pc.clothes.keys.bra === 0>>
  You notice the stranger looks at your chest and realise that your <<p nipl.q>> nipples are visible through the wet clothes.
  <<has exhibition>><<arouse 1>>@@.mono;Oh yeah, I like that.@@<<orhas slut>>@@.mono;That is certainly drawing some attention.@@<<orhas shame>><<stress 7>>@@.mono;Oh shit, my nipples are showing!@@<<or>><<stress 2>>@@.mono;Oops, better cover that!@@<</has>>
  <<dialogchoice>>
      <<dbutt "Cover" "!ↂ.pc.kink.exhibition">><<intreplace>><<ctagcontent "stranger" "wetClothesCover">><</intreplace>>
      <<dtext "disturbed">>Try to cover yourself with hands.
      <<dbutt "Act cool" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "stranger" "wetClothesCool">><</intreplace>>
      <<dtext "cool">>Just continue with the chat.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Run away in embarassment
  <</dialogchoice>>
  <<else>>
  @@.npc;You are wet, you better change before you catch cold, miss.@@
  @@.pc;Yeah... such a shame. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <</if>>`,
];
aw.tagContent.stranger.wetClothesCover = [
  `You cover your <<breastShape>> breast with your hand.
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.wetClothesCool = [
  `<<if ↂ.pc.trait.bitch === 1>>@@.pc;My eyes are up here by the way.@@
  @@.npc;S-sorry... So what were we talking about?@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <<else>>
  @@.pc;Sorry for that.@@
  @@.npc;Yeah... So what were we talking about?@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <</if>>`,
];
aw.tagContent.stranger.lightPheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 10 >>
  <<if !ↂ.pc.trait.perceptive === -1>>
    You notice that stranger looks a bit hostile at you.
  <</if>>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
<<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 10 >>
  <<if !ↂ.pc.trait.perceptive === -1>>
    You notice that stranger looks at you with some interest.
    <<has slut>>@@.mono;I can count he thinks about shagging me hard right now, ehe-he.@@<<orhas shame>><<stress 5>>@@.mono;Oh, why all the guys are looking at me with that look? It makes me feel uneasy.@@<<or>>@@.mono;It seems I still got it!@@<</has>>
  <</if>>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
<</if>>`,
];
aw.tagContent.stranger.pheromones = [ // that became way too big i am afraid
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 20 >>You notice that stranger looks with some sudden hostility at you.<br>
    @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 20 >>You notice that stranger looks at you with some obvious arousal. He bites his lips while ogling your body.<br>
    <<has slut>>@@.mono;That guy looks like he is on a brink of pinning me down and fucking me really hard, I like that!@@<<orhas shame>><<stress 10>>@@.mono;Oh, why all the guys are looking at me like that? I am frightened.@@<<or>>@@.mono;It seems he really likes me.. in a sexual way.@@<</has>>
    <<dialogchoice>>
      <<dbutt "Ask for it" "ↂ.pc.kink.superSlut || ↂ.pc.kink.hyperSlut || ↂ.pc.kink.rape || ↂ.pc.kink.publix">><<intreplace>><<ctagcontent "stranger" "pheromonesInvite">><</intreplace>>
      <<dtext "smug">>Wanna taste some, big boy?
      <<dbutt "Ignore">><<intreplace>><<ctagcontent "stranger" "pheromonesIgnore">><</intreplace>>
      <<dtext "confused">>Just continue with the chat.
      <<dbutt "Goodbye">><<run setup.interact.exit()>>
      <<dtext "awkward">>Better say goodbye before something bad happens...
    <</dialogchoice>>
  <</if>>`,
];
aw.tagContent.stranger.pheromonesInvite = [
  `@@.pc;Wanna taste some, big boy?@@<br>
  Something has certainly clicked in his head and his good reason is gone. He unzips his pants almost drooling with arousal.<br>
  @@.npc;Oh yes, come to me, you little whore.@@<br>
  (Need to add function call to start voluntary sex scene here)`,
];
aw.tagContent.stranger.pheromonesIgnore = [
  `<<set _r = random(0,10)>><<if _r > 8 >><<stress 10>>
  @@.pc;So, well, I just wanted to...@@<br>
  It seems that stranger is barely listening to you. Something has certainly clicked in his head and his good reason is gone. He slowly approach you with somewhat crazy look in his eyes.<br>
  @@.npc;You are such a pretty girl... I bet we can spend some quality time together, don't we?@@<br>
  @@.pc;Hey, mister, what the heck are you doing?@@<br>
  @@.npc;You want to see my dick, pretty? I have something to present to you, little bitch!@@<br>
  Stranger starts to unzip his pants...
  <<dialogchoice>>
    <<dbutt "Okay" "ↂ.pc.kink.superSlut || ↂ.pc.kink.hyperSlut || ↂ.pc.kink.rape || ↂ.pc.kink.publix">>
    <<dtext "smug">>Why not, lets shag him! (Need to add function call to start voluntary sex scene here)
    <<dbutt "Freeze" "!$pref.rape">>
    <<dtext "scared">>Paralyzed with fear you just stand.(Need to add function call to start involuntary sex scene here)
    <<dbutt "Run">><<intreplace>><<ctagcontent "stranger" "pheromonesIgnoreRun">><</intreplace>>
    <<dtext "dismay">>Run away before you got any rapeys
    <<dbutt "Fight him">><<intreplace>><<ctagcontent "stranger" "pheromonesIgnoreFight">><</intreplace>>
    <<dtext "mad">>Hammertime!
  <</dialogchoice>>
  <<else>>
  @@.pc;So, you look a bit... disturbed, are you okay?@@<br>
  After some struggle the guy seems to gain his reason back. He shakes his head like if being drunk and tries to avoid eye contact with you.<br>
  @@.npc;Y-yeah... just... whew. That was weird. All right, what were we talking about?@@<br>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <</if>>`,
];
aw.tagContent.stranger.pheromonesIgnoreRun = [
  `<<if $pref.rape>>
  <<set _r2 = random(0,10)>>
  <<if _r2 > 5 >>
    You successfully <<link "run away">><<run setup.interact.exit()>><</link>>
  <<else>>
    You try to run away but guy <<link "catches you">><<run setup.interact.exit()>><</link>>. (Need to add function call to start involuntary sex scene here)
  <</if>>
<<else>>
  It seems, some content filtering preferences gave you unnatural speed. You successfully <<link "run away">><<run setup.interact.exit()>><</link>>.
<</if>>`,
];
aw.tagContent.stranger.pheromonesIgnoreFight = [  // need to check for martial arts too here i guess hehe
  `You get ready to fight the guy.
  <<set _r3 = random(0,10)>>
  <<if ↂ.pc.body.tone > 3>><<set _r3 += 1>><</if>>
  <<SCX>><<SC "AT" "20">><<if $SCresult[1]>><<set _r3 += 1>><</if>>
  <<if _r2 > 8 >><<stress 20>>
  You manage to fight the dude without getting a scratch and knock him <<link "unconcious">><<run setup.interact.exit()>><</link>>.
  <<elseif _r2 > 5 >><<health -10>><<stress 25>>
  He punches you but you manage to fight the dude and knock him <<link "unconcious">><<run setup.interact.exit()>><</link>>.
  <<else>><<if $pref.rape>><<health -15>><<stress 30>>
      Guess what? Yep, rapeys! But you also got kicked in a face couple of times before you gave up. (Need to add function call to start involuntary sex scene here)<,p>
    <<else>>
      You loose the fight but some citizens heard the brawl and called the police. Brave cops busted the guy before he did any harm to you. <<link "That was a close call, yep">><<run setup.interact.exit()>><</link>>.
    <</if>>
  <</if>>`,
];
aw.tagContent.stranger.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC += 15 >>
  You notice that stranger looks at you in some weird fashion.
  @@.pc;Is everything is okay?@@
  @@.npc;Yeah, just you know... I just wanted to say you seems like a really nice person, hard to explain actually...@@
  <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> looks a bit confused with sudden confession but still feels comfortable around you glancing with some awe.
  @@.pc;Hmm, well, thanks I guess? So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.hairyPits = [
  `While talking your realise that your hairy armpit bushes are showing through the thin fabric. The stranger seems to be <<set _r = random(0,5)>><<if _r > 2 >><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>pretty disgusted by <<else>>okay with <</if>>that.
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.clownMakeup = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>
  You notice that stranger looks at your face in some weird fashion.
  <<set _r = random(0,2)>><<if _r === 1 >>Suddenly, <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> starts giggling.
  <<dialogchoice>>
    <<dbutt "Confront" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "stranger" "clownMakeupConfront">><</intreplace>>
    <<dtext "mad">>See something funny, bastard?
    <<dbutt "Ask">><<intreplace>><<ctagcontent "stranger" "clownMakeupAsk">><</intreplace>>
    <<dtext "confused">>Sorry, what are you laughing at?
    <<dbutt "Act cool">><<intreplace>><<ctagcontent "stranger" "clownMakeupCool">><</intreplace>>
    <<dtext "cool">>Go on with the convo ignoring the chuckles
    <<dbutt "Sarcasm">><<intreplace>><<ctagcontent "stranger" "clownMakeupSarcasm">><</intreplace>>
    <<dtext "cool">>Sarcasm.
  <</dialogchoice>>
  <<else>>
  @@.npc;Well, your makeup, miss... it is kinda messy, you know?@@
  @@.pc;Yeah, I am aware of that, thanks.@@
  @@.mono;Oh shit, I better clean makeup asap. That is just embarassing.@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <</if>>`,
];
aw.tagContent.stranger.clownMakeupConfront = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  @@.pc;See something funny, bastard? You better stop giggling until I make you regret that.@@
  @@.npc;Ugm... sorry, I didn't mean to. Just your makeup is, the-he. I am sorry.@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.clownMakeupAsk = [
  `@@.pc;Sorry, what are you laughing at?@@
  @@.npc;I am sorry, it is just your... well, it is your makeup, it seems it got kinda messy.@@
  @@.pc;Well, yeah, that was a tough morning for sure.@@
  @@.mono;Oh shit, I better clean makeup asap. That is just embarassing.@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.clownMakeupCool = [
  `You go on with the convo as if nothing happened.
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.clownMakeupSarcasm = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>
  @@.pc;Like my makeup? Still better than your by the way.@@
  @@.npc;Wait, what?@@
  @@.pc;Whatever. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.withdrawal = [
  `@@.mono;Oh I don't feel that good.@@
  @@.npc;Hey, miss, are you ok?@@
  @@.pc;Ah? Yes-yes, it is okay, I just drifted in thoughts for a moment.@@
  @@.mono;Ugh, I really need to deal with that withdrawal soon.@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.latePreg = [
  `@@.npc;Oh, by the way, congratulations with that! Will it be boy or a girl?@@
  <<dialogchoice>>
    <<dbutt "Boy" >><<intreplace>><<ctagcontent "stranger" "latePregBoy">><</intreplace>>
    <<dtext "cute">>It is a boy.
    <<dbutt "Girl">><<intreplace>><<ctagcontent "stranger" "latePregGirl">><</intreplace>>
    <<dtext "cute">>It is a girl.
    <<dbutt "No idea">><<intreplace>><<ctagcontent "stranger" "latePregDunno">><</intreplace>>
    <<dtext "cute">>I don't know yet.
    <<dbutt "Bitch" "ↂ.pc.trait.bitch === 1">><<intreplace>><<ctagcontent "stranger" "latePregBitch">><</intreplace>>
    <<dtext "mad">>Are you stupid or what?
  <</dialogchoice>>`,
];
aw.tagContent.stranger.latePregBoy = [
  `<<if ↂ.pc.trait.maternal == 1>>@@.pc;I am pretty sure that will be a cute little boy! I can't wait until I could hold him! I am sooo happy!@@
  <<else>>@@.pc;I guess it will be a boy.@@
  <</if>><<link "So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.latePregGirl = [
  `<<if ↂ.pc.trait.maternal == 1>>
  @@.pc;I am pretty sure that will be a cute little girl! I can't wait until I could hold her! Isn't it a miracle?@@<<else>>
  @@.pc;I guess it will be a girl.@@<</if>>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.latePregDunno = [
  `<<if ↂ.pc.trait.maternal == 1>>@@.pc;I don't know yet, but I can't wait until I could hold my baby!@@
  <<else>>@@.pc;I don't know yet.@@
  <</if>>@@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.latePregBitch = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 15 >>
  <<if ↂ.pc.trait.maternal == 1>>@@.pc;My baby is my bloody business. Not yours. Why do you think you can ask me questions like that all of a sudden?@@
  <<else>>@@.pc;I don't fucking care.@@
  <</if>>@@.npc;Hey, don't be that rude! I just tried to be nice...@@
  @@.pc;Yeah. You tried. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];
aw.tagContent.stranger.drunk = [
  `@@.pc;Why, helloooy there, handsme!@@
  @@.npc;Are you drunk miss?@@
  <<dialogchoice>>
    <<dbutt "Nah" >><<intreplace>><<ctagcontent "stranger" "drunkYeah">><</intreplace>>
    <<dtext "laugh">>What? No, I m sobr as a jdge!
    <<dbutt "Yeeah">><<intreplace>><<ctagcontent "stranger" "drunkYeah">><</intreplace>>
    <<dtext "proud">>Bloody hell I am!
    <<dbutt "Horny">><<intreplace>><<ctagcontent "stranger" "drunkFuck">><</intreplace>>
    <<dtext "love">>Wanna fuck me? I want to fuck rght now!
    <<dbutt "Pass out">><<run setup.interact.exit()>><<run setup.sleep.start();>>
    <<dtext "sleep">>I am sooo slepy, beter lay dwn just fur a tiny sec...
  <</dialogchoice>>`,
];
aw.tagContent.stranger.drunkYeah = [
  `<<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >>
  @@.npc;Oh, sorry I really have to go actually. You better go to sleep I guess.@@
  @@.pc;But I wanna prty!@@
  @@.npc;Well, yeah, good for you. Goodbye, miss.@@
  <<link "Wait, tlk to me!">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.stranger.drunkFuck = [
  `<<if aw.npc[setup.interact.status.npc].main.female === true>>
    @@.pc;Wanna fuck? I ll lck you so hrd you will forget bout anything!@@
    @@.npc;Eww. Miss, your really have to stop this.@@
    <<link "You dnt like me?">><<intreplace>><<ctagcontent "stranger" "drunkYeah">><</intreplace>><</link>>
  <<else>>
    <<SCX>>
    <<SC "SD" 20>>
    <<if $SCresult[1]>>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@
      @@.npc;Hmm... you pretty much won't remember this tomorrow anyway, yes?@@
      <<link "Uhm? We are gonna fck?">><<run setup.interact.exit()>><</link>>
    <<else>>
      @@.pc;Wanna fuck me? I want to fuck rght now!@@
      @@.npc;Miss, please stop.@@
      <<link "You dnt like me?">><<intreplace>><<ctagcontent "stranger" "drunkYeah">><</intreplace>><</link>>
    <</if>>
  <</if>>`,
];
aw.tagContent.stranger.mindbreak = [
  `You start to cry all of a sudden.
  @@.npc;Miss, are you okay?@@
  @@.pc;I... I just... I feel like everything goes to hell. Whole my life is ...sob... shattered...@@
  @@.npc;Ugh, there, there. It will be okay, I am sure.@@
  @@.pc;You just don't understand, all that happened ...sob... to me, it is just too much to handle...@@
  <<if ↂ.pc.trait.will > 4 >>
  You somehow manage to gain your reason back
  <<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >>
  @@.pc;I am so sorry. It was really tough times lately.@@
  @@.npc;Oh, it is okay.@@
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  <<else>>
  <<addtime 13>>
  <<set ↂ.pc.groom.makeup.clown = true>>
  <<stress -10>>
  You start histerically giggling.
  @@.npc;Oh, I better go, please, forgive me, I just don't know how to help you miss. It will be okay, really...@@
  You cry ang laugh alone sitting on the floor for some time before you finally start to feel better.
  <<link "Get up">><<run setup.interact.exit()>><</link>>
  <</if>>`,
];
aw.tagContent.stranger.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>
    You feel your juices running down your inner thights with no panties in a way to stop them
    <<has exhibition>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will notice that. That is so embarassingly exciting!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will not notice that.@@<</has>>
  <<else>>
    You feel your juices making a slippery mess slowly soaking through your panties.<<has slut>>@@.mono;Speaking with a person while being flooded like that is so naughty!@@<<or>>@@.mono;Oh, I hope <<if aw.npc[setup.interact.status.npc].main.female>>she<<else>>he<</if>> will not notice that.@@<</has>>
  <</if>>
  @@.pc;So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>`,
];

aw.tagContent.stranger.pussyAccess = [
  `Apologies. No content has been written for this tag [pussyAccess].`,
];

// OTHER TAGS (was not aware that stranger ignores other than first priority at first)

aw.tagContent.stranger.stressed = [
  `@@.npc;Miss, is everything okay?@@
  @@.pc;Mm? Why you ask?@@
  @@.npc;It is just... you seem a bit stressed out or something. Something happened?@@
  <<dialogchoice>>
    <<dbutt "I am okay">><<intreplace>><<ctagcontent "stranger" "stressedNope">><</intreplace>>
    <<dtext "smile">>I am okay, everything is fine, no worries!
    <<dbutt "A bit">><<intreplace>><<ctagcontent "stranger" "stressedAbit">><</intreplace>>
    <<dtext "scared">>Yeah, I am under a pressure lately.
  <</dialogchoice>>
  `,
];

aw.tagContent.stranger.stressedNope = [
  `@@.pc;I am okay, everything is fine, no worries!@@
  @@.npc;Oh, sorry then, I just thought you was... whatever.@@
  @@.pc;No problems. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  `,
];

aw.tagContent.stranger.stressedAbit = [
  `<<has extro>>@@.pc;Yeah, it was horrible to be honest. Work and everything in general you know. Don't know if I can deal with all this much longer...<<stress -1>>@@<<else>>@@.pc;Yeah, it was not very nice last days.@@<</if>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >>
  @@.npc;Oh, sorry to hear that. Well, I usually do yoga and meditation to cope with stress. Maybe you should try too?@@
  @@.pc;Well, that may be a solution. So...@@<br>
  <<include [[NPCinteraction-StrangerContinue]]>>
  `,
];

