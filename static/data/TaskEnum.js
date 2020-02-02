//任务频率枚举
let frequencyList = [
	{key: 'day', value: '日'}, {key: 'week', value: '周'}, {key: 'month', value: '月'}
];

frequencyList['day'] = {key: 'day',	value: '日'};
frequencyList['week'] = {key: 'week',	value: '周'};
frequencyList['month'] = {key: 'month',	value: '月'};

//频率类型
let typeList = [
	{key: 'task', value: '定量'}, {key: 'count', value: '定次'}
];

typeList['task'] = {key: 'task',value: '定量'};
typeList['count'] = {key: 'count',value: '定次'};

//时期星期枚举
let weekList = [
	{key: 1,value: '周一'}, {key: 2,value: '周二'},
	{key: 3,value: '周三'}, {key: 4,value: '周四'},
	{key: 5,value: '周五'}, {key: 6,value: '周六'},
	{key: 7,value: '周日'}
];

weekList['w1'] = {key: 1,value: '周一'};
weekList['w2'] = {key: 2,value: '周二'};
weekList['w3'] = {key: 3,value: '周三'};
weekList['w4'] = {key: 4,value: '周四'};
weekList['w5'] = {key: 5,value: '周五'};
weekList['w6'] = {key: 6,value: '周六'};
weekList['w7'] = {key: 7,value: '周日'};

//时期月枚举
let monthList = [
	{key: '10',value: '月初'}, {key: '20',value: '月中'},
	{key: '30',value: '月末'}
];

monthList['m10'] = {key: '10',value: '月初'};
monthList['m20'] = {key: '20',value: '月中'};
monthList['m30'] = {key: '30',value: '月末'};

//任务图标枚举
let iconList = [
	'iconcutlery',
	'iconbook',
	'iconshopping-cart',
	'iconbicycle',
	'iconappstore-fill',
	'iconwechat',
	'iconcarryout',
	'iconcloud-fill',
	'iconstar-fill',
	'icongithub-fill',
	'icondiamond1',
	'iconfilm1',
	'iconlock',
	'iconinstitution',
	'iconmusic',
	'iconpaper-plane-o',
	'iconrefresh',
	'iconreply-all',
	'iconsearch',
	'iconskyatlas',
	'iconthumbs-o-up',
	'iconuser'
]

//任务目标单位枚举
let unitList = [
	'次',
	'个',
	'组',
	'步',
	'米',
	'千米',
	'英里',
	'秒',
	'分',
	'小时',
	'毫升',
	'大卡'
]


export { frequencyList, typeList, weekList, monthList, iconList, unitList};



