chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  /*if (tab.status !== "complete"){
    return;
  }*/
  if(tab.url.indexOf("RapidBoard.jspa") != -1){	
	chrome.pageAction.show(tabId);
  }
});