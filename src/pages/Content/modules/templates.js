let ext_id = chrome.runtime.id;
let temp_ext_img_var = `chrome-extension://${ext_id}/assets/imgs/`;

export var ext_main_temp_struc = (component = '', ...restParams) => {
  let [title, data, ext_id, is_nav, is_flash, hdr_home, nav_num] = restParams;
  // console.log("ext main temp .............",restParams);
  return `
    <div class="main_container">
    <div class="header_container">
    ${hdr_home ? home_page_header(ext_id) : other_page_header(ext_id, title)}
    </div>
        <div class="contentBlock">
        ${component}
        </div>
        <div class="nav_main_cont">
        ${is_nav ? navbar(ext_id, is_flash, nav_num) : ''}
        </div>
    </div>
    <style>
    
    // .main_container {
    //     margin-bottom: 40px;
    // }
    
    .sub_container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 350px;
        height: 46px;
        border-bottom: 2px solid #e5e5e5;
        position: sticky;
        top: 0px;
        background: #fff;
        z-index: 9;
        border-radius: 10px 10px 0px 0px;
    }

    .nav_main_cont{
        background: white;    
        border-radius: 0px 0px 10px 10px;
    }
    
    .sub_container_arrow_img {
        margin-left: 10px;
        width: 30px;
        height: 30px;
    }
    
    .sub_container_allstore {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 204%;
        align-items: center;
        text-align: center;
        color: #0e1d4a;
    }
    
    .sub_conatiner_close_img {
        width: 28px;
        margin-right: 14px;
        cursor: pointer;
    }
    .contentBlock{
        max-height: 553px;
        height:553px;
        min-height: 553px;
        // overflow-y: scroll;
        // background:white;
        // border-radius: 10px;
    }
    .contentBlock::-webkit-scrollbar {
        display: none;
      }

    .hp_HeaderCont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    height: 46px;
    border-bottom: 2px solid #E5E5E5;
    position: sticky;
    top: 0px;
    background: #fff;
    z-index: 9;
    border-radius: 10px 10px 0px 0px;
    }
    .logo_Flipshope {
        max-width: 103px;
        margin-left: 14px;
    }
    .hp_user_icon {
        width: 24px;
    }
    .hp_close_icon {
        width: 24px;
        margin-left: 15px;
        margin-right: 14px;
    }
    </style>
    `;
};
/*

*/
export var all_stores_temp = (ext_id, component = '') => {
  return `
    <div class="gm_all_str">
        <div class="search-container">
            <img src="chrome-extension://${ext_id}/assets/imgs/Search_alt.png" class="search_container_image">
            <input type="text" class="input_earch_container" placeholder="Search Store Name Here" event_type="input" event_action="filter_all_str" >
        </div>
        <div class="container_allstore">
            <div class="all_str_wrppr">
                ${component}
            </div>
        </div>
    </div>
    <style>
    .gm_all_str {
        min-height: 554px;
        background: white;
        padding: 16px 0px;
        box-sizing: border-box;
    }
    .all_str_wrppr{
        display: grid;
        grid-template-columns: auto auto;
        gap: 10px;
        padding: 29px 14px;
    }
    
    .search-container {
        width: 322px;
        height: 32px;
        background: rgba(196, 196, 196, 0.2);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 14px;
    }

    .search_container_image {
        width: 24px;
    }

    .input_earch_container {
        text-align: center;
        border: transparent;
        background: rgba(232, 232, 237, 0.87);
        opacity: 0.25;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        color: #000000;
    }

    textarea:focus,
    input:focus {
        outline: none;
    }

    .container_allstore {
        // margin-top: 44px;
    /* background: red; */
    height: 500px;
    min-height: 438px;
    overflow-y: scroll;
    }
    .container_allstore::-webkit-scrollbar{
        display:none;
    }
    </style>
    `;
};

export var sidePopup = (action, top = 0) => {
  console.log(top, '=====top');
  return `
    <div class="sidePopupCont_1" >
        <div class="sidePopupCont" event_action="${action}" drag_me="drag_side_popup" >
            <img src="chrome-extension://${ext_id}/assets/imgs/sidepop_logo123.png" alt="side_popup" class="side_popup_img">
        </div>
        <div class="hover_elem_side_btn" drag_me="drag_side_popup" >
            <img src="chrome-extension://${ext_id}/assets/imgs/extenstion icon.png" alt="side_popup" class="side_popup_img_exp">
        </div>
    </div>
    <style>
    .sidePopupCont_1{
        position:absolute;
        width: 74px;
        left:-54px;
        transition:0.2s;
        top:${top};
    }
    .sidePopupCont_1:hover{
        left:-74px;
    }
    .sidePopupCont{
        height: 51px;
        width:54px;
        border-radius: 10px 0px 0px 10px;
        background: #ffffff;
        color: white;
        margin: 0;
        padding: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        box-shadow: 0px 2px 6px rgb(0 0 0 / 47%);
        float: left;
    }
    .side_popup_img{
        width: 37px;
        height: 32px;
    }
    .side_popup_img_exp{
        width:18px;
    }
    .hover_elem_side_btn{
        width: 20px;
        height: 52px;
        box-shadow: 0px 2px 6px rgb(0 0 0 / 47%);
        background: black;
        transition: width 400ms;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sidePopupCont:hover + {
        background: red;
    }
    </style>
    `;
};

export var empty_wish_list = (ext_ID) => {
  return `
    <div class="empt_wish_list_wrp">
        <div class="header_para">
            <span>You haven't saved any items yet </span>
        </div>
        <div class="gif_wishlist">
            <img src="chrome-extension://${ext_ID}/assets/imgs/empty-box.gif" class="gif_wishlist_animate">
        </div>
        <div class="footer_para">
            <span>Just save an item you love, and we'll let you</span>
            <span>know when it's the best time to buy</span>
        </div>
    </div>
    <style>
    .empt_wish_list_wrp{
        background: white;
        height: 547px;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .header_para {
        width: 249px;
        height: 64px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 21px;
        align-items: center;
        text-align: center;
        text-transform: capitalize;
        color: #0E1D4A;
    }

    .gif_wishlist_animate {
        width: 208px;
        height: 208px;
        align-items: center;
        margin-top: 42px;
        margin-left: 71px;
        margin-right: 71px;
    }

    .footer_para {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        text-align: center;
        text-transform: capitalize;
        color: rgba(34, 56, 122, 0.75);
        opacity: 0.75;
        margin-top: 44px;
        margin-left: 51px;
        margin-right: 50px;
        display: flex;
        flex-direction: column;
    }
    </style>
    `;
};

export var navbar = (ext_ID, is_flash, actv_num) => {
  return `
    <div class="hp_navbar_main_cont">
        <div class="navbar_icon_cont" event_type="click" event_action="render_home">
          <img src="chrome-extension://${ext_ID}/assets/imgs/${
    actv_num == 1 ? 'Home_fill.png' : 'Home_inactv.png'
  }" class="navbar_icons">
          <div class="icon_heading">
            <span class=${actv_num == 1 ? 'actv_head' : ''}>Home</span>
          </div>
        </div>
        <div class="navbar_icon_cont" event_type="click" event_action="render_wishList">
          <img src="chrome-extension://${ext_ID}/assets/imgs/${
    actv_num == 2 ? 'Favorite_fill.png' : 'Favorite_inactv.png'
  }" class="navbar_icons">
          <div class="icon_heading">
            <span class=${actv_num == 2 ? 'actv_head' : ''}>Wishllist</span>
          </div>
        </div>
        <div class="navbar_icon_cont ${
          is_flash ? '' : 'disp_none'
        }" event_type="click" event_action="render_flash_sale" >
          <img src="chrome-extension://${ext_ID}/assets/imgs/flash-fill.png" class="navbar_icons">
          <div class="icon_heading">
            <span>Flash Sale</span>
          </div>
        </div>
        
        <div class="navbar_icon_cont" event_type="click" event_action="render_coupons">
          <img src="chrome-extension://${ext_ID}/assets/imgs/${
    actv_num == 3 ? 'discount.png' : 'ic_outline-discount_inactv.png'
  }" class="navbar_icons">
          <div class="icon_heading">
            <span class=${actv_num == 3 ? 'actv_head' : ''}>Coupons</span>
          </div>
        </div>
        <div class="navbar_icon_cont" event_type="click" event_action="render_profile">
          <img src="chrome-extension://${ext_ID}/assets/imgs/${
    actv_num == 4 ? 'User_fill.png' : 'User_inactv.png'
  }" class="navbar_icons">
          <div class="icon_heading">
            <span class=${actv_num == 4 ? 'actv_head' : ''}>Profile</span>
          </div>
        </div>
    </div>
    <style>
    .disp_none{
        display: none !important;
    }
    .navbar_icon_cont{
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2px;
        box-sizing: border-box;
    }
    .actv_head{
        color: #0E1D4A;
        font-weight: 700;
    }
    .hp_navbar_main_cont{
        display: flex;
        justify-content: space-evenly;
        box-shadow: 0px -3px 6px rgb(0 0 0 / 5%);
    }
    .icon_heading{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 8px;
        display: flex;
        align-items: center;
        text-align: center;
        color:  #0E1D4A;;
    }
    </style>
    `;
};

export var home_page_temp = (ext_id, data, wsh, fls, glbstr, banAds) => {
  // console.log("this is hp temp....",data,wsh,fls,glbstr);
  return `<div class="login scr-y home_page_temp_cont">
    ${home_page_local_head(ext_id, wsh, 'sun.png', '', 'gm')}
    <div class="Flipkart_big_billion">
    ${banAds}
    </div>
    ${home_page_local_head(ext_id, 'Recently Used Coupons', '', 'ruc')}
    <div class="cards_recent_visit_cont_cd " >
        <div class="ruc_cont" >
            ${data.fetch_ruc.str}
        </div>
    </div>

    ${
      fls
        ? `<div class="flash_sale_homepage" event_type="click" event_action="render_flash_sale" >
      <div>
        <img src="chrome-extension://${ext_id}/assets/imgs/thunder.gif" class="gif_flash_sale_homepage">
      </div>
      <div>
        <p class="heading_flash_sale_homepage">Flash Sale</p>
      </div>
      <div class="button_flash_sale">
        <button class="btn_flash_sale_homepage">Live Now</button>
      </div>
    </div>`
        : ''
    }

    ${home_page_local_head(ext_id, 'Recent Price Drop', '', 'rpd', '', 'see')}


    <div class="cards_recent_visit_cont_cd " >
        <div class="rpd_cont">
            ${data.fetch_rpd.str}
        </div>
    </div>

    ${home_page_local_head(ext_id, 'Deals', '', 'deal', '', 'see')}

    <div class="cards_recent_visit_cont_cd " >
        <div class="deal_cont" >
            ${data.fetch_deals.str}
        </div>
    </div>

    ${home_page_local_head(ext_id, 'Sale For You!', '', 'sfu')}
    <div class="cards_recent_visit_cont_cd " >
        <div class="sfu_cont" >
            ${data.fetch_sfu.str}
        </div>
    </div>

    ${home_page_local_head(ext_id, 'All Store', '', '', 'all_str', 'see')}
    <div class="container_allstore">
      ${glbstr}
    </div>
  </div>
  <style>
  ${hp_temp_style}
  .home_page_temp_cont{
    max-height: 537px;
    overflow-y: scroll;
  }
  .home_page_temp_cont::-webkit-scrollbar {
    display: none;
  }
  </style>
  `;
};


export var rec_used_coup_crd = (ext_id, data, index) => {
  return `
    <div class="cards_recent_visit_cont" indx=${index} event_type="click" event_action="load_ruc" >
    <div class="cards_recent_visit_cont_1">
      <img src="${data.img_url}" alt="amazon" class="hp_rec_vis_site_crd_logo">
    </div>
    <div class="cards_recent_visit_cont_1_code">
      <a href="#" class="amazon_coupon_code">${data.Coupon_Code}</a>
    </div>
    <div class="visiting_watch_line">
      <img src="chrome-extension://${ext_id}/assets/imgs/bx.png" class="visiting_history_image">
      <a href="#" class="Visiting_histoy">${data.last_used_time} ago</a>
    </div>
    </div>
    `;
};

export var home_page_local_head = (
  ext_id,
  title = '',
  mrn_img = '',
  actPoint = '',
  all_str = '',
  see_all = ''
) => {
  return `
    <div class="good_morning_cd">
      <div class="good_afternoon_cd">
        <span class="good_afternoon_cd_1">${title}</span>
        ${
          mrn_img
            ? `<img src="chrome-extension://${ext_id}/assets/imgs/${mrn_img}" class="goodmrng" alt="sun">`
            : ''
        }
      </div>
      
      <div class="Arrows_right_cont">
        ${
          see_all
            ? `
        <span class="Recent_coupons_seeAll" event_type="click" event_action="see_all_${title}" >See All</span>
        `
            : ''
        }
        ${
          all_str
            ? ''
            : `
        <img src="chrome-extension://${ext_id}/assets/imgs/arrow2.png" class="Arrows_right_arrow2"  event_type="click" event_action="prev_slide_${actPoint}"sld_nm="${actPoint}" />
        <img src="chrome-extension://${ext_id}/assets/imgs/arrow1.png" class="Arrows_right_arrow1" event_type="click" event_action="nxt_slide_${actPoint}"sld_nm="${actPoint}" />
        `
        }
        
      </div>
    </div>
    `;
};

export var rec_prc_drp_crd = (ext_id, data, index) => {
    let offer = 0;
    if(data&&data.last_notified_price){
        let diff = data.last_notified_price - data.prize,
        divison = Math.round(diff/(data.last_notified_price));
        offer = divison*100;
    }
  return `
    <div class="rec_prc_crd" indx=${index} event_type="click" event_action="load_rpd">
        <div class="rec_prc_crd_upp">
          ${data.last_notified_price?`<span class="rec_prc_crd_upp_spn">${offer}%</span>`:''}
          <img src="${data.imgurl}" alt="prod_img" class="rec_prc_crd_upp_img">
          <div class="rec_prc_crd_upp_log_cont">
            <img src="${data.store_imgurl}" alt="amazon-logo" class="rec_prc_crd_upp_log_img">
          </div>
        </div>
        <div class="rec_prc_crd_low">
          <span class="cards_recentPrice_visit_heading">${data.title}</span>
          <!-- <span class="cards_deal_visit_anchor_recent">${data.description}</span> -->
          <div class="Recentcards_deal_visit_color_para">
            <p class="Recentcards_deal_visit_color_para_Z">${data.prize}</p>
            <p class="RecentCrdprice_decoration_line">${data.last_notified_price}</p>
          </div>
        </div>
    </div>
    `;
};

export var deals_hp_crd_css = `
<style>
    .img_ctr_sub_div{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .deal_card_uppr_img{
        max-width:156px;
        max-height:80px;
    }
</style>
`;
export var deals_hp_crd = (ext_id, data, index) => {
  return `
    <div class="deal_card" indx=${index} event_type="click" event_action="load_deal">

        <div class="deal_card_uppr img_ctr_main_div">
            <span class="deal_card_uppr_spn">
                DEAL
            </span>
            <div class="img_ctr_sub_div" >
                <img src="${data.img_url}" class="deal_card_uppr_img" alt="">
            </div>
            <div class="deal_card_uppr_log">
                <img src="${data.store_imgurl}" alt="" class="deal_card_uppr_log_img">
            </div>
        </div>
        <div class="deal_card_low">
          <div class="cards_deal_visit_heading">
            <span>${data.title}</span>
          </div>
          <div class="cards_deal_visit_anchor">
            <p class="cards_deal_visit_anchor_power">${data.description}</p>
          </div>
          <div class="cards_deal_visit_color_para">
            <p class="cards_deal_visit_color_para_Z">${data.disc_price}</p>
            <p class="price_decoration_line">${data.actual_price}</p>
          </div>
        </div>
    </div>
    
    `;
};

export var all_str_prd_crd_css = `
<style>
    .sec_container_allstore {
        width: 156px;
        height: 94px;
        background: #fffdfd;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
    }
    .num_cpn_all_store_spn{
        // width: 90% !important;
        margin-bottom:4px;
    }
    .logo_allStores {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .allStores {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 10px 30px 10px;
    }

    .sec_container_head {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #0e1d4a;
        text-align: center;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .sec_container_para {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 16px;
        text-align: center;
        color: #2158d7;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-top: 4px;
        display:none;
    }

    .sub_sec_container_tag {
        max-width: 143px;
        height: 18px;
        background: rgba(13, 110, 255, 0.15);
        border-radius: 3px;
        align-items: center;
        text-align: center;
        margin-top: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0px 0px 0px 4px;
    }



    .sub_sec_container_labelimage {
        // width: 10px;
        height: 10px;
        margin-right: 4px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        color: #0E1D4A;
    }
    .sec_container_allstore_image{
        border-radius: 100%;
        width: 55px;
        height: 55px;
        min-width: 55px;
        min-height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        top: -10px;
    }
</style>
`;
export var all_str_prd_crd = (ext_id, data, ind, bck_ins = '') => {
  return `
    <div class="sec_container_allstore" indx_apcd=${ind} bck_ins="${bck_ins}" style="display:${data.display}" event_type="click" event_action="ren_ind_str_pg" >
    <div class="sec_container_allstore_image">
        <img src="${data.img_url}" class="logo_allStores">
    </div>
    <div class="allStores">
        <div class="sec_container_head">
            <span>${data.store_name}</span>
        </div>
        <div class="sec_container_para">
            <span>${data.descrp}</span>
        </div>
        <div class="sub_sec_container_label">
            <div class="sub_sec_container_tag">
                <img src="chrome-extension://${ext_id}/assets/imgs/ic_outline-discount.png" class="sub_sec_container_labelimage">
                <span class="sub_sec_container_labelimage num_cpn_all_store_spn">${data.total_coupons} Coupons</span>
            </div>

        </div>
    </div>
    </div>
    `;
};
export var sale_for_you_crd = (ext_id, data, index) => {
  return `
    <div class="sale_cards" indx=${index} event_type="click" event_action="load_sfu">
        <div class="sale_card_uppr img_ctr_main_div">
            <span class="sale_card_uppr_spn">
                SALE
            </span>
            <div class="img_ctr_sub_div" >
                <img src="${data.img_url}" class="sale_card_uppr_img" alt="">
            </div>
            <div class="sale_card_uppr_log">
                <img src="${data.store_imgurl}" alt="" class="sale_card_uppr_log_img">
            </div>
        </div>
        <div class="saleContainerHeading">
          <span class="saleheading">${data.title}</span>
          <p class="saleParagraph">${data.description}</p>
        </div>
    </div>
    `;
};

