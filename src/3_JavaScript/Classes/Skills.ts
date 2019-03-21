//   .d8888b.  888      d8b 888 888
//  d88P  Y88b 888      Y8P 888 888
//  Y88b.      888          888 888
//   "Y888b.   888  888 888 888 888 .d8888b
//      "Y88b. 888 .88P 888 888 888 88K
//        "888 888888K  888 888 888 "Y8888b.
//  Y88b  d88P 888 "88b 888 888 888      X88
//   "Y8888P"  888  888 888 888 888  88888P'

// CLASS DEFINITION


class Skills {
  // tslint:disable-next-line:max-line-length
  public dta: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
  constructor({
    exhibition,
    prostitute,
    sex, oral,
    seduction,
    comm, org,
    probSolving,
    finance,
    art,
    athletic,
    dancing,
    clean,
    shop,
    cook,
    martial,
    crime,
    manage,
    perform,
    heels,
    kegel,
    firearms,
    dta,
  }: PCskills) {
    if (dta == null) {
      crime = (crime == null) ? Math.round((comm + prostitute + probSolving) / 4) : crime;
      firearms = (firearms == null) ? Math.round((probSolving / 2) + (org / 4)) : firearms;
      manage = (manage == null) ? Math.round((comm + probSolving + ((org + finance) * 0.5)) / 4.5) : manage;
      perform = (perform == null) ? Math.round((comm + (exhibition * 0.5) + (seduction * 0.5) + art) / 4) : perform;
      if (heels == null && State.active.variables.AW.startMale) {
        heels = Math.round(athletic / 20) * 10;
      } else if (heels == null) {
        heels = Math.round(athletic / 10) * 10 + 10;
      }
      kegel = (kegel == null) ? Math.round((sex + athletic) / 3) : kegel;
      // tslint:disable-next-line:max-line-length
      this.dta = [exhibition, prostitute, sex, oral, seduction, comm, org, probSolving, finance, art, athletic, dancing, clean, shop, cook, martial, crime, manage, perform, heels, kegel, firearms];
    } else {
      this.dta = clone(dta);
    }
  }
  // some compatibility getters and setters
  public get dance(): number {
    return this.dancing;
  }
  public set dance(value: number) {
    this.dancing = value;
  }
  public get whore(): number {
    return this.prostitute;
  }
  public set whore(value: number) {
    this.prostitute = value;
  }
  public get prostitution(): number {
    return this.prostitute;
  }
  public set prostitution(value: number) {
    this.prostitute = value;
  }
  public get prost(): number {
    return this.prostitute;
  }
  public set prost(value: number) {
    this.prostitute = value;
  }
  public get exhib(): number {
    return this.exhibition;
  }
  public set exhib(value: number) {
    this.exhibition = value;
  }
  public get exhibit(): number {
    return this.exhibition;
  }
  public set exhibit(value: number) {
    this.exhibition = value;
  }
  public get sed(): number {
    return this.seduction;
  }
  public set sed(value: number) {
    this.seduction = value;
  }
  public get probSolve(): number {
    return this.probSolving;
  }
  public set probSolve(value: number) {
    this.probSolving = value;
  }
  // GETTER/SETTER PAIRS =========================
  public get exhibition(): number {
    return this.dta[0];
  }
  public set exhibition(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set exhibition to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[0] = val;
    }
  } public get prostitute(): number {
    return this.dta[1];
  }
  public set prostitute(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set prostitute to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[1] = val;
    }
  } public get sex(): number {
    return this.dta[2];
  }
  public set sex(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set sex to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[2] = val;
    }
  } public get oral(): number {
    return this.dta[3];
  }
  public set oral(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set oral to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[3] = val;
    }
  } public get seduction(): number {
    return this.dta[4];
  }
  public set seduction(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set seduction to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[4] = val;
    }
  } public get comm(): number {
    return this.dta[5];
  }
  public set comm(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set comm to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[5] = val;
    }
  } public get org(): number {
    return this.dta[6];
  }
  public set org(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set org to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[6] = val;
    }
  } public get probSolving(): number {
    return this.dta[7];
  }
  public set probSolving(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set probSolving to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[7] = val;
    }
  } public get finance(): number {
    return this.dta[8];
  }
  public set finance(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set finance to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[8] = val;
    }
  } public get art(): number {
    return this.dta[9];
  }
  public set art(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set art to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[9] = val;
    }
  } public get athletic(): number {
    return this.dta[10];
  }
  public set athletic(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set athletic to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[10] = val;
    }
  } public get dancing(): number {
    return this.dta[11];
  }
  public set dancing(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set dancing to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[11] = val;
    }
  } public get clean(): number {
    return this.dta[12];
  }
  public set clean(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set clean to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[12] = val;
    }
  } public get shop(): number {
    return this.dta[13];
  }
  public set shop(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set shop to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[13] = val;
    }
  } public get cook(): number {
    return this.dta[14];
  }
  public set cook(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set cook to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[14] = val;
    }
  } public get martial(): number {
    return this.dta[15];
  }
  public set martial(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set martial to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[15] = val;
    }
  } public get crime(): number {
    return this.dta[16];
  }
  public set crime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set crime to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[16] = val;
    }
  } public get manage(): number {
    return this.dta[17];
  }
  public set manage(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set manage to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[17] = val;
    }
  } public get perform(): number {
    return this.dta[18];
  }
  public set perform(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set perform to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[18] = val;
    }
  } public get heels(): number {
    return this.dta[19];
  }
  public set heels(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set heels to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[19] = val;
    }
  } public get kegel(): number {
    return this.dta[20];
  }
  public set kegel(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set kegel to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[20] = val;
    }
  } public get firearms(): number {
    return this.dta[20];
  }
  public set firearms(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set kegel to non-number value!`);
    } else {
      if (val > 200) {
        val = 200;
      }
      if (val < 0) {
        val = 0;
      }
      this.dta[20] = val;
    }
}
}

