
//   .d88888b.                         d8b
//  d88P" "Y88b                        Y8P
//  888     888
//  888     888 88888b.d88b.  88888b.  888
//  888     888 888 "888 "88b 888 "88b 888
//  888     888 888  888  888 888  888 888
//  Y88b. .d88P 888  888  888 888  888 888
//   "Y88888P"  888  888  888 888  888 888


//   .d8888b.  888
//  d88P  Y88b 888
//  888    888 888
//  888        888  8888b.  .d8888b  .d8888b   .d88b.  .d8888b
//  888        888     "88b 88K      88K      d8P  Y8b 88K
//  888    888 888 .d888888 "Y8888b. "Y8888b. 88888888 "Y8888b.
//  Y88b  d88P 888 888  888      X88      X88 Y8b.          X88
//   "Y8888P"  888 "Y888888  88888P'  88888P'  "Y8888   88888P'

// UNIQUE TIME SYSTEM AND EVENT MANAGEMENT + EXECUTION - ASYNC!


// PRIMARY CLASS - OmniEvent =====================

class OmniEvent {
  // DECLARATIONS ================================
  public key: string; // aw.omni property key - always unique, used to control event externally.
  public name: string; // name of this event - informative, non-unique, used for multiple/duplicate checks
  public output: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact"; // info on any output that may be triggered. Used to avoid output conflicts.
  public icon: "none" | string; // image id for a status icon - acts as flag to display a status icon in the UI.
  public text: "none" | string; // description hovertext for icon in UI
  public added: number; // omni-time that event was added
  public last: number; // omni-time event was last triggered
  // CONSTRUCTOR =================================
  constructor({
    key,
    added,
    last,
    name = "none",
    output = "none",
    icon = "none",
    text = "none",
  }: {
    key?: string,
    added?: number,
    last?: number,
    name?: string,
    output?: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact",
    icon?: string,
    text?: string,
  }) { // CONSTRUCTOR FUNCTION ====================
    if (key == null) { // preserve keys for restored Omni Events
      this.key = setup.omni.keyGen();
    } else {
      this.key = key;
    }
    if (added == null) {
      this.added = setup.omni.value;
    } else {
      this.added = added;
    }
    if (last == null) {
      this.last = -1;
    } else {
      this.last = last;
    }
    this.name = name;
    this.output = output;
    this.icon = icon;
    if (icon === "none" && text !== "none") {
      aw.con.info(`Omni event ${name} added with text but without an icon... key: ${key}`);
    }
    if (icon !== "none" && text === "none") {
      this.text = "no description";
    } else {
      this.text = text;
    }
  }

  // GETTERS/SETTERS =============================
  public get age(): number {
    return setup.omni.value - this.added;
  }
  public get sinceLast(): number {
    if (this.last === -1) {
      return -1;
    } else {
      return setup.omni.value - this.last;
    }
  }

  // METHODS =====================================
  // Die(now) runs setup.omni.kill() when time to die, properly deleting the event
  // optional now = 0 will skip the timeout entirely and delete immediately.
  public die(now: number = 25): void {
    const keyed = this.key;
    if (now <= 0) {
      setup.omni.kill(keyed);
    } else {
      setTimeout(() => setup.omni.kill(keyed), now);
    }
  }
  // returns true if there is more than one copy of this omni event, based on name.
  public duplicated(): boolean {
    let dupe = false;
    for (const key of Object.keys(aw.omni)) {
      if (aw.omni[key].name === this.name) {
        dupe = true;
        break;
      }
    }
    return dupe;
  }
  // placeholder to ensure it can run
  public test(): boolean {
    return false;
  }
  public print(): string {
    return "";
  }
}

