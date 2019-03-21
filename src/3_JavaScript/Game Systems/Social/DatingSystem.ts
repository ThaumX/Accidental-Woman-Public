
//  8888888b.           888    d8b
//  888  "Y88b          888    Y8P
//  888    888          888
//  888    888  8888b.  888888 888 88888b.   .d88b.
//  888    888     "88b 888    888 888 "88b d88P"88b
//  888    888 .d888888 888    888 888  888 888  888
//  888  .d88P 888  888 Y88b.  888 888  888 Y88b 888
//  8888888P"  "Y888888  "Y888 888 888  888  "Y88888
//                                               888
//                                          Y8b d88P
//                                           "Y88P"
//   .d8888b.                    888
//  d88P  Y88b                   888
//  Y88b.                        888
//   "Y888b.   888  888 .d8888b  888888 .d88b.  88888b.d88b.
//      "Y88b. 888  888 88K      888   d8P  Y8b 888 "888 "88b
//        "888 888  888 "Y8888b. 888   88888888 888  888  888
//  Y88b  d88P Y88b 888      X88 Y88b. Y8b.     888  888  888
//   "Y8888P"   "Y88888  88888P'  "Y888 "Y8888  888  888  888
//                  888
//             Y8b d88P
//              "Y88P"

interface SetupDating {
  start: (npcid: npcid) => void;
  statusBar: () => string;
  statRefresh: () => void;
  tracking: () => void;
  pbar: (amt: number, color: string) => string;
  howAbout: (spot: string) => string;
  howAboutResult: (spot: string) => void;
  sel: (key: string) => void;
  locationPicker: () => string;
  activity: (actKey: string) => void;
  saySomething: (type: string) => void;
  aiQuery: (aiKeys: string[], note?: string) => number;
  aiString: (numResult: number) => string;
  npcChoice: () => string;
  end: () => void;
  tagText: (tag: string, name: string) => string;
}

interface awDateData {
  npcid: npcid;
  npc: NPC;
  name: string;
  start: number;
  qual: number;
  enjoy: [number, number];
  arouse: number;
  spot: string;
  spots: string[];
  flag: {};
  events: string[];
  proposed: string;
  ate: boolean;
  dessert: boolean;
  aiRes: string;
  convoTag: string;
  convoText: string;
  convoHist: string[];
}
setup.date = {} as SetupDating;

setup.date.start = function(npcid: npcid) {
  aw.L();
  if (!setup.npcid.test(npcid) || aw.npc[npcid] == null) {
    aw.con.warn(`Error: Date launched with invalid NPCID for date partner! Value: ${npcid}.`);
    return;
  }
  aw.date = { // Data object for the date
    npcid,
    npc: aw.npc[npcid],
    name: aw.npc[npcid].main.name,
    start: aw.time,
    qual: 50,
    enjoy: [50, 50],
    arouse: random(15, 25),
    spot: "none",
    spots: [],
    flag: {},
    events: [],
    proposed: "none",
    ate: false,
    dessert: false,
    aiRes: "na",
    convoTag: setup.cTag.getTag(3, false),
    convoText: "error",
    convoHist: [],
  };
  aw.date.convoHist.push(aw.date.convoTag);
  aw.date.convoText = setup.date.tagText(aw.date.convoTag, aw.date.name);
  const scen = {
    content: "<<include [[DateStart]]>>",
    sidebar: setup.date.statusBar(), // replace with svg builder function
    image: aw.npc[npcid].main.portrait,
    topImage: "IMG-ANewDateBanner",
    title: `The start of a date with ${aw.date.npc.main.name}`,
    allowSave: false,
    showTime: true,
    allowMenu: true,
    callback: setup.date.tracking,
  } as IntScenarioLaunchOptions;
  setup.scenario.launch(scen);
};

