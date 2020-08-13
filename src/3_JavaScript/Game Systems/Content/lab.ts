
interface setupLab {
  convoLaunch: (tgt: string) => void;
  lilyDoorLogic: () => void;
  nightProgress: () => void;
  questCheck: () => void;
  people: () => void;
  work: (task: number, type: string) => string;
  getWire: (person: string) => void;
}

setup.lab = {} as setupLab;

setup.lab.convoLaunch = function(tgt: string): void {
  const name = {
    L: "Lily",
    K: "Kim",
    S: "Sara",
  };
  let psg = (State.active.variables.AW.startMale) ? "M" : "F";
  psg += tgt; // tgt is "L" "K" or "S" for lily kim and sara
  for (let i = 0; i < 9; i++) {
    if (ↂ.flag.main.active[i]) {
      psg += i;
      break;
    }
    if (i === 8) {
      setup.dialog(`Conversation with ${name[tgt]}`, "<h3>Conversation is not available at this time.</h3><p>Conversations will be available again once the machine repairs (main story) have entered the next phase.</p>");
      return;
    }
  }
  psg += "-Menu";
  setup.dialog(`Conversation with ${name[tgt]}`, `<<include [[${psg}]]>>`);
  return;
};

setup.lab.lilyDoorLogic = function (): void {
  // Note. Be sure to set ↂ.flag.main.rangBellToday to true as appropriate
  // if not changing passage, then use aw.go to reload "LilysPlace" passage
  // intended to open a dialog or forward to new passage as appropriate
  if (ↂ.flag.main.startText && !ↂ.flag.main.mainStart) {
    if (aw.timeArray[1] > 7 && aw.timeArray[1] <= 23) {
      // correct time
      setup.time.add(5);
      ↂ.flag.main.rangBellToday = true;
      ↂ.flag.main.mainStart = true;
      aw.S("flag");
      if (State.active.variables.AW.startMale) {
        aw.go("MSM-GetAccessKey");
      } else {
        aw.go("MSF-GetAccessKey");
      }
      return;
    } else {
      // wrong time
      setup.time.add(15);
      ↂ.flag.lilyTased += 1;
      ↂ.pc.status.health -= random(5);
      setup.status.record("health", -5, "Getting tasered stings a bit");
      aw.S();
      aw.go("LilysPlace");
      setup.dialog("Lily's Door", `<<include [[LilysDoorShockA]]>>`);
      setup.achieve.new("sparky");
      return;
    }
  }
  // generic door answers w/o a quest or mission
  if (aw.timeArray[1] > 6 && aw.timeArray[1] < 18 && aw.timeArray[2] < 6) {
    setup.time.add(5);
    aw.go("LilysPlace");
    setup.dialog("Lily's Door", `<p><<f y>>ou climb the steps to Lily's door and ring the doorbell. Then you wait. And wait. @@.mono;Maybe she didn't hear it?@@ You ring the doorbell again. Still there is no answer. Reluctantly, you give up and return to the street.</p>`);
  } else if ((aw.timeArray[2] < 6 && aw.timeArray[1] > 17 && aw.timeArray[1] < 22) || (aw.timeArray[2] > 5 && aw.timeArray[1] > 7 && aw.timeArray[1] < 23)) {
    if (random(1, 4) > 1) {
      setup.time.add(10);
      ↂ.flag.main.rangBellToday = true;
      ↂ.flag.buggedLily += 1;
      aw.S("flag");
      aw.go("LilysPlace");
      setup.dialog("Lily's Door", `<<include [[LilysDoorGoAway]]>>`);
      if (ↂ.flag.buggedLily > 7) {
        setup.achieve.new("jehovah");
      }
    } else {
      setup.time.add(5);
      aw.go("LilysPlace");
      setup.dialog("Lily's Door", `<p><<f y>>ou climb the steps to Lily's door and ring the doorbell. Then you wait. And wait. @@.mono;Maybe she didn't hear it?@@ You ring the doorbell again. Still there is no answer. Reluctantly, you give up and return to the street.</p>`);
    }
  } else {
    // taser time!
    if (ↂ.flag.lilyTased > 3 && random(1, 3) > 1) {
      setup.time.add(5);
      aw.go("LilysPlace");
      setup.dialog("Lily's Door", `<<include [[LilysDoorNoShock]]>>`);
    } else {
      setup.time.add(15);
      ↂ.flag.lilyTased += 1;
      ↂ.pc.status.health -= random(3, 5);
      setup.status.record("health", -3, "Getting tasered stings a bit");
      aw.S();
      aw.go("LilysPlace");
      setup.dialog("Lily's Door", `<<include [[LilysDoorShockB]]>>`);
    }
  }
  return;
};

