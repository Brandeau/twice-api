import express from "express";

import * as discography from "../discography.js";

const router = express.Router();

router.get('/', (req, res, next) =>{
    if(Object.keys(req.query).length === 0){
        return res.status(200).json(
            discography.albums
        );
    }
    const { ["start-date"]: start_date, ["end-date"]: end_date } = req.query
  
    const filteredAlbums = discography.filterAlbumsByDate(discography.discography, start_date, end_date);

   return res.status(200).json(
        filteredAlbums.map(discography.getAlbumInfo))   
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