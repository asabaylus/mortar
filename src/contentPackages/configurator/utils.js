'use strict';

/*
 * It creates an object based on value of fromString then assign value param. e.g
 * fromString: 'config.image.url', value: 'http://placehold.it/800x600', parent = {}
 * will create an object like this:
 *  {
 *    config: {
 *      image: {
 *        url: 'http://placehold.it/800x600'
 *      }
 *    }
 *  }
 */
export function createObjectFromString(fromString, value, parent = {}) {

  if(!fromString) {
    return parent;
  }

  const namespaces = fromString.split('.');

  let current = parent;
  let namespace;

  for(let i = 0; i < namespaces.length - 1; i++) {
    namespace = namespaces[i];
    current[namespace] = current[namespace] || {};
    current = current[namespace];
  }

  current[namespaces.pop()] =  value;

  return parent;
}
