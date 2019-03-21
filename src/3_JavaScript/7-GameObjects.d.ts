interface Makeup {
  atr: number;
  sexy: number;
  clown: boolean;
  type: string;
  desc: string;
  look: string;
}

interface HairSets {
  standard: string;
  fancy: string;
  casual: string;
  normal?: string; // Outdated no longer in use from version 0.18.6
  'custom 1'?: string;
  'custom 2'?: string;
  'custom 3'?: string;
}

interface VagFluid {
  vulva: any[];
  vest: any[];
  mid: any[];
  deep: any[];
  cervix: any[];
  womb: any[];
  ovary: any[];
}

interface SexRecord {
  vanilla: number;
  oralPC: number;
  oralNPC: number;
  anal: number;
  public: number;
  swallowed: number;
  creampie: number;
  accidentCP: number;
  forced: number;
  unprotected: number;
  interupted: number;
  nocumNPC: number;
  nocumPC: number;
  mob: number;
  bondage: number;
  sadoMaso: number;
  watersport: number;
  domsub: number;
  roleplay: number;
  fetish: number;
  exhibit: number;
  rapist: number;
  raped: number;
  saboPCbc: number;
  caughtSabo: number;
  PCsaboBC: number;
  PCsaboCaught: number;
  sexlocs: string[];
  tags: string[];
}

interface NPCflags {
  other: string[];
  events: string[];
  knows: string[];
  rumor: string[];
  exes: string[];
  kids: number;
  kidsPC: number;
  cheatonPC: number;
  cheatedon: number;
  cheatWithPC: number;
  knowPCcheated: number;
  PCknowCheated: number;
  toys: boolean;
  toysPublic: boolean;
  knowPCpreg: boolean;
  isFather: boolean;
  thinkFather: boolean;
  suspicion: number;
  PCsuspicion: number;
  thinkPCfaithful: boolean;
  thinkNPCfaithful: boolean;
}

interface AddictionStatus {
  sex: number;
  alc: number;
  heat: number;
  satyr: number;
  focus: number;
  cum: number;
  zone: number;
  cream: number;
  sexNeed: number;
  alcNeed: number;
  heatNeed: number;
  satyrNeed: number;
  focusNeed: number;
  cumNeed: number;
  zoneNeed: number;
  creamNeed: number;
  max: number;
}

interface Nutrition {
  [propName: string]: number;
}

interface Energy {
  amt: number;
  rate: number;
  regen: boolean;
  max: number;
}

interface WombData {
  exists: boolean;
  preg: boolean;
  know: boolean;
  miscarry: number;
  aborts: number;
  birthed: number;
  total: number;
  zygote: Zygote[];
  fetus: Fetus[];
}

interface Ego {
  str: number;
  selfinterest: number;
  selfworth: number;
  confidence: number;
  fragility: number;
  selfimage: number;
  mach: number;
  risk: number;
}

interface Neurotic {
  str: number;
  impulsive: number;
  unstable: number;
  addiction: number;
  anxiety: number;
  sensitive: number;
  anger: number;
  sadness: number;
}

interface Curiosity {
  str: number;
  complex: number;
  learning: number;
  abstract: number;
  curiosity: number;
  novelty: number;
}

interface Loyalty {
  str: number;
  betrayal: number;
  cheating: number;
  effort: number;
  permanence: number;
  family: number;
}

interface Conscient {
  str: number;
  thoughtful: number;
  responsible: number;
  attention: number;
  trustworthy: number;
  structure: number;
}

interface Agreeable {
  str: number;
  interest: number;
  empathy: number;
  caring: number;
  trust: number;
  altruism: number;
}

interface Morality {
  str: number;
  life: number;
  liberty: number;
  property: number;
  honesty: number;
  integrity: number;
}

interface Procreate {
  str: number;
  secure: number;
  preg: number;
  kids: number;
  evolve: number;
  pleasure: number;
}

interface NPCpreference {
  Fweight: [number, number, number, number, number, number];
  Mweight: [number, number, number, number, number, number];
  Fheight: [number, number, number, number, number];
  Mheight: [number, number, number, number, number];
  Fmuscle: [number, number, number, number, number, number];
  Mmuscle: [number, number, number, number, number, number];
  Fother: [number, number, number, number, number, number, number, number, number, number];
  Mother: [number, number, number, number, number, number, number, number, number];
  active: number;
  romance: number;
  novel: number;
  excite: number;
  night: number;
  expensive: number;
  fancy: number;
  popular: number;
  position: string[];
  sexact: string[];
  kinks: string[];
}