setup.date.statusBar = function(): string {
  let output = setup.ui.simplePbar(aw.date.qual, "#4f92ff", "Date Quality:");
  output += setup.ui.simplePbar(aw.date.enjoy[1], "#18f998", "NPC Enjoyment:");
  output += setup.ui.simplePbar(aw.date.arouse, "#ff96dd", "NPC Arousal:");
  const tim = aw.time - aw.date.start;
  let hours: number | string = Math.floor(tim / 60);
  if (hours === 0) {
    hours = "00";
  } else if (hours < 10) {
    hours = "0" + hours;
  }
  let mins: number | string = tim % 60;
  if (mins === 0) {
    mins = "00";
  } else if (mins < 10) {
    mins = "0" + mins;
  }
  output += `<span style="color:#e0e0e0;">Date Duration: ${hours}:${mins}</span>`;
  return output;
};

setup.date.statRefresh = function(): void {
  aw.replace("#Scene-Sidebar-Info", setup.date.statusBar());
};

// adds basic date information to NPC and player
setup.date.tracking = function(): void {
  aw.date.npc.rship.daysince = 0;
  aw.date.npc.rship.dates += 1;
  aw.date.npc.rship.met += 1;
  aw.date.npc.rship.companion += 25;
  aw.date.npc.rship.dating = true;
  // TODO rship.space modification
  setup.status.lonely(-20);
  setup.status.happy(1);
  setup.status.arousal(1);
  // add stress if unsure date - nerves
  if (!aw.date.npc.rship.lovers) {
    const stress = (aw.date.npc.rship.dating) ? 5 : 15;
    setup.status.stress(stress);
  }
};

setup.date.howAbout = function(spot: string): string {
  const phrase1 = either("gives your suggestion some thought.", "ponders your suggestion for a moment.", "takes a moment to consider.", " looks away for a moment, thinking.");
  const output = `<div id="howAbout">You suggest heading to ${aw.dateSpots[spot].name}.<br><br><<= aw.date.name>> ${phrase1} <span class="npc">Hmmmm</span><div id="pulsie" class="npc pulse">...</div></div><br><div><<comment "If you've noticed that the delay while the NPC is thinking seems a little long, rest assured that it isn't arbitrary. While you're waiting, the AW's learning software is determining how the NPC feels about your suggestion.">></div>`;
  setTimeout(() => setup.date.howAboutResult(spot), 50);
  return output;
};

setup.date.howAboutResult = function(spot: string): void {
  const air = setup.date.aiQuery(aw.dateSpots[spot].aiTags[0], `Query to get NPC's opinion on visiting a date spot (${aw.dateSpots[spot].name}).`);
  const ais = setup.date.aiString(air);
  aw.date.aiRes = ais;
  let output = "<br><br><span class='npc'>";
  switch (ais) {
    case "xn":
    case "ln":
      output += "Are you serious? There's no way I'd want to go there of all places...";
      break;
    case "mn":
      output += "Well, I'd rather not, but we can go if that's really what you want.";
      break;
    case "sn":
      output += "It isn't somewhere I'd choose, but I suppose we can go.";
      break;
    case "nn":
      output += "I guess that's okay, I don't have any objections.";
      break;
    case "sp":
      output += "Interesting choice, I suppose it could be fun.";
      break;
    case "mp":
      output += "Yeah, I think that'd be a nice place to go.";
      break;
    case "lp":
      output += "Oh, great pick. We should go!";
      break;
    case "xp":
      output += "Wow, that's one of my favorite places. Let's go!";
      break;
  }
  output += "</span><br><br>";
  output += `<<button "GO THERE">><<run aw.dateSpots[aw.date.proposed].arrive()>><</button>> <<button "ON SECOND THOUGHT">><<scenereplace>><<print setup.date.locationPicker()>><</scenereplace>><</button>>`;
  $("#pulsie").removeClass("pulse");
  aw.append("#howAbout", output);
};

setup.date.sel = function(key: string): void {
  if (key.slice(0, 1) === "'") {
    key = key.slice(1, -1);
  }
  aw.date.proposed = key;
  if (aw.dateSpots[key] == null) {
    aw.con.warn(`Given invalid key to setup.date.sel... value is ${key}`);
    aw.replace("#locationName", "Error - see console");
    return;
  }
  const namer = aw.dateSpots[key].name;
  aw.replace("#locationName", namer);
};

