/*
██╗███╗   ██╗██╗   ██╗
██║████╗  ██║██║   ██║
██║██╔██╗ ██║██║   ██║
██║██║╚██╗██║╚██╗ ██╔╝
██║██║ ╚████║ ╚████╔╝
╚═╝╚═╝  ╚═══╝  ╚═══╝
  ITEM DESCRIPTIONS
*/

interface awInvItems {
  image: object;
  info: object;
}

// namespace
if (aw.invItems === null || aw.invItems === undefined) {
  aw.invItems = {} as awInvItems;
}

// image names
aw.invItems.image = {
  "Menstrual Cup": "IMG-MenstrualCup",
  "Coop Member Card": "IMG-Item-CoopMember",
  "Smart Toilet Fertility Module": "IMG-FertilityModule",
  "Car Keys": "IMG-Items-CarKeys",
  "Focker's Dark Roast": "IMG-FockersDarkRoast",
  "NipJoy Manual Breast Pump": "IMG-ManualBreastPump",
  "Dainty-Tits Electric Breast Pump": "IMG-ElectricBreastPump",
  "Happy Teats Breast Pump": "IMG-StrongBreastPump",
  "Pump-O-Tron Breast Pump": "IMG-SuperBreastPump",
  "Nipplex Industrial Breast Pump": "IMG-IndustrialBreastPump",
  "Nilfex Magic Milker Breast Pump": "IMG-MagicBreastPump",
  "e-vie Overnight Breast Pump": "IMG-MilkPumpEvie",
  "EvreDrop Milk Saver": "IMG_Item_MilkSaver",
  "Gene Therapy 01": "IMG-ClassifiedDocuments",
  "Gene Therapy 02": "IMG-ClassifiedDocuments",
  "Gene Therapy 03": "IMG-ClassifiedDocuments",
  "Gene Therapy 04": "IMG-ClassifiedDocuments",
  "Gene Therapy 05": "IMG-ClassifiedDocuments",
  "Gene Therapy 06": "IMG-ClassifiedDocuments",
  "BasiPill Birth Control": "IMG-Item-BasiPillMonth",
  "Tummy Hugger": "IMG-Items-TummyHugger",
  "Golden Funnel": "IMG-Item-GoldenFunnel",
  "Ivory Dildo": "IMG-Item-IvoryDildo",
  "Bread": "IMG-Item-CookBread",
  "Cheese": "IMG-Item-CookCheese",
  "Eggs": "IMG-Item-CookEggs",
  "Ham": "IMG-Item-CookHam",
  "Hucow milk": "IMG-Item-CookHucowMilk",
  "Lettuce": "IMG-Item-CookLettuce",
  "Mayo": "IMG-Item-CookMayo",
  "Patty": "IMG-Item-CookPatty",
  "Pickles": "IMG-Item-CookPickles",
  "Soy milk": "IMG-Item-CookSoyMilk",
  "Flour": "IMG-Item-CookFlour",
  "Oil": "IMG-Item-Oil",
  "Tomato": "IMG-Item-Tomato",
  "Potato": "IMG-Item-Potato",
  "Testicles": "IMG-Item-Testicles",
  "Crappy Blini": "IMG-Item-Blini",
  "Blini": "IMG-Item-Blini",
  "Good Blini": "IMG-Item-Blini",
  "Crappy Burger": "IMG-Item-Burger",
  "Burger": "IMG-Item-Burger",
  "Good Burger": "IMG-Item-Burger",
  "Crappy Omelette": "IMG-Item-Omelette",
  "Omelette": "IMG-Item-Omelette",
  "Good Omelette": "IMG-Item-Omelette",
  "Crappy Salad": "IMG-Item-Salad",
  "Salad": "IMG-Item-Salad",
  "Good Salad": "IMG-Item-Salad",
  "Crappy Sandwich": "IMG-Item-Sandwich",
  "Sandwich": "IMG-Item-Sandwich",
  "Good Sandwich": "IMG-Item-Sandwich",
  "Crappy Cheesecake": "IMG-Item-Cheesecake",
  "Cheesecake": "IMG-Item-Cheesecake",
  "Good Cheesecake": "IMG-Item-Cheesecake",
  "Crappy Pizza": "IMG-Item-Pizza",
  "Pizza": "IMG-Item-Pizza",
  "Good Pizza": "IMG-Item-Pizza",
  "Crappy Lasagne": "IMG-Item-Lasagne",
  "Lasagne": "IMG-Item-Lasagne",
  "Good Lasagne": "IMG-Item-Lasagne",
  "Crappy Pasta": "IMG-Item-Pasta",
  "Pasta": "IMG-Item-Pasta",
  "Good Pasta": "IMG-Item-Pasta",
  "Crappy Cookies": "IMG-Item-Cookies",
  "Cookies": "IMG-Item-Pasta",
  "Good Cookies": "IMG-Item-Pasta",
  "Crappy Fried Eggs": "IMG-Item-FriedEggs",
  "Fried Eggs": "IMG-Item-FriedEggs",
  "Good Fried Eggs": "IMG-Item-FriedEggs",
  "Crappy Doner kebab": "IMG-Item-Doner",
  "Doner kebab": "IMG-Item-Doner",
  "Good Doner kebab": "IMG-Item-Doner",
  "Crappy Prairy Oysters": "IMG-Item-PrairyOysters",
  "Prairy Oysters": "IMG-Item-PrairyOysters",
  "Good Prairy Oysters": "IMG-Item-PrairyOysters",
  "Crappy Goulash": "IMG-Item-Goulash",
  "Goulash": "IMG-Item-Goulash",
  "Good Goulash": "IMG-Item-Goulash",
  "Crappy Omorashi soup": "IMG-Item-Omorashi",
  "Omorashi soup": "IMG-Item-Omorashi",
  "Good Omorashi soup": "IMG-Item-Omorashi",
  "Crappy Black angus star": "IMG-Item-Bac",
  "Black angus star": "IMG-Item-Bac",
  "Good Black angus star": "IMG-Item-Bac",
  "Crappy Busted balls": "IMG-Item-BustedBalls",
  "Busted balls": "IMG-Item-BustedBalls",
  "Good Busted balls": "IMG-Item-BustedBalls",
  "Crappy Snake salad": "IMG-Item-Snake",
  "Snake salad": "IMG-Item-Snake",
  "Good Snake salad": "IMG-Item-Snake",
  "Crappy Lich Meat": "IMG-Item-Lichmeat",
  "Lich Meat": "IMG-Item-Lichmeat",
  "Good Lich Meat": "IMG-Item-Lichmeat",
  "Gluck": "IMG-Item-Gluck",
  "Model 1911": "IMG-Firearm-1911",
  "Blyat 22": "IMG-Firearm-CykaBlyat",
  "E7": "IMG-Firearm-E7Plasma",
  "Gluck G20": "IMG-Firearm-G20",
  "Institute Sidearm": "IMG-Firearm-Institute",
  "Kraft 11": "IMG-Firearm-Kraft10",
  "LCR": "IMG-Firearm-LCR",
  "Compact Pistol": "IMG-Firearm-Tauran",
  "Lily's Access Card": "IMG_Item_AccessCard",
  "Cheap dildo": "IMG-cheapDildo",
  "Realistic dildo": "IMG-Item-realisticDildo",
  "Black Hero dildo": "IMG-Item-BlackHero",
  "Horse cock dildo": "IMG-Item-HorseCock",
  "Small buttplug": "IMG-smallPlug",
  "Crystal buttplug": "IMG-Item-crystalPlug",
  "Silicone buttplug": "IMG-Item-siliconePlug",
  "Chastity belt": "IMG-Item-ChastityBelt",
  "Cplate 200": "IMG-Item-CPlate",
  "Clit shield": "IMG-Item-ClitShield",
  "Chastity belt key": "IMG-Item-ChastityKey",
  "Cplate 200 remote": "IMG-Item-CPlateRemote",
  "Clit shield remote": "IMG-Item-CshieldRemote",
  "Ball Gag": "IMG-Item-Ballgag",
  "Magic Wand": "IMG-Item-MagicWand",
  "Ben Wa balls": "IMG-Item-BenWa",
  "Golf ball": "IMG-Item-GolfBall",
  "Little Monster": "IMG-Item-LittleMonster",
  "Leather cuffs": "IMG-Item-LeatherCuffs",
  "Liter of Semen": "IMG-Item-Semen1L",
  "Appletree Magnet": "IMG-Item-Magnet",
  "Sultry Eve Enema Kit": "IMG-Item-SultryEnema",
  "The French Saboteur": "IMG-Item-Saboteur"
};

