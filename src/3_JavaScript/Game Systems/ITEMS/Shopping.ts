/************************************************************************
|  .d8888b.  888                                 d8b                    |
| d88P  Y88b 888                                 Y8P                    |
| Y88b.      888                                                        |
|  "Y888b.   88888b.   .d88b.  88888b.  88888b.  888 88888b.   .d88b.   |
|     "Y88b. 888 "88b d88""88b 888 "88b 888 "88b 888 888 "88b d88P"88b  |
|       "888 888  888 888  888 888  888 888  888 888 888  888 888  888  |
| Y88b  d88P 888  888 Y88..88P 888 d88P 888 d88P 888 888  888 Y88b 888  |
|  "Y8888P"  888  888  "Y88P"  88888P"  88888P"  888 888  888  "Y88888  |
|                              888      888                        888  |
|                              888      888                   Y8b d88P  |
|                              888      888                    "Y88P"   |
************************************************************************/
// Passage Header Container: div id="shoppingContainer"
// setup.clothes.shopList(store,category)

interface setupShop {
  emptyCart: () => void;
  viewCartShop: () => void;
  viewCart: () => void;
  cartTotal: () => string;
  cartTotalNumber: () => number;
  deleteCartItem: (name: string) => void;
  purchase: () => "no afford" | "success" | "age";
  purchaseOver: () => void;
  process: () => void;
  cartCheck: (item: string, del?: boolean) => number;
  skillPrice: (amt: number) => number;
  pushInv: (item: string) => void;
  launch: {
    clothes: (store: string, category: clothingCategory) => void;
  };
  sortButtons: (arrayVarString: string, cuntID: string, twinePrinter: string) => string;
  shopBanner: (shop: string) => string;
  storeImages: object;
  storeName: object;
  storeText: object;
}



// Namespace
if (setup.shop === null || setup.shop === undefined) {
  setup.shop = {} as setupShop;
}

setup.shop.launch = {
  // launches a clothes shopping interface for store in clothing category
  clothes(store: string, category: clothingCategory): void {
    // launch a display into the passage element ₢
    State.temporary.shop = {
      name: store,
      slot: category,
      array: `setup.shopInv.${store}.${category}`,
    };
    aw.replace("#shoppingContainer", "<<include [[ClothesShoppingDisplay]]>>");
  },
};

// creates the clothing store sort buttons
setup.shop.sortButtons = function(arrayVarString: string, cuntID: string, twinePrinter: string): string {
  // sort the clothing with buttons
  if (arrayVarString.slice(0, 1) !== "ↂ" && arrayVarString.slice(0, 1) !== "$" && arrayVarString.slice(0, 1) !== "_" && arrayVarString.slice(0, 13) !== "setup.shopInv") {
    // return setup.eMsg("Error creating sort buttons: Twine variable missing its sigil.");
    aw.con.info(`arrayVarString arg is: ${arrayVarString}`);
  }
  let output = `<div class="ShopSortButtons blackOutline"><h3>SORT ITEMS</h3><table id="invisTable" style="display:inline-block;background-color:rgba(0,0,0,0.5);width:255px;border-radius:5px;">`;
  const list = ["atr", "sexy", "formal", "exposure", "price"];
  const label = ["ATR", "SEXY", "FORMAL", "EXPOSE", "PRICE"];
  for (let i = 0, c = list.length; i < c; i++) {
    output += `<tr><td><<button "🡱">><<run setup.clothes.sort(${arrayVarString},"${list[i]}",true)>> <<replace "${cuntID}">>${twinePrinter}<</replace>> <</button>></td><td>${label[i]}</td><td><<button "🡳">> <<run setup.clothes.sort(${arrayVarString},"${list[i]}",false)>><<replace ${cuntID}>>${twinePrinter}<</replace>><</button>></td></tr>`;
  }
  output += "</table></div>";
  return output;
};

// prints the banner image for a store display
setup.shop.shopBanner = function(shop: string): string {
  return `<div class="shopBanner"><img data-passage="IMG_ClothingStoreBackground" style="z-index:301"><img data-passage="${setup.shop.storeImages[shop]}" style="z-index:302;left:300px;width:400px;border-radius:4px"></div>`;
};

