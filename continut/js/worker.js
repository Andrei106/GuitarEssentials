self.onmessage = function(event) {
    console.log("Message received from script.js");
    postMessage("Message received");
}
