/*
/  ██╗    ██╗███████╗███████╗██╗  ██╗
/  ██║    ██║██╔════╝██╔════╝██║ ██╔╝
/  ██║ █╗ ██║█████╗  █████╗  █████╔╝
/  ██║███╗██║██╔══╝  ██╔══╝  ██╔═██╗
/  ╚███╔███╔╝███████╗███████╗██║  ██╗
/   ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═╝
*/

/*
<<set ↂ.job.att.weekDays = 0>>
<<set ↂ.job.att.showed = [0,false,false,false,false,false,false,false]>>
<<set ↂ.job.att.weekHours = 0>>
*/

interface setupWeek {
  bar: (t?: number) => void;
  start: () => string;
  creditCalc: () => void;
  main: () => void;
  tutorial: () => void;
  npcProc: () => void;
  playerHistoryComparison: () => void;
  payCosts: () => void;
  carCosts: () => void;
  financeReset: () => void;
  livingCondition: () => void;
  phone: () => void;
  tempData: {
    hTier: number;
    hFin: number;
    hUp: number;
    hLoc: number;
    hHood: number;
    food: number;
    supply: number;
    goods: number;
  };
}


setup.week = {} as setupWeek;


// adds to processing week progress bar
setup.week.bar = function(t: number= 5): void {
  setup.pBar.add("#weekpbar", t);
};
// primary week summary function - starts week process
setup.week.start = function(): string {
  const ᛔ = State.active.variables;
  const T = State.temporary;
  aw.L();
  if (ↂ.flag.prologueSunday) {
    ↂ.flag.prologueSunday = false;
  }
  const pay = Math.round(ↂ.job.att.weekHours * ↂ.job.rules.payrate);
  aw.con.info(`calculated pay was ${pay}.`);
  aw.cash(pay, "job");
  const kids = ↂ.pc.status.kids;
  let kPay = 0;
  if (kids <= 5) {
    kPay = kids * 18;
  } else if (kids <= 10) {
    kPay = 90 + ((kids - 5) * 14);
  } else if (kids <= 15) {
    kPay = 160 + ((kids - 10) * 10);
  } else if (kids <= 25) {
    kPay = 210 + ((kids - 15) * 6);
  } else {
    kPay = 270 + ((kids - 25) * 4);
  }
  aw.cash(kPay, "child");
  setup.week.creditCalc();
  setup.week.payCosts();
  setup.week.carCosts();
  ↂ.home.finance.lessons = setup.school.charge();
  aw.cash(ↂ.home.finance.lessons, "school");
  ↂ.home.finance.rent = Math.ceil(ↂ.home.stats.rent / 4);
  const payRent = Math.ceil(ↂ.home.stats.rent / 4) * -1;
  aw.cash(payRent, "rent");
  ↂ.job.att.weekDays = 0;
  ↂ.job.att.showed = [0, false, false, false, false, false, false, false];
  ↂ.job.att.weekHours = 0;
  ↂ.home.finance.jobIncome = pay;
  ↂ.home.finance.miscIncome = ↂ.home.finance.income.lotto + ↂ.home.finance.income.milk
  + ↂ.home.finance.income.gambling + ↂ.home.finance.income.sugarDaddy + ↂ.home.finance.income.prostitute
  + ↂ.home.finance.income.yardSale + ↂ.home.finance.income.child + ↂ.home.finance.income.surrogate
  + ↂ.home.finance.income.oddjobs;
  ↂ.home.finance.totalIncome = ↂ.home.finance.miscIncome + ↂ.home.finance.jobIncome + ↂ.home.finance.bankInterest;
  ↂ.home.finance.totalExpense = ↂ.home.finance.rent + ↂ.home.finance.food + ↂ.home.finance.goods
  + ↂ.home.finance.supplies + ↂ.home.finance.isp + ↂ.home.finance.cable + ↂ.home.finance.maid
  + ↂ.home.finance.car + ↂ.home.finance.insurance + ↂ.home.finance.electric + ↂ.home.finance.water
  + ↂ.home.finance.grooming + ↂ.home.finance.streaming + ↂ.home.finance.porn + ↂ.home.finance.patreon
  + ↂ.home.finance.gym + ↂ.home.finance.lessons + ↂ.home.finance.loanPayment + ↂ.home.finance.loanInterest
  + ↂ.home.finance.creditInterest;
  /*
  NOTE: I believe changes now use ↂ.tempHistory so this is redundant. saving just in case dec-2018
  T.pcChange = [];
  T.statusChange = [];
  T.traitChange = [];
  T.mutateChange = [];
  T.kinkChange = [];
  T.skillChange = "cock";
  T.itemChange = "balls";
  T.homeChange = [];
  T.jobChange = "tits";*/
  if (ᛔ.AW.cash < 0) {
    // overdraft fee... check if money in savings first.
    if (ↂ.home.finance.bank > (ᛔ.AW.cash * -1) + 25) {
      // bank savings balance large enough to cover the overdraft.
      ↂ.home.finance.bank += ᛔ.AW.cash; // neg number, so add not subtract
      ↂ.home.finance.bank -= 25; // overdraft fee
      ᛔ.AW.cash = 0;
    } else {
      if (ↂ.home.finance.bank > 0) {
        // bank savings has some money, so use that first
        ᛔ.AW.cash += ↂ.home.finance.bank;
        ↂ.home.finance.bank = 0;
      }
      const fee = (ᛔ.AW.cash * -0.05) + 25;
      aw.cash(fee, "misc"); // subtract overdraft fee from cash.
      if (ᛔ.AW.cash < -1000) { // BAD END FROM TOO LITTLE CASH
        ↂ.flag.badEnd = "debtor";
      }
    }
  }
  // setup.playerHistoryComparison(); performed in week system!
  aw.S();
  setTimeout(function() {
    setup.week.main();
  });
  return "<<include [[WeekSystemInfodisp]]>>";
};

