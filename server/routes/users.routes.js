const Controller = require('../controllers/users.controller');
const model = require('../models/index').km_user;
const controller = new Controller(model);
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
router.use(bodyParser.json());

router.get('/api/users', async (req, res)=> {
    try{
        const notes = await controller.findAll();
        res.status(200).json(notes);
    }catch(err){
        res.status.json(err)
    }
});

router.get('/api/users/:id', async(req, res) => {
    try{
        const note = await controller.findById(parseInt(req.params.id));
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('/api/request-reset/:email', async(req, res) => {
    try{
        const note = await controller.resetPassword(req.params.email);
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error);
    }
});

router.put('/api/change-password/', async (req, res) => {
    const validToken = jwt.verify(req.body.token, secret);
    if(validToken){
        try{
            const note = await controller.update({...req.body, id: validToken.id});
            res.status(200).json(note);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    } else {
        res.status(400).json('Invalid Token');
    }

});

router.put('/api/update-password/', async (req, res) => {
    try{
        const note = await controller.update(req.body.id, req.body);
        res.status(200).json(note);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/api/users', async(req, res) => {
    try{
        const note = await controller.create(req.body);
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error);
    }
});

router.post('/api/register', async(req, res) => {
    try{
        const note = await controller.create(req.body);
        if(note) res.status(200).json(note);
        else res.status(401).json('Email already in use. Please use another email or request a password reset.');
    }catch(error){
        res.status(500).json(error);
    }
});

router.put('/api/users/:id', async(req, res) => {
    try{
        const note = await controller.update(req.params.id, req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
});

router.put('/api/validate-user', async(req, res) => {
    try{
        const validToken = jwt.verify(req.body.token, secret);
        if(validToken){
            validToken.email_validated = true;
            const note = await controller.update(validToken);
            res.status(200).json(note);
        }else{
            res.status(400).json('Invalid Token')
        }

    }catch(error){
        res.status(500).json(error);
    }
});

router.post('/api/user-searches', async(req, res) => {
    try{
        const note = await controller.saveUserSearch(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/api/user-searches/:id', async(req, res) => {
    try{
        const note = await controller.getUserSearches(req.params.id);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/api/user-favorites/', async(req, res) => {
    try{
        const note = await controller.saveUserFavorite(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});


router.delete('/api/user-favorites/:id', async(req, res) => {
    try{
        const note = await controller.deleteUserFavorite(req.params.id);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;