export var home_page_header = (ext_id) => {
  return `
    <div class="hp_HeaderCont">
      <img src="chrome-extension://${ext_id}/assets/imgs/fs_new_curr_logo.png" class="logo_Flipshope" alt="Hyyzo" event_type="click" event_action="render_home" />
      <div class="usr_icon_cont">
        <img src="chrome-extension://${ext_id}/assets/imgs/Bell_pin.png" class="hp_user_icon" alt="user-icon" event_type="click" event_action="render_notif" />
        <img src="chrome-extension://${ext_id}/assets/imgs/icons8-multiply-24.png" class="hp_close_icon" alt="close-icon" event_type="click" event_action="close_ext_modal" />
      </div>
    </div>
    `;
};

export var other_page_header = (ext_id, title, bkt) => {
  return `
    <div class="sub_container">
        ${
          bkt
            ? `
        <div event_type="click" event_action="go_bck" bck_to="${bkt}" class="back_button_head" >
            <img src="chrome-extension://${ext_id}/assets/imgs/take_me_back.png" class="sub_container_arrow_img">
        </div>
        `
            : ``
        }
        <div>
            <span class="sub_container_allstore">${title}</span>
        </div>
        <div class="close_button_head">
            <img src="chrome-extension://${ext_id}/assets/imgs/Close_round.png" class="sub_conatiner_close_img" event_type="click" event_action="close_ext_modal" >
        </div>
    </div>
    <style>
        .back_button_head{
            position: absolute;
            left: 0px;
            display: flex;
        }
        .close_button_head{
            position:absolute;
            right:0px;
            display: flex;
        }
    </style>
    `;
};

export var wish_list = (ext_id, comp, itmLen) => {
  return `
    <div class="wishlist_main_header">
        <div class="wishlist_main_heading">
            <span>Items Saved (${itmLen})</span>
        </div>
    </div>
    <div class="sub_wishlist_container">
    ${comp}
    </div>
    <style>
    .sub_wishlist_container {
        min-height: 537px;
    /* max-height: 468px; */
    background: white;
    padding: 16px 0px 0px 0px;
    }
    </style>
    `;
};

export var price_sel_alrt_pg = (prce_drp = 'Please Choose') => {
    console.log("price drop value...price_sel_alrt_pg",prce_drp);
  return `
    <form>
        <select event_type="change" event_action="ren_prc_lbl_drp_dwn" class="prc_lst_dropdown" >
            <option value="" ${
              (prce_drp == 'Please Choose') ? 'selected' : ''
            } > Please Choose </option>
            <option value="Any" ${
              (prce_drp == 'Any') ? 'selected' : ''
            } event_type="change" event_action="set_prc_drop_in_prd" > Any Drop
            </option>
            <option value="10" ${
              (prce_drp == '10') ? 'selected' : ''
            } event_type="change" event_action="set_prc_drop_in_prd" > 10% Drop
            </option>
            <option value="20" ${
              (prce_drp == '20') ? 'selected' : ''
            } event_type="change" event_action="set_prc_drop_in_prd" > 20% Drop
            </option>
            <option value="50" ${
              (prce_drp == '50') ? 'selected' : ''
            } event_type="change" event_action="set_prc_drop_in_prd" > 50% Drop
            </option>
        </select>
    </form>
    <style>
    .prc_lst_dropdown{
        padding-left: 11px;
        border: none;
        /* background: red; */
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #0E1D4A;
        width: 200px;
    }
    </style>
    `;
};

export var price_drop_selector = (prce_drp = 'Any', index) => {
  return `
    <form>
        <select event_type="change" event_action="sel_prc_drp" class="wishlist_dropdown" pds_index=${index} >
            <option value="Any" ${
              prce_drp == 'Any' ? 'selected' : ''
            } event_type="change" event_action="sel_prc_drp" > Any Drop
            </option>
            <option value="10" ${
              prce_drp == '10' ? 'selected' : ''
            } event_type="change" event_action="sel_prc_drp" > 10% Drop
            </option>
            <option value="20" ${
              prce_drp == '20' ? 'selected' : ''
            } event_type="change" event_action="sel_prc_drp" > 20% Drop
            </option>
            <option value="50" ${
              prce_drp == '50' ? 'selected' : ''
            } event_type="change" event_action="sel_prc_drp" > 50% Drop
            </option>
        </select>
    </form>
    `;
};

export var wish_list_product_elem = (
  data,
  ext_id,
  is_prc_drp,
  time_stamp,
  index
) => {
    console.log("wish list product price drop...",is_prc_drp);
  return `
    <div class="sec_sub_wishlist_container sswc${index}" key_index=${index} >
        <div class="sec_sub_container_image ssci${index} img_ctr_main_div" event_type="click" event_action="redirect_to_prod_pg" prd_key_ind="${index}" >
            <div class="img_ctr_sub_div fs_border">
                <img src="${data.img_url}" class="sec_sub_image_ads" alt="prod_img">
            </div>
            <img src="${
              data.store_imgurl || data.logo
            }" class="cards_deal_visit_ellipse_image_1" alt="site-logo">
            ${
              parseInt(is_prc_drp) ? `
            <div class="bellside_wishlist_cont">
                <img src="chrome-extension://${ext_id}/assets/imgs/bellside.png" class="bellside_wishlist">
            </div>
            `: ``
            }
        </div>
        <div class="sec_sub_haeding_div">
            <div class="wishlist_headline">
                ${''}
            <span class="wish_list_titl_spn" event_type="click" event_action="redirect_to_prod_pg" prd_key_ind="${index}" >${data.title}</span>
            
            </div>
            ${
              //<div class="wishlist_paragraph">
              //<span class="wish_list_para_spn" >${data.descp}</span>
              //</div>
              ''
            }
            <div class="wishlist_main_price_drop">
                <span class="wishlist_price_label">₹${data.start_price}</span>
                <div class="prc_rel_cont prc_in${index}" key_index=${index} >
                ${
                    parseInt(is_prc_drp)
                    ? `
                ${price_drop_selector(is_prc_drp, index)}
                `
                    : `
                <div class="add_prc_drp_cont" key_index=${index} event_type="click" event_action="add_prc_drp" >
                    <img src="chrome-extension://${ext_id}/assets/imgs/Add_round_light.png" class="wishlist_price_drop_sign">
                    <span class="wishlist_price_drop"> Price Drop</span>
                </div>
                `
                }
                </div>
            </div>
            <div class="wishlist_remove_cards">
                <span class="wishlist_remove" key_index=${index} event_type="click" event_action="remove_wl_prod" pid="${data.pid}" sid="${data.store_id}" >Remove</span>
                <img src="chrome-extension://${ext_id}/assets/imgs/bx.png" class="wishlist_watch">
                <span class="wishlist_all_tym">${time_stamp} ago</span>
            </div>
        </div>
    </div>
    `;
};

export var wish_list_prod_elem_style = `
.sec_sub_wishlist_container {
    width: 156px;
    height: 232px;
    background: #FFFFFF;
    border-radius: 6px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}
.sec_sub_container_image{
    position: relative;
    width: 156px;
    height: 90px;
}
.fs_border {
    overflow:hidden;
    border-radius: 6px 6px 0px 0px;
}
.cdve_img_cont{

}
.cdve_image{

}
.cards_deal_visit_ellipse_image_1 {
    position: absolute;
    max-width: 36px;
    min-height: 36px;
    left: 6px;
    top: 73px;
    border-radius: 100%;
    background: white;
    /* text-align: center; */
    object-fit: contain;
}
.bellside_wishlist_cont{
    width: 20px;
    height: 20px;
    display:flex;
    align-items:center;
    justify-content:center;
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(62, 110, 220, 0) 100%);
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15));
    backdrop-filter: blur(9px);
    border-radius: 17px;
    position: absolute;
    top: 4px;
    right: 6px;
}
.bellside_wishlist {
    width: 14px;
    height: 14px;
}
.sec_sub_haeding_div {
    padding: 13px 8px 0px 8px;
    height: 142px;
    box-sizing: border-box;
}
.wishlist_headline {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #0E1D4A;
    margin-top: 4px;
    height:48px;
}
.wishlist_paragraph {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    color: rgba(34, 56, 122, 0.75);
    margin-bottom: 8px;
    margin-top: 6px;
}
.wishlist_main_price_drop {
    display: flex;
    justify-content: space-between;
    margin: 12px 0px 0px 0px;
}
.wishlist_price_label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    color: #0E1D4A;
    padding:3px;
}
.wishlist_price_drop_sign {
    width: 10px;
    height: 10px;
    margin-top: 2px;
}
.wishlist_price_drop {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    text-decoration-line: underline;
    color: #2158D7;
}
.wishlist_remove_cards {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}
.wishlist_remove {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: rgba(226, 52, 28, 0.75);
}
.wishlist_watch {
    width: 10px;
    height: 10px;
    margin-left: 19px;
    margin-top: 2px;
    margin-right: 2px;
}
.wishlist_all_tym {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: rgba(34, 56, 122, 0.75);
    width: 93px;
}
.wishlist_dropdown {
    width: 76px;
    height: 23px;
    border: 0.5px solid #2158D7;
    border-radius: 2px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
}
.wish_list_titl_spn{
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    // height: 51px;
    padding: 0;
    margin: 0;
}
.wish_list_para_spn{
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
`;

