
//  8888888b.           888    d8b
//  888  "Y88b          888    Y8P
//  888    888          888
//  888    888  8888b.  888888 888 88888b.   .d88b.
//  888    888     "88b 888    888 888 "88b d88P"88b
//  888    888 .d888888 888    888 888  888 888  888
//  888  .d88P 888  888 Y88b.  888 888  888 Y88b 888
//  8888888P"  "Y888888  "Y888 888 888  888  "Y88888
//                                               888
//                                          Y8b d88P
//                                           "Y88P"
//   .d8888b.                    888
//  d88P  Y88b                   888
//  Y88b.                        888
//   "Y888b.   888  888 .d8888b  888888 .d88b.  88888b.d88b.
//      "Y88b. 888  888 88K      888   d8P  Y8b 888 "888 "88b
//        "888 888  888 "Y8888b. 888   88888888 888  888  888
//  Y88b  d88P Y88b 888      X88 Y88b. Y8b.     888  888  888
//   "Y8888P"   "Y88888  88888P'  "Y888 "Y8888  888  888  888
//                  888
//             Y8b d88P
//              "Y88P"

interface SetupDating {
  start: (npcid: npcid, type: string) => void;
  statusBar: () => string;
  statRefresh: () => void;
  tracking: () => void;
  pbar: (amt: number, color: string) => string;
  howAbout: (spot: string) => string;
  howAboutResult: (spot: string) => string;
  sel: (key: string) => void;
  locationPicker: () => string;
  activity: (actKey: string) => void;
  saySomething: (type: string) => void;
  aiQuery: (aiKeys: string[], note?: string) => number;
  npcChoice: () => string;
  end: () => void;
  eatHome: (quality: number, npc: string, dish: string, dishIndex: number, drugged: string) => string;
  tagText: (tag: string, name: string) => string;
  propose: (dateSpotKey: string) => string;
  advance: () => void;
  pcQuestion: () => string;
  breakUp: () => string;
  dom: () => string;
  sub: () => string;
  goodThings: (enjoy: number, qual: number, arouse: number) => void;
  badThings: (enjoy: number, qual: number, arouse: number) => void;
  dev: () => void;
  serious: () => void;
  askOpen: () => number;
}

interface awDateData {
  npcid: npcid;
  npc: NPC;
  name: string;
  start: number;
  dta: [number, number, number, number];
  qual: number;
  enjoy: awDateDataEnjoy;
  arouse: number;
  spot: string;
  spots: string[];
  flag: {};
  events: string[];
  proposed: string;
  ate: boolean;
  dessert: boolean;
  aiRes: number;
  npcPicked: boolean;
  convoTag: string;
  convoText: string;
  convoHist: string[];
  eligible: [string, boolean, string];
  askIt: boolean;
  dateType: string;
}
interface awDateDataEnjoy {
  0: number;
  1: number;
}

setup.date = {} as SetupDating;

// cheater boost function
setup.date.dev = function(): void {
  aw.date.dta = [99, 99, 99, 99];
  ↂ.skill.comm = 190;
  ↂ.skill.sed = 190;
  aw.S();
};

// starts a new date with the supplied NPC
setup.date.start = function(npcid: npcid, type: string) {
  aw.L();
  if (!ↂ.flag.dateManualShown) {
    aw.L();
    ↂ.flag.dateManualShown = true;
    setup.dialog("Dating manual", "Oh, we have zero doubts that you have read all the manuals before playing, but just to be sure you are aware of what you are doing, here is a friendly reminder:<br><center>[img[IMGinstructions7]]<br><<button 'Ugh, I hate manuals'>><<run Dialog.close();>><</button>></center>");
    aw.S();
  }
  if (!setup.npcid.test(npcid) || aw.npc[npcid] == null) {
    aw.con.warn(`Error: Date launched with invalid NPCID for date partner! Value: ${npcid}.`);
    return;
  }
  aw.date = { // Data object for the date
    npcid,
    npc: aw.npc[npcid],
    name: aw.npc[npcid].main.name,
    start: aw.time,
    dta: [50, 50, 50, random(15, 25)],
    enjoy: {} as awDateDataEnjoy,
    qual: 0,
    arouse: 0,
    spot: "none",
    spots: [],
    flag: {},
    events: [],
    proposed: "none",
    ate: false,
    dessert: false,
    aiRes: 0,
    npcPicked: false,
    convoTag: setup.cTag.getTag(3, false),
    convoText: "error",
    convoHist: [],
    eligible: ["none", false, "none"],
    askIt: false,
    dateType: type,
  };
  // we use getter/setters to safeguard the important stat values
  Object.defineProperties(aw.date, {
    qual: {
      get(): number {
        return aw.date.dta[0];
      },
      set(val: number) {
        val = Number(val);
        if (isNaN(val)) {
          aw.con.warn(`Invalid non-number value assigned to aw.date.qual`);
          return;
        }
        aw.date.dta[0] = Math.max(0, Math.min(100, val));
      },
    },
    arouse: {
      get(): number {
        return aw.date.dta[3];
      },
      set(val: number) {
        val = Number(val);
        if (isNaN(val)) {
          aw.con.warn(`Invalid non-number value assigned to aw.date.arouse`);
          return;
        }
        aw.date.dta[3] = Math.max(0, Math.min(100, val));
      },
    },
  });
  Object.defineProperties(aw.date.enjoy, {
    0: {
      get(): number {
        return aw.date.dta[1];
      },
      set(val: number) {
        val = Number(val);
        if (isNaN(val)) {
          aw.con.warn(`Invalid non-number value assigned to aw.date.enjoy[0]`);
          return;
        }
        aw.date.dta[1] = Math.max(0, Math.min(100, val));
      },
    },
    1: {
      get(): number {
        return aw.date.dta[2];
      },
      set(val: number) {
        val = Number(val);
        if (isNaN(val)) {
          aw.con.warn(`Invalid non-number value assigned to aw.date.enjoy[1]`);
          return;
        }
        aw.date.dta[2] = Math.max(0, Math.min(100, val));
      },
    },
  });
  // prep the convotags
  aw.date.convoHist.push(aw.date.convoTag);
  aw.date.convoText = setup.date.tagText(aw.date.convoTag, aw.date.name);
  // launch the scenario window
  const scen = {
    content: "<<include [[DateStart]]>>",
    sidebar: setup.date.statusBar(), // replace with svg builder function
    image: aw.npc[npcid].main.picture,
    topImage: "IMG-ANewDateBanner",
    title: `The start of a date with ${aw.date.npc.main.name}`,
    allowSave: false,
    showTime: true,
    allowMenu: true,
    callback: setup.date.tracking,
  } as IntScenarioLaunchOptions;
  setup.scenario.launch(scen);
};

// print a simple set of information about the date
setup.date.statusBar = function(): string {
  let output = setup.ui.simplePbar(aw.date.qual, "#4f92ff", "Date Quality:");
  output += setup.ui.simplePbar(aw.date.enjoy[1], "#18f998", "NPC Enjoyment:");
  output += setup.ui.simplePbar(aw.date.arouse, "#ff96dd", "NPC Arousal:");
  const tim = aw.time - aw.date.start;
  let hours: number | string = Math.floor(tim / 60);
  if (hours === 0) {
    hours = "00";
  } else if (hours < 10) {
    hours = "0" + hours;
  }
  let mins: number | string = tim % 60;
  if (mins === 0) {
    mins = "00";
  } else if (mins < 10) {
    mins = "0" + mins;
  }
  const elig = setup.rship.eligible(aw.date.npcid);
  if (elig && typeof elig === "boolean") {
    output += `<img data-passage="IMG_IconCheckmark" title="This relationship is ready to advance" style="width:30px;height:30px;">`;
  } else {
    output += `<img data-passage="IMG_IconCheckmarkNull" title="This relationship is not ready to advance" style="width:30px;height:30px;">`;
  }
  output += `<span style="color:#e0e0e0;">Date Duration: ${hours}:${mins}</span>`;
  return output;
};

// replaces the correct area in the scenario window with new status info
setup.date.statRefresh = function(): void {
  aw.replace("#Scene-Sidebar-Info", setup.date.statusBar());
};

// adds basic date information to NPC and player
setup.date.tracking = function(): void {
  aw.date.npc.rship.dates += 1;
  aw.date.npc.rship.companion += 25;
  aw.date.npc.rship.dating = true;
  // TODO rship.space modification
  setup.status.lonely(-20, "Going on a date");
  setup.status.happy(1, "Going out on a date");
  setup.status.arousal(1);
  // add stress if unsure date - nerves
  if (!aw.date.npc.rship.lovers) {
    const stress = (aw.date.npc.rship.dating) ? 5 : 15;
    setup.status.stress(stress, "Stress from being on a date");
  }
  // determine if the NPC is willing to upgrade the relationship
  aw.date.eligible = setup.rship.eligible(aw.date.npcid);
  // check to see if the NPC will propose to upgrade
  if (aw.date.eligible[1]) {
    let braveryRate = Math.round(aw.date.npc.rship.lovePC / 10) + (aw.date.npc.trait.will);
    if (aw.date.npc.trait.lowEsteem === 1) {
      braveryRate -= 2;
    } else if (aw.date.npc.trait.lowEsteem === -1) {
      braveryRate += 2;
    }
    if (aw.date.npc.trait.extro) {
      braveryRate += 1;
    }
    if (aw.date.npc.trait.intro) {
      braveryRate -= 1;
    }
    if (aw.date.npc.main.female && !aw.date.npc.trait.bi && !aw.date.npc.trait.homo) {
      braveryRate -= 4;
    }
    if (!aw.date.npc.main.female && aw.date.npc.main.male && !aw.date.npc.trait.bi && aw.date.npc.trait.homo) {
      braveryRate -= 4;
    }
    if (aw.date.npc.main.female && aw.date.npc.trait.homo) {
      braveryRate += 1;
    }
    const npcPrefs = setup.week.insanePrefChecker(aw.date.npcid);
    let npcPrefsScore = 0;
    for (let index = 0; index < npcPrefs.length; index++) {
      npcPrefsScore += npcPrefs[index];
    }
    braveryRate += npcPrefsScore;
    if (braveryRate < 0) {braveryRate = 1;} // here, take your puny chance anyway
    switch (aw.date.eligible[0]) {
      case "married":
        break;
      case "engaged":
        if (random(0, braveryRate) > 5) { aw.date.askIt = true; }
        break;
      case "lovers":
        if (random(0, braveryRate) > 6) { aw.date.askIt = true; }
        break;
      case "exclusive":
        if (random(0, braveryRate) > 8) { aw.date.askIt = true; }
        break;
    }
  }
};

