
//   .d8888b.           d8b          d8b      888
//  d88P  Y88b          Y8P          Y8P      888
//  Y88b.                                     888
//   "Y888b.   888  888 888  .d8888b 888  .d88888  .d88b.
//      "Y88b. 888  888 888 d88P"    888 d88" 888 d8P  Y8b
//        "888 888  888 888 888      888 888  888 88888888
//  Y88b  d88P Y88b 888 888 Y88b.    888 Y88b 888 Y8b.
//   "Y8888P"   "Y88888 888  "Y8888P 888  "Y88888  "Y8888

// function to check NPCs and prioritize them for deletion

// NAMESPACE
if (setup.suicide == null) {
  setup.suicide = {} as IntSetupSuicide;
}

// INTERFACE
interface IntSetupSuicide {
  check: () => number;
  score: (id: npcid) => number;
  test: (id: npcid) => boolean;
  list: () => string[];
  goal: () => number;
  killSort: (amt: number, list: string[]) => string[];
  clean: (id: npcid[]) => void;
}

// FUNCTIONS

// CHECK - checks temp NPC count for maintaining numbers.
// if below amount, generates new NPCs. If above, forces extra suicides.
// procs running replacement of fake NPCs
// returns number of generated (positive) or killed (negative)
setup.suicide.check = function(): number {
  const goal = setup.suicide.goal();
  const list = setup.suicide.list();
  const toKill: string[] = [];
  ↂ.flag.suicideList = [];
  let ret = 0;
  // test for base suicidal intent
  for (let i = list.length - 1; i >= 0; i--) { // decrementing
    if (setup.suicide.test(list[i])) {
      toKill.push(list[i]);
      list.deleteAt(i); // allows new final count.
    }
  }
  const curCount = list.length;
  if (curCount < goal) { // need to generate more.
    ret = goal - curCount;
    const cmd = `<<generateNPC ${ret} 0 0 50 0 [0,0] [0,0] [0,0] [0,0] 0 0>>`;
    Wikifier.wikifyEval(cmd);
    aw.con.info(`generated ${ret} new random NPCs.`);
  } else if (curCount > State.active.variables.npcMax) { // need to kill some.
    ret = curCount - State.active.variables.npcMax;
    const kill = setup.suicide.killSort(ret, list);
    toKill.push(...kill);
  } else { // within tolerable range - do nothing.
    aw.con.info(`Suicide Check: NPCs within allowable limit (${curCount} of ${State.active.variables.npcMax}).`);
  }
  if (toKill.length > 0) {
    aw.con.info(`Suiciding ${toKill.length} NPCs. IDs: ${toKill}.`);
    for (let i = 0, c = toKill.length; i < c; i++) {
      ↂ.flag.suicideList.push(aw.npc[toKill[i]].name);
      delete aw.npc[toKill[i]];
    }
    setup.suicide.clean(toKill);
  }
  setup.fakeNPC.fillTo();
  return ret;
};

// TEST - checks NPC to see if they qualify for suicide on their own
setup.suicide.test = function(id: npcid): boolean {
  const ᚥ = aw.npc[id];
  if (ᚥ.main.suicide) { // npc is obviously set for suicide in this case.
    aw.con.info(`${ᚥ}`);
    return true;
  }
  if (!ᚥ.main.seen) { // if never seen, it's a "fresh" NPC still.
    return false;
  }
  if (ᚥ.main.lifetime < 21) { // NPC is too young to die!
    return false;
  }
  if (ᚥ.main.relation) { // if had a relationship, not a target for suicide.
    return false;
  }
  if (Number(id.slice(1)) < 10000) { // do not kill "permanent" NPCs
    return false;
  }
  if (!ᚥ.main.interact && ᚥ.main.count >= 30) { // no interaction after seeing 20 times -> suicide
    return true;
  }
  if (ᚥ.main.interact && ᚥ.main.lifetime >= 21 && ᚥ.main.count >= 35) {
    const rel = [ᚥ.rship.likePC, ᚥ.rship.likeNPC, ᚥ.rship.lovePC, ᚥ.rship.loveNPC];
    let check = false;
    if (rel[0] >= 20 || rel[0] <= -20) { // if value not neutral
      if (rel[0] > -50 && rel[0] < 50) {
        check = true;
      } else { // strong values should hve NPC stick around.
        return false;
      }
    }
    if (rel[1] >= 20 || rel[1] <= -20) {
      if (rel[1] > -50 && rel[1] < 50) {
        check = true;
      } else { // strong values should hve NPC stick around.
        return false;
      }
    }
    if (rel[2] >= 15 || rel[2] <= -15) {
      if (rel[2] > -50 && rel[2] < 50) {
        check = true;
      } else { // strong values should hve NPC stick around.
        return false;
      }
    }
    if (rel[3] >= 15 || rel[3] <= -15) {
      if (rel[3] > -50 && rel[3] < 50) {
        check = true;
      } else { // strong values should hve NPC stick around.
        return false;
      }
    }
    if (check) { // see if worth keeping
      const max = Math.max(Math.abs(rel[0]), Math.abs(rel[1]), Math.abs(rel[2]), Math.abs(rel[3]));
      if (max * 1.5 >= ᚥ.main.lifetime) {
        return true;
      } else {
        return false;
      }
    } else { // no check indicates npc not worth keeping
      return true;
    }
  }
  return true;
};


