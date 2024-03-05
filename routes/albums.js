import express from "express";

import * as discography from "../discography.js";

const router = express.Router();

router.get('/', (req, res, next) =>{

    res.status(200).json(
        discography.albums
    );
    
})

router.get('/:albumID', (req, res, next) =>{

    const id = Number(req.params.albumID);

    if(id <= discography.albums.length){
        res.status(200).json(
            discography.albums[id]
        );
    }else{
        next();
    }
});

export default router;