// function when the NPC proposes to advance the relationship
setup.date.propose = function(dateSpotKey: string): string {
  // TODO - add some either() to increase variations w/ the proposals
  let out = "";
  switch (aw.date.eligible[0]) {
    case "engaged":
      // TODO better proposal shit...
      out += `<p>Suddenly ${aw.date.name} gets down on one knee in front of you. @@.npc;Will you marry me?@@</p><p class="note">This is a temporary placeholder for proper marriage proposals... baby steps!</p>`;
      const rPos = "<p>@@.pc;ohmygod! ... Yes!@@</p><p>@@.npc;I'm so happy! Yes!@@</p>";
      const rNeg = `<p>@@.pc;Oh... umm... sorry, but...@@</p><p><<n "${aw.date.npcid}" "heshe.q">> stares at you in shock and heartbreak. @@.npc;Oh... I see...@@</p>`;
      out += `<div id='propWin'><<dialogchoice>><<dbutt "YES!">><<run setup.date.advance()>><<replace "#propWin">>${rPos}<<print aw.dateSpots.${dateSpotKey}.buttonGen()>><</replace>><<dtext "excited">>Yes, you will get engaged to ${aw.date.name}!`;
      out += `<<dbutt "no">><<set aw.date.npc.rship.rejected = true>><<replace "#propWin">>${rNeg}<<print aw.dateSpots.${dateSpotKey}.buttonGen()>><</replace>><<dtext "disturbed">>Nope, not gonna marry this person.<</dialogchoice>>`;
      break;
    case "lovers":
      out += `<p>${aw.date.name} paused for a moment, staring at you with warmth in <<n "${aw.date.npcid}" "hisher.q">> eyes. @@.npc;You know ${ↂ.pc.main.name}, I love you.@@ <<n "${aw.date.npcid}" "heshe.q">> pauses for a moment, realizing the gravity of the situation. @@Sorry, I just had to say it...@@</p>`;
      const lPos = `<p>You smile happily. @@.pc;I love you too, ${aw.date.name}@@</p><p><<n "${aw.date.npcid}" "heshe.q">> looks relieved. @@.npc;Oh good... I just sort of blurted that out without thinking... I'm really happy you feel the same way!@@</p>`;
      const lNeg = `<p>You aren't sure what to say at first, leading to a pregnant pause. @@.pc;Thank you... I think it's a bit early for me...@@</p><p>${aw.date.name} tries to act nonchalant about it. @@.npc;Hey, that's okay. I'm sorry I just kind-of blurted that out. I'm not sure what I was thinking...@@`;
      out += `<div id='propWin'><<dialogchoice>><<dbutt "love">><<run setup.date.advance()>><<replace "#propWin">>${lPos}<<print aw.dateSpots.${dateSpotKey}.buttonGen()>><</replace>><<dtext "love">>`;
      if (aw.date.npc.rship.loveNPC > 54 && ↂ.pc.trait.romantic > -1) {
        out += `You love ${aw.date.name} too, so tell them as much.`;
      } else if (aw.date.npc.rship.loveNPC > 29) {
        out += `You don't exactly <i>love</i> ${aw.date.name}, but you think you might get there...`;
      } else {
        out += `You don't love ${aw.date.name}, but you don't feel like rejecting <<n "${aw.date.npcid}" "himher.q">>...`;
      }
      out += `<<dbutt "no love">><<set aw.date.npc.rship.rejected = true>><<replace "#propWin">>${lNeg}<<print aw.dateSpots.${dateSpotKey}.buttonGen()>><</replace>>`;
      if (aw.date.npc.rship.loveNPC > 39) {
        out += `<<dtext "muted">>You don't want to share your feelings toward the NPC, it's better to keep it under wraps.`;
      } else {
        out += `<<dtext "dismay">>This isn't what you signed up for...`;
      }
      out += "<</dialogchoice>>";
      break;
    case "exclusive":
      out += `<p>${aw.date.name} gets serious for a moment, and you can see a question in their expression. @@.npc;So what do you think about making this official?@@</p>`;
      const boy = (aw.date.npc.main.female) ? "girlfriend too." : "boyfriend.";
      const ePos = `<p>@@.pc;Sure.@@ You share a smile @@.pc;I guess I'm your girlfriend now.@@</p><p>@@.npc;And that makes me your ${boy} It's official!</p> The two of you share a laugh and get back to your date.</p>`;

      const eNeg = `<p>You try to smile but it comes out more like a grimace. @@.pc;I'm sorry, I just don't think we're there yet... Not that we <i>won't</i> be, it's just a little too early for me.@@</p><p>${aw.date.name} seems to take it pretty well. @@.npc;Hey, that's okay. As long as we're having fun, right?@@</p><p>You nod and are able to give a more authentic smile. @@.pc;Right.@@</p>`;
      let eDouche = "";
      if (ↂ.pc.kink.slut) {
        eDouche = `<p>You let the confusion show on your face. @@.pc;I thought this was about sex and having fun... I mean, I like you, but not enough to give up sex with other people...@@</p><p>${aw.date.name} just sighs, with an expression that says 'what was I thinking?' @@.npc;Hey don't worry about it, it's cool as long as we're having fun.@@</p>`;
      } else {
        eDouche = `<p>You quirk an eyebrow. @@.pc;You know, I'm not really looking for something serious right now...@@</p><p>${aw.date.name} doesn't seem terribly happy about that, but puts on a brave face. @@.npc;Okay, well, I understand. Casual it is.@@ With both of you eager to put the awkwardness behind you, you get back to your date.</p>`;
      }
      out += `<div id='propWin'><<dialogchoice>><<dbutt "yes">><<run setup.date.advance()>><<replace "#propWin">>${ePos}<<print aw.dateSpots.${dateSpotKey}.buttonGen()>><</replace>><<dtext "kissheart">>Sure, you don't mind being ${aw.date.name}'s girlfriend`;
      out += `<<dbutt "no">><<set aw.date.npc.rship.rejected = true>><<replace "#propWin">>${eNeg}<<print aw.dateSpots.${dateSpotKey}.buttonGen()>><</replace>><<dtext "awkward">>You aren't quite ready for that yet...`;
      let cano = true;
      if (aw.date.npc.rship.loveNPC > 39 || ↂ.pc.trait.romantic === 1) {
        cano = false;
      }
      out += `<<dbutt "disinterest" ${cano}>><<set aw.date.npc.rship.rejected = true>><<replace "#propWin">>${eDouche}<<print aw.dateSpots.${dateSpotKey}.buttonGen()>><</replace>><<dtext "smug">>You aren't really dating for love... This is just for fun.`;
      out += `<</dialogchoice>>`;
      break;
    default:
    out += "<div><center>@@.note;Seems there was some kind of error...@@</center>";
    out += aw.dateSpots[dateSpotKey].buttonGen();
  }
  out += "</div>";
  aw.date.askIt = false;
  return out;
};

// advances the npc rship values when relationship advances
setup.date.advance = function(): void {
  aw.date.npc.rship[aw.date.eligible[0]] = true;
  aw.date.enjoy[1] += random(15, 20) + random(5, 10);
  aw.date.enjoy[0] += random(15, 20) + random(5, 10);
  aw.date.askIt = false; // just in case
  setup.date.statRefresh();
};

// improves the date stats, helper function
setup.date.goodThings = function(enjoy: number = 1, qual: number = 1, arouse: number = 1): void {
  const enjoyMin = [0, 2, 4, 6,  8,  10];
  const enjoyMax = [1, 4, 8, 12, 16, 20];
  const qualMin =  [0, 1, 2, 3, 4, 5];
  const qualMax =  [1, 3, 5, 7, 9, 11];
  const arouseMin = [0, 3, 5, 7,  10, 15];
  const arouseMax = [1, 5, 8, 12, 15, 20];
  aw.date.enjoy[0] += random(enjoyMin[enjoy], enjoyMax[enjoy]);
  aw.date.enjoy[1] += random(enjoyMin[enjoy], enjoyMax[enjoy]);
  aw.date.qual += random(qualMin[qual], qualMax[qual]);
  aw.date.arouse += random(arouseMin[arouse], arouseMax[arouse]);
};

// reduces the date stats, helper function
setup.date.badThings = function(enjoy: number = 1, qual: number = 1, arouse: number = 1): void {
  const enjoyMin = [0, 2, 4, 6, 8, 10];
  const enjoyMax = [1, 4, 8, 12, 16, 20];
  const qualMin = [0, 1, 2, 3, 4, 5];
  const qualMax = [1, 3, 5, 7, 9, 11];
  const arouseMin = [0, 3, 5, 7, 10, 15];
  const arouseMax = [1, 5, 8, 12, 15, 20];
  aw.date.enjoy[0] -= random(enjoyMin[enjoy], enjoyMax[enjoy]);
  aw.date.enjoy[1] -= random(enjoyMin[enjoy], enjoyMax[enjoy]);
  aw.date.qual -= random(qualMin[qual], qualMax[qual]);
  aw.date.arouse -= random(arouseMin[arouse], arouseMax[arouse]);
};

