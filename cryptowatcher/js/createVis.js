export function history() {
   const coinListEl = document.getElementsByClassName("coinList");
   for (let items of coinListEl) {
      items.addEventListener('click', function() {
         const tempGraphDiv = document.getElementById("tempGraph");
         const graphsDiv = document.getElementById("graphs");
         tempGraphDiv.style.display="none";
         let coinKey = items.value;
         async function fetchistory() {
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
            graphsDiv.innerHTML += `<nav aria-label="Graph Navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item" id="year"><a class="page-link">Year</a></li>
              <li class="page-item" id="month"><a class="page-link">Month</a></li>
              <li class="page-item" id="week"><a class="page-link">Week</a></li>
              <li class="page-item" id="day"><a class="page-link">Day</a></li>
              <li class="page-item" id="day"><a class="page-link">Compare</a></li>
            </ul>
          </nav>`
         }
         setTimeout(fetchistory, 800);
      })
   }
}
