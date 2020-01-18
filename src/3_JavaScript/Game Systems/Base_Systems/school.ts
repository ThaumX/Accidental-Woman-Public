/*
.  .d8888b.           888                        888
. d88P  Y88b          888                        888
. Y88b.               888                        888
.  "Y888b.    .d8888b 88888b.   .d88b.   .d88b.  888
.     "Y88b. d88P"    888 "88b d88""88b d88""88b 888
.       "888 888      888  888 888  888 888  888 888
. Y88b  d88P Y88b.    888  888 Y88..88P Y88..88P 888
.  "Y8888P"   "Y8888P 888  888  "Y88P"   "Y88P"  888
.
. SKILL TRAINING SCHOOLS OF DESTINY
*/

interface setupSchool {
  scheduler: () => void;
  temp: string;
  hours: (school: number[]) => string;
  events: (school: string, course: string) => void;
  print: (school: string) => string;
  coursePrint: (school: string, course: string) => string;
  printButtons: (school: string) => string;
  define: () => void;
  charge: () => number;
  customLoc: () => string;
  actionButton: () => string;
}

interface IntSchoolCourse {
  days: boolean[];
  time: number[];
  priceMod: number;
  price: number;
  duration: number;
  train: {
    [propName: string]: number;
  };
  desc: string;
  req: "none" | {
    [propName: string]: number;
  };
  img: string;
}

interface IntClassContent {
  course: string[];
  passage: string;
  image: string;
  content: string;
}

interface IntClassEvent {
  random: boolean;
  odds: [number, number];
  condition: (school: string, courseName: string) => boolean;
  passage: string;
  image: string;
  content: string;
  effect: () => void;
}

// namespace
if (setup.school == null || setup.school === undefined) {
  setup.school = {} as setupSchool;
  aw.school = {};
}

