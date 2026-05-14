import { useMemo, useState } from "react";
import "./App.css";

const initialPlayerRequests = [
  {
    id: 1,
    firstName: "Артур",
    lastName: "Хасанов",
    age: "15",
    school: "Башкирская гимназия села Малояз",
    city: "село Малояз",
    teamCode: "MALOYAZ-9A",
    status: "Ожидает",
  },
];

const initialTeamRequests = [
  {
    id: 5001,
    teamName: "9Б Малояз",
    coachName: "Ильнур Ганиев",
    school: "Башкирская гимназия села Малояз",
    tournamentCode: "CUP-MALOYAZ-2026",
    status: "Ожидает",
  },
];

const initialPlayers = [
  {
    id: 101,
    firstName: "Амир",
    lastName: "Сафин",
    age: "15",
    grade: "9А",
    team: "9А Малояз",
    position: "Нападающий",
    careStatus: "Основной состав",
    injuryNote: "",
    goals: 4,
    assists: 2,
    tackles: 3,
    accuratePasses: 18,
    mistakes: 2,
  },
  {
    id: 102,
    firstName: "Тимур",
    lastName: "Ганиев",
    age: "15",
    grade: "9А",
    team: "9А Малояз",
    position: "Полузащитник",
    careStatus: "Основной состав",
    injuryNote: "",
    goals: 2,
    assists: 4,
    tackles: 5,
    accuratePasses: 20,
    mistakes: 4,
  },
  {
    id: 103,
    firstName: "Руслан",
    lastName: "Каримов",
    age: "14",
    grade: "8А",
    team: "8А Малояз",
    position: "Защитник",
    careStatus: "Запасной",
    injuryNote: "",
    goals: 0,
    assists: 1,
    tackles: 9,
    accuratePasses: 14,
    mistakes: 3,
  },
  {
    id: 104,
    firstName: "Даниил",
    lastName: "Иванов",
    age: "14",
    grade: "8Б",
    team: "8Б Малояз",
    position: "Полузащитник",
    careStatus: "Новичок",
    injuryNote: "",
    goals: 1,
    assists: 3,
    tackles: 4,
    accuratePasses: 22,
    mistakes: 5,
  },
  {
    id: 105,
    firstName: "Ильдар",
    lastName: "Юсупов",
    age: "15",
    grade: "9А",
    team: "9А Малояз",
    position: "Вратарь",
    careStatus: "Основной состав",
    injuryNote: "",
    goals: 0,
    assists: 0,
    tackles: 2,
    accuratePasses: 8,
    mistakes: 1,
  },
];

const initialTournamentTeams = [
  { name: "9А Малояз", shortName: "9А", coach: "Демо Тренер", games: 3, wins: 2, draws: 1, losses: 0, points: 7, status: "Принята" },
  { name: "9Б Малояз", shortName: "9Б", coach: "Ильнур Ганиев", games: 3, wins: 2, draws: 0, losses: 1, points: 6, status: "Принята" },
  { name: "8А Малояз", shortName: "8А", coach: "Руслан Каримов", games: 3, wins: 1, draws: 1, losses: 1, points: 4, status: "Принята" },
  { name: "8Б Малояз", shortName: "8Б", coach: "Андрей Иванов", games: 3, wins: 0, draws: 0, losses: 3, points: 0, status: "Принята" },
];

const matches = [
  { id: 1, title: "9А Малояз — 9Б Малояз", score: "3:2", status: "Завершен" },
  { id: 2, title: "8А Малояз — 8Б Малояз", score: "2:0", status: "Завершен" },
  { id: 3, title: "9А Малояз — 8А Малояз", score: "Скоро", status: "Запланирован" },
];

const playerPositions = [
  "Вратарь",
  "Защитник",
  "Полузащитник",
  "Нападающий",
  "Универсал",
  "Не выбрана",
];

const playerStatusOptions = [
  "Основной состав",
  "Запасной",
  "Новичок",
  "На травме",
  "Восстановление",
];

const videoDemoStats = [
  {
    id: 101,
    firstName: "Амир",
    lastName: "Сафин",
    goals: 1,
    assists: 1,
    tackles: 0,
    accuratePasses: 6,
    mistakes: 1,
  },
  {
    id: 102,
    firstName: "Тимур",
    lastName: "Ганиев",
    goals: 0,
    assists: 2,
    tackles: 2,
    accuratePasses: 8,
    mistakes: 1,
  },
  {
    id: 103,
    firstName: "Руслан",
    lastName: "Каримов",
    goals: 0,
    assists: 0,
    tackles: 3,
    accuratePasses: 4,
    mistakes: 0,
  },
];

const initialActivityLog = [
  "Создан турнир CUP-MALOYAZ-2026",
  "Добавлена команда 9А Малояз",
  "Система рассчитала стартовый рейтинг игроков",
];

const initialChatMessages = [
  {
    id: 1,
    from: "Тренер",
    to: "Амир Сафин",
    text: "Сегодня тренируем завершение атак и игру в пас.",
  },
  {
    id: 2,
    from: "Амир Сафин",
    to: "Тренер",
    text: "Понял, буду готов к тренировке.",
  },
];

function calculateRating(player) {
  return (
    player.goals * 10 +
    player.assists * 7 +
    player.tackles * 4 +
    player.accuratePasses * 2 -
    player.mistakes * 3
  );
}

function getRecommendation(player) {
  if (player.goals >= 3) {
    return "Сильная сторона: атака. Рекомендация тренеру: использовать ближе к воротам соперника.";
  }

  if (player.assists >= 3 || player.accuratePasses >= 20) {
    return "Сильная сторона: игра в пас. Рекомендация тренеру: использовать в центре поля.";
  }

  if (player.tackles >= 7) {
    return "Сильная сторона: отбор мяча. Рекомендация тренеру: использовать в защите.";
  }

  if (player.mistakes >= 5) {
    return "Зона роста: снизить количество ошибок под давлением.";
  }

  return "Игрок сбалансирован. Рекомендация: развивать точность передач и командное взаимодействие.";
}

function roleTitle(role) {
  if (role === "organizer") return "Организатор";
  if (role === "coach") return "Тренер";
  return "Игрок";
}

function PlayerAvatar({ player, size = "small" }) {
  const initials = `${player.firstName?.[0] || ""}${player.lastName?.[0] || ""}`;
  const className = size === "large" ? "avatar avatarLarge" : "avatar";

  if (player.photoUrl) {
    return <img className={className} src={player.photoUrl} alt={`${player.firstName} ${player.lastName}`} />;
  }

  return <div className={className}>{initials}</div>;
}

