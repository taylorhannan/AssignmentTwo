module.exports = function(app, db){
  app.post('/api/user', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

  	var username = req.body.username.toString();

  	console.log(username);

    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("mydb");

      dbo.collection("users").find({ "name": username }).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        if (result.length > 0){
            res.send({'username':username, 'email':result[0].email, 'role':result[0].role, 'imagepath':result[0].imagepath, 'success':true});
            db.close();
      }else{
        res.send({'success':false});
        db.close();
      }
    });
    });
  });
}
