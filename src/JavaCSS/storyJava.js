config.history.controls = false;
Config.loadDelay = 1000;
Setting.addHeader("Accidental Woman Settings");
Config.saves.slots = 10;
Config.saves.version = 2.23;
Config.history.maxStates = 1;

function randomDist(splooge){
	/*use try to get array length. If not array, will fail and proc error*/
	try{
		var jizz = splooge.length;
	}
	catch(e){
		var msg1 = "Error: non array sent to randomDist - " + splooge;
		console.log(msg);
		alert(msg);
		return 0;
	}
	/*sum up total value of all array items*/
	var bukkake = 0;
	for(var i = 0; i < splooge.length; i++){
		if(isNaN(splooge[i])){
			var msg2 = "Error: non-numeric value sent to randomDist - value: " + splooge[i];
			console.log(msg);
			alert(msg);
			return 0;
		}else{
			bukkake += splooge[i];
		}
	}
	/*check to make sure that values for distribution are greater than 0*/
	if(bukkake == 0){console.log("Error: array value of zero sent to randomDist!");alert("Error: array value of zero sent to randomDist!");}
	/*generate random number with max value of sum-1*/
	var hose = Math.floor(random()*bukkake);
	/*check against each part of the distribution*/
	for(i = 0; i < splooge.length; i++){
		if(hose < splooge[i]){
			return i;
		}else{
			/*if not number, remove that item's value from random for next check.*/
			hose -= splooge[i];
		}
	}
	/*shouldn't reach this point.... if does, error!*/
	var msg3 = "Error: no matching item in distribution found in randomDist function. unpossible.";
	console.log(msg);
	alert(msg);
	return 0;
}

prerender.settingsetter = function(x) {
  if (settings.extremeContent) { // is true
        state.active.variables["noExtreme"]=true;
    }
    else { // is false
		state.active.variables["noExtreme"]=false;
    }
	if (settings.violentContent) { // is true
        state.active.variables["noViolent"]=true;
    }
    else { // is false
		state.active.variables["noViolent"]=false;
    }
	if (settings.rapeContent) { // is true
        state.active.variables["noForce"]=true;
    }
    else { // is false
		state.active.variables["noForce"]=false;
    }
};

