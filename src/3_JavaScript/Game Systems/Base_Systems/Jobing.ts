/*
/*      ██╗ ██████╗ ██████╗ ██╗███╗   ██╗ ██████╗
/*      ██║██╔═══██╗██╔══██╗██║████╗  ██║██╔════╝
/*      ██║██║   ██║██████╔╝██║██╔██╗ ██║██║  ███╗
/* ██   ██║██║   ██║██╔══██╗██║██║╚██╗██║██║   ██║
/* ╚█████╔╝╚██████╔╝██████╔╝██║██║ ╚████║╚██████╔╝
/*  ╚════╝  ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝
*/

interface setupJob {
  goto: () => void ;
  startAt: () => void;
  arrival: () => void;
  startDay: () => void;
  jobTasks: () => void;
  focusEffect: (focus: string, effort: number) => [number, number, string];
  taskOutcome: (result: any, tCount: number) => string;
  taskLabel: (result: any) => void;
  endJob: () => void;
  quitJob: () => void;
  promote: () => void;
  fire: () => void;
  warning: () => void;
  workCalendar: () => string;
  institute: () => boolean;
  time: {
    until: () => number | "none";
    late: () => boolean;
    today: () => boolean;
    tomorrow: () => boolean;
  };
  jobChoose: (restricted?: number) => string;
  apply: (code: string) => void;
  eventTester: (name: string) => void;
  eventLister: () => void;
}

interface JobEvent {
  random: boolean;
  odds: [number, number];
  condition: (job: string, rank: string) => boolean;
  passage: string;
  image: string;
  content: string;
  title: string;
}

/*
aw.job = {};
setup.job = {};
class Job {
  constructor({} = {}){
  }
}
*/

