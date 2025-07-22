let usersDiv = document.querySelector(".ins-api-users");
if (!usersDiv) {
  usersDiv = document.createElement("div");
  usersDiv.className = "ins-api-users";
  document.body.appendChild(usersDiv);
}

const style = document.createElement("style");
style.textContent = `
.ins-api-users {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px #0001;
  padding: 32px 24px 24px 24px;
  font-family: system-ui, sans-serif;
}
.ins-api-users h2 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
}
.ins-api-users ul {
  list-style: none;
  padding: 0;
}
.ins-api-users li {
  background: #f7f7fa;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 16px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 1px 4px #0001;
}
.ins-api-users .user-delete {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}
.ins-api-users .user-delete:hover {
  background: #c0392b;
}
.ins-api-users .error {
  color: #e74c3c;
  background: #fff0f0;
  border: 1px solid #e74c3c;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  text-align: center;
}
`;
document.head.appendChild(style);

const STORAGE_KEY = "ins_api_users";
const STORAGE_EXP_KEY = "ins_api_users_exp";
const ONE_DAY = 24 * 60 * 60 * 1000;

function saveToStorage(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  localStorage.setItem(STORAGE_EXP_KEY, Date.now().toString());
}

function loadFromStorage() {
  const exp = localStorage.getItem(STORAGE_EXP_KEY);
  if (!exp || Date.now() - Number(exp) > ONE_DAY) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_EXP_KEY);
    return null;
  }
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function removeUserFromStorage(id) {
  const users = loadFromStorage();
  if (!users) return;
  const filtered = users.filter((u) => u.id !== id);
  saveToStorage(filtered);
}

function renderError(msg) {
  usersDiv.innerHTML = `<div class="error">${msg}</div>`;
}

function renderUsers(users) {
  usersDiv.innerHTML = "<h2>Kullanıcılar</h2>";
  if (!users.length) {
    usersDiv.innerHTML += '<div class="error">Kullanıcı bulunamadı.</div>';
    return;
  }
  const ul = document.createElement("ul");
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${user.name}</strong> <br>
      <span>${user.email}</span><br>
      <span>${user.address.street}, ${user.address.suite}, ${user.address.city}</span>
      <button class="user-delete">Sil</button>
    `;
    li.querySelector(".user-delete").onclick = () => {
      li.remove();
      removeUserFromStorage(user.id);
      const updated = loadFromStorage() || [];
      if (!updated.length) renderUsers([]);
    };
    ul.appendChild(li);
  });
  usersDiv.appendChild(ul);
}

function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("API yanıtı başarısız.");
        return res.json();
      })
      .then((data) => {
        saveToStorage(data);
        resolve(data);
      })
      .catch((err) => {
        reject("Kullanıcı verisi alınamadı. Lütfen daha sonra tekrar deneyin.");
      });
  });
}

function init() {
  let users = loadFromStorage();
  if (users) {
    renderUsers(users);
  } else {
    renderUsers([]);
    fetchUsers()
      .then((data) => renderUsers(data))
      .catch((err) => renderError(err));
  }
}

init();
