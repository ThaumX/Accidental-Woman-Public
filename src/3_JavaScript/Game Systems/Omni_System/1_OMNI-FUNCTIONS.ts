
//         .d88888b.  888b     d888 888b    888 8888888
//        d88P" "Y88b 8888b   d8888 8888b   888   888
//        888     888 88888b.d88888 88888b  888   888
//        888     888 888Y88888P888 888Y88b 888   888
//        888     888 888 Y888P 888 888 Y88b888   888
//        888     888 888  Y8P  888 888  Y88888   888
//        Y88b. .d88P 888   "   888 888   Y8888   888
//         "Y88888P"  888       888 888    Y888 8888888
//
//
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

/*  ~~ OMNI EVENTS ~~
There are five types of omni events that offer differing functionality
Combined, they allow handling of EVERY type of time-based effect or event
Events are added once execution is expected, unlike other object groups
where objects are added as part of a centralized repository.
.  Event Types:
.  "single"    : a simple event that executes exactly once after the
.                set time, and is deleted. [e.g. story chain trigger]
.  "recurring" : a simple event that executes on a set interval for a
.                certain number of times. [e.g. status effect - drug]
.  "condition" : a irregularly-timed event that occurs based on a cycle count
.                of set intervals. It also implements its effect based
.                on this count, and can change over time. [e.g. withdrawal]
.  "chain"     : most complex event, has a set of unique events that
.                occur at set times in the 'chain', including variable
.                execution time ranges, and self-adding events to the
.                event chain. [e.g. pregnancy]
.  "perpetual" : an event that occurs at a set frequency without a set
.                ending point for a long-term effect. must be cancelled
.                externally. [e.g. roleplay mode special threshold]
*/

/*
.  HANDY-TIMES!
.     720 = 12 hours
.   1,440 = 1 day;
.  10,080 = 1 week;
.  40,320 = 1 month;
*/

interface IntOmniData { // incoming data to OmniEvent constructor
  key?: string;
  name: string;
  type: "single" | "recurring" | "condition" | "chain" | "perpetual";
  output: "none" | "dialog" | "notify" | "alert" | "scenario" | "interact";
  icon?: string;
  text?: string;
  duration?: number;
  interval?: number;
  count?: number;
  times?: number;
  run: string;
  timeArray?: number[] | number;
  events?: { // data for chain events
    [propName: number]: IntChainEvent;
  };
}

interface IntChainEvent {
  random: boolean; // if check randomizer before running set to true.
  odds: number; // number in 100 chance of occurring. 90 = 90% chance.
  run: string;
}

interface setupOmni {
  delay: number;
  value: number;
  count: number;
  run: () => void;
  add: (min: number) => void;
  time: (type: string) => number | number[];
  keys: () => string[];
  matching: (name: string) => number;
  new: (input: IntOmniData | string, options?: IntNewOmniOpt) => string;
  /*timesBuild: (events: {
      [propName: string]: IntChainEvent,
    }) => number[];*/
  kill: (key: string) => void;
  keyGen: () => string;
  omniRestore: (json: string[]) => string;
  iconPrint: () => string;
  stringify: () => string[];
}

interface IntNewOmniOpt {
  name?: string;
  added?: number;
  duration?: number;
  interval?: number;
  icon?: string;
  text?: string;
}


// STORAGE NAMESPACE
aw.omni = {};


