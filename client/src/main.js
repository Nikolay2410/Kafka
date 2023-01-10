async function fetchMessages() {
  const res = await fetch("http://localhost:3000/api/messages");
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

const btnProjects = document.getElementById("btn");
const titleEl = document.getElementById("title");
const messagesListEl = document.getElementById("messages");
const btnCandidates = document.getElementById("btn");

btnProjects.addEventListener("click", async () => {
  try {
    titleEl.textContent = "Проекты";
    const messages = await fetchMessages();
    messagesListEl.innerHTML = messages
      .map((message) => `<li>${message}</li>`)
      .join("");
  } catch (error) {
    titleEl.textContent = String(error);
  }
});

btnCandidates.addEventListener("click", async () => {
  try {
    titleEl.textContent = "Студент";
    const messages = await fetchMessages();
    messagesListEl.innerHTML = messages
      .map((message) => `<li>${message}</li>`)
      .join("");
  } catch (error) {
    titleEl.textContent = String(error);
  }
});
