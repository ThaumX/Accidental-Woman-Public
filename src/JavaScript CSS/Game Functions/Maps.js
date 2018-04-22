/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/
/******************************************
|   ███╗   ███╗ █████╗ ██████╗ ███████╗   |
|   ████╗ ████║██╔══██╗██╔══██╗██╔════╝   |
|   ██╔████╔██║███████║██████╔╝███████╗   |
|   ██║╚██╔╝██║██╔══██║██╔═══╝ ╚════██║   |
|   ██║ ╚═╝ ██║██║  ██║██║     ███████║   |
|   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝   |
|   ThaumX - Game area navigation code.   |
******************************************/

setup.map = {};


/******************************************
ONCLICK NAVIGATION FUNCTION
navigates to next location based on
imagemap click. Saves pasage load time
******************************************/
setup.map.nav = function(main,sub,tert = false){
  let dest;
  if(main == "start"){
    Engine.play("Start");
  }
  if(State.active.variables.map.loc[0] == main){
    switch(main){
    case "bullseye":
      dest = "controlBullseye";
      break;
    case "downtown":
      dest = "controlDowntown";
      break;
    case "residential":
      dest = "controlResidential";
      break;
    case "home":
      dest = "homeControl";
      break;
    case "BFhome":
      dest = "BFhomeControl";
      break;
    case "world":
      if(sub == "main"){ //We want to skip map control for these map-only passages as there is no movement yet.
        Engine.play("MuschiValleyMap");
      }else if(sub == "appletree"){
        Engine.play("AppletreeMap");
      }
      dest = "worldControl";
      break;
    default:
      setup.alert(`map.nav function ran with invalid main map value: ${main}! (sub: ${sub}.) Navigation aborted.`);
      return;
    }
  }else{ //if it's not inter-map travel, we shunt to intermap control first to handle intermap events
    dest = "intermapControl";
  }
  try{
    if(State.active.variables.map.history.length > 4){
      State.active.variables.map.history.pop();
    }
    State.active.variables.map.history.unshift([State.active.variables.map.lastLoc[0],State.active.variables.map.lastLoc[1],State.active.variables.map.lastLoc[2]]);
    State.active.variables.map.lastLoc = [State.active.variables.map.loc[0],State.active.variables.map.loc[1],State.active.variables.map.loc[2]];
    State.active.variables.map.loc = [main,sub,tert];
    State.active.variables.returnTo = passage(); //automatically set the default return passage
  }
  catch(e){
    setup.alert(`map.nav function failed at setting coordinates or retrieving current passage with error ${e.name}: ${e.message}.`);
  }
  Engine.play(dest);
};
/******************************************
TRAVEL TIME FUNCTION
determine the time required to travel between two points.
******************************************/
Macro.add("gotomap",{
  handler: function(){
    let main, sub, tert, cmd;
    if(Array.isArray(this.args[0])){
      if(this.args[0].length >= 3){
        main = this.args[0][0];
        sub = this.args[0][1];
        tert = this.args[0][2];
        cmd = this.args.length > 1 ? this.args[1] : false;
      }else if(this.args[0].length == 2){
        main = this.args[0][0];
        sub = this.args[0][1];
        tert = false;
        cmd = this.args.length > 1 ? this.args[1] : false;
      }else{
        return this.error("malformed destination array.");
      }
    }else if(this.args.length >= 2){
      switch(this.args.length){
      case 4:
        cmd = this.args[3];
        tert = this.args[2];
        sub = this.args[1];
        main = this.args[0]; //because eslint was mad at me for fallthrough...
        break;
      case 3:
        tert = this.args[2];
        sub = this.args[1];
        main = this.args[0];
        break;
      case 2:
        sub = this.args[1];
        main = this.args[0];
        break;
      default:
        return this.error("Excessive arguments sent to gotomap.");
      }
    }else{
      return this.error("Too few arguments.");
    }
    setup.map.nav(main,sub,tert);
  }
});
/******************************************
TRAVEL MACRO
handles all the repetitive tasks of setting
some variables and returns time in _mapTime
******************************************/
Macro.add("mapProcessMove",{
  handler: function(){
    State.temporary.mapTime = setup.map.time();
    if("number" != typeof State.temporary.mapTime || isNaN(State.temporary.mapTime)){
      if(State.temporary.mapTime == null){
        aw.con.warn("mapProcessMove macro called setup.map.time() and received a result that is not a number. (value = null)");
      }else{
        aw.con.warn(`mapProcessMove macro called setup.map.time() and received a result that is not a number. Value: ${State.temporary.mapTime}`);
      }
    }
    let data = setup.map.lookup(State.active.variables.map.loc);
    let Ꜹ = State.active.variables.map;
    Ꜹ.imageName = data.image;
    Ꜹ.lastName = Ꜹ.name;
    Ꜹ.name = data.name;
    Ꜹ.lastPassage = Ꜹ.passage;
    Ꜹ.passage = data.passage;
    State.active.variables.location = data.loc;
    State.temporary.mapDesc = data.desc;
  }
});

