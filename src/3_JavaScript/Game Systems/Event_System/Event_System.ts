
/*
███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
*/


interface SetupEvent {
  delay: number; // async delay before starting event checks
  asyncDelay: number; // setTimeout value between asyncChecker
  data: {
    checkSet: "map" | "story" | "mechanic" | "notStory" | "all";
    cunt: number;
    cSet: "map" | "story" | "mechanic" | "none";
    abort: boolean;
    interact: boolean;
    scene: boolean;
  };
  check: (group?: "map" | "story" | "mechanic" | "notStory" | "all", shuffle?: boolean) => void;
  asyncChecker: () => void;
  abort: () => void;
  checkCount: (name: string, category?: "map" | "story" | "mechanic" | "any") => number;
  run: (name: string, category: "map" | "story" | "mechanic") => void;
  activate: (name: string, category?: "map" | "story" | "mechanic" | "any") => boolean;
  deactivate: (name: string, category?: "map" | "story" | "mechanic" | "any") => boolean;
  edit: (name: string, category: "map" | "story" | "mechanic") => GameEvent | false;
  region: (reg: string[]) => boolean;
}

setup.event = {} as SetupEvent;

// setup.eventAllowed

setup.event.delay = 50;
setup.event.asyncDelay = 2;

// checks the event arrays for any that trigger
// group argument allows specifying only a single group to check
setup.event.check = function(group: "map" | "story" | "mechanic" | "notStory" | "all" = "all", shuffle: boolean = true) {
  // check if events are allowed
  if (!setup.eventAllowed || ↂ.flag.Prologue) {
    return;
  }
  // set the event.data for new check
  setup.event.data = {
    checkSet: group,
    cunt: 0,
    cSet: "none",
    abort: false,
    interact: false,
    scene: false,
  };
  // set the correct cSet to start with, and shuffles the used arrays
  switch (group) {
    case "map":
      setup.event.data.cSet = "map";
      if (shuffle) {
        aw.event.map.shuffle();
      }
      break;
    case "story":
      setup.event.data.cSet = "story";
      if (shuffle) {
        aw.event.story.shuffle();
      }
      break;
    case "notStory":
      if (shuffle) {
        aw.event.map.shuffle();
      }
    case "mechanic":
      setup.event.data.cSet = "mechanic";
      if (shuffle) {
        aw.event.mechanic.shuffle();
      }
      break;
    case "all":
    default:
      setup.event.data.cSet = "mechanic";
      if (shuffle) {
        aw.event.mechanic.shuffle();
        aw.event.map.shuffle();
        aw.event.story.shuffle();
      }
      break;
  }
  setTimeout(setup.event.asyncChecker, setup.event.asyncDelay);
};

// async event checking function.
// runs with small delay to avoid locking up the interface and other functionality
// uses setup.event.data object to store info
setup.event.asyncChecker = function(): void {
  const ᚥ = setup.event.data;
  if (ᚥ.abort) {
    return; // stops checking events
  }
  if (ᚥ.cunt >= aw.event[ᚥ.cSet].length) {
    // current event array is done. see if new array to check or not.
    aw.con.info(`Event system finished checking ${ᚥ.cSet}.`);
    if (ᚥ.checkSet === "all") {
      if (ᚥ.cSet === "mechanic") {
        ᚥ.cSet = "map";
        ᚥ.cunt = 0;
      } else if (ᚥ.cSet === "map") {
        ᚥ.cSet = "story";
        ᚥ.cunt = 0;
      } else {
        // finished checking
        aw.con.info(`Event system finished checking all events`);
        return; // done checking - don't continue async loop
      }
    } else if (ᚥ.checkSet === "notStory" && ᚥ.cSet === "mechanic") {
      ᚥ.cSet = "map";
      ᚥ.cunt = 0;
    } else {
      return; // done checking
    }
  } else {
    // still in the process of checking... so check next event ^_^
    const ᛞ = aw.event[ᚥ.cSet][ᚥ.cunt];
    if (!ᛞ.active) {
      // don't check
    } else if (!setup.event.region(ᛞ.region)) {
      // don't check
    } else if (ᚥ.interact && ᛞ.output === "interact") {
      // don't check
    } else if ((ᚥ.scene || setup.scenario.isOpen()) && ᛞ.output === "scene") {
      // don't check
    } else {
      const res = ᛞ.check();
      if (res) {
        if (ᛞ.interupt) {
          return; // stop checking because interrupt is turned on
        } else if (ᛞ.output === "interact") {
          ᚥ.interact = true;
        } else if (ᛞ.output === "scene") {
          ᚥ.scene = true;
        }
      }
    }
    ᚥ.cunt ++; // increment counter for next occurrence
  }
  if (!ᚥ.abort) {
    setTimeout(setup.event.asyncChecker, setup.event.asyncDelay);
  }
};

