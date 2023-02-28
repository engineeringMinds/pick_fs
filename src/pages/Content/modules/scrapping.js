import { get_price, returnPID,$y } from "../../require/require";
import jQuery from "jquery";
import psl from 'psl';

let g_code,
  site,
  $s = jQuery.noConflict();

let domain = new URL(window.location.href);
if (domain) {
  let hostname = domain.hostname;
  if (hostname) {
    let parsed_url = psl.parse(hostname);
    site = parsed_url.domain;
  }
}
let arrayToSendold = {};
let arrayToSend ={};

let push1 = function (x, a) { x[a[0].toString()] = a[1]; };
chrome.storage.local.get('graph_base',function(data){
    if(data) data = data.graph_base;
    if(!data || !data[site]) return;
    g_code = data[site];
    try{
        // console.log(g_code.pg_data_sel);
        let all_sels = JSON.parse(g_code.pg_data_sel);
        getPairs_rpt(g_code.site_id,all_sels,1);
        // setTimeout(function(){getPairs(g_code.site_id,all_sels);}, 2500);
        // setInterval(function(){getPairs(g_code.site_id,all_sels);}, 6000);
    }
    catch(e){
        console.log('error',e)
    }
    try{
        console.log(g_code.prod_data_sel);
        window.pd_sels = g_code.prod_data_sel;
        pd_sels = JSON.parse(g_code.prod_data_sel);
        let PID = returnPID(g_code.site_id, window.location.href);
        if(PID) setTimeout(function(){get_product_info_rpt(g_code.site_id,pd_sels,0);}, 5000);
    }
    catch(e){
        console.log('error',e)
    }
});
function getPairs_rpt(site_id,all_sels,t1){
    // console.log('site_id,all_sels ,t1',site_id,all_sels ,t1)
    if(t1 >15) return; 
    ++t1;
    getPairs(site_id,all_sels);
    setTimeout(function(){getPairs_rpt(site_id,all_sels,t1)}, t1*2000);
}

function get_product_info_rpt(site_id,pd_sels ,t){
    console.log('site_id,pd_sels ,t',site_id,pd_sels ,t)
    if(t >3) return; 
    ++t;
    let res = get_product_info(site_id,pd_sels);
    if(!res) setTimeout(function(){get_product_info_rpt(site_id,pd_sels,t)}, t*8000);
}
// console.log("senddata");
function getPairs(store_id,selectors) {
    store_id = parseInt(store_id);
    // console.log(selectors);
    for (let sl = 0; sl < selectors.length; sl++) {
        // console.log("selector",sl);
        let selector = selectors[sl]
        if ($s(selector[0]).length > 0) {
            let slider = $s(selector[0]);
            let sliderLength = slider.length;
            let link;
            let price = 0;
            let PID;
            for (let i = 0; i < sliderLength; i++) {
                try{
                    price = "";
                    PID = "";
                    let curr_prod = $s(selector[0])[i];
                    link = $y(selector[1],curr_prod);
                    if (link){

                        if(selector[1].indexOf('.getattr(')  > 0) PID = link;
                        else{
                            link = link.href || link.src;
                            if(link) PID = returnPID(store_id, link);
                        }
                        if (PID) {
                            //price
                            let p_selctors = selector[2].split(',');
                            for(let ps = 0; ps<p_selctors.length;ps++){
                                let price_sel = $y(p_selctors[ps],curr_prod);
                                if (price_sel) {
                                    price = get_price(price_sel.innerText || price_sel);
                                    if(price) break;
                                }
                            }
                            if (price && price > 0) {
                                // if(!arrayToSend[PID] || arrayToSend[PID] != price ) console.log([PID, price]);
                                push1(arrayToSend, [PID, price]);
                            }
                        }

                    } 
                }
                catch(e){
                    console.log(e);
                }
            } // for ends
        }
    }
    sendnow(arrayToSend,store_id);
    return arrayToSend;
}
function get_product_info(store_id, selector) {
    // console.log('get_product_info');
    let link = window.location.href;
    let PID = returnPID(store_id, link);
    window.selecs = selector;
    console.log('site_id,pd_sels ,t2',PID,selector,selector['title'])
    if (PID && $s(selector['title']).length) {
        console.log('get_product_info2');        
        let prduct_info = {pid:PID};
        let attrs = Object.keys(selector);
        for (let i =0 ; i < attrs.length; i++) {
            try{
                let variab = attrs[i];
                let cur_data = $y(selector[attrs[i]]).innerText;
                if(variab == 'price') {
                    cur_data = get_price(cur_data);
                    if(cur_data) push1(arrayToSend, [PID, cur_data]);
                }
                prduct_info[variab] = cur_data;
            }
            catch(e){
                console.log(attrs[i],e);
            }
        }
        console.log(prduct_info);
        chrome.runtime.sendMessage({dataMSg:{
            msg: 'sendprods',
            data:{
                site: store_id,
                prod_data: JSON.stringify(prduct_info)
            }
        }});
        return true;
    }
    return false;
}

function sendnow(arrayToSend,site){
    // if(arrayToSendold && arrayToSend){
    //     arrayToSend = keepnew(arrayToSendold,arrayToSend);
    // }
    arrayToSend = keepnew(arrayToSendold,arrayToSend);
    arrayToSendold = {...arrayToSendold, ...arrayToSend};
    // else{
    //     arrayToSendold = arrayToSend;
    // }
    console.log(arrayToSend);
    if(Object.keys(arrayToSend).length){
        arrayToSend = convert2d(arrayToSend);
        arrayToSend = JSON.stringify(arrayToSend);
        chrome.runtime.sendMessage({dataMSg:{
            msg: 'sendpairs',
            data:{
                site: site,
                pairs: arrayToSend
            }
        }});
    }
}

function keepnew(old1,new1){
    Object.keys(old1).forEach(function (item) {
        delete new1[item];
    });
    return new1;
}
function convert2d(x){
    let y= [];
     Object.keys(x).forEach(function (item) {
        y.push([item,x[item]]);
    });
    return y;
}