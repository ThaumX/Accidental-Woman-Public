

// default values vol = 10, qual = 6, surv = 4, quant = 12,

class Cum {
  public owner: npcid | "unknown";
  public vol: number;
  public qual: number;
  public surv: number;
  public quant: number;
  public amt: number;
  public time: time;
  public date: date;
  public killer: boolean;
  public omniTime: number;
  constructor({ time, date, omniTime, owner = "unknown", vol = -99, qual = -1, surv = -1, quant = -1, amt = -1, killer}: { time?: time, date?: date, omniTime?: number, owner?: npcid | "unknown", vol?: number, qual?: number, surv?: number, quant?: number, amt?: number, killer?: boolean }) {
    const ᛔ = State.active.variables;
    if (time == null) {
      this.time = jQuery.extend(true, [], ᛔ.time);
    } else {
      if (Array.isArray(time) && time.length >= 2) {
        this.time = jQuery.extend(true, [], time);
      } else {
        this.time = jQuery.extend(true, [], ᛔ.time);
      }
    }
    if (date == null) {
      this.date = jQuery.extend(true, [], ᛔ.date);
    } else {
      if (Array.isArray(date) && date.length === 4) {
        this.date = jQuery.extend(true, [], date);
      } else {
        this.date = jQuery.extend(true, [], ᛔ.date);
      }
    }
    if (omniTime == null) {
      this.omniTime = setup.omni.value;
    } else {
      this.omniTime = omniTime;
    }
    if (owner == null) {
      this.owner = "unknown";
    } else {
      this.owner = owner;
    }
    if (vol === -99) {
      this.vol = random(5, 20);
    } else {
      this.vol = vol; // deci-ml
    }
    if (qual === -1) {
      if (owner === "unknown") {
        this.qual = random(5, 8);
      } else if (setup.testes.test(owner)) {
        this.qual = aw.npc[owner].fert.quality;
      } else {
        this.qual = ↂ.pc.fert.quality;
      }
    } else {
      this.qual = qual;
    }
    if (surv === -1) {
      if (owner === "unknown") {
        this.surv = random(3, 5);
      } else if (setup.testes.test(owner)) {
        this.surv = aw.npc[owner].fert.surv;
      } else {
        this.surv = ↂ.pc.fert.surv;
      }
    } else {
      this.surv = surv;
    }
    if (quant === -1) {
      if (owner === "unknown") {
        this.quant = random(10, 14);
      } else if (setup.testes.test(owner)) {
        this.quant = aw.npc[owner].fert.quantity;
      } else {
        this.quant = ↂ.pc.fert.quantity;
      }
    } else {
      this.quant = quant;
    }
    try {
    if (killer != null) {
      this.killer = killer;
    } else if (setup.testes.test(owner)) {
      this.killer = aw.npc[owner].mutate.killerSperm;
    } else {
      this.killer = (random(1, 10) === 10) ? true : false;
    }
    } catch (e) {
      this.killer = false;
    }
    if (amt === -1) {
      this.amt = Math.abs(this.quant * 100 * vol); // 1k sperm
    } else {
      this.amt = Math.abs(amt);
    }
  }
  // condenses fluid - making it essentially stuck in place by setting fluid portion to 0
  public condense(): void {
    this.vol = 0;
    this.quant = 0;
    this.amt = Math.round(this.amt / Math.max(1, 10 - this.surv));
  }
  // reduces amt based on time since function was ran
  public halfLife(vagHostile: number, mutate?: boolean): void {
    const initialTime = this.omniTime;
    const currentTime = setup.omni.value;
    const hours = Math.floor((currentTime - initialTime) / 60);
    // change omniTime so that next halflife is calculated correctly
    this.omniTime = currentTime - (currentTime - initialTime) % 60; // subtract partial hour minutes
    // mod value affects length of halflife, range set -5 to 5
    const mod = Math.max(-5, Math.min(5, Math.floor((vagHostile - 16) / 4) + (this.surv - 3)));
    const halflife = 10 + mod;
    // determine number of halflives in given time;
    const lives = Math.floor(hours / halflife);
    // adjust omniTime backward for leftover hours;
    this.omniTime -= (hours % halflife) * 60;
    // run loop for lives to kill 50% of sperm each time
    const amtStart = this.amt;
    for (let i = 0; i < lives; i++) {
      if (mutate) {
      // cycle mutation - functioning vas deferens keeps sperm alive longer
        this.amt = Math.floor(this.amt / 1.5);
      } else {
        this.amt = Math.floor(this.amt / 2);
      }
    }
    aw.con.info(`CUM OBJECT HalfLife: owner: ${this.owner}, halflife: ${halflife} hours, lives: ${lives}, start amount: ${amtStart}, current: ${this.amt}.`);
  }
}

