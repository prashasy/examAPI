import supertest from 'supertest';
import Models from './Models';
import app from './app';

describe("Testing the exams API", () => {

    it("test if /exams/add returns success response", async () => {

        const QpReqBody = {
            "title": "cse",
            "questionCount": 1,
            "marks": {
                "correct": 4,
                "wrong": -1
            },
            "questionsList": [{
                "question": "What is JSON?",
                "options": {
                    "a": "JS",
                    "b": "JSO",
                    "c": "JSOO",
                    "d": "Javascript Object Notation"
                },
                "correctOption": "d"
            }]
        }
        await supertest(app).put('/exams/add').send(QpReqBody).expect(200).then(async (res) => {
            expect(res.body.questionPaper.title).toBe(QpReqBody.title);
            const qp = await Models.questionPapersModel.findOne({ qpId: res.body.questionPaper.qpId });
            expect(qp).toBeTruthy();
        });
    });



    it("test if /exams/submit returns success response", async () => {

        const AsReqBody = {
            "qpId": 1,
            "candidateName": "Prashasy",
            "answersList": ["d"]
        }
        await supertest(app).post('/exams/submit').send(AsReqBody).expect(200).then((res) => {
            expect(res.body['total marks obtained']).toBe(4);
        });
    });
    it("test if /exams/submit returns error response", async () => {

        const AsReqBody = {
            "qpId": 0,
            "candidateName": "Prashasy",
            "answersList": ["d"]
        }
        await supertest(app).post('/exams/submit').send(AsReqBody).expect(404).then((res) => {
            expect(res.body.message).toBe('question paper not found');
        });
    });

    it("test if /exams/:qpId returns success response", async () => {

        const response = await supertest(app).get('/exams/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success');
    });

    it("test if /exams/:qpId returns error response for invalid question paper id", async () => {

        const response = await supertest(app).get('/exams/100');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('question paper not found');
    });

});