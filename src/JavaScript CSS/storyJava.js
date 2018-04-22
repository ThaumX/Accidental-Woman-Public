Config.history.controls = false;
Config.loadDelay = 2500;
Setting.addHeader("Accidental Woman Settings");
Config.saves.slots = 8;
Config.history.maxStates = 1;
Config.saves.autosave = "autosave";
Config.saves.id = "Accidental_Woman";
setup.version = "none";
setup.ver = 0;
setup.sexActs = {};
setup.sexPos = {};
setup.perf = {};

$(document).on(':passagedisplay',function(){
  $('[data-tooltip]').addClass('tooltip');
  $('.tooltip').each(function() {
    $(this).append('<span class="tooltip-content">' + $(this).attr('data-tooltip') + '</span>');
  });
});


$(document).on(":passageend", function () {
  State.active.variables.AW.author = "Probably Thaumx";
});
setup.menuItemRunSaves = function(){
  Dialog.addClickHandler('#menu-item-saves', null, UI.buildSaves)
    .text(L10n.get('savesTitle'));
  Dialog.addClickHandler('#menu-item-settings', null, UI.buildSettings)
    .text(L10n.get('settingsTitle'));
  Dialog.addClickHandler('#menu-item-restart', null, UI.buildRestart)
    .text(L10n.get('restartTitle'));
};
/*performance measurement of passage transition*/
prehistory.perfstart = function (taskName) {
  setup.perf.prehist = performance.now();
};
prerender.perfrend = function (content, taskName) {
  setup.perf.preRend = performance.now();
};
postrender.perfaftrend = function (content, taskName) {
  setup.perf.postHist = performance.now();
};
postdisplay.perfend = function (taskName) {
  let aftDisp = performance.now();
  let time = [0, 0, 0];
  time[0] = Math.floor(setup.perf.preRend - setup.perf.prehist);
  time[1] = Math.floor(setup.perf.postHist - setup.perf.preRend);
  time[2] = Math.floor(aftDisp - setup.perf.postHist);
  //let cont = "ΔͲ: " + (Math.floor(aftDisp - setup.perf.prehist) + "." + (Math.round((aftDisp - setup.perf.prehist) * 10) % 10)) + "ms [S:" + time[0] + "|R:" + time[1] + "|D:" + time[2] + "]";
  let cont = "ΔͲ: " + (Math.floor(aftDisp - setup.perf.prehist) + "." + (Math.round((aftDisp - setup.perf.prehist) * 10) % 10));
  setup.appendStr("#passage-transition-time", cont);
};

