import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import "./App.css";

const PROJECT_URL = "https://taaaaaaaaaaaaaaaamik.github.io/FootAssist/";
const STORAGE_KEY = "footassist-demo-state-v1";

const ROLE_LABELS = {
  player: "Игрок",
  coach: "Тренер",
  organizer: "Организатор",
  spectator: "Зритель",
};

const positions = ["Все", "Вратарь", "Защитник", "Полузащитник", "Нападающий", "Универсал", "Не выбрана"];
const careStatuses = ["Готов", "Основной состав", "Запасной", "Новичок", "Под вопросом", "Травма", "Восстановление"];

const initialPlayers = [
  {
    id: 101,
    firstName: "Амир",
    lastName: "Сафин",
    age: 15,
    grade: "9А",
    team: "9А Малояз",
    position: "Нападающий",
    careStatus: "Готов",
    injuryNote: "",
    recoveryDate: "",
    goals: 4,
    assists: 2,
    tackles: 3,
    accuratePasses: 18,
    mistakes: 2,
    saves: 0,
    conceded: 0,
    speed: 82,
    shooting: 78,
    passing: 70,
    defense: 42,
    technique: 76,
    physical: 71,
    progress: [52, 61, 73, 84, 96],
    photo: "",
  },
  {
    id: 102,
    firstName: "Тимур",
    lastName: "Ганиев",
    age: 15,
    grade: "9А",
    team: "9А Малояз",
    position: "Полузащитник",
    careStatus: "Основной состав",
    injuryNote: "",
    recoveryDate: "",
    goals: 2,
    assists: 4,
    tackles: 5,
    accuratePasses: 20,
    mistakes: 4,
    saves: 0,
    conceded: 0,
    speed: 74,
    shooting: 65,
    passing: 84,
    defense: 62,
    technique: 78,
    physical: 69,
    progress: [48, 58, 64, 76, 96],
    photo: "",
  },
  {
    id: 103,
    firstName: "Руслан",
    lastName: "Каримов",
    age: 14,
    grade: "8А",
    team: "8А Малояз",
    position: "Защитник",
    careStatus: "Травма",
    injuryNote: "Растяжение, временно не ставить в старт",
    recoveryDate: "через 7 дней",
    goals: 0,
    assists: 1,
    tackles: 9,
    accuratePasses: 14,
    mistakes: 3,
    saves: 0,
    conceded: 0,
    speed: 66,
    shooting: 38,
    passing: 61,
    defense: 86,
    technique: 57,
    physical: 80,
    progress: [41, 49, 58, 62, 62],
    photo: "",
  },
  {
    id: 104,
    firstName: "Даниил",
    lastName: "Иванов",
    age: 14,
    grade: "8Б",
    team: "8Б Малояз",
    position: "Полузащитник",
    careStatus: "Восстановление",
    injuryNote: "Можно играть 10–15 минут",
    recoveryDate: "3 дня",
    goals: 1,
    assists: 3,
    tackles: 4,
    accuratePasses: 22,
    mistakes: 5,
    saves: 0,
    conceded: 0,
    speed: 70,
    shooting: 58,
    passing: 81,
    defense: 61,
    technique: 74,
    physical: 62,
    progress: [44, 53, 67, 72, 76],
    photo: "",
  },
  {
    id: 105,
    firstName: "Ильдар",
    lastName: "Юсупов",
    age: 15,
    grade: "9А",
    team: "9А Малояз",
    position: "Вратарь",
    careStatus: "Готов",
    injuryNote: "",
    recoveryDate: "",
    goals: 0,
    assists: 0,
    tackles: 2,
    accuratePasses: 8,
    mistakes: 1,
    saves: 12,
    conceded: 3,
    speed: 61,
    shooting: 22,
    passing: 58,
    defense: 72,
    technique: 60,
    physical: 77,
    progress: [37, 42, 48, 55, 64],
    photo: "",
  },
  {
    id: 106,
    firstName: "Самат",
    lastName: "Ахметов",
    age: 15,
    grade: "9А",
    team: "9А Малояз",
    position: "Защитник",
    careStatus: "Готов",
    injuryNote: "",
    recoveryDate: "",
    goals: 0,
    assists: 1,
    tackles: 7,
    accuratePasses: 13,
    mistakes: 2,
    saves: 0,
    conceded: 0,
    speed: 68,
    shooting: 40,
    passing: 59,
    defense: 79,
    technique: 55,
    physical: 76,
    progress: [33, 41, 47, 52, 55],
    photo: "",
  },
];

const initialPlayerRequests = [
  {
    id: 201,
    firstName: "Артур",
    lastName: "Хасанов",
    age: 15,
    school: "Башкирская гимназия села Малояз",
    city: "село Малояз",
    teamCode: "MALOYAZ-9A",
  },
];

const initialTeamRequests = [
  {
    id: 301,
    teamName: "9Б Малояз",
    coachName: "Ильнур Ганиев",
    school: "Башкирская гимназия села Малояз",
    tournamentCode: "CUP-MALOYAZ-2026",
  },
  {
    id: 302,
    teamName: "10А Малояз",
    coachName: "Айдар Султанов",
    school: "Башкирская гимназия села Малояз",
    tournamentCode: "CUP-MALOYAZ-2026",
  },
];

const initialTournamentTeams = [
  { name: "9А Малояз", coach: "Демо Тренер", games: 4, wins: 3, draws: 1, losses: 0, points: 10 },
  { name: "9Б Малояз", coach: "Ильнур Ганиев", games: 4, wins: 3, draws: 0, losses: 1, points: 9 },
  { name: "8А Малояз", coach: "Руслан Каримов", games: 4, wins: 2, draws: 1, losses: 1, points: 7 },
  { name: "8Б Малояз", coach: "Андрей Иванов", games: 4, wins: 1, draws: 1, losses: 2, points: 4 },
  { name: "10А Малояз", coach: "Айдар Султанов", games: 4, wins: 1, draws: 0, losses: 3, points: 3 },
  { name: "Сборная 7–8", coach: "Дмитрий Павлов", games: 4, wins: 0, draws: 1, losses: 3, points: 1 },
];

const matches = [
  { id: 1, title: "9А Малояз — 9Б Малояз", score: "3:2", status: "Завершен" },
  { id: 2, title: "8А Малояз — 8Б Малояз", score: "2:0", status: "Завершен" },
  { id: 3, title: "10А Малояз — Сборная 7–8", score: "1:1", status: "Завершен" },
  { id: 4, title: "9А Малояз — 8А Малояз", score: "Скоро", status: "Запланирован" },
  { id: 5, title: "9Б Малояз — 10А Малояз", score: "Скоро", status: "Запланирован" },
];

const demoVideoStats = [
  { id: 101, goals: 1, assists: 1, tackles: 0, accuratePasses: 6, mistakes: 1 },
  { id: 102, goals: 0, assists: 2, tackles: 2, accuratePasses: 8, mistakes: 1 },
  { id: 105, goals: 0, assists: 0, tackles: 0, accuratePasses: 4, mistakes: 0, saves: 3, conceded: 1 },
];

const surveyResults = [
  { label: "Хотят видеть личный рейтинг", value: 83 },
  { label: "Считают QR-турнир удобным", value: 78 },
  { label: "Поддерживают цифровой паспорт", value: 88 },
  { label: "Хотят статистику вместо оценки «на глаз»", value: 91 },
];

const testingChecklist = [
  ["Кого опросить", "15-30 учеников, 2-3 тренера, несколько родителей или зрителей"],
  ["Что проверить", "понятность рейтинга, удобство QR, доверие к статистике, пользу паспорта"],
  ["Что показать", "паспорт игрока, матч-день, турнир, режим жюри и QR-доступ"],
  ["Что зафиксировать", "проценты, 3 коротких отзыва, фото или скриншоты демонстрации"],
];

const pilotMetrics = [
  ["24", "целевых ответа нужно собрать для уверенной защиты"],
  ["5 мин", "достаточно на один сценарий показа"],
  ["4 роли", "игрок, тренер, организатор и зритель проверяются отдельно"],
  ["1 вывод", "какую функцию люди считают самой полезной"],
];

const initialChatMessages = [
  { id: 1, from: "Тренер", to: "Амир Сафин", text: "Завтра тренировка в 15:00. Не забудь форму.", time: "12:10", status: "Доставлено" },
  { id: 2, from: "Амир Сафин", to: "Тренер", text: "Хорошо, буду вовремя.", time: "12:12", status: "Прочитано" },
];

