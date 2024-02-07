const Conn = require('../config/dbConn')

const Consultancies = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('consultancies_list');
    return Collection;
}

module.exports = Consultancies;