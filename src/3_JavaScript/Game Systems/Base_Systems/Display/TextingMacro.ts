

interface IntTextingMacroContent {
    type: "pc"|"npc";
    text: string;
    delay: string;
}

Macro.add("texting", {
  tags: ["textpc", "textnpc"],
  handler() {
    aw.textingMacroData = [];
    aw.textingMacroCount = 0;
    let wiz = "";
    if (this.payload[0].args[0] != null) {
      wiz = `<div class="tit" style="position:absolute;top:5px;height:40px;right:5px;left:165px;background-color:#aaa;border-top-right-radius:8px;border-bottom-right-radius:4px;margin:0px;text-align:center;color:#222;border-width: 2px;border-style: solid;border-color: #99005b;font-size:1.4rem;">${this.payload[0].args[0].toUpperCase()}</div>`;
    } else {
      wiz = `<div class="tit" style="position:absolute;top:5px;height:40px;right:5px;left:165px;background-color:#aaa;border-top-right-radius:8px;margin:0px;text-align:center;color:#222;border-width: 2px;border-style: solid;border-color: #99005b;font-size:1.4rem;">UNKNOWN</div>`;
    }
    let out = `<div id="textingCuntainer"><div class="textingTitle">Enmity App</div>${wiz}<div id="texting">`;
    const fText = aw.textingMacroData;
    let start = 1;
    const leng = this.payload.length;
    let t:"pc"|"npc";
    let delay;
    for (let i = 1; i < leng; i++) {
      if (this.payload[i].name === "textpc") {
        break;
      } else {
        out += `<div class="textingNPC">${this.payload[i].contents}</div>`;
        start = i + 1;
      }
    }
    out += `</div><div id="textingSendbox"></div><div id="textingSend"><div id="textingTypewriter"><div class="print-line-1 anim-typewriter"><<print setup.fillerText([20,40])>></div></div> [img[IMG-SendMsgIcon]]</div></div><<timed 50ms>><<scri`;
    for (let i = start; i < leng; i++) {
      if (this.payload[i].name === "textpc") {
        t = "pc";
      } else {
        t = "npc";
        if (this.payload[i].args[0] != null && this.payload[i].args[0] !== undefined) {
          delay = Number(this.payload[i].args[0]);
        } else {
          delay = random(1500, 3000) + "ms";
        }
      }
      fText.push({type: t, text: this.payload[i].contents, delay});
    }
    out += `pt>>$("#textingSend").click(function(){setup.textingMacroFunction();});<</scri`;
    out += `pt>><</timed>>`;
    return new Wikifier(this.output, out);
  },
});


setup.textingMacroFunction = function(): void {
    let cunt = aw.textingMacroCount;
    const data = aw.textingMacroData;
    const leng = data.length;
    if (cunt >= leng) {
      aw.replace("#textingSend", "<span class='monospace' style='font-size:0.75rem'>(texting is over)</span>");
      return;
    }
    let pc = false;
    let npc = false;
    let out = "";
    let time = 0;
    for (let i = cunt; i < leng; i++) {
      if (data[i].type === "pc") {
        if (pc) {
          break;
        } else {
          pc = true;
          aw.textingMacroCount = i + 1;
          cunt = i;
          out += `<div class="textingPC zoomInUp animated">${data[i].text}</div><<scrollbottom "texting">>`;
        }
      } else {
        if (npc) {
          aw.textingMacroCount = i + 1;
          cunt = i;
          out += `<<next ${data[i].delay}>>`;
          out += `<div class="textingNPC zoomInUp animated">${data[i].text}</div><<scrollbottom "texting">>`;
          time += Number(data[i].delay.slice(0, -2));
        } else {
          npc = true;
          aw.textingMacroCount = i + 1;
          cunt = i;
          out += `<<timed 1200ms>><<replace "#textingSendbox">><img data-passage="IMG-TypingIndicator" class="zoomIn animated" style="height:45px;width:auto;border-radius:20px;"><</replace>><<next ${data[i].delay}>>`;
          out += `<div class="textingNPC zoomInUp animated">${data[i].text}</div><<scrollbottom "texting">>`;
          time += Number(data[i].delay.slice(0, -2));
        }
      }
    }
    if (data[cunt].type === "npc") {
      out += `<<replace "#textingSendbox">><</replace>><</timed>>`;
    }
    aw.append("#texting", out);
    if (aw.textingMacroCount >= leng) {
      aw.replace("#textingSend", "");
    } else {
      if ("number" !== typeof time || time === 0) {
        time = 1500;
      } else {
        time += 500;
      }
      const tx = `<<timed ${time}ms>><div id="textingTypewriter"><div class="print-line-1 anim-typewriter"><<print setup.fillerText([20,40])>></div></div> [img[IMG-SendMsgIcon]]<</timed>>`;
      aw.replace("#textingSend", tx);
    }
  };

