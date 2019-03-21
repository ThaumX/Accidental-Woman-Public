

class Zygote {
  public mother: string;
  public father: string;
  public time: number;
  public count: number;
  constructor({mother, father, time, count}: {mother: string, father: string, time?: number, count?: number}) {
    this.mother = mother;
    this.father = father;
    if (time == null) {
      this.time = setup.omni.value;
    } else {
      this.time = time;
    }
    if (count == null) {
      this.count = 0;
    } else {
      this.count = count;
    }
  }
}

