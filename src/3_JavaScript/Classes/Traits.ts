

class Traits {
  // tslint:disable-next-line:max-line-length
  public dta: [string, boolean, boolean, string, boolean, boolean, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
  public _k: string;
  // tslint:disable-next-line:max-line-length
  constructor(key, { vert, intro, extro, open, op, cl, will, libido, caring, bitch, maternal, romantic, deceptive, devious, persuasive, perceptive, forgetful, forgiving, lowEsteem, picky, crude, friendly, approachable, relaxed, flirty, materialist, dta }: PCtraits) {
    this._k = key;
    if (dta == null) {
      // tslint:disable-next-line:max-line-length
      this.dta = [vert, intro, extro, open, op, cl, will, libido, caring, bitch, maternal, romantic, deceptive, devious, persuasive, perceptive, forgetful, forgiving, lowEsteem, picky, crude, friendly, approachable, relaxed, flirty, materialist];
    } else {
      this.dta = clone(dta);
    }
  }
  public get vert(): string {
    return this.dta[0];
  }
  public set vert(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} vert to non-string value!`);
    } else {
      this.dta[0] = val;
    }
  } public get intro(): boolean {
    return this.dta[1];
  }
  public set intro(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} intro to non-boolean value!`);
    } else {
      this.dta[1] = val;
    }
  } public get extro(): boolean {
    return this.dta[2];
  }
  public set extro(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} extro to non-boolean value!`);
    } else {
      this.dta[2] = val;
    }
  } public get open(): string {
    return this.dta[3];
  }
  public set open(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} open to non-string value!`);
    } else {
      this.dta[3] = val;
    }
  } public get op(): boolean {
    return this.dta[4];
  }
  public set op(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} op to non-boolean value!`);
    } else {
      this.dta[4] = val;
    }
  } public get cl(): boolean {
    return this.dta[5];
  }
  public set cl(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} cl to non-boolean value!`);
    } else {
      this.dta[5] = val;
    }
  } public get will(): number {
    return this.dta[6];
  }
  public set will(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} will to non-number value!`);
    } else {
      if (val > 5) {
        val = 5;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[6] = val;
    }
  } public get libido(): number {
    return this.dta[7];
  }
  public set libido(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} libido to non-number value!`);
    } else {
      if (val > 8) {
        val = 8;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[7] = val;
    }
  } public get caring(): number {
    return this.dta[8];
  }
  public set caring(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} caring to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[8] = val;
    }
  } public get bitch(): number {
    return this.dta[9];
  }
  public set bitch(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} bitch to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[9] = val;
    }
  } public get maternal(): number {
    return this.dta[10];
  }
  public set maternal(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} maternal to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[10] = val;
    }
  } public get romantic(): number {
    return this.dta[11];
  }
  public set romantic(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} romantic to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[11] = val;
    }
  } public get deceptive(): number {
    return this.dta[12];
  }
  public set deceptive(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} deceptive to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[12] = val;
    }
  } public get devious(): number {
    return this.dta[13];
  }
  public set devious(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} devious to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[13] = val;
    }
  } public get persuasive(): number {
    return this.dta[14];
  }
  public set persuasive(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} persuasive to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[14] = val;
    }
  } public get perceptive(): number {
    return this.dta[15];
  }
  public set perceptive(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} perceptive to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[15] = val;
    }
  } public get forgetful(): number {
    return this.dta[16];
  }
  public set forgetful(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} forgetful to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[16] = val;
    }
  } public get forgiving(): number {
    return this.dta[17];
  }
  public set forgiving(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} forgiving to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[17] = val;
    }
  } public get lowEsteem(): number {
    return this.dta[18];
  }
  public set lowEsteem(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} lowEsteem to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[18] = val;
    }
  } public get picky(): number {
    return this.dta[19];
  }
  public set picky(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} picky to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[19] = val;
    }
  } public get crude(): number {
    return this.dta[20];
  }
  public set crude(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} crude to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[20] = val;
    }
  } public get friendly(): number {
    return this.dta[21];
  }
  public set friendly(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} friendly to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[21] = val;
    }
  } public get approachable(): number {
    return this.dta[22];
  }
  public set approachable(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} approachable to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[22] = val;
    }
  } public get relaxed(): number {
    return this.dta[23];
  }
  public set relaxed(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} relaxed to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[23] = val;
    }
  } public get flirty(): number {
    return this.dta[24];
  }
  public set flirty(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} flirty to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[24] = val;
    }
  } public get materialist(): number {
    return this.dta[25];
  }
  public set materialist(val: number) {
    if (typeof val !== "number") {
      aw.con.warn(`Attempted to set ${this._k} materialist to non-number value!`);
    } else {
      if (val > 1) {
        val = 1;
      }
      if (val < -1) {
        val = -1;
      }
      this.dta[25] = val;
    }
  }
}

