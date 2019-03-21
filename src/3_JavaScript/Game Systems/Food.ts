/*
. 8888888888                     888
. 888                            888
. 888                            888
. 8888888  .d88b.   .d88b.   .d88888
. 888     d88""88b d88""88b d88" 888
. 888     888  888 888  888 888  888
. 888     Y88..88P Y88..88P Y88b 888
. 888      "Y88P"   "Y88P"   "Y88888
.
*/

interface setupFood {
  eat: { (amt: number, type?: foodType): void };
  drink: { (drink: string): void };
  fastfood: { (place: string): string };
  bar: { (place: string): string };
  fast: object;
  drinkplace: object;
}


// NAMESPACE
if (setup.food === null || setup.food === undefined) {
  setup.food = {} as setupFood;
}
if (setup.drinks === null || setup.drinks === undefined) {
  setup.drinks = {} as object;
}

// eats food - adds to stats and applies effects
setup.food.eat = function(amt: number, type: foodType = "junk"): void {
  // adds "bonus food" to the nutrition variable for potential weight-gain etc.
  aw.L();
  if (ↂ.pc.status.nutrition == null) {
    ↂ.pc.status.nutrition = {};
  }
  const ᛔ = ↂ.pc.status.nutrition;
  if (ᛔ[type] === null || ᛔ[type] === undefined) {
    ᛔ[type] = 0;
  }
  amt = Number(amt);
  ᛔ[type] += amt;
  aw.S();
  const bonus = random(1, 6);
  let x;
  switch (bonus) {
    case 1:
      setup.status.happy(1);
      break;
    case 2:
    case 3:
    case 4:
      x = random(2, 4) * -1;
      setup.status.stress(x);
      break;
    case 5:
      x = random(2, 4);
      setup.status.satisfact(x);
      break;
    case 6:
      setup.status.arousal(1);
      break;
  }
};

// drink drinks - adds to stats and applies effects
setup.food.drink = function(drink: string): void {
  if (setup.drinks[drink] !== null) {
    let effect = Math.round(setup.drinks[drink].strength - ↂ.pc.body.weight);
    if (effect < 1) {
      effect = 1;
    }
    ↂ.pc.status.alcohol += effect;
    ↂ.pc.status.addict.alcNeed = 0;
    if (setup.drinks[drink].effects !== "none") {
      // TODO: call the effects or omni or maybe just consumable system;
    }
    aw.S();
  } else {
    aw.con.warn("Drink was not found in setup.drinks!");
  }
};

