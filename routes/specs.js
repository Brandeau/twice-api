import express from "express";

import fs from "node:fs";

const specs = JSON.parse(fs.readFileSync('./docs/specs.json', 'utf8'));

const router = express.Router();

router.get('/', (req, res, next) =>{

    res.status(200).json(
        specs
    );
    
});

export default router;