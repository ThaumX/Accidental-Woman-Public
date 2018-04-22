/*
██████╗  ██████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔═══██╗██╔══██╗████╗  ██║
██████╔╝██║   ██║██████╔╝██╔██╗ ██║
██╔═══╝ ██║   ██║██╔══██╗██║╚██╗██║
██║     ╚██████╔╝██║  ██║██║ ╚████║
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝

preparing portraits for game characters
*/
setup.porn = {};

setup.porn.imgid = function(index){
  return ("#pornlay"+index);
};

setup.porn.imgclass = function(index){
  return ("portrait-above"+index);
};

setup.porn.imgElement = function(id,source,classes = 0){
  id = id.trim();
  if (id.slice(0,1) == "#"){
    id = id.slice(1);
  }
  if(classes === 0){
    return `<img id="${id}" data-passage="${source}">`;
  }else{
    return `<img id="${id}" data-passage="${source}" class="${classes}">`;
  }
};

setup.porn.placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEE0AABBNAWeMAeAAAAC7SURBVFhH7dixCcMwEIXhq4TAIFxcYYHBjVfwPJrGw2gXrZIdAvFZWJ2aRA/yPlxd9ZMieY4QEf0Xfy77a61PTHYfrM1a9LD7YKBZkpRZ/ZosDXYdDjTrmDf0rDJ7uw4HmiVTZFa/R1ae7AYANMtpwc7aTmc3AKBZEjKz+tUslMV8qQOVWR3uLJxp+gGaRfQtPqnt5gL6Qgazbeovz/1AfGCPDXg9IHO+/ccGaES4kO1bPkINGyKiXxJ5A/cCjOhWrCv0AAAAAElFTkSuQmCC";

/*refreshes a list of image elements from arrays of jQuery targets and data-passage sources*/
setup.porn.gifrefresh = function (targets,sources){
  //ensure input is arrays
  if(!Array.isArray(targets) || !Array.isArray(sources)){
    return new SyntaxError(`Invalid input to setup.gifrefresh(targets,sources) must both be arrays`);
  }
  //make sure there are a matching number of arguments
  if(targets.length != sources.length){
    return new SyntaxError(`The number of targets(${targets.length}) and sources(${sources.length}) sent to setup.gifrefresh doesn't match!`);
  }
  //actually set image sources - should happen so quickly that they are completely in sync
  for(let i = 0, l = targets.length; i < l; i++){
    $(targets[i]).attr('src', "setup.porn.placeholder");
  }
  console.log(`Now doing refresh for ${targets}`);
  setTimeout(setup.porn.followon(targets,sources),1000);
};

setup.porn.followon = function(targets,sources){
  for(let i = 0, l = targets.length; i < l; i++){
    if (Story.has(sources[i])){
      const passage = Story.get(sources[i]);
      if (passage.tags.includes('Twine.image')) {
        const source = passage.text;
        $(targets[i]).attr('src', source);
      }else{
        return new Error(`invalid image passage type, ${passage.title} is not an image passage.`);
      }
    }else if(setup.imagedata[sources[i]] != null){
      $(targets[i]).attr('src', setup.imagedata[sources[i]]);
    }else{
      return new Error(`invalid image passage name, ${sources[i]} is not a passage.`);
    }
  }
};

setup.porn.preprint = function(imgar) {
  //handle non-array value
  if(!Array.isArray(imgar)){
    imgname = setup.porn.imgElement(setup.porn.imgid(1),imgar,"portrait-above1");
    setup.log(`The image array sent to porn.preprint was not an array, value: ${imgar}`);
    return imgname;
  }
  let targets = "<<set _targ = [", sources = "<<set _sorc = [", output = "", tar;
  for(let i = 0, l = imgar.length; i < l; i++){
    if(imgar[i] != "none"){
      tar = setup.porn.imgid(i);
      targets += '"' + tar + '"';
      sources += '"' + imgar[i] + '"';
      output += setup.porn.imgElement(tar,imgar[i],setup.porn.imgclass(i));
      if(i < (l-1)){
        targets += ",";
        sources += ",";
      }
    }
  }
  targets += "]>>";
  sources += "]>>";
  output += targets;
  output += sources;
  output += "<<run setup.porn.gifrefresh(_targ, _sorc)>>";
  return output;
};

setup.porn.maleNPC = function (npc = 0) {
  //NOTE: npc=0 will need to be removed when proper body parameters are used.
  let imgar = ["none"], race = 1;
  let skinR, hairR, eyeR, browR, beardR, accR, r;
  if(npc == 0){
    if(random(1,14) == 1){
      race = 2;
      skinR = [5,5];
      hairR = [9,10];
      eyeR = [1,12];
      browR = [7,8];
      beardR = [1,5];
      accR = [1,2];
    }else{
      race = 1;
      skinR = [1,4];
      hairR = [1,8];
      eyeR = [1,12];
      browR = [1,7];
      beardR = [3,5];
      accR = [1,6];
    }
  }else{
    switch(npc.body.race){
      case "black":
      case "hispanic":
        race = 2;
        skinR = [5,5];
        hairR = [9,10];
        eyeR = [1,12];
        browR = [7,8];
        beardR = [1,5];
        accR = [1,2];
        break;
      default:
        race = 1;
        skinR = [1,4];
        hairR = [1,8];
        eyeR = [1,12];
        browR = [1,7];
        beardR = [3,5];
        accR = [1,6];
        break;
    }
  }
  let har = random(hairR[0],hairR[1]);
  imgar.push("IMG_skin" + random(skinR[0],skinR[1]));//1
  if (r < 7){
    imgar.push("IMG_HS_" + har);//2
  }else{
    imgar.push("none");//2
  }
  imgar.push("none");//3
  imgar.push("IMG_eyewhite");//4
  imgar.push("IMG_eyecolor_" + random(eyeR[0],eyeR[1]));//5
  imgar.push("IMG_eyeline");//6
  imgar.push("IMG_eyebrow" + random(browR[0],browR[1]));//7
  r = random(beardR[0],beardR[1]);
  if(r < 3){
    imgar.push("IMGbeard" + r);//8
  }else{
    imgar.push("none");//8
  }
  if(random(accR[0],accR[1]) == 1){
    imgar.push("IMG_portAcc");//9
  }else{
    imgar.push("none");//9
  }
  imgar.push("none");//10
  imgar.push("none");//11
  imgar.push("IMGhair_" + har);//12
  return setup.porn.preprint(imgar);
};
