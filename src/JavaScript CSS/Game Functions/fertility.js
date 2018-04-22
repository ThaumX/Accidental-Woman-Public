/*
███████╗███████╗██████╗ ████████╗██╗██╗     ██╗████████╗██╗   ██╗
██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
█████╗  █████╗  ██████╔╝   ██║   ██║██║     ██║   ██║    ╚████╔╝
██╔══╝  ██╔══╝  ██╔══██╗   ██║   ██║██║     ██║   ██║     ╚██╔╝
██║     ███████╗██║  ██║   ██║   ██║███████╗██║   ██║      ██║
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝
*/
setup.fert = {};

/*Function for running a menstrual cyle of death*/
setup.fert.cycle = function(tgt = 0){
  let AW = State.active.variables, cycDay, cycLength, char, ovuDays, cycStart, ovuMod, sOv, period;
  let d = AW.date;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if(tgt == 0){
    char = State.active.variables.PC;
  }else if(pattern.test(tgt)){
    char = State.active.variables.NPC[tgt];
  }else {
    aw.con.warn(`invalid target: ${tgt} given to fert.cycle function.`);
    return;
  }
  cycLength = char.fert.cycle;
  cycStart = char.fert.cycStart;
  ovuMod = char.fert.ovuMod;
  period = char.fert.period;
  cycDay = setup.fert.dayOfCycle(tgt);
  if(cycDay == 1){
    ovuMod = randomDist([2,3,3,4,3,3,2])-4;
    char.fert.ovuMod = ovuMod;
  }else if(cycDay == cycLength){
    if(d[0] < 7){
      cycStart = [d[0]+1,d[1]];
    }else if(d[1] < 4){
      cycStart = [1,d[1]+1];
    }else{
      cycStart = [1,1];
    }
    char.fert.cycStart = [cycStart[0],cycStart[1]];
  }
  if(char.mutate.cycle){
    let m = Math.floor(cycLength / 2) + ovuMod;
    ovuDays = [m-2,m,m+2];
    sOv = m;
  }else{
    let m = Math.floor(cycLength / 2) + ovuMod;
    ovuDays = [m];
    sOv = m;
  }
  if((char.status.wombA.preg && char.status.wombA.know) || (char.status.wombB.preg && char.status.wombB.know)){
    let w = (char.status.wombA.weeks >= char.status.wombB.weeks) ? char.status.wombA.weeks : char.status.wombB.weeks;
    char.status.fertText = `${w} weeks pregnant`;
    char.status.p = 0;
    char.status.risk = 0;
  }else{
    char.status.risk = setup.fert.riskyDay(cycDay,cycLength);
    let f = [
      "safe day",
      "safe day",
      "likely safe",
      "risky day",
      "dangerous day",
      "ovulating"
    ];
    char.status.fertText = f[char.status.risk];
    if(cycDay <= period){
      let p, str = [
          [0],
          [3],
          [3,1],
          [2,3,1],
          [2,3,2,1],
          [2,3,3,2,1],
          [3,4,3,2,2,1],
          [3,4,3,3,2,2,1],
          [3,4,3,3,2,2,2,1]
        ], desc = [
          "none",
          "light period",
          "period",
          "heavy period",
          "stuck pig"
        ];
      char.status.period = p[period[cycDay]];
      char.status.fertText = desc[char.status.p];
    }else{
      char.status.period = 0;
    }
  }
};

setup.fert.riskyDay = function (day,length){
  let fov = (length < 26) ? 13 : 14;
  if(day < (fov - 7)){
    return 1;
  }else if(day < (fov - 5)){
    return 2;
  }else if(day < (fov - 3)){
    return 3;
  }else if(day < fov){
    return 4;
  }else if(day == fov){
    return 5;
  }else if(day < (fov+2)){
    return 3;
  }else if(day < (fov+4)){
    return 2;
  }else{
    return 0;
  }
};

setup.fert.thinkBC = function (tgt = 0){
  let char;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if(tgt == 0){
    char = State.active.variables.PC;
  }else if(pattern.test(tgt)){
    char = State.active.variables.NPC[tgt];
  }else {
    return new SyntaxError(`invalid target: ${tgt} given to fert.thinkBC function.`);
  }
  if(status.wombA.know || status.wombB.know){
    return true;
  }else{
    return false;
  }
};

setup.fert.dayOfCycle = function(tgt = 0){
  let d = State.active.variables.date, dDays, cDays, char, c;
  const pattern = new RegExp(/n[0-9]{3,5}$/);
  if(tgt == 0){
    char = State.active.variables.PC;
  }else if(pattern.test(tgt)){
    char = State.active.variables.NPC[tgt];
  }else {
    return new SyntaxError(`invalid target: ${tgt} given to dayOfCycle function.`);
  }
  c = char.fert.cycStart;
  dDays = (d[1]-1)*7 + d[0];
  cDays = (c[1]-1)*7 + c[0];
  if(cDays == dDays){
    return 1;
  }else if(dDays > cDays){
    return (dDays - cDays) + 1;
  }else if(dDays < cDays){
    dDays += 28;
    return (dDays - cDays) + 1;
  }else{
    setup.alert(`WTF error with fert.dayOfCycle - month days = ${dDays}, cycle days = ${cDays}.`);
    return 0;
  }
};