setup.lab.nightProgress = function () {
  // adds to quest progress based on which is active and male/fem start
  if (ↂ.flag.main.active[0]) {
    if (State.active.variables.AW.startMale) {
      ↂ.flag.main.progress[0] += random(30, 40);
      if (ↂ.flag.main.progress[0] > 1000) {
        ↂ.flag.main.progress[0] = 1000;
      }
    } else {
      ↂ.flag.main.progress[0] += random(10, 18);
      if (ↂ.flag.main.progress[0] > 1000) {
        ↂ.flag.main.progress[0] = 1000;
      }
    }
  } else if(ↂ.flag.main.active[1]) {
    // flags reset
    if (ↂ.flag.main.contacts[0]) {
      ↂ.flag.main.contacts[0] = (random(1, 3) > 1) ? false : true;
    }
    if (ↂ.flag.main.contacts[1]) {
      ↂ.flag.main.contacts[1] = (random(1, 2) === 2) ? false : true;
    }
    if (ↂ.flag.main.contacts[2]) {
      ↂ.flag.main.contacts[2] = (random(1, 3) > 2) ? false : true;
    }
    // daily progress :3
    if (State.active.variables.AW.startMale) {
      ↂ.flag.main.progress[1] += random(20, 30);
      if (ↂ.flag.main.progress[1] > 1000) {
        ↂ.flag.main.progress[1] = 1000;
      }
    } else {
      ↂ.flag.main.progress[1] += random(0, 5);
      if (ↂ.flag.main.progress[1] > 1000) {
        ↂ.flag.main.progress[1] = 1000;
      }
    }
  }
  aw.S("flag");
  return;
};

setup.lab.questCheck = function() {
  if (ↂ.flag.main.active[0]) {
    if (ↂ.flag.main.progress[0] > 999) {
      ↂ.flag.main.active[0] = false;
      ↂ.flag.main.active[1] = true;
      const omni = {
        name: "Task 1 Complete",
        type: "single",
        output: "interact",
        duration: 600,
        icon: "none",
        run: `setup.interact.launch({passage: "MSM-TaskOneComplete", block: false, content: "none", npcid: "n101", title: "Text From Lily", size: 3});`,
      } as IntOmniData;
      setup.omni.new(omni);
    } else if (ↂ.flag.main.progress[0] < 1000 && !State.active.variables.AW.startMale && aw.time > ↂ.flag.main.deadline[0]) {
      setup.omni.new("questFail", {duration: 300});
    }
  } else if (ↂ.flag.main.active[1]) {
    if (ↂ.flag.main.progress[1] > 999) {
      ↂ.flag.main.active[1] = false;
      ↂ.flag.main.active[2] = true;
      const omni = {
        name: "Task 2 Complete",
        type: "single",
        output: "interact",
        duration: 600,
        icon: "none",
        run: `setup.interact.launch({passage: "MSM-TaskTwoComplete", block: false, content: "none", npcid: "n101", title: "Text From Lily", size: 3});`,
      } as IntOmniData;
      setup.omni.new(omni);
    } else if (ↂ.flag.main.progress[0] < 1000 && !State.active.variables.AW.startMale && aw.time > ↂ.flag.main.deadline[1]) {
      setup.omni.new("questFail", {duration: 300});
    }
  }
  aw.S("flag");
};


