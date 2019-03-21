

class Persona {
  public type: string;
  public bCon: number;
  public mentionFertile: boolean;
  public fidelity: number;
  public sweet: boolean;
  public sexy: boolean;
  public slutty: boolean;
  public lookingFor: string;
  public _k: string;
  constructor(key, { type, bCon, mentionFertile, fidelity, sweet, sexy, slutty, lookingFor }: Persona) {
    this._k = key;
    this.type = type;
    this.bCon = bCon;
    this.mentionFertile = mentionFertile;
    this.fidelity = fidelity;
    this.sweet = sweet;
    this.sexy = sexy;
    this.slutty = slutty;
    this.lookingFor = lookingFor;
  }
}

