/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Final Cinematic Server (Clean + Professional + Scalable)
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

const app = express();

// Static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ---------------- HOME ----------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// ---------------- ABOUT ----------------
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// ---------------- CONTACT FORM PAGE ----------------
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// ---------------- CONTACT FORM SUBMIT ----------------
app.post("/contact", (req, res) => {
  console.log("New contact form submission:", req.body);

  res.send(`
    <html>
      <body style="background:black;color:cyan;font-family:monospace;padding:40px;text-align:center;">
        <h2>Your message is received</h2>
        <p>Thank you for contacting Rajat Sharma</p>
        <a href="/" style="color:#00ffff;">Back to Home</a>
      </body>
    </html>
  `);
});

// ---------------- METRICS UI ----------------
app.get("/metrics", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "metrics.html"));
});

// ---------------- METRICS API ----------------
app.get("/metrics-data", (req, res) => {
  const total = os.totalmem() / 1024 / 1024 / 1024;
  const free = os.freemem() / 1024 / 1024 / 1024;
  const used = total - free;

  res.json({
    cpu: os.cpus().length,
    used: used.toFixed(2),
    total: total.toFixed(2),
    uptime: (os.uptime() / 3600).toFixed(2)
  });
});

// ---------------- LOGS PAGE ----------------
app.get("/logs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "logs.html"));
});

// ---------------- DOCKER LOGS API ----------------
app.get("/get-logs", (req, res) => {
  try {
    const logs = execSync("docker logs node-cicd --tail 50").toString();
    res.send(logs);
  } catch {
    res.send("No Docker container logs found");
  }
});

// ---------------- HEALTH ----------------
app.get("/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// ---------------- SERVER START ----------------
app.listen(3000, () => {
  console.log("Cinematic DevOps Portfolio running at http://localhost:3000");
});
