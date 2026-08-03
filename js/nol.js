/* ═══════════════════════════════════════════════════════════
   NOL — Configuration globale
   ───────────────────────────────────────────────────────────
   À chaque nouvelle issue, mettre à jour :
     NOL_LATEST.url   → chemin depuis la racine
     NOL_LATEST.label → label affiché
     NOL_ISSUES_LIVE  → true quand l'archive a du sens
═══════════════════════════════════════════════════════════ */

var NOL_LATEST = {
  url:   'issues/00/issue00.html',
  label: 'Issue 00',
};

var NOL_ISSUES_LIVE = false;

/* ── Injection nav ─────────────────────────────────────────
   Calcule le préfixe relatif selon la profondeur de la page,
   injecte Latest après Issues (desktop + mobile),
   grise Issues si NOL_ISSUES_LIVE = false.
──────────────────────────────────────────────────────────── */
(function () {
  var depth = (window.location.pathname.match(/\//g) || []).length - 1;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Griser Issues si pas encore live ─── */
    if (!NOL_ISSUES_LIVE) {
      document.querySelectorAll(
        '.nav-links a, .nav-panel-item, .nav-panel-item--small'
      ).forEach(function (a) {
        if (a.textContent.trim() === 'Issues') {
          a.style.opacity = '0.28';
          a.style.pointerEvents = 'none';
          a.setAttribute('tabindex', '-1');
          a.setAttribute('aria-disabled', 'true');
        }
      });
    }

    /* ── Injecter Latest ─────────────────── */
    var latestHref = prefix + NOL_LATEST.url;

    document.querySelectorAll(
      '.nav-links a, .nav-panel-item, .nav-panel-item--small'
    ).forEach(function (anchor) {
      if (anchor.textContent.trim() !== 'Issues') return;
      if (anchor.dataset.latestInserted) return;
      anchor.dataset.latestInserted = '1';

      var a = document.createElement('a');
      a.href = latestHref;
      a.textContent = 'Latest';

      var inNavLinks = !!anchor.closest('.nav-links');

      if (inNavLinks) {
        var li = document.createElement('li');
        li.appendChild(a);
        anchor.parentNode.insertAdjacentElement('afterend', li);
      } else {
        a.className = anchor.className;
        anchor.insertAdjacentElement('afterend', a);
      }
    });

  });
})();
