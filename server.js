/**
 * server.js
 * Rajat Sharma | Cinematic DevOps Portfolio - Extended Edition
 *
 * Features:
 *  - Home page with animated cinematic background
 *  - Clickable logo opens full screen options menu
 *  - Sections: About, Experience, Skills, Certificates, Projects, Dashboard, Logs, Contact
 *  - Dashboard with live metrics, charts, and cluster info
 *  - Modular, easy to edit content blocks
 *
 * Usage:
 *  - node server.js
 *  - Visit http://localhost:3000
 *
 * Notes:
 *  - This is a single-file server for convenience.
 *  - For production, split into templates and static assets.
 */

const express = require("express");
const os = require("os");
const { execSync } = require("child_process");
const fs = require("fs");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Small helper to safely run shell commands
function safeExec(cmd) {
  try { return execSync(cmd, { timeout: 3000 }).toString(); } catch (e) { return ""; }
}

// ---------- Data content (edit here) ----------
const PROFILE = {
  name: "Rajat Sharma",
  title: "DevOps Engineer | Cloud Automation | Infrastructure Design",
  location: "Jhunjhunu, Rajasthan, India",
  email: "linuxrajat007@gmail.com",
  summary: `I am a DevOps Engineer with strong expertise in AWS, Kubernetes, Docker, Terraform, CI/CD automation, Linux administration, and monitoring. I build reliable and scalable infrastructure, and automate repetitive tasks to enable fast, safe delivery.`,
  highlights: [
    "Certified Kubernetes Administrator (CKA)",
    "Docker Certified Professional",
    "3+ years of Linux administration experience, currently managing 14+ servers at Ericsson",
    "Experienced with Jenkins, Helm, Prometheus, Grafana, Terraform, and Ansible",
  ],
  social: {
    github: "https://github.com/rajatsharma-dev",
    linkedin: "https://linkedin.com/in/rajat55"
  }
};

const EXPERIENCE = [
  {
    company: "Ericsson",
    role: "DevOps Engineer",
    period: "2023 - Present",
    bullets: [
      "Managed 14+ Linux servers, monitoring health and optimizing performance.",
      "Designed CI/CD pipelines using Jenkins for microservice deployments.",
      "Implemented infrastructure as code using Terraform for repeatable provisioning."
    ]
  },
  {
    company: "Freelance DevOps",
    role: "DevOps Consultant",
    period: "2021 - 2023",
    bullets: [
      "Built containerized pipelines for customers using Docker and Kubernetes.",
      "Delivered observability stacks with Prometheus and Grafana."
    ]
  }
];

const SKILLS = [
  { name: "Kubernetes", level: 90 },
  { name: "AWS", level: 92 },
  { name: "Docker", level: 88 },
  { name: "Linux", level: 94 },
  { name: "Jenkins", level: 85 },
  { name: "Terraform", level: 82 },
  { name: "Prometheus", level: 78 },
];

const CERTIFICATES = [
  { title: "Certified Kubernetes Administrator (CKA)", org: "CNCF", year: 2024 },
  { title: "Docker Certified Professional", org: "Docker", year: 2023 }
];

const PROJECTS = [
  {
    id: "proj-node-cicd",
    title: "Node.js CI/CD Demo",
    short: "Jenkins pipeline, Helm chart, Minikube deployment",
    details: `Full CI/CD pipeline using Jenkins to build Docker images, deploy to Minikube via Helm. Includes health checks, port-forward automation, and NodePort exposure.`
  },
  {
    id: "proj-k8s-monitor",
    title: "Kubernetes Monitoring Stack",
    short: "Prometheus, Grafana, Loki",
    details: "Prometheus for metrics, Grafana dashboards, and Loki for logs. Alerts configured via Alertmanager."
  }
];

// ---------- Utility endpoints ----------
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Serve a JSON metrics endpoint used by frontend charts
app.get("/api/metrics", (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const cpuCount = os.cpus().length;
  const load = os.loadavg(); // 1,5,15 minutes
  const uptime = os.uptime();

  res.json({
    timestamp: Date.now(),
    cpuCount,
    load,
    totalMem,
    freeMem,
    usedMem,
    uptime
  });
});

