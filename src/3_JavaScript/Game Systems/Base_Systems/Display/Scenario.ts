
//   .d8888b.                                             d8b
//  d88P  Y88b                                            Y8P
//  Y88b.
//   "Y888b.    .d8888b .d88b.  88888b.   8888b.  888d888 888  .d88b.
//      "Y88b. d88P"   d8P  Y8b 888 "88b     "88b 888P"   888 d88""88b
//        "888 888     88888888 888  888 .d888888 888     888 888  888
//  Y88b  d88P Y88b.   Y8b.     888  888 888  888 888     888 Y88..88P
//   "Y8888P"   "Y8888P "Y8888  888  888 "Y888888 888     888  "Y88P"


/*
  A display overlay for twine content to exist exterior to
  main twine passage navigation.

  uses a grid layout to display content in a manner similar to a normal twine passage/map navigation
  KEY DIV ID NAMES:
  Scene-Background : overall container, has background and general styling.
  Scene-Cunt : Main div containing content.
  Scene-Sidebar-Menu : for containing interactive elements and standard info
  Scene-Sidebar-Info : for containing location/other information
  Scene-Passage : Div containing passage contents
  Scene-Image-Top : normally-collapsed div that can contain a topbar image
  Scene-Image-Left : left sidebar image area
  Scene-Title: title area
*/


interface IsetupScenario {
  launch: (content: IntScenarioLaunchOptions) => void;
  launch2: (content: IntScenarioLaunchOptions) => void;
  status: IsetupScenarioStatus;
  close: () => void;
  refresh: () => void;
  replace: (content: string) => void;
  passage: (passage: string) => void;
  append: (content: string) => void;
  isOpen: () => boolean;
  gameSave: () => string;
  gameLoad: (json: string) => boolean;
  restore: () => void;
  menuStatus: () => twee;
  menu: (showTime: boolean, allowMenu: boolean, allowSave: boolean) => string;
  menuSmall: (showTime: boolean, allowMenu: boolean, allowSave: boolean) => string;
  menuButtons: (showTime: boolean, allowMenu: boolean, allowSave: boolean) => string;
  infoReplace: (content: string) => void;
}

interface IsetupScenarioStatus { // stored info about scenario system for game saves
  open: boolean; // if an scenario is "open"
  allowSave: boolean; // allow the player to save/load the game or not
  showTime: boolean; // whether to show the game time (perhaps for flashbacks, etc)
  allowMenu: boolean; // whether to allow the player to access the game menu.
  passage: string; // if passage is associated with scenario content, passage title
  title: string; // label for scenario window title bar
  sidebar: string; // content put into the info div
  image: string; // if there is an image to place in separate image window
  topImage: string; // image for top bar-shaped image
  content: string | false; // twee content of the scenario window, if any
  temp: { // temporary variable store to use with scenario instead of State.temporary[foobar]
    [propName: string]: any;
  };
}

interface IntScenarioLaunchOptions {
  passage?: string;
  sidebar?: string;
  content?: string;
  image?: string;
  topImage?: string;
  title?: string;
  allowSave?: boolean;
  showTime?: boolean;
  allowMenu?: boolean;
  callback?: () => void;
}


if (setup.scenario == null) {
  setup.scenario = {} as IsetupScenario;
}

