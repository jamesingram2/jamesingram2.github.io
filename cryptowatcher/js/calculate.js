export function calculate() {
   let calculatorResultsDiv = document.getElementById("calculatorResults");
   document.getElementById('calculate').addEventListener('click', calcFunction);
   document.getElementById('reset').addEventListener('click', function() {
      calculatorResultsDiv.innerHTML = "";
   });

   function calcFunction() {
      let currAmt = document.getElementById('currAmt').value;
      let coin1 = document.getElementById('coin1').value;
      let coin1El = document.getElementById('coin1');
      console.log(coin1El);
      let coin2 = document.getElementById('coin2').value;
      let coin2Symbol = document.getElementById('coin2').innerText;
      let finalValue = "";

      if (currAmt <= 0) {
         alert(`Please enter an amount to convert`);
      } else {
         if (coin1 !== coin2) {
            finalValue = ((+coin1 / +coin2) * +currAmt).toFixed(6);
            calculatorResultsDiv.innerHTML = `<h2>${finalValue}</h2>`;
         }
      }
   }
}