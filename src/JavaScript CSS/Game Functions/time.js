/*********************************************************/
/*  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄   */
/* ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌  */
/*  ▀▀▀▀█░█▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀   */
/*      ▐░▌          ▐░▌     ▐░▌▐░▌ ▐░▌▐░▌▐░▌            */
/*      ▐░▌          ▐░▌     ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄   */
/*      ▐░▌          ▐░▌     ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌  */
/*      ▐░▌          ▐░▌     ▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀   */
/*      ▐░▌          ▐░▌     ▐░▌       ▐░▌▐░▌            */
/*      ▐░▌      ▄▄▄▄█░█▄▄▄▄ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄   */
/*      ▐░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌  */
/*       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀   */
/*.......................................................*/
/* Functions and Macros for controlling game time        */
/*********************************************************/
Object.defineProperty(setup, "timeDisp", {
  get: function () {
    let output;
    if((State.active.variables.time[0] % 12) == 0){
      output = "12:";
    }else{
      output = (State.active.variables.time[0] % 12) + ":";
    }
    if (State.active.variables.time[1] < 10) {
      output += "0" + State.active.variables.time[1];
    } else {
      output += State.active.variables.time[1];
    }
    if (State.active.variables.time[0] >= 12) {
      output += "<sub>PM</sub>";
    } else {
      output += "<sub>AM</sub>";
    }
    return output;
  },
  set: function () {
    alert("You can't set timeDisp, it's a function!");
  }
});
setup.time = {};