// pc proposes advancing the relationship, returns text.
setup.date.pcQuestion = function(): string {
  let out = "";
  switch (aw.date.eligible[0]) {
    case "engaged":
      const husband = (aw.date.npc.main.female) ? `but you figure that you should take the masculine role for this. You get down on one knee, looking up at ${aw.date.name}` : `even though it's a lot more common now for the woman to propose. You look ${aw.date.name} in the eye`;
      out += `<p>You aren't quite sure of the protocol these days, ${husband} @@.pc;${aw.date.name} ${aw.date.npc.main.surname} will you make me the happiest woman in the world and marry me?@@</p>`;
      if (aw.date.eligible[1]) {
        out += `<p>${aw.date.name} doesn't move for a moment, seemingly frozen with shock. Your heart flutters with anticipation and growing concern as time seems to stretch. When a smile lights up ${aw.date.name}'s face, however, your doubts are dispelled. @@.npc;Yes! Let's get married!@@</p>`;
        setup.date.advance();
      } else {
        let reas = "";
        switch (aw.date.eligible[2]) {
          case "rejection time":
            reas = `I'm sorry... You know, it hasn't been that long since I proposed and you turned me down. It's made me want to take some time to think things through...`;
            break;
          case "too soon":
            reas = `I'm sorry... It really just feels like it's too soon for marriage... Maybe in the future, but not now.`;
            break;
          case "low like":
          case "low love":
            reas = `I'm sorry, but I just don't think I'm ready for that level of commitment yet.`;
            break;
          default:
            reas = `I'm sorry, but I have to say no. I just really don't think it's a good idea yet.`;
        }
        out += `<p>${aw.date.name} looks a little surprised, and your hopes plummet when you see a grimace form on <<n "${aw.date.npcid}" "hisher.q">> face. @@.npc;${reas}@@</p><p>You aren't entirely sure what to say, so you end up saying something rather generic. @@.pc;Oh, I see... I understand.@@</p>`;
      }
      break;
    case "lovers":
      out += `<p>It's always awkward the first time, so you resolve yourself to just get it out there. @@.pc;Hey ${aw.date.name}, I just wanted to tell you; I love you.@@</p>`;
      if (aw.date.eligible[1]) {
        out += `<p>${aw.date.name} looks at you and smiles. @@.npc;I'm really happy, because I love you too ${ↂ.pc.main.name}@@</p>`;
        setup.date.advance();
      } else {
        let reas = "";
        switch (aw.date.eligible[2]) {
          case "rejection time":
            reas = `Look ${ↂ.pc.main.name}, while it makes me happy to hear you say that... I can't help but feel like this is a reaction to me saying that I love you the other day.@@ <<n "${aw.date.npcid}" "heshe.q">> sighs before continuing. @@.npc;I want you to say it when you mean it, and not just to make me feel better... So let's wait a bit, and if you really feel that way I'll be very happy.`;
            setup.date.goodThings(2, 2, 1);
            break;
          case "too soon":
            reas = `I'm sorry... I'm happy you feel that way ${ↂ.pc.main.name}, but it's a little early for me to say I love you...`;
            break;
          case "low like":
          case "low love":
            reas = `I'm sorry, but I don't think I can say that I <b><i>love</i></b> you yet.`;
            setup.date.badThings(1, 1, 0);
            break;
          default:
            reas = `I'm sorry, but lolwut?`;
            setup.date.badThings(2, 2, 0);
        }
        out += `<p>${aw.date.name} looks a little surprised at your confession. @@.npc;${reas}@@</p><p>You don't have much choice but to go along with it. @@.pc;Okay.@@</p>`;
      }
      break;
    case "exclusive":
      const boy = (aw.date.npc.main.female) ? "girlfriend" : "boyfriend";
      out += `<p>It's a little awkward, but you figure it's better to be clear on where things stand between the two of you. @@.pc;So, ${aw.date.name}, We've gone out a few times... Do you want to be my ${boy}?@@</p>`;
      if (aw.date.eligible[1]) {
        out += `<p>${aw.date.name} looks at you and grins happily. @@.npc;Sure! I guess that means that you're my girlfriend too.@@</p>`;
        setup.date.advance();
      } else {
        let reas = "";
        switch (aw.date.eligible[2]) {
          case "rejection time":
            reas = `Look ${ↂ.pc.main.name}, while it makes me happy to hear you say that... I can't help but feel like this is a reaction to me asking you to be my girlfriend other day.@@ <<n "${aw.date.npcid}" "heshe.q">> sighs before continuing. @@.npc;I want our relationship to be official, but I don't want to rush things... So let's wait a bit, and if you really feel that way I'll be very happy.`;
            setup.date.goodThings(2, 2, 1);
            break;
          case "too soon":
            reas = `I'm sorry... I'm glad that you feel that way ${ↂ.pc.main.name}, but it's a little early to start getting serious, I think...`;
            break;
          case "low like":
          case "low love":
            reas = `I'm sorry, but I'm really not ready to make a commitment like that yet.`;
            setup.date.badThings(1, 1, 0);
            break;
          default:
            reas = `I'm sorry, but lolwut?`;
            setup.date.badThings(2, 2, 0);
        }
        out += `<p>${aw.date.name} looks a little surprised at your confession. @@.npc;${reas}@@</p><p>You don't have much choice but to go along with it. @@.pc;Okay.@@</p>`;
      }
      break;
    default:
      aw.con.warn(`Somehow there is a proposal from PC with no valid relationship target...`);
      out += `<p><<ctn>>Sorry, there was an error and there isn't a valid relationship target. You should be able to continue this date as normal otherwise... sorry about the mishap.<</ctn>></p>`;
  }
  if (aw.date.eligible[1]) {
    if (aw.date.eligible[0] === "married") {
      out += `<div id="poopypoop"><p>You warmly hug and kiss ${ↂ.pc.main.name} for it seems to be a eternity before finally letting <<if aw.date.npc.main.female>>her<<else>>him<</if>> go.
      <<dialogchoice>>
        <<dbutt "discuss">><<include [[Wedding-a]]>><<set ↂ.flag.marriage.discussion = true>>
        <<dtext "love">>Discuss the details and set the wedding date right now!
        <<dbutt "later">><<replace "#weddingMonthdayDiv">><p>With that happy occasion out of the way, the two of you continue your date.</p><<print aw.dateSpots[aw.date.spot].buttonGen()>><</replace>>
        <<dtext "happy">>Just continue with your date for now, you will discuss the date and details later.
      <</dialogchoice>>
      </div>
      `;
      ↂ.flag.marriage.discussion = true;
      aw.S();
    } else {
      out += `<p>With that happy occasion out of the way, the two of you continue your date.</p>`;
    }
  } else {
    out += `<p>In order to avoid any more awkwardness, the two of you continue your date.</p>`;
  }
  if (aw.date.eligible[0] === "married" && aw.date.eligible[1]) {
    // pee pee poo poo, nothing here
  } else {
    out += aw.dateSpots[aw.date.spot].buttonGen();
  }
  return out;
};

setup.date.breakUp = function(): string {
  let reason = "";
  if (ↂ.pc.trait.isBitch || ↂ.pc.trait.isNarcissist) {
    reason = `Look, ${aw.date.name}, this relationship just isn't working out for me. It's not you, it's me, yada yada, it's over, okay?`;
  } else if (ↂ.pc.trait.isPicky || ↂ.pc.trait.isStraightforward) {
    reason = `Look, ${aw.date.name}, I've given this relationship an honest try, but you're just not doing it for me. I'm sorry, but let's just end it, okay?`;
  } else if (ↂ.pc.trait.isCaring || ↂ.pc.trait.isFriendly || ↂ.pc.trait.isDevious) {
    reason = `Look, ${aw.date.name}, I'm really sorry, but I've decided that I just can't be in a relationship anymore. There's a lot going on with me mentally, you know, and I can't do it... Not to mention that it really isn't fair to you...`;
  } else if (ↂ.pc.kink.superSlut) {
    reason = `Look, ${aw.date.name}, I just can't be in a relationship with you anymore. I <i><b>need</b></i> more cock in my life...`;
  } else {
    reason = `Look, ${aw.date.name}, I think it's time we ended our relationship. It just isn't working out for me, so there's no reason to drag things out...`;
  }
  let out = `<p>You decide that you're done with ${aw.date.name}, and it's time to break it off. @@.pc;${reason}@@</p>`;
  const take = either("fairly well", "poorly", "hard", "nonchalantly, as if it doesn't really matter", "happily, as if already planning to break up");
  if (ↂ.flag.keyHolders[0] === aw.date.npc.key) {
    if (random (1,2) === 1) {
    if (ↂ.flag.keyHolders[1] === "gotKeysBelt") {
      State.active.variables.items.pickUp("Chastity belt key");
    } else if (ↂ.flag.keyHolders[1] === "gotKeysCplate") {
      State.active.variables.items.pickUp("Cplate 200 remote");
    } else if (ↂ.flag.keyHolders[1] === "gotKeysClit") {
      State.active.variables.items.pickUp("Clit shield remote");
    }
      out += `<p>${aw.date.name} seems to take it ${take}, and leaves soon after giving you the keys to your chastity. Obviously, breaking up with your partner is going to put an end to your date...</p>`;
    } else {
      out += `<p>${aw.date.name} seems to take it ${take}, and leaves soon after. Obviously, breaking up with your partner is going to put an end to your date. It takes you a minute after ${aw.date.name} leaves to realize that you forget to ask for your chastity belt keys and it is too late now...</p>`;
      ↂ.flag.sendKeyLost[0] = true;
      ↂ.flag.sendKeyLost[1] = true;
      ↂ.flag.sendKeyLost[2] = true;
      setup.omni.new("keysShortage");
    }
    ↂ.flag.keyHolders[0] = "none";
    ↂ.flag.keyHolders[1] = "none";
  } else {
    out += `<p>${aw.date.name} seems to take it ${take}, and leaves soon after. Obviously, breaking up with your partner is going to put an end to your date...</p>`;
  }
  out += `<center><<button "CLOSE">><<addTime 5>><<run setup.date.end()>><</button>></center>`;
  aw.date.npc.rship.breakUp();
  setup.date.badThings(5, 5, 0);
  setup.date.statRefresh();
  return out;
};

