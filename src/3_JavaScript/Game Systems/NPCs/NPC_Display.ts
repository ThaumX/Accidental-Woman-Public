
//  888b    888 8888888b.   .d8888b.
//  8888b   888 888   Y88b d88P  Y88b
//  88888b  888 888    888 888    888
//  888Y88b 888 888   d88P 888
//  888 Y88b888 8888888P"  888
//  888  Y88888 888        888    888
//  888   Y8888 888        Y88b  d88P
//  888    Y888 888         "Y8888P"
//
//
//  8888888b.  d8b                   888
//  888  "Y88b Y8P                   888
//  888    888                       888
//  888    888 888 .d8888b  88888b.  888  8888b.  888  888
//  888    888 888 88K      888 "88b 888     "88b 888  888
//  888    888 888 "Y8888b. 888  888 888 .d888888 888  888
//  888  .d88P 888      X88 888 d88P 888 888  888 Y88b 888
//  8888888P"  888  88888P' 88888P"  888 "Y888888  "Y88888
//                          888                        888
//                          888                   Y8b d88P
//                          888                    "Y88P"

// Functions to display NPC information to the player

// INTERFACE

interface IntSetupNpcDisplay {
  singlePrint: (npcid: string, noContact: boolean) => string;
  fakePrint: (npcid: string) => string;
  printList: (group: string) => string;
  printNear: () => string;
  detailView: (npcid: string) => void;
  sexView: (npcid: string) => string;
  sexViewTwo: (npcid: string) => string;
}

