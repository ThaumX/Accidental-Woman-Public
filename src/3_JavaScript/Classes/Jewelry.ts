

class Jewelry {
  public neck: string;
  public wristR: string;
  public wristL: string;
  public handR: string;
  public handL: string;
  public ringR: string;
  public ringL: string;
  public nose: string;
  public lip: string;
  public tongue: string;
  public brow: string;
  public earR: string;
  public earL: string;
  public upEar: string;
  public belly: string;
  public nipR: string;
  public nipL: string;
  public clit: string;
  public labia: string;
  public pierced: PiercingSlots;
  public owned: string[];
  public _k: string;
  constructor(key, { neck, wristR, wristL, handR, handL, ringR, ringL, nose, lip, tongue, brow, earR, earL, upEar, belly, nipR, nipL, clit, labia, pierced, owned }: PCjewelry) {
    this._k = key;
    this.neck = neck;
    this.wristR = wristR;
    this.wristL = wristL;
    this.handR = handR;
    this.handL = handL;
    this.ringR = ringR;
    this.ringL = ringL;
    this.nose = nose;
    this.lip = lip;
    this.tongue = tongue;
    this.brow = brow;
    this.earR = earR;
    this.earL = earL;
    this.upEar = upEar;
    this.belly = belly;
    this.nipR = nipR;
    this.nipL = nipL;
    this.clit = clit;
    this.labia = labia;
    this.pierced = clone(pierced);
    this.owned = clone(owned);
  }
}

