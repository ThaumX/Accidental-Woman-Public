

class PCgroom {
  public hairSets: HairSets;
  public makeup: Makeup;
  public lastToothbrush: number[];
  public dta: [string, number, string, string, string, string, number, string, number, string, number, number, number, number, number, number, string, number, number, number, number, number, number, string, string, string, string, number, number];
  public _k: string;
  constructor(key, {
    hairColor,
    hairCurl,
    pubeColor,
    hairdye,
    hairLength,
    hairStyle,
    hairFlag,
    hairSets,
    pubeStyle,
    pubeGrow,
    pubeFreq,
    pube,
    bikiniFreq,
    bikiniCount,
    pubeCount,
    pubeShape,
    leghair,
    leghairCount,
    leghairFreq,
    armpit,
    armpitCount,
    armpitFreq,
    eyeMU,
    lipMU,
    genMU,
    makeup,
    teeth,
    toothHealth,
    toothbrush,
    dta,
    lastToothbrush }: PCinitGroom) {
    this._k = key;
    this.hairSets = clone(hairSets);
    this.makeup = clone(makeup);
    this.lastToothbrush = clone(lastToothbrush);
    if (dta == null) {
      this.dta = [hairColor, hairCurl, pubeColor, "pubes", hairdye, "ears", hairLength, hairStyle, hairFlag, pubeStyle, pubeGrow, pubeFreq, pube, bikiniFreq, bikiniCount, pubeCount, pubeShape, leghair, leghairCount, leghairFreq, armpit, armpitCount, armpitFreq, eyeMU, lipMU, genMU, teeth, toothHealth, toothbrush];
    } else {
      this.dta = clone(dta);
    }
  }
  public get hairColor(): string {
    return this.dta[0];
  }
  public set hairColor(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} hairColor to non-string value!`);
    } else {
      this.dta[0] = val;
    }
  }
  public get hairCurl(): number {
    return this.dta[1];
  }
  public set hairCurl(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} hairCurl to non-number value!`);
    } else {
      if (val > 6) {
        val = 6;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[1] = val;
    }
  }
  public get pubeColor(): string {
    return this.dta[2];
  }
  public set pubeColor(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} pubeColor to non-string value!`);
    } else {
      this.dta[2] = val;
    }
  }
  public get hairdye(): string {
    return this.dta[4];
  }
  public set hairdye(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} hairdye to non-string value!`);
    } else {
      this.dta[4] = val;
    }
  }
  public get hairLength(): number {
    return this.dta[6];
  }
  public set hairLength(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} hairLength to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[6] = val;
    }
  }
  public get hairStyle(): string {
    return this.dta[7];
  }
  public set hairStyle(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} hairStyle to non-string value!`);
    } else {
      this.dta[7] = val;
    }
  }
  public get hairFlag(): number {
    return this.dta[8];
  }
  public set hairFlag(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} hairFlag to non-number value!`);
    } else {
      if (val > 10) {
        val = 10;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[8] = val;
    }
  }
  public get pubeStyle(): string {
    return this.dta[9];
  }
  public set pubeStyle(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} pubeStyle to non-string value!`);
    } else {
      this.dta[9] = val;
    }
  }
  public get pubeGrow(): number {
    return this.dta[10];
  }
  public set pubeGrow(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} pubeGrow to non-number value!`);
    } else {
      if (val > 6) {
        val = 6;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[10] = val;
    }
  }
  public get pubeFreq(): number {
    return this.dta[11];
  }
  public set pubeFreq(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} pubeFreq to non-number value!`);
    } else {
      if (val > 3) {
        val = 3;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[11] = val;
    }
  }
  public get pube(): number {
    return this.dta[12];
  }
  public set pube(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} pube to non-number value!`);
    } else {
      if (val > 6) {
        val = 6;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[12] = val;
    }
  }
  public get bikiniFreq(): number {
    return this.dta[13];
  }
  public set bikiniFreq(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} bikiniFreq to non-number value!`);
    } else {
      if (val > 3) {
        val = 3;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[13] = val;
    }
  }
  public get bikiniCount(): number {
    return this.dta[14];
  }
  public set bikiniCount(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} bikiniCount to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[14] = val;
    }
  }
  public get pubeCount(): number {
    return this.dta[15];
  }
  public set pubeCount(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} pubeCount to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[15] = val;
    }
  }
  public get pubeShape(): string {
    return this.dta[16];
  }
  public set pubeShape(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} pubeShape to non-string value!`);
    } else {
      this.dta[16] = val;
    }
  }
  public get leghair(): number {
    return this.dta[17];
  }
  public set leghair(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} leghair to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[17] = val;
    }
  }
  public get leghairCount(): number {
    return this.dta[18];
  }
  public set leghairCount(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} leghairCount to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[18] = val;
    }
  }
  public get leghairFreq(): number {
    return this.dta[19];
  }
  public set leghairFreq(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} leghairFreq to non-number value!`);
    } else {
      if (val > 3) {
        val = 3;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[19] = val;
    }
  }
  public get armpit(): number {
    return this.dta[20];
  }
  public set armpit(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} armpit to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[20] = val;
    }
  }
  public get armpitCount(): number {
    return this.dta[21];
  }
  public set armpitCount(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} armpitCount to non-number value!`);
    } else {
      if (val > 100) {
        val = 100;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[21] = val;
    }
  }
  public get armpitFreq(): number {
    return this.dta[22];
  }
  public set armpitFreq(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} armpitFreq to non-number value!`);
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
  public get eyeMU(): string {
    return this.dta[23];
  }
  public set eyeMU(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} eyeMU to non-string value!`);
    } else {
      this.dta[23] = val;
    }
  }
  public get lipMU(): string {
    return this.dta[24];
  }
  public set lipMU(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} lipMU to non-string value!`);
    } else {
      this.dta[24] = val;
    }
  }
  public get genMU(): string {
    return this.dta[25];
  }
  public set genMU(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} genMU to non-string value!`);
    } else {
      this.dta[25] = val;
    }
  }
  public get teeth(): string {
    return this.dta[26];
  }
  public set teeth(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} teeth to non-string value!`);
    } else {
      this.dta[26] = val;
    }
  }
  public get toothHealth(): number {
    return this.dta[27];
  }
  public set toothHealth(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} toothHealth to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[27] = val;
    }
  }
  public get toothbrush(): number {
    return this.dta[28];
  }
  public set toothbrush(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} toothbrush to non-number value!`);
    } else {
      if (val > 3) {
        val = 3;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[28] = val;
    }
  }
}