/******************************************
TRAVEL TIME FUNCTION
look up the information for a place
returns an object with info
******************************************/
setup.map.time = function(start = "def",dest = "def"){
  let sMain,sSub,sTert,dMain,dSub,dTert;
  if(Array.isArray(start)){
    sMain = start[0];
    sSub = (start[1] == null)?"error":start[1];
    sTert = (start[2] == null)?"main":start[2];
  }else if(start == "def"){
    sMain = State.active.variables.map.lastLoc[0];
    sSub = State.active.variables.map.lastLoc[1];
    sTert = State.active.variables.map.lastLoc[2];
  }else if(start == "current"){
    sMain = State.active.variables.map.loc[0];
    sSub = State.active.variables.map.loc[1];
    sTert = State.active.variables.map.loc[2];
  }else{
    setup.alert(`Invalid start location passed to travel time calculator: ${start}.`);
    return 5;
  }
  if(Array.isArray(dest)){
    dMain = dest[0];
    dSub = (dest[1] == null)?"error":start[1];
    dTert = (dest[2] == null)?"main":start[2];
  }else if(dest == "def"){
    dMain = State.active.variables.map.loc[0];
    dSub = State.active.variables.map.loc[1];
    dTert = State.active.variables.map.loc[2];
  }else if(dest == "work"){
    dMain = State.active.variables.job.loc[0];
    dSub = State.active.variables.job.loc[1];
    dTert = State.active.variables.job.loc[2];
  }else if(dest == "home"){
    dMain = "home";
    dSub = "foyer";
    dTert = "main";
  }else{
    setup.alert(`Invalid destination location passed to travel time calculator: ${dest}.`);
    return 5;
  }
  //Time to actually get down to bidness
  let sum = 0,s = sSub,d = dSub;
  if(dMain == sMain && dMain != "world"){
    switch(dMain){
    case "residential":
      sum += setup.map.residentialTime(sSub,dSub);
      break;
    case "bullseye":
      sum += setup.map.bullseyeTime(sSub,dSub);
      break;
    case "downtown":
      sum += setup.map.downtownTime(sSub,sTert,dSub,dTert);
      break;
    case "home":
      sum += setup.randomDist([0,90,10]);
      break;
    case "BFhome":
      sum += setup.randomDist([0,90,10]);
      break;
    }
  }else{
    switch(dMain){
    case "residential":
      if(sMain != "home"){
        sum += setup.map.distToExit(dMain,dSub,dTert);
      }
      d = "appletree";
      break;
    case "bullseye":
      sum += setup.map.distToExit(dMain,dSub,dTert);
      d = "bullseye";
      break;
    case "downtown":
      sum += setup.map.distToExit(dMain,dSub,dTert);
      d = "appletree";
      break;
    case "BFhome":
      sum += setup.map.distToExit(dMain,dSub,dTert);
      d = "appletree";
      break;
    case "home":
      if(sMain != "residential"){
        sum += setup.map.distToExit("residential","common","main");
      }
      sum += setup.map.distToExit(dMain,dSub,dTert);
      d = "appletree";
      break;
    default:
      sum += random(2,4);
      d = "appletree";
      break;
    }
    switch(sMain){
    case "residential":
      sum += setup.map.distToExit(sMain,sSub,sTert);
      if(dMain == "home"){
        sum -= (6 - State.active.variables.home.stats.location)*2;
      }
      s = "appletree";
      break;
    case "bullseye":
      sum += setup.map.distToExit(sMain,sSub,sTert);
      d = "bullseye";
      break;
    case "downtown":
      sum += setup.map.distToExit(sMain,sSub,sTert);
      d = "appletree";
      break;
    case "BFhome":
      sum += setup.map.distToExit(sMain,sSub,sTert);
      d = "appletree";
      break;
    case "home":
      if(dMain != "residential"){
        sum += setup.map.distToExit("residential","common","main");
      }
      sum += setup.map.distToExit(sMain,sSub,sTert);
      d = "appletree";
      break;
    default:
      sum += random(2,4);
      d = "appletree";
      break;
    }
    sum += setup.map.carTime(setup.map.worldDistance(s,d));
  }
  if(sum < 1){sum = 1;}
  return Math.round(sum);
};
setup.map.downtownTime = function(s,st,d,dt){
  let grid = {
    parking: [1,1],
    bank: [1,1.5],
    corp: [1,2.5],
    holefoods: [1,4],
    southeast: [2,1],
    townhall: [2,2.5],
    southwest: [2,4],
    east: [3,1],
    park: [3,2.5],
    square: [2.5,2.5],
    community: [3.5,3.5],
    west: [3.4],
    northeast: [4,1],
    club: [4,2],
    mall: [4,3],
    northwest: [4,4],
    adult: [5,1],
    amuse: [5,2.5],

  };
  let x,y,sum = 0;
  if(st != "main"){
    sum += random(4,6);
  }
  if(dt != "main"){
    sum += random(4,6);
  }
  x = Math.abs(grid[s][0] - grid[s][0]);
  y = Math.abs(grid[s][1] - grid[s][1]);
  if(y == 0 || x == 0){
    x = y + x;
    sum += Math.round(1.1 * x * 5);
  }else{
    sum += Math.round((Math.sqrt(Math.pow(x,2)+Math.pow(y,2))+((x+y)*0.20))*5);
  }
  aw.con.info(`setup.map.downtownTime returns ${sum}.`);
  return sum;
};
setup.map.bullseyeTime = function(s,d){
  let grid = {
    hardware: [1,1],
    electronics: [1,2],
    toys: [1,3],
    baby: [1,4],
    grocery1: [1,5],
    housewares1: [2,1],
    womens1: [2,2],
    womens2: [2,3],
    lingerie: [2,4],
    grocery2: [2,5],
    changing: [2.5,3],
    housewares2: [3,1],
    girls: [3,2],
    boys: [3,3],
    mens: [3,4],
    grocery3: [3,5],
    pharmacy: [4,1],
    glasses: [4,2],
    barber: [4,3],
    custserv: [4,4],
    produce: [4,5],
    parking: [5,4],
  };
  let x = Math.ceil(Math.abs(grid[s][0]-grid[d][0])+Math.abs(grid[s][1]-grid[d][1]));
  aw.con.info(`setup.map.bullseyeTime returns ${x}.`);
  return x;
};
setup.map.residentialTime = function(s,d){
  let sum = 0;
  let ar = ["medical","reservoir","industrial","government"];
  if(ar.includes(s) && !ar.includes(d)){
    if(s != "reservoir"){
      sum += (6 - State.active.variables.home.stats.location)*2;
    }else{
      sum += State.active.variables.home.stats.location * 2;
    }
    sum += 4;
  }else if(ar.includes(d) && !ar.includes(s)){
    if(d != "reservoir"){
      sum += (6 - State.active.variables.home.stats.location)*2;
    }else{
      sum += State.active.variables.home.stats.location * 2;
    }
    sum += 4;
  }else if(ar.includes(d) && ar.includes(s)){
    if(s != "reservoir" && d != "reservoir"){
      sum += 1;
    }else{
      sum += 10;
    }
    sum += 4;
  }else{
    let arr;
    switch(s){
    case "common":
      arr = {
        parking: 2,
        sidewalk: 2,
        cumandgo: 5,
        recreation: 3,
        walkdowntown: 6,
        jogging: 10,
      };
      break;
    case "parking":
      arr = {
        common: 2,
        sidewalk: 3,
        cumandgo: 6,
        recreation: 2,
        walkdowntown: 7,
        jogging: 11,
      };
      break;
    case "sidewalk":
      arr = {
        common: 2,
        parking: 3,
        cumandgo: 4,
        recreation: 4,
        walkdowntown:5 ,
        jogging: 9,
      };
      break;
    case "cumandgo":
      arr = {
        common: 5,
        parking: 6,
        sidewalk: 4,
        recreation: 8,
        walkdowntown: 1,
        jogging: 10,
      };
      break;
    case "recreation":
      arr = {
        common: 3,
        parking: 2,
        sidewalk: 4,
        cumandgo: 8,
        walkdowntown: 8,
        jogging: 10,
      };
      break;
    case "walkdowntown":
      arr = {
        common: 6,
        parking: 7,
        sidewalk: 5,
        cumandgo: 1,
        recreation: 8,
        jogging: 12,
      };
      break;
    case "jogging":
      arr = {
        common: 10,
        parking: 11,
        sidewalk: 9,
        cumandgo: 10,
        recreation: 10,
        walkdowntown: 12,
      };
      break;
    }
    let v = arr[d];
    if(v == null){v = random(2,3);}
    aw.con.info(`setup.map.residential returns ${v}. S: ${s} D:${d}.`);
    return v;
  }
  aw.con.info(`setup.map.residential returns ${sum}. S: ${s} D:${d}.`);
  return sum;
};
setup.map.carTime = function(dist){
  let r = ((random(50,65)+random(50,65)+random(55,60))/3)/60;
  return Math.round(dist/r);
};
setup.map.worldDistance = function(s,d){
  let ob;
  switch(s){
  case "appletree":
    ob = {
      appletree : 0,
      institute : 8.7,
      bullseye : 15.5,
      visitor : 9.5,
      spring : 11.7,
      woods : 4.2,
      forest : 14,
      city : 68,
      coop : 20.8,
      lake : 28.3,
      restricted : 11.5,
      bridge : 5.5,
      unknown : 20,
    };
    break;
  case "institute":
    ob = {
      appletree : 8.7,
      institute : 0,
      bullseye : 24.2,
      visitor : 18.2,
      spring : 17.4,
      woods : 10,
      forest : 22.7,
      city : 76.7,
      coop : 26.9,
      lake : 24.9,
      restricted : 9.3,
      bridge : 14.2,
      unknown : 17,
    };
    break;
  case "bullseye":
    ob = {
      appletree : 15.5,
      institute : 24.2,
      bullseye : 0,
      visitor : 6,
      spring : 25.7,
      woods : 19.7,
      forest : 12.5,
      city : 53.2,
      coop : 6.7,
      lake : 23.3,
      restricted : 17.9,
      bridge : 9.6,
      unknown : 22,
    };
    break;
  case "visitor":
    ob = {
      appletree : 9.5,
      institute : 18.2,
      bullseye : 6,
      visitor : 0,
      spring : 19.7,
      woods : 13.7,
      forest : 6.5,
      city : 59.2,
      coop : 11.3,
      lake : 17.3,
      restricted : 12.9,
      bridge : 3.6,
      unknown : 22,
    };
    break;
  case "spring":
    ob = {
      appletree : 11.7,
      institute : 17.4,
      bullseye : 27.2,
      visitor : 21.2,
      spring : 0,
      woods : 7.5,
      forest : 25.7,
      city : 79.7,
      coop : 32.5,
      lake : 38.5,
      restricted : 23.2,
      bridge : 17.2,
      unknown : 31.7,
    };
    break;
  case "woods":
    ob = {
      appletree : 4.2,
      institute : 9.9,
      bullseye : 19.7,
      visitor : 13.7,
      spring : 7.5,
      woods : 0,
      forest : 18.2,
      city : 72.2,
      coop : 25.0,
      lake : 31.0,
      restricted : 15.7,
      bridge : 8.7,
      unknown : 24.2,
    };
    break;
  case "forest":
  case "city":
  case "coop":
    ob = {
      appletree : 20.8,
      institute : 26.9,
      bullseye : 6.7,
      visitor : 11.3,
      spring : 32.5,
      woods : 25.0,
      forest : 17.7,
      city : 59.9,
      coop : 0,
      lake : 13.4,
      restricted : 23.1,
      bridge : 14.8,
      unknown : 22,
    };
    break;
  case "lake":
    ob = {
      appletree : 28.3,
      institute : 24.9,
      bullseye : 23.3,
      visitor : 17.3,
      spring : 38.5,
      woods : 31.0,
      forest : 23.7,
      city : 73.3,
      coop : 13.4,
      lake : 0,
      restricted : 15.5,
      bridge : 19.1,
      unknown : 22,
    };
    break;
  case "restricted":
    ob = {
      appletree : 11.6,
      institute : 9.3,
      bullseye : 18.9,
      visitor : 12.9,
      spring : 23.2,
      woods : 15.7,
      forest : 17.4,
      city : 64.6,
      coop : 23.1,
      lake : 15.5,
      restricted : 0,
      bridge : 8.9,
      unknown : 22,
    };
    break;
  case "bridge":
    ob = {
      appletree : 5.5,
      institute : 14.2,
      bullseye : 10,
      visitor : 4,
      spring : 17.2,
      woods : 9.7,
      forest : 8.5,
      city : 62.5,
      coop : 15.3,
      lake : 22.7,
      restricted : 8.9,
      bridge : 0,
      unknown : 25,
    };
    break;
  case "unknown":
  default:
    ob = {
      appletree : 20,
      institute : 20,
      bullseye : 20,
      visitor : 20,
      spring : 20,
      woods : 20,
      forest : 20,
      city : 20,
      coop : 20,
      lake : 20,
      restricted : 20,
      bridge : 20,
      unknown : 20,
    };
    break;
  }
  aw.con.info(`setup.map.worldDistance returns ${ob[d]}. S: ${s} D:${d}.`);
  return ob[d];
};
setup.map.distToExit = function(m,s=0,t=0){
  let times = {
    home: function(){
      let ts = {
        foyer: 1,
        living: 2,
        kitchen: 2,
        bedroom: 3,
        bath: 3,
        balcony: 3,
        clean: 10,
        bed2: 3,
        bed3: 3,
      };
      return ts[s];
    },
    BFhome: function(){
      let ts = {
        foyer: 10,
        living: 11,
        kitchen: 11,
        bedroom: 12,
        bath: 12,
        balcony: 12,
        clean: 18,
        bed2: 12,
        bed3: 12,
      };
      return ts[s];
    },
    residential: function(){
      let ts, p = (6 - State.active.variables.home.stats.location)*2;
      switch(s){
      case "common":
        switch(t){
        case "mail": ts = 2 + p; break;
        case "gym": ts = 3 + p; break;
        case "party": ts = 3 + p; break;
        case "main": ts = 2 + p; break;
        default: ts = 2 + p; break;
        }
        break;
      case "parking": ts = 1 + p; break;
      case "sidewalk": ts = 3 + p; break;
      case "cumandgo":
        switch(t){
        case "checkout": ts = 6 + p; break;
        case "shop1": ts = 7 + p; break;
        case "shop2": ts = 7 + p; break;
        case "shop3": ts = 7 + p; break;
        case "shop4": ts = 7 + p; break;
        case "exterior": ts = 5 + p; break;
        default: ts = 5 + p; break;
        }
        break;
      case "recreation":
        switch(t){
        case "playground": ts = 2 + p; break;
        case "gazebo": ts = 3 + p; break;
        case "tanning": ts = 4 + p; break;
        case "pool": ts = 6 + p; break;
        case "sports": ts = 4 + p; break;
        case "main": ts = 2 + p; break;
        default: ts = 2 + p; break;
        }
        break;
      case "home": ts = 10; break;
      case "walkdowntown": ts = (6 - State.active.variables.home.stats.location) * 6; break;
      case "jogging": ts = 13; break;
      case "reservoir": ts = 14; break;
      case "medical": ts = 5; break;
      case "industrial": ts = 5; break;
      case "government": ts = 3; break;
      default: ts = 3 + p; break;
      }
      return ts;
    },
    downtown: function(){
      let ts, d = 3;
      let pyth = function(x,y){
        let dist,st = 5;
        if(y == 0 || x == 0){
          x = y + x;
          dist = Math.round(1.1 * x * st);
        }else{
          dist = Math.round((Math.sqrt(Math.pow(x,2)+Math.pow(y,2))+((x+y)*0.20))*st);
        }
        dist += d;
        return dist;
      };
      switch(s){
      case "parking": ts = 1+d; break;
      case "holefoods": ts = pyth(3,0); break;
      case "corp": ts = pyth(1.5,0); break;
      case "bank": ts = pyth(0.5,0); break;
      case "townhall": ts = pyth(1.5,1); break;
      case "park": ts = pyth(2,2); break;
      case "community": ts = pyth(2.5,2.5); break;
      case "mall":
        switch(t){
        case "exterior": ts = pyth(2,3); break;
        case "foodcourt": ts = pyth(2,3) + 3; break;
        default: ts = pyth(2,3); break;
        }
        break;
      case "club": ts = pyth(1,3); break;
      case "amuse": ts = pyth(1.5,4); break;
      case "adult": ts = pyth(0,4); break;
      case "northwest": ts = pyth(3,3); break;
      case "west": ts = pyth(3,2); break;
      case "southwest": ts = pyth(3,1); break;
      case "northeast": ts = pyth(0,3); break;
      case "east": ts = pyth(0,2); break;
      case "southeast": ts = pyth(0,1); break;
      case "square": ts = pyth(1.5,2); break;
      }
      return ts;
    },
    bullseye: function(){
      let po = {
        parking: 1,
        hardware: 8,
        electronics: 7,
        toys: 6,
        baby: 5,
        grocery1: 6,
        grocery2: 5,
        grocery3: 4,
        produce: 3,
        housewares1: 7,
        housewares2: 6,
        pharmacy: 5,
        womens1: 6,
        womens2: 5,
        lingerie: 4,
        girls: 5,
        boys: 4,
        glasses: 4,
        barber: 3,
        custserv: 2,
        changing: 4,
        mens: 3,
      };
      return po[s];
    },
  };
  let q = times[m]();
  aw.con.info(`setup.map.distToExit returns ${q}. S: ${s} M:${m}.`);
  return q;
};
/******************************************
LOOKUP FUNCTION
look up the information for a place
returns an object with info
******************************************/
setup.map.lookup = function(loc){
  let main, sub, tert;
  let ret = {
    image: "IMGtestLocImage",
    name: "Error",
    passage: 0,
    loc: "Error",
    desc: "None, there was a problem yo!",
  };
  if(loc != null && Array.isArray(loc)){
    try{
      main = loc[0];
      sub = loc[1];
      tert = (loc[2] == null) ? "none" : loc[2];
    }
    catch(e){
      setup.alert(`Error with map.lookup function input. ${e.name}: ${e.message}.`);
      main = State.active.variables.map.loc[0];
      sub = State.active.variables.map.loc[1];
      tert = State.active.variables.map.loc[2];
    }
  }else{
    main = State.active.variables.map.loc[0];
    sub = State.active.variables.map.loc[1];
    tert = State.active.variables.map.loc[2];
  }
  switch(main){
  case "bullseye":
    switch(sub){
    case "parking":
      ret = {
        name: "Bullseye Parking Lot",
        image: "IMGBullseye",
        passage: "BEparking",
        loc: "Bullseye Parking Lot",
        desc: "You are walking, which is mostly what people do in parking lots. Well, except for that...",
      };
      break;
    case "hardware":
      ret = {
        name: "Bullseye Hardware Department",
        image: "IMGBullseyeHardware",
        passage: "BEhardware",
        loc: "Bullseye - Hardware",
        desc: "You are standing in the main aisle, gazing at the rows of DIY and home improvement goods.",
      };
      break;
    case "electronics":
      ret = {
        name: "Bullseye Electronics Department",
        image: "IMGBullseyeElectronics",
        passage: "BEelectronics",
        loc: "Bullseye - Electronics",
        desc: "You are staring at the wall of display televisions, wondering if you should turn them all to different channels.",
      };
      break;
    case "toys":
      ret = {
        name: "Bullseye Toy Department",
        image: "IMGBullseyeToys",
        passage: "BEtoys",
        loc: "Bullseye - Toys",
        desc: "You are looking around, marveling at how toys have changed since you were a kid.",
      };
      break;
    case "baby":
      ret = {
        name: "Bullseye Baby Department",
        image: "IMGBullseyeBaby",
        passage: "BEbaby",
        loc: "Bullseye - Baby",
        desc: "Looking around at all the cute baby things has you wondering what it would be like to have your own baby.",
      };
      if(State.active.variables.PC.kink.pregnancy){
        ret.desc = "You realize that just standing here is getting you to think about making babies, and you're getting worked up.";
      }else if(State.active.variables.PC.status.kids > 0){
        if(State.active.variables.PC.status.kids == 1){
          ret.desc = "When you look around the baby section, it reminds you of your own children. All the cute things kind of make you think about having another one.";
        }else{
          ret.desc = "When you look around the baby section, it reminds you of your own child. All the cute things kind of make you think about having another one.";
        }
      }
      break;
    case "grocery1":
      ret = {
        name: "Bullseye Grocery Department - Cooler Section",
        image: "IMGBullseyeGrocery2",
        passage: "BEgrocery1",
        loc: "Bullseye - Grocery",
        desc: "The cooler air in the part of the store gives you slight goosebumps.",
      };
      break;
    case "housewares1":
      ret = {
        name: "Bullseye Housewares Department",
        image: "IMGBullseyeHousewares1",
        passage: "BEhousewares1",
        loc: "Bullseye - Housewares",
        desc: "An 'as seen on TV' shelf draws your attention, full of things that seem both innovative and useless.",
      };
      break;
    case "womens1":
      ret = {
        name: "Bullseye Women's Clothing Department",
        image: "IMGBullseyeWomens2",
        passage: "BEwomens1",
        loc: "Bullseye - Women's",
        desc: "you look at the variety of the clothing that seems to be displayed following absolutely no organising method whatsoever.",
      };
      break;
    case "womens2":
      ret = {
        name: "Bullseye Women's Clothing Department",
        image: "IMGBullseyeWomens1",
        passage: "BEwomens2",
        loc: "Bullseye - Women's",
        desc: "you look at the variety of the clothing that seems to be displayed following absolutely no organising method whatsoever.",
      };
      break;
    case "lingerie":
      ret = {
        name: "Bullseye Lingerie & Jewelry Departments",
        image: "IMGBullseyeLingerie",
        passage: "BElingerie",
        loc: "Bullseye - Lingerie",
        desc: "You look around, distracted. There's a lot here to catch the eye.",
      };
      break;
    case "grocery2":
      ret = {
        name: "Bullseye Grocery Department - Bulk Goods",
        image: "IMGBullseyeGrocery",
        passage: "BEgrocery2",
        loc: "Bullseye - Grocery",
        desc: "As you look around, you remember when you only had the relatively small men's toiletries section to deal with.",
      };
      break;
    case "housewares2":
      ret = {
        name: "Bullseye Housewares Department",
        image: "IMGBullseyeHousewares1",
        passage: "BEhousewares2",
        loc: "Bullseye - Housewares",
        desc: "Some vibrant pink caught your eye in the athletic equipment aisle, and when you take a look you see that it was a set of dainty pink weights that look rediculous next to the larger weights meant for men.",
      };
      break;
    case "girls":
      ret = {
        name: "Bullseye Girl's Clothing Department",
        image: "IMGBullseyeGirls",
        passage: "BEchild1",
        loc: "Bullseye - Girl's",
        desc: "As you stand looking at all the children's clothing, you find yourself thinking that one tiny outfit or another is super cute.",
      };
      break;
    case "boys":
      ret = {
        name: "Bullseye Boy's Clothing Department",
        image: "IMGBullseyeBoys",
        passage: "BEchild2",
        loc: "Bullseye - Boy's",
        desc: "As you stand looking at all the children's clothing, you find yourself thinking that one tiny outfit or another is super cute.",
      };
      break;
    case "mens":
      ret = {
        name: "Bullseye Men's Clothing Department",
        image: "IMGBullseyeMens",
        passage: "BEmens",
        loc: "Bullseye - Men's",
        desc: "You can't help but think that buying clothes as a man was so much more convenient.",
      };
      break;
    case "grocery3":
      ret = {
        name: "Bullseye Grocery Department - Dry Goods",
        image: "IMGBullseyeGrocery2",
        passage: "BEgrocery3",
        loc: "Bullseye - Grocery",
        desc: "You're starting to get hungry from looking at all the food.",
      };
      break;
    case "pharmacy":
      ret = {
        name: "Bullseye Pharmacy Department",
        image: "IMGBullseyePharmacy",
        passage: "BEpharmacy",
        loc: "Bullseye - Pharmacy",
        desc: "Looking around, it seems like someone took a larger pharmacy and split it between the grocery section and this smaller one. You were thinking how much of a pain it'd be to walk across the store, but then you realize that's probably the whole point.",
      };
      break;
    case "glasses":
      ret = {
        name: "Bat's Optometry Clinic",
        image: "IMGBullseyeGlasses",
        passage: "BEglasses",
        loc: "Bullseye Vendor",
        desc: "The cute logo on the sign of a cartoon bat wearing glasses is obviously meant to imply that they can even give bats good vision... but you wonder if a bat is really the best mascot for an optometrist.",
      };
      break;
    case "barber":
      ret = {
        name: "BEST HEAD! - Barbershop",
        image: "IMGBullseyeHair",
        passage: "BEbarber",
        loc: "Bullseye Vender",
        desc: "Aside from the funny name, you aren't entirely sure about the quality of this salon. It's cheap and convenient though... perhaps if you keep it simple?",
      };
      break;
    case "custserv":
      ret = {
        name: "Bullseye Customer Service",
        image: "IMGBullseye",
        passage: "BEcustserv",
        loc: "Bullseye - Checkout",
        desc: "This area of the store is kind of depressing for some reason, so you try not to think about it.",
      };
      break;
    case "produce":
      ret = {
        name: "Bullseye Produce Department",
        image: "IMGBullseyeProduce",
        passage: "BEproduce",
        loc: "Bullseye - Produce",
        desc: "You watch a woman who seems to be around 30 years old as she browses the produce. She spends a strange amount of time examining jumbo cucumbers before moving on to the eggplants.",
      };
      break;
    case "changing":
      ret = {
        name: "Bullseye Changing Rooms",
        image: "IMGBullseyeChanging",
        passage: "BEchanging",
        loc: "Bullseye - Changing",
        desc: "A small set of rooms that offer a presumption of privacy to try on clothes. You can't help but wonder just how private they really are though...",
      };
      break;
    }
    break;
  case "residential":
    switch(sub){
    case "common":
      switch(tert){
      case "mail":
        ret = {
          name: "Apartment Building - Mail Room",
          image: "IMGresidentialMail",
          passage: "ResidentialMailRoom",
          loc: "Apartment - Mail Room",
          desc: "A small room with boxes for mail delivery, as well as a deposit slot to mail letters.",
        };
        break;
      case "gym":
        ret = {
          name: "Apartment Building - Gym",
          image: "IMGresidentialGym",
          passage: "ResidentialWorkoutRoom",
          loc: "Apartment - Gym",
          desc: "You're in the small common exercise area provided for residents to use.",
        };
        break;
      case "party":
        ret = {
          name: "Apartment Building - Common Room",
          image: "IMGresidentialCommonRoom",
          passage: "ResidentialCommonRoom",
          loc: "Apartment - Common Room",
          desc: "You're in the apartment building's common room, an area used to hold parties and other events for residents.",
        };
        break;
      case "main":
      default:
        ret = {
          name: "Apartment Building - Common Area",
          image: "IMGresidentialCommonArea",
          passage: "ResidentialCommonArea",
          loc: "Apartment - Common Area",
          desc: "You're standing in the small downstairs common area of your apartment building. Opposite of the elevator and stairwell there's a sitting area that consists of a couch and a few upholstered chairs surrounding a simple coffee table. Closer to the main entry is an open doorway leading to the mailroom. Further inside, the common area ends with hallways splitting off in each direction. Next to the front entrance is a small exercise room, and a larger common room for gatherings.",
        };
        break;
      }
      break;
    case "parking":
      ret = {
        name: "Apartment Parking Lot",
        image: "IMGresidentialCourtyard",
        passage: "ResidentialParkingLot",
        loc: "Parking Lot",
        desc: "You are in the common area at the center of a block of buildings that includes your apartment building. The square block of buildings has a large opening at the center, leaving plenty of room for parking as well as a small neighborhood park. While there isn't a lot of space, they've managed to fit a small playground, some picnic tables, a half-sized basketball court, a BBQ area, and a small grassy area for tanning in the park.",
      };
      break;
    case "sidewalk":
      ret = {
        name: "Residential Area Sidewalk",
        image: "IMGresidentialOutside",
        passage: "ResidentialSidewalk",
        loc: "Your Neighborhood",
        desc: "You are standing on the sidewalk next to your apartment building, it's a short walk downtown from here, and there is a bike trail nearby.",
      };
      break;
    case "cumandgo":
      switch(tert){
      case "checkout":
        ret = {
          name: "Cum & Go Convenience Store",
          image: "IMGkum&goStore",
          passage: "ResidentialCornerInteriorA",
          loc: "Cum & Go",
          desc: "You're near the checkout counter of the Cum & Go convenience store.",
        };
        break;
      case "shop1":
        ret = {
          name: "Cum & Go Cleaning, Health & Hygiene",
          image: "IMGkum&goStore",
          passage: "ResidentialCornerInteriorB",
          loc: "Cum & Go",
          desc: "are in the section the store that has cleaning, hygiene, and medicine items.",
        };
        break;
      case "shop2":
        ret = {
          name: "Cum & Go Cooler Section",
          image: "IMGkum&goStore",
          passage: "ResidentialCornerInteriorC",
          loc: "Cum & Go",
          desc: "You are in the cooler section of Cum & Go that has all the refrigerated food and drinks.",
        };
        break;
      case "shop3":
        ret = {
          name: "Cum & Go Miscellaneous",
          image: "IMGkum&goStore",
          passage: "ResidentialCornerInteriorD",
          loc: "Cum & Go",
          desc: "You're in an aisle with a odd mixture of items that wouldn't fit with a larger category. What the hell is blinker fluid, anway?",
        };
        break;
      case "shop4":
        ret = {
          name: "Cum & Go Food Section",
          image: "IMGkum&goStore",
          passage: "ResidentialCornerInteriorE",
          loc: "Cum & Go",
          desc: "You are surrounded by items that could technically be called food, though you have to look at a few labels to be sure.",
        };
        break;
      case "exterior":
      default:
        ret = {
          name: "Cum & Go Exterior",
          image: "IMGkum&goStore",
          passage: "ResidentialCornerExterior",
          loc: "Cum & Go",
          desc: "You're standing outside a typical convenience store, creatively named 'Cum & Go.",
        };
        break;
      }
      break;
    case "recreation":
      switch(tert){
      case "playground":
        ret = {
          name: "Neighborhood Playground",
          image: "IMGresidentialCourtyard",
          passage: "ResidentialPlayground",
          loc: "Residential - Recreation",
          desc: "",
        };
        break;
      case "gazebo":
        ret = {
          name: "Community Gazebo",
          image: "IMGresidentialGazebo",
          passage: "ResidentialGazebo",
          loc: "Residential - Recreation",
          desc: "You're in a nice wooden gazebo that contains some picinic tables. Nearby are the standard steel grills found in parks everywhere.",
        };
        break;
      case "tanning":
        ret = {
          name: "Grassy Picnic Area",
          image: "IMGsunbathing1",
          passage: "ResidentialTanning",
          loc: "Residential - Recreation",
          desc: "You're in a grassy area surrounded by hedges. It seems to be intended more for tanning and relaxation than picnics though.",
        };
        break;
      case "pool":
        ret = {
          name: "Neighborhood Pool",
          image: "IMGresidentialPool",
          passage: "ResidentialPool",
          loc: "Residential - Recreation",
          desc: "You're near a pool for residents of the apartment complex. It's on the small side, but the water looks clean.",
        };
        break;
      case "sports":
        ret = {
          name: "Neighborhoot Sports Field",
          image: "IMGresidentialCourtyard",
          passage: "ResidentialSports",
          loc: "Residential - Sports",
          desc: "You're standing on an open grassy area clearly designated for sports, there's a half-court for basketball on the far side."
        };
        break;
      case "main":
      default:
        ret = {
          name: "Neighborhood Recreation Area",
          image: "IMGresidentialCourtyard",
          passage: "ResidentialRecreation",
          loc: "Residential Courtyard",
          desc: "You are in the common area at the center of a block of buildings that includes your apartment building. The square block of buildings has a large opening at the center, leaving plenty of room for parking as well as a small neighborhood park. While there isn't a lot of space, they've managed to fit a small playground, some picnic tables, a half-sized basketball court, a BBQ area, and a small grassy area for tanning in the park.",
        };
        break;
      }
      break;
    case "walkdowntown":
      ret = {
        name: "Walking Downtown",
        image: "IMGresidentialOutside",
        passage: "ResidentialGoDowntown",
        loc: "Appletree",
        desc: "The residential area of Appletree.",
      };
      break;
    case "jogging":
      ret = {
        name: "Jogging Path",
        image: "IMGresidentialJogging",
        passage: "ResidentialJogging",
        loc: "Jogging Path",
        desc: "You're on one of several designated bike and jogging paths that crisscross Appletree.",
      };
      break;
    case "reservoir":
      ret = {
        name: "Tesla Reservoir",
        image: "IMGtestLocImage",
        passage: "ResidentialReservoir",
        loc: "Tesla Reservoir",
        desc: "You are standing next to a man-made lake that holds Appletree's water supply, though it seems to be treated more like a recreational area.",
      };
      break;
    case "medical":
      ret = {
        name: "Appletree Medical District",
        image: "IMGtestLocImage",
        passage: "ResidentialMedical",
        loc: "Medical District",
        desc: "You are in the medical district of Appletree.",
      };
      break;
    case "industrial":
      ret = {
        name: "Appletree Industrial District",
        image: "IMGtestLocImage",
        passage: "ResidentialIndustrial",
        loc: "Industrial District",
        desc: "You are in the industrial district of Appletree.",
      };
      break;
    case "government":
      ret = {
        name: "Appletree Government Services District",
        image: "IMGtestLocImage",
        passage: "ResidentialGovernment",
        loc: "Government District",
        desc: "You are in the government district of Appletree.",
      };
      break;
    }
    break;
  case "homeT1":
  case "homeT2":
  case "homeT3":
  case "homeT4":
  case "homeT5":
    switch(sub){
    case "kitchen":
      ret = {
        name: "Your Kitchen",
        image: "IMGhomeKitchen",
        passage: "homeT2kitchen",
        loc: "Home - Kitchen",
        desc: "You are standing in your kitchen.",
      };
      break;
    case "bath":
      ret = {
        name: "Your Bathroom",
        image: "IMGhomeBathRoom",
        passage: "homeT2bath",
        loc: "Home - Bathroom",
        desc: "You are standing in your bathroom.",
      };
      break;
    case "balcony":
      ret = {
        name: "Your Balcony",
        image: "IMGhomeBalcony",
        passage: "homeT2balcony",
        loc: "Home - Balcony",
        desc: "You are standing on your balcony.",
      };
      break;
    case "clean":
      ret = {
        name: "Cleaning Options",
        image: "IMGhomePlaceholder",
        passage: "homeT2clean",
        loc: "Home Management",
        desc: "You're inside your home.",
      };
      break;
    case "bed2":
    case "bed3":
    case "bedroom":
      ret = {
        name: "Your Bedroom",
        image: "IMGhomeBedRoom",
        passage: "homeT2bedroom",
        loc: "Home - Bedroom",
        desc: "You are standing in your bedroom.",
      };
      break;
    case "living":
      ret = {
        name: "Your Living Room",
        image: "IMGhomeLivingRoom",
        passage: "homeT2livingroom",
        loc: "Home - Living Room",
        desc: "You are standing in your living room.",
      };
      break;
    case "foyer":
    default:
      ret = {
        name: "Your Foyer",
        image: "IMGhomeFoyer",
        passage: "homeT2foyer",
        loc: "Home - Foyer",
        desc: "You are standing in your foyer.",
      };
      break;
    }
    break;
  case "BFhomeT1":
  case "BFhomeT2":
  case "BFhomeT3":
  case "BFhomeT4":
  case "BFhomeT5":
    switch(sub){
    case "kitchen":
      ret = {
        name: "Friend's Kitchen",
        image: "IMGhomeKitchen",
        passage: "homeBFT2kitchen",
        loc: "Friend's Kitchen",
        desc: "You are standing in your friend's kitchen.",
      };
      break;
    case "bath":
      ret = {
        name: "Friend's Bathroom",
        image: "IMGhomeBathRoom",
        passage: "homeBFT2bath",
        loc: "Friend's Bathroom",
        desc: "You are standing in your friend's bathroom.",
      };
      break;
    case "balcony":
      ret = {
        name: "Friend's Balcony",
        image: "IMGhomeBalcony",
        passage: "homeBFT2balcony",
        loc: "Friend's Balcony",
        desc: "You are standing on your friend's balcony.",
      };
      break;
    case "clean":
      ret = {
        name: "Cleaning",
        image: "IMGhomePlaceholder",
        passage: "homeBFT2clean",
        loc: "Friend's Cleaning",
        desc: "You're inside your friend's home.",
      };
      break;
    case "bed2":
    case "bed3":
    case "bedroom":
      ret = {
        name: "Friend's Bedroom",
        image: "IMGhomeBedRoom",
        passage: "homeBFT2bedroom",
        loc: "Friend's Bedroom",
        desc: "You are standing in your friend's bedroom.",
      };
      break;
    case "living":
      ret = {
        name: "Friend's Living Room",
        image: "IMGhomeLivingRoom",
        passage: "homeBFT2livingroom",
        loc: "Friend's Living Room",
        desc: "You are standing in your friend's living room.",
      };
      break;
    case "foyer":
    default:
      ret = {
        name: "Friend's Foyer",
        image: "IMGhomeFoyer",
        passage: "homeBFT2Foyer",
        loc: "Friend's Foyer",
        desc: "You are standing in your friend's foyer.",
      };
      break;
    }
    break;
  case "downtown":
    switch(sub){
    case "parking":
      ret = {
        name: "Southeast Parking Garage",
        image: "IMG_City4",
        passage: "DowntownParking",
        loc: "Downtown Parking",
        desc: "You're in the monolithic parking garage servicing the downtown area. Despite it's gigantic size and utilitarian nature, it's relatively well lit.",
      };
      break;
    case "holefoods":
      ret = {
        name: "Hole Foods Marketplace",
        image: "IMG_HoleFoodsExt",
        passage: "DowntownHole",
        loc: "Hole Foods Exterior",
        desc: "You're standing outside the Hole Foods Marketplace. It's a rather ritzy-looking grocery store, that seems to focus on the health and <i>lifestyle</i> benefits of a good diet.",
      };
      break;
    case "corp":
      ret = {
        name: "Downtown Corporate Campus",
        image: "IMG_City2",
        passage: "DowntownCorp",
        loc: "Downtown Corp Campus",
        desc: "You're standing on the edge of Appletree's premier corporate campus. The two main structures are larger, and have a more modern aesthetic, causing them to clash somewhat with the normal feel of the place.",
      };
      break;
    case "bank":
      ret = {
        name: "Finance Row",
        image: "IMGdowntownShops2",
        passage: "DowntownBank",
        loc: "Downtown Finance",
        desc: "You're standing at the row of buildings nicknamed Finance Row, which are mostly occupied by banking services and the town's only real estate firm.",
      };
      break;
    case "townhall":
      ret = {
        name: "Town Hall",
        image: "IMGdowntownTownHall",
        passage: "DowntownTownhall",
        loc: "Downtown Town Hall",
        desc: "You're standing in front of a massive government building, designed to look like a classic American town hall. It's a bit too large for that, but it does consolidate all the normal government offices into one convenient location.",
      };
      break;
    case "square":
      ret = {
        name: "Town Square",
        image: "IMG_ParkBridge2",
        passage: "DowntownSquare",
        loc: "Downtown Town Square",
        desc: "You're standing in a large plaza that is partially surrounded by the large town hall building. A decorative fountain serve's as the plaza's centerpiece, but there's still plenty of room for public functions and festivals.",
      };
      break;
    case "park":
      ret = {
        name: "Central Park",
        image: "IMG_CentralPark",
        passage: "DowntownPark",
        loc: "Downtown Park",
        desc: "You're standing in the huge Samuel Steele Memorial Park, colloquially known as 'Central Park' to residents. The park has several winding paths, along with plenty of trees and shrubs to give a more isolated nature feeling. The center of the park features a nice pond.",
      };
      break;
    case "community":
      ret = {
        name: "Community Center",
        image: "IMGdowntownCommunity",
        passage: "DowntownCommunity",
        loc: "Downtown Community",
        desc: "You're standing in a community recreation area set in the Northwest corner of Central Park. It features a large children's playground, and an open-air building with tables and chairs that is popular for board games or eating lunch outside.",
      };
      break;
    case "mall":
      switch(tert){
      case "foodcourt":
        ret = {
          name: "Applewood Food Court",
          image: "IMGdowntownMallInside",
          passage: "DowntownMallinside",
          loc: "Mall Food Court",
          desc: "You're standing in a well thought-out food court that features relaxed and comfortable seating without feeling trapped by garish and overly-busy food stalls. The food offerings here are much higher quality than you were expecting.",
        };
        break;
      case "exterior":
      default:
        ret = {
          name: "",
          image: "IMGdowntownMall",
          passage: "DowntownMall",
          loc: "Downtown Mall Ext.",
          desc: "You're standing outside the large Applewood mall. It's one of the new styles of recreational mall, which focuses more on experience, entertainment, and services. The rise of internet shopping has shifted focus away from simple retail malls.",
        };
        break;
      }
      break;
    case "club":
      ret = {
        name: "Club District",
        image: "IMG_CityNight2",
        passage: "DowntownClub",
        loc: "Downtown Clubs",
        desc: "You're standing on a street seemingly dedicated to nightclubs, bars, and other adult social locations. It's certainly convenient to go bar hopping in Appletree. The fare ranges from a posh nightclub to a dance club that's essentially an open indoor industrial space.",
      };
      break;
    case "amuse":
      ret = {
        name: "Amusement District",
        image: "IMG_DowntownAmusePark",
        passage: "DowntownAmuse",
        loc: "Downtown Amusement",
        desc: "You're in the Amusement district of downtown Appletree, which has a few recreational businesses such as a bowling alley, but is dominated by the local theme park Erotika Land. Despite the <i>very</i> adult theme, the park is open to all ages.",
      };
      break;
    case "adult":
      ret = {
        name: "Downtown Adult District",
        image: "IMGdowntownAdult",
        passage: "DowntownAdult",
        loc: "Downtown Adult",
        desc: "You're in a small area on the outskirts of downtown known as the adult district. The area features a different layout, composed of several alleyways that branch off of a still-narrow walking street. Driving down the street outside, you'd never realize that it's the local redlight district.",
      };
      break;
    case "northwest":
      ret = {
        name: "Northwest Downtown",
        image: "IMGdowntownShops3",
        passage: "DowntownNW",
        loc: "Northwest Downtown",
        desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
      };
      break;
    case "west":
      ret = {
        name: "West Downtown",
        image: "IMGdowntownShops4",
        passage: "DowntownW",
        loc: "West Downtown",
        desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
      };
      break;
    case "southwest":
      ret = {
        name: "Southwest Downtown",
        image: "IMGdowntownShops5",
        passage: "DowntownSW",
        loc: "Southwest Downtown",
        desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
      };
      break;
    case "northeast":
      ret = {
        name: "Northeast Downtown",
        image: "IMGdowntownShops4",
        passage: "DowntownNE",
        loc: "Northeast Downtown",
        desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
      };
      break;
    case "east":
      ret = {
        name: "East Downtown",
        image: "IMGdowntownShops5",
        passage: "DowntownE",
        loc: "East Downtown",
        desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
      };
      break;
    case "southeast":
      ret = {
        name: "Southeast Downtown",
        image: "IMGdowntownShops1",
        passage: "DowntownSE",
        loc: "Southeast Downtown",
        desc: "You're standing on the wide sidewalk lining the streets of a pleasant and inviting downtown area with a bohemian atmosphere. There are a mixture of shops--many catoring to more elaborate tastes--as well as restaurants, eateries, and small businesses.",
      };
      break;
    }
    break;
  case "world":
    switch(sub){
    case "appletree":
      ret = {
        name: "",
        image: "",
        passage: "AppletreeMap",
        loc: "",
        desc: "",
      };
      break;
    case "institute":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "restricted":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "coop":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "lake":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "visitor":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "forest":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "woods":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "unknown":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "city":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "spring":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "bridge":
      ret = {
        name: "",
        image: "",
        passage: "",
        loc: "",
        desc: "",
      };
      break;
    case "main":
    default:
      ret = {
        name: "",
        image: "",
        passage: "MuschiValleyMap",
        loc: "",
        desc: "",
      };
      break;
    }
    break;
  default:
    setup.alert(`There was a problem with map data lookup - arguments main: ${main}, sub: ${sub}, tert: ${tert}.`);
    ret = {
      name: "",
      image: "",
      passage: "",
      loc: "",
      desc: "",
    };
  }
  return {name:ret.name,image:ret.image,passage:ret.passage,loc:ret.loc,desc:ret.desc};
};


