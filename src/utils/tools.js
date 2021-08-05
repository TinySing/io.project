// 防抖函数
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
export function debounce(fn, delay) {
  // 定时器
  let timer = null;

  // 将debounce处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    const context = this;
    // 保留调用时传入的参数
    const args = arguments;
    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer);
    }
    // 设立新定时器
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// 节流函数
// fn是我们需要包装的事件回调, interval是时间间隔的阈值
export function throttle(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0;

  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    const context = this;
    // 保留调用时传入的参数
    const args = arguments;
    // 记录本次触发回调的时间
    const now = +new Date();

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now;
      fn.apply(context, args);
    }
  };
}

/**
 * 获取cookie和设置cookie
 * @name    cookie
 * @param   {String}  名字
 * @param   {String}  值 
 * @param   {Object}  配置选项 
 * expires	String	有限日期 可以是一个整数或一个日期
 * path	String	cookie值保存路径，默认与创建页路径一致
 * domain	String	cookie所在的域、
 * secure	boolean	true时，创建的Cookie会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证
 * @return  {String}  当只有名字时返回名字对应值
 * 
 * 示例
 * cookie('aa',1); // 设置cookie值aa为1
   cookie('aa'); // 获得cookie aa值
   cookie('aa',1,{expires:1}); // 设置cookie值aa为1并且有效期为1天
   cookie('aa', 1, {expires: new Date(Date.parse(new Date()) + 1000 * 60 * 60 * 4)}); // 2小时
   removeCookie('aa');
 * 
 * 
 * 
 */
function cookie(name, value, options) {
  if (typeof value !== 'undefined') {
    let nextOptions = options || {};
    let nextValue = value;
    if (value === null) {
      nextValue = '';
      nextOptions = {
        ...{},
        ...nextOptions,
        expires: -1,
      };
    }
    let expires = '';
    if (
      nextOptions.expires &&
      (typeof nextOptions.expires === 'number' || nextOptions.expires.toUTCString)
    ) {
      let date;
      if (typeof nextOptions.expires === 'number') {
        date = new Date();
        date.setTime(date.getTime() + nextOptions.expires * 24 * 60 * 60 * 1000);
      } else {
        date = nextOptions.expires;
      }
      expires = `; expires=${date.toUTCString()}`;
    }
    const path = nextOptions.path ? `; path=${nextOptions.path}` : ';path=/';
    const domain = nextOptions.domain ? `; domain=${nextOptions.domain}` : '';
    const secure = nextOptions.secure ? '; secure' : '';
    document.cookie = [
      name,
      '=',
      encodeURIComponent(nextValue),
      expires,
      path,
      domain,
      secure,
    ].join('');
  } else {
    let cookienextValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i += 1) {
        const trimCookie = trim(cookies[i]);
        if (trimCookie.substring(0, name.length + 1) === `${name}=`) {
          cookienextValue = decodeURIComponent(trimCookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookienextValue;
  }
  return null;
}

/**
 * 删除cookie的快捷方法
 * @name    removeCookie
 * @param   {String}  名字
 */
function removeCookie(key) {
  cookie(key, '', { expires: -1 });
}

/**
 * 去掉空格
 * @param {string} 要去掉空格的字符串
 * @param   {Boolean} 是否去掉字符串中间的空格
 */
function trim(str, isGlobal) {
  if (!str) {
    return null;
  }
  let result = str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  if (isGlobal) result = result.replace(/\s/g, '');
  return result;
}

/**
 * 日期时间格式化
 * @param {Date | String | Number} value 时间、类时间对象
 * @param {String} format 格式：yyyy-MM-dd hh:mm:ss:S
 * @param {Boolean} isCoerce 是否对类时间格式强制转换
 * @returns {String} 返回格式化后的值
 * 
 * 
 * 示例
 * datetimeFormat("12月22", "yyyy年MM月dd日 hh:mm", true) // 2021年12月22日 00:00
   datetimeFormat("12:22", "yyyy年MM月dd日 hh:mm:ss:S", true)  // 2021年04月30日 12:22:00:0
   datetimeFormat("12:22", "", true)  // 1619756520000
   datetimeFormat(1619756520000, "yyyy年MM月dd日 hh:mm:ss")  // 2021年04月30日 12:22:00
 */
function datetimeFormat(value, format, isCoerce) {
  const isDate = isValidDate(value);
  // 不可转时间 非类似时间格式的字符串
  if ((!isDate && !isCoerce) || (!isDate && isCoerce && typeof value !== 'string')) {
    return value;
  }
  let date = new Date(value);
  // 非常规数据
  if (!isDate && isCoerce) {
    let nextValue = '';
    nextValue = value.replace(/年|月|日|_|,|，|。|\.|\//g, '-');
    nextValue = nextValue.replace(/时|分|秒|：|\//g, ':');
    const dateArr = nextValue.split(' '); // 拆分日期 时间
    const hasDay = nextValue.includes('-'); // 包含日期状态
    const hasTime = nextValue.includes(':'); // 包含时间状态
    if (dateArr.length !== 2 && !hasDay && hasTime) {
      const presentDate = new Date();
      const timeArr = nextValue.split(':').slice(0, 4);
      if (timeArr.length < 3) {
        nextValue = `${timeArr[0]}:${timeArr[1]}:${timeArr[2] || '00'}:${timeArr[3] || 0}`;
      }
      date = new Date(
        `${presentDate.getFullYear()}-${presentDate.getMonth() +
          1}-${presentDate.getDate()} ${nextValue}`,
      );
    }
    if (dateArr.length !== 2 && hasDay && !hasTime) {
      const nextDate = nextValue.split('-').slice(0, 3);
      if (nextDate.length === 2) {
        nextDate.unshift(new Date().getFullYear().toString());
      }
      date = new Date(`${nextDate.join('-')} 00:00:00`);
    }
    // 无法格式化时 抛出原数据
    if (!isValidDate(date)) {
      return value;
    }
  }
  if (!format) {
    return Date.parse(date);
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  const week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  if (/(E+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') +
        week[date.getDay() + ''],
    );
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return format;
}

/**
 * Date 对象判断
 * @param {Date} value 要检查的 Date 对象
 * @returns {String} 返回Date 对象 结果
 */

function isValidDate(value) {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.valueOf());
}
