const Conn = require('../config/dbConn')

const CoverLetterCollection = async () => {
    const db = await Conn();
    const CoverLetterCollection = db.collection('resume_coverletter');
    return CoverLetterCollection;
}

module.exports = CoverLetterCollection;