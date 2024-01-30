/**
 * 生成uuid
 * @returns {string}
 */
export function uuid() {
  let S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  // Generate a pseudo-GUID by concatenating random hexadecimal.
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

/**
 * 返回一张随机图片
 * @param {number} width
 * @param {number} height
 * @returns {string}
 */
export function randomImage(width = 300, height = 300) {
  return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
}

/**
 * 返回一个随机英语单词
 * @params {number} length 单词长度
 * @params {boolean} isUpperCase 首字符大写
 * @returns {string}
 */
export function randomWord(length = 5, isUpperCase = true) {
  let word = '';
  for (let i = 0; i < length; i++) {
    word += String.fromCharCode(97 + Math.ceil(Math.random() * 25));
  }
  return isUpperCase ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

/**
 * 返回一个随机标题(英文)
 * @params {number} length 单词个数
 * @params {number} wordLength 单词长度
 * @returns {string}
 */
export function randomTitle(length = 20, wordLength = 5) {
  let title = '';
  for (let i = 0; i < length; i++) {
    title += randomWord(wordLength) + ' ';
  }
  return title;
}

/**
 * 返回一个随机价格,(带两位小数)
 * @params {number} min 最小值
 * @params {number} max 最大值
 * @returns {number}
 */
export function randomPrice(min = 0, max = 100) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

/**
 * 随机数(不带小数)
 * @params {number} min 最小值
 * @params {number} max 最大值
 * @returns {number}
 */
export function randomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 创建一个商品列表
 * @params {number} length 商品个数
 * @returns {Array}
 */
export function createGoodsList(length) {
  return Array.from({ length }, () => {
    return {
      id: randomTool.uuid(),
      name: randomTool.word(),
      url: randomTool.image(),
      title: randomTool.title(5),
      price: randomTool.price(),
      commentCount: randomTool.num(),
      commentLevel: randomTool.num(0, 5),
    };
  });
}

/**
 * 返回随机颜色
 * @returns {string}
 */
export function randomColor() {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
  );
}

/**
 * 生成一个范围在[min, max)之间的随机整数
 * @params {number} min 最小值
 * @params {number} max 最大值
 * @returns {number}
 */
export function randomInt(min, max) {
    // 使用 Math.floor() 将浮点数向下取整为整数
    return Math.floor(Math.random() * (max - min) + min);
}


export const randomTool = {
  uuid,
  image: randomImage,
  word: randomWord,
  price: randomPrice,
  title: randomTitle,
  num: randomNumber,
  goodsList: createGoodsList,
  color: randomColor,
};
