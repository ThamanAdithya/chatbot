async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();
  if (!userText) return;

  chatBox.innerHTML += `<div class="user">🧑: ${userText}</div>`;
  input.value = "";

  const typingIndicator = document.createElement("div");
  typingIndicator.className = "bot typing";
  typingIndicator.innerText = "🤖 is typing...";
  chatBox.appendChild(typingIndicator);
  chatBox.scrollTop = chatBox.scrollHeight;

  const res = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText }),
  });

  const data = await res.json();
  typingIndicator.remove();

  const formatted = data.response.replace(/```[a-z]*\\n?|```/g, "");
  chatBox.innerHTML += `<pre class="bot"><code>🤖: ${formatted}</code></pre>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
