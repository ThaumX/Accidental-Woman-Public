/*Accordion Macro*/
/*Initial args 1) name/id to use for accordion 2) name of section. Rest is name of section*/

Macro.add("accordion",{
  tags: ["accord"],
  handler: function(){
    let id = this.args[0];
    let out = `<div id="${id}">`;
    for(let i = 0, l = this.payload.length; i < l; i++){
      if(this.payload[i].name === "accord"){
        out += `<h3>${this.payload[i].args[0]}</h3><div>${this.payload[i].contents}</div>`;
      }else{
        out += `<h3>${this.payload[i].args[1]}</h3><div>${this.payload[i].contents}</div>`;
      }
    }
    out += "</div>";
    let ident = "#" + id;
    $( function() {
      $( ident ).accordion({
        heightStyle: "fill"
      });
    } );
    /*setTimeout(function(){
      $( ident ).accordion( "option", "heightStyle", "fill" );
    },500);*/
    return new Wikifier(this.output, out);
  }
});