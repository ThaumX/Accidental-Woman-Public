/*
Sex Action buttons generation

Functions in this file:
. sex.actionButtonPrinter()
..    touch()
..    self()
..    kiss()
..    speak()
..    kink()
..    move()
..    position()
..    item()
..    other()
. sex.badAction()
*/

// namespace
if (setup.sex == null) {
  setup.sex = {} as setupSex;
}

setup.sex.dumbCount = 0;

// prepares the full text for action buttons w/tabs etc
setup.sex.actionButtonPrinter = function(): void {
  aw.con.info(`setup.sex.actionButtonPrinter Starting`); // TODO Remove eventually
  const t1 = performance.now();
  const ᛔ = State.active.variables;
  const sex = ↂ.sex;
  const hovKeys: string[] = [];
  setup.sex.printText = {
    touch: "",
    self: "",
    kiss: "",
    speak: "",
    kink: "",
    move: "",
    position: "",
    item: "",
    other: "",
    hover: "",
  };
  const a = setup.sex.printText;
  setup.sex.dumbCount = 0;
  function touch() {
    try {
      const keys = setup.sex.sexActList;
      let cunt = 0;
      let dick = 0;
      const txt = {
        head: "",
        chest: "",
        groin: "",
        legs: "",
        arm: "",
        other: "",
      };
      let besty; // that tsar bastard...lol
      for (let i = 0, c = keys.length; i < c; i++) {
        besty = "";
        if (aw.sexAct[keys[i]].tab === "touch") {
          cunt++;
          const x = aw.sexAct[keys[i]].allowed;
          if (x === 0) {
            dick++;
            besty = aw.sexAct[keys[i]].button;
            a.hover += aw.sexAct[keys[i]].hover;
            hovKeys.push(keys[i]);
          } else if (ᛔ.pref.showUnavailAction) {
            //<<hoverrevise fail${aw.sexAct[keys[i]].key}>><<endhoverrevise>>
            besty = `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexAct[keys[i]].label}</button>`;
            const txt = setup.sex.badAction(x);
            // <<insertion fail${aw.sexAct[keys[i]].key}>><<endinsertion>>
            a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
            hovKeys.push("fail-" + keys[i]);
          }
          const pp = setup.sex.partRef(aw.sexAct[keys[i]].parts[1]);
          switch (pp[0]) {
            case "chest":
            case "belly":
              txt.chest += besty;
              break;
            case "groin":
              txt.groin += besty;
              break;
            case "head":
              txt.head += besty;
              break;
            case "thigh":
            case "knees":
            case "kneeR":
            case "kneeL":
            case "calf":
            case "feet":
            case "footR":
            case "footL":
              txt.legs += besty;
              break;
            case "hands":
            case "handL":
            case "handR":
              txt.arm += besty;
              break;
            default:
              txt.other += besty;
          }
        }
      }
      if (txt.head !== "") {
        a.touch += `<fieldset id="abth"><legend>Head</legend>${txt.head}</fieldset>`;
      }
      if (txt.chest !== "" || txt.arm !== "") {
        a.touch += `<fieldset id="abtc"><legend>Upper Body</legend>${txt.chest}${txt.arm}</fieldset>`;
      }
      if (txt.groin !== "") {
        a.touch += `<fieldset id="abtg"><legend>Groin</legend>${txt.groin}</fieldset>`;
      }
      if (txt.legs !== "") {
        a.touch += `<fieldset id="abtl"><legend>Legs</legend>${txt.legs}</fieldset>`;
      }
      if (txt.other !== "") {
        a.touch += `<fieldset id="abto"><legend>Other</legend>${txt.other}</fieldset>`;
      }
      if (a.touch === "") {
        a.touch += `No touch actions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.touch += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint touch - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    // aw.con.info("touch");
  }
  function self() {
    try {
      const keys = setup.sex.sexActList;
      let cunt = 0;
      let dick = 0;
      for (let i = 0, c = keys.length; i < c; i++) {
        if (aw.sexAct[keys[i]].tab === "self") {
          cunt++;
          const x = aw.sexAct[keys[i]].allowed;
          if (x === 0) {
            dick++;
            a.self += aw.sexAct[keys[i]].button;
            a.hover += aw.sexAct[keys[i]].hover;
            hovKeys.push(keys[i]);
          } else if (ᛔ.pref.showUnavailAction) {
            // <<hoverrevise fail${aw.sexAct[keys[i]].key}>><<endhoverrevise>>
            a.self += `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexAct[keys[i]].label}</button>`;
            const txt = setup.sex.badAction(x);
            // <<insertion fail${aw.sexAct[keys[i]].key}>><<endinsertion>>
            a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
            hovKeys.push("fail-" + keys[i]);
          }
        }
      }
      if (a.self === "") {
        a.self += `No self actions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.self += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint self - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    // aw.con.info("self");
  }
  function kiss() {
    try {
      const keys = setup.sex.sexActList;
      let cunt = 0;
      let dick = 0;
      let jimbo;
      let oral = "";
      let kiss = "";
      let othr = "";
      for (let i = 0, c = keys.length; i < c; i++) {
        jimbo = "";
        if (aw.sexAct[keys[i]].tab === "kiss") {
          cunt++;
          const x = aw.sexAct[keys[i]].allowed;
          if (x === 0) {
            dick++;
            jimbo = aw.sexAct[keys[i]].button;
            a.hover += aw.sexAct[keys[i]].hover;
            hovKeys.push(keys[i]);
          } else if (ᛔ.pref.showUnavailAction) {
            // <<hoverrevise fail${aw.sexAct[keys[i]].key}>><<endhoverrevise>>
            jimbo = `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexAct[keys[i]].label}</button>`;
            const txt = setup.sex.badAction(x);
            // <<insertion fail${aw.sexAct[keys[i]].key}>><<endinsertion>>
            a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
            hovKeys.push("fail-" + keys[i]);
          }
          const pp = aw.sexAct[keys[i]].cat;
          switch (pp) {
            case "oral":
              oral += jimbo;
              break;
            case "kiss":
              kiss += jimbo;
              break;
            default:
              othr += jimbo;
              break;
          }
        }
      }
      if (oral !== "") {
        a.kiss += `<fieldset id="jimboOral"><legend>Oral Sex</legend>${oral}</fieldset>`;
      }
      if (kiss !== "") {
        a.kiss += `<fieldset id="jimboKiss"><legend>Kissing</legend>${kiss}</fieldset>`;
      }
      if (othr !== "") {
        a.kiss += `<fieldset id="jimboKiss"><legend>Other</legend>${othr}</fieldset>`;
      }
      if (a.kiss === "") {
        a.kiss += `No kiss actions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.kiss += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint kiss - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    // aw.con.info("kiss");
  }
  function speak() {
    try {
      const keys = setup.sex.sexActList;
      let cunt = 0;
      let dick = 0;
      for (let i = 0, c = keys.length; i < c; i++) {
        if (aw.sexAct[keys[i]].tab === "speak") {
          cunt++;
          const x = aw.sexAct[keys[i]].allowed;
          if (x === 0) {
            dick++;
            a.speak += aw.sexAct[keys[i]].button;
            a.hover += aw.sexAct[keys[i]].hover;
            hovKeys.push(keys[i]);
          } else if (ᛔ.pref.showUnavailAction) {
            // <<hoverrevise fail${aw.sexAct[keys[i]].key}>><<endhoverrevise>>
            a.speak += `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexAct[keys[i]].label}</button>`;
            const txt = setup.sex.badAction(x);
            // <<insertion fail${aw.sexAct[keys[i]].key}>><<endinsertion>>
            a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
            hovKeys.push("fail-" + keys[i]);
          }
        }
      }
      if (a.speak === "") {
        a.speak += `No speak actions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.speak += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint speak - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    // aw.con.info("speak");
  }
  function kink() {
    try {
      const keys = setup.sex.sexActList;
      let cunt = 0;
      let dick = 0;
      for (let i = 0, c = keys.length; i < c; i++) {
        if (aw.sexAct[keys[i]].tab === "kink") {
          cunt++;
          const x = aw.sexAct[keys[i]].allowed;
          if (x === 0) {
            dick++;
            a.kink += aw.sexAct[keys[i]].button;
            a.hover += aw.sexAct[keys[i]].hover;
            hovKeys.push(keys[i]);
          } else if (ᛔ.pref.showUnavailAction) {
            // <<hoverrevise fail${aw.sexAct[keys[i]].key}>><<endhoverrevise>>
            a.kink += `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexAct[keys[i]].label}</button>`;
            const txt = setup.sex.badAction(x);
            // <<insertion fail${aw.sexAct[keys[i]].key}>><<endinsertion>>
            a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
            hovKeys.push("fail-" + keys[i]);
          }
        }
      }
      if (a.kink === "") {
        a.kink += `No speak actions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.kink += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint kink - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    // aw.con.info("kink");
  }
  function move() {
    try {
      const keys = setup.sex.sexActList;
      let cunt = 0;
      let dick = 0;
      for (let i = 0, c = keys.length; i < c; i++) {
        if (aw.sexAct[keys[i]].tab === "move") {
          cunt++;
          const x = aw.sexAct[keys[i]].allowed;
          if (x === 0) {
            dick++;
            a.move += aw.sexAct[keys[i]].button;
            a.hover += aw.sexAct[keys[i]].hover;
            hovKeys.push(keys[i]);
          } else if (ᛔ.pref.showUnavailAction) {
            // <<hoverrevise fail${aw.sexAct[keys[i]].key}>><<endhoverrevise>>
            a.move += `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexAct[keys[i]].label}</button>`;
            const txt = setup.sex.badAction(x);
            // <<insertion fail${aw.sexAct[keys[i]].key}>><<endinsertion>>
            a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
            hovKeys.push("fail-" + keys[i]);
          }
        }
      }
      if (a.move === "") {
        a.move += `No speak actions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.move += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint move - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    // aw.con.info("move");
  }
  function position() {
    try {
      const keys = setup.sex.sexPosList;
      let cunt = 0;
      let dick = 0;
      let jimbo;
      let stand = "";
      let lay = "";
      let sit = "";
      let othr = "";
      for (let i = 0, c = keys.length; i < c; i++) {
        cunt++;
        const x = aw.sexPos[keys[i]].allowed;
        if (x === 0) {
          dick++;
          jimbo = aw.sexPos[keys[i]].button;
          if (jimbo === undefined) { // TODO Remove me
            aw.con.info(`Sex position button undefined but otherwise valid. ${keys[i]}`);
            jimbo = "";
          }
          a.hover += aw.sexPos[keys[i]].hover;
          hovKeys.push("pos-" + keys[i]);
        } else if (ᛔ.pref.showUnavailAction) {
          // <<hoverrevise fail${aw.sexPos[keys[i]].key}>><<endhoverrevise>>
          jimbo = `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexPos[keys[i]].label}</button>`;
          if (jimbo === undefined) { // TODO Remove me
            aw.con.info(`Sex position button undefined and not valid. ${keys[i]}`);
            jimbo = "";
          }
          const txt = setup.sex.badAction(x);
          // <<insertion fail${aw.sexPos[keys[i]].key}>><<endinsertion>>
          a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
          hovKeys.push("fail-" + keys[i]);
        }
        switch (aw.sexPos[keys[i]].basic) {
          case "stand":
            stand += jimbo;
            break;
          case "sit":
            sit += jimbo;
            break;
          case "lay":
            lay += jimbo;
            break;
          default:
            othr += jimbo;
            break;
        }
      }
      if (lay !== "") {
        a.position += `<fieldset id="sexposlay"><legend>Lying Positions</legend>${lay}</fieldset>`;
      }
      if (stand !== "") {
        a.position += `<fieldset id="sexposstand"><legend>Standing Positions</legend>${stand}</fieldset>`;
      }
      if (sit !== "") {
        a.position += `<fieldset id="sexpossit"><legend>Sitting Positions</legend>${sit}</fieldset>`;
      }
      if (othr !== "") {
        a.position += `<fieldset id="sexposstand"><legend>Other Positions</legend>${othr}</fieldset>`;
      }
      if (a.position === "") {
        a.position += `No new positions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.position += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint position - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    // aw.con.info("position");
  }
  const item = function() {
    a.item = `<button id="viewconsumables-button" onclick="window.SugarCube.Engine.link('dialog(Consumables,<<usableconsumablesonly>>)')">Consumables</button><span class="ship"><i>Sex Toys aren't implemented yet</i></span>`;
    a.hover += `<span id="viewconsumables-hover">View your available consumables and possibly use one.</span>`;
    setup.sex.dumbCount += 1;
    aw.con.info("item");
    hovKeys.push("viewconsumables");
  };
  function other() {
    try {
      const keys = setup.sex.sexActList;
      let cunt = 0;
      let dick = 0;
      for (let i = 0, c = keys.length; i < c; i++) {
        if (aw.sexAct[keys[i]].tab === "other") {
          cunt++;
          const x = aw.sexAct[keys[i]].allowed;
          if (x === 0) {
            dick++;
            a.other += aw.sexAct[keys[i]].button;
            a.hover += aw.sexAct[keys[i]].hover;
            hovKeys.push(keys[i]);
          } else if (ᛔ.pref.showUnavailAction) {
            // <<hoverrevise fail${aw.sexAct[keys[i]].key}>><<endhoverrevise>>
            a.other += `<button id="fail-${keys[i]}-button" type="button" class="disabled">${aw.sexAct[keys[i]].label}</button>`;
            const txt = setup.sex.badAction(x);
            // <<insertion fail${aw.sexAct[keys[i]].key}>><<endinsertion>>
            a.hover += `<span id="fail-${keys[i]}-hover">${txt}</span>`;
            hovKeys.push("fail-" + keys[i]);
          }
        }
      }
      if (a.other === "") {
        a.other += `No speak actions are currently possible. <span class="monospace">(0 of ${cunt})</span>`;
      } else if (!ᛔ.pref.showUnavailAction) {
        a.other += ` <span class="monospace">(${dick} of ${cunt})</span>`;
      }
    } catch (e) {
      aw.con.warn(`Failure in buttonprint other - ${e.name}: ${e.message}`);
    }
    setup.sex.dumbCount += 1;
    aw.con.info("other");
  }
  const tA1 = performance.now();
  try {
    touch();
  } catch (e) {
    aw.con.error("action button print, touch() failed", e);
  }
  const tB1 = performance.now();
  // aw.con.info(`Finished touch action button checking in ${Math.round(tB1 - tA1)}ms.`);
  const tA2 = performance.now();
  try {
    self();
  } catch (e) {
    aw.con.error("action button print, self() failed", e);
  }
  const tB2 = performance.now();
  // aw.con.info(`Finished self action button checking in ${Math.round(tB2 - tA2)}ms.`);
  const tA3 = performance.now();
  try {
    kiss();
  } catch (e) {
    aw.con.error("action button print, kiss() failed", e);
  }
  const tB3 = performance.now();
  // aw.con.info(`Finished kiss action button checking in ${Math.round(tB3 - tA3)}ms.`);
  const tA4 = performance.now();
  try {
    speak();
  } catch (e) {
    aw.con.error("action button print, speak() failed", e);
  }
  const tB4 = performance.now();
  // aw.con.info(`Finished speak action button checking in ${Math.round(tB4 - tA4)}ms.`);
  const tA5 = performance.now();
  try {
    kink();
  } catch (e) {
    aw.con.error("action button print, kink() failed", e);
  }
  const tB5 = performance.now();
  // aw.con.info(`Finished kink action button checking in ${Math.round(tB5 - tA5)}ms.`);
  const tA6 = performance.now();
  try {
    move();
  } catch (e) {
    aw.con.error("action button print, move() failed", e);
  }
  const tB6 = performance.now();
  // aw.con.info(`Finished move action button checking in ${Math.round(tB6 - tA6)}ms.`);
  const tA7 = performance.now();
  try {
    position();
  } catch (e) {
    aw.con.error("action button print, position() failed", e);
  }
  const tB7 = performance.now();
  // aw.con.info(`Finished position action button checking in ${Math.round(tB7 - tA7)}ms.`);
  const tA8 = performance.now();
  try {
    item();
  } catch (e) {
    aw.con.error("action button print, item() failed", e);
  }
  const tB8 = performance.now();
  // aw.con.info(`Finished item action button checking in ${Math.round(tB8 - tA8)}ms.`);
  const tA9 = performance.now();
  try {
    other();
  } catch (e) {
    aw.con.error("action button print, other() failed", e);
  }
  const tB9 = performance.now();
  // aw.con.info(`Finished other action button checking in ${Math.round(tB9 - tA9)}ms.`);
  const t2 = performance.now();
  aw.con.info(`setup.sex.actionButtonPrinter has finished! It took ${Math.round(t2 - t1)}ms total.`); // TODO Remove eventually
  setTimeout(() => setup.sex.hovererer(hovKeys), 100);
  if (ↂ.sex.turns < 1) {
    $("#sexSceneLoadingImage").addClass("hideIt");
    ↂ.toggleLoading = false;
  }
};

// returns reason text for the code from a disabled action
setup.sex.badAction = function(num: number): twee {
  const reason = [
    "This action shouldn't be disabled, but is for some reason. This is an error.",
    "Either the necessary parts are occupied, or you can't reach the NPC's part with your part.",
    "This action requires some anatomy that your target doesn't have.",
    "Something about your environment prevents this action.",
    "Your environment is missing something needed for this action.",
    "Your kink settings prevent this action from being used.",
    "You are not skilled enough in one or more skills to perform this action.",
    "You don't have the correct complement of people for this position.",
    "You happen to already be <b>IN</b> this position, and switching up partipants isn't possible at the moment.",
    "This action is only possible while having sex.",
    "To start sex in a particular position, you need to be in a compatible position first. For example, to start having sex standing up, you can't currently be laying on a bed.",
    "Your orifice is too dry to try this voluntarily... Try getting a little more aroused or use some lubricant first.",
  ];
  const hep = '<br><span class="import" style="font-size:70%;"><i>You can disable showing unavailable actions in the game settings menu.</i></span>';
  return reason[num] + hep;
};

setup.sex.hovererer = function(ids: string[]): void {
  function hoverz(triggerId: string, showId: string) {
    $(triggerId).hover(
      function() {
        $(showId).show();
      }, function() {
        $(showId).hide();
      },
    );
    $(showId).hide();
  }
  for (const id of ids) {
    const trig = `#${id}-button`;
    const show = `#${id}-hover`;
    hoverz(trig, show);
  }
};

// key-hover key-button pos-${key}-hover pos-${key}-button
