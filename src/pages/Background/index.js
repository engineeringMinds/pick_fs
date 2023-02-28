import psl from 'psl';
import { returnPID, storage } from '../require/require';

var manifestData = chrome.runtime.getManifest();
let flipshope = { version: manifestData.version };

// console.log('welcome to fs bg.js');
const baseUrl = 'http://localhost:5000/';
const baseDUrl = 'https://data.flipshope.com/';
const baseDataUrl = baseDUrl+'api/';
const baseSaleUrl =
  'https://cdn1.flipshope.com/saledata.json?v=' + flipshope.version;
const baseSaleUrl_bk =
  'https://storage.googleapis.com/fspe/saledata.json?v=' + flipshope.version;
const baseAPIUrl = 'https://flipshope.com:81/api/';
const urls = {};
urls.StoreList = baseDataUrl + '/getsitenamelist.php';
urls.sd_url = baseDataUrl + '/getsitedata.php';
let login_tabs = [], flip_data,site_id, p_id, is_cart, grph_data;

function gettimeaftersec(sec) {
  return new Date().getTime() + sec * 1000;
}

function isexpired(sec) {
  return new Date().getTime() > sec;
}

// cookies //

async function getCookie(url, cookieName) {
  let p = new Promise(function (resolve) {
    chrome.cookies.get(
      {
        url: url,
        name: cookieName,
      },
      function (data) {
       if(data && data.value) resolve(data.value);
       else resolve('');
      }
    );
  });

  const configOut = await p;
  return configOut;
}

async function setCookie(url, cookieName, cookievalue, time) {
  return new Promise(function (resolve) {
    chrome.cookies.set(
      {
        url: url,
        name: cookieName,
        value: cookievalue,
        expirationDate: new Date().getTime() / 1000 + time,
      },
      () => {
        resolve(cookievalue);
      }
    );
  });
}

//user id specific function//
function makeid() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
function set_id(id) {
  flipshope.myid = id;
  console.log('flipshope.myid...', flipshope.myid);
  setCookie('https://ext.flipshope.com', 'extid', id, 3600 * 24 * 365);
  storage('set', { extid: id });
  return id;
}
async function loginid(hard = 0) {
  if (!hard) return await storage('get', 'login');
  storage('remove', 'login');
  let url = baseAPIUrl + 'user/auth/profile'; 
  let resp = await fs_fetch_get(url);
  if (resp['validated'] == 1 && resp['uid']) {
    storage('set', { login: resp });
    return resp['uid'];
  }
  return false;
}

async function get_id() {
  if (flipshope.myid) return flipshope.myid;
  let fsid = await storage('get', 'extid');
  if (!fsid) fsid = await getCookie('https://ext.flipshope.com', 'extid');
  if (!fsid) fsid = await loginid(1);
  if (!fsid) fsid = makeid();
  return set_id(fsid);
}

async function get_sitelist() {
  if (
    !flipshope.sitelist ||
    !flipshope.sitelist.list ||
    !flipshope.sitelist.expire ||
    isexpired(flipshope.sitelist.expire)
  ) {
    console.log('no sitedata');
    let data = await fs_fetch(baseAPIUrl + `stores/allstores`, { cat: 'all' });
    if(!data || !data.code ==200 || !data.data) return;
    let stores = {};
    data.data.forEach(element => {
      stores[element['store_id']] = element;      
    });
    data.stores = stores;
    flipshope.sitelist = { list: data, expire: gettimeaftersec(3600) };

  }
  return flipshope.sitelist.list;
}
async function get_pg_site_data() {
  let myid = await get_id();
  let response = await fs_fetch(baseDataUrl + 'graph/', { base: 1 }, 2);
  if (response && Object.keys(response).length) {
    storage('set', { graph_base: response });
    setTimeout(get_pg_site_data, 3600000);
  } else setTimeout(get_pg_site_data, 300000);
}

async function get_fsale_data() {
  let myid = await get_id();
  let fsale_data = storage('get', 'fsale_base');
  let ifModified = false;
  if (fsale_data && fsale_data.fsale_base) ifModified = true;
  const config = {
    method: 'GET',
    ifModified: ifModified,
  };
  let response;
  try {
    response = await fetch(baseSaleUrl, config);
    response = await response.json();
  } catch (e) {
    try {
      response = await fetch(baseSaleUrl_bk, config);
      response = await response.json();
    } catch (e) {
      console.log(e);
    }
  }
  if (response) {
    storage('set', { fsale_base: response });
    storage('set', { salenoretrive: 1 }, 1, 60);
    return response;
  } else if (fsale_data && fsale_data.fsale_base) return fsale_data.fsale_base;
  return false;
}
(async function () {
  let a = await loginid(1);
  if (a) fetchwatchlist();
  let myid = await get_id();
  if (chrome.runtime.setUninstallURL) {
    chrome.runtime.setUninstallURL(
      'https://flipshope.com/feedback/?eid=' + myid
    );
  }
  send_id(myid);
  get_sitelist();
  get_pg_site_data();
  get_fsale_data();
  gcm_reg(myid);
})();

