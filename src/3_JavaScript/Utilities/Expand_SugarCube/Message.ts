/*
  ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗
  ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝
  ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗
  ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝
  ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗
  ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
/*
/*******************************************************************/
/*  Message macro for displaying collapsable twine content         */
/*******************************************************************/
// intialize namespace
setup.messageMacro = {
  default: "help",
};



// <<message>> macro
Macro.add("message", {
  tags: null,
  handler() {
    const message = this.payload[0].contents;
    const $wrapper = $(document.createElement("span"));
    const $link = $(document.createElement(this.args.includes("btn") ? "button" : "a"));
    const $content = $(document.createElement("span"));

    $link
      .wiki(this.args.length > 0 && this.args[0] !== "btn" ? this.args[0] : setup.messageMacro.default)
      .ariaClick(function() {
        if ($wrapper.hasClass("open")) {
          $content
            .css("display", "none")
            .empty();
        } else {
          $content
            .css("display", "block")
            .wiki(message);
        }

        $wrapper.toggleClass("open");
      });

    $wrapper
      .attr("id", "macro-" + this.name + "-" + this.args.join("").replace(/[^A-Za-z0-9]/g, ""))
      .addClass("message-text")
      .append($link)
      .append($content)
      .appendTo(this.output);
  },
});
