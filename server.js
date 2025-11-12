// ===== server.js — Part 1 of 5 =====
// Paste part 1, then parts 2,3,4,5 in order to form the complete server.js (~2000 lines).
// Make sure you save the final file and run: node server.js

const express = require("express");
const os = require("os");
const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ---------- Utility helpers ----------
function safeExec(cmd, opts = {}) {
  try {
    return execSync(cmd, { stdio: ["pipe", "pipe", "pipe"], timeout: 8000, ...opts }).toString();
  } catch (e) {
    // return trimmed error message or empty string
    if (e && e.stdout) {
      try { return e.stdout.toString(); } catch (e2) { return ""; }
    }
    return "";
  }
}

function prettyBytes(n) {
  if (!n && n !== 0) return "N/A";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let u = 0;
  while (n >= 1024 && u < units.length - 1) { n /= 1024; u++; }
  return `${n.toFixed(2)} ${units[u]}`;
}

function nowISO() { return new Date().toISOString(); }

// ---------- Profile and content (edit these to customize) ----------
const PROFILE = {
  name: "Rajat Sharma",
  title: "DevOps Engineer | Kubernetes, CI/CD, Cloud Automation",
  location: "Jhunjhunu, Rajasthan, India",
  email: "linuxrajat007@gmail.com",
  github: "https://github.com/rajatsharma-dev",
  linkedin: "https://linkedin.com/in/rajat55",
  intro: "I build cinematic cloud systems that are reliable, observable, and automated."
};

const EXPERIENCE = [
  {
    company: "Ericsson",
    role: "DevOps Engineer",
    period: "2023 - Present",
    bullets: [
      "Managing 14+ Linux servers, automating monitoring and alerting.",
      "Building and maintaining Jenkins CI pipelines and automated deployments.",
      "Working with AWS, Terraform, and Helm to deliver reliable infra."
    ]
  },
  {
    company: "Freelance",
    role: "DevOps Consultant",
    period: "2021 - 2023",
    bullets: [
      "Designed containerized pipelines and delivered production-ready Kubernetes setups.",
      "Delivered observability stacks based on Prometheus, Grafana, and Loki."
    ]
  }
];

const SKILLS = [
  { name: "Kubernetes", level: 92 },
  { name: "AWS", level: 90 },
  { name: "Docker", level: 88 },
  { name: "Linux", level: 95 },
  { name: "Jenkins", level: 86 },
  { name: "Terraform", level: 82 }
];

const CERTIFICATES = [
  { name: "CKA", org: "CNCF", year: 2024 },
  { name: "Docker Certified Professional", org: "Docker", year: 2023 }
];

const PROJECTS = [
  {
    id: "proj-node-cicd",
    title: "Node CI/CD Demo",
    short: "Jenkins pipeline, Helm, Minikube, automated health checks",
    details: "A full pipeline building images inside Minikube daemon, deploying via Helm, and verifying health with in-cluster checks and port-forward automation."
  },
  {
    id: "proj-monitoring",
    title: "K8s Monitoring",
    short: "Prometheus, Grafana, Loki setup",
    details: "Centralized metrics and logs with alerting rules and dashboards tailored for node and app health."
  }
];

// ---------- HTML assembly approach ----------
const htmlChunks = []; // we will push HTML strings in parts and join in final part

