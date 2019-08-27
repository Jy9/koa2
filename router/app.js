const router = require('koa-router')(),
	dbs = require('./../dbs.js')

router
	.get('/',async (ctx) => {
		ctx.body = {
			status:200,
			body:ctx.query
		}
	})
	
	.post('/list',async ctx => {
		ctx.body = {
			status:200,
			body:ctx.request.body
		}
	})

module.exports = router