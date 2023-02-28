import psl from 'psl';

// ************* temp testing ******************
console.log('welcome to tem testing ...');
(function tempTestingDomain() {
  let domain = new URL(myurl);
  // console.log();
  if (!domain) {
    console.log('no domain...');
  }
  let hostname = domain.hostname;
  if (!hostname) {
    console.log('no hostname...');
  }
  let parsed_url = psl.parse(hostname);
  let siteDomain = parsed_url.domain;
  console.log('siteDomain:.....................', siteDomain);
})(location.href);
