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
  "Smart Toilet Fertility Module": "IMG-FertilityModule",
  "Car Keys": "IMG-Items-CarKeys",
  "Focker's Dark Roast": "IMG-FockersDarkRoast",
  "NipJoy Manual Breast Pump": "IMG-ManualBreastPump",
  "Dainty-Tits Electric Breast Pump": "IMG-ElectricBreastPump",
  "Happy Teats Breast Pump": "IMG-StrongBreastPump",
  "Pump-O-Tron Breast Pump": "IMG-SuperBreastPump",
  "Gene Therapy 01": "IMG-ClassifiedDocuments",
  "Gene Therapy 02": "IMG-ClassifiedDocuments",
  "Gene Therapy 03": "IMG-ClassifiedDocuments",
  "Gene Therapy 04": "IMG-ClassifiedDocuments",
  "Gene Therapy 05": "IMG-ClassifiedDocuments",
  "Gene Therapy 06": "IMG-ClassifiedDocuments",
  "BasiPill Birth Control": "IMG-Item-BasiPillMonth",
  "Tummy Hugger": "IMG-Items-TummyHugger",
};

// descriptions
aw.invItems.info = {
  "Menstrual Cup": `A feminine hygiene product from Hippie-Chic that replaces tampons or pads without adding to landfills. It sits on the cervix similar to a diaphragm, but is bent more into a "cup" that provides room for fluid near the cervix. It has a warning on the box... @@.print;"Empty at least every 4 hours to prevent toxic shock syndrome. Intended only to catch menstrual blood, do not use to store other fluids near the cervix."@@`,
  "Generic Lubricant": `A standard economy-size bottle of personal lubricant.',
  "Sultry Eve Enema Kit": 'A complete reusable enema kit from "Sultry Eve". @@.print;"Includes several nozzle sizes for an easy no-mess clean feeling"@@`,
  "Smart Toilet Fertility Module": `An addition to the standard health-monitoring smart toilet, this module adds the capability for your bathroom suite to inform you of important fertility information such as ovulation, and improves pregnancy detection speed, as early as 24 hours after zygote implantation.`,
  "Car Keys": "The keys to your old Misubitchi Lingual.",
  "Focker's Dark Roast": "Some rather generic coffee that comes pre-ground in a large resealable tub. Not great quality, but not completely awful, the dark roast promises extra caffeine (and bitterness).",
  "NipJoy Manual Breast Pump": "The NipJoy Manual Breast Pump is a simple and inexpensive milk pumping solution. It is light-weight and portable, and the large simple diaphragm and one-piece valve keep it relatively easy to clean for a manual pump. It features a threaded attachment that is compatible with a wide range of bottles and storage containers. Like most manual pumps, this breast pump isn't intended for high-volume extraction. Suction strength is limited, and many mothers consider this sort of pump only as a backup device.",
  "Dainty-Tits Electric Breast Pump": "The Dainty-Tits electric breast pump is a simple no-fuss pump. Each pump is only strong enough for a single breast, but the units are commonly sold in sets of two. They have a built-in battery that will last one to two sessions, but also can use AC power. Because they are electric they can be used hands-free, but their lack of suction power puts them in the low end of the performance spectrum.",
  "Happy Teats Breast Pump": "The Happy Teats electric breast pump is a professional-grade model for the discerning mother. In fact, it's just the consumer packaging for the same model found in hospitals. The unit is hygienic and the collection unit can be taken apart for easy cleaning and sterilization. Additional collection units can be purchased for further convenience. The strong suction and high performance help to make this a very popular model.",
  "Pump-O-Tron Breast Pump": "The Pump-O-Tron Breast Pump is an unusual model that straddles the gap between breastfeeding mother and professional hucow in terms of performance. This model was originally intended as a portable unit for HuCows on the go, though it remains quite large and heavy. It is also sold alongside more standard pumps for the benefit of women feeding several babies, or those who suffer from milk overproduction. A warning label indicates that it's best to leave this model to HuCows unless approved by a doctor, as the increased suction and high-flow collection shields will likely result in excessive milk production.",
  "Gene Therapy 01": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 01' 3>><<include [[StoryGeneTherapy01a]]>><</interact>><</link>>",
  "Gene Therapy 02": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 02' 3>><<include [[StoryGeneTherapy02a]]>><</interact>><</link>>",
  "Gene Therapy 03": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 03' 3>><<include [[StoryGeneTherapy03a]]>><</interact>><</link>>",
  "Gene Therapy 04": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 04' 3>><<include [[StoryGeneTherapy04a]]>><</interact>><</link>>",
  "Gene Therapy 05": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 05' 3>><<include [[StoryGeneTherapy05a]]>><</interact>><</link>>",
  "Gene Therapy 06": "A anachronistic sheaf of computer paper labeled <span class='bad'>TOP SECRET</span>. You probably shouldn't have this. <<link 'READ'>><<interact 'Gene Therapy 06' 3>><<include [[StoryGeneTherapy06a]]>><</interact>><</link>>",
  "BasiPill Birth Control": `A box containing a one-month packet of BasiPill birth control pills. You can open the box and remove the packet and instructions to learn more. You must open the box to be able to take the pill each day. <<link "OPEN">><<addconsumable "BasiPill" 28>><<drop "$items" "BasiPill Birth Control">><<addTime 5>><<run Dialog.close()>><</link>>`,
  "Tummy Hugger": "Since time immemorial, women have wanted to check up on their unborn chidren. In the twentieth century, ultrasound finally made that a possibility. In the early twenty-first, enhanced technology and new devices made the check up more accurate than ever... But it still required a long visit to the doctor's office, not to mention co-pays and a limited number of visits. Now Weyland Industries has finally enabled women to check on their babies from the comfort of their own homes. The Tummy Hugger® takes all the uncertainty out of home ultrasound; patented Hug Fingers® hold the Tummy Hugger in position and make minute adjustments for the best scan possible. The Tummy Hugger's Cuddle Pads® contain patented resonance receiver technology that provides a 4D scan without the need for constant pushing and repositioning of the scanner probe. Use with your phone to view and record your scans, read detailed reports including the StorkTracker® due date estimate, and even send scans to your doctor.",
};

