

class BirthCon {
  public diaphragm: {
    worn: boolean;
    type: string;
    effect: number;
    health: number;
    break: boolean;
    sabo: number;
  };
  public femaleCondom: {
    worn: boolean;
    type: string;
    effect: number;
    health: number;
    break: boolean;
    sabo: number;
  };
  public menstrualCup: {
    worn: boolean;
    type: string;
    effect: number;
    health: number;
    break: boolean;
    sabo: number;
  };
  public sponge: {
    worn: boolean;
    type: string;
    effect: number;
    health: number;
    break: boolean;
    sabo: number;
  };
  public condom: {
    worn: boolean;
    type: string;
    effect: number;
    health: number;
    break: boolean;
    sabo: number;
  };
  public headCap: {
    worn: boolean;
    type: string;
    effect: number;
    health: number;
    break: boolean;
    sabo: number;
  };
  public hormone: number;
  public hormoneType: string;
  public knowIneffective: boolean;
  public ineffective: boolean;
  public chems: number;
  public date: number;
  public _k: string;
  constructor(key, {
    hormone,
    hormoneType,
    chems,
    date,
    diaphragm,
    femaleCondom,
    menstrualCup,
    ineffective = false,
    knowIneffective = false,
    sponge,
    condom,
    headCap,
  }: DataBirthcon) {
    this._k = key;
    this.hormone = hormone;
    if (chems == null) {
      this.chems = 0;
    } else {
      this.chems = chems;
    }
    if (date == null) {
      this.date = 0;
    } else {
      this.date = date;
    }
    this.hormoneType = hormoneType;
    this.ineffective = ineffective;
    this.knowIneffective = knowIneffective;
    this.diaphragm = clone(diaphragm);
    this.femaleCondom = clone(femaleCondom);
    this.menstrualCup = clone(menstrualCup);
    this.sponge = clone(sponge);
    this.condom = clone(condom);
    this.headCap = clone(headCap);
  }
  public setHormone(): void {
    const date = this.date;
    if (this.chems === 0) { // resets birthcontrol to default
      this.hormoneType = "none";
      this.ineffective = false;
      this.knowIneffective = false;
      this.hormone = 0;
    } else {
      switch (this.hormoneType) {
        case "pill":
          const hours = Math.floor((setup.omni.value - date) / 60);
          const today = (hours < 24) ? true : false;
          if (this.chems >= 1000 && today) {
            this.hormone = 100;
          } else if (this.chems >= 1000) {
            this.hormone = Math.round((this.chems - 200) / 125);
            this.chems -= random(150, 300);
          } else if (today) {
            this.hormone = Math.round(this.chems / 100);
          } else {
            this.hormone = Math.round(Math.max(0, this.chems - 200) / 125);
            this.chems -= random(150, 300);
          }
          this.chems -= 200;
          if (this.chems < 0) {
            this.chems = 0;
          }
          break;
        case "patch":
          break;
        case "shot":
          break;
        default:
          break;
      }
    }
  }
  public setDate(): void {
    this.date = setup.omni.value;
  }
  public get worn(): boolean {
    if (this.diaphragm.worn) { return true; }
    if (this.femaleCondom.worn) { return true; }
    if (this.menstrualCup.worn) { return true; }
    if (this.sponge.worn) { return true; }
    if (this.condom.worn) { return true; }
    if (this.headCap.worn) { return true; }
    return false;
  }

  // Anenn Markup
  get currentContraceptive(): string {
    let output = "";

    // Hormonal contraceptive bullshit
    if (this.hormoneType === "pill") {
      output = "pill";
    }
    else if (this.hormoneType === "patch") {
      output = "patch";
    }
    else if (this.hormoneType === "depo shot") {
      output = "contraceptive injection";
    }

    // Physical contraceptive bullshit
    else if (this.condom.worn) {
      output = "condom"
    }
    else if (this.diaphragm.worn) {
      output = "diaphragm"
    }
    else if (this.femaleCondom.worn) {
      output = "woman condom"
    }
    else if (this.sponge.worn) {
      output = "contraceptive sponge"
    }
    else if (this.femaleCondom.worn) {
      output = "cervical cap"
    }

    return output;
  }


  get wornType(): string {
    let bc = "";
    if (this.diaphragm.worn) { bc += "diaphragm"; }
    if (this.femaleCondom.worn) {
      if (bc === "") {
        bc += "femaleCondom";
      } else {
        bc += ", femaleCondom";
      }
    }
    if (this.menstrualCup.worn) {
      if (bc === "") {
        bc += "menstrualCup";
      } else {
        bc += ", menstrualCup";
      }
    }
    if (this.sponge.worn) {
      if (bc === "") {
        bc += "sponge";
      } else {
        bc += ", sponge";
      }
    }
    if (this.condom.worn) {
      if (bc === "") {
        bc += "condom";
      } else {
        bc += ", condom";
      }
    }
    if (this.headCap.worn) {
      if (bc === "") {
        bc += "headCap";
      } else {
        bc += ", headCap";
      }
    }
    if (bc === "") { bc = "none"; }
    return bc;
  }
}

