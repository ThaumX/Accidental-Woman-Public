

class Addiction {
  public dta: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, boolean];
  public _k: string;
  constructor(key, {
    sex,
    alc,
    heat,
    satyr,
    focus,
    cum,
    zone,
    cream,
    jonesing,
    withdrawl,
    sexNeed,
    alcNeed,
    heatNeed,
    satyrNeed,
    focusNeed,
    cumNeed,
    zoneNeed,
    creamNeed,
    dta,
  }: DataAddiction) {
    this._k = key;
    if (dta == null) {
      this.dta = [sex, alc, heat, satyr, focus, cum, zone, cream, sexNeed, alcNeed, heatNeed, satyrNeed, focusNeed, cumNeed, zoneNeed, creamNeed, jonesing, withdrawl];
    } else {
      this.dta = clone(dta);
    }
  }
  public get max(): string {
    const props = ["sex", "alc", "heat", "satyr", "focus", "cum", "zone", "cream"];
    let max = 0;
    for (let i = 1; i < 8; i++) {
      if (this[props[i]] > this[props[max]]) {
        max = i;
      }
    }
    return props[max];
  }
  public get maxValue(): number {
    return this[this.max];
  }
  // VALIDATION GETTER/SETTER PAIRS ==============
  public get sex(): number {
    return this.dta[0];
  }
  public set sex(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} sex to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[0] = val;
    }
  } public get alc(): number {
    return this.dta[1];
  }
  public set alc(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} alc to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[1] = val;
    }
  } public get heat(): number {
    return this.dta[2];
  }
  public set heat(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} heat to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[2] = val;
    }
  } public get satyr(): number {
    return this.dta[3];
  }
  public set satyr(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} satyr to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[3] = val;
    }
  } public get focus(): number {
    return this.dta[4];
  }
  public set focus(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} focus to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[4] = val;
    }
  } public get cum(): number {
    return this.dta[5];
  }
  public set cum(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} cum to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[5] = val;
    }
  } public get zone(): number {
    return this.dta[6];
  }
  public set zone(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} zone to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[6] = val;
    }
  } public get cream(): number {
    return this.dta[7];
  }
  public set cream(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} cream to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[7] = val;
    }
  } public get sexNeed(): number {
    return this.dta[8];
  }
  public set sexNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} sexNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[8] = val;
    }
  } public get alcNeed(): number {
    return this.dta[9];
  }
  public set alcNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} alcNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[9] = val;
    }
  } public get heatNeed(): number {
    return this.dta[10];
  }
  public set heatNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} heatNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[10] = val;
    }
  } public get satyrNeed(): number {
    return this.dta[11];
  }
  public set satyrNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} satyrNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[11] = val;
    }
  } public get focusNeed(): number {
    return this.dta[12];
  }
  public set focusNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} focusNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[12] = val;
    }
  } public get cumNeed(): number {
    return this.dta[13];
  }
  public set cumNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} cumNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[13] = val;
    }
  } public get zoneNeed(): number {
    return this.dta[14];
  }
  public set zoneNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} zoneNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[14] = val;
    }
  } public get creamNeed(): number {
    return this.dta[15];
  }
  public set creamNeed(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} creamNeed to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[15] = val;
    }
  } public get jonesing(): number {
    return this.dta[16];
  }
  public set jonesing(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} jonesing to non-number value!`);
    } else {
      if (val > 10) {
        val = 10;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[16] = val;
    }
  } public get withdrawl(): boolean | 0 {
    return this.dta[17];
  }
  public set withdrawl(val: boolean | 0) {
    if (typeof val !== "boolean" && val !== 0) {
      aw.con.warn(`Attempted to set ${this._k} withdrawal to non-boolean value!`);
    } else if (val === 0) {
      this.dta[17] = false;
    } else {
      this.dta[17] = val;
    }
  }
}

