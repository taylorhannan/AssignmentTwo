module.exports = function(app, db){
  // Route to manage user registration
  app.post('/api/del', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

  	var username = req.body.username.toString();
  	console.log(username);

    MongoClient.connect(url, function(err, db) {
      var deleteUser = { "name": username };
      var dbo = db.db("mydb");

      dbo.collection("users").find({ "name": username }).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        if (result.length > 0){
            dbo.collection("users").deleteOne(deleteUser, function(err, resOK) {
              if (err){
                throw err;
              }else{
                console.log("Deleted user", deleteUser.name);
                res.send({'name':username,'success':true});
                db.close();
              }
            });
      }else{
        res.send({'success':false});
        db.close();
      }
    });
    });
  });
  }
