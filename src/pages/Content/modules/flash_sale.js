import { storage } from '../../require/require.js';
import { site, url, $s } from '../../require/require_cs.js';
import {
  rend_flash_sale_side_popup,
  rend_flash_sale_reg_side_popup,
} from './rendering_func.js';

let is_flash = false;

let url_w_q = url.split('?')[0].split('#')[0];
let url_query = url.split('?').length > 1 ? url.split('?')[1] : '';
let fsale_data,
  fsale_code_full,
  curr_prod,
  cookie,
  fsale_code,
  fsale_date,
  fsale_curr,
  ready_click,
  addselbutint,
  tymleft,
  clicked,
  msg = '',
  iiu = 0,
  asfd = [],
  apic = 0;
(async function () {
  let data = await storage('get', 'fsale_base');
  if (data && data[site]) {
    is_flash = true;
    console.log(data);
    chrome.runtime.sendMessage({
      icon: 'yes',
    });
    fsale_data = data[site]['products'];
    fsale_code_full = data[site]['code'];
    console.log(fsale_code_full);
    data = await storage('get', 'fsale_reg');
    startfsale(data);
    if (
      (fsale_code_full.mpp && fsale_code_full.mpp['watch_url_change']) ||
      (fsale_code_full.spp && fsale_code_full.spp['watch_url_change'])
    ) {
      watch_url_change();
      console.log(2);
    }
  }
})();

export async function get_Saledata() {
  let base = await storage('get', 'fsale_base');
  let reg = await storage('get', 'fsale_reg');
  base = base||{};
  reg = reg||{};
  return { base, reg };
}

function update_tymlft(fsale_date) {
  setInterval(() => {
    tymleft = fsale_date - new Date().getTime();
  }, 5000);
}

function startfsale(fsale_reg) {
  console.log(4, fsale_reg);
  console.log(fsale_code_full);
  console.log(fsale_data);
  if (!fsale_code_full || !fsale_data) return;
  for (var fsdi = 0; fsdi < fsale_data.length; fsdi++) {
    if (fsale_data[fsdi].variant.mpp) {
      curr_prod = fsale_data[fsdi].variant.mpp;
      for (var fsdj = 0; fsdj < curr_prod.length; fsdj++) {
        if (
          (!curr_prod[fsdj].url_path ||
            url_w_q.search(curr_prod[fsdj].url_path) > -1) &&
          (!curr_prod[fsdj].url_query ||
            url_query.search(curr_prod[fsdj].url_query) > -1)
        ) {
          console.log('fsale_popup');
          cookie = curr_prod[fsdj].cookie;
          fsale_code = fsale_code_full.mpp;
          if (curr_prod.length == 1) {
            if (fsale_reg[cookie]) {
              fsale_date = getsaledate(
                fsale_data[fsdi].date,
                fsale_code.times.try_for
              );
              fsale_curr = curr_prod[fsdj];
              // if(fsale_code.button_temp && fsale_code.button_temp != "") fsale_code.button =  stringTemplateParser(fsale_code.button_temp, fsale_curr.button);
              // rend_flash_sale_side_popup()
              console.log('fsale_popup');
              return popupcode();
            } else {
              console.log('showregbutton');
              return showregbutton(cookie);
            }
          } else {
            if (fsale_reg[cookie]) {
              for (var fsdj = 0; fsdj < curr_prod.length; fsdj++) {
                if (fsale_reg[cookie] != curr_prod[fsdj].c_value) continue;
                fsale_date = getsaledate(
                  fsale_data[fsdi].date,
                  fsale_code.times.try_for
                );
                fsale_curr = curr_prod[fsdj];
                console.log(fsale_curr);
                // rend_flash_sale_side_popup();
                // if(fsale_code.button_temp && fsale_code.button_temp !="") fsale_code.button = stringTemplateParser(fsale_code.button_temp, fsale_curr.button);
                return popupcode();
              }
            } else return;
          }
        }
        if (curr_prod[fsdj].spp_url_path) {
          for (
            let sppi = 0;
            sppi < curr_prod[fsdj].spp_url_path.length;
            sppi++
          ) {
            console.log(curr_prod[fsdj].spp_url_path[sppi]);
            if (url_w_q.search(curr_prod[fsdj].spp_url_path[sppi]) > -1) {
              cookie = curr_prod[fsdj].cookie;
              fsale_code = fsale_code_full.spp;
              if (fsale_reg[cookie]) {
                fsale_date = getsaledate(
                  fsale_data[fsdi].date,
                  fsale_code.times.try_for
                );
                fsale_curr = curr_prod[fsdj];
                return popupcode();
              } else {
                console.log('showregbutton');
                return showregbutton(cookie);
              }
            }
          }
        }
      }
    }
    if (fsale_data[fsdi].variant.spp) {
      curr_prod = fsale_data[fsdi].variant.spp;
      for (var fsdj = 0; fsdj < curr_prod.length; fsdj++) {
        if (
          (!curr_prod[fsdj].url_path ||
            url_w_q.search(curr_prod[fsdj].url_path) > -1) &&
          (!curr_prod[fsdj].url_query ||
            url_query.search(curr_prod[fsdj].url_query) > -1)
        ) {
          cookie = curr_prod[fsdj].cookie;
          fsale_code = fsale_code_full.spp;
          console.log(cookie);
          if (fsale_reg[cookie]) {
            fsale_date = getsaledate(
              fsale_data[fsdi].date,
              fsale_code.times.try_for
            );
            fsale_curr = curr_prod[fsdj];
            return popupcode();
          } else {
            console.log('showregbutton');
            return showregbutton(cookie);
          }
        }
      }
    }
  }
}

