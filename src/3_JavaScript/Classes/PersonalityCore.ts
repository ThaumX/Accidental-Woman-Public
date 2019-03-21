

class PersonalityCore {
  public procreate: Procreate;
  public morality: Morality;
  public agreeable: Agreeable;
  public conscient: Conscient;
  public loyalty: Loyalty;
  public curiosity: Curiosity;
  public neurotic: Neurotic;
  public ego: Ego;
  constructor({
    procreate,
    morality,
    agreeable,
    conscient,
    loyalty,
    curiosity,
    neurotic,
    ego,
  }: DataCore) {
    this.procreate = clone(procreate);
    this.morality = clone(morality);
    this.agreeable = clone(agreeable);
    this.conscient = clone(conscient);
    this.loyalty = clone(loyalty);
    this.curiosity = clone(curiosity);
    this.neurotic = clone(neurotic);
    this.ego = clone(ego);
  }
}

