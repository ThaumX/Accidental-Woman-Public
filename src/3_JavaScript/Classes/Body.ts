

class Body {
  public tits!: Tits;
  public pussy!: Pussy;
  public asshole!: Anus;
  public cock!: Penis;
  public balls!: Balls;
  public tags: string[];
  public dta: any[];
  public _k: string;
  constructor(key, {
    tits,
    pussy,
    asshole,
    cock,
    balls,
    race,
    skinColor,
    tone,
    weight,
    shoulders,
    hips,
    waist,
    pelvis,
    height,
    ass,
    clit,
    labia,
    beauty,
    face,
    brow,
    nose,
    jaw,
    lips,
    eyeColor,
    lactation,
    lactCapacity,
    orgasm,
    energy,
    topATR,
    botATR,
    ATR,
    tags,
    ears,
    dta,
  }: DataBody) {
    this._k = key;
    try {
      this.tits = new Tits(key, tits);
    } catch (e) {
      console.log(`Error constructing Char Body subclass tits - ${e.name}: ${e.message}.`);
      setTimeout(() => aw.con.obj(tits), 250);
    }
    try {
      this.pussy = new Pussy( key, pussy);
    } catch (e) {
      console.log(`Error constructing Char Body subclass pussy - ${e.name}: ${e.message}.`);
      setTimeout(() => aw.con.obj(pussy), 250);
    }
    try {
      this.asshole = new Anus( key, asshole);
    } catch (e) {
      console.log(`Error constructing Char Body subclass asshole - ${e.name}: ${e.message}.`);
      setTimeout(() => aw.con.obj(asshole), 250);
    }
    try {
      this.cock = new Penis(key, cock);
    } catch (e) {
      console.log(`Error constructing Char Body subclass cock - ${e.name}: ${e.message}.`);
      setTimeout(() => aw.con.obj(cock), 250);
    }
    try {
      this.balls = new Balls(key, balls);
    } catch (e) {
      console.log(`Error constructing Char Body subclass balls - ${e.name}: ${e.message}.`);
      setTimeout(() => aw.con.obj(balls), 250);
    }
    if (dta == null) {
      // tslint:disable-next-line:max-line-length
      this.dta = [race, skinColor, tone, weight, shoulders, hips, waist, pelvis, height, ass, clit, labia, beauty, face, brow, nose, lips, jaw, eyeColor, lactation, lactCapacity, orgasm, energy, ears, topATR, botATR, ATR];
    } else {
      this.dta = clone(dta);
    }
    this.tags = clone(tags);
  }
  get totalMilkCapacity(): number {
    return this.lactCapacity * 2;
  }
  // DATA VALIDATION GETTER-SETTERS ==============
  public get race(): string {
    return this.dta[0];
  }
  public set race(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} race to non-string value!`);
    } else {
      this.dta[0] = val;
    }
  }
  public get skinColor(): string {
    return this.dta[1];
  }
  public set skinColor(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} skinColor to non-string value!`);
    } else {
      this.dta[1] = val;
    }
  }
  public get tone(): number {
    return this.dta[2];
  }
  public set tone(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} tone to non-number value!`);
    } else {
      if (val > 7) {
        val = 7;
      } else if (val < 0) {
        val = 0;
      }
      this.dta[2] = val;
    }
  }
  public get weight(): number {
    return this.dta[3];
  }
  public set weight(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} weight to non-number value!`);
    } else {
      if (val > 9) {
        val = 9;
      } else if (val < 0) {
        val = 0;
      }
      this.dta[3] = val;
    }
  }
  public get shoulders(): number {
    return this.dta[4];
  }
  public set shoulders(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} shoulders to non-number value!`);
    } else {
      if (val > 6) {
        val = 6;
      } else if (val < 1) {
        val = 1;
      }
      this.dta[4] = val;
    }
  }
  public get hips(): number {
    return this.dta[5];
  }
  public set hips(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} hips to non-number value!`);
    } else {
      if (val > 8) {
        val = 8;
      } else if (val < 1) {
        val = 1;
      }
      this.dta[5] = val;
    }
  }
  public get waist(): number {
    return this.dta[6];
  }
  public set waist(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} waist to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      } else if (val < 1) {
        val = 1;
      }
      this.dta[6] = val;
    }
  }
  public get pelvis(): number {
    return this.dta[7];
  }
  public set pelvis(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} pelvis to non-number value!`);
    } else {
      if (val > 8) {
        val = 8;
      } else if (val < 1) {
        val = 1;
      }
      this.dta[7] = val;
    }
  }
  public get height(): number {
    return this.dta[8];
  }
  public set height(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} height to non-number value!`);
    } else {
      if (val > 95) {
        val = 95;
      } else if (val < 54) {
        val = 54;
      }
      this.dta[8] = val;
    }
  }
  public get ass(): number {
    return this.dta[9];
  }
  public set ass(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} ass to non-number value!`);
    } else {
      if (val > 10) {
        val = 10;
      } else if (val < 1) {
        val = 1;
      }
      this.dta[9] = val;
    }
  }
  public get clit(): number {
    return this.dta[10];
  }
  public set clit(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} clit to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      } else if (val < 0) {
        val = 0;
      }
      this.dta[10] = val;
    }
  }
  public get labia(): number {
    return this.dta[11];
  }
  public set labia(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} labia to non-number value!`);
    } else {
      if (val > 4) {
        val = 4;
      } else if (val < 0) {
        val = 0;
      }
      this.dta[11] = val;
    }
  }
  public get beauty(): number {
    return this.dta[12];
  }
  public set beauty(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} beauty to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      } else if (val < 1) {
        val = 1;
      }
      this.dta[12] = val;
    }
  }
  public get face(): string {
    return this.dta[13];
  }
  public set face(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} face to non-string value!`);
    } else {
      this.dta[13] = val;
    }
  }
  public get brow(): string {
    return this.dta[14];
  }
  public set brow(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} brow to non-string value!`);
    } else {
      this.dta[14] = val;
    }
  }
  public get nose(): string {
    return this.dta[15];
  }
  public set nose(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} nose to non-string value!`);
    } else {
      this.dta[15] = val;
    }
  }
  public get lips(): number {
    return this.dta[16];
  }
  public set lips(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} lips to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      } else if (val < 1) {
        val = 1;
      }
      this.dta[16] = val;
    }
  }
  public get jaw(): string {
    return this.dta[17];
  }
  public set jaw(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} jaw to non-string value!`);
    } else {
      this.dta[17] = val;
    }
  }
  public get eyeColor(): string {
    return this.dta[18];
  }
  public set eyeColor(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} eyeColor to non-string value!`);
    } else {
      this.dta[18] = val;
    }
  }
  public get lactation(): number {
    return this.dta[19];
  }
  public set lactation(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} lactation to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      } else if (val < 0) {
        val = 0;
      }
      this.dta[19] = val;
    }
  }
  public get lactCapacity(): number {
    return this.dta[20];
  }
  public set lactCapacity(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} lactCapacity to non-number value!`);
    } else {
      if (val < 0) {
        val = 0;
      }
      this.dta[20] = val;
    }
  }
  public get orgasm(): number {
    return this.dta[21];
  }
  public set orgasm(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} orgasm to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      } else if (val < 10) {
        val = 10;
      }
      this.dta[21] = val;
    }
  }
  public get energy(): number {
    return this.dta[22];
  }
  public set energy(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} energy to non-number value!`);
    } else {
      if (val > 20) {
        val = 20;
      } else if (val < 5) {
        val = 5;
      }
      this.dta[22] = val;
    }
  }
  public get ears(): string {
    return this.dta[23];
  }
  public set ears(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} ears to non-string value!`);
    } else {
      this.dta[23] = val;
    }
  }
  public get topATR(): number {
    return this.dta[24];
  }
  public set topATR(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} topATR to non-number value!`);
    } else {
      if (val > 15) {
        val = 15;
      } else if (val < -5) {
        val = -5;
      }
      this.dta[24] = val;
    }
  }
  public get botATR(): number {
    return this.dta[25];
  }
  public set botATR(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} botATR to non-number value!`);
    } else {
      if (val > 15) {
        val = 15;
      } else if (val < -5) {
        val = -5;
      }
      this.dta[25] = val;
    }
  }
  public get ATR(): number {
    return this.dta[26];
  }
  public set ATR(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} ATR to non-number value!`);
    } else {
      if (val > 30) {
        val = 30;
      } else if (val < -10) {
        val = -10;
      }
      this.dta[26] = val;
    }
  }
}

