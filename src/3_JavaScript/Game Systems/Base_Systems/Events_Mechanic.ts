
/*
███╗   ███╗███████╗ ██████╗██╗  ██╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗
████╗ ████║██╔════╝██╔════╝██║  ██║    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
██╔████╔██║█████╗  ██║     ███████║    █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
██║╚██╔╝██║██╔══╝  ██║     ██╔══██║    ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
██║ ╚═╝ ██║███████╗╚██████╗██║  ██║    ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
╚═╝     ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝
*/

if (aw.event == null || aw.event.mechanic == null) {
  alert(`---WARNING---\nEvent System - Mechanic Events\nAttempting to build event library before initiating event class.`);
}

(function(){

})();

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
