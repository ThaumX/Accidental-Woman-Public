/*****************************************************************
                Units macro and functions by Paeden
*****************************************************************/

Macro.add("unit", {
  handler() {
    let out = "";
    if (this.args.length > 3 || this.args.length < 2) {
      setup.alert(`Unit macro requires 2-3 arguments!`);
      return;
    }
    const input = this.args[0];
    const type = this.args[1];
    if (this.args[2] === "h") {
      out += setup.unitHeight(input, type);
    } else if (this.args[2] === "num") {
      out += setup.unit(input, type, true);
    } else {
      out += setup.unit(input, type);
    }
    if (out === undefined) {
      setup.alert(`Unit macro has failed to call setup.unit!`);
      return;
    } else {
      return new Wikifier(this.output, out);
    }
  },
});

// converts from one unit to another in valid text, or if num=true a number
setup.unit = function(input: number, type: unit, num: boolean = false): string|number {
  function conv1(hurgh, convTo, expand) {
    if (!State.active.variables.AW.metric) {
      return input + expand;
    } else {
      const outing = Math.round(input * hurgh);
      return outing + convTo;
    }
  }
  function conv2(hurgh, convTo, expand) {
    if (!State.active.variables.AW.metric) {
      const outing = Math.round(input * hurgh);
      return outing + convTo;
    } else {
      return input + expand;
    }
  }
  const gat = {
    in: conv1(2.54, "cm", " inches"),
    ft: conv1(0.3048, " meters", " feet"),
    yd: conv1(0.9144, " meters", " yards"),
    mi: conv1(1.609344, " kilometers", " miles"),
    gl: conv1(4.54609, " litres", "gallons"),
    lbs: conv1(0.4535924, "kg", " pounds"),
    cm: conv2(0.3937008, " inches", "cm"),
    m: conv2(3.28084, " feet", " metres"),
    km: conv2(0.6213712, " miles", " kilometers"),
    l: conv2(0.2199692, " gallons", " litres"),
    kg: conv2(2.204623, " pounds", "kg"),
  };
  if (num === true) {
    let out = gat[type] || "shitfuck";
    const outSl = out.slice(0, 1);
    if (outSl < 10 && outSl > 0) {
      const nums = [0, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
      let numAdd = nums[outSl];
      const outTest = out.slice(1, 2);
      if (outTest === " ") {
        out = out.slice(1, out.length);
        numAdd += out;
        return numAdd;
      } else {
      out = out.slice(1, out.length);
      numAdd += " " + out;
      return numAdd;
      }
    } else {
      return "unit macro num option requires between 1 to 9 output";
    }
  } else {
    return gat[type] || "shitfuck";
  }
};

// specific unit function for character height to convert to text display
setup.unitHeight = function(input: number, type: unit): string {
  function conv1(hurgh, burgh, convTo1, convTo2) {
    if (!State.active.variables.AW.metric) {
      const outing = Math.round((input * hurgh) * 10) / 10;
      return outing + convTo1;
    } else {
      const outing = Math.round(input * burgh);
      return outing + convTo2;
    }
  }
  function conv2(hurgh, convTo, expand) {
    if (!State.active.variables.AW.metric) {
      const outing = Math.round(input * hurgh);
      return outing + convTo;
    } else {
      return input + expand;
    }
  }
  const gat = {
    in: conv1(0.08333333, 2.54, " feet", "cm"),
    cm: conv2(0.0328084, " feet", "cm"),
  };
  return gat[type] || "unitHeight requires 'in' or 'cm' argument";
};
