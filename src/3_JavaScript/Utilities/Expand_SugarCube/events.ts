/*
  ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
  ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
  █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
  ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
  ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
  system for adding events/triggers to Twine
*/
// the <<trigger>> macro
Macro.add("trigger", {
  handler() {

    // declare vars
    let evt;
    let $el;

    // check for errors
    if (this.args.length > 2 || this.args.length === 0) {
      return this.error("incorrect number of arguments");
    }
    if (typeof this.args[0] !== "string") {
      return this.error("first argument should be a string and a valid event type");
    }

    // some setup
    evt = this.args[0];
    $el = (this.args.length === 1 ||
        (this.args[1] && typeof this.args[1] === "string" &&
          this.args[1].toLowerCase().trim() === "document")) ?
      $(document) : $(this.args[1]);

    // fire the event
    $el.trigger(evt);

  },
});

// the <<event>> macro
Macro.add("event", {
  tags: ["which"],
  handler() {

    const payload = this.payload;
    let evt;
    let sel = "";
    let code = "";
    let i;

    if (this.args.length > 2 || this.args.length === 0) {
      return this.error("incorrect number of arguments");
    }
    if (typeof this.args[0] !== "string") {
      return this.error("first argument should be a string and a valid event type");
    }
    if (this.args.length === 2 && typeof this.args[1] === "string") {
      sel = this.args[1];
    }

    evt = this.args[0];

    $(document).on(evt, sel, function(e) {
      code = payload[0].contents;
      if (payload.length > 1) {
        for (i = 1; i < payload.length; i++) {
          if (payload[i].args.includes(e.which)) {
            code = code + payload[i].contents;
          }
        }
      }
      // tslint:disable-next-line:no-unused-expression
      new Wikifier(null, code);
    });

  },
});
