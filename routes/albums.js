import express from "express";

import fs from "node:fs";

const router = express.Router();

const data = JSON.parse(fs.readFileSync('./twice-releases.json', 'utf8'));

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: data
    });
    
})

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: 'Handling POST request to /albums'
    });
    
})

export default router;