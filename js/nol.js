/* ═══════════════════════════════════════════════════════════
   NOL — Configuration globale
   Mettre à jour NOL_LATEST à chaque nouvelle issue.
═══════════════════════════════════════════════════════════ */

var NOL_LATEST = {
  url:   'issues/00/issue00.html',   /* chemin relatif depuis la racine */
  label: 'Issue 00',                 /* affiché en title si besoin      */
};

/* ── Injection "Latest" dans la nav ────────────────────────
   Cherche le lien Issues dans nav-links et nav-panel,
   insère Latest juste après, avec le bon chemin relatif.
   Calcule automatiquement le préfixe selon la profondeur
   de la page courante.
──────────────────────────────────────────────────────────── */
(function () {
  /* Profondeur de la page par rapport à la racine */
  var depth = (window.location.pathname.match(/\//g) || []).length - 1;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';

  var href = prefix + NOL_LATEST.url;

  function insertLatest(anchor) {
    /* Évite les doublons */
    if (anchor.parentNode.nextElementSibling &&
        anchor.parentNode.nextElementSibling.dataset.nolLatest) return;

    var isSmall = anchor.classList.contains('nav-panel-item--small');
    var isPanelItem = anchor.classList.contains('nav-panel-item');

    var a = document.createElement('a');
    a.href = href;
    a.textContent = 'Latest';

    if (isSmall || isPanelItem) {
      /* Mobile panel — insérer le <a> directement après */
      a.className = anchor.className;
      a.dataset.nolLatest = '1';
      anchor.parentNode.insertBefore(a, anchor.nextSibling);
    } else {
      /* Desktop nav — wrap dans <li> */
      var li = document.createElement('li');
      li.dataset.nolLatest = '1';
      li.appendChild(a);
      anchor.parentNode.insertBefore(li, anchor.nextSibling);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* Trouve tous les liens "Issues" dans nav-links et nav-panel */
    document.querySelectorAll('.nav-links a, .nav-panel-item--small, .nav-panel-item').forEach(function (a) {
      if (a.textContent.trim() === 'Issues') insertLatest(a);
    });

    /* Grise "Latest" si on est déjà sur la page de la dernière issue */
    var path = window.location.pathname;
    var isLatestPage = path.indexOf('issues/00/issue00.html') !== -1;
    if (isLatestPage) {
      document.querySelectorAll('.nav-links [data-nol-latest] a').forEach(function (a) {
        a.style.opacity = '0.35';
        a.style.pointerEvents = 'none';
      });
    }
  });
})();
