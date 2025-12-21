import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Dumbbell, Brain, Cpu, Target, Zap, Shield } from 'lucide-react';

// Hero Section
const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 20,
  }));

  // Generate random lines
  const lines = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }}></div>

      {/* Floating Particles */}
      <div className="particles" style={{ zIndex: 2 }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              bottom: '-50px',
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Lines */}
      <div className="hero-lines" style={{ zIndex: 2 }}>
        {lines.map((line) => (
          <div
            key={line.id}
            className="hero-line"
            style={{
              top: `${line.top}%`,
              animationDelay: `${line.delay}s`,
            }}
          />
        ))}
      </div>

      {/* HUD overlay and grid pattern */}
      <div className="absolute inset-0 hud-overlay grid-pattern opacity-20" style={{ zIndex: 3 }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          {/* Badge */}
          <div className="mb-6">
            <span className="tactical-badge">TIERONE PRO – ELITE PERFORMANCE SYSTEM</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-3 leading-tight">
            ZBUDUJ CIAŁO<br />
            <span className="text-brand-lime text-glow">ATLETY.</span>
          </h1>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-3 leading-tight">
            WYTRENUJ UMYSŁ<br />
            <span className="text-brand-lime text-glow">WOJOWNIKA.</span>
          </h1>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-3 leading-tight">
            ŻYJ 100+ LAT<br />
            <span className="text-brand-lime text-glow">W PEŁNEJ FORMIE.</span>
          </h1>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ODZYSKAJ CZAS<br />
            <span className="text-brand-lime text-glow">DZIĘKI AI.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Zapisz się na newsletter oraz odbierz <span className="text-brand-lime font-semibold">„Tajny Protokół 14 Zmian"</span>
          </p>

          {/* Email Form */}
          <form
            className="max-w-lg mx-auto mb-8 fade-in-up"
            onSubmit={async (e) => {
              e.preventDefault();
              const email = (e.target as any).email.value;

              // Walidacja zgody RODO
              if (!consentChecked) {
                setError('Musisz wyrazić zgodę na przetwarzanie danych osobowych.');
                return;
              }

              setLoading(true);
              setError('');

              try {
                // Get Basin Form URL from environment variable
                const basinUrl = import.meta.env.VITE_BASIN_FORM_URL;

                if (!basinUrl) {
                  // Fallback: redirect without saving (jeśli URL nie jest skonfigurowany)
                  console.warn('Basin Form URL not configured');
                  window.location.href = `/thank-you.html?email=${encodeURIComponent(email)}`;
                  return;
                }

                // Send email to Basin (which forwards to MailerLite)
                const response = await fetch(basinUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    email: email,
                    source: 'TierOne Newsletter'
                  })
                });

                if (response.ok) {
                  // Success - redirect to thank you page
                  window.location.href = `/thank-you.html?email=${encodeURIComponent(email)}`;
                } else {
                  throw new Error('Failed to submit');
                }

              } catch (err) {
                console.error('Błąd zapisu:', err);
                setError('Wystąpił błąd. Spróbuj ponownie.');
                setLoading(false);
              }
            }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                name="email"
                required
                disabled={loading}
                placeholder="Wpisz swój email"
                className="flex-1 px-6 py-4 bg-brand-graphite border-2 border-brand-lime/30 text-white placeholder-gray-500 focus:border-brand-lime focus:outline-none rounded-lg disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-neon text-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'WYSYŁAM...' : 'ODBIERZ RAPORT'}
              </button>
            </div>

            {/* RODO Consent Checkbox */}
            <div className="mt-4 flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                disabled={loading}
                className="mt-1 w-5 h-5 bg-brand-graphite border-2 border-brand-lime/30 rounded focus:ring-brand-lime focus:ring-2 text-brand-lime cursor-pointer disabled:opacity-50"
              />
              <label htmlFor="consent" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                Wyrażam zgodę na przetwarzanie moich danych osobowych (adres e-mail) przez TRENUJ PROFESJONALNIE KAMIL ORAWCZAK w celu wysyłki newslettera oraz materiałów edukacyjnych. Zapoznałem/am się z <a href="./privacy.html" target="_blank" className="text-brand-lime hover:underline">Polityką Prywatności</a>.*
              </label>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <p className="text-sm text-gray-500 mt-4">
              * Pola wymagane. Zapisując się na newsletter otrzymasz „Tajny Protokół 14 Zmian"
            </p>
          </form>

          {/* Social Proof Stripe */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm border-t border-brand-lime/20 pt-8 fade-in-up">
            {/* Avatar klienta */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-brand-lime overflow-hidden">
                <img
                  src="/darek.jpg"
                  alt="Dariusz Kostkowski"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-300 font-semibold">Dołącz do liderów</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-brand-lime text-lg">★★★★★</span>
            </div>

            {/* Mini testimonial */}
            <div className="text-gray-300 italic text-center md:text-left max-w-md">
              "Bardzo dobra wydolność i kondycja"
              <span className="text-brand-lime font-semibold block md:inline"> — Dariusz K., CEO Bella</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll to content"
      >
        <div className="w-6 h-10 border-2 border-brand-lime rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-lime rounded-full mt-2"></div>
        </div>
      </button>
    </section>
  );
};

