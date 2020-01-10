const Controller = require('../controllers/notifications.controller');
const controller = new Controller({});
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

router.get('/api/getNewNotifications/:id', async (req, res)=> {
    try{
        const notes = await controller.getNewNotifications(req.params.id);
        res.status(200).json(notes);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }

});

module.exports = router;