Object.defineProperty(setup, "now", {
  get: function () {
    return [State.variables.time[0],State.variables.time[1],State.variables.time[2]];
  },
  set: function () {
    alert("You can't set setup.time.now, it's a function!");
  }
});
setup.time.daytime = function(){
  let mon = State.active.variables.date[2], tim = State.active.variables.time[0];
  let cum = [
    [0,0],
    [8,18],//jan
    [8,18],
    [7,19],//mar
    [6,19],
    [6,19],//may
    [5,20],
    [5,20],//sol
    [5,20],
    [7,20],//aug
    [7,20],
    [7,19],//oct
    [7,19],
    [8,18]//dec
  ];
  if(tim < (cum[mon][0]-1) || tim >= (cum[mon][1]+1)){
    return "N";
  }else if(tim >= (cum[mon][0]-1) && tim < cum[mon][0]){
    return "SR";
  }else if(tim >= (cum[mon][1]) && tim < (cum[mon][1]+1)){
    return "SS";
  }else{
    return "D";
  }
};
setup.time.timeBackup = [10,30,false];
setup.time.dateBackup = [1,1,4,2032];
setup.time.saver = function(){
  let Ꜹ = State.active.variables;
  let okay = true;
  if(Ꜹ.time == null){
    aw.con.warn(`$time CORRUPTED: Null Value - restoring from backup. (${setup.time.timeBackup})`);
    Ꜹ.time = [setup.time.timeBackup[0],setup.time.timeBackup[1],setup.time.timeBackup[2]];
    okay = false;
  }
  if(!Array.isArray(Ꜹ.time)){
    aw.con.warn(`$time CORRUPTED: Non-Array - restoring from backup. (${setup.time.timeBackup})`);
    Ꜹ.time = [setup.time.timeBackup[0],setup.time.timeBackup[1],setup.time.timeBackup[2]];
    okay = false;
  }
  if(okay){
    setup.time.timeBackup = [Ꜹ.time[0],Ꜹ.time[1],Ꜹ.time[2]];
  }
  okay = true;
  if(Ꜹ.date == null){
    aw.con.warn(`$date CORRUPTED: Null Value - restoring from backup. (${setup.time.dateBackup})`);
    Ꜹ.date = [setup.time.dateBackup[0],setup.time.dateBackup[1],setup.time.dateBackup[2],setup.time.dateBackup[3]];
    okay = false;
  }
  if(!Array.isArray(Ꜹ.date)){
    aw.con.warn(`$date CORRUPTED: Non-Array - restoring from backup. (${setup.time.dateBackup})`);
    Ꜹ.date = [setup.time.dateBackup[0],setup.time.dateBackup[1],setup.time.dateBackup[2],setup.time.dateBackup[3]];
    okay = false;
  }
  if(okay){
    setup.time.dateBackup = [Ꜹ.date[0],Ꜹ.date[1],Ꜹ.date[2],Ꜹ.date[3]];
  }
  aw.S();
  return;
};
setup.time.add = function (addMin, disable = false) {
  if ("number" !== typeof addMin || isNaN(addMin)) {
    aw.con.warn(`Invalid value ${addMin} sent to setup.time.add`);
    aw.con.trace();
    return;
  }
  if(addMin < 0){
    aw.con.warn(`Negative value sent to setup.time.add (${addMin}).`);
    aw.con.trace();
    return;
  }
  if(addMin === 0){
    aw.con.info("A zero made it to setup.time.add, probably harmless.");
    aw.con.trace();
    return;
  }
  setup.time.saver();
  if (addMin > 0) {
    let time = State.active.variables.time;
    if (State.variables.pub && aw.chad.time && !disable) {
      addMin = Math.ceil(addMin / 2);
    }
    let hr = Math.floor(addMin / 60);
    let min = addMin % 60;
    if (min + time[1] >= 60) {
      min -= 60;
      hr += 1;
    }
    time[0] += hr;
    time[1] += min;
    if (time[0] >= 24) {
      time[0] -= 24;
      if(!disable){
        time[2] = true;
        setTimeout(setup.time.dateChange());
      }
    }
    State.active.variables.hour = time[0];
    State.active.variables.min = time[1];
    if (!disable) {
      State.active.variables.sched.alertText = "";
      State.active.variables.sched.alertPend = false;
      setup.time.chunk(addMin);
      setup.time.schedCheck(time);
    }
  }
};
setup.time.set = function (hour, min = 0, newDay = true, stats = false) {
  let day = false;
  if (hour == null) {
    aw.con.warn("time.set is missing required arguments. Trace below:");
    aw.con.trace();
    return;
  } else if ("number" != typeof hour || "number" != typeof min || hour > 23 || hour < 0 || min > 59 || min < 0) {
    aw.con.warn(`time.set given invalid input ${hour} and ${min}. Trace below:`);
    aw.con.trace();
    return;
  }
  let time = State.active.variables.time;
  //I debated going for minute level accuracy, but it seems more likely that
  // time would be going backward in that case. instead allowing a 60-119 min window.
  if (newDay && hour + 1 < time[0]) {
    day = true;
    //time[2] = true;
  }
  if (stats && ((hour == time[0] && min > time[1]) || (hour > time[0]))) {
    let minutes = min - time[1];
    if (day) {
      minutes += (24 - (time[0] - hour)) * 60;
    }
    setup.time.chunk(minutes);
  }
  time[0] = hour;
  time[1] = min;
  time[2] = false;
  if (day) {
    setup.time.dateChange();
  }
};
/*TRACKS PASSAGE OF TIME IN SET TIME CHUNKS*/
setup.time.chunk = function (min) {
  let timeChunk = State.active.variables.timeChunk;
  timeChunk += min;
  let chunks = Math.floor(timeChunk / 15);
  if (chunks > 0) {
    for (let i = 0; i < chunks; i++) {
      State.active.variables.timeCount++;
      setup.time.status(State.active.variables.timeCount);
    }
    timeChunk -= chunks * 15;
    State.active.variables.timeChunk = timeChunk;
  }
};
/*CHANGES THE DATE TO THE NEXT DAY AND PROCS VARIOUS CALCULATIONS*/
setup.time.dateChange = function () {
  if (State.active.variables.dayChange) {
    return;
  }
  //shortcut
  let holiday = false,
    date = State.active.variables.date;
  State.active.variables.dayChange = true;
  /*if(date[2] === 13 && date[1] === 4 && date[0] === 7){
    holiday = true;
  }*/
  //don't count prologue as a gameplay day
  if (!State.active.variables.flag.Prologue) {
    State.active.variables.dayTotal += 1;
    State.active.variables.week = Math.floor(State.active.variables.dayTotal / 7);
    State.active.variables.year = Math.floor(State.active.variables.week / 52);
  }

  date[0] += 1;
  if (date[0] > 7 && date[1] == 4 && date[2] == 13) {
    date[0] = 0;
    date[1] = 1;
    date[2] = 1;
    date[3] += 1;
    holiday = true;
  } else if (date[0] > 7) {
    date[0] -= 7;
    date[1] += 1;
    if (date[1] > 4) {
      date[1] = 1;
      date[2] += 1;
      if (date[2] > 13) {
        date[2] = 1;
        date[3] += 1;
      }
    }
  }
  try {
    setup.fert.cycle();
  } catch (e) {
    aw.con.error("time-fert.cycle",e);
  }
};
//CHECKS FOR IMPENDING APPOINTMENTS AND SLEEP
//TODO - SPLIT APPOINTMENT REMINDERS INTO NOTIFY @ 1HR, ALERT AT 30MIN
setup.time.schedCheck = function () {
  let Ꜹ = State.active.variables;
  let msgs = [];
  if (Ꜹ.sched.sleepWarnOn && !setup.time.after(Ꜹ.sched.sleepWarn)) {
    Ꜹ.sched.sleepWarnOn = false;
    let x = setup.time.toSleepMessage();
    if(x){
      msgs.push(x);
    }
  }
  if(!setup.time.after(Ꜹ.sched.sleepWarn)){
    Ꜹ.sched.fastSleep = true;
  }
  let plan = Ꜹ.plans[Ꜹ.date[1]][Ꜹ.date[0]];
  if (Ꜹ.sched.alerts && plan.length > 0) {
    for (let i = 0, c = plan.length; i < c; i++) {
      if (plan[i].alert && plan[i].start[0] == (Ꜹ.time[0] + 1)) {
        plan[i].alert = false;
        //setup.time.reminder(Ꜹ.plans[Ꜹ.date[1]][Ꜹ.date[0]][i]);
        msgs.push(setup.time.appointmentAlert(plan[i]));
      }
    }
  }
  if(msgs.length > 0){
    setup.time.reminder(msgs);
  }
};

