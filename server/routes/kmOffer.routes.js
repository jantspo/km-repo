const Controller = require('../controllers/kmOffer.controller');
const model = require('../models/index').km_offer;
const controller = new Controller(model);
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
router.use(bodyParser.json());

router.get('/api/offers', async (req, res)=> {
    try{
        const notes = await controller.findAll();
        res.status(200).json(notes);
    }catch(err){
        res.status.json(err)
    }
});

router.get('/api/offers/:id', async(req, res) => {
    try{
        const note = await controller.findById(parseInt(req.params.id));
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('/api/users-offers/:id', async(req, res) => {
    try{
        const note = await controller.findByUserId(parseInt(req.params.id), req.query);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/api/users-offers-counts/:id', async(req, res) => {
    try{
        const note = await controller.findCountByUserId(parseInt(req.params.id), req.query);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/api/offers', async(req, res) => {
    try{
        const note = await controller.create(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/api/offer-response', async(req, res) => {
    try{
        const note = await controller.createResponse(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/api/offer-responses/:id', async(req, res) => {
    try{
        const note = await controller.getOfferResponse(req.params.id);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/api/offers/:id', async(req, res) => {
    try{
        const note = await controller.update(req.params.id, req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
});

router.put('/api/read-offers', async(req, res) => {
    try{
        const note = await controller.setUserResponsesRead(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
})


module.exports = router;