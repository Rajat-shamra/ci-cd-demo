const express = require('express');
const app = express();

app.use(express.static('public'));

// =================== HOME PAGE ===================
app.get('/', (req, res) => {
  res.send(`
  <html>
    <head>
      <title>Rajat Sharma | DevOps Portfolio</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(120deg, #000428, #004e92);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          color: white;
          overflow-x: hidden;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        header {
          text-align: center;
          padding: 100px 20px 60px;
          animation: fadeIn 2s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h1 {
          font-size: 5rem;
          background: linear-gradient(to right, #00ffff, #00aaff, #0077ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(0,255,255,0.3);
          font-weight: 800;
          letter-spacing: 5px;
        }

        h2 {
          margin-top: 20px;
          font-size: 2.5rem;
          color: #aee7ff;
          letter-spacing: 1px;
        }

        p {
          margin-top: 20px;
          font-size: 1.3rem;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          color: #e6faff;
        }

        .buttons {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          gap: 25px;
        }

        .btn {
          padding: 15px 35px;
          font-size: 1.3rem;
          border: none;
          border-radius: 40px;
          background: linear-gradient(90deg, #00ffff, #0077ff);
          color: white;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(0,255,255,0.5);
        }

        .btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 40px rgba(0,255,255,0.8);
        }

        section {
          padding: 60px 10%;
          text-align: center;
        }

        .projects {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          margin-top: 50px;
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
          box-shadow: 0 0 60px rgba(0,255,255,0.5);
        }

        .card h3 {
          font-size: 1.8rem;
          color: #00eaff;
          margin-bottom: 15px;
        }

        .card p {
          font-size: 1.1rem;
          color: #d6faff;
          line-height: 1.6;
        }

        .footer {
          text-align: center;
          margin-top: 80px;
          color: #a8c0ff;
          padding: 20px;
        }

        .floating {
          position: absolute;
          border-radius: 50%;
          background: rgba(0, 255, 255, 0.15);
          animation: float 10s ease-in-out infinite;
          filter: blur(2px);
          z-index: -1;
        }

        .floating:nth-child(1) { width: 100px; height: 100px; top: 10%; left: 10%; animation-delay: 1s; }
        .floating:nth-child(2) { width: 80px; height: 80px; bottom: 15%; right: 15%; animation-delay: 3s; }
        .floating:nth-child(3) { width: 150px; height: 150px; top: 50%; left: 70%; animation-delay: 5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-40px); opacity: 1; }
        }
      </style>
    </head>
    <body>
      <div class="floating"></div>
      <div class="floating"></div>
      <div class="floating"></div>

      <header>
        <h1>Rajat Sharma</h1>
        <h2>DevOps Engineer | Cloud Automation</h2>
        <p>
          A Certified Kubernetes Administrator (CKA) and Docker Expert with 4+ years of experience in Linux, AWS, Jenkins CI/CD, and Container Orchestration.
          Passionate about automating workflows and creating high-availability infrastructure.
        </p>
        <div class="buttons">
          <a href="/about" class="btn">About Me</a>
          <a href="https://www.linkedin.com/in/rajat55" target="_blank" class="btn">LinkedIn</a>
        </div>
      </header>

      <section>
        <h2 style="font-size:2.5rem;color:#00ffff;text-shadow:0 0 20px #00ffff;">🚀 Featured Projects</h2>
        <div class="projects">
          <div class="card">
            <h3>Dockerized Application Deployment</h3>
            <p>Developed microservices using Docker for containerization and deployed using AWS EC2 instances.</p>
          </div>

          <div class="card">
            <h3>CI/CD Pipeline (Jenkins + GitHub)</h3>
            <p>Created a complete CI/CD flow for automated builds, testing, and container deployments to production.</p>
          </div>

          <div class="card">
            <h3>Kubernetes Cluster Management</h3>
            <p>Deployed and maintained scalable K8s clusters with auto-scaling, monitoring, and self-healing setup.</p>
          </div>

          <div class="card">
            <h3>Linux Server Automation</h3>
            <p>Automated provisioning and patching of 14+ Linux servers using Ansible and Bash scripting.</p>
          </div>

          <div class="card">
            <h3>Monitoring and Alerts</h3>
            <p>Implemented Prometheus + Grafana monitoring stack with custom dashboards and real-time alerts.</p>
          </div>
        </div>
      </section>

      <div class="footer">© 2025 Rajat Sharma | Built with ❤️ DevOps & Automation</div>
    </body>
  </html>
  `);
});

// ===== ABOUT PAGE =====
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

app.listen(3000, () => {
  console.log('🚀 Rajat Sharma Portfolio running on port 3000...');
});
