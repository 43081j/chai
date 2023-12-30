/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import {inspect} from './inspect.js';
import {config} from '../config.js';

/**
 * ### .objDisplay(object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {unknown} obj javascript object to inspect
 * @returns {string} stringified object
 * @name objDisplay
 * @namespace Utils
 * @public
 */
export function objDisplay(obj: unknown) {
  var str = inspect(obj)
    , type = Object.prototype.toString.call(obj);

  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !(obj as Function).name || (obj as Function).name === ''
        ? '[Function]'
        : '[Function: ' + (obj as Function).name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + (obj as unknown[]).length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj as Record<PropertyKey, unknown>)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
}