// Jenkins build status file support
app.get("/api/build-status", (req, res) => {
  const path = "/var/lib/jenkins/workspace/Helm-Minikube-Deployment/build-status.txt";
  try {
    const txt = fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "Build status not available";
    res.json({ status: "ok", build: txt });
  } catch (e) {
    res.json({ status: "error", message: "Cannot read build status" });
  }
});

// Kubernetes cluster info
app.get("/api/cluster-info", (req, res) => {
  const nodes = safeExec("kubectl get nodes -o wide || true");
  const pods = safeExec("kubectl get pods -A --no-headers || true");
  res.json({ nodes: nodes || "N/A", pods: pods || "N/A" });
});

// Docker container logs endpoint for the "node-cicd" container, tail configurable
app.get("/api/logs", (req, res) => {
  const tail = parseInt(req.query.tail) || 50;
  const logs = safeExec(`docker logs node-cicd --tail ${tail} || true`);
  res.json({ logs: logs || "No logs available" });
});

// Main site - large cinematic homepage with full interactive UI
app.get("/", (req, res) => {
  // Inline a long HTML page with many sections and JS behavior
  res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${PROFILE.name} | ${PROFILE.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    /* ---------- base ---------- */
    :root{
      --bg-a: #000713;
      --bg-b: #001a33;
      --neon: #00f0ff;
      --accent: #6dd3ff;
      --muted: #aee7ff;
      --glass: rgba(255,255,255,0.06);
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family:"Poppins",system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;
      background: radial-gradient(circle at 20% 20%, var(--bg-b), var(--bg-a));
      color:var(--muted);
      overflow-x:hidden;
    }

    /* ---------- canvas background ---------- */
    #bgCanvas{ position:fixed; inset:0; z-index:-1; width:100%; height:100%; }

    /* ---------- top nav / logo ---------- */
    .topbar{
      display:flex; align-items:center; justify-content:space-between;
      padding:18px 36px;
      background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-bottom:1px solid rgba(0,255,255,0.04);
      position:sticky; top:0; z-index:40;
      backdrop-filter: blur(8px);
    }
    .logo {
      display:flex; gap:12px; align-items:center; cursor:pointer;
    }
    .logo svg{ width:46px; height:46px; filter: drop-shadow(0 0 8px rgba(0,240,255,0.15)); }
    .brand{
      font-weight:800; color:var(--neon); font-size:1.15rem; letter-spacing:1px;
      text-shadow:0 0 18px rgba(0,240,255,0.1);
    }
    .navlinks{ display:flex; gap:14px; align-items:center; }
    .navlinks a{
      color:var(--muted); text-decoration:none; padding:8px 12px; border-radius:8px; font-weight:600;
    }
    .navlinks a:hover{ color:var(--neon); background:rgba(0,255,255,0.02); }

    /* ---------- hero ---------- */
    .hero{
      padding:80px 6%;
      max-width:1200px;
      margin:0 auto;
      text-align:center;
    }
    h1.hero-title{
      font-size:4.2rem; margin:0;
      background: linear-gradient(90deg, var(--neon), #0077ff);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      text-shadow: 0 0 30px rgba(0,240,255,0.08);
      letter-spacing:1.5px;
    }
    .hero-sub{ font-size:1.25rem; margin-top:18px; color:var(--muted); max-width:900px; margin-left:auto; margin-right:auto; line-height:1.6; }
    .hero-cta { margin-top:28px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

    .btn {
      background: linear-gradient(90deg, var(--neon), var(--accent));
      color:#001; padding:12px 22px; border-radius:999px; font-weight:700; text-decoration:none;
      box-shadow:0 6px 30px rgba(0,240,255,0.08);
    }
    .btn.secondary{
      background:transparent; color:var(--muted); border:1px solid rgba(255,255,255,0.04);
    }

    /* ---------- main grid ---------- */
    .main {
      display:grid;
      grid-template-columns: 1fr 420px;
      gap:28px;
      max-width:1200px;
      margin:36px auto;
      padding:0 6%;
    }

    /* left column content */
    .panel{
      background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-radius:16px; padding:20px; border:1px solid rgba(255,255,255,0.04);
      box-shadow:0 10px 40px rgba(0,0,0,0.5);
    }

    .about .title, .experience .title, .projects .title { font-size:1.25rem; color:var(--neon); font-weight:800; margin-bottom:12px; }
    .bio { color:var(--muted); line-height:1.7; font-size:0.98rem; }

    /* experience timeline */
    .timeline { margin-top:10px; }
    .timeline .item { display:flex; gap:12px; margin-bottom:16px; align-items:flex-start; }
    .timeline .dot { width:12px; height:12px; border-radius:50%; background:var(--neon); margin-top:6px; box-shadow:0 0 10px rgba(0,240,255,0.12); }
    .timeline .meta { font-weight:700; color:#dff8ff; }
    .timeline .desc { color:var(--muted); font-size:0.95rem; margin-top:6px; }

    /* projects */
    .projects-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); gap:16px; margin-top:12px; }
    .project-card { background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius:12px; padding:14px; border:1px solid rgba(255,255,255,0.03); }
    .project-card h4{ margin:0; color:#e6fbff; }
    .project-card p{ margin:8px 0 0 0; color:var(--muted); font-size:0.92rem; }

    /* right column */ 
    .side { position:sticky; top:90px; align-self:start; }
    .card { padding:14px; border-radius:12px; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border:1px solid rgba(255,255,255,0.03); margin-bottom:16px; }
    .skill-list { display:flex; flex-direction:column; gap:10px; }
    .skill { display:flex; justify-content:space-between; align-items:center; gap:12px; }
    .skill .bar { flex:1; height:10px; background:rgba(255,255,255,0.04); border-radius:999px; overflow:hidden; margin-left:14px; }
    .skill .bar > i { display:block; height:100%; background: linear-gradient(90deg, var(--neon), var(--accent)); }

    /* modals & options full screen */
    .fullscreen-menu {
      position:fixed; inset:0; z-index:90; display:none; align-items:center; justify-content:center;
      background:linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.9));
      backdrop-filter: blur(10px);
    }
    .fullscreen-menu.active { display:flex; }
    .menu-grid { display:grid; grid-template-columns:1fr 1fr; gap:30px; width:90%; max-width:1100px; }
    .menu-tile { padding:30px; border-radius:14px; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); text-align:left; border:1px solid rgba(255,255,255,0.04); }
    .menu-tile h3 { color:var(--neon); margin-bottom:6px; }
    .menu-tile p { color:var(--muted); margin:0; }

    /* project modal overlay */
    .modal { position:fixed; inset:0; z-index:100; display:none; align-items:center; justify-content:center; background:rgba(0,0,0,0.7); }
    .modal.active { display:flex; }
    .modal-body { width:90%; max-width:900px; background:#00111a; padding:20px; border-radius:12px; border:1px solid rgba(255,255,255,0.04); color:var(--muted); }
    .close-btn { float:right; cursor:pointer; color:var(--muted); font-weight:800; }

    /* footer */
    footer.site-footer { text-align:center; padding:40px 0; color:var(--muted); }

    /* responsive */
    @media (max-width:980px){
      .main{ grid-template-columns: 1fr; padding:0 6%; }
      .side{ position:static; }
      .menu-grid { grid-template-columns:1fr; }
    }
  </style>
</head>
<body>
  <canvas id="bgCanvas"></canvas>

  <div class="topbar">
    <div class="logo" onclick="openMenu()">
      <!-- Inline SVG logo -->
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="logo">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stop-color="#00f0ff"/>
            <stop offset="1" stop-color="#0077ff"/>
          </linearGradient>
        </defs>
        <rect x="6" y="6" rx="14" ry="14" width="88" height="88" fill="url(#g1)" opacity="0.12"/>
        <g transform="translate(18,20)" fill="url(#g1)">
          <path d="M10 5 L40 5 L40 15 L10 15 Z" />
          <circle cx="25" cy="40" r="12"/>
        </g>
      </svg>
      <div>
        <div class="brand">${PROFILE.name}</div>
        <div style="font-size:12px;color:var(--muted)">${PROFILE.title}</div>
      </div>
    </div>

    <div class="navlinks">
      <a href="#about" onclick="scrollToSection('about')">About</a>
      <a href="#experience" onclick="scrollToSection('experience')">Experience</a>
      <a href="#projects" onclick="scrollToSection('projects')">Projects</a>
      <a href="/dashboard" target="_blank">Dashboard</a>
      <a href="/logs" target="_blank">Logs</a>
    </div>
  </div>

  <header class="hero">
    <div class="hero-inner">
      <h1 class="hero-title">${PROFILE.name}</h1>
      <div class="hero-sub">${PROFILE.summary}</div>
      <div class="hero-cta">
        <a class="btn" href="#projects" onclick="scrollToSection('projects')">See Projects</a>
        <a class="btn secondary" href="#experience" onclick="scrollToSection('experience')">View Experience</a>
      </div>
    </div>
  </header>

  <main class="main">
    <div>
      <!-- About -->
      <section id="about" class="panel about">
        <div class="title">About</div>
        <div class="bio">
          <strong>${PROFILE.name}</strong>, ${PROFILE.title}. Based in ${PROFILE.location}. ${PROFILE.summary}
          <ul style="margin-top:8px">
            ${PROFILE.highlights.map(h => `<li style="margin:6px 0;color:var(--muted)">${h}</li>`).join("")}
          </ul>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="panel experience" style="margin-top:18px">
        <div class="title">Experience</div>
        <div class="timeline">
          ${EXPERIENCE.map(exp => `
            <div class="item">
              <div class="dot"></div>
              <div>
                <div class="meta">${exp.role} @ ${exp.company} · <span style="opacity:0.8">${exp.period}</span></div>
                <div class="desc">${exp.bullets.map(b => `<div style="margin-top:6px">• ${b}</div>`).join("")}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="panel projects" style="margin-top:18px">
        <div class="title">Projects</div>
        <div class="projects-grid">
          ${PROJECTS.map(p => `
            <div class="project-card">
              <h4>${p.title}</h4>
              <p>${p.short}</p>
              <div style="margin-top:10px; display:flex; gap:8px;">
                <button class="btn" onclick="openProject('${p.id}')">Open</button>
                <button class="btn secondary" onclick="shareProject('${p.id}')">Share</button>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    </div>

    <!-- Right column -->
    <aside class="side">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div><strong style="color:var(--neon)">${PROFILE.name}</strong><div style="font-size:12px;color:var(--muted)">${PROFILE.title}</div></div>
        </div>
        <div style="margin-top:12px;color:var(--muted);font-size:0.95rem">
          <div><strong>Location:</strong> ${PROFILE.location}</div>
          <div style="margin-top:6px"><strong>Email:</strong> <a href="mailto:${PROFILE.email}" style="color:var(--neon);text-decoration:none">${PROFILE.email}</a></div>
        </div>
      </div>

      <div class="card">
        <div style="font-weight:800;color:var(--neon)">Skills</div>
        <div class="skill-list" style="margin-top:12px">
          ${SKILLS.map(s => `
            <div class="skill">
              <div style="width:110px">${s.name}</div>
              <div class="bar"><i style="width:${s.level}%;"></i></div>
              <div style="width:34px;text-align:right;color:var(--muted)">${s.level}%</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="card">
        <div style="font-weight:800;color:var(--neon)">Certificates</div>
        <ul style="margin-top:10px;color:var(--muted);padding-left:18px">
          ${CERTIFICATES.map(c => `<li>${c.title}, ${c.org} · ${c.year}</li>`).join("")}
        </ul>
      </div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:800;color:var(--neon)">Quick Links</div>
        </div>
        <div style="margin-top:10px;display:flex;flex-direction:column;gap:8px">
          <a class="btn secondary" href="/dashboard" target="_blank">Open Dashboard</a>
          <a class="btn secondary" href="/logs" target="_blank">Open Logs</a>
          <a class="btn secondary" href="${PROFILE.social.github}" target="_blank">GitHub</a>
          <a class="btn secondary" href="${PROFILE.social.linkedin}" target="_blank">LinkedIn</a>
        </div>
      </div>
    </aside>
  </main>

  <footer class="site-footer">
    <div style="max-width:1200px;margin:0 auto;padding:10px 6%;">© 2025 ${PROFILE.name}. All rights reserved.</div>
  </footer>

  <!-- Fullscreen options menu -->
  <div id="menu" class="fullscreen-menu" role="dialog" aria-hidden="true">
    <div class="menu-grid">
      <div class="menu-tile">
        <h3>About</h3>
        <p>Read the full about text, see my philosophy, strengths, and what I care about.</p>
        <div style="margin-top:14px"><button class="btn" onclick="scrollToSection('about'); closeMenu()">Open About</button></div>
      </div>
      <div class="menu-tile">
        <h3>Experience</h3>
        <p>Detailed timeline and responsibilities from previous roles.</p>
        <div style="margin-top:14px"><button class="btn" onclick="scrollToSection('experience'); closeMenu()">Open Experience</button></div>
      </div>
      <div class="menu-tile">
        <h3>Projects</h3>
        <p>Live deployments, pipeline demos, monitoring stacks, and IaC examples.</p>
        <div style="margin-top:14px"><button class="btn" onclick="scrollToSection('projects'); closeMenu()">Open Projects</button></div>
      </div>
      <div class="menu-tile">
        <h3>Dashboard</h3>
        <p>Open the live dashboard for system metrics, cluster info, and build status.</p>
        <div style="margin-top:14px"><a class="btn" href="/dashboard" target="_blank">Open Dashboard</a></div>
      </div>
    </div>
  </div>

  <!-- Project modal -->
  <div id="projectModal" class="modal" aria-hidden="true">
    <div class="modal-body">
      <div><span id="modalClose" class="close-btn" onclick="closeProject()">✕</span></div>
      <div id="modalContent"></div>
    </div>
  </div>

<script>
  // ---------- background particles ----------
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const NUM = Math.max(60, Math.floor(window.innerWidth / 15));
  for(let i=0;i<NUM;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*2.2 + 0.8,
      dx: (Math.random()-0.5)*0.6,
      dy: (Math.random()-0.5)*0.6,
      hue: Math.random()*360
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // soft radial gradient overlay
    const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    g.addColorStop(0, 'rgba(0,10,20,0.08)');
    g.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let p of particles){
      ctx.beginPath();
      const alpha = 0.7;
      ctx.fillStyle = 'hsla(' + (p.hue) + ', 95%, 60%, ' + alpha + ')';
      ctx.shadowBlur = 18;
      ctx.shadowColor = ctx.fillStyle;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if(p.x < -20) p.x = canvas.width + 20;
      if(p.x > canvas.width + 20) p.x = -20;
      if(p.y < -20) p.y = canvas.height + 20;
      if(p.y > canvas.height + 20) p.y = -20;
    }

    requestAnimationFrame(draw);
  }
  draw();

  // ---------- menu controls ----------
  function openMenu(){ document.getElementById('menu').classList.add('active'); document.getElementById('menu').setAttribute('aria-hidden','false'); }
  function closeMenu(){ document.getElementById('menu').classList.remove('active'); document.getElementById('menu').setAttribute('aria-hidden','true'); }

  // ---------- scroll helper ----------
  function scrollToSection(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }

  // ---------- project modal ----------
  const PROJECTS = ${JSON.stringify(PROJECTS)};
  function openProject(id){
    const p = PROJECTS.find(x => x.id === id);
    if(!p) return;
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    content.innerHTML = \`
      <h2 style="color:var(--neon)";>\${p.title}</h2>
      <p style="color:var(--muted)">\${p.short}</p>
      <div style="margin-top:12px;color:var(--muted)">\${p.details}</div>
      <div style="margin-top:14px;display:flex;gap:12px">
        <a class="btn" href="#" onclick="runDemo('\${p.id}');return false">Run Demo</a>
        <a class="btn secondary" href="#" onclick="copyLink('\${p.id}');return false">Copy Link</a>
      </div>
    \`;
    modal.classList.add('active'); modal.setAttribute('aria-hidden','false');
  }
  function closeProject(){ const modal = document.getElementById('projectModal'); modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); }
  function shareProject(id){ alert('Share link copied to clipboard'); }

  // ---------- demo actions (stub functions) ----------
  function runDemo(id){
    alert('Demo for ' + id + ' cannot run in this static demo environment.');
  }
  function copyLink(id){
    const txt = location.origin + '/?project=' + id;
    navigator.clipboard && navigator.clipboard.writeText(txt);
    alert('Link copied to clipboard: ' + txt);
  }

  // ---------- small helper to fetch metrics and update charts ----------
  async function fetchMetrics(){
    try {
      const r = await fetch('/api/metrics');
      const j = await r.json();
      return j;
    } catch (e) { return null; }
  }

  // If the page is loaded with project param, open modal
  (function(){
    const url = new URL(location.href);
    const pid = url.searchParams.get('project');
    if(pid) setTimeout(()=>openProject(pid), 600);
  })();
</script>
</body>
</html>`);
});

// Dashboard route, large cinematic dashboard with charts and status
app.get("/dashboard", (req, res) => {
  // Gather basic data
  const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const usedMemGB = ((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2);
  const cpuCount = os.cpus().length;
  const uptimeHrs = (os.uptime() / 3600).toFixed(2);
  const buildStatus = safeExec("cat /var/lib/jenkins/workspace/Helm-Minikube-Deployment/build-status.txt || echo 'No build status file'");
  const nodes = safeExec("kubectl get nodes -o wide || true");
  const pods = safeExec("kubectl get pods -A --no-headers || true");

  res.send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Dashboard — ${PROFILE.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body{font-family:'Poppins',sans-serif;background:#000013;color:#dff8ff;margin:0;padding:20px}
    .wrap{max-width:1200px;margin:0 auto}
    h1{color:#00f0ff}
    .grid{display:grid;grid-template-columns:2fr 1fr;gap:18px}
    .card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.03)}
    pre{background:#001; padding:12px; border-radius:8px; color:#aee7ff; overflow:auto}
    .charts{display:flex;gap:12px}
    canvas{background:transparent}
    .btn{background:linear-gradient(90deg,#00f0ff,#0077ff);padding:10px 14px;border-radius:999px;color:#001;font-weight:700;text-decoration:none}
  </style>
</head>
<body>
  <div class="wrap">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h1>DevOps Dashboard</h1>
      <div>
        <a class="btn" href="/">Back Home</a>
      </div>
    </div>

    <div style="margin-top:12px;color:#9eefff">Live metrics, Jenkins build status, cluster info, and logs</div>

    <div style="height:14px"></div>

    <div class="grid">
      <div>
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-weight:800;color:#00f0ff">System Overview</div>
              <div style="color:#aee7ff">CPU Cores: ${cpuCount}, Uptime: ${uptimeHrs} hours</div>
            </div>
            <div style="text-align:right">
              <div style="font-weight:800;color:#00f0ff">Memory</div>
              <div style="color:#aee7ff">${usedMemGB} GB / ${totalMemGB} GB</div>
            </div>
          </div>

          <div style="height:16px"></div>

          <div class="charts">
            <div style="flex:1" class="card">
              <canvas id="cpuChart" width="400" height="220"></canvas>
            </div>
            <div style="width:260px" class="card">
              <canvas id="memChart" width="260" height="220"></canvas>
            </div>
          </div>
        </div>

        <div style="height:12px"></div>

        <div class="card">
          <div style="font-weight:800;color:#00f0ff">Jenkins Build Status</div>
          <pre id="buildStatus">${buildStatus}</pre>
          <div style="margin-top:8px"><button class="btn" onclick="refreshBuild()">Refresh</button></div>
        </div>

        <div style="height:12px"></div>

        <div class="card">
          <div style="font-weight:800;color:#00f0ff">Recent Logs (container node-cicd)</div>
          <pre id="logArea">Loading logs...</pre>
          <div style="margin-top:8px"><button class="btn" onclick="refreshLogs()">Refresh Logs</button></div>
        </div>
      </div>

      <div>
        <div class="card">
          <div style="font-weight:800;color:#00f0ff">Kubernetes Nodes</div>
          <pre>${nodes || "No cluster data"}</pre>
        </div>

        <div style="height:12px"></div>

        <div class="card">
          <div style="font-weight:800;color:#00f0ff">Pods (all namespaces)</div>
          <pre>${pods || "No pods data"}</pre>
        </div>

        <div style="height:12px"></div>

        <div class="card">
          <div style="font-weight:800;color:#00f0ff">Quick Actions</div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
            <a class="btn" href="/api/cluster-info" target="_blank">Raw cluster info</a>
            <a class="btn" href="/api/build-status" target="_blank">Raw build status</a>
            <a class="btn" href="/api/logs?tail=200" target="_blank">Raw logs</a>
          </div>
        </div>
      </div>
    </div>

  </div>

<script>
  const cpuCtx = document.getElementById('cpuChart').getContext('2d');
  const memCtx = document.getElementById('memChart').getContext('2d');

  const cpuChart = new Chart(cpuCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: '1-min load', data: [], borderColor:'#00f0ff', tension:0.3, fill:false }] },
    options: { scales:{ x:{ display:false } , y:{ beginAtZero:true } } }
  });

  const memChart = new Chart(memCtx, {
    type: 'doughnut',
    data: { labels:['Used','Free'], datasets:[{ data:[${usedMemGB}, ${totalMemGB - usedMemGB}], backgroundColor:['#00f0ff','#002033'] }] },
    options:{ plugins:{ legend:{ display:true, position:'bottom' } } }
  });

  async function refreshMetrics(){
    try {
      const res = await fetch('/api/metrics');
      const j = await res.json();
      const load = j.load && j.load[0] ? j.load[0] : 0;
      const time = new Date().toLocaleTimeString();
      if(cpuChart.data.labels.length > 30) { cpuChart.data.labels.shift(); cpuChart.data.datasets[0].data.shift(); }
      cpuChart.data.labels.push(time); cpuChart.data.datasets[0].data.push(load);
      cpuChart.update();

      const used = Math.round((j.usedMem/(1024**3)) * 100)/100;
      const total = Math.round((j.totalMem/(1024**3)) * 100)/100;
      memChart.data.datasets[0].data = [used, Math.max(0, total-used)];
      memChart.update();
    } catch(e) { console.log('metrics fetch error', e); }
  }

  async function refreshBuild(){
    const res = await fetch('/api/build-status'); const j = await res.json();
    document.getElementById('buildStatus').innerText = j.build || JSON.stringify(j);
  }

  async function refreshLogs(){
    const res = await fetch('/api/logs?tail=200'); const j = await res.json();
    document.getElementById('logArea').innerText = j.logs || 'no logs';
  }

  refreshMetrics(); refreshBuild(); refreshLogs();
  setInterval(refreshMetrics, 4000);
  setInterval(refreshLogs, 8000);
</script>

</body>
</html>`);
});

// Simple logs page to view container logs
app.get("/logs", (req, res) => {
  const logs = safeExec("docker logs node-cicd --tail 200 || true");
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Logs</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <style>body{background:#000014;color:#aee7ff;font-family:Poppins,system-ui;padding:18px} pre{background:#001;padding:12px;border-radius:8px}</style>
    </head><body>
    <h1>Container Logs (node-cicd)</h1>
    <pre>${logs.replace(/</g,'&lt;')}</pre>
    <a href="/">Back</a>
  </body></html>`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server started on port \${PORT}\`);
  console.log("Open http://localhost:" + PORT);
});
