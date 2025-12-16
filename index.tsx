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
          {/* Avatary klientów */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-brand-lime/20 border-2 border-black flex items-center justify-center text-brand-lime font-bold">M</div>
              <div className="w-10 h-10 rounded-full bg-brand-lime/20 border-2 border-black flex items-center justify-center text-brand-lime font-bold">P</div>
              <div className="w-10 h-10 rounded-full bg-brand-lime/20 border-2 border-black flex items-center justify-center text-brand-lime font-bold">W</div>
            </div>
            <span className="text-gray-300 font-semibold">100+ CEO zaufało systemowi</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-brand-lime text-lg">★★★★★</span>
            <span className="text-gray-300">4.9/5</span>
          </div>

          {/* Mini testimonial */}
          <div className="text-gray-300 italic text-center md:text-left max-w-md">
            "15h odzyskane. Najlepsza inwestycja 2024."
            <span className="text-brand-lime font-semibold block md:inline"> — Michał K., CEO</span>
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
        'Automatyzacja procesów',
        'Odzyskane 10h/tydz.',
        'AI jako asystent',
        'Biznes na autopilocie'
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

// Authority Section (About)
const Authority = () => (
  <section className="section bg-black">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left: Text */}
        <div>
          {/* NAGŁÓWEK MOCNY */}
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            JESTEM TRENEREM PERSONALNYM.<br />
            NIE DAJĘ CI TYLKO PLANU TRENINGOWEGO —<br />
            <span className="text-brand-lime text-glow">BUDUJĘ SYSTEM, KTÓRY DZIAŁA.</span>
          </h2>

          {/* CYTAT */}
          <p className="text-lg text-gray-300 mb-8 italic border-l-4 border-brand-lime pl-6">
            "Wierzę, że życie można trenować<br />tak samo jak mięśnie.<br /><br />
            Dyscyplina to nie kara.<br />To waluta, za którą kupujesz wolność."
          </p>

          {/* HISTORIA */}
          <h3 className="font-heading text-2xl font-bold mb-4">
            Doświadczenie
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            10 lat temu miałem to samo co Ty dzisiaj: słabe nawyki, chaos i brak systemu.
            Wiedziałem, że muszę coś zmienić. Nie chodziło o kolejny plan treningowy —
            chodziło o zbudowanie fundamentu, który przetrwa kryzys, deadline i zmęczenie.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Zacząłem od treningu. Potem odkryłem AI, protokoły longevity i automatyzację.
            Dziś mam system, który działa od 10 lat — bez wypalenia, bez rezygnacji, bez cofania się.
          </p>

          {/* CREDENTIALS */}
          <h3 className="font-heading text-2xl font-bold mb-4">
            Wiedza
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Zap className="w-5 h-5 text-brand-lime mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong>10 lat konsekwentnego treningu</strong> — OCR, Hyrox, hybrydowa wydolność. Nie dla wyniku, dla systemu który działa.
              </span>
            </li>
            <li className="flex items-start">
              <Zap className="w-5 h-5 text-brand-lime mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong>Magister wychowania fizycznego</strong> + trener przygotowania motorycznego + certyfikat EPI NCSC
              </span>
            </li>
            <li className="flex items-start">
              <Zap className="w-5 h-5 text-brand-lime mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong>100+ transformacji w 5 lat</strong> — przykład: Wojtek (110kg, ból pleców, chaos) → 3 miesiące później: 95kg, zero bólu, sen i energia odzyskane. Bez diety "na czas", bez planu którego nie da się utrzymać.
              </span>
            </li>
            <li className="flex items-start">
              <Zap className="w-5 h-5 text-brand-lime mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong>Wdrażam asystentów AI</strong> — automatyzacja procesów i odzyskany czas
              </span>
            </li>
          </ul>

          {/* UNIKALNA POZYCJA - DLACZEGO TY */}
          <div className="bg-brand-graphite/50 border-l-4 border-brand-lime p-6 rounded-r-lg">
            <h3 className="font-heading text-xl font-bold mb-3 text-brand-lime">
              Czym różnię się od typowego trenera
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Typowy trener daje Ci plan: „Rób to przez 12 tygodni".
              Ja buduję <strong>system nawyków</strong>, który działa w tle —
              bez ciągłych decyzji, bez chaosu, bez cofania się po pierwszym kryzysie.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Łączę trening hybrydowy z automatyzacją AI i protokołami longevity.
              Nie jestem teoretykiem z YouTube'a. Jestem jedynym w Polsce,
              który łączy trzy światy: <strong>performance, technologia, system</strong>.
            </p>
          </div>
        </div>

        {/* Right: Image */}
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
      </div>
    </div>
  </section>
);

// Case Study / Testimonials Section
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

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Testimonial 1 */}
        <div className="glass-card p-8 fade-in-scale">
          <div className="mb-6">
            <p className="text-gray-300 text-lg leading-relaxed italic">
              "W 3 miesiące zredukowałem wagę o 12kg i odzyskałem 15h tygodniowo dzięki automatyzacji.
              Kamil to gamechanger dla każdego CEO, który tonie w chaosie."
            </p>
          </div>
          <div className="flex items-center border-t border-brand-lime/20 pt-6">
            <div className="w-12 h-12 rounded-full bg-brand-lime/20 flex items-center justify-center mr-4">
              <span className="text-brand-lime font-bold text-xl">M</span>
            </div>
            <div>
              <p className="font-semibold text-white">Michał K.</p>
              <p className="text-sm text-gray-400">CEO SOFTWARE HOUSE</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="glass-card p-8 fade-in-scale">
          <div className="mb-6">
            <p className="text-gray-300 text-lg leading-relaxed italic">
              "Myślałem, że nie mam czasu na trening. Kamil pokazał mi, że nie mam czasu, żeby NIE trenować.
              Moja efektywność w firmie wzrosła dwukrotnie."
            </p>
          </div>
          <div className="flex items-center border-t border-brand-lime/20 pt-6">
            <div className="w-12 h-12 rounded-full bg-brand-lime/20 flex items-center justify-center mr-4">
              <span className="text-brand-lime font-bold text-xl">P</span>
            </div>
            <div>
              <p className="font-semibold text-white">Piotr R.</p>
              <p className="text-sm text-gray-400">FOUNDER FINTECH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Social Proof Section
const SocialProof = () => (
  <section className="py-20 bg-brand-graphite border-y-2 border-brand-lime/20">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
        <div>
          <div className="stat-number pulse-glow mb-2">15</div>
          <p className="text-gray-400 uppercase text-sm font-semibold tracking-wider">LAT DOŚWIADCZENIA</p>
        </div>

        <div>
          <div className="stat-number pulse-glow mb-2">100+</div>
          <p className="text-gray-400 uppercase text-sm font-semibold tracking-wider">TRANSFORMACJI</p>
        </div>

        <div>
          <div className="stat-number pulse-glow mb-2">0</div>
          <p className="text-gray-400 uppercase text-sm font-semibold tracking-wider">WYMÓWEK</p>
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
      <SocialProof />
      <FinalCTA />
      <Footer />
    </>
  );
};

// Render
const root = createRoot(document.getElementById('root')!);
root.render(<App />);