interface Mutations {
  Smooth?: boolean;
  LilithCurse?: boolean;
  NoRefract?: boolean;
  MegaNuts?: boolean;
  KillerSperm?: boolean;
  BitchBreaker?: boolean;
  MegaLong?: boolean;
  Iron?: boolean;
  Virile?: boolean;
  AcidPre?: boolean;
  Girth?: boolean;
  Contort?: boolean;
  Cumpire?: boolean;
  PowerEjac?: boolean;
  Multgasm?: boolean;
  Immune?: boolean;
  Milk?: boolean;
  Acid?: boolean;
  BC?: boolean;
  Multiple?: boolean;
  Gestate?: boolean;
  Cycle?: boolean;
  TwinWomb?: boolean;
  Pheromone?: boolean;
  Period?: boolean;
  Mouth?: boolean;
  PseudoPreg?: boolean;
  Elastic?: boolean;
  LitePhero?: boolean;
}

interface KinkList {
  risky: boolean;
  pregnancy: boolean;
  sizequeen: boolean;
  cumSlut: boolean;
  sub: boolean;
  exhibition: boolean;
  masochist: boolean;
  buttSlut: boolean;
  publix: boolean;
  slut: boolean;
  superSlut: boolean;
  hyperSlut: boolean;
  oral: boolean;
  anal: boolean;
  force: boolean;
  rape: boolean;
  liberate: boolean;
  easy: boolean;
  nips: boolean;
  dom: boolean;
  water: boolean;
  bond: boolean;
  hard: boolean;
  fap: boolean;
  shame: boolean;
  dta?: boolean[];
}

interface ClothingPC {
  worn: ClothingWorn;
  keys: ClothingKeys;
  stats: ClothingStats;
  coordinate: ClothingCoordinate;
  spots: AccessorySpots;
}

interface AccessorySpots {
  mouth: boolean;
  nipL: boolean;
  nipR: boolean;
  clit: boolean;
  pussy: boolean;
  ass: boolean;
  face: boolean;
  head: boolean;
  handL: boolean;
  handR: boolean;
}

interface ClothingCoordinate {
  outfit: boolean;
  shoes: boolean;
  coat: boolean;
}

interface ClothingStats {
  atr: number;
  sexy: number;
  formal: number;
  exposureTop: number;
  exposureBot: number;
}

interface ClothingWorn {
  panties: string | 0;
  bra: string | 0;
  leg: string | 0;
  top: string | 0;
  bottom: string | 0;
  bag: string | 0;
  coat: string | 0;
  accA: string | 0;
  accB: string | 0;
  accC: string | 0;
  accD: string | 0;
  shoes: string | 0;
}

interface ClothingKeys {
  panties: string | 0;
  bra: string | 0;
  leg: string | 0;
  top: string | 0;
  bottom: string | 0;
  bag: string | 0;
  coat: string | 0;
  accA: string | 0;
  accB: string | 0;
  accC: string | 0;
  accD: string | 0;
  shoes: string | 0;
}

interface PCjewelry {
  neck: string;
  wristR: string;
  wristL: string;
  handR: string;
  handL: string;
  ringR: string;
  ringL: string;
  nose: string;
  lip: string;
  tongue: string;
  brow: string;
  earR: string;
  earL: string;
  upEar: string;
  belly: string;
  nipR: string;
  nipL: string;
  clit: string;
  labia: string;
  pierced: PiercingSlots;
  owned: string[];
}

interface PiercingSlots {
  neck: boolean;
  wristR: boolean;
  wristL: boolean;
  handR: boolean;
  ringR: boolean;
  ringL: boolean;
  handL: boolean;
  nose: boolean;
  lip: boolean;
  tongue: boolean;
  brow: boolean;
  earR: boolean;
  earL: boolean;
  upEar: boolean;
  belly: boolean;
  nipR: boolean;
  nipL: boolean;
  clit: boolean;
  labia: boolean;
}

