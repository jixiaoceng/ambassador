/**
 * 性别
 */
export const genderData = [
    {
        value:'male',
        label:'Male'
    },
    {
        value:'female',
        label:'Female'
    },
    {
        value:'N/A',
        label:'N/A'
    }
]

/**
 * 国家/居住地
 */
export const countryData = [
    {
        value:'CN',
        label:'China'
    },
    {
        value:'US',
        label:'United States'
    },
    {
        value:'SG',
        label:'Singapore'
    },
    {
        value:'UK',
        label:'United Kingdom'
    },
    {
        value:'AU',
        label:'Australia'
    },
    {
        value:'ID',
        label:'Indonesia'
    }
]

// 数字每三位添加‘,’
export function formatUTC (utc_datetime) {
    // // 转为正常的时间格式 年-月-日
    // utc_datetime = '2016-05-02T23:47:33Z';
    if (utc_datetime === '' || utc_datetime == undefined) {
        return ''
    }
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    year_month_day = year_month_day.replace(/-/g, '/'); // 兼容safari浏览器把日期转成2016/05/02
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second;
    
    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp/1000;
   
    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60;

    // 时间戳转为时间
    // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    var beijing_datetime = new Date(parseInt(timestamp) * 1000);
    var month = beijing_datetime.getMonth() + 1;
    var day = beijing_datetime.getDate();
    month = month < 10 ? "0" + month : month
    day = day < 10 ? "0" + day : day
    beijing_datetime = beijing_datetime.getFullYear() + '-' + ( month )+ '-' + day;
    return beijing_datetime;
    
}