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




//Coupling Fenton and Melton
function calculateCoup(numberDepencies, DepencyLevel, couplinglevel) {
  console.log(couplinglevel);
  let n = parseInt(numberDepencies)
  let i = parseInt(DepencyLevel);
  couplinglevel = i + n / (n + 1);
  $("#couplingResult").text(couplinglevel.toFixed(2));
  couplingAdded += couplinglevel;
  $('#totalCoupling').text(couplingAdded.toFixed(2));
  return couplinglevel.toFixed(2);
  }


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

  let numDepencies = 0;
  let DepencyLevel = 0;
  let couplingLevelValue = 0;

  let container = document.createElement("div");
  container.className = "container-component";
  
  let card = document.createElement("div");
  card.className = "card-component";

  let nameContainer = document.createElement("div");
  nameContainer.className = "nameContainer";
  nameContainer.style = "margin-left: -30px;"

  let name = document.createElement("label");
  name.className = "name";
  name.innerHTML = "Component: ";
  name.style = "margin-right: 10px;"

  let ComponentName = document.createElement("p");
  ComponentName.className = "text";
  ComponentName.id = "ComponentName";
  ComponentName.style = "display: inline-block;"


  let cohesionContainer = document.createElement("div");
  cohesionContainer.className = "cohesionContainer";
  cohesionContainer.style = "margin-left: -30px;"

  let CohesionLevel_Label = document.createElement("label");
  CohesionLevel_Label.className = "CohesionLevel_Label";
  CohesionLevel_Label.innerHTML = "Cohesion Level: ";

  let CohesionLevel = document.createElement("p");
  CohesionLevel.className = "CohesionLevel";
  CohesionLevel.id = "CohesionLevel";


  let couplingContainer = document.createElement("div");
  couplingContainer.className = "couplingContainer";
  couplingContainer.style = "margin-left: -30px;"

  let couplingLevel_Label = document.createElement("label");
  couplingLevel_Label.className = "couplingLevel_Label";
  couplingLevel_Label.innerHTML = "Coupling Level: ";

  let couplingLevel = document.createElement("p");
  couplingLevel.className = "couplingLevel";
  couplingLevel.id = "couplingLevel";

  let deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-delete";

  let editButton = document.createElement("button");
  editButton.className = "btn btn-edit";
  editButton.style.alignItems = "left";


  let dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu"
  dropdownMenu.style = "background-color: #fdfbee;"
  dropdownMenu.style.overflowY = "scroll";

  let centerBox = document.createElement("div");
  centerBox.className = "center-box";

  add_componentNameInput(dropdownMenu, centerBox, ComponentName);

  dropdownMenu.appendChild(centerBox);


  addCouplingForm(centerBox);
  addCohesionForm(centerBox);


  deleteButton.addEventListener('click', function() {
    couplingAdded -= couplingLevelValue;
    $('#totalCoupling').text(couplingAdded.toFixed(2));
    container.remove();
  });

  editButton.addEventListener('click', function() {
    dropdownMenu.classList.toggle("show");
  });


  container.appendChild(card);

  card.appendChild(nameContainer);
  nameContainer.appendChild(name);
  nameContainer.appendChild(ComponentName);

  card.appendChild(cohesionContainer);
  cohesionContainer.appendChild(CohesionLevel_Label);
  cohesionContainer.appendChild(CohesionLevel);

  card.appendChild(couplingContainer);
  couplingContainer.appendChild(couplingLevel_Label);
  couplingContainer.appendChild(couplingLevel);

  card.appendChild(deleteButton);
  card.appendChild(editButton);

  card.appendChild(dropdownMenu);
  document.getElementById("containerWrapper").appendChild(container);




