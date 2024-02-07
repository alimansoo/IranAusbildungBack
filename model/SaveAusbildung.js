const Conn = require('../config/dbConn')

const SaveAusbildung = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('saved_ausbildung');
    return Collection;
}

module.exports = SaveAusbildung;