// gets the package object
var package = atom.packages.getLoadedPackage('neutral-gray-ui');

var write = {

  // forces the theme refresh to pull all new changes in
  refresh: function() {
    package.deactivate();
    return setImmediate(function() {
      return package.activate();
    })
  },

  fontSizeChange: function() {

    var fs = require('fs');
    var path = require("path");
    // get the changed value of fontSize in the settings page
    var size = atom.config.get('neutral-gray-ui.fontSize');

    fs.writeFileSync(path.join(__dirname, '..', 'styles/ui-font.less'), '@ui-fontsize: ' + size + 'px;\n');

    // forces atom to reaload the base style sheet,
    // base style sheet pulls lineheight from ui-variables
    atom.themes.reloadBaseStylesheets();

    // reactivate the package
    write.refresh();
  }

}

module.exports = write;

// listens for a change on the settings page
atom.config.onDidChange('neutral-gray-ui', '.fontSize', write.fontSizeChange);
