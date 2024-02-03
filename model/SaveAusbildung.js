const Conn = require('../config/dbConn')

const SaveAusbildungCollection = async () => {
    const db = await Conn();
    const SaveAusbildungCollection = db.collection('saved_ausbildung');
    return SaveAusbildungCollection;
}

module.exports = SaveAusbildungCollection;