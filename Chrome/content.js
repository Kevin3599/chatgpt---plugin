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

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const button = document.createElement("button");
  button.textContent = "Ask ChatGPT";
  button.style.position = "fixed";
  button.style.bottom = "10px";
  button.style.right = "10px";
  button.style.zIndex = "1000";
  document.body.appendChild(button);
  console.log("Button added to the page");

  button.addEventListener("click", () => {
    const message = prompt("Enter your message for ChatGPT:");
    if (message) {
      console.log("Sending message to background script:", message);
      chrome.runtime.sendMessage({ action: "callChatGPT", message: message }, response => {
        alert("ChatGPT says: " + response.reply);
      });
    }
  });
});