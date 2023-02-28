var manifestData = chrome.runtime.getManifest();
getsaledata = function () {
  console.log(2);
  return new Promise(function (resolve) {
    chrome.storage.local.get('fsale_base', function (result) {
      resolve(result);
    });
  }).then((fsale_data) => {
    return new Promise((resolve, reject) => {
      ifModified = false;
      if (fsale_data && fsale_data.fsale_base) ifModified = true;
      $s.ajax({
        // url: "http://localhost/saledata.json?v="+manifestData.version,
        url:
          'https://cdn1.flipshope.com/saledata.json?v=' + manifestData.version,
        // async: async,
        // cache: false,
        ifModified: ifModified,
        type: 'GET',
        success: function (result) {
          console.log(result);
          document.cookie =
            'salenoretrive=1;expires=' +
            new Date(new Date().getTime() + 60000).toGMTString();
          if (result) {
            chrome.storage.local.set({ fsale_base: result });
            resolve(result);
          } else if (fsale_data && fsale_data.fsale_base)
            resolve(fsale_data.fsale_base);
          else reject('Some error occurred');
        },
        error: function (error) {
          $s.ajax({
            url:
              'https://storage.googleapis.com/fspe/saledata.json?v=' +
              manifestData.version,
            // async: async,
            // cache: false,
            ifModified: ifModified,
            type: 'GET',
            success: function (result) {
              document.cookie =
                'salenoretrive=1;expires=' +
                new Date(new Date().getTime() + 60000).toGMTString();
              if (result) {
                chrome.storage.local.set({ fsale_base: result });
                resolve(result);
              } else resolve(fsale_data.fsale_base);
            },
            error: function () {
              if (fsale_data.fsale_base && fsale_data.fsale_base.fsale_base)
                resolve(fsale_data.fsale_base.fsale_base);
              reject('Please check your internet connection');
            },
            timeout: 4000,
          });
        },
        timeout: 3000,
      });
    });
  });
};
function getstorage(name) {
  return new Promise(function (resolve) {
    chrome.storage.local.get([name], function (result) {
      resolve(result);
    });
  });
}

function getstorageval(name) {
  return new Promise(function (resolve) {
    chrome.storage.local.get([name], function (result) {
      if (result && result[name]) {
        resolve(result[name]);
      }
      resolve(false);
    });
  });
}

function removestorage(name) {
  if (!name || name == null) resolve(false);
  return new Promise(function (resolve) {
    chrome.storage.local.remove([name], function (result) {
      resolve(name);
    });
  });
}

function setstorage(name, value = null) {
  return new Promise(function (resolve) {
    if (value == null) x = name;
    else {
      x = {};
      x[name] = value;
    }
    chrome.storage.local.set(x, function (result) {
      resolve(value);
    });
  });
}

function deleteUserProductSubscription(pid, sendResponse = 0) {
  $s.post('https://flipshope.com/api/pricewatch/', 'delete=1&pid=' + pid)
    .then((response) => {
      if (response && response.success == true) {
        getstorageval('watchlist').then((list) => {
          if (!list) list = {};
          delete list[pid];
          setstorage('watchlist', list);
        });
      }
      if (sendResponse) sendResponse(response);
      return Promise.resolve(response);
    })
    .catch((e) => {
      if (sendResponse)
        sendResponse({ success: false, casue: 'Unknown Error' });
      Promise.resolve(0);
    });
}

var loginid = function (soft = 0) {
  if (soft) return getstorageval('login');
  return new Promise((resolve, reject) => {
    removestorage('login');
    $s.ajax({
      url: 'https://flipshope.com/login/getUserData.php',
      cache: false,
      type: 'POST',
      success: function (resp) {
        if (resp) {
          if (resp['validated'] == 1) setstorage('login', resp);
          resolve(resp);
        } else resolve(0);
      },
      error: function (error) {
        resolve(0);
      },
      timeout: 3000,
    });
  });
};

function fetchwatchlist() {
  return $s
    .post('https://flipshope.com/api/pricewatch/', 'get=1')
    .then((response) => {
      if (response.data) {
        data = response.data;
        list = {};
        for (var tempi = data.length - 1; tempi >= 0; tempi--) {
          list[data[tempi]['pid']] = data[tempi];
        }
        setstorage('watchlist', list);
        return Promise.resolve(list);
      } else Promise.reject('connection Error');
    })
    .catch((e) => {
      console.log(e);
    });
}

storageExpire = {
  get: async (key) => {
    const data = await getstorageval(key);

    if (!data) return data;

    const { expire, value } = data;

    if (expire < Date.now()) {
      removestorage(key);
      return null;
    }

    return value;
  },
  set: async (key, value, expire = false, callback = false) => {
    if (expire && typeof expire === 'number')
      expire = Math.round(expire * 1000 + Date.now()); // * 1000 to use seconds

    return setstorage(key, { value, expire });
  },
  removeall: async () => {
    const data = await getstorageval(null);
    console.log(data);
  },
};