function randomDist(splooge) {
  /*use try to get array length. If not array, will fail and proc error*/
  try {
    var jizz = splooge.length;
  } catch (e) {
    var msg1 = "Error: non array sent to randomDist - " + splooge + ": " + e.name + ": " + e.message;
    console.log(msg1);
    alert(msg1);
    return 0;
  }
  /*sum up total value of all array items*/
  var bukkake = 0;
  for (var i = 0; i < splooge.length; i++) {
    if (isNaN(splooge[i])) {
      var msg2 = "Error: non-numeric value sent to randomDist - value: " + splooge[i];
      console.log(msg2);
      alert(msg2);
      return 0;
    } else {
      bukkake += splooge[i];
    }
  }
  /*check to make sure that values for distribution are greater than 0*/
  if (bukkake == 0) {
    console.log("Error: array value of zero sent to randomDist!");
    alert("Error: array value of zero sent to randomDist!");
  }
  /*generate random number with max value of sum-1*/
  var hose = Math.floor(randomFloat(bukkake));
  /*check against each part of the distribution*/
  for (i = 0; i < splooge.length; i++) {
    if (hose < splooge[i]) {
      return i;
    } else {
      /*if not number, remove that item's value from random for next check.*/
      hose -= splooge[i];
    }
  }
  /*shouldn't reach this point.... if does, error!*/
  var msg3 = "Error: no matching item in distribution found in randomDist function. unpossible.";
  console.log(msg3);
  alert(msg3);
  return 0;
}
setup.randomDist = function(splooge) {
  /*use try to get array length. If not array, will fail and proc error*/
  try {
    var jizz = splooge.length;
  } catch (e) {
    var msg1 = "Error: non array sent to randomDist - " + splooge + ": " + e.name + ": " + e.message;
    console.log(msg1);
    alert(msg1);
    return 0;
  }
  /*sum up total value of all array items*/
  var bukkake = 0;
  for (var i = 0; i < splooge.length; i++) {
    if (isNaN(splooge[i])) {
      var msg2 = "Error: non-numeric value sent to randomDist - value: " + splooge[i];
      console.log(msg2);
      alert(msg2);
      return 0;
    } else {
      bukkake += splooge[i];
    }
  }
  /*check to make sure that values for distribution are greater than 0*/
  if (bukkake == 0) {
    console.log("Error: array value of zero sent to randomDist!");
    alert("Error: array value of zero sent to randomDist!");
  }
  /*generate random number with max value of sum-1*/
  var hose = Math.floor(randomFloat(bukkake));
  /*check against each part of the distribution*/
  for (i = 0; i < splooge.length; i++) {
    if (hose < splooge[i]) {
      return i;
    } else {
      /*if not number, remove that item's value from random for next check.*/
      hose -= splooge[i];
    }
  }
  /*shouldn't reach this point.... if does, error!*/
  var msg3 = "Error: no matching item in distribution found in randomDist function. unpossible.";
  console.log(msg3);
  alert(msg3);
  return 0;
};
prerender.settingsetter = function (x) {
  if (settings.extremeContent) { // is true
    state.active.variables["noExtreme"] = true;
  } else { // is false
    state.active.variables["noExtreme"] = false;
  }
  if (settings.violentContent) { // is true
    state.active.variables["noViolent"] = true;
  } else { // is false
    state.active.variables["noViolent"] = false;
  }
  if (settings.rapeContent) { // is true
    state.active.variables["noForce"] = true;
  } else { // is false
    state.active.variables["noForce"] = false;
  }
};

