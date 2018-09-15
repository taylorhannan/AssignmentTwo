module.exports = function(app, db){
  app.post('/api/auth', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

  	var username = req.body.username.toString();
    var email = req.body.email.toString();
  	console.log(username);

    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("mydb");

      dbo.collection("users").find({ "name": username, "email": email}).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        if (result.length > 0){
            res.send({'username':username, 'email':email, 'role':result[0].role, 'success':true});
            db.close();
      }else{
        res.send({'success':false});
        db.close();
      }
    });
    });
  });
}
