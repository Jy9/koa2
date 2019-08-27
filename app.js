const Koa = require('koa2'),
	router = require('koa-router')(),
	dbs = require('./dbs.js')

const app = new Koa()

app.listen(3000)

//设置中间件
app.use((ctx, next) => {
		//设置跨域
		ctx.set("Access-Control-Allow-Origin", "*")
		
		console.log(new Date())
		next()

		//路径执行完成后执行下面代码
		if (ctx.status == '404') {
			ctx.body = {
				status: "404",
				msg: "查找失败 路由不存在"
			}
		}
	})



//路由相关设置
app
	.use(router.routes()) //启动路由
	.use(router.allowedMethods()) //自动设置请求头

router.get('/',async ctx => {
	ctx.body = {
		status:200,
		body:{
			msg:'Hello World'
		},
		msg:"请求成功"
	}
	
})
//引入路由模块并启用
router.use('/app', require('./router/app.js').routes())
