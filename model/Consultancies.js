const Conn = require('../config/dbConn')

const ConsultanciesCollection = async () => {
    const db = await Conn();
    const ConsultanciesCollection = db.collection('consultancies_list');
    return ConsultanciesCollection;
}

module.exports = ConsultanciesCollection;