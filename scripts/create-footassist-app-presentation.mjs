import pptxgen from "pptxgenjs";
import QRCode from "qrcode";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const outDir = path.join(root, "competition");
const outPath = path.join(outDir, "FootAssist_презентация_про_приложение.pptx");
const qrPath = path.join(outDir, "footassist_app_qr.png");
const projectUrl = "https://taaaaaaaaaaaaaaaamik.github.io/FootAssist/";

await fs.mkdir(outDir, { recursive: true });
await QRCode.toFile(qrPath, projectUrl, {
  width: 900,
  margin: 2,
  color: { dark: "#07111F", light: "#FFFFFF" },
});

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "FootAssist";
pptx.subject = "Презентация приложения FootAssist";
pptx.title = "FootAssist — цифровая платформа для школьного футбола";
pptx.company = "Башкирская гимназия села Малояз";
pptx.lang = "ru-RU";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "ru-RU",
};
pptx.defineLayout({ name: "LAYOUT_WIDE", width: 13.333, height: 7.5 });

const C = {
  ink: "07111F",
  dark: "0F172A",
  green: "0F7A37",
  green2: "16A34A",
  mint: "ECFDF5",
  line: "D7E3DC",
  slate: "475569",
  muted: "64748B",
  white: "FFFFFF",
  gold: "B8872F",
  soft: "F6FAF8",
  blue: "2563EB",
  amber: "F59E0B",
  red: "DC2626",
};

function addFooter(s) {
  s.addText("FootAssist · приложение для школьного футбола", {
    x: 8.75,
    y: 7.08,
    w: 3.95,
    h: 0.2,
    fontSize: 8.5,
    color: C.muted,
    align: "right",
    margin: 0,
  });
}

function slide(title, kicker = "FootAssist") {
  const s = pptx.addSlide();
  s.background = { color: "F7FAF8" };
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.12,
    fill: { color: C.green },
    line: { color: C.green },
  });
  s.addText(kicker.toUpperCase(), {
    x: 0.55,
    y: 0.34,
    w: 7.5,
    h: 0.22,
    fontSize: 8.5,
    bold: true,
    charSpace: 1.3,
    color: C.green,
    margin: 0,
  });
  s.addText(title, {
    x: 0.55,
    y: 0.68,
    w: 12.0,
    h: 0.6,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: "shrink",
  });
  addFooter(s);
  return s;
}

function pill(s, text, x, y, w, color = C.green) {
  s.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.38,
    rectRadius: 0.06,
    fill: { color },
    line: { color },
  });
  s.addText(text, {
    x,
    y: y + 0.12,
    w,
    h: 0.1,
    fontSize: 8.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
}

function card(s, x, y, w, h, title, body, opts = {}) {
  s.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.line, transparency: 8 },
  });
  if (opts.badge) pill(s, opts.badge, x + 0.18, y + 0.16, 0.58, opts.badgeColor || C.dark);
  s.addText(title, {
    x: x + (opts.badge ? 0.92 : 0.22),
    y: y + 0.18,
    w: w - (opts.badge ? 1.12 : 0.44),
    h: 0.32,
    fontSize: opts.titleSize || 15,
    bold: true,
    color: opts.titleColor || C.ink,
    margin: 0,
    fit: "shrink",
  });
  s.addText(body, {
    x: x + 0.22,
    y: y + 0.66,
    w: w - 0.44,
    h: h - 0.82,
    fontSize: opts.bodySize || 11.1,
    color: opts.bodyColor || C.slate,
    margin: 0,
    fit: "shrink",
    valign: "top",
    breakLine: false,
  });
}

function bullets(s, items, x, y, w, h, fontSize = 13.2) {
  const runs = items.map((item) => ({
    text: item,
    options: { bullet: { type: "ul" }, breakLine: true },
  }));
  s.addText(runs, {
    x,
    y,
    w,
    h,
    fontSize,
    color: C.slate,
    margin: 0.05,
    fit: "shrink",
    paraSpaceAfterPt: 7,
    valign: "top",
  });
}

