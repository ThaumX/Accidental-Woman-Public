//         d8888                    .d8888b.  888                        888
//        d88888                   d88P  Y88b 888                        888
//       d88P888                   888    888 888                        888
//      d88P 888  .d88b.   .d88b.  888        88888b.   .d88b.   .d8888b 888  888
//     d88P  888 d88P"88b d8P  Y8b 888        888 "88b d8P  Y8b d88P"    888 .88P
//    d88P   888 888  888 88888888 888    888 888  888 88888888 888      888888K
//   d8888888888 Y88b 888 Y8b.     Y88b  d88P 888  888 Y8b.     Y88b.    888 "88b
//  d88P     888  "Y88888  "Y8888   "Y8888P"  888  888  "Y8888   "Y8888P 888  888
//                    888
//               Y8b d88P
//                "Y88P"

// Functions to create age verification type dialog and situations for young characters.
// Commissioned by Erin

// INTERFACE

interface IntSetupAgeCheck {
  ageCalculate: (age: number, ageID: number) => string;
  pcAgeCalc: () => void;
  ageCheck21: (difficulty: 0 | 1 | 2 | 3, passageNeeded: string) => boolean;
  ageCheck18: (difficulty: 0 | 1 | 2 | 3, passageNeeded: string) => boolean;
  shopCheck: () => boolean;
  restricted: {
    [propName: string]: number;
  };
  restrictedItems: () => boolean;
  frump: () => void;
}

// FUNCTIONS

