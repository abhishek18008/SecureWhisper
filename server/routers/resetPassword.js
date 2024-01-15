import express, { application } from "express";
import { passwordResetRequest,passwordResetSubmit } from "../controllers/resetPassword.js";


const router=express.Router();


router.post('/request',passwordResetRequest)
router.post('/submit/:id/:token',passwordResetSubmit)


export default router;