//checks for missed appointments to update, and set flags if necessary
setup.time.missedCheck = function () {

};
//returns names of missed appointments for info purposes
setup.time.missed = function (d,w) {
  if(d===w){
    aw.con.info(`placeholder function time.missed seems to be doing things... ${d} | ${w}`);
  }
  return 0;
};
setup.time.socialCount = function(){
  let Ꜹ = State.active.variables;
  let cunt = 0;
  let d = Ꜹ.date[0],w = Ꜹ.date[1];
  if(Ꜹ.time[2]){//correction if after midnight and date has changed
    d--;
    if(d < 1){
      d = 7;
      w -= 1;
      if(w < 1){
        w = 4;
      }
    }
  }
  /*try{
    if(Ꜹ.sched.plans[w][d].length > 0){//iterates through plans, if not missed and social type, increments cunt
      for(let i = 0; i < Ꜹ.sched.plans[w][d].length; i++){
        if(Ꜹ.sched.plans[w][d][i].missed != null && !Ꜹ.sched.plans[w][d][i].missed && Ꜹ.sched.plans[w][d][i].type > 1){
          cunt += 1;
        }
      }
    }
  }
  catch(e){
    setup.log(`setup.time.socialCount error ${e.name}: ${e.message}`)
  }*/
  return cunt;
};
//returns name and time of next upcoming appointment/s
setup.time.dayplans = function (date = false) {
  let Ꜹ = State.active.variables;
  let day = Ꜹ.date[0];
  let week = Ꜹ.date[1];
  if (Array.isArray(date)) {
    day = ("number" == typeof date[0]) ? date[0] : day;
    week = ("number" == typeof date[1]) ? date[1] : week;
  }
  let out = "<span class='head' style='font-size:110%;'>Schedule:</span>",
    long = Ꜹ.plans[week][day].length;
  if (long > 0) {
    for (let i = 0; i < long; i++) {
      out += "<br>''Name:''";
      out += Ꜹ.plans[week][day][i].name;
      out += " | time: <span class='monospace'>";
      out += Ꜹ.plans[week][day][i].start[0] + ":" + Ꜹ.plans[week][day][i].start[1];
      out += "</span>";
      if (Ꜹ.plans[week][day][i].place != null) {
        out += " ''Place:'' " + Ꜹ.plans[week][day][i].place;
      }
      out += "<br><span class='note'>";
      out += Ꜹ.plans[week][day][i].disc;
      out += "</span>";
    }
  } else {
    out += "<br>''No Plans''";
  }
  return out;
};
//returns name and time of next upcoming appointment/s
setup.time.dayplansFull = function (date = false) {
  let Ꜹ = State.active.variables;
  let day = Ꜹ.date[0];
  let week = Ꜹ.date[1];
  if (Array.isArray(date)) {
    day = ("number" == typeof date[0]) ? date[0] : day;
    week = ("number" == typeof date[1]) ? date[1] : week;
  }
  let out = "<span class='head' style='font-size:110%;'>Schedule:</span>",
    long = Ꜹ.plans[week][day].length;
  if (long > 0) {
    for (let i = 0; i < long; i++) {
      out += "<br>''Name:''";
      out += Ꜹ.plans[week][day][i].name;
      out += " | time: <span class='monospace'>";
      out += Ꜹ.plans[week][day][i].start[0] + ":" + Ꜹ.plans[week][day][i].start[1];
      out += "</span>";
      if (Ꜹ.plans[week][day][i].place != null) {
        out += " ''Place:'' " + Ꜹ.plans[week][day][i].place;
      }
      out += "<br><span class='note'>";
      out += Ꜹ.plans[week][day][i].msg || Ꜹ.plans[week][day][i].desc;
      out += "</span>";
    }
  } else {
    out += "<br>''No Plans''";
  }
  return out;
};

