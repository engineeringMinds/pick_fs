import jQuery from "jquery";
export function returnPID(siteid, link) {
  var PID = '';
  // console.log('this is return PID', siteid, link);
  siteid = parseInt(siteid);
  try {
    switch (siteid) {
      case 1:
        PID = link.split('pid=')[1].split('&')[0];
        // console.log('this is return PID........', PID);
        break;
      case 2:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        if (link.split('/dp/').length > 1) {
          PID = link.split('/dp/')[1].split('/')[0];
        } else if (link.split('/product/').length > 1) {
          PID = link.split('/product/')[1].split('/')[0];
        } else if (link.split('/offer-listing/').length > 1) {
          PID = link.split('/offer-listing/')[1].split('/')[0];
        }
        break;
      case 3:
        if (link.split('.html').length > 1) {
          link = link.split('.html')[0].split('/');
          PID = link[link.length - 1] + '.htm';
        } else if (link.split('.htm').length > 1) {
          link = link.split('.htm')[0].split('/');
          PID = link[link.length - 1] + '.html';
        }
        break;
      case 4:
        if (link.split('product/').length > 1) {
          link = link.split('?')[0].split('#')[0].split('/');
          PID = parseInt(link[link.length - 1]);
        }
        break;
      case 5:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        if (link.split('-pdp').length > 1) {
          link = link.split('-pdp')[0];
          PID = link.split('/')[link.split('/').length - 1];
        }
        break;
      case 6:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        if (link.split('/p-mp').length > 1) {
          link = link.split('/p-')[link.split('/p-').length - 1];
          PID = link.split('/')[0];
        }
        break;
      case 7:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        if (link.split('/buy').length > 1) {
          link = link.split('/buy')[0];
        }
        if (link.split('/').length > 1) {
          link = link.split('/');
          PID = parseInt(link[link.length - 1]);
        }
        break;
      case 8:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        PID = link.split('/p/')[1].split('/')[0];
        break;
      case 9:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        PID = link.split('/p/')[1].split('/')[0];
        break;
      case 10:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        if (link.split('.html').length > 1) {
          link = link.split('.html')[0].split('-');
          PID = link[link.length - 1];
        }
        break;
      case 11:
        link = link.split('#')[0].split('&')[0].split('?')[0];
        if (link.split('/product-detail').length > 1) {
          link = link.split('/product-detail')[0];
          PID = link.split('/')[link.split('/').length - 1];
        }
        break;
      default:
        PID = '';
    }
    return PID;
  } catch (e) {
    return '';
  }
}

export async function storage(method, data, iscookie = 0, time = 0) {
  var p = new Promise(function (resolve, reject) {
    if (method == 'set' && iscookie) {
      let x = Object.keys(data);
      data[x] = { value: data[x], _time: time * 1000 + +new Date() };
    }
    chrome.storage.local[method](data, function (options) {
      if (method == 'get') {
        if (!iscookie) resolve(options[data]);
        else {
          let cookie = options[data];
          if (cookie && cookie._time) {
            if (cookie._time > +new Date()) resolve(cookie.value);
            else {
              storage('remove', data);
              resolve('');
            }
          } else resolve('');
        }
      }
      resolve(true);
    });
  });
  const configOut = await p;
  return configOut;
}

export function get_sendMessage(item) {
  console.log(item);
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(item, (response) => {
      console.log('promise response:', response);
      if (response && response.msg && response.data) {
        resolve(response.data);
      } else {
        reject('Something wrong in ', item, 'item');
      }
    });
  });
}

export function get_price(d) {
  return Number(d.replace(/rs./gi, '').replace(/[^0-9.-]+/g, ''));
}
export function get_currency(d) {
  if (d.search(/usd/i) > -1 || d.search(/\$/) > -1)
    return { currency: 'USD', symbol: '$' };
  if (d.search(/eur/i) > -1 || d.search(/\€/) > -1)
    return { currency: 'EUR', symbol: '€' };
  if (d.search(/inr/i) > -1 || d.search(/rs/i) > -1 || d.search(/\₹/) > -1)
    return { currency: 'INR', symbol: '₹' };
  return;
}
export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export let $y = (selector,...contains) => {
  if(!selector){
      return jQuery(...contains)[0];
  }
  if(selector.indexOf('.contents()') > 0){
      let sels = selector.split('.contents()')
      if(sels[0]) return jQuery(sels[1], jQuery(sels[0], ...contains).contents()[0])[0];

  }
  if(selector.indexOf('.getattr(')  > 0){
      let sels = selector.split('.getattr(');
      return jQuery(sels[0], ...contains).attr(sels[1].split(')')[0].slice(1, -1));
  }
  return jQuery(selector, ...contains)[0];
}