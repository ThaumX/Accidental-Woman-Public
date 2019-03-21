
//  8888888888     d8888 888    d8P  8888888888
//  888           d88888 888   d8P   888
//  888          d88P888 888  d8P    888
//  8888888     d88P 888 888d88K     8888888
//  888        d88P  888 8888888b    888
//  888       d88P   888 888  Y88b   888
//  888      d8888888888 888   Y88b  888
//  888     d88P     888 888    Y88b 8888888888
//
//
//  888b    888 8888888b.   .d8888b.   .d8888b.
//  8888b   888 888   Y88b d88P  Y88b d88P  Y88b
//  88888b  888 888    888 888    888 Y88b.
//  888Y88b 888 888   d88P 888         "Y888b.
//  888 Y88b888 8888888P"  888            "Y88b.
//  888  Y88888 888        888    888       "888
//  888   Y8888 888        Y88b  d88P Y88b  d88P
//  888    Y888 888         "Y8888P"   "Y8888P"


// NAMESPACE
if (setup.fakeNPC == null) {
  setup.fakeNPC = {} as IntSetupFakeNPC;
  aw.fakeNPC = {};
}

// INTERFACE
interface IntSetupFakeNPC {
  fillTo: (amount?: number) => void;
  convert: (id: string) => string;
  generate: (count: number) => void;
  genRace: (race: number) => [number, number, string];
  genAge: (min: number, max: number) => number;
  genGender: (gen: number) => number;
  genMaleBody: () => IntFakeNPCBodyData;
  genFemaleBody: () => IntFakeNPCBodyData;
}

interface IntFakeNPCBodyData {
  tone: number;
  weight: number;
  ass: number;
  shoulders: number;
  hips: number;
  waist: number;
  tits?: number;
}


/*
{
  npcid = "error",
  gender = random(1, 2) as 1 | 2,
  age = [0, 0],
  name = 0,
  surname = 0,
  nickname = 0,
  portName = 0,
  bday = 0,
  homo = 0,
  race = 0,
  subrace = -1,
  tone = 0,
  weight = 0,
  fert = "rand",
  tits = 0,
  cock = 0,
  pussy = 0,
  beauty = 0,
  edu = "rand",
  wealth = "rand",
  jobber = 0,
  should = 0,
  hip = 0,
  waist = 0,
  face = 0,
}: SemiNPCgenOptions
*/

class FakeNPC {
  public key: string;
  public gender: number;
  public age: number;
  public name: string;
  public surname: string;
  public nickname: string;
  public race: number;
  public subrace: number;
  public tone: number;
  public weight: number;
  public tits?: number;
  public beauty: number;
  public should: number;
  public hip: number;
  public waist: number;
  public face: number;
  public raceWord: string;
  public portrait: string;
  constructor({
    key,
    gender,
    age,
    name,
    surname,
    race,
    subrace,
    tone,
    weight,
    tits,
    beauty,
    should,
    hip,
    waist,
    raceWord,
  }: {
    key: string,
    gender: number,
    age: number,
    name: string,
    surname: string,
    race: number,
    subrace: number,
    tone: number,
    weight: number,
    tits?: number,
    beauty: number,
    should: number,
    hip: number,
    waist: number,
    raceWord: string,
  }) {
    this.key = key;
    this.gender = gender;
    this.portrait = (gender === 1 || gender === 4) ? "IMG-RandoMan" : "IMG-RandoWoman";
    this.age = age as number;
    this.name = name as string;
    this.surname = surname as string;
    this.nickname = "none";
    this.race = race;
    this.subrace = subrace;
    this.tone = tone;
    this.weight = weight;
    if (tits != null) {
      this.tits = tits;
    }
    this.beauty = beauty;
    this.should = should;
    this.hip = hip;
    this.waist = waist;
    this.raceWord = raceWord;
    this.face = 0;
  }
  public get fullName(): string {
    if (this.nickname === "none") {
      return this.name + " " + this.surname;
    } else {
      return this.name + " \"" + this.nickname + "\" " + this.surname;
    }
  }
}

