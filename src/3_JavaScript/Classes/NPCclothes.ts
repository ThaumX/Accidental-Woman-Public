

class NPCclothes {
  public outfits: {
    casual: NPCoutfit,
    fancy: NPCoutfit,
    work: NPCoutfit,
    athletic: NPCoutfit,
    swim: NPCoutfit,
  };
  public current: string;
  public worn: NPCslots;
  public _k: string;
  constructor(key, {
    outfits,
    current,
    worn,
  }: DataClothes) {
    this._k = key;
    this.outfits = clone(outfits);
    this.current = current;
    this.worn = clone(worn);
  }
}

