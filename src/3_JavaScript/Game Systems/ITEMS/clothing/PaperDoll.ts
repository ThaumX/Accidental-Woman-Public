
//  ██████╗  █████╗ ██████╗ ███████╗██████╗
//  ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
//  ██████╔╝███████║██████╔╝█████╗  ██████╔╝
//  ██╔═══╝ ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
//  ██║     ██║  ██║██║     ███████╗██║  ██║
//  ╚═╝     ╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
//
//      ██████╗  ██████╗ ██╗     ██╗
//      ██╔══██╗██╔═══██╗██║     ██║
//      ██║  ██║██║   ██║██║     ██║
//      ██║  ██║██║   ██║██║     ██║
//      ██████╔╝╚██████╔╝███████╗███████╗
//      ╚═════╝  ╚═════╝ ╚══════╝╚══════╝



if (setup.clothes == null) {
  setup.clothes = {} as setupClothes;
}

// returns twee string to print clothing paperdoll
setup.clothes.PaperDollPrint = function(type: string = "wardrobe"): string {
  const showClothes = true;
  const showAcc = true;
  let showOutdoor = false;
  let showStatus = false;
  let output = setup.clothes.paperBody();
  if (type !== "wardrobe") {
    showOutdoor = true;
    showStatus = true;
  }
  if (showClothes) {
    output += setup.clothes.paperClothes();
  }
  if (showAcc) {
    output += setup.clothes.paperAccessories();
  }
  if (showOutdoor || State.active.variables.AW.paperBlush === 1 || State.active.variables.AW.paperBlush === 2) {
    output += setup.clothes.paperShoes();
  }
  if (showStatus || State.active.variables.AW.paperBlush === 1 || State.active.variables.AW.paperBlush === 2) {
    output += setup.clothes.paperStatus();
  }
  return output;
};

setup.clothes.paperBody = function(): string {
  const ᛔ = ↂ.pc;
  let output = "";
  switch (ᛔ.body.skinColor) {
    case "pale":
    case "fair":
    case "tanned":
      output += `<img data-passage="IMG-PaDo-Base_White" style="z-index:204;"><img data-passage="IMG-PaDo-MainHeadBase" style="z-index:206;"><img data-passage="IMG-PaDo-MainFace-White" style="z-index:207;">`;
      if (ᛔ.groom.eyeMU === "none" && ᛔ.groom.lipMU === "none" && ᛔ.groom.genMU === "none") {
        output += '<img data-passage="IMG-PaDo-MainNoMU-White" style="z-index:208;">';
      }
      break;
    case "bronzed":
    case "dusky":
    case "light brown":
      output += `<img data-passage="IMG-PaDo-Base_Hispanic" style="z-index:204;"><img data-passage="IMG-PaDo-MainHeadBase" style="z-index:206;"><img data-passage="IMG-PaDo-MainFace-Hispanic" style="z-index:207;">`;
      if (ᛔ.groom.eyeMU === "none" && ᛔ.groom.lipMU === "none" && ᛔ.groom.genMU === "none") {
        output += '<img data-passage="IMG-PaDo-MainNoMU-Hispanic" style="z-index:208;">';
      }
      break;
    case "light":
    case "dark":
      output += `<img data-passage="IMG-PaDo-Base_Asian" style="z-index:204;"><img data-passage="IMG-PaDo-MainHeadBase" style="z-index:206;"><img data-passage="IMG-PaDo-MainFace-Asian" style="z-index:207;">`;
      if (ᛔ.groom.eyeMU === "none" && ᛔ.groom.lipMU === "none" && ᛔ.groom.genMU === "none") {
        output += '<img data-passage="IMG-PaDo-MainNoMU-Asian" style="z-index:208;">';
      }
      break;
    case "brown":
    case "dark brown":
    case "midnight":
      output += `<img data-passage="IMG-PaDo-Base_Black" style="z-index:204;"><img data-passage="IMG-PaDo-MainHeadBase" style="z-index:206;"><img data-passage="IMG-PaDo-MainFace-Black" style="z-index:207;">`;
      if (ᛔ.groom.eyeMU === "none" && ᛔ.groom.lipMU === "none" && ᛔ.groom.genMU === "none") {
        output += '<img data-passage="IMG-PaDo-MainNoMU-Black" style="z-index:208;">';
      }
      break;
    default:
      output += `<img data-passage="IMG-PaDo-Base_White" style="z-index:204;"><img data-passage="IMG-PaDo-MainHeadBase" style="z-index:206;"><img data-passage="IMG-PaDo-MainFace-White" style="z-index:207;">`;
      if (ᛔ.groom.eyeMU === "none" && ᛔ.groom.lipMU === "none" && ᛔ.groom.genMU === "none") {
        output += '<img data-passage="IMG-PaDo-MainNoMU-White" style="z-index:208;">';
      }
      break;
  }
  if (ↂ.pc.groom.pubeStyle !== "hairless" && ↂ.pc.groom.pubeStyle !== "shaved") {
    output += '<img data-passage="IMG-PaDo-Pubes" style="z-index:205;">';
  }
  if (State.active.variables.AW.paperBlush > 1) {
    output += '<img data-passage="IMG-PaDo-MainHeadBlush" style="z-index:209;">';
  }
  switch (ᛔ.groom.hairColor) {
    case "black":
    case "brunette":
      output += '<img data-passage="IMG-PaDo-MainHair-Dark" style="z-index:212;">';
      break;
    case "brown":
    case "light brown":
    case "auburn":
    case "dark blonde":
      output += '<img data-passage="IMG-PaDo-MainHair-Normal" style="z-index:212;">';
      break;
    case "ginger":
    case "copper":
    case "light auburn":
      output += '<img data-passage="IMG-PaDo-MainHair-Red" style="z-index:212;">';
      break;
    case "platinum blonde":
    case "blonde":
    case "sandy blonde":
    case "strawberry blonde":
      output += '<img data-passage="IMG-PaDo-MainHair-Blonde" style="z-index:212;">';
      break;
    default:
      output += '<img data-passage="IMG-PaDo-MainHair-Normal" style="z-index:212;">';
      break;
  }
  return output;
};

