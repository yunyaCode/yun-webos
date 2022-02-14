function isBoolean(obj: boolean) {

  return typeof obj === 'boolean';
}


function isObject(obj: object) {

  return typeof obj === 'object' && obj;
}


function isNumber(obj: number) {

  return typeof obj === 'number'
}

function isString(obj: string) {

  return typeof obj === 'string' && obj.length
}

function isSymbol(obj: symbol) {

  return typeof obj === 'symbol'
}

function isFunction(obj: Function) {

  return typeof obj === 'function'
}

function isLink(link: string) {

  return isString(link) && /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.exec(link);
}


function getClientInfo(document: Document) {
  return {
    clientWidth: document.body.clientWidth,
    clientHeight: document.body.clientHeight,
  }
}

function rnd(n: number, m: number) {
  var random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}



export {
  isBoolean,
  isObject,
  isNumber,
  isString,
  isSymbol,
  isFunction,
  isLink,
  getClientInfo,
  rnd
}
