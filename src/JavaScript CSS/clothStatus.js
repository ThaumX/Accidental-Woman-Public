Macro.add("clothStatus", {
  handler: function () {
    let out = setup.clothStatus(this.args[0]);
    return new Wikifier(this.output, out);
  }
});

setup.clothStatus = function(input) {
    let clothLoc = {
        "p": State.variables.PC.clothes.panties[5],
        "b": State.variables.PC.clothes.bra[5],
        "le": State.variables.PC.clothes.leg[5],
        "u": State.variables.PC.clothes.upper[5],
        "o": State.variables.PC.clothes.over[5],
        "d": State.variables.PC.clothes.dress[5],
        "lo": State.variables.PC.clothes.lower[5]
    };
    let saffron = clothLoc[input];
    let gat = ["normal", "displayed", "removed", "stained", "damaged", "damp(water)", "wet(water)", "soaked(water)", "drenched(water)", "damp(cum)", "wet(cum)","soaked(cum)","drenched(cum)"];
    return gat[saffron] || "clothStatus failed to find a status";
};
