/*
:  .d8888b.  888                       8888888 888
: d88P  Y88b 888                         888   888
: Y88b.      888                         888   888
:  "Y888b.   88888b.   .d88b.  88888b.   888   888888 .d88b.  88888b.d88b.  .d8888b
:     "Y88b. 888 "88b d88""88b 888 "88b  888   888   d8P  Y8b 888 "888 "88b 88K
:       "888 888  888 888  888 888  888  888   888   88888888 888  888  888 "Y8888b.
: Y88b  d88P 888  888 Y88..88P 888 d88P  888   Y88b. Y8b.     888  888  888      X88
:  "Y8888P"  888  888  "Y88P"  88888P" 8888888  "Y888 "Y8888  888  888  888  88888P'
:                              888
:                              888
:                              888
.
.   PROCESS PURCHASES AND HANDLE THE SHOPPING CART
.
.USEFUL INVENTORY FUNCTIONS:
.  setup.sInv.inv.pickUp(item)
.  setup.consumables.add(key,count)
.MORE IN CONSUME.JS AND INVENTORY.JS
.
. Shopping Cart Array: ["text name","category",credits,"key"]
*/

// NAMESPACE
if (setup.shop === null || setup.shop === undefined) {
  setup.shop = {} as setupShop;
}

// EMPTY THE SHOPPING CART
setup.shop.emptyCart = function(): void {
  State.active.variables.cart = [];
};

// LAUNCH DIALOG W/ CART CONTENTS
setup.shop.viewCartShop = function(): void {
  const cart = State.active.variables.cart;
  let output = "<h3>Shopping Cart</h3><div style='width:800px;height:4px;background-color:#ddf;border-radius:2px;'></div><table id='invisTable' class='monospace'>";
  for (let i = 0, c = cart.length; i < c; i++) {
    output += `<tr><td><b>${cart[i][0]}</b></td><td class="money">₢${cart[i][2]}</td><td id="button${i}"><<button "DELETE">><<run setup.shop.deleteCartItem("${cart[i][0]}")>><<replace "#button${i}">>DELETED<</replace>><<replace "#cartTotal">><<include [[ClothesShoppingCartTotal]]>><</replace>><<replace "#cumTotal">><<print setup.shop.cartTotal()>><</replace>><</button>></td></tr>`;
  }
  output += '</table><span id="cumTotal" class="bigmoney"><<print setup.shop.cartTotal()>></span><<tab>><<button "DELETE ENTIRE CART">><<run setup.shop.emptyCart()>><<replace "#cartTotal">><<include [[ClothesShoppingCartTotal]]>><</replace>><<run Dialog.close()>><</button>><br>';
  setup.dialog("Shopping Cart", output);
};

// view cart generic
setup.shop.viewCart = function(): void {
  const cart = State.active.variables.cart;
  let output = "<h3>Shopping Cart</h3><div style='width:800px;height:4px;background-color:#ddf;border-radius:2px;'></div><table id='invisTable' class='monospace'>";
  for (let i = 0, c = cart.length; i < c; i++) {
    output += `<tr><td><b>${cart[i][0]}</b></td><td class="money">₢${cart[i][2]}</td><td id="button${i}"><<button "DELETE">><<run setup.shop.deleteCartItem("${cart[i][0]}")>><<replace "#button${i}">>DELETED<</replace>><<replace "#cumTotal">><<print setup.shop.cartTotal()>><</replace>><</button>></td></tr>`;
  }
  output += '</table><span id="cumTotal" class="bigmoney"><<print setup.shop.cartTotal()>></span><<tab>><<button "DELETE ENTIRE CART">><<run setup.shop.emptyCart()>><<replace "#cumTotal">><<print setup.shop.cartTotal()>><</replace>><<run Dialog.close()>><</button>><br>';
  setup.dialog("Shopping Cart", output);
};

// RETURN TOTAL CREDIT COST OF CART CONTENTS
setup.shop.cartTotal = function(): string {
  const cart = State.active.variables.cart;
  let total = 0;
  for (let i = 0, c = cart.length; i < c; i++) {
    total += Number(cart[i][2]);
  }
  total = setup.shop.skillPrice(total);
  return `<span class="bigmoney">₢${total}</span>`;
};
setup.shop.cartTotalNumber = function(): number {
  const cart = State.active.variables.cart;
  let total = 0;
  for (let i = 0, c = cart.length; i < c; i++) {
    total += Number(cart[i][2]);
  }
  total = setup.shop.skillPrice(total);
  return total;
};

// deletes item from shopping cart
setup.shop.deleteCartItem = function(name: string): void {
  const cart = State.active.variables.cart;
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i][0] === name) {
      cart.splice(i, 1);
      return;
    }
  }
};

