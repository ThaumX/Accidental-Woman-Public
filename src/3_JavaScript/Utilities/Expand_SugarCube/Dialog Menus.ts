/*******************************************************************/
/* <<dialog>> macro which displays contents in dialog UI API       */
/*******************************************************************/
Macro.add("dialog", {
  tags: null,
  handler() {
    const title = (this.payload[0].args[0] != null) ? this.payload[0].args[0] : "Accidental Woman";
    const content = this.payload[0].contents;
    setup.dialog(title, content);
  },
});
/*******************************************************************/
/* <<popup>> macro which loads a passage in the dialog UI API      */
/*******************************************************************/
Macro.add("popup", {
  handler() {
    if (this.args.length < 1 || this.args.length > 2) {
      return this.error("popup macro requires a passage argument!");
    }
    const content = `<<include [[${this.args[0]}]]>>`;
    const title = (this.args[1] != null) ? this.args[1] : "Accidental Woman";
    setup.dialog(title, content);
  },
});

