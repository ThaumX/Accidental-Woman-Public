/*
      ███████╗██╗   ██╗██╗     ██╗
      ██╔════╝██║   ██║██║     ██║
      █████╗  ██║   ██║██║     ██║      █████╗
      ██╔══╝  ██║   ██║██║     ██║      ╚════╝
      ██║     ╚██████╔╝███████╗███████╗
      ╚═╝      ╚═════╝ ╚══════╝╚══════╝
  ███████╗ ██████╗██████╗ ███████╗███████╗███╗   ██╗
  ██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝████╗  ██║
  ███████╗██║     ██████╔╝█████╗  █████╗  ██╔██╗ ██║
  ╚════██║██║     ██╔══██╗██╔══╝  ██╔══╝  ██║╚██╗██║
  ███████║╚██████╗██║  ██║███████╗███████╗██║ ╚████║
  ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝
*/
// fullscreen function
setup.fullscreen = function(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
};

Macro.add("fullscreen", {
  handler() {

    const bg = $("body").css("background-color");
    $("html").css("background-color", bg);

    setup.fullscreen(document.documentElement);

  },
});

Macro.add("fullscreenlink", {
  handler() {

    const $wrapper = $(document.createElement("span"));
    const $link = $(document.createElement("a"));
    const className = "macro-" + this.name;
    let bg;
    let linkText;

    if (this.args.length !== 1) {
      return this.error("incorrect number of arguments");
    }

    linkText = this.args[0];

    $link
      .wiki(linkText)
      .attr("id", "fullscreen-macro-link")
      .ariaClick(function() {
        bg = $("body").css("background-color");
        $("html").css("background-color", bg);
        setup.fullscreen(document.documentElement);
      });

    $wrapper
      .append($link)
      .addClass(className)
      .appendTo(this.output);

  },
});