// PURCHASE ALL ITEMS IN THE CART  returns error message if unable to purchase (low funds, etc)
setup.shop.purchase = function(): "no afford"|"success"|"age"|"already has" {
  const cost = setup.shop.cartTotalNumber();
  const ᛔ = State.active.variables;
  const age = setup.ageCheck.shopCheck();
  const slotsWard = Object.keys(ↂ.ward);
  let slotsCart = [] as string[];
  let nope = false;
  if (State.active.variables.cart.length > 0) {
    for (let index = 0; index < State.active.variables.cart.length; index++) {
     slotsCart.push(State.active.variables.cart[index][3]);
    }
  }
  for (let index = 0; index < slotsWard.length; index++) {
    for (let i = 0; i < slotsCart.length; i++) {
      if (ↂ.ward[slotsWard[index]].includes(slotsCart[i])) {
        nope = true;
      }
    }
  }
  aw.con.info(`${slotsWard}`);
  aw.con.info(`${slotsCart}`);
  aw.L();
  if (ᛔ.AW.cash < cost) {
    return "no afford";
  } else if (!age && ↂ.map.loc[0] !== "bullseye") {
    setup.ageCheck.frump();
    return "age";
  } else if (setup.ageCheck.restrictedItems()) {
    return "age";
  } else if (nope) {
    return "already has";
  } else {
    ᛔ.AW.cash -= cost;
    ↂ.home.finance.goods += cost;
  } 
  setup.shop.process();
  aw.S();
  return "success";
};

// forces purchase to prevent re-checking age.
setup.shop.purchaseOver = function(): void {
  const cost = setup.shop.cartTotalNumber();
  const ᛔ = State.active.variables;
  aw.L();
  ᛔ.AW.cash -= cost;
  ↂ.home.finance.goods += cost;
  setup.shop.process();
  aw.S();
  setup.time.add(3);
  setup.notify("You successfully paid for your items.");
};

// PLACES PURCHASED ITEMS INTO PROPER INVENTORY VARIABLE
setup.shop.process = function(): void {
  const cart = State.active.variables.cart;
  for (let i = 0, c = cart.length; i < c; i++) {
    setup.shop.pushInv(cart[i]);
  }
  State.active.variables.cart = [];
};

// SHORTCUT TO SEARCH CART FOR ITEM AND RETURN COUNT
setup.shop.cartCheck = function(item: string, del: boolean = false): number {
  try {
    return aw.arrayCunt(State.active.variables.cart, item, 0, del);
  } catch (e) {
    aw.con.warn(`Bad cart search - shop.cartCheck - item = ${item}!`);
    return 0;
  }
};

setup.shop.skillPrice = function(amt: number): number {
  const skill = ↂ.skill.shop;
  let mod;
  if (skill > 100) {
    mod = Math.round((skill - 100) / 20) + 10;
    mod /= 100;
    mod = 1 - mod;
  } else {
    mod = Math.round(skill / 10);
    mod /= 100;
    mod = 1 - mod;
  }
  return Math.round(amt * mod);
};

setup.shop.pushInv = function(item: string): void {
  if (!Array.isArray(item)) {
    setup.alert(`Damn... it seems a non-array item (${item}) was sent to the shop.pushInv function...`);
    return;
  }
  const ᛔ = State.active.variables;
  const name = item[0];
  const cat = item[1];
  const key = item[3];
  const invItem = (key) ? key : name;
  const inv = State.active.variables.items;
  switch (cat) {
    case "consume":
      if (item[4] != null && item[4] !== undefined && "number" === typeof item[4]) {
        setup.consumables.add(key, item[4]);
      } else {
        setup.consumables.add(key);
      }
      break;
    case "simple":
      inv.pickUp(invItem);
      break;
    case "home":
      ↂ.home.item.owned.push(key);
      break;
    case "jew":
      ↂ.pc.jewel.owned.push(key);
      break;
    case "panties":
    case "bra":
    case "leg":
    case "bottom":
    case "top":
    case "dress":
    case "coat":
    case "acc":
    case "bag":
    case "shoes":
    case "athU":
    case "athL":
    case "swimU":
    case "swimL":
    case "niteU":
    case "niteL":
    case "shoes":
      ↂ.ward[cat].push(key);
      break;
    default:
      UI.alert(`Hello, ThaumX here with some bad news. It seems that one of the items (${name}) you tried to purchase wasn't properly categorized, so the inventory system doesn't know where to put it. Also, the store has a shitty return policy, so they won't refund your ₢${item[2]} even though their product is obviously shit... Please let me know this happened! [item key: ${key}, name: ${name}, price: ${item[2]}, category: ${cat}]`);
  }
  return;
};


