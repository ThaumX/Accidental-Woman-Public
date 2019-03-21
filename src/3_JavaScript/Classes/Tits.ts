

class Tits {
  public shape: string;
  public nipple: string;
  public nipLength: 1|2|3|4|5|6|7|8;
  public nipGirth: 1 | 2 | 3 | 4 | 5;
  public areola: 1 | 2 | 3 | 4 | 5;
  public puffy: 1 | 2 | 3 | 4 | 5;
  public band: braBandType;
  public base: {
    cupNum: number;
    cupRaw: number;
    size: number;
    cup: string;
    bra: string;
  };
  public silicone: number;
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
    base,
    lact,
  }: DataTits) {
    this._k = key;
    this.shape = shape;
    this.band = band;
    this.nipple = nipple;
    this.nipLength = nipLength;
    this.nipGirth = nipGirth;
    this.areola = areola;
    this.puffy = puffy;
    this.silicone = silicone;
    this.base = clone(base);
    this.lact = clone(lact);
    }
  get size(): number {
    if (this.lact.on) {
      return this.lact.size;
    }
    return this.base.size;
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