setup.time.upcoming = function (date = false) {
  let Ꜹ = State.active.variables;
  let day = Ꜹ.date[0];
  let week = Ꜹ.date[1];
  if (Array.isArray(date)) {
    day = ("number" == typeof date[0]) ? date[0] : day;
    week = ("number" == typeof date[1]) ? date[1] : week;
  }
  let out = `<div id="uiReminder" class="blackOutline" style="background-color:rgba(0,0,0,${State.active.variables.phoneDataBG});"><table id='layout'><tr><td colspan=3><span class='head' style='font-size:100%;'>Schedule:</span></td></tr>`,
    long = Ꜹ.plans[week][day].length;
  if(Ꜹ.sched.workDays[Ꜹ.date[0]]){
    if(Ꜹ.job.att.showed[Ꜹ.date[0]]){
      out += "<tr><td class='yellowgreen' style='width:35%;font-size:16px;'><b>Work</b></td><td width='25%' class='monospace yellowgreen'>";
      out += Ꜹ.sched.workTime[Ꜹ.date[0]][0] + ":";
      if(Ꜹ.sched.workTime[Ꜹ.date[0]][1] < 10){
        out += "0" + Ꜹ.sched.workTime[Ꜹ.date[0]][1];
      }else{
        out += Ꜹ.sched.workTime[Ꜹ.date[0]][1];
      }
      out += "</td><td class='yellowgreen' style='width:40%;font-size:16px;'>Work ✔</td></tr>";
    }else if(Ꜹ.sched.vacation[Ꜹ.date[0]]){
      out += "<tr><td colspan=3 style='font-size:16px;color:#BBB;'>Vacation Day - No Work</td></tr>";
    }else if(Ꜹ.sched.sick[Ꜹ.date[0]]){
      out += "<tr><td colspan=3 style='font-size:16px;color:#EBB;'>Sick Day - No Work</td></tr>";
    }else{
      let cls = "white";
      let moo = Ꜹ.job.rules.worktime[Ꜹ.date[0]] + " hours";
      if(Ꜹ.time[0] < Ꜹ.sched.workTime[Ꜹ.date[0]][0] && Ꜹ.time[0] >= (Ꜹ.sched.workTime[Ꜹ.date[0]][0] - 2)){
        cls = "import";
      }else if( Ꜹ.time[0] >= Ꜹ.sched.workTime[Ꜹ.date[0]][0]){
        cls = "bad";
        moo = "Late/Missed!";
      }
      out += `<tr><td class='${cls}' style='width:35%;font-size:16px;'><b>Work</b></td><td width='25%' class='monospace ${cls}'>`;
      out += Ꜹ.sched.workTime[Ꜹ.date[0]][0] + ":";
      if(Ꜹ.sched.workTime[Ꜹ.date[0]][1] < 10){
        out += "0" + Ꜹ.sched.workTime[Ꜹ.date[0]][1];
      }else{
        out += Ꜹ.sched.workTime[Ꜹ.date[0]][1];
      }
      out += `</td><td class='${cls}' style='width:40%;font-size:16px;'>${moo}</td></tr>`;
    }
  }else{
    out += "<tr><td colspan=3 style='font-size:16px;color:#BBB;'>Day Off - No Work Today</td></tr>";
  }
  if (long > 0) {
    for (let i = 0; i < long; i++) {
      if (Ꜹ.plans[week][day][i].start[0] >= Ꜹ.time[0]) {
        out += "<tr><td style='width:35%;font-size:16px;'><b>";
        out += Ꜹ.plans[week][day][i].name;
        out += "</b></td><td width='25%' class='monospace'>";
        out += Ꜹ.plans[week][day][i].start[0] + ":";
        if(Ꜹ.plans[week][day][i].start[1] < 10){
          out += "0" + Ꜹ.plans[week][day][i].start[1];
        }else{
          out += Ꜹ.plans[week][day][i].start[1];
        }
        out += "</td><td style='width:40%;font-size:16px;'>";
        if (Ꜹ.plans[week][day][i].place != null) {
          out += " | " + Ꜹ.plans[week][day][i].place;
        }
        out += "</td></tr>";
      }
    }
  } else {
    out += "<tr><td colspan=3><b>No Plans</b></td></tr>";
  }
  out += "</table></div>";
  return out;
};

