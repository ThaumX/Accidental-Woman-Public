
/*
███╗   ███╗███████╗ ██████╗██╗  ██╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗
████╗ ████║██╔════╝██╔════╝██║  ██║    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
██╔████╔██║█████╗  ██║     ███████║    █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
██║╚██╔╝██║██╔══╝  ██║     ██╔══██║    ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
██║ ╚═╝ ██║███████╗╚██████╗██║  ██║    ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
╚═╝     ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝
*/


setTimeout(() => (function () {
  if (aw.event == null || aw.event.mechanic == null) {
    alert(`---WARNING---\nEvent System - Mechanic Events\nAttempting to build event library before initiating event class.`);
  }
  const events: IntGameEventArgs[] = [
    {
      name: "AddictionChecker",
      odds: 0,
      output: "none",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if (!ↂ.flag.addictWarned && ↂ.pc.status.addict.maxValue > 29) {
          return true;
        }
        return false;
      },
      action(count) {
        // effect
        ↂ.flag.addictWarned = true;
        setup.dialog("Addiction Warning", "<<include [[InfoAddictionWarning]]>>");
      },
    },
    {
      name: "lateWarning",
      odds: 0,
      output: "none",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if (setup.time.aftMidnight && (aw.time - setup.time.midnight) > 180 && !ↂ.flag.sleepfailwarn) {
          return true;
        }
        return false;
      },
      action(count) {
        // effect
        ↂ.pc.status.fatigue = 10;
        setup.status.record("fatigue", -10, "Staying up too late");
        ↂ.flag.sleepfailwarn = true;
        aw.S();
        UI.alert("<span class='blur'>You are dangerously sleepy.</span>");
        setup.status.stress(10, "Staying up too late");
        setup.status.happy(-1, "Forcing yourself to stay awake");
      },
    },
    {
      name: "forcedSleep",
      odds: 0,
      output: "none",
      lifetime: [0, 0],
      region: ["any"],
      condition() {
        // check
        if (setup.time.aftMidnight && (aw.time - setup.time.midnight) > 230) {
          return true;
        }
        return false;
      },
      action(count) {
        // effect
        if (ↂ.map.loc[0] === "home") {
          setup.status.stress(15, "Passing out at home");
          setup.status.happy(-2, "Passing out at home");
          setup.sleep.start();
        } else {
          setup.sleep.start("PassedOut");
        }
      },
    },
  ];
  for (const event of events) {
    event.category = "mechanic";
    aw.event.mechanic.push(new GameEvent(event));
  }
})(), 1000);

/* ██████ REFERENCE ██████
  name: string; // Name of the event, must be unique!
  category: "map" | "story" | "mechanic"; // category of the event.
  odds?: number; // x in 10,000 chance of occurring. 0 = not random
  lifetime?: [number | [number, number, number, number], number | [number, number, number, number]]; // game time that event is valid between. [start, end] 0 = no start or end valid time.
  repeat?: boolean; // if the event can be repeated, or if it's once only (default true, repeatable)
  priorEvent?: string | string[];  // required event or events that must have happened first. (default "none")
  interupt?: boolean; // interupt event processing when this event occurs (default false)
  output?: string; // either "interact" or "scene" if one of those outputs is used, otherwise "none"
  omni?: string; // name of an omni that must be active for the event to run, or "none"
  region?: string | string[]; // name of game region that event can occur in (or "any"). checks either loc[1] if loc[0] is "world", or loc[0]. ex: ["residential", "downtown"]
  condition: string | (() => boolean); // function or stringified function assignment to check for evenet conditions.
  action: string | (() => void); // function or stringified function to run when event occurs. supplied argument num for number of times executed, starting with 1 the first time it runs.
*/
