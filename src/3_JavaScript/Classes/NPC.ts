

class NPC {
  public key: string;
  public body!: Body;
  public main!: NPCmain;
  public groom!: NPCgroom;
  public fert!: Fert;
  public status!: Status;
  public rship!: Relation;
  public cond!: Condition;
  public background!: Background;
  public friends: string[];
  public mutate!: Mutation;
  public pref!: NPCprefs;
  public core!: PersonalityCore;
  public clothes!: NPCclothes;
  public trait!: NPCtraits;
  public kink!: NPCkinks;
  public sched!: Schedule;
  public record!: NPCrecords;
  constructor({
    main,
    body,
    groom,
    sched,
    background,
    rship,
    cond,
    record,
    friends,
    clothes,
    status,
    mutate,
    pref,
    core,
    fert,
    kink,
    trait,
  }: DataNPC) {
    this.key = "n" + main.id;
    try {
      this.main = new NPCmain(this.key, main);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass main - ${e.name}: ${e.message}.`); }
    try {
      this.body = new Body(this.key, body);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass body - ${e.name}: ${e.message}.`); }
    try {
      this.groom = new NPCgroom(this.key, groom);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass groom - ${e.name}: ${e.message}.`); }
    try {
      this.sched = new Schedule(this.key, sched);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass sched - ${e.name}: ${e.message}.`); }
    try {
      this.background = new Background(this.key, background);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass background - ${e.name}: ${e.message}.`); }
    try {
      this.rship = new Relation(this.key, rship);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass rship - ${e.name}: ${e.message}.`); }
    try {
      this.cond = new Condition(this.key, cond);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass cond - ${e.name}: ${e.message}.`); }
    try {
      this.record = new NPCrecords(record);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass record - ${e.name}: ${e.message}.`); }
    this.friends = clone(friends);
    try {
      this.clothes = new NPCclothes(this.key, clothes);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass clothes - ${e.name}: ${e.message}.`); }
    try {
      this.status = new Status(this.key, status);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass status - ${e.name}: ${e.message}.`); }
    try {
      this.mutate = new Mutation(this.key, mutate);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass mutate - ${e.name}: ${e.message}.`); }
    try {
      this.pref = new NPCprefs(this.key, pref);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass pref - ${e.name}: ${e.message}.`); }
    try {
      this.core = new PersonalityCore(core);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass core - ${e.name}: ${e.message}.`); }
    try {
      this.fert = new Fert(this.key, fert);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass fert - ${e.name}: ${e.message}.`); }
    try {
      this.kink = new NPCkinks(this.key, kink);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass kink - ${e.name}: ${e.message}.`); }
    try {
      this.trait = new NPCtraits(this.key, trait);
    } catch (e) { aw.con.warn(`Error constructing NPC subclass trait - ${e.name}: ${e.message}.`); }
    const npcid = this.key;
    setTimeout(function() {
      try {
        setup.npcTotalATR(npcid);
      } catch (e) { aw.con.warn(`Error calculating NPC status.atr - ${e.name}: ${e.message}.`); }
      }, 100);
  }
  public get name(): string {
    let result;
    if (this.main.nickname !== "none") {
      result = this.main.name + ' "' + this.main.nickname + '" ';
    } else {
      result = this.main.name + " ";
    }
    result += this.main.surname;
    return result;
  }
}
