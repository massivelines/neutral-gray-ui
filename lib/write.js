// package object
var package = atom.packages.getLoadedPackage('neutral-gray-ui');

var write = {

  // forces the theme refresh to pull all new changes in
  refresh: function() {
    console.log('test');
    package.deactivate();
    return setImmediate(function() {
      console.log('test2');
      return package.activate();
    })
  },

  fontSizeChange: function() {

    var fs = require('fs');
    var path = require("path");
    var size = atom.config.get('neutral-gray-ui.fontSize');

    fs.writeFileSync(path.join(__dirname, '..', 'styles/ui-font.less'), '@ui-fontsize: ' + size + 'px;\n');

    // forces atom to reaload the base style sheet,
    // base style sheet pulls lineheight from ui-variables
    atom.themes.reloadBaseStylesheets();

    write.refresh();
  }

}

module.exports = write;

atom.config.onDidChange('neutral-gray-ui', '.fontSize', write.fontSizeChange);
