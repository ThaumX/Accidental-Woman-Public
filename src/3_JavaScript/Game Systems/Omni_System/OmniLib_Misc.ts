
//   .d88888b.  888b     d888 888b    888 8888888      888      d8b 888
//  d88P" "Y88b 8888b   d8888 8888b   888   888        888      Y8P 888
//  888     888 88888b.d88888 88888b  888   888        888          888
//  888     888 888Y88888P888 888Y88b 888   888        888      888 88888b.
//  888     888 888 Y888P 888 888 Y88b888   888        888      888 888 "88b
//  888     888 888  Y8P  888 888  Y88888   888  88888 888      888 888  888
//  Y88b. .d88P 888   "   888 888   Y8888   888        888      888 888 d88P
//   "Y88888P"  888       888 888    Y888 8888888      88888888 888 88888P"

//  LIBRARY OF REUSABLE OMNI EVENTS

//  ███╗   ███╗██╗███████╗ ██████╗
//  ████╗ ████║██║██╔════╝██╔════╝
//  ██╔████╔██║██║███████╗██║
//  ██║╚██╔╝██║██║╚════██║██║
//  ██║ ╚═╝ ██║██║███████║╚██████╗
//  ╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝

if (setup.omnItems == null) {
  setup.omnItems = {} as IsetupOmnItems;
}

setup.omnItems.prairieOysters = {
  name: "Prairie Oysters",
  type: "condition",
  output: "none", // prologue, limited potential for interference
  duration: 1440,
  timeArray: 10,
  icon: "IMGstatus_Balls",
  text: "The succulent meal has lasting effects.",
  run: `if (random(1, 3) > 1) {
      aw.L("pc");
      ↂ.pc.status.addict.cum += 1;
      aw.S("pc");
      if (random(1,2) === 2){
        setup.notify("Your mind drifts back to the delicious flavor of those prairie oysters.");
      }
    }`,
};

setup.omnItems.babyHypno = {
  name: "Hypnotics-CP1",
  type: "recurring",
  output: "none",
  times: 12,
  interval: 120,
  icon: "IMGstatus_Hypno",
  text: "Your mind feels a little floaty, and drifts to certain cravings.",
  run: `aw.L("pc");
    const x = (ↂ.pc.kink.pregnancy) ? 3 : 2;
    ↂ.flag.omni.creamHypno += 1;
    ↂ.pc.status.addict.cream += random(1, x);
    ↂ.pc.status.addict.creamNeed += random(1, x);
    if (ↂ.flag.omni.creamHypno > 29 && !ↂ.pc.kink.risky || ↂ.pc.status.addict.cream >= 40) {
      ↂ.pc.kink.risky = true;
    }
    if (ↂ.flag.omni.creamHypno > 29 && !ↂ.pc.kink.pregnancy) {
      ↂ.pc.kink.risky = (random(1, 4) === 4) ? true : false;
    }
    aw.S("pc");
    if (random(1, 4) === 4) {
      setup.notify("You have a hungry hollow feeling in your abdomen.");
    }`,
};

setup.omnItems.rejuvSickness = {
  name: "Rejuvinator Sickness",
  type: "condition",
  output: "none",
  duration: 3400,
  timeArray: 8,
  icon: "IMGstatus_RejSickness",
  text: "You are recovering from the effects of the accident",
  run: `if (random(1, 3) > 1) {
      aw.L("pc");
      const hl = random(3, 5) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "Rejuvinator Sickness");
      aw.S("pc");
      setup.status.tired(1, "Rejuvinator Sickness");
    }`,
};

setup.omnItems.pussyBot = {
  name: "UnkN0wN",
  type: "recurring",
  output: "none",
  times: 33,
  interval: 360,
  icon: "IMGstatus_MicroBot",
  text: "ERR0rin-s93sKaf9sdsSs7fhsDSFO: F0re1gn 1T3m d3T3KteD",
  run: `if (random(1, 3) > 1) {
      aw.L("pc");
      const hl = random(1, 2) * -1;
      ↂ.pc.status.health += hl;
      setup.status.record("health", hl, "UnkN0wN Pussy Bot");
      aw.S("pc");
    }`,
};

setup.omnItems.keysBelt = {
  name: "keysBelt",
  type: "single",
  output: "none",
  duration: 6100,
  icon: "none",
  run: `if (random(0,10) > 8) {
    ↂ.flag.sendKeyReturned[0] == true;
  } else {
    ↂ.flag.sendKeyLost[0] == true;
  }
  as.S();`,
};

setup.omnItems.keysPlate = {
  name: "keysPlate",
  type: "single",
  output: "none",
  duration: 5900,
  icon: "none",
  run: `if (random(0,10) > 8) {
    ↂ.flag.sendKeyReturned[1] == true;
  } else {
    ↂ.flag.sendKeyLost[1] == true;
  }
  as.S();`,
};

