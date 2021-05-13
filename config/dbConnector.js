const mongoose = require('mongoose');
const config = require('config');

const dbConnector = async () => {
    try {
        await mongoose.connect(config.get('db.MongoDB_URI'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = dbConnector;