//  8888888          888                                     888
//    888            888                                     888
//    888            888                                     888
//    888   88888b.  888888 .d88b.  888d888 8888b.   .d8888b 888888
//    888   888 "88b 888   d8P  Y8b 888P"      "88b d88P"    888
//    888   888  888 888   88888888 888    .d888888 888      888
//    888   888  888 Y88b. Y8b.     888    888  888 Y88b.    Y88b.
//  8888888 888  888  "Y888 "Y8888  888    "Y888888  "Y8888P  "Y888


/*
  A secondary display window for twine content to exist exterior to
  main twine passage navigation.

  Window sizes: 1: 750x500, 2: 750x750(d), 3: 1000x750, 4: 1500x800
*/


interface IsetupInteract {
  launch: (content: IntInteractLaunchOptions) => void;
  status: IsetupInteractStatus;
  minimizer: () => void;
  delay: number;
  resize: (size: number) => void;
  closer: (onclose: () => void) => void;
  exit: () => void;
  refresh: () => void;
  replace: (content: string) => void;
  passage: (passage: string) => void;
  append: (content: string) => void;
  empty: () => void;
  kill: () => void;
  isOpen: () => boolean;
  clicks: (onclose: () => void, block: boolean) => void;
  gameSave: () => string;
  gameLoad: (json: string) => boolean;
  restore: () => void;
}

interface IsetupInteractStatus { // stored info about interact system for game saves
  open: boolean; // if an interact is "open"
  minimized: boolean; // if interact is minimized
  npc: string; // if interact is associated with NPC, npcid
  passage: string; // if passage is associated with interact content, passage title
  size: number; // size setting vals 1-4 from small to large
  title: string; // label for interact window title bar
  block: boolean; // if contents behind interact should be hidden.
  image: string; // if there is an image to place in separate image window
  content: string | false; // twee content of the interact window, if any
  onclose: null | (() => void); // function to execute when closing interact window.
  queue: "none" | IntInteractLaunchOptions; // a temporary store to hold a waiting interact item
  temp: { // temporary variable store to use with interact instead of State.temporary[foobar]
    [propName: string]: any;
  };
}

interface IntInteractLaunchOptions {
  passage?: string;
  block: boolean;
  content?: string;
  npcid?: string;
  image?: string;
  title?: string;
  size?: number;
  callback?: () => void;
  onclose?: () => void;
}


if (setup.interact == null) {
  setup.interact = {} as IsetupInteract;
}

setup.interact.delay = 50;

// launches the interact window from zero with included options.
setup.interact.launch = function(
  {passage, content, npcid, image, title, callback, onclose, size, block = false}: IntInteractLaunchOptions = {block},
  ): void {
  if (setup.interact.isOpen()) {
    aw.con.warn("Attempted to open interact window with one already open! Using queue workaround.");
    setup.interact.status.queue = {
      passage,
      content,
      npcid,
      image,
      title,
      callback,
      onclose,
      size,
      block,
    };
    return;
  }
  if (size == null) {
    size = 2;
  }
  // basic html content
  let output = `<div id="interactCunt" class="size${size} zoomInUp animated"><div id="interactTitle"><img data-passage="IMG_InteractAW" id="interactAW">`;
  if (title != null) {
    output += title; // adds unique interact window title
    setup.interact.status.title = title;
  } else {
    output += "Interaction";
    setup.interact.status.title = "none";
  }
  // add minimize and close buttons - blocked has no minimize
  output += (block) ? "" : "<img data-passage='IMG_InteractMinMax' id='interactMinMax'>";
  output += "<img data-passage='IMG_InteractClose' id='interactClose'></div>";
  // main content box - includes provided content
  output += `<div id="interactWindow">`;
  output += (content != null && content !== "none") ? content : "";
  if (passage != null && Story.has(passage)) {
    setup.interact.status.passage = passage;
    output += `<<include [[${passage}]]>>`;
  }
  if (State.active.variables.screenReader) {
    output += `<br><a id="interactClose">Close Interact Window</a>`;
  }
  output += "</div></div><div id='interactMini' class='minified'>";
  output += (title != null) ? title.toUpperCase() : "INTERACTION";
  output += "</div>";
  // adds image display if provided, npc portrait or image passage
  if (npcid != null && npcid !== "none" && (image == null || image === "none") && aw.npc[npcid] != null) {
    const portie = aw.npc[npcid].main.picture;
    output += `<div id="interactImageBox" class="zoomInUp animated npcbox">${portie}</div>`;
    setup.interact.status.npc = npcid;
    setTimeout(() => setup.dragon("interactImageBox"), 60);
    //setTimeout(() => setup.porn.gifrefresh(State.temporary.targ, State.temporary.sorc), 80);
  } else if (image != null && image !== "none") {
    output += `<div id="interactImageBox" class="zoomInUp animated"><img data-passage="${image}"></div>`;
    setup.interact.status.npc = "none";
    setTimeout(() => setup.dragon("interactImageBox"), 60);
  }
  // adds clickblocker if block is true
  output += (block) ? '<div id="interactBackground"></div>' : "";
  // ensures onclose is a funky function
  if (onclose === null || onclose === undefined) {
    onclose = function() {
      State.temporary.interactBullshit = true;
    };
  }

  // sets up status data
  setup.interact.status.minimized = false;
  setup.interact.status.open = true;
  setup.interact.status.npc = (npcid != null) ? npcid : "none";
  //setup.interact.status.npc = (npcid != null) ? npcid : "n101"; // FOR TESTING!!
  setup.interact.status.image = (image != null) ? image : "none";
  setup.interact.status.block = block;
  setup.interact.status.onclose = onclose;
  setup.interact.status.content = (content != null) ? content : false;

  // adds to page after wikifier
  aw.replace("#interactContainer", output);
  // sets up button functions after delay for DOM
  setTimeout(function() {
    setup.dragon("interactCunt", "interactTitle");
  }, minDomActionDelay);
  if (callback != null) {
    setTimeout(() => callback(), setup.interact.delay);
  }
  setTimeout(() => setup.interact.clicks(onclose as () => void, block), (minDomActionDelay * 2));
  setup.escape.sit = "interact";
};

