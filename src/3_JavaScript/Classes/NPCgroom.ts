

class NPCgroom {
  public hairColor: string;
  public hairCurl: number;
  public pubeColor: string;
  public pubeLength: number;
  public hairdye: string;
  public hairLength: number;
  public hairStyle: string;
  public hairDefaultFancy: string;
  public hairDefaultCasual: string;
  public pubeStyle: pubeStyle;
  public bikini: string;
  public pubeShape: string;
  public leghair: string;
  public armpit: string;
  public makeup: Makeup;
  public teeth: string;
  public _k: string;
  constructor(key, {
    hairColor,
    hairCurl,
    pubeColor,
    pubeStyle,
    pubeLength = -1,
    hairdye,
    hairLength,
    hairStyle,
    hairDefaultFancy = "neat",
    hairDefaultCasual = "neat",
    bikini = "shaved",
    pubeShape = "no",
    leghair = "shaved",
    armpit = "shaved",
    makeup = {
      atr: 0,
      sexy: 0,
      clown: false,
      type: "norm",
      desc: "is free of makeup.",
      look: "none",
    },
    teeth = "normal",
  }: DataGroom) {
    this._k = key;
    this.hairColor = hairColor;
    this.hairCurl = hairCurl;
    this.pubeColor = pubeColor;
    this.hairdye = hairdye;
    this.hairLength = hairLength;
    this.hairStyle = hairStyle;
    this.hairDefaultFancy = hairDefaultFancy;
    this.hairDefaultCasual = hairDefaultCasual;
    this.pubeStyle = pubeStyle;
    this.bikini = bikini;
    if (pubeLength === -1) {
      this.pubeLength = setup.bath.pubeLength[this.pubeStyle];
    } else {
      this.pubeLength = pubeLength;
    }
    if (pubeShape === "no") {
      this.pubeShape = setup.pubeShape(this.pubeStyle);
    } else {
      this.pubeShape = pubeShape;
    }
    this.leghair = leghair;
    this.armpit = armpit;
    this.makeup = clone(makeup);
    this.teeth = teeth;
  }
}

