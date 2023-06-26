import express from "express";

const router = express.Router();
const authCtrl = require('../controllers/auth');

//router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signup);

export default router