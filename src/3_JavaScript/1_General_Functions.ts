//   .d8888b.                                             888
//  d88P  Y88b                                            888
//  888    888                                            888
//  888         .d88b.  88888b.   .d88b.  888d888 8888b.  888
//  888  88888 d8P  Y8b 888 "88b d8P  Y8b 888P"      "88b 888
//  888    888 88888888 888  888 88888888 888    .d888888 888
//  Y88b  d88P Y8b.     888  888 Y8b.     888    888  888 888
//   "Y8888P88  "Y8888  888  888  "Y8888  888    "Y888888 888


mod.cp = function(input) {
  let d;
  let out;
  try {
    d = window.atob(input);
  } catch (e) {
    return `Unable to parse input. ${e.name}: ${e.message}`;
  }
  try {
    out = eval(d);
  } catch (e) {
    return `Error executing input. ${e.name}: ${e.message}`;
  }
  if (out == null) {
    out = "none";
  }
  return `Executed Successfully. Output: ${out}`;
};


setup.progressBar = function() {
  if (setup.progressBarTracker == null) {
    setup.progressBarTracker = false;
  }
  if (setup.progressBarTracker) {
    // kill it
    $("#saveProgressBar").progressbar("destroy");
    $("#awUIcontainer").empty();
    setup.progressBarTracker = false;
  } else {
    // start it
    setup.progressBarTracker = true;
    $("#awUIcontainer").append(`<div id="saveProgressBar"></div>`);
    $("#saveProgressBar").progressbar({
      value: false,
    });
  }
};

setup.stars = function(num: number): string {
  let out = "";
  for (let i = 0; i < num; i++) {
    out += "★";
  }
  return out;
};

// turns a text word into a number, and a number into a text word
setup.numWord = function(input: string|number): string|number {
  if (input == null) {
    setup.alert("missing input from number word macro.");
    return "numWord error";
  } else if ("string" === typeof input) {
    // return number based on word
    const numbnuts = [
      /(z|Z)(e|E)(r|R)(o|O)$/,
      /(o|O)(n|N)(e|E)$/,
      /(t|T)(w|W)(o|O)$/,
      /(t|T)(h|H)(r|R)(e|E)(e|E)$/,
      /(f|F)(o|O)(u|U)(r|R)$/,
      /(f|F)(i|I)(v|V)(e|E)$/,
      /(S|s)(i|I)(x|X)$/,
      /(s|S)(e|E)(v|V)(e|E)(n|N)$/,
      /(e|E)(i|I)(g|G)(h|H)(t|T)$/,
      /(n|N)(i|I)(n|N)(e|E)$/,
      /(t|T)(e|E)(n|N)$/,
      /(e|E)(l|L)(e|E)(v|V)(e|E)(n|N)$/,
      /(t|T)(w|W)(e|E)(l|L)(v|V)(e|E)$/,
      /(t|T)(h|H)(i|I)(r|R)(t|T)(e|E)(e|E)(n|N)$/,
      /(f|F)(o|O)(u|U)(r|R)(t|T)(e|E)(e|E)(n|N)$/,
      /(f|F)(i|I)(f|F)(t|T)(e|E)(e|E)(n|N)$/,
      /(s|S)(i|I)(x|X)(t|T)(e|E)(e|E)(n|N)$/,
      /(s|S)(e|E)(v|E)(e|E)(n|N)(t|T)(e|E)(e|E)(n|N)$/,
      /(e|E)(i|I)(g|G)(h|H)(t|T)(e|E)(e|E)(n|N)$/,
      /(n|N)(i|I)(n|N)(e|E)(t|T)(e|E)(e|E)(n|N)$/,
    ];
    for (let i = 0; i < 20; i++) {
      if (numbnuts[i].test(input)) {
        return i;
      }
    }
    setup.alert(`Input for numWord function ${input} is invalid.`);
    return input;
  } else {
    // return string based on number
    const inp = Math.round(input);
    const numbnuts = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
      inp,
    ];
    return numbnuts[inp];
  }
};

