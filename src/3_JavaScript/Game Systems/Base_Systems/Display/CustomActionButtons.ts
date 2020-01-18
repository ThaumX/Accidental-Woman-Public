/*
.  .d8888b.        d8888 888888b.
. d88P  Y88b      d88888 888  "88b
. 888    888     d88P888 888  .88P
. 888           d88P 888 8888888K.
. 888          d88P  888 888  "Y88b
. 888    888  d88P   888 888    888
. Y88b  d88P d8888888888 888   d88P
.  "Y8888P" d88P     888 8888888P"

.  CUSTOM ACTION BUTTONS
*/


class CAB {
  // DECLARATIONS ================================
  public id: string;
  public img: string;
  public text: string;
  public action: string;
  public cond: string;
  public added: number;
  public duration: number;
  public oneTime: boolean;
  // CONSTRUCTOR =================================
  constructor({id, img, text, action, cond, added = -1, duration = -1, oneTime = true}: {id: string, img?: string, text: string, action: string, cond: string, added?: number, duration?: number, oneTime?: boolean}){
    this.id = id;
    if (img == null) {
      this.img = "IMG_QuestActionIcon"; // generic action button
    } else {
      this.img = img;
    }
    if (text == null) {
      this.text = "no description";
    } else {
      this.text = text;
    }
    if (action == null){
      aw.con.warn(`Custom Action Button ID: ${this.id} initialized without a button action!!!`);
      this.action = `<<dialog "error">>There was an error with this action button (${id}). Please report this bug.<</dialog>>`;
    } else {
      this.action = action;
    }
    if (cond == null) {
      aw.con.warn(`Custom Action Button ID: ${this.id} initialized without a button condition.`);
      this.cond = `(function(){return true;})()`;
    } else {
      if (cond.slice(0, 9) !== "(function") {
        cond = "(function(){" + cond + "})()";
      }
      this.cond = cond;
    }
    if (added === -1) {
      this.added = aw.time;
    } else {
      this.added = added;
    }
    this.duration = duration;
    this.oneTime = oneTime;
  }
  // METHODS =====================================
  public kill(): void {
    setup.killCAB(this.id);
  }
  public test(): boolean {
    if (this.duration > 0) {
      if (this.added + this.duration < aw.time) {
        this.kill();
        return false;
      }
    }
    const r = eval(this.cond);
    if (typeof r !== "boolean") {
      aw.con.warn(`Custom Action Button ID: ${this.id} condition check returned non-boolean value`);
      return false;
    }
    return r;
  }
  public print(): string {
    if (this.oneTime) {
      return `<<link [img[${this.text}|${this.img}]]>>${this.action}<<run ↂ.buttons["${this.id}"].kill()>><</link>>`;
    }
    return `<<link [img[${this.text}|${this.img}]]>>${this.action}<</link>>`;
  }
}

setup.killCAB = function(id: string) {
  window.setTimeout(function() {delete ↂ.buttons[id]; }, 500);
};


