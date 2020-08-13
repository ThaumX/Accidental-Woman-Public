/*
888888b.                     888
888  "88b                    888
888  .88P                    888
8888888K.   8888b.  88888b.  888  888 .d8888b
888  "Y88b     "88b 888 "88b 888 .88P 88K
888    888 .d888888 888  888 888888K  "Y8888b.
888   d88P 888  888 888  888 888 "88b      X88
8888888P"  "Y888888 888  888 888  888  88888P'


*/

interface setupBank {
  loan: {
    apply: () => void;
    pay: (amount: number) => void;
    minPayment: () => number;
    interest: () => number;
    accept: (amount: number) => void;
  };
  savings: {
    apply: () => void;
    deposit: (amount: number) => void;
    debit: (amount: number) => void;
    interest: () => number;
  };
  credit: {
    apply: () => void;
    debit: (amount: number) => void;
    minPayment: () => number;
    pay: (amount: number) => void;
    interest: () => number;
    accept: () => void;
  };
  atm: (bank?: string) => void;
  creditCheck: () => number;
  faust: {
    name: string;
  };
  indigo: {
    name: string;
  };
  getAnnual: (rate: number) => string;
  weeklyRun: () => void;
}


setup.bank = {} as setupBank;

setup.bank.loan = {
  apply(): void {
    aw.L();
    const _bank = State.temporary.bank;
    let _amt = Number(State.temporary.bankloanrequestamt);
    ↂ.flag.bank[_bank].appLoan = true;
    const cc = setup.bank.creditCheck();
    const max = cc * 1000;
    if (cc === 0) {
      aw.replace("#bankyLoan", `We are sorry, but due to your credit rating your application has been @@.bad;denied@@. Please check back later when your financial situation has improved.`);
      aw.S();
      return;
    }
    ↂ.home.finance.loanInterestPer = Math.max(7 - cc, 3);
    if (Math.ceil(_amt / 1000) > cc) {
      _amt = max;
    }
    aw.S();
    aw.replace("#bankyLoan", `Congratulations! You have been @@.good;approved@@ for a personal loan of @@.money;₢${_amt}@@! The interest rate for this loan is @@.monospace;0.${ↂ.home.finance.loanInterestPer}% weekly@@ (${setup.bank.getAnnual(ↂ.home.finance.loanInterestPer)}). Your payments will be @@.money;₢${Math.ceil(_amt / 20)}@@ per week. @@.note;This offer is only valid for the current banking session.@@<br><<button "ACCEPT OFFER">><<run setup.bank.loan.accept(${_amt})>><</button>>`);
  },
  pay(amount: number): void {
    if (Number(amount) > ↂ.home.finance.loan) {
      amount = ↂ.home.finance.loan;
    }
    if (Number(amount) > State.active.variables.AW.cash) {
      if (State.active.variables.AW.cash > 0) {
        amount = State.active.variables.AW.cash;
      } else {
        amount = 0;
      }
    }
    ↂ.home.finance.loan -= Number(amount);
    State.active.variables.AW.cash -= Number(amount);
    ↂ.home.finance.misc += Number(amount);
    if (ↂ.home.finance.loan === 0) {
      ↂ.flag.bank.faust.loan = false;
      ↂ.flag.bank.indigo.loan = false;
    }
    aw.S();
  },
  minPayment(): number {
    return ↂ.flag.bank.payment;
  },
  interest(): number {
    const balance = ↂ.home.finance.loan;
    const rate = ↂ.home.finance.loanInterestPer;
    return Math.ceil(balance * (rate / 1000));
  },
  accept(amount: number): void {
    aw.L();
    const _bank = State.temporary.bank;
    State.active.variables.AW.cash += amount;
    ↂ.home.finance.loan += amount;
    ↂ.home.finance.miscIncome += amount;
    ↂ.flag.bank[_bank].loan = true;
    ↂ.flag.bank.payment = Math.ceil(amount / 20);
    aw.S();
    aw.replace("#bankyLoan", `Your loan request has been processed! @@.money;₢${amount}@@ has been deposited into your personal SEED account. Thank you for using ${setup.bank[_bank].name} financial services.`);
  },
};

