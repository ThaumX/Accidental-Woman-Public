

class Timer {
  public name: string;
  public start: time;
  public end: boolean | time;
  public startDate: date;
  public endDate: boolean | date;
  public dur: boolean | number;
  constructor({
    name,
    start = State.variables.time,
    date = State.variables.date,
    end = false,
    endDate = false,
    dur = false,
  }) {
    this.start = jQuery.extend(true, [], start);
    this.startDate = jQuery.extend(true, [], date);
    this.name = name;
    this.end = end;
    if (typeof endDate === "boolean") {
      this.endDate = endDate;
    } else {
      this.endDate = jQuery.extend(true, [], endDate);
    }
    this.dur = dur;
  }
}

