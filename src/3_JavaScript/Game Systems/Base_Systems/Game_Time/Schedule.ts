
// ███████╗ ██████╗██╗  ██╗███████╗██████╗ ██╗   ██╗██╗     ███████╗
// ██╔════╝██╔════╝██║  ██║██╔════╝██╔══██╗██║   ██║██║     ██╔════╝
// ███████╗██║     ███████║█████╗  ██║  ██║██║   ██║██║     █████╗
// ╚════██║██║     ██╔══██║██╔══╝  ██║  ██║██║   ██║██║     ██╔══╝
// ███████║╚██████╗██║  ██║███████╗██████╔╝╚██████╔╝███████╗███████╗
// ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚══════╝
//

// VODKA MEANS THE PART THAT NEED MY ATTENTION LATER, JUST A PERSONAL FLAG :)

// ======= INTERFACE ========

interface setupSchedule {
  // tslint:disable-next-line:max-line-length
  new: (name: string, type: "quest" | "reminder" | "npcPlans" | "groupPlans" | "date" | "hangout", alert: boolean, start: number, end: number | false, place: string | false, locmap: string | false, missed: boolean, npc?: string[] | false, msg?: string | false, disc?: string | false) => void;
  process: () => void;
  cleaner: () => void;
  appointments: (time: number) => plan[] | false;
  calendar: () => twee;
}

interface plans {
  upcoming: plan[];
  current: plan[];
  past: plan[];
}

interface plan {
  name: string;
  type: "quest" | "reminder" | "npcPlans" | "groupPlans" | "date" | "hangout";
  alert: boolean;
  start: number;
  end: number | false;
  place: string | false;
  locmap: string[] | string | false;
  missed: boolean;
  npc: string[] | false;
  msg?: string | false;
  disc?: string | false;
}

// NAMESPACE

if (setup.sched == null) {
  setup.sched = {} as any;
}
if (ↂ.plans == null) {
  ↂ.plans = {} as any;
}
if (ↂ.plans.upcoming == null) {
  ↂ.plans = {} as plans;
}
if (ↂ.plans.current == null) {
  ↂ.plans = {} as plans;
}
if (ↂ.plans.past == null) {
  ↂ.plans = {} as plans;
}

// ======= FUNCTIONS ========

// adds an appointment to the schedule
setup.sched.new = function(name, type, alert, start, end, place, locmap, missed, npc, msg, disc) {
  const today = setup.time.nowDay();
  const startDay = Math.floor(start / 1440);
  const todayDay = Math.floor(today / 1440);
  let timePlace;
  try {
    if (msg == null) {
      msg = false;
    }
    if (npc == null) {
      npc = false;
    }
    if (disc == null) {
      disc = false;
    }
    if (startDay > todayDay) { // not today
      aw.con.info(`New ${name} appointment was set to future.`);
      ↂ.plans.upcoming.push({name, type, alert, start, end, place, locmap, missed, npc, msg, disc});
      timePlace = "upcoming";
    } else if (todayDay === todayDay && start > today) { // today but later
      aw.con.info(`New ${name} appointment was set to later today.`);
      ↂ.plans.current.push({name, type, alert, start, end, place, locmap, missed, npc, msg, disc});
      timePlace = "current";
    } else { // past?!
      aw.con.info(`A bit weird, ${name} appointment time is ${start} which is already past.`);
      ↂ.plans.past.push({name, type, alert, start, end, place, locmap, missed, npc, msg, disc});
      timePlace = "past";
    }
    aw.con.info(`Appointment "${name}" was pushed to the ↂ.plans.${timePlace}.`);
  } catch (e) {
    aw.con.warn(`Error in setup.sched.new, ${e}`);
  }
};

