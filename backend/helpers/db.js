
const MongoClient = require('mongodb').MongoClient;

module.exports = {
    findall(collection) {
        MongoClient.connect("mongodb://heroku_zvk6tbc1:m8kao2cj6r12g65ml2ejulpcos@ds055842.mlab.com:55842/heroku_zvk6tbc1", function(err, db){
            if (err) throw err;
            let client = db.db();
            client.collection(collection).find({}).toArray(function (err2, result) {
                if(err2) throw err;
                db.close();
                return result;
            })
        });
    },
    findone(collection){
        MongoClient.connect("mongodb://heroku_zvk6tbc1:m8kao2cj6r12g65ml2ejulpcos@ds055842.mlab.com:55842/heroku_zvk6tbc1", function(err, db){
            if (err) throw err;
            let client = db.db();
            client.collection(collection).find({}).toArray(function (err2, result) {
                if(err2) throw err;
                db.close();
                return result;
            })
        });
    }
}