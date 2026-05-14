import { useMemo, useState } from "react";
import "./App.css";

const initialRequests = [
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

const initialPlayers = [
  {
    id: 101,
    firstName: "Амир",
    lastName: "Сафин",
    age: "15",
    grade: "9А",
    position: "Нападающий",
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
    grade: "9Б",
    position: "Полузащитник",
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
    position: "Защитник",
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
    position: "Полузащитник",
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
    position: "Вратарь",
    goals: 0,
    assists: 0,
    tackles: 2,
    accuratePasses: 8,
    mistakes: 1,
  },
];

const tournamentTeams = [
  { name: "9А", games: 3, wins: 2, draws: 1, losses: 0, points: 7 },
  { name: "9Б", games: 3, wins: 2, draws: 0, losses: 1, points: 6 },
  { name: "8А", games: 3, wins: 1, draws: 1, losses: 1, points: 4 },
  { name: "8Б", games: 3, wins: 0, draws: 0, losses: 3, points: 0 },
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
    return "Сильная сторона: атака. Рекомендация: использовать ближе к воротам соперника.";
  }

  if (player.assists >= 3 || player.accuratePasses >= 20) {
    return "Сильная сторона: игра в пас. Рекомендация: использовать в центре поля.";
  }

  if (player.tackles >= 7) {
    return "Сильная сторона: отбор мяча. Рекомендация: использовать в защите.";
  }

  if (player.mistakes >= 5) {
    return "Зона роста: снизить количество ошибок под давлением.";
  }

  return "Игрок сбалансирован. Рекомендация: развивать точность передач и командное взаимодействие.";
}

