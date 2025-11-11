const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Project Infinity | Rajat Sharma DevOps CI/CD</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            background: linear-gradient(120deg, #020024, #090979, #00d4ff);
            background-size: 400% 400%;
            animation: gradientShift 12s ease infinite;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            overflow: hidden;
          }

          .main-container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            padding: 80px 120px;
            border-radius: 35px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
            animation: fadeIn 2s ease-in-out;
          }

          h1 {
            font-size: 4.5rem;
            background: linear-gradient(to right, #00f5d4, #00bbf9, #4361ee);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
            animation: slideDown 1.2s ease;
          }

          h2 {
            font-size: 2rem;
            color: #bde0fe;
            margin-bottom: 20px;
            letter-spacing: 1px;
            animation: fadeIn 2.2s ease-in-out;
          }

          p {
            font-size: 1.2rem;
            color: #e0f2ff;
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .highlight {
            color: #00ffff;
            font-weight: 600;
          }

          .info-card {
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 15px;
            padding: 15px 25px;
            display: inline-block;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
            color: #aeefff;
            animation: glowPulse 3s infinite ease-in-out;
          }

          footer {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            color: #b0d8ff;
            font-size: 0.9rem;
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPulse {
            0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
            50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.7); }
            100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
          }

          .orb {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(0,255,255,0.3);
            animation: float 10s infinite ease-in-out;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-60px) rotate(180deg); opacity: 1; }
          }
        </style>
      </head>

      <body>
        <div class="main-container">
          <h1>🚀 Project Infinity</h1>
          <h2>Welcome Rajat Sharma</h2>
          <p>Your <span class="highlight">End-to-End DevOps Pipeline</span> has been successfully built and deployed.<br>
          This is a fully automated <span class="highlight">CI/CD</span> system powered by Jenkins, Docker, GitHub, and AWS EC2.</p>

          <div class="info-card">
            🌐 Environment: AWS EC2 (Ubuntu 22.04) <br>
            🔄 Last Build: 11-Nov-2025 | Build ID: #1 <br>
            🧠 Managed by: Jenkins Automation Engine
          </div>
        </div>

        <footer>© 2025 Rajat Sharma | Project Infinity – DevOps CI/CD Dashboard</footer>

        <!-- floating glowing orbs -->
        <div class="orb" style="top: 20%; left: 10%; animation-delay: 1s;"></div>
        <div class="orb" style="top: 70%; left: 80%; animation-delay: 3s;"></div>
        <div class="orb" style="top: 40%; left: 60%; animation-delay: 2s;"></div>
        <div class="orb" style="top: 85%; left: 25%; animation-delay: 4s;"></div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('🚀 Project Infinity running on port 3000...');
});