// Problem Section
const Problem = () => (
  <section className="section bg-black">
    <div className="container mx-auto px-6">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
          SŁABE NAWYKI.<br />
          CHAOS W ŻYCIU.<br />
          <span className="text-brand-lime">ZNASZ TEN SCENARIUSZ?</span>
        </h2>
      </div>

      {/* Problem Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Problem 1 */}
        <div className="text-center p-8 bg-brand-graphite rounded-lg border border-red-900/30 fade-in-scale transition-all duration-300 hover:transform hover:scale-105 hover:border-red-700/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
            <span className="text-4xl text-red-500">✗</span>
          </div>
          <h3 className="font-heading text-2xl font-bold mb-4 text-red-400">
            CIAŁO SŁABNIE
          </h3>
          <p className="text-gray-400">
            Biurko zamiast siłowni. Kawa zamiast energii. Bóle pleców zamiast mocy.
          </p>
        </div>

        {/* Problem 2 */}
        <div className="text-center p-8 bg-brand-graphite rounded-lg border border-red-900/30 fade-in-scale transition-all duration-300 hover:transform hover:scale-105 hover:border-red-700/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
            <span className="text-4xl text-red-500">✗</span>
          </div>
          <h3 className="font-heading text-2xl font-bold mb-4 text-red-400">
            UMYSŁ PRZEBODŹCOWANY
          </h3>
          <p className="text-gray-400">
            Tysiące decyzji dziennie. Zero spokoju. Wieczny tryb reakcji.
          </p>
        </div>

        {/* Problem 3 */}
        <div className="text-center p-8 bg-brand-graphite rounded-lg border border-red-900/30 fade-in-scale transition-all duration-300 hover:transform hover:scale-105 hover:border-red-700/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
            <span className="text-4xl text-red-500">✗</span>
          </div>
          <h3 className="font-heading text-2xl font-bold mb-4 text-red-400">
            CZAS PRZECIEKA
          </h3>
          <p className="text-gray-400">
            Mailingi, spotkania, chaos. Pracujesz 60h, a robisz to, co powinno zająć 20h.
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="text-center mt-16">
        <p className="text-2xl md:text-3xl font-light italic text-gray-400 max-w-3xl mx-auto border-l-4 border-brand-lime pl-8">
          "System, który doprowadził Cię tutaj,<br />nie wystarczy."
        </p>
      </div>
    </div>
  </section>
);

