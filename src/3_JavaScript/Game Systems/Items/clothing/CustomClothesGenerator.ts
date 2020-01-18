// ██████╗ ██████╗ ██████╗
// ██╔════╝██╔════╝██╔════╝
// ██║     ██║     ██║  ███╗
// ██║     ██║     ██║   ██║
// ╚██████╗╚██████╗╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═════╝

interface clothesCreator {
  create: () => string;
  images: () => twee;
  download: (item?: string) => void;
  upload: (item: string) => void;
  temporary: {item: any};
  backup: {item: any};
}

// Namespace
if (setup.clothesCreator == null) {
  setup.clothesCreator = {} as clothesCreator;
}

setup.clothesCreator.create = function(): string {
  setup.clothesCreator.temporary.item.slot = State.active.variables.customSlot;
  setup.clothesCreator.temporary.item.type = State.active.variables.customType;
  setup.clothesCreator.temporary.item.color = State.active.variables.customColor;
  setup.clothesCreator.temporary.item.sexy = State.active.variables.customSexy;
  setup.clothesCreator.temporary.item.formal = State.active.variables.customFormal;
  setup.clothesCreator.temporary.item.exposure = State.active.variables.customExposure;
  setup.clothesCreator.temporary.item.swimwear = State.active.variables.customSwimwear;
  setup.clothesCreator.temporary.item.nightwear = State.active.variables.customNightwear;
  setup.clothesCreator.temporary.item.athletic = State.active.variables.customAthletic;
  setup.clothesCreator.temporary.item.kinky = State.active.variables.customKinky;
  setup.clothesCreator.temporary.item.accessNip = State.active.variables.customAccessNip;
  setup.clothesCreator.temporary.item.accessPussy = State.active.variables.customAccessPussy;
  setup.clothesCreator.temporary.item.accessButt = State.active.variables.customAccessButt;
  setup.clothesCreator.temporary.item.accessTits = State.active.variables.customAccessTits;
  setup.clothesCreator.temporary.item.accessAss = State.active.variables.customAccessAss;
  setup.clothesCreator.temporary.item.styleWord = State.active.variables.customStyleWord;
  setup.clothesCreator.temporary.item.subStyleWord = State.active.variables.customSubStyleWord;
  setup.clothesCreator.temporary.item.tertiaryWord = State.active.variables.customTertiaryWord;
  setup.clothesCreator.temporary.item.fabricWord = State.active.variables.customFabricWord;
  setup.clothesCreator.temporary.item.atr = State.active.variables.customAtr;
  setup.clothesCreator.temporary.item.img = State.active.variables.customImage;
  setup.clothesCreator.temporary.item.padoImg = State.active.variables.customPadoImg;
  if (typeof setup.clothesCreator.temporary.item.atr !== "string") {
    return "Attractiveness is not a number!"
  }
  if (setup.clothesCreator.temporary.item.atr < 0 || setup.clothesCreator.temporary.item.atr > 30) {
    return "Attractiveness is out of bounds!"
  }
  if (setup.clothesCreator.temporary.item.slot === "overwear" || setup.clothesCreator.temporary.item.slot === "shoes") {
    setup.clothesCreator.temporary.item.swimwear = false;
    setup.clothesCreator.temporary.item.nightwear = false;
  }
  // seems okay, let's do it!
  setup.clothesCreator.temporary.item.price = (setup.clothesCreator.temporary.item.atr * 10) + 150 + random(40, 70);
  setup.clothesCreator.temporary.item.colorWord = setup.clothes.colorWord(setup.clothesCreator.temporary.item.color);
  setup.clothesCreator.temporary.item.key = setup.clothes.keyGen();
  aw.conLoad.clothes(setup.clothesCreator.temporary);
  aw.clothes[setup.clothesCreator.temporary.item.key] = setup.clothesCreator.temporary.item;
  aw.clothes[setup.clothesCreator.temporary.item.key] = new Garment(setup.clothesCreator.temporary.item);
  aw.S();
  return `Item was created successfully! You can purchase is now in the shop.<br><center><<button "Download mod">><<replace "#creatorSpan">><<print setup.clothesCreator.download()>><</replace>><</button>></center>`;
};

