

class Fetus {
  public mother: string;
  public father: string;
  public fertTime: number;
  public implantTime: number;
  public health: number;
  public gender: number;
  public grow: [number, number];
  public flag: string[];
  public birth: boolean;
  constructor({ mother, father, fertTime, implantTime, health, gender, grow, flag, birth }: { mother: string, father: string, fertTime: number, implantTime?: number, health?: number, gender: number, grow?: [number, number], flag?: string[], birth?: boolean}) {
    this.mother = mother;
    this.father = father;
    this.fertTime = fertTime;
    if (implantTime == null) {
      this.implantTime = setup.omni.value;
    } else {
      this.implantTime = implantTime;
    }
    if (health == null) {
      this.health = random(90, 100);
    } else {
      this.health = health;
    }
    if (gender == null) {
      this.gender = 2;
    } else {
      this.gender = gender;
    }
    if (grow == null) {
      this.grow = [0, 0];
    } else {
      this.grow = [grow[0], grow[1]];
    }
    if (flag == null) {
      this.flag = [];
    } else {
      this.flag = clone(flag);
    }
    if (birth == null) {
      this.birth = false;
    } else {
      this.birth = birth;
    }
  }
  public get growth(): string {
    return String(this.grow[0]) + "." + String(this.grow[1]);
  }
  public set growth(input: string) {
    if (input[1] === ".") {
      this.grow[0] = Number(input[0]);
      if (input.length > 4) {
        this.grow[1] = Number(input.slice(2, 4));
      } else {
        this.grow[1] = Number(input.slice(2));
      }
    } else if (input[2] === ".") {
      this.grow[0] = Number(input.slice(0, 2));
      if (input.length > 5) {
        this.grow[1] = Number(input.slice(3, 5));
      } else {
        this.grow[1] = Number(input.slice(3));
      }
    } else {
      let num;
      try {
        num = Math.round(Number(input));
      } catch (e) {
        aw.con.warn(`Attempted to set Fetus.growth to invalid value. Error ${e.name}: ${e.message}`);
        return;
      }
      this.grow[0] = num;
      this.grow[1] = 0;
      aw.con.info(`Setting Fetus.growth performed with fallback rounding!`);
    }
  }
}

