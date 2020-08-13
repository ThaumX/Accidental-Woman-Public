/*
/*  ██╗   ██╗██╗
/*  ██║   ██║██║
/*  ██║   ██║██║
/*  ██║   ██║██║
/*  ╚██████╔╝██║
/*   ╚═════╝ ╚═╝
*/

interface setupUI {
  mainPhone: () => twee ;
  sunSym: () => twee ;
  menuButtons: () => twee ;
  actionButts: () => twee ;
  warnIndicate: () => twee ;
  debugToolers: () => twee ;
  debugToolersFloat: () => twee ;
  statusInfo: () => twee ;
  progressBar: (size: number, label?: string | boolean, color?: string, anim?: string | false) => twee ;
  charList: () => twee ;
  omniIcons: () => twee;
  segmentBar: (val?: number, { width, height, radius, count, bgc, padding, color, empty }?:
    { width?: string, height?: number, radius?: number, count?: number, bgc?: string, padding?: number, color?: string, empty?: string },
    ) => twee;
  soundElement: boolean;
  rainyMood: () => void ;
  saveLaunch: () => void;
  menuButtonTrigger: () => void;
  npcCount: () => string;
  clearPortBGcolor: () => void;
  addPortBGcolor: (name: string) => void;
  glowingPbar: (width: string | number, value: number, color: string, label?: string) => string;
  simplePbar: (value: number, color: string, label: string) => string;
}


