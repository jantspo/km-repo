const Assets = require('../controllers/asset.controller');
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

router.get('/api/assets/:id', async (req, res) => {
    try{
        const asset = await Assets.findOne(req.params.id);
        res.status(200).json(asset);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/api/assets', async (req, res)=> {
    try{
        const assets = await Assets.findAll(req.body);
        res.status(200).json(assets);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/api/asset-count', async (req, res) => {
    try{
        const assets = await Assets.getAssetCount(req.body);
        res.status(200).json(assets);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/api/asset-images/:id', async (req, res) => {
    try{
        const assets = await Assets.getImages(req.params.id);
        res.status(200).json(assets);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/api/asset-files/:id', async (req, res) => {
    try{
        const assets = await Assets.getFiles(req.params.id);
        res.status(200).json(assets);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/api/fetch-user-favorites/', async(req, res) => {
    try{
        const note = await Assets.getUserFavorites(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/api/fetch-user-favorite/', async(req, res) => {
    try{
        const note = await Assets.getUserFavorite(req.body);
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/api/featured-properties', async (req, res) => {
    try{
        const note = await Assets.getFeatured();
        res.status(200).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;