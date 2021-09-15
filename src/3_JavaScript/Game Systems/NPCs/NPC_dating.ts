/*

███▄▄▄▄      ▄███████▄  ▄████████      ████████▄     ▄████████     ███      ▄█  ███▄▄▄▄      ▄██████▄
███▀▀▀██▄   ███    ███ ███    ███      ███   ▀███   ███    ███ ▀█████████▄ ███  ███▀▀▀██▄   ███    ███
███   ███   ███    ███ ███    █▀       ███    ███   ███    ███    ▀███▀▀██ ███▌ ███   ███   ███    █▀
███   ███   ███    ███ ███             ███    ███   ███    ███     ███   ▀ ███▌ ███   ███  ▄███
███   ███ ▀█████████▀  ███             ███    ███ ▀███████████     ███     ███▌ ███   ███ ▀▀███ ████▄
███   ███   ███        ███    █▄       ███    ███   ███    ███     ███     ███  ███   ███   ███    ███
███   ███   ███        ███    ███      ███   ▄███   ███    ███     ███     ███  ███   ███   ███    ███
 ▀█   █▀   ▄████▀      ████████▀       ████████▀    ███    █▀     ▄████▀   █▀    ▀█   █▀    ████████▀

*/

// NAMESPACE
if (setup.npcDate == null) {
  setup.npcDate = {} as NpcDate;
}

// INTERFACE
interface NpcDate {
  propose: (npcId: string, datePlace: string) => string | boolean;
  checkIfFree: (weekday: number, next: boolean, time: number, datePlace: string, npcId: string) => string | boolean | undefined;
  scheduleDate: (weekday: number, next: boolean, time: number, datePlace: string, npcId: string) => boolean;
  create: (npcId: string) => boolean;
  remove: (npcId: string) => boolean;
  moveToLoc: (npcId: string) => boolean;
  date: (npcId: string, datePlace: string) => boolean;
  homeDateTime: () => boolean;
}

interface datePLaces {
  [propName: string]: [string, string, string | boolean, string];
}

// FUNCTIONS

