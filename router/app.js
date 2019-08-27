const router = require('koa-router')(),
	dbs = require('./../dbs.js')

router
	.get('/',async (ctx) => {
		let res = await dbs.insert("user",{name:"name111"})
		console.log(ctx)
		ctx.body = {
			status:200,
			body:res,
			msg:'首页'
		}
	})
	
	.get('/list',(ctx) => {
		ctx.body = {
			status:200,
			body:ctx.query,
			msg:'列表'
		}
	})

module.exports = router