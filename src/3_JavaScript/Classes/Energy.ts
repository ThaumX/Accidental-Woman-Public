interface EnergyData {
  amt: number;
  rate: number;
  regen: boolean;
  max: number;
  data?: [number, number, boolean, number];
}

class Energy {
  public data: [number, number, boolean, number];
  constructor({
    amt,
    rate,
    regen,
    max,
    data}: EnergyData) {
    if (data == null) {
      if (max == null) {
        max = 6;
      }
      this.data = [amt, rate, regen, max];
    } else {
      this.data = clone(data);
    }
  }
  public get amt(): number {
    return this.data[0];
  }
  public set amt(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set energy.amt to a non-number value!.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    if (this.data[3] != null && val > this.data[3]) {
      val = this.data[3];
      aw.con.info(`energy.amt tried to exceed energy.max`);
    }
    this.data[0] = val;
  }
  public get rate(): number {
    return this.data[1];
  }
  public set rate(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set energy.rate to a non-number value!.`);
      return;
    }
    if (val < 0) {
      val = 0;
    }
    this.data[1] = val;
  }
  public get regen(): boolean {
    return this.data[2];
  }
  public set regen(val: boolean) {
    if (typeof val === "boolean") {
      aw.con.warn(`attempted to set energy.regen to a non-number value!.`);
      return;
    }
    this.data[2] = val;
  }
  public get max(): number {
    return this.data[3];
  }
  public set max(val: number) {
    val = Number(val);
    if (isNaN(val)) {
      aw.con.warn(`attempted to set energy.max to a non-number value!.`);
      return;
    }
    if (val < 2) {
      val = 2;
    }
    if (val > 12) {
      val = 12;
    }
    this.data[3] = val;
  }
}






