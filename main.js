const seedNews = [
  {
    id: 1,
    title: "В городе открыли умный транспортный порнохаб",
    category: "Город",
    excerpt:
      "Новый узел объединяет автобусы, электробусы и каршеринг. Ожидается рост пассажиропотока на 18%.",
    time: "30 минут назад",
    author: "Анастасия Орлова",
  },
  {
    id: 2,
    title: "Региональный стартап привлёк 120 млн рублей из карманов проституток и цыганок",
    category: "Экономика",
    excerpt:
      "Инвесторы поддержали платформу для агроаналитики. Команда расширится вдвое уже этой весной.",
    time: "1 час назад",
    author: "Илья Громов",
  },
  {
    id: 3,
    title: "Театральный сезон откроется премьерой о Волге",
    category: "Культура",
    excerpt:
      "Новая постановка объединит музыку, видеоарт и документальные истории жителей региона.",
    time: "Сегодня",
    author: "Мария Лебедева",
  },
  {
    id: 4,
    title: "Команда «Вятка» вышла в финал кубка",
    category: "Спорт",
    excerpt:
      "Матч завершился со счётом 3:1. Тренер отметил сильную игру обороны и поддержал молодёжь.",
    time: "Вчера",
    author: "Дмитрий Никитин",
  },
  {
    id: 5,
    title: "Горожане выбрали дизайн новой набережной. Финансирование будет за счёт зарплаты губернатора",
    category: "Главное",
    excerpt:
      "В голосовании участвовали 18 тысяч человек. Победила концепция с зелёными террасами и амфитеатром.",
    time: "Вчера",
    author: "Редакция",
  },
  {
    id: 6,
    title: "Школы переходят на гибридное расписание",
    category: "Город",
    excerpt:
      "Новые правила позволят сочетать очные и онлайн-занятия в периоды повышенной нагрузки.",
    time: "2 дня назад",
    author: "Валентина Смолина",
  },
];

const storageKey = "ventishovye24-news";
const newsGrid = document.getElementById("news-grid");
const loginForm = document.getElementById("editor-login");
const editorForm = document.getElementById("editor-form");
const loginStatus = document.getElementById("login-status");
const editorStatus = document.getElementById("editor-status");
const logoutBtn = document.getElementById("logout-btn");

const getStoredNews = () => {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
};

const saveStoredNews = (items) => {
  localStorage.setItem(storageKey, JSON.stringify(items));
};

const buildNewsList = () => {
  const stored = getStoredNews();
  return [...stored, ...seedNews];
};

const renderNews = (items) => {
  newsGrid.innerHTML = items
    .map(
      (item) => `
      <article class="news-card" data-category="${item.category}">
        <div class="tag">${item.category}</div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <div class="meta">${item.time} · ${item.author}</div>
      </article>
    `
    )
    .join("");
};

const filterButtons = document.querySelectorAll(".filter");
let activeCategory = "Все";

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    activeCategory = button.textContent.trim();
    applyFilter();
  });
});

const applyFilter = () => {
  const items = buildNewsList();
  if (activeCategory === "Все") {
    renderNews(items);
    return;
  }

  const filtered = items.filter((item) => item.category === activeCategory);
  renderNews(filtered);
};

const setEditorState = (isLoggedIn) => {
  loginForm.classList.toggle("hidden", isLoggedIn);
  editorForm.classList.toggle("hidden", !isLoggedIn);
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "editor" && password === "venti24") {
    loginStatus.textContent = "Добро пожаловать! Можно публиковать новости.";
    setEditorState(true);
  } else {
    loginStatus.textContent = "Неверный логин или пароль.";
  }
});

logoutBtn.addEventListener("click", () => {
  setEditorState(false);
  loginStatus.textContent = "";
  editorStatus.textContent = "";
});

editorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(editorForm);
  const newItem = {
    id: Date.now(),
    title: formData.get("title"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    time: "Только что",
    author: formData.get("author"),
  };

  const stored = getStoredNews();
  stored.unshift(newItem);
  saveStoredNews(stored);
  editorForm.reset();
  editorStatus.textContent = "Новость опубликована и сохранена в локальной CMS.";
  applyFilter();
});

setEditorState(false);
applyFilter();
