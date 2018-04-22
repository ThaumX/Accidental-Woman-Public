/* Create the Right UI Bar. */
var $rightUiBar = $('<div id="right-ui-bar"></div>').insertAfter("#ui-bar");


var rightTray = $rightUiBar.append('<div id="right-ui-bar-tray"></div>');

var rightBody = $rightUiBar.append('<div id="right-ui-bar-body"></div>');

/* Attach the toggle button click. */
//$rightUiBar.find('#right-ui-bar-toggle').ariaClick({label : "Toggle the Right UI bar"}, () => $rightUiBar.toggleClass('stowed'));

/* Attach the toggle button click. */
//$rightUiBar.find('#right-ui-bar-help').ariaClick({label : "Get help data"}, () => setPageElement('right-ui-bar-body', 'StoryRightSidebarHelp'));

/* Automatically show the contents of the StoryRightSidebar passage in the right-ui-bar-body element. */
postrender["Display Right Sidebar Contents"] = function (content, taskName) {
  setPageElement('right-ui-bar-body', 'StoryRightSidebar');
};


Macro.add('openRightSidebar', {
  handler : function () {
    if (this.args.length != 0) {
      return this.error('My open sidebar macro doesnt accept arguments');
    }
    const $targets = jQuery("#right-ui-bar");
    if ($targets.length === 0) {
      aw.con.warn(`OpenRightSidebar: no elements matched the selector #right-ui-bar`);
    }
    $targets.removeClass("stowed");
  }
});

Macro.add('closeRightSidebar', {
  handler : function () {
    if (this.args.length != 0) {
      return this.error('My close sidebar macro doesnt accept arguments');
    }
    const $targets = jQuery("#right-ui-bar");
    if ($targets.length === 0) {
      aw.con.warn(`CloseRightSidebar: no elements matched the selector #right-ui-bar`);
    }
    $targets.addClass("stowed");
  }
});