

class Tits {
  public shape: string;
  public nipple: string;
  public boob: [number, number, number, number, number, number];
  public base: {
    cupNum: number;
    cupRaw: number;
    size: number;
    cup: string;
    bra: string;
  };
  public lact: {
    on: boolean;
    max: number;
    size: number;
    cupNum: number;
    cup: string;
    bra: string;
  };
  public _k: string;
  constructor(key, {
    shape,
    nipple,
    nipLength,
    nipGirth,
    areola,
    puffy,
    band,
    silicone = 0,
    boob,
    base,
    lact,
  }: DataTits) {
    this._k = key;
    this.shape = shape;
    this.nipple = nipple;
    if (boob == null) {
      this.boob = [band, nipLength, nipGirth,  areola, puffy, silicone];
    } else {
      this.boob = clone(boob);
    }
    this.base = clone(base);
    this.lact = clone(lact);
  }
  get silicone(): number {
    return this.boob[5];
  }
  set silicone(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} tits.silicone to non-number value!`);
    } else {
      if (val < 0) {
        this.boob[5] = 0;
      } else {
        this.boob[5] = val;
      }
    }
  }
  get puffy(): number {
    return this.boob[4];
  }
  set puffy(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} tits.puffy to non-number value!`);
    } else {
      if (val < 1) {
        this.boob[4] = 1;
      } else if (val > 5) {
        this.boob[4] = 5;
      } else {
        this.boob[4] = val;
      }
    }
  }
  get areola(): number {
    return this.boob[3];
  }
  set areola(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} tits.areola to non-number value!`);
    } else {
      if (val < 1) {
        this.boob[3] = 1;
      } else if (val > 5) {
        this.boob[3] = 5;
      } else {
        this.boob[3] = val;
      }
    }
  }
  get nipGirth(): number {
    return this.boob[2];
  }
  set nipGirth(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} tits.nipGirth to non-number value!`);
    } else {
      if (val < 1) {
        this.boob[2] = 1;
      } else if (val > 5) {
        this.boob[2] = 5;
      } else {
        this.boob[2] = val;
      }
    }
  }
  get nipLength(): number {
    return this.boob[1];
  }
  set nipLength(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} tits.nipLength to non-number value!`);
    } else {
      if (val < 1) {
        this.boob[1] = 1;
      } else if (val > 8) {
        this.boob[1] = 8;
      } else {
        this.boob[1] = val;
      }
    }
  }
  get band(): number {
    return this.boob[0];
  }
  set band(val: number) {
    const alow = [24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46];
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} tits.band to non-number value!`);
    } else if (alow.includes(val)) {
      this.boob[0] = val;
    } else {
      aw.con.info(`Attempted to set ${this._k} tits.band to out of range value!`);
    }
  }
  get size(): number {
    if (this.lact.on) {
      return this.lact.size + this.silicone;
    }
    return this.base.size + this.silicone;
  }
  set size(num: number) {
    aw.con.info(`warning: set tit size via setter on passage ${aw.passage.title}`);
    this.base.size = Number(num);
  }
  get cupNum(): number {
    if (this.lact.on) {
      return this.lact.cupNum;
    }
    return this.base.cupNum;
  }
  get cup(): string {
    if (this.lact.on) {
      return this.lact.cup;
    }
    return this.base.cup;
  }
  get bra(): string {
    if (this.lact.on) {
      return this.lact.bra;
    }
    return this.base.bra;
  }
  get has(): boolean {
    if (this.size >= 333) {
      return true;
    }
    return false;
  }
  public calculate() {
    // TODO add proper method (relocate function)
  }
}