// Part 1 pushes the initial HTML head plus nav and opening hero
htmlChunks.push(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${PROFILE.name} — ${PROFILE.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root{
      --bg0:#00030a;
      --bg1:#001a33;
      --neon:#00f0ff;
      --glow:#0077ff;
      --muted:#aee7ff;
      --card:rgba(255,255,255,0.04);
    }
    html,body{height:100%;margin:0;padding:0;font-family:'Poppins',system-ui,Arial;background:linear-gradient(180deg,var(--bg1),var(--bg0));color:var(--muted);-webkit-font-smoothing:antialiased}
    canvas#bg{position:fixed;left:0;top:0;width:100%;height:100%;z-index:-1}
    .wrap{max-width:1180px;margin:0 auto;padding:18px}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 6%;position:sticky;top:0;background:linear-gradient(90deg,rgba(255,255,255,0.02),transparent);backdrop-filter:blur(8px);z-index:30;border-bottom:1px solid rgba(255,255,255,0.02)}
    .brand{display:flex;align-items:center;gap:12px;cursor:pointer}
    .brand .logo{width:48px;height:48px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg,var(--neon),var(--glow));box-shadow:0 8px 40px rgba(0,240,255,0.06)}
    .brand .text{font-weight:800;color:var(--neon)}
    .nav{display:flex;gap:16px;align-items:center}
    .nav a{color:var(--muted);text-decoration:none;font-weight:600;padding:8px 10px;border-radius:8px}
    .nav a:hover{color:var(--neon);background:rgba(0,255,255,0.03)}
    .hero{padding:72px 6% 40px;text-align:center}
    h1{font-size:3.4rem;margin:6px 0;background:linear-gradient(90deg,var(--neon),var(--glow));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:1.2px}
    h2{font-size:1.45rem;margin-top:8px;color:rgba(174,231,255,0.9)}
    p.lead{max-width:880px;margin:18px auto 0;color:rgba(174,231,255,0.85);line-height:1.7}
    .cta{margin-top:26px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn{background:linear-gradient(90deg,var(--neon),var(--glow));padding:12px 22px;border-radius:999px;color:#001;font-weight:800;text-decoration:none;box-shadow:0 10px 40px rgba(0,240,255,0.06)}
    .btn.secondary{background:transparent;border:1px solid rgba(255,255,255,0.04);color:var(--muted)}
    .main-grid{display:grid;grid-template-columns:1fr 380px;gap:24px;padding:30px 6%}
    .panel{background:var(--card);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.02)}
    .section-title{font-weight:800;color:var(--neon);margin-bottom:10px;font-size:1.05rem}
    .projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
    .proj{padding:12px;border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.02)}
    .proj h4{margin:0;color:#eaffff}
    .side{position:sticky;top:90px}
    .skill-bar{height:10px;background:rgba(255,255,255,0.04);border-radius:999px;overflow:hidden}
    .skill-bar > i{display:block;height:100%;background:linear-gradient(90deg,var(--neon),var(--glow))}
    footer{padding:36px 6%;text-align:center;color:rgba(174,231,255,0.6);border-top:1px solid rgba(255,255,255,0.02);margin-top:40px}
    @media(max-width:980px){.main-grid{grid-template-columns:1fr;padding:20px 4%}.nav{display:none}}
  </style>
</head>
<body>
<canvas id="bg"></canvas>
<div class="topbar wrap">
  <div class="brand" onclick="openMenu()">
    <div class="logo" aria-hidden="true">R</div>
    <div class="text">${PROFILE.name}</div>
  </div>
  <div class="nav">
    <a href="#about">About</a>
    <a href="#experience">Experience</a>
    <a href="#projects">Projects</a>
    <a href="/dashboard" target="_blank">Dashboard</a>
    <a href="/logs" target="_blank">Logs</a>
  </div>
</div>

<section class="hero">
  <h1>${PROFILE.name}</h1>
  <h2>${PROFILE.title}</h2>
  <p class="lead">${PROFILE.intro} I focus on automation, observability, and pragmatic design.</p>
  <div class="cta">
    <a class="btn" href="#projects">See Projects</a>
    <a class="btn secondary" href="#experience">View Experience</a>
    <a class="btn secondary" href="/metrics">Live Metrics</a>
  </div>
</section>

<div class="main-grid wrap">
  <div>
    <section id="about" class="panel">
      <div class="section-title">About</div>
      <div style="color:rgba(174,231,255,0.9);line-height:1.6">
        <strong>${PROFILE.name}</strong> — ${PROFILE.title}. Based in ${PROFILE.location}. Reach at <a href="mailto:${PROFILE.email}" style="color:var(--neon)">${PROFILE.email}</a>.
      </div>
    </section>

    <section id="experience" class="panel" style="margin-top:16px">
      <div class="section-title">Experience</div>
      <div>
`);

// end of Part 1
// ===== server.js — Part 2 of 5 =====
// Continue appending HTML chunks and JS behavior

htmlChunks.push(`

        ${EXPERIENCE.map(exp => `
          <div style="margin-bottom:14px;padding:10px;border-radius:8px;background:linear-gradient(90deg, rgba(0,0,0,0.12), transparent);">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:800;color:var(--neon)">${exp.role}</div>
                <div style="font-size:0.92rem;color:rgba(174,231,255,0.85)">${exp.company} · ${exp.period}</div>
              </div>
              <div style="font-size:0.85rem;color:rgba(174,231,255,0.6)">${exp.period}</div>
            </div>
            <div style="margin-top:8px;color:var(--muted);line-height:1.6">
              <ul style="margin:6px 0 0 18px;padding:0;">
                ${exp.bullets.map(b => `<li style="margin:6px 0">${b}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}

      </div>
    </section>

    <section id="projects" class="panel" style="margin-top:18px">
      <div class="section-title">Featured Projects</div>
      <div class="projects-grid">
        ${PROJECTS.map(p => `
          <div class="proj">
            <h4>${p.title}</h4>
            <div style="margin-top:8px;color:var(--muted)">${p.short}</div>
            <div style="margin-top:10px;display:flex;gap:8px">
              <button class="btn" onclick="openProjectModal('${p.id}')">Open</button>
              <button class="btn secondary" onclick="copyProjectLink('${p.id}')">Copy Link</button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section id="contact" class="panel" style="margin-top:18px">
      <div class="section-title">Contact</div>
      <div style="color:var(--muted);line-height:1.6">
        <p>If you want to connect: <strong style="color:var(--neon)">${PROFILE.email}</strong></p>
        <p>GitHub: <a href="${PROFILE.github}" target="_blank" style="color:var(--neon)">${PROFILE.github}</a></p>
      </div>
    </section>
  </div>

  <aside class="side">
    <div class="panel" style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:900;color:var(--neon);font-size:16px">${PROFILE.name}</div>
          <div style="font-size:12px;color:rgba(174,231,255,0.8)">${PROFILE.title}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:12px;color:var(--muted)">${PROFILE.location}</div>
          <div style="font-size:12px;color:var(--muted)">${nowISO().slice(0,10)}</div>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="section-title">Skills</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">
        ${SKILLS.map(s => `
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="font-weight:700">${s.name}</div>
              <div style="font-size:12px;color:var(--muted)">${s.level}%</div>
            </div>
            <div class="skill-bar" style="margin-top:6px"><i style="width:${s.level}%;"></i></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="panel" style="margin-bottom:14px">
      <div class="section-title">Certificates</div>
      <ul style="margin-top:8px;color:var(--muted)">
        ${CERTIFICATES.map(c => `<li style="margin:8px 0">${c.name}, ${c.org} · ${c.year}</li>`).join('')}
      </ul>
    </div>

    <div class="panel">
      <div class="section-title">Quick Actions</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">
        <a class="btn secondary" href="/dashboard" target="_blank">Open Dashboard</a>
        <a class="btn secondary" href="/metrics" target="_blank">Live Metrics</a>
        <a class="btn secondary" href="/logs" target="_blank">View Logs</a>
        <a class="btn secondary" href="${PROFILE.github}" target="_blank">GitHub</a>
      </div>
    </div>
  </aside>
</div>

<!-- Project Modal (client-side will populate) -->
<div id="projectModal" style="display:none;position:fixed;inset:0;z-index:60;align-items:center;justify-content:center;background:rgba(0,0,0,0.7)">
  <div style="width:92%;max-width:900px;background:linear-gradient(180deg, rgba(0,0,0,0.92), rgba(0,0,0,0.98));padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.03);color:var(--muted)">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div style="font-weight:800;color:var(--neon)" id="pmTitle">Project</div>
      <div style="font-weight:800;cursor:pointer;color:var(--muted)" onclick="closeProjectModal()">✕</div>
    </div>
    <div id="pmBody" style="margin-top:12px;line-height:1.6"></div>
    <div style="margin-top:12px;display:flex;gap:8px">
      <button class="btn" onclick="pmRun()">Run Demo</button>
      <button class="btn secondary" onclick="pmClose()">Close</button>
    </div>
  </div>
</div>

<script>
  // ---------- client-side project data (mirrors server PROJECTS) ----------
  const PROJECTS = ${JSON.stringify(PROJECTS)};

  function openProjectModal(id){
    const p = PROJECTS.find(x => x.id === id);
    if(!p) return;
    document.getElementById('pmTitle').innerText = p.title;
    document.getElementById('pmBody').innerHTML = '<div style="color:#eaffff;font-weight:700">'+p.short+'</div><div style="margin-top:8px;color:var(--muted)">'+p.details+'</div>';
    document.getElementById('projectModal').style.display = 'flex';
  }
  function closeProjectModal(){ document.getElementById('projectModal').style.display = 'none'; }
  function pmRun(){ alert('Demo run is environment-specific; run from your CI/CD pipeline'); }
  function pmClose(){ closeProjectModal(); }

  function copyProjectLink(id){
    const url = location.origin + '/?project=' + id;
    navigator.clipboard && navigator.clipboard.writeText(url);
    alert('Copied: ' + url);
  }

  // open menu stub (we'll add full-screen menu later)
  function openMenu(){ alert('Open the cinematic menu (implemented in part 4)'); }

  // If URL contains project param, open modal automatically
  (function(){
    const u = new URL(location.href);
    const pid = u.searchParams.get('project');
    if(pid){ setTimeout(()=>openProjectModal(pid), 600); }
  })();
`);

// end of Part 2
// ===== server.js — Part 3 of 5 =====
// Paste this immediately after Part 2 in your server.js

htmlChunks.push(`

<script>
/* ---------- Cinematic background & small UI helpers (Part 3) ---------- */
(function(){
  const cvs = document.getElementById('bg');
  const ctx = cvs.getContext('2d');
  let W = cvs.width = innerWidth;
  let H = cvs.height = innerHeight;

  const particles = [];
  const PCOUNT = Math.max(40, Math.floor((W*H)/120000));
  for(let i=0;i<PCOUNT;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.8 + 0.6,
      vx: (Math.random()-0.5)*0.6,
      vy: (Math.random()-0.5)*0.6,
      hue: 190 + Math.random()*40
    });
  }

  function resize(){
    W = cvs.width = innerWidth;
    H = cvs.height = innerHeight;
  }
  addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,W,H);
    // subtle vignette
    const g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0, 'rgba(0,10,20,0.18)');
    g.addColorStop(1, 'rgba(0,0,0,0.28)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x < -10) p.x = W + 10;
      if(p.x > W + 10) p.x = -10;
      if(p.y < -10) p.y = H + 10;
      if(p.y > H + 10) p.y = -10;

      ctx.beginPath();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*12);
      gradient.addColorStop(0, `hsla(${p.hue},90%,55%,0.14)`);
      gradient.addColorStop(0.4, `hsla(${p.hue},80%,45%,0.06)`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
      ctx.fill();
    });

    // linking lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d2 = dx*dx+dy*dy;
        if(d2 < 16000){
          const alpha = 0.12 - (d2/16000)*0.1;
          ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- small helpers for UI and project modal persistence ---------- */
(function(){
  window.openProjectModal = function(id){
    // keep history state to allow back button
    history.replaceState({project:id}, '', '?project='+id);
    const ev = new Event('openProject');
    ev.detail = { id };
    document.dispatchEvent(ev);
    // find modal function already defined in part 2
    const p = PROJECTS.find(x=>x.id===id);
    if(p){
      document.getElementById('pmTitle').innerText = p.title;
      document.getElementById('pmBody').innerHTML = '<div style="color:#eaffff;font-weight:700">'+p.short+'</div><div style="margin-top:8px;color:var(--muted)">'+p.details+'</div>';
      document.getElementById('projectModal').style.display = 'flex';
    }
  };

  window.closeProjectModal = function(){
    document.getElementById('projectModal').style.display = 'none';
    history.replaceState({}, '', location.pathname);
  };

  // keyboard close
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeProjectModal();
  });

  // small theme toggle saved to localStorage (will be used in part 4/5)
  window.toggleTheme = function(){
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pj_theme', next);
  };
  (function(){
    const t = localStorage.getItem('pj_theme');
    if(t) document.documentElement.setAttribute('data-theme', t);
  })();
})();
</script>