setup.bank.savings = {
  apply() {
    aw.L();
    const _bank = State.temporary.bank;
    ↂ.home.finance.bank += 25;
    State.active.variables.AW.cash -= 25;
    ↂ.flag.bank[_bank].saving = true;
    aw.S();
    aw.replace("#bankySaving", `
      Thank you for starting a savings account with ${setup.bank[_bank].name}! You can now enjoy the security of having money safe from petty crime, all while earning interest! You can access your savings from any ${setup.bank[_bank].name} branch or ATM.<br><<textbox "_banksavingamt" "0">> <<button "Deposit">><<run setup.bank.savings.deposit(_banksavingamt)>><</button>>
    `);
  },
  deposit(amount: number) {
    aw.L();
    if (Number(amount) > State.active.variables.AW.cash) {
      if (State.active.variables.AW.cash > 0) {
        amount = State.active.variables.AW.cash;
      } else {
        amount = 0;
      }
    }
    ↂ.home.finance.bank += Number(amount);
    State.active.variables.AW.cash -= Number(amount);
    aw.S();
    aw.replace("#bankySaving", `<<include [[BankInsertSavings]]>> @@.ctn;Deposited ₢${amount}!@@`);
  },
  debit(amount: number) {
    aw.L();
    if (Number(amount) > ↂ.home.finance.bank) {
      amount = ↂ.home.finance.bank;
    }
    ↂ.home.finance.bank -= Number(amount);
    State.active.variables.AW.cash += Number(amount);
    aw.S();
    aw.replace("#bankySaving", `<<include [[BankInsertSavings]]>> @@.ctn;Withdrew ₢${amount}!@@`);
  },
  interest(): number {
    const balance = ↂ.home.finance.bank;
    const rate = ↂ.home.finance.bankInterestPer;
    return Math.round(balance * (rate / 10000));
  },
};

setup.bank.credit = {
  apply() {
    aw.L();
    const _bank = State.temporary.bank;
    ↂ.flag.bank[_bank].appCred = true;
    const cc = setup.bank.creditCheck();
    ↂ.home.finance.creditInterestPer = 10 - cc;
    aw.S();
    if (cc === 0) {
      aw.replace("#bankyCredit", `We are sorry, but due to your credit rating your application has been @@.bad;denied@@. Please check back later when your financial situation has improved.`);
      return;
    }
    aw.replace("#bankyCredit", `Congratulations! You have been @@.good;approved@@ for a credit account with a limit of @@.money;₢2,500@@! The interest rate for this loan is @@.monospace;0.${ↂ.home.finance.creditInterestPer}% weekly@@ (${setup.bank.getAnnual(ↂ.home.finance.creditInterestPer)}). @@.note;This offer is only valid for the current banking session.@@<br><<button "ACCEPT OFFER">><<run setup.bank.credit.accept()>><</button>>`);
  },
  debit(amount: number) {
    aw.L();
    if (ↂ.home.finance.credit + Number(amount) > 2500) {
      amount = 2500 - ↂ.home.finance.credit;
    }
    ↂ.home.finance.credit += Number(amount);
    State.active.variables.AW.cash += Number(amount);
    ↂ.home.finance.miscIncome += Number(amount);
    aw.S();
  },
  minPayment() {
    return Math.ceil(ↂ.home.finance.credit * 0.018);
  },
  pay(amount: number) {
    if (Number(amount) > ↂ.home.finance.credit) {
      amount = ↂ.home.finance.credit;
    }
    if (Number(amount) > State.active.variables.AW.cash) {
      if (State.active.variables.AW.cash > 0) {
        amount = State.active.variables.AW.cash;
      } else {
        amount = 0;
      }
    }
    ↂ.home.finance.credit -= Number(amount);
    State.active.variables.AW.cash -= Number(amount);
    ↂ.home.finance.misc += Number(amount);
    aw.S();
  },
  interest() {
    const balance = ↂ.home.finance.credit;
    const rate = ↂ.home.finance.creditInterestPer;
    return Math.ceil(balance * (rate / 1000));
  },
  accept() {
    aw.L();
    const _bank = State.temporary.bank;
    ↂ.home.finance.credit = 0;
    ↂ.flag.bank[_bank].credit = true;
    aw.S();
    aw.replace("#bankyLoan", `Your credit account request has been processed! @@.money;₢$2,500@@ is available for your immediate use. Thank you for using ${setup.bank[_bank].name} financial services.<br><<textbox "_bankcreditamt" "0">> <<button "Cash Advance">><<run setup.bank.credit.debit(_bankcreditamt)>><</button>>`);
  },
};