setup.fakeNPC.convert = function(id: string): string {
  const test = /f[0-9]+/;
  if (test.test(id) && aw.fakeNPC[id] != null) {
    // good to go.
    State.active.variables.NPCount += 1;
    const f = aw.fakeNPC[id];
    const nid = State.active.variables.NPCount;
    const opt = {
      npcid : nid,
      gender : f.gender,
      age : f.age,
      name: f.name,
      surname: f.surname,
      race: f.race,
      subrace: f.subrace,
      tone: f.tone,
      weight: f.weight,
      tits: (f.tits == null) ? 0 : f.tits,
      beauty: f.beauty,
      should: f.should,
      hip: f.hip,
      waist : f.waist,
    };
    setup.npcgen.NPC(opt);
    delete aw.fakeNPC[id];
    ↂ.map.NPC.delete(id);
    aw.con.info(`New converted npc id is n${nid}.`);
    return "n" + nid;
  } else {
    aw.con.warn(`Attempted to convert fakeNPC with id ${id}, but id is either invalid or npc doesn't exist.`);
    return "error";
  }
};

setup.fakeNPC.fillTo = function(amount: number = 0): void {
  const cur = Object.keys(aw.fakeNPC).length;
  if (amount === 0) {
    amount = State.active.variables.npcMax * 2;
  }
  if (cur < amount) {
    setup.fakeNPC.generate((amount - cur));
  }
};

setup.fakeNPC.generate = function(count: number): void {
  let gender = 50;
  let age = [0, 0];
  let race = 0;
  if (setup.npcSetting.gender[0]) {
    gender = setup.npcSetting.gender[1];
  }
  if (setup.npcSetting.age[0]) {
    age = setup.npcSetting.age[1];
  }
  if (setup.npcSetting.race[0]) {
    race = -1;
  }
  function genny(): void {
    const npc: {
      key: string,
      gender: number,
      age: number,
      name: string,
      surname: string,
      race: number,
      subrace: number,
      tone: number,
      weight: number,
      tits?: number,
      beauty: number,
      should: number,
      hip: number,
      waist: number,
      raceWord: string,
    } = {
      key: "f",
      gender: 0,
      age: 0,
      name: "",
      surname: "",
      race: 0,
      subrace: 0,
      tone: 0,
      weight: 0,
      beauty: 0,
      should: 0,
      hip: 0,
      waist: 0,
      raceWord: "",
    };
    State.active.variables.NPCfake += 1;
    npc.key += State.active.variables.NPCfake;
    npc.gender = setup.fakeNPC.genGender(gender);
    npc.age = setup.fakeNPC.genAge(age[0], age[1]);
    const racer = setup.fakeNPC.genRace(race);
    npc.race = racer[0];
    npc.subrace = racer[1];
    npc.raceWord = racer[2];
    npc.name = setup.nameRandomizer(npc.gender, npc.raceWord);
    npc.surname = setup.surnameRandomizer(npc.raceWord);
    let body;
    if (npc.gender === 1 || npc.gender === 4) {
      body = setup.fakeNPC.genMaleBody();
    } else {
      body = setup.fakeNPC.genFemaleBody();
      npc.tits = body.tits;
    }
    npc.tone = body.tone;
    npc.weight = body.weight;
    npc.beauty = body.beauty;
    npc.should = body.shoulders;
    npc.hip = body.hips;
    npc.waist = body.waist;
    // generate the new object
    aw.fakeNPC[npc.key] = new FakeNPC(npc);
  }
  for (let i = 0; i < count; i++) {
    genny();
  }
  aw.con.info(`Generated ${count} fake NPCs.`);
};

setup.fakeNPC.genAge = function(min: number = 0, max: number = 0): number {
  let rand;
  let ar;
  let arr;
  let res;
  if (min !== 0 && min === max) {
    return min;
  } else if ((min === 0 && max === 0) || min > max) {
    /*genning kids will require special age constraints*/
    /*this determines an age range and generates between it. This keeps age distribution appropriate for the game*/
    ar = [3, 8, 7, 4, 2, 1];
    arr = [
      [17, 20],
      [20, 25],
      [25, 30],
      [30, 35],
      [35, 40],
      [40, 45],
    ];
    res = arr[randomDist(ar)];
    rand = Math.floor(randomFloat(1) * (res[1] - res[0]) + res[0]);
  } else if (min === -1 && max === -1) {
    rand = Math.floor(randomFloat(38) + 18);
  } else {
    rand = Math.floor(randomFloat(1) * (max - min) + min);
  }
  return rand;
};

