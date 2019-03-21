
//  ███████╗███╗   ██╗███████╗███╗   ███╗██╗   ██╗
//  ██╔════╝████╗  ██║██╔════╝████╗ ████║╚██╗ ██╔╝
//  █████╗  ██╔██╗ ██║█████╗  ██╔████╔██║ ╚████╔╝
//  ██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║  ╚██╔╝
//  ███████╗██║ ╚████║███████╗██║ ╚═╝ ██║   ██║
//  ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝   ╚═╝
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

aw.tagContent.enemy = {} as IntTagContent;

// RANDOMS

aw.tagContent.enemy.random = [
  `@@.npc;I was hoping will never meet again actually. Damn.@@<br>
@@.pc;If you think that it is a pleasure for me then you are wrong.@@
<<include [[NPCinteraction-EnemyTag]]>>
`,
];

// PRIORITY ONE TAGS

aw.tagContent.enemy.seriousIllness = [
  `@@.npc;You look terrible, I hope I can already start selecting best costume for the funeral?@@<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;Cough...That will never happen, motherfucker.@@<br><<else>>@@.pc;You will need to wait for a really long time then.@@<br><</if>>
  @@.npc;Ha.@@<br>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];
aw.tagContent.enemy.illness = [
  `@@.npc;Are you okay? It seems not and I like that.@@<br>
  <<if ↂ.pc.trait.bitch === 1>>@@.pc;Cough...That will never happen, motherfucker.@@<br><<else>>@@.pc;You will need to wait for a really long time then.@@<br><</if>>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];
