
// refreshes the UI elements and map wx element w/o changing passage
setup.refresh = function(): void {
  const passage: [any, any, any] = ["StoryBanner", "StoryCaption", "StoryRightSidebar"];
  passage[0] = Story.get(passage[0]);
  passage[1] = Story.get(passage[1]);
  passage[2] = Story.get(passage[2]);
  const $targetA = jQuery("#story-baner");
  const $targetB = jQuery("#story-caption");
  const $targetC = jQuery("#right-ui-bar-body");
  $targetA.empty();
  $targetB.empty();
  $targetC.empty();
  $targetA.wiki(passage[0].processText());
  $targetB.wiki(passage[1].processText());
  $targetC.wiki(passage[2].processText());
  try {
    aw.replace("#altergale", "<<print setup.weather.curWeather()>>");
  } catch (e) { /*do nothing on purpose!*/ }
};

