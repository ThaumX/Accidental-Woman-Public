/*
. 88888888888
.     888
.     888
.     888  888  888 88888b.   .d88b.  .d8888b
.     888  888  888 888 "88b d8P  Y8b 88K
.     888  888  888 888  888 88888888 "Y8888b.
.     888  Y88b 888 888 d88P Y8b.          X88
.     888   "Y88888 88888P"   "Y8888   88888P'
.               888 888
.          Y8b d88P 888
.           "Y88P"  888
.
.  DEFINITION OF SPECIFIC DATA TYPES - HOORAY
*/

type twee = string;

type cssID = string;

type race =
"white"
| "Gaelic"
| "Nordic"
| "black"
| "native American"
| "middle eastern"
| "hispanic"
| "southern European"
| "southeast Asian"
| "Asian"
| "south Asian";

type skill =
"exhibition"
| "prostitute"
| "sex"
| "oral"
| "seduction"
| "comm"
| "org"
| "probSolving"
| "finance"
| "art"
| "athletic"
| "dancing"
| "clean"
| "shop"
| "cook"
| "fight"
| "willPower";

type weekdays = [
  any,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

type time = [number, number, boolean] | [number, number];

type date = [number, number, number] | [number, number, number, number];

type posBodyPart = "mouth" | "handL" | "handR" | "titL" | "titR" | "pussy" | "clit" | "asshole" | "cock" | "balls";

type sexGenderNumber = 0 | 1 | 2 | 3 | 4;

type clothingType = "bra" | "pants" | "dress" | "panties" | "skirt" | "coat" | "sports bra" | "shorts" | "stocking" | "top" | "jacket" | "swimTop" | "swimBottom" | "swimOnePiece" | "sportBottom" | "sportTop" | "onepiece" | "shoes";

type clothingSlot = "panties" | "bra" | "leg" | "top" | "bottom" | "coat" | "bag" | "accA" | "accB" | "accC" | "accD" | "shoes";

type clothingCategory = "panties" | "bra" | "leg" | "top" | "bottom" | "coat" | "bag" | "acc" | "niteU" | "niteL" | "dress" |"swimU" | "swimL" | "shoes";

type jewelSlot =
  "neck"|
  "wristR"|
  "wristL"|
  "handR"|
  "handL"|
  "ringR"|
  "ringL"|
  "nose"|
  "lip"|
  "tongue"|
  "brow"|
  "earR"|
  "earL"|
  "upEar"|
  "belly"|
  "nipR"|
  "nipL"|
  "clit"|
  "labia"|
  "wrist"|
  "hand"|
  "ring"|
  "ear"|
  "nip"|
  "none";

type clothingOutfit = {
  panties: 0|string,
  bra: 0 | string,
  leg: 0 | string,
  top: 0 | string,
  bottom: 0 | string,
  accA: 0 | string,
  accB: 0 | string,
  accC: 0 | string,
  accD: 0 | string,
  coat: 0 | string,
  shoes: 0 | string,
  bag: 0 | string,
  rand: string,
};

type npcid = string;

type conditionLocation = "hair"|
"face"|
"chest"|
"back"|
"hands"|
"stomach"|
"butt"|
"groin"|
"genitals"|
"thighs"|
"legs"|
"feet"|
"vagFluid"|
"anusFluid";

type foodType = "junk" | "dessert" | "normal" | "health" | "diet" | "home";

type locationMain = 
  "world"
  | "residential"
  | "bullseye"
  | "downtown"
  | "home"
  | "start"
  | "BFhome"
  | "homeT4"
  | "homeT3"
  | "homeT2"
  | "homeT1"

type locationInfo = {
  image: string,
  name: string,
  passage: string,
  loc: string,
  desc: string,
};

type unit = "in"|"ft"|"yd"|"mi"|"gl"|"lbs"|"cm"|"m"|"km"|"l"|"kg";

type wxObject = {
  seed: number;
  max: number;
  min: number;
  dev: number;
  precip: number[];
  snowfall: number;
  snowGround: number;
  tSeed: number;
}

type kink = "risky"|"pregnancy"|"sizequeen"|"cumSlut"|"sub"|"exhibition"|"masochist"|"buttSlut"|"public"|"slut"|"superSlut"|"hyperSlut"|"oral"|"anal"|"force"|"rape"|"liberate"|"easy"|"nips"|"dom"|"water"|"bond"|"hard"|"fap"|"shame"|"none";

type trait = "caring"|"bitch"|"maternal"|"romantic"|"deceptive"|"devious"|"persuasive"|"perceptive"|"forgetful"|"forgiving"|"lowEsteem"|"picky"|"crude"|"friendly"|"approachable"|"relaxed"|"flirty"|"materialist"|"none"|
  "-caring" | "-bitch" | "-maternal" | "-romantic" | "-deceptive" | "-devious" | "-persuasive" | "-perceptive" | "-forgetful" | "-forgiving" | "-lowEsteem" | "-picky" | "-crude" | "-friendly" | "-approachable" | "-relaxed" | "-flirty" | "-materialist";

type AppointmentInfo = {
  name: string;
  type: "quest" | "reminder" | "npcPlans" | "groupPlans" | "date" | "hangout";
  alert: boolean;
  start: number;
  end: number | false;
  place: string | false;
  locmap: string[] | string | false;
  missed: boolean;
  npc: string[] | false;
  msg?: string | false;
  disc?: string;
};

//type orificeTightness = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

//type zeroFive = 0 | 1 | 2 | 3 | 4 | 5;

type pubeStyle = "bushy"|"trimmed"|"neatly-trimmed"|"bikinitrim"|"bikiniline"|"stubble"|"garden"|"heart"|"neat patch"|"mohawk"|"landing-strip"|"brazilian"|"triangular"|"martini"|"stamp"|"shaved"|"hairless";

type ConditionItem = {
  [propName:string]:{amt:number,wet?:number}
};

type braBandType = 24 | 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44 | 46;

type mapLocArray = [locationMain, string, (string | false)?];

type FemaleReproTract = "vulva" | "vest" | "mid" | "deep" | "cervix" | "womb" | "ovary";