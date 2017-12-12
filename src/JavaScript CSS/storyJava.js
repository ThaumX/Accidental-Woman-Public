config.history.controls = false;
Config.loadDelay = 500;
Setting.addHeader("Accidental Woman Settings");
Config.saves.slots = 10;
Config.saves.version = 5.0;
Config.history.maxStates = 1;
setup.ver = 0;
setup.sexActs = {};
setup.sexPos = {};
setup.perf = {};
Config.saves.onLoad = function (save) {
  /* code */
};
Config.saves.onSave = function (save) {
  /* code */
};
prehistory.perfstart = function (taskName) {
  setup.perf.prehist = performance.now();
};
prerender.perfrend = function (content, taskName) {
  setup.perf.preRend = performance.now();
};
postrender.perfaftrend = function (content, taskName) {
  setup.perf.postHist = performance.now();
};
postdisplay.perfend = function (taskName) {
  let aftDisp = performance.now();
  let time = [0,0,0];
  time[0] = Math.floor(setup.perf.preRend - setup.perf.prehist);
  time[1] = Math.floor(setup.perf.postHist-setup.perf.preRend);
  time[2] = Math.floor(aftDisp - setup.perf.postHist);
  let cont = "ΔͲ: "+(Math.floor(aftDisp-setup.perf.prehist) + "." + (Math.round((aftDisp-setup.perf.prehist)*10) % 10))+"ms [S:" + time[0] + "|R:" + time[1] + "|D:" + time[2]+"]";
  setup.appendStr("#passage-transition-time",cont);
};
function randomDist(splooge){
  /*use try to get array length. If not array, will fail and proc error*/
  try{
    var jizz = splooge.length;
  }
  catch(e){
    var msg1 = "Error: non array sent to randomDist - " + splooge + ": "+e.name+": "+e.message;
    console.log(msg1);
    alert(msg1);
    return 0;
  }
  /*sum up total value of all array items*/
  var bukkake = 0;
  for(var i = 0; i < splooge.length; i++){
    if(isNaN(splooge[i])){
      var msg2 = "Error: non-numeric value sent to randomDist - value: " + splooge[i];
      console.log(msg2);
      alert(msg2);
      return 0;
    }else{
      bukkake += splooge[i];
    }
  }
  /*check to make sure that values for distribution are greater than 0*/
  if(bukkake == 0){console.log("Error: array value of zero sent to randomDist!");alert("Error: array value of zero sent to randomDist!");}
  /*generate random number with max value of sum-1*/
  var hose = Math.floor(randomFloat(bukkake));
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
  console.log(msg3);
  alert(msg3);
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

var settingThemeNames = {
  background: ["Dark","Light","Desert","NightSky","Marooned","Woodstain","LightGrey","DarkGrey"],
  text: ["Light","Dark","White","Black","Grey"],
  colors: ["Default","DarkDefault","Forest","Meadow","Sky","NightSky","Fall","Summer"]
};
setup.backgroundThemeHandler = function() {
  switch (settings.backgroundTheme) {
	case "Dark":
		css_fuck('body').style.background="#0f0009";
		css_fuck('input').style.background="#0f0009";
		css_fuck('#ui-bar').style.background="#222";
		css_fuck('#topbar').style.background="#222";
		css_fuck('#actionbar').style.background="#222";
		css_fuck('#right-ui-bar').style.background="#222";
		css_fuck('#ui-overlay').style.background="#222";
		css_fuck('#ui-dialog-body').style.background="#222";
		css_fuck('#ui-dialog-titlebar').style.background="#222";
		break;
	case "Light":
		css_fuck('body').style.background="#efdcec";
		css_fuck('input').style.background="#efdcec";
		css_fuck('#ui-bar').style.background="#e8bee3";
		css_fuck('#topbar').style.background="#e8bee3";
		css_fuck('#actionbar').style.background="#e8bee3";
		css_fuck('#right-ui-bar').style.background="#e8bee3";
		css_fuck('#ui-overlay').style.background="#e8bee3";
		css_fuck('#ui-dialog-body').style.background="#e8bee3";
		css_fuck('#ui-dialog-titlebar').style.background="#e8bee3";
		break;
  case "Desert":
    css_fuck('body').style.background="#f2d6ab";
    css_fuck('input').style.background="#f2d6ab";
    css_fuck('#ui-bar').style.background="#e0c69f";
    css_fuck('#topbar').style.background="#e0c69f";
    css_fuck('#actionbar').style.background="#e0c69f";
    css_fuck('#right-ui-bar').style.background="#e0c69f";
    css_fuck('#ui-overlay').style.background="#e0c69f";
    css_fuck('#ui-dialog-body').style.background="#e0c69f";
    css_fuck('#ui-dialog-titlebar').style.background="#e0c69f";
    break;
	case "NightSky":
    css_fuck('body').style.background="#001038";
    css_fuck('input').style.background="#001038";
    css_fuck('#ui-bar').style.background="#001342";
    css_fuck('#topbar').style.background="#001342";
    css_fuck('#actionbar').style.background="#001342";
    css_fuck('#right-ui-bar').style.background="#001342";
    css_fuck('#ui-overlay').style.background="#001342";
    css_fuck('#ui-dialog-body').style.background="#001342";
    css_fuck('#ui-dialog-titlebar').style.background="#001342";
  break;
	case "Marooned":
    css_fuck('body').style.background="#38000b";
    css_fuck('input').style.background="#38000b";
    css_fuck('#ui-bar').style.background="#47000e";
    css_fuck('#topbar').style.background="#47000e";
    css_fuck('#actionbar').style.background="#47000e";
    css_fuck('#right-ui-bar').style.background="#47000e";
    css_fuck('#ui-overlay').style.background="#47000e";
    css_fuck('#ui-dialog-body').style.background="#47000e";
    css_fuck('#ui-dialog-titlebar').style.background="#47000e";
  break;
	case "Woodstain":
    css_fuck('body').style.background="#3f2500";
    css_fuck('input').style.background="#3f2500";
    css_fuck('#ui-bar').style.background="#4f2e00";
    css_fuck('#topbar').style.background="#4f2e00";
    css_fuck('#actionbar').style.background="#4f2e00";
    css_fuck('#right-ui-bar').style.background="#4f2e00";
    css_fuck('#ui-overlay').style.background="#4f2e00";
    css_fuck('#ui-dialog-body').style.background="#4f2e00";
    css_fuck('#ui-dialog-titlebar').style.background="#4f2e00";
  break;
	case "LightGrey":
    css_fuck('body').style.background="#efefef";
    css_fuck('input').style.background="#efefef";
    css_fuck('#ui-bar').style.background="#d6d6d6";
    css_fuck('#topbar').style.background="#d6d6d6";
    css_fuck('#actionbar').style.background="#d6d6d6";
    css_fuck('#right-ui-bar').style.background="#d6d6d6";
    css_fuck('#ui-overlay').style.background="#d6d6d6";
    css_fuck('#ui-dialog-body').style.background="#d6d6d6";
    css_fuck('#ui-dialog-titlebar').style.background="#d6d6d6";
  break;
	case "DarkGrey":
    css_fuck('body').style.background="#353535";
    css_fuck('input').style.background="#353535";
    css_fuck('#ui-bar').style.background="#444444";
    css_fuck('#topbar').style.background="#444444";
    css_fuck('#actionbar').style.background="#444444";
    css_fuck('#right-ui-bar').style.background="#444444";
    css_fuck('#ui-overlay').style.background="#444444";
    css_fuck('#ui-dialog-body').style.background="#444444";
    css_fuck('#ui-dialog-titlebar').style.background="#444444";
  break;
  }
  Setting.save();
};
setup.textThemeHandler = function() {
  switch (settings.textTheme) {
	case "Light":
		css_fuck('body').style.color="#eae5d7";
		css_fuck('input').style.color="#eae5d7";
		css_fuck('#ui-bar').style.color="white";
		css_fuck('#right-ui-bar').style.color="white";
		css_fuck('#ui-dialog-titlebar').style.color="#FFF";
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
    css_fuck('.infoLink a').style.color="#a5e4ff";
		break;
	case "Dark":
		css_fuck('body').style.color="#210c00";
		css_fuck('input').style.color="#210c00";
		css_fuck('#ui-bar').style.color="black";
		css_fuck('#right-ui-bar').style.color="black";
		css_fuck('#ui-dialog-titlebar').style.color="#000";
		css_fuck('.note').style.color="#4c4d4f";
		css_fuck('.exp').style.color="#4c4d4f";
		css_fuck('.clock').style.color="black";
		css_fuck('.pc').style.color="#ff3279";
		css_fuck('.npc').style.color="#00b2ff";
		css_fuck('.mono').style.color="#ff3279";
		css_fuck('.inst').style.color="#4c4d4f";
		css_fuck('.white').style.color="black";
		css_fuck('.smallauthor').style.color="black";
		css_fuck('.sceneauthor').style.color="black";
		css_fuck('.yellow').style.color="#fcbd00";
		css_fuck('.green').style.color="green";
		css_fuck('.good').style.color="green";
		css_fuck('.import').style.color="#fcbd00";
		css_fuck('.ident').style.color="#03899e";
		css_fuck('.money').style.color="limegreen";
    css_fuck('.pink').style.color="hotpink";
    css_fuck('.infoLink a').style.color="#4690af";
		break;
  case "White":
    css_fuck('body').style.color="white";
    css_fuck('input').style.color="white";
    css_fuck('#ui-bar').style.color="#eae5d7";
    css_fuck('#right-ui-bar').style.color="#eae5d7";
    css_fuck('#ui-dialog-titlebar').style.color="#eae5d7";
    css_fuck('.note').style.color="#eae5d7";
    css_fuck('.exp').style.color="#eae5d7";
    css_fuck('.clock').style.color="#eae5d7";
    css_fuck('.pc').style.color="#ffbcd3";
    css_fuck('.npc').style.color="#93e7ff";
    css_fuck('.mono').style.color="#ffbcd3";
    css_fuck('.inst').style.color="#eae5d7";
    css_fuck('.white').style.color="#eae5d7";
    css_fuck('.smallauthor').style.color="#eae5d7";
    css_fuck('.sceneauthor').style.color="#eae5d7";
    css_fuck('.yellow').style.color="yellow";
    css_fuck('.green').style.color="limegreen";
    css_fuck('.good').style.color="limegreen";
    css_fuck('.import').style.color="yellow";
    css_fuck('.ident').style.color="#0befeb";
    css_fuck('.money').style.color="yellowgreen";
    css_fuck('.pink').style.color="pink";
    css_fuck('.infoLink a').style.color="#a5e4ff";
    break;
  case "Black":
    css_fuck('body').style.color="black";
    css_fuck('input').style.color="black";
    css_fuck('#ui-bar').style.color="#210c00";
    css_fuck('#right-ui-bar').style.color="#210c00";
    css_fuck('#ui-dialog-titlebar').style.color="#000";
    css_fuck('.note').style.color="#4c4d4f";
    css_fuck('.exp').style.color="#4c4d4f";
    css_fuck('.clock').style.color="#210c00";
    css_fuck('.pc').style.color="#ff3279";
    css_fuck('.npc').style.color="#00b2ff";
    css_fuck('.mono').style.color="#ff3279";
    css_fuck('.inst').style.color="#4c4d4f";
    css_fuck('.white').style.color="#210c00";
    css_fuck('.smallauthor').style.color="#210c00";
    css_fuck('.sceneauthor').style.color="#210c00";
    css_fuck('.yellow').style.color="#fcbd00";
    css_fuck('.green').style.color="green";
    css_fuck('.good').style.color="green";
    css_fuck('.import').style.color="#fcbd00";
    css_fuck('.ident').style.color="#03899e";
    css_fuck('.money').style.color="limegreen";
    css_fuck('.pink').style.color="hotpink";
    css_fuck('.infoLink a').style.color="#4690af";
    break;
	case "Grey":
    css_fuck('body').style.color="#3a3a3a";
    css_fuck('input').style.color="#3a3a3a";
    css_fuck('#ui-bar').style.color="#2d2d2d";
    css_fuck('#right-ui-bar').style.color="#2d2d2d";
    css_fuck('#ui-dialog-titlebar').style.color="#000";
    css_fuck('.note').style.color="#4c4d4f";
    css_fuck('.exp').style.color="#4c4d4f";
    css_fuck('.clock').style.color="#2d2d2d";
    css_fuck('.pc').style.color="#ff3279";
    css_fuck('.npc').style.color="#00b2ff";
    css_fuck('.mono').style.color="#ff3279";
    css_fuck('.inst').style.color="#4c4d4f";
    css_fuck('.white').style.color="#2d2d2d";
    css_fuck('.smallauthor').style.color="#2d2d2d";
    css_fuck('.sceneauthor').style.color="#2d2d2d";
    css_fuck('.yellow').style.color="#fcbd00";
    css_fuck('.green').style.color="green";
    css_fuck('.good').style.color="green";
    css_fuck('.import').style.color="#fcbd00";
    css_fuck('.ident').style.color="#03899e";
    css_fuck('.money').style.color="limegreen";
    css_fuck('.pink').style.color="hotpink";
    css_fuck('.infoLink a').style.color="#a5e4ff";

  break;
  }
  Setting.save();
};
setup.colorThemeHandler = function() {
  switch (settings.colorTheme) {
	case "Default":
		css_fuck('#menu li a').style.color="hotpink";
		css_fuck('a').style.color="#edacf9";
    css_fuck('.link').style.color="#edacf9";
    css_fuck('table').style.borderColor="#b40f46";
    css_fuck('tr').style.borderColor="#b40f46";
    //css_fuck('#stats').style.borderColor="#b40f46";
		css_fuck('.head').style.color="hotpink";
		css_fuck('.head1').style.color="hotpink";
		css_fuck('.head2').style.color="hotpink";
		css_fuck('.head3').style.color="hotpink";
    css_fuck('.head4').style.color="hotpink";
    css_fuck('#right-sidebar-status').style.borderColor="#8e014a";
    css_fuck('#right-sidebar-command').style.borderColor="#8e014a";
    css_fuck('#right-sidebar-portrait').style.borderColor="#8e014a";
    css_fuck('#ui-bar').style.borderColor="#8e014a";
    css_fuck('#right-ui-bar').style.borderColor="#8e014a";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(181,0,108,0.8)";
    css_fuck('#ui-bar-toggle').style.color="#ff54c8";
    css_fuck('#right-ui-bar-toggle').style.color="#ff54c8";
		break;
	case "DarkDefault":
    css_fuck('#menu li a').style.color="deeppink";
    css_fuck('a').style.color="#edacf9";
    css_fuck('.link').style.color="#edacf9";
    css_fuck('table').style.borderColor="#b40f46";
    css_fuck('tr').style.borderColor="#b40f46";
    //css_fuck('#stats').style.borderColor="#b40f46";
    css_fuck('.head').style.color="deeppink";
    css_fuck('.head1').style.color="deeppink";
    css_fuck('.head2').style.color="deeppink";
    css_fuck('.head3').style.color="deeppink";
    css_fuck('.head4').style.color="deeppink";
    css_fuck('#right-sidebar-status').style.borderColor="#8e014a";
    css_fuck('#right-sidebar-command').style.borderColor="#8e014a";
    css_fuck('#right-sidebar-portrait').style.borderColor="#8e014a";
    css_fuck('#ui-bar').style.borderColor="#8e014a";
    css_fuck('#right-ui-bar').style.borderColor="#8e014a";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(181,0,108,0.8)";
    css_fuck('#ui-bar-toggle').style.color="#ff54c8";
    css_fuck('#right-ui-bar-toggle').style.color="#ff54c8";
		break;
	case "Forest":
    css_fuck('#menu li a').style.color="#34930b";
    css_fuck('a').style.color="#2a7c40";
    css_fuck('.link').style.color="#2a7c40";
    css_fuck('table').style.borderColor="#637c10";
    css_fuck('tr').style.borderColor="#637c10";
    //css_fuck('#stats').style.borderColor="#637c10";
    css_fuck('.head').style.color="#34930b";
    css_fuck('.head1').style.color="#34930b";
    css_fuck('.head2').style.color="#34930b";
    css_fuck('.head3').style.color="#34930b";
    css_fuck('.head4').style.color="#34930b";
    css_fuck('#right-sidebar-status').style.borderColor="#046018";
    css_fuck('#right-sidebar-command').style.borderColor="#046018";
    css_fuck('#right-sidebar-portrait').style.borderColor="#046018";
    css_fuck('#ui-bar').style.borderColor="#046018";
    css_fuck('#right-ui-bar').style.borderColor="#046018";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(7,150,69,0.8)";
    css_fuck('#ui-bar-toggle').style.color="#3dad11";
    css_fuck('#right-ui-bar-toggle').style.color="#3dad11";
    break;
	case "Meadow":
    css_fuck('#menu li a').style.color="#57b00f";
    css_fuck('a').style.color="#3eb05c";
    css_fuck('.link').style.color="#3eb05c";
    css_fuck('table').style.borderColor="#86a418";
    css_fuck('tr').style.borderColor="#86a418";
    //css_fuck('#stats').style.borderColor="#86a418";
    css_fuck('.head').style.color="#64b711";
    css_fuck('.head1').style.color="#64b711";
    css_fuck('.head2').style.color="#64b711";
    css_fuck('.head3').style.color="#64b711";
    css_fuck('.head4').style.color="#64b711";
    css_fuck('#right-sidebar-status').style.borderColor="#078a21";
    css_fuck('#right-sidebar-command').style.borderColor="#06821e";
    css_fuck('#right-sidebar-portrait').style.borderColor="#06821e";
    css_fuck('#ui-bar').style.borderColor="#06821e";
    css_fuck('#right-ui-bar').style.borderColor="#06821e";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(10, 176, 82, 0.8)";
    css_fuck('#ui-bar-toggle').style.color="#43b014";
    css_fuck('#right-ui-bar-toggle').style.color="#43b014";
    break;
	case "Sky":
    css_fuck('#menu li a').style.color="#00bfff";
    css_fuck('a').style.color="#00acef";
    css_fuck('.link').style.color="#00acef";
    css_fuck('table').style.borderColor="#186aa4";
    css_fuck('tr').style.borderColor="#186aa4";
    //css_fuck('#stats').style.borderColor="#186aa4";
    css_fuck('.head').style.color="#118eb7";
    css_fuck('.head1').style.color="#118eb7";
    css_fuck('.head2').style.color="#118eb7";
    css_fuck('.head3').style.color="#118eb7";
    css_fuck('.head4').style.color="#118eb7";
    css_fuck('#right-sidebar-status').style.borderColor="#07538a";
    css_fuck('#right-sidebar-command').style.borderColor="#07538a";
    css_fuck('#right-sidebar-portrait').style.borderColor="#07538a";
    css_fuck('#ui-bar').style.borderColor="#07538a";
    css_fuck('#right-ui-bar').style.borderColor="#07538a";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(10, 132, 203, 0.8)";
    css_fuck('#ui-bar-toggle').style.color="#1477b0";
    css_fuck('#right-ui-bar-toggle').style.color="#1477b0";
    break;
  case "NightSky":
    css_fuck('#menu li a').style.color="#0079a1";
    css_fuck('a').style.color="#0078a4";
    css_fuck('.link').style.color="#0078a4";
    css_fuck('table').style.borderColor="#11496f";
    css_fuck('tr').style.borderColor="#11496f";
    //css_fuck('#stats').style.borderColor="#11496f";
    css_fuck('.head').style.color="#0c6079";
    css_fuck('.head1').style.color="#0c6079";
    css_fuck('.head2').style.color="#0c6079";
    css_fuck('.head3').style.color="#0c6079";
    css_fuck('.head4').style.color="#0c6079";
    css_fuck('#right-sidebar-status').style.borderColor="#053557";
    css_fuck('#right-sidebar-command').style.borderColor="#053557";
    css_fuck('#right-sidebar-portrait').style.borderColor="#053557";
    css_fuck('#ui-bar').style.borderColor="#053557";
    css_fuck('#right-ui-bar').style.borderColor="#053557";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(7, 91, 140, 0.8)";
    css_fuck('#ui-bar-toggle').style.color="#0c4868";
    css_fuck('#right-ui-bar-toggle').style.color="#0c4868";
    break;
	case "Fall":
    css_fuck('table').style.borderColor="#bc8403";
    css_fuck('tr').style.borderColor="#bc8403";
    //css_fuck('#stats').style.borderColor="#bc8403";
    css_fuck('.head').style.color="#bc6e00";
    css_fuck('.head1').style.color="#bc6e00";
    css_fuck('.head2').style.color="#bc6e00";
    css_fuck('.head3').style.color="#bc6e00";
    css_fuck('.head4').style.color="#bc6e00";
    css_fuck('a').style.color="#ba9100";
    css_fuck('.link').style.color="#ba9100";
    css_fuck('#menu li a').style.color="#ba9100";
    css_fuck('#right-sidebar-status').style.borderColor="#994403";
    css_fuck('#right-sidebar-command').style.borderColor="#994403";
    css_fuck('#right-sidebar-portrait').style.borderColor="#994403";
    css_fuck('#ui-bar').style.borderColor="#994403";
    css_fuck('#right-ui-bar').style.borderColor="#994403";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(155,64,0,0.8)";
    css_fuck('#ui-bar-toggle').style.color="#a83203";
    css_fuck('#right-ui-bar-toggle').style.color="#a83203";
    break;
  case "Summer":
    /*css_fuck('.option-input').style.background="#e04098";*/
    /*css_fuck('#divide').style.borderTop="2px solid #ffb200";*/
    css_fuck('table').style.borderColor="#ffb200";
    css_fuck('tr').style.borderColor="#ffb200";
    //css_fuck('#stats').style.borderColor="#ffb200";
    css_fuck('.head').style.color="#ff9400";
    css_fuck('.head1').style.color="#ff9400";
    css_fuck('.head2').style.color="#ff9400";
    css_fuck('.head3').style.color="#ff9400";
    css_fuck('.head4').style.color="#ff9400";
    css_fuck('a').style.color="#ffc700";
    css_fuck('.link').style.color="#ffc700";
    css_fuck('#menu li a').style.color="#ffc700";
    css_fuck('#right-sidebar-status').style.borderColor="#bc8300";
    css_fuck('#right-sidebar-command').style.borderColor="#bc8300";
    css_fuck('#right-sidebar-portrait').style.borderColor="#bc8300";
    css_fuck('#ui-bar').style.borderColor="#bc8300";
    css_fuck('#right-ui-bar').style.borderColor="#bc8300";
    css_fuck('::-webkit-scrollbar-thumb').style.background="rgba(221,148,31,0.8)";
    css_fuck('#ui-bar-toggle').style.color="#ffc700";
    css_fuck('#right-ui-bar-toggle').style.color="#ffc700";
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
Setting.addList("backgroundTheme", {
    label    : "Choose background color.",
    list     : settingThemeNames.background,
  default  : "Dark",
    //onInit   : settingThemeHandler,
    onChange : setup.backgroundThemeHandler
});
Setting.addList("textTheme", {
    label    : "Choose text colors.",
    list     : settingThemeNames.text,
  default  : "Light",
    //onInit   : settingThemeHandler,
    onChange : setup.textThemeHandler
});
Setting.addList("colorTheme", {
    label    : "Choose theme colors.",
    list     : settingThemeNames.colors,
  default  : "Default",
    //onInit   : settingThemeHandler,
    onChange : setup.colorThemeHandler
});
Setting.addList("fontsize", {
    label    : "Choose a font size.",
    list     : [ "V-Small", "Small", "Normal", "Large", "X-Large"],
  default  : "Normal",
    //onInit   : settingFontsizeHandler,
    onChange : settingFontsizeHandler
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
    alert('css class not found '+name);
    throw 'css class not found '+name;
  }
  return rules[name];
}
/*save the storage ids of saved NPCs in local storage*/
setup.NPCStoreList = [];
/*between-game local store functions*/
setup.storeState = function () {
  var store = JSON.stringify(State.variables.gamestate);
  try {
    localStorage.setItem('state-send', store);
  } catch (e) {
    let msg = "Local storage unavailable error: "+e.name+": "+e.message;
    alert(msg);
    console.log(msg);
  }
};

setup.unpackVars = function () {
  try {
    var store = localStorage.getItem('state-send');
    return JSON.parse(store);
  } catch(e) {
    let msg = "Local storage unavailable error: "+e.name+": "+e.message;
    alert(msg);
    console.log(msg);
  }
};
/*************************************************************/
/* functions to save and recover localstore npcs             */
/*************************************************************/
Config.saves.onSave = function (save){
  save.metadata = {};
  save.metadata.npcs = {};
  let list = setup.NPCStoreList;
  for(let i = 0, c = list.length; i < c; i++){
    save.metadata.npcs[list[i]] = setup.AW.localRestore(list[i]);
    if(save.metadata.npcs[list[i]] == "error"){
      let msg = "error retrieving NPC for save"+list[i]+"!";
      console.log(msg);
    }
  }
  save.metadata.list = list;
};
Config.saves.onLoad = function (save) {
  let list = save.metadata.list;
  let keys = Object.keys(save.metadata.npcs);
  let ck = true;
  setup.NPCStoreList = [];
  for(let i = 0, c = keys.length; i < c; i++){
    ck = setup.AW.localStore(keys[i],save.metadata.npcs[keys[i]]);
    if(ck == "error"){
      let msg = "error storing saved NPC data: "+keys[i];
      console.log(msg);
      alert(msg);
    }else{
      setup.NPCStoreList.push(keys[i]);
    }
  }
};



/* Prepend the <canvas> to the incoming passage. */
prerender["prependCanvas"] = function (content) {
  if (tags().contains("canvas")) {
    /* Add the <canvas> to the incoming passage render buffer (pre-render). */
    $(content)
      .append('<canvas id="dispcanvas"></canvas>');
  }
};
