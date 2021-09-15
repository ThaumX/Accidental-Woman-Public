/*
:  .d88888b.           888     .d888 d8b 888
: d88P" "Y88b          888    d88P"  Y8P 888
: 888     888          888    888        888
: 888     888 888  888 888888 888888 888 888888 .d8888b
: 888     888 888  888 888    888    888 888    88K
: 888     888 888  888 888    888    888 888    "Y8888b.
: Y88b. .d88P Y88b 888 Y88b.  888    888 Y88b.       X88
:  "Y88888P"   "Y88888  "Y888 888    888  "Y888  88888P'
:
: METHODS FOR USING CLOTHING OUTFITS
*/

interface setupOutfits {
  Casual: clothingOutfit;
  Work: clothingOutfit;
  Fancy: clothingOutfit;
  Home: clothingOutfit;
  Night: clothingOutfit;
}

// Namespace
if (setup.clothes === null || setup.clothes === undefined) {
  setup.clothes = {} as setupClothes;
}
if (setup.outfits === null || setup.outfits === undefined) {
  setup.outfits = {} as setupOutfits;
}
setup.clothes.outfitInitialize = function() {
  setup.outfits = {
    Casual: {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      coat: 0,
      shoes: 0,
      bag: 0,
      rand: "Casual",
    },
    Work: {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      coat: 0,
      shoes: 0,
      bag: 0,
      rand: "Work",
    },
    Fancy: {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      coat: 0,
      shoes: 0,
      bag: 0,
      rand: "Fancy",
    },
    Home: {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      coat: 0,
      shoes: 0,
      bag: 0,
      rand: "Home",
    },
    Night: {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      coat: 0,
      shoes: 0,
      bag: 0,
      rand: "Night",
    },
  };
};