// OMNI MEAT
setup.omni = {
  // delay for asynchronously starting omni checks (milliseconds)
  delay: 30,
  // actual omni time value
  value: 10080,
  // tracker for assigning unique keys
  count: 1000,
  // adds minutes to omni value, automatic triggered by setup.time.add/set
  // runs omni.run asynchronously
  add(min: number) {
    if (!isNaN(min)) {
      setup.omni.value += Number(min);
      setup.omni.run();
    } else {
      aw.con.warn(`Invalid add value to setup.omni: ${min}`);
      return;
    }
    setTimeout(() => setup.omni.run(), setup.omni.delay);
  },
  // returns time value based on omni-time, converted to preference
  time(type: string = "time"): number | number[] {
    const value = setup.omni.value;
    const hoursTotal = Math.floor(value / 60);
    const minutes = value % 60;
    const daysTotal = Math.floor(hoursTotal / 24);
    const hours = hoursTotal % 24;
    const weeksTotal = Math.floor(daysTotal % 7);
    const days = daysTotal % 7;
    const months = Math.floor(weeksTotal / 4);
    const weeks = weeksTotal % 4;
    switch (type) {
      case "time":
        return [hours, minutes];
      case "all":
        return [minutes, hours, days, weeks, months];
      case "min":
      case "minutes":
        return minutes;
      case "minutesTotal":
      case "minTotal":
        return setup.omni.value;
      case "hours":
      case "hrs":
        return hours;
      case "hoursTotal":
      case "hrsTotal":
        return hoursTotal;
      case "days":
        return days;
      case "daysTotal":
        return daysTotal;
      case "weeks":
        return weeks;
      case "weeksTotal":
        return weeksTotal;
      case "months":
        return months;
      default:
        aw.con.warn(`bad time request to setup.omni.time: ${type}`);
        return [hours, minutes];
    }
  },
  // goes through list of omniEvents, which self-trigger as appropriate.
  // filters for output to avoid conflict
  run() {
    let dialog = false;
    let notify = false;
    let alert = false;
    let scenario = false;
    let interact = false;
    if (!setup.eventAllowed) {
      dialog = true;
      notify = true;
      alert = true;
      scenario = true;
      interact = true;
    }
    const keys = setup.omni.keys();
    let cunt = 0;
    let skipped = 0;
    // loop through omniEvents
    for (let i = 0, c = keys.length; i < c; i++) {
      const output = aw.omni[keys[i]].output;
      let flag: boolean | 69 = 69;
      if (output === "none") {
        flag = aw.omni[keys[i]].test();
      } else if (output === "notify" && !notify) {
        flag = aw.omni[keys[i]].test();
        notify = (flag) ? true : false;
      } else if (output === "dialog" && !dialog) {
        // check if dialog is already open before testing!
        if (!Dialog.isOpen()) {
          flag = aw.omni[keys[i]].test();
          // dialog = (flag) ? true : false;
        }
      } else if (output === "alert" && !alert) {
        flag = aw.omni[keys[i]].test();
        alert = (flag) ? true : false;
      } else if (output === "scenario" && !scenario) {
        flag = aw.omni[keys[i]].test();
        scenario = (flag) ? true : false;
      } else if (output === "interact" && !interact) {
        flag = aw.omni[keys[i]].test();
        interact = (flag) ? true : false;
      }
      // else do nothing
      if (flag === 69) {
        skipped++;
      } else if (flag) {
        cunt++;
      }
    }
    aw.con.info(`OMNI - Triggered: ${cunt}, Skipped: ${skipped}, Total: ${keys.length}.`);
    // start the event checking function
    // setTimeout(() => setup.event.check("all"), setup.event.delay);
  },
  // returns an array of omniEvent keys
  keys(): string[] {
    return Object.keys(aw.omni);
  },
  // returns number of omniEvents matching provided name
  matching(name: string): number {
    const keys = setup.omni.keys();
    let cunt = 0;
    for (let i = 0, c = keys.length; i < c; i++) {
      if (aw.omni[keys[i]].name === name) {
        cunt++;
      }
    }
    return cunt;
  },
  new(input: IntOmniData | string, options?: IntNewOmniOpt): string {
    const key = setup.omni.keyGen();
    if (typeof input === "string") {
      if (Object.keys(setup.omnItems).includes(input)) {
        // found it, can use item
        const oItem = clone(setup.omnItems[input]);
        if (options !== null && options !== undefined) {
          oItem.name = (options.name) ? options.name : oItem.name;
          oItem.added = (options.added) ? options.added : oItem.added;
          oItem.duration = (options.duration) ? options.duration : oItem.duration;
          oItem.interval = (options.interval) ? options.interval : oItem.interval;
          oItem.icon = (options.icon) ? options.icon : oItem.icon;
          oItem.text = (options.text) ? options.text : oItem.text;
        }
        oItem.key = key;
        switch (oItem.type) {
          case "single":
            aw.omni[key] = new SingleOmni(oItem);
            break;
          case "recurring":
            aw.omni[key] = new RecurringOmni(oItem);
            break;
          case "perpetual":
            aw.omni[key] = new PerpetualOmni(oItem);
            break;
          case "condition":
            aw.omni[key] = new ConditionOmni(oItem);
            break;
          case "chain":
            aw.omni[key] = new ChainOmni(oItem);
            break;
          default:
            aw.con.warn(`Attempted to add omni event without a type! (${oItem.name}/ ${input})`);
        }
      } else {
        aw.con.warn(`Bad omnItem name "${input}, no such item exists!`);
        return "error";
      }
    } else {
      input.key = key;
      switch (input.type) {
        case "single":
          aw.omni[key] = new SingleOmni(input);
          break;
        case "recurring":
          aw.omni[key] = new RecurringOmni(input);
          break;
        case "perpetual":
          aw.omni[key] = new PerpetualOmni(input);
          break;
        case "condition":
          aw.omni[key] = new ConditionOmni(input);
          break;
        case "chain":
          aw.omni[key] = new ChainOmni(input);
          break;
        default:
          aw.con.warn(`Attempted to add omni event without a type! (${input.name}/ direct input)`);
      }
    }
    return key;
  },
  // returns an array of omni-times for proc of chains
  /*timesBuild(events): number[] {
    const keys = Object.keys(events);
    const timeArray: any[] = [];
    for (let i = 0, c = keys.length; i < c; i++) {
      timeArray.push(events[keys[i]].time[1] + setup.omni.value);
    }
    timeArray.sort((a, b) => b - a); // descending order
    return [...timeArray];
  },*/
  // deletes the OmniEvent from the aw.omni object
  kill(key: string): void {
    if (aw.omni[key] == null) {
      if (setup.omni.matching(key) > 0) {
        const keys = setup.omni.keys();
        for (const k of keys) {
          if (aw.omni[k].name === key) {
            key = k;
            break;
          }
        }
      }
    }
    try {
      delete aw.omni[key];
    } catch (e) {
      aw.con.warn(`Failed to delete OmniEvent with key "${key}". ${e.name}: ${e.message}.`);
    }
  },
  keyGen(): string {
    const omniKeys = setup.omni.keys();
    const letters = ["b", "c", "d", "f", "g", "h", "j", "k", "m", "n", "p"];
    let key = "xxx";
    do {
      setup.omni.count++;
      const count = setup.omni.count + "";
      let work = "";
      let j = 0;
      let num;
      for (let i = 0, c = count.length; i < c; i++) {
        j = i + 1;
        num = Number(count.slice(i, j));
        work += letters[num];
      }
      key = work;
    } while (omniKeys.includes(key));
    return key;
  },
  omniRestore(json: string[]): string {
    let result: string = "";
    aw.omni = {};
    for (let i = 0, c = json.length; i < c; i++) {
      try {
        const data = JSON.parse(json[i]);
        switch (data.type) {
          case "single":
            aw.omni[data.key] = new SingleOmni(data);
            break;
          case "recurring":
            aw.omni[data.key] = new RecurringOmni(data);
            break;
          case "perpetual":
            aw.omni[data.key] = new PerpetualOmni(data);
            break;
          case "condition":
            aw.omni[data.key] = new ConditionOmni(data);
            break;
          case "chain":
            aw.omni[data.key] = new ChainOmni(data);
            break;
          default:
            aw.con.warn(`Saved omni event (${i} of ${json.length}) doesn't have a type somehow...`);
        }
      } catch (e) {
        result += `Restoring OmniSystem OmniEvents (${i} of ${json.length}) failed with error ${e.name}: ${e.message}! `;
      }
    }
    if (result === "") {
      result = "success";
    }
    return result;
  },
  iconPrint(printAll: boolean = false): string {
    const keys = setup.omni.keys();
    let output = "";
    // k counts total icons being printed. for UI, we can only display 6, so we limit to a max of 6.
    // if printAll is true, we print ALL icons by setting k arbitrarily low, so it never reaches 6.
    // much more efficient than multiple checks on printAll :D
    let k = (printAll) ? -100 : 0;
    for (let i = 0, c = keys.length; i < c; i++) { // cycle through omnis and use print method
      const icon = aw.omni[keys[i]].print();
      if (icon !== "") { // count only those with icon output
        output += icon;
        k++;
        if (k > 5) { // if icon count reaches above 5, end loop early.
          break;
        }
      }
    }
    if (!ↂ.flag.Prologue) {
      if (k < 6 && ↂ.flag.badEnd !== "none") {
        output += `<img data-passage="IMGstatus_DeathSick" title="You feel an impending sense of doom... [see Encyclopedia Entry Doom]">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.health < 16) {
        output += `<img data-passage="IMGstatus_Dead" title="You have dangerously low health.">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.addict.jonesing > 5) {
        output += `<img data-passage="IMGstatus_DrugCraving" title="You know what you need." style="opacity:0.7;">`;
        k++;
      }
      if (k < 6 && ↂ.flag.BackupTraits.libido < ↂ.pc.trait.libido && !ↂ.flag.Prologue) {
        output += `<img data-passage="IMGstatus_IncreasedLibido" title="Your libido is higher than usual." style="opacity:0.7;">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.alcohol > 0) {
        switch (ↂ.pc.status.alcohol) {
          case 1:
          case 2:
            output += `<img data-passage="IMGstatus_AlcTipsy" title="You have a slight buzz.">`;
            break;
          case 3:
          case 4:
            output += `<img data-passage="IMGstatus_AlcTipsy" title="You are a little bit tipsy.">`;
            break;
          case 5:
          case 6:
            output += `<img data-passage="IMGstatus_AlcDrunk" title="You are quite tipsy.">`;
            break;
          case 7:
          case 8:
            output += `<img data-passage="IMGstatus_AlcDrunk" title="You are drunk.">`;
            break;
          case 9:
          case 10:
            output += `<img data-passage="IMGstatus_AlcWasted" title="You are wasted.">`;
            break;
          case 11:
          case 12:
            output += `<img data-passage="IMGstatus_AlcWasted" title="You are black-out drunk.">`;
        }
        k++;
      }
      if (k < 6 && ↂ.pc.status.happy < -4) {
        output += `<img data-passage="IMGstatus_Depressed" title="You are depressed.">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.lonely > 74) {
        output += `<img data-passage="IMGstatus_Lonely" title="You are lonely.">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.stress > 74) {
        output += `<img data-passage="IMGstatus_Stressed" title="You are stressed out.">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.satisfaction < 20) {
        output += `<img data-passage="IMGstatus_Unsatisfied" title="You are very unsatisfied.">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.birthCon.diaphragm.worn) {
        output += `<img data-passage="IMGstatus_diaphragm" title="You are wearing a diaphragm.">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.nutrition !== undefined && setup.valToBMI(ↂ.pc.status.nutrition.realWeight) < 15) {
        output += `<img data-passage="IMGstatus_Starvation" title="You are starving. Death is near...">`;
        k++;
      }
      if (k < 6 && ↂ.pc.body.tits.base.size >= 24000) {
        output += `<img data-passage="IMGstatus_weight" title="Your breasts are dangerously heavy ${setup.calcBreastWeight(ↂ.pc.body.tits.base.size)}">`;
        k++;
      }
      if (k < 6 && ((ↂ.pc.status.wombA.fetus.length > 0 && ↂ.pc.status.wombA.know) || (ↂ.pc.status.wombB.fetus.length > 0 && ↂ.pc.status.wombB.know))) {
        output += `<img data-passage="IMGstatus_pregnant" title="You are pregnant. Congratulations!">`;
        k++;
      }
    }
    return output;
  },
  stringify(): string[] {
    /*function replacer(key, value) {
      // converting functions to strings
      if (typeof value === "function") {
        // aw.con.info(this[key].toString());
        aw.con.warn(`Found a function lurking in an omni event. key: ${key}`);
        return this[key].toString();
      }
      return value;
    }*/
    const events = Object.keys(aw.omni);
    const omnarray: string[] = [];
    for (let i = 0, c = events.length; i < c; i++) {
      omnarray.push(JSON.stringify(aw.omni[events[i]]));
    }
    return omnarray;
  },
};











