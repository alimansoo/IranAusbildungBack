const Conn = require('../config/dbConn')

const Tag = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('tags');
    return Collection;
}

module.exports = Tag;