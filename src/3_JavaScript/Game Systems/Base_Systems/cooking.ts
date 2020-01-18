// ▄████████  ▄██████▄   ▄██████▄     ▄█   ▄█▄  ▄█  ███▄▄▄▄      ▄██████▄
// ███    ███ ███    ███ ███    ███   ███ ▄███▀ ███  ███▀▀▀██▄   ███    ███
// ███    █▀  ███    ███ ███    ███   ███▐██▀   ███▌ ███   ███   ███    █▀
// ███        ███    ███ ███    ███  ▄█████▀    ███▌ ███   ███  ▄███
// ███        ███    ███ ███    ███ ▀▀█████▄    ███▌ ███   ███ ▀▀███ ████▄
// ███    █▄  ███    ███ ███    ███   ███▐██▄   ███  ███   ███   ███    ███
// ███    ███ ███    ███ ███    ███   ███ ▀███▄ ███  ███   ███   ███    ███
// ████████▀   ▀██████▀   ▀██████▀    ███   ▀█▀ █▀    ▀█   █▀    ████████▀
//                                    ▀

interface setupCook {
  list: () => string;
  cook: (dishNumber: number, additional: string) => string;
  skill: (skillReq: number) => string;
}

interface dish {
  name: string;
  key: string;
  desc: string;
  img: string;
  skill: number; // minimum skill requirement
  checks: [number, number, number]; // skill check threshold to make fail, crappy, okay, good food.
  cookTime: number;
  cookText: string; // optional texts for cooking description.
  cookFail: string; // description if you fuck up.
  ingredients: any[];
  result: string; // suffix of item system item you create such as "crappy blini", "decent blini", "perfect blini".
  known: boolean; // is the receipt known to the pc
  baseQuality: number; // how good the dish is (0-100)
  run(); // the special effects of the dish
}

interface ingredients {
  name: string;
  quality: 1 | 2 | 3;
  type: string;
}

// NAMESPACE
if (setup.cook === null || setup.cook === undefined) {
  setup.cook = {} as setupCook;
}
if (aw.dishes === null || aw.dishes === undefined) {
  aw.dishes = {} as dish[];
}

setup.cook.list = function(): string {
  let out = `<<include [[Consumables]]>><div id="cookDiv"><p><<f Y>>ou check your fridge to see what meals you can actually cook.</p><p>@@.mono;Maybe I should replenish my ingredients stash visiting Cum'n Go or Hole Foods...@@</p>@@.note;The system is only partly implemented now. Special food is intended to be used for home dates and hangouts, so it is not edible in a standard way. If you are looking for food for your character, good news, she eats by herself, check the spendings in weekly morning menu. You can buy ingredients in the Cum'n go for now on.@@<br><br>`;
  const addIngr = ["SatyrTablet", "SatyrVial", "Heat300", "Heat150", "Heat100", "ZoneBottle1", "FocusVial80", "FocusVial40", "FocusTablet40", "SemenBottle"];
  let addDrop = "";
  for (let index = 0; index < addIngr.length; index++) {
    if (setup.consumables.hasConsumable(addIngr[index], 1) ) {
      addDrop += addIngr[index];
    }
  }
  for (let index = 0; index < aw.dishes.length; index++) {
    if (aw.dishes[index].known) {
      let hasAll = true;
      for (let ii = 0; ii < aw.dishes[index].ingredients.length; ii++) {
        if (aw.dishes[index].ingredients[ii].length > 1) {
          let counter = 0;
          for (let iii = 0; iii < aw.dishes[index].ingredients[ii].length; iii++) {
            if (State.active.variables.items.has(aw.dishes[index].ingredients[ii][iii])) {
              counter += 1;
            }
          }
          if (counter === 0) {
            if (aw.dishes[index].ingredients[ii].includes("Soy milk") || aw.dishes[index].ingredients[ii].includes("Hucow milk")) {
              if (setup.consumables.amtOfConsumable("breastMilkA") > 0) {
                counter += 1;
              }
            }
            hasAll = false;
          }
        } else {
          if (!State.active.variables.items.has(aw.dishes[index].ingredients[ii])) {
            hasAll = false;
          }
        }
      }
      let ingredientList = "";
      for (let piss = 0; piss < aw.dishes[index].ingredients.length; piss++) {
        if (aw.dishes[index].ingredients[piss].length === 1) {
          ingredientList += aw.dishes[index].ingredients[piss] + " ";
        } else {
          ingredientList += aw.dishes[index].ingredients[piss][0] + " or " + aw.dishes[index].ingredients[piss][1] + " ";
        }
      }
      if (hasAll && aw.dishes[index].skill <= ↂ.skill.curCook) {
        out += `<div style="width: 200px; height: 500px; background-color: #380c0c; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><img data-passage="${aw.dishes[index].img}" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 200px; height: 200px;"><span style="float: left; width: 100%;"><span class="wdColor"><b>${aw.dishes[index].name}</b></span> ${aw.dishes[index].cookTime} min.<br><span class="handwriting wdGray"><small>${aw.dishes[index].desc}</small></span><br><small style="word-break: break-all;">${ingredientList}</small><br>Skill: ${setup.cook.skill(aw.dishes[index].skill)}</span><span style="float: left"><<dropdown "$additionalIngr" "none" ${addDrop}>> <<button "Cook">><<replace "#cookDiv">><<print setup.cook.cook("${index}", "${State.active.variables.additionalIngr}")>><</replace>><</button>></span></div>`;
      } else {
        out += `<div style="width: 200px; height: 500px; background-color: #875076; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><img data-passage="${aw.dishes[index].img}" style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 200px; height: 200px;"><span style="float: left; width: 100%;"><span class="wdColor"><b>${aw.dishes[index].name}</b></span> ${aw.dishes[index].cookTime} min.<br><span class="handwriting wdGray"><small>${aw.dishes[index].desc}</small></span><br><small style="word-break: break-all;">${ingredientList}</small><br>Skill: ${setup.cook.skill(aw.dishes[index].skill)}</span><span style="float: left">@@.disabled;<<button "Cook">><</button>>@@</span></div>`;
      }
    }
  }
  out += `</div>`;
  return out;
};