var settingThemeNames = {
  background: ["Dark", "Light", "Desert", "NightSky", "Marooned", "Woodstain", "LightGrey", "DarkGrey", "Custom"],
  text: ["Light", "Dark", "White", "Black", "Grey"],
  colors: ["Default", "DarkDefault", "Forest", "Meadow", "Sky", "NightSky", "Fall", "Summer", "Custom"]
};
setup.backgroundThemeHandler = function () {
  let main = "#0f0009", menus = "#222";
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
    main = State.variables.pref.theme.bgMain;
    menus = State.variables.pref.theme.bgMenus;
  }
  css_fuck("body").style.background = main;
  css_fuck("input").style.background = main;
  css_fuck("#ui-bar").style.background = menus;
  css_fuck("#topbar").style.background = menus;
  try{
    css_fuck("#actionbar").style.background = menus;
  }
  catch(e){
    console.log(`couldn't set actionbar as expected. ${e.name}: ${e.message}`);
  }
  css_fuck("#right-ui-bar").style.background = menus;
  css_fuck("#ui-overlay").style.background = menus;
  css_fuck("#ui-dialog-body").style.background = menus;
  css_fuck("#ui-dialog-titlebar").style.background = menus;
  Setting.save();
};
setup.textThemeHandler = function () {
  switch (settings.textTheme) {
  case "Light":
    css_fuck("body").style.color = "#eae5d7";
    css_fuck("input").style.color = "#eae5d7";
    css_fuck("#ui-bar").style.color = "white";
    css_fuck("#right-ui-bar").style.color = "white";
    css_fuck("#ui-dialog-titlebar").style.color = "#FFF";
    css_fuck(".note").style.color = "white";
    css_fuck(".exp").style.color = "white";
    css_fuck(".clock").style.color = "white";
    css_fuck(".pc").style.color = "#ffbcd3";
    css_fuck(".npc").style.color = "#93e7ff";
    css_fuck(".mono").style.color = "#ffbcd3";
    css_fuck(".inst").style.color = "white";
    css_fuck(".white").style.color = "white";
    css_fuck(".smallauthor").style.color = "white";
    css_fuck(".sceneauthor").style.color = "white";
    css_fuck(".yellow").style.color = "yellow";
    css_fuck(".green").style.color = "limegreen";
    css_fuck(".good").style.color = "limegreen";
    css_fuck(".import").style.color = "yellow";
    css_fuck(".ident").style.color = "#0befeb";
    css_fuck(".money").style.color = "yellowgreen";
    css_fuck(".pink").style.color = "pink";
    css_fuck(".infoLink a").style.color = "#a5e4ff";
    break;
  case "Dark":
    css_fuck("body").style.color = "#210c00";
    css_fuck("input").style.color = "#210c00";
    css_fuck("#ui-bar").style.color = "black";
    css_fuck("#right-ui-bar").style.color = "black";
    css_fuck("#ui-dialog-titlebar").style.color = "#000";
    css_fuck(".note").style.color = "#4c4d4f";
    css_fuck(".exp").style.color = "#4c4d4f";
    css_fuck(".clock").style.color = "black";
    css_fuck(".pc").style.color = "#ff3279";
    css_fuck(".npc").style.color = "#00b2ff";
    css_fuck(".mono").style.color = "#ff3279";
    css_fuck(".inst").style.color = "#4c4d4f";
    css_fuck(".white").style.color = "black";
    css_fuck(".smallauthor").style.color = "black";
    css_fuck(".sceneauthor").style.color = "black";
    css_fuck(".yellow").style.color = "#fcbd00";
    css_fuck(".green").style.color = "green";
    css_fuck(".good").style.color = "green";
    css_fuck(".import").style.color = "#fcbd00";
    css_fuck(".ident").style.color = "#03899e";
    css_fuck(".money").style.color = "limegreen";
    css_fuck(".pink").style.color = "hotpink";
    css_fuck(".infoLink a").style.color = "#4690af";
    break;
  case "White":
    css_fuck("body").style.color = "white";
    css_fuck("input").style.color = "white";
    css_fuck("#ui-bar").style.color = "#eae5d7";
    css_fuck("#right-ui-bar").style.color = "#eae5d7";
    css_fuck("#ui-dialog-titlebar").style.color = "#eae5d7";
    css_fuck(".note").style.color = "#eae5d7";
    css_fuck(".exp").style.color = "#eae5d7";
    css_fuck(".clock").style.color = "#eae5d7";
    css_fuck(".pc").style.color = "#ffbcd3";
    css_fuck(".npc").style.color = "#93e7ff";
    css_fuck(".mono").style.color = "#ffbcd3";
    css_fuck(".inst").style.color = "#eae5d7";
    css_fuck(".white").style.color = "#eae5d7";
    css_fuck(".smallauthor").style.color = "#eae5d7";
    css_fuck(".sceneauthor").style.color = "#eae5d7";
    css_fuck(".yellow").style.color = "yellow";
    css_fuck(".green").style.color = "limegreen";
    css_fuck(".good").style.color = "limegreen";
    css_fuck(".import").style.color = "yellow";
    css_fuck(".ident").style.color = "#0befeb";
    css_fuck(".money").style.color = "yellowgreen";
    css_fuck(".pink").style.color = "pink";
    css_fuck(".infoLink a").style.color = "#a5e4ff";
    break;
  case "Black":
    css_fuck("body").style.color = "black";
    css_fuck("input").style.color = "black";
    css_fuck("#ui-bar").style.color = "#210c00";
    css_fuck("#right-ui-bar").style.color = "#210c00";
    css_fuck("#ui-dialog-titlebar").style.color = "#000";
    css_fuck(".note").style.color = "#4c4d4f";
    css_fuck(".exp").style.color = "#4c4d4f";
    css_fuck(".clock").style.color = "#210c00";
    css_fuck(".pc").style.color = "#ff3279";
    css_fuck(".npc").style.color = "#00b2ff";
    css_fuck(".mono").style.color = "#ff3279";
    css_fuck(".inst").style.color = "#4c4d4f";
    css_fuck(".white").style.color = "#210c00";
    css_fuck(".smallauthor").style.color = "#210c00";
    css_fuck(".sceneauthor").style.color = "#210c00";
    css_fuck(".yellow").style.color = "#fcbd00";
    css_fuck(".green").style.color = "green";
    css_fuck(".good").style.color = "green";
    css_fuck(".import").style.color = "#fcbd00";
    css_fuck(".ident").style.color = "#03899e";
    css_fuck(".money").style.color = "limegreen";
    css_fuck(".pink").style.color = "hotpink";
    css_fuck(".infoLink a").style.color = "#4690af";
    break;
  case "Grey":
    css_fuck("body").style.color = "#3a3a3a";
    css_fuck("input").style.color = "#3a3a3a";
    css_fuck("#ui-bar").style.color = "#2d2d2d";
    css_fuck("#right-ui-bar").style.color = "#2d2d2d";
    css_fuck("#ui-dialog-titlebar").style.color = "#000";
    css_fuck(".note").style.color = "#4c4d4f";
    css_fuck(".exp").style.color = "#4c4d4f";
    css_fuck(".clock").style.color = "#2d2d2d";
    css_fuck(".pc").style.color = "#ff3279";
    css_fuck(".npc").style.color = "#00b2ff";
    css_fuck(".mono").style.color = "#ff3279";
    css_fuck(".inst").style.color = "#4c4d4f";
    css_fuck(".white").style.color = "#2d2d2d";
    css_fuck(".smallauthor").style.color = "#2d2d2d";
    css_fuck(".sceneauthor").style.color = "#2d2d2d";
    css_fuck(".yellow").style.color = "#fcbd00";
    css_fuck(".green").style.color = "green";
    css_fuck(".good").style.color = "green";
    css_fuck(".import").style.color = "#fcbd00";
    css_fuck(".ident").style.color = "#03899e";
    css_fuck(".money").style.color = "limegreen";
    css_fuck(".pink").style.color = "hotpink";
    css_fuck(".infoLink a").style.color = "#a5e4ff";

    break;
  }
  Setting.save();
};
setup.browserLimit = false;
setup.colorThemeHandler = function () {
  let toggle = "#ff54c8",
    uiBorder = "#8e014a",
    scrollbar = "rgba(181,0,108,0.8)",
    head = "#ff69b4",
    table = "#b40f46",
    link = "#edacf9";
  switch (settings.colorTheme) {
  case "Default":
    toggle = "#ff54c8";
    uiBorder = "#8e014a";
    scrollbar = "rgba(181,0,108,0.8)";
    head = "#ff69b4";
    table = "#b40f46";
    link = "#edacf9";
    break;
  case "DarkDefault":
    head = "deeppink";
    link = "#edacf9";
    table = "#b40f46";
    uiBorder = "#8e014a";
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
    try{
      table = State.variables.pref.theme.table;
      head = State.variables.pref.theme.head;
      link = State.variables.pref.theme.link;
      uiBorder = State.variables.pref.theme.uiBorder;
      scrollbar = State.variables.pref.theme.scrollbar;
      toggle = State.variables.pref.theme.toggle;
    }
    catch(e){
      setup.alert("storyinit hasn't run, State has no variables");
    }
    break;
  }
  css_fuck("#menu li a").style.color = head;
  css_fuck("a").style.color = link;
  css_fuck(".link").style.color = link;
  css_fuck("table").style.borderColor = table;
  css_fuck("tr").style.borderColor = table;
  try {
    css_fuck("table#stats").style.borderColor = table;
  } catch (e) {
    let msg = "didn't find #stats, probably because it doesn't exist on current page... " + e.name + ", " + e.message;
    console.log(msg);
  }
  css_fuck(".head").style.color = head;
  css_fuck(".head1").style.color = head;
  css_fuck(".head2").style.color = head;
  css_fuck(".head3").style.color = head;
  css_fuck(".head4").style.color = head;
  css_fuck("h1").style.color = head;
  css_fuck("h2").style.color = head;
  css_fuck("h3").style.color = head;
  css_fuck("h4").style.color = head;
  css_fuck("h5").style.color = head;
  css_fuck("h6").style.color = head;
  css_fuck("#right-sidebar-status").style.borderColor = uiBorder;
  css_fuck("#right-sidebar-command").style.borderColor = uiBorder;
  css_fuck("#right-sidebar-portrait").style.borderColor = uiBorder;
  css_fuck("#ui-bar").style.borderColor = uiBorder;
  css_fuck("#right-ui-bar").style.borderColor = uiBorder;
  css_fuck("#uiReminder").style.borderColor = uiBorder;
  try {
    css_fuck("::-webkit-scrollbar-thumb").style.background = scrollbar;
  } catch (e) {
    setup.browserLimit = true;
  }
  css_fuck("#ui-bar-toggle").style.color = toggle;
  css_fuck("#right-ui-bar-toggle").style.color = toggle;
  //save the setting for future load
  Setting.save();
};

