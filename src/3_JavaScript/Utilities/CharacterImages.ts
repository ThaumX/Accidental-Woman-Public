/*
██████╗  ██████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔═══██╗██╔══██╗████╗  ██║
██████╔╝██║   ██║██████╔╝██╔██╗ ██║
██╔═══╝ ██║   ██║██╔══██╗██║╚██╗██║
██║     ╚██████╔╝██║  ██║██║ ╚████║
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝

preparing portraits for game characters
*/

interface setupPorn {
  imgid: (index: number) => string;
  imgclass: (index: number) => string;
  imgElement: (id: string, source: string, classes?: 0 | string) => twee;
  placeholder: string;
  gifrefresh: (targets: string[], sources: string[]) => void | Error;
  followon: (targets: string[], sources: string[]) => void | Error;
  preprint: (imgar: string[]) => string;
  maleNPC: (npc: any) => string;
  showOff: (amt: number) => string;
}

setup.porn = {} as setupPorn;

setup.porn.imgid = function(index: number): string {
  return ("#pornlay" + index);
};

setup.porn.imgclass = function(index: number): string {
  return ("portrait-above" + index);
};

setup.porn.imgElement = function(id: string, source: string, classes: 0|string = 0): twee {
  id = id.trim();
  if (id.slice(0, 1) === "#") {
    id = id.slice(1);
  }
  if (classes === 0) {
    return `<img id="${id}" data-passage="${source}">`;
  } else {
    return `<img id="${id}" data-passage="${source}" class="${classes}">`;
  }
};

setup.porn.placeholder = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEE0AABBNAWeMAeAAAAC7SURBVFhH7dixCcMwEIXhq4TAIFxcYYHBjVfwPJrGw2gXrZIdAvFZWJ2aRA/yPlxd9ZMieY4QEf0Xfy77a61PTHYfrM1a9LD7YKBZkpRZ/ZosDXYdDjTrmDf0rDJ7uw4HmiVTZFa/R1ae7AYANMtpwc7aTmc3AKBZEjKz+tUslMV8qQOVWR3uLJxp+gGaRfQtPqnt5gL6Qgazbeovz/1AfGCPDXg9IHO+/ccGaES4kO1bPkINGyKiXxJ5A/cCjOhWrCv0AAAAAElFTkSuQmCC`;

/*refreshes a list of image elements from arrays of jQuery targets and data-passage sources*/
setup.porn.gifrefresh = function(targets: string[], sources: string[]): void|Error {
  // ensure input is arrays
  if (!Array.isArray(targets) || !Array.isArray(sources)) {
    return new SyntaxError(`Invalid input to setup.gifrefresh(targets,sources) must both be arrays`);
  }
  // make sure there are a matching number of arguments
  if (targets.length !== sources.length) {
    return new SyntaxError(`The number of targets(${targets.length}) and sources(${sources.length}) sent to setup.gifrefresh doesn't match!`);
  }
  // actually set image sources - should happen so quickly that they are completely in sync
  for (let i = 0, l = targets.length; i < l; i++) {
    $(targets[i]).attr("src", "setup.porn.placeholder");
  }
  console.log(`Now doing refresh for ${targets}`);
  setTimeout(() => setup.porn.followon(targets, sources), 100);
};

setup.porn.followon = function(targets: string[], sources: string[]): void|Error {
  for (let i = 0, l = targets.length; i < l; i++) {
    if (Story.has(sources[i])) {
      const passage = Story.get(sources[i]);
      if (passage.tags.includes("Twine.image")) {
        const source = passage.text;
        $(targets[i]).attr("src", source);
      } else {
        return new Error(`invalid image passage type, ${passage.title} is not an image passage.`);
      }
    } else if (setup.imagedata[sources[i]] != null) {
      $(targets[i]).attr("src", setup.imagedata[sources[i]]);
    } else {
      return new Error(`invalid image passage name, ${sources[i]} is not a passage.`);
    }
  }
};

setup.porn.showOff = function(amt: number): string {
  if (amt == null || amt < 1) {
    amt = 1;
  }
  const selected: string[] = [];
  let imgs: string = "";
  const npcKeys = Object.keys(aw.npc);
  for (let i = 0; i < amt;) {
    const key = either(...npcKeys);
    if (!aw.npc[key].main.female && key.length > 5 && !selected.includes(key)) {
      selected.push(key);
      imgs += `NPCID: ${key}, Race: ${aw.npc[key].body.race}, Skin: ${aw.npc[key].body.skinColor}, Hair: ${aw.npc[key].groom.hairColor}.<br>`;
      imgs += aw.npc[key].main.portrait;
      imgs += "<br>";
      i++;
    }
  }
  return `<h2>Example male NPC svgs (${amt})</h2><div id="svgPortraitCunt">${imgs}</div>`;
};

