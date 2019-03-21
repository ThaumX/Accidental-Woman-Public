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
/* text in sexPos objects, I decided it would be better   */
/* to reduce memory usage by storing them in object       */
/* literals that can be sent to storage. They are looked  */
/* up using property keys, which is far faster than logic */
/* This will improve performance, and also keep descrip-  */
/* tive text in the same place.                           */
/*--------------------------------------------------------*/
/* TERMS:  book(action/position), chapter (situation),    */
/*         page (specific text in array).                 */
/* SAVED:  setup.library.sexPos.book.chapter[page]        */
/* CALL:   setup.library.callsexPos(book,chapter,[page]). */
/* INIT:   setup.library.initSA() - loads variables       */
/* KILL:   setup.library.killSA() - deletes variables     */
/**********************************************************/
// check namespace
if (setup.library === null || setup.library === undefined) {
  setup.library = {} as setupLibrary;
}
// function to retrieve text from library
setup.library.callSexPos = function(book: string, chapter: string, page: string|-1 = -1, chapArray: string[]|0 = 0) {
  // first check to make sure the entry exists
  try {
    if (setup.library.sexPos == null || "object" !== typeof setup.library.sexPos) {
      aw.con.warn(`Library lookup failed, sexPos library isn't initialized.`);
      return "error";
    } else if (setup.library.sexPos[book] == null || "object" !== typeof setup.library.sexPos[book]) {
      aw.con.warn(`Library lookup failed, couldn't find ${book} in sexPoss.`);
      return "error";
    } else if (setup.library.sexPos[book][chapter] == null || (!Array.isArray(setup.library.sexPos[book][chapter]) && "function" !== typeof setup.library.sexPos[book][chapter])) {
      if (Array.isArray(chapArray)) {
        let good = false;
        const c = chapArray.length;
        for (let i = 0; i < c; i++) {
          if (setup.library.sexPos[book][chapArray[i]] != null && Array.isArray(setup.library.sexPos[book][chapArray[i]])) {
            chapter = chapArray[i];
            good = true;
            break;
          }
        }
        if (!good) {
          setup.alert(`Library lookup couldn't find ${chapter} in sexPos book ${book}, and none of ${c} alternates could be found. Defaulted to standard.`);
          chapter = "standard"; // this is so that we can default to standard description
        }
      } else {
        setup.alert(`Library lookup couldn't find ${chapter} in sexPos book ${book}, defaulting to standard (no alternates given).`);
        chapter = "standard"; // this is so that we can default to standard description
      }
    }
  } catch (e) {
    setup.alert(`Something unfathomable happened with the library, wtf! ${e.name}: ${e.message}.`);
  }
  // Sanity protection: check against primary content restrictors to force-block text just in case.
  // $noForce $noViolent $noExtreme
  if (State.active.variables.noForce) {
    const censored = ["noncon", "connoncon", "force", "rape"];
    if (censored.includes(chapter)) {
      chapter = "standard";
    }
  }
  if (State.active.variables.noViolent) {
    const censored = ["violent", "rape", "angry", "masochist", "sadist", "pain"];
    if (censored.includes(chapter)) {
      chapter = "standard";
    }
  }
  if (State.active.variables.noExtreme) { // the most pansy of them all, it's a whitelist
    const allowed = ["standard", "lesbian", "public", "vanilla"];
    if (!allowed.includes(chapter)) {
      chapter = "standard";
    }
  }
  if ("function" === typeof setup.library.sexPos[book][chapter]) {
    return setup.library.sexPos[book][chapter]();
  }
  // Check value of page. normally -1 to randomize, but could request a specific page as index
  if (page !== -1 && setup.library.sexPos[book][chapter][page] != null) {
    return setup.library.sexPos[book][chapter][page];
  } else {
    const i = random(0, (setup.library.sexPos[book][chapter].length - 1));
    return setup.library.sexPos[book][chapter][i];
  }
};
// deletes the library, freeing memory. The library doesn't change, so doesn't need to be stored
setup.library.killSP = function() {
  setup.library.sexPos = null;
};
// loads the library object.
setup.library.initSP = function() {
  const ᛔ = State.active.variables;
  /********************************************/
  //  ┌─┐┌┬┐┌─┐┬─┐┌┬┐
  //  └─┐ │ ├─┤├┬┘ │
  //  └─┘ ┴ ┴ ┴┴└─ ┴
  /********************************************/
  setup.library.sexPos = {
    exampleAct: {
      standard: [
        `This is a standard example action that doesn't really mean anything.`,
        `This is the second example showing how template literals allow
        you to break text in fun ways and insert variables like ${ↂ.pc.body.tits.size} randomly.`,
        `you can even do calculation: 2 * 2 * 2 = ${2 * 2 * 2} cool!`,
      ],
      lesbian: [
        "this is an example of the lesbian description for the example action.",
        "this text can include SugarCube macros like so: <<clitSize>>",
        "and things like <br> or other html.",
      ],
      public: [
        "each 'chapter' can have as many variations as necessary or desireable.",
      ],
      openPublic: "or none",
      nonCon: [
        "the sex scene system looks for relevant chapters for an action or position.",
        "Then it sends them to the function to try in order of priority.",
        "If there aren't any, it defaults to the standard.",
      ],
      threesome: [
        "The 'Standard' chapter must have at least 1 page. Otherwise, the number and order doesn't matter.",
      ],
      get romantic() {
        return "Or you can even put in a function instead for more custom control!";
      },
    },
    standFaceTogether: {
      standard: [
        ``,
      ],
    },
    standBJ: {
      standard: [
        ``,
      ],
    },
    standOral: {
      standard: [
        ``,
      ],
    },
    standingFacingNPCback: {
      standard: [
        ``,
      ],
    },
    standingFacingAway: {
      standard: [
        ``,
      ],
    },
    standingFacingAwaySex: {
      standard: [
        ``,
      ],
    },
    StandingFacingNPCsex: {
      standard: [
        ``,
      ],
    },
    standingAgainstWallSex: {
      standard: [
        ``,
      ],
    },
    standingHandsonWallSex: {
      standard: [
        ``,
      ],
    },
    LayingSidebySide: {
      standard: [
        ``,
      ],
    },
    LayingNPContop: {
      standard: [
        ``,
      ],
    },
    missionary: {
      standard: [
        ``,
      ],
    },
    cowGirl: {
      standard: [
        ``,
      ],
    },
    RevCowgirl: {
      standard: [
        ``,
      ],
    },
    layingBJposition: {
      standard: [
        ``,
      ],
    },
    layingMunchPosition: {
      standard: [
        ``,
      ],
    },
    SixtyNinePConTop: {
      standard: [
        ``,
      ],
    },
  };
  aw.con.info("sex position library loaded");
};
