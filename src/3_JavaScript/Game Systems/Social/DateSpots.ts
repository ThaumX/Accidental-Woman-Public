
//  8888888b.           888
//  888  "Y88b          888
//  888    888          888
//  888    888  8888b.  888888 .d88b.
//  888    888     "88b 888   d8P  Y8b
//  888    888 .d888888 888   88888888
//  888  .d88P 888  888 Y88b. Y8b.
//  8888888P"  "Y888888  "Y888 "Y8888
//
//
//   .d8888b.                    888
//  d88P  Y88b                   888
//  Y88b.                        888
//   "Y888b.   88888b.   .d88b.  888888 .d8888b
//      "Y88b. 888 "88b d88""88b 888    88K
//        "888 888  888 888  888 888    "Y8888b.
//  Y88b  d88P 888 d88P Y88..88P Y88b.       X88
//   "Y8888P"  88888P"   "Y88P"   "Y888  88888P'
//             888
//             888
//             888


interface AWdateSpots {
  [propName: string]: DateSpot;
}

aw.dateSpots = {};

/*
  NOTE ON IntDateSpotEvent & IntDateSpotActivity
  the check and prep values can be declared below as a string "function(){blyat; return true;}"
  OR as a proper function. We may convert them all to strings later for performance reasons, but for
  linting purposes going with a standard function is likely best to avoid bestisms.
*/

interface IntDateSpotEvent {
  key: string;  // identifier for event. Used to build date flags, so must be unique w/ activities too.
  check: () => boolean; // function checks to see if event can happen.
  twee: string; // text to display in date scenario, full twee to describe events and make choices if needed.
                // use a passage with name "DSP-passageName" to load a normal passage instead.
  prep: () => boolean; // bonus function to do things w/ js when event is played, performed BEFORE the twee is ran.
  gate: string[];
}

interface IntDateSpotActivity {
  key: string; // identifier for event. must be unique with events too!
  label: string; // label for button text <<button [label]>><<tomfuckery>><</button>>
  info: string; // brief hover text for the button "go and play the WEE GIRL arcade game together."
  twee: string; // twee used to display the result of the action, full twee. use "DSP-passageName" to load
                // a passage instead.
  check: () => boolean; // check function to see activity is valid.
  prep: () => boolean; // bonus function to do things before the event text is played.
  gate: string[];
  ai: string[]; // AI keys for the activity to determine approval.
  repeatable?: boolean; // whether activity can be repeated more than once. defaults to false (no repeat)
}

interface DateSpotData {
  key: string; // obvious... however, items are sorted alphabetically by this key, so be representative.
  name: string; // proper name of the location
  check?: () => boolean; // check to see if the location is available, used for excluding things based on time or other conditions.
  shortDesc: string; // short description used for choosing a date spot
  loc: string|boolean[]; // standard map.loc array ex: ["downtown", "east"]
  topImg: string; // banner image depicting the view at the location, similar to map location images
  img: string; // image used in date spot choosing for the print() method
  desc: string; // description of the location suitable for inclusion in the location info as well as the main text.
  arrivalText: string; // twee, arrival text describes your arrival at the location, and is the opening text for the date spot can use a passage that starts with DSP as well.
  departText: string; // text describing your departure, can be twee, not as prominent as arrival.
  category: string; // category the location fits into. "restaurant" "dessert" "activity" "other"
  quality: number; // the quality of the location. is it more cheap/slummy or high class. 1 to 5. 1 is low quality, like fast food. 5 is an elegant restaurant. quality does not necessarily correspond to being a good place, more like fanciness.
  events: IntDateSpotEvent[]; // array of events, which will be turned into an object when initialized.
  activities: IntDateSpotActivity[]; // array of activities, which will be turned into an object as well
  aiTags: string[][]; // initial array in the array is used for the location itself, 'fancy' 'crowded' etc. others are optional if used for certain events/activities.
  type: string; // used to know if it is a real date spot or just an activity in the home\bfhouse based date. So "normal", "yourhome" or "bfhome"
}

class DateSpot {
  public key: string;
  public name: string;
  public check: () => boolean;
  public shortDesc: string;
  public loc: mapLocArray;
  public topImg: string;
  public img: string;
  public desc: string;
  public arrivalText: string;
  public departText: string;
  public category: string;
  public quality: number;
  public events: {
    [propname: string]: IntDateSpotEvent;
  };
  public activities: {
    [propname: string]: IntDateSpotActivity;
  };
  public aiTags: string[][];
  public type: string;
  constructor({
    key,
    name,
    check,
    shortDesc,
    loc,
    topImg,
    img,
    desc,
    arrivalText,
    departText,
    category,
    quality,
    events,
    activities,
    aiTags,
    type,
  }: DateSpotData) {
    this.key = key;
    this.name = name;
    this.shortDesc = shortDesc;
    this.loc = clone(loc);
    this.topImg = topImg;
    this.img = img;
    this.desc = desc;
    this.arrivalText = arrivalText;
    this.departText = departText;
    this.category = category;
    this.quality = quality;
    this.events = {};
    if (check == null) {
      this.check = function() {
        return true;
      };
    } else {
      this.check = check;
    }
    for (const event of events) {
      this.events[event.key] = {
        key: event.key,
        twee: event.twee,
        check: (typeof event.check === "string") ? eval(event.check) : event.check,
        prep: (typeof event.prep === "string") ? eval(event.prep) : event.prep,
        gate: clone(event.gate),
      };
    }
    this.activities = {};
    for (const acti of activities) {
      this.activities[acti.key] = {
        key: acti.key,
        twee: acti.twee,
        label: acti.label,
        info: acti.info,
        check: (typeof acti.check === "string") ? eval(acti.check) : acti.check,
        prep: (typeof acti.prep === "string") ? eval(acti.prep) : acti.prep,
        gate: clone(acti.gate),
        ai: clone(acti.ai),
        repeatable: (acti.repeatable == null) ? false : true,
      };
    }
    this.aiTags = clone(aiTags);
    this.type = type;
  }
  public get print(): string {
    return `<div id="date-spot-print" onclick="window.SugarCube.Engine.link(&quot;date.sel('${this.key}')&quot;)"><img data-passage="${this.img}"><b>${this.name}</b><br>${this.shortDesc} <span class="yellow">${setup.stars(this.quality)}</span></div>`;
  }
  public setFlags(): void {
    aw.date.flag[this.key] = {};
    const keys = Object.keys(this.activities);
    keys.concat(Object.keys(this.events));
    for (const key of keys) {
      aw.date.flag[this.key][key] = false;
    }
  }
  public arrive(): void {
    this.setFlags();
    aw.replace("#Scene-Title", this.name);
    aw.replace("#Scene-Image-Top", `<img data-passage="${this.topImg}">`);
    aw.date.spots.push(this.key);
    aw.date.spot = this.key;
    if (this.category === "restaurant") {
      aw.date.ate = true;
    } else if (this.category === "dessert") {
      aw.date.dessert = true;
    }
    setup.map.nav(...this.loc);
    // TODO adjust date quality
    let output = (this.arrivalText.slice(0, 3) === "DSP") ? `<<include [[${this.arrivalText}]]>>` : this.arrivalText;
    try {
      let tag = setup.cTag.getTag(3, false);
      let cunter = 0;
      while (tag !== "none" && aw.date.convoHist.includes(tag)) {
        tag = setup.cTag.getTag(3, false);
        cunter++;
        if (cunter > 5) {
          tag = "none";
          break;
        }
      }
      aw.date.convoTag = tag;
      if (aw.date.spot !== "stocks" && aw.date.spot !== "stocks2") {
        aw.date.convoText = setup.date.tagText(aw.date.convoTag, aw.date.name);
        output += `<p>${aw.date.convoText}</p>`;
      }
    } catch (e) {
      aw.con.warn(`Error with convotag content retrieval somewhere... ${e.name}: ${e.message}`);
    }
    // ============== event injection
    const ev = this.eventCheck();
    if (ev !== "none") {
      if (this.events[ev].twee.slice(0, 3) === "DSP") {
        output += `<div id="spotEvent"><<include [[${this.events[ev].twee}]]>></div>`;
      } else {
        output += `<div id="spotEvent">${this.events[ev].twee}</div>`;
      }
      try {
        this.events[ev].prep();
      } catch (e) {
        aw.con.warn(`Date Spot Event Prep() Error:\nDate Spot: ${this.key}, event: ${ev}\n${e.name}: ${e.message}`);
      }
    }
    aw.con.info(`Arrived at date spot ${this.name}.`);
    // ============== add fadein loader and container div for async AI
    output += `<div id="continueDiv"><center><<fadein "2s" "1s">><img data-passage="IMG-InfinityLoading" style="border-radius:30px;height: 50px; width: auto;"><</fadein>></center></div>`;
    // update the player's status
    const lon = random(5, 12) * -1;
    setup.status.lonely(lon, "Interacting with a presumed human on your date");
    if (aw.date.enjoy[0] > 35 && aw.date.arouse > 34) {
      setup.status.arousal(1);
      const hap = Math.max(0, (random(1, 3) - 2));
      if (hap > 0) {
        setup.status.happy(hap, "Enjoying the date spot");
      }
    } else if (aw.date.enjoy[0] < 35 || aw.date.enjoy[1] < 35) {
      setup.status.happy(-1, "Disliking the date spot");
    }
    const butts = this.buttonGen();
    // output the arrival text
    setup.scenario.replace(output);
    // run NPC/date status update asynchronously
    setTimeout(update, minDomActionDelay);
    function update() {
      // get NPC's opinion on the location!
      let opinion;
      try {
        opinion = (setup.date.aiQuery(this.ai[0], `Date Spot Location Opinion Query - ${this.name} - ${aw.date.name}`) - 0.5) * 2;
      } catch (e) {
        aw.con.info(`AI opinion system failed in date w/ ${e.name}: ${e.message}`);
        opinion = 0.5;
      }
      // date quality
      let qq = 0;
      for (let i = 0; i < this.quality; i++) {
        qq += random(1, 3) + random(0, 1);
      }
      if (aw.date.npcPicked) {
        aw.date.qual += qq - 4;
      } else {
        aw.date.qual += Math.round(qq * opinion);
      }
      // date enjoyment & arousal
      aw.date.enjoy[0] += (random(0, 3) - 1);
      if (aw.date.npcPicked) {
        aw.date.enjoy[1] += (random(1, 7) - 1);
        aw.date.arouse += (random(1, 3) + random(0, 2));
      } else {
        aw.date.enjoy[1] += Math.round(random(5, 6) * opinion);
        if (opinion > 0) {
          aw.date.arouse += Math.round(5 * opinion) + random(0, 2);
        } else if (opinion < -0.3) {
          aw.date.arouse -= random(8, 13);
        } else {
          aw.date.arouse -= random(1, 4) + random(1, 2);
        }
      }
      // arousal based on date progress rather than specific location
      if (aw.date.enjoy[1] > 49 && aw.date.qual > 40) {
        aw.date.arouse += random(2, 4);
      } else if (aw.date.enjoy[1] > 49) {
        aw.date.arouse += random(1, 3);
      }
      // see if date has a proposal first, and add buttons
      if (!aw.date.npc.record.flag.openRship && setup.isSuspicious(aw.date.npcid)) {
        aw.replace("#continueDiv", `<p>@@.npc;Actually, I have something I need to talk to you about.@@</p><center><<button "CONTINUE">><<scenego "DateAccusesPlayer">><</button>></center>`);
      } else if (aw.date.askIt && random(1, 3) === 3) {
        aw.replace("#continueDiv", setup.date.propose(this.key));
      } else {
        aw.replace("#continueDiv", butts);
      }
      aw.date.npcPicked = false;
      setup.date.statRefresh(); // update stats area with new info
    }
  }
  public allowedActs(): string[] {
    const keyo: string[] = [];
    const keys = Object.keys(this.activities);
    for (let i = 0, c = keys.length; i < c; i++) {
      const ᚥ = this.activities[keys[i]];
      if (!aw.date.flag[this.key][ᚥ.key] || ᚥ.repeatable) {
        if (!setup.gate(ᚥ.gate) && ᚥ.check()) {
          keyo.push(ᚥ.key);
        }
      }
    }
    return keyo;
  }
  public buttonGen(): string {
    let output = `<center><h3>Activity Choices</h3><div id="dateSpotActivityButtons"><<hovrev cuckold>><<button "FOLLOW ${aw.date.name.toUpperCase()}">><<run setup.date.activity("${aw.date.npcid}")>><</button>><</hovrev>>`;
    let desc = `<div id="dateSpotActivityButtHover"><<hovins cuckold>>Let ${aw.date.name} decide what to do.<</hovins>>`;
    const keys = Object.keys(this.activities);
    for (let i = 0, c = keys.length; i < c; i++) {
      const ᚥ = this.activities[keys[i]];
      if (!aw.date.flag[this.key][ᚥ.key] || ᚥ.repeatable) {
        if (!setup.gate(ᚥ.gate) && ᚥ.check()) {
          output += `<<hovrev ${ᚥ.key}>><<button "${ᚥ.label.toUpperCase()}">><<run setup.date.activity("${ᚥ.key}")>><</button>><</hovrev>>`;
          desc += `<<hovins ${ᚥ.key}>>${ᚥ.info}<</hovins>>`;
        }
      }
    }
    output += `<<hovrev complement>><<button "COMPLEMENT">><<run setup.date.saySomething("comp")>><</button>><</hovrev>><<hovrev sexy>><<button "SEXY">><<run setup.date.saySomething("sexy")>><</button>><</hovrev>><<hovrev rom>><<button "ROMANTIC">><<run setup.date.saySomething("rom")>><</button>><</hovrev>><<hovrev deep>><<button "DEEP">><<run setup.date.saySomething("deep")>><</button>><</hovrev>><<hovrev prop>><<button "SERIOUS">><<scenego "DateSpotSerious">><</button>><</hovrev>><<if aw.date.arouse > 40 || aw.date.enjoy[1] > 40>><<hovrev kiss>><<button "KISS">><<scenego "DateSpotKiss">><</button>><</hovrev>><<else>><<hovrev kiss>>@@.disabled;<<button "KISS">><</button>>@@<</hovrev>><</if>>`;
    desc += `<<hovins complement>>Compliment your date.<</hovins>><<hovins sexy>>Say something sexy.<</hovins>><<hovins rom>>Say something romantic.<</hovins>><<hovins deep>>Say something deep (or try to).<</hovins>><<hovins prop>>It's time for a serious subject, such as progressing your relationship or breaking up.<</hovins>><<hovins kiss>>Kiss <<= aw.date.name>><</hovins>>`;
    if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
      output += `<<hovrev leavewhyf>><<button "CHANGE">><<scenego "DateLeaveDatespotHome">><</button>><</hovrev>>`;
      desc += `<<hovins leavewhyf>>Start doing something else.<</hovins>>`;
    } else {
      output += `<<hovrev leavewhyf>><<button "LEAVE">><<scenego "DateLeaveDatespot">><</button>><</hovrev>>`;
      desc += `<<hovins leavewhyf>>Leave this date spot and go to another, or end the date.<</hovins>>`;
    }
    output += "</div>";
    output += desc + "</div></center>";
    return output;
  }
  public eventCheck(): string {
    let out = "none";
    const keys: string[] = [];
    for (const event of Object.keys(this.events)) {
      if (!aw.date.flag[this.key][event]) {
        if (!setup.gate(this.events[event].gate) && this.events[event].check()) {
          keys.push(event);
        }
      }
    }
    if (keys.length > 0) {
      out = either(...keys);
    }
    return out;
  }
}


