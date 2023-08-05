const { MongoClient } = require('mongodb')

const url = 'mongodb+srv://jasonsampy:jason@freecluster.n2c8cus.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);

const dbName = 'DummyDb';

async function connectDB(){
    try{
    await client.connect();
    await client.db(dbName).command({ping:1});
        console.log('success    ')
    }catch(error){
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }finally{
        await client.close();
    }
}

module.exports=connectDB;