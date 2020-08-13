
Macro.add("tabset", {
  tags: ["newtab"],
  handler() {
    const id = this.args[0];
    const listAr: string[] = [];
    let out = `<div id="${id}" class="exlinkmurder"><ul>`;
    for (let i = 0, l = this.payload.length; i < l; i++) {
      if (this.payload[i].name === "newtab") {
        listAr.push(this.payload[i].args[0]);
      } else {
        listAr.push(this.payload[i].args[1]);
      }
    }
    for (let i = 0, l = listAr.length; i < l; i++) {
      const x = i + 1;
      out += `<li><a href="#fragment-${x}">${listAr[i]}</a></li>`;
    }
    out += "</ul>";
    for (let i = 0, l = listAr.length; i < l; i++) {
      const x = i + 1;
      out += `<div id="fragment-${x}">${this.payload[i].contents}</div>`;
    }
    out += "</div>";
    const ident = "#" + id;
    $( function() {
      $( ident ).tabs();
    } );
    /*setTimeout(function(){
      $( ident ).tabs( "option", "heightStyle", "fill" );
    },500);*/
    return new Wikifier(this.output, out);
  },
});

// Adds a jQueryUI radiobutton set.
// <<radioset "name" "$variable" ["classes"]>>Set Label Text<<radiobutton value [checked]>>button text<</radioset>>

Macro.add("radioset", {
  tags: ["radioitem"],
  handler() {
    if (this.payload[0].args.length < 2) {
      return this.error("Insufficient Arguments. name, quoted variable, ['class/es']");
    } else if ("string" !== typeof this.payload[0].args[0]) {
      return this.error("The name must be a valid string.");
    }
    const name = "radio-" + this.payload[0].args[0];
    let vari;
    let output;
    const valu: any[] = [];
    const namu: string[] = [];
    let tv;
    let cump;
    const varName = this.args[1].trim();
    if (varName[0] === "ↂ") {
      vari = varName;
      tv = varName;
      cump = setup.awsc.parse(varName);
    } else if (varName[0] === "$") {
      vari = "State.active.variables." + varName.slice(1);
      tv = "State.active.variables." + varName.slice(1);
    // tslint:disable-next-line:no-eval
      cump = eval(tv);
    } else if (varName[0] === "_") {
      vari = "State.temporary." + varName.slice(1);
      tv = "State.temporary." + varName.slice(1);
    // tslint:disable-next-line:no-eval
      cump = eval(tv);
    } else if (varName.slice(0, 5) === "setup") {
      vari = varName;
      tv = varName;
      // tslint:disable-next-line:no-eval
      cump = eval(tv);
    } else {
      return this.error("Variable name is not a string or is missing its sigil ($ or _)");
    }

    if (this.payload[0].args.length === 3) {
      output = `<fieldset><legend class="${this.payload[0].args[2]}">${this.payload[0].contents}</legend>`;
    } else {
      output = `<fieldset><legend>${this.payload[0].contents}</legend>`;
    }
    for (let i = 1, c = this.payload.length; i < c; i++) {
      const id = name + i;
      output += `<label for="${id}">${this.payload[i].contents}</label><input type="radio" name="${name}" id="${id}" class="radioSelectorClass"`;
      if (this.payload[i].args.length > 1 || this.payload[i].args[0] === cump) {
        output += " checked>";
      } else {
        output += ">";
      }
      namu.push(id);
      valu.push(this.payload[i].args[0]);
    }
    output += "</fieldset><<timed 100ms>><<scr";
    output += `ipt>>
    $("input[type='radio']").checkboxradio({icon: false});`;
    for (let i = 0, c = namu.length; i < c; i++) {
      if ("string" === typeof valu[i]) {
        output += `
        $("#${namu[i]}").click(function(){
          ${vari} = "${valu[i]}";
        });`;
      } else {
        output += `
        $("#${namu[i]}").click(function(){
          ${vari} = ${valu[i]};
        });`;
      }
    }
    output += `
    <</scri`;
    output += "pt>><</timed>>";
    return new Wikifier(this.output, output);
  },
});



