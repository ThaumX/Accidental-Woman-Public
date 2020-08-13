
/*
███╗   ███╗ █████╗ ██████╗     ███████╗██╗   ██╗███████╗███╗   ██╗████████╗
████╗ ████║██╔══██╗██╔══██╗    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
██╔████╔██║███████║██████╔╝    █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
██║╚██╔╝██║██╔══██║██╔═══╝     ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
██║ ╚═╝ ██║██║  ██║██║         ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝         ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝
*/



setTimeout(() => (function() {
  if (aw.event == null || aw.event.map == null) {
    alert(`---WARNING---\nEvent System - Map Events\nAttempting to build event library before initiating event class.`);
  }
  const events: IntGameEventArgs[] = [
    {
      name: "nudityPoliceWarning",
      odds: 1000,
      output: "interact",
      lifetime: [[1, 2, 4, 2032], 0],
      condition() {
        if (!ↂ.pc.status.inPublic || !setup.clothes.exposed.bottom || ↂ.map.loc[0] === "home" || (ↂ.pc.clothes.stats.exposureBot < 41 && (aw.slot.bottom !== 0 && "object" === typeof aw.slot.bottom && ↂ.pc.clothes.worn.bottom !== "off") || (aw.slot.panties !== 0 && "object" === typeof aw.slot.panties && ↂ.pc.clothes.worn.panties !== "off"))) {
          return false;
        }
        if (aw.chad.police) {
          return false;
        }
        if (ↂ.map.loc[1] === "recreation" || (ↂ.map.loc[1] === "coop" && ↂ.map.loc[2] !== "main")) {
          return false;
        }
        if (ↂ.map.loc[0] !== "downtown" && ↂ.map.loc[0] !== "bullseye") {
          if (random(1, 10) < 6) {
            return false;
          }
        }
        if ((aw.slot.panties !== 0 && "object" === typeof aw.slot.panties && ↂ.pc.clothes.worn.panties !== "off") && ↂ.pc.clothes.stats.exposureBot < 50 && random(1, 4) > 1) {
          return false;
        }
        return true;
      },
      action(count) {
        const rate: number[] = [];
        if (ↂ.map.loc[0] !== "downtown" && ↂ.map.loc[0] !== "residential") {
          rate.push(1);
          rate.push(20);
          rate.push(1 + Math.floor(ↂ.flag.apdCaughtNaked / 2));
          rate.push(1 + Math.floor(ↂ.flag.apdCaughtNaked / 3));
        } else {
          rate.push(15);
          rate.push(5);
          rate.push(2 + ↂ.flag.apdCaughtNaked);
          rate.push(ↂ.flag.apdCaughtNaked);
        }
        const x = setup.randomDist(rate);
        const difficulty = [13, 15, 17, 20];
        const ps = ["AppletreePoliceNudityA", "AppletreePoliceNudityB", "AppletreePoliceNudityC", "AppletreePoliceNudityD"];
        const ims = ["IMG-FemalePoliceOfficer", "IMG-PolicePatrolOfficer", "IMG-MalePoliceOfficer", "IMG-PoliceWatcher"];
        const tit = ["APD Service Officer", "APD Patrol Officer", "APD Enforcer", "APD Watcher"];
        const dc = difficulty[x];
        setup.SCXfunc();
        setup.SCfunc("EX", dc);
        if (State.active.variables.SCresult[1]) {
          UI.alert(`You manage to avoid police attention this time...<br>${State.active.variables.SCtext[1]}`);
          return;
        } else {
          ↂ.flag.apdCaughtNaked++;
        }
        const args = {
          passage: ps[x],
          block: true,
          content: `<<set _apd = ${ↂ.flag.apdCaughtNaked}>><<set _fine = 50 + _apd * 10>>`,
          image: ims[x],
          title: tit[x],
          size: 4,
          callback() {
            setup.time.add(random(12, 22));
          },
          onclose() {
            setup.refresh();
          },
        };
        setup.interact.launch(args);
      },
    },
    {
      name: "PedroApproach",
      odds: 100,
      output: "interact",
      repeat: false,
      region: ["residential"],
      condition() {
        if (!ↂ.flag.drug.residentialPedroMet && !ↂ.flag.Prologue) {
          return true;
        }
        return false;
      },
      action(count) {
        ↂ.flag.drug.residentialPedroMet = true;
        const args = {
          passage: "ResidentialDrugsPedro-1",
          block: false,
          content: ``,
          image: "IMG-npc-PedroBatista",
          title: "Conversation",
          size: 3,
          callback() {
            setup.time.add(random(3, 8));
          },
          onclose() {
            setup.refresh();
          },
        };
        setup.interact.launch(args);
      },
    },
    {
      name: "HannaApproach",
      odds: 50,
      output: "interact",
      repeat: false,
      region: ["downtown"],
      condition() {
        if (!ↂ.flag.drug.residentialHannaMet && !ↂ.flag.Prologue) {
          return true;
        }
        return false;
      },
      action(count) {
        ↂ.flag.drug.residentialHannaMet = true;
        const args = {
          passage: "HannaBowen-Approach",
          block: false,
          content: ``,
          image: "IMG-npc-HannaBowen",
          title: "Conversation",
          size: 3,
          callback() {
            setup.time.add(random(3, 8));
          },
          onclose() {
            setup.refresh();
          },
        };
        setup.interact.launch(args);
      },
    },
    {
      name: "ExhibitEncounter",
      odds: 30,
      output: "interact",
      repeat: false,
      region: ["downtown"],
      condition() {
        return true;
      },
      action(count) {
        const args = {
          passage: "none",
          block: false,
          content: `<center>[img[IMG-nudeStreet]]</center><p>@@.head3;Y@@ou notice a nearly buck-naked girl strolling along the sidewalk. The only thing she has on aside from flip-flops is a red micro G-string that barely covers her snatch. She looks pretty upbeat and smiles at you cheerfully when she notices your attention.</p>
          <<dialogchoice>>
          <<dbutt "Chat">><<intreplace>>
            <p>@@.pc;Hey, nice ummm... dress heh!@@</p>
            <p>@@.npc;Oh, thankies! I am from "Free bodies" movement by the way! If you are interested I could hand you our brochure... oh, right. I have none with me ahaha!@@</p>
            <p>@@.pc;Heh, well, not many places to carry your belongings with an outfit like that!@@</p>
            <p>@@.npc;Well, I have <i>some</i> ideas, but you know moisture is bad for paper. Anyway, feel free to search for us on the internets! We could always use more members that look as gorgeous as you!@@</p>
            <p>@@.pc;Hey, thanks, I'll check it out.@@</p>
            <<safetoclose>>
          <</intreplace>>
          <<dtext "happy">>Hey, nice ummm... dress heh!
          <<dbutt "Insult" "ↂ.pc.trait.bitch === 1">><<intreplace>>
            <p>@@.pc;I hope they arrest you, bitch!@@</p>
            <p>@@.npc;Oh, are you a prude or something? It's perfectly legal to walk around like this, see, my box is covered, dumbass!@@</p>
            <<safetoclose>>
          <</intreplace>>
          <<dtext "angry">>I hope they arrest you, bitch!
          <</dialogchoice>>
          `,
          image: "none",
          title: "Encounter",
          size: 3,
          callback() {
            setup.time.add(random(3, 8));
          },
          onclose() {
            setup.refresh();
          },
        };
        setup.interact.launch(args);
      },
    },
    {
      name: "FertCorpsEncounter",
      odds: 30,
      output: "interact",
      repeat: false,
      region: ["downtown"],
      condition() {
        return true;
      },
      action(count) {
        const args = {
          passage: "none",
          block: false,
          content: `
          <p>@@.head3;Y@@ou see a bunch of skimpily dressed girls gathered around a lone man on the sidewalk. He looks very confused while they talk loudly around him. Curious, you walk closer to hear what's going on. As you approach you have a chance to observe their clothing better, and it seems that most of them are wearing confederate flag patterns; a couple of them are even wearing Stetsons.</p>
          <p>@@.npc;But I don't want to!@@</p>
          <p>One of the stronger-looking women takes exception to his statement, getting right up in his face. @@.npd;You tryin' to say we're ugly or somethin'?!@@</p>
          <p>Another girl jumps in. @@.npe;Hell naw, ya better not mess with us, sugar! You stand here, all gussied up high cotton and try to reject us like we're some kinda whores, you'd best not pull that kinda shit on us!@@</p>
          <p>The man tries to back away until his back meets the wall behind him. @@.npc;N-no! I didn't mean anything like that... Ladies, listen, I'm married! I just can't!@@</p>
          <p>@@.npe;Enough of this bull, buddy.@@ She reaches out and grabs his crotch through his pants. @@.npe;You'll breed every damned one-a us or I'll shoot these little commie balls off!@@</p>
          <p>@@.npd;I know you heard what the President said, it's every gal's duty to pop out as many kids as she can for America!@@</p>
          <p>@@.npe;I promise your lil' buddy will feel as snug as a bug in <i>my</i> rug!@@ She pulls up her high-cropped tee to reveal a large set of tits. @@.npe;Come on, give these girls a squeeze!@@ The tallest of the redneck girls proceeds to press her exposed boobs against the guy's chest and it seems to break his resistance.</p>
          <p>@@.npc;Oh, gosh... okay, but quick... I hope Mary doesn't call...@@</p>
          <p>The girls grin and cheer. @@.npd;That's the spirit, sugar cube! Screw your wifey, let's get to the trailer and take these britches off ya!@@</p>
          <p>@@.npe;Good choice, partner! More white babies for the white race, just like mister president asked!@@</p>
          <p>As they leave--pushing the man with them and giggling--you notice that one of them drops a brochure accidentally.</p>
          <center>[img[IMG-FertCorpsAd]]</center>
          <p>@@.mono;Ah, it was those rednecks who fuck like rabbits, saw it on TV. It seems even the Institute supports them... or at least, they don't take any action against these bullies...@@</p>
          <<safetoclose>>
          `,
          image: "none",
          title: "Fert Corps",
          size: 3,
          callback() {
            setup.time.add(random(3, 8));
          },
          onclose() {
            setup.refresh();
          },
        };
        setup.interact.launch(args);
      },
    },
    {
      name: "catCalling",
      odds: 1750,
      output: "none",
      repeat: true,
      region: ["downtown"],
      condition() {
        if (ↂ.map.loc[0] === "home" || setup.escape.sit === "scene" || ↂ.map.loc[1] === "recreation" || (ↂ.map.loc[1] === "coop" && ↂ.map.loc[2] !== "main") || (ↂ.map.loc[0] !== "downtown" && ↂ.map.loc[0] !== "bullseye")) {
          return false;
        }
        if (!ↂ.pc.status.inPublic || !setup.clothes.exposed.bottom || (ↂ.pc.clothes.stats.exposureBot < 41 && (aw.slot.bottom !== 0 && "object" === typeof aw.slot.bottom && ↂ.pc.clothes.worn.bottom !== "off") || (aw.slot.panties !== 0 && "object" === typeof aw.slot.panties && ↂ.pc.clothes.worn.panties !== "off"))) {
          return false;
        }
        return true;
      },
      action(count) {
        if (ↂ.pc.kink.exhibition) {
          setup.status.arousal(2);
        }
        setup.skillGain("exhib", 15);
        UI.alert(either("Some guy walking behind you whistles as he stares at your naked bottom.", "A group of girls are giggling while pointing in your direction.", "A young guy blushes when he sees your exposed pussy."));
        aw.S();
      },
    },
    {
      name: "crazyBum",
      odds: 10,
      output: "none",
      repeat: false,
      region: ["downtown"],
      condition() {
        if (ↂ.flag.Prologue || setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        }
        return true;
      },
      action(count) {
        setup.dialog("Encounter", `You were about to reach your destination in just a couple of minutes when you notice a weird pile of old filthy cloth suddenly start moving near the building wall. Suddenly the face of an obviously homeless man appears from within the pile. Two eyes filled with madness gaze at you for a lingering moment and then...<br><br>
        @@.npc;BOOBS! BOOBS!@@ The bum starts shouting out loud, waving his hands in your general direction. @@.npc;BOOOBS!@@<br><br>
        You do your best to ignore the disturbing mad person and start walking faster. Suddenly the pile of rags gets up and sprints past you, moving far faster than you would have imagined possible. He leaves a cloying stench of cheap vodka in his wake. You stop walking for a moment, stunned and thankful he didn't try to attack you.<br><br>
        @@.npd;STOP RIGHT THERE! POLICE!@@ Two uniformed officers jog past as they chase after the bum. You never even noticed that they were approaching.`);
      },
    },
    {
      name: "rapist",
      odds: 100,
      output: "scene",
      repeat: true,
      region: ["residential", "downtown"],
      condition() {
        if (ↂ.map.loc[0] === "home" || ↂ.map.loc[1] === "mall" || ↂ.map.loc[1] === "townhall" || ↂ.map.loc[1] === "corp" || ↂ.map.loc[1] === "bank" || ↂ.map.loc[1] === "club" ||  ↂ.map.loc[0] === "BFhome" || ↂ.flag.Prologue || setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        } else {
          return true;
        }
      },
      action(count) {
        let chance = 25;
        if (ↂ.map.loc[0] === "residential") {
          chance ++;
        }
        if (ↂ.map.loc[0] === "downtown") {
          chance --;
        }
        if (ↂ.map.loc[1] === "sidewalk" || ↂ.map.loc[1] === "jogging" || ↂ.map.loc[1] === "park") {
          chance += 2;
        }
        if (ↂ.map.loc[1] === "club" || ↂ.map.loc[1] === "adult") {
          chance += 3;
        }
        if (setup.time.now()[0] > 18) {
          chance += 3;
        }
        if (ↂ.pc.mutate.pheromone) {
          chance += 5;
        }
        if (ↂ.pc.mutate.litePhero) {
          chance += 3;
        }
        if (setup.time.now()[0] < 14) {
          chance -= 3;
        }
        chance = chance += (setup.prostitution.appearance() * 2);
        const scenes = ["StreetRapeScene-singleLight", "StreetRapeScene-Gang", "StreetRapeScene-AnglerPsychoGuy"];
        const sceneImages = ["IMG-RapeSingleDark", "IMG-RapeGang", "IMG-PsychoEyes"];
        let selectedFate = setup.randomDist([30, 15, 5]);
        if (ↂ.flag.psycho.caught && selectedFate === 2) {
          selectedFate = 1;
        }
        const scene = scenes[selectedFate];
        let sceneImage = sceneImages[selectedFate];
        if (setup.gate("rape")) {
          sceneImage = "IMG-contentGateCensor";
        }
        if (random(0, 100) < chance) {
          const go = {
            passage: scene,
            content: "none",
            image: "IMG-RapeSideImage",
            topImage: sceneImage,
            title: "Unexpected rendezvous",
            allowSave: false,
            sidebar: `<h2>${ↂ.map.loc[0]}</h2>`,
            showTime: true,
            allowMenu: true,
          };
          setup.scenario.launch(go);
        }
      },
    },
    {
      name: "dirty",
      odds: 1000,
      output: "none",
      repeat: false,
      region: ["downtown"],
      condition() {
        if (ↂ.flag.Prologue || setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        }
        if (aw.clothes[ↂ.pc.clothes.keys.top].values.dirty > 0 || aw.clothes[ↂ.pc.clothes.keys.bottom].values.dirty > 0) {
          return true;
        }
        return false;
      },
      action(count) {
        for (let index = 0; index < ↂ.map.NPC.length; index++) {
          if (ↂ.map.NPC[index].slice(0, 1) !== "f") {
            const args = {
              passage: "NPCinteraction-Dirty",
              block: false,
              content: `<<set $intNPC = '${ↂ.map.NPC[index]}'>>`,
              image: aw.npc[ↂ.map.NPC[index]].main.picture,
              title: aw.npc[ↂ.map.NPC[index]].main.name,
              size: 3,
              callback() {
                setup.time.add(random(2, 3));
              },
              onclose() {
                setup.refresh();
              },
            };
            setup.interact.launch(args);
          }
          break;
        }
      },
    },
    {
      name: "cumNgoDaisy",
      odds: 200,
      output: "none",
      repeat: false,
      region: ["residential"],
      condition() {
        if (setup.npc.acquainted.includes("n1012") || setup.npc.friends.includes("n1012") || setup.npc.lover.includes("n1012") || setup.npc.enemies.includes("n1012") || setup.npc.fling.includes("n1012") || setup.npc.exes.includes("n1012") || setup.npc.bff.includes("n1012")) {
          return false;
        } else if (ↂ.map.loc[1] === "cumandgo") {
          return true;
        }
        return false;
      },
      action(count) {
          const args = {
            passage: "NPCinteraction-cumNgoDaisy",
            block: false,
            content: `<<set $intNPC = 'n1012'>>`,
            image: aw.npc.n1012.main.picture,
            title: aw.npc.n1012.main.name,
            size: 3,
            callback() {
              setup.time.add(random(2, 4));
            },
            onclose() {
              setup.refresh();
            },
          };
          setup.interact.launch(args);
      },
    },
    {
      name: "publicOpinion",
      odds: 70,
      output: "none",
      repeat: false,
      region: ["homeT1"],
      condition() {
        if (setup.time.now()[0] > 9 && setup.time.now()[0] < 21) {
          return true;
        }
        if (ↂ.flag.Prologue || setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        }
        return false;
      },
      action(count) {
          const args = {
            passage: "NPCinteraction-publicOpinion",
            block: false,
            content: `none`,
            image: "none",
            title: "Door",
            size: 3,
            callback() {
              setup.time.add(random(3, 6));
            },
            onclose() {
              setup.refresh();
            },
          };
          setup.interact.launch(args);
      },
    },
    {
      name: "letterCraig",
      odds: 0,
      output: "none",
      repeat: false,
      region: ["medical"],
      condition() {
        if (State.active.variables.PsychoCraigSave === true) {
          return true;
        }
        return false;
      },
      action(count) {
        let text = "You have good friends, they called me fast enough when you went missing.";
        if (setup.npc.acquainted.includes["n1027"] || setup.npc.friends.includes["n1027"] || setup.npc.lover.includes["n1027"]) {
          text = "I always care about those who are around me, but please, don't risk yourself anymore.";
        };
        setup.dialog("Letter", `You wake up in a hospital room. It takes you some time to recall what happened, though you still aren't sure why you ended up here. The nurse explains that you were brought in unconscious by an Institute Agent yesterday. They took care of your bruises, concussion, and the other minor injuries they found. She nods to the small table near the bed, it seems he left a note for you.<br><br>You pick it up and begin to read. @@.npc;<<= ↂ.pc.main.name>>! I hope you are alright after your <i>fall down the stairs</i>. Also, you will be pleased to know that I took special care of our new friend. He won't be bothering you anymore with his business ideas about forest hiking. <i>Please,</i> be careful next time, it was super lucky that I was able to catch you from <i>falling down from the ladder</i>. Get well. Craig.<br><br>P.S. ${text}<br><br>P.P.S. We better keep the story about yesterday's party between us, okay?@@<<run setup.npcInfo.level("n1027", {bodyGeneral: true})>><<set aw.npc.n1027.rship.acquaint = true>><<run setup.npc.acquainted.push("n1027")>>`);
        State.active.variables.PsychoCraigSave = false;
        aw.S();
      },
    },
    {
      name: "demagnetized",
      odds: 100,
      output: "none",
      repeat: false,
      region: ["bridge"],
      condition() {
        if (ↂ.flag.Prologue || setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        }
        return true;
      },
      action(count) {
        setup.dialog("Near Some Woods", `<<stress 19 "DEMAGNETIZED!!!">>@@.head3;S@@uddenly, a middle-aged guy runs from the shadows of the woods and falls on his knees right in front of you panting and crying, his clothes almost are ripped apart and he is mumbling hysterically.<br><br>
        @@.pc;What happened?! Do you need help?!@@<br><br>
        @@.npc;Demagnetized! They are coming after me, please help! call 911!!@@<br><br>
        @@.pc;Sorry, who? Just calm down for a moment.@@<br><br>
        He stops for a moment, then looks with his eyes full of dread at the trees behind him. Suddenly, he starts screaming a single high note at the top of his lungs while pointing with his shaking hand. Shocked, you stare first at the guy before turning your gaze to the woods. You can swear you see some weird wobbling in the air at the treeline, but can't be sure if it's real or if it's just too dark in there and shadows are playing with your perception. @@.mono;Oh shit, what's happening here?!@@<br><br>
        @@.npc;NOOOOO! PLEASE!!!!@@<br><br>
        Your focus is broken by the shrill scream. @@.pc;S-sir?@@ As you look back at him an unnatural sound comes from his throat. You see his eyes roll up inside his head as if to stare into his own skull, and then he falls to the ground. His body shakes for a few seconds before he suddenly stops showing any signs of life. Fearfully, you stare at the woods once more, but everything appears to be normal. Everything is quiet except for a chill wind rustling the leaves...<br><br>
        @@.pc;What the actual fuck... I better get out of here...@@<br>`);
      },
    },
    {
      name: "desperation",
      odds: 50,
      output: "none",
      repeat: true,
      region: ["downtown"],
      condition() {
        if (ↂ.flag.Prologue || setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        }
        if (State.active.variables.pref.waterworks && ↂ.map.loc[1] === "mall") {
          return true;
        } else {
          return false;
        }
      },
      action(count) {
        setup.dialog("Accidental Puddle", `@@.head3;Y@@ou notice a young girl acting a bit odd. She clenches her legs--which are covered by white leggings--causing her to walk with small rapid steps. She is turning her head back and forth, looking all around for something while biting her lip in a nervous manner. As she passes you, the girl starts to whine quietly with her hand holding her lower belly area.<br><br>
        <<if ↂ.pc.trait.perceptive == 1>>@@.mono;Oh, poor girl, I hope she finds the toilet in time... Although I can't remember if they have any in this part of the mall.@@<<else>>@@.mono;I wonder what is wrong with her? Is she in pain?@@<</if>> You stare at the girl wondering if you can help her in some way, but before you can do anything she seems to spot what she was looking for and starts walking quickly toward it. Looking toward where she's headed, you quickly spot a restroom sign. You watch as she hurries down the mall concorse, when you notice that she seems to be headed right into the path of a man who's walking while distracted by his phone. It's too late to warn them, and you stare entranced at the inevitable disaster.<br><br>
        The girl lets out a pained @@.npc;Ouch!@@ as she collides with the man, barely managing to remain on her feet.<br><br>
        The man seems to be apologizing for not paying attention, but it seems it's too late for for the girl; the impact seems to have jostled her bladder. She squeals as she desperately tries to regain control over her overstretched bladder by grabbing her crotch with both hands. The effort seems to fail miserably, however, as her leggings start changing to a darker color. She stands there, crying, as piss runs down her legs.<br><br>
        She suddenly runs into the open doorway of the restroom, leaving only a puddle of urine on the mall floor.<br>
        <<has bitch>><<happy 1 "You enjoyed watching that girl piss herself">>@@.mono;That's what I call an entertainment!@@<br><<or>>@@.mono;Oh, what a poor girl... And the guy is as red as a tomato now. Well, I guess it will be okay for her.@@<br><</has>>`);
      },
    },
    {
      name: "Tanning",
      odds: 200,
      output: "scene",
      repeat: true,
      region: ["residential"],
      condition() {
        if (setup.time.now()[0] < 9 || setup.time.now()[0] > 21 || setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        } else if (ↂ.map.loc[1] === "recreation") {
          return true;
        } else {
          return false;
        }
      },
      action(count) {
        const go = {
          passage: "Lesbian-tanning",
          content: "none",
          image: "IMG-LesbianSceneRight",
          topImage: "IMG-LesbianSceneTop",
          title: "Tanning invitation",
          allowSave: true,
          sidebar: `<h2>${ↂ.map.loc[0]}</h2>`,
          showTime: true,
          allowMenu: true,
        };
        setup.scenario.launch(go);
      },
    },
    {
      name: "strayDog",
      odds: 100,
      output: "scene",
      repeat: true,
      region: ["residential"],
      condition() {
        if (setup.escape.sit === "jobbing" || setup.escape.sit === "scene" || setup.escape.sit === "interact") {
          return false;
        } else if (ↂ.map.loc[1] === "recreation" || ↂ.map.loc[1] === "sidewalk" || ↂ.map.loc[1] === "parking" || ↂ.map.loc[1] === "jogging" || ↂ.map.loc[1] === "park") {
          return true;
        } else {
          return false;
        }
      },
      action(count) {
        const go = {
          passage: "Stray-dog",
          content: "none",
          image: "IMG-StrayDogRight",
          topImage: "IMG-StrayDogTop",
          title: "Stray dog",
          allowSave: true,
          sidebar: `<h2>${ↂ.map.loc[0]}</h2>`,
          showTime: true,
          allowMenu: true,
        };
        setup.scenario.launch(go);
      },
    },
  ];
  for (const event of events) {
    event.category = "map";
    aw.event.map.push(new GameEvent(event));
  }
})(), 1000);

/* ██████ REFERENCE ██████
  name: string; // Name of the event, must be unique!
  category: "map" | "story" | "mechanic"; // category of the event.
  odds?: number; // x in 10,000 chance of occurring. 0 = not random
  lifetime?: [number | [number, number, number, number], number | [number, number, number, number]]; // game time that event is valid between. [start, end] 0 = no start or end valid time.
  repeat?: boolean; // if the event can be repeated, or if it's once only (default true, repeatable)
  priorEvent?: string | string[];  // required event or events that must have happened first. (default "none")
  interupt?: boolean; // interupt event processing when this event occurs (default false)
  output?: string; // either "interact" or "scene" if one of those outputs is used, otherwise "none"
  omni?: string; // name of an omni that must be active for the event to run, or "none"
  region?: string | string[]; // name of game region that event can occur in (or "any"). checks either loc[1] if loc[0] is "world", or loc[0]. ex: ["residential", "downtown"]
  condition: string | (() => boolean); // function or stringified function assignment to check for event conditions.
  action: string | (() => void); // function or stringified function to run when event occurs. supplied argument num for number of times executed, starting with 1 the first time it runs.
*/

