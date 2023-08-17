import express from "express";
import { 
    getPage,
} from "../controllers/pagination.js";

const router = express.Router();

router.get('/', getPage);
//router.get('/?page=${page}&limit=${limit}', getPage);

export default router