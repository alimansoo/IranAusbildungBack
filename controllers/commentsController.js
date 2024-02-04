const { ObjectId } = require('mongodb');
const Comment = require('../model/Comment');

const getAllComments = async (req, res) => {
    const Conn = Comment();

    const datas = (await Conn).find({});
    datas.toArray().then( data =>{
        if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No data found' });
        res.status(201).json({"status": 201, "data": data,"count":data.length})
    }).catch( e =>{
        res.status(500).json({ 'status' : 500 ,'message': e.message });
    })
}

const insertComment = async (req, res) => {
    const Conn = Comment();

    const { 
        ausbildung_id,
        user_type,
        user_id, 
        content
    } = req.body;

    if (
        !ausbildung_id ||
        !user_type ||
        !user_id ||
        !content
    ) return res.status(400).json({ 'message': 'Informations are required.' });

    const duplicate = await (await Conn).findOne({
        ausbildung_id,
        user_id, 
        content
    });
    if (duplicate) return res.status(409).json({ 'status': 409 ,'message': `conflict` });

    try {
        await (await Conn).insertOne({
            ausbildung_id,
            user_type,
            user_id, 
            content,
            date: new Date()
        });

        res.status(201).json({ 'status': 201 , 'success': `New Comment created!` });
    } catch (err) {
        res.status(500).json({ 'status': 500 , 'message': err.message });
    }
}

const Delete = async (req, res) => {
    const Conn = await Comment();
    const { id } = req.params;

    if (!id) return res.status(400).json({ "message": 'ID required' });

    Conn.findOne({ _id: new ObjectId(id) }).then( data =>{
        if (!data) {
            return res.json({ 'status' : 204 ,'message': 'Comment Not Exist' });
        }

        Conn.deleteOne({ _id: new ObjectId(id) }).then(data => {
            return res.status(201).json({ 'status' : 201 ,'message': 'Comment Deleted' });
        }).catch(data => {
            return res.status(500).json({ 'status' : 204 ,'message': data.message});
        })
    })
}

const getLinkBy = async (req, res) => {
    const Conn = await Comment();
    const { q } = req.params;

    if (!q) return res.status(400).json({ "message": 'Query required' });

    const datas = await Conn.find({ title: { $regex: `${q}`, $options: 'i' } });
    datas.toArray().then( data =>{
        if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No data found' });
        res.status(201).json({"status": 201, "data": data,"count":data.length})
    }).catch(e=>{
        res.status(500).json({ 'status' : 500 ,'message': e.message });
    })
}

const getComment = async (req, res) => {
    const Conn = await Comment();

    if (!req?.params?.id) return res.status(400).json({ "message": 'ID required' });
    const data = await Conn.findOne({ _id: new ObjectId(req?.params?.id) });
    if (!data) {
        return res.status(204).json({ 'message': `ID ${req?.params?.id} not found` });
    }
    res.json(data);
}

module.exports = {
    getAllComments,
    Delete,
    getComment,
    insertComment,
    getLinkBy
}