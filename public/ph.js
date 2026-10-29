// PostHog (bez ciasteczek, zgodne z RODO) — projekt „TierONE strony”.
// Ładowany na każdej stronie: <script src="/ph.js"></script>
// Własne zdarzenia: window.phTrack('nazwa', { ... }) — działa też, zanim biblioteka się wczyta.
(function () {
  var queue = [];
  window.phTrack = function (event, props) {
    if (window.posthog && window.posthog.__loaded) window.posthog.capture(event, props);
    else queue.push([event, props]);
  };

  // Adres e-mail z linku (np. thank-you.html?email=...) nie może trafić do statystyk
  var maskEmail = function (url) {
    return typeof url === 'string' ? url.replace(/([?&]email=)[^&#]*/i, '$1ukryty') : url;
  };

  var s = document.createElement('script');
  s.src = 'https://eu-assets.i.posthog.com/static/array.full.js';
  s.async = true;
  s.onload = function () {
    window.posthog.init('phc_vMfsbqaurcctWReN5D8ahAAKWKbx6VhTs3RsAPjfdx3z', {
      api_host: 'https://eu.i.posthog.com',
      cookieless_mode: 'always',
      person_profiles: 'identified_only',
      capture_pageview: 'history_change',
      disable_session_recording: true,
      before_send: function (ev) {
        if (ev && ev.properties) ev.properties.$current_url = maskEmail(ev.properties.$current_url);
        return ev;
      },
      loaded: function (ph) {
        queue.forEach(function (a) { ph.capture(a[0], a[1]); });
        queue = [];
      }
    });
  };
  document.head.appendChild(s);

  // Sekcje oznaczone data-track-view → section_viewed (raz na wizytę)
  var seen = {};
  var observeSections = function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var section = e.target.getAttribute('data-track-view');
        if (!e.isIntersecting || seen[section]) return;
        seen[section] = true;
        window.phTrack('section_viewed', { section: section });
      });
    }, { rootMargin: '0px 0px -40% 0px' });
    document.querySelectorAll('[data-track-view]').forEach(function (el) { observer.observe(el); });
  };
  if (document.readyState === 'complete') observeSections();
  else window.addEventListener('load', observeSections);
})();
