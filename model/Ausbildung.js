const Conn = require('../config/dbConn')

const Ausbildung = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('ausbildungs');
    return Collection;
}

module.exports = Ausbildung;