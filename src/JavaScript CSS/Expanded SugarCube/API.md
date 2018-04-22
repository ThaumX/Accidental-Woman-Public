


## Insert Macros

This set of macros is designed to solve a fairly specific problem.  Consider the following code:

```
<div id='box'></div>

<<replace '#box'>>HELLO<</replace>>
```

This code will raise an error, as the TwineScript is parsed *before* the div we created ever renders.  You can solve this problem a few ways, but the easiest solution, in my book, is a set of macros that just does this:

```
<div id='box'></div>

<<insert '#box'>>HELLO<</insert>>

/% no errors, replacement successful %/
```

There's a trade-off, though.  Because these macros hold off on execution until after the passage loads, their exectuion becomes tied to the passage transition.  This means that they can only be used during passage transition--not with links, or timed macros.

### Macros

#### `<<insert>>` macro

**Syntax**:
`<<insert (element)>>...<</insert>>`

* element: a valid jQuery or CSS selector

**Explanation**:
Functionally the same as `<<replace>>`, except that the macro fires after the page has rendered and only then.

**Examples**:
```
<div id='box'></div>

<<insert '#box'>>HELLO<</insert>>
```

#### `<<insertappend>>` macro

**Syntax**:
`<<insertappend (element)>>...<</insertappend>>`

* element: a valid jQuery or CSS selector

**Explanation**:
Functionally the same as `<<append>>`, except that the macro fires after the page has rendered and only then.

**Examples**:
```
<div id='box'>Hello</div>

<<insert '#box'>> GOODBYE<</insert>>

/% renders as 'hello GOODBYE' %/
```

#### `<<clearelement>>` macro

**Syntax**:
`<<clearelement (element)>>`

* element: a valid jQuery or CSS selector

**Explanation**:
Empties the content from an element--functionally similar to an empty `<<insert>>`, though marginally more efficient.

**Examples**:
```
<div id='box'>HELLLLLLLOOOOOOOOO</div>

<<clearelement '#box'>>
```

## Message Macro

This macro displays a link or, optionally, a button. The link or button can be clicked to display a message immediately below it in the passage text, and clicked again to collapse the message. 

### Options

The message macro comes with just one option.  You can find the option near the top of the script.  It should look like this:

```javascript
// default text option:
setup.messageMacro.default = 'Help';
```

#### `setup.messageMacro.default` option

You can change the value of this option to change the default link text used by the message macro when no link text is provided.

### Macros

#### `<<message>>` macro

**Syntax**:
`<<message (optional: link text) (optional: 'btn' keyword) (optional: id)>>`

* link text: the text of the link.  if omitted, default text is displayed (the default text can be edited above)
* 'btn' keyword: if `btn` is included in the macro's arguments, a button is generated instead of a link
* id: if multiple messages are displayed on the same page with the same link text, you need to provide each one with a unique id.

**Explanation**:
Creates a link (or button) on the page.  When clicked, the content between the tags is displayed on the next line, reflowing the following text.  The player can click the same link again to 'collpase' the message.

**Styling Options**:
Message content is given the class `.message-text`; you can control the appearance of the message's content using this selector in your CSS. (For example: `.message-text {color: green;}` would render the text of all messages in green).

**Examples**:
```javascript
<<message>>Text<</message>>
// creates a link that reads 'Help' (by default) and can be clicked to display the content between the tags and clicked again to collapse the content.

<<message 'click me' btn>>Text<</message>>
// creates the message with the link text 'click me' and renders it as a button element

<<message 'Click here!' 'uniqueID'>>...<</message>>
<<message 'Click here!' 'anotherUniqueID'>>...<</message>>
// creates two messages with the same link text.  they must be given two different, unique IDs to appear in the same passage.
```

## Dialog API Macros

Macros for dealing with the dialog API. `<<dialog>>...<</dialog>>` lets you set up a dialog box, assign it a title and class(es), and write the code you want to appear inside it directly into your passage. `<<popup>>` is similar, but accepts a passage name as an argument, and uses that passage’s content as the content of the box.

### Macros

There are two macros included in this script.

#### `<<dialog>>` macro

**Syntax**:
`<<dialog (optional: title) (optional: class list)>>...<</dialog>>`

* title: the title of the resulting dialog box; if omitted, no title will be shown.
* class list:  classes to add to the dialog box, for styling via CSS

**Explanation**:
Opens a dialog box and appends the content between the tags to its body.  This macro should generally be paired with some interactive element (like a button or link), or the dialog box will open instantly when the passage loads.  The first argument (if any are given) should always be the dialog's title.  All additional arguments will be set as classes for styling in the CSS.