function azcont() {
  setCookiesec('CONG', 1, 900, '/');
  let azcon_mo = new MutationObserver(function (mutations) {
    let selector =
      '.lightningDealAlertBox button, [id^="deal_in_cart"]:visible a, .a-alert-inline-success:visible ~ a';
    if (!$s(selector) || !$s(selector).length) return;
    azcon_mo.disconnect();
    $s(selector)[0].click();
    setCookiesec('CONG', 1, 900, '/');
  });
  azcon_mo.observe(document.body, { childList: true, subtree: true });
}

function smcont() {
  var smcon_mo = new MutationObserver(function (mutations) {
    let selector = '.btn.btn-primary.btn-rounded.data-omni-proceedtocheckout';
    if (!$s(selector) || !$s(selector).length) return;
    smcon_mo.disconnect();
    $s(selector)[0].click();
  });
  smcon_mo.observe(document.body, { childList: true, subtree: true });
}
async function fkcont() {
  let data = await storage('get', 'fsale_reg');
  if (!data || !data['fkoco']) return;
  let fkaddress = new MutationObserver(function (mutations) {
    console.log(12);
    // fkaddress.disconnect();
    if ($s('.modal-content button:visible').length) {
      $s('.modal-content button:visible').click();
      fkaddress.disconnect();
      window.history.back();
    } else if (
      $s("button:contains('Deliver Here'):visible").length &&
      iiu == 0
    ) {
      iiu = 1;
      $s("button:contains('Deliver Here'):visible").click();
    } else if ($s('span.add_address_btn:visible').length && iiu == 0) {
      iiu = 1;
      $s('.select_btn.btn.btn-white').click();
    } else if ($s('a.btn-continue:visible').length && iiu < 2) {
      document.getElementsByClassName('btn-continue')[0].click();
      iiu = 2;
    } else if ($s("button:contains('CONTINUE'):visible").length && iiu < 2) {
      $s("button:contains('CONTINUE'):visible").click();
      iiu = 2;
    } else if ($s("label[for='PHONEPE']").length) {
      if (data['fsale_reg']['fkoco'] == 'phonepe') {
        $s("label[for='PHONEPE']").click();
        if ($s("label[for='PHONEPE'] button").length) {
          $s("label[for='PHONEPE'] button")[0].click();
          fkaddress.disconnect();
        }
      } else fkaddress.disconnect();
      // else {
      //  if($s("input[name='cvv']").length){
      //      $s("input[name='cvv']").val(cvv);
      //      //if(onct > 20) $s("button:contains('PAY'):visible").click();
      //      console.log(onct);
      //            if(onct > 20) clearInterval(address);
      //  }
      // }
    } else if ($s("label[for='UPI']").length) {
      if (data['fsale_reg']['fkoco'] == 'phonepe') {
        console.log(2);
        $s("label[for='UPI']").click();
      } else fkaddress.disconnect();
    }
  });
  fkaddress.observe(document.body, { childList: true, subtree: true });
}
function random_str() {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function micont() {
  // rend_flash_sale_side_popup('please sit back and relax we will click on congratulations button and proceed');
  // if(!fsale_box || !$s('fs_salebox_container').length)
  // {
  //     // fsale_box = addshadow('fs_salebox_container');
  //     ref= 100;
  //     rend_flash_sale_side_popup('please sit back and relax we will click on congratulations button and proceed');
  //     // fsale_box.innerHTML = stringTemplateParser(bottom_box_temp, {homeurl:homeurl,ref:ref} );
  //     // fsale_box.getElementById("fmsg")
  //     //     .innerHTML  ='please sit back and relax we will click on congratulations button and proceed';
  //     // fsale_box.getElementById("cnf-container-wrapper").classList.add("active");
  // }
  if (url.search('in/event/success?') > 0) {
    rend_flash_sale_side_popup(
      'please sit back and relax we will click on congratulations button and proceed'
    );
    // fsale_box.getElementById("fmsg")
    //     .innerHTML = "please sit back and relax we will click on congratulations button and proceed";
    setTimeout(function () {
      $s('.btn-large.btn-orange')[0].click();
    }, 5000);
    setCookiesec('fsckout', 1, 30, '/', '.mi.com');
    window.open('https://bit.ly/reviewfs', '_blank');
  } else if (url.search('cart/recommend') > 0) {
    rend_flash_sale_side_popup(
      "we have added it to your cart, please don't forget to rate us on chrome store"
    );
    // fsale_box.getElementById("fmsg")
    //     .innerHTML = "we have added it to your cart, please don't forget to rate us on chrome store";
    setTimeout(function () {
      $s('.btn-orange.btn-next.J_next')[0].click();
    }, 3000);
    setCookiesec('fsckout', 1, 0, '/', '.mi.com');
  } else if (url.search('cart/index') > 0) {
    rend_flash_sale_side_popup(
      "we have added it to your cart, please don't forget to rate us on chrome store"
    );
    // fsale_box.getElementById("fmsg")
    //     .innerHTML = "we have added it to your cart, please don't forget to rate us on chrome store";
    setTimeout(function () {
      $s('.btn.btn-orange.btn-buy.J_checkout')[0].click();
    }, 3000);
    setCookiesec('fsckout', 1, 0, '/', '.mi.com');
  } else if (url.search('cart$') > 0) {
    rend_flash_sale_side_popup(
      "we have added it to your cart, please don't forget to rate us on chrome store"
    );
    // fsale_box.getElementById("fmsg")
    //     .innerHTML = "we have added it to your cart, please don't forget to rate us on chrome store";
    mo_click_generic('.cart__footer-checkout', function () {
      setCookiesec('fsckout', 1, 120, '/', '.mi.com');
    });
  } else rend_flash_sale_side_popup('', 1);
}

function mo_click_generic(selector, aftefun = null) {
  if ($s(selector).length) {
    $s(selector)[0].click();
    if (aftefun) aftefun();
    return;
  }
  let name = random_str();
  asfd[name] = new MutationObserver(function (mutations) {
    if (!$s(selector) || !$s(selector).length) return;
    asfd[name].disconnect();
    $s(selector)[0].click();
    if (aftefun) aftefun();
  });
  asfd[name].observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

function callapi(tryapi = 0) {
  apic++;
  let httpq4 = new getXMLHTTPRequest();
  httpq4.open('POST', '/api/5/cart', true);
  httpq4.onreadystatechange = function () {
    if (httpq4.readyState == 4) {
      if (httpq4.status == 200) {
        var mytext = httpq4.responseText;
        try {
          if (
            JSON.parse(mytext)['RESPONSE']['cartResponse'][
              fsale_curr.api_par.LID
            ]['presentInCart'] == true
          ) {
            setCookiesec('CONG', 1, 600, '/');
            console.log('history');
            clicked = 1;
            if (
              fsale_code.checkout_cookie &&
              fsale_code.checkout_cookie.length > 1
            ) {
              setCookiesec(
                'fsckout',
                fkoco,
                fsale_code.checkout_cookie[0],
                fsale_code.checkout_cookie[1]
              );
            }
            // fsale_box.getElementById("fmsg").innerHTML = "Clicked";
            window.history.pushState(null, null, location.href);
            window.location.href = '/checkout/init';
          } else if (tryapi) {
            return;
          } else if (apic < 14) return setTimeout(callapi, apic * 100);
          else location.reload();
        } catch (err) {
          if (tryapi) return;
          if (apic < 14) return setTimeout(callapi, apic * 100);
          else {
            rend_flash_sale_side_popup(
              'Product went Out of stock or Some error occured, please try manually'
            );
          }
        }
      }
    }
  };
  httpq4.setRequestHeader('Content-type', 'application/json');
  httpq4.setRequestHeader(
    'X-user-agent',
    navigator.userAgent + ' FKUA/website/41/website/Desktop'
  );
  // if(ins) httpq4.send('{"cartContext":{"' + fsale_curr.api_par.LID + '":{},"LSTDPXFB23Y5FNN6BNSUYNXYD":{"parentContext":"' + fsale_curr.api_par.LID + '"}}}');
  httpq4.send(
    '{"cartContext":{"' + fsale_curr.api_par.LID + '":{"quantity":1}}}'
  );
}

function addselbutton() {
  if (addselbutint) return;
  addselbutint = setInterval(function () {
    if ($s(fsale_code.addselbutton).length) {
      let jjj = 0;
      $s(fsale_code.addselbutton).each(function () {
        $s(this).before(
          '<div class="fs2" id="fsdeal" style="width: 19%;margin: -29px 0.5%;margin-top: -29px;padding: 5px;float: left; min-width: 223px;color: white;background: #00BCD4;height: 29px; padding-left:20px;">Check for Auto Buy</div><input type="radio" style="margin: -25px 9px; float: left;" value="' +
            jjj +
            '" class="fs1" name="fsautobuy"> '
        );
        jjj++;
      });
      clearInterval(addselbutint);
      var fx = $s('.fs2');
      if (
        parseInt(localStorage['fsno']) &&
        parseInt(localStorage['fsno']) < fx.length
      )
        $s('.fs1:eq(' + parseInt(localStorage['fsno']) + ')').click();
      else $s('.fs1:eq(0)').click();
      $s('.fs1').click(function () {
        localStorage['fsno'] = $s("input[name='fsautobuy']:checked").val();
      });
    }
  }, 1000);
}

function getsaledate(sd, tf) {
  let cdate = new Date().getTime();
  for (let i = sd.length - 1; i >= 0; i--) {
    sd[i] = new Date(sd[i]).getTime();
    if (sd[i] < 0) return cdate + 60000;
    while (cdate > sd[i] + tf * 60000) sd[i] = sd[i] + 7 * 24 * 60 * 60000;
  }
  // return cdate;
  return Math.min.apply(null, sd);
}

function addfslae_mo() {
  let ele = fsale_code.button;
  let fslae_mo = new MutationObserver(function (mutations) {
    if (!$s(ele) || !$s(ele).length || !ready_click) return;
    fslae_mo.disconnect();
    console.log('button found');
    $s(fsale_code.button)[0].click();
    clicked = 1;
    fsale_continue();
    if (fsale_code.checkout_cookie && fsale_code.checkout_cookie.length > 1) {
      if (fsale_code.checkout_cookie.length == 2)
        setCookiesec(
          'fsckout',
          fkoco,
          fsale_code.checkout_cookie[0],
          fsale_code.checkout_cookie[1]
        );
      else
        setCookiesec(
          'fsckout',
          fkoco,
          fsale_code.checkout_cookie[0],
          fsale_code.checkout_cookie[1],
          fsale_code.checkout_cookie[2]
        );
    }
    rend_flash_sale_side_popup('Smile! we have clicked the button for you');
    // fsale_box.getElementById("fmsg").innerHTML = "Smile! we have clicked the button for you";
    // $s(fsale_box).find('#ec-icon2').hide();
    // $s(fsale_box).find('.loading-bar').hide();
  });
  fslae_mo.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

function add_fsale_ini_mo() {
  let ele = fsale_code.button;
  let fslae_ini_mo = new MutationObserver(function (mutations) {
    if (!$s(ele) || !$s(ele).length || !ready_click) return;
    fslae_ini_mo.disconnect();
    console.log('button found');
    $s(fsale_code.button)[0].click();
    clicked = 1;
    fsale_continue();
    if (fsale_code.checkout_cookie && fsale_code.checkout_cookie.length > 1) {
      if (fsale_code.checkout_cookie.length == 2)
        setCookiesec(
          'fsckout',
          fkoco,
          fsale_code.checkout_cookie[0],
          fsale_code.checkout_cookie[1]
        );
      else
        setCookiesec(
          'fsckout',
          fkoco,
          fsale_code.checkout_cookie[0],
          fsale_code.checkout_cookie[1],
          fsale_code.checkout_cookie[2]
        );
    }
    rend_flash_sale_side_popup(
      "Smile! we have clicked the button for you, We will click it again if it dosen't work"
    );
    // fsale_box.getElementById("fmsg").innerHTML = "Smile! we have clicked the button for you, We will click it again if it dosen't work";
    // $s(fsale_box).find('#ec-icon2').hide();
    // $s(fsale_box).find('.loading-bar').hide();
    rm_fsale_ini_mo();
  });
  fslae_ini_mo.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

function rm_fsale_ini_mo() {
  let ele = fsale_code.button;
  let fslae_ini_mo_rm = new MutationObserver(function (mutations) {
    if ($s(ele) && $s(ele).length) return;
    fslae_ini_mo_rm.disconnect();
    add_fsale_ini_mo();
  });
  fslae_ini_mo_rm.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

function fsale_continue() {
  if (site == 'flipkart.com') callapi();
  else if (site == 'amazon.in') azcont();
  else if (site == 'oneplus.in') {
    setTimeout(function () {
      if (!$('.btnbox:visible').length) location.reload();
    }, 20000);
  }
}
if (getCookie('fsckout')) {
  if (site == 'mi.com') micont();
  if (site == 'flipkart.com') fkcont();
  if (site == 'samsung.com') smcont();
}
function popupcode() {
  // fsale_curr.preclicks = ['[aria-label="4GB+64GB"]','[aria-label="Aurora Blue"]'];
  ready_click = 1;
  if (fsale_code.addselbutton) addselbutton();
  if (fsale_curr.preclicks) {
    ready_click = 0;
    preclicks(fsale_curr.preclicks);
  }
  let tymleft = fsale_date - new Date().getTime();
  // if (!$s('#fs_salebox_container').length){
  //     // fsale_box = addshadow('fs_salebox_container');
  //     ref= 100;
  //     if(tymleft <= fsale_code.times.start_at*60000){
  //         ref= 50;
  //         if(fsale_code.refresh) ref = fsale_code.refresh+1;
  //     }
  //     rend_flash_sale_side_popup();//
  //     // fsale_box.innerHTML =      stringTemplateParser(bottom_box_temp, {homeurl:homeurl,ref:ref} );
  //     console.log(fsale_date, tymleft, fsale_code.times.start_at);
  // }
  if (tymleft > fsale_code.times.start_at * 60000) {
    var sdatetm = new Date(fsale_date);
    rend_flash_sale_side_popup(
      'Next Sale: ' +
        sdatetm.toLocaleString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
        }) +
        ' </br> If there is a sale before, please whatsapp us on 9999488008 ' +
        msg
    );
    // fsale_box.getElementById("fmsg")
    //     .innerHTML = "Next Sale: "+sdatetm.toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'})+" </br> If there is a sale before, please whatsapp us on 9999488008 " + msg;
    setTimeout(() => {
      location.reload();
    }, tymleft - fsale_code.times.start_at * 60000);
  } else if (tymleft <= fsale_code.times.start_at * 60000) {
    // fsale_box.getElementById("cnf-container-wrapper").classList.add("active");
    let box_txt = 'Scaning for buy button.';
    if (fsale_code.refresh) {
      setTimeout(() => {
        if (!clicked) location.reload();
      }, fsale_code.refresh * 1000);
      box_txt +=
        ' Your page will be refreshed in ' + fsale_code.refresh + 'sec';
    } else {
      setTimeout(() => {
        if (!clicked) location.reload();
      }, fsale_code.times.try_for * 60000 + tymleft);
    }
    if (
      tymleft < 90000 &&
      tymleft > -90000 &&
      fsale_code.sp_fun &&
      fsale_code.sp_fun == 'callapi'
    )
      setInterval(() => {
        console.log(2);
        if (!clicked) callapi(1);
      }, 1500);
    rend_flash_sale_side_popup(box_txt);
    // fsale_box.getElementById("fmsg").innerHTML = box_txt;
    if (fsale_code.keep_clicking) add_fsale_ini_mo();
    else addfslae_mo();
  }
}
function watch_url_change() {
  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.url_changed) {
      console.log(1);
      url = window.location.href;
      url_w_q = url.split('?')[0].split('#')[0];
      url_query = url.split('?').length > 1 ? url.split('?')[1] : '';
      rend_flash_sale_side_popup('', 1);
      console.log(2);
      chrome.storage.local.get('fsale_reg', function (data) {
        if (!data || !data['fsale_reg']) data = { fsale_reg: {} };
        startfsale(data['fsale_reg']);
      });
    }
  });
}
function preclicks(list) {
  let pr_len = list.length;
  let pr_i = 0;
  let preclicks_int = setInterval(function () {
    if ($s(list[pr_i]).length) {
      $s(list[pr_i])[0].click();
      pr_i++;
    }
    console.log(list[pr_i]);
    if (pr_i == pr_len) {
      ready_click = 1;
      clearInterval(preclicks_int);
    }
  }, 200);
  // preclicks_int = setInterval(function() {
  //     console.log(list[pr_i]);
  //     while($s(list[pr_i]).length) {
  //         $s(list[pr_i]).click();
  //         pr_i++;
  //         console.log(list[pr_i]);
  //         if(pr_i == pr_len){
  //             ready_click = 1;
  //             clearInterval(preclicks_int);
  //             break;
  //         }
  //     }
  // }, 200);
}

