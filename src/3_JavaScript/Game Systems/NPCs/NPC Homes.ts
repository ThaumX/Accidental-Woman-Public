
interface npcHomes {
  eligible: () => string;
  visitFriend: (npcid: npcid) => void;
  visitLover: (npcid: npcid) => void;
  level: (npcid: npcid) => number;
  talk: (lt?: boolean) => void;
}




setup.npcHomes = {} as npcHomes;

setup.npcHomes.eligible = function(): string {
  const lovers = setup.getLovers();
  const friends = setup.getFriends();
  if (ↂ.flag.liveTogether) {
    lovers.delete(ↂ.flag.liveWith); // remove person you're living with from visit list.
  }
  let out = "<div><h2>Friends:</h2><center>";
  if (friends.length < 1) {
    out += "You have no friends... Sorry.</center></div>";
  } else {
    for (let i = 0, c = friends.length; i < c; i++) {
      out += `<div style="width: 265px; height: 340px; background-color: #181818; border-style: solid; border-width: 3px; border-color: #0077ff; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><div style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 265px; height: 300px; background-color: #0c0c0c; overflow: hidden;"><<= aw.npc["${[friends[i]]}"].main.picture>></div><br><center><<button "${aw.npc[friends[i]].main.name} ${aw.npc[friends[i]].main.surname}">><<run setup.npcHomes.visitFriend("${friends[i]}")>><<run Dialog.close()>><</button>></center></div>`;
    }
    out += "</center></div><br>";
  }
  out += `<div style="clear: both;"><h2>Lovers:</h2><center>`;
  if (lovers.length < 1) {
    out += "You aren't seeing anyone right now.</center></div>";
  } else {
    for (let i = 0, c = lovers.length; i < c; i++) {
      out += `<div style="width: 265px; height: 340px; background-color: #181818; border-style: solid; border-width: 3px; border-color: #0077ff; border-radius: 15px; padding: 15px; float: left; margin-left: 10px; margin-top: 10px;"><div style="border-radius: 10px; float: left; margin-right: 10px; margin-bottom: 5px; width: 265px; height: 300px; background-color: #0c0c0c; overflow: hidden;"><<= aw.npc["${[lovers[i]]}"].main.picture>></div><br><center><<button "${aw.npc[lovers[i]].main.name} ${aw.npc[lovers[i]].main.surname}">><<run setup.npcHomes.visitLover("${lovers[i]}")>><<run Dialog.close()>><</button>></center></div>`;
    }
    out += "</center></div><br>";
  }
  return out;
};


setup.npcHomes.visitFriend = function(npcid) {
  State.active.variables.BFid = npcid;
  State.active.variables.BFname = aw.npc[npcid].main.name;
  State.active.variables.BFnum = setup.npcHomes.level(npcid);
  State.active.variables.BFlove = false;
  State.active.variables.BFhome = setup.npcSched.home(npcid);
  State.active.variables.BFroom = setup.npcSched.room(npcid);
  if (npcid === "n101") {
    // it's lily, go to her special passage
    setup.forwardPassage = "LilysPlace";
    setup.map.nav("downtown", "parking");
  } else {
    setup.map.nav("BFhome", "exterior");
  }
};

setup.npcHomes.visitLover = function(npcid) {
  State.active.variables.BFid = npcid;
  State.active.variables.BFname = aw.npc[npcid].main.name;
  State.active.variables.BFnum = setup.npcHomes.level(npcid);
  State.active.variables.BFlove = true;
  State.active.variables.BFhome = setup.npcSched.home(npcid);
  State.active.variables.BFroom = setup.npcSched.room(npcid);
  if (npcid === "n101") {
    // it's lily, go to her special passage
    setup.forwardPassage = "LilysPlace";
    setup.map.nav("downtown", "parking");
  } else {
    setup.map.nav("BFhome", "exterior");
  }
};


setup.npcHomes.level = function(npcid) {
  const result = aw.npc[npcid].background.wealth + 4;
  aw.con.info(`npc Home level is ${result},`);
  return result;
};

setup.npcHomes.talk = function(lt?) {
  const id = (lt) ? ↂ.flag.liveWith : State.active.variables.BFid;
  State.temporary.bfCat = aw.npc[id].rship.category;
  setup.interact.launch({ passage: "WorldNPC-HomeInteract", block: true, content: `<<set _intNPC = "${id}">>`, npcid: id, title: `Talking With ${State.active.variables.BFname}`, size: 3 });
};

