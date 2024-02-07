const Conn = require('../config/dbConn')

const User = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('users');
    return Collection;
}

module.exports = User;