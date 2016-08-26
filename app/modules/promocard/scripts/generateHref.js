'use strict'

/*
 General function for building query strings with analytics tracking codes. Tracking codes can be either an array of terms or already concatenated as a string.
 */
export function generateHref (url, trackingCodes) {
  let href = url;

  if(trackingCodes && typeof trackingCodes === 'object') {
    let terms = '';
    const termsArr = trackingCodes;
    const concatTerms = (element, index, array) => {
      const lastEl = index < array.length - 1;
      terms += lastEl ? element + '+' : element;
    };
    termsArr.forEach(concatTerms);
    href = href + '?' + terms;

    return href;
  }else if(trackingCodes && typeof trackingCodes !== 'object'){
    return url + trackingCodes;
  }else{
    return url;
  }

}
