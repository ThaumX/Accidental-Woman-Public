/*======================================================================*/
/* ██╗   ██╗██╗    ███╗   ███╗ █████╗  ██████╗██████╗  ██████╗ ███████╗ */
/* ██║   ██║██║    ████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝ */
/* ██║   ██║██║    ██╔████╔██║███████║██║     ██████╔╝██║   ██║███████╗ */
/* ██║   ██║██║    ██║╚██╔╝██║██╔══██║██║     ██╔══██╗██║   ██║╚════██║ */
/* ╚██████╔╝██║    ██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║╚██████╔╝███████║ */
/*  ╚═════╝ ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝ */
/*======================================================================*/
//Macros for speeding up the use of complex UI elements and animation

Macro.add("tooltip",{
  tags: null,
  handler: function(){
    let tool,out;
    if(this.args[0] == null){
      tool = "Awaiting tooltip!";
    }else{
      tool = this.args[0];
    }
    if(this.args[1] == null){
      out = `<span data-tooltip="${tool}">${this.payload[0].contents}</span>`;
    }else{
      out = `<span data-tooltip="${tool}" class="tooltipper">${this.payload[0].contents}</span>`;
    }
    return new Wikifier(this.output, out);
  }
});
/*
Macro.add("flexbubble",{
  tags: ["bubble"],
  handler: function(){
    
  }
});
*/
Macro.add("uicardsinit",{
  tags: ["nextcard","nextbutton"],
  handler: function(){
    if ("string" != typeof this.args[0] || this.args[0].search(/(\$|_)/g) == -1 || this.args[0].search(/\./g) != -1){
      return this.error(`Invalid variable ${this.args[0]} supplied, must be a simple/non-object quoted variable name. ex: "$titties".`);
    }
    if (this.args[1] == null || "string" != typeof this.args[1]){
      return this.error("You must supply a label string for the first card tab. args: variable label");
    }else if (this.args[2] == null || "string" != typeof this.args[2]){
      return this.error("You must supply a label argument string for the tab menu.");
    }
    var oge = this.args[0].trim(), spo, ini, sig;
    oge = this.args[0].slice(1);
    if (this.args[0].charAt(0) === "$") {
      spo = "variables";
      sig = "$";
    }else if(this.args[0].charAt(0) === "_"){
      spo = "temporary";
      sig = "_";
    }else{
      return this.error(`Invalid variable arg ${this.args[0]} supplied, must be a simple/non-object quoted variable.`);
    }
    try{
      State[spo][oge] = [];
      State[spo][oge].push(`<span class="megrim" style="font-size:130%;font-weight:900;"><<sp 3>>${this.args[2]}</span><br>`);
      State.temporary.tabber = 1;
      State.temporary.card = "card1";
      ini = `<div id="cardback"></div><div id="cardmenu" class="uicardmenu slide-in-bottom"><<print ${sig}${oge}[0]>></div><div id="uicardhold"><div id="card1" class="uicard slide-in-bottom"><<print ${sig}${oge}[1]>></div></div>`;
      //find number of non-card buttons
      let cards = this.payload.length;
      for (let i = 0, len = this.payload.length; i < len; i++){
        if (this.payload[i].name == "nextbutton"){
          cards -= 1;
        }
      }
      //setup card & button contents
      let k = 0,pre,aft,endbut;
      for (let i = 0, len = this.payload.length; i < len; i++) {
        //set up some indicies
        if (this.payload[i].name != "nextbutton"){
          let j = (this.payload[i].name != "nextcard") ? 1 : 0;
          k++;
          pre = (k <= 1)? cards : k-1;
          aft = (k >= cards) ? 1 : k+1;
          let upcase = (this.payload[i].args[j].search("<<") == -1)? this.payload[i].args[j].toUpperCase() : this.payload[i].args[j];
          //add to the menu variable
          State[spo][oge][0] += `<<if _tabber != ${k}>><<button "${this.payload[i].args[j]}">><<animexit _card "slide-in-bottom" "slide-out-top" true>><<append "#uicardhold">><div id="card${k}" class="uicard slide-in-bottom"><<print ${sig}${oge}[${k}]>></div><</append>><<set _card = "card${k}">><<set _tabber = ${k}>><<replace "#cardmenu">><<print ${sig}${oge}[0]>><</replace>><</button>><<else>><span class="active"><<button "${upcase}">><</button>></span><</if>>`;
          let con = "<div id='cardcon'>" + this.payload[i].contents;
          if(aft == 1){
            endbut = "<img data-passage='IMG_BW_DownArrow' style='opacity:0.6;cursor:not-allowed;'>";
          }else{
            endbut = `<<link [img[Next|IMG_BW_DownArrow]]>><<animexit _card "slide-in-bottom" "slide-out-top" true>><<append "#uicardhold">><div id="card${aft}" class="uicard slide-in-bottom"><<print ${sig}${oge}[${aft}]>></div><</append>><<set _card = "card${aft}">><<set _tabber = ${aft}>><<replace "#cardmenu">><<print ${sig}${oge}[0]>><</replace>><</link>>`;
          }
          con += `</div><div class="nav-up-arrow"><<link [img[Previous|IMG_BW_UpArrow]]>><<animexit _card "slide-in-bottom" "slide-out-top" true>><<append "#uicardhold">><div id="card${pre}" class="uicard slide-in-bottom"><<print ${sig}${oge}[${pre}]>></div><</append>><<set _card = "card${pre}">><<set _tabber = ${pre}>><<replace "#cardmenu">><<print ${sig}${oge}[0]>><</replace>><</link>></div><div class="nav-down-arrow">${endbut}</div>`;
          State[spo][oge].push(con);
        }else{
          if (this.payload[i].args.length == 0){
            State[spo][oge][0] += this.payload[i].contents;
          }else{
            State[spo][oge][0] += `<span class="cardbuttContinue"><<button "${this.payload[i].args[0]}">>${this.payload[i].contents}<</button>></span>`;
          }
        }
      }
      return new Wikifier(this.output, ini);
    }
    catch(er){
      return this.error(`Something went wrong. ${er.name}: ${er.message}.`);
    }
  }
});