//   .d8888b.           888       .d8888b.  888
//  d88P  Y88b          888      d88P  Y88b 888
//  Y88b.               888      888    888 888
//   "Y888b.   888  888 88888b.  888        888  8888b.  .d8888b  .d8888b   .d88b.  .d8888b
//      "Y88b. 888  888 888 "88b 888        888     "88b 88K      88K      d8P  Y8b 88K
//        "888 888  888 888  888 888    888 888 .d888888 "Y8888b. "Y8888b. 88888888 "Y8888b.
//  Y88b  d88P Y88b 888 888 d88P Y88b  d88P 888 888  888      X88      X88 Y8b.          X88
//   "Y8888P"   "Y88888 88888P"   "Y8888P"  888 "Y888888  88888P'  88888P'  "Y8888   88888P'

// SINGLE OMNI EVENT =============================

class SingleOmni extends OmniEvent {
  // DECLARATIONS ================================
  public type: "single"; // assigned type value for external reference
  public duration: number; // how long the event lasts -> how long until it occurs.
  public triggered: boolean; // whether or not the event has actually occurred yet, important for cleanup.
  public run: string; // text javascript that is executed when the omni event occurs.
  // CONSTRUCTOR =================================
  constructor({
    key,
    added,
    last,
    name,
    output,
    icon,
    text,
    type,
    duration,
    triggered,
    run,
  }: {
    key?: string,
    added?: number,
    last?: number,
    name?: string,
    output?: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact",
    icon?: string,
    text?: string,
    type?: string,
    duration?: number,
    triggered?: boolean,
    run?: string,
  }) { // CONSTRUCTOR FUNCTION ===================
    super({key, added, last, name, output, icon, text}); // call to super constructor!
    if (type != null && type !== "single") {
      aw.con.warn(`Omni Event type mixup error: single event constructor called with type ${type}.`);
    }
    this.type = "single";
    if (duration == null) {
      aw.con.info(`Omni Single Event constructed w/o duration time. Using default 60 mins. ${this.name} (${this.key})`);
      this.duration = 60;
    } else {
      this.duration = duration;
    }
    if (triggered == null) {
      this.triggered = false;
    } else {
      this.triggered = triggered;
    }
    if (run == null) {
      this.run = `aw.con.info("The non-function single omni ${this.name} (key: ${this.key}) finished running.");`;
    } else {
      this.run = run;
    }
  }

  // GETTERS/SETTERS =============================
  public get remaining(): number {
    return (this.added + this.duration) - setup.omni.value;
  }
  public get end(): number {
    return this.added + this.duration;
  }

  // METHODS =====================================
  // returns the omni event icon and text formatted in twee for UI elements
  public print(): string {
    if (this.icon === "none") {
      return "";
    }
    let output = `[${this.name}]📖 ${this.text}`;
    const dur = this.remaining;
    if (dur > 0) {
      let min: string | number = dur % 60;
      const hrsTot = Math.floor(dur / 60);
      let days: string | number = Math.floor(hrsTot / 24);
      let hrs: string | number = hrsTot % 24;
      if (min < 10) {
        min = "0" + min;
      }
      if (hrs < 10) {
        hrs = "0" + hrs;
      }
      if (days > 1) {
        days = days + " days";
      } else {
        days = days + " day";
      }
      if (dur > 1440) {
        // day hr min
        output += ` (⏱ ${days} and ${hrs}:${min} remaining)`;
      } else if (dur > 59) {
        // hr min
        output += ` (⏱ ${hrs}:${min} remaining)`;
      } else {
        output += ` (⏱ ${min} min remaining)`;
      }
    } else {
      output += "(⏱ expired)";
    }
    return `<img data-passage="${this.icon}" title="${output}">`;
  }
  // tests to see if the omni event is ready to fire.
  public test(): boolean {
    if (this.remaining < 1 && !this.triggered) {
      this.triggered = true;
      setTimeout(() => this.execute(), 25);
      return true;
    } else {
      return false;
    }
  }
  // actually executes the event, which is JS stored as a string in this.run
  public execute() {
    try {
    eval(this.run);
    } catch (e) {
      aw.con.warn(`Single Omni Event ${this.name} (${this.key}) failed to execute properly due to error - ${e.name}: ${e.message}`);
    }
    super.die();
  }
}

// RECURRING OMNI EVENT ==========================

