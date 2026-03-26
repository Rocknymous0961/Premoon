const trends = [
  {
    id: 1,
    name: 'Afrobeats Slang Challenge',
    description: 'Remix old Naija slang into dance skits and challenge duets.',
    region: '🇳🇬 Nigeria',
    platforms: ['TikTok'],
    category: 'Challenge',
    timeframe: '14 days',
    virality: 45,
    zone: 'OPEN',
    pool: 340,
    believers: 78,
    timeRemaining: '5d 14h',
    expiry: '2026-04-05',
    submittedBy: 'temi_wave',
    pioneer: 'temi_wave',
    scoreHistory: [12, 18, 21, 29, 36, 39, 45],
  },
  {
    id: 2,
    name: 'Silent Walk Trend',
    description: 'Morning city walks with ambient audio, no talking, reflective captions.',
    region: '🌐 Global',
    platforms: ['TikTok', 'Instagram'],
    category: 'Lifestyle',
    timeframe: '30 days',
    virality: 28,
    zone: 'OPEN',
    pool: 1200,
    believers: 312,
    timeRemaining: '18d 02h',
    expiry: '2026-04-24',
    submittedBy: 'nadi.codes',
    pioneer: 'nadi.codes',
    scoreHistory: [5, 8, 11, 15, 17, 23, 28],
  },
  {
    id: 3,
    name: 'AI Girlfriend Meme Format',
    description: 'Screenshots and reactions to absurd AI partner prompts become meme template.',
    region: '🌐 Global',
    platforms: ['X', 'Instagram'],
    category: 'Meme',
    timeframe: '7 days',
    virality: 62,
    zone: 'LOCKED',
    pool: 4500,
    believers: 980,
    timeRemaining: '0d 09h',
    expiry: '2026-03-27',
    submittedBy: 'vibeoracle',
    pioneer: 'yemxx',
    scoreHistory: [21, 30, 34, 42, 50, 58, 62],
  },
  {
    id: 4,
    name: 'Jollof Wars Season 3',
    description: 'Cross-country cook-off debates return with spice-level rating videos.',
    region: '🌍 West Africa',
    platforms: ['X', 'TikTok'],
    category: 'Food',
    timeframe: '30 days',
    virality: 15,
    zone: 'OPEN',
    pool: 180,
    believers: 41,
    timeRemaining: '22d 08h',
    expiry: '2026-04-29',
    submittedBy: 'chefkemi',
    pioneer: 'chefkemi',
    scoreHistory: [3, 4, 5, 8, 10, 12, 15],
  },
  {
    id: 5,
    name: 'Faceless Creator Wave',
    description: 'Anonymous channels scaling through automation and voice-altered storytelling.',
    region: '🌐 Global',
    platforms: ['YouTube', 'TikTok'],
    category: 'Tech',
    timeframe: '14 days',
    virality: 78,
    zone: 'LOCKED',
    pool: 8900,
    believers: 1230,
    timeRemaining: '0d 02h',
    expiry: '2026-03-26',
    submittedBy: 'streamalpha',
    pioneer: 'latifx',
    scoreHistory: [29, 33, 45, 56, 62, 71, 78],
  },
  {
    id: 6,
    name: 'Lagos Street Food Tour Format',
    description: 'POV edits of hidden food spots with map pins and price overlays.',
    region: '🇳🇬 Nigeria',
    platforms: ['TikTok', 'YouTube'],
    category: 'Food',
    timeframe: '14 days',
    virality: 33,
    zone: 'WARNING',
    pool: 560,
    believers: 124,
    timeRemaining: '3d 19h',
    expiry: '2026-03-30',
    submittedBy: 'buka.bae',
    pioneer: 'walecutz',
    scoreHistory: [9, 12, 14, 19, 24, 30, 33],
  },
];

