

interface Engine {
  play: { (passage: string, noHistory?: boolean): void };
  show: { (): void };
  minDomActionDelay: number;
  setSeed: (input:string) => string;
  retrieve: (input:string) => string;
  restart: () => void;
}

interface Dialog {
  close: { (): void };
  open: any;
  addClickHandler: any;
  setup: any;
  wiki: any;
  isOpen: { (): boolean };
}

interface arc {
  thaumx: string;
  besty: string;
}



interface setup {
  tf: setupTF;
  clothesCreator: clothesCreator;
  drug: setupDrug;
  hang : SetupHangout;
  interactionMisc: SetupInteractMisc;
  sched: setupSchedule;
  event: SetupEvent;
  seedRNG: string;
  randomTVad: () => string;
  eventAllowed: boolean;
  storythread: Storythread;
  setNewJob: (place: string, rank: number) => boolean;
  promote: (coworkers: boolean, subord: boolean) => boolean;
  demote: (coworkers: boolean, subord: boolean) => boolean;
  fire: () => void;
  testes: RegExp;
  npcid: RegExp;
  initialized: boolean;
  menuvar: string;
  npcSched: IntSetupNPCSched;
  fakeNPC: IntSetupFakeNPC;
  randName: (female?: boolean) => string;
  loadcunt: number;
  seenRefreshWarning: boolean;
  minigames: {};
  npcInfo: NpcInfo;
  npcDate: NpcDate;
  restartChecker: boolean;
  scrollBottom: (id: string) => void;
  reload: { (): void };
  awsc: setupAWSC;
  drag: {
    create: { (home: dragArea, ...ara: dragArea[]): void };
    homeListener: { (): void };
    formatHome: { (items: string[]): string | Error };
    jewelry: { (): void };
    jewListener: { (): void };
    formatJewinv: { (items: string[]): string };
    formatJew: { (item: string): string };
  };
  operations: {
    tryGlobal: boolean;
    nicknames: boolean;
    fmRange: [number, number];
  };
  dice: {
    processDice: { (a: number | string, b?: number): number };
    processString: { (string: string): number | number[] };
    roll: { (a: number | string, b?: number): number };
  };
  fullscreen: { (element: any): void };
  messageMacro: {
    default: string;
  };
  playTime: setupPlaytime;
  pBar: {
    start: { (ident: cssID, cur: number, max: number): void };
    add: { (ident: cssID, amt: number): void };
    set: { (ident: cssID, amt: number): void };
    finish: { (ident: cssID, target: cssID, content: string): void };
  };
  selectStore: { (storyVar: string): [string, string] | false };
  storeCode: { (storyVar: string, code: string): boolean };
  evalCode: { (code: string, silent: boolean, $element: any, stream: any): boolean };
  acc: object;
  clothes: setupClothes;
  outfits: setupOutfits;
  clothesGen: setupClothesGen;
  consumables: setupConsumables;
  sexyLines: () => string;
  giveCompliment: () => string;
  romanticShit: () => string;
  hair: setupHair;
  sInv: setupSInv;
  shop: setupShop;
  alert: { (msg: string): void };
  homeItems: setupHomeItems;
  isActive: { (npcid: npcid, restore: boolean): string };
  lactBreastCalc: { (): void };
  status: setupStatus;
  time: setupTime;
  refresh: { (): void };
  notify: { (msg: twee, time?: number | false, classes?: string | false | string[]): void };
  jewel: setupJewel;
  statusLoad: { (tipe?: string): void };
  statusSave: { (tipe?: string): void };
  makeup: setupMakeup;
  generateStoreClothes: { (): void };
  shopInv: any;
  physicalATR: { (): void };
  totalATR: { (): void };
  weightCalc: { (): void };
  BMItoVal: { (realWeight: number): number };
  valToBMI: { (realWeight: number): number };
  BMI: { (realWeight: number): number };
  isGain: { (): string };
  initialWeight: { (): number };
  bank: setupBank;
  bath: setupBath;
  condition: setupCondition;
  initCond: { (): void };
  fert: setupFert;
  food: setupFood;
  cook: setupCook;
  access: setupAccess;
  tattoo: setupTattoo;
  prostitution: setupProstitution;
  synapticVersion: string;
  drinks: object;
  home: setupHome;
  job: setupJob;
  version: string;
  mapEvents: setupMapEvents;
  ver: number;
  map: setupMap;
  scene: setupScene;
  school: setupSchool;
  prefsFlip: (onOff:0|1) => void;
  SCXfunc: { (): void };
  SCfunc: { (skillType: string, DCnum?: number, diceSize?: string | number, bonusVal?: number): boolean };
  skillup: { (skillType: string): string };
  skillGain: { (type: string, dc: number): boolean };
  skillModCalc: { (skill: number): number };
  sleep: setupSleep;
  getReadySettings: { (): string };
  calcEnergyRate: { (): number };
  timeDisp: {};
  now: {};
  ui: setupUI;
  unit: { (input: number, type: unit, num?: boolean): string | number };
  unitHeight: { (input: number, type: unit): string };
  climate: setupClimate;
  weather: setupWeather;
  playerHistoryComparison: () => void;
  week: setupWeek;
  library: setupLibrary;
  sex: setupSex;
  sexToys: setupSexToys;
  dialog: { (title: string, content?: twee | 0): void };
  loadOnce: number;
  sexActs: any;
  sexPos: any;
  perf: any;
  flipsat: number;
  loadScript: { (sourceSrc: string): void };
  resourceLoad: { (): void };
  resourceLoadFinished: { (): void };
  menuItemRunSaves: {};
  appendStr: { (target: cssID, content: string): void };
  bulkStoreNPC: { (npcidAr: npcid[]): void };
  asyncBulkStoreNPC: { (NPCs: npcid[]): void };
  randomDist: { (splooge: number[]): number };
  backgroundThemeHandler: { (): void };
  textThemeHandler: { (): void };
  browserLimit: boolean;
  browserLimitTwo: boolean;
  colorThemeHandler: { (): void };
  FontsizeHandler: { (): void };
  RapeHandler: () => void;
  screenReader: () => void;
  ExtremeHandler: () => void;
  ViolentHandler: () => void;
  PerformanceHandler: () => void;
  verboseHandler: () => void;
  AsyncHandler: () => void;
  test: (input:any) => void;
  refreshTheme: { (): void };
  NPCStoreList: string[];
  storeState: { (): void };
  unpackVars: { (): void };
  calculateNPCATR: { (main: NPCmain, body: Body, fert: Fert, trait: any, status: Status, mutate: Mutation): [number, number, number] };
  npcTotalATR: (npcid: string) => number;
  numWord: { (input: string | number): string | number };
  monthName: { (mon: number): string };
  numberLetAbrv: { (num: number): string };
  updatePlayerHistory: { (): void };
  fillerText: { (chars: "rand" | number): string };
  sort: { (arr: object[], j: string): any[] };
  nameRandomizer: { (sex: number, race: string): string };
  nickRandomizer: { (sex: sexGenderNumber, name: string, body: object): string };
  surnameRandomizer: { (race: string): string };
  varanal: { (arg: string): any };
  calcBreastShape: {
    ({ size, silicone, weight, band, shape
    }: { size: number, silicone: number, weight: number, band: number, shape: string }): string
  };
  calculateBreastStats: { (vol: number, shoulder: number, weight: number): any[] };
  deepThoughts: { (num: number): string };
  jokeThoughts: { (num: number): string };
  swimmer: boolean;
  swim: string;
  eMsg: { (reason: string | { name: string, message: string }): string };
  eliteStats: { (): string };
  log: { (output: string): void };
  phoneBGprint: { (): twee };
  phoneBGchange: { (back: boolean): string };
  phoneMenuPrint: { (): string };
  phoneMenuChange: { (back: boolean): string };
  colorretrieve: { (): true };
  scs: { (): void };
  scc: { (): void };
  insultGenerator: { (): string };
  cleanHome: { (unit: number): void };
  dirtyHome: { (): void };
  prop: { (prop: string): string };
  tooltipper: { (): void };
  pubeShape: { (style: string): string };
  gate: (content: any) => boolean;
  forbiddenList: { (): void };
  addAppointment: { (day: number, week: number, { name, type, alert, start, end, place, locmap, missed, npc, msg, disc }: AppointmentInfo): void };
  daysList: { (days: weekdays): string };
  restoreNPC: { (npcid: npcid): boolean };
  storeNPC: { (npcid: npcid): boolean };
  textingMacroFunction: { (): void };
  initialize: setupInitialize;
  defineFixedNPCs: { (): void };
  ai: setupAI;
  breastCalc: { (): void };
  cleanStatus: { (): string };
  calcMilkCap: { (size: number, lact: number): number };
  backward: setupBackward;
  bot: {
    init: {};
    reply: {};
  };
  omni: setupOmni;
  imagedata: any;
  imageloaded: boolean;
  imageVersion: number;
  totalloadedimages: number;
  fload: number;
  loadImages: { (textdata: string, fname: string): void };
  fwait: number;
  imgwait: { (): void };
  imgbarinit: { (numFiles: number): void };
  imageAWRlist: { (name: string): void };
  imgbaradd: { (img?: string | boolean, totimg?: number): void };
  newImageLoader: { (): void };
  nimgbaradd: { (): void };
  porn: setupPorn;
  AW: setupAW;
  sexCondomTempType: string;
  expectedImageLength: number;
  npcgen: setupNpcgen;
  npc: setupNPC;
  npcSetting: setupNPCsettings;
  startsPassage: string;
  npcDataFormat: { ({ body, main, sched, bground, rship, sex, flags, friends, clothes, status, cond, outfit, mutate, pref, core, fert, makeout }): DataNPC }
  omnItems: IsetupOmnItems;
  interact: IsetupInteract;
  scenario: IsetupScenario;
  dragon: (elementID: string, handleID?: string) => void;
  achieve: setupAchieve;
  suicide: IntSetupSuicide;
  mapNPC: IntSetupMapNPC;
  npcDisplay: IntSetupNpcDisplay;
  ageCheck: IntSetupAgeCheck;
  avatar: SetupAvatar;
  cTag: SetupConvoTags;
  npcProc: () => void;
  atr: IntSetupAtr;
  badEnd: (passage: string) => void;
  homesGenerator: (amt: number, opt: [number, number, number, number, number]) => void;
  quickClean: () => void;
  thousandComma: (num: number) => string;
  spendingLevel: (amt: number) => string;
  template: setupTemplates;
  svg: setupSVG;
  date: SetupDating;
  progressBar: () => void;
  progressBarTracker: boolean;
  getImageDimensions: (file: any) => void;
  printGameImages: (cuntID: string) => void;
  stars:(num: number) => string;
  loliCheck: () => boolean;
  patrons: () => string;
  randomPatron: () => string;
  rship: setupRship;
  escape: setupEscapeHatch;
  hasCondom: () => boolean;
  saveWipe: () => void;
  lilyOutcomeSetter: () => void;
  calc_energy_base: () => void;
  genetics: setupGenetics;
  child: setupChild;
  parse: setupParse;
  killCAB: (id: string) => void;
  curTimeDisplay: () => string;
  hucowName: () => string;
  devirgin: (hole?: "P" | "A") => void;
  bukkake: () => void;
  bodyPortraitFemale: (char?: string) => string;
  hasGun: () => boolean;
  lab: setupLab;
  giveSSTD: () => void;
  reasonYouCant: (test: string | boolean) => string;
  indexOfMax: (arr: number[]) => number;
  reasonPrettifier: (test: string) => string;
  convoParse: () => void;
  parsed: boolean;
  forwardPassage: string | false;
  getNPCs: (type: string) => npcid[];
  getLovers: () => npcid[];
  getExclusive: () => npcid[];
  getFriends: () => npcid[];
  npcHomes: npcHomes;
  hadSexWith: (npc: npcid, level: number) => void;
  isSuspicious: (npcid: npcid) => boolean;
  npcEditorList: () => string;
  churchLaunch: (church: string) => void;

