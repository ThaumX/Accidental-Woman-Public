/*
██╗███╗   ███╗ █████╗  ██████╗ ███████╗███████╗
██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝██╔════╝
██║██╔████╔██║███████║██║  ███╗█████╗  ███████╗
██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝  ╚════██║
██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗███████║
╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
*/
//ensure namespace
if (aw.imagedata == null){
  aw.imagedata = {};
}
if (setup.imageloaded == null){
  setup.imageloaded = false;
  setup.imageVersion = 0;
  setup.totalloadedimages = 0;
  setup.fload = 0;
}
/*
setup.loadImages = function (textdata){
  if(textdata == null){
    return new Error(`Empty or invalid file provided to loadImages function!`);
  }else if("string" != typeof textdata){
    return new Error(`Invalid datatype sent to loadImages function!`);
  }
  if(State.variables.AW.forceloadimg == null){
    State.variables.AW.forceloadimg = false;
  }
  let imgcunt = 0;
  const data = textdata.split("|::|"),
    length = data.length,
    pattern = new RegExp(/version-[0-9]+$/),
    errorimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEE0AABBNAWeMAeAAAAC7SURBVFhH7dixCcMwEIXhq4TAIFxcYYHBjVfwPJrGw2gXrZIdAvFZWJ2aRA/yPlxd9ZMieY4QEf0Xfy77a61PTHYfrM1a9LD7YKBZkpRZ/ZosDXYdDjTrmDf0rDJ7uw4HmiVTZFa/R1ae7AYANMtpwc7aTmc3AKBZEjKz+tUslMV8qQOVWR3uLJxp+gGaRfQtPqnt5gL6Qgazbeovz/1AfGCPDXg9IHO+/ccGaES4kO1bPkINGyKiXxJ5A/cCjOhWrCv0AAAAAElFTkSuQmCC";
  if(pattern.test(data[0].trim())){
    let v = Number(data[0].trim().slice(8));
    setup.imageVersion = v;
    /*if(setup.imageVersion == null || "string" == typeof setup.imageVersion || v >= setup.imageVersion){
      if(v === setup.imageVersion){
        setup.AW.notify(`Reloading current system version from file (${v}).`,0,"orange big");
      }
      setup.imageVersion = v;
    }else if(State.variables.AW.forceloadimg != null && State.variables.AW.forceloadimg){
      console.log(`Player is force-loading an older awr file, system version: ${setup.imageVersion}, loaded version: ${v}.`);
      setup.AW.notify(`Loading OUT-OF-DATE resource file! system: ${setup.imageVersion}, new: ${v}.`,0,"bad big");
    }else{
      return new Error(`Provided .awr file is out of date! file version: ${v}, system version: ${setup.imageVersion} - image load aborted.`);
    }
  }else{
    return new Error(`Provided file is corrupt or incorrect (error 1). Image load aborted.`);
  }
  if(setup.imageVersion == setup.latestresourceversion && length < setup.expectedImageLength){
    alert(`The resource file you loaded has ${setup.expectedImageLength} assets, but only ${length} were detected! The game will continue, however your resource file may be corrupt.`);
    /*if(State.variables.AW.forceloadimg != null && State.variables.AW.forceloadimg){
      console.log(`Player force-loaded probably-corrupt file`);
      setup.AW.notify(`Loading resource file that is probably corrupt...`,0,"bad big");
    }else{
      return new Error(`Provided file is corrupt or incorrect (error 2). Image load aborted.`);
    }
  }else if(setup.imageVersion < setup.latestresourceversion){
    alert(`The resource file you loaded is version ${setup.imageVersion}, but the current version is ${setup.latestresourceversion}. The game will probably still work okay, however you may see missing images or possibly even encounter bugs. For the best results, download the newest awr resource file.`);
  }
  for(let i = 1; i < length; i++){
    let itm = data[i].split("|-|");
    if(itm.length > 2){
      let m = `Corrupt file warning (error 3) for image ${i}. Skipping image.`;
      alert(m);
      console.log(m);
      for(let j = 0; j < itm.length; j++){
        if (itm[j].length < 40){
          if(aw.imagedata[itm[j]] == null){
            aw.imagedata[itm[j]] = errorimg;
          }
        }
      }
    }else{
      if(itm[0].length < 40){
        aw.imagedata[itm[0]] = itm[1];
        imgcunt += 1;
      }else{
        let m = `Corrupt file warning (error 3) for image ${i}. Skipping image.`;
        alert(m);
        console.log(m);
      }
    }
  }
  setup.totalloadedimages += imgcunt;
  setup.imageloaded = true;
  State.active.variables.imageloaded = true;
  Engine.play("Start", true);
};*/
//aw.code.decompressFromUTF16(file)
setup.loadImages = function (textdata,fname="missing"){
  if(textdata == null){
    $("#outputcodeblock").prepend(`<span class="bad">${fname} is null/invalid.</span><br>`);
    setTimeout(setup.imgbaradd());
    setup.imgwait();
    return;
  }
  let imgcunt = 0, ovrwrite = 0;
  let atb = {
    fileNum: 0,
    imgCount: 0,
    imgTotal: 0,
    head: 0,
  };
  const data = textdata.split("|::|");
  const length = data.length;
  const regie = new RegExp(/(AWRtypeA-images\|-\|)([0-9]+)(\|-\|)([0-9]+)(\|-\|)([0-9]+)$/);
  /*const errorimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEE0AABBNAWeMAeAAAAC7SURBVFhH7dixCcMwEIXhq4TAIFxcYYHBjVfwPJrGw2gXrZIdAvFZWJ2aRA/yPlxd9ZMieY4QEf0Xfy77a61PTHYfrM1a9LD7YKBZkpRZ/ZosDXYdDjTrmDf0rDJ7uw4HmiVTZFa/R1ae7AYANMtpwc7aTmc3AKBZEjKz+tUslMV8qQOVWR3uLJxp+gGaRfQtPqnt5gL6Qgazbeovz/1AfGCPDXg9IHO+/ccGaES4kO1bPkINGyKiXxJ5A/cCjOhWrCv0AAAAAElFTkSuQmCC";*/
  if(length < 2){
    $("#outputcodeblock").prepend(`<span class="bad">${fname} is empty or invalid (invalid length)</span><br>`);
    setTimeout(setup.imgbaradd());
    setup.imgwait();
    return;
  }
  if(regie.test(data[0].trim())){
    let it = data[0].split("|-|");
    atb.name = it[0];
    atb.imgCount = Number(it[1].trim());
    atb.fileNum = Number(it[2].trim());
    atb.imgTotal = Number(it[3].trim());
  }else{
    $("#outputcodeblock").prepend(`<span class="bad">${fname}: bad file header error</span><br>`);
    setTimeout(setup.imgbaradd());
    setup.imgwait();
    return;
  }
  for(let i = 1; i < length; i++){
    let itm = data[i].split("|-|");
    if(itm.length != 2){
      $("#outputcodeblock").prepend(`<span class="bad">${fname}: corrupt image ${i} of ${atb.imgCount}. Skipping.</span><br>`);
      //console.log(`Corrupt - image ${i} of ${atb.imgCount}. Skipping image.`);
      setup.imgbaradd(true,atb.imgCount);
    }else{
      if(itm[0].length < 40){
        let y = (aw.imagedata[itm[0].trim()] == null) ? true : false;
        aw.imagedata[itm[0].trim()] = itm[1].trim();
        if(aw.imagedata[itm[0].trim()] == null){
          $("#outputcodeblock").prepend(`<span class="bad">${fname}: unable to decompress image ${i} of ${atb.imgCount}. Skipping.</span><br>`);
          setTimeout(setup.imgbaradd(true,atb.imgCount));
        }else{
          imgcunt += 1;
          ovrwrite += y ? 0 : 1;
          setTimeout(setup.imgbaradd(true,atb.imgCount));
        }
      }else{
        $("#outputcodeblock").prepend(`<span class="bad">${fname}: invalid name error for image ${i} of ${atb.imgCount}. Skipping.</span><br>`);
        setTimeout(setup.imgbaradd(true,atb.imgCount));
      }
    }
  }
  if(atb.imgCount > imgcunt){
    alert(`The resource file ${fname}: has ${setup.imageVersion} assets, but only ${imgcunt} were able to be added! The game will continue, however your resource file may be corrupt.`);
  }
  setup.totalloadedimages += (imgcunt - ovrwrite);
  setup.imageAWRlist(fname);
  setup.imgwait();
};

