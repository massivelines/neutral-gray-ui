// imports the settings from json file
var settings = require('./settings');

// // package object
// var package = atom.packages.getLoadedPackage('neutral-gray-ui');
//
// // forces the theme refresh to pull all new changes in
// function refresh() {
//   package.deactivate();
//   return setImmediate(function () {
//     return package.activate();
//   })
// }
//
// var fontSizeChange = function() {
//
//   atom.config.onDidChange('neutral-gray-ui', '.fontSize', function() {
//
//     var fs = require('fs');
//     var path = require("path");
//     var size = atom.config.get('neutral-gray-ui.fontSize');
//
//     fs.writeFileSync(path.join(__dirname, '..', 'styles/ui-font.less'), '@ui-fontsize: ' + size + 'px;\n');
//
//     // forces atom to reaload the base style sheet,
//     // base style sheet pulls lineheight from ui-variables
//     atom.themes.reloadBaseStylesheets();
//
//     refresh();
//
//   });
// }

// node export
module.exports = {
  // shows settings in atom package screen
  config: settings,

  activate(state) {
    atom.themes.onDidChangeActiveThemes(function () {
      var write = require('./write.js')
    })
  }
}
