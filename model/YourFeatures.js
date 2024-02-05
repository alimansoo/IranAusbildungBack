const Conn = require('../config/dbConn')

const YourFeaturesCollection = async () => {
    const db = await Conn();
    const YourFeaturesCollection = db.collection('your_features');
    return YourFeaturesCollection;
}

module.exports = YourFeaturesCollection;