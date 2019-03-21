/*
.        d8888 8888888      8888888888                888
.       d88888   888        888                       888
.      d88P888   888        888                       888
.     d88P 888   888        8888888 888  888 88888b.  888  888
.    d88P  888   888        888     888  888 888 "88b 888 .88P
.   d88P   888   888        888     888  888 888  888 888888K
.  d8888888888   888        888     Y88b 888 888  888 888 "88b
. d88P     888 8888888      888      "Y88888 888  888 888  888
.
.    PRIMARY NPC AI FUNCTIONS - SYNAPTIC LEARNING NETWORK
*/

interface setupAI {
  query: (npc: any, note: string, ...tags: string[]) => number;
  record: (npc: NPC, result: any, inputs: object, tags: object, note: string) => void;
  load: () => void;
  normalize: (npc: { core: any }) => any;
  normalTags: (tags: string[]) => number[];
  export: (num?: number) => void;
  saveTraining: () => void;
  runTrain: (index: number) => void;
  tagInfo: (tag: string) => string;
  tagger: (npcid?: string) => void;
  resultWord: (reso: number) => string;
}

interface awAI {
  record: any[];
  prime: any;
  procreate: any;
  morality: any;
  agreeable: any;
  conscient: any;
  loyalty: any;
  curiosity: any;
  neurotic: any;
  ego: any;
}

if (setup.ai === null || setup.ai === undefined) {
  setup.ai = {} as setupAI;
}
if (aw.ai === null || aw.ai === undefined) {
  aw.ai = {} as awAI;
}

setup.synapticVersion = "2.14.6";

// primary function to ask AI a question
setup.ai.query = function(npc: any, note: string, ...tags: string[]): number {
  State.active.variables.proc = {
    start: 0,
    stop: 0,
    time: 0,
    text: "AI-Query",
  };
  State.active.variables.proc.start = performance.now();
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if ("object" === typeof npc) {
    // should be prepared for use in this case
  } else if (pattern.test(npc)) {
    // is npcid
    npc = aw.n(npc);
  } else {
    aw.con.warn(`Invalid NPC sent to ai.query function! (${npc})`);
    return (random(0, 100) / 100); // soft fail
  }
  const normal = setup.ai.normalize(npc);
  const normTags = setup.ai.normalTags(tags);
  // "procreate","morality","agreeable","conscient","loyalty","curiosity","neurotic","ego"
  const inputs = {
    procreate: normal.procreate.concat(normTags),
    morality: normal.morality.concat(normTags),
    agreeable: normal.agreeable.concat(normTags),
    conscient: normal.conscient.concat(normTags),
    loyalty: normal.loyalty.concat(normTags),
    curiosity: normal.curiosity.concat(normTags),
    neurotic: normal.neurotic.concat(normTags),
    ego: normal.ego.concat(normTags),
  };
  aw.con.obj(inputs);
  const result: {[propName: string]: number } = {
    procreate: aw.ai.procreate.activate(inputs.procreate),
    morality: aw.ai.morality.activate(inputs.morality),
    agreeable: aw.ai.agreeable.activate(inputs.agreeable),
    conscient: aw.ai.conscient.activate(inputs.conscient),
    loyalty: aw.ai.loyalty.activate(inputs.loyalty),
    curiosity: aw.ai.curiosity.activate(inputs.curiosity),
    neurotic: aw.ai.neurotic.activate(inputs.neurotic),
    ego: aw.ai.ego.activate(inputs.ego),
    avg: -1,
  };
  aw.con.obj(result);
  let avg = 0;
  let div = 0;
  let total = 0;
  const nodes = ["procreate", "morality", "agreeable", "conscient", "loyalty", "curiosity", "neurotic", "ego"];
  for (let i = 0; i < 8; i++) {
    const x = npc.core[nodes[i]].str;
    div += x;
    total += result[nodes[i]][0] * x;
  }
  aw.con.info(`AI infos: total: ${total}, divisor: ${div}.`);
  avg = Math.round((total / div) * 100); // limits return to value of 0 to 100, easier for peeps to use.
  if (tags.includes("negQ")) { avg = 100 - avg; } // inverts return based on negative question tag.
  result.avg = avg;
  // TODO use final network to generate result from above inputs. for now, we'll use the weighted average of the node networks. stacked networks will be more difficult to train.
  if (State.active.variables.AW.recordAI) { setup.ai.record(npc, result, inputs, tags, note); }
  State.active.variables.proc.stop = performance.now();
  State.active.variables.proc.time = Math.round(State.active.variables.proc.stop - State.active.variables.proc.start);
  aw.con.info(`The final AI result is ${avg} in ${State.active.variables.proc.time}ms.`);
  return avg;
};

