



class PCmain {
  public id: "PC";
  public dta: [number, number, number, string, string, string, string, number, number, number, number, boolean, boolean, string];
  public _k: string;
  constructor(key, { ageOriginal, age, ageID, name, surname, background, bd, female, male, nickname, idCard, dta }: PCinitObject) {
    this._k = key;
    this.id = "PC";
    if (idCard == null) {
      idCard = "adult";
      setTimeout(() => setup.ageCheck.pcAgeCalc(), 25);
    }
    if (dta == null) {
      this.dta = [ageOriginal, age, ageID, idCard, name, surname, background, bd[0], bd[1], bd[2], bd[3], female, male, nickname];
    } else {
      this.dta = clone(dta);
    }
  }

  public get bd0(): number {
    return this.dta[7];
  }
  public set bd0(val) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set pc.main.bd[0] to NaN value`);
    } else {
      this.dta[7] = Math.max(1, Math.min(7, val));
    }
  }
  public get bd1(): number {
    return this.dta[8];
  }
  public set bd1(val) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set pc.main.bd[1] to NaN value`);
    } else {
      this.dta[8] = Math.max(1, Math.min(4, val));
    }
  }
  public get bd2(): number {
    return this.dta[9];
  }
  public set bd2(val) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set pc.main.bd[2] to NaN value`);
    } else {
      this.dta[9] = Math.max(1, Math.min(13, val));
    }
  }
  public get bd3(): number {
    return this.dta[10];
  }
  public set bd3(val) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set pc.main.bd[3] to NaN value`);
    } else {
      this.dta[10] = Math.max(2000, Math.min(2005, val));
    }
  }

  public get ageOriginal(): number {
    return this.dta[0];
  }
  public set ageOriginal(val: number) {
    if (typeof val !== "number") {
      if (typeof val === "string" && !isNaN(Number(val))) {
        val = Number(val);
        aw.con.info(`DATA VALIDATION: converted string to number for main.ageOriginal`);
      } else {
        aw.con.warn(`Attempted to set ${this._k} ageOriginal to non-number value!`);
        return;
      }
    }
    if (val > 50) {
      val = 50;
    }
    if (val < 18) {
      val = 18;
    }
    this.dta[0] = val;
  }
  public get age(): number {
    return this.dta[1];
  }
  public set age(val: number) {
    if (typeof val !== "number") {
      if (typeof val === "string" && !isNaN(Number(val))) {
        val = Number(val);
        aw.con.info(`DATA VALIDATION: converted string to number for main.age`);
      } else {
        aw.con.warn(`Attempted to set ${this._k} age to non-number value!`);
        return;
      }
    }
    if (val > 45) {
      val = 45;
    }
    if (val < 14) {
      val = 14;
    }
    this.dta[1] = val;
  }
  public get ageID(): number {
    return this.dta[2];
  }
  public set ageID(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} ageID to non-number value!`);
    } else {
      if (val > 45) {
        val = 45;
      }
      if (val < 14) {
        val = 14;
      }
      this.dta[2] = val;
    }
  }
  public get idCard(): string {
    return this.dta[3];
  }
  public set idCard(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} idCard to non-string value!`);
    } else {
      this.dta[3] = val;
    }
  }
  public get name(): string {
    return this.dta[4];
  }
  public set name(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} name to non-string value!`);
    } else {
      this.dta[4] = val;
    }
  }
  public get surname(): string {
    return this.dta[5];
  }
  public set surname(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} surname to non-string value!`);
    } else {
      this.dta[5] = val;
    }
  }
  public get background(): string {
    return this.dta[6];
  }
  public set background(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} background to non-string value!`);
    } else {
      this.dta[6] = val;
    }
  }
  /*public get bd(): [number, number, number, number] {
    return [this.dta[7], this.dta[8], this.dta[9], this.dta[10]];
  }
  public set bd(val: [number, number, number, number]) {
    val = [Number(val[0]), Number(val[1]), Number(val[2]), Number(val[3])];
    const start = 7;
    for (let i = 0; i < 4; i++) {
      if (isNaN(val[i])) {
        aw.con.warn(`Invalid value sent to pc.main.bd index ${i}!!!`);
      } else {
        this.dta[start + i] = val[i];
      }
    }
  }*/
  public get female(): boolean {
    return this.dta[11];
  }
  public set female(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} female to non-boolean value!`);
    } else {
      this.dta[11] = val;
    }
  }
  public get male(): boolean {
    return this.dta[12];
  }
  public set male(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} male to non-boolean value!`);
    } else {
      this.dta[12] = val;
    }
  }
  public get nickname(): string {
    return this.dta[13];
  }
  public set nickname(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} nickname to non-string value!`);
    } else {
      this.dta[13] = val;
    }
  }
  public get slutName(): boolean {
    return aw.blyat.isProfane(this.name);
  }
  public get slutSurname(): boolean {
    return aw.blyat.isProfane(this.surname);
  }
  public get slutNickname(): boolean {
    return aw.blyat.isProfane(this.nickname);
  }
}

