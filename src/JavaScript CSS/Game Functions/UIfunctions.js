/*
/*  ██╗   ██╗██╗
/*  ██║   ██║██║
/*  ██║   ██║██║
/*  ██║   ██║██║
/*  ╚██████╔╝██║
/*   ╚═════╝ ╚═╝
*/

setup.ui = {
  mainPhone: function(){
    let out = `<div id="timeDateDisp" class="timeDateDisp blackOutline white" style="background-color:rgba(0,0,0,${State.active.variables.phoneDataBG});">`;
    let wx = (setup.time.daytime() != "D")? "IMG_Cloudy" : "IMG_PTLYcloudy";
    let mon = State.active.variables.AW.cash;
    let bal = (mon < 0)? "bad": "money";
    out += `<span class="clock">${setup.timeDisp}</span> ${setup.ui.sunSym()}<br>${setup.time.dateDisplay()}<br>`;
    out += `<span style="font-size: 120%;">Credits:</span> <span class="${bal}" style="font-size:125%">₢${mon}</span>`;
    out += `<img data-passage="${wx}" class="floatRight" style="margin-right:3px;"></div>`;
    return out;
  },
  sunSym: function(){
    let y, x = setup.time.daytime();
    switch(x){
    case "N":
      y = "IMG_MoonIcon";
      break;
    case "SR":
    case "SS":
      y = "IMG_SunSetIcon";
      break;
    case "D":
      y = "IMG_SunIcon";
      break;
    default:
      y = "IMG_SunIcon";
      break;
    }
    return `<img data-passage="${y}" style="width:15px;height:15px;">`;
  },
  menuButtons: function(){
    let out = "";
    if(!tags().includes("hidden") && State.active.variables.showMenuButton){
      out += "<<link [img[Character|IMGcharacter]]>><<set $prevPassage = passage()>><<goto [[character]]>><</link>>";
      out += "<<link [img[Room View|IMGroomview]]>><<dialog 'Room View'>><<include [[scene]]>><</dialog>><</link>>";
      out += "<<link [img[Contacts|IMGcontacts]]>><<set $prevPassage = passage()>><<goto [[relationships]]>><</link>>";
    }else{
      out += "<<link [img[Character|IMGcharacter_disabled]]>><</link>>";
      out += "<<link [img[Room View|IMGroomview_disabled]]>><</link>>";
      out += "<<link [img[Contacts|IMGcontacts_disabled]]>><</link>>";
    }
    out += "<<link [img[Game Settings|IMGsettings]]>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>>";
    if(!tags().includes("hidden") && State.active.variables.showMenuButton){
      if(State.active.variables.pub && State.active.variables.cheatMode){
        out += "<<link [img[Cheat Menu|IMGcheatmenu]]>><<set $prevPassage = passage()>><<goto [[cheatMenu]]>><</link>>";
      }else{
        out += "<<link [img[Cheat Menu|IMGlocked]]>><<dialog 'AW Cheats'>><<include [[ifYouWantCheats]]>><</dialog>><</link>>";
      }
    }else{
      if(State.active.variables.pub && State.active.variables.cheatMode){
        out += "<<link [img[Cheat Menu|IMGcheatmenu_disabled]]>><</link>>";
      }else{
        out += "<<link [img[Cheat Menu|IMGlocked_disabled]]>><</link>>";
      }
    }
    out += "<<link [img[Game Guide|IMGgameguide]]>><<replace '#guidecontainer'>><<include [[UIGuideContainer]]>><</replace>><</link>>";
    if(!tags().includes("hidden") && State.active.variables.showDebug){
      out += "<<link [img[Debug Menu|IMGdebug]]>><<set $prevPassage = passage()>><<goto [[debugPage]]>><</link>>";
    }
    if(!tags().includes("hidden") && State.active.variables.showMenuButton){
      out += "<<link [img[AWR Load|IMGimages]]>><</link>>";
      out += "<<link [img[Theme Controls|IMGthemes]]>><<replace '#awUIcontainer'>><<include [[MenuThemeSettingsPop]]>><</replace>><</link>>";
      out += "<<link [img[Achievements|IMGachieve]]>><</link>>";
    }else{
      out += "<<link [img[AWR Load|IMGimages_disabled]]>><</link>>";
      out += "<<link [img[Theme Controls|IMGthemes_disabled]]>><</link>>";
      out += "<<link [img[Achievements|IMGachieve_disabled]]>><</link>>";
    }
    return out;
  },
  actionButts: function(){
    let out = "";
    if(!tags().includes("hidden") && State.active.variables.showMenuButton){
      if(State.active.variables.sched.workDays[State.active.variables.date[0]]){
        out += "<<link [img[Go to Work|IMG_GoToWorkSmall]]>><<run setup.job.goto()>><</link>>";
      }
    }
    return out;
  },
  warnIndicate: function(){
    let msg = "";
    if(State.active.variables.showData){
      let warn = 0;
      let v = aw.get("PC");
      warn += (v.status.health < 50)? 1: 0;
      warn += (v.status.need > 3)? 1: 0;
      warn += (v.status.arousal > 10)? 1: 0;
      warn += (v.status.stress > 80)? 1: 0;
      warn += (v.status.happy < -5)? 1: 0;
      warn += (v.status.satisfaction < 20)? 1: 0;
      warn += (v.status.anger > 7)? 1: 0;
      warn += (v.groom.clownMU)? 1: 0;
      if(warn > 0){
        msg += "<img data-passage='PhoneMenuBottomAlert' style='position:fixed;top:883px;left:2px;width:280px;height:auto;z-index:60;'>";
      }
    }
    return msg;
  },
  debugToolers: function(){
    let out = "";
    //let v = aw.get("PC"),bc,cyc;
    if(State.active.variables.debu){
      out += `<div id="gayzor" class="uibutton"><span id="debugtog"><<include [[RightSidebarDebugDelayToggle]]>></span> <<button "CheckVars">><<checkvars>><</button>> <span id="debugtooltog"><<if Config.debug>><<include [[RightSidebarDebugVisToggle]]>><</if>></span></div>`;
    }
    return out;
  },
  statusInfo: function(){
    let out = "";
    let v = aw.get("PC"),bc,cyc;
    if(State.active.variables.showData){
      out += `<div id="statusDisplayBox" style="background-color:rgba(0,0,0,${State.active.variables.phoneDataBG});">`;
      out += "<table id='layout'><tr><td style='width:30%'><b>Mood:</b></td><td><<pcMood>></td></tr>";
      out += "<tr><td><b>Arousal:</b></td><td class='pink'><<pcArousal>></td></tr>";
      if(v.status.birthCon != 0 && v.kink.pregnancy){
        bc = `<td class='orange'>${v.status.birthConType}</td>`;
      }else if(v.status.birthCon < 75 && v.trait.perceptive == 1){
        bc = `<td class='yellow'>${v.status.birthConType}</td>`;
      }else if(v.status.birthCon != 0){
        bc = `<td class='green'>${v.status.birthConType}</td>`;
      }else{
        bc = "<td class='pink'>None</td>";
      }
      if(v.status.period != 0){
        cyc = `<td class='pink'>${v.status.fertText}</td>`;
      }else{
        switch(v.status.risk){
        case 0:
          cyc = `<td class='green'>${v.status.fertText}</td>`;
          break;
        case 1:
          cyc = `<td class='yellowgreen'>${v.status.fertText}</td>`;
          break;
        case 2:
          cyc = `<td class='yellow'>${v.status.fertText}</td>`;
          break;
        case 3:
          cyc = `<td class='orange'>${v.status.fertText}</td>`;
          break;
        case 4:
          cyc = `<td class='orangered'>${v.status.fertText}</td>`;
          break;
        case 5:
          cyc = `<td class='red'>${v.status.fertText}</td>`;
          break;
        default:
          cyc = `<td class='white'>${v.status.fertText}</td>`;
          break;
        }
      }
      out += `<tr><td><b>B-Con:</b></td>${bc}</tr>`;
      out += `<tr><td><b>Cycle:</b></td>${cyc}</tr>`;
      out += "<tr><td><b>Status:</b></td><td style='text-align:left;'><<pcStatus>></td></tr></table></div>";
    }
    return out;
  },
  progressBar: function(size,label = false,color = "blue",anim=false){
    let out = "<div class='progress-bar";
    let colors = ["blue","orange","green","shine","stripes","glow"];
    if(size < 0){
      size *= -1;
    }
    if("number" !== typeof size){
      size = 69;
    }else if(size < 1 && size > 0){
      size = Math.round(size * 100);
    }else{
      size = Math.round(size);
    }
    if(size > 100){
      size = 100;
    }
    if(colors.includes(color)){
      out += ` ${color}_bar`;
    }else{
      out += " blue_bar";
    }
    if(anim && colors.includes(anim)){
      out += ` ${anim}_bar`;
    }
    if(!label){
      label = "";
    }
    out += `'><span style="width: ${size}%">${label}</span></div>`;
    return out;
  },
  charList: function(){
    let npcs;
    if(State.active.variables.activeNPC == null){
      npcs = [];
    }else{
      npcs = State.active.variables.activeNPC;
    }
    let output = '<img data-passage="IMG_TwatsNearYou" class="small-phone-twatter"><div id="twatsnearyou" class="small-phone-twatterA">';
    if(npcs.length > 0){
      for(let i = 0, c = npcs.length; i < c; i++){
        let nom = State.active.variables.NPC[npcs[i]];
        let nam = nom.main.name;
        if(nam.length > 7){
          nam = nam.slice(0,7);
        }
        let sur = nom.main.surname.slice(0,1);
        output += nam + " " + sur + ".";
        if(c > 5 && i === 4){
          output += "</div><div id='twatsnearyou' class='small-phone-twatterB'>";
        }else if(i !== 9){
          output += "<br>";
        }
      }
      output += "</div>";
    }else{
      output += "No Twats Nearby!</div>";
    }
    return output;
  },
};


Macro.add("progressbar",{
  handler: function(){
    if(this.args.length < 1 || "number" !== typeof this.args[0]){
      return this.error("The progressbar macro requires a size argument that must be a number.");
    }
    let op,num,label,color,anim,x=this.args.length;
    num = this.args[0];
    label = (x > 1)? this.args[1]: false;
    color = (x > 2)? this.args[2]: false;
    anim = (x > 3)? this.args[3]: false;
    op = setup.ui.progressBar(num,label,color,anim);
    return new Wikifier(this.output, op);
  }
});

