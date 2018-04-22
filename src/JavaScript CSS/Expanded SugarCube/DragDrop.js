/******************************************
|  ╔╦╗┬─┐┌─┐┌─┐  ┌─┐┌┐┌┌┬┐  ╔╦╗┬─┐┌─┐┌─┐  |
|   ║║├┬┘├─┤│ ┬  ├─┤│││ ││   ║║├┬┘│ │├─┘  |
|  ═╩╝┴└─┴ ┴└─┘  ┴ ┴┘└┘─┴┘  ═╩╝┴└─└─┘┴    |
******************************************/
/*
dragula(containers, {
  isContainer: function (el) {
    return false; // only elements in drake.containers will be taken into account
  },
  moves: function (el, source, handle, sibling) {
    return true; // elements are always draggable by default
  },
  accepts: function (el, target, source, sibling) {
    return true; // elements can be dropped in any of the `containers` by default
  },
  invalid: function (el, handle) {
    return false; // don't prevent any drags from initiating by default
  },
  direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
  copy: false,                       // elements are moved by default, not copied
  copySortSource: false,             // elements in copy-source containers can be reordered
  revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
  removeOnSpill: false,              // spilling will `.remove` the element, if this is true
  mirrorContainer: document.body,    // set the element that gets mirror elements appended
  ignoreInputTextSelection: true     // allows users to select input text, see details below
});
*/

/*ara arg objects properties
ident: element ID (no #)
max: false or number - max allowed items in area
min: false or number - minimum number in container
*/

