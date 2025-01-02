const mongoose = require('mongoose')

async function connectToDb(url) {
    return mongoose.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    })
}

module.exports = connectToDb;
