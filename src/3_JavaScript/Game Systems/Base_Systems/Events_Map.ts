
/*
███╗   ███╗ █████╗ ██████╗     ███████╗██╗   ██╗███████╗███╗   ██╗████████╗
████╗ ████║██╔══██╗██╔══██╗    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
██╔████╔██║███████║██████╔╝    █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
██║╚██╔╝██║██╔══██║██╔═══╝     ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
██║ ╚═╝ ██║██║  ██║██║         ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝         ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝
*/

if (aw.event == null || aw.event.map == null) {
  alert(`---WARNING---\nEvent System - Map Events\nAttempting to build event library before initiating event class.`);
}

setTimeout(() => (function() {
  const events: IntGameEventArgs[] = [
    {
      name: "nudityPoliceWarning",
      odds: 1000,
      output: "interact",
      condition() {
        if (!ↂ.pc.status.inPublic || !setup.clothes.exposed.bottom) {
          return false;
        }
        if (ↂ.map.loc[1] === "recreation" || (ↂ.map.loc[1] === "coop" && ↂ.map.loc[2] !== "main")) {
          return false;
        }
        if (ↂ.map.loc[0] !== "downtown" && ↂ.map.loc[0] !== "bullseye") {
          if (random(1, 10) < 6) {
            return false;
          }
        }
        return true;
      },
      action(count) {
        const rate: number[] = [];
        if (ↂ.map.loc[0] !== "downtown" && ↂ.map.loc[0] !== "residential") {
          rate.push(1);
          rate.push(20);
          rate.push(1 + Math.floor(ↂ.flag.apdCaughtNaked / 2));
          rate.push(1 + Math.floor(ↂ.flag.apdCaughtNaked / 3));
        } else {
          rate.push(15);
          rate.push(5);
          rate.push(2 + ↂ.flag.apdCaughtNaked);
          rate.push(ↂ.flag.apdCaughtNaked);
        }
        const x = setup.randomDist(rate);
        const difficulty = [13, 15, 17, 20];
        const ps = ["AppletreePoliceNudityA", "AppletreePoliceNudityB", "AppletreePoliceNudityC", "AppletreePoliceNudityD"];
        const ims = ["IMG-FemalePoliceOfficer", "IMG-PolicePatrolOfficer", "IMG-MalePoliceOfficer", "IMG-PoliceWatcher"];
        const tit = ["APD Service Officer", "APD Patrol Officer", "APD Enforcer", "APD Watcher"];
        const dc = difficulty[x];
        setup.SCXfunc();
        setup.SCfunc("EX", dc);
        if (State.active.variables.SCresult[1]) {
          UI.alert(`You manage to avoid police attention this time...<br>${State.active.variables.SCtext[1]}`);
          return;
        } else {
          ↂ.flag.apdCaughtNaked++;
        }
        const args = {
          passage: ps[x],
          block: true,
          content: `<<set _apd = ${ↂ.flag.apdCaughtNaked}>><<set _fine = 50 + _apd * 10>>`,
          image: ims[x],
          title: tit[x],
          size: 4,
          callback() {
            setup.time.add(random(12, 22));
          },
          onclose() {
            setup.refresh();
          },
        };
        setup.interact.launch(args);
      },
    },
  ];
  for (const event of events) {
    event.category = "map";
    aw.event.map.push(new GameEvent(event));
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
  condition: string | (() => boolean); // function or stringified function assignment to check for event conditions.
  action: string | (() => void); // function or stringified function to run when event occurs. supplied argument num for number of times executed, starting with 1 the first time it runs.
*/