function App() {
  const [screen, setScreen] = useState("auth");
  const [mode, setMode] = useState("login");
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);

  const [playerRequests, setPlayerRequests] = useState(initialPlayerRequests);
  const [teamRequests, setTeamRequests] = useState(initialTeamRequests);
  const [teamPlayers, setTeamPlayers] = useState(initialPlayers);
  const [tournamentTeams, setTournamentTeams] = useState(initialTournamentTeams);

  const [selectedPlayer, setSelectedPlayer] = useState(initialPlayers[0]);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [videoFileName, setVideoFileName] = useState("");
  const [tournamentCodeInput, setTournamentCodeInput] = useState("CUP-MALOYAZ-2026");
  const [playerSearch, setPlayerSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("Все");
  const [activityLog, setActivityLog] = useState(initialActivityLog);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [chatDraft, setChatDraft] = useState("");
  const [selectedChatPlayerId, setSelectedChatPlayerId] = useState(initialPlayers[0].id);
  const [reportReady, setReportReady] = useState(false);
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
  const [manualPlayer, setManualPlayer] = useState({
    firstName: "",
    lastName: "",
    age: "15",
    grade: "9А",
    position: "Не выбрана",
    careStatus: "Новичок",
  });

  const [form, setForm] = useState({
    email: "player@mail.ru",
    password: "123456",
    role: "Игрок",
    firstName: "Тамирлан",
    lastName: "Баймурзин",
    age: "15",
    country: "Россия",
    region: "Республика Башкортостан",
    district: "Салаватский район",
    city: "село Малояз",
    street: "",
    school: "Башкирская гимназия села Малояз",
    teamCode: "MALOYAZ-9A",
  });

  const rankedPlayers = useMemo(() => {
    return [...teamPlayers].sort(
      (a, b) => calculateRating(b) - calculateRating(a)
    );
  }, [teamPlayers]);

  const filteredPlayers = useMemo(() => {
    const search = playerSearch.trim().toLowerCase();

    return teamPlayers.filter((player) => {
      const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
      const matchesSearch = !search || fullName.includes(search);
      const matchesPosition =
        positionFilter === "Все" || player.position === positionFilter;

      return matchesSearch && matchesPosition;
    });
  }, [teamPlayers, playerSearch, positionFilter]);

  const dashboardStats = useMemo(() => {
    const injuredCount = teamPlayers.filter((player) =>
      ["На травме", "Восстановление"].includes(player.careStatus)
    ).length;

    return {
      players: teamPlayers.length,
      teams: tournamentTeams.length,
      playerRequests: playerRequests.length,
      teamRequests: teamRequests.length,
      bestRating: rankedPlayers[0] ? calculateRating(rankedPlayers[0]) : 0,
      injured: injuredCount,
    };
  }, [teamPlayers, tournamentTeams, playerRequests, teamRequests, rankedPlayers]);

  const recommendedLineup = useMemo(() => {
    const bestByPosition = (position) =>
      rankedPlayers.find((player) => player.position === position) ||
      rankedPlayers[0];

    return {
      goalkeeper: bestByPosition("Вратарь"),
      defender: bestByPosition("Защитник"),
      midfielder: bestByPosition("Полузащитник"),
      forward: bestByPosition("Нападающий"),
    };
  }, [rankedPlayers]);

  const selectedChatPlayer =
    teamPlayers.find((player) => player.id === Number(selectedChatPlayerId)) ||
    teamPlayers[0];

  const navItems = useMemo(() => {
    if (!user) return [];

    if (user.role === "organizer") {
      return [
        { id: "profile", label: "Профиль" },
        { id: "teams", label: "Команды" },
        { id: "stats", label: "Статистика" },
        { id: "rating", label: "Рейтинг" },
        { id: "video", label: "Видео" },
        { id: "log", label: "Журнал" },
        { id: "tournament", label: "Турнир" },
      ];
    }

    if (user.role === "coach") {
      return [
        { id: "profile", label: "Профиль" },
        { id: "players", label: "Игроки" },
        { id: "rating", label: "Рейтинг" },
        { id: "requests", label: "Заявки" },
        { id: "chat", label: "Чат" },
        { id: "joinTournament", label: "Турнир" },
      ];
    }

    return [
      { id: "profile", label: "Профиль" },
      { id: "players", label: "Паспорт" },
      { id: "rating", label: "Рейтинг" },
      { id: "chat", label: "Чат" },
      { id: "tournament", label: "Турнир" },
    ];
  }, [user]);

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }

  function updateManualPlayer(key, value) {
    setManualPlayer({ ...manualPlayer, [key]: value });
  }

  function addManualPlayer() {
    const firstName = manualPlayer.firstName.trim();
    const lastName = manualPlayer.lastName.trim();

    if (!firstName || !lastName) {
      return;
    }

    const newPlayer = {
      id: Date.now(),
      firstName,
      lastName,
      age: manualPlayer.age || "15",
      grade: manualPlayer.grade || "Новый",
      team: user?.team || "9А Малояз",
      position: manualPlayer.position,
      careStatus: manualPlayer.careStatus,
      injuryNote: "",
      goals: 0,
      assists: 0,
      tackles: 0,
      accuratePasses: 0,
      mistakes: 0,
    };

    setTeamPlayers((prev) => [...prev, newPlayer]);
    setSelectedPlayer(newPlayer);
    setManualPlayer({
      firstName: "",
      lastName: "",
      age: "15",
      grade: "9А",
      position: "Не выбрана",
      careStatus: "Новичок",
    });
    setShowAddPlayerForm(false);
    appendLog(`Тренер вручную добавил игрока ${firstName} ${lastName}`);
  }

  function appendLog(message) {
    const time = new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setActivityLog((prev) => [`${time} — ${message}`, ...prev].slice(0, 12));
  }

  function formatPlayerName(player) {
    if (!player) return "Игрок";
    return `${player.firstName} ${player.lastName}`;
  }

  function getInitials(player) {
    if (!player) return "И";
    const first = player.firstName?.[0] || "";
    const last = player.lastName?.[0] || "";
    return `${first}${last}` || "И";
  }

  function login() {
    const demoUser = {
      firstName: "Тамирлан",
      lastName: "Баймурзин",
      role: "player",
      status: "Принят в команду",
      team: "9А Малояз",
      teamCode: "MALOYAZ-9A",
      tournamentCode: "CUP-MALOYAZ-2026",
    };

    setUser(demoUser);
    setSelectedPlayer(initialPlayers[0]);
    setActiveTab("profile");
    setScreen("main");
  }

  function demoCoachLogin() {
    const coach = {
      firstName: "Демо",
      lastName: "Тренер",
      role: "coach",
      status: "Тренер команды",
      team: "9А Малояз",
      teamCode: "MALOYAZ-9A",
      tournamentCode: "CUP-MALOYAZ-2026",
    };

    setUser(coach);
    setActiveTab("requests");
    setScreen("main");
  }

  function demoOrganizerLogin() {
    const organizer = {
      firstName: "Демо",
      lastName: "Организатор",
      role: "organizer",
      status: "Организатор соревнований",
      team: "Кубок школы FootAssist 2026",
      teamCode: "ORG-MALOYAZ",
      tournamentCode: "CUP-MALOYAZ-2026",
    };

    setUser(organizer);
    setActiveTab("teams");
    setScreen("main");
  }

  function register() {
    const normalizedRole =
      form.role === "Тренер"
        ? "coach"
        : form.role === "Организатор турнира"
        ? "organizer"
        : "player";

    const newUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      role: normalizedRole,
      age: form.age,
      school: form.school,
      city: form.city,
      teamCode: form.teamCode,
      tournamentCode: "CUP-MALOYAZ-2026",
      status:
        normalizedRole === "player" && form.teamCode
          ? "Заявка отправлена тренеру"
          : "Профиль создан",
      team:
        normalizedRole === "player" && form.teamCode
          ? "Ожидает подтверждения"
          : normalizedRole === "organizer"
          ? "Кубок школы FootAssist 2026"
          : "9А Малояз",
    };

    if (normalizedRole === "player" && form.teamCode) {
      const newRequest = {
        id: Date.now(),
        firstName: form.firstName,
        lastName: form.lastName,
        age: form.age,
        school: form.school,
        city: form.city,
        teamCode: form.teamCode,
        status: "Ожидает",
      };

      setPlayerRequests([newRequest, ...playerRequests]);
      setUser(newUser);
      setScreen("pending");
      return;
    }

    setUser(newUser);
    setActiveTab(normalizedRole === "organizer" ? "teams" : "profile");
    setScreen("main");
  }

  function acceptPlayerRequest(request) {
    const newPlayer = {
      id: Date.now(),
      firstName: request.firstName,
      lastName: request.lastName,
      age: request.age,
      grade: "Новый",
      team: "9А Малояз",
      position: "Не выбрана",
      careStatus: "Новичок",
      injuryNote: "",
      goals: 0,
      assists: 0,
      tackles: 0,
      accuratePasses: 0,
      mistakes: 0,
    };

    setTeamPlayers([...teamPlayers, newPlayer]);
    setPlayerRequests(playerRequests.filter((item) => item.id !== request.id));
    appendLog(`Тренер принял игрока ${request.firstName} ${request.lastName} в команду`);
  }

  function declinePlayerRequest(id) {
    setPlayerRequests(playerRequests.filter((item) => item.id !== id));
    appendLog("Тренер отклонил заявку игрока");
  }

  function sendTeamRequest() {
    const requestExists = teamRequests.some(
      (request) =>
        request.teamName === user.team &&
        request.tournamentCode === tournamentCodeInput
    );

    if (requestExists) return;

    const newRequest = {
      id: Date.now(),
      teamName: user.team,
      coachName: `${user.firstName} ${user.lastName}`,
      school: "Башкирская гимназия села Малояз",
      tournamentCode: tournamentCodeInput,
      status: "Ожидает",
    };

    setTeamRequests([newRequest, ...teamRequests]);
    appendLog(`Тренер отправил заявку команды ${user.team} в турнир`);
  }

  function acceptTeamRequest(request) {
    const alreadyInTournament = tournamentTeams.some(
      (team) => team.name === request.teamName
    );

    if (!alreadyInTournament) {
      const newTeam = {
        name: request.teamName,
        shortName: request.teamName.split(" ")[0],
        coach: request.coachName,
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        points: 0,
        status: "Принята",
      };

      setTournamentTeams([...tournamentTeams, newTeam]);
    }

    setTeamRequests(teamRequests.filter((item) => item.id !== request.id));
    appendLog(`Организатор принял команду ${request.teamName} в турнир`);
  }

  function declineTeamRequest(id) {
    setTeamRequests(teamRequests.filter((item) => item.id !== id));
    appendLog("Организатор отклонил заявку команды");
  }

  function updatePlayerStat(field, value) {
    const numberValue = Math.max(0, Number(value) || 0);

    const updatedPlayers = teamPlayers.map((player) => {
      if (player.id === selectedPlayer.id) {
        return {
          ...player,
          [field]: numberValue,
        };
      }

      return player;
    });

    const updatedSelectedPlayer = {
      ...selectedPlayer,
      [field]: numberValue,
    };

    setTeamPlayers(updatedPlayers);
    setSelectedPlayer(updatedSelectedPlayer);
    appendLog(`Организатор обновил статистику игрока ${formatPlayerName(selectedPlayer)}`);
  }

  function updateSelectedPlayerField(field, value) {
    const updatedPlayers = teamPlayers.map((player) => {
      if (player.id === selectedPlayer.id) {
        return {
          ...player,
          [field]: value,
        };
      }

      return player;
    });

    const updatedSelectedPlayer = {
      ...selectedPlayer,
      [field]: value,
    };

    setTeamPlayers(updatedPlayers);
    setSelectedPlayer(updatedSelectedPlayer);

    if (field === "position") {
      appendLog(`Тренер изменил позицию игрока ${formatPlayerName(selectedPlayer)} на ${value}`);
    }

    if (field === "careStatus") {
      appendLog(`Обновлен статус игрока ${formatPlayerName(selectedPlayer)}: ${value}`);
    }
  }

  function updatePlayerPosition(value) {
    updateSelectedPlayerField("position", value);
  }

  function updatePlayerPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const photoUrl = reader.result;

      const updatedPlayers = teamPlayers.map((player) => {
        if (player.id === selectedPlayer.id) {
          return {
            ...player,
            photoUrl,
          };
        }

        return player;
      });

      const updatedSelectedPlayer = {
        ...selectedPlayer,
        photoUrl,
      };

      setTeamPlayers(updatedPlayers);
      setSelectedPlayer(updatedSelectedPlayer);
      appendLog(`Обновлено фото игрока ${formatPlayerName(selectedPlayer)}`);
    };

    reader.readAsDataURL(file);
  }

  function startVideoAnalysis() {
    setVideoStatus("analyzing");

    setTimeout(() => {
      setVideoStatus("ready");
    }, 900);
  }

  function confirmVideoStats() {
    const updatedPlayers = teamPlayers.map((player) => {
      const videoRow = videoDemoStats.find((row) => row.id === player.id);

      if (!videoRow) {
        return player;
      }

      return {
        ...player,
        goals: player.goals + videoRow.goals,
        assists: player.assists + videoRow.assists,
        tackles: player.tackles + videoRow.tackles,
        accuratePasses: player.accuratePasses + videoRow.accuratePasses,
        mistakes: player.mistakes + videoRow.mistakes,
      };
    });

    setTeamPlayers(updatedPlayers);

    const updatedSelected = updatedPlayers.find(
      (player) => player.id === selectedPlayer.id
    );
    if (updatedSelected) {
      setSelectedPlayer(updatedSelected);
    }

    setVideoStatus("confirmed");
    appendLog("Организатор подтвердил статистику после AI Video Analysis");
  }

  function sendChatMessage() {
    const text = chatDraft.trim();
    if (!text || !selectedChatPlayer) return;

    const playerName =
      user.role === "coach"
        ? formatPlayerName(selectedChatPlayer)
        : `${user.firstName} ${user.lastName}`;

    const from = user.role === "coach" ? "Тренер" : playerName;
    const to = user.role === "coach" ? playerName : "Тренер";
    const time = new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      id: Date.now(),
      from,
      to,
      text,
      time,
      status: "Отправлено",
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setChatDraft("");
    appendLog(`Отправлено сообщение: ${from} → ${to}`);
  }

  function useChatTemplate(text) {
    setChatDraft(text);
  }

  function exportPlayerReport() {
    setReportReady(true);
    appendLog(`Сформирован отчет игрока ${formatPlayerName(selectedPlayer)}`);
  }

  function logout() {
    setUser(null);
    setScreen("auth");
    setMode("login");
    setActiveTab("profile");
  }

  function renderPlayerPassport(showOfficialWarning = true) {
    return (
      <>
        <div className="card playersPanel">
          <div className="sectionHeader">
            <div>
              <h2>{user.role === "player" ? "Мой цифровой паспорт" : "Игроки команды"}</h2>
              <p>Быстрый поиск, фильтр и управление составом.</p>
            </div>

            {user.role === "coach" && (
              <button
                className="smallPremiumButton"
                onClick={() => setShowAddPlayerForm(!showAddPlayerForm)}
              >
                {showAddPlayerForm ? "Скрыть" : "+ Игрок"}
              </button>
            )}
          </div>

          {user.role === "coach" && showAddPlayerForm && (
            <div className="manualPlayerForm">
              <h3>Добавить игрока вручную</h3>
              <p>
                Это удобно, если ученик уже в команде, но еще не прошел регистрацию по коду.
              </p>

              <div className="compactGrid">
                <label>
                  Имя
                  <input
                    value={manualPlayer.firstName}
                    onChange={(e) => updateManualPlayer("firstName", e.target.value)}
                    placeholder="Например: Самат"
                  />
                </label>

                <label>
                  Фамилия
                  <input
                    value={manualPlayer.lastName}
                    onChange={(e) => updateManualPlayer("lastName", e.target.value)}
                    placeholder="Например: Ахметов"
                  />
                </label>

                <label>
                  Возраст
                  <input
                    value={manualPlayer.age}
                    onChange={(e) => updateManualPlayer("age", e.target.value)}
                    placeholder="15"
                  />
                </label>

                <label>
                  Класс
                  <input
                    value={manualPlayer.grade}
                    onChange={(e) => updateManualPlayer("grade", e.target.value)}
                    placeholder="9А"
                  />
                </label>

                <label>
                  Позиция
                  <select
                    value={manualPlayer.position}
                    onChange={(e) => updateManualPlayer("position", e.target.value)}
                  >
                    {playerPositions.map((position) => (
                      <option key={position}>{position}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Статус
                  <select
                    value={manualPlayer.careStatus}
                    onChange={(e) => updateManualPlayer("careStatus", e.target.value)}
                  >
                    {playerStatusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>

              <button className="mainButton" onClick={addManualPlayer}>
                Добавить в команду
              </button>
            </div>
          )}

          <div className="toolsRow">
            <input
              value={playerSearch}
              onChange={(e) => setPlayerSearch(e.target.value)}
              placeholder="Найти игрока"
            />
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option>Все</option>
              {playerPositions.map((position) => (
                <option key={position}>{position}</option>
              ))}
            </select>
          </div>

          {filteredPlayers.map((player) => (
            <button
              className={`playerButton ${selectedPlayer.id === player.id ? "selected" : ""}`}
              key={player.id}
              onClick={() => {
                setSelectedPlayer(player);
                setReportReady(false);
              }}
            >
              <div className="playerMini">
                <PlayerAvatar player={player} />
                <div>
                  <b>
                    {player.firstName} {player.lastName}
                  </b>
                  <p>
                    {player.team} · {player.position}
                  </p>
                  <em className={["На травме", "Восстановление"].includes(player.careStatus) ? "statusPill danger" : "statusPill"}>
                    {player.careStatus || "Статус не указан"}
                  </em>
                </div>
              </div>
              <span>{calculateRating(player)}</span>
            </button>
          ))}

          {filteredPlayers.length === 0 && (
            <div className="emptyBox">Игроки не найдены. Измени поиск или фильтр.</div>
          )}
        </div>

        <div className="card">
          <h2>Цифровой паспорт игрока</h2>

          <div className="passportHeader">
            <PlayerAvatar player={selectedPlayer} size="large" />
            <div>
              <h3>
                {selectedPlayer.firstName} {selectedPlayer.lastName}
              </h3>
              <p>
                Команда: <b>{selectedPlayer.team}</b>
              </p>
              <p>
                Позиция: <b>{selectedPlayer.position}</b>
              </p>
              <p>
                Класс: <b>{selectedPlayer.grade}</b>
              </p>
              <p>
                Статус: <b>{selectedPlayer.careStatus || "Не указан"}</b>
              </p>
            </div>
          </div>

          <label className="uploadPhotoButton">
            Добавить фото игрока
            <input type="file" accept="image/*" onChange={updatePlayerPhoto} />
          </label>

          {(user.role === "coach" || user.role === "organizer") && (
            <div className="coachPositionBox">
              <h3>Управление игроком</h3>
              <p>
                Тренер может менять позицию и статус игрока для состава. Официальную статистику турнира подтверждает организатор.
              </p>

              <label>Позиция</label>
              <select
                value={selectedPlayer.position}
                onChange={(e) => updatePlayerPosition(e.target.value)}
              >
                {playerPositions.map((position) => (
                  <option key={position}>{position}</option>
                ))}
              </select>

              <label>Статус игрока</label>
              <select
                value={selectedPlayer.careStatus || "Основной состав"}
                onChange={(e) => updateSelectedPlayerField("careStatus", e.target.value)}
              >
                {playerStatusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              {["На травме", "Восстановление"].includes(selectedPlayer.careStatus) && (
                <>
                  <label>Комментарий по ограничению участия</label>
                  <input
                    value={selectedPlayer.injuryNote || ""}
                    onChange={(e) => updateSelectedPlayerField("injuryNote", e.target.value)}
                    placeholder="Например: не участвует в матче, только легкая разминка"
                  />
                  <div className="warningBox">
                    FootAssist не ставит диагнозы. Решение о допуске к тренировкам и матчам принимают взрослые ответственные лица и медицинский специалист.
                  </div>
                </>
              )}
            </div>
          )}

          <div className="statsGrid">
            <div>
              <b>{selectedPlayer.goals}</b>
              <span>Голы</span>
            </div>
            <div>
              <b>{selectedPlayer.assists}</b>
              <span>Передачи</span>
            </div>
            <div>
              <b>{selectedPlayer.tackles}</b>
              <span>Отборы</span>
            </div>
            <div>
              <b>{selectedPlayer.accuratePasses}</b>
              <span>Точные пасы</span>
            </div>
            <div>
              <b>{selectedPlayer.mistakes}</b>
              <span>Ошибки</span>
            </div>
            <div>
              <b>{calculateRating(selectedPlayer)}</b>
              <span>Рейтинг</span>
            </div>
          </div>

          <div className="info">{getRecommendation(selectedPlayer)}</div>

          <button className="mainButton" onClick={exportPlayerReport}>
            Сформировать отчет игрока
          </button>

          {reportReady && (
            <div className="successBox">
              Отчет сформирован: паспорт, рейтинг, сильные стороны и рекомендации готовы для экспорта.
            </div>
          )}

          {showOfficialWarning && user.role === "coach" && (
            <div className="warningBox">
              Тренер видит статистику и рекомендации, но не изменяет официальные данные турнира.
              Статистику подтверждает организатор соревнований.
            </div>
          )}
        </div>
      </>
    );
  }

  if (screen === "auth") {
    return (
      <div className="page">
        <div className="phone">
          <div className="top">
            <div className="badge">QR ACCESS</div>
            <h1>FootAssist</h1>
            <p>Удобная цифровая платформа для школ, секций и турниров: меньше бумажной работы, больше прогресса игроков.</p>
          </div>

          <div className="tabs">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              Вход
            </button>
            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => setMode("register")}
            >
              Регистрация
            </button>
          </div>

          <div className="schoolFocus">
            <div>
              <b>Для школы</b>
              <span>турниры, команды и QR-доступ в одном месте</span>
            </div>
            <div>
              <b>Для прогресса</b>
              <span>паспорт игрока, рейтинг и понятные рекомендации</span>
            </div>
            <div>
              <b>Для честности</b>
              <span>официальную статистику подтверждает организатор</span>
            </div>
          </div>

          {mode === "login" && (
            <div className="card">
              <h2>Вход в приложение</h2>

              <label>Электронная почта</label>
              <input
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />

              <label>Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
              />

              <button className="mainButton" onClick={login}>
                Войти как игрок
              </button>

              <button className="lightButton inside" onClick={demoCoachLogin}>
                Демо-вход тренера
              </button>

              <button className="lightButton inside" onClick={demoOrganizerLogin}>
                Демо-вход организатора
              </button>
            </div>
          )}

          {mode === "register" && (
            <div className="card">
              <h2>Регистрация</h2>

              <label>Роль</label>
              <select
                value={form.role}
                onChange={(e) => updateForm("role", e.target.value)}
              >
                <option>Игрок</option>
                <option>Тренер</option>
                <option>Организатор турнира</option>
              </select>

              <label>Имя</label>
              <input
                value={form.firstName}
                onChange={(e) => updateForm("firstName", e.target.value)}
              />

              <label>Фамилия</label>
              <input
                value={form.lastName}
                onChange={(e) => updateForm("lastName", e.target.value)}
              />

              <label>Возраст</label>
              <input
                value={form.age}
                onChange={(e) => updateForm("age", e.target.value)}
              />

              <label>Электронная почта</label>
              <input
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />

              <label>Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
              />

              <h3>Место проживания</h3>

              <label>Страна</label>
              <input
                value={form.country}
                onChange={(e) => updateForm("country", e.target.value)}
              />

              <label>Регион / республика</label>
              <input
                value={form.region}
                onChange={(e) => updateForm("region", e.target.value)}
              />

              <label>Район</label>
              <input
                value={form.district}
                onChange={(e) => updateForm("district", e.target.value)}
              />

              <label>Город / село</label>
              <input
                value={form.city}
                onChange={(e) => updateForm("city", e.target.value)}
              />

              <label>Улица, необязательно</label>
              <input
                value={form.street}
                onChange={(e) => updateForm("street", e.target.value)}
              />

              <label>Школа или секция</label>
              <input
                value={form.school}
                onChange={(e) => updateForm("school", e.target.value)}
              />

              {form.role === "Игрок" && (
                <>
                  <label>Персональный код команды</label>
                  <input
                    value={form.teamCode}
                    onChange={(e) => updateForm("teamCode", e.target.value)}
                  />

                  <div className="info">
                    После ввода кода игрок не попадает в команду сразу.
                    Тренеру приходит заявка, и он решает: принять или отклонить.
                  </div>
                </>
              )}

              <button className="mainButton" onClick={register}>
                Зарегистрироваться
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "pending") {
    return (
      <div className="page">
        <div className="phone">
          <div className="top">
            <div className="badge">FOOTASSIST</div>
            <h1>Заявка отправлена</h1>
            <p>Ожидайте подтверждения тренера</p>
          </div>

          <div className="card">
            <h2>
              {user.firstName} {user.lastName}
            </h2>

            <p>
              Вы отправили заявку в команду по коду:
              <b> {user.teamCode}</b>
            </p>

            <p>
              Статус: <b>{user.status}</b>
            </p>

            <p>
              После подтверждения тренером откроется доступ к цифровому
              паспорту игрока и команде.
            </p>

            <button className="lightButton inside" onClick={logout}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="phone appPhone">
        <div className="top">
          <div className="badge">MALOYAZ</div>
          <h1>FootAssist</h1>
          <p>
            {user.firstName} {user.lastName} · {roleTitle(user.role)}
          </p>
        </div>

        <div className="appContent">
          {activeTab === "profile" && (
            <>
              <div className="card">
                <h2>Профиль</h2>
                <p>
                  Пользователь:{" "}
                  <b>
                    {user.firstName} {user.lastName}
                  </b>
                </p>
                <p>
                  Роль: <b>{roleTitle(user.role)}</b>
                </p>
                <p>
                  Команда / турнир: <b>{user.team}</b>
                </p>
                <p>
                  Код команды: <b>{user.teamCode}</b>
                </p>
                <p>
                  Код турнира: <b>{user.tournamentCode}</b>
                </p>
                <p>
                  Статус: <b>{user.status}</b>
                </p>
              </div>

              <div className="card">
                <h2>Быстрая сводка</h2>
                <div className="dashboardGrid">
                  <div><b>{dashboardStats.players}</b><span>игроков</span></div>
                  <div><b>{dashboardStats.teams}</b><span>команд</span></div>
                  <div><b>{dashboardStats.playerRequests + dashboardStats.teamRequests}</b><span>заявок</span></div>
                  <div><b>{dashboardStats.bestRating}</b><span>лучший рейтинг</span></div>
                  <div><b>{dashboardStats.injured}</b><span>ограничений</span></div>
                </div>
              </div>

              {user.role === "coach" && (
                <div className="card">
                  <h2>Рекомендуемый состав</h2>
                  <div className="lineupGrid">
                    <div><span>Вратарь</span><b>{recommendedLineup.goalkeeper?.firstName} {recommendedLineup.goalkeeper?.lastName}</b></div>
                    <div><span>Защитник</span><b>{recommendedLineup.defender?.firstName} {recommendedLineup.defender?.lastName}</b></div>
                    <div><span>Полузащитник</span><b>{recommendedLineup.midfielder?.firstName} {recommendedLineup.midfielder?.lastName}</b></div>
                    <div><span>Нападающий</span><b>{recommendedLineup.forward?.firstName} {recommendedLineup.forward?.lastName}</b></div>
                  </div>
                </div>
              )}

              {user.role === "coach" && (
                <div className="card">
                  <h2>Мониторинг травм и ограничений</h2>
                  {teamPlayers
                    .filter((player) => ["На травме", "Восстановление"].includes(player.careStatus))
                    .map((player) => (
                      <div className="healthRow" key={player.id}>
                        <b>{player.firstName} {player.lastName}</b>
                        <p>{player.careStatus}: {player.injuryNote || "комментарий не добавлен"}</p>
                      </div>
                    ))}
                  {teamPlayers.filter((player) => ["На травме", "Восстановление"].includes(player.careStatus)).length === 0 && (
                    <p>Сейчас нет игроков со статусом «На травме» или «Восстановление».</p>
                  )}
                </div>
              )}

              <div className="card">
                <h2>Безопасность и честность</h2>
                <div className="checkList">
                  <span>✓ официальный рейтинг подтверждает организатор</span>
                  <span>✓ тренер не меняет турнирную статистику</span>
                  <span>✓ полный домашний адрес не обязателен</span>
                  <span>✓ чат сохраняет историю сообщений</span>
                </div>
              </div>

              <div className="card green">
                <h2>О проекте</h2>
                <p>
                  FootAssist — удобная цифровая платформа для школьного футбола. Она помогает школе проводить турниры,
                  тренеру видеть развитие команды, игроку отслеживать прогресс, а организатору честно вести статистику.
                </p>
              </div>

              <div className="card schoolCard">
                <h2>Удобство для школы</h2>
                <p>
                  Вместо бумажных списков и подсчета «на глаз» школа получает единое приложение: регистрация участников,
                  заявки команд, турнирная таблица, рейтинг игроков, MVP и QR-доступ для зрителей.
                </p>
                <div className="quickBenefits">
                  <span>QR-доступ</span>
                  <span>меньше ручной работы</span>
                  <span>единая турнирная таблица</span>
                </div>
              </div>

              <div className="card progressCard">
                <h2>Больше прогресса</h2>
                <p>
                  Игрок видит не только место в рейтинге, но и свои показатели: голы, передачи, отборы, точные пасы,
                  ошибки и рекомендации. Это помогает понимать, что тренировать дальше.
                </p>
                <div className="progressSteps">
                  <div><b>1</b><span>сбор статистики</span></div>
                  <div><b>2</b><span>расчет рейтинга</span></div>
                  <div><b>3</b><span>рекомендации</span></div>
                </div>
              </div>

              <div className="card">
                <h2>Проблема</h2>
                <p>
                  В школьном футболе игроков часто оценивают «на глаз», без статистики. Из-за этого сложно
                  объективно понять, кто прогрессирует, кому нужна помощь и как честно определить лучших игроков турнира.
                </p>
              </div>

              <div className="card">
                <h2>Цель</h2>
                <p>
                  Создать прототип цифровой платформы, которая делает школьные футбольные турниры удобнее для школы
                  и помогает игрокам видеть личный прогресс через статистику, рейтинг и рекомендации.
                </p>
              </div>

              <div className="card">
                <h2>Модули</h2>
                <div className="moduleList">
                  <div><b>1. Игрок</b><span>цифровой паспорт, рейтинг, прогресс</span></div>
                  <div><b>2. Тренер</b><span>команда, заявки игроков, рекомендации</span></div>
                  <div><b>3. Организатор</b><span>турнир, команды, статистика, видеоанализ</span></div>
                </div>
              </div>

              <div className="card">
                <h2>Формула рейтинга</h2>
                <div className="formulaBox">
                  Рейтинг = голы × 10 + передачи × 7 + отборы × 4 + точные пасы × 2 − ошибки × 3
                </div>
                <p>
                  Рейтинг пересчитывается автоматически после подтверждения статистики организатором.
                </p>
              </div>

              <div className="card">
                <h2>Что уже реализовано</h2>
                <div className="checkList">
                  <span>✓ вход и регистрация</span>
                  <span>✓ роли: игрок, тренер, организатор</span>
                  <span>✓ заявки игроков в команду</span>
                  <span>✓ заявки команд в турнир</span>
                  <span>✓ цифровой паспорт игрока с фото</span>
                  <span>✓ автоматический рейтинг</span>
                  <span>✓ турнирная таблица</span>
                  <span>✓ демо AI Video Analysis</span>
                </div>
              </div>

              <div className="card">
                <h2>Эксперимент</h2>
                <p>
                  Для проверки проекта планируется провести опрос учеников и тестовый матч, собрать статистику 5–10 игроков,
                  рассчитать рейтинг и сравнить субъективную оценку «на глаз» с результатами приложения.
                </p>
              </div>

              <div className="card">
                <h2>Монетизация</h2>
                <div className="moneyGrid">
                  <div><b>0 ₽</b><span>базовая версия школы</span></div>
                  <div><b>49 ₽</b><span>расширенный паспорт</span></div>
                  <div><b>99 ₽/мес</b><span>подписка команды</span></div>
                  <div><b>300–500 ₽</b><span>цифровой турнир</span></div>
                </div>
              </div>
            </>
          )}

          {activeTab === "players" && renderPlayerPassport(true)}

          {activeTab === "rating" && (
            <div className="card">
              <h2>Рейтинг игроков</h2>

              <div className="formulaBox">
                Рейтинг = голы × 10 + передачи × 7 + отборы × 4 + точные пасы ×
                2 − ошибки × 3
              </div>

              {rankedPlayers.map((player, index) => (
                <div className="ratingRow" key={player.id}>
                  <div className="place">{index + 1}</div>
                  <div className="playerMini">
                    <PlayerAvatar player={player} />
                    <div>
                      <b>
                        {player.firstName} {player.lastName}
                      </b>
                      <p>{player.team} · {player.position}</p>
                    </div>
                  </div>
                  <span>{calculateRating(player)}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="card">
              <h2>Заявки игроков в команду</h2>

              {playerRequests.length === 0 && <p>Новых заявок нет.</p>}

              {playerRequests.map((request) => (
                <div className="request" key={request.id}>
                  <h3>
                    {request.firstName} {request.lastName}
                  </h3>
                  <p>Возраст: {request.age}</p>
                  <p>Школа: {request.school}</p>
                  <p>Населенный пункт: {request.city}</p>
                  <p>Код команды: {request.teamCode}</p>

                  <div className="buttons">
                    <button onClick={() => acceptPlayerRequest(request)}>
                      Принять
                    </button>
                    <button onClick={() => declinePlayerRequest(request.id)}>
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "joinTournament" && (
            <>
              <div className="card">
                <h2>Заявка команды в турнир</h2>
                <p>
                  Тренер не редактирует официальную статистику турнира. Он отправляет команду организатору по коду соревнования.
                </p>

                <label>Код турнира от организатора</label>
                <input
                  value={tournamentCodeInput}
                  onChange={(e) => setTournamentCodeInput(e.target.value)}
                />

                <button className="mainButton" onClick={sendTeamRequest}>
                  Отправить заявку организатору
                </button>

                <div className="info">
                  Организатор соревнований проверит заявку и решит, принять команду в турнир или отклонить.
                </div>
              </div>

              <div className="card">
                <h2>Турнирная таблица</h2>
                {tournamentTeams.map((team, index) => (
                  <div className="teamRow" key={team.name}>
                    <div className="place">{index + 1}</div>
                    <b>{team.shortName}</b>
                    <span>Игр: {team.games}</span>
                    <strong>{team.points} очков</strong>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "teams" && (
            <>
              <div className="card">
                <h2>Заявки команд в турнир</h2>
                <p>Код турнира: <b>{user.tournamentCode}</b></p>

                {teamRequests.length === 0 && <p>Новых заявок команд нет.</p>}

                {teamRequests.map((request) => (
                  <div className="request" key={request.id}>
                    <h3>{request.teamName}</h3>
                    <p>Тренер: {request.coachName}</p>
                    <p>Школа: {request.school}</p>
                    <p>Код турнира: {request.tournamentCode}</p>

                    <div className="buttons">
                      <button onClick={() => acceptTeamRequest(request)}>
                        Принять
                      </button>
                      <button onClick={() => declineTeamRequest(request.id)}>
                        Отклонить
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card">
                <h2>Команды турнира</h2>
                {tournamentTeams.map((team) => (
                  <div className="teamCard" key={team.name}>
                    <b>{team.name}</b>
                    <p>Тренер: {team.coach}</p>
                    <p>Статус: {team.status}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "stats" && (
            <>
              <div className="card">
                <h2>Официальная статистика матча</h2>
                <p>
                  Этот раздел доступен организатору соревнований. Здесь он вносит или подтверждает официальные данные матча.
                </p>

                <div className="matchBox">
                  <b>Выбранный матч:</b>
                  <p>{matches[0].title} · счет {matches[0].score}</p>
                </div>
              </div>

              {renderPlayerPassport(false)}

              <div className="card">
                <h2>Ввод статистики организатором</h2>
                <p>
                  Изменения сразу пересчитывают рейтинг игрока.
                </p>

                <label>Голы</label>
                <input
                  type="number"
                  value={selectedPlayer.goals}
                  onChange={(e) => updatePlayerStat("goals", e.target.value)}
                />

                <label>Передачи</label>
                <input
                  type="number"
                  value={selectedPlayer.assists}
                  onChange={(e) => updatePlayerStat("assists", e.target.value)}
                />

                <label>Отборы</label>
                <input
                  type="number"
                  value={selectedPlayer.tackles}
                  onChange={(e) => updatePlayerStat("tackles", e.target.value)}
                />

                <label>Точные пасы</label>
                <input
                  type="number"
                  value={selectedPlayer.accuratePasses}
                  onChange={(e) =>
                    updatePlayerStat("accuratePasses", e.target.value)
                  }
                />

                <label>Ошибки</label>
                <input
                  type="number"
                  value={selectedPlayer.mistakes}
                  onChange={(e) => updatePlayerStat("mistakes", e.target.value)}
                />
              </div>
            </>
          )}

          {activeTab === "video" && (
            <>
              <div className="card">
                <h2>AI Video Analysis</h2>
                <p>
                  Демо-модуль видеоанализа для организатора соревнований.
                  Система формирует предварительную статистику, а организатор подтверждает ее перед добавлением в рейтинг.
                </p>

                <label>Видео матча</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    setVideoFileName(e.target.files?.[0]?.name || "")
                  }
                />

                {videoFileName && (
                  <div className="fileBox">Выбрано видео: {videoFileName}</div>
                )}

                <button className="mainButton" onClick={startVideoAnalysis}>
                  Запустить анализ
                </button>
              </div>

              {videoStatus === "analyzing" && (
                <div className="card yellow">
                  <h2>Идет анализ</h2>
                  <p>
                    Система имитирует распознавание игровых действий: голы,
                    передачи, отборы, точные пасы и ошибки.
                  </p>
                </div>
              )}

              {(videoStatus === "ready" || videoStatus === "confirmed") && (
                <div className="card">
                  <h2>Предварительный отчет</h2>

                  {videoDemoStats.map((row) => (
                    <div className="videoRow" key={row.id}>
                      <b>
                        {row.firstName} {row.lastName}
                      </b>
                      <p>
                        Голы: {row.goals} · Передачи: {row.assists} · Отборы:{" "}
                        {row.tackles}
                      </p>
                      <p>
                        Точные пасы: {row.accuratePasses} · Ошибки:{" "}
                        {row.mistakes}
                      </p>
                    </div>
                  ))}

                  {videoStatus === "ready" && (
                    <button className="mainButton" onClick={confirmVideoStats}>
                      Подтвердить и добавить в рейтинг
                    </button>
                  )}

                  {videoStatus === "confirmed" && (
                    <div className="successBox">
                      Статистика из видео подтверждена организатором и добавлена к рейтингу.
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "chat" && (
            <>
              <div className="card messengerCard">
                <div className="messengerHeader">
                  <div>
                    <h2>Чат</h2>
                    <p>
                      Мессенджер для организационных сообщений: тренировки, матчи, задания и обратная связь.
                    </p>
                  </div>
                  <span className="onlineBadge">Online</span>
                </div>

                <div className="messengerLayout">
                  <div className="dialogList">
                    {user.role === "coach" ? (
                      teamPlayers.map((player) => {
                        const playerName = formatPlayerName(player);
                        const unread = chatMessages.filter(
                          (message) => message.from === playerName && message.to === "Тренер"
                        ).length;

                        return (
                          <button
                            className={
                              selectedChatPlayerId === player.id
                                ? "dialogItem dialogActive"
                                : "dialogItem"
                            }
                            key={player.id}
                            onClick={() => setSelectedChatPlayerId(player.id)}
                          >
                            <div className="avatar smallAvatar">
                              {player.photo ? (
                                <img src={player.photo} alt={playerName} />
                              ) : (
                                getInitials(player)
                              )}
                            </div>
                            <div>
                              <b>{playerName}</b>
                              <span>{player.position}</span>
                            </div>
                            {unread > 0 && <em>{unread}</em>}
                          </button>
                        );
                      })
                    ) : (
                      <button className="dialogItem dialogActive">
                        <div className="avatar smallAvatar">Т</div>
                        <div>
                          <b>Тренер</b>
                          <span>Команда и задания</span>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="chatWindow">
                    <div className="chatTop">
                      <div>
                        <b>
                          {user.role === "coach"
                            ? formatPlayerName(selectedChatPlayer)
                            : "Тренер"}
                        </b>
                        <span>
                          {user.role === "coach"
                            ? selectedChatPlayer?.careStatus || "Игрок команды"
                            : "Связь с тренером"}
                        </span>
                      </div>
                    </div>

                    <div className="messageArea">
                      {chatMessages
                        .filter((message) => {
                          const currentPlayerName =
                            user.role === "coach"
                              ? formatPlayerName(selectedChatPlayer)
                              : `${user.firstName} ${user.lastName}`;

                          return (
                            (message.from === "Тренер" && message.to === currentPlayerName) ||
                            (message.from === currentPlayerName && message.to === "Тренер")
                          );
                        })
                        .map((message) => {
                          const isMine =
                            user.role === "coach"
                              ? message.from === "Тренер"
                              : message.from !== "Тренер";

                          return (
                            <div
                              className={isMine ? "bubble bubbleMine" : "bubble bubbleOther"}
                              key={message.id}
                            >
                              <p>{message.text}</p>
                              <span>{message.time || "12:00"} · {message.status || "Доставлено"}</span>
                            </div>
                          );
                        })}
                    </div>

                    <div className="quickReplies">
                      <button onClick={() => useChatTemplate("Завтра тренировка в 15:00.")}>
                        Тренировка
                      </button>
                      <button onClick={() => useChatTemplate("Не забудь форму и воду.")}>
                        Форма
                      </button>
                      <button onClick={() => useChatTemplate("Сегодня работаем над пасом и отбором.")}>
                        Задание
                      </button>
                    </div>

                    <div className="messageComposer">
                      <input
                        value={chatDraft}
                        onChange={(e) => setChatDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendChatMessage();
                          }
                        }}
                        placeholder="Написать сообщение..."
                      />
                      <button onClick={sendChatMessage}>➤</button>
                    </div>
                  </div>
                </div>

                <div className="warningBox">
                  В реальной школьной версии чат работает по правилам школы: история сообщений сохраняется, а общение используется только для тренировок, матчей и обратной связи.
                </div>
              </div>
            </>
          )}

          {activeTab === "log" && (
            <div className="card">
              <h2>Журнал действий</h2>
              <p>Система фиксирует важные действия: заявки, подтверждение статистики, изменения состава и сообщения.</p>

              <div className="logList">
                {activityLog.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tournament" && (
            <>
              <div className="card">
                <h2>Школьный турнир</h2>
                <p>Турнирная таблица между командами.</p>

                {tournamentTeams.map((team, index) => (
                  <div className="teamRow" key={team.name}>
                    <div className="place">{index + 1}</div>
                    <b>{team.shortName}</b>
                    <span>Игр: {team.games}</span>
                    <strong>{team.points} очков</strong>
                  </div>
                ))}
              </div>

              <div className="card">
                <h2>QR-доступ к турниру</h2>
                <div className="qrAccess">
                  <div className="fakeQr">QR</div>
                  <div>
                    <p>Код турнира: <b>{user.tournamentCode}</b></p>
                    <p>Участники и зрители могут открыть расписание, таблицу и MVP по QR-коду.</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2>Матчи</h2>
                {matches.map((match) => (
                  <div className="matchBox" key={match.id}>
                    <b>{match.title}</b>
                    <p>Счет: {match.score}</p>
                    <p>Статус: {match.status}</p>
                  </div>
                ))}
              </div>

              <div className="card dark">
                <h2>Лучшие игроки турнира</h2>
                <p>
                  Лучший бомбардир: <b>Амир Сафин</b>
                </p>
                <p>
                  Лучший ассистент: <b>Тимур Ганиев</b>
                </p>
                <p>
                  MVP турнира:{" "}
                  <b>
                    {rankedPlayers[0].firstName} {rankedPlayers[0].lastName}
                  </b>
                </p>
              </div>
            </>
          )}

          <button className="lightButton inside" onClick={logout}>
            Выйти
          </button>
        </div>

        <div
          className="bottomNav"
          style={{ gridTemplateColumns: `repeat(${navItems.length}, 1fr)` }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeTab === item.id ? "navActive" : ""}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
