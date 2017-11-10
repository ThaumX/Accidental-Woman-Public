/*define NPCs as a class with specific properties and methods*/
class NPC {
    constructor(body,main,locations,bground,rship,sex,flag,friends,clothes,status,cond,outfit,mutate,pref,person,fert) {
        this.body = jQuery.extend(true, {}, body);
        this.main = jQuery.extend(true, {}, main);
        this.locations = jQuery.extend(true, {}, locations);
        this.bground = jQuery.extend(true, {}, bground);
        this.rship = jQuery.extend(true, {}, rship);
        this.sex = jQuery.extend(true, {},sex);
        this.flag = jQuery.extend(true, {},flag);
        this.friends = jQuery.extend(true, {},friends);
        this.clothes = jQuery.extend(true, {}, clothes);
        this.status = jQuery.extend(true, {}, status);
        this.cond = jQuery.extend(true, {}, cond);
        this.outfit = jQuery.extend(true, {}, outfit);
        this.mutate = jQuery.extend(true, {}, mutate);
        this.pref = jQuery.extend(true, {}, pref);
        this.person = jQuery.extend(true, {}, person);
        this.fert = jQuery.extent(true, {}, fert);
    }
    /*
    get foo(){
      return bar;
    }
    */
}

