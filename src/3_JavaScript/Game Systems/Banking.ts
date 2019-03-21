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
    apply: { (): void };
    pay: { (): void };
    minPayment: { (): void };
    interest: { (): void };
    accept: { (): void }
  };
  savings: {
    apply: { (): void };
    deposit: { (): void };
    debit: { (): void };
    interest: { (): void };
    termCheck: { (): void };
    accept: { (): void }
  };
  credit: {
    apply: { (): void };
    debit: { (): void };
    minPayment: { (): void };
    pay: { (): void };
    interest: { (): void };
    accept: { (): void }
  };
  atm: { (bank?: string): void };
  creditCheck: { (): void };
  faust: {
    name: string
  };
  indigo: {
    name: string
  }
}


setup.bank = {} as setupBank;

setup.bank.loan = {
  apply(): void {},
  pay(): void {},
  minPayment(): void {},
  interest(): void {},
  accept(): void {},
};

setup.bank.savings = {
  apply() {},
  deposit() {},
  debit() {},
  interest() {},
  termCheck() {},
  accept() {},
};

setup.bank.credit = {
  apply() {},
  debit() {},
  minPayment() {},
  pay() {},
  interest() {},
  accept() {},
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
  let output: string = `<div class="bankBackground atmMenuCunt whiteOutline"><center><img data-passage="${img}" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;"><img data-passage="IMG-ATM" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"></center><h2>Account Information</h2><div style="background-color:rgba(255,255,255,0.75);border-radius:14px;"><table id="invisTable"><tr>`;
  if (flag.savings) {
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
  output += "</tr></table></div><div style='background-color:rgba(255,255,255,0.75);border-radius:14px;'><h3>Options:</h3><center><span class='disabled'><<button 'DEPOSIT TO SAVINGS'>><</button>><<tab>><<button 'WITHDRAWL FROM SAVINGS'>><</button>></span><br>You must have a savings account!</center></div></div>";
  setup.time.add(5);
  setup.dialog(title, output);
};

setup.bank.creditCheck = function() {};

setup.bank.faust = {
  name: "Faust Bank - Savings and Loan",
};

setup.bank.indigo = {
  name: "Indigo Dragon Capital Bank",
};

