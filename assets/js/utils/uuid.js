/**
 * 回傳 uuid
 * @summary 對 replace 還沒有很熟，先記一下
 * @link https://cythilya.github.io/2017/03/12/uuid/
 * @link https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 */
export function uuid() {
  let d = Date.now();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
