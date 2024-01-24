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
