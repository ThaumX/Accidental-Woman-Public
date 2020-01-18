/*
██████╗ ███████╗
██╔══██╗██╔════╝
██████╔╝███████╗
██╔═══╝ ╚════██║
██║     ███████║
╚═╝     ╚══════╝
*/

// ======= INTERFACE ========

interface setupProstitution {
  sceneGen: (npc: string, job: "oldProf" | "streetWalk", type: string) => twee;
  tips: (npc: string, johnTips: number, johnTipsChance: number) => twee;
  work: (place: string) => twee;
  pricesCheck: (place: string) => [boolean, twee];
  attrToCustomers: () => twee;
  appearance: () => number;
  appearanceWord: () => twee;
  skanky: () => boolean;
  skankyWord: () => twee;
  scenes: scene[];
  locations: {};
}

interface scene {
  name: string; // obvious
  ask: string; // a proposition line from the npc
  job: string[]; // in which type of whoring scene is usable e.g. ["oldProf", "streetWalk"]
  type: "striptease" | "oral" | "vaginal" | "anal" | "titjob" | "kinky" | "bareback"; // type of action for the system to know what is happening. Kinky category is for some weird ass things which doesn't fit any other cat.
  txt: string; // text of the event
  img: string; // some porn to show
  time: [number, number]; // minimum and maximum time the scene can take, will be a random between two numbers
  tip: number; // tip modifier, the value will be added to the final tip
  check: string[]; // stats check involved in the scene
  cums: boolean; // if the client can cum during the scene
  gate: string; // content gate info
}

// NAMESPACE

if (setup.prostitution == null) {
  setup.prostitution = {} as setupProstitution;
}

// ======= FUNCTIONS ========

setup.prostitution.sceneGen = function(npc: string, job: "oldProf" | "streetWalk", type: string): twee {
  aw.con.info(`setup.prostitution.sceneGen type: ${npc}, ${job}, ${type}`);
  if (aw.npc[npc] !== null) {
    if (aw.npc[npc].status.perversion > 50) {
      // here must go some more precise desire choosing for NPCs... someday.
    }
    let out = ``;
    let S;
    if (job === "oldProf") {
      State.active.variables.currentWork = "oldProf";
    } else if (job === "streetWalk") {
      State.active.variables.currentWork = "streetWalk";
    }
    if (type === "striptease" || type === "oral" || type === "vaginal" || type === "anal" || type === "titjob" || type === "kinky" || type === "bareback") {
      const list = [] as number[];
      for (let index = 0; index < setup.prostitution.scenes.length; index++) {
        if (setup.prostitution.scenes[index].job.includes(job) && setup.prostitution.scenes[index].type === type) {
          list.push(index);
        }
      }
      aw.con.info(`setup.prostitution.sceneGen list: ${list}`);
      if (list.length < 1) {
        aw.con.warn(`Error in setup.prostitution.sceneGen, no scenes have ${job} job parameter!`);
        return `Error in setup.prostitution.sceneGen, no scenes have ${job} job parameter!`;
      } else if (list.length === 1) {
        S = setup.prostitution.scenes[list[0]];
      } else {
        S = setup.prostitution.scenes[either(list)];
      }
      aw.con.info(`setup.prostitution.sceneGen list: ${S.name}, ${S.job[0]}`);
    } else {
      const list = [] as number[];
      for (let index = 0; index < setup.prostitution.scenes.length; index++) {
        if (setup.prostitution.scenes[index].job.includes(job)) {
          list.push(index);
        }
      }
      if (list.length < 1) {
        aw.con.warn(`Error in setup.prostitution.sceneGen, no scenes have ${job} job parameter!`);
        return `Error in setup.prostitution.sceneGen, no scenes have ${job} job parameter!`;
      } else if (list.length === 1) {
        S = setup.prostitution.scenes[list[0]];
      } else {
        S = setup.prostitution.scenes[either(list)];
      }
    }
    if (S.gate === "none") {
      out += `<p><center>[img[${S.img}]]</center></p><p><<= either("He grins.", "He smiles.", "He seems a bit nervious before finally asking.")>></p><p>@@.npc;So, <<= ↂ.flag.jobEvents.pimp.hookerName>>, now I want you to ${S.ask}.@@</p>${S.txt}`;
    } else if (State.active.variables.pref[S.gate]) {
      out += `<p><center>[img[${S.img}]]</center></p><p><<= either("He grins.", "He smiles.", "He seems a bit nervious before finally asking.")>></p><p>@@.npc;So, <<= ↂ.flag.jobEvents.pimp.hookerName>>, now I want you to ${S.ask}.@@</p>${S.txt}`;
    } else {
      out += `<p><<= either("He grins.", "He smiles.", "He seems a bit nervious before finally asking.")>></p><p>@@.npc;So, <<= ↂ.flag.jobEvents.pimp.hookerName>>, now I want you to ${S.ask}.@@</p>${S.txt}`;
    }
    setup.time.add(random(S.time[0], S.time[1]));
    State.active.variables.johnTips += S.tip + (ↂ.flag.jobEvents.pimp.reputation * 2);
    if (S.check.length > 0) {
      setup.SCXfunc();
      for (let index = 0; index < S.check.length; index++) {
        setup.SCfunc(S.check[index], 15);
      }
    }
    for (let index = 0; index < S.check.length; index++) {
      if (State.active.variables.SCresult[index]) {
        State.active.variables.johnTips += random(3, 7);
        State.active.variables.johnTipsChance += random(3, 7);
        if (random(0, 5) === 5) {
          ↂ.flag.jobEvents.pimp.reputation++;
        }
      }
    }
    if (S.cums) {
      State.active.variables.JohnCame = true;
    }
    State.active.variables.johnTipsChance += random(5, 10);
    setup.npcInfo.level(npc, {bodyGeneral: true});
    setup.npcInfo.level(npc, {bodyJunk: true});
    setup.npcInfo.level(npc, {bodyDetail: 1});
    return out;
  } else {
    aw.con.warn(`Error in setup.prostitution.sceneGen, wrong npc id supplied! ${npc}`);
    return `Error in setup.prostitution.sceneGen, wrong npc id supplied! ${npc}`;
  }
};

