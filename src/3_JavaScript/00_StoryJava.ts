Config.history.controls = false;
Config.loadDelay = 500;
Setting.addHeader("Accidental Woman System Settings");
Config.saves.slots = 7;
Config.history.maxStates = 1;
Config.saves.autosave = "autosave";
Config.saves.id = "Accidental_Woman";
setup.testes = /\u2182/;
setup.menuvar = "none";
setup.seenRefreshWarning = false;
setup.initialized = false;
setup.npcid = /n[0-9]{3,6}/;
setup.restartChecker = false;
if (aw.verbose == null) {
  aw.verbose = false;
}
aw.verboseExtra = false;
arc.thaumx = "<span class='megrim'><b><span class='ship'>T</span>haum<span class='ship'>X</span></b></span>";
arc.besty = "<span class='megrim'><b><span class='besty'>B</span>esty</b></span>";

$("body").append('<div id="awUIcontainer" style="margin:0;padding:0;"></div>');
$("body").append('<div id="interactContainer"></div>');
$("body").append('<div id="scenarioContainer" style="margin:0;padding:0;z-index:1500;"></div>');
$("body").append('<div id="escapeHatch" style="margin:0;padding:0;z-index:999500;"></div>');

aw.npc = {};
setup.npc = {} as setupNPC;

aw.besty = {};

if (setup.version == null || setup.version === undefined) {
  setup.version = "none";
}
if (setup.ver == null || setup.ver === undefined) {
  setup.ver = 0;
}
setup.loadOnce = 2;
setup.sexActs = {};
setup.sexPos = {};
setup.perf = {};
setup.flipsat = 40;
setup.eventAllowed = true;

State.initPRNG();

// Load AWR Files
setup.loadScript = function(sourceSrc: string): void {
  const scriptTag = document.createElement("script");
  scriptTag.src = sourceSrc;
  document.getElementsByTagName("head")[0].appendChild(scriptTag);
};

setup.resourceLoad = function(): void {
  aw.con.info("Starting Resource Load");
  setup.loadScript("resources/AWprimary1.awr");
  setup.loadScript("resources/AWprimary2.awr");
  setup.loadScript("resources/Ainfo.awr");
  setup.loadScript("resources/Binterface.awr");
  setup.loadScript("resources/Cmisc.awr");
  setup.loadScript("resources/Dmap.awr");
  setup.loadScript("resources/Eassets.awr");
  setup.loadScript("resources/Fportrait.awr");
  setup.loadScript("resources/AWAI.awr");
};

setup.resourceLoadFinished = function(): void {
  $("#loadpbar").progressbar("destroy");
  State.temporary.verb = [
    "Molesting the Data...",
    "<i>Inserting</i> the Data...",
    "Lubing Up the Data...",
    "Awakening Tentacle Monsters...",
    "Blocking Escape Routes...",
    "Increasing HuCow Fertility...",
    "Grooming the Cocktopus",
    "Initiating Project Seedbed",
    "Screwing with NPC DNA...",
    "Deploying Aphrodisiacs...",
    "Warding off the TimeCock...",
    "Generating Sperm Battlefield...",
    "Priming the Slimes...",
    "Scavenging Burgers...",
    "Sexually Corrupting NPCs...",
    "Initializing Tissue Vats...",
    "Firing up the Clone Vats...",
    "Transforming Transformatives...",
    "Generating Neko Ears...",
    "<span class='blur'>Proding the Rogue AI...</span>",
    "Monitoring the Tissue Vats...",
    "Creating Link to Azathoth...",
    "Blaming Besty...",
    "Blaming Besty!",
    "Polishing Bones...",
    "Industrializing the Birthrate...",
  ];
  const verb = State.temporary.verb.pluck();
  const first = `<div id="imgpbar"></div><br><span id="verb" class="megrim white" style="font-size: 1.2rem;font-weight:bold;">${verb}</span><<repeat 2s>><<replace "#verb">><<= _verb.pluck()>><</replace>><</repeat>>`;
  aw.replace("#loadBarContainer", first);
  setTimeout(function() {
    $("#imgpbar").progressbar({
      value: 0,
      max: setup.expectedImageLength,
    });
  }, 50);
  let cunter = 0;
  function cockery() {
    const dataNames = ["AWprimary1", "AWprimary2", "Ainfo", "Binterface", "Cmisc", "Dmap", "Eassets", "Fportrait"];
    cunter++;
    let pass = true;
    for (let i = 0, c = dataNames.length; i < c; i++) {
      if (window[dataNames[i]] == null) {
        pass = false;
        break;
      }
    }
    if (pass) {
      start();
    } else if (cunter < 11) {
      setTimeout(cockery, 200);
    } else {
      start();
    }
  }
  function start() {
    aw.replace("#timeshi", "<span class='small-link'><<link 'EMERGENCY SKIP'>><<set $imageloaded = true>><<go Start>><</link>></span>");
    setup.ai.load();
    setup.newImageLoader();
  }
  setTimeout(cockery, 250);
};

