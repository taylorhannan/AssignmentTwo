module.exports = function(app, db){
  // Route to manage group registration
  app.post('/api/groupreg', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

  	var groupname = req.body.groupname.toString();
  	console.log(groupname);

    MongoClient.connect(url, function(err, db) {
      var insertGroup = { "name": groupname};
      var dbo = db.db("mydb");

      dbo.collection("groups").find({ "name": groupname }).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        if (result.length <= 0){
            dbo.collection("groups").insertOne(insertGroup, function(err, resOK) {
              if (err) throw err;
              console.log("Inserted group", insertGroup.name);
              res.send({'name':groupname,'success':true});
              db.close();
            });
      }else{
        res.send({'success':false});
        db.close();
      }
    });
    });
  });
  }
