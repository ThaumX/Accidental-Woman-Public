/*
/*      ██╗███████╗██╗    ██╗███████╗██╗
/*      ██║██╔════╝██║    ██║██╔════╝██║
/*      ██║█████╗  ██║ █╗ ██║█████╗  ██║
/* ██   ██║██╔══╝  ██║███╗██║██╔══╝  ██║
/* ╚█████╔╝███████╗╚███╔███╔╝███████╗███████╗
/*  ╚════╝ ╚══════╝ ╚══╝╚══╝ ╚══════╝╚══════╝
*/


aw.jewel = {};
class Jewel {
  constructor({name,
    key,
    short = "a jewel",
    long = "a piece of kid's costume jewelry",
    slot = "none",
    atr = 0,
    cost = 1,
    type = "norm",
    image = "IMGnone75"
  } = {}){
    this.name = name;
    this.key = key;
    this.short = short;
    this.long = long;
    this.slot = slot;
    this.atr = atr;
    this.cost = cost;
    this.type = type;
    if(!image){
      this.image = "IMGjewelPlaceholder";
    }else{
      this.image = image;
    }
  }
}
setup.jewel = {
  prop : function(slot,prop){
    prop = setup.prop(prop);
    return aw.jewel[State.active.variables.PC.jewel[slot]][prop];
  },
  slot : function(slot){ //checks slot/s for jewelry. returns name or array of names or false
    let item = false,
      s = setup.jewel.slotNames.includes(slot),
      c = setup.jewel.comboNames.includes(slot);
    if(!s && !c){
      throw `Invalid slot name "${slot}" sent to jewel.slot function!`;
    }else if(c){
      item = [];
      let keys = setup.jewel.comboSlots[slot],
        leng = keys.length;
      for(let i = 0; i < leng; i++){
        if(State.active.variables.PC.jewel[keys[i]] !== "none"){
          item.push(State.active.variables.PC.jewel[keys[i]]);
        }
      }
      if(item.length == 0){
        return false;
      }else{
        return item;
      }
    }
    if(State.active.variables.PC.jewel[slot] == "none"){
      return false;
    }else{
      return State.active.variables.PC.jewel[slot];
    }
  },
  worn: function(jewel){ //returns slot name or false if jewelry item is worn or not
    if(setup.jewel.exists(jewel)){
      let found = false;
      for(let i = 0, a = setup.jewel.slotNames.length; i < a; i++){
        if(State.active.variables.PC.jewel[setup.jewel.slotNames[i]] == jewel){
          found = setup.jewel.slotNames[i];
          break;
        }
        return found;
      }
    }
    return false;
  },
  exists: function(jewel){
    let keys = Object.keys(aw.jewel);
    if(keys.includes(jewel)){
      return true;
    }else{
      setup.log(`jewel.exists searched for jewel "${jewel}" and didn't find it.`);
      return false;
    }
  },
  find: function(jewel){ //returns location of jewel, or false if not owned
    let x = setup.jewel.worn(jewel);
    if(!x){
      x = setup.jewel.owned(jewel)? "owned":false;
    }
    return x;
  },
  owned: function(jewel){ //returns true/false if player owns item at all
    if(State.active.variables.PC.jewel.owned.includes(jewel)){
      return true;
    }
    if(setup.jewel.worn(jewel)){
      return true;
    }
    return false;
  },
  removeAll: function(){
    let leng = setup.jewel.slotNames.length;
    for(let i = 0; i < leng; i++){
      let x = setup.jewel.slot(setup.jewel.slotNames[i]);
      if(x){
        setup.jewel.takeOff(x);
      }
    }
    return "All worn jewelry removed!";
  },
  putOn : function(item,slot,give = false){
    if(!setup.jewel.exists(item)){
      return new ReferenceError(`Invalid jewel key "${item}" sent to jewel.putOn function!`);
    }
    if(!setup.jewel.slotNames.includes(slot)){
      return new ReferenceError(`Invalid slot key "${slot}" sent to jewel.putOn function!`);
    }
    if(!setup.jewel.owned(item) && !give){
      return false;
    }
    if(!State.active.variables.PC.jewel.pierced[slot]){
      setup.notify("<span class='orange'><b>You need to be pierced to wear that!</b></span>");
    }
    if(State.active.variables.PC.jewel[slot] != "none"){
      State.active.variables.PC.jewel.owned.push(State.active.variables.PC.jewel[slot]);
    }
    if(State.active.variables.PC.jewel.owned.includes(item)){
      State.active.variables.PC.jewel.owned.deleteAt(State.active.variables.PC.jewel.owned.indexOf(item));
    }else if(setup.jewel.worn(item)){
      State.active.variables.PC.jewel[setup.jewel.worn(item)] = "none";
    }
    State.active.variables.PC.jewel[slot] = item;
    return true;
  },
  takeOff : function(name){
    if(setup.jewel.slotNames.includes(name)){
      let m = State.active.variables.PC.jewel[name];
      if(m !== "none"){
        State.active.variables.PC.jewel.owned.push(m);
        State.active.variables.PC.jewel[name] = "none";
      }
    }else{
      let k = setup.jewel.worn(name);
      if(k){
        State.active.variables.PC.jewel[k] = "none";
        State.active.variables.PC.jewel.owned.push(name);
      }
    }
    //Nothing to take off
  },
  lose : function(name){
    if(setup.jewel.slotNames.includes(name)){
      let x = State.active.variables.PC.jewel[name];
      State.active.variables.PC.jewel[name] = "none";
      setup.notify(`<span class="bad">You lost the ${aw.jewel[x].name} you were wearing!</span>`);
    }else{
      let k = setup.jewel.worn(name);
      if(k){
        State.active.variables.PC.jewel[k] = "none";
        setup.notify(`<span class="bad">You lost the ${aw.jewel[name].name} you were wearing!</span>`);
      }
    }
  },
  print: function(names,{owned = true, slot = false, wearButt = false, removeButt = false, max = false, min = false, small = false}={}){
    let keys = Object.keys(aw.jewel);
    let leng = keys.length;
    let out = "";
    if(wearButt && removeButt){
      return "<span class='bad'>ERROR: can't have both a wear button and a remove button!</span>";
    }
    for(let i = 0; i < leng; i++){
      let ck = true;
      if(slot && aw.jewel[keys[i]].slot !== slot){
        ck = false;
      }else if(owned && !setup.jewel.owned(keys[i])){
        ck = false;
      }else if(max && aw.jewel[keys[i]].cost >= max){
        ck = false;
      }else if(min && aw.jewel[keys[i]].cost < min){
        ck = false;
      }
      if(ck){
        let k = aw.jewel[keys[i]];
        if(small){
          out += `<div id="${k}" class="jewelryItemSmall">`;
        }else{
          out += `<div id="${k}" class="jewelryItem">`;
        }
        out += `<img data-passage="${k.image}">`;
        if(wearButt){
          if(setup.jewel.comboNames.includes(k.slot)){
            out += `<<button "${aw.capital(k.name)}">>${setup.jewel.buttonGen(k.slot,keys[i])}<</button>>`;
          }else{
            out += `<<button "${aw.capital(k.name)}">><<run setup.jewel.putOn("${k}","${k.slot}")>><<run aw.killit("#${k}")>><<run setup.refresh()>><</button>>`;
          }
        }else if(removeButt){
          out += `<<button "${aw.capital(k.name)}">><<run setup.jewel.takeOff("${k}")>><<run aw.killit("#${k}")>><</button>>`;
        }else{
          out += `<span class="head"><b>${aw.capital(k.name)}</b></span> `;
        }
        if(small){
          out += `ATR: ${k.atr}, slot: ${k.slot}</div>`;
        }else{
          out += `${k.long}. ATR: ${k.atr}, slot: ${k.slot}</div>`;
        }
      }
    }
    return out;
  },
  sale: function({names = false, slot = false, max = false, min = false, small = false}={}){
    let keys = Object.keys(aw.jewel);
    let leng = keys.length;
    let out = "<div id='jewContainer' class='displayFlex fadeInUp animated'>";
    for(let i = 0; i < leng; i++){
      let ck = true;
      if(slot && aw.jewel[keys[i]].slot !== slot){
        ck = false;
      }else if(max && aw.jewel[keys[i]].cost >= max){
        ck = false;
      }else if(min && aw.jewel[keys[i]].cost < min){
        ck = false;
      }
      if(ck){
        let k = aw.jewel[keys[i]];
        if(small){
          out += `<div id="${k}" class="jewelryItemSmall">`;
        }else{
          out += `<div id="${k}" class="jewelryItem" style="width:400px;">`;
        }
        out += `<img data-passage="${k.image}">`;
        out += `<span class="head">${aw.capital(k.name)}</span><<sp 2>><span class="money"><<mon>>${k.cost}</span><<sp 2>><<button "Add to Cart">><<set State.active.variables.cart.item.push(["${k.name}",${k.cost},"jew","${k.key}"])>><<prepend "#jewOutput">>${aw.capital(k.name)} added to cart<br><</prepend>><</button>><br>`;
        if(small){
          out += `ATR: ${k.atr}, slot: ${k.slot}</div>`;
        }else{
          out += `${k.long}. ATR: ${k.atr}, slot: ${k.slot}</div>`;
        }
      }
    }
    out += "</div><div id='jewOutput' class='monospace zoomInDown animated ghettoShopOutput'><div class='lato' style='position:absolute;bottom:5px;left:5px;right:5px;font-size:24px;'>Shopping Results</div></div>";
    return out;
    /*
    [img[$jewel.neck.goldChain[3]]]</td><td>@@.storeitem;Gold Chain@@--<<print $jewel.neck.goldChain[1]>> @@.money;<<mon>>65@@. <span id="addcart2"><<link "Add to Cart">><<set _temp = ["Gold Chain",75]>><<set $cart.item.push(_temp)>><<replace "#addcart2">>@@.exp;Gold Chain added to cart.@@<</replace>><</link>></span>
    */
  },
  printWorn: function(){
    let slot = setup.jewel.slotNames,
      out = "";
    for(let i = 0, c = slot.length; i < c; i++){
      let k = State.active.variables.PC.jewel[slot[i]];
      out += `<div id="${slot[i]}Worn" class="jewelryItem">`;
      try{
        if(State.active.variables.PC.jewel.pierced[slot[i]]){
          out += `<img data-passage='${aw.jewel[k].image}'><span class="head"><b>`;
          out += setup.jewel.slotWords(slot[i]);
          out += `</b></span><br>${aw.jewel[k].name}</div>`;
        }else{
          out += "<img data-passage='IMG-NotPierced'><span class='head'><b>";
          out += setup.jewel.slotWords(slot[i]);
          out += "</b></span><br>[not pierced]</div>";
        }
      }
      catch(e){
        out += `[Some shit failed. ${e.name}: ${e.message}]`;
      }
    }
    return out;
  },
  wearCount: function(){
    let found = 0;
    for(let i = 0, a = setup.jewel.slotNames.length; i < a; i++){
      if(State.active.variables.PC.jewel[setup.jewel.slotNames[i]] != "none"){
        found += 1;
      }
    }
    return found;
  },
  buttonGen: function(combo,key){
    let out = `<<dialog "Choose A Slot">>@@.head3;C@@hoose the specific slot you would like to wear the ${aw.jewel[key].name}, or close this dialog to cancel.<br><center>`,
      slots = setup.jewel.comboSlots[combo];
    for(let i = 0, l = slots.length; i < l; i++){
      out += `<<button "${setup.jewel.slotWords(slots[i])}">><<run setup.jewel.putOn("${key}","${slots[i]}")>><<run aw.killit("#${key}")>><<run setup.refresh()>><<run Dialog.close()>><</button>>`;
    }
    out += "</center><</dialog>>";
    return out;
  },
  slotNames: [
    "neck",
    "wristR",
    "wristL",
    "handR",
    "handL",
    "ringR",
    "ringL",
    "nose",
    "lip",
    "tongue",
    "brow",
    "earR",
    "earL",
    "upEar",
    "belly",
    "nipR",
    "nipL",
    "clit",
    "labia"
  ],
  comboNames: [
    "wrist",
    "hand",
    "ring",
    "ear",
    "nip"
  ],
  comboSlots: {
    wrist: ["wristR","wristL"],
    hand: ["handL","handR","ringL","ringR"],
    ring: ["handL","handR","ringL","ringR"],
    ear: ["earR","earL"],
    nip: ["nipR","nipL"]
  },
  slotWords: function(slot){
    let res;
    switch(slot){
    case "wristR":
      res = "right wrist";
      break;
    case "wristL":
      res = "left wrist";
      break;
    case "handL":
      res = "left index finger";
      break;
    case "handR":
      res = "right index finger";
      break;
    case "ringL":
      res = "left ring finger";
      break;
    case "ringR":
      res = "right ring finger";
      break;
    case "earR":
      res = "main ear piercing";
      break;
    case "earL":
      res = "secondary ear piercing";
      break;
    case "nipR":
      res = "main nipple piercing";
      break;
    case "nipL":
      res = "secondary nipple piercing";
      break;
    case "upEar":
      res = "upper ears";
      break;
    default:
      res = slot;
      break;
    }
    return res;
  },
  slotChecker: function(jew,slot){
    let jewSlot = aw.jewel[jew].slot;
    let chk = {
      wrist: ["wristR","wristL"],
      hand: ["handL","handR","ringL","ringR"],
      ring: ["handL","handR","ringL","ringR"],
      ear: ["earR","earL"],
      nip: ["nipR","nipL"],
      upEar: ["upEar"],
      clit: ["clit"],
      labia: ["labia"],
      nose: ["nose"],
      lip: ["lip"],
      tongue: ["tongue"],
      neck: ["neck"],
      belly: ["belly"],
    };
    if(chk[jewSlot].includes(slot)){
      return true;
    }
    return false;
  },
};