if (window.performance) {
  setup.browserLimitTwo = false;
} else {
  setup.browserLimitTwo = true;
}

$(function() {
  $(document).tooltip();
});


setup.menuItemRunSaves = function() {

  Dialog.addClickHandler("#menu-item-saves", null, UI.buildSaves)
    .text(L10n.get("savesTitle"));
  Dialog.addClickHandler("#menu-item-settings", null, UI.buildSettings)
    .text(L10n.get("settingsTitle"));
  Dialog.addClickHandler("#menu-item-restart", null, UI.buildRestart)
    .text(L10n.get("restartTitle"));

};


function randomDist(splooge: number[]): number {
  /*use try to get array length. If not array, will fail and proc error*/
  try {
    const jizz = splooge.length;
  } catch (e) {
    const msg1 = "Error: non array sent to randomDist - " + splooge + ": " + e.name + ": " + e.message;
    console.log(msg1);
    UI.alert(msg1);
    return 0;
  }
  /*sum up total value of all array items*/
  let bukkake = 0;
  for (let i = 0; i < splooge.length; i++) {
    if (isNaN(splooge[i])) {
      const msg2 = "Error: non-numeric value sent to randomDist - value: " + splooge[i];
      console.log(msg2);
      UI.alert(msg2);
      return 0;
    } else {
      bukkake += splooge[i];
    }
  }
  /*check to make sure that values for distribution are greater than 0*/
  if (bukkake === 0) {
    console.log("Error: array value of zero sent to randomDist!");
    UI.alert("Error: array value of zero sent to randomDist!");
  }
  /*generate random number with max value of sum-1*/
  let hose = Math.floor(randomFloat(bukkake));
  /*check against each part of the distribution*/
  for (let i = 0; i < splooge.length; i++) {
    if (hose < splooge[i]) {
      return i;
    } else {
      /*if not number, remove that item's value from random for next check.*/
      hose -= splooge[i];
    }
  }
  /*shouldn't reach this point.... if does, error!*/
  const msg3 = "Error: no matching item in distribution found in randomDist function. unpossible.";
  console.log(msg3);
  UI.alert(msg3);
  return 0;
}
setup.randomDist = function(splooge: number[]): number {
  /*use try to get array length. If not array, will fail and proc error*/
  try {
    const jizz = splooge.length;
  } catch (e) {
    const msg1 = "Error: non array sent to randomDist - " + splooge + ": " + e.name + ": " + e.message;
    console.log(msg1);
    UI.alert(msg1);
    return 0;
  }
  /*sum up total value of all array items*/
  let bukkake = 0;
  for (let i = 0; i < splooge.length; i++) {
    if (isNaN(splooge[i])) {
      const msg2 = "Error: non-numeric value sent to randomDist - value: " + splooge[i];
      console.log(msg2);
      UI.alert(msg2);
      return 0;
    } else {
      bukkake += splooge[i];
    }
  }
  /*check to make sure that values for distribution are greater than 0*/
  if (bukkake === 0) {
    console.log("Error: array value of zero sent to randomDist!");
    UI.alert("Error: array value of zero sent to randomDist!");
  }
  /*generate random number with max value of sum-1*/
  let hose = Math.floor(randomFloat(bukkake));
  /*check against each part of the distribution*/
  for (let i = 0; i < splooge.length; i++) {
    if (hose < splooge[i]) {
      return i;
    } else {
      /*if not number, remove that item's value from random for next check.*/
      hose -= splooge[i];
    }
  }
  /*shouldn't reach this point.... if does, error!*/
  const msg3 = "Error: no matching item in distribution found in randomDist function. unpossible.";
  console.log(msg3);
  UI.alert(msg3);
  return 0;
};
prerender.settingsetter = function(x) {
  if (settings.extremeContent) { // is true
    State.active.variables.noExtreme = true;
  } else { // is false
    State.active.variables.noExtreme = false;
  }
  if (settings.violentContent) { // is true
    State.active.variables.noViolent = true;
  } else { // is false
    State.active.variables.noViolent = false;
  }
  if (settings.rapeContent) { // is true
    State.active.variables.noForce = true;
  } else { // is false
    State.active.variables.noForce = false;
  }
};

