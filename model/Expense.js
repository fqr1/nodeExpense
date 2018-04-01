//TODO MUST BE BASED ON global.MongoClient = db.db('expense');


const Database = require('../helpers/db/mongodb');

module.exports = Database.then(db => {
    const myDB = db.db('expense');
    return myDB.collection('expense');
});