setup.bank.getAnnual = function(rate: number): string {
  let output = "<span class='monospace'>";
  switch (rate) {
    case 1:
      output += "5.4";
      break;
    case 2:
      output += "11.0";
      break;
    case 3:
      output += "16.9";
      break;
    case 4:
      output += "23.1";
      break;
    case 5:
      output += "29.7";
      break;
    case 6:
      output += "36.6";
      break;
    case 7:
      output += "43.9";
      break;
    case 8:
      output += "51.5";
      break;
    case 9:
      output += "59.6";
      break;
  }
  output += "% annual</span>";
  return output;
};

setup.bank.atm = function(bank: string = "faust"): void {
  const finance = ↂ.home.finance;
  let flag;
  let img;
  let title;
  if (bank === "faust") {
    flag = ↂ.flag.bank.faust;
    img = "IMG-Bank-Faust";
    title = "Faust ATM";
  } else {
    flag = ↂ.flag.bank.indigo;
    img = "IMG-Bank-IndigoDrake";
    title = "Indigo Dragon ATM";
  }
  let output: string = `<div class="bankBackground atmMenuCunt whiteOutline"><center><img data-passage="${img}" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;"><img data-passage="IMG-ATM" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"></center><h2>Account Information</h2><div style="background-color:rgba(255,255,255,0.75);border-radius:14px;padding:5px;"><table id="invisTable"><tr>`;
  if (flag.saving) {
    output += `<td style="width:33%;"><b>Savings Balance:</b> <span class="money">₢${finance.bank}</span></td>`;
  } else {
    output += `<td style="width:33%;">No Savings Account</td>`;
  }
  if (flag.credit) {
    output += `<td><b>Credit Account Balance:</b> <span class="monospace bad">₢${finance.credit}</span></td>`;
  } else {
    output += `<td>No Credit Account</td>`;
  }
  if (flag.loan) {
    output += `<td style="width:33%;"><b>Loan Balance:</b> <span class="monospace bad">₢${finance.loan}</span></td>`;
  } else {
    output += `<td style="width:33%;">No Personal Loan</td>`;
  }
  output += "</tr></table></div><div style='background-color:rgba(255,255,255,0.75);border-radius:14px;padding:5px;'>";
  output += "<center><span style='font-size:1.2rem;'>Savings Account Options</span></center><p id='bankySaving'>";
  if (ↂ.flag.bank[bank].saving) {
    output += "<<include [[BankInsertSavings]]>>";
  } else {
    output += `You do not have a savings account with ${setup.bank[bank].name}.`;
  }
  output += "</p></div></div>";
  setup.time.add(5);
  setup.dialog(title, output);
};

setup.bank.creditCheck = function() {
  let assets = State.active.variables.AW.cash + ↂ.home.finance.bank;
  assets -= ↂ.home.finance.loan;
  assets -= ↂ.home.finance.credit;
  const net = ↂ.home.finance.totalIncome - ↂ.home.finance.totalExpense;
  let score = 0;
  if (assets > 999) {
    score += 2;
  } else if (assets > 0) {
    score += 1;
  }
  if (net > 499) {
    score += 2;
  } else if (net > 0) {
    score += 1;
  }
  score += random(0, 1);
  return score;
};

setup.bank.faust = {
  name: "Faust Bank - Savings and Loan",
};

setup.bank.indigo = {
  name: "Indigo Dragon Capital Bank",
};

setup.bank.weeklyRun = function() {
  if (ↂ.flag.bank.indigo.loan || ↂ.flag.bank.faust.loan) {
    const int = setup.bank.loan.interest();
    ↂ.home.finance.loan += int;
    ↂ.home.finance.loanInterest = int;
    const minPay = setup.bank.loan.minPayment();
    setup.bank.loan.pay(minPay);
  }
  if (ↂ.flag.bank.indigo.credit || ↂ.flag.bank.faust.credit) {
    const int = setup.bank.credit.interest();
    ↂ.home.finance.credit += int;
    ↂ.home.finance.creditInterest = int;
    const minPay = setup.bank.credit.minPayment();
    setup.bank.credit.pay(minPay);
  }
  if (ↂ.flag.bank.faust.saving || ↂ.flag.bank.indigo.saving) {
    const int = setup.bank.savings.interest();
    ↂ.home.finance.bank += int;
    ↂ.home.finance.bankInterest = int;
  }
};
