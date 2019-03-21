
// ██╗  ██╗ █████╗ ███╗   ██╗ ██████╗  ██████╗ ██╗   ██╗████████╗    ███████╗██████╗  ██████╗ ████████╗███████╗
// ██║  ██║██╔══██╗████╗  ██║██╔════╝ ██╔═══██╗██║   ██║╚══██╔══╝    ██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝
// ███████║███████║██╔██╗ ██║██║  ███╗██║   ██║██║   ██║   ██║       ███████╗██████╔╝██║   ██║   ██║   ███████╗
// ██╔══██║██╔══██║██║╚██╗██║██║   ██║██║   ██║██║   ██║   ██║       ╚════██║██╔═══╝ ██║   ██║   ██║   ╚════██║
// ██║  ██║██║  ██║██║ ╚████║╚██████╔╝╚██████╔╝╚██████╔╝   ██║       ███████║██║     ╚██████╔╝   ██║   ███████║
// ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝       ╚══════╝╚═╝      ╚═════╝    ╚═╝   ╚══════╝


interface AWhangSpots {}

aw.hangSpots = {};

/*
  NOTE ON InthangSpotEvent & InthangSpotActivity
  the check and prep values can be declared below as a string "function(){blyat; return true;}"
  OR as a proper function. We may convert them all to strings later for performance reasons, but for
  linting purposes going with a standard function is likely best to avoid bestisms.
*/

interface IntHangSpotEvent {
  key: string;  // identifier for event. Used to build hang flags, so must be unique w/ activities too.
  check: () => boolean; // function checks to see if event can happen.
  twee: string; // text to display in hang scenario, full twee to describe events and make choices if needed.
                // use a passage with name "DSP-passageName" to load a normal passage instead.
  prep: () => boolean; // bonus function to do things w/ js when event is played, performed BEFORE the twee is ran.
  gate: string[];
}

