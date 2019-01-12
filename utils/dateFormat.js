/**
 * Created by luxuehui on 17/8/16.
 */
/**
 * [format 日期格式化]
 * @param  {[Int]} num [整数]
 * @param  {[String]} str [字符串]
 * @return {[String]}     [字符串]
 * <pre>
 * tools.dateFormat(1392780164805);   结果：2014-02-19 11:22:44
 * tools.dateFormat(1392780164805,"YYYY-MM-dd");   结果：2014-02-19
 * </pre>
 */
const dateFormat = function (num, str) {
	var d = new Date(num);
	str = str || "YYYY-MM-dd hh:mm:ss";
	var o = {
		"M+": d.getMonth() + 1, // month
		"d+": d.getDate(), // day
		"h+": d.getHours(), // hour
		"m+": d.getMinutes(), // minute
		"s+": d.getSeconds(), // second
		"q+": Math.floor((d.getMonth() + 3) / 3), // quarter
		"S": d.getMilliseconds()   // millisecond
	};

	if (/(y+)/ig.test(str)) {
		str = str.replace(RegExp.$1, (d.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(str)) {
			str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k]
				: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return str;
};

module.exports = dateFormat