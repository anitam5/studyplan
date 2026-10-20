# Edukuj

## Uruchomienie

Wymagany jest Node.js 20.6 lub nowszy.

1. Skopiuj `.env.example` do `.env`.
2. Wpisz swój klucz API do `OPENAI_API_KEY` w pliku `.env`. Klucz pozostaje po stronie serwera i nie trafia do przeglądarki.
3. Opcjonalnie zmień `OPENAI_MODEL`, `OPENAI_BASE_URL` lub `PORT`.
4. Uruchom `npm start` w folderze projektu i otwórz adres wyświetlony w terminalu.

Przy pierwszym uruchomieniu pojawi się ekran powitalny Nexi. Wybierz „Zaczynamy”, aby przejść do planera. Nexi zmienia mimikę i nastrój podczas powitania.

Bez `OPENAI_API_KEY` planer i zapisane rozmowy nadal działają, ale Nexi nie może wygenerować odpowiedzi. Dostawca AI może naliczać opłaty za użycie API; klucz i warunki korzystania z usługi są zarządzane niezależnie od aplikacji.

## Prywatność

Przedmioty, zadania, plan i archiwum rozmów są przechowywane w pamięci lokalnej przeglądarki. Treść pytania oraz kontekst bieżącej rozmowy są wysyłane z serwera do dostawcy zgodnego z OpenAI, skonfigurowanego w `.env`. Nie wpisuj do czatu danych osobowych ani informacji poufnych.

W zakładce archiwum możesz ustawić automatyczne usuwanie zapisanych rozmów po 5 godzinach, 7, 30 lub 90 dniach od ostatniej aktywności albo je wyłączyć. Wygasłe rozmowy są usuwane przy uruchomieniu aplikacji, otwarciu archiwum i podczas korzystania z aplikacji.
