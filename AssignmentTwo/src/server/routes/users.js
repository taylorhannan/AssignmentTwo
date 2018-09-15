module.exports = function(app, db){

  // Route to get user data
  app.post('/api/users', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("mydb");
      dbo.collection("users").find({}).toArray(function(err, userData){
        if (err) throw err;
        res.send({"userData":userData});
        db.close();
      });
    });
  });
}