setup.omnItems.keysClit = {
  name: "keysClit",
  type: "single",
  output: "none",
  duration: 5750,
  icon: "none",
  run: `if (random(0,10) > 8) {
    ↂ.flag.sendKeyReturned[2] == true;
  } else {
    ↂ.flag.sendKeyLost[2] == true;
  }
  as.S();`,
};


setup.omnItems.keysShortage = {
  name: "keysShortage",
  type: "single",
  output: "none",
  duration: 7750,
  icon: "none",
  run: `
  ↂ.flag.sendKeyLost[0] = false;
  ↂ.flag.sendKeyLost[1] = false;
  ↂ.flag.sendKeyLost[2] = false;
  as.S();`,
};


setup.omnItems.hannaAsksForMore = {
  name: "hannaAsksForMore",
  type: "single",
  output: "none",
  duration: 11622,
  icon: "none",
  run: `setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "none", npcid: "n1014", content: '<<set _hanna1 = either("Hey","What's up? It's me, Hanna","<<greetings>>")>><<set _hanna2 = either("I am terribly sorry but I need to borrow some more money from you :(((","I hate to be annoying but I need to ask you once again for additional money...","I know how it sounds, but I really need to ask you for more money :(")>><div id="hannaText"><<texting "Hanna Bowen">>
    <<textnpc>><<print _hanna1>>
    <<textpc>>Hi!
    <<textnpc>><<print _hanna2>>
    <<textnpc>>I have serious problems here... Can you send me 100 more?
    <<textpc>>Ugh...
    <<dialogchoice>>
        <<dbutt "Sure">><<replace "#hannaText">><<include [[HannaBowen-quest-a-yes]]>><</replace>>
        <<dtext "happy">>Oh, sure. Just return them and don't forget the money I previously borrowed you please.
        <<dbutt "No">><<replace "#hannaText">><<include [[HannaBowen-quest-a-no]]>><</replace>>
        <<dtext "arrogant">>Sorry, you haven't returned money I already borrowed to you.
      <</dialogchoice>></div>
    ', block: true, title: "Phone message", size: 3});
    aw.S();`,
};

setup.omnItems.hannaInTroubles = {
  name: "hannaInTroubles",
  type: "single",
  output: "none",
  duration: 11622,
  icon: "none",
  run: `setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "none", npcid: "n1014", content: '<<texting "Hanna Bowen">>
    <<textnpc>><<name>>
    <<textpc>>Umm, hi?
    <<textpc>>Hey, you wanted something?
    <<textpc>>Hello?
    <<textnpc>>Iam at tesla res they tookme pls co
    <<textpc>>What? Where are you?
    <<textpc>>Hey, are you still there?
    <</texting>>
    <br>@@.mono;Hmm, that's weird. We are not so close, why did she wrote me in the first place?@@
    <<safetoclose>><<set ↂ.flag.hannaStory.stage = "askedForHelp">><<run setup.omni.new("hannaDeathCounter")>>
    ', block: false, title: "Phone message", size: 3});
    aw.mapNPC.downtown.club.n1014.cond = function() { return false };
    aw.S();`,
};

setup.omnItems.hannaDeathCounter = {
  name: "hannaDeathCounter",
  type: "single",
  output: "none",
  duration: 600,
  icon: "none",
  run: `
  ↂ.flag.hannaStory.stage = "died"
  delete aw.npc["n1014"];
  aw.S();
  `,
};

setup.omnItems.hannaReturnsMoney = {
  name: "hannaReturnsMoney",
  type: "single",
  output: "none",
  duration: 21522,
  icon: "none",
  run: `
  setup.interact.status.npc = "n1014";
    setup.interact.launch({passage: "none", npcid: "n1014", content: '<<set _monHan = 2000 + ↂ.flag.hannaStory.money>><<texting "Hanna Bowen">>
    <<textnpc>>Hi, sugarcube!
    <<textnpc>>Just wanted to share some good news!
    <<textnpc>>I got a job and well
    <<textnpc>>I am clean for last two weeks too
    <<textpc>>Oh, that's cool! Congrats!
    <<textnpc>>Thanks! ^_^ 
    <<textnpc>>And also, I sent you all my debt, I am really grateful!
    <<textpc>>Oh, thanks, you shouldn't do that to be honest.
    <<textnpc>>It is okay, sugar, this is a honestly earned money and I want you to take them.
    <<textpc>>Oh okay
    <<textpc>>Well, see ya! ;)
    <<textpc>>And thanks once again.
    <</texting>>
    You check your balance and see that @@.mon;<<mon>><<= _monHan>>@@ got to your balance.
    <<safetoclose>><<run aw.cash(_monHan, "misc")>>
    ', block: false, title: "Phone message", size: 3});
    aw.mapNPC.downtown.club.n1014.cond = function() { return false };
    aw.S();
  `,
};

