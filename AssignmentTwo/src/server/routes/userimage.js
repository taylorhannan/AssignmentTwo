module.exports = function(app, db) {
    // Route to update user image data
    app.post('/api/userimage', (req, res) => {
        var username = req.body.username.toString();
        var email = req.body.email.toString();
        var role = req.body.role.toString();
        var imagepath = req.body.imagepath.toString();

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        // Connect to Mongo Client
        MongoClient.connect(url, function(err, db) {
            var updateUser = {
                $set: {
                    "name": username,
                    "email": email,
                    "role": role,
                    "imagepath": imagepath
                }
            };
            var query = {
                "name": username
            };
            var dbo = db.db("mydb");

            // Update user with image data
            dbo.collection("users").updateOne(query, updateUser, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
        });
    });
}
