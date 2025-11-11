/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Cinematic Edition – CI/CD + Docker + Jenkins + Particles + Auto Logs
 */

const express = require("express");
const path = require("path");
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
      <meta name="description" content="Rajat Sharma - DevOps Engineer specializing in AWS, Docker, Kubernetes, and CI/CD automation.">
      <meta name="keywords" content="DevOps, Jenkins, Docker, Kubernetes, AWS, CI/CD, Rajat Sharma, Linux, Automation, Monitoring">
      <meta name="author" content="Rajat Sharma">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
        body {
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(circle at 20% 20%, #001f3f, #000814, #020024);
          color: white;
          overflow-x: hidden;
        }
        canvas {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: -1;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 100;
          animation: fadeIn 1.5s ease-in-out;
        }

        nav .brand {
          font-size: 1.8rem;
          font-weight: 800;
          color: #00ffff;
        }

        nav a {
          color: #aee7ff;
          margin-left: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }

        nav a:hover {
          color: #00ffff;
          text-shadow: 0 0 10px #00ffff;
        }

        header {
          text-align: center;
          padding: 130px 40px 80px;
          animation: fadeInUp 2s ease-in-out;
        }

        h1 {
          font-size: 5rem;
          font-weight: 900;
          background: linear-gradient(to right, #00ffff, #0077ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(0,255,255,0.3);
          animation: glowText 3s infinite alternate;
        }

        h2 {
          margin-top: 15px;
          font-size: 2.2rem;
          color: #cfeaff;
          animation: fadeIn 3s ease;
        }

        p {
          margin-top: 25px;
          font-size: 1.3rem;
          color: #d6faff;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        .buttons {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          gap: 25px;
        }

        .btn {
          padding: 15px 40px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(90deg, #00ffff, #0077ff);
          color: white;
          text-decoration: none;
          box-shadow: 0 0 20px rgba(0,255,255,0.3);
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 40px rgba(0,255,255,0.6);
        }

        section {
          padding: 70px 10%;
          text-align: center;
        }

        .projects {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }

        .card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 0 50px rgba(0,255,255,0.15);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 60px rgba(0,255,255,0.4);
        }

        .card h3 {
          font-size: 1.6rem;
          color: #00eaff;
          margin-bottom: 10px;
        }

        .card p {
          color: #d6faff;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        footer {
          text-align: center;
          padding: 50px 20px;
          color: #a8c0ff;
          background: rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: 80px;
        }

        @keyframes glowText {
          0% { text-shadow: 0 0 20px #00ffff, 0 0 40px #0077ff; }
          100% { text-shadow: 0 0 60px #00ffff, 0 0 120px #00aaff; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
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
          <a href="/logs">Logs</a>
          <a href="https://www.linkedin.com/in/rajat55" target="_blank">LinkedIn</a>
        </div>
      </nav>

      <header>
        <h1>Rajat Sharma</h1>
        <h2>DevOps Engineer | Automation | Cloud CI/CD</h2>
        <p>
          Certified Kubernetes Administrator (CKA) and Docker Specialist with 4+ years of experience in Linux, AWS, and Jenkins automation.  
          I build scalable systems that connect automation, monitoring, and cloud integration seamlessly.
        </p>
        <div class="buttons">
          <a href="/about" class="btn">About Me</a>
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
        <h2>⚙️ My Tech Stack</h2>
        <div class="projects">
          <div class="card"><h3>Cloud & DevOps</h3><p>AWS, GCP, Terraform, Ansible</p></div>
          <div class="card"><h3>Containers</h3><p>Docker, Kubernetes, Helm</p></div>
          <div class="card"><h3>CI/CD Tools</h3><p>Jenkins, GitHub Actions, ArgoCD</p></div>
          <div class="card"><h3>Monitoring</h3><p>Prometheus, Grafana, ELK Stack</p></div>
        </div>
      </section>

      <footer>
        <p>© 2025 Rajat Sharma | Built with ❤️ DevOps, Docker & Jenkins</p>
        <p>
          <a href="https://www.linkedin.com/in/rajat55" target="_blank" style="color:#00ffff">LinkedIn</a> |
          <a href="https://github.com/rajatsharma-dev" target="_blank" style="color:#00ffff">GitHub</a>
        </p>
      </footer>

      <script>
        const canvas = document.getElementById("particles");
        const ctx = canvas.getContext("2d");
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        const particles = Array.from({length: 60}, () => ({
          x: Math.random()*canvas.width,
          y: Math.random()*canvas.height,
          r: Math.random()*2 + 1,
          dx: (Math.random()-0.5)*0.5,
          dy: (Math.random()-0.5)*0.5
        }));
        function animate(){
          ctx.clearRect(0,0,canvas.width,canvas.height);
          particles.forEach(p=>{
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle = "#00ffff";
            ctx.shadowColor = "#00ffff";
            ctx.shadowBlur = 10;
            ctx.fill();
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
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// ---------------- LOGS ----------------
app.get("/logs", (req, res) => {
  try {
    const logs = execSync("docker logs node-cicd --tail 20").toString();
    res.send(`<meta http-equiv="refresh" content="5"><pre style="background:#000;color:#00ffff;padding:20px;">${logs}</pre>`);
  } catch {
    res.send("<p style='color:red;padding:20px;'>No container logs available.</p>");
  }
});

// ---------------- HEALTH ----------------
app.get("/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// ---------------- SERVER ----------------
app.listen(3000, () => {
  console.log("🚀 Rajat Sharma Cinematic Portfolio running beautifully on port 3000...");
});