setup.fakeNPC.genRace = function(race: number): [number, number, string] {
  let word;
  let ar;
  let subrace;
  if (race === 0) {
    ar = [845, 43, 35, 50, 24, 3];
    race = randomDist(ar) + 1;
  } else if (race === -1) {
    try {
      ar = setup.npcSetting.race[1];
      race = randomDist(ar) + 1;
    } catch (e) {
      console.log("Something went wrong with the race settings.");
      ar = [845, 43, 35, 50, 24, 3];
      race = randomDist(ar) + 1;
    }
  }
  switch (race) {
    case 1:
      ar = [80, 9, 4, 7];
      subrace = randomDist(ar);
      switch (subrace) {
        case 0:
          word = "white";
          break;
        case 1:
          word = "southern European";
          break;
        case 2:
          word = "Gaelic";
          break;
        case 3:
          word = "Nordic";
          break;
      }
      break;
    case 2:
      subrace = 0;
      word = "black";
      break;
    case 3:
      subrace = 0;
      word = "hispanic";
      break;
    case 4:
      ar = [45, 40, 15];
      subrace = randomDist(ar);
      switch (subrace) {
        case 0:
          word = "Asian";
          break;
        case 1:
          word = "south Asian";
          break;
        case 2:
          word = "southeast Asian";
          break;
      }
      break;
    case 5:
      subrace = 0;
      word = "middle eastern";
      break;
    case 6:
      subrace = 0;
      word = "native American";
      break;
  }
  return [race, subrace, word];
};

setup.fakeNPC.genGender = function(gen: number): number {
  let gender;
  let cock = 0;
  if (random(1, 100) > gen) {
    cock++;
  }
  if (random(1, 100) > gen) {
    cock++;
  }
  if (random(1, 100) > gen) {
    cock++;
  }
  if ((Math.floor(randomFloat(10000)) + 1) <= setup.npcSetting.futaRate) {
    if (cock > 2 && setup.npcSetting.futaMale) {
      gender = 4; // male-type futa
    } else {
      gender = 3; // female-type futa
    }
  } else if (cock > 1) {
    /*is male npc*/
    gender = 1;
  } else {
    /*is female NPC*/
    gender = 2;
  }
  return gender;
};

setup.fakeNPC.genMaleBody = function(): IntFakeNPCBodyData {
  let ar;
  const body: {
    tone: number,
    weight: number,
    ass: number,
    shoulders: number,
    hips: number,
    waist: number,
    beauty: number,
  } = {
    tone: 0,
    weight: 0,
    ass: 0,
    shoulders: 0,
    hips: 0,
    waist: 0,
    beauty: 0,
  };
  /*will need to calc rev-bmi, and metric conversion*/
  if (setup.npcSetting.tone[0]) {
    ar = setup.npcSetting.tone[1];
  } else {
    ar = [1, 5, 110, 65, 13, 6];
  }
  body.tone = (randomDist(ar) + 1);
  if (setup.npcSetting.weight[0]) {
    ar = setup.npcSetting.weight[1];
  } else {
    switch (body.tone) {
      case 1:
        ar = [10, 50, 104, 30, 5, 1];
        break;
      case 2:
        ar = [5, 30, 50, 50, 45, 20];
        break;
      case 3:
        ar = [1, 10, 60, 90, 30, 9];
        break;
      case 4:
        ar = [1, 15, 100, 60, 20, 4];
        break;
      case 5:
        ar = [1, 30, 130, 30, 8, 1];
        break;
      case 6:
        ar = [1, 30, 130, 30, 8, 1];
        break;
    }
  }
  body.weight = (randomDist(ar) + 1);
  switch (body.weight) {
    case 1:
      body.ass = (randomDist([170, 25, 5]) + 1);
      break;
    case 2:
      body.ass = (randomDist([100, 75, 20, 5]) + 1);
      break;
    case 3:
      body.ass = (randomDist([50, 100, 45, 5]) + 1);
      break;
    case 4:
      body.ass = (randomDist([30, 110, 55, 5]) + 1);
      break;
    case 5:
      body.ass = (randomDist([20, 80, 70, 20, 10]) + 1);
      break;
    case 6:
      body.ass = (randomDist([10, 60, 80, 30, 15, 5]) + 1);
      break;
  }
  body.shoulders = (randomDist([0, 1, 9, 50, 100, 40]) + 1);
  body.hips = (randomDist([40, 100, 50, 9, 1]) + 1);
  body.waist = randomDist([1, 9]) + 1;
  if (setup.npcSetting.beauty[0]) {
    ar = setup.npcSetting.beauty[1];
  } else {
    /*I'm just pretending truly ugly people don't exist*/
    ar = [10, 25, 45, 15, 5];
  }
  body.beauty = randomDist(ar) + 1;
  return body;
};

