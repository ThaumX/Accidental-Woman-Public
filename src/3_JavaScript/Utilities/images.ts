/*
██╗███╗   ███╗ █████╗  ██████╗ ███████╗███████╗
██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝██╔════╝
██║██╔████╔██║███████║██║  ███╗█████╗  ███████╗
██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝  ╚════██║
██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗███████║
╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
*/
// ensure namespace
if (aw.imagedata == null) {
  aw.imagedata = {};
}
if (setup.imageloaded == null) {
  setup.imageloaded = false;
  setup.imageVersion = 0;
  setup.totalloadedimages = 0;
  setup.fload = 0;
}
setup.loadcunt = 0;

setup.loadImages = function(textdata: string, fname: string= "missing"): void {
  if (textdata == null) {
    $("#outputcodeblock").prepend(`<span class="bad">${fname} is null/invalid.</span><br>`);
    setTimeout(() => setup.imgbaradd());
    setup.imgwait();
    return;
  }
  let imgcunt = 0;
  let ovrwrite = 0;
  const atb = {
    fileNum: 0,
    imgCount: 0,
    imgTotal: 0,
    head: 0,
    name: "",
  };
  const data = textdata.split("|::|");
  const length = data.length;
  const regie = new RegExp(/(AWRtypeA-images\|-\|)([0-9]+)(\|-\|)([0-9]+)(\|-\|)([0-9]+)$/);
  /*const errorimg = "data:image/png;base64,
  iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEE
  0AABBNAWeMAeAAAAC7SURBVFhH7dixCcMwEIXhq4TAIFxcYYHBjVfwPJrGw2gXrZIdAvFZWJ2aRA/yPlxd9ZMieY4QEf0Xfy77
  a61PTHYfrM1a9LD7YKBZkpRZ/ZosDXYdDjTrmDf0rDJ7uw4HmiVTZFa/R1ae7AYANMtpwc7aTmc3AKBZEjKz+tUslMV8qQOVWR
  3uLJxp+gGaRfQtPqnt5gL6Qgazbeovz/1AfGCPDXg9IHO+/ccGaES4kO1bPkINGyKiXxJ5A/cCjOhWrCv0AAAAAElFTkSuQmCC";*/
  if (length < 2) {
    $("#outputcodeblock").prepend(`<span class="bad">${fname} is empty or invalid (invalid length)</span><br>`);
    setTimeout(() => setup.imgbaradd());
    setup.imgwait();
    return;
  }
  if (regie.test(data[0].trim())) {
    const it = data[0].split("|-|");
    atb.name = it[0];
    atb.imgCount = Number(it[1].trim());
    atb.fileNum = Number(it[2].trim());
    atb.imgTotal = Number(it[3].trim());
  } else {
    $("#outputcodeblock").prepend(`<span class="bad">${fname}: bad file header error</span><br>`);
    setTimeout(() => setup.imgbaradd());
    setup.imgwait();
    return;
  }
  for (let i = 1; i < length; i++) {
    const itm = data[i].split("|-|");
    if (itm.length !== 2) {
      $("#outputcodeblock").prepend(`<span class="bad">${fname}: corrupt image ${i} of ${atb.imgCount}. Skipping.</span><br>`);
      // console.log(`Corrupt - image ${i} of ${atb.imgCount}. Skipping image.`);
      setup.imgbaradd(true, atb.imgCount);
    } else {
      if (itm[0].length < 40) {
        const y = (aw.imagedata[itm[0].trim()] == null) ? true : false;
        aw.imagedata[itm[0].trim()] = itm[1].trim();
        if (aw.imagedata[itm[0].trim()] == null) {
          $("#outputcodeblock").prepend(`<span class="bad">${fname}: unable to decompress image ${i} of ${atb.imgCount}. Skipping.</span><br>`);
          setTimeout(() => setup.imgbaradd(true, atb.imgCount));
        } else {
          imgcunt += 1;
          ovrwrite += y ? 0 : 1;
          setTimeout(() => setup.imgbaradd(true, atb.imgCount));
        }
      } else {
        $("#outputcodeblock").prepend(`<span class="bad">${fname}: invalid name error for image ${i} of ${atb.imgCount}. Skipping.</span><br>`);
        setTimeout(() => setup.imgbaradd(true, atb.imgCount));
      }
    }
  }
  if (atb.imgCount > imgcunt) {
    UI.alert(`The resource file ${fname}: has ${setup.imageVersion} assets, but only ${imgcunt} were able to be added! The game will continue, however your resource file may be corrupt.`);
  }
  setup.totalloadedimages += (imgcunt - ovrwrite);
  setup.imageAWRlist(fname);
  setup.imgwait();
};