`);

// ---------- Minimal API endpoints for metrics and logs (server-side) ----------
// Part 3 adds API endpoints returning JSON and simple HTML fragments used by the dashboard.

app.get('/api/metrics', (req, res) => {
  // gather memory, cpu, load, disk summary and optional kubectl info (if available)
  const memTotal = os.totalmem();
  const memFree = os.freemem();
  const cpus = os.cpus();
  const load = os.loadavg();
  let disk = {};
  try {
    // try to get root disk usage via df -h /
    const out = safeExec("df -h --output=source,size,used,avail,pcent / | tail -1");
    disk.raw = out.trim();
  } catch (e) { disk.raw = ""; }
  // try kubectl node status (if kubectl available)
  let k8sNodes = "";
  try {
    k8sNodes = safeExec("kubectl get nodes -o wide --no-headers") || "";
  } catch (e) { k8sNodes = ""; }

  res.json({
    timestamp: nowISO(),
    memory: { totalBytes: memTotal, freeBytes: memFree, usedBytes: memTotal - memFree, pretty: prettyBytes(memTotal - memFree) },
    cpus: { count: cpus.length, model: cpus[0].model },
    load,
    disk,
    k8sNodes
  });
});

app.get('/dashboard', (req, res) => {
  // Very small dashboard page that will query /api/metrics and show charts
  const metricHtml = `
  <!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dashboard - ${PROFILE.name}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>body{font-family:Arial,Helvetica,sans-serif;background:#020617;color:#bfefff;padding:18px} .card{background:#031226;padding:16px;border-radius:8px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.02)}</style>
  </head><body>
  <h2 style="color:#aee7ff">Live Dashboard</h2>
  <div class="card"><canvas id="memChart" style="max-width:720px"></canvas></div>
  <div class="card"><pre id="k8s" style="white-space:pre-wrap;color:#d6faff"></pre></div>
  <script>
    async function fetchMetrics(){
      const r = await fetch('/api/metrics');
      return r.json();
    }
    function human(n){ if(!n && n!==0) return 'N/A'; const u=['B','KB','MB','GB']; let i=0; while(n>1024 && i<3){n/=1024;i++} return n.toFixed(2)+' '+u[i]; }
    const ctx = document.getElementById('memChart').getContext('2d');
    const chart = new Chart(ctx, { type:'doughnut', data:{labels:['Used','Free'], datasets:[{data:[0,100],backgroundColor:['#00f0ff','#003a5f']}] }});
    async function update(){
      const m = await fetchMetrics();
      const used = m.memory.usedBytes;
      const free = m.memory.freeBytes;
      chart.data.datasets[0].data = [used, free];
      chart.update();
      document.getElementById('k8s').innerText = m.k8sNodes || 'No Kubernetes info available or kubectl not installed / configured.';
    }
    update();
    setInterval(update, 5000);
  </script>
  </body></html>
  `;
  res.send(metricHtml);
});

app.get('/logs', (req, res) => {
  // attempt docker logs, then fallback to syslog tail
  let out = "";
  try {
    out = safeExec("docker ps --format '{{.Names}}' | head -n1");
    if(out && out.trim()){
      const name = out.trim().split('\\n')[0];
      out = safeExec(`docker logs ${name} --tail 80`) || out;
    } else {
      out = safeExec("tail -n 200 /var/log/syslog || tail -n 200 /var/log/messages") || "No logs available";
    }
  } catch(e){
    out = "Error collecting logs: " + (e.message || String(e));
  }
  // simple HTML wrapper
  res.send(`<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Logs - ${PROFILE.name}</title>
    <style>body{font-family:monospace;background:#000;color:#aee7ff;padding:16px;white-space:pre-wrap}</style>
  </head><body><h3>Logs (updated: ${nowISO()})</h3><pre>${escapeHtml(out)}</pre></body></html>`);
});

// small helper used above (escape)
function escapeHtml(s){
  if(!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// end of Part 3
// Next part (Part 4) will finalize the main page HTML, include final client-side bootstrap JS hooks and add route for / (home) that returns the assembled htmlChunks content.
// Paste Part 4 after Part 3 when ready.
// ===== server.js — Part 4 of 5 =====
// Continues client-side cinematic effects + server route for home page

htmlChunks.push(`

<footer>
  <p>© 2025 ${PROFILE.name} | Designed, Automated & Hosted with Kubernetes + Jenkins + Docker</p>
  <div style="margin-top:8px">
    <a href="${PROFILE.github}" target="_blank" style="color:var(--neon);text-decoration:none;margin-right:12px">GitHub</a>
    <a href="${PROFILE.linkedin}" target="_blank" style="color:var(--neon);text-decoration:none">LinkedIn</a>
  </div>
</footer>

<!-- Cinematic Neon Logo Rotation + Subtle Motion -->
<script>
  const logoEl = document.querySelector('.brand .logo');
  let angle = 0;
  function rotateLogo(){
    angle += 0.3;
    logoEl.style.transform = 'rotate(' + angle + 'deg)';
    logoEl.style.transition = 'transform 0.15s linear';
    requestAnimationFrame(rotateLogo);
  }
  rotateLogo();

  // Cinematic fade on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      e.target.style.opacity = e.isIntersecting ? 1 : 0.3;
      e.target.style.transform = e.isIntersecting ? 'translateY(0px)' : 'translateY(20px)';
      e.target.style.transition = 'all 1s ease-out';
    });
  },{threshold:0.3});
  document.querySelectorAll('.panel').forEach(el=>observer.observe(el));
