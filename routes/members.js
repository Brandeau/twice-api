import express from "express";

import fs from 'fs';

const membersData = JSON.parse(fs.readFileSync('./membersData.json', 'utf8'));

const router = express.Router();

router.get('/', (req, res, next) =>{

    res.status(200).json(
        membersData
    );
    
})

router.get('/:memberID', (req, res, next) =>{

    const id = Number(req.params.memberID);

    if(id < membersData.length){
        res.status(200).json(
            membersData[id]
        );
    }else{
        next();
    }
});

export default router;