// gets the package object
var package = atom.packages.getLoadedPackage('neutral-gray-ui');
var size = atom.config.get('neutral-gray-ui.uiFontSize');
var uiFontCurrentLess = {};

// initaly set to default settings
var uiFontLess = {
  'uiFontSize': 12
}

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

  fontSizeChanged: function() {

    // get the changed value of uiFontSize in the settings page
    var size = atom.config.get('neutral-gray-ui.uiFontSize');
    uiFontLess.uiFontSize = size;
    write.writeLess();

    // reactivate the package and refresh stylesheets
    // only refreshes styles when the uiFontSize changes in settings page
    write.refresh();
  },

  // writes settings to .less file
  writeLess: function() {
    var fs = require('fs');
    var path = require("path");
    fs.writeFileSync(path.join(__dirname, '..', 'styles/ui-font.less'), '@uiFontSize: ' + uiFontLess.uiFontSize + 'px;\n');
  },

  // when package is activated, checks if atom.config has settings for package
  checkForPreviousSettings: function() {
    var updateLess = false;

    // TODO: delete on next big update, changed fontSize to uiFontSize in atom.config
    // will convert all previouse installs to new var
    if (atom.config.get('neutral-gray-ui.fontSize')) {
      var oldSize = atom.config.get('neutral-gray-ui.fontSize');
      atom.config.set('neutral-gray-ui.uiFontSize', oldSize);
      atom.config.set('neutral-gray-ui.fontSize');

      // calles to check less file after changing to new var
      checkLessOnStarup();
    } else {
      checkLessOnStarup();
    }


    function checkLessOnStarup() {
      // runs 1st
      // reads ui-font.less and converts it to the var uiFont object
      function readLessFile(callback) {

        var fs = require('fs');
        fs.readFile(package.path + '/styles/ui-font.less', 'utf-8', function(err, data) {
          if (err) {
            return console.log(err);
          }
          // callback to work with data after loaded
          callback(data);
        });
      }

      // runs 2nd
      // changes the data from ui-font.less to an object
      // compares object with atom.config settings
      // if diffrent write ui-font.less from atom.config settings
      readLessFile(function(data) {
        // work with the returned data

        // splits file data into array by line
        var splitLines = data.match(/.+/g);

        // forEach removes the @ and ; (@uiFontSize: 14px;)
        // splits at the ': + space'
        // adds to object uiFont
        splitLines.forEach(function(str) {
          var arr = str.replace(/[@;px]/g, '').split(': ');
          uiFontCurrentLess[arr[0]] = arr[1];
        });

        // gets neutral-gray-ui current settings keys in atom.config
        var currentAtomSettingsKeys = Object.keys(atom.config.get('neutral-gray-ui'));
        // gets neutral-gray-ui current settings in atom.config
        var currentAtomSettings = atom.config.get('neutral-gray-ui');

        // for key length itt and see if the ui-font.less has the same settings
        for (var i = 0; i < currentAtomSettingsKeys.length; i++) {
          var key = currentAtomSettingsKeys[i];
          // if != set ui-font.less to atom.config setting
          if (currentAtomSettings[key] != uiFontCurrentLess[key]) {
            uiFontLess[key] = currentAtomSettings[key];
            console.log(uiFontLess[key] + '=' + currentAtomSettings[key]);
            // sets true if ui-font.less needs to be updated
            updateLess = true;
            console.log('update');
          }
          // if ui-font.less needs to be updated and on last itt of loop
          if (i + 1 == currentAtomSettingsKeys.length && updateLess == true) {
            console.log('write');
            // write and refresh
            write.writeLess();
            write.refresh();
          }
        }

      })
    }


  }

}

module.exports = write;

// listens for a change on the settings page
atom.config.onDidChange('neutral-gray-ui', '.uiFontSize', write.fontSizeChanged);
