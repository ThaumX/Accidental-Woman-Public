

class Cum {
  public owner: npcid;
  public vol: number;
  public qual: number;
  public surv: number;
  public quant: number;
  public amt: number;
  public time: time;
  public date: date;
  public killer: boolean;
  public omniTime: number;
  constructor({ time, date, omniTime, owner = "unknown", vol = 10, qual = 6, surv = 4, quant = 12, amt = -1, killer}: { time?: time, date?: date, omniTime?: number, owner: npcid, vol: number, qual: number, surv: number, quant: number, amt?: number, killer?: boolean }) {
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
    this.owner = owner;
    this.vol = vol; // deci-ml
    this.qual = qual;
    this.surv = surv;
    this.quant = quant;
    if (killer != null) {
      this.killer = killer;
    } else if (owner !== "unknown") {
      this.killer = aw.npc[owner].mutate.killerSperm;
    } else {
      this.killer = false;
    }
    if (amt === -1) {
      this.amt = quant * 100 * vol; // 1k sperm
    } else {
      this.amt = amt;
    }
  }
  // condenses fluid - making it essentially stuck in place by setting fluid portion to 0
  public condense(): void {
    this.vol = 0;
    this.quant = 0;
    this.amt = Math.round(this.amt / Math.max(1, 10 - this.surv));
  }
  // reduces amt based on time since function was ran
  public halfLife(vagHostile: number): void {
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
      this.amt = Math.floor(this.amt / 2);
    }
    aw.con.info(`CUM OBJECT HalfLife: owner: ${this.owner}, halflife: ${halflife} hours, lives: ${lives}, start amount: ${amtStart}, current: ${this.amt}.`);
  }
}