setup.prostitution.tips = function(npc: string, johnTips: number, johnTipsChance: number): twee { // for oldProf
  if (aw.npc[npc] !== null) {
    let out = ``;
    if (johnTips == null || johnTipsChance == null) {
      aw.con.warn(`Error in setup.prostitution.tips, johnTips is ${johnTips} and johnTipsChance is ${johnTipsChance}. Setting them to 10.`);
      johnTips = 10;
      johnTipsChance = 10;
    }
    if (ↂ.pc.trait.materialist === 1) {
      johnTips += random(2, 5);
    }
    setup.SCXfunc();
    setup.SCfunc("PR", 15);
    if (State.active.variables.SCresult[1]) {
      johnTipsChance += random(10, 20);
    }
    setup.SCXfunc();
    setup.SCfunc("PR", 25);
    if (State.active.variables.SCresult[1]) {
      johnTipsChance += random(20, 40);
    }
    const scat = random(0, 100) - johnTipsChance;
    if (scat < 20) {
      out += `<p><<= either("He sighs satisfied.", "He grins and stretches completely satisfied", "The guy is obviously satisfied.")>></p><p><<= either("@@.npc;You are such a cutie you know? Here, take this as a little present@@", "@@.npc;Oh, this was nice. I guess you earned some tips, slut.@@", "@@.npc;You have skills for sure, here, take this.@@")>></p><p>He gives you @@.money;<<mon>>${johnTips}@@</p><p>@@.pc;Oh, thanks!@@</p>`;
      aw.cash(johnTips, "whoring");
    } else {
      out += `<p><<= either("He seems somewhat satisfied.", "He wipes his cock with a handkerchief.", "He suddenly remembers about your existence.")>></p><p><<= either("@@.npc;Oh, sure. Well, you are free to go now girl.@@", "@@.npc;Well, I guess you can go now, I already paid via that app.@@", "@@.npc;Nice job, now leave please, my wife is going to return soon.@@")>></p><p>@@.pc;Mm. Okay.@@</p>`;
    }
    return out;
  } else {
    aw.con.warn(`Error in setup.prostitution.tips, wrong npc id supplied! ${npc}`);
    return `Error in setup.prostitution.tips, wrong npc id supplied! ${npc}`;
  }
};

setup.prostitution.work = function(place: string): twee {
  if (setup.prostitution.locations[place] !== null) {
    const P = setup.prostitution.locations[place];
    let chance = (ↂ.pc.status.atr * 3) + (setup.prostitution.appearance() * 12) + P.popularity;
    if (setup.prostitution.skanky()) {
      chance -= 20;
    }
    if (ↂ.pc.status.atr < P.qualityCap) {
      chance -= 20;
    }
    if (P.policeRisk > random(0, 100) && !aw.chad.police) {
      setup.SCXfunc();
      setup.SCfunc("PR", 10);
      if (!State.active.variables.SCresult[1]) {
        return `<<timed 2s t8n>>@@.head3;Y@@ou wait...<<next>><<scenego "StreetWalkerCops">></p><</timed>>`;
      }
    }
    setup.SCXfunc();
    setup.SCfunc("SD", 10);
    if (State.active.variables.SCresult[1]) {
      chance += 20;
    }
    if (State.active.variables.time[0] < 11) {
      chance -= 15;
    } else if (State.active.variables.time[0] > 18) {
      chance += 15;
    }
    if (chance > random(0, 100)) {
      State.active.variables.StreetWalkerPlace = place;
      return `<<timed 2s t8n>>@@.head3;Y@@ou wait...<<next>><<scenego "StreetWalkerJohn">></p><</timed>>`;
    } else {
      return `<<timed 2s t8n>>@@.head3;Y@@ou wait...<<next>><<= either("for 15 minutes but it seems nobody is interested in you for now on.", "but after about quarter of hour you still got no clients.", "for a client but it doesn't bring any success for now.", "standing near the wall but no avail.", "and despite of your attempts to gather some attention from clients after 15 minutes you are still standing alone.", "trying to show off your <<pcBoobSize>> chest and <<pcAssSize>> ass and attract a 'date' but it seems nobody is interested now.")>><p><<button "Wait more">><<scenego "StreetWalkerWork">><</button>><<button "Leave">><<sceneclose>><<status 0>><<updatebar>><</button>></p><</timed>>`;
    }
  } else {
    aw.con.warn(`Error in setup.prostitution.work, place ${place} was not found in setup.prostitution.locations`);
    return "Sorry, it seems we have some bug, please, report it to the dev team!";
  }
};

