

class Womb {
  public exists: boolean;
  public zygote: Zygote[];
  public fetus: Fetus[];
  public know: boolean;
  public miscarry: number;
  public aborts: number;
  public birthed: number;
  public total: number;
  public boost: number;
  public _k: string;
  constructor(key, { exists = false, know = false, birthed = 0, miscarry = 0, aborts = 0, total = 0, zygote = [], fetus = [], boost = 0}: WombData) {
    this._k = key;
    this.exists = exists;
    this.know = know;
    this.birthed = birthed;
    this.miscarry = miscarry;
    this.aborts = aborts;
    this.total = total;
    this.boost = boost;
    this.zygote = [];
    if (zygote.length > 0) {
      for (const zyg of zygote) {
        this.zygote.push(new Zygote(zyg));
      }
    }
    this.fetus = [];
    if (fetus.length > 0) {
      for (const fet of fetus) {
        this.fetus.push(new Fetus(fet));
      }
    }
  }
  public get count(): number {
    return this.fetus.length;
  }
  public get days(): number {
    if (this.fetus.length === 0) {
      return 0;
    }
    let value = this.fetus[0].implantTime;
    for (const fetus of this.fetus) {
      if (fetus.implantTime < value) {
        value = fetus.implantTime;
      }
    }
    value = setup.omni.value - value;
    const hoursTotal = Math.floor(value / 60);
    return Math.floor(hoursTotal / 24);
  }
  public get weeks(): number {
    if (this.fetus.length === 0) {
      return 0;
    }
    let value = this.fetus[0].implantTime;
    for (const fetus of this.fetus) {
      if (fetus.implantTime < value) {
        value = fetus.implantTime;
      }
    }
    value = setup.omni.value - value;
    const hoursTotal = Math.floor(value / 60);
    const daysTotal = Math.floor(hoursTotal / 24);
    return Math.floor(daysTotal / 7);
  }
  public get growth(): number {
    if (this.fetus.length === 0) {
      return 0;
    }
    let value = this.fetus[0].grow[0];
    for (const fetus of this.fetus) {
      if (fetus.grow[0] > value) {
        value = fetus.grow[0];
      }
    }
    return value;
  }
  public get preg(): boolean {
    if (this.fetus.length > 0) {
      return true;
    }
    return false;
  }
  public set preg(val: boolean) {
    aw.con.info(`Tried to set value of ${this._k} womb.preg, a derived value.`);
  }
}