setup.cook.cook = function(dishNumber: number, additional: string): string {
  let ingrQuality = 2;
  let usedOwnMilk = "";
  for (let ii = 0; ii < aw.dishes[dishNumber].ingredients.length; ii++) {
    if (aw.dishes[dishNumber].ingredients[ii].length > 1) {
      let found = false;
      for (let iii = 0; iii < aw.dishes[dishNumber].ingredients[ii].length; iii++) {
        if (State.active.variables.items.has(aw.dishes[dishNumber].ingredients[ii][iii]) && found === false) {
          ingrQuality += aw.ingredients[aw.dishes[dishNumber].ingredients[ii][iii]];
          State.active.variables.items.drop(aw.dishes[dishNumber].ingredients[ii][iii]);
          found = true;
        }
      }
      if (found === false) {
        if (aw.dishes[dishNumber].ingredients[ii].includes("Soy milk") || aw.dishes[dishNumber].ingredients[ii].includes("Hucow milk")) {
          if (setup.consumables.amtOfConsumable("breastMilkA") > 0) {
            usedOwnMilk = " In absence of any milk in the fridge you have used some of your own from the Cryo-Canister.";
          }
        }
      }
    } else {
      ingrQuality += aw.ingredients[aw.dishes[dishNumber].ingredients[ii]].quality;
      State.active.variables.items.drop(aw.dishes[dishNumber].ingredients[ii]);
    }
  }
  const processedIngrQuality = Math.floor(ingrQuality / aw.dishes[dishNumber].ingredients.length);
  let out = `<<status 1>><<addtime ${aw.dishes[dishNumber].cookTime}>><center><img data-passage="${either("IMG-Cooking1", "IMG-Cooking2", "IMG-Cooking3", "IMG-Cooking4", "IMG-Cooking5")}"></center>`;
  out += `<p><<print either("<<f A>>fter getting sure you have everything you need you start cooking.","<<f Y>> check if you have everything you need for a dish and proceed to cooking.")>>${usedOwnMilk} ${aw.dishes[dishNumber].cookText}`;
  let result = 0;
  setup.SCXfunc();
  setup.SCfunc("CO", (aw.dishes[dishNumber].checks[0] - processedIngrQuality));
  if (State.active.variables.SCresult[1]) {
    result += 1;
  }
  setup.SCXfunc();
  setup.SCfunc("CO", (aw.dishes[dishNumber].checks[1] - processedIngrQuality));
  if (State.active.variables.SCresult[1]) {
    result += 1;
  }
  setup.SCXfunc();
  setup.SCfunc("CO", (aw.dishes[dishNumber].checks[2] - processedIngrQuality));
  if (State.active.variables.SCresult[1]) {
    result += 1;
  }
  let item = "Error :(";
  let item2 = "Error :(";
  let item3 = "";
  let item4 = "";
  if (State.active.variables.additionalIngr !== "none") {
    out += `<<dropconsumable ${State.active.variables.additionalIngr}>>`;
    item3 = ` (${State.active.variables.additionalIngr}-flavored.)`;
    item4 = `[${State.active.variables.additionalIngr.substring(0, 1).toUpperCase()}]`;
  }
  aw.con.info(`setup.cook.cook, processedIngrQuality is ${processedIngrQuality} dishNumber is ${dishNumber}, additional ingr is ${additional}, result is ${result}`);
  switch (result) {
    case 0:
      out += `${aw.dishes[dishNumber].cookFail}<<stress 5 "Cooking Failure">><<happy -1 "Cooking Failure">>`;
      break;
    case 1:
      item = "Poor quality " + aw.dishes[dishNumber].name + " " + item4;
      item2 = " The quality is pretty bad.";
      out += `You managed to make ${aw.dishes[dishNumber].result} but it turned out rather bad. At least it is edible... hopefully.`;
      break;
    case 2:
      item = "Normal quality " + aw.dishes[dishNumber].name + " " + item4;
      item2 = " The quality is mediocre.";
      out += `You managed to make ${aw.dishes[dishNumber].result}, it seems pretty okay to you.`;
      break;
    case 3:
      item = "Good quality " + aw.dishes[dishNumber].name + " " + item4;
      item2 = " The quality is very good.";
      out += `You managed to make ${aw.dishes[dishNumber].result}, it smells wonderful and you are very happy with a result.<<happy 1 "Cooking Success">>`;
      break;
    default:
      out += `Oh shit, error in setup.cook.cook, pls report!`;
      break;
  }
  aw.invItems.info[item] = aw.dishes[dishNumber].desc + item2 + item3;
  aw.invItems.image[item] = aw.dishes[dishNumber].img;
  out += `</p><<pickup "$items" "${item}">><<status 0>><<updatebar>>`;
  return out;
};

