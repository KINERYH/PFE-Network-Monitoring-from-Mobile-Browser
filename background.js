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

function initMemory() {
  let systemInfo = {};
  chrome.system.memory.getInfo(function (memoryInfo) {
    systemInfo.systemAvailableCapacity = (memoryInfo.availableCapacity / (1024 ** 3)).toFixed(2);
    systemInfo.systemCapacity = (memoryInfo.capacity / (1024 ** 3)).toFixed(2);
  });
  return systemInfo;
}

function getSystemMemoryInfo() {
  let systemInfo = {};
  if (window.navigator.deviceMemory) {
    systemInfo.systemCapacity = `${window.navigator.deviceMemory} GB`;
  } else {
    systemInfo.systemCapacity = "Information not available.";
  }

  try {
    let memory = window.performance.memory;
    systemInfo.systemAvailableCapacity = `${((memory.totalJSHeapSize - memory.usedJSHeapSize) / (1024 ** 2)).toFixed(2)} MB`;
  } catch (e) {
    systemInfo.systemAvailableCapacity = "Information not available.";
  }
  return systemInfo;
}

async function getCpuInfo() {
  return new Promise((resolve, reject) => {
    chrome.system.cpu.getInfo(function (info) {
      if (info) {
        var cpuName = info.modelName;
        var cpuArch = info.archName.replace(/_/g, '-');
        var cpuFeatures = info.features.join(' ').toUpperCase().replace(/_/g, '.') || '-';
        var cpuNumOfProcessors = info.numOfProcessors;
        var cpuProcessors = info.processors;

        let cpuInformation = { cpuName: cpuName, cpuArch: cpuArch, cpuFeatures: cpuFeatures, cpuNumOfProcessors: cpuNumOfProcessors, cpuProcessors: cpuProcessors }
        resolve(cpuInformation);
      } else {
        reject(new Error('Unable to get CPU information'));
      }
    });
  });
}
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

async function get(t) {
  
  const connection = window.navigator.connection || window.navigator.mozConnection || null;

  var systemInfo = initMemory();
  // var systemInfo = getSystemMemoryInfo();
  let cpuInformation = await getCpuInfo();
  
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
  displayData += connection.effectiveType;
  displayData += ',';
  displayData += connection.downlink;
  displayData += ',';
  displayData += connection.rtt;
  displayData += ',';
  displayData += systemInfo.systemCapacity;
  displayData += ',';
  displayData += systemInfo.systemAvailableCapacity;
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuName);
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuArch)
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuFeatures);
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuNumOfProcessors);
  displayData += ',';
  displayData += JSON.stringify(cpuInformation.cpuProcessors).replace(/,/g, " ");
  displayData += ',';
  displayData += new Date(t.start).toString();
  displayData += ',';
  displayData += Math.round(t.duration);
  displayData += ',';
  displayData += JSON.stringify(t.name);
  
  localStorage.setItem("displayData", displayData)
  
  saveData(displayData.split(','));
}

function saveData(displayData) {
  var data = "";
  for (let i = 0; i <= 10; i++) {
    data = data + displayData[i].split(' ')[1] + ',';
  }
  for (let i = 11; i < (displayData.length - 2); i++) {
    data = data + displayData[i] + ',';
  }
  data = data + extractDomain(displayData[displayData.length - 1]) + ';\n'
  
  previousData = localStorage.getItem("testData");
  if (previousData == null) {
    localStorage.setItem("testData", data)
  } else {
    localStorage.setItem("testData", previousData + data)
  }


  // function extractDomain(url) {
  //   let domain;
  //   if (url.indexOf("://") > -1) {
  //     domain = url.split("/")[2];
  //   } else {
  //     domain = url.split("/")[0];
  //   }
  //   domain = domain.split(":")[0];
  
  //   return domain.split(".")
  //     .slice(-2)
  //     .join(".");
  // }

  function extractDomain(url) {
    let protocolIndex = url.indexOf("://");
    let domainIndex = url.indexOf("/", protocolIndex + 3);
    let domain = url.substring(1, domainIndex);
    return domain;
  }
}
