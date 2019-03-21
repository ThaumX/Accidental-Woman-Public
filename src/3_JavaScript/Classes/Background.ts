class Background {
  public highSchool: boolean;
  public college: boolean;
  public associate: boolean;
  public bachelor: boolean;
  public master: boolean;
  public doctor: boolean;
  public inSchool: boolean;
  public education: number;
  public homeParents: boolean;
  public wealth: number;
  public cash: number;
  public bank: number;
  public debt: number;
  public home: number;
  public job: string;
  public car: string[];
  public timeApple: number;
  public sister: number;
  public sisterYounger: boolean;
  public brother: number;
  public brotherYounger: boolean;
  public parentDivorced: boolean;
  public stepParent: string;
  public dadDead: boolean;
  public momDead: boolean;
  public married: boolean;
  public exSpouse: number;
  public rShip: boolean;
  public affair: boolean;
  public stories: string[];
  public _k: string;
  constructor(key, {
    highSchool,
    college,
    associate,
    bachelor,
    master,
    doctor,
    inSchool,
    education,
    homeParents,
    wealth,
    cash,
    bank,
    debt,
    home,
    job,
    car,
    timeApple,
    sister,
    sisterYounger,
    brother,
    brotherYounger,
    parentDivorced,
    stepParent,
    dadDead,
    momDead,
    married,
    exSpouse,
    rShip,
    affair,
    stories,
  }: DataBackground) {
    this._k = key;
    this.highSchool = highSchool;
    this.college = college;
    this.associate = associate;
    this.bachelor = bachelor;
    this.master = master;
    this.doctor = doctor;
    this.inSchool = inSchool;
    this.education = education;
    this.homeParents = homeParents;
    this.wealth = wealth;
    this.cash = cash;
    this.bank = bank;
    this.debt = debt;
    this.home = home;
    this.job = job;
    this.car = clone(car);
    this.timeApple = timeApple;
    this.sister = sister;
    this.sisterYounger = sisterYounger;
    this.brother = brother;
    this.brotherYounger = brotherYounger;
    this.parentDivorced = parentDivorced;
    this.stepParent = stepParent;
    this.dadDead = dadDead;
    this.momDead = momDead;
    this.married = married;
    this.exSpouse = exSpouse;
    this.rShip = rShip;
    this.affair = affair;
    this.stories = stories;
  }
  public get highestSchool(): string {
    switch (this.education) {
      case 0:
        return "highschool dropout";
      case 1:
        return "highschool";
      case 2:
        return "college dropout";
      case 3:
        return "associates";
      case 4:
        return "bachelors";
      case 5:
        return "masters";
      case 6:
        return "doctorate";
    }
    return "error";
  }
}