setup.sched.process = function() { // intended to be started each night
  try {
    let first = 0;
    let second = 0;
    const today = setup.time.nowDay();
    // lets start by moving current to old
    for (let i = 0; i < ↂ.plans.current.length; i++) {
      if (ↂ.plans.current[i] !== null) {
        ↂ.plans.past.push(clone(ↂ.plans.current[i]));
        first++;
      }
    }
    ↂ.plans.current = [];
    aw.con.info(`setup.sched.process finished the first part. ${first} plans were moved to the ↂ.plans.past`);
    // now future to current
    const todayDay = Math.floor(today / 1440);
    const tempUpcoming = [] as plan[];
    for (let i = 0; i < ↂ.plans.upcoming.length; i++) { // to fix the array length
      if (ↂ.plans.upcoming[i] !== null) {
        tempUpcoming.push(clone(ↂ.plans.upcoming[i]));
      }
    }
    ↂ.plans.upcoming = tempUpcoming;
    const deleted = [] as number[];
    for (let i = 0; i < ↂ.plans.upcoming.length; i++) {
      aw.con.info(`plan ${i}, lets go...`);
      if (ↂ.plans.upcoming[i] !== null && ↂ.plans.upcoming[i].name !== null) {
        const startDay = Math.floor(ↂ.plans.upcoming[i].start / 1440);
        aw.con.info(`plan ${i}, ${ↂ.plans.upcoming[i].start}, ${startDay}`);
        // actual processing
        if (startDay === todayDay) {
          aw.con.info(`plan ${i}, ${startDay} === ${todayDay}`);
          ↂ.plans.current.push(clone(ↂ.plans.upcoming[i]));
          deleted.push(i);
          second++;
        }
      }
    }
    aw.con.info(`to be deleted: ${deleted}`);
    for (let ii = 0; ii < deleted.length; ii++) {
      aw.con.info(`deleted ↂ.plans.upcoming[${ii}], ${ↂ.plans.upcoming[ii].name}`);
      delete ↂ.plans.upcoming[ii];
    }
    aw.con.info(`setup.sched.process finished the second part. ${second} plans were moved to the ↂ.plans.current`);
  } catch (e) {
    aw.con.warn(`Error in setup.sched.process, ${e}`);
  }
  };

setup.sched.cleaner = function() {
  try {
    const today = setup.time.nowDay();
    const todayDay = Math.floor(today / 1440);
    for (let i = (ↂ.plans.past.length - 1); i > 0; i--) {
      if (ↂ.plans.past[i] === undefined || ↂ.plans.past[i] === null) {
        ↂ.plans.past.splice(i, 1);
      } else {
        const startDay = Math.floor(ↂ.plans.past[i].start / 1440);
        if (startDay < (todayDay - 30)) {
          delete ↂ.plans.past[i];
        }
      }
    }
    aw.con.info(`setup.sched.cleaner finished.`);
  } catch (e) {
    aw.con.warn(`Error in setup.sched.cleaner, ${e}`);
  }
};

// show what is on the list for the day matching the time (unix-styled)
setup.sched.appointments = function(time: number): plan[] | false { 
  try {
    const today = setup.time.nowDay();
    const todayDay = Math.floor(today / 1440);
    const targetDay = Math.floor(time / 1440);
    let place = "current";
    const out = [] as plan[];
    if (targetDay < todayDay) { // past
      place = "past";
    } else if (targetDay === todayDay) { // current
      place = "current";
    } else { // future
      place = "upcoming";
    }
    if (ↂ.plans[place].length > 0) {
      for (let i = 0; i < ↂ.plans[place].length; i++) {
        if (ↂ.plans[place][i] == null) {
          // the length of the array will be fixed on sleep processing.
        } else {
          const pissTentacleScatRorySlave = Math.floor(ↂ.plans[place][i].start / 1440);
          if (pissTentacleScatRorySlave === targetDay) {
            out.push(ↂ.plans[place][i]);
          }
        }
      }
    } else {
      return false;
    }
    // aw.con.info(`setup.sched.appointments returns ${out.length} appointments for ${targetDay}. btw, it was ${place}`);
    return out;
  } catch (e) {
    aw.con.warn(`Error in setup.sched.appointments, ${e}`);
    return false;
  }
};

