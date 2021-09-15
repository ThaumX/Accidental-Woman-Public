// ███████╗███████╗██╗  ██╗    ████████╗ ██████╗ ██╗   ██╗███████╗
// ██╔════╝██╔════╝╚██╗██╔╝    ╚══██╔══╝██╔═══██╗╚██╗ ██╔╝██╔════╝
// ███████╗█████╗   ╚███╔╝        ██║   ██║   ██║ ╚████╔╝ ███████╗
// ╚════██║██╔══╝   ██╔██╗        ██║   ██║   ██║  ╚██╔╝  ╚════██║
// ███████║███████╗██╔╝ ██╗       ██║   ╚██████╔╝   ██║   ███████║
// ╚══════╝╚══════╝╚═╝  ╚═╝       ╚═╝    ╚═════╝    ╚═╝   ╚══════╝

setup.sexToys.toys = {
  cheapDildo: {
    key: "cheapDildo",
    name: "Cheap dildo",
    desc: "A cheap small dildo made from PVC.",
    img: "IMG-cheapDildo",
    type: ["dildo"],
    quality: 1,
    wearable: false,
    size: 3,
    occupied: ["vagina"],
    removable: true,
    price: 20,
    canBuy: true,
    button: "Cheap Dildo",
    menu: `<<button "Masturbate - vaginal">><<run setup.sexToys.toys[_toy].onUse(1, _toy)>><</button>><<button "Masturbate - Anal">><<run setup.sexToys.toys[_toy].onUse(2, _toy)>><</button>><<button "Suck">><<run setup.sexToys.toys[_toy].onUse(3, _toy)>><</button>>`,
    useText: ["Besty error :D", `
    <center><<= either("[img[IMG-InsertDildo]]","[img[IMG-InsertDildo2]]","[img[IMG-InsertDildo3]]")>></center><br><<addtime 6>><<set _freeHole = setup.sexToys.check("pc", "vagina")>><<if _freeHole === true>><<set _result = ↂ.pc.body.pussy.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p 'curwet.q'>> <<p 'vulva.n'>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your pussy surprisingly easy.","and it takes virtually no efforts to get the toy inside your pussy.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry pussy.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your pussy sliding in.","and it feels wonderful to stretch your pussy.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your pussy. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you pussy is too tight for the toy so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight pussy and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor cunt gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented slit.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight pussy is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight slit and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your pussy thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep between your <<p labia.s>> labia you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your <<p vulva.n>> you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your vagina walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor pussy throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `, `
    <center><<= either("[img[IMG-InsertDildoAnal0]]","[img[IMG-InsertDildoAnal1]]","[img[IMG-InsertDildoAnal2]]","[img[IMG-InsertDildoAnal3]]")>></center><br><<addtime 6>><<set _freeHole = setup.sexToys.check("pc", "asshole")>><<if _freeHole === true>><<set _result = ↂ.pc.body.asshole.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p asshole.n>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your ass surprisingly easy.","and it takes virtually no efforts to get the toy inside your butt.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry butt.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your hole sliding in.","and it feels wonderful to stretch your butt.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your ass. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you butthole is too tight for the dildo so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight ass and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor hole gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented ass.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight ass is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight asshole and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your butt thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep inside your rectum you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your ass you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your butt walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor genitals throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `, `
    <center>[img[IMG-ToyDildoSuck]]</center><br><<addtime 18>><<set _freeHole = setup.sexToys.check("pc", "mouth")>><<if _freeHole === true>><<SCX>><<SC "OR">><<has oral>><<arousal 2>><<or>><<arousal 1>><</has>>You wrap your <<p lips.q>> lips around the head of the dildo and practice sucking it. <<if $SCresult[1]>>You manage to deepthroat it a couple of times enjoying the tip poking the back of your throat and imagining how good real cock would feel.<<else>>Despite your attempts you don't manage to deepthroat the cock and end up with saliva streaming down your chin.<</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `],
    onUse(n, toy) {
      if (n === 1) {
        aw.con.info(`cheapDildo action 1`);
      } else if (n === 2) {
        aw.con.info(`cheapDildo action 2`);
      } else {
        aw.con.info(`cheapDildo action 3`);
      }
      Dialog.close();
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
  },
  realisticDildo: {
    key: "realisticDildo",
    name: "Realistic dildo",
    desc: "A silicone dildo molded after someone's pretty massive cock. The quality seems pretty good and there is even a suction cup at the bottom.",
    img: "IMG-Item-realisticDildo",
    type: ["dildo"],
    quality: 2,
    wearable: false,
    size: 5,
    occupied: ["vagina"],
    removable: true,
    price: 48,
    canBuy: true,
    button: "Realistic dildo",
    menu: `<<button "Masturbate - vaginal">><<run setup.sexToys.toys[_toy].onUse(1, _toy)>><</button>><<button "Masturbate - Anal">><<run setup.sexToys.toys[_toy].onUse(2, _toy)>><</button>><<button "Suck">><<run setup.sexToys.toys[_toy].onUse(3, _toy)>><</button>>`,
    useText: ["Besty error :D", `
    <center><<= either("[img[IMG-InsertDildo]]","[img[IMG-InsertDildo2]]","[img[IMG-InsertDildo3]]")>></center><br><<addtime 6>><<set _freeHole = setup.sexToys.check("pc", "vagina")>><<if _freeHole === true>><<set _result = ↂ.pc.body.pussy.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p 'curwet.q'>> <<p 'vulva.n'>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your pussy surprisingly easy.","and it takes virtually no efforts to get the toy inside your pussy.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry pussy.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your pussy sliding in.","and it feels wonderful to stretch your pussy.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your pussy. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you pussy is too tight for the toy so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight pussy and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor cunt gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented slit.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight pussy is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight slit and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your pussy thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep between your <<p labia.s>> labia you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your <<p vulva.n>> you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your vagina walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor pussy throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `, `
    <center><<= either("[img[IMG-InsertDildoAnal0]]","[img[IMG-InsertDildoAnal1]]","[img[IMG-InsertDildoAnal2]]","[img[IMG-InsertDildoAnal3]]")>></center><br><<addtime 6>><<set _freeHole = setup.sexToys.check("pc", "asshole")>><<if _freeHole === true>><<set _result = ↂ.pc.body.asshole.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p asshole.n>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your ass surprisingly easy.","and it takes virtually no efforts to get the toy inside your butt.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry butt.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your hole sliding in.","and it feels wonderful to stretch your butt.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your ass. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you butthole is too tight for the dildo so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight ass and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor hole gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented ass.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight ass is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight asshole and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your butt thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep inside your rectum you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your ass you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your butt walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor genitals throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `, `
    <center>[img[IMG-ToyDildoSuck]]</center><br><<addtime 18>><<set _freeHole = setup.sexToys.check("pc", "mouth")>><<if _freeHole === true>><<SCX>><<SC "OR">><<has oral>><<arousal 2>><<or>><<arousal 1>><</has>>You wrap your <<p lips.q>> lips around the head of the dildo and practice sucking it. <<if $SCresult[1]>>You manage to deepthroat it a couple of times enjoying the tip poking the back of your throat and imagining how good real cock would feel.<<else>>Despite your attempts you don't manage to deepthroat the cock and end up with saliva streaming down your chin.<</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `],
    onUse(n, toy) {
      if (n === 1) {
        aw.con.info(`realisticDildo action 1`);
      } else if (n === 2) {
        aw.con.info(`realisticDildo action 2`);
      } else {
        aw.con.info(`realisticDildo action 3`);
      }
      Dialog.close();
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
},
blackHeroDildo: {
  key: "blackHeroDildo",
  name: "Black Hero dildo",
  desc: "A big silicone dildo shaped as a big black cock. The surface is covered with veins and there is a insanely big ballsack which no living person should have. Hovewer who knows, maybe it was modelled after the real person?",
  img: "IMG-Item-BlackHero",
  type: ["dildo"],
  quality: 3,
  wearable: false,
  size: 8,
  occupied: ["vagina"],
  removable: true,
  price: 80,
  canBuy: true,
  button: "Black Hero dildo",
  menu: `<<button "Masturbate - vaginal">><<run setup.sexToys.toys[_toy].onUse(1, _toy)>><</button>><<button "Masturbate - Anal">><<run setup.sexToys.toys[_toy].onUse(2, _toy)>><</button>><<button "Suck">><<run setup.sexToys.toys[_toy].onUse(3, _toy)>><</button>>`,
  useText: ["Besty error :D", `
  <center><<= either("[img[IMG-InsertDildo]]","[img[IMG-InsertDildo2]]","[img[IMG-InsertDildo3]]")>></center><br><<addtime 6>><<= either("You take the dildo and feel its girth and weight. @@.mono;That's some serious equipment for sure...@@","You inspect the impressive size of the dildo and wonder if it was molded after a real person. @@.mono;In that case I really need to find this guy, hehe.@@")>> <<set _freeHole = setup.sexToys.check("pc", "vagina")>><<if _freeHole === true>><<set _result = ↂ.pc.body.pussy.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p 'curwet.q'>> <<p 'vulva.n'>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your pussy surprisingly easy.","and it takes virtually no efforts to get the toy inside your pussy.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry pussy.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your pussy sliding in.","and it feels wonderful to stretch your pussy.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your pussy. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you pussy is too tight for the toy so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight pussy and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor cunt gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented slit.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight pussy is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight slit and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your pussy thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep between your <<p labia.s>> labia you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your <<p vulva.n>> you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your vagina walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor pussy throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
  `, `
  <center><<= either("[img[IMG-InsertDildoAnal0]]","[img[IMG-InsertDildoAnal1]]","[img[IMG-InsertDildoAnal2]]","[img[IMG-InsertDildoAnal3]]")>></center><br><<addtime 6>><<set _freeHole = setup.sexToys.check("pc", "asshole")>><<if _freeHole === true>><<set _result = ↂ.pc.body.asshole.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p asshole.n>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your ass surprisingly easy.","and it takes virtually no efforts to get the toy inside your butt.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry butt.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your hole sliding in.","and it feels wonderful to stretch your butt.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your ass. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you butthole is too tight for the dildo so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight ass and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor hole gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented ass.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight ass is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight asshole and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your butt thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep inside your rectum you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your ass you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your butt walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor genitals throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
  `, `
  <center>[img[IMG-ToyDildoSuck]]</center><br><<addtime 18>><<set _freeHole = setup.sexToys.check("pc", "mouth")>><<if _freeHole === true>><<SCX>><<SC "OR">><<has oral>><<arousal 2>><<or>><<arousal 1>><</has>>You wrap your <<p lips.q>> lips around the head of the dildo and practice sucking it. <<if $SCresult[1]>>You manage to deepthroat it a couple of times enjoying the tip poking the back of your throat and imagining how good real cock would feel.<<else>>Despite your attempts you don't manage to deepthroat the cock and end up with saliva streaming down your chin.<</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
  `],
  onUse(n, toy) {
    if (n === 1) {
      aw.con.info(`realisticDildo action 1`);
    } else if (n === 2) {
      aw.con.info(`realisticDildo action 2`);
    } else {
      aw.con.info(`realisticDildo action 3`);
    }
    Dialog.close();
    setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
    aw.S();
  },
},
horseCockDildo: {
  key: "horseCockDildo",
  name: "Horse cock dildo",
  desc: "A silicone stallion dildo of an impressive size.",
  img: "IMG-Item-HorseCock",
  type: ["dildo"],
  quality: 3,
  wearable: false,
  size: 10,
  occupied: ["vagina"],
  removable: true,
  price: 115,
  canBuy: true,
  button: "Horse cock dildo",
  menu: `<<button "Masturbate - vaginal">><<run setup.sexToys.toys[_toy].onUse(1, _toy)>><</button>><<button "Masturbate - Anal">><<run setup.sexToys.toys[_toy].onUse(2, _toy)>><</button>><<button "Suck">><<run setup.sexToys.toys[_toy].onUse(3, _toy)>><</button>>`,
  useText: ["Besty error :D", `
  <center>[img[IMG-InsertDildoHorse]]</center><br><<addtime 6>><<= either("You take the dildo and feel its girth and weight. @@.mono;That's some serious equipment for sure...@@","You inspect the impressive size of the dildo and wonder if it was molded after a real stallion. @@.mono;In that case I really need to find this horse, hehe.@@")>> <<set _freeHole = setup.sexToys.check("pc", "vagina")>><<if _freeHole === true>><<set _result = ↂ.pc.body.pussy.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p 'curwet.q'>> <<p 'vulva.n'>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your pussy surprisingly easy.","and it takes virtually no efforts to get the toy inside your pussy.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry pussy.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your pussy sliding in.","and it feels wonderful to stretch your pussy.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your pussy. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you pussy is too tight for the toy so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight pussy and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor cunt gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented slit.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight pussy is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight slit and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your pussy thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep between your <<p labia.s>> labia you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your <<p vulva.n>> you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your vagina walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor pussy throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
  `, `
  <center>[img[IMG-InsertDildoAnalHorse]]</center><br><<addtime 6>><<set _freeHole = setup.sexToys.check("pc", "asshole")>><<if _freeHole === true>><<set _result = ↂ.pc.body.asshole.insert(setup.sexToys.toys[_toy].size)>><<= either("You point the tip of the dildo to your <<p asshole.n>> and push it in ","You take the dildo and slide it up and down your slit before pushing it in ")>><<if _result === 'loose'>><<= either("and it slips inside your ass surprisingly easy.","and it takes virtually no efforts to get the toy inside your butt.")>><<elseif _result === 'fits'>><<= either("and it slids in with a pleasurable slurping sound.","and you moan when it gently slides right into your hungry butt.")>><<elseif _result === 'stretch'>><<= either("and you can't but moan when it stretches your hole sliding in.","and it feels wonderful to stretch your butt.")>><<elseif _result === 'overstretch'>><<= either("but it takes some force to actually fit the toy inside your ass. You gasp when it finally slides in with a loud slurping sound making you feel full and super stretched.","but you butthole is too tight for the dildo so it takes some time until you manage to force yourself to accept the toy. When it gets in you just pant for a minute trying to regain your senses.")>> <<if ↂ.pc.kink.sizequeen>>@@.mono;Oh yeah, the bigger the better!@@<</if>><<elseif _result === 'pain'>><<= either("but the toy is obviously too large for your tight ass and it takes a lot of force to wiggle it inside. @@.mono;Come on... just a little more...@@ Suddenly you feel it slips inside and flinch from a sharp pain when your poor hole gets brutally stretched.","but your hole is way too small for the dildo and you start methodically push it inside shoving it a little more with each thrust. The ache starts to get noticeable but your work the toy until it slides in and squint trying to calm down the dull ache in your tormented ass.")>><<elseif _result === 'notfit'>><<= either("but regardless of you efforts you can't insert dildo any further than just a tip, you tight ass is way too small to accept the whole girth. Finally ache forces you to stop and you exhale with disappointment.","but no matter how hard you try damn thing don't get inside your tight asshole and you give up being too afraid to damage yourself.")>><</if>><<if _result !== "notfit">><<SCX>><<SC "SX">><<set _toyTime = random(8,24)>><<addtime _toyTime>><p><<= either("You start slowly fucking your butt thrusting it back and forth.","Starting with slow strokes you soon get faster and in no time you are already fucking yourself vigorously.")>> <<= either("Pushing the dildo deep inside your rectum you bite your lips with pleasure holding moans that desperately want to come out.", "While artificial cock sliding inside your ass you let out short moans of pleasure.")>> <<= either("The hard material feels different than a real flesh but it has some pros, no real cock can compete with the hardness of the dildo relentlessly moving apart your butt walls.", "The hardness of the dildo exceeds the one of the real cock while you slide it in and out your pink flesh.")>> <<= either("@@.mono;Oh, this feels sooo perfect...@@", "@@.mono;Oh fuck, oh fuckity fuck!@@")>></p><<if setup.sexToys.check("pc", "clit") === true>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 12)>><<else>><<set _cumchance = random(0, 10)>><</if>><<= either("Unable to hold much longer you put the finger of your free hand over your pulsating <<p clit.s>> <<p clit.n>> and start circling it.", "Giving up to pleasure you begin to fumble your <<p clit.s>> <<p clit.n>> with your hand still fucking yourself with broad strokes.")>> <<= either("It feels twice as fun that way and you pant like a whore floating in the horny bliss.", "The insane amount of pure pleasure fills you up as you pleasure yourself and you go vocal bending with all your body.")>><<if _cumchance < 10>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<= either("You feel a warm wave rising at the bottom of your <<p belly.n>> and you speed up with fondling your clit and impaling yourself on a dildo.", "It gets more and more pleasurable and you open your mouth while fucking yourself even faster.")>> <<= either("Suddenly you feel slipping over the edge and shake as your body trembles with a powerful orgasm.", "Feeling becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<else>><<set _randomcum = random(10, 15) * -1>><<arousal 3>><<= either("You rub faster and faster but you simply can't slip over the edge for some reason.", "Suddenly you realise that you have hard time pushing yourself to orgasm")>> <<= either("Excessive rubbing made your clit desensitized and to your utter remorse and frustration you feel you simply won't be able to cum this time.", "You clit gets painful and numb to touch after too much efforts to squeeze an orgasm from it and you almost cry from frustration. It seems you don't coming this time.")>><</if>><<else>><<= either("Unable to touch your clit you are limited to playing with your tits and you fumble your <<p nipw.q>> <<p nips.n>>.", "With your clit being out of reach you can only play with your <<p nips.n>> twisting and pressing them mercilessly in the reckless attempt to cum.")>><<if ↂ.pc.kink.nips && !ↂ.pc.kink.hard>><<= either("It suddenly pays off and you shake as your body trembles with a powerful orgasm somehow being split between your cunt and your tits.", "Feeling in your nipples becomes overwhelming and you give in to the powerful orgasm cumming all over and clenching around the dildo.")>> <<= either("It takes about a minute until the feeling subsides and you pant heavily trying to regain your senses.", "When your mind gets back you find yourself breathing heavily with your legs still shaking.")>><<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"ass", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>><<else>><<arousal 3>><<= either("Despite all the torture you inflict on your poor nipples it doesn't take you anywhere near cumming and you have no option to give up with your poor genitals throbbing with desperation.", "You try your best but your body just has no idea how to cum with such stimulation and it seems you won't have any orgasm this time. With a remorse you remove the dildo with a slurping sound and try to regain your senses.")>><</if>><</if>><</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
  `, `
  <center>[img[IMG-SuckHorseDildo]]</center><br><<addtime 18>><<set _freeHole = setup.sexToys.check("pc", "asshole")>><<if _freeHole === true>><<SCX>><<SC "OR">><<has oral>><<arousal 2>><<or>><<arousal 1>><</has>>You wrap your <<p lips.q>> lips around the head of the dildo and practice sucking it. <<if $SCresult[1]>>You manage to deepthroat it a couple of times enjoying the tip poking the back of your throat and imagining how good real cock would feel.<<else>>Despite your attempts you don't manage to deepthroat the cock and end up with saliva streaming down your chin.<</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
  `],
  onUse(n, toy) {
    if (n === 1) {
      aw.con.info(`realisticDildo action 1`);
    } else if (n === 2) {
      aw.con.info(`realisticDildo action 2`);
    } else {
      aw.con.info(`realisticDildo action 3`);
    }
    Dialog.close();
    setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
    aw.S();
  },
},
  smallPlug: {
    key: "smallPlug",
    name: "Small buttplug",
    desc: "Not that big anal plug made of silicon.",
    img: "IMG-smallPlug",
    type: ["plug"],
    quality: 1,
    wearable: true,
    size: 2,
    occupied: ["anal"],
    removable: true,
    price: 18,
    canBuy: true,
    button: "Insert Small buttplug",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-InsertButtPlug]]</center><br><<addtime 6>><<if ↂ.toys.parts.asshole === false>><<set _result = ↂ.pc.body.asshole.insert(setup.sexToys.toys[_toy].size)>><<= either("You work the plug up your asshole gently stretching your <<p asshole.n>>", "You press toy's tip to your <<p asshole.n>> pushing it in")>> <<if _result === 'notfit'>>but no matter how hard you try, toy doesn't fit in and after a some struggling you give up. <<= either("@@.mono;I really should start with something smaller...@@","@@.mono;Damn! I guess I overestimated myself this time...@@")>><<elseif _result === 'fits'>><<= either("and hold your breath when it slides in.", "and moan with pleasure when it snugly slides into place.", "and bite your lip when it gets past your ring filling you just well.")>><<elseif _result === 'pain'>><<= either("and flinch with pain when it stretches your ring too much.", "and can't hold your squealing when it almost tears your poor hole.")>> <<= either("@@.mono;Oh, I hope I did not tear something down there... but still this feels soooo goood!@@", "@@.mono;Ugh, it hurted a lot...@@")>><<elseif _result === 'stretch'>><<= either("and feel your hole stretches to accept it until it finally slides in.", "and it takes some efforts to stretch you hole enough before you get the toy in.")>><<elseif _result === 'overstretch'>><<= either("and after a lot of struggling it fits... somehow.", "and after some cursing and tossing you somehow shove the damn thing up your ass.")>> <<= either("@@.mono;Wow... I hope my bum won't gape constantly after this...@@", "@@.mono;Oh my... this feels <i>really</i> stretching!@@")>><<elseif _result === 'loose'>><<= either("and barely feel it when it slides in without any serious resistance from your hole.", "and it slides in leaving you disappointed.")>> <<= either("@@.mono;Heh, this thing is too small, I really should buy something bigger...@@", "@@.mono;Meh, that's it? I could take a toy twice as big!@@")>><</if>><<if _result !== "notfit">><<run setup.sexToys.insert("pc", "asshole", "smallPlug")>><</if>><<else>>You suddenly remember that you hole is already occupied by <<= setup.sexToys.toys[ↂ.toys.parts.asshole].name>>. @@.mono;Oh, how silly of me, giggle!@@<</if>>`],
    onUse(n, toy) {
      aw.con.info(`smallPlug action 1`);
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      if (State.temporary.result !== "notfit" && ↂ.toys.parts.asshole === "smallPlug" && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
        const omni = {
          name: "Small buttplug",
          type: "perpetual",
          output: "none",
          interval: 60,
          icon: "IMGstatus_plug",
          text: "Your ass is plugged.",
          run: `aw.L("pc");
          if (random(0,3) === 1) {
            if (ↂ.pc.kink.buttSlut) {
              setup.status.arousal(2);
            } else {
              setup.status.arousal(1);
            }
          }
          if (random(0,40) === 1) {
            ↂ.pc.status.bimbo += 1;
            setup.status.record("bimbo", 1, "Rare buttplug side effect");
          }
          if (random(0,50) === 1 && !ↂ.pc.kink.buttSlut) {
            ↂ.pc.kink.buttSlut = true;
            setup.notify("You start to really like feeling your asshole being stretched...");
          }
          ↂ.pc.body.asshole.insert(2);
          aw.S("pc");`,
        } as IntOmniData;
        setup.omni.new(omni);
      }
      aw.S();
    },
  },
  crystalPlug: {
    key: "crystalPlug",
    name: "Crystal buttplug",
    desc: "Cute small metal buttplug. The crystal on the bottom part is pink and pretty.",
    img: "IMG-Item-crystalPlug",
    type: ["plug"],
    quality: 1,
    wearable: true,
    size: 3,
    occupied: ["anal"],
    removable: true,
    price: 25,
    canBuy: true,
    button: "Insert Crystal buttplug",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-InsertButtPlug]]</center><br><<addtime 6>><<if ↂ.toys.parts.asshole === false>><<set _result = ↂ.pc.body.asshole.insert(setup.sexToys.toys[_toy].size)>><<= either("You work the plug up your asshole gently stretching your <<p asshole.n>>", "You press toy's tip to your <<p asshole.n>> pushing it in")>> <<if _result === 'notfit'>>but no matter how hard you try, toy doesn't fit in and after a some struggling you give up. <<= either("@@.mono;I really should start with something smaller...@@","@@.mono;Damn! I guess I overestimated myself this time...@@")>><<elseif _result === 'fits'>><<= either("and hold your breath when it slides in.", "and moan with pleasure when it snugly slides into place.", "and bite your lip when it gets past your ring filling you just well.")>><<elseif _result === 'pain'>><<= either("and flinch with pain when it stretches your ring too much.", "and can't hold your squealing when it almost tears your poor hole.")>> <<= either("@@.mono;Oh, I hope I did not tear something down there... but still this feels soooo goood!@@", "@@.mono;Ugh, it hurted a lot...@@")>><<elseif _result === 'stretch'>><<= either("and feel your hole stretches to accept it until it finally slides in.", "and it takes some efforts to stretch you hole enough before you get the toy in.")>><<elseif _result === 'overstretch'>><<= either("and after a lot of struggling it fits... somehow.", "and after some cursing and tossing you somehow shove the damn thing up your ass.")>> <<= either("@@.mono;Wow... I hope my bum won't gape constantly after this...@@", "@@.mono;Oh my... this feels <i>really</i> stretching!@@")>><<elseif _result === 'loose'>><<= either("and barely feel it when it slides in without any serious resistance from your hole.", "and it slides in leaving you disappointed.")>> <<= either("@@.mono;Heh, this thing is too small, I really should buy something bigger...@@", "@@.mono;Meh, that's it? I could take a toy twice as big!@@")>><</if>><<if _result !== "notfit">><<run setup.sexToys.insert("pc", "asshole", "crystalPlug")>><</if>><<else>>You suddenly remember that you hole is already occupied by <<= setup.sexToys.toys[ↂ.toys.parts.asshole].name>>. @@.mono;Oh, how silly of me, giggle!@@<</if>>`],
    onUse(n, toy) {
      aw.con.info(`smallPlug action 1`);
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      if (State.temporary.result !== "notfit" && ↂ.toys.parts.asshole === "crystalPlug" && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
        const omni = {
          name: "Crystal buttplug",
          type: "perpetual",
          output: "none",
          interval: 60,
          icon: "IMGstatus_plug",
          text: "Your ass is plugged.",
          run: `aw.L("pc");
          if (random(0,3) === 1) {
            if (ↂ.pc.kink.buttSlut) {
              setup.status.arousal(2);
            } else {
              setup.status.arousal(1);
            }
          }
          if (random(0,40) === 1) {
            ↂ.pc.status.bimbo += 1;
            setup.status.record("bimbo", 1, "Rare buttplug side effect");
          }
          if (random(0,50) === 1 && !ↂ.pc.kink.buttSlut) {
            ↂ.pc.kink.buttSlut = true;
            setup.notify("You start to really like feeling your asshole being stretched...");
          }
          ↂ.pc.body.asshole.insert(3);
          aw.S("pc");`,
        } as IntOmniData;
        setup.omni.new(omni);
      }
      aw.S();
    },
  },
  siliconePlug: {
    key: "siliconePlug",
    name: "Silicone buttplug",
    desc: "An ordinary silicone buttplug from 'Doc Moreau' brand. Has a wide base that should prevent toy from slipping in.",
    img: "IMG-Item-siliconePlug",
    type: ["plug"],
    quality: 2,
    wearable: true,
    size: 4,
    occupied: ["anal"],
    removable: true,
    price: 38,
    canBuy: true,
    button: "Insert Silicone buttplug",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-InsertButtPlug]]</center><br><<addtime 6>><<if ↂ.toys.parts.asshole === false>><<set _result = ↂ.pc.body.asshole.insert(setup.sexToys.toys[_toy].size)>><<= either("You work the plug up your asshole gently stretching your <<p asshole.n>>", "You press toy's tip to your <<p asshole.n>> pushing it in")>> <<if _result === 'notfit'>>but no matter how hard you try, toy doesn't fit in and after a some struggling you give up. <<= either("@@.mono;I really should start with something smaller...@@","@@.mono;Damn! I guess I overestimated myself this time...@@")>><<elseif _result === 'fits'>><<= either("and hold your breath when it slides in.", "and moan with pleasure when it snugly slides into place.", "and bite your lip when it gets past your ring filling you just well.")>><<elseif _result === 'pain'>><<= either("and flinch with pain when it stretches your ring too much.", "and can't hold your squealing when it almost tears your poor hole.")>> <<= either("@@.mono;Oh, I hope I did not tear something down there... but still this feels soooo goood!@@", "@@.mono;Ugh, it hurted a lot...@@")>><<elseif _result === 'stretch'>><<= either("and feel your hole stretches to accept it until it finally slides in.", "and it takes some efforts to stretch you hole enough before you get the toy in.")>><<elseif _result === 'overstretch'>><<= either("and after a lot of struggling it fits... somehow.", "and after some cursing and tossing you somehow shove the damn thing up your ass.")>> <<= either("@@.mono;Wow... I hope my bum won't gape constantly after this...@@", "@@.mono;Oh my... this feels <i>really</i> stretching!@@")>><<elseif _result === 'loose'>><<= either("and barely feel it when it slides in without any serious resistance from your hole.", "and it slides in leaving you disappointed.")>> <<= either("@@.mono;Heh, this thing is too small, I really should buy something bigger...@@", "@@.mono;Meh, that's it? I could take a toy twice as big!@@")>><</if>><<if _result !== "notfit">><<run setup.sexToys.insert("pc", "asshole", "siliconePlug")>><</if>><<else>>You suddenly remember that you hole is already occupied by <<= setup.sexToys.toys[ↂ.toys.parts.asshole].name>>. @@.mono;Oh, how silly of me, giggle!@@<</if>>`],
    onUse(n, toy) {
      aw.con.info(`siliconePlug action 1`);
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      if (State.temporary.result !== "notfit" && ↂ.toys.parts.asshole === "siliconePlug" && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
        const omni = {
          name: "Silicone buttplug",
          type: "perpetual",
          output: "none",
          interval: 60,
          icon: "IMGstatus_plug",
          text: "Your ass is plugged.",
          run: `aw.L("pc");
          if (random(0,3) === 1) {
            if (ↂ.pc.kink.buttSlut) {
              setup.status.arousal(2);
            } else {
              setup.status.arousal(1);
            }
          }
          if (random(0,40) === 1) {
            ↂ.pc.status.bimbo += 1;
            setup.status.record("bimbo", 1, "Rare buttplug side effect");
          }
          if (random(0,40) === 1 && !ↂ.pc.kink.buttSlut) {
            ↂ.pc.kink.buttSlut = true;
            setup.notify("You start to really like feeling your asshole being stretched...");
          }
          ↂ.pc.body.asshole.insert(4);
          aw.S("pc");`,
        } as IntOmniData;
        setup.omni.new(omni);
      }
      aw.S();
    },
  },
  chastityBelt: {
    key: "chastityBelt",
    name: "Chastity belt",
    desc: "Classical chastity belt covering the pussy and preventing any touching or intercourse. The construction allows to have access to the rear hole and performing hygiene routine, as it stated on the packing, 'You can stay clean with just a regular douche! Warning! Avoid getting the locking mechanism wet as it can cause lock jamming!'. Note that due to the '2028 National Teenagers Moral Protection Act' keys are sold separately.",
    img: "IMG-Item-ChastityBelt",
    type: ["chastity"],
    quality: 1,
    wearable: true,
    size: 0,
    occupied: ["groin"],
    removable: false,
    price: 90,
    canBuy: true,
    button: "Put on chastity belt",
    menu: `<<button "Lock the belt">><<run setup.sexToys.toys[_toy].onUse(1, _toy)>><</button>><<if State.active.variables.items.has("Chastity belt key") && ↂ.toys.parts.groin == "chastityBelt">><<button "Remove the belt">><<run setup.sexToys.toys[_toy].onUse(2, _toy)>><</button>><<else>>@@.disabled;<<button "No key for chastity belt">><</button>>@@<</if>>`,
    useText: ["Besty error :D", `
    <center>[img[IMG-ToyChastityBeltOn]]</center><br><<addtime 8>><<set _freeHole = setup.sexToys.check("pc", "groin")>><<if _freeHole === true>><<run setup.sexToys.insert("pc", "groin", "chastityBelt")>><<= either("You take the belt part and put it over your waist. After some adjusting it feels surprisingly in place.", "You put on the upper part of the belt and it fits you hugging your <<p waist.q>> waist perfectly.")>> <<print either("It is time to put on th lower part and you connect it to the setup.","Shield part is pretty easy to connect and you notice that the thing is pretty sturdy.")>> <<if ↂ.toys.parts.vagina !== false>> You are not that sure that it is the best idea to lock yourself up with something in your pussy and you hesitate for a moment. @@.mono;Oh, I won't be able to take it out with the belt on...@@ You think for another moment but then finally make a decision and proceed.<</if>> <<print either("Putting a front plate connector into the locking mechanism you press it until it clicks leaving you securely locked up.","You push parts together until the loud <i>Click!</i> notices you that your pussy is out of reach now.")>> @@.mono;Oh...@@ <<print either("The belt sits on your <<p hips.q>> hips just right and you cant fit a finger between the steel and your skin.","It feels surprisingly comfortable and you suddenly think that you could stay in such thing for a long time without any issues. The idea <<has sub>><<arousal 1>>both excites and <<or>><</has>>frightens you.")>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `, `<<run setup.sexToys.remove("pc", "groin")>><<arousal 2>>You put the key inside the lock and twist it until you hear a clicking. The front part of the belt disassembles from the waistband and you can see end touch your precious pussy again.<br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `],
    onUse(n, toy) {
      if (n === 1) {
        aw.con.info(`chastityBelt action 1`);
        if (setup.sexToys.check("pc", "groin") === true && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
          const omni = {
            name: "Chastity belt",
            type: "perpetual",
            output: "none",
            interval: 60,
            icon: "IMGstatus_chastity",
            text: "Your pussy is locked up in the chastity belt.",
            run: `aw.L("pc");
            ↂ.pc.status.wetness += 1;
            if (ↂ.pc.status.satisfaction < 10) {ↂ.pc.status.satisfaction = 10;}
            let illFate = random(1, 100);
            if (illFate < 20) {
              setup.notify('<<= either("You feel the desperate urge to touch you pussy...","You would pay anything just to play with your poor locked slit right now...","The need to play with your girl grows almost unbearable...")>>');
            } else if (illFate === 69) {
              ↂ.pc.kink.sub = true;
              setup.notify("You feel much more subby and start to like the humiliation of not being charge in your own pussy.");
            }
            aw.S("pc");`,
          } as IntOmniData;
          setup.omni.new(omni);
        }
      } else {
        aw.con.info(`chastityBelt action 2`);
        setup.omni.kill("Chastity");
      }
      Dialog.close();
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
  },
  cPlate: {
    key: "cPlate",
    name: "Cplate 200",
    desc: "Modern female chastity belt using most modern technologies to block any access yo the wearer's pussy. The strong biomagnetic field generated by the plate basically makes it impossible to remove from skin still allowing maintaining the hygiene. Side effects of prolonged wearing may include skin irritation. Note that due to the '2028 National Teenagers Moral Protection Act' remotes are sold separately.",
    img: "IMG-Item-CPlate",
    type: ["chastity"],
    quality: 3,
    wearable: true,
    size: 0,
    occupied: ["groin"],
    removable: false,
    price: 130,
    canBuy: true,
    button: "Put on Cplate 200",
    menu: `<<button "Lock the plate">><<run setup.sexToys.toys[_toy].onUse(1, _toy)>><</button>><<if State.active.variables.items.has("Cplate 200 remote") && ↂ.toys.parts.groin == "cPlate">><<button "Remove the plate">><<run setup.sexToys.toys[_toy].onUse(2, _toy)>><</button>><<else>>@@.disabled;<<button "No remote for the chastity plate">><</button>>@@<</if>>`,
    useText: ["Besty error :D", `
    <center>[img[IMG-ToyChastityBeltOn]]</center><br><<addtime 8>><<set _freeHole = setup.sexToys.check("pc", "groin")>><<if _freeHole === true>><<run setup.sexToys.insert("pc", "groin", "cPlate")>><<= either("You take the plate and put it onto your groin.", "You cover your <<p pussy.q>> <<p pussy.n>> with a chastity shield.")>> <<if ↂ.toys.parts.vagina !== false>> You are not that sure that it is the best idea to lock yourself up with something in your pussy and you hesitate for a moment. @@.mono;Oh, I won't be able to take it out with the plate on...@@ You think for another moment but then finally make a decision and proceed.<</if>> <<print either("Pushing the only tiny button on the front panel you awake the device.","You put the finger over the small button on the surface and gather some courage before pressing it.")>> @@.mono;Oh...@@ With the soft rumble it suck itself closer to your bare pussy making the bond between the flesh and plate almost unbreakable. As you gets accustomed to the feeling of your groin being engulfed with a device biomagnetic fields the little led on the plate changes color from dark red to green indicating that you are properly locked now. <<print either("The plate covers your pussy perfectly and there is obviously no chances to remove it without a remote.","It feels surprisingly comfortable and you suddenly think that you could stay in such thing for a long time without any issues. The idea <<has sub>><<arousal 1>>both excites and <<or>><</has>>frightens you.")>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `, `<<run setup.sexToys.remove("pc", "groin")>><<arousal 2>>You take the remote and push the button with the lock icon for three seconds. Nothing happens and you already start to worry. @@.mono;Oh, pleease, don't say it is broken, pleeease!@@ Suddenly with a humming noise it release biomagnetic fields bonding the plate with your groin and you can see and touch your free cunt once again.<br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `],
    onUse(n, toy) {
      if (n === 1) {
        aw.con.info(`cPlate action 1`);
        if (setup.sexToys.check("pc", "groin") === true && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
          const omni = {
            name: "Cplate 200",
            type: "perpetual",
            output: "none",
            interval: 60,
            icon: "IMGstatus_chastity",
            text: "Your pussy is locked up in the chastity plate.",
            run: `aw.L("pc");
            ↂ.pc.status.wetness += 1;
            if (ↂ.pc.status.satisfaction < 10) {ↂ.pc.status.satisfaction = 10;}
            let illFate = random(1, 100);
            if (illFate < 20) {
              setup.notify('<<= either("You feel the desperate urge to touch you pussy...","You would pay anything just to play with your poor locked slit right now...","The need to play with your girl grows almost unbearable...")>>');
            } else if (illFate === 69) {
              ↂ.pc.kink.sub = true;
              setup.notify("You feel much more subby and start to like the humiliation of not being charge in your own pussy.");
            }
            aw.S("pc");`,
          } as IntOmniData;
          setup.omni.new(omni);
        }
      } else {
        aw.con.info(`cPlate action 2`);
        setup.omni.kill("Chastity plate");
      }
      Dialog.close();
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
  },
  clitShield: {
    key: "clitShield",
    name: "Clit shield",
    desc: "A smaller version of Cplate 200 covering only the clitoris of the wearer. The strong biomagnetic field generated by the plate basically makes it impossible to remove from skin still allowing maintaining the hygiene. Side effects of prolonged wearing may include skin irritation. Note that due to the '2028 National Teenagers Moral Protection Act' remotes are sold separately.",
    img: "IMG-Item-ClitShield",
    type: ["chastity"],
    quality: 3,
    wearable: true,
    size: 0,
    occupied: ["clit"],
    removable: false,
    price: 110,
    canBuy: true,
    button: "Put on Clit shield",
    menu: `<<button "Lock the shield">><<run setup.sexToys.toys[_toy].onUse(1, _toy)>><</button>><<if State.active.variables.items.has("Clit shield remote") && ↂ.toys.parts.clit == "clitShield">><<button "Remove the shield">><<run setup.sexToys.toys[_toy].onUse(2, _toy)>><</button>><<else>>@@.disabled;<<button "No remote for the clit shield">><</button>>@@<</if>>`,
    useText: ["Besty error :D", `
    <center>[img[IMG-ToyChastityBeltOn]]</center><br><<addtime 8>><<set _freeHole = setup.sexToys.check("pc", "clit")>><<if _freeHole === true>><<run setup.sexToys.insert("pc", "clit", "clitShield")>><<= either("You take the plate and spreading your <<p labia.s>> labia put it onto your clit.", "You cover your <<p clit.s>> <<p clit.n>> with a shield.")>> <<print either("Pushing the tiny button on the side you awake the device.","You put the finger over the small button on the surface and gather some courage before pressing it.")>> @@.mono;Oh...@@ With the soft rumble it suck itself closer to your clit making the bond between the flesh and plate almost unbreakable. As you gets accustomed to the feeling of your nub being engulfed with a device biomagnetic fields the little led on the plate changes color from dark red to green indicating that you are properly locked now. <<print either("The plate covers your clit perfectly and there is obviously no chances to remove it without a remote.","It feels surprisingly comfortable and you suddenly think that you could stay in such thing for a long time without any issues. The idea <<has sub>><<arousal 1>>both excites and <<or>><</has>>frightens you.")>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `, `<<run setup.sexToys.remove("pc", "clit")>><<arousal 2>>You take the remote and push the button with the lock icon for three seconds. Nothing happens and you already start to worry. @@.mono;Oh, please, don't say it is broken, pleeease!@@ Suddenly with a humming noise it release biomagnetic fields bonding the plate with your clit and you can see and touch your free nub once again.<br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    `],
    onUse(n, toy) {
      if (n === 1) {
        aw.con.info(`cPlate action 1`);
        if (setup.sexToys.check("pc", "groin") === true && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
          const omni = {
            name: "Clit shield",
            type: "perpetual",
            output: "none",
            interval: 60,
            icon: "IMGstatus_chastity",
            text: "Your clitoris is locked up in the chastity shield.",
            run: `aw.L("pc");
            ↂ.pc.status.wetness += 1;
            setup.condition.add({ loc:"vagFluid", amt:2, tgt:"pc", wet:2, type:"femlube"});
            if (ↂ.pc.status.satisfaction < 10) {ↂ.pc.status.satisfaction = 10;}
            let illFate = random(1, 100);
            if (illFate < 20) {
              setup.notify('<<= either("You feel the desperate urge to touch you tiny pleasure button...","You would pay anything just to play with your poor locked clit right now...","The need to play with yourself grows almost unbearable...")>>');
            } else if (illFate === 69) {
              ↂ.pc.kink.sub = true;
              setup.notify("You feel much more subby and start to like the humiliation of not being charge in your own nub.");
            }
            aw.S("pc");`,
          } as IntOmniData;
          setup.omni.new(omni);
        }
      } else {
        aw.con.info(`cPlate action 2`);
        setup.omni.kill("Clit shield");
      }
      Dialog.close();
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
  },
  ballGag: {
    key: "ballGag",
    name: "Ball Gag",
    desc: "A mouth gag with a leather strap holding the big red ball in place.",
    img: "IMG-Item-Ballgag",
    type: ["gag"],
    quality: 2,
    wearable: true,
    size: 0,
    occupied: ["mouth"],
    removable: true,
    price: 30,
    canBuy: true,
    button: "Insert the Ball gag",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-InsertGag]]</center><br><<addtime 6>><<set _freeHole = setup.sexToys.check("pc", "mouth")>><<if _freeHole === true>><<run setup.sexToys.insert("pc", "mouth", "ballGag")>><<= either ("You take the ball gag and put it closer to your mouth.","You press the ball to your lips.")>> <<= either ("The ball is rather big and you feel your jaw ache from stretching when you put it in.","The big ball forces your jaw to be wide-opened.")>> <<= either("You feel starting drooling almost instantly with the enourmous ball between your teeth.","Locking the buckle you find that you can't actually say a thing and just drool down your chin.")>> <<= either("@@.mono;This thing stretches my poor mouth a lot...@@","@@.mono;Oh, that's restricting...@@")>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>`],
    onUse(n, toy) {
      aw.con.info(`ballGag action 1`);
      if (setup.sexToys.check("pc", "mouth") === true && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
        const omni = {
          name: "Ball Gag",
          type: "perpetual",
          output: "none",
          interval: 60,
          icon: "IMGstatus_gag",
          text: "Your mouth is gagged.",
          run: `aw.L("pc");
          if (random(0,5) === 1) {
            if (ↂ.pc.kink.sub) {
              setup.status.arousal(2);
            } else {
              setup.status.arousal(1);
            }
          }
          setup.condition.add({ loc: "mouth", amt: 5, tgt: "pc", wet: 5, type: "saliva" });
          setup.notify("<<= either('Your jaw aches from the gag.','Ballgag makes your jaw ache.','You drool uncontrollably.')>>");
          aw.S("pc");`,
        } as IntOmniData;
        setup.omni.new(omni);
      }
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
  },
  magicWand: {
    key: "magicWand",
    name: "Magic Wand",
    desc: "A famous vibrator initially created as a muscle tension relieving device.",
    img: "IMG-Item-MagicWand",
    type: ["vibrator"],
    quality: 2,
    wearable: false,
    size: 0,
    occupied: ["clit"],
    removable: true,
    price: 45,
    canBuy: true,
    button: "Masturbate with the Magic Wand",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-ToyWand]]</center><br><<set _tim = random(12, 22)>><<addtime _tim>><<set _freeHole = setup.sexToys.check("pc", "clit")>>
    <<if _freeHole === true>>
      <<= either("With a quiet click you turn on the wand and it starts buzzing.","You turn the vibrator on and it's light humming makes you anticipate your fapping.")>> <<= either("Take the vibrator you gently stroke your <<p clit.s>> <<p clit.n>> up and down.","With the round head of the massager you tease your <<p labia.s>> labia letting out a deligted moan each time it touches your clit.")>><<if ↂ.pc.kink.hard>><<set _cumchance = random(0, 15)>><<else>><<set _cumchance = random(0, 10)>><</if>>
      <<if _cumchance < 10>>
        <<set _randomcum = random(15, 20)>><<set _randomcum += setup.sexToys.toys[_toy].quality * 5>><<if ↂ.pc.kink.fap>><<set _randomcum += 5>><</if>><<set _stress = random(-3,-8)>><<stress _stress "Masturbation">><<satisfy _randomcum "Masturbation">><<set ↂ.pc.status.arousal -= 4>><<run setup.condition.add({ loc:"vagina", amt:7, tgt:"pc", wet:5, type:"femlube"})>><<run setup.condition.add({ loc:"genitals", amt:5, tgt:"pc", wet:5, type:"femlube"})>> <<= either("Arousal builds up as you press the head to your pussy.","Deep vibrations tingle your pussy as you press the wand to your clit.")>> <<= either("The orgasm gets closer and closer with each second and you almost want to stop to prolongue the fun but it is already too pleasureable to remove it for even a second.","You feel your orgasm is almost around the corner and press it even harder to your <<p 'curwet.q'>> <<p 'vulva.n'>>.")>> <<= either("@@.mono;Oh... oh... almost thereeee!..@@","You bite your lip when the demanding vibration push you over the edge.")>> <<= either("Clenching and shaking you cum for like eternity before your pussy starts to feel too sensitive.","Moaning, almost crying, you cum and your pussy throbds around the head of the vibrator.")>>
      <<else>>
        <<arousal 3>><<= either("You press the head to your clit but after a minute or so it feels numb.","Vibrations on your clit are either too much or too little and you can't get it just right.")>> <<= either("@@.mono;Come on... almost there...@@","@@.mono;Oh, not again...@@")>> <<= either("It takes you about 10 minutes of struggling until you realise you won't be able to cum.","You try for about 10 minutes but no avail. With a desperate moan you finally give up.")>>
      <</if>>
        <<= either("It takes you another minute to calm down before you are able to turn off the wand.","Panting you get your senses together before you feel ready to continue your day.")>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    <<else>>
      You look at your pussy just to understand that you won't be able to pleasure yourself with this thing covering it...<<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>
    <</if>>`],
    onUse(n, toy) {
      aw.con.info(`${setup.sexToys.toys[toy].key} action 1`);
      Dialog.close();
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
  },
  benWa: {
    key: "benWa",
    name: "Ben Wa balls",
    desc: "Two hollow balls containing wieghts that roll around for inserting into the vagina.",
    img: "IMG-Item-BenWa",
    type: ["pussyPlug"],
    quality: 1,
    wearable: true,
    size: 1,
    occupied: ["vagina"],
    removable: true,
    price: 20,
    canBuy: true,
    button: "Insert Ben Wa balls",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-ToyBenWa]]</center><br><<set _tim = random(12, 22)>><<addtime _tim>><<set _freeHole = setup.sexToys.check("pc", "vagina")>><<if _freeHole === true>><<set _result = ↂ.pc.body.pussy.insert(setup.sexToys.toys[_toy].size)>>You press the first ball between your <<p 'curwet.q'>> <<p labia.s>> labia <<if _result !== "notfit">><<run setup.sexToys.insert("pc", "vagina", "benWa")>><<= either("and it pops in with a slurping sound.","and it goes in stretching the walls of your pussy.")>> <<= either("The second ball follows the first and they join nested deep inside your vagina.","Second goes in shortly after and you gasp when they find their place inside your pussy.")>><<else>>but your pussy is too tight and dry to accept it.<</if>>
    <<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>`],
    onUse(n, toy) {
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<timed 50ms>><<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">><</timed>>`);
      aw.con.info(`${toy} action 1`);
      if (setup.sexToys.check("pc", "groin") === true && State.temporary.result !== "notfit" && ↂ.toys.parts.vagina === "benWa" && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
        aw.con.info(`benwa omni started`);
        const omni = {
          name: "Ben Wa balls",
          type: "perpetual",
          output: "none",
          interval: 60,
          icon: "IMGstatus_benWa",
          text: "Your pussy is filled with Ben Wa balls.",
          run: `aw.L("pc");
          if (random(0,3) === 1) {
              setup.status.arousal(1);
              setup.notify("You can feel Ben Wa balls moves in your pussy.");
          }
          if (random(0,40) === 1) {
            ↂ.pc.status.bimbo += 1;
            setup.status.record("bimbo", 1, "Rare Ben Wa side effect");
          }
          ↂ.pc.body.pussy.insert(1);
          aw.S("pc");`,
        } as IntOmniData;
        setup.omni.new(omni);
      }
      aw.S();
    },
  },
  golfBall: {
    key: "golfBall",
    name: "Golf ball",
    desc: "The ball for popular game. You probably gonna use it exactly for this purpose, right?",
    img: "IMG-Item-GolfBall",
    type: ["pussyPlug"],
    quality: 1,
    wearable: true,
    size: 2,
    occupied: ["vagina"],
    removable: true,
    price: 0,
    canBuy: true,
    button: "Insert the golf ball",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-GolfBall]]</center><br><<set _tim = random(12, 22)>><<addtime _tim>><<set _freeHole = setup.sexToys.check("pc", "vagina")>><<if _freeHole === true>><<set _result = ↂ.pc.body.pussy.insert(setup.sexToys.toys[_toy].size)>>You press the ball between your <<p 'curwet.q'>> <<p labia.s>> labia <<if _result !== "notfit">><<run setup.sexToys.insert("pc", "vagina", "golfBall")>><<= either("and it pops in with a slurping sound.","and it goes in stretching the walls of your pussy.")>><<else>>but your pussy is too tight and dry to accept it.<</if>>
    <<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>`],
    onUse(n, toy) {
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<timed 50ms>><<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">><</timed>>`);
      aw.con.info(`${toy} action 1`);
      if (setup.sexToys.check("pc", "groin") === true && State.temporary.result !== "notfit" && ↂ.toys.parts.vagina === "golfBall" && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
        aw.con.info(`golfBall omni started`);
        const omni = {
          name: "Golf ball",
          type: "perpetual",
          output: "none",
          interval: 60,
          icon: "IMGstatus_benWa",
          text: "Your pussy is filled with Golf ball.",
          run: `aw.L("pc");
          if (random(0,3) === 1) {
              setup.status.arousal(1);
              setup.notify("You can feel Golf ball moving in your pussy.");
          }
          if (random(0,40) === 1) {
            ↂ.pc.status.bimbo += 1;
            setup.status.record("bimbo", 1, "Putting a golf ball in your pussy");
          }
          ↂ.pc.body.pussy.insert(1);
          aw.S("pc");`,
        } as IntOmniData;
        setup.omni.new(omni);
      }
      aw.S();
    },
  },
  littleMonster: {
    key: "littleMonster",
    name: "Little Monster",
    desc: "The smartphone squirt egg intended to deliver fresh sperm deep into user's pussy. Requires cum for loading.",
    img: "IMG-Item-LittleMonster",
    type: ["pussyPlug"],
    quality: 3,
    wearable: true,
    size: 4,
    occupied: ["vagina"],
    removable: true,
    price: 90,
    canBuy: true,
    button: "Insert Little Monster",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-ToyBenWa]]</center><br><<set _tim = random(12, 22)>><<addtime _tim>><<set _freeHole = setup.sexToys.check("pc", "vagina")>><<if _freeHole === true>><<set _result = ↂ.pc.body.pussy.insert(setup.sexToys.toys[_toy].size)>><<if setup.consumables.hasConsumable("SemenBottle", 1)>><<run State.active.variables.items.drop("SemenBottle")>>You fill the toy's inner tank with fresh semen from the semen bottle you have, close the lid and turn the toy on. You press the toy between your <<p 'curwet.q'>> <<p labia.s>> labia <<if _result !== "notfit">><<run setup.sexToys.insert("pc", "vagina", "littleMonster")>><<= either("and it pops in with a slurping sound.","and it goes in stretching the walls of your pussy.")>> Looking at your smartphone you can see the Monster is functioning well and scheduled to blow the first load in less than 30 minutes.<<else>>but your pussy is too tight and dry to accept it.<</if>><<else>>You realise that you have no semen to fill the toy. @@.mono;I should buy a bottle or two in the grocery, I am sure they have some there...@@<</if>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>`],
    onUse(n, toy) {
      aw.con.info(`${setup.sexToys.toys[toy].key} action 1`);
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      if (setup.sexToys.check("pc", "groin") === true && setup.consumables.hasConsumable("SemenBottle", 1) && State.temporary.result !== "notfit" && ↂ.toys.parts.vagina === "littleMonster" && setup.omni.matching(setup.sexToys.toys[toy].name) === 0) {
        const omni = {
          name: "Little Monster",
          type: "recurring",
          output: "notify",
          times: 6,
          interval: 30,
          icon: "IMGstatus_benWa",
          text: "Your pussy is filled with Little Monster toy.",
          run: `aw.L("pc");
              ↂ.pc.body.pussy.insert(4);
              ↂ.pc.fert.creampie("unknown", 2, "deep");
              setup.drug.eatDrug("cream", 1);
              setup.notify("You feel Little Monster shoot a portion of cum deep inside your pussy.");
              aw.S("pc");`,
        } as IntOmniData;
        setup.omni.new(omni);
      }
      aw.S();
    },
  },
  leatherCuffs: {
    key: "leatherCuffs",
    name: "Leather cuffs",
    desc: "Black arm restrains made of quality leather locked with belts.",
    img: "IMG-Item-LeatherCuffs",
    type: ["bondage"],
    quality: 2,
    wearable: true,
    size: 0,
    occupied: ["arms"],
    removable: true,
    price: 40,
    canBuy: true,
    button: "Put on Leather cuffs",
    menu: false,
    useText: ["Besty error :D", `<center>[img[IMG-LeatherCuffs]]</center><br><<set _tim = random(2, 4)>><<addtime _tim>><<set _freeHole = setup.sexToys.check("pc", "arms")>><<if _freeHole === true>><<run setup.sexToys.insert("pc", "arms", "leatherCuffs")>>You put both cuffs on your arms and fasten the belts to tighten them before clicking the carabine to connect them together behind your back. The surface of the cuffs is somehow pleasurable and you like the strict look they have.<<has sub>><<arousal 1>><<or>><</has>><<else>><<= _freeHole>><</if>><<updatebar>><br><center><<button "Finish">><<run Dialog.close()>><</button>></center>`],
    onUse(n, toy) {
      aw.con.info(`${setup.sexToys.toys[toy].key} action 1`);
      setup.dialog(`${setup.sexToys.toys[toy].name}`, `${setup.sexToys.toys[toy].useText[n]}<<replace "#toysDiv">><<print setup.sexToys.printer()>><</replace>><<set _item = "${toy}">>`);
      aw.S();
    },
  },
};
