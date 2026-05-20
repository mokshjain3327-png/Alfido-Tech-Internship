// =============================================
// NETFLIX CLONE — script.js
// Features:
//  1. Navbar background on scroll
//  2. Card row slider (left/right arrows)
//  3. Hero title auto-cycle
//  4. Card hover preview tooltip
// =============================================


// ─────────────────────────────────────────────
// 1. NAVBAR — Add .scrolled class on scroll
// ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ─────────────────────────────────────────────
// 2. CARD ROW SLIDER
//    Each row scrolls by ~3 card widths on arrow click
// ─────────────────────────────────────────────
const SCROLL_AMOUNT = 600; // pixels

document.querySelectorAll('.arrow').forEach(button => {
  button.addEventListener('click', () => {
    const rowIndex = button.getAttribute('data-row');
    const rowEl = document.getElementById(`row-${rowIndex}`);

    if (!rowEl) return;

    if (button.classList.contains('arrow-right')) {
      rowEl.scrollLeft += SCROLL_AMOUNT;
    } else {
      rowEl.scrollLeft -= SCROLL_AMOUNT;
    }
  });
});


// ─────────────────────────────────────────────
// 3. HERO AUTO-CYCLE
//    Cycles through featured titles every 6s
// ─────────────────────────────────────────────
const heroData = [
  {
    badge: 'N SERIES',
    title: 'Stranger Things',
    desc: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    match: '98%',
    year: '2016',
    rating: 'TV-14',
    seasons: '4 Seasons',
    bg: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1600',
  },
  {
    badge: 'N FILM',
    title: 'Extraction',
    desc: 'Tyler Rake, a fearless black market mercenary, embarks on the most deadly extraction of his career when he\'s enlisted to rescue the kidnapped son of an imprisoned international crime lord.',
    match: '95%',
    year: '2020',
    rating: 'R',
    seasons: '2 Parts',
    bg: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600',
  },
  {
    badge: 'N SERIES',
    title: 'Dark',
    desc: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the double lives and fractured relationships among four families.',
    match: '97%',
    year: '2017',
    rating: 'TV-MA',
    seasons: '3 Seasons',
    bg: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=1600',
  },
];

let heroIndex = 0;

const heroSection  = document.querySelector('.hero');
const heroBadge    = document.querySelector('.hero-badge');
const heroTitle    = document.querySelector('.hero-title');
const heroDesc     = document.querySelector('.hero-desc');
const heroMatch    = document.querySelector('.match');
const heroYear     = document.querySelector('.year');
const heroRating   = document.querySelector('.rating');
const heroSeasons  = document.querySelector('.seasons');

function setHero(data) {
  // Fade out
  heroSection.style.opacity = '0';
  heroSection.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    heroSection.style.backgroundImage = `url('${data.bg}')`;
    heroBadge.textContent  = data.badge;
    heroTitle.textContent  = data.title;
    heroDesc.textContent   = data.desc;
    heroMatch.textContent  = `${data.match} Match`;
    heroYear.textContent   = data.year;
    heroRating.textContent = data.rating;
    heroSeasons.textContent = data.seasons;

    // Fade back in
    heroSection.style.opacity = '1';
  }, 500);
}

// Auto-cycle every 6 seconds
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroData.length;
  setHero(heroData[heroIndex]);
}, 6000);


// ─────────────────────────────────────────────
// 4. CARD HOVER — Show quick action bar
//    Adds +List / Like / Dislike icons on hover
// ─────────────────────────────────────────────
document.querySelectorAll('.card').forEach(card => {
  // Build action bar once
  const actions = document.createElement('div');
  actions.className = 'card-actions';
  actions.innerHTML = `
    <button class="ca-btn" title="Play">▶</button>
    <button class="ca-btn" title="Add to List">＋</button>
    <button class="ca-btn" title="Like">👍</button>
    <button class="ca-btn" title="More Info">⌄</button>
  `;
  card.appendChild(actions);

  // Style injected inline so no extra CSS file needed
  actions.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    padding: 6px 4px;
    background: rgba(24,24,24,0.95);
    opacity: 0;
    transition: opacity 0.25s ease;
    border-top: 2px solid #e50914;
  `;

  actions.querySelectorAll('.ca-btn').forEach(btn => {
    btn.style.cssText = `
      background: transparent;
      border: none;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      padding: 2px 4px;
      transition: color 0.2s;
    `;
    btn.addEventListener('mouseenter', () => btn.style.color = '#e50914');
    btn.addEventListener('mouseleave', () => btn.style.color = '#fff');

    // +List feedback
    if (btn.title === 'Add to List') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.textContent = '✓';
        btn.style.color = '#46d369';
      });
    }
  });

  card.addEventListener('mouseenter', () => { actions.style.opacity = '1'; });
  card.addEventListener('mouseleave', () => { actions.style.opacity = '0'; });
});


// ─────────────────────────────────────────────
// 5. PLAY BUTTON — Simple alert placeholder
// ─────────────────────────────────────────────
document.querySelector('.btn-play').addEventListener('click', () => {
  alert('▶  Playing: ' + document.querySelector('.hero-title').textContent);
});

document.querySelector('.btn-info').addEventListener('click', () => {
  alert('ℹ  More info for: ' + document.querySelector('.hero-title').textContent);
});


// ─────────────────────────────────────────────
// console log on load
// ─────────────────────────────────────────────
console.log('%cNetflix Clone Loaded 🎬', 'color:#e50914; font-size:18px; font-weight:bold;');