</script>

</body></html>
`);

// ---------- Route: Home (returns assembled cinematic portfolio) ----------
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(htmlChunks.join('\n'));
});

// ---------- Route: About Page (separate, cinematic) ----------
app.get('/about', (req, res) => {
  const aboutHtml = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>About - ${PROFILE.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
      body{background:radial-gradient(circle at 20% 20%,#001a33,#000010);color:#d6faff;font-family:'Poppins',sans-serif;margin:0;padding:0;overflow-x:hidden}
      header{text-align:center;padding:80px 20px}
      h1{font-size:3rem;background:linear-gradient(to right,#00ffff,#0077ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:0 0 25px #00ffff}
      p{max-width:800px;margin:20px auto;font-size:1.1rem;line-height:1.8;color:#aee7ff}
      section{padding:40px 10%;border-top:1px solid rgba(255,255,255,0.1)}
      footer{text-align:center;padding:30px;color:#aee7ff;font-size:0.9rem}
    </style>
  </head>
  <body>
    <header>
      <h1>About ${PROFILE.name}</h1>
      <p>${PROFILE.title}</p>
    </header>
    <section>
      <h2>🌤 Professional Summary</h2>
      <p>Rajat Sharma is a Certified Kubernetes Administrator (CKA) and DevOps Engineer with expertise in AWS, Docker, Terraform, and Jenkins automation. He has designed, deployed, and managed multiple cloud-native environments ensuring high availability, performance, and security.</p>
      <p>He’s passionate about building scalable, reliable CI/CD systems and creating infrastructure-as-code environments that empower fast, safe releases.</p>
    </section>
    <section>
      <h2>🎯 Technical Expertise</h2>
      <ul style="list-style:none;padding:0;margin-top:20px;color:#aee7ff;line-height:1.8">
        <li>✔ Kubernetes, Helm, Docker</li>
        <li>✔ AWS (EC2, S3, IAM, VPC, CloudWatch)</li>
        <li>✔ Jenkins, GitHub Actions, CI/CD Automation</li>
        <li>✔ Linux Administration, Bash, Python scripting</li>
        <li>✔ Terraform, Infrastructure as Code</li>
        <li>✔ Prometheus, Grafana, Loki (Monitoring & Logging)</li>
      </ul>
    </section>
    <section>
      <h2>🏆 Achievements</h2>
      <p>• Implemented a zero-downtime CI/CD pipeline across microservices with automated rollbacks.<br>
         • Built observability dashboards with Prometheus & Grafana that reduced MTTR by 40%.<br>
         • Automated cloud infra creation for multi-region AWS setup using Terraform.</p>
    </section>
    <footer>
      <p>© 2025 ${PROFILE.name} | Cinematic DevOps Portfolio</p>
      <a href="/" style="color:#00ffff;text-decoration:none">← Back to Home</a>
    </footer>
  </body>
  </html>`;
  res.send(aboutHtml);
});

