/*
███████╗██╗     ███████╗███████╗██████╗
██╔════╝██║     ██╔════╝██╔════╝██╔══██╗
███████╗██║     █████╗  █████╗  ██████╔╝
╚════██║██║     ██╔══╝  ██╔══╝  ██╔═══╝
███████║███████╗███████╗███████╗██║
╚══════╝╚══════╝╚══════╝╚══════╝╚═╝
*/
setup.sleep = {
  bar: function(t=5){
    setup.pBar.add("#skypbar",t);
  },
  start: function(){
    let Ꜹ = State.active.variables;
    if(Dialog.isOpen()){
      Dialog.close();
    }
    aw.sleep = {};
    aw.sleep.startTime = setup.time.now;
    aw.sleep.startDate = [Ꜹ.date[0],Ꜹ.date[1],Ꜹ.date[2]];
    setup.startsPassage = passage();
    aw.sleep.startLoc = [Ꜹ.map.loc[0], Ꜹ.map.loc[1], Ꜹ.map.loc[2]];
    aw.L();
    setup.dirtyHome();
    //Ꜹ.PC.status.sleep = true;
    //Ꜹ.showMenuButton = false;
    aw.S();
    Engine.play("SleepStart");
    setTimeout(function(){
      setup.sleep.npcStart();
    },50);
  },
  dream: function(){
    let Ꜹ = State.active.variables;
    let output = "";
    if(Ꜹ.PC.status.health < 30){
      output += "<div class='fadeIn animated'>@@.warning;WARNING!@@ Your health is very low. You should seek medical treatment immediately.</div>";
    }else if((Ꜹ.PC.status.healthOld - Ꜹ.PC.status.health) >= 15){
      output += "<div class='fadeIn animated'>@@.import;CAUTION@@ Your health dropped significantly today, you may want to seek medical attention.</div>";
    }else if(Ꜹ.AW.medChange){
      output += "<div class='fadeIn animated'>This is a Placeholder for a body/mind altering event/process that happens overnight.</div>";
    }else if(Ꜹ.PC.status.mindbreak){
      output += "<div class='fadeIn animated'>Placeholder for mindbreak message.</div>";
    }else if(Ꜹ.PC.status.need > 2){
      output += "<div class='fadeIn animated'>@@.import;CAUTION@@ Your need is getting high. See the encyclopedia for more information on need and other character stats.</div>";
    }
    /*******************************************************
    determine dreams, if any
    This is the place to add checks for new "special dreams"
    or expand the list of standard dreams
    *******************************************************/
    let dreams = ["none","standard","standard"];
    if(Ꜹ.PC.status.satisfaction < 30){
      dreams.push("unsatisfied");
    }
    if(Ꜹ.PC.status.need > 0){
      for(let i = 0; i < Ꜹ.PC.status.need; i++){
        dreams.push("needy");
      }
    }
    if(Ꜹ.PC.status.wombA.weeks > 0 && (Ꜹ.PC.body.pregTerm - Ꜹ.PC.status.wombA.weeks) < 4){
      dreams.push("latepreg");
      dreams.push("latepreg");
    }else if(Ꜹ.PC.status.wombA.weeks > 0){
      dreams.push("preg");
    }
    if(Ꜹ.PC.status.wombB.weeks > 0 && ( Ꜹ.PC.body.pregTerm - Ꜹ.PC.status.wombB.weeks ) < 4){
      dreams.push("latepreg");
      dreams.push("latepreg");
    }else if(Ꜹ.PC.status.wombB.weeks > 0){
      dreams.push("preg");
    }
    let z = dreams.length - 1;
    let r = random(0,z);
    let dream;
    try{
      dream = aw.dreams[dreams[r]]();
    }
    catch(e){
      dream = "uh-oh... looks like a probs";
      console.log(`Making a dream, dream ${dreams[r]}, resulted in error ${e.name}: ${e.message}`);
    }
    output += `<div class='fadeIn animated'>${dream}</div>`;
    output += "<div class='fadeIn animated'><center><span class='head1'>. . . . .</span></center></div>";
    setTimeout(function(){
      setup.sleep.sleepProc();
    },500);
    return output;
  },
  sleepProc: function(){
    let Ꜹ = State.active.variables;
    //setup.time.missedCheck();//last check for missed apts
    aw.sleep.social = setup.time.socialCount();
    aw.sleep.missed = setup.sleep.getMissed();
    setup.sleep.sleepTime();
    setup.sleep.loneliness();
    let r;
    if(Ꜹ.sched.workDays[Ꜹ.date[0]] && !Ꜹ.sched.vacation[Ꜹ.date[0]] && !Ꜹ.sched.sick[Ꜹ.date[0]]){
      let shit = setup.sleep.sleepIn();
      if(shit){
        //late wake msg
        r = "latework";
      }else{
        if(aw.sleep.earlyWakeMins < aw.sleep.minsToWake - 60){
          aw.sleep.totalmins -= Math.round((aw.sleep.minsToWake - aw.sleep.earlyWakeMins)/random(2,6));
          //early wake msg
          r = "earlywork";
        }else{
          //normal wake msg
          r = "normwork";
        }
      }
    }else{
      let shit = setup.sleep.sleepTotal();
      if(shit){
        //sleeping in :)
        r = "sleptin";
      }else{
        if(aw.sleep.earlyWakeMins < aw.sleep.minsToWake - 60){
          aw.sleep.totalmins -= Math.round((aw.sleep.minsToWake - aw.sleep.earlyWakeMins)/random(2,6));
          //early wake msg
          r = "early";
        }else{
          //normal wake msg
          r = "normal";
        }
      }
    }
    if("number" !== typeof aw.sleep.totalmins || isNaN(aw.sleep.totalmins)){
      if("number" !== typeof aw.sleep.minsToWake || isNaN(aw.sleep.minsToWake)){
        aw.sleep.totalmins = 360;
      }else{
        aw.sleep.totalmins = aw.sleep.minsToWake;
      }
    }
    setup.sleep.status();
    setup.sleep.groomItems();
    setup.sleep.goddessCheck();
    Ꜹ.dayChange = false;
    Ꜹ.sched.fastSleep = false;
    Ꜹ.sched.sleepWarnOn = true;
    Ꜹ.job.late.called = 0;
    if(Ꜹ.date[0] == 1){
      Ꜹ.sched.vacation[7] = false;
      Ꜹ.sched.sick[7] = false;
    }else{
      let vvv = Ꜹ.date[0] - 1;
      Ꜹ.sched.vacation[vvv] = false;
      Ꜹ.sched.sick[vvv] = false;
    }
    aw.S();
    setup.totalATR();
    setup.calcEnergyRate();
    Ꜹ.sched.showered = false;
    Ꜹ.sched.sleepWarnOn = true;
    /*set the time to when you awake*/
    let std = Math.floor(aw.sleep.totalmins/60);
    let vd = aw.sleep.totalmins % 60;
    for(let i = 0; i < std; i++){
      setup.time.add(60,true);
    }
    setup.time.add(vd,true);
    setup.sleep.print(setup.sleep.morningText(r));
    //contentBoxer
    //msg += "<<include [[sleepinBullshit]]>>";
    setup.sleep.wakingUp();
  },
  print: function(content){
    const frag = document.createDocumentFragment();
    new Wikifier(frag, content);
    $("#contentBoxer").append(frag);
  },
  wakingUp: function(){
    setup.sleep.bar(10);
  },
  startNap: function(){
    let msg, Ꜹ = State.active.varables;
    if(Ꜹ.time[0] >= 22 || Ꜹ.time[2]){
      msg = "@@.head3;Y@@ou realize that it's simply too late to take a nap, and that you should probably consider sleeping instead.";
    }else if(Ꜹ.PC.status.fatigue > 2 && Ꜹ.PC.status.fatigue < 8){
      let t = 10 * Ꜹ.PC.status.fatigue + random(0,9);
      setup.sleep.nap(t);
      msg = `@@.head3;Y@@ou lay down for a nice nap, and wake up after ${t} minutes feeling refreshed.`;
    }else if(Ꜹ.PC.status.fatigue < 3){
      msg = "@@.head3;Y@@ou lay down for half an hour but are simply to awake to get any good sleep.";
      setup.time.add(random(30,36));
    }else if(Ꜹ.PC.status.fatigue < 10){
      let t = 15 * Ꜹ.PC.status.fatigue + random(0,9);
      setup.sleep.nap(t);
      let h = Math.floor(t/60), m = t % 60;
      h += (h > 1)? " hours" : " hour";
      m += (m == 1)? " minute" : " minutes";
      msg = `@@.head3;Y@@ou lay down for a nap, but you're so tired that you end up sleeping for ${h} and ${m}.`;
    }else{
      msg = "@@.head3;Y@@ou're simply too tired for a nap, and after laying down you end up sleeping for the night.";
      setTimeout(function(){
        setup.sleep.start();
      },3000);
    }
    return msg;
  },
  npcStart: function(){
    setTimeout(function(){
      setup.sleep.bar(8);
    },500);
    setTimeout(function(){
      setup.sleep.bar(5);
    },1200);
    setTimeout(function(){
      setup.sleep.bar(12);
    },2300);
    setTimeout(function(){
      setup.sleep.bar(10);
    },3000);
    setTimeout(function(){
      setup.sleep.bar(15);
    },3800);
    setTimeout(function(){
      setup.sleep.bar(10);
    },4500);
    setTimeout(function(){
      setup.sleep.bar(7);
    },5200);
    setTimeout(function(){
      setup.sleep.bar(13);
    },5500);
    setTimeout(function(){
      setup.sleep.bar(7);
    },5900);
  },
  sleepTime: function(){
    let t = [aw.sleep.startTime[0],aw.sleep.startTime[1],aw.sleep.startTime[2]];
    let w = [State.active.variables.sched.wakeTime[0],State.active.variables.sched.wakeTime[1],true];
    try{
      aw.sleep.minsToWake = setup.time.dif(t,w);
      if(aw.sleep.minsToWake > 480){
        aw.sleep.earlyWakeMins = 480;
      }else{
        aw.sleep.earlyWakeMins = aw.sleep.minsToWake;
      }
      if(!t[2]){
        setup.time.dateChange();
      }
    }
    catch(e){
      aw.con.error("sleepTime",e);
      aw.sleep.minsToWake = 420;
      aw.sleep.earlyWakeMins = aw.sleep.minsToWake;
    }
    return;
  },
  getMissed: function(){
    try{
      let Ꜹ = State.active.variables;
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
      return setup.time.missed(d,w);
    }
    catch(e){
      aw.con.error("getMissed",e);
      return 0;
    }
  },
  loneliness: function(){
    try{
      let Ꜹ = State.active.variables;
      let s = aw.sleep.social;
      let distro = [
        [0,0,1,3,3,3,2],
        [0,0,0,0,3,4,5],
        [0,1,1,2,2,3],
        [-1,1,1.75,2.33,2.75,3]
      ];
      if(s > 5){
        s = 5;
      }else if(s < 0){//how? lol
        s = 0;
      }
      let m = distro[3][s];
      let c = 0;
      if(s <= 0){
        c += randomDist(distro[0]);
        if(!Ꜹ.PC.trait.intro){
          c += randomDist(distro[1]);
          if(Ꜹ.PC.trait.extro){
            c += randomDist(distro[0]);
          }
        }
        if(Ꜹ.PC.trait.lowEsteem != 0){
          c += randomDist(distro[2]);
        }
        if(Ꜹ.PC.trait.romantic == 1){
          c += randomDist(distro[2]);
        }
        Ꜹ.PC.status.lonely += c;
        if(Ꜹ.PC.status.lonely >= 100){
          let x = random(1,3);
          Ꜹ.PC.status.lonely = 100 - (x * 6);
          Ꜹ.PC.status.happy -= x;
        }else if(Ꜹ.PC.status.lonely >= 70){
          Ꜹ.PC.status.happy -= 1;
        }
      }else{
        c += randomDist(distro[0])*m;
        if(!Ꜹ.PC.trait.extro){
          c += randomDist(distro[1])*m;
          if(Ꜹ.PC.trait.intro){
            c += randomDist(distro[0])*m;
          }
        }
        Ꜹ.PC.status.lonely -= Math.round(c);
        if(Ꜹ.PC.status.lonely < 0){
          if(Ꜹ.PC.trait.intro){
            Ꜹ.PC.status.stress += random(3,7);
            Ꜹ.PC.status.happy -= random(0,1);
          }else if(Ꜹ.PC.trait.extro){
            Ꜹ.PC.status.happy += 1;
          }
          Ꜹ.PC.status.lonely = 0;
        }else if(Ꜹ.PC.trait.intro && Ꜹ.PC.status.lonely <= 35){
          Ꜹ.PC.status.happy += 1;
        }else if(!Ꜹ.PC.trait.extro && Ꜹ.PC.status.lonely <= 15){
          Ꜹ.PC.status.happy += 1;
        }
      }
      aw.S();
    }
    catch(e){
      aw.con.error("loneliness",e);
    }
  },
  sleepIn: function(){
    let Ꜹ = State.active.variables;
    try{
      let hours = Math.round(aw.sleep.minsToWake/60);
      let sit = ["your body just needed the extra rest"];
      let th = 100;
      switch(hours){
      case 9:
        th = 100 + 11*(hours-8);
        break;
      case 7:
        th = (Ꜹ.PC.status.fatigue > 5) ? 98 : 100;
        break;
      case 6:
        th = (Ꜹ.PC.status.fatigue > 5) ? 96 : 98;
        sit.push("you didn't sleep long enough");
        break;
      case 5:
        th = (Ꜹ.PC.status.fatigue > 5) ? 94 : 96;
        sit.push("you didn't sleep long enough");
        break;
      case 4:
        th = (Ꜹ.PC.status.fatigue > 5) ? 85 : 95;
        sit.push("you didn't leave nearly enough time to sleep");
        break;
      case 3:
        th = (Ꜹ.PC.status.fatigue > 5) ? 70 : 85;
        sit.push("you didn't leave nearly enough time to sleep");
        break;
      case 2:
        th = (Ꜹ.PC.status.fatigue > 5) ? 60 : 70;
        sit.push("you didn't leave nearly enough time to sleep");
        break;
      case 1:
        th = (Ꜹ.PC.status.fatigue > 5) ? 50 : 60;
        sit.push("you didn't leave nearly enough time to sleep");
        break;
      case 0:
        th = (Ꜹ.PC.status.fatigue > 5) ? 25 : 40;
        sit.push("you didn't leave nearly enough time to sleep");
        break;
      }
      if(Ꜹ.PC.status.fatigue == 9){
        th -= 5;
        sit.push("you had a tiring day yesterday");
      }else if(Ꜹ.PC.status.fatigue > 9){
        th -= 20;
        sit.push("you had a tiring day yesterday");
      }
      if(Ꜹ.PC.status.energy.amt <= 2){
        switch(Ꜹ.PC.status.energy.amt){
        case 2:
          th -= 2;
          break;
        case 1:
          th -= 5;
          sit.push("you over-exerted yourself yesterday");
          break;
        case 0:
          th -= 15;
          sit.push("you over-exerted yourself yesterday");
          break;
        }
      }
      if(Ꜹ.PC.status.health < 30){
        th -= 75;
        sit.push("you're perilously ill");
      }else if(Ꜹ.PC.status.health < 50){
        th -= 50;
        sit.push("you're seriously ill");
      }else if(Ꜹ.PC.status.health < 70){
        th -= 25;
        sit.push("your poor health");
      }
      if(Ꜹ.PC.status.withdrawl){
        th -= 20;
        sit.push("your withdrawal symptoms");
      }
      if(Ꜹ.PC.status.drugs > 2){
        th -= 30;
        sit.push("the drugs");
      }
      if(Ꜹ.PC.status.alcohol > 2){
        th -= 50;
        sit.push("the alcohol");
      }
      let roll = random(1,100);
      aw.sleep.slpMsg = jQuery.extend(true, [], sit);
      if(roll > th && !Ꜹ.sched.sleepinOverride){
        aw.sleep.sleepIn = true;
        let ehr = Math.trunc((100 - th)/10);
        if(ehr <= 1){
          aw.sleep.extramins = random(15,50);
        }else{
          aw.sleep.extramins = ((ehr-1) * 60) + random (3,40);
        }
        aw.sleep.totalmins = aw.sleep.minsToWake + aw.sleep.extramins;
        return true;
      }else{
        aw.sleep.extramins = 0;
        aw.sleep.totalmins = aw.sleep.minsToWake;
        aw.sleep.sleepIn = false;
        return false;
      }
    }
    catch(e){
      aw.con.error("sleepIn",e);
      aw.sleep.extramins = 0;
      aw.sleep.totalmins = aw.sleep.minsToWake;
      aw.sleep.sleepIn = false;
      return false;
    }
  },
  sleepTotal: function(){
    try{
      let Ꜹ = State.active.variables;
      if(aw.sleep.minsToWake < 420){
        aw.sleep.minsToWake = 420;
      }
      let sit = ["your body just needed the extra rest"];
      let th = 100;
      if(Ꜹ.PC.status.fatigue == 9){
        th -= 5;
        sit.push("you had a tiring day yesterday");
      }else if(Ꜹ.PC.status.fatigue > 9){
        th -= 20;
        sit.push("you had a tiring day yesterday");
      }
      if(Ꜹ.PC.status.energy.amt <= 2){
        switch(Ꜹ.PC.status.energy.amt){
        case 2:
          th -= 2;
          break;
        case 1:
          th -= 5;
          sit.push("you over-exerted yourself yesterday");
          break;
        case 0:
          th -= 15;
          sit.push("you over-exerted yourself yesterday");
          break;
        }
      }
      if(Ꜹ.PC.status.health < 30){
        th -= 75;
        sit.push("you're perilously ill");
      }else if(Ꜹ.PC.status.health < 50){
        th -= 50;
        sit.push("you're seriously ill");
      }else if(Ꜹ.PC.status.health < 70){
        th -= 25;
        sit.push("your poor health");
      }
      if(Ꜹ.PC.status.withdrawl){
        th -= 20;
        sit.push("your withdrawal symptoms");
      }
      if(Ꜹ.PC.status.drugs > 2){
        th -= 30;
        sit.push("the drugs");
      }
      if(Ꜹ.PC.status.alcohol > 2){
        th -= 50;
        sit.push("the alcohol");
      }
      let roll = random(1,100);
      aw.sleep.slpMsg = jQuery.extend(true, [], sit);
      if(roll > th && !Ꜹ.sched.sleepinOverride){
        aw.sleep.sleepIn = false;
        let ehr = Math.trunc((100 - th)/10);
        if(ehr <= 1){
          aw.sleep.extramins = random(15,50);
        }else{
          aw.sleep.extramins = ((ehr-1) * 60) + random (3,40);
        }
        aw.sleep.totalmins = aw.sleep.minsToWake + aw.sleep.extramins;
        return true;
      }else{
        aw.sleep.extramins = 0;
        aw.sleep.totalmins = aw.sleep.minsToWake;
        aw.sleep.sleepIn = false;
        return false;
      }
    }
    catch(e){
      aw.con.error("sleepTotal",e);
      aw.sleep.extramins = 0;
      aw.sleep.totalmins = aw.sleep.minsToWake;
      aw.sleep.sleepIn = false;
      return false;
    }
  },
  status: function(){
    /*regen fatigue energy and whatnot based on sleep time*/
    let Ꜹ = State.active.variables;
    try{
      let hr = Math.floor(aw.sleep.totalmins/60);
      let c = Math.floor((hr + 1)/3);
      let a, b;
      for(let i = 0; i < c; i++){
        if(Ꜹ.PC.status.withdrawl && Ꜹ.PC.status.addict.max >= 80){
          a = i * 4 + 1;
          Ꜹ.PC.status.health -= random(0,a);
        }else if(Ꜹ.PC.status.withdrawl && Ꜹ.PC.status.addict.max >= 50){
          a = i * random(2,3) + 1;
          Ꜹ.PC.status.health -= random(0,a);
        }else if(Ꜹ.PC.status.addict.max >= 50){
          a = Math.floor(Ꜹ.PC.status.addict.max / 20) * -1;
          b = Math.max(2,i);
          Ꜹ.PC.status.health += random(a,b);
        }else{
          Ꜹ.PC.status.health += random(-1,i+1);
        }
        if(!Ꜹ.PC.trait.cl && Ꜹ.PC.trait.forgiving != -1){
          Ꜹ.PC.status.anger -= random(1,2);
        }else if(Ꜹ.PC.trait.cl || Ꜹ.PC.trait.forgiving == -1){
          Ꜹ.PC.status.anger -= random(0,1);
        }else{
          Ꜹ.PC.status.anger -= 1;
        }
        if(Ꜹ.PC.status.anger < 0){
          Ꜹ.PC.status.anger = 0;
          if(Ꜹ.PC.status.overAnger){
            Ꜹ.PC.status.overAnger = (random(0,1) == 1)? false: true;
          }
        }
      }
      Ꜹ.PC.status.fatigue -= Math.round(hr * Math.max(((Ꜹ.PC.status.health / 100) * (1-(Math.min(Ꜹ.PC.status.arousal,12)*0.075))),0.25));
      if(Ꜹ.PC.status.fatigue < 0){
        Ꜹ.PC.status.fatigue = 0;
      }
      if(hr >= 7){
        Ꜹ.PC.status.energy.amt += 7 + Math.round((hr-7)/2);
      }else{
        Ꜹ.PC.status.energy.amt += hr;
      }
      if(Ꜹ.PC.status.energy.amt > Ꜹ.PC.status.energy.max){
        Ꜹ.PC.status.energy.amt = Ꜹ.PC.status.energy.max;
      }
      Ꜹ.PC.status.arousal -= Math.floor(hr * Math.max(0.25,(Ꜹ.PC.status.satisfaction/100)));
      if(Ꜹ.PC.status.arousal < 0){
        Ꜹ.PC.status.arousal = 0;
      }
    }
    catch(e){
      aw.con.error("sleep.status",e);
      Ꜹ.PC.status.fatigue = 1;
      Ꜹ.PC.status.energy.amt = Ꜹ.PC.status.energy.max - 2;
      Ꜹ.PC.status.arousal = 0;
      Ꜹ.PC.status.anger = 0;
    }
  },
  groomItems: function(){
    let groom = State.active.variables.PC.groom;
    /*perform standard actions and calculations*/
    groom.armpitCount += (groom.armpit != 0)? 1 : 0;
    groom.leghairCount += (groom.leghair != 0)? 1 : 0;
    groom.pubeCount += (groom.pube != 0)? 1 : 0;
    let main = ["armpit","leghair","pube","pube"];
    let cunt = ["armpitCount","leghairCount","pubeCount","pubeGrow"];
    for(let i = 0; i < 4; i++){
      let m = groom[main[i]];
      let c = groom[cunt[i]];
      if(c >= 20 && m < 5){
        groom[main[i]] = 5;
      }else if(c >= 10 && m < 4){
        groom[main[i]] = 4;
      }else if(c >= 5 && m < 3){
        groom[main[i]] = 3;
      }else if(c >= 2 && m < 2){
        groom[main[i]] = 2;
      }else if(c < 2){
        groom[main[i]] = 1;
      }
    }
    aw.S();
    try{
      if(groom.genMU != "none" || groom.eyeMU != "none" || groom.lipMU != "none"){
        setup.makeup.smear();
      }
      setup.hair.undo();
    }
    catch(e){
      aw.con.error("sleep.groomItems-hair/makeup",e);
    }
  },
  goddessCheck: function(){
    let mute = State.active.variables.PC.mutate;
    let pc = State.active.variables.PC;
    if(mute.cycle && mute.multiple && mute.twinWomb && mute.birthCon && mute.gestate && (mute.acid || mute.mouth) && pc.fert.fertility > 5 && pc.body.hips >=6 && pc.kink.pregnancy && pc.trait.libido >= 7 && pc.body.tits.cupRaw >= 19){
      mute.goddess = true;
      mute.fertStorm = true;
    }else{
      mute.goddess = false;
      if(mute.cycle && mute.multiple && mute.twinWomb && pc.fert.fertility > 5 && pc.body.hips >= 5 && pc.kink.pregnancy){
        mute.fertStorm = true;
      }else{
        mute.fertStorm = false;
      }
    }
    aw.S();
  },
  nap: function(min){
    aw.L();
    let hr = Math.floor(min/30);
    let Ꜹ = State.active.variables;
    Ꜹ.PC.status.fatigue -= Math.min(2,Math.round(hr * Math.max(((Ꜹ.PC.status.health / 100) * (1-(Math.min(Ꜹ.PC.status.arousal,12)*0.075))),0.25)));
    if(Ꜹ.PC.status.fatigue < 0){
      Ꜹ.PC.status.fatigue = 0;
    }
    Ꜹ.PC.status.energy.amt += Math.round(hr/4);
    if(Ꜹ.PC.status.energy.amt > Ꜹ.PC.status.energy.max){
      Ꜹ.PC.status.energy.amt = Ꜹ.PC.status.energy.max;
    }
    Ꜹ.PC.status.arousal -= Math.floor(hr * Math.max(0,(Ꜹ.PC.status.satisfaction/100)));
    if(Ꜹ.PC.status.arousal < 0){
      Ꜹ.PC.status.arousal = 0;
    }
    aw.S();
  },
  morningText: function(wu) {
    let Ꜹ = State.active.variables;
    let msg = '<div class="fadeIn animated"><p style="font-size:120%;"><span class="clock"><<print setup.timeDisp>></span> <<print setup.time.dateDisplay()>><br>';
    //setup.time.format
    let minToWork, leftTxt;
    try{
      if(Ꜹ.sched.workDays[Ꜹ.date[0]] && !Ꜹ.sched.vacation[Ꜹ.date[0]] && !Ꜹ.sched.sick[Ꜹ.date[0]]){
        let t = [aw.sleep.startTime[0],aw.sleep.startTime[1],aw.sleep.startTime[2]];
        let w = [Ꜹ.sched.workTime[Ꜹ.date[0]][0],Ꜹ.sched.workTime[Ꜹ.date[0]][1],true];
        try{
          minToWork = setup.time.dif(t,w);
          aw.sleep.timeUntilWork = minToWork;
        }
        catch(e){
          aw.con.error("morningText",e);
          minToWork = 20;
        }
        if(!setup.time.after(w)){
          aw.sleep.timeUntilWork *= -1;
          leftTxt = `<span class='bad'>You're already ${setup.time.format(minToWork)} late for work!</span></p>`;
          wu = "verylate";
        }else if(minToWork < 30){
          leftTxt = `<span class='import'>You only have ${setup.time.format(minToWork)} until work!</span></p>`;
        }else{
          leftTxt = `You have to be at work in ${setup.time.format(minToWork)}.</p>`;
        }
      }else{
        leftTxt = "You don't have work today.</p>";
      }
    }
    catch(e){
      aw.con.error("Morning text, getting info on work...",e);
      leftTxt = "there was an error";
    }
    let ttw, ttest;
    try{
      ttw = setup.map.time("current",Ꜹ.job.loc);
      ttest = Math.ceil(minToWork/5) * 5 + 5;
    }
    catch(e){
      ttw = 15;
      ttest = 15;
      aw.con.error("sleep.morningText",e);
    }
    msg += leftTxt;
    msg += "<p>";
    let r;
    switch(wu){
    case "verylate":
      r = random(0,(aw.sleep.slpMsg.length - 1));
      msg += `@@.head3;Y@@ou fumble for your phone, staring with bleary eyes until you finally grasp the meaning of the numbers on the screen. @@.mono;Shit! I overslept. I've got to get to work!@@ You don't know whether it was because ${aw.sleep.slpMsg[r]}, or just plain bad luck, but you've definitely overslept.</p><p>Doing some fuzzy mental math, you try to figure out the time. You realize that you're already late for work, which started ${setup.time.format(minToWork)} ago. @@.mono;Damn, it's going to take me at least ${setup.time.format(ttest)} to get there too.@@</p>`;
      break;
    case "latework":
      r = random(0,(aw.sleep.slpMsg.length - 1));
      msg += `@@.head3;Y@@ou fumble for your phone, staring with bleary eyes until you finally grasp the meaning of the numbers on the screen. @@.mono;Shit! I overslept. I've got to get to work!@@ You don't know whether it was because ${aw.sleep.slpMsg[r]}, or just plain bad luck, but you've definitely overslept.</p><p>Doing some fuzzy mental math, you try to figure out the time. You realize that `;
      if(minToWork < (ttw + 10)){
        msg += `you aren't late yet, but work is starting in ${setup.time.format(minToWork)}, and you'll never make it on time. @@.mono;It's going to take me at least ${setup.time.format(ttest)} to get there...@@</p>`;
      }else{
        msg += `you have a little time before work, but certainly not as much as you'd planned on. @@.mono;Let's see, it's going to take at least ${setup.time.format(ttest)} to get there, which leaves me ${setup.time.format((minToWork-ttest))}...</p>`;
      }
      break;
    case "earlywork":
      msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and grab your phone to check the time. @@.mono;Looks like my alarm hasn't even gone off yet...@@ You do some mental math to figure out how much time you have to get ready. @@.mono;Well it looks like I have ${setup.time.format((minToWork-ttest))} before I need to leave.@@</p>`;
      break;
    case "normwork":
      msg += `@@.head3;W@@ith a groan, you reach over to the nightstand and silence your phone alarm. @@.mono;Guess it's time to get ready for work...@@ You do some mental math to figure out how much time you have to get ready. @@.mono;Well it looks like I have ${setup.time.format((minToWork-ttest))} before I need to leave.@@</p>`;
      break;
    case "sleptin":
      r = random(0,(aw.sleep.slpMsg.length - 1));
      msg += `@@.head3;Y@@ou fumble for your phone, staring with bleary eyes until you finally grasp the meaning of the numbers on the screen. @@.mono;Oh wow, I slept a lot@@ You don't know whether it was because ${aw.sleep.slpMsg[r]}, or just plain bad luck, but you've definitely slept in. @@.mono;Thank goodness I don't have work today!@@</p>`;
      break;
    case "early":
      msg += "@@.head3;W@@ith a groan, you reach over to the nightstand and grab your phone to check the time. @@.mono;Looks like my alarm hasn't even gone off yet... Why did I even set my alarm for my day off, anyway?@@</p>";
      break;
    case "normal":
      msg += "@@.head3;W@@ith a groan, you reach over to the nightstand and silence your phone alarm. @@.mono;Guess it's time to wake up... Why did I even set my alarm for my day off, anyway?@@</p>";
      break;
    default:
      msg += `It seems like there was a strange error with my wakeup code... This is a bug. wu = ${wu}.</p>`;
      break;
    }
    msg += "</div>";
    msg += setup.getReadySettings();
    return msg;
  },
};

