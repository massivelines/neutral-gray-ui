// imports the settings from json file
var settings = require('./settings');

var fontSizeChange = function() {
  atom.config.observe('neutral-gray-ui.fontSize', function() {

    var fs = require('fs');
    var path = require("path");
    var size = atom.config.get('neutral-gray-ui.fontSize');
    fs.writeFileSync(path.join(__dirname, '..', 'styles/ui-font.less'), '@ui-fontsize: ' + size + 'px;\n')

  });
}


// node export
module.exports = {
  // tells it what settings to have
  config: settings,
  fontSize: fontSizeChange(),

  activate(state) {

  }

}

// fs = require 'fs'
// path = require 'path'
// writePath = path.join __dirname, '..', 'styles/ui-fontsize.less'
// fs.writeFileSync writePath, "@font-size: #{size}px;\n"
