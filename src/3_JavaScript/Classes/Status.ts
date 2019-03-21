

class Status {
  public birthCon: BirthCon;
  public drugs: number[];
  public wombA: Womb;
  public wombB: Womb;
  public healthOld: number;
  public addict: Addiction;
  public energy: Energy;
  public nutrition?: Nutrition;
  public injury: string[];
  public disease: string[];
  public inPublic: boolean;
  // tslint:disable-next-line:max-line-length
  public data: [number, number, string, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, boolean, number, number, boolean, boolean, boolean, number, number, boolean, number, number, number, number, number, number];
  public _k: string;
  constructor(key, {
    birthCon,
    alcohol,
    drugs,
    fertText,
    risk,
    cyc,
    wombA,
    wombB,
    period,
    milk,
    milkStore,
    arousal,
    pleasure,
    need,
    satisfaction,
    wetness,
    atr,
    stress,
    happy,
    anger,
    lonely,
    fatigue,
    health,
    overAnger,
    overStress,
    overDepress,
    addict,
    energy,
    kids,
    clean,
    injury,
    disease,
    sleep,
    will,
    inPublic,
    underSatisfy,
    mindbreak,
    morality = 50,
    corrupt = 5,
    perversion = 25,
    exercise,
    bimbo = 5,
    nutrition,
    healthOld,
    data,
  }: DataStatus) {
    this._k = key;
    this.birthCon = new BirthCon(key, birthCon);
    this.wombA = new Womb(key, wombA);
    this.wombB = new Womb(key, wombB);
    this.addict = new Addiction(key, addict);
    this.energy = clone(energy);
    this.drugs = clone(drugs);
    this.injury = clone(injury);
    this.disease = clone(disease);
    this.healthOld = (healthOld == null) ? 100 : healthOld;
    if (nutrition !== null && nutrition !== undefined) {
      this.nutrition = clone(nutrition);
    }
    if (inPublic == null) {
      this.inPublic = true;
    } else {
      this.inPublic = inPublic;
    }
    if (cyc == null) {
      cyc = risk;
    }
    if (kids == null) {
      kids = 0;
    }
    if (exercise == null) {
      exercise = 0;
    }
    if (data == null) {
      // tslint:disable-next-line:max-line-length
      this.data = [alcohol, wetness, fertText, risk, cyc, period, milk, milkStore, arousal, pleasure, need, satisfaction, atr, stress, happy, anger, lonely, fatigue, sleep, health, will, overAnger, overStress, overDepress, underSatisfy, clean, mindbreak, morality, corrupt, perversion, bimbo, kids, exercise];
    } else {
      this.data = clone(data);
    }
  }
  public get alcohol(): number {
    return this.data[0];
  }
  public set alcohol(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.alcohol to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    if (val > 12) {
      val = 12;
      if (this._k === "pc") {
        ↂ.flag.badEnd = "Alcohol Poisoning";
        setup.omni.new("alcoholPoisoning");
      }
    }
    if (val > 9 && this._k === "pc") {
      if (setup.omni.matching("alcoholNausea") === 0) {
        setup.omni.new("alcoholNausea");
      }
    }
    this.data[0] = val;
  }
  public get wetness(): number {
    return this.data[1];
  }
  public set wetness(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.wetness to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 20) {
      val = 20;
    }
    if (this._k === "pc") {
      aw.con.info(`Wetness change: ${this.data[1]} to ${val} (${val - this.data[1]})`);
    }
    this.data[1] = val;
  }
  public get fertText(): string {
    return this.data[2];
  }
  public set fertText(val: string) {
    this.data[2] = val;
  }
  public get risk(): number {
    return this.data[3];
  }
  public set risk(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.risk to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 5) {
      val = 5;
    }
    this.data[3] = val;
  }
  public get cyc(): number {
    return this.data[4];
  }
  public set cyc(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.cyc to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 5) {
      val = 5;
    }
    this.data[4] = val;
  }
  public get period(): number {
    return this.data[5];
  }
  public set period(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.period to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    this.data[5] = val;
  }
  public get milk(): number {
    return this.data[6];
  }
  public set milk(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.milk to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 10) {
      val = 10;
    }
    this.data[6] = val;
  }
  public get milkStore(): number {
    return this.data[7];
  }
  public set milkStore(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.milkStore to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    this.data[7] = val;
  }
  public get arousal(): number {
    return this.data[8];
  }
  public set arousal(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.arousal to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 20) {
      val = 20;
    }
    if (this._k === "pc") {
      aw.con.info(`Arousal change: ${this.data[8]} to ${val} (${val - this.data[8]})`);
    }
    this.data[8] = val;
  }
  public get pleasure(): number {
    return this.data[9];
  }
  public set pleasure(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.pleasure to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    this.data[9] = val;
  }
  public get need(): number {
    return this.data[10];
  }
  public set need(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.need to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 5) {
      val = 5;
    }
    if (this._k === "pc") {
      aw.con.info(`Need change: ${this.data[10]} to ${val} (${val - this.data[10]})`);
    }
    this.data[10] = val;
  }
  public get satisfaction(): number {
    return this.data[11];
  }
  public set satisfaction(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.satisfaction to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Satisfaction change: ${this.data[11]} to ${val} (${val - this.data[11]})`);
    }
    this.data[11] = val;
  }
  public get atr(): number {
    return this.data[12];
  }
  public set atr(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      // aw.con.info(`attempted to set status.atr to a non-number value! Value: ${val} Character: ${this._k}.`);
      val = 0;
    }
    if (val < -10) {
      val = -10;
    } else if (val > 20) {
      val = 20;
    }
    this.data[12] = val;
  }
  public get stress(): number {
    return this.data[13];
  }
  public set stress(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.stress to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Stress change: ${this.data[13]} to ${val} (${val - this.data[13]})`);
    }
    this.data[13] = val;
  }
  public get happy(): number {
    return this.data[14];
  }
  public set happy(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.happy to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (this._k === "pc") {
      aw.con.info(`Adjusted PC Happiness - from ${this.data[17]} to ${val}.`);
    }
    if (val < -10) {
      val = -10;
    } else if (val > 10) {
      val = 10;
    }
    if (this._k === "pc") {
      aw.con.info(`Happiness change: ${this.data[14]} to ${val} (${val - this.data[14]})`);
    }
    this.data[14] = val;
  }
  public get anger(): number {
    return this.data[15];
  }
  public set anger(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.anger to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 10) {
      val = 10;
    }
    if (this._k === "pc") {
      aw.con.info(`Anger change: ${this.data[15]} to ${val} (${val - this.data[15]})`);
    }
    this.data[15] = val;
  }
  public get lonely(): number {
    return this.data[16];
  }
  public set lonely(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.lonely to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Loneliness change: ${this.data[16]} to ${val} (${val - this.data[16]})`);
    }
    this.data[16] = val;
  }
  public get fatigue(): number {
    return this.data[17];
  }
  public set fatigue(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.fatigue to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (this._k === "pc") {
      aw.con.info(`Adjusted PC fatigue - from ${this.data[17]} to ${val}.`);
    }
    if (val < 0) {
      val = 0;
    } else if (val > 10) {
      val = 10;
    }
    this.data[17] = val;
  }
  public get sleep(): boolean {
    return this.data[18];
  }
  public set sleep(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`attempted to set status.sleep to a non-boolean value! Character: ${this._k}.`);
      return;
    }
    this.data[18] = val;
  }
  public get health(): number {
    return this.data[19];
  }
  public set health(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.health to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Health change: ${this.data[19]} to ${val} (${val - this.data[19]})`);
    }
    this.data[19] = val;
  }
  public get will(): number {
    let out: number;
    try {
      let base = (this._k === "pc") ? ↂ.pc.trait.will : aw.npc[this._k].trait.will;
      base += 4; // sets default 'low' willpower to starting value of 5.
      if (this.stress > 69) {
        base -= 1;
      } else if (this.stress < 21) {
        base += 1;
      }
      if (this.alcohol > 0) {
        base -= Math.min(3, this.alcohol);
      }
      if (this.anger > 4) {
        base -= 1;
      }
      if (this.arousal > 4) {
        base -= random(1, 2);
        if (this.arousal > 7) {
          base -= random(1, 2);
        }
      }
      if (this.bimbo > 25) {
        base -= Math.round(this.bimbo / 25);
      }
      if (this.cyc > 3) {
        base -= 1;
      } else {
        base += 1;
      }
      if (this.fatigue > 8) {
        base -= 1;
      } else if (this.fatigue < 5 && this.energy.amt > 7) {
        base += 1;
      }
      if (this.happy < 0) {
        base -= 1;
        if (this.happy < -4) {
          base -= 1;
        }
      } else if (this.happy > 4) {
        base += 1;
      }
      if (this.need > 0) {
        base -= Math.round(this.need / 2);
      }
      if (this.satisfaction < 20) {
        base -= 1;
      } else if (this.satisfaction > 59) {
        base += 1;
      }
      if (this.lonely > 74) {
        base -= 1;
      } else if (this.lonely < 21) {
        base += 1;
      }
      if (this.health < 90) {
        base -= 1;
      }
      if (base < 0) {
        base = 0;
      } else if (base > 10) {
        base = 10;
      }
      out = base;
    } catch (e) {
      aw.con.info(`Error gathering status.will for character ${this._k}. ${e.name}: ${e.message}.`);
      out = this.data[20];
    }
    return out;
  }
  public set will(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.will to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 10) {
      val = 10;
    }
    aw.con.info(`Set status.will value on char ${this._k}`);
    this.data[20] = val;
  }
  public get overAnger(): boolean {
    return this.data[21];
  }
  public set overAnger(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`attempted to set status.sleep to a non-boolean value! Character: ${this._k}.`);
      return;
    }
    this.data[21] = val;
  }
  public get overStress(): boolean {
    return this.data[22];
  }
  public set overStress(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`attempted to set status.sleep to a non-boolean value! Character: ${this._k}.`);
      return;
    }
    this.data[22] = val;
  }
  public get overDepress(): boolean {
    return this.data[23];
  }
  public set overDepress(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`attempted to set status.sleep to a non-boolean value! Character: ${this._k}.`);
      return;
    }
    this.data[23] = val;
  }
  public get underSatisfy(): number {
    return this.data[24];
  }
  public set underSatisfy(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.underSatisfy to a non-number value! Character: ${this._k}.`);
      return;
    }
    this.data[24] = val;
  }
  public get clean(): number {
    return this.data[25];
  }
  public set clean(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.clean to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 10) {
      val = 10;
    }
    this.data[25] = val;
  }
  public get mindbreak(): boolean {
    return this.data[26];
  }
  public set mindbreak(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`attempted to set status.sleep to a non-boolean value! Character: ${this._k}.`);
      return;
    }
    this.data[26] = val;
  }
  public get morality(): number {
    return this.data[27];
  }
  public set morality(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.morality to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Morality change: ${this.data[27]} to ${val} (${val - this.data[27]})`);
    }
    this.data[27] = val;
  }
  public get corrupt(): number {
    return this.data[28];
  }
  public set corrupt(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.corrupt to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Corruption change: ${this.data[28]} to ${val} (${val - this.data[28]})`);
    }
    this.data[28] = val;
  }
  public get perversion(): number {
    return this.data[29];
  }
  public set perversion(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.perversion to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Perversion change: ${this.data[29]} to ${val} (${val - this.data[29]})`);
    }
    this.data[29] = val;
  }
  public get bimbo(): number {
    return this.data[30];
  }
  public set bimbo(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.bimbo to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    if (this._k === "pc") {
      aw.con.info(`Bimbo change: ${this.data[30]} to ${val} (${val - this.data[30]})`);
    }
    this.data[30] = val;
  }
  public get kids(): number {
    return this.data[31];
  }
  public set kids(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.kids to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    this.data[31] = val;
  }
  public get exercise(): number {
    return this.data[32];
  }
  public set exercise(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set status.exercise to a non-number value! Character: ${this._k}.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    if (this._k === "pc") {
      aw.con.info(`Exercise change: ${this.data[32]} to ${val} (${val - this.data[32]})`);
    }
    this.data[32] = val;
  }
}

