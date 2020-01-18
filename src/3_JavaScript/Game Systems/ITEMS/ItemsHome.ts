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
    of breaking.ResidentialMedical
button - text on action button.
shop - list of shops where the item can be sold.
menu - false, or the html text in a dialog
    menu, including button options
action - action this item performs in js.
    must be a function.
effect - function, any effect caused by having
    an item in your home.
******************************************/

interface setupHomeItems {
  sales: (name: string | false, type: "string" | false, max: number | false, min: number | false, room: string | false, shop: string | false) => string;
  exterminate: (name: string) => boolean;
  qualityCalculator: (place: string) => number;
  placeDescription: (place: string, room: string) => string;
}


// item class
class HomeItem {
  public name: string;
  public key: string;
  public type: string;
  public image: string;
  public tags: string[];
  public mult: boolean;
  public desc: string;
  public quality: number;
  public cost: number;
  public fragile: boolean;
  public notRoom: string[];
  public shop: string[];
  public button: string;
  public info: string;
  public action: () => void;
  public actionText: string;
  public effect: () => void;
  public effectText: string;
  public remove: () => void;
  public breaks: () => void;
  constructor({
    name,
    key,
    type,
    image = false,
    tags = [],
    desc,
    mult = false,
    quality,
    cost,
    fragile = false,
    button = false,
    info,
    menu = false,
    action,
    actionText,
    effect,
    effectText,
    notRoom,
    shop,
  }: {
    name: string,
    key: string,
    type: string,
    image: string | false,
    tags: string[],
    desc: string,
    mult: boolean,
    quality: number,
    cost: number,
    fragile: boolean,
    notRoom: string[],
    shop: string[],
    button: string | false,
    info: string | false,
    menu: string | false,
    action: string | "()=>void",
    actionText: string,
    effect: string | "()=>void",
    effectText: string,
  }) {
    this.name = name;
    this.key = key;
    this.type = type;
    this.image = (!image) ? "<img data-passage='IMG-HOMEITEM-Placeholder' class='homeitem'>" : `<img data-passage='${image}' class='homeitem'>`;
    this.tags = jQuery.extend(true, [], tags);
    this.mult = mult;
    this.desc = desc;
    this.quality = quality;
    this.cost = cost;
    this.fragile = fragile;
    this.actionText = actionText;
    this.effectText = effectText;
    this.notRoom = jQuery.extend(true, [], notRoom);
    this.shop = jQuery.extend(true, [], shop);
    if (!menu && button !== false) {// if has a menu, launches menu. If not, runs action.
      this.button = `<<hoverrevise ${key}>><<button "${button}">><<run aw.homeItems.${key}.action()>><</button>><<endhoverrevise>>`;
    } else if (!button) {
      this.button = "";
    } else {
      this.button = `<<hoverrevise ${key}>><<button "${button}">><<dialog "${button}">>${menu}<</dialog>><</button>><<endhoverrevise>>`;
    }
    if (!button) {
      this.info = "";
    } else {
      this.info = `<<insertion ${key}>>${info}<<endinsertion>>`;
    }
    if ("boolean" === typeof action && !action) {
      this.action = function() {
        // do nothing
      };
    } else if ("string" === typeof action) {
      this.actionText = action;
      this.action = function() {
        // tslint:disable-next-line:no-eval
        eval(this.actionText);
      };
    } else {
      this.action = action;
    }
    if ("boolean" === typeof effect && !effect) {
      this.effect = function() {
        // do nothing
      };
    } else if ("string" === typeof effect) {
      this.effectText = effect;
      this.effect = function() {
        // tslint:disable-next-line:no-eval
        eval(this.effectText);
      };
    } else {
      this.effect = effect;
    }
    this.remove = function() {// removes item from owned list if it exists
      const ind = ↂ.home.item[this.type].indexOf(this.key);
      if (ind > -1) {
        ↂ.home.item[this.type].splice(ind, 1);
      }
    };
    this.breaks = function() {// check if item breaks, triggered externally or by action function
      if (!this.fragile) {
        return false;
      }
      if (random(1, 1000) <= this.fragile) {
        setup.notify(`<span class="bad">Your ${this.name} has broken!</span>`);
        return true;
      } else {
        return false;
      }
    };
  }
  get owned() {// for shopping interface
    return (ↂ.home.item[this.type].indexOf(this.key) > -1 && !this.mult) ? true : false;
  }
}
// ITEM DISPLAY MACROS
Macro.add("homeItemDisp", {
  handler() {
    const loc = ↂ.map.loc[1];
    const items = ↂ.home.item[loc];
    const c = items.length;
    let output = "<div id='homeItemDisp' class='sideBox'>";
    for (let i = 0; i < c; i++) {
      const it = aw.homeItems[items[i]];
      if (!it.tags.includes("hidden")) {
        output += `<div id="${it.key}List" class="sideBoxHome">${it.image}<span class="head">${it.name}:</span> ${it.desc}</div>`;
      }
    }
    output += "</div>";
    return new Wikifier(this.output, output);
  },
});
Macro.add("homeItemButtons", {
  handler() {
    const loc = ↂ.map.loc[1];
    const items = ↂ.home.item[loc];
    const c = items.length;
    let output = "";
    for (let i = 0; i < c; i++) {
      const it = aw.homeItems[items[i]];
      if (!it.tags.includes("noButton")) {
        output += it.button;
      }
    }
    return new Wikifier(this.output, output);
  },
});
Macro.add("homeItemInfo", {
  handler() {
    const loc = ↂ.map.loc[1];
    const items = ↂ.home.item[loc];
    const c = items.length;
    let output = "";
    for (let i = 0; i < c; i++) {
      const it = aw.homeItems[items[i]];
      if (!it.tags.includes("noButton")) {
        output += it.info;
      }
    }
    return new Wikifier(this.output, output);
  },
});
aw.homeItemsSwitch = function(orig: string, repl: string): void {
  const home = ↂ.home;
  const arrKey = Object.keys(home);
  const al = arrKey.length;
  for (let i = 0; i < al; i++) {
    if (Array.isArray(home[arrKey[i]]) && home[arrKey[i]].includes(orig)) {
      const del = home[arrKey[i]].delete(orig);
      for (let j = 0, c = del.length; j < c; j++) {
        home[arrKey[i]].push(repl);
      }
    }
  }
};

interface homeItemsSalesArg {
  name: string | false;
  type: string | false;
  max: number | false;
  min: number | false;
  room: string | false;
}

