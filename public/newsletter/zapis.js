// Formularz zapisu na Protokół T1 (archiwum i strony wydań).
// Ta sama funkcja co formularz w hero: /.netlify/functions/newsletter -> MailerLite.
document.querySelectorAll('form[data-zapis]').forEach((form) => {
  const button = form.querySelector('button[type=submit]');
  const error = form.querySelector('[data-blad]');

  const showError = (text) => {
    error.textContent = text;
    error.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.hidden = true;

    const email = form.email.value.trim();
    if (!email) return showError('Wpisz swój adres e-mail.');
    if (!form.zgoda.checked) return showError('Zaznacz zgodę, żebym mógł wysyłać Ci newsletter.');

    button.disabled = true;
    button.textContent = 'Zapisuję…';
    try {
      const res = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('status ' + res.status);
      window.location.href = '/newsletter/dziekuje.html';
    } catch (err) {
      showError('Coś poszło nie tak. Spróbuj jeszcze raz za chwilę.');
      button.disabled = false;
      button.textContent = 'Zapisuję się';
    }
  });
});
