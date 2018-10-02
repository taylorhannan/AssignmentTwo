module.exports = function(app, db) {
    // Route to manage group deletion
    app.post('/api/groupdel', (req, res) => {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        var groupname = req.body.groupname.toString();
        console.log(groupname);

        // Connect to Mongo Client
        MongoClient.connect(url, function(err, db) {
            var deleteGroup = {
                "name": groupname
            };
            var dbo = db.db("mydb");

            // Find & delete group if exists
            dbo.collection("groups").find({
                "name": groupname
            }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                if (result.length > 0) {
                    dbo.collection("groups").deleteOne(deleteGroup, function(err, resOK) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("Deleted group", deleteGroup.name);
                            res.send({
                                'name': groupname,
                                'success': true
                            });
                            db.close();
                        }
                    });
                } else {
                    res.send({
                        'success': false
                    });
                    db.close();
                }
            });
        });
    });
}