interface PCskills {
  exhibition: number;
  prostitute: number;
  sex: number;
  oral: number;
  seduction: number;
  comm: number;
  org: number;
  probSolving: number;
  finance: number;
  art: number;
  athletic: number;
  dancing: number;
  clean: number;
  shop: number;
  cook: number;
  martial: number;
  crime?: number;
  manage?: number;
  perform?: number;
  heels?: number;
  kegel?: number;
  firearms?: number;
  dta?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
}

interface Persona {
  type: string;
  bCon: number;
  mentionFertile: boolean;
  fidelity: number;
  sweet: boolean;
  sexy: boolean;
  slutty: boolean;
  lookingFor: string;
}

interface PCtraits {
  vert: string;
  intro: boolean;
  extro: boolean;
  open: string;
  op: boolean;
  cl: boolean;
  will: 0 | 1 | 2 | 3 | 4 | 5;
  libido: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  caring: -1 | 0 | 1;
  bitch: -1 | 0 | 1;
  maternal: -1 | 0 | 1;
  romantic: -1 | 0 | 1;
  deceptive: -1 | 0 | 1;
  devious: -1 | 0 | 1;
  persuasive: -1 | 0 | 1;
  perceptive: -1 | 0 | 1;
  forgetful: -1 | 0 | 1;
  forgiving: -1 | 0 | 1;
  lowEsteem: -1 | 0 | 1;
  picky: -1 | 0 | 1;
  crude: -1 | 0 | 1;
  friendly: -1 | 0 | 1;
  approachable: -1 | 0 | 1;
  relaxed: -1 | 0 | 1;
  flirty: -1 | 0 | 1;
  materialist: -1 | 0 | 1;
  dta?: [string, boolean, boolean, string, boolean, boolean, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
}

interface SemiNPCgenOptions {
  npcid: string;
  gender?: sexGenderNumber,
  age?: [number, number] | number,
  name?: 0 | string,
  surname?: 0 | string,
  nickname?: 0 | string,
  portName?: 0 | string,
  bday?: 0 | date,
  homo?: 0 | 1 | 2,
  race?: number,
  subrace?: number,
  tone?: number,
  weight?: number,
  fert?: "rand" | number,
  tits?: number,
  cock?: number,
  pussy?: number,
  beauty?: number,
  edu?: "rand" | number,
  wealth?: "rand" | number,
  jobber?: 0 | string,
  should?: number,
  hip?: number,
  waist?: number,
  face?: number,
}

interface NPCoutfit {
  atr: number,
  sexy: number,
  formal: number,
  expTop: number,
  expBot: number,
  panties: false | string,
  bra: false | string,
  leg: false | string,
  top: false | string,
  bottom: false | string,
  accA: false | string,
  accB: false | string,
  accC: false | string,
  coat: false | string,
  shoes: false | string,
  bag: false | string,
}

interface NPCslots {
  panties: false | string,
  bra: false | string,
  leg: false | string,
  top: false | string,
  bottom: false | string,
  accA: false | string,
  accB: false | string,
  accC: false | string,
  coat: false | string,
  shoes: false | string,
  bag: false | string,
}



interface DataNPC {
  main: DataMain;
  body: DataBody;
  groom: DataGroom;
  sched: DataSched;
  background: DataBackground;
  rship: DataRship;
  cond: DataCond;
  record: DataRecord;
  friends: string[];
  clothes: DataClothes;
  status: DataStatus;
  mutate: DataMutate;
  pref: DataPref;
  core: DataCore;
  fert: DataFert;
  kink: DataKink;
  trait: DataTrait;
}

interface DataTrait {
  will: number;
  libido: number;
  open: number;
  vert: number;
  diq: number;
  iq: number;
  op: boolean;
  cl: boolean;
  intro: boolean;
  extro: boolean;
  sexuality: number;
  straight: boolean;
  bi: boolean;
  homo: boolean;
  bitch: number;
  lowEsteem: number;
}

interface DataKink {
  position: string[];
  sexact: string[];
  risky: boolean;
  pregnancy: boolean;
  sizequeen: boolean;
  cumSlut: boolean;
  sub: boolean;
  exhibition: boolean;
  masochist: boolean;
  buttSlut: boolean;
  publix: boolean;
  slut: boolean;
  superSlut: boolean;
  hyperSlut: boolean;
  oral: boolean;
  anal: boolean;
  force: boolean;
  rape: boolean;
  liberate: boolean;
  easy: boolean;
  nips: boolean;
  dom: boolean;
  water: boolean;
  bond: boolean;
  hard: boolean;
  fap: boolean;
  shame: boolean;
}

interface DataFert {
  femaleFlag: string[];
  cycStart: number[];
  maleFlag: string[];
  fluid: DataFluid;
  fertility: number;
  egg: number;
  implant: number;
  vagHostile: number;
  period: number;
  wombHealth: number;
  multEgg: number;
  barren: boolean;
  cycle: number;
  boost: number;
  ovuMod: number;
  pregTerm: number;
  quality: number;
  ejac: number;
  resMax: number;
  reserve: number;
  refact: number;
  quantity: number;
  surv: number;
  ovuFlag: boolean;
  iud: boolean;
  dta?: [number, number, number, number, number, number, number, boolean, number, number, number, number, number, number, number, number, number, number, number, boolean, boolean]
}

interface DataFluid {
  vulva: Cum[];
  vest: Cum[];
  mid: Cum[];
  deep: Cum[];
  cervix: Cum[];
  womb: Cum[];
  ovary: Cum[];
}

interface DataCore {
  procreate: DataProcreate;
  morality: DataMorality;
  agreeable: DataAgreeable;
  conscient: DataConscient;
  loyalty: DataLoyalty;
  curiosity: DataCuriosity;
  neurotic: DataNeurotic;
  ego: DataEgo;
}

interface DataEgo {
  str: number;
  selfinterest: number;
  selfworth: number;
  confidence: number;
  fragility: number;
  selfimage: number;
  mach: number;
  risk: number;
}

interface DataNeurotic {
  str: number;
  impulsive: number;
  unstable: number;
  addiction: number;
  anxiety: number;
  sensitive: number;
  anger: number;
  sadness: number;
}

interface DataCuriosity {
  str: number;
  complex: number;
  learning: number;
  abstract: number;
  curiosity: number;
  novelty: number;
}

interface DataLoyalty {
  str: number;
  betrayal: number;
  cheating: number;
  effort: number;
  permanence: number;
  family: number;
}

interface DataConscient {
  str: number;
  thoughtful: number;
  responsible: number;
  attention: number;
  trustworthy: number;
  structure: number;
}

interface DataAgreeable {
  str: number;
  interest: number;
  empathy: number;
  caring: number;
  trust: number;
  altruism: number;
}

interface DataMorality {
  str: number;
  life: number;
  liberty: number;
  property: number;
  honesty: number;
  integrity: number;
}

interface DataProcreate {
  str: number;
  secure: number;
  preg: number;
  kids: number;
  evolve: number;
  pleasure: number;
}

interface DataPref {
  Fweight: number[];
  Mweight: number[];
  Fheight: number[];
  Mheight: number[];
  Fmuscle: number[];
  Mmuscle: number[];
  Fother: number[];
  Mother: number[];
  active: number;
  romance: number;
  novel: number;
  excite: number;
  night: number;
  expensive: number;
  fancy: number;
  popular: number;
}

interface DataMutate {
  smooth: boolean;
  lilithCurse: boolean;
  noRefract: boolean;
  megaNuts: boolean;
  killerSperm: boolean;
  bitchBreaker: boolean;
  megaLong: boolean;
  iron: boolean;
  virile: boolean;
  acidPre: boolean;
  girth: boolean;
  contort: boolean;
  cumpire: boolean;
  powerEjac: boolean;
  multgasm: boolean;
  immune: boolean;
  milk: boolean;
  acid: boolean;
  birthCon: boolean;
  multiple: boolean;
  gestate: boolean;
  cycle: boolean;
  twinWomb: boolean;
  pheromone: boolean;
  period: boolean;
  mouth: boolean;
  pseudoPreg: boolean;
  elastic: boolean;
  litePhero: boolean;
  goddess: boolean;
  fertStorm: boolean;
  dta?: boolean[];
}

interface DataStatus {
  birthCon: DataBirthcon;
  alcohol: number;
  drugs: number[];
  wetness: number;
  fertText: string;
  risk: number;
  cyc?: number;
  wombA: DataWomb;
  wombB: DataWomb;
  period: number;
  milk: number;
  milkStore: number;
  arousal: number;
  pleasure: number;
  need: number;
  satisfaction: number;
  atr: number;
  stress: number;
  happy: number;
  anger: number;
  lonely: number;
  fatigue: number;
  sleep: boolean;
  health: number;
  healthOld: number;
  will: number;
  overAnger: boolean;
  overStress: boolean;
  overDepress: boolean;
  underSatisfy: number;
  addict: DataAddiction;
  energy: Energy;
  kids: number;
  morality: number;
  corrupt: number;
  perversion: number;
  bimbo: number;
  inPublic: boolean;
  injury: string[];
  disease: string[];
  mindbreak: boolean;
  clean: number;
  nutrition?: Nutrition;
  exercise?: number;
  data?: [number, number, string, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, boolean, number, number, boolean, boolean, boolean, number, number, boolean, number, number, number, number, number, number];
}

interface DataAddiction {
  sex: number;
  alc: number;
  heat: number;
  satyr: number;
  focus: number;
  cum: number;
  zone: number;
  cream: number;
  sexNeed: number;
  alcNeed: number;
  heatNeed: number;
  satyrNeed: number;
  focusNeed: number;
  cumNeed: number;
  zoneNeed: number;
  creamNeed: number;
  jonesing: number;
  withdrawl: boolean;
  dta?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, boolean];
}