export var login_to_add_prc_drp = `
<div class="apd_main_sub_cont" >
    <div class="logout_container">
        <span> Login to Get Price Drop!</span>
    </div>
    <div class="logout_btn_container">
        <button class="auto_apply_btn" event_type="click" event_action="ren_logn_scr" >
            <p class="auto"> Log In</p>
        </button>
        <button class="auto_cancel_btn" event_type="click" event_action="close_apd_login_modl" >
            <p class="auto"> Cancel</p>
        </button>
    </div>
</div>
<style>
.apd_main_sub_cont{
    background:white;
    width: 268px;
    height: 127px;
    border-radius: 10px;
}
.logout_container {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #0E1D4A;
    padding-top: 18px;
}

.logout_btn_container {
    display: flex;
    justify-content: space-between;
}

.auto_apply_btn {
    width: 92px;
    height: 36px;
    background: #3E6EDC;
    border-radius: 6px;
    border: none;
    margin-top: 22px;
    margin-left: 36px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    color: #FFFFFF;
}

.auto_cancel_btn {
    width: 92px;
    height: 36px;
    border-radius: 6px;
    border: none;
    margin-top: 22px;
    margin-right: 36px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    color: #0E1D4A;
}
</style>
`;
/*

*/
export var hp_temp_style = `
.login{
    padding: 16px 14px 0px 14px;
    background: white;
}
.hp_HeaderCont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    height: 46px;
    border-bottom: 2px solid #E5E5E5;
    position: sticky;
    top: 0px;
    background: #fff;
    z-index: 9;
}

.logo_Flipshope {
    width: 103px;
}

.hp_user_icon {
    width: 24px;
}

.hp_close_icon {
    width: 24px;
    margin-left: 15px;
    margin-right: 14px;
}

.good_morning_cd {
    display: flex;
    justify-content: space-between;
    margin: 12px 0px 12px 0px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
}
.saleContainer1{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 180px;
    align-items: center;
}
.goodmrng{
    width: 15px;
    height: 15px;
}
.good_afternoon_cd {
    display: flex;
    align-items: center;
    width: 240px;
}

.good_afternoon_cd_1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #0E1D4A;
}

.good_afternoon_sun {
    margin-left: 4px;
    padding-top: 5px;
    width: 15px;
    height: 15px;
}

.Arrows_right_cont {
    display: flex;
    align-items: center;   
}

.Arrows_right_arrow1 {
    margin-left: 6.5px;
}

.Flipkart_big_billion {
    width: 322px;
    height: 160px;
    border-radius: 6px;
    margin-bottom: 16px;
    margin-top: 12px;
    overflow: hidden;
    position:relative;
}

.Recent_coupons_seeAll {
    font-family: 'Poppins';
    color: #ABC0F0;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    text-decoration-line: underline;
    padding: 0px 10px 0px 0px;
}

.cards_recent_visit_cont_cd {
    display: flex;
    justify-content: space-between;
    width: 322px;
    overflow-x: hidden;
    padding: 10px 0px 10px 7px;
    box-sizing: border-box;
}
// .sale_fy_cont {
//     width: 322px;
//     overflow-x: hidden;
//     box-sizing: border-box;
//     display:flex;
// }
.cards_deal_visit_color_para_recent{
    width:117px;
}

.cards_recent_visit_cont {
    width: 156px;
    height: 96px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right:10px;
}

.hp_rec_vis_site_crd_logo {
    width: 100%;
    height: 100%;
}

.hp_rec_vis_site_crd_logo_2 {
    padding: 0px 65.94px 0px 47.34px;
    position: relative;
}
.cards_recent_visit_cont_1{
    width: 84px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cards_recent_visit_cont_1_code {
    background: rgba(14, 29, 74, 0.1);
    width: 85px;
    border: 0.5px dashed #0E1D4A;
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6.7px 0px 0px 0px;
}

.amazon_coupon_code {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    text-decoration-line: none;
    color: #2158D7;
    text-overflow: ellipsis;
    overflow: hidden;
}

.visiting_watch_line {
    display: flex;
    margin-top: 6px;
    margin-left: auto;
    margin-right: 8px;
}

.visiting_history_image {
    width: 10px;
    height: 10px;
    padding-right: 3px;
    padding-top: 1px;
}

.Visiting_histoy {
    font-family: 'poppins';
    font-style: normal;
    font-size: 9px;
    font-weight: 500px;
    text-decoration-line: none;
    color: #808080;
}

.Recent_coupons_seeAll_deal {
    font-family: 'poppins';
    color: #ABC0F0;
    font-weight: 600;
    font-style: normal;
    font-size: 10px;
    text-decoration-line: underline;
    padding: 10px 0.5px 0px 192px;
}

.cards_recent_visit_cont_second {
    width: 156px;
    background: #FFFFFF;
    margin-right: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    position: relative;
}

.cards_recent_visit_cont_deal_right {
    width: 156px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-repeat: no-repeat, repeat;
    background-image: url("image/Apple-phone.png");
}

.cards_deal_visit_color {
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(33, 88, 215, 0.5) 100%);
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15));
    backdrop-filter: blur(9px);
    border-radius: 17px;
    width: 34px;
    height: 15px;
    margin: 6px 6px 0px 116px;
    position: absolute;
}

.cards_deal_visit_color_inner {
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 8px;
    text-align: center;
    color: #FFFFFF;
    left: 8px;
    bottom: 3px;
}

.cards_deal_visit_ellipse_image {
    margin-top: 8px;
}

.cards_deal_visit_color_para {
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #0E1D4A;
}

.cards_recent_visit_cont_deal_price_drop {
    width: 200px;
    height: 186px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-repeat: no-repeat, repeat;
    background-image: url("image/Rectangle-pricedrop.png");
    background-size: 200px 90px;
}

.cards_deal_visit_color_pdrop {
    height: 90px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cards_deal_visit_inner_para {
    margin-left: 4px;
}

.cards_deal_visit_color_inner_text {
    position: absolute;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    text-align: center;
    color: #FFFFFF;
    right: 3px;
    top: 3px;
    border-radius: 18px;
    width: 38px;
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(33, 88, 215, 0.5) 100%);
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15));
    height: 15px;
    backdrop-filter: blur(9px);
}

.cards_deal_visit_ellipse_image_bag {
    width:100%;
    height:100%;
}

.cde_img_cont{
    position: absolute;
    left: 0px;
    top: 23px;
    border-radius:100%;
    overflow:hidden;
}

.cards_recent_visit_cont_deal_price_drop_Asus {
    margin-left: 10px;
    width: 200px;
    height: 186px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
}

.Recent_coupons_seeAll_Pdrop {
    font-family: poppins;
    color: #ABC0F0;
    font-weight: 600;
    font-size: 10px;
    margin-top: 3px;
    text-decoration-line: underline;
    padding: 7px 0.5px 0px 91px;
}

.Recent_coupons_seeAll_sale {
    font-family: poppins;
    color: #ABC0F0;
    font-weight: 600;
    font-size: 10px;
    text-decoration-line: underline;
    padding: 9px 14.5px 0px 128px;
}

.Recent_coupons_seeAll_sale_1 {
    font-family: poppins;
    color: #ABC0F0;
    font-weight: 600;
    font-size: 10px;
    text-decoration-line: underline;
    padding: 9px 14.5px 0px 165px;
}


.sale_for_image_fd {
    display: flex;
    width: 180px;
    height: 180px;
}

.make_it_dot{
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.dot_1{
    -webkit-line-clamp: 1;
}
.dot_2{
    -webkit-line-clamp: 2;
}
.dot_3{
    -webkit-line-clamp: 3;
}
.cards_visit_ellipse_image{
    height:80px;
}
.sfu_img_cont{
    height:180px;
    position:relative;
    width:100%;
}
.sfu_sale_btn{
    position: absolute;
    width: 34px;
    height: 15px;
    right: 6px;
    top: 6px;
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(62, 110, 220, 0) 100%);
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15));
    backdrop-filter: blur(4.5px);
    border-radius: 17px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 7px;
}
.sfu_logo_img_cont{
    position: absolute;
width: 36px;
height: 36px;
left: 8px;
top: 136px;
border-radius: 100%;
overflow:hidden;
filter: drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.08));
}
.sfu_logo_img{
    width:100%;
    height:100%;
}
.sfu_prod_img{
    width:100%;
    height:100%;
}
.cards_deal_visit_inner_para_recent {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    width: 100%;
    color: #0E1D4A;
    height: 96px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.cards_deal_visit_heading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #0E1D4A;
}

.cards_deal_visit_anchor_power {
    margin-top: 4px;
    margin-bottom: 4px;
    overflow-y: scroll;
    height: 30px;
}

.cards_deal_visit_anchor_power::-webkit-scrollbar {
    display: none;
}

.cards_deal_visit_color_para {
    display: flex;
}

.price_decoration_line {
    margin-top: 5px;
    margin-bottom: 0px;
    margin-left: 4px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    line-height: 15px;
    text-decoration-line: line-through;
    color: #3E4A6F;
}


.cards_deal_visit_color_para_Z {
    margin-top: 4px;
    margin-bottom: 7px;
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #0E1D4A;
}

.cards_deal_visit_anchor_recent {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    text-decoration-line: none;
    color: #2158D7;
    width: 160px;
}

.cards_deal_visit_color_para_Z_recent {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #0E1D4A;

}

.good_afternoon_discount {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #0E1D4A;

    margin-left: 10px;
}

.sale_discount_cd {
    display: flex;
}

.Recent_coupons_seeAll_Allstores {
    font-family: poppins;
    color: #ABC0F0;
    font-weight: 600;
    font-size: 10px;
    text-decoration-line: underline;
    padding: 5px 14.5px 0px 158px;
}

.cards_deal_visit_anchor {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 15px;
    text-decoration-line: none;
    color: #2158D7;
}

.good_afternoon_discount_texts {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    margin-left: 10px;
    color: #3E6EDC;
    width: 166px;
    margin-top: 4px;
}

.container_allstore {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    margin-top: 40px;
}

.sec_cont_img{
    width: 100%;
    height: 100%;
}

.sec_container_image_1 {
    position: absolute;
    top: 1350px;
    margin-left: 50px;
}

.sec_container_allstore_1 {
    width: 156px;
    height: 120px;
    background: #fffdfd;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
    border-radius: 6px;
    margin-top: 40px;
    margin-bottom: 51px;
}
.sec_container_allstore_image{
    border-radius: 100%;
    width: 55px;
    height: 55px;
    min-width: 55px;
    min-height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    top: -10px;
}
.sec_container_allstore_image_1 {
    position: absolute;
    top: 1519px;
    margin-left: 50px;
}

.sec_container_image_2 {
    position: absolute;
    top: 1519px;
    margin-left: 50px;
}

.flash_sale_homepage {
    width: 322px;
    height: 42px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
    border-radius: 6px;
    margin: 16px 0px 16px 0px;
    display: flex;
    justify-content: space-between;
}

.gif_flash_sale_homepage {
    width: 24px;
    height: 30px;
    margin-top: 6px;
    margin-left: 6px;
}

.heading_flash_sale_homepage {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #0E1D4A;
    margin: 7px 135px 5px 4px;
}

.button_flash_sale {
    margin: 11px 6px 0px 0px;
}

.btn_flash_sale_homepage {
    width: 61px;
    height: 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 15px;
    display: flex;
    align-items: center;
    color: #2158D7;
    border: none;
    border-radius: 4px;
    padding-left: 8px;
}

.hp_navbar_cont {
    width: 350px;
    height: 52px;
    background: #fff;
    position: sticky;
    bottom: 0px;
    box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.2);
    flex-direction: row;
}

.hp_navbar_main_cont{
    display: flex;
    justify-content: space-evenly;
    box-shadow: 0px -3px 6px rgb(0 0 0 / 5%);
}

.icon_heading{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 8px;
    display: flex;
    align-items: center;
    text-align: center;
    color:  #0E1D4A;;
}


.sale_for_image{
    display: flex;
    justify-content: space-between;
    height: 271px;
}

.salehaeding{
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 14px;
color: #0E1D4A;

}

.saleParagraph{
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 12px;
color: #3E6EDC;

}
.rec_pdc_prd_img{

}


.rec_prc_crd{
    min-width: 200px;
    width: 200px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
    border-radius: 6px;
    height: 186px;
    margin-right:10px;
}
.rec_prc_crd_upp{
    height: 90px;
    width: 200px;
    position: relative;
}

.rec_prc_crd_upp_spn{
    position: absolute;
    width: 38px;
    background: green;
    height: 15px;
    right: 6px;
    top: 6px;
    border-radius: 18px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 7px;
    line-height: 10px;
    text-align: center;
    color: #FFFFFF;
    padding-top: 2px;
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(33, 88, 215, 0.5) 100%);
    box-shadow: 0px 4px 6px rgb(0 0 0 / 15%);
    backdrop-filter: blur(4.5px);
}
.rec_prc_crd_upp_img{
    width: 100%;
    height: 100%;
}
.rec_prc_crd_upp_log_cont{
    border-radius: 100%;
    overflow: hidden;
    width: 36px;
    display: flex;
    justify-content: center;
    height: 36px;
    align-items: center;
    position: absolute;
    left: 6px;
    top: 54px; 
}
.rec_prc_crd_upp_log_img{
    width: 100%;
    height: 100%;
}
.rec_prc_crd_low{
  height: 96px;
  margin-left:6px;
}
.cards_recentPrice_visit_heading{
  font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #0E1D4A;
    margin-bottom: 4px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.cards_deal_visit_anchor_recent {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    text-decoration-line: none;
    color: #2158D7;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 6px;
}
.Recentcards_deal_visit_color_para {
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #0E1D4A;
    display: flex;
}
.Recentcards_deal_visit_color_para_Z {
    margin-top: 4px;
    margin-bottom: 7px;
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
}
.RecentCrdprice_decoration_line {
    margin-top: 5px;
    margin-bottom: 0px;
    margin-left: 4px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    line-height: 15px;
    text-decoration-line: line-through;
    color: #3E4A6F;
}


.deal_card{
    min-width: 156px;
    width: 156px;
    max-width: 156px;
    height: 174px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
    border-radius: 6px;
    margin-right:10px;
}
.deal_card_uppr{
    height: 80px;
    position: relative;
}
.deal_card_uppr_spn{
    position: absolute;
    width: 38px;
    height: 15px;
    /* left: 156px; */
    top: 6px;
    right: 6px;
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(33, 88, 215, 0.5) 100%);
    box-shadow: 0px 4px 6px rgb(0 0 0 / 15%);
    backdrop-filter: blur(4.5px);
    border-radius: 18px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 7px;
    line-height: 10px;
    text-align: center;
    color: #FFFFFF;
    padding-top: 2px; 
    box-sizing:border-box;
}

.deal_card_uppr_img{
    border-radius: 6px;
}
.deal_card_uppr_log{
    position: absolute;
    overflow: hidden;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40px;
    left: 4px;
}
.deal_card_uppr_log_img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.deal_card_low{
  height: 94px;
  margin-left: 4px;
}
.cards_deal_visit_heading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #0E1D4A;
    margin-bottom: 4px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .cards_deal_visit_anchor {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 15px;
    text-decoration-line: none;
    color: #2158D7;
}
.cards_deal_visit_anchor_power {
    margin-top: 4px;
    margin-bottom:4px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.cards_deal_visit_color_para {
    display: flex;
}
.cards_deal_visit_color_para_Z {
    margin-top: 4px;
    margin-bottom: 7px;
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #0E1D4A;
}
.price_decoration_line {
    margin-top: 5px;
    margin-bottom: 0px;
    margin-left: 4px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    line-height: 15px;
    text-decoration-line: line-through;
    color: #3E4A6F;
}




.sale_cards{
    min-width: 180px;
    width: 180px;
    height: 271px;
    border-radius: 6px;
    margin-right:10px;
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
.sale_card_uppr{
    height: 180px;
    position: relative;
}
.sale_card_uppr_spn{
    position: absolute;
    width: 38px;
    height: 15px;
    top: 6px;
    right: 6px;
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(33, 88, 215, 0.5) 100%);
    box-shadow: 0px 4px 6px rgb(0 0 0 / 15%);
    backdrop-filter: blur(4.5px);
    border-radius: 18px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 7px;
    line-height: 10px;
    text-align: center;
    color: #FFFFFF;
    box-sizing:border-box;
    padding-top: 3px;
}
.sale_card_uppr_img{
    border-radius: 6px;
}
.sale_card_uppr_log{
    position: absolute;
    overflow: hidden;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 136px;
    left: 8px;
}
.sale_card_uppr_log_img{
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}
.saleheading{
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 14px;
color: #0E1D4A;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
width: 121px;
}

.saleParagraph{
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 12px;
color: #3E6EDC;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}


.ruc_cont{
    display:flex;
    flex-direction:row;
    transition: all .75s;
}
.rpd_cont{
    display:flex;
    flex-direction:row;
    transition: all .75s;
}
.deal_cont{
    display:flex;
    flex-direction:row;
    transition: all .75s;
}
.sfu_cont{
    display:flex;
    flex-direction:row;
    transition: all .75s;
}

`;

var temp_style_deal_page = `
.deal_card{
    min-width: 156px;
    width: 156px;
    max-width: 156px;
    height: 174px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
    border-radius: 6px;
    // margin-right:10px;
}
.deal_card_uppr{
    height: 80px;
    position: relative;
}
.deal_card_uppr_spn{
    position: absolute;
    width: 38px;
    height: 15px;
    /* left: 156px; */
    top: 6px;
    right: 6px;
    background: linear-gradient(256.38deg, #3E6EDC -1.83%, rgba(33, 88, 215, 0.5) 100%);
    box-shadow: 0px 4px 6px rgb(0 0 0 / 15%);
    backdrop-filter: blur(4.5px);
    border-radius: 18px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 7px;
    line-height: 10px;
    text-align: center;
    color: #FFFFFF;
    box-sizing:border-box;
    padding-top: 2px; 
}
.deal_card_uppr_img{
    border-radius: 6px;
}
.deal_card_uppr_log{
    position: absolute;
    overflow: hidden;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40px;
    left: 4px;
}
.deal_card_uppr_log_img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.deal_card_low{
    height: 94px;
    margin-left: 4px;
}
.cards_deal_visit_heading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #0E1D4A;
    margin-bottom: 4px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.cards_deal_visit_anchor {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 15px;
    text-decoration-line: none;
    color: #2158D7;
}
.cards_deal_visit_anchor_power {
    margin-top: 4px;
    margin-bottom:4px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.cards_deal_visit_anchor_power::-webkit-scrollbar {
    display: none;
}
.cards_deal_visit_color_para {
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #0E1D4A;
    display: flex;
}
.cards_deal_visit_color_para_Z {
    margin-top: 4px;
    margin-bottom: 7px;
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #0E1D4A;
}
.price_decoration_line {
    margin-top: 5px;
    margin-bottom: 0px;
    margin-left: 4px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    line-height: 15px;
    text-decoration-line: line-through;
    color: #3E4A6F;
}
`;

export var loader = () => {
  return `
    <div class="loader_cont">
        <div class="loader"></div>
    </div>
    <style>
    .loader {
        border: 10px solid #f3f3f3;
        border-radius: 50%;
        border-top: 10px solid #243365;
        width: 20px;
        height: 20px;
        animation: spin 2s linear infinite;
      }
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
    .loader_cont{
        width: 100%;
        height:554px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
    `;
};

export var univ_loader = (w, h) => {
  return `
    <div class="univ_loader_cont">
        <div class="univ_loader"></div>
    </div>
    <style>
    .univ_loader {
        border: 10px solid #f3f3f3;
        border-radius: 50%;
        border-top: 10px solid #243365;
        width: 20px;
        height: 20px;
        animation: spin 2s linear infinite;
      }
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
    .univ_loader_cont{
        width: ${w};
        height:${h};
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
    `;
};

export var banner_carousel = (slide, dot) => {
  return `
    <div class="slide_show_cont">${slide}</div>
    <div class="dot_cont">${dot}</div>
    <style>
    .slide_show_cont{
        display:flex;
    }
    .mySlides{
        width: 322px;
        min-width: 322px;
        min-height: 160px;
        height: 160px;
    }
    .dot_cont{
        position: absolute;
        background: red;
        top: 78%;
        left: 43%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 49px;
        overflow: hidden; 
    }
    .dot{
        text-align: center;
        border-radius: 100%;
        background: green;
        width: 10px;
        height: 10px;
        min-width: 10px;
        min-height: 10px;
        margin-right: 2px;
    }
    </style>
    `;
};

export var banner_car_sld = (ext_id, ind) => {
  return `
    <div class="mySlides fade" sld_ban_indx=${ind}>
        <img src="chrome-extension://${ext_id}/assets/imgs/Flipkart_image.png" style="width:100%">
    </div>
    `;
};

export var banner_car_dot = (ind) => {
  return `
    <div class="dot" style="text-align:center" dot_ban_indx=${ind} ></div>
    `;
};

export var deals_cont = (comp = '') => {
  return `
    <div class="gen_cont">${comp}</div>
    <style>
    .gen_cont{
        overflow-y: scroll;
        max-height: 553px;
        min-height: 553px;
        padding: 16px 14px 0px 14px;
        width: 350px;
        background: white;
        box-sizing: border-box;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: auto auto;
        grid-template-rows: max-content;
    }
    .gen_cont::-webkit-scrollbar {
        display: none;
    }
    ${temp_style_deal_page}
    </style>
    `;
};

export var ind_str_cpn_temp = (
  ext_id,
  ind_str_crd,
  lst_cpn_str,
  avl_cpn_str,
  avl_cpn_ln
) => {
  return `
<div class="ind_str_mn_cont">
    <div class="ind_str_crd_cont">${ind_str_crd}</div>
    <div class="ind_str_cpn_cont">
        <div class="ind_str_cpn_lst_usd_cont">
            
            ${ind_str_head_tmp(ext_id, {
              title: 'Last Successful Coupons',
              isAvl: false,
              cnt: 0,
            })}

            <div class="ind_str_cpn_wrpr">${lst_cpn_str}</div>
        </div>
        <div class="ind_str_cpn_avl_cont">

            ${ind_str_head_tmp(ext_id, {
              title: 'Available Coupons',
              isAvl: true,
              cnt: avl_cpn_ln,
            })}

            <div class="ind_str_cpn_wrpr">${avl_cpn_str}</div>
        </div>
    </div>
</div>
<style>
.ind_str_mn_cont{
    background:white;
    min-height:554px;
    // width:350px;
}
.ind_str_crd_cont{

}
.ind_str_cpn_cont{
    padding: 0px 14px 14px 14px;
    overflow-y: scroll;
    max-height: 413px;
}
.ind_str_cpn_cont::-webkit-scrollbar{
    display:none;
}
.ind_str_cpn_lst_usd_cont{

}
.ind_str_cpn_wrpr{

}
.ind_str_cpn_avl_cont{

}
.ind_str_cpn_wrpr{

}
</style>
`;
};

export var ind_str_crd = (ext_id, data,cpn_len) => {
    console.log("this is ind str crd data...",data,cpn_len);
  return `
    <div class="godaddy_image_coupon">
        <div class="godaddy_imgcrds">
            <img src="${data.logo}" class="image_coupons">
        </div>
        <div class="godaddy_heading">
            <span>${data.merchant}</span>
            <div class="flag_coupons_image">
                <img src="chrome-extension://${ext_id}/assets/imgs/ic_outline-discount.png" class="flag_coupons">
                <span class="flag_coupons_heading">${
                    cpn_len || 0
                } Coupons Available </span>
            </div>
        </div>
        <div class="visit_home_input">
            <button class="homepage_visit" event_type="click" event_action="visit_ind_str" >
                <img src="chrome-extension://${ext_id}/assets/imgs/Shop_light.png" class="visit_store_image">
                <span class="visit_store">Visit Store</span>
            </button>
        </div>
    </div>
<style>
    .godaddy_image_coupon {
        display: flex;
        justify-content: space-between;
        /* padding-bottom: 45px; */
        border-bottom: 4px solid #e5e5e5;
        /* padding-top: 18px; */
        padding: 18px 14px 45px 14px;
    
    }
    .visit_home_input{
        display: flex;
    /* justify-content: center; */
    align-items: center;
    }
    .godaddy_imgcrds {
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image_coupons {
        max-width: 56px;
        // height: 56px;
    }

    .godaddy_heading {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        color: #0E1D4A;
        margin-right: 36px;
        white-space: nowrap;
        width: 137px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .flag_coupons_image {
        display: flex;
        justify-content: space-between;
    }

    .flag_coupons {
        width: 12px;
        height: 12px;
        margin-top: 2px;
        margin-right: 5px;
    }

    .flag_coupons_heading {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        color: #0E1D4A;
    }

    .homepage_visit {
        width: 84px;
        height: 22px;
        border: 1px solid rgba(14, 29, 74, 0.25);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        background:transparent;
    }

    .visit_store {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 9px;
        color: #0E1D4A;
    }

    .visit_store_image {
        width: 18px;
        height: 18px;
        margin-right:6px;
    }
</style>
    `;
};

export var ind_str_head_tmp = (ext_id, data) => {
  return `
    <div class="last_successful">
        <div class="last_successful_coupons">
            <span>${data.title}</span>
            ${data.isAvl ? `<span>(${data.cnt})</span>` : ``}
        </div>
        ${
          data.isAvl
            ? ``
            : `
        <!--<div class="last_coupon_plus" event_type="click" event_action="ren_add_cpn_pg" >
        <img src="chrome-extension://${ext_id}/assets/imgs/Add_round_light.png">
        <span class="last_coupon_heading">Add Coupon </span>
        </div>-->
        `
        }
    </div>
    <style>
    .last_successful {
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
    }

    .last_successful_coupons {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #0E1D4A;
    }

    .last_coupon_plus {
        display: flex;
        display: flex;
    justify-content: center;
    align-items: center;
    }

    .last_coupon_heading {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        text-decoration-line: underline;
        color: #2158D7;
    }
</style>
    `;
};