// descriptions
aw.invItems.info = {
  "Menstrual Cup": `A feminine hygiene product from Hippie-Chic that replaces tampons or pads without adding to landfills. It sits on the cervix similar to a diaphragm, but is bent more into a "cup" that provides room for fluid near the cervix. It has a warning on the box... @@.print;"Empty at least every 4 hours to prevent toxic shock syndrome. Intended only to catch menstrual blood, do not use to store other fluids near the cervix."@@`,
  "Coop Member Card": `A simple plastic ID card you got from the Appletree Farm Coop when you became a member.`,
  "Generic Lubricant": `A standard economy-size bottle of personal lubricant.',
  "Sultry Eve Enema Kit": 'A complete reusable enema kit from "Sultry Eve". Includes a dual-bulb inflatable enema retention plug, as well as standard nozzle options. @@.print;"Keep your back door ready to explore, with Sultry Eve!"@@`,
  "Smart Toilet Fertility Module": `An addition to the standard health-monitoring smart toilet, this module adds the capability for your bathroom suite to inform you of important fertility information such as ovulation, and improves pregnancy detection speed, as early as 24 hours after zygote implantation.`,
  "Car Keys": "The keys to your old Misubitchi Lingual.",
  "Gluck": "Semi-automatic pistol, 9mm, almost full magazine.",
  "Model 1911": "Designed over 100 years ago, the Simpson's Armory Model 1911 is still around, and has been copied, customized, and modified by countless firearms manufacturers over the decades. While there's no single reason for the design's persistence, and newer designs have surpassed it in every category but nostalgia, it remains a functional and effective weapon.<br><br>Ammunition: .45 ACP | 8 rounds | Semi Auto",
  "Blyat 22": "Cyka is a Slavic firearms company in North Asia. The Blyat design started as a whale project to create a machine pistol in the United Kingdom. In a rare bout of good decision-making, the UK government decided to give up on designing their own weapons and instead bought from the Germans. The abandoned design was appropriated by Cyka and eventually turned into their signature weapon. They solved the most pressing issues with the design by using lighter ammunition, but it still has a high rate of jams and misfires. Despite the overall poor quality of the design and manufacturing, it has remained popular because it is extremely simple to modify the civilian model to fire in full automatic.<br><br>Ammunition: 22LR | 33 rounds | Automatic",
  "E7": "The E7 Plasma Pistol from EAF is the only plasma weapon available to the civilian market. Because of the extreme lethality of plasma weapons combined with their ability to ignore most types of police body armor, they are expected to be banned in the near future. This has made the E7 very popular due to the 'buy it while you still can' mentality. Despite this popularity, the weapon has several drawbacks: its bulk and weight make single-handed operation impractical, it requires a warmup period before firing the first time, and both the weapon and ammunition are very expensive.<br><br>Ammunition: E7 Cartridge | 10-20 shots | Semi Auto",
  "Gluck G20": "The Gluck G20 is a full-frame handgun used primarily by law enforcement. While sharing the same basic design as all the Gluck full-frame weapons, this one is chambered to fire 10mm ammunition. The basic Gluck design has been around for decades, though occasional minor updates are made to improve the design. This particular weapon is a Gen5 design. While somewhat more expensive than other options, the Gluck G20 has proven to be reliable and effective.<br><br>Ammunition: 10mm | 15 rounds | Semi Auto",
  "Institute Sidearm": "This firearm was most likely obtained illegally from the Institute. Civilian possession is likely illegal due to the presence of a burst fire mode. The weapon seems to fire frangible flechettes at extremely high speed. Little else is known about the weapon. Acquiring new ammunition is likely to be extremely difficult or outright impossible.<br><br>Ammunition: Flechette | 75 | Semi Auto / 4 Round Burst",
  "Kraft 11": "The Milwaukee Brewery and Firearms Kraft 11 is a civilian version of a weapon originally produced by the now-defunct Wisconsin Armaments Corporation. The original M11 subcompact machine pistol--commonly called the WAC-11--was manufactured in the 1970s and intended for military use. The Kraft 11 is an almost exact copy of the original design, however the fire mode selection mechanism is not included. A knowledgeable individual can manually change to automatic firing mode by disassembling the weapon, though this is illegal. MBF maintains that nostalgia for 1980s action movies is the largest driver of Kraft 11 sales, and not the potential for automatic fire.<br><br>Ammunition: .38 ACP | 30 rounds | Automatic",
  "LCR": "The Lugie Light Compact Revolver is exactly what the name implies: it's both light and compact. Designed to be reliable and easy to carry, this weapon is focused on self defense. A laser sight is built into the firearm between the barrel and trigger guard, improving accuracy at short range and reducing the likelihood of the weapon getting caught on something. Because of its short barrel, this weapon has rapidly decreasing accuracy for distances beyond 10m.<br><br>Ammunition: 9mm | 5 rounds | Double Action",
  "Compact Pistol": "The Tauran Union Compact Pistol CP38 is a small semi-automatic handgun intended to be easy to carry for self defense or as a backup weapon. The weapon is unique because it has a curved frame, allowing it to be carried more snugly against the hip or leg. The curved handgrip requires that you use the correct hand, and can take a little getting used to. The weapon comes equipped with a compact LED flashlight in front of the trigger guard.<br><br>Ammunition: .38 ACP | 8 rounds | Semi Auto",
  "Focker's Dark Roast": "Some rather generic coffee that comes pre-ground in a large resealable tub. Not great quality, but not completely awful, the dark roast promises extra caffeine (and bitterness).",
  "NipJoy Manual Breast Pump": "The NipJoy Manual Breast Pump is a simple and inexpensive milk pumping solution. It is light-weight and portable, and the large simple diaphragm and one-piece valve keep it relatively easy to clean for a manual pump. It features a threaded attachment that is compatible with a wide range of bottles and storage containers. Like most manual pumps, this breast pump isn't intended for high-volume extraction. Suction strength is limited, and many mothers consider this sort of pump only as a backup device.",
  "Dainty-Tits Electric Breast Pump": "The Dainty-Tits electric breast pump is a simple no-fuss pump. Each pump is only strong enough for a single breast, but the units are commonly sold in sets of two. They have a built-in battery that will last one to two sessions, but also can use AC power. Because they are electric they can be used hands-free, but their lack of suction power puts them in the low end of the performance spectrum.",
  "Happy Teats Breast Pump": "The Happy Teats electric breast pump is a professional-grade model for the discerning mother. In fact, it's just the consumer packaging for the same model found in hospitals. The unit is hygienic and the collection unit can be taken apart for easy cleaning and sterilization. Additional collection units can be purchased for further convenience. The strong suction and high performance help to make this a very popular model.",
  "Pump-O-Tron Breast Pump": "The Pump-O-Tron Breast Pump is an unusual model that straddles the gap between breastfeeding mother and professional hucow in terms of performance. This model was originally intended as a portable unit for HuCows on the go, though it remains quite large and heavy. It is also sold alongside more standard pumps for the benefit of women feeding several babies, or those who suffer from milk overproduction. A warning label indicates that it's best to leave this model to HuCows unless approved by a doctor, as the increased suction and high-flow collection shields will likely result in excessive milk production. This particular model comes with hucow-grade teat cups and carrying straps.",
  "Nipplex Industrial Breast Pump": "The Nipplex Dairy R0-LY model is a fairly standard industrial home milker. It uses hucow-grade teat cups that boast mechanically-simulated two stage collection. With lower suction, and lacking true two-stage collection, this model isn't nearly as efficient as emplaced milk equipment found in a professional dairy. However, the model is capable of depositing large quantities of milk directly into cryo canisters, and can be easily rolled around the average home. Models like these have made it much easier for professional hucows by removing the need to go to their dairy collection facility for overnight milkings.",
  "Nilfex Magic Milker Breast Pump": "The Nilfex Magic Milker is the most capable home milker available on the market at an affordable price point. It features high-powered suction utilizing a dual high-diameter piston pump. The high diameter pistons keep the volume level reasonable for home use, while still providing superior suction to an impeller-based model. It also features true two-stage milking, with teat stimulation and rhythmic compression to simulate oral suction activity for greatest biological letdown response. The unit is intended for use with cryo canisters, holding a single in-use canister for direct milk deposit and an easy overflow system to fill exterior canisters. The Magic Milker is large and heavy compared to less-capable models, but still can be easily rolled about the home thanks to high-quality castor wheels.",
  "e-vie Overnight Breast Pump": "The e-vie started out as a wearable breast pump that would milk the wearer at low intensity through the course of the day, with the objective of removing the need for dedicated milking sessions. While effective, the limited storage capacity required frequent emptying. Combined with a battery life lasting only about 8 to 9 hours, it never really caught on with breastfeeding mothers. With a few modifications, however, it quickly caught on with hucows as an overnight milker. It allows them to sleep without having to get up to pump, or more commonly, waste a lot of milk due to leaking. While mostly useless as an dedicated pump, it will allow you to collect milk overnight to sell.",
  "EvreDrop Milk Saver": "EvreDrop Milk Savers are a type of milk collection nipple shield. They don't connect to a pump, and are instead intended to passively collect milk that leaks from nipples. They can prevent lactating breasts from creating a mess, but won't remove the need for regular breast pumping. Using these without regular milking will result in decreased milk production. They aren't popular with hucows for a number of practical reasons.",
  "Gene Therapy 01": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 01' 3>><<include [[StoryGeneTherapy01a]]>><</interact>><</link>>",
  "Gene Therapy 02": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 02' 3>><<include [[StoryGeneTherapy02a]]>><</interact>><</link>>",
  "Gene Therapy 03": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 03' 3>><<include [[StoryGeneTherapy03a]]>><</interact>><</link>>",
  "Gene Therapy 04": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 04' 3>><<include [[StoryGeneTherapy04a]]>><</interact>><</link>>",
  "Gene Therapy 05": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 05' 3>><<include [[StoryGeneTherapy05a]]>><</interact>><</link>>",
  "Gene Therapy 06": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 06' 3>><<include [[StoryGeneTherapy06a]]>><</interact>><</link>>",
  "BasiPill Birth Control": `A box containing a one-month packet of BasiPill birth control pills. You can open the box and remove the packet and instructions to learn more. You must open the box to be able to take the pill each day. <<link "OPEN">><<addconsumable "BasiPill" 28>><<drop "$items" "BasiPill Birth Control">><<addTime 5>><<run Dialog.close()>><<replace "#menuContent">><<include [[MENU-Character-Inventory]]>><</replace>><</link>>`,
  "Tummy Hugger": "Since time immemorial, women have wanted to check up on their unborn children. In the twentieth century, ultrasound finally made that a possibility. In the early twenty-first, enhanced technology and new devices made the check up more accurate than ever... But it still required a long visit to the doctor's office, not to mention co-pays and a limited number of visits. Now Weyland Industries has finally enabled women to check on their babies from the comfort of their own homes. The Tummy Hugger® takes all the uncertainty out of home ultrasound; patented Hug Fingers® hold the Tummy Hugger in position and make minute adjustments for the best scan possible. The Tummy Hugger's Cuddle Pads® contain patented resonance receiver technology that provides a 4D scan without the need for constant pushing and repositioning of the scanner probe. Use with your phone to view and record your scans, read detailed reports including the StorkTracker® due date estimate, and even send scans to your doctor.",
  "Golden Funnel": "This item is an unusual Native American Relic. It consists of a gold exterior with a smooth-glazed ceramic interior. It's obvious that a lot of work must have went into its creation. The funnel appears to literally be a cum funnel, based on its shape and the paintings where you found it. The bottom of the funnel spout forms something like a cervical cup, while the spout itself seems to be intended to help keep the funnel in position in the vagina. While you don't know what to do with an ancient fertility device, you're sure it'd be worth a good amount of money to the right person. @@.note;(You can sell this at the Prude Store downtown for now.)@@",
  "Ivory Dildo": "A very old veiny dildo made out of what seems to be ivory. You're no expert, but it seems obvious that there aren't a lot of animals currently alive in North America that could produce ivory this large. It makes you wonder if perhaps it's wooly mammoth tusk. You aren't exactly enthusiastic about using an ancient Native American dildo on yourself, but you figure you could sell it to the right buyer for some good money. @@.note;(You can sell this at the Prude Store downtown for now.)@@",
  "Bread": "A bag with loafs of bread.",
  "Cheese": "Some fancy cheese made from natural hucow milk.",
  "Eggs": "6 eggs in a cardboard.",
  "Ham": "A piece of Ham. For some reason, it is written 'HAMster' on the package.",
  "Hucow milk": "A jug of natural hucow milk from local Farm COOP.",
  "Lettuce": "A lettuce for salads and whatnot.",
  "Mayo": "Good ol' mayonnaise in a jar.",
  "Patty": "Two pieces of meat ready for cooking.",
  "Pickles": "A jar of pickled cucumbers.",
  "Soy milk": "Cheap imitation made of soy, pretty widespread milk substitute after Furious cow disease pandemic.",
  "Flour": "Very well crushed wheat.",
  "Oil": "Cooking oil in a bottle.",
  "Tomato": "Round red vegetable.",
  "Potato": "A popular vegetable for various dishes.",
  "Testicles": "Traditional main ingredient for 'Prairy Oysters' and other popular dishes.",
  "Crappy Blini": "Pancakes, Russian style. May cause Bestification... The quality is pretty poor.",
  "Blini": "Pancakes, Russian style. May cause Bestification...",
  "Good Blini": "Pancakes, Russian style. May cause Bestification... The quality is extremely good.",
  "Crappy Burger": "A sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The quality is pretty poor.",
  "Burger": "A sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
  "Good Burger": "A sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The quality is extremely good.",
  "Crappy Omelette": "A dish made from beaten eggs in a frying pan. The quality is pretty poor.",
  "Omelette": "A dish made from beaten eggs in a frying pan.",
  "Good Omelette": "A dish made from beaten eggs in a frying pan. The quality is extremely good.",
  "Crappy Salad": "A vegetable salad, healthy and nice. The quality is pretty poor.",
  "Salad": "A vegetable salad, healthy and nice.",
  "Good Salad": "A vegetable salad, healthy and nice. The quality is extremely good.",
  "Crappy Sandwich": "Two slices of bread with some ham and cheese between them. The quality is pretty poor.",
  "Sandwich": "Two slices of bread with some ham and cheese between them.",
  "Good Sandwich": "Two slices of bread with some ham and cheese between them. The quality is extremely good.",
  "Crappy Cheesecake": "A sweet dessert consisting of several layers of cheese and egg. The quality is pretty poor.",
  "Cheesecake": "A sweet dessert consisting of several layers of cheese and egg.",
  "Good Cheesecake": "A sweet dessert consisting of several layers of cheese and egg. The quality is extremely good.",
  "Crappy Pizza": "A round baked pie-like thing invented in Italy around XVII century. The quality is pretty poor.",
  "Pizza": "A round baked pie-like thing invented in Italy around XVII century.",
  "Good Pizza": "A round baked pie-like thing invented in Italy around XVII century. The quality is extremely good.",
  "Crappy Lasagne": "A stacked layers of pasta alternated with sauces and various ingredients. The quality is pretty poor.",
  "Lasagne": "A stacked layers of pasta alternated with sauces and various ingredients.",
  "Good Lasagne": "A stacked layers of pasta alternated with sauces and various ingredients. The quality is extremely good.",
  "Crappy Pasta": "Italian food typically made from an unleavened dough. The quality is pretty poor.",
  "Pasta": "Italian food typically made from an unleavened dough.",
  "Good Pasta": "Italian food typically made from an unleavened dough. The quality is extremely good.",
  "Crappy Cookies": "Baked food that is typically small, flat and sweet. The quality is pretty poor.",
  "Cookies": "Baked food that is typically small, flat and sweet.",
  "Good Cookies": "Baked food that is typically small, flat and sweet. The quality is extremely good.",
  "Crappy Fried Eggs": "Just some fried eggs, all-time classic. The quality is pretty poor.",
  "Fried Eggs": "Just some fried eggs, all-time classic.",
  "Good Fried Eggs": "Just some fried eggs, all-time classic. The quality is extremely good.",
  "Crappy Doner kebab": "A sandwich made of meat and various vegetables. The quality is pretty poor.",
  "Doner kebab": "A sandwich made of meat and various vegetables.",
  "Good Doner kebab": "A sandwich made of meat and various vegetables. The quality is extremely good.",
  "Crappy Prairy Oysters": "A popular midwest dish with bull's testicles in a sauce. The quality is pretty poor.",
  "Prairy Oysters": "A popular midwest dish with bull's testicles in a sauce.",
  "Good Prairy Oysters": "A popular midwest dish with bull's testicles in a sauce. The quality is extremely good.",
  "Crappy Goulash": "A stew of meet and vegetables with paprika. The quality is pretty poor.",
  "Goulash": "A stew of meet and vegetables with paprika.",
  "Good Goulash": "A stew of meet and vegetables with paprika. The quality is extremely good.",
  "Crappy Omorashi soup": "A traditional Japanese soup made from various ingredients. Known for distinctive yellow color and delicious taste. The quality is pretty poor.",
  "Omorashi soup": "A traditional Japanese soup made from various ingredients. Known for distinctive yellow color and delicious taste.",
  "Good Omorashi soup": "A traditional Japanese soup made from various ingredients. Known for distinctive yellow color and delicious taste. The quality is extremely good.",
  "Crappy Black angus star": "Seasoned and fried dish made from specific rare parts of a cow's meat. The quality is pretty poor.",
  "Black angus star": "Seasoned and fried dish made from specific rare parts of a cow's meat.",
  "Good Black angus star": "Seasoned and fried dish made from specific rare parts of a cow's meat. The quality is extremely good.",
  "Crappy Busted balls": "Well tenderized deep-fried meatballs, this dish was invented by famous European misandrist chief Hanna Stern. The quality is pretty poor.",
  "Busted balls": "Well tenderized deep-fried meatballs, this dish was invented by famous European misandrist chief Hanna Stern.",
  "Good Busted balls": "Well tenderized deep-fried meatballs, this dish was invented by famous European misandrist chief Hanna Stern. The quality is extremely good.",
  "Crappy Snake salad": "The simplest dish known to the humanity. The quality is pretty poor.",
  "Snake salad": "The simplest dish known to the humanity.",
  "Good Snake salad": "The simplest dish known to the humanity. The quality is extremely good.",
  "Crappy Lich Meat": "A weird traditional dish from Guam. It is basically an oddly shaped ham salad. The quality is pretty poor.",
  "Lich Meat": "A weird traditional dish from Guam. It is basically an oddly shaped ham salad.",
  "Good Lich Meat": "A weird traditional dish from Guam. It is basically an oddly shaped ham salad. The quality is extremely good.",
  "Lily's Access Card": "An access key Lily gave you that when combined with your biometric data will allow you to enter her basement lab from the street. In small print on one side it says 'May contain high explosive. Do not microwave or submerge in water.",
  "Cheap dildo": "A cheap small dildo made from PVC.",
  "Realistic dildo": "A silicone dildo molded after someone's pretty massive cock.",
  "Black Hero dildo": "A big silicone dildo shaped as a big black cock.",
  "Horse cock dildo": "A silicone stallion dildo of an impressive size.",
  "Small buttplug": "Not that big anal plug made of silicon.",
  "Crystal buttplug": "Cute small metal buttplug.",
  "Silicone buttplug": "An ordinary silicone buttplug from 'Doc Moreau' brand.",
  "Chastity belt": "Classical chastity belt covering the pussy and preventing any touching or intercourse.",
  "Cplate 200": "Modern female chastity belt using most modern technologies to block any access yo the wearer's pussy.",
  "Clit shield": "A smaller version of Cplate 200 covering only the clitoris of the wearer.",
  "Chastity belt key": "A key for a classical chastity device. Seems ridiculously overpriced for just an ordinary key.",
  "Cplate 200 remote": "A remote for the Cplate 200 chastity device. Packing says that it is not compatible only with Cplate 200 and doesn't work with Clit shield.",
  "Clit shield remote": "A remote for the Clit shield chastity device. Packing says that it is not compatible only with Clit shield and doesn't work with Cplate 200.",
  "Ball Gag": "A mouth gag with a leather strap holding the big red ball in place.",
  "Magic Wand": "A famous vibrator initially created as a muscle tension relieving device.",
  "Ben Wa balls": "Two hollow balls containing weights that roll around for inserting into the vagina.",
  "Golf ball": "The ball for popular game. You probably gonna use it exactly for this purpose, right?",
  "Little Monster": "The smartphone squirt egg intended to deliver fresh sperm deep into user's pussy. Requires cum for loading.",
  "Leather cuffs": "Black arm restrains made of quality leather locked with belts.",
  "Liter of Semen": "A special cryo vessel from Ferti-Seed containing one liter of preserved all-natural semen. The semen is guaranteed to be fertile after proper reactivation, and is even listed as being '100% human`. The container has special instructions on the back for thawing and reactivation, and warnings such as 'Do not Microwave'.",
  "Appletree Magnet": "Cheap 'I luv Appletree' magnet. Since your refrigerator is made from aluminum you can't even stick it there so it is useless.",
  "The French Saboteur": "This surprisingly-large device is an innovation sponsored by the Cock Liberation Army in France. It is simple to operate: simply place a still-wrapped condom inside the device, close the lid, and press the button on the front. The device will unseal the foil wrapper, apply a series of weakening cuts to the inside of the reservoir tip, and apply latex-degrading UV light before resealing it in the original foil. The sabotaged condom is nearly indistinguishable from a normal condom, but is almost certain to split open upon the start of ejaculation. The weakening cuts are designed to minimize the chance of latex fragments being left in the vagina. @@.note;To sabotage a condom: just 'use' a condom of your choice outside of sex.@@",
};

