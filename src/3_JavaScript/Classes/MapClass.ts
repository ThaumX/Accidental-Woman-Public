

interface IntMapBuild {
  loc: mapLocArray;
  lastLoc: Array<false | string>;
  history: Array<Array<false | string>>;
  movmtList: any[];
  wxCover: any[];
  NPC: any[];
  imageName: string;
  lastName: string;
  name: string;
  movmt: number;
  lastPassage: string;
  passage: string;
  dirNS: string;
  dirEW: string;
  dice: number;
  NPCroom: number;
  NPCactive: boolean;
  NPCroomview: number;
  mainEvent: number;
  minorEvent: number;
}

class MapClass {
  public loc: mapLocArray;
  public lastLoc: Array<false | string>;
  public history: Array<Array<false | string>>;
  public movmtList: any[];
  public wxCover: any[];
  public NPC: any[];
  public imageName: string;
  public lastName: string;
  public name: string;
  public movmt: number;
  public lastPassage: string;
  public passage: string;
  public dirNS: string;
  public dirEW: string;
  public dice: number;
  public NPCroom: number;
  public NPCactive: boolean;
  public NPCroomview: number;
  public mainEvent: number;
  public minorEvent: number;
  // CONSTRUCTOR =================================
  constructor({
    loc,
    lastLoc,
    history,
    movmtList,
    wxCover,
    NPC,
    imageName,
    lastName,
    name,
    movmt,
    lastPassage,
    passage,
    dirNS,
    dirEW,
    dice,
    NPCroom,
    NPCactive,
    NPCroomview,
    mainEvent,
    minorEvent,
  }: IntMapBuild) {
    this.loc = clone(loc);
    this.lastLoc = clone(lastLoc);
    this.history = clone(history);
    this.movmtList = clone(movmtList);
    this.wxCover = clone(wxCover);
    this.NPC = clone(NPC);
    this.imageName = imageName;
    this.lastName = lastName;
    this.name = name;
    this.movmt = movmt;
    this.lastPassage = lastPassage;
    this.passage = passage;
    this.dirNS = dirNS;
    this.dirEW = dirEW;
    this.dice = dice;
    this.NPCroom = NPCroom;
    this.NPCactive = NPCactive;
    this.NPCroomview = NPCroomview;
    this.mainEvent = mainEvent;
    this.minorEvent = minorEvent;
  }
}







