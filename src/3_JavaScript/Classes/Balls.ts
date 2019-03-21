

class Balls {
  public count: number;
  public size: number;
  public sac: number;
  public hang: number;
  public tags: string[];
  public _k: string;
  constructor(key, {
    count = 0,
    size = 0,
    sac = 0,
    hang = 0,
    tags = ["none"],
  }: DataBalls) {
    this._k = key;
    this.count = count;
    this.size = size;
    this.sac = sac;
    this.hang = hang;
    this.tags = clone(tags);
  }
}