// creates output for fastfood place
setup.food.fastfood = function(place: string): string {
  const ff = setup.food.fast[place];
  let output = `<div style="width:800px;text-align:center"><img data-passage="${ff.img}" style="border-radius:10px;display:inline-block;"><p style="text-align:justify;">${ff.desc}</p><h3>${ff.name} Menu</h3>`;
  const drinks = ["milkme", "starsucks"];
  const desserts = ["teattreats"];
  const time = 13 + random(0, 11);
  let cost = 4 + ff.cost;
  for (let i = 0, c = ff.menu.length; i < c; i++) {
    if (i === ff.menu.length - 1) { cost -= 1; }
    let type = "fast";
    if (drinks.includes(place)) { type = "drink"; }
    output += `<<button "ORDER">><<addTime ${time}>><<run setup.food.eat("${ff.amt}","${type}")>><<run aw.cash(${cost}, "food");>><<run setup.refresh()>><<run Dialog.close()>><</button>><<tab>>${ff.menu[i]}<<tab>><span class="money">₢${cost}</span><br>`;
  }
  if (place === "burgertsar") {
    output += "<br><span class='note'>† cod-flavored semen, not actual cod semen.</span>";
  }
  output += "</div>";
  return output;
};
// creates output for bar place
setup.food.bar = function(place: string): string {
  const bb = setup.food.drinkplace[place];
  let output = `<div style="width:800px;text-align:center"><img data-passage="${bb.img}" style="border-radius:10px;display:inline-block;"><p style="text-align:justify;">${bb.desc}</p><h3>${bb.name} Menu</h3>`;
  const time = 7 + random(0, 11);
  for (let i = 0, c = bb.menu.length; i < c; i++) {
    if (setup.drinks[bb.menu[i]] !== null) {
    const cost = setup.drinks[bb.menu[i]].cost + bb.cost;
    const name = setup.drinks[bb.menu[i]].name;
    const desc = setup.drinks[bb.menu[i]].desc;
    output += `<<button "ORDER">><<addTime ${time}>><<run setup.food.drink("${bb.menu[i]}")>><<run aw.cash(${cost}, "food");>><<run setup.refresh()>><<run Dialog.close()>><</button>><<tab>>${name}<<tab>><span class="money">₢${cost}</span><br><span style="font-size:smaller">${desc}</span><br>`;
    } else {
      aw.con.warn("Drink was not found in setup.drinks!");
    }
  }
  output += "</div>";
  return output;
};
// fastfood
setup.food.fast = {
  mcdongalds: {
    name: "McDongald's",
    desc: "The fast food franchise that started it all, McDongald's has locations all over the globe. Many of their menu items feature their not-so-secret sauce--the creamy white Dong Sauce--such as the famous double-decker Big Dong cheeseburger.",
    menu: ["Big Dong Value Meal", "Double Donger Value Meal", "Happy Dong Meal"],
    cost: 2,
    img: "IMG-Restaurant-McDongalds",
    amt: 2,
  },
  burgertsar: {
    name: "Burger Tsar",
    desc: "The Russian entry into the world of fast food hasn't been very successful, at least in terms of selling food. After the government shut down the money laundering operation, the franchise has been facing a slow decline. Access to some russian favorites such as cod semen soup and Kvass 'beverage' have kept the remaining locations in business.",
    menu: ["Tsar Burger Meal", "Blyat Blin Plate", "Cod Semen Soup†", "Borscht with Salty Meat Jello"],
    cost: 2,
    img: "IMG-Restaurant-BurgerTsar",
    amt: 2,
  },
  genghis: {
    name: "Genghis Mons",
    desc: "A fairly generic take on mongolian barbecue, with the exception of certain stylistic elements and certain flavors added in to spice things up.",
    menu: ["Mound of Mons Plate", "Spread Lips Stir Fry"],
    cost: 4,
    img: "IMG-Restaurant-GenghisMons",
    amt: 3,
  },
  milkme: {
    name: "Milkme In A Cup",
    desc: "Drink fads like smoothies, juicing, boba tea, protein juice and others have come and gone over the years. Milkme arose from the ashes to serve a rather eclectic mix of past hits with a modern spin from the current Bull Milk™ fad.",
    menu: ["Tropical Fruit Milk Smoothie", "Melon Milk Cooler", "Berry Green Tea with Milk-Burst Boba,", "Bull Milk™ Fro-Yo Shake"],
    cost: 0,
    img: "IMG-Restaurant-MilkMe",
    amt: 1,
  },
  sbarfo: {
    name: "Sbarfo",
    desc: "The rather inexplicable psuedo-Italian cuisine location found in malls everywhere, and just about nowhere else. A staple of malls for over 40 years, Sbarfo seems to blend in seemlessly with the food court environment. Many people aren't even aware that their own local mall contains a Sbarfo! Despite this seeming handycap, this food-court-staple shows no sign of going anywhere.",
    menu: ["Generic Pizza Slice", "Pasta with Red Sauce", "Pasta with White Sauce", "Casu Marzu Poppers"],
    cost: 3,
    img: "IMG-Restaurant-Sbarfo",
    amt: 2,
  },
  tacohell: {
    name: "Taco Hell",
    desc: "A story of innovation and waste reduction that spread around the country, Taco Hell can convert all manner of things into something vaguely resembling mexican cuisine. Taco Hell is no mere joke, as the level of spiciness ranges from <i>Insane Volcano</i> to <i>Potentially Deadly</i>. Fans rave that the food is an experience, one that doesn't just because you've finished eating.",
    menu: ["9-Hells Taco Meal", "Beef Coño Bowl", "Juicy Fish Taco Meal", "Salty Pene Churro"],
    cost: 1,
    img: "IMG-Restaurant-TacoHell",
    amt: 2,
  },
  teattreats: {
    name: "Teat Treats",
    desc: "Pretty-much exactly like older ice cream parlors, but focusing on breast-milk-based icecream and products. The switch to human milk emphasizes its natural healthiness, but the real reason of course is the epidemic of cow rage disease.",
    menu: ["Teat Icecream Cone", "Teat Frozen Yogurt", "Banana Teats Milk"],
    cost: 1,
    img: "IMG-Restaurant-TeatTreats",
    amt: 2,
  },
  starsucks: {
    name: "Starsucks Coffee",
    desc: "While Starsucks Coffee has been around for ages, it's only recently that they've started promoting the use of natural breast milk in their coffee-flavored beverages. The classic circular brand logo remains, but is now surrounded by a drop of fresh milk.",
    menu: ["大 Latte", "大 frappacino", "大 machiato", "中 spermatto"],
    cost: 2,
    img: "IMG-Restaurant-Starsucks",
    amt: 2,
  },
};

setup.food.drinkplace = {
  shakepop: {
    name: "Shake & pop",
    desc: "The prices are ridiculously high but it is pretty usual for bars in clubs like this. It seems they have a large selection of cocktail though.",
    menu: ["fickenmeister", "beer"],
    cost: 8,
    img: "IMG-ShakePopBar",
  },
  hindenburger: {
    name: "Hinden Burger",
    desc: "The bierhouse has wide range of beers, a lot of imported ones too.",
    menu: ["beerKoelsh", "beerGrunwald", "beer"],
    cost: 2,
    img: "IMG-HindenBurgerBar",
  },
};

setup.drinks = {
  fickenmeister: {
    key: "fickenmeister",
    name: "Fickenmeister liqueur",
    desc: "Worldwide known german liqueur which top-secret recipe contains more than 30 ingredients. The only known ones are anise and the extract of arousal beans. 42%",
    cost: 10,
    strength: 7,
    effects: "none",
  },
  beer: {
    key: "beer",
    name: "Spirit of Wisconsin",
    desc: "Some beer from Wisconsin. Seems containing 6% of alcohol.",
    cost: 4,
    strength: 4,
    effects: "none",
  },
  beerKoelsh: {
    key: "beerKoelsh",
    name: "Koelsh beer",
    desc: "Imported German beer. 6% of alcohol.",
    cost: 5,
    strength: 4,
    effects: "none",
  },
  beerGrunwald: {
    key: "beerGrunwald",
    name: "Grunwald beer",
    desc: "Imported German beer. 6% of alcohol.",
    cost: 3,
    strength: 4,
    effects: "none",
  },
  priceyWine: {
    key: "priceyWine",
    name: "Sangue vergine",
    desc: "Italian 2018 vintage wine, pretty pricey option to get drunk. 12.5%",
    cost: 32,
    strength: 5,
    effects: "none",
  },
  cocktail: {
    key: "cocktail",
    name: `"Moisturizer" cocktail`,
    desc: "Famous coctail with white rum, vodka, juice and prairy oysters extract. 11%",
    cost: 12,
    strength: 5,
    effects: "none",
  },
};