aw.jewDefine = function(){
  aw.jewel = {};
  let jews = {
    none: {
      name: "none",
      key: "none",
      short: "nothing",
      long: "a complete absence of jewelry",
      slot: "none",
      atr: 0,
      cost: 0,
      type: "norm",
      image: "IMGmakeupNone",
    },
    silverChain: {
      name: "silver chain",
      key: "silverChain",
      short: "thin silver chain",
      long: "a complete absence of jewelry",
      slot: "neck",
      atr: 1,
      cost: 40,
      type: "norm",
      image: "IMGjewelSchain",
    },
    goldChain: {
      name: "gold chain",
      key: "goldChain",
      short: "thin gold chain",
      long: "a delicate chain made of gold links",
      slot: "neck",
      atr: 2,
      cost: 60,
      type: "norm",
      image: "IMGjewelGoldchain",
    },
    whiteGoldChain: {
      name: "white gold chain",
      key: "whiteGoldChain",
      short: "thin white-gold chain",
      long: "a delicate chain made of white gold links",
      slot: "neck",
      atr: 2,
      cost: 60,
      type: "norm",
      image: "IMGjewelWGchain",
    },
    spiralGoldBracelet: {
      name: "spiral gold bracelet",
      key: "spiralGoldBracelet",
      short: "spiraling gold bracelet",
      long: "a gold bracelet made of spiraling gold links",
      slot: "wrist",
      atr: 2,
      cost: 165,
      type: "norm",
      image: "IMGjewelTwistGoldB",
    },
    silverCharmBracelet: {
      name: "silver charm bracelet",
      key: "silverCharmBracelet",
      short: "silver charm bracelet",
      long: "a silver chain with several heart charms dangling from it",
      slot: "wrist",
      atr: 1,
      cost: 85,
      type: "norm",
      image: "IMGjewelSilverCharmB",
    },
    sWatchPink: {
      name: "pink SWatch",
      key: "sWatchPink",
      short: "pink SWatch",
      long: "a pink Slut-Watch brand watch",
      slot: "wrist",
      atr: 1,
      cost: 75,
      type: "bimbo",
      image: "IMGjewelSWatchPink",
    },
    catRing: {
      name: "cat ring",
      key: "catRing",
      short: "silver cat ring",
      long: "a silver ring with stylized cat ears",
      slot: "ring",
      atr: 1,
      cost: 45,
      type: "cute",
      image: "IMGjewelCatRing",
    },
    purityRing: {
      name: "purity ring",
      key: "purityRing",
      short: "purity ring",
      long: "a ring to tell people how dumb you are",
      slot: "ring",
      atr: -1,
      cost: 69,
      type: "bimbo",
      image: "IMGjewelPurityRing",
    },
    goldHeartRing: {
      name: "gold heart ring",
      key: "goldHeartRing",
      short: "gold heart ring",
      long: "a gold ring with heart cutout",
      slot: "ring",
      atr: 2,
      cost: 85,
      type: "cute",
      image: "IMGjewelGheartRing",
    },
    turquioseStoneRing: {
      name: "turquiose stone ring",
      key: "turquioseStoneRing",
      short: "turquiose ring",
      long: "a silver ring topped with a turquiose",
      slot: "ring",
      atr: 2,
      cost: 165,
      type: "norm",
      image: "IMGjewelTurqStoneRing",
    },
    goldSlutRing: {
      name: "gold slut ring",
      key: "goldSlutRing",
      short: "slut ring",
      long: "a gold ring shaped to spell 'slut' in cursive",
      slot: "ring",
      atr: 1,
      cost: 69,
      type: "bimbo",
      image: "IMGjewelGoldSlutRing",
    },
    fertilityBracelet: {
      name: "fertility bracelet",
      key: "fertilityBracelet",
      short: "fertility bracelet",
      long: "a silver bracelet with sperm links chasing the egg clasp",
      slot: "wrist",
      atr: 3,
      cost: 120,
      type: "norm",
      image: false,
    },
  };
  let keys = Object.keys(jews),
    n = keys.length;
  for(let i = 0; i < n; i++){
    aw.jewel[keys[i]] = new Jewel(jews[keys[i]]);
  }
};
aw.jewDefine();