function add_componentNameInput(dropdownMenu, centerContainer, Name)
{
  var CompName = " "
  let header = document.createElement("div");
  header.className = "header";

  let headerCouplingContainer = document.createElement("div");
  headerCouplingContainer.className = "headerCouplingContainer";

  let couplingLabel = document.createElement("label");
  couplingLabel.className = "couplingLabel";
  couplingLabel.innerHTML = "Overall Coupling: ";

  let couplingValue = document.createElement("p");
  couplingValue.className = "couplingValue";

  let headerCohesionContainer = document.createElement("div");
  headerCohesionContainer.className = "headerCohesionContainer";

  let cohesionLabel = document.createElement("label");
  cohesionLabel.className = "cohesionLabel";
  cohesionLabel.innerHTML = "Overall Cohesion: ";

  let cohesionValue = document.createElement("p");
  cohesionValue.className = "cohesionValue";



  let componentName = document.createElement("input");
  componentName.type = "text";
  componentName.id = "componentName";
  componentName.placeholder = "Enter component name";

  componentName.addEventListener("input", function() {
    CompName = this.value;
  });

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
  header.appendChild(headerCouplingContainer);
  headerCouplingContainer.appendChild(couplingLabel);
  headerCouplingContainer.appendChild(couplingValue);

  header.appendChild(headerCohesionContainer);
  headerCohesionContainer.appendChild(cohesionLabel);
  headerCohesionContainer.appendChild(cohesionValue);

  centerContainer.appendChild(componentName);

  centerContainer.appendChild(buttons);
  buttons.appendChild(CancelButton);
  buttons.appendChild(SaveButton);

  SaveButton.addEventListener("click", function() {
    Name.innerHTML = CompName;
    couplingAdded -= couplingLevelValue;
    couplingLevelValue = calculateCoup(numDepencies, DepencyLevel, couplingLevelValue);
    couplingLevel.innerHTML = couplingLevelValue;
    couplingValue.innerHTML = couplingLevelValue;


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

  radioButton.addEventListener("change", function() {
    DepencyLevel = radioButton.value;
});
}


function addCouplingForm(centerContainer, numberDepencies, DepLevel)
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
  numDependanciesInput.id = "dependencies";
  numDependanciesInput.name = "dependencies";
  numDependanciesInput.placeholder = "Number of Dependencies";


  numDependanciesInput.addEventListener("input", function() {
    numDepencies = numDependanciesInput.value;
  });


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

  let cohesionForm = document.createElement("div");
  cohesionForm.className = "form";


  let MethodsLabelContainer = document.createElement("div");
  MethodsLabelContainer.className = "MethodsLabelContainer";
  MethodsLabelContainer.stype = "align-items: center; justify-content: center; display: flex; flex-direction: column; margin-top: 10px;";

  let MethodsLabel = document.createElement("label");
  MethodsLabel.classname = "MethodsLabel";
  MethodsLabel.innerHTML = "Methods:"
  MethodsLabel.style = "font-size: 30px; font-weight: bold; margin-top: 10px";



  let AddMethod_Button = document.createElement("button");
  AddMethod_Button.className = "btn btn-primary";
  AddMethod_Button.innerHTML = "+Add Method";
  AddMethod_Button.style = "margin-left: 10px;"

  centerContainer.appendChild(cohesionTitle);

  centerContainer.appendChild(cohesionForm);
  cohesionForm.appendChild(MethodsLabelContainer);
  MethodsLabelContainer.appendChild(MethodsLabel);
  cohesionForm.appendChild(AddMethod_Button);


  AddMethod_Button.addEventListener("click", function() {
    addMethod(cohesionForm);
  });
}

function addMethod(cohesion_Form)
{
  let container = document.createElement("div");
  container.className = "container-method";
  
  let card = document.createElement("div");
  card.className = "card-method";
  card.innerHTML = "Method Name"

  let deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-method-delete";

  let editButton = document.createElement("button");
  editButton.className = "btn btn-method-edit";


  let popUp_MenuMethod = document.createElement("div");
  popUp_MenuMethod.className = "pop-menu-method"
  popUp_MenuMethod.style = "background-color: #ffffff; "
  popUp_MenuMethod.style.display = "none";



  addMethodAttribute(popUp_MenuMethod);

  container.appendChild(card);
  card.appendChild(deleteButton);
  card.appendChild(editButton);
  cohesion_Form.appendChild(container);

  card.appendChild(popUp_MenuMethod);

  
  deleteButton.addEventListener('click', function() {
    container.remove();
  });

  editButton.addEventListener('click', function() {
    popUp_MenuMethod.style.display = "block";
  });
}


function addMethodAttribute(popUp_MenuMethod)
{
  let buttons = document.createElement("div");
  buttons.className = "d-grid gap-2 d-md-block";
  buttons.style = "margin-bottom: 10px; background-color: #ffffff;"

  let CancelButton = document.createElement("button");
  CancelButton.className = "btn btn-danger";
  CancelButton.innerHTML = "Cancel";
  CancelButton.style = "margin-right: 100px; width: 100px;"

  let SaveButton = document.createElement("button");
  SaveButton.className = "btn btn-primary";
  SaveButton.innerHTML = "Save";
  SaveButton.style = "margin-left: 100px; width: 100px;"

  let Box = document.createElement("div");
  Box.className = "Box";
  Box.style.backgroundColor = "#ffffff";

  let Title = document.createElement("div");
  Title.className = "header";
  Title.innerHTML = "Method Information";
  Title.style.textAlign = "center";



  let methodNameContainer = document.createElement("div");
  methodNameContainer.className = "methodNameContainer";
  methodNameContainer.style = "display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 20px;, margin-bottom: 40px; background-color: #ffffff;"

  let methodNameLabel = document.createElement("label");
  methodNameLabel.classname = "methodNameLabel";
  methodNameLabel.innerHTML = "Name:  ";
  methodNameLabel.style = "margin-right: 15px;";

  let methodNameInput = document.createElement("input");
  methodNameInput.type = "text";
  methodNameInput.id = "methodName";
  methodNameInput.placeholder = "Enter method name";



  let numAttributesContainer = document.createElement("div");
  numAttributesContainer.className = "numAttributesContainer";
  numAttributesContainer.style = "display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 100px; margin-bottom: 30px; background-color: #ffffff;"

  let NumAttributesLabel = document.createElement("label");
  NumAttributesLabel.classname = "NumAttributes";
  NumAttributesLabel.innerHTML = "Number of distinct accessed attributes:";
  NumAttributesLabel.style = "margin-right: 10px;";


  let NumAttributesInput = document.createElement("input");
  NumAttributesInput.type = "text";
  NumAttributesInput.id = "NumAttributesInput";


  let numInvokesContainer = document.createElement("div");
  numInvokesContainer.className = "numInvokesContainer";
  numInvokesContainer.style = "display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 100px; margin-bottom: 100px;"

  let numInvokesLabel = document.createElement("label");
  numInvokesLabel.classname = "numInvokesLabel";
  numInvokesLabel.innerHTML = "Number of times this method invlokes another method: ";
  numInvokesLabel.style = "margin-right: 10px;";


  let numInvokesInput = document.createElement("input");
  numInvokesInput.type = "text";
  numInvokesInput.id = "numInvokesInput";

  popUp_MenuMethod.appendChild(Box);
  Box.appendChild(Title);
  Box.appendChild(methodNameContainer);
  methodNameContainer.appendChild(methodNameLabel);
  methodNameContainer.appendChild(methodNameInput);

  Box.appendChild(numAttributesContainer);
  numAttributesContainer.appendChild(NumAttributesLabel);
  numAttributesContainer.appendChild(NumAttributesInput);

  Box.appendChild(numInvokesContainer);
  numInvokesContainer.appendChild(numInvokesLabel);
  numInvokesContainer.appendChild(numInvokesInput);

  Box.appendChild(buttons);
  buttons.appendChild(CancelButton);
  buttons.appendChild(SaveButton);


  SaveButton.addEventListener("click", function() {
    popUp_MenuMethod.style.display = "none";
  });

  CancelButton.addEventListener("click", function() {
    popUp_MenuMethod.style.display = "none";
  });
}

}