setup.clothesCreator.download = function(item?: string): string {
  let dummy = `{
    "clothes": {
      "${setup.clothesCreator.temporary.item.key}":
    ${JSON.stringify(setup.clothesCreator.temporary.item)}
		}}`;
  let type = 'data:application/octet-stream;base64, ';
  let text = dummy;
  let base = btoa(text);
  let res = type + base;
  return `<a download="${setup.clothesCreator.temporary.item.styleWord}-mod.awm" id="dl" href="${res}">DOWNLOAD MOD</a>`;
};

setup.clothesCreator.upload = function(item: string): void {
  try {
  aw.con.info(`${item}`);
  let object = JSON.parse(item);
  if (object.clothes !== null) {
    if (Object.keys(object.clothes).length === 1) {
      let prepObject = {};
      const newKey = setup.clothes.keyGen(); // just in case;
      prepObject[newKey] = object.clothes[Object.keys(object.clothes)[0]];
      prepObject[newKey].key = newKey;
      aw.conLoad.clothes(prepObject);
      aw.clothes[newKey] = prepObject[newKey];
      aw.clothes[newKey] = new Garment(prepObject[newKey]);
      aw.S();
      alert("Mod successfully loaded!");
    } else {
      aw.con.warn(`setup.clothesCreator.upload found that supplied mod is not a single clothes item mod!`);
      alert("Mod is not a single clothes item mod!");
    }
    
  } else {
    aw.con.warn(`setup.clothesCreator.upload found that supplied mod is damaged or not single clothes item mod!`);
    alert("Mod is damaged or not single clothes item mod!");
  }
  } catch (e) {
    aw.con.warn(`setup.clothesCreator.upload died with error: ${e.name}: ${e.message}.`);
    alert(`Setup.clothesCreator.upload died with error: ${e.name}: ${e.message}.`);
  }
};



