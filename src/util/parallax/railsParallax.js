import {Pestle} from '@natgeo/pestle';

module.exports = function(config) {
  const {leftRail, rightRail, viewportHeight, resetFunction} = config;

  //if both rails aren't present, do not create parallax effect
  if(!leftRail || !rightRail) { return }

  const leftRailHeight = leftRail.getBoundingClientRect().height;
  const rightRailHeight = rightRail.getBoundingClientRect().height;
  const railDifference = Math.abs(leftRailHeight - rightRailHeight);
  let sticky = false;

  // if the rails are not sufficiently unequal, do not create parallax effect
  if(railDifference < 100) {
    return;
  }

  let shorterRail;
  let shorterRailHeight;
  let tallerRail;
  let tallerRailHeight;
  let railsDuration;

  //assign vars depending on which rail is taller
  if(leftRailHeight < rightRailHeight) {
    shorterRail = leftRail.getElementsByClassName("mt3_parallax-wrap")[0];
    shorterRailHeight = leftRailHeight;
    tallerRail = rightRail;
    tallerRailHeight = rightRailHeight;
  } else {
    shorterRail = rightRail.getElementsByClassName("mt3_parallax-wrap")[0];
    shorterRailHeight = rightRailHeight;
    tallerRail = leftRail;
    tallerRailHeight = leftRailHeight;
  }

  //animate differently (sticky) if the smaller rail is smaller than the viewport
  if (viewportHeight > shorterRailHeight) {
    sticky = true;
    railsDuration = railDifference;
  } else {
    railsDuration = tallerRailHeight - viewportHeight;
  }

  Pestle.PubSub.publish('ParallaxScenes.addParallaxScene', {
    triggerElement: tallerRail,
    duration: railsDuration,
    parallaxElement: shorterRail,
    transformDistance: railDifference,
    resetFunction: resetFunction,
    sticky: sticky
  });
}
