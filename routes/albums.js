import express from "express";

import fs from "node:fs";

const router = express.Router();

const data = JSON.parse(fs.readFileSync('./twice-releases.json', 'utf8'));

data.sort((a, b) => a["release_date"].localeCompare(b["release_date"]));

const albums = data.map(getAlbumInfo);  

function getAlbumInfo(album) {
    return {
      title: album['name'],
      tracks: album.tracks.map(getTrackTitle),
    };
  }
  
  function getTrackTitle(track) {
    return `${track['disc_number']}. ${track['name']}`;
  }

router.get('/', (req, res, next) =>{

    res.status(200).json({
        albums: albums
    });
    
})

router.get('/:albumID', (req, res, next) =>{

    const id = Number(req.params.albumID);

    res.status(200).json({
        albums: albums[id]
    });

});

export default router;