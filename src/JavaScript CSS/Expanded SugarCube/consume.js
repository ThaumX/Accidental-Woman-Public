/*-------------------------------------------------------------------*/
/*   ██████╗ ██████╗ ███╗   ██╗███████╗██╗   ██╗███╗   ███╗███████╗  */
/*  ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║   ██║████╗ ████║██╔════╝  */
/*  ██║     ██║   ██║██╔██╗ ██║███████╗██║   ██║██╔████╔██║█████╗    */
/*  ██║     ██║   ██║██║╚██╗██║╚════██║██║   ██║██║╚██╔╝██║██╔══╝    */
/*  ╚██████╗╚██████╔╝██║ ╚████║███████║╚██████╔╝██║ ╚═╝ ██║███████╗  */
/*   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝  */
/*-------------------------------------------------------------------*/
// A consumable inventory system
// create namespace
setup.consume = {};

// options object
setup.consume.options = {
  storyVar: 'consume',
  emptyMsg: 'Not carrying any consume.',
  tryGlobal: true,
  macroAlts: true,
  silentCode: true
};

// set up data structure in story variable
State.variables[setup.consume.options.storyVar] = {
  carried: [],
  all: []
};
// create a referencing function for internal use
setup.consume.ref = () => State.variables[setup.consume.options.storyVar];

// function definitions
setup.consume.getCons = function (id) {
  // return deep copy of cons
  var conRef = setup.consume.ref();
  if (!conRef.all.includes(id)) {
    return null;
  }
  // return clone of reference
  return clone(conRef[id]);
};

setup.consume.hasCons = function (id, number) {
  // returns true if number of carried cons >= number (or 1)
  var conRef = setup.consume.ref();
  if (!conRef.all.includes(id)) {
    throw new TypeError('no cons named ' + id + ' exists.');
  }
  if (arguments.length < 2) {
    number = 1;
  }
  // return boolean via expression
  return (conRef[id].amt >= number);
};

setup.consume.amtOfCons = function (id) {
  // return current number of cons carried
  var conRef = setup.consume.ref();
  if (conRef.carried.includes(id)) {
    return conRef[id].amt;
  }
  if (conRef.all.includes(id)) {
    return 0;
  }
  // no such cons exists at all
  return -1;
};

setup.consume.consExists = function (id) {
  // return true if cons is defined
  var conRef = setup.consume.ref();
  if (conRef.all.includes(id)) {
    return true;
  }
  return false;
};

setup.consume.getConsName = function (id) {
  // return name of cons
  var conRef = setup.consume.ref();
  if (!conRef.all.includes(id)) {
    return null;
  }
  return conRef[id].name;
};

setup.consume.getConsCode = function (id) {
  // return raw code packet of cons
  var conRef = setup.consume.ref();
  if (!conRef.all.includes(id)) {
    return null;
  }
  return conRef[id].code;
};

setup.consume.getConsDescr = function (id) {
  // return code and type of cons's description
  var conRef = setup.consume.ref();
  if (!conRef.all.includes(id)) {
    return null;
  }
  // return array: [0: type of description, 1: description code/passage]
  return [conRef[id].descr, conRef[id].dCode];
};

setup.consume.getAllCons = function () {
  // return array of id's of all defined consume
  var conRef = setup.consume.ref();
  if (conRef.all.length === 0) {
    // array is empty, return null
    return null;
  }
  // return deep copy of array
  return clone(conRef.all);
};

setup.consume.getCarriedCons = function () {
  // return array of id's of all carried consume
  var conRef = setup.consume.ref();
  if (conRef.carried.length === 0) {
    // array is empty, return null
    return null;
  }
  // return deep copy of array
  return clone(conRef.carried);
};

setup.consume.findConsByIndex = function (index) {
  // return id of cons in the indicated index of the all array
  var conRef = setup.consume.ref();
  if (conRef.all.length < (index - 1)) {
    return null;
  }
  // return id of item in index
  return conRef.all[index];
};

setup.consume.findIndexOfCons = function (id) {
  // return index of cons in the all array, or -1 if it doesn't exist
  var conRef = setup.consume.ref();
  return conRef.all.indexOf(id);
};

