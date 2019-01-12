const insert = function (obj, Schema) {
    return new Promise((resolve, reject) => {
        const schema = new Schema(obj)
        schema.save((err, res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

const find = function (model, conditions, fields, options = {}) {
    let sort = options.sort ? options.sort : {_id: 1}
    console.log(sort)
    return new Promise((resolve, reject) => {
        model.find(conditions, fields).sort(sort).exec((err, res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

const findOne = function (model, conditions) {
    return new Promise((resolve, reject) => {
        model.findOne(conditions, (err, res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

const findPage = (model, conditions, fields, options) => {
    return new Promise((resolve, reject) => {
        let total = ''
        model.countDocuments(conditions, (err, res) => {
         err ? total = 1000 : total = res
        })
        model.find(conditions, fields).limit(options.limit).skip(options.skip).sort(options.sort).exec((err, res) => {
            if (err) {
                reject(err)
            } else {
                let resData = {
                    total: total,
                    list: res
                }
                resolve(resData)
            }
        })
    })
}

const formatReturn = function (status, msg, result) {
    return {
        status: status,
        msg: msg,
        data: result
    }
}

module.exports = {
    insert,
    find,
    findOne,
    findPage,
    formatReturn
}