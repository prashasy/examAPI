import mongoose from 'mongoose';
import questionPapersModel from './questionPaper';

mongoose
    .connect('mongodb://localhost:27017/airLearnExams', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));

export default {
    'questionPapersModel': questionPapersModel,
}