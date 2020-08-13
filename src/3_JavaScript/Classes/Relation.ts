/*
███╗   ██╗██████╗  ██████╗
████╗  ██║██╔══██╗██╔════╝
██╔██╗ ██║██████╔╝██║
██║╚██╗██║██╔═══╝ ██║
██║ ╚████║██║     ╚██████╗
╚═╝  ╚═══╝╚═╝      ╚═════╝

██████╗ ███████╗██╗  ██╗██╗██████╗
██╔══██╗██╔════╝██║  ██║██║██╔══██╗
██████╔╝███████╗███████║██║██████╔╝
██╔══██╗╚════██║██╔══██║██║██╔═══╝
██║  ██║███████║██║  ██║██║██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝
*/

/*************************************************
Notes:
this.category returns highest relationship
like/lovePC is how much the NPC likes/loves the PC
like/loveNPC is how much the PC likes/loves this NPC
friendTime etc records the awTime that the status changed.
  negative time is the time that the relationship level was broken (like breaking up)

*************************************************/

class Relation {
  public data: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, number, number, number, number, number, number, number, number, number, number, number, number, number, number, boolean, number, string, number, number, number, number, number, number, number];
  public _k: string;
  constructor(key, {
    friend,
    acquaint,
    dating,
    lovers,
    exclusive,
    engaged,
    married,
    likePC,
    likeNPC,
    lovePC,
    loveNPC,
    companion,
    domsub,
    mesh,
    daysince,
    space,
    dates,
    hangout,
    met,
    sleptover,
    pcSlept,
    rejected,
    data,
  }: DataRship) {
    this._k = key;
    if (data == null) {
      if (rejected == null) {
        rejected = false;
      }
      const rejTime = 0;
      const path = "none";
      const time = aw.time;
      const f = [
        (friend) ? time : 0,
        (acquaint) ? time : 0,
        (dating) ? time : 0,
        (lovers) ? time : 0,
        (exclusive) ? time : 0,
        (engaged) ? time : 0,
        (married) ? time : 0,
      ];
      this.data = [friend, acquaint, dating, lovers, exclusive, engaged, married, likePC, likeNPC, lovePC, loveNPC, companion, domsub, mesh, daysince, space, dates, hangout, met, sleptover, pcSlept, rejected, rejTime, path, f[0], f[1], f[2], f[3], f[4], f[5], f[6]];
    } else {
      this.data = clone(data);
    }
  }
  public get category(): string {
    if (this.married) {
      return "married";
    } else if (this.engaged) {
      return "engaged";
    } else if (this.lovers) {
      return "lovers";
    } else if (this.exclusive) {
      return "exclusive";
    } else if (this.dating) {
      return "dating";
    } else if (this.friend) {
      return "friend";
    } else if (this.acquaint) {
      return "acquaint";
    }
    return "none";
  }
  public get dom(): number {
    return Math.max(0, (this.domsub - 50));
  }
  public get sub(): number {
    return Math.max(0, (50 - this.domsub));
  }
  public addDom(amt: number): void {
    if (aw.npc[this._k].kink.sub) {
      amt = Math.ceil(amt / 2);
    }
    if (aw.npc[this._k].kink.dom) {
      amt = Math.floor(amt * 2);
    }
    this.domsub += amt;
  }
  public addSub(amt: number): void {
    if (aw.npc[this._k].kink.sub) {
      amt = Math.floor(amt * 2);
    }
    if (aw.npc[this._k].kink.dom) {
      amt = Math.ceil(amt / 2);
    }
    this.domsub -= amt;
  }
  public get friend(): boolean {
    return this.data[0];
  }
  public set friend(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} friend to non-boolean value!`);
    } else {
      if (this.data[0] !== val) { // make sure it's a change from previous condition
        if (val) { // starting rship
          this.friendTime = aw.time;
          this.path = "friend";
          if (!setup.npc.friends.includes(this._k)) {
            setup.npc.friends.push(this._k);
          }
          this.rejected = false;
        } else { // ending the rship
          this.friendTime = aw.time * -1;
          setup.npc.friends.delete(this._k);
        }
      }
      this.data[0] = val;
    }
  }
  public get acquaint(): boolean {
    return this.data[1];
  }
  public set acquaint(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} acquaint to non-boolean value!`);
    } else {
      if (this.data[1] !== val) {
        if (val) { // starting rship
          this.acquaintTime = aw.time;
          if (!setup.npc.acquainted.includes(this._k)) {
            setup.npc.acquainted.push(this._k);
          }
          this.rejected = false;
        } else { // ending the rship
          this.acquaintTime = aw.time * -1;
          setup.npc.acquainted.delete(this._k);
        }
      }
      this.data[1] = val;
    }
  }
  public get dating(): boolean {
    return this.data[2];
  }
  public set dating(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} dating to non-boolean value!`);
    } else {
      if (this.data[2] !== val) {
        if (val) { // starting rship
          this.datingTime = aw.time;
          this.path = "date";
          if (!setup.npc.interested.includes(this._k)) {
            setup.npc.interested.push(this._k);
          }
          if (!setup.npc.fling.includes(this._k)) {
            // TODO check if actually had sex first
            setup.npc.fling.push(this._k);
          }
          this.rejected = false;
        } else { // ending the rship
          this.datingTime = aw.time * -1;
          setup.npc.interested.delete(this._k);
          // we don't add to exes because this is just a casual rship at this point.
          this.exclusive = false;
          this.lovers = false;
        }
      }
      this.data[2] = val;
    }
  }
  public get lovers(): boolean {
    return this.data[3];
  }
  public set lovers(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} lovers to non-boolean value!`);
    } else {
      if (this.data[3] !== val) {
        if (val) { // starting rship
          this.loversTime = aw.time;
          if (!setup.npc.lover.includes(this._k)) {
            setup.npc.lover.push(this._k);
          }
          this.rejected = false;
        } else { // ending the rship
          this.loversTime = aw.time * -1;
          setup.npc.lover.delete(this._k);
          if (!setup.npc.exes.includes(this._k)) {
            setup.npc.exes.push(this._k);
          }
          this.exclusive = false;
          this.dating = false;
        }
      }
      this.data[3] = val;
    }
  }
  public get exclusive(): boolean {
    return this.data[4];
  }
  public set exclusive(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} exclusive to non-boolean value!`);
    } else {
      if (this.data[4] !== val) {
        if (val) { // starting rship
          this.exclusiveTime = aw.time;
          if (!setup.npc.rShip.includes(this._k)) {
            setup.npc.rShip.push(this._k);
          }
          setup.npc.fling.delete(this._k); // no longer a fling
          this.rejected = false;
        } else { // ending the rship
          this.exclusiveTime = aw.time * -1;
          setup.npc.rShip.delete(this._k);
          if (!setup.npc.exes.includes(this._k)) {
            setup.npc.exes.push(this._k);
          }
          this.lovers = false;
          this.dating = false;
        }
      }
      this.data[4] = val;
    }
  }
  public get engaged(): boolean {
    return this.data[5];
  }
  public set engaged(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} engaged to non-boolean value!`);
    } else {
      if (this.data[5] !== val) {
        if (val) { // starting rship
          this.engagedTime = aw.time;
          this.rejected = false;
        } else { // ending the rship
          this.engagedTime = aw.time * -1;
          if (!setup.npc.exes.includes(this._k)) {
            setup.npc.exes.push(this._k);
          }
          this.exclusive = false;
          this.lovers = false;
          this.dating = false;
        }
      }
      this.data[5] = val;
    }
  }
  public get married(): boolean {
    return this.data[6];
  }
  public set married(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} married to non-boolean value!`);
    } else {
      if (this.data[6] !== val) {
        if (val) { // starting rship
          this.marriedTime = aw.time;
          this.rejected = false;
        } else { // ending the rship
          this.marriedTime = aw.time * -1;
          if (!setup.npc.exes.includes(this._k)) {
            setup.npc.exes.push(this._k);
          }
          setup.npc.lover.delete(this._k);
          setup.npc.interested.delete(this._k);
          setup.npc.rShip.delete(this._k);
          this.engaged = false;
          this.exclusive = false;
          this.lovers = false;
          this.dating = false;
        }
      }
      this.data[6] = val;
    }
  }
  public get likePC(): number {
    return this.data[7];
  }
  public set likePC(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} likePC to non-number value!`);
    } else {
      this.data[7] = Math.min(100, Math.max(-100, val));
    }
  }
  public get likeNPC(): number {
    return this.data[8];
  }
  public set likeNPC(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} likeNPC to non-number value!`);
    } else {
      this.data[8] = Math.min(100, Math.max(-100, val));
    }
  }
  public get lovePC(): number {
    return this.data[9];
  }
  public set lovePC(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} lovePC to non-number value!`);
    } else {
      this.data[9] = Math.min(100, Math.max(-100, val));
    }
  }
  public get loveNPC(): number {
    return this.data[10];
  }
  public set loveNPC(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} loveNPC to non-number value!`);
    } else {
      this.data[10] = Math.min(100, Math.max(-100, val));
    }
  }
  public get companion(): number {
    return this.data[11];
  }
  public set companion(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} companion to non-number value!`);
    } else {
      this.data[11] = Math.min(100, Math.max(0, val));
    }
  }
  public get domsub(): number {
    return this.data[12];
  }
  public set domsub(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} domsub to non-number value!`);
    } else {
      this.data[12] = Math.min(100, Math.max(0, val));
    }
  }
  public get mesh(): number {
    return this.data[13];
  }
  public set mesh(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} mesh to non-number value!`);
    } else {
      this.data[13] = Math.min(100, Math.max(0, val));
    }
  }
  public get daysince(): number {
    return this.data[14];
  }
  public set daysince(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} daysince to non-number value!`);
    } else {
      this.data[14] = Math.max(0, val);
    }
  }
  public get space(): number {
    return this.data[15];
  }
  public set space(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} space to non-number value!`);
    } else {
      this.data[15] = Math.min(100, Math.max(0, val));
    }
  }
  public get dates(): number {
    return this.data[16];
  }
  public set dates(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} dates to non-number value!`);
    } else {
      this.daysince = 0;
      this.met += 1;
      this.data[16] = Math.max(0, val);
    }
  }
  public get hangout(): number {
    return this.data[17];
  }
  public set hangout(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} hangout to non-number value!`);
    } else {
      this.daysince = 0;
      this.met += 1;
      this.data[17] = Math.max(0, val);
    }
  }
  public get met(): number {
    return this.data[18];
  }
  public set met(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} met to non-number value!`);
    } else {
      this.data[18] = Math.max(0, val);
      this.companion += 15;
    }
  }
  public get sleptover(): number {
    return this.data[19];
  }
  public set sleptover(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} sleptover to non-number value!`);
    } else {
      this.data[19] = Math.max(0, val);
      this.companion += 25;
    }
  }
  public get pcSlept(): number {
    return this.data[20];
  }
  public set pcSlept(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} pcSlept to non-number value!`);
    } else {
      this.data[20] = Math.max(0, val);
      this.companion += 25;
    }
  }
  public get rejected(): boolean {
    return this.data[21];
  }
  public set rejected(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} rejected to non-boolean value!`);
    } else {
      if (val) {
        this.rejTime = aw.time;
      } else {
        this.rejTime = 0;
      }
      this.data[21] = val;
    }
  }
  public get rejTime(): number {
    return this.data[22];
  }
  public set rejTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} rejTime to non-number value!`);
    } else {
      this.data[22] = val;
    }
  }
  public get path(): string {
    return this.data[23];
  }
  public set path(val: string) {
    if (typeof val !== "string") {
      aw.con.warn(`Attempted to set ${this._k} path to non-string value!`);
    } else {
      this.data[23] = val;
    }
  }
  public get friendTime(): number {
    return this.data[24];
  }
  public set friendTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} friendTime to non-number value!`);
    } else {
      this.data[24] = val;
    }
  }
  public get acquaintTime(): number {
    return this.data[25];
  }
  public set acquaintTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} acquaintTime to non-number value!`);
    } else {
      this.data[25] = val;
    }
  }
  public get datingTime(): number {
    return this.data[26];
  }
  public set datingTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} datingTime to non-number value!`);
    } else {
      this.data[26] = val;
    }
  }
  public get loversTime(): number {
    return this.data[27];
  }
  public set loversTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} loversTime to non-number value!`);
    } else {
      this.data[27] = val;
    }
  }
  public get exclusiveTime(): number {
    return this.data[28];
  }
  public set exclusiveTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} exclusiveTime to non-number value!`);
    } else {
      this.data[28] = val;
    }
  }
  public get engagedTime(): number {
    return this.data[29];
  }
  public set engagedTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} engagedTime to non-number value!`);
    } else {
      this.data[29] = val;
    }
  }
  public get marriedTime(): number {
    return this.data[30];
  }
  public set marriedTime(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`Attempted to set ${this._k} marriedTime to non-number value!`);
    } else {
      this.data[30] = val;
    }
  }
  public breakUp(): void {
    this.engaged = false;
    this.lovers = false;
    this.exclusive = false;
    this.dating = false;
    this.lovePC -= 30;
    this.likePC -= 20;
    if (this._k === ↂ.flag.liveWith) {
      setup.rship.moveOut();
    }
  }
}

