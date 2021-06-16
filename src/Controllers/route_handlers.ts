import Models from '../Models';
import { generateQPId } from '../Utilities/helper';
import { Request, Response } from 'express';
import { QuestionPaperType } from '../Models/questionPaper';

const addExam = async (req: Request, res: Response) => {
    const qp = req.body;
    const id = await generateQPId();
    const questionPaper: QuestionPaperType = { ...qp, qpId: id };
    await Models.questionPapersModel.create(questionPaper);
    res.status(200).json({ 'message': 'success' });
}

const getExamById = async (req: Request, res: Response) => {
    const qps: QuestionPaperType[] = await Models.questionPapersModel.find({ qpId: req.params?.qpId });
    if (qps.length == 0) {
        res.status(404).json({ 'message': 'question paper not found' });
        return;
    }
    const result = qps[0].questionsList.map(({ question, options }) => ({ question, options }));
    res.status(200).json({ 'message': 'success', 'questionPaper': result });
}


export default { addExam, getExamById };