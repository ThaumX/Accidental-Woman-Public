

class Condition {
  public hair: ConditionItem;
  public face: ConditionItem;
  public chest: ConditionItem;
  public back: ConditionItem;
  public hands: ConditionItem;
  public stomach: ConditionItem;
  public butt: ConditionItem;
  public groin: ConditionItem;
  public genitals: ConditionItem;
  public thighs: ConditionItem;
  public legs: ConditionItem;
  public feet: ConditionItem;
  public vagFluid: {
    [propName: string]: number;
  };
  public anusFluid: {
    [propName: string]: number;
  };
  public _k: string;
  // tslint:disable-next-line:max-line-length
  constructor(key, { hair = {}, face = {}, chest = {}, back = {}, hands = {}, stomach = {}, butt = {}, groin = {}, genitals = {}, thighs = {}, legs = {}, feet = {}, vagFluid = {}, anusFluid = {}}: { hair: ConditionItem, face: ConditionItem, chest: ConditionItem, back: ConditionItem, hands: ConditionItem, stomach: ConditionItem, butt: ConditionItem, groin: ConditionItem, genitals: ConditionItem, thighs: ConditionItem, legs: ConditionItem, feet: ConditionItem, vagFluid: ConditionItem, anusFluid: ConditionItem}) {
    this._k = key;
    this.hair = clone(hair);
    this.face = clone(face);
    this.chest = clone(chest);
    this.back = clone(back);
    this.hands = clone(hands);
    this.stomach = clone(stomach);
    this.butt = clone(butt);
    this.groin = clone(groin);
    this.genitals = clone(genitals);
    this.thighs = clone(thighs);
    this.legs = clone(legs);
    this.feet = clone(feet);
    this.vagFluid = clone(vagFluid);
    this.anusFluid = clone(anusFluid);
  }
}