**Examples**:
```javascript
// displays the content in between the tags in a dialog box with the title 'Character Sheet' and the class '.char-sheet':
<<link 'Show Character Sheet'>>
	<<dialog 'Character Sheet' 'char-sheet'>>\
\
$name
|!Stat|!Value|
|Strength|$strength|
|Agility|$agility|
|Magic|$magic|
\
	<</dialog>>
<</link>>

// displays a dialog box with no title and no additional classes:
<<dialog>>Hello!<</dialog>>

// displays a dialog box with no title and the classes '.tutorial' and '.help':
<<button 'Show the Tutorial'>>
	<<dialog '' 'tutorial' 'help'>>
		Tutorial content.
	<</dialog>>
<</button>>
```

#### `<<popup>>` macro

**Syntax**:
`<<popup (passage) (optional: title) (optional: class list)>>`

* passage: the name of the passage whose content you want to append to the dialog box
* title: the title of the resulting dialog box; if omitted, no title will be shown.
* class list:  classes to add to the dialog box, for styling via CSS
	
**Explanation**:
`<<popup 'passage' 'title' 'class'>>` is essentially the same as `<<dialog 'title' 'class'>><<inlcude 'passage'>><</dialog>>`, and can be used as a shortcut for displaying a passage's content in a dialog box.

**Examples**:
```javascript
<<link 'Show Character Sheet'>>
	<<popup 'character sheet' 'Character Sheet' 'char-sheet'>>
<</link>>
// displays a dialog box that shows the content of passage 'character sheet', with the title 'Character Sheet', and the class '.char-sheet'

<<button 'Help!'>>
	<<popup 'help' '' 'help'>>
<</button>>
// displays the content of the passage 'help' in a dialog box with no title and the class '.help'.
```

## Dropdown Macro

A simple macro for creating a drop-down list selection, one of the only html inputs that is missing from SugarCube.

### Macros

#### `<<dropdown>>` macro

**Syntax**:
`<<dropdown (variable) (list of options)>>`

* variable: a TwineSctipt story (`$var`) or temproray (`_var`) variable, passed in quotes
* list of options: a list of options to populate the dropdown, passed as space-separated quoted strings or arrays, or any combination of the two.  if no options are given, an error will be raised.

**Explanation**:
The `<<dropdown>>` macro creates a dropdown-style input.  When a selection is made, the option is saved to the provided variable as a string.  The first argument must always be a variable passed in quotes.  The remaining arguments may be any combination of strings, variables (non-quoted), or arrays.  To pass an array literal, you must use backticks to force it to be evaluated as a single argument, or store it as a variable.

**Examples**:
```
::some passage
<<set $color to ''>>\
<<dropdown '$color' 'red' 'blue' 'green' 'purple' 'yellow' 'white' 'black' 'pink' 'orange'>>

[[continue|next passage]]

::next passage
<<run $(body).css('background-color', $color)>>
<<- $color>>

/% example using mixed types %/
<<set $a to ''>>
<<set $b to ['hello', 'woot', 'live']>>
<<set $c to 'purple'>>
<<set $d to ['1', '2']>>
<<dropdown '$a' $b $c $d 'blue' `['yay', 'never!', 'this example is dumb']`>>
/% ***note the backticks for the array literal %/
```


## Event Macros

This macro set allows Twine authors to create event programming without needing to use JavaScript or jQuery.

### Macros

#### `<<event>>` macro

**Syntax**:
```
<<event (type) (optional: selector)>>
    ...
	<<which (keycode)>>
	    ...
	<<which (keycode)>>
	    ...
<</event>>
```

* type: a valid jQuery event type.  Some events that may be of interest:
  * 'click': fires when an element is clicked on.
  * 'dblclick': fires when an element is double-clicked on.
  * 'keyup': fires when an key is pressed and released.
  * 'keydown': fires immediately when a key is pressed.
  * 'mouseup': fires when a mouse button is pressed and released.
  * 'mousedown': fires when a mouse button is pressed.
