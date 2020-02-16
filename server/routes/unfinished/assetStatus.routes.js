// const controller = require('../controllers/assetStatus.controller');
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

// router.get('/api/', async (req, res)=> {
//     const items = await controller.findAll();
//     res.status(200).json(items);
// });
//
// router.get('/api/assets/:id', async(req, res) => {
//     try{
//         const item = await controller.findById(parseInt(req.params.id));
//         res.status(200).json(item);
//     }catch(error){
//         res.status(500).error(error);
//     }
//
// });
//
// router.post('/api/assets', async(req, res) => {
//     try{
//         const item = await controller.create(req.body);
//         console.log('note', item);
//         res.status(200).json(item);
//     }catch(error){
//         console.log('error', error);
//         res.status(500).error(error);
//     }
// });
//
// router.post('api/', async (req, res) => {
//
// });

module.exports = router;