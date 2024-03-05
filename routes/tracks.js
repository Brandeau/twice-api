import express from "express";

import * as discography from "../discography.js";

const router = express.Router();

router.get('/', (req, res, next) =>{

    res.status(200).json(
       discography.tracks
    );
    
})

export default router;