setup.clothes.paperClothes = function(): string {
  const ᛝ = ↂ.pc.clothes;
  let output = "";
  if (ᛝ.keys.panties !== 0 && ᛝ.worn.panties !== "off") {
    if (aw.slot.panties.type === "swimBottom") {
      output += '<img data-passage="IMG-PaDo-BikiniBottom" style="z-index:216;">';
    } else {
      switch (aw.slot.panties.values.style) {
        case 1:
        case 2:
        case 3:
        case 4:
          output += '<img data-passage="IMG-PaDo-PantiesGranny" style="z-index:216;">';
          break;
        case 5:
        case 7:
          output += '<img data-passage="IMG-PaDo-Panties" style="z-index:216;">';
          break;
        case 6:
          output += '<img data-passage="IMG-PaDo-PantiesBoyshorts" style="z-index:216;">';
          break;
        case 8:
        case 9:
        case 10:
          output += '<img data-passage="IMG-PaDo-LacePanties" style="z-index:216;">';
          break;
        case 11:
          output += '<img data-passage="IMG-PaDo-PantiesCrotchless" style="z-index:216;">';
          break;
        case 12:
          output += '<img data-passage="IMG-PaDo-MicroGstring" style="z-index:216;">';
          break;
        case 13:
          output += '<img data-passage="IMG-PaDo-Belts-Lower" style="z-index:216;">';
          break;
      }
    }
  } else if (ᛝ.worn.panties === "off") {
    output += '<img data-passage="IMG-PaDo-PantiesOff" style="z-index:216;">';
  }
  if (ᛝ.keys.bra !== 0 && ᛝ.worn.bra !== "off") {
    if (aw.slot.bra.type === "swimTop") {
      output += '<img data-passage="IMG-PaDo-BikiniTop" style="z-index:217;">';
    } else if (aw.slot.bra.type === "swimOnePiece") {
      switch (aw.slot.bra.values.style) {
        case 1:
        case 2:
        case 3:
        case 4:
          output += '<img data-passage="IMG-PaDo-OnePieceSchool" style="z-index:217;">';
          break;
        case 5:
          output += '<img data-passage="IMG-PaDo-OnePieceSling" style="z-index:217;">';
      }
    } else {
      switch (aw.slot.bra.values.style) {
        case 1:
          output += '<img data-passage="IMG-PaDo-SportsBra" style="z-index:217;">';
          break;
        case 2:
        case 3:
        case 4:
        case 5:
          output += '<img data-passage="IMG-PaDo-Bra" style="z-index:217;">';
          break;
        case 6:
        case 8:
        case 9:
          output += '<img data-passage="IMG-PaDo-BalconetteBra" style="z-index:217;">';
          break;
        case 7:
          output += '<img data-passage="IMG-PaDo-BraWrap" style="z-index:217;">';
          break;
        case 10:
        case 11:
        case 12:
          output += '<img data-passage="IMG-PaDo-ShelfBra" style="z-index:217;">';
          break;
        case 13:
          output += '<img data-passage="IMG-PaDo-Belts-Upper" style="z-index:217;">';
          break;
      }
    }
  } else if (ᛝ.worn.bra === "off") {
    output += '<img data-passage="IMG-PaDo-BraOff" style="z-index:217;">';
  }
  if (ᛝ.keys.leg !== 0 && ᛝ.worn.leg !== "off") {
    switch (aw.slot.leg.values.style) {
      case 1:
      case 2:
      case 3:
        output += '<img data-passage="IMG-PaDo-Socks" style="z-index:218;">';
        break;
      case 5:
      case 7:
      case 8:
      case 9:
        output += '<img data-passage="IMG-PaDo-Stockings" style="z-index:218;">';
        break;
      default:
        output += '<img data-passage="IMG-PaDo-Pantyhose" style="z-index:218;">';
        break;
    }
  }
  if (ᛝ.keys.bottom !== 0 && State.active.variables.AW.paperOver && ᛝ.worn.bottom !== "off") {
    if (aw.slot.top.type !== "sportBottom") {
      switch (aw.slot.bottom.values.style) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          output += '<img data-passage="IMG-PaDo-BuisnessSkirt" style="z-index:219;">';
          break;
        case 11:
          output += '<img data-passage="IMG-PaDo-NormalSkirt" style="z-index:219;">';
          break;
        case 12:
          output += '<img data-passage="IMG-PaDo-ShortSkirt" style="z-index:219;">';
          break;
        case 13:
          output += '<img data-passage="IMG-PaDo-NanoSkirt" style="z-index:219;">';
          break;
        case 14:
        case 16:
          output += '<img data-passage="IMG-PaDo-Shorts" style="z-index:219;">';
          break;
        case 15:
        case 17:
          output += '<img data-passage="IMG-PaDo-Hotpants" style="z-index:219;">';
          break;
        case 19:
        case 21:
          output += '<img data-passage="IMG-PaDo-Jeans" style="z-index:219;">';
          break;
        default:
          output += '<img data-passage="IMG-PaDo-Leggings" style="z-index:219;">';
          break;
      }
    }
  } else if (ᛝ.worn.bottom === "off") {
    output += '<img data-passage="IMG-PaDo-PantsOff" style="z-index:219;">';
  }
  if (ᛝ.keys.top !== 0 && State.active.variables.AW.paperOver && ᛝ.worn.top !== "off") {
    if (aw.slot.top.type === "top") {
      switch (aw.slot.top.values.style) {
        case 2:
        case 3:
        case 4:
        case 5:
          output += '<img data-passage="IMG-PaDo-TankTop" style="z-index:220;">';
          break;
        case 6:
          output += '<img data-passage="IMG-PaDo-Blouse" style="z-index:220;">';
          break;
        case 1:
        case 7:
        case 8:
          output += '<img data-passage="IMG-PaDo-SleevelessTurtle" style="z-index:220;">';
          break;
        case 10:
        case 11:
          output += '<img data-passage="IMG-PaDo-CamiTop" style="z-index:220;">';
          break;
        case 9:
          output += '<img data-passage="IMG-PaDo-WrapTop" style="z-index:220;">';
          break;
        case 12:
        case 13:
        case 14:
          output += '<img data-passage="IMG-PaDo-TubeTop" style="z-index:220;">';
          break;
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
          output += '<img data-passage="IMG-PaDo-Nightgown" style="z-index:220;">';
          break;
        default:
          output += '<img data-passage="IMG-PaDo-CamiTop" style="z-index:220;">';
          break;
      }
    } else if (aw.slot.top.type === "dress") {
      if (aw.slot.top.values.style === 666) {
        output += '<img data-passage="IMG-PaDo-MaidDress" style="z-index:220;">';
      } else {
        output += '<img data-passage="IMG-PaDo-SheerDress" style="z-index:220;">';
      }
    }
  } else if (ᛝ.worn.top === "off") {
    output += '<img data-passage="IMG-PaDo-TopOff" style="z-index:220;">';
  }
  return output;
};

