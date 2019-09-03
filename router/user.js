const router = require('koa-router')(),
	dbs = require('./../dbs.js')

let body = {
	status:200,
	msg:''
}

router
	.get('/',async (ctx) => {
		let res = await dbs.find("user",{})
		ctx.body = {
			status:200,
			body:res
		}
	})
	
	.post('/login',async ctx => {
		let query = ctx.request.body
		let user = await dbs.find('user',{num:query.num})
		body.data = ""
		body.msg = "登录成功"
		if(user.length<1){
			body.status = 201
			body.msg = "没有该用户"
		}else{
			if(user[0].pw !== query.pw){
				body.status = 201
				body.msg = "用户密码错误"
			}else{
				body.status = 200
				body.data = user[0]
			}
		}
		ctx.body = body
	})
	
	.post('/signin',async ctx => {
		let query = ctx.request.body
		let user = await dbs.find('user',{num:query.num})
		if(user.length<1){
			let res = await dbs.insert('user',{num:query.num,pw:query.pw,name:query.name})
			if(res){
				body.status = 200
				body.data = '录入成功'
				body.msg = '录入成功'
			}else{
				body.status = 201
				body.data = '录入失败 重新录入'
				body.msg = '录入失败 重新录入'
			}
		}else{
			body.status = 201
			body.data = '用户账户已存在'
			body.msg = '用户账户已存在'
		}
		ctx.body = body
	})
	
	.post('/update',async ctx => {
		let query = ctx.request.body
		let num = query.oldnum
		delete query.oldnum
		let user = await dbs.find('user',{num:num})
		if(user.length<1){
			body.status = 201
			body.data = '没有找到该用户'
			body.msg = '没有找到该用户'
		}else{
			console.log(query)
			let res = await dbs.update('user',{num:query.oldnum},query)
			if(res){
				body.status = 200
				body.data = '修改成功'
				body.msg = '修改成功'
			}else{
				body.status = 201
				body.data = '修改失败 重新提交修改'
				body.msg = '修改失败 重新提交修改'
			}
		}
		ctx.body = body
	})

module.exports = router