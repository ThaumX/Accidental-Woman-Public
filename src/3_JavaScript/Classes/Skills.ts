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
    heels,
    dta,
  }: PCskills) {
    if (dta == null) {
      if (heels == null && State.active.variables.AW.startMale) {
        heels = Math.round(athletic / 20) * 10;
      } else if (heels == null) {
        heels = Math.round(athletic / 10) * 10 + 10;
      }
      // tslint:disable-next-line:max-line-length
      this.dta = [exhibition, prostitute, sex, oral, seduction, comm, org, probSolving, finance, art, athletic, dancing, clean, shop, cook, random(1,5), 0, 0, 0, heels, 0, random(1, 10)];
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
  }
  public get curExhibition(): number {
    return Math.max(0, Math.min(200, (this.exhibition + ↂ.flag.tempSkillBoost.exhibition)));
  }
  public set curExhibition(val: number) {
    aw.con.warn("Attempted to set 'curExhibition' skill");
  }
  public get prostitute(): number {
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
  }
  public get curProstitute(): number {
    return Math.max(0, Math.min(200, (this.prostitute + ↂ.flag.tempSkillBoost.prostitute)));
  }
  public set curProstitute(val: number) {
    aw.con.warn("Attempted to set 'curProstitute' skill");
  }
  public get sex(): number {
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
  }
  public get curSex(): number {
    return Math.max(0, Math.min(200, (this.sex + ↂ.flag.tempSkillBoost.sex)));
  }
  public set curSex(val: number) {
    aw.con.warn("Attempted to set 'curSex' skill");
  }
  public get oral(): number {
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
  }
  public get curOral(): number {
    return Math.max(0, Math.min(200, (this.oral + ↂ.flag.tempSkillBoost.oral)));
  }
  public set curOral(val: number) {
    aw.con.warn("Attempted to set 'curOral' skill");
  }
  public get seduction(): number {
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
  }
  public get curSeduction(): number {
    return Math.max(0, Math.min(200, (this.seduction + ↂ.flag.tempSkillBoost.seduction)));
  }
  public set curSeduction(val: number) {
    aw.con.warn("Attempted to set 'curSeduction' skill");
  }
  public get comm(): number {
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
  }
  public get curComm(): number {
    return Math.max(0, Math.min(200, (this.comm + ↂ.flag.tempSkillBoost.comm)));
  }
  public set curComm(val: number) {
    aw.con.warn("Attempted to set 'curComm' skill");
  }
  public get org(): number {
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
  }
  public get curOrg(): number {
    return Math.max(0, Math.min(200, (this.org + ↂ.flag.tempSkillBoost.org)));
  }
  public set curOrg(val: number) {
    aw.con.warn("Attempted to set 'curOrg' skill");
  }
  public get probSolving(): number {
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
  }
  public get curProbSolving(): number {
    return Math.max(0, Math.min(200, (this.probSolving + ↂ.flag.tempSkillBoost.probSolving)));
  }
  public set curProbSolving(val: number) {
    aw.con.warn("Attempted to set 'curProbSolving' skill");
  }
  public get finance(): number {
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
  }
  public get curFinance(): number {
    return Math.max(0, Math.min(200, (this.finance + ↂ.flag.tempSkillBoost.finance)));
  }
  public set curFinance(val: number) {
    aw.con.warn("Attempted to set 'curFinance' skill");
  }
  public get art(): number {
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
  }
  public get curArt(): number {
    return Math.max(0, Math.min(200, (this.art + ↂ.flag.tempSkillBoost.art)));
  }
  public set curArt(val: number) {
    aw.con.warn("Attempted to set 'curArt' skill");
  }
  public get athletic(): number {
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
  }
  public get curAthletic(): number {
    return Math.max(0, Math.min(200, (this.athletic + ↂ.flag.tempSkillBoost.athletic)));
  }
  public set curAthletic(val: number) {
    aw.con.warn("Attempted to set 'curAthletic' skill");
  }
  public get dancing(): number {
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
  }
  public get curDancing(): number {
    return Math.max(0, Math.min(200, (this.dancing + ↂ.flag.tempSkillBoost.dancing)));
  }
  public set curDancing(val: number) {
    aw.con.warn("Attempted to set 'curDancing' skill");
  }
  public get clean(): number {
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
  }
  public get curClean(): number {
    return Math.max(0, Math.min(200, (this.clean + ↂ.flag.tempSkillBoost.clean)));
  }
  public set curClean(val: number) {
    aw.con.warn("Attempted to set 'curClean' skill");
  }
  public get shop(): number {
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
  }
  public get curShop(): number {
    return Math.max(0, Math.min(200, (this.shop + ↂ.flag.tempSkillBoost.shop)));
  }
  public set curShop(val: number) {
    aw.con.warn("Attempted to set 'curShop' skill");
  }
  public get cook(): number {
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
  }
  public get curCook(): number {
    return Math.max(0, Math.min(200, (this.cook + ↂ.flag.tempSkillBoost.cook)));
  }
  public set curCook(val: number) {
    aw.con.warn("Attempted to set 'curCook' skill");
  }
  public get martial(): number {
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
  }
  public get curMartial(): number {
    return Math.max(0, Math.min(200, (this.martial + ↂ.flag.tempSkillBoost.martial)));
  }
  public set curMartial(val: number) {
    aw.con.warn("Attempted to set 'curMartial' skill");
  }
  public get fight(): number {
    return Math.max(Math.round((this.martial * 2 + this.athletic) / 3), Math.floor(this.athletic / 2));
  }
  public set fight(val: number) {
    aw.con.warn("Attempted to set a derived skill 'fight'")
  }
  public get curFight(): number {
    return Math.max(Math.round((this.curMartial * 2 + this.curAthletic) / 3), Math.floor(this.curAthletic / 2));
  }
  public set curFight(val: number) {
    aw.con.warn("Attempted to set 'curFight'skill")
  }
  public get crime(): number {
    return Math.round((this.curComm + (this.curProstitute * 2) + (this.curProbSolving * 2)) / 5);
  }
  public set crime(val: number) {
    aw.con.warn(`Attempted to set crime derived skill!`);
  }
  public get strip(): number {
    return Math.round((this.curExhibition + (this.curSeduction * 2) + (this.curDancing * 2) + this.curArt) / 6);
  }
  public set strip(val: number) {
    aw.con.warn(`Attempted to set strip derived skill!`);
  }
  public get manage(): number {
    return Math.round((this.curComm + this.curProbSolving + ((this.curOrg + this.curFinance) * 0.5)) / 3);
  }
  public set manage(val: number) {
    aw.con.warn(`Attempted to set manage derived skill!`);
  }
  public get perform(): number {
    return Math.round((this.curComm + (this.curExhibition * 0.5) + (this.curSeduction * 0.5) + this.curArt) / 3);
  }
  public set perform(val: number) {
    aw.con.warn(`Attempted to set perform derived skill!`);
  }
  public get heels(): number {
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
    return Math.round((this.curSex + this.curAthletic) / 2);
  }
  public set kegel(val: number) {
    aw.con.warn(`Attempted to set kegel derived skill!`);
  }
  public get firearms(): number {
    return this.dta[20];
  }
  public set firearms(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set firearms to non-number value!`);
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
  public get curFirearms(): number {
    return Math.max(0, Math.min(200, (this.firearms + ↂ.flag.tempSkillBoost.firearms)));
  }
  public set curFirearms(val: number) {
    aw.con.warn("Attempted to set 'curFirearms' skill");
  }
}