aw.dialogCloseEvent = function() {
  try {
    aw.replace("#story-banner", "<<include [[StoryBanner]]>>");
    aw.replace("#story-caption", "<<include [[StoryCaption]]>>");
    if (aw.passage.tags.includes("map")) {
      aw.replace("#corner-bar", "<<include [[topCornerUIbox]]>>");
    }
  } catch (e) {
    aw.con.info(`Failed to refresh UI on dialog exit automatically with error ${e.name}: ${e.message}.`);
  }
};

let settingThemeNames = {
  background: ["Dark", "Light", "Desert", "NightSky", "Marooned", "Woodstain", "LightGrey", "DarkGrey", "Custom"],
  text: ["Light", "Dark", "White", "Black", "Grey"],
  colors: ["Default", "DarkPink", "Forest", "Meadow", "Sky", "NightSky", "Fall", "Summer", "Custom"],
};
setup.backgroundThemeHandler = function(): void {
  let main = "#0f0009";
  let menus = "#222";
  switch (settings.backgroundTheme) {
    case "Dark":
      main = "#0f0009";
      menus = "#222";
      break;
    case "Light":
      main = "#efdcec";
      menus = "#e8bee3";
      break;
    case "Desert":
      main = "#f2d6ab";
      menus = "#e0c69f";
      break;
    case "NightSky":
      main = "#001038";
      menus = "#001342";
      break;
    case "Marooned":
      main = "#38000b";
      menus = "#47000e";
      break;
    case "Woodstain":
      main = "#3f2500";
      menus = "#4f2e00";
      break;
    case "LightGrey":
      main = "#efefef";
      menus = "#d6d6d6";
      break;
    case "DarkGrey":
      main = "#353535";
      menus = "#444444";
      break;
    case "Custom":
      main = aw.theme.bgMain;
      menus = aw.theme.bgMenus;
  }
  css_fuck(
    {name: "body", prop: "background", val: main},
    { name: "input", prop: "background", val: main },
    { name: "#ui-bar", prop: "background", val: menus },
    { name: "#actionbar", prop: "background", val: "menus" },
    { name: "#right-ui-bar", prop: "background", val: menus },
    { name: "#ui-overlay", prop: "background", val: menus },
    { name: "#ui-dialog-body", prop: "background", val: menus },
    { name: "#ui-dialog-titlebar", prop: "background", val: menus },
  );
  Setting.save();
};
setup.textThemeHandler = function(): void {
  switch (settings.textTheme) {
    case "Light":
      css_fuck(
        { name: "input", prop: "color", val: "#eae5d7" },
        { name: "#ui-bar", prop: "color", val: "white" },
        { name: "#right-ui-bar", prop: "color", val: "white" },
        { name: "#ui-dialog-titlebar", prop: "color", val: "#FFF" },
        { name: ".note", prop: "color", val: "white" },
        { name: ".exp", prop: "color", val: "white" },
        { name: ".clock", prop: "color", val: "white" },
        { name: ".pc", prop: "color", val: "#ffbcd3" },
        { name: ".npc", prop: "color", val: "#93e7ff" },
        { name: ".mono", prop: "color", val: "#ffbcd3" },
        { name: ".inst", prop: "color", val: "white" },
        { name: ".white", prop: "color", val: "white" },
        { name: ".smallauthor", prop: "color", val: "white" },
        { name: ".sceneauthor", prop: "color", val: "white" },
        { name: ".yellow", prop: "color", val: "yellow" },
        { name: ".green", prop: "color", val: "limegreen" },
        { name: ".good", prop: "color", val: "limegreen" },
        { name: ".import", prop: "color", val: "yellow" },
        { name: ".ident", prop: "color", val: "#0befeb" },
        { name: ".money", prop: "color", val: "yellowgreen" },
        { name: ".pink", prop: "color", val: "pink" },
        { name: ".infoLink a", prop: "color", val: "#a5e4ff" },
      );
      break;
    case "Dark":
      css_fuck(
        { name: "body", prop: "color", val: "#210c00" },
        { name: "input", prop: "color", val: "#210c00" },
        { name: "#ui-bar", prop: "color", val: "black" },
        { name: "#right-ui-bar", prop: "color", val: "black" },
        { name: "#ui-dialog-titlebar", prop: "color", val: "#000" },
        { name: ".note", prop: "color", val: "#4c4d4f" },
        { name: ".exp", prop: "color", val: "#4c4d4f" },
        { name: ".clock", prop: "color", val: "black" },
        { name: ".pc", prop: "color", val: "#ff3279" },
        { name: ".npc", prop: "color", val: "#00b2ff" },
        { name: ".mono", prop: "color", val: "#ff3279" },
        { name: ".inst", prop: "color", val: "#4c4d4f" },
        { name: ".white", prop: "color", val: "black" },
        { name: ".smallauthor", prop: "color", val: "black" },
        { name: ".sceneauthor", prop: "color", val: "black" },
        { name: ".yellow", prop: "color", val: "#fcbd00" },
        { name: ".green", prop: "color", val: "green" },
        { name: ".good", prop: "color", val: "green" },
        { name: ".import", prop: "color", val: "#fcbd00" },
        { name: ".ident", prop: "color", val: "#03899e" },
        { name: ".money", prop: "color", val: "limegreen" },
        { name: ".pink", prop: "color", val: "hotpink" },
        { name: ".infoLink a", prop: "color", val: "#4690af" },
      );
      break;
    case "White":
      css_fuck(
        { name: "body", prop: "color", val: "white" },
        { name: "input", prop: "color", val: "white" },
        { name: "#ui-bar", prop: "color", val: "#eae5d7" },
        { name: "#right-ui-bar", prop: "color", val: "#eae5d7" },
        { name: "#ui-dialog-titlebar", prop: "color", val: "#eae5d7" },
        { name: ".note", prop: "color", val: "#eae5d7" },
        { name: ".exp", prop: "color", val: "#eae5d7" },
        { name: ".clock", prop: "color", val: "#eae5d7" },
        { name: ".pc", prop: "color", val: "#ffbcd3" },
        { name: ".npc", prop: "color", val: "#93e7ff" },
        { name: ".mono", prop: "color", val: "#ffbcd3" },
        { name: ".inst", prop: "color", val: "#eae5d7" },
        { name: ".white", prop: "color", val: "#eae5d7" },
        { name: ".smallauthor", prop: "color", val: "#eae5d7" },
        { name: ".sceneauthor", prop: "color", val: "#eae5d7" },
        { name: ".yellow", prop: "color", val: "yellow" },
        { name: ".green", prop: "color", val: "limegreen" },
        { name: ".good", prop: "color", val: "limegreen" },
        { name: ".import", prop: "color", val: "yellow" },
        { name: ".ident", prop: "color", val: "#0befeb" },
        { name: ".money", prop: "color", val: "yellowgreen" },
        { name: ".pink", prop: "color", val: "pink" },
        { name: ".infoLink a", prop: "color", val: "#a5e4ff" },
      );
      break;
    case "Black":
      css_fuck(
        { name: "body", prop: "color", val: "black" },
        { name: "input", prop: "color", val: "black" },
        { name: "#ui-bar", prop: "color", val: "#210c00" },
        { name: "#right-ui-bar", prop: "color", val: "#210c00" },
        { name: "#ui-dialog-titlebar", prop: "color", val: "#000" },
        { name: ".note", prop: "color", val: "#4c4d4f" },
        { name: ".exp", prop: "color", val: "#4c4d4f" },
        { name: ".clock", prop: "color", val: "#210c00" },
        { name: ".pc", prop: "color", val: "#ff3279" },
        { name: ".npc", prop: "color", val: "#00b2ff" },
        { name: ".mono", prop: "color", val: "#ff3279" },
        { name: ".inst", prop: "color", val: "#4c4d4f" },
        { name: ".white", prop: "color", val: "#210c00" },
        { name: ".smallauthor", prop: "color", val: "#210c00" },
        { name: ".sceneauthor", prop: "color", val: "#210c00" },
        { name: ".yellow", prop: "color", val: "#fcbd00" },
        { name: ".green", prop: "color", val: "green" },
        { name: ".good", prop: "color", val: "green" },
        { name: ".import", prop: "color", val: "#fcbd00" },
        { name: ".ident", prop: "color", val: "#03899e" },
        { name: ".money", prop: "color", val: "limegreen" },
        { name: ".pink", prop: "color", val: "hotpink" },
        { name: ".infoLink a", prop: "color", val: "#4690af" },
      );
      break;
    case "Grey":
      css_fuck(
        { name: "body", prop: "color", val: "#3a3a3a" },
        { name: "input", prop: "color", val: "#3a3a3a" },
        { name: "#ui-bar", prop: "color", val: "#2d2d2d" },
        { name: "#right-ui-bar", prop: "color", val: "#2d2d2d" },
        { name: "#ui-dialog-titlebar", prop: "color", val: "#000" },
        { name: ".note", prop: "color", val: "#4c4d4f" },
        { name: ".exp", prop: "color", val: "#4c4d4f" },
        { name: ".clock", prop: "color", val: "#2d2d2d" },
        { name: ".pc", prop: "color", val: "#ff3279" },
        { name: ".npc", prop: "color", val: "#00b2ff" },
        { name: ".mono", prop: "color", val: "#ff3279" },
        { name: ".inst", prop: "color", val: "#4c4d4f" },
        { name: ".white", prop: "color", val: "#2d2d2d" },
        { name: ".smallauthor", prop: "color", val: "#2d2d2d" },
        { name: ".sceneauthor", prop: "color", val: "#2d2d2d" },
        { name: ".yellow", prop: "color", val: "#fcbd00" },
        { name: ".green", prop: "color", val: "green" },
        { name: ".good", prop: "color", val: "green" },
        { name: ".import", prop: "color", val: "#fcbd00" },
        { name: ".ident", prop: "color", val: "#03899e" },
        { name: ".money", prop: "color", val: "limegreen" },
        { name: ".pink", prop: "color", val: "hotpink" },
        { name: ".infoLink a", prop: "color", val: "#a5e4ff" },
      );
      break;
  }
  Setting.save();
};
setup.browserLimit = false;
setup.colorThemeHandler = function(): void {
  let toggle = "#00B2FF";
  let uiBorder = "#014F8E";
  let scrollbar = "rgba(61, 200, 255,0.8)";
  let head = "#00B2FF";
  let table = "#0078AC";
  let link = "#00FFEF";
  switch (settings.colorTheme) {
    case "Default":
      toggle = "#00B2FF";
      uiBorder = "#014F8E";
      scrollbar = "rgba(61, 200, 255,0.8)";
      head = "#00B2FF";
      table = "#0078AC";
      link = "#00FFEF";
      /*toggle = "#ff54c8";
      uiBorder = "#014f8e";
      scrollbar = "rgba(181,0,108,0.8)";
      head = "#ff69b4";
      table = "#b40f46";
      link = "#edacf9";*/
      break;
    case "DarkPink":
      head = "deeppink";
      link = "#edacf9";
      table = "#b40f46";
      uiBorder = "#014f8e";
      scrollbar = "rgba(181,0,108,0.8)";
      toggle = "#ff54c8";
      break;
    case "Forest":
      link = "#2a7c40";
      table = "#637c10";
      head = "#34930b";
      uiBorder = "#046018";
      scrollbar = "rgba(7,150,69,0.8)";
      toggle = "#3dad11";
      break;
    case "Meadow":
      link = "#3eb05c";
      table = "#86a418";
      head = "#64b711";
      uiBorder = "#06821e";
      scrollbar = "rgba(10, 176, 82, 0.8)";
      toggle = "#43b014";
      break;
    case "Sky":
      link = "#00acef";
      table = "#186aa4";
      head = "#118eb7";
      uiBorder = "#07538a";
      scrollbar = "rgba(10, 132, 203, 0.8)";
      toggle = "#1477b0";
      break;
    case "NightSky":
      link = "#0078a4";
      table = "#11496f";
      head = "#0c6079";
      uiBorder = "#053557";
      scrollbar = "rgba(7, 91, 140, 0.8)";
      toggle = "#0c4868";
      break;
    case "Fall":
      table = "#bc8403";
      head = "#bc6e00";
      link = "#ba9100";
      uiBorder = "#994403";
      scrollbar = "rgba(155,64,0,0.8)";
      toggle = "#a83203";
      break;
    case "Summer":
      table = "#ffb200";
      head = "#ff9400";
      link = "#ffc700";
      uiBorder = "#bc8300";
      scrollbar = "rgba(221,148,31,0.8)";
      toggle = "#ffc700";
      break;
    case "Custom":
      try {
        table = aw.theme.table;
        head = aw.theme.head;
        link = aw.theme.link;
        uiBorder = aw.theme.uiBorder;
        scrollbar = aw.theme.scrollbar;
        toggle = aw.theme.toggle;
      } catch (e) {
        UI.alert("storyinit hasn't run, State has no variables");
      }
      break;
  }
  css_fuck(
    { name: "#menu li a", prop: "color", val: head },
    { name: "a", prop: "color", val: link },
    { name: ".link", prop: "color", val: link },
    { name: "table", prop: "borderColor", val: table },
    { name: "tr", prop: "borderColor", val: table },
    { name: "table#stats", prop: "borderColor", val: table },
    { name: ".head", prop: "color", val: head },
    { name: ".head1", prop: "color", val: head },
    { name: ".head2", prop: "color", val: head },
    { name: ".head3", prop: "color", val: head },
    { name: ".head4", prop: "color", val: head },
    { name: "h1", prop: "color", val: head },
    { name: "h2", prop: "color", val: head },
    { name: "h3", prop: "color", val: head },
    { name: "h4", prop: "color", val: head },
    { name: "h5", prop: "color", val: head },
    { name: "h6", prop: "color", val: head },
    { name: "#right-sidebar-portrait", prop: "borderColor", val: uiBorder },
    { name: "#ui-bar", prop: "borderColor", val: uiBorder },
    { name: "#uiReminder", prop: "borderColor", val: uiBorder },
  );
  try {
    const rules = cssrules();
    if (!rules.hasOwnProperty("::-webkit-scrollbar-thumb")) {
      setup.browserLimit = true;
    } else {
      try {
        rules["::-webkit-scrollbar-thumb"].style.background = scrollbar;
      } catch (e) {
        aw.con.info(`CSS_FUCK: Bad Property Error - SCROLLLLLLLBAR`);
      }
    }
  } catch (e) {
    aw.con.info(`CSS scrollbar setting errored out with ${e.name}: ${e.message}`);
  }
  // css_fuck("#ui-bar-toggle").style.color = toggle;
  // css_fuck("#right-ui-bar-toggle").style.color = toggle;
  // save the setting for future load
  Setting.save();
  aw.con.info(`Theme applied. Setting is ${settings.colorTheme}. Head Color: ${head} Custom: ${aw.theme.head}.`);
};

