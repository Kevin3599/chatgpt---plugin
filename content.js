chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);
  if (request.action === "callChatGPT") {
    console.log("Calling ChatGPT with message:", request.message);
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: request.message })
    })
    .then(response => {
      console.log("Received response from server");
      return response.json();
    })
    .then(data => {
      console.log("Received data:", data);
      sendResponse({ reply: data.reply });
    })
    .catch(error => {
      console.error("Error:", error);
    });
    return true;  // Will respond asynchronously.
  }
});