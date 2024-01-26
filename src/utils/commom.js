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

export const randomTool = {
  uuid,
  image: randomImage,
  word: randomWord,
  price: randomPrice,
  title: randomTitle,
  num: randomNumber,
};