interface IntHangSpotActivity {
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

interface HangSpotData {
  key: string; // obvious... however, items are sorted alphabetically by this key, so be representative.
  name: string; // proper name of the location
  check?: () => boolean; // check to see if the location is available, used for excluding things based on time or other conditions.
  shortDesc: string; // short description used for choosing a Hang spot
  loc: string|boolean[]; // standard map.loc array ex: ["downtown", "east"]
  topImg: string; // banner image depicting the view at the location, similar to map location images
  img: string; // image used in Hang spot choosing for the print() method
  desc: string; // description of the location suitable for inclusion in the location info as well as the main text.
  arrivalText: string; // twee, arrival text describes your arrival at the location, and is the opening text for the Hang spot can use a passage that starts with DSP as well.
  departText: string; // text describing your departure, can be twee, not as prominent as arrival.
  category: string; // category the location fits into. "restaurant" "activity" "other"
  quality: number; // the quality of the location. is it more cheap/slummy or high class. 1 to 5. 1 is low quality, like fast food. 5 is an elegant restaurant. quality does not necessarily correspond to being a good place, more like fanciness.
  events: IntHangSpotEvent[]; // array of events, which will be turned into an object when initialized.
  activities: IntHangSpotActivity[]; // array of activities, which will be turned into an object as well
  aiTags: string[][]; // initial array in the array is used for the location itself, 'fancy' 'crowded' etc. others are optional if used for certain events/activities.
}

class HangSpot {
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
    [propname: string]: IntHangSpotEvent;
  };
  public activities: {
    [propname: string]: IntHangSpotActivity;
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
  }: HangSpotData) {
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
    return `<div id="date-spot-print" onclick="window.SugarCube.Engine.link(&quot;hang.sel('${this.key}')&quot;)"><img data-passage="${this.img}"><b>${this.name}</b><br>${this.shortDesc} <span class="yellow">${setup.stars(this.quality)}</span></div>`;
  }
  public setFlags(): void {
    aw.hang.flag[this.key] = {};
    const keys = Object.keys(this.activities);
    keys.concat(Object.keys(this.events));
    for (const key of keys) {
      aw.hang.flag[this.key][key] = false;
    }
  }
  public arrive(): void {
    this.setFlags();
    aw.replace("#Scene-Title", this.name);
    aw.replace("#Scene-Image-Top", `<img data-passage="${this.topImg}">`);
    aw.hang.spots.push(this.key);
    aw.hang.spot = this.key;
    if (this.category === "restaurant") {
      aw.hang.ate = true;
    }
    setup.map.nav(...this.loc);
    // TODO adjust hang quality
    let qq = 0;
    for (let i = 0; i < this.quality; i++) {
      qq += random(1, 3) + random(0, 1);
    }
    const tq = qq - 6;
    aw.hang.qual += tq;
    // TODO process NPC reaction (async?)
    aw.hang.enjoy[1] += (random(0, 8) - 3);
    aw.hang.enjoy[0] += (random(0, 3) - 1);
    aw.hang.arouse += (random(0, 5) - 2);
    if (aw.hang.enjoy[1] > 49 && aw.hang.qual > 40) {
      aw.hang.arouse += random(2, 4);
    } else if (aw.hang.enjoy[1] > 49) {
      aw.hang.arouse += random(1, 3);
    }
    let output = (this.arrivalText.slice(0, 3) === "DSP") ? `<<include [[${this.arrivalText}]]>>` : this.arrivalText;
    try {
      let tag = setup.cTag.getTag(3, false);
      let cunter = 0;
      while (tag !== "none" && aw.hang.convoHist.includes(tag)) {
        tag = setup.cTag.getTag(3, false);
        cunter++;
        if (cunter > 5) {
          tag = "none";
          break;
        }
      }
      aw.hang.convoTag = tag;
      aw.hang.convoText = setup.hang.tagText(aw.hang.convoTag, aw.hang.name);
      output += `<p>${aw.hang.convoText}</p>`;
    } catch (e) {
      aw.con.warn(`Error with convotag content retrieval somewhere... ${e.name}: ${e.message}`);
    }
    output += this.buttonGen();
    setup.scenario.replace(output);
    aw.con.info(`Arrived at hang spot ${this.name}.`);
    const lon = random(5, 12) * -1;
    setup.status.lonely(lon);
    if (aw.hang.enjoy[0] > 35 && aw.hang.arouse > 24) {
      setup.status.arousal(1);
      const hap = Math.max(0, (random(1, 3) - 2));
      if (hap > 0) {
        setup.status.happy(hap);
      }
    } else if (aw.hang.enjoy[0] < 35 || aw.hang.enjoy[1] < 35) {
      setup.status.happy(-1);
    }
  }
  public allowedActs(): string[] {
    const keyo: string[] = [];
    const keys = Object.keys(this.activities);
    for (let i = 0, c = keys.length; i < c; i++) {
      const ᚥ = this.activities[keys[i]];
      if (!aw.hang.flag[this.key][ᚥ.key] || ᚥ.repeatable) {
        if (!setup.gate(ᚥ.gate) && ᚥ.check()) {
          keyo.push(ᚥ.key);
        }
      }
    }
    return keyo;
  }
  public buttonGen(): string {
    let output = `<h3>Activity Choices</h3><div id="dateSpotActivityButtons"><<hovrev cuckold>><<button "FOLLOW ${aw.hang.name.toUpperCase()}">><<run setup.hang.activity("npc")>><</button>><</hovrev>>`;
    let desc = `<div id="dateSpotActivityButtHover"><<hovins cuckold>>Let ${aw.hang.name} decide what to do.<</hovins>>`;
    const keys = Object.keys(this.activities);
    for (let i = 0, c = keys.length; i < c; i++) {
      const ᚥ = this.activities[keys[i]];
      if (!aw.hang.flag[this.key][ᚥ.key] || ᚥ.repeatable) {
        if (!setup.gate(ᚥ.gate) && ᚥ.check()) {
          output += `<<hovrev ${ᚥ.key}>><<button "${ᚥ.label.toUpperCase()}">><<run setup.hang.activity("${ᚥ.key}")>><</button>><</hovrev>>`;
          desc += `<<hovins ${ᚥ.key}>>${ᚥ.info}<</hovins>>`;
        }
      }
    }
    output += `<<hovrev joke>><<button "JOKE">><<run setup.hang.saySomething("joke")>><</button>><</hovrev>><<hovrev deep>><<button "DEEP">><<run setup.hang.saySomething("deep")>><</button>><</hovrev>>`;
    desc += `<<hovins joke>>Say something funny.<</hovins>><<hovins deep>>Say something deep (or try to).<</hovins>>`;
    output += `<<hovrev leavewhyf>><<button "LEAVE">><<scenego "HangLeaveHangspot">><</button>><</hovrev>>`;
    desc += `<<hovins leavewhyf>>Leave this place and go to another, or end the hangout.<</hovins>>`;
    output += "</div>";
    output += desc + "</div>";
    return output;
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
          twee: `The waitress dressed in oktoberfest-styled garments approaches your stall to take your order. You decide to order some <<print either("Kaiser burger", "Blitzkrieg burger", "Bratwurst", "Special bacon Hindenburger", "Potato salad")>> and <<= aw.hang.name>> goes for <<print either("Red Baron hotdog", "Pork ribs with K98 sauce", "Kriegssteak", "the same dish")>>. <<print either("After some waiting", "Almost immediately")>> waitress brings your plates and three cups of different mustard. <<has cl>>You prefer to keep silent while eating having troubles with coming up with appropriate theme of conversation and just enjoying the company<<or>>You start a small talk discussing <<print either("recent news", "upcoming movies", "<<= aw.hang.name>>'s life last days")>>.<</has>>The food <<print either("is delicious", "is pretty mediocre", "tastes odd", "tastes awful")>>. After <<print either("finishing the dish", "eating the half", "giving up on the dish after some struggling.")>> you feel that you had enough.<<addtime 48>>`,
          check() {
              return true;
          },
          prep() {
            State.active.variables.luterusDinner = false;
            aw.cash(random(-15, -30), "food");
            aw.hang.enjoy[1] += random(3, 7);
            aw.hang.qual += random(7, 12);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "hindenburgerBeer",
          label: "Order beer",
          info: "Decide what beer you want.",
          twee: `<span id="buylink">@@.pc;Hey, <<= aw.hang.name>> wanna drink something?@@<<if ↂ.pc.status.alcohol < 6>><br><br>@@.npc;Hm, why not. I'd go for some beer! I heard they have a wide choice here!@@<br><br><<else>><br><br>@@.npc;Are you sure you hadn't got enough already?@@<br><br>@@pc;Hey, you are not my mom! Let's get drunk!@@<br><br><</if>>Calling the waitress you ask her for a beer card. <<= aw.hang.name>> gets a glass first and you look at the menu trying to get what beer <<link "you actually want.">><<dialog "Hinden Burger Beer">><<print setup.food.bar("hindenburger")>><</dialog>><<replace "#buylink">><<addtime 18>>Waitress brings your glasses full of beer. You clink your glasses and smile, the beer <<print either("tastes very good", "is pretty nice")>>. As you sip from your glass you feel warmth spreading through your body and making you<<if ↂ.pc.trait.extro>> even<</if>>more talkative than usual. You decide to ask <<= aw.hang.name>> something.<<print setup.storythread.getStory(aw.hang.npcid)>><</replace>><</link>></span>.`,
          check() {
              return true;
          },
          prep() {
            aw.hang.enjoy[1] += random(4, 9);
            aw.hang.qual += random(4, 6);
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
          twee: `<<has op>>You start a convo, asking <<= aw.hang.name>> about their life.<<or>><<= aw.hang.name>> starts a conversation and you happily catch to the topic.<</has>><<print setup.storythread.getStory(aw.hang.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.hang.enjoy[1] += random(1, 4);
            aw.hang.qual += random(0, 3);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
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
            aw.hang.enjoy[1] += random(1, 4);
            aw.hang.qual += random(2, 4);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "foodcourtTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<has op>>You start a convo, asking <<= aw.hang.name>> about their life.<<or>><<= aw.hang.name>> starts a conversation and you happily catch to the topic.<</has>><<print setup.storythread.getStory(aw.hang.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.hang.enjoy[1] += random(1, 4);
            aw.hang.qual += random(0, 3);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
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
      events: [],
      activities: [
        {
          key: "luterusDinner",
          label: "Order food",
          info: "Make a choice and order some ridiculously expensive food.",
          twee: `You decide to order some <<print either("baked bear paws with tomato sauce", "prairy oysters", "préservatif soupe", "frog legs", "cuisses de salope")>> and <<= aw.hang.name>> goes for <<print either("cornée truie", "taureau bite", "foie gras", "same dish")>>. After a while the waitress brings your food, which is decorated so heavily it looks more like a piece of art than actual food. You both try to figure out the best way to eat your dish using the wide range of forks and spoons provided on the both sides of your plates. <<if ↂ.pc.trait.intro>>You feel a bit anxious about lacking skills of high cuisine consuming so keep silent most of the time.<<else>>You manage to make some funny joke about the shape of one really weird spoon and you have some good laughs.<</if>> The food <<print either("is delicious", "is pretty mediocre for such price", "tastes odd and foreign to you", "tastes awful")>>. After <<print either("finishing the dish", "eating the half", "giving up on the dish after some struggling.")>> you feel that you had enough.<<addtime 48>>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-20, -45), "food");
            aw.hang.enjoy[1] += random(3, 7);
            aw.hang.qual += random(10, 15);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "luterusWine",
          label: "Order wine",
          info: "Decide what wine you want to order.",
          twee: `You spend some time browsing trough the wine card together. <<if ↂ.pc.trait.crude == -1>>You know things about explain the differnces between various types and tastes for some time before proposing some good <<print either("chianti", "prosecco", "sauvignon")>>.<<= aw.hang.name>> agrees overhelmed by your knowledge and commpetence.<<else>>You have no idea what is the difference between most of the options and just stick to the cheapest <<print either("white wine", "red wine", "rose wine", "champagne")>> you can find in the card.<</if>> After the waitress brings and opens the bottle you clink glasses and savor the wine. It <<print either("tastes surprsingly good", "tastes pretty much the way you expected", "tastes odd and you are not sure if you like it or not")>>. After the third glass you start feeling a bit dizzy<<if ↂ.pc.trait.intro>> and feel that it got much easier for you to talk and joke freely<</if>><<addtime 24>>.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-15, -40), "food");
            aw.hang.enjoy[1] += random(4, 9);
            aw.hang.qual += random(12, 15);
            setup.food.drink("priceyWine");
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
          twee: `<<if ↂ.pc.trait.intro>>You struggle with starting a proper conversation trying your best to find a topic to talk about. To your relief, <<= aw.hang.name>> break the silence before it gets too awkard.<<else>>You feel pretty comfortable starting a chat with <<= aw.hang.name>> and discuss things.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.hang.enjoy[1] += random(2, 5);
            aw.hang.qual += random(6, 9);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
    },
    {
      key: "olddongho",
      name: "Old Dong Ho",
      shortDesc: "Local seafood place.",
      loc: ["downtown", "northeast", false],
      topImg: "IMG-Restaurant-OldDongHo-Inside",
      img: "IMG-Restaurant-OldDongHo",
      desc: `Seafood and wok restaurant is dark and noisy. Prices on the chalkboard menu above the bar looks pretty cheap and the big sign says "We guarantee good quality! No complains on quality for more than 10 years!"`,
      arrivalText: "You arrive at the place and take a seat at the small table in dark crowded restaurant. It takes some time until you realise that there are no waiters and you need to make order yourself at the bar.",
      departText: "You leave the place.",
      category: "restaurant",
      quality: 1,
      events: [],
      activities: [
        {
          key: "olddonghoDinner",
          label: "Order food",
          info: "Go to bar and order something.",
          twee: `Not sure what is the best choice you stick to some noodles with <<print either("prawns", "something slimy", "various seafood", "some green seaweeds", "odd looking tentacles, Old Dong special")>>. <<= aw.hang.name>> decides to take <<print either("sour-sweet pork ribs", "prawn salad", "seafood plate", "same dish")>>. After some wait chief rings the small bell and you get your food.The food <<print either("is pretty good", "is not that tasty", "is odd and foreign for your tastes", "tastes awful")>>. <<if ↂ.pc.trait.intro>>You have a good laugh showing <<= aw.hang.name>> most odd seafood parts you have found in your noodle box while eating it.<</if>> After <<print either("finishing your box", "eating the half", "digging into it with food sticks")>> you feel pretty full.<<addtime 27>>`,
          check() {
              return true;
          },
          prep() {
            State.active.variables.olddonghoDinner = false;
            aw.cash(random(-6, -9), "food");
            aw.hang.enjoy[1] += random(2, 7);
            aw.hang.qual -= random(1, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "olddonghoBeer",
          label: "Beer",
          info: "Go to the bar to get some beer",
          twee: `You find that the place have only one beer, "Spirit of Wisconsin" which is pretty weird for a chinese place. Getting two bottles you return to <<= aw.hang.name>>. <<if ↂ.pc.trait.crude == -1>>The beer tastes terrible and it seems, <<= aw.hang.name>> thinks so too.<br><br>@@.npc;Why we ever came to this terrible place?@@<br><br>@@.pc;Mmm, I am asking myself the same question to be honest.@@<<elseif ↂ.pc.trait.crude == 1>>The beer is right in your taste - cheap and hits right in the head.<<else>>You are pretty sure that you have tried better beer in your life than this one.<</if>><<addtime 18>>.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(-4, "food");
            aw.hang.enjoy[1] += random(4, 7);
            aw.hang.qual -= random(1, 6);
            setup.food.drink("beer");
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
            aw.hang.enjoy[1] += random(2, 5);
            aw.hang.qual -= random(0, 4);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
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
      category: "restaurant",
      quality: 3,
      events: [
        {
          key: "happyCreamDonut",
          label: "Doughnuts and drinks",
          info: "Order some sweet-stuff.",
          twee: `You both spend some time at the shelf with various doughnuts trying to choose some. Finally you both make a decision, <<= aw.hang.name>> goes first and takes <<print either("strawberry", "plain", "vanilla")>> dougnut with <<print either("special cream topping", "banana cream topping", "moist cream topping")>> and you go with <<print either("same choice", "same topping but on chocolate doughnut", "same doughnut but with mapple syrope topping")>>. You both grab a cup of coffee and start savoring the delicious treat which tastes <<print either("amazing", "magnificent", "unbelieveably good", "delightful")>>. After a while you finished your desserts and just happy and calmly sitting being pretty satisfied with yourselves.<<addtime 17>>`,
          check() {
            return true;
          },
          prep() {
            ↂ.pc.status.addict.cum += 1;
            ↂ.pc.status.addict.cumNeed = 0;
            State.active.variables.happyCreamDonut = false;
            aw.cash(random(-6, -9), "food");
            aw.hang.enjoy[1] += random(4, 14);
            aw.hang.qual += random(4, 9);
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
          twee: `<<if ↂ.pc.trait.intro>>You struggle with starting a proper conversation trying your best to find a topic to talk about. To your relief, <<= aw.hang.name>> break the silence before it gets too awkard.<<else>>You feel pretty comfortable starting a chat with <<= aw.hang.name>> and discuss things.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.hang.enjoy[1] += random(2, 5);
            aw.hang.qual += random(2, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
    },
    {
      key: "teatTreats",
      name: "Teat treats ice cream",
      shortDesc: "An icecream place using all-natural 100% human milk.",
      loc: ["downtown", "southeast", false],
      topImg: "IMG-TeatsTreats-Inside",
      img: "IMG-Restaurant-TeatTreats",
      desc: "The well-lit place is divided by booth with tables where you can get icecream made fresh from the teat in an icecream machine which topless hucows waitress carry around.",
      arrivalText: "You enter the Teat Treats and take a seat in on e of the booths.",
      departText: "You leave the place..",
      category: "restaraunt",
      quality: 4,
      events: [],
      activities: [
        {
          key: "teatTreatsIcecream",
          label: "Icecream",
          info: "Ask a waitress for an Icecream.",
          twee: `You call a hucow passing by for an icecream. With a courteous smile she approach you booth and hand you the menu. After researching it for some time you and <<= aw.hang.name>> make a choice. You decide to order <<print either("vanilla", "chocolate", "banana")>> icecream. Nodding, the girl gets the icecream machine on and start milking her impressive udders with a suction pumps. She seems to enjoy the process a lot judging by her face.<<if ↂ.pc.body.lactation > 4>><br><br>@@.mono;I think I could do it faster, this girl can barely give any milk. But maybe it was a just too many customers today already?@@<br><br><</if>> When she fills the machine she press some buttons and the device rumbles quitly while processing the milk and adding additional ingredients. In about two minutes she hands you your icecream and leave your booth still smiling with subsiding delight. The treat tastes <<print either("pretty good", "good", "nice", "a bit odd and you start suspecting that hucow serving you is a heavy smoker")>>. After a while you finished your desserts and just happy and calmly sitting being pretty satisfied with yourselves.<<set $teatTreatsIcecream = true>><<addtime 17>>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-9, -14), "food");
            aw.hang.enjoy[1] += random(6, 12);
            aw.hang.qual += random(5, 10);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "teatTreatsTalk",
          label: "Talk",
          info: "Have a nice chit-chat about things.",
          twee: `<<if ↂ.pc.trait.intro>>You try to think about something to ask <<= aw.hang.name> for some time.<<else>>You ask <<= aw.hang.name>> about life.<</if>><<print setup.storythread.getStory(aw.date.npcid)>><p>@@.pc;Oh, I see.@@</p><<addtime 16>>`,
          check() {
              return true;
          },
          prep() {
            aw.hang.enjoy[1] += random(2, 5);
            aw.hang.qual += random(2, 6);
            return true;
          },
          gate: [],
          ai: [],
          repeatable: true,
        },
      ],
      aiTags: [[]],
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
          twee: `<<addtime 126>><p>@@.npc;What movies would you like to watch?@@</p><p>@@.pc;Well...@@</p>After watching the posters you discuss possible choices for some time before finally deciding to go to watch "<<print either("Dong of the Dead", "Sexorcist", "Ejacula", "Cockfest", "SpaceOrgy", "Uncle Fuck", "Fill Bill", "Ice dildo")>>". You pay your tickets and go to grab some popcorn. <<print either("Luckily, it is just about 5 minutes before film starts so you don't need to wait","The film starts in about 20 minutes so you need to wait.")>> Entering the movie theatre you find your seats and and wait for the lights go out. As usual you are forced to watch ridiculous amount of advertisment and trailers for upcoming movies before finally the movie itself begins. After about an hour you realize that you actually <<print either("like the film","don't like the film very much","feel pretty so-so about the film")>> and <<= aw.hang.name>> seems to <<print either("enjoy the movie.", "be bored.")>>. When titles starts you blink from the lights and get up from the chairs discussing your impressions.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-15, -20), "misc");
            aw.hang.enjoy[1] += random(5, 10);
            aw.hang.qual += random(3, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
    },
    {
      key: "firingrange",
      name: "Hot loads",
      shortDesc: "A firing range, the only one in the city as far as you know.",
      loc: ["downtown", "amuse", false],
      topImg: "IMG-HotLoads-Inside",
      img: "IMG_HotLoads",
      desc: "A firing range consist of the small reception and waiting area with armory and a spacious range hall in the basement.",
      arrivalText: "You arrive at the place and go to the reception with <<= aw.hang.name>>.",
      departText: "You leave the place.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "firingrangeShoot",
          label: "Shoot",
          info: "Go and shoot some targets together.",
          twee: `<<addtime 30>><<dialog "Choose your gun">><<print either("You come to the reception with a ", "Approaching the reception you see a")>> <<print either("bearded middle-aged", "pretty girl with tattoos", "sturdy fit woman in a leather jacket")>> standing beneath.<br><br>@@.pc;Welcome to the "Hot loads"! Wanna shoot some today?@@<br><br>After greeting and short safety instructions you are proposed to choose a gun for target shooting. It seems they have some interesting choice of firearms there and you pause for a moment trying to figure out what you like to shoot today.<br><br>@@.npc;I guess I ll try <<print either("Gluck 69", "0.40 Rimmington", "Double action Cunt navy", "Pussberg 500 Pump-action", "Beawer M9")>> today. What will be your choice, mm?@@<br><br>@@.pc;Hmmm...@@<br><br>You take a look on the list again.<br><<button "Gluck 69">><<run Dialog.close()>><</button>><<button "0.40 Rimmington">><<run Dialog.close()>><</button>><<button "Double action Cunt navy">><<run Dialog.close()>><</button>><<button "Pussberg 500 Pump-action">><<run Dialog.close()>><</button>><<button "Beawer M9">><<run Dialog.close()>><</button>><</dialog>>After paying, you get your guns, headphones and a cardboard with rounds.<br><br>@@.npc;<<print either("Good luck and stay safe, folk!", "Have fun and don't dorget about safety!", "I hope you know how to handle this, have a nice time!")>>@@<br><br>You go to the range and take a stall next to <<= aw.hang.name>>.<<SCX>><<SC "FA" 10>><<if $SCresult[1]>>After loading the gun you start shooting the paper target. <<SC "FA" 20>><<if $SCresult[2]>>You feel pretty confident and after shooting you evaluate your results as <<print either("good", "excellent", "mediocre but still okay")>><<happy 1>><br><br>@@.npc;Wow, you are good at it! You are a natural-born shooter!@@<br><br>@@.pc;Thanks!@@<br><br><<stress -5>><<else>>You are still not that familiar with firearms <<print either("so your results are average", "but your results are surprisingly good today", "so your results are mediocre")>><<stress -3>><br><br>@@.npc;Hey, not bad!@@<br><br><</if>><<else>>It takes you a long time and some additional help from <<= aw.hang.name>> to finally load and shoot your gun.<br><br>@@.npc;<<print either("It is okay, you just need some practice.", "It seems you are shooting for the first time, right?", "See, you need to pull the trigger softly, do not twitch...")>>@@<br><br>After shooting you evaluate your results and it seems <<print either("you miss most of the time", "you hit the target 3 or 4 times", "somehow you managed to hit the target with more than a half of bullets")>>.<</if>> It seems that <<= either("you was more successful than", "you did worse than", "you got the same results as")>> <<= aw.hang.name>>. Still slightly stunned by loud shots you go upstairs and leave the range.`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-20, -25), "misc");
            aw.hang.enjoy[1] += random(9, 14);
            aw.hang.qual += random(3, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
    },
    {
      key: "bowling",
      name: "Happy Balls",
      shortDesc: "A bowling place, good ol' way to chill out with friends or coworkers.",
      loc: ["downtown", "amuse", false],
      topImg: "IMG-HappyBalls-Inside",
      img: "IMG-Activity-HappyBalls",
      desc: "A bowling place is basically a big hall with a small snack bar on the left and about 6 or 7 lanes for playing.",
      arrivalText: "You arrive at the place, it seems there are some free tracks so you go straight to the manager to book one for you and <<= aw.hang.name>>.",
      departText: "You leave the place.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "bowlingPlay",
          label: "Play",
          info: "Go and play s together.",
          twee: `<<addtime 53>>You book the lane and start playing. <<SCX>><<SC "AT" 18>><<if $SCresult[1]>>You are pretty confident with your bowling skills and beat <<= aw.hang.name>> easily with more than half of your attempts being strikes.<br><br>@@.npc;Wow, where have you learned to play so good?!@@<br><br><<else>>You feel not that confident with playing and <<= aw.hang.name>> <<= either("wins", "almost wins")>>.<br><br>@@.npc;Nice game, you was doing great!@@<br><br>@@.pc;Thanks!@@<br><br><</if>>`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-15, -20), "misc");
            aw.hang.enjoy[1] += random(7, 12);
            aw.hang.qual += random(3, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
    },
    {
      key: "karaoke",
      name: "Siren's call",
      shortDesc: "A karaoke place to show your vocal skills if you have any.",
      loc: ["downtown", "club", false],
      topImg: "IMG-Karaoke-Inside",
      img: "IMG-Activity-Karaoke",
      desc: "A relatively small room with a small stage and some tables around.",
      arrivalText: `You arrive at the place with <<= aw.hang.name>> and take a seat at the free table. It seems <<= either("nobody is singing right now", "the young, probably deaf girl is trying to sing some Sinatra song on the stage", "A bearded guy is nailing some country song on the stage")>>.`,
      departText: "You leave the place.",
      category: "activity",
      quality: 3,
      events: [],
      activities: [
        {
          key: "karaokeSing",
          label: "Sing",
          info: "Go and sing something.",
          twee: `<<addtime 17>><<has intro>>You think about singing but feel to shy to do it. <<= aw.hang.name>> notices your hesitation.<br><br>@@.npc;Hey, <<print ↂ.pc.main.name>>, go for it! It will be cool to hear you singing!@@<br><br>@@.pc;You really think so? I am just not sure...@@<br><br>@@.npc;Yeah. totally! Don't be a pussy, come on!@@<br><br><<or>>You decide that you want to sing some song.<br><br>@@.npc;Hehe, way to go, <<print ↂ.pc.main.name>>, rock that place!@@<br><br><</has>>You came to the stage and choose a song, the one that catch your eye this time is "<<= either ("Country roads", "Sweet home Alabama", "Deus Irae", "Smells Like Teen Spirit", "Billie Jean", "Like A Rolling Stone", "Hey Jude", "Hotel California", "Heartbreak Hotel", "My hot load", "Good Vibrations")>>". As the music starts you take the microphone and prepare. <<SCX>><<SC "AS" 15>><<if $SCresult[1]>>It seems you are doing <<= either("pretty good", "nice job", "not that bad")>> and visitors looks cheered up by your performance. After finishing the song you get some energetic applauds and get back to the table.<br><br>@@.pc;Did you like it?@@<br><br>@@.npc;It was pretty cool! You have some talent for sure!@@<br><br>@@.pc;Thanks!@@<<set aw.hang.enjoy[1] += 9>><<else>>It seems that you <<if !ↂ.pc.trait.perceptive === 1>>are singing terribly making crowd earbleeding with your appalling performance.<<else>>are <<= either("doing awesome job with singing", "perfectly tuned", "nailing the song")>> but for some reason crowd seems to be not that happy with your performance.<</if>> Standing on the stage you notice <<= aw.hang.name>> wincing with the sounds of your voice. After finishing the song you get some limp applauds and get back to the table.<br><br>@@.pc;Did you like it?@@<br><br>@@.npc;Well... it was a song I guess. Not really sure what song it was, though.@@<br><br>@@.pc;Ouch.@@<<set aw.hang.enjoy[1] -= 9>><</if>>`,
          check() {
              return true;
          },
          prep() {
            aw.hang.enjoy[1] += random(7, 12);
            aw.hang.qual += random(3, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
        {
          key: "karaokeNpcSing",
          label: "Ask to sing",
          info: "Ask <<= aw.hang.name>> to sing something.",
          twee: `<<addtime 19>>You decide it is right time to ask <<= aw.hang.name>> to sing something. After some time and persuasion you manage to pull it off and <<= aw.hang.name>> gets onto the stage to sing "<<= either ("Country roads", "Sweet home Alabama", "Deus Irae", "Smells Like Teen Spirit", "Billie Jean", "Like A Rolling Stone", "Hey Jude", "Hotel California", "Heartbreak Hotel", "My hot load", "Good Vibrations")>>". After a minute of listening you understand that it seems <<if aw.hang.name.female>>she<<else>>he<</if>> is <<= either("good", "okay", "not that good", "awful")>> at singing. When <<if aw.hang.name.female>>she<<else>>he<</if>> finishes you applaud <<if aw.hang.name.female>>her<<else>>him<</if>> and <<= aw.hang.name>> returns to the table.<br><br>@@.pc;Hey, nice singing!@@<br><br>@@.npc;Really? You liked it?@@<br><br>@@.pc;Yeah, sure!@@`,
          check() {
              return true;
          },
          prep() {
            aw.cash(random(-5, -6), "misc");
            aw.hang.qual += random(3, 6);
            return true;
          },
          gate: [],
          ai: [],
        },
      ],
      aiTags: [[]],
    },
  ];
  for (const spot of spots) {
    aw.hangSpots[spot.key] = new HangSpot(spot as HangSpotData);
  }
})();











