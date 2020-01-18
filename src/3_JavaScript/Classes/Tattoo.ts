class Tattoo {
  public face: tattooLib[] | false;
  public neck: tattooLib[] | false;
  public shoulderLeft: tattooLib[] | false;
  public shoulderRight: tattooLib[] | false;
  public armLeft: tattooLib[] | false;
  public armRight: tattooLib[] | false;
  public palmLeft: tattooLib[] | false;
  public palmRight: tattooLib[] | false;
  public breast: tattooLib[] | false;
  public belly: tattooLib[] | false;
  public pubic: tattooLib[] | false;
  public thighLeft: tattooLib[] | false;
  public thighRight: tattooLib[] | false;
  public calfLeft: tattooLib[] | false;
  public calfRight: tattooLib[] | false;
  public feetLeft: tattooLib[] | false;
  public feetRight: tattooLib[] | false;
  public backUpper: tattooLib[] | false;
  public backLower: tattooLib[] | false;
  public butt: tattooLib[] | false;
  public asshole: tattooLib[] | false;
  public vagina: tattooLib[] | false;
  constructor(key, { face, neck, shoulderLeft, shoulderRight, armLeft, armRight, palmLeft, palmRight, breast, belly, pubic, thighLeft, thighRight, calfLeft, calfRight, feetLeft, feetRight, backUpper, backLower, butt, asshole, vagina }: Tattoo) {
    if (face) {
      this.face = clone(face);
    } else {
        this.face = false;
    }
    if (neck) {
      this.neck = clone(neck);
    } else {
        this.neck = false;
    }
    if (shoulderLeft) {
      this.shoulderLeft = clone(shoulderLeft);
    } else {
        this.shoulderLeft = false;
    }
    if (shoulderRight) {
      this.shoulderRight = clone(shoulderRight);
    } else {
        this.shoulderRight = false;
    }
    if (armLeft) {
      this.armLeft = clone(armLeft);
    } else {
        this.armLeft = false;
    }
    if (armRight) {
      this.armRight = clone(armRight);
    } else {
        this.armRight = false;
    }
    if (palmLeft) {
      this.palmLeft = clone(palmLeft);
    } else {
        this.palmLeft = false;
    }
    if (palmRight) {
      this.palmRight = clone(palmRight);
    } else {
        this.palmRight = false;
    }
    if (breast) {
      this.breast = clone(breast);
    } else {
        this.breast = false;
    }
    if (belly) {
      this.belly = clone(belly);
    } else {
        this.belly = false;
    }
    if (pubic) {
      this.pubic = clone(pubic);
    } else {
        this.pubic = false;
    }
    if (thighLeft) {
      this.thighLeft = clone(thighLeft);
    } else {
        this.thighLeft = false;
    }
    if (thighRight) {
      this.thighRight = clone(thighRight);
    } else {
        this.thighRight = false;
    }
    if (calfLeft) {
      this.calfLeft = clone(calfLeft);
    } else {
        this.calfLeft = false;
    }
    if (calfRight) {
      this.calfRight = clone(calfRight);
    } else {
        this.calfRight = false;
    }
    if (feetLeft) {
      this.feetLeft = clone(feetLeft);
    } else {
        this.feetLeft = false;
    }
    if (feetRight) {
      this.feetRight = clone(feetRight);
    } else {
        this.feetRight = false;
    }
    if (backUpper) {
      this.backUpper = clone(backUpper);
    } else {
        this.backUpper = false;
    }
    if (backLower) {
      this.backLower = clone(backLower);
    } else {
        this.backLower = false;
    }
    if (butt) {
      this.butt = clone(butt);
    } else {
        this.butt = false;
    }
    if (asshole) {
      this.asshole = clone(asshole);
    } else {
        this.asshole = false;
    }
    if (vagina) {
      this.vagina = clone(vagina);
    } else {
        this.vagina = false;
    }
  }
  public get has(): boolean {
    const locs = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
    for (const loc of locs) {
      if (this[loc]) {
        return true;
      }
    }
    return false;
  }
  public get count(): number {
    const locs = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
    let c = 0;
    for (const loc of locs) {
      if (this[loc]) {
        c += Object.keys(this[loc]).length;
      }
    }
    return c;
  }
  public get visible(): [boolean, boolean, boolean, boolean, boolean] {
    const locs = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
    // const covers = [[false], [false], ["top"], ["top"], ["top"], ["top"], [false], [false], ["top", "bra"], ["top"], ["bottom"], ["bottom", "panties"], ["bottom"], ["bottom"], ["bottom"], ["bottom"], [false], [false], ["top"], ["top"], ["bottom", "panties"], ["bottom", "panties"], ["bottom", "panties"]];
    let visible = false;
    let lewd = false;
    let tattoo = false;
    let bodywriting = false;
    let scar = false;
    let topLocs = ["shoulderLeft", "shoulderRight", "armLeft", "armRight", "breast", "belly", "backUpper", "backLower"];
    let bottomLocs = ["pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backLower", "butt", "asshole", "vagina"];
    let alwaysVisibleLocs = ["face", "neck", "palmLeft", "palmRight"];
    let tattooLocs = [] as string[];
    for (const loc of locs) {
      if (this[loc]) {
        /* THIS SHIT DOESN'T WORK
        if (covers[locs.indexOf(loc)][0] === false) {
          visible = true;
        } else if (ↂ.pc.clothes.worn.coat === "normal" && ↂ.pc.clothes.keys.coat !== 0) {
          // covered
        } else if (covers[locs.indexOf(loc)].length === 1 && covers[locs.indexOf(loc)][0] !== true && covers[locs.indexOf(loc)][0] !== false) {
          if (setup.clothes.exposed[covers[locs.indexOf(loc)][0]]) {
            visible = true;
          }
        } else if (covers[locs.indexOf(loc)].length === 2 && covers[locs.indexOf(loc)][0] !== true && covers[locs.indexOf(loc)][0] !== false) {
          if (setup.clothes.exposed[covers[locs.indexOf(loc)][0]] && ↂ.pc.clothes.worn[covers[locs.indexOf(loc)][1]] !== "normal" && ↂ.pc.clothes.keys[covers[locs.indexOf(loc)][1]] === 0) {
            visible = true;
          }
        } */
        tattooLocs.push(loc);
        for (let index = 0; index < this[loc].length; index++) {
          if (this[loc][index].lewd) {
            lewd = true;
          }
          if (this[loc][index].type === "tattoo") {
            tattoo = true;
          }
          if (this[loc][index].type === "bodywriting") {
            bodywriting = true;
          }
          if (this[loc][index].type === "scar") {
            scar = true;
          }
        }
        if (alwaysVisibleLocs.includes(loc)) {
          visible = true;
        }
      }
    }
    if (setup.clothes.exposed.top) {
      for (let iii = 0; iii < tattooLocs.length; iii++) {
        if (topLocs.includes(tattooLocs[iii])) {
          visible = true;
        }
      }
    }
    if (setup.clothes.exposed.bottom) {
      for (let iii = 0; iii < tattooLocs.length; iii++) {
        if (bottomLocs.includes(tattooLocs[iii])) {
          visible = true;
        }
      }
    }
    return [visible, lewd, tattoo, bodywriting, scar];
  }
  public get getText(): string {
    const locs = ["face", "neck", "shoulderLeft", "shoulderRight", "armLeft", "armRight", "palmLeft", "palmRight", "breast", "belly", "pubic", "thighLeft", "thighRight", "calfLeft", "calfRight", "feetLeft", "feetRight", "backUpper", "backLower", "butt", "asshole", "vagina"];
    let c = "";
    for (const loc of locs) {
      if (this[loc]) {
        for (let index = 0; index < this[loc].length; index++) {
          if (this[loc][index].type === "bodywriting") {
            c = this[loc][index].text;
          }
        }
      }
    }
    return c;
  }
}

