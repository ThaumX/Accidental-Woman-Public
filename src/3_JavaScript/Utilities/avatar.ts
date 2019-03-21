
//                             888
//                             888
//                             888
//   8888b.  888  888  8888b.  888888  8888b.  888d888
//      "88b 888  888     "88b 888        "88b 888P"
//  .d888888 Y88  88P .d888888 888    .d888888 888
//  888  888  Y8bd8P  888  888 Y88b.  888  888 888
//  "Y888888   Y88P   "Y888888  "Y888 "Y888888 888

interface SetupAvatar {
  load: () => void;
  createCanvas: () => void;
  showPlayer: () => void;
  hidePlayer: () => void;
}

setup.avatar = {
  load(): void {
    da.load().then(function() {
      // all drawing related functions in here
      const canvasGroup = da.getCanvasGroup("avatarCunt", {
        // provide some styling options; width and height are particularly important
        border: "1px solid white",
        width: 300,
        height: 700,
      });
      aw.con.info("created canvas group");
      window.PC = new da.Player({
        name: "Player",
        occupation: "Experimental Subject",
        // provide specific values here to override the default ones set
        age: ↂ.pc.main.age,
        fem: 12,
        sub: 2,
        // base physical dimensions
        basedim: {
          areolaSize: 35.35601543318134,
          armThickness: 58.468958260259555,
          armLength: 45,
          breastSize: 40.50859347597334,
          buttFullness: 20.203437390389336,
          chinWidth: 49.75447211504735,
          eyelashLength: 6.39775517362329,
          eyeSize: 13.019992984917572,
          faceFem: 40,
          faceLength: 222.42721851981761,
          faceWidth: 84.76499473868817,
          hairLength: 56.794107330761136,
          hairStyle: 4,
          hairHue: 360,
          hairSaturation: 44.896527534198526,
          hairLightness: 48.26376709926342,
          handSize: 118.9757979656261,
          height: 173.65022421524662,
          hipWidth: 137.12030866362682,
          legFem: 40,
          legFullness: 10.326201332865661,
          legLength: 98.79340582251841,
          lipSize: 19.754472115047353,
          lowerMuscle: 0,
          neckLength: 60.610312171168005,
          neckWidth: 39.93861802876184,
          penisSize: 50,
          shoulderWidth: 69.58961767800773,
          skin: -0.3577692037881448,
          testicleSize: 60,
          upperMuscle: 0,
          vaginaSize: 65.43497757847534,
          waistWidth: 104.12136092599088,
        },
        // overriding body parts
        parts: [
          da.Part.create(da.VaginaHuman),
          //            da.Part.create(da.TesticlesHuman),
          //            da.Part.create(da.PenisHuman),
        ],
        faceParts: [],
        decorativeParts: [
          //            da.Part.create(da.PenisHeadHuman),
          da.Part.create(da.BeautyMark),
        ],
        Mods: {
          armRotation: 0.4089686098654681,
          arousal: 33.2914798206278,
          breastPerkiness: 14.917572781480182,
          browBotCurl: -0.8161434977578477,
          browTopCurl: 6.6457399103139,
          browCloseness: 0.7910313901345294,
          browHeight: 3.5461883408071753,
          browLength: -0.5865470852017935,
          browSharpness: -1.0457399103139018,
          browThickness: -3.5713004484304935,
          browOutBias: 0.10224215246636703,
          browTilt: -1.173094170403587,
          cheekFullness: 5.59102069449316,
          earlobeLength: -0.45106980007015096,
          eyeBias: -3.5713004484304935,
          eyeCloseness: 19.39013452914797,
          eyeBotBias: -2.882511210762332,
          eyeBotSize: 0.20448430493273406,
          eyeHeight: -5.52914798206278,
          eyeTilt: 2.95964125560538,
          eyeTopSize: 1.9849327354260087,
          eyeWidth: -0.35695067264573943,
          eyelashBias: 17.207174887892375,
          eyelashAngle: -0.10457399103139009,
          eyelidBias: 0.10224215246636703,
          eyelidHeight: 0.6671343388284807,
          feetBias: 0.43844265170115726,
          feetWidth: 0.47281655559452673,
          hairAccessoryHue: 202.03437390389334,
          hairAccessorySaturation: 59,
          hairAccessoryLightness: 43,
          handRotation: 10.284110838302354,
          irisHeight: -1.0457399103139018,
          irisHue: 119.84932735426008,
          irisSaturation: 58.54708520179373,
          irisLightness: 58.54708520179373,
          irisSize: 18.94170403587444,
          jawJut: -4.387934058225184,
          limbalRingSize: 25.255605381165918,
          lipBias: 9.695067264573986,
          lipCupidsBow: -7.47264573991032,
          lipCurl: -4.846636771300448,
          lipHeight: 1.0206278026905835,
          lipTopCurve: -20.152466367713007,
          lipTopSize: -20,
          lipBotSize: 50.181165919282506,
          lipWidth: -125.4439461883408,
          neckCurve: -6.531041739740441,
          noseHeight: -6.556053811659193,
          noseLength: 47.41165919282511,
          noseRidgeHeight: -2.882511210762332,
          noseRoundness: 4.469596412556054,
          noseWidth: 19.413452914798206,
          nostrilSize: 11.026905829596412,
          pupilSize: 12.346545071904595,
          labiaFullness: 4.815854086285514,
          skinHue: -0.2547085201793706,
          skinSaturation: -4.846636771300448,
          skinLightness: 4.337219730941705,
          age: -0.02511210762331828,
          areolaSize: 19.949775784753363,
          breastSize: 40,
        },
        // overriding clothing (default to simple red underwear)
        clothes: [
          //da.Clothes.create(da.Bra, da.sheerFabric),
          //da.Clothes.create(da.Panties, da.sheerFabric)
        ],
      });
      aw.con.info("finished creating player thingy");
      const exports = da.draw(canvasGroup, window.PC);
      //da.showCanvasGroup("avatarCunt");
    });
  },
  createCanvas(): void {
    const canvasGroup = da.getCanvasGroup("avatarCunt", {
      // provide some styling options; width and height are particularly important
      border: "1px solid white",
      width: 300,
      height: 700,
    });
    const exports = da.draw(canvasGroup, window.PC);
  },
  showPlayer(): void {
    da.showCanvasGroup("avatarCunt");
  },
  hidePlayer(): void {
    //const canvasGroup = da.getCanvasGroup("avatarCunt");
    da.hideCanvasGroup("avatarCunt");
  },
};

// reacquiring the canvas
// var canvasGroup = da.getCanvasGroup("player");

/* Toggling visibility
// hiding it and then immediately showing it again
da.hideCanvasGroup("player");
da.showCanvasGroup("player");
*/

