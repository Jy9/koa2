const Koa = require('koa2'),
	router = require('koa-router')(),
	bodyParser = require('koa-bodyparser'),
	cors = require('koa2-cors')

const app = new Koa()

app.listen(3000)


//路由相关设置
app
	.use(cors()) //允许跨域
	.use(bodyParser()) //post请求参数
	.use(router.routes()) //启动路由
	.use(router.allowedMethods()) //自动设置请求头

//设置中间件
	.use((ctx, next) => {
		console.log(new Date())
		next()

		//路径执行完成后执行下面代码
		if (ctx.status == '404') {
			console.log({
				url:ctx.request.url,
				type:ctx.request.method
			})
		}
	})




router.get('/',ctx => {
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
router.use('/user', require('./router/user.js').routes())