setup.drag = {
  create: function(home, ...ara){
    if(ara.length < 2){
      return new SyntaxError("Tried to create a drag and drop without at least two areas.");
    }
    let min = false, mines = {}, max = false, maxes = {};
    var jizz = "aw.drake = dragula([";
    for(let i = 0, le = ara.length; i < le; i++){
      jizz += `document.querySelector('#${ara[i].ident}')`;
      if(i < (le-1)){
        jizz += ", ";
      }
      if(ara[i].min){
        min = true;
        mines[ara[i].ident] = ara[i].min;
      }
      if(ara[i].max){
        max = true;
        maxes[ara[i].ident] = ara[i].max;
      }
    }
    jizz += "]";
    if(min || max){
      jizz += ",{";
    }
    if(min){
      let keys = Object.keys(mines);
      jizz += "moves: function(el, source, handle, sibling){let minvals = {";
      for(let i = 0, lu = keys.length; i < lu; i++){
        jizz += `${keys[i]}:${mines[keys[i]]},`;
      }
      jizz += `},minlist = ['${keys.join("','")}'];`;
      jizz += "if(minlist.includes(source.id)){";
      jizz += "let cunt = source.children.length;";
      jizz += "if(cunt <= minvals[source.id]){return false;}";
      jizz += "}return true;},";
    }
    if(max){
      let keys = Object.keys(maxes);
      jizz += "accepts: function (el, target, source, sibling){let maxvals = {";
      for(let i = 0, lu = keys.length; i < lu; i++){
        jizz += `${keys[i]}:${maxes[keys[i]]},`;
      }
      jizz += `},maxlist = ['${keys.join("','")}'];`;
      jizz += "if(maxlist.includes(target.id)){";
      jizz += "let cunt = target.children.length;";
      jizz += "if(cunt >= maxvals[target.id]){return false;}}";
      if(home){
        jizz += "if(aw.homeItems[el.id].notRoom.includes(target.id)){return false;}";
      }
      jizz += "return true;},";
    }
    jizz += "});";
    eval(jizz);
  },
  homeListener: function(){
    aw.drake.on("drop",function(el, target, source, sibling){
      let index = State.active.variables.home.item[source.id].indexOf(el.id);
      State.active.variables.home.item[source.id].splice(index,1);
      State.active.variables.home.item[target.id].push(el.id);
    });
  },
  formatHome: function(items){
    if(items == null || !Array.isArray(items)){
      return new TypeError("Invalid item list array sent to format home function - either null or non-array sent.");
    }
    let c = items.length;
    let ret = "";
    for(let i = 0; i < c; i++){
      let ob = aw.homeItems[items[i]];
      let forbid = "<span class='bad' style='font-size:15px;'>[";
      for(let i = 0, c = ob.notRoom.length; i < c; i++){
        forbid += ob.notRoom[i].slice(0,3);
        if(i < (c-1)){
          forbid += "|";
        }
      }
      forbid += "]</span>";
      let img = ob.image.slice(19,ob.image.search(/'\sclass/));
      ret += `<div id="${ob.key}" class="dragItem">[img[${img}]]${ob.name}<br>Type:${ob.type} Q:${ob.quality} ${forbid}</div>`;
    }
    return ret;
  },
  jewelry: function(){
    let cunts = [document.querySelector("#owned")];
    for(let i = 0, c = setup.jewel.slotNames.length; i < c; i++){
      if(State.active.variables.PC.jewel.pierced[setup.jewel.slotNames[i]]){
        let y = "#" + setup.jewel.slotNames[i];
        cunts.push(document.querySelector(y));
      }
    }
    aw.drake = dragula(cunts,{accepts: function (el, target, source, sibling){
      if(target.id == "owned"){
        return true;
      }else if(target.children.length > 0){
        return false;
      }else if(setup.jewel.slotChecker(el.id, target.id)){
        return true;
      }
      return false;
    },
    });
  },
  jewListener: function(){
    aw.drake.on("drop",function(el, target, source, sibling){
      if(source.id == "owned"){
        let index = State.active.variables.PC.jewel[source.id].indexOf(el.id);
        State.active.variables.PC.jewel[source.id].splice(index,1);
      }else{
        State.active.variables.PC.jewel[source.id] = "none";
      }
      if(target.id == "owned"){
        State.active.variables.PC.jewel[target.id].push(el.id);
      }else{
        State.active.variables.PC.jewel[target.id] = el.id;
      }
      aw.S();
    });
  },
  formatJewinv: function(items){
    let c = items.length;
    let ret = "";
    for(let i = 0; i < c; i++){
      if(items[i] !== "none"){
        let x = (aw.jewel[items[i]].name.length > 12)? aw.jewel[items[i]].name.slice(0,12) : aw.jewel[items[i]].name;
        ret += `<div id="${aw.jewel[items[i]].key}" class="jewItem">[img[${aw.jewel[items[i]].image}]]<span class="head"><b>${x}</b></span><br>${aw.jewel[items[i]].slot}</div>`;
      }
    }
    return ret;
  },
  formatJew: function(item){
    if(item != "none"){
      let x = (aw.jewel[item].name.length > 12)? aw.jewel[item].name.slice(0,12) : aw.jewel[item].name;
      return `<div id="${aw.jewel[item].key}" class="jewItem">[img[${aw.jewel[item].image}]]<span class="head"><b>${x}</b></span><br>${aw.jewel[item].slot}</div>`;
    }else{
      return "";
    }
  }
};



/*******************************************
Use Information:

The dragula method returns a tiny object with a concise API. We'll refer to the API returned by dragula as drake.

drake.containers
This property contains the collection of containers that was passed to dragula when building this drake instance. You can push more containers and splice old containers at will.

drake.dragging
This property will be true whenever an element is being dragged.

drake.start(item)
Enter drag mode without a shadow. This method is most useful when providing complementary keyboard shortcuts to an existing drag and drop solution. Even though a shadow won't be created at first, the user will get one as soon as they click on item and start dragging it around. Note that if they click and drag something else, .end will be called before picking up the new item.

drake.end()
Gracefully end the drag event as if using the last position marked by the preview shadow as the drop target. The proper cancel or drop event will be fired, depending on whether the item was dropped back where it was originally lifted from (which is essentially a no-op that's treated as a cancel event).

drake.cancel(revert)
If an element managed by drake is currently being dragged, this method will gracefully cancel the drag action. You can also pass in revert at the method invocation level, effectively producing the same result as if revertOnSpill was true.

Note that a "cancellation" will result in a cancel event only in the following scenarios.

revertOnSpill is true
Drop target (as previewed by the feedback shadow) is the source container and the item is dropped in the same position where it was originally dragged from
drake.remove()
If an element managed by drake is currently being dragged, this method will gracefully remove it from the DOM.

drake.on (Events)
The drake is an event emitter. The following events can be tracked using drake.on(type, listener):

Event Name	Listener Arguments	Event Description
drag	el, source	el was lifted from source
dragend	el	Dragging event for el ended with either cancel, remove, or drop
drop	el, target, source, sibling	el was dropped into target before a sibling element, and originally came from source
cancel	el, container, source	el was being dragged but it got nowhere and went back into container, its last stable parent; el originally came from source
remove	el, container, source	el was being dragged but it got nowhere and it was removed from the DOM. Its last stable parent was container, and originally came from source
shadow	el, container, source	el, the visual aid shadow, was moved into container. May trigger many times as the position of el changes, even within the same container; el originally came from source
over	el, container, source	el is over container, and originally came from source
out	el, container, source	el was dragged out of container or dropped, and originally came from source
cloned	clone, original, type	DOM element original was cloned as clone, of type ('mirror' or 'copy'). Fired for mirror images and when copy: true
drake.canMove(item)
Returns whether the drake instance can accept drags for a DOM element item. This method returns true when all the conditions outlined below are met, and false otherwise.

item is a child of one of the specified containers for drake
item passes the pertinent invalid checks
item passes a moves check
drake.destroy()
Removes all drag and drop events used by dragula to manage drag and drop between the containers. If .destroy is called while an element is being dragged, the drag will be effectively cancelled.
*/