var settingThemeNames = ["Dark", "Light", "Easy-Read"];
var settingThemeHandler = function () {
    switch (settings.theme) {
    case "Dark":
		//css_fuck('macro-dropdown').style.color="#eae5d7";
        css_fuck('body').style.color="#eae5d7";
		css_fuck('body').style.background="#0f0009";
		css_fuck('input').style.color="#eae5d7";
		css_fuck('input').style.background="#0f0009";
		css_fuck('#ui-bar').style.background="#222";
		css_fuck('#ui-bar').style.color="white";
		css_fuck('#topbar').style.background="#222";
		css_fuck('#actionbar').style.background="#222";
		css_fuck('#right-ui-bar').style.background="#222";
		css_fuck('#right-ui-bar').style.color="white";
		css_fuck('#ui-overlay').style.background="#000";
		css_fuck('#ui-dialog-body').style.background="#000";
		css_fuck('#ui-dialog-titlebar').style.background="#000";
		css_fuck('#ui-dialog-titlebar').style.color="#FFF";
		css_fuck('#menu li a').style.color="hotpink";
		css_fuck('#menu li a:hover').style.background="#444";
		css_fuck('.note').style.color="white";
		css_fuck('.exp').style.color="white";
		css_fuck('.clock').style.color="white";
		css_fuck('.pc').style.color="#ffbcd3";
		css_fuck('.npc').style.color="#93e7ff";
		css_fuck('.mono').style.color="#ffbcd3";
		css_fuck('.inst').style.color="white";
		css_fuck('.white').style.color="white";
		css_fuck('.smallauthor').style.color="white";
		css_fuck('.sceneauthor').style.color="white";
		css_fuck('.yellow').style.color="yellow";
		css_fuck('.green').style.color="limegreen";
		css_fuck('.good').style.color="limegreen";
		css_fuck('.import').style.color="yellow";
		css_fuck('.ident').style.color="#0befeb";
		css_fuck('.money').style.color="yellowgreen";
		css_fuck('.pink').style.color="pink";
		css_fuck('a').style.color="#edacf9";
        break;
    case "Light":
		//css_fuck('macro-dropdown').style.color="#000000";
        css_fuck('body').style.color="#210c00";
		css_fuck('body').style.background="#fff2fd";
		css_fuck('input').style.color="#210c00";
		css_fuck('input').style.background="#fff2fd";
		css_fuck('#ui-bar').style.background="#ffe2fc";
		css_fuck('#ui-bar').style.color="black";
		css_fuck('#topbar').style.background="#ffe2fc";
		css_fuck('#actionbar').style.background="#ffe2fc";
		css_fuck('#right-ui-bar').style.background="#ffe2fc";
		css_fuck('#right-ui-bar').style.color="black";
		css_fuck('#ui-overlay').style.background="#FFF";
		css_fuck('#ui-dialog-body').style.background="#FFF";
		css_fuck('#ui-dialog-titlebar').style.background="#FFF";
		css_fuck('#ui-dialog-titlebar').style.color="#000";
		css_fuck('#menu li a').style.color="deeppink";
		css_fuck('#menu li a:hover').style.background="#fc85ec";
		css_fuck('.note').style.color="#4c4d4f";
		css_fuck('.exp').style.color="#4c4d4f";
		css_fuck('.clock').style.color="black";
		css_fuck('.pc').style.color="#ff3279";
		css_fuck('.npc').style.color="#00b2ff";
		css_fuck('.mono').style.color="#ff3279";
		css_fuck('.inst').style.color="#4c4d4f";
		css_fuck('.white').style.color="black";
		css_fuck('.pink').style.color="#c400a3";
		css_fuck('.smallauthor').style.color="black";
		css_fuck('.sceneauthor').style.color="black";
		css_fuck('.yellow').style.color="#fcbd00";
		css_fuck('.green').style.color="green";
		css_fuck('.good').style.color="green";
		css_fuck('.import').style.color="#fcbd00";
		css_fuck('.ident').style.color="#03899e";
		css_fuck('.money').style.color="limegreen";
		css_fuck('.pink').style.color="hotpink";
		css_fuck('a').style.color="#d368e8";
        break;
    case "Easy-Read":
        //css_fuck('macro-dropdown').style.color="#000000";
		css_fuck('body').style.color="#000000";
		css_fuck('body').style.background="#FFF";
		css_fuck('input').style.color="#000000";
		css_fuck('input').style.background="#FFF";
		css_fuck('input').style.color="#000000";
		css_fuck('input').style.background="#FFF";
		css_fuck('#ui-bar').style.background="#FFF";
		css_fuck('#ui-bar').style.color="black";
		css_fuck('#topbar').style.background="#FFF";
		css_fuck('#actionbar').style.background="#FFF";
		css_fuck('#right-ui-bar').style.background="#FFF";
		css_fuck('#right-ui-bar').style.color="black";
		css_fuck('#ui-overlay').style.background="#FFF";
		css_fuck('#ui-dialog-body').style.background="#FFF";
		css_fuck('#ui-dialog-titlebar').style.background="#FFF";
		css_fuck('#ui-dialog-titlebar').style.color="#000";
		css_fuck('#menu li a').style.color="#000";
		css_fuck('#menu li a:hover').style.background="#FFF";
		css_fuck('.note').style.color="black";
		css_fuck('.exp').style.color="black";
		css_fuck('.clock').style.color="black";
		css_fuck('.pc').style.color="#44000e";
		css_fuck('.npc').style.color="#0f0044";
		css_fuck('.mono').style.color="#44000e";
		css_fuck('.inst').style.color="black";
		css_fuck('.white').style.color="black";
		css_fuck('.pink').style.color="black";
		css_fuck('.smallauthor').style.color="black";
		css_fuck('.sceneauthor').style.color="black";
		css_fuck('.yellow').style.color="#262200";
		css_fuck('.green').style.color="black";
		css_fuck('.good').style.color="black";
		css_fuck('.import').style.color="#262200";
		css_fuck('.ident').style.color="#262200";
		css_fuck('.money').style.color="black";
		css_fuck('.pink').style.color="hotpink";
		css_fuck('a').style.color="#9c00ba";
        break;
    }
	Setting.save();
};
var settingFontsizeHandler = function () {
    switch (settings.fontsize) {
    case "Normal":
		css_fuck('#story').style.fontSize="20px";
		css_fuck('#story').style.marginRight="305px";
		css_fuck('#story').style.marginLeft="305px";
        break;
	case "V-Small":
		css_fuck('#story').style.fontSize="16px";
		css_fuck('#story').style.marginRight="305px";
		css_fuck('#story').style.marginLeft="305px";
        break;
    case "Small":
		css_fuck('#story').style.fontSize="18px";
		css_fuck('#story').style.marginRight="305px";
		css_fuck('#story').style.marginLeft="305px";
        break;
    case "Large":
		css_fuck('#story').style.fontSize="22px";
		css_fuck('#story').style.marginRight="305px";
		css_fuck('#story').style.marginLeft="305px";
        break;
    case "X-Large":
		css_fuck('#story').style.fontSize="24px";
		css_fuck('#story').style.marginRight="305px";
		css_fuck('#story').style.marginLeft="305px";
        break;
    }
	Setting.save();
};

