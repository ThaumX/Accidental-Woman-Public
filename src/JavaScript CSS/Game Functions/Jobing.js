/*
/*      ██╗ ██████╗ ██████╗ ██╗███╗   ██╗ ██████╗
/*      ██║██╔═══██╗██╔══██╗██║████╗  ██║██╔════╝
/*      ██║██║   ██║██████╔╝██║██╔██╗ ██║██║  ███╗
/* ██   ██║██║   ██║██╔══██╗██║██║╚██╗██║██║   ██║
/* ╚█████╔╝╚██████╔╝██████╔╝██║██║ ╚████║╚██████╔╝
/*  ╚════╝  ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝
*/

/*
aw.job = {};
setup.job = {};
class Job {
  constructor({} = {}){
  }
}
*/

setup.job = {
  goto: function(){
    aw.L();
    let Ꜹ = State.active.variables;
    Ꜹ.job.choose.effort = 2;
    Ꜹ.job.choose.focus = "none";
    Ꜹ.job.moti += 1;
    if(Ꜹ.job.moti > 27){
      Ꜹ.job.moti = 1;
    }
    aw.job = {};
    Ꜹ.map.lastLoc = [Ꜹ.map.loc[0],Ꜹ.map.loc[1],Ꜹ.map.loc[2]];
    Ꜹ.map.loc = [Ꜹ.job.loc[0],Ꜹ.job.loc[1],Ꜹ.job.loc[2]];
    aw.S();
    let t = setup.map.time("current","work");
    setup.time.add(t);
    aw.con.info(`Travel time to work is ${t} minutes.`);
    Engine.play("JobberCon");
  },
  arrival: function(){
    let Ꜹ = State.active.variables;
    let t = [Ꜹ.sched.workTime[Ꜹ.date[0]][0],Ꜹ.sched.workTime[Ꜹ.date[0]][1]];
    let x = setup.time.after(t);
    let texto;
    if(x){
      let bb,cc,tt,rr;
      switch(Ꜹ.job.code){
      case "IS":
        bb = "underground to the service tunnels that are";
        cc = ".";
        break;
      case "IB":
        bb = "to the almost deliberately drab building that is";
        cc = ".";
        break;
      case "IT":
        tt = ["hillside lab facility","primary lab complex","underground lab complex","satellite lab facility","research building cluster"];
        rr = random(0,4);
        bb = `to the ${tt[rr]} that is`;
        cc = " assignment for the today.";
        break;
      }
      texto = `@@.head3;Y@@ou arrive at work and make your way ${bb} your designated work location${cc}`;
    }else if(setup.time.dif(Ꜹ.time,t) > 120){
      Ꜹ.job.missed.times += 1;
      Ꜹ.job.missed.recent += 1;
      Ꜹ.job.late.times += 1;
      Ꜹ.job.late.recent += 1;
      Ꜹ.job.stats.performance -= random(20,25);
      if(Ꜹ.job.stats.performance < -50){
        Ꜹ.job.stats.performance = -50;
      }
      Ꜹ.job.stats.progress -= random(15,25);
      if(Ꜹ.job.stats.progress < 0){
        Ꜹ.job.stats.progress = 0;
      }
      Ꜹ.job.stats.boss -= random(10,15);
      if(Ꜹ.job.stats.boss < -50){
        Ꜹ.job.stats.boss = -50;
      }
      Ꜹ.job.stats.coworker -= random(10,15);
      if(Ꜹ.job.stats.coworker < -50){
        Ꜹ.job.stats.coworker = -50;
      }
      Ꜹ.job.stats.subord -= random(10,15);
      if(Ꜹ.job.stats.subord < -50){
        Ꜹ.job.stats.subord = -50;
      }
      texto = "<<timed 50ms>><<replace '#jobContent'>><div>@@.head3;Y@@ou arrive to work very late, <span class='peepbad'>and your boss is pretty angry</span>. Even your coworkers look <span class='peepbad'>upset with you</span>. Rather than getting chewed out though, your boss simply sends you home for the day. Looks like this week's paycheck will be even smaller than you expected.</div><div><center><<button 'Go Home'>><<run setup.job.endJob()>><</button>></center></div><</replace>><</timed>>";
    }else if(Ꜹ.job.late.called == 1){//called in, but was already late when called.
      Ꜹ.job.late.times += 1;
      Ꜹ.job.late.recent += 1;
      Ꜹ.job.stats.performance -= random(5,10);
      if(Ꜹ.job.stats.performance < -50){
        Ꜹ.job.stats.performance = -50;
      }
      Ꜹ.job.stats.progress -= random(5,10);
      if(Ꜹ.job.stats.progress < 0){
        Ꜹ.job.stats.progress = 0;
      }
      Ꜹ.job.stats.boss -= random(5,10);
      if(Ꜹ.job.stats.boss < -50){
        Ꜹ.job.stats.boss = -50;
      }
      texto = "@@.head3;Y@@ou arrive to work late, and you notice a few looks your way, but overall it doesn't seem too bad. It's probably a good thing you called, because you notice your boss <span class='peepbad'>isn't very happy</span>, and it probably would have been worse otherwise.";
    }else if(Ꜹ.job.late.called == 2){//called in, called before being late.
      Ꜹ.job.late.times += 1;
      Ꜹ.job.late.recent += 1;
      Ꜹ.job.stats.performance -= random(2,5);
      if(Ꜹ.job.stats.performance < -50){
        Ꜹ.job.stats.performance = -50;
      }
      Ꜹ.job.stats.progress -= random(0,3);
      if(Ꜹ.job.stats.progress < 0){
        Ꜹ.job.stats.progress = 0;
      }
      Ꜹ.job.stats.boss -= random(0,3);
      if(Ꜹ.job.stats.boss < -50){
        Ꜹ.job.stats.boss = -50;
      }
      texto = "@@.head3;Y@@ou arrive to work late, but because you called your boss before you were supposed to be at work, nobody seems to be particularly upset. You're able to start your workday pretty normally, albeit later than usual.";
    }else{
      Ꜹ.job.late.times += 1;
      Ꜹ.job.late.recent += 1;
      Ꜹ.job.stats.performance -= random(15,20);
      if(Ꜹ.job.stats.performance < -50){
        Ꜹ.job.stats.performance = -50;
      }
      Ꜹ.job.stats.progress -= random(10,15);
      if(Ꜹ.job.stats.progress < 0){
        Ꜹ.job.stats.progress = 0;
      }
      Ꜹ.job.stats.boss -= random(5,10);
      if(Ꜹ.job.stats.boss < -50){
        Ꜹ.job.stats.boss = -50;
      }
      texto = "@@.head3;Y@@ou arrive to work late, <span class='peepbad'>a fact that doesn't go unnoticed by your boss</span>. After a thankfully brief lecture about the importance of showing up to work on time, you get to work.";
    }
    aw.S();
    return texto;
  },
  startDay: function(){
    let Ꜹ = State.active.variables;
    let t = [Ꜹ.sched.workTime[Ꜹ.date[0]][2],Ꜹ.sched.workTime[Ꜹ.date[0]][3]];
    let wkm = setup.time.dif(Ꜹ.time,t);
    aw.con.info(`Advancing time to ${t[0]}hr ${t[1]}min, scheduled end of work time.`);
    setup.time.set(t[0],t[1],true,true);
    Ꜹ.job.att.weekDays += 1;
    Ꜹ.job.att.showed[Ꜹ.date[0]] = true;
    Ꜹ.job.att.weekHours += Math.round(wkm/60);
    let r = random(0,9);
    let events = [
      "Today you were treated to the sound of wailing sirens for nearly 30 minutes, it seems like something almost broke out of a lab again. When will those Biomedical guys learn?",
      "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      "<<set _namer = setup.nameRandomizer(2,'white')>>Your coworker <<= _namer>> looked oddly sick again this morning, and it wasn't long before she started vomiting in her trash can. Someone suggested she may be pregnant, but <<= _namer>> just kept insisting that wasn't possible.",
      "Some of the middle-management guys came in today and announced some sort of last minute-blood test. You aren't sure what it was all about, but you distinctly remember hearing something about an emergency.",
      "Today another one of your coworkers got <i>promoted</i> out of the department again. It seems odd how fast people are promoted around here, but you can't really complain; after all, that means you'll be promoted faster too."
    ];
    if(r < 5){
      let output = `<div><span class="quest" style="font-size:120%;">Selected for random event [${(r+1)} of 5 temporary]</span><br><br><p>${events[r]}</p></div><div><center><<button "Continue">><<replace "#jobContent">><</replace>><<run setup.job.jobTasks()>><</button>></center></div>`;
      aw.replace("#jobContent",output);
    }else{
      setup.job.jobTasks();
    }
  },
  jobTasks: function(){
    let Ꜹ = State.active.variables;
    let job = State.active.variables.job;
    let ratio = job.rules.taskratio;
    let tasks = [job.rules.taskA, job.rules.taskB, job.rules.taskC, job.rules.taskD, job.rules.taskE, job.rules.taskF];
    let tCount = job.rules.tasks;
    let effort = job.choose.effort;
    let focus = job.choose.focus;
    if(effort === 1){
      focus = "none";
    }
    let ef = setup.job.focusEffect(focus,effort); //array[mod value,focus success,output txt]
    let mod = ef[0], txt = ef[2];
    let chosen = [];
    let result = {max:0,amt:0,stress:0,hap:0,suck:[],past:0,desc:[],output:"@@.head3;T@@oday's tasks included ",perf:0};
    //randomly determine tasks to be tested
    for(let i = 0; i < tCount; i++){
      let y = randomDist(ratio);
      chosen.push(y);
      result.max += Math.round(tasks[y].effect * 2); //adds to # for perfect success
      let w = tasks[y].desc.length - 1;
      let z = random(0,w);
      result.desc.push(tasks[y].desc[z]);//adds random job task description
    }
    setup.job.taskLabel(result);
    //actually perform skill checks
    for(let i = 0; i < tCount; i++){
      let task = tasks[chosen[i]];
      setup.SCXfunc();
      setup.SCfunc(task.type,task.DC,mod);
      result.stress += task.stress;
      result.hap += task.hap;
      if(Ꜹ.SCresult[1]){
        result.amt += 2 * task.effect;
        result.suck.push(true);
        result.output += `<span class="jobpass">${result.desc[i]}</span>`;
        result.perf += 1;
        result.past += 1;
      }else if(task.retry){
        //can retry, but more stressful
        result.stress += task.stress;
        result.hap += Math.round(task.hap / 2);
        let w = task.DC - 1;//easier second time
        setup.SCfunc(task.type,w,mod);
        if(Ꜹ.SCresult[2]){
          result.amt += 1 * task.effect;
          result.suck.push(true);
          result.past += 1;
          result.output += result.desc[i];
        }else{
          result.suck.push(false);
          result.output += `<span class="jobfail">${result.desc[i]}</span>`;
          result.stress += task.stress;
          result.perf -= 1;
        }
      }else{
        //no retry, failure, though less overall stress than double fail
        result.suck.push(false);
        result.output += `<span class="jobfail">${result.desc[i]}</span>`;
        result.stress += task.stress;
        result.perf -= 1;
      }
      if(i === (tCount - 2)){
        result.output += ", and ";
      }else if(i === (tCount - 1)){
        result.output += ".";
      }else{
        result.output += ", ";
      }
    }
    aw.S();
    if(effort === 3){
      result.stress = Math.round(result.stress * (random(115,120)/100));
    }else if(effort === 1){
      result.stress = Math.round(result.stress * (random(90,99)/100));
    }
    if(focus === "working" || focus === "skill"){
      result.stress = Math.round(result.stress * (random(105,115)/100));
    }
    setup.status.stress(result.stress);
    setup.status.happy(result.hap);
    let txt2 = setup.job.taskOutcome(result,tCount);
    let junk;
    if(job.stats.promote){
      junk = "<<replace '#jobContent'>><</replace>><<run setup.job.promote()>>";
    }else if(job.stats.fired){
      junk = "<<replace '#jobContent'>><</replace>><<run setup.job.fire()>>";
    }else if(job.stats.fireDanger){
      junk = "<<replace '#jobContent'>><</replace>><<run setup.job.warning()>>";
    }else{
      junk = "<<run setup.job.endJob()>>";
    }
    let cod = `<div><p>${txt}</p><p>${result.output}</p></div><div><p>${txt2}</p><center><<button "Continue">>${junk}<</button>></center></div>`;
    aw.replace("#jobContent",cod);
  },
  focusEffect: function(focus,effort){
    let x,txt,focSuc,eft;
    let opr = random(0,2);
    switch(effort){
    case 3:
      eft = ["@@.head3;Y@@ou spent the day working hard, putting in extra effort to get things done.","@@.head3;Y@@ou were working pretty intensely today, so the before you knew it the day was over.","@@.head3;T@@oday you buckled down at work, making the most of your time to get things done."];
      break;
    case 2:
      eft = ["@@.head3;Y@@ou spent the day like many corporate drones, working to complete your assigned tasks until finally being allowed to go home.","@@.head3;T@@oday you walked the thin line of performance; working hard enough that nobody could complain, but not doing so well that it invites any extra work.","@@.head3;R@@esigned to another day of work, you met your responsibilities but not much else."];
      break;
    case 1:
      eft = ["@@.head3;T@@oday you just couldn't bring yourself to care much about getting things done, leading to a day of shortcuts and procrastination.","@@.head3;Y@@ou really didn't feel like working today, and it showed in your effort. Everybody has those days though, right?","@@.head3;T@@oday you played the game of employee hide and seek where you spend almost as much effort avoiding work as it would take to just do it in the first place."];
      break;
    default:
      eft = ["[error no work effort!]","[error no work effort!]","[error no work effort!]"];
      break;
    }
    switch(focus){
    case "none":
      x = 0;
      txt = `${eft[opr]} You didn't really have much of a focus for the day, just handling things as they arose.`;
      focSuc = true;
      break;
    case "work":
      x = 1;
      txt = `${eft[opr]} You decided to focus on getting your work done properly, avoiding distractions when possible.`;
      focSuc = (random(0,2) > 0)? true: false;
      if(focSuc){
        x = 2;
        txt += " You were able to do pretty well because of it.";
      }else{
        txt += " Unfortunately it didn't really work out.";
      }
      break;
    case "skill":
      x = random(0,1);
      txt = `${eft[opr]} You focused on improving your work skills today, hoping to get better at your job.`;
      focSuc = (random(0,2) > 0)? true: false;
      if(focSuc){
        txt += " You were able to put in a decent effort toward getting better.";
        let a = ["prob","org","com","fin","clean"];
        let dc = 8 + effort;
        for(let i = 0; i < State.active.variables.job.rules.tasks; i++){
          let ar = random(0,4);
          setup.skillGain(a[ar],dc,false);
        }
      }else{
        txt += " Your attempts don't really pan out today though.";
      }
      break;
    case "boss":
      x = (random(0,2)-1);
      txt = `${eft[opr]} You paid extra attention to your boss today, trying to cast yourself in a positive light without blatantly kissing ass.`;
      focSuc = (effort - random(1,2))>0? true: false;
      if(focSuc){
        State.active.variables.job.stats.boss += (effort - 1);
        if(State.active.variables.job.stats.boss > 50){
          State.active.variables.job.stats.boss = 50;
        }
        State.active.variables.job.stats.progress += Math.max(0,(random(1,4)-3));
        State.active.variables.job.stats.performance += random(0,1);
        txt += " You managed to pull it off, and you think you improved your boss' perception of you.";
      }else{
        if(effort == 1){
          txt += " Because you didn't put in any serious effort into actually looking good, you ended up looking like an obvious brown-noser.";
          State.active.variables.job.stats.coworker -= random(1,2);
          State.active.variables.job.stats.boss -= random(1,2);
        }else{
          txt += " You tried, but there simply weren't any opportunities to pull it off without looking like a douche.";
        }
      }
      break;
    case "coworker":
      x = Math.max(-1,(effort - (3 + random(0,1))));
      txt = `${eft[opr]} You spent a lot of time today socializing with your coworkers, hoping to give a better impression.`;
      focSuc = (random(0,4)>0)? true: false;
      if(focSuc){
        State.active.variables.job.stats.coworker += effort;
        txt += "You weren't exactly productive today, but you do think your coworkers like you a little more.";
      }else{
        txt += "Things just didn't go according to plan though.";
      }
      break;
    case "subord":
      x = random(0,1);
      txt = `${eft[opr]} You decided to spend extra time mentoring your subordinates today, and generally being a good boss.`;
      focSuc = (random(0,1)+ x)>0? true: false;
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
    result -= (focSuc)? 0: 1;
    return [result,focSuc,txt];
  },
  taskOutcome: function(result,tCount){
    let job = State.active.variables.job;
    let per = Math.round((result.amt / result.max) * 10);
    switch(per){
    case 10:
      job.stats.boss += random(1,2);
      job.stats.coworker += random(1,2);
      job.stats.subord += random(1,2);
      result.output += " Overall you did fantastic today, and your supervisor said that they'd never seen anyone job so good.";
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
      if(job.choose.effort != 1){
        job.stats.boss += random(0,1);
        job.stats.coworker += random(0,1);
        job.stats.subord += random(0,1);
        result.output += " Overall you did okay today, though it wasn't enough to impress anyone.";
      }else{
        result.output += " Overall your performance today was mediocre. It certainly wasn't good enough to impress anyone.";
      }
      break;
    case 5:
    case 4:
      if(job.choose.effort != 3){
        job.stats.boss -= 1;
        job.stats.coworker -= 1;
        job.stats.subord -= 1;
      }
      result.output += " While you could charitably call today's performance mediocre, you get the impression that you may want to improve for the sake of your job security.";
      break;
    case 3:
    case 2:
      job.stats.boss -= random(3,6);
      job.stats.coworker -= random(3,6);
      job.stats.subord -= random(3,6);
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
    if(job.stats.boss > 50){
      job.stats.performance += 1;
      job.stats.boss = 50;
    }else if(job.stats.boss < -50){
      job.stats.performance -= 10;
      job.stats.boss = -50;
    }
    if(job.stats.coworker > 50){
      job.stats.performance += 1;
      job.stats.coworker = 50;
    }else if(job.stats.coworker < -50){
      job.stats.performance -= 8;
      job.stats.coworker = -50;
    }
    if(job.stats.subord > 50){
      job.stats.performance += 1;
      job.stats.subord = 50;
    }else if(job.stats.subord < -50){
      job.stats.performance -= 5;
      job.stats.subord = -50;
    }
    if(job.stats.performance > 50){
      job.stats.progress += 1;
      job.stats.performance = 50;
    }else if(job.stats.performance < -50){
      job.stats.performance = -50;
    }
    if(job.stats.performance >= 40){
      job.stats.progress += random(1,2);
      job.stats.fireDanger = false;
    }else if(job.stats.performance >= 25){
      job.stats.progress += 1;
      job.stats.fireDanger = false;
    }else if(job.stats.performance >= 10){
      job.stats.progress += random(0,1);
      job.stats.fireDanger = false;
    }else if(job.stats.performance <= -40){
      job.stats.progress -= random(4,8);
      if((job.stats.fireDanger && job.stats.progress <= 0) || random(0,3) == 0){
        job.stats.fired = true;
      }
      job.stats.fireDanger = true;
    }else if(job.stats.performance <= -25){
      job.stats.progress -= random(2,4);
      if(job.stats.fireDanger && job.stats.progress <= 0){
        job.stats.fired = true;
      }
      job.stats.fireDanger = true;
    }else if(job.stats.performance <= -10){
      job.stats.progress -= random(1,2);
      job.stats.fireDanger = false;
    }
    if(job.stats.progress < 0){
      job.stats.progress = 0;
    }else if(job.stats.progress >= 100){
      job.stats.progress = 100;
      job.stats.promote = true;
    }
    let star = " ", dick = "acceptably", fish = "didn't change much";
    if(per > 7){
      star = " [img[Gold Star!|IMG-StarCircle]]";
      dick = "<span class='good'>well</span>";
      fish = "<span class='peepgood'>seem to have improved</span>";
    }else if(per < 6){
      star = " [img[Stinky!|IMG-FishCircle]]";
      dick = "<span class='bad'>below expectations</span>";
      fish = "<span class='peepbad'>got worse</span>";
    }
    let st = `<b>Today's Performance:</b>${star}<br>Today you performed ${dick}, with a GLaDyS performance ranking of ${per}0 percent. You were able to complete ${result.past} of ${tCount} tasks assigned to you successfully. Your fellow employee's opinions of you ${fish} today.`;
    return st;
  },
  taskLabel: function(result){
    let l = result.desc.length;
    for(let i = 1; i < l; i++){
      let c = 0;
      for(let j = i-1; j >= 0; j--){
        if(result.desc[i] == result.desc[j]){
          c++;
        }
      }
      if(c === 1){
        result.desc[i] = "more " + result.desc[i];
      }else if(c >= 2){
        result.desc[i] = "even more " + result.desc[i];
      }
    }
  },
  endJob: function(){
    State.active.variables.map.loc = ["world","institute",false];
    setup.map.nav("world","appletree");
  },
  promote: function(){
    let output = "<div><span class='quest' style='font-size:120%;>Congratulations!</span><br><p>@@.head3;Y@@our boss pulls you aside at the end of the day to give you some good news; it seems your hard work is being rewarded with a promotion! The question is, do you want to accept? If you turn down the offer it may be a while before you get another one, but it'd probably be better than taking a job you aren't prepared for...</p></div><div><center><<button 'Turn it down'>><<set $job.stats.progress -= random(20,40)>><<status 0>><<run setup.job.endJob()>><</button>><<if $job.rank >= 2>><span class='disabled'><<button 'Accept!'>><</button>></span><<else>><<button 'Accept!'>><<set _tRank = $job.stats.rank + 1>><<setNewJob $job.code _tRank>><<run setup.job.endJob()>><</button>><</if>></center></div>";
    aw.replace("#jobContent",output);
  },
  fire: function(){
    let output = "<div><span class='quest' style='font-size:120%;>Bad News!</span><br><p>@@.head3;Y@@our boss pulls you aside at the end of the day to fire your ass. Luckily, being fired isn't implemented yet.</p></div><div><center><<button 'I Fail'>><<set $job.stats.fired = false>><<status 0>><<run setup.job.endJob()>><</button>></center></div>";
    aw.replace("#jobContent",output);
  },
  warning: function(){
    let output = "<div><span class='quest' style='font-size:120%;>Bad News!</span><br><p>@@.head3;Y@@our boss pulls you aside at the end of the day to give you a warning about your performance at work lately. If you don't get your act together, you might not have a job much longer.</p></div><div><center><<button 'I Fail'>><<run setup.job.endJob()>><</button>></center></div>";
    aw.replace("#jobContent",output);
  },
  workCalendar: function(){
    let Ꜹ = State.active.variables;
    let wD = Ꜹ.sched.workDays,
      vaca = Ꜹ.sched.vacation,
      sick = Ꜹ.sched.sick,
      wT = Ꜹ.sched.workTime,
      c = wD.length,
      wH = Ꜹ.job.rules.worktime,
      days = [0,"MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];
    let day = (Ꜹ.time[2])? Ꜹ.date[0]+1: Ꜹ.date[0]; //The real question is, will people expect it to work different?
    if(day > 7){day = 1;}
    let msg = "<div class='schedRowCont'>";
    for(let i = 1; i < c; i++){
      if(i === day){
        msg += `<div class='schedRowBox' style='background-color:#444;'><span style='color:#FFF;font-size:22px;'>${days[i]}</span><br>`;
      }else{
        msg += `<div class='schedRowBox'><span style='color:${Ꜹ.pref.theme.head};font-size:22px;'>${days[i]}</span><br>`;
      }
      if(!wD[i]){
        msg += "<span style='color:#BBB;'>Day Off</span>";
      }else if(vaca[i]){
        msg += "Vacation Scheduled";
      }else if(sick[i]){
        msg += "Sick Day";
      }else{
        let minA = (wT[i][1] < 10)? "0" + wT[i][1]: wT[i][1],
          minB = (wT[i][3] < 10)? "0" + wT[i][3]: wT[i][3];
        if(i >= day){
          msg += `${wT[i][0]}:${minA} to ${wT[i][2]}:${minB}<br>Hours: ${wH[i]}<br><<link "request off">><<dialog "Phone Conversation: Boss">><<set _tDay = ${i}>><<include [[jobberCallBossRequest]]>><</dialog>><</link>>`;
        }else{
          msg += `${wT[i][0]}:${minA} to ${wT[i][2]}:${minB}<br>Hours: ${wH[i]}`;
        }
      }
      msg += "</div>";
    }
    msg += "</div>";
    return msg;
  }
};

