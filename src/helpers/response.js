module.exports = {
    response: (res, result, status, err)=>{
        const data = {};
        data.status = 'success';
        data.status_code = status;
        data.result = result;
        data.err = err || null;
        return res.status(data.status_code).json(data);
    }
}