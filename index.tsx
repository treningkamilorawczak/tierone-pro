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