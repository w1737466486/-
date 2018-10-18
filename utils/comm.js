//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
var getNowFormatDate= function() {
  let date = new Date();
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let _hours = date.getHours();
  let _minutes = date.getMinutes();
  let _seconds = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (_hours >= 0 && _hours <= 9) {
    _hours = "0" + _hours;
  }
  if (_minutes >= 0 && _minutes <= 9) {
    _minutes = "0" + _minutes;
  }
  if (_seconds >= 0 && _seconds <= 9) {
    _seconds = "0" + _seconds;
  }

  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + _hours + seperator2 + _minutes + seperator2 + _seconds;
  return currentdate;
}
//时间戳转日期格式
var timestampToTime= function(timestamp) {
  let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D + h + m + s;
}
module.exports = {
  timestampToTime: timestampToTime,
  getNowFormatDate: getNowFormatDate
}