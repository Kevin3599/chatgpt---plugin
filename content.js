chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "callChatGPT") {
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: request.message })
    })
    .then(response => response.json())
    .then(data => sendResponse({ reply: data.reply }))
    .catch(error => console.error("Error:", error));
    return true;  // Will respond asynchronously.
  }
});