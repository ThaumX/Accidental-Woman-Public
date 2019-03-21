
// ██╗  ██╗ █████╗ ███╗   ██╗ ██████╗  ██████╗ ██╗   ██╗████████╗    ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
// ██║  ██║██╔══██╗████╗  ██║██╔════╝ ██╔═══██╗██║   ██║╚══██╔══╝    ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
// ███████║███████║██╔██╗ ██║██║  ███╗██║   ██║██║   ██║   ██║       ███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
// ██╔══██║██╔══██║██║╚██╗██║██║   ██║██║   ██║██║   ██║   ██║       ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
// ██║  ██║██║  ██║██║ ╚████║╚██████╔╝╚██████╔╝╚██████╔╝   ██║       ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
// ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝       ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
//

interface SetupHangout {
  propose: (npcId: string, hangPlace: string) => string | boolean;
  checkIfFree: (weekday: number, next: boolean, time: number, hangPlace: string, npcId: string) => string | boolean | undefined;
  scheduleHang: (weekday: number, next: boolean, time: number, hangPlace: string, npcId: string) => boolean;
  create: (npcId: string) => boolean;
  remove: (npcId: string) => boolean;
  moveToLoc: (npcId: string) => boolean;
  hang: (npcId: string, hangPlace: string) => boolean;
  start: (npcid: npcid) => void;
  statusBar: () => string;
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

interface awHangData {
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

setup.hang = {} as SetupHangout;

interface hangPlaces {
  [propName: string]: [string, string, string | boolean, string];
}

// FUNCTIONS

setup.hang.propose = function(npcId) {
  let proposeWeekDay;
  let proposeHours;
  let nextweek = false;
  let output = "";
  if (State.active.variables.date[1] > 6) {
    nextweek = true;
  } else {
    nextweek = false;
  }
  aw.con.info ("nextweek is " + nextweek);
  if (nextweek === true) {
    const futa = random(1, 3);
    if (futa === 1) { // next vacation day
      proposeWeekDay = aw.npc[npcId].sched.workdays.indexOf(false);
      proposeHours = random(11, 21);
    } else { // next working day evening
      proposeWeekDay = aw.npc[npcId].sched.workdays.indexOf(true);
      proposeHours = random((aw.npc[npcId].sched.workhours[1] + 1), 21);
    }
  } else {
    const futa = random(1, 3);
    if (futa === 1) { // next vacation day
      for (let i = 6; i > (State.active.variables.date[1] - 1); i--) {
        if (aw.npc[npcId].sched.workdays[i] === false) {
          proposeWeekDay = i;
          proposeHours = random(11, 21);
        }
      }
    } else { // next working day evening
      for (let i = 6; i > (State.active.variables.date[1] - 1); i--) {
        if (aw.npc[npcId].sched.workdays[i] === true) {
          proposeWeekDay = i;
          proposeHours = random((aw.npc[npcId].sched.workhours[1] + 1), 21);
        }
      }
      if (proposeWeekDay == null) {
        nextweek = true;
        proposeWeekDay = aw.npc[npcId].sched.workdays.indexOf(true);
        proposeHours = random((aw.npc[npcId].sched.workhours[1] + 1), 21);
      }
    }
  }
  if (proposeWeekDay < State.active.variables.date[0] && nextweek === false) {
    nextweek = true;
  }
  const proposePlace = Object.keys(aw.hangPlaces)[random(0, 3)];
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  output += (nextweek) ? "Maybe next " : "Maybe this ";
  output += `${weekdays[(proposeWeekDay - 1)]}, at ${proposeHours}:00 in the ${aw.hangPlaces[proposePlace][3]}?`;
  aw.con.info ("output is " + proposeWeekDay + " " + proposeHours + " " + proposePlace);
  ↂ.sched.npcHang[npcId] = [proposeWeekDay, nextweek, proposeHours, npcId, false, proposePlace];
  return output;
};

setup.hang.checkIfFree = function(weekday, next, time, hangPlace, npcId) {
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Setup.hang.checkIfFree was supplied with npcid ${npcId} which was not found in aw.npc!`);
    return "Sorry, seems like some error happened :(";
  }
  if (next === false) {
    if (weekday > State.active.variables.date[0]) {
      aw.con.info("weekday > State.active.variables.hang[0]");
      if (scheduleCheck(weekday, next, time, npcId) === true) {
        setup.hang.scheduleHang(weekday, next, time, hangPlace, npcId);
        return "Okay, seems fine!";
      } else {
        return scheduleCheck(weekday, next, time, npcId);
      }
    } else if (weekday === State.active.variables.date[0]) {
      if ((time + 1) > State.active.variables.date[0]) {
        aw.con.info("(time+1) > State.active.variables.time[0]");
        if (scheduleCheck(weekday, next, time, npcId) === true) {
          setup.hang.scheduleHang(weekday, next, time, hangPlace, npcId);
          return "Okay, seems fine!";
        } else {
          return scheduleCheck(weekday, next, time, npcId);
        }
      } else { // Einstein is chasing us armed with his giant timecock. We are doomed.
        aw.con.warn("hang must be scheduled in the future. Retrospective reality changing is prohibited.");
        return "That is the past already, silly!";
      }
    } else if (weekday < State.active.variables.date[0]) { // Oh noes he is doing that again.
      aw.con.warn("hang must be scheduled in the future. Retrospective reality changing is prohibited.");
      return "That is the past already, silly!";
    }
  } else {
    if (scheduleCheck(weekday, next, time, npcId) === true) {
      setup.hang.scheduleHang(weekday, next, time, hangPlace, npcId);
      return "Okay, seems fine!";
      } else {
        return scheduleCheck(weekday, next, time, npcId);
    }
  }

  function scheduleCheck(weekdayo: number, nexto: boolean, timeo: number, npcIdo: string) {
    aw.con.info("sheduleCheck started with" + weekdayo + " " + timeo + " week " + nexto);
    if (aw.npc[npcIdo].sched.workdays[(weekdayo - 1)]) {
      if (time > aw.npc[npcIdo].sched.workhours[0] && timeo < aw.npc[npcIdo].sched.workhours[1]) {
        aw.con.info("I will be working.");
        return "I will be working.";
      } else {
        aw.con.info("Seems fine");
        return true;
      }
    } else if (timeo > 23) {
      aw.con.info("Player tried to schedule the hang later than interface allows. Hmmm.");
      return "It will be too late!";
    } else {
      aw.con.info("Seems fine");
      return true;
    }
  }
  return "Some weird error happened in NPC dating check system :(";
};

setup.hang.scheduleHang = function(weekday, next, time, hangPlace, npcId) { // Poltergeist!
  const name = `Hangout - ${aw.npc[npcId].main.name}.`;
  let bliniWeek;
  if (next) {
    bliniWeek = (aw.timeArray[3] + 1);
  } else {
    bliniWeek = aw.timeArray[3];
  }
  aw.con.info(`${weekday}, ${bliniWeek}, ${aw.timeArray[4]}, ${aw.timeArray[5]} and time is ${time}`);
  const helloPapa = (setup.time.dateToVal([weekday, bliniWeek, aw.timeArray[4], aw.timeArray[5]])) + (time * 60);
  setup.sched.new(name, "hangout", true, helloPapa, false, aw.hangPlaces[hangPlace][3], hangPlace, true, [npcId], `You have arranged a hangout with ${aw.npc[npcId].main.name} ${aw.npc[npcId].main.surname}. Better don't miss it!`);
  ↂ.sched.npcHang[npcId][4] = true;
  ↂ.sched.npcHang[npcId][5] = hangPlace;
  ↂ.flag.schedHangs.push(npcId);
  return true;
};

setup.hang.create = function(npcId) {
  if (ↂ.flag.schedHangs.includes(npcId)) {
    aw.replace("#hangScheduler", "<<include [[hangScheduleMenuAlreadySet]]>>");
    return false;
  } else {
    ↂ.sched.npcHang[npcId][3] = npcId;
    aw.replace("#hangScheduler", "<<include [[hangScheduleMenu]]>>");
    return true;
  }
};

setup.hang.remove = function(npcId) {
  if (npcId == null) {
    aw.con.warn("No argument was supplied for ↂ.flag.schedHangs!");
    return false;
  }
  if (ↂ.flag.schedHangs.includes(npcId) && ↂ.sched.npcHang !== undefined) {
    ↂ.flag.schedHangs.splice((ↂ.flag.schedHangs.indexOf(npcId)), 1);
    delete ↂ.sched.npcHang[npcId];
    return true;
  } else {
    aw.con.warn("hang flag not found in the ↂ.flag.schedHangs!");
    return false;
  }
};

setup.hang.hang = function(npcId, hangPlace) {
  if (npcId == null) {
    aw.con.warn("no npc id was supplied to setup.hang.hang");
    return false;
  }
  const ᛔ = State.active.variables;
  const day = ᛔ.date[0] as 1 | 2 | 3 | 4 | 5 | 6 | 7;
  const week = ᛔ.date[1];
  if (ↂ.flag.schedHangs.includes(npcId)) {
    setup.hang.remove(npcId);
    for (let i = 0; i < ↂ.plans.current.length; i++) {
      if (ↂ.plans.current[i].type === "hangout" && ↂ.plans.current[i].npc[0] === npcId) {
        ↂ.plans.current[i].missed = false;
      }
    }
    /*setup.dialog("Dating", `Wohoo! Don't forget that proper ladies never suck it on the first hang. <<comment "This is a placeholder now, but in next releases there will be actual dating :3">><<uphangbar>>`);*/
    setup.hang.start(npcId);
    return true;
  } else {
    aw.con.warn("hang flag not found in the ↂ.flag.schedHangs!");
    return false;
  }
};

setup.hang.start = function(npcid: npcid) {
  aw.L();
  if (!setup.npcid.test(npcid) || aw.npc[npcid] == null) {
    aw.con.warn(`Error: hang launched with invalid NPCID for hang partner! Value: ${npcid}.`);
    return;
  }
  aw.hang = { // Data object for the hang
    npcid,
    npc: aw.npc[npcid],
    name: aw.npc[npcid].main.name,
    start: aw.time,
    qual: 50,
    enjoy: [50, 50],
    arouse: random(0, 5), // i ll leave it here for future
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
  aw.hang.convoHist.push(aw.hang.convoTag);
  aw.hang.convoText = setup.hang.tagText(aw.hang.convoTag, aw.hang.name);
  const scen = {
    content: "<<include [[HangStart]]>>",
    sidebar: setup.hang.statusBar(), // replace with svg builder function
    image: aw.npc[npcid].main.portrait,
    topImage: "IMG-ANewhangBanner",
    title: `The start of a hang with ${aw.hang.npc.main.name}`,
    allowSave: false,
    showTime: true,
    allowMenu: true,
    callback: setup.hang.tracking,
  } as IntScenarioLaunchOptions;
  setup.scenario.launch(scen);
};

setup.hang.statusBar = function(): string {
  let output = setup.ui.simplePbar(aw.hang.qual, "#4f92ff", "Hangout Quality:");
  output += setup.ui.simplePbar(aw.hang.enjoy[1], "#18f998", "NPC Enjoyment:");
  const tim = aw.time - aw.hang.start;
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
  output += `<span style="color:#e0e0e0;">Hangout Duration: ${hours}:${mins}</span>`;
  return output;
};

// adds basic hang information to NPC and player
setup.hang.tracking = function(): void {
  aw.hang.npc.rship.daysince = 0;
  aw.hang.npc.rship.met += 1;
  // TODO rship.space modification
  setup.status.lonely(-20);
  setup.status.happy(1);
};

setup.hang.howAbout = function(spot: string): string {
  const phrase1 = either("gives your suggestion some thought.", "ponders your suggestion for a moment.", "takes a moment to consider.", " looks away for a moment, thinking.");
  const output = `<div id="howAbout">You suggest heading to ${aw.hangSpots[spot].name}.<br><br><<= aw.hang.name>> ${phrase1} <span class="npc">Hmmmm</span><div id="pulsie" class="npc pulse">...</div></div><br><div><<comment "If you've noticed that the delay while the NPC is thinking seems a little long, rest assured that it isn't arbitrary. While you're waiting, the AW's learning software is determining how the NPC feels about your suggestion.">></div>`;
  setTimeout(() => setup.hang.howAboutResult(spot), 50);
  return output;
};

setup.hang.howAboutResult = function(spot: string): void {
  const air = setup.hang.aiQuery(aw.hangSpots[spot].aiTags[0], `Query to get NPC's opinion on visiting a spot (${aw.hangSpots[spot].name}).`);
  const ais = setup.hang.aiString(air);
  aw.hang.aiRes = ais;
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
  output += `<<button "GO THERE">><<run aw.hangSpots[aw.hang.proposed].arrive()>><</button>> <<button "ON SECOND THOUGHT">><<scenereplace>><<print setup.hang.locationPicker()>><</scenereplace>><</button>>`;
  $("#pulsie").removeClass("pulse");
  aw.append("#howAbout", output);
};

setup.hang.sel = function(key: string): void {
  if (key.slice(0, 1) === "'") {
    key = key.slice(1, -1);
  }
  aw.hang.proposed = key;
  if (aw.hangSpots[key] == null) {
    aw.con.warn(`Given invalid key to setup.hang.sel... value is ${key}`);
    aw.replace("#locationName", "Error - see console");
    return;
  }
  const namer = aw.hangSpots[key].name;
  aw.replace("#locationName", namer);
};

setup.hang.locationPicker = function(): string {
  const restaurants: string[] = [];
  const activities: string[] = [];
  aw.hang.proposed = "none";
  const ᚥ = aw.hangSpots;
  let output = `<<button "THEIR CHOICE">><<scenereplace>><<print setup.hang.npcChoice()>><</scenereplace>><</button>> <<button "SUGGEST LOCATION">><<if aw.hang.proposed !== "none">><<scenereplace>><<print setup.hang.howAbout(aw.hang.proposed)>><</scenereplace>><<else>><<notify>>Choose a location to suggest first!<</notify>><</if>><</button>> <<button "CHOOSE LOCATION">><<if aw.hang.proposed !== "none">><<run aw.hangSpots[aw.hang.proposed].arrive()>><<else>><<notify>>Choose a location first!<</notify>><</if>><</button>><<tab>><span style="font-size:1.2rem;"><span class="head">Chosen Location:</span> <span id="locationName">None: click one below!</span></span><br><div id="dateLocationPicker">`;
  for (const spot of Object.keys(ᚥ)) {
    if (!aw.hang.spots.includes(ᚥ[spot].key)) {
      switch (ᚥ[spot].category) {
        case "restaurant":
          if (!aw.hang.ate) {
            restaurants.push(spot);
          }
          break;
        default:
          activities.push(spot);
      }
    }
  }
  restaurants.sort();
  activities.sort();
  if (!aw.hang.ate && restaurants.length > 0) {
    output += `<div id="pickerSectionHead">Food Locations</div>`;
    for (const key of restaurants) {
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

setup.hang.activity = function(actKey: string): void {
  if (actKey === "npc") {
    const avail = aw.hangSpots[aw.hang.spot].allowedActs();
    if (avail.length < 2 || random(1, 40) < 11) {
      setup.hang.npcChoice();
      return;
    }
    actKey = either(...avail);
  }
  const act = aw.hangSpots[aw.hang.spot].activities[actKey];
  aw.hang.flag[aw.hang.spot][actKey] = true;
  let content = (act.twee.slice(0, 3) === "DSP") ? `<<include [[${act.twee}]]>>` : act.twee;
  const prep = act.prep(); // should do fancy things including adding time
  content += aw.hangSpots[aw.hang.spot].buttonGen();
  // TODO function to determine effects/reaction from the choice.
  aw.hang.qual += random(0, 3) - 1;
  aw.hang.enjoy[1] += random(0, 5) - random(1, 2);
  aw.hang.enjoy[0] += random(0, 3) - 1;
  setup.scenario.refresh(); // refresh to uphang after prep function
  if (typeof prep === "boolean" && !prep) {
    aw.con.info(`Activity ${actKey} twee not played due to 'false' return value.`);
  } else {
    setup.scenario.replace(content);
  }
};

setup.hang.saySomething = function(type: string): void {
  // generate some generic talking and whatnot.
  // joke deep
  let output;
  setup.time.add(5);
  setup.SCXfunc();
  const dc = random(11, 14);
  const ᛔ = State.active.variables;
  let tht: string;
  switch (type) {
    case "deep":
      setup.SCfunc("PS", dc);
      tht = either("Global warming wouldn't be a problem if we all just opened up our windows with the AC on, you know?", "I heard that semen is the number one cause of bad breath, but honestly, does that even <i>count</i> as bad breath?", "How is it that rhinos survived when all the other dinosaurs died?", "Is bandwidth when everyone is fighting over the same wifi signal?");
      if (ᛔ.SCresult[1]) {
        tht = setup.deepThoughts(-1);
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You decide to try and spark some intellectual conversation.<br><br>@@.pc;You know, I was thinking. ${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.hang.name} gives a little chuckle.<br><br>@@.npc;Huh, that's pretty neat.@@</p>`;
        aw.hang.qual += random(2, 4);
        aw.hang.enjoy[1] += random(1, 3);
        aw.hang.enjoy[0] += random(1, 2);
      } else {
        output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        aw.hang.qual -= random(1, 3);
        aw.hang.enjoy[1] -= random(1, 3);
        aw.hang.enjoy[0] -= random(1, 2);
      }
      break;
      case "joke":
        setup.SCfunc("CM", dc);
        tht = either("Have you heard about the restaurant on the moon? Terrible reviews, there was no atmosphere.", "Want to hear a joke about construction? I'm still working on it.", "What do you call a man with a rubber toe? Roberto.", `Two goldfish are in a tank. One says to the other, "do you know how to drive this thing?".`);
        if (ᛔ.SCresult[1]) {
          tht = "[some good joke here]";
        }
        output = `<center>${ᛔ.SCtext[1]}</center><p>You think it is just a right moment to cheer ${aw.hang.name} up with some killing joke.<br><br>@@.pc;Oh, I am sure you never heard this one! ${tht}@@</p>`;
        if (ᛔ.SCresult[1]) {
          output += `<p>${aw.hang.name} laughs loudly.<br><br>@@.npc;Hah! This one is brilliant!@@</p>`;
          aw.hang.qual += random(2, 4);
          aw.hang.enjoy[1] += random(3, 5);
          aw.hang.enjoy[0] += random(2, 4);
        } else {
          output += `<p>@@.npc;Well... that was certainly a joke I guess.@@</p>`;
          aw.hang.qual -= random(1, 3);
          aw.hang.enjoy[1] -= random(1, 3);
          aw.hang.enjoy[0] -= random(1, 2);
        }
        break;
    default:
      output = "ERROR";
  }
  output += "<br>" + aw.hangSpots[aw.hang.spot].buttonGen();
  setup.scenario.refresh();
  setup.scenario.replace(output);
};

setup.hang.aiQuery = function(aiKeys: string[], note?: string): number {
  if (aiKeys.length === 0) {
    aw.con.warn(`Hanging AI Query made without any tags!`);
    aiKeys.push("tgtNPC");
    aiKeys.push("nearFuture");
    aiKeys.push("neutEthic");
    aiKeys.push("neutral");
  }
  const notxt = (note == null) ? `No note: NPC hanging, NPC: ${aw.hang.name}, Location:${aw.hang.spot}.` : note;
  return setup.ai.query(aw.hang.npc, notxt, ...aiKeys);
};

setup.hang.aiString = function(numResult: number): string {
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

setup.hang.npcChoice = function(): string {
  const restaurants: string[] = [];
  const desserts: string[] = [];
  const activities: string[] = [];
  aw.hang.proposed = "none";
  const ᚥ = aw.hangSpots;
  for (const spot of Object.keys(ᚥ)) {
    if (!aw.hang.spots.includes(ᚥ[spot].key)) {
      switch (ᚥ[spot].category) {
        case "restaurant":
          restaurants.push(spot);
          break;
        default:
          activities.push(spot);
      }
    }
  }
  let output: string;
  let sel: string;
  if (aw.hang.enjoy[1] < 10 || aw.hang.enjoy[1] < (aw.hang.qual - 10)) {
    // end the hang - unhappy
    output = "<<include [[HangLeaveSpotEndBad]]>>";
  } else if (!aw.hang.ate && random(1, 40) > 10) {
    // pick a restaurant
    sel = either(...restaurants);
    const name = aw.hangSpots[sel].name;
    const txto = either(
      "I don't know about you, but I'm starved!",
      "I'm getting pretty hungry, I could definitely go for some food right about now.",
      "Well, what's a hang without a nice meal?",
      `I'm thinking we'd better eat something so we have enough energy for later.@@ <<= aw.hang.name>> gives you a wink.@@.npc;`);
    output = `<p>@@.npc;${txto} Let's head over to ${name} and eat.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<run aw.hangSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't mind eating, but you don't want to eat <b>there</b> of all places<<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
  } else if (aw.time - aw.hang.start > 240) {
    // hang end amicable
    output = "<<include [[HangLeaveSpotAmicable]]>>";
  } else {
    // pick a normal activity
    sel = either(...activities);
    const name = aw.hangSpots[sel].name;
    const txto = either(
      "Hmm I am thinking about having some fun.",
      "I wonder how to entertain us now.",
      "Oh, I have an idea!",
      "I know something fun to do.",
      "Okay, I think that'll work...");
    output = `<p>@@.npc;${txto} Let's head over to ${name}.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<run aw.hangSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't really care for ${name}, isn't there something else? <<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
  }
  return output;
};

setup.hang.end = function(): void {
  // should close out the hang
  if (aw.hang.enjoy[0] >= 50) {
    const hap = random(1, 2);
    setup.status.happy(hap);
    const str = random(5, 15) * -1;
    setup.status.stress(str);
    const lon = random(5, 15) * -1;
    setup.status.lonely(lon);
    aw.hang.npc.rship.likeNPC += random(3, 5);
    aw.hang.npc.rship.loveNPC += random(0, 1);
  } else {
    aw.hang.npc.rship.likeNPC -= random(3, 5);
  }
  if (aw.hang.enjoy[1] >= 60) {
    aw.hang.npc.rship.lovePC += random(0, 1);
    aw.hang.npc.rship.likePC += random(4, 5);
  } else {
    aw.hang.npc.rship.lovePC -= random(0, 1);
    aw.hang.npc.rship.likePC -= random(4, 7);
  }
  setup.scenario.close();
  delete aw.hang;
};

setup.hang.tagText = function(tag: string, name: string): string {
  let output = "You spend some time talking about ";
  switch (tag) {
    case "seriousIllness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.hang.enjoy[1] -= random(2, 4);
      break;
    case "illness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.hang.enjoy[1] -= random(1, 3);
      break;
    case "poorHealth":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.hang.enjoy[1] -= random(1, 3);
      break;
    case "amazingClothes":
      output += `just how nice your clothes are. It seems that ${name} is taken by your fashion sense`;
      aw.hang.enjoy[1] += random(2, 4);
      break;
    case "niceClothes":
      output += `the challenge of choosing the nice looking clothes. ${name} seems to enjoy it`;
      aw.hang.enjoy[1] += random(1, 3);
      break;
    case "formalClothing":
      output += `how you dressed so elegantly for the occasion. ${name} seems to have a little trepidation about being under-dressed, but you manage to smooth things over`;
      aw.hang.enjoy[1] -= random(1, 3);
      aw.hang.qual -= 1;
      break;
    case "slovenlyClothes":
      output += `how slovenly you look today`;
      aw.hang.enjoy[1] -= random(5, 7);
      aw.hang.qual -= 5;
      break;
    case "superSexyClothes":
      output += `just how amazingly sexy your clothes are. ${name} is a bit stunned and has no idea why did you wear that way on a simple hangout.`;
      aw.hang.enjoy[1] -= random(1, 3);
      aw.hang.qual += random(1, 4);
      break;
    case "sexyClothes":
      output += `just how sexy your clothes are. ${name} is pretty sure this kind of outfit grants you all kind of attention.`;
      aw.hang.enjoy[1] += random(2, 4);
      aw.hang.qual += random(1, 3);
      break;
    case "superCuteClothes":
      output += `how ludicrously cute your outfit is`;
      aw.hang.enjoy[1] += random(3, 7);
      aw.hang.qual += random(1, 4);
      break;
    case "cuteClothes":
      output += `how cute your outfit is`;
      aw.hang.enjoy[1] += random(2, 6);
      aw.hang.qual += random(1, 3);
      break;
    case "nakedBottom":
      output += `how you're walking around with your cunt exposed to the public, and how ${name} is not comfortable by your appearance`;
      aw.hang.enjoy[1] -= random(2, 8);
      aw.hang.qual -= random(10, 15);
      break;
    case "practNakedBottom":
      output += `how daring the lower portion of your outfit is`;
      aw.hang.enjoy[1] -= random(1, 5);
      aw.hang.qual -= random(1, 3);
      break;
    case "exhibitBottom":
      output += `how much the lower portion of your outfit shows off, and how ${name} is not comfortable by your appearance`;
      aw.hang.enjoy[1] -= random(0, 4);
      aw.hang.qual -= random(1, 3);
      break;
    case "nakedTop":
      output += `the freedom of being topless, and how ${name} is impressed by your appearance`;
      aw.hang.enjoy[1] += random(0, 4);
      aw.hang.qual += random(1, 5);
      break;
    case "buckNaked":
      output += `how you're walking around buck naked and basically begging to be arrested, and how ${name} is not comfortable by your appearance`;
      aw.hang.enjoy[1] -= random(5, 18);
      aw.hang.qual -= random(10, 15);
      break;
    case "practNakedTop":
      output += `how your top really frees your breasts. ${name} is impressed by your bravery`;
      aw.hang.enjoy[1] += random(4, 8);
      aw.hang.qual += random(1, 5);
      break;
    case "exhibitTop":
      output += `the eye-catching way your top <i>mostly</i> manages to barely conceal your breasts. ${name} is impressed by your bravery`;
      aw.hang.enjoy[1] += random(5, 10);
      aw.hang.qual += random(1, 5);
      break;
    case "pussyAccess":
    case "assAccess":
    case "buttAccess":
    case "nipAccess":
    case "titsAccess":
      output += `how your clothes conveniently allow access to certain parts of your anatomy`;
      aw.hang.enjoy[1] += random(0, 3);
      aw.hang.qual += random(1, 5);
      break;
    case "wetClothes":
      output += `how you ended up getting soaking wet just before you meet`;
      aw.hang.qual -= random(4, 8);
      break;
    case "stainedClothes":
      output += `how you ended up getting some rather suspicious stains on your clothes`;
      aw.hang.enjoy[1] -= random(1, 8);
      aw.hang.qual -= random(7, 12);
      break;
    case "damagedClothes":
      output += `how you ended up damaging your clothes so much`;
      aw.hang.enjoy[1] -= random(1, 4);
      aw.hang.qual -= random(4, 8);
      break;
    case "kinkyClothes":
      output += `just how sexy your clothes are. ${name} seems a bit disturbed`;
      aw.hang.enjoy[1] -= random(3, 7);
      aw.hang.qual -= random(1, 3);
      break;
    case "nightwear":
      output += `your decision to go outside in your lingerie, which is a pretty unusual attire to go out in`;
      aw.hang.enjoy[1] -= random(3, 7);
      aw.hang.qual -= random(1, 3);
      break;
    case "swimwear":
      output += `your unusual choice of wearing swimwear outside of the pool`;
      aw.hang.enjoy[1] -= random(1, 5);
      aw.hang.qual -= random(0, 1);
      break;
    case "athleticClothes":
      output += `your choice of convenient sport wear`;
      aw.hang.enjoy[1] += random(3, 5);
      aw.hang.qual += 5;
      break;
    case "lightPheromones":
      output += `how good you smell today`;
      aw.hang.enjoy[1] += random(10, 15);
      aw.hang.qual += random(5, 10);
      break;
    case "pheromones":
      output += `how disturbed ${name} is with that magnificent smell of yours`;
      aw.hang.enjoy[1] += random(10, 15);
      aw.hang.qual -= random(5, 10);
      break;
    case "goddess":
      output += `how you manage to be so beautiful`;
      aw.hang.enjoy[1] += random(8, 15);
      aw.hang.qual += random(10, 20);
      break;
    case "hairyLegs":
      output += `about how long its been since you shaved your legs`;
      aw.hang.enjoy[1] -= random(2, 6);
      aw.hang.qual -= random(1, 4);
      break;
    case "hairyPits":
      output += `about the armpit hair poking out from between your arms`;
      aw.hang.enjoy[1] -= random(2, 6);
      aw.hang.qual -= random(1, 4);
      break;
    case "clownMakeup":
      output += `about your rather <i>special</i> choices with your makeup and how fun is too see you with it on`;
      aw.hang.enjoy[1] += random(3, 9);
      aw.hang.qual -= random(5, 10);
      break;
    case "garishMakeup":
      output += `about your rather flashy makeup choices`;
      aw.hang.enjoy[1] -= random(2, 6);
      aw.hang.qual -= random(4, 8);
      break;
    case "addicted":
      const drug = ↂ.pc.status.addict.max;
      const drugText = {
        sex: "sex, and how you are thirsty for a good fucking",
        alc: "booze, and how important is to wet your whistle as soon as possible.",
        heat: `heat, and how concerned is ${name} about your possible health issues`,
        satyr: `satyr, and how concerned is ${name} about your possible health issues`,
        focus: `focus, and how concerned is ${name} about your possible health issues`,
        cum: `drinking cum, and how embarrassed ${name} feels with this topic`,
        zone: `zone, and how concerned is ${name} about your possible health issues`,
        cream: `your pussy being filled with cum, and how embarrassed ${name} feels with this topic`,
      };
      output += `how much you <b>love</b> ${drugText[drug]}`;
      aw.hang.enjoy[1] -= random(2, 6);
      aw.hang.qual -= random(4, 8);
      break;
    case "withdrawal":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.hang.enjoy[1] -= random(1, 3);
      break;
    case "stressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.hang.enjoy[1] -= random(1, 3);
      break;
    case "depressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.hang.enjoy[1] -= random(1, 3);
      break;
    case "sad":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.hang.enjoy[1] -= random(1, 3);
      break;
    case "aroused":
      output += `your skin is flushed and glowing making ${name} believe you being anxious for some reason`;
      aw.hang.enjoy[1] -= random(3, 9);
      aw.hang.qual += random(0, 2);
      break;
    case "angry":
      output += `the stupid shit that's been going on in your life, and how pissed off you are about it`;
      break;
    case "bimbo":
      output += `excited you are to spend some time together like bff, and stuff`;
      aw.hang.qual += random(2, 6);
      break;
    case "perverted":
      output += `the porn the two of you have been watching lately`;
      aw.hang.enjoy[1] += random(10, 15);
      aw.hang.qual += random(2, 6);
      break;
    case "latePreg":
    case "preg":
      if (random(1, 3) === 1) {
        output += `how your pregnancy is coming along. You end up complaining a bit too much though`;
        aw.hang.enjoy[1] -= random(5, 10);
      } else {
        output += `how your pregnancy is coming along, and just how much you love being pregnant`;
        aw.hang.enjoy[1] += random(5, 12);
      }
      break;
    case "drunk":
      output += `drunk you are right now`;
      aw.hang.enjoy[1] -= random(0, 5);
      break;
    case "tipsy":
      output += `how good you feel after that drink you had just before you met ${name}`;
      aw.hang.enjoy[1] += random(0, 5);
      break;
    case "mindbreak":
      output += ``;
      break;
    case "fullTits":
      output += `how stuffed with milk your breasts are because you weren't able to pump them.`;
      aw.hang.enjoy[1] -= random(0, 7);
      break;
    default:
      output += either("a shocking story that hit the news recently", "what you think of the cockmongering match that was aired the other night", "how nice the weather has been recently", "how awful the weather has been recently", "about the trailer you saw for the Incubatrix sequel", "last news");
  }
  output += ".";
  return output;
};

aw.hangPlaces = {
  park: ["downtown", "park", false, "Central park"],
  shakenpop: ["downtown", "club", "shakenpopentrance", "Shake & Pop"],
  mall: ["downtown", "mall", false, "Mall"],
  amuse: ["downtown", "amuse", false, "Amusement district"],
};

// MACRO

Macro.add("hangscheduler", {
  handler() {
    if (this.args.length === 0) {
      return this.error("hangscheduler Macro requires an npcid.");
    } else if ("string" !== typeof this.args[0]) {
      return this.error("Incorrect data type for hangscheduler macro - string expected.");
    }
    const npcId = (setup.npcid.test(this.args[0])) ? this.args[0] : "fail";
    if (npcId === "fail") {
      return this.error(`hangscheduler macro requires valid npcid, provided: ${this.args[0]} is not valid.`);
    }
    let output: string;
    if (ↂ.flag.schedHangs.includes(npcId)) {
      output = "<<include [[hangScheduleMenuAlreadySet]]>>";
    } else {
      if (ↂ.sched.npcHang[npcId] == null) {
        ↂ.sched.npcHang[npcId] = [0, false, 0, "none", false, "none"];
      }
      ↂ.sched.npcHang[npcId][3] = npcId;
      output = "<<include [[hangScheduleMenu]]>>";
    }
    return new Wikifier(this.output, output);
  },
});

