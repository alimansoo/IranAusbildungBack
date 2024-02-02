const Conn = require('../config/dbConn')

const TagCollection = async () => {
    const db = await Conn();
    const TagCollection = db.collection('tags');
    return TagCollection;
}

module.exports = TagCollection;