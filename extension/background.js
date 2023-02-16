/* The logic behind the automated browsing is:
1) Close the previous tab (if it's not the only tab open)
2) Load the current page
3) Carry out the measurements
4) Save the measurements
5) Open a new tab
*/

// Initiaize Flag for browsing automation
var isAutomation = false;
localStorage.setItem("automation", "false");

// List of websites for browsing automation
// const websitesList = [
//   'google.com',
//   'youtube.com',
//   'baidu.com',
//   'bilibili.com',
//   'qq.com',
//   'twitter.com',
//   'zhihu.com',
//   'wikipedia.org',
//   'amazon.com',
//   'instagram.com',
//   'linkedin.com'
// ];

// const websitesList = [ 'google.com', 'youtube.com', 'instagram.com', 'twimg.com', 'linkedin.com', 'tistory.com', 'qq.com'];

const websitesList = ['google.com', 'zunaso.com', 'youtube.com', 'baidu.com', 'bilibili.com', 'facebook.com', 'qq.com', 'twitter.com', 'zhihu.com', 'wikipedia.org', 'amazon.com', 'instagram.com', 'linkedin.com', 'reddit.com', 'whatsapp.com', 'openai.com', 'yahoo.com', 'bing.com', 'taobao.com', '163.com', 'xvideos.com', 'live.com', 'pornhub.com', 'microsoft.com', 'vk.com', 'zoom.us', 'github.com', 'jd.com', 'weibo.com', 'tiktok.com', 'canva.com', 'csdn.net', 'fandom.com', 'office.com', 'naver.com', 'apple.com', 'aliexpress.com', 'yahoo.co.jp', 'xhamster.com', 'paypal.com', 'iqiyi.com', 'spankbang.com', 'pinterest.com', 'mail.ru', 'ebay.com', 'douban.com', 'msn.com', 'imdb.com', 'amazon.in', 'netflix.com', 'adobe.com', 'telegram.org', 'dzen.ru', 'quora.com', 'stackoverflow.com', 'spotify.com', 'aliyun.com', 'xnxx.com', 'myshopify.com', 'tmall.com', 'indeed.com', 'deepl.com', 'twimg.com', 'pixiv.net', 'feishu.cn', 'duckduckgo.com', 'amazon.co.jp', 'msn.cn', 'tencent.com', 'freepik.com', 'etsy.com', 'amazon.co.uk', 'booking.com', 'imgur.com', 'jianshu.com', 'ilovepdf.com', 'twitch.tv', 'atlassian.net', 'force.com', 'dropbox.com', 'office365.com', 'alipay.com', 'discord.com', 'namu.wiki', 't.me', 'wordpress.com', 'nih.gov', 'tradingview.com', 'avito.ru', '3dmgame.com', 'xiaohongshu.com', 'instructure.com', 'onlyfans.com', 'amazonaws.com', 'flipkart.com', 'hao123.com', 'alibaba.com', 'hupu.com', 'cnki.net', 'mediafire.com', 'tistory.com']

// Setting a toolbar badge text
browser.runtime.onMessage.addListener((request, sender) => {
  // This cache stores page load time for each tab, so they don't interfere
  browser.storage.local.get('cache').then(data => {
    if (!data.cache) data.cache = {};
    data.cache['tab' + sender.tab.id] = request.timing;
    get(request.timing);
    // Set the badge of the extension
    browser.storage.local.set(data).then(() => {
      browser.browserAction.setBadgeText({ text: request.time, tabId: sender.tab.id });
      browser.browserAction.setPopup({ tabId: sender.tab.id, popup: "popup.html" })
    });
  });
  isAutomation = automation();
  if (isAutomation) {
    try {
      var websiteIndex = localStorage.getItem("websiteIndex");
      if (websiteIndex == 'null') {
        websiteIndex = "-1";
      } else {
        closePreviousTab();
      }
      var newWebsiteIndex = parseInt(websiteIndex);
      openNewTab(newWebsiteIndex);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        if (currentTab) {
          console.log(newWebsiteIndex + " " + currentTab.url)
        }
      })
    } catch (err) {
      console.log("Error");
      var websiteIndex = localStorage.getItem("websiteIndex");
      if (websiteIndex == 'null') {
        websiteIndex = "-1";
      }
      var newWebsiteIndex = parseInt(websiteIndex);
      openNewTab(newWebsiteIndex);
    }

    // Set the maximum loading time in milliseconds
    const MAX_LOADING_TIME = 20000;

    // Set a timeout function to check if the current tab is taking too much time to load
    const timeout = setTimeout(() => {
      isAutomation = automation();
      if (isAutomation) {
        // Get the current tab and close it
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          var currentTab = tabs[0];
          if (currentTab) {
            console.log(currentTab.url + " is taking too much time to load, closing tab...");
            chrome.tabs.remove(currentTab.id);
          }
        });

        // Open the next website in a new tab
        var websiteIndex = localStorage.getItem("websiteIndex");
        if (websiteIndex == 'null') {
          websiteIndex = "-1";
        }
        var newWebsiteIndex = parseInt(websiteIndex);
        openNewTab(newWebsiteIndex);
      }
    }, MAX_LOADING_TIME);

    // Listen for the "load" event of the current tab and clear the timeout
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (tab.active && changeInfo.status == "complete") {
        clearTimeout(timeout);
      }
    });
  } else {
    localStorage.setItem("websiteIndex", null);
  }
});

function automation() {
  let isAutomation = localStorage.getItem("automation");
  if (isAutomation == null || isAutomation == "null" || isAutomation == "false") {
    return false;
  } else {
    return true;
  }
}

function openNewTab(newWebsiteIndex) {
  setTimeout(() => {
    newWebsiteIndex++;
    if (newWebsiteIndex < websitesList.length) {
      localStorage.setItem("websiteIndex", newWebsiteIndex);
      var websiteUrl = "https://www." + websitesList[newWebsiteIndex];
      fetch(websiteUrl)
        .then(response => {
          if (response.status == 200) {
            window.open(websiteUrl, "_blank");
          } else {
            console.log("Error: website cannot be reached - closing tab");
            openNewTab(newWebsiteIndex);
          }
        })
        .catch(error => {
          console.log("Error: website cannot be reached - closing tab");
          openNewTab(newWebsiteIndex);
        });

    } else {
      localStorage.setItem("websiteIndex", null);

      localStorage.setItem("automation", "false");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { checkboxState: false });
      });
    }
  }, 500);
}

function closePreviousTab() {
  return new Promise(() => {
    let count = 0;

    function tryToCloseTab() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let activeTab = tabs[0];
        if (activeTab) {
          chrome.tabs.query({ index: activeTab.index - 1 }, function (tabs) {
            var previousTab = tabs[0];
            if (previousTab) {
              chrome.tabs.remove(previousTab.id);
            } else {
              console.log('There is no tab to the left');
            }
          });
        } else {
          count++;
          if (count >= 5) {
            console.log('Unable to close tab!');
          } else {
            setTimeout(tryToCloseTab, 200);
          }
        }
      });
    }

    tryToCloseTab();
  });
}

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

  localStorage.setItem("displayData", displayData);

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
