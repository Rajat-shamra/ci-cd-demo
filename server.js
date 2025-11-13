/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Final Cinematic Server – Clean, Stable, Professional
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const app = express();
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


// ---------------- CONTACT PAGE ----------------
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});


// ---------------- CONTACT SUBMIT ----------------
app.post("/contact", (req, res) => {
  console.log("New Contact Message:", req.body);

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


// ---------------- METRICS UI PAGE ----------------
app.get("/metrics", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "metrics.html"));
});


// ---------------- SYSTEM METRICS API ----------------
app.get("/api/metrics", async (req, res) => {
  try {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    // Get Docker Container Count
    exec('docker ps --format "{{.Names}}" || true', (err, stdout) => {
      let containers = [];
      if (!err && stdout.trim()) {
        containers = stdout.split("\n").filter(Boolean);
      }

      res.json({
        ok: true,
        cpuCores: os.cpus().length,
        usedMemBytes: used,
        totalMemBytes: total,
        freeMemBytes: free,
        uptimeSec: os.uptime(),
        dockerCount: containers.length,
        containers: containers,
        timestamp: Date.now()
      });
    });

  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});


// ---------------- DOCKER CONTAINER DETAILS API ----------------
app.get("/api/containers", (req, res) => {
  exec('docker ps --format "{{.ID}} {{.Names}} {{.Image}} {{.Status}}" || true',
    (err, stdout) => {
      if (err || !stdout.trim()) {
        return res.json({ ok: true, containers: [] });
      }

      const containers = stdout
        .trim()
        .split("\n")
        .map(line => {
          const p = line.split(" ");
          return {
            id: p[0],
            name: p[1],
            image: p[2],
            status: p.slice(3).join(" ")
          };
        });

      res.json({ ok: true, containers });
    });
});


// ---------------- LOGS UI PAGE ----------------
app.get("/logs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "logs.html"));
});


// ---------------- DOCKER APP LOGS API ----------------
app.get("/get-logs", (req, res) => {
  exec("docker logs node-cicd --tail 50 || true", (err, stdout) => {
    res.send(stdout || "No Docker container logs found");
  });
});


// ---------------- HEALTH CHECK ----------------
app.get("/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});


// ---------------- START SERVER ----------------
app.listen(3000, () => {
  console.log("✔ Rajat Sharma Portfolio running at http://localhost:3000");
});
