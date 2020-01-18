/*
 ######  ########  #######  ########  ##    ## ######## ##     ## ########  ########    ###    ########   ######
##    ##    ##    ##     ## ##     ##  ##  ##     ##    ##     ## ##     ## ##         ## ##   ##     ## ##    ##
##          ##    ##     ## ##     ##   ####      ##    ##     ## ##     ## ##        ##   ##  ##     ## ##
 ######     ##    ##     ## ########     ##       ##    ######### ########  ######   ##     ## ##     ##  ######
      ##    ##    ##     ## ##   ##      ##       ##    ##     ## ##   ##   ##       ######### ##     ##       ##
##    ##    ##    ##     ## ##    ##     ##       ##    ##     ## ##    ##  ##       ##     ## ##     ## ##    ##
 ######     ##     #######  ##     ##    ##       ##    ##     ## ##     ## ######## ##     ## ########   ######


 */

// INTERFACE

interface Storythread {
  assign: (npcId: string) => boolean;
  conditionCheck: (npcId: string, condition: "dadDead" | "momDead" | "sisterYounger" | "brotherYounger" | "sister" | "brother" | "parentDivorced" | "stepParent" | "married" | "exSpouse" | "highSchool" | "college" | "associate" | "bachelor" | "master" | "doctor") => boolean;
  getStory: (npcId: string) => string;
  uniqueStories: {};
}

interface Threads {
  [name: string]: {};
}

// NAMESPACE

if (setup.storythread == null) {
  setup.storythread = {} as Storythread;
}

if (aw.storythreads == null) {
  aw.storythreads = {} as Threads;
}

// FUNCTIONS

setup.storythread.assign = function(npcId: string): boolean {
  if (aw.npc[npcId] == null) {
    aw.con.warn(`setup.storythread.assign was supplied with ${npcId} which was not found in aw.npc!`);
    return false;
  }
  aw.npc[npcId].background.stories = [];
  for (const thread of Object.keys(aw.storythreads)) {
    const tempfuta = clone(aw.storythreads[thread]);
    let winner = "";
    let chance = 0;
    let chance2 = 0;
    for (const story of Object.keys(tempfuta)) { // Removing all stories that don't fit the NPC's bg
      if (!setup.storythread.conditionCheck(npcId, tempfuta[story][3])) {
        delete (tempfuta[story]);
      }
    }
    for (const story of Object.keys(tempfuta)) { // Just summing all up to roll the dices
      chance += (tempfuta[story][1]);
    }
    if (chance === 0) {
      // It seems no stories are fitting which is rather unusual.
      winner = "none";
    } else {
      const dices = random(1, chance);
      aw.con.info(`Random number was ${dices}`);
      for (const story of Object.keys(tempfuta)) { // Now looking on which story chance range fall the dice number
        chance2 += (tempfuta[story][1]);
        aw.con.info(`Testing story ${story}`);
        if (chance2 >= dices) {
          winner = (tempfuta[story][0]);
          aw.con.info(`Got a winner! ${winner}`);
          break;
        }
      }
    }
    aw.npc[npcId].background.stories.push(winner);
  }
  if (typeof setup.storythread.uniqueStories[npcId] === "object") { // npc has unique stories, assigning
    const tt = ["childhood", "teenage", "familyGen", "familyPar", "familySib", "familySib", "college", "job", "moving", "marriage"];
    for (const thread of Object.keys(setup.storythread.uniqueStories[npcId])) {
      if (tt.indexOf(thread) !== -1) {
        aw.npc[npcId].background.stories[(tt.indexOf(thread) - 1)] = setup.storythread.uniqueStories[npcId][thread][0];
      }
    }
  }
  return true;
};

