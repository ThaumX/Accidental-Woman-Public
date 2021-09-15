/*
  GENETICS
*/

interface setupGenetics {
  skin: (mother: string, father: string) => string;
  skinData: {
    [propName: string]: {
      [propName: string]: string;
    };
  };
  hair: (mother: string, father: string) => string;
  hairData: {
    [propName: string]: {
      [propName: string]: string;
    };
  };
  eyes: (mother: string, father: string) => string;
  babyGen: (difficult: boolean, cSec: boolean, fetus: Fetus[]) => void;
}

setup.genetics = {} as setupGenetics;

setup.genetics.skin = function(mother, father) {
  const skins = ["pale", "fair", "tanned", "bronzed", "light", "dusky", "dark", "light brown", "brown", "dark brown", "midnight"];
  if (!skins.includes(mother)) {
    aw.con.warn(`ERROR setup.genetics.skin: invalid mother skincolor "${mother}".`);
    if (skins.includes(father)) {
      return father;
    } else {
      return either("fair", "tanned", "bronzed", "light");
    }
  }
  if (!skins.includes(father)) {
    aw.con.warn(`ERROR setup.genetics.skin: invalid father skincolor "${father}".`);
    if (skins.includes(mother)) {
      return mother;
    } else {
      return either("fair", "tanned", "bronzed", "light");
    }
  }
  return setup.genetics.skinData[mother][father];
};

setup.genetics.skinData = {
  "pale": {
    "pale": "pale",
    "fair": "fair",
    "tanned": "fair",
    "bronzed": "tanned",
    "light": "light",
    "dusky": "light",
    "dark": "dusky",
    "light brown": "bronzed",
    "brown": "light brown",
    "dark brown": "brown",
    "midnight": "brown",
  },
  "fair": {
    "pale": "fair",
    "fair": "fair",
    "tanned": "fair",
    "bronzed": "tanned",
    "light": "light",
    "dusky": "light",
    "dark": "dusky",
    "light brown": "bronzed",
    "brown": "light brown",
    "dark brown": "brown",
    "midnight": "brown",
  },
  "tanned": {
    "pale": "fair",
    "fair": "tanned",
    "tanned": "tanned",
    "bronzed": "bronzed",
    "light": "light",
    "dusky": "dusky",
    "dark": "dusky",
    "light brown": "bronzed",
    "brown": "light brown",
    "dark brown": "brown",
    "midnight": "dark brown",
  },
  "bronzed": {
    "pale": "tanned",
    "fair": "tanned",
    "tanned": "bronzed",
    "bronzed": "bronzed",
    "light": "dusky",
    "dusky": "dusky",
    "dark": "dark",
    "light brown": "light brown",
    "brown": "light brown",
    "dark brown": "brown",
    "midnight": "dark brown",
  },
  "light": {
    "pale": "light",
    "fair": "light",
    "tanned": "light",
    "bronzed": "dusky",
    "light": "light",
    "dusky": "dusky",
    "dark": "dusky",
    "light brown": "dusky",
    "brown": "dark",
    "dark brown": "brown",
    "midnight": "dark brown",
  },
  "dusky": {
    "pale": "light",
    "fair": "light",
    "tanned": "dusky",
    "bronzed": "dusky",
    "light": "dusky",
    "dusky": "dusky",
    "dark": "dusky",
    "light brown": "dark",
    "brown": "dark",
    "dark brown": "dark brown",
    "midnight": "dark brown",
  },
  "dark": {
    "pale": "light",
    "fair": "dusky",
    "tanned": "dusky",
    "bronzed": "dark",
    "light": "dusky",
    "dusky": "dark",
    "dark": "dark",
    "light brown": "dark",
    "brown": "brown",
    "dark brown": "dark brown",
    "midnight": "darl brown",
  },
  "light brown": {
    "pale": "bronzed",
    "fair": "bronzed",
    "tanned": "light brown",
    "bronzed": "light brown",
    "light": "dusky",
    "dusky": "dusky",
    "dark": "dark",
    "light brown": "light brown",
    "brown": "brown",
    "dark brown": "brown",
    "midnight": "dark brown",
  },
  "brown": {
    "pale": "bronzed",
    "fair": "light brown",
    "tanned": "light brown",
    "bronzed": "brown",
    "light": "dark",
    "dusky": "dark",
    "dark": "dark",
    "light brown": "brown",
    "brown": "brown",
    "dark brown": "dark brown",
    "midnight": "midnight",
  },
  "dark brown": {
    "pale": "light brown",
    "fair": "brown",
    "tanned": "brown",
    "bronzed": "dark brown",
    "light": "dark",
    "dusky": "dark",
    "dark": "dark brown",
    "light brown": "brown",
    "brown": "dark brown",
    "dark brown": "dark brown",
    "midnight": "midnight",
  },
  "midnight": {
    "pale": "brown",
    "fair": "brown",
    "tanned": "dark brown",
    "bronzed": "dark brown",
    "light": "dark",
    "dusky": "dark brown",
    "dark": "dark brown",
    "light brown": "dark brown",
    "brown": "dark brown",
    "dark brown": "midnight",
    "midnight": "midnight",
  },
};