// Solution Section (3 Pillars)
const Solution = () => {
  const pillars = [
    {
      icon: Dumbbell,
      title: 'CIAŁO',
      subtitle: 'Długowieczność i Wydolność',
      features: [
        'Trening Hybrydowy + Longevity',
        'Protokoły biohackingu',
        'HRV i biomarkery zdrowia',
        'Energia i regeneracja'
      ]
    },
    {
      icon: Brain,
      title: 'UMYSŁ',
      subtitle: 'Mentalność',
      features: [
        'Stoicki spokój',
        'Regulacja stresu',
        'Jasność decyzji',
        'Focus jak laser'
      ]
    },
    {
      icon: Cpu,
      title: 'SYSTEM',
      subtitle: 'Automatyzacja AI',
      features: [
        'Automatyzacje odzyskują czas',
        'AI pilnują dyscypliny',
        'Działanie według planu',
        'Systemy nie cele'
      ]
    }
  ];

  return (
    <section id="solution" className="section bg-brand-graphite relative">
      <div className="absolute inset-0 grid-pattern opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            TIERONE PRO –<br />
            TWOJA <span className="text-brand-lime text-glow">PRZEWAGA OPERACYJNA</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Trzy filary, które oddzielają elitę od reszty
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <div key={index} className="glass-card p-8 fade-in-scale">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-lg bg-brand-lime/10 flex items-center justify-center border border-brand-lime/30">
                <pillar.icon className="w-10 h-10 text-brand-lime" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-3xl font-bold text-center mb-2 text-brand-lime">
                {pillar.title}
              </h3>
              <p className="text-center text-gray-400 text-sm mb-6 font-semibold">
                {pillar.subtitle}
              </p>

              {/* Divider */}
              <div className="divider-lime mb-6"></div>

              {/* Features */}
              <ul className="space-y-3">
                {pillar.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Zap className="w-5 h-5 text-brand-lime mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// AUTHORITY SECTION (ABOUT ME)
const Authority = () => (
  <section className="section bg-black">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left: Image */}
        <div className="relative fade-in-scale">
          <div className="aspect-[3/4] rounded-lg overflow-hidden border-2 border-brand-lime/30 clip-angled transition-all duration-500 hover:border-brand-lime hover:shadow-lg hover:shadow-brand-lime/30">
            <img
              src="./kamil-training.jpg"
              alt="Kamil Orawczak - TierOne PRO"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 glass-card p-4 border-2 border-brand-lime">
            <p className="font-heading text-2xl font-bold text-brand-lime">10+</p>
            <p className="text-xs text-gray-400">LAT W FORMIE</p>
          </div>
        </div>

        {/* Right: Text Content */}
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            KAMIL ORAWCZAK - Trener Personalny
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            <em>Trener przygotowania motorycznego, Magister Wychowania Fizycznego i pasjonat systemów AI</em>
          </p>

          <p className="mb-4 text-gray-300">Większość ludzi traktuje trening jak przykry obowiązek. Moi klienci – Liderzy, CEO, Sportowcy – traktują go jak <span className="text-brand-lime">Strategiczną Konieczność</span>. Budujemy środowisko, w którym dbanie o ciało i umysł staje się Twoim nowym systemem operacyjnym.</p>

          <h3 className="font-heading text-2xl font-bold mb-3">DLACZEGO JA?</h3>
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
            <li><span className="text-brand-lime">PRAKTYKA, NIE TEORIA:</span> Setki godzin na sali treningowej, nie w bibliotece. Ukończone Elite Performance Institute (EPI) i dyplomy UEFA.</li>
            <li><span className="text-brand-lime">DYSCYPLINA:</span> Hartowana w biegach górskich, wyzwaniach OCR i zawodach HYROX. Wiem, co to znaczy przekraczać granice bólu.</li>
            <li><span className="text-brand-lime">TECHNOLOGIA:</span> Łączę biologiczny potencjał ciała z dźwignią sztucznej inteligencji.</li>
          </ul>

          <h3 className="font-heading text-2xl font-bold mb-3">CO ZYSKASZ? (REALNE WYNIKI):</h3>
          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
            <li>✅ <span className="text-brand-lime">Fizycznie:</span> Siła, wytrzymałość, szybkość w górę. Jesteś dużo bardziej sprawny.</li>
            <li>✅ <span className="text-brand-lime">Zdrowotnie:</span> Poprawa VO2 max, lepszy sen, więcej energii do życia.</li>
            <li>✅ <span className="text-brand-lime">Mentalnie:</span> Zmiana mindsetu z "nie lubię ćwiczyć" na "to moja przewaga konkurencyjna".</li>
          </ul>

          <p className="italic text-gray-400"><span className="text-brand-lime">Moja specjalność?</span> Zamieniam "muszę ćwiczyć" w naturalny nawyk. Twoja solidna forma staje się Twoim standardem, a nie celem.</p>
        </div>
      </div>
    </div>
  </section>
);


// CASE STUDY / TESTIMONIALS SECTION
const CaseStudy = () => (
  <section className="section bg-brand-graphite">
    <div className="container mx-auto px-6">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="tactical-badge mb-4 inline-block">STUDIA PRZYPADKÓW</span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          OPINIE <span className="text-brand-lime text-glow">LIDERÓW</span>
        </h2>
      </div>

      {/* Horizontal Scrollable Testimonials */}
      <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory pb-8 px-6 scrollbar-hide">

        {/* NOWA, WYRÓŻNIONA OPINIA DARKA KOSTKOWSKIEGO */}
        <div className="relative glass-card p-8 fade-in-scale bg-black border-l-4 border-brand-lime shadow-xl shadow-brand-lime/30 min-w-[600px] max-w-[600px] flex-shrink-0 snap-center">
          <p className="text-xl italic mb-4 text-gray-100">"Pomimo obaw przed siłownią, obaw przed tym że nie dam rady się podciągnąć – wszystko zrealizowałem – pompki, podciąganie się bez większego wysiłku..."</p>
          <div className="flex items-center justify-center mb-4">
            <span className="text-brand-lime text-3xl">★★★★★</span>
          </div>

          {/* SEKCJA ZDJĘCIE + PODPIS */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-lime">
               <img
                 src="/darek.jpg"
                 alt="Dariusz Kostkowski"
                 className="w-full h-full object-cover"
               />
            </div>

            <div className="text-left">
              <p className="font-semibold text-lg text-white">Dariusz Kostkowski</p>
              <p className="text-sm text-gray-400">CEO Bella sp. z o.o.</p>
            </div>
          </div>

          {/* Szczegóły transformacji */}
          <p className="text-sm mt-6 pt-4 border-t border-brand-lime/20 text-gray-300"><span className="text-brand-lime">Punkt wyjścia:</span> Waga 77kg, brak siły w górnej partii mięśni, brak kontaktu z siłownią ponad 20 lat. <span className="text-brand-lime">Cel:</span> Przygotowanie do warsztatu siły specjalne w biznesie - wersja extreme. <span className="text-brand-lime">Rezultat:</span> Waga 81kg (wzrost masy mięśniowej 74kg, 2,5% tłuszczu), bardzo dobra wydolność i kondycja, podciąganie i pompki bez wysiłku.</p>
        </div>

        {/* OPINIA PATRYKA HABERA */}
        <div className="relative glass-card p-8 fade-in-scale bg-black border-l-4 border-brand-lime shadow-xl shadow-brand-lime/30 min-w-[600px] max-w-[600px] flex-shrink-0 snap-center">
          <p className="text-xl italic mb-4 text-gray-100">"Przyszedłem do Kamila, bo chciałem systemowo trenować, nie na czuja. 26 miesięcy ciężkiej roboty. Półmaraton z 1:36 spadł do 1:24 - 12 minut lepiej. Waga z 75 do 71. Najważniejsze? Nauczyłem się trenować mądrze - bez wypalania się co 3 miesiące."</p>
          <div className="flex items-center justify-center mb-4">
            <span className="text-brand-lime text-3xl">★★★★★</span>
          </div>

          {/* SEKCJA ZDJĘCIE + PODPIS */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-lime">
               <img
                 src="/patryk.jpg"
                 alt="Patryk Haber"
                 className="w-full h-full object-cover"
               />
            </div>

            <div className="text-left">
              <p className="font-semibold text-lg text-white">Patryk Haber</p>
              <p className="text-sm text-gray-400">EngRoTec GmbH & Co. KG</p>
            </div>
          </div>

          {/* Szczegóły transformacji */}
          <p className="text-sm mt-6 pt-4 border-t border-brand-lime/20 text-gray-300"><span className="text-brand-lime">Punkt wyjścia:</span> Waga 75kg, półmaraton 1:36:40, brak systematyki w treningu. <span className="text-brand-lime">Cel:</span> Poprawa wyników w bieganiu, nauczenie się systemowego podejścia. <span className="text-brand-lime">Rezultat:</span> 26 miesięcy systematycznej pracy, waga 71kg (-4kg), półmaraton 1:24:40 (poprawa o 12 minut), brak wypalenia.</p>
        </div>
      </div>
    </div>
  </section>
);

// Final CTA Section
const FinalCTA = () => (
  <section className="section bg-black relative overflow-hidden">
    <div className="absolute inset-0 hud-overlay"></div>
    <div className="container mx-auto px-6 text-center relative z-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
          NIE DLA KAŻDEGO.<br />
          TYLKO DLA <span className="text-brand-lime text-glow">ZDECYDOWANYCH.</span>
        </h2>

        <p className="text-lg text-gray-400 mb-12">
          TierOne Pro to nie kolejny kurs. To transformacja systemu operacyjnego Twojego życia.
        </p>

        <a href="./ankieta.html" className="btn-neon text-xl mb-8 inline-block">
          WYPEŁNIJ ANKIETĘ REKRUTACYJNĄ
        </a>

        <p className="text-sm text-gray-500">
          Tylko 10 miejsc w kwartale. Selekcja obowiązkowa.
        </p>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-brand-black py-12 border-t border-brand-graphite">
    <div className="container mx-auto px-6">
      <div className="text-center text-gray-500 text-sm">
        <p className="mb-3">© 2025 TierOne Pro. Wszelkie prawa zastrzeżone.</p>
        <p className="mb-3">Elite Performance System by Kamil Orawczak</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="./privacy.html" className="text-brand-lime hover:text-white transition-colors text-sm">
            Polityka Prywatności
          </a>
          <span className="text-gray-600">|</span>
          <a href="./terms.html" className="text-brand-lime hover:text-white transition-colors text-sm">
            Regulamin
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// Main App Component
const App = () => {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Authority />
      <CaseStudy />
      <FinalCTA />
      <Footer />
    </>
  );
};

// Render
const root = createRoot(document.getElementById('root')!);
root.render(<App />);