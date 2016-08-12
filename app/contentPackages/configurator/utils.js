'use strict';

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
