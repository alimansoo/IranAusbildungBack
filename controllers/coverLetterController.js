const { ObjectId } = require('mongodb');
const CoverLetter = require('../model/CoverLetter');

class CoverLetterController{
    static getAll = async (req, res) => {
        const Conn = CoverLetter();

        const datas = (await Conn).find({});
        datas.toArray().then( data =>{
            if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No data found' });
            res.status(201).json({"status": 201, "data": data,"count":data.length})
        }).catch( e =>{
            res.status(500).json({ 'status' : 500 ,'message': e.message });
        })
    }

    static insert = async (req, res) => {
        const Conn = CoverLetter();

        const { 
            full_name, 
            phone, 
            field_study, 
            grade_study,
            type_migration,
            desired_study
        } = req.body;
    
        if (
            !full_name ||
            !phone ||
            !field_study ||
            !grade_study ||
            !type_migration ||
            !desired_study
        ) return res.status(400).json({ 'message': 'Informations are required.' });
    
        try {
            await (await Conn).insertOne({
                full_name, 
                phone, 
                field_study, 
                grade_study,
                type_migration,
                desired_study,
                payment_status : 0
            });
    
            res.status(201).json({ 'status': 201 , 'success': `New CoverLetter created!` });
        } catch (err) {
            res.status(500).json({ 'status': 500 , 'message': err.message });
        }
    }
    
    static delete = async (req, res) => {
        const Conn = await CoverLetter();
        const { id } = req.params;

        if (!id) return res.status(400).json({ "message": 'ID required' });

        Conn.findOne({ _id: new ObjectId(id) }).then( data =>{
            if (!data) {
                return res.json({ 'status' : 204 ,'message': 'CoverLetter Not Exist' });
            }

            Conn.deleteOne({ _id: new ObjectId(id) }).then(data => {
                return res.status(201).json({ 'status' : 201 ,'message': 'CoverLetter Deleted' });
            }).catch(data => {
                return res.status(500).json({ 'status' : 204 ,'message': data.message});
            })
        })
    }

    static get = async (req, res) => {
        const Conn = await CoverLetter();

        if (!req?.params?.id) return res.status(400).json({ "message": 'ID required' });
        const data = await Conn.findOne({ _id: new ObjectId(req?.params?.id) });
        if (!data) {
            return res.status(204).json({ 'message': `ID ${req?.params?.id} not found` });
        }
        res.json(data);
    }
}

module.exports = CoverLetterController