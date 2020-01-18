/*
██╗  ██╗ ██████╗ ███╗   ███╗███████╗
██║  ██║██╔═══██╗████╗ ████║██╔════╝
███████║██║   ██║██╔████╔██║█████╗
██╔══██║██║   ██║██║╚██╔╝██║██╔══╝
██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
*/

interface setupHome {
  apartmentNameGen: { (): string };
  apartmentStreetGen: { (loc: number): string };
  apartmentScoreDisp: { (qual: 1 | 2 | 3 | 4 | 5): string | boolean };
  apartmentDesc: { (T: 1 | 2 | 3 | 4 | 5, L: 1 | 2 | 3 | 4 | 5, F: 1 | 2 | 3 | 4 | 5, U: 1 | 2 | 3 | 4 | 5): string }
}


setup.home = {} as setupHome;

setup.homesGenerator = function (amt: number = 6, opt: [number, number, number, number, number] = [1, 2, 2, 2, 2]): void {
  const dist = [[0, 20, 20, 20, 20, 20], [0, 20, 30, 25, 15, 10], [0, 10, 25, 30, 25, 10], [0, 10, 15, 20, 25, 30]];
  const tMod = [50, 50, 60, 70, 80, 90];
  ↂ.homeOptions = [];
  for (let i = 0; i < amt; i++) {
    const tLoc = setup.randomDist(dist[opt[4]]);
    const ob = {
      name: setup.home.apartmentNameGen(),
      tier: opt[0],
      finish: setup.randomDist(dist[opt[1]]),
      upkeep: setup.randomDist(dist[opt[2]]),
      nhood: setup.randomDist(dist[opt[3]]),
      location: tLoc,
      street: setup.home.apartmentStreetGen(tLoc),
      rent: 0,
    };
    const math = Math.round((((ob.finish * 2) + (ob.upkeep * 2.5) + ob.nhood + (ob.location * 1.5)) / 3) * tMod[opt[0]]);
    switch (opt[0]) {
      case 1:
        ob.rent = 250 + math + random(0, 20);
        break;
      case 2:
        ob.rent = 500 + math + random(0, 30);
        break;
      case 3:
        ob.rent = 800 + math + random(0, 30);
      default:
        ob.rent = 1125 + math + random(0, 30);
    }
    ↂ.homeOptions.push(ob);
  }
};

// returns a string apartment name
setup.home.apartmentNameGen = function(): string {
  const list1 = ["Park", "Village", "Place", "Creek", "Ridge", "Home", "Pointe", "Square", "Lake", "Oak", "Garden", "Crossing", "Court"];
  const list2 = ["Park", "Village", "Place", "Creek", "Ridge", "Homes", "Pointe", "Square", "Lake", "Oaks", "Gardens", "Crossing", "Court"];
  const r1 = random(0, 12);
  let r2;
  do {
    r2 = random(0, 12);
  }while (r1 === r2);
  return (list1[r1] + " " + list2[r2]);
};

// determines street name based on loc score.
setup.home.apartmentStreetGen = function(loc: number): string {
  const streetWords = [
      false,
      ["Newton", "Curie", "Curie"],
      ["Mendel", "Mendel", "Sagan"],
      ["Sagan", "Planck", "Planck"],
      ["Planck", "Darwin", "Darwin"],
      ["Darwin", "Shrodinger", "Shrodinger"],
    ];
  let numb;
  const wl = random(0, 2);
  const street = streetWords[loc][wl];
  switch (street) {
  case "Newton":
  case "Curie":
    numb = [3, 8];
    break;
  case "Mendel":
    numb = [3, 9];
    break;
  case "Sagan":
    if (loc === 3) {
      numb = [4, 6];
    } else {
      if (random(0, 1) === 0) {numb = [1, 3]; } else {numb = [7, 9]; }
    }
    break;
  case "Planck":
    if (loc === 4) {
      numb = [4, 6];
    } else {
      if (random(0, 1) === 0) {numb = [1, 3]; } else {numb = [7, 9]; }
    }
    break;
  case "Darwin":
    if (loc === 5) {
      numb = [4, 6];
    } else {
      if (random(0, 1) === 0) {numb = [1, 3]; } else {numb = [7, 9]; }
    }
    break;
  case "Shrodinger":
    if (loc === 5) {
      numb = [3, 7];
    } else {
      if (random(0, 1) === 0) {numb = [1, 3]; } else {numb = [7, 9]; }
    }
    break;
  }
  try {
    const r = random(numb[0], numb[1]);
    return `${r}${setup.numberLetAbrv(r)} and ${street}`;
  } catch (e) {
    UI.alert(`this is the fucking error... ${e.name}: ${e.message}. (${numb})`);
  }
  return "error";
};