export var ind_str_lst_cpn_css = `
<style>
    .coupons_list_1 {
        width: 322px;
        height: 60px;
        margin-top: 18px;
        background: rgba(14, 29, 74, 0.03);
        border: 1px dashed rgba(14, 29, 74, 0.25);
        padding: 0px 12px 0px 12px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        align-items: center;
    }
    .couponsCopied{
        text-align: center;
        align-items: center;
        display:none;
    }
    .couponsCopied_spn{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        color: #2158D7;
    }
    .coupons_line_based {
        margin-top: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .coupons_E15RTU {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        color: #0E1D4A;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // margin-left: 12px;
        margin-bottom: 2px;
    }
    
    .coupons_E15RTU_para {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: rgba(14, 29, 74, 0.5);
        // margin-left: 12px;
        margin-top: 0px;
        margin-bottom: 0px;
    }
    </style>
`;
export var ind_str_lst_cpn = (ext_id, data) => {
  return `
    <div class="coupons_list_1" event_type="click" event_action="copy_cpn" >
        <div class="coupons_line_based">
            <span class="coupons_E15RTU">${data.cpn_code}</span>
            <p class="coupons_E15RTU_para">${data.detail}</p>
        </div>
        <div class="couponsCopied">
            <span class="couponsCopied_spn">Copied</span>
        </div>
    </div>
    
    `;
};

export var ind_str_avl_cpn_css = `
<style>
    // .coupons_list_1 {
    //     width: 322px;
    //     height: 60px;
    //     margin-top: 18px;
    //     background: rgba(14, 29, 74, 0.03);
    //     border: 1px dashed rgba(14, 29, 74, 0.25);
    // }
    .couponsCopied{
        text-align: center;
        align-items: center;
        display:none;
    }
    .couponsCopied_spn{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        color: #2158D7;
    }
    .coupons_line_based {
        margin-top: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .coupons_E15RTU {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        color: #0E1D4A;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // margin-left: 12px;
        margin-bottom: 0px;
    }
    
    .coupons_E15RTU_para {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: rgba(14, 29, 74, 0.5);
        // margin-left: 12px;
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .coupons_list_2 {
        width: 322px;
        height: 60px;
        margin-top: 12px;
        background: rgba(14, 29, 74, 0.03);
        border: 1px solid rgba(14, 29, 74, 0.25);
        padding: 0px 12px 0px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    }
    </style>
`;
export var ind_str_avl_cpn = (ext_id, data) => {
  return `
    <div class="coupons_list_2" event_type="click" event_action="copy_cpn" >
        <div class="coupons_line_based">
            <span class="coupons_E15RTU">${data.code}</span>
            <p class="coupons_E15RTU_para">${data.description}</p>
        </div>
        <div class="couponsCopied">
            <span class="couponsCopied_spn">Copied</span>
        </div>
    </div>
    
    `;
};

export var add_cpn_page_temp = (ext_id, data) => {
  return `
    <div class="add_cpn_wrppr">
        <div class="formsCont">
            <div class="profile_emailBox_mg">
                <label for="webst_nm" class="profile_labelbox_mg">Website Name</label>
                <div class="profile_boxcls_mg">
                    <input type="text" class="profile_emailInput_mg" placeholder="Enter Website Name" name="webst_nm" required >
                </div>
            </div>
            <div class="profile_emailBox_mg">
                <label for="cpn_cde" class="profile_labelbox_mg">Coupon Code</label>
                <div class="profile_boxcls_mg">
                    <input type="text" class="profile_emailInput_mg" placeholder="Enter Coupon Code" name="cpn_cde" required>
                    <span class="err_cpn">can't leave this empty!</span>
                </div>
            </div>
            <div class="profile_emailBox_mg">
                <label for="email" class="profile_labelbox_mg">Email Address</label>
                <div class="profile_boxcls_mg">
                    <input type="text" class="profile_emailInput_mg" placeholder="Enter email address" name="email" required  >
                </div>
            </div>
            <div class="profile_emailBox_mg">
                <label for="descp" class="profile_labelbox_mg">Description:</label>
                <div class="profile_boxcls_mg">
                    <textarea id="w3review" class="profile_txtara_mg" placeholder="Write here.." name="descp" rows="7" cols="50"  ></textarea>
                </div>
            </div>
            <button class="login_button_mg" event_type="click" event_action="reg_inp_form">Add</button>
        </div>
    </div>
    <style>
        /* add coupons css */
        .add_cpn_wrppr{
            background: white;
            padding: 30px 14px 14px 14px;
            height: 523px;
            border-radius: 0px 0px 10px 10px;
        }
        .formsCont{
        // margin-left: 14px;
        // margin-right: 14px;
        // margin-top: 30px;
        }
        .err_cpn{
            color: red;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            display: none;
            position: absolute;
            top: 45px;
            right: 6px;
        }
        .profile_emailBox_mg {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            color: #0E1D4A;
        }

        .profile_boxcls_mg {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            color: rgba(14, 29, 74, 0.25);
            position: relative;
        }

        .profile_emailInput_mg {
            width: 322px;
            height: 36px;
            background: #f5eeee;
            border-radius: 6px;
            border: none;
            margin-top: 10px;
            margin-bottom: 15px;
            padding-left: 16px;
            opacity: 0.5;
            box-sizing: border-box;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
        }

        .profile_txtara_mg{
            background: #f5eeee;
            border-radius: 6px;
            border: none;
            margin-top: 10px;
            margin-bottom: 15px;
            padding-left: 12px;
            opacity: 0.5;
            padding-top: 16px;
            box-sizing: border-box;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
        }

        .login_button_mg {
            width: 322px;
            height: 36px;
            background: #3E6EDC;
            border-radius: 6px;
            border: none;
            margin-top: 20px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            color: #FFFFFF;
            cursor: pointer;
        }
        /* add coupons css */
    </style>
    `;
};

export var empty_notif_temp = (ext_id) => {
  return `
    <div class="notifyMain">
        <div class="notification_para">
            <span>It looks like you don’t have any notifications yet.</span>
        </div>
        <div class="cat_gif_notification">
            <img src="chrome-extension://${ext_id}/assets/imgs/empty-notifications.gif" class="empty_notification_gif">
        </div>
    </div>
    <style>
        .notifyMain{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: white;
            width: 350px;
            height: 553px;
            padding: 0px 27px 0px 27px;
            box-sizing: border-box;
        }

        .notification_para {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 700;
            font-size: 21px;
            line-height: 32px;
            text-align: center;
            text-transform: capitalize;
            color: #0E1D4A;
        }

        .empty_notification_gif {
            width: 268px;
            height: 268px;
        }
    </style>
    `;
};

export var my_prof_temp = (ext_id, data) => {
  return `
    <div class="my_prof_cont" >
        <div class="mp_crd_cont" >
            ${my_prof_card(ext_id, data)}
        </div>
        ${my_prof_oth(ext_id, data)}
    </div>
    <style>
        .my_prof_cont{
            background:white;
            min-height:100%;
        }
    </style>
    `;
};

export var my_prof_card = (ext_id, data) => {
  let prof_pic =
    data.profile ||
    `chrome-extension://${ext_id}/assets/imgs/User_cicrle_duotone.png`;
  return `
    <div class="profile_wishlist">
        <div class="sub_profile_wishlist">
            <img src="${prof_pic}" class="profile_image">
        </div>
        <div class="profile_name">
            <span class="profile_name_spn">${data.name}</span>
            <p class="number_profile">+91 ${data.mobile}</p>
        </div>
        <div event_type="click" event_action="redirect_to_edit_prof" >
            <img src="chrome-extension://${ext_id}/assets/imgs/Edit_fill.png" class="change_profile">
        </div>
    </div>
    <style>
        .profile_wishlist {
            width: 350px;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #e5e5e5;
            padding: 0px 17px 0px 17px;
            box-sizing: border-box;
        }

        .profile_image {
            width: 70px;
            height: 70px;
        }
        .profile_name{
            position: absolute;
            left: 100px;
        }
        .profile_name_spn {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            color: #0E1D4A;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .number_profile {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            color: #0E1D4A;
            margin-top: 4px;
        }
        .change_profile {
            width: 24px;
            height: 24px;
        }
    </style>
    `;
};

export var my_prof_oth = (ext_id, data) => {
  console.log('my_prof_oth....', data);
  return `
    <div class="profileCont">
        <div class="howtouse">
            <div class="header_heading">
                <span>How to use?</span>
            </div>
            <div class="video_howto_use_profile">
                <img src="" class="video_fill_profile">
            </div>
        </div>
        <div class="referCrds">
            <div class="header_heading">
                <span>Refer</span>
            </div>
            <div class="refer_and-earn_profile">
                <div class="footer_para_profile">
                    <span>Refer a friend & get a chance to win Amazon vouchers Worth of ₹1000</span>
                </div>
                <div class="footer_search_box_profile" event_type="click" event_action="copy_ref_code">
                    <span class="footer_search_box">
                        https://flipshope.com/?ref=${data.fuid} 
                    </span>

                    <span class="footer_search_box_copy">Copy</span>
                </div>
            </div>
        </div>
        <div class="logoutBtn">
            <button class="auto_apply_btn" event_type="click" event_action="ren_logout" > Log Out </button>
        </div>
    </div>
    <style>
        .profileCont{
            margin-left: 14px;
            margin-right: 14px;
        }
        .header_heading {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            color: #0E1D4A;
            margin-top: 14px;
        }
        .video_howto_use_profile {
            width: 322px;
            height: 154px;
            background: #D9D9D9;
            border-radius: 6px;
            margin-top: 14px;
        }
        .refer_and-earn_profile {
            width: 322px;
            height: 130px;
            margin-top: 12px;
            background: #FFFFFF;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .footer_para_profile {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            text-align: center;
            color: #0E1D4A;
            width: 251px;
        }
        .footer_search_box_profile {
            width: 294px;
            height: 32px;
            margin-top: 18px;
            border: 1px solid rgba(14, 29, 74, 0.5);
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            position: relative;
            align-items: center;
        }
        .footer_search_box {
            width: 224px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            color: rgba(14, 29, 74, 0.5);
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding-left: 12px;
        }
        .footer_search_box_copy {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            color: #0E1D4A;
            position: absolute;
            right: 14px;
            top: 8px;
            background-color: #fff;
        }
        .logoutBtn{
            width: 322px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding-top: 22px;
        }
        .auto_apply_btn{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            text-decoration-line: underline;
            color: #C63131;
            border: none;
            background: none;
        }
        
    </style>
    `;
};

export var my_prof_sgn_out = (ext_id, data) => {
  return `
    <div class="my_prof_sgn_out_cont">
        <div class="signupCont">
            <div class="signUp_uppr">
                <div class="signUp_uppr_div">
                    <img src="chrome-extension://${ext_id}/assets/imgs/User_cicrle_duotone.png" class="signUp_uppr_img">
                </div>
                <div class="signUp_uppr_div_spn">
                    <span class="signUp_uppr_spn">Complete your SignUp Process?</span>
                </div>
                <div class="signUp_uppr_btn">
                    <button class="auto_apply_btn" event_type="click" event_action="ren_logn_scr" >Sign Up/Login</button>
                </div>
            </div>
            <div class="howtouse sign_out_htu">
                <div class="header_heading">
                    <span>How to use?</span>
                </div>
                <div class="video_howto_use_profile">
                    <img src="chrome-extension://${ext_id}/assets/imgs/Flipkart_image.png" class="video_fill_profile">
                </div>
            </div>
        </div>
    </div>
    <style>
        .my_prof_sgn_out_cont{
            background: white;
            min-height: 553px;
            max-height: 553px;
        }
        .signupCont{
            padding: 18px 14px 0px 14px;
        }
        .signUp_uppr_div{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .signUp_uppr_div_spn{
            margin-top: 22px;
        }
        .signUp_uppr_spn{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            text-align: center;
            color: #0E1D4A;
        }
        .signUp_uppr_btn{
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-top: 32px
        }
        .auto_apply_btn{
            width: 322px;
            height: 42px;
            border: none;
            background: #3E6EDC;
            border-radius: 6px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            color: #FFFFFF;
        }
        .header_heading {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            color: #0E1D4A;
            margin-top: 36px;
        }
        .video_howto_use_profile {
            width: 322px;
            height: 154px;
            background: #D9D9D9;
            border-radius: 6px;
            margin-top: 14px;
        }
        .sign_out_htu{
            padding:0px 0px 33px 0px;
        }
    </style>
    `;
};

export var save_prod_pg_temp = (ext_id, data) => {
  console.log('data from savePrdPg', data);
  return `
    <div class="save_prd_main_pg">
        <div class="sv_prod_ngc">
            ${save_prod_crd(ext_id, data.dis_data)}
            ${save_prd_offr_btn(ext_id, data.prd_wl)}
            ${save_prd_sv_item_btn(ext_id, data.prd_wl)}
        </div>
        <div class="sv_prod_gc">
        ${save_prd_prz_grph_head(ext_id)}
            <div class="my_canva_grph_cont"></div>
        </div>
    </div>
    <style>
    .save_prd_main_pg{
        background:white;
        height:100%;
        border-radius:0px 0px 10px 10px;
    }
    .sv_prod_ngc{
        padding-top:16px;
    }
    .my_canva_grph_cont{
        margin-top: 10px;
        width: 322px;
        position: relative;
        left: 14px;
        height: 214px;
    }
    </style>
    `;
};

export var save_prod_crd = (ext_id, data) => {
  return `
    <div class="cart_container">
        <div class="img_ctr_main_div invictus_image_container_div">
            <div class="img_ctr_sub_div fs_border">
                <img src="${data.image}" class="invictus_image_container">
            </div>
        </div>
        <div class='invictus_name_container_div'>
            <span class="invictus_image_heading">${data.title}</span>
            <div class="invictus_image_price">
                <div>
                    <span class="invictus_img_rs">₹ ${
                      data.starting_price
                    }</span>
                    <span class="invictus_discount">${
                      data.discount_price && `₹ ${data.discount_price}`
                    }</span>
                </div>
            </div>
        </div>
    </div>
    <style>
        .cart_container {
            width: 310px;
            height: 112px;
            background: #FFFFFF;
            border-radius: 6px;
            display: flex;
            margin: 0px 0px 0px 14px;
            box-sizing: border-box;
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
            height: 100%;
            max-width: 100%;
        }       
        .invictus_image_container_div {
            width: 25%;
            height: 112px;
            border-radius: 6px;
            margin-right: 10px;
            overflow:hidden;
        }
        .invictus_name_container_div{
            width:75%;
        }
        .invictus_image_heading {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            color: #0E1D4A;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 22px;
        }
        
        .invictus_image_price {
            display: flex;
            justify-content: space-between;
        }
        
        .invictus_img_rs {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            color: #3E4A6F;
        }
        
        .invictus_discount {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
            text-decoration-line: line-through;
            color: #3E4A6F;
        }
    </style>
    `;
};

export var save_prd_offr_btn = (ext_id, data) => {
  console.log('hi from save_prd_offr_btn', data);
  let e = (data && data.obj.min_drop) || 'Please choose';
  console.log("e vlue save btn",e);
  return `
<div class="wishlist_price_label_dropdown">
<div class="notify_choose" >
    <span>Notify When:</span>
    ${price_sel_alrt_pg(e)}
</div>
</div>
<style>
    .wishlist_price_label_dropdown{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 26px;
    }

    .notify_choose{
        width: 304px;
        height: 36px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: rgba(62, 74, 111, 0.75);
        /* background: gray; */
        border: 1px solid rgba(62, 110, 220, 0.1);
        border-radius: 6px;
        padding: 0px 0px 0px 10px;
    }

    .please_choose{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #0E1D4A;
        padding-left: 8px;
    }

    .btn_arrow{
        margin-left: 65px;
        width: 22px;
    }
    .logout_btn_container{
        display:flex;
        justify-content:center;
    }
</style>
`;
};

export var save_prd_sv_item_btn = (ext_id, data) => {
  console.log('data from save prd btn', data);
  return `
    <div class="logout_btn_container">
            <button class="auto_apply_btn sv_prd_mn_btn" event_type="click" event_action="save_prod_to_wish_list" >${
              data && data.found ? 'Update item' : 'Save Item'
            }</button>
    </div>
    <style>
    .auto_apply_btn {
        width: 304px;
        height: 36px;
        background: #3E6EDC;
        border-radius: 6px;
        border: none;
        margin-top: 14px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        color: #FFFFFF;
    }
    </style>
    `;
};

export var save_prd_prz_grph_head = (ext_id, data) => {
  return `
    <div class="price_graph_box">
        <div class="price_graph_box_heading">
            <span>Price Graph</span>
        </div>
        <div class="price_warning">
            <button class="price_7day" id="a7dpg1" event_type="click" event_action="7_day_grh" >7d</button>
            <button class="price_7day mke_me_grey" id="a7dpg2" event_type="click" event_action="45_day_grh" >45d</button>
            <button class="price_7day mke_me_grey" id="a7dpg3" event_type="click" event_action="6_mn_grh" >6m</button>
        </div>
    </div>
    <style>
    .price_graph_box {
        display: flex;
        justify-content: space-between;
        padding: 0px 14px 0px 14px;
    }
    .mke_me_grey{
        background:#999999 !important;
    }
    .price_graph_box_heading {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
        color: #0E1D4A;
        margin-top: 18px;
    }
    
    .price_warning {
        display: flex;
        align-items: center;
        text-align: center;
        margin-top: 18px;
    }
    
    .price_7day {
        width: 30px;
        height: 20px;
        background: #2158D7;
        border-radius: 2px;
        border: none;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        color: #FFFFFF;
        margin-left: 6px;
        padding: 0px;
    }
    
    </style>
    `;
};

