/*
/  ██╗    ██╗███████╗███████╗██╗  ██╗
/  ██║    ██║██╔════╝██╔════╝██║ ██╔╝
/  ██║ █╗ ██║█████╗  █████╗  █████╔╝
/  ██║███╗██║██╔══╝  ██╔══╝  ██╔═██╗
/  ╚███╔███╔╝███████╗███████╗██║  ██╗
/   ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═╝
*/

setup.week = {
  bar: function(t=5){
    setup.pBar.add("#weekpbar",t);
  },
  start: function(){
    aw.L();
    //setup.playerHistoryComparison();
    return "<div>Testing div</div>";
  },
  tutorial: function(){},
  npcProc: function(){
    setTimeout(function(){
      setup.week.bar(5);
    },1200);
    setTimeout(function(){
      setup.week.bar(12);
    },2300);
    setTimeout(function(){
      setup.week.bar(10);
    },3000);
    setTimeout(function(){
      setup.week.bar(15);
    },3800);
    setTimeout(function(){
      setup.week.bar(10);
    },4500);
    setTimeout(function(){
      setup.week.bar(7);
    },5200);
    setTimeout(function(){
      setup.week.bar(13);
    },5500);
    setTimeout(function(){
      setup.week.bar(7);
    },5900);
  },
};