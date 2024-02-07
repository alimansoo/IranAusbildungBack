const Conn = require('../config/dbConn')

const CoverLetter = async () => {
    const db = await Conn.connect();
    const Collection = db.collection('resume_coverletter');
    return Collection;
}

module.exports = CoverLetter;