setup.FontsizeHandler = function () {
  switch (settings.fontsize) {
  case "Normal":
    css_fuck("#story").style.fontSize = "20px";
    css_fuck("#story").style.marginRight = "325px";
    css_fuck("#story").style.marginLeft = "325px";
    break;
  case "V-Small":
    css_fuck("#story").style.fontSize = "16px";
    css_fuck("#story").style.marginRight = "325px";
    css_fuck("#story").style.marginLeft = "325px";
    break;
  case "Small":
    css_fuck("#story").style.fontSize = "18px";
    css_fuck("#story").style.marginRight = "325px";
    css_fuck("#story").style.marginLeft = "325px";
    break;
  case "Large":
    css_fuck("#story").style.fontSize = "22px";
    css_fuck("#story").style.marginRight = "325px";
    css_fuck("#story").style.marginLeft = "325px";
    break;
  case "X-Large":
    css_fuck("#story").style.fontSize = "24px";
    css_fuck("#story").style.marginRight = "325px";
    css_fuck("#story").style.marginLeft = "325px";
    break;
  case "Gigantic":
    css_fuck("#story").style.fontSize = "26px";
    css_fuck("#story").style.marginRight = "325px";
    css_fuck("#story").style.marginLeft = "325px";
    break;
  case "OLD-PERSON":
    css_fuck("#story").style.fontSize = "30px";
    css_fuck("#story").style.marginRight = "325px";
    css_fuck("#story").style.marginLeft = "325px";
    break;
  }
  Setting.save();
};