setup.clothes.paperAccessories = function(): string {
  // nothing yet!
  return "";
};

setup.clothes.paperShoes = function(): string {
  let output = "";
  const ᛝ = ↂ.pc.clothes;
  if (ᛝ.keys.coat !== 0 && State.active.variables.AW.paperOver) {
    switch (aw.slot.coat.values.style) {
      case 6:
      case 12:
        output += '<img data-passage="IMG-PaDo-SuitJacket" style="z-index:220;">';
        break;
      default:
        output += '<img data-passage="IMG-PaDo-Coat1" style="z-index:220;">';
        break;
    }
  } else if (ᛝ.keys.coat !== 0 && ᛝ.worn.coat === "off") {
    output += '<img data-passage="IMG-PaDo-CoatOff" style="z-index:220;">';
  }
  if (ᛝ.keys.shoes !== 0 && State.active.variables.AW.paperOver && ᛝ.worn.shoes !== "off") {
      switch (aw.slot.shoes.values.style) {
        case 1:
          output += '<img data-passage="IMG-PaDo-HeavyBoots" style="z-index:225;">';
          break;
        case 2:
          output += '<img data-passage="IMG-PaDo-Sneakers" style="z-index:218;">';
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
          output += '<img data-passage="IMG-PaDo-HeelsBlack" style="z-index:218;">';
          break;
        case 14:
          output += '<img data-passage="IMG-PaDo-HeavyBoots" style="z-index:218;">';
          break;
        case 15:
          output += '<img data-passage="IMG-PaDo-HeelsPink" style="z-index:218;">';
          break;
        case 16:
          output += '<img data-passage="IMG-PaDo-FlipFlops" style="z-index:218;">';
          break;
        default:
          output += '<img data-passage="IMG-PaDo-HeelsPink" style="z-index:218;">';
          break;
      }
    } else if (ᛝ.keys.shoes !== 0 && ᛝ.worn.shoes === "off") {
      output += '<img data-passage="IMG-PaDo-ShoesOff" style="z-index:220;">';
    }
  return output;
};

setup.clothes.paperStatus = function(): string {
  // status effects displayed on doll
  return "";
};

setup.clothes.PaperDollOptions = function(): string {
  const ᛔ = State.active.variables;
  let output = "[";
  output += (ᛔ.AW.paperOver) ? "OUTER VISIBLE" : "OUTER HIDDEN";
  output += "|";
  switch (ᛔ.AW.paperBlush) {
    case 0:
      output += "OTHER HIDDEN|NO BLUSH";
      break;
    case 1:
      output += "OTHER SHOWN|NO BLUSH";
      break;
    case 2:
      output += "OTHER SHOWN|BLUSH ON";
      break;
    case 3:
      output += "OTHER HIDDEN|BLUSH ON";
      break;
    default:
      output += "!!!ERROR!!!";
      break;
  }
  output += "]";
  return output;
};



