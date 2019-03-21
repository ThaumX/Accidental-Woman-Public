// fade in and out macros

// <<fadein>> macro
Macro.add("fadein", {
  tags    : null,
  handler() {

    const $wrapper = $(document.createElement("span"));
    const content = this.payload[0].contents;
    let time;
    let delay;

    if (this.args.length === 0) {
      return this.error("no arguments given");
    }

    time  = Util.fromCssTime(this.args[0]);
    delay = (this.args.length > 1) ?  Util.fromCssTime(this.args[1]) : 0;

    $wrapper
      .wiki(content)
      .addClass("macro-" + this.name)
      .appendTo(this.output)
      .hide()
      .delay(delay)
      .fadeIn(time);

  },
});

// <<fadeout>> macro
Macro.add("fadeout", {
  tags    : null,
  handler() {

    const $wrapper = $(document.createElement("span"));
    const content = this.payload[0].contents;
    let time;
    let delay;

    if (this.args.length === 0) {
      return this.error("no arguments given");
    }

    time  = Util.fromCssTime(this.args[0]);
    delay = (this.args.length > 1) ?  Util.fromCssTime(this.args[1]) : 0;

    $wrapper
      .wiki(content)
      .addClass("macro-" + this.name)
      .appendTo(this.output)
      .delay(delay)
      .fadeOut(time);

  },
});
