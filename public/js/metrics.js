async function fetchMetrics(){
  const res = await fetch("/metrics-data");
  return res.json();
}

const cpuChart = new Chart(document.getElementById("cpuChart"),{
  type:"line",
  data:{labels:[],datasets:[{label:"CPU Cores",data:[]}]}
});

const memChart = new Chart(document.getElementById("memChart"),{
  type:"line",
  data:{labels:[],datasets:[{label:"Memory GB",data:[]}]}
});

setInterval(async ()=>{
  const m = await fetchMetrics();
  const t = new Date().toLocaleTimeString();

  cpuChart.data.labels.push(t);
  cpuChart.data.datasets[0].data.push(m.cpu);
  cpuChart.update();

  memChart.data.labels.push(t);
  memChart.data.datasets[0].data.push(m.used);
  memChart.update();

},2000);
