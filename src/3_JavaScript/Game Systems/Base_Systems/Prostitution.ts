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
      ↂ.pc.status.energy.amt =- 1;
    }
    if (type === "striptease" || type === "oral" || type === "vaginal" || type === "anal" || type === "titjob" || type === "kinky" || type === "bareback") {
      // Anenn counter
      ↂ.flag.jobEvents[type] += 1;

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
          if (setup.prostitution.scenes[index].type === "vaginal") {
            if (ↂ.toys.parts.groin === false) {
              list.push(index);
            }
          } else {
            list.push(index);
          }
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
      out += `<p><center>[img[${S.img}]]</center></p><p><<= either("He grins.", "He smiles.", "He seems a bit nervous before finally asking.")>></p><p>@@.npc;So, now I want you to ${S.ask}.@@</p>${S.txt}`;
    } else if (State.active.variables.pref[S.gate]) {
      out += `<p><center>[img[${S.img}]]</center></p><p><<= either("He grins.", "He smiles.", "He seems a bit nervous before finally asking.")>></p><p>@@.npc;So, now I want you to ${S.ask}.@@</p>${S.txt}`;
    } else {
      out += `<p><<= either("He grins.", "He smiles.", "He seems a bit nervous before finally asking.")>></p><p>@@.npc;So, <<= ↂ.flag.jobEvents.pimp.hookerName>>, now I want you to ${S.ask}.@@</p>${S.txt}`;
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
    johnTips = setup.cashDiff(johnTips);
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
    if (ↂ.pc.status.energy.amt < 2) {
      return `@@.head3;Y@@ou feel too exhausted to work more. Whoring is a hard job and you have not enough energy for it right now.<br><<button "Leave">><<sceneclose>><<status 0>><<updatebar>><</button>>`;
    }
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
    if (setup.time.aftMidnight && (aw.time - setup.time.midnight) > 180) {
      return `<<f y>>ou wait around for 15 minutes, but the streets are pretty much deserted this late at night. You've hardly seen any activity at all, let alone a potential customer. @@.mono;I don't think I'll find a client this late... I might as well go home... I can always try again tomorrow.@@<br><center><<button "Leave">><<sceneclose>><<status 0>><<updatebar>><</button>></center>`;
    }
    if (chance > random(0, 100)) {
      State.active.variables.StreetWalkerPlace = place;
      return `<<timed 2s t8n>>@@.head3;Y@@ou wait...<<next>><<scenego "StreetWalkerJohn">></p><</timed>>`;
    } else {
      return `<<timed 2s t8n>>@@.head3;Y@@ou wait...<<next>><<= either("for 15 minutes but you haven't found an interested client yet.", "but after about quarter of hour you still haven't found a client.", "for a client but you don't have any success for now.", "standing near the wall but no avail.", "and despite of your attempts to gather some attention from clients after 15 minutes you are still standing alone.", "trying to show off your <<pcBoobSize>> chest and <<pcAssSize>> ass and attract a 'date' but it seems nobody is interested right now.")>><p><center><<button "Wait Again">><<scenego "StreetWalkerWork">><</button>><<button "Leave">><<sceneclose>><<status 0>><<updatebar>><</button>></center></p><</timed>>`;
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
  let sexToysBlock = false;
  if (demand === "vaginal" && ↂ.toys.parts.groin !== false) {
    sexToysBlock = true;
  }
  if (ↂ.flag.jobEvents.streetwalk.price[demand] === 0 || sexToysBlock) { // you don't provide this service
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
      State.active.variables.streetWalkPay = setup.cashDiff(ↂ.flag.jobEvents.streetwalk.price[demand]);
      return [true, `<p><<print either("@@.npc;How much for some ${demand}?@@","@@.npc;I want some ${demand}, how much it will be?@@")>></p><p><<print either("@@.pc;Just ${ↂ.flag.jobEvents.streetwalk.price[demand]}, mister.@@","@@.pc;I'll take ${ↂ.flag.jobEvents.streetwalk.price[demand]} for this.@@")>></p><p><<print either("@@.npc;Well, this is more than I thought but you are just too sexy, okay, get in the car!@@","@@.npc;Ugh, this is too much... but you look so yummy... mhm, okay, deal, hop on.@@")>></p>`];
    } else {
      return [false, `<p><<print either("@@.npc;How much for some ${demand}?@@","@@.npc;I want some ${demand}, how much it will be?@@")>></p><p><<print either("@@.pc;Just ${ↂ.flag.jobEvents.streetwalk.price[demand]}, mister.@@","@@.pc;I'll take ${ↂ.flag.jobEvents.streetwalk.price[demand]} for this.@@")>></p><p><<print either("@@.npc;What? No way I am paying so much for this, get lost.@@","@@.npc;Nope, I won't pay som much, bye.@@","@@.npc;You better reconsider your prices, bitch.@@")>></p><p><<print either("He closes the window and drive away.","He starts the engine and leaves.")>></p><p><<button "Wait more">><<scenego "StreetWalkerWork">><</button>><<button "Leave">><<updatebar>><<sceneclose>><<status 0>><</button>></p>`];
    }
  } else { // john is okay with the price
    State.active.variables.streetWalkDemand = demand;
    State.active.variables.streetWalkPay = setup.cashDiff(ↂ.flag.jobEvents.streetwalk.price[demand]);
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
    job: ["oldProf", "streetWalk"],
    type: "striptease",
    txt: `<<arousal 1>><p><<= either("Turning around you press","You get close to him and press")>> your <<p ass.q>> to John's crotch. <<= either("Arching", "Leaning forward")>>, you work your <<= either("rear","butt")>> up and down massaging his <<= either("soft noodle","already stiff wood","semi-hard cock")>>. @@.pc;<<= either("Do you like it, baby?","Do you want me, sugar?")>>@@ John behind you <<= either("groans with pleasure.","puts his arms on your waist.")>>@@.npc;<<= either("Mhmm","Fuck, yes, slut!")>>@@ Turning around you push him to make him sit down and start riding his crotch with your legs wide spread. <<= either("John bites his lip","He moans")>> with his face buried deep into your <<p breasts.n>> while you grind your pussy on his pants tent. <<= either("Looking down you notice a little stain of precum growing on his pants.","His hands squeeze your butt in a painful yet arousing way and you arch a bit to give him a better grip.")>></p>
    <p>It takes another ten minutes until you feel that he had <<if $currentWork == "oldProf">><<link "enough of this teasing.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><<else>>enough of this teasing.<</if>></p>`,
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
    name: "Strip",
    ask: "strip for me",
    job: ["oldProf",],
    type: "striptease",
    txt: `<<has exhibition>><<arousal 2>><<or>><<arousal 1>><</has>><p><<= either("You smile and ask him to turn on some music.","@@.pc;Anything you wish, sugar!@@")>> <<= either("Turning you start dancing in a suggestive way putting on display your most tasty bits.","Brushing your body you start dancing before him in an erotic fashion.")>> <<= either("Turning around you arch your back showing off your <<p ass.q>> to John and wiggle it a bit.","You notice that John's attention is focused on your <<p ass.q>> and start wiggling it more.")>> <<= either("Turning around you slowly remove your <<= aw.clothes[ↂ.pc.clothes.keys.top].style")>> leaving your <<p breasts.n>><<if ↂ.pc.clothes.worn.bra === "normal">> covered by only your bra.<<else>>bare naked.<</if>>","Painfully slowly you get rid of your <<= aw.clothes[ↂ.pc.clothes.keys.top].style>> and he licks his lips staring at your <<if ↂ.pc.clothes.worn.bra === "normal">>naked <</if>><<p breasts.n>>.")>><<= either("Your <<if ↂ.pc.clothes.worn.bottom === "normal">><<= aw.clothes[ↂ.pc.clothes.keys.bottom].style>><<elseif ↂ.pc.clothes.worn.panties === "normal">><<= aw.clothes[ↂ.pc.clothes.keys.panties].style>><<else>>other clothes<</if>> follow your top until you finish your dance buck-naked before the John.","<<if ↂ.pc.clothes.worn.bottom === "normal">>Next your body leaves your <<= aw.clothes[ↂ.pc.clothes.keys.bottom].style>><<else>>other clothes<</if>> and you are sure that John enjoys your little show.")>><<= either("Finish the dance and smile.","The song finishes and so do you.")>><<= either("","")>></p><p><<if $currentWork == "oldProf">><<link "Do you like my body, sugar?">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>></p>`,
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
    txt: `<<has oral>><<arousal 2>><<or>><<arousal 1>><</has>><<run setup.hadSexWith("none",2)>><<run setup.omni.new("cumMouth")>><<run setup.drug.eatDrug("cum", 10)>><p>The john sits down and gestures to his crotch before making a ‘hurry up’ motion.</p><p>@@.mono;I guess he wants me to do all the work then…@@</p><p>You kneel in front of him and place your hands on his thighs as lean your face close to the bulge in his pants. You use your chin to push against the tented cloth briefly, and bring your hands up his thighs to grasp the button at his waist. You push some more at random with your chin, simulating kisses through fabric, as you undo the button and pull down the zipper. You pull your head back slightly, and with a quick tug on his clothes his thick <<w cock.n>> springs free.</p><p>A pungent smell assaults your nose as the ripe member strains only inches from your face. You reflexively try to lean back to escape the intense smell, but to your surprise you find you only manage to move a couple inches before your head is held in place by the man’s hand behind your head.</p><p>The hand tugs your head forward until your face is stuck pushing the engorged cock toward the man’s belly.<p>@@.npc;Come on whore; I made sure this meat is good and ready for you, so get to work.@@</p><p>His command is punctuated by a dribble of precum running onto your eyelid.</p><<removetoys "mouth">><p>With a job to do and no real choice anyway, you steel yourself and extend your tongue to start licking the base of the John’s <<w cock.n>>.</p>Feeling your compliance, he loosens his grip on your head and allows you to get to work. The taste isn’t much better than the smell, but you manage to force yourself to work through it.<p>@@.mono;I should charge extra for shit like this!@@</p><p>It doesn’t take long before you bring him to the edge of orgasm.</p><p>@@.mono;Finally, let’s get this over with!@@</p>You start to pick up the pace, planning on catching the load with your mouth to avoid a mess. The john doesn’t cooperate, however, yanking your head back at the last second in order to spray his load all over your face.<p>@@.pc;Fuck.@@</p><<if $currentWork == "oldProf">><p>You move back from his cock a bit and <<link "massage your sore jaw.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
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
    txt: `<<has oral>><<arousal 2>><<or>><<arousal 1>><</has>><<run setup.omni.new("cumMouth")>><<run setup.hadSexWith("none",2)>><<run setup.drug.eatDrug("cum", 10)>><p>The john leans back on the driver's seat and gestures to his crotch before making a ‘hurry up’ motion.</p><p>@@.mono;I guess he wants me to do all the work then…@@</p><p>You kneel in front of him and place your hands on his thighs as lean your face close to the bulge in his pants. You use your chin to push against the tented cloth briefly, and bring your hands up his thighs to grasp the button at his waist. You push some more at random with your chin, simulating kisses through fabric, as you undo the button and pull down the zipper. You pull your head back slightly, and with a quick tug on his clothes his thick <<w cock.n>> springs free.</p><p>A pungent smell assaults your nose as the ripe member strains only inches from your face. You reflexively try to lean back to escape the intense smell, but to your surprise you find you only manage to move a couple inches before your head is held in place by the man’s hand behind your head.</p><p>The hand tugs your head forward until your face is stuck pushing the engorged cock toward the man’s belly.<p>@@.npc;Come on whore; I made sure this meat is good and ready for you, so get to work.@@</p><p>His command is punctuated by a dribble of precum running onto your eyelid.</p><<removetoys "mouth">><p>With a job to do and no real choice anyway, you steel yourself and extend your tongue to start licking the base of the John’s <<w cock.n>>.</p>Feeling your compliance, he loosens his grip on your head and allows you to get to work. The taste isn’t much better than the smell, but you manage to force yourself to work through it.<p>@@.mono;I should charge extra for shit like this!@@</p><p>It doesn’t take long before you bring him to the edge of orgasm.<p>@@.mono;Finally, let’s get this over with!@@<.p>You start to pick up the pace, planning on catching the load with your mouth to avoid a mess. The john doesn’t cooperate, however, yanking your head back at the last second in order to spray his load all over your face.<p>@@.pc;Fuck.@@</p><<if $currentWork == "oldProf">><p>You move back from his cock a bit and <<link "massage your sore jaw.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
    img: "IMG-WhoreOral2",
    time: [11, 23],
    tip: 6,
    check: ["OR"],
    cums: true,
    gate: "none",
  },
  {
    name: "Sucking",
    ask: "suck me",
    job: ["streetWalk", "oldProf"],
    type: "oral",
    txt: `<<has oral>><<arousal 2>><<or>><<arousal 1>><</has>><<run setup.omni.new("cumMouth")>><<run setup.hadSexWith("none",2)>><<run setup.drug.eatDrug("cum", 10)>><p><<removetoys "mouth">> <<= either("John unzips his pants and yanks his","John undone his zipper to get his")>> <<= either("pathethic worm","small cucmber","pecker","cock","dick","big cock")>> out. <<= either("With a simple gesture he invites you to work on his manhood with your mouth.","@@.npc;It ain't gonna suck itself, whore!@@","With a grin he jerks his manhood a bit to make it stiff. @@.npc;Suck it, bitch!@@")>> <<= either("You sigh silently before dropping kneeling before him.","You get yourself closer to his cock. @@.mono;I hope it is clean...@@")>> <<= either("Getting straight to business you engulf his helmet with your mouth and start sucking it in and out with a steady pace.","You stick out your tongue to taste it carefully.")>> <<= either("To your surprise, his meatpole doesn't smell or taste bad and you feel grateful to your client.","The only thing worse than this salty taste is his cock's heavy odor. You supress the nausea hoping that your saliva will clean it fast enough to get rid of the disgusting taste.")>> <<= either("@@.npc;Yeah, just like that!@@","@@.npc;Deeper, whore!@@")>> <<= either("From this position you can't see John but feel his hand on your head pushing you deeper onto his penis.","With a hand placed on your head he pushes you down forcing you to swallow his cock.")>> <<= either("With tears already running down your cheeks you fight the gag reflex while his warm flesh pokes you right into your abused throat.","Gagging you try to catch your breath while John's cock slides in and out from your throat poking it hard with every stroke.")>> <<= either("Crying you endure the throat fucking until your body gives up and you feel it is getting better despite the fucking is only getting harder.","You can't catch the rhythm and just endure the merciless throat fucking just hoping to avoid suffocating.")>> <<= either("@@.npc;Oh yes, oh yes, yesss, bitch, fuck!@@","@@.npc;Oh yeah, you are my bitch, you are my little... oh god, yes!@@")>> <<= either("In the almost unconcious state you are in you miss the moment he shoots his load down your throat. It just feels that he suddenly stop abusing you and just holds your head with his cock pulsing strongly inside you.","You almost start having fun and genuienly enjoy the harsh throatsex experience when John shoots his load deep into your throat with a series of short spasmic strokes.")>> <<has sub>><<= either("@@.mono;Oh I really like to be threated like this!@@","This was amazing... I am such a whore, giggle!")>><<orhas>><<= either("Oh this felt almost like being raped... and I loved every second of it!","Gosh, I guess it is the closest experience to the real rape... I want more of that!")>><</has>><<= either("Finally free from the thing in your throat you cough.","John sets you free from his dick and you take a deep breath enjoying the fresh air.")>></p><<if $currentWork == "oldProf">><p>You move back from his cock a bit and <<link "massage your sore jaw.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
    img: "IMG-WhoreOral3",
    time: [11, 23],
    tip: 7,
    check: ["OR"],
    cums: true,
    gate: "none",
  },
  {
    name: "Fucking",
    ask: "open your legs girl",
    job: ["oldProf"],
    type: "vaginal",
    txt: `<<set ↂ.pc.body.pussy.virgin = false>><<eatdrug "sex" 10>><<run setup.hadSexWith("none",1)>><<arousal 1>>With <<has slut>>excitement<<or>>a little sigh<</has>> you turn around and lean yourself on the table. The john is almost panting while undressing your butt and dealing with his fly.<<has slut>><p>@@.pc;Oh yeah, fuck me, stud!@@</p><<orhas shame>><p>@@.mono;How did I ended like this, oh my god... This is so embarrassing...I am like a cheap whore now, earning money with my cunt...@@</p><</has>><p>He finally manages to undress you and put on a condom before entering you without any preparation.</p><<removetoys "vagina">><<set ↂ.pc.status.health-= 1>><<has rape>><<arousal 1>><p>@@.mono;Oh yeah, take my little pussy by force! Oh, he is fucking me like he hates me... mmmhmm...@@</p><<orhas maso>><<arousal 1>><p>@@.mono;Oh, this hurts in such a good way...@@</p><<orhas sub>><<arousal 1>><p>@@.mono;I feel like a little obedient bitch, serving him with my hole...@@</p><<or>><p>@@.mono;Damned! This fucking hurts! Grrrr.@@</p><<stress 5 "Besty prostitution">><</has>><p>@@.npc;Oh yeah, bitch!@@</p><p>He fucks you in a constant pace, his hands holding your tights so your <<p breasts.n>> wiggle over the surface of the table with each thrust. You can feel his balls slapping your pubic bone each rhythmically, your <<p pussy.q>> <<p pussy.n>> stretch accepting john's member.</p><p>His movements become faster and he puts on hand on your shoulder ramming you with a full speed.</p><p>@@.npc;Oh yeah, Oh yeah! I aaammm...@@</p><p><<has easy>><<set _cummies = random(0,1)>><<if _cummies == 1>><<satisfy 4>><p>You feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>You get pretty close to orgasm but sadly, he cums faster than you leaving you unsatisfied.</p><</if>><<or>><<set _cummies = random(0,5)>><</has>><<has hard>><<set _cummies = random(0,10)>><<or>><</has>><<if _cummies == 5>><p>To your surprise you feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>Despite of some arousal from being fucked you are not able to cum before he does and pulls his cock out of your desperate hole.</p><</if>><<set _condomium = random(0,10)>><<if ↂ.pc.mutate.acid>><<set _condomium = random(0,6)>><</if>><<if _condomium == 6>><<eatdrug "cream" 2>><<run setup.condition.add({loc: "vagina", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<run ↂ.pc.fert.creampie("unknown", 50, "deep")>><<if random(1,10) === 1>><<run setup.giveSSTD()>><</if>><p>@@.npc;Shit!@@</p><p>You turn around and see that his condom broken and all his cum is most probably deep inside in your pussy</p><p><<has pregnancy>>@@.mono;For some reason I don't feel so sad about this. In some sense I am even excited, maybe I get pregnant?@@<<or>>@@.mono;Oh damn... I really hope I won't catch anything from him. And gosh, I can get pregnant, shit, shit ,shit!@@<</has>></p><</if>><p><<if $currentWork == "oldProf">><<link "Put on your clothes.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>></p>`,
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
    txt: `<<set ↂ.pc.body.pussy.virgin = false>><<eatdrug "sex" 10>><<run setup.hadSexWith("none",1)>><<arousal 1>>With <<has slut>>excitement<<or>>a little sigh<</has>> you turn around and lean yourself on the hood of the car. The john is almost panting while undressing your butt and dealing with his fly.<<has slut>><p>@@.pc;Oh yeah, fuck me, stud!@@</p><<orhas shame>><p>@@.mono;How did I ended like this, oh my god... This is so embarrassing...I am like a cheap whore now, earning money with my cunt...@@</p><</has>><p>He finally manages to undress you and put on a condom before entering you without any preparation.</p><<removetoys "vagina">><<set ↂ.pc.status.health-= 1>><<has rape>><<arousal 1>><p>@@.mono;Oh yeah, take my little pussy by force! Oh, he is fucking me like he hates me... mmmhmm...@@</p><<orhas maso>><<arousal 1>><p>@@.mono;Oh, this hurts in such a good way...@@</p><<orhas sub>><<arousal 1>><p>@@.mono;I feel like a little obedient bitch, serving him with my hole...@@</p><<or>><p>@@.mono;Damned! This fucking hurts! Grrrr.@@</p><<stress 5 "Besty prostitution">><</has>><p>@@.npc;Oh yeah, bitch!@@</p><p>He fucks you in a constant pace, his hands holding your tights so your <<p breasts.n>> wiggle over the surface of the table with each thrust. You can feel his balls slapping your pubic bone each rhythmically, your <<p pussy.q>> <<p pussy.n>> stretch accepting john's member.</p><p>His movements become faster and he puts on hand on your shoulder ramming you with a full speed.</p><p>@@.npc;Oh yeah, Oh yeah! I aaammm...@@</p><p><<has easy>><<set _cummies = random(0,1)>><<if _cummies == 1>><<satisfy 4>><p>You feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>You get pretty close to orgasm but sadly, he cums faster than you leaving you unsatisfied.</p><</if>><<or>><<set _cummies = random(0,5)>><</has>><<has hard>><<set _cummies = random(0,10)>><<if _cummies == 5>><p>To your surprise you feel your pleasure building stronger and stronger and start cumming almost at the same time as him.</p><<else>><p>Despite of some arousal from being fucked you are not able to cum before he does and pulls his cock out of your desperate hole.</p><</if>><</has>><<set _condomium = random(0,10)>><<if ↂ.pc.mutate.acid>><<set _condomium = random(0,6)>><</if>><<if _condomium == 6>><<eatdrug "cream" 2>><<run setup.condition.add({loc: "vagina", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<run ↂ.pc.fert.creampie("unknown", 50, "deep")>><<if random(1,10) === 1>><<run setup.giveSSTD()>><</if>><p>@@.npc;Shit!@@</p><p>You turn around and see that his condom broken and all his cum is most probably deep inside in your pussy</p><p><<has pregnancy>>@@.mono;For some reason I don't feel so sad about this. In some sense I am even excited, maybe I get pregnant?@@<<or>>@@.mono;Oh damn... I really hope I won't catch anything from him. And gosh, I can get pregnant, shit, shit ,shit!@@<</has>></p><</if>><p><<if $currentWork == "oldProf">><<link "Put on your clothes.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>></p>`,
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
    txt: `<<removetoys "asshole">><<set ↂ.pc.body.asshole.virgin = false>><<eatdrug "sex" 7>><<run setup.hadSexWith("none",1)>><<set _cockSize = random(1,3)>><<run ↂ.pc.body.asshole.insert(_cockSize)>><p>The john puts you on your back and rub his rigid member to your <<p anus.n>>.<p><<has anal>><p>@@.pc;Ride my butt like you mean it, cowboy!@@</p><<or>><p>@@.mono;Oh, I don't like anal at all, why am I ever doing this? I’m sure it’s gonna hurt like a bitch.@@<p><</has>><p>Spiting on the tip of his cock he presses it to your asshole, working his way inside with short thrusts. Finally, the head of his penis slides into your <<p anus.q>> butthole stretching your sphincter ring.</p><p>@@.pc;Mmmhhmm!!@@</p><<arousal 2>><p>@@.npc;Oh yeah!@@</p><p>Without any warm up he starts to fuck you balls-deep holding your hips. With each thrust you feel how his cock slides back and forth inside you and the pain from every sudden intrusion subsides replaced with arousal. It doesn't take long until he is ready to cum <<has easy>><<set _cumChance = random(35,50)>><<or>><<set _cumChance = random(0,50)>><</has>><<if _cumChance == 50>>but somehow you manage to cum at the same time as him without even touching yourself.<<satisfaction 21 "Anal orgasm from letting a customer fuck your ass">><<else>>leaving you aroused and unsatisfied.<</if>> His cum fills your rectum and a little bit of it comes out when he pulls his cock, and lets your used asshole rest.</p><<run setup.condition.add({loc: "asshole", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>>`,
    img: "IMG-WhoreAnal1",
    time: [11, 23],
    tip: 5,
    check: ["OR"],
    cums: true,
    gate: "none",
  },
  {
    name: "Anal",
    ask: "let me enter this rear hole of yours",
    job: ["oldProf", "streetWalk"],
    type: "anal",
    txt: `<<removetoys "asshole">><<set ↂ.pc.body.asshole.virgin = false>><<eatdrug "sex" 7>><<run setup.hadSexWith("none",1)>><<set _cockSize = random(1,3)>><<run ↂ.pc.body.asshole.insert(_cockSize)>><<run ↂ.pc.body.asshole.insert(_cockSize)>><p><<= either("You turn to present John your <<p ass.n>>.","You wink John and turn around wiggling your <<p ass.n>> as an invitation.")>> <<= either("@@.pc;Take me, stud!@@","@@.pc;Fill my butt, sugar!@@")>> <<= either("He takes his","He removes his pants to free his")>> <<= either("small cock","mediocre dick","average member","big meatpole")>> <<= either("and poking it to your <<p anus.n>>","start rubbing it towards your <<p anus.n>>")>>. <<= either("It takes a while until he grows stiff but eventually he","He is already stiff so he")>> <<= either("pushes it inside forcing your hole to stretch accepting him.","forces his cock inside your submissive hole.")>> <<has anal>><<= either("@@.mono;Oh yeah! Damn this feels good.@@","@@.pc;Oh fuck, yes, fuck my ass!@@")>><<or>><<= either("@@.mono;Damn this hurts!@@","You wince with sharp pain while John takes you dry.")>><</has>> <<= either("@@.npc;You are my bitch, yes. Filthy, filthy bitch!@@ With a slap on your butt he picks up the pace abusing your hole with merciless fucking.","Holding you tightly by your waist he pushes his cock deep inside your asshole in a series of a fast thrusts.")>> <<has easy>><<satisfaction 21 "Anal orgasm from letting a customer fuck your ass">><<= either("Suddenly this starts to feel really good and you moan with unexpected pleasure when you feel the humilating streetwhore's orgasm slowly overwhelms you.","Pain in your ass slowly becomes more and more pleasurable and you feel you can actually cum anytime soon. It takes a couple of squeezes of your anus to push you over the edge.")>> <<= either("@@.pc;Oh god, oh god, ummmyeeeas!@@","Mmm...mmm...mmmmohmygodohmygodohmygodyeeeah!!")>><</has>> <<= either("John cocks starts twitching and you feel his warm jizz filling your asshole as he cums buckets inside you.","With a groan John releases his seed deep inside your bowels squeezing your waist painfully until the last drop of his cum fill you.")>> <<= either("@@.npc;Oh yeah, slut, that was awesome!@@","@@.npc;Phew, what a nice set of holes you are!@@")>> <<= either("He removes his","He pulls his")>> <<= either("still hard","already soft")>> cock <<= either("from your hole","from you")>> and sighs.</p><<run setup.condition.add({loc: "asshole", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>>`,
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
    txt: `<<set ↂ.pc.body.pussy.virgin = false>><<run ↂ.pc.fert.creampie("unknown", 50, "deep")>><<run setup.condition.add({loc: "vagina", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<eatdrug "sex" 15>><<run setup.hadSexWith("none",1)>><<eatdrug "cream" 3>><<run setup.hadSexWith("none",1)>><<arousal 1>><p><<has risky>>You can't help but anticipate the creampie<<or>>You feel nervous despite the danger of getting pregnant or catching SSTD.<</has>></p><p>You lie him down and get onto him in the cowgirl position. Undressing, you present him your bare boobs and he starts fondling them with his hands.</p><p>@@.npc;Mmm, I like it!@@</p><<removetoys "vagina">><p>Getting his cock free from his clothes you start rubbing your pussy on his member to get it hard and after a minute he is stiff as wood. You lift a bit and his dick get aligned with your pussy opening pressing into soft flesh.</p><p>@@.pc;Want some, mister?@@</p><p>@@.npc;Oh yeah, ride it bitch!@@</p><p>With a smile you slowly lower yourself on his cock feeling it stretch your insides.</p><p>@@.mono;There is no feeling like a bare throbbing cock in my pussy, I feel I could ride it for eternity...@@</p><p> Increasing the pace you ride him leaning over with your hands on his chest.The john starts thrusting rhythmically to penetrate you even deeper and you can swear you feel his head knocking into your uterus opening softly. Leaning back, faster and faster, you bounce on his cock while playing with your fun button while the guy enjoys the view.</p><p>@@.npc;Oh, I... am... gonna!..@@</p><p>You are almost on the edge too,  when his dick starts spurting his hot load deep into your wet pussy it got just too intense. With loud screaming you orgasm,  enjoying your job to the best.</p><p>You both slow down and you just sit  on his member panting heavily for some time while his cum slowly oozes outside before getting off him.</p><<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>>`,
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
    txt: `<<if ↂ.pc.clothes.worn.bra === "normal" || ↂ.pc.clothes.worn.top === "normal">>You free your tits and get<<else>>You get<</if>> to his hard cock. Spitting between your funbags you enwrap his member between and start massaging it moving your torso. He starts to fuck your midtit space himself in the rhythm biting his lip and panting.<p>@@.mono;Ugh, he could really use a bath, dammit.@@</p><p>While his dick slides up and down you try make the sluttiest face possible for him and smile cunningly. After a while he seems ready to burst, his thrusting speeds up and with a loud groans he starts shooting pearly white baby butter on your chest and face.<<run setup.condition.add({loc: "chest", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<run setup.condition.add({loc: "chest", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<if $currentWork == "oldProf">><p><<link "Lean back.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
    img: "IMG-WhoreTitfuck1",
    time: [11, 21],
    tip: 4,
    check: ["SX"],
    cums: true,
    gate: "none",
  },
  {
    name: "Titjob",
    ask: "do some tittyfuck for me",
    job: ["oldProf", "streetWalk"],
    type: "titjob",
    txt: `<p><<if ↂ.pc.clothes.worn.bra === "normal" || ↂ.pc.clothes.worn.top === "normal">><<= either("You free your","You get rid of the clothes restricting access to your")>> <<p tits.q>> <<p titshape.q>> <<p tits.n>> and<<else>><<= either("With your tits already bare","Having no clothes restricting your tits")>> you<</if>> <<= either("play with them for John's pleasure.","squeeze them a bit to get him prepared")>> <<= either("Bit by bit his","In a moment","Slowly, but steadily")>> his <<= either("unpretendous cock","pretty average dick","massive dong")>> <<= either("gets hard","grows stiff")>> and <<= either("you put it between your <<p tits.n>>","engulf it with your soft <<p tits.n>>")>> <<= either("spitting down for the sake of lubrication.","obcenely spitting right on the top of his cock to provide some lube for the action.")>> <<= either("@@.pc;You like what you see, mister?@@","You wink to him and start massaging his meat with your tits.")>> <<= either("@@.npc;Oh yeah, bitch, just like that!@@","He moans with pleasure pushing his pole deeper between your <<p tits.n>>")>> <<= either("Keeping the cock buried and twitching between the tits you practice in ahegao face trying to make him cum faster.","Despite of feeling nothing yourself you play along and make an aroused face to encourage him.")>> <<= either("John starts to thrust his pecker simulating sex with your boobs","Jerking rhytmically John obviously gets closer and closer to cumming")>> <<= either("and you stick out your tongue.","and you press your boobs on the sides with your hands harder helping him to orgasm.")>> <<= either("@@.npc;Oh god, oh fuck, fuck, fuckityfuckshityes!@@","@@.npc;Mmmhmmhm!@@")>> <<= either("His sausage starts to shoot the jizz spasmically covering your face with a hot fresh baby butter.","He releases his load in a long discontinuous stream giving you a pearl necklace.")>></p><<run setup.condition.add({loc: "chest", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<run setup.condition.add({loc: "chest", amt: 4, tgt: "pc", wet: 5, type: "cum"})>><<if $currentWork == "oldProf">><p><<link "Lean back.">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>></p><</if>>`,
    img: "IMG-WhoreTitfuck2",
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
    txt: `<<gate "waterworks">><<run setup.condition.add({loc: "face", amt: 12, tgt: "pc", wet: 12, type: "piss"})>><p>You stand on your knees and john opens his fly.</p><<has water>><<arouse 2>><p>@@.mono;Oh yes, I really want him to shower me with his hot salty piss! Why am I so aroused with this idea?@@</p><<or>><<stress 5 "Prostitution">><<anger 1>>@@.mono;Shit, this is humiliating, now I am on my knees waiting for some complete stranger to piss on me like I am a urinal or something...@@<</has>><p>His cock is semi-erect and you can smell the odor of his manhood while he relax his pelvic with a aroused grin. His piss starts pouring and you close your eyes instinctively when the first spirt hits your face.</p><p>@@.npc;Open your mouth, sweetie, take it like a good girl!@@</p><p>The smell is <<has water>>amazing and<<or>>awful but<</has>> you follow the order, your mouth quickly fills with his urine, the taste is salty and soursweet. It overflows you and streams of warm piss flow down your neck and chest soaking your clothes while you struggle to breathe. Finally, it is over and you open your eyes cautiously to see the john shaking his member to get rid of last drops.</p><<has water>><p>You close your mouth still full of hot salty urine and looking him straight into eyes gulp it down.</p><p>@@.npc;Shit, girl, you are into it! What a little filthy whore you are!@@</p><<or>><p>You spit the remains of piss from your mouth. The guy wipes his cock with your hairs and dress.</p><p>Soaking wet your stand up from your already sore knees.</p><</has>> <<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>><</gate>>`,
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
    txt: `<<gate "domsub">><p>John looks at you with lust taking a permanent marker.</p><p>@@.npc;Strip down slut, I want to write on this body of yours.@@</p><p>Feeling a bit weird you undress and stand before him buck naked. With his hand on your shoulder he makes forces you on your knees and goes around you holding a marker in his hand. You feel the cold tip of the marker pressing on the surface of your skin and flinch a bit. The tip moves and letters become words. After a while he seems to be satisfied with the result and takes a step back.</p><p>@@.npc;Now, look at you, you look like a properly marked cheap whore now! Isn't it nice?@@</p><<if $currentWork == "oldProf">><<link "Finish">><<status 0>><<scenego "OldestProfWork-2-finish">><</link>><</if>><<set _bwPlace = either("face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina")>><<set _bwText = either("Dumb cunt", "Whore", "Cumdump", "Slut", "Fuck meat", "Fuck me", "Public use", "Abuse me", "Free whore", "Sex toy", "Degrade me", "Born to serve", "Cum depository", "Pig", "Cocksucker", "Use me", "Slave", "Hooker")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><<set _bwPlace = either("face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina")>><<set _bwText = either("Dumb cunt", "Whore", "Cumdump", "Slut", "Fuck meat", "Fuck me", "Public use", "Abuse me", "Free whore", "Sex toy", "Degrade me", "Born to serve", "Cum depository", "Pig", "Cocksucker", "Use me", "Slave", "Hooker")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><<set _bwPlace = either("face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina")>><<set _bwText = either("Dumb cunt", "Whore", "Cumdump", "Slut", "Fuck meat", "Fuck me", "Public use", "Abuse me", "Free whore", "Sex toy", "Degrade me", "Born to serve", "Cum depository", "Pig", "Cocksucker", "Use me", "Slave", "Hooker")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><<set _bwPlace = either("face", "pubic", "butt", "asshole", "vagina")>><<set _bwText = either("Public hole", "Free to use", "Worthless hole", "Slave's hole", "Fuck here")>><<run setup.tattoo.bodWrite(_bwText, _bwPlace)>><</gate>>`,
    img: "IMG-Bodywriting1",
    time: [12, 25],
    tip: 6,
    check: ["SX"], // dunno lol
    cums: false,
    gate: "domsub",
  },

  // Anenn markup
  {
    name: "Lapdance",
    ask: "lapdance me baby",
    job: ["oldProf", "streetWalk"],
    type: "striptease",
    txt: `
      He grabs your hand and takes you to the nearest alley, the place is dark and inhospitable, you don't see anyone around. @@.npc;Okay, now I want that slitty little pussy working for me.@@ He declares as he leans against the wall, indicating for his pants you can see the cock erect underneath it. You bite your lower lip in a mixture of feelings, but you continue your work, you turn your back to him and press your butt against the pulsating penis under your pants. You look back with an innocent expression to see that he is enjoying each of your moves, after a few minutes you feel his hands stripping the top of your clothes to grab your breasts. @@.npc;I want to have some fun with them too.@@ Soon you are topless, feeling his hands squeezing your breasts, and then focusing more on your nipples. His touch is consistent, but it is not crude. You feel some mixed waves carrying a great load of pleasure and a little discomfort, but you moan more strongly, still pressing your butt against his pants, you can feel his iron-hard dick and his breathing becoming heavier. @@.mono;Hmm... At this rate, I will need this cock inside me...@@ You ponder, starting to lose control of your lust. After about 15 minutes you feel that the heat of your body has increased almost as much as his, he grabs your butt and pulls you away, you turn around and can see in the eyes the barely contained arousal when he starts taking off his clothes, ready to fuck you here.<br><br>

      <<if $currentWork == "oldProf">>
        <<link "O-Okay... And now...">>
          <<status 0>><<scenego "Anenn-OldProf-Finish-1">>
        <</link>>
      <<else>>
        @@.mono;That's enough!@@
      <</if>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 18],
    tip: 3,
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "Lapdance",
    ask: "do some tittyfuck for me",
    job: ["oldProf", "streetWalk"],
    type: "titjob",
    txt: `
      You are guided to the nearest alley, the place is damp and gloomy, with some obstacles and you and your client arrive at a private spot. You fold your arms for him as he strips his lower body, he lies on an old, moistened mattress behind him. 

      The place is full of sex, you assume that you are not the first hooker he has brought here. Start using these breasts, and then we'll see how things evolve... He smirks and you, without wanting to waste time, undress your breasts and kneel in front of him lining up your boobs on the erect cock, you can feel the flesh pulsating between your breasts, the smell is an interesting and perverted mixture, intensely masculine and inhaling that aroma begins to fill you with lust. 

      You focus on your work and start moving your breasts by massaging his penis, his moans are soft and you can see that he is enjoying every second, your nipples start to harden and your pussy starts to get wet, at one point he declares. Faster, bitch ... I'm paying to get professional service so ... Work properly. Or I will find another slut who does a better job. 

      The way he speaks is as if you are disposable, a piece of meat, but you ignore it and intensify the massage. You start using your tongue and lick the head of his cock while you continue with the tittyjob, after a few minutes his pulse increases, his breathing intensifies and the light moans become grunts of pleasure. Feeling the pulse and the intense heat emanating from his dick, then the bursts of semen cover your breasts, one after the other, his balls deflate covering you with the dense and manly substance. 

      <<if $currentWork == "oldProf">>
        <<link "Be fucked">>
          <<status 0>><<scenego "Anenn-OldProf-Finish-2">>
        <</link>>
      <<else>>
        After a few seconds it is over, you are dirty with his cum and your client is satisfied.
      <</if>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: 3,
    check: ["SD"],
    cums: true,
    gate: "none",
  },

  // Anenn: Gangbang here!
  {
    name: "A special service...",
    ask: "suck me",
    job: ["oldProf", "streetWalk"],
    type: "oral",
    txt: `
      You accompany your new client to the alley next to the closest building, knowing the outskirts of the city you presume that it is one of the points where the guys usually bring the bitches to fuck. And now you are one of them, when you get there you notice that it is a dark place, humid and well isolated from the rest, at least here you will have some privacy.<br><br>

      @@.npc;Well, now... I want you to suck it, you're just mine for a couple of hours, I want to use that mouth properly.@@ He looks at you undressing, when his head falls in the hole you can see the semi-erect cock already holding a little pre-seminal liquid on the tip. The sight makes you start to feel dirty, perhaps because you are practically a temporary slave.<br><br>

      @@.mono;Well, a job is a job...@@ You feel your heart start to beat a little more strongly at the prospect of what you're undressing to do, you take off your bra and throw it on the floor, the view of your breasts make his penis fully erect and now waiting for your attention.<br><br>

      Without further words or thoughts, you kneel in front of your client and lick your lips while grabbing the pulsing piece of meat in front of you. You look at him, realizing that he is smirking at you, certainly thinking about what he will do to you after you serve him. The experience of this arouses curiosity and you both have the head of the penis, covered with his pre-seminal liquids, the taste is pleasant, salty, and thick. You let your body gradually be taken over by the arousal and it intensifies your actions, soon you start to suck it, allowing it to go deeper and deeper into your mouth until almost a deepthroat, where things start to heat up faster than that you thought.<br><br>

      @@.mono;Ugh...!@@ You open your eyes in surprise when your client takes your hair and forces you against the dick, you feel his penis roughly invading your throat. In rhythmic movements he uses your mouth, pressing in and out, you feel the pulsating penis entering deeply and then out. You don't close your eyes and think about resisting, but you remember the role you are playing here, as a little sex slave, and you can't resist but just feel the intensity of the thrusts increase. His grunts of pleasure are more intense, you feel the pressure against your badly treated throat with each new thrust, he is the only one receiving pleasure here.<br><br>

      The smell that emanates from it fills you, it is masculine and loaded with pheromones, you feel your pussy start to moisten despite this being a masochistic experience and not something romantic and traditional.<br><br>

      @@.npc;Aahhh... Shit, this is fucking good! Take this, whore...@@ He gives a thrust causing his penis to sink completely into your mouth, you feel it stretch your throat, each intense pulse of the penis starting the climax, and finally, the bursts of semen are fired directly to your stomach. You feel it running down your throat, hot and thick, although you haven't even had a chance to prove it. Soon it ends and you are released from the little torment, you cough fiercely feeling a great discomfort in your throat and a little of the semen in your mouth.<br><br>

      <<has masochist>>
        You don't say anything, but the feeling of being abused so intensely makes you feel warmer, despite your body complaining you feel your arousal grow and your clit harden. You wipe your mouth from the remnants of your client's cum, feeling it inside your stomach, and smile at yourself, satisfied with the experience of being treated badly. @@.mono;Well, I'm really a bitch, soo... Heehee@@<br><br>
      <<or>>
        @@.pc;*Cough* *Cough* *Cough* Asshole... Could you warn me before you do that!@@ You complain, even though you know that men who hire prostitutes are not exactly a good type of person.<br><br>
      <</has>>

      You are lying on the floor trying to recover from having your mouth abused in this way, feeling the cold wind from the alley run through the upper and unprotected part of your body, for some reason your nipples are hardened but you decide to ignore it.<br><br>

      When you look to the side you notice two more men arriving, one wearing casual clothes and the other looking more youthful, more casual, and simple. They greet your client, seeming to know each other. @@.npd;Hey, so you brought a hooker for us, okay... She looks well prepared, shit...@@ The stripped young man speaks as he kneels in front of you, admiring your breasts. You feel like a real slave right now.<br><br>

      @@.npe;I'm really in the mood for this! Let's start having fun... Why waste time? She looks fuckable! Haha@@ The best dressed man speaks before he starts to undress him, if you decide to stay here you will be fucked for real.<br><br>

      <<if $currentWork == "oldProf">>
        <<link "Be gangbanged!">>
          <<status 0>><<scenego "Anenn-OldProf-Finish-3-Gangbang">>
        <</link>>
      <<else>>
        //Although their intention is clear, you don't work with that kind of thing. You leave with your money, masochistic hardcore is not included in your current profession.//
      <</if>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: 3,
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "Trash fuck at the alley",
    ask: "fuck me",
    job: ["oldProf", "streetWalk"],
    type: "vaginal",
    txt: `
      You walk beside your client, he takes you to one of the several alleys in the city. Working as a hooker you start to notice the patterns of these places, which are normally used by men of this type to fuck the sluts they hire, and today this is you. He didn't specify what he wants from you, but that's not a big deal and you can imagine. Although there are many bizarre fetishes, most of the time you are hired to do the good old sex: Pussy fuck.<br><br>

      @@.pc;So... What exactly do you want-!!!@@ You turn to your client to ask what he wants, but he grabs you immediately and starts a fierce kiss on your lips. You are taken by surprise, usually, they get heavy with you but this time things can flow more slowly, which does not save you from having your pussy fucked a little brutally. Your client appears to be about 22 years old, and you assume that he is practically letting his hormones speak for him, just like every young adult.<br><br>

      @@.pc;Uh... Hmm... H-Hey....@@ You try to talk but he doesn't seem to listen to you, you feel his hands going over your body and starting to take off your clothes gradually as the kiss proceeds. Returning the kiss, you feel the clothes being pulled out of your body one by one, then you feel him kissing and sucking on your neck, you assume that he is frustrated enough to fuck you like a rutting animal. At this point, you are practically naked and feeling the cold glimpse of the alley against your skin, but the heat and pulsations in your body start to increase and you feel that you can enjoy this fuck.<br><br>

      @@.pc;Uh, okay... Easy... Hehe, do you want to fuck my cunt, or do you want me to serve your dick?@@ You push your client away with your hands, breaking the feverish rhythm of the caresses he was giving you. It takes a few seconds to think but you can see all the lust barely contained in his body through the look he gives you in your direction, like a predator hunting for prey.<br><br>

      @@.npc;Hah, sorry about that, I have trouble restraining myself by seeing something as hot as you. I will fuck your little pussy, no doubt! But I want you to start serving me, show me if you know how to use your mouth well...@@ He again approaches you, wrapping you in his arms and caressing your vagina that is starting to get wet. You feel his caresses getting more intense and after a few minutes, your pussy is legitimately moist. He moves away from you and starts to undress, in a few seconds he is naked and his penis pulsates in front of you, already hardened like iron.<br><br>

      You kneel in front of your young client and grab the erect dick, the heat emanates from it intensely and you feel every pulse of his body in the palm of your hand. When you gently start to lick the head of the penis you feel the arousal start to grow inside you, the smell of it is strong and fills your interior with lust every time you breathe. You tease your client by slowly licking the piece of hot meat, passing from the head of it to the body and then to the base, you run your fingers between the pubic hair at the base of the penis and feel the strained moisture, this is sweat seminal liquids attached to his skin that now cover your hand.<br><br>

      His grunt of frustration makes you feel a little intimidated, you don't want him to throw you on the floor and fuck you like a bitch in heat. Before he loses control you start to serve him properly, grabbing the whole dick and allowing it to sink into your mouth. When it is almost completely inside you use your tongue to massage it, and apply some pressure by sucking repeatedly and making him just moan with pleasure. Gradually his pulses accelerate, now you have your two hands at the base of the penis and suck intensely every inch of it, milking your client.<br><br>

      @@.mono;Hmm... This is not so bad, after all... At least he is not a total asshole.@@ You ponder yourself while still playing with the dick in front of you. Your arousal is growing to the same extent as his, your pussy is hot and ready for a fuck, almost overloaded with vaginal moisture.<br><br>

      You let the dick get out of your mouth, kissing the head of it and looking at your client who looks at you in the expectation that you continue this. You can't help but smile when you see his expression and soon you take the dick again, almost totally swallowing it. You milk his penis again and, at some point in the next couple of minutes, you notice that his body's pulse is accelerating and you can feel every vein in his penis pulsing inside your mouth. His body heat increases rapidly and he lets out a great grunt of pleasure when, without warning, he starts to cum.<br><br>

      @@.npc;Uh... Hmm... *Soft, wet sound of jets of semen* That feels good...@@ You close your eyes while your client enjoys fiercely in your mouth, emptying his tense and frustrated balls. You get some powerful jets of semen, the masculine scent intensifies thanks to the cum, it is filling you in every way possible and you feel like you want to be fucked but you decide to let that part go. When he finishes emptying his balls, he lets out a sigh of relief and takes the dick out of your mouth, now semi-flaccid. Due to the amount of semen in his mouth, he was very frustrated, the white, thick, and hot substance taste salty and smooth.<br><br>

      @@.npc;Heehee, now show me what you have in your mouth, and then swallow... I want to see this.@@ He puts himself in a very casual position in the expectation, you don't leave him waiting too long and open your mouth trying to make a sexy expression, maybe he'll give you a bigger tip. You open your mouth to show all his semen and then swallow it all at once, it fills you with a strange sensation, but it increases your arousal a lot and you start to be controlled by your sexual desire. Your nipples harden and your clit is vibrating, vaginal moisture settles around your breast hole and you know this is the time to fuck, but before you completely lose control of the situation you make a decision: Fuck or not fuck?<br><br>

      <<if $currentWork == "oldProf">>
        <<link "Be fucked!">>
          <<status 0>><<scenego "Anenn-OldProf-Finish-3-HardFuck">>
        <</link>>
      <<else>>
        //Although his intention is clear, you don't work with that kind of thing. You leave with your money, masochistic hardcore is not included in your current profession.//
      <</if>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: 5,
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "dual lapdance fuck",
    ask: "fuck me",
    job: ["oldProf", "streetWalk"],
    type: "vaginal",
    txt: `
      Your client casually walks around asking you to follow him to one of the many alleys in town. You are used to seeing some other hookers coming and going from the alleys of the city, today you are taken by your client to another one of those places. They are always nasty places though, but when you get there you realize that you are not alone with him.<br><br>

      @@.npc;So, you've already chosen the other girl. Well... At least she's cute. Haha@@ You see a young blonde girl with crossed arms, she gives you an analytical look and checks every part of your body. She is wearing a very casual outfit and more revealing than a normal girl, her makeup is more daring and you don't need many seconds to understand what is happening here. It looks like you were called in for a threesome, this is not particularly unusual, although you feel this is really gross.<br><br>

      @@.npd;Hah, yes it will do... I liked her body, it is very hot, maybe more than yours.@@ Your client teases another hooker, who rolls his eyes at the provocation. @@.npc;Okay, let's see who's hotter...@@ Without wasting any more time, I have other customers after you. She grabs her T-shirt at the base, and drags it upwards, shaking her hair tied in a ponytail. Her breasts are now free, you can say that they are size D, she has a mischievous smile and you can bet she is excited about the situation. @@.npc;Come on, take off your clothes, you're not just here to look...@@ She teases you while she keeps undressing.<br><br>

      @@.mono;I think that's it, anyway, let's get this over with.@@ You decide to get it over with as soon as possible and follow in the footsteps of the other hooker, undressing until the cold wind from the dark alley is hitting your bare, unprotected skin. You are facing the young blonde when you hear your client's voice, he took off his clothes, now you can see his handsome penis, semi-erect and ready to receive some special attention. Heehee, I'm going first, whoever makes this cock come first is the winner, and keep the tip! She gives you a mischievous look before she steps forward and kneels in front of him, she is unable to look away from his penis and grabs it gently, but intensely and with desire in her eyes. You feel something different about this girl when she starts serving the customer, giving a lot of energy at the first lick, she seems to be tasting the flavor of his seminal liquids.<br><br>

      @@.npc;Hmm... This is kind of salty, didn't you take a shower before coming here? How dirty you are... Hah!@@ She teases the client, but he doesn't respond to it in words but with a soft moan of pleasure and relief when she snatches the dick's head, sucking intensely from the beginning to the base in one quick movement. You can see the penis in and out of her mouth, but she seems to be taking advantage of it.<br><br>

      @@.npd;Will you just be looking? I called you here to serve me... Come on, bitch.@@ He points to the floor next to the young hooker, you sigh before you go and kneel beside her, in front of the erect dick. She doesn't seem to want to let it go through, but she just continues sucking on it without decreasing the intensity. Something shiny catches your eye and you look at the middle of her legs, realizing that her pussy is dripping vaginal fluids, a considerable amount and you start to think that she is using some type of aphrodisiac drug. You think she is possessed by lust as if she were a bitch in heat, unable to contain herself, if you want to touch that dick and get your money you will need to compete with her.<br><br>

      @@.npc;Hehe, relax, I'll give you a chance... Even though I know you won't be able to make him come. Here... Suck this.@@ To your surprise, she manages to disconnect from the penis and gives some space for you. You do not waste time and grab the penis feeling the warm and hard texture. The skin is soft and covered with a mixture of her saliva and your client's pre-seminal fluids. The smell is intense and masculine, you breathe it and feel your arousal grow more and more. You don't feel like you need to go slow, she started a heavy job here, deciding to continue where the young blonde hooker stopped you suck at about the same intensity as her.<br><br>

      @@.npc;It sounds like someone here has some experience sucking cocks, let's do it together... This is fucking hot!@@ You could imagine your client asking for it, seeing another girl suggest it makes you think she's a nympho. She grabs the base of the dick and fights for space with you, who now needs to compete to lick your client's penis. He touches her head gently and you look up to see the expression on his face, which is pure pleasure to have a pair of bitches competing to serve his cock at the same time. @@.npd;Aahhh... I knew this was money- Ugh... Well spent!@@<br><br>

      You have a close fight with the young hooker, at some point, you take care of the cock head while she takes care of the rest, you feel the pulsations of the penis in your mouth, this is intensifying more and more as the dispute progresses. Your client's moans are also intensified and the sound of his breathing gets heavier, you can feel the sweat settling on his skin and when the dick's pulsations reach the maximum you feel that he will cum.<br><br>

      @@.npc;Now, I want that cum!@@ The young hooker opens her mouth, grabbing the base of the cock and staring at it, a few seconds before the first jet comes out you instinctively follow what she does, and align yourself in front of the penis when it finally starts to come, firing the hot semen on the faces of both bitches. You are feeling more aroused, your pussy is burning, everything here has led you to surrender more and more deeply to your mating instinct. Now you feel the hot cum on your skin, the smell of it is unique and the texture presses your attention. You touch the cum running down your face and don't resist your will, taking it to your mouth. The taste is salty, hard to describe, but one thing you are sure of: the taste and texture of fresh cum makes you feel intensely aroused. You look at the young hooker next to you, she has her mouth open trying to receive the jets of semen, she succeeds sometimes and when your client stops coming, she licks her lips while savoring the cum she managed to catch, although part of it is on her face too.<br><br>

      @@.npc;This is good... I don't like to complain, but this was technically an tie!@@ She collects the semen remnants from her face with her index finger, then sucking on it. When she finishes drinking every drop of it, she turns to you and realizes that your face has some cum. You are again taken by surprise when she kisses you furiously on the lips, sucking your mouth in a fierce kiss. You widen your eyes in shock for a few seconds, but you start to return the kiss feeling your libido taking control of your body after everything you've done so far. When you're starting to like it, it breaks the kiss, though.<br><br>

      @@.npc;Hmm... You had cum on your lips, hehe... I'm not a lesbian, sorry. Although I don't mind working with other girls and having a little fun.@@ She looks at your cunt, and you realize that you are starting to drip with barely contained lust.<br><br>

      She stands up and declares still looking at the customer. Well, you paid me for complete fun, so what do you think are we going to continue? After that, I want you to return my work, and fuck me, I need your cock inside me. She gives a funny laugh, you realize that she is certainly a nympho, your client approaches her and slaps her butt round, leaving a slight red mark while he whispers something, probably agreeing.<br><br>

      You can choose whether you want to stop here, technically your job is done, but you can always continue and dig deeper for a more meaningful tip, and maybe get some additional fun.<br><br>

      <<if $currentWork == "oldProf">>
        <<link "Go to this cock!">>
          <<status 0>><<scenego "Anenn-OldProf-Finish-3-DualFuck">>
        <</link>>
      <<else>>
        //Although their intention is clear, you don't work with that kind of thing. You leave with your money, masochistic hardcore is not included in your current profession.//
      <</if>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: random(2, 10),
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "triple service",
    ask: "serve them",
    job: ["streetWalk"],
    type: "oral",
    txt: `
      You follow your client to the nearest alley, these are popular places for assholes to fuck sluts. Many of them are almost indistinguishable, the smell of sex covering every inch, the feeling of being at the mercy of constant rape, and the dirt and remnants of cum, condoms and pieces of clothing scattered around.<br><br>

      <<link "Start the service">>
        <<status 0>><<scenego "Anenn-streetWalk-Finish-4-TripleService">>
      <</link>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: random(2, 10),
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "dilf service",
    ask: "dilf pussyfuck",
    job: ["oldProf"],
    type: "vaginal",
    txt: `
      Today again you go with your client to the nearest alley, he is a middle aged man, you can see some gray hair on his head and some traces of aging, but he is still looking good. He's been treating you normally since he first talked to you, you hope it doesn't change.<br><br>

      <<link "Mount the old man">>
        <<status 0>><<scenego "Anenn-OldProf-Finish-5-DilfyFuck">>
      <</link>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: random(2, 10),
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "drunk pussyfuck",
    ask: "drunk sex",
    job: ["oldProf"],
    type: "vaginal",
    txt: `
      You follow one more of your customers to the alley, you feel like you've been here, the smell and appearance are the same although you've already covered several of them. You notice something strange in his voice, the awkward walking tone, when you and he reach the bottom of the alley, next to a large pile of fabrics, he takes off his sunglasses and you notice that he is half drunk.<br><br>

      <<link "Drunk fuck time!">>
        <<status 0>><<scenego "Anenn-OldProf-Finish-6-DrunkFuck">>
      <</link>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: random(2, 10),
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "punk threesome",
    ask: "threesome fuck",
    job: ["oldProf"],
    type: "oral",
    txt: `
      Another day, another fuck, you are again taken to one of the dark and indistinguishable corners of the city to be fucked. Your client has a serious expression on his face, but you are going to be fucked somehow anyway. When you reach the end of the dark alley you notice another girl dressed strangely, looking like a punk girl, with <<= either("pink", "red", "blonde", "white", "blue", "black", "orange")>> hair and a moderate amount of makeup on her face. Casual clothes leave your arms exposed and you can see some Gothic tattoos.<br><br>

      <<link "Group fuck time!">>
        <<status 0>><<scenego "Anenn-OldProf-Finish-7-GroupFuck">>
      <</link>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 10],
    tip: random(2, 7),
    check: ["SD"],
    cums: true,
    gate: "none",
  },
  {
    name: "drunk assfuck",
    ask: "asshole fuck",
    job: ["oldProf"],
    type: "anal",
    txt: `
      This work is already starting to become a routine for you, fuck after fuck, your body and mind start to get used to it so that you do it automatically. Today you see yourself in one of the other alleys in the city, your client hugs you tightly, wrapping you in his arms, while caressing your butt trying to take your clothes off.<br><br>

      @@.pc;Hmm... O-Okay, take it easy.@@ You speak, but the alcohol halito emanating from his breath and the erect dick under his pants indicate that he won't stop. You are a temporary slave to your client though, and you know you're here just to satisfy his will, whatever it is.<br><br>

      Things are moving fast and in a few minutes they are both completely naked, he presses you against the wall and declares. I'm going to fuck that butt, turn around and lift your ass for me, bitch. You feel the weight of his tone, laden with perverted lust and alcohol. Deciding to obey, you suppress your thoughts and do what he asks. When you lift your butt to your client, he smiles as he hovers behind you, he teases your dirty little hole with his index finger. @@.npc;Heehee, this will be awkward and difficult for you... Too bad.@@<br><br>

      <<link "Go to this cock!">>
        <<status 0>><<scenego "Anenn-OldProf-Finish-3-AssFuck">>
      <</link>>
    `,
    img: "IMG-WhoreLapdance1",
    time: [7, 15],
    tip: random(2, 7),
    check: ["SD"],
    cums: true,
    gate: "none",
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