setup.fwait = 0;
setup.imgwait = function(){
  setup.fload += 1;
  if(setup.fload >= setup.fwait){
    setup.imageloaded = true;
    State.active.variables.imageloaded = true;
    setup.imgbaradd(true,-10);
    if(aw.awrList.length !== 0){
      alert(`!MISSING FILES! It looks like you're missing these awr files (or have an out-of-date version): \n${aw.awrList.join("\n")}`);
    }
    setTimeout(function(){Engine.play("Start", true);},1000);
  }
};

setup.imgbarinit = function(numFiles){
  State.temporary.imgbarmax = (numFiles * 200);
  State.temporary.imgbarnum = 0;
};

setup.imageAWRlist = function(name){
  let list = aw.awrList;
  const reg = new RegExp(/\.(awr|AWR)/);
  if(reg.test(name)){
    name = name.slice(0,-4);
  }
  if(list.includes(name)){
    list.delete(name);
    let id = "#" + name;
    $(id).remove();
  }
  aw.awrMissing = list.length;
};

setup.imgbaradd = function (img = false, totimg = 0){
  let bar, bartext, fin = false;
  if(!img){
    State.temporary.imgbarnum += 100;
  }else if(totimg > 0){
    State.temporary.imgbarnum += (100 / totimg);
  }else if(totimg < 0){
    State.temporary.imgbarnum = State.temporary.imgbarmax;
    fin = true;
  }
  if((State.temporary.imgbarnum / State.temporary.imgbarmax) > 0.99){
    bar = "99";
  }else{
    bar = Math.round((State.temporary.imgbarnum / State.temporary.imgbarmax)*100);
  }
  bartext = (fin) ? "Loading Finished!" : `Progress: ${(bar+1)}%`;
  let foo = `<ul id='skill' class='megrim' style='width:80%;text-align:left;margin:0;'><li><span id='pBar' class='bar' style='width:${bar}%; background-color:#35d3ff;'></span><p class='bartext megrim white'><span id='pBarText' class= 'infoLink' style='font-size:130%;font-weight:bold;'>${bartext}</span></p></li></ul>`;
  $("#loadBarContainer").empty().append(foo);
};






