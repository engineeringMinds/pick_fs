const Express = require('express');
const {
  fetch_rec_used_coupons,
  fetch_advertisements,
  fetch_deals,
  fetch_rec_prz_drop,
  fetch_all_Stores,
  fetch_wish_list,
  update_wish_list,
  fetch_sales,
  fetch_ind_str_det,
  add_cpn_by_user,
  fetch_notif,
} = require('./controller.js');

const Router = Express.Router();

Router.post('/recent_coupons', fetch_rec_used_coupons);
Router.post('/recent_prz_drp', fetch_rec_prz_drop);
Router.post('/deals', fetch_deals);
Router.post('/advertisement', fetch_advertisements);
Router.post('/all_stores', fetch_all_Stores);
Router.post('/wish_list_data', fetch_wish_list);
Router.post('/update_wl_arr', update_wish_list);
Router.post('/sales', fetch_sales);
Router.post('/store_by_id', fetch_ind_str_det);
Router.post('/add_cpn', add_cpn_by_user);
Router.post('/notif', fetch_notif);

module.exports = { Router };
