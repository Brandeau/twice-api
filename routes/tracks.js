import express from "express";

import fs from "node:fs";

import { getTracksInfo } from "../utils.js";

const router = express.Router();

const data = JSON.parse(fs.readFileSync('./twice-releases.json', 'utf8'));

data.sort((a, b) => a["release_date"].localeCompare(b["release_date"]));

const tracks = data.map(getTracksInfo);  

router.get('/', (req, res, next) =>{

    res.status(200).json({
        tracks: tracks
    });
    
})

export default router;