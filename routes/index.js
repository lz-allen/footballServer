const router = require('koa-router')()
const boostModel = require('../models/boost')
const trainModel = require('../models/train')
const playerModel = require('../models/player')
const {
	formatReturn,
	find,
	findOne,
	findPage
} = require('../db/dbMethods')

// 获取训练经验值和天赋经验值
router.get('/api/levelup/list', async (ctx, next) => {
	let {
		code,
		level
	} = ctx.request.query
	try {
		let res
		if (code === 'boost') {
			res = await find(boostModel, {}, {
				_id: 0
			}, {
				sort: {
					level: 1
				}
			})
		}
		if (code === 'training') {
			res = await find(trainModel, {
				level: {
					$gt: level
				}
			}, {
				_id: 0
			}, {
				sort: {
					level: 1
				}
			})
		}
		res ? ctx.body = res : ctx.body = formatReturn('1', '未找到', '')
	} catch (err) {
		ctx.body = formatReturn('1', err, '')
	}
})

// 根据条件获取球员列表
router.get('/api/fifa/list2', async (ctx, next) => {
	let requestObj = ctx.request.query
	let currentPage = requestObj.currentPage
	let pageSize = requestObj.pageSize
	try {
		function setReg(attr) {
			let reg = new RegExp(attr, 'i')
			return reg
		}
		let conditions = {}
		let sort = {"basicInfo.score": -1}
		for (const [key, val] of Object.entries(requestObj)) {
			if (key === 'n') {
				conditions['$or'] = [{name: {$regex: setReg(val)}},{"basicInfo.enname": {$regex: setReg(val)}}]
			}
			if (key === 'r') {
				conditions['rarity'] = val
			}
			if (key === 'j') {
				conditions['basicInfo.jobCode'] = val
			}
			if (key === 'nc') {
				conditions['basicInfo.nationInfo.code'] = val
			}
			if (key === 'lc') {
				conditions['basicInfo.leagueInfo.code'] = val
			}
			if (key === 'cc') {
				conditions['basicInfo.clubInfo.code'] = val
			}
			if (key === 'pc') {
				conditions['basicInfo.programInfo.name'] = val
			}
			if (key === 'b') {
				conditions['skills.code'] = val
			}
			if (key === 'h') {
				conditions['basicInfo.height'] = val
			}
			if (key === 'f') {
				conditions['basicInfo.foot'] = val
			}
			if (key === 'level') {
				conditions['basicInfo.score'] = val
			}
			if (key === 'ma') {
				conditions['basicInfo.score'] = {$lte: val}
			}
			if (key === 'mi') {
				conditions['basicInfo.score'] = {$gte: val}
			}
			if (key === 't') {
				conditions['basicInfo.traits'] = val
			}
			if (requestObj.ma && requestObj.mi) {
				conditions['basicInfo.score'] = {$gte: requestObj.mi, $lte: requestObj.ma}
			}
			if (key === 'scoreFlag') {
				sort = {"basicInfo.score": val}
			}
            if (key === 'bPFlag') {
                sort = {"attribute.attributeArray.bpmp": val}
            }
            if (key === 'sMFlag') {
                sort = {"attribute.attributeArray.smmz": val}
            }
            if (key === 'cQFlag') {
                sort = {"attribute.attributeArray.cqsk": val}
            }
            if (key === 'lHFlag') {
                sort = {"attribute.attributeArray.lhfy": val}
            }
            if (key === 'fSFlag') {
                sort = {"attribute.attributeArray.fscq": val}
            }
            if (key === 'tGFlag') {
                sort = {"attribute.attributeArray.tg": val}
            }
            if (key === 'countFlag') {
                sort = {"attribute.attributeSum": val}
            }
            if (key === 'detalCountFlag') {
                sort = {"capabilityValuesSum": val}
            }
		}
		let res = await findPage(playerModel, conditions, {}, {
			limit: pageSize * 1,
			skip: (currentPage - 1) * pageSize,
			sort: sort
		})
		ctx.body = res
	} catch (error) {
		ctx.body = formatReturn('1', error, '')
	}
})

// 获取单个球员信息
router.get('/api/fifamobile/card/detail', async (ctx, next) => {
	let code = ctx.request.query.code
	try {
		let res = await findOne(playerModel,{code: code})
		res ? ctx.body = res : ctx.body = formatReturn('1', '未找到', '')
	} catch (error) {
		ctx.body = formatReturn('1', error, '')
	}
})

// 获取球员其它等级的卡
router.get('/api/fifamobile/card/otherCard', async (ctx, next) => {
    let code = ctx.request.query.code
    try {
        let res
        let obj = await findOne(playerModel, {code: code})
		res = await find(playerModel, {'basicInfo.enname': obj.basicInfo.enname, code:{$ne: code}}, {code: 1,'basicInfo.score': 1})
        res ? ctx.body = res : ctx.body = formatReturn('1', '未找到', '')
    } catch (error) {
        ctx.body = formatReturn('1', error, '')
    }
})

module.exports = router