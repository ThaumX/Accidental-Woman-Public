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
      if (thread === "college") {
        winner = "college11";
      } else {
        winner = "none";
      }
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
    if (thread === "marriage" && aw.npc[npcId].background.married === false && aw.npc[npcId].background.exSpouse === 0) {
      winner = "marriage11";
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
  const randomStory = random(0, 9);
  let storyType;
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
      case 9:
      story += "@@.pc;So, what your kind of perfect partner is?@@<br><br>";
      storyType = "prefs";
      break;
      default:
      story += "<br>ERROR in story threads!<br>";
      storyType = "childhood";
      break;
    }
    let origin = [];
    if (storyType !== "prefs") {
      if (setup.storythread.uniqueStories[npcId] !== undefined) {
        if (setup.storythread.uniqueStories[npcId][storyType] !== undefined) {
        origin = setup.storythread.uniqueStories[npcId][storyType];
        aw.con.info(`setup.storythread.getStory choosen 1`)
        story += `@@.npc;${origin[2]}@@<br><br>`;
        } else {
          origin = aw.storythreads[storyType][bullshit[randomStory]];
          story += `@@.npc;${origin[2]}@@<br><br>`;
        }
      } else {
        if (aw.storythreads[storyType][bullshit[randomStory]] !== undefined) {
          aw.con.info(`setup.storythread.getStory choosen 2`)
          origin = aw.storythreads[storyType][bullshit[randomStory]];
          story += `@@.npc;${origin[2]}@@<br><br>`;
        } else {
          aw.con.warn(`setup.storythread.getStory got UNEXPECTED WEIRD BULLSHIT ERROR CODE 381503-3!`);
          story += `@@.npc;Don't really want to talk about this now, sorry.@@<br><br>`;
        }
      }
    aw.npc[npcId].record.info.stories[randomStory] = true;
    State.active.variables.storyTellerId = npcId;
    aw.S();
    if (origin[3] === "none" && randomStory !== 6) {
      setup.npcInfo.level(npcId, {bGround: 1});
    } else if (randomStory === 6) {
      setup.npcInfo.level(npcId, {sched: true});
    } else {
      setup.npcInfo.level(npcId, {bGround: 2});
    }
    return story;
  } else {
    let other = "";
    function bestOfPrefs(array, labels) {
      const firstLove = array.indexOf(2);
      const firstLike = array.indexOf(1);
      let output = "";
      output = (firstLove > -1) ? labels[firstLove] : (firstLike > -1) ? labels[firstLike] : "";
      return output;
    }
    let orientation = "straight";
    const Hlabels = ["very short stature", "short stature", "average height", "tall", "very tall"];
    const Wlabels = ["anorexic", "skinny", "normal weight", "plush", "chubby", "fat"];
    const Mlabels = ["frail", "ordinary", "toned", "muscular", "body builder"];
    if (aw.npc[npcId].pref.Fother[0] > 1) {
      other += "big breast, ";
    }
    if (aw.npc[npcId].pref.Fother[0] > 1) {
      other += "small breast, ";
    }
    if (aw.npc[npcId].pref.Fother[0] > 1) {
      other += "big hips, ";
    }
    if (aw.npc[npcId].pref.Fother[0] > 1) {
      other += "small hips, ";
    }
    if (aw.npc[npcId].pref.Fother[8] > 1) {
      other += "big booties, ";
    }
    if (aw.npc[npcId].pref.Fother[9] > 1) {
      other += "small butts, ";
    }
    if (other === "") {
      other += "...well to be completely honest I don't have any strong preferences. I mean, anything goes as long as the person is that special one.";
    } else {
      other += "and... well, it is rather hard to explain when I think so hard about it! Hm, And what's about your preferences?";
    }
    if (aw.npc[npcId].trait.homo) {
      orientation = "gay";
    }
    if (aw.npc[npcId].trait.bi) {
      orientation = "bisexual";
    }
    
    story += `@@.npc;Hmmm... well I am ${orientation}, it is what it is, right? Speaking of my perfect partner, I'd say it is somebody ${bestOfPrefs(aw.npc[npcId].pref.Fheight, Hlabels)} ${bestOfPrefs(aw.npc[npcId].pref.Fweight, Wlabels)} with a ${bestOfPrefs(aw.npc[npcId].pref.Fmuscle, Mlabels)} body. Also I am fond of ${other}@@<br><br>`;
    setup.npcInfo.level(npcId, {pref: 2});
    aw.S();
    return story;
  }
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
    farm3: ["farm3", 15, `As a child, I lived on a small farm in the heart of Nebraska, seeing bullshit only every day, both physical and metaphorical. I was a low key bastard of bikers. How do you like it? Mommy had refused the abortion, and I was a goatherd and a scapegoat until I escaped this life when I was thirteen.`, "none"],
    farm4: ["farm4", 15, `I was the youngest of five brothers and sisters on a large farm in Virginia. I had no chance to inherit the farm after my dad, of course, but I did not want it as well. This was not my cup of tea. I liked reading books and watching educational shows, much more than digging the soil. Finally, my father sent me to one of these old fashioned catholic schools where the pupil become either the top dog or the black sheep. I barely survived there.`, "doctor"],
    farm5: ["farm5", 15, `After my parents went to jail, I was raised by my uncle. He was a redneck farmer in Utah and bent over backward to make me an improved copy of himself. Well, he failed. I never wanted to feed pigs all my life and to read the Bible only, and I cut and ran at the first opportunity.`, "stepParent"],
    farm6: ["farm6", 15, `We lived on a small farm, and my father was a seasonal worker. When he had no work, he was drunk as a skunk and wasted all his earned money and the big part of the money earned by mommy. The older he became, the less work he had. Nobody wanted to pay to the hopeless drunkard, you see. We even starved two or three times. Unbelievable in the modern world, right? I was a child, and I took it for granted, of course. When I was six, my drunk dad felt in the gutter and drowned. Then we left the farm, and I realized that life does not have to be this hard. The next year I got my first-ever Christmas gift.`, "dadDead"],
    farm7: ["farm7", 15, `I’m a simple country guy. Rustic, they say. Born on a farm, lived on a farm and was quite eager to die on a farm. I spent good old times there playing with neighbor children. I’m used to hard work, ye’ know. But when my old man had gone we decided to move. That’s life. It was so easy then and so different now.`, "dadDead"],
    farm8: ["farm8", 15, `I loved those years on a farm. We used to have animals and domestic birds. I liked them and gave them names. But you know how things are going on farms. One day you call this cute she-goose Dabby-Dab, play house with it, and the next day you have it for lunch. A rural life as it is.`, "none"],
    farm9: ["farm9", 15, `When I was a child we used to have a house and a small farm. And there was a huge lake right behind the fence. My younger sister and me, we loved to fish there. And swim, too. Once in the morning, when she’d been there already with her rod prepared, I suddenly took a run through all that dittany and jumped into the water! She screeched and fell, too. She wanted to drown me, but got tangled in the fishing line. I’m still getting shy when she’s telling this family story to our friends.`, "sisterYounger"],
    farm10: ["farm10", 15, `In my childhood, my family used to live on a farm. The world seemed small and big at the same time. I’ve been dreaming about moving to the city to see how really big it was. Well, now I’m here in Appletree, and all I dream about is a farm of my own somewhere as far from here as possible.`, "none"],
    city1: ["city1", 35, "It was a pretty normal childhood I guess. The neighborhood was nice, the kind most Americans would dream of, white fences surrounded every house, all the front lawns were perfectly trimmed, we had barbeques every Sunday... Well, then the depression came and the rest is history.", "none"],
    city2: ["city2", 35, "I have a sister and we were like best friends back then. Our parents were working hard and most of the time we just played together. We lived downtown, it was a pretty good place to live actually. Appletree looks like just a village to me now, I got used to big cities.", "sister"],
    city3: ["city3", 15, `I lived in the low-class block in New York. My mom worked hard, having no weekends while my dad always was either hammered or in a black mood. Frankly, I was a street kid until my teen ages. But this was not so bad. At least it was funny.`, "none"],
    city4: ["city4", 15, `Well, I don’t have much to tell you about my childhood. We lived in a  quiet middle-class district of Seattle city. Our parents were ordinary white collars, and we were just children. One day my younger brother claimed to be a hero of the day and called cops telling them of a bomb in the school building. Of course, they found nothing. But my parents had to sell our house to pay the huge fine, and we left Seattle.`, "brotherYounger"],
    city5: ["city5", 15, `We lived in Cincinnati, I mean myself, mommy, and dad. But they divorced when I was four. The marriage was just my father’s way to survive the hard time. He was not of a marrying type, you got it. It was a sort of his nightmare that one day he would be called a grandfather. But he loved me and was somebody like my elder friend if this can explain our relations. I would say my childhood was happy, though mommy hasn’t forgiven him yet.`, "parentDivorced"],
    city6: ["city6", 15, `I had no father. My mommy was a hippie when she was young and shared the idea of free love until she felt pregnant. Unfortunately for her and fortunately for me, she had no money to pay for the abortion. She had to leave the movement and nurse a child, doing a menial job to survive in New York downtown. You cannot even imagine how she hated my unknown father because he stole her life. When I was seven, she died from drugs, and I had to live in an orphanage.`, "momDead"],
    city7: ["city7", 15, `I grew up in a common not-so-wealthy district. Big city, small room. Our neighbors were typical blue-collars and immigrants. Every morning a six-hour train woke me up, and I went to school with a headache. I was dreaming of a nice, wide, and quiet place to live. Here, my dreams seem to come true.`, "none"],
    city8: ["city8", 15, `In my childhood, I never felt like home. My parents divorced when I was a pre-school. So I moved from dad’s place to mom’s and back, depending on who appeared to be less busy. I was an alien in my native city. I spent hours looking out of the bus window. When someone was telling me how he loved the city, I just failed to get what he meant. And I felt jealous lacking this love.`, "parentDivorced"],
    city9: ["city9", 15, `I spent my childhood in a big city. The state capital. I got used to fast life. Everyone seemed to hurry there, and everyone was late to somewhere. There was no time to stop and have a look around, though my city was quite worth it. At first, Appletree looked so leisurely. But here and now I understand it’s a false feeling.`, "none"],
    city10: ["city10", 15, `Oh, we were a tight group of that type of children your mom didn’t allow you to play with. Every day we rushed through that flat net of streets and avenues. Riding bikes and skateboards with hoots and shouts. Bumping into people. All the city was our playground. I still miss that amazing feeling of freedom.`, "none"],
    smallcity1: ["smallcity1", 40, "Well, it was a small city in the north. Pretty depressing place. I remember dad started drinking when he lost his job. Actually, it's something I don't like remembering. Anyway, then he joined AA and everything got better, we moved, I went to a new school, we moved to a new house. I liked it much better.", "none"],
    smallcity2: ["smallcity2", 40, "I was born where my parents lived in Oak Valley, in a small southern town. I was always wondering why people called it that, I never even saw any oak trees, heh. Then I suddenly got a younger sister and it was a bit hard, you know, when you are an only child and suddenly all the attention in the family moves from you to some toddler. I remember my parents bringing me to a psychologist one or two times. Anyway, I eventually got used to her but we are not the best of friends, maybe because of the age difference.", "sisterYounger"],
    smallcity3: ["smallcity3", 40, `It was Palm Beach, a little resort town near Miami. My family in three generations owned a small second line hotel. We, of course, did not live in clover, though we always had bread and butter. But when I was almost ten, the great hurricane Magdalena struck the southern states. You must remember it, right? The good half of the shore laid in ruins, including our hotel and my childhood. The government paid peanuts to compensate for our losses. Then we left Florida.`, "none"],
    smallcity4: ["smallcity4", 40, `I am not a native American, <<ↂ.pc.main.name>>. I was born in Russia in a small green town Visokinichi near Kaluga. Eh, my native speech seems odd, even for me. The childhood in Russia and childhood in the USA do like chalk and cheese. But both me and my younger sister Helen had the time to our lives. One day I would tell you some funny stories if you like to hear me talk. `, "sisterYounger"],
    smallcity5: ["smallcity5", 40, `I was born in France, where my mother was a sales manager of the airline service. We lived in Rixheim, a small town near Mulhouse airport not far from the German border. I had many friends, some of them were French, some were German and even Swiss, and when we returned to the USA after the pandemic, nobody understood my English-German-French pidgin. A few years later, this experience helped me to become a philologist.`, "bachelor"],
    smallcity6: ["smallcity6", 40, `I was a late child. My elder brother was eighteen when I was five. We lived in a small town in the Pennsylvania countryside, so tiny as a farm or a village. Dad was a veteran of the Iraq war and had a good army pension for his Purple Heart. And I… I was a kind of the ringleader of the local gang of kids, and this was funny until we grew up and could be brought to justice.`, "brother"],
    smallcity7: ["smallcity7", 40, `My family used to live in a little-known town. It was one of those horror story writers adore. All surrounded by woods, not far from the Canadian border, and with an old gasoline station on the way to. Everybody knew one another, and nothing could be hidden. I wonder if Appletree appears to be alike.`, "none"],
    smallcity8: ["smallcity8", 40, `I don’t remember my early years. Nothing, naturally. At the age of five I was placed to a foster family in a town at Westcoast. It was not too poor or too happy there, but I’m sure I could hardly have a better childhood with my biological parents. I cannot say I got too close with my foster parents, but I still love the sunny sleepy streets of my town.`, "stepParent"],
    smallcity9: ["smallcity9", 40, `I love small towns. That’s the main reason I’ve moved to here. In my childhood, I used to live in one of those. I used to know every neighbor, every neighbors’ pet, and every neighbors’ pest when I was a child. In towns the air is fresher, and the people are more friendly than it’s in cities. You can easily love a thousand. Even ten thousand. But never a million.`, "none"],
    smallcity10: ["smallcity10", 40, `I used to live in a town to southwest of the country. I got pretty close with a friend of mine who lived next door. We went to the same school. Well, that was the only school in the town. Though most of the stories of this kind end unhappily, we got married. I think every place is like home when you love and loved. So, we are both here now, and time will tell the rest.`, "married"],

  },
  teenage: {
    teenage1: ["teenage1", 10, "There weren't many happy moments from my teenage years, to be honest. Dad was a cop and, well, one day he did not return from his job, some accident on a shooting range they told me. Mother had a rough time trying to raise me on a pension. Well, dad's colleagues helped us a lot in the first few years actually, I wouldn't know what would have done without them.", "dadDead"],
    teenage2: ["teenage2", 60, "I don't really know what to tell you about my teenage years actually. Oh, I once broke a leg when we tried to get to a closed construction site, I fell from the fence. Mom was really angry but I was so miserable she couldn't help but pity me all the time so I just spent a month lying in my bed upstairs playing the console. Maybe I need to break it again? I wouldn't mind spending one more month like this now, hah.", "none"],
    teenage3: ["teenage3", 60, "School was really tough, I was pretty petite and weak so bullies were a real problem. You know how if you try to fight back you both get detention? Most stupid thing ever. Anyway, I was in fights, like, all the time, what a little angry demon I was, hehe. Then dad got me to a martial arts school and, well, in next two to three months it was over with the bullies.", "none"],
    teenage4: ["teenage4", 60, "It was a good day when I was in school, parents divorced but I never had a really strong connection with my dad so we just lived with mom and my granny. You should've seen my room back then, it was a total mess, ha-ha! I was a real pig and then mom said that she would take my laptop and phone every time she found my room messy. Well, I guess it helped. I had no choice then I got really good at getting my place sparkling.", "parentDivorced"],
    teenage5: ["teenage5", 30, "I was totally into horse riding in school, started when I was twelve... or thirteen? Can't remember now. Anyway, my parents even thought about entering me into competitions and stuff but then my brother fell ill and you know all the stuff for equestrian sports cost a ton and we already had a loan for a house so... I still like to ride from time to time actually.", "brotherYounger"],
    teenage6: ["teenage6", 20, "My mom left dad when I was fourteen and went to one of that hucow camps... dormitories... I forget how those things are called officially, to be honest. Well, the whole family was shocked and dad actually never got over it. He did his best to raise me though and also found a new wife. They live not far from here actually, just about three hours from the valley. I tried to find any traces of my mom but she, like, disappeared. And she never tried to contact me since she left us so I guess... actually I don't know, I mean, I hope she is happy now.", "stepParent"],
    teenage7: ["teenage7", 50, `I had my teenage angst when I was fourteen. Well, I got my lucky break when I joined the one percent bikers gang. Being a modern techno-nomad was my enormous source of pride. We danced on thin ice and had swag! Two years of freedom went out as a flash. Later our chief had suddenly married and left the gang, and the second-in-command went to jail. I returned home and had a good ticking off from my relatives. This is a typical ending of most of adventures, right?`, "none"],
    teenage8: ["teenage8", 50, `My teen ages? Ha! I hadn’t even realized that I had teen ages. Yesterday I was a carefree kid, today I am a responsible adult. This a story of my childhood. My baby sister Betty was born when I was thirteen, and I had to be her babysitter as well as my parents. Nobody took my age into account, I mean. She had grown up enough when I was twenty. Then I had joined the US army, and the sergeant blasted the leftovers of the teen ages out of me.  `, "sisterYounger"],
    teenage9: ["teenage9", 50, `It was not the happiest time of my life. But it was good. My parents worked from morning till night to pay for my education, and they managed to give me a good start. I was a low key geek, actually. I did not even fall in love. Eh… once I had tried, but it was an epic fail. On the contrary, the teenage love madness did not interfere with my education. Today I see it was indeed for good.`, "bachelor"],
    teenage10: ["teenage10", 50, `It was a funny time of funny people. I met my first love when it hit me by bike. She had hit me, then I hit her, and three adults were barely enough to break up the fight. We sat in the waiting room for three hours, waiting for the trauma surgeon and chatting about everything. And we lose sight of the rest of the world. When the surgeon had finally come back and found us kissing, he was struggling with a decision whether he should laugh or resent. Finally, he did both. `, "exSpouse"],
    teenage11: ["teenage11", 50, `I was a very typical teenager, to tell the truth. Egoistic, unstable, taking not much care of hygiene and with a total mess in my room. Maybe because of that my younger brother was the total opposite. Tiny tidy pretty neat bas… er, boy. Just joking. I love him anyway.`, "brotherYounger"],
    teenage12: ["teenage12", 50, `In my teenage, I was nothing like my classmates spending their time at parties and playing computer games. I was eager to go to college, but my family could never afford it. My only chance was to get a grant for my studies. So I had become the best in my grade, then of my year, and after at the entire school. I didn’t have many friends, as you may guess.`, "college"],
    teenage13: ["teenage13", 50, `Oh, I was so radical. No was definitely no and yes was yes with no shades. My history teacher used to call me Maki meaning Machiavelli, but I was not so educated to catch that. I thought he called me a sort of sushi. I still hate sushi by the way.`, "none"],
    teenage14: ["teenage14", 50, `Well, I was not popular. I didn’t play any sports; I was not nice, smart, or rich. But everything changed when me and my best friend had founded a music band. Good news: I DID become popular and found a first love. Bad news: I understood how insincere people are.`, "none"],

  },
  familyGen: {
    familyGen1: ["familyGen1", 70, "We have a big friendly family. Maybe even too big with all these aunts and uncles and such. I have tons of relatives and I grew really sick of most of them. All these family gatherings were getting old so I honestly can't stand them anymore. They're not bad people, just a bit too noisy.", "none"],
    familyGen2: ["familyGen2", 100, "Well, I can't really say my family is something I'm really fond of. Well, when your parent is an alcoholic it affects everything and I am just glad I am living on my own now. I still keep in touch but it is mostly calling from time to time and sending Christmas cards.", "none"],
    familyGen3: ["familyGen3", 100, "It is just like most families, I guess. My grandad is a really cool guy, he engineered those things for satellites and stuff. He is pretty old yet but still tinkering with some stuff in the garage, once he even set it on fire accidentally, hah. You can imagine how furious my parents were, the house was just painted a week before that.", "none"],
    familyGen4: ["familyGen4", 80, "Oh, I like family gatherings, we usually get together every year and have a barbeque and such things. It is something that bonds us together because most of the family lives on the west coast and my uncle, auntie and their children are in SoCal. So it is always a big day when we all get together. Maybe I should invite them all here one day?", "none"],
    familyGen5: ["familyGen5", 60, "Hah, I just remembered one funny thing that happened. Chuck, my younger brother once got his new girlfriend to meet our parents and well, she was a punk, like totally on style, black boots, leather, tattoos, piercing, you got it. It was the most awkward scene ever because our family is like proper Christians and you can imagine how bad that dinner was.", "brotherYounger"],
    familyGen6: ["familyGen6", 100, "Well, after my parents divorced, it got not that happy at all but I guess there are much harder stories than mine actually. I always try to look on the bright side of life, you know. So maybe it was for the better after all.", "parentDivorced"],
    familyGen7: ["familyGen7", 50, `Twenty-two years ago, our family lived in a small Texas ranch. My father was a cowboy there. No, no, he was not like that old nuts to crack who are the heroes of the silly western movies. Just a small, grim, and tired man, smelling of hay and manure. But he loved me, and I loved him. He was killed. He had the bad luck when he accidentally met the Mexican drug smugglers at the riverbank. They decided to leave no withnesses. After his death, my mother moved to the eastern states, with me, of course.`, "dadDead"],
    familyGen8: ["familyGen8", 50, `My parents are not officially divorced, but they live separately, hating and blaming each other. And they both blame me. My mother cannot forgive me since I don’t share her opinion that my father is an evil incarnate. My father practically disowned me because I dared to be more educated than him, and refused to eat humble pie. Well, he was muttering about the respect to the elders and ungrateful children, but I knew the subtext.`, "bachelor"],
    familyGen9: ["familyGen9", 50, `I have no connection with my stubborn family. Thank goodness they live at the other end of the world and cannot do their best to make my life miserable. When I got a chance to immigrate, I did not miss a boat and was glad to say farewell to them. Eh... I haven’t mentioned before that I am an immigrate. I hope it doesn’t bother you.`, "none"],
    familyGen10: ["familyGen10", 50, `My parents live with my sister and her husband nursing their six children. I live separately here and help them out, giving the money to them. I am ashamed to admit that I visit their house too seldom. Of course, my nephews are pretty smart and cute kids, but sometimes too loud for my worn ears. Maybe I should buy earplugs to endure them a bit longer.`, "sister"],
    familyGen11: ["familyGen11", 50, `We are an academic family. Both my parents and I used to work at the university before moving here. And I was the youngest of my family who got a doctor’s degree! Our house was full of books. Books everywhere - on the dining table, on sofas, even on the floor. I was surrounded by books rather than by people, and that made me happy.`, "doctor"],
    familyGen12: ["familyGen12", 50, `My family is not big, but we still appear to be the closest people to one another. We spend every weekend doing something together. Picnics, barbecue, baseball. Common things. We love to go to the cinema on Sunday mornings. We usually watch one of those discounted family comedies with a simple plot and definite happy-ends.`, "none"],
    familyGen13: ["familyGen13", 50, `Tell you something about my family? It’s nearly nothing to tell, I guess. My mother had gone and… Speak well of the dead, people say. I’m a completely different person now than I used to be. I live in the present day. At the present day, there is myself here trying to start from the beginning.`, "momDead"],
    familyGen14: ["familyGen14", 50, `There was a big family, a big cozy house and a big garden around. We all used to live together: grandparents, parents, and children, even married ones. There was enough room for all of us. I used to spend joyful times with my cousins, and sometimes with uncles or aunts of the close age.`, "none"],

  },
  familyPar: {
    familyPar1: ["familyPar1", 100, "Well I have a stepparent, did I ever mention this? I can't remember. Anyway, we get along pretty well and although I can't say we are the best family it is not that bad after all. I call my parents often and they seem happy together so I am happy with this too.", "stepParent"],
    familyPar2: ["familyPar2", 20, "There is still a thing I rarely speak about, so maybe you will be one of like three or four people who know this. When mom died I was upset but I still surprised that I was not that upset. I mean, it was sad and all but I recovered pretty quickly. Maybe we just had not that strong connection after all.", "momDead"],
    familyPar3: ["familyPar3", 70, "I have a good nice family, like most others I guess. We have arguments from time to time like any other family but we're close and care about each other. They helped me a lot when I had my downfalls and I appreciate it a lot.", "none"],
    familyPar4: ["familyPar4", 50, "Family is everything for me, I can't imagine having no relatives like you, I mean, I am sorry, I was not willing to offend you in any way. It is just so weird for me, I spend a bunch of time with relatives and would be super stressed without them.", "none"],
    familyPar5: ["familyPar5", 50, "Well, I don't like to talk a lot about my family actually. I have no connection with them, we are totally different people now and I don't even know what I am supposed to talk about when we meet.", "none"],
    familyPar6: ["familyPar6", 50, "My family tried to move here to Appletree but the process is really long. There are some complications with the Institute, it seems they want to keep the city closed for everyone except their employees. That is pretty much despotic I must say. Anyway, I am sure we will push them eventually.", "none"],
    familyPar7: ["familyPar7", 50, `My father is tied to my mother’s apron-string, but he likes it. He never had ambitions and always had a head in clouds. I know that mommy loves him but considers him a big baby sometimes.`, "none"],
    familyPar8: ["familyPar8", 50, `My parents are as different as ice and fire. Dad is ice. He usually is cool as a cucumber. He likes the pure logic and despise emotions. Mommy is fire. She is always full of beans or maybe has ants in her pants. She’s an emotional bomb. The friends of our family wonder how they had not annihilate each other when they first met. But they are married for twenty years and still alive and happy.`, "none"],
    familyPar9: ["familyPar9", 50, `My parents divorced when I was a schoolboy. Dad was a fireman, and one day the fire gained the upper hand. He had barely survived, but his face remained scorched. He had become ugly as a sin, and mommy could not take it. She was maybe ashamed but left us. Yes, I decided to stay with dad. Eh... May I ask you to find a less melancholy topic to chat about? `, "parentDivorced"],
    familyPar10: ["familyPar10", 50, `In a nutshell, I am an orphan. I don’t remember my father because he had been hit by a car in two months after my birth. My mother took his death as a bolt out of the blue and went mad. She had tried to suicide, but they stopped her and hospitalized to the charity mental hospital. As far as I know, she is still there. I was raised by the uncle, father’s brother. One day I had visited my mother in the hospital and saw a couch potato. Nothing stirred at me.`, "dadDead"],
    familyPar11: ["familyPar11", 50, `I don’t remember them. My real parents. No, incorrect. I don’t remember my biological parents, but the real ones are my stepparents. We are a pretty normal family. I love them. They had told me that at the age of six. At first, I tried to imagine what my other parents were like. I even imagined I would seek and find them like a real detective. Funny thing, I never even tried to.`, "stepParent"],
    familyPar12: ["familyPar12", 50, `My parents are a pretty stable couple. To say more, they still love each other so romantically that I really don’t know for what reason they gave birth to myself. They are so happy spending time of their own, hah! They are replaying their wedding ceremony each year in a new way, updating their vows. Well, I’m happy for them anyway.`, "none"],
    familyPar13: ["familyPar13", 50, `My parents? They are my best friends, you know. The thing is they are young. I was born when they both were sixteen. High school. And what d’you think? A divorce? No way! Sure, they had difficult times when growing me up, trying to study and work at the same time. On the opposite, now they’re catching up with parties, cool music and all sort of games.`, "none"],
    familyPar14: ["familyPar14", 50, `They are good simple people, my mom and dad. A bit too traditional, I guess. I mean, old-fashioned. Well, most people will say this about their parents. And, for sure, our children will say the same about us one day, if not saying already. It doesn’t break me from loving them and being grateful for my sweet childhood.`, "none"],

  },
  familySib: {
    familySib1: ["familySib1", 100, "Jeremy, my brother, is in the navy now, all the family is proud of him. He even got some medal a couple of years ago. He rarely comes to the states with all these neverending conflicts going on here and there across the globe.", "brother"],
    familySib2: ["familySib2", 50, "My brother, Antony, is a nice guy but he is just a bit... odd. He is really obsessed with some nerd stuff like UFO hunting and conspiracy. He has a shed filled with some really weird stuff. Last time we met he tried to prove to me that Thornton institute was breeding beasts with tentacle-like arms and was keeping them in the underground facilities. That was pretty hilarious to hear and I just let him believe this nonsense if he likes it.", "brother"],
    familySib3: ["familySib3", 20, "Well I have a brother, he... I am a bit ashamed to admit it but he relocated to San-Fran and now working as a stripper, he is a good guy but we are just really different. Well anyway, if it is the thing which makes him happy I am okay with it.", "brother"],
    familySib4: ["familySib4", 100, "My sis is such a disappointment right now, she dropped out from college and we actually did not receive any news from her for over a year now. She started taking drugs in high school, Zone and Satyr and I guess she now hooked up on other too. Parents tried to send her to clinics and stuff but it did not help much.", "sister"],
    familySib5: ["familySib5", 100, "Sister works for some tech company on the east coast, I don't completely get what it is all about but sounds like some genetical researches or something. She is a big boss there as far as I know.", "sister"],
    familySib6: ["familySib6", 100, "Well, my sis is living not far away from here actually, she is married and have three kids, pretty happy family she has there and I am happy for them actually. We meet from time to time, it is nice to spend some time with them.", "sister"],
    familySib7: ["familySib7", 50, `I have no brothers or sisters, but I have many cousins. Our family is odd, you will see. Our grandfather had seven sons. Six of them had one child each. We lived in a large house, having enough space for seven families. Our brotherhood of the cousins, its plays and pranks, are my best childhood memories. We even had a hymn song! How was it? “Hey, cousins! It’s your motto, the right time comes to us!” We sang it together to my guitar.`, "none"],
    familySib8: ["familySib8", 50, `I had a stepbrother. He was the son of my step-parents. We lived in their house after they adopted me, and he was a nightmare and an evil incarnate for me. He was a spoiled child allowed to do anything he wanted. He knew this and bulled me every fucking day. When I tried to resist, he ran to his mother and cried, and I always became guilty. When he had been hit by a truck, I was almost glad.`, "stepParent"],
    familySib9: ["familySib9", 50, `My elder brother was a natural nerd in childhood. From day to day, he was reading books, doing school homework, or even writing the stupid poetry. The boy of ten years, <<ↂ.pc.main.name>>! You get it, he was literally asked for pranks and mockery, and I provided them to him in large amounts. But one day, he got his revenge… oh, no, no, don’t ask me to share details, please! Let’s find another fat to chew.`, "brother"],
    familySib10: ["familySib10", 50, `I was a natural nerd in teen ages. It is hard to believe, I know. The only thing I liked was reading books and writing naive lyrical poetry. My younger sister was an ordinary child and sometimes tried to shake me up. Well, she succeeded in annoying me instead of changing. One day I had avenged pranking and mockery…. No, I wouldn’t like to continue the story, because I am still a bit ashamed for it. I hope Jenny has forgiven me.`, "sisterYounger"],
    familySib11: ["familySib11", 50, `I was the only child in the family. Of course, I wanted to have an elder brother to protect me or a sibling of my age to play with. As for the younger ones… no. I didn’t want to be the very elder sibling to keep an eye on a little thing. So, that’s not bad that I have no siblings at all.`, "none"],
    familySib12: ["familySib12", 50, `I have a brother. He’s five years younger but, frankly, is rather more successful than me. From the early childhood he was always so serious. He was never running, sparring or brawling, not even playing noisy games. Should I say that they invited him to Appletree one of the first?`, "brotherYounger"],
    familySib13: ["familySib13", 50, `I used to have a sister. We were not very close. She had completely different hobbies. Let’s say more, she had a different interest in life. Growing older, we became further and further from one another. We never argued, no! Now we are exchanging postcards on Christmas, and that’s it.`, "sister"],
    familySib14: ["familySib14", 50, `My brother is a happy family guy. He has a regular job and a good regular family. His life is healthy, wealthy, and wise, as they say. Sometimes I wonder if he can ever be curious? Frustrated? Scared? He seems too normal, you know. Tastes differ, but it’s too monotonous for me.`, "brother"],

  },
  college: {
    college1: ["college1", 100, "I liked college, it was cool, all the parties, friends, we even made a band and actually had two gigs at local bar! It was pretty sad to leave all this for this pesky boring adult life. Maybe I need to buy a guitar again? Do we have a guitar store in the city?", "college"],
    college2: ["college2", 100, `You never going to believe it but I was like a total nerd in the college! I had the best grades, spent all my time in the library and such. Somehow I still had some "cool" friends and they slowly adapted me to the real world so got more of a living person and less of a bookworm. All this taking me to the parties and stuff worked, after all, I guess, hehe.`, "college"],
    college3: ["college2", 100, `I had a lot of friends, it was happy times for me. At one point, I was so into parties and stuff my grades were in pretty bad shape and I was like this close to getting my ass out of the college. So yeah, last two years I was studying like a good student, attended all the classes and stuff. It would be super stupid to take this loan for nothing after all.`, "college"],
    college4: ["college4", 100, `I hated that college sooo much! I just can't describe how boring it was, and I had no actual friends there, my neighbor was a jerk and we had arguments all the time. I was really happy when it finally ended.`, "college"],
    college5: ["college5", 30, `Nothing special, sorry. Just went there, studied some thingies, got my diploma, end of the story. Well, I had some funny moments, we broke a window in the professor's house one night. We were drunk and decided that it was a good idea. He called the police but did not saw our faces so he had nothing against us. Still, I guess he suspected us until the end. He was a jerk anyway, I don't feel any remorse for what we did.`, "college"],
    college6: ["college6", 100, `Ah, college. Well, I was not that good and could barely save my ass from being thrown out from the damn place. I guess it was just not for me after all. I don't say I am stupid, just the system is imperfect, they teach things in the most ineffective way in my opinion. I just couldn't get my head around it.`, "college"],
    college7: ["college7", 50, `I may tell you about our Rite of Passage. The freshmen are candidates to join the college community. They have to pass a humiliating trial for the elder students amusement. The freshmen have to take all their clothes off and to jump like the toads crying "Croak! Croak!"  Then they have to swallow a dried fly. Frankly, it is a sort of bullying which became a tradition a long time ago. But our college was ready to revolt when the provost had tried to forbid the Rite!`, "college"],
    college8: ["college8", 50, `It was the old fashioned college simulating the Oxford or, maybe, Harvard. Of course, it was not so famous or so expensive. And I afraid that the professors were much more ignorant than the ones in Oxford. They knew well how to instill discipline to us, but they paid attention to it much oftener than to the knowledge transfer. However, such experience helped many of us to find the place in the army or the police.`, "college"],
    college9: ["college9", 50, `It was a good time, but too short. I had been out of the control of my family and was walking on a wild side. Of course, I was going neither to attend lectures nor to pass tests. I lived on the campus, boozed, smoked weed, had many affairs, and was completely satisfied with my life. Unfortunately, the college provost did not take it kindly. He kicked me out after the winter semester ended.`, "college"],
    college10: ["college10", 50, `The college was boring. There are better ways to kill time. It was not worth spending years on it. Actually, I don’t think much of the higher education. It is useless and does not deserve our attention. Let’s change the subject, okay?`, "college"],
    college11: ["college11", 0, `Oh, no, I didn't go to college.`, "none"],
    college12: ["college12", 50, `Starting from my teenage, I was dreaming of going to a college. I imagined how cool it would be! All those activities, interesting studies, friends, parties, campus… All as we watch on TV shows. To say the reality was a disappointment is to say nothing. It seemed to be too far from my chosen specialty. Too boring. Too complicated. But soon I got used to it and even enjoyed my college years.`, "college"],
    college13: ["college13", 50, `I liked my college days. I was popular and used to have many friends. We spent a cool time, hah. Recently we settled a college meeting. Everyone was so old! But… Some of those college mates of mine have told me they secretly hated me those times. I still wonder why.`, "college"],
    college14: ["college14", 50, `Many people say college is definitely not about studies. I agree. It is about socialization. It’s a school of life, a positive version of it. You learn how to communicate and how to take responsibility. You realize what consequences your actions have. You understand there are no parents around to rely on. You check and find out what type of person you are.`, "college"],
    college15: ["college15", 50, `There was something special about those times at the college. It was an amazing feeling of freshness and freedom. I had already realized by then that my college years were the best ones of my entire life. I still recall my college mates warmly, and many of them are good friends of mine.`, "college"],

},
  job: {
    job1: ["job1", 100, "Well, I’m a <<print aw.npc[$storyTellerId].background.job>>. Not the best job in the world I guess but certainly not the worst either. And I got a solid grasp on it recently so it doesn’t feel as hard as it was at first. Gosh, I remember how stressful it was in my first month! Anyway, I hope to get a promotion this year, it seems my boss likes me. It’d be really nice to get more coins to be honest. ", "none"],
    job2: ["job2", 30, `Hey, honey, don't ask. I hate this fucking waste of my lifetime. My boss is an asshole, my colleagues are stupid jerks, my friends laugh at me because of this job. I have to work ten hours a day and get paid peanuts. Have you ever heard the word "wage-slave"? It's me. I sold my soul for a couple of coins. You don't understand why I am still a <<print aw[$storyTellerId].background.job>>, right? God save you to understand, <<= ↂ.pc.main.name>>. `, "none"],
    job3: ["job3", 30, "Zero cool! I could never imagine that I am a <<print aw.npc[$storyTellerId].background.job>>! This is the job of my fancy dreams! Even if they would pay me half of my money and I would have to work two times harder than today, it will be the best job in the world! I am hooked on it! Be sure, mate... Er... I see that I am not convincing enough to tell you about my job. But please don't tell it to my big ones, I beg you! They will fire me if they know that I cannot get a screw loose telling this fucking trash. ", "none"],
    job4: ["job4", 30, "You know, <<print ↂ.pc.main.name>>, this is not the best question you could ask me. You should better say 'how' instead of 'where'. The answer would be much more exact. People suggest me to be a <<print aw.npc[$storyTellerId].background.job>>, but actually, I am a gofer. Do you know what it means? It means that I have to do anything that they want me to do, do it anytime and anywhere. And of course I am getting paid as a <<print aw.npc[$storyTellerId].background.job>> and not a cent more. Do I like my job? Be sure, I even love it, Bob's your uncle!", "none"],
    job5: ["job5", 30, "Do you really want to know? Well, you may believe that I am a <<print aw.npc[$storyTellerId].background.job>>, are you satisfied? It is the best choice to believe it, honey. You are on thin ice asking such questions. Have I got your ass in a sling? I suggest yes. Fine. Possibly. Or I am a fucking nut having a bad sense of humor, you may believe this instead.", "none"],
    job6: ["job6", 30, "I'm a <<print aw.npc[$storyTellerId].background.job>>. It is simple, isn't it? Every day except Sundays I wake up, drink my cup of coffee, bike to the office, spend a couple of hours pretending to work, return home and fall asleep. This cycle will repeat the next day and so on. Many people in this town will tell you the same, lad. You look like a smart one who doesn't have to ask stupid questions getting common answers. Then don't waste your time, call it a day!", "none"],
    job7: ["job7", 30, "Sorry, friend, I signed up the contract demanding to say nothing about my job, tasks, salary, and my feelings on all this stuff. I am a <<print aw.npc[$storyTellerId].background.job>>, I have to say no more. You see, my job is not too hard and it is paid well enough. I'd not like to lose it just chewing the fat. Such questions are real pin in the neck.", "none"],
    job8: ["job8", 30, "I wanted to be a <<print aw.npc[$storyTellerId].background.job>> and I became a <<print aw.npc[$storyTellerId].background.job>>. The work is the heart of my morale and I do not speak ironically. I do be proud of my work and do all my best doing it. Frankly speaking, it actually is something like a motto in my life. When I die and meet that guy at Paradise, I will tell him: you asked me to eat my bread with sweat, and this was the tastiest meal in all my life, thank you!", "none"],
    job9: ["job9", 30, "I have a good job. Good enough for me, my friends, and my old dad. I am a <<print aw.npc[$storyTellerId].background.job>>. My tasks are interesting, my colleagues are an effective and friendly team, my boss is smart and even honest with subjects. It is seldom, right? Also, my career expectation to promote will soon be satisfied. I certainly have enough money for my living and a few coins to spend them hanging out in the local pub. Sometimes I even feel happy.", "none"],
    job10: ["job10", 30, "Awesome, honey! Awesome and splendid! I am a <<print aw.npc[$storyTellerId].background.job>> and thanks goodness that I am! It really is the job of my dream! Each workday is a joy for me, I even refuse to rest at weekends because my job is a best chance to chill out! I wish you, honey, to find such work for yourself sometimes, and this will be your best luck and the chance to have a great blast every day!", "none"],
    job11: ["job11", 30, "I am a <<print aw.npc[$storyTellerId].background.job>> and I hate my job. Naturally. Starting from nine and finishing at six, then way home. Repeat it every day for many years and you’ll get what I mean. Seeing all those damn gloomy faces. The best thing about all this is that I know they all feel the same thing. All I can dream about is retirement so I could do what I really want. Hope not all jobs are like mine but it’s too late for me to change one.", "none"],
    job12: ["job12", 80, "It’s a huge part of my life. Let’s say this job made the person you are facing now. Before, I had nothing but trouble. Wealthlessness. Nearly poverty. I didn’t want to end up as many like me. People born without a silver spoon in their a… mouths. So I tried the offer and succeeded. It’s my lucky star, I say. I’m in for a huge time and I’ve never imagined any changes. Lucky me, right?", "none"],
    job13: ["job13", 80, "My job? Truly, it doesn’t really matter what you are doing when you’re doing it in a good company. Among friends, I mean. Friends support you in the darkest of times and you share the glory in the best ones. I can do hard and unpleasant work with a smile when I’m surrounded by my guys. I’ll keep working here even if I’m not paid for it at all. And I’m sure the others think the same.", "none"],
    job14: ["job14", 80, "It’s just a routine, isn’t it? You are doing your business and that’s the point. Means of earning money. Still, you may make it more or less comfortable. Follow deadlines, don’t break rules. Or break rules but nobody should mention it. Be nice with your colleagues and, for all good’s sake, never argue with your boss. Sounds like a good lifehack, huh.", "none"],
    job15: ["job15", 80, "I am a <<print aw.npc[$storyTellerId].background.job>> and and well, there are good and not very good things about my job. First, my boss is very bossy, if you know what I mean. Acting like he’s a king and the others should be happy to serve. But the doubtless merit is salary rate. Other companies of close fields of activity offer two-thirds of my wage at best. Thus, I cannot complain. So, let’s say if you have a good sense of humor and patience you’ll be earning good money.", "none"],
    job16: ["job16", 50, "Location is the main thing why I’ve chosen to be a <<print aw.npc[$storyTellerId].background.job>>. It’s not far from my home and I’m happy not to spend an hour getting there every morning as I did in my previous job. I can even have my lunch at home so it’s saved me money and my stomach. Time and health are two only noticeable values of the present time, that’s what I say. All the other are secondary things you can deal with.", "none"],
    job17: ["job17", 80, "I’m a newcomer and have just started to get used to my new job as a <<print aw.npc[$storyTellerId].background.job>>. Everything is so different! Not meaning the actual tasks I’m doing, not my responsibilities. I’m trying to say, there are so many slight nuances, dozens of unwritten rules and underwater rocks. No one will tell you everything, right? I’m still on my probation and all I want is not to make a fool of myself.", "none"],
    job18: ["job18", 80, "I like my job. At first, I was not very successful being a <<print aw.npc[$storyTellerId].background.job>>. I tried to manage everything by myself. Maybe I was too shy to ask for help. But soon my colleagues mentioned that and offered their assistance. That was quite a revelation for me. Asking for help is not a humiliation or shame and offering help is often selfless. Thanks to my colleagues which all are my good friends now.", "none"],
    job19: ["job19", 80, "I am a <<print aw.npc[$storyTellerId].background.job>>. It’s a good job. Well, let’s say every job is good and respectful, isn’t it? But there’s something special about it when you feel you’re doing something new. You open new horizons, reveal hidden things and by this means serve the society. You are really at your proper place when you bring good and useful things to people and leave a certain heritage behind. That’s what I say.", "none"],
  },
  moving: {
    moving1: ["moving1", 100, `Oh, that is a funny story about me moving here. I was just fired from my old place and went out with a cardboard box with my stuff to the parking. Well, my usual luck, the bottom of the box opened and all my stuff fall to the ground. My favorite cup was lost forever, I still miss it by the way. So, after I got all my stuff back I just sat there to, I don't know, cry for a bit I guess. And then I saw one of these Thornton billboards, you probably saw them too, tons of them were here and there advertising Appletree. "Your town. Our town" or something like that. Anyway, I just suddenly thought like "Screw it. I going to try it. Well, the rest is history, I applied, they accepted my CV and here I am.`, "none"],
    moving2: ["moving2", 80, "Well they send me an offer when I was getting my bachelor's degree. It was a pretty pleasant surprise to be invited actually. I didn't want to leave my place, I really liked the uni and wanted to stay for some science career but they insisted on sending me letter after letter until I finally gave up. And now I am here. Was it a good decision after all? No idea actually.", "bachelor"],
    moving3: ["moving3", 60, "After my mom passed away I actually found that there is not much that holds me on my place and just wanted to move somewhere to start from the scratch. So this brand new Appletree looked like a good option. It took about four months until they finally sent me an offer, I was 100% it was rejected already. Maybe this GLADyS robot decided that I worth something after all.", "momDead"],
    moving4: ["moving4", 80, "I was just transferred from their other office here when they start gathering all their corporate stuff in this valley. I did not want to move but you know them, they can be really convincing when they need it.", "none"],
    moving5: ["moving5", 80, "They sent me an offer and I left my old job without any doubts. Thornton is like the most desirable workplace in the whole country, just take a look, they built a whole city in just some years! Of course I wanted to work for them.", "none"],
    moving6: ["moving6", 80, "I already lost any hope for getting a job with this economical depression raging and this was the last place I decided to sent my CV before giving up and going to work in some fast food making burgers and such. I was really shocked when they answered me with an offer in just an hour and, well, I just packed my stuff and took a bus the next day. I didn't believe they really wanted to hire me until I got here, to be honest.", "none"],
    moving7: ["moving7", 50, `It is a brief story. I studied natural science in the college, and the recruiter from Thornton became interested in me. When I had graduated from college, he proposed me the challenging job, the high salary, and the relocation to Appletree. I had agreed. Piece of cake, right? The difficulties has begun later.`, "college"],
    moving8: ["moving8", 50, `I did not move at all. My family lived at Appletree from the beginning of the twentieth century. Well, that time here was just a toll road and a gas station. There also was a small sandwich cafe owned by my family. When the Appletree was built, Thornton bought our land and demolished the gas staion and the old cafe. The laboratory building of the Institute is now on that place.`, "none"],
    moving9: ["moving9", 50, `When I was seeking employment, I got offers from six companies. All of them proposed similar jobs and salaries. The only marked difference was the location. I tried to choose for two days. Finally, I had taken a dice from some board game and rolled it. I remember that the result was five, and it meant the Thornton Institute and Appletree. And I am here.`, "none"],
    moving10: ["moving10", 20, `One rainy day I sat in a pub with a mug of ale. I was a bit drunk when the recruiter came and sat opposite me. He said: "Do you want to have the greatest opportunity in your miserable life? Join the Thornton Institute! Sign up here and here, and you will have your purple patch!” I had signed the documents up and then noticed the small horns at the top of his head. I sold my soul to the devil. Yes, maybe this is a stupid joke. But what if I told you the metaphor of the truth?`, "none"],
    moving11: ["moving11", 50, `I intended to change my occupation. I try to do this every ten years after I got my doctor’s degree. For what reason, you would ask? I should progress as a scientist. Remaining the same nowadays is a step back. I needed to take a step forward. And I’ve made this step to Appletree.`, "doctor"],
    moving12: ["moving12", 50, `I often move. My psychologist says I’m in the period of searching for myself. She also told me not to settle down If I don’t truly feel sure. So I’ve made a long way and have changed several states. And it took me here to Appletree. And telling you the truth, mate, I gradually start feeling that this is it. My place.`, "none"],
    moving13: ["moving13", 50, `I’ve received an offer from Thornton right after I had got my bachelor’s degree in the university. That was rather weird, you know. Some specialists of my year got several offers, but that one was not among them. But I had the only one. That was curious, so I decided to try my fortune here. God knows where this will lead me to.`, "bachelor"],
    moving14: ["moving14", 50, `I… I had difficult times. Lost my job. I had to deposit my house just to make ends meet. That time I was ready to try any job I was still qualified for. And after searching a while I just found an offer in my email. There were not many options for me to make a choice, you know. So I’ve moved to Appletree.`, "none"],

  },
  marriage: {
    marriage1: ["marriage1", 80, "Oh, we met on one of those silly student parties and started dating, well, let's say, on the same evening, hehe. And then we got married in... after three or four months I guess. It was a small ceremony, only close friends. Even our parents did not come, they still are skeptical about us.", "married"],
    marriage2: ["marriage2", 100, "Let me remember... It was in the cafe, yeah. It was in July, a super warm day... Anyway, I just went to take coffee-to-go before work and just bump into the doors. Of course, all the coffee spilled on clothes, I was sorry, I gave my number because I wanted to pay the laundry and such and then it all went really smooth, heh.", "none"],
    marriage3: ["marriage3", 100, `Hmm... Well, we actually met each other in an online game, maybe you also played it? СoC 14? Well, anyway, we were in the same clan and started chatting and stuff. It was a big surprise to find out that we both are living in the same town and I just took my backpack, jumped in the car and we met in person. Then there was some long period we just hang on together, I guess for about a year or so, just like friends, nothing sinful hah. Well then it is just a story everybody tells, we started dating and married after some time together. Pretty boring story to be honest.`, "married"],
    marriage4: ["marriage4", 100, "Nothing special, we lived on the same street and went to the same school so we just kissed on our prom and bam, we are married. I was really shy then so I still don't know how I pulled this all off.", "married"],
    marriage5: ["marriage5", 100, "Oh, yeah. We met at the parking lot, I am not a perfect driver in the world and was even worse back then so I just parked our cars kinda parked into each other, hehe. Then we went out and yelled at each other for a whole ten minutes. I literally have no idea how this led to getting married but anyway, we divorced on our third year and I have zero regrets about it. I can yell on people alone pretty well, two of us is really too much of noise.", "exSpouse"],
    marriage6: ["marriage6", 100, "Well, it was my greatest mistake in the whole life. At first, it all looked cool and we had a great time together but after a year I just found that I was cucked and I really respect myself way too much to tolerate such things. So I just waved goodbye and left.", "exSpouse"],
    marriage7: ["marriage7", 50, `It is a funny story. Two years ago, my neighbor was hired by the Thornton Institute and laughed at me that I would never have such a high-paying job. Well, she used to mock me, and I was getting used to her pranks. But that day, it had suddenly hurt me, and I asked her to make a little bet. The point was that Thornton would soon offer me a salary higher than she had. If I had such an offer before the end of the quarter, she would sleep with me. She was careless enough to agree. Omitting the details… she was hot apparently. We got married in four months.`, "married"],
    marriage8: ["marriage8", 50, `You ask a hard question. Well, we have a marriage license and nurse two kids. But in recent years, my wife doesn’t want me at all. I can certainly make her sleep with me, and she agrees that it is my right, but I am not a rapist and take no pleasure of such copulation. So our last sex was two years ago, and we would not like to make the next attempt in this life. Now tell me, <<ↂ.pc.main.name>>, whether I am married or not. `,"married"],
    marriage9: ["marriage9", 50, `You are surprised a person my age isn't already married, aren't you? What world do you live in, honey? In modern days the marriage is more likely an anchor than a sail. I am too young to sign a whole life sentence up for myself!`, "none"],
    marriage10: ["marriage10", 50, `I was married five years ago. It had been a pretty good time until my husband’s betrayal. He said that he had found a new love and should say farewell to me. All his loving words turned out to be phony as a three-dollar bill. We have divorced, and I will never have the heart to love again. Something in me broke that day.`, "exSpouse"],
    marriage11: ["marriage11", 0, `Oh, nope, I am not married, free as a bird!`, "none"],
    marriage12: ["marriage12", 50, `A spouse? Oh, no, friend, this is definitely not for me. Well, I’m not a lonely thing, I have dates. Hah, who will tell the opposite? But really. Some say they are not ready for serious relationships or still not sure, but I’m pretty sure. I was not born for family bonds.`, "none"],
    marriage13: ["marriage13", 50, `Oh, what a nice question, darling. I got just married! It was two weeks ago, and I’m still so excited! I’m sure we are truly made for each other, you know. Marriages are made in heaven, and now I really believe in this.`, "married"],
    marriage14: ["marriage14", 50, `The two of us got dates and hang out several years before we came together. Meaning started to live together. And we both had a conscious approach to the marriage question. No rush. So we got married recently, well, after a long while. And you know what? Nothing changed.`, "married"],
    marriage15: ["marriage15", 50, `Well, I have a crush. We spend a good time together if you know what I mean. I’m sure about my feelings, but not sure about my crush’s. I want to have a family, but I even have no idea how to start a talk. What if I make an offer and get rejected? I’m not sure I can live this over.`, "none"],

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
  n1023 : {
    teenage : ["MyaOwenTeenage", 100, "I rarely talk about this... I... I am barren. Phew, that was not as hard as I suspected it will be. I got some heavy bacterial infection when I was 13 and it hit my hormonal functions. Like a lot. You can see that my breasts are pretty much non-existent and I can't have children. My parents and everybody else were supportive and such but when girls of my age started getting pregnant, having children... damn, at least they wore a bra! I guess this is the reason I became a genetic specialist, I hope maybe working with subjects in the Co-op will help me to find some cure for my condition.", "none"],
    job : ["MyaOwenJob", 100, "Yeah, so I am working in Farm Co-op as a lead medical specialist. I conduct tests, apply some gene vectors, we even perform some pretty serious research on fertility and lactation. For me this job is a love-hate relationship. I mean, I like my work but seeing these happy dumb cows with their udders popping a child or two every year when I am being denied all of this is some form of mental torture.", "none"],
  },
  n1014 : {
    teenage : ["HannaBowenTeenage", 100, "Well... It was a rough time. Parents were too busy drinking. When my dad wanted to show me he loves me he intentionally missed when throwing a bottle at me. And mom... gosh, I... I really must not say such things about my own mother but I hope the bitch will rot in hell.", "none"],
    college : ["HannaBowenCollege", 100, "Pff, what again? Of course I weren't in any bloody college. Do I look like I have a motherfucking silver spoon in my asshole?", "none"],
    moving : ["HannaBowenMoving", 100, "I was working at the fastfood until one of my friends proposed to move with him in this fancy new city Institute built. Well, long story short she is dead now after going full overdose of focus; she jumped of the bridge. And this is a bloody secret I just use her ID since that time because I have no job and they will kick me out of the town if they will catch me and know who am I.", "none"],
    job : ["HannaBowenJob", 100, "Well, I just resell <i>stuff</i> one important local guy sells. Drugs I mean. Yeah, I know, it is totally illegal. I really don't want to tell anything about this russian, he is a natural beast and it will be safer for you to stay as far as you can from him. There is a lot of shady stuff happening in the town, you better stay safe, <<ↂ.pc.main.name>>.", "none"],
  },
  n1027 : {
    job : ["RoberCraigJob", 100, "I am the head of one of the local Institute security branches here, in Appletree. I am not a big boss or something, more of a high-grade field agent. Sorry, I'd really wish to tell you more, but I am sure you understand, that I signed way too many non-disclosure agreements I can't tell you what exactly I do on my job.", "none"],
  },
};

// TODO n1018 n1020