setup.fwait = 0;


setup.imgwait = function(): void {
  setup.fload += 1;
  if (setup.fload >= setup.fwait) {
    setup.imageloaded = true;
    State.active.variables.imageloaded = true;
    setup.imgbaradd(true, -10);
    if (aw.awrList.length !== 0) {
      UI.alert(`!MISSING FILES! It looks like you're missing these awr files (or have an out-of-date version): \n${aw.awrList.join("\n")}`);
    }
    setTimeout(function() {Engine.play("Start", true); }, 1000);
  }
};

setup.imgbarinit = function(numFiles: number): void {
  State.temporary.imgbarmax = (numFiles * 200);
  State.temporary.imgbarnum = 0;
};

setup.imageAWRlist = function(name: string): void {
  const list = aw.awrList;
  const reg = new RegExp(/\.(awr|AWR)/);
  if (reg.test(name)) {
    name = name.slice(0, -4);
  }
  if (list.includes(name)) {
    list.delete(name);
    const id = "#" + name;
    $(id).remove();
  }
  aw.awrMissing = list.length;
};

setup.imgbaradd = function(img: string|false = false, totimg: number = 0): void {
  let bar;
  let bartext;
  let fin = false;
  if (!img) {
    State.temporary.imgbarnum += 100;
  } else if (totimg > 0) {
    State.temporary.imgbarnum += (100 / totimg);
  } else if (totimg < 0) {
    State.temporary.imgbarnum = State.temporary.imgbarmax;
    fin = true;
  }
  if ((State.temporary.imgbarnum / State.temporary.imgbarmax) > 0.99) {
    bar = "99";
  } else {
    bar = Math.round((State.temporary.imgbarnum / State.temporary.imgbarmax) * 100);
  }
  bartext = (fin) ? "Loading Finished!" : `Progress: ${(bar + 1)}%`;
  const foo = `<ul id='skill' class='megrim' style='width:80%;text-align:left;margin:0;'><li><span id='pBar' class='bar' style='width:${bar}%; background-color:#35d3ff;'></span><p class='bartext megrim white'><span id='pBarText' class= 'infoLink' style='font-size:1.3rem;font-weight:bold;'>${bartext}</span></p></li></ul>`;
  $("#loadBarContainer").empty().append(foo);
};


