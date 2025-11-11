/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Full Cinematic + Self Managed DevOps Edition
 * Features: Auto Deploy, Telegram Alerts, AI Assistant, Metrics, SSL Ready
 */

const express = require("express");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { execSync } = require("child_process");
require("dotenv").config();
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------------- ENV VARIABLES --------------------
const TELEGRAM_BOT = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT = process.env.TELEGRAM_CHAT_ID || "";
const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const GIT_REPO = process.env.GIT_REPO || "https://github.com/Rajat-shamra/ci-cd-demo.git";

// -------------------- UTILITIES --------------------
function sendAlert(message) {
  if (!TELEGRAM_BOT || !TELEGRAM_CHAT) return;
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT, text: message }),
  });
}

function logActivity(event) {
  const time = new Date().toISOString();
  fs.appendFileSync("activity.log", `[${time}] ${event}\n`);
  console.log(event);
}

// -------------------- AUTO DEPLOY --------------------
function autoDeploy() {
  try {
    logActivity("🌀 Checking for updates...");
    execSync(`git pull ${GIT_REPO} main`, { stdio: "inherit" });

    logActivity("🐳 Rebuilding Docker image...");
    execSync("docker build -t rajatsharma/portfolio-auto:latest .", { stdio: "inherit" });

    logActivity("🧹 Stopping old container...");
    execSync("docker stop portfolio-auto || true && docker rm portfolio-auto || true", { stdio: "inherit" });

    logActivity("🚀 Running new version...");
    execSync("docker run -d -p 3000:3000 --name portfolio-auto rajatsharma/portfolio-auto:latest", { stdio: "inherit" });

    sendAlert("✅ Rajat's Portfolio updated & redeployed successfully!");
    logActivity("✅ Deployment successful!");
  } catch (err) {
    sendAlert("❌ Auto-deploy failed. Check server logs.");
    logActivity("❌ Deployment failed!");
  }
}

// -------------------- HOME PAGE --------------------
app.get("/", (req, res) => {
  res.send(`
  <html lang="en">
    <head>
      <title>Rajat Sharma | DevOps Engineer</title>
      <meta name="description" content="Rajat Sharma - DevOps Engineer specializing in AWS, Docker, Kubernetes, and CI/CD automation.">
      <meta name="keywords" content="DevOps, Jenkins, Docker, Kubernetes, AWS, CI/CD, Rajat Sharma, Linux, Automation, Monitoring">
      <meta name="author" content="Rajat Sharma">
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{
          font-family:'Poppins',sans-serif;
          background:radial-gradient(circle at 20% 20%,#001f3f,#000814,#020024);
          color:white;overflow-x:hidden
        }
        nav{display:flex;justify-content:space-between;align-items:center;padding:20px 60px;background:rgba(255,255,255,0.05);backdrop-filter:blur(8px);position:sticky;top:0;z-index:100}
        nav .brand{font-size:1.8rem;font-weight:800;color:#00ffff}
        nav a{color:#aee7ff;margin-left:25px;text-decoration:none;font-weight:600;transition:0.3s}
        nav a:hover{color:#00ffff;text-shadow:0 0 10px #00ffff}
        header{text-align:center;padding:130px 40px 80px}
        h1{font-size:5rem;font-weight:900;background:linear-gradient(to right,#00ffff,#0077ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:0 0 40px rgba(0,255,255,0.3);animation:glowText 3s infinite alternate}
        h2{margin-top:15px;font-size:2.2rem;color:#cfeaff}
        p{margin-top:25px;font-size:1.3rem;color:#d6faff;max-width:850px;margin-left:auto;margin-right:auto;line-height:1.8}
        .buttons{margin-top:40px;display:flex;justify-content:center;gap:25px}
        .btn{padding:15px 40px;border:none;border-radius:30px;background:linear-gradient(90deg,#00ffff,#0077ff);color:white;text-decoration:none;box-shadow:0 0 20px rgba(0,255,255,0.3);transition:all 0.3s ease}
        .btn:hover{transform:scale(1.08);box-shadow:0 0 40px rgba(0,255,255,0.6)}
        @keyframes glowText{0%{text-shadow:0 0 20px #00ffff,0 0 40px #0077ff}100%{text-shadow:0 0 60px #00ffff,0 0 120px #00aaff}}
      </style>
    </head>
    <body>
      <nav>
        <div class="brand">Rajat Sharma</div>
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/metrics">Metrics</a>
          <a href="/logs">Logs</a>
          <a href="/ai">AI Assistant</a>
          <a href="https://www.linkedin.com/in/rajat55" target="_blank">LinkedIn</a>
        </div>
      </nav>
      <header>
        <h1>Rajat Sharma</h1>
        <h2>DevOps Engineer | Automation | Cloud CI/CD</h2>
        <p>Certified Kubernetes Administrator (CKA) and Docker Specialist with 4+ years of experience in Linux, AWS, and Jenkins automation.</p>
        <div class="buttons">
          <a href="/deploy" class="btn">⚙️ Auto-Deploy</a>
          <a href="/metrics" class="btn">📊 Live Metrics</a>
          <a href="/logs" class="btn">📜 Logs</a>
          <a href="/ai" class="btn">🤖 Ask AI</a>
        </div>
      </header>
    </body>
  </html>`);
});