setup.cook.skill = function(skillReq): string {
  let out = "Error";
  if (skillReq > 100) {
    out = "very hard";
  } else if (skillReq > 70) {
    out = "hard";
  } else if (skillReq > 40) {
    out = "medium";
  } else if (skillReq > 20) {
    out = "easy";
  } else {
    out = "piece of cake";
  }
  return out;
};

aw.dishes = [
  {
      name: "Blini",
      key: "blini",
      desc: "Pancakes, Russian style. May cause Bestification...",
      img: "IMG-Item-Blini",
      skill: 25,
      checks: [10, 12, 14],
      cookTime: 15,
      cookText: "You add a thin layer of batter to a pan and think Russian thoughts...",
      cookFail: "You add the blyat to the pan, wait... what? That shit's on fire!",
      ingredients: [
          ["Flour"],
          ["Eggs"],
          ["Hucow milk", "Soy milk"],
      ],
      result: "Blini",
      known: true,
      baseQuality: 30,
      run() {},
  },
  {
      name: "Burger",
      key: "burger",
      desc: "A sandwich consisting of one or more cooked patties of meat, placed inside a sliced bread bun.",
      img: "IMG-Item-Burger",
      skill: 20,
      checks: [10, 12, 15],
      cookTime: 25,
      cookText: "You put patties on a pan and start preparing other ingredients while it fries...",
      cookFail: "Slicing the cucumbers, how does the patties doing by the way?... Oh crap, they got black, damned!",
      ingredients: [
          ["Bread"],
          ["Cheese"],
          ["Patty"],
          ["Pickles"],
          ["Lettuce"],
      ],
      result: "Burger",
      known: true,
      baseQuality: 40,
      run() {},
  },
  {
      name: "Fried Eggs",
      key: "scrambledEggs",
      desc: "Just some fried eggs, all-time classic.",
      img: "IMG-Item-FriedEggs",
      skill: 10,
      checks: [6, 10, 15],
      cookTime: 10,
      cookText: "You put break eggs over the pan trying to avoid the shell parts getting there too...",
      cookFail: "It seems it is almost ready... wait, why it stuck to the pan? Shit, it doesn't come off! Oh, just perfect! Now it is all black.",
      ingredients: [
          ["Eggs"],
      ],
      result: "Fried Eggs",
      known: true,
      baseQuality: 20,
      run() {},
  },
  {
      name: "Omelette",
      key: "omelette",
      desc: "a dish made from beaten eggs in a frying pan",
      img: "IMG-Item-Omelette",
      skill: 18,
      checks: [8, 13, 15],
      cookTime: 15,
      cookText: "You put the pan on the fire and start to beat eggs while it heats...",
      cookFail: "Oh, shit, this thing must not be that black color, right?",
      ingredients: [
          ["Eggs"],
          ["Oil"],
      ],
      result: "Omelette",
      known: true,
      baseQuality: 20,
      run() {},
  },
  {
      name: "Salad",
      key: "salad",
      desc: "a vegetable salad, healthy and nice.",
      img: "IMG-Item-Salad",
      skill: 10,
      checks: [5, 10, 15],
      cookTime: 15,
      cookText: "You wash tomatoes and start slicing them with a knife...",
      cookFail: "After a while you are not sure what has gone wrong but the result is awful. @@.mono;Gosh, how did I manage to fuck up the <i>SALAD</i>???@@",
      ingredients: [
          ["Tomato"],
          ["Lettuce"],
          ["Pickles"],
          ["Oil"],
          ["Cheese"],
      ],
      result: "Salad",
      known: true,
      baseQuality: 30,
      run() {},
  },
  {
      name: "Sandwich",
      key: "sandwich",
      desc: "Two slices of bread with some ham and cheese between them.",
      img: "IMG-Item-Sandwich",
      skill: 20,
      checks: [5, 10, 20],
      cookTime: 13,
      cookText: "You slice the bread and prepare other ingredients...",
      cookFail: "After assembling the sandwich you are forced to admit that the result is quite pathetic, damn thing just dont want to stay in one piece and falls apart each time. After a several attempts the bread gets soaked in mayo and your sandwich turns into a slippery mess. And so does your self-esteem.",
      ingredients: [
          ["Bread"],
          ["Ham"],
          ["Lettuce"],
          ["Mayo"],
          ["Cheese"],
      ],
      result: "Sandwich",
      known: true,
      baseQuality: 30,
      run() {},
  },
  {
      name: "Cheesecake",
      key: "cheesecake",
      desc: "A sweet dessert consisting of several layers of cheese and egg.",
      img: "IMG-Item-Cheesecake",
      skill: 40,
      checks: [10, 15, 20],
      cookTime: 45,
      cookText: "After preparing and mixing all the ingredients you put the baking dish into the oven...",
      cookFail: "oh crap, black smoke is coming from the oven!",
      ingredients: [
          ["Flour"],
          ["Eggs"],
          ["Hucow milk", "Soy milk"],
          ["Oil"],
      ],
      result: "Cheesecake",
      known: true,
      baseQuality: 50,
      run() {},
  },
  {
      name: "Pizza",
      key: "pizza",
      desc: "A round baked pie-like thing invented in Italy around XVII century.",
      img: "IMG-Item-Pizza",
      skill: 40,
      checks: [10, 15, 20],
      cookTime: 55,
      cookText: "After preparing and mixing all the ingredients you put the pizza into the oven...",
      cookFail: "oh crap, black smoke is coming from the oven!",
      ingredients: [
          ["Flour"],
          ["Cheese"],
          ["Tomato"],
          ["Ham"],
          ["Pickles"],
      ],
      result: "Pizza",
      known: true,
      baseQuality: 40,
      run() {},
  },
  {
      name: "Lasagne",
      key: "lasagne",
      desc: "A stacked layers of pasta alternated with sauces and various ingredients.",
      img: "IMG-Item-Lasagne",
      skill: 45,
      checks: [10, 15, 20],
      cookTime: 55,
      cookText: "After preparing and stacking all the ingredients you put your lasagne into the oven...",
      cookFail: "damn, thing looks like a disaster. Black, burned disaster.",
      ingredients: [
          ["Flour"],
          ["Cheese"],
          ["Tomato"],
          ["Ham"],
      ],
      result: "Lasagne",
      known: true,
      baseQuality: 60,
      run() {},
  },
  {
      name: "Pasta",
      key: "pasta",
      desc: "Italian food typically made from an unleavened dough.",
      img: "IMG-Item-Pasta",
      skill: 30,
      checks: [10, 15, 20],
      cookTime: 40,
      cookText: "You put pasta into the pan...",
      cookFail: "it seems it gets into a single clump, shit.",
      ingredients: [
          ["Flour"],
          ["Cheese"],
          ["Egg"],
      ],
      result: "Pasta",
      known: true,
      baseQuality: 50,
      run() {},
  },
  {
      name: "Cookies",
      key: "cookies",
      desc: "Baked food that is typically small, flat and sweet.",
      img: "IMG-Item-Cookies",
      skill: 50,
      checks: [10, 15, 20],
      cookTime: 55,
      cookText: "After mixing ingredients you start to form flour into a cookie shape...",
      cookFail: "damn bowl falls from the table and all the mix is on the floor now.",
      ingredients: [
          ["Flour"],
          ["Hucow milk", "Soy milk"],
          ["Egg"],
      ],
      result: "Cookies",
      known: true,
      baseQuality: 40,
      run() {},
  },
  {
      name: "Doner kebab",
      key: "doner",
      desc: "A sandwich made of meat and various vegetables.",
      img: "IMG-Item-Doner",
      skill: 40,
      checks: [10, 15, 20],
      cookTime: 45,
      cookText: "You start preparing meat and slicing vegetables...",
      cookFail: "just to see that you totally messed the whole thing.",
      ingredients: [
          ["Bread"],
          ["Ham", "Patty"],
          ["Pickles"],
          ["Lettuce"],
          ["Tomato"],
      ],
      result: "Doner kebab",
      known: true,
      baseQuality: 30,
      run() {},
  },
  {
      name: "Prairy Oysters",
      key: "prairyOysters",
      desc: "A popular midwest dish with bull's testicles in a sauce.",
      img: "IMG-Item-PrairyOysters",
      skill: 60,
      checks: [10, 15, 22],
      cookTime: 72,
      cookText: "You start seasoning testicles...",
      cookFail: "oh crap, the sauce bursted out!",
      ingredients: [
          ["Testicles"],
          ["Hucow milk", "Soy milk"],
          ["Oil"],
          ["Eggs"],
      ],
      result: "Prairy Oysters",
      known: true,
      baseQuality: 70,
      run() {
        setup.drug.eatDrug("cum", 10);
      },
  },
  {
      name: "Goulash",
      key: "goulash",
      desc: "A stew of meet and vegetables with paprika.",
      img: "IMG-Item-Goulash",
      skill: 40,
      checks: [10, 13, 18],
      cookTime: 65,
      cookText: "You put all components into the bowl and put it on fire...",
      cookFail: "Is it supposed to be that color? And why it smells like this???",
      ingredients: [
        ["Bread"],
        ["Ham", "Patty", "Testicles"],
        ["Pickles"],
        ["Tomato"],
        ["Potato"],
      ],
      result: "Goulash",
      known: true,
      baseQuality: 60,
      run() {},
  },
  {
      name: "Omorashi soup",
      key: "omorashi",
      desc: "A traditional Japanese soup made from various ingredients. Known for distinctive yellow color and delicious taste.",
      img: "IMG-Item-Omorashi",
      skill: 60,
      checks: [10, 13, 18],
      cookTime: 65,
      cookText: "You add the ingredients and put the bowl on fire...",
      cookFail: "after some time it starts smelling like a boiled piss, which is not right at all. It seems your omorashi soup went very wrong.",
      ingredients: [
        ["Bread"],
        ["Hucow milk", "Soy milk"],
        ["Mayo"],
        ["Flour"],
      ],
      result: "Omorashi soup",
      known: true,
      baseQuality: 70,
      run() {},
  },
  {
      name: "Black angus star",
      key: "bas",
      desc: "Seasoned and fried dish made from specific rare parts of a cow's meat.",
      img: "IMG-Item-Bac",
      skill: 50,
      checks: [10, 13, 18],
      cookTime: 65,
      cookText: "After cleaning and stretching the delicate meat you put it onto the pan...",
      cookFail: "just to see it gaped after just a minute of frying which means that the dish is ruined. Crap.",
      ingredients: [
        ["Ham"],
        ["Pickles"],
        ["Oil"],
      ],
      result: "Black angus star",
      known: true,
      baseQuality: 60,
      run() {},
  },
  {
      name: "Busted balls",
      key: "bustedBalls",
      desc: "Well tenderized deep-fried meatballs, this dish was invented by famous European misandrist chief Hanna Stern.",
      img: "IMG-Item-BustedBalls",
      skill: 40,
      checks: [10, 13, 18],
      cookTime: 35,
      cookText: "You put testicles on the table and start tenderizing them with your fist...",
      cookFail: "shit, somehow you managed to make them burst and now the content is spread all around the kitchen.",
      ingredients: [
        ["Testicles"],
        ["Flour"],
        ["Eggs"],
      ],
      result: "Busted balls",
      known: true,
      baseQuality: 60,
      run() {},
  },
  {
      name: "Snake salad",
      key: "snakeSalad",
      desc: "The simpliest dish known to the humanity.",
      img: "IMG-Item-Snake",
      skill: 5,
      checks: [3, 5, 7],
      cookTime: 5,
      cookText: "You make the body of the snake out of mayo and prepare two black pepper balls for eyes...",
      cookFail: "incredible, somehow you was able to ruin even this dish. Maybe cooking is just not for you?",
      ingredients: [
        ["Mayo"],
      ],
      result: "Snake salad",
      known: true,
      baseQuality: 10,
      run() {},
  },
  {
      name: "Lich Meat",
      key: "lichMeat",
      desc: "A weird traditional dish from guam. It is basically an oddy shaped ham salad.",
      img: "IMG-Item-Lichmeat",
      skill: 25,
      checks: [8, 10, 13],
      cookTime: 28,
      cookText: "You start to form a skull from ham...",
      cookFail: "hmmm, this look much more like a cat than a lich's head. This means it is ruined and there is nobody to blame except yourself.",
      ingredients: [
        ["Ham"],
        ["Pickles"],
        ["Lettuce"],
      ],
      result: "Lich Meat",
      known: true,
      baseQuality: 40,
      run() {},
  },
];

