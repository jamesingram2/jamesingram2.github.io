export function history() {
   const coinListEl = document.getElementsByClassName("coinList");
   for (let items of coinListEl) {
      items.addEventListener('click', function() {
         let coinKey = items.value;
         async function fetchistory() {
            const graphsDiv = document.getElementById("graphs");
            let xArr = [];
            let yArr = [];
            const response = await fetch(`https://api.coincap.io/v2/assets/${coinKey}/history?interval=d1`);
            const data = await response.json();
            const historyData = data.data;
            for (let items of historyData) {
               let x = items.date;
               xArr.push(x);
               let y = items.priceUsd;
               yArr.push(y);
            }
            let trace = {
               x: xArr,
               y: yArr,
               type: 'scatter'
            };
            let dataPoints = [trace]
            Plotly.newPlot('graphs', dataPoints);
         }
         setTimeout(fetchistory, 1000);
      })
   }
}