// a training school for skills
class School {
  public key: string;
  public name: string;
  public desc: string;
  public img: string;
  public days: boolean[];
  public hours: [number, number];
  public basePrice: number;
  public courses: {
    [propName: string]: IntSchoolCourse;
  };
  public hooks: string[];
  public instructor: string[];
  public member: boolean;
  public loc: string[];
  public classContent: IntClassContent[];
  public events: IntClassEvent[];
  constructor({
    key,
    name,
    desc,
    days,
    hours,
    basePrice,
    member,
    courses,
    hooks,
    img,
    loc,
    instructor,
    classContent ,
    events,
  }: {
    key: string,
    name: string,
    desc: string,
    days: boolean[],
    hours: number[],
    basePrice: number,
    member: boolean,
    courses: any[],
    hooks: string[],
    img: string,
    loc: string[],
    instructor: string[],
    classContent: any[],
    events: any[],
  }) {
    if (key === "none" || name === "none") { throw new Error(`Invalid school initialization, missing mandatory variables. ${key}, ${name}.`); }
    this.key = key;
    this.name = name;
    this.desc = desc;
    this.days = clone(days);
    this.hours = clone(hours);
    this.basePrice = clone(basePrice);
    this.member = member;
    this.hooks = clone(hooks);
    this.instructor = clone(instructor);
    this.loc = clone(loc);
    this.img = img;
    this.classContent = clone(classContent);
    this.courses = {};
    for (let i = 0, c = courses.length; i < c; i++) {
      this.courses[courses[i].name] = {
        days: clone(courses[i].days),
        time: clone(courses[i].time),
        priceMod: courses[i].priceMod,
        price: basePrice * courses[i].priceMod,
        duration: courses[i].duration,
        train: clone(courses[i].train),
        desc: courses[i].desc,
        req: clone(courses[i].req),
        img: "IMG-School-Ballerinas",
      };
      if (courses[i].img != null && courses[i].img !== "none") { this.courses[courses[i].name].img = courses[i].img; }
    }
    this.events = [];
    for (let i = 0, c = events.length; i < c; i++) {
      this.events.push(clone(events[i]));
    }
  }
  public signUp(course: string) {
    aw.L();
    if (this.reqCheck(course)) {
      ↂ.sched.school.push([this.key, course]);
      const cost: number = this.courses[course].price * -1;
      this.schedule(course);
      aw.cash(cost, "school");
      setup.notify(`You are signed up for ${course}!`);
    } else {
      setup.notify(`<span class="bad">You don't meet the minimum requirements for ${course}.</span>`);
    }
  }
  public reqCheck(course: string) {
    const reqs = this.courses[course].req;
    if (reqs === "none") { return true; }
    const skill = ↂ.skill;
    const typer = {
      exhib: "exhibition",
      ho: "prostitute",
      sex: "sex",
      oral: "oral",
      sed: "seduction",
      com: "comm",
      org: "org",
      prob: "probSolving",
      fin: "finance",
      art: "art",
      ath: "athletic",
      dance: "dancing",
      clean: "clean",
      shop: "shop",
      cook: "cook",
      martial: "martial",
    };
    const keys = Object.keys(reqs);
    for (let i = 0, c = keys.length; i < c; i++) {
      if (skill[typer[keys[i]]] < reqs[keys[i]]) {
        return false;
      }
    }
    return true;
  }
  public quit(course: string) {
    let message: string;
    if (this.member) {
      const jizz: string[] = ["you need to be inside the cancellation window in order to cancel your class membership without a fee.", `for your protection, ${this.name} only accepts a notarized letter of intent to withdrawl or a separation fee if you wish to stop attending.`, "you signed up for a fixed duration course, so must pay a fee if you wish to terminate your courses early."];
      const fee: number = this.courses[course].price * (this.courses[course].priceMod + 2);
      let button: string;
      if (State.active.variables.AW.cash < fee) {
        button = `<span class="disabled" title="You can't afford the early termination fee!"><<button "PAY THE FEE & QUIT">><</button>></span>`;
      } else {
        button = `<span title="This can not be undone, you will have to sign up again if you wish to continue with this course later."><<button "PAY THE FEE & QUIT">><<run aw.school.${this.key}.reallyQuit("${course}",${fee})>><<run Dialog.close()>><</button>></span>`;
      }
      message = `You attempt to withdrawl from the course, but it isn't as easy as it sounds. You discover that ${jizz[random(0, 2)]} It seems that you'll need to pay a fee in order to stop taking your class, it's basically just like a gym membership. According to ${this.name}, the fee will be <span class="money">₢${fee}</span>, which is pretty ridiculous.<br><br>${button}`;
    } else {
      const fee: number = Math.ceil(this.courses[course].price / 2);
      message = `You discover to your surprise that it's actually relatively straight-forward to withdrawl as you've been paying for the lessons up front, and ${this.name} doesn't have any douche member-retention policies. There's a small rescheduling fee of <span class="money">₢${fee}, and that's it.<br><br><span title="You won't be refunded for any classes that you paid for this week."><<button "PAY & QUIT">><<run aw.school.${this.key}.reallyQuit("${course}",${fee})>><<run Dialog.close()>><</button>></span>`;
    }
    setup.dialog("Withdrawl from Course", message);
  }
  public reallyQuit(course: string, fee: number) {
    const ᛝ = ↂ.sched.school;
    aw.L();
    fee *= -1;
    for (let i = 0, c = ᛝ.length; i < c; i++) {
      if (ᛝ[i][0] === this.key && ᛝ[i][1] === course) {
        ᛝ.splice(i, 1);
        break;
      }
    }
    aw.cash(fee, "school");
  }
  public enrolled(course: string): boolean {
    let found: boolean = false;
    const ᛝ = ↂ.sched.school;
    for (let i = 0, c = ᛝ.length; i < c; i++) {
      if (ᛝ[i][0] === this.key && ᛝ[i][1] === course) {
        found = true;
        break;
      }
    }
    return found;
  }
  // returns true if course is ready to be taken (scheduled time)
  public available(course: string): boolean {
    const ᛔ = State.active.variables;
    aw.con.info(course);
    if (!this.courses[course].days[ᛔ.date[0]]) {
      aw.con.info("yep, fail");
      return false;
    }
    let startHour = this.courses[course].time[0];
    let startMin = this.courses[course].time[1] - 10;
    if (startMin < 0) {
      startHour -= 1;
      startMin = 60 + startMin;
    }
    if (!setup.time.after(startHour, startMin)) {
      const dur = Math.round(this.courses[course].duration / 4);
      let endHour = this.courses[course].time[2];
      let endMin = this.courses[course].time[3] - dur;
      if (endMin < 0) {
        endHour -= 1;
        endMin = 60 + endMin;
      }
      if (setup.time.after(endHour, endMin)) {
        return true;
      } else {
        aw.con.info(`Course ${course} unavailable, after end time. End Time = ${endHour} : ${endMin}. Current Time = ${ᛔ.time[0]} : ${ᛔ.time[1]}.`);
        return false;
      }
    } else {
      aw.con.info(`Course ${course} unavailable, before start time. Start Time = ${startHour} : ${startMin}. Current Time = ${ᛔ.time[0]} : ${ᛔ.time[1]}.`);
      return false;
    }
  }
  public precum(course: string): boolean {
    const ᛔ = State.active.variables;
    if (!this.courses[course].days[ᛔ.date[0]]) {
      return false;
    }
    const startHour = this.courses[course].time[0] - 1;
    const startMin = this.courses[course].time[1];
    if (!setup.time.after(startHour, startMin)) {
      const dur = Math.round(this.courses[course].duration / 2.5);
      const endHour = this.courses[course].time[0];
      const endMin = this.courses[course].time[1];
      if (setup.time.after(endHour, endMin)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  public attend(course: string) {
    const ᛔ = State.active.variables;
    if (!this.available(course)) {
      aw.con.warn(`tried to take course ${this.name} ${course} when it wasn't available somehow.`);
      return;
    }
    if (this.courses == null || this.courses[course] == null) {
      aw.con.warn(`setup.school.attend("${course}") is showing null for either this or this.courses!`);
      alert(`The TimeCock has struck again! Fuuuuck!`); // TODO delete me later.
    }
    const ᚠ = this.courses[course].train;
    const keys = Object.keys(ᚠ);
    let gains = 0;
    try {
      for (let i = 0, c = keys.length; i < c; i++) {
        if (keys[i] === "exercise") {
          // don't want to add skill level for exercise!
          ↂ.pc.status.exercise ++;
        } else {
          for (let j = 0, d = ᚠ[keys[i]][0]; j < d; j++) {
            if (setup.skillGain(keys[i], (ᚠ[keys[i]][1]) + 5)) { // made this check easier with this "+3"
              gains++;
            }
          }
        }
      }
    } catch (e) {
      aw.con.warn(`Error with school.attend in skill gain loop. ${e.name}: ${e.message}.`);
      gains = 1;
    }
    let workDesc: string;
    const exercises: string[] = [
      `You weren't really feeling the course today, but you went through the motions anyway`,
      `You had a hard time keeping up with ${this.instructor[0]}'s lesson, so you spent more time trying to catch up than actually learning anything.`,
      `${this.instructor[0]} keeps a close eye on the students for this lesson, and you got some extra attention when you needed it.`,
      `The course today went pretty normally, nothing really special or out of the ordinary.`,
      `You had to ask ${this.instructor[0]} for help a couple times, but thanks to the extra effort you were able to get something out of the course.`,
      `For some reason, ${this.instructor[0]} seemed fired up and enthusiastic. You ended up learning a lot because of it.`,
      `For whatever reason, you were really in the <span title="ZONE: A performance enhancing drug"><b>zone</b></span> today, and the lesson really seemed to click.`,
    ];
    if (gains <= 0) {
      workDesc = exercises[random(0, 1)] + " You didn't make much progress today.";
    } else if (gains === 1) {
      workDesc = exercises[random(2, 4)] + " You <span class='good'>made some progress</span> today.";
    } else {
      workDesc = exercises[random(5, 6)] + " You <span class='good'>made good progress</span> today!";
    }
    const content = this.content(course);
    const output: string = `${content}<p>You spend ${this.courses[course].duration} minutes training in the ${course} course at ${this.name}. ${workDesc}</p>`;
    setup.dialog(course, output);
    const namo = this.key;
    try {
    setup.school.events(namo, course);
    } catch (e) {
      aw.con.warn(`setup.school.events(${namo}, ${course}) failed with ${e.name} ${e.message}.`);
    }
    aw.con.info(`[SCHOOL-ATTEND] Reached end of function, now adding time and refreshing passage.`);
    const timeToAdd = this.courses[course].duration;
    setup.time.add(timeToAdd);
    aw.go("PrimarySchool");
  }
  // returns any custom content available for the course to add to training message.
  public content(course: string): string {
    const valid: IntClassContent[] = [];
    for (let i = 0, c = this.classContent.length; i < c; i++) {
      if (this.classContent[i].course.includes("any") || this.classContent[i].course.includes(course)) {
        valid.push(this.classContent[i]);
      }
    }
    if (valid.length === 0) {
      return "";
    }
    let ind = 0;
    if (valid.length > 1) {
      const min = 0;
      const max = valid.length - 1;
      ind = random(min, max);
    }
    let output = "<p>";
    if (valid[ind].image !== "none") {
      output += `<center><img data-passage="${valid[ind].image}" style="border-radius:8px;"></center>`;
    }
    if (valid[ind].passage !== "none") {
      output += `<<include [[${valid[ind].passage}]]>>`;
    }
    if (valid[ind].content !== "none") {
      output += valid[ind].content;
    }
    output += "</p>";
    return output;
  }
  public schedule(course: string) {
    const ᛔ = State.active.variables;
    /*const apt = {
      name: `${this.name} training class`,
      type: 2,
      alert: true,
      place: this.name,
      start: [this.courses[course].time[0], this.courses[course].time[1]] as [number, number],
      loc: clone(this.loc),
      disc: "Appointment Reminder",
      msg: `You have a ${course} class coming up at ${this.name}. You wouldn't want to be late, you paid for it, after all!`,
      end: false as false,
    };*/
    const week: number = ᛔ.date[1];
    aw.L();
    for (let i = 1; i < 8; i++) {
      if (this.courses[course].days[i]) {
        aw.con.info(`${i}, ${week}, ${aw.timeArray[4]}, ${aw.timeArray[5]}, ${this.courses[course].time[0]}, ${this.courses[course].time[1]}, ${setup.time.toVal([this.courses[course].time[0], this.courses[course].time[1], false])}`);
        const helloPapa = (setup.time.dateToVal([i, week, aw.timeArray[4], aw.timeArray[5]])) + (setup.time.toVal([this.courses[course].time[0], this.courses[course].time[1], false]));
        aw.con.info(`${helloPapa}`);
        // setup.addAppointment(i, week, apt);
        setup.sched.new(`${this.name} training class`, "reminder", true, helloPapa, false, this.name, clone(this.loc), true, false, `You have a ${course} class coming up at ${this.name}. You wouldn't want to be late, you paid for it, after all!`);
      }
    }
    aw.S();
  }
}

// adds all classes registered for to schedule for week.
setup.school.scheduler = function(): void {
  const ᛔ = ↂ.sched.school;
  for (let i = 0, c = ᛔ.length; i < c; i++) {
    aw.school[ᛔ[i][0]].schedule(ᛔ[1]);
  }
};

setup.school.temp = "besty";

// formats the open time of the school
setup.school.hours = function(school: number[]): string {
  let ᛝ: number[];
  if (school.length === 2) {
    ᛝ = [school[0], 0, school[1], 0];
  } else {
    ᛝ = clone(school);
  }
  let time: string = "";
  if (ᛝ[0] < 10) {
    time += "0" + ᛝ[0];
  } else {
    time += ᛝ[0];
  }
  if (ᛝ[1] < 10) {
    time += "0" + ᛝ[1];
  } else {
    time += ᛝ[1];
  }
  time += " to ";
  if (ᛝ[2] < 10) {
    time += "0" + ᛝ[2];
  } else {
    time += ᛝ[2];
  }
  if (ᛝ[3] < 10) {
    time += "0" + ᛝ[3];
  } else {
    time += ᛝ[3];
  }
  return time;
};

// checks for potential events and triggers them
setup.school.events = function(school: string, course: string) {
  const ᚥ = aw.school[school];
  const ᛞ = ᚥ.courses[course];
  let event: IntClassEvent;
  let run = false;
  for (let i = 0, c = ᚥ.events.length; i < c; i++) {
    if (!ᚥ.events[i].random || random(0, ᚥ.events[i].odds[1]) < ᚥ.events[i].odds[0]) {
      if (typeof ᚥ.events[i].condition === "string") {
        try {
          const tf = eval(ᚥ.events[i].condition);
          const rs = (typeof tf === "function") ? tf(school, course) : tf;
          if (rs) {
            event = ᚥ.events[i];
            run = true;
            break;
          }
        } catch (e) {
          aw.con.warn(`School event condition parse failed - school: ${school}, course: ${course}`);
        }
      } else {
        if (ᚥ.events[i].condition(school, course)) {
          event = ᚥ.events[i];
          run = true;
          break;
        }
      }
    }
  }
  if (run) {
    const argument = {
      size: 3,
      block: false,
      passage: event!.passage,
      image: event!.image,
      content: event!.content,
      effect: event!.effect,
    };
    if (typeof argument.effect === "string" && argument.effect !== "none") {
      argument.effect = eval(argument.effect);
    }
    setTimeout(() => setup.interact.launch(argument), 100);
  } else { // no events, let's try to shove some new friend to PC
    const NpcChance = random(0, 100) + (ↂ.pc.trait.friendly * 5) + ↂ.pc.status.atr + (ↂ.pc.trait.approachable * 10);
    let list = [] as string[];
    for (let index = 0; index < setup.npc.ready.length; index++) {
      if (setup.npc.ready[index].length < 6) {
        list.push(setup.npc.ready[index]);
      }
    }
    const npc = either(list);
    ↂ.flag.npcInducedInteractions.intType = "school";
    ↂ.flag.npcInducedInteractions.intNPC = npc;
    aw.S();
    aw.con.info(`Random NPC meeting chance was ${NpcChance}.`)
    if (NpcChance > 90) {
      const args = {
        passage: "NPCinteraction-StrangerSayHi",
        block: true,
        content: "none",
        image: aw.npc[npc].main.picture,
        title: aw.npc[npc].main.name,
        size: 3,
        callback() {
          setup.time.add(random(12, 22));
        },
        onclose() {
          setup.refresh();
        },
      };
      setup.interact.launch(args);
    }
  }
};


// prints the school information
setup.school.print = function(school: string): string {
  if (!ↂ.flag.schoolManualShown) {
    aw.L();
    ↂ.flag.schoolManualShown = true;
    setup.dialog("School manual", "We know, you properly inspected all the manuals before creating your character like a good boy, but just in case you <i>somehow</i> missed it, here is a page about schools, no need to thanks us:<br><center>[img[IMGinstructions8]]<br><<button 'Okay, okay, gosh'>><<run Dialog.close();>><</button>></center>");
    aw.S();
  }
  const ᛝ = aw.school[school];
  const time: string = setup.school.hours(ᛝ.hours);
  const days: string = setup.daysList(ᛝ.days);
  const member: string = (ᛝ.member) ? "Membership School" : "Open School";
  let instName: string = "";
  if (ᛝ.instructor.length === 3) {
    instName = `${ᛝ.instructor[0]} "${ᛝ.instructor[2]}" ${ᛝ.instructor[1]}`;
  } else {
    for (let i = 0, c = ᛝ.instructor.length; i < c; i++) {
      instName += ᛝ.instructor[i];
      instName += " ";
    }
  }
  let output: string = `<div id="mainshitschool" class="fadeIn animated"><div class="squareGradientBackground schoolTitleBar"><img data-passage="${ᛝ.img}"><br><div class="whiteOutline" style="color:#000;font-size:28px;position:absolute;top:10px;left:10px;z-index:25;">${ᛝ.name}</div></div>`;
  output += `<div id="schoolRight">`;
  const cKeys = Object.keys(ᛝ.courses);
  for (let i = 0, c = cKeys.length; i < c; i++) {
    output += setup.school.coursePrint(school, cKeys[i]);
  }
  output += `</div><p style="font-size:1.15rem;"><b class="head">Instructor:</b> ${instName}<br><b class="head">Hours:</b> ${time} ${days} <br><b class="head">${member}</b></p><p>${ᛝ.desc}</p><p>${setup.curTimeDisplay()}</p></div>`;
  return output;
};

// prints the information and buttons for a school's courses
setup.school.coursePrint = function(school: string, course: string): string {
  const ᚠ = aw.school[school].courses[course];
  const time: string = setup.school.hours(ᚠ.time);
  const days: string = setup.daysList(ᚠ.days);
  const s = /\s/g;
  const safeLabel = course.replace(s, "-");
  let output: string = `<div id="${safeLabel}-box" class="school-course-box"><img data-passage="${ᚠ.img}">`;
  output += `<span class="head3">${course}</span> <span class="money" style="font-size:1.25rem;">₢${ᚠ.price}</span><br><span class="monospace"><b>Course Times:</b> ${days} - ${time} - ${(ᚠ.duration - 15)} mins</span><center><span id="${safeLabel}-Button">`;
  if (aw.school[school].enrolled(course)) {
    output += `<<button "QUIT THIS COURSE">><<run aw.school.${school}.quit("${course}")>><<replace "#${safeLabel}-Button">><</replace>><</button>></span></center>`;
  } else {
    output += `<<button "ENROLL IN COURSE">><<run aw.school.${school}.signUp("${course}")>><<replace "#${safeLabel}-Button">><</replace>><</button>></span></center>`;
  }
  output += "<p>" + ᚠ.desc + "</p>";
  output += "</div>";
  return output;
};

// prints the main action bar buttons for the school page
setup.school.printButtons = function(school: string): string {
  let output: string = "";
  let buttons: string = "";
  let hover: string = "";
  const ᛝ = aw.school[school];
  const keys = Object.keys(ᛝ.courses);
  let count = 0;
  for (let i = 0, c = keys.length; i < c; i++) {
    if (ᛝ.enrolled(keys[i])) {
      count ++;
      if (ᛝ.available(keys[i])) {
        buttons += `<<hoverrevise course${i}>><<button "Attend ${keys[i]}">><<run aw.school.${school}.attend("${keys[i]}")>><</button>><<endhoverrevise>>`;
        hover += `<<insertion course${i}>>Attend your ${keys[i]} course! <span class="ship">[${ᛝ.courses[keys[i]].duration}min]</span><<endinsertion>>`;
      } else {
        buttons += `<<hoverrevise course${i}>><span class="disabled" title="Wrong Time"><<button "Attend ${keys[i]}">><</button>></span><<endhoverrevise>>`;
        hover += `<span style="color:#ff6c38;">It's not time for this course.</span> The ${keys[i]} course is scheduled for ${setup.daysList(ᛝ.courses[keys[i]].days)} at ${setup.school.hours(ᛝ.courses[keys[i]].time)}.<<endinsertion>>`;
      }
    }
  }
  if (count === 0) {
    buttons += `<<hoverrevise courses>><<button "Attend A Class">><<notify>>You must sign up for one first!<</notify>><</button>><<endhoverrevise>>`;
    hover += `<<insertion courses>>Before taking a course, you have to sign up for one first! It involves a weekly commitment to pay the tuition, the first payment is due up front. You can sign up for a course from the display above, be sure to pay attention to the times the course is taught to make sure you can attend!<<endinsertion>>`;
    if (!ↂ.flag.jobEvents.pimp.askedForPractice && school === "profession") {
      buttons += `<<hoverrevise practice>><<button "Escort">><<dialog "Escort">><<include [[OldestProfPractice-1-alt]]>><</dialog>><</button>><<endhoverrevise>>`;
      hover += `<<insertion practice>>Ask about escort job for girls.<<endinsertion>>`;
    }
    if (ↂ.flag.jobEvents.pimp.askedForPractice && school === "profession") {
      buttons += `<<hoverrevise work>><<button "Wait for a client">><<dialog "Wait for a client">><<include [[OldestProfWork]]>><</dialog>><</button>><<endhoverrevise>>`;
      hover += `<<insertion work>>Say Alice that you are open for business and wait for some call to the client.[10-30min]<<endinsertion>>`;
    }
  } else if (!ↂ.flag.jobEvents.pimp.askedForPractice && school === "profession" && count > 0) {
    buttons += `<<hoverrevise practice>><<button "Practice">><<dialog "Practice">><<include [[OldestProfPractice-1]]>><</dialog>><</button>><<endhoverrevise>>`;
    hover += `<<insertion practice>>Ask if some practical appliance of your <i>business skills</i> is available.<<endinsertion>>`;
  } else if (ↂ.flag.jobEvents.pimp.askedForPractice && school === "profession" && count > 0) {
    buttons += `<<hoverrevise work>><<button "Wait for a client">><<dialog "Wait for a client">><<include [[OldestProfWork]]>><</dialog>><</button>><<endhoverrevise>>`;
    hover += `<<insertion work>>Say Alice that you are open for business and wait for some call to the client.[10-30min]<<endinsertion>>`;
  }
  output = `<div id="actionbar">${buttons}</div> <div id="actionInfo">${hover}</div>`;
  return output;
};

setup.school.charge = function(): number {
  const schools = ↂ.sched.school;
  let cost = 0;
  for (const school of schools) {
    cost += aw.school[school[0]].courses[school[1]].price;
  }
  return cost;
};

setup.school.actionButton = function(): string {
  // checks all classes registered to player in sched.school, and see if they are w/i 60 minutes starting time. if so, creates an action button. IMG_GoToSchoolIcon
  const cs = ↂ.sched.school;
  let output = "";
  try {
    for (const course of cs) {
      if (aw.school[course[0]].precum(course[1])) {
        const loc = aw.school[course[0]].loc;
        output += `<<link [img[Go to your ${course[1]} class|IMG_GoToSchoolIcon]]>><<run setup.map.nav("${loc[0]}","${loc[1]}")>><</link>>`;
      }
    }
  } catch (e) {
    aw.con.warn(`Error in setup.school.actionButton\n${e.name}: ${e.message}`);
  }
  return output;
};

setup.school.customLoc = function(): string {
  // prints button to go to custom schools.
  if (aw.customSchools == null || aw.customSchools.length < 1) {
    return `<p>It seems like none of the schools are open for business yet...<br><br><span class="ctext">This schoolhouse is where custom schools will appear. Try loading the demo school mod to see a new school appear in this location! You can download mods for sexy schools, or even create your own!</span></p>`;
  }
  let out = "<div>";
  for (const skool of aw.customSchools) {
    const school = aw.school[skool] as School;
    out += `<div style="text-align:center;display:inline-block;width: 480px;border:2px solid deepskyblue;border-radius: 5px; margin:10px;"><span class="head2">${school.name}</span><br><img data-passage="${school.img}" style="max-width: 460px;"><br>`;
    if (school.days[aw.timeArray[2]]) {
      // school open today
      if (aw.timeArray[1] >= school.hours[0] && aw.timeArray[1] < school.hours[1]) {
        // school is open at this time
        out += `<<button "GO TO SCHOOL">><<gotoSchool "${skool}">><</button>></div>`;
      } else {
        out += `<button class="disabled">SCHOOL OPEN ${school.hours[0]} TO ${school.hours[1]}</button></div>`;
      }
    } else {
      out += `<button class="disabled">SCHOOL CLOSED TODAY</button></div>`;
    }
  }
  out += "</div>";
  return out;
};

/*
<div id="actionbar">
<<hoverrevise hovPanties>>
	<<button "Panties">><</button>>
<<endhoverrevise>>
</div>

<div id="actionInfo">
<<insertion checkOut>>Pay for the items in your cart<<endinsertion>>
</div>
*/

Macro.add("gotoSchool", {
  handler() {
    setup.school.temp = this.args[0];
    aw.go("PrimarySchool");
  },
});

// defines the different school objects.
setup.school.define = function(): void {
  const schools = [
    {
      key: "besty",
      name: "Besty's SlavSquat Academy",
      // tslint:disable-next-line:max-line-length
      desc: "Founded by a Russian emigrant, the International SlavSquat Academy enjoyed a meteoric rise in the mid 20s. Led by Besty Cumovich Bestarius the Fourth with his parent company the Besty School of Slavic Studies, the SlavSquat Academy grew to have studios in just about every major city in the country. Ironically, despite having 'International' in the name, the school never expanded beyond the borders of the United States. Unfortunately for Besty, the world depression (alternatively Great Depression II) got started soon after, placing the extended company in a precarious position. A few scandals and poor investments later, and the International SlavSquat Academy closed in bankruptcy. Besty now runs Besty's SlavSquat Academy, which despite recycled branding, is a distinct legal entity.<br><br>Besty's SlavSquat Academy teaches a number of different courses, focused on the ancient art of the SlavSquat. As an entrepreneur, Besty offers several courses tailored to the student's special needs, from general fitness and weight control to something called combat squatting. There are even rumors of SlavSquat instruction aimed toward prostitution, though you see nothing to indicate that such a course exists...",
      img: "IMG-School-Squat1",
      days: [false, false, true, true, true, true, true, true],
      hours: [16, 22],
      basePrice: 6, // per 1/3 lesson
      courses: [
        {
          name: "Standard SlavSquat",
          days: [false, false, false, true, false, true, false, true],
          time: [19, 0, 20, 0],
          priceMod: 9,
          duration: 70,
          img: "IMG-School-Squat5",
          train: {
            ath: [1, 15],
            dance: [1, 9],
            sex: [1, 8],
            exercise: 1,
          },
          // tslint:disable-next-line:max-line-length
          desc: "Your basic SlavSquat course taken full-time at three hourly courses per week. This course focuses on athleticism, and provides some exercise. It may also help improve your dance or sex skills.",
          req: "none",
        },
        {
          name: "Short SlavSquat",
          days: [false, false, true, false, true, false, false, false],
          time: [19, 0, 20, 0],
          priceMod: 6,
          duration: 70,
          img: "IMG-School-Squat5",
          train: {
            ath: [1, 15],
            dance: [1, 9],
            sex: [1, 8],
            exercise: 1,
          },
          // tslint:disable-next-line:max-line-length
          desc: "Your basic SlavSquat course taken only two days per week instead of three. This course focuses on athleticism, and provides some exercise. It may also help improve your dance or sex skills.",
          req: "none",
        },
        {
          name: "Late SlavSquat",
          days: [false, false, false, true, false, true, false, true],
          time: [21, 0, 22, 0],
          priceMod: 9,
          duration: 70,
          img: "IMG-School-Squat5",
          train: {
            ath: [1, 15],
            dance: [1, 9],
            sex: [1, 8],
            exercise: 1,
          },
          // tslint:disable-next-line:max-line-length
          desc: "Your basic SlavSquat course taken full-time at three hourly courses per week. This course focuses on athleticism, and provides some exercise. It may also help improve your dance or sex skills.",
          req: "none",
        },
        {
          name: "advanced SlavSquat",
          days: [false, false, false, true, false, true, false, true],
          time: [20, 0, 21, 30],
          priceMod: 15,
          duration: 95,
          img: "IMG-School-Squat2",
          train: {
            ath: [2, 19],
            dance: [1, 15],
            sex: [1, 15],
            exercise: 2,
          },
          // tslint:disable-next-line:max-line-length
          desc: "An advanced SlavSquat course for experienced squatters only. This course focuses on athleticism, but will also improve your dance and sex skills. It also provides more exercise than the standard course. <span class='import'>[Requires level 70 Athleticism]</span>",
          req: {ath: 70},
        },
        {
          name: "Squattercise",
          days: [false, false, true, false, true, false, true, false],
          time: [17, 0, 22, 0],
          priceMod: 9,
          duration: 70,
          img: "IMG-School-Squat3",
          train: {
            ath: [1, 12],
            exercise: 3,
          },
          // tslint:disable-next-line:max-line-length
          desc: "The Squattercise course is focused on SlavSquatting as a form of aerobic exercise. While the potential for training athleticism is less than the standard course, it provides much better exercise. This course has a flexible schedule, allowing you to attend any time within the allotted hours.",
          req: "none",
        },
        {
          name: "SexSquat",
          days: [false, false, false, false, false, false, true, false],
          time: [20, 0, 22, 0],
          priceMod: 8,
          duration: 95,
          img: "IMG-School-Squat4",
          train: {
            ho: [1, 15],
            sex: [2, 15],
            exercise: 1,
          },
          // tslint:disable-next-line:max-line-length
          desc: "The SexSquat course is focused on the use of traditional SlavSquat forms and positions in sexual intercourse. Besty demonstrates the famous SquatBounce move, for rapidfire strokes. This course is mostly focused on sexual skills, but would also be useful for a prostitute. It provides a small amount of exercise. This course is only taught once per week.",
          req: "none",
        },
      ],
      hooks: ["none"],
      instructor: ["Besty", "Bestarius", "SlavSquat Tsar"], // TODO real npcs
      member: true,
      loc: ["downtown", "west"],
      classContent: [
        {
          course: ["Standard SlavSquat", "Short SlavSquat", "Late SlavSquat", "advanced SlavSquat"],
          passage: "none",
          image: "IMG-BestySchoolCourse1",
          // tslint:disable-next-line:max-line-length
          content: "The class involves a lot of actual squatting, so being in the right kind of clothing is essential. While yoga pants eem like an ideal choice and are worn by a couple ladies, women simply stripping to their panties seems to be the most common choice. A couple women with skirts simply hike them up, removing the need to change. One woman actually just strips nude for the class. <<has exhibition>>You of course join her, unable to pass up the opportunity to spread your legs sans clothes, though this does result in you making a small mess on the floor during the lesson.<</has>><br><br>After everyone is changed, the class proper begins. There's a lot of focus on the anatomy of squatting, and how things line up to make the position surprisingly comfortable. While simply squatting would have been fine, this class involves a lot of standing up and squatting again to fall naturally into the correct squatting form. This leaves your legs quite tired by the end of the lesson, but you suppose it's good exercise.",
        },
        {
          course: ["Squattercise"],
          passage: "none",
          image: "IMG-BestySchoolCourse2",
          // tslint:disable-next-line:max-line-length
          content: "Squattercise. It certainly isn't the most fun course--calling it torture would probably fit better--but it does give you a solid core and leg workout. The people in this course seem to take it pretty seriously, though there's occasionally some rowdy fun. The only thing to do is just get it over with.",
        },
        {
          course: ["SexSquat"],
          passage: "none",
          image: "IMG-BestySchoolCourse3",
          // tslint:disable-next-line:max-line-length
          content: "SexSquat. Something you were curious about ever since you saw the name of the class. The course certainly has plenty of participants, something that you're reminded of once again as you have to wait to use the changing room. There's a variety of tools already prepped and on display. While you weren't aware when you signed up, there's also a practical element to the course, and thus the tools. Besty believes that the best way to learn the skills and refine your technique is to practice doing it, so of course the practical portion of the class isn't just going through the motions.<br><br>The tools in question are basically what you'd describe as thin dildos mounted on a wooden platform. While they're thinner than most ladies would probably prefer, it does emphasize that the exercise is about learning and not sexual gratification. <<has easy>>Fortunately you're still able to get yourself off thanks to your sensitive <<w pussy>>.<<satisfy 3 'Sex Squats'>><<arouse x>><<or>>You still wish the tools were a bit bigger though, as the thin training members are too thin to get you off if you're following along with the class.<<arousal 2>><<satisfy -3 'sex squat tools too small'>><</has>> You wonder if you'll take the opportunity for the <i>practical</i> exercises when your turn comes around.",
        },
      ],
      events: [],
    },
    {
      key: "dancercise",
      name: "Candy Rider's Dancercise Studio",
      // tslint:disable-next-line:max-line-length
      desc: "A combination of gym and dance studio, Candy takes some of the aerobics trends of the previous decades, such as Stepercise, Zoombo, pole dancing, and Bouncercise, and incorporates it into a fun aerobic workout that's great for keeping weight under control. Each lesson is set to modern music, with part of each lesson focused on dancing to the music. While definitely focused on exercise, Candy Rider's Dancercise Studio does also offer the side benefit of increasing your dance skills. Lessons are very flexible, with a drop in-and-out policy that makes it easy to fit Dancercise into any schedule. It's also very reasonably priced compared to other options.<br><br>Candy Rider got her start as a stripper, where her unique talents at strip tease, pole dance, and nude dancing (combined with her very attractive body) saw her all the way to Las Vegas. Despite the name that screams <i>stripper name</i>, Candy has always maintained that Candy is her real name, and not a stage name. Candy eventually transitioned to teaching new strippers, having three daughters along the way. As happens in the business, her age began to catch up with her, lowering the demand for her services. While she sports blonde hair and classic bimbo style, Candy has some business savvy, and made it out of Vegas to start her Dancercise studio in Appletree a year before the great sink-flood swallowed the Vegas strip.",
      img: "IMG-School-Dancercise2",
      days: [false, true, true, true, true, true, true, false],
      hours: [12, 20],
      basePrice: 5,
      courses: [
        {
          name: "Dance-Odd",
          days: [false, true, false, true, false, true, false, false],
          time: [15, 0, 22, 0],
          priceMod: 8,
          duration: 65,
          img: "IMG-School-Dancercise1",
          train: {
            dance: [1, 13],
            exercise: 3,
          },
          // tslint:disable-next-line:max-line-length
          desc: "A standard flexible-start Dancercise class, scheduled for the 'odd' days of the week. It provides good exercise, and a small amount of dance skill training.",
          req: "none",
        },
        {
          name: "Dance-Even",
          days: [false, false, true, false, true, false, true, false],
          time: [15, 0, 22, 0],
          priceMod: 8,
          duration: 65,
          img: "IMG-School-Dancercise1",
          train: {
            dance: [1, 13],
            exercise: 3,
          },
          // tslint:disable-next-line:max-line-length
          desc: "A standard flexible-start Dancercise class, scheduled for the 'even' days of the week. It provides good exercise, and a small amount of dance skill training.",
          req: "none",
        },
        {
          name: "Weekend Dance",
          days: [false, false, false, false, false, false, true, false],
          time: [15, 0, 22, 0],
          priceMod: 6,
          duration: 120,
          img: "IMG-School-Dancercise1",
          train: {
            dance: [1, 16],
            exercise: 5,
          },
          // tslint:disable-next-line:max-line-length
          desc: "For those with a busy schedule, there is the weekend dance course. It's a double-length course offered on Saturdays. You won't get as much out of it as 3 full classes, but it's more convenient and has a slightly-better price tag.",
          req: "none",
        },
        {
          name: "Dance-Stuffed",
          days: [false, false, true, false, true, false, false, false],
          time: [15, 0, 22, 0],
          priceMod: 10,
          duration: 95,
          img: "IMG-School-Dancercise1",
          train: {
            dance: [1, 15],
            exercise: 4,
          },
          // tslint:disable-next-line:max-line-length
          desc: "A flexible-start Dancercise class, with extended-length classes. This course has the most dance instruction of all the options, and offers exercise similar to a standard 3-day class.",
          req: "none",
        },
      ],
      hooks: [],
      instructor: ["Candy", "Rider"],
      member: true,
      loc: ["downtown", "northwest"],
      classContent: [
        {
          course: ["Dance-Odd", "Dance-Even", "Weekend Dance"],
          passage: "none",
          image: "IMG-DancerciseDancing",
          // tslint:disable-next-line:max-line-length
          content: "The dancercise class is rather unusual, in that it's more like visiting a gym than taking an actual class. Candy or one of her employees lead a series of 50 minute long exercise sets, meaning that people can pretty much come and go as they please when it's convenient for them. The students are dressed in a haphazard fashion as well. Most of the women are topless, though a few wear a loose t-shirts or tank tops. The signs about protecting your assets in the changing room are pretty blatant, so it isn't unusual that most women are going without bras.<br><br>You join in on the class, and start dancing. It's a good workout, but the really intense high-speed dance moves make it difficult to really learn detailed dance instruction, but you can tell you're still getting better at it regardless.",
        },
        {
          course: ["Dance-Stuffed"],
          passage: "none",
          image: "IMG-DancerciseStuffed",
          // tslint:disable-next-line:max-line-length
          content: "This dancercise class is a lot like the regular course, with the addition of some extra <i>'training aids'</i>. There's a selection of weighted kegel egg pelvic muscle trainers to use during the exercise, as well as some wall or pole-mounted dildos. The dildos are a popular option, but you stick with using the dangling vagina weights. They seem a lot more beneficial to you than simply getting yourself off with a dildo,which you can do at home without having to pay for the privilege. Once you get your weights in place, you join in with the class and get started.",
        },
      ],
      events: [],
    },
    {
      key: "monster",
      name: "Monster Tamer Studio",
      // tslint:disable-next-line:max-line-length
      desc: "The Monster Tamer Studio doesn't hide what their school is all about--riding cock--they put it all out there. They're safely located in the adult district, away from the prying eyes of more proper society. While the advertisements all seem to suggest that this school is all about stuffing yourself with dildos at the very limit of what is humanly possible, it's actually quite an approachable school. The majority of courses cover basic techniques for vaginal--and anal--with normal-sized cocks. Hans has developed a surefire system to improve anybody's skill in the bedroom. Some might even suggest that it's perfect for training new prostitutes, but Hans would be the first to disagree. It's hard to deny that anything that makes you better between the sheets is probably also going to make you better on the streets, however.<br><br>Hans Gruber is a some kind of Scandinavian, or perhaps Dutch person. his past is shrouded in mystery. He apparently used to be a professional bull rider (European, not rodeo), and lost his partner and husband to some sort of intestinal blowout during an international competition in Newer Amsterdam. He gets choked up talking about the past or the tragic accident, but it's clear that he's dedicated to teaching his students despite disavowing his former sport.",
      img: "IMG-School-MonsterTamer2",
      days: [false, true, true, true, false, true, true, true],
      hours: [15, 23],
      basePrice: 9,
      courses: [
        {
          name: "Basic Riding Alpha V",
          days: [false, false, true, false, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 9,
          duration: 90,
          img: "IMG-MonsterTamerBeginner",
          train: {
            sex: [2, 14],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A basic course on taming cock, which basically revolves around sticking it inside yourself. This basic course covers everything from the truly basic things anyone who's sexually active would pick up on their own, to a little more advanced techniques that focus on accommodating an entire member or increasing your grip. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: "none",
        },
        {
          name: "Basic Riding Alpha A",
          days: [false, false, true, false, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 9,
          duration: 90,
          img: "IMG-MonsterTamerBeginner",
          train: {
            sex: [2, 14],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A basic course on taming cock, which basically revolves around sticking it inside yourself. This basic course covers everything from the truly basic things anyone who's sexually active would pick up on their own, to a little more advanced techniques that focus on accommodating an entire member or increasing your grip. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: "none",
        },
        {
          name: "Basic Riding Beta V",
          days: [false, false, false, false, false, false, false, true],
          time: [15, 0, 16, 30],
          priceMod: 9,
          duration: 90,
          img: "IMG-MonsterTamerBeginner",
          train: {
            sex: [2, 14],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A basic course on taming cock, which basically revolves around sticking it inside yourself. This basic course covers everything from the truly basic things anyone who's sexually active would pick up on their own, to a little more advanced techniques that focus on accommodating an entire member or increasing your grip. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: "none",
        },
        {
          name: "Basic Riding Beta A",
          days: [false, false, false, false, false, false, false, true],
          time: [15, 0, 16, 30],
          priceMod: 9,
          duration: 90,
          img: "IMG-MonsterTamerBeginner",
          train: {
            sex: [2, 14],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A basic course on taming cock, which basically revolves around sticking it inside yourself. This basic course covers everything from the truly basic things anyone who's sexually active would pick up on their own, to a little more advanced techniques that focus on accommodating an entire member or increasing your grip. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: "none",
        },
        {
          name: "Intermediate Riding Alpha V",
          days: [false, true, false, false, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 11,
          duration: 90,
          img: "IMG-MonsterTamerInter",
          train: {
            sex: [2, 16],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "An intermediate course on taming monsters. Graduates from this course can expect to handle most natural members out there without much of a problem. The increase to your flexibility and grip really help to improve your performance in the bedroom. These lessons also also have applications to certain <i>other</i> professions as well. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: {
            sex: 50,
          },
        },
        {
          name: "Intermediate Riding Alpha A",
          days: [false, true, false, false, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 11,
          duration: 90,
          img: "IMG-MonsterTamerInter",
          train: {
            sex: [2, 16],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "An intermediate course on taming monsters. Graduates from this course can expect to handle most natural members out there without much of a problem. The increase to your flexibility and grip really help to improve your performance in the bedroom. These lessons also also have applications to certain <i>other</i> professions as well. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: {
            sex: 50,
          },
        },
        {
          name: "Intermediate Riding Beta V",
          days: [false, false, false, true, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 11,
          duration: 90,
          img: "IMG-MonsterTamerInter",
          train: {
            sex: [2, 16],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "An intermediate course on taming monsters. Graduates from this course can expect to handle most natural members out there without much of a problem. The increase to your flexibility and grip really help to improve your performance in the bedroom. These lessons also also have applications to certain <i>other</i> professions as well. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: {
            sex: 50,
          },
        },
        {
          name: "Intermediate Riding Beta A",
          days: [false, false, false, true, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 11,
          duration: 90,
          img: "IMG-MonsterTamerInter",
          train: {
            sex: [2, 16],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "An intermediate course on taming monsters. Graduates from this course can expect to handle most natural members out there without much of a problem. The increase to your flexibility and grip really help to improve your performance in the bedroom. These lessons also also have applications to certain <i>other</i> professions as well. <span class='note'>This course is split between Vaginal and Anal variants. The basic skill training remains the same, the only difference is the orifice used to train it.</span>",
          req: {
            sex: 50,
          },
        },
        {
          name: "Advanced Riding V",
          days: [false, false, false, false, false, true, false, false],
          time: [19, 0, 21, 0],
          priceMod: 13,
          duration: 120,
          img: "IMG-MonsterTamerAdvanced",
          train: {
            sex: [2, 18],
            ho: [1, 16],
          },
          // tslint:disable-next-line:max-line-length
          desc: "<<if !$pref.gaping>><span class='bad'><b>WARNING: This contains gaping content</b></span> <</if>> A course only for the dedicated, this is where the real monster taming begins. @@.note;Taking this course may result in permanent stretching of your orifice.@@",
          req: {
            sex: 70,
          },
        },
        {
          name: "Advanced Riding A",
          days: [false, false, false, false, false, true, false, false],
          time: [19, 0, 21, 0],
          priceMod: 13,
          duration: 120,
          img: "IMG-MonsterTamerAdvanced",
          train: {
            sex: [2, 18],
            ho: [1, 16],
          },
          // tslint:disable-next-line:max-line-length
          desc: "<<if !$pref.gaping>><span class='bad'><b>WARNING: This contains gaping content</b></span> <</if>> A course only for those really serious about large insertions, this is where the real monster taming begins. <span class='note' style='color:goldenrod;'>Taking this course may result in permanent stretching of your orifice.</span>",
          req: {
            sex: 70,
          },
        },
        {
          name: "Expert Riding V",
          days: [false, false, false, false, false, false, true, false],
          time: [15, 0, 17, 30],
          priceMod: 15,
          duration: 120,
          img: "IMG-MonsterTamerExpert",
          train: {
            sex: [3, 20],
            ho: [1, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "<<if !$pref.gaping>><span class='bad'><b>WARNING: This contains gaping content</b></span> <</if>> A course only for those dedicated to taking the most amazingly huge insertions. This course will help you challenge the limits imposed by nature, to fit things most people would imagine are impossible. <span class='note' style='color:goldenrod;'>Taking this course <b>will</b> result in permanent stretching of your orifice. Those physically unprepared for this level of activity may find themselves seriously injured.</span>",
          req: {
            sex: 90,
          },
        },
        {
          name: "Expert Riding A",
          days: [false, false, false, false, false, false, true, false],
          time: [15, 0, 17, 30],
          priceMod: 15,
          duration: 120,
          img: "IMG-MonsterTamerExpert",
          train: {
            sex: [3, 20],
            ho: [1, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "<<if !$pref.gaping>><span class='bad'><b>WARNING: This contains gaping content</b></span> <</if>> A course only for those dedicated to taking the most amazingly huge insertions. This course will help you challenge the limits imposed by nature, to fit things most people would imagine are impossible. <span class='note' style='color:goldenrod;'>Taking this course <b>will</b> result in permanent stretching of your orifice. Those physically unprepared for this level of activity may find themselves seriously injured.</span>",
          req: {
            sex: 90,
          },
        },
      ],
      hooks: [],
      instructor: ["Hans", "Gruber", "Sven Diagram"],
      member: true,
      loc: ["downtown", "adult"],
      classContent: [
        {
          course: ["Basic Riding A V", "Basic Riding B V"],
          passage: "none",
          image: "IMG-MonsterTaming",
          // tslint:disable-next-line:max-line-length
          content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentiment you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = 'four'>><<set _result = ↂ.pc.body.pussy.insert(5)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.pussy.insert(5)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.pussy.insert(4)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your pussy'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'You were too tight to tame monsters'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
        },
      {
        course: ["Basic Riding A A", "Basic Riding B A"],
        passage: "none",
        image: "IMG-MonsterTaming",
        // tslint:disable-next-line:max-line-length
        content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentament you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = 'four'>><<set _result = ↂ.pc.body.asshole.insert(5)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.asshole.insert(5)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.asshole.insert(4)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your ass'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'you were too tight to tame monsters'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
      },
      {
        course: ["Intermediate Riding A V", "Intermediate Riding B V"],
        passage: "none",
        image: "IMG-MonsterTaming",
        // tslint:disable-next-line:max-line-length
        content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentament you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = 'seven'>><<set _result = ↂ.pc.body.pussy.insert(8)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.pussy.insert(8)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.pussy.insert(7)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your pussy'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'You were too tight to tame monsters'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
      },
      {
        course: ["Intermediate Riding A A", "Intermediate Riding B A"],
        passage: "none",
        image: "IMG-MonsterTaming",
        // tslint:disable-next-line:max-line-length
        content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentament you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = 'seven'>><<set _result = ↂ.pc.body.asshole.insert(8)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.asshole.insert(8)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.asshole.insert(7)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your ass'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'You were too tight to tame monsters'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
      },
      {
        course: ["Advanced Riding V"],
        passage: "none",
        image: "IMG-MonsterTaming2",
        // tslint:disable-next-line:max-line-length
        content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentament you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = 'ten'>><<set _result = ↂ.pc.body.pussy.insert(11)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.pussy.insert(11)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.pussy.insert(10)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your pussy'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'You were too tight to tame the monster'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
      },
      {
        course: ["Advanced Riding A"],
        passage: "none",
        image: "IMG-MonsterTaming",
        // tslint:disable-next-line:max-line-length
        content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentament you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = 'ten'>><<set _result = ↂ.pc.body.asshole.insert(11)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.asshole.insert(11)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.asshole.insert(10)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your ass'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'You were too tight to tame the monster'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
      },
      {
        course: ["Expert Riding V"],
        passage: "none",
        image: "IMG-MonsterTaming3",
        // tslint:disable-next-line:max-line-length
        content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentament you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = '13'>><<set _result = ↂ.pc.body.pussy.insert(14)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.pussy.insert(14)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.pussy.insert(13)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your pussy'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'You were too tight to tame the monster'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
      },
      {
        course: ["Expert Riding A"],
        passage: "none",
        image: "IMG-MonsterTaming3",
        // tslint:disable-next-line:max-line-length
        content: "With a little trepidation you get prepared for the course. This includes getting changed to free up access down below, but also includes getting yourself lubed up. Probably the first lesson that Hans teaches is the importance of lube, a sentament you heavily agree with. Fortunately, the changing room comes equipped with plenty of lube for either hole, and disposable syringes with nozzles that remind you of a thin douche. It makes putting plenty of lube into your passage a quick-and-easy process, so much so that you occasionally consider getting a reusable one for yourself.<br><<status 1>><<set ↂ.pc.status.wetness = 18>><<run aw.S('pc')>><<set _over = false>><<set _size = '13'>><<set _result = ↂ.pc.body.asshole.insert(14)>><<if _result === 'notfit'>><<set _result = ↂ.pc.body.asshole.insert(14)>><</if>><<if _result === 'notfit'>><<set _over = true>><<set _result = ↂ.pc.body.asshole.insert(13)>><</if>><br><<if _over>>Try as you might, you were unable to make it to the full size training device today, so you had to start with a smaller 'beginner' device. This wouldn't be a big deal, except that you get the distinct impression that some of the other students find the situation funny... <<happy -1 'Having to use the kiddie cock'>><<stress 5 'not fitting a monster in your ass'>><</if>><<switch _result>><<case loose>>You're able to take the <<print _size>>cm diameter training device with ease, barely needing a warmup at all. The ease with which you're able to ride this particular bull makes you wonder if you're ready for a more advanced class.<<satisfy 3 'Monster Taming'>><<case fits>>Your training has paid off, and you're able to tame the <<print _size>>cm diameter training device without trouble. You don't need much warmup, and you're sure you're able to follow along with all the riding exercises.<<satisfy 5 'Monster Taming'>><<case stretch>>This class demonstrated the payoff for hard work as you are finally able to properly ride the <<print _size>>cm training bull. It still took a solid warmup first, unlike some of the other students, but you can definitely see your skills improving.<<satisfy 5 'Monster Taming'>><<case pain>>Today you managed to ride the <<print _size>>cm diameter training bull set out for the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle. You got the impression that you were getting faster at the prep stage. It seems you rushed things a little bit though, as you became quite sore afterward from the too-fast stretching.<<satisfy 4 'Monster Taming'>><<case overstretch>>Today you managed to ride the <<print _size>>cm diameter training bull by the end of the class. It took a lot of prep work and stretching before you finally slipped down onto the saddle, and you really missed a lot of the verbal instruction, but the feat fills you with a sense of accomplishment. You know that you'll be sore later, but you know that sometimes with no pain there's no gain.<<satisfy 4 'Monster Taming'>><<case notfit>>Try as you might, you couldn't even get down on the beginner's saddle properly, even after spending nearly the whole course stretching. It seems that the <<print _size>> cm diameter training device is simply too much for your body to handle right now. Hopefully with a few more lessons, and maybe some 'homework', you'll be able to accomplish it.<<satisfy -15 'You were too tight to satisfy the monster'>><<arousal 3>><<happy -1 'Too tight for a monster'>><<default>>Apologies, it seems an error has occurred while determining what fits in your hole. The result was '<<print _result>>'.<</switch>>",
      },
    ],
      events: [],
    },
    {
      key: "deepDrill",
      name: "Deep Drilling Center for Abyssal Throat Instruction",
      // tslint:disable-next-line:max-line-length
      desc: "Deep Drilling is a competition school through and through, and it shows in the firmly professional facility. While variations of European bull riding--including blood sport--had grown to dominate the European sex sporting scene, there's new competition from North America in the form of 'Cockmongering'. The sport is easy enough for amateurs to take part for fun, but has a surprising depth to the level of strategy and individual sportsmanship. While it's unclear where the sport got it's start, there are clear roots in the Japanese National Hotdog League as well as the San-Fran Sporting Scene.<br><br>Brandyn and Saendra Swallows started their school nearly five years ago. Deep Drilling had a turbulent start, an early participant in Cockmongering before it became a new global phenomenon. Once Appletree High School established it's own Cockmongering team, however, things practically changed overnight for the husband and wife duo. Brandyn handle's most of the school's instruction, while Saendra coaches the very competitive Appletree High Varsity team.",
      img: "IMG-School-DeepDrilling",
      days: [false, true, false, true, true, true, true, true],
      hours: [15, 23],
      basePrice: 9,
      courses: [
        {
          name: "Basic Cockmongering A",
          days: [false, true, false, false, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 9,
          duration: 90,
          img: "IMG-DeepDrillBasic",
          train: {
            oral: [2, 14],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A basic course on Cockmongering, covering the fundamental techniques used in the sport. The school is aware that many students aren't interested in competition, so there's a firm practical bent to the course. You can expect your oral skill to grow, and possibly gain some useful tricks for pulling tricks.",
          req: "none",
        },
        {
          name: "Basic Cockmongering B",
          days: [false, false, false, true, false, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 9,
          duration: 90,
          img: "IMG-DeepDrillBasic",
          train: {
            oral: [2, 14],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A basic course on Cockmongering, covering the fundamental techniques used in the sport. The school is aware that many students aren't interested in competition, so there's a firm practical bent to the course. You can expect your oral skill to grow, and possibly gain some useful tricks for pulling tricks.",
          req: "none",
        },
        {
          name: "Cockmongering A",
          days: [false, false, false, false, false, false, true, false],
          time: [19, 0, 20, 30],
          priceMod: 10,
          duration: 90,
          img: "IMG-DeepDrillNormal",
          train: {
            oral: [2, 16],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A standard course on Cockmongering, with a more casual bent. It focuses on various aspects of handling cock, and helps students improve their technique. It doesn't focus much on actual competition, so the course is more approachable than other offerings. Your oral skills will grow, and possibly your ability to put them to 'work'. Despite being casual, it isn't a course for beginners!",
          req: {
            oral: 50,
          },
        },
        {
          name: "Cockmongering B",
          days: [false, false, false, false, true, false, false, false],
          time: [19, 0, 20, 30],
          priceMod: 10,
          duration: 90,
          img: "IMG-DeepDrillNormal",
          train: {
            oral: [2, 16],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A standard course on Cockmongering, with a more casual bent. It focuses on various aspects of handling cock, and helps students improve their technique. It doesn't focus much on actual competition, so the course is more approachable than other offerings. Your oral skills will grow, and possibly your ability to put them to 'work'. Despite being casual, it isn't a course for beginners!",
          req: {
            oral: 50,
          },
        },
        {
          name: "Competitive Cockmongering",
          days: [false, false, false, false, false, true, false, false],
          time: [19, 0, 21, 0],
          priceMod: 13,
          duration: 120,
          img: "IMG-DeepDrillCompet",
          train: {
            oral: [2, 18],
            ho: [1, 16],
          },
          // tslint:disable-next-line:max-line-length
          desc: "A course for those who are serious about the sport, though not necessarily those looking to compete themselves. (Special coaching for those with potential to join a pro team is offered to select students.) In addition to the inclusion of more advanced exercises with close instruction to improve technique, there's also training on strategy and timing to really transform someone's oral skills. This level of skill also has some other benefits as well.",
          req: {
            oral: 50,
          },
        },
        {
          name: "Deep Drilling",
          days: [false, false, false, false, false, false, false, true],
          time: [15, 0, 17, 30],
          priceMod: 15,
          duration: 120,
          img: "IMG-DeepDrillExpert",
          train: {
            oral: [3, 20],
            ho: [1, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "The course named for the studio itself is something of a master class in deep throat. This class doesn't focus on the sport of Cockmongering, though it's teachings would certainly come in handy for competition. This course teaches skills such as deep throating extra-thick members, taking objects all the way to the bottom of the esophagus, swallow-massage, and advanced breathing techniques. Only the skilled may take this course safely.",
          req: {
            oral: 90,
          },
        },
      ],
      hooks: [],
      instructor: ["Brandyn", "Swallow", "and Saendra"],
      member: true,
      loc: ["downtown", "adult"],
      classContent: [
        {
          course: ["Basic Cockmongering A", "Basic Cockmongering B", "Cockmongering A", "Cockmongering B"],
          passage: "none",
          image: "IMG-DeepDrillCockmonger",
          content: `Today you learned a bit about the early history of the sport. Apparently cockmongering started out using real cocks connected to people.<<has slut || sizeQueen>> To be honest, you were pretty disappointed when you discovered that cockmongering didn't use real cocks, especially in Deep Drill's course.<</has>> You don't really find this surprising, but wonder why cockmongering moved in the less risque direction of artificial cocks. The class answers your question though: it's all about access and fairness. For one thing, it can be difficult to find enough well-endowed men, particularly for smaller matches. So if the sport wanted to be something available to the masses, they needed to use something accessible. The other part is fairness, as no two cocks are going to be alike, which gives one side an advantage. While this may be part of the fun in a rough-and-tumble San Francisco street match, it won't work for serious competition. With artificial cocks, everything from size to ejaculation force can be fairly matched.`,
        },
        {
          course: ["Basic Cockmongering A", "Basic Cockmongering B", "Cockmongering A", "Cockmongering B"],
          passage: "none",
          image: "IMG-DeepDrillCockmonger",
          content: `Today you learned some about the setup of a competition cockmongering match. Cockmongering actually has a surprising depth of strategy for a game that's essentially about sucking cock. Much like video games, cockmongering has several different competition "modes" that allow for a range of competitors. An individual match may be one vs one or go all the way up to five vs five, and there are also variants to allow three-way or four-way matches between multiple teams. Whatever the configuration, the basic rules always stay the same, while more detailed rules are generally pretty consistent. You have to admit that it's a pretty good setup to be friendly to casual play and new players while still allowing for interesting competition.<br><br>A game of cockmongering consists of multiple matches, always an odd number. The team that wins the most matches wins the game. Five is the usual number for professional matches, but this varies based on the available time and number of teams involved. Having matches this way adds some interesting team-level strategy, as the coach has to decide which team members to use for which match. The period between matches are treated like the end of a quarter or halftime in more traditional sports, giving fans a chance to get more beer and snacks. You've definitely become more interested in watching some local high school or college matches!`,
        },
        {
          course: ["Basic Cockmongering A", "Basic Cockmongering B", "Cockmongering A", "Cockmongering B"],
          passage: "none",
          image: "IMG-DeepDrillCockmonger",
          content: `Today you learned a little about the setup of the gloryhole--simply "hole" in common parlance--the location where the action takes place. Each player has their own hole, which can be set up in a pretty large variety of configurations. This means that the players themselves don't actually directly interact with each other, and depending on the setup for that match may not even be able to see them. Of course small recreational matches sometimes use a larger combined hole, but the most common setup is to have at least two. Depending on the specific match, each player may have their own hole, or there may be multiple players (from the same team) in the same hole or holes.<br><br>Each hole has a variable number of play surfaces (called walls), which are arranged in the general size and shape of a public restroom stall. while play surfaces have cocks coming out of them, there are often non-active dummy walls to form a stable structure and provide more surfaces to push off of. In most cases the walls are actually constructed out of a clear resin material, which allows spectators to watch the action directly. A special coating repels bodily fluids, and greatly helps with cleanup.<br><br>A gloryhole can have anywhere from one to six walls be active, which includes the floor and ceiling. The "Cockmageddon" setup, for example, utilizes every wall, greatly adding to the challenge. While the long walls--including the floor and ceiling--are one wall structurally, they are subdivided into two sections, each called a wall. A configuration where both floor sections, and both sections of a long wall are in play would be called a "4-wall" configuration, even though only two surfaces are play areas. It's easy to see how the changing play area can really vary the game while leaving the essential mechanics the same.`,
        },
        {
          course: ["Basic Cockmongering A", "Basic Cockmongering B", "Cockmongering A", "Cockmongering B"],
          passage: "none",
          image: "IMG-DeepDrillCockmonger",
          content: `Today you had a lesson about the basics of cockmongering. While actually putting things into practice is a bit more complicated, the general concept is similar to an imaginary gloryhole. At the start of the game, the player is presented with play surfaces that have cocks sticking out of them in a somewhat random configuration. Removing actual people connected to those cocks actually increased the amount of variation possible dramatically, both in terms of position and shape. The player's job as a cockmonger is basically to mind the cocks. Cocks that are neglected for too long will be withdrawn, meaning that the player loses out on potential points. Cocks use sensors and a specific algorithm to determine their behavior. When they receive enough pleasure they ejaculate. Thus cocks can either be lost of satisfied.<br><br>This doesn't end with just sucking a bunch of cock, however. Cocks that are lost or satisfied are added to the opponent's hole, and are called revenge cocks (fresh units are prepositioned at each hole, and enter automatically for this). A player can satisfy a revenge cock for bonus points. In some games the players start out with all the cocks on the field, and in others they are added after a certain number of cocks in the hole have left the field. Points generally come down to four areas: <ul><li>Points for satisfying a cock, which vary from 2 to 5 based on the cock's size and shape difficulty.</li><li>Points for the disposition of the semen, spilt semen is worth zero points, while swallowed semen is worth full points.</li><li>Points for the speed the player finishes satisfying their main cocks.</li><li>Points for satisfying revenge cocks.</li></ul>`,
        },
        {
          course: ["Basic Cockmongering A", "Basic Cockmongering B", "Cockmongering A", "Cockmongering B"],
          passage: "none",
          image: "IMG-DeepDrillCockmonger",
          content: `Today's lesson focused a lot on the individual player's strategy at cockmongering. The essential skills for the game include the ability to deepthroat and please cock quickly, dexterity to reach and tend to cocks, and the ability to multitask and think on one's feet. Determining the best timing to finish off a cock, and thereby send it at your opponent can be very important. With good timing you can cause them to miss out on bonus points or even be overwhelmed and lose a main cock. A practice called edging is used to keep one or more cocks on the edge of ejaculation so that they can all be satisfied rapidly back-to-back to send a "flood of cock" at the opponent. This of course caries a level of risk, because accidentally finishing off a cock and missing the cum can cost a lot of points, particularly if it's a gusher. While satisfying a cock does earn points, the majority of points earned from satisfying them come from the ejaculation, as each ml is worth as much as 0.2 points.<br><br>While the importance of satisfying all your cocks quickly toward earning time-based points can vary with the type of match, being able to quickly get them off is still a very important skill to master. It gives you more flexibility in sending revenge cocks as well as successfully satisfying all of your main cocks. For this deep throat is critical, as well as the ability to squeeze and quickly bob while doing so. It also makes capturing all of the semen easier with less chance for accidental spillage.<br><br>Dexterity is critical for tending cock, which is the practice of using hands, feet, and other body parts to stroke cocks on the field periodically to keep them from being lost. You also get a bit of a bonus lesson here, as like many people you were wondering about using other orifices to tend cocks. While it seems natural, and actually used to be allowed before rules were officially codified, it's now strictly forbidden. Disallowing the use of anuses or vaginas helped turn cockmongering into a truly unisex sport, where any gender or body type can compete together fairly.`,
        },
        {
          course: ["Competitive Cockmongering"],
          passage: "none",
          image: "IMG-DeepDrillCockmonger3",
          content: `This course takes really takes Cockmongering seriously, though you still see some hungry smiles among the fellow students. Each class usually breaks down into three different parts: Strategy, Technique, and Practical. Brandyn usually starts each class with a segment on strategy, which transitions naturally into the segment on the technique/s needed for that strategy. Afterward comes the practical portion, where you put what you learned into practice. Unlike the simpler courses that use "dry" cocks, this course uses competition members and semen so it's just like playing a competition match.`,
        },
        {
          course: ["Deep Drilling"],
          passage: "none",
          image: "IMG-DeepDrillCockmonger2",
          content: `Unlike many of the other courses, the deep drilling course is mostly practical exercises and instruction, and doesn't have much of a lecture component. Of course, the main objective of this class means that detailed lectures aren't really that important...`,
        },
      ],
      events: [],
    },
    {
      key: "freakDance",
      name: "Freak Dance Dancing School",
      // tslint:disable-next-line:max-line-length
      desc: "While it may not look like it at first glance, the Freak Dance Dancing School is a fairly serious school teaching modern popular dance in the broad style of fuck dancing. Classic freak dance was popular in the 2010s, and was a dominant dance style for hip hop and R&B music, as well as spawning variants for other music genres such as dance, club, and New Orleans bounce. Its origin isn't entirely clear, but is suspected to have begun in the mid twenty-aughts as a offshoot of the grind, with more focus on the sexual pleasure and 'dry sex' aspects of the dance. Freak dance added the attempt to achieve orgasm or bring your partner to orgasm while dancing, though this remained a subset of the overall dance. The 20s saw some changes to the dance, such as an adoption of Jamaican daggering dry sex dance. For the most part, however, freak dance faded in popularity, replaced in the hip hop scene by twerk derivatives and fad dances.<br><br>Freak dance itself spawned 'fuck dance' in the late 20s, where elements of daggering, sexual pleasure, and changing social norms merged to create the new style. Unlike previous dances, fuck dancing often involves sexual contact, and some forms could be described simply as having sex while dancing. While early fuck dancing focused more on dancing in a gray zone where it wasn't obvious if any sexual activity was going on, the dance is slowly changing to focus more on the pleasure and artistic possibilities of sex dances. The popular formats of the dance are now much more explicit--being obvious sexual activity--now that boundaries have shifted as to what is acceptable at a party or club. The less explicit forms of the dance remain popular in more restrictive settings, however, such as school dances.<br><br>Miss DeeDee Johnson has a strong appreciation for hip hop dance, and was a professional dancer before opening the Freak Dance Studio in Appletree. Her professional resume includes performances in the movies '<i>Step Up 12: Step Harder</i>', '<i>Bring it Hard</i>', and '<i>Ridin' Ta'nite</i>'. She has also performed in several music videos, including a lead role in the video '<i>Drip My Jizz Ho</i>' by artist Mistr Big-Dik.",
      img: "IMG-School-FreakDance",
      days: [false, true, true, true, true, true, true, false],
      hours: [12, 20],
      basePrice: 7,
      courses: [
        {
          name: "Dance Freaky",
          days: [false, true, false, true, false, true, false, false],
          time: [14, 0, 21, 0],
          priceMod: 8,
          duration: 65,
          img: "IMG-FreakDanceFreak",
          train: {
            dance: [1, 16],
            exhib: [1, 14],
            exercise: 2,
          },
          // tslint:disable-next-line:max-line-length
          desc: "A fairly standard dance class, scheduled for the 'odd' days of the week. It provides good dance instruction and solid exercise, with some practical exhibitionism knowledge required for freak dancing.",
          req: "none",
        },
        {
          name: "Dance Cool",
          days: [false, false, true, false, true, false, true, false],
          time: [14, 0, 21, 0],
          priceMod: 8,
          duration: 65,
          img: "IMG-FreakDanceCool",
          train: {
            dance: [1, 16],
            exhib: [1, 14],
            exercise: 2,
          },
          // tslint:disable-next-line:max-line-length
          desc: "A fairly standard dance class, scheduled for the 'even' days of the week. It provides good dance instruction and solid exercise, with some practical exhibitionism knowledge required for freak dancing.",
          req: "none",
        },
        {
          name: "Drunk Dance",
          days: [false, false, false, false, false, false, true, false],
          time: [14, 0, 21, 0],
          priceMod: 6,
          duration: 120,
          img: "IMG-FreakDanceDrunk",
          train: {
            dance: [2, 16],
            exhib: [2, 14],
            exercise: 3,
          },
          // tslint:disable-next-line:max-line-length
          desc: "For those with a busy schedule, there is the weekend dance course. It's a double-length course offered on Saturdays. You won't get as much out of it as 3 full classes, but it's more convenient and has a slightly-better price tag.",
          req: "none",
        },
        {
          name: "Dance Slut",
          days: [false, false, true, false, true, false, false, false],
          time: [14, 0, 21, 0],
          priceMod: 14,
          duration: 95,
          img: "IMG-FreakDanceSlut",
          train: {
            dance: [2, 19],
            exhib: [1, 18],
            exercise: 3,
          },
          // tslint:disable-next-line:max-line-length
          desc: "An advanced freakdance class with longer class times and more intense instruction. A heavy focus on dancing with solid exhibitionism, and good exercise as well.",
          req: {
            dance: 70,
            exhib: 50,
          },
        },
      ],
      hooks: [],
      instructor: ["DeeDee", "Johnson", "THICC-THOT"],
      member: true,
      loc: ["downtown", "northeast"],
      classContent: [
        {
          course: ["Dance Freaky", "Dance Cool"],
          passage: "none",
          image: "IMG-FreakDance0",
          content: `DeeDee approaches this course as if freak dancing was some sort of legitimate style of dance comparable to things like ballet or ballroom dancing that have centuries of history behind them. Asside from being a bit absurd--even if the dance style has been gaining popularity for the last couple decades--it also has surprisingly little actual sex or even play with dildos. The course focuses heavily on the movements, as well as a certain down-to-earth instruction on how to hide what's really going on between two dancers. After all, while sex on the dance floor may be common these days, it still isn't exactly allowed at most establishments.`,
        },
        {
          course: ["Drunk Dance", "Dance Slut"],
          passage: "none",
          image: "IMG-FreakDance1",
          content: `This class is a little more hands-on than DeeDee's other courses, and involves some play involving strap-ons. It really seems to frustrate the men in the class, but you have to admit that keeping things "professional" is probably the safest business decision.`,
        },
      ],
      events: [],
    },
    {
      key: "fubbsParlor",
      name: "Mrs. Fubb's Parlor",
      // tslint:disable-next-line:max-line-length
      desc: "Mrs. Fubb's Parlor gives off an air of old-world refinement, and generally looks like something you'd expect to see in a melodrama set in the Victorian era. Underneath that prim-and-proper veneer, however, is a very modern school focused on improving people's ability to interact socially. It's a valuable set of skills to learn, because electronic communication has failed to supplant certain important areas of human interaction. Though perhaps perplexing at first, this school is also a tea shop that sells a rather extensive range of traditional and herbal teas. While Mrs. Fubb's love of tea is probably a big reason for this, she also claims that social rituals like these can be very valuable to her students.<br><br>Mrs. Fubbs herself is something of an enigma, and despite the amount of talking that goes on in her courses, she doesn't reveal much about herself. While she does give off a very matronly air that proclaims experience and authority, it's plain from her appearance that she isn't much older than thirty years old. While she calls herself 'Mrs.', there isn't a sign of a husband anywhere, and on occasion she gives the distinct impression that she's a doctor rather than a teacher. Despite the peculiarities, her school has good reputation both in its level of professionalism and the effectiveness of the education offered there. Because many of the school's courses are specifically for children and teenagers, there's only a limited array of evening courses for adults.",
      img: "IMG-School-Fubb",
      days: [false, true, true, true, true, true, false, false],
      hours: [11, 19],
      basePrice: 10,
      courses: [
        {
          name: "Introductory Finishing Course",
          days: [false, true, false, true, false, true, false, false],
          time: [18, 0, 19, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-FubbsIntroCourse",
          train: {
            com: [1, 15],
            sed: [1, 10],
            art: [1, 10],
          },
          // tslint:disable-next-line:max-line-length
          desc: "Mrs. Fubb's Introductory Finishing Course is pretty much what the name implies. It's a course focusing on proper communication and social refinement. Unlike the somewhat anachronistic name, however, it's focused on the modern era rather than historical ideals of politeness. This is a beginner's course, suitable for just about anyone starting out. The course materials indicate that it may improve your appreciation of aesthetics and your ability to deal with the opposite gender, though communication is obviously the focus.",
          req: "none",
        },
        {
          name: "Advanced Finishing Course",
          days: [false, true, false, true, false, true, false, false],
          time: [19, 0, 20, 0],
          priceMod: 12,
          duration: 65,
          img: "IMG-FubbsAdvanceCourse",
          train: {
            com: [1, 17],
            sed: [1, 13],
            art: [1, 13],
          },
          // tslint:disable-next-line:max-line-length
          desc: "The Advanced Finishing Course instructs students on the same array of social skills as the introductory course, simply at a more advanced level. Even those that are skilled in social situations are likely to be able to learn something from this course, though it doesn't require one to be an expert.",
          req: {
            com: 60,
            art: 30,
            sed: 30,
          },
        },
        {
          name: "The Womanly Arts",
          days: [false, false, true, false, true, false, false, false],
          time: [18, 0, 19, 0],
          priceMod: 12,
          duration: 65,
          img: "IMG-FubbsWomanlyArts",
          train: {
            art: [2, 17],
            com: [1, 13],
          },
          // tslint:disable-next-line:max-line-length
          desc: "The Womanly Arts is a course focused heavily on aesthetics and artistic expression, both in terms of general creativity and specific subjects. It's by no means a class on makeup or hair styling, but students will find themselves able to perform better in those areas simply as a consequence. There is also some benefit to communication, though the scope is far more narrow than in one of the finishing courses.",
          req: {
            art: 65,
            com: 40,
          },
        },
        {
          name: "Into Your Parlor",
          days: [false, false, true, false, true, false, false, false],
          time: [19, 0, 20, 0],
          priceMod: 14,
          duration: 65,
          img: "IMG-FubbsSeductCourse",
          train: {
            sed: [2, 17],
            com: [1, 13],
          },
          // tslint:disable-next-line:max-line-length
          desc: "Into Your Parlor is a play on words alluding to the subject of the class, which in more practical terms is simply seduction and your ability to handle the opposite sex. After taking this course you should be more than capable of getting men into your own parlor, at least according to the class information.",
          req: {
            sed: 65,
            com: 40,
          },
        },
      ],
      hooks: [],
      instructor: ["Viola", "Fubb", "Iron-Lips"],
      member: false,
      loc: ["downtown", "southeast"],
      classContent: [
        {
          course: ["Introductory Finishing Course"],
          passage: "none",
          image: "IMG-FubbingIt4",
          content: "none",
        },
        {
          course: ["Advanced Finishing Course"],
          passage: "none",
          image: "IMG-FubbingIt1",
          content: "none",
        },
        {
          course: ["The Womanly Arts"],
          passage: "none",
          image: "IMG-FubbingIt2",
          content: "none",
        },
        {
          course: ["Into Your Parlor"],
          passage: "none",
          image: "IMG-FubbingIt3",
          content: "none",
        },
      ],
      events: [],
    },
    {
      key: "maid",
      name: "Maid Pouffiasse",
      // tslint:disable-next-line:max-line-length
      desc: "Maid Pouffiasse is the creation of Chatte Souillon, a French national and entrepreneur. Rather than a simple housecleaning service, she focused on providing traditional full-service maids to the the well-off population of Appletree. Highly trained maids in traditional garb are available for a wide range of cleaning schedules, some even including full-time maid service. While the service is considerably more expensive than a an industrial service, clients agree that the superior quality is worth it. A long-standing problem with providing well-trained professional maids is the need for training, because it's very unusual to find a prospective maid that meets miss Souillon's standards. To that end, she also started a training school by the same name. The school not-only simplifies the process of training new hires, it also provides secondary revenue from public courses, and builds on the Pouffiasse brand.<br><br>Chatte is the primary instructor at the school, having attended traditional training in Marsailles herself. While many believe her name to be both refined and beautiful, she's adopted the nickname 'Alice'. According to her, she found the mispronunciation distasteful and chose the name of a sitcom maid that would be easier for Americans to pronounce. In addition to courses on cleaning, she also offers courses on both cooking and shopping, both of which are useful skills for a proper maid.",
      img: "IMG-School-Maid",
      days: [false, true, true, true, true, true, true, false],
      hours: [15, 20],
      basePrice: 8,
      courses: [
        {
          name: "Le Petite Clean 1",
          days: [false, true, false, true, false, true, false, false],
          time: [18, 0, 19, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-PouffiasseClean",
          train: {
            clean: [2, 15],
            org: [1, 10],
          },
          // tslint:disable-next-line:max-line-length
          desc: "Le Petite Clean is a no-nonsense course on the essentials of cleaning. It's offered in two schedules, and focuses primarily on cleaning tasks the student would find useful on a day-to-day basis at home. There's also a small amount of instruction on organization, which fits naturally as it can often accompany cleaning. This course is offered on two alternating schedules with slightly different times to maximize availability.",
          req: "none",
        },
        {
          name: "Le Petite Clean 2",
          days: [false, false, true, false, true, false, true, false],
          time: [19, 0, 20, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-PouffiasseClean",
          train: {
            clean: [2, 15],
            org: [1, 10],
          },
          // tslint:disable-next-line:max-line-length
          desc: "Le Petite Clean is a no-nonsense course on the essentials of cleaning. It's offered in two schedules, and focuses primarily on cleaning tasks the student would find useful on a day-to-day basis at home. There's also a small amount of instruction on organization, which fits naturally as it can often accompany cleaning. This course is offered on two alternating schedules with slightly different times to maximize availability.",
          req: "none",
        },
        {
          name: "Le Gros Clean",
          days: [false, true, false, true, false, true, false, false],
          time: [18, 0, 19, 0],
          priceMod: 12,
          duration: 65,
          img: "IMG-PouffiasseGros",
          train: {
            clean: [2, 17],
            org: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "Le Gros Clean is the course aimed toward more advanced cleaning techniques, and focuses a lot more on the in-depth cleaning that is performed infrequently. This course also has better instruction on organization, as it's essential for some deep-cleaning tasks. It's essential to have a firm grasp of the basics to get the most out of this course, and as such it isn't taught as frequently as the beginner course, as many students find that level of instruction sufficient.",
          req: {
            clean: 60,
            org: 30,
          },
        },
        {
          name: "La Allumer Chef 1",
          days: [false, false, true, false, true, false, true, false],
          time: [18, 0, 19, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-PouffiasseChef",
          train: {
            cook: [2, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "La Allumer Chef may not be what the common person imagines when they think of the combination of 'French' and 'cooking'. This course focuses on common home cooking, rather than elegant meals prepared in a French restaurant. Essentially, it focuses on the kind of food a maid may be asked to prepare, which also happens to be well-suited to the home kitchens of many students. While certainly down-to-earth, the methods and techniques taught still have an essential french flair.",
          req: "none",
        },
        {
          name: "La Allumer Chef 2",
          days: [false, true, false, true, false, true, false, false],
          time: [19, 0, 20, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-PouffiasseChef",
          train: {
            cook: [2, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "La Allumer Chef may not be what the common person imagines when they think of the combination of 'French' and 'cooking'. This course focuses on common home cooking, rather than elegant meals prepared in a French restaurant. Essentially, it focuses on the kind of food a maid may be asked to prepare, which also happens to be well-suited to the home kitchens of many students. While certainly down-to-earth, the methods and techniques taught still have an essential french flair.",
          req: "none",
        },
        {
          name: "La Salope Shopping",
          days: [false, false, true, false, true, false, true, false],
          time: [18, 0, 19, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-PouffiasseShop",
          train: {
            shop: [2, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "La Salope Shopping is a course focused on the practicalities of shopping, which makes it a little less fun than some would hope. You can expect to learn several tips to save money, such as buying while prices are cheaper, and not overstocking on perishables. There's also a certain level of instruction on haggling involved, which can help get a bargain in a pinch.",
          req: "none",
        },
      ],
      hooks: [],
      instructor: ["Chatte", "Souillon", "Alice"],
      member: false,
      loc: ["downtown", "east"],
      classContent: [
        {
          course: ["Le Petite Clean 1", "Le Petite Clean 2"],
          passage: "School-Pouffiasse-Clean1",
          image: "IMG-PouffiasseClean1",
          content: `none`,
        },
        {
          course: ["Le Gros Clean"],
          passage: "School-Pouffiasse-Clean2",
          image: "IMG-PouffiasseClean2",
          content: `none`,
        },
        {
          course: ["La Allumer Chef 1", "La Allumer Chef 2"],
          passage: "School-Pouffiasse-Cook",
          image: "IMG-PouffiasseCook",
          content: `none`,
        },
        {
          course: ["La Salope Shopping"],
          passage: "School-Pouffiasse-Shop",
          image: "IMG-PouffiasseShopping",
          content: `none`,
        },
      ],
      events: [],
    },
    {
      key: "profession",
      name: "The Oldest Profession",
      // tslint:disable-next-line:max-line-length
      desc: "There is an old proverb that sums up the motivation behind The Oldest Profession, and it's enshrined on the wall in the lobby. <i>If you build a man a fire, he'll be warm for the night. If you light a man on fire, he'll be warm for the rest of his life.</i> Paul DaHoe believes strongly in helping the community by teaching skills important to the workplace. The school offers several courses that teach skills valuable to those wishing to become--or remain--employed. The courses themselves are all heavily discounted, with quite reasonable fees, thanks to sponsorship and donations. Paul himself says that the reason the classes aren't free is because then the students wouldn't value them.<br><br>Paul's full name is 'Pimp P-Ditty DaHoe', but he's plenty happy to go by Paul. He grew up in poverty with a less-than-beneficial family situation; after all, his parents did name him 'Pimp'. Apparently his grandfather changed the family name of Dafoe to DaHoe, which resulted in that humorous combination 'Pimp Da Hoe'. Despite his disadvantaged start in life, he has still been able to make something of himself. He saw the founding of Appletree as a golden opportunity; a new town that would have need of his services. His courses have a unique down-to-earth slant to them, often presenting valuable instruction in terms and scenarios that even the most disadvantaged person would be familiar with.",
      img: "IMG-School-OldestProfession",
      days: [false, true, true, true, true, true, true, false],
      hours: [16, 21],
      basePrice: 4,
      courses: [
        {
          name: "Jobbing 101A",
          days: [false, true, false, true, false, true, false, false],
          time: [18, 0, 19, 0],
          priceMod: 6,
          duration: 65,
          img: "IMG-OldestProfJobbing",
          train: {
            org: [1, 12],
            prob: [1, 11],
            fin: [1, 11],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "This course is all about being better prepared for employment. It starts at a level approachable to just about anyone, as long as they're at least close to having a high school diploma. It teaches useful skills in organization, problem solving, and finance.",
          req: "none",
        },
        {
          name: "Jobbing 101B",
          days: [false, false, true, false, true, false, true, false],
          time: [20, 0, 21, 0],
          priceMod: 6,
          duration: 65,
          img: "IMG-OldestProfJobbing",
          train: {
            org: [1, 12],
            prob: [1, 11],
            fin: [1, 11],
            ho: [1, 12],
          },
          // tslint:disable-next-line:max-line-length
          desc: "This course is all about being better prepared for employment. It starts at a level approachable to just about anyone, as long as they're at least close to having a high school diploma. It teaches useful skills in organization, problem solving, and finance.",
          req: "none",
        },
        {
          name: "Jobbing 201A",
          days: [false, true, false, true, false, true, false, false],
          time: [20, 0, 21, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-OldestProfJobbing2",
          train: {
            org: [1, 14],
            prob: [1, 13],
            fin: [1, 13],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "Like its predecessor, this course is all about being better prepared for employment. It starts at a more advanced level, but is still quite approachable for most people. It teaches useful skills in organization, problem solving, and finance.",
          req: {
            fin: 30,
            org: 40,
            prob: 30,
            ho: 30,
          },
        },
        {
          name: "Jobbing 201B",
          days: [false, false, true, false, true, false, true, false],
          time: [20, 0, 21, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-OldestProfJobbing2",
          train: {
            org: [1, 14],
            prob: [1, 13],
            fin: [1, 13],
            ho: [1, 14],
          },
          // tslint:disable-next-line:max-line-length
          desc: "Like its predecessor, this course is all about being better prepared for employment. It starts at a more advanced level, but is still quite approachable for most people. It teaches useful skills in organization, problem solving, and finance.",
          req: {
            fin: 30,
            org: 40,
            prob: 30,
            ho: 30,
          },
        },
        {
          name: "Street Freakonomics 301A",
          days: [false, false, true, false, true, false, true, false],
          time: [18, 0, 19, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-OldestProfFreako",
          train: {
            fin: [1, 15],
            ho: [1, 16],
          },
          // tslint:disable-next-line:max-line-length
          desc: "The Street Freakonomics course focuses on economics, but coached in a way that is easily approachable by students with a basic understanding of the subject. If one had a certain persuasion, this kind of education would certainly be useful for someone looking for <i>self employment.</i>",
          req: {
            fin: 50,
            ho: 50,
          },
        },
        {
          name: "Street Freakonomics 301B",
          days: [false, true, false, true, false, true, false, false],
          time: [20, 0, 21, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-OldestProfFreako",
          train: {
            fin: [1, 15],
            ho: [1, 16],
          },
          // tslint:disable-next-line:max-line-length
          desc: "The Street Freakonomics course focuses on economics, but coached in a way that is easily approachable by students with a basic understanding of the subject. If one had a certain persuasion, this kind of education would certainly be useful for someone looking for <i>self employment.</i>",
          req: {
            fin: 50,
            ho: 50,
          },
        },
        {
          name: "Figuring it Out 301",
          days: [false, false, true, false, true, false, true, false],
          time: [19, 0, 20, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-OldestProfFigure",
          train: {
            prob: [1, 15],
            ho: [1, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "The Figuring it Out course focuses on creative problem solving, using relatable examples that have real-world applications. The course remains easily approachable by students with a basic understanding of the subject.",
          req: {
            prob: 50,
            ho: 30,
          },
        },
        {
          name: "Organized 301",
          days: [false, false, true, false, true, false, true, false],
          time: [19, 0, 20, 0],
          priceMod: 9,
          duration: 65,
          img: "IMG-OldestProfOrganized",
          train: {
            org: [1, 15],
            ho: [1, 15],
          },
          // tslint:disable-next-line:max-line-length
          desc: "The Organized course takes real world examples of organizations, commonly taking advantage of criminal organizations. While there is a certainly information related to organization as in a group of people, the main focus is in more mundane organization that would be useful in a job setting.",
          req: {
            org: 50,
            ho: 30,
          },
        },
      ],
      hooks: [],
      instructor: ["Pimp", "DaHoe", "Paul"],
      member: true,
      loc: ["downtown", "southwest"],
      classContent: [
        {
          course: ["Jobbing 101A", "Jobbing 101B"],
          passage: "School-OldProf-Jobbing1",
          image: "none",
          content: "none",
        },
        {
          course: ["Jobbing 201A", "Jobbing 201B"],
          passage: "School-OldProf-Jobbing2",
          image: "none",
          content: "none",
        },
        {
          course: ["Street Freakonomics 301B", "Street Freakonomics 301A"],
          passage: "School-OldProf-Freak",
          image: "IMG-SchoolOP-Accounting",
          content: "none",
        },
        {
          course: ["Figuring it Out 301"],
          passage: "School-OldProf-Figure",
          image: "IMG-OldestProfJob4",
          content: "none",
        },
        {
          course: ["Organized 301"],
          passage: "School-OldProf-Organ",
          image: "IMG-OldestProfJob3",
          content: "none",
        },
      ],
      events: [],
    },
  ];
  for (let i = 0, c = schools.length; i < c; i++) {
    aw.school[schools[i].key] = new School(schools[i]);
  }
};

setup.school.define();

/* Template!

    {
      key: ,
      name: ,
      desc: ,
      img: ,
      days: [],
      hours:[,],
      basePrice: ,
      courses: [
        {
          name: ,
          days: [],
          time: [],
          priceMod: ,
          duration: ,
          train: {

          },
          desc: ,
          req: ,
        }
      ],
      hooks: [],
      instructor: ,
      member: ,
      loc: [],
    },

*/
