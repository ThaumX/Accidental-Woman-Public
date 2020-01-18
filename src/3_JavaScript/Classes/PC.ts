

class PC {
  public key: string;
  public main!: PCmain;
  public fert!: Fert;
  public body!: Body;
  public mutate!: Mutation;
  public status!: Status;
  public cond!: Condition;
  public trait!: Traits;
  public persona!: Persona;
  public kink!: Kinks;
  public groom!: PCgroom;
  public tattoo!: Tattoo;
  public jewel!: Jewelry;
  public clothes!: Clothes;
  constructor({main, fert, body, mutate, status, cond, trait, persona, kink, groom, jewel, tattoo, clothes}) {
    this.key = "pc";
    try {
      this.main = new PCmain(this.key, main);
    } catch (e) { console.log(`Error constructing PC subclass main - ${e.name}: ${e.message}.`); }
    try {
      this.fert = new Fert(this.key, fert);
    } catch (e) { console.log(`Error constructing PC subclass fert - ${e.name}: ${e.message}.`); }
    try {
      this.body = new Body(this.key, body);
    } catch (e) { console.log(`Error constructing PC subclass body - ${e.name}: ${e.message}.`); }
    try {
      this.mutate = new Mutation(this.key, mutate);
    } catch (e) { console.log(`Error constructing PC subclass mutate - ${e.name}: ${e.message}.`); }
    try {
      this.status = new Status(this.key, status);
    } catch (e) { console.log(`Error constructing PC subclass status - ${e.name}: ${e.message}.`); }
    try {
      this.cond = new Condition(this.key, cond);
    } catch (e) { console.log(`Error constructing PC subclass cond - ${e.name}: ${e.message}.`); }
    try {
      this.trait = new Traits(this.key, trait);
    } catch (e) { console.log(`Error constructing PC subclass trait - ${e.name}: ${e.message}.`); }
    try {
      this.persona = new Persona(this.key, persona);
    } catch (e) { console.log(`Error constructing PC subclass persona - ${e.name}: ${e.message}.`); }
    try {
      this.kink = new Kinks(this.key, kink);
    } catch (e) { console.log(`Error constructing PC subclass kink - ${e.name}: ${e.message}.`); }
    try {
      this.groom = new PCgroom(this.key, groom);
    } catch (e) { console.log(`Error constructing PC subclass groom - ${e.name}: ${e.message}.`); }
    try {
      this.tattoo = new Tattoo(this.key, tattoo);
    } catch (e) { console.log(`Error constructing PC subclass tattoo - ${e.name}: ${e.message}.`); }
    try {
      this.jewel = new Jewelry(this.key, jewel);
    } catch (e) { console.log(`Error constructing PC subclass jewel - ${e.name}: ${e.message}.`); }
    try {
      this.clothes = new Clothes(this.key, clothes);
    } catch (e) { console.log(`Error constructing PC subclass clothes - ${e.name}: ${e.message}.`); }
  }
  public get name(): string {
    if (this.main.nickname === "none") {
      return (this.main.name + " " + this.main.surname);
    }
    return (this.main.name + ' "' + this.main.nickname + '" ' + this.main.surname);
  }
}

