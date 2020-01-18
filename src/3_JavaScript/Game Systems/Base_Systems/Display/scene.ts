/*************************************************
    ███████╗ ██████╗███████╗███╗   ██╗███████╗
    ██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝
    ███████╗██║     █████╗  ██╔██╗ ██║█████╗
    ╚════██║██║     ██╔══╝  ██║╚██╗██║██╔══╝
    ███████║╚██████╗███████╗██║ ╚████║███████╗
    ╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═══╝╚══════╝
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Controls the Scene-View menu, which describes the
current situation/location and near by NPCs.
*************************************************/

interface setupScene {
  isLocName: { (loc: string): boolean };
  locationLib: { (loc: string): string };
  set: { ({ loc, pc, npcs, group, refresh }: { loc: string, pc: string, npcs: string | string[], group: string, refresh: boolean }): void };
}

setup.scene = {} as setupScene;

// sets the scene for the scene description button
setup.scene.set = function ({ loc = "none", pc = "none", npcs = "none", group = "none", refresh = false }: { loc: string, pc: string, npcs: string | string[], group: string, refresh: boolean } = {loc, pc, npcs, group, refresh}): void {
  const AW = State.active.variables;
  if (loc !== "none") {
    AW.scene.loc = setup.scene.isLocName(loc) ? setup.scene.locationLib(loc) : loc;
  }
  if (pc !== "none") {
    AW.scene.pc = pc;
  }
  if (npcs !== "none") {
    if (Array.isArray(npcs)) {
      let text;
      const tArray = [];
      const leng = npcs.length;
      for (let i = 0; i < leng; i++) {
        if ("string" === typeof npcs[i]) {
          const out = '<span class="ident">' + aw.npc[AW.activeNPC[i]].main.name + " " + aw.npc[AW.activeNPC[i]].main.surname.slice(0, 1) + ".</span> " + npcs[i];
          if (AW.scene.npcs[i] === "null") {
            AW.scene.npcs.push(out);
          } else {
            AW.scene.npcs[i] = out;
          }
        } else if (AW.scene.npcs[i] === "null") {
          AW.scene.npcs.push("none");
        } else if (refresh) {
          AW.scene.npcs[i] = "none";
        }
      }
    } else if ("string" === typeof npcs) {
      setup.log(`npc info for scene view supplied as raw string in passage ${aw.passage.title}`);
      AW.scene.npcs = [npcs];
    } else {
      setup.alert(`bad NPC info passed to scene view setter in ${aw.passage.title}. Info passed was ${npcs}`);
    }
  } else if (refresh) {
    AW.scene.npcs = ["none"];
  }
  if (group === "none" && AW.scene.group !== "none" && refresh) {
    AW.scene.group = "none";
  } else if (group !== "none") {
    AW.scene.group = group;
  }
};

Macro.add("setScene", {
  handler() {
    if (this.args.length === 0) {
      return this.error("No arguments provided to setScene macro.");
    }
    let obj = {} as { pc: string, npcs: string[], group: string, loc: string, refresh: boolean };
    if ("string" === typeof this.args[0]) {
      obj.pc = this.args[0];
    }
    if ("object" === typeof this.args[0]) {
      obj = jQuery.extend(true, {}, this.args[0]);
    } else {
      if ("string" === typeof this.args[1]) {
        obj.npcs = [this.args[1]];
      }
      if ("string" === typeof this.args[2]) {
        obj.group = this.args[2];
      }
      if ("string" === typeof this.args[3]) {
        obj.loc = this.args[3];
      }
    }
    setup.scene.set(obj);
  },
});

// returns if location is in a library entry
setup.scene.isLocName = function(loc: string): boolean {
  const locNames = [
    "lily",
    "residential",
    "townsquare",
    "downtown",
    "mall",
    "townhall",
    "mainstreet",
    "centralpark",
    "institute",
    "bullseye",
    "t1home",
    "t2home",
    "t3home",
    "t4home",
    "t1npc",
    "t2npc",
    "t3npc",
    "t4npc",
  ];
  return locNames.includes(loc);
};