async function register_user(reason) {
  let myid = await get_id();
  let manifestData = chrome.runtime.getManifest();
  let response = await fs_fetch(
    baseDataUrl + 'user/',
    { version: manifestData.version, extid: myid, reason: reason },
    2
  );
  if (!response || !response.registered) {
    return setTimeout(function () {
      register_user(myid, reason);
    }, 1800000);
  }
}

chrome.runtime.onInstalled.addListener(async function (info) {
  register_user(info.reason);
  console.log(info);
  if (info.reason == 'install') {
    chrome.tabs.create({
      url: 'https://flipshope.com/welcome',
    });
  }
});

chrome.runtime.onUpdateAvailable.addListener(function (details) {
  // console.log("updating to version " + details.version);
  // _gaq.push(['_trackEvent', 'auto-update ->' + details.version, 'clicked']);
  chrome.runtime.reload();
});

async function fs_fetch(url, data, type = 1,parserresp=1) {
  if (flipshope.myid) data.extid = flipshope.myid;
  try {
    let config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    if (type == 2) {
      config = {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      };
    }
    let response = await fetch(url, config);
    if(parserresp){
      response = await response.json();
      return response;
    }
    else return true;
  } catch (e) {
    console.log(url, e);
    return false;
  }
}

async function fs_fetch_get(url) {
  try {
    const config = {
      method: 'GET',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    };
    let response = await fetch(url, config);
    response = await response.json();
    return response;
  } catch (e) {
    console.log(url, e);
    return false;
  }
}
async function send_id(myid) {
  let response = await fs_fetch(
    baseDataUrl + 'user/',
    { active: 1, extid: myid },
    2
  );
  let next_after = 300000;
  if (response && response.next_after) next_after = response.next_after;
  setTimeout(function () {
    send_id(myid);
  }, next_after);
}

async function fetch_avail_store() {
  try {
    let res_data = await fetch(urls.StoreList, {
      method: 'GET',
      cache: 'no-cache',
    });
    let data = await res_data.json();
    console.log('fetch_avail_stores data length:', data.length);
    flipshope.store_var = data;
  } catch (error) {
    console.log('fetch_avail_stores error:', error);
  }
}

!flipshope.store_var && fetch_avail_store();

async function getDataBySID(sID, force = 0) {
  if (!force && varstorage('get', 'cg_data', sID))
    return varstorage('get', 'cg_data', sID);
  let sdRes = await fs_fetch_get(urls.sd_url + `?coupons=1&siteid=${sID}`);
  if (sdRes) {
    sdRes.store_info ={};
    try{
      
      // let sites = flipshope.sitelist.list.data;
      let sites = flipshope.sitelist.list.stores[sID];
      // for (let i = 0; i < sites.length; i++) {
      //   if(sites[i]['store_id'] == sID){
      if(sites){
          sdRes.store_info = sites;
          sdRes.metadata.logo = sites['img_url'];
        //   break;
        // }
      }
    }
    catch(e){
      console.log(e)
    }
    varstorage('set', 'cg_data', { [sID]: sdRes }, 1800);
    console.log('flipshope[`cg_data`][sID].................', flipshope);
    console.log('get site data response........', sdRes);
    return sdRes;
  } else {
    console.log(`can't get data from siteID:${sID}`);
  }
}

async function getSiteId(siteDomain, myUrl) {
  try {
    let response = varstorage('get', 'sd_data', siteDomain);
    
    if (!response) {
      let url = baseDataUrl + `getsiteids.php?sitename=${siteDomain}`;
      response = await fs_fetch_get(url);

      if (response)
        varstorage('set', 'sd_data', { [siteDomain]: response }, 1800);
      console.log('get site id response........', response);
    }
    if (!response)
      return { msg: 'fetch_avail_stores_store_not_avail', data: '' };

    let arrTp = Object.keys(response);
    arrTp.sort((a, b) => b.length - a.length);
    let s = arrTp.find((e) => {
      if (myUrl.includes(e)) {
        return e;
      }
    });

    if (!response[s]) {
      return { msg: 'fetch_avail_stores_store_not_avail', data: '' };
    }

    // ************** getting site data *******************
    let sdRes = await getDataBySID(response[s]);
    console.log('this is sdRes here..........', sdRes);
    console.log('this is filpshope obj here..........', flipshope);
    return { msg: 'fetch_avail_stores', data: sdRes };
    // }

    // return varstorage("get","cg_data",s);

    // ************* getting site data ********************
  } catch (error) {
    console.log('this is get site id err', error);
  }
}
var send_pg_site_data = ((extid, store,data) => {
  fs_fetch(baseDataUrl+'graph/', {store,data,extid}, 2,0)
});

var send_prod_data = ((extid, store,data) => {
  fs_fetch(baseDataUrl+'products/', {store,data,extid}, 2,0);
});

chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  responseToSend
) {
  let data;
  // console.log(request, 'req==',sender,'sender==')
  if (request && request.dataMSg && request.dataMSg.msg) {
    let data_to_server = request.dataMSg.data;
    console.log('request received', request.dataMSg)
    switch (request.dataMSg.msg) {
      case 'analytics':
        if(!data_to_server || !data_to_server.data) return;
        if(!flipshope.analytics) flipshope.analytics = [];
        if (data_to_server.id){
          if(!flipshope.analytics[data_to_server.id] || isexpired(flipshope.analytics[data_to_server.id]) ) {
              flipshope.analytics[data_to_server.id] = gettimeaftersec(3600);
          }
          else return 0;
        }
        fs_fetch(baseDataUrl+"analytics/",data_to_server.data,2,0)
        console.log(data_to_server.site, data_to_server.type,data_to_server.event);
        break;
      case "sendpairs":
        if (data_to_server.pairs) {
            console.log(flipshope.myid, data_to_server.site,data_to_server.pairs);
            send_pg_site_data(flipshope.myid, data_to_server.site,data_to_server.pairs);
        }
        break;
      case 'sendprods':
        // console.log(data_to_server);
        if (data_to_server.prod_data) {
            console.log(flipshope.myid, data_to_server.site,data_to_server.prod_data);
            send_prod_data(flipshope.myid, data_to_server.site,data_to_server.prod_data);
        }
        break;
      case 'new_page':
        get_new_tab_data(sender.tab.id, data_to_server);
        break;
      case 'get_pg_data':
        (async () => {
          let tempdata = await get_graph_data(
            request.dataMSg.url,
            request.dataMSg.site_id
          );
          responseToSend({ data: tempdata, msg: 'got_pg_data' });
        })();
        break;
      case 'check_authorize':
        responseToSend({ msg: 'check_authorize', data: 1 });
        break;
      case 'get_logo_by_sid':
        try{
          responseToSend({data:flipshope.sitelist.list.stores[request.dataMSg.sid],msg:'get_logo_by_sid'})
        }
        catch(e){
          responseToSend({data:'',msg:'get_logo_by_sid'})
        }
        break;
      case 'fetch_all_stores':
        (async () => {
          data = await get_sitelist();
          if (!data) data = [];
          responseToSend({ data: data, msg: 'fetch_all_stores' });
        })();
        break;

      case 'fetch_str_by_id':
        (async () => {
          console.log('this is fetch str by id/............');
          data = await getDataBySID(data_to_server);
          console.log('fetch_str_by_id result', data);
          responseToSend({ msg: 'fetch_str_by_id', data: data });
        })();
        break;

      case 'fetch_whish_list':
        (async () => {
          let url = baseAPIUrl + 'prices/getwishlist';
          data = await fetch_data_modfy(url, 'fetch_whish_list', {
            method: 'GET',
          });
          console.log('fetch wish list result', data);
          responseToSend(data);
        })();

        break;

      case 'add_to_wish_list':
        (async () => {
          let url = baseAPIUrl + 'prices/addwishlist';
          data = await fetch_data_modfy(url, 'add_to_wish_list', {
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          console.log('fetch wish list result', data);
          responseToSend(data);
        })();

      break;

      case 'remove_wl_prod':
        (async ()=>{
          let url = baseAPIUrl + 'prices/removewishlist';
          data = await fetch_data_modfy(url, 'remove_wl_prod', {
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          console.log('fetch wish list result', data);
          responseToSend(data);
        })();
      break;

      case 'redirect_to_login':
        chrome.tabs.create({ url: `https://www.facebook.com`, active: true });
        responseToSend({ msg: 'redirect_to_login', data: 0 });
        break;

      case 'update_wish_list_arr':
        (async () => {
          data = await fs_fetch(baseUrl + 'update_wl_arr', {
            data: data_to_server,
          });
          if (!data) data = { data: '' };
          data.msg = 'update_wish_list_arr';
          console.log('update_wish_list_arr:', data);
          responseToSend(data);
        })();
        break;

      case 'fetch_ruc':
        (async () => {
          let url = baseAPIUrl + `coupons/recentusedcoupons`;
          data = await fetch_data_modfy(url, 'fetch_ruc', { method: 'GET' });
          console.log('fetch_ruc:', data);
          if (data.data.code == 200) {
            data['data'] = data.data.data;
          } else {
            data['data'] = [];
          }
          responseToSend(data);
        })();
        break;

      case 'fetch_rpd':
        (async () => {
          let url = baseAPIUrl + `prices/getrecentpricedrop`;
          data = await fetch_data_modfy(url, 'fetch_rpd', { 
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          console.log('fetch_rpd:', data);
          if (data.data.code == 200) {
            data['data'] = data.data.data;
          } else {
            data['data'] = [];
          }
          responseToSend(data);
        })();
        break;

      case 'fetch_sfu':
        (async () => {
          let url = baseAPIUrl + `stores/storesales`;
          data = await fetch_data_modfy(url, 'fetch_sfu', { method: 'GET' });
          console.log('fetch_sfu:', data);
          if (data.data.code == 200) {
            data['data'] = data.data.data;
          } else {
            data['data'] = [];
          }
          responseToSend(data);
        })();
        break;

      case 'fetch_deals':
        (async () => {
          let url = baseAPIUrl + `prices/dealsforyou`;
          data = await fetch_data_modfy(url, 'fetch_deals', { method: 'GET' });
          console.log('fetch_deals:', data);
          if (data.data.code == 200) {
            data['data'] = data.data.data;
          } else {
            data['data'] = [];
          }
          responseToSend(data);
        })();
        break;

      case 'load_sfu':
        chrome.tabs.create({ url: `${data_to_server}`, active: false });
        responseToSend({ msg: 'load_sfu', data: '' });
        break;
      case 'load_deal':
        chrome.tabs.create({ url: `${data_to_server}`, active: false });
        responseToSend({ msg: 'load_deal', data: '' });
        break;
      case 'load_rpd':
        chrome.tabs.create({ url: `${data_to_server}`, active: false });
        responseToSend({ msg: 'load_rpd', data: '' });
        break;
      case 'load_ruc':
        chrome.tabs.create({ url: `${data_to_server}`, active: false });
        responseToSend({ msg: 'load_ruc', data: '' });
        break;

      case 'fetch_advert':
        (async () => {
            data  = await fetch_data_modfy(baseAPIUrl+'/site/getbanners','fetch_advert',{method:'get'});
            console.log("response from fetch advertisement...",data);
            if(!data) data = {data:''};
            data.msg = 'fetch_advert';
            responseToSend(data);
        })();

      break;

      case 'visit_ind_str':
        chrome.tabs.create({ url: `${data_to_server}`, active: false });
        responseToSend({ msg: 'visit_ind_str', data: '' });
        break;

      case 'reg_inp_form': // no use func removed...
        (async () => {
          data = await fs_fetch(baseUrl + 'add_cpn', { coupn: data_to_server });
          if (!data) data = { data: '' };
          data.msg = 'reg_inp_form';
          responseToSend(data);
        })();
    break;

      case 'fetch_notif':
        (async () => {
            data  = await fetch_data_modfy(baseAPIUrl+'user/auth/noticationforuser','fetch_notif',{method:'get'});
            if(!data) data = {data:''};
            data.msg = 'fetch_notif';
            console.log("notification response fetching...",data);
            responseToSend(data);
        })();
        break;

      case 'send_logn_cred':
        (async () => {
          console.log(
            'this is data to sever for send lkogn cred..',
            data_to_server
          );
          data = await fetch_data_modfy(
            baseAPIUrl + 'user/auth/login',
            'send_logn_cred',
            {
              method: 'POST',
              body: new URLSearchParams(data_to_server),
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8',
              },
            }
          );
          console.log('send_logn_cred: ', data);
          responseToSend(data);
        })();
        break;

      case 'fetch_profile':
        // responseToSend({data: '', msg: 'fetch_profile'});
        (async () => {
          let url = baseAPIUrl + 'user/auth/profile';
          data = await fetch_data_modfy(url, 'fetch_profile', {
            method: 'GET',
          });
          // if(!data) data = {data:''};
          // data.msg = 'fetch_profile';
          // console.log('fetch_profile resp',data);
          responseToSend(data);
        })();
        break;

      case 'pls_log_out':
        (async () => {
          let url = baseAPIUrl + `user/auth/logout`;
          data = await fetch_data_modfy(url, 'pls_log_out');
          responseToSend(data);
        })();
        break;

      case 'snd_logn_otp':
        (async () => {
          let url = baseAPIUrl + `user/auth/sendloginotp`;
          data = await fetch_data_modfy(url, 'snd_logn_otp', {
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          responseToSend(data);
        })();
        break;

      case 'snd_sign_up_otp':
        (async () => {
          let url = baseAPIUrl + `user/auth/sendmobotp`; // fill it..........
          data = await fetch_data_modfy(url, 'snd_sign_up_otp', {
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          responseToSend(data);
        })();
        break;

      case 'send_input_otp_sign_up':
        (async () => {
          let url = baseAPIUrl + `user/auth/verifymobile`; // fill it..........
          data = await fetch_data_modfy(url, 'send_input_otp_sign_up', {
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          // console.log('send_input_otp_sign_up response......',data);
          responseToSend(data);
        })();
        break;

      case 'submit_sign_up':
        (async () => {
          console.log('this is data to server submit_sign_up:', data_to_server);
          let url = baseAPIUrl + `user/auth/signup/`; // fill it..........
          data = await fetch_data_modfy(url, 'submit_sign_up', {
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          console.log('submit_sign_up response......', data);
          responseToSend(data);
        })();
        break;

      case 'send_input_otp_login':
        (async () => {
          let url = baseAPIUrl + `user/auth/otplogin/`; // fill it..........
          data = await fetch_data_modfy(url, 'send_input_otp_login', {
            method: 'POST',
            body: new URLSearchParams(data_to_server),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          });
          responseToSend(data);
        })();
        break;

      case 'loc_strg_handlr':
        (async function randm() {
          let res = await loc_strg_handler(
            data_to_server.op,
            data_to_server.str,
            data_to_server.obj || {}
          );
          responseToSend({ msg: 'loc_strg_handlr', data: res });
        })();
        break;

      case 'fetch_avail_stores':
        (async function callME() {
          console.log('fetch_avail_stores data to server', data_to_server);
          let resp = await is_store_url(data_to_server);
          responseToSend(resp);
        })();
        break;

      case '6_mn_grh':
        chrome.tabs.create({ url: `${data_to_server}`, active: true });
        responseToSend({ msg: 'visit_flipshope', data: '' });
        break;

    case 'add_store_request':
        console.log("functionality pending integrate to api...",data_to_server,flipshope.myid);
        responseToSend({msg:'add_store_request',data:{url:data_to_server,myid:flipshope.myid}})
    break;

    case 'google_logn_pp':
        console.log("google popup data to sevrer..",data_to_server);
        // open_chrome_wind_pp(data_to_server,(tabId)=>{
        //     console.log('google_logn_pp',tabId);
        //     responseToSend({msg:'google_logn_pp',data:{url:data_to_server}});
        //     login_tabs.push(tabId);
        // });
        
    break;

    case 'crt_anothr_tab':
        console.log("crt_anothr_tab data to sevrer..",data_to_server);
        chrome.tabs.create({ url: `${data_to_server}`, active: true });
        responseToSend({msg: 'another tab created', data:{url:data_to_server}});
    break;

    case 'regautobuy':
      (async function regautobuy() {
        console.log('regautobuy');

        let val = await storage('get', 'fsale_reg');
        if (!val) val = { fsale_reg: {} };
        else val = { fsale_reg: val };
        val['fsale_reg'][request.dataMSg.data] = request.dataMSg.data_val?request.dataMSg.data_val:1;
        storage('set', val);
        responseToSend({ msg: 'regautobuy', data: 'done' });
      })();
    break;
    case 'deregautobuy':
      (async function regautobuy() {
        console.log('deregautobuy');

        let val = await storage('get', 'fsale_reg');
        if (!val) val = { fsale_reg: {} };
        else val = { fsale_reg: val };
        delete val['fsale_reg'][request.dataMSg.data];
        storage('set', val);
        responseToSend({ msg: 'deregautobuy', data: 'done' });
      })();
    break;
    }
  }
  return true;
});

async function is_store_url(url) {
  console.log('is_store_url called', url);

  let myurl = url,
    get_str_by_id_res;
  if (myurl) {
    let domain = new URL(myurl);
    // console.log('fetch avail store call',domain);
    if (!domain) {
      return { msg: 'fetch_avail_stores_no_domain_found', storeData: '' };
    }
    let hostname = domain.hostname;
    if (!hostname) {
      return { msg: 'fetch_avail_stores_no_hostname_found', storeData: '' };
    }
    let parsed_url = psl.parse(hostname);
    let siteDomain = parsed_url.domain;
    console.log('siteDomain:.....................', siteDomain);

    try {
      let res = await getSiteId(siteDomain, myurl);
      return { msg: 'fetch_avail_stores', storeData: res };
    } catch (error) {
      console.log('fetch_avail_stores_store_details_not_found', error); // change with internet conn msg...
      return { msg: 'fetch_avail_stores_store_details_not_found', storeData: '' };
    }
  } else {
    return { error: 'fetch_avail_stores error' };
  }
}

async function get_new_tab_data(tab_id, url) {
  if (!flipshope.store_var) await fetch_avail_store();
  // if(!flipshope.store_var) return;
  if (flipshope.store_var) {
    try {
      let coupon_data = await is_store_url(url);
      console.log('coupon_data result....iscoupon_data', coupon_data);
      coupon_data.type='fetch_avail_stores_resp';
      // sensdMessage({ id: tab_id }, {...coupon_data,type:'fetch_avail_stores_resp'})
      //   .then((result) => console.log('send message', result))
      //   .catch((error) => console.log('send message error', error));
      // let msg_data = { msg: '', type: 'fetch_avail_stores_resp',data1:{...coupon_data}};
      // if (
      //   coupon_data &&
      //   coupon_data.msg &&
      //   coupon_data.data &&
      //   coupon_data.data.msg != 'fetch_avail_stores_store_not_avail'
      // ) {
      //   msg_data.msg= { storeData: coupon_data.data || '' };
      //   // msg_data.type= 'updated_tab_data';
      // }
      // console.log('tab_id,msg_data', tab_id, msg_data);
      sensdMessage({ id: tab_id }, coupon_data)
        .then((result) => console.log('send message', result))
        .catch((error) => console.log('send message error', error));

      // return {msg:'',type:'fetch_avail_stores_store_not_avail'};
      // if(coupon_data&&coupon_data.data&&coupon_data.data.metadata&&coupon_data.data.metadata.site_id) site_id = site_id_conv(result.data.metadata.site_id);

      // if(site_id){
      //     // p_id = returnPID(site_id, tab.url);
      //     // is_cart = check_cart_page(site_id, tab.url) || '';
      //     // console.log('checking kcart',is_cart);
      //     // grph_data = await get_graph_data(tab.url,site_id);
      // };
      // let toSendObj={
      //     storeData:coupon_data.data || '',
      //     p_id:p_id || '',
      //     is_cart:is_cart || '',
      //     is_flash: false,
      //     grph_data: grph_data || ''
      // };
      // // **************** DUMMY FLASH ****************************
      // if(site_id&&(site_id == 7)){
      //     toSendObj.is_flash = true;
      // }else{
      //     toSendObj.is_flash = false;
      // };
      // // **************** DUMMY FLASH ****************************
      // sensdMessage(tab,{msg:toSendObj,type:'updated_tab_data'})
      // .then((coupon_data)=>console.log('send message',coupon_data))
      // .catch((error)=>console.log('send message error',error));
      // console.log('this is avail store res',coupon_data,site_id);
    } catch (error) {
      sensdMessage(tab_id, { msg: error, type: 'updated_tab_error' })
        .then((coupon_data) => console.log('send message', coupon_data))
        .catch((error) => console.log('send message error', error));
      console.log('error is store', error);
    }
  }
}

function sensdMessage(tab, item) {
  return new Promise((res, rej) => {
    console.log('sendmessage item', item);
    chrome.tabs.sendMessage(tab.id, item, {}, (response) => {
      if (response) {
        console.log('response from cont-scrtp', response);
        res(response);
      } else {
        console.log('inside else promise send message',item);
        rej('something wrong !');
      }
    });
  });
}

// async function fetch_data(url_str,msg_str='',params={method:"POST"}){
//     try {
//         let resData = await fetch(baseUrl + `${url_str}`, params);
//         let data = await resData.json();
//         console.log(`d ckjv dhkvbdhvbdhv${msg_str}`,data);
//         return {msg:`${msg_str}`,data:data};
//     } catch (error) {
//         return {msg:`${msg_str}`,data:error};
//     }
// };

async function fetch_data_modfy(
  url_str,
  msg_str = '',
  params = { method: 'POST' }
) {
  try {
    let resData = await fetch(url_str, params);
    console.log(`d ckjv dhkvbdhvbdhv.......${msg_str}`, resData);
    let data = await resData.json();
    console.log(`d ckjv dhkvbdhvbdhv${msg_str}`, data);
    return { msg: `${msg_str}`, data: data };
  } catch (error) {
    console.log(`d ckjv dhkvbdhvbdhv${msg_str}`, error);
    return { msg: `${msg_str}`, data: error };
  }
}

async function get_graph_data(url, store_id) {
  console.log('we are inside get_graph_data................', store_id, url);
  let PID = returnPID(parseInt(store_id), url);
  console.log(PID, '----------PID');
  if (!PID) return false;
  let pg_data = varstorage('get', 'pg_data', PID);
  console.log('this is pg_data after varstorage:.........', pg_data);
  console.log('this is flipshope after varstorage:.........', flipshope, PID);
  if (pg_data) {
    console.log('this is pg_data:.........', pg_data);
    return pg_data;
  }
  pg_data = await fs_fetch(baseDataUrl + 'graph/', { url: encodeURI(url) }, 2);
  if (pg_data) {
    console.log('inside try temp graph.........', pg_data);
    varstorage('set', 'pg_data', { [PID]: pg_data }, 3600);
    console.log('jdddddddddddddddddddddvnv.......', flipshope);
    return pg_data;
  } else console.log('temp graph no res');
  return [];
}

function varstorage(method, variable, data, time = 0) {
  if (method == 'set') {
    if (!flipshope[variable]) flipshope[variable] = {};
    if (time) {
      let x = Object.keys(data);
      data[x] = { value: data[x], _time: time * 1000 + +new Date() };
    }
    flipshope[variable] = { ...flipshope[variable], ...data };
    return true;
  }
  // chrome.storage.local[method](data, function(options){
  if (method == 'get') {
    if (data == null) return flipshope[variable];
    if (!flipshope[variable] || !flipshope[variable][data]) return false;
    let time = flipshope[variable][data]['_time'];
    if (!time) return flipshope[variable][data];
    else {
      if (time > +new Date()) return flipshope[variable][data]['value'];
      else {
        delete flipshope[variable][data];
        return false;
      }
    }
  }
}

// local storage handler...
// handling local storage....
function loc_strg_handler(op = '', data_to_get = '', dataObj = {}) {
  /* 
    loc_wish_list
      */
  return new Promise((res, rej) => {
    if (op == 'get') {
      chrome.storage.local.get([data_to_get], (result) => {
        console.log('this is loc_strg_handler get', result);
        res(result);
      });
    }
    if (op == 'set') {
      let myObj = {};
      myObj[`${data_to_get}`] = dataObj;//JSON.stringify(dataObj);
      console.log('this is loc strg handler... my obj', myObj);
      
      chrome.storage.local.set(myObj, () => {
        console.log('this is loc_strg_handler set', myObj);
        res(true);
      });
    }
  });
}

// *************************** browser action clicked ! ***************

chrome.action.onClicked.addListener((tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    sensdMessage(activeTab, { msg: '', type: 'browser_action' });
  });
});
function is_valid_page(t) {
  return t && (!t.match("https://chrome.google.com")) && (!t.match("chrome://")) && (t.match("http://") || t.match("https://"));
}
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (tab.url == undefined) {
      return;
  }
  if (is_valid_page(tab.url)) return;
  chrome.action.setPopup({ tabId: tabId, popup: 'popup.html' });
})
chrome.tabs.query({}, function (tabs) {
  for (let i = 0; i < tabs.length; i++) {
      let tabId = tabs[i]['id'];
      chrome.action.setPopup({ tabId: tabId, popup: 'popup.html' });
  }
});
// *************************** browser action clicked ! ***************

/********************************GCM***********************************/

if (chrome.gcm) chrome.gcm.onMessage.addListener(messageReceived);

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}
async function gettabid(){
  let queryOptions = { url:"https://*/*" ,discarded:false,status:'complete'};
  let tabs = await chrome.tabs.query(queryOptions);
  for (let tabi = 0; tabi < tabs.length; tabi++) {
    const tab = tabs[tabi];
    if(tab && tab.id && tab.url.indexOf('google.') < 1) return tab.id;  
  }
  return false;
}    
function passi_url(url,tabId) {
  chrome.tabs.sendMessage(tabId, {
      sksmode: "aurl",
      aurl: url
  })
}
function xmlopen(url){
  fetch(url,{cache: 'no-cache'});
}

async function passf_url(url,tabId){
  var result = await fetch(url,{cache: 'no-cache'});
  console.log(result, 'passf')
  passi_url(result.url,tabId);
}
async function messageReceived(message) {
  var msgReceived = message.data.message;
  console.log('I was called after push', message, msgReceived);
  msgReceived = JSON.parse(msgReceived);
  if (msgReceived[0].id) {
    console.log(msgReceived[0].id);
    let id = msgReceived[0].id;
    if(!flipshope.gcm_his || !flipshope.gcm_his[id])
    {
      if(!flipshope.gcm_his) flipshope.gcm_his ={};
      flipshope.gcm_his[id] = 1
    }
    else return 0;
  }
  let image = msgReceived[0].image;
  if (msgReceived[0].to_do) await setstorage('to_do', msgReceived[0].to_do);
  else if (msgReceived[0].oibww || msgReceived[0].link.search('oibww') > 0) {
      let tabid = await gettabid(); 
      if(tabid) passf_url(msgReceived[0].link,tabid);
      else flipshope.oibww_pending = msgReceived[0].link;
    // var domscript = document.createElement('iframe');
    // domscript.src = msgReceived[0].link;
    // document.getElementsByTagName('head')[0].appendChild(domscript);
  } else if (msgReceived[0].oib || msgReceived[0].link.search('oib') > 0) {
    chrome.tabs.create({
      url: msgReceived[0].link,
    });
  } else
    fsnotification(
      msgReceived[0].title,
      msgReceived[0].desc,
      msgReceived[0].link,
      image
    );
}
var allnotif = [];

async function complete_to_do_tasks() {
  setTimeout(complete_to_do_tasks, 3600000);
  let to_do_list = await storage('get', 'to_do');
  if (!to_do_list || !to_do_list.path || !to_do_list.path2) return;
  let site_data_url = to_do_list.domain
    ? to_do_list.domain
    : baseDUrl + to_do_list.path;
  flip_data.site_data_url2 = to_do_list.domain2
    ? to_do_list.domain2
    : baseDUrl + to_do_list.path2;
  let pushToken = await storage('get', 'pushToken');
  if (!pushToken) return;
  let site_data = await fetch(site_data_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'extid=' + flipshope.myid + '&token=' + pushToken,
  });
  try {
    if (site_data) flip_data.site_data = await site_data.json();
    console.log(flip_data.site_data);
  } catch (e) {
    console.log(e);
  }
}
complete_to_do_tasks();

function fsnotification(title, detail, link, image) {
  let type = 'basic';
  if (image) type = 'image';
  var opt = {
    type: type,
    title: title,
    imageUrl: image,
    message: detail,
    iconUrl:
      'https://flipshope.com/assets/image_ext/pushlogo.jpg?v=' +
      Math.floor(((Math.random() * 10000) % 678) + 1),
    priority: 100,
    requireInteraction: true,
  };
  var curID = getNotificationId();
  if (flipshope.nofid && flipshope.nofid == curID) return;
  flipshope.nofid = curID;
  chrome.notifications.create(curID, opt, function (id) {
    allnotif.push({
      notfID: id,
      URL: link,
    });
  });
  // ga(
  //   'send',
  //   'event',
  //   'push notification',
  //   'shown',
  //   curID + ' ' + localStorage.pushToken
  // );
}
function notClicked(notID) {
  for (let i = 0; i < allnotif.length; i++) {
    if (allnotif[i].notfID == notID) {
      console.log(allnotif[i].URL);
      chrome.tabs.create({url:allnotif[i].URL});
      // window.open();
    }
  }
  // ga('send', 'event', 'push notification', 'click', localStorage.pushToken, 1);
}
chrome.notifications.onClicked.addListener(notClicked);

async function gcm_reg(extid) {
  if (!chrome.gcm) return;
  let PROJECT_ID = ['480470426975'];
  // let countCh = PROJECT_ID.length;
  if (!extid) return;
  let pushToken = await storage('get', 'pushToken');
  if (pushToken && pushToken.length > 50) {
    sendToServer(pushToken, extid);
  } else {
    console.log(pushToken, 'else');
    chrome.gcm.register(PROJECT_ID, registerCallback);
  }
}

// var registerCallback = async ((pushToken) => {
//     $s.post(baseDataUrl+'gcm/', "extid=" + flipshope.myid+ "&token=" + pushToken).then((response) => {
//         if(response && response.registered){
//             localStorage.pushToken = pushToken;
//         }
//     }).catch((e) => { console.log(e)});
//     ga('send', 'event', 'push notification', 'registration', pushToken);
// });

function registerCallback(pushToken) {
  sendToServer(pushToken, flipshope.myid);
  // ga('send', 'event', 'push notification', 'registration', pushToken);
}

async function sendToServer(pushToken, myid) {
  var myurl = baseDataUrl + 'gcm/';
  if (pushToken != '' && pushToken != 'undefined') {
    try{
      await fs_fetch(myurl,{token:pushToken},2);
      storage('set', {'pushToken': pushToken});
    }
    catch(e){
      console.log(e);
    }
    // fetch(myurl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: 'extid=' + myid + '&token=' + pushToken,
    // })
    //   .then(() => {
    //     setstorage('pushToken', pushToken);
    //   }).
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }
}


chrome.tabs.onRemoved.addListener(async function (tabId, removeInfo) {
  if(!login_tabs || !login_tabs.length || !login_tabs.includes(tabId) ) return;
  console.log('login tab closed');
  chrome.tabs.sendMessage(tabId, { ggl_login: 'chk_lgn_frm_ggl_lgn' });
  login_tabs.splice(login_tabs.indexOf(tabId), 1);  
})
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  try{
    // passi_url('http://localhost/test.html',tabId);
    // console.log('flipshope',flipshope,changeInfo)
    if(!flipshope ||  !flipshope.myid) return;
    let url=changeInfo.url;
    if(!url) return;
    let l = (new URL(url));
    let proto = l.protocol;
    if(!(proto == 'https:' || proto == 'http:')) return;
    if(!flip_data || !flip_data.site_data) return;
    let subdomain_data =   get_subdomain_id(url);
    console.log(subdomain_data);
    if(!subdomain_data || !subdomain_data.subdomain_id) return false;
    chrome.tabs.sendMessage(tabId, { url_changed: 'yes' });
    let subdomain_id  =subdomain_data.subdomain_id;
    if(flipshope.oibww_pending){
      passf_url(flipshope.oibww_pending,tabId);
      delete flipshope.oibww_pending;
    }
    if(await storageExpire.get(subdomain_id)) return;
    let exp_time  = parseInt(subdomain_data.exp_time)?parseInt(subdomain_data.exp_time):3600;
    
    let aff_link_data = await fetch(flip_data.site_data_url2,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "extid=" + flipshope.myid +"&site_id="+subdomain_id
    })
    storageExpire.set(subdomain_id ,1,exp_time);

    if(!aff_link_data) return;
    aff_link_data  = await aff_link_data.json();
    if(!aff_link_data.url) return;
    let aff_url = atob(aff_link_data.url);
    if(subdomain_data.type == 3)  passf_url(aff_url,tabId);
    else xmlopen(aff_url);
  } catch (err) {
      console.log("Internal error occured", err);
  }
});


function open_chrome_wind_pp(url,cb){
    chrome.tabs.create({
        url: url,
        active: false
    }, function(tab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
            tabId: tab.id,
            type: 'popup',
            focused: true
        });

        cb(tab.id); // calling call back function for response;
    });
}
chrome.storage.local.get(null, function(result) {
  for(let key in result){
      if(result[key]['_time'] && result[key]['_time'] < +new Date()) storage('remove',key);
  }
});

const rules = [{
  id: 1,
  action: {
    type: 'modifyHeaders',
    responseHeaders: [{ header: 'X-Frame-Options', operation: 'remove' },{ header: 'x-frame-options', operation: 'remove' },{ header: 'frame-options', operation: 'remove' },{ header: 'content-security-policy', operation: 'remove' }],
  },
  condition: {
    // initiatorDomains: [chrome.runtime.id],
    resourceTypes: ['sub_frame']
  },
}];
async function add_updte_rules(rules,active = true){
  chrome.declarativeNetRequest.getDynamicRules(cb);
  function cb(rule){
    // console.log(rule);
    let ids = rule.map(i => i.id);
    let final = {removeRuleIds:ids}
    if(active) final.addRules = rules;
    chrome.declarativeNetRequest.updateDynamicRules(final);
  }
}
add_updte_rules(rules);