setup.clothesCreator.images = function(): twee {
  let list = [
    "IMG-BestyCorset",
    "IMG-BestySweater",
    "IMG-bra-1",
    "IMG-bra-10",
    "IMG-bra-11",
    "IMG-bra-2",
    "IMG-bra-3",
    "IMG-bra-4",
    "IMG-bra-5",
    "IMG-bra-7",
    "IMG-bra-8",
    "IMG-bra-9",
    "IMG-CI-BandageOnepiece",
    "IMG-CI-BandeauTop",
    "IMG-CI-BikiniBottom",
    "IMG-CI-Boyshorts",
    "IMG-CI-CheekyBottom",
    "IMG-CI-ExtremeNanoBikiniTop",
    "IMG-CI-FlounceTop",
    "IMG-CI-HalterTop",
    "IMG-CI-HighWaist",
    "IMG-CI-HipsterBottom",
    "IMG-CI-MicroBikiniTop",
    "IMG-CI-NanoBikiniTop",
    "IMG-CI-NanoGstring",
    "IMG-CI-OnepieceAthletic",
    "IMG-CI-OnepiecePlunge",
    "IMG-CI-OpenBottom",
    "IMG-CI-OpenCupBikini",
    "IMG-CI-SlingSwim",
    "IMG-CI-StraplessTop",
    "IMG-CI-StraplessTop2",
    "IMG-CI-SwimHighLeg",
    "IMG-CI-SwimOnepiece",
    "IMG-CI-SwimSkirt",
    "IMG-CI-TankiniTop",
    "IMG-CI-TriangleTop",
    "IMG-CI-Vbottom",
    "IMG-CID-Gothic",
    "IMG-CID-Maid",
    "IMG-CIO-Armor",
    "IMG-CIO-leya_top",
    "IMG-CIO-leya_top_2",
    "IMG-CIOW-Cardigan",
    "IMG-CIOW-FancyCoat",
    "IMG-CIOW-Hoodie",
    "IMG-CIOW-Jacket",
    "IMG-CIOW-longCoat",
    "IMG-CIOW-PleatedCoat",
    "IMG-CIOW-Pullover",
    "IMG-panties-1",
    "IMG-panties-10",
    "IMG-panties-12",
    "IMG-panties-13",
    "IMG-panties-14",
    "IMG-panties-15",
    "IMG-panties-16",
    "IMG-panties-17",
    "IMG-panties-18",
    "IMG-panties-19",
    "IMG-panties-2",
    "IMG-panties-3",
    "IMG-panties-4",
    "IMG-panties-5",
    "IMG-panties-6",
    "IMG-panties-7",
    "IMG-panties-8",
    "IMG-panties-9",
    "IMG-shorts-1",
    "IMG-shorts-2",
    "IMG-stocking-1",
    "IMG-stocking-2",
    "IMG-stocking-3",
    "IMG-stocking-4",
    "IMG-stocking-5",
    "IMG-stocking-6",
    "IMGnotavailable",
    "IMG_bikini1",
    "IMG_dress_1",
    "IMG_dress_10",
    "IMG_dress_11",
    "IMG_dress_12",
    "IMG_dress_13",
    "IMG_dress_14",
    "IMG_dress_14B",
    "IMG_dress_15",
    "IMG_dress_16",
    "IMG_dress_17",
    "IMG_dress_18",
    "IMG_dress_19",
    "IMG_dress_2",
    "IMG_dress_20",
    "IMG_dress_20B",
    "IMG_dress_21",
    "IMG_dress_22",
    "IMG_dress_22B",
    "IMG_dress_23",
    "IMG_dress_24",
    "IMG_dress_25",
    "IMG_dress_26",
    "IMG_dress_27",
    "IMG_dress_28",
    "IMG_dress_28B",
    "IMG_dress_29",
    "IMG_dress_3",
    "IMG_dress_30",
    "IMG_dress_31",
    "IMG_dress_32",
    "IMG_dress_33",
    "IMG_dress_34",
    "IMG_dress_35",
    "IMG_dress_4",
    "IMG_dress_5",
    "IMG_dress_6",
    "IMG_dress_7",
    "IMG_dress_8",
    "IMG_dress_9",
    "IMG_leggings1",
    "IMG_leggings2",
    "IMG_pants1",
    "IMG_pants2",
    "IMG_pants3",
    "IMG_pants4",
    "IMG_pants5",
    "IMG_pants6",
    "IMG_pants7",
    "IMG_Shirt_1",
    "IMG_Shirt_10",
    "IMG_Shirt_11",
    "IMG_Shirt_12",
    "IMG_Shirt_12B",
    "IMG_Shirt_13",
    "IMG_Shirt_14",
    "IMG_Shirt_15",
    "IMG_Shirt_16",
    "IMG_Shirt_17",
    "IMG_Shirt_18",
    "IMG_Shirt_18B",
    "IMG_Shirt_19",
    "IMG_Shirt_2",
    "IMG_Shirt_20",
    "IMG_Shirt_21",
    "IMG_Shirt_22",
    "IMG_Shirt_23",
    "IMG_Shirt_24",
    "IMG_Shirt_25",
    "IMG_Shirt_26",
    "IMG_Shirt_27",
    "IMG_Shirt_27B",
    "IMG_Shirt_27C",
    "IMG_Shirt_27D",
    "IMG_Shirt_27E",
    "IMG_Shirt_2B",
    "IMG_Shirt_2C",
    "IMG_Shirt_3",
    "IMG_Shirt_30",
    "IMG_Shirt_31",
    "IMG_Shirt_32",
    "IMG_Shirt_33",
    "IMG_Shirt_34",
    "IMG_Shirt_35",
    "IMG_Shirt_36",
    "IMG_Shirt_37",
    "IMG_Shirt_38",
    "IMG_Shirt_4",
    "IMG_Shirt_4B",
    "IMG_Shirt_5",
    "IMG_Shirt_5B",
    "IMG_Shirt_6",
    "IMG_Shirt_6B",
    "IMG_Shirt_7",
    "IMG_Shirt_7B",
    "IMG_Shirt_8",
    "IMG_Shirt_9",
    "IMG_shorts1",
    "IMG_shorts2",
    "IMG_shorts3",
    "IMG_shorts4",
    "IMG_shorts5",
    "IMG_skirt1",
    "IMG_skirt10",
    "IMG_skirt11",
    "IMG_skirt12",
    "IMG_skirt13",
    "IMG_skirt14",
    "IMG_skirt14B",
    "IMG_skirt15",
    "IMG_skirt16",
    "IMG_skirt17",
    "IMG_skirt18",
    "IMG_skirt19",
    "IMG_skirt2",
    "IMG_skirt20",
    "IMG_skirt21",
    "IMG_skirt22",
    "IMG_skirt23",
    "IMG_skirt24",
    "IMG_skirt25",
    "IMG_skirt26",
    "IMG_skirt27",
    "IMG_skirt28",
    "IMG_skirt29",
    "IMG_skirt3",
    "IMG_skirt4",
    "IMG_skirt5",
    "IMG_skirt6",
    "IMG_skirt7",
    "IMG_skirt8",
    "IMG_skirt9",
    "IMG-AnkleBooties",
    "IMG-Boots",
    "IMG-ChunkyHeels",
    "IMG-ConeHeels",
    "IMG-CutOutHeels",
    "IMG-DanceShoes",
    "IMG-Flats",
    "IMG-Flops",
    "IMG-Heels1",
    "IMG-HighBoots1",
    "IMG-Kittenheels",
    "IMG-Pumps",
    "IMG-Snickers1",
    "IMG-SpoolHeels",
    "IMG-Stiletto",
    "IMG-Wedge",
    "IMG-WSandals",
    "IMG_niteB_1",
    "IMG_niteU_1",
    "IMG_niteU_2",
    "IMG_niteU_3",
    "IMG_niteU_4",
    "IMG_niteU_5",
    "IMG_niteU_6",
    "Nightgown_1",
    "Nightgown_2",
    "Nightgown_3",
    "Nightgown_4",
    "Nightgown_5",
    "Nightgown_6",
    "top_1",
    "dress_3",
    "weird top",
    "dress_2",
    "dress_1",
    "IMG-CI-HarnessBottom",
    "IMG-CI-HarnessTop",
    ];
  let out = "";
  for (let index = 0; index < list.length; index++) {
    out += `<div style="margin: 5px; float: left;"><<link [img[${list[index]}|${list[index]}]]>><<set $customImage = "${list[index]}">><<notify>>${list[index]} icon assigned!<</notify>><</link>></div>`;
  }
  return out;
};

