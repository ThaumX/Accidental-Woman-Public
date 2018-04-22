/**********************************************************/
/*  ██╗     ██╗██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗  */
/*  ██║     ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝  */
/*  ██║     ██║██████╔╝██████╔╝███████║██████╔╝ ╚████╔╝   */
/*  ██║     ██║██╔══██╗██╔══██╗██╔══██║██╔══██╗  ╚██╔╝    */
/*  ███████╗██║██████╔╝██║  ██║██║  ██║██║  ██║   ██║     */
/*  ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝     */
/*                                                        */
/*               ╔═╗┌─┐─┐ ┬╔═╗┌─┐┌┬┐┌─┐                   */
/*               ╚═╗├┤ ┌┴┬┘╠═╣│   │ └─┐                   */
/*               ╚═╝└─┘┴ └─╩ ╩└─┘ ┴ └─┘                   */
/* This is the sex act library. Rather than store output  */
/* text in SexAct objects, I decided it would be better   */
/* to reduce memory usage by storing them in object       */
/* literals that can be sent to storage. They are looked  */
/* up using property keys, which is far faster than logic */
/* This will improve performance, and also keep descrip-  */
/* tive text in the same place.                           */
/*--------------------------------------------------------*/
/* TERMS:  book(action/position), chapter (situation),    */
/*         page (specific text in array).                 */
/* SAVED:  setup.library.sexact.book.chapter[page]        */
/* CALL:   setup.library.callSexAct(book,chapter,[page]). */
/* INIT:   setup.library.initSA() - loads variables       */
/* KILL:   setup.library.killSA() - deletes variables     */
/**********************************************************/
//check namespace
if (setup.library == null) {
  setup.library = {};
}
//function to retrieve text from library
setup.library.callSexAct = function (book, chapter, page = -1, chapArray = 0) {
  //first check to make sure the entry exists
  try{
    if (setup.library.sexact == null || "object" != typeof setup.library.sexact) {
      setup.alert(`Library lookup failed, sexact library isn't initialized.`);
      return "error";
    } else if (setup.library.sexact[book] == null || "object" != typeof setup.library.sexact[book]) {
      setup.alert(`Library lookup failed, couldn't find ${book} in sexacts.`);
      return "error";
    } else if (setup.library.sexact[book][chapter] == null || (!Array.isArray(setup.library.sexact[book][chapter]) && "function" != typeof setup.library.sexact[book][chapter])) {
      if (Array.isArray(chapArray)) {
        let good = false,
          c = chapArray.length;
        for (let i = 0; i < c; i++) {
          if (setup.library.sexact[book][chapArray[i]] != null && Array.isArray(setup.library.sexact[book][chapArray[i]])) {
            chapter = chapArray[i];
            good = true;
            break;
          }
        }
        if (!good) {
          setup.alert(`Library lookup couldn't find ${chapter} in sexact book ${book}, and none of ${c} alternates could be found. Defaulted to standard.`);
          chapter = "standard"; //this is so that we can default to standard description
        }
      } else {
        setup.alert(`Library lookup couldn't find ${chapter} in sexact book ${book}, defaulting to standard (no alternates given).`);
        chapter = "standard"; //this is so that we can default to standard description
      }
    }
  }
  catch(e){
    setup.alert(`Something unfathomable happened with the library, wtf! ${e.name}: ${e.message}.`);
  }
  //Sanity protection: check against primary content restrictors to force-block text just in case.
  //$noForce $noViolent $noExtreme
  if (State.active.variables.noForce) {
    let censored = ["noncon", "connoncon", "force", "rape"];
    if (censored.includes(chapter)) {
      chapter = "standard";
    }
  }
  if (State.active.variables.noViolent) {
    let censored = ["violent", "rape", "angry", "masochist", "sadist", "pain"];
    if (censored.includes(chapter)) {
      chapter = "standard";
    }
  }
  if (State.active.variables.noExtreme) { //the most pansy of them all, it's a whitelist
    let allowed = ["standard", "lesbian", "public", "vanilla"];
    if (!allowed.includes(chapter)) {
      chapter = "standard";
    }
  }
  if ("function" == typeof setup.library.sexact[book][chapter]) {
    return setup.library.sexact[book][chapter]();
  }
  //Check value of page. normally -1 to randomize, but could request a specific page as index
  if (page !== -1 && setup.library.sexact[book][chapter][page] != null) {
    return setup.library.sexact[book][chapter][page];
  } else {
    let i = random(0, (setup.library.sexact[book][chapter].length - 1));
    return setup.library.sexact[book][chapter][i];
  }
};
//deletes the library, freeing memory. The library doesn't change, so doesn't need to be stored
setup.library.killSA = function () {
  setup.library.sexact = null;
};
//loads the library object.
setup.library.initSA = function () {
  let tA = performance.now();
  const AW = State.active.variables;
  /********************************************/
  //  ┌─┐┌┬┐┌─┐┬─┐┌┬┐
  //  └─┐ │ ├─┤├┬┘ │
  //  └─┘ ┴ ┴ ┴┴└─ ┴
  /********************************************/
  setup.library.sexact = {
    exampleAct: {
      standard: [
        `This is a standard example action that doesn't really mean anything.`,
        `This is the second example showing how template literals allow
        you to break text in fun ways and insert variables like ${AW.PC.body.tits.size} randomly.`,
        `you can even do calculation: 2 * 2 * 2 = ${2 * 2 * 2} cool!`
      ],
      lesbian: [
        "this is an example of the lesbian description for the example action.",
        "this text can include SugarCube macros like so: <<clitSize>>",
        "and things like <br> or other html."
      ],
      public: [
        "each 'chapter' can have as many variations as necessary or desireable."
      ],
      openPublic: "or none",
      nonCon: [
        "the sex scene system looks for relevant chapters for an action or position.",
        "Then it sends them to the function to try in order of priority.",
        "If there aren't any, it defaults to the standard."
      ],
      threesome: [
        "The 'Standard' chapter must have at least 1 page. Otherwise, the number and order doesn't matter."
      ],
      get romantic() {
        return "Or you can even put in a function instead for more custom control!";
      },
    },
    passKiss: {
      standard: [
        "Example placeholder text 1 for standard passKiss",
        "Example placeholder text 2 for standard passKiss",
        "Example placeholder text 3 for standard passKiss"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    sensualKiss: {
      standard: [
        "Example placeholder text 1 for standard sensualKiss",
        "Example placeholder text 2 for standard sensualKiss",
        "Example placeholder text 3 for standard sensualKiss"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    romanticKiss: {
      standard: [
        "Example placeholder text 1 for standard romanticKiss",
        "Example placeholder text 2 for standard romanticKiss",
        "Example placeholder text 3 for standard romanticKiss"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    lickSomething: {
      standard: [
        "Example placeholder text 1 for standard lickSomething",
        "Example placeholder text 2 for standard lickSomething",
        "Example placeholder text 3 for standard lickSomething"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    scockKiss: {
      standard: [
        "Example placeholder text 1 for standard cockKiss",
        "Example placeholder text 2 for standard cockKiss",
        "Example placeholder text 3 for standard cockKiss"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cockSuckHead: {
      standard: [
        "Example placeholder text 1 for standard cockSuckHead",
        "Example placeholder text 2 for standard cockSuckHead",
        "Example placeholder text 3 for standard cockSuckHead"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cockBobHead: {
      standard: [
        "Example placeholder text 1 for standard cockBobHead",
        "Example placeholder text 2 for standard cockBobHead",
        "Example placeholder text 3 for standard cockBobHead"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cockSuck: {
      standard: [
        "Example placeholder text 1 for standard cockSuck",
        "Example placeholder text 2 for standard cockSuck",
        "Example placeholder text 3 for standard cockSuck"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cockDeepthroat: {
      standard: [
        "Example placeholder text 1 for standard cockDeepthroat",
        "Example placeholder text 2 for standard cockDeepthroat",
        "Example placeholder text 3 for standard cockDeepthroat"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cockSuckBalls: {
      standard: [
        "Example placeholder text 1 for standard cockSuckBalls",
        "Example placeholder text 2 for standard cockSuckBalls",
        "Example placeholder text 3 for standard cockSuckBalls"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    hug: {
      standard: [
        "Example placeholder text 1 for standard hug",
        "Example placeholder text 2 for standard hug",
        "Example placeholder text 3 for standard hug"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    grindCrotch: {
      standard: [
        "Example placeholder text 1 for standard grindCrotch",
        "Example placeholder text 2 for standard grindCrotch",
        "Example placeholder text 3 for standard grindCrotch"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cockStroke: {
      standard: [
        "Example placeholder text 1 for standard cockStroke",
        "Example placeholder text 2 for standard cockStroke",
        "Example placeholder text 3 for standard cockStroke"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cockHold: {
      standard: [
        "Example placeholder text 1 for standard cockHold",
        "Example placeholder text 2 for standard cockHold",
        "Example placeholder text 3 for standard cockHold"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    cupBalls: {
      standard: [
        "Example placeholder text 1 for standard cupBalls",
        "Example placeholder text 2 for standard cupBalls",
        "Example placeholder text 3 for standard cupBalls"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    strokeVulva: {
      standard: [
        "Example placeholder text 1 for standard strokeVulva",
        "Example placeholder text 2 for standard strokeVulva",
        "Example placeholder text 3 for standard strokeVulva"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
    rubClit: {
      standard: [
        "Example placeholder text 1 for standard rubClit",
        "Example placeholder text 2 for standard rubClit",
        "Example placeholder text 3 for standard rubClit"
      ],
      lesbian: [
        "Example placeholder text 1 for lesbian",
        "Example placeholder text 2 for lesbian",
        "Example placeholder text 3 for lesbian",
      ],
      public: [
        "Example placeholder text 1 for public",
        "Example placeholder text 2 for public",
        "Example placeholder text 3 for public",
      ],
      openPublic: [
        "Example placeholder text 1 for openPublic",
        "Example placeholder text 2 for openPublic",
        "Example placeholder text 3 for openPublic",
      ],
      nonCon: [
        "Example placeholder text 1 for nonCon",
        "Example placeholder text 2 for nonCon",
        "Example placeholder text 3 for nonCon",
      ],
    },
  };
  /********************************************/
  //  ┌─┐┌┐┌┌┬┐
  //  ├┤ │││ ││
  //  └─┘┘└┘─┴┘
  /********************************************/
  let tB = performance.now();
  let res = Math.round(tB - tA);
  setup.log(`The sexact library took ${res}ms to load.`);
};