setup.prostitution.pricesCheck = function(place: string): [boolean, twee] { // returns array of is 1. john will take you 2. his answer
  const P = setup.prostitution.locations[place];
  if (setup.prostitution.skanky()) {
    P.money -= 5;
  }
  const demand = either("striptease", "oral", "vaginal", "anal", "titjob", "kinky", "bareback"); // what john is wanting
  const price = { // standard prices john is ready to pay
    striptease: (10 + P.money),
    oral: (20 + P.money),
    vaginal: (35 + P.money),
    bareback: (75 + P.money),
    anal: (50 + P.money),
    titjob: (15 + P.money),
    kinky: (50 + P.money),
  };
  if (ↂ.flag.jobEvents.streetwalk.price[demand] === 0) { // you don't provide this service
    return [false, `<p><<print either("@@.npc;How much for some ${demand}?@@","@@.npc;I want some ${demand}, how much it will be?@@")>></p><p><<print either("@@.pc;Sorry, I won't do this, mister.@@","@@.pc;No, I don't do such thing.@@")>></p><p><<print either("@@.npc;Ugh, okay...@@","@@.npc;Such a shame.@@","@@.npc;Shit.@@")>></p><p><<print either("He closes the window and drive away.","He starts the engine and leaves.")>></p><p><<button "Wait more">><<scenego "StreetWalkerWork">><</button>><<button "Leave">><<updatebar>><<sceneclose>><<status 0>><</button>></p>`];
  }
  if (ↂ.flag.jobEvents.streetwalk.price[demand] > price[demand]) { // PC wants more that john was ready to pay
    setup.SCXfunc();
    let diff = (ↂ.flag.jobEvents.streetwalk.price[demand] - price[demand]) - Math.floor(ↂ.pc.status.atr / 4);
    if (diff > 30) {
      diff = 30;
    } else if (diff < 5) {
      diff = 5;
    }
    setup.SCfunc("SD", diff);
    if (State.active.variables.SCresult[1]) {
      State.active.variables.streetWalkDemand = demand;
      State.active.variables.streetWalkPay = ↂ.flag.jobEvents.streetwalk.price[demand];
      return [true, `<p><<print either("@@.npc;How much for some ${demand}?@@","@@.npc;I want some ${demand}, how much it will be?@@")>></p><p><<print either("@@.pc;Just ${ↂ.flag.jobEvents.streetwalk.price[demand]}, mister.@@","@@.pc;I'll take ${ↂ.flag.jobEvents.streetwalk.price[demand]} for this.@@")>></p><p><<print either("@@.npc;Well, this is more than I thought but you are just too sexy, okay, get in the car!@@","@@.npc;Ugh, this is too much... but you look so yummy... mhm, okay, deal, hop on.@@")>></p>`];
    } else {
      return [false, `<p><<print either("@@.npc;How much for some ${demand}?@@","@@.npc;I want some ${demand}, how much it will be?@@")>></p><p><<print either("@@.pc;Just ${ↂ.flag.jobEvents.streetwalk.price[demand]}, mister.@@","@@.pc;I'll take ${ↂ.flag.jobEvents.streetwalk.price[demand]} for this.@@")>></p><p><<print either("@@.npc;What? No way I am paying so much for this, get lost.@@","@@.npc;Nope, I won't pay som much, bye.@@","@@.npc;You better reconsider your prices, bitch.@@")>></p><p><<print either("He closes the window and drive away.","He starts the engine and leaves.")>></p><p><<button "Wait more">><<scenego "StreetWalkerWork">><</button>><<button "Leave">><<updatebar>><<sceneclose>><<status 0>><</button>></p>`];
    }
  } else { // john is okay with the price
    State.active.variables.streetWalkDemand = demand;
    State.active.variables.streetWalkPay = ↂ.flag.jobEvents.streetwalk.price[demand];
    return [true, `<p><<print either("@@.npc;How much for some ${demand}?@@","@@.npc;I want some ${demand}, how much it will be?@@")>></p><p><<print either("@@.pc;Just ${ↂ.flag.jobEvents.streetwalk.price[demand]}, mister.@@","@@.pc;I'll take ${ↂ.flag.jobEvents.streetwalk.price[demand]} for this.@@")>></p><p><<print either("@@.npc;Okay, this is a fair price, get into the car.@@","@@.npc;Alright, deal, hop on.@@")>></p>`];
  }
};

setup.prostitution.attrToCustomers = function(): twee { // return attractiveness to customer for prostitution screen.
  const atr = ↂ.pc.status.atr;
  let output = "";
  if (atr < 3) {
    output += `@@.bad;Unattractive@@`;
  } else if (atr < 7) {
    output += `@@.ship;Acceptable@@`;
  } else if (atr < 12) {
    output += `@@.yellowgreen;Good@@`;
  } else {
    output += `@@.spring;Splendid@@`;
  }
  return output;
};

setup.prostitution.appearance = function(): number { // return appearance to customer for prostitution screen.
  let res = 0;
  if (setup.clothes.kinky) {
    res += 20;
  }
  if (setup.clothes.exposed.top) {
    res += 15;
  }
  if (setup.clothes.exposed.bottom) {
    res += 10;
  }
  res += (ↂ.pc.clothes.stats.sexy * 3);
  if (res < 13) {
    return 0;
  } else if (res < 25) {
    return 1;
  } else {
    return 2;
  }
};

