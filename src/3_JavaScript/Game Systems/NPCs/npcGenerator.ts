/*BUILDING UP ZE NPCS*/

interface setupNpcgen {
  NPC: (SemiNPCgenOptions) => void;
  age: (min: number, max: number) => number;
  birthday: (age: number, bday: 0 | date) => date;
  setupMainVars: (gender: number, npc: any) => void;
  racistHitlerFuck: (race: number, subrace: number, npc: any) => void;
  maleBody: (npc: any, tone: number, weight: number, should: number, hip: number, waist: number) => void;
  femaleBody: (npc: any, tone: number, weight: number, should: number, hip: number, waist: number) => void;
  femaleFertility: (npc: any, fert: number | "rand") => void;
  maleFertility: (npc: any, fert: number | "rand") => void;
  futaFertility: any;
  sexCharMale: (npc: any, tits: number, cock: number) => void;
  sexCharFemale: (npc: any, tits: number, pussy: number) => void;
  sexCharFuta: (gender: number, npc: any, tits: number, cock: number, pussy: number) => void;
  maleFace: (npc: any, beauty: number, face: number) => void;
  femaleFace: (npc: any, beauty: number, face: number) => void;
  miscMale: (npc: any) => void;
  miscFemale: (npc: any) => void;
  mutateNPCmale: (npc: any) => void;
  mutateNPCfemale: (npc: any) => void;
  background: (npc: any, gender: number, edu: number | "rand", wealth: number | "rand", jobber: 0 | string) => void;
  npcFlags: (npc: any) => void;
  relationship: (npc: any) => void;
  schedule: (npc: any) => void;
  maleStatus: (npc: any) => void;
  femaleStatus: (npc: any) => void;
  condition: (npc: any) => void;
  malePersonality: (npc: any, homo: number) => void;
  femalePersonality: (npc: any, homo: number) => void;
  traits: (npc: any) => void;
  malePrefs: (npc: any) => void;
  femalePrefs: (npc: any) => void;
  maleOutfits: (npc: any) => void;
  femaleOutfits: (npc: any) => void;
  donSomeClothing: (npc: any) => void;
  femalePortrait: (npc: any, portName: 0 | string) => void;
  malePortrait: (npc: any, portName: 0 | string) => void;
  setLists: (npcid: string) => void;
}


