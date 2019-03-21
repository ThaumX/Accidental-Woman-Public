
/*
███████╗████████╗ ██████╗ ██████╗ ██╗   ██╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗
██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
███████╗   ██║   ██║   ██║██████╔╝ ╚████╔╝     █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
╚════██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝      ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
███████║   ██║   ╚██████╔╝██║  ██║   ██║       ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝
*/

if (aw.event == null || aw.event.story == null) {
  alert(`---WARNING---\nEvent System - Story events\nAttempting to build event library before initiating event class.`);
}

setTimeout(() => (function() {
  const events: IntGameEventArgs[] = [
    {
      name: "residentialRoryBus",
      odds: 1000,
      output: "scene",
      lifetime: [0, [1, 1, 8, 2032]],
      region: ["residential"],
      condition() {
        // check
        if (setup.loliCheck()) {
          // more check
          if (aw.timeArray[2] > 5 && (aw.timeArray[1] > 9 && aw.timeArray[1] < 20)) {
            return true;
          } else if (aw.timeArray[2] < 6 && (aw.timeArray[1] > 15 && aw.timeArray[1] < 19)) {
            return true;
          }
        }
        return false;
      },
      action(count) {
        // effect
        try {
          this.odds = 100;
        } catch (e) {
          aw.con.warn(`NOTICE:\nAdjustment of event via this.property from event class action function ineffective.\nError ${e.name}: ${e.message}.`);
        }
        setup.time.add(5, {event: false});
        const sn = {
          passage: "GE_RoryBus",
          image: "IMG-roryIRL",
          sidebar: `<center><h3>${ↂ.map.name}</h3></center><br><<silly>><i>A wild sock collector appears!</i><</silly>>`,
          topImage: "IMG-RoryBus",
          title: "Free Candy: Rory Bus",
          allowSave: false,
          showTime: true,
          allowMenu: false,
        };
        setup.scenario.launch(sn);
      },
    },
  ];
  for (const event of events) {
    event.category = "story";
    aw.event.story.push(new GameEvent(event));
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

