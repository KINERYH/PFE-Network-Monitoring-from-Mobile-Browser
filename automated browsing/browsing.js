// Since I'm not using a web server to host this script, I'm hardcoding the 
// list of websites to visit in order to obtain measurements

// Google, Twitter and Instagram are not closing
const websitesList = [
    'https://www.youtube.com',
    'https://www.google.com',
    'https://www.baidu.com',
    'https://www.bilibili.com',
    'https://www.qq.com',
    'https://www.twitter.com',
    'https://www.zhihu.com',
    'https://www.wikipedia.org',
    'https://www.amazon.com',
    'https://www.instagram.com',
    'https://www.linkedin.com'
];

// The load function is not working because of the same-origin policy
// which prevents js from one website from accessing the content of
// another website if they have different origins
// The only possible approach is to use a timeout to decide when to close a tab
// We cannot rely on the possibility of closing a tab when its content has been completely loaded
// For the same cause, some tabs will not be closed

/*
document.getElementById("start-button").addEventListener("click", function () {

    function openAndCloseTab(website, index) {
        console.log(website);
        let newTab = window.open(website, "_blank");
        setTimeout(function () {
            if (newTab) {
                console.log("I can close " + website);
                newTab.close();
            }
            if (index < websitesList.length - 1) {
                openAndCloseTab(websitesList[index + 1], index + 1);
            }
        }, 300);
    }

    openAndCloseTab(websitesList[0], 0);
});
*/


// TEST
var newTab;

document.getElementById("start-button").addEventListener("click", function () {

    newTab = window.open("https://www.youtube.com", "_blank");

    // function openAndCloseTab(website, index) {
    //     console.log(website);
    //     let newTab = window.open(website, "_blank");

    //     var intervalId = setInterval(function () {
    //         if (!newTab || newTab.closed) {
    //             clearInterval(intervalId);
    //             console.log('The tab has been closed.');
    //         } else {
    //             console.log('The tab is still open.');
    //         }
    //     }, 500);
    //     if (index < websitesList.length - 1) {
    //         openAndCloseTab(websitesList[index + 1], index + 1);
    //     }
    // }

    // openAndCloseTab(websitesList[0], 0);
});



