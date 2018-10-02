module.exports = function(app, db){
  // Route to manage user registration
  app.post('/api/reg', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

  	var username = req.body.username.toString();
  	var email = req.body.email.toString();
  	var role = req.body.role.toString();
  	console.log(username);

    MongoClient.connect(url, function(err, db) {
      var insertUser = { "name": username, "email": email, "role": role, "imagepath": "default.jpg"};
      var dbo = db.db("mydb");

      dbo.collection("users").find({ "name": username }).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        if (result.length <= 0){
          dbo.collection("users").find({ "email": email }).toArray(function(err, result){
            if (err) throw err;
            console.log(result);
            if (result.length <= 0){
            dbo.collection("users").insertOne(insertUser, function(err, resOK) {
              if (err){
                throw err;
              }else{
                console.log("Inserted user", insertUser.name);
                res.send({'name':username,'success':true});
                db.close();
              }
            });
          }else{
            res.send({'success':false});
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
