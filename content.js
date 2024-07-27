console.log("Hi, I have been injected whoopie!!!");

var recorder = null;

function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);
    recorder.start();

    recorder.onstop = function() {
        stream.getTracks().forEach(function(track) {
            if (track.readyState === "live") {
                track.stop();
            }
        });
    };

    recorder.ondataavailable = function(event) {
        let recordedBlob = event.data;
        let url = URL.createObjectURL(recordedBlob);
        let a = document.createElement("a");

        a.style.display = "none";
        a.href = url;
        a.download = "screen-recording.webm";

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "request_recording") {
        console.log("requesting recording");

        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true // Use true instead of specifying width and height
        }).then((stream) => {
            onAccessApproved(stream);
        }).catch((err) => {
            console.error('Error accessing display media:', err.message);
            alert('Unable to access display media. Please ensure you have given permission and try again.');
        });
    }

    if (message.action === "stopvideo") {
        console.log("stopping video");
        if (!recorder) {
            console.log("no recorder");
            return;
        }
        recorder.stop();
    }
});