aw.tagContent.enemy.nakedBottom = [
  `@@.npc;Oh, I see some adult girl who forget to wear her pants today?@@<br>
  <<has shame>><<stress 20>><<arouse -1>>@@.mono;This is a worst thing that could ever happened! <<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> will tell everyone now!@@<br><<orhas sub>><<stress 3>><<arouse 1>>@@.mono;That is soo humiliating... why it makes me aroused?@@<br><<or>><<stress 15>>@@.mono;Oh, shit.@@<br><</has>>
  <<dialogchoice>>
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "pain">>Run away in embarassment.
      <<dbutt "Mumble">><<intreplace>><<ctagcontent "enemy" "NakedBottomMumble">><</intreplace>>
      <<dtext "muted">>Well... I...was just...not...
      <<dbutt "Talk back" "ↂ.pc.trait.will > 2">><<intreplace>><<ctagcontent "enemy" "NakedBottomChat">><</intreplace>>
      <<dtext "neutral">>That is none of your business.
  <</dialogchoice>>`,
];
aw.tagContent.enemy.NakedBottomChat = [
  `@@.pc;That is none of your business.@@<br>
  You try to go on with the convo as if nothing happened.<br><br>
  <<include [[NPCinteraction-EnemyTag]]>>
  `,
];
aw.tagContent.enemy.NakedBottomMumble = [
  `<<stress 15>>@@.pc;Well... I...was just...not...@@<br>
  @@.npc;Just look at her, aha-ha. You are either a pervert either an stupid cunt and you even can't say anything. Come on, you want to say something? I am listening.@@<br>
  @@.pc;Me... I was just...@@<br>
  <<link "Run away">><<run setup.interact.exit()>><</link>>
  `,
];
aw.tagContent.enemy.practNakedBottom = [
  `@@.npc;You are aware that you are dressed like a slut? Only a streetwalker would wear that, dumb bitch.@@<br>
  <<dialogchoice>>
      <<dbutt "Proud" "ↂ.pc.kink.slut">><<intreplace>><<ctagcontent "enemy" "practNakedBottomProud">><</intreplace>>
      <<dtext "arrogant">>I see nothing bad in this. Are you envy or what?
      <<dbutt "Insult" "ↂ.pc.trait.bitch">><<intreplace>><<ctagcontent "enemy" "practNakedBottomBitch">><</intreplace>>
      <<dtext "cool">>Well, it looks like somebody is just too ugly to wear something like that?
      <<dbutt "Ignore">><<intreplace>><<ctagcontent "enemy" "practNakedBottomNeutral">><</intreplace>>
      <<dtext "neutral">>I don't care about your opinion.
  <</dialogchoice>>`,
];
aw.tagContent.enemy.practNakedBottomProud = [
  `@@.pc;I see nothing bad in this. Are you envy or what?@@<br>
  <<SCX>><<SC "CM" "20">><<if $SCresult[1]>>@@.npc;Me? No! Not at all! I am not...@@<br>
  @@.pc;I just wanted to say that it is okay to dress the way you like and it is not terribly nice to judge people around you, mhm?@@<br>
  @@.npc;Err... well, maybe... whatever.@@<br><<set aw.npc[setup.interact.status.npc].rship.lovePC += 7 >><<else>>@@.npc;Ha, no, I d never dressed like this, whore.@@<br><</if>>
  <<include [[NPCinteraction-EnemyTag]]>>
  `,
];
aw.tagContent.enemy.practNakedBottomBitch = [
  `@@.pc;Well, it looks like somebody is just too ugly to wear something like that?@@<br><<set aw.npc[setup.interact.status.npc].rship.likePC -= 10 >>
  @@.npc;Oh, go fuck yourself, <<print ↂ.pc.main.name>>!@@<br>
  <<include [[NPCinteraction-EnemyTag]]>>
  `,
];
aw.tagContent.enemy.practNakedBottomNeutral = [
  `You prefer to ignore <<print aw.npc[setup.interact.status.npc].main.name>>'s insults and go on with your convo.<br><br>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];
aw.tagContent.enemy.buckNaked = [
  `<<print aw.npc[setup.interact.status.npc].main.name>> stares at your nude body <<has exhibition>><<aroused 2>>which makes you more aroused.<br>
  @@.mono;Oh yeah, I can't believe I am doing that!@@<br><<orhas slut || liberate>>which you can deal with.<br>
  @@.mono;That is prety exciting!@@<br><<orhas shame>><<aroused -2>><<stress 25>>which makes you panic.<br>
  @@.mono;AAA! I am totally naked in view of <<print aw.npc[setup.interact.status.npc].main.name>>!!!@@<br><<or>><<stress 15>>which makes you feel terrible.<br>
  @@.mono;Oops, I am totally naked.@@<br><</has>>
  @@.npc;Aha-ha-ha! That is most hilarious thing that could happen!@@<br>

  <<dialogchoice>>
      <<dbutt "Insult" "ↂ.pc.trait.bitch">><<intreplace>><<ctagcontent "enemy" "buckNakedBottomBitch">><</intreplace>>
      <<dtext "cool">>Well, I am beautiful and you are not, that is the reason I can do that.
      <<dbutt "Ignore" "!ↂ.pc.kink.shame">><<intreplace>><<ctagcontent "enemy" "buckNakedBottomNeutral">><</intreplace>>
      <<dtext "neutral">>I don't care about your opinion.
      <<dbutt "Run">><<run setup.interact.exit()>>
      <<dtext "dismay">>Run away in embarrassment
  <</dialogchoice>>`,
];
aw.tagContent.enemy.buckNakedBottomBitch = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 10 >>@@.pc;Oh, screw you.@@<br>
  @@.npc;Go fuck yourself, cunt!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.enemy.buckNakedBottomNeutral = [
  `@@.pc;I don't fucking care what you think actually, you know?@@<br>
  You try to go on with the convo as if nothing happened.<br>
  <<include [[NPCinteraction-EnemyTag]]>>
  `,
];
aw.tagContent.enemy.wetClothes = [
  `@@.npc;Hah, what happened, did you threw your sippy cup on you? Or somebody mistook you with an urinal ahaha?@@<br><<stress 10>>
  <<link "Oh, screw you">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.enemy.lightPheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 3 >>
  <<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 3 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 3 >><</if>><<include [[NPCinteraction-EnemyTag]]>>`,
];
aw.tagContent.enemy.pheromones = [
  `<<if aw.npc[setup.interact.status.npc].main.female>><<set aw.npc[setup.interact.status.npc].rship.likePC -= 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >>@@.npc;You know that you even smell weird? Ew, disgusting.@@<br><<else>><<set aw.npc[setup.interact.status.npc].rship.likePC += 5 >><<set aw.npc[setup.interact.status.npc].rship.lovePC += 5 >>You notice some kind of mixed emotions in the eyes of <<print aw.npc[setup.interact.status.npc].main.name>>.<</if>>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];
aw.tagContent.enemy.goddess = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC += 3>><<if aw.npc[setup.interact.status.npc].main.female>>She<<else>>He<</if>> seems to have some troubles with keeping hostile attitude towards you but quickly gain <<if aw.npc[setup.interact.status.npc].main.female>>her<<else>>his<</if>> wits back.<br>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];
aw.tagContent.enemy.hairyPits = [
  `<<set aw.npc[setup.interact.status.npc].rship.lovePC -= 5 >><<print aw.npc[setup.interact.status.npc].main.name>> noticed your armpit bushes.<br><<stress 10>>
  <<if aw.npc[setup.interact.status.npc].rship.lovePC < 50>>@@.npc;Did you heard about shaving, bitch?<br>@@<<else>>@@.npc;I need to buy you a razor it seems, you are disgusting.@@<br><</if>>
  @@.pc;This is none of your business. So...@@<br>
  <<include [[NPCinteraction-EnemyTag]]>>
`,
];
aw.tagContent.enemy.clownMakeup = [
  `<<stress 15>><<print aw.npc[setup.interact.status.npc].main.name>> starts laughing.<br>
  @@.npc;Ha-ha-ha! My best day ever! You are just soo pathetic!@@<br>
  @@.pc;W-what?@@<br>
  @@.npc;Where did you got that makeup? Did you whored out with the local circus clowns?@@<br>
  @@.pc;Oh screw you, you <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.enemy.withdrawal = [
  `@@.mono;Oh I actually feel pretty shitty.@@<br>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];
