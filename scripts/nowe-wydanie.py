#!/usr/bin/env python3
"""Protokół T1: zamienia wysłaną kampanię MailerLite na stronę wydania w public/newsletter/.

Co robi:
  1. pobiera HTML kampanii z API MailerLite (albo bierze plik .html),
  2. robi z niego stronę 1:1 jak mail: wycina stopkę MailerLite, dokłada pasek z numerem,
     formularz zapisu i linki strony, przenosi obrazki z serwera MailerLite do public/,
  3. dopisuje wydanie do newsletter/wydania.json (z tego pliku czyta też strona główna),
  4. przebudowuje listę wydań w public/newsletter/index.html.

Przykłady:
  python3 scripts/nowe-wydanie.py --kampania 201606357323875745 --nr 1 --env-file ~/Desktop/Asystenci/.env
  python3 scripts/nowe-wydanie.py --kampania 200972686301594708 --env-file ~/Desktop/Asystenci/.env   # bez --nr = "Z wcześniejszych listów"
  python3 scripts/nowe-wydanie.py --tylko-archiwum
"""
import argparse
import datetime as dt
import hashlib
import html
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public" / "newsletter"
IMG_DIR = PUBLIC / "img"
DATA = ROOT / "newsletter" / "wydania.json"
ARCHIWUM = PUBLIC / "index.html"
SITE = "https://tierone-pro.pl"

MIESIACE = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca",
            "sierpnia", "września", "października", "listopada", "grudnia"]
MIESIACE_M = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec",
              "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]

ZGODA = ("Wyrażam zgodę na przetwarzanie moich danych osobowych (adres e-mail) przez TRENUJ "
         "PROFESJONALNIE KAMIL ORAWCZAK w celu wysyłki newslettera oraz materiałów edukacyjnych. "
         'Zapoznałem/am się z <a href="/privacy.html" target="_blank" style="color:#CCFF00;">'
         "Polityką Prywatności</a>.*")


# ---------- pomocnicze ----------

