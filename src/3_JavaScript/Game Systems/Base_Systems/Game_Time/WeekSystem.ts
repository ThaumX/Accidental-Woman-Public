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
  surrogacyNot : () => void;
  npcProc: () => void;
  playerHistoryComparison: () => void;
  payCosts: () => void;
  carCosts: () => void;
  financeReset: () => void;
  livingCondition: () => void;
  phone: () => void;
  insanePrefChecker: (npcId: string) => number[];
  tempData: {
    hTier: number;
    hFin: number;
    hUp: number;
    hLoc: number;
    hHood: number;
    food: number;
    supply: number;
    goods: number;
  } | null;
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
  setup.weightCalc();
  if (ↂ.flag.tan > 8) {
    ↂ.pc.status.health -= 1;
    setup.status.record("health", -1, "Baking too long in the sun this week");
  }
  ↂ.flag.tan -= 1;
  if (ↂ.flag.tan < 0) {
    ↂ.flag.tan = 0;
  }
  ↂ.flag.churchAttend = {
    outer: false,
    cock: false,
    man: false,
  };
  // Cunt & Ass Stretch Healing
  if (ↂ.pc.body.pussy.tight > 4) {
    ↂ.flag.stretchCuntDown--;
    if (ↂ.flag.stretchCuntDown <= 0) {
      ↂ.flag.stretchCuntDown = 3;
      ↂ.pc.body.pussy.tight -= 1;
    }
  }
  if (ↂ.pc.body.asshole.tight > 2) {
    ↂ.flag.stretchAssDown--;
    if (ↂ.flag.stretchAssDown <= 0) {
      ↂ.flag.stretchAssDown = 3;
      ↂ.pc.body.asshole.tight -= 1;
    }
  }
  aw.S();
  // FINANCIAL STUFF
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
  kPay = setup.cashDiff(kPay);
  aw.cash(kPay, "child");
  setup.week.creditCalc();
  setup.week.payCosts();
  setup.week.carCosts();
  ↂ.home.finance.lessons = setup.school.charge();
  aw.cash(ↂ.home.finance.lessons, "school");
  // ↂ.home.finance.rent = Math.ceil(ↂ.home.stats.rent / 4);
  let payRent = Math.ceil(ↂ.home.stats.rent / 4) * -1;
  if (ↂ.flag.liveTogether) { // reductions in rent for living together
    /* I am cutting this because I thing the restrictions should be more strongly tied to NPC, and orig home tier is still used for effects
    if (aw.npc[ↂ.flag.liveWith].background.wealth + 2 < ↂ.home.stats.tier) {
      // no rent change
    } else if (aw.npc[ↂ.flag.liveWith].background.wealth < ↂ.home.stats.tier) {
      payRent = Math.round(payRent * 0.75);
    } else {
      payRent = Math.round(payRent * 0.5);
    }
    */
    switch (aw.npc[ↂ.flag.liveWith].background.wealth) {
      case -3:
        payRent *= 2;
        break;
      case -2:
        payRent *= 1.5;
        break;
      case -1:
        payRent *= 1.2
        break;
      case 0:
        // nothing - no effect on rent
        break;
      case 1:
        payRent *= 0.8
        break;
      case 2:
        payRent *= 0.5
        break;
      case 3:
        payRent = 0;
        break;
    }
  }
  payRent = Math.ceil(payRent);
  ↂ.flag.lastRent = payRent;

  const vowList = ↂ.flag.marriage.PCvows.concat(ↂ.flag.marriage.NPCvows);
  if (vowList.includes("moneyNPC") && !ↂ.flag.marriage.married) {
    ↂ.home.finance.income.sugarDaddy = ↂ.flag.vows[ↂ.flag.marriage.npc].moneyNPC;
  }

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
  if (ↂ.flag.marriage.married !== false) {
    switch (aw.npc[ↂ.flag.marriage.married].background.wealth) {
      case -3:
        ↂ.home.finance.totalExpense += 50;
        break;
      case -2:
        ↂ.home.finance.totalExpense -= 50;
        break;
      case -1:
        ↂ.home.finance.totalExpense -= 100;
        break;
      case 0:
        ↂ.home.finance.totalExpense -= 200;
        break;
      case 1:
        ↂ.home.finance.totalExpense -= 280;
        break;
      case 2:
        ↂ.home.finance.totalExpense -= 450;
        break;
      case 3:
        ↂ.home.finance.totalExpense -= 700;
        break;
      default:
        break;
    }
  }
  if (ↂ.home.finance.totalExpense < 0) {
    ↂ.home.finance.totalExpense = 0;
  }
  if (vowList.includes("moneyPC") && !ↂ.flag.marriage.married) {
    ↂ.home.finance.totalExpense += ↂ.flag.vows[ↂ.flag.marriage.npc].moneyPC;
  }
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
  aw.L();
  setup.bank.weeklyRun();
  /*
  When you forget that you wrote functions for this, and ended up rewriting them but better.
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
  */
};

