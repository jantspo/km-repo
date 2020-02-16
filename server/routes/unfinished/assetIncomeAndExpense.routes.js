// const AssetIncomeAndExpenses = require('../controllers/assetIncomeAndExpense.controller');
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

// router.get('/api/asset-income-and-expense', async (req, res)=> {
//     const assets = await AssetIncomeAndExpenses.findAll();
//     res.status(200).json(assets);
// });
//
// router.get('/api/asset-income-and-expense/:id', async(req, res) => {
//     try{
//         const note = await AssetIncomeAndExpenses.findById(parseInt(req.params.id));
//         res.status(200).json(note);
//     }catch(error){
//         res.status(500).error(error);
//     }
//
// });
//
// router.post('/api/asset-income-and-expense', async(req, res) => {
//     try{
//         const note = await AssetIncomeAndExpenses.create(req.body);
//         console.log('note', note);
//         res.status(200).json(note);
//     }catch(error){
//         console.log('error', error);
//         res.status(500).error(error);
//     }
//
// });

module.exports = router;