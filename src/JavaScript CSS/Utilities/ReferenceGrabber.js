/* Reference Grabber! returns reference to property's parent based on string input */

aw.ref = function(string){
  string = string.trim();
  let sigil = string.slice(0,1);
  string = string.slice(1);
  let props = string.split(".");
  var ref;
  if(sigil === "$"){
    ref = State.active.variables;
  }else if(sigil === "_"){
    ref = State.temporary;
  }else{
    aw.con.warn("ERROR: variable string supplied w/o sigil!");
    aw.con.trace();
    return;
  }
  if(props.length < 2){
    return ref; //because you basically has a single property under the sigil, like $tits or _fuck
  }
  for(let i = 0, c = props.length - 1; i < c; i++){
    ref = ref[props[i]];
  }
  return ref;
};
aw.refName = function(string){
  string = string.trim();
  let props = string.split(".");
  let j = props.length - 1;
  return props[j];
};