setup.consume.deleteCons = function (id) {
  // delete cons definition
  var conRef = setup.consume.ref();
  var del;
  if (conRef.all.includes(id)) {
    // remove from all array
    del = conRef.all.indexOf(id);
    conRef.all.deleteAt(del);
  }
  if (conRef.carried.includes(id)) {
    // remove from carried array
    del = conRef.carried.indexOf(id);
    conRef.carried.deleteAt(del);
  }
  if (typeof conRef[id] != 'undefined') {
    // delete definition object
    delete conRef[id];
  }
};

// copy functions to global scope
if (setup.consume.options.tryGlobal) {
  // check tryGlobal option
  if (typeof window.getCons == 'undefined') {
    window.getCons = setup.consume.getCons;
  }
  if (typeof window.hasCons == 'undefined') {
    window.hasCons = setup.consume.hasCons;
  }
  if (typeof window.amtOfCons == 'undefined') {
    window.amtOfCons = setup.consume.amtOfCons;
  }
  if (typeof window.consExists == 'undefined') {
    window.consExists = setup.consume.consExists;
  }
  if (typeof window.getConsName == 'undefined') {
    window.getConsName = setup.consume.getConsName;
  }
  if (typeof window.getConsCode == 'undefined') {
    window.getConsCode = setup.consume.getConsCode;
  }
  if (typeof window.getConsDescr == 'undefined') {
    window.getConsDescr = setup.consume.getConsDescr;
  }
  if (typeof window.getAllCons == 'undefined') {
    window.getAllCons = setup.consume.getAllCons;
  }
  if (typeof window.getCarriedCons == 'undefined') {
    window.getCarriedCons = setup.consume.getCarriedCons;
  }
  if (typeof window.findConsByIndex == 'undefined') {
    window.findConsByIndex = setup.consume.findConsByIndex;
  }
  if (typeof window.findIndexOfCons == 'undefined') {
    window.findIndexOfCons = setup.consume.findIndexOfCons;
  }
  if (typeof window.deleteCons == 'undefined') {
    window.deleteCons = setup.consume.deleteCons;
  }
}

/* MACROS */

// <<newcons>> macro
Macro.add('newcons', {
  tags: ['description'],
  handler: function () {

    var conRef = setup.consume.ref();

    // check args
    if (this.args.length < 1) {
      return this.error('you must name your cons');
    } else if (this.args.length > 2) {
      return this.error('you may only include a name and optional ID as arguments in a cons definition');
    }

    // grab info from macro call
    var consCode = clone(this.payload[0].contents);
    var consName = clone(this.args[0]);
    var consID = (this.args.length === 1) ? clone(this.args[0]) : clone(this.args[1]);
    var descrCode = '';
    var description = null;

    // check for description code
    if (this.payload.length > 2) {
      return this.error('only one <<description>> tag is allowed per cons definition');
    } else if (this.payload.length === 2) {
      if (this.payload[1].args > 1) {
        return this.error('<<description>> tag has too many arguments');
      } else if (this.payload[1].args.length === 1) {
        descrCode = this.payload[1].args[0];
        description = 'passage';
      } else {
        descrCode = this.payload[1].contents;
        description = 'code';
      }
    }

    // delete old definition, if it exists
    setup.consume.deleteCons(consID);

    // create new cons definition
    conRef[consID] = {
      id: consID,
      name: consName,
      code: consCode,
      descr: description,
      dCode: descrCode,
      amt: 0
    };

    // add to array
    conRef.all.push(consID);

  }
});

// <<addcons>> macro
Macro.add('addcons', {
  handler: function () {

    var conRef = setup.consume.ref();

    // check args
    if (this.args.length > 2) {
      return this.error('incorrect number of arguments');
    }

    var key = this.args[0];
    var count = (this.args.length === 1) ? 1 : this.args[1];

    // make sure we got a number
    if (typeof count != 'number') {
      return this.error('optional second argument should be a number');
    }

    // make sure cons is defined
    if (!conRef.all.includes(key)) {
      return this.error('no cosumable with id ' + key + ' is defined');
    }

    // add to carried array
    if (!conRef.carried.includes(key)) {
      conRef.carried.push(key);
    }

    var item = conRef[key];

    // make sure we aren't negative
    if (item.amt <= 0) {
      item.amt = 0;
    }

    // add consume
    item.amt += count;

  }
});

