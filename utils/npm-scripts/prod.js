var fs = require("fs");
var path = require("path");
var ChromeExtension = require("crx");
var crx = new ChromeExtension({
	rootDirectory:'app/dist'
});

crx.load(path.join(__dirname, "myFirstExtension"))
  .then(function() {
    return crx.pack().then(function(crxBuffer){
//      var updateXML = crx.generateUpdateXML()
//      fs.writeFile(path.join(__dirname, "update.xml"), updateXML)
      fs.writeFile(path.join(__dirname, "myFirstExtension.crx"), crxBuffer)
    })
  });