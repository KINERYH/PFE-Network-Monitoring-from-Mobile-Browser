const downloadBtn = document.getElementById("download");
const clearBtn = document.getElementById("clear");
var automationCheckbox = document.getElementById("automation");

var displayData = localStorage.getItem("displayData").split(',');
var total = displayData[displayData.length - 2];

displayDataOnTab();

function saveData(content) {
  previousData = localStorage.getItem("testData");
  if (previousData == null) {
    localStorage.setItem("testData", content)
  } else {
    localStorage.setItem("testData", previousData + content)
  }
}

function set(id, displayDataRecordString) {
  const displayDataRecord = displayDataRecordString.split(' ');
  // var x = Math.round(start / total * 300);
  document.getElementById(id + 'When').innerHTML = displayDataRecord[0];
  document.getElementById(id).innerHTML = displayDataRecord[1];
  document.getElementById(id + 'Total').innerHTML = displayDataRecord[2];

  // document.getElementById('r-' + id).style.cssText =
  // 'background-size:' + Math.round(displayDataRecord[1] / total * 300) + 'px 100%;' +
  // 'background-position-x:' + (x >= 300 ? 299 : x) + 'px;';
}

function displayDataOnTab() {
  set('redirect', displayData[0]);
  set('dns', displayData[1]);
  set('connect', displayData[2]);
  set('request', displayData[3]);
  set('response', displayData[4]);
  set('dom', displayData[5]);
  set('domParse', displayData[6]);
  set('domScripts', displayData[7]);
  set('contentLoaded', displayData[8]);
  set('domSubRes', displayData[9]);
  set('load', displayData[10]);
  document.getElementById("total").innerHTML = Math.round(total);
  document.getElementById("requestStart").innerHTML = new Date(displayData[displayData.length - 3]).toString();
}

downloadBtn.addEventListener('click', function () {
  testData = localStorage.getItem("testData");

  if (testData != null) {
    document.getElementById("test").innerHTML = testData;

    // Save as file
    var header = "redirect,dns,connect,request,response,dom,domParse,domScripts,contentLoaded,domSubRes,load,effectiveType,downlink,rtt,systemCapacity,systemAvailableCapacity,cpuName,cpuArch,cpuFeatures,cpuNumOfProcessors,cpuProcessors,date,name;\n";
    var url = 'data:application/plain;base64,' + btoa(unescape(encodeURIComponent(header + testData)));
    // var url = "data:text/csv;charset=utf-8," + encodeURI(header + testData);
    chrome.downloads.download({
      url: url,
      // filename: 'testData/testRecord.csv'
      filename: 'testData/testRecord.txt'
    });

    localStorage.removeItem("testData");
  }
});

clearBtn.addEventListener('click', function () {
  localStorage.removeItem("testData");
});

automationCheckbox.addEventListener("change", function () {
  localStorage.setItem("automation", this.checked);
});

var storedCheckboxState = localStorage.getItem("automation");
console.log("aa " + storedCheckboxState);
if (storedCheckboxState !== null) {
  automationCheckbox.checked = (storedCheckboxState === "true");
}

// Send message to content script to update checkbox state
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { checkboxState: automationCheckbox.checked });
});