// -------------------- ABOUT PAGE --------------------
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "public", "about.html")));

// -------------------- METRICS PAGE --------------------
app.get("/metrics", (req, res) => {
  const total = os.totalmem() / (1024 ** 3);
  const used = total - os.freemem() / (1024 ** 3);
  res.send(`
  <html><body style="background:#000;color:#00ffff;font-family:monospace;padding:40px;">
    <h2>⚙️ System Metrics</h2>
    <p>CPU Cores: ${os.cpus().length}</p>
    <p>Memory Used: ${used.toFixed(2)} GB / ${total.toFixed(2)} GB</p>
    <p>Uptime: ${(os.uptime() / 3600).toFixed(2)} hours</p>
    <a href="/" style="color:#00ffff;">← Back</a>
  </body></html>`);
});

// -------------------- LOGS --------------------
app.get("/logs", (req, res) => {
  const logs = fs.existsSync("activity.log") ? fs.readFileSync("activity.log", "utf8") : "No logs yet.";
  res.send(`<pre style="background:#000;color:#00ffff;padding:20px;">${logs}</pre>`);
});

// -------------------- AI ASSISTANT --------------------
app.get("/ai", (req, res) => {
  res.send(`
  <html><body style="background:#000;color:#00ffff;font-family:sans-serif;text-align:center;padding:50px;">
    <h2>🤖 Rajat's DevOps AI Assistant</h2>
    <textarea id="q" rows="5" cols="60" placeholder="Ask me about CI/CD, Docker, AWS..."></textarea><br>
    <button onclick="ask()" style="margin-top:10px;padding:10px 20px;">Ask</button>
    <pre id="ans" style="margin-top:20px;text-align:left;background:#001f3f;padding:20px;border-radius:8px;"></pre>
    <script>
      async function ask(){
        const q=document.getElementById('q').value;
        const res=await fetch('/ask-ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({q})});
        const data=await res.json();
        document.getElementById('ans').textContent=data.answer;
      }
    </script>
  </body></html>`);
});

app.post("/ask-ai", async (req, res) => {
  if (!OPENAI_KEY) return res.json({ answer: "AI not configured. Set OPENAI_API_KEY." });
  try {
    const q = req.body.q || "Explain DevOps";
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "You are Rajat Sharma's DevOps mentor." }, { role: "user", content: q }],
      }),
    });
    const j = await r.json();
    const a = j.choices?.[0]?.message?.content || "No answer.";
    logActivity(`💬 AI asked: ${q}`);
    res.json({ answer: a });
  } catch {
    res.json({ answer: "Error connecting to AI service." });
  }
});

// -------------------- AUTO DEPLOY --------------------
app.get("/deploy", (req, res) => {
  res.send(`<html><body style="background:#000;color:#00ffff;padding:30px;">
    <h2>Triggering Auto Deploy...</h2>
    <p>Please wait, this may take a minute.</p>
    <script>fetch('/trigger',{method:'POST'}).then(r=>r.text()).then(t=>document.body.innerHTML+=('<pre>'+t+'</pre>'))</script>
  </body></html>`);
});

app.post("/trigger", (req, res) => {
  autoDeploy();
  res.send("Auto deployment triggered successfully.");
});

// -------------------- HEALTH CHECK --------------------
app.get("/health", (req, res) => res.json({ status: "healthy", time: new Date().toISOString() }));

// -------------------- AUTO DEPLOY SCHEDULER --------------------
setInterval(autoDeploy, 1000 * 60 * 60 * 2); // every 2 hours

// -------------------- SERVER --------------------
app.listen(3000, () => {
  console.log("🚀 Rajat Sharma Cinematic Portfolio running with auto-deploy + AI + metrics...");
  logActivity("✅ Server started successfully.");
});