// returns twee to print "gems" for quality score
setup.home.apartmentScoreDisp = function(qual: 1 | 2 | 3 | 4 | 5): string|boolean {
  const out = [
    false,
    "[img[IMG_GemIcon]] [img[IMG_GemIconEmpty]] [img[IMG_GemIconEmpty]] [img[IMG_GemIconEmpty]] [img[IMG_GemIconEmpty]]<<tab>><span class='lato yellow'>Poor</span>",
    "[img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIconEmpty]] [img[IMG_GemIconEmpty]] [img[IMG_GemIconEmpty]]<<tab>><span class='lato'>Okay</span>",
    "[img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIconEmpty]] [img[IMG_GemIconEmpty]]<<tab>><span class='lato'>Good</span>",
    "[img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIconEmpty]]<<tab>><span class='lato'>Great</span>",
    "[img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIcon]] [img[IMG_GemIcon]]<<tab>><span class='lato orchid'>Excellent</span>",
  ];
  return out[qual];
};

setup.quickClean = function (): void {
  const ᛔ = ↂ.home.clean;
  ᛔ.cleaningTime = Math.round(((ᛔ.doCleaning + ᛔ.doCleaning + ᛔ.doCleaning + ᛔ.pickingUp + ᛔ.pickingUp + ᛔ.doDishes + ᛔ.doLaundry) / 8) * (5 * ᛔ.increment));
  const unit = 0.25 * ᛔ.increment;
  aw.con.info(`quick clean initiated, unit is ${unit}.`);
  const time = ᛔ.cleaningTime + (18 - (ↂ.home.finance.sett.supplyLevel * 3));
  setup.time.add(time);
  setup.cleanHome(unit);
  setup.refresh();
  setup.dialog("Quik-Clean", "<<include [[HomeCleaningDisplay]]>>");
};