// <<dropcons>> macro
Macro.add('dropcons', {
  handler: function () {

    var conRef = setup.consume.ref();
    var del;

    // check args
    if (this.args.length > 2 || this.args.length < 1) {
      return this.error('incorrect number of arguments');
    }

    var key = this.args[0];
    var count = (this.args.length === 1) ? 1 : this.args[1];

    // make sure we got a number
    if (typeof count != 'number') {
      return this.error('optional second argument should be a number');
    }

    // make sure cons is defined
    if (!conRef.all.includes(key)) {
      return this.error('no cosumable with id ' + key + ' is defined');
    }

    var item = conRef[key];

    // remove consume
    item.amt -= count;

    // make sure we aren't negative and remove from carried array if necesaary
    if (item.amt <= 0) {
      item.amt = 0;
      if (conRef.carried.includes(key)) {
        del = conRef.carried.indexOf(key);
        conRef.carried.deleteAt(del);
      }
    }

  }
});

// <<clearconsume>> macro
Macro.add('clearconsume', {
  handler: function () {

    var conRef = setup.consume.ref();
    var keys = this.args;
    var length = this.args.length;
    var item;
    var del;
    var i;

    // check args
    if (length < 1) {
      return this.error('you must provide the ID of at least one cons');
    } else if (!conRef.all.includesAll(keys)) {
      return this.error('some or all of the provided cons IDs do not exist');
    }

    for (i = 0; i < length; i++) {
      // set amt to 0 for each id
      item = conRef[keys[i]];
      item.amt = 0;
      if (conRef.carried.includes(keys[i])) {
        // check carried array
        del = conRef.carried.indexOf(keys[i]);
        conRef.carried.deleteAt(del);
      }
    }

  }
});

// <<deleteconsume>>
Macro.add('deleteconsume', {
  handler: function () {

    var conRef = setup.consume.ref();
    var keys = this.args;
    var length = keys.length;
    var delAll = false;
    var i;

    if (length < 1) {
      // no args
      return this.error('no cons ids provided');
    } else if ((length === 1) && (keys[0].trim().toLowerCase() === 'all')) {
      // keyword 'all' is only arg; delete all cons definitions
      delAll = true;
    } else if (!conRef.all.includesAll(keys)) {
      // args are not recognized as consume or as 'all' keyword
      return this.error('some or all of the provided ids are not defined as consume');
    }

    if (delAll) {
      // delete all consume using all array
      keys = conRef.all;
      length = keys.length;
    }

    // main loop
    for (i = 0; i < length; i++) {
      // delete each indicated cons
      setup.consume.deleteCons(keys[i]);
    }

  }
});

// <<usecons>> macro
Macro.add('usecons', {
  handler: function () {

    var $wrapper = $(document.createElement('span'));
    var conRef = setup.consume.ref();
    var silent;
    var check;
    var del;
    var key;
    var code;
    var item;

    // check default of silentCode option
    if (setup.consume.options.silentCode) {
      silent = true;
    } else {
      silent = false;
    }

    // check args
    if ((this.args.length > 2) || (this.args.length < 1)) {
      return this.error('incorrect number of arguments');
    }

    key = this.args[0];

    // check args[1]
    if (this.args.length === 2) {
      check = this.args[1].trim().toLowerCase();
      if ((check === 'silent') || (check === 'noop')) {
        // suppress output
        silent = true;
      } else if ((check === 'unsilent') || (check === 'op')) {
        // do not suppress output
        silent = false;
      }
    }

    // check for existence of cons
    if (!conRef.all.includes(key)) {
      return this.error('no cons with ID ' + key + ' exists');
    }

    // grab cons's code
    code = conRef[key].code;

    // get number of consume and take a look at it
    item = conRef[key];
    if (item.amt === 0) { // can't use 0 consume; double check carried array
      code = '';
      if (conRef.carried.includes(key)) {
        del = conRef.carried.indexOf(key);
        conRef.carried.deleteAt(del);
      }
    } else if (item.amt === 1) { // if 1, remove from carried array and use
      item.amt = 0;
      del = conRef.carried.indexOf(key);
      conRef.carried.deleteAt(del);
    } else { // reduce count by 1 if player has 2 or more
      item.amt--;
    }

    // run cons's code
    if (silent) {
      // discard output
      new Wikifier(null, code);
    } else {
      // display output
      $wrapper
        .wiki(code)
        .addClass('macro-' + this.name)
        .appendTo(this.output);
    }

  }
});

