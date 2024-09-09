import axios from "axios";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "importFromUrl") {
    axios.get(message.url).then((response) => {
      console.log(response);
      sendResponse({ response: { message, sender } });
    });
  }
  return true;
});