setup.date.dom = function(): string {
  let out = "<p>You look into <<= aw.date.name>>'s eyes and gather your courage before going on. @@.mono;Oh I hope <<if aw.date.npc.main.female>>she<<else>>he<</if>> will get it right...@@</p>";
  let reason = "I am not into such games to be honest.";
  let chance = Math.round(aw.date.npc.rship.likePC / 2) + aw.date.npc.rship.sub - aw.date.npc.rship.dom;
  if (aw.date.npc.kink.sub) {
    chance += 30;
  } else {
    chance -= 20;
  }
  if (aw.date.npc.kink.sub) {
    reason = "Don't get me wrong, I like BDSM and stuff I am just not ready for it right now to be honest.";
  }
  if (chance > 50) {
    ↂ.flag.subs.push(aw.date.npcid);
    out += `<<arousal 1>><p>@@.pc;So... it seems you are pretty interested in being controlled, isn't it?@@</p> <<= aw.date.name>> looks confused for a moment before blushing and nodding in a shy fashion. @@.npc;I... really do...@@ It takes some time but eventually <<= aw.date.name>> looks at you with a frightened yet hopeful eyes @@.npc;Can... can I ask you to be my mistress?@@<p> You reach with your hand to brush your new sub's hair. @@.pc;Your really want it?@@ <<= aw.date.name>> sighs with pleasure but you pull <<if aw.date.npc.main.female>>her<<else>>his<</if>> hair in a possessive and dommy fashion. Taking <<if aw.date.npc.main.female>>her<<else>>his<</if>> face with your other hand you look right into <<= aw.date.name>>'s eyes with a stern and demanding look standing above <<if aw.date.npc.main.female>>her<<else>>him<</if>>. @@.pc;Then beg me to be your mistress.@@</p><p>Slurring and gasping, <<= aw.date.name>> mumbles something and you shake <<if aw.date.npc.main.female>>her<<else>>his<</if>> by the hairs. @@.pc;Use words.@@</p><p>@@.npc;Please, be my mistress, <<= ↂ.pc.main.name>>!@@ You smile in a devilish fashion before kissing <<if aw.date.npc.main.female>>her<<else>>his<</if>>forehead. @@.pc;Of course, my little slave, I would be happy to be your mistress! You are up to some hard times, my little pet.@@</p>` + aw.dateSpots[aw.date.spot].buttonGen();
    setup.date.goodThings(3, 1, 5);
  } else {
    out += `<p>@@.pc;I want you to be my slave. Lick my boots right now.@@</p><p><<= aw.date.name>> looks uncomfortable. @@.npc;I... I am not sure that I am into such commitment... ${reason}@@</p> Feeling pretty stupid you anxiously mumble something about this being just a proposition and it is okay. @@.mono;Oh crap. Now <<if aw.date.npc.main.female>>she<<else>>he<</if>> thinks I am a total pervert.@@` + aw.dateSpots[aw.date.spot].buttonGen();
    setup.date.badThings(4, 2, 3);
  }
  aw.S();
  return out;
}

setup.date.sub = function(): string {
  let out = "<p>You look into <<= aw.date.name>>'s eyes and gather your courage before going on. @@.mono;Oh I hope <<if aw.date.npc.main.female>>she<<else>>he<</if>> will get it right...@@</p>";
  let reason = "I am not into such games to be honest.";
  let chance = Math.round(aw.date.npc.rship.likePC / 2) + aw.date.npc.rship.dom - aw.date.npc.rship.sub;
  if (aw.date.npc.kink.dom) {
    chance += 30;
  } else {
    chance -= 20;
  }
  if (aw.date.npc.kink.dom) {
    reason = "Don't get me wrong, I like BDSM and stuff I am just not ready for tp take responsibility for a sub right now to be honest.";
  }
  if (chance > 50) {
    ↂ.flag.doms.push(aw.date.npcid);
    ↂ.pc.jewel.neck = "LeatherCollar";
    out += `<<arousal 2>><p>@@.pc;So... it seems you are pretty interested in being in control.. I mean in a sexy way, don't you?@@</p> <<= aw.date.name>> looks surprised for a moment and grins. @@.npc;Well, actually yes. I am into all this bdsm stuff. Something says me that I'm not the only one here who want to find a play partner, mm?@@<p>You nod in a shy fashion blushing like crazy. @@.npc;So, you want to ask me something I believe?@@ You nod once again your eyes down. @@.npc;Why don't you ask for it while you stand on your knees, <<= ↂ.pc.main.name>>?@@ You blush even more feeling a warm wave overwhelming your body with shame and arousal. Under <<= aw.date.name>>'s strict eyes you get on your knees and feel deeply humiliated and happy as the same time while forcing @@.pc;Please, may I be your slave?@@ out from your throat.</p><p>@@.npc;Yes. In fact, I knew you gonna ask for it <<if $AW.startMale && aw.date.npcId == "n101">>since you got through this rejuvenator incident in my basement and I saw you acting differently.<<elseif !$AW.startMale && aw.date.npcId == "n101">>since you was sent to me. Isn't it funny that now you are now twice my slave?<<else>>since the first time I saw you.<</if>> I carry this thing with me for some time already and today the day has come.@@</p><p><<if aw.date.npc.main.female>>She<<else>>He<</if>> gets a black leather collar with a steel ring in the front. @@.npc;Lift your hair, little one.@@ You obey <<if aw.date.npc.main.female>>her<<else>>him<</if>> and <<= aw.date.name>> locks the buckle of heavy collar around your neck marking you as <<if aw.date.npc.main.female>>her<<else>>his<</if>> property. Brushing your hair, <<= aw.date.name>> smiles once again. @@.npc;Such a good slave you are. I already have some ideas how to use you well, we gonna have so much fun. But for now... stand up.@@</p>` + aw.dateSpots[aw.date.spot].buttonGen();
    setup.date.goodThings(3, 1, 5);
  } else {
    out += `<p>@@.pc;I want you to be your slave. Licking your shoes and ass, please let me be your slave!.@@</p><p><<= aw.date.name>> looks uncomfortable. @@.npc;I... I am not sure that I am into such commitment... ${reason}@@</p> Feeling pretty stupid you anxiously mumble something about this being just a proposition and it is okay. @@.mono;Oh crap. Now <<if aw.date.npc.main.female>>she<<else>>he<</if>> thinks I am a total pervert.@@` + aw.dateSpots[aw.date.spot].buttonGen();
    setup.date.badThings(4, 2, 3);
  }
  aw.S();
  return out;
}

setup.date.howAbout = function(spot: string): string {
  const phrase1 = either("gives your suggestion some thought.", "ponders your suggestion for a moment.", "takes a moment to consider.", " looks away for a moment, thinking.");
  const output = `<div id="howAbout">You suggest heading to ${aw.dateSpots[spot].name}.<br><br><<= aw.date.name>> ${phrase1} <<print setup.date.howAboutResult("${spot}")>></div><br><div></div>`;
  return output;
};

setup.date.howAboutResult = function(spot: string): string {
  // AWAI replacement coconut brain
  const ais = setup.interactionMisc.coconutBrain(aw.date.npc.key, aw.dateSpots[spot].aiTags[0]);
  aw.date.aiRes = ais[0];
  let output = "<br><br><span class='npc'>";
  switch (ais[0]) {
    case 1:
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output += `Oh, really? Frankly, I'd rather not.`;
      } else {
        output += `Are you serious? There's no way I'd want to go there of all places...`;
      }
      break;
    case 2:
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output += `Well, I'd rather not, but we can do it if that's really what you want.`;
      } else {
        output += `Well, I'd rather not, but we can go if that's really what you want.`;
      }
      break;
    case 3:
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output += `It isn't the thing I'd choose, but I suppose we can do it.`;
      } else {
        output += `It isn't somewhere I'd choose, but I suppose we can go.`;
      }
      break;
    case 4:
      output += `I guess that's okay, I don't have any objections.`;
      break;
    case 5:
      output += `Interesting choice, I suppose it could be fun.`;
      break;
    case 6:
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output += `Yeah, I think that'd be a nice thing to do.`;
      } else {
        output += `Yeah, I think that'd be a nice place to go.`;
      }
      break;
    case 7:
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output += `Oh, great pick. We should do it!`;
      } else {
        output += `Oh, great pick. We should go!`;
      }
      break;
    case 8:
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output += `Wohoo, let's do it!`;
      } else {
        output += `Wow, that's one of my favorite places. Let's go!`;
      }
      break;
  }
  output += ` ${ais[1]} </span><br><br>`;
  if (aw.date.dateType !== "yourhome" && aw.date.dateType !== "BFhome") {
    output += `<<button "GO THERE">><<run aw.dateSpots[aw.date.proposed].arrive()>><</button>> <<button "ON SECOND THOUGHT">><<scenereplace>><<print setup.date.locationPicker()>><</scenereplace>><</button>>`;
  } else {
    output += `<<button "DO IT">><<run aw.dateSpots[aw.date.proposed].arrive()>><</button>> <<button "ON SECOND THOUGHT">><<scenereplace>><<print setup.date.locationPicker()>><</scenereplace>><</button>>`;
  }
  return output;
};

setup.date.sel = function(key: string): void {
  if (key.slice(0, 1) === "'") {
    key = key.slice(1, -1);
  }
  aw.date.proposed = key;
  if (aw.dateSpots[key] == null) {
    aw.con.warn(`Given invalid key to setup.date.sel... value is ${key}`);
    aw.replace("#locationName", "Error - see console");
    return;
  }
  const namer = aw.dateSpots[key].name;
  aw.replace("#locationName", namer);
};

