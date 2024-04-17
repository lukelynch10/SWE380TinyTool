// components
//Cohesion LCOM4 
let coupling = "";
let lcom4Added = 0;
let couplingAdded = 0;
function calculateLCOM4() {
    let meanAccesses = parseFloat($('#meanAccesses').val());
    let methodAttributesStr = $('#methodAttributes').val().trim();
    let methodInvocationsStr = $('#methodInvocations').val().trim();

    if (isNaN(meanAccesses) || methodAttributesStr === '' || methodInvocationsStr === '') {
        alert('Please fill all fields with valid numbers');
        return;
    }

    let methodAttributes = methodAttributesStr.split(',').map(function(item) {
        return parseInt(item.trim());
    });

    let methodInvocations = methodInvocationsStr.split(',').map(function(item) {
        return parseInt(item.trim());
    });

    let sumAttributesSquared = 0;
    let sumInvocationsSquared = 0;

    for (let i = 0; i < methodAttributes.length; i++) {
        sumAttributesSquared += Math.pow(methodAttributes[i], 2);
        sumInvocationsSquared += Math.pow(methodInvocations[i], 2);
    }

    let numerator = Math.max(0, sumAttributesSquared - sumInvocationsSquared);
    let denominator = Math.max(1, (meanAccesses - (sumInvocationsSquared / meanAccesses)) * (meanAccesses - 1));

    let lcom4 = numerator / denominator;
        
    $('#result').text(lcom4.toFixed(10));
}

//Coupling Fenton and Melton
$(document).ready(function(){
    $("#couplingForm").submit(function(event){
      event.preventDefault();
      let n = parseInt($("#dependencies").val());
      let i = parseInt($("#dependencyLevel").val());
      coupling = calculateCoupling(n, i);
      $("#couplingResult").text(coupling.toFixed(2));
      couplingAdded += coupling;
      $('#totalCoupling').text(couplingAdded);
      
    });
    
    function calculateCoupling(n, i) {
      return i + n / (n + 1);
    }
  });

// tally
function tally(){
    let lcom4Text = $('#result').text();
    let lcom4number = Number(lcom4Text);
    lcom4Added += lcom4number;
    $("#totalCohesion").text(lcom4Added); 
}

//jquery
$(document).ready(function(){
    $('#calculate').click(function(){
        calculateLCOM4();
        tally();
    });
});


var containerCount = 0;
function addComponent() {
    containerCount++;
  // Create a new container element
  var container = document.createElement("div");
  container.className = "container-component";
  
  var card = document.createElement("div");
  card.className = "card-component";
  card.innerHTML = "Name:<br><br>Coupled:<br><br>Cohesion:<br>" + containerCount

  var deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-delete";

  var editButton = document.createElement("button");
  editButton.className = "btn btn-edit";

  deleteButton.addEventListener('click', function() {
    container.remove();
  });

  container.appendChild(card);
  card.appendChild(deleteButton);
  card.appendChild(editButton);

  // Append the new container to the container wrapper
  document.getElementById("containerWrapper").appendChild(container);
}