export var flsh_sale_subs_crd = (ext_id, data, date_str) => {
  return `
    <div class="contFlashSale_subs">
        <div class="amazon_content_subs">
        <img src="${temp_ext_img_var}/logo/${data.logo}" class="onepluse_phone_img_subs">
        </div>
        <div class="amazon_main_content_subs">
        <div class="flash_product_desc_subs">
            <a class="one_Pluse_subs" target="_blank" href="${data.url}">${data.name} (${data.color},${data.variant})</a>
        </div>
        <div class="btn_subs_flash_subs">
            <p class="one_plus_time_subs">Starts in: <span class="oneplus_number_subs fls_sl_tm_cnt" dt_str="${data.date}" >${date_str}</span></p>
            <span class="edit_subs" event_type="click" coo="${data.cookie}" event_action="unsub_and_render_flash_sale" >Unsubscribe</span>
        </div>
        
        </div>
    </div>
    <style>
        .contFlashSale_subs{
            display: flex;
            box-sizing: border-box;
            padding: 9px 8px 10px 4px;
            box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
            border-radius: 8px;
            background: white;
            margin-bottom: 6px;
            position:relative;
            align-items:center;
        }
        .amazon_content_subs{
            min-width: 61px;
            min-height: 67px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #F0E8E8;
            border-radius: 4px;
            padding: 3px;
            margin-right: 6px;
            max-width: 61px;
            max-height: 67px;
        }
        .onepluse_phone_img_subs{
            width:100%;
        }
        .amazon_main_content_subs{
            min-width:241px;
        }
        .flash_product_desc_subs{}
        .subs_desc_logo_subs{
            
        }
        .one_Pluse_subs{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            line-height: 18px;
            display: flex;
            align-items: center;
            color: #0E1D4A;
            padding:0px;
            margin:0px;
        }
        .subscribed_comp_logo_subs{}
        .subs_desc_img_subs{}
        .one_plus_time_subs{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 9px;
            line-height: 14px;
            color: #353232;
        }
        .oneplus_number_subs{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 11px;
            line-height: 16px;
            color: #D01313;
        }
        .btn_subs_flash_subs{
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            position: relative;
            top: 5px;
        }
        .edit_subs{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
            line-height: 12px;
            text-decoration-line: underline;
            color: #D01313;
        }
        .remove_subs{}
    </style>
    `;
};

export var flsh_sale_unsubs_crd = (
  ext_id,
  data,
  index,
  date_str,
  site_indx,
  logo
) => {
  let vos = ``;
  for (let k in data.var) {
    for (let l in data.var[k]) {
      let os = `<option value="${l}">${l}</option>`;
      vos += os;
    }
  }
  return `
    <div class="contFlashSale my_cont_fls_sl${index}${site_indx}">
          
          <div class="amazon_main_content">
          <div class="flash_product_desc">
            <span class="one_Pluse fls_sale_prd_nm${index}">${data.name}</span>
            <p class="one_plus_time">Starts in: <span class="oneplus_number fls_sl_tm_cnt" dt_str="${data.date}" >${date_str}</span></p>
          </div>
          <div class="dropdown_choose">
            <div class="select_dropdown">
              <div>
                <p class="select_varient">Select Varient</p>
                <form>
                  <select class="wishlist_dropdown my_varnt_sel_box${index}${site_indx}" indx="${index}" site_indx="${site_indx}" event_type="change" event_action="sel_fls_sl_varnt" >
                    <option value="" disabled selected>--Select--</option>
                    ${vos}
                  </select>
                </form>
              </div>
            </div>
            <div class="select_dropdown">
              <div>
                <p class="select_varient">Select color</p>
                <form>
                  <select class="wishlist_dropdown my_colr_sel_box${index}${site_indx}" disabled indx="${index}" site_indx="${site_indx}" event_type="click" event_action="send_to_subs_fls_sl" >
                    <option value="" disabled selected>--Select--</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
      </div>


    </div>
    <style>
      .contFlashSale{
        display: flex;
        box-sizing: border-box;
        padding: 0px 0px 10px 0px;
        box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
        border-radius: 8px;
        background: white;
        margin-bottom: 6px;
      }
    
      .onepluse_phone_img{
        width: 102px;
        height: 90px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .flash_product_desc{
        position: relative;
      }
      .one_Pluse{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        color: #0E1D4A;
        width: 286px;
        // background: pink;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    
      .one_plus_time{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        text-transform: capitalize;
        color: #353232;
        margin: 0;
        position: absolute;
        top: 32px;
        right: -73px;
        display: flex;
        flex-direction: column;
        // background: red;
        // width: 100px;
      }
    
      .oneplus_number{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        text-transform: capitalize;
        color: #D01313;
      }
    
      .amazon_main_content{
        width: 222px;
        margin-top: 7px;
        margin-left: 12px;
      }
    
      .amazon_content{
        width: 106px;
        // height: 100px;
      }
    
      .dropdown_choose{
        display: flex;
        margin-top: 8px;
      }
    
      .select_varient{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 9px;
        line-height: 12px;
        display: flex;
        align-items: center;
        text-transform: capitalize;
        color: #0E1D4A;
        margin: 0;
      }
    
      input:focus,
      select:focus,
      textarea:focus,
      button:focus{
        outline: none;
      }
    
      .wishlist_dropdown{
        width: 69px;
        height: 18px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 9px;
        text-transform: capitalize;
        color: #0E1D4A;
        border: 0.5px solid rgba(33, 88, 215, 0.75);
        border-radius: 2px;
        margin-right: 12px;
      }
    </style>
    `;
};

export var flsh_sale_temp_pg = (ext_id, data, unsubs_blck, subs_prd_str) => {
  console.log(data);
  if (!data.base) return;
  for (let site in data.base) {
    console.log('this is site...', data[site]);
    // for (var i =0; i < data[site]['products'].length; i++) {
    // data.base[site]['products'].forEach((product)=>{
    //     for(let type in product['variant']){
    //         var variant_html ='';
    //         var varients = [];
    //         product['variant'][type].forEach((item)=>{
    //             if(!varients[item['variant']]) varients[item['variant']] = [];
    //             varients[item['variant']].push(item);
    //         });
    //         for(let item in varients){
    //             var color_html = '';
    //             varients[item].forEach((color)=>{
    //                 color['value'] = color['c_value'] ? color['c_value']  : 1;
    //                 // color_html += stringTemplateParser(color_temp, color);
    //             });
    //             var name = item;
    //             // variant_html+= stringTemplateParser(variant_temp,{ variant: name, colors: color_html });
    //         }
    //     }
    //     product['variants'] = variant_html;
    //     // product['stime'] = getsaledate(product['date'], 5);
    //     product['time'] = '56h : 29m : 36s';
    //     // box_html += stringTemplateParser(box_temp,product);
    // });
    // full_box_html += stringTemplateParser(site_box_temp,{logo:data[site]['logo'], box:box_html});
  }
  console.log(data);
  let contStrSubs = flsh_sale_subs_crd(ext_id, data); //flsh_sale_subs_crd(ext_id,data)
  let contStrUnSubs = ''; //flsh_sale_unsubs_crd(ext_id,data)

  // <-- DATA.BASE LOOP -->
  let db = data.base,
    newDB = {};
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
          for (let key in e) {
            if (key == 'variant' || key == 'color') continue;
            j[key] = e[key];
          }
          if (!vom[e.variant]) vom[e.variant] = {};
          vom[e.variant][e.color] = j;
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
          let j = {};
          for (let key in e) {
            if (key == 'variant' || key == 'color') continue;
            j[key] = e[key];
          }
          if (!vos[e.variant]) vos[e.variant] = {};
          vos[e.variant][e.color] = j;
        });
        o.var.spp = vos;
      }

      newDB[site]['prd'].push(o);
    });
  }

  console.log('the newDB.....', newDB);

  let sarr = [];
  for (let k in newDB) {
    let s = '';

    // s = flsh_sale_unsubs_crd(ext_id,newDB[k]);
    sarr.push(s);
  }
  console.log('this is string arr....'.sarr);
  sarr.forEach((e) => {
    contStrUnSubs += e;
  });
  // <-- DATA.BASE LOOP -->

  // <-- DATA.REG LOOP -->

  // <-- DATA.REG LOOP -->
  return `
    <div class="flsh_sale_cont_main" >
        ${flsh_sale_accrdn_un_subs(ext_id, data, 'first', true, subs_prd_str)}

        ${unsubs_blck}
    </div>
    <style>
        .flsh_sale_cont_main{
            background: white;
            padding: 16px 7px 24px 7px;
            min-height: 513px;
            overflow-y: scroll;
        }
        .flsh_sale_cont_main::-webkit-scrollbar{
            display:none;
        }
    </style>
    `;
};

export var flsh_sale_accrdn_un_subs = (
  ext_id,
  data,
  id,
  isSubs,
  contStr = '',
  site,
  s_indx
) => {
  console.log('this is fls sale data fs', data);
  if (s_indx == undefined) s_indx = 'subs';
  return `
    <ul class="accordian my_accrdin_${s_indx}">
        <li>
        <label for="${id}" fs_flssl_site="${site}">
        ${
          isSubs
            ? `
            <div class="subscribed">
                <p class="subscribed_spn">Subscribed</p>
                <img src="${temp_ext_img_var}Expand_right.png" class="expand_right">
            </div>
            `
            : `<img src="${temp_ext_img_var}/logo/${data.logo}" class="image_amazon">
            <span>
                <img src="${temp_ext_img_var}Expand_right.png" class="expand_right">
            </span>`
        }
        
        </label>
        <input type="radio" name="accordian" ${isSubs?'checked="checked"':""} id="${id}">
        <div class="content my_content_blck${s_indx}">
            ${contStr}
        </div>
        </li>
    </ul>
    <style>
    .content{
        // box-sizing: border-box !important;
        // padding: 15px 4px 21px 4px !important;
    }
    .accordian{
        width: 336px;
        padding: 0;
        margin:0px 0px 24px 0px;
    }
    
    .accordian li{
        list-style: none;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
    }

    .accordian li label{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        border: none;
        width: 336px;
        height: 36px;
    }

    
    .accordian label+input[type="radio"]{
        display: none;
    }

    .accordian .content{
        padding: 0 4px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s;
        background: #FFFFFF;
        border-radius: 8px;
    }

    .accordian label+input[type="radio"]:checked+.content{
        max-height: 400px;
        box-sizing: border-box !important;
        padding: 16px 4px 19px 4px !important;
        text-align: center;
        font-family: 'Poppins';
    }
    .expand_right{
        width: 24px;
        height: 24px;
        margin-right: 15px;
        margin-top: 5px;
    }
    .subscribed{
        border-bottom: 1px solid #E0E0E0;
        display: flex;
        justify-content: space-between;
        width: 336px;
    }
    .subscribed_spn{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #0E1D4A;
        margin: 6px 8px;
    }
    .image_amazon{
        width:61px;
        margin-left:12px;
    }
    
    </style>
    `;
};

export var login_pg_tmp = (ext_id, data,ren_frm_str='') => {
    // <div class="main_logn_pg_wrppr">
    // </div>
  return `
        <div class="main_logn_pg_cont">
            <img src="${temp_ext_img_var}icons8-multiply-24.png" class="logn_close_btn" event_type="click" event_action="close_logn_pop_mod">
            <div class="logn_pg_logo_cont">
                <img src="${temp_ext_img_var}flipshop.png" class="fs_logo_mn">
            </div>
            <img src="${temp_ext_img_var}Arrow_left_logn.png" class="logn_bck_btn" event_type="click" event_action="go_back_logn" back_to="${ren_frm_str}">  <!-- entr_mob_scrn,prm_login_scrn -->
            <div class="logn_pg_othr_temp_cont">
                ${logn_reg_frm_temp(ext_id)}
            </div>
        </div>
    <style>
    .main_logn_pg_wrppr{
        width: 100vw;
        height: 100vh;
        background: #201e1e8c;
        position: fixed;
        top: 0px;
        right: 0px;
    }
    .main_logn_pg_cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        width: 350px;
        height: 541px;
        background: #FFFFFF;
        top: -157px;
        /* right: 0px; */
        left: -373px;
        border-radius: 10px;
    }
    .logn_bck_btn{
        position: absolute;
        max-width: 24px;
        max-height: 24px;
        top: 24px;
        left: 22px;
    }
    .logn_pg_logo_cont{
        width: 100%;
    height: 136px;
    /* background: red; */
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .logn_close_btn{
        position: absolute;
        top:22px;
        right:22px;
        // width: 12px;
        // height: 12px;
    }
    .fs_logo_mn{
        width: 57px;
        height: 54px;
    }
    .logn_pg_othr_temp_cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        // background: #cddc39;
        padding: 0px 25px 25px 25px;
    }
    </style>
    `;
};

export var logn_reg_frm_temp = (ext_id, data) => {
  return `
    <form class="form_lgn_pg">
        <div class="loginFormInpCont make_it_marg">
            <label htmlFor="email">Enter Email, Phone No.</label>  
            <input type="text" id="email" class='loginFormInp lognFrmEmlInp' name='email' placeholder='Enter your registered email/mobile' />
            <span id="errLoginPgEmail" class="errMsg">Enter a valid email address or mobile number</span>
        </div>
        <div class="loginFormInpCont mrg_bot_24">
            <label htmlFor="password">Password</label>
            <div class="logn_pswrd_blck loginFormInp">
                <img src='${temp_ext_img_var}View.png' alt="" class="passwordIcon" event_type="click" event_action="toggl_psswd" passVal=false />
                <!-- <span class="logn_frgt_pswd">Forget Password?</span> -->
                <input type="password" name="password" id="password" class='psswrdInpLogn' placeholder='Enter your password' />
            </div>
            <span id="errLoginPgPass" class="errMsg">Password should contains atleast 8 charaters</span>
            <span id="errLoginPgresp" class="errMsg"></span>
        </div>
        
        <div class='loginBtn' event_type="click" event_action="send_logn_cred"  >Log In</div>
    </form>
    <div class="lineSepCont">
        <hr />
        <p>Or</p>
        <hr />
    </div>
    <div class="optionsCont">
        <div class="otherLoginOpt loginBtn mrg_bot_16" event_type="click" event_action="ren_logn_with_otp"  >
            <img src='${temp_ext_img_var}iphone-icon.png' class="icons" alt="iphone-icon" />
            <span class='btn-text'>Log in with OTP</span>
        </div> 
        <div class="otherLoginOpt loginBtn mrg_bot_16" event_type="click" event_action="ren_logn_with_ggl"  >
            <img src='${temp_ext_img_var}google.png' class="icons" alt="google-icon" />
            <span class='btn-text'>Log in with Google</span>
        </div>
        <div class="otherLognOptSpn">Don't have an account? <span class="mk_blu_logn crt_new_accnt_logn" event_type="click" event_action="ren_otp_sign_up" > Create now</span></div>
    </div>
    <style>
        .form_lgn_pg{
            font-family: 'Poppins';
            font-style: normal;
        }
        .loginFormInpCont{
            display: flex;
            flex-direction: column;
        }
        .loginFormInpCont label{
            font-size: 12px;
            margin-bottom: 6px;
            font-weight: 500;
        }
        .loginFormInp{
            width: 300px;
            height: 36px;
            background: #F5F5F5;
            border: 0.5px solid #CEC6C6;
            border-radius: 6px;
        }
        #errLoginPgEmail{
            display:none;
        }
        #errLoginPgPass{
            display:none;
            font-size:12px;
            color:red;
        }
        .lognFrmEmlInp{
            font-size: 12px;
            font-family: 'Poppins';
            font-weight: 400;
            box-sizing: border-box;
            padding: 9px 0px 9px 16px;
        }
        .logn_pswrd_blck{
            display: flex;
            flex-direction: row;
            position: relative;
        }
        .logn_frgt_pswd{
            position: absolute;
            top: -19px;
            right: 0px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            color: #3E6EDC;
        }
        .passwordIcon{
            position: absolute;
            // background: red;
            width: 18px;
            height: 18px;
            top: 9px;
            right: 16px;
        }
        .psswrdInpLogn{
            background: transparent;
            border: none;
            font-family: 'Poppins';
            font-weight: 400;
            font-size: 12px;
            padding: 0px 0px 0px 16px;
            width: 225px;
        }
        .loginBtn{
            width: 300px;
            height: 36px;
            background: #3E6EDC;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 600;
            font-size: 12px;
            font-family: 'Poppins';
            font-style: normal;
        }
        .lineSepCont{
            display: flex;
            flex-direction: row;
            margin: 34px 0px 32px 0px;
            width:300px;
        }
        .lineSepCont hr{
            width: 140px;
            height: 1px;
            background-color: #9e9e9e;
            border: none;
            margin: 9px 0px 0px 0px;
        }
        .lineSepCont p{
            margin: 0px 21px 0px 21px;
            font-family: 'Poppins';
            font-weight: 500;
            font-size: 12px;
            color:#9e9e9e;
        }
        .otherLoginOpt{
            background: white;
            color: rgba(24, 31, 41, 0.85);
            font-weight: 500;
            font-size: 12px;
            border: 1px solid rgba(24, 31, 41, 0.85);
        }
        .otherLognOptSpn{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            /* line-height: 18px; */
            color: #0E1D4A;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mk_blu_logn{
            font-weight: 600;
            color: #3E6EDC;
            margin-left: 4px;
        }
        .icons{
            width: 21px;
            height: 21px;
            margin-right: 9px;
        }
        .make_it_marg{
            margin-bottom: 10px;
        }
        .mrg_bot_24{
            margin-bottom: 24px;
        }
        .mrg_bot_16{
            margin-bottom: 16px;
        }
    </style>
    `;
};

export var logn_pg_otp_tmp = (ext_id, data) => {
  return `
    <div class="logn_wth_otp_cont">
        ${label_wth_inp({
          wrp_clss: 'lwo_lbl_inp_wrp',
          lbl_for: 'mbl',
          lbl_txt: 'Enter mobile no.',
          inp_typ: 'tel',
          inp_id: 'mbl',
          inp_clss: 'lwo_inp',
          inp_name: 'mobile',
          inp_plc_hldr: 'Enter Mobile No.',
          err_spn_id: 'lwo_inp_spn_err1',
          err_spn_clss: 'lwo_inp_spn_err',
          err_spn_msg: 'please enter valid input',
          maxlength:"10"
        })}
        <div class="lgn_wth_otp_trm_msg">
            By continuing, I agree to the <span class="mk_it_blu_lgn_otp" event_type="click" event_action="ren_terms_of_use" >Terms of Use</span> &
            <span class="mk_it_blu_lgn_otp" event_type="click" event_action="ren_privcy_polcy" >Privacy Policy</span>
        </div>
        <div class='lgn_otp_nxt_btn logn_nxttt' event_type="click" event_action="snd_logn_otp" >Next</div>
        <div class="lgn_otp_nxt_btn lgn_otp_wth_ggl" event_type="click" event_action="ren_logn_with_ggl" >
            <img src='${temp_ext_img_var}google.png' class="icons" alt="google" />
            <span class='lgn_otp_wth_ggl_txt'>Continue with Google</span>
        </div>
    </div>
    <style>
        .logn_wth_otp_cont{}
        .lgn_wth_otp_trm_msg{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            color: #333333;
            margin: 15px 0px 165px 0px;
        }
        .mk_it_blu_lgn_otp{
            font-weight: 600;
            color: #3E6EDC;
            margin-left: 4px;
        }
        .lgn_otp_nxt_btn{
            width: 300px;
            height: 36px;
            background: #3E6EDC;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 600;
            font-size: 12px;
            font-family: 'Poppins';
            font-style: normal;
            margin-bottom: 18px;
        }
        .lgn_otp_wth_ggl{
            background: white;
            color: rgba(24, 31, 41, 0.85);
            font-weight: 500;
            font-size: 12px;
            border: 1px solid rgba(24, 31, 41, 0.85);
        }
        .icons{
            width: 21px;
            height: 21px;
            margin-right: 9px;
        }
        .lgn_otp_wth_ggl_txt{}
    </style>
    `;
};

