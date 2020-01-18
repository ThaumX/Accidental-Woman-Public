
//  8888888b.                            888b    888
//  888   Y88b                           8888b   888
//  888    888                           88888b  888
//  888   d88P 8888b.  .d8888b  .d8888b  888Y88b 888  8888b.  888  888
//  8888888P"     "88b 88K      88K      888 Y88b888     "88b 888  888
//  888       .d888888 "Y8888b. "Y8888b. 888  Y88888 .d888888 Y88  88P
//  888       888  888      X88      X88 888   Y8888 888  888  Y8bd8P
//  888       "Y888888  88888P'  88888P' 888    Y888 "Y888888   Y88P

//  Event triggers related to passage navigation

$(document).on(":passageend", function(ev) {
  if (State != null && State.active != null && State.active.variables != null && State.active.variables.AW != null) {
    State.active.variables.AW.author = "Probably Thaumx";
  }
  if (performance.navigation.type === 1 && setup.restartChecker) {
    Engine.restart();
  }
});

$(document).on(":passagedisplay", function () {
  $("[data-tooltip]").addClass("tooltip");
  $(".tooltip").each(function () {
    $(this).append('<span class="tooltip-content">' + $(this).attr("data-tooltip") + "</span>");
  });
});


/* Prepend the <canvas> to the incoming passage. */
prerender.prependCanvas = function (content) {
  if (aw.passage.tags.includes("canvas")) {
    /* Add the <canvas> to the incoming passage render buffer (pre-render). */
    $(content)
      .append("<canvas id=\"dispcanvas\"></canvas>");
  }
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
  const aftDisp = performance.now();
  const time = [0, 0, 0];
  time[0] = Math.floor(setup.perf.preRend - setup.perf.prehist);
  time[1] = Math.floor(setup.perf.postHist - setup.perf.preRend);
  time[2] = Math.floor(aftDisp - setup.perf.postHist);
  // let cont = "ᛔͲ: " + (Math.floor(aftDisp - setup.perf.prehist) + "." + (Math.round((aftDisp - setup.perf.prehist) * 10) % 10)) + "ms [S:" + time[0] + "|R:" + time[1] + "|D:" + time[2] + "]";
  const cont = "ᛔͲ: "
    + (Math.floor(aftDisp - setup.perf.prehist) + "." + (Math.round((aftDisp - setup.perf.prehist) * 10) % 10));
  setup.appendStr("#passage-transition-time", cont);
};

/* DEFUNCT! 
//fix NPC storage setup for long-term use
// stores NPCs waiting to be stored from chainref use
postdisplay.npcStore = function() {
  if (State.active.variables.AW.toStoreNPCs.length > 0) {
    setup.bulkStoreNPC(State.active.variables.AW.toStoreNPCs);
    State.active.variables.AW.toStoreNPCs = [];
  }
};
*/