interface DataWomb {
  exists: boolean;
  preg: boolean;
  know: boolean;
  miscarry: number;
  aborts: number;
  birthed: number;
  total: number;
  zygote: Zygote[];
  fetus: Fetus[];
}

interface DataBirthcon {
  hormone: number;
  hormoneType: string;
  diaphragm: Diaphragm;
  femaleCondom: Diaphragm;
  menstrualCup: Diaphragm;
  sponge: Diaphragm;
  condom: Diaphragm;
  headCap: Diaphragm;
  ineffective: boolean;
  knowIneffective: boolean;
  chems?: number;
  date?: number;
}

interface Diaphragm {
  worn: boolean;
  type: string;
  effect: number;
  health: number;
  break: boolean;
  sabo: number;
}

interface DataClothes {
  outfits: DataOutfit;
  current: string;
  worn: DataWorn;
}

interface DataOutfit {
  casual: NPCoutfit,
  fancy: NPCoutfit,
  work: NPCoutfit,
  athletic: NPCoutfit,
  swim: NPCoutfit,
}

interface DataWorn {
  panties: boolean;
  bra: boolean;
  leg: boolean;
  top: boolean;
  bottom: boolean;
  accA: boolean;
  accB: boolean;
  accC: boolean;
  coat: boolean;
  shoes: boolean;
  bag: boolean;
}