// returns text for a set general location
setup.scene.locationLib = function(loc: string): string {
  let ret;
  let owner = State.active.variables.AW.locOwner;
  if (owner == null) {
    owner = "John Doe";
  }
  switch (loc) {
  case "lily":
    ret = `You are in Lily's home in Appletree. Lily's home is a townhouse located near Shrodinger and 2nd, and is very close to Appletree's shopping district. The first floor contains a spacious living room, a dining room, a half-bath, and a kitchen. Upstairs is the master bedroom with ensuite bath, guest bedroom, bathroom, and office. Downstairs is a basement that Lily converted into her own lab.`;
    break;
  case "residential":
    ret = `You are in one of Appletree's residential areas. Though not as fancy as Downtown, the area is still very well designed and manicured. The buildings all share the same theme and architectural style, and despite the prevelence of dense housing, it still manages to feel open and vibrant. The lack of unique and contrasting architecture and color gives it the air of an elaborate planned resort complex, but you can't deny that it's the nicest residential area you've seen.`;
    break;
  case "townsquare":
    ret = `Currently no description written`;
    break;
  case "centralpark":
    ret = `Currently no description written`;
    break;
  case "mall":
    ret = `Currently no description written`;
    break;
  case "townhall":
    ret = `Currently no description written`;
    break;
  case "downtown":
    ret = `You are in the "Downtown" commercial area of Appletree, which gives the distinct impression of being the lovingly-maintained "main street" of an old midwest town. Despite the appearance, Appletree's downtown is thoroughly modern behind the redbrick facades of the 3-story buildings. Many of the inconveniences found in actually-old locations--such as narrow sidewalks, cramped interiors, and exposure to rain or snow--are absent, making this an inviting location to shop or dine. The area is dominated by the Samuel Steele Memorial Park, which is named after one of the founders of the Institute, but is more commonly called simply the "Central Park". At night, elegant street lamps cast a warm glow on the sidewalks, providing ample lighting and a romantic atmosphere.`;
    break;
  case "mainstreet":
    ret = `You are on the main artery of Appletree, Shrodinger Boulevard. It's the main road that leads in and out of the Muschi Valley, a renamed section of state road. It passes by Bullseye on the northeastern side of the valley, and crosses west until it reaches Appletree. To the north of Shrodinger Boulevard is the area known as 'Downtown', while the area to the south is mostly residential. If you follow Shrodinger Boulevard west past town, it turns south and follows the western edge of the valley. Eventually you'll run into the Institute Complex, the reason Appletree was built in the first place.`;
    break;
  case "institute":
    ret = `Currently no description written`;
    break;
  case "bullseye":
    ret = `You are at Bullseye, a large nation-wide department store chain. They carry a little bit of everything, but if you're looking for something uncommon or high-quality you'll usually have to look elsewhere. Bullseye is considered the 'upscale' competitor to Bal*Mart, with a nicer appearance and slightly better customer service.<br><br>Interesting Trivia: Bullseye's original target logo had a brown--rather than blue--bullseye circle. In the 1990s, customers began refering to the store as 'Brown-Eye', leading to the redesign of the company's logo.`;
    break;
  case "t1home":
    ret = `You are in your tiny studio apartment in Appletree.`;
    break;
  case "t2home":
    ret = `You are in your modest apartment in Appletree.`;
    break;
  case "t3home":
    ret = `You are in your comfortable apartment in Appletree.`;
    break;
  case "t4home":
    ret = `You are in your luxurious apartment in Appletree.`;
    break;
  case "t1npc":
    ret = `You are in {owner}'s tiny studio apartment in Appletree.`;
    break;
  case "t2npc":
    ret = `You are in {owner}'s modest apartment in Appletree.`;
    break;
  case "t3npc":
    ret = `You are in {owner}'s comfortable apartment in Appletree.`;
    break;
  case "t4npc":
    ret = `You are in {owner}'s luxurious apartment in Appletree.`;
    break;
  default:
    ret = `Error - ${loc} is not a valid location name.`;
    break;
  }
  return ret;
};
