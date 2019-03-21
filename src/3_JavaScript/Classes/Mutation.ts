

class Mutation {
  public dta: boolean[];
  public _k: string;
  constructor(key, {
    smooth,
    lilithCurse,
    noRefract,
    megaNuts,
    killerSperm,
    bitchBreaker,
    megaLong,
    iron,
    virile,
    acidPre,
    girth,
    contort,
    cumpire,
    powerEjac,
    multgasm,
    immune,
    milk,
    acid,
    birthCon,
    multiple,
    gestate,
    cycle,
    twinWomb,
    pheromone,
    period,
    mouth,
    pseudoPreg,
    elastic,
    litePhero,
    goddess = false,
    fertStorm = false,
    dta,
  }: DataMutate) {
    if (dta == null) {
      this.dta = [smooth, lilithCurse, noRefract, megaNuts, killerSperm, bitchBreaker, megaLong, iron, virile, acidPre, girth, contort, cumpire, powerEjac, multgasm, immune, milk, acid, birthCon, multiple, gestate, cycle, twinWomb, pheromone, period, mouth, pseudoPreg, elastic, litePhero, goddess, fertStorm];
    } else {
      this.dta = clone(dta);
    }
    this._k = key;
  }
  public get smooth(): boolean {
    return this.dta[0];
  }
  public set smooth(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} smooth to non-boolean value!`);
    } else {
      this.dta[0] = val;
    }
  } public get lilithCurse(): boolean {
    return this.dta[1];
  }
  public set lilithCurse(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} lilithCurse to non-boolean value!`);
    } else {
      this.dta[1] = val;
    }
  } public get noRefract(): boolean {
    return this.dta[2];
  }
  public set noRefract(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} noRefract to non-boolean value!`);
    } else {
      this.dta[2] = val;
    }
  } public get megaNuts(): boolean {
    return this.dta[3];
  }
  public set megaNuts(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} megaNuts to non-boolean value!`);
    } else {
      this.dta[3] = val;
    }
  } public get killerSperm(): boolean {
    return this.dta[4];
  }
  public set killerSperm(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} killerSperm to non-boolean value!`);
    } else {
      this.dta[4] = val;
    }
  } public get bitchBreaker(): boolean {
    return this.dta[5];
  }
  public set bitchBreaker(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} bitchBreaker to non-boolean value!`);
    } else {
      this.dta[5] = val;
    }
  } public get megaLong(): boolean {
    return this.dta[6];
  }
  public set megaLong(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} megaLong to non-boolean value!`);
    } else {
      this.dta[6] = val;
    }
  } public get iron(): boolean {
    return this.dta[7];
  }
  public set iron(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} iron to non-boolean value!`);
    } else {
      this.dta[7] = val;
    }
  } public get virile(): boolean {
    return this.dta[8];
  }
  public set virile(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} virile to non-boolean value!`);
    } else {
      this.dta[8] = val;
    }
  } public get acidPre(): boolean {
    return this.dta[9];
  }
  public set acidPre(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} acidPre to non-boolean value!`);
    } else {
      this.dta[9] = val;
    }
  } public get girth(): boolean {
    return this.dta[10];
  }
  public set girth(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} girth to non-boolean value!`);
    } else {
      this.dta[10] = val;
    }
  } public get contort(): boolean {
    return this.dta[11];
  }
  public set contort(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} contort to non-boolean value!`);
    } else {
      this.dta[11] = val;
    }
  } public get cumpire(): boolean {
    return this.dta[12];
  }
  public set cumpire(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} cumpire to non-boolean value!`);
    } else {
      this.dta[12] = val;
    }
  } public get powerEjac(): boolean {
    return this.dta[13];
  }
  public set powerEjac(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} powerEjac to non-boolean value!`);
    } else {
      this.dta[13] = val;
    }
  } public get multgasm(): boolean {
    return this.dta[14];
  }
  public set multgasm(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} multgasm to non-boolean value!`);
    } else {
      this.dta[14] = val;
    }
  } public get immune(): boolean {
    return this.dta[15];
  }
  public set immune(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} immune to non-boolean value!`);
    } else {
      this.dta[15] = val;
    }
  } public get milk(): boolean {
    return this.dta[16];
  }
  public set milk(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} milk to non-boolean value!`);
    } else {
      this.dta[16] = val;
    }
  } public get acid(): boolean {
    return this.dta[17];
  }
  public set acid(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} acid to non-boolean value!`);
    } else {
      this.dta[17] = val;
    }
  } public get birthCon(): boolean {
    return this.dta[18];
  }
  public set birthCon(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} birthCon to non-boolean value!`);
    } else {
      this.dta[18] = val;
    }
  } public get multiple(): boolean {
    return this.dta[19];
  }
  public set multiple(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} multiple to non-boolean value!`);
    } else {
      this.dta[19] = val;
    }
  } public get gestate(): boolean {
    return this.dta[20];
  }
  public set gestate(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} gestate to non-boolean value!`);
    } else {
      this.dta[20] = val;
    }
  } public get cycle(): boolean {
    return this.dta[21];
  }
  public set cycle(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} cycle to non-boolean value!`);
    } else {
      this.dta[21] = val;
    }
  } public get twinWomb(): boolean {
    return this.dta[22];
  }
  public set twinWomb(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} twinWomb to non-boolean value!`);
    } else {
      this.dta[22] = val;
    }
  } public get pheromone(): boolean {
    return this.dta[23];
  }
  public set pheromone(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} pheromone to non-boolean value!`);
    } else {
      this.dta[23] = val;
    }
  } public get period(): boolean {
    return this.dta[24];
  }
  public set period(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} period to non-boolean value!`);
    } else {
      this.dta[24] = val;
    }
  } public get mouth(): boolean {
    return this.dta[25];
  }
  public set mouth(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} mouth to non-boolean value!`);
    } else {
      this.dta[25] = val;
    }
  } public get pseudoPreg(): boolean {
    return this.dta[26];
  }
  public set pseudoPreg(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} pseudoPreg to non-boolean value!`);
    } else {
      this.dta[26] = val;
    }
  } public get elastic(): boolean {
    return this.dta[27];
  }
  public set elastic(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} elastic to non-boolean value!`);
    } else {
      this.dta[27] = val;
    }
  } public get litePhero(): boolean {
    return this.dta[28];
  }
  public set litePhero(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} litePhero to non-boolean value!`);
    } else {
      this.dta[28] = val;
    }
  } public get goddess(): boolean {
    return this.dta[29];
  }
  public set goddess(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} goddess to non-boolean value!`);
    } else {
      this.dta[29] = val;
    }
  } public get fertStorm(): boolean {
    return this.dta[30];
  }
  public set fertStorm(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} fertStorm to non-boolean value!`);
    } else {
      this.dta[30] = val;
    }
  }
}

