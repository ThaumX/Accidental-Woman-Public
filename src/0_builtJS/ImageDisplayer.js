

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
    let output = '<div id="GameImageContainer">';
    for (const key of keys) {
      output += `<div style="background-image: url(${aw.imagedata[key]})"><span style="font-size:1.1rem;">${key}</span><br>`;
      const dim = await setup.getImageDimensions(aw.imagedata[key]);
      output += `Width: ${dim.w}<br>Height: ${dim.h}</div>`;
    }
    output += "</div>";
    $(elem).empty().append(output);
  }
  whyf(cuntID);
};