setup.lab.people = function() {
  State.temporary.labLily = 0;
  State.temporary.labSara = 0;
  State.temporary.labKim = 0;
  const hr = aw.timeArray[1];
  const day = aw.timeArray[2];
  // odds variables for chance out of 10
  let lily = 0;
  let sara = 0;
  let kim = 0;
  if (day < 6) { // weekday
    if (hr < 8) {
      lily = 0;
      sara = 0;
      kim = 0;
    } else if (hr < 18) {
      lily = 0;
      sara = 5;
      kim = 0;
    } else if (hr < 22) {
      lily = 5;
      sara = 1;
      kim = 2;
    } else {
      lily = 1;
      sara = 1;
      kim = 1;
    }
  } else { // weekend
    if (hr < 8) {
      lily = 0;
      sara = 0;
      kim = 0;
    } else if (hr < 12) {
      lily = 4;
      sara = 2;
      kim = 1;
    } else if (hr < 18) {
      lily = 8;
      sara = 8;
      kim = 3;
    } else if (hr < 22) {
      lily = 4;
      sara = 3;
      kim = 2;
    } else {
      lily = 1;
      sara = 1;
      kim = 1;
    }
  }
  if (ↂ.flag.main.active[1]) {
    sara -= 2;
    lily -= 1;
    kim -= 1;
  }
  // check odds
  if (random(1, 10) <= lily) {
    // lily is in
    State.temporary.labLily = random(1, 10);
  }
  if (random(1, 10) <= sara) {
    // sara is in
    State.temporary.labSara = random(1, 10);
  }
  if (random(1, 10) <= kim) {
    // kim is in
    State.temporary.labKim = (State.temporary.labLily > 0) ? random(1, 10) : random(2, 10);
  }
};


setup.lab.work = function(task: number, type: string): string {
  // perform work on task.
  let output = "ERROR!";
  if (task === 0) {
    // Organize and Inspect the Parts
    if (ↂ.flag.main.progress[0] > 999) {
      return `<<f y>>ou get ready to start working only to realize that the task is already complete!`;
    }
    setup.time.add(60);
    setup.SCXfunc();
    setup.SCfunc("PS", 11);
    setup.SCfunc("OG", 11);
    setup.SCfunc("CL", 11);
    setup.SCfunc(type, 13);
    let add = random(1, 3);
    for (let i = 1; i < 5; i++) {
      add += (State.active.variables.SCresult[i]) ? 3 : 0;
    }
    switch (type) {
      case "PS":
        output = `<center>[img[IMG-MS-Inspect]]<br>${State.active.variables.SCtext[1]} ${State.active.variables.SCtext[2]} ${State.active.variables.SCtext[3]} ${State.active.variables.SCtext[4]}</center><p>You spend your time working on inspecting the parts`;
        break;
      case "OG":
        output = `<center>[img[IMG-MS-Organize]]<br>${State.active.variables.SCtext[1]} ${State.active.variables.SCtext[2]} ${State.active.variables.SCtext[3]} ${State.active.variables.SCtext[4]}</center><p>You spend your time working on organizing the parts`;
        break;
      case "CL":
        output = `<center>[img[IMG-MS-Clean]]<br>${State.active.variables.SCtext[1]} ${State.active.variables.SCtext[2]} ${State.active.variables.SCtext[3]} ${State.active.variables.SCtext[4]}</center><p>You spend your time working on cleaning the parts`;
        break;
    }
    if (add < 9) {
      output += ", and though your work was slow, you managed to make a little progress.";
    } else if (add < 13) {
      output += ". You were able to get work done at an average pace, and made some progress.";
    } else {
      output += ". Your work was pretty efficient so you made good progress.";
    }
    if (State.active.variables.AW.startMale) {
      add = Math.round(add / 3);
    }
    const a = Math.floor(add / 10);
    const b = add % 10;
    output += ` Your work brought the task ${a}.${b}% closer to completion.</p>`;
    ↂ.flag.main.progress[0] += add;
    if (ↂ.flag.main.progress[0] > 999) {
      ↂ.flag.main.progress[0] = 1000;
      output += `<p>@@.good;Congratulations, you finished the task!@@ Now you just need to wait for Lily to check things over so everyone can start working on the next task.</p>`;
    }
  } else if (task === 1) {
    if (ↂ.flag.main.progress[1] > 999) {
      return `<<f y>>ou get ready to start working only to realize that the task is already complete!`;
    }
    output = `<p><<f y>>ou look at the prepared list of suppliers that you can purchase some of the required enameled wire from. There are a total of three contacts.`;
    if (ↂ.flag.main.contacts[0] && ↂ.flag.main.contacts[1] && ↂ.flag.main.contacts[2]) {
      output += ` It seems none of them have any wire on hand right now, so you won't be able to make any more purchase runs until tomorrow.</p><p>`;
    } else {
      output += "</p><p>"
    }
    output += `<b>Tyrone:</b> works for AppleGov in the Appletree government district. Can arrange for a good quantity of wire to "get lost" and wind up in your hands. <i>A rough forceful man, he isn't exactly opposed to making some credits on the side, but he may need some extra persuading to risk his job.</i> @@.note;Visited ${ↂ.flag.main.contacts[3]} times.@@<br>`;
    output += `<b>Max:</b> works for Magnitech in the industrial district. He can sell you some of the company's excess stock. <i>There isn't anything in it for him if he sells at the stock price, so I'm allowing for a 10% markup in the budget. If he wants more it's up to you to bargain with him.</i> @@.note;Visited ${ↂ.flag.main.contacts[4]} times.@@<br>`;
    output += `<b>Martin:</b> has a hobby shop in town that includes some electronics stuff. It focuses mostly on drones and RC stuff, but he should have at least some enameled wire on hand. <i>This is probably the most straight-forward source, but it'll probably be difficult to get all the wire we need from just him.</i> @@.import;Open 8am to 8pm.@@ @@.note;Visited ${ↂ.flag.main.contacts[5]} times.@@</p>`;
    output += `<p>There is also an envelope containing a quantity of <<info "credit chits" "guideCreditChit">> in various denominations, which will allow you to make the purchase as a somewhat-private transaction.</p><center>`;
    if (!ↂ.flag.main.contacts[0]) {
      // working button
      output += `<<button "Visit Tyrone">><<run setup.lab.getWire("Tyrone")>><</button>><<tab>>`
    } else {
      output += `<button class="disabled">Visit Tyrone</button><<tab>>`;
    }
    if (!ↂ.flag.main.contacts[1]) {
      // working button
      output += `<<button "Visit Max">><<run setup.lab.getWire("Max")>><</button>><<tab>>`
    } else {
      output += `<button class="disabled">Visit Max</button><<tab>>`;
    }
    if (!ↂ.flag.main.contacts[2] && aw.timeArray[1] > 7 && aw.timeArray[1] < 21) {
      // working button
      output += `<<button "Visit Martin">><<run setup.lab.getWire("Martin")>><</button>></center>`
    } else {
      output += `<button class="disabled">Visit Martin</button></center>`;
    }
  }
  aw.S("flag");
  aw.go("LilysLab");
  return output;
};