setup.shop.storeImages = {
  Bullseye: "IMG-ClothingBrand-Bullseye",
  UniHoe: "IMG-ClothingBrand-UniHoe",
  CazzoFottere: "IMG-ClothingBrand-CazzoFottere",
  Cucci: "IMG-ClothingBrand-Cucci",
  ThighGap: "IMG-ClothingBrand-ThighGap",
  VaginaSecrets: "IMG-ClothingBrand-VaginaSecrets",
  TightThreads: "IMG-ClothBrand-TT",
  thotTopic : "IMG-ClothingBrand-ThotTopic",
  BallSack : "IMG-ClothingBrand-BallSack",
  Shoegasm : "IMG-ClothBrand-Shoegasm",
};

setup.shop.storeName = {
  Bullseye: "Bullseye",
  UniHoe: "Uni-Hoe",
  CazzoFottere: "Cazzo & Fottere",
  Cucci: "Cucci",
  ThighGap: "Thigh GAP",
  VaginaSecrets: "Vagina Secrets",
  TightThreads: "Tight Threads (TT)",
  thotTopic: "THOT TOPIC",
  BallSack: "Ball Sack Sports",
  Shoegasm: "Shoegasm",
};

setup.shop.storeText = {
  Bullseye: "Because no big-box-store would be complete without a clothing department, Bullseye offers a wide selection of generic low-quality clothing. It won't look that great while it lasts, but it's inexpensive.<br>Typically sells more conservative clothing that tends to be cute rather than sexy.",
  UniHoe: "A Nipponese clothing brand that specializes in quality without worrying about the latest trends. This saves the consumer the expense of seasonal redesigns.<br>Typically sells more conservative clothing that tends to be cute rather than sexy.",
  CazzoFottere: "It doesn't make much sense, and you certainly wouldn't want to translate the name, but you can get the latest fashions for less from C&F. Just don't expect them to last past the season.<br>Typically sells more the latest fashions, which are usually revealing. Tends to focus on sexier styles.",
  Cucci: "While people have been laughing at the 'coochie' name for decades, the brand has managed to last, mostly thanks to high prices maintaining Cucci's exclusive mystique.<br>A trend-setter in the retail fashion world, Cucci helps make the latest fashions. When the designers at Cucci can't come up with something unique, that usually means making something more revealing.",
  ThighGap: "A brand that fell victim to it's own success, Thigh GAP's success and rapid growth lead to the brand becoming bland and ubiquitous. While certainly not high-fashion, you can put together a decent look without going bankrupt.<br>Typically carries a rather generic spectrum of styles and colors.",
  VaginaSecrets: "Surviving protests by fundamentalists, feminists, and fundamentalist feminists, the media attention only helped to keep this lingerie brand a fixture in malls across the country.<br>You won't find anything cute here, but you may just find something to help boost your confidence as a woman.",
  TightThreads: "A unique clothing store from the modern age of on-demand manufacturing and 3d printing, Tight Threads doesn't design its own clothing. Instead, they accept designs from customers and prepare it while the customer waits using automatic sewing machines. The custom items are expensive, but match your unique style!",
  thotTopic: "The go-to spot when shopping for the sunlight-challenged. The quality isn't great, but that allows for rip-it-yourself style and the liberal use of safety pins. The word \"THOT\" in the title was originally an ironic spelling of the word \"thought\", and not actually related to the acronym for That Ho Over There.",
  BallSack: "A european brand focused on activewear, Ball Sack has had a love-hate relationship with the name's connotations in english. Otherwise, it's a fairly middle-of-the-road retailer in terms of price and quality, though it does stock specialty sports gear that is hard to find elsewhere.",
  Shoegasm: "The store dedicated to everything you would wear on your feet, starting from ridiculously high heels to everyday comfortable flats. The selection is splendid but quality can be quite different regarding various manufacturers supplying the shop.",
};