interface DataRecord {
  makeout: string[];
  sex: DataSex;
  flag: DataFlag;
  info?: IntNPCRecordInfo;
}

interface IntNPCRecordInfo {
  bodyGeneral: boolean;
  bodyJunk: boolean;
  bodyTits: boolean;
  bodyDetail: boolean;
  status: number;
  fert: number;
  trait: number;
  kink: number;
  mutate: boolean;
  core: number;
  pref: number;
  sched: boolean;
  bGround: number;
}

interface DataFlag {
  other: string[];
  events: string[];
  knows: string[];
  rumor: string[];
  exes: string[];
  kids: number;
  kidsPC: number;
  cheatonPC: number;
  cheatedon: number;
  cheatWithPC: number;
  knowPCcheated: number;
  PCknowCheated: number;
  toys: boolean;
  toysPublic: boolean;
  knowPCpreg: boolean;
  isFather: boolean;
  thinkFather: boolean;
  suspicion: number;
  PCsuspicion: number;
  thinkPCfaithful: boolean;
  thinkNPCfaithful: boolean;
}

interface DataSex {
  vanilla: number;
  oralPC: number;
  oralNPC: number;
  anal: number;
  public: number;
  swallowed: number;
  creampie: number;
  accidentCP: number;
  forced: number;
  unprotected: number;
  interupted: number;
  nocumNPC: number;
  nocumPC: number;
  mob: number;
  bondage: number;
  sadoMaso: number;
  watersport: number;
  domsub: number;
  roleplay: number;
  fetish: number;
  exhibit: number;
  rapist: number;
  raped: number;
  saboPCbc: number;
  caughtSabo: number;
  PCsaboBC: number;
  PCsaboCaught: number;
  sexlocs: string[];
  tags: string[];
}