setup.interact.clicks = function(onclose, block) {
  if (!block) {
    $("#interactMinMax").click(function() {setup.interact.minimizer(); });
    $("#interactMini").click(function() { setup.interact.minimizer(); });
  }
  $("#interactClose").click(function() {setup.interact.closer(onclose); });
};

// closes the interact window
setup.interact.closer = function(onClose: () => void): void {
  aw.replace("#interactContainer", "");
  setup.refresh();
  onClose();
  if (typeof setup.interact.status.onclose === "function" && State.temporary.interactBullshit) {
    setup.interact.status.onclose();
  }
  setup.interact.status.onclose = null;
  setup.interact.status.passage = "none";
  setup.interact.status.npc = "none";
  setup.interact.status.open = false;
  setup.interact.status.temp = {};
  if (setup.interact.status.queue !== "none") { // open new interact with queued one, and delete queue
    setTimeout(() => setup.interact.launch(setup.interact.status.queue as IntInteractLaunchOptions), 2000);
    setTimeout(() => setup.interact.status.queue = "none", 3000);
  }
  setup.escape.sit = "none";
};

// closes the interact window using a click event trigger so that any attached
// on-close functions will be executed as intended.
setup.interact.exit = function(): void {
  $("#interactClose").trigger("click");
};

setup.interact.status = {
  open: false,
  minimized: false,
  size: 0,
  passage: "none",
  npc: "none",
  title: "none",
  block: false,
  image: "none",
  content: false, // stores loaded content in case non-passage
  queue: "none",
  temp: {},
} as IsetupInteractStatus; // no point in writing out an empty function onclose;

// toggles the interact window between minimized or not
setup.interact.minimizer = function(): void {
  if (setup.interact.status.minimized) {
    // maximize it
    setup.interact.status.minimized = false;
    $("#interactCunt").removeClass("minified");
    $("#interactImageBox").removeClass("minified");
    $("#interactMini").addClass("minified");
  } else {
    setup.interact.status.minimized = true;
    $("#interactCunt").addClass("minified");
    $("#interactImageBox").addClass("minified");
    $("#interactMini").removeClass("minified");
  }
};

// resize the interact window to a new size.
setup.interact.resize = function(size: number) {
  if (isNaN(size)) {
    aw.con.warn(`Invalid size value given to setup.interact.resize: "${size}". Using default.`);
    size = 2;
  }
  if (size !== setup.interact.status.size) {// only resize if the new size is actually different :P
    const oldClass = "size" + setup.interact.status.size;
    const newClass = "size" + size;
    $("#interactCunt").removeClass(oldClass);
    $("#interactCunt").addClass(newClass);
    setup.interact.status.size = size;
  }
};

// refreshes the window based on content found in status object
setup.interact.refresh = function(): void {
  if (!setup.interact.isOpen()) {
    aw.con.info("Interact.refresh called, but interact is not open. attempting .restore()...");
    setup.interact.restore();
    return;
  }
  if (setup.interact.status.passage === "none" && !setup.interact.status.content) {
    // no content to refresh with.
    aw.con.warn("attempted to refresh the window, but no content for the window is available!");
  } else if (setup.interact.status.passage !== "none") {
    setup.interact.passage(setup.interact.status.passage);
    $("#interactWindow").animate({ scrollTop: 0 }, "fast");
  } else if (setup.interact.status.content) {
    setup.interact.replace(setup.interact.status.content);
    $("#interactWindow").animate({ scrollTop: 0 }, "fast");
  }
};

// empty the interaction window and place this content
setup.interact.replace = function(content: string): void {
  setup.interact.status.content = content;
  aw.replace("#interactWindow", content);
  $("#interactWindow").animate({ scrollTop: 0 }, "fast");
};

// appends twee to the end of the window
setup.interact.append = function(content: string): void {
  setup.interact.status.content += content;
  aw.append("#interactWindow", content);
};

// deletes contents of interact window
setup.interact.empty = function(): void {
  setup.interact.status.content = false;
  const content = "";
  aw.replace("#interactWindow", content);
};

