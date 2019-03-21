
setup.sex.prebuild = function(): void {
  const positions = Object.keys(aw.sexPos);
  const actions = Object.keys(aw.sexAct);
  const actionsNPC = Object.keys(aw.sexActN);
  aw.sexActRef = {};
  aw.sexActNRef = {};
  for (const pos of positions) {
    aw.sexActRef[pos] = [];
    const poses = aw.sexPos[pos].pos.length - 1;
    for (let i = 0; i < poses; i++) {
      aw.sexActRef[pos].push({});
    }
    for (const act of actions) {
      // check each action
      if (aw.sexAct[act].tab === "self" || aw.sexAct[act].parts[0] === "skip") {
        // just write good to goes
        for (let i = 0; i < poses; i++) {
          aw.sexActRef[pos][i][act] = true;
        }
      } else {
        for (let i = 0; i < poses; i++) {
          try {
            aw.sexActRef[pos][i][act] = setup.sex.valid(aw.sexAct[act].parts, i, pos);
          } catch (e) {
            aw.con.warn(`setup.sex.prebuild sexAct check via setup.sex.valid failed. setting false.`);
            aw.sexActRef[pos][i][act] = false;
          }
        }
      }
    }
    aw.sexActNRef[pos] = [];
    for (let i = 0; i < poses; i++) {
      aw.sexActNRef[pos].push({});
    }
    for (const act of actionsNPC) {
      // check each action
      if (aw.sexActN[act].tab === "self" || aw.sexActN[act].parts[0] === "skip") {
        // just write good to goes
        for (let i = 0; i < poses; i++) {
          aw.sexActNRef[pos][i][act] = true;
        }
      } else {
        for (let i = 0; i < poses; i++) {
          try {
            aw.sexActNRef[pos][i][act] = setup.sex.valid(aw.sexActN[act].parts, i, pos);
          } catch (e) {
            aw.con.warn(`setup.sex.prebuild sexAct check via setup.sex.valid failed. setting false.`);
            aw.sexActNRef[pos][i][act] = false;
          }
        }
      }
    }
  }
};


