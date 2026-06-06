# Notes on Listening — README projet

> Colle ce fichier en début de session Claude avant de travailler sur le site.
> Dernière mise à jour : session du 1 juin 2026 — tokens catégories, explore.html, refonte palette système

---

## Le projet

**Notes on Listening (NOL)** est une publication en ligne sur la psychologie de l'écoute musicale.
Voix : personnelle mais ancrée dans la recherche. Intime universel — le "I" ancre, il ne raconte pas.
Tagline : *"The music doesn't change. You do."*
Langue : anglais (contenu) / français (notes de travail internes)

---

## Stack

HTML + CSS + JS vanilla. Aucun framework, aucun build tool.
- Modification de contenu : directement dans le fichier HTML concerné
- Styles globaux : `css/base.css`
- Styles de la homepage/issue : `css/home.css`
- Nouvelle issue : copier `index.html`, changer le contenu, archiver l'ancien dans `issues/`

---

## Architecture des fichiers

```
/
├── index.html               ← toujours l'issue la plus récente (actuellement : issue 00)
│
├── css/
│   ├── base.css             ← design system complet (tokens, reset, composants globaux)
│   └── home.css             ← layouts spécifiques à la homepage/issue
│
└── assets/
    └── logo.svg             ← logo actuel
```

**Règle de navigation :** toutes les sections sont des ancres `#id` dans `index.html`. Pas de JavaScript qui masque/affiche des vues.

---

## Design system

### Fontes (Google Fonts)
| Rôle | Fonte | Usage |
|------|-------|-------|
| Titres | Fraunces, italic, 700/900 | H1, numéros géants, pull quotes |
| Corps | Cormorant Garamond, 300/400 | Texte courant |
| Labels | DM Mono, 400 | Eyebrows, metadata, nav, TOC |

### Palette — tokens CSS dans `base.css`
| Token | Hex | Rôle |
|-------|-----|------|
| `--creme` | #EDE3D0 | Fond principal |
| `--vert-encre` | #1E3028 | Sections sombres, Édito |
| `--bordeaux-prof` | #3D1520 | The Question (fond sombre) |
| `--terra` | #C4614A | Essay, Playlist, numéros sur crème |
| `--or` | #C9963A | Deep Cut |
| `--peche` | #EAB48E | Accents sur fond bordeaux |
| `--bordeaux` | #6B2D3A | 1977 |
| `--ink` | #1E2620 | Texte principal sur crème |
| `--ink-light` | rgba(30,38,32,0.55) | Texte secondaire |

⚠️ Aucune autre couleur pour les sections existantes. Les 2 couleurs ci-dessous sont réservées aux rubriques Never Met et Sound of Self dès qu'elles apparaissent dans une issue.

### Couleur par rubrique éditoriale — système complet

Chaque rubrique a une couleur fixe. Elle ne change pas d'une issue à l'autre.

**Deux usages distincts, deux jeux de tokens :**

- **Tokens de pages d'issues** (`--terra`, `--or`, etc.) — utilisés pour les numéros de section, les badges, les accents dans `index.html` et les futures issues. Ces tokens ne changent pas.
- **Tokens catégories** (`--cat-*`) — utilisés uniquement dans `explore.html` pour identifier les catégories éditoriales dans la page de navigation. Ne pas utiliser sur les pages d'issues.

#### Tokens pages d'issues — dans `base.css`

| Rubrique | Token page | Hex |
|----------|-----------|-----|
| Essay / Playlist | `--terra` | #C4614A |
| Deep Cut | `--or` | #C9963A |
| The Question | `--bordeaux-prof` | #3D1520 |
| The Angle Nobody Tells | `--bordeaux` | #6B2D3A |
| Édito sombre | `--vert-encre` | #1E3028 |

#### Tokens catégories — dans `base.css`, usage `explore.html` uniquement

