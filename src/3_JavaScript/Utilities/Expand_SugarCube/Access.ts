//  █████╗  ██████╗ ██████╗███████╗███████╗███████╗██╗██████╗ ██╗██╗     ██╗████████╗██╗   ██╗
// ██╔══██╗██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝██║██╔══██╗██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
// ███████║██║     ██║     █████╗  ███████╗███████╗██║██████╔╝██║██║     ██║   ██║    ╚████╔╝
// ██╔══██║██║     ██║     ██╔══╝  ╚════██║╚════██║██║██╔══██╗██║██║     ██║   ██║     ╚██╔╝
// ██║  ██║╚██████╗╚██████╗███████╗███████║███████║██║██████╔╝██║███████╗██║   ██║      ██║
// ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝╚═╝╚═════╝ ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝

interface setupAccess {
  homeItemList: { (): string };
  homeItemPut: { (what, from): void };
}

// NAMESPACE
if (setup.access === null || setup.access === undefined) {
  setup.access = {} as setupAccess;
}

setup.access.homeItemList = function(): string {
  State.active.variables.where = "none";
  let out = "INVENTORY:<br>";
  let locList = ["owned", "living", "kitchen", "foyer", "bedroom", "bath", "balcony", "trash"];
  if (ↂ.home.stats.tier === 3) {
    locList = ["owned", "living", "kitchen", "foyer", "bedroom", "bath", "balcony", "bed2", "trash"];
  } else {
    locList = ["owned", "living", "kitchen", "foyer", "bedroom", "bath", "balcony", "trash"];
  }
  for (let iii = 0; iii < locList.length; iii++) {
    out += `<br><b>ROOM: ${locList[iii]}</b>`;
    if (ↂ.home.item[locList[iii]].length > 0) {
      for (let index = 0; index < ↂ.home.item[locList[iii]].length; index++) {
        let list = `"owned"`;
        for (let ii = 1; ii < locList.length; ii++) {
          list += ` "${locList[ii]}"`;
        }
        out += `<div>${aw.homeItems[ↂ.home.item[locList[iii]][index]].name} Type:${aw.homeItems[ↂ.home.item[locList[iii]][index]].type} Quality: ${aw.homeItems[ↂ.home.item[locList[iii]][index]].quality} `;
        out += `<<dropdown '$where' ${list}>><<button "move">><<run setup.access.homeItemPut("${ↂ.home.item[locList[iii]][index]}", "${locList[iii]}")>><<set ↂ.home.item.trash = []>><<status 0>><<replace "#invHolderScreen">><<include [[HomeControlMenuScreenReader]]>><</replace>><</button>></div>`;
      }
    } else {
      out += " empty";
    }
  }
  return out;
};

setup.access.homeItemPut = function(what, from): void {
  ↂ.home.item[from].splice(ↂ.home.item[from].indexOf(what), 1);
  ↂ.home.item[State.active.variables.where].push(what);
  aw.S();
};
