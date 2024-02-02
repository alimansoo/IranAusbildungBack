const { ObjectId } = require('mongodb');
const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const userConn = User();

    const users = (await userConn).find({});
    users.toArray().then( data =>{
        if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No users found' });
        res.status(201).json({"status": 201, "data": data,"count":data.length})
    }).catch(e=>{
        res.status(500).json({ 'status' : 500 ,'message': res.message });
    })
}

const deleteUser = async (req, res) => {
    const userConn = await User();
    const { id } = req.body;
    console.log('deleteuser',id);

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

const getUser = async (req, res) => {
    const userConn = await User();

    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await userConn.findOne({ _id: new ObjectId(req?.params?.id) });
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req?.params?.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}