export var label_wth_inp = (p) => {
  return `
    <div class="${p.wrp_clss}">
        <label htmlFor="${p.lbl_for}">${p.lbl_txt}</label>  
        <input type="${p.inp_typ}" ${p.inp_typ == 'tel'? "maxlength='10'" :""} id="${p.inp_id}" class='${p.inp_clss}' name='${p.inp_name}' placeholder='${p.inp_plc_hldr}' />
        <span id="${p.err_spn_id}" class="${p.err_spn_clss}">${p.err_spn_msg}</span>
    </div>
    <style>
        .${p.wrp_clss}{
            display: flex;
            flex-direction: column;
            font-family: 'Poppins';
            font-style: normal;
        }
        .${p.inp_clss}{
            width: 300px;
            height: 36px;
            background: white;
            border: 0.5px solid #CEC6C6;
            border-radius: 6px;
            box-sizing: border-box;
            padding-left: 16px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
        }
        .${p.wrp_clss} label{
            font-weight: 500;
            font-size: 13px;
            color: #333333;
            margin-bottom:6px;
        }
        .${p.err_spn_clss}{
            display: none;
            color:red;
            font-size:12px;
        }
    </style>
    `;
};

export var logn_pg_vrfy_otp_tmp = (ext_id, data) => {
  return `
    <div class="verf_otp_main_wrppr">
        <div class="verf_otp_uppr_cont">
            <span class="verf_otp_head">Verify OTP</span>
            <span class="verf_otp_mob_num">Sent via SMS to ${
              data.mobStr
            }</span>
            <span class="verf_otp_chng_num" event_type="click" event_action="change_num_action" >Change number</span>
            <div class="verf_otp_inp_wrpr">
                <span class="verf_otp_resnd_msg">Resend in 23s</span>
                ${logn_pg_otp_inp_tmp()}
                <span class="verf_otp_error_msg"></span>
            </div>
        </div>
        <div class='verf_otp_rsnd_btn verf_otp_verf_btn' event_type="click" event_action="resend_otp" ren_from="${
          data.msgStr
        }" >Resend OTP</div>
        <div class='verf_otp_rsnd_btn verf_btn_submt' event_type="click" event_action="send_input_otp" ren_from="${
          data.msgStr
        }" >Verify OTP</div>
    </div>
    <style>
    .verf_otp_main_wrppr{
        display: flex;
        flex-direction: column;
        font-family: Poppins;
        font-style: normal;
        align-items: center;
    }
    .verf_otp_uppr_cont{
        display: flex;
        flex-direction: column;
        margin-bottom: 165px;
    }
    .verf_otp_chng_num{
        position: relative;
        top: -55px;
        left: 191px;
        font-weight: 400;
        font-size: 12px;
        color: #3e6edc;
        text-decoration: underline;
    }
    .verf_otp_head{
        font-weight: 500;
        font-size: 15px;
        color: #333333;
    }
    .verf_otp_mob_num{
        font-weight: 400;
        font-size: 12px;
        color: #828282;
        margin: 4px 0px 36px 0px;
    }
    .verf_otp_inp_wrpr{
        position:relative;
    }
    .verf_otp_resnd_msg{
        font-weight: 500;
        font-size: 13px;
        color: #C22626;
        position:absolute;
        top:-27px;
        right:0px;
    }
    .verf_otp_error_msg{
        font-weight: 500;
        font-size: 13px;
        color: #C22626;
        position:absolute;
        top:50px;
        right:0px;
        display:none;
    }
    .verf_otp_rsnd_btn{
        width: 300px;
        height: 36px;
        background: #3E6EDC;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: 600;
        font-size: 12px;
        font-family: 'Poppins';
        font-style: normal;
        margin-bottom: 18px;
    }
    .verf_otp_verf_btn{
        background: white;
        color: rgba(24, 31, 41, 0.85);
        font-weight: 500;
        font-size: 12px;
        border: 1px solid rgba(24, 31, 41, 0.85);
    }
    </style>
    `;
};

export var logn_pg_otp_inp_tmp = (ext_id) => {
  return `
    <form class="lov_form">
        <input class="lov_inp" type="text" id="digit-1" name="digit-1" data-next="digit-2" event_type="input" event_action="otp_inp_focus" maxlength="1" />
        <input class="lov_inp make_spc" type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" event_type="input" event_action="otp_inp_focus" maxlength="1" />
        <input class="lov_inp" type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" event_type="input" event_action="otp_inp_focus" maxlength="1" />
        <input class="lov_inp make_spc" type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" event_type="input" event_action="otp_inp_focus" maxlength="1" />
        <input class="lov_inp" type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" event_type="input" event_action="otp_inp_focus" maxlength="1" />
        <input class="lov_inp mk_spc_lft" type="text" id="digit-6" name="digit-6" data-previous="digit-5" event_type="input" event_action="otp_inp_focus" maxlength="1" />
    </form>
    <style>
    .lov_form{
        display:flex;
    }
    .lov_inp{
        width: 36px;
        height: 36px;
        background: #F2F2F2;
        border: 1px solid #BDBDBD;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 0px 0px 0px 12px;
    }
    .make_spc{
        margin: 0px 14px 0px 14px;
    }
    .mk_spc_lft{
        margin-left:14px;
    }
    </style>
    `;
};

export var logn_pg_sign_up_tmp = (ext_id) => {
  return `
    <div class="logn_sgnup_main_wrpr">
        <span class="logn_sgnup_head">Set-up Your Account</span>
        <form class="logn_sgnup_frm_wrpr">
        ${label_wth_inp({
          wrp_clss: 'log_signup_lbl_inp_wrp',
          lbl_for: 'name',
          lbl_txt: 'Name',
          inp_typ: 'text',
          inp_id: 'name',
          inp_clss: 'log_signup_inp',
          inp_name: 'name',
          inp_plc_hldr: 'Enter Full Name',
          err_spn_id: 'log_signup_inp_spn_err1',
          err_spn_clss: 'log_signup_inp_spn_err',
          err_spn_msg: 'please enter valid name',
        })}
        <div class="mrgn_wrpr_log_sgnup">
            ${label_wth_inp({
              wrp_clss: 'log_signup_lbl_inp_wrp',
              lbl_for: 'email',
              lbl_txt: 'Email Address',
              inp_typ: 'text',
              inp_id: 'email',
              inp_clss: 'log_signup_inp',
              inp_name: 'email',
              inp_plc_hldr: 'Enter Email Address',
              err_spn_id: 'log_signup_inp_spn_err1',
              err_spn_clss: 'log_signup_inp_spn_err',
              err_spn_msg: 'please enter valid email',
            })}
        </div>
        ${label_wth_inp({
          wrp_clss: 'log_signup_lbl_inp_wrp',
          lbl_for: 'password',
          lbl_txt: 'Create Password',
          inp_typ: 'text',
          inp_id: 'password',
          inp_clss: 'log_signup_inp',
          inp_name: 'password',
          inp_plc_hldr: 'Create Password',
          err_spn_id: 'log_signup_inp_spn_err1',
          err_spn_clss: 'log_signup_inp_spn_err',
          err_spn_msg: 'please enter valid password',
        })}
        <div class='logn_sgnup_btn' event_type="click" event_action="submit_sign_up" >Create Account</div>
        <div class='logn_skip_btn' event_type="click" event_action="skip_sign_up" >Skip</div>
        </form>
    </div>
    <style>
        .logn_sgnup_main_wrpr{
            font-family:Poppins;
            font-style:normal
        }
        .logn_sgnup_head{
            font-weight: 500;
            font-size: 15px;
            color: #333333;
        }
        .logn_sgnup_frm_wrpr{
            margin-top:18px;
        }
        .mrgn_wrpr_log_sgnup{
            margin: 10px 0px 10px 0px;
        }
        .logn_sgnup_btn{
            width: 300px;
            height: 36px;
            background: #3E6EDC;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 600;
            font-size: 12px;
            font-family: 'Poppins';
            font-style: normal;
            margin-top: 40px;
        }
        .logn_skip_btn{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #3E6EDC;
            font-weight: 600;
            font-size: 14px;
            font-family: 'Poppins';
            font-style: normal;
            margin-top: 24px;
        }
    </style>
    `;
};

export var log_out_conf_popup = () => {
  return `
    <div class="log_out_conf_pop_main">
        <div class="log_out_conf_pop_spn_cont">
            <span class="log_out_pop_spn_1">Are you logging out?</span>
            <span class="log_out_pop_spn_2">Come back soon!</span>
        </div>
        <div class="log_out_conf_pop_btn_cont">
            <div class="log_out_conf_pop_btn_log_out" event_type="click" event_action="pls_log_out" >Log Out</div>
            <div class="log_out_conf_pop_btn_cancel" event_type="click" event_action="cancel_log_out" >Cancel</div>
        </div>
    </div>
    <style>
    .log_out_conf_pop_main{
        width: 268px;
        height: 144px;        
        background: #FFFFFF;
        border-radius: 10px;
        font-family: 'Poppins';
        font-style: normal;
        padding: 18px 0px 0px 0px;
    }
    .log_out_conf_pop_spn_cont{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }
    .log_out_pop_spn_1{
        font-weight: 600;
        font-size: 16px;
        color: #0E1D4A;
    }
    .log_out_pop_spn_2{
        font-style: italic;
        font-weight: 500;
        font-size: 10px;
        color: #3E6EDC;
        margin-top: 6px;   
    }
    .log_out_conf_pop_btn_cont{
        display:flex;
        flex-direction: row;
        width:100%;
        justify-content: center;
        align-items: center;
        margin-top:22px;
    }
    .log_out_conf_pop_btn_log_out{
        width: 92px;
        height: 36px;
        background: #3E6EDC;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 10px;
        color:white;
    }
    .log_out_conf_pop_btn_cancel{
        width: 92px;
        height: 36px;
        border: 1px solid #0E1D4A;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 18px;
        font-weight: 600;
        font-size: 10px;
        color:#0E1D4A;
    }
    </style>
    `;
};

export var save_prod_prc_list = (data) => {
  console.log('save_prod_prc_list temp', data);
  let e = (data && data.obj.is_prc_drp) || '';
  return `
    <div class="">
        <div class="save_prod_prc_list_cont">
            <div class="save_prod_prc_list_head">Select Price Drop</div>
            <div class="save_prod_prc_list_othr">
                <div class="save_prod_prc_row">
                    <label for="prc1" class="save_prod_prc_lbl">Any</label>
                    <input type="radio" class="save_prod_prc_inp" id="prc1" name="price" value="Any" event_type="click" event_action="set_prc_drop_in_prd" ${
                      e == 'Any' && 'checked'
                    } >
                </div>
                <div class="save_prod_prc_row">
                    <label for="prc2" class="save_prod_prc_lbl">10 %</label>
                    <input type="radio" class="save_prod_prc_inp" id="prc2" name="price" value="10%" event_type="click" event_action="set_prc_drop_in_prd" ${
                      e == '10%' && 'checked'
                    } >
                </div>
                <div class="save_prod_prc_row">
                    <label for="prc3" class="save_prod_prc_lbl">20 %</label>
                    <input type="radio" class="save_prod_prc_inp" id="prc3" name="price" value="20%" event_type="click" event_action="set_prc_drop_in_prd" ${
                      e == '20%' && 'checked'
                    } >
                </div>
                <div class="save_prod_prc_row">
                    <label for="prc4" class="save_prod_prc_lbl">50 %</label>
                    <input type="radio" class="save_prod_prc_inp" id="prc4" name="price" value="50%" event_type="click" event_action="set_prc_drop_in_prd" ${
                      e == '50%' && 'checked'
                    } >
                </div>
            </div>
        </div>
    </div>
    <style>
    .save_prod_prc_list_main_cont{
        height: 605px;
        width: 100%;
        background: #0d0c0c8a;
        position: absolute;
        top: 0px;
    }
    .save_prod_prc_list_cont{
        height: 199px;
        width: 100%;
        background: white;
        position: absolute;
        bottom: 0px;
        border-radius: 10px 10px 0px 0px;
    }
    .save_prod_prc_list_head{
        height: 41px;
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        color: #111111;
        text-align: center;
        padding-top: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #80808080;
    }
    .save_prod_prc_list_othr{
        height:158px;
        width:100%;
    }
    .save_prod_prc_row{
        font-family: Poppins;
        font-weight: 600;
        font-size: 12px;
        display: flex;
        align-items: center;
        color: #111111;
        display: flex;
        justify-content: space-between;
        height: 34px;
        box-sizing: border-box;
        padding: 0px 10px 0px 10px;
    }
    .save_prod_prc_lbl{
    }
    .save_prod_prc_inp{

    }
    </style>
    `;
};

export var save_prod_prc_log_out_mod = () => {
  return `
    <div class="">
        <div class="save_prod_prc_list_logn">
            <div class="svppll_head">Login to Get Price Drop!</div>
            <div class="svppll_btn_cont">
                <div class="svppll_btn make_it_blue" event_type="click" event_action="ren_logn_scr" >Log In</div>
                <div class="svppll_btn" event_type="click" event_action="cls_svppll_modal" >Cancel</div>
            </div>
        </div>
    </div>
    <style>
        .save_prod_prc_list_main_cont{
            height: 554px;
            width: 100%;
            background: #0d0c0c8a;
            position: absolute;
            top: 47px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0px 0px 10px 10px;
        }
        .save_prod_prc_list_logn{
            width: 268px;
            height: 127px;
            background: #FFFFFF;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        .svppll_head{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #0E1D4A;
            text-align:center;
        }
        .svppll_btn_cont{
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0px 36px 0px 36px;
        }
        .svppll_btn{
            width: 92px;
            height: 36px;
            background: white;
            border-radius: 6px;
            display: flex;
            border: 1px solid #0E1D4A;
            justify-content: center;
            align-items: center;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 10px;
        }
        .make_it_blue{
            background:#3E6EDC;
            color:white;
            border:none;
        }
    </style>
    `;
};

export var save_prod_prc_succ_popup = (str = '') => {
  return `
    <div class="">
        <div class="save_prod_prc_wlm">
            <img src="chrome-extension://${ext_id}/assets/imgs/91749-done.gif" class="save_prod_prc_wlm_gif">
            <span class="save_prod_prc_wlm_spn">${str}</span>
        </div>
    </div>
    <style>
    .save_prod_prc_list_main_cont{
        height: 601px;
        width: 100%;
        background: #0d0c0c8a;
        position: absolute;
        top: 0px;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius: 0px 0px 10px 10px;
    }
    .save_prod_prc_wlm{
        width: 218px;
        height: 130px;
        background: #FFFFFF;
        border-radius: 8px;
        font-family: 'Poppins';
        font-style: normal;        
        color: #333333;
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    .save_prod_prc_wlm_gif{
        height: 100px;
        width: 100px;
    }
    .save_prod_prc_wlm_spn{
        font-weight: 500;
        font-size: 16px;
    }
    </style>
    `;
};

export var add_store_popup = () => {
  return `
    <div class="add_store_cont">
        <img src="chrome-extension://${ext_id}/assets/imgs/icons8-multiply-24.png" class="add_store_close_btn" event_type="click" event_action="close_add_store_modal" >
        <img src="chrome-extension://${ext_id}/assets/imgs/add_store_gif.gif" class="add_store_gif">
        <span class="add_store_title">Come here often?</span>
        <span class="add_store_detail">just say the word and we’ll support this store.</span>
        <div class="add_store_btn" event_type="click" event_action="add_store_request" >Add store</div>
    </div>
    <style>
    .add_store_close_btn{
        width: 24px;
        height: 24px;
        position:absolute;
        top:14px;
        right:16px;
    }
    .add_store_cont{
        width: 410px;
        height: 410px;
        background: #FFFFFF;
        border-radius: 16px;
        position: relative;
        top: -213px;
        /* right: 64px; */
        margin:auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
    }
    .add_store_gif{
        width: 182px;
        height: 167px;
    }
    .add_store_title{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #000000;
        margin: 7px 0px 6px 0px;
    }
    .add_store_detail{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        color: rgba(24, 31, 41, 0.85);
        margin: 0px 0px 46px 0px;
    }
    .add_store_btn{
        width: 330px;
        height: 40px;
        background: #2158D7;
        border-radius: 20px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
    `;
};