setup.ageCheck = {
  ageCalculate(age: number, ageID: number): string {
    if (typeof age === "string" || typeof ageID === "string") {
      age = Number(age);
      ageID = Number(ageID);
    }
    if (age > 20) {
      if (age > 29) {
        return "clear adult"; // unlikely to get carded or questioned
      }
      if (age > 24 && ageID > 25) {
        return "adult"; // definitely an adult, may get carded
      }
      if (ageID > 20) {
        return "young adult"; // legal, will usually get carded
      }
      if (age > 24 && ageID < age && ageID > 20) {
        return "vain adult"; // adult, but ID says age is younger
      }
      if (ageID < 21) {
        return "bad id"; // ID age is too young, will fail when getting carded.
      }
    } else if (age < 18) {
      // super illegal
      if (ageID >= 18 && ageID - age < 3) {
        return "fake 18";
      }
      if (ageID >= 18) {
        return "fake id";
      }
      return "under 18";
    } else {
      // if age >= 18 but < 21
      if (ageID > 20) {
        switch (ageID - age) {
          case 1:
            return "fake 21";
          case 2:
            return "suspect 21";
          case 3:
            return "bad fake 21";
          default:
            return "fake id";
        }
      }
      if (ageID > 17) {
        return "good 18";
      }
      return "bad id 18";
    }
    aw.con.warn(`error in age/id category calculation - setup.age(age: ${age}, ageID: ${ageID}).`);
    return "error";
  },
  pcAgeCalc(): void {
    ↂ.pc.main.idCard = setup.ageCheck.ageCalculate(ↂ.pc.main.age, ↂ.pc.main.ageID);
    aw.S();
  },
  ageCheck21(difficulty: 0 | 1 | 2 | 3, passageNeeded: string): boolean {
    // start by getting the PC's id card category
    setup.ageCheck.pcAgeCalc();
    const id = ↂ.pc.main.idCard;
    if (difficulty === 0) { // basic bypass for bribe-type situations
      const blin = `<<go ${passageNeeded}>>`;
      aw.append("#mainshits", blin);
      return true;
    }
    // setting the passage which pc want to go into general scope for future use
    State.active.variables.ageCheckPassage = passageNeeded;
    // determine odds of getting carded, vary based on age and difficulty.
    // low age is always carded
    let ageOdds = {};
    switch (difficulty) {
      case 1:
        ageOdds = {
          "clear adult": 98,
          "adult": 90,
          "young adult": 70,
          "vain adult": 50,
          "fake 21": 50,
          "suspect 21": 50,
          "bad fake 21": 30,
          "fake id": 20,
          "bad id": 90,
          "good 18" : 60,
          "bad id 18" : 60,
          "under 18" : 15,
        };
        break;
      case 2:
        ageOdds = {
          "clear adult": 95,
          "adult": 80,
          "young adult": 70,
          "vain adult": 40,
          "fake 21": 40,
          "suspect 21": 40,
          "bad fake 21": 25,
          "fake id": 10,
          "fake 18" : 30,
          "bad id": 90,
          "good 18" : 40,
          "bad id 18" : 40,
          "under 18" : 10,
        };
        break;
      case 3:
        ageOdds = {
          "clear adult": 85,
          "adult": 80,
          "young adult": 60,
          "vain adult": 20,
          "fake 21": 20,
          "suspect 21": 10,
          "bad fake 21": 5,
          "fake id": 5,
          "fake 18" : 30,
          "bad id": 85,
          "good 18" : 20,
          "bad id 18" : 20,
          "under 18" : 10,
        };
        break;
    }
    // check if even carded
    const checkOdds = (ageOdds[id] == null) ? 100 : ageOdds[id];
    aw.con.info(`odds ${checkOdds}, ${ageOdds[id]}`); // REMOVE ME
    if (random(1, 100) <= checkOdds) {
      aw.con.info(`store did NOT check the player's ID.`); // REMOVE ME
      const blin = `<<go ${passageNeeded}>>`;
      aw.append("#mainshits", blin);
      return true; // store did NOT check the player's ID.
    }
    const groups = [
      ["clear adult", "adult", "young adult", "fake 21"], // Old enough, and don't question the ID
      ["vain adult", "bad id"], // old enough, but weird ID
      [], // questionable id. bad fake 21 is pushed based on difficulty.
      ["fake id", "under 18"], // reject id. rest is "obviously not old enough group"
    ];
    // push the bad/suspect fake to different approval groups based on difficulty
    if (difficulty > 2) {
      groups[3].push("bad fake 21");
      if (random(1, 5) < 3) {
        groups[3].push("suspect 21");
      } else {
        groups[2].push("suspect 21");
      }
    } else if (difficulty === 2) {
      groups[3].push("bad fake 21");
      groups[2].push("suspect 21");

    } else {
      groups[2].push("bad fake 21");
      groups[2].push("suspect 21");
    }
    // find the group the PC belongs in!
    let outcome = 4;
    for (let i = 0; i < 4; i++) {
      if (groups[i].includes(id)) {
        outcome = i;
        break;
      }
    }
    // finally, switch to perform appropriate actions for group
    aw.con.info(`outcome: ${outcome}`); // REMOVE ME
    console.log(groups); // REMOVE ME
    switch (outcome) {
      case 0:
        setup.notify("You get carded, but it isn't an issue.");
        const blin = `<<go ${passageNeeded}>>`;
        aw.append("#mainshits", blin);
        aw.con.info(`You get carded, but it isn't an issue. ${passageNeeded}`); // REMOVE ME
        return true;
      case 1:
        if (id === "vain adult") {
          setup.dialog("Problems with ID", "<<include [[AgeCheckVain]]>>");
          return true;
        }
        if (id === "bad id") {
          setup.dialog("Problems with ID", "<<include [[AgeCheckFakeId]]>>");
          return true;
        }
      case 2:
      if (id === "vain adult" || id === "fake id") {
        setup.dialog("Problems with ID", "<<include [[AgeCheckVain]]>>");
        return true;
      } else {
        setup.dialog("Problems with ID", "<<include [[AgeCheckFakeId]]>>");
      }
      case 3:
      if (id === "fake id" || id === "bad fake 21" || id === "fake 21") {
        setup.dialog("Problems with ID", "<<include [[AgeCheckFakeId]]>>");
        return true;
      }
      if (id === "under 18" || id === "suspect 21") {
        setup.dialog("Problems with ID", "<<include [[AgeCheckTooYoung]]>>");
        return true;
      }
    }
    return true;
  },
  ageCheck18(difficulty: 0 | 1 | 2 | 3, passageNeeded: string): boolean {
    setup.ageCheck.pcAgeCalc();
    const id = ↂ.pc.main.idCard;
    if (difficulty === 0) {
      return true;
    }
    State.active.variables.ageCheckPassage = passageNeeded;
    const ageOdds = {
      "clear adult": 98,
      "adult": 90,
      "young adult": 70,
      "vain adult": 50,
      "fake 21": 50,
      "suspect 21": 50,
      "bad fake 21": 30,
      "fake id": 20,
      "bad id": 90,
      "good 18" : 30,
      "fake 18" : 30,
      "bad id 18" : 20,
      "under 18" : 20,
    };
    const checkOdds = (ageOdds[id] == null) ? 100 : ageOdds[id];
    let modifier = 0;
    if (difficulty === 2) {
      modifier = 10;
    } else if (difficulty === 3) {
      modifier = 18;
    }
    if ((random(1, 100) - modifier) <= checkOdds) {
      const blin = `<<go ${passageNeeded}>>`;
      aw.append("#mainshits", blin);
      return true;
    } else { // carded
      if (id === "bad id 18" || id === "fake 18" || id === "fake id") {
        setup.dialog("Problems with ID", "<<include [[AgeCheckFakeId]]>>");
        return true;
      } else if (id === "under 18") {
        setup.dialog("Problems with ID", "<<include [[AgeCheckTooYoung]]>>");
        return true;
      } else {
        aw.con.info(`You get carded, but it isn't an issue. ${passageNeeded}`); // REMOVE ME
        return true;
      }
    }
    return true;
  },
  shopCheck(): boolean {
    let age = 3; // check if PC meets age restriction requirements
    if (ↂ.pc.main.age < 16) {
      age = 0;
    } else if (ↂ.pc.main.age < 19) {
      age = 1;
    } else if (ↂ.pc.main.age < 21 || (ↂ.pc.main.age < 24 && random(1, 3) === 1)) {
      age = 2;
    }
    if (age === 3) {
      return true;
    }
    const cats = ["panties", "bra", "leg", "bottom", "top", "dress", "coat", "acc", "bag", "shoe", "athU", "athL", "swimU", "swimL", "niteU", "niteL"];
    const cart = State.active.variables.cart;
    const ᚠ = aw.clothes;
    const sexThresh = [3, 7, 11];
    const expThresh = [19, 29, 39];
    const sex = sexThresh[age];
    const exp = expThresh[age];
    for (let i = 0, c = cart.length; i < c; i++) {
      if (cats.includes(cart[i][1])) {
        const g = ᚠ[cart[i][3]];
        if (g.values.sexy > sex) {
          return false;
        }
        if (g.values.exposure > exp) {
          return false;
        }
      }
    }
    return true;
  },
  restricted: {
    "DuremaxSafeT": 18,
    "DuremaxSafePE": 18,
    "trojancockS": 18,
    "trojancockUL": 18,
    "trojancockUNL": 18,
    "pleasureburst": 16,
    "BasiPill Birth Control": 21,
    // "iudApplicator": 21, removed because it's only no pregnancy option
  },
  restrictedItems(): boolean {
    const cart = State.active.variables.cart;
    const age = ↂ.pc.main.ageID;
    if (age > 22) {
      return false;
    }
    const noBuy: any[] = [];
    let tooYoung = false;
    let text = "You are not old enough to buy ";
    for (const item of cart) {
      if (setup.ageCheck.restricted[item[3]] != null && setup.ageCheck.restricted[item[3]] > age) {
        noBuy.push(item);
        text += item[0] + ", ";
        tooYoung = true;
      }
    }
    if (!tooYoung) {
      return false;
    }
    text = text.slice(0, -2);
    const output = `<center>[img[IMG-FrumpyShopkeeper]]</center>Your checkout gets interrupted when you are asked to show your ID... ${text}. The disgruntled cashier tells you to put those items back if you want to buy the other items in your cart.`;
    setup.dialog("Checkout", output);
    return true;
  },
  frump(): void {
    // TODO add potential other interactions here.
    setup.dialog("Store Clerk", "<<include [[AgeCheckPrudeShopkeeper]]>>");
  },
};

// MACROS

Macro.add("agecheck", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("No arguments sent to agecheck macro!");
    } else if ("number" !== typeof this.args[0] || "number" !== typeof  this.args[1] || "string" !== typeof this.args[2]) {
      // tslint:disable-next-line:max-line-length
      return this.error("Incorrect data type for agecheck macro arguments - number, number and string expected.");
    }
    let success;
    if (this.args[0] === 21) {
      success = setup.ageCheck.ageCheck21(this.args[1], this.args[2]);
    } else if (this.args[0] === 18) {
      success = setup.ageCheck.ageCheck18(this.args[1], this.args[2]);
    } else {
      return this.error(`Age argument provided to agecheck can be either 18 or 21. Got ${this.args[0]} instead.`);
    }
    if (!success) {
      return this.error(`Error in ageCheck (${this.args[0]}, ${this.args[1]}, ${this.args[2]}).`);
    }
  },
});
