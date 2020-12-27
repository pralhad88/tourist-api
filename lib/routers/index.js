const fs = require('fs');

module.exports = (app) => {
  app.get("/", function(req, res) {
    return res.send("Welcome to Tourist API Service.");
  });

  return fs.readdir('./lib/routers/', function(err, files) {
    if(files.length > 0){
      return files.forEach(function(file) {
        var routeName;
        if (file.indexOf("index.js") < 0) {
          routeName = file.slice(0, file.indexOf(".js"));
          console.log("/api/" + routeName.toString() + "/");
          return app.use("/api/" + routeName.toString() + "/", require("./" + file));
        }
      });
    }
  });
};
