// import the settings page from json file
var settings = require('./settings');


// node export
module.exports = {
  // shows settings in atom package screen
  config: settings,

  activate(state) {
    var changedSettings = require('./write.js');
    changedSettings.checkForPreviousSettings();
  }
}