// <<sortconsume>> macro
Macro.add('sortconsume', {
  handler: function () {
    var conRef = setup.consume.ref();
    conRef.carried.sort();
  }
});

// <<listconsume>> macro
Macro.add('listconsume', {
  handler: function () {

    var $wrapper = $(document.createElement('span'));
    var conRef = setup.consume.ref();
    var content = '';
    var sep;

    // check args
    if (this.args.length > 1) {
      return this.error('incorrect number of arguments');
    } else if (this.args.length === 1) {
      sep = this.args[0];
    } else {
      sep = '\n';
    }

    //v1.05b: fixed display issue
    // check for consume
    if (conRef.carried.length > 0) {
      // create list
      conRef.carried.forEach(function (id, idx, arr) {
        var item = conRef[id];
        content = content + item.name + ': ' + item.amt;
        // omit separator if item is last cons
        content = (idx === arr.length - 1) ? content : content + sep;
      });
    } else {
      // no carried consume
      content = setup.consume.options.emptyMsg;
    }

    // output list
    $wrapper
      .wiki(content)
      .addClass('macro-' + this.name)
      .appendTo(this.output);

  }
});

// <<usableconsume>> macro
Macro.add('usableconsume', {
  handler: function () {

    var $wrapper = $(document.createElement('span'));
    var conRef = setup.consume.ref();

    // check for consume
    if (conRef.carried.length > 0) {
      conRef.carried.forEach(function (id, i, arr) {
        var $listing = $(document.createElement('span'));
        var $descr = $(document.createElement('a'));
        var $link = $(document.createElement('a'));
        var item = conRef[id];
        var itemID = conRef[id].id.replace(/[^A-Za-z0-9]/g, '');
        var descrCode;

        if ((!item.descr) || (item.descr == null)) {
          // no description code, no link
          $descr = item.name;
        } else {
          // make description link
          $descr
            .wiki(item.name)
            .addClass('descr-link macro-usableconsume')
            .attr('id', itemID + '-descr');
          if (item.descr === 'passage') {
            // default (for passage-style descr)
            $descr.ariaClick(function () {
              Dialog.setup(item.name, 'cons ' + item.name + ' ' + item.id);
              Dialog.wiki(Story.get(item.dCode).processText());
              Dialog.open();
            });
          } else {
            // for user-defined description code
            $descr.ariaClick(function () {
              new Wikifier(null, item.dCode);
            });
          }
        }

        // create 'Use' link
        $link
          .wiki('Use')
          .addClass('use-link macro-usableconsume')
          .attr('id', itemID + '-use')
          .ariaClick(function () {
            // on click, fire usecons macro in silent mode
            new Wikifier(null, '<<usecons "' + item.id + '" "silent">>');
            if (item.amt > 0) {
              $('#' + itemID + '-amt').empty().wiki(item.amt);
            } else {
              $('#' + itemID).empty();
            }
          });

        // append to listing (added v1.1)
        $listing
          .attr('id', itemID)
          .append($descr)
          .wiki(': <span id="' + itemID + '-amt">' + item.amt + '</span> ')
          .append($link);
        // separator
        if (i < arr.length - 1) {
          $listing.wiki('<br />');
        }

        // append to output
        $wrapper.append($listing);
      });
    } else {
      // no carried consume
      $wrapper.wiki(setup.consume.options.emptyMsg);
    }

    // display output
    $wrapper
      .addClass('cons-wrapper')
      .appendTo(this.output);
  }

});

// include alternate macro tags, if requested
if (setup.consume.options.macroAlts) {
  // <<cons>> macro
  Macro.add('cons', 'newcons');
  // <<consmenu>> macro
  Macro.add('consmenu', 'usableconsume');
}