const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`)

const handleOpen = () => {
  console.log("Connected to Server ✅")
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌")
});

// setTimeout(() => {
//   socket.send("hello from the browser!");
// }, 10000)

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(input.value);
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);