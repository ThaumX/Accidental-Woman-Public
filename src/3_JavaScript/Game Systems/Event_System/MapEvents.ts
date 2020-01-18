// ███╗   ███╗ █████╗ ██████╗     ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
// ████╗ ████║██╔══██╗██╔══██╗    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
// ██╔████╔██║███████║██████╔╝    █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
// ██║╚██╔╝██║██╔══██║██╔═══╝     ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
// ██║ ╚═╝ ██║██║  ██║██║         ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝         ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝


// INTERFACE
interface setupMapEvents {
  generator: (loc: mapLocArray) => string;
  events: object;
}

// NAMESPACE
if (setup.mapEvents === null || setup.mapEvents === undefined) {
  setup.mapEvents = {} as setupMapEvents;
}

// FUNCTIONS
setup.mapEvents.generator = function(loc: mapLocArray): string {
  let out = "Error in Map events Generator. Please report!";
  let which = 0 as number; // 0 = main loc | 1 = secondary loc | 2 = tertiary loc
  if (loc !== null) {
    if (loc[2] === false || loc[2] === undefined || loc[2] == null) {
      which = setup.randomDist([2, 5, 0]);
    } else {
      which = setup.randomDist([2, 5, 7]);
    }
  } else {
    aw.con.warn(`setup.mapEvents.generator did not get correct ↂ.map.loc :( Input was ${loc}`);
    return "Error in Map events Generator. Please report!";
  }
  aw.con.info(`setup.mapEvents.generator: loc is ${loc}, which is ${which}`);
  switch (which) {
    case 0:
      out = setup.mapEvents.events[loc[0]].generic[random(0, (setup.mapEvents.events[loc[0]].generic.length - 1))];
      break;
    case 1:
        out = setup.mapEvents.events[loc[0]][loc[1]][random(0, (setup.mapEvents.events[loc[0]][loc[1]].length - 1))];
        break;
    case 2:
      if (setup.mapEvents.events[loc[0]][loc[1] !== null]) {
        out = setup.mapEvents.events[loc[0]][loc[1]][random(0, (setup.mapEvents.events[loc[0]][loc[1]].length - 1))];
        break;
      } else {
        out = setup.mapEvents.events[loc[0]][loc[1]][random(0, (setup.mapEvents.events[loc[0]][loc[1]].length - 1))];
        aw.con.warn(`Need to write some ${loc[2]} tertiary loc events for setup.mapEvents.generator! Using loc[1] for ${loc[0]} instead for now.`);
        break;
      }
    default:
      out = `Error in Map events Generator switch. Please report!`;
      aw.con.warn(`setup.mapEvents.generator did not get switch ${which}`);
      break;
  }
  return out;
};

// MACRO
Macro.add("mapEvent", {
  handler() {
    return new Wikifier(this.output, setup.mapEvents.generator(ↂ.map.loc));
  },
});

