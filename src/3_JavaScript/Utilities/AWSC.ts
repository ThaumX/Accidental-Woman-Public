
//    .d88          88b.     .d88          88b.
//   d88P"          "Y88b   d88P"          "Y88b
//  d88P              Y88b d88P              Y88b
//  888     .d88b.     888 888     .d88b.     888
//  888    d88""88b    888 888    d88""88b    888
//  Y88b   888  888   d88P Y88b   888  888   d88P
//   Y88b. Y88..88P .d88P   Y88b. Y88..88P .d88P
//    "Y88  "Y88P"  88P"     "Y88  "Y88P"  88P"
//
// AW-SUGARCUBE DATA INTERFACE FUNCTIONS: AWSC

setup.awsc = {
  ref(varName: string, opt: "parse" | "set" = "parse", value?: any): any {
    if (!setup.testes.test(varName)) {
      try {
        if (opt === "parse") {
          return eval(varName);
        } else {
          varName += ` = ${value};`;
          eval(varName);
        }
      } catch (e) { aw.con.warn(`Total failure setup.awsc.ref - eval failed - passage: ${aw.passage.title}. varName: ${varName}.`); }
    }
    const nameString: string = (varName[1] === ".") ? varName.slice(2) : varName.slice(1);
    const nameArray: string[] = nameString.split(".");
    let reference = ↂ;
    for (let i = 0, c = nameArray.length - 1; i < c; i++) {
      reference = reference[nameArray[i]];
    }
    let lastBitch = nameArray.pop() as string;
    const bitchChek = /\[/;
    let bitches;
    let prop;
    if ( bitchChek.test(lastBitch)) {
      lastBitch += "whore";
      bitches = lastBitch.split(/([\[\]]+)/);
      bitches.delete("[", "]");
      bitches.pop();
      const c = bitches.length - 1;
      for (let i = 0; i < c; i++) {
        reference = reference[bitches[i]];
      }
      if ( isNaN(bitches[c]) ) {
        prop = bitches[c];
      } else {
        prop = Number(bitches[c]);
      }
    } else {
      prop = lastBitch;
    }
    if (opt === "parse") {
      return reference[prop];
    } else {
      if ( typeof value === "object" || Array.isArray(value) ) {
        reference[prop] = clone(value);
      } else {
        reference[prop] = value;
      }
    }
  },
  parse(varName: string): any {
    return setup.awsc.ref(varName, "parse");
  },
  set(varName: string, value: any): any {
    setup.awsc.ref(varName, "set", value);
  },
};

