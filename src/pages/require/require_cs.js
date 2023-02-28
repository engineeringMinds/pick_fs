import psl from 'psl';
import jQuery from 'jquery';

let url = window.location.href,
  domain = new URL(url),
  hostname,
  parsed_url,
  site;
if (domain) {
  hostname = domain.hostname;
  if (hostname) {
    parsed_url = psl.parse(hostname);
    site = parsed_url.domain;
  }
}
let $s = jQuery.noConflict();

export function setCookiesec(cname, cvalue, exsec, path, domain) {
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

export function getCookie(cvalue) {
  let name = cvalue + '=';
  let ca = document.cookie.split('; ');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    if (c.indexOf(name) == 0) return c.split('=')[1];
  }
  return 0;
}

export function setCookie(cname, cvalue, exmin) {
  var d = new Date();
  d.setTime(d.getTime() + exmin * 60 * 1000);
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
}
// console.log(domain,'parsed_url');
export { url, domain, hostname, parsed_url, site, $s };
