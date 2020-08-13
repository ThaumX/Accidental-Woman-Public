
interface intCumData {
  npcid: string;
  surv: number;
  quantity: number;
  quality: number;
}

class Fert {
  public femaleFlag: string[];
  public cycStart: [number, number];
  public maleFlag: string[];
  public fluid: VagFluid;
  // tslint:disable-next-line:max-line-length
  public dta: [number, number, number, number, number, number, number, boolean, number, number, number, number, number, number, number, number, number, number, number, boolean, boolean, boolean, number, boolean];
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
    cycStart = [1, 1],
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
    aftOvulate = false,
    iud = false,
    dta,
  }: DataFert) {
    this._k = key;
    if (dta == null) {
      // tslint:disable-next-line:max-line-length
      this.dta = [fertility, egg, implant, vagHostile, period, wombHealth, multEgg, barren, cycle, boost, ovuMod, pregTerm, quality, ejac, resMax, reserve, refact, quantity, surv, ovuFlag, iud, aftOvulate, 0, false];
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
  public getCumVol(): number {
    let vol;
    if ((this.reserve * 0.9) < this.ejac) {
      vol = Math.round((this.reserve * 0.9) * 5);
      this.reserve -= Math.round(this.reserve * 0.9);
    } else {
      vol = this.ejac * 5;
      this.reserve -= this.ejac;
    }
    return vol;
  }
  public cumRegen(): void {
    if (this.reserve < this.resMax) {
      const amt = Math.ceil((24 * this.refact) / 5);
      this.reserve += amt;
    }
  }
  public cumData(): intCumData {
    const cumData = {
      npcid: this._k,
      surv: this.surv,
      quantity: this.quantity,
      quality: this.quality,
    };
    return cumData;
  }
  public inseminate(owner: npcid | "unknown" = "unknown", vol: number = -99, loc: "vest" | "vulva" | "mid" | "deep" | "cervix" | "womb" | "ovary" | "random" = "random"): void {
    if (loc === "random") {
      loc = either("vest", "vest", "mid", "mid", "mid", "mid", "deep", "deep", "deep");
    }
    this.fluid[loc].push(new Cum({owner, vol}));
  }
  public creampie(owner: "unknown" | npcid = "unknown", vol: number = -99, type: "default"|"deep"|"shallow"|"vulva" = "default"): void {
    // if no volume is supplied, generates an average volume for unknowns, or gets an orgasm from npc/pc
    if (vol === -99) {
      if (owner === "unknown") {
        vol = random(20, 30) + random(20, 30);
      } else if (setup.testes.test(owner)) {
        vol = aw.npc[owner].fert.getCumVol();
      } else {
        vol = ↂ.pc.fert.getCumVol();
      }
    }
    // splits up volume to spread out in vagina
    const volA = Math.ceil(vol * 0.5);
    const volB = Math.ceil(vol * 0.2);
    const volC = volB;
    const volD = Math.ceil(vol * 0.1);
    // place cum based on type argument
    switch (type) {
      case "default":
        this.inseminate(owner, volA, "mid");
        this.inseminate(owner, volB, "deep");
        this.inseminate(owner, volC, "vest");
        this.inseminate(owner, volD, "cervix");
        break;
      case "deep":
        this.inseminate(owner, volA, "deep");
        this.inseminate(owner, volB, "cervix");
        this.inseminate(owner, volC, "mid");
        this.inseminate(owner, volD, "vest");
        break;
      case "shallow":
        this.inseminate(owner, volA, "vest");
        this.inseminate(owner, volB, "mid");
        this.inseminate(owner, volC, "vulva");
        this.inseminate(owner, volD, "deep");
        break;
      case "vulva":
        this.inseminate(owner, volA, "vulva");
        this.inseminate(owner, volB, "vulva");
        this.inseminate(owner, volC, "vest");
        this.inseminate(owner, volD, "mid");
        break;
      default:
        this.inseminate(owner, volA, "mid");
        this.inseminate(owner, volB, "deep");
        this.inseminate(owner, volC, "vest");
        this.inseminate(owner, volD, "cervix");
        break;
    }
    if (this._k === "pc" || this._k === "PC") {
      const name = (setup.testes.test(owner)) ? aw.npc[owner].name : "a stranger";
      const opt = {
        text: `The result of a recent encounter with ${name}.`,
      };
      setup.omni.kill("Semen in Vagina");
      setup.omni.new("creamPie", opt);
      setup.condition.add({ loc: "vagFluid", amt: vol, tgt: "pc", wet: vol, type: "cum"});
      setup.condition.add({ loc: "genitals", amt: Math.round(vol / 5), tgt: "pc", wet: Math.round(vol / 5), type: "cum"});
    }
  }
  // =====================================================================
  // getter setter validations
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
  }
  public get egg(): number {
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
      if (val < -2) {
        val = -2;
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
  public get aftOvulate(): boolean {
    return this.dta[21];
  }
  public set aftOvulate(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} aftOvulate to non-boolean value!`);
    } else {
      this.dta[21] = val;
    }
  }
  public get elastic(): number {
    return this.dta[22];
  }
  public set elastic(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} elastic to non-number value!`);
    } else {
      if (val > 3) {
        val = 3;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[22] = val;
    }
  }
  public get splitter(): boolean {
    return this.dta[23];
  }
  public set splitter(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} fert.splitter to non-boolean value!`);
    } else {
      this.dta[23] = val;
    }
  }
}