setup.prostitution.appearanceWord = function(): twee { // returns word for whoring display
  if (setup.prostitution.appearance() === 0) {
    return `@@.bad;Not Obvious to Customers@@`;
  } else if (setup.prostitution.appearance() === 1) {
    return `@@.yellowgreen;Obvious to Customers@@`;
  } else if (setup.prostitution.appearance() === 2) {
    return `@@.spring;Very Obvious to Customers@@`;
  } else {
    return `Error in setup.prostitution.appearanceWord func!`;
  }
};

setup.prostitution.skanky = function(): boolean { // return appearance to customer for prostitution screen.
  if (ↂ.pc.status.atr < 6 && ↂ.pc.clothes.stats.sexy > 6) {
    return true;
  } else {
    return false;
  }
};

setup.prostitution.skankyWord = function(): twee { // return appearance to customer for prostitution screen.
  if (setup.prostitution.skanky()) {
    return `@@.bad;Skanky@@`;
  } else {
    return `@@.yellowgreen;Not skanky@@`;
  }
};

// DATA

setup.prostitution.scenes = [
  {
    name: "Lapdance",
    ask: "lapdance me baby",
    job: ["oldProf"],
    type: "striptease",
    txt: `<<arousal 1>><p>He opens the trunk of the car and sits on the edge of it. Getting close you turn your <<p ass.q>> butt to his face. Slowly lowering yourself on his knees you start rubbing his cock through the clothes.</p><p>@@.npc;Mhmm, turn around girl, let me squeeze these titties!@@</p><p>Following his order you turn around and he starts twisting your niplles and squeezing your <<p breasts.n>></p><<has masochist>><p>@@.mono;Oh, I like when he does it, my nipple hurts in such a nice way...@@</p><<or>><p>@@.mono;Damn, this bastard want to pull my nipples off or something? This hurts like a bitch!@@</p><</has>><p>With a moan you put your hands around him pushing your body to him and breathing hard into his ear.</p><p>@@.npc;Oh yeah, work that ass bitch, plese your daddy!@@</p><p>You continue to wiggle your butt on his crotch feeling his hard prick in his pants for about 10 minutes more until it looks like he had <<if $currentWork == "oldProf">><<link "enough of this teasing.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><<else>>enough of this teasing.<</if>></p>`,
    img: "IMG-WhoreLapdance1",
    time: [7, 18],
    tip: 3,
    check: ["SD"],
    cums: false,
    gate: "none",
  },
  {
    name: "Lapdance",
    ask: "lapdance me baby",
    job: ["streetWalk"],
    type: "striptease",
    txt: `<<arousal 1>><p>You push the john to the chair and turn your <<p ass.q>> butt to his face. Slowly lowering yourself on his knees you start rubbing his cock through the clothes.</p><p>@@.npc;Mhmm, turn around girl, let me squeeze these titties!@@</p><p>Following his order you turn around and he starts twisting your niplles and squeezing your <<p breasts.n>></p><<has masochist>><p>@@.mono;Oh, I like when he does it, my nipple hurts in such a nice way...@@</p><<or>><p>@@.mono;Damn, this bastard want to pull my nipples off or something? This hurts like a bitch!@@</p><</has>><p>With a moan you put your hands around him pushing your body to him and breathing hard into his ear.</p><p>@@.npc;Oh yeah, work that ass bitch, plese your daddy!@@</p><p>You continue to wiggle your butt on his crotch feeling his hard prick in his pants for about 10 minutes more until it looks like he had <<if $currentWork == "oldProf">><<link "enough of this teasing.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><<else>>enough of this teasing.<</if>></p>`,
    img: "IMG-WhoreLapdance2",
    time: [7, 18],
    tip: 3,
    check: ["SD"],
    cums: false,
    gate: "none",
  },
  {
    name: "Strip",
    ask: "strip for me",
    job: ["oldProf"],
    type: "striptease",
    txt: `<<has exhibition>><<arousal 2>><<or>><<arousal 1>><</has>><p>You nod and get ready to strip. He turns on some upbeat music and sits comfortably in a chair while you start dancing for him in a most suggestive way you are able. Turning you present your <<p ass.q>> butt leaning forward and wiggling it.</p><p>@@.npc;Yeah, slut, present your goods!@@</p><p>With a smile you slowly remove your <<= aw.clothes[ↂ.pc.clothes.keys.top].style>> and turn to him with your <<p breasts.n>><<if ↂ.pc.clothes.worn.bra === "normal">> covered by only your bra.<<else>>bare naked.<</if>></p>You proceed to dance along with music pleasuring the john with a good views on your body removing your <<if ↂ.pc.clothes.worn.bottom === "normal">><<= aw.clothes[ↂ.pc.clothes.keys.bottom].style>><<elseif ↂ.pc.clothes.worn.panties === "normal">><<= aw.clothes[ↂ.pc.clothes.keys.panties].style>><<else>>clothes<</if>> until you are totally naked in front of him. You can see a tent in his pants and it seems you did not that bad job at this striptease.<p><<if $currentWork == "oldProf">><<link "Did you like it, mister?">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>></p>`,
    img: "IMG-WhoreStrip1",
    time: [5, 13],
    tip: 4,
    check: ["SD", "DA"],
    cums: false,
    gate: "none",
  },
  {
    name: "Sucking",
    ask: "suck me",
    job: ["oldProf"],
    type: "oral",
    txt: `<<has oral>><<arousal 2>><<or>><<arousal 1>><</has>><<run setup.omni.new("cumMouth")>><<run setup.drug.eatDrug("cum", 10)>><p>The john sits down and gestures to his crotch before making a ‘hurry up’ motion.</p><p>@@.mono;I guess he wants me to do all the work then…@@</p><p>You kneel in front of him and place your hands on his thighs as lean your face close to the bulge in his pants. You use your chin to push against the tented cloth briefly, and bring your hands up his thighs to grasp the button at his waist. You push some more at random with your chin, simulating kisses through fabric, as you undo the button and pull down the zipper. You pull your head back slightly, and with a quick tug on his clothes his thick <<w cock.n>> springs free.</p><p>A pungent smell assaults your nose as the ripe member strains only inches from your face. You reflexively try to lean back to escape the intense smell, but to your surprise you find you only manage to move a couple inches before your head is held in place by the man’s hand behind your head.</p><p>The hand tugs your head forward until your face is stuck pushing the engorged cock toward the man’s belly.<p>@@.npc;Come on whore; I made sure this meat is good and ready for you, so get to work.@@</p><p>His command is punctuated by a dribble of precum running onto your eyelid.</p><p>With a job to do and no real choice anyway, you steel yourself and extend your tongue to start licking the base of the John’s <<w cock.n>>.</p>Feeling your compliance, he loosens his grip on your head and allows you to get to work. The taste isn’t much better than the smell, but you manage to force yourself to work through it.<p>@@.mono;I should charge extra for shit like this!@@</p><p>It doesn’t take long before you bring him to the edge of orgasm.</p><p>@@.mono;Finally, let’s get this over with!@@</p>You start to pick up the pace, planning on catching the load with your mouth to avoid a mess. The john doesn’t cooperate, however, yanking your head back at the last second in order to spray his load all over your face.<p>@@.pc;Fuck.@@</p><<if $currentWork == "oldProf">><p>You move back from his cock a bit and <<link "massage your sore jaw.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
    img: "IMG-WhoreOral1",
    time: [11, 23],
    tip: 6,
    check: ["OR"],
    cums: true,
    gate: "none",
  },
  {
    name: "Sucking",
    ask: "suck me",
    job: ["streetWalk"],
    type: "oral",
    txt: `<<has oral>><<arousal 2>><<or>><<arousal 1>><</has>><<run setup.omni.new("cumMouth")>><<run setup.drug.eatDrug("cum", 10)>><p>The john leans back on the driver's seat and gestures to his crotch before making a ‘hurry up’ motion.</p><p>@@.mono;I guess he wants me to do all the work then…@@</p><p>You kneel in front of him and place your hands on his thighs as lean your face close to the bulge in his pants. You use your chin to push against the tented cloth briefly, and bring your hands up his thighs to grasp the button at his waist. You push some more at random with your chin, simulating kisses through fabric, as you undo the button and pull down the zipper. You pull your head back slightly, and with a quick tug on his clothes his thick <<w cock.n>> springs free.</p><p>A pungent smell assaults your nose as the ripe member strains only inches from your face. You reflexively try to lean back to escape the intense smell, but to your surprise you find you only manage to move a couple inches before your head is held in place by the man’s hand behind your head.</p><p>The hand tugs your head forward until your face is stuck pushing the engorged cock toward the man’s belly.<p>@@.npc;Come on whore; I made sure this meat is good and ready for you, so get to work.@@</p><p>His command is punctuated by a dribble of precum running onto your eyelid.</p><p>With a job to do and no real choice anyway, you steel yourself and extend your tongue to start licking the base of the John’s <<w cock.n>>.</p>Feeling your compliance, he loosens his grip on your head and allows you to get to work. The taste isn’t much better than the smell, but you manage to force yourself to work through it.<p>@@.mono;I should charge extra for shit like this!@@</p><p>It doesn’t take long before you bring him to the edge of orgasm.<p>@@.mono;Finally, let’s get this over with!@@<.p>You start to pick up the pace, planning on catching the load with your mouth to avoid a mess. The john doesn’t cooperate, however, yanking your head back at the last second in order to spray his load all over your face.<p>@@.pc;Fuck.@@</p><<if $currentWork == "oldProf">><p>You move back from his cock a bit and <<link "massage your sore jaw.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
    img: "IMG-WhoreOral2",
    time: [11, 23],
    tip: 6,
    check: ["OR"],
    cums: true,
    gate: "none",
  },
  {
    name: "Fucking",
    ask: "open your legs girl",
    job: ["oldProf"],
    type: "vaginal",
    txt: `<<set ↂ.pc.body.pussy.virgin = false>><<eatdrug "sex" 10>><<arousal 1>>With <<has slut>>excitement<<or>>a little sigh<</has>> you turn around and lean yourself on the table. The john is almost panting while undressing your butt and dealing with his fly.<<has slut>><p>@@.pc;Oh yeah, fuck me, stud!@@</p><<orhas shame>><p>@@.mono;How did I ended like this, oh my god... This is so embarrassing...I am like a cheap whore now, earning money with my cunt...@@</p><</has>><p>He finally manages to undress you and put on a condom before entering you without any preparation.</p><<set ↂ.pc.status.health-= 1>><<has rape>><<arousal 1>><p>@@.mono;Oh yeah, take my little pussy by force! Oh, he is fucking me like he hates me... mmmhmm...@@</p><<orhas maso>><<arousal 1>><p>@@.mono;Oh, this hurts in such a good way...@@</p><<orhas sub>><<arousal 1>><p>@@.mono;I feel like a little obedient bitch, serving him with my hole...@@</p><<or>><p>@@.mono;Damned! This fucking hurts! Grrrr.@@</p><<stress 5 "Besty prostitution">><</has>><p>@@.npc;Oh yeah, bitch!@@</p><p>He fucks you in a constant pace, his hands holding your tights so your <<p breasts.n>> wiggle over the surface of the table with each thrust. You can feel his balls slapping your pubic bone each rhythmically, your <<p pussy.q>> <<p pussy.n>> stretch accepting john's <<n $oldProfClient cocklength.q>> member.</p><p>His movements become faster and he puts on hand on your shoulder ramming you with a full speed.</p><p>@@.npc;Oh yeah, Oh yeah! I aaammm...@@</p><p><<has easy>><<set _cummies = random(0,1)>><<if _cummies == 1>><<satisfy 4>><p>You feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>You get pretty close to orgasm but sadly, he cums faster than you leaving you unsatisfied.</p><</if>><<or>><<set _cummies = random(0,5)>><<has hard>><<set _cummies = random(0,10)>><<or>><</has>><<if _cummies == 5>><p>To your surprise you feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>Despite of some arousal from being fucked you are not able to cum before he does and pulls his cock out of your desperate hole.</p><</if>><</has>><<set _condomium = random(0,10)>><<if ↂ.pc.mutate.acid>><<set _condomium = random(0,6)>><</if>><<if _condomium == 6>><<eatdrug "cream" 10>><<run setup.condition.add({loc: "vagina", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<run ↂ.pc.fert.creampie("unknown", 50, "deep")>><<if random(1,10) === 1>><<run setup.omni.new("sstd_dripsA")>><</if>><p>@@.npc;Shit!@@</p><p>You turn around and see that his condom broken and all his cum is most probably deep inside in your pussy</p><p><<has pregnancy>>@@.mono;For some reason I don't feel so sad about this. In some sense I am even excited, maybe I get pregnant?@@<<or>>@@.mono;Oh damn... I really hope I won't catch anything from him. And gosh, I can get pregnant, shit, shit ,shit!@@<</has>></p><</if>><p><<if $currentWork == "oldProf">><<link "Put on your clothes.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>></p>`,
    img: "IMG-WhoreVaginal1",
    time: [6, 29],
    tip: 3,
    check: ["SX"],
    cums: true,
    gate: "none",
  },
  {
    name: "Fucking",
    ask: "open your legs girl",
    job: ["streetWalk"],
    type: "vaginal",
    txt: `<<set ↂ.pc.body.pussy.virgin = false>><<eatdrug "sex" 10>><<arousal 1>>With <<has slut>>excitement<<or>>a little sigh<</has>> you turn around and lean yourself on the hood of the car. The john is almost panting while undressing your butt and dealing with his fly.<<has slut>><p>@@.pc;Oh yeah, fuck me, stud!@@</p><<orhas shame>><p>@@.mono;How did I ended like this, oh my god... This is so embarrassing...I am like a cheap whore now, earning money with my cunt...@@</p><</has>><p>He finally manages to undress you and put on a condom before entering you without any preparation.</p><<set ↂ.pc.status.health-= 1>><<has rape>><<arousal 1>><p>@@.mono;Oh yeah, take my little pussy by force! Oh, he is fucking me like he hates me... mmmhmm...@@</p><<orhas maso>><<arousal 1>><p>@@.mono;Oh, this hurts in such a good way...@@</p><<orhas sub>><<arousal 1>><p>@@.mono;I feel like a little obedient bitch, serving him with my hole...@@</p><<or>><p>@@.mono;Damned! This fucking hurts! Grrrr.@@</p><<stress 5 "Besty prostitution">><</has>><p>@@.npc;Oh yeah, bitch!@@</p><p>He fucks you in a constant pace, his hands holding your tights so your <<p breasts.n>> wiggle over the surface of the table with each thrust. You can feel his balls slapping your pubic bone each rhythmically, your <<p pussy.q>> <<p pussy.n>> stretch accepting john's <<n $oldProfClient cocklength.q>> member.</p><p>His movements become faster and he puts on hand on your shoulder ramming you with a full speed.</p><p>@@.npc;Oh yeah, Oh yeah! I aaammm...@@</p><p><<has easy>><<set _cummies = random(0,1)>><<if _cummies == 1>><<satisfy 4>><p>You feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>You get pretty close to orgasm but sadly, he cums faster than you leaving you unsatisfied.</p><</if>><<or>><<set _cummies = random(0,5)>><<has hard>><<set _cummies = random(0,10)>><</has>><<if _cummies == 5>><p>To your surprise you feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>Despite of some arousal from being fucked you are not able to cum before he does and pulls his cock out of your desperate hole.</p><</if>><</has>><<set _condomium = random(0,10)>><<if ↂ.pc.mutate.acid>><<set _condomium = random(0,6)>><</if>><<if _condomium == 6>><<eatdrug "cream" 10>><<run setup.condition.add({loc: "vagina", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<run ↂ.pc.fert.creampie("unknown", 50, "deep")>><<if random(1,10) === 1>><<run setup.omni.new("sstd_dripsA")>><</if>><p>@@.npc;Shit!@@</p><p>You turn around and see that his condom broken and all his cum is most probably deep inside in your pussy</p><p><<has pregnancy>>@@.mono;For some reason I don't feel so sad about this. In some sense I am even excited, maybe I get pregnant?@@<<or>>@@.mono;Oh damn... I really hope I won't catch anything from him. And gosh, I can get pregnant, shit, shit ,shit!@@<</has>></p><</if>><p><<if $currentWork == "oldProf">><<link "Put on your clothes.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>></p>`,
    img: "IMG-WhoreVaginal2",
    time: [6, 29],
    tip: 3,
    check: ["SX"],
    cums: true,
    gate: "none",
  },
  {
    name: "Anal",
    ask: "let me enter this rear hole of yours",
    job: ["oldProf", "streetWalk"],
    type: "anal",
    txt: `<<set ↂ.pc.body.asshole.virgin = false>><<eatdrug "sex" 7>><<set _cockSize = random(1,3)>><<run ↂ.pc.body.asshole.insert(_cockSize)>><p>The john puts you on your back and rub his rigid member to your <<p anus.n>>.<p><<has anal>><p>@@.pc;Ride my butt like you mean it, cowboy!@@</p><<or>><p>@@.mono;Oh, I don't like anal at all, why am I ever doing this? I’m sure it’s gonna hurt like a bitch.@@<p><</has>><p>Spiting on the tip of his cock he presses it to your asshole, working his way inside with short thrusts. Finally, the head of his penis slides into your <<p anus.q>> butthole stretching your sphincter ring.</p><p>@@.pc;Mmmhhmm!!@@</p><<arousal 2>><p>@@.npc;Oh yeah!@@</p><p>Without any warm up he starts to fuck you balls-deep holding your hips. With each thrust you feel how his cock slides back and forth inside you and the pain from every sudden intrusion subsides replaced with arousal. It doesn't take long until he is ready to cum <<has easy>><<set _cumChance = random(35,50)>><<or>><<set _cumChance = random(0,50)>><</has>><<if _cumChance == 50>>but somehow you manage to cum at the same time as him without even touching yourself.<<satisfaction 21 "Anal orgasm from letting a customer fuck your ass">><<else>>leaving you aroused and unsatisfied.<</if>> His cum fills your rectum and a little bit of it comes out when he pulls his cock, and lets your used asshole rest.</p><<run setup.condition.add({loc: "asshole", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>>`,
    img: "IMG-WhoreAnal1",
    time: [11, 23],
    tip: 5,
    check: ["OR"],
    cums: true,
    gate: "none",
  },
  {
    name: "Bareback sex",
    ask: "fuck with me without a condom",
    job: ["streetWalk"],
    type: "bareback",
    txt: `<<set ↂ.pc.body.pussy.virgin = false>><<run ↂ.pc.fert.creampie("unknown", 50, "deep")>><<run setup.condition.add({loc: "vagina", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<eatdrug "sex" 15>><<eatdrug "cream" 15>><<arousal 1>><p><<has risky>>You can't help but anticipate the creampie<<or>>You feel nervous despite  the danger of getting pregnant or catching SSTD.<</has>></p><p>You lie him down and get onto him in the cowgirl position. Undressing, you present him your bare boobs and he starts fondling them with his hands.</p><p>@@.npc;Mmm, I like it!@@</p><p>Getting his cock free from his clothes you start rubbing your pussy on his member to get it hard and after a minute he is stiff as wood. You lift a bit and his dick get aligned with your pussy opening pressing into soft flesh.</p><p>@@.pc;Want some, mister?@@</p><p>@@.npc;Oh yeah, ride it bitch!@@</p><p>With a smile you slowly lower yourself on his cock feeling it stretch your innies.</p><p>@@.mono;There is no feeling like a bare throbbing cock in my pussy, I feel I could ride it for eternity...@@</p><p> Increasing the pace you ride him leaning over with your hands on his chest.The john starts thrusting rhythmically to penetrate you even deeper and you can swear you feel his head knocking into your uterus opening softly. Leaning back, faster and faster, you bounce on his cock while playing with your fun button while the guy enjoys the view.</p><p>@@.npc;Oh, I... am... gonna!..@@</p><p>You are almost on the edge too,  when his dick starts spurting his hot load deep into your wet pussy it got just too intense. With loud screaming you orgasm,  enjoying your job to the best.</p><p>You both slow down and you just sit  on his member panting heavily for some time while his cum slowly oozes outside before getting off him.</p><<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>>`,
    img: "IMG-WhoreAnal1",
    time: [11, 23],
    tip: 5,
    check: ["OR"],
    cums: true,
    gate: "none",
  },
  {
    name: "Titjob",
    ask: "do some tittyfuck for me",
    job: ["oldProf", "streetWalk"],
    type: "titjob",
    txt: `You free your tits and get to his hard cock. Spitting between your funbags you enwrap his member between and start massaging it moving your torso. He starts to fuck your midtit space himself in the rhythm biting his lip and panting.<p>@@.mono;Ugh, he could really use a bath, dammit.@@</p><p>While his dick slides up and down you try make the sluttiest face possible for him and smile cunningly. After a while he seems ready to burst, his thrusting speeds up and with a loud groans he starts shooting pearly white baby butter on your chest and face.<<run setup.condition.add({loc: "chest", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<run setup.condition.add({loc: "chest", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<if $currentWork == "oldProf">><p><<link "Lean back.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
    img: "IMG-WhoreTitfuck1",
    time: [11, 21],
    tip: 4,
    check: ["SX"],
    cums: true,
    gate: "none",
  },
  {
    name: "Pissing",
    ask: "be my urinal",
    job: ["oldProf", "streetWalk"],
    type: "kinky",
    txt: `<<gate "waterworks">><<run setup.condition.add({loc: "face", amt: 12, tgt: "pc", wet: 12, type: "piss"})>><p>You stand your your knees and john opens his fly.</p><<has water>><<arouse 2>><p>@@.mono;Oh yes, I really want him to shower me with his hot salty piss! Why am I so aroused with this idea?@@</p><<or>><<stress 5 "Besty prostitution">><<anger 1>>@@.mono;Shit, this is humiliating, now I am on my knees waiting for some complete stranger to piss on me like I am a urinal or something...@@<</has>><p>His cock is semi-erect and you can smell the odor of his manhood while he relax his pelvic with a aroused grin. His piss starts pouring and you close your eyes instinctively when the first spirt hits your face.</p><p>@@.npc;Open your mouth, sweetie, take it like a good girl!@@</p><p>The smell is <<has water>>amazing and<<or>>awful but<</has>> you follow the order, your mouth quickly fills with his urine, the taste is salty and soursweet. It overflows you and streams of warm piss flow down your neck and chest soaking your clothes while you struggle to breathe. Finally, it is over and you open your eyes cautiously to see the john shaking his member to get rid of last drops.</p><<has water>><p>You close your mouth still full of hot salty urine and looking him straight into eyes gulp it down.</p><p>@@npc;Shit, girl, you are into it! What a little filthy whore you are!@@</p><<or>><p>You spit the remains of piss from your mouth. The guy wipes his cock with your hairs and dress.</p><p>Soaking wet your stand up from your already sore knees.</p><</has>> <<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>><</gate>>`,
    img: "IMG-Piss1",
    time: [4, 12],
    tip: 8,
    check: ["SX"], // dunno lol
    cums: false,
    gate: "waterworks",
  },
  {
    name: "Bodywriting",
    ask: "to write some shit on you",
    job: ["oldProf", "streetWalk"],
    type: "kinky",
    txt: `<<gate "domsub">><p>John looks at you with lust taking a permanent marker.</p><p>@@.npc;Strip down slut, I want to write on this body of yours.@@</p><p>Feeling a bit weird you undress and stand before him buck nacked. With his hand on your shoulder he makes forces you on your knees and goes around you holding a marker in his hand. You feel the cold tip of the marker pressing on the surface of your skin and flinch a bit. The tip moves and letters become words. After a while he seems to be satisfied with the result and takes a step back.</p><p>@@.npc;Now, look at you, you look like a properly marked cheap whore now! Isn't it nice?@@</p><<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>><<set _bwPlace = either("face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina")>><<set _bwText = either("Dumb cunt", "Whore", "Cumdump", "Slut", "Fuck meat", "Fuck me", "Public use", "Abuse me", "Free whore", "Sex toy", "Degrade me", "Born to serve", "Cum depository", "Pig", "Cocksucker", "Use me", "Slave", "Hooker")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><<set _bwPlace = either("face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina")>><<set _bwText = either("Dumb cunt", "Whore", "Cumdump", "Slut", "Fuck meat", "Fuck me", "Public use", "Abuse me", "Free whore", "Sex toy", "Degrade me", "Born to serve", "Cum depository", "Pig", "Cocksucker", "Use me", "Slave", "Hooker")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><<set _bwPlace = either("face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina")>><<set _bwText = either("Dumb cunt", "Whore", "Cumdump", "Slut", "Fuck meat", "Fuck me", "Public use", "Abuse me", "Free whore", "Sex toy", "Degrade me", "Born to serve", "Cum depository", "Pig", "Cocksucker", "Use me", "Slave", "Hooker")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><<set _bwPlace = either("face", "pubic", "butt", "asshole", "vagina")>><<set _bwText = either("Public hole", "Free to use", "Worthless hole", "Slave's hole", "Fuck here")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><</gate>>`,
    img: "IMG-Bodywriting1",
    time: [12, 25],
    tip: 6,
    check: ["SX"], // dunno lol
    cums: false,
    gate: "domsub",
  },
];

setup.prostitution.locations = {
  rescorner: {
    name: "Residental Corner",
    popularity: 15, // just a simple measure of how much people are in the location so sums with chance to find the client
    money: 10, // how much clients are ready to pay
    policeRisk: 10,
    qualityCap: 5, // pc attractiveness must be higher or equal this or the chance to find the john gets down
    risk: 5, // risk of getting some psycho as a client
  },
  adultDistr: {
    name: "Adult district",
    popularity: 35,
    money: 25,
    policeRisk: 15,
    qualityCap: 10,
    risk: 8,
  },
  clubDistr: {
    name: "Club district",
    popularity: 25,
    money: 15,
    policeRisk: 20,
    qualityCap: 7,
    risk: 6,
  },
  bullseye: {
    name: "Bullseye",
    popularity: 10,
    money: 10,
    policeRisk: 5,
    qualityCap: 7,
    risk: 10,
  },
};
