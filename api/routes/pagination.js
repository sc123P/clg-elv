import express from "express";
import { 
    getPage,
} from "../controllers/pagination.js";

const router = express.Router();

router.get('/', getPage);

export default router