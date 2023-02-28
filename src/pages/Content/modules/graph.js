import {
  returnPID,
  storage,
  get_sendMessage,
  get_price,
} from '../../require/require';
import psl from 'psl';
import jQuery from 'jquery';

let g_code,site, $s = jQuery.noConflict();

let domain = new URL(window.location.href);
if (domain) {
  let hostname = domain.hostname;
  if (hostname) {
    let parsed_url = psl.parse(hostname);
    site = parsed_url.domain;
  }
}

export async function init_graph() {
  let data = await storage('get', 'graph_base');
  // chrome.storage.local.get('graph_base',function(data){
  if (!site) return false;
  if (!data || !data[site]) return false;
  g_code = data[site];
  let pid_this = returnPID(parseInt(g_code['site_id']), window.location.href);
  return { g_code, pid_this };
  // start_graph();
  // });
}

export async function get_graph_data(g_code, PID) {
  console.log(g_code['site_id'], window.location.href);
  // pid_this = returnPID(parseInt(g_code['site_id']), window.location.href);
  // console.log(pid_this);
  if (!PID) return;
  let data = await storage('get', 'fs_' + PID);
  if (!data) {
    data = await get_sendMessage({
      dataMSg: {
        sksmode: 'graph',
        msg: 'get_pg_data',
        url: window.location.href,
        site_id: g_code['site_id'],
        PID: PID,
      },
    });

    if (data) {
      let d = {};
      d['fs_' + PID] = JSON.stringify(data.data);
      storage('set', d, 1, 3600);
      // storageExpire.set('fs_'+request.PID ,JSON.stringify(request.data),3600);
    }
  }
  return data;
}

// export function start_graph(PID) {
//   console.log(g_code['site_id'], window.location.href);
//   pid_this = returnPID(parseInt(g_code['site_id']), window.location.href);
//   console.log(pid_this);
//   if (!pid_this) return;
//   senddraw(pid_this);
// }
// chrome.runtime.onMessage.addListener(function (request, sender) {
//   console.log(request);
//   if (request.graph_res) {
//     try {
//       if (request.error || !request.data || !request.PID) {
//         return setTimeout(() => {
//           removegraph();
//         }, 1500);
//         console.log('err');
//       } else {
//         storageExpire.set(
//           'fs_' + request.PID,
//           JSON.stringify(request.data),
//           3600
//         );
//         // draw(request.data);
//       }
//     } catch (e) {
//       console.log(e);
//       setTimeout(() => {
//         removegraph();
//       }, 1500);
//     }
//   }
// });
// function senddraw(PID) {
//   console.log(PID);
//   storageExpire.get('fs_' + PID).then((data) => {
//     console.log(data);
//     if (!data)
//       chrome.runtime.sendMessage({
//         sksmode: 'graph',
//         url: window.location.href,
//         PID: PID,
//       });
//   });
// }

function get_price_fromsel(sel) {
  if ($s(sel).length) return get_price($s(sel + ':eq(0)')[0].innerText);
  return 0;
}

export function add_wl_popup() {
  let prod_img, title;

  try {
    prod_img = $s(g_code.image_selector)[0].src;
    if (!prod_img) adsfwcq34;
  } catch (e) {
    try {
      prod_img = $s(g_code.image_selector)
        .css('background-image')
        .slice(4, -1)
        .replace(/"/g, '');
      prod_img = new URL(prod_img, window.location.href).href;
      if (!prod_img) adsf2e2e;
    } catch (e) {
      prod_img = 'https://data.flipshope.com/image/placeholder.png';
    }
  }
  try {
    title = $s(g_code.title_selector).text();
  } catch (e) {
    title = '';
  }
  let prod_data = {
    image: prod_img,
    starting_price: get_price_fromsel(g_code.price_selector),
    pid: returnPID(parseInt(g_code['site_id']), window.location.href),
    store_id: g_code.site_id,
    logo: g_code.img_url,
    title: title,
    watch_for_days: 30,
    min_drop: 0,
    discount_price: '',
  }; // discounted-price selector could be added to prod_data...

  console.log('prod_data from selector:...', prod_data);
  return prod_data;
}