setup.date.locationPicker = function(): string {
  const restaurants: string[] = [];
  const desserts: string[] = [];
  const activities: string[] = [];
  const homeStuff: string[] = [];
  let output = "";
  aw.date.proposed = "none";
  if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
    const ᚥ = aw.dateSpots;
    output += `<<button "THEIR CHOICE">><<scenereplace>><<print setup.date.npcChoice()>><</scenereplace>><</button>> <<button "SUGGEST ACTIVITY">><<if aw.date.proposed !== "none">><<scenereplace>><<print setup.date.howAbout(aw.date.proposed)>><</scenereplace>><<else>><<notify>>Choose an activity to suggest first!<</notify>><</if>><</button>> <<button "CHOOSE ACTIVITY">><<if aw.date.proposed !== "none">><<run aw.dateSpots[aw.date.proposed].arrive()>><<else>><<notify>>Choose an activity first!<</notify>><</if>><</button>><<tab>><span style="font-size:1.2rem;"><span class="head">Chosen Activity:</span> <span id="locationName">None: click one below!</span></span><br><div id="dateLocationPicker">`;
    output += `<div id="pickerSectionHead">Home activities</div>`;
    for (const spot of Object.keys(ᚥ)) {
      if (ᚥ[spot].type === "yourhome") {
          homeStuff.push(spot);
      }
    }
    for (const key of homeStuff) {
      output += ᚥ[key].print;
    }
  } else {
    const ᚥ = aw.dateSpots;
    output += `<<button "THEIR CHOICE">><<scenereplace>><<print setup.date.npcChoice()>><</scenereplace>><</button>> <<button "SUGGEST LOCATION">><<if aw.date.proposed !== "none">><<scenereplace>><<print setup.date.howAbout(aw.date.proposed)>><</scenereplace>><<else>><<notify>>Choose a location to suggest first!<</notify>><</if>><</button>> <<button "CHOOSE LOCATION">><<if aw.date.proposed !== "none">><<run aw.dateSpots[aw.date.proposed].arrive()>><<else>><<notify>>Choose a location first!<</notify>><</if>><</button>><<tab>><span style="font-size:1.2rem;"><span class="head">Chosen Location:</span> <span id="locationName">None: click one below!</span></span><br><div id="dateLocationPicker">`;
    for (const spot of Object.keys(ᚥ)) {
      if (!aw.date.spots.includes(ᚥ[spot].key)) {
        switch (ᚥ[spot].category) {
          case "restaurant":
            if (!aw.date.ate) {
              restaurants.push(spot);
            }
            break;
          case "dessert":
            if (!aw.date.dessert) {
              desserts.push(spot);
            }
            break;
          default:
            activities.push(spot);
        }
      }
    }
    restaurants.sort();
    desserts.sort();
    activities.sort();
    if (!aw.date.ate && restaurants.length > 0) {
      output += `<div id="pickerSectionHead">Restaurant Locations</div>`;
      for (const key of restaurants) {
        output += ᚥ[key].print;
      }
    }
    if (!aw.date.dessert && desserts.length > 0) {
      output += `<div id="pickerSectionHead">Dessert Locations</div>`;
      for (const key of desserts) {
        output += ᚥ[key].print;
      }
    }
    if (activities.length > 0) {
      output += `<div id="pickerSectionHead">Activity Locations</div>`;
      for (const key of activities) {
        output += ᚥ[key].print;
      }
    }
  }
  output += "</div>";
  return output;
};

setup.date.activity = function(actKey: string): void {
  if (actKey === "npc") {
    const avail = aw.dateSpots[aw.date.spot].allowedActs();
    if (avail.length < 2 || random(1, 40) < 11) {
      setup.date.npcChoice();
      return;
    }
    actKey = either(...avail);
  }
  const act = aw.dateSpots[aw.date.spot].activities[actKey];
  aw.date.flag[aw.date.spot][actKey] = true;
  let content = (act.twee.slice(0, 3) === "DSP") ? `<<include [[${act.twee}]]>>` : act.twee;
  const prep = act.prep(); // should do fancy things including adding time
  content += aw.dateSpots[aw.date.spot].buttonGen();
  // TODO function to determine effects/reaction from the choice.
  aw.date.qual += random(0, 3) - 1;
  aw.date.enjoy[1] += random(0, 5) - random(1, 2);
  aw.date.enjoy[0] += random(0, 3) - 1;
  aw.date.arouse += random(0, 3) - random(0, 1);
  setup.scenario.refresh(); // refresh to update after prep function
  if (typeof prep === "boolean" && !prep) {
    aw.con.info(`Activity ${actKey} twee not played due to 'false' return value.`);
  } else {
    setup.scenario.replace(content);
  }
  setup.date.statRefresh();
};

setup.date.saySomething = function(type: string): void {
  // generate some generic flirting and whatnot.
  // comp sexy rom deep
  let output;
  setup.time.add(5);
  setup.SCXfunc();
  const dc = random(11, 14);
  const ᛔ = State.active.variables;
  let tht: string;
  switch (type) {
    case "deep":
      setup.SCfunc("PS", dc);
      tht = either("Global warming wouldn't be a problem if we all just opened up our windows with the AC on, you know?", "I heard that semen is the number one cause of bad breath, but honestly, does that even <i>count</i> as bad breath?", "How is it that rhinos survived when all the other dinosaurs died?", "Is bandwidth when everyone is fighting over the same wifi signal?");
      if (ᛔ.SCresult[1]) {
        tht = setup.deepThoughts(-1);
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You decide to try and spark some intellectual conversation.<br><br>@@.pc;You know, I was thinking. ${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} gives a little chuckle.<br><br>@@.npc;Huh, that's pretty neat.@@</p>`;
        aw.date.qual += random(2, 4);
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
      } else {
        if (aw.date.spot !== "watchMovie") {
          output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        } else {
          output += `<p>@@.npc;Oh come on, I am trying to watch the movie here! And this was silly.@@</p>`;
        }
        aw.date.qual -= random(1, 3);
        aw.date.enjoy[1] -= random(1, 3);
        aw.date.enjoy[0] -= random(1, 2);
        aw.date.arouse -= 1;
      }
      break;
    case "sexy":
      setup.SCfunc("SD", dc);
      tht = either("You know, I can't think of anything I love more than cock", "When do you think we'll get around to the fucking?", "Would you mind if I stopped by the gloryhole for a pick-me-up?");
      if (ᛔ.SCresult[1]) {
        tht = setup.sexyLines();
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You decide to try and get ${aw.date.name}'s engine running.<br><br>@@.pc;${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} enjoys it.<br><br>@@.npc;That's hot.@@</p>`;
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
        aw.date.arouse += random(5, 11);
      } else {
        if (aw.date.spot !== "watchMovie") {
          output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        } else {
          output += `<p>@@.npc;Oh come on, I am trying to watch the movie here.@@</p>`;
        }
        aw.date.qual -= random(1, 2);
        aw.date.enjoy[1] -= random(1, 3);
        aw.date.enjoy[0] -= random(1, 2);
        aw.date.arouse -= 1;
      }
      // output += `<p><<ctn>>This is a placeholder for sexy (and fail) dialog items that are partially determined by your character's kinks and a few other things like your status and clothing. This should be pretty cool when it's ready, but it was a bit too much to get fully functional for this release.<</ctn>></p>`;
      break;
    case "rom":
      setup.SCfunc("CM", dc);
      tht = either("I feel like love is mostly about the fucking. I mean, if you have that, the rest just sort of happens, right?", "I love you more than that whore always hanging out on Pascal street loves coke.", "What do you think about getting some lover's tattoos with our names on them?");
      if (ᛔ.SCresult[1]) {
        tht = setup.romanticShit();
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You decide to try and let ${aw.date.name} know how much you care about them.<br><br>@@.pc;${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} is touched.<br><br>@@.npc;I really care about you too.@@</p>`;
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
        aw.date.arouse += random(2, 3);
        aw.date.npc.rship.likePC += random(2, 3);
        aw.date.npc.rship.likeNPC += random(2, 3);
        aw.date.npc.rship.lovePC += random(2, 4);
        aw.date.npc.rship.loveNPC += random(2, 4);
      } else {
        if (aw.date.spot !== "watchMovie") {
          output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        } else {
          output += `<p>@@.npc;Please, I am really trying to watch the movie here...@@</p>`;
        }
        aw.date.qual -= random(1, 2);
        aw.date.enjoy[1] -= random(1, 3);
        aw.date.enjoy[0] -= random(1, 2);
        aw.date.arouse -= random(2, 10);
        aw.date.npc.rship.likePC -= random(1, 2);
        aw.date.npc.rship.likeNPC -= random(1, 2);
        aw.date.npc.rship.lovePC -= random(1, 3);
        aw.date.npc.rship.loveNPC -= random(1, 3);
      }
      // output += `<p><<ctn>>This is a placeholder for romantic (and fail) dialog items that are partially determined by your character's traits and some flags/relationship data. It was a bit too much to get fully functional for this release.<</ctn>></p>`;
      break;
      case "comp":
      setup.SCfunc("CM", dc);
      tht = either("Your eyes are so bright... just like nuclear explosions on a planet sentenced to exterminatus...", "I really like how good you are with hiding your imperfections with your clothes.", "Your are so awesome I bet that all your friends jerk off imagining you at least once per week.");
      if (ᛔ.SCresult[1]) {
        tht = setup.giveCompliment();
      }
      output = `<center>${ᛔ.SCtext[1]}</center><p>You want to please ${aw.date.name} with some compliment.<br><br>@@.pc;${tht}@@</p>`;
      if (ᛔ.SCresult[1]) {
        output += `<p>${aw.date.name} is happy.<br><br>@@.npc;Oh you really think that? It is so sweet!@@</p>`;
        aw.date.enjoy[1] += random(1, 3);
        aw.date.enjoy[0] += random(1, 2);
        aw.date.arouse += random(1, 2);
        aw.date.npc.rship.likePC += random(2, 3);
        aw.date.npc.rship.likeNPC += random(2, 3);
        aw.date.npc.rship.lovePC += random(4, 7);
        aw.date.npc.rship.loveNPC += random(4, 7);
      } else {
        if (aw.date.spot !== "watchMovie") {
          output += `<p>@@.npc;Wow... <i>really?</i> ... Okay then.@@</p>`;
        } else {
          output += `<p>@@.npc;Pssshh! I am trying to watch some movie here.@@</p>`;
        }
        aw.date.qual -= random(1, 3);
        aw.date.enjoy[1] -= random(1, 4);
        aw.date.enjoy[0] -= random(1, 3);
        aw.date.arouse -= random(1, 3);
        aw.date.npc.rship.likePC -= random(2, 4);
        aw.date.npc.rship.likeNPC -= random(2, 4);
        aw.date.npc.rship.lovePC -= random(3, 7);
        aw.date.npc.rship.loveNPC -= random(3, 7);
      }
      // output += `<p><<ctn>>This is a placeholder for compliment (and fail) dialog items that are partially determined by your character's traits and some flags/relationship data. It was a bit too much to get fully functional for this release.<</ctn>></p>`;
      break;
    default:
      output = "ERROR";
  }
  output += "<br>" + aw.dateSpots[aw.date.spot].buttonGen();
  setup.scenario.refresh();
  setup.scenario.replace(output);
  setup.date.statRefresh();
};

