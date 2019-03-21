

class Anus {
  public virgin: boolean;
  public tight: number;
  public stretch: number;
  public time: number | string;
  public wetness: number;
  public tags: string[];
  public _k: string;
  constructor(key, {
    virgin = false,
    tight = -1,
    stretch = -1,
    time = -1,
    wetness = -1,
    tags = ["none"],
  }: DataPussy) {
    this._k = key;
    this.virgin = virgin;
    if (tight < 0 || tight > 13) {
      this.tight = random(3, 6) as 3 | 4 | 5 | 6;
    } else {
      this.tight = tight;
    }
    if (stretch < 0 || stretch > 5) {
      this.stretch = setup.randomDist([10, 5, 1]) as 0 | 1 | 2;
    } else {
      this.stretch = stretch;
    }
    if (time < 0) {
      if (this.stretch > 0) {
        this.time = random(1, 5);
      } else {
        this.time = 0;
      }
    } else {
      this.time = time;
    }
    if (wetness < 0) {
      this.wetness = random(0, 3);
    } else {
      this.wetness = wetness;
    }
    this.tags = clone(tags);
  }
  public get size(): number {
    return this.tight + this.stretch;
  }
  // returns the most the orifice can "stretch" without affecting tight value
  public get maxStretch(): number {
    let x: number;
    // const elastic = this.parent.mutate.elastic; // check for elastic mutation.
    if (this.tight <= 3) {
      x = 0.5;
    } else if (this.tight <= 6) {
      x = 1 / 3;
    } else {
      x = 0.25;
    }
    // x += (elastic) ? 0.3 : 0; // main effect of elastic mute
    const tito = (this.tight <= 0) ? 1 : 0;
    return Math.round(tito * x);
  }
  // returns the effective size of the orifice by accounting for wetness and current wetness.
  public get efSize(): number {
    const curWet = this.parent().status.wetness - 5; // minus because low wetness decreases effective.
    const ratio = Math.min(((this.wetness) / 20 + 0.4), 0.75); // range from 0.4 to 0.75.
    const sizo = (this.size <= 0) ? -1 : this.size;
    let efSize;
    if (curWet >= 0) {
      efSize = sizo + Math.floor((curWet * ratio) / 2.5); // wetness has decreasing additional value.
    } else {
      efSize = sizo - Math.ceil((curWet * (1.5 - ratio)) / 1.5); // too dry shrinks effective size.
    }
    if (efSize > Math.floor(sizo * 1.5)) { // limit wetness bonus based on base size.
      efSize = Math.floor(sizo * 1.5);
    } else if (efSize < 0) { // size should always be 0 or greater.
      efSize = 0;
    }
    aw.con.info(`The effective size is ${efSize}, curWet: ${curWet}, ratio: ${ratio}.`);
    return efSize;
  }
  public parent(): PC | NPC {
    if (this._k === "pc") {
      return ↂ.pc;
    } else {
      return aw.npc[this._k];
    }
  }
  public timerCheck(): void {
    if (this.parent().main.id === "PC") {
      // aw.L("pc");
      // aw.con.info(`Loaded aw.L() : ${performance.now()}`);
    }
    if (this.stretch > 0 && typeof this.time !== "string") {
      this.stretch = 0;
      this.time = 0;
      const id = (this.parent().main.id === "PC") ? "PC" : "N" + this.parent().main.id;
      aw.con.warn(`Orifice timerCheck found stretch value with no timer on character ${id}.`);
      if (this.parent().main.id === "PC") {
        aw.S("pc");
        aw.con.info(`saved after timercheck : ${performance.now()}`);
      }
    }
  }
  public insert(inSize: number): "loose" | "fits" | "stretch" | "pain" | "overstretch" | "notfit" {
    this.timerCheck();
    const es = this.efSize;
    const curStretch = this.stretch;
    const maxStretch = this.maxStretch;
    aw.con.info(`New Anus.insert() - inSize: ${inSize}, curStretch: ${curStretch}, maxStretch: ${maxStretch}.`);
    if (inSize < (es - curStretch) - 2 && inSize < this.tight) {
      return "loose"; // fits very easily, will be up to kegals separately.
    } else if (inSize <= (es - curStretch)) { // fits w/o extending existing stretch
      return "fits";
    } else if (inSize <= es) { // if size is bigger than the unstretched size it restarts the clock;
      setTimeout(function() { this.timeReset(); }.bind(this), 25); // we can put off the actual stretching for now.
      return "fits";
    }
    const stretchAmt = Math.min((inSize - es), ((1 + inSize) - this.size)); // the amount of new stretching.
    aw.con.info(`Stretching Anus: stretchAmt = ${stretchAmt}. :: ${performance.now()}`);
    if (inSize <= (es - curStretch) + maxStretch) { // additional stretching - not permanent.
      if (stretchAmt > 1) {
        setTimeout(function() { this.newStretch(stretchAmt, true); }.bind(this), 25);
        return "pain"; // stretching too much at once gives a "pain" result to inform calling function.
      } else {
        setTimeout(function() { this.newStretch(stretchAmt); }.bind(this), 25);
        return "stretch";
      }
    } else if (inSize > es + maxStretch + 2) { // wont fit!
      // stretch by 1 for trying
      setTimeout(function() { this.newStretch(1); }.bind(this), 25);
      return "notfit";
    } else { // by default size is bigger than max stretch, but still fits
      // mega stretch
      setTimeout(function() { this.newStretch(stretchAmt); }.bind(this), 25);
      return "overstretch";
    }
  }
  public timeReset(): void {
    const addTime = this.stretchTime();
    const ᚥ = aw.omni[this.time] as SingleOmni;
    if (ᚥ == null) {
      aw.con.warn(`Tried to reset time on orifice timer but listed timer key is invalid! key: ${this.time}, charID: ${this.parent().main.id}.`);
      this.time = 0; // reset timer label so it will be caught by timerCheck
    } else {
      if (typeof ᚥ.duration === "number") {
        ᚥ.duration += addTime - ᚥ.remaining;
      }
    }
  }
  public newStretch(stretchAmt: number, pain: boolean = false): void {
    const isPC = (this.parent().main.id === "PC") ? true : false;
    /*if (isPC) {
      aw.L();
    }*/
    if (stretchAmt + this.stretch > this.maxStretch) {
      if (this.stretch === this.maxStretch && stretchAmt === 1) {
        pain = false;
      } else {
        pain = true;
      }
      this.stretch = this.maxStretch;
      this.tight += (stretchAmt + this.stretch) - this.maxStretch;
      if (this.tight > 15) {
        this.tight = 15;
      }
      aw.con.info(`Stretch+tight. stretchAmt: ${stretchAmt}, this.stretch: ${this.stretch} ${ↂ.pc.body.asshole.stretch}, this.tight: ${this.tight} ${ↂ.pc.body.asshole.tight}, pain: ${pain}. :: ${performance.now()}`);
    } else {
      this.stretch += stretchAmt;
      aw.con.info(`Just stretch. stretchAmt: ${stretchAmt}, this.stretch: ${this.stretch} ${ↂ.pc.body.asshole.stretch}. :: ${performance.now()}`);
    }
    if (pain) {
      this.parent().status.health -= random(3, 5);
    }
    if (this.stretch > 0) {
      this.createTimer(this.stretchTime());
    }
    if (isPC) {
      // aw.S("pc");
      aw.con.info(`Saved aw.S() after value change: ${performance.now()}`);
      if (pain) {
        this.createPainTimer();
      }
    }
  }
  public lessStretch(): void {
    const isPC = (this.parent().main.id === "PC") ? true : false;
    if (isPC) {
      aw.L("pc");
    }
    this.stretch -= 1;
    if (this.stretch < 0) {
      this.stretch = 0;
    }
    this.time = 0;
    if (this.stretch > 0) {
      this.createTimer(this.stretchTime());
    }
    if (isPC) {
      aw.S("pc");
    }
  }
  public createTimer(length: number): void {
    const self = this.parent().main.id;
    const timer: IntOmniData = {
      name: "stretch-" + self,
      type: "single",
      output: "none",
      duration: length,
      run: `
        if (self === "PC") {
          ↂ.pc.body.asshole.lessStretch();
        } else {
          const id = "n" + self;
          try {
            aw.npc[id].body.asshole.lessStretch();
          } catch (e) {
            aw.con.info("Tried to orifice.lesstretch() on nonexistant NPC: " + id);
          }
        }
      `,
    };
    this.time = setup.omni.new(timer); // create omni timer, save timer key
    aw.con.info(`created asshole timer, length: ${length}, key: ${this.time}.`);
    /*if (this.parent.main.id === "PC") {
      aw.S("pc");
      aw.con.info(`saving aw.S() after creating timer :: ${performance.now()}`);
    }*/
  }
  public createPainTimer(): void {
    if (setup.omni.matching("Sore Anus") > 0) {
      return; // stop from duplicating. TODO consider adding code to extend soreness or worsen effect.
    }
    setup.status.happy(-1);
    setup.status.stress(random(5, 15));
    if (ↂ.pc.status.arousal > 0) {
      setup.status.arousal(-2);
    }
    const timer: IntOmniData = {
      name: "Sore Anus",
      type: "single",
      output: "notify",
      duration: 1440,
      icon: "IMGstatus_Injured",
      text: "Your anus is sore and uncomfortable from the abuse.",
      run: `aw.L("pc");
          ↂ.pc.status.addict.sex += random(2, 4);
          aw.S("pc");
          setup.notify("Your asshole is feeling better.");`,
    };
    setup.omni.new(timer);
  }
  public stretchTime(amt?: number): number {
    if (amt == null) {
      amt = this.stretch;
    }
    const times = [ // time duration a stretch value lasts before decrement, index is amount
      30,
      1080, // 18hr
      720, // 12hr
      360, // 6hr
      180, // 3hr
      90, // 1.5hr
      45,
      30,
      30,
      30,
      30,
    ];
    let time = times[amt];
    if (this.parent().mutate.elastic) {
      time = Math.round(time * 0.75);
    }
    return time;
  }
  public test(amt: number): string {
    setTimeout(function() {
      this.tight = amt;
      aw.S("pc");
      aw.con.info(`The value is really ${ↂ.pc.body.asshole.tight} or ${this.tight}`);
    }.bind(this), 25);
    return `new value is ${this.tight}.`;
  }
}

