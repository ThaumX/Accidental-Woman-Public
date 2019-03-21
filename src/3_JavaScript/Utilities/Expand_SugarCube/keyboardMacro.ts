//  888    d8P                    8888888b.
//  888   d8P                     888   Y88b
//  888  d8P                      888    888
//  888d88K      .d88b.  888  888 888   d88P 888d888 .d88b.  .d8888b  .d8888b
//  8888888b    d8P  Y8b 888  888 8888888P"  888P"  d8P  Y8b 88K      88K
//  888  Y88b   88888888 888  888 888        888    88888888 "Y8888b. "Y8888b.
//  888   Y88b  Y8b.     Y88b 888 888        888    Y8b.          X88      X88
//  888    Y88b  "Y8888   "Y88888 888        888     "Y8888   88888P'  88888P'
//                            888
//                       Y8b d88P
//                        "Y88P"

(function() {
  let count = 0;

  // Keycode source:
  //   - css-tricks.com/snippets/javascript/javascript-keycodes/
  //   - west-wind.com/westwindwebtoolkit/samples/ajax/html5andcss3/keycodechecker.aspx
  const keyCodeLookup = {
    "backspace": 8,
    "tab": 9,
    "enter": 13,
    "shift": 16,
    "ctrl": 17,
    "alt": 18,
    "caps lock": 20,
    "escape": 27,
    "space": 32,
    "page up": 33,
    "page down": 34,
    "end": 35,
    "home": 36,
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40,
    "insert": 45,
    "delete": 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "a": 65,
    "b": 66,
    "c": 67,
    "d": 68,
    "e": 69,
    "f": 70,
    "g": 71,
    "h": 72,
    "i": 73,
    "j": 74,
    "k": 75,
    "l": 76,
    "m": 77,
    "n": 78,
    "o": 79,
    "p": 80,
    "q": 81,
    "r": 82,
    "s": 83,
    "t": 84,
    "u": 85,
    "v": 86,
    "w": 87,
    "x": 88,
    "y": 89,
    "f1": 112,
    "f2": 113,
    "f3": 114,
    "f4": 115,
    "f5": 116,
    "f6": 117,
    "f7": 118,
    "f8": 119,
    "f9": 120,
    "f10": 121,
    "f11": 122,
    "f12": 123,
    "semi-colon": 186,
    "equal sign": 187,
    "comma": 188,
    "dash": 189,
    "period": 190,
    "forward slash": 191,
    "single tick": 192,
    "open bracket": 219,
    "back slash": 220,
    "close bracket": 221,
    "single quote": 222,
  };

  // <<keydown keyName (keyName2) (keyName3) ...>>
  // <</keydown>>
  Macro.add(["keydown", "keyup"], {
    skipArgs: false,
    tags: ["/keydown", "/keyup"],
    handler() {
      const args = this.args;

      // Do some simple error processing
      const errors: string[] = [];
      if (args.length < 1) { errors.push("Missing key name parameter."); }
      if (!this.payload.length) {
        errors.push("Missing closing /" + this.name);
      }
      if (errors.length) { return this.error(errors.join(" ")); }

      // Extract the arguments and contents of the macros
      const trackedKeyCodes: any[] = [];
      for (let i = 0; i < args.length; i++) {
        // Convert to string, so the length can be checked safely
        let keyName = args[i].toString();
        // If the key name is longer than one character, then its a
        // special character and can be converted to lowercase
        if (keyName.length > 1) { keyName = keyName.toLowerCase(); }
        const keyCode = keyCodeLookup[keyName];
        if (keyCode === undefined) {
          return this.error("Unknown key name");
        } else {
          trackedKeyCodes.push(keyCode);
        }
      }
      const keyPressContents = this.payload[0].contents;
      const keyEventName = this.name; // keydown or keyup
      const taskName = keyEventName + "-" + count++;

      // Event handler for keydown/keyup
      const keyEventHandler = function(event) {
        if (isInArray(event.which, trackedKeyCodes)) {
          new Wikifier(this.output, keyPressContents);
        }
      }.bind(this);

      // Set up a task to run when the page has displayed
      addOneTimeTask(postdisplay, taskName, function() {
        // Bind the event handler
        $(document.body).on(keyEventName, keyEventHandler);

        // Before the next passage is displayed, unbind this macro's
        // event
        addOneTimeTask(predisplay, taskName, function() {
          $(document.body).off(keyEventName, keyEventHandler);
        });
      }.bind(this));
    },

  });

  function isInArray(element, array) {
    return (array.indexOf(element) !== -1);
  }

  // Add a task that cleans up after itself
  function addOneTimeTask(taskObject, taskName, taskFunction) {
    taskObject[taskName] = function() {
      taskFunction();
      delete taskObject[taskName];
    };
  }

})();
