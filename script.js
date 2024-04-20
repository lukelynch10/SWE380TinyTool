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


function add_componentNameInput(dropdownMenu, centerContainer)
{

  let header = document.createElement("div");
  header.className = "header";
  header.innerHTML = "Overall Coupling:<br>Overall Cohesion:";

  let componentName = document.createElement("input");
  componentName.type = "text";
  componentName.id = "componentName";
  componentName.placeholder = "Enter component name";

  let buttons = document.createElement("div");
  buttons.className = "d-grid gap-2 d-md-block";
  buttons.style = "margin-top: 10px;"

  let CancelButton = document.createElement("button");
  CancelButton.className = "btn btn-danger";
  CancelButton.innerHTML = "Cancel";

  let SaveButton = document.createElement("button");
  SaveButton.className = "btn btn-primary";
  SaveButton.innerHTML = "Save";
  SaveButton.style = "margin-left: 10px;"

  dropdownMenu.appendChild(header);

  centerContainer.appendChild(componentName);

  centerContainer.appendChild(buttons);
  buttons.appendChild(CancelButton);
  buttons.appendChild(SaveButton);

  SaveButton.addEventListener("click", function() {
    dropdownMenu.classList.remove("show");
});

CancelButton.addEventListener("click", function() {
  dropdownMenu.classList.remove("show");
});
}

function add_dependencyInput(dependencyContainer, number)
{
  var radioButton = document.createElement("input");
  radioButton.name = "dependencyInput";
  radioButton.id = "dependencyInput";
  radioButton.value = number;
  radioButton.type = "radio";
  radioButton.style = "margin-right: 10px;"


  var label = document.createElement("label");
  label.style = "margin-right: 2px;"

  label.innerHTML = number;

  label.appendChild(radioButton);

  var radioButton_container = document.createElement("radioButtonsContainer");
  radioButton_container.className = "radioButtonsContainer";

  radioButton_container.appendChild(label);
  radioButton_container.appendChild(radioButton);

  dependencyContainer.appendChild(radioButton_container);

}


function addCouplingForm(centerContainer)
{

  let couplingForm = document.createElement("form");
  couplingForm.className = "form";

  let coupled_container = document.createElement("div");
  coupled_container.className = "coupled_container";

  let couplingTitle = document.createElement("label");
  couplingTitle.classname = "couplingTitle";
  couplingTitle.innerHTML = "Coupling Data";
  couplingTitle.style = "font-size: 50px; font-weight: bold; margin-top: 10px;"

  let coupledWith = document.createElement("label");
  coupledWith.classname = "coupledWith";
  coupledWith.innerHTML = "Component Coupled With ";
  coupledWith.style = "margin-right: 10px;";


  let coupledInput = document.createElement("input");
  coupledInput.type = "text";
  coupledInput.id = "coupledWith";
  coupledInput.placeholder = "Enter component name";


  let dependant_container = document.createElement("div");
  dependant_container.className = "dependant_container";

  let Dependency = document.createElement("label");
  Dependency.classname = "Dependency";
  Dependency.innerHTML = "How dependent are they on each other:"

  let dependencyInputClass = document.createElement("div");
  dependencyInputClass.className = "form-check form-check-inline";

  add_dependencyInput(dependencyInputClass, 1);
  add_dependencyInput(dependencyInputClass, 2);
  add_dependencyInput(dependencyInputClass, 3);
  add_dependencyInput(dependencyInputClass, 4);
  add_dependencyInput(dependencyInputClass, 5);



  let numDependancies_container = document.createElement("div");
  numDependancies_container.className = "numDependancies_container";

  let numDependanciesLabel = document.createElement("label");
  numDependanciesLabel.classname = "numDependanciesLabel";
  numDependanciesLabel.innerHTML = "Number of Dependencies ";
  numDependanciesLabel.style = "margin-right: 10px;";

  let numDependanciesInput = document.createElement("input");
  numDependanciesInput.type = "text";
  numDependanciesInput.id = "numDependanciesInput";
  numDependanciesInput.placeholder = "Number of Dependencies";


  centerContainer.appendChild(couplingTitle);
  centerContainer.appendChild(couplingForm);
  couplingForm.appendChild(coupled_container);
  coupled_container.appendChild(coupledWith);
  coupled_container.appendChild(coupledInput);

  couplingForm.appendChild(dependant_container);
  dependant_container.appendChild(Dependency);
  dependant_container.appendChild(dependencyInputClass);


  couplingForm.appendChild(numDependancies_container);
  numDependancies_container.appendChild(numDependanciesLabel);
  numDependancies_container.appendChild(numDependanciesInput);
}


function addCohesionForm(centerContainer)
{
  let cohesionTitle = document.createElement("label");
  cohesionTitle.classname = "cohesionTitle";
  cohesionTitle.innerHTML = "Cohesion Data";
  cohesionTitle.style = "font-size: 50px; font-weight: bold; margin-top: 10px;"

  let cohesionForm = document.createElement("form");
  cohesionForm.className = "form";


  let MethodsLabelContainer = document.createElement("div");
  MethodsLabelContainer.className = "MethodsLabelContainer";
  MethodsLabelContainer.stype = "align-items: center; justify-content: center; display: flex; flex-direction: column; margin-top: 10px;";

  let MethodsLabel = document.createElement("label");
  MethodsLabel.classname = "MethodsLabel";
  MethodsLabel.innerHTML = "Methods:"
  MethodsLabel.style = "font-size: 30px; font-weight: bold; margin-top: 10px";

  
  let Add_Method_button = document.createElement("button");
  Add_Method_button.className = "btn btn-primary";
  Add_Method_button.innerHTML = "+Add a Method";

  centerContainer.appendChild(cohesionTitle);

  centerContainer.appendChild(cohesionForm);
  cohesionForm.appendChild(MethodsLabelContainer);
  MethodsLabelContainer.appendChild(MethodsLabel);
  cohesionForm.appendChild(Add_Method_button);
}


function addComponent() {
  // Create a new container element
  let container = document.createElement("div");
  container.className = "container-component";
  
  let card = document.createElement("div");
  card.className = "card-component";
  card.innerHTML = "Name:<br><br>Coupled:<br><br>Cohesion:<br>"

  let deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-delete";

  let editButton = document.createElement("button");
  editButton.className = "btn btn-edit";


  let dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu"
  dropdownMenu.style = "background-color: #fdfbee;"


  let centerBox = document.createElement("div");
  centerBox.className = "center-box";

  add_componentNameInput(dropdownMenu, centerBox);

  dropdownMenu.appendChild(centerBox);


  addCouplingForm(centerBox);

  addCohesionForm(centerBox);



  deleteButton.addEventListener('click', function() {
    container.remove();
  });

  editButton.addEventListener('click', function() {
    dropdownMenu.classList.toggle("show");
  });


  container.appendChild(card);
  card.appendChild(deleteButton);
  card.appendChild(editButton);

  card.appendChild(dropdownMenu);


  document.getElementById("containerWrapper").appendChild(container);
}

