/*
██╗   ██╗ ██████╗ ██╗    ██╗███████╗
██║   ██║██╔═══██╗██║    ██║██╔════╝
██║   ██║██║   ██║██║ █╗ ██║███████╗
╚██╗ ██╔╝██║   ██║██║███╗██║╚════██║
 ╚████╔╝ ╚██████╔╝╚███╔███╔╝███████║
  ╚═══╝   ╚═════╝  ╚══╝╚══╝ ╚══════╝
*/



/*
A class is used as a simple way to generate a new set of vows for a NPC.
It does not need to be saved/reinitialized as a class, as it is just a simple
object with set properties.
*/

class Vows {
  public active: boolean;
  public noCondom: boolean;
  public condom: boolean;
  public noPill: boolean;
  public noIUD: boolean;
  public IUD: boolean;
  public pregnant: boolean;
  public noKids: boolean;
  public kids: boolean;
  public moneyPC: number;
  public moneyNPC: number;
  public sub: boolean;
  public dom: boolean;
  public slave: boolean;
  public exclusiveWomb: boolean;
  public noTransform: boolean;
  public houseWife: boolean;
  public houseSpouse: boolean;
  public pcCleans: boolean;
  public npcCleans: boolean;
  public hucow: boolean;
  public titSize: number;
  public nudity: boolean;
  constructor() {
    this.active = true;
    this.noCondom = false;
    this.condom = false;
    this.noPill = false;
    this.noIUD = false;
    this.IUD = false;
    this.pregnant = false;
    this.noKids = false;
    this.kids = false;
    this.moneyPC = 0;
    this.moneyNPC = 0;
    this.sub = false;
    this.dom = false;
    this.slave = false;
    this.exclusiveWomb = false;
    this.noTransform = false;
    this.houseWife = false;
    this.houseSpouse = false;
    this.pcCleans = false;
    this.npcCleans = false;
    this.hucow = false;
    this.titSize = 0;
    this.nudity = false;
  }
}


interface IntSetupVows {
  init: (npcid: npcid) => void;
  has: (vow: string) => boolean;
  delete: (npcid: npcid) => void;
  print: (npcid: npcid) => string;
  weekMoney: () => number;
  npcVowsProposal: (npcid: npcid) => string;
  npcVowsPc: () => string;
  NPCvowsCB: () => string;
  npcVowsFinalize: () => void;
  names: string[];
  fullNames: string[];
  fullNamesPC: {};
  desc: string[];
}

