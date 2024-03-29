const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DATABASE_URI)

class connectDB{
    static async connect(){
        try {
            await client.connect();
            return client.db(process.env.DATABASE_NAME);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = connectDB