setup.storythread.conditionCheck = function(npcId: string, condition: string): boolean {
  // hmm, rather straightforward now, maybe need more condition and not only true\false?
  if (aw.npc[npcId] == null) {
    aw.con.warn(`setup.storythread.conditionCheck was supplied with ${npcId} which was not found in aw.npc!`);
    return false;
  }
  if (condition !== "none") {
    if (aw.npc[npcId].background[condition] === undefined) {
      aw.con.warn(`Unknown condition was supplied to setup.storythread.conditionCheck, here it is: ${condition}.`);
    }
    if (aw.npc[npcId].background[condition]) {
      return true;
    } else if (aw.npc[npcId].background[condition] > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

setup.storythread.getStory = function(npcId: string): string {
  let story = "Sorry, it seems there is an error in story thread function! Please tell the devs about it!";
  if (aw.npc[npcId] == null) {
    aw.con.warn(`setup.storythread.getStory was supplied with ${npcId} which was not found in aw.npc!`);
    return story;
  }
  if (aw.npc[npcId].background.stories == null || aw.npc[npcId].background.stories.length < 9) {
    setup.storythread.assign(npcId); // TODO: placeholder fix
    aw.con.warn(`setup.storythread.getStory error: ${npcId} has no proper story threads :( Gonna assign some to fix the issue.`);
  }
  const bullshit = aw.npc[npcId].background.stories;
  const randomStory = random(0, 8);
  let storyType;
  if (true) { // TODO: placeholder check while we have no proper flags for already used treads
    story = "<br><br>";
    switch (randomStory) {
      case 0:
      story += "@@.pc;So, tell me about your childhood, where you was born?@@<br><br>";
      storyType = "childhood";
      break;
      case 1:
      story += "@@.pc;And what about your school years? I guess you were really cool as a teenager.@@<br><br>";
      storyType = "teenage";
      break;
      case 2:
      story += "@@.pc;Tell me about your family, is it big, do they live here?@@<br><br>";
      storyType = "familyGen";
      break;
      case 3:
      story += "@@.pc;Your parents must be nice people, do you spend time together now?@@<br><br>";
      storyType = "familyPar";
      break;
      case 4:
      story += "@@.pc;Do you have any siblings?@@<br><br>";
      storyType = "familySib";
      break;
      case 5:
      story += "@@.pc;Have you been to college?@@<br><br>";
      storyType = "college";
      break;
      case 6:
      story += "@@.pc;So, tell me about your job, Where do you work?@@<br><br>";
      storyType = "job";
      break;
      case 7:
      story += "@@.pc;How did you got in Appletree?@@<br><br>";
      storyType = "moving";
      break;
      case 8:
      story += "@@.pc;Are you married?@@<br><br>";
      storyType = "marriage";
      break;
      default:
      story += "<br>ERROR in story threads!<br>";
      storyType = "childhood";
      break;
    }
    let origin = [];
    aw.con.info(`setup.storythread.getStory results: 1: ${setup.storythread.uniqueStories[npcId]} 2:${setup.storythread.uniqueStories[npcId][storyType]} of ${storyType}`);
    if (setup.storythread.uniqueStories[npcId] !== undefined && setup.storythread.uniqueStories[npcId][storyType] !== undefined) {
      origin = setup.storythread.uniqueStories[npcId][storyType];
      aw.con.info(`setup.storythread.getStory choosen 1`)
      story += `@@.npc;${origin[2]}@@<br><br>`;
    } else {
      if (aw.storythreads[storyType][bullshit[randomStory]] !== undefined) {
        aw.con.info(`setup.storythread.getStory choosen 2`)
        origin = aw.storythreads[storyType][bullshit[randomStory]];
        story += `@@.npc;${origin[2]}@@<br><br>`;
      } else {
        aw.con.info(`setup.storythread.getStory choosen 3`)
        story += `@@.npc;Don't really want to talk about this now, sorry.@@<br><br>`;
      }
    }
  }
  aw.npc[npcId].record.info.stories[randomStory] = true;
  aw.S();
  if (origin[3] === "none" && randomStory !== 6) {
    setup.npcInfo.level(npcId, {bGround: 1});
  } else if (randomStory === 6) {
    setup.npcInfo.level(npcId, {sched: true});
  } else {
    setup.npcInfo.level(npcId, {bGround: 2});
  }
  return story;
};

// DATA

/* format of the story: [name, chance, text, special condition]
Special conditions (only can be assigned to NPC with fitting background):
dadDead, momDead, sisterYounger, brotherYounger, sister, brother, parentDivorced, stepParent, married, exSpouse, highSchool, college, associate, bachelor, master, doctor.
*/

aw.storythreads = {
  childhood: {
    farm: ["farm", 15, "Well, as a child I lived in a small town in Ohio with my parents where we had a farm and stuff. Oh, you won't believe how much I hated it. It was super boring and taking care of farm business from a young age sucked super hard. I don't even remember when, but I decided that I really wanted to leave as soon as I was able to.", "none"],
    farm2: ["farm2", 15, "I had a nice childhood. My brother and I spent a lot of time playing around the farm, building a house on the old oak tree, you know, some good old-school rural fun. I still miss those happy days, heh.", "brother"],
    city: ["city1", 35, "It was a pretty normal childhood I guess. The neighborhood was nice, the kind most Americans would dream of, white fences surrounded every house, all the front lawns were perfectly trimmed, we had barbeques every Sunday... Well, then the depression came and the rest is history.", "none"],
    city2: ["city2", 35, "I have a sister and we were like best friends back then. Our parents were working hard and most of the time we just played together. We lived downtown, it was a pretty good place to live actually. Appletree looks like just a village to me now, I got used to big cities.", "sister"],
    smallcity1: ["smallcity1", 40, "Well, it was a small city in the north. Pretty depressing place. I remember dad started drinking when he lost his job. Actually, it's something I don't like remembering. Anyway, then he joined AA and everything got better, we moved, I went to a new school, we moved to a new house. I liked it much better.", "none"],
    smallcity2: ["smallcity2", 40, "I was born where my parents lived in Oak Valley, in a small southern town. I was always wondering why people called it that, I never even saw any oak trees, heh. Then I suddenly got a younger sister and it was a bit hard, you know, when you are an only child and suddenly all the attention in the family moves from you to some toddler. I remember my parents bringing me to a psychologist one or two times. Anyway, I eventually got used to her but we are not the best of friends, maybe because of the age difference.", "sisterYounger"],
  },
  teenage: {
    teenage1: ["teenage1", 10, "There weren't many happy moments from my teenage years, to be honest. Dad was a cop and, well, one day he did not return from his job, some accident on a shooting range they told me. Mother had a rough time trying to raise me on a pension. Well, dad's colleagues helped us a lot in the first few years actually, I wouldn't know what would have done without them.", "dadDead"],
    teenage2: ["teenage2", 60, "I don't really know what to tell you about my teenage years actually. Oh, I once broke a leg when we tried to get to a closed construction site, I fell from the fence. Mom was really angry but I was so miserable she couldn't help but pity me all the time so I just spent a month lying in my bed upstairs playing the console. Maybe I need to break it again? I wouldn't mind spending one more month like this now, hah.", "none"],
    teenage3: ["teenage3", 60, "School was really tough, I was pretty petite and weak so bullies were a real problem. You know how if you try to fight back you both get detention? Most stupid thing ever. Anyway, I was in fights, like, all the time, what a little angry demon I was, hehe. Then dad got me to a martial arts school and, well, in next two to three months it was over with the bullies.", "none"],
    teenage4: ["teenage4", 60, "It was a good day when I was in school, parents divorced but I never had a really strong connection with my dad so we just lived with mom and my granny. You should've seen my room back then, it was a total mess, ha-ha! I was a real pig and then mom said that she would take my laptop and phone every time she found my room messy. Well, I guess it helped. I had no choice then I got really good at getting my place sparkling.", "parentDivorced"],
    teenage5: ["teenage5", 30, "I was totally into horse riding in school, started when I was twelve... or thirteen? Can't remember now. Anyway, my parents even thought about entering me into competitions and stuff but then my brother fell ill and you know all the stuff for equestrian sports cost a ton and we already had a loan for a house so... I still like to ride from time to time actually.", "brotherYounger"],
    teenage6: ["teenage6", 20, "My mom left dad when I was fourteen and went to one of that hucow camps... dormitories... I forget how those things are called officially, to be honest. Well, the whole family was shocked and dad actually never got over it. He did his best to raise me though and also found a new wife. They live not far from here actually, just about three hours from the valley. I tried to find any traces of my mom but she, like, disappeared. And she never tried to contact me since she left us so I guess... actually I don't know, I mean, I hope she is happy now.", "stepParent"],
  },
  familyGen: {
    familyGen1: ["familyGen1", 70, "We have a big friendly family. Maybe even too big with all these aunts and uncles and such. I have tons of relatives and I grew really sick of most of them. All these family gatherings were getting old so I honestly can't stand them anymore. They're not bad people, just a bit too noisy.", "none"],
    familyGen2: ["familyGen2", 100, "Well, I can't really say my family is something I'm really fond of. Well, when your parent is an alcoholic it affects everything and I am just glad I am living on my own now. I still keep in touch but it is mostly calling from time to time and sending Christmas cards.", "none"],
    familyGen3: ["familyGen3", 100, "It is just like most families, I guess. My grandad is a really cool guy, he engineered those things for satellites and stuff. He is pretty old yet but still tinkering with some stuff in the garage, once he even set it on fire accidentally, hah. You can imagine how furious my parents were, the house was just painted a week before that.", "none"],
    familyGen4: ["familyGen4", 80, "Oh, I like family gatherings, we usually get together every year and have a barbeque and such things. It is something that bonds us together because most of the family lives on the west coast and my uncle, auntie and their children are in SoCal. So it is always a big day when we all get together. Maybe I should invite them all here one day?", "none"],
    familyGen5: ["familyGen5", 60, "Hah, I just remembered one funny thing that happened. Chuck, my younger brother once got his new girlfriend to meet our parents and well, she was a punk, like totally on style, black boots, leather, tattoos, piercing, you got it. It was the most awkward scene ever because our family is like proper Christians and you can imagine how bad that dinner was.", "brotherYounger"],
    familyGen6: ["familyGen6", 100, "Well, after my parents divorced, it got not that happy at all but I guess there are much harder stories than mine actually. I always try to look on the bright side of life, you know. So maybe it was for the better after all.", "parentDivorced"],
  },
  familyPar: {
    familyPar1: ["familyPar1", 100, "Well I have a stepparent, did I ever mention this? I can't remember. Anyway, we get along pretty well and although I can't say we are the best family it is not that bad after all. I call my parents often and they seem happy together so I am happy with this too.", "stepParent"],
    familyPar2: ["familyPar2", 20, "There is still a thing I rarely speak about, so maybe you will be one of like three or four people who know this. When mom died I was upset but I still surprised that I was not that upset. I mean, it was sad and all but I recovered pretty quickly. Maybe we just had not that strong connection after all.", "momDead"],
    familyPar3: ["familyPar3", 70, "I have a good nice family, like most others I guess. We have arguments from time to time like any other family but we're close and care about each other. They helped me a lot when I had my downfalls and I appreciate it a lot.", "none"],
    familyPar4: ["familyPar4", 50, "Family is everything for me, I can't imagine having no relatives like you, I mean, I am sorry, I was not willing to offend you in any way. It is just so weird for me, I spend a bunch of time with relatives and would be super stressed without them.", "none"],
    familyPar5: ["familyPar5", 50, "Well, I don't like to talk a lot about my family actually. I have no connection with them, we are totally different people now and I don't even know what I am supposed to talk about when we meet.", "none"],
    familyPar6: ["familyPar6", 50, "My family tried to move here to Appletree but the process is really long. There are some complications with the Institute, it seems they want to keep the city closed for everyone except their employees. That is pretty much despotic I must say. Anyway, I am sure we will push them eventually.", "none"],
  },
  familySib: {
    familySib1: ["familySib1", 100, "Jeremy, my brother, is in the navy now, all the family is proud of him. He even got some medal a couple of years ago. He rarely comes to the states with all these neverending conflicts going on here and there across the globe.", "brother"],
    familySib2: ["familySib2", 50, "My brother, Antony, is a nice guy but he is just a bit... odd. He is really obsessed with some nerd stuff like UFO hunting and conspiracy. He has a shed filled with some really weird stuff. Last time we met he tried to prove to me that Thornton institute was breeding beasts with tentacle-like arms and was keeping them in the underground facilities. That was pretty hilarious to hear and I just let him believe this nonsense if he likes it.", "brother"],
    familySib3: ["familySib3", 20, "Well I have a brother, he... I am a bit ashamed to admit it but he relocated to San-Fran and now working as a stripper, he is a good guy but we are just really different. Well anyway, if it is the thing which makes him happy I am okay with it.", "brother"],
    familySib4: ["familySib4", 100, "My sis is such a disappointment right now, she dropped out from college and we actually did not receive any news from her for over a year now. She started taking drugs in high school, Zone and Satyr and I guess she now hooked up on other too. Parents tried to send her to clinics and stuff but it did not help much.", "sister"],
    familySib5: ["familySib5", 100, "Sister works for some tech company on the east coast, I don't completely get what it is all about but sounds like some genetical researches or something. She is a big boss there as far as I know.", "sister"],
    familySib6: ["familySib6", 100, "Well, my sis is living not far away from here actually, she is married and have three kids, pretty happy family she has there and I am happy for them actually. We meet from time to time, it is nice to spend some time with them.", "sister"],
  },
  college: {
    college1: ["college1", 100, "I liked college, it was cool, all the parties, friends, we even made a band and actually had two gigs at local bar! It was pretty sad to leave all this for this pesky boring adult life. Maybe I need to buy a guitar again? Do we have a guitar store in the city?", "college"],
    college2: ["college2", 100, `You never going to believe it but I was like a total nerd in the college! I had the best grades, spent all my time in the library and such. Somehow I still had some "cool" friends and they slowly adapted me to the real world so got more of a living person and less of a bookworm. All this taking me to the parties and stuff worked, after all, I guess, hehe.`, "college"],
    college3: ["college2", 100, `I had a lot of friends, it was happy times for me. At one point, I was so into parties and stuff my grades were in pretty bad shape and I was like this close to getting my ass out of the college. So yeah, last two years I was studying like a good student, attended all the classes and stuff. It would be super stupid to take this loan for nothing after all.`, "college"],
    college4: ["college4", 100, `I hated that college sooo much! I just can't describe how boring it was, and I had no actual friends there, my neighbor was a jerk and we had arguments all the time. I was really happy when it finally ended.`, "college"],
    college5: ["college5", 30, `Nothing special, sorry. Just went there, studied some thingies, got my diploma, end of the story. Well, I had some funny moments, we broke a window in the professor's house one night. We were drunk and decided that it was a good idea. He called the police but did not saw our faces so he had nothing against us. Still, I guess he suspected us until the end. He was a jerk anyway, I don't feel any remorse for what we did.`, "college"],
    college6: ["college6", 100, `Ah, college. Well, I was not that good and could barely save my ass from being thrown out from the damn place. I guess it was just not for me after all. I don't say I am stupid, just the system is imperfect, they teach things in the most ineffective way in my opinion. I just couldn't get my head around it.`, "college"],
  },
  job: {
    job1: ["job1", 100, "job story placeholder 1", "none"],
    job2: ["job2", 30, "job story placeholder 2", "none"],
    job3: ["job3", 30, "job story placeholder 3", "none"],
    job4: ["job4", 30, "job story placeholder 4", "none"],
    job5: ["job5", 30, "job story placeholder 5", "none"],
    job6: ["job6", 30, "job story placeholder 6", "none"],
  },
  moving: {
    moving1: ["moving1", 100, `Oh, that is a funny story about me moving here. I was just fired from my old place and went out with a cardboard box with my stuff to the parking. Well, my usual luck, the bottom of the box opened and all my stuff fall to the ground. My favorite cup was lost forever, I still miss it by the way. So, after I got all my stuff back I just sat there to, I don't know, cry for a bit I guess. And then I saw one of these Thornton billboards, you probably saw them too, tons of them were here and there advertising Appletree. "Your town. Our town" or something like that. Anyway, I just suddenly thought like "Screw it. I going to try it. Well, the rest is history, I applied, they accepted my CV and here I am.`, "none"],
    moving2: ["moving2", 80, "Well they send me an offer when I was getting my bachelor's degree. It was a pretty pleasant surprise to be invited actually. I didn't want to leave my place, I really liked the uni and wanted to stay for some science career but they insisted on sending me letter after letter until I finally gave up. And now I am here. Was it a good decision after all? No idea actually.", "bachelor"],
    moving3: ["moving3", 60, "After my mom passed away I actually found that there is not much that holds me on my place and just wanted to move somewhere to start from the scratch. So this brand new Appletree looked like a good option. It took about four months until they finally sent me an offer, I was 100% it was rejected already. Maybe this GLADyS robot decided that I worth something after all.", "momDead"],
    moving4: ["moving4", 80, "I was just transferred from their other office here when they start gathering all their corporate stuff in this valley. I did not want to move but you know them, they can be really convincing when they need it.", "none"],
    moving5: ["moving5", 80, "They sent me an offer and I left my old job without any doubts. Thornton is like the most desirable workplace in the whole country, just take a look, they built a whole city in just some years! Of course I wanted to work for them.", "none"],
    moving6: ["moving6", 80, "I already lost any hope for getting a job with this economical depression raging and this was the last place I decided to sent my CV before giving up and going to work in some fast food making burgers and such. I was really shocked when they answered me with an offer in just an hour and, well, I just packed my stuff and took a bus the next day. I didn't believe they really wanted to hire me until I got here, to be honest.", "none"],
  },
  marriage: {
    marriage1: ["marriage1", 80, "Oh, we met on one of those silly student parties and started dating, well, let's say, on the same evening, hehe. And then we got married in... after three or four months I guess. It was a small ceremony, only close friends. Even our parents did not come, they still are skeptical about us.", "married"],
    marriage2: ["marriage2", 100, "Let me remember... It was in the cafe, yeah. It was in July, a super warm day... Anyway, I just went to take coffee-to-go before work and just bump into the doors. Of course, all the coffee spilled on clothes, I was sorry, I gave my number because I wanted to pay the laundry and such and then it all went really smooth, heh.", "none"],
    marriage3: ["marriage3", 100, `Hmm... Well, we actually met each other in an online game, maybe you also played it? СoC 14? Well, anyway, we were in the same clan and started chatting and stuff. It was a big surprise to find out that we both are living in the same town and I just took my backpack, jumped in the car and we met in person. Then there was some long period we just hang on together, I guess for about a year or so, just like friends, nothing sinful hah. Well then it is just a story everybody tells, we started dating and married after some time together. Pretty boring story to be honest.`, "married"],
    marriage4: ["marriage4", 100, "Nothing special, we lived on the same street and went to the same school so we just kissed on our prom and bam, we are married. I was really shy then so I still don't know how I pulled this all off.", "married"],
    marriage5: ["marriage5", 100, "Oh, yeah. We met at the parking lot, I am not a perfect driver in the world and was even worse back then so I just parked our cars kinda parked into each other, hehe. Then we went out and yelled at each other for a whole ten minutes. I literally have no idea how this led to getting married but anyway, we divorced on our third year and I have zero regrets about it. I can yell on people alone pretty well, two of us is really too much of noise.", "exSpouse"],
    marriage6: ["marriage6", 100, "Well, it was my greatest mistake in the whole life. At first, it all looked cool and we had a great time together but after a year I just found that I was cucked and I really respect myself way too much to tolerate such things. So I just waved goodbye and left.", "exSpouse"],
  },
};

setup.storythread.uniqueStories = {
  n101 : {
    childhood: ["LilyChi", 100, `Well, growing up with two sets of genitalia was really weird. My parents didn't know if they were supposed to raise me as a boy, a girl, or something in between. I think I gravitated to more feminine things pretty early, because I started elementary school as a girl. Luckily, my body seemed to agree with my choice, and I ended up looking feminine. In elementary school there was an incident where some girls found out I had a penis, and I was teased a ''lot''... so after that I was really careful not to let anyone know. Let me tell you though... those random boners during puberty really sucked.`, "none"],
    teenage: ["LilyTeen", 100, `<<if $AW.startMale>>Well, you knew me in highschool, so you know most of it.<<else>>Most of my highschool life was just like other girls I suppose... nothing too special.<</if>> I guess the interesting part was going through school as a futa. Let me tell you, nobody should have to deal with periods ''AND'' hair-trigger boners. I had to be careful, so I didn't wear skirts or revealing clothing very often. Fortunately my cock isn't really long or anything, but it's thick and damn-near impossible to angle downward. More than once I had to use "female cramps" to explain away a painful boner. Asside from the physical aspect, I ended up avoiding romance or getting intimate which was pretty lonely in the end. <<if $AW.startMale>>I couldn't even bring myself to tell you about it, after all... I was just so scared at the time.<<else>>There was actually a boy I had a major crush on starting in high school, but I could never let our relationship advance because of my secret. I still kinda regret it.<</if>>`, "none"],
    familyGen: ["LilyFam", 100, `My family life wasn't crazy or anything, but it was lonely. My parents were both busy with work all the time. As I got older and better able to take care of myself, that only resulted in my parents spending more time away with their work. I guess I shouldn't complain too much, because I had a lot of freedoms that other people my age didn't. Still, I think I would have rather have had strict parents if it meant being more of a family. Now I'm practically estranged from my parents. When I have kids, I really want to be part of a family with them.`, "none"],
    familyPar: ["LilyPar", 100, `My parents are both scientists, and of course I followed in their footsteps. They worked as professors at a university, however, while I decided to go into the private sector. I think they might have been a little disappointed that I wasn't pursuing "pure" science or teaching, but by the time I was finished with college we were so estranged that I think they didn't feel they had the right to say anything... which they didn't. To be honest, I don't think about them much. We talk maybe once a year on the phone for a few minutes sometime around the holidays. I want a big family, and unlike my parents I'm going to be there for my kids.`, "none"],
    familySib: ["LilySib", 100, `<<if $AW.startMale>>You know I was an only child,<<else>>I was an only child,<</if>> that was becoming pretty common in those days. I always wanted to have a brother or sister though, probably more than most kids. I think I was craving more of a family connection, after all. I guess I had this notion that even if my parents weren't really around, my sibling and I would have each other. One of the things I decided when I got older was that I wouldn't settle for having less than two kids, though personally I think four is my perfect number. That way, my kids are sure to have the siblings I didn't have.`, "none"],
    college: ["LilyCol", 100, `Heh, college was a pretty interesting time. While I was an undergrad, I was still pretty focused on <<if $AW.startMale>>my crush on you<<else>>the boy I was in love with<</if>>. Once I got into graduate school though, that's when I finally started to explore my sexuality. I had always been ashamed of my body, especially after my experience in elementary school. As a grad student though, I finally realized how much fun it was to be a futa. In addition to being able to have fun with girls, I also found to my surprise that most guys didn't mind my extra equipment. In fact, I'd say a lot of them actually rather like it. I did learn that I need to be somewhat upfront about it though, some people don't like surprise cock.`, "none"],
    job: ["LilyJob", 100, `My job is pretty cool, I have to admit. I can't really tell you what I do, but I'm the head of a department in the BioMedical Division. The pay is quite nice, I suppose my only complaint would be that I spend more time on administrative tasks than I used to. It's part of moving up though, so it is what it is.`, "none"],
    moving: ["LilyMov", 100, `I moved here not too long after finishing school, Appletree was just opening up then. While the structure hasn't changed much, there's a lot more here. More businesses and shops moved in, and of course more people. I've noticed that it feels like things are changing around here compared to how it was before, but it's something really hard to put your finger on, you know?`, "none"],
  },
  n102: {
    childhood: ["TobyChi", 100, `I grew up in the sticks, just farmland for miles and miles. Because of corporate agriculture, there weren't even a lot of farmers around. There weren't really any kids to play with outside of school, so I did a lot of stuff outdoors. When we moved to the city while I was in highschool, I finally started to appreciate growing up with all that space. Once I was living in the city, I had to take a long drive before I could go hiking, camping, or anything like that.`, "none"],
    teenage: ["TobyTeen", 100, `I guess I was a pretty normal teenager, thought I knew everything there was to know. Moving into the city really challenged that perception. There I was, 16 and driving an old pickup truck, totally unprepared for how things worked in the city. I really didn't fit in at all at first. I made a couple good friends, thankfully, so it worked out. I remember being really excited about there being enough people for sports though. Unfortunately my mom would only let me sign up for Soccer. I tried it, but the locker room anal orgies really weren't for me.`, "none"],
    familyGen: ["TobyFam", 100, `<<if not $AW.startMale>>My family is really fucked up.<<else>>As you know, my family is pretty fucked up.<</if>> I guess everything was pretty normal for most of my childhood though. Then of course my mom murdered my father during my senior year... So I was basically on my own while she was in Jail for mariticide. <<if $AW.startMale>>You helped me a lot during that rough patch. <</if>>My mom eventually got out of jail, the reduced sentences for mariticide, combined with good behavior and Institute sponsorship for her parole. It's... complicated.`, "none"],
    familyPar: ["TobyPar", 100, `Well, my dad used to be a veterinarian before my mom killed him. My mom is some sort of bio-agri-tech researcher that focuses on dairy production. We lived out in the boonies, and which worked out well because my dad was the vet for the farm livestock. Eventually the area was bought out by a big agricorp, and they had to get new jobs. That's when we moved to the city. Apparently my mom was using some puppies as test subjects for precocious milk production. The puppies were in a lot of pain when my dad found them, and it seemed like a failure, so he put them down. I guess that ruined more than six months of my mom's work though, so she murdered him in a rage. Now she's working on hucow milk production I think. She tries to act like nothing happened and still be my mom, but I can't really forgive her.`, "none"],
    familySib: ["TobySib", 100, `I don't really have any siblings, but I suppose technically I have a younger half sister out there somewhere. My mom got pregnant when I was three, but when the baby was born, it wasn't the right color. I guess it was pretty obvious that it wasn't dad's. My mom gave her up for adoption, and that was it. I was too young to really understand what was going on, so I only know most of this from what little family members have let slip. My parents were totally silent about it, so I didn't realize that I had a sister until my mom was in prison. Still, even if we're technically related, it's not like we grew up together.`, "none"],
    college: ["TobyCol", 100, `<<if $AW.startMale>>Well you know what college was like, I mean you were there with me for over two years. I guess the last year and a half was a lot like before, but it was less fun without you around. I was able to focus a little better on studying though, so there's that! After you left I was eventually able to enjoy having such a high girl-to-boy ratio. I was always waiting to see what would happen with us before that, so...<<else>>College was college, I suppose. I wasn't one of the really wild guys, and I didn't join a fraternity or anything. I mostly went to class and hung out with my friends. Having more than 2 girls for every guy did make things more interesting, but I spent three years hung up over this girl that was also my best friend. I finally started to live a little when she dropped out in the middle of our Junior year.<</if>>`, "none"],
    job: ["TobyJob", 100, `Man my job is boring as fuck. I studied business administration in school, so I didn't exactly have a lot of options, you know? I work as a paper-pusher in Meta-Materials Manufacturing. Basically I'm an embedded part of the bureaucrat corps. I basically just handle paperwork all day. Orders, production reports, inventories, and anything else boring. Still... I'm pretty happy to have a stable job that pays decently.`, "none"],
    moving: ["TobyMov", 100, `I actually wasn't having any luck after graduation finding a job, and there was no way to afford grad school without a student loan shark. Right about when I was giving up hope, my mom was released from prison to work for the Institute. I hadn't forgiven her or anything, but I ended up moving in with her because that was the only decent option left. I lived in Appletree for a few months before getting my job here, which is pretty unusual. I really like how easy it is to get out into nature here, while still having all the stuff you could want right in town.`, "none"],
  },
  n103: {
    childhood: ["gmanChild", 100, `It's classified.`, "none"],
    teenage: ["gmanTeen", 100, `It's classified.`, "none"],
    familyGen: ["gmanGen", 100, `It's classified.`, "none"],
    familyPar: ["gmanPar", 100, `It's classified.`, "none"],
    familySib: ["gmanSib", 100, `It's classified.`, "none"],
    college: ["gmanCol", 100, `It's classified.`, "none"],
    job: ["gmanJob", 100, `It's classified.`, "none"],
    moving: ["gmanMov", 100, `It's classified.`, "none"],
  },
  n1019 : {
    job : ["GraciePartonJob", 100, "Yeah, I have been working for... let's see... hmm about 8 years here already. Phew, quite a ride, mm? I just... look, don't get me wrong, I like this job and being a milk donor is bliss. It’s just, I'm not getting any younger and it is getting harder to be as productive as I was before. New girls from the dorms will beat me with daily outcome really soon... and I hate to think about it to be honest. I... I don't really know what I should do after I retire.", "none"],
  },
  n1020 : {
    job : ["ZoeKagavaJob", 100, "story KAGAVA", "none"],
  },
  n1021 : {
    job : ["OliviaBaxterJob", 100, "Hmm, where should I start? Well, I was a promising manager, new luxurious car, corporate bonuses, all this stuff. Spent all my free time on self-education, reading, courses, aspiring to be more, blah-blah-blah. But I really wasn’t that happy to be honest. That life was... just not for me, can you understand? It’s hard to explain, just that constant feeling of being in the wrong place that poisons you every day. Anyway, one day I just visited this co-op on my way home from work and talked with a manager for twenty minutes. Next day I quit my job, packed some stuff, got there and signed a five-year contract. And you know what? I haven't read a single book since then. But the most important part is that I am finally happy.", "none"],
  },
  n1024 : {
    teenage : ["MyaOwenTeenage", 100, "I rarely talk about this... I... I am barren. Phew, that was not as hard as I suspected it will be. I got some heavy bacterial infection when I was 13 and it hit my hormonal functions. Like a lot. You can see that my breasts are pretty much non-existent and I can't have children. My parents and everybody else were supportive and such but when girls of my age started getting pregnant, having children... damn, at least they wore a bra! I guess this is the reason I became a genetic specialist, I hope maybe working with subjects in the Co-op will help me to find some cure for my condition.", "none"],
    job : ["MyaOwenJob", 100, "Yeah, so I am working in Farm Co-op as a lead medical specialist. I conduct tests, apply some gene vectors, we even perform some pretty serious research on fertility and lactation. For me this job is a love-hate relationship. I mean, I like my work but seeing these happy dumb cows with their udders popping a child or two every year when I am being denied all of this is some form of mental torture.", "none"],
  },
  n1014 : {
    teenage : ["HannaBowenTeenage", 100, "storytext", "none"],
    college : ["HannaBowenCollege", 100, "storytext", "none"],
    moving : ["HannaBowenMoving", 100, "storytext", "none"],
    job : ["HannaBowenJob", 100, "storytext", "none"],
  },
};

// TODO n1018 n1020