* selector: a valid jQuery/CSS selector.  with some events (such as key presses), this checks for focus; with others it checks for the target element of the event (such as mouse clicks).  if no selector is provided, the event is bound to the document element.
* keycode: an integer.  allows you to determine which key or mouse button triggered the event and react accordingly.  you can find keycodes [here](http://keycode.info/).

**Explanation**:
This macro set can be used to add more interaction to your game; things like keyboard hotkeys, controls, clickable non-link elements, and more.  Once registered, events are essentially permanent (though they can be removed via JavaScript and suppressed via code logic); therefore, the best place to create events is your StoryInit special passage.  Note that the element the event is tied to does not need to be rendered (or currently on the page or in the passage) in order to attach an event to it.

**Examples**:
```
/% stow/unstow the ui-bar on double-click %/
<<event 'dblclick' '#ui-bar'>>
    <<toggleclass '#ui-bar' 'stowed'>>
<</event>>

/% set up some hotkeys %/
<<event 'keyup'>>
<<which 67>> /% the c key %/
	<<if not tags().includes('menu')>> /% avoid menu loop %/
		<<goto 'character-menu'>>
	<</if>>
<<which 83>> /% the s key %/
	<<if not tags().includes('menu')>> /% avoid menu loop %/
		<<goto 'spells-menu'>>
	<</if>> 
<<which 77>> /% the m key %/
	<<masteraudio mute>>
<</event>>
```

#### `<<trigger>>` macro

**Syntax**:
`<<trigger (type) (optional: selector)>>`

* type: a valid jQuery event type
* selector: a valid jQuery/CSS selector.  if omitted, defaults to the document element

**Explanation**:
Allows you to simulate any event on any element.  This macro is useful for triggering events you may not otherwise have easy access to.

**Examples**:
```
/% close any dialog box when the player presses esc %/
<<event 'keydown'>>
<<which 27>>
	<<trigger 'click' '#ui-dialog-close'>>
<</event>>
```

## Simple Inventory

A collection of macros and functions for managing a basic, array-based inventory system for 'key’ style items, allowing items to be added to and removed from the inventory. It also includes its own simple if/else style macro that specifically checks for items (or lists of items) and runs code conditionally from there. Also provides support for displaying the inventory, sorting the inventory, and searching the inventory. Does not support more advanced items, like weapons or armor with their own stats, or stackable items, like potions, though it could be extended to at least help manage such systems.

You can use the simple inventory system for other things too, like achievements, titles, or any sort of in-game collection.

### Options

This system includes two options.  You can find the options object near the top of the script.  It should look like this:

```javascript
// options object:
setup.simpleInv.options = {
	storyVar  : 'inventory',
	tryGlobal : true
};
```

#### `storyVar` option
The simple inventory script automatically creates a story variable array to hold the inventory; this allows you to save and load the inventory via SugarCube's built-in save system and it allows you to access the inventory natively in the IDE using a `$variable`.  By default, the story variable is created with the name `'inventory'` and accessed via `$inventory` in the IDE.  You can change the name using the `storyVar` option.  Valid names are the same as all valid TwineScript variable names.

**Examples**:
```javascript
setup.simpleInv.options = {
	storyVar  : 'keyItems',    // changes the story variable to $keyItems
...
```

```javascript
setup.simpleInv.options = {
	storyVar  : 'achievements',    // changes the story variable to $achievements
...
```

```javascript
setup.simpleInv.options = {
	storyVar  : 'rockCollection',    // changes the story variable to $rockCollection
...
```

#### `tryGlobal` option
There are two 'helper' functions included in these scripts: `setup.simpleInv.invAll()` and `setup.simpleInv.invAny()`.  You can read more about how to use these functions below.  Obviously, both are a mouthful, so the function definitions get referenced by the global functions `invAll()` and `invAny()`.  These functions are only created if their names are undefined, to prevent any potential compatibility issues.  However, if you'd prefer to keep these functions out of the global scope, you can set this value to false and they won't be sent to the global scope at all, even if their names aren't taken.  You'll be forced to write out the longer `setup.someInv...` functions, though.

### Macros

This is a list of the macros included in the simple inventory system.

#### `<<inventory>>` macro

**Syntax**:
 `<<inventory (optional: separator)>>`
 
* separator: a string to separate each item in the inventory.

**Explanation**:
The `<<inventory>>` macro displays a list of the current items in the inventory array.  By default the items are listed on new lines, but you can provide a string as a separator instead.

**Examples**:
```javascript
// Assume the inventory includes: 'business card', 'keys', 'cellphone'

<<inventory>> will display:
	business card
	keys
	cellphone

<<inventory ', '>> will display:
	business card, keys, cellphone

<<inventory 'hello!'>> will display:
 business cardhello!keyshello!cellphone
 ```

 #### `<<pickup>>` macro
 
 **Syntax**:
 `<<pickup (list of items)>>`
 
* list of items: a list of items, provided as quoted strings, each seperated by a space.
 
 **Explanation**:
 The `<<pickup>>` macro adds new items to the inventory.  New items are added to the end of the inventory array.
 
 **Examples**:
```javascript
<<pickup 'rusty key'>> // adds 'rusty key' to the inventory
<<pickup 'key' 'ball'>> //adds 'key' and 'ball' to the inventory
<<pickup rusty key>> // !!! passing arguments that aren't quoted can cause problems.  in this case, 'rusty' and 'key' will be added to the inventory as two separate items.
```

#### `<<drop>>` macro

**Syntax**:
`<<drop (list of items)>>`
 
* list of items: a list of items, provided as quoted strings, each seperated by a space.
 
 **Explanation**:
 The `<<drop>>` macro removes items from the invenotory.  If an item provided to this macro cannot be found in the current inventory, nothing happens and no error is thrown.
 
 **Examples**:
```javascript
<<drop 'rusty key'>> // removes 'rusty key' from the inventory, if it is in the inventory
<<drop 'key' 'ball'>> //removes 'key' and 'ball' from the inventory, if either one is in the inventory
```

#### `<<has>>` macro

**Syntax:**
```javascript
<<has (list of items)>>
	...
<<otherwise>>
	...
<</has>>
```

* list of items: a list of items, provided as quoted strings, each seperated by a space.

**Explanation**:
The macros `<<has>><<otherwise>><</has>>` provide a simple alternative to `<<if>><<else>><</if>>` that specifically work within the inventory system.  If more than one item is passed to `<<has>>`, **all** of the items must be present for the `<<has>>` statement to be true.  If you need more control than that, use the helper functions `invAll()` and `invAny()` with normal `<<if>>` statements.

Note that these macros are not as flexible as standard `<<if>>` macros, and are meant to compliment them rather than replace them; it's a shortcut. 

**Examples**:
```javascript
<<has 'key'>>\
	You have the key!
	[[Unlock the door.]]
<</has>>

<<has 'key'>>\
	You have the key!
	[[Unlock the door.]]
<<otherwise>>
	The door is locked tight and you can't get it open.
<</has>>

// for more advanced/complex stuff, use <<if>>; still, the following does work:
<<has 'helmet' 'breastplate' 'greaves' 'gauntlets' 'boots'>>
	You have a full set of armor on.
<<otherwise>>
	<<has 'sword'>>
		At least you're armed.
	<<otherwise>>
		You're not prepared at all for this...
	<</has>>
<</has>>
```

#### `<<invSort>>` macro

**Syntax**:
`<<invSort>>`

**Explanation**:
The `<<invSort>>` macro sorts the inventory alphabetically.  The default inventory order is chronological.  Note that the default order cannot easily be restored.

**Examples**:
```javascript
// given the inventory array: 'keys', 'business card', 'cellphone'

<<invSort>><<inventory '; '>> will display:
		business card; cellphone; keys
```

#### `<<invWhatIs>>` and `<<invWhereIs>>` macros

**Syntax**:
```javascript
<<invWhatIs (index)>>
<<invWhereIs (item)>>
```

* item: A single item, provided as a quoted string.
* index: A positive integer (or zero) referring to a position within the inventory array.

**Explanation**:
These two macros are for debugging/extending the system.  Both set the temporary variable `_is` to some value.  `<<invWhatIs>>` accepts an index from the array and sets `_is` to the item found in that index, or the string `'nothing'` if the index is empty or undefined.  `<<invWhereIs>>` accepts an item's name and sets the value of `_is` to that item's index in the array.  If the item isn't currently in the array, it sets `_is` to `-1`.

It's unlikely that you'll need to use these macros much (if at all) if you're using the simple inventory system as-is, but they can help with finding bugs and extending the system's functionality.

**Examples**:
```javascript
// given the inventory: 'business card', 'keys', 'cellphone'

<<invWhatIs 0>>
<<print _is>> // prints 'business card'

<<invWhatIs 2>>
<<print _is>> // prints 'cellphone'

<<invWhatIs 3>>
<<print _is>> // prints 'nothing'

<<invWhatIs $inventory.length - 1>>
The last item in the inventory is <<print _is>>.

<<invWhereIs 'keys'>>
<<print _is>> // prints 1

<<invWhereIs 'wallet'>>
<<print _is>> // prints -1

<<invWhereIs 'notebook'>>
<<if _is is -1>>
	<<pickup 'notebook'>>
<</if>> // adds notebook is it doesn't exist in inventory

<<invWhereIs 'keys'>>
<<print _is>> // prints 1
<<invWhatIs _is>>
<<print _is>> // prints 'keys'
```

### Functions

*A note about the functions*:  The functions exist in both the `setup.simpleInv` namespace and as globals.  There is a very small chance that you'll need to use the nonglobal versions if the names of the functions are already taken.  To use the nonglobal versions, append the funtion's names with `setup.simpleInv.`.  For example, `invAll()` would become `setup.simpleInv.invAll()`.  If you set the `tryGlobal` option to `false` (see above), you'll have to use the nonglobal versions.

#### `invAll()` function

**Syntax**:
`invAll(item list)`

* item list: a list of quoted strings, seperated by commas.

**Explanation**:
The `invAll()` function returns true only if **all** of the provided items are found in the inventory.  Most useful when paired with `<<if>>` macros.  The `invAll()` function is essentially the same as the `<<has>>` macro.

**Examples**:
```javascript
<<if invAll('red key', 'blue key', 'yellow key')>>
	You have all the keys you need to open the vault!
<</if>>

<<set $surviveFireTrap to invAll('helmet', 'heat suit')>>
Flames explode out of the walls \
<<if $surviveFireTrap>>\
	but your helmet and heat suit protect you!
	
	[[You make it through the trap]].
<<else>>\
	and kill you!
	
	[[You die]].
<</if>>
```

#### `invAny()` function

**Syntax**:
`invAny(item list)`

* item list: a list of quoted strings, seperated by commas.

**Explanation**:
The `invAny()` function returns true if **any** of the provided items are found in the inventory.  Most useful when paired with `<<if>>` macros.

**Examples**:
```javascript
<<if invAny('lockpick', 'master key')>>
	You can [[unlock the door]].
<<else>>
	You'll need to find something to help you unlock this door.
<</if>>

<<if invAny('cellphone', 'walkie-talkie')>>
	You're getting a call.  [[Answer it]]?
<</if>>

<<set $isArmed to invAny('sword', 'axe', 'gun', 'baseball bat')>>
<<if $isArmed>>
	You have a weapon.
<</if>>

Flames explode out of the walls \
<<has 'helmet' 'heat suit'>>\
	but your helmet and heat suit protect you!
	
	[[You make it through the trap]].
<<otherwise>>\
	<<if invAny('helmet', 'heat suit')>>\
		and burn you badly!
	
		[[You barely survive]].
	<<else>>\	
		and kill you!
	
		[[You die]].
	<</if>>
<</has>>
```

## Consumables System

A system for adding consumable items to your game. Similar to the cycles system, a consumable must first be defined (using `<<newconsumable>>`). Once a consumable definition is created, the consumable item can be added to the player’s inventory, removed from it, used, and otherwise manipulated. Consumable definitions should go in your StoryInit special passage.

A consumable definition includes: 
* A name, for displaying. 
* An ID for manipulation. The ID should generally follow the rules of a normal TwineScript variable. If the name meets these conditions, you can omit the ID. 
* A code snippet to run when the consumable is used. By default, output is suppressed (i.e. the code runs silently), though you can change this if you want. You can still use the dialog API or DOM macros for output, though. You can omit this, though it's the main draw of this system. 
* A description. You can provide a second code chunk as a description, or a passage name. If you provide a passage name, that passage will be rendered in a dialog box as a description when used. You should either provide a passage name to the `<<description>>` tag as an argument or enter code following the tag, not both. Descriptions are completely optional. 

Some notes. 
* This system works in two phases; you define a consumable, and then you manipulate it in relation to the player’s inventory. 
* Consumables are not widgets, though they fire code chunks on use. These code chunks are not as functional as widgets, so don't use them as a replacement for widgets. 
* The consumable inventory is its own entity, and can be used alongside the the simple inventory, but they cannot be used to help manage each other (you can't use functions and macros from one system to effect the other).

The consumables system could also be extended to help manage other things, such as spell systems or even rudimentary equipment systems.

### Options

This system includes five options.  You can find the options object near the top of the script.  It should look like this:

```javascript
setup.consumables.options = {
	storyVar   : 'consumables',
	emptyMsg   : 'Not carrying any consumables.',
	tryGlobal  : true,
	macroAlts  : true,
	silentCode : true
};
```

#### `storyVar` option
The consumables system script automatically creates a story variable object to hold all of the created consumable definitions; this allows you to save and load the consumables via SugarCube's built-in save system and it allows you to access the consumables natively in the IDE using a `$variable`.  By default, the story variable is created with the name `'consumables'` and accessed via `$consumables` in the IDE.  You can change the name using the `storyVar` option.  Valid names are the same as all valid TwineScript variable names.

#### `emptyMsg` option

When the you attempt to display a list of consumables currently in the player's inventory (through the `<<listconsumables>>` or `<<usableconsumables>>` macros) and the inventory is empty, this string is parsed (wikified).  You can use valid TwineScript code in the string; for example, you could change the option to `"<<include 'no-items-passage'>>"` to display a passage called `no-items-passage` instead of printing a string.

#### `tryGlobal` option

There are several 'helper' functions included in this script: `setup.consumables.getConsumable`, for example.  You can read more about these function below.  Obviously, this is a mouthful, so the function definitions get copied over as global functions, i.e. `getConsumable()`.  These global functions are only created if their names are undefined, to prevent any potential compatibility issues.  However, if you'd prefer to keep the functions out of the global scope all together, you can set this value to false and they won't be sent to the global scope at all, even if their names are available.  You'll be forced to write out the longer `setup.consumables.getConsumable()` style functions, though.

#### `macroAlts` option

This script includes two macros that can be called by different names: you can use the macro `<<consumable>>` instead of `<<newconsumable>>` and the macro `<<consumablemenu>>` instead of `<<usableconsumables>>`.  If you switch this option to false, these additional macro definitions are not inlcuded.

#### `silentCode` option

By default, the code associated with a consumable is silent, though you can override this in the `<<useconsumable>>` macro call.  Set this option to false to change this default behavior and allow code to output normally.  Note that the code run by the `<<usableconumables>>` macro is **always** run silently, regardless, as output would break the listing.  Note that you can still generate output using DOM macros or the dialog API, regardless of how you set this option.

### Macros

This is a list of macros included in the consumables system.

#### `<<newconsumable>>` macro

Also known as `<<consumable>>`.

 **Syntax**:
 ```
<<newconsumable (name) (optional: ID)>>
	(optional: use code)
(optional: <<description (optional: passage name)>>)
	(optional: description code)
<</newconsumable>>
 ```
 
* name: the name of the new consumable to create, a string for displaying to the end-user
* ID:  an ID to refer to the consumable by, should be a valid TwineScript identifier.  if omitted, the name is used as the ID
* use code: TwineScript code to fire when the consumable is used.
* passage name: the name of a passage containing the consumable's description
* description code: code to use when a description is requested, if a passage name isn't provided
 
 **Explanation**:
The `<<newconsumable>>` macro is used to construct a new consumable definition.  A consumable needs to be given a name, and the name will be used as the ID if none is provided.  It is highly, highly recommended that you inlcude an ID if the consumables name would not function as a TwineScript variable (like, for example, if it starts with something other than a letter or if it includes spaces).  You'll use the ID (not the name) to interact with your consumable throughout the rest of the macros and functions.  

Next, you can include TwineScript code after the `<<newconsumable>>` tag and before the `<<description>>` or closing tag.  This code will be run every time the consumable is used, making it somewhat like a widget.  (**WARNING**: Consumables should not be used as a replacement for widgets.)  Finally, you can optionally include a description, either as a passage name (passed as an argument to the `<<description>>` tag), or as your own snippet of code following the `<<description>>` tag and before the closing tag.  The description it run when the player clicks on the name of the consumable in the `<<usableconsumables>>` macro.  If a passage is given, the passage is rendered and displayed by the Dialog API.  Note that you need to choose one or the other--do not include both a passage name and your own description code. 

Note that if a consumable is created and given the ID of another consumable that already exists, the new consumable will overwrite the old without raising an error.  The `StoryInit` special passage is the best place to define consumables.

 **Examples**:
```
/% a health potion %/
<<newconsumable 'health potion' 'hpPot'>>
	<<if $hp gte 100>>
		<<run UI.alert('Already at full health.')>>
		<<addconsumable 'hpPot'>>
	<<else>>
		<<set $hp += 20>>
		<<if $hp gte 100>>
			<<set $hp to 100>>
		<</if>>
		<<run UI.alert('Recovered some health.')>>
	<</if>>
<<description 'health-potion-description'>>
<</newconsumable>>

/% mana potion %/
<<newconsumable 'mana potion' 'mpPot'>>
	<<set $mp++>>
	<<set $mp.clamp(0, 10)
<<description>>
	<<run UI.alert('A mana potion.')>>
<</newconsumable>>

/% a poison vial %/
<<consumable 'poison'>>
	/% no ID needed %/
	<<set $hp -= 10>>
	/% no description %/
<</consumable>>
```

#### `<<addconsumable>>` macro

**Syntax**:
`<<addconsumable (ID) (optional: number)>>`

* ID: The ID of a defined consumable.
* number: The number of said consumables you wish to add to the player's inventory.  If no number is provided, defaults to 1.

**Explanation**:
You can use the `<<addconsumable>>` macro to add consumables to the player's inventory, either one at a time, or in bulk.  If the consumable is already present in the inventory, it's amount will increase by the indicated number.  If the item isn't in the player's inventory at all, it will be added with the indicated number as the total amount.

**Examples**:
```
<<addconsumable 'potion' 3>>
/% adds three potions to the player's inventory %/

<<addconsumable 'mpPot'>>
/% adds one 'mpPot' consumable to the player's inventory %/
```

#### `<<dropconsumable>>` macro

**Syntax**:
`<<dropconsumable (ID) (optional: number)>>`

* ID: The ID of a defined consumable.
* number: The number of said consumables you wish to remove from the player's inventory.  If no number is provided, defaults to 1.

**Explanation**:
You can use the `<<dropconsumable>>` macro to remove consumables from the player's inventory, either one at a time, or in bulk.  If the consumable's amount reaches 0, it will be completely removed from the inventory.  If it would become less than zero, it will be set to 0 instead and removed.  If the item isn't in the player's inventory at all, nothing happens and no error is thrown.

**Examples**:
```
<<dropconsumable 'potion' 3>>
/% removes three potions from the player's inventory %/

<<addconsumable 'mpPot'>>
/% removes one 'mpPot' consumable from the player's inventory %/
```

#### `<<clearconsumables>>` macro

**Syntax**:
`<<clearconsumables (list of IDs)>>`

* list of IDs: a list of consumable IDs passed as a space separated list of quoted strings.

**Explanation**:
The `<<clearconsumables>>` macro reduces the amount of consumables in the players inventory to zero for all the provided consumables, effectively removing them from the inventory, regardless of how many there are.  Functionally works as a 'drop all' command, except that the macro can accept any number of consumable IDs.

**Examples**:
```
<<clearconsumables 'mpPot' 'hpPot'>>
/% removes all hp and mp potions from the player's inventory %/

<<clearconsumables 'poison'>>
/% removes all posion vials from the player's inventory %/
```

#### `<<deleteconsumables>>` macro

**Syntax**:
`<<deleteconsumables (list of IDs -OR- 'all' keyword)>>`

* list of IDs: a list of consumable IDs passed as a space separated list of quoted strings.
* 'all' keyword: the keyword `all`.

**Explanation**:
The `<<deleteconsumables>>` macro deletes the definitions of the consumables provided to it.  These definitions cannot be recovered.  If the `all` keyword is used instead, all consumable definitions will be deleted.  **NOTE**: This literally deletes the definitions--it does not just remove consumables from the inventory.  The definitions set up by the `<<newconsumable>>` macro are gone and forgotten.  You probably won't ever need to use this macro.  (If you need to adjust a consumable definition, overwrite it with `<<newconsumable>>`.)

**Examples**:
```
<<deleteconsumables 'mpPot' 'hpPot'>>
/% deletes the consumable definitions for 'hpPot' and 'mpPot' %/

<<deleteconsumables all>>
/% deletes all consumable definitions -- no earth like scorched earth %/
```

#### `<<useconsumable>>` macro

**Syntax**:
`<<useconsumable (ID) (optional: output keyword)>>`

* ID: the ID of a defined consumable.
* output keyword: the keyword `silent` causes the output of the use code to be suppressed, while the `unsilent` keyword unsuppresses the output

**Explanation**:
The `<<useconsumable>>` macro fires the indicated consumable's code and reduces the amount of that consumable in the player's inventory by 1.  If the player doesn't have any consumables, the macro does nothing, but won't raise an error.  By default, the `silentCode` option is set to true, meaning that the code that is run by this macro does not output anything.  You can change the `silentCode` option in the options object, and override it regardless of its setting via the `silent` and `unsilent` keywords.

**Examples**:
```

<<link 'Use a health potion.'>>
	<<useconsumable 'hpPot'>>
	/% reduce stack of 'hpPot' by one and fire code %/
<</link>>\


<<useconsumable 'posion' silent>> 
/% suppress output, regardless of silentCode option %/

<<useconsumable 'mpPot' unsilent>> 
/% display output, regardless of silentCode option %/
```

#### `<<sortconsumables>>` macro

**Syntax**:
`<<sortconsumables>>`

**Explanation**:
Sorts the list of consumables in the player's inventory (and only in the player's inventory) alphabetically.  The default order is chronological.

#### `<<listconsumables>>` macro

**Syntax**:
`<<listconsumables (optional: separator)>>`

* separator: a string to separate the consumables list; defaults to a new line if omitted.

**Explanation**:
Prints a static, text-only, non-interactive list of the consumables currently in the player's inventory, along with their amounts.  By default, each consumable is separated by a new line, but you can provide your own string as an argument to separate the list.

**Examples**:
```
/% given an inventory containing 1 health potion, 3 mana potions, and 6 phoenix downs %/

<<listconsumables>>
/%
yields:
health potion: 1
mana potion: 3
phoenix down: 6
%/

<<listconsumables ', '>>
/%
yields:
health potion: 1, mana potion: 3, phoenix down: 6
%/

<<listconsumables 'blah'>>
/%
yields:
health potion: 1blahmana potion: 3blahphoenix down: 6
%/
```

#### `<<usableconsumables>>` macro

Also known as `<<consumablemenu>>`.

**Syntax**:
`<<usableconsumables>>`

**Explanation**:
The `<<usableconsumables>>` macro creates a dynamic, linked list of consumables.  The list is always separated by new lines, and otherwise is the same as the list generated by the `<<listconsumables>>` macro except that, (1) if the consumable has a description, the name of the consumable is clickable, and clicking on it will run the description code, and (2) a 'Use' link is added after the amount, and clicking on this link fires the `<<useconsumable>>` macro on the selected consumable (always in silent mode).  The displayed amount will be updated if a consumable is used.

**Examples**:
```
<<usableconsumables>>

<<consumablemenu>>
```

### Functions

*A note about the functions*:  The functions exists in both the `setup.consumables` namespace and as globals.  There is a very small chance that you'll need to use the nonglobal versions if the name of a function is already taken.  The nonglobal versions are in the `setup.consumables` namespace.  You'll have to use the longer syntax if the `tryGlobal` option is set to false (see above).

#### `getConsumable()` function

**Syntax**:
`getConsumable(ID)`:

* ID: the ID of a defined consumable.

**Explanation**:
Returns a deep copy of the indicated consumable's definition object.  Changes to this copy object will not be reflected in the consumable, so treat the resulting data as read-only.  Returns null if the consumable cannot be found.

A consumable has the following properties that you may wish to access:
* **id**: the consumable's id (string)
* **name**: the consumable's name (string)
* **code**: the consumable's 'use' TwineScript code (string)
* **descr**: the consumable's description type (string - either `'passage'` or `'code'`)
* **dCode**: the consumable's description code, either a passage name or a chunk of user-defined TwineScript code (string)
* **amt**: the consumable's current amount, i.e. how many the player has in the inventory, or 0 if the consumable isn't currently in the inventory (number)

You can also access the consumable's definition via the story variable and use it's ID as the first property (`$consumables[ID]` by default). 

**Examples**:
```
<<set _item to getConsumable('hpPot')>>
<<print _item.name>>

<<print getConsumable('hpPot').amt>>

<<print $consumables['hpPot'].amt === getConsumable('hpPot').amt>> /% true %/
/% accessing the individual properties compares their literal values, 
   however accessing them as objects: %/
<<print $consumables['hpPot'] === getConsumable('hpPot')>> /% false %/
/% the getConsumable() function returns a copy, which is a different (though equivalent) object,
   and objects are only equal if both they are the same... 
   note that == would yield same result here as === %/
```

#### `hasConsumable()` function

**Syntax**:
`getConsumable(ID, [optional: number])`:

* ID: the ID of a defined consumable.
* number: the number to check against; defaults to 1 if omitted.

**Explanation**:
Returns true if the player has an amount of the indicated conusmable that is greater than or equal to the number provided.  If no number is provided, returns true if the player has at least one.

**Examples**:
```
<<if hasConsumable('hpPot', 10)>>
	You have more than ten potions.
<<elseif hasConsumable('hpPot')>>
	You have at least one potion.
<</if>>

<<if hasConsumable('hpPot')>>\
	<<link 'Use a health potion.'>>
		<<useconsumable 'hpPot'>>
	<</link>>\
<</if>>
```

#### `amtOfConsumable()` function

**Syntax**:
`amtOfConsumable(ID)`

* ID: the ID of a defined consumable.

**Explanation**:
Returns the amount of the indicated consumable in the player's inventory.  If the consumable isn't in the player's inventroy, returns 0.  If the consumable cannot be found, returns -1.

**Examples**:
```
<<if amtOfConsumable('hpPot') gte 20>>
	You have enough potions to fight the dragon!
<</if>>

You have <<print amtOfConsumable('hpPot')>> potions.
```

#### `consumableExists()` function

**Syntax**:
`consumableExists(ID)`

* ID: the ID of a defined consumable.

**Explanation**:
Returns true if the indicated consumable is defined.

**Examples**:
```
<<if !consumableExists('hpPot')>>
	<<newconsumable 'health potion' 'hpPot'>>...
	
<<if consumableExists('hpPot')>>
	HEALTH POTIONS ARE REAL!!!!!!
<</if>>
```

#### `getConsumableName()`, `getConsumableCode()`, and `getConsumableDescr()` functions

**Syntax**:
```
getConsumableName(ID)
getConsumableCode(ID)
getConsumableDescr(ID)
```

* ID: the ID of a defined consumable.

**Explanation**:
Returns the indicated property of the consumable.  `getConsumableCode()` returns TwineScript code which may be parsed if you attempt to print it.  `getConsumableDescr()` returns a two part string array; the first index (0) is the type of code (`'passage'`, `'code'`, or `'null'`), and the second index (1) includes the code or passage name used by the description.  If the consumable is not defined, or if it doesn't include the property in question, these functions will return null.

**Examples**:
```
<<print getConsumableName('hpPot')>>

/% run a consumable's code without reducing it's amt: %/
<<print getConsumableCode('hpPot')>>
/% the code will be wikified by the print statement, if it's valid %/

<<set _descr to getConsumableDescr('hpPot')>>
<<if _descr[0] is 'passage'>>
	<<goto _descr[0]>>
<</if>>

<<if getConsumableDescr('hpPot')[0] is null>>
	No description.
<</if>>
```

#### `getAllConsumables()` and `getCarriedConsumables()` functions

**Syntax**:
```
getAllConsumables()
getCarriedConsumables()
```

**Explanation**:
The `getAllConsumables()` function returns a string array of all of the IDs of all of the currently defined consumables, while the `getCarriedConsumables()` function returns an array of the IDs of all the consumables currently in the player's inventory.

**Examples**:
```
<<print getAllConsumables().join(', ')>>
/% lists all the consumables in the game %/

<<print getCarriedConsumables().join(', ')>>
/% lists all the consumables in the player's inventory %/
```

#### `findConsumableByIndex()` and `findIndexOfConsumable()` functions

**Syntax**:
```
findConsumableByIndex(index)
findIndexOfConsumable(ID)
```

* index: an index in the `$consumables.all` array
* ID: the ID of a defined consumable.

**Explanation**:
Primarily for debugging and extending the system, these functions are used to locate consumables in the `$(storyVar).all` array.  `findIndexOfConsumable()` returns the index of the indicated consumable, or -1 if it isn't defined.  `findConsumableByIndex()` returns the ID of the consumable in the indicated index, or null if there is no consumable in said index.

**Example**:
```
<<set _index to findIndexOfConsumable('hpPot')>>
<<print findConsumableByIndex(_index)>>
/% prints 'hpPot' %/
```