aw.ingredients = {
  Bread: {
    name: "Bread",
    quality: 2,
    type: "bread",
  },
  Cheese: {
    name: "Cheese",
    quality: 2,
    type: "cheese",
  },
  Eggs: {
    name: "Eggs",
    quality: 2,
    type: "eggs",
  },
  Ham: {
    name: "Ham",
    quality: 2,
    type: "ham",
  },
  Hucowmilk: {
    name: "Hucow milk",
    quality: 3,
    type: "milk",
  },
  Lettuce: {
    name: "Lettuce",
    quality: 2,
    type: "lettuce",
  },
  Mayo: {
    name: "Mayo",
    quality: 2,
    type: "sauce",
  },
  Patty: {
    name: "Patty",
    quality: 2,
    type: "meat",
  },
  Pickles: {
    name: "Pickles",
    quality: 2,
    type: "pickles",
  },
  Soymilk: {
    name: "Soy milk",
    quality: 1,
    type: "milk",
  },
  Flour: {
    name: "Flour",
    quality: 2,
    type: "flour",
  },
  Oil: {
    name: "Oil",
    quality: 3,
    type: "sauce",
  },
  Tomato: {
    name: "Tomato",
    quality: 3,
    type: "vegetable",
  },
  Potato: {
    name: "Potato",
    quality: 3,
    type: "vegetable",
  },
  testicles: {
    name: "Testicles",
    quality: 3,
    type: "meat",
  },
};
