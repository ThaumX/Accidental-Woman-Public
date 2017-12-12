Macro.add("douchebag", {
  handler : function() {
    if(this.args.length<3){
      var e=[];
      return this.args.length<1&&e.push( "variable name "),
      this.args.length<2&&e.push( "unchecked value "),
      this.args.length<3&&e.push( "checked value "),
      this.error( "no  "+e.join( " or  ")+ " specified ");
    }
    if( "string" !=typeof this.args[0]){
      return this.error( "variable name argument is not a string");
    }
    var t=this.args[0].trim();
    if( "$"!==t[0]&& "_"!==t[0]){
      return this.error('variable name  "'+this.args[0]+' " is missing its sigil ($ or _)');
    }
    var r = Util.slugify(t);
    var n = this.args[1],a=this.args[2];
    var i = document.createElement( "input");
    var j = document.createElement( "label");
    jQuery(i).attr({id:this.name + "-" + r, name:this.name + "-" + r, type: "checkbox", tabindex:0}).addClass( "macro-"+this.name).on( "change",function(){Wikifier.setValue(t,this.checked?a:n);}).appendTo(this.output),this.args.length>3&& "checked"===this.args[3]?(i.checked=!0,Wikifier.setValue(t,a)):Wikifier.setValue(t,n);
    jQuery(j).attr({for:this.name+ "-"+r,name:this.name+ "-"+r}).appendTo(this.output);
  }
});
Macro.add("radiogaga",{
  handler:function(){
    if(this.args.length<7){
      var e=[];
      return this.args.length<1&&e.push("variable name"),this.args.length<2&&e.push("checked value"),this.error("no "+e.join(" or ")+" specified");
    }
    if("string"!=typeof this.args[0])return this.error("variable name argument is not a string");
    var t=this.args[0].trim();
    if("$"!==t[0]&&"_"!==t[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');
		var r=Util.slugify(t);
		var n=this.args[1];
		Wikifier.setValue(t,n);
		var cls = "bitch";
		switch(n){
			case -2: cls="toggle_option_slider toggle_option_slider_one"; break;
			case -1: cls="toggle_option_slider toggle_option_slider_two"; break;
			case 0: cls="toggle_option_slider toggle_option_slider_three"; break;
			case 1: cls="toggle_option_slider toggle_option_slider_four"; break;
			case 2: cls="toggle_option_slider toggle_option_slider_five"; break;
		}
		var d=document.createElement("div");
		var ds=document.createElement("div");
		var aa=document.createElement("input");
		var ab=document.createElement("input");
		var ac=document.createElement("input");
		var ad=document.createElement("input");
		var ae=document.createElement("input");
		var aal=document.createElement("label");
		aal.innerHTML = this.args[2];
		var abl=document.createElement("label");
		abl.innerHTML = this.args[3];
		var acl=document.createElement("label");
		acl.innerHTML = this.args[4];
		var adl=document.createElement("label");
		adl.innerHTML = this.args[5];
		var ael=document.createElement("label");
		ael.innerHTML = this.args[6];
		TempState.hasOwnProperty(this.name)||(TempState[this.name]={}),TempState[this.name].hasOwnProperty(r)||(TempState[this.name][r]=0);
    var nam = this.name+"-"+r;
    var nama = this.name+"-"+r+"-"+TempState[this.name][r]++;
    var namb = this.name+"-"+r+"-"+TempState[this.name][r]++;
    var namc = this.name+"-"+r+"-"+TempState[this.name][r]++;
    var namd = this.name+"-"+r+"-"+TempState[this.name][r]++;
    var name = this.name+"-"+r+"-"+TempState[this.name][r]++;
		jQuery(ds).attr({id:nam,class:cls}).appendTo(d);
		jQuery(aa).attr({id:nama,name:this.name+"-"+r,type:"radio",class:"toggle_option",tabindex:0}).addClass("macro-"+this.name).on("change",function(){if(this.checked){Wikifier.setValue(t,-2);document.getElementById(nam).className = "toggle_option_slider toggle_option_slider_one";}}).appendTo(d);
		jQuery(ab).attr({id:namb,name:this.name+"-"+r,type:"radio",class:"toggle_option",tabindex:0}).addClass("macro-"+this.name).on("change",function(){if(this.checked){Wikifier.setValue(t,-1);document.getElementById(nam).className = "toggle_option_slider toggle_option_slider_two";}}).appendTo(d);
		jQuery(ac).attr({id:namc,name:this.name+"-"+r,type:"radio",class:"toggle_option",tabindex:0}).addClass("macro-"+this.name).on("change",function(){if(this.checked){Wikifier.setValue(t,0);document.getElementById(nam).className = "toggle_option_slider toggle_option_slider_three";}}).appendTo(d);
		jQuery(ad).attr({id:namd,name:this.name+"-"+r,type:"radio",class:"toggle_option",tabindex:0}).addClass("macro-"+this.name).on("change",function(){if(this.checked){Wikifier.setValue(t,1);document.getElementById(nam).className = "toggle_option_slider toggle_option_slider_four";}}).appendTo(d);
		jQuery(ae).attr({id:name,name:this.name+"-"+r,type:"radio",class:"toggle_option",tabindex:0}).addClass("macro-"+this.name).on("change",function(){if(this.checked){Wikifier.setValue(t,2);document.getElementById(nam).className = "toggle_option_slider toggle_option_slider_five";}}).appendTo(d);
		jQuery(aal).attr({for:nama}).appendTo(d);
		jQuery(abl).attr({for:namb}).appendTo(d);
		jQuery(acl).attr({for:namc}).appendTo(d);
		jQuery(adl).attr({for:namd}).appendTo(d);
		jQuery(ael).attr({for:name}).appendTo(d);
		//document.getElementById(nam).classList.add(cls);
		jQuery(d).attr({class:"toggle_radio"}).appendTo(this.output);
		//document.getElementById("MyElement").className = "MyClass";
	}
	});