aw.tagContent.enemy.latePreg = [
  `@@.npc;Ready to pop some bastards, bitch?@@<br>
  @@.pc;Oh screw you, you <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.enemy.drunk = [
  `@@.pc;Aah, yu here! I ll punch the sht out f you, dickhead!@@<br>
  @@.npc;Shit, this crazy bitch again! Go away, drunken cunt!@@<br>
  <<link "Dn't ever shw up here anymre!!">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.enemy.mindbreak = [
  `You start crying all of a sudden.<br>
  <<if aw.npc[setup.interact.status.npc].rship.lovePC < 50>>@@.npc;Oh, look, little sissy is crying?@@<br><<else>>@@.npc;Hey, what... what is wrong with you?@@<br><</if>>
  @@.pc;I... I just... leave me alone...@@<br>
  @@.npc;It seems like I want to look at this anyway? Get your shit together already. Crazy bitch...@@<br>
  You cry ang laugh alone sitting on the floor for some time before you finally start to feel better.<br>
  <<link "Get up">><<run setup.interact.exit()>><</link>>`,
];
aw.tagContent.enemy.flooded = [
  `<<if ↂ.pc.clothes.keys.panties == 0 || ↂ.pc.clothes.worn.panties === "pulledAside" || ↂ.pc.clothes.worn.panties === "pulledOff" || ↂ.pc.clothes.worn.panties === "off">>You feel your juices running down your inner thights with no panties in a way to stop them.<br><<else>>You feel your juices making a slippery mess slowly soaking through your panties.<br><</if>>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];

aw.tagContent.enemy.pussyAccess = [
  `Apologies. No content has been written for this tag [pussyAccess].<br>
  <<include [[NPCinteraction-EnemyTag]]>>`,
];

// OTHER TAGS

aw.tagContent.enemy.stressed = [
  `@@.npc;You seem nervous. What is this? Can't cope with life? Not surprising at all.@@<br>
  @@.pc;Oh screw you, you <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];

aw.tagContent.enemy.depressed = [
  `@@.npc;Why the long face? Did somebody upset our crybaby?@@<br>
  @@.pc;Oh screw you, you <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];

aw.tagContent.enemy.tipsy = [
  `@@.npc;Trying to submerge you puny life in booze?@@<br>
  @@.pc;Still better solution than seeing you so often.@@<br>
  @@.npc;Touche.@@<br>
  <<include [[NPCinteraction-EnemyTag]]>>
  `,
];

aw.tagContent.enemy.athleticClothes = [
  `@@.npc;If you wonder if this clothes make you look more fit the answer is no.@@<br>
  <<link "Well, fuck you too.">><<run setup.interact.exit()>><</link>><<happy -1>>
  `,
];

aw.tagContent.enemy.kinkyClothes = [
  `@@.npc;How does your streetwalker job going?@@<br><<stress 8>>
  @@.pc;What? You think I am a slut?@@<br>
  @@.npc;Who else would dress like a cheap whore?@@<br>
  <<link "Go fuck yourself!">><<run setup.interact.exit()>><</link>>
  `,
];

aw.tagContent.enemy.nightwear = [
  `@@.npc;You are just pathetic, you know? Now you are strolling in the nightgown along the streets?@@<br>
  @@.pc;Oh go fuck yourself, you <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];

aw.tagContent.enemy.cuteClothes = [
  `@@.npc;Trying to hide your rotting self under cute clothes?@@<br>
  <<link "Don't be so pathetically jealous. So...">><</link>>
  `,
];

aw.tagContent.enemy.superCuteClothes = [
  `@@.npc;Trying to hide your rotting self under cute clothes?@@<br>
  <<link "Don't be so pathetically jealous. So...">><</link>>
  `,
];

aw.tagContent.enemy.slovenlyClothes = [
  `@@.npc;Hi there, hobo!@@<br>
  @@.pc;Don't you dare ever talk to me, <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];

aw.tagContent.enemy.swimwear = [
  `@@.npc;You know what never sink, haha?@@<br>
  @@.pc;Don't you dare ever talk to me, <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];

aw.tagContent.enemy.damagedClothes = [
  `@@.npc;Hah, where did you get those? From Salvation Army?@@<br>
  @@.pc;Kiss my ass, <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];

aw.tagContent.enemy.stainedClothes = [
  `@@.npc;Hah, look at this! Is this cum? You are just pathetic.@@<br>
  @@.pc;Fuck you, <<print setup.insultGenerator()>>!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>`,
];

aw.tagContent.enemy.angry = [
  `<<has bitch>>@@.pc;YOU. You again! Well, nice to see you here because it is pretty much time for some massacre! Come here, shithead!@@<br><<or>>@@.pc;Oh, goddamit, you are the last person I want to see now. Get lost.@@<br><</has>>
  @@.npc;Hey, hey, calm down, crazy bitch! I am going away. Sheesh!@@<br>
  <<link "Go away">><<run setup.interact.exit()>><</link>>
  `,
];
