import pptxgen from "pptxgenjs";
import QRCode from "qrcode";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const outDir = path.join(root, "competition");
const outPath = path.join(outDir, "FootAssist_ЮТИ_2026_презентация.pptx");
const qrPath = path.join(outDir, "footassist_qr.png");
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
pptx.subject = "ЮТИ 2026";
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
  green: "0F7A37",
  green2: "16A34A",
  mint: "ECFDF5",
  line: "D7E3DC",
  slate: "475569",
  muted: "64748B",
  white: "FFFFFF",
  gold: "B8872F",
  soft: "F6FAF8",
  dark2: "101827",
};

function slide(title, kicker) {
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
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: 0.55,
      y: 0.35,
      w: 6.5,
      h: 0.22,
      fontFace: "Aptos",
      fontSize: 8.5,
      bold: true,
      charSpace: 1.4,
      color: C.green,
      margin: 0,
    });
  }
  if (title) {
    s.addText(title, {
      x: 0.55,
      y: 0.68,
      w: 11.8,
      h: 0.58,
      fontFace: "Aptos Display",
      fontSize: 27,
      bold: true,
      color: C.ink,
      margin: 0,
      breakLine: false,
      fit: "shrink",
    });
  }
  s.addText("FootAssist · ЮТИ 2026", {
    x: 10.2,
    y: 7.08,
    w: 2.55,
    h: 0.2,
    fontSize: 8.5,
    color: C.muted,
    align: "right",
    margin: 0,
  });
  return s;
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
  s.addShape(pptx.ShapeType.arc, {
    x: 8.2,
    y: -0.75,
    w: 5.4,
    h: 5.4,
    adjustPoint: 0.18,
    line: { color: "1FA85A", transparency: 40, width: 1.1 },
  });
  s.addText("Всероссийский конкурс «Юные техники и инновационные лидеры»", {
    x: 0.75,
    y: 0.62,
    w: 8.6,
    h: 0.32,
    fontSize: 11,
    bold: true,
    color: "86EFAC",
    charSpace: 1,
    margin: 0,
  });
  s.addText("FootAssist", {
    x: 0.75,
    y: 1.35,
    w: 6.3,
    h: 0.88,
    fontFace: "Aptos Display",
    fontSize: 49,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  s.addText("Цифровая платформа для школьного футбола", {
    x: 0.75,
    y: 2.22,
    w: 7.2,
    h: 0.42,
    fontSize: 18,
    color: "DBEAFE",
    margin: 0,
  });
  s.addText(
    "Рейтинг, прогресс, состав, травмы, турнир, чат и QR-доступ в одном приложении для школьной команды.",
    {
      x: 0.75,
      y: 2.9,
      w: 6.9,
      h: 0.85,
      fontSize: 17,
      color: "E2E8F0",
      margin: 0,
      fit: "shrink",
      valign: "mid",
    }
  );
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.75,
    y: 4.2,
    w: 3.5,
    h: 0.62,
    rectRadius: 0.08,
    fill: { color: C.green },
    line: { color: C.green },
  });
  s.addText("Номинация: ИТ-решения в образовании", {
    x: 1.02,
    y: 4.39,
    w: 3.0,
    h: 0.2,
    fontSize: 10.5,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  s.addShape(pptx.ShapeType.roundRect, {
    x: 8.95,
    y: 1.26,
    w: 3.35,
    h: 4.75,
    rectRadius: 0.12,
    fill: { color: "FFFFFF", transparency: 6 },
    line: { color: "FFFFFF", transparency: 80 },
  });
  s.addText("Live demo", { x: 9.27, y: 1.63, w: 1.4, h: 0.22, fontSize: 11, bold: true, color: "DCFCE7", margin: 0 });
  s.addShape(pptx.ShapeType.rect, {
    x: 9.28,
    y: 2.05,
    w: 2.7,
    h: 1.55,
    fill: { color: "14532D", transparency: 12 },
    line: { color: "86EFAC", transparency: 60 },
  });
  [["GK", 9.45, 2.68], ["D", 10.05, 2.3], ["D", 10.05, 3.02], ["M", 10.85, 2.35], ["M", 10.85, 2.95], ["F", 11.45, 2.68]].forEach(([t, x, y]) => {
    s.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.34, h: 0.34, fill: { color: C.white }, line: { color: C.white } });
    s.addText(t, { x, y: y + 0.1, w: 0.34, h: 0.08, fontSize: 5.5, bold: true, align: "center", color: C.green, margin: 0 });
  });
  s.addText("Школьный футбол становится измеримым", {
    x: 9.28,
    y: 4.15,
    w: 2.55,
    h: 0.52,
    fontSize: 16,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  s.addText("Башкирская гимназия села Малояз · 2026", {
    x: 0.75,
    y: 6.85,
    w: 5.5,
    h: 0.26,
    fontSize: 11,
    color: "CBD5E1",
    margin: 0,
  });
}

function bullet(s, items, x, y, w, opts = {}) {
  const fontSize = opts.fontSize || 14.5;
  const runs = [];
  items.forEach((item) => {
    runs.push({
      text: item,
      options: {
        bullet: { type: "ul" },
        breakLine: true,
      },
    });
  });
  s.addText(runs, {
    x,
    y,
    w,
    h: opts.h || 4.6,
    fontSize,
    color: opts.color || C.slate,
    breakLine: false,
    fit: "shrink",
    paraSpaceAfterPt: opts.space || 8,
    margin: 0.05,
    valign: "top",
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
    line: { color: opts.line || C.line, transparency: 10 },
  });
  if (opts.num) {
    s.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.18,
      y: y + 0.18,
      w: 0.42,
      h: 0.42,
      rectRadius: 0.05,
      fill: { color: opts.numColor || C.ink },
      line: { color: opts.numColor || C.ink },
    });
    s.addText(String(opts.num), {
      x: x + 0.18,
      y: y + 0.31,
      w: 0.42,
      h: 0.08,
      align: "center",
      fontSize: 8,
      bold: true,
      color: C.white,
      margin: 0,
    });
  }
  s.addText(title, {
    x: x + (opts.num ? 0.74 : 0.22),
    y: y + 0.2,
    w: w - (opts.num ? 0.96 : 0.44),
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
    h: h - 0.84,
    fontSize: opts.bodySize || 11.2,
    color: opts.bodyColor || C.slate,
    margin: 0,
    fit: "shrink",
    valign: "top",
    breakLine: false,
  });
}