// records AI decisions as records to use when reviewing AI decisions
setup.ai.record = function(npc: NPC, result: any, inputs: object, tags: object, note: string) {
  if (aw.ai.record === null || aw.ai.record === undefined) {
    aw.ai.record = [];
  }
  aw.ai.record.push({
    reviewed: false,
    exclude: true,
    hour: new Date().getHours(),
    min: new Date().getMinutes(),
    passage: aw.passage.title,
    note,
    core: clone(npc.core),
    tags: clone(tags),
    result: {
      procreate: Math.round(100 * result.procreate),
      morality:  Math.round(100 * result.morality),
      agreeable:  Math.round(100 * result.agreeable),
      conscient:  Math.round(100 * result.conscient),
      loyalty:  Math.round(100 * result.loyalty),
      curiosity:  Math.round(100 * result.curiosity),
      neurotic:  Math.round(100 * result.neurotic),
      ego:  Math.round(100 * result.ego),
      avg:  result.avg,
    },
    inputs: clone(inputs),
    rating: 0,
    expected: {
      main: "Result Okay",
      procreate: -1,
      morality: -1,
      agreeable: -1,
      conscient: -1,
      loyalty: -1,
      curiosity: -1,
      neurotic: -1,
      ego: -1,
    },
    reason: "none",
    version: setup.version,
  });
};

// loads and initializes AI at start of the game.
setup.ai.load = function(): void {
  if (window.AWAI == null || window.AWAI === undefined) {
    UI.alert(`The data object containing the neural networks for the game's artificial intelligence were not found, so the file is most likely either not loaded or corrupted somehow.`);
    return;
  }
  let success = true;
  try {
    aw.ai.prime = synaptic.Network.fromJSON(JSON.parse(window.AWAI.prime));
    aw.ai.procreate = synaptic.Network.fromJSON(JSON.parse(window.AWAI.procreation));
    aw.ai.morality = synaptic.Network.fromJSON(JSON.parse(window.AWAI.morality));
    aw.ai.agreeable = synaptic.Network.fromJSON(JSON.parse(window.AWAI.agreeable));
    aw.ai.conscient = synaptic.Network.fromJSON(JSON.parse(window.AWAI.conscient));
    aw.ai.loyalty = synaptic.Network.fromJSON(JSON.parse(window.AWAI.loyalty));
    aw.ai.curiosity = synaptic.Network.fromJSON(JSON.parse(window.AWAI.curiosity));
    aw.ai.neurotic = synaptic.Network.fromJSON(JSON.parse(window.AWAI.neurotic));
    aw.ai.ego = synaptic.Network.fromJSON(JSON.parse(window.AWAI.ego));
  } catch (e) {
    success = false;
    aw.con.error("AI Initialization failed!", e);
    UI.alert(`An error caused AI initialization to fail. Please report this to ThaumX along with the following information: ${e.name} - ${e.message}.`);
  }
  /*"prime","procreation","morality","agreeable","conscient","loyalty","curiosity","neurotic","ego"*/
  if (success) { console.log(`AI neural nets loaded and initialized.`); }
  delete window.AWAI;
};