setup.week.creditCalc = function(): void {
  const bankInt = Math.ceil(ↂ.home.finance.bank * (ↂ.home.finance.bankInterestPer / 1000));
  const credInt = Math.ceil(ↂ.home.finance.credit * (ↂ.home.finance.creditInterestPer / 1000));
  const loanInt = Math.ceil(ↂ.home.finance.loan * (ↂ.home.finance.loanInterestPer / 1000));
  ↂ.home.finance.bank += bankInt; // bank is savings account, adding interest income
  // ↂ.home.finance.credit is credit account, interest payment is mandatory.
  ↂ.home.finance.loan += loanInt; // loan account, adding interest cost
  ↂ.home.finance.bankInterest = bankInt;
  ↂ.home.finance.creditInterest = credInt;
  ↂ.home.finance.loanInterest = loanInt;
  if (ↂ.home.finance.loan === 0) {
    ↂ.home.finance.loanPayment = 0;
  } else {
    if (ↂ.home.finance.loanPayment > ↂ.home.finance.loan) {
      ↂ.home.finance.loanPayment = ↂ.home.finance.loan;
    }
    State.active.variables.AW.cash -= ↂ.home.finance.loanPayment; // deduct loan payment
    ↂ.home.finance.loan -= ↂ.home.finance.loanPayment; // reduce loan balance
    if (ↂ.home.finance.loan < 0) {
      ↂ.home.finance.loan = 0;
    }
  }
  if (credInt > 0) { // pay credit account interest... principle payments are manual, hehehe
    State.active.variables.AW.cash -= credInt;
  }
};

// starts async processing and tutorial
setup.week.main = function(): void {
  setTimeout(function() {
    setup.week.npcProc();
  });
  setTimeout(function() {
    setup.week.tutorial();
  }, 500);
};
// displays week review tutorial
setup.week.tutorial = function(): void {
  if (ↂ.flag.weekTute) {
    ↂ.flag.weekTute = false;
    setup.dialog("Week Review Tutorial", "<<include [[WeekSystemTutorialJunk]]>>");
  }
};
// processes NPC changes
setup.week.npcProc = function(): void {
  setTimeout(function() {
    setup.generateStoreClothes();
    setup.week.bar(13);
  }, 50);
  setTimeout(function() {
    setup.week.phone();
    setup.week.bar(15);
  }, 300);
  setTimeout(function() {
    setup.week.bar(10);
  }, 1000);
  setTimeout(function() {
    setup.week.bar(12);
  }, 1800);
  setTimeout(function() {
    setup.week.bar(18);
  }, 2500);
  setTimeout(function() {
    setup.week.bar(7);
  }, 3200);
  setTimeout(function() {
    setup.week.bar(13);
  }, 3500);
  setTimeout(function() {
    setup.week.bar(7);
  }, 3900);
};

