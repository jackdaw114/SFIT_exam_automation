const mongoose = require('mongoose')


const url = 'mongodb+srv://jasonsampy:jason@freecluster.n2c8cus.mongodb.net/?retryWrites=true&w=majority';

// const client = new MongoClient(url);

// const dbName = 'DummyDb';

async function connectDB(){
    try {

        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: 'SFIT_EXAM_DB'
        });
        console.log(`MongoDB connected to  ${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

module.exports=connectDB;