setup.clothesCreator.temporary = {
  item: {
    key : "tttt",
    nick : "none",
    type : "pants",
    slot : "bottom",
    colorWord : "pink",
    styleWord : "pajama pants",
    subStyleWord : "thin",
    tertiaryWord : "na",
    fabricWord : "satin",
    img: "IMGnotavailable",
    padoImg: false,
    atr : 0,
    sexy : 0,
    formal : 0,
    exposure : 0,
    flag : {text: "Tight Threads production"},
    damage : 0,
    cond : {},
    dirty : 0,
    wetness : 0,
    style : 0,
    subStyle : 0,
    fabric : 0,
    color : 0,
    origin : "Tight Threads",
    price : 0,
    swimwear : false,
    nightwear : true,
    athletic : false,
    kinky : false,
    accessNip : false,
    accessPussy : false,
    accessButt : false,
    accessTits : false,
    accessAss : false,
    wear : ["normal", "off"],
    },
  };
setup.clothesCreator.backup = {
  item: {
    key : "tttt",
    nick : "none",
    type : "pants",
    slot : "bottom",
    colorWord : "pink",
    styleWord : "pajama pants",
    subStyleWord : "thin",
    tertiaryWord : "na",
    fabricWord : "satin",
    padoImg: "none",
    atr : 0,
    sexy : 0,
    formal : 0,
    exposure : 0,
    flag : {text: "Tight Threads production"},
    damage : 0,
    cond : {},
    dirty : 0,
    wetness : 0,
    style : 0,
    subStyle : 0,
    fabric : 0,
    color : 0,
    origin : "Tight Threads",
    price : 0,
    swimwear : false,
    nightwear : true,
    athletic : false,
    kinky : false,
    accessNip : false,
    accessPussy : false,
    accessButt : false,
    accessTits : false,
    accessAss : false,
    wear : ["normal", "off"],
    },
  };
