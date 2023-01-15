// Setting a toolbar badge text
browser.runtime.onMessage.addListener((request, sender) => {
  // This cache stores page load time for each tab, so they don't interfere
  browser.storage.local.get('cache').then(data => {
    if (!data.cache) data.cache = {};
    data.cache['tab' + sender.tab.id] = request.timing;
    get(request.timing)
    browser.storage.local.set(data).then(() => {
      browser.browserAction.setBadgeText({text: request.time, tabId: sender.tab.id});
      browser.browserAction.setPopup({tabId: sender.tab.id, popup: "popup.html"})
    });
  });

});

// cache eviction
browser.tabs.onRemoved.addListener(tabId => {
  localStorage.removeItem("displayData");
  browser.storage.local.get('cache').then(data => {
    if (data.cache) delete data.cache['tab' + tabId];
    browser.storage.local.set(data);
  });
});

function set(id, start, end, noacc) {
  
  var displayData = "";

  displayData += Math.round(start);
  displayData += ' ';
  displayData += Math.round(end - start);
  displayData += ' ';
  displayData += noacc ? '-' : Math.round(end);
  return displayData;
}

function get(t) {
  
  var displayData = "";
  
  // https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html#processing-model
  displayData += set('redirect', t.redirectStart, t.redirectEnd);
  displayData += ',';
  displayData += set('dns', t.domainLookupStart, t.domainLookupEnd);
  displayData += ',';
  displayData += set('connect', t.connectStart, t.connectEnd);
  displayData += ',';
  displayData += set('request', t.requestStart, t.responseStart);
  displayData += ',';
  displayData += set('response', t.responseStart, t.responseEnd);
  displayData += ',';
  displayData += set('dom', t.responseEnd, t.domComplete);
  displayData += ',';
  displayData += set('domParse', t.responseEnd, t.domInteractive);
  displayData += ',';
  displayData += set('domScripts', t.domInteractive, t.domContentLoadedEventStart);
  displayData += ',';
  displayData += set('contentLoaded', t.domContentLoadedEventStart, t.domContentLoadedEventEnd);
  displayData += ',';
  displayData += set('domSubRes', t.domContentLoadedEventEnd, t.domComplete);
  displayData += ',';
  displayData += set('load', t.loadEventStart, t.loadEventEnd);
  displayData += ',';
  displayData += Math.round(t.duration);
  displayData += ',';
  displayData += new Date(t.start).toString();
  displayData += ',';
  displayData += JSON.stringify(t.name);
  
  localStorage.setItem("displayData", displayData)
  
  saveData(displayData.split(','));
}

function saveData(displayData) {
  var data = "";
  for (let i = 0; i < (displayData.length - 3); i++) {
    data = data + displayData[i].split(' ')[1] + ',';
  }
  data = data + displayData[displayData.length - 1] + ';\n'
  
  previousData = localStorage.getItem("testData");
  if (previousData == null) {
    localStorage.setItem("testData", data)
  } else {
    localStorage.setItem("testData", previousData + data)
  }
}