setup.vow = {
  init(npcid: npcid): void {
    if (!setup.npcid.test(npcid)) {
      aw.con.warn(`Invalid NPCID (${npcid}) given to setup.vow.init to initialize new vows!`);
      return;
    }
    ↂ.flag.vows[npcid] = new Vows();
    aw.S("flag");
  },
  has(vow: string): boolean {
    let result = false;
    const keys = Object.keys(ↂ.flag.vows);
    if (keys.length > 0) {
      for (const npc of keys) {
        if (ↂ.flag.vows[npc].active && ↂ.flag.vows[npc][vow]) {
          result = true;
        }
      }
    }
    return result;
  },
  delete(npcid: npcid) {
    if (ↂ.flag.vows[npcid] != null) {
      delete ↂ.flag.vows[npcid];
    }
  },
  print(npcid: npcid): string {
    if (aw.npc[npcid] == null) {
      return `ERROR: NPC with ID ${npcid} does not exist!`;
    }
    const name = aw.npc[npcid].main.name;
    if (ↂ.flag.vows[npcid] == null || !ↂ.flag.vows[npcid].active) {
      return `You do not have any vows with ${name}.`;
    }
    let output = `You have made the following vows with ${name}:`;
    let cunt = 0;
    for (let i = 0, c = setup.vow.names.length; i < c; i++) {
      if (ↂ.flag.vows[npcid][setup.vow.names[i]]) {
        cunt++;
        output += "<br>";
        output += setup.vow.desc[i];
        if (setup.vow.names[i] === "titSize") {
          output += ` (at least ${ↂ.flag.vows[npcid].titSize}cc)`;
        } else if (setup.vow.names[i] === "moneyPC") {
          output += ` (@@.money;₢${ↂ.flag.vows[npcid].moneyPC}@@)`;
        } else if (setup.vow.names[i] === "moneyNPC") {
          output += ` (@@.money;₢${ↂ.flag.vows[npcid].moneyNPC}@@)`;
        }
      }
    }
    if (cunt === 0) {
      output += "<br>No active vows.";
    }
    return output;
  },
  weekMoney(): number {
    const keys = Object.keys(ↂ.flag.vows);
    let out = 0;
    if (keys.length > 0) {
      for (const npc of keys) {
        if (ↂ.flag.vows[npc].active && ↂ.flag.vows[npc].moneyPC > 0) {
          out += ↂ.flag.vows[npc].moneyPC;
        }
        if (ↂ.flag.vows[npc].active && ↂ.flag.vows[npc].moneyNPC > 0) {
          out -= ↂ.flag.vows[npc].moneyNPC;
        }
      }
    }
    return out;
  },
  npcVowsProposal(npcid: npcid): string {
    
    if (aw.npc[npcid] == null) {
      aw.con.warn(`ERROR: NPC with ID ${npcid} does not exist! (npcVowsProposal)`);
      return `ERROR: NPC with ID ${npcid} does not exist! (npcVowsProposal)`;
    }
    let out = "";
    const vowsWeight = [
      0, // noCondom
      0, // condom
      0, // noPill
      0, // noIUD
      0, // IUD
      0, // pregnant
      0, // noKids
      10, // kids
      0, // sub
      0, // dom
      0, // slave (10)
      10, // exclusiveWomb
      0, // noTransform
      0, // houseWife
      0, // houseSpouse
      0, // pcCleans
      0, // npcCleans
      0, // hucow
      0, // nudity
      0, // titSize
      0, // moneyPC
      0  // moneyNPC
    ];
    const proBirthControl = [1,4,6];
    const antiBirthControl = [0,2,3,5,7];
    State.active.variables.moneyVow = random(100,300);
    State.active.variables.boobsizeVow = random(1200, 4000);
    for (let index = 0; index < vowsWeight.length; index++) {
      vowsWeight[index] += either(-10, -10, 0, 0, 0, 0, 10, 10, 20);
    }
    if (setup.interactionMisc.isDom(npcid)) {
      vowsWeight[8] += 50;
      vowsWeight[10] += 30;
    } else if (setup.interactionMisc.isSub(npcid)) {
      vowsWeight[9] += 50;
    }
    if (aw.npc[npcid].kink.dom) {
      vowsWeight[8] += 20;
      vowsWeight[10] += 10;
    }
    if (aw.npc[npcid].kink.sub) {
      vowsWeight[9] += 20;
    }
    if (aw.npc[npcid].kink.masochist || aw.npc[npcid].kink.force || aw.npc[npcid].kink.bond) {
      vowsWeight[9] += 10;
    }
    if (aw.npc[npcid].kink.risky) {
      vowsWeight[0] += 10;
      vowsWeight[2] += 20;
      vowsWeight[3] += 20;
    }
    if (aw.npc[npcid].kink.pregnancy) {
      vowsWeight[0] += 20;
      vowsWeight[2] += 30;
      vowsWeight[3] += 30;
      vowsWeight[5] += 40;
    }
    if (aw.npc[npcid].kink.liberate) {
      vowsWeight[18] += 10;
    }
    if (aw.npc[npcid].kink.exhibition) {
      vowsWeight[18] += 20;
    }
    if (aw.npc[npcid].kink.shame) {
      vowsWeight[18] -= 20;
    }
    if (aw.npc[npcid].kink.shame) {
      vowsWeight[18] -= 20;
    }
    if (aw.npc[npcid].background.wealth > ↂ.job.percept) {
      vowsWeight[20] += 20;
      vowsWeight[13] += 20;
    }
    if (aw.npc[npcid].background.wealth < ↂ.job.percept) {
      vowsWeight[21] += 20;
      vowsWeight[14] += 20;
    }
    if (aw.npc[npcid].trait.iq < 100) {
      vowsWeight[13] += 20;
      vowsWeight[15] += 20;
      vowsWeight[21] += 20;
    }
    if (!aw.npc[npcid].main.male) {
      vowsWeight[0] = 0;
      vowsWeight[1] = 0;
      vowsWeight[2] = 0;
      vowsWeight[3] = 0;
      vowsWeight[4] = 0;
      vowsWeight[5] = 0;
      vowsWeight[6] = 0;
      vowsWeight[11] = 0;
    }
    aw.con.info(`npcVowsProposal results: ${vowsWeight}`)
    const mostImportant = setup.indexOfMax(vowsWeight);
    if (proBirthControl.includes(mostImportant)) {
      vowsWeight[0] = 0;
      vowsWeight[2] = 0;
      vowsWeight[3] = 0;
      vowsWeight[5] = 0;
      vowsWeight[7] = 0;
    }
    if (antiBirthControl.includes(mostImportant)) {
      vowsWeight[1] = 0;
      vowsWeight[4] = 0;
      vowsWeight[6] = 0;
    }
    let addText = "";
    if (mostImportant === 19) {
      addText = `Let's say at least ${State.active.variables.boobsizeVow} cc.`;
    } else if (mostImportant === 20 || mostImportant === 21) {
      addText = `Let's say ${State.active.variables.moneyVow} bucks.`;
    }
    out += `<p>@@.npc;First important for me is ${setup.vow.fullNames[mostImportant]} ${addText}. I mean this is really a most important thing for me and I don't think I can be happy in marriage if we don't agree on this first.@@</p>`;
    out += `<p>@@.pc;Oh, I see.@@</p>`;
    vowsWeight[mostImportant] = 0;
    addText = "";
    let second = setup.indexOfMax(vowsWeight);
    if (vowsWeight[second] === 0) { // lol
      second = setup.indexOfMax(vowsWeight);
    }
    if (second === 19) {
      addText = `Let's say at least ${State.active.variables.boobsizeVow} cc`;
    } else if (second === 20 || second === 21) {
      addText = `Let's say ${State.active.variables.moneyVow} bucks`;
    }
    out += `<p>@@.npc;Second I'd wish ${setup.vow.fullNames[second]}. ${addText}. `;
    vowsWeight[second] = 0;
    addText = "";
    let third = setup.indexOfMax(vowsWeight);
    if (vowsWeight[third] === 0) { // lol
      third = setup.indexOfMax(vowsWeight);
    }
    if (third === 19) {
      addText = `Let's say at least ${State.active.variables.boobsizeVow} cc`;
    } else if (third === 20 || third === 21) {
      addText = `Let's say ${State.active.variables.moneyVow} bucks`;
    }
    out += `And finally... let me think... Yeah, maybe ${setup.vow.fullNames[third]}. ${addText}? These last two are a thing to discuss though, I want us both to be really happy in this relationship.@@</p>`;
    ↂ.flag.marriage.NPCvows = [setup.vow.names[mostImportant], setup.vow.names[second],setup.vow.names[third]];
    aw.S();
    out += `
    <<dialogchoice>>
      <<dbutt "Yes">><<replace "#weddingBox">><<include [[Wedding-c]]>><</replace>>
      <<dtext "happy">>You are agree to all of those vows.
      <<dbutt "second">><<replace "#weddingBox">><<set $vowToDiscuss = 2>><<include [[Wedding-vowsObject]]>><</replace>>
      <<dtext "sad">>You don't feel like second fits you. Maybe we could drop it?
      <<dbutt "third" >><<replace "#weddingBox">><<set $vowToDiscuss = 3>><<include [[Wedding-vowsObject]]>><</replace>>
      <<dtext "sad">>You don't feel like third fits you. Maybe we could drop it?
      <<dbutt "fuck it">><<replace "#weddingBox">><<include [[Wedding-fuckit]]>><</replace>>
      <<dtext "mad">>You don't want this bloody marriage anymore.
    <</dialogchoice>>
    `;
    aw.con.info(`npcVowsProposal results 2: ${mostImportant}, ${second}, ${third}`)
    return out;
  },
  npcVowsPc(): string {
    let out = "<center>";
    const vows = {
      noCondom: true,
      condom: true,
      noPill: true,
      noIUD: true,
      IUD: true,
      pregnant: true,
      noKids: true,
      kids: true,
      sub: true,
      dom: true,
      slave: true,
      exclusiveWomb: true,
      noTransform: true,
      houseWife: true,
      houseSpouse: true,
      pcCleans: true,
      npcCleans: true,
      hucow: true,
      nudity: true,
      titSize: true,
      moneyPC: true,
      moneyNPC: true,
    };
    if (!aw.date.npc.main.male) {
      vows.noCondom = false;
      vows.condom = false;
      vows.noPill = false;
      vows.noIUD = false;
      vows.IUD = false;
      vows.pregnant = false;
      vows.noKids = false;
      vows.exclusiveWomb = false;
    }
    const keys = Object.keys(vows);
    if (keys.length > 0) {
      for (const vow of keys) {
        if (vows[vow] && !ↂ.flag.marriage.NPCvows.includes(vow)) {
          out += `<<checkboxA "$vows${vow}" false true>> ${setup.vow.fullNamesPC[vow]}<br>`;
        }
      }
      out += `<<button "Propose">><<replace "#weddingBox">><<include [[Wedding-d]]>><</replace>><</button>></center>`;
    } else {
      return "Error in vow system, pls report it and use emergency exit button!"
    }
    return out;
  },
  NPCvowsCB(): string {
    let out = true;
    const vows = {
      noCondom: true,
      condom: true,
      noPill: true,
      noIUD: true,
      IUD: true,
      pregnant: true,
      noKids: true,
      kids: true,
      sub: true,
      dom: true,
      slave: true,
      exclusiveWomb: true,
      noTransform: true,
      houseWife: true,
      houseSpouse: true,
      pcCleans: true,
      npcCleans: true,
      hucow: true,
      nudity: true,
      titSize: true,
      moneyPC: true,
      moneyNPC: true,
    };
    if (State.active.variables.vowsnoCondom && State.active.variables.vowscondom) {
      return `<p>@@.npc;Hey, we can't decide on both using and not using the condom, mm?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    if (State.active.variables.noIUD && State.active.variables.IUD) {
      return `<p>@@.npc;So... I don't get it, will you have IUD or not?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    if (State.active.variables.noKids && State.active.variables.kids) {
      return `<p>@@.npc;Umm, so what's about kids? Do we bring them home or not?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    if (State.active.variables.sub && State.active.variables.dom) {
      return `<p>@@.npc;I am quite confused to be honest, who will be the dom and who the sub?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    if (State.active.variables.houseWife && State.active.variables.houseSpouse) {
      return `<p>@@.npc;Okay, I don't get it. So is it you who will be the house wife? Or you want me to stay home?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    if (State.active.variables.pcCleans && State.active.variables.npcCleans) {
      return `<p>@@.npc;So, could you clear it, who will clean the house after the marriage?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    if (State.active.variables.moneyVowPC && State.active.variables.moneyVowNPC) {
      return `<p>@@.npc;Ugh, I am not sure who must financially support who after all?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    if (setup.interactionMisc.isDom(aw.date.npcid) && State.active.variables.vowsdom) {
      return `<p>@@.npc;Hey, pet, I am the dom here, remember?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    } else if (setup.interactionMisc.isSub(aw.date.npcid) && State.active.variables.vowssub) {
      return `<p>@@.npc;But mistress, I am the sub here, not you, right?@@</p><p>@@.pc;Ugh... right, silly me!@@</p><<button "New proposition">><<replace "#weddingBox">><<include [[Wedding-c-alt]]>><</replace>><</button>>`;
    }
    const keys = Object.keys(vows);
    if (keys.length > 0) {
      for (const vow of keys) {
        if (State.active.variables["vows" + vow] === true) {
        ↂ.flag.marriage.PCvows.push(vow);
        }
      }
    }
    return `<<run setup.vow.npcVowsFinalize()>>@@.npc;Hmm, seems fine by me! I am glad we sorted it out! So, should we continue having fun today I guess?@@<br><br><<= aw.dateSpots[aw.date.spot].buttonGen()>>`;
  },
  npcVowsFinalize(): void {
    for (let index = 0; index < ↂ.flag.marriage.NPCvows.length; index++) {
      if (ↂ.flag.marriage.NPCvows[index] === "titSize") {
        ↂ.flag.vows[aw.date.npcid].titSize = State.active.variables.boobsizeVow;
      } else if (ↂ.flag.marriage.NPCvows[index] === "moneyPC") {
        ↂ.flag.vows[aw.date.npcid].moneyPC = State.active.variables.moneyVow;
      } else if (ↂ.flag.marriage.NPCvows[index] === "moneyNPC") {
        ↂ.flag.vows[aw.date.npcid].moneyNPC = State.active.variables.moneyVow;
      } else {
        ↂ.flag.vows[aw.date.npcid][ↂ.flag.marriage.NPCvows[index]] = true;
      }
    }
    for (let index = 0; index < ↂ.flag.marriage.PCvows.length; index++) {
      if (ↂ.flag.marriage.PCvows[index] === "titSize") {
        ↂ.flag.vows[aw.date.npcid].titSize = State.active.variables.boobsizeVow;
      } else if (ↂ.flag.marriage.PCvows[index] === "moneyPC") {
        ↂ.flag.vows[aw.date.npcid].moneyPC = State.active.variables.moneyVow;
      } else if (ↂ.flag.marriage.PCvows[index] === "moneyNPC") {
        ↂ.flag.vows[aw.date.npcid].moneyNPC = State.active.variables.moneyVow;
      } else {
        ↂ.flag.vows[aw.date.npcid][ↂ.flag.marriage.PCvows[index]] = true;
      }
    }
    aw.S();
  },
  names: ["noCondom", "condom", "noPill", "noIUD", "IUD", "pregnant", "noKids", "kids", "sub", "dom", "slave", "exclusiveWomb", "noTransform", "houseWife", "houseSpouse", "pcCleans", "npcCleans", "hucow", "nudity", "titSize", "moneyPC", "moneyNPC"],
  fullNames: ["to never to use a condom", "to always use a condom", "you never to use any birth control", "you to never get an IUD", "you to keep always have an IUD inserted", "you stay pregnant whenever possible", "no babies at home", "you to bring home your babies", "you always be submissive", "be the dominant partner", "you to be my sex slave", "your womb is only for your partner's use", "not to get any transformative treatments or surgery", "you to be a stay-at-home housewife", "you to be the one who brings money and I will stay-at-home spouse", "you to be responsible for all the cleaning", "you stay away from home cleaning, I'll do it myself", "you to serve as my personal hucow", "you never to wear clothes at home", "to keep your breasts big", "to provide me with money each week", "to get provided with money each week by me"],
  fullNamesPC: {
      noCondom: "Never to use a condom",
      condom: "To always use a condom",
      noPill: "I won't use any birth control",
      noIUD: "Never get an IUD",
      IUD: "I'll always have an IUD inserted",
      pregnant: "I will stay pregnant whenever possible",
      noKids: "No babies at home",
      kids: "I'll bring home babies",
      sub: "I always be submissive",
      dom: "I'll be the dominant partner",
      slave: "I'll be your sex slave",
      exclusiveWomb: "My womb is only for your use",
      noTransform: "I won't get any transformative treatments or surgery",
      houseWife: "I'll be the one who brings money and you will stay-at-home spouse",
      houseSpouse: "I'll be a stay-at-home housewife",
      pcCleans: "I'll be responsible for all the cleaning",
      npcCleans: "You will be responsible for all the cleaning",
      hucow: "I will serve as your personal hucow",
      nudity: "I'll never wear clothes at home",
      titSize: "I'll keep my breasts big",
      moneyPC: "I'll provide you with money each week",
      moneyNPC: "You will provide me with money each week"
    },
  desc: [
    "The two of you have agreed never to use a condom when making love.",
    "The two of you have agreed to always use a condom when making love.",
    "You have vowed never to use birth control.",
    "You have vowed to never get an IUD.",
    "You have vowed to keep always have an IUD inserted.",
    "You have vowed to stay pregnant whenever possible.",
    "The two of you have agreed that you won't bring any babies home.",
    "The two of you have agreed that you will bring home your babies.",
    "You have vowed to always be submissive to your partner.",
    "You have vowed to be the dominant partner.",
    "You have vowed to be your partner's sex slave.",
    "you have vowed that your womb is only for your partner's use.",
    "You have vowed not to get any transformative treatments or surgery.",
    "You have vowed to be a stay-at-home housewife.",
    "Your partner has vowed to be a stay-at-home spouse.",
    "You have promised to be responsible for all the cleaning.",
    "Your partner has promised to be responsible for all the cleaning.",
    "You have vowed to serve as your partner's personal hucow.",
    "You have vowed never to wear clothes at home.",
    "You have vowed to keep your breasts larger than a certain size.",
    "You have vowed to provide your partner with money each week.",
    "Your partner has vowed to provide you with money each week.",
  ],
};


/*
Vow of <stat> to improve something the NPC finds attractive up to their preferred level. Maybe with regular check ins and the partner lets you know how you're doing.(edited)

Vow of fashion, for snobs, ensure your clothing maintains <stat> level at all times
[6:33 PM]

*/



