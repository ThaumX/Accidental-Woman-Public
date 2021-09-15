

setup.getImageDimensions = function(file) {
  return new Promise (function(resolved, rejected) {
    const i = new Image();
    i.onload = function() {
      resolved({w: i.width, h: i.height});
    };
    i.src = file;
  });
};

setup.printGameImages = function(cuntID) {
  const keys = Object.keys(aw.imagedata);
  async function whyf(elem) {
    let output = '<div id="GameImageContainer"></div>';
    $(elem).empty().append(output);
    for (const key of keys) {
      let op;
      try{
        op = `<div style="height:300px; width:300px; background-image: url(${aw.imagedata[key]})"><span style="font-size:1.1rem;">${key}</span><br>`;
        const dim = await setup.getImageDimensions(aw.imagedata[key]);
        op += `Width: ${dim.w}<br>Height: ${dim.h}</div>`;
      } catch (e) {
        console.log(`Error with image: ${key} - ${e.name}: ${e.message}`);
        op = `<div><span style="font-size:1.1rem;">${key}</span></div>`
      }
      $(elem).append(op);
    } 
  }
  whyf(cuntID);
};


