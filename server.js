/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * All-in-one server.js with:
 * - Cinematic UI + animated CI/CD flow
 * - Tech stack chart
 * - Project gallery
 * - Background music toggle (no audio file needed, WebAudio)
 * - Auto-refresh logs
 * - Live metrics page
 * - Resume PDF generator (uses pdfkit if available, falls back to HTML)
 * - Telegram contact alert (ENV based)
 * - Live pipeline trigger button (ENV based)
 * - Simple AI chatbot proxy (ENV based)
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

let PDFDocument = null;
try { PDFDocument = require("pdfkit"); } catch { /* optional */ }

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---------- ENV (all optional) ----------
const {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  JENKINS_WEBHOOK_URL,      // e.g. https://jenkins.example.com/generic-webhook-trigger/invoke?token=XYZ
  OPENAI_API_KEY            // for chatbot
} = process.env;

// ---------- HOME ----------
app.get("/", (_req, res) => {
  res.send(`
  <html lang="en">
    <head>
      <title>Rajat Sharma | DevOps Engineer</title>
      <meta name="description" content="DevOps portfolio with CI/CD demos, automation, and monitoring.">
      <meta name="keywords" content="DevOps, Jenkins, Docker, Kubernetes, AWS, CI/CD, Rajat Sharma">
      <meta name="author" content="Rajat Sharma">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#fff; background:#000814; overflow-x:hidden; }
        canvas.bg { position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1; }
        nav { display:flex; justify-content:space-between; align-items:center; padding:16px 28px; position:sticky; top:0; backdrop-filter:blur(8px); background:rgba(255,255,255,.05); z-index:50; }
        .brand { font-weight:900; letter-spacing:1px; color:#00ffff; }
        nav a { color:#aee7ff; text-decoration:none; margin-left:18px; font-weight:600; }
        nav a:hover { color:#00ffff; text-shadow:0 0 10px #00ffff; }

        header { text-align:center; padding:90px 18px 40px; }
        h1 { font-size:clamp(2.5rem, 6vw, 5rem); font-weight:900; background:linear-gradient(90deg,#00ffff,#0077ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; text-shadow:0 0 40px rgba(0,255,255,.25); animation:glow 3s infinite alternate; }
        h2 { font-size:clamp(1.2rem, 2.4vw, 1.8rem); color:#cfeaff; margin-top:8px; }
        @keyframes glow { 0%{text-shadow:0 0 20px #00ffff,0 0 40px #0077ff} 100%{text-shadow:0 0 60px #00ffff,0 0 120px #00aaff} }
        p.lead { max-width:900px; margin:18px auto 0; line-height:1.8; color:#def6ff; }

        .buttons { margin-top:26px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .btn { padding:12px 22px; border-radius:28px; border:0; background:linear-gradient(90deg,#00ffff,#0077ff); color:#fff; text-decoration:none; font-weight:700; box-shadow:0 0 18px rgba(0,255,255,.35); }
        .btn:hover { filter:brightness(1.1); transform:translateY(-1px); }

        section { padding:54px 8%; }
        .h2 { font-size:1.8rem; color:#9fe8ff; text-align:center; margin-bottom:22px; }

        .grid { display:grid; gap:22px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }
        .card { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14); border-radius:18px; padding:18px; backdrop-filter:blur(10px); box-shadow:0 0 28px rgba(0,255,255,.12); }
        .card h3 { color:#00eaff; margin-bottom:8px; font-size:1.2rem; }
        .card p { color:#e6faff; opacity:.95; line-height:1.6; }

        /* Automation in Action: animated flow */
        .flow { display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:14px; }
        .chip { padding:10px 14px; border-radius:999px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14); font-weight:700; color:#bfe7ff; }
        .arrow { width:34px; height:2px; background:linear-gradient(90deg,transparent,#00ffff); position:relative; overflow:hidden; }
        .arrow::after { content:""; position:absolute; right:-10px; top:-4px; width:10px; height:10px; transform:rotate(45deg); background:#00ffff; animation:move 1.2s linear infinite; }
        @keyframes move { 0%{right:100%} 100%{right:-10px} }

        /* Gallery */
        .gallery { display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); }
        .gallery img { width:100%; height:140px; object-fit:cover; border-radius:14px; border:1px solid rgba(255,255,255,.14); }

        /* Tech chart container */
        .chart-wrap { max-width:620px; margin:24px auto; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius:18px; padding:16px; }

        /* Chatbot */
        .chat { max-width:800px; margin:18px auto 0; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius:14px; padding:14px; }
        .chat textarea, .chat input { width:100%; padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,.15); background:rgba(255,255,255,.06); color:#e6faff; }
        .chat button { margin-top:10px; }

        footer { text-align:center; padding:36px 18px; color:#a8c0ff; background:rgba(255,255,255,.05); border-top:1px solid rgba(255,255,255,.1); margin-top:44px; }
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
          CKA and Docker specialist with 4+ years in Linux, AWS, Jenkins, and Kubernetes. I design resilient pipelines, secure deployments,
          and monitored systems that scale.
        </p>
        <div class="buttons">
          <a class="btn" href="/about">About</a>
          <a class="btn" href="/metrics">Live Metrics</a>
          <button class="btn" id="musicBtn" type="button">Toggle Ambient</button>
          <button class="btn" id="triggerBtn" type="button">Trigger Pipeline</button>
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
          <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=801" alt="Pipelines">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" alt="Kubernetes">
          <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800" alt="Cloud">
        </div>
      </section>

      <section>
        <div class="h2">My Tech Stack</div>
        <div class="chart-wrap">
          <canvas id="skillsChart"></canvas>
        </div>
      </section>

      <section>
        <div class="h2">Contact</div>
        <div class="chat">
          <form id="tgForm">
            <input name="name" placeholder="Your name" required>
            <input name="email" placeholder="Your email" required style="margin-top:8px">
            <textarea name="message" placeholder="Your message" required style="margin-top:8px"></textarea>
            <button class="btn" type="submit">Send to Telegram</button>
            <div id="tgStatus" style="margin-top:8px;color:#9fe8ff"></div>
          </form>
        </div>
      </section>

      <section>
        <div class="h2">Ask my AI Assistant</div>
        <div class="chat">
          <form id="aiForm">
            <textarea name="q" placeholder="Ask about my projects, DevOps, CI/CD..."></textarea>
            <button class="btn" type="submit">Ask</button>
            <pre id="aiOut" style="margin-top:8px;white-space:pre-wrap"></pre>
          </form>
        </div>
      </section>

      <footer>
        © 2025 Rajat Sharma · DevOps Portfolio
      </footer>

      <script>
        // Particles
        const cvs=document.getElementById("particles"), ctx=cvs.getContext("2d");
        function rs(){cvs.width=innerWidth;cvs.height=innerHeight} rs(); addEventListener("resize",rs);
        const pts=Array.from({length:60},()=>({x:Math.random()*cvs.width,y:Math.random()*cvs.height,r:Math.random()*2+1,dx:(Math.random()-.5)*.5,dy:(Math.random()-.5)*.5}));
        (function draw(){ctx.clearRect(0,0,cvs.width,cvs.height);pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="#00ffff";ctx.shadowColor="#00ffff";ctx.shadowBlur=8;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>cvs.width)p.dx*=-1;if(p.y<0||p.y>cvs.height)p.dy*=-1});requestAnimationFrame(draw)})();

        // Tech chart
        try {
          const c=document.getElementById('skillsChart').getContext('2d');
          new Chart(c,{type:'doughnut',data:{labels:['AWS','Kubernetes','Docker','Linux','Jenkins','Terraform'],datasets:[{data:[25,20,15,20,10,10],backgroundColor:['#00ffff','#0077ff','#00aaff','#00eaff','#004fff','#0099cc']}]},options:{plugins:{legend:{labels:{color:'#e6faff'}}}}});
        } catch(e){}

        // Ambient music toggle (WebAudio, no file)
        let audioCtx=null, osc=null, gain=null, playing=false;
        document.getElementById('musicBtn').onclick=()=>{
          if(!playing){
            audioCtx=new (window.AudioContext||window.webkitAudioContext)();
            osc=audioCtx.createOscillator(); gain=audioCtx.createGain();
            osc.type='sine'; osc.frequency.value=220; gain.gain.value=0.02;
            osc.connect(gain); gain.connect(audioCtx.destination); osc.start();
            playing=true; document.getElementById('musicBtn').innerText='Ambient On';
          } else {
            if(osc){osc.stop(); osc.disconnect()} if(gain){gain.disconnect()} if(audioCtx){audioCtx.close()}
            playing=false; document.getElementById('musicBtn').innerText='Toggle Ambient';
          }
        };

        // Trigger Jenkins pipeline
        document.getElementById('triggerBtn').onclick=async()=>{
          const r=await fetch('/trigger-ci',{method:'POST'});
          const t=await r.text();
          alert(t);
        };

        // Telegram contact
        document.getElementById('tgForm').addEventListener('submit', async (e)=>{
          e.preventDefault();
          const fd=new FormData(e.target);
          const body={name:fd.get('name'),email:fd.get('email'),message:fd.get('message')};
          const r=await fetch('/contact-telegram',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
          const j=await r.json().catch(()=>({ok:false}));
          document.getElementById('tgStatus').innerText=j.ok?'Delivered to Telegram':'Failed to deliver';
        });

        // AI chatbot
        document.getElementById('aiForm').addEventListener('submit', async (e)=>{
          e.preventDefault();
          const q=new FormData(e.target).get('q')||'';
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
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// ---------- METRICS ----------
app.get("/metrics", (_req, res) => {
  const total = os.totalmem() / (1024**3);
  const free  = os.freemem() / (1024**3);
  const used  = total - free;
  const upHrs = (os.uptime()/3600).toFixed(2);
  res.send(`
  <html><body style="background:#000;color:#00ffff;font-family:monospace;padding:24px">
    <h2>Server Metrics</h2>
    <p>CPU cores: ${os.cpus().length}</p>
    <p>Memory used: ${used.toFixed(2)} GB / ${total.toFixed(2)} GB</p>
    <p>Uptime: ${upHrs} hours</p>
    <p>Platform: ${os.platform()}</p>
    <a href="/" style="color:#9fe8ff">Back</a>
  </body></html>`);
});

// ---------- LOGS (auto refresh) ----------
app.get("/logs", (_req, res) => {
  try {
    const out = execSync("docker logs node-cicd --tail 40", { stdio:["ignore","pipe","ignore"] }).toString();
    res.send(`<meta http-equiv="refresh" content="5"><pre style="background:#000;color:#00ffff;padding:16px;white-space:pre-wrap">${escapeHtml(out)}</pre>`);
  } catch {
    res.send("<p style='color:red;padding:20px'>No container logs available.</p>");
  }
});

// ---------- Resume: PDF if pdfkit present, else pretty HTML ----------
app.get("/resume", (_req, res) => {
  if (PDFDocument) {
    res.setHeader("Content-Type","application/pdf");
    res.setHeader("Content-Disposition",'attachment; filename="Rajat_Sharma_Resume.pdf"');
    const doc = new PDFDocument({ size:"A4", margin:36 });
    doc.pipe(res);
    doc.fontSize(22).fillColor("#0aa").text("Rajat Sharma", { align:"left" });
    doc.moveDown(0.3).fontSize(12).fillColor("#333").text("DevOps Engineer | AWS | Docker | Jenkins | Kubernetes");
    doc.moveDown();
    doc.fillColor("#000").fontSize(14).text("Summary");
    doc.fontSize(11).fillColor("#222").text("CKA certified DevOps Engineer with 4+ years across Linux, AWS, CI/CD, and Kubernetes. Focus on automation, reliability, and secure delivery.");
    doc.moveDown();
    doc.fillColor("#000").fontSize(14).text("Skills");
    doc.fontSize(11).fillColor("#222").text("AWS, Docker, Kubernetes, Jenkins, Linux, Terraform, Prometheus, Grafana, Git");
    doc.moveDown();
    doc.fillColor("#000").fontSize(14).text("Experience");
    doc.fontSize(11).fillColor("#222").text("Ericsson — Managed 14+ Linux servers, CI/CD pipelines, and observability dashboards.");
    doc.end();
  } else {
    res.send(`
    <html><body style="font-family:Arial;background:#0b1b2b;color:#cfeaff;padding:24px">
      <h2>Rajat Sharma — Resume (HTML fallback)</h2>
      <p>Install "pdfkit" for PDF output, or keep this HTML version.</p>
      <h3>Summary</h3>
      <p>CKA certified DevOps Engineer with 4+ years in AWS, Docker, Jenkins, Kubernetes, and Linux.</p>
      <h3>Skills</h3>
      <p>AWS, Docker, Kubernetes, Jenkins, Linux, Terraform, Prometheus, Grafana, Git</p>
      <h3>Experience</h3>
      <p>Ericsson — Linux fleet automation and CI/CD delivery.</p>
      <a href="/" style="color:#9fe8ff">Back</a>
    </body></html>`);
  }
});

// ---------- Telegram contact (ENV based) ----------
app.post("/contact-telegram", async (req, res) => {
  try {
    const { name="", email="", message="" } = req.body || {};
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return res.json({ ok:false, reason:"TELEGRAM env missing" });
    const text = `New message from ${name} (${email})%0A${message}`;
    const url = \`https://api.telegram.org/bot\${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=\${TELEGRAM_CHAT_ID}&text=\${text}\`;
    const r = await fetch(url);
    return res.json({ ok: r.ok });
  } catch {
    return res.json({ ok:false });
  }
});

// ---------- Trigger CI (ENV based) ----------
app.post("/trigger-ci", async (_req, res) => {
  try {
    if (!JENKINS_WEBHOOK_URL) return res.send("Webhook not configured");
    const r = await fetch(JENKINS_WEBHOOK_URL, { method:"POST" });
    res.send(r.ok ? "Pipeline triggered" : "Trigger failed");
  } catch {
    res.send("Trigger failed");
  }
});

// ---------- AI chatbot (ENV based) ----------
app.post("/ask-ai", async (req, res) => {
  try {
    const q = (req.body && req.body.q || "").slice(0, 800);
    if (!q) return res.json({ a: "Ask a question." });
    if (!OPENAI_API_KEY) return res.json({ a: "AI is disabled. Set OPENAI_API_KEY." });

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{ "Authorization":\`Bearer \${OPENAI_API_KEY}\`, "Content-Type":"application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role:"system", content:"You are a concise DevOps assistant." }, { role:"user", content:q }],
        temperature: 0.4
      })
    });
    const j = await r.json();
    const a = j.choices?.[0]?.message?.content || "No response.";
    res.json({ a });
  } catch {
    res.json({ a: "Service error." });
  }
});

// ---------- Health ----------
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ---------- Utils ----------
function escapeHtml(s=""){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// ---------- Start ----------
app.listen(3000, () => {
  console.log("Rajat Sharma — Cinematic DevOps Portfolio running on port 3000");
});
