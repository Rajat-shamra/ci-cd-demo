/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Cinematic Neon Edition - Interactive, Futuristic & Dynamic
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
      <meta name="description" content="Rajat Sharma - DevOps Engineer specializing in AWS, Docker, Kubernetes, CI/CD automation.">
      <meta name="keywords" content="DevOps, Jenkins, Docker, Kubernetes, AWS, CI/CD, Rajat Sharma, Linux, Automation, Monitoring">
      <meta name="author" content="Rajat Sharma">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
        body {
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(circle at 20% 20%, #001a33, #000010, #010020);
          color: white;
          overflow-x: hidden;
        }
        canvas#particles {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: -1;
          background: linear-gradient(135deg, #000010, #001a33);
        }

        nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 60px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,255,255,0.1);
          position: sticky; top: 0; z-index: 100;
        }
        nav .brand { font-size: 1.8rem; font-weight: 800; color: #00ffff; text-shadow: 0 0 20px #00ffff; }
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
          font-size: 5.2rem; font-weight: 900;
          letter-spacing: 3px;
          background: linear-gradient(to right, #00ffff, #0077ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: glow 2s infinite alternate;
        }
        @keyframes glow {
          from { text-shadow: 0 0 25px #00ffff, 0 0 50px #0077ff; }
          to { text-shadow: 0 0 60px #00ffff, 0 0 150px #0077ff; }
        }
        h2 { margin-top: 20px; font-size: 2.3rem; color: #cfeaff; opacity: 0.9; }
        p {
          margin-top: 25px;
          font-size: 1.2rem;
          color: #d6faff;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        .buttons {
          margin-top: 45px;
          display: flex; justify-content: center; gap: 25px;
        }
        .btn {
          padding: 15px 40px;
          border: none; border-radius: 30px;
          background: linear-gradient(90deg, #00ffff, #0077ff);
          color: white;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 0 20px rgba(0,255,255,0.3);
          transition: all 0.3s ease;
        }
        .btn:hover { transform: scale(1.1); box-shadow: 0 0 40px rgba(0,255,255,0.7); }

        section { padding: 80px 10%; text-align: center; }
        h2.section-title { font-size: 2.4rem; color: #00ffff; margin-bottom: 30px; }

        .projects {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 0 40px rgba(0,255,255,0.1);
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          transform-style: preserve-3d;
        }
        .card:hover {
          transform: rotateY(6deg) scale(1.05);
          box-shadow: 0 0 60px rgba(0,255,255,0.5);
        }

        footer {
          text-align: center;
          padding: 60px 20px;
          background: rgba(255,255,255,0.03);
          border-top: 1px solid rgba(255,255,255,0.1);
          color: #a8c0ff;
          margin-top: 80px;
        }
        footer a { color: #00ffff; text-decoration: none; }
        footer a:hover { text-shadow: 0 0 10px #00ffff; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
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
          <a href="https://www.linkedin.com/in/rajat55" target="_blank">LinkedIn</a>
        </div>
      </nav>

      <header>
        <h1>Rajat Sharma</h1>
        <h2>DevOps Engineer | Cloud | Automation</h2>
        <p>
          Certified Kubernetes Administrator (CKA) and Docker Professional with 4+ years of hands-on experience in AWS, Jenkins, and Linux automation.  
          Building resilient cloud infrastructure with zero downtime.
        </p>
        <div class="buttons">
          <a href="/about" class="btn">About Me</a>
          <a href="/metrics" class="btn">System Metrics</a>
          <a href="https://github.com/rajatsharma-dev" target="_blank" class="btn">GitHub</a>
        </div>
      </header>

      <section>
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects">
          <div class="card"><h3>Dockerized CI/CD</h3><p>Automated Node.js deployments using Jenkins and Docker on AWS EC2 with rollback strategy.</p></div>
          <div class="card"><h3>Kubernetes Infra</h3><p>Production-ready multi-node Kubernetes cluster with Helm and Prometheus monitoring.</p></div>
          <div class="card"><h3>Terraform IaC</h3><p>Provisioned scalable AWS infra with Terraform, automating network & compute resources.</p></div>
          <div class="card"><h3>Observability Stack</h3><p>Prometheus + Loki + Grafana setup for real-time metrics and centralized logging.</p></div>
        </div>
      </section>

      <section>
        <h2 class="section-title">My Tech Stack</h2>
        <canvas id="skillsChart" style="max-width:600px;margin:auto;margin-top:30px;"></canvas>
        <script>
          const ctx = document.getElementById('skillsChart').getContext('2d');
          new Chart(ctx, {
            type: 'radar',
            data: {
              labels: ['AWS', 'Kubernetes', 'Docker', 'Linux', 'Jenkins', 'Terraform'],
              datasets: [{
                label: 'Skill Level (%)',
                data: [95, 90, 88, 92, 85, 80],
                borderColor: '#00ffff',
                backgroundColor: 'rgba(0,255,255,0.15)',
                pointBackgroundColor: '#00ffff'
              }]
            },
            options: { scales: { r: { angleLines: { color: '#004' }, grid: { color: '#008' }, pointLabels: { color: '#00ffff' } } } }
          });
        </script>
      </section>

      <footer>
        <p>© 2025 Rajat Sharma | Crafted with ❤️ DevOps & Cloud</p>
        <p>
          <a href="https://linkedin.com/in/rajat55" target="_blank">LinkedIn</a> |
          <a href="https://github.com/rajatsharma-dev" target="_blank">GitHub</a>
        </p>
      </footer>

      <script>
        const canvas = document.getElementById("particles");
        const ctx2 = canvas.getContext("2d");
        canvas.width = innerWidth; canvas.height = innerHeight;
        const particles = Array.from({length: 100}, () => ({
          x: Math.random()*canvas.width, y: Math.random()*canvas.height,
          r: Math.random()*2 + 1, dx: (Math.random()-0.5)*0.6, dy: (Math.random()-0.5)*0.6
        }));
        function animate(){
          ctx2.clearRect(0,0,canvas.width,canvas.height);
          particles.forEach(p=>{
            ctx2.beginPath();
            ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx2.fillStyle = "#00ffff";
            ctx2.shadowColor = "#00ffff";
            ctx2.shadowBlur = 15;
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
  </html>
  `);
});

// ---------------- ABOUT PAGE ----------------
app.get("/about", (req, res) => {
  res.send(`
    <html><body style="font-family:sans-serif;background:#000;color:#00ffff;padding:40px;">
    <h1>About Rajat Sharma</h1>
    <p>DevOps Engineer with strong experience in AWS, Docker, Kubernetes, Terraform, and CI/CD pipelines. Passionate about automation and scalable architecture.</p>
    <a href="/" style="color:#00ffff;">← Back</a></body></html>
  `);
});

// ---------------- METRICS PAGE ----------------
app.get("/metrics", (req, res) => {
  const totalMem = os.totalmem() / (1024 ** 3);
  const freeMem = os.freemem() / (1024 ** 3);
  const usedMem = totalMem - freeMem;
  const uptime = (os.uptime() / 3600).toFixed(2);

  res.send(`
  <html>
    <body style="background:#000;color:#00ffff;font-family:monospace;padding:40px;">
      <h2>⚙️ Real-time Server Metrics</h2>
      <p>CPU Cores: ${os.cpus().length}</p>
      <p>Memory Used: ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB</p>
      <p>System Uptime: ${uptime} hours</p>
      <p>Platform: ${os.platform()}</p>
      <meta http-equiv="refresh" content="10">
      <a href="/" style="color:#00ffff;">← Back</a>
    </body>
  </html>`);
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
app.get("/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// ---------------- SERVER ----------------
app.listen(3000, () => {
  console.log("🚀 Rajat Sharma Cinematic Portfolio running on port 3000...");
});