/*creates macro to call code within twee*/
Macro.add("generateNPC", {
  handler() {
    if (this.args.length < 3) {
      return this.error("Missing argument/s supplied to NPC generator function must have at least the first 3 arguments.");
    }
    /*prepare argument variables*/
    const npcnum = this.args[0]; /*number of NPCs to generate*/
    const npcid = State.active.variables.NPCount; /*gets current ID number*/
    const destArry = this.args[1]; /*specifies where to send npcs - numeric*/
    const npctype = this.args[2]; /*specifies type of NPC, gen or partial*/
    let gender = 50;
    let ignoreIt = 0;
    let archetype = [0, 0];
    let wealth = 0;
    let age = [0, 0];
    let homo = 0;
    let race = 0;
    let logd = 0;
    let cunt = 0;
    let report = "NPC generation results: ";
    /*mandatory var cutoff*/
    if (this.args.length > 3) {
      gender = this.args[3];
    } /*specifies gender percent of gen npcs being female 0=all-male 100=all-female*/
    if (this.args.length > 4) {
      ignoreIt = this.args[4];
    } /*whether to ignoreIt player NPC settings 0 or 1*/
    if (this.args.length > 5) {
      archetype = this.args[5];
    } /*whether to force archetype 0=no or number*/
    if (this.args.length > 6) {
      wealth = this.args[6];
    } /*whether to force poor-rich 0=no or 1 to 5*/
    if (this.args.length > 7) {
      age = this.args[7];
    } /*whether to force age group [min,max] or [0,0]=no*/
    if (this.args.length > 8) {
      homo = this.args[8];
    } /*whether to force sexuality 0=no 1=strt 2=bi 3=gay*/
    if (this.args.length > 9) {
      race = this.args[9];
    } /*race 0=off 1=white 2=bl 3=hisp 4=ais 5=arab 6=native*/
    if (this.args.length > 10) {
      logd = this.args[10];
    } /*whether to generate log and alert it*/
    if (npctype === 1) {
      if (this.args.length > 11) {
        const settings = this.args[11];
      } else {
        return this.error("Missing arguments for specific NPC generation, you must complete all arguments");
      }
      if (npcnum > 1) {
        return this.error("more than one special npc requested. only 1 special npc allowed to generate at a time.");
      }
    }
    /*prepare player setting variables*/
    if (ignoreIt !== 1 && npctype !== 1) {
      if (setup.npcSetting.gender[0]) {
        gender = setup.npcSetting.gender[1];
      }
      if (setup.npcSetting.arch[0]) {
        archetype = [-1, -1];
      }
      if (setup.npcSetting.wealth[0]) {
        wealth = setup.npcSetting.wealth[1] + 3;
      }
      if (setup.npcSetting.age[0]) {
        age = setup.npcSetting.age[1];
      }
      if (setup.npcSetting.race[0]) {
        race = -1;
      }
    }

    function determineArchetype(gender) {
      const archOdds = [
        setup.npcSetting.arch[1][0],
        setup.npcSetting.arch[1][1],
        setup.npcSetting.arch[1][2],
        setup.npcSetting.arch[1][3],
        setup.npcSetting.arch[1][4],
        setup.npcSetting.arch[1][5],
        setup.npcSetting.arch[1][6],
        setup.npcSetting.arch[1][7],
      ];
      const archOddsB = [
        setup.npcSetting.arch[2][0],
        setup.npcSetting.arch[2][1],
        setup.npcSetting.arch[2][2],
        setup.npcSetting.arch[2][3],
        setup.npcSetting.arch[2][4],
        setup.npcSetting.arch[2][5],
        setup.npcSetting.arch[2][6],
        setup.npcSetting.arch[2][7],
      ];
      const ret = [randomDist(archOdds), randomDist(archOddsB)];
      return ret;
    }

    function generateRandomAge(min, max) {
      let rand, ar, arr, res;
      if ((min === 0 && max === 0) || min > max || min === max) {
        /*genning kids will require special age constraints*/
        /*this determines an age range and genderates between it. This keeps age distribution appropriate for the game*/
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
    }

    function generateBirthday(age) {
      let day, week, month, year, date;
      day = Math.floor(randomFloat(7) + 1);
      week = Math.floor(randomFloat(4) + 1);
      month = Math.floor(randomFloat(13) + 1);
      date = State.active.variables.date;
      year = date[3] - age;
      if (month > date[2] || (month === date[2] && (week > date[1] || (week === date[1] && day >= date[0])))) {
        year += 1;
      }
      return [day, week, month, year];
    }

    function setupMainVars(gender, npc) {
      if (gender === 1) {
        npc.main.female = false;
        npc.main.male = true;
        npc.main.genes = "XY";
      } else if (gender === 2) {
        npc.main.female = true;
        npc.main.male = false;
        npc.main.genes = "XX";
      } else {
        npc.main.female = true;
        npc.main.male = true;
        npc.main.genes = "XXY";
      }
      npc.main.seen = false;
      npc.main.interact = false;
      npc.main.relation = false;
      npc.main.suicide = false;
      npc.main.lifetime = 0;
      npc.main.count = 28;
      npc.main.tags = ["none"];
    }

    function racistHitlerFuck(race, npc) {
      let rand, ar, arr, res, subrace;
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
      const eyecolors = [
        "brown",
        "hazel",
        "blue",
        "light blue",
        "blue-green",
        "green",
        "golden-brown",
      ];
      const skincolors = [
        "pale", "fair",
        "tanned",
        "bronzed",
        "light",
        "dusky",
        "dark",
        "light brown",
        "brown",
        "dark brown",
        "midnight",
      ];
      /*note that any non-natural died colors will depend on personality*/
      const haircolors = [
        "light brown",
        "brown",
        "brunette",
        "black",
        "platinum blonde",
        "blonde",
        "sandy blonde",
        "dark blonde",
        "strawberry blonde",
        "light auburn",
        "auburn",
        "Copper",
        "ginger",
      ];
      // pretty much only colors will be affected by race,
      // otherwise it's hard to avoid looking racist even if using medical data
      switch (race) {
      case 1:
        ar = [80, 9, 4, 7];
        subrace = randomDist(ar);
        switch (subrace) {
        case 0:
          /*white*/
          npc.body.race = "white";
          ar = [2, 5, 7, 1]; /*ignoring later tones*/
          npc.body.skinColor = skincolors[randomDist(ar)];
          ar = [2, 4, 8, 4, 3, 2, 0];
          npc.body.eyeColor = eyecolors[randomDist(ar)];
          ar = [20, 14, 6, 0, 1, 5, 9, 5, 6, 5, 2, 1];
          npc.body.hairColor = haircolors[randomDist(ar)];
          npc.body.hairCurl = either(0, 0, 1, 1, 1, 2, 2, 3, 4);
          break;
        case 1:
          npc.body.race = "southern European";
          ar = [0, 1, 5, 10]; /*ignoring later tones*/
          npc.body.skinColor = skincolors[randomDist(ar)];
          ar = [8, 6, 1, 0, 0, 0, 2];
          npc.body.eyeColor = eyecolors[randomDist(ar)];
          ar = [6, 16, 22, 4, 0, 0, 0, 0, 1, 2, 0, 0];
          npc.body.hairColor = haircolors[randomDist(ar)];
          npc.body.hairCurl = either(0, 1, 1, 2, 2, 2, 3, 3, 4, 5);
          break;
        case 2:
          npc.body.race = "Gaelic";
          ar = [7, 5, 1]; /*ignoring later tones*/
          npc.body.skinColor = skincolors[randomDist(ar)];
          ar = [0, 0, 2, 1, 4, 8];
          npc.body.eyeColor = eyecolors[randomDist(ar)];
          ar = [6, 8, 0, 0, 0, 0, 1, 2, 3, 8, 10, 8, 4]; /*SON ATTACK!*/
          npc.body.hairColor = haircolors[randomDist(ar)];
          npc.body.hairCurl = either(0, 1, 1, 2, 2, 2, 3, 3, 4, 5);
          break;
        case 3:
          npc.body.race = "Nordic";
          ar = [3, 9, 5]; /*ignoring later tones*/
          npc.body.skinColor = skincolors[randomDist(ar)];
          ar = [0, 0, 6, 8, 4, 1];
          npc.body.eyeColor = eyecolors[randomDist(ar)];
          ar = [2, 1, 0, 0, 5, 12, 7, 4, 3, 5, 2, 1, 0];
          npc.body.hairColor = haircolors[randomDist(ar)];
          npc.body.hairCurl = either(0, 0, 1, 1, 1, 2, 2, 3, 4);
          break;
        }
        break;
      case 2:
        npc.body.race = "black";
        ar = [2, 6, 6, 1];
        npc.body.skinColor = skincolors[(randomDist(ar) + 6)];
        ar = [8, 2, 0, 0, 0, 0, 1];
        npc.body.eyeColor = eyecolors[randomDist(ar)];
        ar = [1, 2, 12, 20]; /*SON ATTACK!*/
        npc.body.hairColor = haircolors[randomDist(ar)];
        npc.body.hairCurl = either(5, 6, 6, 6, 6);
        break;
      case 3:
        npc.body.race = "hispanic";
        ar = [1, 15, 0, 2, 0, 3];
        npc.body.skinColor = skincolors[(randomDist(ar) + 2)];
        ar = [12, 8, 1, 0, 0, 0, 3];
        npc.body.eyeColor = eyecolors[randomDist(ar)];
        ar = [4, 8, 20, 8];
        npc.body.hairColor = haircolors[randomDist(ar)];
        npc.body.hairCurl = either(0, 1, 1, 2, 2, 2, 3, 4, 5);
        break;
      case 4:
        ar = [45, 40, 15];
        subrace = randomDist(ar);
        switch (subrace) {
        case 0:
          npc.body.race = "Asian";
          ar = [14, 6, 6];
          npc.body.skinColor = skincolors[(randomDist(ar) + 4)];
          ar = [8, 12];
          npc.body.eyeColor = eyecolors[randomDist(ar)];
          ar = [1, 2, 10, 10];
          npc.body.hairColor = haircolors[randomDist(ar)];
          npc.body.hairCurl = either(0, 0, 0, 1);
          break;
        case 1:
          npc.body.race = "south Asian";
          ar = [2, 5, 10];
          npc.body.skinColor = skincolors[(randomDist(ar) + 4)];
          ar = [3, 1];
          npc.body.eyeColor = eyecolors[randomDist(ar)];
          ar = [0, 0, 6, 12];
          npc.body.hairColor = haircolors[randomDist(ar)];
          npc.body.hairCurl = either(0, 0, 1, 1, 2, 2, 3, 4);
          break;
        case 2:
          npc.body.race = "southeast Asian";
          ar = [2, 1, 10];
          npc.body.skinColor = skincolors[(randomDist(ar) + 4)];
          ar = [5, 1];
          npc.body.eyeColor = eyecolors[randomDist(ar)];
          ar = [0, 1, 6, 10];
          npc.body.hairColor = haircolors[randomDist(ar)];
          npc.body.hairCurl = either(0, 0, 0, 1, 1, 2);
          break;
        }
        break;
      case 5:
        npc.body.race = "middle eastern";
        ar = [5, 0, 8, 0, 8];
        npc.body.skinColor = skincolors[(randomDist(ar) + 3)];
        ar = [4, 10, 1, 0, 0, 0, 6];
        npc.body.eyeColor = eyecolors[randomDist(ar)];
        ar = [1, 2, 6, 15];
        npc.body.hairColor = haircolors[randomDist(ar)];
        npc.body.hairCurl = either(1, 2, 2, 3, 3, 3, 4, 4, 5);
        break;
      case 6:
        npc.body.race = "native American";
        ar = [1, 10, 0, 5, 0, 3];
        npc.body.skinColor = skincolors[(randomDist(ar) + 2)];
        ar = [12, 8, 1, 0, 0, 0, 3];
        npc.body.eyeColor = eyecolors[randomDist(ar)];
        ar = [0, 1, 4, 10];
        npc.body.hairColor = haircolors[randomDist(ar)];
        npc.body.hairCurl = either(0, 0, 0, 1, 1, 2);
        break;
      }
      switch (npc.body.hairColor) {
      case "light brown":
        npc.body.pubeColor = "brown";
        break;
      case "brown":
        npc.body.pubeColor = "dark brown";
        break;
      case "brunette":
        npc.body.pubeColor = "black";
        break;
      case "black":
        npc.body.pubeColor = "black";
        break;
      case "platinum blonde":
        npc.body.pubeColor = "blonde";
        break;
      case "blonde":
        npc.body.pubeColor = "dark blonde";
        break;
      case "sandy blonde":
        npc.body.pubeColor = "dark blonde";
        break;
      case "dark blonde":
        npc.body.pubeColor = "light brown";
        break;
      case "strawberry blonde":
        npc.body.pubeColor = "light brown";
        break;
      case "light auburn":
        npc.body.pubeColor = "auburn";
        break;
      case "auburn":
        npc.body.pubeColor = "dark brown";
        break;
      case "Copper":
        npc.body.pubeColor = "auburn";
        break;
      case "ginger":
        npc.body.pubeColor = "copper";
        break;
      }
      npc.body.makeup = {};
    }

    function genRandMaleBody(npc) {
      let rand;
      let ar;
      let arr;
      let res;
      /*time for more sex-related npc.body vars*/
      if (setup.npcSetting.height[0]) {
        ar = setup.npcSetting.height[1];
      } else {
        ar = [5, 20, 50, 20, 5];
      }
      arr = [
        [62, 4],
        [66, 3],
        [69, 3],
        [72, 3],
        [75, 4],
      ];
      res = arr[randomDist(ar)];
      rand = Math.floor(randomFloat(1) * res[1]);
      npc.body.height = res[0] + rand;
      /*will need to calc rev-bmi, and metric conversion*/
      if (setup.npcSetting.tone[0]) {
        ar = setup.npcSetting.tone[1];
      } else {
        ar = [1, 5, 110, 65, 13, 6];
      }
      npc.body.tone = (randomDist(ar) + 1);
      if (setup.npcSetting.weight[0]) {
        ar = setup.npcSetting.weight[1];
      } else {
        switch (npc.body.tone) {
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
      npc.body.weight = (randomDist(ar) + 1);
      switch (npc.body.weight) {
      case 1:
        npc.body.ass = (randomDist([170, 25, 5]) + 1);
        break;
      case 2:
        npc.body.ass = (randomDist([100, 75, 20, 5]) + 1);
        break;
      case 3:
        npc.body.ass = (randomDist([50, 100, 45, 5]) + 1);
        break;
      case 4:
        npc.body.ass = (randomDist([30, 110, 55, 5]) + 1);
        break;
      case 5:
        npc.body.ass = (randomDist([20, 80, 70, 20, 10]) + 1);
        break;
      case 6:
        npc.body.ass = (randomDist([10, 60, 80, 30, 15, 5]) + 1);
        break;
      }
      npc.body.shoulders = (randomDist([0, 1, 9, 50, 100, 40]) + 1);
      npc.body.hips = (randomDist([40, 100, 50, 9, 1]) + 1);
      npc.body.waist = randomDist([1, 9]) + 1;
      npc.body.pubes = either(
        "bushy",
        "trimmed",
        "neatly-trimmed",
        "bikinitrim",
        "bikiniline",
        "stubble",
        "garden",
        "heart",
        "neat patch",
        "mohawk",
        "landing-strip",
        "brazilian",
        "triangular",
        "martini",
        "stamp",
        "shaved",
        "hairless",
      );
      npc.body.hairdye = "none";
    }

    function genRandFemaleBody(npc) {
      let rand;
      let ar;
      let arr;
      let res;
      /*time for more sex-related npc.body vars*/
      if (setup.npcSetting.height[0]) {
        ar = setup.npcSetting.height[2];
      } else {
        ar = [5, 20, 50, 20, 5];
      }
      arr = [
        [58, 3],
        [61, 2],
        [63, 4],
        [67, 2],
        [69, 4],
      ];
      res = arr[randomDist(ar)];
      rand = Math.floor(randomFloat(1) * res[1]);
      npc.body.height = res[0] + rand;
      /*will need to calc rev-bmi, and metric conversion*/
      if (setup.npcSetting.tone[0]) {
        ar = setup.npcSetting.tone[2];
      } else {
        ar = [12, 30, 210, 125, 5, 1];
      }
      npc.body.tone = (randomDist(ar) + 1);
      if (setup.npcSetting.weight[0]) {
        ar = setup.npcSetting.weight[2];
      } else {
        switch (npc.body.tone) {
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
      npc.body.weight = (randomDist(ar) + 1);
      switch (npc.body.weight) {
      case 1:
        npc.body.ass = (randomDist([150, 35, 10, 5]) + 1);
        break;
      case 2:
        npc.body.ass = (randomDist([90, 75, 25, 10]) + 1);
        break;
      case 3:
        npc.body.ass = (randomDist([10, 60, 100, 25, 5]) + 1);
        break;
      case 4:
        npc.body.ass = (randomDist([5, 25, 85, 60, 20, 5]) + 1);
        break;
      case 5:
        npc.body.ass = (randomDist([1, 10, 50, 90, 40, 9]) + 1);
        break;
      case 6:
        npc.body.ass = (randomDist([0, 3, 35, 75, 60, 27]) + 1);
        break;
      }
      npc.body.shoulders = (randomDist([40, 80, 70, 9, 1, 0]) + 1);
      npc.body.hips = (randomDist([0, 1, 9, 70, 80, 40]) + 1);
      npc.body.waist = randomDist([0, 2, 15, 5]) + 1;
      npc.body.pubes = either(
        "bushy",
        "trimmed",
        "neatly-trimmed",
        "bikinitrim",
        "bikiniline",
        "stubble",
        "garden",
        "heart",
        "neat patch",
        "mohawk",
        "landing-strip",
        "brazilian",
        "triangular",
        "martini",
        "stamp",
        "shaved",
        "hairless",
      );
      npc.body.hairdye = "none";
    }

    function randomFemaleFertility(npc) {
      /*use some fun player settings for overall npc.fertility*/
      /*template settings are more specific, will code them later*/
      let ar;
      let arr;
      let res;
      let mod = 0;
      if (setup.npcSetting.fertility[0]) {
        mod = setup.npcSetting.fertility[2]; /*female mod*/
        mod *= 2;
      }
      /*start barren as false, trip to true for age*/
      npc.fert.barren = false;
      /*change mod based on age*/
      const t = Math.floor(npc.main.age / 5);
      switch (t) {
      case 0:
        /*0 to 5 yrs*/
        UI.alert("WTF Pedo!");
        mod -= 100;
        break;
      case 1:
        /*5 to 10yrs*/
        mod -= 100;
        break;
      case 2:
        /*10 to 15yrs*/
        mod -= 2;
        break;
      case 3:
        mod += 4;
        break;
      case 4:
        /*20 to 25*/
        mod += 6;
        break;
      case 5:
        mod += 4;
        break;
      case 6:
        /*30 to 35*/
        mod += 1;
        break;
      case 7:
        mod -= 3;
        break;
      case 8:
        /*40 to 45*/
        mod -= 6;
        break;
      case 9:
        mod -= 8;
        break;
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
        mod -= 15;
        npc.fert.barren = true;
        break;
      }
      /*set the npc.main female npc.fertility variables.*/
      /*to align good-bad, higher value is better*/
      npc.fert.egg = randomDist([0, 2, 8, 32, 128, 32, 8, 2]) + 6 + mod; /*base odds of ovulating 1=5%*/
      if (npc.mutate.Cycle) {
        npc.fert.egg = 2 + random(1, 5);
      }
      if (npc.fert.egg < 0) {
        npc.fert.egg = 0;
      } else if (npc.fert.egg > 25) {
        npc.fert.egg = 25;
      }
      npc.fert.implant = randomDist([0, 2, 4, 8, 16, 32, 300, 512, 300, 32, 16, 8, 4, 2]) +
        Math.round(mod / 2); /*modifier to implantation odds.*/
      if (npc.mutate.Period) {
        npc.fert.implant -= 3;
      } else if (npc.mutate.TwinWomb) {
        npc.fert.implant += 2;
      }
      if (npc.fert.implant < 0) {
        npc.fert.implant = 0;
      }
      npc.fert.vagHostility = randomDist(
        [0, 1, 2, 4, 8, 16, 32, 64, 180, 400, 512, 400, 180, 64, 32, 16, 8, 4, 2, 1]) + 2 + mod;
      if (npc.fert.vagHostility < 0) {
        npc.fert.vagHostility = 0;
      } else if (npc.fert.vagHostility > 20) {
        npc.fert.vagHostility = 20;
      }
      npc.fert.cycle = randomDist(
        [1, 2, 4, 16, 64, 256, 300, 256, 64, 16, 4, 2, 1]) + 22 + (mod * -1); /*length of cycle*/
      if (npc.fert.cycle > 28) {npc.fert.cycle = 28; }
      if (npc.fert.cycle < 23) {npc.fert.cycle = 23; }
      npc.fert.cycStart = [random(1, 7), random(1, 4)];
      npc.fert.ovuMod = randomDist([2, 3, 3, 4, 3, 3, 2]) - 4;
      npc.fert.period = randomDist([0, 1, 8, 16, 32, 16, 8, 1]); /*length of period*/
      if (npc.mutate.Period) {
        npc.fert.period = 0;
      }
      npc.fert.multEgg = randomDist(
        [0, 1, 2, 4, 8, 32, 128, 512, 800, 512, 128, 32, 8, 4, 2, 1]) + 3 + mod; /*chance of twins in 0.3% increments*/
      if (npc.mutate.Multiple) {
        npc.fert.multEgg += 20;
      }
      if (npc.fert.multEgg < 1) {
        npc.fert.multEgg = 1;
      }
      npc.fert.wombHealth = randomDist(
        [1024, 32, 16, 8, 4, 2]); // damage to womb that hurts odds of implantation and increases odds of miscarriage
      arr = [false, true];
      if (npc.main.age >= 40) {
        ar = [75, 25];
      } else if (npc.main.age >= 30) {
        ar = [85, 15];
      } else if (npc.main.age >= 18) {
        ar = [95, 5];
      } else {
        ar = [100, 0];
      }
      npc.fert.iud = arr[randomDist(ar)];
      npc.fert.pregTerm = randomDist([2, 4, 6, 8, 16, 24, 12, 4]) + 33;
      if (setup.npcSetting.pregTerm[0]) {
        if (setup.npcSetting.pregTerm[1] === -2) {
          npc.fert.pregTerm = 44;
        } else {
          let temp = setup.npcSetting.pregTerm[1];
          temp += 2;
          npc.fert.pregTerm -= temp * 6;
        }
      }
      if (npc.mutate.Gestate) {
        npc.fert.pregTerm = 12;
      }
      let spo = Math.round(
        (Math.round(npc.fert.egg / 2) + npc.fert.implant +
        Math.round(npc.fert.vagHostility / 2) + Math.round(npc.fert.multEgg / 2) -
        npc.fert.wombHealth) / 5) - 3;
      if (spo === 1) {
        spo = 2;
      } else if (spo < 1 && spo > -2) {
        spo = 1;
      } else if (spo < -1) {
        spo = 0;
      } else if (spo > 8) {
        spo = 8;
      }
      npc.fert.fertility = spo;
      npc.fert.flagF = ["none"];
      /*male npc.fertility variables -1 because this is FEMALE*/
      npc.fert.quality = -1;
      npc.fert.ejac = -1;
      npc.fert.resMax = -1;
      npc.fert.reserve = -1;
      npc.fert.refact = -1;
      npc.fert.quantity = -1;
      npc.fert.surv = -1;
      /*CALCULATE "npc.fertility" SCORE for generic description*/
      npc.fert.flagM = ["female"];
      /* note:
      npc.fertility effects such as low health are not part of base variables,
      but determined during proc of npc.fertility system */
    }

    function randomMaleFertility(npc) {
      let ar;
      let arr;
      let res;
      /*must determine npc.fertility before setting some genital vars*/
      /*use some fun player settings for overall npc.fertility*/
      /*template settings are more specific, will code them later*/
      let mod = 0;
      if (setup.npcSetting.fertility[0]) {
        mod = setup.npcSetting.fertility[2]; /*male mod*/
        mod *= 2;
      }
      if (npc.mutate.Virile) {
        mod += 4;
      }
      /*change mod based on age*/
      const t = Math.floor(npc.main.age / 5);
      switch (t) {
      case 0:
        /*0 to 5 yrs*/
        UI.alert("WTF Pedo!");
        mod -= 100;
        break;
      case 1:
        /*5 to 10yrs*/
        mod -= 10;
        break;
      case 2:
        /*10 to 15yrs*/
        mod += 0;
        break;
      case 3:
        mod += 1;
        break;
      case 4:
        /*20 to 25*/
        mod += 2;
        break;
      case 5:
        mod += 1;
        break;
      case 6:
        /*30 to 35*/
        mod -= 0;
        break;
      case 7:
        mod -= 1;
        break;
      case 8:
        /*40 to 45*/
        mod -= 3;
        break;
      case 9:
        mod -= 4;
        break;
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        mod -= 5;
        break;
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
        mod -= 8;
        break;
      }
      /*
      get female vars out of the way.
      Because hermies, we don't want to leave this section blank.
      also allows using unisex functions
      */
      npc.fert.egg = -1;
      npc.fert.implant = -1;
      npc.fert.vagHostility = -1;
      npc.fert.cycle = -1;
      npc.fert.period = -1;
      npc.fert.multEgg = -1;
      npc.fert.wombHealth = -1;
      npc.fert.barren = true;
      npc.fert.iud = false;
      npc.fert.pregTerm = -1;
      npc.fert.flagF = ["male"];
      /*male npc.fertility variables*/
      npc.fert.quality = randomDist([1, 8, 16, 32, 64, 128, 64, 32, 16, 8, 1]) + mod;
      if (npc.fert.quality > 10) {
        npc.fert.quality = 10;
      } else if (npc.fert.quality < 0) {
        npc.fert.quality = 0;
      }
      npc.fert.ejac = (randomDist([1, 2, 4, 32, 64, 64, 64, 32, 16, 8, 4, 2, 1]) + mod) * 2; /*1=0.5ml*/
      if (npc.mutate.MegaNuts) {
        npc.fert.ejac += 6;
      }
      if (npc.mutate.Multgasm) {
        npc.fert.ejac -= 4;
      }
      if (npc.mutate.PowerEjac) {
        npc.fert.ejac += 10;
      }
      if (npc.fert.ejac < 0) { // seminal fluid amount in ejaculation. 0 = dry orgasms :( 
        npc.fert.ejac = 0;
      }

      /*reserve is viable ejaculate that can be emitted before seminal fluid contains very little sperm*/
      npc.fert.resMax = (
        randomDist([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 400, 200, 100, 50, 25, 12, 6, 3, 1]) +
        (mod * 2)) * 2 + npc.fert.ejac;
      if (npc.mutate.MegaNuts) {
        npc.fert.resMax += 6;
      }
      if (npc.fert.resMax < (npc.fert.ejac * 1.5)) {
        npc.fert.resMax = Math.floor(npc.fert.ejac * 1.5);
      }
      npc.fert.reserve = npc.fert.resMax;
      /*how much sperm added to reserve per hour in 0.1ml increments*/
      npc.fert.refact = (randomDist([1, 4, 16, 64, 128, 64, 16, 4, 1]) + 1) + mod;
      if (npc.mutate.NoRefract) {
        npc.fert.refact += 20;
      }
      if (npc.mutate.MegaNuts) {
        npc.fert.refact += 20;
      }
      if (npc.fert.refact < 1) {
        npc.fert.refact = 1;
      }
      /*quantity is sperm in millions per ml of semen*/
      npc.fert.quantity = randomDist([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]) + mod;
      if (npc.fert.quantity < 0) {
        npc.fert.quantity = 0;
      }

      /*
      how good sperm are at surviving in the female reproductive tract,
      modifies base scientific average number but stays within standard range of results
      */
      npc.fert.surv = randomDist([1, 8, 32, 8, 1]) + 1 + Math.round(mod / 3);
      if (npc.fert.surv < 1) {
        npc.fert.surv = 1;
      } else if (npc.fert.surv > 5) {
        npc.fert.surv = 5;
      }

      /*CALCULATE "npc.fertility" SCORE for generic description*/
      const spo = Math.round(((npc.fert.quality * 2) + (2 * Math.round((npc.fert.quantity / 2) *
        ((npc.fert.ejac / 2) / 10))) + Math.round((npc.fert.refact / 2) + npc.fert.surv)) / 5) - 3;
        /*determines npc.fertility by averaging weighted npc.fertility values around a 5=avg scale*/
      if (spo <= 0 || npc.fert.quality === 0 || npc.fert.ejac === 0 || npc.fert.quantity === 0) {
        npc.fert.fertility = 0;
      } else if (spo < 3) {
        npc.fert.fertility = 1;
      } else if (spo < 5) {
        npc.fert.fertility = 2;
      } else if (spo < 10) {
        npc.fert.fertility = spo - 2;
      } else {
        npc.fert.fertility = 8;
      } /*adjusts to game scale*/
      npc.fert.flagM = ["none"];
      /*note:
      npc.fertility effects such as low health are not part of base variables,
      but determined during proc of npc.fertility system*/
    }

    function randomFutaFertility(gender, npc) {
      /*sets opposing npc.fertility*/
      let ar;
      let arr;
      let res;
      let spo;
      let mod = 0;
      if (setup.npcSetting.fertility[0]) {
        mod = setup.npcSetting.fertility[2]; /*female mod*/
        mod *= 2;
      }
      /*start barren as false, trip to true for age*/
      npc.fert.barren = false;
      /*change mod based on age*/
      const t = Math.floor(npc.main.age / 5);
      switch (t) {
        case 0:
          /*0 to 5 yrs*/
          UI.alert("WTF Pedo!");
          mod -= 100;
          break;
        case 1:
          /*5 to 10yrs*/
          mod -= 100;
          break;
        case 2:
          /*10 to 15yrs*/
          mod -= 2;
          break;
        case 3:
          mod += 4;
          break;
        case 4:
          /*20 to 25*/
          mod += 6;
          break;
        case 5:
          mod += 4;
          break;
        case 6:
          /*30 to 35*/
          mod += 1;
          break;
        case 7:
          mod -= 3;
          break;
        case 8:
          /*40 to 45*/
          mod -= 6;
          break;
        case 9:
          mod -= 8;
          break;
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
          mod -= 15;
          npc.fert.barren = true;
          break;
      }
      /*set the npc.main female npc.fertility variables.*/
      /*to align good-bad, higher value is better*/
      npc.fert.egg = randomDist([0, 2, 8, 32, 128, 32, 8, 2]) + 6 + mod; /*base odds of ovulating 1=5%*/
      if (npc.mutate.Cycle) {
        npc.fert.egg = 2 + random(1, 5);
      }
      if (npc.fert.egg < 0) {
        npc.fert.egg = 0;
      } else if (npc.fert.egg > 25) {
        npc.fert.egg = 25;
      }
      /*modifier to implantation odds.*/
      npc.fert.implant = randomDist([0, 2, 4, 8, 16, 32, 300, 512, 300, 32, 16, 8, 4, 2]) + Math.round(mod / 2);
      if (npc.mutate.Period) {
        npc.fert.implant -= 3;
      } else if (npc.mutate.TwinWomb) {
        npc.fert.implant += 2;
      }
      if (npc.fert.implant < 0) {
        npc.fert.implant = 0;
      }
      npc.fert.vagHostility = randomDist([0, 1, 2, 4, 8, 16, 32, 64, 180, 400, 512, 400, 180, 64, 32, 16, 8, 4, 2, 1]) +
        2 + mod;
      if (npc.fert.vagHostility < 0) {
        npc.fert.vagHostility = 0;
      } else if (npc.fert.vagHostility > 20) {
        npc.fert.vagHostility = 20;
      }
      /*length of cycle*/
      npc.fert.cycle = randomDist([1, 2, 4, 16, 64, 256, 300, 256, 64, 16, 4, 2, 1]) + 22 + (mod * -1);
      if (npc.fert.cycle > 28) { npc.fert.cycle = 28; }
      if (npc.fert.cycle < 23) { npc.fert.cycle = 23; }
      npc.fert.cycStart = [random(1, 7), random(1, 4)];
      npc.fert.ovuMod = randomDist([2, 3, 3, 4, 3, 3, 2]) - 4;
      npc.fert.period = randomDist([0, 1, 8, 16, 32, 16, 8, 1]); /*length of period*/
      if (npc.mutate.Period) {
        npc.fert.period = 0;
      }
      /*chance of twins in 0.3% increments*/
      npc.fert.multEgg = randomDist([0, 1, 2, 4, 8, 32, 128, 512, 800, 512, 128, 32, 8, 4, 2, 1]) + 3 + mod;
      if (npc.mutate.Multiple) {
        npc.fert.multEgg += 20;
      }
      if (npc.fert.multEgg < 1) {
        npc.fert.multEgg = 1;
      }
      /*
      damage to womb that hurts odds of implantation and increases odds of miscarriage
      */
      npc.fert.wombHealth = randomDist([1024, 32, 16, 8, 4, 2]);
      arr = [false, true];
      if (npc.main.age >= 40) {
        ar = [75, 25];
      } else if (npc.main.age >= 30) {
        ar = [85, 15];
      } else if (npc.main.age >= 18) {
        ar = [95, 5];
      } else {
        ar = [100, 0];
      }
      npc.fert.iud = arr[randomDist(ar)];
      npc.fert.pregTerm = randomDist([2, 4, 6, 8, 16, 24, 12, 4]) + 33;
      if (setup.npcSetting.pregTerm[0]) {
        if (setup.npcSetting.pregTerm[1] === -2) {
          npc.fert.pregTerm = 44;
        } else {
          let temp = setup.npcSetting.pregTerm[1];
          temp += 2;
          npc.fert.pregTerm -= temp * 6;
        }
      }
      if (npc.mutate.Gestate) {
        npc.fert.pregTerm = 12;
      }
      spo = Math.round((Math.round(npc.fert.egg / 2) + npc.fert.implant +
        Math.round(npc.fert.vagHostility / 2) + Math.round(npc.fert.multEgg / 2) - npc.fert.wombHealth) / 5) - 3;
      if (spo === 1) {
        spo = 2;
      } else if (spo < 1 && spo > -2) {
        spo = 1;
      } else if (spo < -1) {
        spo = 0;
      } else if (spo > 8) {
        spo = 8;
      }
      npc.fert.fertility = spo;
      npc.fert.flagF = ["none"];
      /*male npc.fertility variables*/
      npc.fert.quality = randomDist([1, 8, 16, 32, 64, 128, 64, 32, 16, 8, 1]) + mod;
      if (npc.fert.quality > 10) {
        npc.fert.quality = 10;
      } else if (npc.fert.quality < 0) {
        npc.fert.quality = 0;
      }
      npc.fert.ejac = (randomDist([1, 2, 4, 32, 64, 64, 64, 32, 16, 8, 4, 2, 1]) + mod) * 2; /*1=0.5ml*/
      if (npc.mutate.MegaNuts) {
        npc.fert.ejac += 6;
      }
      if (npc.mutate.Multgasm) {
        npc.fert.ejac -= 4;
      }
      if (npc.mutate.PowerEjac) {
        npc.fert.ejac += 10;
      }
      if (npc.fert.ejac < 0) { /*seminal fluid amount in ejaculation. 0 = dry orgasms :( */
        npc.fert.ejac = 0;
      }
      /*reserve is viable ejaculate that can be emitted before seminal fluid contains very little sperm*/
      npc.fert.resMax = (randomDist([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 400, 200, 100, 50, 25, 12, 6, 3, 1]) +
        (mod * 2)) * 2 + npc.fert.ejac;
      if (npc.mutate.MegaNuts) {
        npc.fert.resMax += 6;
      }
      if (npc.fert.resMax < (npc.fert.ejac * 1.5)) {
        npc.fert.resMax = Math.floor(npc.fert.ejac * 1.5);
      }
      npc.fert.reserve = npc.fert.resMax;
      /*how much sperm added to reserve per hour in 0.1ml increments*/
      npc.fert.refact = (randomDist([1, 4, 16, 64, 128, 64, 16, 4, 1]) + 1) + mod;
      if (npc.mutate.NoRefract) {
        npc.fert.refact += 20;
      }
      if (npc.mutate.MegaNuts) {
        npc.fert.refact += 20;
      }
      if (npc.fert.refact < 1) {
        npc.fert.refact = 1;
      }
      /*quantity is sperm in millions per ml of semen*/
      npc.fert.quantity = randomDist([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]) + mod;
      if (npc.fert.quantity < 0) {
        npc.fert.quantity = 0;
      }
      /*
      how good sperm are at surviving in the female reproductive tract,
      modifies base scientific average number but stays within standard range of results
      */
      npc.fert.surv = randomDist([1, 8, 32, 8, 1]) + 1 + Math.round(mod / 3);
      if (npc.fert.surv < 1) {
        npc.fert.surv = 1;
      } else if (npc.fert.surv > 5) {
        npc.fert.surv = 5;
      }

      /*CALCULATE "npc.fertility" SCORE for generic description*/
      /*determines npc.fertility by averaging weighted npc.fertility values around a 5=avg scale*/
      spo = Math.round(((npc.fert.quality * 2) + (2 * Math.round((npc.fert.quantity / 2) *
        ((npc.fert.ejac / 2) / 10))) + Math.round((npc.fert.refact / 2) + npc.fert.surv)) / 5) - 3;
      if (spo <= 0 || npc.fert.quality === 0 || npc.fert.ejac === 0 || npc.fert.quantity === 0) {
        npc.fert.fertility = 0;
      } else if (spo < 3) {
        npc.fert.fertility = 1;
      } else if (spo < 5) {
        npc.fert.fertility = 2;
      } else if (spo < 10) {
        npc.fert.fertility = spo - 2;
      } else {
        npc.fert.fertility = 8;
      } /*adjusts to game scale*/
      npc.fert.flagM = ["none"];
    }

    function sexualCharacterMale(npc) {
      let mod;
      let ar;
      let arr;
      let res;
      let t;
      /*NOW ONTO THE GOODS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      /*male doesn't have pussy, herm calced seperately*/
      npc.body.tits = {};
      npc.body.tits.size = 0;
      npc.body.tits.shape = "flat";
      npc.body.tits.nipple = "normal";
      npc.body.tits.band = (npc.body.shoulders + npc.body.weight) * 2 + 30;
      npc.body.tits.cupNum = 0;
      npc.body.tits.cupRaw = 0;
      npc.body.tits.cup = "none";
      npc.body.tits.bra = npc.body.tits.band + "AAA";
      npc.body.tits.lact = {on: false, max: 0, size: 0, cupNum: 0, cup: "none", bra: (npc.body.tits.band + "AAA")};
      npc.body.lactation = 0;
      npc.body.lactCapacity = 0;
      npc.body.pussy = {};
      npc.body.pussy.tight = 0;
      npc.body.pussy.virgin = true;
      npc.body.pussy.stretch = 0;
      npc.body.pussy.wetness = 0;
      npc.body.pussy.time = 0;
      npc.body.pussy.tags = ["none"];
      npc.body.clit = 0;
      npc.body.labia = 0;
      /*Note if the gay, will adjust later, also some personality effects*/
      npc.body.asshole = {};
      npc.body.asshole.tight = 0;
      arr = [true, false];
      npc.body.asshole.virgin = arr[randomDist([3, 1])];
      npc.body.asshole.stretch = 0;
      npc.body.asshole.wetness = 0;
      npc.body.asshole.time = 0;
      npc.body.asshole.tags = ["none"];
      /*cock mostly just random - check for player settings*/
      mod = 0;
      if (setup.npcSetting.cock[0]) {
        mod = setup.npcSetting.cock[1];
        if (mod > -2) {
          mod += 2;
        } else {
          mod = -1;
        }
      }
      npc.body.cock = {};
      /*length in 0.1 inch increments*/
      npc.body.cock.length = ((randomDist([1, 5, 30, 150, 400, 1000, 500, 200, 50, 10, 1]) + mod) * 10) +
        Math.floor(randomFloat(3, 13));
      /*penile diameter in 0.1 inch increments*/
      npc.body.cock.girth = 10 + randomDist([1, 8, 32, 96, 256, 512, 256, 69, 32, 8, 1]) + Math.floor(mod / 2);
      if (npc.mutate.MegaLong) {
        npc.body.cock.length += random(25, 35);
        npc.body.cock.girth += random(2, 6);
      }
      ar = [80, 5, 5, 5, 5];
      arr = ["normal", "bulbous", "tapered", "blunt", "small"];
      npc.body.cock.head = arr[randomDist(ar)];
      if (npc.body.cock.head === "bulbous") {
        t = 11;
      } else if (npc.body.cock.head === "small") {
        t = 9;
      } else {
        t = 10;
      }
      /*ugg units...*/
      const len = (npc.body.cock.length / 10) * 2.54;
      const rad = ((npc.body.cock.girth / 10) * 2.54) / 2;
      npc.body.cock.vol = Math.round(Math.PI * Math.pow(rad, 2) * len); /*vol in cc*/
      if (setup.npcSetting.circum[0]) {
        switch (setup.npcSetting.circum[1]) {
        case 0:
          npc.body.cock.circum = false;
          break;
        case 1:
          npc.body.cock.circum = true;
          break;
        case 2:
          /*inverse*/
          arr = [true, false];
          npc.body.cock.circum = arr[randomDist([23, 77])];
          break;
        }
      } else {
        arr = [false, true];
        npc.body.cock.circum = arr[randomDist([23, 77])];
      }
      npc.body.cock.hard = randomDist([1, 4, 90, 4, 1]) + 1;
      npc.body.cock.smegma = false;
      npc.body.cock.tags = ["none"];
      /*Time for some nuts*/
      npc.body.balls = {};
      npc.body.balls.count = randomDist([1, 5, 5000, 2]); /*in case they don't have 2!*/
      /*vol in cc each, tempted to be more specific, but it isn't necessary...*/
      npc.body.balls.size = 20 + (npc.fert.fertility - 3) * 2;
      if (npc.mutate.MegaNuts) {
        npc.body.balls.size += 20;
      }
      t = 1;
      if (npc.main.age > 30) {
        t = Math.floor((npc.main.age - 30) / 8);
      } else if (npc.main.age < 21) {
        t = 0;
      }
      if (npc.body.balls.size > 24) {
        t += 1;
      }
      if (npc.body.balls.size > 28) {
        t += 1;
      }
      if (npc.body.balls.size < 18 && t > 0) {
        t -= 1;
      }
      npc.body.balls.sac = randomDist([1, 100, 800, 100, 1]) + 1;
      t += npc.body.balls.sac - 3;
      npc.body.balls.hang = t;
      npc.body.balls.tags = ["none"];
      if (npc.body.balls.size < 18) {
        npc.body.balls.tags.push("small");
      }
      if (npc.body.balls.size > 24) {
        npc.body.balls.tags.push("large");
      }
    }

    function sexualCharacterFemale(npc) {
      /*NOW ONTO THE GOODS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      /*determine female characteristics*/
      let mod, ar, arr, res, temp;
      npc.body.tits = {};
      temp = Math.floor(
        randomDist([1, 8, 24, 64, 256, 512, 762, 1024, 762, 512, 128, 64, 32, 16, 8, 4, 2, 1]) * 1.2) * 100;
      temp += ((Math.floor(randomFloat(11)) - 5) * 10);
      if (setup.npcSetting.tits[0]) {
        temp += setup.npcSetting.tits[1];
      }
      if (temp < 0) {
        temp = 0;
      }
      if (npc.body.weight < 3) {
        temp -= (3 - npc.body.weight) * 150;
      } else if (npc.body.weight > 4) {
        temp += (npc.body.weight - 4) * 175;
      }
      npc.body.tits.size = temp;
      /*[band,cupNum,cupRaw,cup,bra]*/
      const titStats = setup.calculateBreastStats(npc.body.tits.size, npc.body.shoulders, npc.body.weight);
      npc.body.tits.band = titStats[0];
      npc.body.tits.cupNum = titStats[1];
      npc.body.tits.cupRaw = titStats[2];
      npc.body.tits.cup = titStats[3];
      npc.body.tits.bra = titStats[4];
      arr = ["athletic", "round", "bell", "teardrop", "wideset", "relaxed", "thin"];
      if (npc.main.age > 35 || npc.body.weight > 4) {
        ar = [50, 1, 1, 4, 14, 20, 10, 10];
      } else if (npc.main.age < 18 || npc.body.weight < 3) {
        ar = [25, 20, 8, 1, 30, 1, 15, 0];
      } else {
        ar = [50, 10, 10, 10, 10, 4, 5, 1];
      }
      npc.body.tits.shape = arr[randomDist(ar)];
      arr = ["normal", "large", "puffy", "flat", "inverted", "huge", "partially inverted"];
      npc.body.tits.nipple = arr[randomDist([30, 15, 10, 15, 10, 5, 15])];
      npc.body.lactation = randomDist([1, 19, 60, 19, 1]);
      npc.body.tits.lact = {
        on: false,
        max: 0,
        size: npc.body.tits.size,
        cupNum: titStats[0],
        cup: titStats[3],
        bra: titStats[4],
      };
      npc.body.lactCapacity = setup.calcMilkCap(npc.body.tits.size, npc.body.lactation);
      npc.body.tits.lact.max = npc.body.tits.size + Math.round(npc.body.lactCapacity / 2);
      npc.body.tits.nipLength = randomDist([0, 5, 10, 15, 20, 20, 15, 5, 1]);
      npc.body.tits.nipGirth = randomDist([0, 3, 10, 20, 10, 3]);
      npc.body.tits.areola = randomDist([0, 3, 10, 20, 10, 3]);
      npc.body.tits.puffy = randomDist([0, 5, 30, 15, 10, 5]);
      npc.body.pussy = {};
      ar = npc.main.age * 3;
      arr = [true, false];
      npc.body.pussy.virgin = arr[randomDist([1, ar])];
      if (npc.main.age < 15) {
        npc.body.pussy.virgin = true;
      }
      if (npc.body.pussy.virgin) {
        npc.body.pussy.tight = 0;
        npc.body.pussy.stretch = 0;
      } else {
        npc.body.pussy.tight = randomDist([1, 4, 8, 32, 48, 32, 8, 4, 1]);
        npc.body.pussy.stretch = randomDist([20, 5, 1]);
      }
      if (npc.fert.fertility < 3) {
        ar = [50, 10, 1];
      } else if (npc.fert.fertility > 5) {
        ar = [0, 5, 30, 10, 5];
      } else {
        ar = [5, 30, 10, 5];
      }
      npc.body.pussy.wetness = randomDist(ar) + 1;
      npc.body.pussy.time = 0;
      if (npc.body.pussy.stretch > 0) {
        npc.body.pussy.time += npc.body.pussy.stretch * (Math.floor(randomFloat(4)) + 5);
      }
      npc.body.pussy.tags = ["none"];
      if (npc.body.pussy.tight > 6) {
        npc.body.pussy.tags.push("well-used");
      }
      npc.body.clit = randomDist([5, 20, 10, 1]) + 1;
      npc.body.labia = randomDist([5, 20, 10, 1]) + 1;
      /*may be adjusted later based on personality*/
      npc.body.asshole = {};
      arr = [true, false];
      if (npc.main.age < 18) {
        arr = [true, true];
      }
      npc.body.asshole.virgin = arr[randomDist([1, 5])];
      npc.body.asshole.tight = 0;
      if (!npc.body.asshole.virgin) {
        npc.body.asshole.tight += randomDist([10, 30, 10, 5, 2, 1]);
      }
      npc.body.asshole.stretch = 0;
      npc.body.asshole.wetness = 0;
      npc.body.asshole.time = 0;
      npc.body.asshole.tags = ["none"];
      /*females don't have these things, so just set to -1*/
      npc.body.cock = {};
      npc.body.cock.length = -1;
      npc.body.cock.girth = -1;
      npc.body.cock.head = -1;
      npc.body.cock.vol = -1;
      npc.body.cock.circum = false;
      npc.body.cock.hard = -1;
      npc.body.cock.smegma = false;
      npc.body.cock.tags = ["none"];
      /*Time for some nuts*/
      npc.body.balls = {};
      npc.body.balls.count = -1;
      npc.body.balls.size = -1;
      npc.body.balls.hang = -1;
      npc.body.balls.sac = -1;
      npc.body.balls.tags = ["none"];
    }

    function sexualCharacterFuta(gender, npc) {
      let mod, ar, arr, temp, res, t;
      /*Only change female if one needs to be added because male type*/
      if (gender === 4) {
        npc.body.tits = {};
        temp = Math.floor(
          randomDist([1, 8, 24, 64, 256, 512, 762, 1024, 762, 512, 128, 64, 32, 16, 8, 4, 2, 1]) * 1.2) * 100;
        temp += ((Math.floor(randomFloat(11)) - 5) * 10);
        if (setup.npcSetting.tits[0]) {
          temp += setup.npcSetting.tits[1];
        }
        if (temp < 0) {
          temp = 0;
        }
        if (npc.body.weight < 3) {
          temp -= (3 - npc.body.weight) * 150;
        } else if (npc.body.weight > 4) {
          temp += (npc.body.weight - 4) * 175;
        }
        npc.body.tits.size = temp;
        /*[band,cupNum,cupRaw,cup,bra]*/
        const titStats = setup.calculateBreastStats(npc.body.tits.size, npc.body.shoulders, npc.body.weight);
        npc.body.tits.band = titStats[0];
        npc.body.tits.cupNum = titStats[1];
        npc.body.tits.cupRaw = titStats[2];
        npc.body.tits.cup = titStats[3];
        npc.body.tits.bra = titStats[4];
        arr = ["athletic", "round", "bell", "teardrop", "wideset", "relaxed", "thin"];
        if (npc.main.age > 35 || npc.body.weight > 4) {
          ar = [50, 1, 1, 4, 14, 20, 10, 10];
        } else if (npc.main.age < 18 || npc.body.weight < 3) {
          ar = [25, 20, 8, 1, 30, 1, 15, 0];
        } else {
          ar = [50, 10, 10, 10, 10, 4, 5, 1];
        }
        npc.body.tits.shape = arr[randomDist(ar)];
        arr = ["normal", "large", "puffy", "flat", "inverted", "huge", "partially inverted"];
        npc.body.tits.nipple = arr[randomDist([30, 15, 10, 15, 10, 5, 15])];
        npc.body.lactation = randomDist([1, 19, 60, 19, 1]);
        npc.body.tits.lact = {
          on: false,
          max: 0,
          size: npc.body.tits.size,
          cupNum: titStats[0],
          cup: titStats[3],
          bra: titStats[4],
        };
        npc.body.lactCapacity = setup.calcMilkCap(npc.body.tits.size, npc.body.lactation);
        npc.body.tits.lact.max = npc.body.tits.size + Math.round(npc.body.lactCapacity / 2);
        npc.body.tits.nipLength = randomDist([0, 5, 10, 15, 20, 20, 15, 5, 1]);
        npc.body.tits.nipGirth = randomDist([0, 3, 10, 20, 10, 3]);
        npc.body.tits.areola = randomDist([0, 3, 10, 20, 10, 3]);
        npc.body.tits.puffy = randomDist([0, 5, 30, 15, 10, 5]);
        npc.body.pussy = {};
        ar = npc.main.age * 3;
        arr = [true, false];
        npc.body.pussy.virgin = arr[randomDist([1, ar])];
        if (npc.main.age < 15) {
          npc.body.pussy.virgin = true;
        }
        if (npc.body.pussy.virgin) {
          npc.body.pussy.tight = 0;
          npc.body.pussy.stretch = 0;
        } else {
          npc.body.pussy.tight = randomDist([1, 4, 8, 32, 48, 32, 8, 4, 1]);
          npc.body.pussy.stretch = randomDist([20, 5, 1]);
        }
        if (npc.fert.fertility < 3) {
          ar = [50, 10, 1];
        } else if (npc.fert.fertility > 5) {
          ar = [0, 5, 30, 10, 5];
        } else {
          ar = [5, 30, 10, 5];
        }
        npc.body.pussy.wetness = randomDist(ar) + 1;
        npc.body.pussy.time = 0;
        if (npc.body.pussy.stretch > 0) {
          npc.body.pussy.time += npc.body.pussy.stretch * (Math.floor(randomFloat(4)) + 5);
        }
        npc.body.pussy.tags = ["none"];
        if (npc.body.pussy.tight > 6) {
          npc.body.pussy.tags.push("well-used");
        }
        npc.body.clit = randomDist([5, 20, 10, 1]) + 1;
        npc.body.labia = randomDist([5, 20, 10, 1]) + 1;
        /*may be adjusted later based on personality*/
        npc.body.asshole = {};
        arr = [true, false];
        if (npc.main.age < 18) {
          arr = [true, true];
        }
        npc.body.asshole.virgin = arr[randomDist([1, 5])];
        npc.body.asshole.tight = 0;
        if (!npc.body.asshole.virgin) {
          npc.body.asshole.tight += randomDist([10, 30, 10, 5, 2, 1]);
        }
      }
      /*Only change male if one needs to be added because female type*/
      if (gender === 3) {
        mod = 0;
        if (setup.npcSetting.cock[0]) {
          mod = setup.npcSetting.cock[1];
          if (mod > -2) {
            mod += 2;
          } else {
            mod = -1;
          }
        }
        npc.body.cock = {};
        /*length in 0.1 inch increments*/
        npc.body.cock.length = ((randomDist([1, 3, 150, 400, 1000, 500, 200, 50, 10, 1]) + mod) *
          10) + Math.floor(randomFloat(10));
        /*penile diameter in 0.1 inch increments*/
        npc.body.cock.girth = 10 + randomDist([1, 8, 32, 96, 256, 512, 256, 69, 32, 8, 1]) + Math.floor(mod / 2);
        ar = [80, 5, 5, 5, 5];
        arr = ["normal", "bulbous", "tapered", "blunt", "small"];
        npc.body.cock.head = arr[randomDist(ar)];
        if (npc.body.cock.head === "bulbous") {
          t = 11;
        } else if (npc.body.cock.head === "small") {
          t = 9;
        } else {
          t = 10;
        }
        /*ugg units...*/
        const len = npc.body.cock.length * 2.54;
        const rad = (npc.body.cock.girth * 2.54) / 2;
        npc.body.cock.vol = Math.round((Math.PI * Math.pow(rad, 2) * len) / 10); /*vol in cc*/
        if (setup.npcSetting.circum[0]) {
          switch (setup.npcSetting.circum[1]) {
          case 0:
            npc.body.cock.circum = false;
            break;
          case 1:
            npc.body.cock.circum = true;
            break;
          case 2:
            /*inverse*/
            arr = [true, false];
            npc.body.cock.circum = arr[randomDist([23, 77])];
            break;
          }
        } else {
          arr = [false, true];
          npc.body.cock.circum = arr[randomDist([23, 77])];
        }
        npc.body.cock.hard = randomDist([1, 4, 90, 4, 1]) + 1;
        npc.body.cock.smegma = false;
        npc.body.cock.tags = ["none"];
        /*Time for some nuts*/
        npc.body.balls = {};
        npc.body.balls.count = randomDist([1, 5, 5000, 2]); /*in case they don't have 2!*/
        /*vol in cc each, tempted to be more specific, but it isn't necessary...*/
        npc.body.balls.size = 20 + (npc.fert.fertility - 3) * 2;
        t = 1;
        if (npc.main.age > 30) {
          t = Math.floor((npc.main.age - 30) / 8);
        } else if (npc.main.age < 21) {
          t = 0;
        }
        if (npc.body.balls.size > 24) {
          t += 1;
        }
        if (npc.body.balls.size > 28) {
          t += 1;
        }
        if (npc.body.balls.size < 18 && t > 0) {
          t -= 1;
        }
        npc.body.balls.sac = randomDist([1, 100, 800, 100, 1]);
        t += npc.body.balls.sac - 3;
        npc.body.balls.hang = t;
        npc.body.balls.tags = ["none"];
        if (npc.body.balls.size < 18) {
          npc.body.balls.tags.push("small");
        }
        if (npc.body.balls.size > 24) {
          npc.body.balls.tags.push("large");
        }
      }
    }

    function randomMaleFace(npc) {
      /*onto the face*/
      let ar, arr;
      if (setup.npcSetting.beauty[0]) {
        ar = setup.npcSetting.beauty[1];
      } else {
        /*I'm just pretending truly ugly people don't exist*/
        ar = [10, 25, 45, 15, 5];
      }
      npc.body.beauty = randomDist(ar) + 1;
      /*setting some special distinguishing features*/
      arr = ["normal", "rugged", "soft", "exotic", "angular"];
      npc.body.face = arr[randomDist([60, 10, 10, 10, 10])];
      arr = ["normal", "large", "jutting", "wide"];
      npc.body.jaw = arr[randomDist([135, 5, 5, 55])];
      arr = ["normal", "large", "crooked", "upturned", "wide", "large-nostreled"];
      npc.body.nose = npc.body.race === "black" ?
        arr[randomDist([5, 10, 10, 5, 60, 25])] :
        arr[randomDist([80, 10, 10, 10, 1, 1])];
      arr = ["normal", "large", "cauliflower", "protruding"];
      npc.body.ears = npc.body.tone === 6 ? arr[randomDist([105, 5, 30, 4])] : arr[randomDist([185, 10, 1, 4])];
      arr = ["normal", "unibrow", "thick", "heavy"];
      if (npc.body.race === "middle eastern") {
        ar = [7, 40, 50, 3];
      } else if (npc.body.race === "southern European" || npc.body.race === "south Asian") {
        ar = [19, 20, 60, 1];
      } else if (npc.body.race === "black") {
        ar = [80, 1, 4, 15];
      } else {
        ar = [90, 1, 8, 1];
      }
      npc.body.brow = arr[randomDist(ar)];
      /*basics*/
    }

    function randomFemaleFace(npc) {
      /*onto the face*/
      let ar;
      let arr;
      if (setup.npcSetting.beauty[0]) {
        ar = setup.npcSetting.beauty[2];
      } else {
        ar = [10, 25, 45, 15, 5]; /*I'm just pretending truly ugly people don't exist*/
      }
      npc.body.beauty = randomDist(ar) + 1;
      /*setting some special distinguishing features*/
      arr = ["normal", "sensual", "cute", "exotic", "androgynous"];
      npc.body.face = arr[randomDist([65, 10, 10, 10, 5])];
      arr = ["normal", "masculine", "elegant", "large"];
      npc.body.jaw = arr[randomDist([135, 5, 55, 5])];
      arr = ["normal", "large", "button", "upturned", "wide", "large-nostreled"];
      npc.body.nose = npc.body.race === "black" ?
        arr[randomDist([5, 10, 10, 5, 60, 25])] : arr[randomDist([80, 10, 10, 10, 1, 1])];
      arr = ["unpierced", "pierced", "heavily-pierced", "protruding"];
      npc.body.ears = arr[randomDist([15, 85, 30, 1])];
      arr = ["normal", "unibrow", "thick", "heavy"];
      if (npc.body.race === "middle eastern") {
        ar = [7, 10, 80, 3];
      } else if (npc.body.race === "southern European" || npc.body.race === "south Asian") {
        ar = [17, 2, 80, 1];
      } else if (npc.body.race === "black") {
        ar = [80, 1, 4, 15];
      } else {
        ar = [90, 1, 8, 1];
      }
      npc.body.brow = arr[randomDist(ar)];
      /*basics*/
    }

    function generateNPCmiscMale(npc) {
      let mod;
      let t;
      let ar;
      let res;
      let arr;
      mod = setup.npcSetting.orgasmAdjust;
      if (setup.npcSetting.orgasm[0]) {
        mod += setup.npcSetting.orgasm[1];
      }
      mod *= 3;
      npc.body.orgasm = 15 + randomDist([2, 4, 8, 16, 32, 64, 128, 256, 128, 64, 32, 16, 8, 4, 2]) + mod;
      npc.body.energy = 5 + npc.body.tone + randomDist([1, 4, 8, 4, 1]);
      t = setup.calculateNPCATR(npc.main, npc.body, npc.fert, npc.core, npc.status, npc.mutate);
      npc.body.ATR = t[0];
      npc.body.topATR = t[1];
      npc.body.bottomATR = t[2];
      /*other*/
      npc.body.tags = ["none"];
      if (npc.body.orgasm < 18) {
        npc.body.tags.push("Quick Shot");
      }
      /*room for more automatic tags*/
      /*done with npc.body*/
    }

    function generateNPCmiscFemale(npc) {
      let mod;
      let t;
      let ar;
      let res;
      let arr;
      mod = setup.npcSetting.orgasmAdjust;
      if (setup.npcSetting.orgasm[0]) {
        mod += setup.npcSetting.orgasm[2];
      }
      mod *= 3;
      npc.body.orgasm = 22 + randomDist([2, 4, 8, 16, 32, 64, 128, 256, 128, 64, 32, 16, 8, 4, 2]) + mod;
      npc.body.energy = 5 + npc.body.tone + randomDist([1, 4, 8, 4, 1]);
      t = setup.calculateNPCATR(npc.main, npc.body, npc.fert, npc.core, npc.status, npc.mutate);
      npc.body.ATR = t[0];
      npc.body.topATR = t[1];
      npc.body.bottomATR = t[2];
      /*other*/
      npc.body.tags = ["none"];
      if (npc.body.orgasm > 30) {
        npc.body.tags.push("Hard to Please");
      }
      /*room for more automatic tags*/
      /*done with npc.body*/
    }

    function mutateNPCmale(npc) {
      let ar;
      let arr;
      let res;
      const t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      arr = [false, true];
      ar = [
        [50, 1],
        [100, 0],
        [100, 1],
        [50, 1],
        [25, 1],
        [10, 1],
      ];
      if (setup.npcSetting.mutate[0]) {
        for (let i = 0; i < setup.npcSetting.mutate[1].length; i++) {
          t[i] += setup.npcSetting.mutate[1][i] + 3;
        }
      }
      npc.mutate.Smooth = arr[randomDist(ar[t[0]])];
      npc.mutate.LilithCurse = arr[randomDist(ar[t[1]])];
      npc.mutate.NoRefract = arr[randomDist(ar[t[2]])];
      npc.mutate.MegaNuts = arr[randomDist(ar[t[3]])];
      npc.mutate.KillerSperm = arr[randomDist(ar[t[4]])];
      npc.mutate.BitchBreaker = arr[randomDist(ar[t[5]])];
      npc.mutate.MegaLong = arr[randomDist(ar[t[6]])];
      npc.mutate.Iron = arr[randomDist(ar[t[7]])];
      npc.mutate.Virile = arr[randomDist(ar[t[8]])];
      npc.mutate.AcidPre = arr[randomDist(ar[t[9]])];
      npc.mutate.Girth = arr[randomDist(ar[t[10]])];
      npc.mutate.Contort = arr[randomDist(ar[t[11]])];
      npc.mutate.Cumpire = arr[randomDist(ar[t[12]])];
      npc.mutate.PowerEjac = arr[randomDist(ar[t[13]])];
      npc.mutate.Multgasm = arr[randomDist(ar[t[14]])];
      npc.mutate.Immune = arr[randomDist(ar[t[15]])];
    }

    function mutateNPCfemale(npc) {
      let ar;
      let arr;
      let res;
      const t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      arr = [false, true];
      ar = [
        [50, 1],
        [100, 0],
        [100, 1],
        [50, 1],
        [25, 1],
        [10, 1],
      ];
      if (setup.npcSetting.mutate[0]) {
        for (let i = 0; i < setup.npcSetting.mutate[2].length; i++) {
          t[i] += setup.npcSetting.mutate[2][i] + 3;
        }
      }
      npc.mutate.Milk = arr[randomDist(ar[t[0]])];
      npc.mutate.Acid = arr[randomDist(ar[t[1]])];
      npc.mutate.BC = arr[randomDist(ar[t[2]])];
      npc.mutate.Multiple = arr[randomDist(ar[t[3]])];
      npc.mutate.Gestate = arr[randomDist(ar[t[4]])];
      npc.mutate.Cycle = arr[randomDist(ar[t[5]])];
      npc.mutate.TwinWomb = arr[randomDist(ar[t[6]])];
      npc.mutate.Pheromone = arr[randomDist(ar[t[7]])];
      npc.mutate.Period = arr[randomDist(ar[t[8]])];
      npc.mutate.Immune = arr[randomDist(ar[t[9]])];
      npc.mutate.Mouth = arr[randomDist(ar[t[10]])];
      npc.mutate.Contort = arr[randomDist(ar[t[11]])];
      npc.mutate.Cumpire = arr[randomDist(ar[t[12]])];
      npc.mutate.PseudoPreg = arr[randomDist(ar[t[13]])];
      npc.mutate.Elastic = arr[randomDist(ar[t[14]])];
      npc.mutate.LitePhero = arr[randomDist(ar[t[15]])];
    }

    function generateRandomBackground(npc, gender) {
      let ar;
      let arr;
      let res;
      let mod = 0;
      let t = -3;
      arr = [true, false];
      /* NOTE
        it's a really tough call, realism vs the appearance of racism.
        As a simulation, I feel realism is slightly more important,
        so I'm using numbers derived from the 2015 US Census statistics
      */
      if (npc.body.race === "black") {
        t = 8;
      } else if (npc.body.race === "hispanic") {
        t = 12;
      } else if (npc.body.race === "Asian") {
        t = -15;
      } else if (npc.body.race === "south Asian") {
        t = -12;
      } else if (npc.body.race === "southeast Asian") {
        t = -7;
      } else if (npc.body.race === "native American") {
        t = 7;
      } else if (npc.body.race === "southern European") {
        t = 3;
      } else if (npc.body.race === "middle eastern") {
        t = 5;
      }
      /*determine the NPC's educational level.*/
      npc.bground.hschool = arr[randomDist([(90 - t), Math.max(1, (100 - (90 - t)))])];
      if (npc.bground.hschool) { /*only go to college if graduated*/
        mod++; /*mod will help distribute wealth and job!*/
        npc.bground.college = arr[randomDist([(85 - t), Math.max(1, (100 - (82 - t)))])];
        if (npc.bground.college) { /*only get associates if went to college*/
          mod++;
          npc.bground.associate = arr[randomDist([(93 - t), Math.max(1, (100 - (89 - t)))])];
          if (npc.bground.associate) {
            mod++;
            npc.bground.bachelor = arr[randomDist([(51 - t), Math.max(1, (100 - (40 - t)))])];
            if (npc.bground.bachelor) {
              mod++;
              npc.bground.master = arr[randomDist([(29 - t), Math.max(1, (100 - (29 - t)))])];
              if (npc.bground.master) {
                mod++;
                npc.bground.doctor = arr[randomDist([(27 - t), Math.max(1, (100 - (27 - t)))])];
                if (npc.bground.doctor) {
                  mod++;
                }
              } else {
                npc.bground.doctor = false;
              }
            } else {
              npc.bground.master = false;
              npc.bground.doctor = false;
            }
          } else {
            npc.bground.bachelor = false;
            npc.bground.master = false;
            npc.bground.doctor = false;
          }
        } else {
          npc.bground.associate = false;
          npc.bground.bachelor = false;
          npc.bground.master = false;
          npc.bground.doctor = false;
        }
      } else {
        npc.bground.college = false;
        npc.bground.associate = false;
        npc.bground.bachelor = false;
        npc.bground.master = false;
        npc.bground.doctor = false;
      }
      /*note that if IN college, or too young, true results reflect aspirations*/
      if (
        (npc.main.age < 19 && npc.bground.hschool) ||
        (npc.main.age < 20 && npc.bground.college) ||
        (npc.main.age < 21 && npc.bground.associate) ||
        (npc.main.age < 23 && npc.bground.bachelor) ||
        (npc.main.age < 25 && npc.bground.master) ||
        (npc.main.age < 29 && npc.bground.doctor)) {
        npc.bground.inschool = true;
      } else {
        npc.bground.inschool = false;
      }
      npc.bground.education = mod;
      /*let's see if the NPC lives at home, will base this on age.*/
      if (npc.main.age < 18) {
        ar = [100, 0];
      } else if (npc.main.age < 21) {
        ar = [95, 5];
      } else if (npc.main.age < 25) {
        ar = [75, 25];
      } else if (npc.main.age < 30) {
        ar = [1, 199];
      } else {
        ar = [1, 1000];
      }
      npc.bground.homeParents = arr[randomDist(ar)];
      if (setup.npcSetting.wealth[0]) { /*add player setting mod*/
        mod += gender === 1 ? setup.npcSetting.wealth[1] : setup.npcSetting.wealth[2];
        if (mod > 7) {
          mod = 7;
        }
      }
      if (npc.bground.homeParents && mod > 4) {
        mod = 4;
      } /*if you're living at home, you can only act SO wealthy*/
      switch (mod) {
      case -2:
        ar = [60, 30, 6, 2, 1, 1, 0];
        break;
      case -1:
        ar = [40, 40, 13, 4, 2, 1, 0];
        break;
      case 0:
        ar = [30, 41, 20, 5, 2, 1, 1];
        break;
      case 1:
        ar = [21, 36, 22, 15, 8, 2, 1];
        break;
      case 2:
        ar = [15, 31, 25, 20, 5, 3, 1];
        break;
      case 3:
        ar = [5, 15, 35, 30, 10, 4, 1];
        break;
      case 4:
        ar = [1, 7, 20, 40, 20, 10, 2];
        break;
      case 5:
        ar = [1, 4, 15, 30, 30, 15, 5];
        break;
      case 6:
        ar = [1, 2, 7, 20, 40, 20, 10];
        break;
      case 7:
        ar = [0, 1, 4, 15, 30, 30, 20];
        break;
      }
      const w = randomDist(ar) - 3;
      npc.bground.wealth = w;
      let c1, c2;
      const clist = [
        "Toyoda",
        "Hunda",
        "Natsi",
        "Furd",
        "SM",
        "KUM",
        "Dewie",
        "Geep",
        "Bendz",
        "TMI",
        "Sukayu",
        "Edison",
        "Fuchwagon",
        "Misubitchi",
        "Mazta",
      ];
      const cmod = [
        ["Cunti", "Cummi", "Bukake", "Priapism"],
        ["Ageaho", "Gaepic", "IC-U"],
        ["Flood", "Sexi"],
        ["Fister", "Prostitute", "Edging", "Exploder", "Mustywang", "Turdus"],
        ["Milf", "Slaver", "Impound", "Equicox", "Cumonyu"],
        ["Bondage", "Optional"],
        ["Django", "Challenged", "Chargit", "Trip"],
        ["Grand Whitey", "Tag-Team"],
        ["Derp", "Herp", "Gerd"],
        ["Vier", "Funf", "Sechs"],
        ["Bush", "Impregna"],
        ["Type S", "Type T", "Type V"],
        ["Gonad", "Passedout", "Beaver"],
        ["Lingual", "Outlaster"],
        ["Sex", "Tres", "Sissiata"],
      ];
      const cage = [
        "broken-down",
        "worn-out",
        "clunker",
        "old",
        "scrap-heap",
        "used",
        "nice",
        "new",
        "brand-new",
        "just-off-the-lot"
      ];
      let job;
      if (!npc.bground.inschool) {
        switch (npc.bground.education) {
        case 0:
          job = [
            "cashier",
            "food server",
            "fakeopathy practitioner",
            "bricklayer",
            "event coordinator",
            "hair stylist",
            "receptionist",
            "pest control worker",
            "automobile mechanic",
            "fitness trainer",
            "clergy",
            "recreation worker",
            "animal service worker",
            "furniture upholsterer",
            "salesperson",
            "jeweler",
            "choreographer",
            "sheet metal worker",
            "artist",
            "bartender",
            "gogo dancer",
            "welder",
            "garbage collector",
            "flooring installer",
            "photographer",
            "tailor",
            "painter",
            "maid",
            "butcher",
            "waiter/waitress",
            "dishwasher",
            "farmer",
            "roofer",
            "fast food worker",
            "janitor",
            "grounds keeper",
            "retail worker",
            "packing and shipping",
            "manual laborer",
          ];
          break;
        case 1:
        case 2:
          job = [
            "cashier",
            "food server",
            "customer service rep",
            "stock clerk",
            "order filler",
            "secretary",
            "fakeopathy practitioner",
            "medical records technician",
            "industrial machine repairer",
            "industrial robot repairer",
            "surveyor",
            "bricklayer",
            "event coordinator",
            "plumber",
            "electrician",
            "autobody repairer",
            "insurance agent",
            "hair stylist",
            "receptionist",
            "sewage plant operator",
            "building inspector",
            "pest control worker",
            "construction foreman",
            "automobile mechanic",
            "security guard",
            "fitness trainer",
            "appliance repairer",
            "ironworker",
            "recreation worker",
            "animal service worker",
            "special machinery operator",
            "nurse's aide",
            "electrical technician",
            "machinist",
            "advertising salesperson",
            "child care worker",
            "furniture upholsterer",
            "salesperson",
            "jeweler",
            "choreographer",
            "machine tool operator",
            "sheet metal worker",
            "carpenter",
            "artist",
            "bartender",
            "gogo dancer",
            "electrical equipment repairer",
            "real estate agent",
            "welder",
            "garbage collector",
            "bank teller",
            "flooring installer",
            "AC technician",
            "firefighter",
            "photographer",
            "tailor",
            "painter",
            "precision assembler",
            "buyer",
            "maid",
            "fashion designer",
            "butcher",
            "waiter/waitress",
            "tax preparer",
            "dishwasher",
            "corrections officer",
            "farmer",
            "roofer",
            "mail carrier",
            "meter reader",
            "fast food worker",
            "janitor",
            "grounds keeper",
            "retail worker",
            "packing and shipping",
            "manual laborer",
          ];
          break;
        case 3:
          job = [
            "cashier",
            "office clerk",
            "food server",
            "customer service rep",
            "stock clerk",
            "order filler",
            "secretary",
            "bookkeeper",
            "actuary",
            "financial planner",
            "dental hygienist",
            "physical therapist",
            "fakeopathy practitioner",
            "web developer",
            "parole officer",
            "medical records technician",
            "social and community manager",
            "paralegal assistant",
            "skincare specialist",
            "industrial machine repairer",
            "industrial robot repairer",
            "social worker",
            "vocational counselor",
            "surveyor",
            "event coordinator",
            "loan officer",
            "plumber",
            "stenographer",
            "recruiter",
            "insurance underwriter",
            "electrician",
            "autobody repairer",
            "insurance agent",
            "communications equipment mechanic",
            "building inspector",
            "emergency medical technician",
            "licensed practical nurse",
            "teacher's aide",
            "construction foreman",
            "stockbroker",
            "police officer",
            "fitness trainer",
            "computer service technician",
            "architectural drafter",
            "appliance repairer",
            "funderal director",
            "sales representative (wholesale)",
            "broadcast technician",
            "medical secretary",
            "electrical technician",
            "advertising salesperson",
            "dental laboratory technican",
            "child care worker",
            "video editor",
            "salesperson",
            "jeweler",
            "choreographer",
            "carpenter",
            "artist",
            "aircraft mechanic",
            "helicopter pilot",
            "electrical equipment repairer",
            "real estate agent",
            "engineering technician",
            "bank teller",
            "shipping/receiving clerk",
            "photographer",
            "buyer",
            "disc jockey",
            "fashion designer",
            "waiter/waitress",
            "tax preparer",
            "corrections officer",
            "farmer",
            "fast food worker",
            "retail worker",
          ];
          break;
        case 4:
          job = [
            "cashier",
            "office clerk",
            "registered nurse",
            "customer service rep",
            "stock clerk",
            "secretary",
            "bookkeeper",
            "accountant",
            "manager",
            "middle-school teacher",
            "high-school teacher",
            "actuary",
            "biomedical engineer",
            "software engineer",
            "financial planner",
            "dental hygienist",
            "occupational therapist",
            "physical therapist",
            "computer systems analyst",
            "dietician",
            "optician",
            "web developer",
            "historian",
            "environmental engineer",
            "parole officer",
            "mechanical engineer",
            "meteorologist",
            "geologist",
            "human resources manager",
            "civil engineer",
            "medical records technician",
            "computer programmer",
            "social and community manager",
            "management consultant",
            "social worker",
            "physician assistant",
            "vocational counselor",
            "technical writer",
            "architect",
            "loan officer",
            "nuclear decontamination technician",
            "medical technologist",
            "recruiter",
            "biologist",
            "medical laboratory technician",
            "insurance underwriter",
            "executive assistant",
            "nuclear engineer",
            "online sales manager",
            "communications equipment mechanic",
            "tax examiner",
            "librarian",
            "industrial designer",
            "zoologist",
            "elementary school teacher",
            "emergency medical technician",
            "industrial engineer",
            "electrical engineer",
            "aerospace engineer",
            "teacher's aide",
            "stockbroker",
            "purchasing agent",
            "computer service technician",
            "sales representative (wholesale)",
            "chemist",
            "purchasing manger",
            "medical secretary",
            "conservationist",
            "advertising salesperson",
            "choreographer",
            "artist",
            "corporate rod polisher",
            "author",
            "hotel manager",
            "stationary engineer",
            "shipping/receiving clerk",
            "publication editor",
            "photographer",
            "disc jockey",
            "fashion designer",
            "broadcaster",
            "photojournalist",
            "farmer",
            "reporter",
            "retail worker",
          ];
          break;
        case 5:
          job = [
            "registered nurse",
            "accountant",
            "manager",
            "middle-school teacher",
            "high-school teacher",
            "actuary",
            "biomedical engineer",
            "software engineer",
            "occupational therapist",
            "physical therapist",
            "computer systems analyst",
            "speech pathologist",
            "dietician",
            "sociologist",
            "statistician",
            "optician",
            "historian",
            "environmental engineer",
            "mechanical engineer",
            "meteorologist",
            "geologist",
            "human resources manager",
            "respiratory therapist",
            "computer programmer",
            "market research analyst",
            "management consultant",
            "physician assistant",
            "psychologist",
            "medical technologist",
            "recruiter",
            "biologist",
            "public relations executive",
            "executive assistant",
            "nuclear engineer",
            "online sales manager",
            "zoologist",
            "elementary school teacher",
            "industrial engineer",
            "electrical engineer",
            "aerospace engineer",
            "purchasing agent",
            "economist",
            "agricultural scientist",
            "advertising account executive",
            "chemist",
            "purchasing manger",
            "conservationist",
            "corporate rod polisher",
            "publication editor",
          ];
          break;
        case 6:
          job = [
            "manager",
            "audiologist",
            "optometrist",
            "computer systems analyst",
            "speech pathologist",
            "physiologist",
            "community college professor",
            "university professor",
            "veterinarian",
            "pharmacist",
            "mathematician",
            "sociologist",
            "statistician",
            "physicist",
            "podiatrist",
            "historian",
            "geologist",
            "orthodontist",
            "astronomer",
            "psychiatrist",
            "dentist",
            "physician",
            "logistician",
            "surgeon",
            "xenobiologist",
            "psychologist",
            "biologist",
            "judge",
            "lawyer",
            "nuclear engineer",
            "zoologist",
            "anthropologist",
            "attorney",
            "economist",
            "agricultural scientist",
            "molecular chemist",
          ];
          break;
        }
      } else {
        job = ["in school", "student"];
      }
      switch (w) {
      case -3:
        c1 = [0, 1, 2, 3, 4, 5, 6, 7, 10, 13, 14];
        c2 = [0, 2, 4];
        npc.bground.cash = random(20, 50);
        npc.bground.bank = random(0, 30);
        npc.bground.debt = random(8000, 15000);
        npc.bground.home = randomDist([5, 95]);
        npc.bground.job = either(job);
        break;
      case -2:
        c1 = [0, 1, 2, 3, 4, 5, 6, 7, 10, 13, 14];
        c2 = [1, 2, 3, 4];
        npc.bground.cash = random(50, 150);
        npc.bground.bank = random(30, 300);
        npc.bground.debt = random(5000, 13000);
        npc.bground.home = randomDist([0, 90, 10]);
        npc.bground.job = either(job);
        break;
      case -1:
        c1 = [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14];
        c2 = [1, 2, 3, 5];
        npc.bground.cash = random(100, 300);
        npc.bground.bank = random(100, 500);
        npc.bground.debt = random(5000, 11000);
        npc.bground.home = randomDist([0, 30, 50, 20]);
        npc.bground.job = either(job);
        break;
      case 0:
        c1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14];
        c2 = [1, 3, 5, 6];
        npc.bground.cash = random(200, 500);
        npc.bground.bank = random(300, 2000);
        npc.bground.debt = random(3000, 8000);
        npc.bground.home = randomDist([0, 15, 50, 35]);
        npc.bground.job = either(job);
        break;
      case 1:
        c1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14];
        c2 = [5, 6, 7];
        npc.bground.cash = random(300, 800);
        npc.bground.bank = random(800, 3000);
        npc.bground.debt = random(1500, 8000);
        npc.bground.home = randomDist([0, 12, 30, 50, 3]);
        npc.bground.job = either(job);
        break;
      case 2:
        c1 = [2, 3, 4, 6, 7, 8, 10, 11, 12, 14];
        c2 = [5, 6, 7, 8, 9];
        npc.bground.cash = random(1000, 2500);
        npc.bground.bank = random(2500, 10000);
        npc.bground.debt = random(500, 5000);
        npc.bground.home = randomDist([0, 5, 20, 55, 20]);
        npc.bground.job = either(job);
        break;
      case 3:
        c1 = [8, 9, 11];
        c2 = [7, 8, 9];
        npc.bground.cash = random(2500, 8000);
        npc.bground.bank = random(8000, 25000);
        npc.bground.debt = random(0, 5000);
        npc.bground.home = randomDist([0, 0, 5, 35, 60]);
        npc.bground.job = either(job);
        break;
      }
      t = either(c1);
      const maker = clist[t];
      const condition = cage[either(c2)];
      const model = either(cmod[t]);
      npc.bground.car = [maker, model, condition];
      npc.bground.timeApple = random(1, npc.main.age);
      npc.bground.sister = randomDist([65, 30, 5]);
      if (npc.bground.sister > 0) {
        npc.bground.sisterYounger = either(true, false);
      } else {
        npc.bground.sisterYounger = false;
      }
      npc.bground.brother = randomDist([65, 30, 5]);
      if (npc.bground.brother > 0) {
        npc.bground.brotherYounger = either(true, false);
      } else {
        npc.bground.brotherYounger = false;
      }
      npc.bground.parentDivorced = either(true, true, false);
      if (npc.bground.parentDivorced) {
        npc.bground.stepParent = either("mom", "dad", "dad", "none");
      } else {
        npc.bground.stepParent = "na";
      }
      npc.bground.dadDead = either(false, false, false, false, true);
      npc.bground.momDead = either(false, false, false, false, true);
      mod = 0;
      if (setup.npcSetting.married[0]) {
        mod = setup.npcSetting.married[1];
      }
      t = Math.max(0, Math.floor((npc.main.age - 3) / 5 - 2) + mod) + 5;
      ar = Math.round(t * (t * (t / 10))); /*jesus fuckstick*/
      if (ar > 50) {
        ar = 50;
      } // caps marriage percentage rate
      arr = [true, false];
      npc.bground.married = arr[randomDist([ar, Math.max(2, 100 - ar)])];
      npc.bground.exSpouse = 0;
      if (npc.main.age > 23) {
        npc.bground.exSpouse = randomDist(
          [70, npc.main.age, Math.floor(npc.main.age / 3), Math.floor(npc.main.age / 6)]);
      }
      if (npc.bground.married) {
        npc.bground.rShip = arr[randomDist([95, 5])];
        npc.bground.affair = arr[randomDist([1, 19])];
      } else {
        npc.bground.rShip = arr[randomDist([50, 50])];
        if (npc.bground.rShip) {
          npc.bground.affair = arr[randomDist([1, 19])];
        } else {
          npc.bground.affair = false;
        }
      }
    }

    function setupNPCflags(npc) {
      /*preps flag variables*/
      npc.flags.other = ["none"];
      npc.flags.events = ["none"];
      npc.flags.knows = ["none"];
      npc.flags.rumor = ["none"];
      npc.flags.exes = ["none"];
      npc.flags.kids = randomDist([80, Math.max(0, npc.main.age - 20), Math.max(0, npc.main.age - 30)]);
      npc.flags.kidsPC = 0;
      npc.flags.cheatonPC = 0;
      npc.flags.cheatedon = 0;
      npc.flags.cheatWithPC = 0;
      npc.flags.knowPCcheated = 0;
      npc.flags.PCknowCheated = 0;
      npc.flags.toys = false;
      npc.flags.toysPublic = false;
      npc.flags.knowPCpreg = false;
      npc.flags.isFather = false;
      npc.flags.thinkFather = false;
      npc.flags.suspicion = 0;
      npc.flags.PCsuspicion = 0;
      npc.flags.thinkPCfaithful = true;
      npc.flags.thinkNPCfaithful = true;
    }

    function generateNPCrelationship(npc) {
      /*sets up relationship variables*/
      npc.rship.friend = false;
      npc.rship.acquaint = false;
      npc.rship.dating = false;
      npc.rship.lovers = false;
      npc.rship.exclusive = false;
      npc.rship.engaged = false;
      npc.rship.married = false;
      npc.rship.likePC = 0;
      npc.rship.likeNPC = 0;
      npc.rship.lovePC = 0;
      npc.rship.loveNPC = 0;
      npc.rship.companion = 0;
      npc.rship.domsub = 50;
      npc.rship.mesh = 0;
      npc.rship.daysince = 0;
      npc.rship.space = 0;
      npc.rship.dates = 0;
      npc.rship.hangout = 0;
      npc.rship.met = 0;
      npc.rship.sleptover = 0;
      npc.rship.pcslept = 0;
      npc.sex = {
        vanilla: 0,
        oralPC: 0,
        oralNPC: 0,
        anal: 0,
        public: 0,
        swallowed: 0,
        creampie: 0,
        accidentCP: 0,
        forced: 0,
        unprotected: 0,
        interupted: 0,
        nocumNPC: 0,
        nocumPC: 0,
        mob: 0,
        bondage: 0,
        sadoMaso: 0,
        watersport: 0,
        domsub: 0,
        roleplay: 0,
        fetish: 0,
        exhibit: 0,
        rapist: 0,
        raped: 0,
        saboPCbc: 0,
        caughtSabo: 0,
        PCsaboBC: 0,
        PCsaboCaught: 0,
        sexlocs: ["none"],
        tags: ["none"],
      };
    }

    function generateRandomSchedule(npc) {
      /*where and when the NPC is*/
      /*also demonstrating using object literals for lookup*/
      let r = randomDist([80, 10, 5, 5, 10, 8, 8]);

      function getSched(num) {
        const sched = {
          0: [true, true, true, true, true, false, false],
          1: [false, true, true, true, true, true, false],
          2: [false, false, true, true, true, true, true],
          3: [false, true, true, true, false, true, true],
          4: [true, true, true, true, false, false, true],
          5: [true, false, false, true, true, true, true],
          6: [true, true, true, true, false, false, false],
        };
        return sched[num];
      }
      npc.sched.workdays = getSched(r);
      r = randomDist([100, 25, 15, 5]);
      const arr = [
        [8, 17],
        [9, 18],
        [15, 0],
        [0, 9],
      ];
      npc.sched.workhours = arr[r];
      npc.sched.workLoc = "none";
      const m = randomDist([1, 2, 4, 8, 8, 4, 2]) + 1;
      r = random(0, Math.round(m / 2));
      npc.sched.outhours = [r, (m - r)];
      npc.sched.locations = [];
    }

    function generateMaleStatus(npc) {
      /*sets up status variables*/
      /*currently limited generation, as more detail not needed at this stage*/
      npc.status = {
        birthCon: 0,
        birthConType: "none",
        bc: {
          dia: false,
          diaType: "none",
          diaEf: 0,
          diaHealth: 0,
          diaBreak: false,
          diaSab: 0,
          femCon: false,
          femConHealth: 0,
          femConEf: 0,
          femConType: "none",
          femConBreak: false,
          femConSab: 0,
          menCup: false,
          menCupType: "none",
          menCupHealth: 0,
          menCupEf: 0,
          menCupBreak: false,
          menCupSab: 0,
          sponge: false,
          spongeType: "none",
          spongeEf: 0,
          spongeSab: 0,
          condom: false,
          condomType: "none",
          condomHealth: 0,
          condomEf: 0,
          condomBreak: false,
          condomSab: 0,
          headCap: false,
          headCapType: "none",
          headCapHealth: 0,
          headCapEf: 0,
          headCapBreak: false,
          headCapSab: 0,
        },
        alcohol: 0,
        drugs: [0, 0, 0, 0, 0],
        cycle: 0,
        fertText: "none",
        status: [],
        risk: 0,
        wombA: {
          preg: false,
          know: false,
          weeks: 0,
          days: 0,
          birth: 0,
          count: 0,
        },
        wombB: {
          preg: false,
          know: false,
          weeks: 0,
          days: 0,
          birth: 0,
          count: 0,
        },
        wombAcount: 0,
        wombBcount: 0,
        period: false,
        milk: 0,
        milkStore: 0,
        arousal: randomDist([1, 5, 2, 1]),
        pleasure: 0,
        satisfaction: (random(15, 30) + random(20, 35)) + (npc.core.vert * 10),
        need: randomDist([12, 3, 2, 1]),
        ATR: 0,
        stress: (random(15, 30) + random(20, 35)) + ((npc.core.vert + npc.core.open) * -5),
        happy: randomDist([1, 2, 4, 8, 16, 32, 32, 16, 8, 4, 2, 1]) - random(2, 4),
        anger: randomDist([50, 2, 2, 1, 1]),
        lonely: npc.core.vert > 0 ?
          (randomDist([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 1]) * 10) : (randomDist([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 1]) * 7),
        fatigue: random(3, 8),
        asleep: false,
        health: (100 - random(0, 3)) + ((npc.bground.wealth - 3) * random(1, 3)),
        knowPregA: false,
        knowPregB: false,
        knowBCfail: false,
        BCfail: false,
        /*these are the NPC goin' crazy vars*/
        overAnger: false,
        overStress: false,
        overDepress: false,
        underSat: false,
        addictMax: 0,
        jonesing: 0,
        withdrawl: false,
        energy: Math.round(npc.body.energy / random(3, 5)) * 2,
        energyRegen: true,
        clean: 1,
        injury: [0],
        disease: [0],
        /*remember to add fun SSTIs!*/
        diseaseRate: ((npc.core.vert * -1) * 5) +
          random(1, 20) + (Math.round(npc.core.perv / 10) * (random(3, 5) + npc.core.open)),
        bored: ((random(6, 14) - npc.core.vert) + Math.round((npc.core.open + npc.core.diq) / 2)),
      };
      /*now to set some vars that are difficult inside an object definition*/
      let t;
      let k = false;
      let ar: any = [true, false];
      const bc = ar[randomDist([2, 8])];
      if (bc) {
        npc.status.birthConType = either("pill", "pill", "pill", "pill", "foam");
        ar = {
          pill: [65, 90],
          foam: [98, 99],
        };
        t = ar[npc.status.birthConType];
        npc.status.birthCon = random(t[0], t[1]);
      }
      if (npc.core.neurotic.addiction > 0 && npc.core.diq < -1) {
        t = 75;
      } else if (npc.core.neurotic.addiction > 0 || npc.core.diq < -1) {
        t = 50;
      } else if (npc.core.diq > 2 || npc.core.neurotic.addiction < -2) {
        t = random(10, 20);
      } else {
        t = random(20, 30);
      }
      npc.status.addict = {
        sex: random(0, t),
        alco: random(0, t),
        heat: random(0, t),
        satyr: random(0, t),
        focus: random(0, t),
        cum: 0,
        zone: random(0, t),
        cream: 0,
      };
      if (t > 30) {
        k = true;
      } else if (t > 25) {
        k = ar[randomDist([1, 100])];
      }
      npc.status.addictNeed = {
        sex: k ? random(5, 45) + random(5, 50) : 0,
        alco: k ? random(5, 45) + random(5, 50) : 0,
        heat: k ? random(5, 45) + random(5, 50) : 0,
        satyr: k ? random(5, 45) + random(5, 50) : 0,
        focus: k ? random(5, 45) + random(5, 50) : 0,
        cum: 0,
        zone: k ? random(5, 45) + random(5, 50) : 0,
        cream: 0,
      };
      npc.status.addictMax = Math.max(
        npc.status.addict.sex,
        npc.status.addict.alco,
        npc.status.addict.heat,
        npc.status.addict.satyr,
        npc.status.addict.focus,
        npc.status.addict.cum,
        npc.status.addict.zone,
        npc.status.addict.cream
      );
    }

    function generateFemaleStatus(npc) {
      /*sets up status variables*/
      /*currently limited generation, as more detail not needed at this stage*/
      npc.status = {
        birthCon: 0,
        birthConType: "none",
        bc: {
          dia: false,
          diaType: "none",
          diaEf: 0,
          diaHealth: 0,
          diaBreak: false,
          diaSab: 0,
          femCon: false,
          femConHealth: 0,
          femConEf: 0,
          femConType: "none",
          femConBreak: false,
          femConSab: 0,
          menCup: false,
          menCupType: "none",
          menCupHealth: 0,
          menCupEf: 0,
          menCupBreak: false,
          menCupSab: 0,
          sponge: false,
          spongeType: "none",
          spongeEf: 0,
          spongeSab: 0,
          condom: false,
          condomType: "none",
          condomHealth: 0,
          condomEf: 0,
          condomBreak: false,
          condomSab: 0,
          headCap: false,
          headCapType: "none",
          headCapHealth: 0,
          headCapEf: 0,
          headCapBreak: false,
          headCapSab: 0
        },
        alcohol: 0,
        drugs: [0, 0, 0, 0, 0],
        cycle: 0,
        fertText: "none",
        status: [],
        risk: 0,
        wombA: {
          preg: false,
          know: false,
          weeks: 0,
          days: 0,
          birth: 0,
          count: 0,
        },
        wombB: {
          preg: false,
          know: false,
          weeks: 0,
          days: 0,
          birth: 0,
          count: 0,
        },
        period: false,
        milk: 0,
        milkStore: 0,
        arousal: randomDist([1, 5, 2, 1]),
        pleasure: 0,
        satisfaction: (random(15, 30) + random(20, 35)) + (npc.core.vert * 10),
        need: randomDist([12, 3, 2, 1]),
        ATR: 0,
        stress: (random(15, 30) + random(20, 35)) + ((npc.core.vert + npc.core.open) * -5),
        happy: randomDist([1, 2, 4, 8, 16, 32, 32, 16, 8, 4, 2, 1]) - random(2, 4),
        anger: randomDist([50, 2, 2, 1, 1]),
        lonely: npc.core.vert > 0 ?
          (randomDist([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 1]) * 10) : (randomDist([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 1]) * 7),
        fatigue: random(3, 8),
        asleep: false,
        health: (100 - random(0, 3)) + ((npc.bground.wealth - 3) * random(1, 3)),
        knowBCfail: false,
        BCfail: false,
        /*these are the NPC goin' crazy vars*/
        overAnger: false,
        overStress: false,
        overDepress: false,
        underSat: false,
        addictMax: 0,
        jonesing: 0,
        withdrawl: false,
        energy: Math.round(npc.body.energy / random(3, 5)) * 2,
        energyRegen: true,
        clean: 1,
        injury: [0],
        disease: [0],
        /*remember to add fun SSTIs!*/
        diseaseRate: ((npc.core.vert * -1) * 5) + random(1, 20) +
          (Math.round(npc.core.perv / 10) * (random(3, 5) + npc.core.open)),
        bored: ((random(6, 14) - npc.core.vert) + Math.round((npc.core.open + npc.core.diq) / 2)),
      };
      /*now to set some vars that are difficult inside an object definition*/
      let t;
      let k = false;
      let ar: any = [true, false];
      const bc = ar[randomDist([8, 2])];
      if (bc) {
        npc.status.birthConType = either("pill", "pill", "patch", "pill", "depo", "implant", "implant", "pill", "IUD");
        ar = {
          pill: [85, 98],
          patch: [96, 99],
          depo: [94, 98],
          implant: [98, 99],
          IUD: [100, 100],
        };
        t = ar[npc.status.birthConType];
        npc.status.birthCon = random(t[0], t[1]);
      }
      if (npc.core.neurotic.addiction > 0 && npc.core.diq < -1) {
        t = 75;
      } else if (npc.core.neurotic.addiction > 0 || npc.core.diq < -1) {
        t = 50;
      } else if (npc.core.diq > 2 || npc.core.neurotic.addiction < -2) {
        t = random(10, 20);
      } else {
        t = random(20, 30);
      }
      npc.status.addict = {
        sex: random(0, t),
        alco: random(0, t),
        heat: random(0, t),
        satyr: random(0, t),
        focus: random(0, t),
        cum: random(0, t),
        zone: random(0, t),
        cream: random(0, t),
      };
      if (t > 30) {
        k = true;
      } else if (t > 25) {
        k = ar[randomDist([1, 100])];
      }
      npc.status.addictNeed = {
        sex: k ? random(5, 45) + random(5, 50) : 0,
        alco: k ? random(5, 45) + random(5, 50) : 0,
        heat: k ? random(5, 45) + random(5, 50) : 0,
        satyr: k ? random(5, 45) + random(5, 50) : 0,
        focus: k ? random(5, 45) + random(5, 50) : 0,
        cum: k ? random(5, 45) + random(5, 50) : 0,
        zone: k ? random(5, 45) + random(5, 50) : 0,
        cream: k ? random(5, 45) + random(5, 50) : 0,
      };
      npc.status.addictMax = Math.max(
        npc.status.addict.sex,
        npc.status.addict.alco,
        npc.status.addict.heat,
        npc.status.addict.satyr,
        npc.status.addict.focus,
        npc.status.addict.cum,
        npc.status.addict.zone,
        npc.status.addict.cream,
      );
    }

    function generateRandomCondition(npc) {
      /*generates the condition the PC is in*/
      /*for now we're not going to mess with pre-set conditions*/
      npc.cond.hair = [1, "A", "A"];
      npc.cond.face = [1, "A", "A"];
      npc.cond.chest = [1, "A", "A"];
      npc.cond.back = [1, "A", "A"];
      npc.cond.hands = [1, "A", "A"];
      npc.cond.belly = [1, "A", "A"];
      npc.cond.butt = [1, "A", "A"];
      npc.cond.pubis = [1, "A", "A"];
      npc.cond.anus = [1, "A", "A"];
      npc.cond.anusFluid = 0;
      npc.cond.vagina = [1, "A", "A"];
      npc.cond.vagFluid = 0;
      npc.cond.cock = [1, "A", "A"];
      npc.cond.legs = [1, "A", "A"];
      npc.cond.feet = [1, "A", "A"];
    }

    function generateMalePersonality(npc) {
      /*create some kind of personality mumbo jumbo ;)*/
      npc.core.will = (randomDist([7, 15, 20, 16, 20, 15, 7]) - 3);
      npc.core.libido = (randomDist([2, 8, 13, 18, 22, 25, 12]) - 3);
      npc.core.open = (randomDist([7, 20, 20, 15, 20, 12, 6]) - 3);
      npc.core.vert = (randomDist([7, 20, 20, 15, 20, 12, 6]) - 3);
      /*
      determine modifier for generating perversion w/ differently-weighted stats.
      libido = 2xopenness = 4xwill or vert
      */
      let t = Math.abs(Math.round((Math.round(((4 - npc.core.will) + (4 - npc.core.vert)) / 2) +
        npc.core.libido + (4 + npc.core.open) / 3)));
      npc.core.perv = random(2, 7) * t + random(0, 10);
      t = Math.max(0, (t + (npc.core.vert * -1)));
      npc.core.corrupt = random(1, 10) + random(2, 7) * t;
      let iq = 19;
      if (setup.npcSetting.iq[0]) {
        iq += setup.npcSetting.iq[1];
      }
      iq += randomDist([2, 4, 8, 4, 2]);
      t = npc.bground.wealth;
      if (t < -1) {
        t += 1;
      } else if (t > 1) {
        t -= 1;
      }
      t += npc.core.open + npc.core.vert;
      if (t > 6) {
        t = 6;
      } else if (t < -6) {
        t = -6;
      } else if (t < -4) {
        t = -4;
      }
      npc.core.diq = iq + t;
      npc.core.iq = npc.core.diq * 5 + (random(0, 5) - 2);
      npc.core.diq -= 20;
      npc.core.bimbo = random(1, 3);
      t = npc.core.diq * -1 + 2;
      if (npc.core.diq > 0) {
        for (let i = 0; i < t; i++) {
          npc.core.bimbo += random(5, 10);
        }
      }
      npc.core.op = false;
      npc.core.cl = false;
      npc.core.intro = false;
      npc.core.extro = false;
      if (npc.core.open > 1) {
        npc.core.op = true;
      } else if (npc.core.open < -1) {
        npc.core.cl = true;
      }
      if (npc.core.vert > 1) {
        npc.core.intro = true;
      } else if (npc.core.vert < -1) {
        npc.core.extro = true;
      }
      if (homo === 1) {
        npc.core.sexuality = 0;
        npc.core.straight = true;
        npc.core.bi = false;
        npc.core.homo = false;
      } else if (homo === 2) {
        npc.core.sexuality = 1;
        npc.core.straight = false;
        npc.core.bi = true;
        npc.core.homo = false;
      } else if (homo === 3) {
        npc.core.sexuality = 2;
        npc.core.straight = false;
        npc.core.bi = false;
        npc.core.homo = true;
      } else {
        const arr = [0, 1, 2];
        let ar = [93, 5, 2];
        npc.core.sexuality = arr[randomDist(ar)];
        if (setup.npcSetting.homo[0] && !setup.npcSetting.homo[1][0]) {
          ar = [10, 0];
        } else if (setup.npcSetting.homo[0]) {
          switch (setup.npcSetting.homo[1][1]) {
          case -2:
            ar = [97, 2, 1];
            break;
          case -1:
            ar = [93, 5, 2];
            break;
          case 0:
            ar = [90, 7, 3];
            break;
          case 1:
            ar = [80, 15, 5];
            break;
          case 2:
            ar = [50, 40, 10];
            break;
          }
        }
        npc.core.sexuality = arr[randomDist(ar)];
        if (npc.core.sexuality === 0) {
          npc.core.sexuality = 0;
          npc.core.straight = true;
          npc.core.bi = false;
          npc.core.homo = false;
        } else if (npc.core.sexuality === 1) {
          npc.core.sexuality = 1;
          npc.core.straight = false;
          npc.core.bi = true;
          npc.core.homo = false;
        } else {
          npc.core.sexuality = 2;
          npc.core.straight = false;
          npc.core.bi = false;
          npc.core.homo = true;
        }
      }
      const dist = [10, 20, 20, 0, 20, 20, 10];
      let distO;
      let distOx;
      let distV;
      let distVx;
      let distB;
      let distBx;
      let distC;
      let distCx;
      if (npc.core.op) {
        distO = [5, 15, 15, 0, 25, 25, 15];
        distOx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.cl) {
        distO = [15, 25, 25, 0, 15, 15, 5];
        distOx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distO = [10, 20, 20, 0, 20, 20, 10];
        distOx = [10, 20, 20, 0, 20, 20, 10];
      }
      if (npc.core.intro) {
        distV = [5, 15, 15, 0, 25, 25, 15];
        distVx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.extro) {
        distV = [15, 25, 25, 0, 15, 15, 5];
        distVx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distV = [10, 20, 20, 0, 20, 20, 10];
        distVx = [10, 20, 20, 0, 20, 20, 10];
      }
      if (npc.core.op && npc.core.intro) {
        distB = [1, 5, 10, 0, 30, 35, 25];
        distBx = [25, 35, 30, 0, 10, 5, 1];
      } else if ((npc.core.op || npc.core.intro) && !npc.core.cl && !npc.core.extro) {
        distB = [5, 15, 15, 0, 25, 25, 15];
        distBx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.cl && npc.core.extro) {
        distB = [25, 35, 30, 0, 10, 5, 1];
        distBx = [1, 5, 10, 0, 30, 35, 25];
      } else if ((npc.core.cl || npc.core.extro) && !npc.core.op && !npc.core.intro) {
        distB = [15, 25, 25, 0, 15, 15, 5];
        distBx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distB = [10, 20, 20, 0, 20, 20, 10];
        distBx = [10, 20, 20, 0, 20, 20, 10];
      }
      if (npc.core.cl && npc.core.intro) {
        distC = [1, 5, 10, 0, 30, 35, 25];
        distCx = [25, 35, 30, 0, 10, 5, 1];
      } else if ((npc.core.cl && !npc.core.intro && !npc.core.extro) ||
        (npc.core.intro && !npc.core.cl && !npc.core.op)) {
        distC = [5, 15, 15, 0, 25, 25, 15];
        distCx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.op && npc.core.extro) {
        distC = [25, 35, 30, 0, 10, 5, 1];
        distCx = [1, 5, 10, 0, 30, 35, 25];
      } else if ((npc.core.op && !npc.core.intro && !npc.core.extro) ||
        (npc.core.extro && !npc.core.cl && !npc.core.op)) {
        distC = [15, 25, 25, 0, 15, 15, 5];
        distCx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distC = [10, 20, 20, 0, 20, 20, 10];
        distCx = [10, 20, 20, 0, 20, 20, 10];
      }
      npc.core.procreate = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        secure: (randomDist(distOx) - 3),
        preg: (randomDist(dist) - 3),
        kids: (randomDist(distC) - 3),
        evolve: (randomDist(dist) - 3),
        pleasure: (randomDist(dist) - 3),
      };
      let prop;
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.procreate);
        for (let i = 0; i < prop.length; i++) {
          npc.core.procreate[prop] += setup.npcSetting.persCore[1][i];
        }
      }
      npc.core.morality = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        life: (randomDist(distB) - 3),
        liberty: (randomDist(distB) - 3),
        property: (randomDist(dist) - 3),
        honesty: (randomDist(distV) - 3),
        integrity: (randomDist(distB) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.morality);
        for (let i = 0; i < prop.length; i++) {
          npc.core.morality[prop] += setup.npcSetting.persCore[2][i];
        }
      }
      npc.core.agreeable = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        interest: (randomDist(distO) - 3),
        empathy: (randomDist(distB) - 3),
        caring: (randomDist(distB) - 3),
        trust: (randomDist(distC) - 3),
        altruism: (randomDist(dist) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.agreeable);
        for (let i = 0; i < prop.length; i++) {
          npc.core.agreeable[prop] += setup.npcSetting.persCore[3][i];
        }
      }
      npc.core.conscient = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        thoughtful: (randomDist(distV) - 3),
        responsible: (randomDist(distC) - 3),
        attention: (randomDist(distC) - 3),
        trustworthy: (randomDist(distB) - 3),
        structure: (randomDist(distOx) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.conscient);
        for (let i = 0; i < prop.length; i++) {
          npc.core.conscient[prop] += setup.npcSetting.persCore[4][i];
        }
      }
      npc.core.loyalty = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        betrayal: (randomDist(distC) - 3),
        cheating: (randomDist(distC) - 3),
        effort: (randomDist(distB) - 3),
        permanence: (randomDist(distV) - 3),
        family: (randomDist(distV) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.loyalty);
        for (let i = 0; i < prop.length; i++) {
          npc.core.loyalty[prop] += setup.npcSetting.persCore[5][i];
        }
      }
      npc.core.curiosity = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        complex: (randomDist(distB) - 3),
        learning: (randomDist(distB) - 3),
        abstract: (randomDist(distV) - 3),
        curiosity: (randomDist(distB) - 3),
        novelty: (randomDist(distCx) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.curiosity);
        for (let i = 0; i < prop.length; i++) {
          npc.core.curiosity[prop] += setup.npcSetting.persCore[6][i];
        }
      }
      npc.core.neurotic = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        impulsive: (randomDist(distCx) - 3),
        unstable: (randomDist(dist) - 3),
        addiction: (randomDist(distBx) - 3),
        anxiety: (randomDist(distV) - 3),
        sensitive: (randomDist(distBx) - 3),
        anger: (randomDist(distBx) - 3),
        sadness: (randomDist(distV) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.neurotic);
        for (let i = 0; i < prop.length; i++) {
          npc.core.neurotic[prop] += setup.npcSetting.persCore[7][i];
        }
      }
      npc.core.ego = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        selfinterest: (randomDist(distBx) - 3),
        selfworth: (randomDist(dist) - 3),
        confidence: (randomDist(dist) - 3),
        fragility: (randomDist(distBx) - 3),
        selfimage: (randomDist(dist) - 3),
        mach: (randomDist(distB) - 3),
        risk: (randomDist(distCx) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.ego);
        for (let i = 0; i < prop.length; i++) {
          npc.core.ego[prop] += setup.npcSetting.persCore[8][i];
        }
      }
      if (setup.npcSetting.persCore[0]) {
        const node = [
          "ego",
          "neurotic",
          "curiosity",
          "loyalty",
          "conscient",
          "agreeable",
          "morality",
          "procreate",
        ];
        for (let i = 0; i < node.length; i++) {
          prop = Object.keys(npc.core[node[i]]);
          for (let j = 0; j < prop.length; j++) {
            if (npc.core[node[i]][prop[j]] > 3) {
              npc.core[node[i]][prop[j]] = 3;
            } else if (npc.core[node[i]][prop[j]] < -3) {
              npc.core[node[i]][prop[j]] = -3;
            } else if (npc.core[node[i]][prop[j]] === 0) {
              npc.core[node[i]][prop[j]] = either(-1, 1);
            }
          }
        }
      }
    }

    function generateFemalePersonality(npc) {
      /*create some kind of personality mumbo jumbo ;)*/
      npc.core.will = (randomDist([7, 15, 20, 16, 20, 15, 7]) - 3);
      npc.core.libido = (randomDist([2, 8, 13, 18, 22, 25, 12]) - 3);
      npc.core.open = (randomDist([7, 20, 20, 15, 20, 12, 6]) - 3);
      npc.core.vert = (randomDist([7, 20, 20, 15, 20, 12, 6]) - 3);
      /*
      determine modifier for generating perversion w/ differently-weighted stats.
      libido = 2xopenness = 4xwill or vert
      */
      let t = Math.abs(Math.round((Math.round(((4 - npc.core.will) + (4 - npc.core.vert)) / 2) +
        npc.core.libido + (4 + npc.core.open) / 3)));
      npc.core.perv = random(2, 7) * t + random(0, 10);
      t = Math.max(0, (t + (npc.core.vert * -1)));
      npc.core.corrupt = random(1, 10) + random(2, 7) * t;
      let iq = 19;
      if (setup.npcSetting.iq[0]) {
        iq += setup.npcSetting.iq[1];
      }
      iq += randomDist([2, 4, 8, 4, 2]);
      t = npc.bground.wealth;
      if (t < -1) {
        t += 1;
      } else if (t > 1) {
        t -= 1;
      }
      t += npc.core.open + npc.core.vert;
      if (t > 6) {
        t = 6;
      } else if (t < -6) {
        t = -6;
      } else if (t < -4) {
        t = -4;
      }
      npc.core.diq = iq + t;
      npc.core.iq = npc.core.diq * 5 + (random(0, 5) - 2);
      npc.core.diq -= 20;
      npc.core.bimbo = random(1, 3);
      t = npc.core.diq * -1 + 2;
      if (npc.core.diq > 0) {
        for (let i = 0; i < t; i++) {
          npc.core.bimbo += random(5, 10);
        }
      }
      npc.core.op = false;
      npc.core.cl = false;
      npc.core.intro = false;
      npc.core.extro = false;
      if (npc.core.open > 1) {
        npc.core.op = true;
      } else if (npc.core.open < -1) {
        npc.core.cl = true;
      }
      if (npc.core.vert > 1) {
        npc.core.intro = true;
      } else if (npc.core.vert < -1) {
        npc.core.extro = true;
      }
      if (homo === 1) {
        npc.core.sexuality = 0;
        npc.core.straight = true;
        npc.core.bi = false;
        npc.core.homo = false;
      } else if (homo === 2) {
        npc.core.sexuality = 1;
        npc.core.straight = false;
        npc.core.bi = true;
        npc.core.homo = false;
      } else if (homo === 3) {
        npc.core.sexuality = 2;
        npc.core.straight = false;
        npc.core.bi = false;
        npc.core.homo = true;
      } else {
        const arr = [0, 1, 2];
        let ar = [93, 5, 2];
        npc.core.sexuality = arr[randomDist(ar)];
        if (setup.npcSetting.homo[0] && !setup.npcSetting.homo[1][0]) {
          ar = [10, 0];
        } else if (setup.npcSetting.homo[0]) {
          switch (setup.npcSetting.homo[1][1]) {
          case -2:
            ar = [97, 2, 1];
            break;
          case -1:
            ar = [93, 5, 2];
            break;
          case 0:
            ar = [90, 7, 3];
            break;
          case 1:
            ar = [80, 15, 5];
            break;
          case 2:
            ar = [50, 40, 10];
            break;
          }
        }
        npc.core.sexuality = arr[randomDist(ar)];
        if (npc.core.sexuality === 0) {
          npc.core.sexuality = 0;
          npc.core.straight = true;
          npc.core.bi = false;
          npc.core.homo = false;
        } else if (npc.core.sexuality === 1) {
          npc.core.sexuality = 1;
          npc.core.straight = false;
          npc.core.bi = true;
          npc.core.homo = false;
        } else {
          npc.core.sexuality = 2;
          npc.core.straight = false;
          npc.core.bi = false;
          npc.core.homo = true;
        }
      }
      const dist = [10, 20, 20, 0, 20, 20, 10];
      let distO;
      let distOx;
      let distV;
      let distVx;
      let distB;
      let distBx;
      let distC;
      let distCx;
      if (npc.core.op) {
        distO = [5, 15, 15, 0, 25, 25, 15];
        distOx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.cl) {
        distO = [15, 25, 25, 0, 15, 15, 5];
        distOx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distO = [10, 20, 20, 0, 20, 20, 10];
        distOx = [10, 20, 20, 0, 20, 20, 10];
      }
      if (npc.core.intro) {
        distV = [5, 15, 15, 0, 25, 25, 15];
        distVx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.extro) {
        distV = [15, 25, 25, 0, 15, 15, 5];
        distVx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distV = [10, 20, 20, 0, 20, 20, 10];
        distVx = [10, 20, 20, 0, 20, 20, 10];
      }
      if (npc.core.op && npc.core.intro) {
        distB = [1, 5, 10, 0, 30, 35, 25];
        distBx = [25, 35, 30, 0, 10, 5, 1];
      } else if ((npc.core.op || npc.core.intro) && !npc.core.cl && !npc.core.extro) {
        distB = [5, 15, 15, 0, 25, 25, 15];
        distBx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.cl && npc.core.extro) {
        distB = [25, 35, 30, 0, 10, 5, 1];
        distBx = [1, 5, 10, 0, 30, 35, 25];
      } else if ((npc.core.cl || npc.core.extro) && !npc.core.op && !npc.core.intro) {
        distB = [15, 25, 25, 0, 15, 15, 5];
        distBx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distB = [10, 20, 20, 0, 20, 20, 10];
        distBx = [10, 20, 20, 0, 20, 20, 10];
      }
      if (npc.core.cl && npc.core.intro) {
        distC = [1, 5, 10, 0, 30, 35, 25];
        distCx = [25, 35, 30, 0, 10, 5, 1];
      } else if ((npc.core.cl && !npc.core.intro && !npc.core.extro) ||
        (npc.core.intro && !npc.core.cl && !npc.core.op)) {
        distC = [5, 15, 15, 0, 25, 25, 15];
        distCx = [15, 25, 25, 0, 15, 15, 5];
      } else if (npc.core.op && npc.core.extro) {
        distC = [25, 35, 30, 0, 10, 5, 1];
        distCx = [1, 5, 10, 0, 30, 35, 25];
      } else if ((npc.core.op && !npc.core.intro && !npc.core.extro) ||
        (npc.core.extro && !npc.core.cl && !npc.core.op)) {
        distC = [15, 25, 25, 0, 15, 15, 5];
        distCx = [5, 15, 15, 0, 25, 25, 15];
      } else {
        distC = [10, 20, 20, 0, 20, 20, 10];
        distCx = [10, 20, 20, 0, 20, 20, 10];
      }
      npc.core.procreate = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        secure: (randomDist(distOx) - 3),
        preg: (randomDist(dist) - 3),
        kids: (randomDist(distC) - 3),
        evolve: (randomDist(dist) - 3),
        pleasure: (randomDist(dist) - 3),
      };
      let prop;
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.procreate);
        for (let i = 0; i < prop.length; i++) {
          npc.core.procreate[prop] += setup.npcSetting.persCore[1][i];
        }
      }
      npc.core.morality = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        life: (randomDist(distB) - 3),
        liberty: (randomDist(distB) - 3),
        property: (randomDist(dist) - 3),
        honesty: (randomDist(distV) - 3),
        integrity: (randomDist(distB) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.morality);
        for (let i = 0; i < prop.length; i++) {
          npc.core.morality[prop] += setup.npcSetting.persCore[2][i];
        }
      }
      npc.core.agreeable = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        interest: (randomDist(distO) - 3),
        empathy: (randomDist(distB) - 3),
        caring: (randomDist(distB) - 3),
        trust: (randomDist(distC) - 3),
        altruism: (randomDist(dist) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.agreeable);
        for (let i = 0; i < prop.length; i++) {
          npc.core.agreeable[prop] += setup.npcSetting.persCore[3][i];
        }
      }
      npc.core.conscient = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        thoughtful: (randomDist(distV) - 3),
        responsible: (randomDist(distC) - 3),
        attention: (randomDist(distC) - 3),
        trustworthy: (randomDist(distB) - 3),
        structure: (randomDist(distOx) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.conscient);
        for (let i = 0; i < prop.length; i++) {
          npc.core.conscient[prop] += setup.npcSetting.persCore[4][i];
        }
      }
      npc.core.loyalty = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        betrayal: (randomDist(distC) - 3),
        cheating: (randomDist(distC) - 3),
        effort: (randomDist(distB) - 3),
        permanence: (randomDist(distV) - 3),
        family: (randomDist(distV) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.loyalty);
        for (let i = 0; i < prop.length; i++) {
          npc.core.loyalty[prop] += setup.npcSetting.persCore[5][i];
        }
      }
      npc.core.curiosity = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        complex: (randomDist(distB) - 3),
        learning: (randomDist(distB) - 3),
        abstract: (randomDist(distV) - 3),
        curiosity: (randomDist(distB) - 3),
        novelty: (randomDist(distCx) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.curiosity);
        for (let i = 0; i < prop.length; i++) {
          npc.core.curiosity[prop] += setup.npcSetting.persCore[6][i];
        }
      }
      npc.core.neurotic = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        impulsive: (randomDist(distCx) - 3),
        unstable: (randomDist(dist) - 3),
        addiction: (randomDist(distBx) - 3),
        anxiety: (randomDist(distV) - 3),
        sensitive: (randomDist(distBx) - 3),
        anger: (randomDist(distBx) - 3),
        sadness: (randomDist(distV) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.neurotic);
        for (let i = 0; i < prop.length; i++) {
          npc.core.neurotic[prop] += setup.npcSetting.persCore[7][i];
        }
      }
      npc.core.ego = {
        str: (randomDist([15, 20, 20, 20, 15]) + 1),
        selfinterest: (randomDist(distBx) - 3),
        selfworth: (randomDist(dist) - 3),
        confidence: (randomDist(dist) - 3),
        fragility: (randomDist(distBx) - 3),
        selfimage: (randomDist(dist) - 3),
        mach: (randomDist(distB) - 3),
        risk: (randomDist(distCx) - 3),
      };
      if (setup.npcSetting.persCore[0]) {
        prop = Object.keys(npc.core.ego);
        for (let i = 0; i < prop.length; i++) {
          npc.core.ego[prop] += setup.npcSetting.persCore[8][i];
        }
      }
      if (setup.npcSetting.persCore[0]) {
        const node = [
          "ego",
          "neurotic",
          "curiosity",
          "loyalty",
          "conscient",
          "agreeable",
          "morality",
          "procreate"
        ];
        for (let i = 0; i < node.length; i++) {
          prop = Object.keys(npc.core[node[i]]);
          for (let j = 0; j < prop.length; j++) {
            if (npc.core[node[i]][prop[j]] > 3) {
              npc.core[node[i]][prop[j]] = 3;
            } else if (npc.core[node[i]][prop[j]] < -3) {
              npc.core[node[i]][prop[j]] = -3;
            } else if (npc.core[node[i]][prop[j]] === 0) {
              npc.core[node[i]][prop[j]] = either(-1, 1);
            }
          }
        }
      }
    }
    function determineTraits(npc) {
      let ct = 0;
      if (npc.core.neurotic.anger > 0) {ct++; }
      if (npc.core.ego.selfinterest > 2) {ct++; }
      if (npc.core.agreeable.empathy < -1) {ct++; }
      if (npc.core.conscient.thoughtful < -1) {ct++; }
      if (ct >= 2) {
        npc.core.bitch = 1;
      } else {
        npc.core.bitch = 0;
      }
      if (npc.core.ego.selfinterest > 1 && npc.core.ego.selfimage > 1 && npc.core.ego.selfworth > 1 &&
        npc.core.ego.confidence > 1 && (npc.core.agreeable.str < 3 || npc.core.conscient.str < 3)) {
        npc.core.lowEsteem = -1;
      } else if (npc.core.ego.selfinterest < -1 && npc.core.ego.selfimage < -1 && npc.core.ego.selfworth < -1 &&
        npc.core.ego.confidence < -1 && (npc.core.agreeable.str > 3 || npc.core.conscient.str > 3)) {
        npc.core.lowEsteem = 1;
      } else {
        npc.core.lowEsteem = 0;
      }
    }
    function generateMalePrefs(npc) {
      /*set up the preferences of the NPC*/
      let t;
      let r;
      let list;
      let cunt;
      let kinks;
      if (setup.npcSetting.pref.enabled) {
        npc.pref.Fweight = setup.npcSetting.pref.Fweight;
        npc.pref.Mweight = setup.npcSetting.pref.Mweight;
        npc.pref.Fheight = setup.npcSetting.pref.Fheight;
        npc.pref.Mheight = setup.npcSetting.pref.Mheight;
        npc.pref.Fmuscle = setup.npcSetting.pref.Fmuscle;
        npc.pref.Mmuscle = setup.npcSetting.pref.Mmuscle;
        npc.pref.Fother = setup.npcSetting.pref.Fother;
        npc.pref.Mother = setup.npcSetting.pref.Mother;
      } else {
        npc.pref.Fweight = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([15, 67, 15, 2, 1]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Mweight = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([15, 67, 15, 2, 1]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Fheight = [
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 7, 20, 70]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Mheight = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
        ];
        npc.pref.Fmuscle = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 7, 20, 70]) - 2),
          (randomDist([25, 63, 10, 2, 1]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Mmuscle = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([25, 63, 10, 2, 1]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 7, 20, 70]) - 2),
          (randomDist([15, 50, 20, 15, 1]) - 2),
          (randomDist([60, 25, 10, 4, 1]) - 2),
        ];
        npc.pref.Fother = [
          (randomDist([70, 20, 7, 2, 1]) - 2), /*largetit*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*smallboob*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*largehips*/
          (randomDist([1, 2, 7, 20, 70]) - 2), /*smallhips*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*smart*/
          (randomDist([70, 20, 7, 2, 1]) - 2), /*dumb*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*stylish*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*makeup*/
          (randomDist([1, 2, 7, 20, 70]) - 2), /*largeass*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*smallass*/
        ];
        npc.pref.Mother = [
          (randomDist([70, 20, 7, 2, 1]) - 2), /*bald*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*facehair*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*smrt*/
          (randomDist([1, 2, 7, 20, 70]) - 2), /*dumb*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*wealthy*/
          (randomDist([70, 20, 7, 2, 1]) - 2), /*poor*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*stylish*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*Ldick*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*Sdick*/
        ];
      }
      npc.pref.active = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      npc.pref.romance = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      if (npc.core.open > 1) {
        npc.pref.novel = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.excite = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.night = randomDist([5, 15, 15, 0, 25, 25, 15]) - 3;
      } else if (npc.core.open < -1) {
        npc.pref.novel = randomDist([20, 35, 30, 0, 10, 4, 1]) - 3;
        npc.pref.excite = randomDist([20, 35, 30, 0, 10, 4, 1]) - 3;
        npc.pref.night = randomDist([15, 25, 25, 0, 15, 15, 5]) - 3;
      } else {
        npc.pref.novel = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.excite = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.night = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      }
      if (npc.core.vert > 1) {
        npc.pref.expensive = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.fancy = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.popular = randomDist([20, 25, 25, 0, 15, 10, 5]) - 3;
      } else if (npc.core.vert < -1) {
        npc.pref.expensive = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.fancy = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.popular = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
      } else {
        npc.pref.expensive = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.fancy = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.popular = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      }
      list = [
        "missionary",
        "doggy",
        "standing",
        "cowgirl",
        "reversecowgirl",
        "squat",
        "facetoface",
        "standing",
        "speedbump",
        "spoon",
        "sides",
      ];
      npc.pref.position = [];
      cunt = list.length;
      for (let i = 0; i < cunt; i++) {
        t = random(1, list.length) - 1;
        npc.pref.position.push(list[t]);
        list.splice(t, 1);
      }
      r = random(1, 7);
      if (r > 1) {
        npc.pref.sexact = ["vaginal", "anal"];
      } else {
        npc.pref.sexact = ["anal", "vaginal"];
      }
      list = ["giveOral", "recOral", "giveHand", "recHand", "makeout"];
      cunt = list.length;
      for (let i = 0; i < cunt; i++) {
        t = random(1, list.length) - 1;
        npc.pref.sexact.push(list[t]);
        list.splice(t, 1);
      }
      npc.pref.kinks = [];
      r = npc.core.open + npc.core.libido + Math.max(0, npc.core.neurotic.addiction) +
        Math.floor((npc.core.perv / 15) + (npc.core.corrupt / 20) + (npc.core.bimbo / 40));
      if (r < 1) {
        r = 1;
      }
      kinks = [r, Math.round(r / 2), Math.round(r / 4)];
      if (kinks[0] > 10) {
        kinks[1] += kinks[0] - 10;
        kinks[0] = 10;
      }
      if (kinks[1] > 8) {
        kinks[2] += kinks[1] - 8;
        kinks[1] = 8;
      }
      if (kinks[2] > 5) {
        kinks[2] = 5;
      }
      list = [
        "risky",
        "sub",
        "exhibition",
        "oral",
        "anal",
        "oral",
        "anal",
        "liberate",
        "shame",
        "nips",
        "hard",
        "fap",
        "easy",
      ];
      for (let i = 0; i < kinks[0]; i++) {
        t = random(1, list.length) - 1;
        npc.pref.kinks.push(list[t]);
        list.splice(t, 1);
      }
      list = [
        "force",
        "cumSlut",
        "public",
        "slut",
        "liberate",
        "water",
        "bond",
        "dom",
        "group",
        "pregnancy",
        "buttSlut",
        "risky",
        "exhibition",
        "sizequeen",
      ];
      for (let i = 0; i < kinks[1]; i++) {
        t = random(1, list.length) - 1;
        npc.pref.kinks.push(list[t]);
        list.splice(t, 1);
      }
      list = [
        "superSlut",
        "superSlut",
        "hyperSlut",
        "rape",
        "rape",
        "force",
        "force",
        "cumSlut",
        "cumSlut",
        "pregnancy",
        "pregnancy",
        "sizequeen",
        "sizequeen",
      ];
      for (let i = 0; i < kinks[2]; i++) {
        t = random(1, list.length) - 1;
        npc.pref.kinks.push(list[t]);
        list.splice(t, 1);
      }
    }

    function generateFemalePrefs(npc) {
      /*set up the preferences of the NPC*/
      let t;
      let r;
      let list;
      let cunt;
      let kinks;
      if (setup.npcSetting.pref.enabled) {
        npc.pref.Fweight = setup.npcSetting.pref.Fweight;
        npc.pref.Mweight = setup.npcSetting.pref.Mweight;
        npc.pref.Fheight = setup.npcSetting.pref.Fheight;
        npc.pref.Mheight = setup.npcSetting.pref.Mheight;
        npc.pref.Fmuscle = setup.npcSetting.pref.Fmuscle;
        npc.pref.Mmuscle = setup.npcSetting.pref.Mmuscle;
        npc.pref.Fother = setup.npcSetting.pref.Fother;
        npc.pref.Mother = setup.npcSetting.pref.Mother;
      } else {
        npc.pref.Fweight = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([15, 67, 15, 2, 1]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Mweight = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([15, 67, 15, 2, 1]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Fheight = [
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 7, 20, 70]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Mheight = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([15, 63, 20, 2, 1]) - 2),
        ];
        npc.pref.Fmuscle = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 20, 57, 20]) - 2),
          (randomDist([1, 2, 7, 20, 70]) - 2),
          (randomDist([25, 63, 10, 2, 1]) - 2),
          (randomDist([70, 20, 7, 2, 1]) - 2),
        ];
        npc.pref.Mmuscle = [
          (randomDist([70, 20, 7, 2, 1]) - 2),
          (randomDist([25, 63, 10, 2, 1]) - 2),
          (randomDist([2, 23, 50, 23, 2]) - 2),
          (randomDist([1, 2, 7, 20, 70]) - 2),
          (randomDist([15, 50, 20, 15, 1]) - 2),
          (randomDist([60, 25, 10, 4, 1]) - 2),
        ];
        npc.pref.Fother = [
          (randomDist([70, 20, 7, 2, 1]) - 2), /*largetit*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*smallboob*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*largehips*/
          (randomDist([1, 2, 7, 20, 70]) - 2), /*smallhips*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*smart*/
          (randomDist([70, 20, 7, 2, 1]) - 2), /*dumb*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*stylish*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*makeup*/
          (randomDist([1, 2, 7, 20, 70]) - 2), /*largeass*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*smallass*/
        ];
        npc.pref.Mother = [
          (randomDist([70, 20, 7, 2, 1]) - 2), /*bald*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*facehair*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*smrt*/
          (randomDist([1, 2, 7, 20, 70]) - 2), /*dumb*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*wealthy*/
          (randomDist([70, 20, 7, 2, 1]) - 2), /*poor*/
          (randomDist([25, 63, 10, 2, 1]) - 2), /*stylish*/
          (randomDist([2, 23, 50, 23, 2]) - 2), /*Ldick*/
          (randomDist([15, 50, 20, 15, 1]) - 2), /*Sdick*/
        ];
      }
      npc.pref.active = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      npc.pref.romance = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      if (npc.core.open > 1) {
        npc.pref.novel = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.excite = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.night = randomDist([5, 15, 15, 0, 25, 25, 15]) - 3;
      } else if (npc.core.open < -1) {
        npc.pref.novel = randomDist([20, 35, 30, 0, 10, 4, 1]) - 3;
        npc.pref.excite = randomDist([20, 35, 30, 0, 10, 4, 1]) - 3;
        npc.pref.night = randomDist([15, 25, 25, 0, 15, 15, 5]) - 3;
      } else {
        npc.pref.novel = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.excite = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.night = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      }
      if (npc.core.vert > 1) {
        npc.pref.expensive = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.fancy = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.popular = randomDist([20, 25, 25, 0, 15, 10, 5]) - 3;
      } else if (npc.core.vert < -1) {
        npc.pref.expensive = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.fancy = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
        npc.pref.popular = randomDist([1, 4, 10, 0, 30, 35, 20]) - 3;
      } else {
        npc.pref.expensive = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.fancy = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
        npc.pref.popular = randomDist([10, 20, 20, 0, 20, 20, 10]) - 3;
      }
      list = [
        "missionary",
        "doggy",
        "standing",
        "cowgirl",
        "reversecowgirl",
        "squat",
        "facetoface",
        "standing",
        "speedbump",
        "spoon",
        "sides",
      ];
      npc.pref.position = [];
      cunt = list.length;
      for (let i = 0; i < cunt; i++) {
        t = random(1, list.length) - 1;
        npc.pref.position.push(list[t]);
        list.splice(t, 1);
      }
      r = random(1, 10);
      if (r > 1) {
        npc.pref.sexact = ["vaginal", "anal"];
      } else {
        npc.pref.sexact = ["anal", "vaginal"];
      }
      list = ["giveOral", "recOral", "giveHand", "recHand", "makeout"];
      cunt = list.length;
      for (let i = 0; i < cunt; i++) {
        t = random(1, list.length) - 1;
        npc.pref.sexact.push(list[t]);
        list.splice(t, 1);
      }
      npc.pref.kinks = [];
      r = npc.core.open + npc.core.libido + Math.max(0, npc.core.neurotic.addiction) +
        Math.floor((npc.core.perv / 15) + (npc.core.corrupt / 20) + (npc.core.bimbo / 40));
      if (r < 1) {
        r = 1;
      }
      kinks = [r, Math.round(r / 2), Math.round(r / 4)];
      if (kinks[0] > 10) {
        kinks[1] += kinks[0] - 10;
        kinks[0] = 10;
      }
      if (kinks[1] > 8) {
        kinks[2] += kinks[1] - 8;
        kinks[1] = 8;
      }
      if (kinks[2] > 5) {
        kinks[2] = 5;
      }
      list = list = [
        "risky",
        "sub",
        "exhibition",
        "oral",
        "anal",
        "oral",
        "anal",
        "liberate",
        "shame",
        "nips",
        "hard",
        "fap",
        "easy",
      ];
      for (let i = 0; i < kinks[0]; i++) {
        t = random(1, list.length) - 1;
        npc.pref.kinks.push(list[t]);
        list.splice(t, 1);
      }
      list = [
        "force",
        "cumSlut",
        "public",
        "slut",
        "liberate",
        "water",
        "bond",
        "dom",
        "group",
        "pregnancy",
        "buttSlut",
        "risky",
        "exhibition",
        "sizequeen",
      ];
      for (let i = 0; i < kinks[1]; i++) {
        t = random(1, list.length) - 1;
        npc.pref.kinks.push(list[t]);
        list.splice(t, 1);
      }
      list = [
        "superSlut",
        "superSlut",
        "hyperSlut",
        "rape",
        "rape",
        "force",
        "force",
        "cumSlut",
        "cumSlut",
        "pregnancy",
        "pregnancy",
        "sizequeen",
        "sizequeen",
      ];
      for (let i = 0; i < kinks[2]; i++) {
        t = random(1, list.length) - 1;
        npc.pref.kinks.push(list[t]);
        list.splice(t, 1);
      }
    }

    function generateMaleOutfits(npc) {
      /*sets up their wardrobe*/
    }

    function generateFemaleOutfits(npc) {
      /*sets up their wardrobe*/
    }

    function donSomeClothing(npc) {
      /*puts on some clothing from the NPC's wardrobe*/
    }

    function determineFemaleNPCportrait(npc) {
      /*will start picking portrait by attributes better later*/
      if (npc.main.age < 24) {
        npc.main.portrait = either("[img[IMG_NPC_18-Black]]", "[img[IMG_NPC_18-Blue]]");
      } else if (npc.main.age < 29) {
        npc.main.portrait = either("[img[IMG_NPC_20-Red]]", "[img[IMG_NPC_20-Green");
      } else {
        npc.main.portrait = either("[img[IMG_NPC_30-Black]]", "[img[IMG_NPC_30-Blonde]]");
      }
    }
    /*GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG*/
    /*GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG*/
    function generateRandomNPC(npcid, gen, destArry, arch, wealth, age, homo, race) {
      /*determine the NPC's gender*/
      let rand;
      let cock = 0;
      let arc;
      let ar;
      let res;
      let gender;
      rand = Math.floor(randomFloat(100)) + 1;
      if (rand > gen) {
        cock++;
      }
      rand = Math.floor(randomFloat(100)) + 1;
      if (rand > gen) {
        cock++;
      }
      rand = Math.floor(randomFloat(100)) + 1;
      if (rand > gen) {
        cock++;
      }
      rand = Math.floor(randomFloat(10000)) + 1;
      if (rand <= setup.npcSetting.futaRate) {
        if (cock > 2 && setup.npcSetting.futaMale) {
          gender = 4; /*male-type futa*/
        } else {
          gender = 3; /*female-type futa*/
        }
      } else if (cock > 1) {
        /*is male npc*/
        gender = 1;
      } else {
        /*is female NPC*/
        gender = 2;
      }
      /*determining archetype if player settings are in effect*/
      if (arch[0] === -1) {
        arch = determineArchetype(gender);
      }
      /*SET UP BASIC NPC OBJECTS!!!*/
      const npc: any = {
        main: {},
        body: {},
        fert: {},
        bground: {},
        rship: {},
        friends: ["none"],
        flags: {},
        makeout: ["none"],
        clothes: {},
        status: {},
        cond: {},
        outfit: {},
        mutate: {},
        core: {},
        pref: {},
        sched: {},
      };
      npc.main.id = npcid;
      /*determine age and birthday*/
      npc.main.age = generateRandomAge(age[0], age[1]);
      npc.main.bd = generateBirthday(npc.main.age);
      /*set up the essential variables tracking NPC life and such.*/
      setupMainVars(gender, npc);
      racistHitlerFuck(race, npc);
      npc.main.name = setup.nameRandomizer(gender, npc.body.race);
      npc.main.surname = setup.surnameRandomizer(npc.body.race);
      if (gender === 1 || gender === 4) {
        genRandMaleBody(npc);
        mutateNPCmale(npc);
        randomMaleFertility(npc);
        sexualCharacterMale(npc);
      } else {
        genRandFemaleBody(npc);
        mutateNPCfemale(npc);
        randomFemaleFertility(npc);
        sexualCharacterFemale(npc);
      }
      if (gender === 3 || gender === 4) {
        randomFutaFertility(gender, npc);
        sexualCharacterFuta(gender, npc);
      }
      setupNPCflags(npc);
      generateRandomBackground(npc, gender);
      generateNPCrelationship(npc);
      if (gender === 1 || gender === 4) {
        randomMaleFace(npc);
        generateNPCmiscMale(npc);
        generateMalePersonality(npc);
        generateMaleStatus(npc);
        generateMalePrefs(npc);
        generateMaleOutfits(npc);
        npc.main.portrait = setup.porn.maleNPC(npc);
      } else {
        randomFemaleFace(npc);
        generateNPCmiscFemale(npc);
        generateFemalePersonality(npc);
        generateFemaleStatus(npc);
        generateFemalePrefs(npc);
        generateFemaleOutfits(npc);
        determineFemaleNPCportrait(npc);
      }
      determineTraits(npc);
      generateRandomSchedule(npc);
      generateRandomCondition(npc);
      donSomeClothing(npc);
      /*determine the nickname*/
      ar = [75, 25];
      res = randomDist(ar);
      if (res === 0) {
        npc.main.nickname = "none";
      } else {
        npc.main.nickname = setup.nickRandomizer(gender, npc.main.name, npc.body);
      }
      /*construct the actual NPC*/
      npcid = "n" + npcid;
      let success = true;
      try {
        const npcData = setup.npcDataFormat(npc);
        aw.npc[npcid] = new NPC(npcData);
      } catch (er) {
        const ermsg = "Error with NPC constructor for NPCID:" + npcid + " error: " + er;
        console.log(ermsg);
        UI.alert(ermsg);
        success = false;
      }
      /*increment*/
      cunt++;
      /*update vars with new NPC info*/
      if (success) {
        setup.npc.ready.push(npcid);
        if (npc.bground.married) {
          setup.npc.married.push(npcid);
        } else if (npc.bground.rShip) {
          setup.npc.rShip.push(npcid);
        } else {
          setup.npc.single.push(npcid);
        }
        if (npc.main.genes === "XY") {
          setup.npc.male.push(npcid);
        } else if (npc.main.genes === "XX") {
          setup.npc.female.push(npcid);
        } else {
          setup.npc.futa.push(npcid);
        }
        if (npc.main.age < 22) {
          setup.npc.age18to21.push(npcid);
        } else if (npc.main.age < 28) {
          setup.npc.age22to27.push(npcid);
        } else if (npc.main.age < 34) {
          setup.npc.age28to33.push(npcid);
        } else if (npc.main.age < 40) {
          setup.npc.age34to39.push(npcid);
        } else if (npc.main.age < 50) {
          setup.npc.age40to49.push(npcid);
        } else if (npc.main.age < 60) {
          setup.npc.age50to59.push(npcid);
        } else {
          setup.npc.age60plus.push(npcid);
        }
        if (npc.bground.wealth < -1) {
          setup.npc.poor.push(npcid);
        } else if (npc.bground.wealth > 1) {
          setup.npc.wealthy.push(npcid);
        } else {
          setup.npc.middle.push(npcid);
        }
        if (npc.bground.doctor) {
          setup.npc.education.doctor.push(npcid);
        } else if (npc.bground.master) {
          setup.npc.education.master.push(npcid);
        } else if (npc.bground.bachelor) {
          setup.npc.education.bach.push(npcid);
        } else if (npc.bground.associate) {
          setup.npc.education.assoc.push(npcid);
        } else if (npc.bground.hschool) {
          setup.npc.education.hschool.push(npcid);
        } else {
          setup.npc.education.dropout.push(npcid);
        }
        if (logd === 1) {
          report += "\n npc generated: " + npc.main.name + " " + npc.main.surname +
            " race: " + npc.body.race + " genes: " + npc.main.genes + ".";
          State.temporary.testingOutput.push(npc);
          if (gender === 1) {
            males++;
          } else if (gender === 2) {
            females++;
          } else {
            futas++;
          }
        }
      }
    }

    function generateSemiNPC(id, gender, destArry, arch, wealth, age, homo, race) {
      cunt++;
    }
    State.temporary.testingOutput = [];
    let id;
    let males = 0;
    let females = 0;
    let futas = 0;
    let res;
    if (npctype === 1) {
      id = npcid + 1;
      generateSemiNPC(id, gender, destArry, archetype, wealth, age, homo, race);
    } else {
      for (let i = 1; i <= npcnum; i++) {
        id = npcid + i;
        generateRandomNPC(id, gender, destArry, archetype, wealth, age, homo, race);
      }
    }
    console.log(report);
    State.active.variables.NPCount += npcnum;
    if (logd === 1) {
      res = npcnum + " NPCs generated! males: " + males + ", females: " + females + ", futas: " + futas + ".";
      State.temporary.statsShit = res;
      UI.alert(report);
    }
  },
});
/*jQuery.extend(true, {}, npc)*/
