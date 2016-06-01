'use strict';

var FIXTURE_ID = 'fixture';

function insertFixture(html) {
  var fixture = '<div id="' + FIXTURE_ID + '">' + html + '</div>';
  // Add fixture as first child of the body element
  document.body.insertAdjacentHTML('afterbegin', fixture);
}

function removeFixture() {
  document.body.removeChild(document.getElementById(FIXTURE_ID));
}
