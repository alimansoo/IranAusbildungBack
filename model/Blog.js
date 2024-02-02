const Conn = require('../config/dbConn')

const BlogCollection = async () => {
    const db = await Conn();
    const BlogCollection = db.collection('blogs');
    return BlogCollection;
}

module.exports = BlogCollection;