var settingExtremeHandler = function () {
  if (settings.extremeContent) { // is true
    state.active.variables["noExtreme"] = true;
  } else { // is false
    state.active.variables["noExtreme"] = false;
  }
  Setting.save();
};
var settingViolentHandler = function () {
  if (settings.violentContent) { // is true
    state.active.variables["noViolent"] = true;
  } else { // is false
    state.active.variables["noViolent"] = false;
  }
  Setting.save();
};
var settingRapeHandler = function () {
  if (settings.rapeContent) { // is true
    state.active.variables["noForce"] = true;
  } else { // is false
    state.active.variables["noForce"] = false;
  }
  Setting.save();
};


Setting.addToggle("extremeContent", {
  label: "Disable Extreme Content?",
  default: false,
  onInit: settingExtremeHandler,
  onChange: settingExtremeHandler
});
Setting.addToggle("violentContent", {
  label: "Disable Violent Content?",
  default: false,
  onInit: settingViolentHandler,
  onChange: settingViolentHandler
});
Setting.addToggle("rapeContent", {
  label: "Disable Rape Content?",
  default: false,
  onInit: settingRapeHandler,
  onChange: settingRapeHandler
});
Setting.addList("backgroundTheme", {
  label: "Choose background color.",
  list: settingThemeNames.background,
  default: "Dark",
  //onInit   : settingThemeHandler,
  onChange: setup.backgroundThemeHandler
});
Setting.addList("textTheme", {
  label: "Choose text colors.",
  list: settingThemeNames.text,
  default: "Light",
  //onInit   : settingThemeHandler,
  onChange: setup.textThemeHandler
});
Setting.addList("colorTheme", {
  label: "Choose theme colors.",
  list: settingThemeNames.colors,
  default: "Default",
  //onInit   : settingThemeHandler,
  onChange: setup.colorThemeHandler
});
Setting.addList("fontsize", {
  label: "Choose a font size.",
  list: ["V-Small", "Small", "Normal", "Large", "X-Large", "Gigantic", "OLD-PERSON"],
  default: "Normal",
  //onInit   : settingFontsizeHandler,
  onChange: setup.FontsizeHandler
});


