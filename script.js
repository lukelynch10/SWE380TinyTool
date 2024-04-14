// components
//Cohesion LCOM4 

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

    $('#result').text("Cohesion: " + lcom4.toFixed(10));
}

//Coupling Fenton and Melton
$(document).ready(function(){
    $("#couplingForm").submit(function(event){
      event.preventDefault();
      let n = parseInt($("#dependencies").val());
      let i = parseInt($("#dependencyLevel").val());
      let coupling = calculateCoupling(n, i);
      $("#couplingResult").text("Coupling " + coupling.toFixed(2));
    });
    
    function calculateCoupling(n, i) {
      return i + n / (n + 1);
    }
  });

//jquery
$(document).ready(function(){
    $('#calculate').click(function(){
        calculateLCOM4();
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