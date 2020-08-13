
// .addClass("bimbo")

interface setupParse {
  bimbo: boolean;
  slut: boolean;
  cum: boolean;
}

setup.parse = {
  bimbo: false,
  slut: false,
  cum: false,
};


Macro.add("convo", {
  handler() {
    setTimeout(setup.convoParse, 50);
  },
});

setup.convoParse = function() {
  // This function should be called after any text where the PC talks.
  // It gathers all the <span class="pc">blah</span> elements on the page
  // It then attemts to modify those based on the situation, such as a gag.
  // Finally, it adds the modded class so that the text isn't modded twice accidentally

  // CAUTION! Use after a delay for text that is not yet displayed

  // reset the flag variable used by the SugarCube parser
  setup.parsed = false;

  // get all pc talking spans!
  const $pcSpans = $("span.pc").toArray();
  const $monoSpans = $("span.mono").toArray();

  // Define speciic parser functions to be called at the end as needed
  function gagged() {
    // iterate over each span
    for (const $s of $pcSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.textContent;
        if (cont != null){ // protect from empty spans just in case
          const wordArray = cont.split(/\s+/);
          let mmph = "";
          for (const w of wordArray) { // generate Mmmmphs based on length
            if (w.length < 3) {
              mmph += "mn";
            } else {
              for (let i = 0, c = w.length - 2; i < c; i++) {
                mmph += (i === 0) ? "M" : "m";
              }
              mmph += "ph";
            }
            // add punctuation as appropriate
            if (w.search(/\!/) !== -1) {
              mmph += "!!";
            }
            if (w.search(/\?/) !== -1) {
              mmph += "?";
            }
            if (w.search(/\./) !== -1) {
              mmph += ".";
            }
            mmph += " "; // add final space to start new word
          }
          mmph += "(<i>" + cont + "</i>)";
          $s.innerHTML = mmph; // replace content of original span
          $s.className = "pc modded";
        }
      }
    }
  }
  function bimboToo() {
    // iterate over each span
    for (const $s of $pcSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          const n1 = cont.replace(/\s(to|too)\s/g, " 2 ");
          const n2 = n1.split(" are ");
          let n3 = "";
          for(let i = 0; i < n2.length; i++) {
            n3 += n2[i];
            if (i < n2.length - 1) {
              n3 += either(" are totally ", " are like ", " are like, totally ", " are totally like ", " are like ");
            }
          }
          const n4 = n3.replace(" love ", " luv ");
          const n5 = n4.split(/\s(?:hot|sexy|Sexy|cool|Cool|nice|Nice|Amazing|amazing|Awesome|awesome|Excellent|excellent|fabulous|fantastic|gorgeous|incredible|outstanding|Perfect|perfect|spectacular|splendid|stellar|stupendous|Super|super|wondrous|great|Great|beautiful|Beautiful|erotic|lovely)/);
          let n6 = "";
          for (let i = 0; i < n5.length; i++) {
            n6 += n5[i];
            if (i < n5.length - 1) {
              n6 += either(" hawt", " yummy", " hawt", " amaze-balls", " hawt")
            }
          }
          $s.innerHTML = n6; // replace content of original span
        }
      }
    }
  }
  function bimboMono() {
    // iterate over each span
    for (const $s of $monoSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          const n1 = cont.replace(/\s(to|too)\s/g, " 2 ");
          const n2 = n1.split(" are ");
          let n3 = "";
          for(let i = 0; i < n2.length; i++) {
            n3 += n2[i];
            if (i < n2.length - 1) {
              n3 += either(" are totally ", " are like ", " are like, totally ", " are totally like ", " are like ");
            }
          }
          const n4 = n3.replace(" love ", " luv ");
          const n5 = n4.split(/\s(?:hot|sexy|Sexy|cool|Cool|nice|Nice|Amazing|amazing|Awesome|awesome|Excellent|excellent|fabulous|fantastic|gorgeous|incredible|outstanding|Perfect|perfect|spectacular|splendid|stellar|stupendous|Super|super|wondrous|great|Great|beautiful|Beautiful|erotic|lovely)/);
          let n6 = "";
          for (let i = 0; i < n5.length; i++) {
            n6 += n5[i];
            if (i < n5.length - 1) {
              n6 += either(" hawt", " yummy", " hawt", " amaze-balls", " hawt")
            }
          }
          $s.innerHTML = n6; // replace content of original span
        }
      }
    }
  }
  function yummyCock() {
    // iterate over each span
    for (const $s of $pcSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          // regex to match words
          const regex = /\s(?:phallus|cocks{0,1}|Cocks{0,1}|dicks{0,1}|Dicks{0,1}|rods{0,1}|peckers{0,1}|pricks{0,1}|shafts{0,1}|Shafts{0,1}|johnson|manhoods{0,1}|schlongs{0,1}|meat-hammers{0,1}|womb-brooms{0,1}|tallywackers{0,1}|phalluses|penis|meat)/g;
          // some fanciness to get indexes of matched words
          let match = regex.exec(cont);
          const matches: number[] = [];
          while (match != null) {
              matches.push(match.index);
              match = regex.exec(cont);
          }
          // insert words into string at indexes
          let out = cont;
          for (let i = matches.length - 1; i >= 0; i--) {
            const rtx = either(" yummy", " delicious", " glorious", " hot", " amazing", " sexy", " yummy", " wonderful");
            out = out.slice(0, matches[i]) + rtx + out.slice(matches[i]);
          }
          $s.innerHTML = out; // replace content of original span
        }
      }
    }
  }
  function yummyCockMono() {
    // iterate over each span
    for (const $s of $monoSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          // regex to match words
          const regex = /\s(?:phallus|cocks{0,1}|Cocks{0,1}|dicks{0,1}|Dicks{0,1}|rods{0,1}|peckers{0,1}|pricks{0,1}|shafts{0,1}|Shafts{0,1}|johnson|manhoods{0,1}|schlongs{0,1}|meat-hammers{0,1}|womb-brooms{0,1}|tallywackers{0,1}|phalluses|penis|meat)/g;
          // some fanciness to get indexes of matched words
          let match = regex.exec(cont);
          const matches: number[] = [];
          while (match != null) {
              matches.push(match.index);
              match = regex.exec(cont);
          }
          // insert words into string at indexes
          let out = cont;
          for (let i = matches.length - 1; i >= 0; i--) {
            const rtx = either(" yummy", " delicious", " glorious", " hot", " amazing", " sexy", " yummy", " wonderful");
            out = out.slice(0, matches[i]) + rtx + out.slice(matches[i]);
          }
          $s.innerHTML = out; // replace content of original span
        }
      }
    }
  }
  function yummyBalls() {
    // iterate over each span
    for (const $s of $pcSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          // regex to match words
          const regex = /\s(?:balls|nuts|bollocks|cojones|knackers|nads|rocks|testicles|plums|kiwis|grapes|stones|testes)/g;
          // some fanciness to get indexes of matched words
          let match = regex.exec(cont);
          const matches: number[] = [];
          while (match != null) {
              matches.push(match.index);
              match = regex.exec(cont);
          }
          // insert words into string at indexes
          let out = cont;
          for (let i = matches.length - 1; i >= 0; i--) {
            const rtx = either(" yummy", " delicious", " glorious", " hot", " amazing", " sexy", " yummy", " wonderful", " super-yummy");
            out = out.slice(0, matches[i]) + rtx + out.slice(matches[i]);
          }
          $s.innerHTML = out; // replace content of original span
        }
      }
    }
  }
  function yummyBallsMono() {
    // iterate over each span
    for (const $s of $monoSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          // regex to match words
          const regex = /\s(?:balls|nuts|bollocks|cojones|knackers|nads|rocks|testicles|plums|kiwis|grapes|stones|testes)/g;
          // some fanciness to get indexes of matched words
          let match = regex.exec(cont);
          const matches: number[] = [];
          while (match != null) {
              matches.push(match.index);
              match = regex.exec(cont);
          }
          // insert words into string at indexes
          let out = cont;
          for (let i = matches.length - 1; i >= 0; i--) {
            const rtx = either(" yummy", " delicious", " glorious", " tasty", " amazing", " sexy", " yummy", " wonderful", " super-yummy");
            out = out.slice(0, matches[i]) + rtx + out.slice(matches[i]);
          }
          $s.innerHTML = out; // replace content of original span
        }
      }
    }
  }
  function yummyCum() {
    // iterate over each span
    for (const $s of $pcSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          // regex to match words
          const regex = /\s(?:cum|Cum|Semen|semen|jizz|Jizz|jism|Jism|man\schowder|seed|nut\sbutter|splooge|trouser\sgravy|man\smilk|sperm|Sperm|cunt\sswimmers|bull\smilk)/g;
          // some fanciness to get indexes of matched words
          let match = regex.exec(cont);
          const matches: number[] = [];
          while (match != null) {
              matches.push(match.index);
              match = regex.exec(cont);
          }
          // insert words into string at indexes
          let out = cont;
          for (let i = matches.length - 1; i >= 0; i--) {
            const rtx = either(" yummy", " delicious", " yummy", " tasty", " super-yummy");
            out = out.slice(0, matches[i]) + rtx + out.slice(matches[i]);
          }
          $s.innerHTML = out; // replace content of original span
        }
      }
    }
  }
  function yummyCumMono() {
    // iterate over each span
    for (const $s of $monoSpans) {
      // get list of class names and split into array for each class
      const classes = $s.className;
      if (classes === "pc") {
        // only spans that only have the pc class, rest are ignored
        const cont = $s.innerHTML;
        if (cont != null){ // protect from empty spans just in case
          // regex to match words
          const regex = /\s(?:cum|Cum|Semen|semen|jizz|Jizz|jism|Jism|man\schowder|seed|nut\sbutter|splooge|trouser\sgravy|man\smilk|sperm|Sperm|cunt\sswimmers|bull\smilk)/g;
          // some fanciness to get indexes of matched words
          let match = regex.exec(cont);
          const matches: number[] = [];
          while (match != null) {
              matches.push(match.index);
              match = regex.exec(cont);
          }
          // insert words into string at indexes
          let out = cont;
          for (let i = matches.length - 1; i >= 0; i--) {
            const rtx = either(" yummy", " delicious", " yummy", " tasty", " super-yummy");
            out = out.slice(0, matches[i]) + rtx + out.slice(matches[i]);
          }
          $s.innerHTML = out; // replace content of original span
        }
      }
    }
  }
  // call functions as needed here
  try {
    if (setup.parse.bimbo) {
      bimboToo();
      bimboMono();
      yummyCock();
      yummyCockMono();
      yummyBalls();
      yummyBallsMono();
      yummyCum();
      yummyCumMono();
    } else if (setup.parse.slut) {
      yummyCock();
      yummyCockMono();
      yummyBalls();
      yummyBallsMono();
      yummyCum();
      yummyCumMono();
    } else if (setup.parse.cum) {
      yummyBalls();
      yummyBallsMono();
      yummyCum();
      yummyCumMono();
    }
  } catch (e) {
    aw.con.info(`failure in post parser, probably not important. ${e.name}: ${e.message}.`);
  }
  try {
    if (typeof setup.sexToys.check("pc", "mouth") === "string") {
      gagged();
    }
  } catch (e) {
    aw.con.info(`failure in gagged post parser, expected before init. ${e.name}: ${e.message}`);
  }
  // add class to spans so not double-parsed
  for (const $s of $pcSpans){
    $s.className = "pc modded";
  }
  for (const $s of $monoSpans) {
    $s.className = "mono modded";
  }
  aw.con.info("Post Parse ran successfully.");
};



