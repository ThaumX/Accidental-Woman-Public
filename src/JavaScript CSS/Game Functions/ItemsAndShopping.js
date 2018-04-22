/*Items & Shopping*/

setup.processPurchases = function(){
  let items = State.active.variables.items.temp;
  let Ꜹ = State.active.variables;
  let _temp;
  _temp = aw.arrayCunt(items,"Duremax Safe-T",0,true);
  Ꜹ.items.Condoms[1] += (_temp * 12);
  _temp = aw.arrayCunt(items,"Duremax Safe-PE",0,true);
  Ꜹ.items.Condoms[0] += (_temp * 6);
  _temp = aw.arrayCunt(items,"TrojanCock Sensations",0,true);
  Ꜹ.items.Condoms[2] += (_temp * 12);
  _temp = aw.arrayCunt(items,"TrojanCock Uber Lube",0,true);
  Ꜹ.items.Condoms[3] += (_temp * 12);
  _temp = aw.arrayCunt(items,"TrojanCock Uber NoLube",0,true);
  Ꜹ.items.Condoms[4] += (_temp * 12);
  _temp = aw.arrayCunt(items,"PleasureBurst Hex",0,true);
  Ꜹ.items.Condoms[5] += (_temp * 12);
  if(aw.arrayCunt(items,"Diaphram",0,true) > 0){
    Ꜹ.items.Diaphram = true;
  }
  _temp = aw.arrayCunt(items,"Focker's Dark Roast",0,true);
  if(_temp > 0){
    Ꜹ.flag.LilyCoffee = false;
    Ꜹ.flag.LilyCoffeeSuc = true;
  }
  _temp = aw.arrayCunt(items,"Facial Wipes",0,true);
  if(_temp > 0){
    Ꜹ.items.FaceWipes = true;
  }
  _temp = aw.arrayCunt(items,"Menstral Cup",0,true);
  if(_temp > 0){
    Ꜹ.items.MenstralCup = true;
  }
  for(let i = 0, c = items.length; i < c; i++){
    if(items[i][2] == "jew"){
      Ꜹ.PC.jewel.owned.push(items[i][3]);
    }
    if(items[i][2] == "home"){
      Ꜹ.home.item.owned.push(items[i][3]);
    }
  }
  State.active.variables.items.temp = [];
  aw.S();
};