// end of Part 4
// Next: Part 5 will close the server setup (listen, error handling, extended health checks, random fun routes like /skills-json, and ASCII art banner).
// ===== server.js — Part 5 of 5 =====
// Final section: ASCII banner, advanced routes, and cinematic startup logs

// ---------- Route: Detailed Health ----------
app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const total = os.totalmem(), free = os.freemem();
  const load = os.loadavg();
  const cpu = os.cpus()[0].model;

  const health = {
    status: 'healthy',
    uptime: `${(uptime / 3600).toFixed(2)} hours`,
    memory: {
      total: prettyBytes(total),
      used: prettyBytes(total - free),
      free: prettyBytes(free),
    },
    cpu,
    load,
    time: new Date().toISOString(),
  };

  res.json(health);
});

// ---------- Route: Skills JSON ----------
app.get('/skills-json', (req, res) => {
  const skills = [
    { tool: 'AWS', level: 95 },
    { tool: 'Kubernetes', level: 90 },
    { tool: 'Docker', level: 88 },
    { tool: 'Linux', level: 92 },
    { tool: 'Jenkins', level: 85 },
    { tool: 'Terraform', level: 80 },
    { tool: 'Grafana', level: 87 },
    { tool: 'Prometheus', level: 84 },
  ];
  res.json(skills);
});