var settingExtremeHandler = function () {
    if (settings.extremeContent) { // is true
        state.active.variables["noExtreme"]=true;
    }
    else { // is false
		state.active.variables["noExtreme"]=false;
    }
	Setting.save();
};
var settingViolentHandler = function () {
    if (settings.violentContent) { // is true
        state.active.variables["noViolent"]=true;
    }
    else { // is false
		state.active.variables["noViolent"]=false;
    }
	Setting.save();
};
var settingRapeHandler = function () {
    if (settings.rapeContent) { // is true
        state.active.variables["noForce"]=true;
    }
    else { // is false
		state.active.variables["noForce"]=false;
    }
	Setting.save();
};


Setting.addToggle("extremeContent", {
    label    : "Disable Extreme Content?",
    default  : false,
    onInit   : settingExtremeHandler,
    onChange : settingExtremeHandler
});
Setting.addToggle("violentContent", {
    label    : "Disable Violent Content?",
    default  : false,
    onInit   : settingViolentHandler,
    onChange : settingViolentHandler
});
Setting.addToggle("rapeContent", {
    label    : "Disable Rape Content?",
    default  : false,
    onInit   : settingRapeHandler,
    onChange : settingRapeHandler
});
Setting.addToggle("tardMode", {
    label    : "Enable Simpleton Style?",
    default  : false,
    //onInit   : settingRapeHandler,
    //onChange : settingRapeHandler
});
Setting.addList("theme", {
    label    : "Choose a theme.",
    list     : settingThemeNames,
	default  : "Dark",
    //onInit   : settingThemeHandler,
    onChange : settingThemeHandler
});
Setting.addList("fontsize", {
    label    : "Choose a font size.",
    list     : [ "V-Small", "Small", "Normal", "Large", "X-Large"],
	default  : "Normal",
    //onInit   : settingFontsizeHandler,
    onChange : settingFontsizeHandler
});
Setting.addToggle("lowPerformance", {
    label    : "Enable Low-Performance Mode?",
    default  : false,
    //onInit   : settingRapeHandler,
    //onChange : settingRapeHandler
});

function cssrules(){
  var rules={};
  var ds=document.styleSheets;
  var dsl=ds.length;
  for (var i=0;i<dsl;++i){
    var dsi=ds[i].cssRules;
	var dsil=dsi.length;
    for (var j=0;j<dsil;++j){
		rules[dsi[j].selectorText] = dsi[j];
	}
  }
  return rules;
}
function css_fuck(name,createifnotfound){
  var rules=cssrules();
  if (!rules.hasOwnProperty(name)){
	  throw 'css class not found';
  }
  return rules[name];
}

/*between-game local store functions*/
setup.storeState = function () {
	var store = JSON.stringify(State.variables.gamestate);
	try {
		localStorage.setItem('state-send', store);
	} catch (e) {
		UI.alert('Local storage is inaccessible!');
		console.log(e);
	}
};