setup.date.locationPicker = function(): string {
  const restaurants: string[] = [];
  const desserts: string[] = [];
  const activities: string[] = [];
  aw.date.proposed = "none";
  const ᚥ = aw.dateSpots;
  let output = `<<button "THEIR CHOICE">><<scenereplace>><<print setup.date.npcChoice()>><</scenereplace>><</button>> <<button "SUGGEST LOCATION">><<if aw.date.proposed !== "none">><<scenereplace>><<print setup.date.howAbout(aw.date.proposed)>><</scenereplace>><<else>><<notify>>Choose a location to suggest first!<</notify>><</if>><</button>> <<button "CHOOSE LOCATION">><<if aw.date.proposed !== "none">><<run aw.dateSpots[aw.date.proposed].arrive()>><<else>><<notify>>Choose a location first!<</notify>><</if>><</button>><<tab>><span style="font-size:1.2rem;"><span class="head">Chosen Location:</span> <span id="locationName">None: click one below!</span></span><br><div id="dateLocationPicker">`;
  for (const spot of Object.keys(ᚥ)) {
    if (!aw.date.spots.includes(ᚥ[spot].key)) {
      switch (ᚥ[spot].category) {
        case "restaurant":
          if (!aw.date.ate) {
            restaurants.push(spot);
          }
          break;
        case "dessert":
          if (!aw.date.dessert) {
            desserts.push(spot);
          }
          break;
        default:
          activities.push(spot);
      }
    }
  }
  restaurants.sort();
  desserts.sort();
  activities.sort();
  if (!aw.date.ate && restaurants.length > 0) {
    output += `<div id="pickerSectionHead">Restaurant Locations</div>`;
    for (const key of restaurants) {
      output += ᚥ[key].print;
    }
  }
  if (!aw.date.dessert && desserts.length > 0) {
    output += `<div id="pickerSectionHead">Dessert Locations</div>`;
    for (const key of desserts) {
      output += ᚥ[key].print;
    }
  }
  if (activities.length > 0) {
    output += `<div id="pickerSectionHead">Activity Locations</div>`;
    for (const key of activities) {
      output += ᚥ[key].print;
    }
  }
  output += "</div>";
  return output;
};

setup.date.activity = function(actKey: string): void {
  if (actKey === "npc") {
    const avail = aw.dateSpots[aw.date.spot].allowedActs();
    if (avail.length < 2 || random(1, 40) < 11) {
      setup.date.npcChoice();
      return;
    }
    actKey = either(...avail);
  }
  const act = aw.dateSpots[aw.date.spot].activities[actKey];
  aw.date.flag[aw.date.spot][actKey] = true;
  let content = (act.twee.slice(0, 3) === "DSP") ? `<<include [[${act.twee}]]>>` : act.twee;
  const prep = act.prep(); // should do fancy things including adding time
  content += aw.dateSpots[aw.date.spot].buttonGen();
  // TODO function to determine effects/reaction from the choice.
  aw.date.qual += random(0, 3) - 1;
  aw.date.enjoy[1] += random(0, 5) - random(1, 2);
  aw.date.enjoy[0] += random(0, 3) - 1;
  aw.date.arouse += random(0, 3) - random(0, 1);
  setup.scenario.refresh(); // refresh to update after prep function
  setup.date.statRefresh();
  if (typeof prep === "boolean" && !prep) {
    aw.con.info(`Activity ${actKey} twee not played due to 'false' return value.`);
  } else {
    setup.scenario.replace(content);
  }
};