setup.event.region = function(reg: string[]): boolean {
  if (reg.includes("any")) {
    return true;
  }
  if (ↂ.map.loc[0] === "world") {
    if (reg.includes(ↂ.map.loc[1])) {
      return true;
    }
  } else {
    if (reg.includes(ↂ.map.loc[0])) {
      return true;
    }
  }
  return false;
};

setup.event.abort = function(): void {
  setup.event.data.abort = true;
}

// returns the number of times a specific event has occurred during the game, or zero.
// will initialize the flag variable if not already initialized if category is not 'any'
setup.event.checkCount = function(name, category = "any"): number {
  if (category === "any") {
    let amt = 0;
    amt += (ↂ.flag.gameEvents.map[name] == null) ? 0 : ↂ.flag.gameEvents.map[name];
    amt += (ↂ.flag.gameEvents.story[name] == null) ? 0 : ↂ.flag.gameEvents.story[name];
    amt += (ↂ.flag.gameEvents.mechanic[name] == null) ? 0 : ↂ.flag.gameEvents.mechanic[name];
    return amt;
  }
  if (ↂ.flag.gameEvents[category] == null) {
    aw.con.warn(`Game Events checkCount() bad category argument (given: ${category})\nOnly "map", "story", "mechanic", and "any" allowed.`);
    return 0;
  }
  if (ↂ.flag.gameEvents[category][name] == null) {
    ↂ.flag.gameEvents[category][name] = 0;
    return 0;
  }
  return ↂ.flag.gameEvents[category][name];
};

setup.event.run = function(name: string, category: "map" | "story" | "mechanic"): void {
  for (const event of aw.event[category]) {
    if (event.name === name) {
      event.run();
      return;
    }
  }
  aw.con.warn(`Error with setup.event.run()\nevent name: ${name}, category: ${category} not found.`);
};

// sets the active flag of an event to true so that it can occur
setup.event.activate = function(name, category = "any"): boolean {
  function act(cat: string) {
    for (const event of aw.event[cat]) {
      if (event.name === name) {
        event.active = true;
        return true;
      }
    }
    return false;
  }
  let res = false;
  switch (category) {
    case "map":
      res = act("map");
      break;
    case "mechanic":
      res = act("mechanic");
      break;
    case "story":
      res = act("story");
      break;
    case "any":
      let cc = 0;
      cc += (act("map")) ? 1 : 0;
      cc += (act("mechanic")) ? 1 : 0;
      cc += (act("story")) ? 1 : 0;
      res = (cc > 0) ? true : false;
      if (cc > 1) {
        aw.con.warn(`Event Duplication Notice:\nsetup.event.activate called on name ${name}, found ${cc} events with that name.`);
      }
      break;
  }
  if (!res) {
    aw.con.warn(`Event Error:\nAttempted to activate event with name ${name} in category ${category}, but no such event exists!`);
  }
  return res;
};

// sets the active flag of an event to false so that it can't occur
setup.event.deactivate = function(name, category = "any"): boolean {
  function act(cat: string) {
    for (const event of aw.event[cat]) {
      if (event.name === name) {
        event.active = false;
        return true;
      }
    }
    return false;
  }
  let res = false;
  switch (category) {
    case "map":
      res = act("map");
      break;
    case "mechanic":
      res = act("mechanic");
      break;
    case "story":
      res = act("story");
      break;
    case "any":
      let cc = 0;
      cc += (act("map")) ? 1 : 0;
      cc += (act("mechanic")) ? 1 : 0;
      cc += (act("story")) ? 1 : 0;
      res = (cc > 0) ? true : false;
      if (cc > 1) {
        aw.con.warn(`Event Duplication Notice:\nsetup.event.deactivate called on name ${name}, found ${cc} events with that name.`);
      }
      break;
  }
  if (!res) {
    aw.con.warn(`Event Error:\nAttempted to deactivate event with name ${name} in category ${category}, but no such event exists!`);
  }
  return res;
};

// chainable function returns a reference to the called event
setup.event.edit = function(name, category): GameEvent | false {
  for (const event of aw.event[category]) {
    if (event.name === name) {
      return event;
    }
  }
  aw.con.warn(`attempted to run setup.event.edit on event name ${name}, category ${category}, but no such event was found.`);
  return false;
};


