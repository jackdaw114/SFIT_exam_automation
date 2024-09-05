const mongoose = require('mongoose')


const url = 'mongodb+srv://Nigel:Nigel@cluster0.iifluj8.mongodb.net/?retryWrites=true&w=majority';

async function connectDB() {
    try {

        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: 'SFIT_EXAM_DB'
        });
        console.log(`MongoDB connected to  ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

module.exports = connectDB;