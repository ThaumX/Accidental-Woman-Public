/*******************************************************************/
/*   Macros to allow storing sections of Twine Script in-passage   */
/*******************************************************************/
/************************ helper functions *************************/
setup.selectStore = function(storyVar) {
  let store;
  let varName;
  if (storyVar.charAt(0) === "$") {
    store = State.variables;
  } else if (storyVar.charAt(0) === "_") {
    store = State.temporary;
  } else {
    return false; /* error */
  }
  varName = storyVar.slice(1);
  return [store, varName];
};

setup.storeCode = function(storyVar, code) {
  let store;
  let varName;
  let temp;
  temp = setup.selectStore(storyVar);
  if (!storyVar) {
    return false; /* error */
  }
  if (typeof code !== "string") {
    return false; /* error */
  }
  store   = temp[0];
  varName = temp[1];
  store[varName] = code; /* save TwineScript code */
  return true;
};

setup.evalCode = function(code: string, silent: boolean, $element: any, stream: any): boolean {
  if (typeof code !== "string") {
    return false; /* error */
  }
  if (silent) {
    // tslint:disable-next-line:no-unused-expression
    new Wikifier(null, code);
    return true;
  } else {
    $element
      .wiki(code)
      .appendTo(stream);
    return true;
  }
  return false;
};
/*******************************************************************/
/* the <<code>> macro for storing twine script                     */
/*******************************************************************/
Macro.add("code", {
     tags : null,
  handler() {
    let code;
    let storyVar;
    let check;
    /* check for errors */
    if (this.args.length !== 1) {
      return this.error("incorrect number of arguments");
    }
    if (typeof this.args[0] !== "string") {
      return this.error("first argument should be a quoted variable name");
    }
    /* store code chunk as string in variable */
    storyVar = this.args[0];
    code     = this.payload[0].contents;
    check    = setup.storeCode(storyVar, code);
    if (!check) {
      return this.error("error in arguments");
    }
  },
});
/*******************************************************************/
/* the <<wiki>> and <<eval>> macros for using the twine script     */
/*******************************************************************/
Macro.add(["wiki", "eval"], {
  handler() {
    const $wrapper = $(document.createElement("span"));
    let code;
    let silent;
    let check;
    /* check for errors */
    if (this.args.length !== 1) {
      return this.error("incorrect number of arguments");
    }
    /* some setup */
    $wrapper.addClass("macro-" + this.name);
    code = this.args[0];
    /* check for silent execution */
    silent = (this.name === "eval") ? true : false;
    /* run the TwineScript */
    check = setup.evalCode(code, silent, $wrapper, this.output);
    if (!check) {
      return this.error("unknown error; please check arguments");
    }
  },
});