// OBJECTS
setup.mapEvents.events = {
  world: {
    generic: [
      "You see a bird flying in the sky.",
      "You hear car sounds from afar.",
      "You hear wind blowing.",
    ],
    appletree: [
      "",
    ],
    institute: [
      "A group of people dressed in lab coats pass by.",
      "You hear some muffled noises and turn around to see two guys transporting a big metal box. You can swear you can hear a human voice from inside.",
      "You feel floor rumbling and the lights flicker for a second.",
    ],
    restricted: [
      "You see a couple of people dressed in suits carrying a box.",
      "You hear a weird sound coming from below.",
    ],
    coop: [
      "You see a couple of hucows playing volleyball, their tits bounce like crazy.",
      "A hucow passes by. It seems that her bra strap tore so she holds her heavy udders with her hands.",
      "You notice a young doctor talking with a big breasted girl making marks in her slate.",
    ],
    lake: [
      "Water in the lake seems a bit green.",
    ],
    visitor: [
      "You see an APD officer having a snack while sitting on his car.",
      "You see a couple making selfie in front of the big Appletree sign.",
      "Turning in the direction of noise you see a raccoon stealing from the trash bin.",
    ],
    forest: [
      "All you can hear is a rustling of leaves.",
      "You wonder if you have just heard a woman's cry. Or it was the bird?",
      "Woods are silent.",
      "Fog engulfs everything around you.",
    ],
    woods: [
      "You are sure you smell something but can't say what is it other than it is pleasant.",
      "Pinecone cracks under your feet.",
    ],
    unknown: [
      "Literally nothing happens.",
    ],
    city: [
      "Car rides by.",
      "A plane flies far away between the clouds.",
    ],
    spring: [
      "You hear pleasant sounds of a waterfall.",
      "Light plays on the water surface of the small lake.",
      "You hear a distant laugh.",
    ],
    bridge: [
      "A weird shaped log flows by.",
      "You see the ripples on the river surface.",
      "<<set _lol = random(0,10)>><<if _lol == 10>>You see a body of your enemy floating by.<<else>>You see a leaf floating by.<</if>>",
    ],
    resort: [
      "You hear upbeat music from the beach bar.",
      "A couple of girls dressed in micro bikini pass by with cocktails in their hands.",
      "You hear happy squealing followed with a loud splash from the water park.",
    ],
    main: [
      "A little bird flies by.",
      "Literally nothing happens.",
    ],
  },
  bullseye: {
      generic: [
        "You see a customer arguing with a cashier.",
        "You notice a couple struggling with their cart. On wheel is faulty and the cart is going sideways all the time.",
      ],
      parking: [
        "You see a small piece of cardboard flying over the parking caught by a wind.",
        "An alarm on the black car goes triggered. A minute later some annoyed guy goes out from the doors and clicks his remote to turn it off.",
        "A cashier is having a smoke outside of the shop.",
      ],
      hardware: [
        "You see a long shelf full of professional-grade sanding machines.",
        "A bored guy is playing with the power drill pretending it is a handgun.",
      ],
      electronics: [
        "You stare at the shelf full of TVs showing a bee flying around the flower.",
        "A woman near you is trying to choose an electric toothbrush using a consultant but seems not satisfied with the motor vibration levels. @@.npc;Do you have anything more powerful? My... teeth are not very sensitive.@@ @@.npd;Umm... yes, try this one.@@",
      ],
      toys: [
        "You play with the toy car a little bit.",
        "It seems there are tons of pregnant dolls on the shelves. @@.mono;Not sure if this was the thing back in my childhood...@@",
      ],
      baby: [
        "Infant clothes looks ridiculously tiny.",
        "You wonder why kid's clothes cost the same as adults despite less actual fabric needed to produce them.",
      ],
      grocery1: [
        "You see a woman staring at the cucumbers with a dumb mesmerized look.",
        "You look at small yellow lemon-like fruits. The price tag says that they are called 'Kumquats'. @@.mono;I wonder if they are tasty.@@",
      ],
      grocery2: [
        "You see a woman staring at the cucumbers with a dumb mesmerized look.",
        "You look at small yellow lemon-like fruits. The price tag says that they are called 'Kumquats'. @@.mono;I wonder if they are tasty.@@",
      ],
      grocery3: [
        "You see a woman staring at the cucumbers with a dumb mesmerized look.",
        "You look at small yellow lemon-like fruits. The price tag says that they are called 'Kumquats'. @@.mono;I wonder if they are tasty.@@",
      ],
      housewares1: [
        "",
      ],
      housewares2: [
        "",
      ],
      womens1: [
        "",
      ],
      womens2: [
        "",
      ],
      lingerie: [
        "You notice a shy-looking guy. He looks around nervously before inspecting the shelf with frilly panties.",
        "A woman on the corner of the hall accidentally drops the hanger.",
      ],
      girls: [
        "You observe girl's clothes. They look like a smaller and more modest version of adult clothes.",
      ],
      boys: [
        "You try to recall what have you wear in your childhood but no avail.",
      ],
      mens: [
        "You see a guy trying one jacket after another. It takes him some time before he finally find the one that fits him.",
      ],
      pharmacy: [
        "You observe the showcase full of drugs. Most names are unfamiliar to you.",
      ],
      glasses: [
        "You try some glasses just for fun. Looking into the mirror you see that they made you look like an insect with giant eyes.",
        "You put on some glasses and turn to the mirror. You look like a badass cop.",
        "Trying some glasses you look at yourself in the mirror. You look like an egghead.",
      ],
      barber: [
        "A guy sitting in the line sneezes.",
        "Two girls sitting on the couch are reading magazines.",
        "Barber cleans the floor from the hairs.",
      ],
      custserv: [
        "You notice that guy at the counter seems to be sleeping with his head resting on his arm.",
      ],
      produce: [
        "",
      ],
      changing: [
        "You see a white stain on the wall.",
        "You hear some muffed sobbing from the adjacent stall",
      ],
  },
  residential: {
    generic: [
      "You hear the ice-cream truck chimes from the street.",
      "A police siren is audible from the street.",
      "A helicopter flies above and for some reason you can't stop staring at it.",
    ],
    common: [
      "A little ant is traveling across the table. @@.mono;Hello buddy. This place could use some cleaning, yeah?@@",
      "Somebody left a paper cup on the table.",
      "There is a pile of empty pizza boxes and bottles in a bag which was put into the corner. @@.mono;Did I miss the party?@@",
    ],
    gym: [
      "A shy fat guy quickly gathers his things and leaves when you enter. @@.mono;I wonder if he’s too shy.@@",
      "You notice an odd white stain on the bench.",
      "Entering the gym you notice that somebody forgot their towel on the treadmill.",
      "It seems that the AC is broken again, it is really warm in the room. You push buttons on the remote but nothing happens.",
      "You enter the workout room and notice a girl wearing almost sheer yoga pants using the elliptical. She notices you checking her out and winks at you.",
      "Somebody put a 'Please clean your body fluids from the equipment after your training!' sign on the wall.",
    ],
    party: [
      "You see some leftovers from a party.",
      "You see Shub-Nigghurat, the destroyer of worlds. You don't read these much, don't you?",
      "There is a couple of cardboard boxes in the corner.",
      "Janitor is cleaning the room and nods to you when you enter.",
      "A window is opened and you feel a chilly wind on your skin.",
    ],
    main: [
      "You almost bump into the girl on the stairs, she smiles in an embarrassed fashion.",
      "It seems one of your neighbors moving in, there is a pile of cardboard boxes in the corner of the hall.",
      "Elevator seems to be broken so you take the stairs.",
      "Janitor mopping the floor gives you a long creepy look when you step onto the floor he just cleaned.",
      "You can swear you saw some nude person at the end of the hall but they turned by the corner just a moment after you entered.",
      "You hear your neighbors having a loud argument through the wall. @@.mono;Gosh, Linda is such a bitch, I wonder why Mick is still with her...@@",
    ],
    parking: [
      "You see two guys arguing on the far side of the site, seems that they hit their cars while parking.",
      "As you go through the parking you notice a person in a hoodie poking the window of some car. When he notices you he leaves in a hurry.",
      "The alarm on the fancy crimson car goes off and you almost jump from the loud siren.",
      "Some kids seem to steal the shopping cart from Cum'n'Go and are riding it across the parking. @@.mono;If they scratch my car I'll go postal I swear!@@",
      "You go through the parking and see a guy with a sad face standing near the car. 'microdick' is written with spray paint all over his sedan. The man notices you and goes tomato red with embarrassment.",
      "You see some car desperately trying to park going back and forth but never managing to pull it off. @@.mono;Woah, this driver has no idea about correct parking angles at all.@@ After more than ten tries they finally get to the correct position and you see a blonde bimbo getting out. @@.mono;It's not surprising at all.@@",
    ],
    sidewalk: [
      "You see some Latino guy standing near the wall. @@.mono;I can swear it looks like he never leaves the spot.@@",
      "You hear a chime and jump to the side avoiding a collision with a cyclist right in time.",
      "There is a girl tripped over, the content of her purse is all around the concrete sidewalk. You notice a nice big dildo among her belongings.",
      "You look around and see an older male putting some posters on every tree. It seems somebody is missing.",
      "A couple of skimpily dressed girls having a chat with a guy at the corner. One of them gets into his car.",
      "Workers are replacing the glass of the bus stop. @@.mono;Institute really does it's best to make this town look spotless.@@",
    ],
    cumandgo: [
      "You notice that the rack normally holding condoms is practically empty @@.mono;Seems like someone is having a party...@@",
      "The place looks pretty empty which is surprising for the only shop in the block.",
      "You notice the young guy with a fresh cucumber and a pack of condoms in his cart finishing the purchase at the counter. @@.mono;I think I know <i>what</i> somebody is gonna do this evening, he-he!@@",
      "You see a woman arguing with the cashier, seems she is not satisfied enough with the quality of some cheap transformative she bought yesterday.",
      "The AC seems to be broken and soaking with sweat the cashier mashes the remote buttons trying to make it work.",
      "You hear an older couple arguing on the size of the condoms they should buy. Husband proposing the 'XL' size while his wife laughs sardonically.",
    ],
    recreation: [
      "You notice some girls having a picnic on the grass, it seems they decided that petting is the best addition to the red wine.",
      "@@.mono;What's that smell?@@ You turn your head and see an upset guy standing near the bbq in the gazebo. Dark black smoke and occasional flames lead you to the conclusion that there will be no tasty grill for him today.",
      "You notice a Groundskeeper. He seems to be more interested in ogling at the topless sunbathing girls near the pool than his work.",
      "A couple of guys flirt with a bimbo-looking woman near the tanning area.",
      "Taking a look around you see some mom running after her kid. @@.npc;No, Timmy! It is not for eating! Drop the damn thing! TIMMY!!!@@",
      "Going past the playground you hear the part of a conversation between some teenage girls. @@.npc;So you just stick it inside? Yikes! Mom says I should not think about such things until I grow older.@@ @@.npd;Oh come on, you are sixteen already, stop listening to this dumb church rat! It felt really cool!@@ @@.npc;Hey! Don't call her like that!@@",
    ],
    walkdowntown: [
      "A car backfires as it drives past, startling you.",
      "A flock of birds is circling above and you can't help but stare at them for no reason.",
      "You notice a used condom on the sidewalk.",
      "Some hobo is pushing a cart full of hobo's stuff along the sidewalk.",
      "A stray dog is digging into the garbage. As you pass along it looks at you with sad eyes. @@.pc;Sorry, buddy, I have nothing for you. Hope you find something edible there.@@",
      "You see a couple of guys carrying a rolled carpet to the garbage bin.",
    ],
    jogging: [
      "You see a topless girl jogging. Her jugs seem to bounce painfully but she doesn't look too troubled with it. @@.mono;Judging by the thick leather collar around her neck she is okay with discomfort, heh.@@",
      "You notice a guy drinking from a bottle, sweat running down his bare chest. @@.mono;Mmm, he looks handsome...@@",
      "You hear a curse and turn to see a girl tripped over. She has bruised her hip and rubs it with a frowned face.",
      "Going along the jogging path you notice a lost shoe. @@.mono;I wonder who has left it here. Seems like it belongs to a female.@@",
      "A woman stretching a couple of steps to the side of the jogging path.",
      "Some guys are arguing with a woman who decided that it is a good idea to walk along the jogging path blocking almost all of it with her pram.",
    ],
    reservoir: [
      "A wind creates ripples on the water surface.",
      "You hear a bird singing in the distance.",
    ],
    medical: [
      "Some woman coughs near you and you cover your mouth and nose with a hand. @@.mono;I really don't want to catch anything.@@",
      "You turn for the siren sound to see the ambulance going full speed to the hospital.",
      "You notice that the guy near you scratching his crotch area too much and decide to keep away. @@.mono;I touch my girl enough without any itching already, he-he.@@",
      "At the main entrance of the hospital, you see a little crowd greeting some girl. It seems she just got her new implants and her buddies are here to congratulate her.",
      "Hearing a noise you turn around and see a young guy in a wheelchair. He smiles when you take a step to the side and let him proceed.",
      "You see a black van coming to the rear entrance of the lab building. Two guys dressed in lab coats carry some weird plastic bag and put it into the trunk.",
    ],
    industrial: [
      "You hear machine noises from the building in front.",
      "A couple of workers going out from the large hangar.",
    ],
    government: [
      "A group of kids are following the young lady to the school gates.",
      "You see a couple of APD cops having a snack in their car.",
    ],
  },
  homeT1: {
    generic: [
      "Suddenly the lights go off for a second. @@.mono;Grrr. They really have to fix the wires in this building!@@",
      "You hear some rhythmical squeaking from behind the wall. @@.mono;My neighbors are really into each other it seems...@@",
      "You wonder for a minute why did you come into the room. @@.mono;I can swear I had something to do here but I can't remember... ah, yes, of course! Silly me, heh.@@",
      "You can't find your comfy home slippers for some time until you finally find them under the wardrobe.",
      "The light bulb goes off and you replace it with a new one from the drawer.",
      "It gets too hot in the room so you open the window and stand in front of it enjoying some cool air.",
      "It's getting too cold in the room so you close the window.",
      "You hear some noise from the flat above. Your neighbor seems to be vacuuming the floors again.",
      "Your <<= either('left arm', 'right arm', 'left leg', 'right leg', 'butt', 'chest', 'head')>> itches and you scratch it with delight.",
      "A pigeon sits on the balcony railing and looks at you. @@.mono;Well hello there, government drone.@@",
    ],
    kitchen: [
      "You open the fridge for no particular reason and stare inside blankly for some time.",
      "The kitchen sink makes a weird sound.",
      "You mindlessly play with a kitchen timer for some time before putting it back to the table.",
    ],
    bath: [
      "Water drips from the faucet.",
      "You hear water going through the pipes behind the wall.",
      "The tiled floor feels chilly under your feet.",
      "The mirror got stained and you think it could use some cleaning.",
    ],
    balcony: [
      "The big cloud to the south looks like a flaccid cock.",
      "The breeze gets stronger.",
      "The wind makes you flinch.",
      "You see a couple of guys going down the road.",
      "You hear a bird singing.",
      "Your neighbor goes to his balcony for a smoke but it seems he forgot the lighter.",
      "You see some people in the windows of the building opposite to yours.",
      "You notice a flicker of light from the window of the building next to yours.",
    ],
    bedroom: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
    ],
    living: [
      "The carpet feels soft beneath your toes.",
      "The ceiling light flickers for just a moment.",
      "You see a bird fly by outside.",
      "You notice a little stain on the wall.",
    ],
    foyer: [
      "You hear footsteps from behind the door.",
      "The wet soles of your shoes made a little puddle on the floor.",
    ],
  },
  homeT2: {
    generic: [
      "You hear some rhythmical squeaking from behind the wall. @@.mono;My neighbors are really into each other it seems...@@",
      "You wonder for a minute why did you come into the room. @@.mono;I can swear I had something to do here but I can't remember... ah, yes, of course! Silly me, heh.@@",
      "You can't find your comfy home slippers for some time until you finally find them under the wardrobe.",
      "The light bulb goes off and you replace it with a new one from the drawer.",
      "It gets too hot in the room so you open the window and stand in front of it enjoying some cool air.",
      "It's getting too cold in the room so you close the window.",
      "You hear some noise from the flat above. Your neighbor seems to be vacuuming the floors again.",
      "Your <<= either('left arm', 'right arm', 'left leg', 'right leg', 'butt', 'chest', 'head')>> itches and you scratch it with delight.",
      "A pigeon sits on the balcony railing and looks at you. @@.mono;Well hello there, government drone.@@",
    ],
    kitchen: [
      "You open the fridge for no particular reason and stare inside blankly for some time.",
      "The kitchen sink makes a weird sound.",
      "You mindlessly play with a kitchen timer for some time before putting it back to the table.",
    ],
    bath: [
      "Water drips from the faucet.",
      "You hear water going through the pipes behind the wall.",
      "The tiled floor feels chilly under your feet.",
      "The mirror got stained and you think it could use some cleaning.",
    ],
    balcony: [
      "The big cloud to the south looks like a flaccid cock.",
      "The breeze gets stronger.",
      "The wind makes you flinch.",
      "You see a couple of guys going down the road.",
      "You hear a bird singing.",
      "Your neighbor goes to his balcony for a smoke but it seems he forget the lighter.",
      "You see some people in the windows of the building opposite to yours.",
      "You notice a flicker of light from the window of the building next to yours.",
    ],
    bedroom: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
    ],
    living: [
      "The carpet feels soft beneath your toes.",
      "The ceiling light flickers for just a moment.",
      "You see a bird fly by outside.",
      "You notice a little stain on the wall.",
    ],
    foyer: [
      "You hear footsteps from behind the door.",
      "The wet soles of your shoes made a little puddle on the floor.",
    ],
  },
  homeT3: {
    generic: [
      "You hear some rhythmical squeaking from behind the wall. @@.mono;My neighbors are really into each other it seems...@@",
      "You wonder for a minute why did you come into the room. @@.mono;I can swear I had something to do here but I can't remember... ah, yes, of course! Silly me, heh.@@",
      "You can't find your comfy home slippers for some time until you finally find them under the wardrobe.",
      "The light bulb goes off and you replace it with a new one from the drawer.",
      "It gets too hot in the room so you open the window and stand in front of it enjoying some cool air.",
      "It's getting too cold in the room so you close the window.",
      "You hear some noise from the flat above. Your neighbor seems to be vacuuming the floors again.",
      "Your <<= either('left arm', 'right arm', 'left leg', 'right leg', 'butt', 'chest', 'head')>> itches and you scratch it with delight.",
      "A pigeon sits on the balcony railing and looks at you. @@.mono;Well hello there, government drone.@@",
    ],
    kitchen: [
      "You open the fridge for no particular reason and stare inside blankly for some time.",
      "The kitchen sink makes a weird sound.",
      "You mindlessly play with a kitchen timer for some time before putting it back to the table.",
    ],
    bath: [
      "Water drips from the faucet.",
      "You hear water going through the pipes behind the wall.",
      "The tiled floor feels chilly under your feet.",
      "The mirror got stained and you think it could use some cleaning.",
    ],
    balcony: [
      "The big cloud to the south looks like a flaccid cock.",
      "The breeze gets stronger.",
      "The wind makes you flinch.",
      "You see a couple of guys going down the road.",
      "You hear birds singing.",
      "Your neighbor goes to his balcony for a smoke but it seems he forget the lighter.",
      "You see some people in the windows of the building opposite to yours.",
      "You notice a flicker of light from the window of the building next to yours.",
    ],
    bedroom: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
    ],
    bed2: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
    ],
    living: [
      "The carpet feels soft beneath your toes.",
      "The ceiling light flickers for just a moment.",
      "You see a bird fly by outside.",
      "You notice a little stain on the wall.",
    ],
    foyer: [
      "You hear footsteps from behind the door.",
      "The wet soles of your shoes made a little puddle on the floor.",
    ],
  },
  BFhomeT1: {
    kitchen: [
      "You notice a dirty coffee cup on the table.",
      "The fridge makes weird noises.",
    ],
    bath: [
      "You can smell some cologne.",
      "The toothbrush near the washbowl seems to be pretty used.",
    ],
    balcony: [
      "You can see clouds slowly moving far far away.",
      "There is an empty cup on the windowsill.",
    ],
    bedroom: [
      "It smells good here but you can't say what is it.",
      "You notice an old movie poster on the wall. It seems it's been here for a long time."
    ],
    living: [
      "The coffee table seems to be well used.",
      "The light flickers for a moment.",
    ],
    foyer: [
      "You see a line of well-organized shoes.",
      "You hear some street noise from the outside.",
    ],
  },
  downtown: {
    generic: [
      "You hear distant car noises.",
      "You see people going along the street.",
    ],
    parking: [
      "You see two guys arguing on the far side of the site, seems that they hit their cars while parking.",
      "As you go through the parking you notice a person in a hoodie poking the window of some car. When he notices you he leaves in a hurry.",
      "The alarm on the fancy crimson car goes off and you almost jump from the loud siren.",
      "Some kids seem to steal the shopping cart and are riding it across the parking. @@.mono;If they scratch my car I'll go postal I swear!@@",
      "You go through the parking and see a guy with a sad face standing near the car. 'microdick' is written with spraypaint all over his sedan. The man notices you and goes tomato red with embarrassment.",
      "You see some car desperately trying to park going back and forth but never managing to pull it off. @@.mono;Woah, this driver has no idea about correct parking angles at all.@@ After more than ten tries they finally get to the correct position and you see a blonde bimbo getting out. @@.mono;It's not surprising at all.@@",
    ],
    holefoods: [
      "You hear a couple discussing the size of the cucumbers. @@.npc;John, I know you like this shorter but thicker, let's take a couple.@@ @@.npd;Oh Mary, you'll render me incontinent one day. Screw it, you live only once after all. Take this one.@@ @@.npc;Wow, such a giant thingy! I love you, my sweet apple-pie!@@ @@.mono;Ugh... gross.@@",
      "You see a yonger man along with a mature woman chatting in the vegetable section. @@.npd;...but...@@ @@.npc;Yes you will, that is my last word. Don't make me buy a ginger root for your butt again. Last time you whimpered like a little boy you are remember?@@ @@.npc;...yes mistress...sorry mistress...@@",
      "Two butchers from the meat department having a chat about deer meat.",
      "You see a cockroach under the shelf.",
      "Strolling along the shops you hear a chat between a customer and a cashier. @@.npc;Why yes, miss, it is the best quality human protein, no aromatizers!@@ @@.npd;Okay, I'll take a bottle. Pack it please.@@",
      "You ogle the shelf with various cheeses but have literally no idea what the difference is.",
    ],
    corp: [
      "A couple of older guys in suits are sitting on the bench.",
      "A luxurious car is parked near the entrance of the building. Young pretty woman opens the car's door for an elder man in a suit and leads him inside.",
    ],
    main: [
      "You hear a bird singing.",
      "You hear road traffic.",
      "You sneeze.",
    ],
    bank: [
      "A couple of collectors are withdrawing cash from the ATM machine.",
      "A group of women are discussing stock fonds.",
    ],
    townhall: [
      "An old janitor is mopping the floors.",
      "It smells like sweat and old paper.",
      "You hear a phone ringing",
    ],
    square: [
      "You see ripples on the surface of the fountain.",
      "A couple of teens are riding the skateboards around the fountain.",
      "You hear water splashing",
    ],
    park: [
      "You see some couple having a picnic on the grass. They look young and adorable. @@.mono;Awww.@@",
      "You take a look around and see an older woman feeding ducks in the pond.",
      "Going down the gravel road you notice a pair of elders playing chess on a bench.",
      "Turning your head to the sound you see a small group of girls giggling at some joke.",
      "You notice a girl in bikini working on her tan. It seems she is a big fan of it because her ass and back are already as brown as a potato.",
      "As you proceed through the park you see a couple of workers from the nearby shop having their lunch break on the grass.",
    ],
    community: [
      "Two elders are playing chess at the table.",
      "You see a couple of babysitters watching for the kids at the playground.",
      "You hear a loud annoyed voice. @@.npc;Timmy, damn! Grass is not for eating!@@ The woman is really furious but can't stop Timmy from chewing with a happy face. @@.npc;For the last time I... Gosh, I'd better be barren...@@",
    ],
    mall: [
      "A couple of women trying to find a shopping cart without a broken wheel.",
      "Young cashier gets out from the shop with a cigarette and heads to the parking elevator.",
      "You see an electrician fixing the lift.",
      "You almost trip over the 'Caution, wet floor!' sign.",
      "Lounge music stops for a moment before starting from the beginning.",
    ],
    foodcourt: [
      "You see a tired woman with a kid at the table. @@.npc;Timmy, dammit, stop throwing fries!@@ Timmy seems to be too happy to listen.",
      "A janitor cleans tables from food leftovers and paper cups.",
      "A group of girls are laughing loudly in the center of the food court.",
      "You can swear you have noticed a rat in the corner of the food court.",
      "@@.npc;Fuck!@@ You turn around and see a woman spilled her soup over her white skirt.",
    ],
    movies: [
      "You see a woman shifting uneasily in the line to the cinema WC door.",
      "A little pile of spilled popcorn is crunching under your feet.",
      "You hear muffed movie sounds from behind the cinema hall's door.",
      "Cinema worker is replacing posters with new titles.",
      "You see a kid and a woman in the line for tickets. @@.npc;But mom, I want to see 'Lesbians from hell!'@@ @@.npd;Timmy! It is not a movie for a teen. We are going to see 'Trans-porners 6', end of discussion.@@",
    ],
    exterior: [
      "You see workers cleaning the windows of the mall. Half of this side of the building is already done.",
      "As you stand near the entrance you notice a guy stuck in the rotating glass doors and a couple of mall employees trying to help him.",
      "You see a man trying to fit his purchases into his car.",
    ],
    fitta: [
      "You see a pair carrying a cardboard box with some furniture to the checkout.",
      "A girl next to you is staring at the shelf with big candles biting her lip.",
      "You notice a guy trying to hide a plate between the shelves. @@.mono;He-he, somebody doesn't want to pay for broken stuff.@@",
      "You stroll around the kitchen department and see the old gay couple having an argument about the table color.",
      "A little boy is crying, seems that he has lost his parents in the big shop.",
    ],
    westshop: [
      "You notice a little 'Pop kids save America!' sticker on the street lamp's post.",
      "You almost step into the puddle of coffee on the concrete sidewalk.",
      "You hear a police siren from afar.",
      "A crazy-looking guy holding an 'end is nigh' sign is talking with an APD officer.",
    ],
    bbb: [
      "A suspiciously bulky girl in a frilly dress passes by with a cart full of pink-colored purchases.",
      "You notice an older bearded guy watching at his girlfriend with a bored look. She is very excited and screams with joy running back to him from the shelves. @@.npc;Look, daddy, look! Such a cute pillow! I want it, please daddy, pretty pleeeease!@@ Guy looks at the heart-shaped pink pillow with a disgust and sighs. @@.npc;Anything you wish, kitty.@@",
    ],
    northshop: [
      "You see a group of skimpily dressed girls passing by.",
      "A bulky guy with a tattoos on his face passes by.",
      "You notice the used condom on the sidewalk.",
      "An APD officer is talking with a topless woman on the sidewalk. @@.npc;No offense, miss but your crotch is visible and this is illegal.@@ @@.npd;Come on, it is showing just a tiny bit, officer!@@ @@.npc;Law is law, miss.@@ @@.npd;Gosh... okay, how much is the fine?@@",
    ],
    southshop: [
      "A person dressed in a fursuit passes by.",
      "You see a spider sitting on the wall.",
      "You hear the buzzer of an ambulance van.",
    ],
    voidshop: [
      "You hear arcade machine sounds and some 8-bit music from the Pleasure Buzzer.",
      "You notice some slimy stains on the floor.",
    ],
    club: [
      "You see a drunken guy puking in the corner.",
      "Muffed music is audible from behind the closed club doors.",
      "A couple of girls are french kissing in corner.",
      "You see a guy glancing around before inhaling something from a small bottle.",
      "You notice a couple of guys trying to pick up some drunken girls.",
      "Two guys are trying to count their remaining funds, but they are way too drunk to achieve any success.",
    ],
    amuse: [
      "You hear the sounds of orchestrion from the open windows.",
      "You see a guy selling hotdogs on a little stand in the street. Looks not very tasty.",
      "A woman with three kids is passing by. Every kid has a colored air balloon.",
    ],
    adult: [
      "A slutty dressed girl talks with a guy near you. They laugh and he hands her something before they go to the shady bystreet. @@.mono;Seems somebody gonna get a blowjob soon...@@",
      "You hear some grunting and sobbing noises from the lane between two buildings.",
      "Young topless girl is advertising something with cards glued to her tits. You take a step forward and see that it is 'Prude' sex shop ads.",
    ],
    northwest: [
      "The traffic lights seem to be off and it takes a while until you finally manage to cross the road.",
      "You turn your head in the direction of music and see a street musician playing a saxophone.",
      "@@.npc;Timmy!!! Stay near me, it is dangerous to go to the road! The car can hit you!@@ Woman takes a boy by the hand.",
    ],
    west: [
      "You hear an icecream van chimes from afar.",
      "You see two guys in sport clothes squatting funnily.",
      "A group of guys exit from the 'Hinden Burger' laughing loudly.",
    ],
    southwest: [
      "A heavily tattooed girl passes by. When she notices your stare she winks.",
      "You see a guy carrying a lifesize doll in a cardboard.",
      "Loud cracking sound makes you turn around to see two cars hitting each other under the traffic light.",
    ],
    northeast: [
      "You notice a young woman with a small purse trying to get her heel out of drain lattice.",
      "A small group of children are led by a teacher to the yellow bus. @@.npc;Did you like the excursion?@@ she asks and kids make affirmative noises.",
      "As you go along the sidewalk you notice a small pile of clothes. A nice looking homeless dog is sleeping on top of the rugs.",
    ],
    east: [
      "You see a sewerage hatchway opened with a worker halfway inside of it. A big box of tools is standing near him.",
      "You smell some bakery.",
      "Looking at the people at the street you notice a girl adjusting her bra.",
    ],
    southeast: [
      "You notice an empty wallet on the ground.",
      "Guy on the other side of the road scratches his crotch.",
      "A couple of girls pass by with paper bags from a clothing store.",
    ],
  },
};