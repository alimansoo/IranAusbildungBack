const { ObjectId } = require('mongodb');
const Ausbildung = require('../model/Ausbildung');
const SaveAusbildung = require('../model/SaveAusbildung');

class AusbildungController{

    static getAll = async (req, res) => {
        const Conn = Ausbildung();
    
        const datas = (await Conn).find({});
        datas.toArray().then( data =>{
            if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No data found' });
            res.status(201).json({"status": 201, "data": data,"count":data.length})
        }).catch( e =>{
            res.status(500).json({ 'status' : 500 ,'message': e.message });
        })
    }

    static insert = async (req, res) => {
        const Conn = Ausbildung();
    
        const { 
            title, 
            germany_title, 
            duration, 
            field_study,
            field_type,
            is_it_shift,
            first_yr_salary,
            second_yr_salary,
            third_yr_salary,
            description,
            tags,
            disadvantages, 
            advantages
        } = req.body;
    
        if (
            !title ||
            !germany_title ||
            !duration ||
            !field_study ||
            !field_type ||
            !description ||
            (typeof is_it_shift) !== 'boolean' ||
            !first_yr_salary ||
            !second_yr_salary ||
            !third_yr_salary
        ) return res.status(400).json({ 'message': 'Informations are required.' });
    
        
    
        const duplicate = await (await Conn).findOne({germany_title});
        if (duplicate) return res.status(409).json({ 'status': 409 ,'message': `conflict` });
    
        try {
            await (await Conn).insertOne({
                title, 
                germany_title, 
                duration, 
                field_study,
                field_type,
                description,
                is_it_shift,
                first_yr_salary,
                second_yr_salary,
                third_yr_salary,
                tags,
                disadvantages, 
                advantages,
                "slug": germany_title.toLowerCase().replace(" ", "-")
            });
    
            res.status(201).json({ 'status': 201 , 'success': `New Ausbildung created!` });
        } catch (err) {
            res.status(500).json({ 'status': 500 , 'message': err.message });
        }
    }

    static save = async (req, res) => {
        const Conn = await SaveAusbildung();
    
        const { 
            ausbildung_id,
            user_id
        } = req.body;
    
        if (
            !ausbildung_id ||
            !user_id
        ) return res.status(400).json({ 'message': 'Informations are required.' });
    
        const duplicate = await (Conn).findOne({
            ausbildung_id,
            user_id
        });
        
        if (duplicate) return res.status(409).json({ 'status': 409 ,'message': `conflict` });
    
        try {
            await (Conn).insertOne({
                ausbildung_id,
                user_id
            });
    
            res.status(201).json({ 'status': 201 , 'success': `Ausbildung saved!` });
        } catch (err) {
            res.status(500).json({ 'status': 500 , 'message': err.message });
        }
    }
    
    static delete = async (req, res) => {
        const Conn = await Ausbildung();
        const { id } = req.params;
    
        if (!id) return res.status(400).json({ "message": 'ID required' });
    
        Conn.findOne({ _id: new ObjectId(id) }).then( data =>{
            if (!data) {
                return res.json({ 'status' : 204 ,'message': 'Ausbildung Not Exist' });
            }
    
            Conn.deleteOne({ _id: new ObjectId(id) }).then(data => {
                return res.status(201).json({ 'status' : 201 ,'message': 'Ausbildung Deleted' });
            }).catch(data => {
                return res.status(500).json({ 'status' : 204 ,'message': data.message});
            })
        })
    }

    static get = async (req, res) => {
        const Conn = await Ausbildung();
    
        if (!req?.params?.id) return res.status(400).json({ "message": 'ID required' });
        const data = await Conn.findOne({ _id: new ObjectId(req?.params?.id) });
        if (!data) {
            return res.status(204).json({ 'message': `ID ${req?.params?.id} not found` });
        }
        res.json(data);
    }

    static likeBy = async (req, res) => {
        const Conn = await Ausbildung();
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

}

module.exports = AusbildungController