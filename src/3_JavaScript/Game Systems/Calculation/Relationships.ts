/*
██████╗ ███████╗██╗  ██╗██╗██████╗
██╔══██╗██╔════╝██║  ██║██║██╔══██╗
██████╔╝███████╗███████║██║██████╔╝
██╔══██╗╚════██║██╔══██║██║██╔═══╝
██║  ██║███████║██║  ██║██║██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝
*/


interface setupRship {
  eligible: (npcid: string) => boolean;
}

setup.rship = {} as setupRship;

setup.rship.eligible = function(npcid: string): boolean {
  if (!setup.npcid.test(npcid) || aw.npc[npcid] == null) {
    aw.con.warn(`Bad npcid value supplied to setup.rship.eligible function (${npcid})`);
    return false;
  }
  const ᚥ = aw.npc[npcid];
  const cat = ᚥ.rship.category;
  let result = false;
  let mod = 0;
  switch (cat) {
    case "married":
      return false;
    case "engaged":
    case "lovers":
    case "dating":
    case "friend":
      return false;
    case "aquaint":
  }
  return result;
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



