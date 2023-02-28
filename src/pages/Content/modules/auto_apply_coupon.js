import { get_price, get_currency, timeout } from '../../require/require.js';
import {
  $s,
  url,
  site,
  getCookie,
  setCookie,
} from '../../require/require_cs.js';

const exactMath = require('exact-math');

import {
  rend_aac_popup,
  close_acc_popup,
  main_ext_no_scroll,
  rend_cpn_procssng_popup,
  aac_procssng_pp_animtn,
  rend_succs_aac_popup,
  rend_manual_cpns_temp_pp,
  rend_no_working_counpon,
  rend_applying_final_counpon,
  rend_coupons_not_found_pp,
  close_extpop,
} from './rendering_func.js';

let metadata,
  observer,
  coupons,
  apply_data = { code_data: [], no: 0 },
  code = metadata,
  AppliedCoupon;
let ini_total = 0,
  total,
  cou_i = 0,
  max_coupons = 8;
let currency;

chrome.runtime.onMessage.addListener(function (request, sender) {
  console.log('auto_apply_coupon on-message listener...', request);
  if (request && request.type && request.type =="fetch_avail_stores_resp" && request.storeData && request.storeData.data) {
    let data = request.storeData.data;
    let full_data = data;
    let id = full_data.metadata['id'];
    console.log('aac on-message site var...', {
      site: site,
      full_data: full_data,
      id: id,
    });
    metadata = full_data['metadata'];
    // coupons = full_data['coupons']['coupons'];
    coupons = array_column(
      full_data['coupons']['coupons'].slice(0, max_coupons),
      'code'
    ).filter(onlyUnique);
    ini_total = full_data['coupons']['coupons'].length;
    // addcouponbar(full_data['coupons'],id);
    if (
      metadata['pns_siteSelApplyButton'] &&
      metadata['pns_siteSelCartCodeBox']
    )
      getAppliedCoupon();
    if (metadata && metadata['pns_siteSelCartTotalPrice'])
      addpp_mo([
        metadata['pns_siteSelCartInitCode'],
        metadata['pns_siteSelCartTotalPrice'],
      ]);

    // add_aa_popup(full_data['coupons']['coupons'], full_data['coupons']['total_coupons'], 0 );
    // if (is_cou_page(site, metadata['coupon_url_match']) && coupons) { add_aa_popup(full_data['coupons']['coupons'], full_data['coupons']['total_coupons'], 0 ); }
  }
});
export function close_cpn_procssng_popup_box(a = 0) {
  close_extpop('', '.aac_prcssng_mn',1);
  if (a) sendanalytics('auto_apply', 'popup_close_2');
  clearstorage();
}

// console.log(exactMath.sub(2.01, 1));
// console.log('coupon.js');
// $s("body").on("click", ".fsautoclose", function() { remove_aa_box(1); });
// $s("body").on("click", "#fs_popup_close", function() { sendanalytics('auto_apply', 'popup_close_1'); remove_aa_popup(); });

window.addEventListener('message', receiveMessage, false);

var isValidSelector = function (selector) {
  if (typeof selector !== 'string') {
    return false;
  }
  try {
    var $element = $s(selector);
  } catch (error) {
    return false;
  }
  return true;
};

const array_column = (array, column) => array.map((e) => e[column]);
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var temp = 0; temp < length; temp++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let execTopFrameJS = function (e, o) {
  var t = this,
    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4;
  var s = document.createElement('script');
  s.textContent =
    `javascript:(
        function () {
          var value = null;
          try {
            val = (function(){` +
    e +
    `}());
            x = {value: val};
          } catch(e) {
            e.error = true;
            x = { error: JSON.stringify(['message', 'name', 'error'])};
          }
          var event = new CustomEvent('` +
    o +
    `', {detail: x} );
          document.dispatchEvent(event);
        }()
      )`;
  var l = void 0;
  var c = document.head || document.documentElement;
  c.appendChild(s);
};

function receiveMessage(error) {
  if (
    error &&
    error.data &&
    error.data.fs &&
    error.data.fs.message &&
    error.data.in
  )
    senderror(error.data.in, error.data.fs.message);
}

export function isCartPage() {
  if (
    !$s(metadata['pns_siteSelCartInitCode']).length ||
    !$s(metadata['pns_siteSelCartTotalPrice']).length ||
    !get_price($s(metadata['pns_siteSelCartTotalPrice']).text())
  )
    return false;
  return coupons;
}

