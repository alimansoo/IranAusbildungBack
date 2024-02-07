const Conn = require('../config/dbConn')

const BlogCollection = async () => {
    const db = await Conn.connect();
    const BlogCollection = db.collection('blogs');
    return BlogCollection;
}

module.exports = BlogCollection;