export var pg_popup_temp = (data, prc_obj) => {
  console.log('popup template prc-graph..', prc_obj);
  return `
<style>

.price_7day_w{
    width: 176px;
    height: 46px;
    left: 846px;
    top: 432px;
    background: #2158D7;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #F2F2F2;
}
.mke_me_grey{
    background:#F2F2F2,
}
.price_warning_w{
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 18px;
    position: relative;
    left: -7px;
    padding: 0px 0px 30px 14px;
}

#pw-wrapper{
  width: 100vw;
  height: 100vh;
  text-align: center;
  vertical-align: middle;
  margin: auto;
  background-color: rgba(0,0,0,.5) !important;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2147483647;
}
#wp-container-wrapper{
    position: relative;
}
#wp-container {    
  position: relative;
  z-index: 2147483647;
  width: 100%;
  font-family: rubik, sans-sarif;
  background: white;
  margin: auto;
  margin-top: 50px;
  text-align: center;
  padding: 0 20px;
  float: left;
  width: calc(100% - 380px);
  margin: 0;
}
.wp-hdr-img {
  width: 126px;
  height: 31px;
  margin-left: 8px;
  margin-top: 11px;
}
#wp-success {
  color: black;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
}
#wp-item {
  / width: 150px; /
  height: 135px;
}
#wp-fix {
  width: 170px;
  padding-left: 25px;
}
#wp-link {
  padding: 0px 0px 0px 22px;
  color: #7a56f7;
}
#wp-notif {
  width: 169px;
  padding-left: 25px;
  / padding: 18px 157px 0px 38px; /
}
#wp-Nlink {
  / padding: 18px 0px 0px 26px; /
  color: #7a56f7;
}
#wp-dis {
  / padding-top: 18px; /
}
button:focus,
button:active,
button:hover {
  border: none;
  outline: none;
  / color: white; /
  / background: #7a56f7; /
}
#wp-view {
  color: #787878;
  font-size: 14px;
  padding: 21px 29px 0px 115px;
}
#wp-num {
  font-size: 14px;
  color: #0c5796;
  padding: 21px 0px 0px 0px;
}
.close-fsaacpb {
  position: absolute;
  top: 15px;
  right: 15px;
  line-height: 11px;
  font-weight: 900;
  color: #808080bd;
  cursor: pointer;
}
#c-ftr {
  color: white;
  text-align: center;
  background-color: #0c5796;
  font-family: sans-serif;
  padding: 5px;
  margin-top: 19px;
  font-size: 15px;
  margin: 20px -20px 0;
}
#c-ftr:before {
  content: "\\00A9";
}
#c-hdr{
    text-align: left;
    font-weight: 600;
    font-family: sans-serif;
    padding: 15px 0;
    font-size: 24px;
    border-bottom: solid #0c5796 2px;
    color: #07365e;
    margin-bottom: 15px;
}
#wp-dropbtn-color {
  background-color: white;
  color: #787878;
  padding: 13px;
  font-size: 16px;
  width: 365px;
  height: 45px;
  border: 1px solid #787878;
  cursor: pointer;
}

#wp-dropdown-color {
  text-align: center;
  margin: 27px 0px 0px 0px;
}

#wp-dropbtn-style {
  background-color: white;
  color: #787878;
  padding: 13px;
  font-size: 16px;
  width: 365px;
  height: 45px;
  border: 1px solid #787878;
  cursor: pointer;
}

#wp-dropdown-style {
  text-align: center;
  margin: 27px 0px 0px 0px;
}

.arrow {
  border: solid black;
  border-width: 0 2px 2px 0;
  padding: 3px;
  float: right;
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.arrow-top div{
  width: 12px;
  height: 12px;
  transform: rotateZ(45deg);
    background: white;
  box-shadow: -3px -3px 2px -1px grey;
}

.arrow-top {
    position: absolute;
    top: -4px;
    left: 150px;
}
#pw-close{
    width: 24px;
    height: 25px;
    display: inline-block;
    font-family: sans-serif;
    font-size: 20px;
    color: white;
    font-weight: 300;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 21px;
    // background: #0c5796a6;
}
table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  font-family: rubik,Arial,sans-serif;
  text-align: left;
  padding: 12px 7px;
  font-size: 17px;
}

tr:nth-child(even) {
  background-color: #dddddd4f;
}
.ryt-div{
  font-family: rubik,Arial,sans-serif;
  width: 380px;
  display: inline;
  background: white;
  float: left;
}
.wrapper2{
    width: 1500px;
    margin: auto;
    width: 90%;
    max-width: 1400px;
    margin-top: 50px;
    background: white;
    padding: 0 20px;
    position: relative;
}
.wrapper2_img{
  height: 30px;
  margin: -5px 0;
  padding-right: 5px;
}
.wrapper3{
  display: flex;
}
.p_title{
  font-size:20px;
  font-weight: 600;
  color: darkslategrey;
  margin: 20px 0;
  text-align: left;
  max-height: 75px;
  min-height: 25px;
  overflow: hidden;
  line-height: 25px;
  font-family: 'Poppins';
}
.p_tnc{
    font-size: 14px;
    font-weight: 600;
    color: black;
    font-family: sans-serif;
    margin-top: 20px;
    text-align: left;
}
th{
  font-weight: 600;
  color: darkslategrey;
}
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap');
@media (max-width: 1000px) {
  #wp-container{
    width:100%;
  }
  .ryt-div{
    display:none;
  }
}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet">
<div id="pw-wrapper" class="pw-close">
    <div class="wrapper2">
  <img src="chrome-extension://${ext_id}/assets/imgs/icons8-multiply-24.png" id="pw-close" event_type="click" event_action="close_prc_grph_modal" />
  <div id="c-hdr"><img src="${temp_ext_img_var}Logo_prc_graph.png" class="wrapper2_img"></div>
  <div class="wrapper3">
    <div id="wp-container">
        <canvas id="fs_container" width="1000px" height="400px" ></canvas>
    </div>
    <div class="ryt-div">
      <div class="p_title">${data.prd_sel_data.title}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Price</th>
            <th>Date</th>
          </tr>
          <tr>
            <td>Current</td>
            <td>₹${prc_obj.curr_prc.p}</td>
            <td>${prc_obj.curr_prc.d}</td>
          </tr>
          <tr>
            <td>Max</td>
            <td>₹${prc_obj.max_prc.p}</td>
            <td>${prc_obj.max_prc.d}</td>
          </tr>
          <tr>
            <td>Min</td>
            <td>₹${prc_obj.min_prc.p}</td>
            <td>${prc_obj.min_prc.d}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>₹${prc_obj.avg_prc}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div class="price_warning_w">
        <button class="price_7day_w" id="a7dpg3_w" event_type="click" event_action="6_mn_grh" >Get 6 Month Graph ></button>
      </div>
    </div>
  </div>
`;
};

export var bckgrnd_main = `<div class="bckgrnd_cont" event_type="click" event_action="6_mn_grh" >
</div>
<style>
.bckgrnd_cont{
    width: 100vw;
    height: 100vh;
    text-align: center;
    vertical-align: middle;
    margin: auto;
    background-color: rgba(0,0,0,.5) !important;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2147483644;
}
</style>
`;

export var aac_popup_temp = (data) => {
  return `
<div class="aac_pp_main_cont">
    <div class="aac_pp_hdr">
        <div class="aac_pp_logo_cont">
            <img src='${temp_ext_img_var}fs_new_curr_logo.png' alt="" class="fs_logo_img_aac" />
        </div>
        <div class="aac_pp_cls_cont">
            <img src='${temp_ext_img_var}icons8-multiply-24.png' alt="" class="fs_cls_img_aac" event_type="click" event_action="cls_aac_main_pp" />
        </div>
    </div>
    <div class="aac_pp_content">
        <div class="aac_pp_gif_cont">
            <img src='${temp_ext_img_var}aac_animation.gif' alt="" class="fs_cpn_gif_img_aac" />
        </div>
        <div class="aac_pp_detl_cont">
            <h2 class="aac_detl_head">COUPONS FOUND!</h2>
            <p class="aac_detl_para">
                We searched high and low to make
                sure you’re not missing out on any
                coupons or deals.
            </p>
        </div>
        <div class="aac_pp_cpns_cnt_cont">
            <span class="aac_pp_cnt_key">Coupon Codes</span>
            <span class="aac_pp_cnt_val">${data}</span>
        </div>
        <div class="aac_pp_btn_lnk_cont">
            <button class="aac_pp_apply_cpn_btn" event_type="click" event_action="start_aac_func" >Auto Apply</button>
            <span class="aac_pp_mnl_cpn_lnk" event_type="click" event_action="opn_more_cpn_side_btn" sub_action="enter_manually" >Enter Code Manually</span>
        </div>
    </div>
</div>
<style>
.aac_pp_main_cont{
    width: 350px;
    height: 652px;
    background: #FFFFFF;
    border-radius: 10px;
    position: absolute;
    top: -219px;
    right: 36px;
}
.aac_pp_hdr{

}
.aac_pp_logo_cont{
    position: relative;
}
.fs_logo_img_aac{
    width:88px;
    height:24px;
    position: absolute;
    top: 10px;
    left: 14px;
}
.aac_pp_cls_cont{
    position: relative;
}
.fs_cls_img_aac{
    position: absolute;
    top: 14px;
    right: 16px;
}
.aac_pp_content{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 110px;
}
.aac_pp_gif_cont{
    width: 100%;
    height: 182px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fs_cpn_gif_img_aac{
    width: 52%;
    border-radius: 100%;
}
.aac_pp_detl_cont{

}
.aac_detl_head{
    font-family: 'Scheherazade';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 57px;
    /* display: flex; */
    /* align-items: center; */
    text-align: center;
    letter-spacing: 0.04em;
    color: #0E1D4A;
    margin-bottom: 10px;
}
.aac_detl_para{
    margin: 0px 0px 0px 0px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: rgba(34, 56, 122, 0.75);
}
.aac_pp_cpns_cnt_cont{
    margin: 44px 0px 0px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px 0px 20px;
    box-sizing: border-box;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    /* display: flex; */
    /* align-items: center; */
    text-align: center;
    color: #0E1D4A;
}
.aac_pp_cnt_key{

}
.aac_pp_cnt_val{

}
.aac_pp_btn_lnk_cont{
    display: flex;
    flex-direction: column;
    margin: 36px 0px 0px 0px;
    align-items: center;
}
.aac_pp_apply_cpn_btn{
    width: 322px;
    height: 42px;
    background: #3E6EDC;
    border-radius: 6px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #FFFFFF;
    margin-bottom: 12px;
    border:none;
    cursor:pointer;
}
.aac_pp_apply_cpn_btn:focus{
    outline: none;
}

.aac_pp_mnl_cpn_lnk{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    text-decoration-line: underline;
    color: rgba(14, 29, 74, 0.75);
    cursor:pointer;
}
</style>
`;
};

export var cpn_processing_temp = (cpn_pallt) => {
  return `
    <div class="cpn_processing_temp_main_cont ">
        <div class="cpn_processing_temp_cls_cont">
            <img src='${temp_ext_img_var}icons8-multiply-24.png' alt="" class="cpn_processing_temp_cls" event_type="click" event_action="cls_cpn_procssng_pp" cont_elem="cpn_processing_temp_main_cont" />
        </div>
        <div class="cpn_prssng_temp_head_cont">
            <p class="cpn_prssng_temp_para">Flipshope is searching for
            the best coupon!</p>
        </div>
        <div class="cpn_prssng_temp_animtn_cont">
            ${cpn_pallt}
        </div>
        <div class="cpn_prssng_temp_logo_cont">
        <img src='${temp_ext_img_var}fs_new_curr_logo.png' alt="" class="cpn_prssng_temp_logo" />
        </div>
    </div>
    <style>
    .cpn_processing_temp_main_cont{
        width: 424px;
        height: 498px;
        background: #FFFFFF;
        border-radius: 10px;
        display:flex;
        flex-direction:column;
        align-items:center;
        position:relative;
    }
    .cpn_processing_temp_cls_cont{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 23px;
        height: 23px;
    }
    .cpn_processing_temp_cls{
        width:100%;
    }
    .cpn_prssng_temp_head_cont{
        margin-top: 49px;
    }
    .cpn_prssng_temp_para{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #0E1D4A;
        width: 270px;
    }
    .cpn_prssng_temp_animtn_cont{
        width: 230px;
        height: 132px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        // background: rebeccapurple;
        margin: 50px 0px 71px 0px;
        position:relative;
    }
    .cpn_prssng_temp_logo_cont{
        width: 151px;
        height: 38px;
    }
    .cpn_prssng_temp_logo{
        width:100%;
    }
    </style>
    `;
};

export var procssng_aac_cpns_button = (coupon, key) => {
  return `
    <button class="aac_procssng_cpn_blck ${
      key == 0 ? 'crrnt_cpn' : ''
    }" aac_cpn_blck_sss_key="${key}">
    ${coupon}
    </button>
    <style>
    .aac_procssng_cpn_blck{
        width: 202px;
        height: 62px;
        background: rgba(33, 88, 215, 0.25);
        border-radius: 6px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        letter-spacing: 0.04em;
        color: #FBDD01;
        margin: 10px 0px;
        border: none;
        transition: 2s;
    }
    .crrnt_cpn{
        background: #2158D7 !important;
    }
    </style>
    `;
};

export var flash_sale_side_popup = (data) => {
  return `
<div class="flsh_sale_spp_cont_blck">
    <div class="flsh_sale_spp_logo_cont">
        <img src='${temp_ext_img_var}icon-128.png' alt="" class="flsh_sale_spp_logo" />
    </div>
    <div class="flsh_sale_spp_detl_cont">
        <p class="flsh_sale_spp_detl_para" id= "flsh_sale_msg">
            ${data}
        </p>
    </div>
</div>
<style>
.flsh_sale_spp_cont_blck{
    width: 350px;
    height: 100px;
    position:fixed;
    bottom:50px;
    left:50px;
    border-radius: 10px;
}
.flsh_sale_spp_logo_cont{
    width: 78px;
    height: 100px;
    background: #E9F2FF;
    display:flex;
    float:left;
    justify-content:center;
    align-items:center;
}
.flsh_sale_spp_logo{
    width: 80%;
}
.flsh_sale_spp_detl_cont{
    width: 272px;
    height: 100px;
    background: #2158D7;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 11.7531px;
    line-height: 18px;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
    float:left;
}
.flsh_sale_spp_detl_para{
    margin:0px;
    padding:20px;
}
</style>
`;
};

export var flash_sale_reg_side_popup = (data) => {
  return `
    <button class="flsh_sale_reg_spp_cont_blck" event_type="click" event_action="flash_sale_reg" value="${data}" >
        <div class="flsh_sale_reg_spp_detl_cont">
            <p class="flsh_sale_reg_spp_detl_para" id= "flsh_sale_msg">
                register for sale
            </p>
        </div>
    </button>
    <style>
    .flsh_sale_reg_spp_cont_blck{
        border:none;
        cursor:pointer;
        width: 150px;
        padding: 0;
        height: 40px;
        position:fixed;
        bottom:50px;
        left:30px;
        border-radius: 10px;
    }
    .flsh_sale_reg_spp_detl_cont{
        background: #2158D7;
        font-family: 'Poppins';
        font-style: normal;
        line-height: 18px;
        font-size: 14px;
        line-height: 20px;
        color: #FFFFFF;
        width:100%;
    }
    .flsh_sale_reg_spp_detl_para{
        margin: 0px;
        padding: 0 20px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
    `;
};

export var succs_aac_popup = (data) => {
  return `
    <div class="succs_aac_popup_cont">
        <div class="succs_aac_popup_cls_btn_cont">
            <img src='${temp_ext_img_var}icons8-multiply-24.png' alt="" class="succs_aac_popup_cls_btn" event_type="click" event_action="cls_curr_pp" cont_elem="succs_aac_popup_cont" />
        </div>      
        <div class="succs_aac_popup_head_cont">
            <h3 class="succs_aac_popup_frst_head">You saved</h3>
            <h1 class="succs_aac_popup_secnd_head">₹${data['total_dis']}</h1>
        </div>
        <div class="succs_aac_popup_prc_lst_cont">
            <div class="succs_aac_popup_orign_prc_cont">
                <span class="orgn_prc_key">Original price</span>
                <span class="orgn_prc_val">${data['start_price']}</span>
            </div>
            <div class="succs_aac_popup_fs_prc_cont">
                <span class="fs_prc_key">With Flipshope</span>
                <span class="fs_prc_val">${data['final_price']}</span>
            </div>
        </div>
        <div class="succs_aac_popup_prc_btn_cont">
            <button class="cont_to_chckout_btn" event_type="click" event_action="cls_curr_pp" cont_elem="succs_aac_popup_cont" >
                Continue to Checkout
            </button>
            ${
              data.is_tm
                ? '<span class="try_more_cpn_lnk" event_type="click" event_action="opn_more_cpn_side_btn" sub_action="try_more" >Try ' +
                  data.is_tm +
                  ' more coupons</span>'
                : ''
            }
        </div>
    </div>
    <style>
        .succs_aac_popup_cont{
            width: 444px;
            height: 452px;
            background: #FFFFFF;
            border-radius: 10px;
            display:flex;
            flex-direction:column;
            align-items:center;
            box-sizing:border-box;
            position:relative;
            padding-top:65px;
        }
        .succs_aac_popup_cls_btn_cont{
            max-width: 28px;
            /* height: 28px; */
            position: absolute;
            top: 12px;
            right: 12px;
        }
        .succs_aac_popup_cls_btn{
            width:100%;
        }
        .succs_aac_popup_head_cont{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .succs_aac_popup_frst_head{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 22px;
            line-height: 33px;
            color: #0E1D4A;
            margin:0px 0px 0px 0px;
        }
        .succs_aac_popup_secnd_head{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 700;
            font-size: 66px;
            line-height: 99px;
            color: #E2341C;
            margin:0px 0px 0px 0px;
        }
        .succs_aac_popup_prc_lst_cont{
            font-family: 'Poppins';
            font-style: normal;
            font-size: 22px;
            line-height: 33px;
            margin-top:20px;
            margin-bottom:43px;
        }
        .succs_aac_popup_orign_prc_cont{
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
            margin-bottom:8px;
        }
        .orgn_prc_key{
            font-weight: 500;
            color: rgba(14, 29, 74, 0.45);
            width: 163px;
            text-align: end;
        }
        .orgn_prc_val{
            font-weight: 500;
            color: rgba(14, 29, 74, 0.45);
        }
        .succs_aac_popup_fs_prc_cont{
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
        }
        .fs_prc_key{
            font-weight: 500;
            color: rgba(14, 29, 74, 0.45);
        }
        .fs_prc_val{
            font-weight: 700;
            color: #2158D7;
            margin-left: 28px;
        }
        .succs_aac_popup_prc_btn_cont{
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        .cont_to_chckout_btn{
            width: 298px;
            height: 45px;
            left: 73px;
            top: 343px;
            background: #2158D7;
            border-radius: 30px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: #FBDD01;
            margin-bottom:12px;
            border:none;
        }
        .try_more_cpn_lnk{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            text-decoration-line: underline;
            color: rgba(14, 29, 74, 0.5);
            cursor: pointer;
        }
    `;
};

