import Models from '../Models';
import { AnswerPaperType } from '../Models/answerPaper';
import { QuestionPaperType } from '../Models/questionPaper';
import { Response } from 'express';

export const generateQPId = async () => {
    const qps = await Models.questionPapersModel.find({}).sort({ qpId: -1 });
    if (qps.length == 0)
        return 1;
    return qps[0].qpId + 1;
}

export const generateAnsSheetId = async () => {
    const aps = await Models.answerPapersModel.find({}).sort({ ansSheetId: -1 });
    if (aps.length == 0)
        return 1;
    return aps[0].ansSheetId + 1;
}


export const getMarksObtained = async (ansSheet: AnswerPaperType, res: Response) => {
    const qps: QuestionPaperType[] = await Models.questionPapersModel.find({ qpId: ansSheet.qpId });
    if (qps.length === 0) {
        res.status(404).json({ 'message': 'question paper not found' });
        return;
    }
    const correct = qps[0].marks.correct;
    const wrong = qps[0].marks.wrong;
    const marks = qps[0].questionsList.map(({ correctOption }, index) => {
        if (correctOption === ansSheet.answersList[index])
            return correct;
        return wrong;
    })
    return marks.reduce((a, b) => a.valueOf() + b.valueOf(), 0);
}