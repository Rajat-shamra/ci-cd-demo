/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Cinematic Neon Dashboard Edition (Full)
 * Integrated System Metrics | Cluster Info | CI/CD Status
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
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
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
    </style>
  </head>
  <body>
    <nav>
      <div class="brand">Rajat Sharma</div>
      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/dashboard">Dashboard</a>
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
        <a href="/dashboard" class="btn">DevOps Dashboard</a>
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
    DevOps Engineer with expertise in AWS, Docker, Kubernetes, Terraform, and CI/CD pipelines.<br>
    Passionate about automation, scalability, and cloud-native architecture.
  </p>
  <a href="/" style="color:#00ffff;text-decoration:none;font-size:1.2rem;">← Back to Home</a>
  </body></html>`);
});

// ---------------- DASHBOARD (Metrics + Build Status + Cluster Info) ----------------
app.get("/dashboard", (req, res) => {
  const totalMem = os.totalmem() / (1024 ** 3);
  const freeMem = os.freemem() / (1024 ** 3);
  const usedMem = totalMem - freeMem;
  const uptime = (os.uptime() / 3600).toFixed(2);
  const cpuCores = os.cpus().length;
  const platform = os.platform();
  
  let clusterInfo = "";
  try {
    clusterInfo = execSync("kubectl get nodes -o wide").toString();
  } catch {
    clusterInfo = "❌ Unable to fetch Kubernetes nodes info (Minikube may not be running)";
  }

  let buildStatus = "";
  try {
    buildStatus = execSync("cat /var/lib/jenkins/workspace/Helm-Minikube-Deployment/build-status.txt || echo 'N/A'").toString();
  } catch {
    buildStatus = "❌ Jenkins build status not available";
  }

  res.send(`
  <html>
  <head>
    <title>Rajat Sharma | DevOps Dashboard</title>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
      body { background:#000015; color:#00ffff; font-family:'Poppins',sans-serif; padding:40px; text-align:center; }
      h1 { color:#00ffff; text-shadow:0 0 25px #00ffff; font-size:2.5rem; }
      section { margin:50px auto; width:80%; background:rgba(255,255,255,0.05); padding:30px; border-radius:20px; box-shadow:0 0 25px rgba(0,255,255,0.1); }
      pre { text-align:left; color:#aee7ff; background:#000; padding:20px; border-radius:10px; overflow-x:auto; }
      .stat { font-size:1.1rem; color:#bff; }
      a { color:#00ffff; text-decoration:none; }
      a:hover { text-shadow:0 0 10px #00ffff; }
    </style>
  </head>
  <body>
    <h1>⚙️ DevOps Control Dashboard</h1>
    <section>
      <h2>💻 System Metrics</h2>
      <p class="stat">CPU Cores: ${cpuCores}</p>
      <p class="stat">Memory Used: ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB</p>
      <p class="stat">Uptime: ${uptime} hours</p>
      <p class="stat">Platform: ${platform}</p>
    </section>

    <section>
      <h2>🚀 Jenkins Build Status</h2>
      <pre>${buildStatus}</pre>
    </section>

    <section>
      <h2>☸️ Kubernetes Cluster Info</h2>
      <pre>${clusterInfo}</pre>
    </section>

    <footer style="margin-top:40px;color:#aee7ff;">
      <a href="/">← Back to Home</a>
    </footer>
  </body>
  </html>
  `);
});

// ---------------- LOGS PAGE ----------------
app.get("/logs", (req, res) => {
  try {
    const logs = execSync("docker logs node-cicd --tail 20").toString();
    res.send(`<meta http-equiv="refresh" content="5"><pre style="background:#000;color:#00ffff;padding:20px;">${logs}</pre>`);
  } catch {
    res.send("<p style='color:red;padding:20px;'>No container logs available.</p>");
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/health", (req, res) => res.json({ status: "healthy", time: new Date().toISOString() }));

// ---------------- SERVER ----------------
app.listen(3000, () => console.log("🚀 Rajat Sharma Cinematic Portfolio running on port 3000..."));