// ---------- Catch-all for 404 ----------
app.use((req, res) => {
  res.status(404).send(`
  <html><body style="background:#000;color:#00ffff;font-family:monospace;text-align:center;padding:50px">
  <h2>404 — Page Not Found</h2>
  <p>Looks like you took a wrong kubectl apply 😅</p>
  <a href="/" style="color:#00ffff;text-decoration:none">← Return Home</a>
  </body></html>`);
});

// ---------- Cinematic ASCII Startup Banner ----------
function neon(text) {
  return `\x1b[96m${text}\x1b[0m`;
}
function glow(text) {
  return `\x1b[36;1m${text}\x1b[0m`;
}

function printBanner() {
  console.clear();
  console.log(neon(`
██████╗  █████╗      ██╗ █████╗ ████████╗     ███████╗██╗  ██╗ █████╗ ██████╗ ███╗   ███╗ █████╗ 
██╔══██╗██╔══██╗     ██║██╔══██╗╚══██╔══╝     ██╔════╝██║  ██║██╔══██╗██╔══██╗████╗ ████║██╔══██╗
██████╔╝███████║     ██║███████║   ██║        ███████╗███████║███████║██║  ██║██╔████╔██║███████║
██╔═══╝ ██╔══██║██   ██║██╔══██║   ██║        ╚════██║██╔══██║██╔══██║██║  ██║██║╚██╔╝██║██╔══██║
██║     ██║  ██║╚█████╔╝██║  ██║   ██║        ███████║██║  ██║██║  ██║██████╔╝██║ ╚═╝ ██║██║  ██║
╚═╝     ╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝   ╚═╝        ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝
`));
  console.log(glow("🚀 Rajat Sharma | Cinematic DevOps Portfolio Server"));
  console.log(glow("🌐 Services: / , /about , /dashboard , /logs , /health , /skills-json"));
  console.log(glow("💾 Running Node.js version: " + process.version));
  console.log(glow("📦 PID: " + process.pid));
  console.log(glow("⏰ Started at: " + new Date().toLocaleString()));
  console.log(glow("─────────────────────────────────────────────────────────────────────────────\n"));
}

// ---------- Start the Express server ----------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  printBanner();

  // Animated heartbeat log (every few seconds)
  let frames = ['🩵','💙','💜','💗','💚'];
  let i = 0;
  setInterval(() => {
    process.stdout.write(`\r${frames[i++ % frames.length]}  ${glow("Server running smoothly on port " + PORT)}  `);
  }, 1500);
});

// ---------- End of Cinematic Portfolio Server ----------