setup.getReadySettings = function(){
  State.temporary.enabled = true;
  State.temporary.clothes = "standard";
  State.temporary.ling = "standard";
  State.temporary.over = "standard";
  State.temporary.makeup = "standard";
  State.temporary.hair = "standard";
  State.temporary.clothesets = ["broken","because","paeden ;)"];
  State.temporary.lingsets = ["broken","because","paeden ;)"];
  State.temporary.oversets = ["broken","because","paeden ;)"];
  State.temporary.hairsets = Object.keys(State.active.variables.PC.groom.hairSets);
  State.temporary.makeupsets = Object.keys(State.active.variables.makeupSet);
  let out = "<div class='fadeIn animated'><p><span class='head3'>Quick Prep:</span><br>";
  out += `Enabled <<checkboxB "_enabled" false true>><<tab>>Hair<<dropdown "_hair" _hairsets>><<tab>>Makeup<<dropdown "_makeup" _makeupsets>><br><br>Underwear<<dropdown "_ling" _lingsets>><<tab>>Clothing<<dropdown "_clothes" _clothesets>><<tab>>Overwear<<dropdown "_over" _oversets>></p></div><br>`;
  return out;
};

setup.calcEnergyRate = function(){
  aw.L();
  let pc = State.active.variables.PC;
  let rate = 10 - Math.max(7,Math.floor(pc.skill.athletic/50));
  if(pc.status.health < 30){
    rate += 8;
  }else if(pc.status.health < 50){
    rate += 4;
  }else if(pc.status.health < 70){
    rate += 2;
  }
  if(pc.status.jonesing > 0){
    rate += pc.status.jonesing;
  }
  if(pc.status.withdraw){
    rate += 2;
  }
  if(pc.status.fatigue > 3){
    rate += 2;
  }else if(pc.status.fatigue > 2){
    rate += 1;
  }
  if(pc.status.stress >= 70){
    rate += 2;
  }
  pc.status.energy.rate = rate;
  aw.S();
  return rate;
};

