/**
 * Rajat Sharma | DevOps Engineer Portfolio 2025
 * Ultimate Cinematic Edition with AI Readiness, Metrics, Logs & Auto Health
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ---------------- GLOBAL VARIABLES ----------------
const BOT_NAME = "Rajat Sharma DevOps Assistant";
const SITE_COLOR = "#00ffff";

// ---------------- HOME PAGE ----------------
app.get("/", (req, res) => {
  res.send(`
  <html lang="en">
    <head>
      <title>Rajat Sharma | DevOps Engineer</title>
      <meta name="description" content="Rajat Sharma - DevOps Engineer specializing in AWS, Docker, Kubernetes, CI/CD & Cloud Automation.">
      <meta name="keywords" content="DevOps, Jenkins, Docker, Kubernetes, AWS, CI/CD, Rajat Sharma, Linux, Terraform, Monitoring">
      <meta name="author" content="Rajat Sharma">
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
        body {
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(circle at 20% 20%, #001f3f, #000814, #020024);
          color: white; overflow-x: hidden;
        }
        canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }

        nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 60px; background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 100;
        }

        nav .brand { font-size: 1.8rem; font-weight: 800; color: ${SITE_COLOR}; }
        nav a { color: #aee7ff; margin-left: 25px; text-decoration: none; font-weight: 600; transition: 0.3s; }
        nav a:hover { color: ${SITE_COLOR}; text-shadow: 0 0 10px ${SITE_COLOR}; }

        header { text-align: center; padding: 130px 40px 80px; }
        h1 {
          font-size: 5rem; font-weight: 900;
          background: linear-gradient(to right, ${SITE_COLOR}, #0077ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(0,255,255,0.3); animation: glowText 3s infinite alternate;
        }
        h2 { margin-top: 15px; font-size: 2.2rem; color: #cfeaff; }
        p {
          margin-top: 25px; font-size: 1.3rem; color: #d6faff;
          max-width: 850px; margin-left: auto; margin-right: auto; line-height: 1.8;
        }

        .buttons { margin-top: 40px; display: flex; justify-content: center; gap: 25px; }
        .btn {
          padding: 15px 40px; border: none; border-radius: 30px;
          background: linear-gradient(90deg, ${SITE_COLOR}, #0077ff);
          color: white; text-decoration: none; box-shadow: 0 0 20px rgba(0,255,255,0.3);
          transition: all 0.3s ease;
        }
        .btn:hover { transform: scale(1.08); box-shadow: 0 0 40px rgba(0,255,255,0.6); }

        section { padding: 70px 10%; text-align: center; }
        .projects {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px; margin-top: 40px;
        }

        .card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px; padding: 30px;
          box-shadow: 0 0 50px rgba(0,255,255,0.15);
          backdrop-filter: blur(10px); transition: all 0.3s ease;
        }
        .card:hover { transform: scale(1.05); box-shadow: 0 0 60px rgba(0,255,255,0.4); }

        footer { text-align: center; padding: 50px 20px; color: #a8c0ff;
          background: rgba(255,255,255,0.05); border-top: 1px solid rgba(255,255,255,0.1); margin-top: 80px;
        }

        @keyframes glowText { 
          0% { text-shadow: 0 0 20px ${SITE_COLOR}, 0 0 40px #0077ff; } 
          100% { text-shadow: 0 0 60px ${SITE_COLOR}, 0 0 120px #00aaff; } 
        }
      </style>
    </head>

    <body>
      <canvas id="particles"></canvas>
      <nav>
        <div class="brand">Rajat Sharma</div>
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/metrics">Metrics</a>
          <a href="/logs">Logs</a>
          <a href="/chat">AI Assistant</a>
        </div>
      </nav>

      <header>
        <h1>Rajat Sharma</h1>
        <h2>DevOps Engineer | Cloud Automation | CI/CD | Kubernetes</h2>
        <p>
          Certified Kubernetes Administrator (CKA) and Docker Specialist with 4+ years of experience in Linux, AWS, Jenkins automation, and cloud optimization.
        </p>
        <div class="buttons">
          <a href="/about" class="btn">About Me</a>
          <a href="/metrics" class="btn">Live Metrics</a>
          <a href="https://www.linkedin.com/in/rajat55" target="_blank" class="btn">LinkedIn</a>
        </div>
      </header>

      <section>
        <h2>🚀 Featured Projects</h2>
        <div class="projects">
          <div class="card"><h3>Dockerized App Deployment</h3><p>Containerized Node.js apps and deployed using AWS EC2 with Jenkins CI/CD automation.</p></div>
          <div class="card"><h3>Kubernetes Cluster</h3><p>Configured production-ready Kubernetes clusters with monitoring and auto-scaling.</p></div>
          <div class="card"><h3>CI/CD Pipeline</h3><p>Integrated Jenkins, GitHub, Docker, and AWS to automate build-to-deploy workflows.</p></div>
          <div class="card"><h3>Monitoring Stack</h3><p>Prometheus + Grafana dashboards for real-time infrastructure insights.</p></div>
        </div>
      </section>

      <section>
        <h2>📈 Tech Stack Overview</h2>
        <canvas id="skillsChart" style="max-width:600px;margin:auto;margin-top:30px;"></canvas>
        <script>
          const ctx = document.getElementById('skillsChart').getContext('2d');
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['AWS', 'Kubernetes', 'Docker', 'Linux', 'Jenkins', 'Terraform'],
              datasets: [{
                data: [25, 20, 15, 20, 10, 10],
                backgroundColor: ['#00ffff','#0077ff','#00aaff','#00eaff','#004fff','#0099cc']
              }]
            }
          });
        </script>
      </section>

      <footer>
        <p>© 2025 Rajat Sharma | Built with ❤️ DevOps, Docker & Jenkins</p>
      </footer>

      <script>
        const canvas = document.getElementById("particles");
        const ctx2 = canvas.getContext("2d");
        canvas.width = innerWidth; canvas.height = innerHeight;
        const particles = Array.from({length: 60}, () => ({
          x: Math.random()*canvas.width, y: Math.random()*canvas.height,
          r: Math.random()*2 + 1, dx: (Math.random()-0.5)*0.5, dy: (Math.random()-0.5)*0.5
        }));
        function animate(){
          ctx2.clearRect(0,0,canvas.width,canvas.height);
          particles.forEach(p=>{
            ctx2.beginPath();
            ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx2.fillStyle = "${SITE_COLOR}";
            ctx2.shadowColor = "${SITE_COLOR}";
            ctx2.shadowBlur = 10;
            ctx2.fill();
            p.x+=p.dx; p.y+=p.dy;
            if(p.x<0||p.x>canvas.width) p.dx*=-1;
            if(p.y<0||p.y>canvas.height) p.dy*=-1;
          });
          requestAnimationFrame(animate);
        }
        animate();
      </script>
    </body>
  </html>`);
});

// ---------------- ABOUT PAGE ----------------
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// ---------------- METRICS PAGE ----------------
app.get("/metrics", (req, res) => {
  const totalMem = os.totalmem() / (1024 ** 3);
  const freeMem = os.freemem() / (1024 ** 3);
  const usedMem = totalMem - freeMem;
  const uptime = (os.uptime() / 3600).toFixed(2);

  res.send(`
  <html>
    <body style="background:#000;color:${SITE_COLOR};font-family:monospace;padding:40px;">
      <h2>⚙️ Server Metrics</h2>
      <p>CPU Cores: ${os.cpus().length}</p>
      <p>Memory Used: ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB</p>
      <p>System Uptime: ${uptime} hours</p>
      <p>Platform: ${os.platform()}</p>
      <a href="/" style="color:${SITE_COLOR};">← Back</a>
    </body>
  </html>`);
});

// ---------------- AI CHAT SIMULATION (Offline Safe) ----------------
app.get("/chat", (req, res) => {
  res.send(`
  <html>
    <body style="background:#000;color:${SITE_COLOR};font-family:Poppins;text-align:center;padding:50px;">
      <h2>💬 ${BOT_NAME}</h2>
      <p>AI Assistant is offline right now. (Set your OPENAI_API_KEY to enable it)</p>
      <form method="POST" action="/chat">
        <input name="query" style="padding:10px;width:300px;border-radius:8px;border:none;" placeholder="Ask something...">
        <button style="padding:10px 20px;border:none;border-radius:8px;background:${SITE_COLOR};color:#000;font-weight:600;">Ask</button>
      </form>
    </body>
  </html>`);
});

app.post("/chat", async (req, res) => {
  res.send(`<p style="color:${SITE_COLOR};padding:40px;">AI offline - configure OPENAI_API_KEY in environment to enable assistant.</p>`);
});

// ---------------- LOGS PAGE ----------------
app.get("/logs", (req, res) => {
  try {
    const logs = execSync("docker logs node-cicd --tail 20").toString();
    res.send(`<meta http-equiv="refresh" content="5"><pre style="background:#000;color:${SITE_COLOR};padding:20px;">${logs}</pre>`);
  } catch {
    res.send("<p style='color:red;padding:20px;'>No container logs available.</p>");
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// ---------------- SERVER ----------------
app.listen(3000, () => {
  console.log("🚀 Rajat Sharma Cinematic Portfolio running with auto-metrics + AI ready + visual effects...");
});