class RecurringOmni extends OmniEvent {
  // DECLARATIONS ================================
  public type: "recurring"; // assigned type value for external reference
  public duration: number; // how long the event lasts -> how long until it occurs.
  public run: string; // text javascript that is executed when the omni event occurs.
  public interval: number; // mins - how often it executes.
  public times: number; // number of times (remaining) to execute.
  // CONSTRUCTOR =================================
  constructor({
    key,
    added,
    last,
    name,
    output,
    icon,
    text,
    type,
    duration,
    run,
    interval,
    times,
  }: {
    key?: string,
    added?: number,
    last?: number,
    name?: string,
    output?: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact",
    icon?: string,
    text?: string,
    type?: string,
    duration?: number,
    run?: string,
    interval?: number,
    times?: number,
  }) { // CONSTRUCTOR FUNCTION ===================
    super({ key, added, last, name, output, icon, text }); // call to super constructor!
    if (type != null && type !== "recurring") {
      aw.con.warn(`Omni Event type mixup error: recurring event constructor called with type ${type}.`);
    }
    this.type = "recurring";
    if (interval == null) {
      if (times != null && duration != null) {
        this.interval = Math.floor(duration / times);
        duration = this.interval * times;
      } else {
        this.interval = 60;
      }
      aw.con.info(`No interval provided to recurring omni event ${this.name} (${this.key})`);
    } else {
      this.interval = interval;
    }
    if (times == null) {
      if (duration != null) {
        this.times = Math.floor(duration / this.interval);
        if (duration % this.interval !== 0) {
          duration = this.times * this.interval;
        }
      } else {
        this.times = 1;
        aw.con.info(`No 'times' and no 'duration' provided to recurring omni event ${this.name} (${this.key})`);
      }
    } else {
      this.times = times;
    }
    if (duration == null) {
      this.duration = this.interval * this.times;
    } else {
      this.duration = duration;
    }
    if (run == null) {
      aw.con.info(`recurring omni ${this.name} (key: ${this.key}) initialized with no run value!`);
      this.run = `aw.con.info("The recurring omni ${this.name} (key: ${this.key}) executed.");`;
    } else {
      this.run = run;
    }
  }

  // GETTERS/SETTERS =============================
  public get remaining(): number {
    return (this.added + this.duration) - setup.omni.value;
  }
  public get end(): number {
    return this.added + this.duration;
  }

  // METHODS =====================================
  // returns the omni event icon and text formatted in twee for UI elements
  public print(): string {
    if (this.icon === "none") {
      return "";
    }
    let output = `[${this.name}]📖 ${this.text}`;
    const dur = this.remaining;
    if (dur > 0) {
      let min: string | number = dur % 60;
      const hrsTot = Math.floor(dur / 60);
      let days: string | number = Math.floor(hrsTot / 24);
      let hrs: string | number = hrsTot % 24;
      if (min < 10) {
        min = "0" + min;
      }
      if (hrs < 10) {
        hrs = "0" + hrs;
      }
      if (days > 1) {
        days = days + " days";
      } else {
        days = days + " day";
      }
      if (dur > 1440) {
        // day hr min
        output += ` (⏱ ${days} and ${hrs}:${min} remaining)`;
      } else if (dur > 59) {
        // hr min
        output += ` (⏱ ${hrs}:${min} remaining)`;
      } else {
        output += ` (⏱ ${min} min remaining)`;
      }
    } else {
      output += "(⏱ expired)";
    }
    return `<img data-passage="${this.icon}" title="${output}">`;
  }
  // tests to see if the omni event is ready to fire.
  public test(): boolean {
    if (this.times < 1) {
      return false;
    }
    const nTime = (this.last > 0) ? this.last + this.interval : this.added + this.interval;
    if (nTime <= setup.omni.value) {
      this.last = nTime;
      setTimeout(() => this.execute(), 25);
      return true;
    } else {
      return false;
    }
  }
  // runs the functional code of the event.
  public execute(): void {
    this.times --;
    try {
      eval(this.run);
    } catch (e) {
      aw.con.warn(`Recurring Omni Event ${this.name} (${this.key}) failed to execute properly due to error - ${e.name}: ${e.message}`);
    }
    if (this.times < 1) {
      super.die();
    }
  }
}

