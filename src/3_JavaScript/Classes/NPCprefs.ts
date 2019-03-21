

class NPCprefs {
  public Fweight: [number, number, number, number, number, number];
  public Mweight: [number, number, number, number, number, number];
  public Fheight: [number, number, number, number, number];
  public Mheight: [number, number, number, number, number];
  public Fmuscle: [number, number, number, number, number, number];
  public Mmuscle: [number, number, number, number, number, number];
  public Fother: [number, number, number, number, number, number, number, number, number, number];
  public Mother: [number, number, number, number, number, number, number, number, number];
  public active: number;
  public romance: number;
  public novel: number;
  public excite: number;
  public night: number;
  public expensive: number;
  public fancy: number;
  public popular: number;
  public _k: string;
  constructor(key, {
    Fweight,
    Mweight,
    Fheight,
    Mheight,
    Fmuscle,
    Mmuscle,
    Fother,
    Mother,
    active,
    romance,
    novel,
    excite,
    night,
    expensive,
    fancy,
    popular,
  }: DataPref) {
    this._k = key;
    this.Fweight = clone(Fweight);
    this.Mweight = clone(Mweight);
    this.Fheight = clone(Fheight);
    this.Mheight = clone(Mheight);
    this.Fmuscle = clone(Fmuscle);
    this.Mmuscle = clone(Mmuscle);
    this.Fother = clone(Fother);
    this.Mother = clone(Mother);
    this.active = active;
    this.romance = romance;
    this.novel = novel;
    this.excite = excite;
    this.night = night;
    this.expensive = expensive;
    this.fancy = fancy;
    this.popular = popular;
  }
}

