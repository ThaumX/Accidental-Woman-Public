

class Schedule {
  public workdays: boolean[];
  public workhours: number[];
  public workLoc: string;
  public outhours: number[];
  public locations: any[];
  public _k: string;
  constructor(key, {
    workdays,
    workhours,
    workLoc,
    outhours,
    locations,
  }: DataSched) {
    this._k = key;
    this.workdays = clone(workdays);
    this.workhours = clone(workhours);
    this.workLoc = workLoc;
    this.outhours = clone(outhours);
    this.locations = clone(locations);
  }
}