interface DataCond {
  hair: ConditionItem;
  face: ConditionItem;
  chest: ConditionItem;
  back: ConditionItem;
  hands: ConditionItem;
  stomach: ConditionItem;
  butt: ConditionItem;
  groin: ConditionItem;
  genitals: ConditionItem;
  thighs: ConditionItem;
  legs: ConditionItem;
  feet: ConditionItem;
  vagFluid: ConditionItem;
  anusFluid: ConditionItem;
}

interface DataRship {
  friend: boolean;
  acquaint: boolean;
  dating: boolean;
  lovers: boolean;
  exclusive: boolean;
  engaged: boolean;
  married: boolean;
  likePC: number;
  likeNPC: number;
  lovePC: number;
  loveNPC: number;
  companion: number;
  domsub: number;
  mesh: number;
  daysince: number;
  space: number;
  dates: number;
  hangout: number;
  met: number;
  sleptover: number;
  pcSlept: number;
  rejected?: boolean;
  data?: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, number, number, number, number, number, number, number, number, number, number, number, number, number, number, boolean, number, string];
}

interface DataBackground {
  highSchool: boolean;
  college: boolean;
  associate: boolean;
  bachelor: boolean;
  master: boolean;
  doctor: boolean;
  inSchool: boolean;
  education: number;
  homeParents: boolean;
  wealth: number;
  cash: number;
  bank: number;
  debt: number;
  home: number;
  job: string;
  car: string[];
  timeApple: number;
  sister: number;
  sisterYounger: boolean;
  brother: number;
  brotherYounger: boolean;
  parentDivorced: boolean;
  stepParent: string;
  dadDead: boolean;
  momDead: boolean;
  married: boolean;
  exSpouse: number;
  rShip: boolean;
  affair: boolean;
  stories: string[];
}

interface DataSched {
  workdays: boolean[];
  workhours: number[];
  workLoc: string;
  outhours: number[];
  locations: any[];
}

interface DataGroom {
  hairColor: string;
  hairCurl: number;
  pubeColor: string;
  hairdye: string;
  hairDefaultFancy: string;
  hairDefaultCasual: string;
  pubeStyle: pubeStyle;
  bikini: string;
  pubeLength: number;
  pubeShape: string;
  leghair: string;
  armpit: string;
  makeup: DataMakeup;
  teeth: string;
  hairLength: number;
  hairStyle: string;
}

interface DataMakeup {
  atr: number;
  sexy: number;
  clown: boolean;
  type: string;
  desc: string;
  look: string;
}

interface DataBody {
  tits: DataTits;
  pussy: DataPussy;
  asshole: DataPussy;
  cock: DataCock;
  balls: DataBalls;
  tags: string[];
  race: string;
  skinColor: string;
  tone: number;
  weight: number;
  shoulders: number;
  hips: number;
  waist: number;
  pelvis: number;
  height: number;
  ass: number;
  clit: number;
  labia: number;
  beauty: number;
  face: string;
  brow: string;
  nose: string;
  lips: number;
  jaw: string;
  eyeColor: string;
  lactation: number;
  lactCapacity: number;
  orgasm: number;
  energy: number;
  ears: string;
  topATR: number;
  botATR: number;
  ATR: number;
  dta?: [string, string, number, number, number, number, number, number, number, number, number, number, number, string, string, string, number, string, string, number, number, number, number, string, number, number, number];
}

interface DataBalls {
  count: number;
  size: number;
  sac: number;
  hang: number;
  tags: string[];
}

interface DataCock {
  length: number;
  girth: number;
  head: string;
  vol: number;
  circum: boolean;
  hard: number;
  smegma: boolean;
  tags: string[];
}

interface DataPussy {
  virgin: boolean;
  tight: number;
  stretch: number;
  time: number;
  wetness: number;
  tags: string[]
}

interface DataTits {
  shape: string;
  nipple: string;
  nipLength: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  nipGirth: 1 | 2 | 3 | 4 | 5;
  areola: 1 | 2 | 3 | 4 | 5;
  puffy: 1 | 2 | 3 | 4 | 5;
  band: 24 | 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44 | 46;
  silicone: number;
  base: DataBase;
  lact: DataLact;
}

interface DataLact {
  on: boolean;
  max: number;
  size: number;
  cupNum: number;
  cup: string;
  bra: string;
}

