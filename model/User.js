const Conn = require('../config/dbConn')

const UserCollection = async () => {
    const db = await Conn();
    const UserCollection = db.collection('users');
    return UserCollection;
}

module.exports = UserCollection;