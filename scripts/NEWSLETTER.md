# Protokół T1 na stronie

Wydanie na stronie to mail z MailerLite 1:1, publikowany tydzień po wysyłce.

## Gdzie co jest

- `public/newsletter/index.html` – archiwum (lista wydań między znacznikami `WYDANIA:START/END` jest generowana)
- `public/newsletter/<plik>.html` – strony wydań, generowane ze skryptu
- `public/newsletter/newsletter.css`, `zapis.js`, `dziekuje.html` – wygląd, formularz zapisu, podziękowanie
- `public/newsletter/img/` – obrazki przeniesione z serwera MailerLite
- `newsletter/wydania.json` – lista wydań; z niej czyta też sekcja „Protokół T1” na stronie głównej (3 najnowsze)

## Nowe wydanie (co tydzień)

1. Znajdź ID wysłanej kampanii w MailerLite (adres kampanii w panelu albo API).
2. Uruchom:

```bash
python3 scripts/nowe-wydanie.py --kampania <ID> --nr <numer> --env-file ~/Desktop/Asystenci/.env
```

   Domyślnie: tytuł = temat maila bez emoji, zajawka = preheader, data na stronie = wysyłka + 7 dni.
   Każde z tych pól można nadpisać: `--tytul`, `--opis`, `--data-www RRRR-MM-DD`.
3. Sprawdź lokalnie (`npm run build`, potem podgląd `dist/`), commit i push.

Bez `--nr` mail trafia do sekcji „Z wcześniejszych listów”.

Skrypt obsługuje tylko obecny szablon maila (od października 2026). Starszy mail odrzuca z komunikatem,
żeby na stronę nie trafiła połamana wersja.

## Zapis

Formularze w archiwum i wydaniach wysyłają e-mail do `/.netlify/functions/newsletter`
(ta sama funkcja i grupa MailerLite co formularz na stronie głównej), potem przenoszą na `/newsletter/dziekuje.html`.
