/*
██████╗ ███████╗██╗  ██╗██╗██████╗
██╔══██╗██╔════╝██║  ██║██║██╔══██╗
██████╔╝███████╗███████║██║██████╔╝
██╔══██╗╚════██║██╔══██║██║██╔═══╝
██║  ██║███████║██║  ██║██║██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝
*/


interface setupRship {
  eligible: (npcid: string) => [string, boolean, string];
  liveTogether: (npcid: string) => void;
  moveOut: () => void;
  timeToAdvance: (npcid: string) => string;
}

setup.rship = {} as setupRship;

// returns rship moving to, boolean (true=eligible), reason if false
setup.rship.eligible = function(npcid: string): [string, boolean, string] {
  if (!setup.npcid.test(npcid) || aw.npc[npcid] == null) {
    aw.con.warn(`Bad npcid value supplied to setup.rship.eligible function (${npcid})`);
    return ["error", false, "error"];
  }
  const ᚥ = aw.npc[npcid];
  const cat = ᚥ.rship.category;
  const catTime = cat + "Time";
  let result = false;
  let reason = "error";
  let sinceRej = 0;
  let leng = 0;
  let like = 0;
  let love = 0;
  let dest = "error";
  switch (cat) {
    case "married":
      return ["married", false, "already married"];
    case "engaged":
      sinceRej = 10080; // 1 week
      leng = 100000; // about 2.25 months
      like = 90;
      love = 95;
      dest = "married";
      break;
    case "lovers":
      sinceRej = 40320; // 1 month
      leng = 161280; // 4 months
      like = 90;
      love = 94;
      dest = "engaged";
      break;
    case "exclusive":
      sinceRej = 40320; // 1 month
      leng = 80640; // 2 months
      like = 50;
      love = 60;
      dest = "lovers";
      break;
    case "dating":
      sinceRej = 10080; // 1 week
      leng = 20160; // 2 weeks
      like = 20;
      love = 30;
      dest = "exclusive";
      break;
    case "friend":
      return ["friend", true, "already friends"];
    case "aquaint":
      sinceRej = 40320; // 1 month
      leng = 40320; // 1 month
      like = 50;
      love = 0;
      dest = "friend";
      break;
    default:
      aw.con.warn("Error determining rship advancement eligibility, not in a relationship!");
      return ["error", false, "error"];
  }
  if (/*aw.time - ᚥ.rship.rejTime < sinceRej */ false) {
    result = false;
    reason = "rejection time";
  } else if (aw.time - ᚥ.rship[catTime] < leng) {
    result = false;
    reason = "too soon";
  } else if (ᚥ.rship.likePC < like) {
    result = false;
    reason = "low like";
  } else if (ᚥ.rship.lovePC < love) {
    result = false;
    reason = "low love";
  } else {
    result = true;
    reason = "none";
  }
  return [dest, result, reason];
};


/*
return "married";
    } else if (this.engaged) {
      return "engaged";
    } else if (this.lovers) {
      return "lovers";
    } else if (this.dating) {
      return "dating";
    } else if (this.friend) {
      return "friend";
    } else if (this.acquaint) {
      return "acquaint";
*/

setup.rship.moveOut = function() {
  ↂ.flag.liveTogether = false;
  ↂ.flag.liveWith = "none";
  ↂ.flag.moveInFlag = false;
  ↂ.flag.liveWithTier = 0;
  aw.S("flag");
  setup.homeItems.packUp();
};

setup.rship.liveTogether = function(npcid: string) {
  ↂ.flag.liveWith = npcid;
  ↂ.flag.moveInFlag = true;
  ↂ.flag.liveWithTier = 4; // in the future it's possible to assign different tiers perhaps...
  aw.S("flag");
  ↂ.buttons.FemLilyFirstMeeting = new CAB({
    id: "MoveInWithLover",
    text: "Move In With Lover",
    action: `<<addTime 40>><<set ↂ.map.loc = ["downtown", "bank"]>><<go "AppleCleftRealtyMoveIn">>`,
    cond: `if (aw.timeArray[1] > 7 && aw.timeArray[1] < 13 && ↂ.flag.moveInFlag){ return true;} return false;`,
    oneTime: true,
    duration: 11000,
  });
};

setup.rship.timeToAdvance = function(npcid: string): string {
  if (!setup.npcid.test(npcid) || aw.npc[npcid] == null) {
    aw.con.warn(`Bad npcid value supplied to setup.rship.timeToAdvance function (${npcid})`);
    return `Bad npcid value supplied to setup.rship.timeToAdvance function (${npcid})`;
  }
  const cat = aw.npc[npcid].rship.category;
  const catTime = cat + "Time";
  const whereTo = aw.npc[npcid].rship.category;
  let leng = 0;
  switch (whereTo) {
    case "married":
      return "You are already married!";
    case "engaged":
      leng = 100000; // about 2.25 months
      break;
    case "lovers":
      leng = 161280; // 4 months
      break;
    case "exclusive":
      leng = 80640; // 2 months
      break;
    case "dating":
      leng = 20160; // 2 weeks
    case "friend":
      return "You are already friends!";
    case "aquaint":
      leng = 40320; // 1 month
      break;
    default:
      aw.con.warn("Error determining rship advancement time, not in a relationship!");
      return "Error in timeToAdvance function, pls report it!";
  }
  const timeo = leng - (aw.time - aw.npc[npcid].rship[catTime]);
  const day = Math.ceil(((timeo / 60) / 24));
  if (day > 100) {
    return `Your instincts tell you that it will be more than three month before your relationship is ready to advance.`;
  } else if (day > 60) {
    return `Your instincts tell you that it will be more than two month before your relationship is ready to advance.`;
  } else if (day > 30) {
    return `Your instincts tell you that it will be more than a month before your relationship is ready to advance.`;
  } else if (day > 14) {
    return `Your instincts tell you that it will be more than two weeks before your relationship is ready to advance.`;
  } else if (day > 1) {
    return `Your instincts tell you that it will be around ${day} days before your relationship is ready to advance.`;
  } else {
    return `Your instincts tell you that your relationship is ready to advance.`;
  }
};