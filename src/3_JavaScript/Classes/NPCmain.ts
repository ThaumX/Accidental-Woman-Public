

class NPCmain {
  public id: number;
  public age: number;
  public bd: date;
  public female: boolean;
  public male: boolean;
  public genes: string;
  public seen: boolean;
  public interact: boolean;
  public relation: boolean;
  public suicide: boolean;
  public lifetime: number;
  public count: number;
  public tags: string[];
  public name: string;
  public surname: string;
  public portrait: string | setupSVGbuildArg;
  public nickname: string;
  public _k: string;
  constructor(key, {
    id,
    age,
    bd,
    female,
    male,
    genes,
    seen,
    interact,
    relation,
    suicide,
    lifetime,
    count,
    tags,
    name,
    surname,
    portrait,
    nickname,
  }: DataMain) {
    this._k = key;
    this.id = id;
    this.age = age;
    this.bd = bd;
    this.female = female;
    this.male = male;
    this.genes = genes;
    this.seen = seen;
    this.interact = interact;
    this.relation = relation;
    this.suicide = suicide;
    this.lifetime = lifetime;
    this.count = count;
    this.tags = clone(tags);
    this.name = name;
    this.surname = surname;
    this.portrait = clone(portrait);
    this.nickname = nickname;
  }
  public get fullName(): string {
    if (this.nickname === "none") {
      return this.name + " " + this.surname;
    } else {
      return this.name + " \"" + this.nickname + "\" " + this.surname;
    }
  }
  public get picture(): string {
    if (typeof this.portrait === "string") {
      return this.portrait;
    } else {
      return setup.svg.build(this.portrait);
    }
  }
}

