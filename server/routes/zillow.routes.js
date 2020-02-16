const controller = require('../controllers/Zillow.controller');
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

router.post('/api/get-zillow-info', async (req, res)=> {
    try{
        console.log(req.body);
        const notes = await controller.get(req.body);
        console.log(notes);
        res.status(200).json(notes);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;