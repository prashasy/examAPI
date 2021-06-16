import Models from '../Models';

export const generateQPId = async () => {
    let qps = await Models.questionPapersModel.find({}).sort({ qpId: -1 });
    if (qps.length == 0)
        return 1;
    return qps[0].qpId + 1;
}