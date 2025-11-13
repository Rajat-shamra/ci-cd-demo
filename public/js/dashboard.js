// Universal fetcher
function run(cmd, id) {
  fetch("/run?cmd=" + encodeURIComponent(cmd))
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerText = data || "No output";
    });
}

// CPU + Memory Circles
function updateCircles() {

  // Memory
  fetch("/run?cmd=free -m")
    .then(res => res.text())
    .then(mem => {
      const lines = mem.split("\n");
      const values = lines[1].split(/\s+/);
      const total = parseInt(values[1]);
      const used = parseInt(values[2]);
      const percent = Math.round((used / total) * 100);
      document.getElementById("memCircle").innerText = percent + "%";
    });

  // CPU
  fetch("/run?cmd=grep -c ^processor /proc/cpuinfo")
    .then(res => res.text())
    .then(cpu => {
      const cores = parseInt(cpu.trim());
      const percent = Math.min(cores * 12, 100);
      document.getElementById("cpuCircle").innerText = percent + "%";
    });
}

// Refresh All Panels
function refreshAll() {
  updateCircles();
  run("docker ps --format 'table {{.Names}}\\t{{.Status}}'", "docker");
  run("kubectl get pods -A", "pods");
  run("helm list -A", "helm");
}

refreshAll();
setInterval(refreshAll, 5000);
