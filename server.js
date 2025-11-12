/**
 * Rajat Sharma | DevOps Engineer Portfolio (Cinematic Neon Edition v2)
 * Futuristic Interactive Portfolio - Node.js + Express
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ---------------- HOME PAGE ----------------
app.get("/", (req, res) => {
  res.send(`
  <html lang="en">
  <head>
    <title>Rajat Sharma | DevOps Engineer</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="description" content="Rajat Sharma - DevOps Engineer specializing in AWS, Docker, Kubernetes, CI/CD automation.">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        background: radial-gradient(circle at 20% 20%, #001a33, #000010, #010020);
        color: white;
        overflow-x: hidden;
      }
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 60px;
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(0,255,255,0.1);
        position: sticky; top: 0;
      }
      nav .brand {
        font-size: 1.8rem;
        font-weight: 800;
        color: #00ffff;
        text-shadow: 0 0 15px #00ffff;
      }
      nav a {
        color: #aee7ff;
        margin-left: 25px;
        text-decoration: none;
        font-weight: 600;
        transition: 0.3s;
      }
      nav a:hover { color: #00ffff; text-shadow: 0 0 10px #00ffff; }

      header {
        text-align: center;
        padding: 140px 40px 100px;
        animation: fadeIn 2s ease-out;
      }
      h1 {
        font-size: 5rem; font-weight: 900;
        background: linear-gradient(to right, #00ffff, #0077ff);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        text-shadow: 0 0 50px #00ffff;
        animation: glow 2s infinite alternate;
      }
      @keyframes glow {
        from { text-shadow: 0 0 20px #00ffff, 0 0 50px #0077ff; }
        to { text-shadow: 0 0 80px #00ffff, 0 0 200px #0077ff; }
      }
      h2 { font-size: 2.2rem; color: #cfeaff; margin-top: 20px; }
      p { color: #d6faff; font-size: 1.2rem; line-height: 1.8; }

      .btn {
        display: inline-block;
        padding: 15px 40px;
        border-radius: 30px;
        background: linear-gradient(90deg, #00ffff, #0077ff);
        color: white; font-weight: 600; text-decoration: none;
        box-shadow: 0 0 20px rgba(0,255,255,0.3);
        transition: all 0.3s;
      }
      .btn:hover { transform: scale(1.1); box-shadow: 0 0 40px rgba(0,255,255,0.8); }

      section { padding: 80px 10%; text-align: center; }
      footer {
        text-align: center;
        padding: 50px 20px;
        color: #9bdfff;
        border-top: 1px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.03);
      }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
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
        <a href="https://linkedin.com/in/rajat55" target="_blank">LinkedIn</a>
      </div>
    </nav>

    <header>
      <h1>Rajat Sharma</h1>
      <h2>DevOps Engineer | Cloud | Automation</h2>
      <p>Certified Kubernetes Administrator (CKA) and Docker Professional with 4+ years of hands-on experience in AWS, Jenkins, and Linux automation. Building resilient cloud infrastructure with zero downtime.</p>
      <div style="margin-top:40px;">
        <a href="/about" class="btn">About Me</a>
        <a href="/metrics" class="btn">System Metrics</a>
        <a href="https://github.com/rajatsharma-dev" target="_blank" class="btn">GitHub</a>
      </div>
    </header>

    <footer>
      © 2025 Rajat Sharma | Crafted with 💙 DevOps & Cloud
    </footer>
  </body>
  </html>
  `);
});

// ---------------- ABOUT PAGE ----------------
app.get("/about", (req, res) => {
  res.send(`
  <html><body style="font-family:'Poppins',sans-serif;background:#000010;color:#00ffff;text-align:center;padding:60px;">
  <h1 style="font-size:3rem;text-shadow:0 0 30px #00ffff;">About Rajat Sharma</h1>
  <p style="margin-top:30px;font-size:1.3rem;line-height:1.8;color:#aee7ff;">
    DevOps Engineer with expertise in AWS, Docker, Kubernetes, Terraform, and CI/CD pipelines.  
    Passionate about automation, scalability, and modern cloud infrastructure.
  </p>
  <a href="/" style="color:#00ffff;text-decoration:none;font-size:1.2rem;">← Back to Home</a>
  </body></html>`);
});

// ---------------- METRICS PAGE ----------------
app.get("/metrics", (req, res) => {
  const totalMem = os.totalmem() / (1024 ** 3);
  const freeMem = os.freemem() / (1024 ** 3);
  const usedMem = totalMem - freeMem;
  const uptime = (os.uptime() / 3600).toFixed(2);

  res.send(`
  <html><body style="background:#000;color:#00ffff;font-family:'Poppins',sans-serif;text-align:center;padding:50px;">
  <h1>⚙️ Server Metrics</h1>
  <p>CPU Cores: ${os.cpus().length}</p>
  <p>Memory Used: ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB</p>
  <p>Uptime: ${uptime} hours</p>
  <p>Platform: ${os.platform()}</p>
  <meta http-equiv="refresh" content="10">
  <a href="/" style="color:#00ffff;">← Back</a>
  </body></html>`);
});

// ---------------- LOGS PAGE ----------------
app.get("/logs", (req, res) => {
  try {
    const logs = execSync("docker logs node-cicd --tail 15").toString();
    res.send(`<pre style="background:#000;color:#00ffff;padding:20px;">${logs}</pre><meta http-equiv="refresh" content="5">`);
  } catch {
    res.send("<p style='color:red;text-align:center;padding:20px;'>No container logs available.</p>");
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/health", (req, res) => res.json({ status: "healthy", time: new Date().toISOString() }));

// ---------------- SERVER ----------------
app.listen(3000, () => console.log("🚀 Rajat Sharma Cinematic Portfolio running on port 3000..."));
