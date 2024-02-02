const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const userConn = User();

    const { firstname, lastname, image, phone, email, password } = req.body;
    if (!firstname || !lastname || !email || !phone || !password) return res.status(400).json({ 'message': 'Informations are required.' });

    // check for duplicate usernames in the db
    const duplicate = await (await userConn).findOne({"username": email || phone});
    if (duplicate) return res.status(409).json({ 'status': 409 ,'message': `conflict` }); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // //create and store the new user
        await (await userConn).insertOne({
            "firstname": firstname,
            "lastname": lastname,
            "username": email || phone,
            "image": image,
            "phone": phone,
            "email": email,
            "password": hashedPwd
        });

        res.status(201).json({ 'status':201 , 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'status':500 , 'message': err.message });
    }
}

module.exports = { handleNewUser };