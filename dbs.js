const MongoClient = require('mongodb').MongoClient;

const dbUrl = "mongodb://localhost:27017"
const dbName = "koa2"


class Db{
	
	static getInstance(){	//单例
		if(!Db.instance){
			Db.instance = new Db()
		}
		return Db.instance
	}
	
	//链接数据库
	connect(){
		return new Promise((resolve,reject) => {
			// 解决数据库多次连接
			if(this.dbClent){resolve(this.dbClent)}
			
			MongoClient.connect(dbUrl,{useUnifiedTopology: true,useNewUrlParser: true},(err,client) => {
				err && (reject(err))
				this.dbClent = client.db(dbName)
				resolve(this.dbClent)
			})
		})
	}
	
	//查询数据库
	find(collectionName,json){
		return new Promise((reslove,rehect) => {
			this.connect().then(db => {
				db.collection(collectionName).find(json).toArray((err,docs) => {
					err && (rehect(err))
					reslove(docs)
				})
			})
		})
	}
	
	//写入数据
	insert(collectionName,json){
		return new Promise((reslove,rehect) => {
			this.connect().then(db => {
				db.collection(collectionName).insertOne(json,(err,res) => {
					err && (rehect(err))
					reslove(res)
				})
			})
		})
	}
}

//连接数据库
let dbs = Db.getInstance()
dbs.connect()

//导出数据库模块
module.exports = dbs