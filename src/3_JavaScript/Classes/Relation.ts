

class Relation {
  public data: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, number, number, number, number, number, number, number, number, number, number, number, number, number, number, boolean, number, string];
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
      this.data = [friend, acquaint, dating, lovers, exclusive, engaged, married, likePC, likeNPC, lovePC, loveNPC, companion, domsub, mesh, daysince, space, dates, hangout, met, sleptover, pcSlept, rejected, rejTime, path];
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
    }
  }
  public get rejected(): boolean {
    return this.data[21];
  }
  public set rejected(val: boolean) {
    if (typeof val !== "boolean") {
      aw.con.warn(`Attempted to set ${this._k} rejected to non-boolean value!`);
    } else {
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
}