setup.FontsizeHandler = function(): void {
  switch (settings.fontsize) {
    case "Normal":
      css_fuck(
        { name: "html", prop: "fontSize", val: "18px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "Ant-Man":
      css_fuck(
        { name: "html", prop: "fontSize", val: "12px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "V-Small":
      css_fuck(
        { name: "html", prop: "fontSize", val: "14px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "Small":
      css_fuck(
        { name: "html", prop: "fontSize", val: "16px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "Large":
      css_fuck(
        { name: "html", prop: "fontSize", val: "20px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "X-Large":
      css_fuck(
        { name: "html", prop: "fontSize", val: "22px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "Gigantic":
      css_fuck(
        { name: "html", prop: "fontSize", val: "24px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "OLD-PERSON":
      css_fuck(
        { name: "html", prop: "fontSize", val: "28px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "ZOMBIE!!!":
      css_fuck(
        { name: "html", prop: "fontSize", val: "32px" },
        { name: "#story", prop: "marginRight", val: "325px" },
        { name: "#story", prop: "marginLeft", val: "325px" },
      );
      break;
    case "OMGWTFBBQ":
      css_fuck(
        { name: "html", prop: "fontSize", val: "36px" },
        { name: "#story", prop: "marginRight", val: "350px" },
        { name: "#story", prop: "marginLeft", val: "350px" },
      );
      break;
  }
  Setting.save();
};

setup.test = function(input: string) {
  setup.notify(input);
};

// handles the extreme content setting
setup.ExtremeHandler = function(): void {
  if (settings.extremeContent) { // is true
    State.active.variables.noExtreme = true;
  } else { // is false
    State.active.variables.noExtreme = false;
  }
  Setting.save();
};

// handles the violence setting
setup.ViolentHandler = function(): void {
  if (settings.violentContent) { // is true
    State.active.variables.noViolent = true;
  } else { // is false
    State.active.variables.noViolent = false;
  }
  Setting.save();
};

// handles the rape setting
setup.RapeHandler = function(): void {
  if (settings.rapeContent) { // is true
    State.active.variables.noForce = true;
  } else { // is false
    State.active.variables.noForce = false;
  }
  Setting.save();
};

// handles verbose setting
setup.verboseHandler = function(): void {
  if (settings.verbose) {
    aw.verbose = true;
  } else {
    aw.verbose = false;
    aw.verboseExtra = false;
  }
};

// handles the SRFI setting
setup.screenReader = function(): void {
  if (settings.screenReader === "Enabled") { // is true
    State.active.variables.screenReader = true;
  } else { // is false
    State.active.variables.screenReader = false;
  }
  Setting.save();
};

// Handles the performance setting option to limit NPCs
setup.PerformanceHandler = function(): void {
  let npcs = 0;
  if (aw.npc !== null && aw.npc !== undefined) {
    npcs = Object.keys(aw.npc).length;
  }
  State.active.variables.npcMax = Number(settings.performance);
  if (npcs > Number(settings.performance)) {
    alert(`You have set npc count to ${settings.performance}, which is smaller than the current number of NPCs in the game. The number of NPCs are not reduced immediately, and will be removed during the end of week loading screen.`);
  }
};

setup.AsyncHandler = function(): void {
  const x = settings.asyncDelay;
  switch (x) {
    case "Very Low":
      setup.omni.delay = 50;
      minDomActionDelay = 50;
      setup.event.delay = 60;
      setup.event.asyncDelay = 4;
      break;
    case "Low":
      setup.omni.delay = 40;
      minDomActionDelay = 40;
      setup.event.delay = 50;
      setup.event.asyncDelay = 3;
      break;
    case "High":
      setup.omni.delay = 22;
      minDomActionDelay = 22;
      setup.event.delay = 32;
      setup.event.asyncDelay = 2;
      break;
    case "Ultra":
      setup.omni.delay = 16;
      minDomActionDelay = 16;
      setup.event.delay = 26;
      setup.event.asyncDelay = 1;
      break;
    case "Standard":
    default:
      setup.omni.delay = 30;
      minDomActionDelay = 30;
      setup.event.delay = 40;
      setup.event.asyncDelay = 2;
      break;
  }
  setup.interact.delay = Math.floor(minDomActionDelay * 1.5);
  setup.sex.domDelay = Math.floor(minDomActionDelay / 2);
};

Setting.addList("performance", {
  label: "Choose max NPC count. <span style='font-size:0.8rem;'>[Smaller = better performance]</span>",
  list: ["75", "100", "150", "200", "300"],
  default: "150",
  onInit: setup.PerformanceHandler,
  onChange: setup.PerformanceHandler,
});

Setting.addList("asyncDelay", {
  label: "Async Performance. <span style='font-size:0.8rem;'>[use caution when raising]</span>",
  list: ["Very Low", "Low", "Standard", "High", "Ultra"],
  default: "Standard",
  onInit: setup.AsyncHandler,
  onChange: setup.AsyncHandler,
});

Setting.addToggle("extremeContent", {
  label: "Disable Extreme Content?",
  default: false,
  onInit: setup.ExtremeHandler,
  onChange: setup.ExtremeHandler,
});

Setting.addToggle("violentContent", {
  label: "Disable Violent Content?",
  default: false,
  onInit: setup.ViolentHandler,
  onChange: setup.ViolentHandler,
});

Setting.addToggle("rapeContent", {
  label: "Disable Rape Content?",
  default: false,
  onInit: setup.RapeHandler,
  onChange: setup.RapeHandler,
});

Setting.addToggle("verbose", {
  label: "Enable Verbose Console? <span style='font-size:0.8rem;'>[F12 to view]</span>",
  default: false,
  onInit: setup.verboseHandler,
  onChange: setup.verboseHandler,
});

Setting.addList("backgroundTheme", {
  label: "Choose background color.",
  list: settingThemeNames.background,
  default: "Dark",
  // onInit   : settingThemeHandler,
  onChange: setup.backgroundThemeHandler,
});

Setting.addList("textTheme", {
  label: "Choose text colors.",
  list: settingThemeNames.text,
  default: "Light",
  // onInit   : settingThemeHandler,
  onChange: setup.textThemeHandler,
});

Setting.addList("colorTheme", {
  label: "Choose theme colors.",
  list: settingThemeNames.colors,
  default: "Default",
  // onInit   : settingThemeHandler,
  onChange: setup.colorThemeHandler,
});

Setting.addList("fontsize", {
  label: "Choose a font size.",
  list: ["Ant-Man", "V-Small", "Small", "Normal", "Large", "X-Large", "Gigantic", "OLD-PERSON", "ZOMBIE!!!", "OMGWTFBBQ"],
  default: "Normal",
  // onInit   : settingFontsizeHandler,
  onChange: setup.FontsizeHandler,
});

Setting.addList("screenReader", {
  label: "Screen reader friendly interface",
  list: ["Disabled", "Enabled"],
  default: "Disabled",
  onInit: setup.screenReader,
  onChange: setup.screenReader,
});

setup.refreshTheme = function(): void {
  setup.backgroundThemeHandler();
  setup.textThemeHandler();
  setup.backgroundThemeHandler();
  setup.FontsizeHandler();
};


function cssrules(): any {
  const rules = {};
  const ds = document.styleSheets;
  const dsl = ds.length;
  for (let i = 0; i < dsl; ++i) {
    const dsi = ( ds[i] as any).cssRules;
    const dsil = dsi.length;
    for (let j = 0; j < dsil; ++j) {
      rules[dsi[j].selectorText] = dsi[j];
    }
  }
  return rules;
}

interface cssFuckSet {
  name: string;
  prop: string;
  val: string;
}

function css_fuck(...sets: cssFuckSet[]): void {
  const rules = cssrules();
  if (sets.length < 1) {
    aw.con.info(`CSS_Fuck with no sets???`);
    return;
  }
  for (const c of sets) {
    if (!rules.hasOwnProperty(c.name)) {
      aw.con.info(`CSS_FUCK: Missing name ${c.name}.`);
    } else {
      try {
        rules[c.name].style[c.prop] = c.val;
      } catch (e) {
        aw.con.info(`CSS_FUCK: Bad Property Error - ${c.name}, ${c.prop}, ${c.val}\n${e.name}: ${e.message}`);
      }
    }
  }
}


/*save the storage ids of saved NPCs in local storage*/
setup.NPCStoreList = [];
/*between-game local store functions*/
setup.storeState = function(): void {
  const store = JSON.stringify(State.active.variables.gamestate);
  try {
    localStorage.setItem("state-send", store);
  } catch (e) {
    const msg = "Local storage unavailable error: " + e.name + ": " + e.message;
    UI.alert(msg);
    console.log(msg);
  }
};

setup.unpackVars = function(): void {
  try {
    const store = localStorage.getItem("state-send");
    if (store != null) {
      return JSON.parse(store);
    } else {
      setup.achieve.reset("silent");
    }
  } catch (e) {
    const msg = "Local storage unavailable error: " + e.name + ": " + e.message;
    aw.con.info(msg);
    setup.achieve.reset("silent");
  }
};

// event trigger to record passage name
/*
$(document).on(":passagedisplay", function(ev) {
  aw.passage = {
    title: ev.title,
    tags: clone(ev.tags),
    domId: ev.domId,
  };
  console.log(`recorded info: title: ${aw.passage.title}, tags: ${aw.passage.tags}.`);
});
*/

aw.base = {
  shop: {
    panties: 6,
    bras: 12,
    stockings: 5,
    lower: 20,
    upper: 20,
    dress: 20,
    coats: 60,
    swimBottom: 20,
    swimTop: 12,
    swimOnePiece: 35,
    athleticBottom: 20,
    athleticTop: 15,
    athleticBra: 8,
    shoes: 30,
  },
  storeMod: {
    Bullseye: 1.5,
    UniHoe: 2,
    Starter: 1,
    Unknown: 3,
    CazzoFottere: 4,
    Cucci: 5,
    ThighGap: 3,
    VaginaSecrets: 3.5,
    TightThreads: 4,
    thotTopic: 3,
    BallSack: 3,
    Shoegasm: 3,
  },
  clothingAtrMod: {
    panties: [2, 6],
    bra: [2, 6],
    leg: [1, 3],
    top: [-1, 1],
    bottom: [-1, 1],
    dress: [-6, -2],
    coat: [-1, 1],
    swimBottom: [0, 3],
    swimTop: [0, 3],
    swimOnePiece: [2, 4],
    athleticBottom: [0, 1],
    athleticTop: [0, 1],
    athleticBra: [0, 1],
    shoes: [0, 1],
  },
};



