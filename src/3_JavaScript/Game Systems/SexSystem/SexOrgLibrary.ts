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
/* text in orgasm objects, I decided it would be better   */
/* to reduce memory usage by storing them in object       */
/* literals that can be sent to storage. They are looked  */
/* up using property keys, which is far faster than logic */
/* This will improve performance, and also keep descrip-  */
/* tive text in the same place.                           */
/*--------------------------------------------------------*/
/* TERMS:  book(action/position), chapter (situation),    */
/*         page (specific text in array).                 */
/* SAVED:  setup.library.orgasm.book.chapter[page]        */
/* CALL:   setup.library.callorgasm(book,chapter,[page]). */
/* INIT:   setup.library.initSA() - loads variables       */
/* KILL:   setup.library.killSA() - deletes variables     */
/**********************************************************/
// check namespace
if (setup.library === null || setup.library === undefined) {
  setup.library = {} as setupLibrary;
}
// function to retrieve text from library
setup.library.callOrgasm = function(book: string, chapter: string, page: string|-1 = -1, chapArray: 0|string[] = 0) {
  // first check to make sure the entry exists
  try {
    if (setup.library.orgasm == null || "object" !== typeof setup.library.orgasm) {
      aw.con.warn(`Library lookup failed, orgasm library isn't initialized.`);
      return "error";
    } else if (setup.library.orgasm[book] == null || "object" !== typeof setup.library.orgasm[book]) {
      aw.con.warn(`Library lookup failed, couldn't find ${book} in orgasms.`);
      return "error";
    } else if (setup.library.orgasm[book][chapter] == null || (!Array.isArray(setup.library.orgasm[book][chapter]) && "function" !== typeof setup.library.orgasm[book][chapter])) {
      if (Array.isArray(chapArray)) {
        let good = false;
        const c = chapArray.length;
        for (let i = 0; i < c; i++) {
          if (setup.library.orgasm[book][chapArray[i]] != null && Array.isArray(setup.library.orgasm[book][chapArray[i]])) {
            chapter = chapArray[i];
            good = true;
            break;
          }
        }
        if (!good) {
          setup.alert(`Library lookup couldn't find ${chapter} in orgasm book ${book}, and none of ${c} alternates could be found. Defaulted to standard.`);
          chapter = "standard"; // this is so that we can default to standard description
        }
      } else {
        setup.alert(`Library lookup couldn't find ${chapter} in orgasm book ${book}, defaulting to standard (no alternates given).`);
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
  if ("function" === typeof setup.library.orgasm[book][chapter]) {
    return setup.library.orgasm[book][chapter]();
  }
  // Check value of page. normally -1 to randomize, but could request a specific page as index
  if (page !== -1 && setup.library.orgasm[book][chapter][page] != null) {
    return setup.library.orgasm[book][chapter][page];
  } else {
    const i = random(0, (setup.library.orgasm[book][chapter].length - 1));
    return setup.library.orgasm[book][chapter][i];
  }
};
// deletes the library, freeing memory. The library doesn't change, so doesn't need to be stored
setup.library.killSAO = function() {
  setup.library.orgasm = null;
};
// loads the library object.
setup.library.initSAO = function() {
  const ᛔ = State.active.variables;
  /********************************************/
  //  ┌─┐┌┬┐┌─┐┬─┐┌┬┐
  //  └─┐ │ ├─┤├┬┘ │
  //  └─┘ ┴ ┴ ┴┴└─ ┴
  /********************************************/
  setup.library.orgasm = {
    pcOrgasm: {
      standard: [
        `You have an orgasm, but sadly I haven't written the text for that yet... so sorry! &gt;.&lt;`,
      ],
    },
  };
  aw.con.info("Sex Orgasm Library loaded.");
};