export var manual_cpns_temp_pp = (data=[]) => {
  let x = '';
  for (let i = 0; i < data.length; i++) {
    x += `<tr class="manual_cpns_trow" >
                <td class="manual_cpns_tblck" >${data[i].discount}</td>
                <td class="manual_cpns_tblck" >${data[i].cashback}</td>
                <td class="manual_cpns_tblck" >${data[i].total_dis}</td>
                <td class="manual_cpns_tblck mnl_cpn_code" >${data[i].code}</td>
                <td class="manual_cpns_tblck mnl_cpn_apply" event_type="click" event_action="apply_final_coupon" event_data="${data[i].code}" >apply</td>
            </tr>`;
  }
  return `
    <div class="manual_cpns_main_cont">
        <div class="manual_cpns_logo_cont">
            <img src='${temp_ext_img_var}icon-128.png' alt="" class="flsh_sale_spp_logo" />
        </div>
        <div class="manual_cpns_cls_btn_cont">
            <img src='${temp_ext_img_var}icons8-multiply-24.png' alt="" class="manual_cpns_cls_btn" event_type="click" event_action="cls_cpn_ext_pp" cont_elem="manual_cpns_main_cont" />
        </div>
        <div class="manual_cpns_head_cont">
            <h3 class="manual_cpns_head" >
                Available coupons for your cart
            </h3>
        </div>
        <div class="manual_cpns_table_cont">
            <table class="manual_cpns_table">
                <tbody class="manual_cpns_tbody" >
                <tr class="manual_cpns_trow" >
                    <th class="manual_cpns_thead" >Discount</th>
                    <th class="manual_cpns_thead" >Cashback</th>
                    <th class="manual_cpns_thead" >total</th>
                    <th class="manual_cpns_thead" >Code</th>
                    <th class="manual_cpns_thead" ></th>
                </tr>
                ${x}
                </tbody>
            </table>
        </div>
    </div>
    <style>
        .manual_cpns_main_cont{
            position: relative;
            width: 650px;
            height: 568px;
            background: #FFFFFF;
            border-radius: 10px;
            box-sizing:border-box;
            padding-top:72px;
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        .manual_cpns_logo_cont{
            position: absolute;
            width:26px;
            height:26px;
            // background:red;
            top:12px;
            left:12px;
        }
        .flsh_sale_spp_logo{
            width:100%;
        }
        .manual_cpns_cls_btn_cont{
            position: absolute;
            max-width:28px;
            // height:14px;
            // background:red;
            top:12px;
            right:12px;
        }
        .manual_cpns_cls_btn{
            width:100%;
        }
        .manual_cpns_head_cont{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 22px;
            line-height: 33px;
            text-align: center;
            text-transform: uppercase;
            color: #0E1D4A;
        }
        .manual_cpns_head{
            margin:0px;
            padding:0px;
        }
        .manual_cpns_table_cont{
            margin-top:23px;
        }
        .manual_cpns_table{
            width:582px;
        }
        .manual_cpns_tbody{
/*                 background:pink; */
            max-height:450px;
            overflow-y:scroll;
        }
        .manual_cpns_trow{
            
        }
        .manual_cpns_trow:nth-child(even) {
            background-color: #dddddd4f;
        }
        .manual_cpns_thead{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            text-transform: capitalize;
            color: #2158D7;
        }
        .manual_cpns_tblck{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            text-transform: capitalize;
            color: #0E1D4A;
        }
        .mnl_cpn_code{
            width: 146px;
            height: 38px;
            left: 375px;
            top: 169px;
            background: #FFFFFF;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        }
        .mnl_cpn_apply{
            width: 83px;
            height: 38px;
            background: #3E6EDC;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
            border-radius: 4px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            text-transform: capitalize;
            color: #FBDD01;
            margin:0px 0px 0px 8px;
            
        }
    </style>
    `;
};

export var no_working_cpn_temp = (data) => {
  return `
    <div class="cpn_not_found_main_cont">
        <div class="cpn_not_found_cls_cont">
            <img src='${temp_ext_img_var}icons8-multiply-24.png' alt="" class="cpn_not_found_cls" event_type="click" event_action="cls_cpn_ext_pp" cont_elem="cpn_not_found_main_cont" />
        </div>
        <div class="cpn_not_found_para_cont">
        ${
          data.extra_cpn
            ? `<p class="cpn_not_found_frst_para">
                Couldn't find a good coupon.
                Don't worry.
            </p>
            <p class="cpn_not_found_sec_para">
                We have ` +
              data.extra_cpn +
              ` more in the list!
            </p>`
            : `<p class="cpn_not_found_frst_para">
                Couldn't find a good coupon.
                You can checkout knowing you have the best price.
            </p>`
        }
        </div>
        <div class="cpn_not_found_gif_cont">
            <img src='${temp_ext_img_var}not-found.gif' alt="" class="cpn_not_found_gif" />
        </div>
        <div class="cpn_not_found_btn_cont">
            ${
              data.extra_cpn
                ? '<button class="cpn_not_found_btn" event_type="click" event_action="opn_more_cpn_side_btn" sub_action="try_more" >Try More</button>'
                : ''
            }
            <span class="cpn_not_found_lnk" event_type="click" event_action="cls_cpn_ext_pp" cont_elem="cpn_not_found_main_cont" >Continue to Checkout!</span>
        </div>
    </div>
    <style>
        .cpn_not_found_main_cont{
            position: relative;
            width: 444px;
            height: 452px;
            background: #FFFFFF;
            border-radius: 10px;
            padding-top:52px;
            box-sizing:border-box;
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        .cpn_not_found_cls_cont{
            width: 24px;
            height: 14px;
            position: absolute;
            top: 14px;
            right: 14px;
        }
        .cpn_not_found_cls{
            width:100%;
        }
        .cpn_not_found_para_cont{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 30px;
            text-align:center;
            color: #0E1D4A;
        }
        .cpn_not_found_frst_para{
            width:297px;
            margin:0px 0px 0px 0px;
        }
        .cpn_not_found_sec_para{
            font-weight: 700;
            margin:0px;
        }
        .cpn_not_found_gif_cont{
            height:200px;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        .cpn_not_found_gif{
            height:100%;
        }
        .cpn_not_found_btn_cont{
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        .cpn_not_found_btn{
            width: 298px;
            height: 45px;
            border:none;
            background: #2158D7;
            border-radius: 30px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: #FBDD01;
        }
        .cpn_not_found_lnk{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            text-decoration-line: underline;
            color: rgba(14, 29, 74, 0.75);
            margin-top:12px;
        }
    </style>
    `;
};

export var applyng_final_cpn_pp_temp = () => {
  return `
    <div class="applng_fnl_cpn_pp_cont">
        <div class="applng_fnl_cpn_pp_cls_cont">
            <img src="${temp_ext_img_var}icons8-multiply-24.png" class="applng_fnl_cpn_pp_cls_btn" alt="cls_btn"  event_type="click" event_action="cls_curr_pp" cont_elem="applng_fnl_cpn_pp_cont">
        </div>
        <div class="applng_fnl_cpn_pp_titl_cont">
            <span class="applng_fnl_cpn_pp_titl">
                Applying Final Coupon
            </span>
        </div>
        <div class="applng_fnl_cpn_pp_gif_cont">
            <img src="${temp_ext_img_var}applyng_fnl_cpn_gif.gif" class="applng_fnl_cpn_pp_gif" alt="gif">
        </div>
        <div class="applng_fnl_cpn_pp_logo_cont">
            <img src="${temp_ext_img_var}fs_new_curr_logo.png" class="applng_fnl_cpn_pp_logo" alt="logo">
        </div>
    </div>
    <style>
        .applng_fnl_cpn_pp_cont{
            position: relative;
            width: 424px;
            height: 498px;
            background: #FFFFFF;
            border-radius: 10px;
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        .applng_fnl_cpn_pp_cls_cont{
            position: absolute;
            top: 12px;
            right: 12px;
            max-width: 28px;
            /* height: 16px; */
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .applng_fnl_cpn_pp_cls_btn{
            width:100%;
        }
        .applng_fnl_cpn_pp_titl_cont{
            position: absolute;
            width: 287px;
            height: 36px;
            left: 69px;
            top: 60px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 36px;
            display: flex;
            align-items: center;
            justify-content:center;
            text-align: center;
            letter-spacing: 0.02em;
            color: #0E1D4A;
        }
        .applng_fnl_cpn_pp_titl{
            margin:0px;
            padding:0px;
            z-index:9;
        }
        .applng_fnl_cpn_pp_gif_cont{
            position: absolute;
            width: 100%;
            height: 400px;
            left: 0px;
            top: 63px;
            // background:green;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        .applng_fnl_cpn_pp_gif{
            width:100%;
        }
        .applng_fnl_cpn_pp_logo_cont{
            position: absolute;
            width: 95px;
            height: 26px;
            left: 165px;
            top: 430px;
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9;
            // background:yellow;
        }
        .applng_fnl_cpn_pp_logo{
            width:100%;
        }
    </style>
    `;
};

export var no_cpn_found_pp_temp = () => {
  return `
    <div class="no_cpn_fnd_pp_cont">
        <div class="no_cpn_fnd_pp_cont_cls_cont">
            <img src="${temp_ext_img_var}icons8-multiply-24.png" class="no_cpn_fnd_pp_cont_cls_btn" alt="cls_btn">
        </div>
        <div class="no_cpn_fnd_pp_cont_logo_cont">
            <img src="${temp_ext_img_var}fs_new_curr_logo.png" class="no_cpn_fnd_pp_cont_logo" alt="logo">
        </div>
        <div class="no_cpn_fnd_pp_cont_gif_cont">
            <img src="${temp_ext_img_var}no_cpns_fnd_gif.gif" class="no_cpn_fnd_pp_cont_gif" alt="gif">
        </div>
        <div class="no_cpn_fnd_pp_detl_cont">
            <p class="no_cpn_fnd_pp_detl_para">
                We haven’t found any coupon for
                this store. So you can checkout
                knowing you have the best price.
            </p>
        </div>
        <button class="no_cpn_fnd_pp_got_it_btn">Ok, Got it!</button>
        <span class="no_cpn_fnd_pp_mgs_text">We won’t show it again for an hour</span>
        <span class="no_cpn_fnd_pp_code_lnk">Have a code that we don’t have?</span>
    </div>
    <style>
    .no_cpn_fnd_pp_cont{
        width: 424px;
        height: 498px;
        background: #FFFFFF;
        border-radius: 10px;        
        position: absolute;
        top: -219px;
        right: 36px;
        box-shadow: 1px 1px 6px rgb(0 0 0 / 30%);
    }
    .no_cpn_fnd_pp_cont_cls_cont{
        position: absolute;
        width: 16px;
        height: 16px;
        top:19px;
        right:19px;
    }
    .no_cpn_fnd_pp_cont_cls_btn{
        width:100%;
    }
    .no_cpn_fnd_pp_cont_logo_cont{
        position: absolute;
        width: 95px;
        height: 26px;
        top:19px;
        left:19px;
    }
    .no_cpn_fnd_pp_cont_logo{
        width:100%;
    }
    .no_cpn_fnd_pp_cont_gif_cont{
        position: absolute;
        width: 178px;
        height: 178px;
        left: 123px;
        top: 30px;
    }
    .no_cpn_fnd_pp_cont_gif{
        width:100%;
    }
    .no_cpn_fnd_pp_detl_cont{
        position: absolute;
        width: 313px;
        height: 81px;
        left: 55px;
        top: 220px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.02em;
        color: #0E1D4A;
    }
    .no_cpn_fnd_pp_detl_para{
        margin:0px;
        padding:0px;
    }
    .no_cpn_fnd_pp_got_it_btn{
        position: absolute;
        width: 312px;
        height: 54px;
        left: 55px;
        top: 341px;
        background: #2158D7;
        border-radius: 30px;
        border:none;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content:center;
        color: #FBDD01;
    }
    .no_cpn_fnd_pp_mgs_text{
        position: absolute;
        width: 244px;
        height: 21px;
        left: 89px;
        top: 409px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #333333;
    }
    .no_cpn_fnd_pp_code_lnk{
        position: absolute;
        width: 199px;
        height: 18px;
        left: 113px;
        top: 460px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #2158D7;
    }
    </style>
    `;
};


export function manual_coupons_side_pp(data,lst_cpn_str,avl_cpn_str,avl_cpn_ln){
console.log("this is manual cpouopons side btn...");
return `
<div class="manual_cpn_sd_btn_cont">
    <div class="manual_cpn_sd_btn_hdr" >${data.data.store_info.store_name} coupons</div>
    <div class="manual_cpn_sd_btn_cls_cont">
    <img src="${temp_ext_img_var}icons8-multiply-24.png" class="manual_cpn_sd_btn_cls_btn" alt="cls_btn" event_type="click" event_action="close_sd_mnl_cpn_pp" >
    </div>
    <div class="ind_str_cpn_cont">
        <div class="ind_str_cpn_lst_usd_cont">
            
            ${ind_str_head_tmp(ext_id, {
              title: 'Last Successful Coupons',
              isAvl: false,
              cnt: 0,
            })}

            <div class="ind_str_cpn_wrpr">${lst_cpn_str}</div>
        </div>
        <div class="ind_str_cpn_avl_cont">

            ${ind_str_head_tmp(ext_id, {
              title: 'Available Coupons',
              isAvl: true,
              cnt: avl_cpn_ln,
            })}

            <div class="ind_str_cpn_wrpr">${avl_cpn_str}</div>
        </div>
    </div>
</div>
<style>
.ind_str_mn_cont{
    background:white;
    min-height:554px;
    // width:350px;
}
.manual_cpn_sd_btn_hdr{
    width: 100%;
    height: 46px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    background: white;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #0E1D4A;
    border-radius: 10px 10px 0px 0px;
    text-transform: uppercase;
    border-bottom: 1px solid #bdc1ce;
}
.manual_cpn_sd_btn_cls_cont{
    position:relative;
}
.manual_cpn_sd_btn_cls_btn{
    max-width: 24px;
    position: absolute;
    cursor: pointer;
    top: -36px;
    right: 12px;
}
.ind_str_crd_cont{

}
.ind_str_cpn_cont{
    padding: 0px 14px 14px 14px;
    overflow-y: scroll;
    max-height: 413px;
}
.ind_str_cpn_cont::-webkit-scrollbar{
    display:none;
}
.ind_str_cpn_lst_usd_cont{

}
.ind_str_cpn_wrpr{

}
.ind_str_cpn_avl_cont{

}
.ind_str_cpn_wrpr{

}

.manual_cpn_sd_btn_cont{
    width: 353px;
    height: 513px;
    background: white;
    position: fixed;
    top: 87px;
    left: 7px;
    border-radius: 10px;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 16%);
}

</style>
`;
}


export var new_hm_pg_banner_carsl = (radio_btn,slides,label)=>{
    return `
    <div class="carousel-section">
        <div class="carousel-container">
            <div class="image-container">
                ${radio_btn}
                ${slides}
                <div class="nav-manual">
                ${label}
                </div>
            </div>

        </div>
    </div>
    <style>
        .carousel-section {
            --container-width: 322px;
            --container-height: 160px;
            --nav-margin: 14px;
            --nav-active-color: #2158D7;
            --nav-inactive-color: #D9D9D9;
            margin: 0;
            padding: 0;
            height: var(--container-height);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .carousel-container {
            width: var(--container-width);
            height: 100%;
            border-radius: 15px;
            overflow: hidden
        }
        
        .image-container {
            width: 500%;
            height: var(--container-height);
            display: flex;
        }
        
        .image-container input {
            display: none;
        }
        
        .slide {
            width: 20%;
            transition: 1s;
        }
        
        .slide img {
            width: 100%;
            height: 100%;
            object-fit: cover
        }
        
        .nav-manual {
            position: absolute;
            width: var(--container-width);
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
            margin-top: calc(var(--container-height) - var(--nav-margin));
        }
        
        .manual-btn {
            height: 8px;
            width: 8px;
            background: var(--nav-inactive-color);
            border-radius: 15px;
            cursor: pointer;
            transition: 0.5s;
            border:2px solid white;
        }
        
        .manual-btn:hover {
            background-color: var(--nav-active-color);
        }
        
        #slide0:checked~.nav-manual #manual-btn0,
        #slide1:checked~.nav-manual #manual-btn1,
        #slide2:checked~.nav-manual #manual-btn2,
        #slide3:checked~.nav-manual #manual-btn3,
        #slide4:checked~.nav-manual #manual-btn4 {
            background-color: var(--nav-active-color);
            width: 18px;
        }
        
        #slide0:checked~.first {
            margin-left: 0;
        }
        
        #slide1:checked~.first {
            margin-left: -20%;
        }
        
        #slide2:checked~.first {
            margin-left: -40%;
        }
        
        #slide3:checked~.first {
            margin-left: -60%;
        }
        
        #slide4:checked~.first {
            margin-left: -80%;
        }
    </style>
    `;
}

export var new_hm_bnnr_crsl_inp = (key, is_chk='')=>{
    return `
    <input type="radio" name="slide-radio" id="slide${key}" ${is_chk} radio_crsl_ssssv="${key}" >
    `;
}

export var new_hm_bnnr_crsl_slide = (is_first,src,key)=>{
    return  `
    <div class="slide ${is_first}"  >
        <img src="${src}" event_type="click" event_action="hm_pg_crsl_redir" mysldkeyssss="${key}">
    </div>
    `;
}

export var new_hm_bnnr_crsl_lbl = (key)=>{
    return  `
    <label for="slide${key}" id="manual-btn${key}" class="manual-btn" event_type="click" event_action="hm_pg_navgt_slide" label_crsl_ssssv="${key}" ></label>
    `;
}