  // Anenn markup
  editorCalc: (NPC: NPC) => void;

  camFlag : (value: string) => any;

  setCamShow: () => void;
  /* ========== */

  vow: IntSetupVows;
  npcTemplate: IntSetupNPCtemplate;
}

interface ↂinterface {
  job: ↂjob;
  plans: plans;
  sched: ↂsched;
  home: ↂhome;
  toys: ↂtoys;
  flag: ↂflag;
  pc: PC;
  skill: Skills;
  makeup: ↂmakeup;
  makeupSet: ↂmakeupSet;
  hairStyle: string[];
  ward: ↂward;
  storeInv: ↂstoreInv;
  homeOptions: HomeOption[] | "none";
  pcHistory: any;
  sex: ↂsex;
  map: MapClass;
  pref: ↂpref;
  tempHistory: IntↂTempHistory;
  toggleLoading: boolean;
  T: NPC;
  seeds: ↂseeds;
  child: Child[];
  buttons: {
    [propName: string]: CAB;
  };
}

interface aw {
  besty: {}; // a temporary variable home for Besty that can be burned at will
  npcTemplates: {};
  dialogCloseEvent: () => void;
  dishes: dish[];
  ingredients: any;
  patrons: {[propName: string]: number};
  blyat: Filter;
  tVal: number;
  tBase: number;
  time: number;
  timeArray: [number, number, number, number, number, number];
  UTFBase64: {
    encode: (input:string) => string;
    decode: (input:string) => string;
  };
  datePlaces: datePLaces;
  hangPlaces: datePLaces;
  dialogQueue: [string, string][];
  diAlertQueue: string[];
  dialogOpen: () => void;
  storythreads: Threads;
  jobData: awJobData;
  npcSchedule: { [propName: string]: string[][] };
  fakeNPC: {
    [propName: string]: FakeNPC;
  };
  achieve: awAchieve;
  unlocks: string[];
  event: awEvents;
  omni: {
    [propName: string]: OmniEvent;
  };
  go: { (passage: string): void };
  code: awCode;
  Base64: awBase64;
  conLoad: awConLoad;
  drake: any
  awrMissing: number;
  verbose: boolean;
  verboseExtra: boolean;
  ref: { (string: string): any };
  refName: {};
  acc: object;
  L: { (type?: string): void };
  S: { (type?: string): void };
  con: {
    enabled: { (): boolean };
    error: { (name: string, error: { name: string, message: string }): void };
    warn: { (msg: string): void };
    info: { (msg: string): void };
    obj: { (object: object, msg?: string | false): void };
    html: { (obj: Element, msg?: string | false): void };
    trace: { (msg?: string | false): void };
    table: { (obj: object, msg?: string | false): void }
  };
  get: { (key?: string): any };
  arrayCunt: { (arr: any[], fin: any, index?: number, del?: boolean): number };
  clothes: {
    [propName: string]: Garment;
  };
  stsCalculus: awCalculus;
  slot: {
    panties: any;
    bra: any;
    leg: any;
    top: any;
    bottom: any;
    coat: any;
    bag: any;
    accA: any;
    accB: any;
    accC: any;
    accD: any;
    shoes: any;
  };
  hair: {
    [propName: string]: Hairstyle;
  };
  hairDefine: { (): void };
  invItems: awInvItems;
  homeItemsSwitch: { (orig: string, repl: string): void };
  homeItems: object;
  homeItemsDefine: { (): void };
  capital: { (str: string): string };
  jewel: object;
  jewDefine: { (): void };
  makeup: {
    eye: object;
    lip: object;
    gen: object;
  };
  makeupEyeDef: { (): void };
  makeupLipDef: { (): void };
  makeupGenDef: { (): void };
  job: object;
  school: object;
  dreams: {
    standard: { (): string };
    none: { (): string };
    unsatisfied: { (): string };
    needy: { (): string };
    preg: { (): string };
    latePreg: { (): string }
  };
  sleep: awSleep;
  gate: (content: any) => boolean;
  sexAct: object;
  sexActN: object;
  sexActRef: object;
  sexActNRef: object;
  sexPos: object;
  base: {
    shop: {
      [propName: string]: number;
    };
    storeMod: {
      [propName: string]: number;
    };
    clothingAtrMod: {
      [propName: string]: [number, number];
    };
  }
  tempSPcunt: any;
  killit: { (target: cssID): boolean };
  append: { (target: cssID, content: twee): void };
  replace: { (target: cssID, content: twee): void };
  cash: { (amt: number, reason?: string): void };
  chad: any;
  ai: awAI;
  bot: any;
  botscript: string;
  n: { (id: npcid | number, activate?: boolean): any };
  parse: { (npc: string | number, cmd: string, ...args: any[]): string };
  imagedata: any;
  awrList: any;
  npc: {
    [propName: string]: NPC;
  };
  passage: {
    title: string;
    tags: string[];
    domId: string;
    previous: string[];
  };
  theme: {
    bgMain: string;
    bgMenus: string;
    toggle: string;
    uiBorder: string;
    scrollbar: string;
    head: string;
    table: string;
    link: string;
  };
  mapNPC: IntAWmapNPC;
  cTag: string[];
  tagContent: {
    [propName: string]: IntTagContent;
  };
  customSchools: string[];
  customJobs: string[];
  svg: IntAWsvg;
  dateSpots: AWdateSpots;
  hangSpots: AWhangSpots;
  date: awDateData;
  hang: awHangData;
  badWords: string[];
  tempJobContent: string; // workaround for besty fuckery in randomly adding sex scenes to job events
  textingMacroData: IntTextingMacroContent[];
  textingMacroCount: number;
  data: {
    [propName: string]: string;
  };
  pseudo: IntAWpseudo;
  SAL: any;
  asbs: string;
  npcTemplate: IntAWnpcTemplate;
}



