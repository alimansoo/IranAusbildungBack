const { ObjectId } = require('mongodb');
const Tag = require('../model/Tag');

const getAllTags = async (req, res) => {
    const Conn = Tag();

    const tags = (await Conn).find({});
    tags.toArray().then( data =>{
        if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No users found' });
        res.status(201).json({"status": 201, "data": data,"count":data.length})
    }).catch(e=>{
        res.status(500).json({ 'status' : 500 ,'message': res.message });
    })
}

const insertTag = async (req, res) => {
    const Conn = Tag();

    const { title } = req.body;
    if (!title) return res.status(400).json({ 'message': 'Informations are required.' });

    const duplicate = await (await Conn).findOne({"title": title});
    if (duplicate) return res.status(409).json({ 'status': 409 ,'message': `conflict` });

    try {
        await (await Conn).insertOne({
            "title": title,
        });

        res.status(201).json({ 'status': 201 , 'success': `New tag created!` });
    } catch (err) {
        res.status(500).json({ 'status': 500 , 'message': err.message });
    }
}

const deleteTag = async (req, res) => {
    const Conn = await Tag();
    const { id } = req?.params;

    if (!id) return res.status(400).json({ "message": 'ID required' });

    Conn.findOne({ _id: new ObjectId(id) }).then( data =>{
        if (!data) {
            return res.json({ 'status' : 204 ,'message': 'Not Exist' });
        }

        Conn.deleteOne({ _id: new ObjectId(id) }).then( data => {
            return res.status(201).json({ 'status' : 201 ,'message': `Tag Deleted` });
        }).catch(data => {
            return res.status(500).json({ 'status' : 204 ,'message': data.message});
        })
    })
}

const getTag = async (req, res) => {
    const Conn = await Tag();

    if (!req?.params?.id) return res.status(400).json({ "message": 'ID required' });
    const user = await Conn.findOne({ _id: new ObjectId(req?.params?.id) });
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req?.params?.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllTags,
    deleteTag,
    getTag,
    insertTag
}