setup.job = {
  // function to start work
  goto(): void {
    aw.L();
    if (!ↂ.flag.jobManualShown) {
      ↂ.flag.jobManualShown = true;
      setup.dialog("Job manual", "Since you probably ignored the manual section just before character creation, here you go once again, the quick manual for the Jobbing system:<br><center>[img[IMGinstructions9]]<br><<button 'Got it, let me play already!'>><<run Dialog.close();>><</button>></center>");
      aw.S();
    }
    const ᛔ = State.active.variables;
    setup.eventAllowed = false;
    ↂ.job.choose.effort = 2;
    ↂ.job.choose.focus = "none";
    ↂ.job.moti += 1;
    if (ↂ.job.moti > 27) {
      ↂ.job.moti = 1;
    }
    aw.job = {};
    ↂ.map.lastLoc = [ↂ.map.loc[0], ↂ.map.loc[1], (ↂ.map.loc[2] == null) ? "main" : ↂ.map.loc[2]];
    if (ↂ.job.loc == null) {
      // let's do nothing.
    } else {
      ↂ.map.loc = [ↂ.job.loc[0], ↂ.job.loc[1], ↂ.job.loc[2]];
    }
    aw.S();
    let t = setup.map.time("current", "work");
    t += random(8, 12); // extra time for traveling to worksite, walking, parking, gate scanning, etc.
    setup.time.add(t);
    aw.con.info(`Travel time to work is ${t} minutes.`);
    setup.escape.sit = "jobbing";
    aw.go("JobberCon");
  },
  startAt() {
    aw.L();
    const ᛔ = State.active.variables;
    setup.eventAllowed = false;
    ↂ.job.choose.effort = 2;
    ↂ.job.choose.focus = "none";
    ↂ.job.moti += 1;
    if (ↂ.job.moti > 27) {
      ↂ.job.moti = 1;
    }
    aw.job = {};
    aw.S();
    const t = random(3, 5); // extra time
    setup.time.add(t);
    aw.go("JobberCon");
  },
  // handles arriving at work, generating arrival text and basic info
  arrival(): void {
    const ᛔ = State.active.variables;
    const t = [ↂ.sched.workTime[ᛔ.date[0]][0], ↂ.sched.workTime[ᛔ.date[0]][1]] as [number, number];
    const x = setup.time.after(t);
    let texto;
    if (x) {
      let bb;
      let cc;
      let tt;
      let rr;
      switch (ↂ.job.code) {
        case "IS":
          bb = "underground to the service tunnels that are";
          cc = ".";
          break;
        case "IB":
          bb = "to the almost deliberately drab building that is";
          cc = ".";
          break;
        case "IT":
          tt = ["hillside lab facility", "primary lab complex", "underground lab complex", "satellite lab facility", "research building cluster"];
          rr = random(0, 4);
          bb = `to the ${tt[rr]} that is`;
          cc = " assignment for the today.";
          break;
        case "MP":
          bb = "to the private house that is";
          cc = " for today.";
          break;
        default:
        bb = "to";
        cc = ".";
      }
      texto = `@@.head3;Y@@ou arrive at work and make your way ${bb} your designated work location${cc}`;
      ↂ.job.stats.daysworked++;
      ↂ.job.stats.daysworkedTotal++;
    } else if (setup.time.dif(ᛔ.time, t) > 120) {
      ↂ.job.missed.times += 1;
      ↂ.job.missed.recent += 1;
      ↂ.job.late.times += 1;
      ↂ.job.late.recent += 1;
      ↂ.job.stats.performance -= random(20, 25);
      if (ↂ.job.stats.performance < -50) {
        ↂ.job.stats.performance = -50;
      }
      ↂ.job.stats.progress -= random(15, 25);
      if (ↂ.job.stats.progress < 0) {
        ↂ.job.stats.progress = 0;
      }
      ↂ.job.stats.boss -= random(10, 15);
      if (ↂ.job.stats.boss < -50) {
        ↂ.job.stats.boss = -50;
      }
      ↂ.job.stats.coworker -= random(10, 15);
      if (ↂ.job.stats.coworker < -50) {
        ↂ.job.stats.coworker = -50;
      }
      ↂ.job.stats.subord -= random(10, 15);
      if (ↂ.job.stats.subord < -50) {
        ↂ.job.stats.subord = -50;
      }
      switch (ↂ.job.code) {
        case "IS" || "IB" || "IT":
          // tslint:disable-next-line:max-line-length
          texto = "<<timed 50ms>><<replace '#jobContent'>><div>@@.head3;Y@@ou arrive to work very late, <span class='peepbad'>and your boss is pretty angry</span>. Even your coworkers look <span class='peepbad'>upset with you</span>. Rather than getting chewed out though, your boss simply sends you home for the day. Looks like this week's paycheck will be even smaller than you expected.</div><div><center><<button 'Go Home'>><<run setup.job.endJob()>><</button>></center></div><</replace>><</timed>>";
          break;
        case "MP":
          // tslint:disable-next-line:max-line-length
          texto = "<<timed 50ms>><<replace '#jobContent'>><div>@@.head3;Y@@ou arrive to work very late, <span class='peepbad'>and the client is pretty disappointed.</span>. He is calling to the company HQ telling them about your failure and send you away. Shortly after you are getting the call from HQ, they seem to be quite <span class='peepbad'>upset with you too</span>. Looks like this week's paycheck will be even smaller than you expected.</div><div><center><<button 'Go Home'>><<run setup.job.endJob()>><</button>></center></div><</replace>><</timed>>";
          break;
        default:
          // tslint:disable-next-line:max-line-length
          texto = "<<timed 50ms>><<replace '#jobContent'>><div>@@.head3;Y@@ou arrive to work very late, <span class='peepbad'>and your boss is pretty angry</span>. Even your coworkers look <span class='peepbad'>upset with you</span>. Rather than getting chewed out though, your boss simply sends you home for the day. Looks like this week's paycheck will be even smaller than you expected.</div><div><center><<button 'Go Home'>><<run setup.job.endJob()>><</button>></center></div><</replace>><</timed>>";
      }
    } else if (ↂ.job.late.called === 1) { // called in, but was already late when called.
      ↂ.job.late.times += 1;
      ↂ.job.late.recent += 1;
      ↂ.job.stats.performance -= random(5, 10);
      if (ↂ.job.stats.performance < -50) {
        ↂ.job.stats.performance = -50;
      }
      ↂ.job.stats.progress -= random(5, 10);
      if (ↂ.job.stats.progress < 0) {
        ↂ.job.stats.progress = 0;
      }
      ↂ.job.stats.boss -= random(5, 10);
      if (ↂ.job.stats.boss < -50) {
        ↂ.job.stats.boss = -50;
      }
      switch (ↂ.job.code) {
        case "IS" || "IB" || "IT":
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, and you notice a few looks your way, but overall it doesn't seem too bad. It's probably a good thing you called, because you notice your boss <span class='peepbad'>isn't very happy</span>, and it probably would have been worse otherwise.";
          break;
        case "MP":
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, but overall it doesn't seem too bad. It's probably a good thing you called, because you notice the client <span class='peepbad'>isn't very happy</span>, and it probably would have been worse otherwise.";
          break;
        default:
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, and you notice a few looks your way, but overall it doesn't seem too bad. It's probably a good thing you called, because you notice your boss <span class='peepbad'>isn't very happy</span>, and it probably would have been worse otherwise.";
      }
    } else if (ↂ.job.late.called === 2) { // called in, called before being late.
      ↂ.job.late.times += 1;
      ↂ.job.late.recent += 1;
      ↂ.job.stats.performance -= random(2, 5);
      if (ↂ.job.stats.performance < -50) {
        ↂ.job.stats.performance = -50;
      }
      ↂ.job.stats.progress -= random(0, 3);
      if (ↂ.job.stats.progress < 0) {
        ↂ.job.stats.progress = 0;
      }
      ↂ.job.stats.boss -= random(0, 3);
      if (ↂ.job.stats.boss < -50) {
        ↂ.job.stats.boss = -50;
      }
      switch (ↂ.job.code) {
        case "IS" || "IB" || "IT":
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, but because you called your boss before you were supposed to be at work, nobody seems to be particularly upset. You're able to start your workday pretty normally, albeit later than usual.";
          break;
        case "MP":
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to the client late, but because you called him before you were supposed to be at work, he doesn't seems to be particularly upset. You're able to start your workday pretty normally, albeit later than usual.";
          break;
        default:
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, but because you called your boss before you were supposed to be at work, nobody seems to be particularly upset. You're able to start your workday pretty normally, albeit later than usual.";
      }
    } else {
      ↂ.job.late.times += 1;
      ↂ.job.late.recent += 1;
      ↂ.job.stats.performance -= random(15, 20);
      if (ↂ.job.stats.performance < -50) {
        ↂ.job.stats.performance = -50;
      }
      ↂ.job.stats.progress -= random(10, 15);
      if (ↂ.job.stats.progress < 0) {
        ↂ.job.stats.progress = 0;
      }
      ↂ.job.stats.boss -= random(5, 10);
      if (ↂ.job.stats.boss < -50) {
        ↂ.job.stats.boss = -50;
      }
      switch (ↂ.job.code) {
        case "IS" || "IB" || "IT":
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, <span class='peepbad'>a fact that doesn't go unnoticed by your boss</span>. After a thankfully brief lecture about the importance of showing up to work on time, you get to work.";
          break;
        case "MP":
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, <span class='peepbad'>a fact that doesn't go unnoticed by your client</span>. After a thankfully brief lecture about the importance of showing up to work on time, you get to work.";
          break;
        default:
          // tslint:disable-next-line:max-line-length
          texto = "@@.head3;Y@@ou arrive to work late, <span class='peepbad'>a fact that doesn't go unnoticed by your boss</span>. After a thankfully brief lecture about the importance of showing up to work on time, you get to work.";
      }
    }
    // CLOTHING QUALITY CHECK GOES HERE.
    aw.S();
    return texto;
  },
  // executed at the start of the work passage gets things rolling
  startDay(): void {
    const ᛔ = State.active.variables;
    const t = [ↂ.sched.workTime[ᛔ.date[0]][2], ↂ.sched.workTime[ᛔ.date[0]][3]] as [number, number];
    const wkm = setup.time.dif(ᛔ.time, t);
    try {
      const mins = setup.time.until(t[0], t[1]);
      aw.con.info(`Advancing time to ${t[0]}hr ${t[1]}min, scheduled end of work time. (${mins} min)`);
      setup.time.add(mins);
    } catch (e) {
      aw.con.warn(`Problem setting new time value!!! ${e.name}: ${e.message}.`);
    }
    ↂ.job.att.weekDays += 1;
    ↂ.job.att.showed[ᛔ.date[0]] = true;
    ↂ.job.att.weekHours += Math.round(wkm / 60);

    // Adding some random content that fits the rank
    const valid: Content[] = [];
    for (let i = 0, c = aw.jobData[ↂ.job.code].jobContent.length; i < c; i++) {
      // tslint:disable-next-line:max-line-length
      if (aw.jobData[ↂ.job.code].jobContent[i].rank.includes("any") || aw.jobData[ↂ.job.code].jobContent[i].rank.includes(ↂ.job.stats.rank)) {
        valid.push(aw.jobData[ↂ.job.code].jobContent[i]);
      }
    }
    let contentOutput = "";
    if (valid.length === 0) {
      contentOutput = "";
    }
    let ind = 0;
    if (valid.length > 1) {
      const min = 0;
      const max = valid.length - 1;
      ind = random(min, max);
    }
    contentOutput += "<div>";
    if (valid[ind].image !== "none") {
      contentOutput += `<center><img data-passage="${valid[ind].image}" style="border-radius:8px;"></center>`;
    }
    if (valid[ind].passage !== "none") {
      contentOutput += `<<include [[${valid[ind].passage}]]>>`;
    }
    if (valid[ind].content !== "none") {
      contentOutput += valid[ind].content;
    }
    // tslint:disable-next-line:max-line-length
    contentOutput += `<center><<button "Continue">><<replace "#jobContent">><</replace>><<run setup.job.jobTasks()>><</button>></center></div>`;
    aw.replace("#jobContent", contentOutput);
    aw.tempJobContent = contentOutput;
    const ᚥ = aw.jobData[ↂ.job.code];
    // clothes check
    let override = false;
    const clothesCheck = ᚥ.clothesRequired();
    if (!clothesCheck[0]) {
      override = true;
      const argument = {
        allowMenu: false,
        allowSave: false,
        block: false,
        passage: clothesCheck[1],
        image:  clothesCheck[2],
        content: clothesCheck[3],
        title: clothesCheck[4],
      };
      setTimeout(() => setup.scenario.launch(argument), 100);
    }
    if (!override) {
      // Adding some random event that fits the rank
      let event: JobEvent;
      let run = false;
      if (ᚥ.events != null) {
        for (let i = 0, c = ᚥ.events.length; i < c; i++) {
          if (!ᚥ.events[i].random || random(0, ᚥ.events[i].odds[1]) < ᚥ.events[i].odds[0]) {
            const stringifiedRank = String("rank" + ↂ.job.stats.rank);
            if (ᚥ.events[i].condition()) {
              event = ᚥ.events[i];
              run = true;
              break;
            }
          }
        }
        if (setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          run = false;
        }
        if (run) {
          const argument = {
            allowMenu: false,
            allowSave: false,
            block: false,
            passage: event!.passage,
            image: event!.image,
            content: event!.content,
            title: event!.title,
          };
          setTimeout(() => setup.scenario.launch(argument), 100);
        } else { // no event today, let's shove some npc to talk with
          const NpcChance = random(0, 100) + (ↂ.pc.trait.friendly * 5) + ↂ.pc.status.atr + (ↂ.pc.trait.approachable * 10);
          let list = [] as string[];
          for (let index = 0; index < setup.npc.ready.length; index++) {
            if (setup.npc.ready[index].length < 6) {
              list.push(setup.npc.ready[index]);
            }
          }
          const npc = either(list);
          aw.con.info(`NPC chance is ${NpcChance}`);
          ↂ.flag.npcInducedInteractions.intType = "work";
          ↂ.flag.npcInducedInteractions.intNPC = npc;
          if (NpcChance > 85) {
            const args = {
              passage: "NPCinteraction-StrangerSayHi",
              block: true,
              content: `<<status 1>><<set $intNPC = '${npc}'>><<set $intType = "work">><<status 0>>`,
              image: aw.npc[npc].main.picture,
              title: aw.npc[npc].main.name,
              size: 3,
              callback() {
                setup.time.add(random(12, 22));
              },
              onclose() {
                // setup.refresh(); GODDAMN IT BESTY!
              },
            };
            aw.con.info(`NPC selected for interaction is ${npc}`);
            setup.interact.launch(args);
          }
        }
      }
    }
  },
  // actually gets the character to work
  jobTasks(): void {
    const ᛔ = State.active.variables;
    const job = ↂ.job;
    const ratio = job.rules.taskratio;
    // tslint:disable-next-line:max-line-length
    const tasks = [job.rules.taskA, job.rules.taskB, job.rules.taskC, job.rules.taskD, job.rules.taskE, job.rules.taskF];
    const tCount = job.rules.tasks;
    const effort = job.choose.effort;
    let focus = job.choose.focus;
    if (effort === 1) {
      focus = "none";
    }
    const ef = setup.job.focusEffect(focus, effort); // array[mod value,focus success,output txt]
    const mod = ef[0];
    const txt = ef[2];
    const chosen: number[] = [];
    const result = {
      max: 0,
      amt: 0,
      stress: 0,
      hap: 0,
      suck: [] as boolean[],
      past: 0,
      desc: [] as string[],
      output: "@@.head3;T@@oday's tasks included ",
      perf: 0,
    };
    // randomly determine tasks to be tested
    for (let i = 0; i < tCount; i++) {
      const y = randomDist(ratio);
      chosen.push(y);
      result.max += Math.round(tasks[y].effect * 2); // adds to # for perfect success
      const w = tasks[y].desc.length - 1;
      const z = random(0, w);
      result.desc.push(tasks[y].desc[z]); // adds random job task description
    }
    setup.job.taskLabel(result);
    // actually perform skill checks
    for (let i = 0; i < tCount; i++) {
      const task = tasks[chosen[i]];
      setup.SCXfunc();
      setup.SCfunc(task.type, task.DC, mod);
      if (aw.chad.work) {
        State.active.variables.SCresult[1] = true;
      }
      result.stress += task.stress;
      result.hap += task.hap;
      if (ᛔ.SCresult[1]) {
        result.amt += 2 * task.effect;
        result.suck.push(true);
        result.output += `<span class="jobpass">${result.desc[i]}</span>`;
        result.perf += 1;
        result.past += 1;
      } else if (task.retry) {
        // can retry, but more stressful
        result.stress += task.stress;
        result.hap += Math.round(task.hap / 2);
        const w = task.DC - 1; // easier second time
        setup.SCfunc(task.type, w, mod);
        if (ᛔ.SCresult[2]) {
          result.amt += 1 * task.effect;
          result.suck.push(true);
          result.past += 1;
          result.output += result.desc[i];
        } else {
          result.suck.push(false);
          result.output += `<span class="jobfail">${result.desc[i]}</span>`;
          result.stress += task.stress;
          result.perf -= 1;
        }
      } else {
        // no retry, failure, though less overall stress than double fail
        result.suck.push(false);
        result.output += `<span class="jobfail">${result.desc[i]}</span>`;
        result.stress += task.stress;
        result.perf -= 1;
      }
      if (i === (tCount - 2)) {
        result.output += ", and ";
      } else if (i === (tCount - 1)) {
        result.output += ".";
      } else {
        result.output += ", ";
      }
    }
    aw.S();
    if (effort === 3) {
      result.stress = Math.round(result.stress * (random(115, 120) / 100));
    } else if (effort === 1) {
      result.stress = Math.round(result.stress * (random(90, 99) / 100));
    }
    if (focus === "working" || focus === "skill") {
      result.stress = Math.round(result.stress * (random(105, 115) / 100));
    }
    setup.status.stress(result.stress, "Stress from working");
    setup.status.happy(result.hap, "The grind of being employed");
    const txt2 = setup.job.taskOutcome(result, tCount);
    let junk;
    if (job.stats.promote) {
      junk = "<<replace '#jobContent'>><</replace>><<run setup.job.promote()>>";
    } else if (job.stats.fired) {
      junk = "<<replace '#jobContent'>><</replace>><<run setup.job.fire()>>";
    } else if (job.stats.fireDanger) {
      junk = "<<replace '#jobContent'>><</replace>><<run setup.job.warning()>>";
    } else {
      junk = "<<run setup.job.endJob()>>";
    }
    const cod = `<div><p>${txt}</p><p>${result.output}</p></div><div><p>${txt2}</p><center><<button "Continue">>${junk}<</button>></center></div>`;
    aw.replace("#jobContent", cod);
  },
  // function determines effect of work choices, focus and task
  focusEffect(focus: string, effort: number): [number, number, string] {
    let x;
    let txt;
    let focSuc;
    let eft;
    const opr = random(0, 2);
    switch (effort) {
      case 3:
        eft = [
          "@@.head3;Y@@ou spent the day working hard, putting in extra effort to get things done.",
          "@@.head3;Y@@ou were working pretty intensely today, so the before you knew it the day was over.",
          "@@.head3;T@@oday you buckled down at work, making the most of your time to get things done.",
        ];
        break;
      case 2:
        eft = [
          "@@.head3;Y@@ou spent the day like many corporate drones, working to complete your assigned tasks until finally being allowed to go home.",
          "@@.head3;T@@oday you walked the thin line of performance; working hard enough that nobody could complain, but not doing so well that it invites any extra work.",
          "@@.head3;R@@esigned to another day of work, you met your responsibilities but not much else.",
        ];
        break;
      case 1:
        eft = [
          "@@.head3;T@@oday you just couldn't bring yourself to care much about getting things done, leading to a day of shortcuts and procrastination.",
          "@@.head3;Y@@ou really didn't feel like working today, and it showed in your effort. Everybody has those days though, right?",
          "@@.head3;T@@oday you played the game of employee hide and seek where you spend almost as much effort avoiding work as it would take to just do it in the first place.",
        ];
        break;
      default:
        eft = ["[error no work effort!]", "[error no work effort!]", "[error no work effort!]"];
        break;
    }
    switch (focus) {
      case "none":
        x = 0;
        txt = `${eft[opr]} You didn't really have much of a focus for the day, just handling things as they arose.`;
        focSuc = true;
        break;
      case "work":
        x = 1;
        txt = `${eft[opr]} You decided to focus on getting your work done properly, avoiding distractions when possible.`;
        focSuc = (random(0, 2) > 0) ? true : false;
        if (focSuc) {
          x = 2;
          txt += " You were able to do pretty well because of it.";
        } else {
          txt += " Unfortunately it didn't really work out.";
        }
        break;
      case "skill":
        x = random(0, 1);
        txt = `${eft[opr]} You focused on improving your work skills today, hoping to get better at your job.`;
        focSuc = (random(0, 2) > 0) ? true : false;
        if (focSuc) {
          txt += " You were able to put in a decent effort toward getting better.";
          const a = ["prob", "org", "com", "fin", "clean"];
          const dc = 8 + effort;
          for (let i = 0; i < ↂ.job.rules.tasks; i++) {
            const ar = random(0, 4);
            setup.skillGain(a[ar], dc);
          }
        } else {
          txt += " Your attempts don't really pan out today though.";
        }
        break;
      case "boss":
        x = (random(0, 2) - 1);
        switch (ↂ.job.code) {
          case "IS" || "IB" || "IT":
            txt = `${eft[opr]} You paid extra attention to your boss today, trying to cast yourself in a positive light without blatantly kissing ass.`;
          case "MP":
            txt = `${eft[opr]} You paid extra attention to the client today, trying to cast yourself in a positive light without blatantly kissing ass.`;
          default:
            txt = `${eft[opr]} You paid extra attention to your boss today, trying to cast yourself in a positive light without blatantly kissing ass.`;
        }
        focSuc = (effort - random(1, 2)) > 0 ? true : false;
        if (focSuc) {
          ↂ.job.stats.boss += (effort - 1);
          if (ↂ.job.stats.boss > 50) {
            ↂ.job.stats.boss = 50;
          }
          ↂ.job.stats.progress += Math.max(0, (random(1, 4) - 3));
          ↂ.job.stats.performance += random(0, 1);
          switch (ↂ.job.code) {
            case "IS" || "IB" || "IT":
              txt += " You managed to pull it off, and you think you improved your boss' perception of you.";
            case "MP":
              txt += " You managed to pull it off, and you think you improved your client' perception of you.";
            default:
            txt += " You managed to pull it off, and you think you improved your boss' perception of you.";
          }
        } else {
          if (effort === 1) {
            txt += " Because you didn't put in any serious effort into actually looking good, you ended up looking like an obvious brown-noser.";
            ↂ.job.stats.coworker -= random(1, 2);
            ↂ.job.stats.boss -= random(1, 2);
          } else {
            txt += " You tried, but there simply weren't any opportunities to pull it off without looking like a douche.";
          }
        }
        break;
      case "coworker":
        x = Math.max(-1, (effort - (3 + random(0, 1))));
        switch (ↂ.job.code) {
          case "IS" || "IB" || "IT":
            txt = `${eft[opr]} You spent a lot of time today socializing with your coworkers, hoping to give a better impression.`;
          case "MP":
            txt = `${eft[opr]} You spent a lot of time today constantly sending job reports the HQ, hoping to give a better impression.`;
          default:
            txt = `${eft[opr]} You spent a lot of time today socializing with your coworkers, hoping to give a better impression.`;
        }
        focSuc = (random(0, 4) > 0) ? true : false;
        if (focSuc) {
          ↂ.job.stats.coworker += effort;
          txt += "You weren't exactly productive today, but you do think your coworkers like you a little more.";
        } else {
          txt += "Things just didn't go according to plan though.";
        }
        break;
      case "subord":
        x = random(0, 1);
        txt = `${eft[opr]} You decided to spend extra time mentoring your subordinates today, and generally being a good boss.`;
        focSuc = (random(0, 1) + x) > 0 ? true : false;
        break;
      default:
        x = 0;
        txt = `${eft[opr]} [ERROR: somehow focus had an invalid value of "${focus}".]`;
        focSuc = false;
        break;
    }
    aw.S();
    let result = effort - 2;
    result += x;
    result -= (focSuc) ? 0 : 1;
    return [result, focSuc, txt];
  },
  // determines outcome of your tasks/choices
  taskOutcome(result: any, tCount: number): string {
    const job = ↂ.job;
    const per = Math.round((result.amt / result.max) * 10);
    switch (per) {
      case 10:
        job.stats.boss += random(1, 2);
        job.stats.coworker += random(1, 2);
        job.stats.subord += random(1, 2);
        result.output += " Overall you did fantastic today, and been said that they'd never seen anyone job so good.";
        break;
      case 9:
      case 8:
        job.stats.boss += 1;
        job.stats.coworker += 1;
        job.stats.subord += 1;
        result.output += " Overall you did well today, even if you made a few minor mistakes.";
        break;
      case 7:
      case 6:
        if (job.choose.effort !== 1) {
          job.stats.boss += random(0, 1);
          job.stats.coworker += random(0, 1);
          job.stats.subord += random(0, 1);
          result.output += " Overall you did okay today, though it wasn't enough to impress anyone.";
        } else {
          result.output += " Overall your performance today was mediocre. It certainly wasn't good enough to impress anyone.";
        }
        break;
      case 5:
      case 4:
        if (job.choose.effort !== 3) {
          job.stats.boss -= 1;
          job.stats.coworker -= 1;
          job.stats.subord -= 1;
        }
        result.output += " While you could charitably call today's performance mediocre, you get the impression that you may want to improve for the sake of your job security.";
        break;
      case 3:
      case 2:
        job.stats.boss -= random(3, 6);
        job.stats.coworker -= random(3, 6);
        job.stats.subord -= random(3, 6);
        result.output += " Overall your performance today was abysmal, and it's pretty obvious you won't have this job much longer unless you improve.";
        break;
      case 1:
      case 0:
        job.stats.boss -= 8;
        job.stats.coworker -= 8;
        job.stats.subord -= 8;
        result.output += " You managed to piss just about everyone off today with your horrific work today. A few repeat performances and you'll be out on your ass for sure.";
        break;
    }
    job.stats.performance += result.perf;
    job.stats.performance += Math.round((result.max / (tCount * 2)) * per);
    if (job.stats.boss > 50) {
      job.stats.performance += 1;
      job.stats.boss = 50;
    } else if (job.stats.boss < -50) {
      job.stats.performance -= 10;
      job.stats.boss = -50;
    }
    if (job.stats.coworker > 50) {
      job.stats.performance += 1;
      job.stats.coworker = 50;
    } else if (job.stats.coworker < -50) {
      job.stats.performance -= 8;
      job.stats.coworker = -50;
    }
    if (job.stats.subord > 50) {
      job.stats.performance += 1;
      job.stats.subord = 50;
    } else if (job.stats.subord < -50) {
      job.stats.performance -= 5;
      job.stats.subord = -50;
    }
    if (job.stats.performance > 50) {
      job.stats.progress += 1;
      job.stats.performance = 50;
    } else if (job.stats.performance < -50) {
      job.stats.performance = -50;
    }
    if (job.stats.performance >= 40) {
      job.stats.progress += random(1, 2);
      const stringifiedRank = String("rank" + ↂ.job.stats.rank);
      job.stats.progress += aw.jobData[ↂ.job.code][stringifiedRank].promotionBonus;
      job.stats.fireDanger = false;
    } else if (job.stats.performance >= 25) {
      job.stats.progress += 1;
      const stringifiedRank = String("rank" + ↂ.job.stats.rank);
      job.stats.progress += aw.jobData[ↂ.job.code][stringifiedRank].promotionBonus;
      job.stats.fireDanger = false;
    } else if (job.stats.performance >= 10) {
      const stringifiedRank = String("rank" + ↂ.job.stats.rank);
      job.stats.progress += aw.jobData[ↂ.job.code][stringifiedRank].promotionBonus;
      job.stats.progress += random(0, 1);
      job.stats.fireDanger = false;
    } else if (job.stats.performance <= -40) {
      job.stats.progress -= random(4, 8);
      if ((job.stats.fireDanger && job.stats.progress <= 0) || random(0, 3) === 0) {
        job.stats.fired = true;
      }
      job.stats.fireDanger = true;
    } else if (job.stats.performance <= -25) {
      job.stats.progress -= random(2, 4);
      if (job.stats.fireDanger && job.stats.progress <= 0) {
        job.stats.fired = true;
      }
      job.stats.fireDanger = true;
    } else if (job.stats.performance <= -10) {
      job.stats.progress -= random(1, 2);
      job.stats.fireDanger = false;
    }
    if (job.stats.progress < 0) {
      job.stats.progress = 0;
    } else if (job.stats.progress >= 100) {
      job.stats.progress = 100;
      job.stats.promote = true;
    }
    let star = " ";
    let dick = "acceptably";
    let fish = "didn't change much";
    if (per > 7) {
      star = " [img[Gold Star!|IMG-StarCircle]]";
      dick = "<span class='good'>well</span>";
      fish = "<span class='peepgood'>seem to have improved</span>";
    } else if (per < 6) {
      star = " [img[Stinky!|IMG-FishCircle]]";
      dick = "<span class='bad'>below expectations</span>";
      fish = "<span class='peepbad'>got worse</span>";
    }
    let st = "";
    switch (ↂ.job.code) {
      case "IS" || "IB" || "IT":
        st = `<b>Today's Performance:</b>${star}<br>Today you performed ${dick}, with a GLaDyS performance ranking of ${per}0 percent. You were able to complete ${result.past} of ${tCount} tasks assigned to you successfully. Your fellow employee's opinions of you ${fish} today.`;
      case "MP":
        st = `<b>Today's Performance:</b>${star}<br>Today you performed ${dick}, with a performance ranking of ${per}0 percent. You were able to complete ${result.past} of ${tCount} tasks assigned to you successfully. Your fellow employee's opinions of you ${fish} today.`;
      default:
        st = `<b>Today's Performance:</b>${star}<br>Today you performed ${dick}, with a performance ranking of ${per}0 percent. You were able to complete ${result.past} of ${tCount} tasks assigned to you successfully. Your fellow employee's opinions of you ${fish} today.`;
    }
    if (ↂ.flag.milkTank > 3999) {
      // add new cryo canisters if needed
      if (State.active.variables.items.has("NipJoy Manual Breast Pump", "Dainty-Tits Electric Breast Pump", "Happy Teats Breast Pump", "Pump-O-Tron Breast Pump", "Nipplex Industrial Breast Pump", "Nilfex Magic Milker Breast Pump")) {
        const cans = Math.floor(ↂ.flag.milkTank / 4000); // 4000ml = 4 liter milk cans
        ↂ.flag.milkTank = ↂ.flag.milkTank % 4000; // remainder goes to milk store
        if (cans > 0) { // add tanks to inventory if 1 or more
          setup.consumables.add("breastMilkA", cans);
          st += ` While you were at work, you managed to fill ${cans} cryo-canisters with breast milk.`;
        }
        aw.S();
      }
    }
    return st;
  },
  // turns task & results into useful text in result.desc
  taskLabel(result: any): void {
    const l = result.desc.length;
    for (let i = 1; i < l; i++) {
      let c = 0;
      for (let j = i - 1; j >= 0; j--) {
        if (result.desc[i] === result.desc[j]) {
          c++;
        }
      }
      if (c === 1) {
        result.desc[i] = "more " + result.desc[i];
      } else if (c >= 2) {
        result.desc[i] = "even more " + result.desc[i];
      }
    }
  },
  // exits job screen
  endJob(): void {
    setup.escape.sit = "none";
    setup.eventAllowed = true;
    if (ↂ.job.loc !== null) {
      ↂ.map.loc = ↂ.job.loc;
    } else {
      ↂ.map.loc = ["world", "institute", false];
    }
    setup.map.nav("world", "appletree");
  },
  quitJob(): void {
    setup.escape.sit = "none";
    setup.eventAllowed = true;
    if (ↂ.job.loc !== null) {
      ↂ.map.loc = ↂ.job.loc;
    } else {
      ↂ.map.loc = ["world", "institute", false];
    }
    setup.fire();
    setup.map.nav(ↂ.map.loc[0], ↂ.map.loc[1]);
    setup.dialog("Quitting Your Job", "<<include [[JobberQuit]]>>");
  },
  // special text for getting promoted w/buttons
  promote(): void {
    let cock = "";
    switch (ↂ.job.code) {
      case "IS" || "IB" || "IT":
        cock = "pulls you aside";
      case "MP":
        cock = "calls you";
      default:
        cock = "pulls you aside";
    }
    // tslint:disable-next-line:max-line-length
    const output = `<div><span class='quest' style='font-size:1.2rem;'>Congratulations!</span><br><p>@@.head3;Y@@our boss ${cock} at the end of the day to give you some good news; it seems your hard work is being rewarded with a promotion! The question is, do you want to accept? If you turn down the offer it may be a while before you get another one, but it'd probably be better than taking a job you aren't prepared for...</p></div><div><center><<button 'Turn it down'>><<set ↂ.job.stats.progress -= random(20,40)>><<status 0>><<run setup.job.endJob()>><</button>><<if ↂ.job.stats.rank >= 4>><span class='disabled'><<button 'Accept!'>><</button>></span><<else>><<button 'Accept!'>><<run setup.promote(false, false)>><<status 0>><<run setup.job.endJob()>><</button>><</if>></center></div>`;
    aw.replace("#jobContent", output);
  },
  // special text for getting fired
  fire(): void {
    let cock = "";
    switch (ↂ.job.code) {
      case "IS" || "IB" || "IT":
        cock = "pulls you aside";
      case "MP":
        cock = "calls you";
      default:
        cock = "pulls you aside";
    }
    // tslint:disable-next-line:max-line-length
    const output = `<div><span class='quest' style='font-size:1.2rem;'>Bad News!</span><br><p>@@.head3;Y@@our boss ${cock} at the end of the day to fire your ass. You gather your things and are escorted off the premises.</p></div><div><center><<button 'I Fail'>><<run setup.fire()>><<status 0>><<run setup.job.endJob()>><</button>></center></div>`;
    aw.replace("#jobContent", output);
  },
  // special text for recieving a warning
  warning(): void {
    let cock = "";
    switch (ↂ.job.code) {
      case "IS" || "IB" || "IT":
        cock = "pulls you aside";
      case "MP":
        cock = "calls you";
      default:
        cock = "pulls you aside";
    }
    // tslint:disable-next-line:max-line-length
    const output = `<div><span class='quest' style='font-size:1.2rem;'>Bad News!</span><br><p>@@.head3;Y@@our boss ${cock} at the end of the day to give you a warning about your performance at work lately. If you don't get your act together, you might not have a job much longer.</p></div><div><center><<button 'I Fail'>><<run setup.job.endJob()>><</button>></center></div>`;
    aw.replace("#jobContent", output);
  },
  // returns twee to print out a work calendar display
  workCalendar(): string {
    const ᛔ = State.active.variables;
    const wD = ↂ.sched.workDays;
    const vaca = ↂ.sched.vacation;
    const sick = ↂ.sched.sick;
    const wT = ↂ.sched.workTime;
    const c = wD.length;
    const wH = ↂ.job.rules.worktime;
    const days = [0, "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    let day = (ᛔ.time[2]) ? ᛔ.date[0] + 1 : ᛔ.date[0]; // The real question is, will people expect it to work different?
    if (day > 7) {
      day = 1;
    }
    let msg = "<div class='schedRowCont'>";
    for (let i = 1; i < c; i++) {
      if (i === day) {
        msg += `<div class='schedRowBox' style='background-color:#444;'><span style='color:#FFF;font-size:22px;'>${days[i]}</span><br>`;
      } else {
        msg += `<div class='schedRowBox'><span style='color:${aw.theme.head};font-size:22px;'>${days[i]}</span><br>`;
      }
      if (!wD[i]) {
        msg += "<span style='color:#BBB;'>Day Off</span>";
      } else if (vaca[i]) {
        msg += "Vacation Scheduled";
      } else if (sick[i]) {
        msg += "Sick Day";
      } else {
        const minA = (wT[i][1] < 10) ? "0" + wT[i][1] : wT[i][1];
        const minB = (wT[i][3] < 10) ? "0" + wT[i][3] : wT[i][3];
        if (i >= day) {
          msg += `${wT[i][0]}:${minA} to ${wT[i][2]}:${minB}<br>Hours: ${wH[i]}<br><<link "request off">><<dialog "Phone Conversation: Boss">><<set _tDay = ${i}>><<include [[jobberCallBossRequest]]>><</dialog>><</link>>`;
        } else {
          msg += `${wT[i][0]}:${minA} to ${wT[i][2]}:${minB}<br>Hours: ${wH[i]}`;
        }
      }
      msg += "</div>";
    }
    msg += "</div>";
    return msg;
  },
  // returns true if player is an employee at the institute
  institute(): boolean {
    const ᛔ = ↂ.job;
    if (ᛔ.code === "IS" || ᛔ.code === "IB" || ᛔ.code === "IT") {
      return true;
    } else {
      return false;
    }
  },
  time: {
    // returns time until work that day, negative if work started already. [mins]
    until(): number|"none" {
      if (setup.job.time.today()) {
        const d = aw.timeArray[2];
        const workTime = setup.time.toVal([ↂ.sched.workTime[d][0], ↂ.sched.workTime[d][1], false]);
        return workTime - aw.tVal;
      } else if (setup.job.time.tomorrow()) {
        const d = (aw.timeArray[2] === 7) ? 1 : aw.timeArray[2] + 1;
        const workTime = setup.time.toVal([ↂ.sched.workTime[d][0], ↂ.sched.workTime[d][1], false]);
        return ((workTime - aw.tVal) + 1440);
      } else {
        return "none";
      }
    },
    // returns true if late for work
    late(): boolean {
      const d = aw.timeArray[2];
      if (setup.job.time.today()) {
        const workTime = setup.time.toVal([ↂ.sched.workTime[d][0], ↂ.sched.workTime[d][1], false]);
        const mins = workTime - aw.tVal;
        if (mins <= 0) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    // returns true if there is work STILL scheduled today
    today(): boolean {
      const d = aw.timeArray[2];
      const workTime = setup.time.toVal([ↂ.sched.workTime[d][0], ↂ.sched.workTime[d][1], false]) + 120;
      if (ↂ.sched.workDays[d] && !ↂ.job.att.showed[d] && aw.tVal < workTime && !ↂ.sched.vacation[d] && !ↂ.sched.sick[d] && (!ↂ.flag.prologueSunday || ↂ.flag.prologueSunday && d !== 7)) {
        return true;
      }
      return false;
    },
    // returns true if there is work tomorrow
    tomorrow(): boolean {
      const d = (aw.timeArray[2] === 7) ? 1 : aw.timeArray[2] + 1;
      if (ↂ.sched.workDays[d] && !ↂ.sched.vacation[d] && !ↂ.sched.sick[d]) {
        return true;
      }
      return false;
    },
  },
  jobChoose(restricted: number = 0): string {
    // get list of possible jobs, limit to Institute if restricted.
    const list = Object.keys(aw.jobData);
    if (restricted === 1) {
      list.delete("IT"); // if fem prologue did not pass science test
    }
    // remove jobs already worked at (quit or fired, can't be rehired)
    for (const job of Object.keys(ↂ.flag.jobsWorked)) {
      if (ↂ.flag.jobsWorked[job]) {
        list.delete(job);
        aw.con.info(`jobChoose - deleted job ${job} from potential list because already worked there.`);
      }
    }
    // time to start generating the output.
    let jobs = "<h2>Available Jobs:</h2>";
    let scrp = "<<timed 50ms>><<scri" +
      "pt>>";
    State.temporary.jobInfoObj = {};
    for (const code of list) {
      const jb = aw.jobData[code];
      let info = "";
      if (State.active.variables.screenReader) {
        jobs += `<div id="${code}"><b>${jb.employer}:</b> <<link "VIEW">><<replace "#infoCunt">><<= _jobInfoObj.${code}>><</replace>><</link>></div>`;
      } else {
        jobs += `<div id="${code}"><b>${jb.employer}:</b> ${jb.title} - ${jb.rulesWorktime[0]}hrs</div>`;
      }
      info += `<div style="background-color:rgba(255,255,255,0.8);padding-bottom:30px;padding-top:30px;color:#000;border-radius:8px;border: 2px solid #bbb;"><img data-passage="${jb.img}"><br>`;
      info += "<p style='border:1px dashed #222;font-size:1.2rem;text-align:justify;padding:5px;margin:5px 15px;'>" + jb.desc + "</p>";
      info += `<b>Employer:</b> ${jb.employer}<br><b>Job Series:</b> ${jb.title}<br><b>Promotion Potential:</b> ${jb.ranks}<br>`;
      let days = "";
      for (let i = 1; i < 8; i++) {
        if (jb.schedWorkDays[i]) {
          days += " " + setup.time.dayName(i);
        }
      }
      info += `<b>Work Days:</b> ${days}<br><b>Shift Length:</b> ${jb.schedWorkDays[0]} hours<br><b>Weekly Hours:</b> ${jb.schedWorkTime[0]} hours per week<br>`;
      const wkly = jb.rank0.pay[0] * jb.schedWorkTime[0];
      info += `<b>Minimum Starting Wage:</b> ${jb.rank0.pay[0]}₢ per hour | ${wkly}₢ per week<br><b>Required Skills:</b> ${jb.skills}<br><br>`;
      info += `<<button "APPLY FOR THIS JOB">><<run setup.job.apply("${code}")>><</button>><br></div>`;
      State.temporary.jobInfoObj[code] = info; // store output in temporary variable to avoid "' issues.
      // time to format jQuery JS for this job
      scrp += `$("#${code}").click(function(){
        aw.replace("#infoCunt",State.temporary.jobInfoObj.${code});
      });
      `;
    }
    if (restricted) {
      const tot = Object.keys(aw.jobData).length;
      jobs += `<div>Showing ${list.length} of ${tot} possible careers.</div>`;
    }
    scrp += "<</scr" +
      "ipt>><</timed>>";
    // time to combine outputs
    const exitButton = (!restricted) ? `<div style="position:absolute;bottom:10px;right:10px;height:40px;width:100px;"><<button "CANCEL">><<replace "#awUIcontainer">><</replace>><</button>>` : "";
    const out = `<div id="jobChooseCunt"><div id="listCunt">${jobs}</div><div id="infoCunt"><div><h2>Select A Job</h2><b>Caution:</b> To comply with the <<info "guideJDA" "Jobs Distribution Act">> of 2027, the R.A.P.E.S. Job Application System automatically terminates your current employment upon successfully applying to a new position.</div></div>${exitButton}${scrp}</div>`;
    return out;
  },
  apply(code: string): void {
    aw.L();
    $("#jobChooseCunt").empty();
    const job = aw.jobData[code];
    setup.SCXfunc();
    let rank = 0;
    rank += (setup.SCfunc(job.apply[0], job.apply[1])) ? 1 : 0;
    rank += (setup.SCfunc(job.apply[2], job.apply[3])) ? 1 : 0;
    if (code === "PF") { // special fertility requirements corresponding to progenerate
      if (ↂ.pc.fert.fertility < 3 || ↂ.pc.fert.iud) {
        rank = 0;
      } else if (ↂ.pc.fert.fertility < 5 && rank === 2) {
        rank = 1;
      } else if (ↂ.pc.fert.fertility > 6 && rank < 2) {
        rank = 2;
      } else if (ↂ.pc.fert.fertility > 4 && rank < 2) {
        rank += 1;
      }
    }
    setup.setNewJob(code, rank);
    ↂ.flag.jobsWorked[code] = true;
    aw.S();
    let msg = `Congratulations! You have been hired at rank ${rank}!`;
    if (job.acceptance != null && job.acceptance[rank] != null) {
      msg = job.acceptance[rank];
    }
    const out = `<div style="position:absolute;top:50px;left:400px;right:400px;padding:25px;text-align:justify;background-color:rgba(255,255,255,0.8);border-radius:8px;color:#000;font-size:1.2rem;"><center><img data-passage="${job.img}"></center><br><p>${msg}</p><br><center><<button "CONTINUE">><<replace "#awUIcontainer">><</replace>><</button>><br><br><<print $SCtext[1]>><br><<print $SCtext[2]>></center></div>`;
    aw.replace("#jobChooseCunt", out);
  },
  eventTester(name: string): void {
    const jobs = Object.keys(aw.jobData);
    for (let i = 0, c = jobs.length; i < c; i++) {
      if (aw.jobData[jobs[i]].events != null) {
        for (const event of aw.jobData[jobs[i]].events) {
          if (event.title === name) {
            const argument = {
              allowMenu: false,
              allowSave: false,
              block: false,
              passage: event.passage,
              image: event.image,
              content: event.content,
              title: event.title,
            };
            setTimeout(() => setup.scenario.launch(argument), 50);
            return;
          }
        }
      }
    }
  },
  eventLister(): void {
    let out = `<center><h3>Job Events!</h3></center>`;
    const jobs = Object.keys(aw.jobData);
    for (let i = 0, c = jobs.length; i < c; i++) {
      out += `<p><b>JOB ${jobs[i]} Events:</b> `;
      if (aw.jobData[jobs[i]].events != null) {
        for (const event of aw.jobData[jobs[i]].events) {
          out += `<<link "${event.title}">><<run setup.job.eventTester("${event.title}")>><<run Dialog.close()>><</link>> | `;
        }
      }
      out += "</p>";
    }
    setup.dialog("Job Event Tester", out);
  },
};
