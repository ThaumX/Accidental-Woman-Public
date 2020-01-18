
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

Wikifier.Parser.add({
  name     : "bimbo-too",
  profiles : ["core"],
  match    : "\\s(?:two|too|to)(?=\\s|\\.|,)",

  handler(w) {
    if (setup.parse.bimbo ) {
      // aw.con.info("found 2");
      jQuery(document.createTextNode(" to")).appendTo(w.output);
      /*
      const $cock = jQuery(document.createElement("span"));
      $cock.addClass("bimbo");
      $cock.html("2");
      $cock.appendTo(w.output);
      */
      return;
    } else {
      w.outputText(w.output, w.matchStart, w.nextMatch);
    }
  },
});



Wikifier.Parser.add({
  name     : "BimboReplaceAre",
  profiles : ["core"],
  match    : "\\sare(?=\\s|,)(?!\\stotally|\\slike)",

  handler(w) {
    if (setup.parse.bimbo ) {
      const tx = either(" are totally", " are like", " are like totally");
      // aw.con.info("found are");
      jQuery(document.createTextNode(tx)).appendTo(w.output);
      /*
      const $cock = jQuery(document.createElement("span"));
      $cock.addClass("bimbo");
      $cock.html(tx);
      $cock.appendTo(w.output);
      */
      return;
    } else {
      w.outputText(w.output, w.matchStart, w.nextMatch);
    }
  },
});

/*
Wikifier.Parser.add({
  name     : "ReplaceLove",
  profiles : ["core"],
  match    : "\\slove(?=\\s|\\.|,|s|s,)",

  handler(w) {
    if (setup.parse.bimbo ) {
      // aw.con.info("found love");
      jQuery(document.createTextNode(" luv")).appendTo(w.output);
      /*
      const $cock = jQuery(document.createElement("span"));
      $cock.addClass("bimbo");
      $cock.html("luv");
      $cock.appendTo(w.output);
      /
      return;
    } else {
      w.outputText(w.output, w.matchStart, w.nextMatch);
    }
  },
});
*/

Wikifier.Parser.add({
  name     : "bimbo-hawt",
  profiles : ["core"],
  match: "\\s(?:hot|sexy|Sexy|cool|Cool|nice|Nice|Amazing|amazing|Awesome|awesome|Excellent|excellent|fabulous|fantastic|gorgeous|incredible|outstanding|Perfect|perfect|spectacular|splendid|stellar|stupendous|Super|super|wondrous|great|Great|beautiful|Beautiful|erotic|lovely)(?=\\s|\\.|,)",

  handler(w) {
    if (setup.parse.bimbo ) {
      const tx = either(" hawt", " yummy", " hawt", " amaze-balls", " hawt");
      // aw.con.info("found hawt");
      jQuery(document.createTextNode(tx)).appendTo(w.output);
      /*
      const $cock = jQuery(document.createElement("span"));
      $cock.addClass("bimbo");
      $cock.html("hawt");
      $cock.appendTo(w.output);
      */
      return;
    } else {
      w.outputText(w.output, w.matchStart, w.nextMatch);
    }
  },
});


Wikifier.Parser.add({
  name: "YummyCock",
  profiles: ["core"],
  match: "\\s(?=phallus|cocks{0,1}|Cocks{0,1}|dicks{0,1}|Dicks{0,1}|rods{0,1}|peckers{0,1}|pricks{0,1}|shafts{0,1}|Shafts{0,1}|johnson|manhoods{0,1}|schlongs{0,1}|meat-hammers{0,1}|womb-brooms{0,1}|tallywackers{0,1}|phalluses)",

  handler(w) {
    if (setup.parse.bimbo || (random(1, 2) === 1 && setup.parse.slut)) {
      // aw.con.info("found love");
      const rtx = either(" yummy ", " super-yummy ", " delicious ", " yummy ", " hawt ");
      jQuery(document.createTextNode(rtx)).appendTo(w.output);
      /*
      const $cock = jQuery(document.createElement("span"));
      $cock.addClass("bimbo");
      $cock.html("luv");
      $cock.appendTo(w.output);
      */
      return;
    } else {
      w.outputText(w.output, w.matchStart, w.nextMatch);
    }
  },
});


Wikifier.Parser.add({
  name: "YummyBalls",
  profiles: ["core"],
  match: "\\s(?=balls|nuts|bollocks|cojones|knackers|nads|rocks|testicles|plums|kiwis|grapes|stones|testes)",

  handler(w) {
    if (setup.parse.bimbo || (random(1, 4) === 1 && (setup.parse.slut || setup.parse.cum))) {
      // aw.con.info("found love");
      const rtx = either(" yummy ", " super-yummy ", " delicious ", " yummy ");
      jQuery(document.createTextNode(rtx)).appendTo(w.output);
      /*
      const $cock = jQuery(document.createElement("span"));
      $cock.addClass("bimbo");
      $cock.html("luv");
      $cock.appendTo(w.output);
      */
      return;
    } else {
      w.outputText(w.output, w.matchStart, w.nextMatch);
    }
  },
});

Wikifier.Parser.add({
  name: "YummyCum",
  profiles: ["core"],
  match: "\\s(?=cum|Cum|Semen|semen|jizz|Jizz|jism|Jism|man\\schowder|seed|nut\\sbutter|splooge|trouser\\sgravy|man\\smilk|sperm|Sperm|cunt\\sswimmers)",

  handler(w) {
    if (setup.parse.bimbo || (random(1, 3) === 1 && (setup.parse.slut || setup.parse.cum))) {
      // aw.con.info("found love");
      const rtx = either(" yummy ", " super-yummy ", " delicious ", " yummy ");
      jQuery(document.createTextNode(rtx)).appendTo(w.output);
      /*
      const $cock = jQuery(document.createElement("span"));
      $cock.addClass("bimbo");
      $cock.html("luv");
      $cock.appendTo(w.output);
      */
      return;
    } else {
      w.outputText(w.output, w.matchStart, w.nextMatch);
    }
  },
});


