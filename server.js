const express = require('express');
const path = require('path');
const app = express();

// Serve static files for about page
app.use(express.static(path.join(__dirname, 'public')));

// Main Dashboard Page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Rajat Sharma | DevOps Automation</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            background: radial-gradient(circle at 20% 20%, #001f3f, #000814, #020024);
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            animation: gradientFlow 15s ease infinite;
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
            font-size: 7rem;
            font-weight: 800;
            background: linear-gradient(to right, #00ffff, #00aaff, #0077ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: 5px;
            text-shadow: 0 0 60px rgba(0, 255, 255, 0.3);
            animation: glowPulse 3s ease-in-out infinite;
          }

          h2 {
            font-size: 2.8rem;
            color: #aee7ff;
            letter-spacing: 1.5px;
            margin-top: 10px;
            animation: fadeInUp 3s ease;
          }

          p {
            font-size: 1.6rem;
            color: #e6faff;
            line-height: 1.8;
            margin-top: 30px;
            max-width: 900px;
            letter-spacing: 1px;
          }

          .divider {
            width: 180px;
            height: 4px;
            background: linear-gradient(to right, #00ffff, #00aaff);
            border-radius: 4px;
            margin: 30px auto;
            animation: pulse 2s infinite alternate;
          }

          .moving-text {
            margin-top: 50px;
            font-size: 2.2rem;
            color: #00eaff;
            font-weight: 600;
            letter-spacing: 2px;
            animation: moveText 8s linear infinite;
            text-shadow: 0 0 20px #00eaff;
          }

          .buttons {
            margin-top: 60px;
            display: flex;
            justify-content: center;
            gap: 40px;
          }

          .btn {
            font-size: 1.4rem;
            padding: 18px 45px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            color: white;
            transition: all 0.3s ease;
          }

          .linkedin {
            background: linear-gradient(45deg, #0077b5, #00aaff);
            box-shadow: 0 0 25px rgba(0,150,255,0.6);
          }
          .linkedin:hover {transform: scale(1.1);}
          .about {
            background: linear-gradient(45deg, #00ffcc, #0099ff);
            box-shadow: 0 0 25px rgba(0,255,255,0.6);
          }
          .about:hover {transform: scale(1.1);}

          footer {
            position: absolute;
            bottom: 25px;
            text-align: center;
            font-size: 1.1rem;
            color: #a8c0ff;
            letter-spacing: 1px;
          }

          @keyframes glowPulse {
            0%, 100% { text-shadow: 0 0 40px #00eaff, 0 0 80px #0077ff; }
            50% { text-shadow: 0 0 100px #00ffff, 0 0 160px #00ccff; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse {
            from { transform: scale(1); opacity: 0.7; }
            to { transform: scale(1.3); opacity: 1; }
          }

          @keyframes moveText {
            0% { transform: translateX(-100%); opacity: 0; }
            25% { transform: translateX(0); opacity: 1; }
            75% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }

          .orb {
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.2);
            animation: float 12s ease-in-out infinite;
            filter: blur(2px);
          }
          .orb:nth-child(1) {
            width: 80px; height: 80px; top: 15%; left: 10%;
            animation-delay: 1s;
          }
          .orb:nth-child(2) {
            width: 60px; height: 60px; top: 70%; left: 80%;
            animation-delay: 3s;
          }
          .orb:nth-child(3) {
            width: 100px; height: 100px; top: 40%; left: 60%;
            animation-delay: 2s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-60px) rotate(180deg); opacity: 1; }
          }
        </style>
      </head>

      <body>
        <div class="hero">
          <h1>RAJAT SHARMA</h1>
          <div class="divider"></div>
          <h2>DevOps Engineer | AWS | Docker | Jenkins | Kubernetes</h2>
          <p>Building the Future of Automation with Scalable CI/CD Pipelines.<br>
             Every commit triggers a seamless automated workflow across the cloud.<br>
             Designed with <b>Docker</b>, <b>Jenkins</b>, <b>GitHub</b>, and <b>AWS EC2</b>.</p>

          <div class="buttons">
            <button class="btn linkedin" onclick="window.open('https://www.linkedin.com/in/rajat-sharma-2213a0277','_blank')">
              🔗 LinkedIn Profile
            </button>
            <button class="btn about" onclick="window.location.href='/about'">
              📄 About Rajat Sharma
            </button>
          </div>

          <div class="moving-text">⚙️ AUTOMATION IS THE FUTURE ⚙️</div>
        </div>

        <footer>© 2025 Rajat Sharma | DevOps CI/CD Automation Dashboard</footer>

        <div class="orb"></div>
        <div class="orb"></div>
        <div class="orb"></div>
      </body>
    </html>
  `);
});

// About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.listen(3000, () => {
  console.log('🚀 Rajat Sharma Premium CI/CD Dashboard running on port 3000...');
});
