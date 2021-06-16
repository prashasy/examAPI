import mongoose from 'mongoose';

export interface AnswerPaperType {
    ansSheetId: Number,
    qpId: Number,
    candidateName: String,
    answersList: [String],
    marksObtained?: Number,
}

const answerPaperSchema = new mongoose.Schema(
    {
        ansSheetId: { type: Number, unique: true, required: [true, 'Required field'] },
        qpId: { type: Number, required: true },
        candidateName: { type: String, required: true },
        answersList: { type: [String], required: true },
        marksObtained: { type: Number }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

const answerPapersModel = mongoose.model('answerPapers', answerPaperSchema);

export default answerPapersModel;
