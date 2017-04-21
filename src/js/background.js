function getCourseJsonAndCreateNewTab(parsed_courses) {

    chrome.storage.sync.set({"parsed_courses": parsed_courses}, function () {
        chrome.tabs.create({'url': chrome.extension.getURL('src/ortalamaHesaplama.html')}, function (tab) {
            console.log("tab created!");
        });
    });


}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.action === "show") {
        chrome.browserAction.onClicked.addListener(function (tab) {
            let url = new URL(tab.url);
            let domain = url.hostname;
            if (domain === "ubs.cbu.edu.tr") //background is also active on ortalamaHesaplama.html, so we filter
            {
                let parsed_courses = request.parsed_courses;
                getCourseJsonAndCreateNewTab(parsed_courses);
            }
        });
    }
});