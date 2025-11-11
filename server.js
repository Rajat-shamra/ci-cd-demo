const express = require('express');
const path = require('path');
const app = express();

// Serve static files (public folder)
app.use(express.static('public'));

// ===== HOME PAGE =====
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Rajat Sharma | DevOps Automation</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            background: radial-gradient(circle at 20% 20%, #001f3f, #000814, #020024);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            animation: gradientFlow 15s ease infinite;
            overflow: hidden;
          }
          @keyframes gradientFlow {
            0% { background: radial-gradient(circle at 20% 20%, #001f3f, #000814, #020024); }
            50% { background: radial-gradient(circle at 80% 80%, #002f5f, #001122, #000); }
            100% { background: radial-gradient(circle at 20% 20%, #001f3f, #000814, #020024); }
          }
          .hero {
            text-align: center;
            padding: 100px 150px;
            background: rgba(255, 255, 255, 0.07);
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(12px);
            box-shadow: 0 0 100px rgba(0, 255, 255, 0.25);
            animation: fadeIn 2s ease-in-out;
          }
          h1 {
            font-size: 6rem;
            font-weight: 800;
            background: linear-gradient(to right, #00ffff, #00aaff, #0077ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 5px;
            animation: glowPulse 3s ease-in-out infinite;
          }
          h2 {
            font-size: 2.2rem;
            color: #aee7ff;
            margin-top: 10px;
          }
          .buttons {
            margin-top: 40px;
            display: flex;
            gap: 20px;
            justify-content: center;
          }
          .btn {
            padding: 15px 35px;
            font-size: 1.3rem;
            border: none;
            border-radius: 40px;
            background: linear-gradient(45deg, #00ffcc, #0099ff);
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            box-shadow: 0 0 20px rgba(0,255,255,0.5);
          }
          .btn:hover {
            transform: scale(1.08);
            box-shadow: 0 0 40px rgba(0,255,255,0.8);
          }
          .moving-text {
            margin-top: 40px;
            font-size: 1.8rem;
            color: #00eaff;
            font-weight: 600;
            letter-spacing: 2px;
            animation: moveText 8s linear infinite;
          }
          @keyframes moveText {
            0% { transform: translateX(-100%); opacity: 0; }
            25% { transform: translateX(0); opacity: 1; }
            75% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          footer {
            position: absolute;
            bottom: 25px;
            font-size: 1.1rem;
            color: #a8c0ff;
          }
        </style>
      </head>
      <body>
        <div class="hero">
          <h1>RAJAT SHARMA</h1>
          <h2>DevOps Engineer | Cloud | Automation</h2>
          <div class="buttons">
            <a href="/about" class="btn">About Me</a>
            <a href="https://www.linkedin.com/in/rajat55" target="_blank" class="btn">LinkedIn</a>
            <a href="/projects" class="btn">My Projects</a>
          </div>
          <div class="moving-text">⚙️ AUTOMATION IS THE FUTURE ⚙️</div>
        </div>
        <footer>© 2025 Rajat Sharma | DevOps CI/CD Dashboard</footer>
      </body>
    </html>
  `);
});

// ===== FIXED: ABOUT PAGE =====
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// ===== PROJECTS PAGE =====
app.get('/projects', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Projects | Rajat Sharma</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: radial-gradient(circle, #020024, #001133, #002244);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px;
          }
          h1 {
            font-size: 3.5rem;
            color: #00ffff;
            margin-bottom: 40px;
          }
          .card {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 30px;
            margin: 15px;
            width: 70%;
            box-shadow: 0 0 30px rgba(0,255,255,0.3);
            transition: transform 0.3s ease;
          }
          .card:hover {
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(0,255,255,0.6);
          }
          a { color: #00eaff; text-decoration: none; }
        </style>
      </head>
      <body>
        <h1>🚀 Projects by Rajat Sharma</h1>
        <div class="card">
          <h2>CI/CD Pipeline with Jenkins & Docker</h2>
          <p>Fully automated deployment pipeline using GitHub → Jenkins → Docker → AWS EC2</p>
        </div>
        <div class="card">
          <h2>Kubernetes Monitoring Setup</h2>
          <p>Created Prometheus + Grafana monitoring for K8s cluster with custom dashboards.</p>
        </div>
        <a href="/" style="margin-top:40px;font-size:1.3rem;">⬅ Back to Home</a>
      </body>
    </html>
  `);
});

// ===== SERVER =====
app.listen(3000, () => {
  console.log('🚀 Rajat Sharma Portfolio running on port 3000...');
});
