
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
      aw.date.convoText = setup.date.tagText(aw.date.convoTag, aw.date.name);
      output += `<p>${aw.date.convoText}</p>`;
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
      if (aw.date.askIt && random(1, 3) === 3) {
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
    let output = `<center><h3>Activity Choices</h3><div id="dateSpotActivityButtons"><<hovrev cuckold>><<button "FOLLOW ${aw.date.name.toUpperCase()}">><<run setup.date.activity("npc")>><</button>><</hovrev>>`;
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
    output += `<<hovrev complement>><<button "COMPLEMENT">><<run setup.date.saySomething("comp")>><</button>><</hovrev>><<hovrev sexy>><<button "SEXY">><<run setup.date.saySomething("sexy")>><</button>><</hovrev>><<hovrev rom>><<button "ROMANTIC">><<run setup.date.saySomething("rom")>><</button>><</hovrev>><<hovrev deep>><<button "DEEP">><<run setup.date.saySomething("deep")>><</button>><</hovrev>><<hovrev prop>><<button "SERIOUS">><<scenego "DateSpotSerious">><</button>><</hovrev>>`;
    desc += `<<hovins complement>>Compliment your date.<</hovins>><<hovins sexy>>Say something sexy.<</hovins>><<hovins rom>>Say something romantic.<</hovins>><<hovins deep>>Say something deep (or try to).<</hovins>><<hovins prop>>It's time for a serious subject, such as progressing your relationship or breaking up.<</hovins>>`;
    output += `<<hovrev leavewhyf>><<button "LEAVE">><<scenego "DateLeaveDatespot">><</button>><</hovrev>>`;
    desc += `<<hovins leavewhyf>>Leave this date spot and go to another, or end the date.<</hovins>>`;
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
          twee: `<span id="buylink">@@.pc;<<= aw.date.name>>, some beer maybe?@@<<if ↂ.pc.status.alcohol < 6>><br><br>@@.npc;Of course, I would like it!@@<br><br><<else>><br><br>@@.npc;Are you sure you hadn't got enough already?@@<br><br>@@pc;Just one more glass!@@<br><br><</if>>Calling the waitress you ask her for a beer card. <<= aw.date.name>> gets a glass first and you look at the menu trying to get what beer <<link "you actually want.">><<dialog "Hinden Burger Beer">><<print setup.food.bar("hindenburger")>><</dialog>><<replace "#buylink">><<addtime 18>>Waitress brings your glasses full of beer. You clink your glasses and smile, the beer <<print either("tastes very good", "is pretty nice")>>.<br><br>@@.pc;Cheers!@@<br><br>@@.npc;He-he, cheers!@@<br><br>As you sip from your glass you feel warmth spreading through your body and making you more talkative than usual. You decide to ask <<= aw.date.name>> something.<<print setup.storythread.getStory(aw.date.npcid)>><</replace>><</link>></span>`,
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
    },
    {
      key: "foodcourt",
      name: "Food court",
      shortDesc: "The foodcourt area in Applewood mall.",
      loc: ["downtown", "mall", "foodcourt"],
      topImg: "IMG-Foodcourt-Inside",
      img: "IMG_Applewood-Mall",
      desc: `The spatious area have a lot variety of fastfood places with some lines before most of them.`,
      arrivalText: `Currently <<print either("most tables are empty and you take one.", "most tables are occypied and it takes some time to find a free one for you.")>>`,
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
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "crowd", "crude", "eat"]],
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
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "intimate", "fancy", "eat"]],
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
          twee: `Not sure what is the best choice you stick to some noodles with <<print either("prawns", "something slimy", "various seafood", "some green seaweeds", "odd looking tentacles, Old Dong special")>>. <<= aw.date.name>> decides to take <<print either("sour-sweet pork ribs", "prawn salad", "seafood plate", "same dish")>>. After some wait chief rings the small bell and you get your food.The food <<print either("is pretty good", "is not that tasty", "is odd and foreign for your tastes", "tastes awful")>>. <<if ↂ.pc.trait.intro>>You have a good laugh showing <<= aw.date.name>> most odd seafood parts you have found in your noodle box while eating it.<</if>> After <<print either("finishing your box", "eating the half", "digging into it with food sticks")>> you feel that at least that part of the dating is pretty much done.<<set $olddonghoDinner = true>><<addtime 27>>`,
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
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "sloppy", "eat"]],
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
      events: [
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
      ],
      activities: [
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
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "casual", "eat"]],
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
          key: "teatTreatsTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<if ↂ.pc.trait.intro>>You try to think about something to ask <<= aw.date.name> for some time.<<else>>You ask <<= aw.date.name>> about life.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><p>@@.pc;Oh, I see.@@</p><<addtime 16>>`,
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
          key: "shakenpopDance",
          label: "Dance",
          info: "Go to the dance floor and spend some time dancing to the beat together.",
          twee: `<<print either("Holding <<= aw.date.name>> by the hand", "Luring <<= aw.date.name>> with your finger", "Without saying a word")>> you both get right into the center of the dancefloor. Surrounded by the crowd you start dancing like you mean it with your bodies almost touching.<<SCX>><<SC "DA">><<if $SCresult[1]>>You are , and <<= aw.date.name>> seems to enjoy your mildly suggestive dancing becoming clearly aroused.<<set aw.date.enjoy[1] += 19>><<set aw.date.qual += 6>><<set aw.date.arouse += 10>><<else>>You are not that good on dancing tripping a couple of times and even hitting <<= aw.date.name>>'s nose with your elbow.<<set aw.date.enjoy[1] -= 19>><<set aw.date.qual += 6>><</if>>. Exhausted, you finally leave the dance floor to catch some fresh air.<<addtime 46>>`,
          check() {
            return true;
          },
          prep() {
            ↂ.pc.status.exercise += random(10, 20);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "shakenpopDrink",
          label: "Drink",
          info: "Go to the bar to drink something",
          twee: `<span id="buylink">@@.pc;Hey, <<= aw.date.name>> wanna drink something?@@<<if ↂ.pc.status.alcohol < 6>><br><br>@@.npc;Hm, why not. I'd go for some <<print either("Fickenmeister", "Beer", "Cocktail")>>!@@<br><br><<else>><br><br>@@.npc;Are you sure you hadn't got enough already?@@<br><br>@@pc;Hey, I am absolutely okay! Let's drink, don't be a pussy!@@<br><br><</if>>You go to the bar together to get some drinks. It seems bartender has some busy day with all the visitors and it takes you some time to finally order your drinks. <<= aw.date.name>> gets a glass first and you hesitate for a moment <<link "looking at the menu">><<dialog "Shake & Pop Bar">><<print setup.food.bar("shakepop")>><</dialog>><<replace "#buylink">><<addtime 18>>You take your drinks and go with <<= aw.date.name>> away from the crowd and loud dancefloor to the chillout zone. Despite of being divided by only one wall from the main area it is much more quiet here and you savor your drinks sitting on the red leather coach in front of the small coffee table. As you sip from your glass you feel warmth spreading through your body and making you more talkative than usual. You decide it is a right time to know <<= aw.date.name>> better.<<print setup.storythread.getStory(aw.date.npcid)>><</replace>><</link>>.</span>`,
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
          twee: `<<SCX>><<SC "SD" "50">>You move closer to <<= aw.date.name>> in a suggestive manner.<p>@@.pc;<<has exhibition || public>>I want you right here!<<or>>Well, maybe... you know... I just thought of doing some really nasty stuff right here...<</has>>@@</p>.<<if $SCresult[1] && aw.date.arouse > 60>><<if aw.date.npc.kink.exhibition || aw.date.npc.kink.public || aw.date.npc.kink.slut>>It seems, <<if aw.date.name.female>>she<<else>>he<</if>> is pleased by the idea. <p>@@.npc;Right here, where anybody can see us? Damn, I count me in!@@<p><<link "Rock'n Roll!">><<set aw.date.enjoy[1] += 19>><<sceneclose>><<gotomap "downtown" "park">><<set ↂ.sex.pcOutput = "You bit your lip in anticipation standing in front of <<= aw.date.name>>.">><<set ↂ.sex.enviroTags = ["public"]>><<startSex aw.date.npcid>><</link>><</if>><<else>><p>@@.npc;You must be kidding me? We are literally in the middle of the downtown! Everybody can see us! I am sure I am hot, but really, I can't shag in front of people not here!@@<<set aw.date.enjoy[1] -= 45>></p><</if>>`,
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
            aw.date.qual -= random(5, 9);
            aw.S();
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "nice", "play"]],
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
          twee: `<<addtime 30>><<dialog "Choose your gun">><<print either("You come to the reception with a ", "Approaching the reception you see a")>> <<print either("bearded middle-aged", "pretty girl with tattoos", "sturdy fit woman in a leather jacket")>> standing beneath.<br><br>@@.pc;Welcome to the "Hot loads"! Wanna shoot some today?@@<br><br>After greeting and short safety instructions you are proposed to choose a gun for target shooting. It seems they have some interesting choice of firearms there and you pause for a moment trying to figure out what you like to shoot today.<br><br>@@.npc;I guess I ll try <<print either("Gluck 69", "0.40 Rimmington", "Double action Cunt navy", "Pussberg 500 Pump-action", "Beawer M9")>> today. What will be your choice, mm?@@<br><br>@@.pc;Hmmm...@@<br><br>You take a look on the list again.<br><<button "Gluck 69">><<run Dialog.close()>><</button>><<button "0.40 Rimmington">><<run Dialog.close()>><</button>><<button "Double action Cunt navy">><<run Dialog.close()>><</button>><<button "Pussberg 500 Pump-action">><<run Dialog.close()>><</button>><<button "Beawer M9">><<run Dialog.close()>><</button>><</dialog>>After paying, you get your guns, headphones and a cardboard with rounds.<br><br>@@.npc;<<print either("Good luck and stay safe, folk!", "Have fun and don't dorget about safety!", "I hope you know how to handle this, have a nice time!")>>@@<br><br>You go to the range and take a stall next to <<= aw.date.name>>.<<SCX>><<SC "FA" 10>><<if $SCresult[1]>>After loading the gun you start shooting the paper target. <<SC "FA" 20>><<if $SCresult[2]>>You feel pretty confident and after shooting you evaluate your results as <<print either("good", "excellent", "mediocre but still okay")>><<happy 1 "Fun at the shooting range">><br><br>@@.npc;Wow, you are good at it! You are a natural-born shooter!@@<br><br>@@.pc;Thanks!@@<br><br><<stress -5 "Shooting a gun">><<else>>You are still not that familiar with firearms <<print either("so your results are average", "but your results are surprisingly good today", "so your results are mediocre")>><<stress -3 "Shooting a gun">><br><br>@@.npc;Hey, not bad!@@<br><br><</if>><<else>>It takes you a long time and some additional help from <<= aw.date.name>> to finally load and shoot your gun.<br><br>@@.npc;<<print either("It is okay, you just need some practice.", "It seems you are shooting for the first time, right?", "See, you need to pull the trigger softly, do not twitch...")>>@@<br><br>You feel warm breath on your cheek while <<= aw.date.name>> instructs you how to hold a gun. After shooting you evaluate your results and it seems <<print either("you miss most of the time", "you hit the target 3 or 4 times", "somehow you managed to hit the target with more than a half of bullets")>>.<</if>> It seems that <<= either("you was more successful than", "you did worse than", "you got the same results as")>> <<= aw.date.name>>. Still slightly stunned by loud shots you go upstairs and leave the range.`,
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
      quality: 3,
      events: [],
      activities: [
        {
          key: "bowlingPlay",
          label: "Play",
          info: "Go and play s together.",
          twee: `<<addtime 53>>You book the lane and start playing. <<SCX>><<SC "AT" 18>><<if $SCresult[1]>>You are pretty confident with your bowling skills and beat <<= aw.date.name>> easily with more than half of your attempts being strikes.<br><br>@@.npc;Wow, where have you learned to play so good?!@@<br><br><<else>>You feel not that confident with playing and <<= aw.date.name>> <<= either("wins", "almost wins")>>.<br><br>@@.npc;Nice game, you was doing great!@@<br><br>@@.pc;Thanks!@@<br><br><</if>>`,
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
      ],
      aiTags: [["actLover", "neutEthic", "neutral", "group", "casual", "play"]],
    },
  ];
  for (const spot of spots) {
    aw.dateSpots[spot.key] = new DateSpot(spot as DateSpotData);
  }
})();











