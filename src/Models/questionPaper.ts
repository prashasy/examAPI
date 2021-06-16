import { mongo } from "mongoose";

const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    correct: { type: Number, required: true },
    wrong: { type: Number, required: true },
})

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [Map], of: String, required: true },
    correctOption: { type: String, required: true }
})
const questionPaperSchema = new mongoose.Schema(
    {
        qpId: { type: Number, unique: true, required: [true, 'Required field'] },
        title: { type: String, required: true },
        questionCount: { type: Number, required: true },
        marks: { type: marksSchema, required: true },
        questionsList: { type: [questionSchema], required: true }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

const questionPapersModel = mongoose.model('questionPapers', questionPaperSchema);

export default questionPapersModel;
