/*progress bar code for utilizing jQueryUI*/

setup.pBar = {
  start: function(ident,cur,max){
    $( function() {
      $( ident ).progressbar({
        value: cur,
        max: max,
      });
    } );
  },
  add: function(ident,amt){
    var pFar = $( ident ).progressbar( "value" );
    pFar += amt;
    $( ident ).progressbar( "value", pFar );
  },
  set: function(ident,amt){
    $( ident ).progressbar( "value", amt);
  },
  finish: function(ident,target,content){
    $( ident ).on( "progressbarcomplete", function( event, ui ) {
      const frag = document.createDocumentFragment();
      new Wikifier(frag, content);
      $(target).append(frag);
    } );
  }
};

Macro.add("pbarnew",{
  handler: function () {
    if(this.args.length < 1 || "string" !== typeof this.args[0]){
      return this.error("At a minimum a jQuery identifier is required.");
    }
    let ident, cur, max;
    if(this.args.length > 2){
      ident = this.args[0];
      if(this.args[1] <= this.args[2]){
        cur = this.args[1];
        max = this.args[2];
      }else{
        cur = this.args[2];
        max = this.args[1];
      }
    }else if( this.args.length === 2){
      ident = this.args[0];
      cur = this.args[1];
      max = 100;
    }else{
      ident = this.args[0];
      cur = 0;
      max = 100;
    }
    let di = `<div id="${ident.slice(1)}"></div>`;
    setup.pBar.start(ident,cur,max);
    return new Wikifier(this.output, di);
  },
});
Macro.add("pbaradd",{
  handler: function(){
    if(this.args.length !== 2 || "string" !== typeof this.args[0] || "number" !== typeof this.args[1]){
      return this.error("A valid jQuery ID, followed by a number is required to add to a progress bar.");
    }
    setup.pBar.add(this.args[0],this.args[1]);
  }
});
Macro.add("pbarset",{
  handler: function(){
    if(this.args.length !== 2 || "string" !== typeof this.args[0] || "number" !== typeof this.args[1]){
      return this.error("A valid jQuery ID, followed by a number is required to set a progress bar value.");
    }
    setup.pBar.set(this.args[0],this.args[1]);
  }
});
Macro.add("pbarfinish",{
  tags: null,
  handler: function(){
    if(this.args.length < 1 || "string" !== typeof this.args[0]){
      return this.error("Insufficient args, requires PBAR ID!");
    }
    let target = "pbar-macro-" + this.args[0].slice(1);
    let out = `<div id="${target}"></div>`;
    target = "#" + target;
    setup.pBar.finish(this.args[0],target,this.payload[0].contents);
    return new Wikifier(this.output, out);
  }
});