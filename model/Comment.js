const Conn = require('../config/dbConn')

const Comment = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('comments');
    return Collection;
}

module.exports = Comment;