// launches the scenario window from zero with included options.
setup.scenario.launch = function(
  {passage, content, image, topImage, title, callback, allowSave, sidebar, showTime, allowMenu}: IntScenarioLaunchOptions,
  ): void {
  if (showTime == null) {
    showTime = false;
  }
  if (allowMenu == null) {
    allowMenu = false;
  }
  if (allowSave == null) {
    allowSave = false;
  }
  if (setup.scenario.isOpen()) {
    aw.con.warn("Attempted to open scenario window with one already open! this should not happen!");
    return;
  }
  // basic html content
  let output = `<div id="Scene-Background" class="darkTriangles fadeIn animated"><div id="Scene-Cunt"><div id="Scene-Title">`;
  if (title != null && title !== "none") {
    output += title; // adds unique scenario window title
    setup.scenario.status.title = title;
  } else {
    output += "Temporary demo title!";
    setup.scenario.status.title = "none";
  }
  const sides = (sidebar != null && sidebar !== "none") ? sidebar : "";
  const menuStuff = setup.scenario.menu(showTime, allowMenu, allowSave);
  output += `</div><div id="Scene-Sidebar-Info">${sides}</div>${menuStuff}`;
  // main content box - includes provided content
  const toppo = (topImage != null && topImage !== "none") ? `<img data-passage="${topImage}">` : "";
  output += `<div id="Scene-Passage-Cunt"><div id="Scene-Image-Top">${toppo}</div><div id="Scene-Passage">`;
  output += (content != null && content !== "none") ? content : "";
  if (passage != null && Story.has(passage)) {
    setup.scenario.status.passage = passage;
    output += `<<include [[${passage}]]>>`;
  }
  let sImg = "";
  if (image != null && image !== "none") {
    if (image.slice(0, 3) === "IMG" || image.slice(0, 6) === "modIMG") {
      sImg = `<img data-passage="${image}">`;
    } else {
      sImg = image;
    }
  }
  output += `</div></div><div id="Scene-Image-Left">${sImg}</div>`;
  output += "</div></div>";

  // sets up status data
  setup.scenario.status.open = true;
  setup.scenario.status.image = (image != null) ? image : "none";
  setup.scenario.status.topImage = (topImage != null) ? topImage : "none";
  setup.scenario.status.content = (content != null) ? content : false;
  setup.scenario.status.passage = (passage != null) ? passage : "none";
  setup.scenario.status.title = (title != null) ? title : "none";
  setup.scenario.status.sidebar = (sidebar != null) ? sidebar : "none";
  setup.scenario.status.allowSave = allowSave;
  setup.scenario.status.showTime = showTime;
  setup.scenario.status.allowMenu = allowMenu;

  // adds to page after wikifier
  aw.replace("#scenarioContainer", output);
  //aw.con.info(output); // TODO remove me!
  if (callback != null) {
    setTimeout(callback, 50);
  }
  setup.escape.sit = "scene";
};

setup.scenario.launch2 = function(
  {passage, content, image, topImage, title, callback, allowSave, sidebar, showTime, allowMenu}: IntScenarioLaunchOptions,
  ): void {
  if (showTime == null) {
    showTime = false;
  }
  if (allowMenu == null) {
    allowMenu = false;
  }
  if (allowSave == null) {
    allowSave = false;
  }
  if (setup.scenario.isOpen()) {
    aw.con.warn("Attempted to open scenario window with one already open! this should not happen!");
    return;
  }
  // basic html content
  let output = `<div id="scenarioMain" class="darkTriangles fadeIn animated"><div id="scenarioGrid">`;
  const menuStuff = setup.scenario.menuButtons(showTime, allowMenu, allowSave);
  output += `<div id="scenarioButtonPanel">${menuStuff}</div>`;
  output += `<div id="scenarioContentPanel"><div id="scenarioContentPanelInner">`;
  const toppo = (topImage != null && topImage !== "none") ? `<img data-passage="${topImage}"><br>` : "";
  output += toppo;
  output += (content != null && content !== "none") ? content : "";
  if (passage != null && Story.has(passage)) {
    setup.scenario.status.passage = passage;
    output += `<<include [[${passage}]]>>`;
  }
  output += `</div></div><div id="scenarioImagePanel"><div id="scenarioImage">`;
  if (title != null && title !== "none") {
    output += title; // adds unique scenario window title
    setup.scenario.status.title = title;
  } else {
    output += "Temporary demo title!";
    setup.scenario.status.title = "none";
  }
  output += `<br><br>`;

  let sImg = "";
  if (image != null && image !== "none") {
    if (image.slice(0, 3) === "IMG" || image.slice(0, 6) === "modIMG") {
      sImg = `<img data-passage="${image}">`;
    } else {
      sImg = image;
    }
  }
  output += `${sImg}</div></div></div>`;
  const sides = (sidebar != null && sidebar !== "none") ? sidebar : "";
  output += `<div id="scenarioLeftPanel"><div id="scenarioSideBlockInfo" class="scenarioBlock"><div class="scenarioBlockContent">${sides}</div><div class="scenarioBlockLabel">INFO</div></div>`;
  const stuff = setup.scenario.menuSmall(showTime, allowMenu, allowSave);
  output += `<div id="scenarioSideBlockTime" class="scenarioBlock"><div class="scenarioBlockContent">${stuff}</div><div class="scenarioBlockLabel">STATS</div></div>`;
  output += "</div>";

  // sets up status data
  setup.scenario.status.open = true;
  setup.scenario.status.image = (image != null) ? image : "none";
  setup.scenario.status.topImage = (topImage != null) ? topImage : "none";
  setup.scenario.status.content = (content != null) ? content : false;
  setup.scenario.status.passage = (passage != null) ? passage : "none";
  setup.scenario.status.title = (title != null) ? title : "none";
  setup.scenario.status.sidebar = (sidebar != null) ? sidebar : "none";
  setup.scenario.status.allowSave = allowSave;
  setup.scenario.status.showTime = showTime;
  setup.scenario.status.allowMenu = allowMenu;

  // adds to page after wikifier
  aw.replace("#scenarioContainer", output);
  aw.con.info(output); // TODO remove me!
  if (callback != null) {
    setTimeout(() => callback(), 50);
  }
  setup.escape.sit = "scene";
};