aw.dreams = {
  standard: function(){
    let x = random(1,10);
    return `<p>@@.head3;Y@@ou lay peacefully in your bed, your <<pcBoobSize>> chest rising and falling with your slow breathing. There is a sigh of wind and your sleeping form shivers slightly, your <<pcShoulderSize>> shoulders hunching slightly under the covers. A bony, almost skeletal hand comes to rest on your lower abdomen, just above <<pcPubes 0>></p><p><span class="npc" style="color:#1ff455;">Rest young one... There is so much in store for you...</span> A tingle of pleasure shoots up your spine. <span class="npc" style="color:#1ff455;">You're having a standard ordinary dream (placeholder) ${x} of 10... Just wait until the <i>real</i> dreaming begins.</span> With an almost inaudible chuckle, the ancient presence is gone...</p>`;
  },
  none: function(){
    return "<p>@@.head3;Y@@ou rest peacefully through the night. You likely have many dreams, but none that you still remember by the time you awake in the morning.</p>";
  },
  unsatisfied: function(){
    return "You're having an erotic dream caused by your lack of satisfaction recently (placeholder).";
  },
  needy: function(){
    return "You're having a needy dream, but it hasn't been written yet!";
  },
  preg: function(){
    return "You're having a pregnancy dream, but it hasn't been written yet!";
  },
  latePreg: function(){
    return "You're having a dream near the end of pregnancy somehow... Aside from that not being possible, it isn't written yet...";
  }
};
