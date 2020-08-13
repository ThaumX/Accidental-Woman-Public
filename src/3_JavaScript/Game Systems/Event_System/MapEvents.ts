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
  if (loc[0] === "homeT4") {
    loc[0] = "homeT3";
  }
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
  // if (loc[0] === "BFhome") {
  //  loc[0] = "homeT2" as locationMain;
  // }
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
	"You hear a dog barking in bushes.",
	"You see the pale moon above the trees.",
    ],
    appletree: [
      "You see a flock of pigeons cooing on the ground.",
      "You hear a band of street musicians playing down the street.",
      "You are amazed by the lack of homeless people in this city.",
	"You see the billboard advertising the Institute.",
	"The small car is slowly moving to the crossroads driving by a young woman.",
    ],
    institute: [
      "A group of people dressed in lab coats pass by.",
      "You hear some muffled noises and turn around to see two guys transporting a big metal box. You can swear you can hear a human voice from inside.",
      "You feel floor rumbling and the lights flicker for a second.",
      "The young man dressed in the business suit has exited the heavy wooden door carrying the sheet with many stamps.",
      "You hear a loud voice scolding somebody for the missing of the passcard.",
    ],
    restricted: [
      "You see a couple of people dressed in suits carrying a box.",
      "You hear a weird sound coming from below.",
      "You hear a PA announcement, but you are too far away to discern what it is.",
      "You hear the voice of the security officer demanding a visitor to present an identification card.",
      "The tiny black woman hurries somewhere carrying a vial with liquid glowing green.",
    ],
    coop: [
      "You see a couple of hucows playing volleyball, their tits bounce like crazy.",
      "A hucow passes by. It seems that her bra strap tore so she holds her heavy udders with her hands.",
      "You notice a young doctor talking with a big breasted girl making marks in her slate.",
      "You see a hucow struggling to walk under the weight of her leaking breasts.",
      "A pair of hucows are gleefully squirting each other down with milk. You sense that they’re going to be in trouble for wasting good product.",
      "A rancher strolls around the coop, checking on the welfare of his cows.",
    ],
    lake: [
      "Water in the lake seems a bit green.",
      "On the other side of the lake, there is an abandoned rowboat. You feel that there is a story behind this.",
      "Looking at the water, you can occasionally catch the sight of a fish eating a bug off of the surface.",
      "The water looks a bit greener than it did the last time you saw it.",
      "The water looks surprisingly clear today.",
      "You look across the lake and note the stillness of the water. Barely a ripple.",
      "An odd sort of tracks are on the beach. You wonder what could have left them.",
      "A gray duck was swimming near the beach. Seeing you, it has croak in panic and flies out.",
      "The fisherman in the boat is trying to catch a fish. Good luck to him.",
    ],
    visitor: [
      "You see an APD officer having a snack while sitting on his car.",
      "You see a couple making selfie in front of the big Appletree sign.",
      "Turning in the direction of noise you see a raccoon stealing from the trash bin.",
      "A fat woman walking the small dog is proudly moving along the street.",
      "The delivery boy carrying the large bag with the ‘Appletree-Pizza’ logo is ringing to the door of the office building.",
    ],
    forest: [
      "All you can hear is a rustling of leaves.",
      "You wonder if you have just heard a woman's cry. Or it was the bird?",
      "Wood is silent.",
      "Fog engulfs everything around you.",
      "The wind is strong, and the trees sound like voices.",
      "The sun breaks through the leaves, sparkling on the dew drops.",

    ],
    woods: [
      "You are sure you smell something but can't say what is it other than it is pleasant.",
      "Pinecones crack under your feet.",
      "You hear a light rustling from nearby.",
      "The dead tree is covered by fungus.",
      "The squirrel rapidly jumps between trees like a small red spark.",
    ],
    unknown: [
      "Literally nothing happens.",
      "You are alone.",
      "The sun shines.",
    ],
    city: [
      "Car rides by.",
      "A plane flies far away between the clouds.",
      "A piece of paper floats and flaps down the street, propelled by the wake of cars. It’s curious. Litter seems rare here.",
      "You hear the sounds of traffic.",
      "You smell...nothing. The city smells oddly clean.",
      "The sound of a helicopter is coming from the sky.",
      "The garbage truck has passed past you.",
    ],
    spring: [
      "You hear pleasant sounds of a waterfall.",
      "Light plays on the water surface of the small lake.",
      "You hear a distant laugh.",
      "You have come too close to the spring, and your feet are wet now.",
      "You see the big raccoon drinking water from the spring.",
    ],
    bridge: [
      "A weird shaped log flows by.",
      "You see the ripples on the river surface.",
      "<<set _lol = random(0,10)>><<if _lol == 10>>You see a body of your enemy floating by.<<else>>You see a leaf floating by.<</if>>",
"You see the yellow ball floating by. @@.mono;Maybe some little girl has accidentally dropped it to the river and cries now.@@",
"The wind is strong and blew the hat away from the accident passerby at the top of the bridge.",
    ],
    resort: [
      "You hear upbeat music from the beach bar.",
      "A couple of girls dressed in micro bikini pass by with cocktails in their hands.",
      "You hear happy squealing followed with a loud splash from the water park.",
      "A topless young girl is sunbathing on the lounge chair.",
      "The waiter hastes to the pool carrying the tray with the sweaty glass of beer.",      
    ],
    main: [
      "A little bird flies by.",
      "Literally nothing happens.",
      "A dog is barking.",
      "You see a small cloud undersky.",
    ],
  },
  bullseye: {
      generic: [
        "You see a customer arguing with a cashier.",
        "You notice a couple struggling with their cart. On wheel is faulty and the cart is going sideways all the time.",
        "You smell popcorn from the customer service area.",
        "You see a display offering bananas at a deep discount. It says they’re used.",
        "You see a buyer flirting with the nice cashier girl. The old lady behind him is annoyed by the long waiting and will soon be angry.",
        "You hear a loud sound of breaking glass behind you. Then you see the shop worker and the security officer, hasting to the scene."
      ],
      parking: [
        "You see a small piece of cardboard flying over the parking caught by a wind.",
        "An alarm on the black car goes triggered. A minute later some annoyed guy goes out from the doors and clicks his remote to turn it off.",
        "A cashier is having a smoke outside of the shop.",
        "You muse about the type of person who would leave their cart in the parking lot, and not in one of the corrals.",
        "You see a small car incident at parking. The awkward driver has hit her car on the pillar and distractedly looks to the dent.",
        "The family loads the heavy bags with groceries in the trunk of the pickup.",
      ],
      hardware: [
        "You see a long shelf full of professional-grade sanding machines.",
        "A bored guy is playing with the power drill pretending it is a handgun.",
        "There is a large display of locks. You wonder why there are so many types.",
        "A service consultant argues with the customer insisting that the electric screwdriver is broken by him and is not a warranty case.",
        "A farmer is staying at the box of agricultural tools, choosing a suitable shovel and rake.",
      ],
      electronics: [
        "You stare at the shelf full of TVs showing a bee flying around the flower.",
        "A woman near you is trying to choose an electric toothbrush using a consultant but seems not satisfied with the motor vibration levels. @@.npc;Do you have anything more powerful? My... teeth are not very sensitive.@@ @@.npd;Umm... yes, try this one.@@",
        "A boy bounces near the rack with modern game consoles. However, his father seems to reject buying the expensive toy, and the boy is almost ready to cry.",
        "A mature man dressed in a business suit asks the consultant for the DVD players. The consultant is a bit confused. He has probably heard of these obsolete devices but does not even remember what they were.",
      ],
      toys: [
        "You play with the toy car a little bit.",
        "It seems there are tons of pregnant dolls on the shelves. @@.mono;Not sure if this was the thing back in my childhood...@@",
        "A little girl is playing with the toy handgun pretending it is a power drill.",
        "A teenage boy is trying to choose the board game, deciding between the Monopoly and the Carcassone. Finally, he makes a decision and buys the Uno.",
      ],
      baby: [
        "Infant clothes look ridiculously tiny.",
        "You wonder why kid's clothes cost the same as adults despite less actual fabric needed to produce them.",
        "The baby bottles in this section seem larger than you remember.",
        "You see a woman pushing a double-wide stroller. You let her pass by before continuing down the aisle.",
        "There are colorful cans in the baby food section. Despite the attractive appearance, they all contain soybean paste with different artificial flavors.",
        "There are three sections of the infant clothes containing stuff for boys, girls, or other genders. The 'other' section contains goods of better quality.",
      ],
      grocery1: [
        "You see a woman staring at the cucumbers with a dumb mesmerized look.",
        "You look at small yellow lemon-like fruits. The price tag says that they are called 'Kumquats'. @@.mono;I wonder if they are tasty.@@",
        "You see the cheese section with many sorts of soybean tofu. A small locked shelf contains natural cheese. Some of them cost a fortune.",
        "The large color display shows the commercial of the best quality mince. The ticker at the bottom informs the attentive customer that the mince has been prepared from the genetically modified locusts.",
      ],
      grocery2: [
        "You see a woman staring at the cucumbers with a dumb mesmerized look.",
        "You look at small yellow lemon-like fruits. The price tag says that they are called 'Kumquats'. @@.mono;I wonder if they are tasty?@@",
        "A couple of nice girls dressed like old-fashioned cooks host the tasting session of fish nuggets. An aging playboy stays near the table, looking like he would better taste the girls rather than their food.",
        "You see the rows of colorful soy candies. They look seductively.",
      ],
      grocery3: [
        "You see a woman staring at the cucumbers with a dumb mesmerized look.",
        "You look at small yellow lemon-like fruits. The price tag says that they are called 'Kumquats'. @@.mono;I wonder if they are tasty.@@",
        "The fat boy is crying. He demands his mother to buy a large pack of potato chips.",
        "You see the fridge full of sweaty bottles of beer.",
      ],
      housewares1: [
        "There is a decided lack of toilet paper in this aisle.",
        "You look among the rows of cleansers for your favorite brand.",
        "You see bleach stocked next to ammonia and wonder why the store would stock things that way.",
        "The woman stays near the row of soap, choosing the most attractive brand.",
        	"The shop worker drives the cleaning machine, washing the already clean floor.",      
      ],
      housewares2: [
        "The row of picnic goods is almost empty. Well, the weather forecast promises the warm weekend, and the people are preparing to chill out.",
        "The funny man in the penguin costume advertises a shampoo brand. It is amazing what the people will do to make ends meet.",
      ],
      womens1: [
        "A woman is trying the dress of ethnic African style. However, she is a pure caucasian, and it is a comical sight.",
        "The women section has a lack of fitting rooms. There is a small queue of women waiting for their turn.",
      ],
      womens2: [
        "You have looked over a nice unisex jacket that could supplement your wardrobe. But while you were making up your mind, the woman in front of you has taken it outrunning you.",
        "A consultant has come to you, offering assistance in choosing the shoes. You have to refuse her help.",
      ],
      lingerie: [
        "You notice a shy-looking guy. He looks around nervously before inspecting the shelf with frilly panties.",
        "A woman on the corner of the hall accidentally drops the hanger.",
        "A fat mature woman asks the consultant to assist her in choosing the bikini. The consultant is in the difficult situation.",
        "You see the dummy dressed in a swimsuit. It looks so realistic that you were almost ready to speak with it taking the dummy to the real woman.",
      ],
      girls: [
        "You observe girl's clothes. They look like a smaller and more modest version of adult clothes.",
        "A little black girl is trying the T-shirts with images of the cartoon characters.",
        "You see the teenage girl arguing with her mother. The girl insists that she is too adult to continue dressing like a child.",
      ],
      boys: [
        "You try to recall what have you wear in your childhood but no avail.",
        "The ethnic style is back in fashion. Caring parents can dress up their boy so that he looks like an Indian, an African, or even a little Viking.",
        "While the father chooses the jeans for his son, the boy is running among the aisles. Finally, he stumbles and falls with a scream.",
      ],
      mens: [
        "You see a guy trying one jacket after another. It takes him some time before he finally finds the one that fits him.",
        "The man bought a pair of shoes and has worn them immediately. @@.npc;Is there any trash can to throw away my old boots?.@@",
        "You look at the men's business suits feeling nostalgic. Will you ever be able to wear such clothes again?",
      ],
      pharmacy: [
        "You observe the showcase full of drugs. Most names are unfamiliar to you.",
        "The section of contraceptives and erection stimulants is very big. It seems that the people of Appletree should have sex around the clock to find a use for all this stuff.",
        "A coughing guy asks the pharmacist for some cold medicine. You unwittingly take a step back. Getting infected is the last thing you need.",
      ],
      glasses: [
        "You try some glasses just for fun. Looking into the mirror you see that they made you look like an insect with giant eyes.",
        "You put on some glasses and turn to the mirror. You look like a badass cop.",
        "Trying some glasses you look at yourself in the mirror. You look like an egghead.",
        "The advertisement poster on the wall proposes the 20 percent discount to the customers who get the eyes checked in the shop.",
        "The horn-rimmed glasses are in the locked showcase. They became elite goods after the cattle fever had killed the vast majority of the American flocks.",
      ],
      barber: [
        "A guy sitting in the line sneezes.",
        "Two girls sitting on the couch are reading magazines.",
        "Barber cleans the floor from the hairs.",
        "A Latino barber is loudly talking by phone. You know Spanish a little, but it is clear that the guy curses and swears someone name of Diego, using all the riches of his native tongue.",
        "The tall man sits in the chair. The barber is bustling about his bushy beard.",
      ],
      custserv: [
        "You notice that guy at the counter seems to be sleeping with his head resting on his arm.",
        "A small woman stays in front of the map board, looking closely at the list of shops.",
        "A teenager makes a selfie in front of the large Thornton holographic logo near the customer service counter. ",
      ],
      produce: [
        "",
        "",
      ],
      changing: [
        "You see a white stain on the wall.",
        "You hear some muffed sobbing from the adjacent stall.",
        "You are standing on the clean floor covered with tiles.",
      ],
  },
  residential: {
    generic: [
      "You hear the ice-cream truck chimes from the street.",
      "A police siren is audible from the street.",
      "A helicopter flies above and for some reason you can't stop staring at it.",
      "You smell the warm asphalt. Two workers repair the sidewalk.",
      "You hear leaf rustling. Wind is rising.",
    ],
    common: [
      "A little ant is traveling across the table. @@.mono;Hello buddy. This place could use some cleaning, yeah?@@",
      "Somebody left a paper cup on the table.",
      "There is a pile of empty pizza boxes and bottles in a bag which was put into the corner. @@.mono;Did I miss the party?@@",
      "A pigeon proudly walks outside, seeking for the crumbs.",
    ],
    gym: [
      "A shy fat guy quickly gathers his things and leaves when you enter. @@.mono;I wonder if he’s too shy.@@",
      "You notice an odd white stain on the bench.",
      "Entering the gym you notice that somebody forgot their towel on the treadmill.",
      "It seems that the AC is broken again, it is really warm in the room. You push buttons on the remote but nothing happens.",
      "You enter the workout room and notice a girl wearing almost sheer yoga pants using the elliptical. She notices you checking her out and winks at you.",
      "Somebody put a 'Please clean your body fluids from the equipment after your training!' sign on the wall.",
      "You enter the workout room and notice a grim tall man beating up the punching bag furiously. He probably pretends that the bag is his sworn enemy or maybe his boss.",
      "A bodybuilder works with big dumbbells. Her muscles look like the thick wires under the brown skin.",
    ],
    party: [
      "You see some leftovers from a party.",
      "You see Shub-Nigghurat, the destroyer of worlds. You don't read these much, don't you?",
      "There is a couple of cardboard boxes in the corner.",
      "Janitor is cleaning the room and nods to you when you enter.",
      "A window is opened and you feel a chilly wind on your skin.",
      "You see Shub-Nigghurat, the destroyer of worlds. Uh no, it is just a janitor. But he looks alike a lot....",
      "You see the lonely sock hanging on a chandelier. There must be some funny story behind it.",
    ],
    main: [
      "You almost bump into the girl on the stairs, she smiles in an embarrassed fashion.",
      "It seems one of your neighbors moving in, there is a pile of cardboard boxes in the corner of the hall.",
      "Elevator seems to be broken so you take the stairs.",
      "Janitor mopping the floor gives you a long creepy look when you step onto the floor he just cleaned.",
      "You can swear you saw some nude person at the end of the hall but they turned by the corner just a moment after you entered.",
      "You hear your neighbors having a loud chat through the wall. @@.mono;Gosh, Linda is such a bitch, I wonder why Mick is still with her...@@",
      "You see the crooked graffiti on the wall informing you that Gandalf must be elected President. @@.mono;I have never heard of the politician name of Mr. Gandalf. Is he a donkey or an elephant?@@",
      "The baby carriage stays in the hall of the ground floor. It looks a bit battered. Perhaps it was bought in a second-hand shop.",
    ],
    parking: [
      "You see two guys arguing on the far side of the site, seems that they hit their cars while parking.",
      "As you go through the parking you notice a person in a hoodie poking the window of some car. When he notices you he leaves in a hurry.",
      "The alarm on the fancy crimson car goes off and you almost jump from the loud siren.",
      "Some kids seem to steal the shopping cart from Cum'n'Go and are riding it across the parking. @@.mono;If they scratch my car I'll go postal I swear!@@",
      "You go through the parking and see a guy with a sad face standing near the car. 'microdick' is written with spray paint all over his sedan. The man notices you and goes tomato red with embarrassment.",
      "You see some car desperately trying to park going back and forth but never managing to pull it off. @@.mono;Woah, this driver has no idea about correct parking angles at all.@@ After more than ten tries they finally get to the correct position and you see a blonde bimbo getting out. @@.mono;It's not surprising at all.@@",
      "There is a car wash near the parking entrance. It seems that the washers have no work today. Two Latino girls and a black guy sit around the low table playing blackjack.",
      "You smell burnt wiring. Perhaps you should leave the site and call the fire brigade before the fire breaks out. But in few seconds the smell disappears.",
    ],
    sidewalk: [
      "You see some Latino guy standing near the wall. @@.mono;I can swear it looks like he never leaves the spot.@@",
      "You hear a chime and jump to the side avoiding a collision with a cyclist right in time.",
      "There is a girl tripped over, the content of her purse is all around the concrete sidewalk. You notice a nice big dildo among her belongings.",
      "You look around and see an older male putting some posters on every tree. It seems somebody is missing.",
      "A couple of skimpily dressed girls having a chat with a guy at the corner. One of them gets into his car.",
      "Workers are replacing the glass of the bus stop. @@.mono;Institute really does it's best to make this town look spotless.@@",
      "A cyclist has whizzed by the sidewalk, snatching a handbag out of the hands of the old lady. In a second, you hear the sound of a gunshot and the thief lays on the ground bleeding. The APD officer is walking to him, holding a big pistol. @@.mono;They have determined police in Appletree. The cops don’t hesitate to shoot сriminals.@@",
      "You smell the aroma of good Virginia tobacco. An old man sits on the bench, smoking the pipe.",
      "A man throws a wad of paper to the trash bin. Suddenly the little raccoon jumps out of it and disappears into hedges."
    ],
    cumandgo: [
      "You notice that the rack normally holding condoms is practically empty @@.mono;Seems like someone is having a party...@@",
      "The place looks pretty empty which is surprising for the only shop in the block.",
      "You notice the young guy with a fresh cucumber and a pack of condoms in his cart finishing the purchase at the counter. @@.mono;I think I know <i>what</i> somebody is gonna do this evening, he-he!@@",
      "You see a woman arguing with the cashier, seems she is not satisfied enough with the quality of some cheap transformative she bought yesterday.",
      "The AC seems to be broken and soaking with sweat the cashier mashes the remote buttons trying to make it work.",
      "You hear an older couple arguing on the size of the condoms they should buy. Husband proposing the 'XL' size while his wife laughs sardonically.",
      "You see a young girl asking the cashier for the lubricant with a strong anesthetic. @@.mono;It seems that she is going to say farewell to her virginity. Good luck to her.@@",
      "An aging guy buys a bunch of pornographic magazines. Has he already despaired finding a real partner? He does not look too ugly, even for you.",
    ],
    recreation: [
      "You notice some girls having a picnic on the grass, it seems they decided that petting is the best addition to the red wine.",
      "@@.mono;What's that smell?@@ You turn your head and see an upset guy standing near the bbq in the gazebo. Dark black smoke and occasional flames lead you to the conclusion that there will be no tasty grill for him today.",
      "You notice a Groundskeeper. He seems to be more interested in ogling at the topless sunbathing girls near the pool than his work.",
      "A couple of guys flirt with a bimbo-looking woman near the tanning area.",
      "Taking a look around you see some mom running after her kid. @@.npc;No, Timmy! It is not for eating! Drop the damn thing! TIMMY!!!@@",
      "Going past the playground you hear the part of a conversation between some teenage girls. @@.npc;So you just stick it inside? Yikes! Mom says I should not think about such things until I grow older.@@ @@.npd;Oh come on, you are sixteen already, stop listening to this dumb church rat! It felt really cool!@@ @@.npc;Hey! Don't call her like that!@@",
      "You see a white guy sitting on the bench and staring at his slate. Occasionally he chuckles out loud. @@.npc;Ha! I like the science fiction of the twentieth century. They were so naive and ignorant describing their dreams of the future.@@",
      "You notice two small boys playing in the sandbox. One of them has awkwardly moved and destroyed the mud pie made by his friend. The friend has immediately avenged, hitting him with a plastic paddle, and they both are crying now.",
    ],
    walkdowntown: [
      "A car backfires as it drives past, startling you.",
      "A flock of birds is circling above and you can't help but stare at them for no reason.",
      "You notice a used condom on the sidewalk.",
      "Some hobo is pushing a cart full of hobo's stuff along the sidewalk.",
      "A stray dog is digging into the garbage. As you pass along it looks at you with sad eyes. @@.pc;Sorry, buddy, I have nothing for you. Hope you find something edible there.@@",
      "You see a couple of guys carrying a rolled carpet to the garbage bin.",
      "The worker is cutting the lawn along the sidewalk. You smell the scent of fresh-cut grass.",
      "You notice a white cat sticking in the tall poplar. The teenage boy stays under the tree, wondering if he can save the pet.",
    ],
    jogging: [
      "You see a topless girl jogging. Her jugs seem to bounce painfully but she doesn't look too troubled with it. @@.mono;Judging by the thick leather collar around her neck she is okay with discomfort, heh.@@",
      "You notice a guy drinking from a bottle, sweat running down his bare chest. @@.mono;Mmm, he looks handsome...@@",
      "You hear a curse and turn to see a girl tripped over. She has bruised her hip and rubs it with a frowned face.",
      "Going along the jogging path you notice a lost shoe. @@.mono;I wonder who has left it here. Seems like it belongs to a female.@@",
      "A woman stretching a couple of steps to the side of the jogging path.",
      "Some guys are arguing with a woman who decided that it is a good idea to walk along the jogging path blocking almost all of it with her pram.",
      "You see the modest billboard next to the jogging path. It states that the Thornton Institute donates this path to Appletree as a gift on City Day. @@.mono;The Institute is everywhere...@@",
      "You notice the refreshing drink stall next to the jogging path. Its owner must make good money selling cola and lemonade to the joggers.",
    ],
    reservoir: [
      "A wind creates ripples on the water surface.",
      "You hear a bird singing in the distance.",
      "The reservoir is large. The fog almost hides the other side of it.",
      "A couple of women rides the jet ski across the reservoir.",
    ],
    medical: [
      "Some woman coughs near you and you cover your mouth and nose with a hand. @@.mono;I really don't want to catch anything.@@",
      "You turn for the siren sound to see the ambulance going full speed to the hospital.",
      "You notice that the guy near you scratching his crotch area too much and decide to keep away. @@.mono;I touch my girl enough without any itching already, he-he.@@",
      "At the main entrance of the hospital, you see a little crowd greeting some girl. It seems she just got her new implants and her buddies are here to congratulate her.",
      "Hearing a noise you turn around and see a young guy in a wheelchair. He smiles when you take a step to the side and let him proceed.",
      "You see a black van coming to the rear entrance of the lab building. Two guys dressed in lab coats carry some weird plastic bag and put it into the trunk.",
      "You see a surgeon, wearing the nametag with Thornton logo. She radiates sexuality, even in her blue robe. @@.mono;I would like to watch an erotic movie with this girl in the title role, ha!@@",
      "Two guys dressed in lab robes are hasting somewhere. You hear scraps of their conversation. @@.npc;Is that boy in the reanimation now?@@ @@.npd;No, no. Johnson ordered to get him to the intensive care room. He is not in critical condition yet.@@",
    ],
    industrial: [
      "You hear machine noises from the building in front.",
      "A couple of workers going out from the large hangar.",
      "A tall chimney is billowing thick dark smoke clouds. @@.mono;I wonder why the environmental controllers don’t keep an eye on this plant!@@",
      "Five workers are loading packed boxes to the truck. They look tired.",
    ],
    government: [
      "A group of kids are following the young lady to the school gates.",
      "You see a couple of APD cops having a snack in their car.",
      "The offices look modest. There is just no comparison with the magnificent head office building of the Institute.",
      "There is a monument in the city square. It portrays the small apple tree and the man next to it, holding a stack of documents.",
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
      "It’s getting cloudy and darker, so you turn on the ceiling lamp.",
      "You hear loud sounds of gunshots and explosions, sometimes supplemented by the screams of rage and pain. @@.mono;There is either a fierce war in the next place or a teenager playing the game console. The second option is more probable.@@",
    ],
    kitchen: [
      "You open the fridge for no particular reason and stare inside blankly for some time.",
      "The kitchen sink makes a weird sound.",
      "You mindlessly play with a kitchen timer for some time before putting it back to the table.",
      "The trash bin is almost full. It’s time to feed the chute.",
      "Those dishes have been sitting in the sink since yesterday. @@.mono;I hate washing dishes, but this must be done.@@",
    ],
    bath: [
      "Water drips from the faucet.",
      "You hear water going through the pipes behind the wall.",
      "The tiled floor feels chilly under your feet.",
      "The mirror got stained and you think it could use some cleaning.",
      "The soap sliver lays lonely in the dish.",
      "The bathroom sink seems to be blocked. @@.mono;I have to call the plumber. Hm... this sounds like a premise of a porno movie...@@",
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
      "You see the billboard on the building opposite to yours. The holographic logo of the Thornton Institute has your eyes locked to it.",
      "You notice the woman on the next balсony. Seeing you, she nods and blows you a kiss. @@.mono;She looks pretty, after all.@@",
    ],
    bedroom: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
      "The pillow lays on the floor, the bed is a mess. @@.mono;It looks like I had a restless night. It was a bit too warm for me.@@",
      "The door has creaked when you enter the bedroom. @@.mono;The hinges need to be oiled, I think.@@",
    ],
    living: [
      "The carpet feels soft beneath your toes.",
      "The ceiling light flickers for just a moment.",
      "You see a bird fly by outside.",
      "You notice a little stain on the wall.",
      "You take the TV remote control and stare blankly to it. @@.mono;Is it a good idea to watch a movie?@@",
      "There is too much dust on the floor and furniture. @@.mono;This place needs a cleaning day.@@",
    ],
    foyer: [
      "You hear footsteps from behind the door.",
      "The wet soles of your shoes made a little puddle on the floor.",
      "The umbrella stands in the corner. ",
      "You feel the cold draft in the foyer. @@.mono;Oh shit, I forgot to close and lock the front door!@@",
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
      "You have turned on the sconce. The modern LED lamps are now filling the space with soft light.",
      "You have slipped and barely restored balance. @@.mono;This body is still a bit unfamiliar to me. It has too high center of gravity...@@",
    ],
    kitchen: [
      "You open the fridge for no particular reason and stare inside blankly for some time.",
      "The kitchen sink makes a weird sound.",
      "You mindlessly play with a kitchen timer for some time before putting it back to the table.",
      "There is the knife of the food processor in the kitchen sink. @@.mono;I must wash it carefully. It is too sharp.@@",
      "You take a piece of stale bread and mindlessly chew it. @@.mono;I suggest it to be bad for my figure. Ha... should I care after all?@@",
    ],
    bath: [
      "Water drips from the faucet.",
      "You hear water going through the pipes behind the wall.",
      "The tiled floor feels chilly under your feet.",
      "The mirror got stained and you think it could use some cleaning.",
      "The ceiling lamp is reflected on the shiny tiles covering the wall.",
      "A shower cabin stands in the corner.",
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
      "The old lady on the next balcony sits in the plastic armchair, smoking the long churchwarden pipe.",
      "You notice the soccer stadium not far from your building. @@.mono;When they have a play, it will be too noisy in my rooms.@@",
    ],
    bedroom: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
      "The soft bed looks tempting. @@.mono;Perhaps I could rest for a while.@@",
      "You notice an empty pack of condoms under the wardrobe. @@.mono;It seems that the previous inhabitants of these apartments had a good time here.@@",
    ],
    living: [
      "The carpet feels soft beneath your toes.",
      "The ceiling light flickers for just a moment.",
      "You see a bird fly by outside.",
      "You notice a little stain on the wall.",
      "There is the fashion magazine on a low table.",
      "You see a small yellow balloon floating by outside.",
    ],
    foyer: [
      "You hear footsteps from behind the door.",
      "The wet soles of your shoes made a little puddle on the floor.",
      "Your jacket is hanging on a hook. You notice a small mud stain on its sleeve.",
      "The automatic air freshener spreads the synthetic scent of mango around the room. @@.mono;Perhaps I should buy a cartridge of a pleasanter fragrance.@@",
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
      "You hear a soft noise outside. It has started raining, and dense fog hides the buildings out the window.",
      "You have turned on the ceiling light. The old-fasioned crystal chandelier is now like liquid sunshine."
    ],
    kitchen: [
      "You open the fridge for no particular reason and stare inside blankly for some time.",
      "The kitchen sink makes a weird sound.",
      "You mindlessly play with a kitchen timer for some time before putting it back to the table.",
      "You have opened the kitchen cabinet. The empty brandy bottle lonely stands on the top shelf.",
      "You have got the sweaty can from the fridge and sip the cold soda.",
    ],
    bath: [
      "Water drips from the faucet.",
      "You hear water going through the pipes behind the wall.",
      "The tiled floor feels chilly under your feet.",
      "The mirror got stained and you think it could use some cleaning.",
      "A large bathtub occupies the most part of the bathroom. @@.mono;I could lay here for hours. There even is a built-in whirlpool!@@",
      "A toilet bowl has a control panel on the side with more than a dozen buttons. After you have touched a button, you hear classical music from within the bowl. @@.mono;It is indeed a kind of perversion to take a dump to the Beethoven!@@",
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
      "You notice a funny fat guy flying above the roofs. The little rotor is spinning behind his back. Seeing you, he smiles and waves to you. Then he fades in air, and you smell a sweet fragrance. @@.mono;The tenants downstairs certainly smoke their weed again. Perhaps I should ask them to stop… or to share.@@",
      "Two swarthy guys on the opposite balcony smoke long hoses attached to the tall bottle. The water is loudly bulbing inside it. @@.mono;This thing is called a hookah, as far as I know.@@",
    ],
    bedroom: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
      "There is a big abstract painting on the wall above the bed. @@.mono;I wonder whether it depicts the sunset in the sea or the orgy in the pool. Ah yes… there is a label on the painting frame. It is a bouquet of roses.@@",
      "You see the reflection of you in the large mirror. @@.mono;Ha! If I still were a male, I would bang this chicklet!@@ ",
    ],
    bed2: [
      "The sunlight spot slowly moves across the bedroom.",
      "It gets unnaturally silent for some time.",
      "You notice the ant on the plinth.",
      "A sparrow knocks at the window with the beak. @@.mono;Sorry, fellow, I have nothing to feed you.@@",
      "Sometimes you ask yourself why you have two bedrooms in one-person apartments. Even the luxury should be reasoned.",
    ],
    living: [
      "The carpet feels soft beneath your toes.",
      "The ceiling light flickers for just a moment.",
      "You see a bird fly by outside.",
      "You notice a little stain on the wall.",
      "The hardwood floor creaks beneath your feet.",
      "There is a hardwood floor underneath this carpeting.",
    ],
    foyer: [
      "You hear footsteps from behind the door.",
      "The wet soles of your shoes made a little puddle on the floor.",
      "The African ethnic style mask decorates the wall looking at you with a hostile stare.",
      "The wireless router hangs from the ceiling blinking with green and yellow lights.",
    ],
  },
  BFhome: {
    generic: [
      "You hear distant car noises.",
      "The air is still.",
      "You hear the sound of a helicopter.",
      "You smell the musky aroma of incense sticks.",
    ],
    kitchen: [
      "You notice a dirty coffee cup on the table.",
      "The fridge makes weird noises.",
      "There's a half a bottle of wine on the table and a whiff of cheese in the air.",
      "You notice the refrigerator magnet depicting the logo of the Thornton Institute.",
    ],
    bath: [
      "You can smell some cologne.",
      "The toothbrush near the washbowl seems to be pretty used.",
      "The colorful shampoo bottles stand on the shelf. ",
      "You see the violet towel on the rack. @@.mono;This piece of cloth does need a little laundry.@@",
    ],
    balcony: [
      "You can see clouds slowly moving far far away.",
      "There is an empty cup on the windowsill.",
      "It is raining, and you don’t want to stay here for long.",
      "The fog hides the roofs of the distant buildings.",
    ],
    bedroom: [
      "It smells good here but you can't say what is it.",
      "You notice an old movie poster on the wall. It seems it's been here for a long time.",
      "You notice the furry handcuffs attached to the headboard. @@.mono;It seems that my friend likes bedroom games.@@",
      "You notice a big black dildo on the nightstand. @@.mono;It is so huge! I wonder what guy gave the original of it!@@",
    ],
    living: [
      "The coffee table seems to be well used.",
      "The light flickers for a moment.",
      "You see the dried flowers in the vase on the low table.",
      "The TV is on.",
    ],
    foyer: [
      "You see a line of well-organized shoes.",
      "You hear some street noise from the outside.",
      "You notice a wet umbrella in the corner. The rainwater made a little puddle on the floor.",
      "The fashion coat casually hangs on the hook.",
    ],
    exterior: [
      "Some trash bags lie at the door next to the one you are standing near.",
      "You hear a bicycle ring from the street.",
      "The staircase is decorated with graffiti, depicting the cartoony boat in the sea. @@.mono;This rowing rabbit looks a bit stunned. Perhaps he wonders how he came to this. Exactly like me...@@",
      "Somebody goes down the stairs. You hear the heavy footsteps.",
    ],
  },
  downtown: {
    generic: [
      "You hear distant car noises.",
      "You see people going along the street.",
      "A dog is barking around the corner.",
      "A pigeon is proudly walking next to the curb.",
    ],
    parking: [
      "You see two guys arguing on the far side of the site, seems that they hit their cars while parking.",
      "As you go through the parking you notice a person in a hoodie poking the window of some car. When he notices you he leaves in a hurry.",
      "The alarm on the fancy crimson car goes off and you almost jump from the loud siren.",
      "Some kids seem to steal the shopping cart and are riding it across the parking. @@.mono;If they scratch my car I'll go postal I swear!@@",
      "You go through the parking and see a guy with a sad face standing near the car. 'microdick' is written with spraypaint all over his sedan. The man notices you and goes tomato red with embarrassment.",
      "You see some car desperately trying to park going back and forth but never managing to pull it off. @@.mono;Woah, this driver has no idea about correct parking angles at all.@@ After more than ten tries they finally get to the correct position and you see a blonde bimbo getting out. @@.mono;It's not surprising at all.@@",
      "There is a car wash near the parking entrance. It seems that the washers have much work today. Two black guys and a white girl are hustling around the green convertible, while two other cars are waiting for their turn.",
      "You smell burnt wiring. Perhaps you should leave the site and call the fire brigade before the fire breaks out. Ah, somebody has done it already. You hear the fire alarm.",
    ],
    holefoods: [
      "You hear a couple discussing the size of the cucumbers. @@.npc;John, I know you like them shorter but thicker, let's take a couple.@@ @@.npd;Oh Mary, you'll render me incontinent one day. Screw it, you live only once after all. Take this one.@@ @@.npc;Wow, such a giant thingy! I love you, my sweet apple-pie!@@ @@.mono;Ugh... gross.@@",
      "You see a yonger man along with a mature woman chatting in the vegetable section. @@.npd;...but...@@ @@.npc;Yes you will, that is my last word. Don't make me buy a ginger root for your butt again. Last time you whimpered like a little boy you are remember?@@ @@.npc;...yes mistress...sorry mistress...@@",
      "Two butchers from the meat department having a chat about deer meat.",
      "You see a cockroach under the shelf.",
      "Strolling along the shops you hear a chat between a customer and a cashier. @@.npc;Why yes, miss, it is the best quality human protein, no aromatizers!@@ @@.npd;Okay, I'll take a bottle. Pack it please.@@",
      "You ogle the shelf with various cheeses but have literally no idea what the difference is.",
      "You see the box of pineapples. @@.mono;They are so giant! I think they are genetically modified with the genes of an elephant!@@",
      "You notice the locked shelf with cans of black caviar. @@.mono;I thought that the sturgeons have already gone extinct. Seeing the price, I even understand why.@@",
    ],
    corp: [
      "A couple of older guys in suits are sitting on the bench.",
      "A luxurious car is parked near the entrance of the building. Young pretty woman opens the car's door for an elder man in a suit and leads him inside.",
      "A window cleaner stays in the scaffold on the fourth floor, dousing glass from a hose.",
      "A tall man wearing glasses is talking with a younger guy. @@.npc;Rephrasing the old Russian poet, if you are destined to be born in the country owned by corporates, it is better to live in the godforsaken province by the sea. However, if you can not afford it, you must do your job well. @@ @@.npd;...but… yes mister Johnson!@@",
    ],
    main: [
      "You hear a bird singing.",
      "You hear road traffic.",
      "You sneeze.",
      "You see a thick cloud on the horizon.",
      "You hear the police siren far away",
    ],
    bank: [
      "A couple of collectors are withdrawing cash from the ATM machine.",
      "A group of women are discussing stock fonds.",
      "The large poster advertises the Thornton Institute student loan. @@.mono;A modern way to sell yourself into slavery...@@",
      "You see a nice young woman arguing with a mature bank manager. @@.npc;No, no. The bank does not agree to delay your credit payment third time. Either you will pay in a week, or we will send loan collectors to catalog your belongings.@@ @@.npd;To catalog my belongings? I would better go on the streets!@@ @@.npc;It’s an option. How much will you ask for an hour?@@",
    ],
    townhall: [
      "An old janitor is mopping the floors.",
      "It smells like sweat and old paper.",
      "You hear a phone ringing",
      "A man dressed in the business suit hastes upstairs holding a leather briefcase.",
      "A reception girl stays behind the counter, looking at you with a fixed smile.",
    ],
    square: [
      "You see ripples on the surface of the fountain.",
      "A couple of teens are riding the skateboards around the fountain.",
      "You hear water splashing",
      "An old lady sits on the stone bench, feeding pigeons.",
      "The street musician stays next to the flower bed, playing a vigorous melody of the city anthem with the saxophone.",
    ],
    park: [
      "You see some couple having a picnic on the grass. They look young and adorable. @@.mono;Awww.@@",
      "You take a look around and see an older woman feeding ducks in the pond.",
      "Going down the gravel road you notice a pair of elders playing chess on a bench.",
      "Turning your head to the sound you see a small group of girls giggling at some joke.",
      "You notice a girl in bikini working on her tan. It seems she is a big fan of it because her ass and back are already as brown as a potato.",
      "As you proceed through the park you see a couple of workers from the nearby shop having their lunch break on the grass.",
      "Two enraged guys are having a heated discussion. As far as you hear, they cannot reach an agreement, which of them is a fucked faggot. @@.mono;I wonder why they hate homosexuality so badly. Also, I wonder when they start fighting.@@",
      "You see the tall billboard next to the park entrance. It states that the Thornton Institute donates this park to Appletree as a gift of gratitude and respect. @@.mono;Is there any recreation place in Appletree, which is not a gift of the Institute?@@",
    ],
    community: [
      "Two elders are playing chess at the table.",
      "You see a couple of babysitters watching for the kids at the playground.",
      "You hear a loud annoyed voice. @@.npc;Timmy, damn! Grass is not for eating!@@ The woman is really furious but can't stop Timmy from chewing with a happy face. @@.npc;For the last time I... Gosh, I'd better be barren...@@",
      "You see four teenagers on the volleyball court. A couple of girls plays against a couple of boys. @@.mono;I wish them to draw in the name of gender equality!@@",
      "You hear screams of two little girls playing in the sandbox. @@.npc;Betty, you’re an ugly frog! I am not your friend anymore! I will be a friend of Julio, he gave me a candy!@@ @@.npd;Maggy, I am sorry! I will give you a piece of gum, ok? Julio is bad! He broke my paddle!@@ @@.npc;All right then. Where is your gum?@@",
    ],
    mall: [
      "A couple of women trying to find a shopping cart without a broken wheel.",
      "Young cashier gets out from the shop with a cigarette and heads to the parking elevator.",
      "You see an electrician fixing the lift.",
      "You almost trip over the 'Caution, wet floor!' sign.",
      "Lounge music stops for a moment before starting from the beginning.",
      "A short guy is pushing a heavy loaded cart with purchases. It seems that one of the wheels is broken, and the cart is turning left all the time.",
      "You notice the icecream stall next to the entrance. A teenage boy has just bought a snow cone for his girlfriend. She gratefully smiles, and her escort looks like he is over the moon.",
    ],
    foodcourt: [
      "You see a tired woman with a kid at the table. @@.npc;Timmy, dammit, stop throwing fries!@@ Timmy seems to be too happy to listen.",
      "A janitor cleans tables from food leftovers and paper cups.",
      "A group of girls are laughing loudly in the center of the food court.",
      "You can swear you have noticed a rat in the corner of the food court.",
      "@@.npc;Fuck!@@ You turn around and see a woman spilled her soup over her white skirt.",
      "You see a little crowd at the counter of ‘Soyburger Queens’. The home cooking cantine nearby is almost empty. @@.mono;This is the future of foodservice. The cheap plastic sandwiches become more popular than the expensive natural food.@@",
      "You can smell french fries. @@.mono;It is tempting. Am I already hungry?@@",
    ],
    movies: [
      "You see a woman shifting uneasily in the line to the cinema WC door.",
      "A little pile of spilled popcorn is crunching under your feet.",
      "You hear muffed movie sounds from behind the cinema hall's door.",
      "Cinema worker is replacing posters with new titles.",
      "You see a kid and a woman in the line for tickets. @@.npc;But mom, I want to see 'Lesbians from hell!'@@ @@.npd;Timmy! It is not a movie for a teen. We are going to see 'Trans-porners 6', end of discussion.@@",
      "The large display shows the trailer of the new porno thriller ‘Hucow Run’. You hear a voice-over. @@.npc;The beautiful young hucow finds out that her master is going to stop milk production and to slaught his cattle for meat. She urges her fellows to raise a riot, but the cunning rancher does not mess around...@@",
      "You notice a teenage girl arguing with a cashier guy. @@.npc;No, miss, I cannot sell you a ticket to ‘Sex Warriors’! It is a movie for adults only.@@ @@.npd;I am an adult! I am no virgin, I even know how to do blow-job! Do you think that I will see something new?@@ @@.npc;Really? Wait for me next to WC, I’ll come soon and check. If you don’t lie, I’ll present a ticket to you.@@",
    ],
    exterior: [
      "You see workers cleaning the windows of the mall. Half of this side of the building is already done.",
      "As you stand near the entrance you notice a guy stuck in the rotating glass doors and a couple of mall employees trying to help him.",
      "You see a man trying to fit his purchases into his car.",
      "A plastic tree is covered by red lights. It looks like the tree is burning from a distance.",
      "There are many cars on the parking. Most of them are of the Appletree car-sharing service.",
    ],
    fitta: [
      "You see a pair carrying a cardboard box with some furniture to the checkout.",
      "A girl next to you is staring at the shelf with big candles biting her lip.",
      "You notice a guy trying to hide a plate between the shelves. @@.mono;He-he, somebody doesn't want to pay for broken stuff.@@",
      "You stroll around the kitchen department and see the old gay couple having an argument about the table color.",
      "A little boy is crying, seems that he has lost his parents in the big shop.",
      "You see a worker screwing furniture in the bedroom section.",
      "You hear a scream of pain, and then loud curses addressed to the 'stupid fucked moron'. The awkward worker has hurt the foot of the customer, driving his electric cart over it. @@.mono;I’ll bet that the shop will go bankrupt paying the compensation!@@",
    ],
    westshop: [
      "You notice a little 'Pop kids save America!' sticker on the street lamp's post.",
      "You almost step into the puddle of coffee on the concrete sidewalk.",
      "You hear a police siren from afar.",
      "A crazy-looking guy holding an 'end is nigh' sign is talking with an APD officer.",
      "You see a snack stall. The fat woman has bought the hotdog and eats it with an appetite.",
      "A couple has walked past you chatting.",
    ],
    bbb: [
      "A suspiciously bulky girl in a frilly dress passes by with a cart full of pink-colored purchases.",
      "You notice an older bearded guy watching at his girlfriend with a bored look. She is very excited and screams with joy running back to him from the shelves. @@.npc;Look, daddy, look! Such a cute pillow! I want it, please daddy, pretty pleeeease!@@ Guy looks at the heart-shaped pink pillow with a disgust and sighs. @@.npc;Anything you wish, kitty.@@",
      "You see a woman asking the cashier. @@.npc;Young man, please tell me if you have here something of another color than pink!@@",
      "The shop looks almost empty.",
    ],
    northshop: [
      "You see a group of skimpily dressed girls passing by.",
      "A bulky guy with a tattoos on his face passes by.",
      "You notice the used condom on the sidewalk.",
      "An APD officer is talking with a topless woman on the sidewalk. @@.npc;No offense, miss but your crotch is visible and this is illegal.@@ @@.npd;Come on, it is showing just a tiny bit, officer!@@ @@.npc;Law is law, miss.@@ @@.npd;Gosh... okay, how much is the fine?@@",
      "The fat gray cat is sitting on the sidewalk, staring at you. @@.mono;Fellow, you look like the owner of this place! May I pass?@@",
      "It looks like it’s going to rain. @@.mono;Perhaps I should find a shelter.@@",
    ],
    southshop: [
      "A person dressed in a fursuit passes by.",
      "You see a spider sitting on the wall.",
      "You hear the buzzer of an ambulance van.",
      "You notice a dead leaf on the sidewalk.",
      "You see a hobo on the bench. He lays and sleeps, spreading the aroma of the old sweat. It smells foul in here. @@.mono;God save me to end up like this!@@",
    ],
    voidshop: [
      "You hear arcade machine sounds and some 8-bit music from the Pleasure Buzzer.",
      "You notice some slimy stains on the floor.",
      "You notice a graffiti on the wall. The crooked colorful letters seem to be a signature of somebody nickname of Hedgehog.",
      "The floor is covered by ceramic tiles. Some of them are broken. @@.mono;This place needs some repair.@@",
    ],
    club: [
      "You see a drunken guy puking in the corner.",
      "Muffed music is audible from behind the closed club doors.",
      "A couple of girls are french kissing in corner.",
      "You see a guy glancing around before inhaling something from a small bottle.",
      "You notice a couple of guys trying to pick up some drunken girls.",
      "Two guys are trying to count their remaining funds, but they are way too drunk to achieve any success.",
      "You notice a tall guy in the corner couch playing game console. His homely girlfriend half-lays side-by-side hugging him and trying to get his attention with no success. @@.mono;He is playing ‘Porno Combat’, honey. Frankly, it is much more addictive for certain people than kissing or even banging.@@ ",
      "You see a crowd erratically jumping on the dancing floor. The loud electronic music drowns the squeaks of the hardwood floor. @@.mono;I bet that there is somebody selling drugs. It is impossible to enjoy these sounds without being stoned!@@",
    ],
    amuse: [
      "You hear the sounds of orchestrion from the open windows.",
      "You see a guy selling hotdogs on a little stand in the street. Looks not very tasty.",
      "A woman with three kids is passing by. Every kid has a colored air balloon.",
      "An older man dressed in a business suit is passing by. He looks alien at this place.",
      "You notice a cunning snout of the raccoon in the depth of hedges.",
    ],
    adult: [
      "A slutty dressed girl talks with a guy near you. They laugh and he hands her something before they go to the shady bystreet. @@.mono;Seems somebody gonna get a blowjob soon...@@",
      "You hear some grunting and sobbing noises from the lane between two buildings.",
      "Young topless girl is advertising something with cards glued to her tits. You take a step forward and see that it is 'Prude' sex shop ads.",
      "You notice a couple of girls selflessly petting in the alley. One of them has put the hand under the shirt of her mate, while the other is stroking in pants.",
      "You see a young girl, talking with an adult guy. @@.npc;I am in awe of your lovely tender face and dainty fingers! I like the girls looking like a teenagers!@@ @@.npd;Honestly, I am a teenager, in fact. I am thirteen years old, honey. It does not bother you, right?@@ @@.npc;It bothers me, of course! Listen, child, run to your school and don’t show you baby face around here!@@ @@.npd;Then fuck youself, moron!@@",
    ],
    northwest: [
      "The traffic lights seem to be off and it takes a while until you finally manage to cross the road.",
      "You turn your head in the direction of music and see a street musician playing a saxophone.",
      "@@.npc;Timmy!!! Stay near me, it is dangerous to go to the road! The car can hit you!@@ Woman takes a boy by the hand.",
      "You see a traffic jam. The workers repair the road, narrowing it by almost half.",
      "You notice a crushed frog in the middle of road.",
    ],
    west: [
      "You hear an icecream van chimes from afar.",
      "You see two guys in sport clothes squatting funnily.",
      "A group of guys exit from the 'Hinden Burger' laughing loudly.",
      "The APD officer stays on the sidewalk staring at you with suspicion.",
      "The luxurious red convertible has passed by you. The driver had taken eyes off the road to blow you a kiss and barely avoided kissing a pole.",
    ],
    southwest: [
      "A heavily tattooed girl passes by. When she notices your stare she winks.",
      "You see a guy carrying a lifesize doll in a cardboard.",
      "Loud cracking sound makes you turn around to see two cars hitting each other under the traffic light.",
      "The road sweeper is slowly crawling by you rustling.",
      "You notice the graffiti on the wall depicting the crooked red dick and three letters under it. @@.mono;The first one is certainly X, the second one is Y. The third one must be Z, but I wonder why the painter turned it sideways and mirrored. Perhaps this is a signature.@@",
    ],
    northeast: [
      "You notice a young woman with a small purse trying to get her heel out of drain lattice.",
      "A small group of children are led by a teacher to the yellow bus. @@.npc;Did you like the excursion?@@ she asks and kids make affirmative noises.",
      "As you go along the sidewalk you notice a small pile of clothes. A nice looking homeless dog is sleeping on top of the rugs.",
      "A сyclist has rode in puddles, dousing the fashionably dressed guy with dirty water. @@.npc;Hey! You fucking son of a bitch!@@",
      "You notice a roach on the sidewalk.",
    ],
    east: [
      "You see a sewerage hatchway opened with a worker halfway inside of it. A big box of tools is standing near him.",
      "You smell some bakery.",
      "Looking at the people at the street you notice a girl adjusting her bra.",
      "You see a kid holding the big air balloon. @@.mono;Its shape looks a bit weird. Damn it, this is an inflated condom!@@",
      "There is a lack of trash bins on this street. No wonder that the sidewalk is buried in garbage.",
    ],
    southeast: [
      "You notice an empty wallet on the ground.",
      "Guy on the other side of the road scratches his crotch.",
      "A couple of girls pass by with paper bags from a clothing store.",
      "You notice a billboard, advertising the newly opened private dating club. @@.mono;Well, ‘the brothel’ or ‘the whorehouse’ does not sound politically correct.@@",
      "You smell the fragrance of the fresh flowers.",
    ],
  },
};
