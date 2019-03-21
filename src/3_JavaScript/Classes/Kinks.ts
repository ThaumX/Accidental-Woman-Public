

class Kinks {
  public dta: boolean[];
  public _k: string;
  constructor(key, { risky, pregnancy, sizequeen, cumSlut, sub, exhibition, masochist, buttSlut, publix, slut, superSlut, hyperSlut, oral, anal, force, rape, liberate, easy, nips, dom, water, bond, hard, fap, shame, dta }: KinkList) {
    this._k = key;
    if (dta == null) {
      this.dta = [risky, pregnancy, sizequeen, cumSlut, sub, exhibition, masochist, buttSlut, publix, slut, superSlut, hyperSlut, oral, anal, force, rape, liberate, easy, nips, dom, water, bond, hard, fap, shame];
    } else {
      this.dta = clone(dta);
    }
  }
  // returns true if one of supplied kinks is true
  public has(...kinks: kink[]): boolean {
    for (let i = 0, c = kinks.length; i < c; i++) {
      if (this[kinks[i]]) {
        return true;
      }
    }
    return false;
  }
  // returns true if ALL of supplied kinks are true
  public hasAll(...kinks: kink[]): boolean {
    for (let i = 0, c = kinks.length; i < c; i++) {
      if (!this[kinks[i]]) {
        return false;
      }
    }
    return true;
  }
  // returns true only if all supplied kinks are false
  public hasNot(...kinks: kink[]): boolean {
    for (let i = 0, c = kinks.length; i < c; i++) {
      if (this[kinks[i]]) {
        return false;
      }
    }
    return true;
  }
  public get risky(): boolean {
    return this.dta[0];
  }
  public set risky(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} risky to non-boolean value!`);
    } else {
      this.dta[0] = val;
    }
  } public get pregnancy(): boolean {
    return this.dta[1];
  }
  public set pregnancy(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} pregnancy to non-boolean value!`);
    } else {
      this.dta[1] = val;
    }
  } public get sizequeen(): boolean {
    return this.dta[2];
  }
  public set sizequeen(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} sizequeen to non-boolean value!`);
    } else {
      this.dta[2] = val;
    }
  } public get cumSlut(): boolean {
    return this.dta[3];
  }
  public set cumSlut(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} cumSlut to non-boolean value!`);
    } else {
      this.dta[3] = val;
    }
  } public get sub(): boolean {
    return this.dta[4];
  }
  public set sub(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} sub to non-boolean value!`);
    } else {
      this.dta[4] = val;
    }
  } public get exhibition(): boolean {
    return this.dta[5];
  }
  public set exhibition(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} exhibition to non-boolean value!`);
    } else {
      this.dta[5] = val;
    }
  } public get masochist(): boolean {
    return this.dta[6];
  }
  public set masochist(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} masochist to non-boolean value!`);
    } else {
      this.dta[6] = val;
    }
  } public get buttSlut(): boolean {
    return this.dta[7];
  }
  public set buttSlut(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} buttSlut to non-boolean value!`);
    } else {
      this.dta[7] = val;
    }
  } public get public(): boolean {
    return this.dta[8];
  }
  public set public(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} publix to non-boolean value!`);
    } else {
      this.dta[8] = val;
    }
  } public get slut(): boolean {
    return this.dta[9];
  }
  public set slut(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} slut to non-boolean value!`);
    } else {
      this.dta[9] = val;
    }
  } public get superSlut(): boolean {
    return this.dta[10];
  }
  public set superSlut(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} superSlut to non-boolean value!`);
    } else {
      this.dta[10] = val;
    }
  } public get hyperSlut(): boolean {
    return this.dta[11];
  }
  public set hyperSlut(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} hyperSlut to non-boolean value!`);
    } else {
      this.dta[11] = val;
    }
  } public get oral(): boolean {
    return this.dta[12];
  }
  public set oral(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} oral to non-boolean value!`);
    } else {
      this.dta[12] = val;
    }
  } public get anal(): boolean {
    return this.dta[13];
  }
  public set anal(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} anal to non-boolean value!`);
    } else {
      this.dta[13] = val;
    }
  } public get force(): boolean {
    return this.dta[14];
  }
  public set force(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} force to non-boolean value!`);
    } else {
      this.dta[14] = val;
    }
  } public get rape(): boolean {
    return this.dta[15];
  }
  public set rape(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} rape to non-boolean value!`);
    } else {
      this.dta[15] = val;
    }
  } public get liberate(): boolean {
    return this.dta[16];
  }
  public set liberate(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} liberate to non-boolean value!`);
    } else {
      this.dta[16] = val;
    }
  } public get easy(): boolean {
    return this.dta[17];
  }
  public set easy(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} easy to non-boolean value!`);
    } else {
      this.dta[17] = val;
    }
  } public get nips(): boolean {
    return this.dta[18];
  }
  public set nips(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} nips to non-boolean value!`);
    } else {
      this.dta[18] = val;
    }
  } public get dom(): boolean {
    return this.dta[19];
  }
  public set dom(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} dom to non-boolean value!`);
    } else {
      this.dta[19] = val;
    }
  } public get water(): boolean {
    return this.dta[20];
  }
  public set water(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} water to non-boolean value!`);
    } else {
      this.dta[20] = val;
    }
  } public get bond(): boolean {
    return this.dta[21];
  }
  public set bond(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} bond to non-boolean value!`);
    } else {
      this.dta[21] = val;
    }
  } public get hard(): boolean {
    return this.dta[22];
  }
  public set hard(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} hard to non-boolean value!`);
    } else {
      this.dta[22] = val;
    }
  } public get fap(): boolean {
    return this.dta[23];
  }
  public set fap(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} fap to non-boolean value!`);
    } else {
      this.dta[23] = val;
    }
  } public get shame(): boolean {
    return this.dta[24];
  }
  public set shame(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} shame to non-boolean value!`);
    } else {
      this.dta[24] = val;
    }
  }
}

