/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Single-file server (Express only, no extra packages required)
 * - Cinematic landing page with particles, skills chart (CDN)
 * - Automation-in-Action flow
 * - Resume download (HTML fallback)
 * - Contact form (Telegram optional via ENV, otherwise logs only)
 * - Jenkins pipeline trigger (optional via ENV)
 * - Simple AI chatbot proxy (optional via ENV, otherwise disabled)
 * - Metrics, Logs, About, Health
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Optional ENV (use if available; otherwise routes degrade gracefully)
const {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  JENKINS_WEBHOOK_URL,
  OPENAI_API_KEY,
} = process.env;

// ---------- HOME ----------
app.get("/", (_req, res) => {
  res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Rajat Sharma | DevOps Engineer</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="DevOps portfolio with CI/CD demos, automation, and monitoring.">
  <meta name="keywords" content="DevOps, Jenkins, Docker, Kubernetes, AWS, CI/CD, Rajat Sharma">
  <meta name="author" content="Rajat Sharma">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Poppins,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#000814;color:#fff;overflow-x:hidden}
    canvas.bg{position:fixed;inset:0;z-index:-1}
    nav{display:flex;justify-content:space-between;align-items:center;padding:16px 28px;position:sticky;top:0;background:rgba(255,255,255,.05);backdrop-filter:blur(8px);z-index:50}
    .brand{font-weight:900;color:#00ffff}
    nav a{color:#aee7ff;text-decoration:none;margin-left:18px;font-weight:600}
    nav a:hover{color:#00ffff;text-shadow:0 0 10px #00ffff}
    header{text-align:center;padding:90px 18px 36px}
    h1{font-size:clamp(2.6rem,6vw,5rem);font-weight:900;background:linear-gradient(90deg,#00ffff,#0077ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:0 0 40px rgba(0,255,255,.25)}
    h2{font-size:clamp(1.1rem,2.3vw,1.6rem);color:#cfeaff;margin-top:8px}
    p.lead{max-width:900px;margin:18px auto 0;line-height:1.8;color:#def6ff}
    .buttons{margin-top:22px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn{padding:12px 22px;border-radius:26px;border:0;background:linear-gradient(90deg,#00ffff,#0077ff);color:#fff;text-decoration:none;font-weight:700;box-shadow:0 0 18px rgba(0,255,255,.35);cursor:pointer}
    .btn:hover{filter:brightness(1.08);transform:translateY(-1px)}
    section{padding:48px 8%}
    .h2{font-size:1.6rem;color:#9fe8ff;text-align:center;margin-bottom:18px}
    .grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
    .card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px;backdrop-filter:blur(10px);box-shadow:0 0 24px rgba(0,255,255,.12)}
    .card h3{color:#00eaff;margin-bottom:8px;font-size:1.1rem}
    .card p{color:#e6faff;line-height:1.6}
    .flow{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
    .chip{padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);font-weight:700;color:#bfe7ff}
    .arrow{width:34px;height:2px;background:linear-gradient(90deg,transparent,#00ffff);position:relative;overflow:hidden}
    .arrow:after{content:"";position:absolute;right:-10px;top:-4px;width:10px;height:10px;background:#00ffff;transform:rotate(45deg);animation:mv 1.2s linear infinite}
    @keyframes mv{0%{right:100%}100%{right:-10px}}
    .gallery{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
    .gallery img{width:100%;height:140px;object-fit:cover;border-radius:12px;border:1px solid rgba(255,255,255,.14)}
    .chart-wrap{max-width:620px;margin:18px auto;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:14px}
    .panel{max-width:880px;margin:0 auto;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px}
    .panel input,.panel textarea{width:100%;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#e6faff;margin-top:8px}
    .tiny{font-size:.9rem;color:#9fe8ff;margin-top:6px}
    footer{text-align:center;padding:30px 18px;color:#a8c0ff;background:rgba(255,255,255,.05);border-top:1px solid rgba(255,255,255,.1);margin-top:36px}
  </style>
</head>
<body>
  <canvas class="bg" id="particles"></canvas>

  <nav>
    <div class="brand">Rajat Sharma</div>
    <div>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/metrics">Metrics</a>
      <a href="/logs">Logs</a>
      <a href="/resume">Resume</a>
      <a href="https://www.linkedin.com/in/rajat55" target="_blank">LinkedIn</a>
    </div>
  </nav>

  <header>
    <h1>Rajat Sharma</h1>
    <h2>DevOps Engineer, Automation, Cloud CI/CD</h2>
    <p class="lead">
      CKA and Docker specialist with 4+ years in Linux, AWS, Jenkins, and Kubernetes. I build resilient pipelines, secure deployments, and monitored systems that scale.
    </p>
    <div class="buttons">
      <a class="btn" href="/about">About</a>
      <a class="btn" href="/metrics">Live Metrics</a>
      <button class="btn" id="musicBtn" type="button">Ambient</button>
      <button class="btn" id="triggerBtn" type="button">Trigger Pipeline</button>
      <a class="btn" href="/resume">Download Resume</a>
    </div>
  </header>

  <section>
    <div class="h2">Automation in Action</div>
    <div class="flow">
      <span class="chip">Git Commit</span><span class="arrow"></span>
      <span class="chip">Jenkins Build</span><span class="arrow"></span>
      <span class="chip">Docker Image</span><span class="arrow"></span>
      <span class="chip">AWS Deploy</span><span class="arrow"></span>
      <span class="chip">Monitoring</span>
    </div>
  </section>

  <section>
    <div class="h2">Featured Projects</div>
    <div class="grid">
      <div class="card"><h3>Dockerized App Deployment</h3><p>Containerized Node services with zero-downtime rollouts on EC2.</p></div>
      <div class="card"><h3>CI/CD Pipeline</h3><p>Webhook driven Jenkins pipeline with lint, test, build, deploy, and health gates.</p></div>
      <div class="card"><h3>Kubernetes Orchestration</h3><p>Readiness probes, HPA, rolling updates, and observability.</p></div>
      <div class="card"><h3>Monitoring Stack</h3><p>Prometheus and Grafana with service SLOs and alerts.</p></div>
    </div>
  </section>

  <section>
    <div class="h2">Project Showcase Gallery</div>
    <div class="gallery">
      <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800" alt="CI/CD">
      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" alt="Kubernetes">
      <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800" alt="Cloud">
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800" alt="Dashboards">
    </div>
  </section>

  <section>
    <div class="h2">My Tech Stack</div>
    <div class="chart-wrap"><canvas id="skillsChart"></canvas></div>
  </section>

  <section>
    <div class="h2">Contact</div>
    <div class="panel">
      <form id="tgForm">
        <input name="name" placeholder="Your name" required>
        <input name="email" placeholder="Your email" required>
        <textarea name="message" placeholder="Your message" required></textarea>
        <button class="btn" type="submit">Send</button>
        <div id="tgStatus" class="tiny"></div>
      </form>
    </div>
  </section>

  <section>
    <div class="h2">Ask my DevOps Assistant</div>
    <div class="panel">
      <form id="aiForm">
        <textarea name="q" placeholder="Ask about my projects, CI/CD, Docker, Kubernetes..." required></textarea>
        <button class="btn" type="submit">Ask</button>
        <pre id="aiOut" class="tiny" style="white-space:pre-wrap;margin-top:8px"></pre>
      </form>
    </div>
  </section>

  <footer>© 2025 Rajat Sharma · DevOps Portfolio</footer>

  <script>
    // particles
    const cvs=document.getElementById("particles"), ctx=cvs.getContext("2d");
    function rs(){cvs.width=innerWidth;cvs.height=innerHeight} rs(); addEventListener("resize",rs);
    const pts=Array.from({length:60},()=>({x:Math.random()*cvs.width,y:Math.random()*cvs.height,r:Math.random()*2+1,dx:(Math.random()-.5)*.5,dy:(Math.random()-.5)*.5}));
    (function draw(){ctx.clearRect(0,0,cvs.width,cvs.height);pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="#00ffff";ctx.shadowColor="#00ffff";ctx.shadowBlur=8;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>cvs.width)p.dx*=-1;if(p.y<0||p.y>cvs.height)p.dy*=-1});requestAnimationFrame(draw)})();

    // chart
    try{
      new Chart(document.getElementById('skillsChart'),{
        type:'doughnut',
        data:{labels:['AWS','Kubernetes','Docker','Linux','Jenkins','Terraform'],
        datasets:[{data:[25,20,15,20,10,10],backgroundColor:['#00ffff','#0077ff','#00aaff','#00eaff','#004fff','#0099cc']}]},
        options:{plugins:{legend:{labels:{color:'#e6faff'}}}}
      });
    }catch(e){}

    // ambient tone (WebAudio, no file)
    let audioCtx=null, osc=null, gain=null, playing=false;
    document.getElementById('musicBtn').onclick=()=>{
      if(!playing){audioCtx=new (window.AudioContext||window.webkitAudioContext)();osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='sine';osc.frequency.value=220;gain.gain.value=0.02;osc.connect(gain);gain.connect(audioCtx.destination);osc.start();playing=true;document.getElementById('musicBtn').innerText='Ambient On';}
      else{osc.stop();osc.disconnect();gain.disconnect();audioCtx.close();playing=false;document.getElementById('musicBtn').innerText='Ambient';}
    };

    // jenkins trigger
    document.getElementById('triggerBtn').onclick=async()=>{const r=await fetch('/trigger-ci',{method:'POST'});alert(await r.text())};

    // contact -> backend (Telegram if enabled)
    document.getElementById('tgForm').addEventListener('submit', async (e)=>{
      e.preventDefault();
      const fd=new FormData(e.target);
      const r=await fetch('/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(fd))});
      const j=await r.json().catch(()=>({ok:false,msg:'Error'}));
      document.getElementById('tgStatus').innerText=j.msg||'Sent';
    });

    // AI
    document.getElementById('aiForm').addEventListener('submit', async (e)=>{
      e.preventDefault();
      const q=new FormData(e.target).get('q');
      document.getElementById('aiOut').innerText='Thinking...';
      const r=await fetch('/ask-ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({q})});
      const j=await r.json().catch(()=>({a:'Service unavailable'}));
      document.getElementById('aiOut').innerText=j.a||'Service unavailable';
    });
  </script>
</body>
</html>`);
});

// ---------- ABOUT ----------
app.get("/about", (_req, res) => {
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>About Rajat Sharma</title><style>body{font-family:Poppins,Arial;background:#0b1b2b;color:#cfeaff;padding:28px;line-height:1.8}h1{color:#00ffff}h2{color:#9fe8ff} .badge{display:inline-block;margin:4px 6px;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}</style></head><body><h1>About</h1><p>DevOps Engineer focused on reliable CI/CD, container platforms, and cloud automation. Experience with Linux, AWS, Docker, Kubernetes, Jenkins, Terraform, Prometheus, and Grafana.</p><h2>Certifications</h2><p><span class="badge">CKA</span><span class="badge">Docker</span><span class="badge">AWS (in progress)</span></p><h2>Experience</h2><p>Ericsson — managed 14+ Linux servers, built pipelines, and production monitoring.</p><p><a href="/" style="color:#9fe8ff">Back</a></p></body></html>`;
  res.send(html);
});

// ---------- METRICS ----------
app.get("/metrics", (_req, res) => {
  const total = os.totalmem() / (1024 ** 3);
  const free = os.freemem() / (1024 ** 3);
  const used = total - free;
  const upHrs = (os.uptime() / 3600).toFixed(2);
  res.send(`<!doctype html><html><body style="background:#000;color:#00ffff;font-family:monospace;padding:24px">
<h2>Server Metrics</h2>
<p>CPU cores: ${os.cpus().length}</p>
<p>Memory used: ${used.toFixed(2)} GB / ${total.toFixed(2)} GB</p>
<p>Uptime: ${upHrs} hours</p>
<p>Platform: ${os.platform()}</p>
<p><a href="/" style="color:#9fe8ff">Back</a></p>
</body></html>`);
});

// ---------- LOGS (auto-refresh) ----------
app.get("/logs", (_req, res) => {
  try {
    const out = execSync("docker logs node-cicd --tail 40", { stdio: ["ignore", "pipe", "ignore"] }).toString();
    res.send(`<meta http-equiv="refresh" content="5"><pre style="background:#000;color:#00ffff;padding:16px;white-space:pre-wrap">${escapeHtml(out)}</pre>`);
  } catch {
    res.send("<p style='color:red;padding:20px'>No container logs available.</p>");
  }
});

// ---------- Resume (HTML fallback download) ----------
app.get("/resume", (_req, res) => {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Rajat_Sharma_Resume</title><style>body{font-family:Arial;background:#ffffff;color:#111;margin:32px}h1{margin:0}h2{margin:18px 0 6px}ul{margin:6px 0 12px 20px}</style></head><body><h1>Rajat Sharma</h1><p>DevOps Engineer | AWS | Docker | Kubernetes | Jenkins</p><h2>Summary</h2><p>CKA certified DevOps Engineer with 4+ years across Linux, AWS, CI/CD, and Kubernetes.</p><h2>Skills</h2><ul><li>AWS, EC2, VPC</li><li>Docker, Kubernetes</li><li>Jenkins, GitHub</li><li>Terraform</li><li>Prometheus, Grafana</li></ul><h2>Experience</h2><p>Ericsson — managed Linux fleet, CI/CD pipelines, monitoring.</p><h2>Contact</h2><p>LinkedIn: linkedin.com/in/rajat55</p></body></html>`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="Rajat_Sharma_Resume.html"');
  res.send(html);
});

// ---------- Contact (Telegram optional) ----------
app.post("/contact", async (req, res) => {
  try {
    const { name = "", email = "", message = "" } = req.body || {};
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = encodeURIComponent(`New message from ${name} (${email})\n${message}`);
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${text}`;
      const r = await fetch(url);
      return res.json({ ok: r.ok, msg: r.ok ? "Delivered via Telegram" : "Delivery failed" });
    }
    console.log("CONTACT:", { name, email, message });
    return res.json({ ok: true, msg: "Received (Telegram not configured)" });
  } catch {
    return res.json({ ok: false, msg: "Error" });
  }
});

// ---------- Jenkins trigger (optional) ----------
app.post("/trigger-ci", async (_req, res) => {
  try {
    if (!JENKINS_WEBHOOK_URL) return res.send("Webhook not configured");
    const r = await fetch(JENKINS_WEBHOOK_URL, { method: "POST" });
    res.send(r.ok ? "Pipeline triggered" : "Trigger failed");
  } catch {
    res.send("Trigger failed");
  }
});

// ---------- Simple AI chatbot (optional) ----------
app.post("/ask-ai", async (req, res) => {
  try {
    const q = (req.body && req.body.q || "").slice(0, 800);
    if (!q) return res.json({ a: "Ask a question." });
    if (!OPENAI_API_KEY) return res.json({ a: "AI is disabled. Set OPENAI_API_KEY." });

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a concise DevOps assistant for Rajat Sharma." },
          { role: "user", content: q }
        ],
        temperature: 0.4
      })
    });
    const j = await r.json();
    const a = j?.choices?.[0]?.message?.content || "No response.";
    res.json({ a });
  } catch {
    res.json({ a: "Service error." });
  }
});

// ---------- Health ----------
app.get("/health", (_req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

// ---------- Utils ----------
function escapeHtml(s = "") { return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

// ---------- Start ----------
app.listen(3000, () => {
  console.log("Rajat Sharma — DevOps Portfolio running on port 3000");
});