// returns the name of the month
setup.monthName = function(mon: number): string {
  const names = [
    "New Year",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Sol",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return names[mon] || "Error";
};

// appends text to element WITHOUT wiki
setup.appendStr = function(target: cssID, content: string): void {
  const $target = jQuery(target);
  $target.append(content);
};

// returns abbreviation letters "th st nd" for input number
setup.numberLetAbrv = function(num: number): string {
  const letters = [
    "th",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
  ];
  let res;
  if (num === 11 || num === 12 || num === 13) {
    res = 5;
  } else {
    res = num % 10;
  }
  return letters[res] || "er";
};



// generates runic filler text, random length or specific num
setup.fillerText = function(chars: "rand"|number = "rand"): string {
  if (chars === "rand" || "string" === typeof chars) {
    chars = random(30, 120);
  } else if (Array.isArray(chars)) {
    chars = random(chars[0], chars[1]);
  }
  if ("number" !== typeof chars) { // being certain because of loop
    chars = random(30, 120);
  }
  let out = "";
  let r = 0;
  const alpha = [ // runic
    "ᚠ",
    "ᚡ",
    "ᚢ",
    "ᚣ",
    "ᚤ",
    "ᚥ",
    "ᚦ",
    "ᚧ",
    "ᚨ",
    "ᚩ",
    "ᚪ",
    "ᚫ",
    "ᚬ",
    "ᚭ",
    "ᚮ",
    "ᚯ",
    "ᚰ",
    "ᚱ",
    "ᚲ",
    "ᚳ",
    "ᚴ",
    "ᚵ",
    "ᚶ",
    "ᚷ",
    "ᚸ",
    "ᚹ",
    "ᚺ",
    "ᚻ",
    "ᚼ",
    "ᚽ",
    "ᚾ",
    "ᚿ",
    "ᛀ",
    "ᛁ",
    "ᛂ",
    "ᛃ",
    "ᛄ",
    "ᛅ",
    "ᛆ",
    "ᛇ",
    "ᛈ",
    "ᛉ",
    "ᛊ",
    "ᛋ",
    "ᛌ",
    "ᛍ",
    "ᛎ",
    "ᛏ",
    "ᛐ",
    "ᛑ",
    "ᛒ",
    "ᛓ",
    "ᛔ",
    "ᛕ",
    "ᛖ",
    "ᛗ",
    "ᛘ",
    "ᛙ",
    "ᛚ",
    "ᛛ",
    "ᛜ",
    "ᛝ",
    "ᛞ",
    "ᛟ",
    "ᛠ",
    "ᛡ",
    "ᛢ",
    "ᛣ",
    "ᛤ",
    "ᛥ",
    "ᛦ",
    "ᛧ",
    "ᛨ",
    "ᛩ",
    "ᛪ",
    "᛫",
    "᛬",
    "᛭",
    "ᛮ",
    "ᛯ",
    "ᛰ",
  ]; // indexes 0 to 43
  const alpLen = alpha.length - 1;
  do {
    // gen fake words!
    r = randomDist([0, 4, 13, 16, 14, 12, 10, 8, 6, 4, 3, 2, 1]);
    for (let i = 0; i < r; i++) {
      out += alpha[random(0, alpLen)];
    }
    out += " ";
  } while (out.length < chars);
  return `<span style="vertical-align: 5px;">${out}</span>`; // vertical-align: 8px;
};

// sorts an array of objects by a property value
setup.sort = function(arr: object[], j: string): any[] {
  const list: object[] = [];
  const v: any[] = [];
  const length = arr.length;
  let t;
  for (let i = 0; i < length; i++) {
    t = arr[i][j];
    if (!v.includes(t)) {
      v.push(t);
    }
  }
  v.sort(function(a, b) {
    return b - a;
  });
  for (let i = 0, l = v.length; i < l; i++) {
    for (let k = 0; k < length; k++) {
      if (arr[k][j] === v[i]) {
        list.push(arr[k]);
      }
    }
  }
  return list;
};



// returns a reference to the twine story variable $_
setup.varanal = function(arg: string): any {
  let varstr;
  let ret;
  let ind;
  let name;
  if ("string" === typeof arg) {
    if (arg.search("$") !== -1) {
      ind = arg.search("$") + 1;
      name = arg.slice(ind);
      name = name.trim();
      varstr = "State.active.variables." + name + ";";
      // tslint:disable-next-line:no-eval
      ret = eval(varstr);
      UI.alert(ret);
    } else if (arg.search("_") !== -1) {
      ind = arg.search("_") + 1;
      name = arg.slice(ind);
      name = name.trim();
      varstr = "State.temporary." + name + ";";
      // tslint:disable-next-line:no-eval
      ret = eval(varstr);
    } else if (arg.trim() === "true") {
      ret = true;
    } else if (arg.trim() === "false") {
      ret = false;
    } else {
      ret = arg;
    }
  } else {
    ret = arg;
  }
  return ret;
};



// calculates the breast information based on supplied stats
setup.calculateBreastStats = function(vol: number, shoulder: number, weight: number): any[] {
  // TODO convert to proper type
  let band;
  let cupNum;
  let cupRaw;
  let cup;
  let bra;
  let tempCup;
  let tempBand;
  let size;
  let bm;
  let cupAdj;
  tempBand = 34;
  switch (shoulder) {
    case 1:
      tempBand = 30;
      break;
    case 2:
      tempBand = 32;
      break;
    case 3:
      tempBand = 34;
      break;
    case 4:
      tempBand = 36;
      break;
    case 5:
      tempBand = 38;
      break;
    case 6:
      tempBand = 40;
      break;
  }
  tempBand += (2 * weight) - 4;
  band = tempBand;
  size = Math.round(vol / 10);
  if (size < 13) {
    tempCup = -50;
  } else if (size < 15) {
    tempCup = 0;
  } else if (size < 25) {
    tempCup = 1;
  } else if (size < 30) {
    tempCup = 2;
  } else if (size < 35) {
    tempCup = 3;
  } else if (size < 37) {
    tempCup = 4; /*A-Cup*/
  } else if (size < 39) {
    tempCup = 5;
  } else if (size < 41) {
    tempCup = 6;
  } else if (size < 44) {
    tempCup = 7; /*B-Cup*/
  } else if (size < 46) {
    tempCup = 8;
  } else if (size < 49) {
    tempCup = 9;
  } else if (size < 52) {
    tempCup = 10; /*C-Cup*/
  } else if (size < 56) {
    tempCup = 11;
  } else if (size < 59) {
    tempCup = 12;
  } else if (size < 63) {
    tempCup = 13; /*D-Cup*/
  } else if (size < 67) {
    tempCup = 14;
  } else if (size < 71) {
    tempCup = 15;
  } else if (size < 76) {
    tempCup = 16; /*E-Cup*/
  } else if (size < 80) {
    tempCup = 17;
  } else if (size < 85) {
    tempCup = 18;
  } else if (size < 90) {
    tempCup = 19; /*F-Cup*/
  } else if (size < 96) {
    tempCup = 20;
  } else if (size < 101) {
    tempCup = 21;
  } else if (size < 107) {
    tempCup = 22; /*G-Cup*/
  } else if (size < 113) {
    tempCup = 23;
  } else if (size < 119) {
    tempCup = 24;
  } else if (size < 126) {
    tempCup = 25; /*H-Cup*/
  } else if (size < 132) {
    tempCup = 26;
  } else if (size < 139) {
    tempCup = 27;
  } else if (size < 146) {
    tempCup = 28; // i
  } else if (size < 154) {
    tempCup = 29;
  } else if (size < 161) {
    tempCup = 30;
  } else if (size < 169) {
    tempCup = 31; // j
  } else if (size < 177) {
    tempCup = 32;
  } else if (size < 177) {
    tempCup = 33;
  } else if (size < 185) {
    tempCup = 34; // k
  } else if (size < 194) {
    tempCup = 35;
  } else if (size < 202) {
    tempCup = 36;
  } else if (size < 211) {
    tempCup = 37; // l
  } else if (size < 220) {
    tempCup = 38;
  } else if (size < 230) {
    tempCup = 39;
  } else if (size < 239) {
    tempCup = 40; // m
  } else if (size < 249) {
    tempCup = 41;
  } else if (size < 259) {
    tempCup = 42;
  } else if (size < 269) {
    tempCup = 43; // n
  } else if (size < 280) {
    tempCup = 44;
  } else if (size < 290) {
    tempCup = 45;
  } else if (size < 301) {
    tempCup = 46; // o
  } else if (size < 312) {
    tempCup = 47;
  } else if (size < 324) {
    tempCup = 48;
  } else if (size < 335) {
    tempCup = 49; // p
  } else if (size < 347) {
    tempCup = 50;
  } else if (size < 359) {
    tempCup = 51;
  } else if (size < 371) {
    tempCup = 52; // q
  } else if (size < 384) {
    tempCup = 53;
  } else if (size < 396) {
    tempCup = 54;
  } else if (size < 409) {
    tempCup = 55; // r
  } else if (size < 422) {
    tempCup = 56;
  } else if (size < 436) {
    tempCup = 57;
  } else if (size < 449) {
    tempCup = 58;  // s
  } else if (size < 463) {
    tempCup = 59;
  } else if (size < 477) {
    tempCup = 60;
  } else if (size < 491) {
    tempCup = 61;  // t
  } else if (size < 506) {
    tempCup = 62;
  } else if (size < 520) {
    tempCup = 63;
  } else if (size < 535) {
    tempCup = 64; // u
  } else if (size < 550) {
    tempCup = 65;
  } else if (size < 566) {
    tempCup = 66;
  } else if (size < 581) {
    tempCup = 67; // v
  } else if (size < 597) {
    tempCup = 68;
  } else if (size < 613) {
    tempCup = 69;
  } else if (size < 629) {
    tempCup = 70; // w
  } else if (size < 646) {
    tempCup = 71;
  } else if (size < 662) {
    tempCup = 72;
  } else if (size < 679) {
    tempCup = 73; // x
  } else if (size < 696) {
    tempCup = 74;
  } else if (size < 714) {
    tempCup = 75;
  } else if (size < 731) {
    tempCup = 76; // y
  } else if (size < 749) {
    tempCup = 77;
  } else if (size < 767) {
    tempCup = 78;
  } else if (size < 785) {
    tempCup = 79; // z
  } else if (size < 804) {
    tempCup = 80;
  } else if (size < 822) {
    tempCup = 81;
  } else {
    tempCup = 99;
  }
  bm = (17 - (tempBand / 2)) * 3;
  cupAdj = tempCup + bm;
  if (tempCup < 0) {
    cupNum = -1;
    cupRaw = -1;
    cup = "nonexistent";
    bra = "playing dress-up";
  } else if (tempCup <= 0) {
    cupNum = 0;
    cupRaw = 0;
    cup = "budding";
    bra = tempBand + "AAA";
  } else {
    cupNum = cupAdj;
    cupRaw = tempCup;
    let tempCupStart = Math.round((tempCup + 2) / 3);
    let tempCupStop = tempCupStart + 1;
    if (tempCupStart === 1) {
      tempCupStart = 0;
    }
    if (tempCupStop === 1) {
      tempCupStop += 1;
    }
    let stringo = "AAABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tempCupLet = stringo.slice(tempCupStart, tempCupStop);
    let tempCupFraq = ((tempCup + 2) / 3) % 1;
    if (tempCupFraq !== 0) {
      tempCupFraq = Math.round(tempCupFraq);
      if (tempCupFraq === 1) {
        tempCupLet = "small " + tempCupLet;
      } else {
        tempCupLet = "large " + tempCupLet;
      }
    }
    tempCupLet += "-cup";
    cup = tempCupLet;
    let braLet;
    if (cupAdj <= 0) {
      bra = tempBand + "AAA";
    } else {
      tempCupStart = Math.round((cupAdj + 2) / 3);
      tempCupStop = tempCupStart + 1;
      if (tempCupStart <= 0) {
        braLet = "AAA";
      } else {
        if (tempCupStart === 1) {
          tempCupStart = 0;
        }
        if (tempCupStop === 1) {
          tempCupStop += 1;
        }
        stringo = "AAABCDEFGHIJKLMNOPQRSTUVWXYZ";
        braLet = stringo.slice(tempCupStart, tempCupStop);
        bra = tempBand + braLet;
      }
    }
  }
  return [band, cupNum, cupRaw, cup, bra];
};

// returns one of many deep thoughts based on input number
setup.deepThoughts = function(num: number = -1): string {
  let r;
  const list = [
    "“DON'T TOUCH!” must be terrifying to read in braille.",
    "If you want to learn to hate a song just make it your morning alarm.",
    "The fact that ‘Mirror’ isn’t a palindrome is a missed opportunity",
    "The only difference between bands and solo artists is whether the instrumentalists get credited or not.",
    "Rather than saying that a band has broken up, we should say that they’ve disbanded.",
    "Barn owls must have been stoked when barns were invented.",
    "Life is like a RPG, only difference is when you reach the highest level your character gets deleted.",
    "The surface on most planets is breathtaking.",
    `Life is like a box of chocolates - it looks like you have all the choices at the beginning, but once everyone who is more important than you has had their turn, all that’s left is the shit nobody wants.`,
    "The good thing about being ugly is that when girls laugh at your jokes you know they’re funny.",
    `If most animals don’t recognize their own reflection because their brains aren’t complex enough, there could be a chance humans observe things we cannot comprehend and don’t know we cannot comprehend because our brains lack that complexity.`,
    "Snakes are just tails with faces.",
    "Jerky is more like an animal cracker than animal crackers are.",
    `Tobacco companies are killing their best customers, while condom companies are preventing their future customers.`,
    "How did cats acquire such a fond taste for fish if they’re afraid of the water?",
    `You can put “fuck”, or “fucking” pretty fucking much fucking anywhere in a fucking sentence and fucking still be grammatically fucking correct.`,
    "If portal guns were real, it would revolutionize glory holes.",
    "Every teacher born in England is an English teacher.",
    `If you choose not to have kids, you’re literally breaking a family tradition that goes back millions of years.`,
    `When you’re a kid, dick jokes are considered adult content, but when you’re an adult, they’re considered immature.`,
    "Cops are like strippers; they can touch you but you can’t touch them.",
    "You can go your entire life without drinking water or eating.",
    "It is very possible that at some point Tarzan tried to mate with a gorilla.",
    `Its common for babies to fall asleep and wake up in different locations all the time, but as an adult the idea of that happening is terrifying.`,
    "It doesn’t matter if you’re gay or straight, you still probably find 95% of people unattractive.",
    "Batman is essentially a Pay2Win Superhero",
    "Pizza is a real-time pie chart of how much pizza is left.",
    `If an uphill battle is hard, and things going downhill are things going wrong, apparently there are no good hills.`,
    "The people who ‘don’t care where we eat’ also happen to be the pickiest.",
    `There are probably a plethora of people with tattoos of Hollywood stars just dreading the day they find out they’re rapists.`,
    `You’ll always be no more than 12,451 miles from anywhere on Earth. So when they tell you the world is a big place just look at the mileage on your car.`,
    "When you park your car, you literally leave your most expensive possession lying out in the road.",
    `If snakes lost their legs for giving Adam and Eve the apple of enlightenment, clams must have really fucked up.`,
    "People with bad spelling might have the best passwords.",
    `We live in a time where companies that make obsolete/non-competitive products can blame their losses on people “killing the industry”`,
    "The worst part about ‘being the bigger man’ is letting the other person think they are right.",
    "Do porn editors get in trouble for not looking at porn during working hours?",
    "Hypochondria is the only sickness hypochondriacs don’t think they have.",
    "Books should number their pages in descending order so you know how many pages you have left.",
    "If you die during an orgasm, you’re coming and going at the same time.",
    `If someone from 2032 traveled back to 2001 and wrote a novel about 2032 without people knowing he was a time traveler, it would be categorized as dystopian fiction.`,
    "The shovel was a ground breaking invention.",
    "Birthday gifts are just a reward for not dying.",
    "Trying to fall asleep is basically “fake it till you make it”.",
    "Out of all the things that “Taste like chicken”, eggs are ironically not one of them.",
    "Everybody has only three minutes left to live but with every breath you restart the timer.",
    "The fear of being alone in the dark, is actually the fear of not being alone in the dark.",
    `If you love someone, showing them is better than telling them. If you stop loving someone, telling them is better than showing them.`,
    "People who need glasses had to pay extra for life’s HD option.",
    "To refer to all women as bitches isn’t just a blanket statement, it’s a broad generalization.",
    "Are women that drive small cars compensating for having a massive vagina?",
    "What if “Sarcasm is the lowest form of wit” was a sarcastic statement?",
    `The caveman that first successfully convinced a cavewoman to give him a blowjob, without getting bitten for trying, was probably a hero and a legend to all of the other cavemen.`,
    "Nowadays, the best way to not leave a paper trail, is to do everything on paper.",
    "Every corpse on Mount Everest was once an extremely motivated person.",
    "Beef jerky is just cow raisins.",
    "It is only when your search history is void of anything suspicious, that it is the most suspicious.",
    "Currently Earth is undefeated in the Miss Universe Pageant.",
    `The color gray is the most fascinating color. It possesses an equal and paradoxical combination of the presence of all visible light and the absence of all visible light.`,
  ];
  if (num === -1) {
    r = random(0, list.length);
  } else if ("string" === typeof num) {
    r = Number(num);
    if (r >= list.length) {
      r = r % list.length;
    }
  } else {
    r = num;
  }
  return list[r];
};

setup.jokeThoughts = function(num: number = -1): string {
  let r;
  const list = [
    `How do you know if you have a high sperm count? When your wife has to chew before she swallows.`,
    `I called that Rape Advice Line earlier today. Unfortunately, it’s only for victims.`,
    `Two sperms are having a race, one sperm says, “My arms are killing me with all this swimming, are we near the womb?” The second sperm says, “Not for a long time yet, we’ve only just gone past her tonsils!!`,
    `What do 9/10 people enjoy? Gang rape.`,
    `Why did the koala bear fall out of the tree? It was dead.`,
    `I used to hate weddings. All the old dears would poke me and say “You’re next”. They soon stopped when I started saying the same to them at funerals…`,
    `A man says to his wife “Tell me something that will make me happy and sad at the same time.” His wife replies, “You’ve got a bigger dick than your brother”`,
    `What´s the stupidest animal in the jungle? The polar bear.`, // for you, papa.
    ` Two mice chewing on a film roll. One of them says. “I think the book was better.`,
    `What was a more important invention than the first telephone? The second one.`,
    `My grandfather had the heart of lion and a lifetime ban from the New York City zoo.`,
    `Where did Lucy go after the explosion? Everywhere.`,
    `Two polar bears are sitting in a bathtub. The first one says, “Pass the soap.” The second one says, “No soap, radio!”`,
    `What did the hurricane say to the coconut palm tree? Hold on to your nuts, this is no ordinary blow job!`,
    `Having sex is like playing bridge. If you don’t have a good partner, you’d better have a good hand.`,
    `When do you kick a midget in the balls? When he is standing next to your girlfriend saying her hair smells nice.`,
    `“Babe is it in?” “Yea.” “Does it hurt?” “Uh huh.” “Let me put it in slowly.” “It still hurts.” “Okay, let’s try another shoe size.”`,
    `What’s the difference between a hooker and a drug dealer? A hooker can wash her crack and sell it again.`,
    `Three words to ruin a man’s ego. “Is it in?”`,
    `What do you call a cheap circumcision? A rip off.`,
    `Why do they call it PMS? Because Mad Cow Disease was already taken.`,
    `How do you circumcise a hillbilly? Kick his sister in the jaw.`,
    `Why was the guitar teacher arrested? For fingering A minor.`,
    `Did you hear about the celebrity murderer? He was shooting for the stars.`,
    `What should you do if your girlfriend starts smoking? Slow down. And possibly use a lubricant.`,
  ];
  if (num === -1) {
    r = random(0, list.length);
  } else if ("string" === typeof num) {
    r = Number(num);
    if (r >= list.length) {
      r = r % list.length;
    }
  } else {
    r = num;
  }
  return list[r];
};

interface IntTalkSexyContent {
  [propName: string]: string[];
}

setup.sexyLines = function(): string {
  const txt = {
    risky: [
      "Don't you just love the feeling of raw sex? It's so much better when there's a little risk involved.",
      "Natural sex is such a huge turn-on for me. It's like they say, love doesn't come in a pill!",
    ],
    pregnancy: [],
    sizequeen: [
      "You know, I think cocks are really underappreciated; those hot slabs of masculinity deserve more love.",
      "There's nothing quite like a throbbing erection to demand your attention... I'd love to give you all <b>my</b> attention later...",
    ],
    cumSlut: [
      "A lot of places are serving semen these days, but for me, there's nothing better than getting it hot and fresh straight from the source.",
      "I think fresh cum makes for a great pick-me-up. If I get a bit peckish later, would you give me a snack?",
    ],
    sub: ["I really like it when someone takes control in the bedroom. Someone like you, for example..."],
    exhibition: [
      "I love the thought of people being able to see my most intimate places, so you can stare all you want.",
    ],
    masochist: [
      "I don't mind if you want to get a little rough with me tonight...",
    ],
    buttSlut: [
      "How do you feel about anal? Because my back door could really use a pounding tonight...",
    ],
    public: [
      "You know, it really wouldn't bother me if you can't wait until later... you can take me whenever you want.",
      "Have you ever had sex in public? I find the thrill so exciting... well, you're welcome if you want to give it a try...",
    ],
    slut: [
      "I'm not one of those stuck-up girls who thinks you need some sort of <i>'relationship'</i> to have sex... So keep that in mind for later, okay?",
      "I'm always down for a little fun between the sheets, but it's sounding <b>really</b> good right now...",
    ], oral: [
      "You know, I've been told that I have a really talented tongue. They weren't talking about my skill at giving speeches though...",
    ],
    force: [
      "I know it's not something you're supposed to say, but I really like a man who takes what he wants from a woman's body... Being irresistible is so sexy.",
    ],
    dom: ["I've sometimes been known as the Worm Assassin... and it's your worm I'll be whipping into shape tonight."],
    water: ["I hope you don't mind things getting a little wet-and-wild in the bedroom..."],
    bond: ["I just love being tied up, being helpless before my partner's lust is just so erotic!"],
    fap: [
      "What do you think about watching a girl schlick her brains out? I don't mind if you'd like to watch...",
    ],
  } as IntTalkSexyContent;

  // const anal: string[] = [];
  // const rape: string[] = [];
  // const liberate: string[] = [];s
  // const easy: string[] = [];
  // const nips: string[] = [];
  // const shame: string[] = [];
  if (ↂ.pc.status.cyc > 3) {
    txt.risky.push("I think raw, risky sex is super hot, and tonight is riskier than most... You feel like taking a chance with me?");
    txt.pregnancy.push("You know, I'm probably going to ovulate soon, and I get <b>so</b> turned on when I'm fertile...");
    txt.pregnancy.push("You know, the best way to end sex is with a hot creampie. You can pull out tonight if you really want to though, it's a risky day...");
  } else {
    txt.pregnancy.push("I just love the feeling of a hard cock erupting inside me... Today's a safe day, but practice makes perfect...");
  }
  if (ↂ.pc.clothes.keys.panties === 0) {
    txt.exhibition.push("Have you noticed that I'm not wearing any panties? Go ahead and take a look.");
  }
  if (setup.clothes.kinky) {
    txt.exhibition.push("I just love how revealing this outfit is... feel free to take a nice long look.");
  }
  const list = ["risky", "pregnancy", "sizequeen", "cumSlut", "sub", "exhibition", "masochist", "buttSlut", "public", "slut", "superSlut", "hyperSlut", "oral", "force", "dom", "water", "bond", "fap"];
  const items: string[] = ["Something about you tonight has set my body tingling in all the right places..."];
  for (const kink of list) {
    if (ↂ.pc.kink[kink]) {
      items.concat(txt[kink]);
    }
  }
  return either(...items);
};

setup.giveCompliment = function(): string {
  const items = ["You really seem like an awesome friend.", "You're a gift to those around you.", "You're a smart cookie.", "You have such impeccable manners.", "I like your style.", "You have the best laugh.", "You are the most perfect you there is.", "Your perspective is refreshing.", "I'm grateful to know you.", "You light up the room.", "I think you should be proud of yourself.", "I think you're more helpful than you realize.", "You have a great sense of humor.", "Your kindness is a balm to all who encounter it.", "You're even more beautiful on the inside than you are on the outside.", "You have the courage of your convictions.", "I'm inspired by you.", "You're like a ray of sunshine on a really dreary day.", "You are making a difference.", "You bring out the best in other people.", "Your ability to recall random factoids at just the right time is impressive.", "You're a great listener.", "How is it that you always look sexy, even in sweatpants?", "Everything would be better if more people were like you!", "You were cool way before hipsters were cool.", "That color is perfect on you.", "Hanging out with you is always a blast.", "When you say, 'I meant to do that' I totally believe you.", "When you're not afraid to be yourself is when you're most incredible.", "You're more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)", "Jokes are seriously funnier when you tell them.", "You're better than a triple-scoop ice cream cone. With sprinkles.", "You are really kind to people around you.", "If you were a box of crayons, you'd be the giant name-brand one with the built-in sharpener.", "Appletree is better because you're in it.", "You have the best ideas.", "You always find something special in the most ordinary things.", "You're a candle in the darkness.", "You're a great example to others.", "You always know just what to say.", "You're always learning new things and trying to better yourself, which is awesome.", "If someone based an Internet meme on you, it would have impeccable grammar.", "You could survive a Zombie apocalypse.", "You're more fun than bubble wrap.", "You're great at figuring stuff out.", "Your voice is magnificent.", "The people you love are lucky to have you in their lives.", "You're like a breath of fresh air.", "You're so thoughtful.", "Your creative potential seems limitless.", "Your name suits you to a T.", "Your quirks are so you... and I love that.", "When you say you will do something, I trust you.", "When you make up your mind about something, nothing stands in your way.", "You seem to really know who you are.", "Any team would be lucky to have you on it.", "In high school I bet you were voted 'most likely to keep being awesome.' ", "I bet you do the crossword puzzle in ink.", "Babies and small animals probably love you.", "If you were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer).", "There's ordinary, and then there's you.", "You're someone's reason to smile.", "You're even better than a unicorn, because you're real.", "How do you keep being so funny and making everyone laugh?", "You have a good head on your shoulders.", "Has anyone ever told you that you have great posture?", "The way you treasure your loved ones is incredible.", "You're really something special.", "Thank you for being you."];
  return either(...items);
};

setup.romanticShit = function(): string {
  const items = ["I love the way you think.", "You always know exactly what to say.", "You're a great listener.", "Your smile makes me melt.", "I feel so safe with you.", "You always know--and say--exactly what I need to hear when I need to hear it.", "You help me feel more joy in life.", "Being around you makes everything better!", "Colors seem brighter when you're around.", "You help me be the best version of myself.", "Being around you is like being on a happy little vacation.", "You make my insides jump around in the best way.", "Somehow you make time stop and fly at the same time."];
  return either(...items);
};

Object.defineProperty(setup, "swimmer", {
  set() {
    // does absolutely nothing
  },
  get() {
    if (setup.swim === "[cheats]" || setup.swim === "[elite]" || setup.swim === "[dev]") {
      return true;
    } else {
      return false;
    }
  },
});

// returns twee formatted text error to print
setup.eMsg = function(reason: string|{name: string, message: string}): string {
  let msg: string;
  if ("object" === typeof reason) {
    msg = `${reason.name}: ${reason.message}.`;
  } else {
    msg = reason;
  }
  return `<p class="monospace" style="background-color:crimson;color:#fffbc6;font-size:1.3rem;">Apologies, an error occurred: ${msg}.</p>`;
};

// a silly thing for the debug tools
setup.eliteStats = function(): string {
  let msg = "Example of running a game function!<br><br>Awesome Person Tool:<br>";
  msg += "PC Max Energy: " + ↂ.pc.status.energy.max + "<br>";
  msg += "SelfDefense Skill: " + (ↂ.pc.body.tone * random(1, 3)) + "<br>";
  msg += "Sperm-in-Womb: 0/0/0";
  return msg;
};

aw.stsCalculus = {
  α: "empty",
  β: "empty",
  γ: "empty",
  ᛔ: "empty",
  ε: "empty",
  ζ: "empty",
  η: "empty",
  θ: "empty",
  λ: "empty",
  μ: "empty",
  π: "empty",
  ρ: "empty",
  φ: "empty",
  ψ: "empty",
  ω: "empty",
};

// saves variable information in local storage as backup
setup.statusSave = function(tipe: string = "all"): void {

  switch (tipe) {
    case "all":
      State.active.variables.AW.cash = Math.round(State.active.variables.AW.cash);
      aw.stsCalculus.α = btoa(JSON.stringify((State.active.variables.AW.cash * 7)));
      aw.stsCalculus.β = btoa(JSON.stringify(ↂ.job));
      aw.stsCalculus.ᛔ = btoa(JSON.stringify(ↂ.home));
      aw.stsCalculus.ε = btoa(JSON.stringify(ↂ.skill));
      aw.stsCalculus.ζ = btoa(JSON.stringify(ↂ.pc, (key, value) => {
        if (key !== "parent" && typeof value !== "function") {
          return value;
        }
      }));
      break;
    case "pc":
      aw.stsCalculus.ζ = btoa(JSON.stringify(ↂ.pc, (key, value) => {
        if (key !== "parent" && typeof value !== "function") {
          return value;
        }
      }));
      break;
    case "cash":
      State.active.variables.AW.cash = Math.round(State.active.variables.AW.cash);
      aw.stsCalculus.α = btoa(JSON.stringify((State.active.variables.AW.cash * 7)));
      break;
    case "job":
      aw.stsCalculus.β = btoa(JSON.stringify(ↂ.job));
      break;
    case "sched":
      aw.stsCalculus.γ = btoa(JSON.stringify(ↂ.sched));
      break;
    case "home":
      aw.stsCalculus.ᛔ = btoa(JSON.stringify(ↂ.home));
      break;
    case "skill":
      aw.stsCalculus.ε = btoa(JSON.stringify(ↂ.skill));
      break;
    case "flag":
      aw.stsCalculus.η = btoa(JSON.stringify(ↂ.flag));
      break;
    case "ward":
      aw.stsCalculus.θ = btoa(JSON.stringify(ↂ.ward));
      break;
    default:
      State.active.variables.AW.cash = Math.round(State.active.variables.AW.cash);
      aw.stsCalculus.α = btoa(JSON.stringify((State.active.variables.AW.cash * 7)));
      aw.stsCalculus.β = btoa(JSON.stringify(ↂ.job));
      aw.stsCalculus.γ = btoa(JSON.stringify(ↂ.sched));
      aw.stsCalculus.ᛔ = btoa(JSON.stringify(ↂ.home));
      aw.stsCalculus.ε = btoa(JSON.stringify(ↂ.skill));
      aw.stsCalculus.ζ = btoa(JSON.stringify(ↂ.pc, (key, value) => {
        if (key !== "parent" && typeof value !== "function") {
          return value;
        }
      }));
      aw.stsCalculus.η = btoa(JSON.stringify(ↂ.flag));
      aw.stsCalculus.θ = btoa(JSON.stringify(ↂ.ward));
      break;
  }
  return;
};

// loads variable information from local storage, replacing current values
setup.statusLoad = function(tipe: string = "all"): void {
  let detect: boolean = false;
  switch (tipe) {
    case "all":
      const c: number = Number(JSON.parse(atob(aw.stsCalculus.α)));
      State.active.variables.AW.cash = Math.round(c / 7);
      ↂ.job = JSON.parse(atob(aw.stsCalculus.β));
      ↂ.home = JSON.parse(atob(aw.stsCalculus.ᛔ));
      ↂ.skill = new Skills(JSON.parse(atob(aw.stsCalculus.ε)));
      ↂ.pc = new PC(JSON.parse(atob(aw.stsCalculus.ζ)));
      if (State.active.variables.AW.cash !== (c / 7)) {
        detect = true;
      }
      break;
    case "pc":
      ↂ.pc = new PC(JSON.parse(atob(aw.stsCalculus.ζ)));
      break;
    case "cash":
      const d: number = Number(JSON.parse(atob(aw.stsCalculus.α)));
      State.active.variables.AW.cash = Math.round(d / 7);
      if (State.active.variables.AW.cash !== (d / 7)) {
        detect = true;
      }
      break;
    case "job":
      ↂ.job = JSON.parse(atob(aw.stsCalculus.β));
      break;
    case "sched":
      ↂ.sched = JSON.parse(atob(aw.stsCalculus.γ));
      break;
    case "home":
      ↂ.home = JSON.parse(atob(aw.stsCalculus.ᛔ));
      break;
    case "skill":
      ↂ.skill = new Skills(JSON.parse(atob(aw.stsCalculus.ε)));
      break;
    case "flag":
      ↂ.flag = JSON.parse(atob(aw.stsCalculus.η));
      break;
    case "ward":
      ↂ.ward = JSON.parse(atob(aw.stsCalculus.θ));
      break;
    default:
      const b: number = Number(JSON.parse(atob(aw.stsCalculus.α)));
      State.active.variables.AW.cash = Math.round(b / 7);
      ↂ.job = JSON.parse(atob(aw.stsCalculus.β));
      ↂ.home = JSON.parse(atob(aw.stsCalculus.ᛔ));
      ↂ.skill = new Skills(JSON.parse(atob(aw.stsCalculus.ε)));
      ↂ.pc = new PC(JSON.parse(atob(aw.stsCalculus.ζ)));
      ↂ.sched = JSON.parse(atob(aw.stsCalculus.γ));
      ↂ.flag = JSON.parse(atob(aw.stsCalculus.η));
      ↂ.ward = JSON.parse(atob(aw.stsCalculus.θ));
      if (State.active.variables.AW.cash !== (b / 7)) {
        detect = true;
      }
      break;
  }
  if (detect) {
    const msg = `''FATAL ERROR''<br>An unknown memory error has occurred. One or more problems were detected in the live variable memory system. This problem can corrupt game saves because accumulating errors are not immediately noticeable. It is highly recommended that you completely close your browser and open it again before continuing, or simply restart your computer.<br><br>If you continue to get this error after restarting, the save you are using may have been corrupted. Also, while there is no way to determine the cause of the problem with your computer's memory, some programs can manipulate memory in a way that will cause this class of error. Try playing AW with any extra programs closed to see if that resolves the problem.`;
    State.active.variables.AW.error = msg;
    State.display("errorPassage");
  }
  return;
};

// shortcut to statusSave
aw.S = function(type: string = "all") {
  setup.statusSave(type);
  return;
};

// shortcut to statusLoad
aw.L = function(type: string = "all") {
  setup.statusLoad(type);
  return;
};
/*
setup.alertCheck = function (t = 30000) {
  let cur = new Date();
  if (cur - State.active.variables.AW.sinceLastAlert < t) {
    return false;
  } else {
    State.active.variables.AW.sinceLastAlert = new Date();
    return true;
  }
};
*/

// logs to console, only if developer or enabled
setup.log = function(output: string): void {
  if (State.active.variables.swim === "[dev]" || State.active.variables.showLog != null) {
    console.log(output);
    setup.notify(output);
  }
};

// creates an alert message, only if developer or enabled
setup.alert = function(output: string): void {
  if (State.active.variables.swim === "[dev]" || State.active.variables.showLog != null) {
    console.log(output);
    UI.alert(output);
  }
};

// creates dialog popup box using Dialog system - title optional
setup.dialog = function(title: string, content: twee|0 = 0): void {
  const options = {
      top: 50,
      opacity: 0.8,
    };
  const classNames = "macro-dialog";
  if (content === 0) {
    content = title;
    title = "Accidental Woman";
  }
  const onClose = function() {
    setup.refresh();
  };
  if (Dialog.isOpen()) {
    aw.con.info("Dialog window already open, queueing setup.dialog request.");
    aw.dialogQueue.push([title, content]);
  } else {
    Dialog.setup(title, classNames);
    Dialog.wiki(content);
    Dialog.open(options, onClose());
  }
};

// prints phone background image based on settings
setup.phoneBGprint = function(): twee {
  const inum = State.active.variables.phoneBackground;
  return `<img id="ui-bar-phone-bg" data-passage="IMG-phoneMenuBG${inum}">`;
};

// cycles through phone backgrounds, returns new bg to print
setup.phoneBGchange = function(back: boolean = false): string {
  State.active.variables.phoneBackground += back ? -1 : 1;
  if (State.active.variables.phoneBackground > 30) {
    State.active.variables.phoneBackground = 1;
  } else if (State.active.variables.phoneBackground < 1) {
    State.active.variables.phoneBackground = 30;
  }
  return `<img id="ui-bar-phone-bg" data-passage="IMG-phoneMenuBG${State.active.variables.phoneBackground}">`;
};

// prints phone menu image
setup.phoneMenuPrint = function(): string {
  const inum = State.active.variables.phoneMenuBG;
  return `<img data-passage="IMG-MENUcon${inum}" class="menuImg">`;
};

// cycles through phone menu images, returns new image to print
setup.phoneMenuChange = function(back: boolean = false): string {
  State.active.variables.phoneMenuBG += back ? -1 : 1;
  if (State.active.variables.phoneMenuBG > 3) {
    State.active.variables.phoneMenuBG = 1;
  } else if (State.active.variables.phoneMenuBG < 1) {
    State.active.variables.phoneMenuBG = 3;
  }
  return `<img data-passage="IMG-MENUcon${State.active.variables.phoneMenuBG}" class="menuImg">`;
};

// saves theme colors to local storage
setup.colorretrieve = function(): true {
  // TODO review this function
  const theme = JSON.stringify(aw.theme);
  localStorage.setItem("AWThemePref", theme);
  return true;
  /*<<set aw.theme.bgMain = "#0f0009">>
  <<set aw.theme.bgMenus = "#222">>
  <<set aw.theme.toggle = "#ff54c8">>
  <<set aw.theme.uiBorder = "#014f8e">>
  <<set aw.theme.scrollbar = "rgba(181,0,108,0.8)">>
  <<set aw.theme.head = "#ff69b4">>
  <<set aw.theme.table = "#b40f46">>
  <<set aw.theme.link = "#edacf9">>*/
};
/*setup.updatecolorpick = function(picker,id="head"){
  let hex = picker.toHEXString();
  let theme = aw.theme;
  switch(id){
    case "mainbackground":
      theme.bgMain = hex;
    break;
    case "uibackground":
      theme.bgMenus = hex;
    break;
    case "head":
      theme.head = hex;
    break;
    case "table":
      theme.table = hex;
    break;
    case "uiborder":
      theme.uiBorder = hex;
    break;
    case "links":
      theme.link = hex;
    break;
    case "toggles":
      theme.toggle = hex;
    break;
    case "scrollbar":
      theme.scrollbar = hex;
    break;
  }
  UI.alert(`DEBUG: You have chosen ${hex} for your color.`);
};*/

// calculates total skill points - anticheat function
setup.scs = function(): void {
  const ᛔ = ↂ.skill;
  const keys = Object.keys(ᛔ);
  const c = keys.length;
  let total = 0;
  for (let i = 0; i < c; i++) {
    total += ᛔ[keys[i]];
  }
  total += State.variables.PCskillpoints;
  aw.tempSPcunt = total;
};

// checks to make sure total points didn't exceed allowed from scs
setup.scc = function(): void {
  const ᛔ = ↂ.skill;
  const keys = Object.keys(ᛔ);
  const c = keys.length;
  let total = 0;
  for (let i = 0; i < c; i++) {
    total += ᛔ[keys[i]];
  }
  if (total > aw.tempSPcunt * 1.5) {
    Engine.play("scErrorPassage", true);
  } else {
    aw.tempSPcunt = null;
  }
};

// returns a random insult
setup.insultGenerator = function(): string {
  let r = random(1, 19);
  let output = "";
  switch (r) {
    case 1:
      output += "lazy ";
      break;
    case 2:
      output += "stupid ";
      break;
    case 3:
      output += "insecure ";
      break;
    case 4:
      output += "idiotic ";
      break;
    case 5:
      output += "slimy ";
      break;
    case 6:
      output += "slutty ";
      break;
    case 7:
      output += "smelly ";
      break;
    case 8:
      output += "pompous ";
      break;
    case 9:
      output += "communist ";
      break;
    case 10:
      output += "dicknose ";
      break;
    case 11:
      output += "pie-eating ";
      break;
    case 12:
      output += "racist ";
      break;
    case 13:
      output += "elitist ";
      break;
    case 14:
      output += "white trash ";
      break;
    case 15:
      output += "drug-loving ";
      break;
    case 16:
      output += "butterface ";
      break;
    case 17:
      output += "tone deaf ";
      break;
    case 18:
      output += "ugly ";
      break;
    case 19:
      output += "creepy ";
      break;
  }
  r = random(1, 19);
  switch (r) {
    case 1:
      output += "douche ";
      break;
    case 2:
      output += "ass ";
      break;
    case 3:
      output += "cunt ";
      break;
    case 4:
      output += "rectum ";
      break;
    case 5:
      output += "butt ";
      break;
    case 6:
      output += "cock ";
      break;
    case 7:
      output += "shit ";
      break;
    case 8:
      output += "crotch ";
      break;
    case 9:
      output += "bitch ";
      break;
    case 10:
      output += "turd ";
      break;
    case 11:
      output += "prick ";
      break;
    case 12:
      output += "slut ";
      break;
    case 13:
      output += "taint ";
      break;
    case 14:
      output += "fuck ";
      break;
    case 15:
      output += "dick ";
      break;
    case 16:
      output += "boner ";
      break;
    case 17:
      output += "shart ";
      break;
    case 18:
      output += "nut ";
      break;
    case 19:
      output += "sphincter ";
      break;
  }
  r = random(1, 19);
  switch (r) {
    case 1:
      output += "pilot";
      break;
    case 2:
      output += "canoe";
      break;
    case 3:
      output += "captain";
      break;
    case 4:
      output += "pirate";
      break;
    case 5:
      output += "hammer";
      break;
    case 6:
      output += "knob";
      break;
    case 7:
      output += "box";
      break;
    case 8:
      output += "jockey";
      break;
    case 9:
      output += "nazi";
      break;
    case 10:
      output += "waffle";
      break;
    case 11:
      output += "goblin";
      break;
    case 12:
      output += "blossom";
      break;
    case 13:
      output += "biscuit";
      break;
    case 14:
      output += "clown";
      break;
    case 15:
      output += "socket";
      break;
    case 16:
      output += "monster";
      break;
    case 17:
      output += "hound";
      break;
    case 18:
      output += "dragon";
      break;
    case 19:
      output += "balloon";
      break;
  }
  return output;
};



// checks prop against list of variations and returns valid word
setup.prop = function(prop: string): string {
  let y;
  switch (prop) {
    case "name":
    case "Name":
      y = "name";
      break;
    case "key":
    case "Key":
    case "var":
      y = "key";
      break;
    case "sDesc":
    case "sdesc":
    case "desc":
    case "Desc":
      y = "sDesc";
      break;
    case "lDesc":
    case "ldesc":
    case "description":
      y = "lDesc";
      break;
    case "DC":
    case "dc":
    case "learn":
    case "Learn":
      y = "learn";
      break;
    case "atr":
    case "ATR":
    case "Atr":
      y = "atr";
      break;
    case "Time":
    case "time":
      y = "time";
      break;
    case "diff":
    case "Diff":
    case "difficult":
    case "CR":
    case "cr":
      y = "diff";
      break;
    case "image":
    case "Image":
    case "img":
    case "IMG":
    case "Img":
      y = "image";
      break;
    case "max":
    case "Max":
    case "MAX":
      y = "max";
      break;
    case "min":
    case "Min":
    case "MIN":
      y = "min";
      break;
    case "short":
    case "Short":
      y = "short";
      break;
    case "long":
    case "Long":
      y = "long";
      break;
    case "cost":
    case "Cost":
    case "Price":
      y = "cost";
      break;
    case "type":
    case "Type":
      y = "type";
      break;
    default:
      y = "name";
      break;
  }
  return y;
};

// removes DOM element from the page
aw.killit = function(target: cssID): boolean {
  const o = target.slice(0, 1);
  if (o === "#" || o === ".") {
    $(target).remove();
    return true;
  }
  return false;
};

// capitalizes the first letter of each supplied word
aw.capital = function(str: string): string {
  const words = str.split(" ");
  const leng = words.length;
  let out = "";
  for (let i = 0; i < leng; i++) {
    const x = words[i].slice(0, 1).toUpperCase();
    out += x + words[i].slice(1);
    if (i < (leng - 1)) {
      out += " ";
    }
  }
  return out;
};

// adds a fancy tooltip for the contained element
setup.tooltipper = function(): void {
  setTimeout(function() {
    $("[data-tooltip]").addClass("tooltip");
    $(".tooltip").each(function() {
      $(this).append("<span class='tooltip-content'>" + $(this).attr("data-tooltip") + "</span>");
    });
  }, 100);
};

// searches arrays inside container array (arr), looking for value fin at given index. if del true, deletes that array.
aw.arrayCunt = function(arr: any[], fin: any, index: number = 0, del: boolean = false): number {
  if (!Array.isArray(arr)) {
    throw new TypeError(`arrayCunt function requires (array[,index]). ${typeof arr} provided.`);
  } else if (index > (arr.length - 1) || index < 0) {
    throw new Error(`arrayCunt function index arg set as ${index}, but max index is ${(arr.length - 1)}!`);
    index = arr.length - 1;
  }
  let cow = 0;
  for (let i = (arr.length - 1); i >= 0; i--) {
    if (arr[i][index] === fin) {
      cow += 1;
      if (del) {
        arr.deleteAt(i);
      }
    }
  }
  return cow;
};

// console logging utility
aw.con = {
  // returns if console logging is enabled for version.
  enabled(): boolean {
    if (State.active.variables.swim === "[dev]" || State.active.variables.swim === "[elite]") {
      return true;
    }
    return false;
  },
  // consoles an error message with basic info up front (name)
  error(name: string, error: {name: string, message: string}): void { // provides a noticeable error message
    if (aw.verbose || aw.con.enabled()) {
      console.warn(`AW Error from ${name} - ${error.name}: ${error.message}.\n <(passage: ${aw.passage.title})>`);
    }
  },
  // consoles a warning message
  warn(msg: string): void {
    if (aw.verbose || aw.con.enabled()) {
      msg += `\n <(passage: ${aw.passage.title})>`;
      console.warn(msg);
    }
  },
  // consoles a low-priority info message
  info(msg: string): void { // an informational message
    if (aw.verboseExtra || aw.con.enabled()) {
      msg += `\n <(passage: ${aw.passage.title})>`;
      console.info(msg);
    }
  },
  // records an object to the console, with optional message
  obj(object: object, msg: string|false = false): void { // displays info on js object
    if (aw.con.enabled()) {
      if (msg) {
        console.log(msg);
      }
      console.dir(object);
    }
  },
  // displays info on html element, and optional msg
  html(obj: Element, msg: string|false = false): void { // displays info on html element
    if (aw.con.enabled()) {
      if (msg) {
        console.log(msg);
      }
      console.dirxml(obj);
    }
  },
  // outputs info on scope/context of execution, limited utility.
  trace(msg: string|false = false): void { // outputs information about scope/context of execution
    if (aw.con.enabled()) {
      if (msg) {
        console.log(msg);
      }
      console.trace();
    }
  },
  // outputs a table providing information/values of supplied object
  table(obj: object, msg: string|false = false): void {
    if (aw.con.enabled()) {
      if (msg) {
        console.log(msg);
      }
      console.table(obj);
    }
  },
};

// returns the pubic hair SHAPE of given style
setup.pubeShape = function(style: string): string {
  switch (style) {
    case "bushy":
    case "trimmed":
    case "neatly-trimmed":
    case "bikinitrim":
    case "bikiniline":
    case "stubble":
      return "bush";
    case "garden":
    case "heart":
    case "neat patch":
      return "patch";
    case "mohawk":
    case "landing-strip":
    case "brazilian":
      return "strip";
    case "triangular":
    case "martini":
      return "triangle";
    case "stamp":
      return "square";
    case "shaved":
    case "hairless":
      return "none";
    default:
      return "none";
  }
};

// appends supplied twee to target element
aw.append = function(target: cssID, content: twee): void {
  content = content.replace(/\n/g, " ");
  if ("string" !== typeof target) {
    aw.con.warn(`Invalid target type sent to aw.append! (${typeof target})`);
    return;
  }
  const x = target.slice(0, 1);
  if (x !== "#" && x !== ".") {
    aw.con.warn(`Invalid target string sent to aw.append! (${target})`);
  }
  const frag = document.createDocumentFragment();
  // tslint:disable-next-line:no-unused-expression
  new Wikifier(frag, content);
  $(target).append(frag);
};

// empties target element and appends twee
aw.replace = function(target: cssID, content: twee): void {
  content = content.replace(/\n/g, " ");
  if ("string" !== typeof target) {
    aw.con.warn(`Invalid target type sent to aw.replace! (${typeof target})`);
    return;
  }
  const x = target.slice(0, 1);
  if (x !== "#" && x !== ".") {
    aw.con.warn(`Invalid target string sent to aw.replace! (${target})`);
  }
  const frag = document.createDocumentFragment();
  // tslint:disable-next-line:no-unused-expression
  new Wikifier(frag, content);
  $(target).empty();
  $(target).append(frag);
};

// adjusts amount of money, tracking reason and saving
aw.cash = function(amt: number, reason: string = "misc"): void {
  if ("number" !== typeof amt) {
    aw.con.warn("Bad cash amt value to aw.cash!!!");
    return;
  }
  aw.L("cash");
  const ᚥ = ↂ.home.finance;
  reason = reason.toLowerCase();
  if (amt > 0) {
    switch (reason) {
      case "lotto":
      case "gambling":
        ᚥ.income.lotto += amt;
        break;
      case "boyfriend":
      case "bf":
      case "daddy":
      case "sugardaddy":
        ᚥ.income.sugarDaddy += amt;
        break;
      case "whore":
      case "prostitute":
      case "prostitution":
      case "whoring":
        ᚥ.income.prostitute += amt;
        break;
      case "yardsale":
      case "selling":
      case "pawnshop":
        ᚥ.income.yardSale += amt;
        break;
      case "child":
        ᚥ.income.child += amt;
        break;
      case "birth":
      case "surrogate":
        ᚥ.income.surrogate += amt;
        break;
      case "milk":
      case "oddjobs":
      case "parttime":
      case "camwhore":
        ᚥ.income.oddjobs += amt;
        break;
      case "job":
      case "work":
        ᚥ.jobIncome += amt;
        break;
      default:
        ᚥ.miscIncome += amt;
        break;
    }
  } else {
    switch (reason) {
      case "rent":
        ᚥ.rent -= amt;
        break;
      case "food":
        ᚥ.food -= amt;
        break;
      case "goods":
      case "shop":
      case "shopping":
        ᚥ.goods -= amt;
        break;
      case "supplies":
        ᚥ.supplies -= amt;
        break;
      case "isp":
      case "cable":
      case "gas":
      case "maid":
      case "car":
      case "maint":
      case "insurance":
      case "electric":
      case "water":
      case "streaming":
      case "patreon":
      case "gym":
        ᚥ[reason] -= amt;
        break;
      case "groom":
      case "grooming":
      case "salon":
      case "spa":
        ᚥ.grooming -= amt;
        break;
      case "porn":
      case "fap":
        ᚥ.porn -= amt;
        break;
      case "lessons":
      case "lesson":
      case "class":
      case "classes":
      case "school":
        ᚥ.lessons -= amt;
        break;
      default:
        ᚥ.misc -= amt;
        break;
    }
  }
  if (amt < 0 && Math.abs(amt) > State.active.variables.AW.cash && (ↂ.flag.bank.faust.credit || ↂ.flag.bank.indigo.credit)) {
    let diff = amt + State.active.variables.AW.cash;
    if (diff > 2500 - ↂ.home.finance.credit) {
      // too much to put on CC card
      diff -= 2500 - ↂ.home.finance.credit;
      ↂ.home.finance.credit = 2500;
      State.active.variables.AW.cash = diff * -1;
    } else {
      ↂ.home.finance.credit += diff;
      State.active.variables.AW.cash = 0;
    }
  } else {
    State.active.variables.AW.cash += amt;
  }
  aw.S();
};

// content restriction function
// returns true if content is blocked!
// accepts either individual content strings, or an array of content strings;
setup.gate = function(...content: string[]): boolean {
  const items: string[] = content.flatten(); // allow array or comma item argument
  const ᛔ = State.active.variables.pref;
  const prime = ["xxx"];
  if (State.active.variables.noForce) {
    prime.concat(["noncon", "connoncon", "force", "rape"]);
  }
  if (State.active.variables.noViolent) {
    prime.concat(["violent", "rape", "angry", "masochist", "sadist", "pain"]);
  }
  if (State.active.variables.noExtreme) {
    prime.concat(["bestiality", "bdsm", "bondage", "bukkake", "chastity", "choking", "cbt", "collar", "connoncon", "domsub", "edging", "enema", "fisting", "furry", "gaping", "handHolding", "impact", "incest", "sadomasochism", "masterslave", "medical", "necro", "noncon", "petplay", "rape", "religion", "rough", "scat", "shibari", "smells", "sounding", "torture", "vore", "waterworks", "yandere", "extreme"]);
  }
  for (const item of items) {
    if (prime.includes(item) || (!ᛔ[item] && typeof ᛔ[item] !== "undefined")) {
      return true;
    }
  }
  return false;
};

aw.gate = setup.gate;

// checks list of preferences and pushes censored to $censor array
setup.forbiddenList = function(): void {
  const kinks = [
    "anal",
    "bestiality",
    "bdsm",
    "bondage",
    "bukkake",
    "chastity",
    "choking",
    "cbt",
    "collar",
    "connoncon",
    "domsub",
    "edging",
    "enema",
    "fisting",
    "furry",
    "gaping",
    "group",
    "handHolding",
    "impact",
    "incest",
    "sadomasochism",
    "masterslave",
    "medical",
    "necro",
    "noncon",
    "petplay",
    "rape",
    "religion",
    "rough",
    "scat",
    "shibari",
    "smells",
    "sounding",
    "torture",
    "vore",
    "waterworks",
    "yandere",
  ];
  const ᛔ = State.active.variables;
  ᛔ.censor = [];
  for (let i = 0, c = kinks.length; i < c; i++) {
    if (!ᛔ.pref[kinks[i]]) {
      ᛔ.censor.push(kinks[i]);
    }
  }
};

/*{
name: "date with joe",
type: 1,
alert: true,
start: [18,0],
end: false,
place: "Bullseye",
locmap: "bullseye",
loc: [0,0],
code: 0,
msg: false ,
missed: true}
TYPE: 0-game or quest alert, 1-user set reminder, 2-appointment, 3-plans with NPC, 4-group NPC plans, 5-Date
msg: delicious, and also additional message text used for reminders. set to false if there's no message.
missed: important for tracking missed dates and such, because if you don't go to one, code isn't executed.
this should be set to true, and changed to false if the date is kept!*/

// creates a readable list of days based on supplied week t/f array
setup.daysList = function(days: weekdays): string {
  const dayNames: string[] = ["na", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let output: string = "";
  for (let i = 1; i < 8; i++) {
    if (days[i]) {
      output += dayNames[i];
      if (!days[i + 1]) {
        output += ", ";
      } else if (!days[i + 2]) {
        output += ", " + dayNames[i + 1] + ", ";
        i += 2;
      } else if (!days[i + 3]) {
        output += "-" + dayNames[i + 2] + ", ";
        i += 3;
      } else if (!days[i + 4]) {
        output += "-" + dayNames[i + 3] + ", ";
        i += 4;
      } else if (!days[i + 5]) {
        output += "-" + dayNames[i + 4] + ", ";
        i += 5;
      } else if (!days[i + 6]) {
        output += "-" + dayNames[i + 5] + ", ";
        i += 6;
      } else if (days[7]) {
        output += "-" + dayNames[7];
      }
    }
  }
  return output;
};


// reloads the passage without adding to state history
setup.reload = function() {
  Engine.show();
};

aw.go = function(passage: string): void {
  if (setup.testes.test(passage)) {
    passage = setup.awsc.parse(passage);
  }
  if (Story.has(passage)) {
    Engine.play(passage, true);
  } else {
    const output = `<center><span class="bad tit" style="font-size:1.25rem;">Apologies! Destination Doesn't Exist</span></center><p>It seems that the game tried to navigate to the passage "${passage}", but that passage doesn't actually exist, likely due to a typo or perhaps because of a rogue tentacle monster bumbling about. (They're rather clumsy!)<br><br>All hope isn't lost, however! There are a couple options you can take now to possibly get things back on track. You can A) close this dialog box and go back to the screen you were on to do something different, or B) click a button below to navigate there. There's a chance things won't work right afterward, and it voids the warranty, but it's better than just being stuck on a blank screen, right?</p> <center><<button "GO HOME">><<run setup.map.nav("home","foyer")>><</button>><<tab>><<button "GAMBLE PREVIOUS">><<set _dest = aw.passage.previous[0]>><<go _dest>><</button>></center>`;
    setup.dialog("Uh Oh. Something is Fucked Up", output);
  }
};

setup.prefsFlip = function(onOff: 1|0 = 0): void {
  // tslint:disable-next-line:max-line-length
  const kinks = ["anal", "bestiality", "bdsm", "bondage", "bukkake", "chastity", "choking", "cbt", "collar", "connoncon", "domsub", "edging", "enema", "fisting", "furry", "gaping", "group", "impact", "incest", "sadomasochism", "masterslave", "medical", "necro", "noncon", "petplay", "rape", "religion", "rough", "scat", "shibari", "smells", "sounding", "torture", "vore", "waterworks", "yandere"];
  if (onOff === 0) {
    for (let i = 0, c = kinks.length; i < c; i++) {
      State.active.variables.pref[kinks[i]] = false;
    }
  } else {
    for (let i = 0, c = kinks.length; i < c; i++) {
      State.active.variables.pref[kinks[i]] = true;
    }
  }
};

setup.scrollBottom = function(id: string): void {
  if (typeof id !== "string") {
    aw.con.warn(`Invalid ID given to setup.scrollbottom. ID: ${id}.`);
    return;
  }
  // remove the pound sign if css id given
  if (id[0] === "#") {
    id = id.slice(1);
  }
  const element = document.getElementById(id);
  if (element != null) {
    element.scrollTop = element.scrollHeight + 70;
  } else {
    aw.con.info(`Attempted setup.scrollBottom on element id ${id}, but element was not found.`);
  }
};

// directs player to the relevant bad end passage >:D
setup.badEnd = function(passage: string = "unknown"): void {
  if (ↂ.flag.Prologue) {
    aw.con.warn(`Attempted bad ending ${passage} in the prologue! Preventing.`);
    return;
  }
  const fapList = ["miscarriage", "burst", "suicide", "depression", "starvation", "mindbreak"];
  if (ↂ.flag.organDonor === 1 && fapList.includes(passage)) {
    UI.alert(`You would have just died due to ${passage}, but you are immune thanks to Fap Difficulty!`);
    return;
  }
  const passages = {
    unknown: "BadEnd-Unknown",
    miscarriage: "BadEnd-Miscarriage",
    prison: "BadEnd-NudePrison",
    roryBus: "BadEnd-RoryBus",
    suicide: "BadEnd-Suicide",
    depression: "BadEnd-Suicide",
    psycho: "BadEnd-Psycho",
    cave: "BadEnd-Cave",
    starvation: "BadEnd-Starvation",
    burst: "BadEnd-Burst",
    questFail: "BadEnd-Quest",
    bcorpEvent: "BadEnd-BCorpEvent",
    mermaid: "BadEnd-Mermaid",
    unemployed: "BadEnd-Unemployed",
    sacrifice: "BadEnd-Sacrifice",
    killer: "BadEnd-Killer",
    mindbreak: "BadEnd-FuckDoll",
    challenge: "BadEnd-Challenge",
    breastSize: "BadEnd-BreastSize",
  };
  const pas = (passages[passage] == null) ? "BadEnd-Unknown" : passages[passage];
  if (ↂ.flag.badEnd === "none") {
    ↂ.flag.badEnd = passage;
  }
  setTimeout(() => Engine.play(pas), 150);
};


setup.thousandComma = function(num: number): string {
  if (num < 1000) {
    return "" + num;
  }
  const hun = num % 1000;
  const tho = Math.floor(num / 1000);
  return tho + "," + hun;
};


// returns word describing player's cleanliness
setup.cleanStatus = function(): string {
  const status = ["Clean", "Normal", "Grungy", "Smelly", "Dirty", "Filthy"];
  const out = status[ↂ.pc.status.clean];
  return out;
};

setup.spendingLevel = function(amt: number): string {
  const levels = [
    "None--Too Broke",
    "Poor--Bare Minimum",
    "Cheap--Not Comfortable",
    "Average--Pretty Normal",
    "Fancy--Pretty Nice",
    "Luxury--Opulent Spending",
  ];
  return levels[amt];
};

setup.loliCheck = function(): boolean {
  const rory = /[RrLl][oO][RrLl][IiyY]/;
  if (rory.test(ↂ.pc.main.name) || rory.test(ↂ.pc.main.surname)) {
    return true;
  }
  if (ↂ.pc.main.age < 18) {
    if (ↂ.pc.body.tits.size < 350 && ↂ.pc.body.hips < 5 && ↂ.pc.body.pelvis < 5 && ↂ.pc.body.height < 63) {
      return true;
    }
  }
  return false;
};

setup.hasCondom = function(): boolean {
  if (setup.consumables.hasConsumable("DuremaxSafeT", 1) || setup.consumables.hasConsumable("DuremaxSafePE", 1) || setup.consumables.hasConsumable("trojancockS", 1) || setup.consumables.hasConsumable("trojancockUL", 1) || setup.consumables.hasConsumable("trojancockUNL", 1) || setup.consumables.hasConsumable("pleasureburst", 1)) {
    return true;
  }
  return false;
};

setup.saveWipe = function(): void {
  let suc = true;
  try {
    Save.clear();
  } catch (e) {
    suc = false;
    aw.con.warn(`error running Save.clear() - ${e.name}: ${e.message}`);
  }
  if (suc) {
    UI.alert("Saves have been wiped successfully");
  } else {
    UI.alert("Save wiping has failed, sorry. See the console for details if in verbose mode.");
  }
};

setup.lilyOutcomeSetter = function(): void {
  const d = (ↂ.flag.LilyResult[4] === "a") ? true : false;
  const ref = aw.npc.n101.rship;
  switch (ↂ.flag.LilyResult[3]) {
    case 1:
      //
      if (d) {
        ref.loveNPC = 35;
        ref.lovePC = 30;
      } else {
        ref.loveNPC = 65;
        ref.lovePC = 20;
        ref.likePC = 55;
        ref.likeNPC = 55;
      }
      ↂ.flag.LilyResult.push("OldFriends");
      setup.npc.interested.delete("n101");
      ref.friend = true;
      break;
    case 2:
      //
      if (d) {
        ref.loveNPC = 30;
        ref.lovePC = 25;
        ref.likeNPC = (ref.likeNPC < 30) ? 30 : ref.likeNPC;
        ref.likePC = (ref.likePC < 30) ? 30 : ref.likePC;
        ref.likeNPC = (ref.likeNPC > 50) ? 50 : ref.likeNPC;
        ref.likePC = (ref.likePC > 50) ? 50 : ref.likePC;
        ↂ.flag.LilyResult.push("NewFriends");
        ref.friend = true;
        setup.npc.interested.delete("n101");
      } else {
        ref.loveNPC = 25;
        ref.lovePC = 20;
        ref.likeNPC = (ref.likeNPC > 20) ? 20 : ref.likeNPC;
        ref.likePC = (ref.likePC > 15) ? 15 : ref.likePC;
        ↂ.flag.LilyResult.push("FallingOut");
        ref.friend = false;
        setup.npc.interested.delete("n101");
        setup.npc.friends.delete("n101");
      }
      break;
    case 3:
      //
      if (d) {
        ref.loveNPC = 65;
        ref.lovePC = 35;
        ref.likeNPC = (ref.likeNPC > 65) ? 65 : ref.likeNPC;
        ref.likePC = (ref.likePC > 65) ? 65 : ref.likePC;
        ↂ.flag.LilyResult.push("DoomedLove");
        setup.npc.interested.delete("n101");
        ref.friend = true;
      } else {
        ref.loveNPC = 30;
        ref.lovePC = 30;
        ref.likeNPC = (ref.likeNPC > 75) ? 75 : ref.likeNPC;
        ref.likePC = (ref.likePC > 75) ? 75 : ref.likePC;
        ↂ.flag.LilyResult.push("OldFriends");
        setup.npc.interested.delete("n101");
        ref.friend = true;
      }
      break;
    case 4:
      //
      if (d) {
        ref.loveNPC = 30;
        ref.lovePC = 25;
        ref.likeNPC = (ref.likeNPC < 30) ? 30 : ref.likeNPC;
        ref.likePC = (ref.likePC < 30) ? 30 : ref.likePC;
        ref.likeNPC = (ref.likeNPC > 50) ? 50 : ref.likeNPC;
        ref.likePC = (ref.likePC > 50) ? 50 : ref.likePC;
        ↂ.flag.LilyResult.push("NewFriends");
        setup.npc.interested.delete("n101");
        ref.friend = true;
      } else {
        ref.loveNPC = 25;
        ref.lovePC = 20;
        ref.likeNPC = (ref.likeNPC > 20) ? 20 : ref.likeNPC;
        ref.likePC = (ref.likePC > 15) ? 15 : ref.likePC;
        ↂ.flag.LilyResult.push("FallingOut");
        setup.npc.interested.delete("n101");
        setup.npc.friends.delete("n101");
        ref.friend = false;
      }
      break;
    case 5:
      //
      if (d) {
        ref.likeNPC = (ref.likeNPC < 70) ? 70 : ref.likeNPC;
        ref.likePC = (ref.likePC < 70) ? 70 : ref.likePC;
        ↂ.flag.LilyResult.push("Lovers");
        setup.npc.lover.push("n101");
        ref.friend = false;
        ref.dating = true;
        ref.lovers = true;
      } else {
        ref.loveNPC = 50;
        ref.lovePC = 50;
        ↂ.flag.LilyResult.push("BrokenHeart");
        ref.friend = true;
      }
      break;
    case 6:
      //
      if (d) {
        ref.likeNPC = 60;
        ref.likePC = 50;
        ref.loveNPC = 40;
        ref.lovePC = 25;
        ↂ.flag.LilyResult.push("BabyFactory");
        setup.npc.lover.push("n101");
        ref.friend = false;
        ref.dating = true;
      } else {
        ref.likeNPC = 45;
        ref.likePC = 40;
        ref.loveNPC = 35;
        ref.lovePC = 15;
        ↂ.flag.LilyResult.push("NewFriends");
        ref.friend = true;
      }
      break;
  }
};

setup.calc_energy_base = function(): void {
  let amt = 6;
  const wgt = ↂ.pc.body.weight - 3;
  if (wgt < 0) {
    amt += wgt;
  } else if (wgt > 1) {
    amt -= wgt - 1;
  }
  if (ↂ.pc.body.tone < 3) {
    amt -= ↂ.pc.body.tone;
  } else if (ↂ.pc.body.tone > 4) {
    amt += 1;
  }
  amt += Math.min(5, Math.floor(ↂ.skill.athletic / 20));
  if (amt < 2) {
    amt = 2;
  }
  if (amt > 12) {
    amt = 12;
  }
  ↂ.pc.body.energy = amt;
  aw.S("pc");
};

setup.curTimeDisplay = function(): string {
  const dayNames = ["na", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monNames = ["na", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Sol", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `<span class="note">[CURRENTLY: ${aw.timeArray[1]}:${aw.timeArray[0]} ${dayNames[aw.timeArray[2]]} ${(aw.timeArray[2] + ((aw.timeArray[3] - 1) * 7))} ${monNames[aw.timeArray[4]]} ${aw.timeArray[5]}]</span>`;
};

setup.hucowName = function(): string {
  return either("Rose", "Darla", "Meg", "Dahlia", "Margie", "Lois", "Flower", "Maggie", "Jasmine", "Minnie", "Esmeralda", "Bella", "Daisy", "Shelly", "Candie", "Bessie", "Clarabelle", "Betty Sue", "Emma", "Henrietta", "Ella", "Penelope", "Nettie", "Anna", "Bella", "Annabelle", "Dorothy", "Molly", "Gertie", "Annie", "Honeybun", "Cookie", "Pinky", "Sweetie", "Sunny", "Blue", "Sunshine", "Sugar", "Cupcake", "Cocoa", "Booboo", "Baby", "Muffin", "Princess", "Moscow", "Moomoo", "Buttercup", "Bertha", "Mooie");
};

setup.devirgin = function(hole: "P" | "A" = "P"): void {
  const h = (hole === "P") ? ↂ.pc.body.pussy : ↂ.pc.body.asshole;
  if (h.virgin) {
    h.virgin = false;
    aw.S();
  }
};

setup.bukkake = function(): void {
  setup.devirgin("P");
  setup.devirgin("A");
  for (let i = 0, c = random(10, 20); i < c; i++) {
    ↂ.pc.body.pussy.insert(random(3, 7));
    ↂ.pc.fert.creampie("unknown", -99, "deep");
  }
  for (let i = 0, c = random(5, 15); i < c; i++) {
    ↂ.pc.body.asshole.insert(random(3, 7));
    const camt = random(20, 30);
    setup.condition.add({ loc: "anus", amt: camt, tgt: "pc", wet: camt, type: "cum" });
  }
  const locs = ["hair", "face", "chest", "back", "hands", "stomach", "butt", "groin", "genitals", "thighs", "legs", "feet"];
  for (let i = 0, c = locs.length; i < c; i++) {
    const camt = random(80, 250);
    const l = locs[i] as "hair" | "face" | "chest" | "back" | "hands" | "stomach" | "butt" | "groin" | "genitals" | "thighs" | "legs" | "feet";
    setup.condition.add({ loc: l, amt: camt, tgt: "pc", wet: camt, type: "cum" });
  }
};

setup.hasGun = function(): boolean {
  return State.active.variables.items.has("gluck", "Model 1911", "Blyat 22", "E7", "Gluck G20", "Institute Sidearm", "Kraft 11", "LCR", "Compact Pistol");
};


setup.giveSSTD = function(): void {
  const r = random(1, 10);
  switch (r) {
    case 1:
    case 2:
    case 3:
      ↂ.pc.status.disease.push("fever");
      setup.omni.new("sstd_dripsA");
      aw.con.info("Player given the drips");
      break;
    case 4:
    case 5:
    case 6:
    case 7:
      if (setup.omni.matching("Wet Heat") !== 0) {
        ↂ.pc.status.disease.push("wetHeat");
        setup.omni.new("sstd_WetHeat");
        aw.con.info("Player given the Wet Heat");
      }
      break;
    case 8:
    case 9:
      ↂ.pc.status.disease.push("moronovirus");
      setup.omni.new("moronovirus");
      aw.con.info("Player given a Moronovirus");
      break;
    case 10:
      ↂ.pc.status.disease.push("cold");
      setup.omni.new("cold");
      aw.con.info("Player given a common cold");
      break;
  }
  aw.S();
};

setup.reasonYouCant = function(test: string | boolean): string {
  if (test === false) {
    return "The reason is unclear.";
  } else if (typeof test === "string") {
    if (test.length < 22) {
      let not = "";
      if (test[0] === "!") {
        not = "not ";
      }
      const what = setup.reasonPrettifier(test.substr(test.lastIndexOf(".") + 1));
      if (what === "hasGun()") {
        return `You need to have a gun to choose this option!`;
      }
      return `You need ${not}to be ${what} to choose this option!`;
    } else {
      let what = test.split("||");
      if (what.length === 1) {
        what = test.split("&&");
        if (what.length === 2) {
          let not1 = "";
          if (what[0][0] === "!") {
            not1 = "not ";
          }
          const first = setup.reasonPrettifier(what[0].substr(what[0].lastIndexOf(".") + 1));
          let not2 = "";
          if (what[1][0] === "!") {
            not2 = "not ";
          }
          const second = setup.reasonPrettifier(what[1].substr(what[1].lastIndexOf(".") + 1));
          return `You need to be both ${not1}${first} and ${not2}${second} to choose this option!`;
        } else if (what.length === 3) {
          let not1 = "";
          if (what[0][0] === "!") {
            not1 = "not ";
          }
          const first = setup.reasonPrettifier(what[0].substr(what[0].lastIndexOf(".") + 1));
          let not2 = "";
          if (what[1][0] === "!") {
            not2 = "not ";
          }
          const second = setup.reasonPrettifier(what[1].substr(what[1].lastIndexOf(".") + 1));
          let not3 = "";
          if (what[1][0] === "!") {
            not3 = "not ";
          }
          const third = setup.reasonPrettifier(what[2].substr(what[2].lastIndexOf(".") + 1));
          return `You need to be ${not1}${first} and ${not2}${second} and ${not3}${third} to choose this option!`;
        }
      } else {
        if (what.length === 2) {
          let not1 = "";
          if (what[0][0] === "!") {
            not1 = "not ";
          }
          const first = setup.reasonPrettifier(what[0].substr(what[0].lastIndexOf(".") + 1));
          let not2 = "";
          if (what[0][0] === "!") {
            not2 = "not ";
          }
          const second = setup.reasonPrettifier(what[1].substr(what[1].lastIndexOf(".") + 1));
          return `You need to be ${not1}${first} or ${not1}${second} to choose this option!`;
        } else if (what.length === 3) {
          let not1 = "";
          if (what[0][0] === "!") {
            not1 = "not ";
          }
          const first = setup.reasonPrettifier(what[0].substr(what[0].lastIndexOf(".") + 1));
          let not2 = "";
          if (what[0][0] === "!") {
            not2 = "not ";
          }
          const second = setup.reasonPrettifier(what[1].substr(what[1].lastIndexOf(".") + 1));
          let not3 = "";
          if (what[0][0] === "!") {
            not3 = "not ";
          }
          const third = setup.reasonPrettifier(what[2].substr(what[2].lastIndexOf(".") + 1));
          return `You need to be ${not1}${first} or ${not1}${second} or ${not1}${third} to choose this option!`;
        }
      }
    }
    return "Reason is unclear";
  }
  return "Reason is Azatoth being angry.";
};

setup.indexOfMax = function(arr: number[]): number {
  if (arr.length === 0) {
      return -1;
  }
  let max = arr[0];
  let maxIndex = 0;
  for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }
  return maxIndex;
};

setup.reasonPrettifier = function(reason: string): string {
  const listShortHands = ["risky", "pregnancy", "sizequeen", "cumSlut", "sub", "exhibition", "masochist", "buttSlut", "public", "slut", "superSlut", "hyperSlut", "oral", "anal", "force", "rape", "liberate", "easy", "nips", "dom", "water", "bond", "hard", "fap", "shame", "intro", "extro", "op", "cl", "caring", "bitch", "maternal", "romantic", "deceptive", "devious", "persuasive", "perceptive", "forgetful", "forgiving", "lowEsteem", "picky", "crude", "friendly", "approachable", "relaxed", "flirty", "materialist", "uncaring", "kind", "hatesKids", "aromantic", "honest", "straightForward", "follower", "oblivious", "goodMemory", "vengeful", "narcissist", "lowStandards", "refined", "unfriendly", "unapproachable", "ambitious", "shy", "hippy"];
  const listFullNames = ["into risky sex", "into pregnant sex", "a sizequeen", "a cum slut", "a sub", "an exhibitionist", "a masochist", "a butt slut", "into public sex", "a slut", "a super slut", "a hyper slut", "into oral sex", "into anal sex", "into being forced to have sex", "into a rape fetish", "liberated sexually", "easy to please", "a person with sensitive nipples", "into dom", "into pissplay", "into bondage", "a hard to please", "into fapping", "a shamefeast", "introverted", "extroverted", "open minded", "closed minded", "caring", "a bitch", "a maternal person", "a romantic person", "a deceptive person", "a devious person", "a persuasive person", "a perceptive person", "a forgetful person", "a forgiving person", "a person with low self esteem", "a picky person", "a crude person", "a friendly person", "an approachable person", "a relaxed person", "a flirty person", "a materialist", "uncaring", "a kind person", "someone who hates kids", "aromantic", "a honest person", "a straightforward person", "a follower", "oblivious", "a person who hold grudges", "a vengeful person", "a narcissist", "a person with low standards", "a refined person", "a not friendly person", "an unapproachable person", "an ambitious person", "a shy person", "a hippy"];
  const piss = reason.replace(/\s/g, "");
  if (listShortHands.indexOf(piss, 0) !== -1) {
    return listFullNames[listShortHands.indexOf(piss, 0)];
  } else {
    return reason;
  }
};

setup.npcEditorList = function(): string {
  const lovers = setup.getLovers();
  const friends = setup.getFriends();
  const others = Object.keys(aw.npc).filter((npc) => !lovers.includes(npc) && !friends.includes(npc));
  let output = `<h3>Lovers:</h3><p>`;
  for (const npc of lovers) {
    output += `<<button "${aw.npc[npc].main.name} ${aw.npc[npc].main.surname} (${aw.npc[npc].main.age})">><<set setup.selectedNPC = "${npc}">><<replace "#npceditorthing">><<include [[NpcEditor]]>><</replace>><</button>> `;
  }
  output += `</p><h3>Friends:</h3><p>`;
  for (const npc of friends) {
    output += `<<button "${aw.npc[npc].main.name} ${aw.npc[npc].main.surname} (${aw.npc[npc].main.age})">><<set setup.selectedNPC = "${npc}">><<replace "#npceditorthing">><<include [[NpcEditor]]>><</replace>><</button>> `;
  }
  output += `</p><h3>Others:</h3><p>`;
  for (const npc of others) {
    output += `<<button "${aw.npc[npc].main.name} ${aw.npc[npc].main.surname} (${aw.npc[npc].main.age})">><<set setup.selectedNPC = "${npc}">><<replace "#npceditorthing">><<include [[NpcEditor]]>><</replace>><</button>> `;
  }
  output += `</p>`;
  return output;
};

// Anenn Markup
setup.getLoversHusb = (passage) => {
  const lovers = setup.getLovers();
  let output = `<h3>Your lovers list:</h3>`;

  for (const npc of lovers) {
    output += `<<button "${aw.npc[npc].main.name} ${aw.npc[npc].main.surname}">><<set setup.loverID = "${npc}">><<replace "#choice">><<include [[${passage}]]>><</replace>><</button>>`;
  }

  return output;
};

setup.churchLaunch = function(church: string): void {
  const scene = {
    topImage: "IMG-TempleImgTop",
    allowSave: false,
    showTime: true,
    allowMenu: false,
  } as IntScenarioLaunchOptions;
  setup.time.add(60);
  switch (church) {
    case "CM":
      scene.passage = "ChurchMan";
      scene.sidebar = "<img data-passage='IMG-ChurchSide-CoM' style='width:90%;height:auto'>";
      scene.image = "IMG-CoM-Priest";
      scene.title = "Church of Man";
      ↂ.flag.churchAttend.man = true;
      ↂ.pc.status.corrupt += random(1, 2);
      ↂ.pc.status.perversion += random(2, 3);
      break;
    case "TOG":
      scene.passage = "TotOG";
      scene.sidebar = "<img data-passage='IMG-ChurchSide-TOG' style='width:90%;height:auto'>";
      scene.image = "IMG-TotOG-Priest";
      scene.title = "Temple of the Outer Gods";
      ↂ.flag.churchAttend.outer = true;
      const x = random(0, 1);
      ↂ.pc.status.bimbo += x;
      ↂ.pc.status.corrupt += random(2, 3);
      setup.status.record("bimbo", x, "Touched by the Outer Gods");
      ↂ.pc.status.perversion += random(1, 2);
      break;
    case "CHP":
      scene.passage = "ChurchCock";
      scene.sidebar = "<img data-passage='IMG-ChurchSide-CHP' style='width:90%;height:auto'>";
      scene.image = "IMG-LeilanzPort";
      scene.title = "Church of the Holy Phallus";
      ↂ.flag.churchAttend.cock = true;
      ↂ.pc.status.bimbo += 1;
      setup.status.record("bimbo", 1, "Literally worshiping cock");
      ↂ.pc.status.corrupt += random(1, 2);
      ↂ.pc.status.perversion += random(3, 5);
      break;
  }
  aw.S();
  setup.status.happy(3, "Church Service");
  setup.status.lonely(-20, "Church Service");
  setup.status.stress(-20, "Church Service");
  setup.scenario.launch(scene);
};


setup.editorCalc = function(NPC: NPC): any {
  if (typeof NPC !== "object") {
    throw new TypeError(`Parameter ${NPC} is not a readable Object!`);
  }

  if (NPC.main.female === true) {

    let femFertileCalc: number = Math.round(
      (
        Math.round( NPC.fert.egg / 2 ) + NPC.fert.implant +
        Math.round( NPC.fert.vagHostile / 2 ) +
        Math.round( NPC.fert.multEgg / 2 ) -
        NPC.fert.wombHealth
      ) / 5,
    ) - 3;

    if (femFertileCalc === 1) {
      femFertileCalc = 2;
    } else if (femFertileCalc < 1 && femFertileCalc > -2) {
      femFertileCalc = 1;
    } else if (femFertileCalc < -1) {
      femFertileCalc = 0;
    } else if (femFertileCalc > 8) {
      femFertileCalc = 8;
    }

    NPC.fert.fertility = femFertileCalc;
  }

  if (NPC.body.balls.count > 0 && NPC.body.balls.sac > 0) {
    let maleFertileCalc: number = Math.round(
      (
        (NPC.fert.quality * 2) +
        (2 * Math.round((NPC.fert.quantity / 2) *
        ((NPC.fert.ejac / 2) / 10))) + Math.round((NPC.fert.refact / 2) + NPC.fert.surv)) / 5,
      ) - 3;

    if (maleFertileCalc <= 0 || NPC.fert.quality === 0 || NPC.fert.ejac === 0 || NPC.fert.quantity === 0) {
      maleFertileCalc = 0;
    } else if (maleFertileCalc < 3) {
      maleFertileCalc = 1;
    } else if (maleFertileCalc < 5) {
      maleFertileCalc = 2;
    } else if (maleFertileCalc < 10) {
      maleFertileCalc = maleFertileCalc - 2;
    } else {
      maleFertileCalc = 8;
    }

    NPC.fert.fertility = maleFertileCalc;
  }


  aw.con.info(`setup.editorCalc (male part) tried to set fertility to ${NPC.fert.fertility}`);
};

// Cam Stuff!
setup.setCamShow = function(): any {
  // Control Variables
  ↂ.flag.camShow.dailyStream = true;
  ↂ.flag.camShow.daysAbsent += 1;

  // Random daily request
  ↂ.flag.camShow.actualRequest = random(1, 3);
  const _folowers = ↂ.flag.camShow.followers;

  if (_folowers > 0) {
    if (ↂ.flag.camShow.daysAbsent > 3) {
      ↂ.flag.camShow.popularity -= 1;
      ↂ.flag.camShow.followers -= (random(1, 3) * ↂ.flag.camShow.daysAbsent);
    } else if (ↂ.flag.camShow.daysAbsent > 6) {
      ↂ.flag.camShow.popularity -= 2;
      ↂ.flag.camShow.followers -= (random(2, 4) * ↂ.flag.camShow.daysAbsent);
    } else if (ↂ.flag.camShow.daysAbsent > 12) {
      ↂ.flag.camShow.popularity -= 3;
      ↂ.flag.camShow.followers -= (random(3, 5) * ↂ.flag.camShow.daysAbsent);
    }
  }
  if (_folowers < 0) {
    ↂ.flag.camShow.followers = 0;
  }

  if (ↂ.flag.camShow.popularity < 0) {
    ↂ.flag.camShow.popularity = 0;
  }

  if (ↂ.flag.camShow.followers < 0) {
    ↂ.flag.camShow.followers = 0;
  }
};

setup.getCamReward = function() {
  if (ↂ.flag.camShow.popularity > 100) {
    ↂ.flag.camShow.popularity = 100;
  }

  if (ↂ.flag.camShow.followers < 0) {
    ↂ.flag.camShow.followers = 0;
  }

  let _donations: number = ↂ.flag.camShow.followers * ↂ.flag.camShow.popularity;

  if (_donations > 120) {
    _donations = 120;
  }

  return _donations;
};

setup.camFlag = function(value) {
  return ↂ.flag.camShow.flags.includes(value);
};

// Surrogacy stuff!
setup.setSurrogacy = function() {
  if (ↂ.pc.status.wombA.fetus.length === 0 || ↂ.pc.status.wombA.zygote.length === 0) {
    if (!ↂ.flag.hasOwnProperty("surrogate")) {
      throw new TypeError(`Data object ${ↂ.flag} is not set correctly.`);
    }

    const asianEthnicity = ["Asian", "S Asian", "SE Asian"];
    const type = ["Normal surrogacy", "Breeding surrogacy"].random();

    let choiceCunt: number = random(0, 100);
    let baseValue: number;
    let baseChance: any;
    let randomPerson: any;

    if (type === "Normal surrogacy") {
      baseValue = random(150, 200);
      baseValue = random(0, 100);

      if (baseChance >= choiceCunt) {
        ↂ.flag.surrogate.chosen = true;
        ↂ.flag.surrogate.type = type;
        ↂ.flag.surrogate.value = baseValue;

        setup.dialog("Surrogacy Center", "Hello, this is a message sent automatically to let you know that you have been selected for a surrogacy service, you can find details by going to one of our clinical centers during business hours!<br><br> ''Go to the Surrogacy Center''");
      }
    } else {
      baseValue = random(300, 400);
      baseChance = 100;

      if (ↂ.pc.body.beauty === 1) {
        choiceCunt -= random(10, 12);
        baseValue -= random(60, 120);
      } else if (ↂ.pc.body.beauty === 4) {
        choiceCunt += random(6, 12);
        baseValue += random(40, 80);
      } else if (ↂ.pc.body.beauty === 5) {
        choiceCunt += random(10, 12);
        baseValue += random(60, 120);
      }

      if (ↂ.pc.body.race === "black") {
        choiceCunt -= random(6, 12);
        baseValue -= random(40, 80);
      }

      if (ↂ.pc.body.skinColor === "dark brown" || ↂ.pc.body.skinColor === "midnight") {
        choiceCunt -= random(6, 12);
        baseValue -= random(40, 80);
      } else if (ↂ.pc.body.skinColor === "brown") {
        choiceCunt -= random(6, 12);
        baseValue -= random(30, 60);
      }

      if (ↂ.pc.body.tits.cup === "A-cup" || ↂ.pc.body.tits.cup === "B-cup" && !asianEthnicity.includes(ↂ.pc.body.race)) {
        choiceCunt -= random(6, 12);
        baseValue -= random(30, 60);
      } else if (ↂ.pc.body.tits.cup === "D-cup" || ↂ.pc.body.tits.cup === "DD-cup" || ↂ.pc.body.tits.cup === "E-cup") {
        choiceCunt += random(6, 12);
        baseValue += random(40, 80);
      }

      if (ↂ.pc.body.hips === 1 || ↂ.pc.body.hips === 2 && !asianEthnicity.includes(ↂ.pc.body.race)) {
        choiceCunt -= random(6, 12);
        baseValue -= random(40, 80);
      } else if (ↂ.pc.body.hips === 5 || ↂ.pc.body.hips === 6) {
        choiceCunt += random(6, 12);
        baseValue += random(40, 80);
      }

      if (baseValue > 500) {
        baseValue = 500;
      }

      if (baseChance >= choiceCunt) {
        randomPerson = ["white", "black", "asian", "middle eastern", "Gaelic"].random();

        ↂ.flag.surrogate.chosen = true;
        ↂ.flag.surrogate.type = type;
        ↂ.flag.surrogate.value = baseValue;

        setup.dialog("Surrogacy Center", "Hello, this is a message sent automatically to let you know that you have been selected for a surrogacy service, you can find details by going to one of our clinical centers during business hours!<br><br> ''Go to the Surrogacy Center''");

        if (ↂ.flag.surrogate.history.bitchType === "exclusive") {
          ↂ.flag.surrogate.person = "Ethan Cohen";
        } else {
          ↂ.flag.surrogate.person = setup.surnameRandomizer(randomPerson) + " " + setup.surnameRandomizer(randomPerson);
        }
      }
    }
  }
};

// Save cache
setup.saveData = function( Object ) {
  const settingsSaveObj = JSON.stringify(Object);

  try {
    localStorage.setItem("settingObj", settingsSaveObj);
  } catch (error) {
    throw new TypeError(`Error trying to convert the ${error} object!`);
  }
};

setup.endOfAllThings = function(): void {
  let sceneOuptut = "";
  let comeOverHere = "<<f s>>uddenly your phone vibrates and you look at it. <p>@@.npc;Come here asap, the machine is ready!@@</p><p>@@.mono;Oh wow...@@</p><p>You quickly get into the car and soon enters the Lily's basement.</p><p>You enter the basement to see Lily testing some wires with a little handheld equipment. She turns to the sound. @@.pc;<<greetings>> Is it working okay?@@ She turns off the tool and stands up. @@.npc;I guess. I was just triple testing it to be sure but it seems it is 100% okay.@@ You bite your lip. @@.pc;Soo... now it can be used to turn me back, right?@@</p>";
  if (ↂ.map.loc[0] === "Lily") {
    comeOverHere = "";
  }
  // Main route calculation
  let basicWay = 1; // 1,2,3,4
  let lilyOpinion = Math.round((aw.npc.n101.rship.likePC + (aw.npc.n101.rship.lovePC * 2)) / 30); // 30-30
  if (aw.npc.n101.rship.lovers || aw.npc.n101.rship.married || aw.npc.n101.rship.engaged || aw.npc.n101.rship.dating) {
    lilyOpinion += 3;
  }
  if (setup.npc.enemies.includes("n101")) {
    lilyOpinion -= 5;
  }
  if (lilyOpinion >  8) {
    basicWay = 1; // Asking to stay female
  } else if (lilyOpinion > 5) {
    basicWay = 2; // Changing PC back
  } else if (lilyOpinion > 0) {
    basicWay = 3; // Refusal to change the PC
  } else {
    basicWay = 4; // Betrayal
  }
  // Subroutes calculations
  if (basicWay === 1) {
    if (State.active.variables.AW.startMale) {
      sceneOuptut = `Lily clears her throat. @@.npc;You see, I really like you the way you are now. Maybe, just think about it, maybe you want to stay female since we got along so good after this incident?@@<br><center><<button "Stay a female">><<run setup.gameOver("stay female")>><</button>><<tab>><<button "No, make me male again.">><<run setup.gameOver("back to male")>><</button>></center>`;
    } else {
      sceneOuptut = `Lily clears her throat. @@.npc;You see, I really like you the way you are now. Maybe, just think about it, maybe you want to stick with this personality and ID since we got along so good after this incident? I really like your new look to be honest.@@<br><center><<button "Stay in this body">><<run setup.gameOver("stay female")>><</button>><<tab>><<button "No, make me my old self again.">><<run setup.gameOver("back to female")>><</button>></center>`;
    }
  }
  if (basicWay === 2) {
    if (State.active.variables.AW.startMale) {
      sceneOuptut = `Lily nods and turns on the rejuvenator. @@.npc;Hop on, <<name>>! Time to make you a guy again!@@<br><center><<button "Get into the rejuvenator">><<run setup.gameOver("back to male")>><</button>></center>`;
    } else {
      sceneOuptut = `Lily nods and turns on the rejuvenator. @@.npc;Hop on, <<name>>! Time to turn you back to your old self! @@<br><center><<button "Get into the rejuvenator">><<run setup.gameOver("back to female")>><</button>></center>`;
    }
  }
  if (basicWay === 3) {
    sceneOuptut = `Lily shakes her head. @@.npc;Sorry, <<name>> but I don't think I will allow you to use the machine once again, not after all what happened this year. Thank you for your help but now you should go.@@<br><center><<button "Go away">><<run setup.gameOver("refused")>><</button>></center>`;
  }
  if (basicWay === 4) {
    if (State.active.variables.AW.startMale) {
      sceneOuptut = `Lily nods and turns on the rejuvenator. @@.npc;Hop on, <<name>>! Time to make you a guy again!@@<br><center><<button "Get into the rejuvenator">><<run setup.gameOver("betrayed")>><</button>></center>`;
    } else {
      sceneOuptut = `Lily nods and turns on the rejuvenator. @@.npc;Hop on, <<name>>! Time to turn you back to your old self!@@<br><center><<button "Get into the rejuvenator">><<run setup.gameOver("betrayed")>><</button>></center>`;
    }
  }
  // Scene works
  const scene = {
    passage: "none",
    content: comeOverHere + sceneOuptut,
    image: "IMG-RejuvFinalRight",
    topImage: "IMG-RejuvFinalTop",
    title: "Rejuvenator",
    allowSave: false,
    sidebar: `<h2>???</h2>`,
    showTime: false,
    allowMenu: false,
  };
  setup.scenario.launch(scene);
  aw.con.info(`Final decisions: LilyOpinion: ${lilyOpinion}, choosen ending: ${basicWay}`);
};

setup.gameOver = function(final: string): void {
  const finals = ["stay female", "back to male", "back to female", "refused", "betrayed", "challenge fail"];
  const finalsPassages = ["Final-stayFemale", "Final-backToMale", "Final-backToFemale", "Final-refused", "Final-betrayed", "Final-challengeFail"];
  let out = "";
  if (!finals.includes(final)) { // uh oh!
    out = `Something gone broken in final. We are so terribly sorry about it! Please note us about this issue!`;
  }
  if (ↂ.flag.challengeMode === "beth" || ↂ.flag.challengeMode === "mary" || ↂ.flag.challengeMode === "marge") {
    if (final === "back to male" || final === "back to female") {
      if (ↂ.pc.status.kids < 10) {
        final = "challenge fail";
      }
    }
  }
  setTimeout(() => Engine.play(finalsPassages[(finals.indexOf(final))]), 150);
};

setup.future = function(): string {
  return "Future of NPC you knew was not implemented yet.";
};

// Name Sanity
setup.nameChecker = function() {
  const invalidList: any = [];

  Object.keys(aw.npc)
    .forEach( (ID) => {
      if (!aw.npc[ID].main.name || !aw.npc[ID].main.surname || aw.npc[ID].main.name === "error") { invalidList.push( ID ); }
    });

  if (invalidList.length > 0) {
    console.log(`invalidList.length NPCs have invalid name or surnames. NPCs ID list: ${invalidList}`);
  } else {
    console.log("The NPC's names are clean!");
  }
};


// Anenn: cowgirls pregnancy ending checker
setup.cowsPregCheck = function() {
  let verifier: boolean = false;

  if (aw.npc.n1018.status.wombA.weeks >= 38) {
    State.variables.cowBirthingKey = "n1018";
    verifier = true;
  } else if (aw.npc.n1019.status.wombA.weeks >= 38) {
    State.variables.cowBirthingKey = "n1019";
    verifier = true;
  } else if (aw.npc.n1020.status.wombA.weeks >= 38) {
    State.variables.cowBirthingKey = "n1020";
    verifier = true;
  } else if (aw.npc.n1021.status.wombA.weeks >= 38) {
    State.variables.cowBirthingKey = "n1021";
    verifier = true;
  }

  return verifier;
};

setup.cashDiff = function(amt: number) {
  if (ↂ.flag.organDonor === 2) {
    return Math.round(amt * 1.5);
  } else if (ↂ.flag.organDonor === 1) {
    return amt * 2;
  }
  return amt;
};

setup.skillRandom = function() {
  // function for randomized starting skills in character creation
  const type = ↂ.flag.randomSkills;

  const sexSkills = ["exhibition", "prostitute", "sex", "sex", "oral", "oral", "oral", "seduction", "seduction"];

  const workSkills = ["comm", "comm", "org", "org", "probSolving", "finance", "clean", "clean"];

  const lifeSkills = ["art", "art", "athletic", "dancing", "shop", "cook"];

  for (let i = 0; i < 2; i++) {
    const sk = either(sexSkills);
    ↂ.skill[sk] += 5;
  }

  if (type === 1) {
    // total random
    for (let i = 0; i < 16; i++) {
      const sk = either(workSkills);
      ↂ.skill[sk] += 5;
    }
    for (let i = 0; i < 8; i++) {
      const sk = either(lifeSkills);
      ↂ.skill[sk] += 5;
    }
  } else {
    // semi-random
    // work skills
    let sk = either(workSkills);
    workSkills.delete(sk); // delete item/s to avoid repeat
    ↂ.skill[sk] += 30;
    sk = either(workSkills);
    workSkills.delete(sk);
    ↂ.skill[sk] += 20;
    sk = either(workSkills);
    workSkills.delete(sk);
    ↂ.skill[sk] += 20;
    sk = either(workSkills);
    ↂ.skill[sk] += 10;
    // life skills
    sk = either(lifeSkills);
    lifeSkills.delete(sk);
    ↂ.skill[sk] += 20;
    sk = either(lifeSkills);
    lifeSkills.delete(sk);
    ↂ.skill[sk] += 10;
    sk = either(lifeSkills);
    ↂ.skill[sk] += 10;
  }
};

setup.calcBreastWeight = function(size: number): string {
  const s = (size * 2) / 1000;
  const w = Math.floor(s * 0.94);
  const wt = Math.round((s * 0.94) * 10) - (w * 10);
  const wp = Math.round((s * 0.94) * 2.205);
  return `${w}.${wt}kg (${wp}lbs)`;
};

setup.megaCreampie = function(name: string) {
  const cData = {
    owner: name,
    vol: 0,
    qual: 20,
    surv: 10,
    quant: 30,
    amt: 250000,
    killer: true,
  };
  ↂ.pc.fert.fluid.ovary.push(new Cum(cData));
  const opt = {
    text: `The result of being bred by ${name}.`,
  };
  setup.omni.kill("Semen in Vagina");
  setup.omni.new("creamPie", opt);
  setup.condition.add({ loc: "vagFluid", amt: 25, tgt: "pc", wet: 10, type: "cum" });
  setup.condition.add({ loc: "genitals", amt: 25, tgt: "pc", wet: 10, type: "cum" });
  setup.drug.eatDrug("cream", 30);
  setup.drug.eatDrug("cum", 10);
};
