/*

*/

class Child {
  public mother: string;
  public father: string;
  public dadName: string;
  public health: number;
  public gender: number;
  public flag: string[];
  public birth: number;
  public name: string;
  public surname: string;
  public dadRace: string;
  public hairColor: string;
  public hairCurl: number;
  public eyeColor: string;
  public skinColor: string;
  constructor({ mother, father, health, gender, flag, birth, dadName, dadRace, name, surname, hairColor, hairCurl, eyeColor, skinColor }: { mother: string, father: string, health?: number, gender: number, flag?: string[], birth?: number, dadName?: string, dadRace: string, name?: string, surname: string, hairColor: string, hairCurl: number, eyeColor: string, skinColor: string }) {
    this.mother = mother;
    this.father = father;
    this.gender = gender;
    this.dadRace = dadRace;
    this.hairColor = hairColor;
    this.hairCurl = hairCurl;
    this.eyeColor = eyeColor;
    this.skinColor = skinColor;
    if (health == null) {
      this.health = 100;
    } else {
      this.health = health;
    }
    if (flag == null) {
      this.flag = ["none"];
    } else {
      this.flag = clone(flag);
    }
    if (birth == null) {
      this.birth = aw.time;
    } else {
      this.birth = birth;
    }
    if (dadName == null) {
      if (setup.npcid.test(father) && aw.npc[father] != null) {
        try {
          this.dadName = aw.npc[father].main.name;
        } catch (e) {
          this.dadName = "forgotten";
        }
      } else {
        this.dadName = "unknown";
      }
    } else {
      this.dadName = dadName;
    }
    this.surname = surname;
    if (name == null) {
      this.name = "unnamed";
    } else {
      this.name = name;
    }
  }
  public get ageRaw(): number {
    return aw.time - this.birth;
  }
  public get ageDays(): number {
    return Math.floor(this.ageRaw / 1440);
  }
  public get ageYear(): number {
    return Math.floor(this.ageDays / 365);
  }
  public get ageMonth(): number {
    return Math.floor(this.ageDays / 28);
  }
  public get age(): string {
    const years = this.ageYear;
    const months = this.ageMonth;
    if (years < 1) { // describe age in months
      if (months === 0) {
        return "a newborn";
      } else if (months === 1) {
        return "one month old";
      } else {
        return `${setup.numWord(months)} months old`;
      }
    } else if (years < 2) { // describe age in 1 year x months
      if (months - 13 === 0) {
        return "one year old";
      } else if (months - 13 === 1) {
        return "one year and one month old";
      } else {
        return `one year and ${setup.numWord(months - 13)} months old`;
      }
    } else { // describe in years
      return `${setup.numWord(years)} years old`;
    }
  }
  public get weight(): string {
    // weights 0 to 24 months by gender
    const boys = [7.4, 9.8, 12.3, 14.1, 15.4, 16.6, 17.5, 18.3, 19.0, 19.6, 20.1, 20.8, 21.3, 21.8, 22.3, 22.7, 23.2, 23.7, 24.1, 24.6, 25.0, 25.5, 25.9, 26.3, 27.5];
    const girls = [7.3, 9.6, 11.7, 13.3, 14.6, 15.8, 16.6, 17.4, 18.1, 18.8, 19.4, 19.9, 20.4, 21.0, 21.5, 22.0, 22.5, 23.0, 23.4, 23.9, 24.4, 24.9, 25.4, 25.9, 26.5];
    const mon = Math.min(24, this.ageMonth); // protect from exceeding array length
    const w = (this.gender === 1) ? boys[mon] : girls[mon];
    if (State.active.variables.AW.metric) {
      const calc = w * 0.453592;
      const ca = Math.floor(calc);
      const cb = Math.floor((w * 4.53592) - (ca * 10));
      return `${ca}.${cb}kg`;
    }
    return `${w} pounds`;
  }
  public get height(): string {
    // heights 0 to 24 months by gender
    const boys = [19.6, 21.6, 23.0, 24.2, 25.2, 26.0, 26.6, 27.2, 27.8, 28.3, 28.8, 29.3, 29.8, 30.3, 30.7, 31.2, 31.6, 32.0, 32.4, 32.8, 33.1, 33.5, 33.9, 34.2, 34.2];
    const girls = [19.4, 21.2, 22.1, 23.6, 24.5, 25.3, 25.9, 26.5, 27.1, 27.6, 28.2, 28.7, 29.2, 29.6, 30.1, 30.6, 30.9, 31.4, 31.8, 32.2, 32.6, 32.9, 33.4, 33.5, 33.7];
    const mon = Math.min(24, this.ageMonth); // protect from exceeding array length
    const h = (this.gender === 1) ? boys[mon] : girls[mon];
    if (State.active.variables.AW.metric) {
      const calc = Math.round(h * 2.54);
      return `${calc}cm`;
    }
    return `${h} inches`;
  }
}