setup.unpackVars = function () {
	try {
		var store = localStorage.getItem('state-send');
		return JSON.parse(store);
	} catch(e) {
		UI.alert('Local storage is inaccessible!');
		console.log(e);
	}
};

/*map highlight library for jquery*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):b(a.jQuery)}(window,function(a){var b,c,d,e,f,g,h,i,j,k,l;if(c=!!document.createElement("canvas").getContext,b=function(){var a=document.createElement("div");a.innerHTML='<v:shape id="vml_flag1" adj="1" />';var b=a.firstChild;return b.style.behavior="url(#default#VML)",!b||"object"==typeof b.adj}(),!c&&!b)return void(a.fn.maphilight=function(){return this});if(c){i=function(a){return Math.max(0,Math.min(parseInt(a,16),255))},j=function(a,b){return"rgba("+i(a.substr(0,2))+","+i(a.substr(2,2))+","+i(a.substr(4,2))+","+b+")"},d=function(b){var c=a('<canvas style="width:'+a(b).width()+"px;height:"+a(b).height()+'px;"></canvas>').get(0);return c.getContext("2d").clearRect(0,0,a(b).width(),a(b).height()),c};var m=function(a,b,c,d,e){if(d=d||0,e=e||0,a.beginPath(),"rect"==b)a.rect(c[0]+d,c[1]+e,c[2]-c[0],c[3]-c[1]);else if("poly"==b){a.moveTo(c[0]+d,c[1]+e);for(var f=2;f<c.length;f+=2)a.lineTo(c[f]+d,c[f+1]+e)}else"circ"==b&&a.arc(c[0]+d,c[1]+e,c[2],0,2*Math.PI,!1);a.closePath()};e=function(b,c,d,e,f){var h=b.getContext("2d");if(e.shadow){h.save(),"inside"==e.shadowPosition&&(m(h,c,d),h.clip());var i=100*b.width,k=100*b.height;m(h,c,d,i,k),h.shadowOffsetX=e.shadowX-i,h.shadowOffsetY=e.shadowY-k,h.shadowBlur=e.shadowRadius,h.shadowColor=j(e.shadowColor,e.shadowOpacity);var l=e.shadowFrom;l||(l="outside"==e.shadowPosition?"fill":"stroke"),"stroke"==l?(h.strokeStyle="rgba(0,0,0,1)",h.stroke()):"fill"==l&&(h.fillStyle="rgba(0,0,0,1)",h.fill()),h.restore(),"outside"==e.shadowPosition&&(h.save(),m(h,c,d),h.globalCompositeOperation="destination-out",h.fillStyle="rgba(0,0,0,1);",h.fill(),h.restore())}h.save(),m(h,c,d),e.fill&&(h.fillStyle=j(e.fillColor,e.fillOpacity),h.fill()),e.stroke&&(h.strokeStyle=j(e.strokeColor,e.strokeOpacity),h.lineWidth=e.strokeWidth,h.stroke()),h.restore(),e.fade&&a(b).css("opacity",0).animate({opacity:1},100)},f=function(a){a.getContext("2d").clearRect(0,0,a.width,a.height)}}else d=function(b){return a('<var style="zoom:1;overflow:hidden;display:block;width:'+b.width+"px;height:"+b.height+'px;"></var>').get(0)},e=function(b,c,d,e,f){var g,h,i,j;for(var k in d)d[k]=parseInt(d[k],10);g='<v:fill color="#'+e.fillColor+'" opacity="'+(e.fill?e.fillOpacity:0)+'" />',h=e.stroke?'strokeweight="'+e.strokeWidth+'" stroked="t" strokecolor="#'+e.strokeColor+'"':'stroked="f"',i='<v:stroke opacity="'+e.strokeOpacity+'"/>',"rect"==c?j=a('<v:rect name="'+f+'" filled="t" '+h+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+d[0]+"px;top:"+d[1]+"px;width:"+(d[2]-d[0])+"px;height:"+(d[3]-d[1])+'px;"></v:rect>'):"poly"==c?j=a('<v:shape name="'+f+'" filled="t" '+h+' coordorigin="0,0" coordsize="'+b.width+","+b.height+'" path="m '+d[0]+","+d[1]+" l "+d.join(",")+' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:'+b.width+"px;height:"+b.height+'px;"></v:shape>'):"circ"==c&&(j=a('<v:oval name="'+f+'" filled="t" '+h+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+(d[0]-d[2])+"px;top:"+(d[1]-d[2])+"px;width:"+2*d[2]+"px;height:"+2*d[2]+'px;"></v:oval>')),j.get(0).innerHTML=g+i,a(b).append(j)},f=function(b){var c=a("<div>"+b.innerHTML+"</div>");c.children("[name=highlighted]").remove(),b.innerHTML=c.html()};g=function(a){var b,c=a.getAttribute("coords").split(",");for(b=0;b<c.length;b++)c[b]=parseFloat(c[b]);return[a.getAttribute("shape").toLowerCase().substr(0,4),c]},l=function(b,c){var d=a(b);return a.extend({},c,!!a.metadata&&d.metadata(),d.data("maphilight"))},k=function(a){return!!a.complete&&("undefined"==typeof a.naturalWidth||0!==a.naturalWidth)},h={position:"absolute",left:0,top:0,padding:0,border:0};var n=!1;a.fn.maphilight=function(i){return i=a.extend({},a.fn.maphilight.defaults,i),c||n||(a(window).ready(function(){document.namespaces.add("v","urn:schemas-microsoft-com:vml");var b=document.createStyleSheet(),c=["shape","rect","oval","circ","fill","stroke","imagedata","group","textbox"];a.each(c,function(){b.addRule("v\\:"+this,"behavior: url(#default#VML); antialias:true")})}),n=!0),this.each(function(){var j,m,n,o,p,q,s;if(j=a(this),!k(this))return window.setTimeout(function(){j.maphilight(i)},200);if(n=a.extend({},i,!!a.metadata&&j.metadata(),j.data("maphilight")),s=j.get(0).getAttribute("usemap"),s&&(o=a('map[name="'+s.substr(1)+'"]'),j.is('img,input[type="image"]')&&s&&o.length>0)){if(j.hasClass("maphilighted")){var t=j.parent();j.insertBefore(t),t.remove(),a(o).unbind(".maphilight")}m=a("<div></div>").css({display:"block",backgroundImage:'url("'+this.src+'")',backgroundSize:"contain",position:"relative",padding:0,width:this.width,height:this.height}),n.wrapClass&&(n.wrapClass===!0?m.addClass(a(this).attr("class")):m.addClass(n.wrapClass)),j.before(m).css("opacity",0).css(h).remove(),b&&j.css("filter","Alpha(opacity=0)"),m.append(j),p=d(this),a(p).css(h),p.height=this.height,p.width=this.width,a(o).bind("alwaysOn.maphilight",function(){q&&f(q),c||a(p).empty(),a(o).find("area[coords]").each(function(){var b,f;f=l(this,n),f.alwaysOn&&(!q&&c&&(q=d(j[0]),a(q).css(h),q.width=j[0].width,q.height=j[0].height,j.before(q)),f.fade=f.alwaysOnFade,b=g(this),c?e(q,b[0],b[1],f,""):e(p,b[0],b[1],f,""))})}).trigger("alwaysOn.maphilight").bind("mouseover.maphilight, focus.maphilight",function(b){var d,f,h=b.target;if(f=l(h,n),!f.neverOn&&!f.alwaysOn){if(d=g(h),e(p,d[0],d[1],f,"highlighted"),f.groupBy){var i;i=/^[a-zA-Z][\-a-zA-Z]+$/.test(f.groupBy)?o.find("area["+f.groupBy+'="'+a(h).attr(f.groupBy)+'"]'):o.find(f.groupBy);var j=h;i.each(function(){if(this!=j){var a=l(this,n);if(!a.neverOn&&!a.alwaysOn){var b=g(this);e(p,b[0],b[1],a,"highlighted")}}})}c||a(p).append("<v:rect></v:rect>")}}).bind("mouseout.maphilight, blur.maphilight",function(a){f(p)}),j.before(p),j.addClass("maphilighted")}})},a.fn.maphilight.defaults={fill:!0,fillColor:"000000",fillOpacity:.2,stroke:!0,strokeColor:"ff0000",strokeOpacity:1,strokeWidth:1,fade:!0,alwaysOn:!1,neverOn:!1,groupBy:!1,wrapClass:!0,shadow:!1,shadowX:0,shadowY:0,shadowRadius:6,shadowColor:"000000",shadowOpacity:.8,shadowPosition:"outside",shadowFrom:!1}});


/*! <<bugreport>> macro for SugarCube 2.x */
!function(){"use strict";if("undefined"==typeof version||"undefined"==typeof version.title||"SugarCube"!==version.title||"undefined"==typeof version.major||version.major<2)throw new Error("<<bugreport>> macro requires SugarCube 2.0 or greater, aborting load");Macro.add("bugreport",{handler:function(){function serializeVariables(varObj,diffObj,doSort){function renderDiff(diff,orig){for(var keys=Object.keys(diff||{}),render=orig?clone(orig):{},i=0,klen=keys.length;klen>i;i++){var p=keys[i],diffP=diff[p];if(diffP===Util.DiffOp.Delete)delete render[p];else if(Array.isArray(diffP))switch(diffP[0]){case Util.DiffOp.SpliceArray:try{render.splice(diffP[1],1+(diffP[2]-diffP[1]))}catch(e){}break;case Util.DiffOp.Copy:render[p]=clone(diffP[1]);break;case Util.DiffOp.CopyDate:render[p]=new Date(diffP[1])}else{var recurse=renderDiff(diffP,render[p]);0!==Object.keys(recurse).length&&(render[p]=recurse)}}return render}var varList=[],diff=renderDiff(Util.diff(varObj,diffObj));for(var p in diff){var sName="$"+(-1===p.search(/[^\w]/)?p:'"'+p+'"');varList.push(sName+"="+JSON.stringify(diff[p]))}return doSort&&("function"==typeof doSort?varList.sort(doSort):varList.sort()),0!==varList.length?varList.join(", "):""}var srcMatch,passages,varsPre,varsPost,dialog,dataEl,info=null!=this.args[0]&&Story.has(this.args[0])?Story.get(this.args[0]):null,last=State.length-1,source=unescape(window.location);null!==(srcMatch=/\/([^\/]+)$/.exec(source))&&(source=srcMatch[1]),passages=[];for(var i=0;last>=i;i++)passages.push('"'+State.index(i).title+'"');passages=passages.join(", "),varsPre=serializeVariables(State.index(0).variables,State.index(last).variables),varsPost=serializeVariables(State.index(last).variables,State.variables),dialog=UI.setup("Bug Report","bugreport"),dialog.innerHTML=(null!==info?'<div id="bugreport-info"></div>':"")+'<div><b>Bug report:</b> <a id="bugreport-data-select" class="link-internal macro-bugreport">[Select]</a></div><code id="bugreport-data" tabindex="0"></code>'+(/applewebkit|chrome/.test(Browser.userAgent)?"":'<div class="scroll-pad">&nbsp;</div>'),dataEl=dialog.querySelector("#bugreport-data"),null!==info&&new Wikifier(dialog.querySelector("#bugreport-info"),info.processText()),addAccessibleClickHandler("#bugreport-data-select",function(self){return function(){jQuery(dataEl).focus(),self.selectData(dataEl)}}(this.self)),insertText(dataEl,"[spoiler][code]"),insertElement(dataEl,"br"),insertText(dataEl,"SOURCE: "+source),insertElement(dataEl,"br"),insertElement(dataEl,"br"),insertText(dataEl,"PASSAGES:"),insertElement(dataEl,"br"),insertText(dataEl,passages),insertElement(dataEl,"br"),insertElement(dataEl,"br"),insertText(dataEl,"VARIABLES (PRE-EXECUTION):"),insertElement(dataEl,"br"),varsPre&&(insertText(dataEl,varsPre),insertElement(dataEl,"br")),insertElement(dataEl,"br"),insertText(dataEl,"VARIABLES (POST-EXECUTION):"),insertElement(dataEl,"br"),varsPost&&(insertText(dataEl,varsPost),insertElement(dataEl,"br")),insertText(dataEl,"[/code][/spoiler]"),UI.open()},selectData:function(e){if(window.getSelection){var s=window.getSelection();if(s.setBaseAndExtent)s.setBaseAndExtent(e,0,e,e.innerText.length-1);else{window.opera&&"<br>"===e.innerHTML.substring(e.innerHTML.length-4)&&(e.innerHTML+="&nbsp;");var r=document.createRange();r.selectNodeContents(e),s.removeAllRanges(),s.addRange(r)}}else if(document.getSelection){var s=document.getSelection(),r=document.createRange();r.selectNodeContents(e),s.removeAllRanges(),s.addRange(r)}else if(document.selection){var r=document.body.createTextRange();r.moveToElementText(e),r.select()}}})}();


