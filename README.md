# TierOne Prime - Elite Performance System

Landing page dla systemu mentoringowego TierOne Prime.

## Stack Technologiczny

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Ikony
- **Vite** - Build tool & dev server

## Uruchomienie (Development)

### 1. Zainstaluj zależności
```bash
cd ~/Desktop/Asystenci/strony/tierone-prime
npm install
```

### 2. Uruchom dev server
```bash
npm run dev
```

Strona otworzy się automatycznie w przeglądarce na `http://localhost:3000`

## Komendy

- `npm run dev` - Uruchom development server (hot reload)
- `npm run build` - Zbuduj wersję production
- `npm run preview` - Podgląd wersji production

## Struktura Projektu

```
tierone-prime/
├── index.html          # HTML template
├── index.tsx          # Główny komponent React (wszystkie sekcje)
├── index.css          # Custom styles (Dark mode + Neon Lime)
├── package.json       # Zależności
├── vite.config.ts     # Konfiguracja Vite
└── README.md          # Ten plik
```

## Sekcje Strony

1. **Hero** - Główny nagłówek z CTA
2. **Problem** - Trzy główne problemy target audience
3. **Solution** - Trzy filary TierOne Prime (Ciało, Umysł, System)
4. **Authority** - O Kamilu Orawczaku
5. **Social Proof** - Liczby (15 lat, 100+ transformacji)
6. **Final CTA** - Ankieta rekrutacyjna
7. **Footer** - Stopka

## Paleta Kolorów

- **Czerń**: `#0a0a0a` (tło główne)
- **Grafit**: `#1f1f1f` (tło sekcji)
- **Neon Lime**: `#CCFF00` (akcent, CTA)
- **Biały**: `#ffffff` (tekst)
- **Szary**: `#cccccc` (tekst drugorzędny)

## Typografia

- **Nagłówki**: Oswald (Bold, Uppercase)
- **Tekst**: Inter (Regular, Light)

## TODO / Next Steps

- [ ] Dodać prawdziwe zdjęcie (Authority section)
- [ ] Podpiąć formularz ankiety rekrutacyjnej
- [ ] Dodać animacje scroll (AOS/Framer Motion)
- [ ] Stworzyć favicon
- [ ] Zoptymalizować SEO (meta tags, Open Graph)
- [ ] Dodać Google Analytics
- [ ] Deploy na hosting (Vercel/Netlify)

## Deploy (Production)

### Opcja 1: Vercel (zalecane)
```bash
npm install -g vercel
vercel
```

### Opcja 2: Netlify
```bash
npm run build
# Potem upload folderu `dist/` na Netlify
```

### Opcja 3: GitHub Pages
```bash
npm run build
# Potem deploy `dist/` na gh-pages branch
```

## Kontakt

Kamil Orawczak
TierOne Prime
© 2025
