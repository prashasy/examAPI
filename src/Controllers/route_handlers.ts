import Models from '../Models';
import { generateQPId } from '../Utilities/helper';
import { Request, Response } from 'express';

const addExam = async (req: Request, res: Response) => {
    let questionPaper = req.body;
    let id = await generateQPId();
    questionPaper.qpId = id;
    await Models.questionPapersModel.create(questionPaper);
    res.status(200).json({ 'message': 'success' });
}


export default { addExam };