| Rubrique | Token catégorie | Hex |
|----------|----------------|-----|
| Moved | `--cat-moved` | #C05870 |
| Your Brain on Music | `--cat-brain` | #3878B8 |
| Never Met | `--cat-never` | #6C3898 |
| The Pit | `--cat-pit` | #A02828 |
| Sound of Self | `--cat-self` | #5C9E78 |
| Off Record | `--cat-record` | #3D2952 |
| The Angle Nobody Tells | `--cat-angle` | #6B2D3A |

Tous les tokens `--cat-*` sont déclarés dans `base.css` sous le commentaire `COULEURS CATÉGORIES`. Pas besoin d'en ajouter lors de la création d'une nouvelle issue.

### Composants dans `base.css`
| Classe | Usage |
|--------|-------|
| `.s-header` | Header de section : numéro géant + label + règle horizontale |
| `.s-num` | Numéro géant italic (déborde à gauche hors viewport) |
| `.s-label` | Label de rubrique — DM Mono, opacity 0.38 |
| `.s-rule` | Règle horizontale — opacity 0.12 |
| `.reveal` | Élément animé à l'entrée dans le viewport |
| `.d1` `.d2` `.d3` | Délais d'animation (0.10s / 0.22s / 0.36s) |

### Composants dans `home.css`
| Classe | Usage |
|--------|-------|
| `.hero` | Grid 60/40 — colonne gauche titre+édito, colonne droite TOC |
| `.toc-item` | Ligne de TOC — `<a>` cliquable, grid titre + numéro |
| `.badge` | Badge rubrique — option B : bord gauche accentué, terra |
| `.deepcut-badge` | Badge Deep Cut — même style, couleur or |
| `.edito-dark` | Bloc vert encre (suite de l'édito crème) |
| `.essay-pullquote` | Citation mise en valeur |
| `.meam-box` | Encadré définition (Deep Cut) |
| `.question-wrap` | Section bordeaux profond |
| `.question-top` | Header 05 qui déborde sur la section précédente |

---

## Badges — règles d'usage

Les badges identifient la catégorie éditoriale d'un article. Style option B : bord gauche 2.5px, bordures fines 0.5px, fond transparent avec hover discret.

**Position :** juste après le titre de l'article, avant le sous-titre.

**Comportement :** `<a href="#section" class="badge">` — toujours cliquable, pointe vers la section correspondante.

**Couleur :** hérite de la couleur de la rubrique (voir tableau ci-dessus). Le `.badge` de base est en terra (Essay/Moved). Le `.deepcut-badge` est en or.

```html
<!-- Essay — Moved -->
<a href="#essay" class="badge">Moved</a>

<!-- Deep Cut — Your Brain on Music -->
<a href="#deepcut" class="deepcut-badge">Your Brain on Music</a>
```

Pour les rubriques futures, ajouter une classe dédiée dans `home.css` en suivant le même pattern que `.deepcut-badge`.

---

## Structure de `index.html` — Issue 00 : The First Time

Tagline d'issue : *"It only happens once."*

| # | Rubrique | Titre interne | Ancre | Couleur |
|---|----------|---------------|-------|---------|
| — | Hero + Édito crème | — | `#edito` | crème / vert encre |
| — | Édito sombre | Editor's Note | *(suite directe)* | vert encre |
| 02 | Essay | A promise | `#essay` | terra |
| 03 | Deep Cut | It hadn't got a past | `#deepcut` | or |
| 04 | The Angle Nobody Tells | 1977 — Fleetwood Mac | `#s1977` | bordeaux |
| 05 | The Question | — | `#question` | bordeaux profond |
| 06 | Playlist | The First Time | `#playlist` | terra |

### Hero
- Grid CSS `60fr 40fr` — gauche : ISSUE 00 → titre → tagline → texte édito crème. Droite : TOC.
- Titre : Fraunces italic, `clamp(72px, 9vw, 118px)`, mot *"First"* en terra.
- Tagline : Fraunces 300, `clamp(18px, 2vw, 24px)`.
- TOC : 6 entrées `<a class="toc-item">`, chaque `<a>` porte la classe directement (pas de `<div>` intermédiaire).
- L'ancre `#edito` est sur `.hero-edito-text` — pointe vers *"An opening song of a concert..."*

### TOC — règle de structure
```html
<!-- ✅ correct -->
<a href="#section" class="toc-item">
  <div class="toc-content">
    <span class="toc-rubrique">Essay</span>
    <span class="toc-sub">Why an album release</span>
  </div>
  <span class="toc-num">02</span>
</a>

<!-- ❌ incorrect — casse le grid -->
<a href="#section">
  <div class="toc-item">...</div>
</a>
```

### Section header — règle de structure
```html
<div class="s-header reveal">
  <span class="s-num" style="color: var(--terra);">02</span>
  <div class="s-rule-wrap">
    <span class="s-label">Essay</span>
    <span class="s-rule"></span>
  </div>
</div>
```
Le `.s-num` déborde à gauche via `margin-left: calc(-1 * var(--px) - 0.3em)`. Ne pas mettre `overflow: hidden` sur le parent.

### The Question — 05
Le `05` déborde visuellement sur la section `s1977` du dessus :
- `.question-top` a un `margin-top` négatif.
- `.question-top .s-num` a un `top` négatif supplémentaire.
- `.s1977` doit avoir un `padding-bottom` généreux pour que la transition soit lisible.

---

## Catégories éditoriales

| Catégorie | Description courte |
|-----------|-------------------|
| Moved | L'émotion. Ce qui se passe entre toi et la musique, seul. |
| Your Brain on Music | La science. Dopamine, mémoire, frisson. Jamais froide. |
| Never Met | Le parasocial. L'obsession. Les artistes qu'on n'a jamais rencontrés. |
| Off Record | Les artistes qui écrivent depuis leurs endroits les plus sombres. |
| The Pit | Les fandoms. Les espaces sûrs. Et le côté sombre. |
| Sound of Self | Ce que nos goûts disent de nous. |
| The Angle Nobody Tells | Une année par issue — le point de vue que personne ne raconte. |

---

## Règles éditoriales

- Pas d'images dans la publication.
- La palette ne change pas entre les issues. La couleur de rubrique ne change pas entre les issues.
- Le "I" sert d'ancre dans l'Essay. Le Deep Cut n'a pas de "I" — le lecteur est dedans à chaque phrase.
- Essay + Deep Cut : même sujet, angles opposés. L'un ressent, l'autre explique — jamais les deux Your Brain on Music.
- Les `s-label` et `s-rule` sont intentionnellement très discrets (opacity 0.38 / 0.12) — ne pas les remonter.

---

## Règles CSS — pièges à éviter

- **Ne jamais mettre `overflow: hidden`** sur un parent de `.s-num` — le numéro géant déborde intentionnellement.
- **Les `<a class="toc-item">` portent la classe directement** — pas de `<div class="toc-item">` à l'intérieur.
- **Fermer les balises dans l'ordre** — `<a>` ouvre, `</a>` ferme après tout son contenu. Un `</a>` avant `</div>` éjecte les éléments suivants hors du grid.
- **Les badges sont des `<a>`**, pas des `<span>` — toujours cliquables.

---

## Comment travailler avec Claude

**En début de session :** colle ce README + le fichier CSS ou HTML sur lequel tu travailles.

**Demandes efficaces :**
- ✅ "Voici mon `home.css` actuel. Je veux modifier uniquement le composant `.toc-item`."
- ✅ "Voici `index.html`. Ajoute le badge après le titre de l'essay."
- ❌ "Refais toute la homepage." (trop large — découpe en composants)

**Par composant, pas par page.** Une modification ciblée = moins de régression = moins de reconstruction.