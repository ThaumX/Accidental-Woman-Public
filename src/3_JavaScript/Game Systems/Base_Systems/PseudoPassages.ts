/*
██████╗ ███████╗███████╗██╗   ██╗██████╗  ██████╗
██╔══██╗██╔════╝██╔════╝██║   ██║██╔══██╗██╔═══██╗
██████╔╝███████╗█████╗  ██║   ██║██║  ██║██║   ██║
██╔═══╝ ╚════██║██╔══╝  ██║   ██║██║  ██║██║   ██║
██║     ███████║███████╗╚██████╔╝██████╔╝╚██████╔╝
╚═╝     ╚══════╝╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝
*/


interface IntAWpseudo {
  has: (name: string) => boolean; // returns true if data/pseudopassage exists, else false
  get: (name: string) => string; // returns content of pseudopassage or error text
  nobr: (raw: string) => string; // removes linebreak characters for linebreak consistency
}

// Stores pseudo-passage data from mods
aw.data = {};

// Pseudo utility functions
aw.pseudo = {
  has(name: string) {
    if (aw.data[name] == null) {
      return false;
    }
    return true;
  },
  get(name: string) {
    if (aw.pseudo.has(name)) {
      return aw.pseudo.nobr(aw.data[name]);
    }
    aw.con.warn(`Error: the pseudo-passage ${name} does not exist.`);
    return `Error: the pseudo-passage ${name} does not exist.`;
  },
  nobr(raw: string) {
    return raw.replace(/(\n|\r)/g, " ");
  },
};

// MACROS

Macro.add("pseudo", {
  handler() {
    if (this.args.length === 0) {
      return this.error("The <<pseudo>> macro requires at least one pseudo-passage name argument");
    } else if (this.args.length > 1) {
      let out = "";
      for (const name of this.args) {
        out += aw.pseudo.get(name);
        out += "<br>";
      }
      return new Wikifier(this.output, out);
    } else {
      return new Wikifier(this.output, aw.pseudo.get(this.args[0]));
    }
  },
});

