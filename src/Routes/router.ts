import express from 'express';
import controller from '../Controllers/route_handlers';

const router = express.Router();


router.put('/exams/add', controller.addExam);

export default router;