/* Create the Right UI Bar. */
var $rightUiBar = $('<div id="right-ui-bar"></div>').insertAfter("#ui-bar");


var rightTray = $rightUiBar.append('<div id="right-ui-bar-tray"><button id="right-ui-bar-toggle" tabindex="0" title="Toggle the Right UI bar" aria-label="Toggle the Right UI bar" type="button"></button><button id="right-ui-bar-help" tabindex="0" title="Get help data" aria-label="Get help data" type="button"> </button></div>');

var rightBody = $rightUiBar.append('<div id="right-ui-bar-body"></div>');

/* Attach the toggle button click. */
$rightUiBar.find('#right-ui-bar-toggle').ariaClick({label : "Toggle the Right UI bar"}, () => $rightUiBar.toggleClass('stowed'));

/* Attach the toggle button click. */
$rightUiBar.find('#right-ui-bar-help').ariaClick({label : "Get help data"}, () => setPageElement('right-ui-bar-body', 'StoryRightSidebarHelp'));

/* Automatically show the contents of the StoryRightSidebar passage in the right-ui-bar-body element. */
postrender["Display Right Sidebar Contents"] = function (content, taskName) {
	setPageElement('right-ui-bar-body', 'StoryRightSidebar');
};


Macro.add('openRightSidebar', {
	tags    : null,
	handler : function () {
		if (this.args.length != 0) {
			return this.error('My open sidebar macro doesnt accept arguments');
		}
		if ($rightUiBar.classList.contains("stowed")) {
			$rightUiBar.classList.remove("stowed");
		}
		
	}
});

Macro.add('closeRightSidebar', {
	tags    : null,
	handler : function () {
		if (this.args.length != 0) {
			return this.error('My close sidebar macro doesnt accept arguments');
		}
		if ($rightUiBar.classList.contains("stowed")) {
			//do nuthin
		} else {
			$rightUiBar.classList.add("stowed");
		}
		
	}
});