// primary normalization function
setup.ai.normalize = function(npc: {core: any}): any {
  const ten = function(val) {
    return Math.max(0, Math.min(1, Math.abs(val / 100))); // ensures return value >= 0 & <= 1
  };
  const five = function(val) {
    let x;
    switch (val) {
      case 1:
        x = 0;
        break;
      case 2:
        x = 0.25;
        break;
      case 3:
        x = 0.5;
        break;
      case 4:
        x = 0.75;
        break;
      case 5:
        x = 1;
        break;
      default:
        x = 0.5;
        aw.con.warn(`Warning! Invalid NPC value detected (fiveFunc - tags) val: ${val}`);
    }
    return x;
  };
  const six = function(val) {
    let x;
    switch (val) {
      case -3:
        x = 0;
        break;
      case -2:
        x = 0.2;
        break;
      case -1:
        x = 0.4;
        break;
      case 0:
        x = 0.5;
        break;
      case 1:
        x = 0.6;
        break;
      case 2:
        x = 0.8;
        break;
      case 3:
        x = 1;
        break;
      default:
        x = 0.5;
        aw.con.warn(`Warning! Invalid NPC value detected!!! should be -3 to 3. actual: ${val}`);
    }
    return x;
  };
  const nodes = ["procreate", "morality", "agreeable", "conscient", "loyalty", "curiosity", "neurotic", "ego"];
  interface IntNPCnodes {
    main: number[];
    procreate: number[];
    morality: number[];
    conscient: number[];
    loyalty: number[];
    curiosity: number[];
    neurotic: number[];
    agreeable: number[];
    ego: number[];
  }
  const normNPCnodes: IntNPCnodes = {
    main: [],
    procreate: [],
    morality: [],
    conscient: [],
    loyalty: [],
    curiosity: [],
    neurotic: [],
    agreeable: [],
    ego: [],
  };
  normNPCnodes.main = [];
  normNPCnodes.main.push(six(npc.core.will));
  normNPCnodes.main.push(six(npc.core.open));
  normNPCnodes.main.push(six(npc.core.vert));
  normNPCnodes.main.push(ten((npc.core.iq - 50)));
  normNPCnodes.main.push(ten(npc.core.perv));
  normNPCnodes.main.push(ten(npc.core.corrupt));
  normNPCnodes.main.push(ten(npc.core.bimbo));
  for (let i = 0; i < 8; i++) {
    normNPCnodes.main.push(five(npc.core[nodes[i]].str));
  }
  for (let i = 0; i < 8; i++) {
    const keys = Object.keys(npc.core[nodes[i]]);
    normNPCnodes[nodes[i]] = [];
    for (let j = 0, c = keys.length; j < c; j++) {
      if (keys[j] !== "str") {
        normNPCnodes[nodes[i]].push(six(npc.core[nodes[i]][keys[j]]));
      }
    }
  }
  return normNPCnodes;
};