interface IntTagContent {
  [propName: string]: string[];
}

interface State {
  temporary: any;
  active: {
    variables: {
      AW: object
    }
  };
  PC: {};
  makeup: object;
}

interface setupLibrary {
  callSexActN: { (book: string, chapter: string, page?: string | -1, chapArray?: 0 | any[]): string };
  killSAN: { (): void };
  initSAN: { (): void };
  sexActN: any;
  callSexAct: { (book: string, chapter: string, page?: string | -1, chapArray?: 0 | any[]): string };
  callModSexAct: { (book: string, chapter: string, page?: string | -1, chapArray?: 0 | any[]): string };
  sexact: any;
  killSA: { (): void };
  initSA: { (): void };
  callSexPos: { (book: string, chapter: string, page?: string | -1, chapArray?: 0 | any[]): string };
  callOrgasm: { (book: string, chapter: string, page?: string | -1, chapArray?: 0 | any[]): string };
  initSP: { (): void };
  killSP: { (): void };
  killSAO: { (): void };
  orgasm: any;
  initSAO: { (): void };
  sexPos: any;
}

interface setupNPC {
  fixedIDs?: { [propName: string]: string, };
  ready: string[];
  stored: string[];
  single: string[];
  rShip: string[];
  married: string[];
  male: string[];
  female: string[];
  futa: string[];
  age13to17: string[];
  age18to21: string[];
  age22to27: string[];
  age28to33: string[];
  age34to39: string[];
  age40to49: string[];
  age50to59: string[];
  age60plus: string[];
  poor: string[];
  middle: string[];
  wealthy: string[];
  education: setupNPCeducation;
  acquainted: string[];
  friends: string[];
  bff: string[];
  lover: string[];
  interested: string[];
  fling: string[];
  exes: string[];
  enemies: string[];
}