setup.lab.getWire = function(person: string) {
  aw.L();
  Dialog.close();
  let port = "none";
  let sb = "error";
  let topimg = "none";
  switch(person) {
    case "Tyrone":
      ↂ.flag.main.contacts[3] += 1;
      port = "IMG-QuestTyrone";
      topimg = "IMG-TempLocWarehouse";
      sb = "<center><h2>Tyrone</h2><h3>Appletree Central Storage Facility</h3>Appletree Government District</center>";
      State.temporary.count = ↂ.flag.main.contacts[3];
      break;
    case "Max":
      ↂ.flag.main.contacts[4] += 1;
      port = "IMG-QuestMax";
      topimg = "IMG-Location-IndustArea";
      sb = "<center><h2>Max</h2><h3>Magnitech Inc. Warehouse</h3>Appletree Industrial District</center>";
      State.temporary.count = ↂ.flag.main.contacts[4];
      break;
    case "Martin":
      ↂ.flag.main.contacts[5] += 1;
      port = "IMG-QuestMarvin";
      topimg = "IMG-TempLocHobbyshop";
      sb = "<center><h2>Martin</h2><h3>Knobs and Buttons Store</h3>West Downtown</center>";
      State.temporary.count = ↂ.flag.main.contacts[5];
      break;
  }
  const opts = {
    passage: `${person}Wire1`,
    sidebar: sb,
    image: port,
    topImage: topimg,
    title: "A Wire Purchase Run",
    allowSave: false,
    showTime: true,
    allowMenu: false,
    callback() {aw.go("LilysLab")},
  };
  setup.scenario.launch(opts);
};