setup.date.aiQuery = function(aiKeys: string[], note?: string): number {

  return 0.5; // temp stuff
};

setup.date.npcChoice = function(): string {
  const restaurants: string[] = [];
  const desserts: string[] = [];
  const activities: string[] = [];
  const homeStuff: string[] = [];
  aw.date.proposed = "none";
  let output = "" as string;
  let sel: string;
  if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
    const ᚥ = aw.dateSpots;
    for (const spot of Object.keys(ᚥ)) {
      if (ᚥ[spot].type === "yourhome" || aw.date.dateType === "BFhome") {
          if (ᚥ[spot].check()) {
            homeStuff.push(spot);
            output += `<div id="pickerSectionHead">Home activities</div>`;
            for (const key of homeStuff) {
              output += ᚥ[key].print;
          }
        }
      }
    }
    if (aw.date.enjoy[1] < 10 && aw.time - aw.date.start > 30 || aw.date.enjoy[1] < (aw.date.qual + (aw.date.arouse / 3)) && (aw.time - aw.date.start > 30)) {
      output = "<<include [[DateLeaveSpotEndBad]]>>"; // end the date - unhappy
    } else if ((aw.time - aw.date.start >= 120 && random(0, 120) < aw.date.arouse) || (aw.time - aw.date.start > 240 && aw.date.arouse >= 50)) {
      output = "<<include [[DateLeaveSpotSexitimes]]>>";
    } else if (aw.time - aw.date.start > 240) {
      output = "<<include [[DateLeaveSpotAmicable]]>>";
    } else {
      sel = either(...homeStuff);
      const name = aw.dateSpots[sel].name;
      const txto = either(
        "Oh, I have an idea!",
        "I know something fun to do.",
        "Okay, I think that'll work...");
      output = `<p>@@.npc;${txto} Let's ${name}.@@</p><<dialogchoice>><<dbutt "OKAY">><<set aw.date.npcPicked = true>><<run aw.dateSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't really want to ${name}, isn't there something else to do? <<dbutt "no way" false>> <<dtext "arrogant">>Screw this, this date is <<has bitch>>fucking<<or>><</has>> over.<</dialogchoice>>`;
    }
  } else {
    const ᚥ = aw.dateSpots;
    for (const spot of Object.keys(ᚥ)) {
      if (!aw.date.spots.includes(ᚥ[spot].key)) {
        switch (ᚥ[spot].category) {
          case "restaurant":
            restaurants.push(spot);
            break;
          case "dessert":
            desserts.push(spot);
            break;
          default:
            activities.push(spot);
        }
      }
    }
    if (aw.date.enjoy[1] < 10 && aw.time - aw.date.start > 30 || aw.date.enjoy[1] < (aw.date.qual + (aw.date.arouse / 3)) && (aw.time - aw.date.start > 30)) {
      // end the date - unhappy
      output = "<<include [[DateLeaveSpotEndBad]]>>";
    } else if (!aw.date.ate && random(1, 40) > 10) {
      // pick a restaurant
      sel = either(...restaurants);
      const name = aw.dateSpots[sel].name;
      const txto = either(
        "I don't know about you, but I'm starved!",
        "I'm getting pretty hungry, I could definitely go for some food right about now.",
        "Well, what's a date without a nice meal?",
        `I'm thinking we'd better eat something so we have enough energy for later.@@ <<= aw.date.name>> gives you a wink.@@.npc;`);
      output = `<p>@@.npc;${txto} Let's head over to ${name} and eat.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<set aw.date.npcPicked = true>><<run aw.dateSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't mind eating, but you don't want to eat <b>there</b> of all places<<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
    } else if (aw.date.ate && !aw.date.dessert && random(1, 10) > 5) {
      // pick a dessert place
      sel = either(...desserts);
      const name = aw.dateSpots[sel].name;
      const txto = either(
        "I hope you saved room for dessert!",
        "I could really go for something sweet... aside from you, of course.",
        "I think it's time for a little treat.");
      output = `<p>@@.npc;${txto} Let's head over to ${name} for dessert.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<set aw.date.npcPicked = true>><<run aw.dateSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't mind dessert, but you don't want to eat <b>there</b> of all places<<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
    } else if ((aw.time - aw.date.start >= 120 && random(0, 120) < aw.date.arouse) || (aw.time - aw.date.start > 240 && aw.date.arouse >= 50)) {
      // sexitimes
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output = "<<include [[DateLeaveSpotSexitimes]]>>";
      } else {
        output = "<<include [[DateLeaveSpotSexitimesHome]]>>";
      }
    } else if (aw.time - aw.date.start > 240) {
      // date end amicable
      output = "<<include [[DateLeaveSpotAmicable]]>>";
    } else {
      // pick a normal activity
      sel = either(...activities);
      const name = aw.dateSpots[sel].name;
      const txto = either(
        "Oh, I have an idea!",
        "I know something fun to do.",
        "Okay, I think that'll work...");
      output = `<p>@@.npc;${txto} Let's head over to ${name}.@@</p><<dialogchoice>><<dbutt "LET'S GO">><<set aw.date.npcPicked = true>><<run aw.dateSpots["${sel}"].arrive()>><<dtext "angel">>Well, you insisted they choose, so no backing out now...<<dbutt "there?" false>> <<dtext "pain">>You don't really care for ${name}, isn't there something else? <<dbutt "no way" false>> <<dtext "arrogant">>Screw this, you're going home.<</dialogchoice>>`;
    }
  }
  return output;
};

setup.date.end = function(): void {
  // should close out the date
  if (aw.date.enjoy[0] >= 50) {
    const hap = random(1, 2);
    setup.status.happy(hap, "Having a date that went well");
    const str = random(5, 15) * -1;
    setup.status.stress(str, "Having a nice date");
    const lon = random(5, 15) * -1;
    setup.status.lonely(lon, "Having a date that ended well");
    aw.date.npc.rship.likeNPC += random(2, 3);
    aw.date.npc.rship.loveNPC += random(2, 4);
  } else {
    aw.date.npc.rship.likeNPC -= random(2, 3);
    aw.date.npc.rship.loveNPC -= random(2, 4);
  }
  if (aw.date.enjoy[1] >= 60) {
    aw.date.npc.rship.lovePC += random(2, 4);
    aw.date.npc.rship.likePC += random(2, 3);
  } else {
    aw.date.npc.rship.lovePC -= random(2, 4);
    aw.date.npc.rship.likePC -= random(2, 5);
  }
  setup.scenario.close();
  delete aw.date;
};