interface setupNPCeducation {
  dropout: string[];
  hschool: string[];
  assoc: string[];
  bach: string[];
  master: string[];
  doctor: string[];
}

interface setupNPCsettings {
  orgasmAdjust: number;
  futaRate: number;
  futaMale: boolean;
  gender: [boolean, number];
  arch: (boolean | number[])[];
  wealth: [boolean, number, number];
  age: [boolean, number[], number[]];
  homo: ((boolean | number)[] | boolean)[];
  race: (boolean | number[])[];
  height: (boolean | number[])[];
  tone: (boolean | number[])[];
  weight: (boolean | number[])[];
  fertility: [boolean, number, number];
  cock: (boolean | number)[];
  pussy: (boolean | number)[];
  circum: (boolean | number)[];
  beauty: (boolean | number[])[];
  orgasm: (boolean | number)[];
  pregTerm: [boolean, number];
  tits: (boolean | number)[];
  mutate: [boolean, number[], number[]];
  married: [boolean, number];
  open: (boolean | number)[];
  vert: (boolean | number)[];
  iq: [boolean, number, number];
  names: [boolean, string[] | [0], string[] | [0], string[] | [0]];
  persCore: (boolean | number[])[];
  pref: setupNPCsettingsPref;
}

interface awCalculus {
  α: any;
  β: any;
  γ: any;
  ᛔ: any;
  ε: any;
  ζ: any;
  η: any;
  θ: any;
  λ: any;
  μ: any;
  π: any;
  ρ: any;
  φ: any;
  ψ: any;
  ω: any;
}

