const Conn = require('../config/dbConn')

const CommentCollection = async () => {
    const db = await Conn();
    const CommentCollection = db.collection('comments');
    return CommentCollection;
}

module.exports = CommentCollection;