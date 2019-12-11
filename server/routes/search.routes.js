const Assets = require('../models/index').asset;
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');

router.use(bodyParser.json());

router.get('/api/cities/:state', async (req, res)=> {
    try{
        const assets = await Assets.findAll({
            where: {
                state: req.params.state
            },
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('city')) ,'city'],
            ]
        });
        res.status(200).json(assets);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/api/states/', async (req, res)=> {
    try{
        const assets = await Assets.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('state')) ,'state'],
            ]
        });
        res.status(200).json(assets);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;