interface DataBase {
  bra: string;
  cup: string;
  cupNum: number;
  cupRaw: number;
  size: number;
}

interface DataMain {
  id: number;
  age: number;
  bd: [number, number, number, number];
  female: boolean;
  male: boolean;
  genes: string;
  seen: boolean;
  interact: boolean;
  relation: boolean;
  suicide: boolean;
  lifetime: number;
  count: number;
  tags: string[];
  name: string;
  surname: string;
  portrait: string;
  nickname: string;
}

interface NPCinputData { body: any; main: any; sched: any; bground: any; rship: any; sex: any; flags: any; friends: any; clothes: any; status: any; cond: any; outfit: any; mutate: any; pref: any; core: any; fert: any; makeout: any, info?: any }

interface HomeOption {
  name: string;
  tier: number;
  finish: number;
  upkeep: number;
  nhood: number;
  location: number;
  street: string;
  rent: number;
}

interface lubeObject {
  used: boolean;
  amt: number;
  effective: number;
  type: string;
  pleasure: number;
  prevType: string;
}

interface PCinitObject {
  ageOriginal: number;
  age: number;
  ageID: number;
  idCard?: string;
  name: string;
  surname: string;
  background: string;
  bd: number[];
  female: boolean;
  male: boolean;
  nickname: string;
  dta: [number, number, number, string, string, string, string, number, number, number, number, boolean, boolean, string];
}

interface PCinitGroom {
  hairSets: HairSets;
  makeup: Makeup;
  lastToothbrush: number[];
  hairColor: string;
  hairCurl: number;
  pubeColor: string;
  // pubes: string;
  hairdye: string;
  // ears: string;
  hairLength: number;
  hairStyle: string;
  hairFlag: number;
  pubeStyle: string;
  pubeGrow: number;
  pubeFreq: number;
  pube: number;
  bikiniFreq: number;
  bikiniCount: number;
  pubeCount: number;
  pubeShape: string;
  leghair: number;
  leghairCount: number;
  leghairFreq: number;
  armpit: number;
  armpitCount: number;
  armpitFreq: number;
  eyeMU: string;
  lipMU: string;
  genMU: string;
  teeth: string;
  toothHealth: number;
  toothbrush: number;
  dta: [string, number, string, string, string, string, number, string, number, string, number, number, number, number, number, number, string, number, number, number, number, number, number, string, string, string, string, number, number];
}

interface sexEffectObject {
  pleasure: { // pleasure (prog to orgasm) given by action
    pcAmt: number; //actual amount
    pcMax: number; //max allowed percent  - won't increase pleasure above that point.
    npcAmt: number;
    npcMax: number;
  };
  arousal: { //arousal gain from action (base)
    pcAmt: number;
    pcMax: number;
    npcAmt: number;
    npcMax: number;
  };
  wetness: { //amount of wetness to increase
    pcAmt: number;
    pcMax: number;
    npcAmt: number;
    npcMax: number;
  };
  cum: false | object; //can override cum destination from position. Needs Object if override!
  satisfy: [number, number]; //modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc;npc]
  strong: { //list of traits/kinks that this action is strong for
    pcKink: (kink|"none")[];
    pcTrait: (trait|"none")[];
    npcKink: (kink | "none")[];
    npcTrait: (trait | "none")[];
  };
  weak: { //list of traits/kinks that decrease effect/weak for.
    pcKink: (kink | "none")[];
    pcTrait: (trait | "none")[];
    npcKink: (kink | "none")[];
    npcTrait: (trait | "none")[];
  };
}

interface sexPositionEffectObject {
  pleasure: { // pleasure (prog to orgasm) given by action
    amt: number;
    max: number;
  };
  arousal: { //arousal gain from action (base)
    amt: number;
    max: number;
  };
  wetness: { //amount of wetness to increase
    amt: number;
    max: number;
  };
  cum: false | object; //can override cum destination from position. Needs Object if override!
  satisfy: [number, number]; //modifier to satisfaction gain from orgasm this way. (value/10)*amt [pc;npc]
  strong: { //list of traits/kinks that this action is strong for
    kink: (kink | "none")[];
    trait: (trait | "none")[];
  };
  weak: { //list of traits/kinks that decrease effect/weak for.
    kink: (kink | "none")[];
    trait: (trait | "none")[];
  };
}
