const MongoClient = require('mongodb').MongoClient;

const dbUrl = "mongodb://localhost:27017"
const dbName = "koa2"


class Db{
	
	static getInstance(){	//单例
		return Db.instance?Db.instance:new Db()
	}
	
	//链接数据库
	async connect(){
		// 解决数据库多次连接
		if(this.dbClent){return this.dbClent}
		
		let client = await MongoClient.connect(dbUrl,{useUnifiedTopology: true,useNewUrlParser: true})
		this.dbClent = await client.db(dbName)
		return this.dbClent
	}
	
	//查询数据库
	async find(collectionName,json,sort={},limit=0){
		let db = await this.connect()
		let res = await db.collection(collectionName).find(json).sort(sort).limit(limit)
		return res.toArray()
	}
	
	//写入数据
	async insert(collectionName,json){
		let db = await this.connect()
		let res = await db.collection(collectionName).insertOne(json)
		return res.error?false:true
	}
	
	//修改数据
	async update(collectionName,findjson,setjson){
		let db = await this.connect()
		let res = await db.collection(collectionName).update(findjson,{$set:setjson},{multi:true})
		return res.error?false:true
	}
}

//连接数据库
let dbs = Db.getInstance()
dbs.connect()
//导出数据库模块
module.exports = dbs