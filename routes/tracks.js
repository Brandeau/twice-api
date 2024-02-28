import express from "express";

import fs from "node:fs";

const router = express.Router();

const data = JSON.parse(fs.readFileSync('./twice-releases.json', 'utf8'));

data.sort((a, b) => a["release_date"].localeCompare(b["release_date"]));

const albums = [];
data.forEach(element => {albums.push(element['tracks'])});
const tracks = [];
albums.flat().forEach(element => {tracks.push(element['name'])}); 

router.get('/', (req, res, next) =>{

    res.status(200).json({
        tracks: tracks
    });
    
})

export default router;