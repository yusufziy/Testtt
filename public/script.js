const socket = io();

const msgInput = document.getElementById("msg");
const userInput = document.getElementById("username");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");
const photoInput = document.getElementById("photo");

sendBtn.onclick = () => {
  const username = userInput.value || "Anonim";
  const text = msgInput.value;
  if (!text) return;

  socket.emit("chat message", username + ": " + text);
  msgInput.value = "";
};

socket.on("chat message", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// Foto upload
photoInput.onchange = () => {
  const file = photoInput.files[0];
  const form = new FormData();
  form.append("photo", file);

  fetch("/upload", { method: "POST", body: form })
    .then(res => res.json())
    .then(data => {
      socket.emit("chat message", userInput.value + " fotoğraf gönderdi: " + data.url);
    });
};
