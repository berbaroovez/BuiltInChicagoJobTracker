//woo
console.log('hacking in doooooood');

chrome.webRequest.onHeadersReceived.addListener(
  (result) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('Tabs here', tabs);

      // send a message to current tab
      try {
        chrome.tabs.sendMessage(tabs[0].id, { url: result.url });
      } catch (e) {
        console.log('Tab was not focused... ', e);
      }
    });
    return true;
  },
  {
    types: ['xmlhttprequest'],

    //these are the urls that we look sniff for from the request tab
    urls: [
      'https://api.builtin.com/services/job-retrieval/legacy-*',
      'http://api.builtin.com/services/job-retrieval/legacy-*',
    ],
  },
  []
);

// chrome.tabs.query(
//   { active: true },
//   // { active: true, currentWindow: true },
//   (tabs) => {
//     console.log('Tabs', tabs);

//     // send a message to current tab

//     chrome.tabs.sendMessage(tabs[0].id, { url: 'Hello' });

//     // chrome.webRequest.onHeadersReceived.addListener(
//     //   (result) => {
//     //     chrome.tabs.sendMessage(tabs[0].id, { url: result.url });
//     //   },
//     //   {
//     //     types: ['xmlhttprequest'],

//     //     //these are the urls that we look sniff for from the request tab
//     //     urls: [
//     //       'https://api.builtin.com/services/job-retrieval/legacy-*',
//     //       'http://api.builtin.com/services/job-retrieval/legacy-*',
//     //     ],
//     //   }
//     // );
//   }
// );