interface setupNPCsettingsPref {
  enabled: boolean;
  Fweight: number[];
  Mweight: number[];
  Fheight: number[];
  Mheight: number[];
  Fmuscle: number[];
  Mmuscle: number[];
  Fother: number[];
  Mother: number[];
}

interface ↂjob {
  name: string;
  employer: string;
  code: 0 | string;
  skills: string;
  percept: number;
  desc: string;
  loc: [locationMain, string, string|false];
  late: jobLate;
  missed: jobMissed;
  sick: jobSick;
  vacation: jobVacation;
  rules: jobRules;
  stats: jobStats;
  flag: jobFlag;
  choose: jobChoose;
  pay: number;
  moti: number;
  att: jobAtt;
}

interface jobAtt {
  weekDays: number;
  showed: (boolean | number)[];
  weekHours: number;
}

interface jobChoose {
  effort: number;
  focus: string;
}

interface jobFlag {
}

interface jobStats {
  progress: number;
  promote: boolean;
  fired: boolean;
  fireDanger: boolean;
  performance: number;
  daysworked: number;
  daysworkedTotal: number;
  rank: number;
  boss: number;
  coworker: number;
  subord: number;
}

interface jobRules {
  payrate: number;
  taskratio: number[];
  tasks: number;
  taskA: jobTask;
  taskB: jobTask;
  taskC: jobTask;
  taskD: jobTask;
  cutoffs: number[];
  worktime: number[];
  breaktime: number;
  strict: boolean;
  boss: string;
  taskE: jobTask;
  taskF: jobTask;
}