// normalizes tag data into usable values
setup.ai.normalTags = function(tags: string[]): number[] {
  // turns an array of tags into normalized data for AI
  const data: number[] = []; // normalized data, should be length of 41.
  const finder = function(...terms) {
    let retVal = 0;
    for (let i = 0, c = terms.length; i < c; i++) {
      if (tags.includes(terms[i])) {
        retVal = i + 1;
        break;
      }
    }
    return retVal;
  };
  let counter = 0;
  if (tags.includes("negQ")) { counter++; }
  switch (finder("actNPC", "actLover", "actFriend", "actStranger", "actEnemy", "actNemisis")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.66);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0.33);
      data.push(0);
      counter++;
      break;
    case 4:
      data.push(0);
      data.push(0.33);
      counter++;
      break;
    case 5:
      data.push(0);
      data.push(0.66);
      counter++;
      break;
    case 6:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      break;
  }
  switch (finder("tgtNPC", "tgtLover", "tgtFriend", "tgtStranger", "tgtEnemy", "tgtNemisis")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.66);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0.33);
      data.push(0);
      counter++;
      break;
    case 4:
      data.push(0);
      data.push(0.33);
      counter++;
      break;
    case 5:
      data.push(0);
      data.push(0.66);
      counter++;
      break;
    case 6:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      break;
  }
  switch (finder("future", "nearFuture", "recentPast", "past", "distPast")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.5);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0);
      data.push(0.33);
      counter++;
      break;
    case 4:
      data.push(0);
      data.push(0.66);
      counter++;
      break;
    case 5:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      counter++;
      break;
  }
  switch (finder("vGood", "good", "neutEthic", "bad", "vBad")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.5);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0.20);
      data.push(0.20);
      counter++;
      break;
    case 4:
      data.push(0);
      data.push(0.5);
      counter++;
      break;
    case 5:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      break;
  }
  switch (finder("vLoyal", "loyal", "neutral", "disloyal", "vDisloyal")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.5);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0.20);
      data.push(0.20);
      counter++;
      break;
    case 4:
      data.push(0);
      data.push(0.5);
      counter++;
      break;
    case 5:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      break;
  }
  switch (finder("crowd", "group", "intimate", "alone")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.5);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0);
      data.push(0.5);
      counter++;
      break;
    case 4:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      break;
  }
  switch (finder("fancy", "nice", "casual", "sloppy", "crude")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.5);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0.20);
      data.push(0.20);
      counter++;
      break;
    case 4:
      data.push(0);
      data.push(0.5);
      counter++;
      break;
    case 5:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      break;
  }
  switch (finder("perfect", "sexy", "attractive", "neutAtr", "unattractive", "ugly", "disgust")) {
    case 0:
      data.push(0);
      data.push(0);
      break;
    case 1:
      data.push(1);
      data.push(0);
      counter++;
      break;
    case 2:
      data.push(0.66);
      data.push(0);
      counter++;
      break;
    case 3:
      data.push(0.33);
      data.push(0);
      counter++;
      break;
    case 4:
      data.push(0.15);
      data.push(0.15);
      counter++;
      break;
    case 5:
      data.push(0);
      data.push(0.33);
      counter++;
      break;
    case 6:
      data.push(0);
      data.push(0.66);
      counter++;
      break;
    case 7:
      data.push(0);
      data.push(1);
      counter++;
      break;
    default:
      data.push(0);
      data.push(0);
      break;
  }
  // simple tags
  const names = ["speak", "get", "travel", "create", "people", "give", "steal", "sex", "violence", "eat", "child", "sleep", "time", "party", "cheat", "stop", "clean", "work", "health", "emotion", "learn", "life", "bind", "drink", "play"];
  for (let i = 0, c = names.length; i < c; i++) {
    if (tags.includes(names[i])) {
      data.push(1);
      counter++;
    } else {
      data.push(0);
    }
  }
  if (counter < tags.length) {
    aw.con.warn(`AWAI: Normalized tags does not match number of tags! Normalized: ${counter}, Expected: ${tags.length}. typo/mispelling of tag word likely. Tags: ${tags}.`);
  }
  return data;
};

// exports some NPC data
setup.ai.export =  function(num: number = 1): void {
  const ᛝ = aw.npc;
  const npcs = {};
  let key;
  for (let i = 1; i <= num; i++) {
    key = "n100";
    key += (i > 9) ? i : ("0" + i);
    if (ᛝ[key] != null && ᛝ[key] !== undefined && ᛝ[key].core != null && ᛝ[key].core !== undefined) {
      npcs[key] = clone(ᛝ[key].core);
      aw.con.info(`Added NPC with id ${key} to export.`);
    } else {
      UI.alert(`Didn't add NPC with id ${key} as it doesn't exist!`);
    }
  }
  const value = JSON.stringify(npcs);
  // let output = `<div style="font-size:16px;">${value}</div>`;
  // setup.dialog("NPC",output);
  const filename = `NPCcoreExport-${num}.json`;
  const blob = new Blob([value], {
    type: "text/plain;charset=utf-8",
  });
  try {
    saveAs(blob, filename);
  } catch (e) {
    UI.alert(`Unable to save file. ${e.name}: ${e.message}.`);
  }
};

