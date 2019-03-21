class Fert {
  public femaleFlag: string[];
  public cycStart: number[];
  public maleFlag: string[];
  public fluid: VagFluid;
  // tslint:disable-next-line:max-line-length
  public dta: [number, number, number, number, number, number, number, boolean, number, number, number, number, number, number, number, number, number, number, number, boolean, boolean];
  public _k: string;
  constructor(key, {
    fertility = -1,
    egg = -1,
    implant = -1,
    vagHostile = -1,
    period = -1,
    wombHealth = -1,
    multEgg = -1,
    barren = false,
    femaleFlag = ["none"],
    cycle = -1,
    cycStart = [1, 1, 1],
    boost = 0,
    ovuMod = -1,
    fluid = { vulva: [], vest: [], mid: [], deep: [], cervix: [], womb: [], ovary: [] },
    pregTerm = -1,
    quality = -1,
    ejac = -1,
    resMax = -1,
    reserve = -1,
    refact = -1,
    quantity = -1,
    surv = -1,
    maleFlag = ["none"],
    ovuFlag = false,
    iud = false,
    dta,
  }: DataFert) {
    this._k = key;
    if (dta == null) {
      // tslint:disable-next-line:max-line-length
      this.dta = [fertility, egg, implant, vagHostile, period, wombHealth, multEgg, barren, cycle, boost, ovuMod, pregTerm, quality, ejac, resMax, reserve, refact, quantity, surv, ovuFlag, iud];
    } else {
      this.dta = clone(dta);
    }
    this.femaleFlag = clone(femaleFlag);
    this.cycStart = clone(cycStart);
    this.fluid = {
      vulva: [],
      vest: [],
      mid: [],
      deep: [],
      cervix: [],
      womb: [],
      ovary: [],
    };
    if (typeof fluid === "object") {
      for (const keyo of Object.keys(fluid)) {
        for (const cum of fluid[keyo]) {
          this.fluid[keyo].push(new Cum(cum));
        }
      }
    }
    this.maleFlag = clone(maleFlag);
  }
  public get hasFluid(): boolean {
    if (this.fluid.vulva.length > 0) {
      return true;
    }
    if (this.fluid.vest.length > 0) {
      return true;
    }
    if (this.fluid.mid.length > 0) {
      return true;
    }
    if (this.fluid.cervix.length > 0) {
      return true;
    }
    if (this.fluid.deep.length > 0) {
      return true;
    }
    return false;
  }
  public get fertility(): number {
    return this.dta[0];
  }
  public set fertility(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} fertility to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[0] = val;
    }
  } public get egg(): number {
    return this.dta[1];
  }
  public set egg(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} egg to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[1] = val;
    }
  } public get implant(): number {
    return this.dta[2];
  }
  public set implant(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} implant to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[2] = val;
    }
  } public get vagHostile(): number {
    return this.dta[3];
  }
  public set vagHostile(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} vagHostile to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[3] = val;
    }
  } public get period(): number {
    return this.dta[4];
  }
  public set period(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} period to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[4] = val;
    }
  } public get wombHealth(): number {
    return this.dta[5];
  }
  public set wombHealth(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} wombHealth to non-number value!`);
    } else {
      if (val > 10) {
        val = 10;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[5] = val;
    }
  } public get multEgg(): number {
    return this.dta[6];
  }
  public set multEgg(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} multEgg to non-number value!`);
    } else {
      if (val > 1000) {
        val = 1000;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[6] = val;
    }
  } public get barren(): boolean {
    return this.dta[7];
  }
  public set barren(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} barren to non-boolean value!`);
    } else {
      this.dta[7] = val;
    }
  } public get cycle(): number {
    return this.dta[8];
  }
  public set cycle(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} cycle to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[8] = val;
    }
  } public get boost(): number {
    return this.dta[9];
  }
  public set boost(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} boost to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[9] = val;
    }
  } public get ovuMod(): number {
    return this.dta[10];
  }
  public set ovuMod(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} ovuMod to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[10] = val;
    }
  } public get pregTerm(): number {
    return this.dta[11];
  }
  public set pregTerm(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} pregTerm to non-number value!`);
    } else {
      if (val > 40) {
        val = 40;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[11] = val;
    }
  } public get quality(): number {
    return this.dta[12];
  }
  public set quality(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} quality to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[12] = val;
    }
  } public get ejac(): number {
    return this.dta[13];
  }
  public set ejac(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} ejac to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[13] = val;
    }
  } public get resMax(): number {
    return this.dta[14];
  }
  public set resMax(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} resMax to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[14] = val;
    }
  } public get reserve(): number {
    return this.dta[15];
  }
  public set reserve(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} reserve to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[15] = val;
    }
  } public get refact(): number {
    return this.dta[16];
  }
  public set refact(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} refact to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[16] = val;
    }
  } public get quantity(): number {
    return this.dta[17];
  }
  public set quantity(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} quantity to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[17] = val;
    }
  } public get surv(): number {
    return this.dta[18];
  }
  public set surv(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} surv to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[18] = val;
    }
  } public get ovuFlag(): boolean {
    return this.dta[19];
  }
  public set ovuFlag(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} ovuFlag to non-boolean value!`);
    } else {
      this.dta[19] = val;
    }
  } public get iud(): boolean {
    return this.dta[20];
  }
  public set iud(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} iud to non-boolean value!`);
    } else {
      this.dta[20] = val;
    }
  }
}