setup.porn.maleNPC = function(npc: any): string {
  const p: setupSVGbuildArg  = {
    sex: "male",
    parts: [],
    colors: [],
    bg: 0,
    bgColor: 0,
  };
  let skin: number;
  switch (npc.body.skinColor) {
    case "pale":
      skin = 1;
      break;
    case "fair":
      skin = 2;
      break;
    case "tanned":
      skin = 3;
      break;
    case "bronzed":
      skin = 4;
      break;
    case "light":
      skin = 5;
      break;
    case "dusky":
      skin = 6;
      break;
    case "dark":
      skin = 7;
      break;
    case "light brown":
      skin = 8;
      break;
    case "brown":
      skin = 9;
      break;
    case "dark brown":
      skin = 10;
      break;
    case "midnight":
      skin = 11;
      break;
    default:
      skin = random(2, 5);
  }
  let hair: number;
  switch (npc.body.hairColor) {
    case "light brown":
      hair = 1;
      break;
    case "brown":
      hair = 2;
      break;
    case "brunette":
      hair = 3;
      break;
    case "black":
      hair = 4;
      break;
    case "platinum blonde":
      hair = 5;
      break;
    case "blonde":
      hair = 6;
      break;
    case "sandy blonde":
      hair = 7;
      break;
    case "dark blonde":
      hair = 8;
      break;
    case "strawberry blonde":
      hair = 9;
      break;
    case "light auburn":
      hair = 10;
      break;
    case "auburn":
      hair = 11;
      break;
    case "Copper":
      hair = 12;
      break;
    case "ginger":
      hair = 13;
      break;
    default:
      hair = random(1, 13);
      break;
  }
  // hairRear
  p.parts.push(0);
  p.colors.push(0);
  // body
  p.parts.push(1);
  p.colors.push(skin);
  // clothes
  p.parts.push(random(1, 16));
  p.colors.push(random(1, 9));
  // ears
  const earNums = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15];
  p.parts.push(either(...earNums));
  p.colors.push(skin);
  // face
  const faceNums = (npc.body.jaw === "normal") ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 19, 21] : [16, 18, 19, 20];
  p.parts.push(either(...faceNums));
  p.colors.push(skin);
  // mouth
  const mouthNums = (npc.body.race === "black" || npc.body.race === "middle eastern") ? [2, 10, 13, 15] : [1, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 16, 17, 18, 19, 20];
  p.parts.push(either(...mouthNums));
  p.colors.push(skin);
  // randomize temporarily
  const mustache = (random(1, 4) === 4) ? true : false;
  const beard = (mustache && random(1, 4) > 2) ? true : false;
  // beard
  if (beard) {
    const beardNums = [1, 3, 4, 5, 7, 8, 9];
    p.parts.push(either(...beardNums));
    p.colors.push(hair);
  } else {
    p.parts.push(0);
    p.colors.push(0);
  }
  // mustache
  if (mustache) {
    const stachNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
    p.parts.push(either(stachNums));
    p.colors.push(hair);
  } else {
    p.parts.push(0);
    p.colors.push(0);
  }
  // nose
  let noseNums: number[];
  const bigNose = ["black", "southeast Asian"];
  const medNose = ["southern European", "hispanic", "south Asian", "middle eastern", "native American"];
  if (bigNose.includes(npc.body.race)) {
    noseNums = [5, 9, 10, 11, 14, 17, 19];
  } else if (medNose.includes(npc.body.race)) {
    noseNums = [5, 9, 10, 11, 14, 17, 19, 1, 2, 3, 7, 8, 16, 1, 2, 3, 7, 8, 16];
  } else {
    noseNums = [1, 2, 3, 7, 8, 16, 3, 4, 12, 13, 15, 18, 20, 3, 4, 12, 13, 15, 18, 20];
  }
  p.parts.push(either(...noseNums));
  p.colors.push(skin);
  // eyes
  const eyeNums = (npc.body.race === "Asian" || npc.body.race === "southeast Asian") ? [4, 2, 15, 10, 9] : [1, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  p.parts.push(either(...eyeNums));
  p.colors.push(0);
  // eyebrows
  const browNums = (medNose.includes(npc.body.race)) ? [1, 9, 5, 6, 10, 12] : [1, 2, 3, 4, 7, 8, 9, 11, 13, 14, 15, 16];
  p.parts.push(either(...browNums));
  p.colors.push(hair);
  // hairFront
  const hairNums = (npc.body.race === "black") ? [2, 3, 7, 11, 13, 20, 2, 3, 7, 11, 13, 20] : [3, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 20];
  if (npc.main.age >= 30) {
    hairNums.push(0, 1, 4, 5, 19);
  }
  if (npc.main.age >= 40) {
    hairNums.push(0, 1, 4, 5, 19);
  }
  if (npc.main.age >= 50) {
    hairNums.push(0, 1, 4, 5, 19, 0, 1, 4, 5, 19);
  }
  p.parts.push(either(...hairNums));
  p.colors.push(hair);
  // hat
  const hatter = random(1, 15);
  if (npc.body.race === "middle eastern" && hatter > 12) {
    p.parts.push(1);
    p.colors.push(random(1, 5));
  } else if (hatter === 1) {
    p.parts.push(2);
    p.colors.push(random(1, 5));
  } else {
    p.parts.push(0);
    p.colors.push(0);
  }
  // glasses
  if (random(1, 3) === 3) {
    p.parts.push(random(1, 11));
  } else {
    p.parts.push(0);
  }
  p.colors.push(0);
  return setup.svg.build(p);
};

/*
0:  hairRear,
1:  body,
2:  clothes,
3:  ears,
4:  face,
5:  mouth,
6:  beard,
7:  mustache,
8:  nose,
9:  eyes,
10: eyebrows,
11: hairFront,
12: hat,
13: eyeglass,
*/