setup.genetics.hair = function(mother, father) {
  const hair = ["black", "brunette", "brown", "light brown", "dark blonde", "strawberry blonde", "sandy blonde", "blonde", "platinum blonde", "auburn", "light auburn", "copper", "ginger"];
  if (!hair.includes(mother)) {
    aw.con.warn(`ERROR setup.genetics.hair: invalid mother haircolor "${mother}".`);
    if (hair.includes(father)) {
      return father;
    } else {
      return either("fair", "tanned", "bronzed", "light");
    }
  }
  if (!hair.includes(father)) {
    aw.con.warn(`ERROR setup.genetics.hair: invalid father haircolor "${father}".`);
    if (hair.includes(mother)) {
      return mother;
    } else {
      return either("fair", "tanned", "bronzed", "light");
    }
  }
  return setup.genetics.hairData[mother][father];
};

setup.genetics.hairData = {
  "black": {
    "black": "black",
    "brunette": "black",
    "brown": "brunette",
    "light brown": "brunette",
    "dark blonde": "brown",
    "strawberry blonde": "brown",
    "sandy blonde": "brown",
    "blonde": "brown",
    "platinum blonde": "light brown",
    "auburn": "brunette",
    "light auburn": "auburn",
    "copper": "auburn",
    "ginger": "light auburn",
  },
  "brunette": {
    "black": "black",
    "brunette": "brunette",
    "brown": "brunette",
    "light brown": "brown",
    "dark blonde": "brown",
    "strawberry blonde": "brown",
    "sandy blonde": "brown",
    "blonde": "light brown",
    "platinum blonde": "light brown",
    "auburn": "brunette",
    "light auburn": "auburn",
    "copper": "auburn",
    "ginger": "light auburn",
  },
  "brown": {
    "black": "brunette",
    "brunette": "brunette",
    "brown": "brown",
    "light brown": "brown",
    "dark blonde": "light brown",
    "strawberry blonde": "light brown",
    "sandy blonde": "light brown",
    "blonde": "light brown",
    "platinum blonde": "dark blonde",
    "auburn": "auburn",
    "light auburn": "auburn",
    "copper": "light auburn",
    "ginger": "light auburn",
  },
  "light brown": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "brown",
    "light brown": "light brown",
    "dark blonde": "light brown",
    "strawberry blonde": "dark blonde",
    "sandy blonde": "dark blonde",
    "blonde": "dark blonde",
    "platinum blonde": "blonde",
    "auburn": "auburn",
    "light auburn": "light auburn",
    "copper": "light auburn",
    "ginger": "copper",
  },
  "dark blonde": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "light brown",
    "light brown": "dark blonde",
    "dark blonde": "dark blonde",
    "strawberry blonde": "strawberry blonde",
    "sandy blonde": "dark blonde",
    "blonde": "sandy blonde",
    "platinum blonde": "blonde",
    "auburn": "light auburn",
    "light auburn": "light auburn",
    "copper": "light auburn",
    "ginger": "strawberry blonde",
  },
  "strawberry blonde": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "light brown",
    "light brown": "light brown",
    "dark blonde": "dark blonde",
    "strawberry blonde": "strawberry blonde",
    "sandy blonde": "strawberry blonde",
    "blonde": "strawberry blonde",
    "platinum blonde": "blonde",
    "auburn": "light auburn",
    "light auburn": "light auburn",
    "copper": "light auburn",
    "ginger": "strawberry blonde",
  },
  "sandy blonde": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "light brown",
    "light brown": "light brown",
    "dark blonde": "dark blonde",
    "strawberry blonde": "strawberry blonde",
    "sandy blonde": "sandy blonde",
    "blonde": "sandy blonde",
    "platinum blonde": "blonde",
    "auburn": "light auburn",
    "light auburn": "light auburn",
    "copper": "light auburn",
    "ginger": "strawberry blonde",
  },
  "blonde": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "light brown",
    "light brown": "light brown",
    "dark blonde": "sandy blonde",
    "strawberry blonde": "sandy blonde",
    "sandy blonde": "sandy blonde",
    "blonde": "blonde",
    "platinum blonde": "blonde",
    "auburn": "light auburn",
    "light auburn": "light auburn",
    "copper": "strawberry blonde",
    "ginger": "strawberry blonde",
  },
  "platinum blonde": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "light brown",
    "light brown": "light brown",
    "dark blonde": "sandy blonde",
    "strawberry blonde": "sandy blonde",
    "sandy blonde": "blonde",
    "blonde": "blonde",
    "platinum blonde": "platinum blonde",
    "auburn": "light auburn",
    "light auburn": "light auburn",
    "copper": "strawberry blonde",
    "ginger": "strawberry blonde",
  },
  "auburn": {
    "black": "brunette",
    "brunette": "brunette",
    "brown": "auburn",
    "light brown": "auburn",
    "dark blonde": "auburn",
    "strawberry blonde": "light auburn",
    "sandy blonde": "light auburn",
    "blonde": "copper",
    "platinum blonde": "strawberry blonde",
    "auburn": "auburn",
    "light auburn": "auburn",
    "copper": "light auburn",
    "ginger": "light auburn",
  },
  "light auburn": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "brown",
    "light brown": "light auburn",
    "dark blonde": "light auburn",
    "strawberry blonde": "light auburn",
    "sandy blonde": "light auburn",
    "blonde": "strawberry blonde",
    "platinum blonde": "strawberry blonde",
    "auburn": "auburn",
    "light auburn": "light auburn",
    "copper": "light auburn",
    "ginger": "copper",
  },
  "copper": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "brown",
    "light brown": "light auburn",
    "dark blonde": "light auburn",
    "strawberry blonde": "light auburn",
    "sandy blonde": "strawberry blonde",
    "blonde": "strawberry blonde",
    "platinum blonde": "strawberry blonde",
    "auburn": "light auburn",
    "light auburn": "light auburn",
    "copper": "copper",
    "ginger": "copper",
  },
  "ginger": {
    "black": "brunette",
    "brunette": "brown",
    "brown": "brown",
    "light brown": "light auburn",
    "dark blonde": "light auburn",
    "strawberry blonde": "copper",
    "sandy blonde": "copper",
    "blonde": "strawberry blonde",
    "platinum blonde": "strawberry blonde",
    "auburn": "light auburn",
    "light auburn": "light auburn",
    "copper": "copper",
    "ginger": "ginger",
  },
};

