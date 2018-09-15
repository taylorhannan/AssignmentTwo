module.exports = function(app, db){

  // Route to get user data
  app.post('/api/groups', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("mydb");
      dbo.collection("groups").find({}).toArray(function(err, groupData){
        if (err) throw err;
        res.send({"groupData":groupData});
        db.close();
      });
    });
  });
}
