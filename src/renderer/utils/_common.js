/**
 * 判断变量的类型
 * @param val
 * @param type
 * @returns {Boolean}
 */
export function checkType(val, type) {
  if (Array.isArray(type)) {
    return type.some(t=>Object.prototype.toString.call(val) === `[object ${t}]`);
  } else {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  }
}

/**
 * 变量转boolean
 * @param value
 * @returns {boolean}
 */
export function coerceBoolean(value) {
  return value !== null && value !== undefined && `${value}` !== 'false' && `${value}` !== 'NaN' && `${value}` !== '';
}

/**
 * 判断变量的类型
 * @param val
 * @returns {string}
 */
export function getObjectType(val) {
  return Object.prototype.toString.call(val);
}
