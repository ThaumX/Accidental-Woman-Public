// ██████╗  ██████╗ ██████╗ ██╗   ██╗███████╗████████╗ █████╗ ████████╗██╗   ██╗███████╗
// ██╔══██╗██╔═══██╗██╔══██╗╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║   ██║██╔════╝
// ██████╔╝██║   ██║██║  ██║ ╚████╔╝ ███████╗   ██║   ███████║   ██║   ██║   ██║███████╗
// ██╔══██╗██║   ██║██║  ██║  ╚██╔╝  ╚════██║   ██║   ██╔══██║   ██║   ██║   ██║╚════██║
// ██████╔╝╚██████╔╝██████╔╝   ██║   ███████║   ██║   ██║  ██║   ██║   ╚██████╔╝███████║
// ╚═════╝  ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝

setup.weightCalc = function(): void { // weekly weight and tone calc function
  aw.L();
  if (ↂ.pc.status.nutrition == null) {
    ↂ.pc.status.nutrition = {
      normal: 0,
      dessert: 0,
      health: 0,
      diet: 0,
      junk: 0,
      fast: 0,
    };
  }
  if (ↂ.pc.status.nutrition.fast == null || ↂ.pc.status.nutrition.fast == undefined) {
    ↂ.pc.status.nutrition.fast = 0;
  }
  if (ↂ.pc.status.nutrition.realWeight == null || ↂ.pc.status.nutrition.realWeight === 0) {
    ↂ.pc.status.nutrition.realWeight = setup.initialWeight() as number;
  }
  const foodQuality = [0, 160, 140, 70, 0, -30];
  const weightChange = foodQuality[ↂ.home.finance.sett.foodLevel] + (ↂ.pc.status.nutrition.normal + (ↂ.pc.status.nutrition.dessert * 1.5) + (ↂ.pc.status.nutrition.health / 2) + (ↂ.pc.status.nutrition.diet / 3) + (ↂ.pc.status.nutrition.junk * 2) + (ↂ.pc.status.nutrition.fast * 2) - ↂ.pc.status.exercise);
  const oldWeight = clone(ↂ.pc.body.weight);
  ↂ.pc.status.nutrition.realWeight += Math.round(weightChange / 100); // Kilograms
  ↂ.pc.body.weight = setup.BMItoVal(ↂ.pc.status.nutrition.realWeight);
  if (oldWeight > ↂ.pc.body.weight) {
    ↂ.pc.body.tits.base.size -= random(80, 100);
    setup.breastCalc();
  } else if (oldWeight < ↂ.pc.body.weight) {
    ↂ.pc.body.tits.base.size += random(80, 100);
    setup.breastCalc();
  }
  aw.con.info(`weightCalc: WeightChange is ${weightChange}, realWeight is ${ↂ.pc.status.nutrition.realWeight}. oldWeight is ${oldWeight}.`);
  ↂ.pc.status.exercise = ↂ.pc.status.exercise - (ↂ.pc.body.tone * 7);
  if (ↂ.pc.status.exercise < -300) {
    ↂ.pc.body.tone -= 1;
    ↂ.pc.status.exercise = 0;
  } else if (ↂ.pc.status.exercise > 300) {
    ↂ.pc.body.tone += 1;
    ↂ.pc.status.exercise = 0;
  }
  if (ↂ.pc.body.tone < 1) {
    ↂ.pc.body.tone = 1;
  }
  ↂ.pc.status.nutrition.normal = 0;
  ↂ.pc.status.nutrition.dessert = 0;
  ↂ.pc.status.nutrition.normal = 0;
  ↂ.pc.status.nutrition.health = 0;
  ↂ.pc.status.nutrition.diet = 0;
  ↂ.pc.status.nutrition.fast = 0;
  ↂ.pc.status.nutrition.junk = 0;
  aw.S();
};

setup.valToBMI = function(realWeight: number): number { // converts weight value into BMI
  const what = (ↂ.pc.body.height * ↂ.pc.body.height);
  const a = (realWeight / what);
  const fuck = (1700 * a);
  return Math.round(fuck);
};

setup.isGain = function(): string { // converts weight value into BMI
  if (ↂ.pc.status.nutrition == null) {
    ↂ.pc.status.nutrition = {
      normal: 0,
      dessert: 0,
      health: 0,
      diet: 0,
      junk: 0,
    };
  }
  let out = "ERROR";
  const foodQuality = [0, 160, 140, 70, 0, -30];
  const weightChange = foodQuality[ↂ.home.finance.sett.foodLevel] + (ↂ.pc.status.nutrition.normal + (ↂ.pc.status.nutrition.dessert * 1.5) + (ↂ.pc.status.nutrition.health / 2) + (ↂ.pc.status.nutrition.diet / 3) + (ↂ.pc.status.nutrition.junk * 2) + (ↂ.pc.status.nutrition.fast * 2) - ↂ.pc.status.exercise);
  if (weightChange > 100) {
    out = "is skewed towards gaining mass";
  } else if (weightChange < -100) {
    out = "is skewed towards loosing mass";
  } else {
    out = "stable";
  }
  return out;
};

setup.BMItoVal = function(realWeight: number): number { // converts weight value into 1-9 char value
  // const bmis = [0, 18, 20, 22, 24, 26, 28, 31, 34, 37];
  const bmi = Math.round(1700 * (realWeight / (ↂ.pc.body.height * ↂ.pc.body.height)));
  let res = 0;
  if (bmi <= 18) {
    res = 1;
  } else if (bmi > 18 && bmi <= 20) {
    res = 2;
  } else if (bmi > 20 && bmi <= 22) {
    res = 3;
  } else if (bmi > 22 && bmi <= 24) {
    res = 4;
  } else if (bmi > 24 && bmi <= 26) {
    res = 5;
  } else if (bmi > 26 && bmi <= 28) {
    res = 6;
  } else if (bmi > 28 && bmi <= 34) {
    res = 7;
  } else if (bmi > 34 && bmi <= 37) {
    res = 8;
  } else if (bmi > 37) {
    res = 9;
  }
  return res;
};

setup.initialWeight = function(): number {

  const bmis = [0, 18, 20, 22, 24, 26, 28, 31, 34, 37];
  return  Math.round(((ↂ.pc.body.height * ↂ.pc.body.height) * bmis[ↂ.pc.body.weight]) / 1700); // magic numbers!
};
