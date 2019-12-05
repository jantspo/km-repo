const PropertyTypes = require('../models/index').property_type;
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

router.get('/api/property-types', async (req, res)=> {
    try{
        const propTypes = await PropertyTypes.findAll({where: {active: true}});
        res.status(200).json(propTypes);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;