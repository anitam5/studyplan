import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

const ROOT = process.cwd();
const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.OPENAI_API_KEY?.trim();
const MODEL = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
const API_BASE_URL = (process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/+$/, "");
const MAX_BODY_SIZE = 128 * 1024;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(JSON.stringify(data));
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_SIZE) throw new HttpError(413, "Wiadomość jest zbyt długa.");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new HttpError(400, "Nieprawidłowy format żądania.");
  }
}

function validateMessages(body) {
  if (!body || !Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > MAX_MESSAGES) {
    throw new HttpError(400, "Rozmowa zawiera nieprawidłową liczbę wiadomości.");
  }
  const messages = body.messages.map((message) => {
    if (!message || !["user", "assistant"].includes(message.role) || typeof message.content !== "string") {
      throw new HttpError(400, "Wiadomość ma nieprawidłowy format.");
    }
    const content = message.content.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) {
      throw new HttpError(400, "Wiadomość musi mieć od 1 do 4000 znaków.");
    }
    return { role: message.role, content };
  });
  if (messages.at(-1).role !== "user") throw new HttpError(400, "Ostatnia wiadomość musi pochodzić od ucznia.");
  return messages;
}

async function chat(request, response) {
  const body = await readJson(request);
  const messages = validateMessages(body);
  if (!API_KEY) {
    sendJson(response, 503, { error: "Nexi nie jest jeszcze skonfigurowana. Dodaj OPENAI_API_KEY do pliku .env i uruchom serwer ponownie." });
    return;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);
  try {
    const providerResponse = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.5,
        max_tokens: 1400,
        messages: [
          {
            role: "system",
            content: "Jesteś Nexi, cierpliwą i przyjazną polską nauczycielką dla uczniów szkoły podstawowej i ponadpodstawowej. Pomagasz z przedmiotami szkolnymi na dowolnym poziomie. Odpowiadaj po polsku, chyba że uczeń wyraźnie prosi o inny język. Wyjaśniaj trudne zagadnienia krok po kroku, dopasuj poziom do pytania, używaj krótkich przykładów i zachęcaj do samodzielnego myślenia. Jeśli poziom lub treść zadania są niejasne, zadaj krótkie pytanie doprecyzowujące. Nie wymyślaj faktów; przy niepewności powiedz o niej. Nie rozwiązuj bezrefleksyjnie całej pracy domowej — pokaż rozumowanie i wspieraj naukę. Bądź życzliwa, zwięzła i bezpieczna dla młodej osoby; nie proś o dane osobowe."
          },
          ...messages
        ]
      })
    });
    if (!providerResponse.ok) {
      console.error(`Dostawca AI zwrócił status ${providerResponse.status}.`);
      sendJson(response, 502, { error: "Dostawca AI nie odpowiedział poprawnie. Spróbuj ponownie za chwilę." });
      return;
    }
    const result = await providerResponse.json();
    const reply = result?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      console.error("Dostawca AI zwrócił odpowiedź bez treści.");
      sendJson(response, 502, { error: "Nexi nie otrzymała odpowiedzi. Spróbuj ponownie." });
      return;
    }
    sendJson(response, 200, { reply: reply.trim() });
  } catch (error) {
    if (error.name === "AbortError") {
      sendJson(response, 504, { error: "Nexi potrzebuje więcej czasu. Spróbuj ponownie." });
      return;
    }
    console.error("Nie udało się połączyć z dostawcą AI:", error.message);
    sendJson(response, 502, { error: "Nie udało się połączyć z dostawcą AI. Sprawdź połączenie i spróbuj ponownie." });
  } finally {
    clearTimeout(timeout);
  }
}

async function serveStatic(pathname, response) {
  const files = new Map([
    ["/", "index.html"],
    ["/index.html", "index.html"],
    ["/app.js", "app.js"],
    ["/style.css", "style.css"]
  ]);
  const filename = files.get(pathname);
  if (!filename) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" });
    response.end("Nie znaleziono strony.");
    return;
  }
  const filePath = resolve(ROOT, filename);
  if (!filePath.startsWith(`${ROOT}${sep}`)) {
    response.writeHead(403);
    response.end();
    return;
  }
  try {
    const content = await readFile(filePath);
    const contentType = filename.endsWith(".html") ? "text/html; charset=utf-8"
      : filename.endsWith(".js") ? "text/javascript; charset=utf-8" : "text/css; charset=utf-8";
    response.writeHead(200, {
      "Content-Type": contentType,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY"
    });
    response.end(content);
  } catch (error) {
    console.error(`Nie udało się odczytać pliku ${filename}:`, error.message);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Nie udało się wczytać aplikacji.");
  }
}

const server = createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    sendJson(response, 400, { error: "Nieprawidłowy adres żądania." });
    return;
  }
  if (pathname === "/api/status" && request.method === "GET") {
    sendJson(response, 200, { configured: Boolean(API_KEY) });
    return;
  }
  if (pathname === "/api/chat" && request.method === "POST") {
    try {
      await chat(request, response);
    } catch (error) {
      if (error instanceof HttpError) {
        sendJson(response, error.status, { error: error.message });
        return;
      }
      console.error("Nieoczekiwany błąd obsługi czatu:", error.message);
      sendJson(response, 500, { error: "Wystąpił błąd serwera. Spróbuj ponownie." });
    }
    return;
  }
  if (pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "Nie znaleziono punktu API." });
    return;
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  await serveStatic(pathname, response);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Edukuj działa na http://127.0.0.1:${PORT}`);
  if (!API_KEY) console.warn("Brak OPENAI_API_KEY — czat Nexi nie będzie dostępny do czasu konfiguracji.");
});