// runs the process to clean the player home based on settings
setup.cleanHome = function (unit: number): void {
  const ᛔ = ↂ.home.clean;
  const tim = [0, 15, 30, 60, 90, 120];
  // aw.con.info(`Cleaning Starting! Floors: ${ᛔ.floors}, Surfaces: ${ᛔ.surfaces}, Kitchen: ${ᛔ.kitchen}, Bathroom: ${ᛔ.bathroom}, Neatness: ${ᛔ.neatness}, DeepClean: ${ᛔ.deepclean}, Dishes: ${ᛔ.dishes}, Laundry: ${ᛔ.laundry}, Bed: ${ᛔ.bed}`);
  const c = {
    doCleaning: tim[ᛔ.doCleaning] * unit,
    pickingUp: tim[ᛔ.pickingUp] * unit,
    doDishes: Math.round(((tim[ᛔ.doDishes] * unit) / 60) * 100),
    doLaundry: Math.round(((tim[ᛔ.doLaundry] * unit) / 60) * 100),
    doBed: Math.round(((tim[ᛔ.doBed] * unit) / 60) * 100),
  };
  // aw.con.obj(c, "cleaning");
  ᛔ.floors += Math.floor(((c.doCleaning + c.pickingUp + c.pickingUp) / 3) / 12);
  if (ᛔ.floors > 100) {
    ᛔ.floors = 100;
  }
  ᛔ.surfaces += Math.floor(((c.doCleaning + c.doCleaning + c.pickingUp) / 3) / 12);
  if (ᛔ.surfaces > 100) {
    ᛔ.surfaces = 100;
  }
  ᛔ.kitchen += Math.floor(((c.doCleaning + c.doCleaning + c.pickingUp) / 3) / 12);
  if (ᛔ.kitchen > 100) {
    ᛔ.kitchen = 100;
  }
  ᛔ.bathroom += Math.floor(((c.doCleaning + c.doCleaning + c.pickingUp) / 3) / 12);
  if (ᛔ.bathroom > 100) {
    ᛔ.bathroom = 100;
  }
  ᛔ.neatness += Math.floor(((c.doCleaning + c.pickingUp + c.pickingUp) / 3) / 12);
  if (ᛔ.neatness > 100) {
    ᛔ.neatness = 100;
  }
  ᛔ.deepclean += Math.floor(c.doCleaning / 12);
  if (ᛔ.deepclean > 100) {
    ᛔ.deepclean = 100;
  }
  if (c.doDishes >= 100) {
    ᛔ.dishes += 1;
    c.doDishes -= 100;
  }
  ᛔ.dishes += (random(1, 100) <= c.doDishes) ? 1 : 0;
  if (ᛔ.dishes > 10) {
    ᛔ.dishes = 10;
  }
  if (c.doLaundry >= 100) {
    ᛔ.laundry += 1;
    c.doLaundry -= 100;
  }
  ᛔ.laundry += (random(1, 100) <= c.doLaundry) ? 1 : 0;
  if (ᛔ.laundry > 10) {
    ᛔ.laundry = 10;
    setup.clothes.washing();
  }
  if (c.doBed >= 100) {
    ᛔ.bed += 1;
    c.doBed -= 100;
  }
  ᛔ.bed += (random(1, 100) <= c.doBed) ? 1 : 0;
  if (ᛔ.bed > 10) {
    ᛔ.bed = 10;
  }
  aw.S("home");
  // aw.con.info(`Cleaning Accomplished! Floors: ${ᛔ.floors}, Surfaces: ${ᛔ.surfaces}, Kitchen: ${ᛔ.kitchen}, Bathroom: ${ᛔ.bathroom}, Neatness: ${ᛔ.neatness}, DeepClean: ${ᛔ.deepclean}, Dishes: ${ᛔ.dishes}, Laundry: ${ᛔ.laundry}, Bed: ${ᛔ.bed}`);
};

// decreases cleanliness of the home
setup.dirtyHome = function (): void {
  if (!aw.chad.clean) {
    const ᛔ = ↂ.home.clean;
    ᛔ.floors -= random(3, 7);
    if (ᛔ.floors < 0) {
      ᛔ.floors = 0;
    }
    ᛔ.surfaces -= random(3, 7);
    if (ᛔ.surfaces < 0) {
      ᛔ.surfaces = 0;
    }
    ᛔ.kitchen -= random(3, 7);
    if (ᛔ.kitchen < 0) {
      ᛔ.kitchen = 0;
    }
    ᛔ.bathroom -= random(3, 7);
    if (ᛔ.bathroom < 0) {
      ᛔ.bathroom = 0;
    }
    ᛔ.neatness -= random(3, 7);
    if (ᛔ.neatness < 0) {
      ᛔ.neatness = 0;
    }
    ᛔ.deepclean -= random(3, 7);
    if (ᛔ.deepclean < 0) {
      ᛔ.deepclean = 0;
    }
    ᛔ.dishes -= random(1, 2);
    if (ᛔ.dishes < 0) {
      ᛔ.dishes = 0;
    }
    ᛔ.laundry -= random(1, 2);
    if (ᛔ.laundry < 0) {
      ᛔ.laundry = 0;
    }
    ᛔ.bed -= random(1, 2);
    if (ᛔ.bed < 0) {
      ᛔ.bed = 0;
    }
  }
};