setup.newImageLoader = function(): void {
  const dataNames = ["AWprimary1", "AWprimary2", "Ainfo", "Binterface", "Cmisc", "Dmap", "Eassets", "Fportrait"];
  let fileImgCunt = 0;
  const fVer: string[] = [];
  const counters: string[] = [];
  for (let i = 0, c = dataNames.length; i < c; i++) {
    if (window[dataNames[i]] == null) {
      aw.replace("#testingloaderdiv", `<div style='position:fixed;top:10%;bottom:10%;left:10%;right:10%;z-index:99999999;background-color:#222;color:#ffce54;border-width:4px;border-style:solid:border-color:#ffce54;border-radius:10px;padding:15px;text-align:justify;font-size:22px;font-family:Questrial;'><<include [[StartMissingFileWarning]]>></div>`);
      return;
    }
    fileImgCunt += window[dataNames[i]].imgCount;
    fVer.push(window[dataNames[i]].fVer);
    $("#outputcodeblock").prepend(`Successfully found data file ${dataNames[i]}. (${window[dataNames[i]].imgCount} images)<br>`);
  }
  State.temporary.imgbarmax = fileImgCunt;
  setup.loadcunt = 0;
  if (aw.imagedata == null) {
    aw.imagedata = {};
  }
  const $cock = $("#imgpbar").progressbar("widget");
  function cocker(dataName: string, callback: () => void): void {
    const keys = Object.keys(window[dataName]);
    const asa = [0, 0];
    const d: number = keys.length;
    let j: number = 0;
    (function loadImage() {
      if (keys[j] !== "imgCount" && keys[j] !== "fVer") {
        aw.imagedata[keys[j]] = window[dataName][keys[j]];
        setup.loadcunt ++;
      } else if (keys[j] === "imgCount") {
        asa[0] = window[dataName][keys[j]];
      } else if (keys[j] === "fVer") {
        asa[1] = window[dataName][keys[j]];
      }
      $cock.progressbar("value", setup.loadcunt);
      j++;
      if (j < d) {
        setTimeout(loadImage, 0);
      } else {
        counters.push(`${asa[0]}|v${asa[1]}`);
        const jizz = setup.loadcunt;
        aw.con.info(`Image progress: ${jizz}`);
        $("#outputcodeblock").prepend(`Successfully Initialized ${dataName}!<br>`);
        console.log(`${dataName} Initialized.`);
        callback();
      }
    })();
  }
  function leilanz() {
    cocker(dataNames[0], function() {
      morkovka();
    });
  }
  function morkovka() {
    cocker(dataNames[1], function() {
      asa();
    });
  }
  function asa() {
    cocker(dataNames[2], function() {
      jimbo();
    });
  }
  function jimbo() {
    cocker(dataNames[3], function() {
      besty();
    });
  }
  function besty() {
    cocker(dataNames[4], function() {
      atergale();
    });
  }
  function atergale() {
    cocker(dataNames[5], function() {
      witcherCain();
    });
  }
  function witcherCain() {
    cocker(dataNames[6], function() {
      omi();
    });
  }
  function omi() {
    cocker(dataNames[7], function () {
      mahesvara();
    });
  }
  function mahesvara() {
    setup.imageloaded = true;
    State.active.variables.imageloaded = true;
    setup.totalloadedimages = Object.keys(aw.imagedata).length;
    if (setup.totalloadedimages < setup.expectedImageLength) {
      let ex = false;
      if (State.active.variables.swim === "[dev]") {
        ex = true;
      } else if ((setup.totalloadedimages + 2) < setup.expectedImageLength) {
        ex = true;
      }
      if (ex) {
        aw.replace("#testingloaderdiv", `<div style='position:fixed;top:10%;bottom:10%;left:10%;right:10%;z-index:99999999;background-color:#222;color:#ffce54;border-width:4px;border-style:solid:border-color:#ffce54;border-radius:10px;padding:15px;text-align:justify;font-size:22px;font-family:Questrial;'><<include [[StartTooFewImagesWarning]]>><div style="position:absolute;height:35px;bottom:3px;left:10px;">Images P:${counters[0]} A:${counters[1]} B:${counters[2]} C:${counters[3]} D:${counters[4]} E:${counters[5]} F:${counters[6]}</div></div>`);
        return;
      }
    }
    setTimeout(owym, 150);
  }
  function owym(){
    for (let i = 0, c = dataNames.length; i < c; i++) {
      delete window[dataNames[i]];
    }
    $("#imgpbar").progressbar("destroy");
    Engine.play("Start", true);
  }
  setTimeout(leilanz, 100);
};

setup.nimgbaradd = function(): void {
  
};
// aw.imagedata