// exports feedback as a JSON
setup.ai.saveTraining = function(): void {
  const outArray: any[] = [];
  for (let i = 0, c = aw.ai.record.length; i < c; i++) {
    if (aw.ai.record[i].reviewed && !aw.ai.record[i].exclude) {
      outArray.push(clone(aw.ai.record[i]));
    }
  }
  if (outArray.length < 1) {
    setup.notify("No records found to export!");
    return;
  }
  const value = JSON.stringify(outArray);
  // let output = `<div style="font-size:16px;">${value}</div>`;
  // setup.dialog("NPC",output);
  const filename = `AW-TrainingNPC.json`;
  const blob = new Blob([value], {
    type: "text/plain;charset=utf-8",
  });
  try {
    saveAs(blob, filename);
  } catch (e) {
    UI.alert(`Unable to save file. ${e.name}: ${e.message}.`);
  }
  aw.ai.record = [];
};

// places new record in place
setup.ai.runTrain = function(index: number): void { // hahahaha
  State.temporary.record = clone(aw.ai.record[index]);
  aw.replace("#ai-main", "<<include [[ai-main]]>>");
  aw.replace("#ai-query", "<<include [[ai-query]]>>");
  aw.replace("#ai-morality", "<<include [[ai-morality]]>>");
  aw.replace("#ai-neurotic", "<<include [[ai-neurotic]]>>");
  aw.replace("#ai-ego", "<<include [[ai-ego]]>>");
  aw.replace("#ai-loyalty", "<<include [[ai-loyalty]]>>");
  aw.replace("#ai-agreeable", "<<include [[ai-agreeable]]>>");
  aw.replace("#ai-procreate", "<<include [[ai-procreate]]>>");
  aw.replace("#ai-curiosity", "<<include [[ai-curiosity]]>>");
  aw.replace("#ai-conscient", "<<include [[ai-conscient]]>>");
};

