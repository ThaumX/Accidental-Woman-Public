
/*
███████╗██╗   ██╗███████╗███╗   ██╗████████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝

 ██████╗██╗      █████╗ ███████╗███████╗
██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
██║     ██║     ███████║███████╗███████╗
██║     ██║     ██╔══██║╚════██║╚════██║
╚██████╗███████╗██║  ██║███████║███████║
 ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
*/


interface awEvents {
  map: GameEvent[];
  story: GameEvent[];
  mechanic: GameEvent[];
}

interface IntGameEventArgs {
  name: string; // Name of the event, must be unique!
  active?: boolean; // Toggle for event being active or inactive. (default: true/active)
  category?: "map" | "story" | "mechanic"; // category of the event.
  odds?: number; // x in 10,000 chance of occurring. 0 = not random
  lifetime?: [number | [number, number, number, number], number | [number, number, number, number]]; // game time [date - UL time] that event is valid between. [start, end] 0 = no start or end valid time.
  repeat?: boolean; // if the event can be repeated, or if it's once only (default true, repeatable)
  priorEvent?: string | string[];  // required event or events that must have happened first. (default "none")
  interupt?: boolean; // interrupt event processing when this event occurs (default false)
  output?: string; // either "interact" or "scene" if one of those outputs is used, otherwise "none"
  omni?: string; // name of an omni that must be active for the event to run, or "none"
  region?: string | string[]; // name of game region that event can occur in (or "any"). checks either loc[1] if loc[0] is "world", or loc[0]. ex: ["residential", "downtown"]
  condition: string | (() => boolean); // function or stringified function assignment to check for event conditions.
  action: string | ((count: number) => void); // function or stringified function to run when event occurs. supplied argument num for number of times executed, starting with 1 the first time it runs.
}

class GameEvent {
  public name: string;
  public active: boolean;
  public category: "map"|"story"|"mechanic";
  public odds: number;
  public lifetime: [number, number];
  public repeat: boolean
  public priorEvent: string | string[];
  public interupt: boolean;
  public output: string;
  public omni: string;
  public region: string[];
  public condition: () => boolean;
  public action: (count: number) => void;
  constructor({
    name,
    active,
    category,
    odds,
    lifetime,
    repeat,
    priorEvent,
    interupt,
    output,
    omni,
    region,
    condition,
    action,
  }: IntGameEventArgs) {
    this.name = name;
    if (category == null) {
      aw.con.warn(`Event with name ${name} is missing its category!`);
      this.category = "mechanic";
    } else {
      this.category = category;
    }
    if (active == null) {
      this.active = true;
    } else {
      this.active = active;
    }
    if (odds == null) {
      this.odds = 0;
    } else {
      this.odds = odds;
    }
    if (lifetime == null) {
      this.lifetime = [0, 0];
    } else {
      this.lifetime = [0, 0];
      if (Array.isArray(lifetime[0])) {
        this.lifetime[0] = setup.time.dateToVal(lifetime[0]);
      } else {
        this.lifetime[0] = lifetime[0];
      }
      if (Array.isArray(lifetime[1])) {
        this.lifetime[1] = setup.time.dateToVal(lifetime[1]);
      } else {
        this.lifetime[1] = lifetime[1];
      }
    }
    if (repeat == null) {
      this.repeat = true;
    } else {
      this.repeat = repeat;
    }
    if (priorEvent == null) {
      this.priorEvent = "none";
    } else {
      if (Array.isArray(priorEvent)) {
        if (priorEvent.length === 0 || priorEvent[0] === "none") {
          this.priorEvent = "none";
        } else {
          this.priorEvent = clone(priorEvent);
        }
      } else {
        this.priorEvent = priorEvent;
      }
    }
    if (interupt == null) {
      this.interupt = false;
    } else {
      this.interupt = interupt;
    }
    if (output == null) {
      this.output = "none";
    } else {
      this.output = output;
    }
    if (omni == null) {
      this.omni = "none";
    } else {
      this.omni = omni;
    }
    if (region == null) {
      this.region = ["any"];
    } else if (Array.isArray(region)) {
      this.region = clone(region);
    } else {
      this.region = [region];
    }
    if (typeof condition === "string") {
      this.condition = eval(condition);
    } else {
      this.condition = condition;
    }
    if (typeof action === "string") {
      this.action = eval(action);
    } else {
      this.action = action;
    }
  }
  // ██████ METHODS ██████
  public check(): boolean {
    // Completes check for whether or not event occurs, including the this.condition() and others
    // runs the event if all checks succeed, and records it as running.
    if (this.lifetime[0] !== 0 && aw.time < this.lifetime[0]) {
      return false; // before starting event valid time
    }
    if (this.lifetime[1] !== 0 && aw.time > this.lifetime[1]) {
      return false; // after ending event valid time
    }
    if (!this.repeat && this.occurredCount() > 0) {
      return false; // if set to not repeatable, and has already happened
    }
    if (this.priorEvent !== "none") {
      if (Array.isArray(this.priorEvent)) {
        // check each array item to make sure it occurred.
        let chk = true;
        for (const name of this.priorEvent) {
          if (setup.event.checkCount(name) === 0) {
            chk = false;
            break;
          }
        }
        if (!chk) {
          return false; // not all requisite events have occurred
        }
      } else if (setup.event.checkCount(this.priorEvent) === 0) {
        return false; // prior requirement event hasn't occurred
      }
    }
    if (this.omni !== "none") {
      // check that an omni timer is active
      if (setup.omni.matching(this.omni) === 0) {
        return false; // omni isn't present, so don't run.
      }
    }
    if (this.odds > 0) {
      if (random(1, 10000) > this.odds) {
        return false; // odds were not in favor of occurring
      }
    }
    // NOW WE CHECK THE SUPPLIED CONDITION FUNCTION, FINALLY
    // Use a try/catch to make sure a bad check function doesn't crash things.
    let pass = false;
    try {
      pass = this.condition();
    } catch (e) {
      aw.con.warn(`Bad game event condition function!\nEvent name: ${this.name}\nError ${e.name}: ${e.message}.`);
    }
    if (pass) {
      this.run();
      return true;
    } else {
      return false;
    }
  }
  public run(): void {
    this.record();
    aw.con.info(`Event Triggered: ${this.name}`);
    this.action(this.occurredCount());
  }
  public record(): void {
    if (ↂ.flag.gameEvents[this.category][this.name] == null) {
      ↂ.flag.gameEvents[this.category][this.name] = 1;
    } else {
      ↂ.flag.gameEvents[this.category][this.name] += 1;
    }
  }
  public occurredCount(): number {
    if (ↂ.flag.gameEvents[this.category][this.name] == null) {
      ↂ.flag.gameEvents[this.category][this.name] = 0;
      return 0;
    }
    return ↂ.flag.gameEvents[this.category][this.name];
  }
  public decrement(): boolean {
    if (ↂ.flag.gameEvents[this.category][this.name] == null) {
      ↂ.flag.gameEvents[this.category][this.name] = 0;
      return false;
    } else if (ↂ.flag.gameEvents[this.category][this.name] === 0) {
      return false;
    } else {
      ↂ.flag.gameEvents[this.category][this.name] -= 1;
      return true;
    }
  }
}

aw.event = {
  map: [],
  story: [],
  mechanic: [],
};