setup.sched.calendar = function() {
  try {
    let out = "";
    if (setup.time.dateToArray(aw.time)[1] < 3) { // one of two possible displays, this shows one full month
      out += "<table>";
      const today = setup.time.nowDay();
      const todayDay = Math.floor(today / 1440);
      out += "<tr class='calendarTitle head1'>";
      out += `<td colspan=7>${setup.time.monthName()}</td></tr>`;
      out += "<tr class='calendarDays tit' style='font-size:1.2rem;'>";
      out += "<td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td><td>Sunday</td>";
      out += "</tr>";
      const firstDay = setup.time.dateToVal([1, 1, aw.timeArray[4]]); // first day of the current month, this is from where we will start building calendar
      let printDay = firstDay;
      let dayOfTheMonth = 1;
      for (let ii = 0; ii < 4; ii++) {
        out += `<tr class='calendarTop ident'>`;
        for (let i = 0; i < 7; i++) {
          if ((printDay / 1440) === todayDay) {
            out += "<td class='orange'>";
          } else {
            out += "<td>";
          }
          out += dayOfTheMonth;
          out += "&nbsp;&nbsp;";
          out += "<span class='uibutton'><<button 'i'>>";
          out += "<<dialog 'Day Planner'>>";
          out += `<<print setup.time.dayplansFull(${printDay})>><</dialog>><</button>></span>`;
          out += "<br>";
          const totalToday = setup.sched.appointments(printDay);
          // out += `<br> PD ${printDay}`; // REMOVE ME
          if (totalToday !== false && totalToday.length === 1) {
            out += `<div class = "calendarBot note"><span class='monospace '>${totalToday.length} plan</span></div>`;
          } else if (totalToday !== false && totalToday.length > 0) {
            out += `<div class = "calendarBot note"><span class='monospace '>${totalToday.length} plans</span></div>`;
          } else {
            out += `<div class = "calendarBot note"></div>`;
          }
          out += "</td>";
          printDay += 1440;
          dayOfTheMonth++;
        }
        out += "</tr>";
      }

    } else {
      out += "<table>";
      const today = setup.time.nowDay();
      const todayDay = Math.floor(today / 1440);
      out += "<tr class='calendarTitle head1'>";
      out += `<td colspan=7>${setup.time.monthName()}</td></tr>`;
      out += "<tr class='calendarDays tit' style='font-size:1.2rem;'>";
      out += "<td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td><td>Sunday</td>";
      out += "</tr>";
      const firstDay = setup.time.dateToVal([1, 3, aw.timeArray[4]]); // 14 day of the current month, this is from where we will start building calendar
      let printDay = firstDay;
      let dayOfTheMonth = 15;
      for (let ii = 0; ii < 2; ii++) {
        out += `<tr class='calendarTop ident'>`;
        for (let i = 0; i < 7; i++) {
          if ((printDay / 1440) === todayDay) {
            out += "<td class='orange'>";
          } else {
            out += "<td>";
          }
          out += dayOfTheMonth;
          out += "&nbsp;&nbsp;";
          out += "<span class='uibutton'><<button 'i'>>";
          out += "<<dialog 'Day Planner'>>";
          out += `<<print setup.time.dayplansFull(${printDay})>><</dialog>><</button>></span>`;
          out += "<br>";
          const totalToday = setup.sched.appointments(printDay);
          // out +=`<br> PD ${printDay}`; // REMOVE ME
          if (totalToday !== false && totalToday.length === 1) {
            out += `<div class = "calendarBot note"><span class='monospace '>${totalToday.length} plan</span></div>`;
          } else if (totalToday !== false && totalToday.length > 0) {
            out += `<div class = "calendarBot note"><span class='monospace '>${totalToday.length} plans</span></div>`;
          } else {
            out += `<div class = "calendarBot note"></div>`;
          }
          out += "</td>";
          printDay += 1440;
          dayOfTheMonth++;
        }
        out += "</tr>";
      }
      dayOfTheMonth = 1;
      out += "<tr class='calendarTitle head1'>";
      out += `<td colspan=7>${setup.time.monthName((aw.timeArray[4] + 1))}</td></tr>`;
      for (let ii = 0; ii < 2; ii++) {
        out += `<tr class='calendarTop ident'>`;
        for (let i = 0; i < 7; i++) {
          out += "<td>";
          out += dayOfTheMonth;
          out += "&nbsp;&nbsp;";
          out += "<span class='uibutton'><<button 'i'>>";
          out += "<<dialog 'Day Planner'>>";
          out += `<<print setup.time.dayplansFull(${printDay})>><</dialog>><</button>></span>`;
          out += "<br>";
          const totalToday = setup.sched.appointments(printDay);
          if (totalToday !== false && totalToday.length === 1) {
            out += `<div class = "calendarBot note"><span class='monospace '>${totalToday.length} plan</span></div>`;
          } else if (totalToday !== false && totalToday.length > 0) {
            out += `<div class = "calendarBot note"><span class='monospace '>${totalToday.length} plans</span></div>`;
          } else {
            out += `<div class = "calendarBot note"></div>`;
          }
          out += "</td>";
          printDay += 1440;
          dayOfTheMonth++;
        }
        out += "</tr>";
      }
    }
    out += "</table>";
    return out;
  } catch (e) {
    aw.con.warn(`Error in setup.sched.calendar, ${e}`);
    return `Sorry, calendar function broke somehow, the error is ${e}`;
  }
};
