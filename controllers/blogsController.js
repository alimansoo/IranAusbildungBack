const { ObjectId } = require('mongodb');
const Blog = require('../model/Blog');

class BlogController{

    static getAll = async (req, res) => {
        const Conn = Blog();

        const tags = (await Conn).find({});
        tags.toArray().then( data =>{
            if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No users found' });
            res.status(201).json({"status": 201, "data": data,"count":data.length})
        }).catch(e=>{
            res.status(500).json({ 'status' : 500 ,'message': res.message });
        })
    }

    static insert = async (req, res) => {

        const Conn = Blog();

        const { title, body, tags, slug } = req.body;
        if (!title || !body || !slug || !tags) return res.status(400).json({ 'message': 'Informations are required.' });
    
        const duplicate = await (await Conn).findOne({"slug": slug});
        if (duplicate) return res.status(409).json({ 'status': 409 ,'message': `conflict` });
    
        try {
            await (await Conn).insertOne({
                "title": title,
                "date": new Date(),
                "body": body,
                "tags": tags,
                "slug": slug,
            });
    
            res.status(201).json({ 'status': 201 , 'success': `New blog created!` });
        } catch (err) {
            res.status(500).json({ 'status': 500 , 'message': err.message });
        }
    }
    
    static delete = async (req, res) => {
        const Conn = await Blog();
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

    static get = async (req, res) => {
        const Conn = await Blog();

        if (!req?.params?.id) return res.status(400).json({ "message": 'ID required' });
        const user = await Conn.findOne({ _id: new ObjectId(req?.params?.id) });
        if (!user) {
            return res.status(204).json({ 'message': `User ID ${req?.params?.id} not found` });
        }
        res.json(user);
    }

}

module.exports = BlogController