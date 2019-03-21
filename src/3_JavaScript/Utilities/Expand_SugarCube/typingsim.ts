// <<typesim>> macro
Macro.add("typesim", {
     tags : null,
  handler() {

    const $text    = $(document.createElement("textarea"));
    const $wrapper = $(document.createElement("div"));

    // simple error checking
    if (this.args.length !== 1) {
      return this.error("incorrect number of arguments");
    } if (typeof this.args[0] !== "string") {
      return this.error("argument should be a string");
    }

    // get message parameters
    const message = this.args[0];
    let shown = "";
    const length = message.length;
    let i = 0;
    const id = "typesim-output-" + message.replace(/[^A-Za-z0-9]/g, "");
    const cls = "macro-" + this.name;
    const content = this.payload[0].contents;

    $text
      .wiki(shown)
      .attr({
        id,
        readonly : true,
        })
      .addClass(cls)
      .appendTo(this.output);

    // listener
    $(document).on("keydown", "#" + id, function(e) {

      if (i < length) {
        shown = shown + message.charAt(i);
        $("#" + id).empty().wiki(shown);
      }

      if (i === length) {
        $wrapper
          .wiki(content)
          .addClass(cls)
          .insertAfter("#" + id);
      }

      i++;
    });

  },
});
