import express from "express";

import fs from "node:fs";

const router = express.Router();

const data = JSON.parse(fs.readFileSync('./twice-releases.json', 'utf8'));

const albums = [];

data.forEach(element => {albums.push(element['name'])});


router.get('/', (req, res, next) =>{

    res.status(200).json({
        albums: albums
    });
    
})

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: 'Handling POST request to /albums'
    });
    
})

export default router;