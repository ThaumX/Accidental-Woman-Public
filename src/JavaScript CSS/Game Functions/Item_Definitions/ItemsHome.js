/******************************************
  ██╗████████╗███████╗███╗   ███╗███████╗
  ██║╚══██╔══╝██╔════╝████╗ ████║██╔════╝
  ██║   ██║   █████╗  ██╔████╔██║███████╗
  ██║   ██║   ██╔══╝  ██║╚██╔╝██║╚════██║
  ██║   ██║   ███████╗██║ ╚═╝ ██║███████║
  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝
-------------------------------------------
For hoisting/load order issues, class def
and items need to be in the same file because
I don't want to delay loading until after
the game starts.
name - uncapped proper item name
key - key it will be saved as in object
type - type of item it is
    furniture, exercise, electronic, decor,
    health, appliance, other,
tags - descriptive tags primarily for sex
    and further specifying item type.
desc - simple description of item.
mult - T/F if allowed to have more than 1
quality - 1 to 5 scale
cost - non-modified or base price
fragile - false, or 1-1000 to represent chance
    of breaking.
button - text on action button.
menu - false, or the html text in a dialog
    menu, including button options
action - action this item performs in js.
    must be a function.
effect - function, any effect caused by having
    an item in your home.
******************************************/
//item class
class HomeItem {
  constructor({name,key,type,image = false,tags = [],desc,mult = false,quality,cost,fragile = false,button=false,info,menu = false,action,effect,notRoom} = {}){
    this.name = name;
    this.key = key;
    this.type = type;
    this.image = (!image)?"<img data-passage='IMG-HOMEITEM-Placeholder' class='homeitem'>":`<img data-passage='${image}' class='homeitem'>`;
    this.tags = jQuery.extend(true, [], tags);
    this.mult = mult;
    this.desc = desc;
    this.quality = quality;
    this.cost = cost;
    this.fragile = fragile;
    this.notRoom = jQuery.extend(true, [], notRoom);
    if(!menu){//if has a menu, launches menu. If not, runs action.
      this.button = `<<hoverrevise ${key}>><<button "${button}">><<run aw.homeItems.${key}.action()>><</button>><<endhoverrevise>>`;
    }else if(!button){
      this.button = "";
    }else{
      this.button = `<<hoverrevise ${key}>><<button "${button}">><<dialog "${button}">>${menu}<</dialog>><</button>><<endhoverrevise>>`;
    }
    if(!button){
      this.info = "";
    }else{
      this.info = `<<insertion ${key}>>${info}<<endinsertion>>`;
    }
    this.action = action;
    this.effect = effect;
    this.remove = function(){//removes item from owned list if it exists
      let ind = State.variables.home.item[this.type].indexOf(this.key);
      if (ind > -1) {
        State.variables.home.item[this.type].splice(ind, 1);
      }
    };
    this.breaks = function(){//check if item breaks, triggered externally or by action function
      if(!this.fragile){
        return false;
      }
      if(random(1,1000) <= this.fragile){
        setup.notify(`<span class="bad">Your ${this.name} has broken!</span>`);
        return true;
      }else{
        return false;
      }
    };
  }
  get owned(){//for shopping interface
    return (State.variables.home.item[this.type].indexOf(this.key) > -1 && !this.mult)? true : false;
  }
}
//ITEM DISPLAY MACROS
Macro.add("homeItemDisp",{
  handler: function(){
    let AW = aw.get();
    let loc = AW.map.loc[1];
    let items = AW.home.item[loc];
    let c = items.length;
    let output = "<div id='homeItemDisp' class='sideBox'>";
    for(let i = 0; i < c; i++){
      let it = aw.homeItems[items[i]];
      if(!it.tags.includes("hidden")){
        output += `<div id="${it.key}List" class="sideBoxHome">${it.image}<span class="head">${it.name}:</span> ${it.desc}</div>`;
      }
    }
    output += "</div>";
    return new Wikifier(this.output, output);
  }
});
Macro.add("homeItemButtons",{
  handler: function(){
    let AW = aw.get();
    let loc = AW.map.loc[1];
    let items = AW.home.item[loc];
    let c = items.length;
    let output = "";
    for(let i = 0; i < c; i++){
      let it = aw.homeItems[items[i]];
      if(!it.tags.includes("noButton")){
        output += it.button;
      }
    }
    return new Wikifier(this.output, output);
  }
});
Macro.add("homeItemInfo",{
  handler: function(){
    let AW = aw.get();
    let loc = AW.map.loc[1];
    let items = AW.home.item[loc];
    let c = items.length;
    let output = "";
    for(let i = 0; i < c; i++){
      let it = aw.homeItems[items[i]];
      if(!it.tags.includes("noButton")){
        output += it.info;
      }
    }
    return new Wikifier(this.output, output);
  }
});
aw.homeItemsSwitch = function(orig,repl){
  let home = aw.get("home");
  let arrKey = Object.keys(home);
  let al = arrKey.length;
  for(let i = 0; i < al; i++){
    if(Array.isArray(home[arrKey[i]]) && home[arrKey[i]].includes(orig)){
      let del = home[arrKey[i]].delete(orig);
      for(let j = 0, c = del.length; j < c; j++){
        home[arrKey[i]].push(repl);
      }
    }
  }
};
setup.homeItems = {
  sales: function({names = false, type = false, max = false, min = false, room = false}={}){
    let keys = Object.keys(aw.homeItems);
    let leng = keys.length;
    let exclude = ["someBlankets","oldThrowPillow","bustedStool","bustedLawnchair","bustedAirMattress"];
    let out = "<div id='homeContainer' class='displayFlex fadeInUp animated'>";
    for(let i = 0; i < leng; i++){
      let ck = true;
      if(type && aw.homeItems[keys[i]].type !== type){
        ck = false;
      }else if(max && aw.homeItems[keys[i]].cost > max){
        ck = false;
      }else if(min && aw.homeItems[keys[i]].cost < min){
        ck = false;
      }else if(room && aw.homeItems[keys[i]].notRoom.includes(room)){
        ck = false;
      }else if(exclude.includes(aw.homeItems[keys[i]].key)){
        ck = false;
      }
      if(ck){
        let k = aw.homeItems[keys[i]];
        let img = k.image.slice(19,k.image.search(/'\sclass/));
        out += `<div id="${k}" class="homeItemSale">`;
        out += `<img data-passage="${img}">`;
        out += `<span class="head">${aw.capital(k.name)}</span><<sp 2>><<button "Add to Cart">><<set State.active.variables.cart.item.push(["${k.name}",${k.cost},"home","${k.key}"])>><<prepend "#homeOutput">>${aw.capital(k.name)} added to cart<br><</prepend>><</button>><<sp 2>><br>`;
        out += `${k.desc}. <b>QUAL:</b> ${k.quality}, <b>Cost:</b> <span class="money"><<mon>>${k.cost}</span></div>`;
      }
    }
    out += "</div><div id='homeOutput' class='monospace zoomInDown animated ghettoShopOutput'><div class='lato' style='position:absolute;bottom:5px;left:5px;right:5px;font-size:24px;'>Shopping Results</div></div>";
    return out;
  },
};
//START DEFINING ACTUAL ITEMS
aw.homeItems = {};
aw.homeItemsDefine = function(){
  let items = {
    cheapRecliner: {
      name: "cheap recliner",
      key: "cheapRecliner",
      image: "IMG-HomeItem-CheapRecliner",
      type: "furniture",
      tags : ["chair"],
      desc: "A cheap recliner upholstered in cheap fabric. It isn't bad to sit in, but it has squeeky springs.",
      mult: true,
      quality: 1,
      cost: 350,
      fragile: 3,
      button: "Sit in Recliner",
      info: "Sit down in your recliner and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.status.stress(-2);
        setup.time.add(30);
        setup.refresh();
        if(this.breaks()){
          this.remove();
        }
        setup.notify("You sat around in the cheap recliner for 15 minutes.");
      },
    },
    someBlankets: {
      name: "some blankets",
      key: "someBlankets",
      type: "furniture",
      image: "IMG-HomeItem-FloorSleep",
      tags: ["bed"],
      desc: "A pile of sheets and blankets you're using in lieu of an actual bed. <i>You know you won't get a good night's rest until you get a proper bed.</i>",
      mult: false,
      quality: 0,
      cost: 0,
      fragile: false,
      button: "Go To Sleep",
      info: "Lay down and go to sleep for the day. (+vigor, +energy, +health)[varies]",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        setup.status.tired(2);
      },
      action: function(){
        setup.sleep.start();
      },
    },
    oldThrowPillow: {
      name: "old throw pillow",
      key: "oldThrowPillow",
      type: "furniture",
      image: "IMG-HomeItem-ThrowPillow",
      tags: ["chair"],
      desc: "An old throw pillow you're using as a place to sit down.",
      mult: false,
      quality: 0,
      cost: 0,
      fragile: false,
      button: "Sit Down",
      info: "Sit down for a while to pass the time. (-stress) [15min]",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        if(random(1,3) === 3){
          setup.status.stress(-1);
        }
        setup.time.add(15);
        setup.refresh();
        setup.notify("You sat around on the pillow for 15 minutes.");
      },
    },
    bustedStool: {
      name: "busted stool",
      key: "bustedStool",
      type: "furniture",
      image: "IMG-HomeItem-BrokenStool",
      tags: ["chair"],
      desc: "An old collapsable stool that now only has 3 legs.",
      mult: false,
      quality: 0,
      cost: 0,
      fragile: 100,
      button: "Sit (Busted Stool)",
      info: "",
      notRoom: ["none"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.time.add(15);
        setup.refresh();
        if(this.breaks()){
          this.remove();
        }
        setup.notify("You balanced on the broken stool for 15 minutes.");
      },
    },
    bustedLawnchair: {
      name: "busted lawnchair",
      key: "bustedLawnchair",
      type: "furniture",
      image: "IMG-HomeItem-BustedLawnchair",
      tags: ["chair"],
      desc: "An ancient aluminum frame lawn chair. The nylon has torn, leaving an opening pretty much exactly the size of a toilet seat.",
      mult: false,
      quality: 0,
      cost: 0,
      fragile: 50,
      button: "Sit (Busted Lawnchair)",
      info: "Sit down on the busted lawnchair for a while and rest your legs. (+arousal) [15min]",
      notRoom: ["kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        let c = "@@.head3;Y@@ou sit down in the broken lawnchair, <<if $PC.clothes.accessP>>your bare pussy easily accessible through the hole in the fabric.<<elseif $PC.clothes.skirtDanger > 0 || $PC.clothes.lower[0] == 'none'>>only the thin protection of your panties keeping you from being exposed to whatever is underneath the chair.<<else>>with your legs apart thanks to the very noticeable hole. If it wasn't for your <<= $PC.clothes.lower[0][1]>>, you'd be very exposed.<</if>> You think about it for a while, and come up with some pretty naughty ideas about what you can do with this chair.";
        if(random(1,2) == 2){
          setup.status.arousal(1);
        }
        setup.time.add(15);
        setup.refresh();
        if(this.breaks()){
          this.remove();
        }
        setup.dialog("Busted Lawnchair",c);
      },
    },
    airMattress: {
      name: "air mattress",
      key: "airMattress",
      image: "IMG-HomeItem-AirMatress",
      type: "furniture",
      tags : ["bed"],
      desc: "An inexpensive air mattress that isn't great to sleep on, but is better than the floor.",
      mult: false,
      quality: 1,
      cost: 45,
      fragile: 200,
      button: "Air Mattress Menu",
      info: "Open the menu for sleeping or taking a nap on your air mattress.",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "@@.head3;Y@@our air mattress is really only intended to be used for a few nights, it's only a matter of time until it springs a major leak and becomes nearly worthless.<br><br>Spend a couple minutes reinflating and: <<button 'Sleep'>><<run aw.homeItems.airMattress.action(1)>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.airMattress.action(2)>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect: function(){
        setup.status.tired(-1);
      },
      action: function(d){
        if(d === 1){
          if(this.breaks()){
            setup.dialog("Uh Oh","@@.head3;S@@ometime while yoou were asleep your cheap air mattress sprung a leak, which resulted in you waking up essentially sleeping on the floor.");
            setup.homeItemsSwitch(this.key,"bustedAirMattress");
          }
          setup.sleep.start();
        }else if(d === 2){
          setup.sleep.startNap();
        }
      },
    },
    bustedAirMattress: {
      name: "busted air mattress",
      key: "bustedAirMattress",
      image: "IMG-HomeItem-AirMatress",
      type: "furniture",
      tags: ["bed"],
      desc: "The nearly-worthless remains of your air mattress. You can still sleep on it, but it isn't much different than the floor.",
      mult: false,
      quality: 0,
      cost: 0,
      fragile: false,
      button: "Go To Sleep",
      info: "Open the menu to either take a nap or go to sleep.",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "@@.head3;Y@@our air mattress is really only intended to be used for a few nights, it's only a matter of time until it springs a major leak and becomes nearly worthless.<br><br>Spend a couple minutes reinflating and: <<button 'Sleep'>><<run aw.homeItems.airMattress.action(1)>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.airMattress.action(2)>><</button>><<tab>><<button 'Inflate'>><<run alert('You try to inflate the mattress, but it's hopeless')>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect: function(){
        setup.status.tired(2);
      },
      action: function(){
        setup.sleep.start();
      },
    },
    artNightstand: {
      name: "artistic nightstand",
      key: "artNightstand",
      image: "IMG-HomeItem-ArtisticNightstand",
      type: "furniture",
      tags : ["sexy"],
      desc: "Two elegantly-carved wooden sculptures that serve as nightstands.",
      mult: true,
      quality: 4,
      cost: 1100,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    bouncerciser: {
      name: "bouncerciser",
      key: "bouncerciser",
      image: "IMG-HomeItem-Bouncercise",
      type: "exercise",
      tags : ["sexmachine"],
      desc: "A popular home exercise device that targets the calves, thighs, butt, and pelvic floor muscles.",
      mult: false,
      quality: 3,
      cost: 105,
      fragile: 1,
      button: "Exercise [Bouncercise]",
      info: "Use the bouncerciser to get some exercise and improve your lower body stamina. <requires optional accessory & nudity for full effect> (+SEX +END +arousal +exercise -energy) [15min]",
      notRoom: ["foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        if(State.active.variables.items.hasDildo){
          setup.status.arousal(3);
          setup.time.add(15);
          setup.statusLoad();
          State.active.variables.PC.status.energy -= 3;
          setup.statusSave();
          setup.refresh();
        }else{
          setup.status.arousal(1);
          setup.time.add(15);
          setup.statusLoad();
          State.active.variables.PC.status.energy -= 3;
          setup.statusSave();
          setup.notify("Without an accessory your benefit was limited.");
          setup.refresh();
        }
      },
    },
    flexBow: {
      name: "flex-bow exercise aid",
      key: "flexBow",
      image: "IMG-HomeItem-BowExercise",
      type: "exercise",
      tags : ["sexmachine"],
      desc: "An exercise aid popular despite being marketed on infomercials, it allows you to train in many positions.",
      mult: false,
      quality: 4,
      cost: 175,
      fragile: false,
      button: "Exercise [FlexBow]",
      info: "Use the bouncerciser to get some exercise and improve your lower body stamina. (requires nudity for full effect) (+SEX +END +DEX +arousal +exercise -energy) [20min]",
      notRoom: ["balcony","foyer","bathroom"],
      menu: false,
      effect: function(){
        if(State.active.variables.PC.clothes.accessP){
          setup.status.arousal(4);
          setup.time.add(20);
          setup.statusLoad();
          State.active.variables.PC.status.energy -= 4;
          setup.statusSave();
          setup.refresh();
        }else{
          setup.time.add(5);
          setup.refresh();
          setup.dialog("Failure","@@.head3;T@@ry as you might, you're unable to find a way to use the FlexBow without having access to your crotch. You eventually give up.");
        }
      },
      action: function(){
        //nothing
      },
    },
    brokenCoffee: {
      name: "broken coffee maker",
      key: "brokenCoffee",
      image: "IMG-HomeItem-BrokenCoffee",
      type: "appliance",
      tags : ["drink"],
      desc: "Your broke-ass coffee maker that you somehow manage to make coffee with.",
      mult: false,
      quality: 0,
      cost: 0,
      fragile: 50,
      button: "Brew Coffee [somehow]",
      info: "Test your manual dexterity and hand-eye coordination once more in order to make coffee. (-fatigue) [15min]",
      notRoom: ["balcony","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        if(State.active.variables.flag.coffeeToday > 2){
          setup.time.add(15);
          setup.refresh();
          setup.notify("You make coffee, but the extra cup doesn't do you much good.");
        }else{
          setup.time.add(15);
          setup.status.tired(-1);
          setup.refresh();
          setup.notify("Mmmm... Coffee.");
        }
        State.active.variables.flag.coffeeToday += 1;
      },
    },
    sadFlowers: {
      name: "sad flowers",
      key: "sadFlowers",
      image: "IMGasaface",
      type: "decor",
      tags : ["breakable"],
      desc: "A vase full of flowers that can best be described as 'Sad'. These probably wouldn't help your mood any...",
      mult: true,
      quality: 1,
      cost: 25,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["none"],
      menu: false,
      effect: function(){
        setup.status.happy(-1);
      },
      action: function(){
        //nothing
      },
    },
    cockVase: {
      name: "cock vase",
      key: "cockVase",
      image: false,
      type: "decor",
      tags : ["breakable"],
      desc: "A peach-colored vase in a rather suggestive shape, the flowers appear to be spraying out from the top. It makes you happy.",
      mult: true,
      quality: 4,
      cost: 125,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["none"],
      menu: false,
      effect: function(){
        setup.status.happy(1);
      },
      action: function(){
        //nothing
      },
    },
    largeChand: {
      name: "large chandelier",
      key: "largeChand",
      image: "IMG-HomeItem-Chand",
      type: "decor",
      tags : ["hanging"],
      desc: "A large hanging chandelier with lights, intended to be hung from the ceiling over a table or large open area.",
      mult: true,
      quality: 3,
      cost: 725,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    cheapBedframe: {
      name: "cheap metal bedframe",
      key: "cheapBedframe",
      image: "IMG-HomeItem-CheapBedframe",
      type: "furniture",
      tags : ["bedframe"],
      desc: "A simple metal-tube frame for a bed. It's not fancy, but it looks better than just a mattress.",
      mult: true,
      quality: 2,
      cost: 85,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    cheapCoffeeTable: {
      name: "cheap coffee table",
      key: "cheapCoffeeTable",
      image: "IMG-HomeItem-CheapCoffeeTable",
      type: "furniture",
      tags : ["table"],
      desc: "A cheap black coffee table made of glueboard.",
      mult: true,
      quality: 1,
      cost: 60,
      fragile: 1,
      button: false,
      info: "",
      notRoom: ["kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    cheapDesk: {
      name: "inexpensive desk",
      key: "cheapDesk",
      image: "IMG-HomeItem-CheapDesk",
      type: "furniture",
      tags : ["desk"],
      desc: "Not particularly nice, but it does provide a sturdy surface for working.",
      mult: false,
      quality: 2,
      cost: 120,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    cheapDresser: {
      name: "cheap dresser",
      key: "cheapDresser",
      image: "IMG-HomeItem-CheapDresser",
      type: "furniture",
      tags : ["dresser"],
      desc: "A very basic faux-wood glueboard dresser, it looks nicer than it really is, which isn't saying much.",
      mult: true,
      quality: 1,
      cost: 80,
      fragile: 0,
      button: "Open [cheap dresser]",
      info: "Open the dresser, presumably to put something in or take it out, but I'm not gonna judge.",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "@@.head3;Y@@ou pull open a drawer in your cheap dresser and stare at the emptiness inside. It certainly seems like there's room for something to be placed in here.<br><br>@@.com;This is a subcontainer, which does nothing right now except serve as decoration.@@",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    cheapNightstand: {
      name: "cheap nightstand",
      key: "modernNightstand",
      image: "IMG-HomeItem-CheapNightstand",
      type: "furniture",
      tags : ["bedside"],
      desc: "A too-simple nightstand made to look like it was built with better materials. There are no drawers, and the top is too small to be very useful.",
      mult: true,
      quality: 1,
      cost: 65,
      fragile: 2,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    cheapFullMattress: {
      name: "cheap full mattress",
      key: "cheapFullMattress",
      image: "IMG-HomeItem-CheapStandard",
      type: "furniture",
      tags : ["bed"],
      desc: "A full-size spring mattress straight out of the 20th century. It isn't very comfortable, but it's good enough to sleep on.",
      mult: true,
      quality: 2,
      cost: 375,
      fragile: false,
      button: "Sleep [full mattress]",
      info: "It may not be luxurious, but it's got plenty of room for one person. Lay down and sleep or take a nap. [varies]",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.cheapFullMattress.action(1)>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.cheapFullMattress.action(2)>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect: function(){
        //nope
      },
      action: function(n){
        if(n === 1){
          setup.sleep.start();
        }else{
          setup.status.tired(-1);
          setup.time.add(60);
          setup.refresh();
        }
      },
    },
    cheapTwinMattress: {
      name: "cheap full mattress",
      key: "cheapFullMattress",
      image: "IMG-HomeItem-CheapTwin",
      type: "furniture",
      tags : ["bed"],
      desc: "A twin-size spring mattress straight out of the 20th century. It isn't very comfortable, but it's good enough to sleep on.",
      mult: true,
      quality: 2,
      cost: 375,
      fragile: false,
      button: "Sleep [full mattress]",
      info: "It may not be luxurious, but it does kind of remind you of being a kid again. Lay down and sleep or take a nap. [varies]",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br> <<button 'Sleep'>><<run aw.homeItems.cheapFullMattress.action(1)>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.cheapFullMattress.action(2)>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect: function(){
        //nope
      },
      action: function(n){
        if(n === 1){
          setup.sleep.start();
        }else{
          setup.status.tired(-1);
          setup.time.add(60);
          setup.refresh();
        }
      },
    },
    crappyBedframe: {
      name: "basic bedframe",
      key: "crappyBedframe",
      image: "IMG-HomeItem-CrappyBedframe",
      type: "furniture",
      tags : ["bedframe"],
      desc: "A simple metal bedframe, usually meant to go with a seperate headboard and footboard, but not in this case.",
      mult: true,
      quality: 1,
      cost: 125,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    crappyDesk: {
      name: "basic desk",
      key: "crappyDesk",
      image: "IMG-HomeItem-CrappyDesk",
      type: "furniture",
      tags : ["desk"],
      desc: "About as cheap as you can go and still have the resulting product be called a <i>desk</i>, though just barly.",
      mult: true,
      quality: 1,
      cost: 75,
      fragile: 5,
      button: "Use Basic Desk",
      info: "Use your desk, assuming you have a purpose to use it for.",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: "@@.head3;Y@@ou don't actually have anything to do here now, so you just look the thing over before moving away. <<addTime 5>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    crappyTVstand: {
      name: "90s-style TV stand",
      key: "crappyTVstand",
      image: "IMG-HomeItem-CrappyTVstand",
      type: "furniture",
      tags : ["tvstand"],
      desc: "It isn't terribly attractive, and doesn't really match the scale of modern flatscreen televisions, but at least it's sturdy.",
      mult: true,
      quality: 1,
      cost: 60,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    sexCushion: {
      name: "flexfoam cushion",
      key: "sexCushion",
      image: "IMG-HomeItem-Cushion",
      type: "furniture",
      tags : ["sexaid","pillow","hipsup"],
      desc: "A very supportive cushion with a cute removable cover for easy washing. The shape is a bit unusual though.",
      mult: true,
      quality: 3,
      cost: 65,
      fragile: false,
      button: "USE [flex cushion]",
      info: "Try out your flexfoam cushion while laying down.",
      notRoom: ["none"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.time.add(10);
        setup.status.arousal(1);
        setup.dialog("Sex Cushion","@@.head3;Y@@ou try out the unusually firm cushion in a couple of different positions. It's too low to elevate your head for watching TV or something, and the wedge shape and very firm surface just isn't comfortable as a pillow for sleeping. You eventually figure out that this is a sex cushion... <i>A cushion for some pushin'</i> It seems ideal to elevate your hips during sex, or perhaps afterward...");
      },
    },
    examOfficeChair: {
      name: "the commander chair",
      key: "examOfficeChair",
      image: "IMG-HomeItem-ExamChair",
      type: "furniture",
      tags : ["chair","sexaid"],
      desc: "A rather elaborate office chair upholstered in red leather.",
      mult: false,
      quality: 4,
      cost: 620,
      fragile: false,
      button: "Sit [commander chair]",
      info: "Sit down for a few minutes and pretend to be a spaceship captain. [15min]",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.time.add(15);
        if(random(1,2) === 2){
          setup.status.arousal(1);
        }
        setup.refresh();
      },
    },
    exerciseChair: {
      name: "active chair",
      key: "exerciseChair",
      image: "IMG-HomeItem-ExerciseBench",
      type: "furniture",
      tags : ["chair","sexaid","sexmachine"],
      desc: "An office chair that seems to be marketed toward the fitness crowd, it keeps you active while working behind a desk.",
      mult: true,
      quality: 4,
      cost: 625,
      fragile: false,
      button: "USE [active chair]",
      info: "Open the menu for the active chair, so you can sit, work out, or do something else...",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "<p>@@.head3;Y@@ou take a good look at the unusual chair. It's certainly different from most chairs, and not just because of the sturdy and well-engineered construction. The chair almost resembles a mobility device with the abundance of handles and the moving mechanism. Unlike most chairs, it doesn't have a back, which you figure is to keep the user from getting too relaxed. The middle of the seat is actually open, which you figure is something to do with the exercise functions.</p><p>Trying the chair out, you see that the whole seat slides back and forth in an easy glide, which you find pretty fun. It's almost like some kind of fidget chair, which would certainly keep you moving. When you look down into the opening of the seat to examine the exercise mechanism, you see that all it does is seem to stay in position right underneat your groin while moving up and down. You aren't what it's supposed to do, but the round plug-like attachment point looks oddly familiar to you...</p><<addTime 5>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    antiqueChair: {
      name: "fancy antique replica chair",
      key: "antiqueChair",
      image: "IMG-HomeItem-FancyChair",
      type: "furniture",
      tags : ["chair","sexaid"],
      desc: "A modern replica of an old German chair, it seems more ornamental than functional.",
      mult: false,
      quality: 5,
      cost: 900,
      fragile: 1,
      button: "SIT [antique chair]",
      info: "Sit down on the antique chair for a while to pass the time. [15min]",
      notRoom: ["balcony","bathroom","foyer"],
      menu: "@@.head3;Y@@ou look at the chair and try to figure out how exactly you're supposed to sit down on it with that silly wood virility ornament sticking out of the center. Then it dawns on you... It's German. Since that isn't the kind of sitting you feel like doing right now, you decide to leave the chair alone. <<addTime 5>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    restraintEndtable: {
      name: "restraint endtable",
      key: "restraintEndtable",
      image: "IMG-HomeItem-FancyInTable",
      type: "furniture",
      tags : ["smallTable"],
      desc: "An end table in a modern design, it has a unique mechanism that seems to be designed to hold a lamp or something in place so it can't be knocked over.",
      mult: true,
      quality: 5,
      cost: 215,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    antiqueTable: {
      name: "antique table",
      key: "antiqueTable",
      image: "IMG-HomeItem-FancyTable",
      type: "furniture",
      tags : ["table"],
      desc: "An elaborately-carved solid-wood table that has seen some loving restoration.",
      mult: false,
      quality: 5,
      cost: 1650,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","foyer","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    medFlatscreen: {
      name: "medium flatscreen TV",
      key: "medFlatscreen",
      image: "IMG-HomeItem-Flatscreen",
      type: "electronic",
      tags : ["TV"],
      desc: "A low-end flatscreen television that may not have many features, but is at least a decent 50 inches with a basic 4K resolution.",
      mult: true,
      quality: 3,
      cost: 700,
      fragile: 500,
      button: "Watch TV [med]",
      info: "Spend some time watching television and relax a little bit. [30min]",
      notRoom: ["balcony","bathroom","foyer"],
      menu: "<p>@@.head3;Y@@ou turn on the TV hoping to kill some time with an entertaining show. Then you realize that you don't have internet service, and can't stream anything, and you haven't paid for cable to get any traditional TV channels. In a last-ditched attempt to be amused, you see if you're able to watch any free channels.</p><p>It seems that you <b>do</b> receive a free channel, but unfortunately it consists almost entirely of local advertising.</p><center><img src='https://i.imgur.com/VdDTqEb.gif'></center><<addTime 25>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    largeFlatscreen: {
      name: "large flatscreen TV",
      key: "largeFlatscreen",
      image: "IMG-HomeItem-LargeFlatscreen",
      type: "electronic",
      tags : ["TV"],
      desc: "A nice flatscreen television that seems to have most of the modern features. It certainly isn't cutting edge, but it isn't bad.",
      mult: true,
      quality: 4,
      cost: 1200,
      fragile: 500,
      button: "Watch TV [med]",
      info: "Spend some time watching television and relax a little bit. [30min]",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "<p>@@.head3;Y@@ou turn on the TV hoping to kill some time with an entertaining show. Then you realize that you don't have internet service, and can't stream anything, and you haven't paid for cable to get any traditional TV channels. In a last-ditched attempt to be amused, you see if you're able to watch any free channels.</p><p>It seems that you <b>do</b> receive a free channel, but unfortunately it consists almost entirely of local advertising.</p><center><img src='https://i.imgur.com/VdDTqEb.gif'></center><<addTime 25>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    smallFlatscreen: {
      name: "small flatscreen TV",
      key: "smallFlatscreen",
      image: "IMG-HomeItem-SmallFlatscreen",
      type: "electronic",
      tags : ["TV"],
      desc: "A small flatscreen television that seems to be intended for secondary locations like a kitchen or bathroom.",
      mult: true,
      quality: 2,
      cost: 500,
      fragile: 500,
      button: "Watch TV [med]",
      info: "Spend some time watching television and relax a little bit. [30min]",
      notRoom: ["foyer"],
      menu: "<p>@@.head3;Y@@ou turn on the TV hoping to kill some time with an entertaining show. Then you realize that you don't have internet service, and can't stream anything, and you haven't paid for cable to get any traditional TV channels. In a last-ditched attempt to be amused, you see if you're able to watch any free channels.</p><p>It seems that you <b>do</b> receive a free channel, but unfortunately it consists almost entirely of local advertising.</p><center><img src='https://i.imgur.com/VdDTqEb.gif'></center><<addTime 25>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    tubeTV: {
      name: "ancient tube television",
      key: "tubeTV",
      image: "IMG-HomeItem-TubeTV",
      type: "electronic",
      tags : ["TV"],
      desc: "A mystery of a product, you didn't even know that companies still made these. It's very affordable though.",
      mult: true,
      quality: 1,
      cost: 100,
      fragile: 500,
      button: "Watch TV [med]",
      info: "Spend some time watching television and relax a little bit. [30min]",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "<p>@@.head3;Y@@ou turn on the TV hoping to kill some time with an entertaining show. Then you realize that you don't have internet service, and can't stream anything, and you haven't paid for cable to get any traditional TV channels. In a last-ditched attempt to be amused, you see if you're able to watch any free channels.</p><p>It seems that you <b>do</b> receive a free channel, but unfortunately it consists almost entirely of local advertising.</p><center><img src='https://i.imgur.com/VdDTqEb.gif'></center><<addTime 25>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    foldingChair: {
      name: "folding chair",
      key: "foldingChair",
      image: "IMG-HomeItem-FoldingChair",
      type: "furniture",
      tags : ["chair"],
      desc: "The ubiquitous metal chair seen at outdoor events everywhere, probably since the bronze age.",
      mult: true,
      quality: 1,
      cost: 40,
      fragile: 5,
      button: "Sit [folding chair]",
      info: "Sit down on the less-than-comfortable chair so that you can rest your legs. [10min]",
      notRoom: ["bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.status.satisfaction(-3);
        setup.time.add(10);
        setup.refresh();
        setup.notify("You feel less satisfied than before.");
      },
    },
    fruitBowl: {
      name: "decorative fruit bowl",
      key: "fruitBowl",
      image: "IMG-HomeItem-FruitBall",
      type: "decor",
      tags : ["none"],
      desc: "An elegant wooden fruit bowl.",
      mult: true,
      quality: 4,
      cost: 45,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    jewlryBox: {
      name: "woman jewelry box",
      key: "jewelryBox",
      image: "IMG-HomeItem-JewelryBox",
      type: "decor",
      tags : ["storage"],
      desc: "An elegant wood carving with drawers to store jewelry.",
      mult: true,
      quality: 5,
      cost: 275,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","living","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    liquerCabinet: {
      name: "breast liquer",
      key: "liquerCabinet",
      image: "IMG-HomeItem-LiquerCabinet",
      type: "decor",
      tags : ["alcohol"],
      desc: "An elegantly-carved wooden liquer cabinet that can set on a table or be wall mounted.",
      mult: false,
      quality: 5,
      cost: 840,
      fragile: false,
      button: "Have a drink",
      info: "",
      notRoom: ["balcony","bed","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    machineGun: {
      name: "the machinegun",
      key: "machineGun",
      image: "IMG-HomeItem-MachineGun",
      type: "other",
      tags : ["sexmachine"],
      desc: "A sex machine with rapid-fire thrusts as its main selling point.",
      mult: false,
      quality: 5,
      cost: 350,
      fragile: false,
      button: "Machinegun",
      info: "Use the machinegun to give yourself the relief you desire.",
      notRoom: ["foyer"],
      menu: "Placeholder menu for the Machinegun, where you'll choose options like which dildo to use.",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    modernStool: {
      name: "modern stool",
      key: "modernStool",
      image: "IMG-HomeItem-ModernStool",
      type: "furniture",
      tags : ["chair"],
      desc: "A very modern stool with an unusual seat, perhaps to share.",
      mult: true,
      quality: 3,
      cost: 150,
      fragile: false,
      button: "Sit [m stool]",
      info: "Sit down on the modern stool and rest for a little bit. [15min]",
      notRoom: ["none"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.time.add(15);
        setup.refresh();
      },
    },
    neatStool: {
      name: "Japanese stool",
      key: "neatStool",
      image: "IMG-HomeItem-NeatStool",
      type: "furniture",
      tags : ["chair"],
      desc: "An elegant wooden stool with three legs and decorative rope.",
      mult: true,
      quality: 5,
      cost: 400,
      fragile: false,
      button: "Sit [j-stool]",
      info: "Sit down on the japanese stool and rest for a little bit. [15min]",
      notRoom: ["none"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.time.add(15);
        setup.refresh();
      },
    },
    gridOfficeChair: {
      name: "grid office chair",
      key: "gridOfficeChair",
      image: "IMG-HomeItem-OfficeChairBondage",
      type: "furniture",
      tags : ["chair"],
      desc: "An office chair with a very modern and airy design.",
      mult: true,
      quality: 4,
      cost: 460,
      fragile: false,
      button: "Sit [grid chair]",
      info: "Sit down in your office chair and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.status.stress(-2);
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around for 30 minutes.");
      },
    },
    omniRack: {
      name: "omni-rack",
      key: "omniRack",
      image: "IMG-HomeItem-OmniRack",
      type: "other",
      tags : ["sexaid","sexmachine"],
      desc: "An unusual rod that apparently serves several functions, such as being a coat rack.",
      mult: false,
      quality: 3,
      cost: 85,
      fragile: 3,
      button: "Use OmniRack",
      info: "Use the OmniRack. You'll have to start by figuring out what it is.",
      notRoom: ["none"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    orgyCouch: {
      name: "orgy couch",
      key: "orgyCouch",
      image: "IMG-HomeItem-OrgyCouch",
      type: "furniture",
      tags : ["couch"],
      desc: "A mostly-leather couch where the cushions are made of leather shaped like intertwined bodies.",
      mult: false,
      quality: 4,
      cost: 1200,
      fragile: 2,
      button: "Sit [orgy couch]",
      info: "Sit down on your fancy couch and relax a little bit. (-stress +arousal) [30min]",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.status.stress(-4);
        setup.status.arousal(1);
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around for 30 minutes.");
      },
    },
    rockingSaddle: {
      name: "rocking stool",
      key: "rockingSaddle",
      image: "IMG-HomeItem-RockingSaddle",
      type: "furniture",
      tags : ["sexmachine","chair"],
      desc: "A high quality rocking stool that can be used as an ottoman, but also seems to have exercise functions uses.",
      mult: true,
      quality: 5,
      cost: 600,
      fragile: false,
      button: "USE [rocking stool]",
      info: "Open the menu for the rocking stool, so you can sit, work out, or do something else...",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: "<p>@@.head3;Y@@ou take a good look at the unusual stool. It's certainly different from most you've seen, and not just because of the sturdy and well-engineered construction. The middle of the seat is actually open, which you figure is something to do with the exercise functions.</p><p>Trying the chair out, you see that the whole seat slides back and forth in an easy glide, which you find pretty fun. It's almost like some kind of fidget chair, which would certainly keep you moving. When you look down into the opening of the seat to examine the exercise mechanism, you see that all it does is seem to stay in position right underneat your groin while moving up and down. You aren't what it's supposed to do, but the round plug-like attachment point looks oddly familiar to you...</p><<addTime 5>>",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    femaleSculpture: {
      name: "female sculpture",
      key: "femaleSculpture",
      image: "IMG-HomeItem-Sculpture",
      type: "decor",
      tags : ["none"],
      desc: "A simplistic wooden sculpture of a woman (probably).",
      mult: true,
      quality: 2,
      cost: 20,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    theCommissar: {
      name: "the commissar",
      key: "theCommissar",
      image: "IMG-HomeItem-SexMachine2",
      type: "other",
      tags : ["sexmachine"],
      desc: "The rugged burly man of the sex machine world, nothing can resist the penetrating power of The Commissar.",
      mult: false,
      quality: 4,
      cost: 200,
      fragile: false,
      button: "The Commissar",
      info: "Use The Commissar to give yourself the relief you desire.",
      notRoom: ["foyer"],
      menu: "Placeholder menu for The Commissar, where you'll choose options like which dildo to use.",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    handyFuck: {
      name: "handy-fuck",
      key: "handyFuck",
      image: "IMG-HomeItem-SexMachine3",
      type: "other",
      tags : ["sexmachine"],
      desc: "A sex machine focusing on convenience, it doesn't have the same versatility as other models. The cheapest model with thrust capability.",
      mult: false,
      quality: 3,
      cost: 145,
      fragile: 5,
      button: "Handy-Fuck",
      info: "Use the Handy-Fuck to give yourself a throrough womb brooming.",
      notRoom: ["foyer"],
      menu: "Placeholder menu for the Handy-Fuck, where you'll choose options like which dildo to use.",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    cheapCouch: {
      name: "cheap couch",
      key: "cheapCouch",
      image: "IMG-HomeItem-ShittyCouch",
      type: "furniture",
      tags : ["couch"],
      desc: "A cheap couch that looks like it belongs in an office from two decades ago.",
      mult: false,
      quality: 2,
      cost: 575,
      fragile: 5,
      button: "Sit [cheap couch]",
      info: "Sit down on your cheap couch and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.status.stress(-1);
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around for 30 minutes.");
      },
    },
    theSaddle: {
      name: "the saddle",
      key: "theSaddle",
      image: "IMG-HomeItem-TheSaddle",
      type: "other",
      tags : ["sexmachine"],
      desc: "A sex machine with a cowboy theme. The machine is nicely constructed but is vibration-only.",
      mult: false,
      quality: 2,
      cost: 115,
      fragile: 5,
      button: "The Saddle",
      info: "It's time for you to get back in the saddle... Or in this case, get the saddle back in you.",
      notRoom: ["foyer"],
      menu: "Placeholder menu for the The Saddle, where you'll choose options like which dildo to use.",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    TVstand: {
      name: "inexpensive TV stand",
      key: "TVstand",
      image: "IMG-HomeItem-TVstand",
      type: "furniture",
      tags : ["tvstand"],
      desc: "A simple wooden television stand.",
      mult: true,
      quality: 2,
      cost: 70,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom","foyer"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    uglyCouch: {
      name: "ugly couch",
      key: "uglyCouch",
      image: "IMG-HomeItem-UglyCouch",
      type: "furniture",
      tags : ["couch"],
      desc: "A couch so ugly, you wonder how anyone thought it was a good idea... Probably furniture-making hipsters.",
      mult: false,
      quality: 1,
      cost: 400,
      fragile: 5,
      button: "Sit [ugly couch]",
      info: "Sit down on your cheap couch and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.status.stress(-1);
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around for 30 minutes.");
      },
    },
    cheapLoveseat: {
      name: "cheap loveseat",
      key: "cheapLoveseat",
      image: "IMG-HomeItem-UglyLoveseat",
      type: "furniture",
      tags : ["couch"],
      desc: "A cheap loveseat that is likely a Malaysian knockoff of a Chinese knockoff of a couch from 20 years ago.",
      mult: false,
      quality: 1,
      cost: 550,
      fragile: 5,
      button: "Sit [cheap loveseat]",
      info: "Sit down on your cheap love seat and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        setup.status.stress(-1);
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around for 30 minutes.");
      },
    },
    uglyNightstand: {
      name: "ugly nightstands",
      key: "uglyNightstand",
      image: "IMG-HomeItem-UglyNightstands",
      type: "furniture",
      tags : ["storage"],
      desc: "simple painted-wood nightstands, made from recycled lumber scraps.",
      mult: true,
      quality: 2,
      cost: 124,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony","kitchen","bathroom"],
      menu: false,
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    doubleDonger: {
      name: "double donger",
      key: "doubleDonger",
      image: "IMG-HomeItem-UsedDoubleSaddle",
      type: "other",
      tags : ["sexmachine"],
      desc: "An elaborate saddle-style sex machine with a thick padded leather seat mounted on a solid wood base meant for standing. The dildos aren't exchangeable due to their fluid pump connection.",
      mult: true,
      quality: 1,
      cost: 300,
      fragile: 5,
      button: "Double Donger",
      info: "This baby has two thrusting dildos to fill you up, give it a ride.",
      notRoom: ["foyer"],
      menu: "Placeholder menu for the the Double Donger, where you'll choose options like what fluid it should ejaculate into you.",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
    simpleTable: {
      name: "simple table",
      key: "simpleTable",
      image: false,
      type: "furniture",
      tags : ["table"],
      desc: "A simple circular kitchen table covered in a faux wood laminate.",
      mult: true,
      quality: 1,
      cost: 100,
      fragile: 5,
      button: "Eat a Meal",
      info: "This table allows you to trigger eating a meal, if you wish to eat with an NPC in your home. (normally meals are automatic) [30min]",
      notRoom: ["foyer","bath","bedroom","balcony"],
      menu: "You tried to invite @@.ident;Asa@@ to sit and eat with you, but then you realized that @@.mono;Asa@@ is your imaginary friend-cum-tulpa you created during a bad acid trip. You sit down at the table and sob before eventually eating alone. At least the OctoChicken was delicious.",
      effect: function(){
        //nothing
      },
      action: function(){
        //nothing
      },
    },
  };
  let keys = Object.keys(items),
    n = keys.length;
  for(let i = 0; i < n; i++){
    aw.homeItems[keys[i]] = new HomeItem(items[keys[i]]);
  }
};
aw.homeItemsDefine();