function track(mobile) {
  chrome.runtime.sendMessage({
    tracksell: mobile,
  });
}

function setCookiesec(cname, cvalue, exsec, path, domain) {
  if (path == '') path = '/';
  let d = new Date();
  d.setTime(d.getTime() + exsec * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=' + path;
  if (domain)
    document.cookie =
      cname +
      '=' +
      cvalue +
      '; ' +
      expires +
      '; path=' +
      path +
      ';domain=' +
      domain;
}

function getCookie(cvalue) {
  let name = cvalue + '=';
  let ca = document.cookie.split('; ');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    if (c.indexOf(name) == 0) return c.split('=')[1];
  }
  return 0;
}

if (
  (url.search('orderresponse.reference_id') > 0 ||
    url.search('buy/thankyou/') > 0) &&
  getCookie('CONG')
) {
  window.open('https://bit.ly/reviewfs', '_blank');
  setCookiesec('CONG', 1, 0, '/');
}

function getXMLHTTPRequest() {
  req = new XMLHttpRequest();
  return req;
}

function showregbutton(coo) {
  rend_flash_sale_reg_side_popup(coo);
  // cfsbtn_ele = addshadow('fs_fsale_btn_container');
  // cfsbtn_ele.innerHTML = flash_sale_side_popup('side button');// stringTemplateParser(salebutton_temp, {homeurl:homeurl} );
  // cfsbtn_ele.getElementById("regbt").onclick = function(){
  //     console.log('clicked');
  // chrome.runtime.sendMessage({
  //     dataMSg:{
  //         msg: 'regautobuy',
  //         data: coo
  //     }
  // }
  // // , function(response) {
  // //     location.reload();
  // // }
  // );
  // };
}
export { is_flash };
