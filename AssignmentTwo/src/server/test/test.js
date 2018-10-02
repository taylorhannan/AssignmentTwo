var expect = require('chai').expect;
var request = require('request');
var chaiHttp = require('chai-http');
var assert = require('assert');
var chai = require('chai'),
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = 'localhost:3000';

describe('Angular Unit Test', function() {
    describe('Main page', function() {
        it('status', function(done) {
            request('http://localhost:4200/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});

describe("Route Unit Testing", function() {
    describe("/Auth Route", function() {
        it("Send post of valid user data to /auth", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/auth')
                .send({
                    'username': 'super',
                    'email': 'super@admin.com'
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });

        it("Send post of invalid user data to /auth", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/auth')
                .send({
                    'username': 'invaliduserdata',
                    'email': 'invalid@data.com'
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });
    });
    describe("/Reg Route", function() {
        it("Send post of new user data to /reg", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/reg')
                .send({
                    'username': 'NewUser',
                    'email': 'newuser@user.com',
                    'role': 'user'
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });
        it("Send post of existing user data to /reg", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/reg')
                .send({
                    'username': 'NewUser',
                    'email': 'newuser@user.com',
                    'role': 'user'
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });
    });
    describe("/Del Route", function() {
        it("Send post of user data to delete to /del", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/del')
                .send({
                    'username': 'NewUser',
                    'email': 'newuser@user.com',
                    'role': 'user'
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });
        it("Send post of non-existing user data to /del", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/del')
                .send({
                    'username': 'NewUser',
                    'email': 'newuser@user.com',
                    'role': 'user'
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });
    });

    describe("/Users Route", function() {
        it("Send post of blank data to delete to /users", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/users')
                .send({})
                .end(function(err, res) {
                    expect(res.body.userData);
                    done();
                });
        });
    });

    describe("/Groups Route", function() {
        it("Send post of blank data to delete to /groups", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/groups')
                .send({})
                .end(function(err, res) {
                    expect(res.body.userData);
                    done();
                });
        });
    });

    describe("/Groupreg Route", function() {
        it("Send post of new user data to /groupreg", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/groupreg')
                .send({
                    'groupname': 'NewGroup',
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });
        it("Send post of existing group data to /groupreg", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/groupreg')
                .send({
                    'groupname': 'NewGroup',
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });
    });

    describe("/Groupdel Route", function() {
        it("Send post of group data to delete to /groupdel", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/groupdel')
                .send({
                    'groupname': 'NewGroup',
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });
        it("Send post of non-existing group data to /groupdel", function(done) {
            // Send some Form Data
            chai.request(app)
                .post('/api/groupdel')
                .send({
                    'groupname': 'NewGroup',
                })
                .end(function(err, res) {
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });
    });
});
