const Conn = require('../config/dbConn')

const TicketsCollection = async () => {
    const db = await Conn();
    const TicketsCollection = db.collection('tickets');
    return TicketsCollection;
}

module.exports = TicketsCollection;