def api_key(env_file):
    key = os.environ.get("MAILERLITE_API_KEY")
    if not key and env_file:
        for line in Path(env_file).expanduser().read_text(encoding="utf-8").splitlines():
            if line.startswith("MAILERLITE_API_KEY="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not key:
        sys.exit("Brak MAILERLITE_API_KEY (ustaw zmienną albo podaj --env-file).")
    return key


def pobierz_kampanie(cid, key):
    req = urllib.request.Request(
        f"https://connect.mailerlite.com/api/campaigns/{cid}",
        headers={"Authorization": f"Bearer {key}", "Accept": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.load(r)["data"]
    email = data["emails"][0]
    wyslano = (data.get("finished_at") or data.get("scheduled_for") or "")[:10]
    return email["content"], email.get("subject") or data["name"], email.get("preheader") or "", wyslano


def bez_emoji(text):
    # usuwa emoji i ozdobniki z początku i końca tematu maila
    text = re.sub(r"^[^\wĄĆĘŁŃÓŚŹŻąćęłńóśźż„\"]+", "", text)
    text = re.sub(r"[^\w.?!”\"…)]+$", "", text)
    return re.sub(r"\s+", " ", text).strip()


def slug(text, limit=60):
    tr = str.maketrans("ąćęłńóśźżĄĆĘŁŃÓŚŹŻ", "acelnoszzACELNOSZZ")
    s = re.sub(r"[^a-z0-9]+", "-", text.translate(tr).lower()).strip("-")
    if len(s) > limit:
        s = s[:limit].rsplit("-", 1)[0]
    return s


def data_pl(iso):
    d = dt.date.fromisoformat(iso)
    return f"{d.day} {MIESIACE[d.month - 1]} {d.year}"


def przenies_obrazki(h):
    """Obrazki z serwera MailerLite zapisuje w public/newsletter/img/ i podmienia adresy."""
    IMG_DIR.mkdir(parents=True, exist_ok=True)

    def zamien(m):
        url = m.group(1)
        ext = Path(url.split("?")[0]).suffix or ".jpg"
        name = hashlib.sha1(url.encode()).hexdigest()[:12] + ext
        target = IMG_DIR / name
        if not target.exists():
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (tierone-pro.pl newsletter)"})
            with urllib.request.urlopen(req, timeout=30) as r:
                target.write_bytes(r.read())
        return f'src="/newsletter/img/{name}"'

    return re.sub(r'src="(https://storage\.mlcdn\.com/[^"]+)"', zamien, h)


# ---------- strona wydania ----------

def strona_wydania(h, w):
    tytul = html.escape(w["tytul"])
    opis = html.escape(w["opis"])
    url = f"{SITE}/newsletter/{w['plik']}"
    etykieta = f"Protokół T1 · Nr {w['nr']}" if w.get("nr") else "Z wcześniejszych listów"
    data_paska = w["data_www"] if w.get("nr") else w["data_wysylki"]

    head = f"""
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap">
<link rel="stylesheet" href="/newsletter/newsletter.css">
<link rel="canonical" href="{url}">
<meta name="description" content="{opis}">
<meta property="og:type" content="article">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{tytul} | Protokół T1">
<meta property="og:description" content="{opis}">
<meta property="og:image" content="{SITE}/og-image.jpg?v=2">
<style>body{{background:#f6f3ec}} .webbar a{{color:#0a0a0a}} .webbar a:hover{{color:#7DB300}}</style>
"""
    h = h.replace("<!--{$head_top}-->", "")
    h = h.replace("<!--{$head_bottom}-->", head, 1)
    h = re.sub(r"<title>.*?</title>", f"<title>{tytul} | Protokół T1 · TierOne Pro</title>", h, count=1, flags=re.S)
    h = re.sub(r"<html[^>]*>", '<html lang="pl">', h, count=1)

    webbar = f"""<div class="webbar" style="max-width:640px;margin:0 auto;padding:22px 16px 14px;box-sizing:border-box;display:flex;flex-wrap:wrap;gap:8px 18px;justify-content:space-between;align-items:center;font-family:'Inter',Arial,sans-serif;font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b6b6b;">
<span><span style="background:#CCFF00;color:#0a0a0a;padding:4px 8px;margin-right:10px;">{etykieta}</span>{data_pl(data_paska)}</span>
<span><a href="/newsletter/" style="text-decoration:none;">← Wszystkie wydania</a></span>
</div>"""
    h = h.replace("<!--{$body_top}-->", "")
    h = re.sub(r"(<body[^>]*>)", lambda m: m.group(1) + webbar, h, count=1)

    zapis = f"""<tr><td class="px" style="background:#fbf9f3;padding:8px 40px 40px 40px;">
<section id="zapis" class="signup" style="margin:0;border-radius:4px;">
<div class="cap" style="color:#CCFF00;margin-bottom:8px">Protokół T1 · co niedzielę</div>
<p class="signup-h">W skrzynce od razu. <em>Tutaj tydzień później.</em></p>
<form data-zapis novalidate>
<label for="email" class="signup-l">Twój e-mail</label>
<input id="email" name="email" type="email" autocomplete="email" placeholder="Wpisz swój email" required>
<button type="submit">Zapisuję się</button>
<label class="signup-zgoda"><input type="checkbox" name="zgoda" required><span>{ZGODA}</span></label>
<p class="signup-blad" data-blad role="alert" hidden></p>
</form>
</section>
</td></tr>
"""
    # baner w stopce to ostatni obrazek z konta MailerLite (wyżej mogą być grafiki z treści)
    baner = h.rfind('<img src="https://storage.mlcdn.com/account_image/')
    if baner == -1:
        print("  uwaga: nie znalazłem banera w stopce, formularz idzie na koniec maila")
        h = h.replace("<!--{$body_bottom}-->", f"<table align=center width=640><tbody>{zapis}</tbody></table><!--{{$body_bottom}}-->", 1)
    else:
        start = h.rfind("<tr>", 0, baner)
        h = h[:start] + zapis + h[start:]

    stopka_strony = ('<p style="margin:0;font-family:\'Inter\',Arial,sans-serif;font-size:12px;line-height:20px;color:#9a9a9a;">'
                     '<a href="/newsletter/" style="color:#cfcfcf;">Archiwum Protokołu T1</a>  ·  '
                     '<a href="/" style="color:#cfcfcf;">Strona główna</a>  ·  '
                     '<a href="/privacy.html" style="color:#cfcfcf;">Polityka Prywatności</a></p>')
    h, n = re.subn(r"<p[^>]*>\s*Dostajesz ten mail.*?</p>", stopka_strony, h, count=1, flags=re.S)
    if not n:
        print("  uwaga: nie znalazłem zdania „Dostajesz ten mail”, sprawdź stopkę ręcznie")

    # stopka MailerLite: adres firmy, "You received...", logo "Sent by"
    h = re.sub(r"<!--\{\$body_bottom\}-->.*?</body>", "</body>", h, count=1, flags=re.S)
    h = h.replace("{$url}", "/newsletter/").replace("{$unsubscribe}", "/newsletter/")
    h = re.sub(r'href="https?://(?:www\.)?tierone-pro\.pl/?"', 'href="/"', h)
    h = re.sub(r'\s(?:builder-link-id|data-link-id|data-link-type)="[^"]*"', "", h)
    h = przenies_obrazki(h)
    h = h.replace("</body>", '<script src="/newsletter/zapis.js" defer></script>\n</body>', 1)
    h = h.replace("</head>", '<script src="/ph.js"></script>\n</head>', 1)

    zostalo = re.findall(r"\{\$[a-z_]+\}|mailerlite\.com|mlcdn\.com", h)
    if zostalo:
        print("  uwaga: zostały ślady MailerLite:", sorted(set(zostalo)))
    return h


# ---------- archiwum ----------

def lista_archiwum(wydania):
    numerowane = sorted([w for w in wydania if w.get("nr")], key=lambda w: w["nr"], reverse=True)
    wczesniejsze = sorted([w for w in wydania if not w.get("nr")], key=lambda w: w["data_www"], reverse=True)

    out, miesiac = [], None
    for w in numerowane:
        d = dt.date.fromisoformat(w["data_www"])
        m = f"{MIESIACE_M[d.month - 1]} {d.year}"
        if m != miesiac:
            out.append(f'    <div class="cap month">{m}</div>')
            miesiac = m
        out.append(f"""    <a class="ed" href="/newsletter/{w['plik']}">
      <span class="num">{w['nr']:02d}</span>
      <span>
        <span class="t">{html.escape(w['tytul'])}</span>
        <span class="d">{html.escape(w['opis'])}</span>
        <span class="cap meta">{d.strftime('%d.%m.%Y')}</span>
      </span>
    </a>""")

    if wczesniejsze:
        out.append('    <div class="cap month" style="margin-top:64px">Z wcześniejszych listów</div>')
        out.append('    <p style="font-size:17px;color:var(--muted);margin:14px 0 0">Wybór z pierwszego roku, zanim newsletter dostał nazwę.</p>')
        out.append('    <div class="grid">')
        for w in wczesniejsze:
            d = dt.date.fromisoformat(w["data_wysylki"])
            out.append(f'      <a class="old" href="/newsletter/{w["plik"]}"><span class="cap" style="color:var(--muted)">'
                       f'{MIESIACE_M[d.month - 1]} {d.year}</span><span class="t">{html.escape(w["tytul"])}</span></a>')
        out.append("    </div>")
    return "\n".join(out)


def przebuduj_archiwum(wydania):
    h = ARCHIWUM.read_text(encoding="utf-8")
    nowe, n = re.subn(r"(<!-- WYDANIA:START[^>]*-->\n).*?(<!-- WYDANIA:END -->)",
                      lambda m: m.group(1) + lista_archiwum(wydania) + "\n" + m.group(2), h, flags=re.S)
    if not n:
        sys.exit("Nie znalazłem znaczników WYDANIA:START / WYDANIA:END w public/newsletter/index.html")
    ARCHIWUM.write_text(nowe, encoding="utf-8")


# ---------- main ----------

def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--kampania", help="ID kampanii w MailerLite")
    p.add_argument("--plik", help="zamiast API: plik .html maila")
    p.add_argument("--nr", type=int, help="numer wydania Protokołu T1 (bez numeru = wcześniejszy list)")
    p.add_argument("--data-www", help="data publikacji na stronie RRRR-MM-DD (domyślnie wysyłka + 7 dni)")
    p.add_argument("--opis", help="zajawka pod tytułem (domyślnie preheader maila)")
    p.add_argument("--tytul", help="tytuł (domyślnie temat maila bez emoji)")
    p.add_argument("--env-file", help="plik .env z MAILERLITE_API_KEY")
    p.add_argument("--tylko-archiwum", action="store_true", help="tylko przebuduj listę w archiwum")
    a = p.parse_args()

    wydania = json.loads(DATA.read_text(encoding="utf-8")) if DATA.exists() else []

    if not a.tylko_archiwum:
        if a.kampania:
            content, subject, preheader, wyslano = pobierz_kampanie(a.kampania, api_key(a.env_file))
        elif a.plik:
            content = Path(a.plik).read_text(encoding="utf-8")
            subject = re.search(r"<title>(.*?)</title>", content, re.S).group(1)
            preheader, wyslano = "", ""
        else:
            p.error("podaj --kampania albo --plik (albo --tylko-archiwum)")

        # skrypt zna tylko obecny szablon maila (od października 2026); starsze mają inną budowę stopki
        if "<!--{$body_bottom}-->" not in content or "Dostajesz ten mail" not in content:
            sys.exit("Ten mail jest w starszym szablonie MailerLite (inna stopka). Pomijam, "
                     "żeby na stronę nie trafiła połamana wersja.")
        if not wyslano and not a.data_www:
            p.error("nie znam daty wysyłki, podaj --data-www")
        wyslano = wyslano or a.data_www
        tytul = a.tytul or bez_emoji(html.unescape(subject))
        opis = a.opis or bez_emoji(html.unescape(preheader)) or tytul
        data_www = a.data_www or (dt.date.fromisoformat(wyslano) + dt.timedelta(days=7)).isoformat()
        plik = (f"nr-{a.nr}-" if a.nr else "") + slug(tytul) + ".html"

        w = {"nr": a.nr, "tytul": tytul, "opis": opis, "plik": plik,
             "data_wysylki": wyslano, "data_www": data_www, "kampania": a.kampania}
        print(f"Wydanie: {tytul}\n  plik: public/newsletter/{plik}\n  wysłane {wyslano}, na stronie od {data_www}")

        PUBLIC.mkdir(parents=True, exist_ok=True)
        (PUBLIC / plik).write_text(strona_wydania(content, w), encoding="utf-8")

        wydania = [x for x in wydania if x["plik"] != plik and not (a.nr and x.get("nr") == a.nr)]
        wydania.append(w)
        wydania.sort(key=lambda x: x["data_www"], reverse=True)
        DATA.parent.mkdir(parents=True, exist_ok=True)
        DATA.write_text(json.dumps(wydania, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    przebuduj_archiwum(wydania)
    print(f"Archiwum: {len(wydania)} wydań w public/newsletter/index.html")


if __name__ == "__main__":
    main()