// loads new passage into interact window
setup.interact.passage = function(passage: string): void {
  if (Story.has(passage)) {
    setup.interact.status.passage = passage;
    const cunt = `<<include [[${passage}]]>>`;
    aw.replace("#interactWindow", cunt);
    $("#interactWindow").animate({ scrollTop: 0 }, "fast");
  } else {
    aw.con.warn(`Attempted to load passage "${passage}" to interact window but passage doesn't exist.`);
  }
};

// kills the interact window w/o running any on-close functions
setup.interact.kill = function(): void {
  setup.refresh();
  aw.replace("#interactContainer", "");
  setup.interact.status.passage = "none";
  setup.interact.status.npc = "none";
  setup.interact.status.open = false;
  setup.escape.sit = "none";
};

// checks if an interact window is open. returns true if it is.
setup.interact.isOpen = function(): boolean {
  let $test;
  try {
    $test = document.getElementById("interactCunt");
  } catch (e) {
    $test = null;
  }
  if (!$test) {
    return false;
  } else {
    return true;
  }
};

// saves the interact.status object so it persists in a save - including onclose() function
setup.interact.gameSave = function(): string {
  function replacer(key, value) {
    // converting functions to strings
    if (typeof value == null) {
      return false;
    } else if (typeof value === "function" || (key === "onclose" && value != null)) {
      aw.con.info(this[key].toString());
      return this[key].toString();
    }
    return value;
  }
  const output = JSON.stringify(setup.interact.status, replacer);
  return output;
};

// restores interact.status from a save.
setup.interact.gameLoad = function(json: string): boolean {
  function parse(data: string) {
    let result: boolean = true;
    setup.interact.status = {} as IsetupInteractStatus;
    try {
      setup.interact.status = JSON.parse(data, (key, value) => {
        if ((key === "onclose" || key === "test") && typeof value === "function") {
          const val = "(" + value + ")";
          // tslint:disable-next-line:no-eval
          try {
            return eval(val);
          } catch (e) {
            aw.con.warn(`error recovering saved interact function. ${e.name}: ${e.message}.`);
            return;
          }
        }
        return value;
      });
    } catch (e) {
      aw.con.warn(`Restoring Interact System JSON failed with error ${e.name}: ${e.message}! `);
      result = false;
    }
    return result;
  }
  if (!parse(json)) {
    // tslint:disable-next-line:max-line-length
    UI.alert("There was an error loading your save. The Interact System status data was not successfully loaded. This should only matter if you saved the game with an interact window open.");
    return false;
  }
  // time to open an interact window if necessary
  setup.interact.restore();
  return true;
};

// checks interact.status to see if window should be open, and opens it if so.
setup.interact.restore = function(): void {
  const ᚥ = setup.interact.status;
  if (ᚥ.open) {
    const cock = {
      block: ᚥ.block,
      onclose: ᚥ.onclose,
      size: ᚥ.size,
    } as IntInteractLaunchOptions;
    if (ᚥ.content) {
      cock.content = ᚥ.content;
    }
    if (ᚥ.npc !== "none") {
      cock.npcid = ᚥ.npc;
    }
    if (ᚥ.image !== "none") {
      cock.image = ᚥ.image;
    }
    if (ᚥ.title !== "none") {
      cock.title = ᚥ.title;
    }
    setup.interact.launch(cock);
  }
};


Macro.add("interact", {
  tags: [null],
  handler() {
    const fucker = {} as IntInteractLaunchOptions;
    if (this.payload[0].args.length > 0) {
      for (let i = 0, c = this.payload[0].args.length; i < c; i++) {
        if (typeof this.payload[0].args[i] === "string" && setup.testes.test(this.payload[0].args[i])) {
          fucker.npcid = this.payload[0].args[i];
        } else if (typeof this.payload[0].args[i] === "string" && this.payload[0].args[i].slice(0, 3) === "IMG") {
          fucker.image = this.payload[0].args[i];
        } else if (typeof this.payload[0].args[i] === "string") {
          fucker.title = this.payload[0].args[i];
        } else if (typeof this.payload[0].args[i] === "boolean") {
          fucker.block = this.payload[0].args[i];
        } else if (typeof this.payload[0].args[i] === "number") {
          fucker.size = this.payload[0].args[i];
        }
      }
    }
    fucker.content = this.payload[0].contents;
    setup.interact.launch(fucker);
  },
});

Macro.add("intgo", {
  handler() {
    if (this.args.length !== 1) {
      return this.error(`Incorrect number of arguments given to intgo macro - passage name only (${this.args.length} arguments given).`);
    }
    if (typeof this.args[0] === "string" && Story.has(this.args[0])) {
      setup.interact.passage(this.args[0]);
    } else {
      return this.error(`Invalid or malformed passage name to intgo macro (${this.args[0]}).`);
    }
  },
});

Macro.add("intclose", {
  handler() {
    setup.interact.exit();
  },
});

Macro.add("intreplace", {
  tags: [null],
  handler() {
    // note - no null arg catch because null content is used to "empty" the window.
    setup.interact.replace(this.payload[0].contents);
  },
});

Macro.add("intrefresh", {
  handler() {
    setup.interact.refresh();
  },
});