function metric(s, x, y, w, value, label, note = "") {
  s.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 1.08,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.line },
  });
  s.addText(value, { x: x + 0.16, y: y + 0.18, w: w - 0.32, h: 0.32, fontSize: 24, bold: true, color: C.green, margin: 0, fit: "shrink" });
  s.addText(label, { x: x + 0.16, y: y + 0.62, w: w - 0.32, h: 0.18, fontSize: 9.5, bold: true, color: C.slate, margin: 0, fit: "shrink" });
  if (note) s.addText(note, { x: x + 0.16, y: y + 0.82, w: w - 0.32, h: 0.14, fontSize: 7.7, color: C.muted, margin: 0, fit: "shrink" });
}

function twoColSlide(title, kicker, leftTitle, leftItems, rightTitle, rightItems) {
  const s = slide(title, kicker);
  card(s, 0.65, 1.55, 5.85, 4.95, leftTitle, "", { fill: C.white });
  bullet(s, leftItems, 1.0, 2.18, 5.1, { h: 3.75, fontSize: 13.2 });
  card(s, 6.82, 1.55, 5.85, 4.95, rightTitle, "", { fill: C.white });
  bullet(s, rightItems, 7.17, 2.18, 5.1, { h: 3.75, fontSize: 13.2 });
}

titleSlide();

