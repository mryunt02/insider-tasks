const appendLocation = ".ins-api-users";

const STORAGE_KEY = "ins_api_users";
const API_URL = "https://jsonplaceholder.typicode.com/users";
const ONE_DAY = 24 * 60 * 60 * 1000;
const SESSION_BTN_KEY = "ins_api_users_btn_used";

const getRoot = () => {
  let el = document.querySelector(appendLocation);
  if (!el) {
    el = document.createElement("div");
    el.className = appendLocation.replace(/^\./, "");
    document.body.appendChild(el);
  }
  return el;
};

const saveToStorage = (users) => {
  const obj = { data: users, expire: Date.now() + ONE_DAY };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
};

const loadFromStorage = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (!obj.expire || Date.now() > obj.expire) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return obj.data;
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const removeUserFromStorage = (id) => {
  const users = loadFromStorage();
  if (!users) return;
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    saveToStorage(filtered);
  }
};

const renderError = (msg, root) => {
  root.innerHTML = `<div>${msg}</div>`;
};

const renderUsers = (users, root) => {
  root.innerHTML = "";
  if (!users.length) {
    root.innerHTML = "Kullanıcı bulunamadı.";
    return;
  }
  const ul = document.createElement("ul");
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} | ${user.email} | ${user.address.city}`;
    const btn = document.createElement("button");
    btn.textContent = "Sil";
    btn.onclick = () => {
      li.remove();
      removeUserFromStorage(user.id);
      const updated = loadFromStorage() || [];
      if (!updated.length) renderUsers([], root);
    };
    li.appendChild(btn);
    ul.appendChild(li);
  });
  root.appendChild(ul);
};

const fetchUsers = () => {
  return fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error("API yanıtı başarısız.");
      return res.json();
    })
    .then((data) => {
      saveToStorage(data);
      return data;
    });
};

const showFetchAgainBtn = (root) => {
  if (sessionStorage.getItem(SESSION_BTN_KEY)) return;
  const btn = document.createElement("button");
  btn.textContent = "Kullanıcıları Tekrar Çek";
  btn.onclick = () => {
    btn.disabled = true;
    fetchUsers()
      .then((data) => {
        renderUsers(data, root);
        sessionStorage.setItem(SESSION_BTN_KEY, "1");
        btn.remove();
      })
      .catch(() => {
        renderError(
          "Kullanıcı verisi alınamadı. Lütfen daha sonra tekrar deneyin.",
          root
        );
        btn.disabled = false;
      });
  };
  root.appendChild(btn);
};

const observeForEmptyList = (root) => {
  const observer = new MutationObserver(() => {
    const users = loadFromStorage();
    const btnExists = root.querySelector("button");
    if (
      (!users || users.length === 0) &&
      !btnExists &&
      !sessionStorage.getItem(SESSION_BTN_KEY)
    ) {
      showFetchAgainBtn(root);
    }
  });
  observer.observe(root, { childList: true, subtree: true });
};

const init = () => {
  const root = getRoot();
  const users = loadFromStorage();
  if (users) {
    renderUsers(users, root);
  } else {
    renderUsers([], root);
    fetchUsers()
      .then((data) => {
        renderUsers(data, root);
      })
      .catch(() => {
        renderError(
          "Kullanıcı verisi alınamadı. Lütfen daha sonra tekrar deneyin.",
          root
        );
      });
  }
  observeForEmptyList(root);
  if (
    (!users || users.length === 0) &&
    !sessionStorage.getItem(SESSION_BTN_KEY)
  ) {
    showFetchAgainBtn(root);
  }
};

init();

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