setup.clothes.outfit = {
  // removes all clothing being worn
  remove(): void {
    setup.clothes.remove("top");
    setup.clothes.remove("bottom");
    setup.clothes.remove("leg");
    setup.clothes.remove("bra");
    setup.clothes.remove("panties");
    setup.clothes.remove("accA");
    setup.clothes.remove("accB");
    setup.clothes.remove("accC");
    setup.clothes.remove("accD");
    setup.clothes.remove("shoes");
    setup.clothes.remove("coat");
  },
  // Wear an outfit name= outfit key OR outfit category with random true
  wear(name: string, rand: boolean = false): void {
    const slots = ["top", "bottom", "leg", "bra", "panties", "accA", "accB", "accC", "accD", "shoes", "coat"];
    const allowed = ["Casual", "Work", "Fancy", "Home", "Night"];
    const ᚥ = setup.outfits;
    if (ᚥ[name] === null || setup.outfits[name] === undefined) {
      aw.con.warn(`Attempted to wear nonexistent outfit: ${name}`);
      return;
    }
    if (rand && allowed.includes(name)) {
      const keys = Object.keys(setup.outfits);
      const options: string[] = [];
      for (let i = 0, c = keys.length; i < c; i++) {
        if (setup.outfits[keys[i]].rand === name) {
          options.push(keys[i]);
        }
      }
      const r = random(0, (options.length - 1));
      name = options[r];
    }
    for (let i = 0; i < 11; i++) {
      if (ᚥ[name][slots[i]] !== 0) {
        setup.clothes.wear(ᚥ[name][slots[i]]);
      } else {
        setup.clothes.remove(slots[i] as clothingSlot);
      }
    }
  },
  // empties all the saved items from an outfit
  empty(name: string) {
    const allowed = ["Casual", "Work", "Fancy", "Home", "Night"];
    if (!allowed.includes(name)) {
      aw.con.warn(`Tried to empty invalid outfit ${name}.`);
      return;
    }
    setup.outfits[name] = {
      panties: 0,
      bra: 0,
      leg: 0,
      top: 0,
      bottom: 0,
      accA: 0,
      accB: 0,
      accC: 0,
      accD: 0,
      coat: 0,
      shoes: 0,
      bag: 0,
      rand: name,
    };
  },
  // deletes an outfit totally - only custom
  delete(name: string): void {
    const forbid = ["Casual", "Work", "Fancy", "Home", "Night"];
    if (forbid.includes(name)) {
      aw.con.warn(`Attempted to delete outfit ${name}, which is not allowed.`);
      return;
    }
    delete setup.outfits[name];
  },
  // saves currently-worn clothing to outfit of name and group
  save(name: string, group: string = "none", overwrite: boolean = false): boolean {
    // save an outfit
    const keys = Object.keys(setup.outfits);
    const allowed = ["Casual", "Work", "Fancy", "Home", "Night"];
    if (!allowed.includes(group) && group !== "none") {
      aw.con.warn(`Attempted to save outfit (${name}) without proper group name (${group}). Using "none" instead.`);
      group = "none";
    } else if (allowed.includes(name)) {
      group = name;
    }
    const ᚥ = ↂ.pc.clothes.keys;
    if (keys.includes(name) && !overwrite) {
      return false;
    } else if (keys.includes(name)) {
      setup.outfits[name].panties = ᚥ.panties;
      setup.outfits[name].bra = ᚥ.bra;
      setup.outfits[name].leg = ᚥ.leg;
      setup.outfits[name].top = ᚥ.top;
      setup.outfits[name].bottom = ᚥ.bottom;
      setup.outfits[name].shoes = ᚥ.shoes;
      setup.outfits[name].coat = ᚥ.coat;
      setup.outfits[name].accA = ᚥ.accA;
      setup.outfits[name].accB = ᚥ.accB;
      setup.outfits[name].accC = ᚥ.accC;
      setup.outfits[name].accD = ᚥ.accD;
      setup.outfits[name].rand = group;
    } else {
      setup.outfits[name] = {
        panties: ᚥ.panties,
        bra: ᚥ.bra,
        leg: ᚥ.leg,
        top: ᚥ.top,
        bottom: ᚥ.bottom,
        accA: ᚥ.accA,
        accB: ᚥ.accB,
        accC: ᚥ.accC,
        accD: ᚥ.accD,
        coat: ᚥ.coat,
        shoes: ᚥ.shoes,
        bag: 0,
        rand: group,
      };
    }
    return true;
  },
  // prints the information for the currently-worn outfit
  print(): string {
    const keys = Object.keys(setup.outfits);
    const itms = ["top", "bottom", "bra", "panties", "leg"];
    let output = `<div style="position:relative;width:510px;height:700px;overflow-y:auto;text-align:center;border-color:#52310c;background-color:#211406;color:#e4b246;border-radius:6px;border-width:3px;border-style:solid;padding:5px 10px">`;
    for (let i = 0, c = keys.length; i < c; i++) {
      output += `<div style="display:block;width:470px;height:120px;overflow:hidden;text-align:left;border-color:#52310c;background-color:#271806;color:#e4b246;border-radius:6px;border-width:2px;border-style:solid;margin:5px auto;padding:5px;"><<link '<img data-passage="IMG-WardrobeWearIcon" class="imgButton" style="float:right;margin:0px 0px 5px 10px;">'>><<run setup.clothes.outfit.wear("${keys[i]}")>><<go MainWardrobe>><<run Dialog.close()>><</link>>`;
      output += `<span class="" style="size:110%;">${keys[i]}</span><br>| `;
      for (let j = 0; j < 5; j++) {
        if (setup.outfits[keys[i]][itms[j]] !== 0) {
          output += aw.clothes[setup.outfits[keys[i]][itms[j]]].color + " " + aw.clothes[setup.outfits[keys[i]][itms[j]]].style + " | ";
        }
      }
      output += "</div>";
    }
    return output;
  },
  // determines the status of the current outfit and returns
  check(): string {
    const ᚠ = setup.outfits;
    const main = ["Casual", "Work", "Fancy", "Home", "Night"];
    const slots = ["top", "bottom", "leg", "bra", "panties"];
    let output = '<span style="font-size:1.1rem;color:#ffcc92"><b>Standard Outfits Check</b></span><br>';
    function pieces(name) {
      let count = 0;
      const slots = ["top", "bottom", "bra", "panties"];
      for (let i = 0; i < 4; i++) {
        if (ᚠ[name][slots[i]] !== 0) {
          count++;
        }
      }
      return count;
    }
    function formal(name, cutoff = 1) {
      let count = 0;
      let total = 0;
      const slots = ["top", "bottom", "leg", "bra", "panties"];
      for (let i = 0; i < 5; i++) {
        if (ᚠ[name][slots[i]] !== 0) {
          count++;
          let x;
          try {
            x = aw.clothes[ᚠ[name][slots[i]]].values.formal;
          } catch (e) {
            aw.con.warn(`error with clothing formality, key = ${ᚠ[name][slots[i]]}. ${e.name}`);
            x = 0;
          }
          if (x < (cutoff - 2)) {
            return "item";
          } else {
            total += x;
          }
        }
      }
      if (total / count < cutoff) {
        return "fail";
      }
      return "pass";
    }
    output += "<b>Casual:</b><<sp 2>>";
    let num = pieces("Casual");
    if (num < 2) {
      output += `<span class="import">Probably Incomplete <span class="monospace">[${num} pieces]</span></span><br>`;
    } else {
      output += `Okay <span class="monospace">[${num} pieces]</span><br>`;
    }
    output += "<b>Work:</b><<sp 2>>";
    num = pieces("Work");
    if (num < 2) {
      output += `<span class="import">Probably Incomplete <span class="monospace">[${num} pieces]</span></span><br>`;
    } else {
      const fPass = formal("Work");
      if (fPass === "item") {
        output += `An item <i>may</i> be too informal<br>`;
      } else if (fPass === "fail") {
        output += `<span class="import">Outfit probably too casual</span><br>`;
      } else {
        output += `Okay <span class="monospace">[${num} pieces]</span><br>`;
      }
    }
    output += "<b>Fancy:</b><<sp 2>>";
    num = pieces("Fancy");
    if (num < 1) {
      output += `<span class="import">Probably Incomplete <span class="monospace">[${num} pieces]</span></span><br>`;
    } else {
      const fPass = formal("Fancy");
      if (fPass === "item") {
        output += `An item <i>may</i> be too informal<br>`;
      } else if (fPass === "fail") {
        output += `<span class="import">Outfit probably too casual</span><br>`;
      } else {
        output += `Okay <span class="monospace">[${num} pieces]</span><br>`;
      }
    }
    return output;
  },
  // special prologue tutorial check
  prologue(): boolean {
    const ᚠ = setup.outfits;
    const main = ["Casual", "Work"];
    function pieces(name) {
      let count = 0;
      const slots = ["top", "bottom", "bra", "panties"];
      for (let i = 0; i < 4; i++) {
        if (ᚠ[name][slots[i]] !== 0) {
          count++;
        }
      }
      return count;
    }
    let num = pieces("Casual");
    if (num < 2) {
      return false;
    }
    num = pieces("Work");
    if (num < 2) {
      return false;
    }
    return true;
  },
};
