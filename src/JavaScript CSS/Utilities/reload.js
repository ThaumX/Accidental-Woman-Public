setup.refresh = function() {
  let passage = ["StoryBanner","StoryCaption","StoryRightSidebar"];
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
};