/*! <<checkvars>> macro for SugarCube 2.x */
!function(){"use strict";if("undefined"==typeof version||"undefined"==typeof version.title||"SugarCube"!==version.title||"undefined"==typeof version.major||version.major<2)throw new Error("<<checkvars>> macro requires SugarCube 2.0 or greater, aborting load");Macro.add("checkvars",{handler:function(){function toString(value,indent){var baseType=typeof value;switch(baseType){case"number":return isNaN(value)?"NaN":isFinite(value)?String(value):"Infinity";case"string":return JSON.stringify(value);case"function":return"(function)";default:if("object"!==baseType||null==value)return String(value);var objType=Object.prototype.toString.call(value);if("[object Date]"===objType)return'(object: Date, value: "'+value.toISOString()+'")';if("[object RegExp]"===objType)return"(object: RegExp, value: "+value.toString()+")";var opener,closer,result=[],indentText="  ";return indent||(indent=""),("[object Set]"===objType||value instanceof Set)&&(value=Array.from(value)),Array.isArray(value)?(opener="[\n",closer="\n"+indent+"]",value.forEach(function(p,i){result.push(indent+indentText+i+" ⇒ "+toString(value[i],indent+indentText))}),Object.keys(value).forEach(function(p){/^\d+$/.test(p)||result.push(indent+indentText+toString(p)+" ⇒ "+toString(value[p],indent+indentText))})):"[object Map]"===objType||value instanceof Map?(opener="{\n",closer="\n"+indent+"}",Array.from(value).map(function(kv){result.push(indent+indentText+toString(kv[0],indent+indentText)+" ⇒ "+toString(kv[1],indent+indentText))})):(opener="{\n",closer="\n"+indent+"}",Object.keys(value).forEach(function(p){result.push(indent+indentText+toString(p)+" ⇒ "+toString(value[p],indent+indentText))})),opener+result.join(",\n")+closer}}var dialog,sv=State.variables,names=Object.keys(sv);if(dialog=UI.setup("Story $variables","checkvars"),0===names.length)return dialog.innerHTML="<h1>Story $variables (<code>State.variables</code>):</h1><p><em>No $variables currently set…</em></p>",void UI.open();dialog.innerHTML="<h1>Story $variables (<code>State.variables</code>):</h1><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody></tbody></table>"+(/applewebkit|chrome/.test(Browser.userAgent)?"":'<div class="scroll-pad">&nbsp;</div>');var tbody=dialog.querySelector("tbody");names.sort(function(a,b){return Util.isNumeric(a)&&Util.isNumeric(b)?Number(a)-Number(b):a.localeCompare(b)});for(var i=0;i<names.length;i++){var tr=document.createElement("tr"),tdName=document.createElement("td"),tdValue=document.createElement("td");tdName.textContent="$"+names[i],tdValue.textContent=toString(sv[names[i]]),tr.appendChild(tdName),tr.appendChild(tdValue),tbody.appendChild(tr)}UI.open()}})}();

/* Prepend the <canvas> to the incoming passage. */
prerender["prependCanvas"] = function (content) {
	if (tags().contains("canvas")) {
		/* Add the <canvas> to the incoming passage render buffer (pre-render). */
		$(content)
			.append('<canvas id="dispcanvas"></canvas>');
	}
}
