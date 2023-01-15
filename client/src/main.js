async function fetchMessages(obj) {
  str = "/api/messages";
  switch (obj) {
    case "projects":
      str += "?obj=projects";
      break;
    case "students":
      str += "?obj=students";
      break;
    default:
      str += "/";
  }
  if (inp.value != "") {
    str += "&id=" + inp.value;
  }
  const res = await fetch(str);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

const btnProject = document.getElementById("btnProject");
const btnStudent = document.getElementById("btnStudent");
const titleEl = document.getElementById("title");
const messagesListEl = document.getElementById("messages");
const inp = document.getElementById("inp");

btnProject.addEventListener("click", async () => {
  try {
    messagesListEl.innerHTML = "";
    titleEl.textContent = "Проекты";
    const messages = await fetchMessages("projects");
    messagesListEl.innerHTML = JSON.stringify(messages, null, 2);
  } catch (error) {
    titleEl.textContent = String(error);
  }
});

btnStudent.addEventListener("click", async () => {
  try {
    messagesListEl.innerHTML = "";
    titleEl.textContent = "Студенты";
    const messages = await fetchMessages("students");
    messagesListEl.innerHTML = JSON.stringify(messages, null, 2);
  } catch (error) {
    titleEl.textContent = String(error);
  }
});