setup.time.reminder = function (msgs) {
  if(msgs.length > 1){
    msgs.join("<br><br>");
  }
  setup.dialog("Appointment Reminder",msgs);
};
//UPDATES STATUS VARIABLES WITH TIME
setup.time.status = function(count) {
  let Ꜹ = State.active.variables.PC;
  //start by checking fatigue
  if (count % 10 === 0) {
    setup.status.tired(1);
  }
  setup.statusLoad();
  //get grungier
  if (count % 24 === 0 && Ꜹ.status.clean < 5) {
    Ꜹ.status.clean++;
  }
  //regen energy if not too tired
  if (Ꜹ.status.fatigue < 8 && Ꜹ.status.energy.regen && Ꜹ.status.energy.health >= 50) {
    let rate = Ꜹ.status.energy.rate;
    if (Ꜹ.status.health < 75) {
      rate = Math.round(rate * 2.5);
    } else if (Ꜹ.status.health < 90) {
      rate = Math.round(rate * 1.5);
    }
    if (Ꜹ.status.withdrawl) {
      rate = Math.round(rate * 1.5);
    }
    if (count % rate === 0) {
      Ꜹ.status.energy.amt += 1;
    }
  }
  setup.statusSave();
  if (Ꜹ.status.arousal > 9){
    setup.status.arousal(-1);
  }
  let th = Math.floor(Ꜹ.status.arousal / 2);
  th += Math.ceil(Ꜹ.trait.libido / 2);
  if (th > random(0, 20)) {
    setup.status.satisfact(-1);
  }
  if (Ꜹ.status.inPublic) {
    let exp = 0;
    if (Ꜹ.clothes.accessP && Ꜹ.clothes.accessO) {
      exp += Ꜹ.clothes.skirtDanger * 2;
    } else if (Ꜹ.clothes.accessO) {
      exp += Ꜹ.clothes.skirtDanger;
    }
    if (Ꜹ.clothes.accessB) {
      exp += 1;
    }
    if (Ꜹ.clothes.accessP) {
      exp += 2;
    }
    if (Ꜹ.clothes.stain) {
      exp += 1;
    }
    try{
      if (Ꜹ.clothes.exp[0] >= 30) {
        exp += Math.min(Math.round((Ꜹ.clothes.exp[0] - 25) / 5), 4);
      }
      if (Ꜹ.clothes.exp[1] >= 30) {
        exp += Math.min(Math.round((Ꜹ.clothes.exp[1] - 15) / 5), 6);
      }
    }
    catch(e){
      aw.con.warn("seems like clothes.exp is fudged.");
    }
    if (Ꜹ.kink.exhibition && Ꜹ.kink.public) {
      exp *= 3;
    } else if (Ꜹ.kink.exhibition) {
      exp *= 2;
    }
    let max = Math.pow((Ꜹ.status.arousal + (9 - Ꜹ.trait.libido)), 2);
    if (exp >= random(1, max)) {
      setup.status.arousal(1);
    }
  }
  let cap = Ꜹ.trait.libido;
  if (Ꜹ.kink.slut) {
    if (Ꜹ.kink.hyperSlut) {
      cap += 6;
    } else if (Ꜹ.kink.superSlut) {
      cap += 3;
    } else {
      cap += 1;
    }
  }
  cap += Ꜹ.status.need;
  //TODO other cap raisers like drugs
  if (Ꜹ.status.arousal < cap) {
    let base = 1;
    base += (10 - Math.round(Ꜹ.status.satisfaction / 10));
    base += Ꜹ.trait.libido;
    let top = Math.round(Math.pow(Ꜹ.status.arousal, 3.5) + 50);
    if (base >= random(1, top)) {
      setup.status.arousal(1);
    }
  }
  /********************************************/
  /* PUT CONDITION ITEMS HERE, WETNESS, MILK,
     CLOTHES, *OTHER* LiQUIDS, ETC.           */
  /********************************************/
  try {
    setup.time.addictNeedIncrease();
  } catch (e) {
    aw.con.error("addict need increase failure.",e);
  }
};
/*RETURNS TRUE IF INPUT TIME IS AFTER CURRENT GAME TIME*/
setup.time.after = function (hr, min = 0, aft = false) {
  if (Array.isArray(hr)) {
    if ("number" != typeof hr[0] || "number" != typeof hr[1]) {
      aw.con.warn(`Invalid value ${hr} sent to time.after function. Times must be numbers or array of numbers.`);
      return;
    } else if (hr.length < 2) {
      aw.con.warn("Incomplete time array sent to time.after function. Arrays must include minute value.");
      return;
    } else {
      min = hr[1];
      aft = (hr.length == 3) ? hr[2] : false;
      hr = hr[0];
    }
  }
  if ("number" != typeof hr || "number" != typeof min) {
    aw.con.warn(`Invalid value ${hr} sent to time.after function. Times must be numbers or array of numbers.`);
    return;
  }
  let time = State.active.variables.time;
  let t1 = (time[0] * 60) + time[1],
    t2 = (hr * 60) + min;
  if (t2 > t1 && !time[2]) {
    return true;
  } else if (!time[2] && aft) {
    return true;
  } else {
    return false;
  }
};

