// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
function formatDate(dateStr, justDate) {
  var str = '';
  if (dateStr && dateStr.length > 7) {
    str += dateStr.slice(0, 4);
    str += '-';
    str += dateStr.slice(4, 6);
    str += '-';
    str += dateStr.slice(6, 8);
    if (!justDate && dateStr.length > 11) {
      str += ' ';
      str += dateStr.slice(8, 10);
      str += ':';
      str += dateStr.slice(10, 12);
    }
  }
  return str;
};

exports.main = async (event, context) => {
  console.log(event)
  switch (event.action) {

    case 'getRecord': {
      return getRecord(event)
    }
    case 'getAllRecord': {
      return getAllRecord(event)
    }
    case 'delRecord': {
      return delRecord(event)
    }
    case 'updateRecord': {
      return updateRecord(event)
    }
    default: {
      return
    }
  }
}
async function getRecord(event) {
  var resp = { code: 0, msg: '', data: [] };
  const userInfo = event.userInfo;
  const openid = userInfo.openId;
  var currentPage = event.currentPage || 0;
  var keyword = event.keyword || '';
  var pageSize = 20;
  const _ = db.command;
  var dbret = await db.collection('publishBook').where(_.and([{
    name: db.RegExp({
      regexp: '.*' + keyword,
      options: 'i',
    })
  },
  {
    _openid: openid,
    deleteTime: ''
  }
  ])).orderBy('createTime', 'desc').skip(currentPage * pageSize).limit(pageSize).get();
  //console.log(dbret);
  var list = dbret.data;
  if (list && list.length) {
    for (var i = 0; i < list.length; i++) {
      list[i].timeText = formatDate(list[i].createTime, false);
      //console.log(list[i].callTime,list[i].timeText)
    }
  }
  resp.code = 1;
  resp.data = list;
  return resp;
}
async function getAllRecord(event) {
  var resp = { code: 0, msg: '', data: [] };
  // const userInfo = event.userInfo;
  // const openid = userInfo.openId;
  var currentPage = event.currentPage || 0;
  var keyword = event.keyword || '';
  var type = event.type
  var pageSize = 20;
  const _ = db.command;
  const options = [{
    title: db.RegExp({
      regexp: '.*' + keyword,
      options: 'i',
    })
  }]
  type == "全部" ? options.push({
    deleteTime: ''
  }) : options.push({
    deleteTime: '',
    type: type
  })
  var dbret = await db.collection('publishBook').where(_.and(options)).orderBy('createTime', 'desc').skip(currentPage * pageSize).limit(pageSize).get();
  //console.log(dbret);
  var list = dbret.data;
  if (list && list.length) {
    for (var i = 0; i < list.length; i++) {
      list[i].timeText = formatDate(list[i].createTime, false);
      list[i].img = getCdnUrl(list[i].imgList[0])
    }
  }
  resp.code = 1;
  resp.data = list;
  return resp;
}

async function delRecord(event) {
  let resp = { code: 0, msg: '删除失败', data: '' };
  const userInfo = event.userInfo;
  const openid = userInfo.openId;
  const id = event.id;
  if (!id) {
    return resp;
  }

  const dbret = await db.collection('publishBook').where({
    _id: id,
    _openid: openid
  }).update({
    data: { deleteTime: new Date().getTime() }
  })

  if (dbret && dbret.errMsg && dbret.errMsg == 'collection.update:ok') {
    resp.code = 1;
    resp.msg = '删除成功';
  }
  return resp;
}
async function updateRecord(event) {
  let resp = { code: 0, msg: '修改失败', data: '' };
  // const userInfo = event.userInfo;
  const openid = event.openId;
  const id = event.id;
  if (!id) {
    return resp;
  }
  const { name, author, press, newLevel, contact, detail, price,type,imgList } = event;
  const dbret = await db.collection('publishBook').where({
    _id: id,
    _openid: openid
  }).update({
    data: {
      name, author, press, newLevel, contact, detail, price, type, imgList
    }

  })

  if (dbret && dbret.errMsg && dbret.errMsg == 'collection.update:ok') {
    resp.code = 1;
    resp.msg = '修改成功';
  }
  return resp;
}
function getCdnUrl(fileID) {
  const url = fileID ? fileID.replace(/cloud:\/\/shujuku-2zug5.7368-shujuku-2zug5-1301602526/, "https://7368-shujuku-2zug5-1301602526.tcb.qcloud.la") : '';
  return url;
}