setup.homeItems = {
  // a shopping sales interface generator
  sales(name: string | false = false, type: string | false = false, max: number | false = false, min: number | false = false, room: string | false = false, shop: string | false = false): string {
    const keys = Object.keys(aw.homeItems);
    const leng = keys.length;
    const exclude = ["someBlankets", "oldThrowPillow", "bustedStool", "bustedLawnchair", "bustedAirMattress"];
    let out = "<div id='homeContainer' class='displayFlex fadeInUp animated'>";
    for (let i = 0; i < leng; i++) {
      let ck = true;
      if (type && aw.homeItems[keys[i]].type !== type) {
        ck = false;
      } else if (max && aw.homeItems[keys[i]].cost > max) {
        ck = false;
      } else if (min && aw.homeItems[keys[i]].cost < min) {
        ck = false;
      } else if (room && aw.homeItems[keys[i]].notRoom.includes(room)) {
        ck = false;
      } else if (exclude.includes(aw.homeItems[keys[i]].key)) {
        ck = false;
      } else if (shop && !aw.homeItems[keys[i]].shop.includes(shop)) {
        ck = false;
      }
      if (ck) {
        const k = aw.homeItems[keys[i]];
        const img = k.image.slice(19, k.image.search(/'\sclass/));
        out += `<div id="${k}" class="homeItemSale">`;
        out += `<img data-passage="${img}">`;
        out += `<span class="head">${aw.capital(k.name)}</span><<sp 2>><<button "Add to Cart">><<set State.active.variables.cart.push(["${k.name}","home",${k.cost},"${k.key}"])>><<prepend "#homeOutput">>${aw.capital(k.name)}...${k.cost}<br><</prepend>><</button>><<sp 2>><br>`;
        out += `<b>QUAL:</b> ${k.quality}, <b>Cost:</b> <span class="money"><<mon>>${k.cost}</span><br>${k.desc}</div>`;
      }
    }
    out += "</div><div id='homeOutput' class='monospace zoomInDown animated ghettoShopOutput'><div class='lato' style='position:absolute;bottom:5px;left:5px;right:5px;font-size:24px;'>Shopping Results</div></div>";
    return out;
  },
  exterminate(name: string) {
    if (aw.homeItems[name] === undefined) {
      aw.con.warn(`setup.homeItems.exterminate was supplied with object name ${name} not found in aw.homeItems. Uh oh.`);
      return false;
    } else if (ↂ.home.item.owned.indexOf(name) === -1) {
      aw.con.warn(`setup.homeItems.exterminate was supplied with object name ${name} not found in ↂ.home.item.owned. Uh oh.`);
      return false;
    } else {
      ↂ.home.item.owned.splice(ↂ.home.item.owned.indexOf(name), 1);
      return true;
    }
  },
  qualityCalculator(place: string) {
    if (place === "pcHome") {
      if (ↂ.home.stats.tier < 3) {
        const listOfFurniture = ↂ.home.item.living.concat(
          ↂ.home.item.kitchen,
          ↂ.home.item.foyer,
          ↂ.home.item.bedroom,
          ↂ.home.item.bath,
          ↂ.home.item.balcony,
        );
        let overall = 0;
        listOfFurniture.forEach(function(blin) {
          if (aw.homeItems[blin].quality == null) {
            aw.con.warn(`setup.homeItems.qualityCalculator was unable to find ${blin} in aw.homeItems!`);
            // return 0; this causes problems, because you're returning from your function(blin)
          } else {
            overall += aw.homeItems[blin].quality;
          }
        });
        const div = Math.max(10, listOfFurniture.length);
        const result = Math.round(overall / div);
        return result;
      } else if (ↂ.home.stats.tier === 3) {
        const listOfFurniture = ↂ.home.item.living.concat(
          ↂ.home.item.kitchen,
          ↂ.home.item.foyer,
          ↂ.home.item.bedroom,
          ↂ.home.item.bath,
          ↂ.home.item.balcony,
          ↂ.home.item.bed2,
        );
        let overall = 0;
        listOfFurniture.forEach(function(blin) {
          if (aw.homeItems[blin].quality == null) {
            aw.con.warn(`setup.homeItems.qualityCalculator was unable to find ${blin} in aw.homeItems!`);
            // return 0; this causes problems, because you're returning from your function(blin)
          } else {
            overall += aw.homeItems[blin].quality;
          }
        });
        const div = Math.max(12, listOfFurniture.length);
        const result = Math.round(overall / div);
        return result;
      } else {
        aw.con.warn(`setup.homeItems.qualityCalculator can only calculate tier 2 home now!`);
        return 0;
      }
    } else if (place === "BfHome") {
      // nuthing here for now
      aw.con.warn(`setup.homeItems.qualityCalculator can only calculate PC home now!`);
      return 0;
    } else {
      aw.con.warn(`setup.homeItems.qualityCalculator was supplied with pretty strange place name, here it is: ${place}`);
      return 0;
    }
  },
  placeDescription(place: string, room: string) {
    if (place === "pcHome") {
      let output = "";
      if (ↂ.home.item[room] == null) {
        aw.con.warn(`setup.homeItems.placeDescription was unable to find ${room} in ↂ.home.item!`);
        return "Error in placeDescription function, sorry!";
      }
      let roomWord = "error";
      switch (room) {
        case "bath":
          roomWord = "bathroom";
          break;
        case "foyer":
          roomWord = "foyer";
          break;
        case "kitchen":
          roomWord = "kitchen";
          break;
        case "living":
          roomWord = "living room";
          break;
        case "bedroom":
          roomWord = "bedroom";
          break;
        case "balcony":
          roomWord = "balcony";
          break;
        case "bed2":
          roomWord = "spare bedroom";
          break;
      }
      let clean = "error";
      switch (Math.round(ↂ.home.clean.neatness / 10)) {
        case 10:
          clean = "pristine";
          break;
        case 9:
        case 8:
        case 7:
          clean = "clean";
          break;
        case 6:
        case 5:
          clean = "messy";
          break;
        case 4:
        case 3:
          clean = "<span class='smear'>dirty</span>";
          break;
        case 2:
        case 1:
        case 0:
          clean = "<span class='smear'>filthy</span>";
          break;
      }
      if (ↂ.home.item[room].length === 0) {
        output += `@@.head3;Y@@our ${clean} ${roomWord} is completely empty.`;
      } else {
        output += `@@.head3;Y@@ou take a look around your ${clean} ${roomWord} and see `;
        ↂ.home.item[room].forEach(function(blin) {
          output += `${aw.homeItems[blin].name}, `;
        });
      }
      return output;
    } else if (place === "BfHome") {
      // nuthing here for now
      return "placeDescription can only calculate PC home now!";
    } else {
      aw.con.warn(`setup.homeItems.placeDescription was supplied with not expected place name! ${place}`);
      return "placeDescription was supplied with not expected place name!";
    }
    return "Error in placeDescription function, sorry!";
  },
};
// START DEFINING ACTUAL ITEMS
aw.homeItems = {};
(function() {
  const items = {
    cozyChair: {
      name: "Cozy Chair",
      key: "cozyChair",
      image: "IMG-HomeItem-CozyChair",
      type: "furniture",
      tags : ["chair"],
      desc: "A vintage-looking chair. Looks really invitating.",
      mult: true,
      quality: 4,
      cost: 549,
      fragile: false,
      button: "Sit in Chair",
      info: "Sit down in your chair and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-4, "Sitting in a cozy chair");
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around in the cozy chair for 30 minutes.");
      },
    },
    smallChair: {
      name: "Small Chair",
      key: "smallChair",
      image: "IMG-HomeItem-SmallChair",
      type: "furniture",
      tags : ["chair"],
      desc: "A small chair. More comfortable than stool.",
      mult: true,
      quality: 3,
      cost: 249,
      fragile: false,
      button: "Sit in Chair",
      info: "Sit down in your chair and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-3, "Sitting in your small chair");
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around in the small chair for 30 minutes.");
      },
    },
    plasticChair: {
      name: "Plastic Chair",
      key: "plasticChair",
      image: "IMG-HomeItem-PlasticChair",
      type: "furniture",
      tags : ["chair"],
      desc: "A modern chair. Looks pretty fancy but not that comfortable for long-term using.",
      mult: true,
      quality: 2,
      cost: 170,
      fragile: false,
      button: "Sit in Chair",
      info: "Sit down in your chair and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-2, "Relaxing in a plastic chair");
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around in the small chair for 30 minutes.");
      },
    },
    pinkChair: {
      name: "Pink Royal Chair",
      key: "pinkChair",
      image: "IMG-HomeItem-PinkChair",
      type: "furniture",
      tags : ["chair"],
      desc: "A barocco-styled chair with a bright pink accents.",
      mult: true,
      quality: 3,
      cost: 240,
      fragile: false,
      button: "Sit in Chair",
      info: "Sit down in your chair and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony", "bathroom"],
      shop: ["BBB"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-2, "Relaxing in your royal chair");
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around in the small chair for 30 minutes.");
      },
    },
    lowPinkChair: {
      name: "Low Pink Chair",
      key: "lowPinkChair",
      image: "IMG-HomeItem-Pinkwidechair",
      type: "furniture",
      tags : ["chair"],
      desc: "A modern-looking chair in the pink color. Looks comfy.",
      mult: true,
      quality: 2,
      cost: 180,
      fragile: false,
      button: "Sit in Chair",
      info: "Sit down in your chair and relax a little bit. (-stress) [30min]",
      notRoom: ["balcony", "bathroom"],
      shop: ["BBB"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-2, "Resting in your pink chair");
        setup.time.add(30);
        setup.refresh();
        setup.notify("You sat around in the pink chair for 30 minutes.");
      },
    },
    KingBed: {
      name: "King bed",
      key: "KingBed",
      image: "IMG-HomeItem-KingsizeBed",
      type: "furniture",
      tags : ["bed"],
      desc: "A big comfy bed. Mattress included.",
      mult: true,
      quality: 4,
      cost: 599,
      fragile: false,
      button: "Sleep [King Bed]",
      info: "That bed may look not that fancy but it is truly comfortable. Lay down and sleep or take a nap. [varies]",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.KingBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.KingBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    machoBed: {
      name: "Macho bed",
      key: "machoBed",
      image: "IMG-HomeItem-MachoBed",
      type: "furniture",
      tags : ["bed"],
      desc: "A big pink king-size bed for those who radiate masculinity.",
      mult: true,
      quality: 4,
      cost: 699,
      fragile: false,
      button: "Sleep [Pink Bed]",
      info: "That bed looks comfy with all these frills and lacing. Lay down and sleep or take a nap. [varies]",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["BBB"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.machoBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.machoBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    loveBed: {
      name: "Love bed",
      key: "loveBed",
      image: "IMG-HomeItem-heartBed",
      type: "furniture",
      tags : ["bed"],
      desc: `A heart-shaped bed in red color. Practically screams "Fuck on me like there is no tomorrow".`,
      mult: true,
      quality: 4,
      cost: 720,
      fragile: false,
      button: "Sleep [Love Bed]",
      info: "That bed looks nice hovewer you doubt it is made for sleeping at all. Lay down and sleep or take a nap. [varies]",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["BBB"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.loveBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.loveBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    SimpleBed: {
      name: "Simple bed",
      key: "SimpleBed",
      image: "IMG-HomeItem-SimpleBed3",
      type: "furniture",
      tags : ["bed"],
      desc: "A big plain bed. Mattress included.",
      mult: true,
      quality: 3,
      cost: 399,
      fragile: false,
      button: "Sleep [Simple Bed]",
      info: "The bedframe is rather simple and frugal but the mattress seems soft. Lay down and sleep or take a nap. [varies]",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.SimpleBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.SimpleBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    vulgarSofa: {
      name: "Vulgar sofa",
      key: "vulgarSofa",
      image: "IMG-HomeItem-VulgarSofa",
      type: "furniture",
      tags : ["couch"],
      desc: "Bright red bad-tasted looking sofa. Not that comfortable to sit but can be used as a bed.",
      mult: true,
      quality: 2,
      cost: 299,
      fragile: false,
      button: "Use sofa",
      info: "Lay down and sleep or sit for a while. [varies]",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: "@@.head3;Y@@our red sofa is ready to serve you.<br><br><<button 'Sleep'>><<run aw.homeItems.vulgarSofa.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Just sit for a while'>><<run aw.homeItems.vulgarSofa.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.status.stress(-3, "Sitting on your red sofa");
          setup.time.add(30);
          setup.refresh();
          setup.notify("You sat around on the red sofa for 30 minutes.");
        }
      },
    },
    leatherSofa: {
      name: "Leather sofa",
      key: "leatherSofa",
      image: "IMG-HomeItem-LeatherSofa",
      type: "furniture",
      tags : ["couch"],
      desc: "Leather brown sofa. Pretty comfortable and also can be used as a substitute bed.",
      mult: true,
      quality: 4,
      cost: 399,
      fragile: false,
      button: "Use sofa",
      info: "Lay down and sleep or sit for a while. [varies]",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: "@@.head3;Y@@our leather sofa is ready to serve you.<br><br><<button 'Sleep'>><<run aw.homeItems.leatherSofa.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Just sit for a while'>><<run aw.homeItems.leatherSofa.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.status.stress(-4, "Sitting on your leather sofa");
          setup.time.add(30);
          setup.refresh();
          setup.notify("You sat around on the leather sofa for 30 minutes.");
        }
      },
    },
    coffeeTable: {
      name: "Coffee table",
      key: "coffeeTable",
      image: "IMG-HomeItem-CofeeTable",
      type: "furniture",
      tags : ["table"],
      desc: "Little coffee table - a true symbol of Swedish design.",
      mult: true,
      quality: 3,
      cost: 199,
      fragile: 5,
      button: false,
      info: "Simple coffee table. Not that it is crucial to have one of those to drink a coffee actually. Maybe you can do something else on it.",
      notRoom: ["foyer", "bath", "bedroom", "balcony"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    Stocks: {
      name: "stocks",
      key: "Stocks",
      image: "IMG-HomeItem-Stocks",
      type: "furniture",
      tags : ["sexaid"],
      desc: "Vintage looking wooden construction for resting medieval-style.",
      mult: true,
      quality: 3,
      cost: 199,
      fragile: 5,
      button: "Rest in stocks",
      info: "Use the stocks thee way it is intended to be used [15 min].",
      notRoom: ["foyer", "bath", "balcony"],
      shop: ["prude"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        if (State.active.variables.pref.bondage === true) {
          if (ↂ.pc.body.tone < 4) {
            if (ↂ.pc.kink.masochist || ↂ.pc.kink.sub || ↂ.pc.kink.bond) {
              setup.status.stress(3, "placing yourself in stocks");
              setup.status.arousal(3);
            } else {
              setup.status.stress(10, "placing yourself in stocks");
              setup.status.arousal(2);
            }
            setup.time.add(30);
            setup.dialog("Stocking yourself hard", "@@.head3;C@@losing the heavy upper piece by yourself is surprisingly difficult but somehow you manage to pull it off. Without the lock being in place and closed you can get out at any moment so you decide to investigate the sensation of vulnerability granted by that restraning furniture. The stocks forced you into a bent position, causing your butt to puff out proudly. <<if ↂ.pc.kink.bond || ↂ.pc.kink.sub>>@@.mono;I am so helpless in that position... can't stop imagining being taken rudely while locked in this...@@<<elseif ↂ.pc.kink.masochist>>@@.mono;Oh, that is perfect furniture for receiving some serious spanking. I could use some right now honestly...@@<<else>>@@.mono;I feel a bit silly locked in this. But in the right circumstances it still can be useful... I guess.@@<</if>> After some time, you feel your back start to ache and try to get out. Surprisingly, the upper piece is too heavy and you realise that you are not strong enough to push it up. @@.mono;Oops...@@ It takes you more than a dozen of minutes of struggle to finally get free from the device. <<if ↂ.pc.kink.bond || ↂ.pc.kink.sub>>You find the experience rather arousing.<<else>> You find the experience pretty afwul.<</if>>");
          } else {
            setup.status.arousal(1);
            setup.time.add(15);
            setup.refresh();
            setup.dialog("Stocking yourself", "@@.head3;C@@losing the heavy upper piece by yourself is not that difficult, mainly because of you strong muscles. Without the lock being in place and closed you can get out at any moment so you decide to investigate the sensation of vulnerability granted by that restraning furniture. The stocks forced you into a bent position, causing your butt to puff out proudly. <<if ↂ.pc.kink.bond || ↂ.pc.kink.sub>>@@.mono;I am so helpless in that position... can't stop imagining being taken rudely while locked in this...@@<<elseif ↂ.pc.kink.masochist>>Oh, that is perfect furniture for receiving some serious spanking. I could use some right now honestly...<<else>>I feel a bit silly locked in this. But in the right circumstances it still can be useful... I guess.<</if>> After some time you feel your back start to ache. It takes a bit of struggling with the upper piece, but eventually you get out from the stocks.");
          }
        aw.S();
        } else {
          setup.notify("You can't force yourself to try the stocks, something holds you back.");
        }
      },
    },
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-2, "Resting in a cheap recliner");
        setup.time.add(30);
        setup.refresh();
        if (this.breaks()) {
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
      button: "Sleep on Floor",
      info: "Lay down and go to sleep for the day. (+vigor, +energy, +health)[varies]",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["none"],
      menu: false,
      effect() {
        setup.status.tired(2, "Sleeping on shitty jizz-stained blankets");
      },
      action() {
        setup.sleep.go();
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["none"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        if (random(1, 3) === 3) {
          setup.status.stress(-1, "Resting on a jizz-stained throw pillow");
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
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.time.add(15);
        setup.refresh();
        if (this.breaks()) {
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
      notRoom: ["kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        const c = "@@.head3;Y@@ou sit down in the broken lawnchair, <<if setup.clothes.access.pussy>>your bare pussy easily accessible through the hole in the fabric.<<elseif ↂ.pc.clothes.keys.bottom == 0 || setup.clothes.skirtDanger > 0>>only the thin protection of your panties keeping you from being exposed to whatever is underneath the chair.<<else>>with your legs apart thanks to the very noticeable hole. If it wasn't for your <<= aw.slot.bottom.style>>, you'd be very exposed.<</if>> You think about it for a while, and come up with some pretty naughty ideas about what you can do with this chair.";
        if (random(1, 2) === 2) {
          setup.status.arousal(1);
        }
        setup.time.add(15);
        setup.refresh();
        if (this.breaks()) {
          this.remove();
        }
        setup.dialog("Busted Lawnchair", c);
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: "@@.head3;Y@@our air mattress is really only intended to be used for a few nights, it's only a matter of time until it springs a major leak and becomes nearly worthless.<br><br>Spend a couple minutes reinflating and: <<button 'Sleep'>><<run aw.homeItems.airMattress.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.airMattress.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        setup.status.tired(1, "Sleeping on an air mattress");
      },
      action(d) {
        if (d === 1) {
          if (this.breaks()) {
            UI.alert(`Uh Oh...
            sometime while you were asleep your cheap air mattress sprung a leak, which resulted in you waking up essentially sleeping on the floor. You now have a "busted" air mattress.`);
            try {
              aw.homeItemsSwitch(this.key, "bustedAirMattress");
            } catch (e) {
              aw.con.warn(`Error switching out air matress after it breaks... ${e.name}: ${e.message}`);
            }
          }
          setup.sleep.go();
        } else if (d === 2) {
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: "@@.head3;Y@@our air mattress is really only intended to be used for a few nights, it's only a matter of time until it springs a major leak and becomes nearly worthless.<br><br>Spend a couple minutes reinflating and: <<button 'Sleep'>><<run aw.homeItems.airMattress.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.airMattress.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Inflate'>><<run UI.alert('You try to inflate the mattress, but it's hopeless')>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        try {
          setup.status.tired(2, "Sleeping on a busted air mattress with no air");
        } catch (e) {
          aw.con.warn(`Air Matress can't use setup.status.tired(2) to increase tiredness for some reason. ${e.name}: ${e.message}`);
        }
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    pinkNightstand: {
      name: "pink nightstand",
      key: "pinkNightstand",
      image: "IMG-HomeItem-PinkNightstand",
      type: "furniture",
      tags : ["none"],
      desc: "Classic piece of furniture painted in some odd color.",
      mult: true,
      quality: 2,
      cost: 175,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["BBB"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      info: "Use the bouncerciser to get some exercise and improve your lower body stamina. [requires optional accessory & nudity for full effect] (+SEX +END +arousal +exercise -energy) [15min]",
      notRoom: ["foyer"],
      shop: ["prude"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        if (State.active.variables.items.hasDildo) {
          setup.status.arousal(3);
          setup.time.add(15);
          setup.statusLoad();
          ↂ.pc.status.energy.amt -= 3;
          setup.statusSave();
          setup.refresh();
        } else {
          setup.status.arousal(1);
          setup.time.add(15);
          setup.statusLoad();
          ↂ.pc.status.energy.amt -= 3;
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
      notRoom: ["balcony", "foyer", "bathroom"],
      shop: ["prude"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        if (setup.clothes.access.pussy) {
          const chance = random(0, 10);
          if (chance > 8) {
            setup.status.satisfact(random(20, 30), "Cumming with your Flexbow");
            setup.notify("Bouncing on a Flexbow made you cum.");
          } else {
            setup.status.satisfact((random(10, 15) * -1), "Not getting off with your Flexbow");
          }
          setup.status.arousal(4);
          setup.time.add(20);
          setup.statusLoad();
          ↂ.pc.status.energy.amt -= 4;
          setup.statusSave();
          setup.refresh();
        } else {
          setup.time.add(5);
          setup.refresh();
          setup.dialog("Failure", "@@.head3;T@@ry as you might, you're unable to find a way to use the FlexBow without having access to your crotch. You eventually give up.");
        }
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
      notRoom: ["balcony", "foyer"],
      shop: ["none"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        if (ↂ.flag.coffeeToday > 2) {
          setup.time.add(15);
          setup.refresh();
          setup.notify("You make coffee, but the extra cup doesn't do you much good.");
        } else {
          setup.time.add(15);
          setup.status.tired(-1, "Drinking delicious coffee");
          setup.refresh();
          setup.notify("Mmmm... Coffee.");
        }
        ↂ.flag.coffeeToday += 1;
      },
    },
    sadFlowers: {
      name: "sad flowers",
      key: "sadFlowers",
      image: "IMGsadflowers",
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
      shop: ["bullseye"],
      menu: false,
      effect() {
        setup.status.happy(-1, "Sad Flowers make you feel sad");
      },
      action() {
        // nothing
      },
    },
    pictureAT: {
      name: "Appletree poster",
      key: "pictureAT",
      image: "IMG-HomeItem-loveAT",
      type: "decor",
      tags : ["none"],
      desc: `A framed "I love Appletree" poster. Looks pretty neat.`,
      mult: true,
      quality: 3,
      cost: 32,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["none"],
      shop: ["BBB"],
      menu: false,
      effect() {
        setup.status.happy(1, "Behavioral conditioning from Appletree poster");
      },
      action() {
        // nothing
      },
    },
    lichPic: {
      name: "Lich art",
      key: "lichPic",
      image: "IMG-HomeItem-LichPic",
      type: "decor",
      tags : ["none"],
      desc: `A framed painting of some girl and a suspicious skeleton. Looking good though.`,
      mult: true,
      quality: 4,
      cost: 52,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["none"],
      shop: ["BBB"],
      menu: false,
      effect() {
        setup.status.happy(1, "Admiring the glory of the Erolich");
      },
      action() {
        // nothing
      },
    },
    homePoster: {
      name: "poster",
      key: "homePoster",
      image: "IMG-HomeItem-homePoster",
      type: "decor",
      tags : ["none"],
      desc: `A framed poster with some truly inspirational words.`,
      mult: true,
      quality: 2,
      cost: 24,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["none"],
      shop: ["BBB"],
      menu: false,
      effect() {
        if (random(0, 3) === 3) {
          setup.status.happy(1, "Feeling inspired by your inspirational poster");
        }
      },
      action() {
        // nothing
      },
    },
    cockVase: {
      name: "cock vase",
      key: "cockVase",
      image: "IMG-cockVase",
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
      shop: ["bullseye"],
      menu: false,
      effect() {
        setup.status.happy(1, "Thinking about cocks thanks to your cock vase");
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    /*cheapBedframe: {
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["none"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },*/
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
      notRoom: ["kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    woodenTable: {
      name: "Wooden coffee table",
      key: "woodenTable",
      image: "IMG-HomeItem-WoodenTable",
      type: "furniture",
      tags : ["table"],
      desc: "A coffee table made of wood with some pretty unusual leg construction.",
      mult: true,
      quality: 2,
      cost: 87,
      fragile: 2,
      button: false,
      info: "",
      notRoom: ["kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: "@@.head3;Y@@ou pull open a drawer in your cheap dresser and stare at the emptiness inside. It certainly seems like there's room for something to be placed in here.<br><br>@@.com;This is a subcontainer, which does nothing right now except serve as decoration.@@",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    /*cheapFullMattress: {
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["none"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.cheapFullMattress.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.cheapFullMattress.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.nap(60);
        }
      },
    },*/
    /*cheapTwinMattress: {
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["none"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br> <<button 'Sleep'>><<run aw.homeItems.cheapFullMattress.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.cheapFullMattress.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.nap(60);
        }
      },
    },*/
    /*crappyBedframe: {
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["none"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },*/
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: "@@.head3;Y@@ou don't actually have anything to do here now, so you just look the thing over before moving away. <<addTime 5>>",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    sexCushion: {
      name: "flexfoam cushion",
      key: "sexCushion",
      image: "IMG-HomeItem-Cushion",
      type: "furniture",
      tags : ["sexaid", "pillow", "hipsup"],
      desc: "A very supportive cushion with a cute removable cover for easy washing. The shape is a bit unusual though.",
      mult: true,
      quality: 3,
      cost: 65,
      fragile: false,
      button: "USE [flex cushion]",
      info: "Try out your flexfoam cushion while laying down.",
      notRoom: ["none"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.time.add(10);
        setup.status.arousal(1);
        setup.dialog("Sex Cushion", "@@.head3;Y@@ou try out the unusually firm cushion in a couple of different positions. It's too low to elevate your head for watching TV or something, and the wedge shape and very firm surface just isn't comfortable as a pillow for sleeping. You eventually figure out that this is a sex cushion... <i>A cushion for some pushin'</i> It seems ideal to elevate your hips during sex, or perhaps afterward...");
      },
    },
    examOfficeChair: {
      name: "the commander chair",
      key: "examOfficeChair",
      image: "IMG-HomeItem-ExamChair",
      type: "furniture",
      tags : ["chair", "sexaid"],
      desc: "A rather elaborate office chair upholstered in red leather.",
      mult: false,
      quality: 4,
      cost: 620,
      fragile: false,
      button: "Sit [commander chair]",
      info: "Sit down for a few minutes and pretend to be a spaceship captain. [15min]",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.time.add(15);
        if (random(1, 2) === 2) {
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
      tags : ["chair", "sexaid", "sexmachine"],
      desc: "An office chair that seems to be marketed toward the fitness crowd, it keeps you active while working behind a desk.",
      mult: true,
      quality: 4,
      cost: 625,
      fragile: false,
      button: "USE [active chair]",
      info: "Use the active chair.",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["prude"],
      menu: "<p>@@.head3;Y@@ou take a good look at the unusual chair. It's certainly different from most chairs, and not just because of the sturdy and well-engineered construction. The chair almost resembles a mobility device with the abundance of handles and the moving mechanism. Unlike most chairs, it doesn't have a back, which you figure is to keep the user from getting too relaxed. The middle of the seat is actually open, which you figure is something to do with the exercise functions.</p><p>Trying the chair out, you see that the whole seat slides back and forth in an easy glide, which you find pretty fun. It's almost like some kind of fidget chair, which would certainly keep you moving. When you look down into the opening of the seat to examine the exercise mechanism, you see that all it does is seem to stay in position right underneat your groin while moving up and down. You aren't what it's supposed to do, but the round plug-like attachment point looks oddly familiar to you...</p><<addTime 5>>",
      effect() {
        // nothing
      },
      action() {
        const chance = random (1, 10);
        if (chance > 8) {
          setup.status.satisfact(random(20, 30), "Cumming while riding your active chair");
          setup.notify("Fidgeting on a chair made you cum.");
        } else {
          setup.status.satisfact((random(10, 15) * -1), "Failing to cum with your active chair");
          setup.notify("You fidgeted on a chair for some time which made you more aroused.");
        }
        setup.time.add(20);
        setup.statusSave();
        setup.refresh();
      },
    },
    antiqueChair: {
      name: "fancy antique replica chair",
      key: "antiqueChair",
      image: "IMG-HomeItem-FancyChair",
      type: "furniture",
      tags : ["chair", "sexaid"],
      desc: "A modern replica of an old German chair, it seems more ornamental than functional.",
      mult: false,
      quality: 5,
      cost: 900,
      fragile: 1,
      button: "SIT [antique chair]",
      info: "Sit down on the antique chair for a while to pass the time. [15min]",
      notRoom: ["balcony", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: "@@.head3;Y@@ou look at the chair and try to figure out how exactly you're supposed to sit down on it with that silly wood virility ornament sticking out of the center. Then it dawns on you... It's German. Since that isn't the kind of sitting you feel like doing right now, you decide to leave the chair alone. <<addTime 5>>",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["prude"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "foyer", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "bathroom", "foyer"],
      shop: ["bullseyeElectronics"],
      menu: "<<include [[TV]]>><<timed 100ms>><<updatebar>><</timed>>",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseyeElectronics"],
      menu: "<<include [[TV]]>><<timed 100ms>><<updatebar>><</timed>>",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      shop: ["bullseyeElectronics"],
      menu: "<<include [[TV]]>><<timed 100ms>><<updatebar>><</timed>>",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseyeElectronics"],
      menu: "<<include [[TV]]>><<timed 100ms>><<updatebar>><</timed>>",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.satisfact(-3, "Your folding chair makes you dissatisfied");
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
      notRoom: ["balcony", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "living", "foyer"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    liquerCabinet: {
      name: "breast liquor",
      key: "breastLiquor",
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
      notRoom: ["balcony", "bed", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    boozeCabinet: {
      name: "liquer cabinet",
      key: "liquerCabinet",
      image: "IMG-HomeItem-LiquerCabinet2",
      type: "decor",
      tags : ["alcohol"],
      desc: "An cheap wall-mounted storage for your booze.",
      mult: false,
      quality: 2,
      cost: 80,
      fragile: false,
      button: "Have a drink",
      info: "",
      notRoom: ["balcony", "bed", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      shop: ["prude"],
      menu: "@@.head3;Y@@ou examine the sex machine.<br><br><<button 'Use'>><<run aw.homeItems.machineGun.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.notify("It is pretty much useless without dildo attached");
        } else {
          // nope
        }
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
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
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
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-2, "Resting iny your office chair");
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
      tags : ["sexaid", "sexmachine"],
      desc: "An unusual rod that apparently serves several functions, such as being a coat rack.",
      mult: false,
      quality: 3,
      cost: 85,
      fragile: 3,
      button: "Use OmniRack",
      info: "Use the OmniRack. You'll have to start by figuring out what it is.",
      notRoom: ["none"],
      shop: ["prude"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        const chance = random(0, 10);
        if (chance > 2 && !ↂ.pc.kink.hard) {
          setup.status.satisfact(random(10, 20), "Cumming from using your OmniRack");
          setup.notify("You fixed yourself on the OmniRack for some time which made you cum after some fidgeting.");
        } else {
          setup.status.satisfact((random(10, 15) * -1), "Failing to cum with your OmniRack");
          setup.notify("You fixed yourself on the OmniRack for some time which made you hornier.");
        }
        setup.status.arousal(4);
        setup.time.add(20);
        setup.statusLoad();
        ↂ.pc.status.energy.amt -= 14;
        setup.statusSave();
        setup.refresh();
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-4, "Relaxing on your orgy couch");
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
      tags : ["sexmachine", "chair"],
      desc: "A high quality rocking stool that can be used as an ottoman, but also seems to have exercise functions uses.",
      mult: true,
      quality: 5,
      cost: 600,
      fragile: false,
      button: "USE [rocking stool]",
      info: "Open the menu for the rocking stool, so you can sit, work out, or do something else...",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["prude"],
      menu: "<p>@@.head3;Y@@ou take a good look at the unusual stool. It's certainly different from most you've seen, and not just because of the sturdy and well-engineered construction. The middle of the seat is actually open, which you figure is something to do with the exercise functions.</p><p>Trying the chair out, you see that the whole seat slides back and forth in an easy glide, which you find pretty fun. It's almost like some kind of fidget chair, which would certainly keep you moving. When you look down into the opening of the seat to examine the exercise mechanism, you see that all it does is seem to stay in position right underneat your groin while moving up and down. You aren't what it's supposed to do, but the round plug-like attachment point looks oddly familiar to you...</p><<addTime 5>>",
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      shop: ["prude"],
      menu: "@@.head3;Y@@ou examine the sex machine.<br><br><<button 'Use'>><<run aw.homeItems.theCommissar.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.notify("It is pretty much useless without dildo attached");
        } else {
          // nope
        }
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
      shop: ["prude"],
      menu: "@@.head3;Y@@ou examine the sex machine.<br><br><<button 'Use'>><<run aw.homeItems.theCommissar.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.notify("It is pretty much useless without dildo attached");
        } else {
          // nope
        }
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-1, "Resting on a cheap couch");
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
      shop: ["prude"],
      menu: "@@.head3;Y@@ou examine the sex machine.<br><br><<button 'Use'>><<run aw.homeItems.theCommissar.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.notify("It is pretty much useless without dildo attached");
        } else {
          // nope
        }
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
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-1, "Resting on a really-ugly couch");
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-1, "Resting on a cheap loveseat");
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
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
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
      shop: ["prude"],
      menu: "@@.head3;Y@@ou examine the sex machine.<br><br><<button 'Use'>><<run aw.homeItems.doubleDonger.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.notify("It is pretty much useless without dildo attached");
        } else {
          // nope
        }
      },
    },
    simpleTable: {
      name: "simple table",
      key: "simpleTable",
      image: "IMG-roundTable",
      type: "furniture",
      tags : ["table"],
      desc: "A simple circular kitchen table covered in a faux wood laminate.",
      mult: true,
      quality: 1,
      cost: 100,
      fragile: 5,
      button: "Eat a Meal",
      info: "This table allows you to trigger eating a meal, if you wish to eat with an NPC in your home. (normally meals are automatic) [30min]",
      notRoom: ["foyer", "bath", "bedroom", "balcony"],
      shop: ["bullseye"],
      menu: "You tried to invite @@.ident;Asa@@ to sit and eat with you, but then you realized that @@.mono;Asa@@ is your imaginary friend-cum-tulpa you created during a bad acid trip. You sit down at the table and sob before eventually eating alone. At least the OctoChicken was delicious.",
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    logTable: {
      name: "log table",
      key: "logTable",
      image: "IMG-HomeItem-logTable",
      type: "furniture",
      tags : ["table"],
      desc: "A big round table made of single slice of wood",
      mult: true,
      quality: 4,
      cost: 350,
      fragile: 1,
      button: "Eat a Meal",
      info: "This table allows you to trigger eating a meal, if you wish to eat with an NPC in your home. (normally meals are automatic) [30min]",
      notRoom: ["foyer", "bath", "bedroom", "balcony"],
      shop: ["bullseye"],
      menu: "You tried to invite @@.ident;Asa@@ to sit and eat with you, but then you realized that @@.mono;Asa@@ is your imaginary friend-cum-tulpa you created during a bad acid trip. You sit down at the table and sob before eventually eating alone. At least the OctoChicken was delicious.",
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    SimpleMaker: {
      name: "Simple Coffee Maker",
      key: "SimpleMaker",
      image: "IMG-HomeItem-SimpleCoffe",
      type: "appliance",
      tags : ["drink"],
      desc: "The simplest way of making coffee. Because the best of life is always the simplest of things.",
      mult: false,
      quality: 1,
      cost: 125,
      fragile: 50,
      button: "Brew Coffee",
      info: "Really? Info on how to use it? Coffee god is angry at you... Pour water and coffee on top of it, and watch as the gods do their magic. (- - fatigue) [10min]",
      notRoom: ["balcony", "foyer"],
      shop: ["bullseyeElectronics"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        if (ↂ.flag.coffeeToday > 2) {
          setup.time.add(10);
          setup.refresh();
          setup.notify("You make the gods nectar.");
        } else {
          setup.time.add(10);
          setup.status.tired(-1, "Drinking delicious coffee");
          setup.refresh();
          setup.notify("By the love of god, COFFEEEEEE...");
        }
        ↂ.flag.coffeeToday += 1;
      },
    },
    ClassicItalianMaker: {
      name: "Italian Coffee Maker",
      key: "ClassicItalianMaker",
      image: "IMG-HomeItem-ClassiCoffe",
      type: "appliance",
      tags : ["drink"],
      desc: "A classic. Despite its simple way of making coffee, it offers some of the best manually-made coffee. IMPORTANT: Requires a stove.",
      mult: false,
      quality: 2,
      cost: 200,
      fragile: false,
      button: "Brew Coffee",
      info: "Put water inside of it and gently and throw it on top of the cooker. After that, proceed to pray to the coffee god for the best coffee. (- -fatigue) [5min]",
      notRoom: ["balcony", "foyer"],
      shop: ["bullseyeElectronics"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        if (ↂ.flag.coffeeToday > 2) {
          setup.time.add(5);
          setup.refresh();
          setup.notify("You make the gods nectar.");
        } else {
          setup.time.add(5);
          setup.status.tired(-1, "Drinking delicious coffee");
          setup.refresh();
          setup.notify("By the love of god, COFFEEEEEE...");
        }
        ↂ.flag.coffeeToday += 1;
      },
    },
    SimplePlainBed: {
      name: "Simple Bed",
      key: "SimplePlainBed",
      image: "IMG-HomeItem-SimpleBed3",
      type: "furniture",
      tags : ["bed"],
      desc: "It's a essential item for those that want to sleep, and only so. Has a simple and plain look. No need for beauty when you're training to die.",
      mult: true,
      quality: 2,
      cost: 250,
      fragile: false,
      button: "Lay Down",
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.KingBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.KingBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    ModernBed: {
      name: "Modern Bed",
      key: "ModernBed",
      image: "IMG-HomeItem-ModernBed",
      type: "furniture",
      tags : ["bed"],
      desc: "It's a single bed that combines a modern look with comfortableness. ",
      mult: true,
      quality: 3,
      cost: 450,
      fragile: false,
      button: "Lay Down",
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.KingBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.KingBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    ComfortableBed: {
      name: "Comfortable Bed",
      key: "ComfortableBed",
      image: "IMG-HomeItem-ComfortableBed",
      type: "furniture",
      tags : ["bed"],
      desc: "Its single focus is being comfortable. This bed is ideal for those who don't care about sleep, but LOVE to sleep. ",
      mult: true,
      quality: 4,
      cost: 600,
      fragile: false,
      button: "Lay Down",
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["bullseye", "fitta"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.KingBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.KingBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    HighTechBed: {
      name: "High-Tech Bed",
      key: "HighTechBed",
      image: "IMG-HomeItem-HighTechBed",
      type: "furniture",
      tags : ["bed"],
      desc: "This bed combines all the techniques learned over the course of human history about sleeping, with extremely high technology, mostly experimental. It vibrates continuously while its being used and has a relaxing music that makes anyone sleeping on it never want to wake up again.",
      mult: true,
      quality: 5,
      cost: 5000,
      fragile: false,
      button: "Lay Down",
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom", "foyer"],
      shop: ["fitta"],
      menu: "@@.head3;Y@@our bed is waiting for you to lay down and enter the world of dreams.<br><br><<button 'Sleep'>><<run aw.homeItems.HighTechBed.action(1)>><<run Dialog.close()>><</button>><<tab>><<button 'Take Nap'>><<run aw.homeItems.HighTechBed.action(2)>><<run Dialog.close()>><</button>><<tab>><<button 'Cancel'>><<run Dialog.close()>><</button>>",
      effect() {
        // nope
      },
      action(nn) {
        if (nn === 1) {
          setup.sleep.go();
        } else {
          setup.sleep.startNap();
        }
      },
    },
    oldChair: {
      name: "Old Table Chair",
      key: "oldChair",
      image: "IMG-HomeItem-OldChair",
      type: "furniture",
      tags : ["chair"],
      desc: "Isn't the most comfortable chair in the world, but it's cheap",
      mult: true,
      quality: 1,
      cost: 50,
      fragile: 3,
      button: "Sit on the old chair",
      info: "Sit down (-stress) [35min]",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-2, "Sitting in an old chair");
        setup.time.add(35);
        setup.refresh();
        if (this.breaks()) {
          this.remove();
        }
        setup.notify("You sat around on the old chair for 35 minutes.");
      },
    },
    luxuryChair: {
      name: "Luxury Chair",
      key: "luxuryChair",
      image: "IMG-HomeItem-LuxuryChair",
      type: "furniture",
      tags : ["chair"],
      desc: "Not only its extremely comfortable, it will also make you feel like a Queen.",
      mult: true,
      quality: 4,
      cost: 600,
      fragile: 3,
      button: "Pretend to be a Queen",
      info: "Be a Queen (-stress) [25min]",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-5, "Relaxing in your luxury chair");
        setup.time.add(25);
        setup.refresh();
        if (this.breaks()) {
          this.remove();
        }
        setup.notify("You felt like a Queen for 25 minutes.");
      },
    },
    comfortableChair: {
      name: "Comfortable Chair",
      key: "comfortableChair",
      image: "IMG-HomeItem-ComfortableChair",
      type: "furniture",
      tags : ["chair"],
      desc: "Not too beautiful neither too ugly. The perfect chair for those who wish to simply be comfortable. It's also not so expensive.",
      mult: true,
      quality: 3,
      cost: 100,
      fragile: 3,
      button: "Sit down",
      info: "Sit down in the chair (-stress) [30min]",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.stress(-4, "Relaxing in your comfortable chair");
        setup.time.add(30);
        setup.refresh();
        if (this.breaks()) {
          this.remove();
        }
        setup.notify("You sat around on the chair for 30 minutes.");
      },
    },
    bigSimpleTable: {
      name: "big simple table",
      key: "bigSimpleTable",
      image: "IMG-bigTable",
      type: "furniture",
      tags : ["table"],
      desc: "A very big table, meant for those who have a lot of friends or a very big family! Has space for at least 10 chairs.",
      mult: true,
      quality: 3,
      cost: 1000,
      fragile: 5,
      button: "Eat a Meal",
      info: "This table will let you eat with a friend or multiple friends. Or maybe do something else on it. (normally meals are automatic) [30min]",
      notRoom: ["foyer", "bath", "bedroom", "balcony"],
      shop: ["bullseye"],
      menu: "You tried to invite @@.ident;Asa@@ to sit and eat with you, but then you realized that @@.mono;Asa@@ is your imaginary friend-cum-tulpa you created during a bad acid trip. You sit down at the table and sob before eventually eating alone. At least the OctoChicken was delicious.",
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    oldNightstand: {
      name: "old nightstands",
      key: "oldNightstand",
      image: "IMG-HomeItem-OldNightstands",
      type: "furniture",
      tags : ["storage"],
      desc: "A very old and damaged nightstand. It still works, but it kinda stinks and will NOT survive much longer. It's cheap, though.",
      mult: true,
      quality: 1,
      cost: 50,
      fragile: 10,
      button: false,
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    modernNightstand: {
      name: "modern nightstands",
      key: "modernNightstand",
      image: "IMG-HomeItem-ModernNightstands",
      type: "furniture",
      tags : ["storage"],
      desc: "It has a modern style and boasts a very high quality with experimental materials that are almost indestructible. How they managed to use that material to make the nightstand is a mistery.",
      mult: true,
      quality: 5,
      cost: 500,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    vintageNightstand: {
      name: "vintage nightstands",
      key: "vintageNightstand",
      image: "IMG-HomeItem-VintageNightstand",
      type: "furniture",
      tags : ["storage"],
      desc: "The good-looking ol-styled nightstand which exudes vintage vibe all across the room.",
      mult: true,
      quality: 4,
      cost: 420,
      fragile: false,
      button: false,
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    normalNightstand: {
      name: "normal nightstands",
      key: "normalNightstand",
      image: "IMG-HomeItem-normalNightstands",
      type: "furniture",
      tags : ["storage"],
      desc: "A very plain nighstand. Doesnt boast any features besides being quite hardy.",
      mult: true,
      quality: 3,
      cost: 200,
      fragile: 500,
      button: false,
      info: "",
      notRoom: ["balcony", "kitchen", "bathroom"],
      shop: ["bullseye", "fitta"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        // nothing
      },
    },
    homeScales: {
      name: "scales",
      key: "homeScales",
      image: "IMG-HomeItem-homeScales",
      type: "electronic",
      tags : ["none"],
      desc: "Advanced electronic scales for checking and controlling your weight.",
      mult: true,
      quality: 1,
      cost: 150,
      fragile: 500,
      button: "Scales",
      info: "",
      notRoom: ["balcony", "bathroom"],
      shop: ["bullseyeElectronics"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.time.add(4);
        setup.dialog("Scales", `<<if ↂ.pc.status.nutrition.realWeight == 0>><<run setup.weightCalc()>><</if>><center>[img[IMG-ScaleUse]]</center><br>@@.head3;Y@@ou undress and step on the scales. After a second or so it turns on and you feets become tingly from electrical impulses when scales estimate your body fat. It takes another second of waiting until the small screen shows the information with a quiet beep.
        <<timed 100ms>>
        <br><br>@@.yellowgreen;Weight:@@ <<= ↂ.pc.status.nutrition.realWeight>>
        @@.yellowgreen;BMI:@@ <<print setup.valToBMI(ↂ.pc.status.nutrition.realWeight)>>
        @@.yellowgreen;Recent metabolic rate:@@ <<print setup.isGain()>><</timed>>`);
      },
    },
    cheapBrewery: {
      name: `Cheap brewing machine`,
      key: "cheapBrewery",
      image: "IMG-HomeItem-cheapBrewery",
      type: "electronic",
      tags : ["drink"],
      desc: `"Meth-a-nol" home brewing station, the affordable solution for making your own moonshine. Quality may vary.`,
      mult: false,
      quality: 0,
      cost: 220,
      fragile: 7,
      button: "Brew moonshine",
      info: "Try to distilate some moonshine. (+moonshine) [60min]",
      notRoom: ["balcony", "foyer"],
      shop: ["bullseyeElectronics"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.time.add(random(55, 65));
        const rand = random(0, 10);
        if (rand < 6) {
          setup.consumables.add("moonshine1");
        } else if (rand < 9) {
          setup.consumables.add("moonshine2");
        } else {
          setup.consumables.add("moonshine3");
        }
        setup.notify("You manage to make a little bottle of the moonshine.<<updatebar>>");
      },
    },
    owoBrewery: {
      name: `OwOBrew brewing machine`,
      key: "owoBrewery",
      image: "IMG-HomeItem-owoBrewery",
      type: "electronic",
      tags : ["drink"],
      desc: `"OwOBrew" home brewing station, the best option for semi-professional distillation. Fully auto control system allows to reduce brewing time and increase moonshine quality.`,
      mult: false,
      quality: 2,
      cost: 400,
      fragile: 1,
      button: "Brew moonshine",
      info: "Distilate some moonshine. (+moonshine) [30min]",
      notRoom: ["balcony", "foyer"],
      shop: ["bullseyeElectronics"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.time.add(random(25, 35));
        const rand = random(0, 10);
        if (rand < 2) {
          setup.consumables.add("moonshine1");
        } else if (rand < 5) {
          setup.consumables.add("moonshine2");
        } else {
          setup.consumables.add("moonshine3");
        }
        setup.notify("You manage to make a little bottle of the moonshine.<<updatebar>>");
      },
    },
    exerciseBike: {
      name: `exercise bike`,
      key: "exerciseBike",
      image: "IMG-HomeItem-homeTraining1",
      type: "electronic",
      tags : ["none"],
      desc: `Advanced home exercise bike for cardio training. Functions include heart rate and oxigenation monitor, various speed presets and an advanced seat system with a pin "for better stability".`,
      mult: false,
      quality: 4,
      cost: 235,
      fragile: 1,
      button: "Workout",
      info: "Workout on the bike. (-energy, +exercise) [30min]",
      notRoom: ["foyer"],
      shop: ["bullseyeElectronics"],
      menu: false,
      effect() {
        // nothing
      },
      action() {
        setup.status.arousal(2);
        setup.time.add(random(25, 35));
        ↂ.pc.status.exercise += (Math.round(ↂ.skill.athletic / 6) + random(1, 5));
        ↂ.pc.status.energy.amt -= random(2, 4);
        aw.S();
        setup.SCXfunc();
        setup.SCfunc("AT", 10);
        setup.dialog("Bike", `<img data-passage="IMG-bikeHome" style="float: left; margin:10px 25px 10px 0px;"><p>@@.head3;A@@fter some tossing you manage to seat on the bike. This requires you to fit this so-called "pin" inside your vagina and it takes you some time to find a comfortable position. You start turning the pedals exercising on the exercise bike. The seat pin get you aroused and you find it pretty hard to concentrate on exercising with this cock-shaped "stability pin" sliding back and forth in your pussy.</p><p>@@.mono;What they ever thought about when created this thing? It is basically a dildo. And how guys are supposed to use it... ah, right, I got it... Mmm, in any case this feels pretty nice... and I must admit it holds me on the seat pretty good.@@</p><p>After about 30 minutes you feel pretty exhausted and stand up from the bike. The pin comes out of your pussy with a sloppy sound.</p><<updatebar>>`);
      },
    },
  };
  const keys = Object.keys(items);
  const n = keys.length;
  for (let i = 0; i < n; i++) {
    aw.homeItems[items[keys[i]].key] = new HomeItem(items[keys[i]]);
  }
})();

