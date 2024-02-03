const Conn = require('../config/dbConn')

const AusbildungCollection = async () => {
    const db = await Conn();
    const AusbildungCollection = db.collection('ausbildungs');
    return AusbildungCollection;
}

module.exports = AusbildungCollection;