/*******************************************************************/
/* <<dialog>> macro which displays contents in dialog UI API       */
/*******************************************************************/
Macro.add("dialog", {
  tags: ["onclose"],
  handler: function () {
    var title, classNames, onClose, cont;
    var content = this.payload[0].contents;
    var options = {
      top: 50,
      opacity: 0.8
    };
    if (this.args.length > 1) {
      if(this.payload.length > 1 && this.payload[1].name === "onclose"){
        cont = this.payload[1].contents;
        onClose = function (){
          eval(cont);
          Engine.play(this.args[1]);
        };
      }else{
        onClose = function () {
          Engine.play(this.args[1]);
        };
      }
    }else if (this.args.length > 2) {
      title = this.args[0];
      cont = this.payload[1].contents;
      onClose = function (){
        eval(cont);
        Engine.play(this.args[1]);
      };
      this.args.deleteAt(0);
      this.args.deleteAt(0);
      this.args.push("macro-" + this.name);
      classNames = this.args.join(" ");
      //classNames += " scale-in-center";
    } else if (this.args.length === 1) {
      title = this.args[0];
      classNames = "macro-" + this.name;
      onClose = function () {
        setup.refresh();
      };
    } else {
      title = "AW";
      classNames = "macro-" + this.name;
      onClose = function () {
        setup.refresh();
      };
    }
    Dialog.setup(title, classNames);
    Dialog.wiki(content);
    Dialog.open(options, onClose);
  }
});
/*******************************************************************/
/* <<popup>> macro which loads a passage in the dialog UI API      */
/*******************************************************************/
Macro.add("popup", {
  handler: function () {
    var passageName, classNames, title;
    if (this.args.length > 2) {
      passageName = this.args[0];
      title = this.args[1];
      this.args.deleteAt(0, 1);
      this.args.push("macro-" + this.name);
      classNames = this.args.join(" ");
    } else if (this.args.length === 2) {
      passageName = this.args[0];
      title = this.args[1];
      classNames = "macro-" + this.name;
    } else if (this.args.length === 1) {
      passageName = this.args[0];
      title = "";
      classNames = "macro-" + this.name;
    } else {
      return this.error("need at least one argument; the passage to display");
    }
    Dialog.setup(title, classNames);
    Dialog.wiki(Story.get(passageName).processText());
    Dialog.open();
    setTimeout(setup.refresh, 500);
  }

});
/*TEST NEW METHODOLOGY*/

Macro.add("dialogB", {
  tags: null,
  handler: function () {

    // handle args (if any)
    var content = (this.payload[0].contents) ? this.payload[0].contents : "";
    var title = (this.args.length > 0) ? this.args[0] : "";
    var classes = (this.args.length > 1) ? this.args.slice(1).flatten() : [];

    // add the macro- class
    classes.push("macro-" + this.name);

    // dialog box
    Dialog.setup(title, classes.join(" "));
    Dialog.wiki(content);
    Dialog.open();

  }

});

// <<popup>> macro
Macro.add("popupB", {
  handler: function () {

    // errors
    if (this.args.length < 1) {
      return this.error("need at least one argument; the passage to display");
    }
    if (!Story.has(this.args[0])) {
      return this.error("the passage " + this.args[0] + "does not exist");
    }

    // passage name and title
    var psg = this.args[0];
    var title = (this.args.length > 1) ? this.args[1] : "";
    var classes = (this.args.length > 2) ? this.args.slice(2).flatten() : [];

    // add the macro- class
    classes.push("macro-" + this.name);

    // dialog box
    Dialog.setup(title, classes.join(" "));
    Dialog.wiki(Story.get(psg).processText());
    Dialog.open();

  }
});