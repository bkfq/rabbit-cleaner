// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("Then.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	  console.log('Baddie1');
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.rabb.it'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
		chrome.tabs.executeScript(null, { file: "content.js" });
	});
});

chrome.commands.onCommand.addListener(function(command) {
    if (command == "toggle"){
		chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
			chrome.tabs.executeScript(null, { file: "content.js" });
		});
	}
	else {
		chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
			chrome.tabs.executeScript(null, { file: "remote.js" });
		});
	}
});
