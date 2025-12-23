const news = [
  {
    id: 1,
    title: "В городе открыли умный транспортный хаб",
    category: "Город",
    excerpt:
      "Новый узел объединяет автобусы, электробусы и каршеринг. Ожидается рост пассажиропотока на 18%.",
    time: "30 минут назад",
    author: "Анастасия Орлова",
  },
  {
    id: 2,
    title: "Региональный стартап привлёк 120 млн рублей",
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
    title: "Команда «Север» вышла в финал кубка",
    category: "Спорт",
    excerpt:
      "Матч завершился со счётом 3:1. Тренер отметил сильную игру обороны и поддержал молодёжь.",
    time: "Вчера",
    author: "Дмитрий Никитин",
  },
  {
    id: 5,
    title: "Горожане выбрали дизайн новой набережной",
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

const newsGrid = document.getElementById("news-grid");

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

renderNews(news);

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.textContent.trim();
    if (category === "Все") {
      renderNews(news);
      return;
    }

    const filtered = news.filter((item) => item.category === category);
    renderNews(filtered);
  });
});
