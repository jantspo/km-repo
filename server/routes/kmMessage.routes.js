const Controller = require('../controllers/kmMessage.controller');
const model = require('../models/index').km_message;
const controller = new Controller(model);
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
router.use(bodyParser.json());

router.get('/api/messages', async (req, res)=> {
    try{
        const notes = await controller.findAll();
        res.status(200).json(notes);
    }catch(err){
        res.status.json(err)
    }
});

router.get('/api/messages/:id', async(req, res) => {
    try{
        const note = await controller.findById(parseInt(req.params.id));
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('/api/users-messages/:id', async(req, res) => {
    try{
        const note = await controller.findByUserId(parseInt(req.params.id));
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/api/messages', async(req, res) => {
    try{
        const note = await controller.create(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/api/message-responses/:id', async(req, res) => {
    try{
        const note = await controller.getMessageResponse(req.params.id);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/api/message-response', async(req, res) => {
    try{
        const note = await controller.createResponse(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/api/messages/:id', async(req, res) => {
    try{
        const note = await controller.update(req.params.id, req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
});


module.exports = router;