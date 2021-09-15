/*bathroom functions*/

interface setupBath {
  brushTeeth: () => void;
  pubeLength: object;
  shave: (leg?: boolean, arm?: boolean, biki?: boolean, pube?: boolean) => number;
  shower: ({ quick, vagWash, enema, relax, shaveArm, shaveLeg, shaveGroin, trimPubes }: { quick: boolean, vagWash: boolean, enema: boolean, relax: boolean, shaveArm: boolean, shaveLeg: boolean, shaveGroin: boolean, trimPubes: boolean }) => number;
}


setup.bath = {
  // brushes the character's teeth.
  brushTeeth(): void {
    const t = State.active.variables.time;
    const d = State.active.variables.date;
    aw.L();
    ↂ.pc.groom.lastToothbrush = [t[0], d[0], d[1], d[2]];
    aw.S();
    setup.time.add(5);
    setup.refresh();
    setup.notify("You brushed your teeth");
    return;
  },
  pubeLength : {
    "bushy" : 6,
    "trimmed" : 5,
    "garden" : 5,
    "mohawk" : 4,
    "neatly-trimmed" : 4,
    "bikinitrim" : 5,
    "bikiniline" : 4,
    "triangular" : 4,
    "martini" : 3,
    "heart" : 3,
    "neat patch" : 4,
    "landing-strip" : 3,
    "stamp" : 3,
    "stubble" : 2,
    "brazilian" : 3,
    "shaved" : 1,
    "hairless" : 0,
  },
  // shaves the character
  shave(leg: boolean = false, arm: boolean = false, biki: boolean = false, pube: boolean = false): number {
    const ᛔ = State.active.variables;
    const groom = ↂ.pc.groom;
    let msg = "";
    let time = 0;
    const times = [4, 8, 10, 6];
    const day = ᛔ.date[0];
    const main = ["leghair", "armpit", "pube", "pubeGrow"];
    const label = ["shaved leg hair. ", "shaved armpits. ", "shaved bikini zone.", "trimmed pubes."];
    const ovrd = [arm, leg, pube, biki];
    const count = ["leghairCount", "armpitCount", "bikiniCount", "pubeCount"];
    const freq = ["leghairFreq", "armpitFreq", "bikiniFreq", "pubeFreq"];
    const scheds = [
      [0],
      [1, 2, 3, 4, 5, 6, 7],
      [1, 3, 5, 7],
      [4],
    ];
    for (let i = 0; i < 4; i++) {
      if ((scheds[groom[freq[i]]].includes(day) || ovrd[i]) && groom[main[i]] !== 0) {
        groom[main[i]] = (i !== 2) ? 1 : setup.bath.pubeLength[groom.pubeStyle];
        groom[count[i]] = 0;
        msg += label[i];
        time += times[i];
      }
    }
    aw.con.info(`Shaving: ${leg}, ${arm}, ${biki}, ${pube}, ${pube}`)
    aw.S();
    setup.notify(msg);
    return time;
  },
  // actually process taking a shower
  shower({
    quick = false,
    vagWash = false,
    enema = false,
    relax = false,
    shaveArm = false,
    shaveLeg = false,
    shaveGroin = false,
    trimPubes = false,
  }: {
    quick: boolean,
    vagWash: boolean,
    enema: boolean,
    relax: boolean,
    shaveArm: boolean,
    shaveLeg: boolean,
    shaveGroin: boolean,
    trimPubes: boolean,
  }): number {
    const ᛔ = State.active.variables;
    const groom = ↂ.pc.groom;
    let vag;
    let anus;
    if (enema) {
      if (!State.active.variables.items.has("Sultry Eve Enema Kit")){
        enema = false;
      }
    }
    // aw.L();
    ↂ.pc.status.clean = 0;
    if (vagWash) {
      const props = Object.keys(ↂ.pc.cond.vagFluid);
      if (props.length > 0) {
        for (let i = 0, c = props.length; i < c; i++) {
          if (ↂ.pc.cond.vagFluid[props[i]] <= 7) {
            // kill it
            delete ↂ.pc.cond.vagFluid[props[i]];
          } else {
            ↂ.pc.cond.vagFluid[props[i]] = Math.ceil(ↂ.pc.cond.vagFluid[props[i]] / 2);
          }
        }
      }
    }
    if (enema) { ↂ.pc.cond.anusFluid = {}; }
    ↂ.pc.cond.hair = {};
    ↂ.pc.cond.face = {};
    ↂ.pc.cond.chest = {};
    ↂ.pc.cond.back = {};
    ↂ.pc.cond.hands = {};
    ↂ.pc.cond.stomach = {};
    ↂ.pc.cond.butt = {};
    ↂ.pc.cond.groin = {};
    ↂ.pc.cond.genitals = {};
    ↂ.pc.cond.thighs = {};
    ↂ.pc.cond.legs = {};
    ↂ.pc.cond.feet = {};
    aw.S();
    let time = 15 + random(0, 5);
    if (vagWash) { time += 5; }
    if (enema) { time += 10; }
    if (quick && !vagWash && !enema) {
      time = random(8, 10);
    } else if (relax) {
      // relaxation
      setup.status.anger(-5);
      setup.status.tired(-1, "Refreshed by a relaxing shower");
      let x;
      if (ↂ.pc.status.happy < -5) {
        x = 2;
      } else if (ↂ.pc.status.happy < 1) {
        x = random(1, 2);
      } else if (ↂ.pc.status.happy < 5) {
        x = 1;
      }
      setup.status.happy(x, "Having a nice relaxing shower");
      x = random (3, 7) * -1;
      setup.status.stress(x, "A nice relaxing shower");
    } else {
      setup.status.anger(-3);
      const x = random(1, 3) * -1;
      setup.status.stress(x, "A nice shower");
    }
    time += setup.bath.shave(shaveLeg, shaveArm, shaveGroin, trimPubes);
    setup.tattoo.wash();
    setup.makeup.shower();
    setup.hair.shower();
    return time;
  },
};

