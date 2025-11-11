/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Features: Cinematic UI + Working Contact Form (Email) + Jenkins/Docker Integration
 */

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const { execSync } = require("child_process");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ---------------- EMAIL CONFIGURATION ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajatkumarsharma397@gmail.com", // your email
    pass: "YOUR_APP_PASSWORD", // replace with app password from Gmail
  },
});

// ---------------- HOME PAGE ----------------
app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>Rajat Sharma | DevOps Engineer</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(circle at 20% 20%, #001f3f, #000814, #020024);
          color: white;
          overflow-x: hidden;
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          position: sticky;
          top: 0;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          z-index: 100;
        }
        nav .brand {
          font-size: 1.5rem;
          font-weight: 800;
          color: #00ffff;
        }
        nav a {
          color: #aee7ff;
          margin-left: 25px;
          text-decoration: none;
          font-weight: 600;
        }
        nav a:hover {
          color: #00ffff;
          text-shadow: 0 0 10px #00ffff;
        }
        header {
          text-align: center;
          padding: 120px 40px 80px;
        }
        h1 {
          font-size: 5rem;
          font-weight: 900;
          background: linear-gradient(to right, #00ffff, #0077ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(0,255,255,0.3);
        }
        h2 {
          margin-top: 15px;
          font-size: 2.2rem;
          color: #cfeaff;
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
        .contact {
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 40px;
          margin-top: 60px;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
        }
        .contact h3 {
          color: #00ffff;
          font-size: 2rem;
          margin-bottom: 20px;
        }
        .contact form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .contact input, .contact textarea {
          width: 80%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 1rem;
        }
        .contact button {
          padding: 12px 35px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(90deg, #00ffff, #0077ff);
          color: white;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .contact button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0,255,255,0.5);
        }
        footer {
          text-align: center;
          padding: 50px 20px;
          color: #a8c0ff;
          background: rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: 80px;
        }
      </style>
    </head>
    <body>
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
        <h2>DevOps Engineer | Cloud Automation | CI/CD</h2>
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
          <div class="card"><h3>Kubernetes Cluster</h3><p>Configured production-ready Kubernetes clusters with monitoring and HPA.</p></div>
          <div class="card"><h3>CI/CD Pipeline</h3><p>Integrated Jenkins, GitHub, Docker, and AWS to automate build-to-deploy workflows.</p></div>
          <div class="card"><h3>Monitoring Stack</h3><p>Prometheus + Grafana dashboards for real-time infrastructure insights.</p></div>
        </div>

        <div class="contact">
          <h3>📨 Contact Me</h3>
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" rows="4" placeholder="Your Message..." required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <footer>© 2025 Rajat Sharma | Built with ❤️ DevOps, Docker & Jenkins</footer>
    </body>
  </html>
  `);
});

// ---------------- ABOUT ----------------
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// ---------------- CONTACT FORM HANDLER ----------------
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"Rajat Sharma Portfolio" <${email}>`,
    to: "rajatkumarsharma397@gmail.com",
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📨 New Message Sent Successfully!");
    res.send(`<html style="background:#00111f;color:#00eaff;padding:40px;font-family:Poppins">
      <h2>Thank you, ${name}!</h2>
      <p>Your message has been successfully delivered to Rajat.</p>
      <a href="/" style="color:#00ffff">← Back to Home</a>
    </html>`);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    res.send(`<p style="color:red;padding:40px;">Error sending message. Please try again later.</p>`);
  }
});

// ---------------- LOGS ----------------
app.get("/logs", (req, res) => {
  try {
    const logs = execSync("docker logs node-cicd --tail 20").toString();
    res.send(`<pre style="background:#000;color:#00ffff;padding:20px;">${logs}</pre>`);
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
  console.log("🚀 Rajat Sharma Portfolio running on port 3000 with live email support...");
});
