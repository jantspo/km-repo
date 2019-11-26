const States = require('../../controllers/states.controller');
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

router.get('/api/states', async (req, res)=> {
    const notes = await States.findAll();
    res.status(200).json(notes);
});

router.get('/api/states/:id', async(req, res) => {
    try{
        const note = await States.findById(parseInt(req.params.id));
        res.status(200).json(note);
    }catch(error){
        res.status(500).error(error);
    }

});



module.exports = router;