function App() {
  const [screen, setScreen] = useState("auth");
  const [mode, setMode] = useState("login");
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState(initialRequests);
  const [teamPlayers, setTeamPlayers] = useState(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState(initialPlayers[0]);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [videoFileName, setVideoFileName] = useState("");

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

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
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
  }

  function login() {
    const demoUser = {
      firstName: "Тамирлан",
      lastName: "Баймурзин",
      role: "Игрок",
      status: "Принят в команду",
      team: "9А Малояз",
      teamCode: "MALOYAZ-9A",
    };

    setUser(demoUser);
    setActiveTab("profile");
    setScreen("main");
  }

  function demoCoachLogin() {
    const coach = {
      firstName: "Демо",
      lastName: "Тренер",
      role: "Тренер",
      status: "Тренер команды",
      team: "9А Малояз",
      teamCode: "MALOYAZ-9A",
    };

    setUser(coach);
    setActiveTab("requests");
    setScreen("main");
  }

  function register() {
    const newUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      role: form.role,
      age: form.age,
      school: form.school,
      city: form.city,
      teamCode: form.teamCode,
      status:
        form.role === "Игрок" && form.teamCode
          ? "Заявка отправлена тренеру"
          : "Профиль создан",
      team:
        form.role === "Игрок" && form.teamCode
          ? "Ожидает подтверждения"
          : "9А Малояз",
    };

    if (form.role === "Игрок" && form.teamCode) {
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

      setRequests([newRequest, ...requests]);
      setUser(newUser);
      setScreen("pending");
      return;
    }

    setUser(newUser);
    setActiveTab("profile");
    setScreen("main");
  }

  function acceptRequest(request) {
    const newPlayer = {
      id: Date.now(),
      firstName: request.firstName,
      lastName: request.lastName,
      age: request.age,
      grade: "Новый",
      position: "Не выбрана",
      goals: 0,
      assists: 0,
      tackles: 0,
      accuratePasses: 0,
      mistakes: 0,
    };

    setTeamPlayers([...teamPlayers, newPlayer]);
    setRequests(requests.filter((item) => item.id !== request.id));
  }

  function declineRequest(id) {
    setRequests(requests.filter((item) => item.id !== id));
  }

  function logout() {
    setUser(null);
    setScreen("auth");
    setMode("login");
    setActiveTab("profile");
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
  }

  if (screen === "auth") {
    return (
      <div className="page">
        <div className="phone">
          <div className="top">
            <div className="badge">QR ACCESS</div>
            <h1>FootAssist</h1>
            <p>Цифровой помощник школьного футбола</p>
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
                Войти
              </button>

              <button className="lightButton inside" onClick={demoCoachLogin}>
                Демо-вход для жюри / тренера
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
            {user.firstName} {user.lastName} · {user.role}
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
                  Роль: <b>{user.role}</b>
                </p>
                <p>
                  Команда: <b>{user.team}</b>
                </p>
                <p>
                  Код команды: <b>{user.teamCode}</b>
                </p>
                <p>
                  Статус: <b>{user.status}</b>
                </p>
              </div>

              <div className="card green">
                <h2>Главная идея</h2>
                <p>
                  В школьном футболе игроков часто оценивают «на глаз».
                  FootAssist переводит игру в понятные данные: голы, передачи,
                  отборы, точные пасы, ошибки и рейтинг.
                </p>
              </div>
            </>
          )}

          {activeTab === "players" && (
            <>
              <div className="card">
                <h2>Игроки команды</h2>

                {teamPlayers.map((player) => (
                  <button
                    className="playerButton"
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                  >
                    <div>
                      <b>
                        {player.firstName} {player.lastName}
                      </b>
                      <p>
                        {player.grade} · {player.position}
                      </p>
                    </div>
                    <span>{calculateRating(player)}</span>
                  </button>
                ))}
              </div>

              <div className="card">
                <h2>Цифровой паспорт игрока</h2>
                <h3>
                  {selectedPlayer.firstName} {selectedPlayer.lastName}
                </h3>
                <p>
                  Позиция: <b>{selectedPlayer.position}</b>
                </p>
                <p>
                  Класс: <b>{selectedPlayer.grade}</b>
                </p>

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
              </div>

              {user.role === "Тренер" && (
                <div className="card">
                  <h2>Редактирование статистики</h2>
                  <p>
                    Тренер вводит данные после матча, а рейтинг пересчитывается
                    автоматически.
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
                    onChange={(e) =>
                      updatePlayerStat("assists", e.target.value)
                    }
                  />

                  <label>Отборы</label>
                  <input
                    type="number"
                    value={selectedPlayer.tackles}
                    onChange={(e) =>
                      updatePlayerStat("tackles", e.target.value)
                    }
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
                    onChange={(e) =>
                      updatePlayerStat("mistakes", e.target.value)
                    }
                  />
                </div>
              )}
            </>
          )}

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
                  <div>
                    <b>
                      {player.firstName} {player.lastName}
                    </b>
                    <p>{player.position}</p>
                  </div>
                  <span>{calculateRating(player)}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="card">
              <h2>Заявки в команду</h2>

              {user.role !== "Тренер" && (
                <p>Этот раздел доступен тренеру команды.</p>
              )}

              {user.role === "Тренер" && requests.length === 0 && (
                <p>Новых заявок нет.</p>
              )}

              {user.role === "Тренер" &&
                requests.map((request) => (
                  <div className="request" key={request.id}>
                    <h3>
                      {request.firstName} {request.lastName}
                    </h3>
                    <p>Возраст: {request.age}</p>
                    <p>Школа: {request.school}</p>
                    <p>Населенный пункт: {request.city}</p>
                    <p>Код команды: {request.teamCode}</p>

                    <div className="buttons">
                      <button onClick={() => acceptRequest(request)}>
                        Принять
                      </button>
                      <button onClick={() => declineRequest(request.id)}>
                        Отклонить
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "video" && (
            <>
              <div className="card">
                <h2>AI Video Analysis</h2>
                <p>
                  Демо-модуль видеоанализа. В прототипе он показывает сценарий:
                  загрузка видео, предварительная статистика и подтверждение
                  тренером.
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
                      Статистика из видео добавлена к игрокам. Рейтинг обновлен.
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "tournament" && (
            <>
              <div className="card">
                <h2>Школьный турнир</h2>
                <p>Турнирная таблица между классами.</p>

                {tournamentTeams.map((team, index) => (
                  <div className="teamRow" key={team.name}>
                    <div className="place">{index + 1}</div>
                    <b>{team.name}</b>
                    <span>Игр: {team.games}</span>
                    <strong>{team.points} очков</strong>
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

        <div className="bottomNav">
          <button
            className={activeTab === "profile" ? "navActive" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Профиль
          </button>
          <button
            className={activeTab === "players" ? "navActive" : ""}
            onClick={() => setActiveTab("players")}
          >
            Игроки
          </button>
          <button
            className={activeTab === "rating" ? "navActive" : ""}
            onClick={() => setActiveTab("rating")}
          >
            Рейтинг
          </button>
          <button
            className={activeTab === "requests" ? "navActive" : ""}
            onClick={() => setActiveTab("requests")}
          >
            Заявки
          </button>
          <button
            className={activeTab === "video" ? "navActive" : ""}
            onClick={() => setActiveTab("video")}
          >
            Видео
          </button>
          <button
            className={activeTab === "tournament" ? "navActive" : ""}
            onClick={() => setActiveTab("tournament")}
          >
            Турнир
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