setup.genetics.eyes = function(mother, father) {
  const eyes = ["brown", "hazel", "blue", "light blue", "blue-green", "green", "golden-brown", "green and blue heterochromatic"];
  const darks = ["brown", "hazel", "golden-brown"];
  const blues = ["blue", "light blue"];
  const greens = ["blue-green", "green"];
  // eliminate heterochromatic eyes, they are far to rare to be passed on.
  if (mother === "green and blue heterochromatic") {
    mother = either("green", "blue", "blue");
  }
  if (father === "green and blue heterochromatic") {
    father = either("green", "blue", "blue");
  }
  if (!eyes.includes(mother)) {
    aw.con.warn(`ERROR setup.genetics.skin: invalid mother skincolor "${mother}".`);
    if (eyes.includes(father)) {
      return father;
    } else {
      return either("brown", "brown", "hazel");
    }
  }
  if (!eyes.includes(father)) {
    aw.con.warn(`ERROR setup.genetics.skin: invalid father skincolor "${father}".`);
    if (eyes.includes(mother)) {
      return mother;
    } else {
      return either("brown", "brown", "hazel");
    }
  }
  const rand = random(0, 99);
  if (rand < 30) {
    // mother's eyecolor
    return mother;
  } else if (rand < 60) {
    // father's eyecolor
    return father;
  }
  if (darks.includes(mother) || darks.includes(father)) {
    return either("brown", "brown", "brown", "hazel", "golden-brown");
  }
  if ((blues.includes(mother) && greens.includes(father)) || (greens.includes(mother) && blues.includes(father))) {
    return either("blue-green", "blue-green", "blue", "green");
  }
  if (blues.includes(mother) && blues.includes(father)) {
    return either(mother, father);
  }
  if (greens.includes(mother) && greens.includes(father)) {
    return "green";
  }
  return "brown";
};

