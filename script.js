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



function addComponent() {
  // Create a new container element
  var container = document.createElement("div");
  container.className = "container-component";
  
  var card = document.createElement("div");
  card.className = "card-component";
  card.innerHTML = "Name:<br><br>Coupled:<br><br>Cohesion:<br>"

  var deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-delete";

  var editButton = document.createElement("button");
  editButton.className = "btn btn-edit";


  var dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu"
  dropdownMenu.style = "background-color: #feffbe;"

  var header = document.createElement("div");
  header.className = "header";
  header.innerHTML = "Overall Coupling:<br>Overall Cohesion:";


  var centerBox = document.createElement("div");
  centerBox.className = "center-box";

  var componentName = document.createElement("input");
  componentName.type = "text";
  componentName.id = "componentName";
  componentName.placeholder = "Enter component name";

  var buttons = document.createElement("div");
  buttons.className = "d-grid gap-2 d-md-block";
  buttons.style = "margin-top: 10px;"

  var CancelButton = document.createElement("button");
  CancelButton.className = "btn btn-danger";
  CancelButton.innerHTML = "Cancel";

  var SaveButton = document.createElement("button");
  SaveButton.className = "btn btn-primary";
  SaveButton.innerHTML = "Save";
  SaveButton.style = "margin-left: 10px;"

  var couplingForm = document.createElement("form");
  couplingForm.className = "form";

  
  var coupled_container = document.createElement("div");
  coupled_container.className = "coupled_container";

  var couplingTitle = document.createElement("label");
  couplingTitle.classname = "couplingTitle";
  couplingTitle.innerHTML = "Coupling Data";
  couplingTitle.style = "font-size: 50px; font-weight: bold; margin-top: 10px;"

  var coupledWith = document.createElement("label");
  coupledWith.classname = "coupledWith";
  coupledWith.innerHTML = "Component Coupled With ";
  coupledWith.style = "margin-right: 10px;";


  var coupledInput = document.createElement("input");
  coupledInput.type = "text";
  coupledInput.id = "coupledWith";
  coupledInput.placeholder = "Enter component name";


  var dependant_container = document.createElement("div");
  dependant_container.className = "dependant_container";

  var Dependency = document.createElement("label");
  Dependency.classname = "Dependency";
  Dependency.innerHTML = "How dependent are they on each other:"

  var dependencyInputClass = document.createElement("div");
  dependencyInputClass.className = "form-check form-check-inline";
  

  var dependencyInput1 = document.createElement("input");
  dependencyInput1.type = "checkbox";
  dependencyInput1.id = "defaultCheck1";
  dependencyInput1.style = "margin-right: 10px;";

  var dependencyLabel1 = document.createElement("label");
  dependencyLabel1.classname = "form-check-label";
  dependencyLabel1.innerHTML = "1";
  dependencyLabel1.style = "margin-right: 10px;";

  var dependencyInput2 = document.createElement("input");
  dependencyInput2.type = "checkbox";
  dependencyInput2.id = "defaultCheck1";
  dependencyInput2.style = "margin-right: 10px;";

  var dependencyLabel2 = document.createElement("label");
  dependencyLabel2.classname = "form-check-label";
  dependencyLabel2.innerHTML = "2";
  dependencyLabel2.style = "margin-right: 10px;";

  var dependencyInput3 = document.createElement("input");
  dependencyInput3.type = "checkbox";
  dependencyInput3.id = "defaultCheck1";
  dependencyInput3.style = "margin-right: 10px;";

  var dependencyLabel3 = document.createElement("label");
  dependencyLabel3.classname = "form-check-label";
  dependencyLabel3.innerHTML = "3";
  dependencyLabel3.style = "margin-right: 10px;";

  var dependencyInput4 = document.createElement("input");
  dependencyInput4.type = "checkbox";
  dependencyInput4.id = "defaultCheck1";
  dependencyInput4.style = "margin-right: 10px;";

  var dependencyLabel4 = document.createElement("label");
  dependencyLabel4.classname = "form-check-label";
  dependencyLabel4.innerHTML = "4";
  dependencyLabel4.style = "margin-right: 10px;";


  var dependencyInput5 = document.createElement("input");
  dependencyInput5.type = "checkbox";
  dependencyInput5.id = "defaultCheck1";
  dependencyInput5.style = "margin-right: 10px;";

  var dependencyLabel5 = document.createElement("label");
  dependencyLabel5.classname = "form-check-label";
  dependencyLabel5.innerHTML = "5";


  var numDependancies_container = document.createElement("div");
  numDependancies_container.className = "numDependancies_container";

  var numDependanciesLabel = document.createElement("label");
  numDependanciesLabel.classname = "numDependanciesLabel";
  numDependanciesLabel.innerHTML = "Number of Dependencies ";
  numDependanciesLabel.style = "margin-right: 10px;";

  var numDependanciesInput = document.createElement("input");
  numDependanciesInput.type = "text";
  numDependanciesInput.id = "numDependanciesInput";
  numDependanciesInput.placeholder = "Number of Dependencies";


  var cohesionTitle = document.createElement("label");
  cohesionTitle.classname = "cohesionTitle";
  cohesionTitle.innerHTML = "Cohesion Data";
  cohesionTitle.style = "font-size: 50px; font-weight: bold; margin-top: 10px;"

  var cohesionForm = document.createElement("form");
  cohesionForm.className = "form";


  var MethodsLabelContainer = document.createElement("div");
  MethodsLabelContainer.className = "MethodsLabelContainer";
  MethodsLabelContainer.stype = "align-items: center; justify-content: center; display: flex; flex-direction: column; margin-top: 10px;";

  var MethodsLabel = document.createElement("label");
  MethodsLabel.classname = "MethodsLabel";
  MethodsLabel.innerHTML = "Methods:"
  MethodsLabel.style = "font-size: 30px; font-weight: bold; margin-top: 10px";

  
  var Add_Method_button = document.createElement("button");
  Add_Method_button.className = "btn btn-primary";
  Add_Method_button.innerHTML = "+Add a Method";



  deleteButton.addEventListener('click', function() {
    container.remove();
  });

  editButton.addEventListener('click', function() {
    dropdownMenu.classList.toggle("show");
  });

  SaveButton.addEventListener("click", function() {
    dropdownMenu.classList.remove("show");
});

CancelButton.addEventListener("click", function() {
  dropdownMenu.classList.remove("show");
});


  container.appendChild(card);

  card.appendChild(deleteButton);
  card.appendChild(editButton);
  card.appendChild(dropdownMenu);

  dropdownMenu.appendChild(header);

  dropdownMenu.appendChild(centerBox);
  centerBox.appendChild(componentName);

  centerBox.appendChild(buttons);
  buttons.appendChild(CancelButton);
  buttons.appendChild(SaveButton);

  centerBox.appendChild(couplingTitle);
  centerBox.appendChild(couplingForm);
  couplingForm.appendChild(coupled_container);
  coupled_container.appendChild(coupledWith);
  coupled_container.appendChild(coupledInput);

  couplingForm.appendChild(dependant_container);
  dependant_container.appendChild(Dependency);
  dependant_container.appendChild(dependencyInputClass);
  
  dependencyInputClass.appendChild(dependencyInput1);
  dependencyInputClass.appendChild(dependencyLabel1);
  
  dependencyInputClass.appendChild(dependencyInput2);
  dependencyInputClass.appendChild(dependencyLabel2);

  dependencyInputClass.appendChild(dependencyInput3);
  dependencyInputClass.appendChild(dependencyLabel3);
  
  dependencyInputClass.appendChild(dependencyInput4);
  dependencyInputClass.appendChild(dependencyLabel4);
  
  dependencyInputClass.appendChild(dependencyInput5);
  dependencyInputClass.appendChild(dependencyLabel5);


  couplingForm.appendChild(numDependancies_container);
  numDependancies_container.appendChild(numDependanciesLabel);
  numDependancies_container.appendChild(numDependanciesInput);

  centerBox.appendChild(cohesionTitle);

  centerBox.appendChild(cohesionForm);
  cohesionForm.appendChild(MethodsLabelContainer);
  MethodsLabelContainer.appendChild(MethodsLabel);
  cohesionForm.appendChild(Add_Method_button);

  // Append the new container to the container wrapper
  document.getElementById("containerWrapper").appendChild(container);
}