function cssrules() {
  var rules = {};
  var ds = document.styleSheets;
  var dsl = ds.length;
  for (var i = 0; i < dsl; ++i) {
    var dsi = ds[i].cssRules;
    var dsil = dsi.length;
    for (var j = 0; j < dsil; ++j) {
      rules[dsi[j].selectorText] = dsi[j];
    }
  }
  return rules;
}

function css_fuck(name, createifnotfound) {
  var rules = cssrules();
  if (!rules.hasOwnProperty(name)) {
    //alert('css class not found ' + name);
    throw "css class not found " + name;
  }
  return rules[name];
}
/*save the storage ids of saved NPCs in local storage*/
setup.NPCStoreList = [];
/*between-game local store functions*/
setup.storeState = function () {
  var store = JSON.stringify(State.variables.gamestate);
  try {
    localStorage.setItem("state-send", store);
  } catch (e) {
    let msg = "Local storage unavailable error: " + e.name + ": " + e.message;
    alert(msg);
    console.log(msg);
  }
};

setup.unpackVars = function () {
  try {
    var store = localStorage.getItem("state-send");
    return JSON.parse(store);
  } catch (e) {
    let msg = "Local storage unavailable error: " + e.name + ": " + e.message;
    alert(msg);
    console.log(msg);
  }
};
/*************************************************************/
/* functions to save and recover localstore npcs             */
/*************************************************************/
Config.saves.onSave = function (save) {
  save.metadata = {};
  save.metadata.npcs = {};
  let list = setup.NPCStoreList;
  for (let i = 0, c = list.length; i < c; i++) {
    save.metadata.npcs[list[i]] = setup.AW.localRestore(list[i]);
    if (save.metadata.npcs[list[i]] == "error") {
      let msg = "error retrieving NPC for save" + list[i] + "!";
      console.log(msg);
    }
  }
  save.metadata.list = list;
  save.metadata.statusInfo1 = localStorage.getItem("status-data1");
  save.metadata.statusInfo2 = localStorage.getItem("status-data2");
  save.metadata.statusInfo3 = localStorage.getItem("status-data3");
};
Config.saves.onLoad = function (save) {
  let list = save.metadata.list;
  let keys = Object.keys(save.metadata.npcs);
  let ck = true;
  setup.NPCStoreList = [];
  for (let i = 0, c = keys.length; i < c; i++) {
    ck = setup.AW.localStore(keys[i], save.metadata.npcs[keys[i]]);
    if (ck == "error") {
      let msg = "error storing saved NPC data: " + keys[i];
      console.log(msg);
      alert(msg);
    } else {
      setup.NPCStoreList.push(keys[i]);
    }
  }
  ck = setup.AW.localStore("status-data1", save.metadata.statusInfo1);
  if(ck == "error"){
    let msg = "Error restoring status data";
    console.log(msg);
    setup.alert(msg);
  }
  ck = setup.AW.localStore("status-data2", save.metadata.statusInfo2);
  if(ck == "error"){
    let msg = "Error restoring status data";
    console.log(msg);
    setup.alert(msg);
  }
  ck = setup.AW.localStore("status-data3", save.metadata.statusInfo3);
  if(ck == "error"){
    let msg = "Error restoring status data";
    console.log(msg);
    setup.alert(msg);
  }
};



/* Prepend the <canvas> to the incoming passage. */
prerender["prependCanvas"] = function (content) {
  if (tags().contains("canvas")) {
    /* Add the <canvas> to the incoming passage render buffer (pre-render). */
    $(content)
      .append("<canvas id=\"dispcanvas\"></canvas>");
  }
};

