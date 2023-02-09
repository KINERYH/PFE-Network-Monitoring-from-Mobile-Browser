// Since I'm not using a web server to host this script, I'm hardcoding the 
// list of websites to visit in order to obtain measurements

const websitesList = [
    'https://www.youtube.com',
    'https://www.google.com',
    'https://www.baidu.com'
];

// The load function is not working because of the same-origin policy
// which prevents js from one website from accessing the content of
// another website if they have different origins
// The only possible approach is to use a timeout to decide when to close a tab
// We cannot rely on the possibility of closing a tab when its content has been completely loaded
// For the same cause, some websites
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
        }, 3000);
    }

    openAndCloseTab(websitesList[0], 0);
});