setup.genetics.babyGen = function(difficult: boolean, cSec: boolean, fetus: Fetus[]) {
  const momHair = ↂ.pc.groom.hairColor;
  const momEyes = ↂ.pc.body.eyeColor;
  let momSkin = ↂ.pc.body.skinColor;
  if (ↂ.flag.tan > 0) {
    const tan = ↂ.flag.tan;
    ↂ.flag.tan = 0;
    momSkin = ↂ.pc.body.skinColor;
    ↂ.flag.tan = tan;
  }
  const momCurl = ↂ.pc.groom.hairCurl;
  let dadSkin;
  let dadEyes;
  let dadHair;
  let dadCurl;
  let dadRace;
  let ar;
  let subrace;
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
  // use rough population statistics to generate colors for bastard children
  ar = [845, 43, 35, 50, 24, 3];
  const race = randomDist(ar) + 1;
  switch (race) {
    case 1:
      ar = [80, 9, 4, 7];
      subrace = randomDist(ar);
      switch (subrace) {
        case 0:
          /*white*/
          dadRace = "white";
          ar = [2, 5, 7, 1]; /*ignoring later tones*/
          dadSkin = skincolors[randomDist(ar)];
          ar = [2, 4, 8, 4, 3, 2, 0];
          dadEyes = eyecolors[randomDist(ar)];
          ar = [20, 14, 6, 0, 1, 5, 9, 5, 6, 5, 2, 1];
          dadHair = haircolors[randomDist(ar)];
          dadCurl = either(0, 0, 1, 1, 1, 2, 2, 3, 4);
          break;
        case 1:
          dadRace = "southern European";
          ar = [0, 1, 5, 10]; /*ignoring later tones*/
          dadSkin = skincolors[randomDist(ar)];
          ar = [8, 6, 1, 0, 0, 0, 2];
          dadEyes = eyecolors[randomDist(ar)];
          ar = [6, 16, 22, 4, 0, 0, 0, 0, 1, 2, 0, 0];
          dadHair = haircolors[randomDist(ar)];
          dadCurl = either(0, 1, 1, 2, 2, 2, 3, 3, 4, 5);
          break;
        case 2:
          dadRace = "Gaelic";
          ar = [7, 5, 1]; /*ignoring later tones*/
          dadSkin = skincolors[randomDist(ar)];
          ar = [0, 0, 2, 1, 4, 8];
          dadEyes = eyecolors[randomDist(ar)];
          ar = [6, 8, 0, 0, 0, 0, 1, 2, 3, 8, 10, 8, 4]; /*SON ATTACK!*/
          dadHair = haircolors[randomDist(ar)];
          dadCurl = either(0, 1, 1, 2, 2, 2, 3, 3, 4, 5);
          break;
        case 3:
          dadRace = "Nordic";
          ar = [3, 9, 5]; /*ignoring later tones*/
          dadSkin = skincolors[randomDist(ar)];
          ar = [0, 0, 6, 8, 4, 1];
          dadEyes = eyecolors[randomDist(ar)];
          ar = [2, 1, 0, 0, 5, 12, 7, 4, 3, 5, 2, 1, 0];
          dadHair = haircolors[randomDist(ar)];
          dadCurl = either(0, 0, 1, 1, 1, 2, 2, 3, 4);
          break;
      }
      break;
    case 2:
      dadRace = "black";
      ar = [2, 6, 6, 1];
      dadSkin = skincolors[(randomDist(ar) + 6)];
      ar = [8, 2, 0, 0, 0, 0, 1];
      dadEyes = eyecolors[randomDist(ar)];
      ar = [1, 2, 12, 20]; /*SON ATTACK!*/
      dadHair = haircolors[randomDist(ar)];
      dadCurl = either(5, 6, 6, 6, 6);
      break;
    case 3:
      dadRace = "hispanic";
      ar = [1, 15, 0, 2, 0, 3];
      dadSkin = skincolors[(randomDist(ar) + 2)];
      ar = [12, 8, 1, 0, 0, 0, 3];
      dadEyes = eyecolors[randomDist(ar)];
      ar = [4, 8, 20, 8];
      dadHair = haircolors[randomDist(ar)];
      dadCurl = either(0, 1, 1, 2, 2, 2, 3, 4, 5);
      break;
    case 4:
      ar = [45, 40, 15];
      subrace = randomDist(ar);
      switch (subrace) {
        case 0:
          dadRace = "Asian";
          ar = [14, 6, 6];
          dadSkin = skincolors[(randomDist(ar) + 4)];
          ar = [8, 12];
          dadEyes = eyecolors[randomDist(ar)];
          ar = [1, 2, 10, 10];
          dadHair = haircolors[randomDist(ar)];
          dadCurl = either(0, 0, 0, 1);
          break;
        case 1:
          dadRace = "south Asian";
          ar = [2, 5, 10];
          dadSkin = skincolors[(randomDist(ar) + 4)];
          ar = [3, 1];
          dadEyes = eyecolors[randomDist(ar)];
          ar = [0, 0, 6, 12];
          dadHair = haircolors[randomDist(ar)];
          dadCurl = either(0, 0, 1, 1, 2, 2, 3, 4);
          break;
        case 2:
          dadRace = "southeast Asian";
          ar = [2, 1, 10];
          dadSkin = skincolors[(randomDist(ar) + 4)];
          ar = [5, 1];
          dadEyes = eyecolors[randomDist(ar)];
          ar = [0, 1, 6, 10];
          dadHair = haircolors[randomDist(ar)];
          dadCurl = either(0, 0, 0, 1, 1, 2);
          break;
      }
      break;
    case 5:
      dadRace = "middle eastern";
      ar = [5, 0, 8, 0, 8];
      dadSkin = skincolors[(randomDist(ar) + 3)];
      ar = [4, 10, 1, 0, 0, 0, 6];
      dadEyes = eyecolors[randomDist(ar)];
      ar = [1, 2, 6, 15];
      dadHair = haircolors[randomDist(ar)];
      dadCurl = either(1, 2, 2, 3, 3, 3, 4, 4, 5);
      break;
    case 6:
      dadRace = "native American";
      ar = [1, 10, 0, 5, 0, 3];
      dadSkin = skincolors[(randomDist(ar) + 2)];
      ar = [12, 8, 1, 0, 0, 0, 3];
      dadEyes = eyecolors[randomDist(ar)];
      ar = [0, 1, 4, 10];
      dadHair = haircolors[randomDist(ar)];
      dadCurl = either(0, 0, 0, 1, 1, 2);
      break;
  }
  for (const f of fetus) {
    // set base arguments
    const child = {
      mother: f.mother,
      father: f.father,
      health: f.health,
      gender: f.gender,
      flag: clone(f.flag),
      birth: aw.time,
      name: "unnamed",
      surname: ↂ.pc.main.surname,
      dadRace: "unknown",
      hairColor: "unknown",
      hairCurl: 4,
      eyeColor: "unknown",
      skinColor: "unknown",
    };
    // determine child colors based on combo of parents
    if (setup.npcid.test(f.father) && aw.npc[f.father] != null) {
      child.hairColor = setup.genetics.hair(momHair, aw.npc[f.father].groom.hairColor);
      child.eyeColor = setup.genetics.eyes(momEyes, aw.npc[f.father].body.eyeColor);
      child.skinColor = setup.genetics.skin(momSkin, aw.npc[f.father].body.skinColor);
      child.dadRace = aw.npc[f.father].body.race;
      child.hairCurl = Math.ceil((momCurl + aw.npc[f.father].groom.hairCurl) / 2);
    } else {
      // use generated father colors to avoid just cloning the PC
      child.hairColor = setup.genetics.hair(momHair, dadHair);
      child.eyeColor = setup.genetics.eyes(momEyes, dadEyes);
      child.skinColor = setup.genetics.skin(momSkin, dadSkin);
      child.dadRace = dadRace;
      child.hairCurl = Math.ceil((momCurl + dadCurl) / 2);
    }
    if (difficult) {
      child.flag.push("hardBirth");
    }
    if (cSec) {
      child.flag.push("cSecBirth");
    }
    if (f.health < 50) {
      child.flag.push("ill");
    } else if (f.health < 80) {
      child.flag.push("sick");
    }
    ↂ.child.push(new Child(child));
  }
};