setup.date.eatHome = function(quality: number, npc: string, dish: string, dishIndex: number, drugged: string): string {
  const addIngr = ["SA", "HE", "ZO", "FO", "SE", "RA"]; // satyr, heat, zone, focus, semen, poison
  let out = "";
  let reaction1 = "";
  let reaction2 = "";
  let reaction3 = "";
  let heAteCum = "";
  if (aw.npc[npc] == null) {
    aw.con.warn(`attempted to run setup.date.eatHome with bad npcid: ${npc}.`);
    return `Sorry, some kind of error happened! Eating failed because of the wrong npcId sent to the func: ${npc} Please report it!`;
  }
  if (aw.dishes[dishIndex] == null) {
    aw.con.warn(`attempted to run setup.date.eatHome with bad dish number: ${dish}, ${dishIndex}.`);
    return `Sorry, some kind of error happened! Eating failed because of the wrong dish sent to the func: ${dish}, ${dishIndex}. Please report it!`;
  }
  switch (quality) {
    case 1:
      aw.date.enjoy[1] -= random(17, 25);
      aw.date.enjoy[1] += Math.round(aw.dishes[dishIndex].baseQuality / 5);
      reaction1 = `smells... interesting.`;
      reaction2 = `It was a... well good attempt on ${dish}.`;
      reaction3 = `in an awkward silence`;
      break;
    case 2:
      aw.date.enjoy[1] += random(2, 5);
      aw.date.enjoy[1] += Math.round(aw.dishes[dishIndex].baseQuality / 3);
      reaction1 = `smells nice!`;
      reaction2 = `Oh I liked this ${dish}!`;
      reaction3 = `having a nice chat`;
      break;
    case 3:
      aw.date.enjoy[1] += random(4, 10);
      aw.date.enjoy[1] += Math.round(aw.dishes[dishIndex].baseQuality / 3);
      reaction1 = `smells fantastic! Oh, I am drooling already!`;
      reaction2 = `Wow, I have never ate such a nice ${dish}, really! You are a fantastical cook!`;
      reaction3 = `while ${aw.npc[npc].main.name} praises your cooking talents`;
      break;
    default:
      break;
  }
  if (drugged !== "PL") {
    let drug = "sex" as "sex" | "satyr" | "alc" | "heat" | "focus" | "cum" | "zone" | "cream";
    switch (drugged) {
      case "SA":
        drug = "satyr";
        reaction2 += " Hmm, it tingles on my tongue... Just like pepper but not quite...";
        if (aw.date.npc.main.male) {
          aw.date.arouse += random(16, 25);
        } else {
          aw.date.arouse += random(3, 7);
        }
        break;
      case "RA": // what have you done lol
        let his = "his";
        if (aw.date.npc.main.female) {
          his = "her";
        }
        State.active.variables.dateType = clone(aw.date.dateType);
        setup.date.end();
        setup.dialog("Dating", `<<if $dateType == "BFhome">>@@.mono;It is good that I took the meal I cooked in a container with me. It will only take a minute to heat it and I can serve it!@@ <</if>>${aw.npc[npc].main.name} sniffs the air while you bring the plates with the ${dish} to the table. @@.npc;That smells really nice!@@ Serving everything you take your seat and nervously watch ${aw.npc[npc].main.name} tries it holding your breath... @@.npc;Mmm-m! I like the taste!@@ Trying to hide that you are not actually eating with messing the food all over your plate you observe ${aw.npc[npc].main.name} slowly getting more and more concerned through the meal. ${aw.npc[npc].main.name} stars to sweat. @@.pc;Oh, is something wrong?@@ @@.npc;I... don't feel so good for some reason, pardon me.@@ Feeling weird excitement you notice ${his} breathing getting impetuous. Suddenly ${aw.npc[npc].main.name} vomits right into the plate. In silence you observe the body falling from the chair to the floor in spasms of dry nauseа. Shivering, strong at first, subsides as well as ${aw.npc[npc].main.name}'s breathing. You squat to see last sparks of life leaving ${his} eyes. It's over now.`);
        setup.status.happy(-3, `You killed poor ${aw.npc[npc].main.name}`);
        setup.status.stress(50, `You killed poor ${aw.npc[npc].main.name}`);
        ↂ.home.item.kitchen.push("corpse");
        ↂ.flag.victimName = aw.npc[npc].main.name + " " + aw.npc[npc].main.surname;
        setup.omni.new("killer");
        setup.achieve.new("killer");
        delete aw.npc[npc]; // goodnight, sweetheart!
        aw.S();
        break;
      case "He":
        drug = "heat";
        reaction2 += " Hmm, tastes interesting... just like... hmm, it is hard to describe...";
        if (aw.date.npc.main.male) {
          aw.date.arouse += random(3, 7);
        } else {
          aw.date.arouse += random(16, 25);
        }
        break;
      case "ZO":
        drug = "zone";
        reaction2 += " You know, I feel so much better after the meal to be honest... A bit weird though... But better. I guess I was just really hungry!";
        aw.date.enjoy[1] += random(13, 18);
        break;
      case "FO":
        drug = "focus";
        reaction2 += " Hmm, interesting taste though...";
        aw.date.enjoy[1] += random(3, 9);
        break;
      case "SE":
        drug = "cum";
        reaction2 += " Hmm, some familiar aftertaste... what is it?";
        heAteCum += " @@.pc;Some secret ingredient, he-he!@@"; // lol
        aw.npc[npc].status.bimbo += 3;
        aw.date.arouse += random(8, 15);
        break;
      default:
        break;
    }
    aw.npc[npc].status.addict[drug] += 6;
    setup.drug.eatDrug(drug, 20);
  }
  setup.food.eat(35, "health");
  out += `${aw.npc[npc].main.name} sniffs the air while you bring the plates with the ${dish} to the table. @@.npc;That ${reaction1}@@ Serving everything you take your seat and watch ${aw.npc[npc].main.name} tries it holding your breath... @@.npc;${reaction2}@@${heAteCum} You continue your dinner ${reaction3} until you both feel full. You decide to know more about <<= aw.date.name>>. <<print setup.storythread.getStory(aw.date.npcid)>>`;
  aw.S();
  return out;
};

