const { ObjectId } = require('mongodb');
const Consultancy = require('../model/Consultancies');

const getAllConsultancies = async (req, res) => {
    const Conn = Consultancy();

    const datas = (await Conn).find({});
    datas.toArray().then( data =>{
        if (!data) return res.status(204).json({ 'status' : 204 ,'message': 'No data found' });
        res.status(201).json({"status": 201, "data": data,"count":data.length})
    }).catch( e =>{
        res.status(500).json({ 'status' : 500 ,'message': e.message });
    })
}

const insertConsultancy = async (req, res) => {
    const Conn = Consultancy();

    const { 
        consultancy_type,
        date,
        time,
        consultancor_id,
        status
    } = req.body;

    if (
        !consultancy_type ||
        !date ||
        !time ||
        !consultancor_id ||
        !status
    ) return res.status(400).json({ 'message': 'Informations are required.' });

    try {
        await (await Conn).insertOne({
            consultancy_type,
            date,
            time,
            consultancor_id,
            status
        });

        res.status(201).json({ 'status': 201 , 'success': `New Consultancy created!` });
    } catch (err) {
        res.status(500).json({ 'status': 500 , 'message': err.message });
    }
}


const Delete = async (req, res) => {
    const Conn = await Consultancy();
    const { id } = req.params;

    if (!id) return res.status(400).json({ "message": 'ID required' });

    Conn.findOne({ _id: new ObjectId(id) }).then( data =>{
        if (!data) {
            return res.json({ 'status' : 204 ,'message': 'Consultancy Not Exist' });
        }

        Conn.deleteOne({ _id: new ObjectId(id) }).then(data => {
            return res.status(201).json({ 'status' : 201 ,'message': 'Consultancy Deleted' });
        }).catch(data => {
            return res.status(500).json({ 'status' : 204 ,'message': data.message});
        })
    })
}

const getLinkBy = async (req, res) => {
    const Conn = await Consultancy();
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

const getConsultancy = async (req, res) => {
    const Conn = await Consultancy();

    if (!req?.params?.id) return res.status(400).json({ "message": 'ID required' });
    const data = await Conn.findOne({ _id: new ObjectId(req?.params?.id) });
    if (!data) {
        return res.status(204).json({ 'message': `ID ${req?.params?.id} not found` });
    }
    res.json(data);
}

module.exports = {
    getAllConsultancies,
    Delete,
    getConsultancy,
    insertConsultancy,
    getLinkBy
}