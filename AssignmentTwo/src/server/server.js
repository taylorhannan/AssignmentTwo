var express = require('express')
var app = express();
var http = require('http');
var server = http.Server(app);
var socketIO = require('socket.io');
var io = socketIO(server);
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

const path = require('path');
const formidable = require('formidable');
app.use(express.static(path.join(__dirname , '../dist/WeekSix')))
app.use('/images',express.static(path.join(__dirname, './images')));


// Boots up the server using http
server.listen(3000, () => {
	console.log('started on port: ${port}');
});

// Use connect method to connect to the server
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10}, function(err, client) {
  console.log("Connected successfully to server");
  if (err) {return console.log(err)}
  const dbName = 'mydb';
  const db = client.db(dbName);

	// Connect to MongoDB on localhost:27017
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydb");

		// Check collection 'users' on server startup
		if (!dbo.collection("users")){
					console.log("Dropped collection users!");
					// Create collection 'users' on server startup
					dbo.createCollection("users", function(err, res) {
						if (err) throw err;
						console.log("Collection users created!");
						var initialUser = { name: "super", email: "super@admin.com", role:"superAdmin", imagepath:"super.jpg" };
						// Insert initial user into collection 'users' on startup
						dbo.collection("users").insertOne(initialUser, function(err, res) {
    					if (err) throw err;
							console.log("Inserted initial user", initialUser.name);
						});
					});
		}
		// Check collection 'groups' on server startup
		if (!dbo.collection("groups")){
					console.log("Dropped collection groups!");
					// Create collection 'users' on itial server startup
					dbo.createCollection("groups", function(err, res) {
						if (err) throw err;
						console.log("Collection groups created!");
						var initialGroup = { name: "group1" };
						// Insert initial group into collection 'groups' on startup
						dbo.collection("groups").insertOne(initialGroup, function(err, res) {
							if (err) throw err;
							console.log("Inserted initial group", initialGroup.name);
						});
					});
		}
		require('./routes/auth.js')(app, db);
		require('./routes/reg.js')(app, db);
		require('./routes/groupreg.js')(app, db);
		require('./routes/del.js')(app, db);
		require('./routes/groupdel.js')(app, db);
		require('./routes/users.js')(app, db);
		require('./routes/user.js')(app, db);
		require('./routes/groups.js')(app, db);
		require('./routes/userimage.js')(app, db);
		require('./routes/upload.js')(app,formidable);
		require('./socket.js')(app, io);
	});
});
