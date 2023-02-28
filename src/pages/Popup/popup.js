let close_btns = document.querySelectorAll('.close');

close_btns.forEach(close_btn => {
  close_btn.onclick = function(){
    window.close();
  }
});

document.querySelector('.refresh').onclick = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
  window.close();
}
function is_valid_page(t) {
  return t && (!t.match("https://chrome.google.com")) && (!t.match("chrome://")) && (t.match("http://") || t.match("https://"));
} 
chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
  var currentTab = tabs[0];
  console.log(currentTab,'currentTab');
  if(!is_valid_page(currentTab['url'])) return;
  document.querySelector('.heading').innerText = 'Refresh the page';
  document.querySelector('.msg').innerText = 'Please refresh this page for extension to work.';
  document.querySelector('.close.tgl-btn').style.display = "none";
  document.querySelector('.refresh.tgl-btn').style.display = "block";
});