{
  const s = slide("Соответствие положению конкурса", "Регламент ЮТИ 2026");
  card(
    s,
    0.65,
    1.46,
    3.85,
    4.5,
    "Вывод",
    "FootAssist соответствует положению при подаче в номинацию 5 «ИТ-решения в образовании и не только». Проект является ИТ-разработкой для школьной жизни, сетевым инструментом для взаимодействия игроков, тренера и организатора, а также интерактивным общественно полезным проектом для своего края.",
    { titleColor: C.green, titleSize: 18, bodySize: 13.2 }
  );
  card(s, 4.8, 1.46, 3.6, 2.05, "Участники", "Положение допускает обучающихся 7-18 лет и индивидуальные/командные проекты. FootAssist создан школьником и может быть заявлен индивидуально или командой до 2 человек.", { num: 1 });
  card(s, 8.72, 1.46, 3.6, 2.05, "Номинация", "Номинация 5 прямо включает приложения для школьной жизни, сетевые решения для совместной работы и интерактивные предложения для общественно значимых проектов края.", { num: 2 });
  card(s, 4.8, 3.9, 3.6, 2.05, "Формат работы", "Работа имеет мультимедийную презентацию, веб-прототип, Android APK, QR-демо, описание проекта и техническую структуру.", { num: 3 });
  card(s, 8.72, 3.9, 3.6, 2.05, "Критерии", "Проект закрывает актуальность, новизну, цель и задачи, экспериментальную часть, практическую значимость, техническую документацию и экономику.", { num: 4 });
  s.addText("Важно: специальный кейс РЖД не выбран. FootAssist подается не в железнодорожный кейс, а в основную номинацию ИТ-решений.", {
    x: 0.75,
    y: 6.42,
    w: 11.8,
    h: 0.22,
    fontSize: 9.5,
    color: C.muted,
    margin: 0,
    fit: "shrink",
  });
}

