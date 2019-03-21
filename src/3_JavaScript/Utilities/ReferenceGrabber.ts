/* Reference Grabber! returns reference to property's parent based on string input */

aw.ref = function(stringo: string): any {
  stringo = stringo.trim();
  const sigil = stringo.slice(0, 1);
  stringo = stringo.slice(1);
  const props = stringo.split(".");
  let ref;
  if (sigil === "$") {
    ref = State.active.variables;
  } else if (sigil === "_") {
    ref = State.temporary;
  } else if (sigil === "ↂ") {
    ref = ↂ;
  } else {
    aw.con.warn("ERROR: variable stringo supplied w/o sigil!");
    aw.con.trace();
    return;
  }
  if (props.length < 2) {
    return ref; // because you basically has a single property under the sigil, like $tits or _fuck
  }
  for (let i = 0, c = props.length - 1; i < c; i++) {
    ref = ref[props[i]];
  }
  return ref;
};
aw.refName = function(stringo: string): any {
  stringo = stringo.trim();
  const props = stringo.split(".");
  const j = props.length - 1;
  return props[j];
};
