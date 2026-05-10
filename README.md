# Koa2 - 后端服务学习项目

基于 Koa2 框架的后端服务学习项目，实现了用户登录、注册、信息修改等 RESTful API，使用 MongoDB 作为数据库。

## 功能特性

- 单例模式数据库连接封装
- 用户 CRUD 接口（登录/注册/修改）
- 跨域支持（koa2-cors）
- 404 请求日志记录
- 模块化路由设计

## 技术栈

- Koa2
- koa-router
- koa-bodyparser
- koa2-cors
- MongoDB

## 运行方式

1. 安装依赖：`npm install`
2. 确保 MongoDB 已启动
3. 启动服务：`node app.js`

## API 接口

- `POST /user/login` - 用户登录
- `POST /user/register` - 用户注册
- `POST /user/update` - 修改用户信息
