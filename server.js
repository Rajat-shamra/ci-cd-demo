/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Cinematic Neon 2.0 - Dynamic Background + Interactive Bio
 * DevOps | Cloud | Kubernetes | Automation
 */

const express = require("express");
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
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Poppins', sans-serif;
        height: 100vh;
        overflow: hidden;
        background: radial-gradient(circle at 30% 30%, #001a33, #000010, #010020);
        color: #e0f7ff;
        transition: background 1.5s ease;
      }

      .theme-purple {
        background: radial-gradient(circle at 70% 70%, #2b0040, #0a0013, #150020);
        color: #f3e9ff;
      }

      canvas#bg {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        z-index: -1;
      }

      header {
        text-align: center;
        padding-top: 120px;
        animation: fadeIn 2s ease-in;
      }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }

      h1 {
        font-size: 5rem;
        font-weight: 900;
        background: linear-gradient(to right, #00ffff, #0077ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 40px #00ffff;
        animation: pulse 2s infinite alternate;
      }
      @keyframes pulse { from { text-shadow: 0 0 25px #00ffff; } to { text-shadow: 0 0 70px #0077ff; } }

      h2 {
        margin-top: 15px;
        color: #9ee7ff;
        font-size: 1.8rem;
      }

      p {
        max-width: 800px;
        margin: 40px auto;
        line-height: 1.8;
        font-size: 1.2rem;
        color: #bfeaff;
        text-align: center;
      }

      .btns {
        display: flex;
        justify-content: center;
        gap: 20px;
      }
      .btn {
        padding: 14px 35px;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        color: white;
        background: linear-gradient(90deg, #00ffff, #0077ff);
        font-weight: 600;
        text-decoration: none;
        transition: 0.3s;
        box-shadow: 0 0 15px rgba(0,255,255,0.3);
      }
      .btn:hover {
        transform: scale(1.1);
        box-shadow: 0 0 40px rgba(0,255,255,0.7);
      }

      .theme-toggle {
        position: fixed;
        top: 20px; right: 30px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        padding: 10px 15px;
        border-radius: 20px;
        color: #00ffff;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.4s;
      }
      .theme-toggle:hover { box-shadow: 0 0 20px #00ffff; }

      footer {
        position: absolute;
        bottom: 40px;
        width: 100%;
        text-align: center;
        color: #aee7ff;
      }
    </style>
  </head>
  <body>
    <canvas id="bg"></canvas>
    <button class="theme-toggle" onclick="toggleTheme()">🎨 Change Theme</button>

    <header>
      <h1>Rajat Sharma</h1>
      <h2>DevOps Engineer | Cloud Architect | Automation Specialist</h2>
      <p>
        I’m a results-driven DevOps Engineer with over 4 years of professional experience automating deployments, managing infrastructure, 
        and building scalable cloud solutions using AWS, Docker, Kubernetes, Terraform, and Jenkins.  
        As a Certified Kubernetes Administrator (CKA) and Docker Professional, I specialize in designing fault-tolerant systems 
        that deliver high availability and performance.  
        My focus is always on **automation, reliability, and simplicity** — transforming manual processes into seamless CI/CD workflows.  
        <br><br>
        I’ve deployed microservices in Kubernetes clusters, optimized Jenkins pipelines, and integrated monitoring tools like Grafana & Prometheus 
        for proactive observability.  
        Currently, I’m working with Ericsson managing 14+ Linux-based production servers and implementing AWS-based infrastructure solutions.  
        <br><br>
        My goal is to design cloud systems that are not only efficient but **cinematic** — structured, beautiful, and reliable like a movie in motion.
      </p>

      <div class="btns">
        <a href="/dashboard" class="btn">DevOps Dashboard</a>
        <a href="https://github.com/rajatsharma-dev" class="btn" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/rajat55" class="btn" target="_blank">LinkedIn</a>
      </div>
    </header>

    <footer>
      © 2025 Rajat Sharma | Designed with 💙 DevOps • Automation • Cloud
    </footer>

    <script>
      // --- Background animation ---
      const canvas = document.getElementById("bg");
      const ctx = canvas.getContext("2d");
      canvas.width = innerWidth;
      canvas.height = innerHeight;

      const particles = Array.from({ length: 90 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: "rgba(0,255,255,0.7)"
      }));

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = p.color;
          ctx.fill();
          p.x += p.dx; p.y += p.dy;
          if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(animate);
      }
      animate();

      // --- Theme toggle ---
      let theme = "blue";
      function toggleTheme() {
        if (theme === "blue") {
          document.body.classList.add("theme-purple");
          theme = "purple";
        } else {
          document.body.classList.remove("theme-purple");
          theme = "blue";
        }
      }
    </script>
  </body>
  </html>
  `);
});

// ---------------- DASHBOARD ----------------
app.get("/dashboard", (req, res) => {
  const totalMem = os.totalmem() / (1024 ** 3);
  const freeMem = os.freemem() / (1024 ** 3);
  const usedMem = totalMem - freeMem;
  const uptime = (os.uptime() / 3600).toFixed(2);
  const cpuCores = os.cpus().length;
  let clusterInfo = "";
  try { clusterInfo = execSync("kubectl get nodes -o wide").toString(); }
  catch { clusterInfo = "❌ Cluster info unavailable"; }

  res.send(`
  <html><body style="font-family:Poppins,sans-serif;background:#000015;color:#00ffff;padding:40px;">
  <h1 style="text-align:center;text-shadow:0 0 20px #00ffff;">DevOps Control Dashboard</h1>
  <p style="text-align:center;">CPU: ${cpuCores} | Memory: ${usedMem.toFixed(2)}GB / ${totalMem.toFixed(2)}GB | Uptime: ${uptime}h</p>
  <pre style="background:#000;padding:20px;color:#aee7ff;border-radius:10px;">${clusterInfo}</pre>
  <a href="/" style="color:#00ffff;text-decoration:none;">← Back</a>
  </body></html>`);
});

// ---------------- SERVER ----------------
app.listen(3000, () => console.log("🎬 Rajat Sharma Cinematic Portfolio running on port 3000..."));