setup.ui = {
  // prints phone display
  mainPhone(): twee {
    let out = `<div id="timeDateDisp" class="timeDateDisp blackOutline white" style="background-color:rgba(0,0,0,${State.active.variables.phoneDataBG});">`;
    const wx = (setup.time.daytime() !== "D") ? "IMG_Cloudy" : "IMG_PTLYcloudy";
    const mon = State.active.variables.AW.cash;
    const bal = (mon < 0) ? "bad" : "money";
    const temp = setup.weather.tempPrint();
    out += `<span class="clock">${setup.timeDisp}</span> ${setup.ui.sunSym()}<br>${setup.time.dateDisplay()}<br>`;
    out += `<span style="font-size: 120%;">Credits:</span> <span class="${bal}" style="font-size:125%">₢${mon}</span>&nbsp;&nbsp; <span class="monospace" style="font-size:125%;color:#7fdfff;">${temp}</span>`;
    out += `</div>`; // <img data-passage="${wx}" class="floatRight" style="margin-right:3px;">
    return out;
  },
  // returns sun icon for time of day
  sunSym(): twee {
    let y;
    const x = setup.time.daytime();
    switch (x) {
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
  // prints main menu buttons
  menuButtons(): twee {
    let out = "";
    const pref = State.active.variables.pref.shortcuts;
    if (aw.passage.tags.includes("hidden") || !State.active.variables.showMenuButton) {
      // display the grayed-out buttons only
      out += "<<link [img[Character Menu|IMGcharacter_disabled]]>><</link>>";
      out += "<<link [img[Social Menu|IMGcontacts_disabled]]>><</link>>";
      out += "<<link [img[Game Encyclopedia|IMGgameguide]]>><<replace '#guidecontainer'>><<include [[UIGuideContainer]]>><</replace>><</link>>";
      if (aw.passage.title === "HomeMenu") {
        out += "<<link [img[Game Settings|IMGsettings_disabled]]>><</link>>";
      } else {
        out += "<<link [img[Game Settings|IMGsettings]]>><<replace '#awUIcontainer'>><<include [[MENU-GameSettingMain]]>><</replace>><</link>>";
      }
      if (ↂ.flag.alarmClock[0]) {
        // tslint:disable-next-line:max-line-length
        out += "<<link [img[Phone Alarm Clock|IMGalarmButtonOn]]>><<dialog 'Alarm Clock'>><<include [[menuAlarmClock]]>><</dialog>><</link>>";
      } else {
        // tslint:disable-next-line:max-line-length
        out += "<<link [img[Phone Alarm Clock|IMGalarmButtonOff]]>><<dialog 'Alarm Clock'>><<include [[menuAlarmClock]]>><</dialog>><</link>>";
      }
      out += "<<link [img[Room View|IMGroomview_disabled]]>><</link>>";
      if (pref[0]) {
        // achievements
        out += "<<link [img[Achievements|IMGachieve_disabled]]>><</link>>";
      }
      if (pref[1]) {
        // cheats
        if (aw.chad.cheatmode) {
          out += "<<link [img[Cheat Menu|IMGcheatmenu_disabled]]>><</link>>";
        } else {
          out += "<<link [img[Cheat Menu|IMGlocked_disabled]]>><</link>>";
        }
      }
      if (pref[2]) {
        // theme
        out += "<<link [img[Theme Controls|IMGthemes_disabled]]>><</link>>";
      }
      if (pref[3]) {
        // debug
        out += "<<link [img[Debug Menu|IMGdebug_disabled]]>><</link>>";
      }
      if (pref[4]) {
        // sound
        out += "<<link [img[Sound Menu|IMGmusic_disabled]]>><</link>>";
      }
      if (pref[5]) {
        // actions
        out += "<<link [img[Actions Menu|IMGaction_disabled]]>><</link>>";
      }
      if (pref[6]) {
        // inventory
        out += "<<link [img[Inventory Menu|IMGinventory_disabled]]>><</link>>";
      }
      if (pref[7]) {
        // calendar
        out += "<<link [img[Calendar Menu|IMGcalendar_disabled]]>><</link>>";
      }
      if (pref[8]) {
        // career
        out += "<<link [img[Work Menu|IMGworkstats_disabled]]>><</link>>";
      }
      if (pref[9]) {
        // contacts
        out += "<<link [img[Contacts Menu|IMGphonebook_disabled]]>><</link>>";
      }
      if (pref[10]) {
        // nearby
        out += "<<link [img[Nearby NPCs Menu|IMGnearby_disabled]]>><</link>>";
      }
      if (pref[11]) {
        // notes
        out += "<<link [img[Notes Menu|IMGnotes_disabled]]>><</link>>";
      }
    } else if (ↂ.pc.status != null && ↂ.pc.status.happy < -7) {
      // display the buttons properly
      if (ↂ.pc.status.happy > -10) {
        out += "<<link [img[Character|IMGcharacter]]>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
        out += "<<link [img[Contacts|IMGcontacts]]>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
        out += "<<link [img[Game Encyclopedia|IMGgameguide]]>><<replace '#guidecontainer'>><<include [[UIGuideContainer]]>><</replace>><</link>>";
        out += "<<link [img[Game Settings|IMGsettings]]>><<set setup.menuvar = 'prefs'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>>";
      } else if (ↂ.flag.badEnd === "depression") {
        // 4x gotobridge buttons
        out += `<<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>><<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>><<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>><<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>>`;
      } else {
        out += "<<link [img[Character|IMGcharacter]]>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
        out += "<<link [img[Game Encyclopedia|IMGgameguide]]>><<replace '#guidecontainer'>><<include [[UIGuideContainer]]>><</replace>><</link>>";
        out += `<<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>><<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>>`;
      }
      if (ↂ.pc.status.happy > -9) {
        if (ↂ.flag.alarmClock[0]) {
          // tslint:disable-next-line:max-line-length
          out += "<<link [img[Phone Alarm Clock|IMGalarmButtonOn]]>><<dialog 'Alarm Clock'>><<include [[menuAlarmClock]]>><</dialog>><</link>>";
        } else {
          // tslint:disable-next-line:max-line-length
          out += "<<link [img[Phone Alarm Clock|IMGalarmButtonOff]]>><<dialog 'Alarm Clock'>><<include [[menuAlarmClock]]>><</dialog>><</link>>";
        }
        out += "<<link [img[Room View|IMGroomview]]>><<dialog 'Room View'>><<include [[scene]]>><</dialog>><</link>>";
        let ct = 2;
        if (pref[0]) {
          // achievements
          ct++;
          out += "<<link [img[Achievements|IMGachieve]]>><<set setup.menuvar = 'stats'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>>";
        }
        if (pref[1]) {
          // cheats
          ct++;
          if (aw.chad.cheatmode) {
            out += "<<link [img[Cheat Menu|IMGcheatmenu]]>><<set setup.menuvar = 'cheat'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]"
              + ">><</replace>><</link>>";
          } else {
            out += "<<link [img[Cheat Menu|IMGlocked]]>><<dialog 'AW Cheats'>><<include [[ifYouWantCheats]]>>"
              + "<</dialog>><</link>>";
          }
        }
        if (pref[2]) {
          // theme
          ct++;
          out += "<<link [img[Theme Controls|IMGthemes]]>><<set setup.menuvar = 'theme'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>>"
            + "<</replace>><</link>>";
        }
        if (pref[3]) {
          // debug
          ct++;
          out += "<<link [img[Debug Menu|IMGdebug]]>><<set setup.menuvar = 'bugs'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]"
            + ">><</replace>><</link>>";
        }
        if (pref[4]) {
          // sound
          ct++;
          out += "<<link [img[Sound Menu|IMGmusic]]>><<set setup.menuvar = 'sound'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]"
            + ">><</replace>><</link>>";
        }
        if (pref[5]) {
          // actions
          ct++;
          out += "<<link [img[Actions Menu|IMGaction]]>><<set setup.menuvar = 'actions'>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
        }
        if (pref[6]) {
          // inventory
          ct++;
          out += "<<link [img[Inventory Menu|IMGinventory]]>><<set setup.menuvar = 'inventory'>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
        }
        if (pref[7]) {
          // calendar
          ct++;
          out += "<<link [img[Calendar Menu|IMGcalendar]]>><<set setup.menuvar = 'calendar'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
        }
        if (pref[8]) {
          // career
          ct++;
          out += "<<link [img[Work Menu|IMGworkstats]]>><<set setup.menuvar = 'career'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
        }
        if (pref[9]) {
          // contacts
          ct++;
          out += "<<link [img[Contacts Menu|IMGphonebook]]>><<set setup.menuvar = 'contacts'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
        }
        if (pref[10]) {
          // nearby
          ct++;
          out += "<<link [img[Nearby NPCs Menu|IMGnearby]]>><<set setup.menuvar = 'nearby'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
        }
        if (pref[11]) {
          // notes
          ct++;
          out += "<<link [img[Notes Menu|IMGnotes]]>><<set setup.menuvar = 'notes'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
        }
        const gtb = 11 - ct;
        // fill remaining space with gtb buttons
        for (let i = 0; i < gtb; i++) {
          //
          out += `<<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>>`;
        }
      } else {
        // all gotobridge
        for (let i = 0; i < 11; i++) {
          //
          out += `<<link [img[Suicide|IMG-BestChoice]]>><<gotomap "world" "bridge" "bridge">><</link>>`;
        }
      }
    } else {
      // display the buttons properly
      out += "<<link [img[Character|IMGcharacter]]>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
      out += "<<link [img[Contacts|IMGcontacts]]>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
      out += "<<link [img[Game Encyclopedia|IMGgameguide]]>><<replace '#guidecontainer'>><<include [[UIGuideContainer]]>><</replace>><</link>>";
      out += "<<link [img[Game Settings|IMGsettings]]>><<set setup.menuvar = 'prefs'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>>";
      if (ↂ.flag.alarmClock[0]) {
        // tslint:disable-next-line:max-line-length
        out += "<<link [img[Phone Alarm Clock|IMGalarmButtonOn]]>><<dialog 'Alarm Clock'>><<include [[menuAlarmClock]]>><</dialog>><</link>>";
      } else {
        // tslint:disable-next-line:max-line-length
        out += "<<link [img[Phone Alarm Clock|IMGalarmButtonOff]]>><<dialog 'Alarm Clock'>><<include [[menuAlarmClock]]>><</dialog>><</link>>";
      }
      out += "<<link [img[Room View|IMGroomview]]>><<dialog 'Room View'>><<include [[scene]]>><</dialog>><</link>>";
      if (pref[0]) {
        // achievements
        out += "<<link [img[Achievements|IMGachieve]]>><<set setup.menuvar = 'stats'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>><</replace>><</link>>";
      }
      if (pref[1]) {
        // cheats
        if (aw.chad.cheatmode) {
          out += "<<link [img[Cheat Menu|IMGcheatmenu]]>><<set setup.menuvar = 'cheat'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]"
            + ">><</replace>><</link>>";
        } else {
          out += "<<link [img[Cheat Menu|IMGlocked]]>><<dialog 'AW Cheats'>><<include [[ifYouWantCheats]]>>"
            + "<</dialog>><</link>>";
        }
      }
      if (pref[2]) {
        // theme
        out += "<<link [img[Theme Controls|IMGthemes]]>><<set setup.menuvar = 'theme'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]>>"
          + "<</replace>><</link>>";
      }
      if (pref[3]) {
        // debug
        out += "<<link [img[Debug Menu|IMGdebug]]>><<set setup.menuvar = 'bugs'>><<replace '#awUIcontainer'>><<include [[gameSettingsPage]]"
          + ">><</replace>><</link>>";
      }
      if (pref[4]) {
        // sound
        out += "<<link [img[Sound Menu|IMGmusic]]>><<run setup.ui.rainyMood()>><</link>>";
      }
      if (pref[5]) {
        // actions
        out += "<<link [img[Actions Menu|IMGaction]]>><<set setup.menuvar = 'actions'>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
      }
      if (pref[6]) {
        // inventory
        out += "<<link [img[Inventory Menu|IMGinventory]]>><<set setup.menuvar = 'inventory'>><<run aw.replace('#awUIcontainer', '<<include [[MainCharacterMenu]]>>')>><</link>>";
      }
      if (pref[7]) {
        // calendar
        out += "<<link [img[Calendar Menu|IMGcalendar]]>><<set setup.menuvar = 'calendar'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
      }
      if (pref[8]) {
        // career
        out += "<<link [img[Work Menu|IMGworkstats]]>><<set setup.menuvar = 'career'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
      }
      if (pref[9]) {
        // contacts
        out += "<<link [img[Contacts Menu|IMGphonebook]]>><<set setup.menuvar = 'contacts'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
      }
      if (pref[10]) {
        // nearby
        out += "<<link [img[Nearby NPCs Menu|IMGnearby]]>><<set setup.menuvar = 'nearby'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
      }
      if (pref[11]) {
        // notes
        out += "<<link [img[Notes Menu|IMGnotes]]>><<set setup.menuvar = 'notes'>><<run aw.replace('#awUIcontainer', '<<include [[MainSocial-Menu]]>>')>><</link>>";
      }
    }
    return out;
  },
  // prints unique action buttons
  actionButts(): twee {
    const ᛔ = State.active.variables;
    const d = ᛔ.date[0];
    const home = ["home", "homeT1", "homeT2", "homeT3", "homeT4"];
    let out = "";
    let ct = 0;
    if (!ↂ.flag.Prologue) {
      if (!aw.passage.tags.includes("hidden") && ᛔ.showMenuButton) {
        if (setup.job.time.today()) {
          if (!ↂ.job.att.showed[d] && !ↂ.flag.prologueSunday) {
            const worktime = setup.job.time.until();
            if (worktime > 120 || worktime < -90) { // either too early or too late for autowork
              // do nothing
            } else if (worktime < 40) { // getting close to being late, show call boss.
              out += "<<link [img[Go to Work|IMG_GoToWorkSmall]]>><<run setup.job.goto()>><</link>>";
              out += "<<link [img[Call Boss about being late|IMG_CallWorkIcon]]>><<dialog 'Phonecall with Boss'>>"
                + "<<include [[jobberCallBossLate]]>><</dialog>><</link>>";
              ct += 2;
            } else { // within work window, show go-to-work button
              out += "<<link [img[Go to Work|IMG_GoToWorkSmall]]>><<run setup.job.goto()>><</link>>";
              ct++;
            }
          }
        }
        let excluded = ["home", "homeT1", "homeT2", "homeT3", "homeT4", "bullseye"];
        if (!excluded.includes(ↂ.map.loc[0])) {
          out += "<<link [img[Go Home|IMG_GoToHome]]>><<if State.active.variables.cart.length > 0>><<notify>>You must pay before leaving!<</notify>><<else>><<gotomap 'home' 'foyer'>><</if>><</link>>";
          ct++;
          if (ᛔ.cart.length > 0) {
            out += "<<link [img[Purchase Cart Items|IMG_PayShopIcon]]>><<run setup.shop.purchase()>>"
              + "<<run setup.refresh()>><</link>>";
            ct++;
          }
        }
        excluded = ["home", "homeT1", "homeT2", "homeT3", "homeT4", "BFhome", "BFhomeT1", "BFhomeT2", "BFhomeT3", "BFhomeT4"];
        const school = setup.school.actionButton();
        if (school !== "") {
          out += school;
          ct++;
        }
        if (ↂ.pc.status.milkStore >= ↂ.pc.body.totalMilkCapacity * 0.75 &&
          State.active.variables.items.has(
            "NipJoy Manual Breast Pump",
            "Dainty-Tits Electric Breast Pump",
            "Nipplex Industrial Breast Pump",
            "Nilfex Magic Milker Breast Pump",
            "Happy Teats Breast Pump",
            "Pump-O-Tron Breast Pump")) {
          out += "<<link [img[Pump breastmilk|IMG_PumpIcon]]>><<dialog 'Breastmilk Pumping'>><<include [[MENU-BreastPumpMilking]]>><</dialog>><</link>>";
          ct++;
        }
        if (ↂ.flag.badEnd === "depression" && ↂ.map.loc[2] !== "bridge") {
          out += `<<link [img[Finish it all|IMG-SuicideIcon]]>><<gotomap "world" "bridge" "bridge">><</link>>`;
          ct++;
        }
        if (ↂ.sched.npcDate !== null && ↂ.flag.schedDates.length > 0) {
          for (let i = 0; i < ↂ.plans.current.length; i++) {
            // tslint:disable-next-line:max-line-length
            if (ↂ.plans.current[i].type === "date" && ↂ.plans.current[i].missed && aw.time > (ↂ.plans.current[i].start - 60) && aw.time < (ↂ.plans.current[i].start + 60) && ↂ.plans.current[i].locmap !== ↂ.map.loc[1]) {
              const place = ↂ.plans.current[i].locmap as string;
              if (aw.datePlaces[place] !== null) {
                out += `<<link [img[Go to the ${ↂ.plans.current[i].name}|IMG_ToDateIcon]]>><<run setup.map.nav('${aw.datePlaces[place][0]}', '${aw.datePlaces[place][1]}', '${aw.datePlaces[place][2]}')>>` + "<</link>>";
                ct++;
              } else {
                aw.con.warn(`Date quick button can't find the location ${place} in aw.datePlaces!`);
              }
            }
            // tslint:disable-next-line:max-line-length
            const homes = ["homeT1", "homeT2", "homeT3", "homeT4", "homeT5"];
            const place = ↂ.plans.current[i].locmap as string;
            if (ↂ.flag.schedDates.length !== 0 && ↂ.plans.current[i].type === "date" && ↂ.plans.current[i].missed && aw.time < (ↂ.plans.current[i].start + 60) && aw.time > ↂ.plans.current[i].start && ↂ.plans.current[i].locmap === ↂ.map.loc[1] && aw.datePlaces[place][3] !== "Your home") {
              out += `<<link [img[${ↂ.plans.current[i].name}|IMG_DatingIcon]]>><<run setup.npcDate.date("${ↂ.plans.current[i].npc[0]}", "${ↂ.plans.current[i].locmap}")>>`
                    + "<</link>>";
              ct++;
            } else if (ↂ.flag.schedDates.length !== 0 && ↂ.plans.current[i].type === "date" && ↂ.plans.current[i].missed && aw.time < (ↂ.plans.current[i].start + 60) && aw.time > ↂ.plans.current[i].start && homes.includes(ↂ.map.loc[0]) && aw.datePlaces[place][3] === "Your home") {
              out += `<<link [img[${ↂ.plans.current[i].name}|IMG_DatingIcon]]>><<run setup.npcDate.date("${ↂ.plans.current[i].npc[0]}", "${ↂ.plans.current[i].locmap}")>>`
                    + "<</link>>";
              ct++;
            }
          }
        }
        if (ↂ.sched.npcHang !== null && ↂ.flag.schedHangs.length > 0) {
          for (let i = 0; i < ↂ.plans.current.length; i++) {
            // tslint:disable-next-line:max-line-length
            if (ↂ.plans.current[i].type === "hangout" && ↂ.plans.current[i].missed && aw.time > (ↂ.plans.current[i].start - 60) && aw.time < (ↂ.plans.current[i].start + 60) && ↂ.plans.current[i].locmap !== ↂ.map.loc[1]) {
              const place = ↂ.plans.current[i].locmap as string;
              if (aw.hangPlaces[place] !== null) {
                out += `<<link [img[Go to meeting place|IMG-toHangout]]>><<run setup.map.nav('${aw.hangPlaces[place][0]}', '${aw.hangPlaces[place][1]}', '${aw.hangPlaces[place][2]}')>>` + "<</link>>";
                ct++;
              } else {
                aw.con.warn(`Date quick button can't find the location ${place} in aw.datePlaces!`);
              }
            }
            // tslint:disable-next-line:max-line-length
            if (ↂ.flag.schedHangs.length !== 0 && ↂ.plans.current[i].type === "hangout" && ↂ.plans.current[i].missed && aw.time < (ↂ.plans.current[i].start + 60) && aw.time > ↂ.plans.current[i].start && ↂ.plans.current[i].locmap === ↂ.map.loc[1]) {
              out += `<<link [img[Chill with ${aw.npc[ↂ.plans.current[i].npc[0]].name}|IMG-Hangout]]>><<run setup.hang.hang("${ↂ.plans.current[i].npc[0]}", "${ↂ.plans.current[i].locmap}")>>`
                    + "<</link>>";
              ct++;
            }
          }
        }
        if (ↂ.map.loc[0] === "bullseye" && ↂ.map.loc[1] !== "parking") {
          out += "<<link [img[Pay and head outside|IMG_PayShopIcon]]>><<run setup.map.nav('bullseye','parking')>>"
            + "<</link>>";
          ct++;
        }
        const cID = Object.keys(ↂ.buttons);
        if (cID.length > 0) {
          for (const id of cID) {
            if (ↂ.buttons[id].test()) {
              out += ↂ.buttons[id].print();
              ct++;
            }
          }
        }
        if (excluded.includes(ↂ.map.loc[0]) || ↂ.map.loc[0] === "residential") {
          if (ↂ.map.loc[1] === "parking") {
            out += "<<link [img[Drive your Car|IMG_DriveIcon]]>><<run setup.map.nav('world','appletree')>><</link>>";
            ct++;
          } else {
            if (ↂ.map.loc[1] !== "medical") {
              out += "<<link [img[Go to your Car|IMG_ToTheCarIcon]]>><<run setup.map.nav('residential','parking')>>"
                + "<</link>>";
              ct++;
            }
          }
        }
        if (excluded.includes(ↂ.map.loc[0]) && (ↂ.map.loc[0] !== "BFhome" || State.active.variables.BFlove)) {
          out += "<<link [img[Brush your teeth|IMG_BrushTeethIcon]]>><<run setup.bath.brushTeeth()>>"
            + "<<addTime 2>><</link>>";
          ct++;
          if ((setup.time.minutes() >= 1320 || setup.time.minutes() < 240) && home.includes(ↂ.map.loc[0])) {
            if (ↂ.map.loc[0] === "BFhome" && State.active.variables.BFlove) {
              // sleep over
              if (ↂ.map.loc[1] === "bedroom") {
                out += "<<link [img[Go to Sleep|IMG_SleepIcon]]>><<run setup.sleep.go()>><</link>>";
                ct++;
              } else { // this variant has a setTimeout to prevent the navigation/sleep conflict.
                out += "<<link [img[Go to Sleep|IMG_SleepIcon]]>><<gotomap 'BFhome' 'bedroom'>><<run setTimeout(()=> setup.sleep.go(), 500)>><</link>>";
                ct++;
              }
            } else if (ↂ.map.loc[0] !== "BFhome") {
              if (ↂ.map.loc[1] === "bedroom") {
                out += "<<link [img[Go to Sleep|IMG_SleepIcon]]>><<run setup.sleep.go()>><</link>>";
                ct++;
              } else { // this variant has a setTimeout to prevent the navigation/sleep conflict.
                out += "<<link [img[Go to Sleep|IMG_SleepIcon]]>><<gotomap 'home' 'bedroom'>><<run setTimeout(()=> setup.sleep.go(), 500)>><</link>>";
                ct++;
              }
            }
          }
        }
        if (ↂ.pc.status.happy < -5 && ↂ.map.loc[2] !== "bridge") {
          out += `<<link [img[Finish it all|IMG-SuicideIcon]]>><<gotomap "world" "bridge" "bridge">><</link>>`;
          ct++;
        }
        if (ↂ.pc.status.happy < -7 && ↂ.map.loc[2] !== "bridge") {
          const nums = Math.max(0, 6 - ct);
          for (let i = 0; i < nums; i++) {
            out += `<<link [img[Finish it all|IMG-SuicideIcon]]>><<gotomap "world" "bridge" "bridge">><</link>>`;
          }
        } else if (ↂ.pc.status.happy < -7) {
          const nums = Math.max(0, 6 - ct);
          for (let i = 0; i < nums; i++) {
            out += `<<link [img[Finish it all|IMG-SuicideIcon]]>><<dialog "Last choice">>You stand on the bridge banister and look into the dark blue waters of the Sahne river.<br><br>@@.mono;This is too much for me. Just one step and this all will be over for good.@@<br><br>Your knees are trembling as ancient self-preservation mechanisms try to save you from making the step to the nonexistence.<br><br>@@.mono;Come on, <<print ↂ.pc.main.name>> you can do it. Just close your eyes and take a step forward...@@<br><br><center><<button "Jump">><<run setup.badEnd("suicide")>><</button>><<button "Don't">><<run Dialog.close()>><</button>></center><</dialog>><</link>>`;
          }
        }
      }
    } else {
      out += "<<link [img[INFO|IMG_ActionButtonTutorial]]>><<dialog 'Action Buttons'>>Action buttons give you a "
        + "shortcut to perform common actions without needing to navigator around or go through a menu first. "
        + "Only relevant actions will appear in this area, for example you will only see the option to go to "
        + "work when it's time to go to work, or the option to sleep when it's late enough and you're at home. "
        + "This tutorial button image will disappear after the prologue.<</dialog>><</link>>";
    }
    return out;
  },
  // returns warning-color phone element if there is a warning
  warnIndicate(): twee {
    let msg = "";
    if (State.active.variables.showData) {
      let warn = 0;
      const v = ↂ.pc;
      warn += (v.status.health < 50) ? 1 : 0;
      warn += (v.status.need > 3) ? 1 : 0;
      warn += (v.status.arousal > 10) ? 1 : 0;
      warn += (v.status.stress > 80) ? 1 : 0;
      warn += (v.status.happy < -5) ? 1 : 0;
      warn += (v.status.satisfaction < 20) ? 1 : 0;
      warn += (v.status.anger > 7) ? 1 : 0;
      if (v.groom != null) {
        warn += (v.groom.makeup.clown) ? 1 : 0;
      } else {
        aw.con.info(`NOTICE: ↂ.pc.groom is currently null...`);
      }
      if (warn > 0) {
        msg += "<img data-passage='PhoneMenuBottomAlert' "
          + "style='position:fixed;top:883px;left:2px;width:280px;height:auto;z-index:60;'>";
      }
    }
    return msg;
  },
  // prints debug tools 1
  debugToolers(): twee {
    let out = "";
    // let v = aw.get("PC"),bc,cyc;
    if (State.active.variables.debu) {
      out += `<div id="gayzor" class="uibutton"><span id="debugtog"><<include [[RightSidebarDebugDelayToggle]]>></span> <<button "CheckVars">><<checkvars>><</button>> <span id="debugtooltog"><<if Config.debug>><<include [[RightSidebarDebugVisToggle]]>><</if>></span></div>`;
    }
    return out;
  },
  // prints debug tools 2
  debugToolersFloat(): twee {
    let out = "";
    if (State.active.variables.debu) {
      out += `<div id="gayzorII" class="uibutton"><span id="debugtog"><<include [[RightSidebarDebugDelayToggle]]>></span> <<button "CheckVars">><<checkvars>><</button>> <span id="debugtooltog"><<if Config.debug>><<include [[RightSidebarDebugVisToggle]]>><</if>></span></div>`;
    }
    return out;
  },
  // prints a basic phone status display
  statusInfo(): twee {
    let out = "";
    const v = ↂ.pc;
    let  bc;
    let cyc;
    if (State.active.variables.showData) {
      out += `<div id="statusDisplayBox" style="background-color:rgba(0,0,0,${State.active.variables.phoneDataBG});">`;
      out += "<table id='layout'><tr><td style='width:30%'><b>Mood:</b></td><td><<pcMood>></td></tr>";
      out += "<tr><td><b>Arousal:</b></td><td class='pink'><<pcArousal>></td></tr>";
      if (v.status.birthCon.hormone !== 0 && v.kink.pregnancy) {
        bc = `<td class='orange'>${v.status.birthCon.hormoneType}</td>`;
      } else if (v.status.birthCon.hormone < 75 && v.trait.perceptive === 1) {
        bc = `<td class='yellow'>${v.status.birthCon.hormoneType}</td>`;
      } else if (v.status.birthCon.hormone !== 0) {
        bc = `<td class='green'>${v.status.birthCon.hormoneType}</td>`;
      } else {
        bc = "<td class='pink'>None</td>";
      }
      if (v.status.period !== 0) {
        cyc = `<td class='pink'>${v.status.fertText}</td>`;
      } else {
        switch (v.status.risk) {
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
      out += "<tr><td><b>Status:</b></td><td style='text-align:left;'>";
      if (setup.clothes.exposed.bottom && ↂ.pc.status.inPublic) {
        out += "<span class='bad'>Exposed</span> ";
      }
      out += "<<pcStatus>></td></tr></table></div>";
      // status icons
      // out += `<div id="statPrintIcons">${setup.omni.iconPrint()}</div>`;
      out += `<div id="statPrintIcons">${setup.ui.omniIcons()}</div>`;
    }
    return out;
  },
  // formats twee for a css progress bar with specified options
  progressBar(size: number, label: string|boolean = false, color: string = "blue", anim: string|false = false): twee {
    let out = "<div class='progress-bar";
    const colors = ["blue", "orange", "green", "pink", "white", "shine", "stripes", "glow"];
    if (size < 0) {
      size *= -1;
    }
    if ("number" !== typeof size) {
      size = 69;
    } else if (size < 1 && size > 0) {
      size = Math.round(size * 100);
    } else {
      size = Math.round(size);
    }
    if (size > 100) {
      size = 100;
    }
    if (colors.includes(color)) {
      out += ` ${color}_bar`;
    } else {
      out += " blue_bar";
    }
    if (anim && colors.includes(anim)) {
      out += ` ${anim}_bar`;
    }
    if (!label) {
      label = "";
    }
    out += `'><span style="width: ${size}%">${label}</span></div>`;
    return out;
  },
  // creates list of nearby npcs for twatter display
  charList(): twee {
    const npcs: string[] = [];
    if (State.active.variables.activeNPC != null && State.active.variables.activeNPC.length > 0) {
      npcs.push(...State.active.variables.activeNPC);
    }
    if (ↂ.map.NPC.length > 0 && ↂ.map.NPCactive) {
      npcs.push(...ↂ.map.NPC);
    }
    let output = '<div id="twatterControl"></div><img data-passage="IMG_TwatsNearYou" '
    + 'class="small-phone-twatter"><div id="twatsnearyou" class="small-phone-twatterA">';
    if (npcs.length > 0) {
      for (let i = 0, c = npcs.length; i < c; i++) {
        const fake = (npcs[i].slice(0, 1) === "n") ? false : true;
        const nom = (fake) ? aw.fakeNPC[npcs[i]] : aw.npc[npcs[i]].main;
        let nam = nom.name;
        if (nam.length > 7) {
          nam = nam.slice(0, 7);
        }
        const sur = nom.surname.slice(0, 1);
        output += nam + " " + sur + ".";
        if (c > 5 && i === 4) {
          output += "</div><div id='twatsnearyou' class='small-phone-twatterB'>";
        } else if (i !== 9) {
          output += "<br>";
        }
      }
      output += "</div>";
    } else {
      output += "No Twats Nearby!</div>";
    }
    return output;
  },
  omniIcons(): twee {
    const keys = Object.keys(aw.omni);
    let output = "";
    let k = 0;
    for (let i = 0, c = keys.length; i < c; i++) {
      if (aw.omni[keys[i]].icon !== null && aw.omni[keys[i]].icon !== "none") {
        k++;
        output += `<img data-passage="${aw.omni[keys[i]].icon}" style="opacity:0.7;">`;
        if (k > 7) {
          break;
        }
      }
    }
    if (ↂ.pc != null) {
      if (k < 8 && ↂ.pc.status.nutrition !== undefined && setup.valToBMI(ↂ.pc.status.nutrition.realWeight) < 15 && !ↂ.flag.Prologue) {
        output += `<img data-passage="IMGstatus_Starvation" style="opacity:0.7;">`;
        k++;
      }
      if (k < 8 && ↂ.flag.badEnd !== "none") {
        output += `<img data-passage="IMGstatus_DeathSick" class="lightStrobe">`;
        k++;
      }
      if (k < 8 && ↂ.pc.status.health < 16) {
        output += `<img data-passage="IMGstatus_Dead" class="lightStrobe">`;
        k++;
      }
      if (k < 8 && ↂ.pc.status.happy < -4) {
        output += `<img data-passage="IMGstatus_Depressed" style="opacity:0.7;">`;
        k++;
      }
      if (k < 8 && ↂ.pc.status.lonely > 74) {
        output += `<img data-passage="IMGstatus_Lonely" style="opacity:0.7;">`;
        k++;
      }
      if (k < 8 && ↂ.pc.status.satisfaction < 20) {
        output += `<img data-passage="IMGstatus_Unsatisfied" style="opacity:0.7;">`;
        k++;
      }
      if (k < 8 && ↂ.pc.status.stress > 74) {
        output += `<img data-passage="IMGstatus_Stressed" style="opacity:0.7;">`;
        k++;
      }
      if (k < 8 && ↂ.pc.status.addict.jonesing > 5) {
        output += `<img data-passage="IMGstatus_DrugCraving" style="opacity:0.7;">`;
        k++;
      }
      if (k < 8 && ↂ.flag.BackupTraits.libido < ↂ.pc.trait.libido && !ↂ.flag.Prologue) {
        output += `<img data-passage="IMGstatus_IncreasedLibido" style="opacity:0.7;">`;
        k++;
      }
      if (k < 8 && ↂ.pc.status.birthCon.diaphragm.worn) {
        output += `<img data-passage="IMGstatus_diaphragm" style="opacity:0.7;">`;
        k++;
      }
      if (k < 6 && ↂ.pc.status.alcohol > 0) {
        switch (ↂ.pc.status.alcohol) {
          case 1:
          case 2:
            output += `<img data-passage="IMGstatus_AlcTipsy" style="opacity:0.7;">`;
            break;
          case 3:
          case 4:
            output += `<img data-passage="IMGstatus_AlcTipsy" style="opacity:0.7;">`;
            break;
          case 5:
          case 6:
            output += `<img data-passage="IMGstatus_AlcDrunk" style="opacity:0.7;">`;
            break;
          case 7:
          case 8:
            output += `<img data-passage="IMGstatus_AlcDrunk" style="opacity:0.7;">`;
            break;
          case 9:
          case 10:
            output += `<img data-passage="IMGstatus_AlcWasted" style="opacity:0.7;">`;
            break;
          case 11:
          case 12:
            output += `<img data-passage="IMGstatus_AlcWasted" style="opacity:0.7;">`;
        }
        k++;
      }
      if (k < 8 && (ↂ.pc.status.wombA.fetus.length > 0 && ↂ.pc.status.wombA.know) || (ↂ.pc.status.wombB.fetus.length > 0 && ↂ.pc.status.wombB.know)) {
        output += `<img data-passage="IMGstatus_pregnant" style="opacity:0.7;">`;
        k++;
      }
    }
    return output;
  },
  // creates special segmented bar element with specified options
  segmentBar(val: number = 0, {
    width = "294px",
    height = 24,
    radius = 12,
    count = 8,
    bgc = "#111",
    padding = 2,
    color = "grad",
    empty = "#444",
  }: segmentBarArguments = {
    width: "294px",
    height: 24,
    radius: 12,
    count: 8,
    bgc: "#111",
    padding: 2,
    color: "grad",
    empty: "#444",
  }): twee {
    const segPer = Math.floor(95 / count);
    const rad = radius - padding;
    const barh = height - (padding * 2);
    const fsize = barh - 2;
    const col = ["#80ffaa", "#80ff80", "#aaff80", "#d5ff80", "#ffff80", "#ffd580", "#ffaa80", "#ff8080"];
    let out = `<div style="width:${width};height:${height}px;border-radius:${radius}px;background-color:${bgc};display:flex;padding:${padding}px;text-align:center;flex-flow:row nowrap;justify-content: space-between;align-items:center;font-size:${fsize}px;line-height:1;color:${empty};">`;
    for (let i = 0; i < count; i++) {
      let cr;
      if (val > i) {
        if (color === "grad") {
          cr = col[i];
        } else {
          cr = color;
        }
      } else {
        cr = empty;
      }
      if (i === 0) {
        out += `<div style="width:${segPer}%;height:${barh}px;background-color:${cr};border-top-left-radius:${rad}px;border-bottom-left-radius:${rad}px;">${(i + 1)}</div>`;
      } else if (i === (count - 1)) {
        out += `<div style="width:${segPer}%;height:${barh}px;background-color:${cr};border-top-right-radius:${rad}px;border-bottom-right-radius:${rad}px;">${(i + 1)}</div>`;
      } else {
        out += `<div style="width:${segPer}%;height:${barh}px;background-color:${cr};">${(i + 1)}</div>`;
      }
    }
    out += "</div>";
    return out;
  },
  soundElement: false,
  // toggles the rainyMood screen element
  rainyMood(): void {
    if (!setup.ui.soundElement) {
      $("body").append('<div id="soundContainer"><div id="tab"></div><iframe src="http://www.rainymood.com" '
        + 'title="rainy mood" scrolling="no" frameborder="0"></iframe></div>');
      setup.ui.soundElement = true;
    } else {
      $("#soundContainer").remove();
      setup.ui.soundElement = false;
    }
  },
  // launches the save dialog AFTER creating a new story moment
  saveLaunch(): void {
    const pass = aw.passage.title;
    aw.con.info(`Save passage ${pass}`);
    Engine.play(pass); // must be false to create a moment!
    UI.saves();
  },
  menuButtonTrigger(): void {
    $("#menu-item-restart").click(function() {
      setup.dialog("Are You Sure?", `<center><h2>Restart the Game</h2><<button "RESTART">><<run UI.restart()>><</button>><br><br>Caution: It is safer to close the game tab and reopen the game. The restart functionality can cause errors to arise during gameplay on some systems.</center>`);
    });
    $("#menu-item-settings").click(() => UI.settings());
    $("#menu-item-saves").click(function() {
      Engine.play(aw.passage.title);
      setup.ui.saveLaunch();
    });
  },
  npcCount(): string {
    let x = State.active.variables.UIimg.length;
    x -= 1; // subtract 1 so don't count the player.
    if (x > 21) {
      x = 21;
    }
    return `<img data-passage="IMG-Count${x}" class="portrait-counter">`;
  },
  clearPortBGcolor(): void {
    // tslint:disable-next-line:max-line-length
    const cmd = '<<removeclass "#right-sidebar-portrait" "rsp-blue rsp-deepblue rsp-orange rsp-grey rsp-pink rsp-red rsp-green">>';
    Wikifier.wikifyEval(cmd);
  },
  addPortBGcolor(name: string): void {
    const className = {
      blue: "rsp-blue",
      dblue: "rsp-deepblue",
      orange: "rsp-orange",
      grey: "rsp-grey",
      pink: "rsp-pink",
      red: "rsp-red",
      green: "rsp-green",
    };
    const aClass = (className[name] != null) ? className[name] : "rsp-grey";
    Wikifier.wikifyEval(`<<addclass "#right-sidebar-portrait" "${aClass}">>`);
  },
  glowingPbar(width: string | number, value: number, color: string, label?: string): string {
    const wStyle = (typeof width === "string") ? width + ";" : width + "px;";
    if (color === "grey") {
      color = "gray";
    }
    if (!["red", "yellow", "cyan", "navy", "white", "gray", "lime"].includes(color)) {
      color = "white";
    }
    const lText = (label == null) ? "" : label;
    const output = `<div class="perspective_chart" style="width:${wStyle}">${lText}<div class="glowing-bar ${color}"><div class="face top"><div class="growing-bar" style="width:${value}%"></div></div><div class="face side-0"><div class="growing-bar" style="width:${value}%"></div></div><div class="face floor"><div class="growing-bar" style="width:${value}%"></div></div><div class="face side-a"></div><div class="face side-b"></div><div class="face side-1"><div class="growing-bar" style="width:${value}%"></div></div></div></div>`;
    return output;
  },
  simplePbar(value: number, color: string, label: string): string {
    return `<div class="simplePbar"><h3>${label}</h3><div><span style="background-color: ${color}; width: ${value}%;"></span></div></div>`;
  },
};


Macro.add("progressbar", {
  handler() {
    let value = this.args[0];
    if (this.args.length < 1 || "number" !== typeof this.args[0]) {
      if (setup.testes.test(this.args[0])) {
        value = setup.awsc.parse(this.args[0].trim);
      } else {
        return this.error("The progressbar macro requires a size argument that must be a number.");
      }
    }
    let op;
    let num;
    let label;
    let color;
    let anim;
    const x = this.args.length;
    num = value;
    label = (x > 1) ? this.args[1] : false;
    color = (x > 2) ? this.args[2] : false;
    anim = (x > 3) ? this.args[3] : false;
    op = setup.ui.progressBar(num, label, color, anim);
    return new Wikifier(this.output, op);
  },
});

interface segmentBarArguments {
  width: string;
  height: number;
  radius: number;
  count: number;
  bgc: string;
  padding: number;
  color: string;
  empty: string;
}


