/*********************************************************/
/*  ███████╗████████╗ █████╗ ████████╗██╗   ██╗███████╗  */
/*  ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║   ██║██╔════╝  */
/*  ███████╗   ██║   ███████║   ██║   ██║   ██║███████╗  */
/*  ╚════██║   ██║   ██╔══██║   ██║   ██║   ██║╚════██║  */
/*  ███████║   ██║   ██║  ██║   ██║   ╚██████╔╝███████║  */
/*  ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝  */
/*                                                       */
/*  ███╗   ███╗ █████╗  ██████╗██████╗  ██████╗ ███████╗ */
/*  ████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝ */
/*  ██╔████╔██║███████║██║     ██████╔╝██║   ██║███████╗ */
/*  ██║╚██╔╝██║██╔══██║██║     ██╔══██╗██║   ██║╚════██║ */
/*  ██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║╚██████╔╝███████║ */
/*  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝ */
/*********************************************************/

Macro.add("stress", {
  handler: function () {
    let leng = this.args.length;
    if (leng == 0) {
      return this.error("Stress Macro requires a stress value");
    } else if ("number" != typeof this.args[0]) {
      return this.error("Stress macro needs numeric amount value.");
    }
    if (leng == 1) {
      let amt = this.args[0];
      setup.status.stress(amt);
    } else if (leng == 2) {
      let amt = this.args[0],
        tgt = this.args[1];
      setup.status.stress(amt, tgt);
    } else if (leng == 3) {
      let amt = this.args[0],
        tgt = this.args[1],
        restore = this.args[2];
      setup.status.stress(amt, tgt, restore);
    } else {
      return this.error("Too many arguments sent to stress macro.");
    }
  }
});
Macro.add("anger", {
  handler: function () {
    let leng = this.args.length;
    if (leng == 0) {
      return this.error("Anger Macro requires an anger value");
    } else if ("number" != typeof this.args[0]) {
      return this.error("Anger macro needs numeric amount value.");
    }
    if (leng == 1) {
      let amt = this.args[0];
      setup.status.anger(amt);
    } else if (leng == 2) {
      let amt = this.args[0],
        tgt = this.args[1];
      setup.status.anger(amt, tgt);
    } else if (leng == 3) {
      let amt = this.args[0],
        tgt = this.args[1],
        restore = this.args[2];
      setup.status.anger(amt, tgt, restore);
    } else {
      return this.error("Too many arguments sent to anger macro.");
    }
  }
});
Macro.add("happy", {
  handler: function () {
    let leng = this.args.length;
    if (leng == 0) {
      return this.error("Happy Macro requires a happiness value");
    } else if ("number" != typeof this.args[0]) {
      return this.error("Happy macro needs numeric amount value.");
    }
    if (leng == 1) {
      let amt = this.args[0];
      setup.status.happy(amt);
    } else if (leng == 2) {
      let amt = this.args[0],
        tgt = this.args[1];
      setup.status.happy(amt, tgt);
    } else if (leng == 3) {
      let amt = this.args[0],
        tgt = this.args[1],
        restore = this.args[2];
      setup.status.happy(amt, tgt, restore);
    } else {
      return this.error("Too many arguments sent to happiness macro.");
    }
  }
});
Macro.add("tired", {
  handler: function () {
    let leng = this.args.length;
    if (leng == 0) {
      return this.error("Tired Macro requires a happy value");
    } else if ("number" != typeof this.args[0]) {
      return this.error("Tired macro needs numeric amount value.");
    }
    if (leng == 1) {
      let amt = this.args[0];
      setup.status.tired(amt);
    } else if (leng == 2) {
      let amt = this.args[0],
        tgt = this.args[1];
      setup.status.tired(amt, tgt);
    } else if (leng == 3) {
      let amt = this.args[0],
        tgt = this.args[1],
        restore = this.args[2];
      setup.status.tired(amt, tgt, restore);
    } else {
      return this.error("Too many arguments sent to tired macro.");
    }
  }
});
Macro.add("arousal", {
  handler: function () {
    let leng = this.args.length;
    const coded = new RegExp(/(X|x)[0-9]{0,2}$/);
    if (leng == 0) {
      return this.error("Arousal macro requires an amount value");
    } else if ("number" != typeof this.args[0] && !coded.test(this.args[0])) {
      return this.error("Arousal macro needs numeric or 'X#' value.");
    }
    if (leng == 1) {
      let amt = this.args[0];
      setup.status.arousal(amt);
    } else if (leng == 2) {
      let amt = this.args[0],
        tgt = this.args[1];
      setup.status.arousal(amt, tgt);
    } else if (leng == 3) {
      let amt = this.args[0],
        tgt = this.args[1],
        restore = this.args[2];
      setup.status.arousal(amt, tgt, restore);
    } else {
      return this.error("Too many arguments sent to arousal macro.");
    }
  }
});
Macro.add("satisfaction", {
  handler: function () {
    let leng = this.args.length;
    if (leng == 0) {
      return this.error("Satisfaction Macro requires an amount value");
    } else if ("number" != typeof this.args[0]) {
      return this.error("Satisfaction macro needs numeric amount value.");
    }
    if (leng == 1) {
      let amt = this.args[0];
      setup.status.satisfact(amt);
    } else if (leng == 2) {
      let amt = this.args[0],
        tgt = this.args[1];
      setup.status.satisfact(amt, tgt);
    } else if (leng == 3) {
      let amt = this.args[0],
        tgt = this.args[1],
        restore = this.args[2];
      setup.status.satisfact(amt, tgt, restore);
    } else {
      return this.error("Too many arguments sent to satisfaction macro.");
    }
  }
});