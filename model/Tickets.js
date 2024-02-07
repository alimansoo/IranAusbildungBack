const Conn = require('../config/dbConn')

const Tickets = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('tickets');
    return Collection;
}

module.exports = Tickets;