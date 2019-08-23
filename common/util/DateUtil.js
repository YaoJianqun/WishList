let getDate = function () {
    let nowDate = new Date();
		var hour = nowDate.getHours();//得到小时
		var minu = nowDate.getMinutes();//得到分钟
		var sec = nowDate.getSeconds();//得到秒
		return {hour:hour, minu:minu, sec:sec}
};

export {};