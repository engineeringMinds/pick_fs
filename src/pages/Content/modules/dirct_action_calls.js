console.log('hello from dircet action calls');
//import {ext_main_temp_struc,all_stores_temp,store_contr_all_str} from './templates.js';
import {
  render_my_temp,
  click_event_listeners,
  makSidePop,
  handle_clickrendvar,
  make_add_str_pop,
  set_popup_vars,
  close_modl_fucn
} from './rendering_func.js';
import jQuery from 'jquery';

let global_auth_var, grabbable;
let ext_ID = chrome.runtime.id;
// let $s = jQuery.noConflict();
// let global_store_detail_var,iscart,is_home,url_srchd = new URL(window.location.href);

// if(url_srchd.pathname == '/') is_home = true;

// chrome.runtime.onMessage.addListener(function(req){
//     console.log('inside on message dirct act call...',req);
//     if(req && req.type){
//         console.log("req of on message",req.msg);
//         if(!grabbable)
//         if(req.type == 'browser_action'){
//           global_store_detail_var
//         };

//         if(req.type == 'fetch_avail_stores_store_not_avail'){
//           if(!window.popup_type) window.popup_type = 'add_store_popup';
//           console.log("store not available");
//           render_my_temp({type:"add_store_popup",data:""});
//         };
//         if(req.type == 'updated_tab_data'){
//           global_store_detail_var = req.msg;
//           if(!window.popup_type) window.popup_type = 'whish_list';
//           render_my_temp({type:window.popup_type,data:req.msg});
//         }
//         // if(global_store_detail_var&&!global_store_detail_var.is_cart&&!global_store_detail_var.p_id)render_my_temp({type:"whish_list",data:req.msg});
//         // if(global_store_detail_var&&global_store_detail_var.p_id) render_my_temp({type:"Price_alert_page",data:req.msg});
//         // if(global_store_detail_var&&global_store_detail_var.is_cart)render_my_temp({type:"auto_apply_popup",data:""});
//         // responseToSend({msg:"message recieved"});
//     }
//     return true;
// });

chrome.runtime.sendMessage({
  dataMSg: { msg: 'new_page', data: window.location.href },
});


chrome.runtime.onMessage.addListener(function(req,sender,resp){
  console.log('inside on message dirct act call...',req);
  if(req && req.msg && req.type && req.type == 'fetch_avail_stores_resp'){
    if(req.storeData&&req.storeData.msg){
      if (req.storeData.msg == 'temp_str_blk_list')
        handle_clickrendvar('set', 'curr_pg', 'blk_lst');
      if (req.storeData.msg == 'fetch_avail_stores_store_not_avail')
        handle_clickrendvar('set', 'curr_pg', 'not_supp');
      if (req.storeData.msg == 'fetch_avail_stores') {
        handle_clickrendvar('set', 'curr_pg', 'avl_str');
        makSidePop('check_curr_pg', true);
      }
      resp(true);
    }
  }
});
        
// // ****************** MUTATION OBSEVER **************************

// var target = document.body;

// // create an observer instance
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     console.log('mutation obs global_store_detail_var:',global_store_detail_var);
//     if((global_store_detail_var&&global_store_detail_var.storeData)&&mutation.target.baseURI.includes(global_store_detail_var.storeData.store_url)){
//        (!global_store_detail_var.is_cart)&&(iscart = cart_mutation(global_store_detail_var.storeData.store_name));
//         console.log('iscart',iscart,'is_home',is_home);
//     }
//   });
// });

// // configuration of the observer:
// var config = { attributes: true, childList: true, characterData: true };

// // pass in the target node, as well as the observer options
// observer.observe(target, config);

// // later, you can stop observing
// // observer.disconnect();

// // ****************** MUTATION OBSEVER **************************

// function cart_mutation(store_name=''){
//     let is_cart = false,cart_selector;
//     switch(store_name){
//         case 'Pepperfry':
//             cart_selector = target.querySelector('.mini_cart');
//             is_cart = cart_selector.getAttribute('class').includes('active');
//         break;
//         case '':
//         break;
//         default: is_cart = false;
//     }
//     return is_cart;
// }