setup.date.saySomething = function(type: string): void {
  // generate some generic flirting and whatnot.
  // comp sexy rom deep
  let output;
  setup.time.add(5);
  setup.SCXfunc();
  const dc = random(11, 14);
  const ᛔ = State.active.variables;
  let tht: string;
  switch (type) {
    case "deep":
      setup.SCfunc("PS", dc);
      tht = either("Global warming wouldn't be a problem if we all just opened up our windows with the AC on, you know?", "I heard that semen is the number one cause of bad breath, but honestly, does that even <i>count</i> as bad breath?", "How is it that rhinos survived when all the other dinosaurs died?","Is bandwidth when everyone is fighting over the same wifi signal?");
      if (ᛔ.SCresult[1]) {
        tht = setup.deepThoughts(-1);
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You decide to try and spark some intellectual conversation.<br><br>@@.pc;You know, I was thinking. ${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} gives a little chuckle.<br><br>@@.npc;Huh, that's pretty neat.@@</p>`;
        aw.date.qual += random(2, 4);
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
      } else {
        output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        aw.date.qual -= random(1, 3);
        aw.date.enjoy[1] -= random(1, 3);
        aw.date.enjoy[0] -= random(1, 2);
        aw.date.arouse -= 1;
      }
      break;
    case "sexy":
      setup.SCfunc("SD", dc);
      tht = either("You know, I can't think of anything I love more than cock", "When do you think we'll get around to the fucking?", "Would you mind if I stopped by the gloryhole for a pick-me-up?");
      if (ᛔ.SCresult[1]) {
        tht = "[something sexy here]";
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You decide to try and get ${aw.date.name}'s engine running.<br><br>@@.pc;${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} enjoys it.<br><br>@@.npc;That's hot.@@</p>`;
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
        aw.date.arouse += random(5, 11);
      } else {
        output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        aw.date.qual -= random(1, 2);
        aw.date.enjoy[1] -= random(1, 3);
        aw.date.enjoy[0] -= random(1, 2);
        aw.date.arouse -= 1;
      }
      output += `<p><<ctn>>This is a placeholder for sexy (and fail) dialog items that are partially determined by your character's kinks and a few other things like your status and clothing. This should be pretty cool when it's ready, but it was a bit too much to get fully functional for this release.<</ctn>></p>`;
      break;
    case "rom":
      setup.SCfunc("CM", dc);
      tht = either("I feel like love is mostly about the fucking. I mean, if you have that, the rest just sort of happens, right?", "I love you more than that whore always hanging out on Pascal street loves coke.", "What do you think about getting some lover's tattoos with our names on them?");
      if (ᛔ.SCresult[1]) {
        tht = "[something romantic here]";
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You decide to try and let ${aw.date.name} know how much you care about them.<br><br>@@.pc;${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} is touched.<br><br>@@.npc;I really care about you too.@@</p>`;
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
        aw.date.arouse += random(2, 3);
        aw.date.npc.rship.likePC += random(2, 3);
        aw.date.npc.rship.likeNPC += random(2, 3);
        aw.date.npc.rship.lovePC += random(2, 4);
        aw.date.npc.rship.loveNPC += random(2, 4);
      } else {
        output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        aw.date.qual -= random(1, 2);
        aw.date.enjoy[1] -= random(1, 3);
        aw.date.enjoy[0] -= random(1, 2);
        aw.date.arouse -= random(2, 10);
        aw.date.npc.rship.likePC -= random(1, 2);
        aw.date.npc.rship.likeNPC -= random(1, 2);
        aw.date.npc.rship.lovePC -= random(1, 3);
        aw.date.npc.rship.loveNPC -= random(1, 3);
      }
      output += `<p><<ctn>>This is a placeholder for romantic (and fail) dialog items that are partially determined by your character's traits and some flags/relationship data. It was a bit too much to get fully functional for this release.<</ctn>></p>`;
      break;
      case "comp":
      setup.SCfunc("CM", dc);
      tht = either("Your eyes are so bright... just like nuclear explosions on a planet sentenced to exterminatus...", "I really like how good you are with hiding your imperfections with your clothes.", "Your are so awesome I can count that all your friends jerk off imagining you at least weekly.");
      if (ᛔ.SCresult[1]) {
        tht = "[some nice compliment here]";
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You want to please ${aw.date.name} with some compliment.<br><br>@@.pc;${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} is happy.<br><br>@@.npc;Oh you really think that? It is so sweet!@@</p>`;
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
        aw.date.arouse += random(1, 2);
        aw.date.npc.rship.likePC += random(2, 3);
        aw.date.npc.rship.likeNPC += random(2, 3);
        aw.date.npc.rship.lovePC += random(4, 7);
        aw.date.npc.rship.loveNPC += random(4, 7);
      } else {
        output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        aw.date.qual -= random(1, 3);
        aw.date.enjoy[1] -= random(1,4);
        aw.date.enjoy[0] -= random(1, 3);
        aw.date.arouse -= random(1, 3);
        aw.date.npc.rship.likePC -= random(2, 4);
        aw.date.npc.rship.likeNPC -= random(2, 4);
        aw.date.npc.rship.lovePC -= random(3, 7);
        aw.date.npc.rship.loveNPC -= random(3, 7);
      }
      output += `<p><<ctn>>This is a placeholder for compliment (and fail) dialog items that are partially determined by your character's traits and some flags/relationship data. It was a bit too much to get fully functional for this release.<</ctn>></p>`;
      break;
    default:
      output = "ERROR";
  }
  output += "<br>" + aw.dateSpots[aw.date.spot].buttonGen();
  setup.scenario.refresh();
  setup.date.statRefresh();
  setup.scenario.replace(output);
};

setup.date.aiQuery = function(aiKeys: string[], note?: string): number {
  if (aiKeys.length === 0) {
    aw.con.warn(`Dating AI Query made without any tags!`);
    aiKeys.push("actLover");
    aiKeys.push("tgtNPC");
    aiKeys.push("nearFuture");
    aiKeys.push("neutEthic");
    aiKeys.push("neutral");
    aiKeys.push("intimate");
  }
  const notxt = (note == null) ? `No note: NPC dating, NPC: ${aw.date.name}, Location:${aw.date.spot}.` : note;
  return setup.ai.query(aw.date.npc, notxt, ...aiKeys);
};

setup.date.aiString = function(numResult: number): string {
  let result: string;
  if (numResult <= 10) {
    result = "xn";
  } else if (numResult <= 20) {
    result = "ln";
  } else if (numResult < 35) {
    result = "ml";
  } else if (numResult <= 46) {
    result = "sn";
  } else if (numResult <= 55) {
    result = "nn";
  } else if (numResult <= 65) {
    result = "sp";
  } else if (numResult < 80) {
    result = "mp";
  } else if (numResult < 90) {
    result = "lp";
  } else {
    result = "xp";
  } // uses x=extra, l=large, m=medium, s=small notation for 2 letter code.
  return result;
};

setup.date.npcChoice = function(): string {
  const restaurants: string[] = [];
  const desserts: string[] = [];
  const activities: string[] = [];
  aw.date.proposed = "none";
  const ᚥ = aw.dateSpots;
  for (const spot of Object.keys(ᚥ)) {
    if (!aw.date.spots.includes(ᚥ[spot].key)) {
      switch (ᚥ[spot].category) {
        case "restaurant":
          restaurants.push(spot);
          break;
        case "dessert":
          desserts.push(spot);
          break;
        default:
          activities.push(spot);
      }
    }
  }
  let output: string;
  let sel: string;
  if (aw.date.enjoy[1] < 10 || aw.date.enjoy[1] < (aw.date.qual + (aw.date.arouse / 3))) {
    // end the date - unhappy
    output = "<<include [[DateLeaveSpotEndBad]]>>";
  } else if (!aw.date.ate && random(1, 40) > 10) {
    // pick a restaurant
    sel = either(...restaurants);
    const name = aw.dateSpots[sel].name;
    const txto = either(
      "I don't know about you, but I'm starved!",
      "I'm getting pretty hungry, I could definitely go for some food right about now.",
      "Well, what's a date without a nice meal?",
      `I'm thinking we'd better eat something so we have enough energy for later.@@ <<= aw.date.name>> gives you a wink.@@.npc;`);
    output = `<p>@@.npc;${txto} Let's head over to ${name} and eat.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<run aw.dateSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't mind eating, but you don't want to eat <b>there</b> of all places<<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
  } else if (aw.date.ate && !aw.date.dessert && random(1, 10) > 5) {
    // pick a dessert place
    sel = either(...desserts);
    const name = aw.dateSpots[sel].name;
    const txto = either(
      "I hope you saved room for dessert!",
      "I could really go for something sweet... aside from you, of course.",
      "I think it's time for a little treat.");
    output = `<p>@@.npc;${txto} Let's head over to ${name} for dessert.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<run aw.dateSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't mind dessert, but you don't want to eat <b>there</b> of all places<<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
  } else if ((aw.time - aw.date.start >= 120 && random(0, 120) < aw.date.arouse) || (aw.time - aw.date.start > 240 && aw.date.arouse >= 50)) {
    // sexitimes
    output = "<<include [[DateLeaveSpotSexitimes]]>>";
  } else if (aw.time - aw.date.start > 240) {
    // date end amicable
    output = "<<include [[DateLeaveSpotAmicable]]>>";
  } else {
    // pick a normal activity
    sel = either(...activities);
    const name = aw.dateSpots[sel].name;
    const txto = either(
      "Oh, I have an idea!",
      "I know something fun to do.",
      "Okay, I think that'll work...");
    output = `<p>@@.npc;${txto} Let's head over to ${name}.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<run aw.dateSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't really care for ${name}, isn't there something else? <<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
  }
  return output;
};

setup.date.end = function(): void {
  // should close out the date
  if (aw.date.enjoy[0] >= 50) {
    const hap = random(1, 2);
    setup.status.happy(hap);
    const str = random(5, 15) * -1;
    setup.status.stress(str);
    const lon = random(5, 15) * -1;
    setup.status.lonely(lon);
    aw.date.npc.rship.likeNPC += random(2, 3);
    aw.date.npc.rship.loveNPC += random(2, 4);
  } else {
    aw.date.npc.rship.likeNPC -= random(2, 3);
    aw.date.npc.rship.loveNPC -= random(2, 4);
  }
  if (aw.date.enjoy[1] >= 60) {
    aw.date.npc.rship.lovePC += random(2, 4);
    aw.date.npc.rship.likePC += random(2, 3);
  } else {
    aw.date.npc.rship.lovePC -= random(2, 4);
    aw.date.npc.rship.likePC -= random(2, 5);
  }
  setup.scenario.close();
  delete aw.date;
};

setup.date.tagText = function(tag: string, name: string): string {
  let output = "You spend some time talking about ";
  switch (tag) {
    case "seriousIllness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(2, 4);
      break;
    case "illness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "poorHealth":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "amazingClothes":
      output += `just how nice your clothes are. It seems that ${name} is taken by your fashion sense`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] += random(2, 4);
      break;
    case "niceClothes":
      output += `the challenge of choosing the right clothes for a date. It's a bit of an odd topic--on a date no less--but ${name} seems to enjoy it`;
      aw.date.arouse += random(1, 4);
      aw.date.enjoy[1] += random(1, 3);
      break;
    case "formalClothing":
      output += `how you dressed so elegantly for the occasion. ${name} seems to have a little trepidation about being under-dressed, but you manage to smooth things over`;
      aw.date.arouse -= random(1, 3);
      aw.date.enjoy[1] -= random(2, 5);
      aw.date.qual -= 1;
      break;
    case "slovenlyClothes":
      output += `your... <i>unique</i> choice of clothes for the evening`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(3, 5);
      aw.date.qual -= 5;
      break;
    case "superSexyClothes":
      output += `just how amazingly sexy your clothes are. ${name} seems to need a moment to calm down, in fact`;
      aw.date.arouse += random(12, 20);
      aw.date.enjoy[1] += random(5, 10);
      aw.date.qual += random(1, 4);
      break;
    case "sexyClothes":
      output += `just how sexy your clothes are. ${name} seems really taken with your outfit`;
      aw.date.arouse += random(8, 16);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 3);
      break;
    case "superCuteClothes":
      output += `how ludicrously cute your outfit is`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 4);
      break;
    case "cuteClothes":
      output += `how cute your outfit is`;
      aw.date.arouse += random(1, 3);
      aw.date.enjoy[1] += random(2, 6);
      aw.date.qual += random(1, 3);
      break;
    case "nakedBottom":
      output += `how you're walking around with your cunt exposed to the public`;
      aw.date.arouse += random(30, 40);
      aw.date.enjoy[1] -= random(1, 5);
      aw.date.qual -= random(10, 15);
      break;
    case "practNakedBottom":
      output += `how daring the lower portion of your outfit is, and how little it would get in the way of some intimate contact at the right moment`;
      aw.date.arouse += random(25, 35);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual += random(1, 3);
      break;
    case "exhibitBottom":
      output += `how much the lower portion of your outfit shows off, and how little it would get in the way of some intimate contact at the right moment`;
      aw.date.arouse += random(20, 30);
      aw.date.enjoy[1] += random(8, 13);
      aw.date.qual += random(1, 3);
      break;
    case "nakedTop":
      output += `the freedom of being topless, and just how nice your <<p tit.q>> breasts are`;
      aw.date.arouse += random(18, 26);
      aw.date.enjoy[1] += random(8, 13);
      aw.date.qual += random(1, 5);
      break;
    case "buckNaked":
      output += `how you're walking around buck naked and basically begging to be arrested`;
      aw.date.arouse += random(40, 50);
      aw.date.enjoy[1] -= random(0, 10);
      aw.date.qual -= random(10, 15);
      break;
    case "practNakedTop":
      output += `how your top really frees your breasts, and just how nice those <<p tit.q>> breasts are`;
      aw.date.arouse += random(16, 25);
      aw.date.enjoy[1] += random(8, 13);
      aw.date.qual += random(1, 5);
      break;
    case "exhibitTop":
      output += `the eye-catching way your top <i>mostly</i> manages to barely conceal your breasts, and just how nice your <<p tit.q>> breasts are`;
      aw.date.arouse += random(10, 20);
      aw.date.enjoy[1] += random(5, 10);
      aw.date.qual += random(1, 5);
      break;
    case "pussyAccess":
    case "assAccess":
    case "buttAccess":
    case "nipAccess":
    case "titsAccess":
      output += `how your clothes conveniently allow access to certain parts of your anatomy, should someone be interested..`;
      aw.date.arouse += random(20, 30);
      aw.date.enjoy[1] += random(5, 10);
      aw.date.qual += random(1, 5);
      break;
    case "wetClothes":
      output += `how you ended up getting soaking wet before your date`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] -= random(2, 5);
      aw.date.qual -= random(4, 8);
      break;
    case "stainedClothes":
      output += `how you ended up getting some rather suspicious stains on your clothes right before your date`;
      aw.date.arouse -= random(2, 5);
      aw.date.enjoy[1] -= random(5, 9);
      aw.date.qual -= random(7, 12);
      break;
    case "damagedClothes":
      output += `how you ended up damaging your clothes before your date`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] -= random(2, 5);
      aw.date.qual -= random(4, 8);
      break;
    case "kinkyClothes":
      output += `just how sexy your clothes are. ${name} seems really taken with your outfit`;
      aw.date.arouse += random(8, 16);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 3);
      break;
    case "nightwear":
      output += `your selection of lingerie, which of course you had to show to ${name} so they could be appreciated`;
      aw.date.arouse += random(8, 16);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 3);
      break;
    case "swimwear":
      output += `your unusual choice of wearing swimwear on your date`;
      aw.date.arouse += random(5, 10);
      aw.date.enjoy[1] += random(1, 5);
      aw.date.qual += random(0, 1);
      break;
    case "athleticClothes":
      output += `your... <i>unique</i> choice of athletic clothes for the evening`;
      aw.date.arouse -= random(1, 3);
      aw.date.enjoy[1] -= random(3, 5);
      aw.date.qual -= 5;
      break;
    case "lightPheromones":
      output += `just how alluring ${name} finds you`;
      aw.date.arouse += random(30, 40);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual += random(5, 10);
      break;
    case "pheromones":
      output += `${name}'s urges to just skip the date and get to the sex right away`;
      aw.date.arouse = 85 + random(1, 14);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual -= random(5, 10);
      break;
    case "goddess":
      output += `just how stricken ${name} is by your intoxicating beauty`;
      aw.date.arouse += random(40, 50);
      aw.date.enjoy[1] += random(15, 25);
      aw.date.qual += random(10, 20);
      break;
    case "hairyLegs":
      output += `about how long its been since you shaved your legs`;
      aw.date.arouse -= random(10, 22);
      aw.date.enjoy[1] -= random(5, 20);
      aw.date.qual -= random(5, 10);
      break;
    case "hairyPits":
      output += `about the armpit hair poking out from between your arms`;
      aw.date.arouse -= random(10, 22);
      aw.date.enjoy[1] -= random(5, 20);
      aw.date.qual -= random(5, 10);
      break;
    case "clownMakeup":
      output += `about your rather <i>special</i> choices with your makeup`;
      aw.date.arouse -= random(5, 10);
      aw.date.enjoy[1] -= random(3, 9);
      aw.date.qual -= random(5, 10);
      break;
    case "garishMakeup":
      output += `about your rather flashy makeup choices`;
      aw.date.arouse -= random(0, 5);
      aw.date.enjoy[1] -= random(2, 6);
      aw.date.qual -= random(4, 8);
      break;
    case "addicted":
      const drug = ↂ.pc.status.addict.max;
      const drugText = {
        sex: "sex, and how you hope to get some cocks tonight",
        alc: "booze. You even claim that you must've been Russian in a former life",
        heat: "heat, and how it makes sex so much better",
        satyr: "satyr, and how much sex it lets you have",
        focus: "focus, and how it's improved your life",
        cum: "drinking cum, and how you're looking forward to having some fresh later",
        zone: "zone, and how your life seems to really be on track these days",
        cream: "your pussy being filled with cum, and how you're looking forward to a big creampie later",
      };
      output += `how much you <b>love</b> ${drugText[drug]}`;
      break;
    case "withdrawal":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "stressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "depressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "sad":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "aroused":
      output += `your skin is flushed and glowing. You eventually reveal that you're incredibly horny...`;
      aw.date.arouse += random(20, 30);
      aw.date.enjoy[1] -= random(5, 13);
      aw.date.qual += random(2, 4);
      break;
    case "angry":
      output += `the stupid shit that's been going on in your life, and how pissed off you are about it`;
      aw.date.arouse -= random(5, 15);
      aw.date.enjoy[1] -= random(5, 15);
      aw.date.qual -= random(5, 10);
      break;
    case "bimbo":
      output += `excited you are to be going out, and stuff.`;
      aw.date.arouse += random(5, 10);
      aw.date.qual -= random(2, 6);
      break;
    case "perverted":
      output += `the porn the two of you have been watching lately. It's an odd, but effective icebreaker`;
      aw.date.arouse += random(15, 25);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual += random(2, 6);
      break;
    case "latePreg":
    case "preg":
      if (random(1, 3) === 1) {
        output += `how your pregnancy is coming along. You end up complaining a bit too much though`;
        aw.date.arouse -= random(3, 10);
        aw.date.enjoy[1] -= random(5, 10);
      } else {
        output += `how your pregnancy is coming along, and just how much you love being pregnant`;
        aw.date.arouse += random(5, 15);
        aw.date.enjoy[1] += random(3, 8);
      }
      break;
    case "drunk":
      output += `drunk you are, particularly after you let it sleep how easy it'd be to get into your pants if you have another drink or two.`;
      aw.date.arouse += random(3, 10);
      aw.date.enjoy[1] -= random(5, 10);
      break;
    case "tipsy":
      output += `how "clingy" you get when you've had a drink or two.`;
      aw.date.arouse += random(3, 10);
      break;
    case "mindbreak":
      output += ``;
      break;
    case "fullTits":
      output += `how stuffed with milk your breasts are because you weren't able to pump them. You confess that you think milking would probably be so much nicer if you had someone to give you a hand... or mouth`;
      aw.date.arouse += random(15, 20);
      aw.date.enjoy[1] += random(5, 10);
      break;
    default:
      output += either("a shocking story that hit the news recently", "what you think of the cockmongering match that was aired the other night", "how nice the weather has been recently", "how awful the weather has been recently", "about the trailer you saw for the Incubatrix sequel");
  }
  output += ".";
  return output;
};