// TODO BESTY - This is a great place to put a function to check relationships and set events for people to call/text you during the coming week. In fact, I'll make the function for you to fill up...
setup.week.phone = function(): void {
  // sees which NPCs will text you this week.
};

setup.week.livingCondition = function(): void {
  const t = {
    food: ↂ.home.finance.sett.foodLevel || 3,
    goods: ↂ.home.finance.sett.goodsLevel || 3,
    supply: ↂ.home.finance.sett.supplyLevel || 3,
    hTier: ↂ.home.stats.tier || 1,
    hFin: ↂ.home.stats.finish || 1,
    hUp: ↂ.home.stats.upkeep || 1,
    hHood: ↂ.home.stats.nhood || 1,
    hLoc: ↂ.home.stats.location || 1,
  };
  const v = [-3, -2, -1, 0, 1, 2];
  let h = (v[t.hFin] * 3) + (v[t.hUp] * 4) + (v[t.hLoc] * 2) + v[t.hHood];
  h *= 3 - ((t.hTier / 5) * 3);
  let ment = h; // mental effect
  ment += v[t.food] * 3;
  ment += v[t.supply] * 3;
  ment += v[t.goods] * 3;
  ment = Math.max(-100, Math.min(100, ment));
  aw.con.info(`LIVING CONDITION MENTALITY SCORE: ${ment}`);
  ↂ.home.ment = ment; // used during overnight period to adjust mental stats.
  delete setup.week.tempData;
};


setup.week.payCosts = function() {
  const f = ↂ.home.finance.sett.foodLevel;
  const g = ↂ.home.finance.sett.goodsLevel;
  const s = ↂ.home.finance.sett.supplyLevel;
  const food = [0, -30, -45, -55, -75, -100];
  const goods = [0, -15, -25, -35, -45, -65];
  const supply = [0, -5, -10, -15, -20, -30];
  aw.cash(food[f], "food");
  aw.cash(goods[g], "goods");
  aw.cash(supply[s], "supplies");
  const elec = ((ↂ.home.stats.tier * 2) + either(3, 4, 4, 5)) * -1;
  aw.cash(elec, "electric");
  aw.cash(-10, "insurance");
  aw.cash(-16, "isp");
  aw.cash(-6, "cable");
  aw.cash(-4, "streaming");
  const wat = (ↂ.home.stats.tier + either(7, 8, 8, 9)) * -1;
  aw.cash(wat, "water");
  const groom = (random(2, 4) + random(2, 4) + random(2, 4)) * -1;
  aw.cash(groom, "grooming");
};

setup.week.carCosts = function() {
  const miles = ↂ.home.finance.miles; // get miles driven during week.
  ↂ.home.finance.miles = 0;
  const mpg = 30; // TODO link car type to mpg rate (no point till after can change cars)
  const gasPrice = 3; // similar, changing gas prices? price per gallon.
  const cost = Math.ceil((miles / mpg) * gasPrice);
  aw.cash(cost, "gas");
  ↂ.home.finance.gas = cost;
  // TODO maintenance costs more than simple
  aw.cash(-4, "maint");
};

setup.week.financeReset = function(): void {
  const ᚥ = ↂ.home.finance;
  ᚥ.totalIncome = 0;
  ᚥ.totalExpense = 0;
  ᚥ.water = 0;
  ᚥ.supplies = 0;
  ᚥ.streaming = 0;
  ᚥ.spending = 0;
  ᚥ.porn = 0;
  ᚥ.patreon = 0;
  ᚥ.miscIncome = 0;
  ᚥ.misc = 0;
  ᚥ.maint = 0;
  ᚥ.maid = 0;
  ᚥ.lessons = 0;
  ᚥ.isp = 0;
  ᚥ.insurance = 0;
  ᚥ.gym = 0;
  ᚥ.grooming = 0;
  ᚥ.goods = 0;
  ᚥ.gas = 0;
  ᚥ.food = 0;
  ᚥ.electric = 0;
  ᚥ.car = 0;
  ᚥ.cable = 0;
};