// PERPETUAL OMNI EVENT ==========================

class PerpetualOmni extends OmniEvent {
  // DECLARATIONS ================================
  public type: "perpetual"; // assigned type value for external reference
  public run: string; // text javascript that is executed when the omni event occurs.
  public interval: number; // mins - how often it executes.
  public count: number; // number of times it has executed.
// CONSTRUCTOR =================================
  constructor({
    key,
    added,
    last,
    name,
    output,
    icon,
    text,
    type,
    run,
    interval,
    count,
  }: {
    key?: string,
    added?: number,
    last?: number,
    name?: string,
    output?: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact",
    icon?: string,
    text?: string,
    type?: string,
    run?: string,
    interval?: number,
    count?: number,
  }) { // CONSTRUCTOR FUNCTION ===================
    super({ key, added, last, name, output, icon, text }); // call to super constructor!
    if (type != null && type !== "perpetual") {
      aw.con.warn(`Omni Event type mixup error: perpetual event constructor called with type ${type}.`);
    }
    this.type = "perpetual";
    if (interval == null) {
      this.interval = 60;
      aw.con.info(`No interval provided to perpetual omni event ${this.name} (${this.key})`);
    } else {
      this.interval = interval;
    }
    if (count == null) {
      this.count = 0;
    } else {
      this.count = count;
    }
    if (run == null) {
      aw.con.info(`recurring omni ${this.name} (key: ${this.key}) initialized with no run value!`);
      this.run = `aw.con.info("The recurring omni ${this.name} (key: ${this.key}) executed.");`;
    } else {
      this.run = run;
    }
  }

  // GETTERS/SETTERS =============================

  // METHODS =====================================
  // returns the omni event icon and text formatted in twee for UI elements
  public print(): string {
    if (this.icon === "none") {
      return "";
    }
    const output = `[${this.name}]📖 ${this.text}`;
    return `<img data-passage="${this.icon}" title="${output}">`;
  }
  // tests to see if the omni event is ready to fire.
  public test(): boolean {
    const nTime = (this.last > 0) ? this.last + this.interval : this.added + this.interval;
    if (nTime <= setup.omni.value) {
      this.last = nTime;
      setTimeout(() => this.execute(), 25);
      return true;
    } else {
      return false;
    }
  }
  // runs the functional code of the event.
  public execute(): void {
    this.count++;
    try {
      eval(this.run);
    } catch (e) {
      aw.con.warn(`Perpetual Omni Event ${this.name} (${this.key}) failed to execute properly due to error - ${e.name}: ${e.message}`);
    }
  }
}

// CONDITION OMNI EVENT ==========================

