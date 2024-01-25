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
export function randomImage(width = 100, height = 100) {
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