// returns information on a tag
setup.ai.tagInfo = function(tag: string): string {
  let descript: string = "Description not available at this time.";
  switch (tag) {
    case "negQ":
      descript = "Indicates a negative or 'reverse' query!";
      break;
    case "actNPC":
    case "actLover":
    case "actFriend":
    case "actStranger":
    case "actEnemy":
    case "actNemisis":
      descript = "The 'Actor'. The person performing an action in the query.";
      break;
    case "tgtNPC":
    case "tgtLover":
    case "tgtFriend":
    case "tgtStranger":
    case "tgtEnemy":
    case "tgtNemisis":
      descript = "The 'Target'. The person being affected in the query.";
      break;
    case "future":
    case "nearFuture":
    case "recentPast":
    case "past":
    case "distPast":
      descript = "Time period - the subject of this query happens in this time period.";
      break;
    case "vGood":
    case "good":
    case "neutral":
    case "bad":
    case "vBad":
      descript = "The ethical or moral implications of the query; is the subject good or bad?";
      break;
    case "vLoyal":
    case "loyal":
    case "neutral":
    case "disloyal":
    case "vDisloyal":
      descript = "The query involves an issue of loyalty - the subject involves something that is either loyal or disloyal.";
      break;
    case "crowd":
    case "group":
    case "intimate":
    case "alone":
      descript = "The query involves a social situation with a certain amount of people.";
      break;
    case "fancy":
    case "nice":
    case "casual":
    case "sloppy":
    case "crude":
      descript = "The general formality or fanciness of the situation, from polite to rude and fancy to crude.";
      break;
    case "perfect":
    case "sexy":
    case "attractive":
    case "neutral":
    case "unattractive":
    case "ugly":
    case "disgust":
      descript = "The general attractiveness of the query subject. Is it sexy, kinky, beautiful, or disgusting, squicky, or hideous?";
      break;
    case "speak":
      descript = "Involves talking or discussion";
      break;
    case "get":
      descript = "Involves obtaining something";
      break;
    case "travel":
      descript = "Involves going somewhere else, usually close and not necessarily a trip or anything.";
      break;
    case "create":
      descript = "Involves creating something, usually used in conjunction with another tag. Examples: create + child = have a baby, create + life = get pregnant";
      break;
    case "people":
      descript = "Involves people in general, dealing with strangers in some way, such as customers.";
      break;
    case "give":
      descript = "Involves giving something away";
      break;
    case "steal":
      descript = "Involves stealing something, or taking/acquiring it through underhanded means such as 'stealing the election'.";
      break;
    case "sex":
      descript = "This one should be obvious...";
      break;
    case "violence":
      descript = "Indicates a violent act, often used with other tags to specify the type of violence.";
      break;
    case "eat":
      descript = "Eating something";
      break;
    case "child":
      descript = "Involves a child, children, or the concept of children in combination with other tags.";
      break;
    case "sleep":
      descript = "Involves going to sleep, or being asleep";
      break;
    case "time":
      descript = "Involves a significant amount of time, a long-term thing or a delay until something";
      break;
    case "party":
      descript = "Involves a fun, enjoyable activity or celebration, not necessarily an actual party.";
      break;
    case "cheat":
      descript = "Betray your partner or friend, as in cheating on them or cheating them.";
      break;
    case "stop":
      descript = "indicates stopping or ending a situation or activity that already exists. stopping a date, relationship, or just stop drinking.";
      break;
    case "clean":
      descript = "Involves cleaning, organizing, and/or a generally orderly appearance/environ";
      break;
    case "work":
      descript = "Generally involves work or chore-like activity";
      break;
    case "health":
      descript = "regarding the physical health, or something that affects health in general.";
      break;
    case "emotion":
      descript = "An emotional subject or action, more emotionally charged";
      break;
    case "learn":
      descript = "Involves learning";
      break;
    case "life":
      descript = "Involves life in an abstract sense, from creating it to ending it.";
      break;
    case "bind":
      descript = "Involves being restricted, as in 'I'm in a bind', or in a literal sense as with bondage.";
      break;
    case "drink":
      descript = "consuming intoxicating beverages or substances";
      break;
    case "play":
      descript = "Involves playing or generally engaging in recreation. playing a game, or playing in the pool.";
      break;
  }
  return `<div title="${descript}" style="color:#78c442;font-weight:bold;">${tag}</div>`;
};