class ConditionOmni extends OmniEvent {
  // DECLARATIONS ================================
  public type: "condition";
  public run: string; // text javascript that is executed when the omni event occurs.
  public timeArray: number[]; // times from start that the effect triggers
    // note that a number can be supplied instead to generate a decreasing timespan. !MAX 15! MIN 2
  public count: number; // number of times it has executed.
  public duration: number; // length of time it is expected to last
  // CONSTRUCTOR =================================
  constructor({
    key,
    added,
    last,
    name,
    output,
    icon,
    text,
    type,
    duration,
    run,
    timeArray,
    count,
  }: {
    key?: string,
    added?: number,
    last?: number,
    name?: string,
    output?: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact",
    icon?: string,
    text?: string,
    type?: string,
    duration?: number,
    run?: string,
    timeArray?: number[] | number,
    count?: number,
  }) { // CONSTRUCTOR FUNCTION ===================
    super({ key, added, last, name, output, icon, text }); // call to super constructor!
    if (type != null && type !== "condition") {
      aw.con.warn(`Omni Event type mixup error: condition event constructor called with type ${type}.`);
    }
    this.type = "condition";
    if (duration == null) {
      aw.con.warn(`Omni Condition Event constructed without duration! ${this.name} (${this.key}).`);
      this.duration = 360;
    } else {
      this.duration = duration;
    }
    if (run == null) {
      aw.con.info(`condition omni ${this.name} (key: ${this.key}) initialized with no run value!`);
      this.run = `aw.con.info("The condition omni ${this.name} (key: ${this.key}) executed.");`;
    } else {
      this.run = run;
    }
    if (timeArray == null) {
      aw.con.warn(`condition omni ${this.name} (${this.key}) initialized with no timeArray value!!!`);
      timeArray = 2;
    }
    if (Array.isArray(timeArray)) {
      // check to make sure that none of the times are scheduled AFTER it's supposed to be over.
      for (let i = 0, c = timeArray.length; i < c; i++) {
        let max = this.duration;
        if (timeArray[i] > max) {
          aw.con.warn(`Condition Omni timeArray has invalid times! ${this.name} (${this.key})`);
          this.duration = timeArray[i];
          max = timeArray[i];
        }
      }
      this.timeArray = clone(timeArray);
    } else if (typeof timeArray === "number") {
      // if given a number, divide up the time to give a linear decreasing rate of occuring
      const mults = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
      const pp = (this.duration / timeArray) / timeArray;
      this.timeArray = [];
      for (let i = 0; i < timeArray; i++) {
        this.timeArray.push(Math.floor(pp * mults[i]));
      }
    } else {
      aw.con.warn(`Omni Condition Error in ${this.name} (${this.key}). Bad timeArray value sent to constructor. Fucked.`);
      this.timeArray = [this.duration];
    }
    if (count == null) {
      this.count = 0;
    } else {
      this.count = count;
    }
  }

  // GETTERS/SETTERS =============================
  public get remaining(): number {
    return (this.added + this.duration) - setup.omni.value;
  }
  public get end(): number {
    return this.added + this.duration;
  }

  // METHODS =====================================
  // returns the omni event icon and text formatted in twee for UI elements
  public print(): string {
    if (this.icon === "none") {
      return "";
    }
    let output = `[${this.name}]📖 ${this.text}`;
    const dur = this.remaining;
    if (dur > 0) {
      let min: string | number = dur % 60;
      const hrsTot = Math.floor(dur / 60);
      let days: string | number = Math.floor(hrsTot / 24);
      let hrs: string | number = hrsTot % 24;
      if (min < 10) {
        min = "0" + min;
      }
      if (hrs < 10) {
        hrs = "0" + hrs;
      }
      if (days > 1) {
        days = days + " days";
      } else {
        days = days + " day";
      }
      if (dur > 1440) {
        // day hr min
        output += ` (⏱ ${days} and ${hrs}:${min} remaining)`;
      } else if (dur > 59) {
        // hr min
        output += ` (⏱ ${hrs}:${min} remaining)`;
      } else {
        output += ` (⏱ ${min} min remaining)`;
      }
    } else {
      output += "(⏱ expired)";
    }
    return `<img data-passage="${this.icon}" title="${output}">`;
  }
  // tests to see if the omni event is ready to fire.
  public test(): boolean {
    const nTime = this.timeArray[this.count] + this.added;
    if (nTime <= setup.omni.value) {
      this.last = nTime;
      setTimeout(() => this.execute(), 25);
      this.count ++;
      return true;
    } else {
      return false;
    }
  }
  // runs the functional code of the event.
  public execute(): void {
    try {
      eval(this.run);
    } catch (e) {
      aw.con.warn(`Condition Omni Event ${this.name} (${this.key}) failed to execute properly due to error - ${e.name}: ${e.message}`);
    }
    if (this.count >= this.timeArray.length) {
      super.die();
    }
  }
}

// CHAIN OMNI EVENT ==============================

