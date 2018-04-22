setup.playerHistoryComparison = function(){
  var completecheck = 0;
  function pcChanges(){
    var chList = [];
    try {
      for(var i = 0, names = Object.keys(State.variables.PC); i < names.length; i++){
        try {
          if (State.variables.PC[names[i]] !== State.variables.PChistory.PC[names[i]]){
            chList.push(names[i]);
          }
        }
        catch(err) {
          State.variables.AW.error += 'error in history PC comparison loop, variable: ';
          State.variables.AW.error += State.variables.PC[names[i]] +'-'+ err;
          alert('error in PC comparison loop, check debug for specific variable.');
        }
      }
    }
    catch(errs) {
      State.variables.AW.error += ' loop run error in history PC comparison loop: '+errs+', ';
      alert('ERROR: loop run error in history PC comparison loop!');
    }
    try {
      /*yes, this is lazy as fuck. Ican add proper crap if needed*/
      if (chList.includes('age')){
        State.temporary.pcChange.push("You're a year @@.change;older@@ now");
      }
      if (chList.includes('name')){
        State.temporary.pcChange.push(("Your @@.change;name@@ has been officially changed to "+State.variables.PC.name));
      }
      if (chList.includes('race')){
        State.temporary.pcChange.push(("Somehow, your @@.change;race@@ changed to " + State.variables.PC.body.race));
      }
      if (chList.includes('skinColor')){
        State.temporary.pcChange.push(("Your @@.change;skin color@@ changed, and is now " + State.variables.PC.body.skinColor));
      }
      if (chList.includes('tone')){
        if (State.variables.PC.body.tone > State.variables.PChistory.PC.tone){
          State.temporary.pcChange.push("You've developed some @@.change;muscle@@ this week, and are now <<pcTone>>.");
        } else {
          State.temporary.pcChange.push("You've lost some @@.change;muscle@@ this week, and are now <<pcTone>>.");
        }
      }
      if (chList.includes('weight')){
        if (State.variables.PC.body.weight > State.variables.PChistory.PC.weight){
          State.temporary.pcChange.push("You've been gaining @@.change;weight@@, and have passed the threshold to be considered <<pcWeight>>.");
        } else {
          State.temporary.pcChange.push("You've been losing @@.change;weight@@, and have finally passed the threshold to be considered <<pcWeight>>.");
        }
      }
      if (chList.includes('shoulders')){
        if (State.variables.PC.body.shoulders > State.variables.PChistory.PC.shoulders){
          State.temporary.pcChange.push("By some miracle--or horror--of modern science, your @@.change;shoulders@@ have widened to be <<pcShoulders>>.");
        } else {
          State.temporary.pcChange.push("By some miracle--or horror--of modern science, your @@.good;shoulders@@ have narrowed to be <<pcShoulders>>.");
        }
      }
      if (chList.includes('hips')){
        if (State.variables.PC.body.hips > State.variables.PChistory.PC.hips){
          State.temporary.pcChange.push("By some miracle--or horror--of modern science, your @@.good;hips@@ have widened to be <<pcHips>>.");
        } else {
          State.temporary.pcChange.push("By some miracle--or horror--of modern science, your @@.change;hips@@ have narrowed to be <<pcHips>>.");
        }
      }
      if (chList.includes('height')){
        if (State.variables.PC.body.height > State.variables.PChistory.PC.height){
          State.temporary.pcChange.push("By some miracle--or horror--of modern science, you've grown @@.change;taller@@.");
        } else {
          State.temporary.pcChange.push("By some miracle--or horror--of modern science, your @@.change;height@@ has shrunk.");
        }
      }
      if (chList.includes('ass')){
        if (State.variables.PC.body.ass > State.variables.PChistory.PC.ass){
          State.temporary.pcChange.push("Your @@.change;hindquarters@@ have grown, and can now be considered <<pcAss>>.");
        } else {
          State.temporary.pcChange.push("Your @@.change;hindquarters@@ have shrunk, and can now be considered <<pcAss>>.");
        }
      }
      if (chList.includes('tits')){
        if (State.variables.PC.body.tits > State.variables.PChistory.PC.tits){
          State.temporary.pcChange.push("Your <<= $PC.body.tits.shape>> @@.good;breasts@@ have grown, swelling to a <<pcCupSize>> in size.");
        } else if (State.variables.PC.body.tits < (State.variables.PChistory.PC.tits - 1)){
          State.variables.PC.titShape = "saggy";
          State.temporary.pcChange.push("Your @@.bad;breasts@@ have deflated rapidly, becoming droopy, and are now only a <<pcCupSize>> in size.");
        } else {
          State.temporary.pcChange.push("Your <<= $PC.body.tits.shape>> @@.change;breasts@@ have shrunk slightly, and are now only a <<pcCupSize>> in size.");
        }
      }
      /*for orifice sizes*/
      if (chList.includes('pussy')){
        if (State.variables.PC.body.pussy > State.variables.PChistory.PC.pussy){
          State.temporary.pcChange.push("Your <<pcWetness>> @@.change;pussy@@ has gotten some use, and has stretched into a <<pcPussySize>> cunt.");
        } else {
          State.temporary.pcChange.push("Your <<pcWetness>> @@.change;pussy@@ has somehow managed to tighten up into a <<pcPussySize>> cunt.");
        }
      }
      if (chList.includes('asshole')){
        if (State.variables.PC.body.asshole > State.variables.PChistory.PC.asshole){
          State.temporary.pcChange.push("Your rear end has gotten some use, and has stretched into a <<pcAssholeSize>> @@.change;asshole@@.");
        } else {
          State.temporary.pcChange.push("Your rear end has somehow managed to tighten up into a <<pcAssholeSize>> @@.change;asshole@@.");
        }
      }
      /*more generic items*/
      if (chList.includes('clit')){
        if (State.variables.PC.body.clit > State.variables.PChistory.PC.clit){
          State.temporary.pcChange.push("Your @@.change;clit@@ has grown in size, becoming <<pcClitSize>>.");
        } else {
          State.temporary.pcChange.push("Your @@.change;clit@@ has shrunk in size, becoming <<pcClitSize>>.");
        }
      }
      if (chList.includes('labia')){
        if (State.variables.PC.body.labia > State.variables.PChistory.PC.labia){
          State.temporary.pcChange.push("Your @@.change;pussy lips@@ have gotten larger, becoming <<pcClitSize>>.");
        } else {
          State.temporary.pcChange.push("Your @@.change;pussy lips@@ have gotten smaller, becoming <<pcClitSize>>.");
        }
      }
      if (chList.includes('beauty')){
        if (State.variables.PC.body.beauty > State.variables.PChistory.PC.beauty){
          State.temporary.pcChange.push("Your @@.good;face@@ has changed somewhat, morphing ever so lightly, resulting in you becoming more beautiful.");
        } else {
          State.temporary.pcChange.push("Your @@.bad;face@@ has changed somewhat, morphing ever so lightly, resulting in you becoming less attractive.");
        }
      }
      if (chList.includes('face')){
        State.temporary.pcChange.push("Your @@.change;face@@ has changed somewhat, morphing ever so lightly, resulting in a more <<= $PC.body.face>> appearance.");
      }
      if (chList.includes('wetness')){
        if (State.variables.PC.body.wetness > State.variables.PChistory.PC.wetness){
          State.temporary.pcChange.push("Your <<pcWetness>> pussy seems to have become more @@.change;wet@@ overall, and seems to get @@.change;wet@@ faster as well.");
        } else {
          State.temporary.pcChange.push("Your <<pcWetness>> pussy seems to have become less @@.change;wet@@ overall, and it also seems to take longer to get @@.change;wet@@ as well.");
        }
      }
      if (chList.includes('fertility')){
        if (State.variables.PC.fert.fertility > State.variables.PChistory.PC.fertility){
          State.temporary.pcChange.push("Something must be going right, because you have the feeling that your @@.good;fertility@@ has increased. You're now <<pcFertility>>.");
        } else {
          State.temporary.pcChange.push("Something must have gone horribly wrong, because you have the feeling that your @@.bad;fertility@@ has decreased. You're now <<pcFertility>>.");
        }
      }
      if (chList.includes('pregTerm')){
        if (State.variables.PC.body.pregTerm > State.variables.PChistory.PC.pregTerm){
          State.temporary.pcChange.push("Your smart toilet has informed you that based on this week's hormonal analysis, it seems that your body's @@.change;gestation@@ process for babies will take longer.");
        } else {
          State.temporary.pcChange.push("Your smart toilet has informed you that based on this week's hormonal analysis, it seems that your body has gotten better at growing babies, meaning that @@.change;gestation@@ will be shorter.");
        }
      }
      if (chList.includes('lactation')){
        if (State.variables.PC.body.lactation > State.variables.PChistory.PC.lactation){
          State.temporary.pcChange.push("Your breasts have gotten better at making @@.good;milk@@, and they will produce it faster than before.");
        } else {
          State.temporary.pcChange.push("Your breasts have lost some of their ability to make @@.bad;milk@@, and they will produce it slower than before.");
        }
      }
      if (chList.includes('orgasm')){
        if (State.variables.PC.body.orgasm > State.variables.PChistory.PC.orgasm){
          State.temporary.pcChange.push("Your @@.bad;genitals@@ have gotten less sensitive for some reason, and you've noticed that it seems to take you longer to reach orgasm.");
        } else {
          State.temporary.pcChange.push("Your @@.good;genitals@@ have gotten more sensitive lately, and you've noticed that you seem to be able to reach orgasm quicker.");
        }
      }
      if (chList.includes('energy')){
        if (State.variables.PC.body.energy > State.variables.PChistory.PC.energy){
          State.temporary.pcChange.push("Your improving fitness seems to be resulting in some extra @@.good;stamina@@, it takes you longer to get worn out.");
        } else {
          State.temporary.pcChange.push("Your health and fitness don't seem to be in the best shape, resulting in reduced @@.bad;stamina@@.");
        }
      }
      if (chList.includes('nipple')){
        State.temporary.pcChange.push("You've noticed that your @@.change;nipples@@ look a bit different than before, and now look <<=$PC.body.tits.nipple>>.");
      }
      if (chList.includes('eyeColor')){
        State.temporary.pcChange.push("your @@.change;eye color@@ has somehow changed! They are now <<= $PC.body.eyeColor>>.");
      }
      /*debatable... will have to see how this plays out, but it probably will be okay to include in a weekly report.*/
      if (chList.includes('ATR')){
        if (State.variables.PC.body.ATR > State.variables.PChistory.PC.ATR){
          State.temporary.pcChange.push("Overall, your body has become @@.good;more attractive@@ over the last week.");
        } else {
          State.temporary.pcChange.push("Overall, your body has become @@.bad;less attractive@@ over the last week.");
        }
      }
      State.variables.PChistory.PC = {};
      State.variables.PChistory.PC = jQuery.extend(true, {}, State.variables.PC);
    }
    catch(err){
      State.variables.AW.error += "Error generating array of body change texts, PC changes in history function. Error: "+err;
      alert('Error generating text for body changes, see debug menu for details.');
    }
    completecheck++;
  }
  function statusChanges(){
    var chList = [];
    try {
      for(var i = 0, names = Object.keys(State.variables.PC.status); i < names.length; i++){
        try {
          if (State.variables.PC.status[names[i]] !== State.variables.PChistory.status[names[i]]){
            chList.push(names[i]);
          }
        }
        catch(err) {
          State.variables.AW.error += 'error in history status comparison loop, variable: ';
          State.variables.AW.error += State.variables.PC.status[names[i]] +'-'+ err;
          alert('error in status comparison loop, check debug for specific variable.');
        }
      }
    }
    catch(errs) {
      State.variables.AW.error += ' loop run error in history status comparison loop: '+errs+', ';
      alert('ERROR: loop run error in history status comparison loop!');
    }
    try {
      if (chList.includes('birthConType')){
        State.temporary.statusChange.push("Your birth control changed this week, you're <<if $PC.status.birthConType == 'none'>>not using birth control anymore<<else>>now using <<= $PC.status.birthConType>>.");
      }
      if (chList.includes('pregA')){
        if (State.variables.PC.status.wombA.weeks !== 0){
          if (State.variables.PC.status.wombA.know){
            State.temporary.statusChange.push("Your smart toilet reports pointlessly that you're still pregnant.");
          }else{
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you are pregnant. @@.mono;They don't program these things for sensitivity, do they?@@");
            State.variables.PC.status.wombA.know = true;
          }
        }else if (State.variables.PC.status.wombA.know){
          if (State.variables.PChistory.status.wombA.weeks <= 5){
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;They don't program these things for sensitivity, do they?@@");
          }else{
            State.temporary.statusChange.push("Your smart toilet tells you that you've given birth to your pregnancy. @@.mono;Yeah, no shit.@@");
          }
        }else{
          /*just for GreZZo...*/
          if (State.variables.PChistory.status.wombA.weeks <= 5){
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;What the?.. I didn't even know I was pregnant!@@");
          }else{
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you've given birth to your pregnancy. @@.mono;No shit. Wish you'd told me ''before'' I gave birth.@@");
          }
        }
      }
      if (chList.includes('pregB')){
        if (State.variables.PC.status.wombB.weeks !== 0){
          if (State.variables.PC.status.wombB.know){
            State.temporary.statusChange.push("Your smart toilet reports pointlessly that you're still pregnant.");
          }else{
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you are pregnant. @@.mono;They don't program these things for sensitivity, do they?@@");
            State.variables.PC.status.wombB.know = true;
          }
        }else if (State.variables.PC.status.wombB.know){
          if (State.variables.PChistory.status.wombB.weeks <= 5){
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;They don't program these things for sensitivity, do they?@@");
          }else{
            State.temporary.statusChange.push("Your smart toilet tells you that you've given birth to your pregnancy. @@.mono;Yeah, no shit.@@");
          }
        }else{
          /*just for GreZZo...*/
          if (State.variables.PChistory.status.wombB.weeks <= 5){
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you've had a miscarriage. @@.mono;What the?.. I didn't even know I was pregnant!@@");
          }else{
            State.temporary.statusChange.push("Your smart toilet unceremoniously tells you that you've given birth to your pregnancy. @@.mono;No shit. Wish you'd told me ''before'' I gave birth.@@");
          }
        }
      }
      if (chList.includes('happy')){
        if (State.variables.PC.status.happy > (State.variables.PChistory.status.happy + 4)){
          State.temporary.statusChange.push("Your @@.good;happiness@@ has improved considerably this week.");
        } else if(State.variables.PC.status.happy < (State.variables.PChistory.PC.happy - 4)){
          State.temporary.statusChange.push("You're a lot less @@.bad;happy@@ than you were before.");
        }
      }
      if (chList.includes('lonely')){
        if (State.variables.PC.status.lonely > (State.variables.PChistory.status.lonely + 35)){
          State.temporary.statusChange.push("You haven't been interacting much with other people this week, and you seem to be a lot more @@.bad;lonely@@ than before.");
        } else if(State.variables.PC.status.lonely < (State.variables.PChistory.status.lonely - 35)){
          State.temporary.statusChange.push("You were able to enjoy a lot of social activities this week, and you're a lot less @@.good;lonely@@ than you were before.");
        }
      }
      if (chList.includes('health')){
        if (State.variables.PC.status.health > (State.variables.PChistory.status.health + 30)){
          State.temporary.statusChange.push("Your @@.good;health@@ has improved a great deal this week, and you're feeling much better as a result.");
        } else if(State.variables.PC.status.health < (State.variables.PChistory.status.health - 30)){
          State.temporary.statusChange.push("Your @@.bad;health@@ took a nosedive this week, and you certainly don't feel at your best.");
        }
      }
      if (chList.includes('stress')){
        if (State.variables.PC.status.stress > (State.variables.PChistory.status.stress + 30)){
          State.temporary.statusChange.push("Your @@.bad;stress@@ has skyrocketed this week, and you feel much more on-edge.");
        } else if(State.variables.PC.status.stress < (State.variables.PChistory.status.stress - 30)){
          State.temporary.statusChange.push("Your @@.good;stress@@ level dropped considerably this week, and you certainly feel more at ease.");
        }
      }
      if (chList.includes('morality')){
        if (State.variables.PC.status.morality > (State.variables.PChistory.status.morality + 20)){
          State.temporary.statusChange.push("Your @@.good;morality@@ has improved a great deal this week, and you're feeling like a better person.");
        } else if(State.variables.PC.status.morality < (State.variables.PChistory.status.morality - 20)){
          State.temporary.statusChange.push("Your @@.bad;morality@@ decreased significantly this week.");
        }
      }
      if (chList.includes('perversion')){
        if (State.variables.PC.status.perversion > (State.variables.PChistory.status.perversion + 20)){
          State.temporary.statusChange.push("Your @@.change;perversion@@ has increased significantly this week");
        } else if(State.variables.PC.status.perversion < (State.variables.PChistory.status.perversion - 20)){
          State.temporary.statusChange.push("Your @@.change;perversion@@ has decreased significantly this week.");
        }
      }
      if (chList.includes('bimbo')){
        if (State.variables.PC.status.bimbo > (State.variables.PChistory.status.bimbo + 25)){
          State.temporary.statusChange.push("You feel, like, @@;way better@@ about things.");
        } else if(State.variables.PC.status.bimbo < (State.variables.PChistory.status.bimbo - 25)){
          State.temporary.statusChange.push("You feel a lot @@.good;more aware@@ about the course your life is taking than you did last week.");
        }
      }
      if (chList.includes('addictSex')){
        if (State.variables.PC.status.addictSex > (State.variables.PChistory.status.addictSex + 10)){
          State.temporary.statusChange.push("Your @@.bad;sex addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictSex < (State.variables.PChistory.status.addictSex - 10)){
          State.temporary.statusChange.push("Your @@.good;sex addiction@@ decreased noticeably this week.");
        }
      }
      if (chList.includes('addictAlc')){
        if (State.variables.PC.status.addictAlc > (State.variables.PChistory.status.addictAlc + 10)){
          State.temporary.statusChange.push("Your @@.bad;alcohol addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictAlc < (State.variables.PChistory.status.addictAlc - 10)){
          State.temporary.statusChange.push("Your @@.good;alcohol addiction@@ decreased noticeably this week.");
        }
      }
      if (chList.includes('addictHeat')){
        if (State.variables.PC.status.addictHeat > (State.variables.PChistory.status.addictHeat + 10)){
          State.temporary.statusChange.push("Your @@.bad;heat addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictHeat < (State.variables.PChistory.status.addictHeat - 10)){
          State.temporary.statusChange.push("Your @@.good;heat addiction@@ decreased noticeably this week.");
        }
      }
      if (chList.includes('addictSatyr')){
        if (State.variables.PC.status.addictSatyr > (State.variables.PChistory.status.addictSatyr + 10)){
          State.temporary.statusChange.push("Your @@.bad;satyr addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictSatyr < (State.variables.PChistory.status.addictSatyr - 10)){
          State.temporary.statusChange.push("Your @@.good;satyr addiction@@ decreased noticeably this week.");
        }
      }
      if (chList.includes('addictFocus')){
        if (State.variables.PC.status.addictFocus > (State.variables.PChistory.status.addictFocus + 10)){
          State.temporary.statusChange.push("Your @@.bad;focus addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictFocus < (State.variables.PChistory.status.addictFocus - 10)){
          State.temporary.statusChange.push("Your @@.good;focus addiction@@ decreased noticeably this week.");
        }
      }
      if (chList.includes('addictCum')){
        if (State.variables.PC.status.addictCum > (State.variables.PChistory.status.addictCum + 10)){
          State.temporary.statusChange.push("Your @@.bad;cum addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictCum < (State.variables.PChistory.status.addictCum - 10)){
          State.temporary.statusChange.push("Your @@.good;cum addiction@@ decreased noticeably this week.");
        }
      }
      if (chList.includes('addictZone')){
        if (State.variables.PC.status.addictZone > (State.variables.PChistory.status.addictZone + 10)){
          State.temporary.statusChange.push("Your @@.bad;zone addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictZone < (State.variables.PChistory.status.addictZone - 10)){
          State.temporary.statusChange.push("Your @@.good;zone addiction@@ decreased noticeably this week.");
        }
      }
      if (chList.includes('addictCream')){
        if (State.variables.PC.status.addictCream > (State.variables.PChistory.status.addictCream + 10)){
          State.temporary.statusChange.push("Your @@.bad;creampie addiction@@ increased noticeably this week.");
        } else if(State.variables.PC.status.addictCream < (State.variables.PChistory.status.addictCream - 10)){
          State.temporary.statusChange.push("Your @@.good;creampie addiction@@ decreased noticeably this week.");
        }
      }
    }
    catch(err){
      State.variables.AW.error += "Error generating array of status change texts, status changes in history function. Error: "+err;
      alert('Error generating text for status changes, see debug menu for details.');
    }
    completecheck++;
  }
  function traitChanges(){
    var chList = [];
    try {
      for(var i = 0, names = Object.keys(State.variables.PC.trait); i < names.length; i++){
        try {
          if (State.variables.PC.trait[names[i]] !== State.variables.PChistory.trait[names[i]]){
            chList.push(names[i]);
          }
        }
        catch(err) {
          State.variables.AW.error += 'error in history trait comparison loop, variable: ';
          State.variables.AW.error += State.variables.PC.trait[names[i]] +'-'+ err;
          alert('error in trait comparison loop, check debug for specific variable.');
        }
      }
    }
    catch(errs) {
      State.variables.AW.error += ' loop run error in history trait comparison loop: '+errs+', ';
      alert('ERROR: loop run error in history trait comparison loop!');
    }
    try {
      var cuntNoodle;
      for(var j = 0; j < chList.length; j++){
        if (chList[j] === 'IE' || chList[j] === 'IN' || chList[j] === 'EX' || chList[j] === 'OC' || chList[j] === 'OP' || chList[j] === 'CL' ){
          State.temporary.traitChange.push("@@.bad;font-size:125%;You are the bad kind of cheater, that is, the one who breaks their game trying to cheat. Try again without editing a variable that will break the game.@@");
        }else{
          cuntNoodle = "You feel like your personality has changed somehow... Something to do with ";
          cuntNoodle += chList[j];
          cuntNoodle += ", perhaps.";
          State.temporary.traitChange.push(cuntNoodle);
        }
      }
    }
    catch(err){
      State.variables.AW.error += "Error generating array of trait change texts, trait changes in history function. Error: "+err;
      alert('Error generating text for trait changes, see debug menu for details, motherfucker.');
    }
    completecheck++;
  }
  function kinkChanges(){
    var chList = [];
    try {
      for(var i = 0, names = Object.keys(State.variables.PC.kink); i < names.length; i++){
        try {
          if (State.variables.PC.kink[names[i]] !== State.variables.PChistory.kink[names[i]]){
            chList.push(names[i]);
          }
        }
        catch(err) {
          State.variables.AW.error += 'error in history kink comparison loop, variable: ';
          State.variables.AW.error += State.variables.PC.kink[names[i]] +'-'+ err;
          alert('error in kink comparison loop, check debug for specific variable.');
        }
      }
    }
    catch(errs) {
      State.variables.AW.error += ' loop run error in history kink comparison loop: '+errs+', ';
      alert('ERROR: loop run error in history kink comparison loop!');
    }
    try {
      var cuntNoodle = "empty";
      for(var j = 0; j < chList.length; j++){
        if (State.variables.PC.kink[chList[j]]){
          cuntNoodle = "You've gained the " + chList[j] + " kink this week.";
          State.temporary.kinkChange.push(cuntNoodle);
        }else{
          cuntNoodle = "You lost the " + chList[j] + " kink this week.";
          State.temporary.kinkChange.push(cuntNoodle);
        }
      }
    }
    catch(err){
      State.variables.AW.error += "Error generating array of kink change texts, kink changes in history function. Error: "+err;
      alert('Error generating text for kink changes, see debug menu for details.');
    }
    completecheck++;
  }
  function mutateChanges(){
    var chList = [];
    try {
      for(var i = 0, names = Object.keys(State.variables.PC.mutate); i < names.length; i++){
        try {
          if (State.variables.PC.mutate[names[i]] !== State.variables.PChistory.mutate[names[i]]){
            chList.push(names[i]);
          }
        }
        catch(err) {
          State.variables.AW.error += 'error in history mutate comparison loop, variable: ';
          State.variables.AW.error += State.variables.PC.mutate[names[i]] +'-'+ err;
          alert('error in mutate comparison loop, check debug for specific variable.');
        }
      }
    }
    catch(errs) {
      State.variables.AW.error += ' loop run error in history mutate comparison loop: '+errs+', ';
      alert('ERROR: loop run error in history mutate comparison loop!');
    }
    try {
      var cuntNoodle;
      for(var j = 0; j < chList.length; j++){
        if (State.variables.PC.mutate[chList[j]]){
          cuntNoodle = "You gained the "+chList[j]+" mutation this week.";
          State.temporary.mutateChange.push(cuntNoodle);
        }else{
          cuntNoodle = "You lost the "+chList[j]+" mutation this week.";
          State.temporary.mutateChange.push(cuntNoodle);
        }
      }
    }
    catch(err){
      State.variables.AW.error += "Error generating array of mutate change texts, mutate changes in history function. Error: "+err;
      alert('Error generating text for mutate changes, see debug menu for details.');
    }
    completecheck++;
  }
  function skillChanges(){
    var chList = [];
    try {
      for(var i = 0, names = Object.keys(State.variables.PC.skill); i < names.length; i++){
        try {
          if (State.variables.PC.skill[names[i]] !== State.variables.PChistory.skill[names[i]]){
            chList.push(names[i]);
          }
        }
        catch(err) {
          State.variables.AW.error += 'error in history skill comparison loop, variable: ';
          State.variables.AW.error += State.variables.PC.skill[names[i]] +'-'+ err;
          alert('error in skill comparison loop, check debug for specific variable.');
        }
      }
    }
    catch(errs) {
      State.variables.AW.error += ' loop run error in history skill comparison loop: '+errs+', ';
      alert('ERROR: loop run error in history skill comparison loop!');
    }
    try {
      var tits;
      State.temporary.skillChange = "<table id='menu'><tr id='menu'><td id='menu' colspan='2'>@@.head2;Skill Changes@@</td></tr><tr id='menu'><td id='menu' width='50%'><table><tr><td colspan='2'>@@.head4;Sex Skill Changes@@</td></tr>";
      if (chList.includes('sex')){
        tits = "<tr><td width='70%'>''Sex Skill''</td><td>";
        if (State.variables.PC.skill.sex > State.variables.PChistory.skill.sex){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.sex - State.variables.PChistory.skill.sex);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.sex - State.variables.PC.skill.sex);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('oral')){
        tits = "<tr><td width='70%'>''Oral Skill''</td><td>";
        if (State.variables.PC.skill.oral > State.variables.PChistory.skill.oral){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.oral - State.variables.PChistory.skill.oral);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.oral - State.variables.PC.skill.oral);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('exhibition')){
        tits = "<tr><td width='70%'>''Exhibitionism Level''</td><td>";
        if (State.variables.PC.skill.exhibition > State.variables.PChistory.skill.exhibition){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.exhibition - State.variables.PChistory.skill.exhibition);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.exhibition - State.variables.PC.skill.exhibition);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('prostitute')){
        tits = "<tr><td width='70%'>''Prostitution Skill''</td><td>";
        if (State.variables.PC.skill.prostitute > State.variables.PChistory.skill.prostitute){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.prostitute - State.variables.PChistory.skill.prostitute);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.prostitute - State.variables.PC.skill.prostitute);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('seduction')){
        tits = "<tr><td width='70%'>''Seduction Skill''</td><td>";
        if (State.variables.PC.skill.seduction > State.variables.PChistory.skill.seduction){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.seduction - State.variables.PChistory.skill.seduction);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.seduction - State.variables.PC.skill.seduction);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      State.temporary.skillChange += "</table></td><td id='menu'><table><tr><td colspan='2'>@@.head4;Work Skill Changes@@</td></tr>";
      if (chList.includes('comm')){
        tits = "<tr><td width='70%'>''Communication Skill''</td><td>";
        if (State.variables.PC.skill.comm > State.variables.PChistory.skill.comm){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.comm - State.variables.PChistory.skill.comm);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.comm - State.variables.PC.skill.comm);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('org')){
        tits = "<tr><td width='70%'>''Organization Skill''</td><td>";
        if (State.variables.PC.skill.org > State.variables.PChistory.skill.org){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.org - State.variables.PChistory.skill.org);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.org - State.variables.PC.skill.org);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('probSolving')){
        tits = "<tr><td width='70%'>''Problem Solving Skill''</td><td>";
        if (State.variables.PC.skill.probSolving > State.variables.PChistory.skill.probSolving){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.probSolving - State.variables.PChistory.skill.probSolving);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.probSolving - State.variables.PC.skill.probSolving);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('finance')){
        tits = "<tr><td width='70%'>''Finance Skill''</td><td>";
        if (State.variables.PC.skill.finance > State.variables.PChistory.skill.finance){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.finance - State.variables.PChistory.skill.finance);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.finance - State.variables.PC.skill.finance);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      State.temporary.skillChange += "</table></td></tr><tr id='menu'><td id='menu'><table><tr><td colspan='2'>@@.head4;Other Skill Changes@@</td></tr>";
      if (chList.includes('art')){
        tits = "<tr><td width='70%'>''Aesthetics Skill''</td><td>";
        if (State.variables.PC.skill.art > State.variables.PChistory.skill.art){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.art - State.variables.PChistory.skill.art);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.art - State.variables.PC.skill.art);
          tits += ")@@</td></tr>";
        }
      }
      if (chList.includes('athletic')){
        tits = "<tr><td width='70%'>''Aesthetics Skill''</td><td>";
        if (State.variables.PC.skill.art > State.variables.PChistory.skill.art){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.art - State.variables.PChistory.skill.art);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.art - State.variables.PC.skill.art);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('dancing')){
        tits = "<tr><td width='70%'>''Dancing Skill''</td><td>";
        if (State.variables.PC.skill.dancing > State.variables.PChistory.skill.dancing){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.dancing - State.variables.PChistory.skill.dancing);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.dancing - State.variables.PC.skill.dancing);
          tits += ")@@</td></tr>";
        }
      }
      if (chList.includes('clean')){
        tits = "<tr><td width='70%'>''Cleaning Skill''</td><td>";
        if (State.variables.PC.skill.clean > State.variables.PChistory.skill.clean){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.clean - State.variables.PChistory.skill.clean);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.clean - State.variables.PC.skill.clean);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      if (chList.includes('shop')){
        tits = "<tr><td width='70%'>''Shopping Skill''</td><td>";
        if (State.variables.PC.skill.shop > State.variables.PChistory.skill.shop){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.shop - State.variables.PChistory.skill.shop);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.shop - State.variables.PC.skill.shop);
          tits += ")@@</td></tr>";
        }
      }
      if (chList.includes('cook')){
        tits = "<tr><td width='70%'>''Cooking Skill''</td><td>";
        if (State.variables.PC.skill.cook > State.variables.PChistory.skill.cook){
          tits += "@@.good;";
          tits += (State.variables.PC.skill.cook - State.variables.PChistory.skill.cook);
          tits += "@@</td></tr>";
        } else {
          tits += "@@.bad;(";
          tits += (State.variables.PChistory.skill.cook - State.variables.PC.skill.cook);
          tits += ")@@</td></tr>";
        }
        State.temporary.skillChange += tits;
      }
      State.temporary.skillChange += "</table></td><td id='menu'></td></tr></table>";
    }
    catch(err){
      State.variables.AW.error += "Error generating array of skill change texts, skill changes in history function. Error: "+err;
      alert('Error generating text for skill changes, see debug menu for details.');
    }
    completecheck++;
  }
  /* check future items properties for array types to exclude generic item counts from change report.*/
  function itemChanges(){
    var newItems = "''You obtained these items during the week`:`''";
    var newCunt = 0;
    var lostItems = "''You lost these items during the week`:`''";
    var lostCunt = 0;
    try {
      for(var i = 0, names = Object.keys(State.variables.items); i < names.length; i++){
        try {
          if (names[i] !== 'Condoms' && names[i] !== 'CondomsSab' && names[i] !== 'CondomsSabGood' && names[i] !== 'CondomsSabSupr' && names[i] !== 'FertiliTea'){
            if (State.variables.items[names[i]] && !State.variables.PChistory.item[names[i]]){
              if (newCunt !== 0){
                newItems += ",";
              }
              newItems += " " + [names[i]];
              newCunt++;
            }else if(!State.variables.items[names[i]] && State.variables.PChistory.item[names[i]]){
              if (lostCunt !== 0){
                lostItems += ",";
              }
              lostItems += " " + [names[i]];
              lostCunt++;
            }
          }
        }
        catch(err) {
          State.variables.AW.error += 'error in history item comparison loop, variable: ';
          State.variables.AW.error += State.variables.items[names[i]] +'-'+ err;
          alert('error in item comparison loop, check debug for specific variable.');
        }
      }
    }
    catch(errs) {
      State.variables.AW.error += ' loop run error in history item comparison loop: '+errs+', ';
      aw.con.warn('ERROR: loop run error in history item comparison loop!');
    }
    State.temporary.itemChange = "@@.head3;Inventory Changes@@<br>";
    if (newCunt === 0 && lostCunt === 0){
      State.temporary.itemChange = "No changes to items this week.<br>";
    }
    if (newCunt !== 0){
      newItems += "." + "<br>";
      State.temporary.itemChange += newItems;
    }
    if (lostCunt !== 0){
      lostItems += "." + "<br>";
      State.temporary.itemChange += lostItems;
    }
    completecheck++;
  }
  /* actually complete home comparison when home system variables ready*/
  function homeChanges(){
    State.variables.home.finance.spending = State.variables.AW.cash - State.variables.home.finance.cash;
    State.variables.home.finance.cash = State.variables.AW.cash;
    completecheck++;
  }
  /*diferent because most job change information is covered at "end of day" in the job system. Only going to cover certain items here.*/
  function jobChanges(){
    var tits = 0;
    try{
      State.temporary.jobChange = "@@.head3;Employment Changes@@<br>";
      if(State.variables.job.employer !== State.variables.PChistory.job.employer){
        tits++;
        State.temporary.jobChange += "''New Employer'' "+State.variables.job.employer+"<br>";
        State.temporary.jobChange += "''New Job'' "+State.variables.job.name+"<br>";
      }
      if (State.variables.job.stats.rank !== State.variables.PChistory.job.stats.rank){
        if(State.variables.job.name !== State.variables.PChistory.job.name){
          tits++;
          State.temporary.jobChange += "''Promoted To'' "+State.variables.job.name+"<br>";
        }else{
          State.temporary.jobChange += "''You Received a Promotion''<br>";
        }
        tits++;
      }
      var payd;
      if(State.variables.job.payrate > State.variables.PChistory.job.payrate){
        payd = State.variables.job.payrate - State.variables.PChistory.job.payrate;
        State.temporary.jobChange += "@@.good;''You Got A Raise!''@@ Wages increased by @@.money;<<mon>>"+payd+"@@/hr to a total of @@.money;<<mon>>"+State.variables.job.payrate+"@@/hr.";
        tits++;
      }else if(State.variables.job.payrate < State.variables.PChistory.job.payrate){
        payd = State.variables.PChistory.job.payrate - State.variables.job.payrate;
        State.temporary.jobChange += "@@.bad;''Your Pay Was Cut!''@@ Wages reduced by @@.money;<<mon>>"+payd+"@@/hr to a total of @@.money;<<mon>>"+State.variables.job.payrate+"@@/hr.";
        tits++;
      }
      if(tits === 0){
        State.temporary.jobChange += "No significant changes this week.";
      }
    }
    catch(err){
      State.variables.AW.error += "Error generating job changes in history function. Error: "+err;
      alert('Error generating text for job changes, see debug menu for details.');
    }
    completecheck++;
  }
  setTimeout(pcChanges());
  setTimeout(statusChanges());
  setTimeout(traitChanges());
  setTimeout(mutateChanges());
  setTimeout(kinkChanges());
  setTimeout(skillChanges());
  setTimeout(itemChanges());
  setTimeout(homeChanges());
  setTimeout(jobChanges());
  setTimeout(function(){
    aw.con.warn(`Week History function failed to complete w/i 2 seconds, ${completecheck} of 9 subfunctions complete.`);
    completecheck = 9;
  },2000);
  while(completecheck < 9);
  setup.week.bar(8);
  return true;
};