// grabs tags from ai demo page
setup.ai.tagger = function(npcid: string = "n101"): void {
  const tagger: string[] = [];
  // tslint:disable-next-line:max-line-length
  const tagList = ["blank", "speak", "get", "travel", "create", "people", "give", "steal", "sex", "violence", "eat", "child", "sleep", "time", "party", "cheat", "stop", "clean", "work", "health", "emotion", "learn", "life", "bind", "drink", "play"];
  try {
  switch (Number($("#tagActor").val())) {
    case 0:
      break;
    case 1:
      tagger.push("actNPC");
      break;
    case 2:
      tagger.push("actLover");
      break;
    case 3:
      tagger.push("actFriend");
      break;
    case 4:
      tagger.push("actStranger");
      break;
    case 5:
      tagger.push("actEnemy");
      break;
    case 6:
      tagger.push("actNemisis");
      break;
  }
  switch (Number($("#tagTarget").val())) {
    case 0:
      break;
    case 1:
      tagger.push("tgtNPC");
      break;
    case 2:
      tagger.push("tgtLover");
      break;
    case 3:
      tagger.push("tgtFriend");
      break;
    case 4:
      tagger.push("tgtStranger");
      break;
    case 5:
      tagger.push("tgtEnemy");
      break;
    case 6:
      tagger.push("tgtNemisis");
      break;
  }
  switch (Number($("#tagTense").val())) {
    case 0:
      break;
    case 1:
      tagger.push("future");
      break;
    case 2:
      tagger.push("nearFuture");
      break;
    case 3:
      tagger.push("recentPast");
      break;
    case 4:
      tagger.push("past");
      break;
    case 5:
      tagger.push("distPast");
      break;
  }
  switch (Number($("#tagEthic").val())) {
    case 0:
      break;
    case 1:
      tagger.push("vGood");
      break;
    case 2:
      tagger.push("good");
      break;
    case 3:
      tagger.push("neutEthic");
      break;
    case 4:
      tagger.push("bad");
      break;
    case 5:
      tagger.push("vBad");
      break;
  }
  switch (Number($("#tagLoyal").val())) {
    case 0:
      break;
    case 1:
      tagger.push("vLoyal");
      break;
    case 2:
      tagger.push("loyal");
      break;
    case 3:
      tagger.push("neutLoyal");
      break;
    case 4:
      tagger.push("disloyal");
      break;
    case 5:
      tagger.push("vDisloyal");
      break;
  }
  switch (Number($("#tagSocial").val())) {
    case 0:
      break;
    case 1:
      tagger.push("crowd");
      break;
    case 2:
      tagger.push("group");
      break;
    case 3:
      tagger.push("intimate");
      break;
    case 4:
      tagger.push("alone");
      break;
  }
  switch (Number($("#tagFancy").val())) {
    case 0:
      break;
    case 1:
      tagger.push("fancy");
      break;
    case 2:
      tagger.push("nice");
      break;
    case 3:
      tagger.push("casual");
      break;
    case 4:
      tagger.push("sloppy");
      break;
    case 5:
      tagger.push("crude");
      break;
  }
  switch (Number($("#tagAtr").val())) {
    case 0:
      break;
    case 1:
      tagger.push("perfect");
      break;
    case 2:
      tagger.push("sexy");
      break;
    case 3:
      tagger.push("attractive");
      break;
    case 4:
      tagger.push("neutAtr");
      break;
    case 5:
      tagger.push("unattractive");
      break;
    case 6:
      tagger.push("ugly");
      break;
    case 7:
      tagger.push("disgust");
      break;
  }
  } catch (e) {alert("error in initial tag read!"); }
  let ck;
  let id;
  try {
  for (let i = 1; i <= 25; i++) {
    id = "#checker" + i;
    ck = $(id).prop("checked");
    if (ck) {
      tagger.push(tagList[i]);
    }
  }
  } catch (e) {alert("error in secondary tag read."); }
  const note = `generated by the AI demo page.`;
  const t1: number = performance.now();
  const reso: number = setup.ai.query(npcid, note, ...tagger);
  const t2: number = performance.now();
  const rWord: string = setup.ai.resultWord(reso);
  let t3: number = t2 - t1;
  let time: string;
  if (t3 >= 1000) {
    t3 = Math.round((10 * t3) / 1000) / 10;
    time = `${t3} seconds`;
  } else {
    t3 = Math.round(t3 / 10) * 10;
    time = `${t3} milliseconds`;
  }
  setup.dialog("Lily's AI Output", `Your query with ${tagger.length} tags has been processed. The result took ${time} to calculate.<br><center><h3>${rWord} (${reso})</h3></center>`);
};

// turns 0 to 100 into a yes-no strength response
setup.ai.resultWord = function(reso: number): string {
  let resoWord: string;
  if (reso <= 10) {
    resoWord = "extremely negative";
  } else if (reso <= 20) {
    resoWord = "strong negative";
  } else if (reso < 35) {
    resoWord = "negative";
  } else if (reso <= 46) {
    resoWord = "weak negative";
  } else if (reso <= 55) {
    resoWord = "neutral";
  } else if (reso <= 65) {
    resoWord = "weak positive";
  } else if (reso < 80) {
    resoWord = "positive";
  } else if (reso < 90) {
    resoWord = "strong positive";
  } else {
    resoWord = "extremely positive";
  }
  return resoWord;
};
