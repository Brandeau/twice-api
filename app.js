import express from "express";

import albumRoutes from "./routes/albums.js";

import trackRoutes from "./routes/tracks.js";

import specsRoutes from "./routes/specs.js";

import morgan from "morgan";

const app = express();

app.use(morgan('dev'));

app.use('/albums', albumRoutes);

app.use('/tracks', trackRoutes);

app.use('/specs', specsRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not found')

    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

export default app;