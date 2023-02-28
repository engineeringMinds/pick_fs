export function check_store_availability(global_avail_store_var) {
  let avail_store_data = undefined;
  console.log('inside check store avail');
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { dataMSg: { msg: 'fetch_tab_info', data: '' } },
      (response) => {
        if (response && response.msg && response.msg == 'fetch_tab_info') {
          let myurl = response.data;
          let siteURL = myurl;
          myurl =
            myurl.indexOf('//') > -1
              ? myurl.split('/')[2]
              : myurl.split('/')[0];
          myurl = myurl.split(':')[0];
          myurl = myurl.split('?')[0];
          console.log('current url', myurl);
          let parsed_url = psl.parse(myurl);
          parsed_url.domain = parsed_url.domain;

          if (!global_avail_store_var[parsed_url.domain]) {
            avail_store_data = undefined;
            resolve(avail_store_data);
          }
          if (
            !siteURL.includes(
              global_avail_store_var[parsed_url.domain][0].match
            ) &&
            !siteURL.includes(
              global_avail_store_var[parsed_url.domain][0].subdomain
            )
          ) {
            avail_store_data = undefined;
            resolve(avail_store_data);
          }

          avail_store_data = {
            store_id: global_avail_store_var[parsed_url.domain][0].subdomain_id,
            url: siteURL,
          }; //*** store is available *******
          console.log(
            'avail store data: ',
            avail_store_data,
            global_avail_store_var[parsed_url.domain][0].subdomain_id
          );
          resolve(avail_store_data);
        } else {
          avail_store_data = undefined;
          reject(avail_store_data);
        }
      }
    );
  });
}