class ChainOmni extends OmniEvent {
  // DECLARATIONS ================================
  public type: "chain";
  public timeArray: number[]; // times from start that the effect triggers - autocalculated
  public count: number; // number of times it has executed. (information only)
  public duration: number; // length of time it is expected to last
  public events: {
    [propName: number]: IntChainEvent;
  };
  // CONSTRUCTOR =================================
  constructor({
    key,
    added,
    last,
    name,
    output,
    icon,
    text,
    type,
    duration,
    timeArray,
    count,
    events,
  }: {
    key?: string,
    added?: number,
    last?: number,
    name?: string,
    output?: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact",
    icon?: string,
    text?: string,
    type?: string,
    duration?: number,
    run?: string,
    timeArray?: number[] | number,
    count?: number,
    events?: {[propName: number]: IntChainEvent},
  }) { // CONSTRUCTOR FUNCTION ===================
    super({ key, added, last, name, output, icon, text }); // call to super constructor!
    if (type != null && type !== "chain") {
      aw.con.warn(`Omni Event type mixup error: chain event constructor called with type ${type}.`);
    }
    this.type = "chain";
    this.events = clone(events);
    if (count == null) {
      this.count = 0;
    } else {
      this.count = count;
    }
    if (Array.isArray(timeArray)) {
      this.timeArray = clone(timeArray);
    } else {
      const temp: any[] = Object.keys(this.events); // get numeric property names as strings.
      for (let i = 0, c = temp.length; i < c; i++) {
        temp[i] = Number(temp[i]); // convert back to numbers
      }
      temp.sort((a, b) => a - b); // ensure in ascending order.
      this.timeArray = clone(temp);
    }
    if (duration == null) {
      this.duration = this.timeArray[(this.timeArray.length - 1)];
    } else {
      this.duration = duration;
    }
  }

  // GETTERS/SETTERS =============================
  public get remaining(): number {
    return (this.added + this.duration) - setup.omni.value;
  }
  public get end(): number {
    return this.added + this.duration;
  }

  // METHODS =====================================
  // returns the omni event icon and text formatted in twee for UI elements
  public print(): string {
    if (this.icon === "none") {
      return "";
    }
    let output = `[${this.name}]📖 ${this.text}`;
    const dur = this.remaining;
    if (dur > 0) {
      let min: string | number = dur % 60;
      const hrsTot = Math.floor(dur / 60);
      let days: string | number = Math.floor(hrsTot / 24);
      let hrs: string | number = hrsTot % 24;
      if (min < 10) {
        min = "0" + min;
      }
      if (hrs < 10) {
        hrs = "0" + hrs;
      }
      if (days > 1) {
        days = days + " days";
      } else {
        days = days + " day";
      }
      if (dur > 1440) {
        // day hr min
        output += ` (⏱ ${days} and ${hrs}:${min} remaining)`;
      } else if (dur > 59) {
        // hr min
        output += ` (⏱ ${hrs}:${min} remaining)`;
      } else {
        output += ` (⏱ ${min} min remaining)`;
      }
    } else {
      output += "(⏱ expired)";
    }
    return `<img data-passage="${this.icon}" title="${output}">`;
  }
  // tests to see if the omni event is ready to fire.
  public test(): boolean {
    const balls = this.count;
    const nTime = this.timeArray[balls] + this.added;
    if (nTime <= setup.omni.value) {
      this.count++;
      if (this.events[this.timeArray[balls]].random) {
        // check randomness
        if (random(0, 99) < this.events[this.timeArray[balls]].odds) {
          this.last = nTime;
          setTimeout(() => this.execute(this.timeArray[balls]), 25);
          return true;
        } else {
          this.last = nTime;
          return false; // not executing, so it's safe if another item with same output type runs.
        }
      } else {
        this.last = nTime;
        setTimeout(() => this.execute(this.timeArray[balls]), 25);
        return true;
      }
    } else {
      return false;
    }
  }
  // runs the functional code of the event.
  public execute(num: number): void {
    try {
      eval(this.events[num].run);
    } catch (e) {
      aw.con.warn(`Chain Omni Event ${this.name} (${this.key}) TIME: ${num} failed to execute properly due to error - ${e.name}: ${e.message}`);
    }
    if (this.count >= this.timeArray.length) {
      super.die();
    }
  }
}

