var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
 res.sendfile(path.join(__dirname, '../views/index.html'));
});

/* GET userlist. */
router.get('/getusers', function(req, res) {
    var db = req.db;
    var collection = db.get('userslist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* POST to adduser. */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userslist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg:'error: ' + err }
        );
    });
});

/* DELETE to delete user. */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userslist');
    collection.remove({ '_id' : req.params.id }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/* GET to get user. */
router.get('/getuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userslist');
    collection.findOne(req.params.id,function(err, user){
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

/* PUT to update user. */
router.put('/updateuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userslist');
    collection.update({
        _id: req.params.id
    },{
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
});

module.exports = router;