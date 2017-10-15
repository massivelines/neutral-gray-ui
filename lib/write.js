// gets the package object
var package = atom.packages.getLoadedPackage('neutral-gray-ui');

var write = {

  // forces the theme to refresh and pull all new changes in
  refresh: function() {
    // forces atom to reaload the base style sheet,
    // base style sheet pulls lineheight from ui-variables
    atom.themes.reloadBaseStylesheets();
    package.deactivate();
    return setImmediate(function() {
      return package.activate();
    })
  },

  fontSizeChange: function() {
    // get the changed value of fontSize in the settings page
    var size = atom.config.get('neutral-gray-ui.fontSize');
    write.writeSettings(size);
  },

  // writes settings to .less file
  writeLess: function(size) {
    var fs = require('fs');
    var path = require("path");
    fs.writeFileSync(path.join(__dirname, '..', 'styles/ui-font.less'), '@ui-fontsize: ' + size + 'px;\n');

    // reactivate the package and refresh stylesheets
    write.refresh();
  },

  // checks when package is activated if a previouse settings besides default
  // has been set for the fontSize, if size does not=12 write it to ui-fontsize and refresh
  checkForPreviousSettings: function() {
    var size = atom.config.get('neutral-gray-ui.fontSize');
    if (size != 12) {
      write.writeLess(size);
    }
  }

}

module.exports = write;

// listens for a change on the settings page
atom.config.onDidChange('neutral-gray-ui', '.fontSize', write.fontSizeChange);