(function create_html_wrapper() {
  let fs_div_all_element = document.querySelector('#fs_div_all');
  if (fs_div_all_element) fs_div_all_element.remove();

  let add_ss = ` /* devanagari */
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 100;
      src: url(chrome-extension://${ext_ID}/assets/poppins/v20/pxiGyp8kv8JHgFVrLPTucXtAKPY.woff2) format('woff2');
      unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }
    /* latin-ext */
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 100;
      src: url(chrome-extension://${ext_ID}/assets/poppins/v20/pxiGyp8kv8JHgFVrLPTufntAKPY.woff2) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 100;
      src: url(chrome-extension://${ext_ID}/assets/poppins/v20/pxiGyp8kv8JHgFVrLPTucHtA.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* devanagari */
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      src: url(chrome-extension://${ext_ID}/assets/poppins/v20/pxiByp8kv8JHgFVrLGT9Z11lFc-K.woff2) format('woff2');
      unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }
    /* latin-ext */
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      src: url(chrome-extension://${ext_ID}/assets/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      src: url(chrome-extension://${ext_ID}/assets/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* poppins light */
    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        src: url(chrome-extension://${ext_ID}/assets/poppins/poppinsOthers/Poppins-Light.ttf) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

    /* poppins regular */
    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        src: url(chrome-extension://${ext_ID}/assets/poppins/poppinsOthers/Poppins-Regular.ttf) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* poppins thin */
    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 100;
        src: url(chrome-extension://${ext_ID}/assets/poppins/poppinsOthers/Poppins-Thin.ttf) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* poppins medium */
    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        src: url(chrome-extension://${ext_ID}/assets/poppins/poppinsOthers/Poppins-Medium.ttf) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* poppins semi bold */
    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        src: url(chrome-extension://${ext_ID}/assets/poppins/poppinsOthers/Poppins-SemiBold.ttf) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* poppins bold */
    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        src: url(chrome-extension://${ext_ID}/assets/poppins/poppinsOthers/Poppins-Bold.ttf) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    `;
  var style = document.createElement('style');
  style.innerHTML = add_ss;
  document.head.appendChild(style); // ********** APPEND LINK TO HEAD TAG *********

  const shadowContainer = document.createElement('div');

  shadowContainer.setAttribute('id', 'fs_div_all');
  shadowContainer.setAttribute('style', `all:initial;`);
  shadowContainer.attachShadow({ mode: 'open' });
  document.body.appendChild(shadowContainer);

  shadowContainer.shadowRoot.innerHTML = `
        <div class="mainExtCont" style="position:fixed; top:20px;right:20px; z-index:2147483647;box-shadow: 1px -1px 17px #888888;border-radius:10px;">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap" rel="stylesheet">
            <div class="mainExtSubCont"></div>
        </div>
        <div class="extOtherPopups"></div>
        <style>
        ${add_ss}
        .extOtherPopups{
          margin: 0;
          padding: 0;
          position: fixed;
          top: 240px;
          right: 0;
          z-index: 2147483647;
        }
        [event_type="click"]{
          cursor:pointer;
        }
        </style>
        `;

  // var navObj = {
  //     home:false,notif:false,wallet:false,store:false
  // }
  // grabbable = $s(shadowContainer.shadowRoot).find(':first')[0];
  console.log(1,'----------------------------------')
  set_popup_vars();
  click_event_listeners(shadowContainer, ext_ID, '');
})();

export async function check_web_page() {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage(
      { dataMSg: { msg: 'fetch_avail_stores', data: window.location.href } },
      (resp) => {
        console.log(
          'sendMesasge resp direct act call..',
          window.location.href,
          resp
        );
        // <-- code of not supported store -->
        let not_sup_str = 'fetch_avail_stores_store_not_avail',
          blk_list_str = 'temp_str_blk_list',
          avail_store_str = 'fetch_avail_stores';
        if (resp) {
          if (resp.data.msg == blk_list_str)
            handle_clickrendvar('set', 'curr_pg', 'blk_lst');
          if (resp.data.msg == not_sup_str)
            handle_clickrendvar('set', 'curr_pg', 'not_supp');
          if (resp.data.msg == avail_store_str) {
            handle_clickrendvar('set', 'curr_pg', 'avl_str');
            makSidePop('check_curr_pg', true);
          }
        }
        // <-- code of not supported store -->

        res(true);
      }
    );
  });
}
// check_web_page();
