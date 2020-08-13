


setup.getLovers = function() {
  const results: npcid[] = [];
  const keys = Object.keys(aw.npc);
  for (let i = 0, c = keys.length; i < c; i++) {
    const t = aw.npc[keys[i]].rship.category;
    if (t === "dating" || t === "exclusive" || t === "lovers" || t === "engaged" || t === "married") {
      results.push(keys[i]);
    }
  }
  return results;
};

setup.getExclusive = function() {
  const results: npcid[] = [];
  const keys = Object.keys(aw.npc);
  for (let i = 0, c = keys.length; i < c; i++) {
    const t = aw.npc[keys[i]].rship.category;
    if (t === "exclusive" || t === "lovers" || t === "engaged" || t === "married") {
      results.push(keys[i]);
    }
  }
  return results;
};

setup.getFriends = function() {
  const results: npcid[] = [];
  const keys = Object.keys(aw.npc);
  for (let i = 0, c = keys.length; i < c; i++) {
    const t = aw.npc[keys[i]].rship.category;
    if (t === "friend") {
      results.push(keys[i]);
    }
  }
  return results;
};


setup.getNPCs = function(type: string) {
  const results: npcid[] = [];
  const keys = Object.keys(aw.npc);
  for (let i = 0, c = keys.length; i < c; i++) {
    if (aw.npc[keys[i]].rship.category === type) {
      results.push(keys[i]);
    }
  }
  return results;
};



