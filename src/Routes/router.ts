import express from 'express';
import controller from '../Controllers/route_handlers';

const router = express.Router();


router.put('/exams/add', controller.addExam);
router.get('/exams/:qpId', controller.getExamById);
router.post('/exams/submit', controller.postAnswerSheet);

export default router;