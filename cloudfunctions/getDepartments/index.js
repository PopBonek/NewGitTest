// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database() // 初始化数据库

// 云函数入口函数
exports.main = async (event, context) => {
  let count = await getCount(event.id);
  count = count.total;
  let list = []
  for (let i = 0; i < count; i += 100) { //自己设置每次获取数据的量
    list = list.concat(await getList(i, event.id));
  }
  return {
    list,
    count: count,
  };
}
async function getCount(id) { //获取数据的总数，这里记得设置集合的权限
  let count = await db.collection('demoDepartments').where({
    Campus_id: id
  }).count();
  return count;
}
async function getList(skip, id) { //分段获取数据
  let list = await db.collection('demoDepartments').where({
      Campus_id: id
    })
    .orderBy('firstletter', 'asc').skip(skip).get();
  return list.data;
}