import express from "express";

const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getUser);

export default router