interface jobTask {
  type: string;
  DC: number;
  retry: boolean;
  effect: number;
  stress: number;
  hap: number;
  desc: string[];
}

interface jobVacation {
  rate: number;
  balance: number;
  used: number;
  ratePaid: number;
  balPaid: number;
  usedPaid: number;
}

interface jobSick {
  rate: number;
  balance: number;
  caught: number;
  used: number;
}

interface jobMissed {
  times: number;
  recent: number;
}

interface jobLate {
  times: number;
  called: number;
  recent: number;
  sick: number;
  vacation: number;
}

interface ↂsched {
  workTime: (number[] | number)[];
  workDays: (boolean | number)[];
  vacation: (boolean | number)[];
  sick: (boolean | number)[];
  wakeTime: number[];
  sleepTime: number[];
  sleepWarn: time;
  sleepWarnOn: boolean;
  alarmClock: (boolean | number)[];
  actualWake: number;
  alerts: boolean;
  extraAlerts: boolean;
  goto: boolean;
  fastForward: boolean;
  fastSleep: boolean;
  showChange: boolean;
  showMedical: boolean;
  dream: string;
  school: any[];
  sleepin: boolean;
  sleepinOverride: boolean;
  sleepinText: any[];
  sleepPassage: string;
  runop: number;
  showered: boolean;
  alertText: string;
  alertPend: boolean;
  npcDate: {[propName: string]: [number, boolean, number, string, boolean, string]}; 
  npcHang: {[propName: string]: [number, boolean, number, string, boolean, string]}; 
}