setup.npcDisplay = {
  // formats text to display a standard npc in the npc list
  singlePrint(npcid: string, noContact: boolean = false): string {
    const ᛝ = aw.npc[npcid]; // get reference to npc object
    // set container div
    let output = `<div id="npcDisplay-${npcid}" class="npcDisplayItem">`;
    // set icon by gender and age
    if (ᛝ.main.female) {
      if (ᛝ.main.age < 25) {
        output += "<img data-passage=\"IMG-IconFemaleTeen\" ";
      } else if (ᛝ.main.age < 35) {
        output += "<img data-passage=\"IMG-IconFemaleYoungAdult\" ";
      } else if (ᛝ.main.age < 45) {
        output += "<img data-passage=\"IMG-IconFemaleAdult\" ";
      } else if (ᛝ.main.age < 55) {
        output += "<img data-passage=\"IMG-IconFemaleMiddleAge\" ";
      } else {
        output += "<img data-passage=\"IMG-IconFemaleElderly\" ";
      }
    } else {
      if (ᛝ.main.age < 25) {
        output += "<img data-passage=\"IMG-IconMaleTeen\" ";
      } else if (ᛝ.main.age < 35) {
        output += "<img data-passage=\"IMG-IconMaleYoungAdult\" ";
      } else if (ᛝ.main.age < 45) {
        output += "<img data-passage=\"IMG-IconMaleAdult\" ";
      } else if (ᛝ.main.age < 55) {
        output += "<img data-passage=\"IMG-IconMaleMiddleAge\" ";
      } else {
        output += "<img data-passage=\"IMG-IconMaleElderly\" ";
      }
    }
    // style the image
    output += "style=\"position:absolute;top:8px;left:5px;height:75px;width:75px;\">";
    // create div to hold the text and circle bars
    output += `<div id="npcDisplayText-${npcid}" style="position:absolute;top:5px;bottom:5px;left:100px;right:130px;margin:0;padding:0;line-height:1.2;text-align:left;">`;
    // add the actual NPC's name
    output += `<span class="head blackOutline" style="font-size:1.1rem;">${ᛝ.main.fullName}</span> &nbsp;&nbsp;&nbsp;<span style="font-size:0.9rem;color:#555;">${setup.atr.npcATRword(npcid)}</span><br>`;
    // print an image with label for the circle bar
    output += `<img data-passage="IMG-NPCdisplayLike" style="margin:0px;display:inline-block;">`;
    // add the svg for the bar, uses css to format, percentage fill is pretty straight-forward
    output +=
`<div class="single-chart-circle"><svg viewBox="0 0 36 36" class="circular-chart green">
<path class="circle-chart-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<path class="circle-chart" stroke-dasharray="${ᛝ.rship.likeNPC}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<text x="18" y="21.85" class="percentage-circle">${ᛝ.rship.likeNPC}</text> </svg></div>`;
    // print the love label
    output += `<img data-passage="IMG-NPCdisplayLove" style="margin:0px;display:inline-block;">`;
    // another circle chart for love
    output +=
      `<div class="single-chart-circle"><svg viewBox="0 0 36 36" class="circular-chart pink">
<path class="circle-chart-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<path class="circle-chart" stroke-dasharray="${ᛝ.rship.loveNPC}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<text x="18" y="21.85" class="percentage-circle">${ᛝ.rship.loveNPC}</text> </svg></div>`;
    // create a sub-div to help keep things aligned right, then add days since contact, and label image
    output += `<div style="display:inline-block;width:50px;height:60px;margin:0px;padding:0px;text-align:center;"><span class="monospace" style="font-size:1.1rem;line-height:1;">${ᛝ.rship.daysince}</span><br><img data-passage="IMG-NPCdisplayDays" style="margin:0px;"></div>`;
    output += "</div>";
    // create a div to hold the buttons
    output += `<div id="npcDisplayButton-${npcid}" style="position:absolute;top:1px;bottom:1px;right:5px;width:110px;margin:0;padding:0;">`;
    // print the viewer button
    output += `<<button "VIEW 🕵">><<set _npcViewerID = "${npcid}">><<replace "#labler">>${ᛝ.main.fullName}<</replace>><<replace "#menuContent">><<include [[NPC-DetailView]]>><</replace>><</button>><br>`;
    // the text/contact button, if so that it can be hidden for "nearby npcs"
    if (!noContact) {
      output += `<<button "TEXT 💬">><<set _launch = {passage: "NPC-Contact-Phone", block: false, content: "<<set _npcContactID = '${npcid}'>>", npcid: "${npcid}", title: "Phone Contact: ${ᛝ.main.name}", size: 3, callback: function(){aw.con.info("NPC Contact callback fired.");}, onclose: function(){aw.con.info("NPC Contact on-close fired. :D");}}>><<run setup.npcInfo.daySinceReset("${npcid}")>><<run setup.interact.launch(_launch)>><</button>>`;
    }
    output += `</div></div>`;
    return output;
  },
  // just like the above, but designed to print fake npc items
  fakePrint(npcid: string): string {
    const ᛝ = aw.fakeNPC[npcid];
    let output = `<div id="npcDisplay-${npcid}" class="npcDisplayItem">`;
    let gWord = "him";
    if (ᛝ.gender !== 1) {
      gWord = "her";
      if (ᛝ.age < 25) {
        output += "<img data-passage=\"IMG-IconFemaleTeen\" ";
      } else if (ᛝ.age < 35) {
        output += "<img data-passage=\"IMG-IconFemaleYoungAdult\" ";
      } else if (ᛝ.age < 45) {
        output += "<img data-passage=\"IMG-IconFemaleAdult\" ";
      } else if (ᛝ.age < 55) {
        output += "<img data-passage=\"IMG-IconFemaleMiddleAge\" ";
      } else {
        output += "<img data-passage=\"IMG-IconFemaleElderly\" ";
      }
    } else {
      if (ᛝ.age < 25) {
        output += "<img data-passage=\"IMG-IconMaleTeen\" ";
      } else if (ᛝ.age < 35) {
        output += "<img data-passage=\"IMG-IconMaleYoungAdult\" ";
      } else if (ᛝ.age < 45) {
        output += "<img data-passage=\"IMG-IconMaleAdult\" ";
      } else if (ᛝ.age < 55) {
        output += "<img data-passage=\"IMG-IconMaleMiddleAge\" ";
      } else {
        output += "<img data-passage=\"IMG-IconMaleElderly\" ";
      }
    }
    output += "style=\"position:absolute;top:8px;left:5px;height:75px;width:75px;\">";
    output += `<div id="npcDisplayText-${npcid}" style="position:absolute;top:5px;bottom:5px;left:100px;right:130px;margin:0;padding:0;line-height:1.2;text-align:left;">`;
    output += `<span class="head blackOutline" style="font-size:1.1rem;">${ᛝ.fullName}</span><br>`;
    output += `This is a partial NPC. Interact with ${gWord} to convert!`;
    output += "</div>";
    output += `<div id="npcDisplayButton-${npcid}" style="position:absolute;top:1px;bottom:1px;right:5px;width:110px;margin:0;padding:0;">`;
    output += `<<button "VIEW 🕵">><<dialog "NPC Detail: ${ᛝ.fullName}">><<set _npcViewerID = "${npcid}">><<include [[NPC-DetailViewFake]]>><</dialog>><</button>><br>`;
    output += `</div></div>`;
    return output;
  },
  // uses the above functions to generate items for each sorted npc, and returns it so that it can
  // be displayed in a flex container. somewhat ugly...
  printList(group: string): string {
    const keys = Object.keys(aw.npc);
    const toPrint = [] as string[];
    // checks all NPCs to see if they match the criteria
    for (let i = 0, c = keys.length; i < c; i++) {
      switch (group) {
        case "friends":
          if (aw.npc[keys[i]].rship.friend) {
            toPrint.push(keys[i]);
          }
          break;
        case "contacts":
          if (aw.npc[keys[i]].rship.acquaint) {
            toPrint.push(keys[i]);
          }
          break;
        case "lovers":
          // tslint:disable-next-line:max-line-length
          if (aw.npc[keys[i]].rship.dating || aw.npc[keys[i]].rship.lovers || aw.npc[keys[i]].rship.exclusive || aw.npc[keys[i]].rship.engaged || aw.npc[keys[i]].rship.married) {
            toPrint.push(keys[i]);
          }
          break;
      }
    }
    let output = "";
    // actually adds the print output from approved NPCs
    for (let i = 0, c = toPrint.length; i < c; i++) {
      output += setup.npcDisplay.singlePrint(toPrint[i], false);
    }
    return output;
  },
  // similar to the print list function, but just prints all npcs in the "nearby" map.NPC array
  printNear(): string {
    let output = "";
    for (let i = 0, c = ↂ.map.NPC.length; i < c; i++) {
      if (ↂ.map.NPC[i].slice(0, 1) === "n") {
        output += setup.npcDisplay.singlePrint(ↂ.map.NPC[i], true);
      } else if (ↂ.map.NPC[i].slice(0, 1) === "f") {
        output += setup.npcDisplay.fakePrint(ↂ.map.NPC[i]);
      }
    }
    return output;
  },
  // MEGAFUNCTION OF DOOM
  // contains sub functions that are run with setTimeout to populate the NPC details view in a neat
  // way. It's probably only beneficial for slower machines, but will look cooler regardless.
  // each sub function corresponds to a NPC object, and a single div in the display.
  // each function calls the next when it is finished (via settimeout for dom)
  detailView(npcid: string): void {
    // check to make sure that the npc is real, if not end early
    if (aw.npc[npcid] == null) {
      aw.con.warn(`Invalid npcid given to setup.npcDisplay.detailView(). NPC ${npcid} doesn't exist!`);
      aw.replace("#npcMenuMain", `It seems there was an error loading this NPC. Sorry about that!`);
      return;
    }
    // get a reference to the npc to use in this context
    const ᛝ =  aw.npc[npcid];
    // get a reference to the info object, which controls what can be seen by the player
    const ᚥ = ᛝ.record.info;
    // a fancy "redacted" text to use over and over
    const redact = "<r>[REDACTED]</r>";
    // this seriously just turns string nums into other ones to make npc id look more realistic as an Appletree ID number.
    function wtfer(num: string) {
      const a = {
        0: "9",
        1: "3",
        2: "8",
        3: "6",
        4: "1",
        5: "7",
        6: "2",
        7: "0",
        8: "4",
        9: "5",
      };
      const b = {
        0: "C",
        1: "B",
        2: "K",
        3: "R",
        4: "P",
        5: "T",
        6: "M",
        7: "F",
        8: "N",
        9: "H",
      };
      const c = {
        0: "7",
        1: "6",
        2: "5",
        3: "4",
        4: "9",
        5: "3",
        6: "2",
        7: "8",
        8: "1",
        9: "0",
      };
      let ret = a[num.slice(0, 1)];
      ret += b[num.slice(0, 1)];
      ret += c[num.slice(1, 2)];
      ret += a[num.slice(2, 3)];
      return ret;
    }
    // Series of subfunctions to generate output for each area.
    function main() {
      // subfunction to print main NPC details - calls next in line.
      let output = "";
      // div/section title add to output
      output += `<div class="npcSectionTitle npcMenuGrid">Primary Information</div>`;
      // ENTIRE rest of function in a try/catch. if something breaks inside, the other divs will still be called this way.
      try {
        // set a div container - note, uses css grid. grid specs found in mainmenu.css
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 3;">`;
        // start printing information.
        // Note: <b> turns text orange and with Vollkorn font
        output += `<b>Appletree ID:</b> ${ᛝ.main.id}-${wtfer(String(ᛝ.main.id).slice(-3))}<br>`;
        let gend;
        if (ᛝ.main.female && !ᛝ.main.male) {
          gend = "Female";
        } else if (!ᛝ.main.female && ᛝ.main.male) {
          gend = "Male";
        } else {
          gend = "Hermaphrodite";
        }
        output += `<b>Sex:</b> ${gend}<br>`;
        output += `<b>Age:</b> ${ᛝ.main.age} years old<br>`;
        const birthDay = ᛝ.main.bd[0] + (ᛝ.main.bd[1] * 7);
        output += `<b>Birthday:</b> ${birthDay}${setup.numberLetAbrv(birthDay)} of ${setup.monthName(ᛝ.main.bd[2])}, ${ᛝ.main.bd[3]}`;
        // remember to close the div on this container
        output += "</div>";
        // new div, amounts to the "middle" column
        output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 4 / span 3;">`;
        let homes;
        // determine correct term based on background
        if (!ᚥ.bGround[0] && !aw.chad.psychic) {
          homes = redact;
        } else if (ᛝ.background.homeParents) {
          homes = "<i>with parents</i>";
        } else if (ᛝ.background.home === 0) {
          homes = "<span class='bad'>HOMELESS</span>";
        } else if (ᛝ.background.home > 3) {
          homes = "Townhome";
        } else {
          homes = "Apartment";
        }
        // determine if info is redacted or not, then include in output later
        const edju = (ᚥ.bGround > 0 || aw.chad.psychic) ? ᛝ.background.highestSchool : redact;
        const jobu = (ᚥ.bGround > 0 || aw.chad.psychic) ? ᛝ.background.job : redact;
        const caru = (ᚥ.bGround > 0 || aw.chad.psychic) ? ᛝ.background.car : redact;
        // add items to output, using above variables
        output += `<b>Residence:</b> ${homes}<br>`;
        output += `<b>Education:</b> ${edju}<br>`;
        output += `<b>Career:</b> ${jobu}<br>`;
        output += `<b>Vehicle:</b> ${caru}`;
        output += "</div>";
        // new container - the "third column"
        output += `<div class="npcMenuGrid" style="grid-column: 6 / span 1; grid-row: 4 / span 3;">`;
        output += `<b>Days Since Contact:</b> ${ᛝ.rship.daysince}<br>`;
        output += `<center class="monospace ship">|--- SYSTEM INFO ---|</center>`;
        output += `<b>Lifetime:</b> ${ᛝ.main.lifetime} days<br>`;
        let sscore: string | number = setup.suicide.score(npcid);
        if (sscore === -2) {
          sscore = "Permanent";
        } else if (sscore === -1) {
          sscore = "Currently Safe";
        }
        output += `<b>Suicide Score:</b> ${sscore}`;
        output += "</div>";
        // =================================================
        // end of the data formatting and try block
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (main). ${e.name}: ${e.message}.`);
        // give standard error message to output
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      // use replace to print content to designated div
      aw.replace("#npcMenuMain", output);
      // call next subfunction after small delay to allow dom update.
      setTimeout(() => rShip(), 25);
    }
    function rShip() {
      // subfunction to print relationship NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Relationship Information</div>`;
      try {
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 3;">`;
        let shippy = "Acquaintance";
        let realShip = false;
        let friendy = true;
        if (ᛝ.rship.married) {
          shippy = "Married";
          realShip = true;
        } else if (ᛝ.rship.engaged) {
          shippy = "Engaged";
          realShip = true;
        } else if (ᛝ.rship.lovers) {
          shippy = "Lovers";
          realShip = true;
        } else if (ᛝ.rship.exclusive) {
          shippy = "Exclusive";
          realShip = true;
        } else if (ᛝ.rship.dating) {
          shippy = "Dating";
        } else if (ᛝ.rship.friend) {
          if (ᛝ.rship.likeNPC >= 80 && ᛝ.rship.likePC >= 80) {
            shippy = "Best Friends";
            realShip = true;
          } else {
            shippy = "Friends";
          }
        } else {
          friendy = false;
        }
        output += `<b>Relationship:</b> ${shippy}<br>`;
        let temp1: string|number = redact;
        let temp2: string|number = redact;
        let temp3: string|number = redact;
        if (realShip || aw.chad.psychic) {
          if (aw.chad.psychic) {
            temp1 = ᛝ.rship.mesh;
            temp2 = ᛝ.rship.space;
            temp3 = ᛝ.rship.domsub;
          } else {
            temp1 = (ᚥ.core > 0 && ᚥ.trait > 0 && ᚥ.pref > 0) ? ᛝ.rship.mesh : redact;
            temp2 = (ᚥ.core > 0 && ᚥ.trait > 1 && ᚥ.status > 0) ? ᛝ.rship.space : redact;
            temp3 = (ᚥ.core > 1 && ᚥ.trait > 1 && ᚥ.pref > 1) ? ᛝ.rship.domsub : redact;
          }
        }
        if (friendy || aw.chad.psychic) {
          output += `<<progressbar ${ᛝ.rship.companion} "Companionship" "blue">>`;
        } else {
          output += `<b>Companionship:</b> ${redact}<br>`;
        }
        output += `<b>Compatibility:</b> ${temp1}<br>`;
        output += `<b>Space Needed:</b> ${temp2}<br>`;
        output += `<b>Dom / Sub:</b> ${temp3}`;
        output += "</div>";
        output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 4 / span 3;">`;
        output += `<b>Player's Feelings:</b><br><center>`;
        output += `<img data-passage="IMG-NPCdisplayLike" style="margin:0px;display:inline-block;">&nbsp;`;
        // add the svg for the bar, uses css to format, percentage fill is pretty straight-forward
        output +=
          `<svg viewBox="0 0 36 36" class="circular-chart green bigger" style="display:inline-block;">
<path class="circle-chart-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<path class="circle-chart bright" stroke-dasharray="${ᛝ.rship.likeNPC}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<text x="18" y="21.85" class="percentage-circle white">${ᛝ.rship.likeNPC}</text> </svg>`;
        // print the love label
        output += `&nbsp;&nbsp;&nbsp;&nbsp;`;
        output += `<img data-passage="IMG-NPCdisplayLove" style="margin:0px;display:inline-block;">&nbsp;`;
        // another circle chart for love
        output +=
          `<svg viewBox="0 0 36 36" class="circular-chart pink bigger" style="display:inline-block;">
<path class="circle-chart-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<path class="circle-chart bright" stroke-dasharray="${ᛝ.rship.loveNPC}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<text x="18" y="21.85" class="percentage-circle white">${ᛝ.rship.loveNPC}</text> </svg>`;
        output += "</center></div>";
        // check if we show how the NPC feels about the player
        let toShowA = false;
        let toShowB = false;
        if ((ᚥ.core > 1 && ᚥ.pref > 1 && ᚥ.status > 1 && ᚥ.trait > 1) || aw.chad.psychic) {
          toShowA = true;
        }
        // harder check for love value!
        if ((ᚥ.core > 2 && ᚥ.pref > 2 && ᚥ.bGround > 2 && ᚥ.status > 2 && ᚥ.trait > 2) || aw.chad.psychic) {
          toShowB = true;
        }
        output += `<div class="npcMenuGrid" style="grid-column: 6 / span 1; grid-row: 4 / span 3;">`;
        output += `<b>NPC's Feelings:</b><br><center>`;
        if (toShowA) {
          output += `<img data-passage="IMG-NPCdisplayLike" style="margin:0px;display:inline-block;">&nbsp;`;
          // add the svg for the bar, uses css to format, percentage fill is pretty straight-forward
          output +=
            `<svg viewBox="0 0 36 36" class="circular-chart green bigger" style="display:inline-block;">
<path class="circle-chart-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<path class="circle-chart bright" stroke-dasharray="${ᛝ.rship.likePC}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<text x="18" y="21.85" class="percentage-circle white">${ᛝ.rship.likePC}</text> </svg>`;
          output += `&nbsp;&nbsp;&nbsp;&nbsp;`;
          // print the love label
          output += `<img data-passage="IMG-NPCdisplayLove" style="margin:0px;display:inline-block;">&nbsp;`;
          if (toShowB) {
            // another circle chart for love
            output +=
              `<svg viewBox="0 0 36 36" class="circular-chart pink bigger" style="display:inline-block;">
<path class="circle-chart-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<path class="circle-chart bright" stroke-dasharray="${ᛝ.rship.lovePC}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
<text x="18" y="21.85" class="percentage-circle white">${ᛝ.rship.lovePC}</text> </svg>`;
          } else {
            output += `<div style="display:inline-block;max-height:80px;padding:0px;margin:0px;width: 100px;">${redact}<br><br></div>`;
          }
        } else {
          output += `<div style="display:inline-block;max-height:80px;padding:0px;margin:0px;width: 100px;">${redact}<br><br></div>`;
        }
        output += "</center></div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (rship). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuRShip", output);
      setTimeout(() => body(), 25);
    }
    function body() {
      // subfunction to print body NPC details - calls next in line.
      // body general, body detail, tits, junk
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Body Information</div>`;
      try {
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">`;
        if (ᚥ.bodyGeneral || aw.chad.psychic) {
          output += "<b>Basic information:</b><br>";
          output += `A ${ᛝ.body.race} person with ${ᛝ.body.skinColor} skin, ${aw.parse(npcid, "tone.q")} ${aw.parse(npcid, "weight.q")} body ${aw.parse(npcid, "height.q")} tall. `;
          output += `Regarding body you notice ${aw.parse(npcid, "shoulder.q")} shoulders, ${aw.parse(npcid, "hip.q")} hips, ${aw.parse(npcid, "waist.q")} waist and a ${aw.parse(npcid, "ass.q")} butt. `;
          output += `Considering ${ᛝ.body.face} face with ${ᛝ.body.eyeColor} eyes, ${ᛝ.body.brow} brows, ${ᛝ.body.nose} nose and ${ᛝ.body.jaw} jaw ${ᛝ.main.name} can be described as ${aw.parse(npcid, "beauty.q")}. `;
          output += (ᛝ.body.ears === "pierced") ? `Both ears are pierced. ` : "";
          const atrList = ["hideous", "unattractive", "unprepossessing", "normal", "nice", "adorable", "splendid"];
          output += `It is safe to say that ${aw.parse(npcid, "pronounhisher.q")} overall attractiveness is ${atrList[Math.floor(aw.npc.n101.status.atr / 2)]}.<br>`;
        } else {
          output += `<b>Basic information:</b>${redact}<br>`;
        }
        if (ᚥ.bodyTits || aw.chad.psychic) {
          if (ᛝ.main.female) {
          output += "<br><b>Tits information:</b><br>";
          output += `She has ${aw.parse(npcid, "breastshape.q")} ${aw.parse(npcid, "breast.q")} tits of ${aw.parse(npcid, "cupsize.q")} size`;
          output += (ᛝ.body.tits.lact.on) ? ` which are lactating. ` : ". ";
          output += `${ᛝ.main.name}'s nipples are ${ᛝ.body.tits.shape} shaped, ${aw.parse(npcid, "niplength.q")} and ${aw.parse(npcid, "nipwidth.q")}. Areolas are ${aw.parse(npcid, "areolapuffy.q")} and ${aw.parse(npcid, "areolasize.q")}.<br>`;
          }
        } else {
          if (ᛝ.main.female) {
          output += `<br><b>Tits information:</b>${redact}<br>`;
          }
        }
        if (ᚥ.bodyJunk || aw.chad.psychic) {
          output += "<b>Junk information:</b><br>";
          if (ᛝ.main.male) {
            output += `${ᛝ.main.name}'s cock length is ${aw.parse(npcid, "cock.q")}, girth is ${aw.parse(npcid, "cockgirth.q")} and the head is ${aw.parse(npcid, "cockhead.q")},`;
            output += (ᛝ.body.cock.circum) ? " the cock is circumsized. " : " ";
            output += `${aw.parse(npcid, "pronounhisher.q")} ${aw.parse(npcid, "ballsag.q")} ${aw.parse(npcid, "ballsack.q")} ballsack is`;
            if (ᛝ.body.balls.count === 2) { // typical AW
              output += ` filled with ${aw.parse(npcid, "ballsize.q")} testicles. `;
            } else if (ᛝ.body.balls.count > 2) {
              output += ` filled with ${ᛝ.body.balls.count} ${aw.parse(npcid, "ballsize.q")} testicles. `;
            } else if (ᛝ.body.balls.count === 1) {
              output += ` filled with only one lonely ${aw.parse(npcid, "ballsize.q")} testicle. `;
            } else { // poor guy
              output += " empty. ";
            }
          }
          if (ᛝ.main.female) {
            output += `Her ${(ᛝ.body.pussy.virgin) ? "virgin" : ""} pussy is ${aw.parse(npcid, "pussy.q")} with the ${aw.parse(npcid, "clit.q")} clit and ${aw.parse(npcid, "labia.q")} labia. `;
          }
          output += "Asshole can be described as ";
          output += (ᛝ.body.asshole.virgin) ? `virgin and ${aw.parse(npcid, "anus.q")}.<br>` : `not virgin and ${aw.parse(npcid, "anus.q")}.<br>`;
        } else {
          output += `<b>Junk information:</b>${redact}<br>`;
        }
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (body). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuBody", output);
      setTimeout(() => mutate(), 25);
    }
    function mutate() {
      // subfunction to print mutate NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Mutation Information</div>`;
      try {
        let mutationsu = "";
        output += `<div class="npcMenuGrid" style="grid-column: 2 / 7; grid-row: 4 / span 2;">`;
        if (ᚥ.mutate || aw.chad.psychic) {
          for (const item in ᛝ.mutate) {
            if (ᛝ.mutate[item] === true) {
              switch (item) {
                case "smooth":
                  mutationsu += "Smooth Voice";
                  break;
                case "lilithCurse":
                  mutationsu += "Lilith's Curse";
                  break;
                case "noRefract":
                  mutationsu += "No refractory period";
                  break;
                case "megaNuts":
                  mutationsu += "Mega-Nuts";
                  break;
                case "killerSperm":
                  mutationsu += "Killer Sperm";
                  break;
                case "bitchBreaker":
                  mutationsu += "Bitch breaker";
                  break;
                case "megaLong":
                  mutationsu += "Mega long";
                  break;
                case "iron":
                  mutationsu += "Iron Muscles";
                  break;
                case "virile":
                  mutationsu += "Virile";
                  break;
                case "acidPre":
                  mutationsu += "Acid precum";
                  break;
                case "contort":
                  mutationsu += "Contortionist";
                  break;
                case "cumpire":
                  mutationsu += "Lilith's Porphyria";
                  break;
                case "powerEjac":
                  mutationsu += "Power Ejaculation";
                  break;
                case "multgasm":
                  mutationsu += "Multigasm";
                  break;
                case "immune":
                  mutationsu += "Ethanol Immunity";
                  break;
                case "milk":
                  mutationsu += "Lactation";
                  break;
                case "acid":
                  mutationsu += "Vaginal Enzymes";
                  break;
                case "birthCon":
                  mutationsu += "Abnormal Hormone";
                  break;
                case "multiple":
                  mutationsu += "Multiple Ovulation";
                  break;
                case "gestate":
                  mutationsu += "Rapid Gestation";
                  break;
                case "cycle":
                  mutationsu += "Hyper Menstrual Cycle";
                  break;
                case "twinWomb":
                  mutationsu += "Twin Wombs";
                  break;
                case "pheromone":
                  mutationsu += "Vulva Pheromones";
                  break;
                case "period":
                  mutationsu += "Amenorrhea Mutation";
                  break;
                case "mouth":
                  mutationsu += "Salivary Enzymes";
                  break;
                case "pseudoPreg":
                  mutationsu += "Pseudo-Pregnancy";
                  break;
                case "elastic":
                  mutationsu += "Elastic Orifices";
                  break;
                case "litePhero":
                  mutationsu += "Alluring Pheromones";
                  break;
                case "goddess":
                  mutationsu += "Fertility Goddess";
                  break;
                case "fertStorm":
                  mutationsu += "Fertility Storm";
                  break;
              }
              mutationsu += ", ";
            }
          }
          mutationsu = mutationsu.slice(0, -2) + ".";
        } else {
          mutationsu = redact;
        }
        // add items to output, using above variables
        output += `<b>Mutations:</b> ${mutationsu}`;
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (mutate). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuMutate", output);
      setTimeout(() => fert(), 25);
    }
    function fert() {
      // subfunction to print fertility NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Fertility Information</div>`;
      try {
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
        if ((ᚥ.fert === 0 || ᚥ.fert === 1) && !aw.chad.psychic) {
          output += `<b>Fertility:</b> ${redact}`;
        } else if (ᚥ.fert === 2 && !aw.chad.psychic) {
          const fertCaption = ["seems not very", "seems not very", "seems not very", "seems fertile", "seems fertile", "seems fertile", "seems fertile", "seems fertile", "seems fertile"];
          output += `<b>Fertility:</b> ${fertCaption[ᛝ.fert.fertility]}.`;
        } else if (ᚥ.fert > 2 || aw.chad.psychic) {
          let fertCaption = [] as string[];
          if (ᛝ.main.female) {
          fertCaption = ["iud-protected", "barren", "barely fertile", "fertile", "very fertile", "super fertile", "extremely fertile", "insanely fertile", "fertility goddess"];
          } else {
          fertCaption = ["VasGel-protected", "barren", "barely fertile", "fertile", "very fertile", "super fertile", "extremely fertile", "insanely fertile", "fertility god"];
          }
          output += `<b>Fertility:</b> ${fertCaption[ᛝ.fert.fertility]}.`;
        }
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (fert). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuFert", output);
      setTimeout(() => status(), 25);
    }
    function status() {
      // subfunction to print status NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Status Information</div>`;
      try {
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">`;
        if (ᚥ.status === 0 && !aw.chad.psychic) {
          output += `<b>Status:</b> ${redact}`;
        } else if (ᚥ.status === 1) {
          output += "<b>General condition:</b> ";
          output += (ᛝ.status.sleep) ? "Is sleeping. " : "Awake. ";
          output += (ᛝ.status.clean) ? "Appears clean. " : "Appears dirty. ";
          output += (ᛝ.status.injury[0] === "0") ? "There are noticeable injuries. " : "";
          output += (ᛝ.status.injury[0] === "0") ? "There are noticeable signs of disease. " : "";
          output += (ᛝ.status.overAnger) ? "Looks very angry. " : "";
          output += (ᛝ.status.overStress) ? "Looks in stress. " : "";
          output += (ᛝ.status.overDepress) ? "Looks depressed. " : "";
          output += "<br><b>Health:</b> ";
          output += (ᛝ.status.health > 70) ? "healthy." : (ᛝ.status.health > 30) ? "not very healthy." : "really not healthy.";
          output += "<br><b>Fatigue:</b> ";
          output += (ᛝ.status.fatigue > 70) ? "very tired." : (ᛝ.status.fatigue > 30) ? "tired." : "alert.";
          output += "<br><b>Alcohol:</b> ";
          if (ᛝ.status.alcohol > 7) {
            output += "very drunk.";
          } else if (ᛝ.status.alcohol > 2) {
            output += "drunk.";
          } else {
            output += "sober.";
          }
          if (ᛝ.status.wombA.preg || ᛝ.status.wombB.preg) {
            if (ᛝ.status.wombA.weeks > 5 || ᛝ.status.wombB.weeks > 5) {
              output += "<br><b>Pregnancy:</b> looks pregnant.";
            }
          }
          output += `<br><b>Birth Control:</b> ${redact}`;
        } else if (ᚥ.status === 2) {
          output += "<b>General condition:</b> ";
          output += (ᛝ.status.sleep) ? "Is sleeping. " : "Awake. ";
          output += (ᛝ.status.clean) ? "Appears clean. " : "Appears dirty. ";
          output += (ᛝ.status.injury[0] === "0") ? "There are noticeable injuries. " : "";
          output += (ᛝ.status.injury[0] === "0") ? "There are noticeable signs of disease. " : "";
          output += (ᛝ.status.overAnger) ? "Looks very angry. " : "";
          output += (ᛝ.status.overStress) ? "Looks in stress. " : "";
          output += (ᛝ.status.overDepress) ? "Looks depressed. " : "";
          output += "<br><b>Health:</b> ";
          output += (ᛝ.status.health > 70) ? "healthy." : (ᛝ.status.health > 30) ? "not very healthy." : "really not healthy.";
          output += "<br><b>Fatigue:</b> ";
          output += (ᛝ.status.fatigue > 70) ? "very tired." : (ᛝ.status.fatigue > 30) ? "tired." : "alert.";
          output += "<br><b>Arousal:</b> ";
          output += (ᛝ.status.arousal > 7) ? "extremely aroused." : (ᛝ.status.arousal > 3) ? "aroused." : "nope.";
          output += "<br><b>Alcohol:</b> ";
          if (ᛝ.status.alcohol > 7) { output += "very drunk." } else if (ᛝ.status.alcohol > 2) { output += "drunk." } else { output +=  "sober." }
          // output += (ᛝ.status.alcohol > 7) ? "very drunk." : (ᛝ.status.health > 2) ? "drunk." : "sober.";
          if (ᛝ.status.wombA.preg || ᛝ.status.wombB.preg) {
            if (ᛝ.status.wombA.weeks > 5 || ᛝ.status.wombB.weeks > 5) {
              output += "<br><b>Pregnancy:</b> looks pregnant.";
            }
          }
          output += `<br><b>Birth Control:</b> ${redact}`;
        } else if (ᚥ.status > 2 || aw.chad.psychic) {
          output += "<b>General condition:</b> ";
          output += (ᛝ.status.sleep) ? "Is sleeping. " : "Awake. ";
          output += (ᛝ.status.clean) ? "Appears clean. " : "Appears dirty. ";
          output += (ᛝ.status.injury[0] === "0") ? "There are noticeable injuries. " : "";
          output += (ᛝ.status.injury[0] === "0") ? "There are noticeable signs of disease. " : "";
          output += (ᛝ.status.overAnger) ? "Looks very angry. " : "";
          output += (ᛝ.status.overStress) ? "Looks in stress. " : "";
          output += (ᛝ.status.overDepress) ? "Looks depressed. " : "";
          output += "<br><b>Health:</b> ";
          output += (ᛝ.status.health > 70) ? "healthy." : (ᛝ.status.health > 30) ? "not very healthy." : "really not healthy.";
          output += "<br><b>Fatigue:</b> ";
          output += (ᛝ.status.fatigue > 70) ? "very tired." : (ᛝ.status.fatigue > 30) ? "tired." : "alert.";
          output += "<br><b>Arousal:</b> ";
          output += (ᛝ.status.arousal > 7) ? "extremely aroused." : (ᛝ.status.arousal > 3) ? "aroused." : "nope.";
          output += "<br><b>Alcohol:</b> ";
          if (ᛝ.status.alcohol > 7) { output += "very drunk." } else if (ᛝ.status.alcohol > 2) { output += "drunk." } else { output +=  "sober." }
          // output += (ᛝ.status.alcohol > 7) ? "very drunk." : (ᛝ.status.alcohol > 2) ? "drunk." : "sober.";
          if (ᛝ.status.wombA.preg || ᛝ.status.wombB.preg) {
            if (ᛝ.status.wombA.weeks > 5 || ᛝ.status.wombB.weeks > 5) {
              output += "<br><b>Pregnancy:</b> looks pregnant.";
            }
          }
          output += "<br><b>Birth Control:</b> ";
          output += (ᛝ.status.birthCon.diaphragm.type !== "none") ? "diaphragm. " : "";
          output += (ᛝ.status.birthCon.femaleCondom.type !== "none") ? "female condom. " : "";
          output += (ᛝ.status.birthCon.menstrualCup.type !== "none") ? "menstrual cup. " : "";
          output += (ᛝ.status.birthCon.sponge.type !== "none") ? "sponge. " : "";
          output += (ᛝ.status.birthCon.condom.type !== "none") ? "condom. " : "";
          output += (ᛝ.status.birthCon.headCap.type !== "none") ? "head cap. " : "";
          output += (ᛝ.status.birthCon.hormoneType !== "none") ? "hormonal. " : "";
         }
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (status). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuStatus", output);
      setTimeout(() => sched(), 25);
    }
    function sched() {
      // subfunction to print schedule NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Schedule Information</div>`;
      try {
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
        const cock1 = (ᚥ.sched) ? ᛝ.sched.workLoc : redact;
        output += `<b>Work place:</b>${cock1}<br></div><div class="npcMenuGrid" style="grid-column: 2 / 7; grid-row: 5 / span 3;">`;
        if (ᚥ.sched || aw.chad.psychic) {
          const futa = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          ᛝ.sched.workdays.forEach(function(item, i) {
            const tempPiss = futa[i];
            if (item) {
              output += `<span style ='width: 100px; height: 50px; padding: 10px; border-radius: 10px; border: 2px solid #ffb642; margin-right: 5px; background-color: rgba(6, 6, 6, 0.5);'><b>${tempPiss}</b>${ᛝ.sched.workhours[0]}-${ᛝ.sched.workhours[1]}</span>`;
            } else {
              output += `<span style ='width: 100px; height: 50px; padding: 10px; border-radius: 10px; border: 2px solid #ffb642; margin-right: 5px; background-color: rgba(142, 142, 142, 0.5);'><b>${tempPiss}</b>Day off</span>`;
            }
          });
        } else {
          output += "<b>Schedule:</b> " + redact;
        }
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (sched). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuSched", output);
      setTimeout(() => trait(), 25);
    }
    function trait() {
      // subfunction to print trait NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Basic Personality Information</div>`;
      try {
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
        output += `<r>Not Yet Implemented</r>`;
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (trait). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuTrait", output);
      setTimeout(() => kink(), 25);
    }
    function kink() {
      // subfunction to print kink NPC details - calls next in line.
      let output = "";
      let kinksu: string = "";
      const fem = ᛝ.main.female;
      output += `<div class="npcSectionTitle npcMenuGrid">Kink Information</div>`;
      try {
        output += `<div class="npcMenuGrid" style="grid-column: 2 / 7; grid-row: 4 / span 1;">`;
        let kinkShown = clone(ᚥ.kink);
        if (aw.chad.psychic) {
          kinkShown = 3;
        }
        switch (kinkShown) {
          case 3:
            for (const item in ᛝ.kink) {
              if (ᛝ.kink[item] === true) {
                switch (item) {
                  case "risky":
                    kinksu += "Risky Sex";
                    break;
                  case "pregnancy":
                    kinksu += (fem) ? "Pregnancy Fetish" : "Impregnation";
                    break;
                  case "sizequeen":
                    kinksu += (fem) ? "Size Queen" : "Gaping";
                    break;
                  case "cumSlut":
                    kinksu += (fem) ? "Cumslut" : "Loves Oral";
                    break;
                  case "sub":
                    kinksu += "Submissive";
                    break;
                  case "exhibition":
                    kinksu += (fem) ? "Exhibitionist" : "Voyeur";
                    break;
                  case "masochist":
                    kinksu += (fem) ? "Masochist" : "Masochist";
                    break;
                  case "buttSlut":
                    kinksu += (fem) ? "Buttslut" : "Loves Anal";
                    break;
                  case "publix":
                    kinksu += "Public Sex";
                    break;
                  case "slut":
                    kinksu += (fem) ? "Slut" : "Besty Error";
                    break;
                  case "superSlut":
                    kinksu += (fem) ? "Super slut" : "Besty Error";
                    break;
                  case "hyperSlut":
                    kinksu += (fem) ? "Hyper slut" : "Besty Error";
                    break;
                  case "oral":
                    kinksu += "Giving Oral";
                    break;
                  case "anal":
                    kinksu += "Anal Sex";
                    break;
                  case "rape":
                    kinksu += (fem) ? "Rape Fetish" : "Rape";
                    break;
                  case "force":
                    kinksu += "Non-Consent";
                    break;
                  case "liberate":
                    kinksu += "Liberated Sexuality";
                    break;
                  case "easy":
                    kinksu += (fem) ? "Easy to please" : "Quick Shot";
                    break;
                  case "nips":
                    kinksu += (fem) ? "Sensitive Nipples" : "Sensitive Balls";
                    break;
                  case "dom":
                    kinksu += "Dominant";
                    break;
                  case "water":
                    kinksu += "Watersports";
                    break;
                  case "bond":
                    kinksu += "Bondage";
                    break;
                  case "hard":
                    kinksu += (fem) ? "Hard to please" : "Long-Lasting";
                    break;
                  case "fap":
                    kinksu += "Masturbation";
                    break;
                  case "shame":
                    kinksu += "Shamefast";
                    break;
                }
                kinksu += ", ";
              }
            }
            break;
          case 2:
            for (const item in ᛝ.kink) {
              if (ᛝ.kink[item] === true) {
                switch (item) {
                  case "risky":
                    kinksu += "Risky Sex";
                    break;
                  case "cumSlut":
                    kinksu += (fem) ? "Cumslut" : "Loves Oral";
                    break;
                  case "sub":
                    kinksu += "Submissive";
                    break;
                  case "exhibition":
                    kinksu += (fem) ? "Exhibitionist" : "Voyeur";
                    break;
                  case "buttSlut":
                    kinksu += (fem) ? "Buttslut" : "Loves Anal";
                    break;
                  case "slut":
                    kinksu += (fem) ? "Slut" : "Besty Error";
                    break;
                  case "superSlut":
                    kinksu += (fem) ? "Super slut" : "Besty Error";
                    break;
                  case "oral":
                    kinksu += "Giving Oral";
                    break;
                  case "anal":
                    kinksu += "Anal Sex";
                    break;
                  case "force":
                    kinksu += "Non-Consent";
                    break;
                  case "liberate":
                    kinksu += "Liberated Sexuality";
                    break;
                  case "easy":
                    kinksu += (fem) ? "Easy to please" : "Quick Shot";
                    break;
                  case "nips":
                    kinksu += (fem) ? "Sensitive Nipples" : "Sensitive Balls";
                    break;
                  case "dom":
                    kinksu += "Dominant";
                    break;
                  case "bond":
                    kinksu += "Bondage";
                    break;
                  case "hard":
                    kinksu += (fem) ? "Hard to please" : "Long-Lasting";
                    break;
                  case "fap":
                    kinksu += "Masturbation";
                    break;
                  case "shame":
                    kinksu += "Shamefast";
                    break;
                }
                kinksu += ", ";
              }
            }
            break;
          case 1:
            for (const item in ᛝ.kink) {
              if (ᛝ.kink[item] === true) {
                switch (item) {
                  case "slut":
                    kinksu += (fem) ? "Slut" : "Besty Error";
                    break;
                  case "oral":
                    kinksu += "Giving Oral";
                    break;
                  case "anal":
                    kinksu += "Anal Sex";
                    break;
                  case "liberate":
                    kinksu += "Liberated Sexuality";
                    break;
                  case "bond":
                    kinksu += "Bondage";
                    break;
                  case "shame":
                    kinksu += "Shamefast";
                    break;
                }
                kinksu += ", ";
              }
            }
            break;
          default:
            kinksu = redact + "..";
            break;
        }
        kinksu = kinksu.slice(0, -2) + ".";
        // add items to output, using above variables
        output += `<b>Kinks:</b> ${kinksu}`;
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (kink). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuKink", output);
      setTimeout(() => core(), 25);
    }
    function core() {
      // subfunction to print core NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Detailed Personality Information</div>`;
      try { /* SOME UNFINISHED BITS FOR CORE DISPLAY
        if (ᚥ.core === 0) {
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
          output += redact;
          output += "</div>";
        } else if (ᚥ.core === 1) {
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
          output += "</div>";
        } else if (ᚥ.core === 2) {
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 3; grid-row: 4 / span 1;">`;
          output += "<b>Procreate</b><br>";
          output += `Secure: ${ᛝ.core.procreate.secure}<br>`;
          output += `Pregnancy: ${ᛝ.core.procreate.preg}<br>`;
          output += `Kids: ${ᛝ.core.procreate.kids}<br>`;
          output += `Evolve: ${ᛝ.core.procreate.evolve}<br>`;
          output += `Pleasure: ${ᛝ.core.procreate.pleasure}<br>`;
          output += "<b>Morality</b><br>";
          output += `Life: ${ᛝ.core.morality.life}<br>`;
          output += `Liberty: ${ᛝ.core.morality.liberty}<br>`;
          output += `Property: ${ᛝ.core.morality.property}<br>`;
          output += `Honesty: ${ᛝ.core.morality.honesty}<br>`;
          output += `Integrity: ${ᛝ.core.morality.integrity}<br>`;
          output += "</div>";
        } else if (ᚥ.core === 3) {
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
          output += "</div>";
        } */
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
        output += `<r>Not Yet Implemented</r>`;
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (core). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuCore", output);
      setTimeout(() => pref(), 25);
    }
    function pref() {
      // subfunction to print preference NPC details - calls next in line.
      let output = "";
      function attitudeReplacer(e, tier) {
        if (tier === 1) {
          switch (e) {
            case -2:
              return "<span class='peepbad'>seems to dislike</span>";
              break;
            case -1:
              return "<span class='peepbad'>seems to dislike</span>";
              break;
            case 0:
              return "neutral";
              break;
            case 1:
              return "<span class='peepgood'>seems to like</span>";
              break;
            case 2:
              return "<span class='peepgood'>seems to like</span>";
              break;
            default:
              return "Error in NPC display";
              break;
          }
        } else if (tier > 1) {
          switch (e) {
            case -2:
              return "<span class='peepbad'>hate</span>";
              break;
            case -1:
              return "<span class='peepbad'>dislike</span>";
              break;
            case 0:
              return "neutral";
              break;
            case 1:
              return "<span class='peepgood'>like</span>";
              break;
            case 2:
              return "<span class='peepgood'>love</span>";
              break;
            default:
              return "Error in NPC display";
              break;
          }
        } else {
          return "Besty Error, wrong tier value";
        }
      }
      output += `<div class="npcSectionTitle npcMenuGrid">Preferences Information</div>`;
      try {
        if (ᚥ.pref === 0 && !aw.chad.psychic) {
          output += redact;
        } else if (ᚥ.pref === 1 && !aw.chad.psychic) {
          const Wlabels = ["Prefers anorexic", "Prefers skinny", "Prefers normal", "Prefers plush", "Prefers chubby", "Prefers fat"];
          const Hlabels = ["Prefers very short", "Prefers short", "Prefers average", "Prefers tall", "Prefers very tall"];
          const Mlabels = ["Prefers frail", "Prefers weak", "Prefers toned", "Prefers muscular", "Prefers body builder"];
          function bestOfPrefs(array, labels) { // returns first found "love" prefs, if no returns first "like", else returns "no strong prefs"
            const firstLove = array.indexOf(2);
            const firstLike = array.indexOf(1);
            let output = "";
            output = (firstLove > -1) ? labels[firstLove] : (firstLike > -1) ? labels[firstLike] : "No strong preferences";
            return output;
          }
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 3; grid-row: 4 / span 3;">`;
          output += `<b>Female weight preferences:</b> ${bestOfPrefs(ᛝ.pref.Fweight, Wlabels)}<br>`;
          output += `<b>Male weight preferences:</b> ${bestOfPrefs(ᛝ.pref.Mweight, Wlabels)}<br>`;
          output += `<b>Female height preferences:</b> ${bestOfPrefs(ᛝ.pref.Fheight, Hlabels)}<br>`;
          output += `<b>Male height preferences:</b> ${bestOfPrefs(ᛝ.pref.Mheight, Hlabels)}<br>`;
          output += `<b>Female muscle preferences:</b> ${bestOfPrefs(ᛝ.pref.Fmuscle, Mlabels)}<br>`;
          output += `<b>Male muscle preferences:</b> ${bestOfPrefs(ᛝ.pref.Mmuscle, Mlabels)}<br>`;
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 5 / span 3; grid-row: 6 / span 3;">`;
          output += `<b>Other female preferences:</b>${redact}<br>`;
          output += `<b>Other male preferences:</b>${redact}`;
          output += "</div>";
        } else if (ᚥ.pref === 2 && !aw.chad.psychic) { // ALL HAIL THE GREAT OUTPUT OF BESTY!!!
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Female weight preferences:</b><br>";
          output += "Anorexic: " + attitudeReplacer (ᛝ.pref.Fweight[0], 1) + "<br>";
          output += "Skinny: " + attitudeReplacer (ᛝ.pref.Fweight[1], 1) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Fweight[2], 1) + "<br>";
          output += "Plush: " + attitudeReplacer (ᛝ.pref.Fweight[3], 1) + "<br>";
          output += "Chubby: " + attitudeReplacer (ᛝ.pref.Fweight[4], 1) + "<br>";
          output += "Fat: " + attitudeReplacer (ᛝ.pref.Fweight[5], 1);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 6 / span 1;">`;
          output += "<b>Male weight preferences:</b><br>";
          output += "Anorexic: " + attitudeReplacer (ᛝ.pref.Mweight[0], 1) + "<br>";
          output += "Skinny: " + attitudeReplacer (ᛝ.pref.Mweight[1], 1) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Mweight[2], 1) + "<br>";
          output += "Plush: " + attitudeReplacer (ᛝ.pref.Mweight[3], 1) + "<br>";
          output += "Chubby: " + attitudeReplacer (ᛝ.pref.Mweight[4], 1) + "<br>";
          output += "Fat: " + attitudeReplacer (ᛝ.pref.Mweight[5], 1);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Female height preferences:</b><br>";
          output += "Very Short: " + attitudeReplacer (ᛝ.pref.Fheight[0], 1) + "<br>";
          output += "Short: " + attitudeReplacer (ᛝ.pref.Fheight[1], 1) + "<br>";
          output += "Average: " + attitudeReplacer (ᛝ.pref.Fheight[2], 1) + "<br>";
          output += "Tall: " + attitudeReplacer (ᛝ.pref.Fheight[3], 1) + "<br>";
          output += "Very Tall: " + attitudeReplacer (ᛝ.pref.Fheight[4], 1) + "<br>&nbsp;";
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 6 / span 1;">`;
          output += "<b>Male height preferences:</b><br>";
          output += "Very Short: " + attitudeReplacer (ᛝ.pref.Mheight[0], 1) + "<br>";
          output += "Short: " + attitudeReplacer (ᛝ.pref.Mheight[1], 1) + "<br>";
          output += "Average: " + attitudeReplacer (ᛝ.pref.Mheight[2], 1) + "<br>";
          output += "Tall: " + attitudeReplacer (ᛝ.pref.Mheight[3], 1) + "<br>";
          output += "Very Tall: " + attitudeReplacer (ᛝ.pref.Mheight[4], 1) + "<br>&nbsp;";
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 6 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Female muscle preferences:</b><br>";
          output += "Frail: " + attitudeReplacer (ᛝ.pref.Fmuscle[0], 1) + "<br>";
          output += "Weak: " + attitudeReplacer (ᛝ.pref.Fmuscle[1], 1) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Fmuscle[2], 1) + "<br>";
          output += "Toned: " + attitudeReplacer (ᛝ.pref.Fmuscle[3], 1) + "<br>";
          output += "Muscular: " + attitudeReplacer (ᛝ.pref.Fmuscle[4], 1) + "<br>";
          output += "Body Builder:" + attitudeReplacer (ᛝ.pref.Fmuscle[5], 1);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 6 / span 1; grid-row: 6 / span 1;">`;
          output += "<b>Male muscle preferences:</b><br>";
          output += "Frail: " + attitudeReplacer (ᛝ.pref.Mmuscle[0], 1) + "<br>";
          output += "Weak: " + attitudeReplacer (ᛝ.pref.Mmuscle[1], 1) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Mmuscle[2], 1) + "<br>";
          output += "Toned: " + attitudeReplacer (ᛝ.pref.Mmuscle[3], 1) + "<br>";
          output += "Muscular: " + attitudeReplacer (ᛝ.pref.Mmuscle[4], 1) + "<br>";
          output += "Body Builder:" + attitudeReplacer (ᛝ.pref.Mmuscle[5], 1);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 8 / span 1;">`;
          output += "<b>Other female preferences:</b><br>";
          output += "Large Breasts:" +  attitudeReplacer (ᛝ.pref.Fother[0], 1) + "<br>";
          output += "Small Breasts:" +  attitudeReplacer (ᛝ.pref.Fother[1], 1) + "<br>";
          output += "Large Hips:" +  attitudeReplacer (ᛝ.pref.Fother[2], 1) + "<br>";
          output += "Small Hips:" +  attitudeReplacer (ᛝ.pref.Fother[3], 1) + "<br>";
          output += "Smart:" +  attitudeReplacer (ᛝ.pref.Fother[4], 1) + "<br>";
          output += "Dumb:" +  attitudeReplacer (ᛝ.pref.Fother[5], 1) + "<br>";
          output += "Glasses:" +  attitudeReplacer (ᛝ.pref.Fother[6], 1) + "<br>";
          output += "Stylish:" +  attitudeReplacer (ᛝ.pref.Fother[7], 1) + "<br>";
          output += "Makeup:" +  attitudeReplacer (ᛝ.pref.Fother[8], 2) + "<br>";
          output += "Large Butt:" +  attitudeReplacer (ᛝ.pref.Fother[9], 1) + "<br>";
          output += "Small Butt:" +  attitudeReplacer (ᛝ.pref.Fother[9], 1); // NPC HAD NOT ENOUGH PARAMETERS!!! AARGH!!
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 8 / span 1;">`;
          output += "<b>Other male preferences:</b><br>";
          output += "Bald:" +  attitudeReplacer (ᛝ.pref.Mother[0], 1) + "<br>";
          output += "Glasses:" +  attitudeReplacer (ᛝ.pref.Mother[1], 1) + "<br>";
          output += "Facial Hair:" +  attitudeReplacer (ᛝ.pref.Mother[2], 1) + "<br>";
          output += "Smart:" +  attitudeReplacer (ᛝ.pref.Mother[3], 1) + "<br>";
          output += "Dumb:" +  attitudeReplacer (ᛝ.pref.Mother[4], 1) + "<br>";
          output += "Wealthy:" +  attitudeReplacer (ᛝ.pref.Mother[5], 1) + "<br>"; // Girl can't be poor or rich?
          output += "Poor:" +  attitudeReplacer (ᛝ.pref.Mother[6], 1) + "<br>";
          output += "Stylish:" +  attitudeReplacer (ᛝ.pref.Mother[7], 1) + "<br>";
          output += "Large Penis:" +  attitudeReplacer (ᛝ.pref.Mother[8], 1) + "<br>";
          output += "Small Penis:" +  attitudeReplacer (ᛝ.pref.Mother[8], 1) + "<br>&nbsp;"; // NPC HAD NOT ENOUGH PARAMETERS!!! AARGH!!
          output += "</div>";
        } else if (ᚥ.pref === 3 || aw.chad.psychic) {
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Female weight preferences:</b><br>";
          output += "Anorexic: " + attitudeReplacer (ᛝ.pref.Fweight[0], 2) + "<br>";
          output += "Skinny: " + attitudeReplacer (ᛝ.pref.Fweight[1], 2) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Fweight[2], 2) + "<br>";
          output += "Plush: " + attitudeReplacer (ᛝ.pref.Fweight[3], 2) + "<br>";
          output += "Chubby: " + attitudeReplacer (ᛝ.pref.Fweight[4], 2) + "<br>";
          output += "Fat: " + attitudeReplacer (ᛝ.pref.Fweight[5], 2);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 6 / span 1;">`;
          output += "<b>Male weight preferences:</b><br>";
          output += "Anorexic: " + attitudeReplacer (ᛝ.pref.Mweight[0], 2) + "<br>";
          output += "Skinny: " + attitudeReplacer (ᛝ.pref.Mweight[1], 2) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Mweight[2], 2) + "<br>";
          output += "Plush: " + attitudeReplacer (ᛝ.pref.Mweight[3], 2) + "<br>";
          output += "Chubby: " + attitudeReplacer (ᛝ.pref.Mweight[4], 2) + "<br>";
          output += "Fat: " + attitudeReplacer (ᛝ.pref.Mweight[5], 2);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Female height preferences:</b><br>";
          output += "Very Short: " + attitudeReplacer (ᛝ.pref.Fheight[0], 2) + "<br>";
          output += "Short: " + attitudeReplacer (ᛝ.pref.Fheight[1], 2) + "<br>";
          output += "Average: " + attitudeReplacer (ᛝ.pref.Fheight[2], 2) + "<br>";
          output += "Tall: " + attitudeReplacer (ᛝ.pref.Fheight[3], 2) + "<br>";
          output += "Very Tall: " + attitudeReplacer (ᛝ.pref.Fheight[4], 2) + "<br>&nbsp;";
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 6 / span 1;">`;
          output += "<b>Male height preferences:</b><br>";
          output += "Very Short: " + attitudeReplacer (ᛝ.pref.Mheight[0], 2) + "<br>";
          output += "Short: " + attitudeReplacer (ᛝ.pref.Mheight[1], 2) + "<br>";
          output += "Average: " + attitudeReplacer (ᛝ.pref.Mheight[2], 2) + "<br>";
          output += "Tall: " + attitudeReplacer (ᛝ.pref.Mheight[3], 2) + "<br>";
          output += "Very Tall: " + attitudeReplacer (ᛝ.pref.Mheight[4], 2) + "<br>&nbsp;";
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 6 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Female muscle preferences:</b><br>";
          output += "Frail: " + attitudeReplacer (ᛝ.pref.Fmuscle[0], 2) + "<br>";
          output += "Weak: " + attitudeReplacer (ᛝ.pref.Fmuscle[1], 2) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Fmuscle[2], 2) + "<br>";
          output += "Toned: " + attitudeReplacer (ᛝ.pref.Fmuscle[3], 2) + "<br>";
          output += "Muscular: " + attitudeReplacer (ᛝ.pref.Fmuscle[4], 2) + "<br>";
          output += "Body Builder:" + attitudeReplacer (ᛝ.pref.Fmuscle[5], 2);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 6 / span 1; grid-row: 6 / span 1;">`;
          output += "<b>Male muscle preferences:</b><br>";
          output += "Frail: " + attitudeReplacer (ᛝ.pref.Mmuscle[0], 2) + "<br>";
          output += "Weak: " + attitudeReplacer (ᛝ.pref.Mmuscle[1], 2) + "<br>";
          output += "Normal: " + attitudeReplacer (ᛝ.pref.Mmuscle[2], 2) + "<br>";
          output += "Toned: " + attitudeReplacer (ᛝ.pref.Mmuscle[3], 2) + "<br>";
          output += "Muscular: " + attitudeReplacer (ᛝ.pref.Mmuscle[4], 2) + "<br>";
          output += "Body Builder:" + attitudeReplacer (ᛝ.pref.Mmuscle[5], 2);
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 8 / span 1;">`;
          output += "<b>Other female preferences:</b><br>";
          output += "Large Breasts:" +  attitudeReplacer (ᛝ.pref.Fother[0], 2) + "<br>";
          output += "Small Breasts:" +  attitudeReplacer (ᛝ.pref.Fother[1], 2) + "<br>";
          output += "Large Hips:" +  attitudeReplacer (ᛝ.pref.Fother[2], 2) + "<br>";
          output += "Small Hips:" +  attitudeReplacer (ᛝ.pref.Fother[3], 2) + "<br>";
          output += "Smart:" +  attitudeReplacer (ᛝ.pref.Fother[4], 2) + "<br>";
          output += "Dumb:" +  attitudeReplacer (ᛝ.pref.Fother[5], 2) + "<br>";
          output += "Glasses:" +  attitudeReplacer (ᛝ.pref.Fother[6], 2) + "<br>";
          output += "Stylish:" +  attitudeReplacer (ᛝ.pref.Fother[7], 2) + "<br>";
          output += "Makeup:" +  attitudeReplacer (ᛝ.pref.Fother[8], 2) + "<br>";
          output += "Large Butt:" +  attitudeReplacer (ᛝ.pref.Fother[9], 2) + "<br>";
          output += "Small Butt:" +  attitudeReplacer (ᛝ.pref.Fother[9], 2); // NPC HAD NOT ENOUGH PARAMETERS!!! AARGH!!
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 8 / span 1;">`;
          output += "<b>Other male preferences:</b><br>";
          output += "Bald:" +  attitudeReplacer (ᛝ.pref.Mother[0], 2) + "<br>";
          output += "Glasses:" +  attitudeReplacer (ᛝ.pref.Mother[1], 2) + "<br>";
          output += "Facial Hair:" +  attitudeReplacer (ᛝ.pref.Mother[2], 2) + "<br>";
          output += "Smart:" +  attitudeReplacer (ᛝ.pref.Mother[3], 2) + "<br>";
          output += "Dumb:" +  attitudeReplacer (ᛝ.pref.Mother[4], 2) + "<br>";
          output += "Wealthy:" +  attitudeReplacer (ᛝ.pref.Mother[5], 2) + "<br>"; // Girl can't be poor or rich?
          output += "Poor:" +  attitudeReplacer (ᛝ.pref.Mother[6], 2) + "<br>";
          output += "Stylish:" +  attitudeReplacer (ᛝ.pref.Mother[7], 2) + "<br>";
          output += "Large Penis:" +  attitudeReplacer (ᛝ.pref.Mother[8], 2) + "<br>";
          output += "Small Penis:" +  attitudeReplacer (ᛝ.pref.Mother[8], 2) + "<br>&nbsp;"; // NPC HAD NOT ENOUGH PARAMETERS!!! AARGH!!
          output += "</div>";
        }
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (pref). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuPref", output);
      setTimeout(() => bGround(), 25);
    }
    function bGround() {
      // subfunction to print background NPC details - calls next in line.
      let output = "";
      output += `<div class="npcSectionTitle npcMenuGrid">Background Information</div>`;
      try {
        if (ᚥ.bGround === 0 && !aw.chad.psychic) {
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 1; grid-row: 4 / span 1;">`;
          output += `<b>Background information:</b> ${redact}`;
          output += "</div>";
        } else if (ᚥ.bGround === 1 && !aw.chad.psychic) {
          const cockWealth = ["Seems poor", "Seems poor", "middle", "Seems rich", "Seems rich"];
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 2; grid-row: 4 / span 4;">`;
          output += `<b>Wealth:</b> ${cockWealth[ᛝ.background.wealth]}<br>`;
          output += `<b>Cash:</b> ${redact}<br>`;
          output += `<b>Bank savings:</b> ${redact}<br>`;
          output += `<b>Debt:</b> ${redact}<br>`;
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 4 / span 1;">`;
          output += `<b>Relatives:</b> ${redact}`;
          output += `<br><b>Relations:</b> ${redact}`;
          output += "</div>";
        } else if (ᚥ.bGround === 2 && !aw.chad.psychic) {
          const cockWealth = ["Seems poor", "Seems poor", "middle", "Seems rich", "Seems rich"];
          const happyFamily = [] as string[];
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 2; grid-row: 4 / span 4;">`;
          output += `<b>Wealth:</b> ${cockWealth[ᛝ.background.wealth]}<br>`;
          output += `<b>Cash:</b> ${redact}<br>`;
          output += `<b>Bank savings:</b> ${redact}<br>`;
          output += `<b>Debt:</b> ${redact}<br>`;
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Relatives:</b> ";
          (ᛝ.background.dadDead) ? "" : happyFamily.push("Father");
          (ᛝ.background.momDead) ? "" : happyFamily.push("Mother");
          (ᛝ.background.sister) ? happyFamily.push("Sister") : "";
          (ᛝ.background.sisterYounger) ? happyFamily.push("Younger sister") : "";
          (ᛝ.background.brother) ? happyFamily.push("Brother") : "";
          (ᛝ.background.brotherYounger) ? happyFamily.push("Younger brother") : "";
          (ᛝ.background.married) ? happyFamily.push("Spouse") : "";
          (ᛝ.background.exSpouse) ? happyFamily.push("Ex spouse") : "";
          output += `${happyFamily}`;
          if (ᛝ.background.rShip) { output += "<br><b>Relations:</b> in relationship" } else { output += "<br><b>Relations:</b> free" }
          // output += (ᛝ.background.rShip) ? "<br><b>Relations:</b> in relationship." : "<br><b>Relations:</b> free";
          output += "</div>";
        } else if (ᚥ.bGround > 2 || aw.chad.psychic) {
          const cockWealth = ["poor", "shoestring", "middle", "well-off", "rich"];
          let happyFamily = [] as string[];
          output += `<div class="npcMenuGrid" style="grid-column: 2 / span 2; grid-row: 4 / span 4;">`;
          output += `<b>Wealth:</b> ${cockWealth[ᛝ.background.wealth]}<br>`;
          output += `<b>Cash:</b>₢ ${ᛝ.background.cash}<br>`;
          output += `<b>Bank savings:</b>₢ ${ᛝ.background.bank}<br>`;
          output += `<b>Debt:</b>₢ ${ᛝ.background.debt}<br>`;
          output += "</div>";
          output += `<div class="npcMenuGrid" style="grid-column: 4 / span 1; grid-row: 4 / span 1;">`;
          output += "<b>Relatives:</b> ";
          (ᛝ.background.dadDead) ? "" : happyFamily.push("Father");
          (ᛝ.background.momDead) ? "" : happyFamily.push("Mother");
          (ᛝ.background.sister) ? happyFamily.push("Sister") : "";
          (ᛝ.background.sisterYounger) ? happyFamily.push("Younger sister") : "";
          (ᛝ.background.brother) ? happyFamily.push("Brother") : "";
          (ᛝ.background.brotherYounger) ? happyFamily.push("Younger brother") : "";
          (ᛝ.background.married) ? happyFamily.push("Spouse") : "";
          (ᛝ.background.exSpouse) ? happyFamily.push("Ex spouse") : "";
          output += `${happyFamily}`;
          if (ᛝ.background.rShip) { output += "<br><b>Relations:</b> in relationship" } else { output += "<br><b>Relations:</b> free" }
          // output += (ᛝ.background.rShip) ? "<br><b>Relations:</b> in relationship" : "<br><b>Relations:</b> free";
          output += (ᛝ.background.affair) ? ", has affair." : ".";
          output += "</div>";
        }
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (bground). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid" style="grid-column: 2 / span 5; grid-row: 4 / span 3;">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuBGround", output);
      setTimeout(() => stories(), 25);
    }
    function stories() {
      // subfunction to print stories NPC told ya
      let output = "";
      const tt = ["childhood", "teenage", "familyGen", "familyPar", "familySib", "familySib", "college", "job", "moving", "marriage"];
      output += `<div class="npcSectionTitle npcMenuGrid">Life stories</div><div class="npcMenuGrid" style="grid-column: 2 / 7; grid-row: 4 / span 3;">`;
      try {
        for (let index = 0; index < aw.npc[npcid].background.stories.length; index++) {
          if (ᛝ.record.info.stories[index]) {
            if (setup.storythread.uniqueStories[npcid] !== null && setup.storythread.uniqueStories[npcid][tt[index]] !== null) {
              output += "<br>" + setup.storythread.uniqueStories[npcid][tt[index]][2] + "<br>";
            } else {
              output += "<br>" + aw.storythreads[tt[index]][aw.npc[npcid].background.stories[index]][2] + "<br>";
            }
          } else {
            output += "<br><br>" + redact + "<br>";
          }
        }
        output += "</div>";
      } catch (e) {
        aw.con.warn(`Error in setup.npcDisplay.detailView (stories). ${e.name}: ${e.message}.`);
        output += `<div class="npcMenuGrid">Apologies, there was an error gathering this information. ${e.name}: ${e.message}.</div>`;
      }
      aw.replace("#npcMenuStories", output);
    }
    setTimeout(() => main(), 50);
  },
  sexView(npcid: string): string {
    const ᛝ = aw.npc[npcid];
    let output = "";
    // rship
    let shippy = "Acquaintance";
    let realShip = false;
    let friendy = true;
    if (ᛝ.rship.married) {
      shippy = "Married";
      realShip = true;
    } else if (ᛝ.rship.engaged) {
      shippy = "Engaged";
      realShip = true;
    } else if (ᛝ.rship.lovers) {
      shippy = "Lovers";
      realShip = true;
    } else if (ᛝ.rship.exclusive) {
      shippy = "Exclusive";
      realShip = true;
    } else if (ᛝ.rship.dating) {
      shippy = "Dating";
    } else if (ᛝ.rship.friend) {
      if (ᛝ.rship.likeNPC >= 80 && ᛝ.rship.likePC >= 80) {
        shippy = "Best Friends";
        realShip = true;
      } else {
        shippy = "Friends";
      }
    } else {
      friendy = false;
    }
    output += `<b>Relationship:</b> ${shippy}<br>`;
    // Alco
    output += `<b>Alcohol:</b> `;
    if (ᛝ.status.alcohol > 7) {
      output += "very drunk.";
    } else if (ᛝ.status.alcohol > 2) {
      output += "drunk.";
    } else {
      output += "sober.";
    }
    output += `<br>`;
    // Stress
    output += "<br><b>Anger:</b>" + (ᛝ.status.overAnger) ? "Looks not angry. " : "Looks angry. ";
    output += "<br><b>Stress:</b>" + (ᛝ.status.overStress) ? "Looks relaxed. " : "Looks stressed. ";
    output += "<br><b>Mood:</b>" + (ᛝ.status.overDepress) ? "Looks okay. " : "Looks depressed. ";
    output += "<br><b>Health:</b> ";
    output += (ᛝ.status.health > 70) ? "healthy." : (ᛝ.status.health > 30) ? "not very healthy." : "really not healthy.";
    // Arousal
    output += "<br><b>Arousal:</b> ";
    output += (ᛝ.status.arousal > 7) ? "extremely aroused." : (ᛝ.status.arousal > 3) ? "aroused." : "vestigial.";
    // Wetness
    output += "<br><b>Wetness:</b> ";
    output += (ᛝ.status.wetness > 7) ? "extremely wet." : (ᛝ.status.wetness > 3) ? "wet." : "dry.";
    // Current action:
    output += `<br><b>Wetness:</b> ${ↂ.sex.pcAct}`;
    return output;
  },
  sexViewTwo(npcid: string): string {
    const ᛝ = aw.npc[npcid];
    let output = "";
    output += "<b>Basic information:</b><br>";
    output += `A ${ᛝ.body.race} person with ${ᛝ.body.skinColor} skin, ${aw.parse(npcid, "tone.q")} ${aw.parse(npcid, "weight.q")} body ${aw.parse(npcid, "height.q")} tall. `;
    output += `Regarding body you notice ${aw.parse(npcid, "shoulder.q")} shoulders, ${aw.parse(npcid, "hip.q")} hips, ${aw.parse(npcid, "waist.q")} waist and a ${aw.parse(npcid, "ass.q")} butt. `;
    output += `Considering ${ᛝ.body.face} face with ${ᛝ.body.eyeColor} eyes, ${ᛝ.body.brow} brows, ${ᛝ.body.nose} nose and ${ᛝ.body.jaw} jaw ${ᛝ.main.name} can be described as ${aw.parse(npcid, "beauty.q")}. `;
    output += (ᛝ.body.ears === "pierced") ? `Both ears are pierced. ` : "";
    const atrList = ["hideous", "unattractive", "unprepossessing", "normal", "nice", "adorable", "splendid"];
    output += `It is safe to say that ${aw.parse(npcid, "pronounhisher.q")} overall attractiveness is ${atrList[Math.floor(aw.npc.n101.status.atr / 2)]}.<br>`;

    if (ᛝ.main.female) {
      output += "<br><b>Tits information:</b><br>";
      output += `She has ${aw.parse(npcid, "breastshape.q")} ${aw.parse(npcid, "breast.q")} tits of ${aw.parse(npcid, "cupsize.q")} size`;
      output += (ᛝ.body.tits.lact.on) ? ` which are lactating. ` : ". ";
      output += `${ᛝ.main.name}'s nipples are ${ᛝ.body.tits.shape} shaped, ${aw.parse(npcid, "niplength.q")} and ${aw.parse(npcid, "nipwidth.q")}. Areolas are ${aw.parse(npcid, "areolapuffy.q")} and ${aw.parse(npcid, "areolasize.q")}.<br>`;
    }
    if (ᛝ.main.male) {
      output += `${ᛝ.main.name}'s cock length is ${aw.parse(npcid, "cock.q")}, girth is ${aw.parse(npcid, "cockgirth.q")} and the head is ${aw.parse(npcid, "cockhead.q")},`;
      output += (ᛝ.body.cock.circum) ? " the cock is circumsized. " : " ";
      output += `${aw.parse(npcid, "pronounhisher.q")} ${aw.parse(npcid, "ballsag.q")} ${aw.parse(npcid, "ballsack.q")} ballsack is`;
      if (ᛝ.body.balls.count === 2) { // typical AW
        output += ` filled with ${aw.parse(npcid, "ballsize.q")} testicles. `;
      } else if (ᛝ.body.balls.count > 2) {
        output += ` filled with ${ᛝ.body.balls.count} ${aw.parse(npcid, "ballsize.q")} testicles. `;
      } else if (ᛝ.body.balls.count === 1) {
        output += ` filled with only one lonely ${aw.parse(npcid, "ballsize.q")} testicle. `;
      } else { // poor guy
        output += " empty. ";
      }
    }
    if (ᛝ.main.female) {
      output += `Her ${(ᛝ.body.pussy.virgin) ? "virgin" : ""} pussy is ${aw.parse(npcid, "pussy.q")} with the ${aw.parse(npcid, "clit.q")} clit and ${aw.parse(npcid, "labia.q")} labia. `;
    }
    output += "Asshole can be described as ";
    output += (ᛝ.body.asshole.virgin) ? `virgin and ${aw.parse(npcid, "anus.q")}.<br>` : `not virgin and ${aw.parse(npcid, "anus.q")}.<br>`;
    return output;
  },
};