{
  const s = slide("Проблема и актуальность", "Постановка задачи");
  card(s, 0.65, 1.45, 5.8, 4.78, "Проблема", "В школьном футболе статистика часто ведется вручную или не ведется вообще. Игроков оценивают «на глаз», прогресс теряется, тренеру сложно учитывать травмы и форму, а турнирные результаты неудобно показывать зрителям.", { titleSize: 19, bodySize: 15 });
  metric(s, 6.82, 1.45, 1.65, "91%", "хотят статистику", "пример опроса");
  metric(s, 8.65, 1.45, 1.65, "88%", "за паспорт", "пример опроса");
  metric(s, 10.48, 1.45, 1.65, "78%", "за QR-турнир", "пример опроса");
  card(s, 6.82, 2.88, 5.31, 3.35, "Почему это важно", "Школьный спорт — часть образовательной среды. Если игрок видит личный прогресс, понятные рекомендации и честный рейтинг, он получает больше мотивации тренироваться, развиваться и участвовать в команде.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 14.2 });
}

{
  const s = slide("Цель, задачи и ожидаемый результат", "Цель проекта");
  card(s, 0.65, 1.45, 11.95, 1.2, "Цель", "Создать цифровую платформу для школьного футбола, которая помогает игрокам видеть прогресс, тренерам принимать решения по данным, а организаторам проводить турниры прозрачнее.", { fill: C.ink, line: C.ink, titleColor: "86EFAC", bodyColor: C.white, bodySize: 14.8 });
  ["Цифровой паспорт игрока", "Расчет рейтинга и рекомендации", "Учет травм и автосостав", "Турнирная таблица и QR-доступ", "Чат и организационная связь", "Проверка полезности через опрос и пилот"].forEach((t, i) => {
    const x = 0.65 + (i % 3) * 4.05;
    const y = 3.1 + Math.floor(i / 3) * 1.55;
    card(s, x, y, 3.72, 1.12, t, ["личный прогресс", "понятные данные", "безопасная нагрузка", "зрительский доступ", "командная связь", "измеримый эффект"][i], { num: i + 1, bodySize: 10.2 });
  });
}

{
  const s = slide("Решение: FootAssist", "Описание продукта");
  s.addShape(pptx.ShapeType.roundRect, { x: 0.65, y: 1.42, w: 4.0, h: 4.8, rectRadius: 0.1, fill: { color: C.ink }, line: { color: C.ink } });
  s.addText("FootAssist", { x: 1.0, y: 1.86, w: 2.6, h: 0.4, fontSize: 27, bold: true, color: C.white, margin: 0 });
  s.addText("Цифровой футбольный кабинет", { x: 1.0, y: 2.35, w: 2.9, h: 0.2, fontSize: 11, color: "BBF7D0", margin: 0 });
  [["Паспорт", 1.0, 3.0], ["Рейтинг", 2.45, 3.0], ["Турнир", 1.0, 4.0], ["QR", 2.45, 4.0]].forEach(([t, x, y]) => card(s, x, y, 1.15, 0.62, t, "", { fill: "FFFFFF", titleSize: 9.5 }));
  bullet(s, [
    "Работает как веб-приложение и может открываться по QR-коду.",
    "Имеет Android-версию через Capacitor.",
    "Использует разные роли доступа: игрок, тренер, организатор, зритель.",
    "Сохраняет демо-данные в браузере, чтобы прототип вел себя как живой продукт.",
  ], 5.15, 1.65, 6.95, { h: 3.9, fontSize: 14 });
  card(s, 5.15, 5.5, 6.95, 0.72, "Главная идея", "Каждый матч виден. Каждый игрок растет.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 12.5 });
}

{
  const s = slide("Целевая аудитория и роли", "Пользователи");
  [
    ["Игрок", "видит паспорт, статистику, рекомендации, расписание, историю и чат"],
    ["Тренер", "ведет команду, принимает заявки, редактирует статистику и состав"],
    ["Организатор", "управляет турниром, подтверждает данные и показывает AI-демо"],
    ["Зритель", "смотрит турнир, матчи, MVP и рейтинг по QR-коду"],
  ].forEach(([t, b], i) => {
    card(s, 0.78 + i * 3.05, 1.5, 2.65, 3.15, t, b, { num: i + 1, titleSize: 18, bodySize: 12.5, fill: i === 0 ? C.mint : C.white });
  });
  s.addShape(pptx.ShapeType.line, { x: 1.2, y: 5.35, w: 10.8, h: 0, line: { color: C.line, width: 2 } });
  s.addText("Разделение ролей помогает выполнить требование к практической значимости: каждый участник школьной футбольной среды получает свой полезный сценарий.", {
    x: 1.1,
    y: 5.72,
    w: 11.1,
    h: 0.5,
    fontSize: 14,
    color: C.slate,
    align: "center",
    margin: 0,
  });
}

{
  const s = slide("Ключевые функции прототипа", "Функциональность");
  [
    ["Цифровой паспорт", "карточка игрока, фото, позиция, статус, метрики и общий уровень"],
    ["Рейтинг", "формула: голы, передачи, отборы, точные пасы, ошибки, сейвы"],
    ["Развитие", "рекомендации, диаграмма навыков, история матчей и прогресса"],
    ["Матч-день", "автоподбор стартового состава с учетом позиции и травм"],
    ["Турнир", "таблица, матчи, очки, MVP и экспорт результатов"],
    ["Коммуникация", "чат тренера и игрока, заявки игроков и команд"],
  ].forEach(([t, b], i) => {
    card(s, 0.68 + (i % 3) * 4.05, 1.45 + Math.floor(i / 3) * 2.25, 3.68, 1.68, t, b, { num: i + 1 });
  });
}

{
  const s = slide("Честность данных и безопасность", "Доверие к системе");
  ["Матч", "Ввод", "Проверка", "Рейтинг"].forEach((t, i) => {
    const x = 0.9 + i * 3.05;
    s.addShape(pptx.ShapeType.chevron, { x, y: 1.85, w: 2.45, h: 1.0, fill: { color: i === 3 ? C.green : C.white }, line: { color: C.line } });
    s.addText(t, { x: x + 0.25, y: 2.18, w: 1.7, h: 0.18, align: "center", fontSize: 15, bold: true, color: i === 3 ? C.white : C.ink, margin: 0 });
  });
  bullet(s, [
    "Игрок не может самостоятельно накрутить официальную статистику.",
    "Тренер или организатор подтверждает показатели после матча.",
    "AI Video Analysis честно обозначен как перспектива, не как готовое распознавание.",
    "В демо не используются реальные персональные данные, точный адрес не обязателен.",
  ], 1.0, 3.55, 11.4, { h: 2.1, fontSize: 14.5 });
}

{
  const s = slide("Исследовательская и экспериментальная часть", "Проверка идеи");
  card(s, 0.65, 1.45, 5.85, 4.75, "План пилотного теста", "1. Показать прототип 15-30 ученикам, 2-3 тренерам и нескольким родителям.\n2. Проверить понятность рейтинга, QR-доступа и цифрового паспорта.\n3. Собрать проценты, отзывы и замечания.\n4. Повторно улучшить интерфейс по обратной связи.", { bodySize: 13.4 });
  metric(s, 7.0, 1.55, 1.55, "24", "ответа", "цель пилота");
  metric(s, 8.85, 1.55, 1.55, "5 мин", "демо", "на человека");
  metric(s, 10.7, 1.55, 1.55, "4", "роли", "проверить отдельно");
  card(s, 7.0, 3.1, 5.25, 2.95, "Что будет доказательством", "Результаты опроса, скриншоты демонстрации, 3-5 отзывов пользователей и вывод о самой полезной функции. Эти данные напрямую закрывают критерий исследовательской и экспериментальной части.", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 13 });
}

{
  const s = slide("Техническая реализация", "Техническая документация");
  card(s, 0.65, 1.45, 3.7, 4.8, "Стек", "React 19\nVite\nCapacitor Android\nQRCode\nLocalStorage\nHTML/CSS", { titleColor: C.green, bodySize: 15 });
  card(s, 4.7, 1.45, 3.7, 4.8, "Архитектура прототипа", "Компонент App хранит состояние демо, роли, игроков, заявки, турнир и чат. Сборка публикуется в папку docs для GitHub Pages. Android получает те же web assets через Capacitor sync.", { bodySize: 12.5 });
  card(s, 8.75, 1.45, 3.7, 4.8, "Проверка", "npm run lint — проходит\nnpm run build — проходит\ncap sync android — выполнен\nassembleDebug — APK собран", { fill: C.mint, line: "BBF7D0", titleColor: C.green, bodySize: 13.5 });
}

{
  const s = slide("Экономика внедрения", "Экономические расчеты");
  [
    ["0 ₽", "школьный доступ", "базовое веб-демо и пилот"],
    ["49 ₽", "расширенный отчет", "возможная платная функция"],
    ["99 ₽/мес", "команда", "перспективная версия для класса"],
    ["299 ₽/мес", "секция", "версия для нескольких команд"],
  ].forEach(([v, t, n], i) => metric(s, 0.85 + i * 3.05, 1.5, 2.35, v, t, n));
  card(s, 0.85, 3.3, 5.55, 2.25, "Минимальные расходы пилота", "Пилот можно провести почти без бюджета: телефон или компьютер, QR-код, школьный матч, опрос и демонстрация прототипа.", { bodySize: 13.4 });
  card(s, 6.85, 3.3, 5.55, 2.25, "Масштабирование", "При развитии нужны база данных, авторизация, сервер, дизайн-иконки, поддержка турниров и возможные партнерства с местным бизнесом.", { bodySize: 13.4 });
}

{
  const s = slide("Новизна и потенциал развития", "Новизна");
  twoColContent(s,
    ["Цифровой паспорт школьного футболиста", "Связка рейтинга, травм и автосостава", "QR-доступ к турниру для зрителей", "Режим жюри для быстрой демонстрации", "Премиальный HTML-отчет игрока"],
    ["Реальные аккаунты и база данных", "PDF-отчеты по игрокам и командам", "История сезонов и графики развития", "Настоящий видеоанализ на компьютерном зрении", "Возможная регистрация как ПО или база данных"]
  );
}

function twoColContent(s, left, right) {
  card(s, 0.65, 1.45, 5.75, 4.85, "Что нового в проекте", "", { fill: C.white });
  bullet(s, left, 1.0, 2.1, 5.0, { h: 3.55, fontSize: 13.4 });
  card(s, 6.82, 1.45, 5.75, 4.85, "Куда развивать дальше", "", { fill: C.mint, line: "BBF7D0", titleColor: C.green });
  bullet(s, right, 7.17, 2.1, 5.0, { h: 3.55, fontSize: 13.4 });
}

{
  const s = slide("Маршрут демонстрации за 5 минут", "Очная защита");
  [
    ["1", "Режим жюри", "сразу показать проблему, пользу и соответствие"],
    ["2", "Паспорт игрока", "цифровая карточка, рейтинг и рекомендации"],
    ["3", "Матч-день", "состав строится с учетом травм и формы"],
    ["4", "Турнир", "таблица, матчи, MVP и QR для зрителей"],
    ["5", "Тестирование", "план опроса, метрики и выводы"],
  ].forEach(([n, t, b], i) => card(s, 0.8 + i * 2.45, 1.65, 2.05, 3.6, t, b, { num: n, titleSize: 14.5, bodySize: 11.3, fill: i === 0 ? C.mint : C.white }));
  s.addText("Важно уложиться в регламент: выступление строго до 5 минут.", {
    x: 1.15,
    y: 5.85,
    w: 11.0,
    h: 0.24,
    fontSize: 14,
    bold: true,
    align: "center",
    color: C.green,
    margin: 0,
  });
}

{
  const s = slide("Вывод", "Практическая значимость");
  s.addText("FootAssist соответствует регламенту ЮТИ как ИТ-решение для школьной жизни и образовательной среды.", {
    x: 0.8,
    y: 1.45,
    w: 7.5,
    h: 1.1,
    fontSize: 28,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: "shrink",
  });
  bullet(s, [
    "Проект имеет рабочий прототип, а не только идею.",
    "Закрывает критерии актуальности, новизны, практической значимости и технической реализации.",
    "Имеет понятный план тестирования и дальнейшего развития.",
    "Может быть внедрен в школе или секции как пилот с минимальными затратами.",
  ], 0.95, 3.0, 7.25, { h: 2.4, fontSize: 14.2 });
  s.addShape(pptx.ShapeType.roundRect, { x: 9.0, y: 1.48, w: 2.85, h: 2.85, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line } });
  s.addImage({ path: qrPath, x: 9.18, y: 1.66, w: 2.5, h: 2.5 });
  s.addText(projectUrl, { x: 8.35, y: 4.55, w: 4.1, h: 0.28, fontSize: 10.5, color: C.green, align: "center", margin: 0, fit: "shrink" });
  s.addShape(pptx.ShapeType.roundRect, { x: 8.65, y: 5.15, w: 3.45, h: 0.62, rectRadius: 0.08, fill: { color: C.green }, line: { color: C.green } });
  s.addText("Каждый матч виден. Каждый игрок растет.", { x: 8.9, y: 5.36, w: 2.95, h: 0.14, fontSize: 9.5, bold: true, color: C.white, align: "center", margin: 0, fit: "shrink" });
}

await pptx.writeFile({ fileName: outPath });
console.log(outPath);
