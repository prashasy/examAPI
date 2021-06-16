import Models from '../Models';
import { generateAnsSheetId, generateQPId, getMarksObtained } from '../Utilities/helper';
import { Request, Response } from 'express';
import { QuestionPaperType } from '../Models/questionPaper';
import { AnswerPaperType } from '../Models/answerPaper';

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

const postAnswerSheet = async (req: Request, res: Response) => {
    const ansSheetId = await generateAnsSheetId();
    const ansSheet: AnswerPaperType = { ...req.body, ansSheetId }
    const marksObtained = await getMarksObtained(ansSheet, res);
    ansSheet.marksObtained = marksObtained;
    await Models.answerPapersModel.create(ansSheet);
    res.status(200).json({ 'message': 'success', 'total marks obtained': marksObtained });
}


export default { addExam, getExamById, postAnswerSheet };