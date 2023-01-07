async function fetchMessages() {
  const res = await fetch("http://localhost:3000/api/messages");
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

const btnEl = document.getElementById("btn");
const titleEl = document.getElementById("title");
const messagesListEl = document.getElementById("messages");

btnEl.addEventListener("click", async () => {
  try {
    titleEl.textContent = "Сообщения";
    const messages = await fetchMessages();
    messagesListEl.innerHTML = messages
      .map((message) => `<li>${message}</li>`)
      .join("");
  } catch (error) {
    titleEl.textContent = String(error);
  }
});
