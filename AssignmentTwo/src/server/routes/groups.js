module.exports = function(app, db) {
    // Route to get group data
    app.post('/api/groups', (req, res) => {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        // Connect to Mongo Client
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db("mydb");

            // Find & post all group data
            dbo.collection("groups").find({}).toArray(function(err, groupData) {
                if (err) throw err;
                res.send({
                    "groupData": groupData
                });
                db.close();
            });
        });
    });
}
