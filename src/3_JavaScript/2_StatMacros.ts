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
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("Stress Macro requires a stress value");
    } else if ("number" !== typeof this.args[0]) {
      return this.error("Stress macro needs numeric amount value.");
    }
    if (leng === 1) {
      const amt = this.args[0];
      setup.status.stress(amt);
    } else if (leng === 2) {
      const amt = this.args[0];
      const tgt = this.args[1];
      setup.status.stress(amt, tgt);
    } else {
      return this.error("Too many arguments sent to stress macro.");
    }
  },
});
Macro.add("anger", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("Anger Macro requires an anger value");
    } else if ("number" !== typeof this.args[0]) {
      return this.error("Anger macro needs numeric amount value.");
    }
    if (leng === 1) {
      const amt = this.args[0];
      setup.status.anger(amt);
    } else if (leng === 2) {
      const amt = this.args[0];
      const tgt = this.args[1];
      setup.status.anger(amt, tgt);
    } else {
      return this.error("Too many arguments sent to anger macro.");
    }
  },
});
Macro.add("happy", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("Happy Macro requires a happiness value");
    } else if ("number" !== typeof this.args[0]) {
      return this.error("Happy macro needs numeric amount value.");
    }
    if (leng === 1) {
      const amt = this.args[0];
      setup.status.happy(amt);
    } else if (leng === 2) {
      const amt = this.args[0];
      const tgt = this.args[1];
      setup.status.happy(amt, tgt);
    } else {
      return this.error("Too many arguments sent to happiness macro.");
    }
  },
});
Macro.add("tired", {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("Tired Macro requires a happy value");
    } else if ("number" !== typeof this.args[0]) {
      return this.error("Tired macro needs numeric amount value.");
    }
    if (leng === 1) {
      const amt = this.args[0];
      setup.status.tired(amt);
    } else if (leng === 2) {
      const amt = this.args[0];
      const tgt = this.args[1];
      setup.status.tired(amt, tgt);
    } else {
      return this.error("Too many arguments sent to tired macro.");
    }
  },
});
Macro.add(["arousal", "arouse"], {
  handler() {
    const leng = this.args.length;
    const coded = new RegExp(/(X|x)[0-9]{0,2}$/);
    if (leng === 0) {
      return this.error("Arousal macro requires an amount value");
    } else if ("number" !== typeof this.args[0] && !coded.test(this.args[0])) {
      return this.error("Arousal macro needs numeric or 'X#' value.");
    }
    if (leng === 1) {
      const amt = this.args[0];
      setup.status.arousal(amt);
    } else if (leng === 2) {
      const amt = this.args[0];
      const tgt = this.args[1];
      setup.status.arousal(amt, tgt);
    } else {
      return this.error("Too many arguments sent to arousal macro.");
    }
  },
});
Macro.add(["satisfaction", "satisfy"], {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("Satisfaction Macro requires an amount value");
    } else if ("number" !== typeof this.args[0]) {
      return this.error("Satisfaction macro needs numeric amount value.");
    }
    if (leng === 1) {
      const amt = this.args[0];
      setup.status.satisfact(amt);
    } else if (leng === 2) {
      const amt = this.args[0];
      const tgt = this.args[1];
      setup.status.satisfact(amt, tgt);
    } else {
      return this.error("Too many arguments sent to satisfaction macro.");
    }
  },
});

Macro.add(["lonely", "loneliness"], {
  handler() {
    const leng = this.args.length;
    if (leng === 0) {
      return this.error("Satisfaction Macro requires an amount value");
    } else if ("number" !== typeof this.args[0]) {
      return this.error("Satisfaction macro needs numeric amount value.");
    }
    if (leng === 1) {
      const amt = this.args[0];
      setup.status.lonely(amt);
    } else if (leng === 2) {
      const amt = this.args[0];
      const tgt = this.args[1];
      setup.status.lonely(amt, tgt);
    } else {
      return this.error("Too many arguments sent to satisfaction macro.");
    }
  },
});