// starts async processing and tutorial
setup.week.main = function(): void {
  setTimeout(function() {
    setup.week.npcProc();
  });
  setTimeout(function() {
    setup.week.tutorial();
  }, 500);
  setTimeout(function() {
    setup.week.surrogacyNot();
  }, 500);
};
// displays week review tutorial
setup.week.tutorial = function(): void {
  if (ↂ.flag.weekTute) {
    ↂ.flag.weekTute = false;
    setup.dialog("Week Review Tutorial", "<<include [[WeekSystemTutorialJunk]]>>");
  }
};
setup.week.surrogacyNot = function(): void {
  setup.setSurrogacy();
}
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

setup.week.phone = function(): void { // sees which NPCs will text you this week.
  const potentDateNpc = [] as string[];
  const potentHangNpc = [] as string[];
  for (const npcId in aw.npc) {
    if (aw.npc[npcId] !== undefined && aw.npc[npcId].rship !== undefined && aw.npc[npcId].rship.category !== null) {
      const cat = aw.npc[npcId].rship.category;
      // let's see if NPC want to explore realtionship with PC
      let braveryRate = aw.npc[npcId].rship.lovePC + (aw.npc[npcId].trait.libido * 2) + (aw.npc[npcId].trait.will * 2) + (ↂ.pc.status.atr * 5);
      if (aw.npc[npcId].trait.lowEsteem === 1) {
        braveryRate -= 30;
      } else if (aw.npc[npcId].trait.lowEsteem === -1) {
        braveryRate += 10;
      }
      if (aw.npc[npcId].trait.extro) {
        braveryRate += 10;
      }
      if (aw.npc[npcId].trait.intro) {
        braveryRate -= 10;
      }
      if (aw.npc[npcId].main.female && !aw.npc[npcId].trait.bi && !aw.npc[npcId].trait.homo) {
        braveryRate -= 30;
      }
      if (!aw.npc[npcId].main.female && aw.npc[npcId].main.male && !aw.npc[npcId].trait.bi && aw.npc[npcId].trait.homo) {
        braveryRate -= 30;
      }
      if (aw.npc[npcId].main.female && aw.npc[npcId].trait.homo) {
        braveryRate += 10;
      }
      const npcPrefs = setup.week.insanePrefChecker(npcId);
      let npcPrefsScore = 0;
      for (let index = 0; index < npcPrefs.length; index++) {
        npcPrefsScore += npcPrefs[index];
      }
      if (setup.interactionMisc.isDom(npcId) || setup.interactionMisc.isSub(npcId)) {
        braveryRate += 50;
      }
      braveryRate += (npcPrefsScore * 4);
      if (braveryRate < 0) {braveryRate = 5;} // here, take your puny chance anyway
      const wannaMeet = (100 - aw.npc[npcId].rship.companion) + Math.floor(aw.npc[npcId].rship.likePC / 2);
      // now to the main code
      switch (cat) {
        case "aquaint":
          if (random(0, 150) < braveryRate) {
            if (aw.npc[npcId].rship.companion < 50) {
              potentDateNpc.push(npcId);
            }
          } else {
            if (random(0, 350) < wannaMeet) {
              potentHangNpc.push(npcId);
            }
          }
          break;
        case "friend":
          if (random(0, 100) < braveryRate) {
            if (aw.npc[npcId].rship.companion < 50) {
              potentDateNpc.push(npcId);
            }
          } else {
            if (random(0, 170) < wannaMeet) {
              potentHangNpc.push(npcId);
            }
          }
          break;
        case "engaged":
        case "lovers":
          if (aw.npc[npcId].rship.companion < 40) {
            potentDateNpc.push(npcId);
          }
          break;
        case "dating":
          if (aw.npc[npcId].rship.companion < 30) {
            potentDateNpc.push(npcId);
          }
          break;
        default:
        break;
      }
    }
  }
  let lastTime = 0;
  if (potentDateNpc.length > 0) {
    aw.con.info(`DEBUG 1: ${potentDateNpc}`);
    for (let i = 0; i < potentDateNpc.length; i++) {
      if (ↂ.flag.schedDates.indexOf(potentDateNpc[i]) === -1) {
        if (random(1,5) > 1) {
          aw.con.info(`DEBUG 2: ${potentDateNpc[i]}`);
          const time = (random(0, 6) * 1440) + (random (600, 1260)) + lastTime;
          lastTime += random(20, 50);
          State.active.variables.tempShitNPC = potentHangNpc[i];
          let first = `<<= either("Hey, whats up?", "Hi! How its going?")>>`;
          let second = `<<= either("Hi! Meh, as always", "Standard daily stuff")>>`;
          let third = `<<= either("Wanted to ask you out this week or maybe next, mm?", "Hey, dont you want to go for a date? Some good food, nice time together and whatnot?", "I hope I dont distract you from something important, just wanted to ask if you would like to go out with me somewhere. What do you think?")>>`;
          let fourth = `<<= either("Oh, I understand. Next time then, XOXO", "Well write me when you ll be ready to meet okay?", "Okay.")>>`;
          let daddy = "master";
          if (setup.interactionMisc.isDom(potentDateNpc[i])) {
            if (aw.npc[potentDateNpc[i]].main.female) { daddy = "mistress"; };
            first = `<<= either("Hello, pet!", "How does my favorite toy doing?")>>`;
            second = `<<= either("<<greetings>>, ${daddy}!", "Ohh, I am so glad you wrote me, ${daddy}!")>>`;
            third = `<<= either("I feel like meeting you this or next week.", "I want us to meet, when you are able to do it?", "I want to go out with you, my little slave.")>>`;
            fourth = `<<= either("Too bad. Write me asap then.", "Grr. I just hate real life intruding and taking my slave from me. Well, write me as soon as you will able to meet.", "Okay.")>>`;
          }
          if (setup.interactionMisc.isSub(potentDateNpc[i])) {
            first = `<<= either("<<greetings>> mistress!", "I got so lonely without seeing you, mistress!")>>`;
            second = `<<= either("Hello, my pet. Got needy? :)", "Somebody is in need to be topped as I can see? :)")>>`;
            third = `<<= either("Yup-yup! Please, can we meet soon?", "I would like to see you so much, can we go out? I have dreams about you already... the naughty ones ^_^", "Please, can I ask you to go out with me?")>>`;
            fourth = `<<= either("Yes, mistress :(", "I will wait, mistress :(", "Okay :(")>>`;
          }
          const omni = {
            name: `${potentDateNpc[i]} wants to ask PC out.`,
            type: "single",
            output: "interact",
            duration: time,
            icon: "none",
            text: "none",
            run: `
              if (ↂ.flag.schedDates.indexOf("${potentDateNpc[i]}") === -1) {
                setup.interact.status.npc = "${potentDateNpc[i]}";
                let State.active.variables.sorryText = either("Sorry, too busy. Maybe later, I ll write you.", "Oh, I have so much on my hands right now, I am not sure I will be free this week.", "So nice of you, I am just not ready for dating now.");
            setup.interact.launch({passage: "none", npcid: "${potentDateNpc[i]}", content: '<span id="dateTexting"><<texting "${aw.npc[potentDateNpc[i]].main.name}">>
            <<textnpc>>${first}
            <<textpc>>${second}
            <<textnpc>>${third}
            <</texting>><center>@@.com;To continue conversation, click the 'send' button (blue arrow).@@</center><<dialogchoice>><<dbutt "Okay">><<replace "#dateTexting">><<set $cumquat = "${potentDateNpc[i]}">><<datescheduler $cumquat>><</replace>><<dtext "excited">>Yeah, lets do it!<<dbutt "Nope">><<replace "#dateTexting">>@@.pc;<<= $sorryText>>@@<br><br>You stare for a minute until the answer arrives.<br><br>@@.npc;${fourth}@@<<npcLike 2 "${potentDateNpc[i]}" -5>><</replace>><<dtext "confused">>Reject it in some not-offending way.<</dialogchoice>></span>', block: false, title: "Phone message", size: 3});
              }
          `,
          };
          setup.omni.new(omni as IntOmniData);
          aw.con.info(`${aw.npc[potentDateNpc[i]].main.name} was scheduled to text PC at ${time} for a date.`);
        } else {
          let time = 0;
          let shashliki = random(0,1);
          for (let index = 1; index < ↂ.job.rules.worktime.length; index++) {
            if (ↂ.job.rules.worktime[index] !== 0) {
              time += 1440;
            } else {
              if (shashliki === 0) {
                time += (random (720, 1100));
                break;
              } else {
                shashliki = 1;
              }
            }
          }
          lastTime += random(20, 50);
          if (time > 10080) {
            aw.con.warn(`${aw.npc[potentDateNpc[i]].main.name} tried to schedule a visit to PC home ${time} which resulted in omni created abort.`);
          } else {
            const omni = {
              name: `${potentDateNpc[i]} wants to visit PC.`,
              type: "single",
              output: "none",
              duration: time + random(5, 55),
              icon: "none",
              text: "none",
              run: `
              if (ↂ.map.loc[0] === "home") {
              setup.notify("@@.rumble;RING RING!@@ It seems somebody is at the door.");
              ↂ.flag.homeVisit[0] = aw.time;
              ↂ.flag.homeVisit[1] = "${potentDateNpc[i]}";
              aw.S();
              }
              `,
            };
            setup.omni.new(omni as IntOmniData);
            aw.con.info(`${aw.npc[potentDateNpc[i]].main.name} was scheduled to visit PC at ${time}.`);
          }
        }
      }
    }
  }
  if (potentHangNpc.length > 0) {
    for (let i = 0; i < potentHangNpc.length; i++) {
      if (ↂ.flag.schedHangs.indexOf(potentHangNpc[i]) === -1) {
        const time = (random(0, 6) * 1440) + (random (600, 1260)) + lastTime;
        lastTime += random(20, 50);
        const omni = {
          name: `${potentHangNpc[i]} wants to hang with PC.`,
          type: "single",
          output: "interact",
          duration: time,
          icon: "none",
          text: "none",
          run: `if (ↂ.flag.schedHangs.indexOf("${potentHangNpc[i]}") === -1) {
          setup.interact.status.npc = "${potentHangNpc[i]}";
          setup.interact.launch({passage: "none", npcid: "${potentHangNpc[i]}", content: '<span id="hangTexting"><<texting "${aw.npc[potentHangNpc[i]].main.name}">><<textnpc>><<= either("Hi! Whats up? We totally should hang out, I am starting to miss you!", "Hey there. How are you? I thought about chilling together this week, are you in?", "Hey, long time no see, wanna hang?")>><<textpc>>Hmm... let me see...<</texting>><<dialogchoice>><<dbutt "Yep">><<replace "#hangTexting">><<set _npc = "${potentHangNpc[i]}">><<set $cumquat = "${potentHangNpc[i]}">><<hangscheduler $cumquat>><</replace>><<dtext "excited">>Yeah, lets do it!<<dbutt "Nope">><<replace "#hangTexting">>You thought for a moment then started typing.<br><br>@@.pc;<<= either("Sorry, too busy. Maybe later, I ll write you.", "Oh, I have so much on my hands right now, I am not sure I will be free this week.", "Oh, I really have no time.")>>@@<br><br>Answer came almost immediately.<br><br>@@.npc;<<= either("Okies, next time maybe. Dont forget about me.", "Well write me when you will be ready to meet okay?", "Okay.")>>@@<<npcLike 2 "${potentHangNpc[i]}" -5>><<safetoclose>><</replace>><<dtext "confused">>You have no time for hanging with friends in near future.<</dialogchoice>></span>', block: false, title: "Phone message", size: 3});}`,
        };
        setup.omni.new(omni as IntOmniData);
        aw.con.info(`${aw.npc[potentHangNpc[i]].main.name} was scheduled to text PC at ${time} for a hang.`);
      }
    }
  }
  if (ↂ.flag.doms.length > 0) {
    for (let index = 0; index < ↂ.flag.doms.length; index++) {
      if (aw.npc[ↂ.flag.doms[index]] !== undefined) {
        if (aw.npc[ↂ.flag.doms[index]].rship.companion < random(60,80) && random(0, 10) > 7) {
        let omni = {};
        const tasks = [1];
        if (ↂ.flag.keyHolders[0] !== ↂ.flag.doms[index] && ↂ.flag.keyHolders[1] === "none") {
          tasks.push(2);
        }
        const task = either(tasks);
        switch (task) {
          case 1:
            let time = (random(0, 6) * 1440) + (random (600, 720));
            let daddy = "master";
            if (aw.npc[ↂ.flag.doms[index]].main.female) { daddy = "mistress"; };
            omni = {
              name: `${ↂ.flag.doms[index]} wants to dom PC.`,
              type: "single",
              output: "interact",
              duration: time,
              icon: "none",
              text: "none",
              run: `
              let State.temporary.panties = "I do...";
              let State.temporary.answer = "Then take them off discretely. And send me a photo ;)";
              let photo = "IMG-PantyShot1";
              if (ↂ.pc.clothes.worn.panties === "off" || ↂ.pc.clothes.worn.panties === 0) {
                State.temporary.panties = "I dont...";
                State.temporary.answer = "Oh, such a naughty girl you are. Send me a photo, slut ;)";
              }
              if (setup.sexToys.check("pc", "clit") !== true) {
                State.temporary.photo = "IMG-PantyShot2";
              }
              ↂ.pc.clothes.worn.panties = "off";
              setup.interact.status.npc = "${ↂ.flag.doms[index]}";
              setup.interact.launch({passage: "none", npcid: "${ↂ.flag.doms[index]}", content: '<<texting "${aw.npc[ↂ.flag.doms[index]].main.name}">><<arouse 1>><<happy 1 "Having a dom is nice">>
              <<textnpc>>So, how does my favorite slut doing this morning?
              <<textpc>>I am okay, ${daddy}!
              <<textnpc>>Do you wear panties right now?
              <<textpc>><<= _panties>>
              <<textnpc>><<= _answer>>
              <<textpc>>Oh... Yes, I will, just a second, ${daddy}!
              <<textpc>><img data-passage="_photo">
              <<textnpc>>Good girl. Stay like this today.
              <<textpc>>But...
              <<textpc>>What if somebody gonna notice it?
              <<textnpc>>Then you gonna be very embarrassed, my little slut, right?
              <<textpc>>...Yes ${daddy} >_<
              <<textnpc>>Good girl :)
              <</texting>><center>@@.com;To continue conversation, click the 'send' button (blue arrow).@@</center>
              <<safetoclose>>', block: false, title: "Phone message", size: 3});
              aw.S();
              `,
            };
            break;
          case 2:
            time = (random(0, 6) * 1440) + (random (720, 1080));
            daddy = "master";
            if (aw.npc[ↂ.flag.doms[index]].main.female) { daddy = "mistress"; };
            omni = {
              name: `${ↂ.flag.doms[index]} wants to dom PC.`,
              type: "single",
              output: "interact",
              duration: time,
              icon: "none",
              text: "none",
              run: `
              ↂ.flag.keyHolders[0] = ["${ↂ.flag.doms[index]}"];
              ↂ.flag.keyHolders[1] = "askedToBringTheKey";
              let State.temporary.ChastityOne = "I want you to buy a chastity belt of your choice this week, pet.";
              let State.temporary.ChastityTwo = "Y-yes, ${daddy}, I will do it...";
              let State.temporary.ChastityThree = "Good girl. As I know they sell keys and remotes separately, dont forget to buy them too. Put the chastity on as soon as you get it, take keys to our next date ;)";
              if (State.active.variables.items.has("Chastity belt") || State.active.variables.items.has("Cplate 200") ||State.active.variables.items.has("Clit shield")) {
                let State.temporary.ChastityOne = "You have the chastity belt, right?";
                if (setup.sexToys.check("pc", "clit") !== true) {
                  let State.temporary.ChastityTwo = "Yes, ${daddy}... I have my ${setup.sexToys.check("pc", "clit")} on right now...}";
                  let State.temporary.ChastityThree = "Such a good girl you are, already locked tight! Take keys to our next date ;)";
                } else {
                  let State.temporary.ChastityTwo = "Yes, ${daddy}...";
                  let State.temporary.ChastityThree = "Put the chastity on and take keys to our next date ;)";
                }
              }
              setup.interact.status.npc = "${ↂ.flag.doms[index]}";
              setup.interact.launch({passage: "none", npcid: "${ↂ.flag.doms[index]}", content: '<<texting "${aw.npc[ↂ.flag.doms[index]].main.name}">><<arouse 1>><<happy 1 "Having a dom is nice">>
              <<textnpc>><<= _ChastityOne>>
              <<textpc>><<= _ChastityTwo>>
              <<textnpc>><<= _ChastityThree>>
              <<textpc>>As you wish, ${daddy}!
              <<textnpc>>Good girl.
              <<textnpc>>I let you to choose when your next date will happen.
              <</texting>><center>@@.com;To continue conversation, click the 'send' button (blue arrow).@@</center>
              <<set $cumquat = "${ↂ.flag.doms[index]}">><<datescheduler $cumquat>>
              <<safetoclose>>', block: false, title: "Phone message", size: 3});
              aw.S();
              `,
            };
          break;
          case 3:
            /*time = (random(0, 6) * 1440) + (random (720, 1080));
            daddy = "master";
            if (aw.npc[ↂ.flag.doms[index]].main.female) { daddy = "mistress"; };
            omni = {
              name: `${ↂ.flag.doms[index]} wants to dom PC.`,
              type: "single",
              output: "interact",
              duration: time,
              icon: "none",
              text: "none",
              run: `
              let State.temporary.panties = "I do...";
              let State.temporary.answer = "Then take them off discretely. And send me a photo ;)";
              let photo = "IMG-PantyShot1";
              if (ↂ.pc.clothes.worn.panties === "off" || ↂ.pc.clothes.worn.panties === 0) {
                State.temporary.panties = "I don't...";
                State.temporary.answer = "Oh, such a naughty girl you are. Send me a photo, slut ;)";
              }
              if (setup.sexToys.check("pc", "clit") !== true) {
                State.temporary.photo = "IMG-PantyShot2";
              }
              ↂ.pc.clothes.worn.panties = "off";
              setup.interact.status.npc = "${ↂ.flag.doms[index]}";
              setup.interact.launch({passage: "none", npcid: "${ↂ.flag.doms[index]}", content: '<<texting "${aw.npc[ↂ.flag.doms[index]].main.name}">><<arouse 1>><<happy 1 "Having a dom is nice">>
              <<textnpc>>So, how does my favorite slut doing this morning?
              <<textpc>>I am okay, ${daddy}!
              <<textnpc>>Do you wear panties right now?
              <<textpc>><<= _panties>>
              <<textnpc>><<= _answer>>
              <<textpc>>Oh... Yes, I will, just a second, ${daddy}!
              <<textpc>><img data-passage="_photo">
              <<textnpc>>Good girl. Stay like this today.
              <<textpc>>But...
              <<textpc>>What if somebody gonna notice it?
              <<textnpc>>Then you gonna be very embarrassed, my little slut, right?
              <<textpc>>...Yes ${daddy} >_<
              <<textnpc>>Good girl :)
              <</texting>><center>@@.com;To continue conversation, click the 'send' button (blue arrow).@@</center>
              <<safetoclose>>', block: false, title: "Phone message", size: 3});
              aw.S();
              `,
            };*/
          break;
          default:
            break;
        }
        setup.omni.new(omni as IntOmniData);
        aw.con.info(`${aw.npc[ↂ.flag.doms[index]].main.name} was scheduled to ldr dom PC at ${time}.`);
      }
      }
    }
  }
  // some additional story stuff
  if (aw.npc.n1014.rship.acquaint && aw.npc.n1014.rship.likeNPC < 30 && ↂ.flag.hannaStory.stage === "none" && random(1,7) === 7) {
    let omni = {};
    const time = (random(0, 6) * 1440) + (random (720, 1080));
    omni = {
      name: `Hanna texts asking for money`,
      type: "single",
      output: "interact",
      duration: time,
      icon: "none",
      text: "none",
      run: `
      setup.interact.status.npc = "n1014";
      setup.interact.launch({passage: "HannaAskingFirst", npcid: "n1014", content: "none", block: false, title: "Phone message", size: 3});
      aw.S();
      `,
    };
  setup.omni.new(omni as IntOmniData);
  }
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
  if (ↂ.flag.liveTogether) {
    let ba = 0;
    let bmax = 5;
    if (aw.npc[ↂ.flag.liveWith].background.wealth + 2 < ↂ.home.stats.tier) {
      // no change to ba
    } else if (aw.npc[ↂ.flag.liveWith].background.wealth < ↂ.home.stats.tier) {
      ba = 1;
    } else {
      ba = 2;
      bmax = 6;
    }
    t.hFin = Math.min(t.hFin + ba, bmax);
    t.hUp = Math.min(t.hUp + ba, bmax);
    t.hHood = Math.min(t.hHood + ba, bmax);
  }
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
  setup.week.tempData = null;
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

setup.week.insanePrefChecker = function(npcId: string): number[] { // [height, weight, large boobs, small boobs, ]
  const result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Error in setup.week.insanePrefChecker, ${npcId} was not found in aw.npc!`);
    return result;
  }
  // HEIGHT
  const height = [59, 62, 66, 71, 74]; // border values
  let pos = 0;
  for (let index = 0; index < height.length; index++) {
    if (77 >= height[index]){
      pos = (index + 1);
    }
  }
  if (pos > 4) {pos = 4};
  result[0] = aw.npc[npcId].pref.Fheight[pos];
  // WEIGHT
  result[1] = aw.npc[npcId].pref.Fweight[(ↂ.pc.body.weight - 1)];
  // BOOBS
  if (ↂ.pc.body.tits.size > 1500) {
    result[2] = aw.npc[npcId].pref.Fother[0];
  } else {
    result[2] = 0;
  }
  if (ↂ.pc.body.tits.size < 600) {
    result[3] = aw.npc[npcId].pref.Fother[1];
  } else {
    result[3] = 0;
  }
  // HIPS
  if (ↂ.pc.body.hips > 4) {
    result[4] = aw.npc[npcId].pref.Fother[2];
  } else {
    result[4] = 0;
  }
  if (ↂ.pc.body.hips < 3) {
    result[5] = aw.npc[npcId].pref.Fother[3];
  } else {
    result[5] = 0;
  }
  // IQ - screw it for now
  result[6] = 0;
  result[7] = 0;
  // STYLISH?!
  result[8] = 0;
  // MAKEUP?!
  result[9] = 0;
  // BUTT
  if (ↂ.pc.body.ass > 4) {
    result[10] = aw.npc[npcId].pref.Fother[8];
  } else {
    result[10] = 0;
  }
  if (ↂ.pc.body.ass < 3) {
    result[10] = aw.npc[npcId].pref.Fother[9];
  } else {
    result[10] = 0;
  }
  // MUSCLE
  result[11] = aw.npc[npcId].pref.Fmuscle[(ↂ.pc.body.tone - 1)];
  return result;
}