function loadStoredState() {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function fullName(player) {
  if (!player) return "Игрок";
  return `${player.firstName} ${player.lastName}`;
}

function initials(player) {
  if (!player) return "И";
  return `${player.firstName?.[0] || ""}${player.lastName?.[0] || ""}` || "И";
}

function calculateRating(player) {
  const base =
    player.goals * 10 +
    player.assists * 7 +
    player.tackles * 4 +
    player.accuratePasses * 2 -
    player.mistakes * 3;

  if (player.position === "Вратарь") {
    return base + player.saves * 3 - player.conceded * 2;
  }

  return base;
}

function cardOverall(player) {
  const raw = Math.round(
    (calculateRating(player) + player.speed + player.passing + player.defense + player.technique + player.physical) / 6
  );
  return Math.max(1, Math.min(99, raw));
}

function isUnavailable(player) {
  return player.careStatus === "Травма";
}

function isLimited(player) {
  return player.careStatus === "Восстановление" || player.careStatus === "Под вопросом";
}

function getRecommendation(player) {
  if (isUnavailable(player)) return "Игрок временно недоступен. Система не рекомендует включать его в стартовый состав.";
  if (isLimited(player)) return "Игрок доступен ограниченно. Лучше использовать как запасного или дать короткое игровое время.";
  if (player.position === "Вратарь") return "Сильная сторона: реакция и сейвы. Рекомендация: использовать как основного вратаря при готовности.";
  if (player.goals >= 3) return "Сильная сторона: атака. Рекомендация: использовать ближе к воротам соперника.";
  if (player.assists >= 3 || player.accuratePasses >= 20) return "Сильная сторона: игра в пас. Рекомендация: использовать в центре поля.";
  if (player.tackles >= 7) return "Сильная сторона: отбор мяча. Рекомендация: использовать в защите.";
  if (player.mistakes >= 5) return "Зона роста: снизить количество ошибок под давлением.";
  return "Игрок сбалансирован. Рекомендация: развивать точность передач и командное взаимодействие.";
}

function buildLineup(players) {
  const available = players
    .filter((player) => !isUnavailable(player))
    .sort((a, b) => calculateRating(b) - calculateRating(a));

  const takeBest = (pos, usedIds) => {
    const exact = available.find((player) => player.position === pos && !usedIds.has(player.id) && !isLimited(player));
    if (exact) return exact;
    const fallback = available.find((player) => player.position === pos && !usedIds.has(player.id));
    if (fallback) return fallback;
    return available.find((player) => !usedIds.has(player.id));
  };

  const used = new Set();
  const slots = [
    { role: "Вратарь", pos: "Вратарь" },
    { role: "Защитник 1", pos: "Защитник" },
    { role: "Защитник 2", pos: "Защитник" },
    { role: "Полузащитник 1", pos: "Полузащитник" },
    { role: "Полузащитник 2", pos: "Полузащитник" },
    { role: "Нападающий", pos: "Нападающий" },
  ];

  const starters = slots.map((slot) => {
    const player = takeBest(slot.pos, used);
    if (player) used.add(player.id);
    return { ...slot, player };
  });

  const bench = available.filter((player) => !used.has(player.id)).slice(0, 4);
  return { starters, bench };
}

function downloadTextFile(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function App() {
  const storedState = useMemo(() => loadStoredState(), []);
  const nextIdRef = useRef(1000);
  const [screen, setScreen] = useState("auth");
  const [role, setRole] = useState("coach");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [players, setPlayers] = useState(() => storedState.players || initialPlayers);
  const [selectedPlayerId, setSelectedPlayerId] = useState(() => storedState.selectedPlayerId || initialPlayers[0].id);
  const [playerRequests, setPlayerRequests] = useState(() => storedState.playerRequests || initialPlayerRequests);
  const [teamRequests, setTeamRequests] = useState(() => storedState.teamRequests || initialTeamRequests);
  const [tournamentTeams, setTournamentTeams] = useState(() => storedState.tournamentTeams || initialTournamentTeams);
  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [toast, setToast] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(() => storedState.selectedChatId || initialPlayers[0].id);
  const [chatDraft, setChatDraft] = useState("");
  const [chatMessages, setChatMessages] = useState(() => storedState.chatMessages || initialChatMessages);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [qrSrc, setQrSrc] = useState("");
  const [manualPlayer, setManualPlayer] = useState({
    firstName: "",
    lastName: "",
    age: "15",
    grade: "9А",
    position: "Не выбрана",
    careStatus: "Новичок",
  });

  useEffect(() => {
    let isMounted = true;

    QRCode.toDataURL(PROJECT_URL, {
      width: 240,
      margin: 2,
      color: {
        dark: "#07111f",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (isMounted) setQrSrc(url);
      })
      .catch(() => {
        if (isMounted) setQrSrc("");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          players,
          selectedPlayerId,
          selectedChatId,
          playerRequests,
          teamRequests,
          tournamentTeams,
          chatMessages,
        })
      );
    } catch {
      // Демо должно работать даже в браузере с отключенным localStorage.
    }
  }, [players, selectedPlayerId, selectedChatId, playerRequests, teamRequests, tournamentTeams, chatMessages]);

  const selectedPlayer = players.find((player) => player.id === selectedPlayerId) || players[0];
  const selectedChatPlayer = players.find((player) => player.id === selectedChatId) || players[0];

  const rankedPlayers = useMemo(() => {
    return [...players].sort((a, b) => calculateRating(b) - calculateRating(a));
  }, [players]);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesQuery = fullName(player).toLowerCase().includes(query.toLowerCase());
      const matchesPosition = positionFilter === "Все" || player.position === positionFilter;
      const matchesStatus = statusFilter === "Все" || player.careStatus === statusFilter;
      return matchesQuery && matchesPosition && matchesStatus;
    });
  }, [players, query, positionFilter, statusFilter]);

  const injuryPlayers = useMemo(() => {
    return players.filter((player) => player.careStatus === "Травма" || player.careStatus === "Восстановление" || player.careStatus === "Под вопросом");
  }, [players]);

  const lineup = useMemo(() => buildLineup(players), [players]);

  function nextId() {
    nextIdRef.current += 1;
    return nextIdRef.current;
  }

  const tabs = useMemo(() => {
    if (role === "organizer") {
      return [
        ["dashboard", "Главная"],
        ["jury", "Жюри"],
        ["teams", "Команды"],
        ["stats", "Статистика"],
        ["research", "Тест"],
        ["video", "AI-анализ"],
        ["tournament", "Турнир"],
        ["safety", "Безопасность"],
        ["demo", "Демо"],
      ];
    }

    if (role === "spectator") {
      return [
        ["jury", "Жюри"],
        ["tournament", "Турнир"],
        ["rating", "Рейтинг"],
        ["research", "О проекте"],
        ["demo", "QR"],
      ];
    }

    if (role === "player") {
      return [
        ["dashboard", "Главная"],
        ["jury", "Жюри"],
        ["players", "Паспорт"],
        ["development", "Развитие"],
        ["schedule", "Расписание"],
        ["progress", "История"],
        ["chat", "Чат"],
        ["tournament", "Турнир"],
      ];
    }

    return [
      ["dashboard", "Главная"],
      ["jury", "Жюри"],
      ["players", "Игроки"],
      ["requests", "Заявки"],
      ["matchday", "Матч-день"],
      ["injuries", "Травмы"],
      ["rating", "Рейтинг"],
      ["research", "Тест"],
      ["chat", "Чат"],
      ["tournament", "Турнир"],
      ["demo", "Демо"],
    ];
  }, [role]);

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2400);
  }

  function loginAs(nextRole, initialTab) {
    setRole(nextRole);
    setScreen("app");
    setActiveTab(initialTab || (nextRole === "organizer" ? "teams" : nextRole === "spectator" ? "tournament" : "dashboard"));
    notify(`Вход: ${ROLE_LABELS[nextRole]}`);
  }

  function updatePlayer(id, patch) {
    setPlayers((prev) => prev.map((player) => (player.id === id ? { ...player, ...patch } : player)));
    notify("Данные игрока обновлены");
  }

  function updatePlayerStat(field, value) {
    const number = Math.max(0, Number(value) || 0);
    updatePlayer(selectedPlayer.id, { [field]: number });
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updatePlayer(selectedPlayer.id, { photo: reader.result });
      notify("Фото игрока добавлено");
    };
    reader.readAsDataURL(file);
  }

  function addManualPlayer() {
    if (!manualPlayer.firstName.trim() || !manualPlayer.lastName.trim()) {
      notify("Укажите имя и фамилию игрока");
      return;
    }

    const newPlayer = {
      id: nextId(),
      firstName: manualPlayer.firstName.trim(),
      lastName: manualPlayer.lastName.trim(),
      age: Number(manualPlayer.age) || 15,
      grade: manualPlayer.grade || "9А",
      team: "9А Малояз",
      position: manualPlayer.position,
      careStatus: manualPlayer.careStatus,
      injuryNote: "",
      recoveryDate: "",
      goals: 0,
      assists: 0,
      tackles: 0,
      accuratePasses: 0,
      mistakes: 0,
      saves: 0,
      conceded: 0,
      speed: 50,
      shooting: 50,
      passing: 50,
      defense: 50,
      technique: 50,
      physical: 50,
      progress: [0, 0, 0, 0, 0],
      photo: "",
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setSelectedPlayerId(newPlayer.id);
    setSelectedChatId(newPlayer.id);
    setManualPlayer({ firstName: "", lastName: "", age: "15", grade: "9А", position: "Не выбрана", careStatus: "Новичок" });
    setShowAddPlayer(false);
    notify("Игрок добавлен в команду");
  }

  function acceptPlayerRequest(request) {
    const newPlayer = {
      id: nextId(),
      firstName: request.firstName,
      lastName: request.lastName,
      age: request.age,
      grade: "Новый",
      team: "9А Малояз",
      position: "Не выбрана",
      careStatus: "Новичок",
      injuryNote: "",
      recoveryDate: "",
      goals: 0,
      assists: 0,
      tackles: 0,
      accuratePasses: 0,
      mistakes: 0,
      saves: 0,
      conceded: 0,
      speed: 50,
      shooting: 50,
      passing: 50,
      defense: 50,
      technique: 50,
      physical: 50,
      progress: [0, 0, 0, 0, 0],
      photo: "",
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setPlayerRequests((prev) => prev.filter((item) => item.id !== request.id));
    notify("Заявка игрока принята");
  }

  function acceptTeamRequest(request) {
    const already = tournamentTeams.some((team) => team.name === request.teamName);
    if (!already) {
      setTournamentTeams((prev) => [...prev, { name: request.teamName, coach: request.coachName, games: 0, wins: 0, draws: 0, losses: 0, points: 0 }]);
    }
    setTeamRequests((prev) => prev.filter((item) => item.id !== request.id));
    notify("Команда принята в турнир");
  }

  function sendMessage() {
    const text = chatDraft.trim();
    if (!text) return;

    const playerName = role === "coach" ? fullName(selectedChatPlayer) : "Тамирлан Баймурзин";
    const from = role === "coach" ? "Тренер" : playerName;
    const to = role === "coach" ? playerName : "Тренер";
    const time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

    setChatMessages((prev) => [...prev, { id: nextId(), from, to, text, time, status: "Отправлено" }]);
    setChatDraft("");
    notify("Сообщение отправлено");
  }

  function makeReport() {
    const rating = calculateRating(selectedPlayer);
    const overall = cardOverall(selectedPlayer);
    const recommendation = getRecommendation(selectedPlayer);
    const reportDate = new Date().toLocaleDateString("ru-RU");
    const metrics = [
      ["Голы", selectedPlayer.goals],
      ["Передачи", selectedPlayer.assists],
      ["Отборы", selectedPlayer.tackles],
      ["Точные пасы", selectedPlayer.accuratePasses],
      ["Ошибки", selectedPlayer.mistakes],
      ["Общий уровень", overall],
    ];

    const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FootAssist - отчет игрока</title>
  <style>
    body { margin: 0; font-family: Inter, Arial, sans-serif; color: #0f172a; background: #f5f7fb; }
    main { max-width: 840px; margin: 0 auto; padding: 34px; }
    .hero { padding: 28px; border-radius: 28px; color: white; background: linear-gradient(135deg, #07111f, #0f7a37); }
    .eyebrow { color: #86efac; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; }
    h1 { margin: 10px 0 6px; font-size: 42px; line-height: 1; }
    p { line-height: 1.6; color: #475569; }
    .hero p { color: #e2e8f0; margin-bottom: 0; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 18px 0; }
    .card { padding: 18px; border-radius: 20px; background: white; border: 1px solid #e2e8f0; }
    .card b { display: block; font-size: 28px; color: #0f7a37; }
    .card span { color: #64748b; font-weight: 700; }
    .section { margin-top: 18px; padding: 22px; border-radius: 24px; background: white; border: 1px solid #e2e8f0; }
    h2 { margin: 0 0 8px; }
    .badge { display: inline-flex; margin: 4px 6px 4px 0; padding: 8px 12px; border-radius: 999px; background: #ecfdf5; color: #166534; font-weight: 800; }
    @media print { body { background: white; } main { padding: 0; } }
    @media (max-width: 640px) { main { padding: 16px; } .grid { grid-template-columns: 1fr 1fr; } h1 { font-size: 32px; } }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <span class="eyebrow">FootAssist · цифровой паспорт</span>
      <h1>${escapeHtml(fullName(selectedPlayer))}</h1>
      <p>${escapeHtml(selectedPlayer.team)} · ${escapeHtml(selectedPlayer.position)} · отчет от ${escapeHtml(reportDate)}</p>
    </section>

    <section class="grid">
      <div class="card"><b>${rating}</b><span>Рейтинг</span></div>
      <div class="card"><b>${overall}</b><span>Общий уровень</span></div>
      <div class="card"><b>${escapeHtml(selectedPlayer.careStatus)}</b><span>Статус</span></div>
    </section>

    <section class="section">
      <h2>Статистика</h2>
      <div class="grid">
        ${metrics.map(([label, value]) => `<div class="card"><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></div>`).join("")}
      </div>
    </section>

    <section class="section">
      <h2>Рекомендация</h2>
      <p>${escapeHtml(recommendation)}</p>
      <span class="badge">решения по данным</span>
      <span class="badge">прогресс игрока</span>
      <span class="badge">школьный футбол</span>
    </section>
  </main>
</body>
</html>`;

    downloadTextFile(`FootAssist_${selectedPlayer.lastName}_passport.html`, html, "text/html;charset=utf-8");
    notify("Премиальный отчет игрока сформирован");
  }

  function exportTournament() {
    const rows = ["Команда;Тренер;Игры;Победы;Ничьи;Поражения;Очки"];
    tournamentTeams.forEach((team) => {
      rows.push(`${team.name};${team.coach};${team.games};${team.wins};${team.draws};${team.losses};${team.points}`);
    });
    downloadTextFile("FootAssist_tournament_table.csv", rows.join("\n"));
    notify("Турнирная таблица экспортирована");
  }

  function startVideoAnalysis() {
    setVideoStatus("analyzing");
    notify("AI-анализ запущен");
    setTimeout(() => setVideoStatus("ready"), 900);
  }

  function confirmVideoStats() {
    setPlayers((prev) =>
      prev.map((player) => {
        const row = demoVideoStats.find((item) => item.id === player.id);
        if (!row) return player;

        return {
          ...player,
          goals: player.goals + (row.goals || 0),
          assists: player.assists + (row.assists || 0),
          tackles: player.tackles + (row.tackles || 0),
          accuratePasses: player.accuratePasses + (row.accuratePasses || 0),
          mistakes: player.mistakes + (row.mistakes || 0),
          saves: player.saves + (row.saves || 0),
          conceded: player.conceded + (row.conceded || 0),
          progress: [...player.progress.slice(1), Math.max(0, calculateRating(player) + 10)],
        };
      })
    );
    setVideoStatus("confirmed");
    notify("Статистика подтверждена организатором");
  }

  function resetDemoData() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Сброс остается доступным даже без доступа к хранилищу.
    }

    setPlayers(initialPlayers);
    setSelectedPlayerId(initialPlayers[0].id);
    setSelectedChatId(initialPlayers[0].id);
    setPlayerRequests(initialPlayerRequests);
    setTeamRequests(initialTeamRequests);
    setTournamentTeams(initialTournamentTeams);
    setChatMessages(initialChatMessages);
    setVideoStatus("idle");
    notify("Демо-данные сброшены");
  }

  function renderProgress(player) {
    const values = player.progress?.length ? player.progress : [0, 0, 0, 0, 0];
    const max = Math.max(...values, 100);
    const points = values
      .map((value, index) => {
        const x = 16 + index * 64;
        const y = 120 - (value / max) * 92;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="progressCard">
        <div className="progressHeader">
          <div>
            <b>Прогресс игрока</b>
            <span>последние 5 матчей</span>
          </div>
          <strong>+{Math.max(0, values[values.length - 1] - values[0])}</strong>
        </div>
        <svg viewBox="0 0 290 140" className="progressSvg">
          <polyline points={points} />
          {values.map((value, index) => (
            <g key={index}>
              <circle cx={16 + index * 64} cy={120 - (value / max) * 92} r="5" />
              <text x={16 + index * 64} y="136">{index + 1}</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  function renderPlayerCard(player) {
    return (
      <div className="gameCard">
        <div className="cardTopLine">
          <strong>{cardOverall(player)}</strong>
          <span>{player.position}</span>
        </div>
        <div className="gameAvatar">
          {player.photo ? <img src={player.photo} alt={fullName(player)} /> : initials(player)}
        </div>
        <h3>{player.firstName} {player.lastName}</h3>
        <p>{player.team} · {player.grade}</p>
        <div className="gameStats">
          <div><b>{player.speed}</b><span>СКР</span></div>
          <div><b>{player.shooting}</b><span>УДР</span></div>
          <div><b>{player.passing}</b><span>ПАС</span></div>
          <div><b>{player.defense}</b><span>ОТБ</span></div>
          <div><b>{player.technique}</b><span>ТЕХ</span></div>
          <div><b>{player.physical}</b><span>ФИЗ</span></div>
        </div>
      </div>
    );
  }

  function renderPlayerPanel() {
    if (role === "player") {
      return (
        <>
          <section className="playerPremiumHero panel">
            <div>
              <span className="eyebrow">Личный кабинет игрока</span>
              <h2>Мой паспорт</h2>
              <p>
                Игрок видит только свои данные: паспорт, рейтинг, статистику,
                рекомендации, прогресс и личный отчет. Управление составом доступно только тренеру.
              </p>
              <div className="badgeRow">
                <span className="pill">Команда: {selectedPlayer.team}</span>
                <span className="pill">Позиция: {selectedPlayer.position}</span>
                <span className={isUnavailable(selectedPlayer) ? "pill danger" : "pill success"}>
                  {selectedPlayer.careStatus}
                </span>
                <span className="pill">Рейтинг: {calculateRating(selectedPlayer)}</span>
              </div>
              <div className="actionRow">
                <button className="softButton dark" onClick={() => setActiveTab("development")}>
                  Что улучшить
                </button>
                <button className="softButton" onClick={() => setActiveTab("schedule")}>
                  Расписание
                </button>
                <button className="softButton" onClick={makeReport}>
                  Скачать отчет
                </button>
              </div>
            </div>
            {renderPlayerCard(selectedPlayer)}
          </section>

          <section className="panel">
            <h2>Моя статистика</h2>
            <div className="premiumMetrics">
              <div><b>{selectedPlayer.goals}</b><span>Голы</span></div>
              <div><b>{selectedPlayer.assists}</b><span>Передачи</span></div>
              <div><b>{selectedPlayer.tackles}</b><span>Отборы</span></div>
              <div><b>{selectedPlayer.accuratePasses}</b><span>Точные пасы</span></div>
              <div><b>{selectedPlayer.mistakes}</b><span>Ошибки</span></div>
              <div><b>{cardOverall(selectedPlayer)}</b><span>Общий уровень</span></div>
            </div>
          </section>

          <section className="panel">
            <h2>Рекомендация</h2>
            <div className="coachAdvice">
              <b>{getRecommendation(selectedPlayer)}</b>
              <p>
                Игрок не может редактировать состав и официальную статистику.
                Эти функции доступны тренеру и организатору.
              </p>
            </div>
          </section>
        </>
      );
    }

    return (
      <>
        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>Игроки команды</h2>
              <p>Поиск, фильтр, статусы и ручное добавление.</p>
            </div>
            {role === "coach" && (
              <button className="softButton dark" onClick={() => setShowAddPlayer(!showAddPlayer)}>
                {showAddPlayer ? "Скрыть" : "+ Игрок"}
              </button>
            )}
          </div>

          {showAddPlayer && role === "coach" && (
            <div className="softForm">
              <h3>Добавить игрока вручную</h3>
              <div className="compactGrid">
                <label>Имя<input value={manualPlayer.firstName} onChange={(e) => setManualPlayer({ ...manualPlayer, firstName: e.target.value })} /></label>
                <label>Фамилия<input value={manualPlayer.lastName} onChange={(e) => setManualPlayer({ ...manualPlayer, lastName: e.target.value })} /></label>
                <label>Возраст<input value={manualPlayer.age} onChange={(e) => setManualPlayer({ ...manualPlayer, age: e.target.value })} /></label>
                <label>Класс<input value={manualPlayer.grade} onChange={(e) => setManualPlayer({ ...manualPlayer, grade: e.target.value })} /></label>
                <label>Позиция<select value={manualPlayer.position} onChange={(e) => setManualPlayer({ ...manualPlayer, position: e.target.value })}>{positions.filter((pos) => pos !== "Все").map((pos) => <option key={pos}>{pos}</option>)}</select></label>
                <label>Статус<select value={manualPlayer.careStatus} onChange={(e) => setManualPlayer({ ...manualPlayer, careStatus: e.target.value })}>{careStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
              </div>
              <button className="mainButton" onClick={addManualPlayer}>Добавить в команду</button>
            </div>
          )}

          <div className="toolsRow">
            <input placeholder="Найти игрока..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>{positions.map((pos) => <option key={pos}>{pos}</option>)}</select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>Все</option>
              {careStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>

          <div className="playerList">
            {filteredPlayers.map((player) => (
              <button key={player.id} className={selectedPlayer.id === player.id ? "playerRow active" : "playerRow"} onClick={() => setSelectedPlayerId(player.id)}>
                <div className="miniAvatar">{player.photo ? <img src={player.photo} alt={fullName(player)} /> : initials(player)}</div>
                <div>
                  <b>{fullName(player)}</b>
                  <span>{player.position} · {player.careStatus}</span>
                </div>
                <strong>{calculateRating(player)}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="panel playerDetails">
          <div className="playerHero">
            {renderPlayerCard(selectedPlayer)}
            <div className="playerInfo">
              <h2>Цифровой паспорт</h2>
              <p>{getRecommendation(selectedPlayer)}</p>
              <div className="badgeRow">
                <span className="pill">{selectedPlayer.position}</span>
                <span className={isUnavailable(selectedPlayer) ? "pill danger" : "pill success"}>{selectedPlayer.careStatus}</span>
                <span className="pill">Рейтинг {calculateRating(selectedPlayer)}</span>
              </div>

              <div className="statsGrid">
                <div><b>{selectedPlayer.goals}</b><span>Голы</span></div>
                <div><b>{selectedPlayer.assists}</b><span>Передачи</span></div>
                <div><b>{selectedPlayer.tackles}</b><span>Отборы</span></div>
                <div><b>{selectedPlayer.accuratePasses}</b><span>Точные пасы</span></div>
                <div><b>{selectedPlayer.mistakes}</b><span>Ошибки</span></div>
                {selectedPlayer.position === "Вратарь" && <div><b>{selectedPlayer.saves}</b><span>Сейвы</span></div>}
              </div>

              <div className="actionRow">
                <label className="uploadButton">Фото<input type="file" accept="image/*" onChange={handlePhoto} /></label>
                <button className="softButton" onClick={makeReport}>Сформировать отчет</button>
              </div>
            </div>
          </div>

          {role === "coach" && (
            <div className="coachControls">
              <h3>Управление составом</h3>
              <div className="compactGrid">
                <label>Позиция
                  <select value={selectedPlayer.position} onChange={(e) => updatePlayer(selectedPlayer.id, { position: e.target.value })}>
                    {positions.filter((pos) => pos !== "Все").map((pos) => <option key={pos}>{pos}</option>)}
                  </select>
                </label>
                <label>Статус
                  <select value={selectedPlayer.careStatus} onChange={(e) => updatePlayer(selectedPlayer.id, { careStatus: e.target.value })}>
                    {careStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </label>
                <label>Срок восстановления
                  <input value={selectedPlayer.recoveryDate} onChange={(e) => updatePlayer(selectedPlayer.id, { recoveryDate: e.target.value })} placeholder="например: 5 дней" />
                </label>
              </div>
              <label>Комментарий по состоянию
                <input value={selectedPlayer.injuryNote} onChange={(e) => updatePlayer(selectedPlayer.id, { injuryNote: e.target.value })} placeholder="например: не ставить в старт" />
              </label>
            </div>
          )}

          {role === "organizer" && (
            <div className="coachControls">
              <h3>Официальная статистика матча</h3>
              <p>Эти данные подтверждает организатор, чтобы рейтинг был честным.</p>
              <div className="compactGrid">
                <label>Голы<input type="number" value={selectedPlayer.goals} onChange={(e) => updatePlayerStat("goals", e.target.value)} /></label>
                <label>Передачи<input type="number" value={selectedPlayer.assists} onChange={(e) => updatePlayerStat("assists", e.target.value)} /></label>
                <label>Отборы<input type="number" value={selectedPlayer.tackles} onChange={(e) => updatePlayerStat("tackles", e.target.value)} /></label>
                <label>Точные пасы<input type="number" value={selectedPlayer.accuratePasses} onChange={(e) => updatePlayerStat("accuratePasses", e.target.value)} /></label>
                <label>Ошибки<input type="number" value={selectedPlayer.mistakes} onChange={(e) => updatePlayerStat("mistakes", e.target.value)} /></label>
                {selectedPlayer.position === "Вратарь" && <label>Сейвы<input type="number" value={selectedPlayer.saves} onChange={(e) => updatePlayerStat("saves", e.target.value)} /></label>}
              </div>
            </div>
          )}

          {renderProgress(selectedPlayer)}
        </section>
      </>
    );
  }

  function renderDashboard() {
    const best = rankedPlayers[0];
    const readyPlayers = players.filter((player) => !isUnavailable(player)).length;
    const averageRating = Math.round(
      players.reduce((sum, player) => sum + calculateRating(player), 0) / Math.max(players.length, 1)
    );

    return (
      <>
        <section className="premiumHero">
          <div className="heroTextBlock">
            <span className="eyebrow">FootAssist · школьный футбольный менеджер</span>
            <h1>FootAssist для школьного футбола</h1>
            <p>
              {role === "player"
                ? "Личный паспорт, прогресс, статистика, тренировки, турниры и рекомендации — в одном понятном кабинете игрока."
                : "Паспорта игроков, рейтинг, травмы, чат и турнирная таблица — в одном пространстве. AI-анализ видео показан как перспективный демо-модуль."}
            </p>

            <div className="heroActions">
              <button className="mainButton" onClick={() => setActiveTab("players")}>
                {role === "player" ? "Открыть мой паспорт" : "Открыть игроков"}
              </button>
              <button
                className="softButton"
                onClick={() =>
                  setActiveTab(
                    role === "player"
                      ? "development"
                      : role === "coach"
                      ? "matchday"
                      : role === "organizer"
                      ? "video"
                      : "tournament"
                  )
                }
              >
                {role === "player"
                  ? "Что улучшить"
                  : role === "coach"
                  ? "Предложить состав"
                  : role === "organizer"
                  ? "Открыть AI-анализ"
                  : "Открыть турнир"}
              </button>
              <button className="softButton" onClick={() => setActiveTab("demo")}>
                QR для жюри
              </button>
            </div>

            <div className="heroTrust">
              {role === "player" ? (
                <>
                  <span>Мой прогресс</span>
                  <span>Мои тренировки</span>
                  <span>Мой рейтинг</span>
                  <span>Без установки</span>
                </>
              ) : (
                <>
                  <span>Для школы</span>
                  <span>Для тренера</span>
                  <span>Для турниров</span>
                  <span>Без установки</span>
                </>
              )}
            </div>
          </div>

          <div className="premiumDashboardCard">
            <div className="liveBadge">
              <i></i>
              Live demo
            </div>

            <div className="pitchMini">
              <span className="playerDot gk">GK</span>
              <span className="playerDot def1">D</span>
              <span className="playerDot def2">D</span>
              <span className="playerDot mid1">M</span>
              <span className="playerDot mid2">M</span>
              <span className="playerDot fw">F</span>
            </div>

            <div className="bestPlayerMini">
              <div className="miniAvatar bigMini">
                {best.photo ? <img src={best.photo} alt={fullName(best)} /> : initials(best)}
              </div>
              <div>
                <span>Лучший игрок</span>
                <b>{fullName(best)}</b>
                <p>{best.position} · рейтинг {calculateRating(best)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="premiumStatsGrid">
          <div>
            <span>Игроки</span>
            <b>{players.length}</b>
            <em>{readyPlayers} доступны к матчу</em>
          </div>
          <div>
            <span>Контроль травм</span>
            <b>{injuryPlayers.length}</b>
            <em>автосостав учитывает ограничения</em>
          </div>
          <div>
            <span>Заявки</span>
            <b>{playerRequests.length + teamRequests.length}</b>
            <em>игроки и команды</em>
          </div>
          <div>
            <span>Средний рейтинг</span>
            <b>{averageRating}</b>
            <em>по текущему составу</em>
          </div>
        </section>

        <section className="premiumHomeGrid">
          <div className="panel premiumFeaturePanel">
            <div className="sectionHeader">
              <div>
                <h2>Что делает FootAssist</h2>
                <p>Главные модули собраны на одной платформе.</p>
              </div>
            </div>

            <div className="featureCards">
              <button onClick={() => setActiveTab("players")}>
                <b>01</b>
                <strong>{role === "player" ? "Мой паспорт" : "Цифровой паспорт"}</strong>
                <span>
                  {role === "player"
                    ? "личная карточка, статистика и рекомендации"
                    : "фото, позиция, статус, рейтинг и рекомендации"}
                </span>
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    role === "player"
                      ? "development"
                      : role === "coach"
                      ? "matchday"
                      : role === "organizer"
                      ? "video"
                      : "tournament"
                  )
                }
              >
                <b>02</b>
                <strong>
                  {role === "player"
                    ? "Развитие"
                    : role === "coach"
                    ? "Матч-день"
                    : role === "organizer"
                    ? "AI-анализ"
                    : "Турнир"}
                </strong>
                <span>
                  {role === "player"
                    ? "что улучшить, показатели и диаграмма навыков"
                    : role === "coach"
                    ? "автоподбор состава с учетом травм"
                    : role === "organizer"
                    ? "демо-сценарий будущего видеоанализа"
                    : "таблица, матчи и рейтинг игроков"}
                </span>
              </button>

              <button onClick={() => setActiveTab("tournament")}>
                <b>03</b>
                <strong>Турнир</strong>
                <span>таблица, матчи, очки и MVP</span>
              </button>

              <button onClick={() => setActiveTab("chat")}>
                <b>04</b>
                <strong>Чат</strong>
                <span>связь тренера с игроками как в мессенджере</span>
              </button>
            </div>
          </div>

          <div className="panel premiumRoutePanel">
            <div className="sectionHeader">
              <div>
                <h2>Маршрут для жюри</h2>
                <p>Быстрый показ прототипа за 40–60 секунд.</p>
              </div>
            </div>

            <div className="premiumTimeline">
              {(role === "player"
                ? [
                    ["Паспорт", "посмотреть личную карточку и рейтинг"],
                    ["Развитие", "открыть рекомендации и диаграмму навыков"],
                    ["Расписание", "посмотреть тренировки и турниры"],
                    ["История", "проверить прогресс по матчам"],
                    ["Чат", "написать тренеру по тренировке"],
                  ]
                : role === "organizer"
                ? [
                    ["Команды", "принять заявки команд и игроков"],
                    ["Статистика", "внести официальные показатели матча"],
                    ["AI-анализ", "показать демо-сценарий AI-видеоанализа"],
                    ["Проверка", "подтвердить данные перед рейтингом"],
                    ["Турнир", "показать таблицу, матчи и MVP"],
                  ]
                : [
                    ["Тренер", "открыть команду и паспорт игрока"],
                    ["Матч-день", "показать автоматический стартовый состав"],
                    ["Травмы", "объяснить, почему игрок исключен из старта"],
                    ["Чат", "отправить организационное сообщение"],
                    ["Турнир", "подать заявку команды и смотреть таблицу"],
                  ]).map((step, index) => (
                <div key={step[0]}>
                  <b>{index + 1}</b>
                  <div>
                    <strong>{step[0]}</strong>
                    <span>{step[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel premiumSchoolPanel">
          <div>
            <span className="eyebrow">Почему это полезно школе</span>
            <h2>Меньше бумажных таблиц — больше прозрачности и прогресса</h2>
            <p>
              FootAssist помогает проводить школьные турниры аккуратнее: тренер видит состав,
              игрок видит развитие, организатор подтверждает официальную статистику,
              а зрители открывают турнир по QR-коду.
            </p>
          </div>

          <div className="schoolBenefits">
            <div><b>QR</b><span>быстрый доступ</span></div>
            <div><b>AI</b><span>сценарий видеоанализа</span></div>
            <div><b>Fair</b><span>статистику подтверждает организатор</span></div>
          </div>
        </section>
      </>
    );
  }

  function renderJury() {
    const roleCards = [
      ["Игрок", "личный паспорт, прогресс, расписание, история матчей и чат с тренером"],
      ["Тренер", "команда, заявки, статистика, автосостав, травмы и организационный чат"],
      ["Организатор", "заявки команд, турнирная таблица, подтверждение данных и AI-демо"],
      ["Зритель", "турнир, матчи, MVP, рейтинг и QR-доступ без установки"],
    ];

    const proofCards = [
      ["Готово", "React-прототип, роли, рейтинг, турнир, чат, отчеты, APK и GitHub Pages-сборка"],
      ["Проверяем", "опрос учеников и тренеров, удобство QR-доступа, понятность рейтинга"],
      ["Перспектива", "реальные аккаунты, база данных, PDF-отчеты и компьютерное зрение для видео"],
    ];

    return (
      <>
        <section className="juryHero panel">
          <span className="eyebrow">Режим защиты проекта</span>
          <h2>FootAssist показывает школьный футбол языком данных</h2>
          <p>
            Проблема проекта: в школьных турнирах статистика часто ведется вручную,
            игроки не видят свой прогресс, а тренеру сложно быстро оценить форму,
            травмы и вклад каждого участника. FootAssist собирает это в одном
            понятном цифровом пространстве.
          </p>
          <div className="juryActions">
            <button className="mainButton" onClick={() => setActiveTab("players")}>Паспорт игрока</button>
            <button className="softButton" onClick={() => setActiveTab("matchday")}>Матч-день</button>
            <button className="softButton" onClick={() => setActiveTab("tournament")}>Турнир</button>
            <button className="softButton" onClick={() => setActiveTab("demo")}>QR-демо</button>
          </div>
        </section>

        <section className="juryGrid">
          <div className="panel">
            <h2>Ключевая польза</h2>
            <div className="juryValueList">
              <div><b>1</b><span>Игрок понимает, что улучшать после матчей.</span></div>
              <div><b>2</b><span>Тренер принимает решения не только “на глаз”.</span></div>
              <div><b>3</b><span>Организатор ведет турнир прозрачнее и быстрее.</span></div>
              <div><b>4</b><span>Родители и зрители открывают результаты по QR.</span></div>
            </div>
          </div>

          <div className="panel">
            <h2>Демо за 60 секунд</h2>
            <div className="premiumTimeline compactTimeline">
              {[
                ["Паспорт", "открыть карточку игрока и рейтинг"],
                ["Развитие", "показать рекомендации и диаграмму навыков"],
                ["Матч-день", "состав строится с учетом травм"],
                ["Турнир", "таблица, матчи и MVP доступны зрителям"],
                ["AI", "показать честно обозначенный демо-сценарий"],
              ].map((step, index) => (
                <div key={step[0]}>
                  <b>{index + 1}</b>
                  <div>
                    <strong>{step[0]}</strong>
                    <span>{step[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>Роли и доступ</h2>
              <p>Права разделены, чтобы официальные данные не редактировались кем попало.</p>
            </div>
          </div>
          <div className="roleMatrix">
            {roleCards.map(([name, description]) => (
              <div key={name}>
                <b>{name}</b>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>Готовность проекта</h2>
              <p>Так проект лучше звучит на конкурсе: что уже работает, что тестируется, что развивается дальше.</p>
            </div>
            <button className="softButton" onClick={resetDemoData}>Сбросить демо</button>
          </div>
          <div className="proofGrid">
            {proofCards.map(([title, text]) => (
              <div key={title}>
                <b>{title}</b>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  function renderMatchday() {
    return (
      <>
        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>Матч-день</h2>
              <p>Система сама предлагает стартовый состав с учетом позиции, рейтинга и травм.</p>
            </div>
            <button className="softButton" onClick={() => notify("Состав обновлен с учетом травм и формы")}>Предложить состав</button>
          </div>
          <div className="lineupGrid">
            {lineup.starters.map((slot) => (
              <div className="lineupCard" key={slot.role}>
                <span>{slot.role}</span>
                {slot.player ? (
                  <>
                    <b>{fullName(slot.player)}</b>
                    <p>Рейтинг {calculateRating(slot.player)} · {slot.player.careStatus}</p>
                  </>
                ) : (
                  <b>Нет игрока</b>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Запасные и недоступные</h2>
          <div className="twoColumns">
            <div>
              <h3>Запасные</h3>
              {lineup.bench.map((player) => <div className="miniList" key={player.id}>{fullName(player)} <span>{calculateRating(player)}</span></div>)}
            </div>
            <div>
              <h3>Не в старте</h3>
              {players.filter(isUnavailable).map((player) => <div className="miniList dangerText" key={player.id}>{fullName(player)} <span>{player.recoveryDate || "травма"}</span></div>)}
            </div>
          </div>
        </section>
      </>
    );
  }

  function renderInjuries() {
    return (
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <h2>Мониторинг травм</h2>
            <p>Тренер видит, кто не готов к матчу, и система не ставит таких игроков в старт.</p>
          </div>
        </div>
        <div className="injuryGrid">
          {injuryPlayers.map((player) => (
            <div className="injuryCard" key={player.id}>
              <b>{fullName(player)}</b>
              <span>{player.careStatus}</span>
              <p>{player.injuryNote || "Комментарий не указан"}</p>
              <em>{player.recoveryDate || "срок не указан"}</em>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderPlayerDevelopment() {
    const player = selectedPlayer;
    const passQuality = Math.min(99, Math.max(1, Math.round(player.passing * 0.55 + player.accuratePasses * 1.8 - player.mistakes * 2)));
    const attackQuality = Math.min(99, Math.max(1, Math.round(player.shooting * 0.55 + player.goals * 8 + player.assists * 4)));
    const defenseQuality = Math.min(99, Math.max(1, Math.round(player.defense * 0.6 + player.tackles * 4 - player.mistakes * 1.5)));
    const improvementPlan = [
      {
        title: "Точность решений",
        value: passQuality,
        text: player.mistakes > 3
          ? "Снизить количество ошибок под давлением: играть проще, быстрее открываться и чаще отдавать короткий пас."
          : "Продолжать сохранять стабильность в передачах и принимать решения быстрее.",
      },
      {
        title: "Профиль позиции",
        value: player.position === "Защитник" ? defenseQuality : player.position === "Нападающий" ? attackQuality : passQuality,
        text: player.position === "Защитник"
          ? "Усилить игру один в один и первый пас после отбора."
          : player.position === "Нападающий"
          ? "Работать над завершением атак и открыванием за спину защитникам."
          : "Развивать контроль мяча, диагональные передачи и переход из обороны в атаку.",
      },
      {
        title: "Физическая готовность",
        value: player.physical,
        text: isLimited(player)
          ? "Нагрузка должна быть умеренной: лучше короткие игровые отрезки и восстановительные упражнения."
          : "Добавить ускорения 10–20 метров, координацию и работу на выносливость.",
      },
    ];

    return (
      <>
        <section className="playerPremiumHero panel">
          <div>
            <span className="eyebrow">Личный кабинет игрока</span>
            <h2>{fullName(player)}</h2>
            <p>
              Здесь собраны личные рекомендации, показатели, тепловая карта перемещений,
              тренировки, турниры и история прогресса.
            </p>
            <div className="badgeRow">
              <span className="pill">Позиция: {player.position}</span>
              <span className={isUnavailable(player) ? "pill danger" : "pill success"}>{player.careStatus}</span>
              <span className="pill">Рейтинг: {calculateRating(player)}</span>
            </div>
          </div>
          {renderPlayerCard(player)}
        </section>

        <section className="playerFocusGrid">
          <div className="panel">
            <h2>Что необходимо улучшить</h2>
            <p>Система анализирует показатели игрока и дает понятный план развития.</p>
            <div className="improvementList">
              {improvementPlan.map((item) => (
                <div key={item.title}>
                  <div className="improvementTop">
                    <b>{item.title}</b>
                    <span>{item.value}/99</span>
                  </div>
                  <em style={{ width: `${item.value}%` }} />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2>Показатели игрока</h2>
            <div className="premiumMetrics">
              <div><b>{player.goals}</b><span>Голы</span></div>
              <div><b>{player.assists}</b><span>Передачи</span></div>
              <div><b>{player.tackles}</b><span>Отборы</span></div>
              <div><b>{player.accuratePasses}</b><span>Точные пасы</span></div>
              <div><b>{player.mistakes}</b><span>Ошибки</span></div>
              <div><b>{cardOverall(player)}</b><span>Общий уровень</span></div>
            </div>
          </div>
        </section>

        <section className="playerFocusGrid">
          <div className="panel">
            <div className="sectionHeader">
              <div>
                <h2>Диаграмма навыков</h2>
                <p>
                  Диаграмма показывает профиль игрока: скорость, удар, пас, отбор, техника и физика.
                </p>
              </div>
              <span className="skillBadge">Skills</span>
            </div>

            <div className="radarWrap">
              <svg className="radarChart" viewBox="0 0 360 360">
                <polygon className="radarGrid grid5" points="180,40 301,110 301,250 180,320 59,250 59,110" />
                <polygon className="radarGrid grid4" points="180,68 277,124 277,236 180,292 83,236 83,124" />
                <polygon className="radarGrid grid3" points="180,96 253,138 253,222 180,264 107,222 107,138" />
                <polygon className="radarGrid grid2" points="180,124 229,152 229,208 180,236 131,208 131,152" />
                <polygon className="radarGrid grid1" points="180,152 204,166 204,194 180,208 156,194 156,166" />

                <line className="radarAxis" x1="180" y1="180" x2="180" y2="40" />
                <line className="radarAxis" x1="180" y1="180" x2="301" y2="110" />
                <line className="radarAxis" x1="180" y1="180" x2="301" y2="250" />
                <line className="radarAxis" x1="180" y1="180" x2="180" y2="320" />
                <line className="radarAxis" x1="180" y1="180" x2="59" y2="250" />
                <line className="radarAxis" x1="180" y1="180" x2="59" y2="110" />

                <polygon
                  className="radarValue"
                  points={`
                    180,${180 - player.speed * 1.4}
                    ${180 + player.shooting * 1.21},${180 - player.shooting * 0.7}
                    ${180 + player.passing * 1.21},${180 + player.passing * 0.7}
                    180,${180 + player.physical * 1.4}
                    ${180 - player.defense * 1.21},${180 + player.defense * 0.7}
                    ${180 - player.technique * 1.21},${180 - player.technique * 0.7}
                  `}
                />

                {[
                  [180, 24, "СКР"],
                  [318, 102, "УДР"],
                  [318, 266, "ПАС"],
                  [180, 344, "ФИЗ"],
                  [42, 266, "ОТБ"],
                  [42, 102, "ТЕХ"],
                ].map(([x, y, label]) => (
                  <text key={label} className="radarLabel" x={x} y={y}>
                    {label}
                  </text>
                ))}
              </svg>

              <div className="radarLegend">
                <div><b>{player.speed}</b><span>Скорость</span></div>
                <div><b>{player.shooting}</b><span>Удар</span></div>
                <div><b>{player.passing}</b><span>Пас</span></div>
                <div><b>{player.defense}</b><span>Отбор</span></div>
                <div><b>{player.technique}</b><span>Техника</span></div>
                <div><b>{player.physical}</b><span>Физика</span></div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Рекомендация системы</h2>
            <div className="coachAdvice">
              <b>{getRecommendation(player)}</b>
              <p>
                Рекомендация строится на позиции, рейтинге, статистике, ошибках,
                физической готовности и статусе игрока.
              </p>
            </div>
            <button className="mainButton" onClick={makeReport}>Скачать личный отчет</button>
          </div>
        </section>
      </>
    );
  }

  function renderPlayerSchedule() {
    const trainings = [
      { day: "Понедельник", time: "15:00", title: "Пас и открывания", focus: "точность передач + движение без мяча" },
      { day: "Среда", time: "16:00", title: "Игра в малых группах", focus: "решения под давлением" },
      { day: "Пятница", time: "15:30", title: "Тактика перед матчем", focus: "позиция, стандартные положения" },
    ];

    const upcoming = [
      { date: "22 мая", title: "Школьный кубок Малояза", status: "групповой этап" },
      { date: "25 мая", title: "Матч 9А — 8А", status: "запланирован" },
      { date: "30 мая", title: "Финальный показ проекта", status: "QR-демо" },
    ];

    return (
      <>
        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>Расписание тренировок</h2>
              <p>Игрок видит ближайшие занятия, цель тренировки и фокус для развития.</p>
            </div>
          </div>

          <div className="scheduleGrid">
            {trainings.map((item) => (
              <div className="scheduleCard" key={item.day}>
                <span>{item.day}</span>
                <b>{item.time}</b>
                <strong>{item.title}</strong>
                <p>{item.focus}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Предстоящие турниры и события</h2>
          <div className="eventList">
            {upcoming.map((item) => (
              <div key={item.title}>
                <b>{item.date}</b>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  function renderPlayerHistory() {
    const history = [
      { match: "9А — 9Б", result: "3:2", rating: selectedPlayer.progress?.[0] || 0, note: "старт сезона" },
      { match: "8А — 8Б", result: "2:0", rating: selectedPlayer.progress?.[1] || 0, note: "рост активности" },
      { match: "9А — 8А", result: "скоро", rating: selectedPlayer.progress?.[2] || 0, note: "подготовка" },
      { match: "Тренировочная игра", result: "5:4", rating: selectedPlayer.progress?.[3] || 0, note: "улучшение паса" },
      { match: "Контрольный матч", result: "1:1", rating: selectedPlayer.progress?.[4] || 0, note: "текущий уровень" },
    ];

    return (
      <>
        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>История и прогресс</h2>
              <p>Игрок видит не только текущий рейтинг, но и динамику развития.</p>
            </div>
          </div>
          {renderProgress(selectedPlayer)}
        </section>

        <section className="panel">
          <h2>История матчей</h2>
          <div className="historyTable">
            {history.map((item, index) => (
              <div key={item.match}>
                <span>#{index + 1}</span>
                <b>{item.match}</b>
                <strong>{item.result}</strong>
                <em>{item.rating} рейтинг</em>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  function renderRating() {
    return (
      <section className="panel">
        <h2>Рейтинг игроков</h2>
        <div className="formula">Рейтинг = голы × 10 + передачи × 7 + отборы × 4 + точные пасы × 2 − ошибки × 3</div>
        {rankedPlayers.map((player, index) => (
          <div className="ratingRow" key={player.id}>
            <strong>{index + 1}</strong>
            <div>
              <b>{fullName(player)}</b>
              <span>{player.position} · {player.careStatus}</span>
            </div>
            <em>{calculateRating(player)}</em>
          </div>
        ))}
      </section>
    );
  }

  function renderChat() {
    const currentPlayerName = role === "coach" ? fullName(selectedChatPlayer) : "Тамирлан Баймурзин";
    const visibleMessages = chatMessages.filter((message) =>
      (message.from === "Тренер" && message.to === currentPlayerName) ||
      (message.from === currentPlayerName && message.to === "Тренер")
    );

    return (
      <section className="panel messengerPanel">
        <div className="sectionHeader">
          <div>
            <h2>Чат</h2>
            <p>Мессенджер для тренировок, матчей и обратной связи.</p>
          </div>
          <span className="online">Online</span>
        </div>

        <div className="messenger">
          <div className="dialogs">
            {role === "coach" ? players.map((player) => (
              <button key={player.id} className={selectedChatId === player.id ? "dialog active" : "dialog"} onClick={() => setSelectedChatId(player.id)}>
                <div className="miniAvatar">{player.photo ? <img src={player.photo} alt={fullName(player)} /> : initials(player)}</div>
                <div><b>{fullName(player)}</b><span>{player.position}</span></div>
              </button>
            )) : (
              <button className="dialog active"><div className="miniAvatar">Т</div><div><b>Тренер</b><span>Команда</span></div></button>
            )}
          </div>
          <div className="chatWindow">
            <div className="chatHeader"><b>{role === "coach" ? fullName(selectedChatPlayer) : "Тренер"}</b><span>организационная связь</span></div>
            <div className="messages">
              {visibleMessages.map((message) => {
                const mine = role === "coach" ? message.from === "Тренер" : message.from !== "Тренер";
                return <div key={message.id} className={mine ? "bubble mine" : "bubble"}><p>{message.text}</p><span>{message.time} · {message.status}</span></div>;
              })}
            </div>
            <div className="quickReplies">
              {(role === "coach"
                ? [
                    "Завтра тренировка в 15:00. Не забудь форму и воду.",
                    "Матч в пятницу. Сбор у школы за 30 минут до начала.",
                    "Напиши, готов ли ты к тренировке сегодня.",
                    "Сегодня работаем над пасом, отбором и открываниями.",
                  ]
                : [
                    "Буду на тренировке.",
                    "Можно уточнить время?",
                    "Форму и воду возьму.",
                    "Сегодня готов к обычной нагрузке.",
                    "Можно получить индивидуальное задание?",
                  ]
              ).map((text) => (
                <button key={text} onClick={() => setChatDraft(text)}>
                  {role === "coach" ? text.split(".")[0] : text}
                </button>
              ))}
            </div>
            <div className="composer">
              <input value={chatDraft} onChange={(e) => setChatDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Написать сообщение..." />
              <button onClick={sendMessage}>➤</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderTournament() {
    return (
      <>
        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>Школьный турнир</h2>
              <p>Таблица, матчи, MVP и QR-доступ для зрителей.</p>
            </div>
            {(role === "organizer" || role === "spectator") && <button className="softButton" onClick={exportTournament}>Скачать таблицу</button>}
          </div>

          {tournamentTeams.map((team, index) => (
            <div className="teamRow" key={team.name}>
              <strong>{index + 1}</strong>
              <div><b>{team.name}</b><span>Тренер: {team.coach}</span></div>
              <em>{team.points} очков</em>
            </div>
          ))}
        </section>

        <section className="panel">
          <h2>Матчи и лучшие игроки</h2>
          <div className="matchGrid">
            {matches.map((match) => <div key={match.id} className="matchCard"><b>{match.title}</b><span>{match.score}</span><p>{match.status}</p></div>)}
          </div>
          <div className="mvpBox">
            <b>MVP турнира</b>
            <span>{fullName(rankedPlayers[0])} · рейтинг {calculateRating(rankedPlayers[0])}</span>
          </div>
        </section>
      </>
    );
  }

  function renderRequests() {
    return (
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <h2>Заявки игроков</h2>
            <p>Игрок вводит код команды, а тренер принимает или отклоняет заявку.</p>
          </div>
        </div>

        {playerRequests.length === 0 && (
          <div className="notice">Новых заявок игроков пока нет.</div>
        )}

        {playerRequests.map((request) => (
          <div className="requestCard" key={request.id}>
            <b>{request.firstName} {request.lastName}</b>
            <p>{request.school} · {request.city}</p>
            <span>Код команды: {request.teamCode}</span>
            <div className="actionRow">
              <button className="softButton dark" onClick={() => acceptPlayerRequest(request)}>
                Принять
              </button>
              <button className="softButton" onClick={() => {
                setPlayerRequests((prev) => prev.filter((item) => item.id !== request.id));
                notify("Заявка игрока отклонена");
              }}>
                Отклонить
              </button>
            </div>
          </div>
        ))}
      </section>
    );
  }

  function renderTeams() {
    return (
      <>
        <section className="panel">
          <h2>Заявки команд в турнир</h2>
          {teamRequests.length === 0 && <p>Новых заявок нет.</p>}
          {teamRequests.map((request) => (
            <div className="requestCard" key={request.id}>
              <b>{request.teamName}</b>
              <p>Тренер: {request.coachName}</p>
              <span>{request.tournamentCode}</span>
              <div className="actionRow">
                <button className="softButton dark" onClick={() => acceptTeamRequest(request)}>Принять</button>
                <button className="softButton" onClick={() => setTeamRequests((prev) => prev.filter((item) => item.id !== request.id))}>Отклонить</button>
              </div>
            </div>
          ))}
        </section>

        <section className="panel">
          <h2>Заявки игроков</h2>
          {playerRequests.map((request) => (
            <div className="requestCard" key={request.id}>
              <b>{request.firstName} {request.lastName}</b>
              <p>{request.school} · {request.city}</p>
              <span>Код команды: {request.teamCode}</span>
              <button className="softButton dark" onClick={() => acceptPlayerRequest(request)}>Принять игрока</button>
            </div>
          ))}
        </section>
      </>
    );
  }

  function renderVideo() {
    const steps = [
      ["Идея", "В перспективе организатор загружает видео матча"],
      ["AI-модуль", "Будущая система распознает игровые действия"],
      ["Проверка", "Организатор проверяет и исправляет спорные моменты"],
      ["Рейтинг", "Только подтвержденные данные попадают в паспорт игрока"],
    ];

    return (
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <span className="aiPerspectiveBadge">Перспектива разработки</span>
            <h2>AI Video Analysis</h2>
            <p>
              Важно: в текущей версии FootAssist этот модуль не выполняет реальное
              автоматическое распознавание видео. Сейчас показан только демонстрационный
              сценарий того, как AI-анализ может работать в будущем.
            </p>
          </div>
          <button className="softButton dark" onClick={startVideoAnalysis}>
            Показать демо-сценарий
          </button>
        </div>

        <div className="aiWarningBox">
          <b>Статус модуля: в разработке</b>
          <p>
            На данный момент AI Video Analysis является перспективой проекта.
            В прототипе он имитирует этапы будущей функции: загрузка видео,
            предварительный отчет, проверка организатором и добавление данных в рейтинг.
          </p>
        </div>

        <div className="aiSteps">
          {steps.map((step, index) => (
            <div key={step[0]} className={videoStatus !== "idle" && index <= (videoStatus === "analyzing" ? 1 : 3) ? "active" : ""}>
              <b>{index + 1}</b><span>{step[0]}</span><p>{step[1]}</p>
            </div>
          ))}
        </div>

        {videoStatus === "analyzing" && (
          <div className="notice">
            Демо: приложение показывает, как в будущем мог бы формироваться предварительный отчет.
            Реального распознавания видео в этой версии нет.
          </div>
        )}

        {(videoStatus === "ready" || videoStatus === "confirmed") && (
          <div className="reportBox">
            <h3>Демонстрационный предварительный отчет</h3>
            <p>
              Эти данные используются только для демонстрации логики. В реальной версии
              они должны формироваться AI-модулем и обязательно проверяться организатором.
            </p>
            {demoVideoStats.map((row) => {
              const player = players.find((item) => item.id === row.id);
              return <div className="miniList" key={row.id}>{fullName(player)} <span>демо +{(row.goals || 0) * 10 + (row.assists || 0) * 7 + (row.tackles || 0) * 4}</span></div>;
            })}
            {videoStatus === "ready" ? (
              <button className="mainButton" onClick={confirmVideoStats}>
                Подтвердить демо-данные
              </button>
            ) : (
              <div className="success">
                Демо-данные подтверждены. В реальном продукте этот шаг выполняет организатор после проверки видео.
              </div>
            )}
          </div>
        )}
      </section>
    );
  }

  function renderResearch() {
    return (
      <>
        <section className="testingHero panel">
          <div>
            <span className="eyebrow">Проверка идеи</span>
            <h2>Тестирование превращает прототип в доказанный проект</h2>
            <p>
              Этот раздел нужен для защиты: здесь собран план пилота, метрики и текущие
              демо-результаты. После настоящего опроса цифры можно заменить на фактические.
            </p>
          </div>
          <div className="testingScore">
            <b>Ready</b>
            <span>структура проверки готова</span>
          </div>
        </section>

        <section className="panel">
          <div className="sectionHeader">
            <div>
              <h2>План пилотного теста</h2>
              <p>Короткий чек-лист, чтобы быстро собрать доказательства пользы.</p>
            </div>
          </div>
          <div className="testingChecklist">
            {testingChecklist.map(([title, text], index) => (
              <div key={title}>
                <b>{index + 1}</b>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Целевые метрики пилота</h2>
          <div className="pilotMetrics">
            {pilotMetrics.map(([value, label]) => (
              <div key={label}>
                <b>{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Демо-результаты опроса</h2>
          <p>
            Это демонстрационный пример визуализации. Для финальной защиты лучше заменить
            его реальными ответами учеников, тренеров и родителей.
          </p>
          <div className="surveyBars">
            {surveyResults.map((item) => (
              <div key={item.label}>
                <div><b>{item.label}</b><span>{item.value}%</span></div>
                <em style={{ width: `${item.value}%` }} />
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h2>Перспектива развития</h2>
          <p>
            Сейчас FootAssist представлен как конкурсный прототип. Финансовая модель рассматривается
            только как возможное направление развития после внедрения в школах и секциях.
          </p>
          <div className="moneyGrid">
            <div><b>0 ₽</b><span>бесплатный школьный доступ</span></div>
            <div><b>49 ₽</b><span>возможный расширенный отчет</span></div>
            <div><b>99 ₽/мес</b><span>перспективная версия для команды</span></div>
            <div><b>299 ₽/мес</b><span>перспектива для секции</span></div>
            <div><b>300–500 ₽</b><span>возможное сопровождение турнира</span></div>
            <div><b>от 300 ₽</b><span>партнерство с местным бизнесом</span></div>
          </div>
        </section>

        <section className="panel">
          <h2>Перспективы</h2>
          <div className="demoSteps">
            {["База данных и реальные аккаунты", "Графики прогресса по сезонам", "Экспорт PDF-отчетов", "Видеоанализ на компьютерном зрении", "Режим зрителя для родителей и школы"].map((item, index) => <div key={item}><b>{index + 1}</b><span>{item}</span></div>)}
          </div>
        </section>
      </>
    );
  }

  function renderSafety() {
    return (
      <>
        <section className="panel">
          <h2>Безопасность и честность</h2>
          <div className="safetyGrid">
            <div><b>Роли доступа</b><span>игрок, тренер, организатор и зритель видят разные данные</span></div>
            <div><b>Честная статистика</b><span>официальные показатели подтверждает тренер или организатор</span></div>
            <div><b>Школьный чат</b><span>только организационные сообщения, тренировки, матчи и обратная связь</span></div>
            <div><b>Персональные данные</b><span>точный адрес не обязателен, демо не использует реальные данные</span></div>
          </div>
        </section>

        <section className="panel">
          <h2>Как защищаем рейтинг от накрутки</h2>
          <div className="dataFlow">
            {[
              ["Матч", "игроки участвуют в игре, данные не меняют самостоятельно"],
              ["Ввод", "тренер или организатор заносит статистику после матча"],
              ["Проверка", "спорные показатели подтверждаются перед публикацией"],
              ["Рейтинг", "в паспорт попадают только подтвержденные данные"],
            ].map((step, index) => (
              <div key={step[0]}>
                <b>{index + 1}</b>
                <strong>{step[0]}</strong>
                <span>{step[1]}</span>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  function renderDemo() {
    return (
      <section className="panel">
        <h2>QR и демо-показ</h2>
        <div className="demoBig">
          <div className="realQrBox">
            {qrSrc ? <img src={qrSrc} alt="QR-код для открытия FootAssist" /> : <div className="fakeQr big">QR</div>}
          </div>
          <div>
            <h3>Прототип открыт по ссылке</h3>
            <p>FootAssist работает как веб-приложение: без установки, через браузер, с телефона или компьютера.</p>
            <a className="formula demoLink" href={PROJECT_URL} target="_blank" rel="noreferrer">{PROJECT_URL}</a>
            <div className="actionRow">
              <button className="softButton dark" onClick={() => setActiveTab("jury")}>Открыть маршрут жюри</button>
              <button className="softButton" onClick={resetDemoData}>Сбросить демо</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderContent() {
    if (activeTab === "dashboard") return renderDashboard();
    if (activeTab === "jury") return renderJury();
    if (activeTab === "players") return renderPlayerPanel();
    if (activeTab === "requests") return renderRequests();
    if (activeTab === "development") return renderPlayerDevelopment();
    if (activeTab === "schedule") return renderPlayerSchedule();
    if (activeTab === "progress") return role === "player" ? renderPlayerHistory() : <section className="panel">{renderProgress(selectedPlayer)}</section>;
    if (activeTab === "matchday") return renderMatchday();
    if (activeTab === "injuries") return renderInjuries();
    if (activeTab === "rating") return renderRating();
    if (activeTab === "chat") return renderChat();
    if (activeTab === "tournament") return renderTournament();
    if (activeTab === "teams") return renderTeams();
    if (activeTab === "stats") return renderPlayerPanel();
    if (activeTab === "video") return renderVideo();
    if (activeTab === "research") return renderResearch();
    if (activeTab === "safety") return renderSafety();
    if (activeTab === "demo") return renderDemo();
    return renderDashboard();
  }

  if (screen === "auth") {
    return (
      <main className="authPage">
        <section className="authCard">
          <span className="eyebrow">QR ACCESS · MALOYAZ</span>
          <h1>FootAssist</h1>
          <p>Цифровая платформа для школьного футбола: рейтинг, прогресс, состав, травмы, турнир и чат.</p>
          <div className="loginGrid">
            <button onClick={() => loginAs("player")}>Войти как игрок</button>
            <button onClick={() => loginAs("coach")}>Демо тренера</button>
            <button onClick={() => loginAs("organizer")}>Демо организатора</button>
            <button onClick={() => loginAs("spectator")}>Режим зрителя</button>
            <button onClick={() => loginAs("organizer", "jury")}>Режим жюри</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="appShell">
      {toast && <div className="toast">{toast}</div>}

      <aside className="sideBar">
        <div className="brand">
          <b>FootAssist</b>
          <span>{ROLE_LABELS[role]}</span>
        </div>
        <nav>
          {tabs.map(([id, label]) => (
            <button key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="logout" onClick={() => setScreen("auth")}>Выйти</button>
      </aside>

      <section className="mainArea">
        <header className="topBar">
          <div>
            <span className="eyebrow">Башкирская гимназия · село Малояз</span>
            <h1>{tabs.find(([id]) => id === activeTab)?.[1] || "FootAssist"}</h1>
          </div>
          <div className="topStatus">
            {role === "player" ? (
              <>
                <span>Мой рейтинг: {calculateRating(selectedPlayer)}</span>
                <span>Статус: {selectedPlayer.careStatus}</span>
                <span>{selectedPlayer.team}</span>
              </>
            ) : role === "coach" ? (
              <>
                <span>{players.length} игроков</span>
                <span>{injuryPlayers.length} травм/ограничений</span>
                <span>Код команды: MALOYAZ-9A</span>
              </>
            ) : role === "organizer" ? (
              <>
                <span>{tournamentTeams.length} команд</span>
                <span>{teamRequests.length} заявок</span>
                <span>Код турнира: CUP-MALOYAZ-2026</span>
              </>
            ) : (
              <>
                <span>{tournamentTeams.length} команд</span>
                <span>{matches.length} матчей</span>
                <span>Режим зрителя</span>
              </>
            )}
          </div>
        </header>

        <div className="contentGrid">
          {renderContent()}
        </div>
      </section>
    </main>
  );
}

export default App;