const leaderboard = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  username: i < 5 ? ['vibeoracle', 'temi_wave', 'nadi.codes', 'chefkemi', 'yemxx'][i] : `predictor_${i + 1}`,
  score: Math.max(300, 9800 - i * 67),
  winRate: `${Math.max(41, 89 - i * 0.3).toFixed(1)}%`,
  earnings: `$${(24400 - i * 133).toLocaleString()}`,
  badge: i === 0 ? 'Oracle' : i === 1 ? 'Pioneer' : i === 2 ? 'Early Believer' : 'Mid Entry',
}));

const app = document.getElementById('app');
const nav = document.getElementById('nav-links');
const modal = document.getElementById('buyin-modal');
const modalTrend = document.getElementById('modal-trend');
const modalTier = document.getElementById('modal-tier');
const modalReturn = document.getElementById('modal-return');

document.getElementById('modal-cancel').onclick = hideModal;
document.getElementById('modal-confirm').onclick = () => {
  hideModal();
  alert('Buy in confirmed. Position added to Portfolio.');
};

const routes = [
  ['home', 'Home'],
  ['discover', 'Discover'],
  ['submit', 'Submit Trend'],
  ['profile', 'Profile'],
  ['leaderboard', 'Leaderboard'],
  ['portfolio', 'Portfolio'],
];

function zoneClass(zone) {
  return zone.toLowerCase();
}

function progressColor(value) {
  if (value < 30) return 'var(--green)';
  if (value < 60) return 'var(--yellow)';
  return 'var(--red)';
}

function calcTier(believers) {
  if (believers < 10) return ['Pioneer', 'x1000'];
  if (believers < 100) return ['Early', 'x200'];
  if (believers < 500) return ['Mid', 'x20'];
  return ['Late', 'x3'];
}

function predictionCard(trend) {
  return `
  <article class="card glass" data-id="${trend.id}">
    <div class="row space-between gap-md wrap">
      <h3>${trend.name}</h3>
      <span class="zone ${zoneClass(trend.zone)}">${trend.zone}</span>
    </div>
    <p class="muted">${trend.description}</p>
    <div class="row gap-sm wrap">
      <span class="tag">${trend.region}</span>
      ${trend.platforms.map((p) => `<span class="tag">${p}</span>`).join('')}
    </div>
    <div style="margin-top:10px">
      <div class="row space-between"><span class="muted">Virality Score</span><strong>${trend.virality}%</strong></div>
      <div class="progress-wrap"><div class="progress" data-progress="${trend.virality}" style="background:${progressColor(trend.virality)}"></div></div>
    </div>
    <div class="row space-between" style="margin-top:10px">
      <span class="muted">Pool: $${trend.pool.toLocaleString()} USDT</span>
      <span class="muted">${trend.believers} believers</span>
    </div>
    <div class="row space-between" style="margin-top:8px">
      <span class="muted">⏳ ${trend.timeRemaining}</span>
      <button class="btn btn-secondary buyin-btn" data-id="${trend.id}">Buy In</button>
    </div>
  </article>`;
}

