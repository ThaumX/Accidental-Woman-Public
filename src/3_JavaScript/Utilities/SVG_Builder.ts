
//   .d8888b.  888     888  .d8888b.       888888b.            d8b 888      888
//  d88P  Y88b 888     888 d88P  Y88b      888  "88b           Y8P 888      888
//  Y88b.      888     888 888    888      888  .88P               888      888
//   "Y888b.   Y88b   d88P 888             8888888K.  888  888 888 888  .d88888
//      "Y88b.  Y88b d88P  888  88888      888  "Y88b 888  888 888 888 d88" 888
//        "888   Y88o88P   888    888      888    888 888  888 888 888 888  888
//  Y88b  d88P    Y888P    Y88b  d88P      888   d88P Y88b 888 888 888 Y88b 888
//   "Y8888P"      Y8P      "Y8888P88      8888888P"   "Y88888 888 888  "Y88888

/* PORTRAIT PARTS ORDER:
  0:  hairRear,
  1:  body,
  2:  clothes,
  3:  ears,
  4:  face,
  5:  mouth,
  6:  beard,
  7:  mustache,
  8:  nose,
  9:  eyes,
  10: eyebrows,
  11: hairFront,
  12: hat,
  13: eyeglass,
*/

interface setupSVG {
  build: ({sex, parts, colors, bg, bgColor}: setupSVGbuildArg) => string;
}

interface setupSVGbuildArg {
  sex: "male" | "female";
  parts: number[];
  colors: number[];
  bg?: number;
  bgColor?: number;
}


setup.svg = {
  build({
    sex,
    parts,
    colors,
    bg = 0,
    bgColor = 0,
  }: setupSVGbuildArg): string {
    const partRef = aw.svg[sex];
    const colRef = aw.svg.color;
    const pieces = ["hairRear", "body", "clothes", "ears", "face", "mouth", "beard", "mustache", "nose", "eyes", "eyebrows", "hairFront", "hat", "eyeglass"];
    const merged: string[] = [];
    if (parts.length !== colors.length) {
      return '<span class="bad" style="font-size:1.2rem;">ERROR: Incomplete Array</span>';
    }
    // interleaving subfunction
    function interleave(A: string[], B: string[]): void {
      const leng = A.length - 1; // single item arrays will deliberately fall through for loop.
      for (let ii = 0; ii < leng; ii++) { // run for all but final index of A.
        merged.push(A[ii]); // push in A
        merged.push(B[ii]); // push in B
      }
      merged.push(A[leng]); // push in the final (or only) index of A
    }
    // add background to array.
    try {
      interleave(aw.svg.base.background[bg], aw.svg.base.bgColor[bgColor]);
    } catch (e) {aw.con.warn(`error in svg interleave function for background!`); }

    for (let i = 0, c = parts.length; i < c; i++) {
      try {
        if (partRef[pieces[i]][parts[i]] == null) {
          // bad part number somehow...
          aw.con.warn(`SVG builder - invalid part number (${parts[i]}) in ${pieces[i]}`);
        }
        if (partRef[pieces[i]][parts[i]].length > 1 && (partRef[pieces[i]][parts[i]].length - 1) > colRef[pieces[i]][colors[i]].length) {
          // TEMPORARY FIX FOR BESTY DATA - try new svg item
          let slit = 0;
          do {
            slit++;
            aw.con.info(`ERROR:\nArray length mismatch on index ${parts[i]} of ${pieces[i]}! (color: ${colors[i]})`);
            parts[i] = random(1, (partRef[pieces[i]].length - 1));
          } while (slit < 10 && (partRef[pieces[i]][parts[i]].length - 1) > colRef[pieces[i]][colors[i]].length);
        }
      } catch (e) {
        aw.con.warn(`error on loop index ${i} (${pieces[i]}).\n${e.name}: ${e.message}`);
      }
      try {
        interleave(partRef[pieces[i]][parts[i]], colRef[pieces[i]][colors[i]]);
      } catch (e) {
        aw.con.warn(`Error in svg interleave function for index ${i} of ${pieces[i]}.\n${e.name}: ${e.message}`);
      }
    }

    return (aw.svg.base.header + merged.join("") + aw.svg.base.footer);
  },
};

/*
return "<span class='bad' style='font-size: 1.2rem;'>ERROR: Array length mismatch on index " + i + " of " + pieces[i] + "!</span>";
*/

