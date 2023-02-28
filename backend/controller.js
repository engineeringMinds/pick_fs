const data1 = require('./dummy_fs_data.json');
const fs = require('fs');

let data;
(async function dataConv() {
  if (typeof data1 == 'object') {
    data = data1;
  } else {
    data = await JSON.parse(data1);
  }
})();

exports.fetch_rec_used_coupons = async function (req, res, next) {
  try {
    res.status(200).json({ data: data.rec_used_coup });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.fetch_rec_prz_drop = async function (req, res, next) {
  try {
    res.status(200).json({ data: data.rec_prz_drop });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.fetch_deals = async function (req, res, next) {
  try {
    res.status(200).json({ data: data.deals });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.fetch_advertisements = async function (req, res, next) {
  try {
    res.status(200).json({ data: data.advertisements });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.fetch_all_Stores = async function (req, res, next) {
  try {
    // console.log("fetch all  str data",data.all_stores);
    res.status(200).json({ data: data.all_stores });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.fetch_wish_list = async function (req, res, next) {
  try {
    res.status(200).json({ data: data.wish_list });
  } catch (error) {
    console.log('error:', error);
  }
};

exports.update_wish_list = async function (req, res, next) {
  try {
    let wish_list_arr = req.body;
    console.log('this is wl_arr:', wish_list_arr.data);

    fs.readFile('./dummy_fs_data.json', 'utf8', (err, data) => {
      if (err) {
        console.log('reading database error:', err);
      } else {
        let myData = JSON.parse(data);
        console.log('my database:', (myData.wish_list = wish_list_arr.data));
        fs.writeFile('./dummy_fs_data.json', JSON.stringify(myData), (err) => {
          if (err) console.log('error writing file:', err);
          console.log('dkvndjvndk');

          res.status(200).json({ data: myData.wish_list });
        });
      }
    });
  } catch (error) {
    console.log('error:', error);
  }
};

exports.fetch_sales = async function (req, res, nxt) {
  try {
    res.status(200).json({ data: data.sale });
  } catch (error) {
    console.log('fetch sales err:', error);
  }
};

exports.fetch_ind_str_det = async function (req, res, nxt) {
  try {
    let str_id = req.body;
    // console.log("this is fetch str by id:",str_id)
    res.status(200).json({ data: data.ind_str_detail[str_id.store_id] });
  } catch (error) {
    console.log('this is ind str det err:', error);
  }
};

exports.add_cpn_by_user = async function (req, res, nxt) {
  try {
    let cpn_obj = req.body;
    console.log('this add cpn by user req', cpn_obj);
    res.status(201).json({ data: true });
  } catch (error) {
    console.log('this add cpn by user err:', error);
  }
};
exports.fetch_notif = async function (req, res, nxt) {
  try {
    res.status(200).json({ data: data.notif });
  } catch (error) {
    console.log('this add cpn by user err:', error);
  }
};
