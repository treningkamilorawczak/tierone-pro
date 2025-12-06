/**
 * GOOGLE APPS SCRIPT - Zapis maili z formularza do Google Sheets
 *
 * INSTRUKCJA INSTALACJI:
 * 1. Utwórz nowy Google Sheet: https://sheets.google.com
 * 2. Nazwij go np. "TierOne Newsletter"
 * 3. W pierwszym arkuszu dodaj nagłówki w wierszu 1:
 *    A1: "Data" | B1: "Email" | C1: "Status"
 * 4. Przejdź do: Rozszerzenia → Apps Script
 * 5. Usuń domyślny kod i wklej TEN kod
 * 6. Kliknij "Wdróż" → "Nowe wdrożenie"
 * 7. Typ: "Aplikacja internetowa"
 * 8. Kto ma dostęp: "Wszyscy"
 * 9. Skopiuj URL wdrożenia
 * 10. Wklej URL do pliku .env (VITE_GOOGLE_SCRIPT_URL)
 */

function doPost(e) {
  try {
    // Pobierz arkusz
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parsuj dane z requestu
    const data = JSON.parse(e.postData.contents);
    const email = data.email;

    // Walidacja emaila
    if (!email || !email.includes('@')) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Nieprawidłowy email'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Sprawdź czy email już istnieje
    const emailColumn = sheet.getRange('B:B').getValues();
    const emailExists = emailColumn.some(row => row[0] === email);

    if (emailExists) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Email już zapisany',
        duplicate: true
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Dodaj nowy wiersz
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      email,
      'Aktywny'
    ]);

    // Zwróć sukces
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Email zapisany pomyślnie'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Obsługa błędów
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Testowa funkcja (opcjonalna)
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({ email: 'test@example.com' })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
