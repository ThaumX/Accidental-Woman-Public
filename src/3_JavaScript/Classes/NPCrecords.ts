

interface SexRecord {
  makeout: number;
  sex: number;
  oral: number;
  anal: number;
  public: number;
  domsub: number;
  forced: number;
  creampie: number;
  accidentCP: number;
  unprotected: number;
  nocumNPC: number;
  nocumPC: number;
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
  toys: boolean;
  toysPublic: boolean;
  knowPCpreg: boolean; // if npc knows the player is preggers
  isFather: boolean; // if npc is actually father of current pregnancy
  thinkFather: boolean; // if npc thinks they are the father
  knowsAcidVag: boolean;
  openRship: boolean; // whether the player and npc agreed to an open relationship (no cheating)
}

// what the player knows about the NPC
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
  stories: boolean[];
}

interface IntNPCrecCheat {
  cheatonPC: [number, number, number, number, number, number];
  cheatonNPC: [number, number, number, number, number, number];
  cheatWithPC: [number, number, number];
  suspicion: number;
  PCsuspicion: number;
  thinkPCfaithful: boolean;
  thinkNPCfaithful: boolean;
}

class NPCrecordCheat {
  public cheatonPC: [number, number, number, number, number, number];
  public cheatonNPC: [number, number, number, number, number, number];
  public cheatWithPC: [number, number, number];
  public suspicion: number;
  public PCsuspicion: number;
  public thinkPCfaithful: boolean;
  public thinkNPCfaithful: boolean;
  constructor(data?: IntNPCrecCheat) {
    if (data == null) {
      this.cheatonPC = [0, 0, 0, 0, 0, 0];
      this.cheatonNPC = [0, 0, 0, 0, 0, 0];
      this.cheatWithPC = [0, 0, 0];
      this.suspicion = 0;
      this.PCsuspicion = 0;
      this.thinkPCfaithful = true;
      this.thinkNPCfaithful = true;
    } else {
      this.cheatonPC = clone(data.cheatonPC);
      this.cheatonNPC = clone(data.cheatonNPC);
      this.cheatWithPC = clone(data.cheatWithPC);
      this.suspicion = data.suspicion;
      this.PCsuspicion = data.PCsuspicion;
      this.thinkPCfaithful = data.thinkPCfaithful;
      this.thinkNPCfaithful = data.thinkNPCfaithful;
    }
  }
  get PChasCheated(): boolean {
    if (this.cheatonNPC[0] > this.cheatonNPC[1] || this.cheatonNPC[2] > this.cheatonNPC[3] || this.cheatonNPC[4] > this.cheatonNPC[5]) {
      return true;
    }
    return false;
  }
  get NPChasCheated(): boolean {
    if (this.cheatonPC[0] > this.cheatonPC[1] || this.cheatonPC[2] > this.cheatonPC[3] || this.cheatonPC[4] > this.cheatonPC[5]) {
      return true;
    }
    return false;
  }
  get PChasEverCheated(): boolean {
    if (this.cheatonNPC[0] > 0 || this.cheatonNPC[2] > 0 || this.cheatonNPC[4] > 0) {
      return true;
    }
    return false;
  }
  get NPChasEverCheated(): boolean {
    if (this.cheatonPC[0] > 0 || this.cheatonPC[2] > 0 || this.cheatonPC[4] > 0) {
      return true;
    }
    return false;
  }
  public pcConfess(): [number, number, number] {
    const res: [number, number, number] = [
      this.cheatonNPC[0] - this.cheatonNPC[1],
      this.cheatonNPC[2] - this.cheatonNPC[3],
      this.cheatonNPC[4] - this.cheatonNPC[5],
    ];
    this.cheatonNPC[1] = this.cheatonNPC[0];
    this.cheatonNPC[3] = this.cheatonNPC[2];
    this.cheatonNPC[5] = this.cheatonNPC[4];
    this.suspicion = 0;
    this.thinkPCfaithful = true;
    return res;
  }
  public npcConfess(): [number, number, number] {
    const res: [number, number, number] = [
      this.cheatonPC[0] - this.cheatonPC[1],
      this.cheatonPC[2] - this.cheatonPC[3],
      this.cheatonPC[4] - this.cheatonPC[5],
    ];
    this.cheatonPC[1] = this.cheatonPC[0];
    this.cheatonPC[3] = this.cheatonPC[2];
    this.cheatonPC[5] = this.cheatonPC[4];
    this.PCsuspicion = 0;
    this.thinkNPCfaithful = true;
    return res;
  }
}


class NPCrecords {
  public makeout: string[];
  public sex: SexRecord;
  public flag: NPCflags;
  public info: IntNPCRecordInfo;
  public cheat: NPCrecordCheat;
  constructor({makeout, sex, flag, info, cheat}: DataRecord) {
    this.makeout = clone(makeout);
    this.sex = clone(sex);
    this.flag = clone(flag);
    this.info = {
      bodyGeneral: (info != null && info.bodyGeneral != null) ? info.bodyGeneral : false,
      bodyJunk: (info != null && info.bodyJunk != null) ? info.bodyJunk : false,
      bodyTits: (info != null && info.bodyTits != null) ? info.bodyTits : false,
      bodyDetail: (info != null && info.bodyDetail != null) ? info.bodyDetail : false,
      status: (info != null && info.status != null) ? info.status : 0,
      fert: (info != null && info.fert != null) ? info.fert : 0,
      trait: (info != null && info.trait != null) ? info.trait : 0,
      kink: (info != null && info.kink != null) ? info.kink : 0,
      mutate: (info != null && info.mutate != null) ? info.mutate : false,
      core: (info != null && info.core != null) ? info.core : 0,
      pref: (info != null && info.pref != null) ? info.pref : 0,
      sched: (info != null && info.sched != null) ? info.sched : false,
      bGround: (info != null && info.bGround != null) ? info.bGround : 0,
      stories: (info != null && info.stories != null) ? info.stories : [false, false, false, false, false, false, false, false, false],
    };
    this.cheat = new NPCrecordCheat(cheat);
  }
}

