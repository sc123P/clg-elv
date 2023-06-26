import express from "express";
//const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/', postsCtrl.getPost);

export default router