import express from 'express';

import { getMessages,createSecret,updateSecret } from '../controllers/message.js';
import auth from '../middleware/authMiddleware.js';


const router=express.Router()

router.get('/',getMessages);
router.post('/create',auth,createSecret)
router.patch('/:id/update',auth,updateSecret)


export default router;