// creates the menu element
setup.scenario.menu = function(showTime: boolean, allowMenu: boolean, allowSave: boolean): string {
  let output = "";
  try {
    if (showTime) {
      output += '<div id="Scene-Sidebar-Time">';
      const mon = State.active.variables.AW.cash;
      const bal = (mon < 0) ? "bad" : "money";
      const temp = setup.weather.tempPrint();
      output += `<span class="clock">${setup.timeDisp}</span> ${setup.ui.sunSym()}<br>${setup.time.dateDisplay()}<br>`;
      output += `<span style="font-size: 1.2rem;">Credits:</span> <span class="${bal}" style="font-size:1.25rem">₢${mon}</span>&nbsp;&nbsp; <span class="monospace" style="font-size:1.25rem;color:#7fdfff;">${temp}</span><br>`;
      output += setup.scenario.menuStatus();
      output += "</div>";
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> time", e);
  }
  output += '<div id="Scene-Sidebar-Menu">';
  try {
    output += `<div id="Scene-Sidebar-Menu-Buttons">`;
    if (allowMenu) {
      output += "<<link [img[Character|IMGcharacter]]>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
      output += "<<link [img[Contacts|IMGcontacts]]>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
      output += "<<link [img[Game Settings|IMGsettings]]>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>>";
      if (aw.chad.cheatmode) {
        output += "<<link [img[Cheat Menu|IMGcheatmenu]]>><<set setup.menuvar = 'cheat'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>>";
      } else {
        output += "<<link [img[Cheat Menu|IMGlocked]]>><<dialog 'AW Cheats'>><<include [[ifYouWantCheats]]>><</dialog>><</link>>";
      }
    } else {
      output += "<<link [img[Character|IMGcharacter_disabled]]>><</link>>";
      output += "<<link [img[Room View|IMGroomview_disabled]]>><</link>>";
      output += "<<link [img[Contacts|IMGcontacts_disabled]]>><</link>>";
      if (aw.chad.cheatmode) {
        output += "<<link [img[Cheat Menu|IMGcheatmenu_disabled]]>><</link>>";
      } else {
        output += "<<link [img[Cheat Menu|IMGlocked_disabled]]>><</link>>";
      }
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> buttons", e);
  }
  output += "<<link [img[Achievements|IMGachieve]]>><</link>>";
  output += "<<link [img[Game Guide|IMGgameguide]]>><<replace '#guidecontainer'>><<include [[UIGuideContainer]]>><</replace>><</link>>";
  output += "</div><div id='Scene-Sidebar-Menu-Save'>";
  try {
    output += "<<link [img[Change system settings|IMGsettingsMain]]>><<scr" + "ipt>>UI.settings();<</scri" + "pt>><</link>>";
    if (allowSave) {
      output += "<<link [img[Load or manage saves|IMGsavesScenario]]>><<scr" + "ipt>>UI.saves();<</scr" + "ipt>><</link>>";
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> endshit", e);
  }
  output += "</div></div>";
  return output;
};

setup.scenario.menuSmall = function(showTime: boolean, allowMenu: boolean, allowSave: boolean): string {
  let output = "";
  try {
    if (showTime) {
      output += '<div id="Scene-Sidebar-Time">';
      const mon = State.active.variables.AW.cash;
      const bal = (mon < 0) ? "bad" : "money";
      const temp = setup.weather.tempPrint();
      output += `<span class="clock">${setup.timeDisp}</span> ${setup.ui.sunSym()}<br>${setup.time.dateDisplay()}<br>`;
      output += `<span style="font-size: 1.2rem;">Credits:</span> <span class="${bal}" style="font-size:1.25rem">₢${mon}</span>&nbsp;&nbsp; <span class="monospace" style="font-size:1.25rem;color:#7fdfff;">${temp}</span><br>`;
      output += setup.scenario.menuStatus();
      output += "</div>";
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> time", e);
  }
  return output;
};

setup.scenario.menuButtons = function(showTime: boolean, allowMenu: boolean, allowSave: boolean): string {
  let output = "";
  try {
    output += `<div id="sidebarMenuButtons">`;
    if (allowMenu) {
      output += "<div><<link [img[Character|IMGcharacter]]>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>></div>";
      output += "<div><<link [img[Contacts|IMGcontacts]]>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>></div>";
      output += "<div><<link [img[Game Settings|IMGsettings]]>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>></div>";
      if (aw.chad.cheatmode) {
        output += "<div><<link [img[Cheat Menu|IMGcheatmenu]]>><<set setup.menuvar = 'cheat'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>></div>";
      } else {
        output += "<div><<link [img[Cheat Menu|IMGlocked]]>><<dialog 'AW Cheats'>><<include [[ifYouWantCheats]]>><</dialog>><</link>></div>";
      }
    } else {
      output += "<div><<link [img[Character|IMGcharacter_disabled]]>><</link>></div>";
      output += "<div><<link [img[Room View|IMGroomview_disabled]]>><</link>></div>";
      output += "<div><<link [img[Contacts|IMGcontacts_disabled]]>><</link>></div>";
      if (aw.chad.cheatmode) {
        output += "<div><<link [img[Cheat Menu|IMGcheatmenu_disabled]]>><</link>></div>";
      } else {
        output += "<div><<link [img[Cheat Menu|IMGlocked_disabled]]>><</link>></div>";
      }
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> buttons", e);
  }
  output += "<div><<link [img[Achievements|IMGachieve]]>><</link>></div>";
  output += "<div><<link [img[Game Guide|IMGgameguide]]>><<replace '#guidecontainer'>><<include [[UIGuideContainer]]>><</replace>><</link>></div>";
  output += "</div><div id='Scene-Sidebar-Menu-Save'>";
  try {
    output += "<div><<link [img[Change system settings|IMGsettingsMain]]>><<scr" + "ipt>>UI.settings();<</scri" + "pt>><</link>></div>";
    if (allowSave) {
      output += "<div><<link [img[Load or manage saves|IMGsavesScenario]]>><<scr" + "ipt>>UI.saves();<</scr" + "ipt>><</link>></div>";
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> endshit", e);
  }
  output += "</div>";
  return output;
};

setup.scenario.menuStatus = function(): twee {
  let out = "";
  const v = ↂ.pc;
  let bc;
  let cyc;
  out += "<table id='layout'><tr><td style='width:30%'><b>Mood:</b></td><td><<pcMood>></td></tr>";
  out += "<tr><td><b>Arousal:</b></td><td class='pink'><<pcArousal>></td></tr>";
  if (v.status.birthCon.hormone !== 0 && v.kink.pregnancy) {
    bc = `<td class='orange'>${v.status.birthCon.hormoneType}</td>`;
  } else if (v.status.birthCon.hormone < 75 && v.trait.perceptive === 1) {
    bc = `<td class='yellow'>${v.status.birthCon.hormoneType}</td>`;
  } else if (v.status.birthCon.hormone !== 0) {
    bc = `<td class='green'>${v.status.birthCon.hormoneType}</td>`;
  } else {
    bc = "<td class='pink'>None</td>";
  }
  if (v.status.period !== 0) {
    cyc = `<td class='pink'>${v.status.fertText}</td>`;
  } else {
    switch (v.status.risk) {
      case 0:
        cyc = `<td class='green'>${v.status.fertText}</td>`;
        break;
      case 1:
        cyc = `<td class='yellowgreen'>${v.status.fertText}</td>`;
        break;
      case 2:
        cyc = `<td class='yellow'>${v.status.fertText}</td>`;
        break;
      case 3:
        cyc = `<td class='orange'>${v.status.fertText}</td>`;
        break;
      case 4:
        cyc = `<td class='orangered'>${v.status.fertText}</td>`;
        break;
      case 5:
        cyc = `<td class='red'>${v.status.fertText}</td>`;
        break;
      default:
        cyc = `<td class='white'>${v.status.fertText}</td>`;
        break;
    }
  }
  out += `<tr><td><b>B-Con:</b></td>${bc}</tr>`;
  out += `<tr><td><b>Cycle:</b></td>${cyc}</tr>`;
  out += "<tr><td><b>Status:</b></td><td style='text-align:left;'><<pcStatus>></td></tr></table>";
  return out;
};


// closes the scenario window
setup.scenario.close = function(): void {
  aw.replace("#scenarioContainer", "");
  setup.refresh();
  setup.scenario.status.passage = "none";
  setup.scenario.status.content = "none";
  setup.scenario.status.image = "none";
  setup.scenario.status.topImage = "none";
  setup.scenario.status.sidebar = "none";
  setup.scenario.status.title = "none";
  setup.scenario.status.open = false;
  setup.escape.sit = "none";
};


setup.scenario.status = {
  open: false,
  passage: "none",
  sidebar: "none",
  title: "none",
  content: false, // stores loaded content in case non-passage
  image: "none",
  topImage: "none",
  allowMenu: false,
  allowSave: false,
  showTime: false,
  temp: {},
};


// refreshes the window based on content found in status object
setup.scenario.refresh = function(): void {
  let content;
  if (setup.scenario.status.passage != null && Story.has(setup.scenario.status.passage)) {
    content = `<<include [[${setup.scenario.status.passage}]]>>`;
  } else if (setup.scenario.status.content != null && setup.scenario.status.content !== "none") {
    content = setup.scenario.status.content;
  } else {
    aw.con.warn(`scenario.refresh failure because of lack of saved content!`);
    content = `<h3>Appologies! It seems some kind of error occurred that broke the scenario system (scenario.replace failure). Click the below button to close this scenario prematurely.</h3><br><<button "EXIT/CLOSE">><<run setup.scenario.close()>><</button>>`;
  }
  let output = "";
  try {
    if (setup.scenario.status.showTime) {
      const mon = State.active.variables.AW.cash;
      const bal = (mon < 0) ? "bad" : "money";
      const temp = setup.weather.tempPrint();
      output += `<span class="clock">${setup.timeDisp}</span> ${setup.ui.sunSym()}<br>${setup.time.dateDisplay()}<br>`;
      output += `<span style="font-size: 1.2rem;">Credits:</span> <span class="${bal}" style="font-size:1.25rem">₢${mon}</span>&nbsp;&nbsp; <span class="monospace" style="font-size:1.25rem;color:#7fdfff;">${temp}</span><br>`;
      output += setup.scenario.menuStatus();
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> time", e);
  }
  aw.replace("#Scene-Passage", content);
  aw.replace("#Scene-Sidebar-Time", output);
  if (setup.scenario.status.sidebar != null) {
    aw.replace("#Scene-Sidebar-Info", setup.scenario.status.sidebar);
  }
};

// empty the scenarioion window and place this content
setup.scenario.replace = function(content: string): void {
  setup.scenario.status.content = content;
  delete setup.scenario.status.passage;
  aw.replace("#Scene-Passage", content);
  $("#Scene-Passage-Cunt").animate({ scrollTop: 0 }, "fast");
  if (setup.scenario.status.sidebar != null) {
    aw.replace("#Scene-Sidebar-Info", setup.scenario.status.sidebar);
  }
  let output = "";
  try {
    if (setup.scenario.status.showTime) {
      const mon = State.active.variables.AW.cash;
      const bal = (mon < 0) ? "bad" : "money";
      const temp = setup.weather.tempPrint();
      output += `<span class="clock">${setup.timeDisp}</span> ${setup.ui.sunSym()}<br>${setup.time.dateDisplay()}<br>`;
      output += `<span style="font-size: 1.2rem;">Credits:</span> <span class="${bal}" style="font-size:1.25rem">₢${mon}</span>&nbsp;&nbsp; <span class="monospace" style="font-size:1.25rem;color:#7fdfff;">${temp}</span><br>`;
      output += setup.scenario.menuStatus();
      aw.replace("#Scene-Sidebar-Time", output);
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> time", e);
  }
};

// appends twee to the end of the window
setup.scenario.append = function(content: string): void {
  setup.scenario.status.content += content;
  aw.append("#Scene-Passage", content);
};

// loads new passage into scenario window
setup.scenario.passage = function(passage: string): void {
  if (Story.has(passage)) {
    setup.scenario.status.passage = passage;
    const cunt = `<<include [[${passage}]]>>`;
    aw.replace("#Scene-Passage", cunt);
    $("#Scene-Passage-Cunt").animate({ scrollTop: 0 }, "fast");
  } else {
    aw.con.warn(`Attempted to load passage "${passage}" to scenario window but passage doesn't exist.`);
  }
  let output = "";
  try {
    if (setup.scenario.status.showTime) {
      const mon = State.active.variables.AW.cash;
      const bal = (mon < 0) ? "bad" : "money";
      const temp = setup.weather.tempPrint();
      output += `<span class="clock">${setup.timeDisp}</span> ${setup.ui.sunSym()}<br>${setup.time.dateDisplay()}<br>`;
      output += `<span style="font-size: 1.2rem;">Credits:</span> <span class="${bal}" style="font-size:1.25rem">₢${mon}</span>&nbsp;&nbsp; <span class="monospace" style="font-size:1.25rem;color:#7fdfff;">${temp}</span><br>`;
      output += setup.scenario.menuStatus();
      aw.replace("#Scene-Sidebar-Time", output);
    }
  } catch (e) {
    aw.con.error("setup.scenario.menu -> time", e);
  }
};

// checks if an scenario window is open. returns true if it is.
setup.scenario.isOpen = function(): boolean {
  let $test;
  try {
    $test = document.getElementById("scenarioCunt");
  } catch (e) {
    $test = null;
  }
  if (!$test) {
    return false;
  } else {
    return true;
  }
};

// saves the scenario.status object so it persists in a save
setup.scenario.gameSave = function(): string {
  function replacer(key, value) {
    // converting functions to strings
    if (typeof value == null) {
      return false;
    } else if (typeof value === "function") {
      aw.con.info(this[key].toString());
      return this[key].toString();
    }
    return value;
  }
  const output = JSON.stringify(setup.scenario.status, replacer);
  return output;
};

// restores scenario.status from a save.
setup.scenario.gameLoad = function(json: string): boolean {
  function parse(data: string) {
    let result: boolean = true;
    setup.scenario.status = {} as IsetupScenarioStatus;
    try {
      setup.scenario.status = JSON.parse(data);
    } catch (e) {
      aw.con.warn(`Restoring Scenario System JSON failed with error ${e.name}: ${e.message}! `);
      result = false;
    }
    return result;
  }
  if (!parse(json)) {
    // tslint:disable-next-line:max-line-length
    UI.alert("There was an error loading your save. The Scenario System status data was not successfully loaded. This should only matter if you saved the game with an scenario window open.");
    return false;
  }
  // time to open an scenario window if necessary
  setup.scenario.restore();
  return true;
};

// checks scenario.status to see if window should be open, and opens it if so.
setup.scenario.restore = function(): void {
  const ᚥ = setup.scenario.status;
  if (ᚥ.open) {
    const cock = {
      allowMenu: ᚥ.allowMenu,
      allowSave: ᚥ.allowSave,
      showTime: ᚥ.showTime,
    } as IntScenarioLaunchOptions;
    if (ᚥ.content) {
      cock.content = ᚥ.content;
    }
    if (ᚥ.image !== "none") {
      cock.image = ᚥ.image;
    }
    if (ᚥ.title !== "none") {
      cock.title = ᚥ.title;
    }
    if (ᚥ.passage) {
      cock.passage = ᚥ.passage;
    }
    if (ᚥ.sidebar) {
      cock.sidebar = ᚥ.sidebar;
    }
    if (ᚥ.topImage) {
      cock.topImage = ᚥ.topImage;
    }
    setup.scenario.launch(cock);
  }
};

setup.scenario.infoReplace = function(content: string = " "): void {
  aw.replace("#Scene-Sidebar-Info", content);
};

Macro.add("scenego", {
  handler() {
    if (this.args.length !== 1) {
      return this.error(`Incorrect number of arguments given to intgo macro - passage name only (${this.args.length} arguments given).`);
    }
    if (typeof this.args[0] === "string" && Story.has(this.args[0])) {
      setup.scenario.passage(this.args[0]);
    } else {
      return this.error(`Invalid or malformed passage name to intgo macro (${this.args[0]}).`);
    }
  },
});

Macro.add("sceneclose", {
  handler() {
    setup.scenario.close();
  },
});

Macro.add("scenereplace", {
  tags: [null],
  handler() {
    // note - no null arg catch because null content is used to "empty" the window.
    setup.scenario.replace(this.payload[0].contents);
  },
});

Macro.add("scenerefresh", {
  handler() {
    setup.scenario.refresh();
  },
});

Macro.add("sceneinforeplace", {
  tags: [null],
  handler() {
    setup.scenario.infoReplace(this.payload[0].contents);
  },
});
