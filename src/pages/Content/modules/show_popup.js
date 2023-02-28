extension_name = 'Flipshope';
var ffurl = window.location.href;
function cz_setCookie(cname, cvalue, exsec) {
    var d = new Date();
    d.setTime(d.getTime() + (exsec*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires +"; path=/";
}
function cz_getCookie(cvalue)
{
    var name = cvalue+"=";
    var ca = document.cookie.split('; ');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        if (c.indexOf(name) == 0) return c.split("=")[1];
    }
    return 0;
}
var ct =0;
// if(site == 'indiadesire') setTimeout(function(){document.body.style.display = "none";},500);
function spp(request, sender){
    var res = JSON.parse(request.popup);
    ct=1;
    var elemDiv = document.createElement('div');
    elemDiv.style.cssText = 'position: fixed;box-shadow: 0px 1px 12px 1px grey;right: 10px;bottom: 10px;z-index: 2147483647;background: white;padding: 20px;font-size: 15px;'+res['css'];
    elemDiv.id = "cz_a";
    let footer = '';
    if(res['footer']) footer = '<div style="bottom: 4px;margin-bottom: -15px;font-size: 9px;width: 100%;text-align: -webkit-right;color: black;">suggestion by: '+extension_name+'</div>';
    let close = '<div id="cz_close" style="position: absolute;right: 0px;top: 0px;cursor: pointer;z-index: 1;border-radius: 39px;width: 27px;text-align: center;height: 27px;line-height: 27px;">x</div>';
    document.body.appendChild(elemDiv);
    var theDiv = document.getElementById("cz_a");
    if(res['image']) cont = '<img src="'+res['image']+'" style="width:'+res['width']+'">';
    else if(res['text']) cont = res['text'];
    theDiv.innerHTML += close+'<a id="cz_link" href="'+res['link']+'" target="_blank" style="font-size: 15px;line-height: 18px;">'+cont+'</a>'+footer; 
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(let i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
    document.getElementById('cz_close').onclick = function(){elemDiv.remove(); cz_setCookie("cz_cls",parseInt(cz_getCookie("cz_cls"))+1, 60*60*24*10)};
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    // console.log(request);
    if (request.popup && !ct) {
        if(document.body) spp(request, sender);
        else setTimeout(function(){  
            if(document.body) spp(request, sender);
            else setTimeout(function(){ 
                spp(request, sender); 
            }, 1500); 
        }, 3000);
    }
});
// chrome.runtime.onMessage.addListener(function(request, sender) {
//     if (request.popup && !ct) {
//     if(document.body)
//         var res = JSON.parse(request.popup);
//         ct=1;
//         var elemDiv = document.createElement('div');
//         elemDiv.style.cssText = 'position: fixed;box-shadow: 0px 1px 12px 1px grey;right: 10px;bottom: 10px;z-index: 2147483647;background: white;padding: 20px;font-size: 15px;'+res['css'];
//         elemDiv.id = "cz_a";
//         footer = '';
//         if(res['footer']) footer = '<div style="bottom: 4px;margin-bottom: -15px;font-size: 9px;width: 100%;text-align: -webkit-right;color: black;">suggestion by: '+extension_name+'</div>';
//         close = '<div id="cz_close" style="position: absolute;right: 0px;top: 0px;cursor: pointer;z-index: 1;border-radius: 39px;width: 27px;text-align: center;height: 27px;line-height: 27px;">x</div>';
//         document.body.appendChild(elemDiv);
//         var theDiv = document.getElementById("cz_a");
//         if(res['image']) cont = '<img src="'+res['image']+'" style="width:'+res['width']+'">';
//         else if(res['text']) cont = res['text'];
//         theDiv.innerHTML += close+'<a id="cz_link" href="'+res['link']+'" target="_blank" style="font-size: 15px;line-height: 18px;">'+cont+'</a>'+footer; 
//         Element.prototype.remove = function() {
//             this.parentElement.removeChild(this);
//         }
//         NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
//             for(var i = this.length - 1; i >= 0; i--) {
//                 if(this[i] && this[i].parentElement) {
//                     this[i].parentElement.removeChild(this[i]);
//                 }
//             }
//         }
//         document.getElementById('cz_close').onclick = function(){elemDiv.remove(); cz_setCookie("cz_cls",parseInt(cz_getCookie("cz_cls"))+1, 60*60*24*10)};
//     }
// });
