const { ObjectId } = require('mongodb');
const Feature = require('../model/Features');

class FeatureController{
    static getAll = async (req, res) => {
        const Conn = Feature();

        const datas = (await Conn).find({});
        datas.toArray().then( data =>{
            if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No data found' });
            res.status(201).json({"status": 201, "data": data,"count":data.length})
        }).catch( e =>{
            res.status(500).json({ 'status' : 500 ,'message': e.message });
        })
    }

    static insert = async (req, res) => {
        const Conn = Feature();

        const {
            user_id,
            type,
            delivery_date,
            status, 
            file
        } = req.body;

        if (
            !user_id ||
            !type ||
            !delivery_date ||
            !status
        ) return res.status(400).json({ 'message': 'Informations are required.' });

        try {
            await (await Conn).insertOne({ 
                user_id,
                type,
                delivery_date,
                status, 
                file
            });

            res.status(201).json({ 'status': 201 , 'success': `New Feature created!` });
        } catch (err) {
            res.status(500).json({ 'status': 500 , 'message': err.message });
        }
    }
    
    static delete = async (req, res) => {
        const Conn = await Feature();
        const { id } = req.params;

        if (!id) return res.status(400).json({ "message": 'ID required' });

        Conn.findOne({ _id: new ObjectId(id) }).then( data =>{
            if (!data) {
                return res.json({ 'status' : 204 ,'message': 'Feature Not Exist' });
            }

            Conn.deleteOne({ _id: new ObjectId(id) }).then(data => {
                return res.status(201).json({ 'status' : 201 ,'message': 'Feature Deleted' });
            }).catch(data => {
                return res.status(500).json({ 'status' : 204 ,'message': data.message});
            })
        })
    }

    static get = async (req, res) => {
        const Conn = await Feature();

        if (!req?.params?.id) return res.status(400).json({ "message": 'ID required' });
        const data = await Conn.findOne({ _id: new ObjectId(req?.params?.id) });
        if (!data) {
            return res.status(204).json({ 'message': `ID ${req?.params?.id} not found` });
        }
        res.json(data);
    }
}

module.exports = FeatureController