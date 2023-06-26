import express from "express";
//const express = require('express');
import postRoutes from "./routes/posts";
//const postRoutes = require('./routes/posts');

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);

export default app
//module.exports = app;