setup.npcDate.propose = function(npcId) {
  let proposeWeekDay;
  let proposeHours;
  let nextweek = false;
  let output = "";
  if (State.active.variables.date[0] > 6) {
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
      for (let i = 6; i > (State.active.variables.date[0] - 1); i--) {
        if (aw.npc[npcId].sched.workdays[i] === false) {
          proposeWeekDay = i;
          proposeHours = random(11, 21);
        }
      }
    } else { // next working day evening
      for (let i = 6; i > (State.active.variables.date[0] - 1); i--) {
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
  if (proposeWeekDay > 6) {
    proposeWeekDay = 6;
  } else if (proposeWeekDay < 1) {
    proposeWeekDay = 1;
  }
  const proposePlace = Object.keys(aw.datePlaces)[random(0, 4)];
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  output += (nextweek) ? "Maybe next " : "Maybe this ";
  output += `${weekdays[(proposeWeekDay - 1)]}, at ${proposeHours}:00 in the ${aw.datePlaces[proposePlace][3]}?`;
  aw.con.info ("output is " + proposeWeekDay + " " + proposeHours + " " + proposePlace);
  ↂ.sched.npcDate[npcId] = [proposeWeekDay, nextweek, proposeHours, npcId, false, proposePlace];
  return output;
};

setup.npcDate.checkIfFree = function(weekday, next, time, datePlace, npcId) {
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Setup.npcDate.checkIfFree was supplied with npcid ${npcId} which was not found in aw.npc!`);
    return "Sorry, seems like some error happened :(";
  }
  for (let i = 0; i < ↂ.plans.current.length; i++) {
    if (ↂ.plans.current[i].npc[0] === npcId) {
      return "Hey, one date per day is enough, don't you think?";
    }
  }
  if (next === false) {
    if (weekday > State.active.variables.date[0]) {
      aw.con.info("weekday > State.active.variables.date[0]");
      if (scheduleCheck(weekday, next, time, npcId) === true) {
        setup.npcDate.scheduleDate(weekday, next, time, datePlace, npcId);
        return "Okay, seems fine!";
      } else {
        return scheduleCheck(weekday, next, time, npcId);
      }
    } else if (weekday === State.active.variables.date[0]) {
      if (time > State.active.variables.time[0]) {
        aw.con.info(`time (${(time + 1)}) > State.active.variables.time[0]`);
        if (scheduleCheck(weekday, next, time, npcId) === true) {
          setup.npcDate.scheduleDate(weekday, next, time, datePlace, npcId);
          return "Okay, seems fine!";
        } else {
          return scheduleCheck(weekday, next, time, npcId);
        }
      } else { // Einstein is chasing us armed with his giant timecock. We are doomed.
        aw.con.warn("Date must be scheduled in the future. Retrospective reality changing is prohibited.");
        return "That is the past already, silly!";
      }
    } else if (weekday < State.active.variables.date[0]) { // Oh noes he is doing that again.
      aw.con.warn("Date must be scheduled in the future. Retrospective reality changing is prohibited.");
      return "That is the past already, silly!";
    }
  } else {
    if (scheduleCheck(weekday, next, time, npcId) === true) {
      setup.npcDate.scheduleDate(weekday, next, time, datePlace, npcId);
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
      aw.con.info("Player tried to schedule the date later than interface allows. Hmmm.");
      return "It will be too late!";
    } else {
      aw.con.info("Seems fine");
      return true;
    }
  }
  return "Some weird error happened in NPC dating check system :(";
};

setup.npcDate.scheduleDate = function(weekday, next, time, datePlace, npcId) { // Poltergeist!
  aw.con.info(`scheduleDate: ${weekday}, ${next}, ${time}, ${datePlace}, ${npcId}`);
  const name = `Date - ${aw.npc[npcId].main.name}.`;
  let bliniWeek = aw.timeArray[3];
  let bliniMonth = aw.timeArray[4];
  let bliniYear = aw.timeArray[5];
  if (next) {
    if (aw.timeArray[3] === 4) {
      bliniWeek = 1;
      bliniMonth = aw.timeArray[4] + 1;
    } else {
      bliniWeek = aw.timeArray[3] + 1;
    }
    if (aw.timeArray[4] === 13 && aw.timeArray[3] === 4) {
      bliniWeek = 1;
      bliniMonth = 1;
      bliniYear = aw.timeArray[5] + 1;
    }
  }
  aw.con.info(`${weekday}, ${bliniWeek}, ${bliniMonth}, ${bliniYear} and time is ${time}`);
  const helloPapa = (setup.time.dateToVal([weekday, bliniWeek, bliniMonth, bliniYear])) + (time * 60);
  setup.sched.new(name, "date", true, helloPapa, false, aw.datePlaces[datePlace][3], datePlace, true, [npcId], `You have arranged a date with ${aw.npc[npcId].main.name} ${aw.npc[npcId].main.surname}. Better not miss it!`);
  ↂ.sched.npcDate[npcId][4] = true;
  ↂ.sched.npcDate[npcId][5] = datePlace;
  ↂ.flag.schedDates.push(npcId);
  return true;
};

setup.npcDate.create = function(npcId) {
  if (ↂ.flag.schedDates.includes(npcId)) {
    // aw.replace("#datescheduler", "<<include [[dateScheduleMenuAlreadySet]]>>");
    // return false;
    ↂ.sched.npcDate[npcId][3] = npcId;
    aw.replace("#datescheduler", "<<include [[dateScheduleMenuAlreadySet]]>>");
    return true;
  } else {
    ↂ.sched.npcDate[npcId][3] = npcId;
    aw.replace("#datescheduler", "<<include [[dateScheduleMenu]]>>");
    return true;
  }
};

setup.npcDate.remove = function(npcId) {
  if (npcId == null) {
    aw.con.warn("No argument was supplied for ↂ.flag.schedDates!");
    return false;
  }
  if (ↂ.flag.schedDates.includes(npcId) && ↂ.sched.npcDate !== undefined) {
    ↂ.flag.schedDates.splice((ↂ.flag.schedDates.indexOf(npcId)), 1);
    delete ↂ.sched.npcDate[npcId];
    return true;
  } else {
    aw.con.info(`Date flag ${npcId} not found in the ↂ.flag.schedDates!`);
    return false;
  }
};

setup.npcDate.homeDateTime = function() {
  if (ↂ.sched.npcDate !== null && ↂ.flag.schedDates.length > 0) {
    for (let i = 0; i < ↂ.plans.current.length; i++) {
      const homes = ["homeT1", "homeT2", "homeT3", "homeT4", "homeT5"];
      const place = ↂ.plans.current[i].locmap as string;
      if (ↂ.flag.schedDates.length !== 0 && ↂ.plans.current[i].type === "date" && ↂ.plans.current[i].missed && aw.time < (ↂ.plans.current[i].start + 60) && aw.time > ↂ.plans.current[i].start && homes.includes(ↂ.map.loc[0]) && aw.datePlaces[place][3] === "Your home") {
        State.active.variables.doorNPC = ↂ.plans.current[i].npc;
        aw.S();
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}

setup.npcDate.date = function(npcId, datePlace) {
  if (npcId == null) {
    aw.con.warn("no npc id was supplied to setup.npcDate.date");
    return false;
  }
    setup.npcDate.remove(npcId);
    for (let i = 0; i < ↂ.plans.current.length; i++) {
      if (ↂ.plans.current[i].type === "date" && ↂ.plans.current[i].npc[0] === npcId) {
        ↂ.plans.current[i].missed = false;
      }
    }
    let type = "out";
    if (datePlace === "yourhome") {
      type = "yourhome";
    }
    setup.date.start(npcId, type);
    return true;
};

Macro.add("datescheduler", {
  handler() {
    if (this.args.length === 0) {
      return this.error("datescheduler Macro requires an npcid.");
    } else if ("string" !== typeof this.args[0]) {
      return this.error("Incorrect data type for datescheduler macro - string expected.");
    }
    const npcId = (setup.npcid.test(this.args[0])) ? this.args[0] : "fail";
    if (npcId === "fail") {
      return this.error(`datescheduler macro requires valid npcid, provided: ${this.args[0]} is not valid.`);
    }
    let output: string;
    if (ↂ.flag.schedDates.includes(npcId)) {
      output = "<<include [[dateScheduleMenuAlreadySet]]>>";
    } else {
      if (ↂ.sched.npcDate[npcId] == null) {
        ↂ.sched.npcDate[npcId] = [0, false, 0, "none", false, "none"];
      }
      ↂ.sched.npcDate[npcId][3] = npcId;
      output = "<<include [[dateScheduleMenu]]>>";
    }
    return new Wikifier(this.output, output);
  },
});

aw.datePlaces = {
  park: ["downtown", "park", false, "Central park"],
  club: ["downtown", "club", "main", "Club district"],
  mall: ["downtown", "mall", false, "Mall"],
  amuse: ["downtown", "amuse", false, "Amusement district"],
  yourhome: ["home", "foyer", false, "Your home"],
};
