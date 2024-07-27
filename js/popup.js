document.addEventListener("DOMContentLoaded", () => {
    // GET THE SELECTORS OF THE BUTTONS
    const startVideoButton = document.querySelector("button#start_video");
    const stopVideoButton = document.querySelector("button#stop_video");

    // Adding event listeners
    startVideoButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "request_recording" }, (response) => {
                if (!chrome.runtime.lastError) {
                    console.log(response);
                } else {
                    console.log(chrome.runtime.lastError, 'error line 14');
                }
            });
        });
    });

    stopVideoButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "stopvideo" }, (response) => {
                if (!chrome.runtime.lastError) {
                    console.log(response);
                } else {
                    console.log(chrome.runtime.lastError, 'error line 27');
                }
            });
        });
    });
});