interface ↂhome {
  upgrade: {
    [propName: string]: boolean;
  };
  item: {
    owned: string[];
    furnature: string[];
    exercise: string[];
    electronic: string[];
    decor: string[];
    health: string[];
    other: string[];
    kitchen: string[];
    bath: string[];
    balcony: string[];
    bed2: string[];
    bed3: string[];
    bedroom: string[];
    living: string[];
    foyer: string[];
    trash: string[];
  };
  decor: {};
  finance: {
    rent: number;
    food: number;
    goods: number;
    supplies: number;
    misc: number;
    isp: number;
    cable: number;
    maid: number;
    car: number;
    gas: number;
    miles: number;
    maint: number;
    insurance: number;
    electric: number;
    water: number;
    grooming: number;
    streaming: number;
    porn: number;
    patreon: number;
    gym: number;
    lessons: number;
    cash: number;
    spending: number;
    miscIncome: number;
    income: {
      lotto: number;
      milk: number;
      gambling: number;
      sugarDaddy: number;
      prostitute: number;
      yardSale: number;
      child: number;
      surrogate: number;
      oddjobs: number;
    };
    jobIncome: number;
    totalIncome: number;
    totalExpense: number;
    bank: number;
    bankInterestPer: number;
    bankInterest: number;
    loan: number;
    loanPayment: number;
    loanInterest: number;
    loanInterestPer: number;
    creditInterestPer: number;
    creditInterest: number;
    credit: number;
    sett: {
      foodLevel: number;
      goodsLevel: number;
      supplyLevel: number;
    };
  };
  clean: {
    floors: number;
    surfaces: number;
    bathroom: number;
    kitchen: number;
    dishes: number;
    laundry: number;
    neatness: number;
    bed: number;
    deepclean: number;
    doCleaning: number;
    pickingUp: number;
    doDishes: number;
    doLaundry: number;
    doBed: number;
    increment: number;
    cleaningTime: number;
  };
  ment: number;
  stats: {
    location: number;
    tier: number;
    finish: number;
    upkeep: number;
    nhood: number;
    rent: number;
    street: string;
    name: string;
  };
}

interface ↂtoys {
  parts: {
    mouth: false | string; // free or sextoy key
    arms: false | string;
    legs: false | string;
    asshole: false | string;
    clit: false | string;
    vagina: false | string;
    groin: false | string;
    nipples: false | string;
    breasts: false | string;
  };
}

interface ↂmakeup {
  eye: string[];
  lip: string[];
  gen: string[];
}

interface ↂmakeupSet {
  none: string[];
  casual: string[];
  standard: string[];
  fancy: string[];
  "custom 1": string[];
  "custom 2": string[];
  "custom 3": string[];
}



interface ↂward {
  leg: string[];
  bra: string[];
  panties: string[];
  bottom: string[];
  top: string[];
  dress: any[];
  athU: string[];
  athL: string[];
  swimU: string[];
  swimL: string[];
  niteL: any[];
  niteU: any[];
  coat: any[];
  acc: any[];
  bag: any[];
  shoes: any[];
}

interface ↂstoreInv {
  panties: any[];
  leg: any[];
  bottom: any[];
  bra: any[];
  top: any[];
  dress: any[];
  swimU: any[];
  swimL: any[];
  athU: any[];
  athL: any[];
  coat: any[];
  niteU: any[];
  niteL: any[];
  acc: any[];
  bag: any[];
  shoes: any[];
}


interface setupAWSC {
  ref: { (varName: string, opt: "parse" | "set", value?: any): any};
  parse: { (varName: string): any}
  set: { (varName: string, value: any): boolean };
}

interface ↂpref {
  weight: [number, number, number, number, number, number];
  muscle: [number, number, number, number, number, number];
  height: [number, number, number, number, number, "no mod"];
  other: [number, number, number, number, number, number, number, number, number, number];
  Fweight: [number, number, number, number, number, number];
  Fmuscle: [number, number, number, number, number, number];
  Fheight: [number, number, number, number, number, "no mod"];
  Fother: [number, number, number, number, number, number, number, number, number, number, number];
}

// NOTE - JS FILE
interface setupConsumables {
  options: any;
  ref: any;
  getConsumable: (id: string) => any;
  hasConsumable: (id: string, number: number) => boolean;
  amtOfConsumable: (id: string) => number;
  consumableExists: (id: string) => boolean;
  getConsumableName: (id: string) => string | null;
  getConsumableCode: (id: string) => string | null;
  getConsumableDescr: (id: string) => any[] | null;
  getAllConsumables: () => any;
  getCarriedConsumables: () => string[] | null;
  findConsumableByIndex: (index: number) => string | null;
  findIndexOfConsumable: (id: string) => number;
  deleteConsumable: (id: string) => void;
  add: (key: string, count?: number) => void;
}

// NOTE - JS FILE
interface setupSInv {
  options: any;
  attachEvent: { (inv: any, loc: any, items: any, cont: any): void };
  inv: any;
}

interface IsetupOmnItems {
  [propName: string]: IntOmniData;
}