setup.time.until = function (hr, min = 0, aft = false) {
  if (Array.isArray(hr)) {
    if ("number" != typeof hr[0] || "number" != typeof hr[1]) {
      throw new TypeError(`Invalid value ${hr} sent to time.until function. Times must be numbers or array of numbers.`);
    } else if (hr.length < 2) {
      throw new SyntaxError("Incomplete time array sent to time.until function. Arrays must include minute value.");
    } else {
      min = hr[1];
      aft = (hr.length == 3) ? hr[2] : false;
      hr = hr[0];
    }
  }
  if ("number" != typeof hr || "number" != typeof min) {
    throw new TypeError(`Invalid value ${hr} sent to time.after function. Times must be numbers or array of numbers.`);
  }
  const time = State.active.variables.time;
  let after = setup.time.after(hr, min, aft);
  if (!after) {
    return "passed";
  }
  let t1 = (time[0] * 60) + time[1],
    t2 = (hr * 60) + min;
  t1 += time[2] ? 1440 : 0;
  t2 += aft ? 1440 : 0;
  return (t2 - t1);
};
/* GET THE DAY WORD */
/* can't use system default because order*/
setup.time.dayName = function (d = "no") {
  const names = [
    "New Year",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let day = State.active.variables.date[2];
  if ("number" == typeof d && d > 0 && d < 8) {
    day = d;
  }
  return names[day];
};
/* GET THE MONTH WORD */
/* can't use defaults because of 13th month */
setup.time.monthName = function (m = "no") {
  const names = [
    "error",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Sol",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = State.active.variables.date[2];
  if ("number" == typeof m && m > 0 && m < 14) {
    month = m;
  }
  return names[month];
};
/* CALCULATES THE MENSTRUAL CYCLE */
setup.time.cycle = function () {

};
//TIME DIFFERENCE
setup.time.dif = function (timeA,timeB){
  if(!Array.isArray(timeA) || !Array.isArray(timeB)){
    setup.alert(`non-array time values to time dif. A = ${typeof timeA}, B = ${typeof timeB}`);
    return 0;
  }
  let a = timeA[0]*60 + timeA[1];
  let b = timeB[0]*60 + timeB[1];
  a += timeA[2] ? (24*60) : 0 ;
  b += timeB[2] ? (24*60) : 0 ;
  return Math.abs(a-b);
};
//RETURNS TIME ARRAY TO TURN TWINE VARIABLE INTO CURRENT TIME
setup.time.now = function (){
  let Ꜹ = State.active.variables;
  let h = Ꜹ.time[0];
  let m = Ꜹ.time[1];
  let a = Ꜹ.time[2];
  return [h,m,a];
};
//TIMER SYSTEM!
setup.time.timer = function (){

};

setup.time.dateDisplay = function(date = false){
  if(!Array.isArray(date)){
    date = State.active.variables.date;
  }
  let dateStr;
  if (date[0] == 6 || date[0] == 7 || date[0] == 0) {
    dateStr = "<span class='pink'>";
  } else {
    dateStr = "<span class='white'>";
  }
  let monthday = (date[0] + (date[1] - 1) * 7);
  dateStr += setup.time.dayName(date[0]) + "</span>";
  dateStr += ", " + setup.time.monthName(date[2]);
  dateStr += " " + monthday + "<span class='px14'>" + setup.numberLetAbrv(monthday) + "</span>";
  dateStr += ", " + date[3];
  /* note setup.numberLetAbrv is in general functions*/
  return dateStr;
};

//accepts input of time array or minutes, returns text time.
setup.time.format = function(tim){
  if(tim == null){
    aw.con.warn("No time sent to setup.time.format function");
    console.trace();
    return "[Error check console]";
  }
  let h = 0, m = 0, hw, mw;
  if(Array.isArray(tim)){
    h = tim[0];
    m = tim[1];
    if(m >= 60){
      h += Math.floor(m/60);
      m = m % 60;
    }
  }else if("number" === typeof tim){
    h += Math.floor(m/60);
    m = m % 60;
  }else{
    aw.con.warn("Bad time sent to setup.time.format function");
    console.trace();
    return "[Error check console]";
  }
  hw = (h == 1)? "hour": "hours";
  mw = (m == 1)? "minute": "minutes";
  if(h > 0){
    return `${h} ${hw} and ${m} ${mw}`;
  }else{
    return `${m} ${mw}`;
  }
};

/*Alerts players that they should go to sleep*/
setup.time.toSleepMessage = function(){
  let Ꜹ = State.active.variables;
  let j = Ꜹ.date[0], msg;
  if(!Ꜹ.time[2]){
    j += 1;
    if(j > 7){
      j = 1;
    }
  }
  if(Ꜹ.sched.workDays[j] && !Ꜹ.sched.vacation[j] && !Ꜹ.sched.sick[j]){
    msg = "<center><span class='white blurrier' style='font-size:120%'>It's getting late...</span></center><br><br>";
    msg += "Perhaps you should consider getting ready for bed...";
    return msg;
  }
  return false;
};

setup.time.appointmentAlert = function(appt){
  let msg;
  try{
    switch(appt.type){
    case 0://game or quest alert
      msg = `<span class='head3'>${appt.name} Reminder:</span><br><br>`;
      if(appt.msg != null && appt.msg != "none"){
        msg += appt.msg;
      }else{
        msg += "There doesn't seem to be any further details.";
      }
      break;
    case 1://player custom reminder
      msg = `<span class='head3'>Custom Reminder:</span> ${appt.name}<br><br>`;
      if(appt.msg != null && appt.msg != "none"){
        msg += appt.msg;
      }else{
        msg += "Looks like you didn't bother to actually record a message.";
      }
      break;
    case 2://standard type appointment doctor/office/etc
      msg = `<span class='head3'>Appointment Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${appt.start}`;
      if(appt.msg != null && appt.msg && appt.msg != "none"){
        msg += "<br>" + appt.msg;
      }
      break;
    case 3://plans with NPC (not a date)
      msg = `<span class='head3'>Meetup Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${appt.start}`;
      if(appt.msg != null && appt.msg && appt.msg != "none"){
        msg += "<br>" + appt.msg;
      }
      break;
    case 4://group NPC plans
      msg = `<span class='head3'>Meetup Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${appt.start}`;
      if(appt.msg != null && appt.msg && appt.msg != "none"){
        msg += "<br>" + appt.msg;
      }
      break;
    case 5://A DATE!
      msg = `<span class='head3'>Date Reminder:</span><br><br><b>${appt.name}</b><br>${appt.place} @ ${appt.start}`;
      if(appt.msg != null && appt.msg && appt.msg != "none"){
        msg += "<br>" + appt.msg;
      }
      break;
    default:
      msg = "Error: Invalid appointment type in appointment object.";
    }
  }
  catch(e){
    aw.con.error("Something went wrong with setup.time.appointmentAlert",e);
    msg = "Some kind of error happened when formatting the appointment reminder.";
  }
  return msg;
};

setup.time.addictNeedIncrease = function(){
  let addict = State.active.variables.PC.status.addict;
  let adds = ["sex","alc","heat","satyr","focus","cum","zone","cream"];
  let needs = ["sexNeed","alcNeed","heatNeed","satyrNeed","focusNeed","cumNeed","zoneNeed","creamNeed"];
  for(let i = 0; i < addict.length; i++){
    if(addict.max < addict[adds[i]]){
      addict.max = addict[adds[i]];
    }
  }
  if(addict.max < 30){//not addicted
    aw.S();
    return;
  }
  for(let i = 0; i < addict.length; i++){
    if(addict[adds[i]] >= 90){
      addict[needs[i]] += 4;
    }else if(addict[adds[i]] >= 70){
      addict[needs[i]] += 3;
    }else if(addict[adds[i]] >= 50){
      addict[needs[i]] += 2;
    }else if(addict[adds[i]] >= 35){
      addict[needs[i]] += 1;
    }else if(addict[adds[i]] < 25 && addict[adds[i]] > 0){
      if(random(1,200) === 200){
        addict[adds[i]] -= 1;
      }
    }
    if(addict[needs[i]] >= 100){
      setup.notify(`<span class="bad">You have went into ${needs[i]} withdrawal!</span>`);
      setTimeout(function(){
        setup.time.withdrawl(adds[i]);
      });
    }
  }
  aw.S();
  return;
};
setup.time.withdrawl = function(){
  //TODO
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*  ███╗   ███╗ █████╗  ██████╗██████╗  ██████╗ ███████╗  */
/*  ████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝  */
/*  ██╔████╔██║███████║██║     ██████╔╝██║   ██║███████╗  */
/*  ██║╚██╔╝██║██╔══██║██║     ██╔══██╗██║   ██║╚════██║  */
/*  ██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║╚██████╔╝███████║  */
/*  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝  */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

Macro.add("dayName", {
  handler: function () {
    let day = "no";
    if (this.args.length == 1 && "number" != typeof this.args[0]) {
      day = this.args[0];
    }
    let name = setup.time.dayName(day);
    return new Wikifier(this.output, name);
  }
});
Macro.add("monthName", {
  handler: function () {
    let mon = "no";
    if (this.args.length == 1 && "number" != typeof this.args[0]) {
      mon = this.args[0];
    }
    let name = setup.time.monthName(mon);
    return new Wikifier(this.output, name);
  }
});
Macro.add("dateDisplay", {
  handler: function () {
    let dateStr = setup.time.dateDisplay();
    return new Wikifier(this.output, dateStr);
  }
});
Macro.add("dateCalculate", {
  handler: function () {
    setup.time.dateChange();
  }
});
Macro.add("addTime", {
  handler: function () {
    let t;
    if (this.args.length < 1) {
      return this.error("addTime macro is missing time argument.");
    } else if (this.args.length == 1 && "number" == typeof this.args[0]) {
      setup.time.add(this.args[0]);
    } else if (this.args.length == 2 && "number" == typeof this.args[0] && "number" == typeof this.args[1]) {
      t = (this.args[0] * 60) + this.args[1];
      setup.time.add(t);
    } else if (this.args.length == 2 && "number" == typeof this.args[0] && "boolean" == typeof this.args[1]) {
      setup.time.add(this.args[0], this.args[1]);
    } else if (this.args.length == 3 && "number" == typeof this.args[0] && "number" == typeof this.args[1] && "boolean" == typeof this.args[2]) {
      t = (this.args[0] * 60) + this.args[1];
      setup.time.add(t, this.args[2]);
    } else {
      return this.error("Invalid argument/s");
    }
  }
});
Macro.add("setTime", {
  handler: function () {
    if (this.args.length < 1) {
      return this.error("setTime macro is missing time argument.");
    } else if (this.args.length == 1 && "number" == typeof this.args[0]) {
      setup.time.set(this.args[0]);
    } else if (this.args.length >= 2 && "number" == typeof this.args[0] && "number" == typeof this.args[1]) {
      if (this.args.length == 2) {
        setup.time.set(this.args[0], this.args[1]);
      } else if (this.args.length == 3 && "boolean" == typeof this.args[2]) {
        setup.time.set(this.args[0], this.args[1], this.args[2]);
      } else if (this.args.length == 4 && "boolean" == typeof this.args[2] && "boolean" == typeof this.args[3]) {
        setup.time.set(this.args[0], this.args[1], this.args[2], this.args[3]);
      } else {
        return this.error("Invalid argument/s");
      }
    } else if (Array.isArray(this.args[0])) {
      switch (this.args[0].length) {
      case 1:
        setup.time.set(this.args[0][0]);
        break;
      case 2:
        setup.time.set(this.args[0][0], this.args[0][1]);
        break;
      case 3:
        setup.time.set(this.args[0][0], this.args[0][1], this.args[0][2]);
        break;
      case 4:
        setup.time.set(this.args[0][0], this.args[0][1], this.args[0][2], this.args[0][3]);
        break;
      }
    } else {
      return this.error("Invalid argument/s");
    }
  }
});