// returns a basic score to help rank npc for forced execution
setup.suicide.score = function(id: npcid): number {
  const ᚥ = aw.npc[id];
  if (ᚥ.main.relation) {
    return -2;
  }
  if (!ᚥ.main.seen) {
    return -1;
  }
  if (ᚥ.main.suicide) {
    return 99999; // if already flagged for suicide, then points obv high.
  }
  const lt = ᚥ.main.lifetime;
  const ct = ᚥ.main.count;
  const mod = (ᚥ.main.interact) ? 1 : 2;
  const feels = Math.round(Math.abs(ᚥ.rship.likePC + ᚥ.rship.likeNPC + ᚥ.rship.lovePC + ᚥ.rship.loveNPC) / 2);
  const meat = Math.max(ᚥ.rship.dates, ᚥ.rship.hangout);
  const rels = (ᚥ.rship.daysince < 14) ? 100 : 0;
  let s = (lt * 2) * (ct * 0.5) * mod;
  s -= feels;
  s -= meat * 3;
  s -= rels;
  return Math.round(s);
};

// creates array of ids for non-permanent npcs.
setup.suicide.list = function(): string[] {
  const keys = Object.keys(aw.npc);
  const list: string[] = [];
  for (let i = 0, c = keys.length; i < c; i++) {
    if (Number(keys[i].slice(1)) > 10000) {
      list.push(keys[i]);
    }
  }
  return [...list];
};

setup.suicide.goal = function(): number {
  return Math.floor(State.active.variables.npcMax * 0.95);
};

// chooses best candidates for enforced suicide and returns a list.
setup.suicide.killSort = function(amt: number, list: string[]): string[] {
  const scored: any = [];
  const result: any[] = [];
  for (let i = 0, c = list.length; i < c; i++) {
    const item = {
      id: list[i],
      score: setup.suicide.score(list[i]),
    };
    scored.push(item);
  }
  aw.con.obj(scored, "suicide-scored NPCs"); // TODO remove me after testing!
  // note: sorting so that higher index = higher score.
  scored.sort(function(a, b) {
    return a.score - b.score;
  });
  for (let i = 0; i < amt; i++) {
    const x = scored.pop();
    result.push(x.id);
  }
  return result;
};

setup.suicide.clean = function(list: npcid[]): void {
  const ᛞ = setup.npc;
  ᛞ.ready.delete(...list);
  ᛞ.stored.delete(...list);
  ᛞ.single.delete(...list);
  ᛞ.rShip.delete(...list);
  ᛞ.married.delete(...list);
  ᛞ.male.delete(...list);
  ᛞ.female.delete(...list);
  ᛞ.futa.delete(...list);
  ᛞ.age13to17.delete(...list);
  ᛞ.age18to21.delete(...list);
  ᛞ.age22to27.delete(...list);
  ᛞ.age28to33.delete(...list);
  ᛞ.age34to39.delete(...list);
  ᛞ.age40to49.delete(...list);
  ᛞ.age50to59.delete(...list);
  ᛞ.age60plus.delete(...list);
  ᛞ.poor.delete(...list);
  ᛞ.middle.delete(...list);
  ᛞ.wealthy.delete(...list);
  ᛞ.education.dropout.delete(...list);
  ᛞ.education.hschool.delete(...list);
  ᛞ.education.assoc.delete(...list);
  ᛞ.education.bach.delete(...list);
  ᛞ.education.master.delete(...list);
  ᛞ.education.doctor.delete(...list);
  ᛞ.friends.delete(...list);
  ᛞ.bff.delete(...list);
  ᛞ.lover.delete(...list);
  ᛞ.interested.delete(...list);
  ᛞ.fling.delete(...list);
  ᛞ.exes.delete(...list);
  ᛞ.enemies.delete(...list);
};

