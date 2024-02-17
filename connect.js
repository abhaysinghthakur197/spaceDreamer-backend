const mongoose = require('mongoose')

async function connectToDb(url) {
    return mongoose.connect(url, {
        useUnifiedTopology:true,
        useNewUrlParser:true})
}

module.exports = connectToDb;
