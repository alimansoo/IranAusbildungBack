const { ObjectId } = require('mongodb');
const User = require('../model/User');
const bcrypt = require('bcrypt');

class UserController{

    static getAll = async (req, res) => {
        const userConn = User();

        const users = (await userConn).find({});
        users.toArray().then( data =>{
            if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No users found' });
            res.status(201).json({"status": 201, "data": data,"count":data.length})
        }).catch(e=>{
            res.status(500).json({ 'status' : 500 ,'message': res.message });
        })
    }

    static insert = async (req, res) => {
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
    
    static delete = async (req, res) => {
        const userConn = await User();
        const { id } = req.body;

        if (!id) return res.status(400).json({ "message": 'User ID required' });

        userConn.findOne({ _id: new ObjectId(id) }).then( data =>{
            if (!data) {
                return res.json({ 'status' : 204 ,'message': 'User Not Exist' });
            }

            userConn.deleteOne({ _id: new ObjectId(id) }).then(data => {
                return res.status(201).json({ 'status' : 201 ,'message': 'User Deleted' });
            }).catch(data => {
                return res.status(500).json({ 'status' : 204 ,'message': data.message});
            })
            
        })
    }

    static get = async (req, res) => {
        const userConn = await User();

        if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
        const user = await userConn.findOne({ _id: new ObjectId(req?.params?.id) });
        if (!user) {
            return res.status(204).json({ 'message': `User ID ${req?.params?.id} not found` });
        }
        res.json(user);
    }

}


module.exports = UserController