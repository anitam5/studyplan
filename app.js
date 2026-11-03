(() => {
  const STORAGE_KEY = "planer-nauki-v1";
  const COLORS = ["#F28C38", "#E9A45E", "#D97852", "#A7AD70", "#D78B6E", "#C8A15A", "#73A895", "#CB8067"];
  const DAY_NAMES = ["pon.", "wt.", "śr.", "czw.", "pt.", "sob.", "niedz."];
  const DAY_FULL_NAMES = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
  const PRIORITY_LABELS = { low: "Może poczekać", medium: "Normalna", high: "Ważne!" };
  const TOPICS = [
    { keys: ["ulamki", "ułamek", "ulamek", "licznik", "mianownik"], title: "Ułamki zwykłe", explain: "Ułamek zapisuje część całości. Licznik (na górze) mówi, ile części bierzemy, a mianownik (na dole) — na ile równych części podzielono całość.", analogy: "Wyobraź sobie pizzę podzieloną na 8 kawałków. Jeśli zjesz 3, zjadłeś 3/8 pizzy.", example: "Przy dodawaniu 1/4 + 2/4 mianownik zostaje ten sam, a liczniki dodajemy: 3/4.", quiz: "Ile to 2/5 + 1/5? Spróbuj samodzielnie, zanim sprawdzisz wynik." },
    { keys: ["rownani", "równani", "x =", "niewiadom", "równanie"], title: "Równania", explain: "Równanie to zagadka z liczbą ukrytą pod literą. Obie strony znaku „=” muszą mieć tę samą wartość. Żeby znaleźć niewiadomą, wykonuj to samo działanie po obu stronach.", analogy: "Wyobraź sobie wagę: jeśli zdejmiesz 3 kg z lewej szalki, zdejmij też 3 kg z prawej, żeby równowaga została.", example: "x + 3 = 8. Odejmij 3 po obu stronach: x = 8 − 3, więc x = 5.", quiz: "Spróbuj rozwiązać: x + 6 = 14. Jakie działanie wykonasz po obu stronach?" },
    { keys: ["procent", "%"], title: "Procenty", explain: "Procent znaczy „na sto”. 25% to 25 ze 100, czyli jedna czwarta całości. Aby obliczyć procent z liczby, zamień procent na ułamek dziesiętny i pomnóż.", analogy: "Rabat 20% oznacza, że z każdych 100 zł odejmujesz 20 zł.", example: "10% z 80 = 0,10 × 80 = 8.", quiz: "Ile wynosi 50% z 36? Podpowiedź: 50% to połowa." },
    { keys: ["fotosyntez", "chlorofil", "chloroplast"], title: "Fotosynteza", explain: "Roślina wykorzystuje energię światła, wodę pobraną z gleby i dwutlenek węgla z powietrza, żeby wytworzyć cukier (pokarm). Przy okazji uwalnia tlen.", analogy: "Liść działa jak mała kuchnia na energię słoneczną: woda i CO₂ są składnikami, światło uruchamia przepis, a powstają cukier i tlen.", example: "W skrócie: woda + dwutlenek węgla + światło → cukier + tlen.", quiz: "Jakiego gazu roślina potrzebuje z powietrza do fotosyntezy?" },
    { keys: ["komork", "komórk", "organell"], title: "Komórka", explain: "Komórka to najmniejsza jednostka, która potrafi wykonywać czynności życiowe. Błona komórkowa kontroluje, co wchodzi i wychodzi, a jądro przechowuje instrukcje dla komórki.", analogy: "Komórka przypomina miasto: błona to granica i brama, jądro to centrum zarządzania, a mitochondria dostarczają energię.", example: "Komórki roślin mają dodatkowo ścianę komórkową i chloroplasty, których nie mają typowe komórki zwierzęce.", quiz: "Która część komórki działa jak centrum zarządzania?" },
    { keys: ["atom", "proton", "neutron", "elektron"], title: "Atom", explain: "Atom składa się z jądra (protony o ładunku dodatnim i neutrony bez ładunku) oraz elektronów o ładunku ujemnym poruszających się wokół jądra.", analogy: "Pomyśl o jądrze jak o ciężkim środku układu, a o elektronach jak o lekkich cząstkach otaczających ten środek.", example: "W obojętnym atomie wodoru jest jeden proton i jeden elektron.", quiz: "Które cząstki w atomie mają ładunek ujemny?" },
    { keys: ["newton", "siła", "sila", "przyspieszeni", "ruch"], title: "Siła i ruch", explain: "Siła może zmienić ruch lub kształt przedmiotu. Im większa siła działa na tę samą masę, tym większe przyspieszenie. Zapisujemy to jako F = m × a.", analogy: "Łatwiej rozpędzić pusty wózek niż ciężko załadowany — ta sama siła daje lżejszemu większe przyspieszenie.", example: "Na masę 2 kg działa siła 6 N. Przyspieszenie wynosi a = F/m = 6/2 = 3 m/s².", quiz: "Co mocniej przyspieszy przy tej samej sile: lekki czy ciężki wózek?" },
    { keys: ["obieg wody", "parowani", "skraplani", "opad"], title: "Obieg wody", explain: "Słońce ogrzewa wodę, która paruje. Para w atmosferze ochładza się i skrapla w chmury. Potem woda spada jako deszcz lub śnieg i wraca do rzek, jezior oraz mórz.", analogy: "To naturalna pętla dostaw: woda wyrusza w powietrze, zbiera się w chmurach i wraca na ziemię.", example: "Kałuża po deszczu znika w słońcu, bo jej woda paruje.", quiz: "Co dostarcza energii, która napędza obieg wody?" },
    { keys: ["zdanie złożone", "zdanie pojedyncze", "orzeczeni", "podmiot"], title: "Części zdania", explain: "Podmiot wskazuje, kto lub co wykonuje czynność, a orzeczenie mówi, co robi podmiot albo w jakim jest stanie.", analogy: "W zdaniu „Kot śpi” kot odpowiada na pytanie „kto?”, a śpi — „co robi?”.", example: "W „Ola czyta książkę” podmiotem jest Ola, a orzeczeniem — czyta.", quiz: "W zdaniu „Pies biegnie szybko” wskaż podmiot i orzeczenie." },
    { keys: ["czas przeszły", "czas teraźniejszy", "czas przyszły", "czasy angielskie", "past simple", "present simple", "future simple"], title: "Czasy gramatyczne", explain: "Czasownik pokazuje, kiedy dzieje się czynność: w przeszłości, teraz lub w przyszłości. Najpierw ustal, kiedy wydarzenie ma miejsce, dopiero potem dobierz formę czasownika.", analogy: "To jak datownik do zdania: pomaga ustawić wydarzenie na osi czasu.", example: "„Wczoraj czytałem” — przeszłość; „Teraz czytam” — teraźniejszość; „Jutro będę czytać” — przyszłość.", quiz: "W którym czasie jest zdanie: „Jutro odwiedzę babcię”?" },
    { keys: ["druga wojna", "ii wojna", "pierwsza wojna", "i wojna", "historia"], title: "Jak uczyć się historii", explain: "W historii połącz cztery elementy: kiedy (daty), gdzie (miejsce), dlaczego (przyczyny) i co się zmieniło (skutki). Same daty łatwiej zapamiętać, kiedy mają sens w opowieści.", analogy: "Każde wydarzenie historyczne to rozdział opowieści z bohaterami, przyczyną i konsekwencjami.", example: "Ułóż krótką oś czasu z trzema wydarzeniami i dodaj do każdego po jednej przyczynie oraz jednym skutku.", quiz: "Jakie pytanie pomaga zrozumieć, dlaczego wydarzenie historyczne się zaczęło?" },
    { keys: ["kontynent", "geografi", "stolica", "rzeka"], title: "Jak uczyć się geografii", explain: "W geografii łącz miejsce z jego cechą: ukształtowaniem terenu, klimatem, wodą lub działalnością ludzi. Korzystaj z mapy i porównuj regiony zamiast zapamiętywać oderwane listy.", analogy: "Mapa to plan okolicy: symbole i kolory opowiadają, co znajduje się w danym miejscu.", example: "Zapamiętując państwo, pokaż je na mapie, wskaż sąsiadów i nazwij stolicę.", quiz: "Co łatwiej zapamiętać: samą nazwę rzeki czy jej położenie na mapie?" },
    { keys: ["kwas", "zasada", "ph", "odczyn"], title: "Kwasy i zasady", explain: "Skala pH opisuje odczyn roztworu. pH poniżej 7 oznacza odczyn kwaśny, 7 — obojętny, a powyżej 7 — zasadowy.", analogy: "Skala pH działa jak suwak: poniżej środka jest kwaśno, środek jest neutralny, powyżej — zasadowo.", example: "Sok z cytryny ma odczyn kwaśny, czysta woda w przybliżeniu obojętny.", quiz: "Czy roztwór o pH 9 jest kwaśny, obojętny czy zasadowy?" },
    { keys: ["dzielenie pisemne", "mnożenie pisemne", "tabliczka mnożenia"], title: "Działania pisemne", explain: "Zapisz liczby jedna pod drugą, wyrównując miejsca jedności, dziesiątek i setek. Obliczaj od prawej strony, a przeniesione wartości dopisuj przy następnej kolumnie.", analogy: "Każda kolumna to osobny rząd siedzeń: jedności siedzą pod jednościami, dziesiątki pod dziesiątkami.", example: "Przy 28 + 17 najpierw dodaj jedności (8 + 7 = 15), zapisz 5 i przenieś 1 dziesiątkę.", quiz: "Dlaczego przy dodawaniu pisemnym wyrównujemy cyfry w kolumnach?" },
    { keys: ["uklad sloneczny", "układ słoneczny", "planeta", "kosmos", "astronomi"], title: "Układ Słoneczny", explain: "W centrum Układu Słonecznego znajduje się Słońce. Planety krążą wokół niego po orbitach. Ziemia jest trzecią planetą od Słońca.", analogy: "Wyobraź sobie Słońce jako latarnię, a planety jako wędrowców poruszających się po swoich ścieżkach wokół niej.", example: "Kolejność od Słońca: Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran, Neptun.", quiz: "Która planeta jest najbliżej Słońca?" },
    { keys: ["metafor", "porownani", "porównani", "epitet", "srodek stylistyczny", "środek stylistyczny"], title: "Środki stylistyczne", explain: "Środek stylistyczny to sposób, w jaki autor ożywia tekst. Porównanie zestawia dwie rzeczy (często ze słowem „jak”), a metafora mówi o jednej rzeczy tak, jakby była inną.", analogy: "To literackie filtry: pomagają czytelnikowi zobaczyć obraz lub poczuć emocję mocniej.", example: "„Lekki jak piórko” to porównanie; „morze świateł” to metafora.", quiz: "Czy w wyrażeniu „szybki jak wiatr” jest porównanie czy metafora?" },
    { keys: ["energia", "elektrycz", "obwod", "obwód", "prad", "prąd"], title: "Energia i prąd elektryczny", explain: "Prąd elektryczny to uporządkowany ruch ładunków. Żeby popłynął, obwód musi być zamknięty: źródło (np. bateria), przewody i odbiornik tworzą pełną drogę.", analogy: "Prąd w zamkniętym obwodzie przypomina wodę krążącą w szczelnej rurze napędzanej pompą.", example: "Jeśli wyłącznik jest otwarty, droga jest przerwana i żarówka nie świeci.", quiz: "Co się stanie z żarówką, gdy przerwiesz obwód?" }
  ];
  const $ = (selector) => document.querySelector(selector);
  const today = dateKey(new Date());
  let toastTimer;
  let mascotTimer;
  let mascotIdleTimer;
  let chatRequestPending = false;
  let selectedArchiveId = null;
  let weekStart = mondayOf(new Date());
  let state = { subjects: [], tasks: [], sessions: [], availability: defaultAvailability(), generated: false, archiveRetention: "off", currentChat: createConversation(), chatSessions: [] };

  const ARCHIVE_RETENTION_MS = {
    "5h": 5 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
    "90d": 90 * 24 * 60 * 60 * 1000
  };

  function createConversation(messages = []) {
    const now = new Date().toISOString();
    return { id: makeId(), title: "Nowa rozmowa", createdAt: now, updatedAt: now, messages };
  }

  function normalizeConversation(conversation) {
    if (!conversation || typeof conversation !== "object") return null;
    const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
    const normalizedMessages = messages
      .filter((item) => item && ["user", "assistant"].includes(item.role) && typeof (item.text ?? item.content) === "string")
      .slice(-40)
      .map((item) => ({ role: item.role, text: String(item.text ?? item.content).slice(0, 8000), mood: typeof item.mood === "string" ? item.mood : "idle" }));
    return {
      id: typeof conversation.id === "string" ? conversation.id : makeId(),
      title: typeof conversation.title === "string" && conversation.title.trim() ? conversation.title.slice(0, 60) : "Rozmowa z Eduo",
      createdAt: typeof conversation.createdAt === "string" ? conversation.createdAt : new Date().toISOString(),
      updatedAt: typeof conversation.updatedAt === "string" ? conversation.updatedAt : new Date().toISOString(),
      messages: normalizedMessages
    };
  }

  function conversationsFromData(parsed) {
    let currentChat = normalizeConversation(parsed.currentChat);
    let chatSessions = Array.isArray(parsed.chatSessions)
      ? parsed.chatSessions.map(normalizeConversation).filter(Boolean)
      : [];
    if (!currentChat && Array.isArray(parsed.chat)) {
      const legacyMessages = parsed.chat
        .filter((item) => item && ["user", "assistant"].includes(item.role) && typeof item.text === "string")
        .slice(-40)
        .map((item) => ({ role: item.role, text: item.text.slice(0, 8000), mood: item.mood || "idle" }));
      if (legacyMessages.length) {
        const firstQuestion = legacyMessages.find((message) => message.role === "user")?.text;
        const legacyChat = createConversation(legacyMessages);
        legacyChat.title = firstQuestion ? firstQuestion.slice(0, 48) : "Zapisana rozmowa";
        chatSessions.push(legacyChat);
      }
    }
    return { currentChat: currentChat || createConversation(), chatSessions };
  }

  function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function dateFromKey(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function addDays(date, amount) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() + amount);
    return copy;
  }

  function mondayOf(date) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
    return copy;
  }

  function defaultAvailability() {
    return Array.from({ length: 7 }, (_, index) => ({
      enabled: index < 5,
      intervals: [{ start: index < 5 ? "16:00" : "10:00", end: index < 5 ? "19:00" : "14:00" }]
    }));
  }

  function normalizeAvailability(items) {
    if (!Array.isArray(items) || items.length !== 7) throw new Error("W pliku brakuje ustawień dostępności.");
    const defaults = defaultAvailability();
    return items.map((item, index) => {
      const sourceIntervals = Array.isArray(item?.intervals)
        ? item.intervals
        : [{ start: item?.start, end: item?.end }];
      const intervals = sourceIntervals
        .filter((interval) => isTime(interval?.start) && isTime(interval?.end) && interval.start < interval.end)
        .map((interval) => ({ start: interval.start, end: interval.end }))
        .sort((a, b) => a.start.localeCompare(b.start));
      const mergedIntervals = [];
      intervals.forEach((interval) => {
        const previous = mergedIntervals.at(-1);
        if (previous && interval.start <= previous.end) {
          if (interval.end > previous.end) previous.end = interval.end;
        } else mergedIntervals.push(interval);
      });
      return {
        enabled: Boolean(item?.enabled),
        intervals: Array.isArray(item?.intervals) ? mergedIntervals : mergedIntervals.length ? mergedIntervals : defaults[index].intervals
      };
    });
  }

  function makeId() {
    return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Nie udało się zapisać planera w przeglądarce.", error);
      showToast("Nie udało się zapisać zmian. Sprawdź wolne miejsce w przeglądarce.");
    }
  }

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!parsed || !Array.isArray(parsed.subjects) || !Array.isArray(parsed.tasks)) throw new Error("Nieprawidłowy format zapisanych danych.");
      const subjects = parsed.subjects.filter((item) => item && typeof item.id === "string" && typeof item.name === "string");
      const subjectIds = new Set(subjects.map((item) => item.id));
      const oldSessions = Array.isArray(parsed.sessions) ? parsed.sessions.filter((item) => item && typeof item.id === "string" && typeof item.date === "string") : [];
      const sessionsByTask = new Map();
      oldSessions.forEach((session) => {
        if (!sessionsByTask.has(session.taskId)) sessionsByTask.set(session.taskId, []);
        sessionsByTask.get(session.taskId).push(session);
      });
      const tasks = parsed.tasks.filter((item) => item && typeof item.id === "string" && typeof item.title === "string" && subjectIds.has(item.subjectId) && Number.isFinite(item.duration))
        .map((task) => {
          const taskSessions = sessionsByTask.get(task.id) || [];
          const firstSession = taskSessions.map((session) => session.date).filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)).sort()[0];
          const legacyWeek = firstSession
            ? dateKey(mondayOf(dateFromKey(firstSession)))
            : task.due && /^\d{4}-\d{2}-\d{2}$/.test(task.due) ? dateKey(mondayOf(dateFromKey(task.due))) : dateKey(weekStart);
          return {
            ...task,
            completed: Boolean(task.completed),
            week: /^\d{4}-\d{2}-\d{2}$/.test(task.week) ? task.week : legacyWeek
          };
        });
      const taskIds = new Set(tasks.map((item) => item.id));
      const sessions = oldSessions.filter((item) => taskIds.has(item.taskId) && Number.isFinite(item.minutes))
        .map((item) => ({ ...item, completed: Boolean(item.completed) }));
      const availability = Array.isArray(parsed.availability) && parsed.availability.length === 7
        ? normalizeAvailability(parsed.availability)
        : defaultAvailability();
      state = {
        subjects,
        tasks,
        sessions,
        availability,
        generated: Boolean(parsed.generated),
        archiveRetention: ["off", ...Object.keys(ARCHIVE_RETENTION_MS)].includes(parsed.archiveRetention) ? parsed.archiveRetention : "off",
        ...conversationsFromData(parsed)
      };
    } catch (error) {
      console.error("Nie udało się odczytać danych planera.", error);
      showToast("Zapisane dane są nieprawidłowe. Rozpoczynamy nowy plan.");
    }
  }

  function isTime(value) {
    return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
  }

  function subjectFor(id) { return state.subjects.find((subject) => subject.id === id); }
  function taskFor(id) { return state.tasks.find((task) => task.id === id); }
  function minutesOf(time) { const [hours, minutes] = time.split(":").map(Number); return hours * 60 + minutes; }
  function timeLabel(value) { return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`; }
  function weekKey() { return dateKey(weekStart); }

  function completedMinutes(taskId) {
    return state.sessions.reduce((total, session) => total + (session.taskId === taskId && session.completed ? session.minutes : 0), 0);
  }

  function taskIsComplete(task) {
    return Boolean(task.completed) || completedMinutes(task.id) >= task.duration;
  }

  function taskProgressForWeek(week = weekKey()) {
    const tasks = state.tasks.filter((task) => task.week === week);
    const completed = tasks.filter(taskIsComplete).length;
    return { total: tasks.length, completed, remaining: tasks.length - completed };
  }

  function renderSubjects() {
    const list = $("#subjectsList");
    list.replaceChildren();
    if (!state.subjects.length) {
      const empty = document.createElement("li");
      empty.className = "subject-empty";
      empty.textContent = "Dodaj pierwszy przedmiot, żeby zacząć.";
      list.append(empty);
    }
    state.subjects.forEach((subject, index) => {
      const item = document.createElement("li");
      item.className = "subject-item";
      const dot = document.createElement("i");
      dot.className = "subject-dot";
      dot.style.background = subject.color || COLORS[index % COLORS.length];
      const name = document.createElement("span");
      name.className = "subject-name";
      name.textContent = subject.name;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "subject-delete";
      remove.setAttribute("aria-label", `Usuń przedmiot ${subject.name}`);
      remove.textContent = "×";
      remove.addEventListener("click", () => removeSubject(subject.id));
      item.append(dot, name, remove);
      list.append(item);
    });
    $("#subjectCount").textContent = String(state.subjects.length);
    const select = $("#taskSubject");
    const previous = select.value;
    select.replaceChildren();
    if (!state.subjects.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Najpierw dodaj przedmiot";
      select.append(option);
    } else {
      state.subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.textContent = subject.name;
        select.append(option);
      });
      if (state.subjects.some((subject) => subject.id === previous)) select.value = previous;
    }
    $("#taskForm button[type='submit']").disabled = !state.subjects.length;
    $("#taskForm button[type='submit']").style.opacity = state.subjects.length ? "1" : ".5";
  }

  function renderTasks() {
    const list = $("#tasksList");
    list.replaceChildren();
    const weeklyTasks = state.tasks.filter((task) => task.week === weekKey());
    const sorted = [...weeklyTasks].sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority) || a.title.localeCompare(b.title, "pl"));
    $("#taskCount").textContent = String(sorted.length);
    $("#listHint").textContent = sorted.length ? "Zaznacz po przerobieniu" : "Dodaj pierwsze zadanie";
    const progress = taskProgressForWeek();
    const progressPercent = progress.total ? Math.round((progress.completed / progress.total) * 100) : 0;
    const progressBox = $("#taskProgress");
    progressBox.hidden = !progress.total;
    $("#taskProgressLabel").textContent = `${progress.completed} z ${progress.total} przerobione · ${progress.remaining} do zrobienia`;
    $("#taskProgressPercent").textContent = `${progressPercent}%`;
    const progressBar = $("#taskProgressBar");
    progressBar.style.width = `${progressPercent}%`;
    progressBox.querySelector('[role="progressbar"]').setAttribute("aria-valuenow", String(progressPercent));
    if (!sorted.length) {
      const empty = document.createElement("li");
      empty.className = "empty-list";
      empty.textContent = state.subjects.length ? "Dodaj zadania powyżej — rozłożymy je w kalendarzu tego tygodnia." : "Dodaj przedmiot, a potem wpisz zadania na ten tydzień.";
      list.append(empty);
    }
    sorted.forEach((task) => {
      const item = document.createElement("li");
      const completed = taskIsComplete(task);
      item.className = `task-item${completed ? " is-complete" : ""}`;
      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.className = "task-complete-toggle";
      toggle.checked = completed;
      toggle.setAttribute("aria-label", `${completed ? "Oznacz jako do zrobienia" : "Oznacz jako przerobione"}: ${task.title}`);
      toggle.addEventListener("change", () => toggleTaskComplete(task.id));
      const main = document.createElement("div");
      main.className = "task-item-main";
      const title = document.createElement("span");
      title.className = "task-title";
      title.textContent = task.title;
      const meta = document.createElement("div");
      meta.className = "task-meta";
      const subject = document.createElement("span");
      subject.textContent = subjectFor(task.subjectId)?.name || "Przedmiot";
      const duration = document.createElement("span");
      duration.textContent = `${task.duration} min`;
      const priority = document.createElement("span");
      priority.className = "priority-label";
      priority.textContent = PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.medium;
      if (completed) {
        const finished = document.createElement("span");
        finished.className = "task-complete-label";
        finished.textContent = "Ukończone ✓";
        meta.append(subject, duration, finished);
      } else {
        meta.append(subject, duration, priority);
      }
      main.append(title, meta);
      const actions = document.createElement("div");
      actions.className = "task-actions";
      const edit = document.createElement("button");
      edit.type = "button";
      edit.setAttribute("aria-label", `Edytuj ${task.title}`);
      edit.title = "Edytuj zadanie";
      edit.textContent = "✎";
      edit.addEventListener("click", () => editTask(task.id));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete-task";
      remove.setAttribute("aria-label", `Usuń ${task.title}`);
      remove.title = "Usuń zadanie";
      remove.textContent = "×";
      remove.addEventListener("click", () => removeTask(task.id));
      actions.append(edit, remove);
      item.append(toggle, main, actions);
      list.append(item);
    });
  }

  function toggleTaskComplete(id) {
    const task = taskFor(id);
    if (!task) return;
    const completed = !taskIsComplete(task);
    task.completed = completed;
    state.sessions.forEach((session) => {
      if (session.taskId === id) session.completed = completed;
    });
    createPlan(false, task.week);
    setMascotMood(completed ? "celebrating" : "planning", 1800);
    showToast(completed ? "Materiał oznaczony jako przerobiony. Świetna robota! ✨" : "Materiał wrócił do zrobienia — plan został uaktualniony.");
  }

  function renderAvailability() {
    const list = $("#availabilityList");
    list.replaceChildren();
    state.availability.forEach((availability, index) => {
      const day = document.createElement("section");
      day.className = `availability-day${availability.enabled ? "" : " disabled"}`;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = availability.enabled;
      checkbox.id = `day-enabled-${index}`;
      checkbox.dataset.day = String(index);
      checkbox.setAttribute("aria-label", `Dostępność: ${DAY_FULL_NAMES[index]}`);
      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = DAY_FULL_NAMES[index];
      const heading = document.createElement("div");
      heading.className = "availability-day-heading";
      const dayName = document.createElement("div");
      dayName.className = "availability-day-name";
      dayName.append(checkbox, label);
      const add = document.createElement("button");
      add.type = "button";
      add.className = "availability-add";
      add.dataset.day = String(index);
      add.dataset.action = "add";
      add.textContent = "+ Dodaj godziny";
      add.setAttribute("aria-label", `Dodaj godziny nauki: ${DAY_FULL_NAMES[index]}`);
      dayName.append(add);
      heading.append(dayName);
      const intervals = document.createElement("div");
      intervals.className = "availability-intervals";
      if (!availability.intervals.length) {
        const empty = document.createElement("span");
        empty.className = "availability-empty";
        empty.textContent = "Nie dodano jeszcze godzin";
        intervals.append(empty);
      }
      availability.intervals.forEach((interval, intervalIndex) => {
        const row = document.createElement("div");
        row.className = "availability-interval";
        const start = document.createElement("input");
        start.type = "time";
        start.value = interval.start;
        start.dataset.day = String(index);
        start.dataset.interval = String(intervalIndex);
        start.dataset.field = "start";
        start.setAttribute("aria-label", `Początek przedziału ${intervalIndex + 1}: ${DAY_FULL_NAMES[index]}`);
        const separator = document.createElement("span");
        separator.className = "time-separator";
        separator.textContent = "–";
        const end = document.createElement("input");
        end.type = "time";
        end.value = interval.end;
        end.dataset.day = String(index);
        end.dataset.interval = String(intervalIndex);
        end.dataset.field = "end";
        end.setAttribute("aria-label", `Koniec przedziału ${intervalIndex + 1}: ${DAY_FULL_NAMES[index]}`);
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "availability-remove";
        remove.dataset.day = String(index);
        remove.dataset.interval = String(intervalIndex);
        remove.dataset.action = "remove";
        remove.textContent = "×";
        remove.title = "Usuń przedział";
        remove.setAttribute("aria-label", `Usuń przedział ${intervalIndex + 1}: ${DAY_FULL_NAMES[index]}`);
        row.append(start, separator, end, remove);
        intervals.append(row);
      });
      day.append(heading, intervals);
      list.append(day);
    });
  }

  function renderWeek() {
    const grid = $("#weekGrid");
    grid.replaceChildren();
    const lastDate = addDays(weekStart, 6);
    const formatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short" });
    $("#weekLabel").textContent = `${formatter.format(weekStart)} – ${formatter.format(lastDate)}`;
    $("#taskWeekHeading").textContent = `Zadania na tydzień ${formatter.format(weekStart)}`;
    const sessionsByDate = new Map();
    const selectedSessions = state.sessions.filter((session) => session.date >= weekKey() && session.date <= dateKey(lastDate));
    selectedSessions.forEach((session) => {
      if (!sessionsByDate.has(session.date)) sessionsByDate.set(session.date, []);
      sessionsByDate.get(session.date).push(session);
    });
    let weeklyMinutes = 0;
    let weeklyCount = 0;
    for (let index = 0; index < 7; index += 1) {
      const date = addDays(weekStart, index);
      const key = dateKey(date);
      const day = document.createElement("article");
      day.className = `day${key === today ? " today" : ""}`;
      const head = document.createElement("div");
      head.className = "day-head";
      const name = document.createElement("span");
      name.className = "day-name";
      name.textContent = DAY_NAMES[index];
      const number = document.createElement("span");
      number.className = "day-number";
      number.textContent = String(date.getDate());
      head.append(name, number);
      const items = document.createElement("div");
      items.className = "day-items";
      const sessions = (sessionsByDate.get(key) || []).sort((a, b) => a.start - b.start);
      if (!sessions.length) day.classList.add("no-sessions");
      sessions.forEach((session) => {
        const task = taskFor(session.taskId);
        if (!task) return;
        weeklyMinutes += session.minutes;
        weeklyCount += 1;
        const card = document.createElement("div");
        card.className = `session-card${session.completed ? " completed" : ""}`;
        const time = document.createElement("span");
        time.className = "session-time";
        time.textContent = `${timeLabel(session.start)}–${timeLabel(session.end)}`;
        const title = document.createElement("span");
        title.className = "session-title";
        title.textContent = task.title;
        const subject = document.createElement("span");
        subject.className = "session-subject";
        subject.textContent = subjectFor(task.subjectId)?.name || "Nauka";
        card.append(time, title, subject);
        const actions = document.createElement("div");
        actions.className = "session-actions";
        const complete = document.createElement("button");
        complete.type = "button";
        complete.className = "session-done";
        complete.textContent = session.completed ? "✓ Zrobione" : "Oznacz jako zrobione";
        complete.addEventListener("click", () => toggleSession(session.id));
        actions.append(complete);
        if (!session.completed) {
          const missed = document.createElement("button");
          missed.type = "button";
          missed.className = "session-missed";
          missed.textContent = "Nie udało mi się";
          missed.addEventListener("click", () => markSessionMissed(session.id));
          actions.append(missed);
        }
        card.append(actions);
        items.append(card);
      });
      if (!sessions.length) {
        const empty = document.createElement("div");
        empty.className = "empty-day";
        empty.textContent = key < today ? "Miłego dnia!" : "Chwila dla Ciebie";
        items.append(empty);
      }
      day.append(head, items);
      grid.append(day);
    }
    $("#timeStat").innerHTML = `${weeklyMinutes} <small>min w tym tygodniu</small>`;
    $("#sessionStat").innerHTML = `${weeklyCount} <small>${polishCount(weeklyCount, ["sesja", "sesje", "sesji"])}</small>`;
    const progress = taskProgressForWeek();
    $("#materialStat").innerHTML = `${progress.remaining} <small>${polishCount(progress.remaining, ["zadanie", "zadania", "zadań"])}</small>`;
    document.querySelector(".stats-grid .stat-card:first-child .stat-foot").textContent = `${progress.completed} przerobione · ${progress.remaining} zostało`;
    $("#todayLabel").textContent = `TYDZIEŃ ${formatter.format(weekStart).toLocaleUpperCase("pl-PL")} – ${formatter.format(lastDate).toLocaleUpperCase("pl-PL")}`;
  }

  function renderChat() {
    const messages = $("#chatMessages");
    messages.replaceChildren();
    $("#conversationTitle").textContent = state.currentChat.title || "Nowa rozmowa";
    if (!state.currentChat.messages.length) {
      addChatMessage("assistant", "Cześć! Jestem Eduo ✨ Napisz, co sprawia Ci trudność. Wyjaśnię temat prosto, pokażę przykład i pomogę Ci go zrozumieć.", "idle");
      return;
    }
    state.currentChat.messages.forEach((message) => addChatMessage(message.role, message.text, message.mood || "idle"));
  }

  function renderArchive() {
    if (pruneExpiredConversations()) saveState();
    const list = $("#archiveList");
    const preview = $("#archivePreview");
    list.replaceChildren();
    $("#archiveCount").textContent = String(state.chatSessions.length);
    $("#archiveCountHeading").textContent = String(state.chatSessions.length);
    if (!state.chatSessions.length) {
      const empty = document.createElement("div");
      empty.className = "empty-list";
      empty.textContent = "Nie ma tu jeszcze zapisanych rozmów. Rozpocznij nową rozmowę z Eduo, a pojawi się tutaj.";
      list.append(empty);
      preview.innerHTML = '<div class="empty-list">Wybierz rozmowę z archiwum, aby ją przeczytać.</div>';
      selectedArchiveId = null;
      return;
    }
    const conversations = [...state.chatSessions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    conversations.forEach((conversation) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `archive-item${conversation.id === selectedArchiveId ? " selected" : ""}`;
      const title = document.createElement("strong");
      title.textContent = conversation.title;
      const meta = document.createElement("span");
      const date = new Date(conversation.updatedAt);
      meta.textContent = Number.isNaN(date.getTime()) ? "Rozmowa z Eduo" : date.toLocaleString("pl-PL", { dateStyle: "medium", timeStyle: "short" });
      button.append(title, meta);
      button.addEventListener("click", () => {
        selectedArchiveId = conversation.id;
        renderArchive();
      });
      list.append(button);
    });
    const selected = conversations.find((item) => item.id === selectedArchiveId) || conversations[0];
    selectedArchiveId = selected.id;
    preview.replaceChildren();
    const heading = document.createElement("div");
    heading.className = "archive-preview-heading";
    const title = document.createElement("h3");
    title.textContent = selected.title;
    const resume = document.createElement("button");
    resume.type = "button";
    resume.className = "button button-primary";
    resume.textContent = "Kontynuuj tę rozmowę";
    resume.addEventListener("click", () => resumeArchivedConversation(selected.id));
    heading.append(title, resume);
    const transcript = document.createElement("div");
    transcript.className = "archive-transcript";
    selected.messages.forEach((message) => {
      const bubble = document.createElement("article");
      bubble.className = `archive-message ${message.role}`;
      const speaker = document.createElement("strong");
      speaker.textContent = message.role === "assistant" ? "Eduo" : "Ty";
      const text = document.createElement("p");
      text.textContent = message.text;
      bubble.append(speaker, text);
      transcript.append(bubble);
    });
    preview.append(heading, transcript);
  }

  function pruneExpiredConversations() {
    const retentionMs = ARCHIVE_RETENTION_MS[state.archiveRetention];
    if (!retentionMs) return 0;
    const cutoff = Date.now() - retentionMs;
    const previousLength = state.chatSessions.length;
    state.chatSessions = state.chatSessions.filter((conversation) => {
      const updatedAt = Date.parse(conversation.updatedAt);
      const createdAt = Date.parse(conversation.createdAt);
      const activityTime = Number.isFinite(updatedAt) ? updatedAt : createdAt;
      return !Number.isFinite(activityTime) || activityTime > cutoff;
    });
    const removed = previousLength - state.chatSessions.length;
    if (removed && state.chatSessions.some((conversation) => conversation.id === selectedArchiveId) === false) {
      selectedArchiveId = null;
    }
    return removed;
  }

  function applyArchiveRetention() {
    const removed = pruneExpiredConversations();
    if (removed) {
      saveState();
      renderArchive();
      showToast(`Automatycznie usunięto ${polishCount(removed, ["starą rozmowę", "stare rozmowy", "starych rozmów"])}.`);
    }
  }

  function archiveCurrentConversation() {
    if (!state.currentChat.messages.length) return;
    state.currentChat.updatedAt = new Date().toISOString();
    state.chatSessions.push(state.currentChat);
  }

  function startNewConversation() {
    if (chatRequestPending) return;
    archiveCurrentConversation();
    state.currentChat = createConversation();
    selectedArchiveId = null;
    saveState();
    renderChat();
    renderArchive();
    switchView("tutor");
    $("#chatInput").focus();
  }

  function resumeArchivedConversation(id) {
    if (chatRequestPending) {
      showToast("Poczekaj, aż Eduo dokończy odpowiedź.");
      return;
    }
    const index = state.chatSessions.findIndex((conversation) => conversation.id === id);
    if (index < 0) return;
    archiveCurrentConversation();
    state.currentChat = state.chatSessions.splice(index, 1)[0];
    selectedArchiveId = null;
    saveState();
    renderChat();
    renderArchive();
    switchView("tutor");
  }

  function switchView(name) {
    const validViews = new Set(["dashboard", "materials", "availability", "tutor", "archive"]);
    const viewName = validViews.has(name) ? name : "dashboard";
    document.querySelectorAll(".app-view").forEach((view) => view.classList.toggle("active-view", view.id === `view-${viewName}`));
    document.querySelectorAll(".main-nav .nav-link").forEach((link) => link.classList.toggle("active", link.dataset.view === viewName));
    const activeLink = document.querySelector(`.main-nav .nav-link[data-view="${viewName}"]`);
    const label = activeLink?.cloneNode(true);
    label?.querySelectorAll(".nav-icon, .nav-count").forEach((element) => element.remove());
    $(".breadcrumb strong").textContent = label?.textContent.trim() || "Mój tydzień";
    if (window.location.hash !== `#${viewName}`) history.replaceState(null, "", `#${viewName}`);
  }

  function setMascotMood(mood, duration = 0) {
    const mascot = $("#mascotHome");
    clearTimeout(mascotTimer);
    clearTimeout(mascotIdleTimer);
    mascot.className = `tutor-avatar mascot--${mood}`;
    if (duration) mascotTimer = setTimeout(() => setMascotMood("idle"), duration);
    else if (mood === "idle") scheduleMascotGesture();
  }

  function scheduleMascotGesture() {
    clearTimeout(mascotIdleTimer);
    if (document.hidden) return;
    mascotIdleTimer = setTimeout(() => {
      const mascot = $("#mascotHome");
      if (!mascot.classList.contains("mascot--idle")) return;
      mascot.classList.add("mascot--curious");
      setTimeout(() => mascot.classList.remove("mascot--curious"), 1700);
      scheduleMascotGesture();
    }, 4200 + Math.random() * 5200);
  }

  function makeMascot() {
    return $("#mascotTemplate").content.firstElementChild.cloneNode(true);
  }

  function startWelcomeIntro() {
    const welcome = $("#nexiWelcome");
    const mascot = $("#nexiIntroMascot");
    const moodLine = $("#nexiMoodLine");
    const moods = [
      { name: "thinking", text: "Hmm… czego dziś razem się nauczymy?" },
      { name: "curious", text: "O, nowy temat! Już nie mogę się doczekać." },
      { name: "explaining", text: "Znam sposób, żeby wyjaśnić to prosto." },
      { name: "celebrating", text: "Każdy mały krok to powód do dumy!" },
      { name: "motivating", text: "Dasz radę — będę Ci kibicować." }
    ];
    let moodIndex = 0;
    let isClosing = false;
    const showMood = () => {
      const mood = moods[moodIndex];
      mascot.className = `tutor-avatar mascot--${mood.name}`;
      moodLine.textContent = mood.text;
      moodIndex = (moodIndex + 1) % moods.length;
    };
    const moodTimer = setInterval(showMood, 2200);
    const closeIntro = () => {
      if (isClosing) return;
      isClosing = true;
      clearInterval(moodTimer);
      document.body.classList.remove("intro-open");
      welcome.classList.add("nexi-welcome--leaving");
      welcome.setAttribute("aria-hidden", "true");
      setTimeout(() => {
        welcome.hidden = true;
        $("#appShell").inert = false;
        document.querySelector('.main-nav .nav-link[data-view="dashboard"]').focus();
      }, 500);
    };
    $("#enterPlanner").addEventListener("click", closeIntro, { once: true });
    welcome.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeIntro();
    });
    $("#enterPlanner").focus();
  }

  function addChatMessage(role, text, mood) {
    const messages = $("#chatMessages");
    const bubble = document.createElement("div");
    bubble.className = `chat-message ${role}`;
    if (role === "assistant") {
      bubble.classList.add(mood || "idle");
      const icon = document.createElement("span");
      icon.className = "message-mascot";
      icon.setAttribute("aria-hidden", "true");
      icon.append(makeMascot());
      bubble.append(icon);
    }
    const copy = document.createElement("div");
    copy.className = "message-copy";
    const speaker = document.createElement("span");
    speaker.className = "chat-speaker";
    speaker.textContent = role === "assistant" ? "Eduo" : "Ty";
    const content = document.createElement("p");
    content.textContent = text;
    copy.append(speaker, content);
    bubble.append(copy);
    messages.append(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function renderAll() {
    renderSubjects();
    renderTasks();
    renderAvailability();
    renderWeek();
    renderChat();
    $("#archiveRetention").value = state.archiveRetention;
    renderArchive();
  }

  function createPlan(showFeedback = true, targetWeek = weekKey(), extraBusy = []) {
    setMascotMood("planning", 1600);
    const weekEnd = dateKey(addDays(dateFromKey(targetWeek), 6));
    const locked = state.sessions.filter((session) => {
      const task = taskFor(session.taskId);
      return task && task.week === targetWeek && session.completed;
    });
    const outsideWeek = state.sessions.filter((session) => {
      const task = taskFor(session.taskId);
      return !task || task.week !== targetWeek;
    });
    const reservedByDate = new Map();
    [...locked, ...extraBusy].forEach((session) => {
      if (!reservedByDate.has(session.date)) reservedByDate.set(session.date, []);
      reservedByDate.get(session.date).push([session.start, session.end]);
    });
    const remaining = new Map();
    state.tasks.forEach((task) => remaining.set(task.id, taskIsComplete(task) ? 0 : Math.max(0, task.duration - completedMinutes(task.id))));
    const pending = state.tasks.filter((task) => task.week === targetWeek && !taskIsComplete(task) && (remaining.get(task.id) || 0) > 0);
    pending.sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority) || a.title.localeCompare(b.title, "pl"));
    const generated = [];
    const startDate = dateFromKey(targetWeek) < dateFromKey(today) ? dateFromKey(today) : dateFromKey(targetWeek);
    for (let date = startDate; dateKey(date) <= weekEnd; date = addDays(date, 1)) {
      const key = dateKey(date);
      const dayIndex = (date.getDay() + 6) % 7;
      const availability = state.availability[dayIndex];
      if (!availability.enabled || !availability.intervals.length) continue;
      const busy = reservedByDate.get(key) || [];
      const dayTasks = new Set();
      const now = new Date();
      const currentMinutes = key === today ? now.getHours() * 60 + now.getMinutes() : 0;
      for (const interval of availability.intervals) {
        const end = minutesOf(interval.end);
        if (key === today && end <= currentMinutes) continue;
        let slotStart = minutesOf(interval.start);
        if (key === today) {
          slotStart = Math.max(slotStart, Math.ceil(currentMinutes / 60) * 60);
        }
        while (slotStart < end) {
          const slotEnd = Math.min(slotStart + 50, end);
          const conflict = busy.some(([busyStart, busyEnd]) => slotStart < busyEnd + 10 && slotEnd + 10 > busyStart);
          if (slotEnd > slotStart && !conflict) {
            const eligible = pending.filter((task) => (remaining.get(task.id) || 0) > 0);
            if (!eligible.length) break;
            const task = eligible.find((candidate) => !dayTasks.has(candidate.id)) || eligible[0];
            const duration = Math.min(slotEnd - slotStart, remaining.get(task.id));
            generated.push({ id: makeId(), taskId: task.id, date: key, start: slotStart, end: slotStart + duration, minutes: duration, completed: false });
            remaining.set(task.id, remaining.get(task.id) - duration);
            dayTasks.add(task.id);
            busy.push([slotStart, slotStart + duration]);
          }
          slotStart += 60;
        }
      }
    }
    state.sessions = [...outsideWeek, ...locked, ...generated];
    state.generated = true;
    saveState();
    renderAll();
    const unscheduled = pending.filter((task) => (remaining.get(task.id) || 0) > 0);
    if (showFeedback) {
      if (unscheduled.length) {
        $("#planMessage").className = "plan-message warning";
        $("#planMessage").textContent = `Brakuje czasu na ${unscheduled.length} ${polishCount(unscheduled.length, ["zadanie", "zadania", "zadań"])}. Dodaj wolne godziny lub przenieś zadanie na inny tydzień.`;
        showToast("Plan zaktualizowany — nie wszystko zmieściło się w tym tygodniu.");
      } else if (generated.length || locked.length) {
        $("#planMessage").className = "plan-message";
        const sessionCount = generated.length + locked.length;
        $("#planMessage").textContent = `Gotowe! W planie są ${sessionCount} ${polishCount(sessionCount, ["sesja", "sesje", "sesji"])} nauki rozłożone na Twoje wolne terminy.`;
        showToast("Twój plan tygodnia jest gotowy ✦");
      } else {
        $("#planMessage").className = "plan-message";
        $("#planMessage").textContent = pending.length ? "Nie ma już wolnych okien w tym tygodniu. Zmień dostępność." : "Dodaj zadania, a ułożymy plan dopasowany do Twojego tygodnia.";
        showToast(pending.length ? "Brak wolnych okien — zmień dostępność." : "Dodaj zadania, aby ułożyć plan.");
      }
    } else {
      $("#planMessage").className = "plan-message";
      $("#planMessage").textContent = "";
    }
    return unscheduled.length;
  }

  function replanAllWeeks() {
    const weeks = [...new Set(state.tasks.map((task) => task.week))].sort();
    weeks.forEach((week) => createPlan(false, week));
    renderAll();
  }

  function priorityRank(priority) { return priority === "high" ? 2 : priority === "medium" ? 1 : 0; }

  function polishCount(number, forms) {
    const lastTwo = number % 100;
    const last = number % 10;
    if (number === 1) return forms[0];
    return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? forms[1] : forms[2];
  }

  function openSubjectDialog() {
    const dialog = $("#subjectDialog");
    $("#subjectName").value = "";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else {
      const name = window.prompt("Podaj nazwę przedmiotu:");
      if (name) addSubject(name);
    }
    if (dialog.open) $("#subjectName").focus();
  }

  function addSubject(name) {
    const cleanName = name.trim().replace(/\s+/g, " ");
    if (!cleanName) return;
    if (state.subjects.some((subject) => subject.name.toLocaleLowerCase("pl-PL") === cleanName.toLocaleLowerCase("pl-PL"))) {
      showToast("Ten przedmiot jest już na Twojej liście.");
      return;
    }
    state.subjects.push({ id: makeId(), name: cleanName, color: COLORS[state.subjects.length % COLORS.length] });
    saveState();
    renderAll();
    showToast(`Dodano przedmiot: ${cleanName}`);
  }

  function removeSubject(id) {
    const subject = subjectFor(id);
    if (!subject) return;
    const linked = state.tasks.filter((task) => task.subjectId === id);
    if (!window.confirm(linked.length ? `Usunąć przedmiot „${subject.name}” i ${linked.length} przypisanych zadań?` : `Usunąć przedmiot „${subject.name}”?`)) return;
    const taskIds = new Set(linked.map((task) => task.id));
    state.subjects = state.subjects.filter((item) => item.id !== id);
    state.tasks = state.tasks.filter((task) => task.subjectId !== id);
    state.sessions = state.sessions.filter((session) => !taskIds.has(session.taskId));
    saveState();
    renderAll();
  }

  function addTask(event) {
    event.preventDefault();
    const title = $("#taskTitle").value.trim();
    const subjectId = $("#taskSubject").value;
    if (!title || !subjectFor(subjectId)) {
      showToast("Wpisz zadanie i wybierz przedmiot.");
      return;
    }
    const task = { id: makeId(), title, subjectId, week: weekKey(), duration: Number($("#taskDuration").value), priority: $("#taskPriority").value, completed: false };
    state.tasks.push(task);
    $("#taskTitle").value = "";
    createPlan(true);
  }

  function editTask(id) {
    const task = taskFor(id);
    if (!task) return;
    const title = window.prompt("Zmień nazwę zadania:", task.title);
    if (title === null) return;
    const cleanTitle = title.trim();
    if (!cleanTitle) return showToast("Nazwa zadania nie może być pusta.");
    task.title = cleanTitle;
    saveState();
    renderAll();
    showToast("Zaktualizowano zadanie.");
  }

  function removeTask(id) {
    const task = taskFor(id);
    if (!task || !window.confirm(`Usunąć zadanie „${task.title}” i jego sesje z planu?`)) return;
    state.tasks = state.tasks.filter((item) => item.id !== id);
    state.sessions = state.sessions.filter((session) => session.taskId !== id);
    saveState();
    renderAll();
  }

  function toggleSession(id) {
    const session = state.sessions.find((item) => item.id === id);
    if (!session) return;
    session.completed = !session.completed;
    if (!session.completed) {
      const task = taskFor(session.taskId);
      if (task) task.completed = false;
    }
    createPlan(false, weekKey());
    if (session.completed) {
      setMascotMood("celebrating", 1800);
      showToast("Eduo świętuje razem z Tobą — świetna robota! 🎉");
    } else showToast("Sesja wróciła do planu.");
  }

  function markSessionMissed(id) {
    const session = state.sessions.find((item) => item.id === id);
    if (!session) return;
    const task = taskFor(session.taskId);
    if (!task) return;
    const blockedTime = { date: session.date, start: session.start, end: session.end };
    state.sessions = state.sessions.filter((item) => item.id !== id);
    const overflow = createPlan(false, task.week, [blockedTime]);
    showToast(overflow ? "Przeniesiono zadanie — w tym tygodniu brakuje już wolnego czasu." : "Nie szkodzi — zadanie ma nowy termin w Twoim planie.");
  }

  function updateAvailability(event) {
    const target = event.target;
    const index = Number(target.dataset.day);
    if (!Number.isInteger(index) || !state.availability[index]) return;
    const entry = state.availability[index];
    if (target.type === "checkbox") entry.enabled = target.checked;
    else if (target.dataset.field === "start" || target.dataset.field === "end") {
      const intervalIndex = Number(target.dataset.interval);
      const interval = entry.intervals[intervalIndex];
      if (!Number.isInteger(intervalIndex) || !interval) return;
      const field = target.dataset.field;
      const updatedInterval = { ...interval, [field]: target.value };
      const overlaps = entry.intervals.some((other, otherIndex) =>
        otherIndex !== intervalIndex && updatedInterval.start < other.end && updatedInterval.end > other.start
      );
      if (!isTime(updatedInterval.start) || !isTime(updatedInterval.end) || updatedInterval.start >= updatedInterval.end || overlaps) {
        showToast(overlaps ? "Przedziały w jednym dniu nie mogą na siebie nachodzić." : "Godzina końca musi być późniejsza niż godzina początku.");
        renderAvailability();
        return;
      }
      entry.intervals[intervalIndex] = updatedInterval;
    } else return;
    saveAvailabilityChange();
  }

  function addAvailabilityInterval(dayIndex) {
    const day = state.availability[dayIndex];
    if (!day) return;
    const sorted = [...day.intervals].sort((a, b) => a.start.localeCompare(b.start));
    const candidates = [];
    if (sorted.length) {
      const latestEnd = minutesOf(sorted.at(-1).end);
      if (latestEnd < 22 * 60) candidates.push(latestEnd);
    }
    candidates.push(19 * 60, 10 * 60, 13 * 60);
    for (let start = 7 * 60; start <= 22 * 60; start += 30) candidates.push(start);
    const start = candidates.find((candidate) => {
      const end = candidate + 60;
      return end <= 23 * 60 && sorted.every((interval) => end <= minutesOf(interval.start) || candidate >= minutesOf(interval.end));
    });
    if (start === undefined) {
      showToast("Nie ma już miejsca na kolejny przedział godzin w tym dniu.");
      return;
    }
    day.intervals.push({ start: timeLabel(start), end: timeLabel(start + 60) });
    day.intervals.sort((a, b) => a.start.localeCompare(b.start));
    day.enabled = true;
    saveAvailabilityChange();
  }

  function removeAvailabilityInterval(dayIndex, intervalIndex) {
    const day = state.availability[dayIndex];
    if (!day || !day.intervals[intervalIndex]) return;
    day.intervals.splice(intervalIndex, 1);
    saveAvailabilityChange();
  }

  function saveAvailabilityChange() {
    saveState();
    if (state.generated) replanAllWeeks();
    else renderAll();
    showToast("Zapisano Twoją dostępność i uaktualniono plan.");
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ version: 3, ...state }, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `moj-plan-nauki-${today}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("Zapisano kopię Twojego planu.");
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || !Array.isArray(parsed.subjects) || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.availability)) throw new Error("Plik nie zawiera danych planera.");
        const subjects = parsed.subjects.filter((item) => item && typeof item.id === "string" && typeof item.name === "string");
        const subjectIds = new Set(subjects.map((item) => item.id));
        const tasks = parsed.tasks.filter((item) => item && typeof item.id === "string" && typeof item.title === "string" && subjectIds.has(item.subjectId) && Number.isFinite(item.duration))
          .map((task) => ({ ...task, week: /^\d{4}-\d{2}-\d{2}$/.test(task.week) ? task.week : dateKey(mondayOf(task.due ? dateFromKey(task.due) : new Date())) }));
        const taskIds = new Set(tasks.map((item) => item.id));
        const sessions = Array.isArray(parsed.sessions) ? parsed.sessions.filter((item) => item && typeof item.id === "string" && taskIds.has(item.taskId) && typeof item.date === "string" && Number.isFinite(item.minutes)).map((item) => ({ ...item, completed: Boolean(item.completed) })) : [];
        const availability = normalizeAvailability(parsed.availability.slice(0, 7));
        if (!window.confirm("Import zastąpi aktualne przedmioty, zadania i plan. Kontynuować?")) return;
        state = {
          subjects,
          tasks,
          sessions,
          availability,
          generated: Boolean(parsed.generated),
          archiveRetention: ["off", ...Object.keys(ARCHIVE_RETENTION_MS)].includes(parsed.archiveRetention) ? parsed.archiveRetention : "off",
          ...conversationsFromData(parsed)
        };
        saveState();
        renderAll();
        showToast("Wczytano Twój plan nauki.");
      } catch (error) {
        console.error("Nie udało się zaimportować planu.", error);
        showToast("Nie udało się wczytać pliku. Sprawdź, czy to poprawny eksport planera.");
      }
    };
    reader.onerror = () => showToast("Nie udało się odczytać wybranego pliku.");
    reader.readAsText(file);
  }

  async function checkAiStatus() {
    const badge = $("#aiStatus");
    try {
      const response = await fetch("/api/status");
      if (!response.ok) throw new Error("Status serwera jest niedostępny.");
      const status = await response.json();
      badge.textContent = status.configured ? "Eduo jest gotowe" : "Brak klucza AI na serwerze";
      badge.classList.toggle("unavailable", !status.configured);
    } catch (error) {
      badge.textContent = "Serwer Eduo niedostępny";
      badge.classList.add("unavailable");
    }
  }

  async function sendChat(event, suggestedText) {
    event?.preventDefault();
    const input = $("#chatInput");
    const question = (suggestedText || input.value).trim();
    if (!question || chatRequestPending) return;
    const normalized = question.toLocaleLowerCase("pl-PL");
    const isMotivation = /motyw|zachęć|zachec|dasz radę|dam radę|dopinguj/.test(normalized);
    state.currentChat.messages.push({ role: "user", text: question, mood: "idle" });
    if (state.currentChat.title === "Nowa rozmowa") state.currentChat.title = question.slice(0, 48);
    state.currentChat.updatedAt = new Date().toISOString();
    input.value = "";
    chatRequestPending = true;
    $("#sendChatBtn").disabled = true;
    $("#newChatBtn").disabled = true;
    saveState();
    renderChat();
    setMascotMood("thinking");
    addChatMessage("assistant", "Już nad tym myślę…", "thinking");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: state.currentChat.messages.slice(-20).map(({ role, text }) => ({ role, content: text })) })
      });
      const result = await response.json().catch(() => null);
      if (!result || typeof result !== "object") throw new Error("Serwer Eduo nie zwrócił odpowiedzi w oczekiwanym formacie.");
      if (!response.ok) throw new Error(result.error || "Nie udało się uzyskać odpowiedzi.");
      if (typeof result.reply !== "string" || !result.reply.trim()) throw new Error("Eduo zwróciło pustą odpowiedź. Spróbuj ponownie.");
      const mood = isMotivation ? "motivating" : "explaining";
      state.currentChat.messages.push({ role: "assistant", text: result.reply.trim(), mood });
      state.currentChat.updatedAt = new Date().toISOString();
      saveState();
      renderChat();
      renderArchive();
      setMascotMood(mood, 1800);
    } catch (error) {
      console.error("Nie udało się uzyskać odpowiedzi Eduo.", error);
      renderChat();
      addChatMessage("assistant", `${error.message} Sprawdź, czy serwer działa i czy ustawiono OPENAI_API_KEY.`, "thinking");
      setMascotMood("thinking", 1800);
    } finally {
      chatRequestPending = false;
      $("#sendChatBtn").disabled = false;
      $("#newChatBtn").disabled = false;
      input.focus();
    }
  }

  $("#subjectForm").addEventListener("submit", (event) => {
    event.preventDefault();
    addSubject($("#subjectName").value);
    $("#subjectDialog").close();
  });
  $("#cancelSubject").addEventListener("click", () => $("#subjectDialog").close());
  $("#addSubjectShortcut").addEventListener("click", openSubjectDialog);
  $("#addSubjectInline").addEventListener("click", openSubjectDialog);
  $("#taskForm").addEventListener("submit", addTask);
  $("#generatePlan").addEventListener("click", () => createPlan(true));
  $("#previousWeek").addEventListener("click", () => {
    weekStart = addDays(weekStart, -7);
    renderTasks();
    renderWeek();
  });
  $("#nextWeek").addEventListener("click", () => {
    weekStart = addDays(weekStart, 7);
    renderTasks();
    renderWeek();
  });
  $("#availabilityList").addEventListener("change", updateAvailability);
  $("#availabilityList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const dayIndex = Number(button.dataset.day);
    if (button.dataset.action === "add") addAvailabilityInterval(dayIndex);
    else if (button.dataset.action === "remove") removeAvailabilityInterval(dayIndex, Number(button.dataset.interval));
  });
  $("#exportBtn").addEventListener("click", exportData);
  $("#importBtn").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importData(file);
    event.target.value = "";
  });
  $("#chatForm").addEventListener("submit", (event) => sendChat(event));
  $("#newChatBtn").addEventListener("click", startNewConversation);
  $("#archiveRetention").addEventListener("change", (event) => {
    const selected = event.target.value;
    state.archiveRetention = ["off", ...Object.keys(ARCHIVE_RETENTION_MS)].includes(selected) ? selected : "off";
    applyArchiveRetention();
    saveState();
    renderArchive();
    const labels = { off: "wyłączone", "90d": "90 dni", "30d": "30 dni", "7d": "7 dni", "5h": "5 godzin" };
    showToast(`Automatyczne usuwanie: ${labels[state.archiveRetention]}.`);
  });
  document.querySelectorAll(".chat-suggestions button").forEach((button) => {
    button.addEventListener("click", () => sendChat(null, button.dataset.prompt));
  });
  document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      switchView(link.dataset.view);
    });
  });
  window.addEventListener("hashchange", () => switchView(window.location.hash.slice(1)));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearTimeout(mascotIdleTimer);
    else if ($("#mascotHome").classList.contains("mascot--idle")) scheduleMascotGesture();
  });

  loadState();
  $("#nexiIntroMascot").append(makeMascot());
  $("#mascotHome").append(makeMascot());
  startWelcomeIntro();
  applyArchiveRetention();
  scheduleMascotGesture();
  renderAll();
  setInterval(applyArchiveRetention, 60 * 1000);
  switchView(window.location.hash.slice(1));
  checkAiStatus();
  if (state.generated && !state.sessions.some((session) => {
    const task = taskFor(session.taskId);
    return task && task.week === weekKey() && !session.completed;
  }) && state.tasks.some((task) => task.week === weekKey() && completedMinutes(task.id) < task.duration)) {
    $("#planMessage").textContent = "W tym tygodniu nie ma już sesji w planie. Kliknij „Odśwież plan”, aby znaleźć wolne terminy.";
  }
})();
