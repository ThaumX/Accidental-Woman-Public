

class NPCrecords {
  public makeout: string[];
  public sex: SexRecord;
  public flag: NPCflags;
  public info: IntNPCRecordInfo;
  constructor({makeout, sex, flag, info}: DataRecord) {
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
    };
  }
}

