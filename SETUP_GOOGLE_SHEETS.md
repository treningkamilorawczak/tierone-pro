# 📧 Konfiguracja Google Sheets - Zapis Maili Newsletter

Kompletna instrukcja podłączenia formularza do Google Sheets (100% DARMOWE).

---

## 🎯 KROK 1: Utwórz Google Sheet

1. Otwórz [Google Sheets](https://sheets.google.com)
2. Kliknij **"+ Pusty arkusz"**
3. Nazwij arkusz: **"TierOne Newsletter"**
4. W pierwszym wierszu (nagłówki) wpisz:
   - **A1**: `Data`
   - **B1**: `Email`
   - **C1**: `Status`

### ✅ Powinno wyglądać tak:
```
| Data | Email | Status |
|------|-------|--------|
```

---

## 🎯 KROK 2: Dodaj Google Apps Script

1. W Google Sheet: kliknij **Rozszerzenia → Apps Script**
2. Usuń domyślny kod `function myFunction() {...}`
3. Otwórz plik `google-apps-script.js` z tego projektu
4. **Skopiuj CAŁY kod** z pliku i wklej do Apps Script
5. Kliknij **Zapisz** (ikona dyskietki)
6. Nazwij projekt: **"TierOne Newsletter API"**

---

## 🎯 KROK 3: Wdróż jako Web App

1. W Apps Script kliknij **Wdróż → Nowe wdrożenie**
2. Kliknij ikonę ⚙️ obok "Wybierz typ"
3. Wybierz **"Aplikacja internetowa"**
4. Ustaw:
   - **Opis**: `Newsletter API v1`
   - **Wykonaj jako**: **Ja** (twoje konto)
   - **Kto ma dostęp**: **Wszyscy** ⚠️ (to ważne!)
5. Kliknij **Wdróż**
6. Jeśli pojawi się ostrzeżenie:
   - Kliknij **"Autoryzuj dostęp"**
   - Wybierz swoje konto Google
   - Kliknij **"Zaawansowane"**
   - Kliknij **"Przejdź do TierOne Newsletter API"**
   - Kliknij **"Zezwól"**

### ✅ Skopiuj URL wdrożenia
Po wdrożeniu zobaczysz URL typu:
```
https://script.google.com/macros/s/AKfycby...xyz.../exec
```

**SKOPIUJ TEN URL!** 📋

---

## 🎯 KROK 4: Skonfiguruj Projekt

1. Otwórz plik `.env` w głównym folderze projektu
2. Wklej URL z kroku 3:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycby...xyz.../exec
   ```
3. Zapisz plik

---

## 🎯 KROK 5: Restart Serwera Deweloperskiego

**W terminalu:**

1. Zatrzymaj serwer (Ctrl+C)
2. Uruchom ponownie:
   ```bash
   npm run dev
   ```

---

## ✅ TEST: Sprawdź czy działa

1. Otwórz stronę: http://localhost:3000
2. Wpisz testowy email (np. `test@example.com`)
3. Kliknij **"ODBIERZ RAPORT"**
4. Wróć do Google Sheet
5. **Powinieneś zobaczyć nowy wiersz z emailem!**

### Przykład:
```
| Data                    | Email            | Status   |
|-------------------------|------------------|----------|
| 2025-12-06 14:30:15    | test@example.com | Aktywny  |
```

---

## 🔍 TROUBLESHOOTING

### Problem: Email nie pojawia się w Google Sheet

**Sprawdź:**
1. Czy URL w `.env` jest poprawny?
2. Czy zrestartowałeś serwer po edycji `.env`?
3. Czy wdrożenie ma dostęp "Wszyscy"?
4. Otwórz konsolę przeglądarki (F12) - czy są błędy?

**Testuj Apps Script bezpośrednio:**
1. W Apps Script kliknij **Funkcja**: `testPost`
2. Kliknij **Uruchom**
3. Sprawdź Logi (ikonka 📋)
4. Powinno być: `{"success":true,...}`

### Problem: Duplikaty emaili

**To normalne!** Skrypt automatycznie sprawdza duplikaty:
- Jeśli email już istnieje → zwraca `{duplicate: true}`
- NIE dodaje tego samego emaila dwa razy

### Problem: "Błąd zapisu" na stronie

**Możliwe przyczyny:**
1. Brak połączenia z internetem
2. Źle skonfigurowany URL w `.env`
3. Wdrożenie Apps Script nieaktywne

**Fallback:** Jeśli `.env` jest pusty, formularz przekieruje do `thank-you.html` BEZ zapisu (dla testów UI).

---

## 📊 ANALIZA MAILI

### Jak eksportować maile?

1. W Google Sheet: **Plik → Pobierz → CSV**
2. Importuj do Mailchimp/ConvertKit
3. Lub skopiuj kolumnę B (Email) do schowka

### Ile maili mogę zapisać?

**Google Sheets limity:**
- Max wierszy: **10,000,000** (10 milionów)
- API limit: **300 requestów/minutę/projekt**

**Dla porównania:** To ~18,000 zapisów/godzinę. Wystarczy na start! 🚀

---

## 🚀 DEPLOY PRODUKCYJNY (Netlify/Vercel)

Po wdrożeniu na produkcję:

1. Dodaj zmienną środowiskową `VITE_GOOGLE_SCRIPT_URL` w panelu hostingu
2. Wartość: ten sam URL z Apps Script
3. Rebuild projektu

**Netlify:**
```
Site settings → Environment variables → Add variable
```

**Vercel:**
```
Project Settings → Environment Variables → Add
```

---

## 💡 NASTĘPNE KROKI

Po zebraniu **500+ maili** rozważ migrację do:
- **Mailchimp** - automatyczne kampanie email
- **ConvertKit** - landing pages + sequences
- **SendGrid** - transakcyjne emaile

**Ale na start? Google Sheets to idealne rozwiązanie!** ✅

---

## ❓ PYTANIA?

- Problem z konfiguracją? Sprawdź logi w Apps Script
- Duplikaty? To funkcja, nie bug
- Inne? Przejrzyj kod w `google-apps-script.js`

**Powodzenia!** 🎉