// returns text to describe apartment by tier, loc, finish, and upkeep
setup.home.apartmentDesc = function(T: 1 | 2 | 3 | 4 | 5, L: 1 | 2 | 3 | 4 | 5, F: 1 | 2 | 3 | 4 | 5, U: 1 | 2 | 3 | 4 | 5): string {
  const tier = [
    false,
    "a studio apartment that has a small partial divider between the living area and sleeping area. It has a decent kitchenette, with a small-but-serviceable bathroom. It has a closet containing a stacked clothes washer and dryer set, so it does have all the necessities despite the small size",
    "a one-bedroom one-bath apartment that is fairly generous as far as small apartments go. It has a decent sized kitchen and living room, and even has a walk-in closet in the bedroom",
    "a two-bedroom apartment..",
    "a three-bedroom, two-bathroom apartment..",
    "a three-bedroom townhome..",
  ];
  const loc = [
    false,
    "about as far out of the way as you can get in Appletree",
    "located fairly far away from Shrodinger Boulevard and Downtown Appletree",
    "well-ensconced in the southern residential district, but not too far away from everything",
    "centrally-located; it has easy access to Shrodiner Boulevard and Downtown Appletree",
    "in the perfect spot, you can literally walk downtown, and reaching Shrodinger is a breeze",
  ];
  const finish = [
    false,
    "is about as cheap as possible. Everything is made of laminate, plywood, or plastic, and made to look more expensive than it really is. It shows in the lack of features that are standard on all but the cheapest items, such as the stove, which doesn't even have a clock, let alone a timer for the oven.",
    "is fairly cheap, but in most areas it does a decent-enough job of avoiding looking blatantly cheap and low-quality. While there's little in the way of luxury or creature-comforts, it does at least have all the necessitites.",
    "isn't all that fancy, but you can tell that the materials and appliances are of a reasonable quality. While the bathroom tile is certainly on the low-end of what you've seen, it's at least real tile instead of linoleum and plastic panels. Though not fancy, the better materials do give the place a better overall appearance.",
    "is pretty nice, you can tell that they opted for some upgraded materials and appliances. The place looks pretty good overall, but more importantly are the extra features that make a place nicer to live in. Things like extra wall outlets, better lighting, and appliances that aren't the basic cheap model.",
    "is awesome, with everything you could hope for in a rental property. Not only are the materials high quality, such as real-wood cabinets and granite countertops, but the appliances are all upper-mid range models as well. The creature comforts border on luxurious; there's even a thermostatic shower valve.",
  ];
  const upkeep = [
    false,
    "It's obvious before you even go inside that the place hasn't been cared for at all, and when you do go inside there's a battle in your nose as you're exposed to several odors, many of which are unpleasant. While everything seems to work, it's almost always either partially broken or jury-rigged.",
    "This place is either really overdue for renovation or had some awful tenants living here previously. Pretty much everything is beaten up and near worn out, and there's plenty of evidence of jury-rigging and makeshift repairs... usually because there wasn't any cosmetic work to accompany it. There's also a distinct animal odor lingering about the place.",
    "The home certainly looks lived in and well-worn, but it doesn't seem to be the kind of damage that happens with abuse and neglect. It's just that people have lived here for many years without repairs or renovation. If you had to guess, you'd say the unit is pretty close to the end of its renovation cycle.",
    "The place doesn't look brand-new, but it doesn't seem like there have been very many tenents living here since it was last renovated. It has the gentle wear that comes with occupancy, but nothing that appears run-down or that looks unsightly.",
    "It seems like the place is brand-new, but more likely it was recently renovated. When you look carefully you can tell that people have lived here since then, but it hasn't been long enough for most of the usual signs of wear and tear to show up.",
  ];
  const intro = [
    "You arrive at",
    "You're taken to",
    "You visit",
  ];
  const word = [
    "The unit is",
    "The place is",
    "It's",
  ];
  const r = random(0, 2);
  return `${intro[r]} ${tier[T]}. ${word[r]} ${loc[L]}. ${upkeep[U]} ${finish[F]}`;
};