setup.date.tagText = function(tag: string, name: string): string {
  let output = "You spend some time talking about ";
  switch (tag) {
    case "seriousIllness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(2, 4);
      break;
    case "illness":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "poorHealth":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "amazingClothes":
      output += `just how nice your clothes are. It seems that ${name} is taken by your fashion sense`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] += random(2, 4);
      break;
    case "niceClothes":
      output += `the challenge of choosing the right clothes for a date. It's a bit of an odd topic--on a date no less--but ${name} seems to enjoy it`;
      aw.date.arouse += random(1, 4);
      aw.date.enjoy[1] += random(1, 3);
      break;
    case "formalClothing":
      output += `how you dressed so elegantly for the occasion. ${name} seems to have a little trepidation about being under-dressed, but you manage to smooth things over`;
      aw.date.arouse -= random(1, 3);
      aw.date.enjoy[1] -= random(2, 5);
      aw.date.qual -= 1;
      break;
    case "slovenlyClothes":
      output += `your... <i>unique</i> choice of clothes for the evening`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(3, 5);
      aw.date.qual -= 5;
      break;
    case "superSexyClothes":
      output += `just how amazingly sexy your clothes are. ${name} seems to need a moment to calm down, in fact`;
      aw.date.arouse += random(12, 20);
      aw.date.enjoy[1] += random(5, 10);
      aw.date.qual += random(1, 4);
      break;
    case "sexyClothes":
      output += `just how sexy your clothes are. ${name} seems really taken with your outfit`;
      aw.date.arouse += random(8, 16);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 3);
      break;
    case "superCuteClothes":
      output += `how ludicrously cute your outfit is`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 4);
      break;
    case "cuteClothes":
      output += `how cute your outfit is`;
      aw.date.arouse += random(1, 3);
      aw.date.enjoy[1] += random(2, 6);
      aw.date.qual += random(1, 3);
      break;
    case "nakedBottom":
      output += `how you're walking around with your cunt exposed to the public`;
      aw.date.arouse += random(30, 40);
      aw.date.enjoy[1] -= random(1, 5);
      aw.date.qual -= random(10, 15);
      break;
    case "practNakedBottom":
      output += `how daring the lower portion of your outfit is, and how little it would get in the way of some intimate contact at the right moment`;
      aw.date.arouse += random(25, 35);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual += random(1, 3);
      break;
    case "exhibitBottom":
      output += `how much the lower portion of your outfit shows off, and how little it would get in the way of some intimate contact at the right moment`;
      aw.date.arouse += random(20, 30);
      aw.date.enjoy[1] += random(8, 13);
      aw.date.qual += random(1, 3);
      break;
    case "nakedTop":
      output += `the freedom of being topless, and just how nice your <<p tit.q>> breasts are`;
      aw.date.arouse += random(18, 26);
      aw.date.enjoy[1] += random(8, 13);
      aw.date.qual += random(1, 5);
      break;
    case "buckNaked":
      if (aw.date.dateType === "yourhome" || aw.date.dateType === "BFhome") {
        output += `how you're surprised your date with your buck naked appearance.`;
      } else {
        output += `how you're walking around buck naked and basically begging to be arrested`;
        aw.date.qual -= random(10, 15);
      }
      aw.date.arouse += random(40, 50);
      aw.date.enjoy[1] -= random(0, 10);
      break;
    case "practNakedTop":
      output += `how your top really frees your breasts, and just how nice those <<p tit.q>> breasts are`;
      aw.date.arouse += random(16, 25);
      aw.date.enjoy[1] += random(8, 13);
      aw.date.qual += random(1, 5);
      break;
    case "exhibitTop":
      output += `the eye-catching way your top <i>mostly</i> manages to barely conceal your breasts, and just how nice your <<p tit.q>> breasts are`;
      aw.date.arouse += random(10, 20);
      aw.date.enjoy[1] += random(5, 10);
      aw.date.qual += random(1, 5);
      break;
    case "pussyAccess":
    case "assAccess":
    case "buttAccess":
    case "nipAccess":
    case "titsAccess":
      output += `how your clothes conveniently allow access to certain parts of your anatomy, should someone be interested..`;
      aw.date.arouse += random(20, 30);
      aw.date.enjoy[1] += random(5, 10);
      aw.date.qual += random(1, 5);
      break;
    case "wetClothes":
      output += `how you ended up getting soaking wet before your date`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] -= random(2, 5);
      aw.date.qual -= random(4, 8);
      break;
    case "stainedClothes":
      output += `how you ended up getting some rather suspicious stains on your clothes right before your date`;
      aw.date.arouse -= random(2, 5);
      aw.date.enjoy[1] -= random(5, 9);
      aw.date.qual -= random(7, 12);
      break;
    case "damagedClothes":
      output += `how you ended up damaging your clothes before your date`;
      aw.date.arouse += random(2, 5);
      aw.date.enjoy[1] -= random(2, 5);
      aw.date.qual -= random(4, 8);
      break;
    case "kinkyClothes":
      output += `just how sexy your clothes are. ${name} seems really taken with your outfit`;
      aw.date.arouse += random(8, 16);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 3);
      break;
    case "nightwear":
      output += `your selection of lingerie, which of course you had to show to ${name} so they could be appreciated`;
      aw.date.arouse += random(8, 16);
      aw.date.enjoy[1] += random(3, 7);
      aw.date.qual += random(1, 3);
      break;
    case "swimwear":
      output += `your unusual choice of wearing swimwear on your date`;
      aw.date.arouse += random(5, 10);
      aw.date.enjoy[1] += random(1, 5);
      aw.date.qual += random(0, 1);
      break;
    case "athleticClothes":
      output += `your... <i>unique</i> choice of athletic clothes for the evening`;
      aw.date.arouse -= random(1, 3);
      aw.date.enjoy[1] -= random(3, 5);
      aw.date.qual -= 5;
      break;
    case "lightPheromones":
      output += `just how alluring ${name} finds you`;
      aw.date.arouse += random(30, 40);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual += random(5, 10);
      break;
    case "pheromones":
      output += `${name}'s urges to just skip the date and get to the sex right away`;
      aw.date.arouse = 85 + random(1, 14);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual -= random(5, 10);
      break;
    case "goddess":
      output += `just how stricken ${name} is by your intoxicating beauty`;
      aw.date.arouse += random(40, 50);
      aw.date.enjoy[1] += random(15, 25);
      aw.date.qual += random(10, 20);
      break;
    case "hairyLegs":
      output += `about how long its been since you shaved your legs`;
      aw.date.arouse -= random(10, 22);
      aw.date.enjoy[1] -= random(5, 20);
      aw.date.qual -= random(5, 10);
      break;
    case "hairyPits":
      output += `about the armpit hair poking out from between your arms`;
      aw.date.arouse -= random(10, 22);
      aw.date.enjoy[1] -= random(5, 20);
      aw.date.qual -= random(5, 10);
      break;
    case "clownMakeup":
      output += `about your rather <i>special</i> choices with your makeup`;
      aw.date.arouse -= random(5, 10);
      aw.date.enjoy[1] -= random(3, 9);
      aw.date.qual -= random(5, 10);
      break;
    case "garishMakeup":
      output += `about your rather flashy makeup choices`;
      aw.date.arouse -= random(0, 5);
      aw.date.enjoy[1] -= random(2, 6);
      aw.date.qual -= random(4, 8);
      break;
    case "bodywriting":
      output += `how humiliating it must be for you to have these words written on you with permanent marker`;
      aw.date.arouse += random(1, 4);
      aw.date.enjoy[1] -= random(0, 2);
      aw.date.qual -= random(1, 3);
      break;
    case "scar":
      output += `how terrible this scar looks`;
      aw.date.arouse -= random(1, 4);
      aw.date.enjoy[1] -= random(1, 3);
      aw.date.qual -= random(1, 3);
      break;
    case "tattoo":
      output += `how nice are your tattoos`;
      aw.date.arouse += random(0, 2);
      aw.date.enjoy[1] += random(1, 3);
      aw.date.qual += random(1, 3);
      break;
    case "lewdTattoo":
      output += `about rather "interesting" things noticeable on your skin`;
      aw.date.arouse += random(5, 12);
      aw.date.enjoy[1] += random(2, 4);
      aw.date.qual += random(1, 3);
      break;
    case "addicted":
      const drug = ↂ.pc.status.addict.max;
      const drugText = {
        sex: "sex, and how you hope to get some cocks tonight",
        alc: "booze. You even claim that you must've been Russian in a former life",
        heat: "heat, and how it makes sex so much better",
        satyr: "satyr, and how much sex it lets you have",
        focus: "focus, and how it's improved your life",
        cum: "drinking cum, and how you're looking forward to having some fresh later",
        zone: "zone, and how your life seems to really be on track these days",
        cream: "your pussy being filled with cum, and how you're looking forward to a big creampie later",
      };
      aw.date.qual -= random(2, 5);
      output += `how much you <b>love</b> ${drugText[drug]}`;
      break;
    case "withdrawal":
      output += `how ill you look. ${name} seems to be seriously concerned, but you insist that you'll be fine`;
      aw.date.arouse -= random(3, 8);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "stressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "depressed":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "sad":
      output += `how you look like you aren't feeling well. ${name} seems to be concerned, but you insist that you'll be just fine`;
      aw.date.arouse -= random(2, 6);
      aw.date.enjoy[1] -= random(1, 3);
      break;
    case "aroused":
      output += `your skin is flushed and glowing. You eventually reveal that you're incredibly horny...`;
      aw.date.arouse += random(20, 30);
      aw.date.enjoy[1] -= random(3, 8);
      aw.date.qual += random(2, 4);
      break;
    case "angry":
      output += `the stupid shit that's been going on in your life, and how pissed off you are about it`;
      aw.date.arouse -= random(5, 15);
      aw.date.enjoy[1] -= random(5, 15);
      aw.date.qual -= random(5, 10);
      break;
    case "bimbo":
      output += `excited you are to be going out, and stuff.`;
      aw.date.arouse += random(5, 10);
      aw.date.qual -= random(2, 6);
      break;
    case "perverted":
      output += `the porn the two of you have been watching lately. It's an odd, but effective icebreaker`;
      aw.date.arouse += random(15, 25);
      aw.date.enjoy[1] += random(10, 15);
      aw.date.qual += random(2, 6);
      break;
    case "latePreg":
    case "preg":
      if (random(1, 3) === 1) {
        output += `how your pregnancy is coming along. You end up complaining a bit too much though`;
        aw.date.arouse -= random(3, 10);
        aw.date.enjoy[1] -= random(5, 10);
      } else {
        output += `how your pregnancy is coming along, and just how much you love being pregnant`;
        aw.date.arouse += random(5, 15);
        aw.date.enjoy[1] += random(3, 8);
      }
      break;
    case "drunk":
      output += `drunk you are, particularly after you let it sleep how easy it'd be to get into your pants if you have another drink or two.`;
      aw.date.arouse += random(3, 10);
      aw.date.enjoy[1] -= random(5, 10);
      break;
    case "tipsy":
      output += `how "clingy" you get when you've had a drink or two.`;
      aw.date.arouse += random(3, 10);
      break;
    case "mindbreak":
      output += ``;
      break;
    case "fullTits":
      output += `how stuffed with milk your breasts are because you weren't able to pump them. You confess that you think milking would probably be so much nicer if you had someone to give you a hand... or mouth`;
      aw.date.arouse += random(12, 15);
      aw.date.enjoy[1] += random(5, 10);
      break;
    default:
      output += either("a shocking story that hit the news recently", "what you think of the cockmongering match that was aired the other night", "how nice the weather has been recently", "how awful the weather has been recently", "about the trailer you saw for the Incubatrix sequel");
  }
  output += ".";
  return output;
};

// prepares temp variables for serious shit
setup.date.serious = function(): void {
  const ᛔ = State.temporary;
  ᛔ.canAdv = false;
  ᛔ.advText = "No relationship advancement is possible";
  ᛔ.advButt = "ADVANCE";
  switch (aw.date.eligible[0]) {
    case "engaged":
      ᛔ.canAdv = true;
      ᛔ.advText = "Ask your date to marry you.";
      ᛔ.advButt = "PROPOSE";
      break;
    case "lovers":
      ᛔ.canAdv = true;
      ᛔ.advText = "Tell your date you love them.";
      ᛔ.advButt = "I LOVE YOU";
      break;
    case "exclusive":
      ᛔ.canAdv = true;
      ᛔ.advText = "Ask to make your relationship official.";
      if (aw.date.npc.main.female) {
        ᛔ.advButt = "GIRLFRIEND";
      } else {
        ᛔ.advButt = "BOYFRIEND";
      }
      break;
    default:
      ᛔ.canAdv = false;
      ᛔ.advText = "You can't currently advance your relationship...";
  }
  ᛔ.canAccuse = false;
  if (aw.date.npc.record.cheat.PCsuspicion > 50) {
    ᛔ.canAccuse = true;
  }
  ᛔ.canPreg = false;
  if (ↂ.pc.status.pregnant && (ↂ.pc.status.wombA.know || ↂ.pc.status.wombB.know) && !aw.date.npc.record.flag.knowPCpreg) {
    ᛔ.canPreg = true;
    if (ↂ.pc.status.babyDaddy.includes(aw.date.npcid)) {
      ᛔ.isDad = true;
    } else {
      ᛔ.isDad = false;
    }
    if (aw.date.npc.record.sex.creampie > 0) {
      ᛔ.dadPossible = true;
    } else {
      ᛔ.dadPossible = false;
    }
  }
  ᛔ.canSlut = true;
  if (aw.date.npc.record.flag.openRship || aw.date.npc.rship.category === "dating") {
    ᛔ.canSlut = false;
  }
  ᛔ.canConf = false;
  if (aw.date.npc.record.cheat.PChasCheated) {
    ᛔ.canConf = true;
  }
  if ((aw.date.npc.rship.lovers || aw.date.npc.rship.engaged) && !ↂ.flag.liveTogether) {
    ᛔ.canLiveWith = true;
  } else {
    ᛔ.canLiveWith = false;
  }
  // Note: I didn't add code/dialog to stop living together, because 99% that would end in a breakup, which you can already do.
};

setup.date.askOpen = function(): number {
  if (aw.date.npc.kink.superSlut || aw.date.npc.status.bimbo > 49) {
    setup.date.goodThings(2, 2, 3);
    return 1;
  }
  let x = aw.date.npc.rship.lovePC - Math.min(25, Math.round(aw.date.npc.status.perversion / 3));
  if (aw.date.npc.kink.sub) {
    x -= random(5, 10);
  }
  if (aw.date.npc.kink.slut) {
    x -= 15;
  }
  if (aw.date.npc.trait.extro) {
    x -= 5;
  }
  if (random(0, 100) > x) {
    aw.date.npc.rship.lovePC -= random(8, 15);
    aw.date.npc.rship.likePC -= random(3, 8);
    aw.date.npc.record.flag.openRship = true;
    return 2;
  }
  aw.date.npc.rship.lovePC -= random(10, 15);
  aw.date.npc.rship.likePC -= random(10, 15);
  setup.date.badThings(5, 5, 4);
  setup.date.statRefresh();
  return 3;
};