function renderNav() {
  nav.innerHTML = routes
    .map(([path, label]) => `<a href="#/${path}" class="${location.hash === `#/${path}` || (!location.hash && path === 'home') ? 'active' : ''}">${label}</a>`)
    .join('');
}

function renderHome() {
  const top5 = leaderboard.slice(0, 5);
  app.innerHTML = `
    <section class="hero glass">
      <h1>Predict the next viral trend. Get paid for being early.</h1>
      <p>The world's first cultural trend prediction market. Call it before it blows up.</p>
      <div class="row gap-md wrap" style="margin-top:16px;">
        <a class="btn btn-primary" href="#/submit">Start Predicting</a>
        <a class="btn btn-ghost" href="#/discover">Browse Trends</a>
      </div>
      <div class="stats-bar glass">
        <div class="stat"><span class="muted">Total Predictions</span><strong>1,264</strong></div>
        <div class="stat"><span class="muted">Total Pool Size</span><strong>$338,920</strong></div>
        <div class="stat"><span class="muted">Active Users</span><strong>9,842</strong></div>
        <div class="stat"><span class="muted">Payouts Made</span><strong>$1.2M</strong></div>
      </div>
    </section>
    <div class="section-title"><h2>Live Predictions</h2></div>
    <section class="grid">${trends.map(predictionCard).join('')}</section>
    <div class="section-title"><h2>Top Predictors</h2></div>
    <section class="glass card">
      ${top5
        .map(
          (u) => `<div class="row space-between leaderboard-row" style="padding:8px 2px;"><strong>#${u.rank} ${u.username}</strong><span>${u.score} pts</span></div>`
        )
        .join('')}
    </section>
  `;
}

function renderDiscover() {
  app.innerHTML = `
  <section class="glass card">
    <h2>Discover Prediction Pools</h2>
    <div class="form-grid" style="margin-top:12px;">
      <input class="input" id="search" placeholder="Search trend names..." />
      <select class="select" id="region"><option value="">All Regions</option><option>Nigeria</option><option>West Africa</option><option>Global</option></select>
      <select class="select" id="platform"><option value="">All Platforms</option><option>TikTok</option><option>X</option><option>Instagram</option><option>YouTube</option></select>
      <select class="select" id="zone"><option value="">Any Zone</option><option>OPEN</option><option>WARNING</option><option>LOCKED</option></select>
      <select class="select" id="timeframe"><option value="">Any Timeframe</option><option>7 days</option><option>14 days</option><option>30 days</option></select>
      <select class="select" id="category"><option value="">Any Category</option><option>Music</option><option>Fashion</option><option>Food</option><option>Challenge</option><option>Meme</option><option>Phrase</option><option>Dance</option><option>Tech</option><option>Other</option></select>
      <select class="select" id="sort"><option>Newest</option><option>Hottest</option><option>Highest Pool</option><option>Ending Soon</option></select>
    </div>
  </section>
  <div class="section-title"><h2>All Predictions</h2></div>
  <section id="discover-grid" class="grid"></section>`;

  const grid = document.getElementById('discover-grid');
  const controls = ['search', 'region', 'platform', 'zone', 'timeframe', 'category', 'sort'].map((id) => document.getElementById(id));

  const draw = () => {
    const [search, region, platform, zone, timeframe, category, sort] = controls.map((e) => e.value);
    let list = [...trends].filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) &&
      (!region || t.region.toLowerCase().includes(region.toLowerCase())) &&
      (!platform || t.platforms.includes(platform)) &&
      (!zone || t.zone === zone) &&
      (!timeframe || t.timeframe === timeframe) &&
      (!category || t.category === category)
    );

    if (sort === 'Hottest') list.sort((a, b) => b.virality - a.virality);
    if (sort === 'Highest Pool') list.sort((a, b) => b.pool - a.pool);
    if (sort === 'Ending Soon') list.sort((a, b) => a.timeRemaining.localeCompare(b.timeRemaining));

    grid.innerHTML = list.map(predictionCard).join('') || '<p class="muted">No trends found.</p>';
    bindCardActions();
    animateProgress();
  };

  controls.forEach((c) => c.addEventListener('input', draw));
  draw();
}

function renderPool(id) {
  const trend = trends.find((t) => t.id === Number(id)) || trends[0];
  const [tier, multi] = calcTier(trend.believers);

  app.innerHTML = `
    <section class="glass card">
      <h2>${trend.name}</h2>
      <p class="muted">${trend.description}</p>
      <p class="muted">Submitted by <strong>${trend.submittedBy}</strong> ${trend.submittedBy === trend.pioneer ? '<span class="tag">Pioneer</span>' : ''}</p>
      <div class="row gap-sm wrap"><span class="tag">${trend.region}</span>${trend.platforms.map((p) => `<span class="tag">${p}</span>`).join('')}</div>

      <div style="margin:12px 0;">
        <div class="row space-between"><span>Virality Score</span><strong>${trend.virality}%</strong></div>
        <div class="progress-wrap" style="height:14px;"><div class="progress" data-progress="${trend.virality}" style="background:${progressColor(trend.virality)}"></div></div>
      </div>

      <div class="banner zone ${zoneClass(trend.zone)}">${trend.zone} ZONE: ${trend.zone === 'LOCKED' ? 'New buy-ins are highly risky.' : trend.zone === 'WARNING' ? 'Approaching lock threshold.' : 'Early discovery window active.'}</div>

      <div class="grid">
        <div class="glass card"><span class="muted">Total Pool</span><h3>$${trend.pool.toLocaleString()} USDT</h3></div>
        <div class="glass card"><span class="muted">Believers</span><h3>${trend.believers}</h3></div>
        <div class="glass card"><span class="muted">Price per Unit</span><h3>$${(1 + trend.virality / 100).toFixed(2)}</h3></div>
        <div class="glass card"><span class="muted">Time Remaining</span><h3>${trend.timeRemaining}</h3><small>${trend.expiry}</small></div>
      </div>
    </section>

    <section class="glass card" style="margin-top:12px;">
      <h3>Entry Tier Breakdown</h3>
      <table class="table">
        <tr><th>Tier</th><th>Slot</th><th>Potential Return</th></tr>
        <tr><td>Pioneer</td><td>first 10 buyers</td><td>up to x1000</td></tr>
        <tr><td>Early</td><td>next 90 buyers</td><td>up to x200</td></tr>
        <tr><td>Mid</td><td>next 400 buyers</td><td>up to x20</td></tr>
        <tr><td>Late</td><td>everyone else</td><td>up to x3</td></tr>
      </table>
    </section>

    <section class="glass card" style="margin-top:12px;">
      <h3>Buy In</h3>
      <div class="form-grid">
        <div><label>Amount (USDT)</label><input id="buy-amount" class="input" type="number" value="25" min="1"/></div>
        <div><label>Your Current Tier</label><div class="input">${tier}</div></div>
        <div><label>Estimated Return</label><div class="input" id="est-return">$${(25 * Number(multi.replace('x', ''))).toLocaleString()}</div></div>
      </div>
      <div class="row end" style="margin-top:10px;"><button id="pool-buy" class="btn btn-primary">Buy In Now</button></div>
    </section>

    <section class="grid" style="margin-top:12px;">
      <div class="glass card">
        <h3>Believers</h3>
        <table class="table">
          <tr><th>User</th><th>Staked</th><th>Tier</th><th>Time</th></tr>
          <tr><td>ayo_prime</td><td>$120</td><td>Early</td><td>2h ago</td></tr>
          <tr><td>zenna</td><td>$25</td><td>Mid</td><td>36m ago</td></tr>
          <tr><td>mrflux</td><td>$88</td><td>Mid</td><td>18m ago</td></tr>
        </table>
      </div>
      <div class="glass card">
        <h3>Comments & Debate</h3>
        <div class="row gap-sm">
          <button class="tab active" id="believer-toggle">Believer</button>
          <button class="tab" id="skeptic-toggle">Skeptic</button>
        </div>
        <textarea placeholder="Drop your take on why this trend will or won't blow up."></textarea>
        <div class="row end" style="margin-top:8px;"><button class="btn btn-secondary">Post Comment</button></div>
      </div>
    </section>

    <section class="glass card" style="margin-top:12px;">
      <h3>Virality Score History</h3>
      <canvas id="chart" class="chart"></canvas>
    </section>
  `;

  const amount = document.getElementById('buy-amount');
  const output = document.getElementById('est-return');
  amount.addEventListener('input', () => {
    output.textContent = `$${(Number(amount.value || 0) * Number(multi.replace('x', ''))).toLocaleString()}`;
  });

  document.getElementById('pool-buy').onclick = () => showModal(trend, tier, multi);

  document.getElementById('believer-toggle').onclick = () => {
    document.getElementById('believer-toggle').classList.add('active');
    document.getElementById('skeptic-toggle').classList.remove('active');
  };

  document.getElementById('skeptic-toggle').onclick = () => {
    document.getElementById('skeptic-toggle').classList.add('active');
    document.getElementById('believer-toggle').classList.remove('active');
  };

  drawChart(trend.scoreHistory);
  animateProgress();
}

function drawChart(points) {
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = canvas.clientWidth * 2);
  const h = (canvas.height = canvas.clientHeight * 2);
  ctx.scale(2, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (height / 4) * i);
    ctx.lineTo(width, (height / 4) * i);
    ctx.stroke();
  }

  ctx.strokeStyle = '#8B5CF6';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = (i / (points.length - 1)) * (width - 16) + 8;
    const y = height - (p / 100) * (height - 20) - 10;
    if (!i) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function renderSubmit() {
  app.innerHTML = `
  <section class="glass card">
    <h2>Submit a Trend</h2>
    <div class="form-grid">
      <div><label>Trend name</label><input class="input" placeholder="Trend name" /></div>
      <div><label>Region scope</label><select class="select"><option>Nigeria</option><option>West Africa</option><option>Global</option></select></div>
      <div><label>Category</label><select class="select"><option>Music</option><option>Fashion</option><option>Food</option><option>Challenge</option><option>Meme</option><option>Phrase</option><option>Dance</option><option>Tech</option><option>Other</option></select></div>
      <div><label>Timeframe</label><select class="select"><option>7 days</option><option>14 days</option><option>30 days</option></select></div>
      <div><label>Platforms</label><select class="select" multiple><option>TikTok</option><option>X</option><option>Instagram</option><option>YouTube</option></select></div>
      <div><label>Your stake amount (min 1 USDT)</label><input type="number" class="input" min="1" value="1" /></div>
    </div>
    <div style="margin-top:12px;"><label>Describe the trend</label><textarea></textarea></div>
    <div style="margin-top:12px;"><label>Why will this go viral?</label><textarea></textarea></div>
    <div class="glass card" style="margin-top:12px;">
      <h3>Submission Rules</h3>
      <ul>
        <li>Trends already viral will be rejected.</li>
        <li>Duplicate trends will be rejected.</li>
        <li>Submission stake is non-refundable if trend flops.</li>
      </ul>
    </div>
    <button class="btn btn-primary" style="margin-top:12px;">Submit Trend</button>
  </section>`;
}

function renderProfile() {
  app.innerHTML = `
  <section class="glass card">
    <div class="row space-between wrap">
      <div>
        <h2>@vibeoracle</h2>
        <p class="profile-score">9,820</p>
        <p class="muted">Prediction Score</p>
      </div>
      <div class="tag">Avatar: 🧠</div>
    </div>
    <div class="stats-bar glass">
      <div class="stat"><span class="muted">Total Predictions</span><strong>311</strong></div>
      <div class="stat"><span class="muted">Correct Calls</span><strong>229</strong></div>
      <div class="stat"><span class="muted">Win Rate</span><strong>73.6%</strong></div>
      <div class="stat"><span class="muted">Total Earnings</span><strong>$24,400</strong></div>
    </div>

    <h3>Badge Collection</h3>
    <div class="badges">
      <div class="badge-card badge-gold">🥇 Pioneer Badge (Gold)</div>
      <div class="badge-card badge-silver">🥈 Early Believer Badge (Silver)</div>
      <div class="badge-card badge-bronze">🥉 Mid Entry Badge (Bronze)</div>
      <div class="badge-card badge-purple">🟣 Revival Caller Badge (Purple)</div>
      <div class="badge-card badge-purple">🔮 Oracle Badge</div>
    </div>

    <div class="tabs">
      <div class="tab active">Active Positions</div>
      <div class="tab">History</div>
      <div class="tab">Submitted Trends</div>
    </div>
    <table class="table">
      <tr><th>Trend</th><th>Status</th><th>Outcome</th><th>Payout</th></tr>
      <tr><td>Silent Walk Trend</td><td>Active</td><td>-</td><td>Est. $500</td></tr>
      <tr><td>AI Girlfriend Meme Format</td><td>Settled</td><td>Viral ✅</td><td>$1,240</td></tr>
      <tr><td>Jollof Wars Season 2</td><td>Settled</td><td>Flopped ❌</td><td>$0</td></tr>
    </table>
  </section>`;
}

function renderLeaderboard() {
  app.innerHTML = `
  <section class="glass card">
    <div class="row space-between wrap">
      <h2>Top 100 Predictors</h2>
      <div class="row gap-sm wrap">
        <select class="select" style="max-width:150px"><option>Global</option><option>Nigeria</option><option>West Africa</option></select>
        <select class="select" style="max-width:150px"><option>This Week</option><option>This Month</option><option>All Time</option></select>
      </div>
    </div>
    <table class="table">
      <tr><th>Rank</th><th>Username</th><th>Prediction Score</th><th>Win Rate</th><th>Total Earnings</th><th>Top Badge</th></tr>
      ${leaderboard
        .map(
          (u) => `<tr class="leaderboard-row ${u.rank === 1 ? 'top-1' : u.rank === 2 ? 'top-2' : u.rank === 3 ? 'top-3' : ''}">
          <td>#${u.rank}</td><td>${u.username}</td><td>${u.score}</td><td>${u.winRate}</td><td>${u.earnings}</td><td>${u.badge}</td></tr>`
        )
        .join('')}
    </table>
  </section>`;
}

function renderPortfolio() {
  app.innerHTML = `
  <section class="glass card">
    <h2>Portfolio Overview</h2>
    <div class="stats-bar glass">
      <div class="stat"><span class="muted">Total Staked</span><strong>$3,820</strong></div>
      <div class="stat"><span class="muted">Est. Payout (If Viral)</span><strong>$18,660</strong></div>
      <div class="stat"><span class="muted">Realized Earnings</span><strong>$6,490</strong></div>
      <div class="stat"><span class="muted">WAVE Holdings</span><strong>12,400</strong></div>
    </div>
    <div class="grid" style="margin-top:12px;">
      ${trends
        .slice(0, 4)
        .map(
          (t) => `<div class="glass card">
          <h3>${t.name}</h3>
          <p class="muted">Staked: $${(50 + t.id * 45).toLocaleString()} | Tier: ${calcTier(t.believers)[0]}</p>
          <p class="muted">Virality: ${t.virality}% | Est. payout: $${(t.virality * 21).toLocaleString()}</p>
          <span class="zone ${zoneClass(t.zone)}">${t.zone}</span>
        </div>`
        )
        .join('')}
    </div>
  </section>`;
}

function bindCardActions() {
  document.querySelectorAll('.card[data-id]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('buyin-btn')) return;
      location.hash = `#/pool/${card.dataset.id}`;
    });
  });

  document.querySelectorAll('.buyin-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trend = trends.find((t) => t.id === Number(btn.dataset.id));
      const [tier, multi] = calcTier(trend.believers);
      showModal(trend, tier, multi);
    });
  });
}

function animateProgress() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.progress').forEach((el) => {
      el.style.width = `${el.dataset.progress}%`;
    });
  });
}

function showModal(trend, tier, multi) {
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  modalTrend.textContent = trend.name;
  modalTier.textContent = tier;
  modalReturn.textContent = `${multi} potential`; 
}

function hideModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function router() {
  renderNav();
  const hash = location.hash.replace('#/', '') || 'home';
  const [route, id] = hash.split('/');

  if (route === 'home') renderHome();
  else if (route === 'discover') renderDiscover();
  else if (route === 'pool') renderPool(id);
  else if (route === 'submit') renderSubmit();
  else if (route === 'profile') renderProfile();
  else if (route === 'leaderboard') renderLeaderboard();
  else if (route === 'portfolio') renderPortfolio();
  else renderHome();

  bindCardActions();
  animateProgress();
}

window.addEventListener('hashchange', router);
window.addEventListener('resize', () => {
  const hash = location.hash.replace('#/', '');
  if (hash.startsWith('pool/')) {
    const id = hash.split('/')[1];
    renderPool(id);
  }
});

router();
