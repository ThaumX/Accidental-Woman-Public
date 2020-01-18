

class Penis {
  public length: number;
  public girth: number;
  public head: string;
  public circum: boolean;
  public hard: number;
  public smegma: boolean;
  public type: string;
  public tags: string[];
  public _k: string;
  constructor(key, {
    length = 0,
    girth = 0,
    head = "normal",
    circum = false,
    hard = 0,
    smegma = false,
    type = "human",
    tags = ["none"],
  }: DataCock) {
      this._k = key;
      this.length = length;
      this.girth = girth;
      this.head = head;
      this.circum = circum;
      this.hard = hard;
      this.smegma = smegma;
      this.type = type;
      this.tags = clone(tags);
    }
    public vol(): number {
      const len = (this.length / 10) * 2.54;
      const rad = ((this.girth / 10) * 2.54) / 2;
      return Math.round(Math.PI * Math.pow(rad, 2) * len);
    }
}

