const ctx = document.getElementById('cpuChart').getContext('2d');

let cpuData = [];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "CPU Usage (%)",
            data: cpuData,
            borderColor: "rgba(0, 200, 255, 1)",
            backgroundColor: "rgba(0, 200, 255, 0.15)",
            borderWidth: 3,
            fill: true,

            // 🔥 Make curve rounded
            tension: 0.45,

            // 🔥 Bigger round dots
            pointRadius: 5,
            pointBackgroundColor: "rgba(0, 200, 255, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,

            // 🔥 Smooth animation
            animation: {
                duration: 800,
                easing: 'easeInOutQuad'
            }
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                grid: { color: "rgba(255,255,255,0.05)" },
                ticks: { color: "#fff" }
            },
            x: {
                grid: { color: "rgba(255,255,255,0.05)" },
                ticks: { color: "#fff" }
            }
        },

        plugins: {
            legend: { labels: { color: "#fff" } }
        }
    }
});

// 🔁 Fetch live CPU % every 2 seconds
function updateCPU() {
    fetch('/api/cpu')
        .then(res => res.json())
        .then(data => {
            let cpu = data.cpu.toFixed(2);

            if (cpuData.length > 40) cpuData.shift();

            cpuData.push(cpu);
            chart.data.labels.push("");

            chart.update();
        });
}

setInterval(updateCPU, 2000);