setup.fakeNPC.genFemaleBody = function(): IntFakeNPCBodyData {
  let ar;
  const body: {
    tone: number,
    weight: number,
    ass: number,
    shoulders: number,
    hips: number,
    waist: number,
    tits: number,
    beauty: number,
  } = {
    tone: 0,
    weight: 0,
    ass: 0,
    shoulders: 0,
    hips: 0,
    waist: 0,
    tits: 0,
    beauty: 0,
  };
  if (setup.npcSetting.tone[0]) {
    ar = setup.npcSetting.tone[2];
  } else {
    ar = [12, 30, 210, 125, 5, 1];
  }
  body.tone = (randomDist(ar) + 1);
  if (setup.npcSetting.weight[0]) {
    ar = setup.npcSetting.weight[2];
  } else {
    switch (body.tone) {
      case 1:
        ar = [10, 50, 104, 30, 5, 1];
        break;
      case 2:
        ar = [5, 30, 50, 50, 45, 20];
        break;
      case 3:
        ar = [1, 10, 50, 100, 30, 9];
        break;
      case 4:
        ar = [1, 15, 90, 70, 20, 4];
        break;
      case 5:
        ar = [1, 60, 100, 30, 8, 1];
        break;
      case 6:
        ar = [1, 75, 100, 20, 3, 1];
        break;
    }
  }
  body.weight = (randomDist(ar) + 1);
  switch (body.weight) {
    case 1:
      body.ass = (randomDist([150, 35, 10, 5]) + 1);
      break;
    case 2:
      body.ass = (randomDist([90, 75, 25, 10]) + 1);
      break;
    case 3:
      body.ass = (randomDist([10, 60, 100, 25, 5]) + 1);
      break;
    case 4:
      body.ass = (randomDist([5, 25, 85, 60, 20, 5]) + 1);
      break;
    case 5:
      body.ass = (randomDist([1, 10, 50, 90, 40, 9]) + 1);
      break;
    case 6:
      body.ass = (randomDist([0, 3, 35, 75, 60, 27]) + 1);
      break;
  }
  body.shoulders = (randomDist([40, 80, 70, 9, 1, 0]) + 1);
  body.hips = (randomDist([0, 1, 9, 70, 80, 40]) + 1);
  body.waist = randomDist([0, 2, 15, 5]) + 1;
  let temp;
  temp = Math.floor(
    randomDist([1, 8, 24, 64, 256, 512, 762, 1024, 762, 512, 128, 64, 32, 16, 8, 4, 2, 1]) * 1.2) * 100;
  temp += ((Math.floor(randomFloat(11)) - 5) * 10);
  if (setup.npcSetting.tits[0]) {
    temp += setup.npcSetting.tits[1];
  }
  if (temp < 0) {
    temp = 0;
  }
  if (body.weight < 3) {
    temp -= (3 - body.weight) * 100;
  } else if (body.weight > 4) {
    temp += (body.weight - 4) * 175;
  }
  body.tits = temp;
  if (setup.npcSetting.beauty[0]) {
    ar = setup.npcSetting.beauty[2];
  } else {
    ar = [10, 25, 45, 15, 5]; /*I'm just pretending truly ugly people don't exist*/
  }
  body.beauty = randomDist(ar) + 1;
  return body;
};