function metric(s, x, y, w, value, label, note = "") {
  s.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 1.05,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.line },
  });
  s.addText(value, {
    x: x + 0.14,
    y: y + 0.16,
    w: w - 0.28,
    h: 0.32,
    fontSize: 23,
    bold: true,
    color: C.green,
    margin: 0,
    fit: "shrink",
  });
  s.addText(label, {
    x: x + 0.14,
    y: y + 0.6,
    w: w - 0.28,
    h: 0.17,
    fontSize: 9.5,
    bold: true,
    color: C.slate,
    margin: 0,
    fit: "shrink",
  });
  if (note) {
    s.addText(note, {
      x: x + 0.14,
      y: y + 0.82,
      w: w - 0.28,
      h: 0.14,
      fontSize: 7.8,
      color: C.muted,
      margin: 0,
      fit: "shrink",
    });
  }
}

function phoneFrame(s, x, y, w, h, title, rows = []) {
  s.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.18,
    fill: { color: C.ink },
    line: { color: "111827" },
  });
  s.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.18,
    y: y + 0.18,
    w: w - 0.36,
    h: h - 0.36,
    rectRadius: 0.13,
    fill: { color: "F8FAFC" },
    line: { color: "E2E8F0" },
  });
  s.addText(title, {
    x: x + 0.38,
    y: y + 0.45,
    w: w - 0.76,
    h: 0.35,
    fontSize: 15,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: "shrink",
  });
  rows.forEach((row, idx) => {
    const yy = y + 1.02 + idx * 0.52;
    s.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.38,
      y: yy,
      w: w - 0.76,
      h: 0.38,
      rectRadius: 0.04,
      fill: { color: idx % 2 ? "FFFFFF" : C.mint },
      line: { color: "E2E8F0" },
    });
    s.addText(row, {
      x: x + 0.52,
      y: yy + 0.12,
      w: w - 1.04,
      h: 0.08,
      fontSize: 7.8,
      color: C.slate,
      bold: idx === 0,
      margin: 0,
      fit: "shrink",
    });
  });
}

function titleSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: C.ink },
    line: { color: C.ink },
  });
  s.addText("FOOTASSIST", {
    x: 0.75,
    y: 0.72,
    w: 3.6,
    h: 0.24,
    fontSize: 10,
    bold: true,
    charSpace: 1.6,
    color: "86EFAC",
    margin: 0,
  });
  s.addText("Цифровая платформа для школьного футбола", {
    x: 0.75,
    y: 1.35,
    w: 7.0,
    h: 1.18,
    fontFace: "Aptos Display",
    fontSize: 42,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  s.addText(
    "Приложение объединяет паспорт игрока, рейтинг, прогресс, состав, травмы, турнир, чат, QR-доступ и сценарий будущего AI-видеоанализа.",
    {
      x: 0.78,
      y: 2.85,
      w: 6.8,
      h: 0.8,
      fontSize: 16,
      color: "E2E8F0",
      margin: 0,
      fit: "shrink",
    }
  );
  pill(s, "React + Vite", 0.78, 4.05, 1.32, C.green);
  pill(s, "Android APK", 2.25, 4.05, 1.32, C.blue);
  pill(s, "QR demo", 3.72, 4.05, 1.1, C.gold);
  pill(s, "4 роли", 4.98, 4.05, 0.9, C.dark);
  phoneFrame(s, 8.65, 0.95, 3.25, 5.55, "FootAssist", [
    "Цифровой паспорт",
    "Рейтинг игрока: 96",
    "Матч-день: состав готов",
    "Турнир: 6 команд",
    "QR для зрителей",
  ]);
  s.addText("Башкирская гимназия села Малояз · проект ЮТИ-2026", {
    x: 0.78,
    y: 6.82,
    w: 6.4,
    h: 0.24,
    fontSize: 11,
    color: "CBD5E1",
    margin: 0,
  });
}

titleSlide();

{
  const s = slide("Что такое FootAssist и какую проблему он решает", "Суть проекта");
  card(
    s,
    0.65,
    1.45,
    5.7,
    4.85,
    "Проблема",
    "В школьном футболе статистика часто ведется вручную или не ведется вообще. Игроков оценивают «на глаз», прогресс не фиксируется, тренеру сложно учитывать форму и травмы, а зрителям неудобно смотреть результаты турнира.",
    { titleSize: 20, bodySize: 14.3 }
  );
  card(
    s,
    6.75,
    1.45,
    5.7,
    4.85,
    "Решение",
    "FootAssist делает школьный футбол измеримым: каждый игрок получает цифровой паспорт и рекомендации, тренер управляет составом и нагрузкой, организатор ведет турнир, а зрители открывают результаты по QR.",
    { fill: C.mint, line: "BBF7D0", titleColor: C.green, titleSize: 20, bodySize: 14.3 }
  );
}

{
  const s = slide("Карта приложения: из чего состоит проект", "Структура");
  const modules = [
    ["Вход и роли", "игрок, тренер, организатор, зритель, жюри"],
    ["Паспорт игрока", "личная карточка, рейтинг, статус, фото"],
    ["Развитие", "рекомендации, диаграмма навыков, история"],
    ["Команда", "заявки, игроки, фильтры, ручное добавление"],
    ["Матч-день", "автосостав, запасные, травмы"],
    ["Турнир", "таблица, матчи, MVP, экспорт"],
    ["Чат", "организационная связь тренера и игрока"],
    ["AI-демо", "сценарий будущего видеоанализа"],
    ["Тестирование", "опрос, пилот, метрики, выводы"],
  ];
  modules.forEach(([t, b], i) => {
    const x = 0.65 + (i % 3) * 4.08;
    const y = 1.4 + Math.floor(i / 3) * 1.75;
    card(s, x, y, 3.65, 1.26, t, b, { badge: i + 1, bodySize: 10.5 });
  });
}

{
  const s = slide("Вход, QR и режим жюри", "Первый экран");
  phoneFrame(s, 0.85, 1.36, 3.1, 5.3, "Вход", [
    "Войти как игрок",
    "Демо тренера",
    "Демо организатора",
    "Режим зрителя",
    "Режим жюри",
  ]);
  card(s, 4.45, 1.45, 3.75, 2.0, "Роли с первого экрана", "Пользователь сразу выбирает сценарий: игрок, тренер, организатор, зритель или жюри для быстрой защиты проекта.", { bodySize: 12.4 });
  card(s, 4.45, 3.78, 3.75, 2.0, "QR-доступ", "Приложение открывается по ссылке без установки. Это удобно для зрителей, жюри, родителей и школьного показа.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 12.4 });
  s.addShape(pptx.ShapeType.roundRect, { x: 9.25, y: 1.72, w: 2.55, h: 2.55, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line } });
  s.addImage({ path: qrPath, x: 9.43, y: 1.9, w: 2.2, h: 2.2 });
  s.addText(projectUrl, { x: 8.8, y: 4.65, w: 3.45, h: 0.25, fontSize: 9.5, color: C.green, align: "center", margin: 0, fit: "shrink" });
}

{
  const s = slide("Роль игрока: цифровой паспорт и личный прогресс", "Игрок");
  phoneFrame(s, 0.78, 1.38, 3.25, 5.4, "Мой паспорт", [
    "Амир Сафин",
    "Позиция: нападающий",
    "Рейтинг: 96",
    "Голы: 4 · Передачи: 2",
    "Скачать отчет",
  ]);
  bullets(s, [
    "Игрок видит только свои данные и не может редактировать официальную статистику.",
    "Паспорт показывает команду, позицию, статус готовности, рейтинг и общий уровень.",
    "Можно скачать красивый HTML-паспорт игрока для тренера, родителей или защиты.",
    "История матчей помогает видеть динамику, а не только один результат.",
  ], 4.6, 1.65, 7.4, 3.4, 13.4);
  metric(s, 4.75, 5.35, 1.7, "96", "рейтинг", "пример");
  metric(s, 6.7, 5.35, 1.7, "6", "метрик", "игрока");
  metric(s, 8.65, 5.35, 1.7, "HTML", "отчет", "скачивание");
}

{
  const s = slide("Рейтинг и игровые показатели", "Логика данных");
  card(s, 0.75, 1.42, 11.85, 1.05, "Формула рейтинга", "Голы × 10 + передачи × 7 + отборы × 4 + точные пасы × 2 − ошибки × 3. Для вратаря дополнительно учитываются сейвы и пропущенные мячи.", { fill: C.ink, line: C.ink, titleColor: "86EFAC", bodyColor: C.white, bodySize: 13.2 });
  const metrics = [["Голы", "+10"], ["Передачи", "+7"], ["Отборы", "+4"], ["Точные пасы", "+2"], ["Ошибки", "−3"], ["Сейвы", "+3"]];
  metrics.forEach(([label, value], i) => metric(s, 0.78 + i * 2.05, 3.0, 1.55, value, label));
  card(s, 1.0, 5.02, 5.35, 1.0, "Зачем нужен рейтинг", "Он делает вклад игрока понятным и мотивирует развиваться по конкретным показателям.", { bodySize: 11.6 });
  card(s, 6.95, 5.02, 5.35, 1.0, "Защита от накрутки", "Официальные данные подтверждает тренер или организатор, а не сам игрок.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 11.6 });
}

{
  const s = slide("Развитие игрока: рекомендации, навыки, расписание", "Развитие");
  card(s, 0.65, 1.45, 3.75, 4.85, "Рекомендации", "Система анализирует позицию, рейтинг, ошибки, физическую готовность и игровую статистику. Игрок получает простую подсказку: что улучшить и как тренироваться.", { badge: 1, bodySize: 12.4 });
  card(s, 4.8, 1.45, 3.75, 4.85, "Диаграмма навыков", "Профиль игрока строится по шести качествам: скорость, удар, пас, отбор, техника и физика. Это помогает увидеть сильные стороны и зоны роста.", { badge: 2, fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 12.4 });
  card(s, 8.95, 1.45, 3.75, 4.85, "Расписание и история", "Игрок видит тренировки, ближайшие события, историю матчей и график прогресса за последние игры.", { badge: 3, bodySize: 12.4 });
}

{
  const s = slide("Роль тренера: команда, заявки и статистика", "Тренер");
  phoneFrame(s, 0.78, 1.38, 3.15, 5.35, "Тренер", [
    "Игроки команды",
    "+ Игрок",
    "Фильтр по позиции",
    "Заявки игроков",
    "Редактировать статистику",
  ]);
  bullets(s, [
    "Тренер видит список игроков, статусы готовности и рейтинг.",
    "Может принять или отклонить заявку игрока по коду команды.",
    "Может добавить игрока вручную и загрузить фото.",
    "После матча тренер обновляет показатели: голы, передачи, отборы, пасы, ошибки.",
  ], 4.55, 1.65, 7.55, 3.9, 13.5);
  card(s, 4.72, 5.66, 7.0, 0.7, "Главный смысл роли", "Тренер принимает решения по данным, а не только по впечатлению.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 10.8 });
}

{
  const s = slide("Матч-день: состав, травмы и игровая готовность", "Тренерский сценарий");
  card(s, 0.65, 1.45, 3.7, 4.75, "Автосостав", "Приложение предлагает стартовый состав с учетом позиции, рейтинга и статуса готовности. Игрок с травмой не попадает в старт.", { badge: 1, bodySize: 12.4 });
  card(s, 4.82, 1.45, 3.7, 4.75, "Контроль травм", "У каждого игрока есть статус: готов, травма, восстановление, под вопросом. Тренер видит комментарий и срок восстановления.", { badge: 2, fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 12.4 });
  card(s, 8.98, 1.45, 3.7, 4.75, "Запасные", "Система показывает не только старт, но и запасных, чтобы тренер быстрее планировал замены и нагрузку.", { badge: 3, bodySize: 12.4 });
}

{
  const s = slide("Роль организатора и турнирный модуль", "Организатор");
  card(s, 0.65, 1.45, 5.75, 4.8, "Организатор", "Принимает заявки команд, видит заявки игроков, управляет таблицей турнира и демонстрирует официальный сценарий подтверждения данных.", { titleSize: 19, bodySize: 14 });
  phoneFrame(s, 7.15, 1.35, 3.95, 5.1, "Турнир", [
    "9А Малояз — 10 очков",
    "9Б Малояз — 9 очков",
    "8А Малояз — 7 очков",
    "Матчи и MVP",
    "Скачать таблицу",
  ]);
  metric(s, 11.45, 1.65, 1.25, "6", "команд");
  metric(s, 11.45, 3.05, 1.25, "5", "матчей");
  metric(s, 11.45, 4.45, 1.25, "MVP", "игрок");
}

{
  const s = slide("Зритель, QR и публичный показ турнира", "Зритель");
  card(s, 0.65, 1.45, 4.25, 4.85, "Роль зрителя", "Зритель не редактирует данные. Он смотрит таблицу турнира, матчи, MVP и рейтинг игроков. Это удобно для родителей, учеников и жюри.", { bodySize: 13.4 });
  s.addShape(pptx.ShapeType.roundRect, { x: 5.55, y: 1.55, w: 2.55, h: 2.55, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line } });
  s.addImage({ path: qrPath, x: 5.73, y: 1.73, w: 2.2, h: 2.2 });
  card(s, 8.75, 1.45, 3.7, 4.85, "Почему QR важен", "Проект можно открыть на телефоне без установки. Это делает демонстрацию проще: отсканировал код — сразу увидел турнир и приложение.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 13.4 });
  s.addText(projectUrl, { x: 4.95, y: 4.4, w: 3.75, h: 0.2, fontSize: 9.5, color: C.green, align: "center", margin: 0, fit: "shrink" });
}

{
  const s = slide("AI Video Analysis: честная перспектива, а не обещание", "AI-модуль");
  card(s, 0.65, 1.45, 3.75, 4.75, "Сейчас", "В текущей версии это демонстрационный сценарий. Реального автоматического распознавания видео пока нет.", { badge: 1, fill: "FEF3C7", line: "FCD34D", titleColor: "92400E", bodyColor: "78350F", bodySize: 12.6 });
  card(s, 4.82, 1.45, 3.75, 4.75, "Как задумано", "Организатор загружает видео матча, система формирует предварительный отчет, затем человек проверяет спорные моменты.", { badge: 2, bodySize: 12.6 });
  card(s, 8.98, 1.45, 3.75, 4.75, "Почему так правильно", "В рейтинг должны попадать только подтвержденные данные. Это повышает доверие к системе и не вводит жюри в заблуждение.", { badge: 3, fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 12.6 });
}

{
  const s = slide("Тестирование, исследование и доказательство пользы", "Пилот");
  card(s, 0.65, 1.45, 4.0, 4.75, "План пилота", "Показать приложение 15-30 ученикам, 2-3 тренерам и нескольким родителям. Проверить понятность рейтинга, пользу паспорта, удобство QR и доверие к статистике.", { bodySize: 13.1 });
  metric(s, 5.1, 1.6, 1.65, "24", "ответа", "цель");
  metric(s, 7.0, 1.6, 1.65, "5 мин", "демо", "на человека");
  metric(s, 8.9, 1.6, 1.65, "4", "роли", "проверить");
  metric(s, 10.8, 1.6, 1.65, "1", "вывод", "главный");
  card(s, 5.1, 3.25, 7.35, 2.95, "Что добавить после опроса", "В приложение уже добавлен раздел тестирования. После реального опроса нужно заменить демо-проценты на фактические результаты, добавить 3-5 отзывов и показать, какая функция оказалась самой полезной.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 13 });
}

{
  const s = slide("Техническая реализация и готовность", "Технологии");
  card(s, 0.65, 1.45, 3.75, 4.75, "Стек", "React 19\nVite\nCapacitor Android\nQRCode\nLocalStorage\nHTML/CSS", { titleColor: C.green, bodySize: 15 });
  card(s, 4.82, 1.45, 3.75, 4.75, "Что уже собрано", "Веб-приложение, production build в docs, Android debug APK, QR-код, README, режим жюри, раздел тестирования и HTML-отчет игрока.", { bodySize: 12.7 });
  card(s, 8.98, 1.45, 3.75, 4.75, "Проверка", "npm run lint — проходит\nnpm run build — проходит\ncap sync android — выполнен\nassembleDebug — APK собран", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 13 });
}

{
  const s = slide("Итог: почему проект важен", "Вывод");
  s.addText("FootAssist — это не просто приложение про футбол, а цифровая среда для школьного спортивного развития.", {
    x: 0.78,
    y: 1.42,
    w: 8.0,
    h: 1.0,
    fontSize: 28,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: "shrink",
  });
  bullets(s, [
    "Игрок получает понятный прогресс и мотивацию.",
    "Тренер видит данные, состав, травмы и рекомендации.",
    "Организатор ведет турнир прозрачнее.",
    "Зрители открывают результаты по QR.",
    "Проект уже имеет рабочий веб-прототип и Android APK.",
  ], 0.95, 2.82, 7.8, 2.7, 14);
  s.addShape(pptx.ShapeType.roundRect, { x: 9.32, y: 1.48, w: 2.55, h: 2.55, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line } });
  s.addImage({ path: qrPath, x: 9.5, y: 1.66, w: 2.2, h: 2.2 });
  s.addText("Каждый матч виден. Каждый игрок растет.", {
    x: 8.25,
    y: 4.58,
    w: 4.7,
    h: 0.45,
    fontSize: 16,
    bold: true,
    color: C.green,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  s.addText(projectUrl, { x: 8.45, y: 5.15, w: 4.3, h: 0.25, fontSize: 10, color: C.green, align: "center", margin: 0, fit: "shrink" });
}

await pptx.writeFile({ fileName: outPath });
console.log(outPath);