function addpp_mo(eles) {
  console.log(eles);
  observer = new MutationObserver(function (mutations) {
    for (var temp = eles.length - 1; temp >= 0; temp--) {
      // console.log(eles[temp], $s(eles[temp]), $s(eles[temp]).length);
      if (!$s(eles[temp]) || !$s(eles[temp]).length) return;
    }
    if (!get_price($s(metadata['pns_siteSelCartTotalPrice']).text())) return;
    console.log('add_popup');
    sendanalytics('auto_apply', 'price_inp_found');
    add_aa_popup();
    observer.disconnect();
    rmvpp_mo(eles);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function rmvpp_mo(eles) {
  observer = new MutationObserver(function (mutations) {
    var elefound = 1;
    for (var temp = eles.length - 1; temp >= 0; temp--) {
      if (!$s(eles[temp]) || !$s(eles[temp]).length) elefound = 0;
    }
    if (elefound) return;
    console.log('remove_popup');
    close_acc_popup();
    observer.disconnect();
    addpp_mo(eles);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

async function sendanalytics(type, event = '') {
  chrome.runtime.sendMessage({
    dataMSg:{
      msg: 'analytics',
      data:{
        action:'analytics',
        id: 'analytics_'+site+type+event,
        site: site,
        type: type,
        event: event,
      }
    }
  });
}

async function senderror(errorin, error = '') {
  chrome.runtime.sendMessage({
    dataMSg:{
      msg: 'analytics',
      data:{
        action:'error',
        id: 'error_'+site+errorin+error,
        site: site,
        errorin: errorin,
        errormsg: error,
      }
    }
  });
}

/** Get coupons appled by user **/
function getAppliedCoupon() {
  if (AppliedCoupon) return;
  AppliedCoupon = 1;
  console.log('getAppliedCoupon');
  sendanalytics('get_user_coupons', 'inputs_found');
  let input_box = metadata.pns_siteSelCartCodeBox.split(',');
  $s('body').on('click', metadata['pns_siteSelApplyButton'], function () {
    console.log('pns_siteSelApplyButton clicked');
    sendanalytics('get_user_coupons', 'coupon_applied');
    let appliedCoupon = $s(metadata['pns_siteSelCartCodeBox']).val();
    if (appliedCoupon && !coupons.includes(appliedCoupon)) {
      console.log(appliedCoupon);
      chrome.runtime.sendMessage({
        dataMSg:{
          msg: 'analytics',
          data:{
            id: 'appliedcoupon_'+site+appliedCoupon,
            action:'appliedcoupon',
            site: site,
            coupon: appliedCoupon,
          }
        }
      });
    }
  });
}

function clearstorage() {
  setCookie('fsapplycou', 1, -1000);
  setCookie('fsnotapplycou', 1, 0.2);
  localStorage.removeItem('apply_data');
}

export function set_aac_storage(type) {
  if ((type = 'popup_close_1')) {
    sendanalytics('auto_apply', 'popup_close_1');
    setCookie('fs_aacpp_ws', 1, 60);
  }
  if ((type = 'start_button_click')) {
    sendanalytics('auto_apply', 'start_button_click');
    setCookie('fs_aacpp_ws', 1, 60);
  }
}

//  async function add_aa_popup_old() {
//     try{

//         console.log('inside add_aa_popup....');

//         let number = coupons.length;
//         let start_price = get_price( $s(metadata['pns_siteSelCartTotalPrice']).text());

//         if(!currency) currency = get_currency($s(metadata['pns_siteSelCartTotalPrice']).text());
//         console.log($s(metadata['pns_siteSelCartTotalPrice']));
//         console.log(start_price);
//         // sendanalytics('auto_apply','remove_aa_popup');
//         // console.log('add_aa_popup');

//         if(getCookie('fsapplycou')){
//             console.log('cookie found');
//             sendanalytics('auto_apply','continue_aa');
//             startautoapply();
//         }
//         if(coupons.length){
//             sendanalytics('auto_apply', 'popup_shown_1');

//             // if(getCookie('fs_aacpp_ws')){
//             //     aac_btn = addshadow('fs_popup_container');
//             //     aac_btn.innerHTML = Auto_apply_btn_temp;
//             //     aac_btn.querySelector('#aac-sidebtn').onclick =  function() {
//             //         console.log(1);
//             //         $s('#fs_popup_container').remove();
//             //         show_this();
//             //     }
//             // }
//             // else show_this()
//             // function show_this(){

//             // let aac_btn = addshadow('fs_popup_container');
//             // var autocou = aac_popup_temp(coupons.length);

//             // remove_aa_popup();
//             // let p_ele = addshadow('fs_popup_container');
//             // p_ele.innerHTML = autocou;
//             if(getCookie('fs_aacpp_ws')){
//                 // $s(p_ele).find('#aac-sidebtn').show();
//                 // $s(p_ele).find('#flipshope_autopopoup_container-wrapper').hide();
//                 return {is_cart:true,is_side_btn:true,is_cpns:{c:coupons}};
//             }
//                 // if(getCookie('fs_aacpp_ws')){
//                 //     $s('#fs_popup_container').hide();
//                 //     aac_btn = addshadow('fs_Auto_apply_btn');
//                 //     aac_btn.innerHTML = Auto_apply_btn_temp;
//                 //     aac_btn.querySelector('#aac-sidebtn').onclick =  function() {
//                 //         $s('#fs_Auto_apply_btn').remove();
//                 //         $s('#fs_popup_container').show(400);
//                 //     }
//                 // }

//                 // <--- click selectors -->

//                         // p_ele.querySelector('#flipshope_autopopoup-savings').onclick =  function() {
//                         //     sendanalytics('auto_apply', 'start_button_click');
//                         //     setCookie('fs_aacpp_ws', 1, 60);
//                         //     startautoapply(coupons);
//                         // }
//                         // $s(p_ele).find('#flipshope_autopopoup-close-top,#flipshope_autopopoup-close').click(
//                         //     function(){
//                         //         sendanalytics('auto_apply', 'popup_close_1');
//                         //         setCookie('fs_aacpp_ws', 1, 60);
//                         //         $s(p_ele).find('#aac-sidebtn').show(500);
//                         //         $s(p_ele).find('#flipshope_autopopoup_container-wrapper').hide();
//                         //         // remove_aa_popup();
//                         // });

//                         // p_ele.querySelector('#aac-sidebtn').onclick =  function() {
//                         //     console.log(1);
//                         //     sendanalytics('auto_apply', 'popup_shown_1_side_btn');
//                         //     $s(p_ele).find('#aac-sidebtn').hide();
//                         //     $s(p_ele).find('#flipshope_autopopoup_container-wrapper').show(500);
//                         // }

//                 // <--- click selectors -->

//             // p_ele.querySelector('#flipshope_autopopoup-close-top').onclick =  function() {
//             //     sendanalytics('auto_apply', 'popup_close_1');
//             //     setCookie('fs_aacpp_ws', 1, 60);
//             //     remove_aa_popup();
//             // }
//             // p_ele.querySelector('#flipshope_autopopoup-close').onclick =  function() {
//             //     sendanalytics('auto_apply', 'popup_close_1');
//             //     setCookie('fs_aacpp_ws', 1, 60);
//             //     remove_aa_popup();
//             // }
//             // }
//             main_ext_no_scroll();
//             rend_aac_popup(coupons);
//             return {is_cart:true,is_side_btn:false,is_cpns:{c:coupons}};
//         }
//         else if(getCookie('fs_aacpp_ws')) return {is_cart:true,is_side_btn:true,is_cpns:false};
//         else{
//             sendanalytics('auto_apply', 'popup_shown_coupon_nf');
//             var autocou = stringTemplateParser(auto_side_popup_nf_temp,{homeurl:homeurl});
//             remove_aa_popup();
//             let p_ele = addshadow('fs_popup_container');
//             p_ele.innerHTML = autocou;
//             p_ele.querySelectorAll('#flipshope_autopopoup-close-nf,#flipshope_autopopoup-close-top,#flipshope_autopopoup-hv-coupon').forEach(function(ele){
//                 ele.onclick = function() {
//                     sendanalytics('auto_apply', 'popup_close_nf');
//                     setCookie('fs_aacpp_ws', 1, 60);
//                     remove_aa_popup();
//                 }
//             });
//             return {is_cart:true,is_side_btn:false,is_cpns:false};
//         }
//     }
//     catch (err) {
//         console.log(err); senderror("add_aa_popup", err);
//         return false;
//      }
// }
async function add_aa_popup() {
  try {
    console.log('inside add_aa_popup....');

    let start_price = get_price(
      $s(metadata['pns_siteSelCartTotalPrice']).text()
    );
    if (!currency)
      currency = get_currency($s(metadata['pns_siteSelCartTotalPrice']).text());
    console.log($s(metadata['pns_siteSelCartTotalPrice']));
    console.log(start_price);

    // sendanalytics('auto_apply','remove_aa_popup');
    // console.log('add_aa_popup');

    if (getCookie('fsapplycou')) {
      console.log('cookie found');
      sendanalytics('auto_apply', 'continue_aa');
      startautoapply();
    }
    if (coupons.length) {
      sendanalytics('auto_apply', 'popup_shown_1');
      if (getCookie('fs_aacpp_ws')) {
        return { is_cart: true, is_side_btn: true, is_cpns: { c: coupons } };
      }
      main_ext_no_scroll();
      rend_aac_popup(coupons);
      return { is_cart: true, is_side_btn: false, is_cpns: { c: coupons } };
    } else if (getCookie('fs_aacpp_ws'))
      return { is_cart: true, is_side_btn: true, is_cpns: false };
    else {
      console.log('coupons_not_found_pp found');
      sendanalytics('auto_apply', 'popup_shown_coupon_nf');
      rend_coupons_not_found_pp();
      return { is_cart: true, is_side_btn: false, is_cpns: false };
    }
  } catch (err) {
    console.log(err);
    senderror('add_aa_popup', err);
    return false;
  }
}

export function startautoapply() {
  try {
    close_acc_popup(); // remove_aa_popup();
    // observer.disconnect();
    total = coupons.length;
    cou_i = 0;

    if (cou_i > total) return;

    // <-- appending to main wrapper -->

    rend_cpn_procssng_popup(coupons);

    // var coupon_popup = cpn_processing_temp();
    // aacshadow = addshadow('fullautopopup');
    // aacshadow.innerHTML = coupon_popup;

    // <-- appending to main wrapper -->

    // $s(aacshadow.querySelector('.fsautoclose')).click(function() { remove_aa_box(1); }); // <-- adding clicking listener to close aac processing -->
    // makemoveable(aacshadow.querySelector('#fs-container-wrapper'), aacshadow.querySelector('#moveheader')); // <-- adding adding droppable to aac_processing -->

    // <-- adding escape btn listener closing on esc btn click -->

    $s(document).keydown(function (event) {
      if (event.keyCode == 27) {
        close_cpn_procssng_popup_box(1);
      }
    });

    // <-- adding escape btn listener closing on esc btn click -->

    apply_data = { code_data: [], no: 0 };
    code = metadata;
    if (getCookie('fsapplycou')) {
      apply_data = JSON.parse(localStorage['apply_data']);
      cou_i = apply_data['no'];
      if (localStorage['apply_data_min_1'] == 1) {
        cou_i = cou_i - 1;
        localStorage['apply_data_min_1'] = 0;
      }
      console.log('start aac cou_i........', cou_i);
    } else
      apply_data['start_price'] = get_price(
        $s(metadata['pns_siteSelCartTotalPrice']).text()
      );
    applyindi();
  } catch (err) {
    console.log(err);
    senderror('auto_apply_code_start', err);
  }
}

function input(ele, value) {
  ele.value = value;
  ele.dispatchEvent(new Event('input', { bubbles: true }));
  ele.dispatchEvent(new Event('keyup'));
  ele.dispatchEvent(new Event('blur'));
  ele.dispatchEvent(new Event('focus'));
}

async function applyindi() {
  console.log(apply_data);
  console.log(total);
  try {
    console.log('apply_indi cou_i......11111', cou_i);
    console.log('apply_indi total......11111', total);
    if (cou_i) {
      try {
        let data = await get_dis();
        console.log(data);
        if (data['total_dis'] > 0)
          $s.extend(
            apply_data['code_data'][apply_data['code_data'].length - 1],
            data
          );
        else
          apply_data['code_data'].splice(apply_data['code_data'].length - 1, 1);
        console.log('apply_indi apply_data if cou_i then block', apply_data);
      } catch (error) {
        apply_data['code_data'].splice(apply_data['code_data'].length - 1, 1);
        console.log('apply_indi apply_data if cou_i catch block', error);
        senderror('auto_apply_code', error);
      }
    } else {
      console.log('apply_indi apply_data else cou_i  block');
      sendanalytics('auto_apply', 'applying_first_coupon');
    }
    if (!(cou_i < total)) {
      console.log('apply_indi apply_data !(cou_i < total)  block');
      sendanalytics('auto_apply', 'all_coupons_applied');
      clearstorage();
      close_cpn_procssng_popup_box();
      return select_code(apply_data);
    }
    if (!getCookie('fsnotapplycou')) {
      console.log('this is !getCookie if..........');
      setCookie('fsapplycou', 1, 2);
    }
    // if (!$s('#fullautopopup').length) return 0;
    console.log('paassingf all if and else apply_indi....');
    var coupon = coupons[cou_i];
    console.log(coupon, coupons, '------coupon');
    apply_data['code_data'][apply_data['code_data'].length] = { code: coupon };
    cou_i = cou_i + 1;
    apply_data['no'] = cou_i;
    console.log(cou_i);
    localStorage['apply_data'] = JSON.stringify(apply_data);
    var percent = (cou_i * 100) / total + '%';
    aac_procssng_pp_animtn(cou_i - 1);

    // <-- updating  coupons value to aac processing popup -->

    // aacshadow.querySelector('#fsautocoupcode').innerText = coupon;
    // aacshadow.querySelector('#fscouprog').innerText = cou_i;
    // aacshadow.querySelector('#fsautoprogbar').style.width = percent;

    // <-- updating  coupons value to aac processing popup -->

    // console.log('total');
    // console.log(code_data, site);
    // console.log('promise about to start');
    console.log('this is indi_coupon....1211111', coupon);

    let referesh = await applycoupon(coupon);
    if (referesh == 1) applyindi();
  } catch (err) {
    console.log(err);
    senderror('auto_apply_code_applyindi', err);
  }
}

async function get_dis() {
  return Promise.resolve('foo').then(() => {
    return new Promise(function (resolve, reject) {
      // console.log(inp);
      // console.log('in pns_siteSelCartTotalPrice ');
      let finalprice = code.pns_siteSelCartTotalPrice; //.split(',');
      // // console.log(finalprice);
      if ($s(finalprice) && $s(finalprice).length) {
        // console.log($s(finalprice).text());
        let new_price = get_price($s(finalprice).text());
        let discount = exactMath.sub(apply_data['start_price'], new_price);
        let cashback = 0;
        let total_dis = exactMath.add(cashback, discount);
        // $s('#fstotalsav').show();
        // $s('#fstotalsavrs').text("Price: " + $s(finalprice).text());
        // console.log(apply_data);
        return resolve({
          discount: discount,
          cashback: cashback,
          total_dis: total_dis,
        });
      }
      reject('getdis:price_err');
    });
  });
}

async function applycoupon(coupon) {
  try {
    if (code.pns_sitePreApplyCodeAction) {
      console.log('applying pre action');
      call_code(
        'try{' +
          code.pns_sitePreApplyCodeAction +
          '} catch(err) { window.postMessage({"in":"sitePreApplyCodeAction" , "fs":err}); }'
      );
    }
    if (code.pns_siteRemoveCodeAction) {
      call_code(
        'try{' +
          code.pns_siteRemoveCodeAction +
          '} catch(err) { window.postMessage({"in":"iteRemoveCodeAction " , "fs":err}); }'
      );
    }
    if (
      code.pns_siteBreakAfterRemove &&
      $s(code.pns_siteBreakAfterRemove) &&
      $s(code.pns_siteBreakAfterRemove).length
    ) {
      console.log('pns_siteBreakAfterRemove');
      return (localStorage['apply_data_min_1'] = 1);
    }
    await timeout(code.pns_siteTimeBetweenPreApply || 0);

    console.log('in pns_siteSelCartCodeBox ');
    let inputa = code.pns_siteSelCartCodeBox.split(','),
      inp;
    for (let j = 0; j < inputa.length; j++) {
      console.log(inputa[j]);
      if (document.querySelector(inputa[j])) {
        inp = inputa[j];
      }
    }
    if (!inp) throw new Error('input_ele_not_found');
    input(document.querySelector(inp), coupon);
    console.log('in code apply ');
    if (isValidSelector(code.pns_siteSelCartCodeSubmit))
      $s(code.pns_siteSelCartCodeSubmit).click();
    else
      call_code(
        'try{' +
          code.pns_siteSelCartCodeSubmit +
          '} catch(err) { window.postMessage({"in":"siteSelCartCodeSubmit" , "fs":err}); }'
      );
    console.log('in pns_siteTimeBetweenRemove ');
    if (code.pns_siteTimeBetweenRemove) {
      await timeout(code.pns_siteTimeBetweenRemove || 0);
      return 1;
    }
    return 0;
  } catch (error) {
    console.log('error', error);
    senderror('auto_apply_code', error);
  }
  // return Promise.resolve('foo')
  // .then( () =>{
  //     console.log('promise started');
  //     return new Promise(function(resolve, reject) {
  //         if (code.pns_sitePreApplyCodeAction) {
  //             console.log('applying pre action');
  //             call_code("try{" + code.pns_sitePreApplyCodeAction + '} catch(err) { window.postMessage({"in":"sitePreApplyCodeAction" , "fs":err}); }');
  //         }
  //         resolve(1);
  //     });
  // })
  // .then(() =>{

  //     return new Promise(function(resolve, reject) {
  //         // reject('meri marji');
  //         console.log('in pns_siteRemoveCodeAction ');
  //         if (code.pns_siteRemoveCodeAction){
  //             call_code("try{" + code.pns_siteRemoveCodeAction + '} catch(err) { window.postMessage({"in":"iteRemoveCodeAction " , "fs":err}); }');
  //         }
  //         if (!code.pns_siteBreakAfterRemove || !$s(code.pns_siteBreakAfterRemove) || !$s(code.pns_siteBreakAfterRemove).length ) {
  //             console.log('no pns_siteBreakAfterRemove');
  //             resolve(1);
  //         }
  //         else{
  //             console.log('pns_siteBreakAfterRemove');
  //             localStorage['apply_data_min_1'] = 1;
  //         }
  //     });
  // })
  // .then(() =>{
  //     return new Promise(function(resolve, reject) {
  //         console.log('in pns_siteTimeBetweenPreApply ');
  //         if (code.pns_siteTimeBetweenPreApply) return setTimeout(()=>{resolve(1);},code.pns_siteTimeBetweenPreApply);
  //         resolve(1);
  //     });
  // })
  // .then(() =>{
  //     return new Promise(function(resolve, reject) {
  //         console.log('in pns_siteSelCartCodeBox ');
  //         let inputa = code.pns_siteSelCartCodeBox.split(',');
  //         for (let j = 0; j < inputa.length; j++) {
  //             console.log(inputa[j]);
  //             if (document.querySelector(inputa[j])){
  //                 resolve(inputa[j]);
  //             }
  //         }
  //         reject('input_ele_not_found');
  //     });
  // })
  // .then((inp) =>{
  //     // $s(inp).val(coupon);
  //     input(document.querySelector(inp), coupon);
  //     return new Promise(function(resolve, reject) {
  //         console.log('in code apply ');
  //         if(isValidSelector(code.pns_siteSelCartCodeSubmit) ) $s(code.pns_siteSelCartCodeSubmit).click();
  //         else call_code("try{" + code.pns_siteSelCartCodeSubmit + '} catch(err) { window.postMessage({"in":"siteSelCartCodeSubmit" , "fs":err}); }');
  //         resolve(1);
  //     });
  // })
  // .then(() =>{
  //     return new Promise(function(resolve, reject) {
  //         console.log('in pns_siteTimeBetweenRemove ');
  //         if (parseInt(code.pns_siteTimeBetweenRemove)){
  //             // console.log('inside 2nd started')
  //             return setTimeout(()=>{
  //                 // console.log('inside 2nd ended');
  //                 resolve(1);
  //             },code.pns_siteTimeBetweenRemove);
  //         }
  //         else resolve(0);
  //     });
  // })
  // .catch(function(error) {
  //     console.log('error');
  //     console.log(error);
  //     senderror('auto_apply_code', error);
  // });
}

export function select_final_coupon(code) {
  if (!code || !apply_data || !apply_data.code_data) return;
  for (let i = 0; i < apply_data.code_data.length; i++) {
    let c_data = apply_data.code_data[i];
    console.log(c_data, code);
    if (c_data['code'] == code) return apply_final_code(c_data);
  }
}

function select_code(apply_data) {
  if (apply_data && apply_data['code_data'] && apply_data['code_data'].length) {
    sendanalytics('auto_apply', 'coupons_are_working');
    var c_data = apply_data['code_data'];
    console.log(c_data);

    // var table_row = '';
    for (var tempi = 0; tempi < c_data.length; tempi++) {
      c_data[tempi]['start_price'] = apply_data['start_price'];
      // c_data[tempi]['tempi'] = tempi;
      // table_row += stringTemplateParser(apply_select_box_table_temp,{...c_data[tempi],homeurl});
      // '<tr><td>'+c_data[tempi]['code']+'</td><td>'+c_data[tempi]['discount']+'</td><td>'+c_data[tempi]['cashback']+'</td><td>'+c_data[tempi]['total_dis']+'</td><td><button class="fs_app_c" data-couponno='+tempi+'> Apply </button></td></tr>'
    }
    chrome.runtime.sendMessage({
      dataMSg:{
        msg: 'analytics',
        data:{
          action:'workingCoupon',
          site: site,
          data: JSON.stringify(c_data)
        }
      }
    });
    if (c_data.length == 1) return apply_final_code(c_data[0]);
    rend_manual_cpns_temp_pp(c_data);
    // aacshadow.querySelector('#aac_content').innerHTML = stringTemplateParser(apply_select_box_temp,{homeurl:homeurl, table_tr: table_row});
    sendanalytics('auto_apply', 'select_coupon_pp_shown');
    // '<style>#fsautofullcont{ padding:10px; } table{font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td, th{border: 1px solid #dddddd; text-align: left; padding: 8px;}tr:nth-child(even){background-color: #dddddd;}</style></head><body><h2>Available Coupons for your cart</h2><table> <tr> <th>Code</th> <th>Discount</th> <th>Cashback</th> <th>Total</th> <th></th> </tr>'+table_row+'</table>';
    // $s(aacshadow.querySelectorAll(".scb-apply-btn")).click(function() { apply_final_code(c_data[$s(this).data('couponno')]); });
  } else {
    console.log('no working coupon');
    sendanalytics('auto_apply', 'no_coupons_are_working');
    chrome.runtime.sendMessage({
      dataMSg:{
        msg: 'analytics',
        data:{
          id: 'nonworkingCoupon_'+site,
          action:'nonworkingCoupon',
          site: site
        }
      }
    });
    // obj = auto_centr_box_cnw_lft_list[getRandomArbitrary(0, auto_centr_box_cnw_lft_list.length)];
    // obj['myid'] = myid;

    rend_no_working_counpon({ extra_cpn: ini_total - total });
    // obj.homeurl = homeurl;
    // aacshadow.querySelector('#aac_content').innerHTML = stringTemplateParser(auto_centr_box_cnw_temp,{...obj,homeurl});
    // aacshadow.querySelectorAll('#cnw-r-btn,#cnw-l-rep').forEach(function(ele){
    //     ele.onclick = function() { remove_aa_box(1); }
    // });
  }
}
function apply_final_code(data) {
  console.log(data['code']);
  // var code = metadata;
  // console.log(code);
  sendanalytics('auto_apply', 'final_code_applied');
  rend_applying_final_counpon();
  // aacshadow.querySelector('#aac_content').innerHTML = stringTemplateParser(auto_centr_box_final_code_temp,{homeurl:homeurl});
  // aacshadow.querySelector('.fsautoclose').onclick = function(){remove_aa_box(1); };

  data['final_price'] = exactMath.sub(data['start_price'], data['total_dis']);

  if (currency && currency.symbol) data['currency_symbol'] = currency.symbol;
  else if (code['pns_currency']) data['currency_symbol'] = code['pns_currency'];
  else data['currency_symbol'] = '₹';

  applycoupon(data['code']).then(() => {
    // data['myid'] = myid;
    chrome.runtime.sendMessage({
      dataMSg:{
        msg: 'analytics',
        data:{
          action:'finalCoupon',
          site: site,
          data: JSON.stringify(data),
        }
      }
    });
    data.is_tm = ini_total - total;
    rend_applying_final_counpon(1);
    rend_succs_aac_popup(data);
    // aacshadow.querySelector('#aac_content').innerHTML = stringTemplateParser(auto_centr_box_cw_temp,{...data,homeurl});
    // aacshadow.querySelector('#cb-lwr-btn').onclick = function() { remove_aa_box(1); }
  });
}

function call_code(actualCode) {
  // var actualCode = '// Some code example \n' +
  //              'console.log(document.documentElement.outerHTML);';
  // window.location.href =  "JavaScript: "+actualCode;
  document.documentElement.setAttribute('onreset', actualCode);
  document.documentElement.dispatchEvent(new CustomEvent('reset'));
  document.documentElement.removeAttribute('onreset');
}
