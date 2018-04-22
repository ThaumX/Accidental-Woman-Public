/*bathroom functions*/

setup.bath = {
  brushTeeth : function(){
    let t = State.active.variables.time,
      d = State.active.variables.date;
    aw.L();
    State.active.variables.PC.groom.lastToothbrush = [t[0],d[0],d[1],d[2]];
    aw.S();
    setup.time.add(5);
    setup.refresh();
    setup.notify("You brushed your teeth");
    return;
  },
};