(function() {
  const spots = [
    {
      key: "hindenburger",
      name: "Hinden Burger",
      shortDesc: "Bar and grill place",
      loc: ["downtown", "west", false],
      topImg: "IMG-Hinden-Burger-Inside",
      img: "IMG-HindenBurger",
      desc: "The place is decorated in the old German brauhouse style, heavy wooden tables and fachwerk walls make you feel like in some kind of cozy dungeon. Some upbeat march music plays quietly but it doesn't interrupt your chat.",
      arrivalText: "You arrive at the place and find a free table. The menu is already there.",
      departText: "You split the check and leave the place.",
      category: "restaurant",
      quality: 3,
      events: [],
      activities: [
        {
          key: "hindenburgerDinner",
          label: "Order food",
          info: "Make a choice and order some burger or grill.",
          twee: `The waitress dressed in oktoberfest-styled garments approaches your stall to take your order. You decide to order some <<print either("Kaiser burger", "Blitzkrieg burger", "Bratwurst", "Special bacon Hindenburger", "Potato salad")>> and <<= aw.date.name>> goes for <<print either("Red Baron hotdog", "Pork ribs with K98 sauce", "Kriegssteak", "the same dish")>>. <<print either("After some waiting", "Almost immediately")>> waitress brings your plates and three cups of different mustard. <<has cl>>You prefer to keep silent while eating having troubles with coming up with appropriate theme of conversation and just enjoying the company<<or>>You start a small talk discussing <<print either("recent news", "upcoming movies", "<<= aw.date.name>>'s life last days")>>.<</has>>The food <<print either("is delicious", "is pretty mediocre", "tastes odd", "tastes awful")>>. After <<print either("finishing the dish", "eating the half", "giving up on the dish after some struggling.")>> you feel that you had enough.<<addtime 48>>`,
          check() {
              return true;
          },
          prep() {
            State.active.variables.luterusDinner = false;
            aw.cash(random(-15, -30), "food");
            setup.food.eat(30, "junk");
            aw.date.enjoy[1] += random(3, 7);
            aw.date.qual += random(7, 12);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "hindenburgerBeer",
          label: "Order beer",
          info: "Decide what beer you want.",
          twee: `<span id="buylink">@@.pc;<<= aw.date.name>>, some beer maybe?@@<<if ↂ.pc.status.alcohol < 6>><br><br>@@.npc;Of course, I would like it!@@<br><br><<else>><br><br>@@.npc;Are you sure you hadn't got enough already?@@<br><br>@@.pc;Just one more glass!@@<br><br><</if>>Calling the waitress you ask her for a beer card. <<= aw.date.name>> gets a glass first and you look at the menu trying to get what beer <<link "you actually want.">><<dialog "Hinden Burger Beer">><<print setup.food.bar("hindenburger")>><</dialog>><<replace "#buylink">><<addtime 18>>Waitress brings your glasses full of beer. You clink your glasses and smile, the beer <<print either("tastes very good", "is pretty nice")>>.<br><br>@@.pc;Cheers!@@<br><br>@@.npc;He-he, cheers!@@<br><br>As you sip from your glass you feel warmth spreading through your body and making you more talkative than usual. You decide to ask <<= aw.date.name>> something.<<print setup.storythread.getStory(aw.date.npcid)>><</replace>><</link>></span>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(4, 9);
            aw.date.qual += random(4, 6);
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
        {
          key: "hindenburgerDarts",
          label: "Play darts",
          info: "Ask <<= aw.date.name>> for a game.",
          twee: `<<happy 1 "Pub games are fun">><p><<print either("@@.pc;Hey, wanna play darts?@@","@@.pc;Let's play, they have darts here!@@")>></p><<set _darts = random(0,1)>><<if _darts === 0>><p><<print either("@@.npc;Ugh... I am not a great player you know?@@","@@.npc;Hm... you sure?@@")>></p><p><<print either("@@.pc;Come on, it will be fun!@@","@@.pc;Don't pussy out, it is really fun!@@")>></p><p>@@.npc;Oh, okay, let's give it a shot if you insist, hah.@@</p><<else>><p><<print either("@@.pc;Oh, cool, let's do it!@@","@@.pc;Sure thing!@@")>></p><</if>>You go to the dartboard on the wall and start the game. <p><<print either("You go first and throw the dart.","<<= aw.date.name>> takes first turn and throws the dart.")>> <<set _darts2 = random(0,1)>><<if _darts2 === 0>>To your surprise it lands on the right spot at the dartboard.<<else>>The dart sticks into the wall and you giggle.<</if>></p><p><<print either("@@.pc;Ha-ha, well it seems it starts just as planned!@@","@@.pc;Well it was pretty expected, huh?@@")>></p><p><<print either("The game goes for about ten minutes until","It takes not much time until", "After a couple of turns it seems you go pretty close until")>> <<print either("<<= aw.date.name>> starts winning and ends the game.","you win.")>> <<print either("You both laugh at the poor wall that got some new holes in it and return to your seats","After a little celebration that included dancing around and singing 'In your face!' you and <<= aw.date.name>> return to your seats.")>></p><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(8, 11);
            aw.date.qual += random(4, 6);
            return true;
          },
          gate: [],
          ai: [],
          repeatable: false,
        },
        {
          key: "hindenburgerTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<has op>>You start a convo, asking <<= aw.date.name>> about their life.<<or>><<= aw.date.name>> starts a conversation and you happily catch to the topic.<</has>><<print setup.storythread.getStory(aw.date.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(1, 4);
            aw.date.qual += random(0, 3);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "casual", "eat"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "starsucks",
      name: "Starsucks",
      shortDesc: "Popular coffee shop",
      loc: ["downtown", "southeast", false],
      topImg: "IMG-Starsucks-Inside",
      img: "IMG-Restaurant-Starsucks",
      desc: "While Starsucks Coffee has been around for ages, it's only recently that they've started promoting the use of natural breast milk in their coffee-flavored beverages. The classic circular brand logo remains, but is now surrounded by a drop of fresh milk.",
      arrivalText: "You enter the coffee shop. The place is crowded by youngsters but after some search you find a free table.",
      departText: "You split the check and leave the place.",
      category: "dessert",
      quality: 3,
      events: [],
      activities: [
        {
          key: "starsucks",
          label: "Coffee",
          info: "Order some coffee or maybe even tea.",
          twee: `<p><<addtime 27>>You come to the counter to see what's on the menu. <<= aw.date.name>> frowns trying to come up with the perfect drink for this part of the day too so you go first attracting the attention of the barista by polite @@.pc;Sorry, miss?@@ The girl turns to you with a annoyed face and points to her badge which says "Hello! my name is Stevenanessa (pref. pronounce: they) Thank you for not misgendering me!" @@.npc;Have you choose already?@@ @@.pc;Oh. Sorry. So, can I have a <<= either("Latte", "Fappacino", "Machiato", "Spermiatto")>> with <<= either("strawberry", "raspberry", "semen")>> topping?@@ @@.npc;Yeah. Your name?@@ @@.pc;<<= ↂ.pc.main.name>>.@@ @@.npc;It will be ready in a minute...@@ It seems the cashier is not in the best mood because you can swear that they added something like @@.npc;...fucking zoomer.@@ turning to the coffee machine. <<= aw.date.name>> makes the choice too and you wait for some time until your orders are ready. The scribbles written on your cup have nothing in common with your first name but you just shrug returning at your table. @@.pc;What is wrong with that barista? She mumbled something about zoomers.@@ @@.npc;Meh, don't pay much attention, we all are zoomers for them. I guess our parents had the same shit with our generation.@@</p><p>The coffee is rather good though and you continue to chat on different topics. <<print setup.storythread.getStory(aw.date.npcid)>></p>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-7, -14), "food");
            aw.date.enjoy[1] += random(3, 7);
            aw.date.qual += random(7, 12);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "casual", "eat"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "foodcourt",
      name: "Food court",
      shortDesc: "The foodcourt area in Applewood mall.",
      loc: ["downtown", "mall", "foodcourt"],
      topImg: "IMG-Foodcourt-Inside",
      img: "IMG_Applewood-Mall",
      desc: `The spacious area have a lot variety of fastfood places with some lines before most of them.`,
      arrivalText: `Currently <<print either("most tables are empty and you take one.", "most tables are occupied and it takes some time to find a free one for you.")>>`,
      departText: "You take your belongings and leave the place.",
      category: "restaurant",
      quality: 1,
      events: [],
      activities: [
        {
          key: "foodcourtEat",
          label: "Order food somewhere",
          info: "Make a choice and buy something in one of the fastfoods.",
          twee: `@@.npc;So, where are you going to order?@@<br><br>@@.pc;Hmmmm... let me think...@@<br><br>You consider your choices for a minute staring on the signs above the places.<br><br>@@.pc;I think I want to take something from <<print either("McDongald's", "Burger Tsar", "Genghis Mons", "Sbarfo", "Taco Hell", "Milkme", "Teat Treats", "Starsucks ")>>!@@<br><br>@@.npc;<<print either("Okies, I think I will take my stuff there too.", "Eew, no, thanks. Not my choice. Let's meet at the table in a couple of minutes, I have not decided yet myself.")>>@@<br><br>After getting your stuff you both start chewing in silence too concentrated on food to talk. The food <<print either("is delicious", "is pretty mediocre", "tastes odd", "tastes awful")>>. After <<print either("finishing", "eating the half", "giving up on it after some struggling.")>> you feel that you had enough.<<addtime 38>>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-5, -8), "food");
            setup.food.eat(35, "junk");
            aw.date.enjoy[1] += random(1, 4);
            aw.date.qual += random(2, 4);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "foodcourtTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<has op>>You start a convo, asking <<= aw.date.name>> about their life.<<or>><<= aw.date.name>> starts a conversation and you happily catch to the topic.<</has>><<print setup.storythread.getStory(aw.date.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(1, 4);
            aw.date.qual += random(0, 3);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "foodcourtTouch",
          label: "Touch",
          info: "Touch <<= aw.date.name>> under the table with your leg.",
          twee: `<p><<print either("Taking off one shoe you extend your leg to touch <<= aw.date.name>>'s crotch under the table.","Trying to stay as discreet as possible you remove your shoe and put your feet between <<= aw.date.name>>'s legs and rise it until it meets with your date's crotch.")>> <<if aw.date.npc.main.male>>You can feel <<= aw.date.name>>'s cock getting stiffier and smile innocently.<<else>>You can massage <<= aw.date.name>>'s pussy with your bare feet and smile innocently.<</if>></p><p><<print either("@@.pc;So... what have we talked about?@@","@@.pc;So, are you <i>hungry</i>?@@")>></p><p><<print either("@@.pc;Mmm... well...I am... oh.@@","<<= aw.date.name>>'s bites lips trying to focus.")>></p><<addtime 2>>`,
          check() {
              if (ↂ.pc.kink.shame) {
                return false;
              } else {
                return true;
              }
          },
          prep() {
            aw.date.arouse += random(7, 11);
            aw.date.enjoy[1] += random(3, 7);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "crowd", "crude", "eat"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "luterus",
      name: "Remplir L'Uterus",
      shortDesc: "A fancy french restaurant.",
      loc: ["downtown", "southeast", false],
      topImg: "IMG-Restaurant-Remplir-Luterus-Inside",
      img: "IMG-Restaurant-Remplir-Luterus",
      desc: "The whole place is shining with barocco-like luxury. There are not so many tables in the main hall but it seems that prices can compensate it for the owners easily.",
      arrivalText: "You arrive at the place. Hostess leads you two to the table in a nice quiet corner near the window. The waitress is there in no time bringing the menus and leaving you to decide about your choice.",
      departText: "You split the check and leave the place.",
      category: "restaurant",
      quality: 5,
      events: [
        {
          key: "luterusOrchestra",
          check() {
            if (/*random(0, 3) === 3*/ true) {
              return true;
            } else {
              return false;
            }
          },
          label: "Music",
          twee: `<<dialog "Musci">>As you get to the place you see that today there is a band playing for the clients in the corner of the restaraunt. The conterporary jazz sounds pretty pleasant and adds to the mood.<</dialog>>`,
          prep() {
            aw.date.enjoy[1] += random(5, 6);
            aw.date.qual += random(12, 20);
            aw.S();
            return true;
          },
          gate: [],
        },
      ],
      activities: [
        {
          key: "luterusDinner",
          label: "Order food",
          info: "Make a choice and order some ridiculously expensive food.",
          twee: `You decide to order some <<print either("baked bear paws with tomato sauce", "prairy oysters", "préservatif soupe", "frog legs", "cuisses de salope")>> and <<= aw.date.name>> goes for <<print either("cornée truie", "taureau bite", "foie gras", "same dish")>>. After a while the waitress brings your food, which is decorated so heavily it looks more like a piece of art than actual food. You both try to figure out the best way to eat your dish using the wide range of forks and spoons provided on the both sides of your plates. <<if ↂ.pc.trait.intro>>You feel a bit anxious about lacking skills of high cuisine consuming so keep silent most of the time.<<else>>You manage to make some funny joke about the shape of one really weird spoon and pretty sure that the date is going pretty well so far.<</if>> The food <<print either("is delicious", "is pretty mediocre for such price", "tastes odd and foreign to you", "tastes awful")>>. After <<print either("finishing the dish", "eating the half", "giving up on the dish after some struggling.")>> you feel that at least that part of the dating is pretty much done.<<set $luterusDinner = true>><<addtime 48>>`,
          check() {
            if (State.active.variables.luterusDinner === false || State.active.variables.luterusDinner == null) {
              return true;
            } else {
              return false;
            }
          },
          prep() {
            State.active.variables.luterusDinner = false;
            aw.cash(random(-20, -45), "food");
            setup.food.eat(35, "normal");
            aw.date.enjoy[1] += random(3, 7);
            aw.date.qual += random(10, 15);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "luterusWine",
          label: "Order wine",
          info: "Decide what wine you want to order.",
          twee: `You spend some time browsing trough the wine card together. <<if ↂ.pc.trait.crude == -1>>You know things about wine and explain the differences between various types and tastes for some time before proposing some good <<print either("chianti", "prosecco", "sauvignon")>>.<<= aw.date.name>> agrees overwhelmed by your knowledge and commpetence.<<else>>You have no idea what is the difference between most of the options and just stick to the cheapest <<print either("white wine", "red wine", "rose wine", "champagne")>> you can find in the card.<</if>> After the waitress brings and opens the bottle you clink glasses and savor the wine. It <<print either("tastes surprisingly good", "tastes pretty much the way you expected", "tastes odd and you are not sure if you like it or not")>>. After the third glass you start feeling a bit dizzy<<if ↂ.pc.trait.intro>> and feel that it got much easier for you to talk and joke freely<</if>><<addtime 24>>.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-15, -40), "food");
            aw.date.enjoy[1] += random(4, 9);
            aw.date.qual += random(12, 15);
            setup.food.drink("priceyWine");
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
        {
          key: "luterusTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<if ↂ.pc.trait.intro>>You struggle with starting a proper conversation trying your best to find a topic to talk about. To your relief, <<= aw.date.name>> break the silence before it gets too awkward.<<else>>You feel pretty comfortable starting a chat with <<= aw.date.name>> and discuss things.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(2, 5);
            aw.date.qual += random(6, 9);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "luterusTouch",
          label: "Touch",
          info: "Touch <<= aw.date.name>> under the table with your leg.",
          twee: `<p><<print either("Taking off one shoe you extend your leg to touch <<= aw.date.name>>'s crotch under the table.","Trying to stay as discreet as possible you remove your shoe and put your feet between <<= aw.date.name>>'s legs and rise it until it meets with your date's crotch.")>> <<if aw.date.npc.main.male>>You can feel <<= aw.date.name>>'s cock getting stiffier and smile innocently.<<else>>You can massage <<= aw.date.name>>'s pussy with your bare feet and smile innocently.<</if>></p><p><<print either("@@.pc;So... what have we talked about?@@","@@.pc;So, are you <i>hungry</i>?@@")>></p><p><<print either("@@.pc;Mmm... well...I am... oh.@@","<<= aw.date.name>>'s bites lips trying to focus.")>></p><<addtime 2>>`,
          check() {
              if (ↂ.pc.kink.shame) {
                return false;
              } else {
                return true;
              }
          },
          prep() {
            aw.date.arouse += random(7, 11);
            aw.date.enjoy[1] += random(3, 7);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate", "fancy", "eat"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "olddongho",
      name: "Old Dong Ho",
      shortDesc: "Local seafood place.",
      loc: ["downtown", "northeast", false],
      topImg: "IMG-Restaurant-OldDongHo-Inside",
      img: "IMG-Restaurant-OldDongHo",
      desc: `Seafood and wok restaurant is dark and noisy. Prices on the chalkboard menu above the bar looks pretty cheap and the big sign says "We guarantee good quality! No quality complains for more than 10 years!"`,
      arrivalText: "You arrive at the place and take a seat at the small table in dark crowded restaurant. It takes some time until you realise that there are no waiters and you need to make order yourself at the bar.",
      departText: "You leave the place.",
      category: "restaurant",
      quality: 2,
      events: [
        {
          key: "olddonghoFight",
          check() {
            if (random(0, 3) === 3) {
              return true;
            } else {
              return false;
            }
          },
          label: "Argumenting",
          twee: "Entering the place you see some well dressed drunk men arguing loudly in some asian language. You do your best to ignore them but after some time they start a fight knocking their table and it takes more than a minute before fat owner finally get them stop the nonsense and leave the place. It looks like the accident toned down <<= aw.date.name>>'s mood.",
          prep() {
            aw.date.enjoy[1] += random(-3, -5);
            aw.date.qual += random(-8, -18);
            return true;
          },
          gate: [],
        },
        {
          key: "olddonghoBesty",
          check() {
            if (random(0, 8) === 8) {
              return true;
            } else {
              return false;
            }
          },
          label: "Old Dong Ho",
          twee: "While <<= aw.date.name>> discussing about what to order you mindlessly observe the room catching the atmosphere of the place. <<if ↂ.pc.trait.perceptive == 1>>For some reason some people on nearby table gather your attention. Buffy guy dressed in sportwear discussing something with two well-dressed chinese who look a bit not usual but it is hard to say what is wrong with them. Through the noisy chatter you hear some of the words they say.<br><br>@@.npc;...will deliver... every thursday...on the place...@@<br><br>@@.npc;...need no... unnecessary...mr. Bestiarus...at night...don't...the lights...@@<br><br>@@.mono;I wonder what are they talking about? Those guys looks odd.@@<br><br><<else>>There are a lot of people of various appearance and you are surprised how popular this place is.<</if>><br><br>@@.npc;Hey, <<= ↂ.pc.main.name>> will you make an order?@@<br><br>@@.npc;Oh, sorry, I just got distracted for a bit@@",
          prep() {
            return true;
          },
          gate: [],
        },
      ],
      activities: [
        {
          key: "olddonghoDinner",
          label: "Order food",
          info: "Go to bar and order something.",
          twee: `Not sure what is the best choice you stick to some noodles with <<print either("prawns", "something slimy", "various seafood", "some green seaweeds", "odd looking tentacles, Old Dong special")>>. <<= aw.date.name>> decides to take <<print either("sour-sweet pork ribs", "prawn salad", "seafood plate", "same dish")>>. After some wait chief rings the small bell and you get your food.The food <<print either("is pretty good", "is not that tasty", "is odd and foreign for your tastes", "tastes awful")>>. <<if !ↂ.pc.trait.intro>>You have a good laugh showing <<= aw.date.name>> most odd seafood parts you have found in your noodle box while eating it.<</if>> After <<print either("finishing your box", "eating the half", "digging into it with food sticks")>> you feel that at least that part of the dating is pretty much done.<<set $olddonghoDinner = true>><<addtime 27>>`,
          check() {
            if (State.active.variables.olddonghoDinner === false || State.active.variables.olddonghoDinner == null) {
              return true;
            } else {
              return false;
            }
          },
          prep() {
            State.active.variables.olddonghoDinner = false;
            setup.food.eat(35, "junk");
            aw.cash(random(-6, -9), "food");
            aw.date.enjoy[1] += random(2, 7);
            aw.date.qual -= random(1, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "olddonghoBeer",
          label: "Beer",
          info: "Go to the bar to get some beer",
          twee: `You find that the place have only one beer, "Spirit of Wisconsin" which is pretty weird for a chinese place. Getting two bottles you return to <<= aw.date.name>>. <<if ↂ.pc.trait.crude == -1>>The beer tastes terrible.<br><br>@@.mono;Why we ever came to this terrible place?@@<br><br><<elseif ↂ.pc.trait.crude == 1>>The beer is right in your taste - cheap and hits right in the head.<<else>>You are pretty sure that you have tried better beer in your life than this one.<</if>><<addtime 18>>.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(-4, "food");
            aw.date.enjoy[1] += random(4, 7);
            aw.date.qual -= random(1, 6);
            setup.food.drink("beer");
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
        {
          key: "olddonghoTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `The crowded place is really too loud for any coherent talkings and after some attempts to hear each other you finally give up.<br><br>@@.npc;I say, <<print either("where have you been? I mean abroad?", "what is your favorite movie?", "where are you from?")>>@@<br><br>@@.pc;What? I can't hear you!@@<br><br>@@.mono;If I want to hear a thing we need to get outta here.@@<<addtime 7>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(2, 5);
            aw.date.qual -= random(0, 4);
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "crude", "sloppy", "eat"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "happyCream",
      name: "Happy Cream",
      shortDesc: "Local cafe specialising on doughnuts.",
      loc: ["downtown", "southeast", false],
      topImg: "IMG-HappyCream-Inside",
      img: "IMG-Restaurant-HappyCream",
      desc: "The place is well-lit and generally tries to mimic old-school diner places. There is a wide selection of doughnuts and creams you can add on top.",
      arrivalText: "You arrive at the place and occupy the table with high bar stools.",
      departText: "You leave the place.",
      category: "dessert",
      quality: 3,
      events: [],
      activities: [
        {
          key: "happyCreamDonut",
          label: "Doughnuts and drinks",
          info: "Order some sweet-stuff.",
          twee: `You both spend some time at the shelf with various doughnuts trying to choose some. Finally you both make a decision, <<= aw.date.name>> goes first and takes <<print either("strawberry", "plain", "vanilla")>> doughnut with <<print either("special cream topping", "banana cream topping", "moist cream topping")>> and you go with <<print either("same choice", "same topping but on chocolate doughnut", "same doughnut but with mapple syrope topping")>>. You both grab a cup of coffee and start savoring the delicious treat which tastes <<print either("amazing", "magnificent", "unbelievable good", "delightful")>>. After a while you finished your desserts and just happy and calmly sitting being pretty satisfied with yourselves.<<set $happyCreamDonut = true>><<addtime 17>>`,
          check() {
            if (State.active.variables.happyCreamDonut === false || State.active.variables.happyCreamDonut == null) {
              return true;
            } else {
              return false;
            }
          },
          prep() {
            setup.drug.eatDrug("cum", 10);
            setup.food.eat(35, "dessert");
            State.active.variables.happyCreamDonut = false;
            aw.cash(random(-6, -9), "food");
            aw.date.enjoy[1] += random(4, 14);
            aw.date.qual += random(4, 9);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "happyCreamTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<if ↂ.pc.trait.intro>>You struggle with starting a proper conversation trying your best to find a topic to talk about. To your relief, <<= aw.date.name>> break the silence before it gets too awkard.<<else>>You feel pretty comfortable starting a chat with <<= aw.date.name>> and discuss things.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(2, 5);
            aw.date.qual += random(2, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "happyCreamTouch",
          label: "Touch",
          info: "Touch <<= aw.date.name>> under the table with your leg.",
          twee: `<p><<print either("Taking off one shoe you extend your leg to touch <<= aw.date.name>>'s crotch under the table.","Trying to stay as discreet as possible you remove your shoe and put your feet between <<= aw.date.name>>'s legs and rise it until it meets with your date's crotch.")>> <<if aw.date.npc.main.male>>You can feel <<= aw.date.name>>'s cock getting stiffier and smile innocently.<<else>>You can massage <<= aw.date.name>>'s pussy with your bare feet and smile innocently.<</if>></p><p><<print either("@@.pc;So... what have we talked about?@@","@@.pc;So, are you <i>hungry</i>?@@")>></p><p><<print either("@@.pc;Mmm... well...I am... oh.@@","<<= aw.date.name>>'s bites lips trying to focus.")>></p><<addtime 2>>`,
          check() {
              if (ↂ.pc.kink.shame) {
                return false;
              } else {
                return true;
              }
          },
          prep() {
            aw.date.arouse += random(7, 11);
            aw.date.enjoy[1] += random(3, 7);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "casual", "eat"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "teatTreats",
      name: "Teat treats ice cream",
      shortDesc: "An icecream place using all-natural 100% human milk.",
      loc: ["downtown", "southeast", false],
      topImg: "IMG-TeatsTreats-Inside",
      img: "IMG-Restaurant-TeatTreats",
      desc: "The well-lit place is divided by booth with tables where you can get ice-cream made fresh from the teat in an ice-cream machine which topless hucows waitress carry around.",
      arrivalText: "You enter the Teat Treats and take a seat in on e of the booths.",
      departText: "You leave the place..",
      category: "dessert",
      quality: 4,
      events: [],
      activities: [
        {
          key: "teatTreatsIcecream",
          label: "Icecream",
          info: "Ask a waitress for an Icecream.",
          twee: `You call a hucow passing by for an icecream. With a courteous smile she approach you booth and hand you the menu. After researching it for some time you and <<= aw.date.name>> make a choice. You decide to order <<print either("vanilla", "chocolate", "banana")>> icecream. Nodding, the girl gets the icecream machine on and start milking her impressive udders with a suction pumps. She seems to enjoy the process a lot judging by her face.<<if ↂ.pc.body.lactation > 4>><br><br>@@.mono;I think I could do it faster, this girl can barely give any milk. But maybe it was a just too many customers today already?@@<br><br><</if>> When she fills the machine she press some buttons and the device rumbles quietly while processing the milk and adding additional ingredients. In about two minutes she hands you your icecream and leave your booth still smiling with subsiding delight. The treat tastes <<print either("pretty good", "good", "nice", "a bit odd and you start suspecting that hucow serving you is a heavy smoker")>>. After a while you finished your desserts and just happy and calmly sitting being pretty satisfied with yourselves.<<set $teatTreatsIcecream = true>><<addtime 17>>`,
          check() {
            if (State.active.variables.teatTreatsIcecream === false || State.active.variables.teatTreatsIcecream == null) {
              return true;
            } else {
              return false;
            }
          },
          prep() {
            State.active.variables.happyCreamDonut = false;
            setup.food.eat(35, "dessert");
            aw.cash(random(-9, -14), "food");
            aw.date.enjoy[1] += random(6, 12);
            aw.date.qual += random(5, 10);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "teatTreatsShow",
          label: "Show",
          info: "Watch waitress show.",
          twee: `<p><<print either("@@.npc;Hey, it is almost time for the show!@@","@@.npc;Oh, cool, it seems the show is starting!@@")>></p><p><<print either("@@.pc;Ugh?@@","@@.pc;What show?@@")>></p><p><<print either("@@.npc;They have this dance thing every hour or so, never saw it before!@@","@@.npc;Shhh! It is starting!@@")>></p><p><<= aw.date.name>> points to the counter and you see a couple of waitress free their breasts which is followed by customers cheering. Upbeat music starts and they begin to dance with their full jugs bouncing with every motion. Your date whisper to your ear @@.npc;You see, it is like a local tradition of these milkshake places, you haven't heard of it? It first started as a TV advertisement and then they decided to make those shows in each restaraunt they have, hear the jingle?@@</p><p>You have hard time paying attention to the music mesmerized by girls pressing their boobs together so hard that their milk poured down their aprons. Still, you start to notice the words of the song playing on the background. @@.smeared;...Happy teat, yummy teat! Squeeze yourself a tasty treat! Everyone who loves icecream join with us in milky dream!@@ @@.mono;That sounds... odd. But the show is pretty nice to see!@@</p><p>Waitress continue to dance for a cuple minutes more until the music ends on a triumphant @@.smeared;TASTY CREAM TASTY CREAM JOIN THE YUMMY MILKY DREAM!@@ note and most of the customers applause to the soaked with their own milk girls. You turn back to <<= aw.date.name>></p><p>@@.pc;Well, that was entertaining for sure, he-he!@@</p><<addtime 7>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(2, 5);
            aw.date.qual += random(6, 8);
            aw.date.arouse += random(6, 8);
            return true;
          },
          gate: [],
          ai: [],
          repeatable: false,
        },
        {
          key: "teatTreatsTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<if ↂ.pc.trait.intro>>You try to think about something to ask <<= aw.date.name>> for some time.<<else>>You ask <<= aw.date.name>> about life.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><p>@@.pc;Oh, I see.@@</p><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(2, 5);
            aw.date.qual += random(2, 6);
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate", "nice", "eat"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "shakenpop",
      name: "Shake'n Pop",
      shortDesc: "A popular local nightclub.",
      loc: ["downtown", "club", "shakenpopentrance"],
      topImg: "IMG-MapLoc-SPopBar",
      img: "IMG-Club-ShakePop",
      desc: "The size of the club is pretty hard to evaluate with bright lasers and light cutting through the dark. Loud upbeat music fills the dancefloor.",
      arrivalText: "Passing the guard you walk inside the club. After going through a dark passage loud music and lights stuns you for a moment but soon you get used to it. Bunch of people on a dancefloor having pretty much fun.",
      departText: "you leave the club ",
      category: "activity",
      quality: 4,
      events: [
        {
          key: "shakenpoppuddle",
          check() {
            return true;
          },
          label: "Oops",
          twee: "You suddenly step into the puddle of something and feel pretty ashamed while your date giggles at you. It gets you some paper towels from the bar to clean your shoe from this goo.<br><br>@@.mono;Just perfect. Now <<= aw.date.name>> laughs at me. Best date ever. I hope at least it is not vomit.@@<br><br>",
          prep() {
            aw.date.enjoy[1] -= random(2, 5);
            aw.date.qual -= random(2, 6);
            return true;
          },
          gate: [],
        },
      ],
      activities: [
        {
          key: "shakenpopPetting",
          label: "Petting",
          info: "Invite <<= aw.date.name>> to the chillout for some petting.",
          twee: `<<arousal 1>><p>@@.pc;Come on, let's chill a little there!@@ @@.npc;What? It is too loud!@@ You take <<= aw.date.name>>'s hand and pull them with you to the chillout area. One of the red loveseats are empty and you take a seat inviting <<= aw.date.name>> to join you. It is much less noisy here with the music being muffed by the thick curtains and you can hear buzzing in your ears pretty good. You lick your lips and put your arm on <<= aw.date.name>>'s thigh. @@.pc;So... having a good time yet?@@</p><p><<if aw.date.enjoy[1] > 50>>@@.npc;Yeah, I really enjoy this evening!@@<<else>>@@.npc;Mmm... you can say so I guess...@@<</if>> Your hand crawls up and up until it lands on <<= aw.date.name>>'s <<if aw.npc[aw.date.npcid].main.female>>crotch<<else>>buldge<</if>> which makes your date sigh in a surprised and joyful way. Your faces are so close you can clearly see how delightfully nice <<= aw.date.name>>'s lips are. The temptation is too high and you press them with your <<p lips.q>> lips. Taking efforts in your own hands quite literally you massage <<= aw.date.name>>'s <<if aw.npc[aw.date.npcid].main.female>>pussy<<else>>cock<</if>> through the closes while wandering with your other hand all around their body while <<= aw.date.name>> returns a favor caressing your <<p tits.q>> <<p titshape.q>> <<p tits.n>> and <<p ass.q>> <<p ass.n>>.</p><p>Your kisses get sloppier and fiercier until you both get exhausted and cease your petting breathing heavily into each other eyes. @@.pc;Mmm... you are such a tasty thing, I could do it forever you know?@@ @@.npc;He-he@@</p><<addtime 16>><<status 0>>`,
          check() {
            return true;
          },
          prep() {
            aw.date.enjoy[1] += random(7, 12);
            aw.date.arouse += random(7, 12);

            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "shakenpopDance",
          label: "Dance",
          info: "Go to the dance floor and spend some time dancing to the beat together.",
          twee: `<<print either("Holding <<= aw.date.name>> by the hand", "Luring <<= aw.date.name>> with your finger", "Without saying a word")>> you both get right into the center of the dancefloor. Surrounded by the crowd you start dancing like you mean it with your bodies almost touching.<<SCX>><<SC "DA">><<if $SCresult[1]>>You are , and <<= aw.date.name>> seems to enjoy your mildly suggestive dancing becoming clearly aroused.<<set aw.date.enjoy[1] += 19>><<set aw.date.qual += 6>><<set aw.date.arouse += 10>><<else>>You are not that good on dancing tripping a couple of times and even hitting <<= aw.date.name>>'s nose with your elbow.<<set aw.date.enjoy[1] -= 9>><<set aw.date.qual -= 6>><</if>>. Exhausted, you finally leave the dance floor to catch some fresh air.<<addtime 46>><<status 0>>`,
          check() {
            return true;
          },
          prep() {
            ↂ.pc.status.exercise += random(10, 20);
            aw.S();
            if (ↂ.pc.status.happy < 2) {
              setup.status.happy(1, "Exercising can improve mood");
            }
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "shakenpopDrink",
          label: "Drink",
          info: "Go to the bar to drink something",
          twee: `<span id="buylink">@@.pc;Hey, <<= aw.date.name>> wanna drink something?@@<<if ↂ.pc.status.alcohol < 6>><br><br>@@.npc;Hm, why not. I'd go for some <<print either("Fickenmeister", "Beer", "Cocktail")>>!@@<br><br><<else>><br><br>@@.npc;Are you sure you hadn't got enough already?@@<br><br>@@.pc;Hey, I am absolutely okay! Let's drink, don't be a pussy!@@<br><br><</if>>You go to the bar together to get some drinks. It seems bartender has some busy day with all the visitors and it takes you some time to finally order your drinks. <<= aw.date.name>> gets a glass first and you hesitate for a moment <<link "looking at the menu">><<dialog "Shake & Pop Bar">><<print setup.food.bar("shakepop")>><</dialog>><<replace "#buylink">><<addtime 18>>You take your drinks and go with <<= aw.date.name>> away from the crowd and loud dancefloor to the chillout zone. Despite of being divided by only one wall from the main area it is much more quiet here and you savor your drinks sitting on the red leather coach in front of the small coffee table. As you sip from your glass you feel warmth spreading through your body and making you more talkative than usual. You decide it is a right time to know <<= aw.date.name>> better.<<print setup.storythread.getStory(aw.date.npcid)>><</replace>><</link>>.</span>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(2, 5);
            aw.date.qual += random(6, 9);
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "crowd", "sloppy", "drink"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "park",
      name: "Go to the park",
      shortDesc: "Central park of the city.",
      loc: ["downtown", "park", false],
      topImg: "IMG-Park-Inside",
      img: "IMG-Park-date",
      desc: "The park looks great today, there are not much people around and everything looks just idyllic.",
      arrivalText: "You go through the gates and follow the trail to the park.",
      departText: "You leave the place.",
      category: "activity",
      quality: 3,
      events: [
        {
          key: "parkJerks",
          check() {
            if (random(0, 8) === 8) {
              return true;
            } else {
              return false;
            }
          },
          label: "Park",
          twee: `You walk through the park talking with <<= aw.date.name>> and talking about things. <p>@@.pc;<<has flirty>><<run setup.deepThoughts(-2)>><<or>><<run setup.deepThoughts(-1)>><</has>>@@</p> Suddenly your chat is interrupted by some shouting.<p>@@.npc;Why, what a pussy! Just look at this butt! Hey, precious, wanna taste some I have here?@@</p>You turn around and see some drunken guys whistling and making lewd commentaries about your appearance.<<anger 1>><p>@@.pc;<<has bitch>>Taste yourself, you shithead!<<orhas intro>>Oh, <<= aw.date.name>>, let's go away, I feel vulnerable...<<or>>Damn. <<= aw.date.name>>, let's go away from here.<</has>>@@</p><p>@@.npc;Oh, <<= aw.date.name>>, don't pay attention to them, they are just jerks.@@</p>You pick up the pace and soon are far enough so the guys loose any interest in you but the awkwardness already hit you both and it seems that <<= aw.date.name>> feels shitty now.<<addtime 5>>`,
          prep() {
            aw.date.enjoy[1] -= random(8, 18);
            aw.date.qual -= random(10, 18);
            return true;
          },
          gate: [],
        },
      ],
      activities: [
        {
          key: "parkStroll",
          label: "Stroll",
          info: "Walk through the park having a convo.",
          twee: `You walk along the trail enjoying the fresh air and <<if ↂ.pc.trait.intro>>trying to think about possible conversation starters.<<else>>talking with <<= aw.date.name>>.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><<addtime 16>><br>@@.pc;<<print either("Oh, I see.", "Pretty interesting.", "Well, that was a hell of a story")>>@@<p>@@.npc;Yeah... And what about you?@@</p><p>@@.pc;<<has op>>Well, I had my life changed since I moved here, in Appletree. I mean, changed a lot. I really can't tell you the details but... Well, I started literally from scratch and now trying to get my life together and well, learn the new way to live my life.<<orhas cl>>Mhm. Dunno what to tell you about. It is much more interesting to hear your stories to be honest.<<or>>Well, I had my ups and downs as anybody else. my life changed and but today I feel really good spending some quality time.<</has>>@@</p>`,
          check() {
              return true;
          },
          prep() {
            ↂ.pc.status.exercise += random(5, 10);
            aw.date.enjoy[1] += random(2, 5);
            aw.date.qual -= random(1, 6);
            aw.S();
            if (ↂ.pc.status.happy < 2) {
              setup.status.happy(1, "Exercising can improve mood");
            }
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
        {
          key: "parkSex",
          label: "Sex",
          info: "Propose <<= aw.date.name>> to have sex right in the park",
          twee: `<<SCX>><<SC "SD" "50">>You move closer to <<= aw.date.name>> in a suggestive manner.<p>@@.pc;<<has exhibition || public>>I want you right here!<<or>>Well, maybe... you know... I just thought of doing some really nasty stuff right here...<</has>>@@</p>.<<if $SCresult[1] && aw.date.arouse > 60>><<if aw.date.npc.kink.exhibition || aw.date.npc.kink.public || aw.date.npc.kink.slut>>It seems, <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> is pleased by the idea. <p>@@.npc;Right here, where anybody can see us? Damn, I count me in!@@<p><<link "Rock'n Roll!">><<set aw.date.enjoy[1] += 19>><<sceneclose>><<gotomap "downtown" "park">><<set ↂ.sex.pcOutput = "You bit your lip in anticipation standing in front of <<= aw.date.name>>.">><<set ↂ.sex.enviroTags = ["public"]>><<startSex aw.date.npcid>><</link>><</if>><<else>><p>@@.npc;You must be kidding me? We are literally in the middle of the downtown! Everybody can see us! I am sure I am hot, but really, I can't shag in front of people. Not here!@@<<set aw.date.enjoy[1] -= 35>></p><</if>>`,
          check() {
            if (ↂ.pc.kink.slut || ↂ.pc.kink.liberate && ↂ.pc.kink.public) {
              if (!ↂ.pc.kink.shame) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
            },
          prep() {
            return true;
          },
          gate: ["public"],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "casual", "travel"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "cineplex",
      name: "Cineplex cinema",
      shortDesc: "A big cinema in the Applewood mall",
      loc: ["downtown", "mall", "movies"],
      topImg: "IMG-Cineplex-inside",
      img: "IMG-Peeper-Cineplex",
      desc: "Big and modern cinema, in fact the only one in the city you know about.",
      arrivalText: "You arrive at the place and go into the doors to the cineplex hall.",
      departText: "You leave the place.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "cineplexWatch",
          label: "Watch a movie",
          info: "Go and watch some miracle of animated pictures together.",
          twee: `<<addtime 126>><p>@@.npc;What movies would you like to watch?@@</p><p>@@.pc;Well...@@</p>After watching the posters you discuss possible choices for some time before finally deciding to go to watch "<<print either("Dong of the Dead", "Sexorcist", "Ejacula", "Cockfest", "SpaceOrgy", "Uncle Fuck", "Fill Bill", "Ice dildo")>>". You pay your tickets and go to grab some popcorn. <<print either("Luckily, it is just about 5 minutes before film starts so you don't need to wait","The film starts in about 20 minutes so you need to wait.")>> Entering the movie theatre you find your seats and and wait for the lights go out. As usual you are forced to watch ridiculous amount of advertisment and trailers for upcoming movies before finally the movie itself begins. After about an hour you realize that you actually <<print either("like the film","don't like the film very much","feel pretty so-so about the film")>> and <<= aw.date.name>> seems to <<print either("enjoy the movie.", "be bored.")>>. When titles starts you blink from the lights and get up from the chairs discussing your impressions.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-15, -20), "misc");
            aw.date.enjoy[1] += random(7, 15);
            aw.date.qual += random(5, 9);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "cineplexSuck",
          label: "Watch a movie <i>on the last row</i>",
          info: "Watch some film or pretend to while having some sexy fun with <<= aw.date.name>>.",
          twee: `<<addtime 124>><<SCX>><<SC "SD" 5>><p>@@.npc;What movies would you like?@@</p><p>@@.pc;Hmmm...I guess anything goes, choose yourself!@@</p><p>@@.npc;Let's see then... how about <<print either("Dong of the Dead", "Sexorcist", "Ejacula", "Cockfest", "SpaceOrgy", "Uncle Fuck", "Fill Bill", "Ice dildo")>>?@@</p><p>@@.pc;Sure, I am in!@@</p><p>You pay your tickets and go to grab some popcorn. <<print either("Luckily, it is just about 5 minutes before film starts so you don't need to wait","The film starts in about 20 minutes so you need to wait.")>> Entering the movie theatre you find your seats and and wait for the lights go out. As usual you are forced to watch ridiculous amount of advertisement and trailers for upcoming movies before finally the movie itself begins. It seems that the movie chosen by <<= aw.date.name>> is actually not that bad but you have <i>special</i> plans that don't include watching the screen.<<if $SCresult[1]>><<set aw.date.arouse += 7>><<set aw.date.enjoy[1] += 19>> Using the darkness around you as a cover you get to the floor between <<= aw.date.name>>'s legs.</p><p>@@.npc;<<= ↂ.pc.main.name>>, what are you...@@ ignoring the whisper you force <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> legs apart and get to <<if aw.npc[aw.date.npcid].main.female>>her pussy<<else>>his cock<</if>>. <<= aw.date.name>> gives up and just nervously looks around afraid you to be noticed. Luckily, there is no people on your row and <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> calms down and submits to your lewd assault with a light muffed moan when you <<if aw.npc[aw.date.npcid].main.female>>get her clothes out of the way and push your tongue deep into her pussy.<<else>>get his clothes out of the way and engulf his cock with your <<p lips.q>> lips.<</if>> You lick, suck and lap <<= aw.date.name>> until <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> can't hold it anymore and gives up to orgasm trying to make it as silent as possible.<<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> body shakes in a silent spasms of pleasure <<if aw.npc[aw.date.npcid].main.female>>while her cunt clenches around your tongue.<<else>><<eatdrug "cum" 10>><<run setup.hadSexWith(aw.date.npcid, 2)>><<run setup.condition.add({loc: "face", amt: 5, tgt: "pc", wet: 5, type: "cum"})>><<run setup.omni.new("cumMouth")>>while his cock twitches into your mouth shooting blobs of warm sticky cum.<</if>></p><<else>><<set aw.date.enjoy[1] -= 11>><<stress 15 "Embarrassed with your fail at the cinema.">>Using the darkness around you as a cover you get to the floor between <<= aw.date.name>>'s legs.</p><p>@@.npc;<<= ↂ.pc.main.name>>, what are you...@@ ignoring the whisper you try to force <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> legs apart but <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> doesn't allow you to do it.<p><p>@@.npc;Are you insane? It's not the right time at all!@@</p><p>@@.npd;Shhhh!@@ @@.npd;We are trying to watch a movie here!@@</p><p>@@.npc;Sorry, she just... lost her glasses! Come on, get up.@@</p><</if>><p>Without saying anything you get back to your seat and resume to watch the movie. You already lost in the plot after missing just the small amount so you spend the rest of the film you spend trying to get who is this 'Major Cummings' and how does he related to the Sperm Whale Man. Occasionally you glance at <<= aw.date.name>> trying to get their attitude but it is hard to tell in the darkness of the cinema. When titles starts you blink from the lights and get up from the chairs <<if $SCresult[1]>>discussing your impressions.<<else>>in awkward silence.<</if>></p>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-15, -20), "misc");
            aw.date.qual += random(5, 9);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "nice", "play"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "firingrange",
      name: "Hot loads",
      shortDesc: "A firing range, the only one in the city as far as you know.",
      loc: ["downtown", "amuse", false],
      topImg: "IMG-HotLoads-Inside",
      img: "IMG_HotLoads",
      desc: "A firing range consist of the small reception and waiting area with armory and a spacious range hall in the basement.",
      arrivalText: "You arrive at the place and go to the reception with <<= aw.date.name>>.",
      departText: "You leave the place.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "firingrangeShoot",
          label: "Shoot",
          info: "Go and shoot some targets together.",
          twee: `<<addtime 30>><<dialog "Choose your gun">><<print either("You come to the reception with a ", "Approaching the reception you see a")>> <<print either("bearded middle-aged", "pretty girl with tattoos", "sturdy fit woman in a leather jacket")>> standing beneath.<br><br>@@.pc;Welcome to the "Hot loads"! Wanna shoot some today?@@<br><br>After greeting and short safety instructions you are proposed to choose a gun for target shooting. It seems they have some interesting choice of firearms there and you pause for a moment trying to figure out what you like to shoot today.<br><br>@@.npc;I guess I ll try <<print either("Gluck 69", "0.40 Rimmington", "Double action Cunt navy", "Pussberg 500 Pump-action", "Beawer M9")>> today. What will be your choice, mm?@@<br><br>@@.pc;Hmmm...@@<br><br>You take a look on the list again.<br><<button "Gluck 69">><<run Dialog.close()>><</button>><<button "0.40 Rimmington">><<run Dialog.close()>><</button>><<button "Double action Cunt navy">><<run Dialog.close()>><</button>><<button "Pussberg 500 Pump-action">><<run Dialog.close()>><</button>><<button "Beawer M9">><<run Dialog.close()>><</button>><</dialog>>After paying, you get your guns, headphones and a cardboard with rounds.<br><br>@@.npc;<<print either("Good luck and stay safe, folk!", "Have fun and don't forget about safety!", "I hope you know how to handle this, have a nice time!")>>@@<br><br>You go to the range and take a stall next to <<= aw.date.name>>.<<SCX>><<SC "FA" 10>><<if $SCresult[1]>>After loading the gun you start shooting the paper target. <<SC "FA" 20>><<if $SCresult[2]>>You feel pretty confident and after shooting you evaluate your results as <<print either("good", "excellent", "mediocre but still okay")>><<happy 1 "Fun at the shooting range">><br><br>@@.npc;Wow, you are good at it! You are a natural-born shooter!@@<br><br>@@.pc;Thanks!@@<br><br><<stress -5 "Shooting a gun">><<else>>You are still not that familiar with firearms <<print either("so your results are average", "but your results are surprisingly good today", "so your results are mediocre")>><<stress -3 "Shooting a gun">><br><br>@@.npc;Hey, not bad!@@<br><br><</if>><<else>>It takes you a long time and some additional help from <<= aw.date.name>> to finally load and shoot your gun.<br><br>@@.npc;<<print either("It is okay, you just need some practice.", "It seems you are shooting for the first time, right?", "See, you need to pull the trigger softly, do not twitch...")>>@@<br><br>You feel warm breath on your cheek while <<= aw.date.name>> instructs you how to hold a gun. After shooting you evaluate your results and it seems <<print either("you miss most of the time", "you hit the target 3 or 4 times", "somehow you managed to hit the target with more than a half of bullets")>>.<</if>> It seems that <<= either("you was more successful than", "you did worse than", "you got the same results as")>> <<= aw.date.name>>. Still slightly stunned by loud shots you go upstairs and leave the range.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-20, -25), "misc");
            aw.date.enjoy[1] += random(9, 14);
            aw.date.qual += random(3, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate", "casual", "play"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "bowling",
      name: "Happy Balls",
      shortDesc: "A bowling place, good ol' way to chill out with friends or coworkers.",
      loc: ["downtown", "amuse", false],
      topImg: "IMG-HappyBalls-Inside",
      img: "IMG-Activity-HappyBalls",
      desc: "A bowling place is basically a big hall with a small snack bar on the left and about 6 or 7 lanes for playing.",
      arrivalText: "You arrive at the place, it seems there are some free tracks so you go straight to the manager to book one for you and <<= aw.date.name>>.",
      departText: "You leave the place.",
      category: "activity",
      quality: 2,
      events: [],
      activities: [
        {
          key: "bowlingPlay",
          label: "Play",
          info: "Go and play s together.",
          twee: `<<addtime 53>>You book the lane and start playing. <<SCX>><<SC "AT" 10>><<if $SCresult[1]>>You are pretty confident with your bowling skills and beat <<= aw.date.name>> easily with more than half of your attempts being strikes.<br><br>@@.npc;Wow, where have you learned to play so good?!@@<br><br><<else>>You feel not that confident with playing and <<= aw.date.name>> <<= either("wins", "almost wins")>>.<br><br>@@.npc;Nice game, you was doing great!@@<br><br>@@.pc;Thanks!@@<br><br><</if>>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-15, -20), "misc");
            aw.date.enjoy[1] += random(7, 12);
            aw.date.qual += random(3, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "flashButt",
          label: "Show off your ass",
          info: "'Accidentally' moon your butt to <<= aw.date.name>>.",
          twee: `<center>[img[IMG-HappyBalls-Butt]]</center><br><<set _buttCheck = 14>><<if aw.date.arouse > 50>><<set _buttCheck -= 5>><<elseif aw.date.arouse > 30>><<set _buttCheck -= 3>><</if>><<if setup.clothes.exposed.bottom>><<set _buttCheck -= 5>><</if>><<SCX>><<SC "SD" _buttCheck>>@@.pc;I'm aiming for a strike!@@<p>@@.npc;Oh really? Let's see about that he-he.@@</p><p>You take a ball and go to the lane. Pretending that you aim you lean forward giving <<= aw.date.name>> the best possible view on your <<p ass.q>> <<p ass.n>>.</p><p>You throw the ball caring more about your posture than actual result of the throw and peek at your date. <<if $SCresult[1]>>It seems that your bum gathered the attention you wanted. <<= aw.date.name>> ogles your back with obvious arousal and you smile triumphantly before turning. @@.pc;Oh I am so clumsy, didn't hit any this time, giggle!@@ @@.npc;...mmm what? Ah yes, haha!@@<<set aw.date.enjoy[1] += random(7, 12)>><<set aw.date.arouse += random(7, 12)>><<status 0>><<else>>To your disappointment it seems <<= aw.date.name>> missed your little show.<</if>></p>`,
          check() {
              return true;
          },
          prep() {
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "casual", "play"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "massage",
      name: "Fairy Tail",
      shortDesc: "The most popular massage parlor in the downtown providing all kinds of massaging services.",
      loc: ["downtown", "amuse", false],
      topImg: "IMG-FairyTaleInside",
      img: "IMG-FairyTaleDate",
      desc: "The most popular massage parlor in the downtown.",
      arrivalText: "You come into the parlor with <<= aw.date.name>> and ask if there is any free room. Luckily, managers says that the masseuse can meet you instantly. The question is what kind of treatment you both want and you look at <<= aw.date.name>>.",
      departText: "You leave the place.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "couplesMassage",
          label: "Couple's massage",
          info: "Ask for a simultaneous massage for you two.",
          twee: `<p><<stress -20>><<addtime 33>>You book the room and the administrator leads you to the place. <<if aw.date.npc.kink.exhibition>>It seems <<= aw.date.name>> feels pretty happy to get rid of the clothes and doesn't mind you looking. You have the pretty good view on your date's body especially since <<= aw.date.name>> neglects the towel lying on the massage bed.<<elseif aw.date.npc.kink.shame>>It looks like <<= aw.date.name>> is shy of her body asking you to turn around before undressing. @@.npc;You can turn now, I am ready.@@ With a little sigh you turn just to see <<= aw.date.name>>'s body already covered with a towel.<<else>>After little hesitation <<= aw.date.name>> undress and lies on one of two beds awaiting the masseuse and you get a glimpse of your date's body before it gets covered with a towel. <<run setup.npcInfo.level(aw.date.npcid, {bodyGeneral: true})>><<run setup.npcInfo.level(aw.date.npcid, {bodyJunk: true})>><<run setup.npcInfo.level(aw.date.npcid, {bodyTits: true})>><</if>></p><p>You lie on the beds chatting and after a couple of minutes two masseuse come in. @@.npd;<<greetings>>, oh I see you both are ready, nice! I am Amanda and this is Trudy, we will make you nice and relaxed today!@@</p><p>They start rubing your backs and soon you let out a satisfied moan as tension leaves you. It seems <<= aw.date.name>> enjoys the treatment a lot too. Girls hands moisturized with an oil slide over your bodies and you can't continue the conversation anymore just enjoying the massage. Finishing with your back they turn you and you just happily observe the celling while professionals makes your body feel nice and soft. After a while Amanda gets closer to your ear. @@.npd;Would you both like to have... <i>a happy ending?</i>@@</p><p><<if ↂ.pc.kink.shame>>@@.pc;Oh, no... thanks. @@ @@.npd;Oh sure, sorry...@@ They continue to rub your quite professionaly until you both feel like smiling idiotically. When they finish and leave you to dress up<<= aw.date.name>> lazily turns to you. @@.npc;Oh, <<= ↂ.pc.main.name>> that was super cool, I feel sooo relaxed right now...@@ @@.pc;Oh me too, I really missed a good backrub!@@<<else>>@@.pc;Mmmm sure, why not, giggle!@@ Amanda nods to Trudy and you feel hands on your body getting closer to your crotch, closer and closer until her oiled hands start gently playing with your <<p clit.s>> <<p clit.n>>. Glimpsing to the side you see Trudy doing the same with <<= aw.date.name>>. You close your eyes and let the masseuse pleasure you. @@.npc;M-m-mh!@@ You both start moaning while girls work your intimate parts up. <<if aw.date.npc.main.male>><<= aw.date.name>> moans harder and louder until Trudy works the cock with her nimble hands. Finally with a shudder <<= aw.date.name>> cums all over her hands with a series of a blows which makes you let go all the control you still had and cum too. The warm wave overflows you and your pussy clenches over Amanda fingers deep inside you. @@.pc;Oh my ohmy ohmyhomyoh....yeeas!@@<<else>><<= aw.date.name>> moans harder and louder until Trudy works her pussy with her nimble fingers. Finally with a shudder <<= aw.date.name>> starts orgasming with her knees shaking which makes you let go all the control you still had and cum too. The warm wave overflows you and your pussy clenches over Amanda fingers deep inside you. @@.pc;Oh my ohmy ohmyhomyoh....yeeas!@@<</if>> When they finish and leave you to dress up <<= aw.date.name>> lazily turns to you. @@.npc;Oh, <<= ↂ.pc.main.name>> that was super cool, I feel sooo relaxed right now...@@ @@.pc;Oh me too, I really missed a good... backrub!@@<</if>></p>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-25, -35), "misc");
            aw.date.enjoy[1] += random(9, 15);
            aw.date.qual += random(12, 18);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "fancy", "intimate"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "springs",
      name: "Springs",
      shortDesc: "A secluded lake at the north-west part of the valley.",
      loc: ["world", "spring", "beach"],
      topImg: "IMG-SpringsInside",
      img: "IMG-SpringsDate",
      desc: "Local free-to-visit swimming and tanning area.",
      arrivalText: "You get into the car and go to the <<= aw.date.name>> place. Springs are pretty near the town so it takes not too long until you get out of the car at the parking spot. The  parking lot that is mostly surrounded by trees. It almost looks like the parking lot for some forest campground, except for the signs directing you toward Hoden Spring.",
      departText: "You get into the car and leave the place.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "springsTan",
          label: "Relax & Tan",
          info: "Lie on the loungers around the pond and enjoy the good things in life.",
          twee: `<<stress -10 "Relaxation at the springs area">><<addtime 46>><p>You take <<= aw.date.name>> to the free loungers and lie there. <<if setup.time.now()[0] < 9 || setup.time.now()[0] > 21>>There is no sun in the sky so tanning is not an option and you just lie and talk about various stuff. <<else>><<set ↂ.flag.tan += random(0,1)>><<run setup.npcInfo.level(aw.date.npcid, {bodyGeneral: true})>>The sun is up so you decide it is a nice time to get some tan. You undress <<has exhibition>>removing <i>all</i> your clothes<</has>> and lie on your belly so you can bake properly <<if aw.npc[aw.date.npcid].kink.exhibition>><<run setup.npcInfo.level(aw.date.npcid, {bodyJunk: true})>><<run setup.npcInfo.level(aw.date.npcid, {bodyTits: true})>>while <<= aw.date.name>> undresses completly<<has shame>> which makes you a little bit uncomfortable<<or>> which allows you to looks at <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> most intimate body features.<</has>>.<<else>>. <<= aw.date.name>> undresses too and lies alongside.<</if>><</if>> <<has exhibition>><<arousal 1>>You can see <<= aw.date.name>> glancing over your naked body and smile. @@.mono;Oh, it is a special thrill to show off your body for sure!@@<<or>>You feel confortable and nice just lying together in this calm spot away from the town hassle just talking about stuff.<</has>></p><<print setup.storythread.getStory(aw.date.npcid)>><p>@@.pc;Oh, I see.@@</p><<status 0>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(9, 15);
            aw.date.qual += random(4, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "springsSwim",
          label: "Swim",
          info: "Swim in the lake with <<= aw.date.name>>.",
          twee: `<<happy 1 "Relaxing in the lake was fun">><<anger -1>><<stress -12 "Swimming">><p>@@.pc;Hey, wanna swim in the lake?@@</p><p><<= aw.date.name>> touches the water before answering. @@.npc;Sure! It is a bit chilly outside but the water seems just fine by me.@@</p><p><<has exhibition>>You undress and decide that it is just a right time for your exhibitionist's streak so when <<= aw.date.name>> turns you stand completly naked. <<if aw.npc[aw.date.npcid].kink.liberate || aw.npc[aw.date.npcid].kink.liberate || aw.npc[aw.date.npcid].kink.slut>><<= aw.date.name>> nods with approval and after thinking for a moment undress completly too.<<elseif aw.npc[aw.date.npcid].kink.shame>><<= aw.date.name>> seems shocked and you can notice a blush on <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> cheeks. @@.npc;Oh... can you please...@@ @@.pc;Dress?@@ @@.npc;...yeah. At least put something over. Don't think I don't...like it. It is just me being not entirely comfortable with all this nudists stuff.@@ You just giggle and comply.<<else>><<= aw.date.name>> seems a bit surprised by your sudden nudity but doesn't say a thing.<</if>><<or>>You undress and so does <<= aw.date.name>>. @@.npc;I hope they have some towels for rent at that community center over there.@@ @@.pc;Hey, it is not that chill, you'll be okay, pussy!@@<</has>></p><p>You got into the water and apparently it doesn't feel cold. @@.mono;Maybe the spring at the bottom of the lake is warm?@@ The water feels really good and you swim for alomost 20 minutes before <<= aw.date.name>> decides that <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> had enough and you go out to your loungers.</p><<status 0>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(9, 15);
            aw.date.qual += random(4, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "fancy", "travel"]],
      type: "normal",
      check() {
        return true;
      },
    },
    {
      key: "watchMovie",
      name: "Watch the movie",
      shortDesc: "Have a nice time watching some movie together.",
      loc: ["home", "living", false],
      topImg: "IMG-watchTV",
      img: "IMG-TVDate",
      desc: "The pretty standard way to spend some time on a date. The only hard part is to come up with a movie which both of you will like.",
      arrivalText: `<<= either("You get comfortably in front of TV", "You and <<= aw.date.name>> curl together in front of your TV")>> and <<= either("after some fumbling", "after looking everywhere for some minutes")>> you manage to find the remote and turn it on. <<= either("Now it is the matter of choosing the movie","Choosing the genre is a hard thing though")>> and <<= either("it takes some time until","after some short but frantic discussion")>> you finally decide that you both are willing to watch some <<= either("comedy","action","horror","porn")>>. <<= either("A couple of minutes later", "It takes some additional time until")>> you agree on the fact that it will be "<<= either("The Cumfather","12 horny men","Good, the Bad and the Horny","Intersexular")>>" and <<= aw.date.name>> presses the "play" button. While the movie starts showing titles and such you sit comfortably and prepare to watch it.`,
      departText: "You push the button on the remote to turn the TV off.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "hug",
          label: "Hug",
          info: "Cuddle with <<= aw.date.name>> in a comfy and non-suggestive fashion.",
          twee: `<<= either("You put your hand around <<= aw.date.name>>'s neck", "You lean closer to <<= aw.date.name>> cuddling", "Looking at the screen you put your head onto <<= aw.date.name>>'s shoulder")>> <<= either("enjoying the intimate moments you spend together","inhaling the subtle aroma of <<= aw.date.name>>'s hairs")>>. <<= either("<<= aw.date.name>> starts stroking your hair still focused on the movie.","<<= aw.date.name>> hugs you back still watching at the screen.")>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(4, 8);
            aw.date.qual += random(4, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "tease",
          label: "Tease while you watch the movie",
          info: "Distract <<= aw.date.name>> from watching with some subtle sexy action.",
          twee: `<<SCX>><<SC "SD">><<= either("Still watching on the screen", "Pretending like you still watch the movie")>> <<= either("you put your hand onto <<= aw.date.name>>'s crotch in a somewhat <i>accidental</i> fashion and start to rub it ever so slightly.", "you start kissing <<= aw.date.name>>'s neck.")>> <<if $SCresult[1]>><<set aw.date.enjoy[1] += 7>><<set aw.date.qual += 2>><<set aw.date.arouse += 9>><<= either("With a barely audible moan <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> stretches encouraging you to continue.", "It is obvious that <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> likes it. <<if aw.npc[aw.date.npcid].main.female>>She<<else>>He<</if>> bites <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> lip while you continue to tease <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>>.")>> <<= either("After a couple of minutes you decide that <<if aw.npc[aw.date.npcid].main.female>>her heavy panting and blushing cheeks is a good result<<else>>the stone-hard bulge in his pants is a good result<</if>> and return back to watching the movie as if nothing happened.", "You spend a couple more minutes until you decide to take pity on <<= aw.date.name>> leaving <<if aw.npc[aw.date.npcid].main.female>>her<<else>>him<</if>> breathing heavily.")>><<else>> <<= either("<<if aw.npc[aw.date.npcid].main.female>>She<<else>>He<</if>> moves from you disturbed by your subtle attck.", "It doesn't seem like <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> likes it.")>> <<= either("@@.npc;Hmmm, please, not now, I really want to watch this thing.@@","@@.npc;Ugh, please, <<= ↂ.pc.main.name>>, I am trying to watch the movie here!@@")>><<set aw.date.enjoy[1] -= 5>><<set aw.date.qual -= 8>><</if>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(4, 8);
            aw.date.qual += random(4, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate"]],
      type: "yourhome",
      check() {
        return true;
      },
    },
    {
      key: "serveFood",
      name: "Eat",
      shortDesc: "Eat a dinner you previously cooked. Or just order some pizza.",
      loc: ["home", "kitchen", false],
      topImg: "IMG-serveFood",
      img: "IMG-FoodDate",
      desc: "There is no better way to know each other than eating a meal together. Especially, if you made it yourself.",
      arrivalText: `You invite <<= aw.date.name>> to the table. Now it is time to serve your culinary creation. <<= setup.cook.eatingList()>>`,
      departText: "You take plates away from the table and <<= aw.date.name>> stands up.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate"]],
      type: "yourhome",
      check() {
        return true;
      },
    },
    {
      key: "massage",
      name: "Massage",
      shortDesc: "Propose doing some innocent relaxing backrub.",
      loc: ["home", "bedroom", false],
      topImg: "IMG-HomeMassage",
      img: "IMG-MassageDate",
      desc: "Propose <<= aw.date.name>> some innocent relaxing backrub.",
      arrivalText: `You invite <<= aw.date.name>> to lie comfortably on the couch.`,
      departText: "With a little sigh, <<= aw.date.name>> puts <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> top back on and sits. @@.npc;This was really good! I'd wish I could enjoy a massage daily...@@",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "Rub",
          label: "Tease",
          info: "Tease your date in a sexy way.",
          twee: `<<SCX>><<SC "SD">><<set aw.date.npc.clothes.worn.top = "off">>After removing <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> top you start massaging <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> back rubbing muscles deep under the skin. <<if $SCresult[1]>><<set aw.date.arouse += 15>>It seems, your fingers brushing along <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> back make <<= aw.date.name>> a little bit horny, <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> breathing gets a little bit faster and cheecks blushes while you pretend it to be a completely innocent backrub.<<else>>It seems, your efforts did not take much effect on <<= aw.date.name>>.<</if>>`,
          check() {
              return true;
          },
          prep() {
            aw.date.enjoy[1] += random(4, 8);
            aw.date.qual += random(4, 6);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate"]],
      type: "yourhome",
      check() {
        return true;
      },
    },
    {
      key: "stocks",
      name: "play with the stocks",
      shortDesc: "Put your date in stocks",
      loc: ["home", "bedroom", false],
      topImg: "IMG-HomeStocksBig",
      img: "IMG-HomeStocksDate",
      desc: "Order <<= aw.date.name>> to get into stocks for some hot bdsm action.",
      arrivalText: `<<if aw.date.npc.kink.sub>>Flinching, <<= aw.date.name>> gets into the position and you close the heavy upper piece locking your victim in place. <<= aw.date.name>> looks at you with obvious fear of what will come next.<<else>>@@.npc;Are you sure? This looks like some serious bdsm stuff...@@ @@.pc;Just a little play, don't worry. Don't you want to try something new, mm?@@ Hesistantly, <<= aw.date.name>> allows you to lock <<if aw.npc[aw.date.npcid].main.female>>her<<else>>him<</if>> place trying to relax in an uncomfortable position. @@.npc;Ugh, I did not know you are the <i>kinky</i> one, <<= ↂ.pc.main.name>>, heh.@@<</if>>`,
      departText: "You remove the lock and lift the upper piece, freeing <<= aw.date.name>>'s arms and neck from the restraint. <<if aw.npc[aw.date.npcid].main.female>>She<<else>>He<</if>> sighs with relief carefully massaging <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> tired limbs.<<if setup.interactionMisc.isSub[aw.date.npcid] || aw.date.npc.kink.sub>>@@.npc;Oh, thank you, mistress!@@<<else>>@@.npc;Well, sorry, I... got frightened for a moment. I mean I decided I gonna give it a go and try it but it seems it is not my thing at all.@@ You try to smooth it out @@.pc;Oh, I understand it is not for everyone.@@ After some short discussion about tastes and personal preferencies you feel that <<= aw.date.name>> feels better and don't observe as some kind of a freak.<</if>>",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "spank",
          label: "Spank",
          info: "Make this butt red!",
          twee: `<<script>>
          State.active.variables.nonConSpanking = {
            passage: "nonConSpanking",
            content: "",
            image: "IMG-CanedAss",
            topImage: "IMG-CanedAssTop",
            title: "Caning",
            allowSave: false,
            sidebar: "<h2>Your home</h2>",
            showTime: false,
            allowMenu: false,
          };
          <</script>><<arouse 2>><<set aw.date.npc.clothes.worn.bottom = "off">><<set aw.date.npc.clothes.worn.panties = "off">>You take your time walking around <<= aw.date.name>> and enjoying <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> helpless state before finally stopping to brush delicious <<= aw.date.name>>'s butt through the clothes. @@.pc;Somebody was a really bad toy, mm?@@ Without waiting for an answer you yank <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> clothes down exposing <<= aw.date.name>>'s butt and giving it a juicy slap. <<if aw.date.npc.kink.sub>><<set aw.date.enjoy[1] += 19>><<set aw.date.arouse += 23>>@@.npc;Ah!@@ You glance over and see <<= aw.date.name>> biting <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> lip and smile. @@.mono;Showitme, he-he!@@<p>@@.rumble;Slap!@@<br>@@.rumble;Slap!@@<br>@@.rumble;Slap!@@</p><p>Hits are falling onto <<= aw.date.name>>'s ass in a steady yet intensive pace and it doens't take long until you hear <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> starts sobbing with each slap through <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> lips. @@.npc;Ah!@@</p><p>As <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> butt gets pink and then red you make every spank harder until your own hand starts to ache. <<= aw.date.name>>'s breathing gone deep and slow and you when you stop and go around to see <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> face you are pretty sure <<if aw.npc[aw.date.npcid].main.female>>she<<else>>he<</if>> got into trance-like state from the punishment. It takes a minute or two until <<= aw.date.name>> get's floats back to the surface and is able to smile to you back.</p><<else>><<= aw.date.name>> tries to enjoy it but it seems it is not <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> thing at all. You spank <<if aw.npc[aw.date.npcid].main.female>>her<<else>>his<</if>> ass a couple more times and sharp pain makes <<= aw.date.name>> to react. @@.npc;Goddamit, <<= ↂ.pc.main.name>>, what a fuck? I thought this will be kinky and hot but damn, I am not into all this sado things for real! Let me out!@@ For a moment you consider the possibilities since <<= aw.date.name>> can't actually do anything to get free without you unlocking the stocks.<br><<set aw.date.enjoy[1] -= 9>><<set aw.date.qual -= 6>><<set aw.date.arouse -= 10>><br><br><<button "Stop and release">><<scenego "DateLeaveDatespotHome">><</button>><<button "Ignore it and continue">><<set aw.date.enjoy[0] = 1>><<set $spankNpc = aw.date.npcid>><<status 0>><<run setup.date.end()>><<run setup.scenario.launch($nonConSpanking);>><</button>><</if>>`,
          check() {
              return true;
          },
          prep() {
            aw.S();
            return true;
          },
          gate: ["domsub", "bondage", "sadomasochism"],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate", "sex", "violence"]],
      type: "yourhome",
      check() {
        if (aw.date.dateType === "yourhome" && (ↂ.home.item.living.indexOf("Stocks") !== -1 || ↂ.home.item.bedroom.indexOf("Stocks") !== -1 || ↂ.home.item.bed2.indexOf("Stocks") !== -1 || ↂ.home.item.bedroom.indexOf("Stocks") !== -1)) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      key: "stocks2",
      name: "play with the stocks",
      shortDesc: "Ask to be put into stocks",
      loc: ["home", "bedroom", false],
      topImg: "IMG-HomeStocksBig",
      img: "IMG-HomeStocksDate",
      desc: "Ask <<= aw.date.name>> to be put into stocks for some hot bdsm action.",
      arrivalText: `<<if aw.date.npc.kink.dom>>@@.npc;I think somebody's butt need some punishment. Get in your stocks, little whore!@@<<else>>@@.npc;Oh, I am not that sure to be honest... <<if aw.date.npc.rship.dates === 0>>I mean I am not much into all this sadomasochistic stuff... But if you really like to... you had this whole thing in your flat I had no idea about after all...<</if>> Okay, let's do it I guess, but don't expect much from me he-he.@@<</if>> You put your hands and neck into round cutouts and <<= aw.date.name>> puts the heavy upper part effectively locking you in place and you gasp with arousal.<<arouse 2>>`,
      departText: "<<= aw.date.name>> removeы the lock and lift the upper piece, freeing your arms and neck from the restraint. You can't but sigh with relief carefully massaging your tired limbs.<<if setup.interactionMisc.isDom[aw.date.npcid] || aw.date.npc.kink.sub>>@@.pc;Thank you!@@ @@.npc;My pleasure, pet, heh.@@<</if>>",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "spanked",
          label: "Ask to be spanked",
          info: "Politely ask to be punished like a bad girl you are.",
          twee: `<<run setup.clothes.remove("bottom")>><<run setup.clothes.remove("panties")>>Not written yet, sorry!`,
          check() {
              return true;
          },
          prep() {
            aw.S();
            return true;
          },
          gate: ["domsub", "bondage", "sadomasochism"],
          ai: [],
        },
      ],
      aiTags: [["actLover", "intimate", "sex", "violence"]],
      type: "yourhome",
      check() {
        if (aw.date.dateType === "yourhome" && (ↂ.home.item.living.indexOf("Stocks") !== -1 || ↂ.home.item.bedroom.indexOf("Stocks") !== -1 || ↂ.home.item.bed2.indexOf("Stocks") !== -1 || ↂ.home.item.bedroom.indexOf("Stocks") !== -1)) {
          return true;
        } else {
          return false;
        }
      },
    },
  ];
  for (const spot of spots) {
    aw.dateSpots[spot.key] = new DateSpot(spot as DateSpotData);
  }
})();









