# 📧 Basin + MailerLite - Setup w 3 Krokach (5 minut)

Najprostszy sposób zbierania maili i automatycznego wysyłania do MailerLite.

---

## 🎯 KROK 1: Utwórz konto MailerLite (jeśli nie masz)

1. Otwórz → https://www.mailerlite.com
2. Kliknij **"Sign up free"**
3. Wypełnij dane rejestracji
4. **DARMOWE do 1000 subskrybentów!**

### ✅ Gotowe - masz konto MailerLite

---

## 🎯 KROK 2: Utwórz konto Basin i połącz z MailerLite

### A) Rejestracja Basin

1. Otwórz → https://usebasin.com
2. Kliknij **"Get Started Free"**
3. Wypełnij rejestrację
4. **DARMOWE do 100 submisji/miesiąc!**

### B) Utwórz nowy formularz

1. Po zalogowaniu kliknij **"Create a Form"** (lub "+ New Form")
2. Nazwij formularz: **"TierOne Newsletter"**
3. Kliknij **"Create"**

### C) Połącz z MailerLite

1. W ustawieniach formularza znajdź **"Integrations"** (lewe menu)
2. Znajdź **"MailerLite"** na liście
3. Kliknij **"Connect"**
4. Wpisz **API Key z MailerLite**:
   - Otwórz MailerLite → **Settings → Integrations → API**
   - Skopiuj **API Key**
   - Wklej do Basin
5. Kliknij **"Save"** lub **"Connect"**

### D) Skopiuj URL formularza

1. Wróć do głównego widoku formularza
2. Znajdź **"Form Endpoint"** lub **"Form URL"**
3. **SKOPIUJ URL** (wygląda jak: `https://usebasin.com/f/abc123def`)

### ✅ Teraz masz:
- ✓ Konto Basin
- ✓ Połączenie z MailerLite
- ✓ URL formularza

---

## 🎯 KROK 3: Wklej URL do projektu

1. Otwórz plik na komputerze:
   ```
   /Users/kamilorawczak/Desktop/Asystenci/strony/tierone-prime/.env
   ```

2. Wklej URL po znaku `=`:
   ```
   VITE_BASIN_FORM_URL=https://usebasin.com/f/abc123def
   ```
   (Wklej SWÓJ URL z Basin!)

3. **Zapisz plik** (Cmd+S / Ctrl+S)

---

## 🎯 KROK 4: Restart serwera

**Wróć tutaj i napisz:** "zrestartuj serwer"

Zrobię to za Ciebie i strona będzie gotowa!

---

## ✅ TEST: Sprawdź czy działa

Po restarcie serwera:

1. Otwórz stronę: http://localhost:3000
2. Wpisz testowy email (np. `test@example.com`)
3. Kliknij **"ODBIERZ RAPORT"**
4. Sprawdź:
   - **Basin Dashboard** → powinien być wpis
   - **MailerLite Dashboard → Subscribers** → powinien być nowy subscriber!

---

## 💰 KOSZTY

- **Basin Free Plan**: 100 submisji/miesiąc (DARMOWE)
- **MailerLite Free**: do 1000 subskrybentów (DARMOWE)

**= 100% DARMOWE do startu!** 🎉

---

## 📊 CO BĘDZIE SIĘ DZIAĆ?

```
Użytkownik → Wpisuje email → Basin → MailerLite
                ↓
         Thank You Page + Ebook
```

**Basin automatycznie:**
- ✓ Zapisuje email
- ✓ Wysyła do MailerLite
- ✓ Blokuje spam
- ✓ Daje statystyki

**MailerLite automatycznie:**
- ✓ Dodaje do listy subskrybentów
- ✓ Może wysłać welcome email (jeśli skonfigurujesz)
- ✓ Zarządza odsubskrybowaniem

---

## 🚀 NASTĘPNE KROKI (po zebraniu maili)

1. **Welcome Email w MailerLite**
   - Automatyczna wiadomość powitalna
   - Możesz dodać link do ebooka tutaj (zamiast na stronie)

2. **Email Sequence**
   - Seria maili po zapisie
   - Storytelling o TierOne

3. **Segmentacja**
   - Tagowanie subskrybentów
   - Personalizacja

---

## 🔍 TROUBLESHOOTING

### Email nie pojawia się w MailerLite

**Sprawdź:**
1. Czy połączenie Basin ↔ MailerLite jest aktywne?
2. Czy API Key w Basin jest poprawny?
3. Sprawdź Basin Dashboard → czy submission pojawił się tam?
4. Sprawdź MailerLite → Settings → Integrations → czy Basin jest connected?

### "Wystąpił błąd" na stronie

**Sprawdź:**
1. Czy URL w `.env` jest poprawny?
2. Czy zrestartowałeś serwer po edycji `.env`?
3. Otwórz konsolę przeglądarki (F12) → czy są błędy?

### Basin mówi "Limit exceeded"

- Free plan: 100 submisji/miesiąc
- Upgrade do $5/miesiąc → 1000 submisji
- Lub migruj do własnego backendu

---

## ❓ PYTANIA?

- Basin Dashboard: https://usebasin.com/forms
- MailerLite Dashboard: https://dashboard.mailerlite.com
- Basin Docs: https://usebasin.com/docs

**Teraz wykonaj kroki 1-3, a potem wróć tutaj!** 🚀
