/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/


function loadStates() {
	var selector = document.getElementsByName('state')[0];
	for(var i = 0; i < usStates.length; i++) {
		var option = document.createElement('option');
		option.value = usStates[i].code;
		option.innerHTML = usStates[i].name;
		selector.appendChild(option);
	}
}

function checkOther() {
	var occupation = this.value;
	var occupationOther = document.getElementsByName('occupationOther')[0];
	if(occupation == 'other') {
		occupationOther.style.display = 'block';
	} else {
		occupationOther.style.display = 'none';
	}
}

function cancel() {
	if(confirm("You sure you want to leave?")) {
		window.location = 'http://google.com';
	}
}

function validateForm() {
	var firstName = document.getElementById('firstName');
	var lastName = document.getElementById('lastName');
	var address = document.getElementById('address1');
	var city = document.getElementById('city');
	var state = document.getElementById('state');

	var zipRegExp = new RegExp('^\\d{5}$');
	var zip = document.getElementById('zip');

	var birthday = document.getElementById('birthdate');
	var validForm = true;
	validForm = valid(firstName) && validForm;
	validForm = valid(lastName) && validForm;
	validForm = valid(address) && validForm;
	validForm = valid(city) && validForm;
	validForm = valid(state) && validForm;

	//Test zip
	var validZip = zipRegExp.test(zip.value);
	if(!validZip) {
		zip.className = zip.className + " invalid";
	} else {
		zip.className = "form-control";
	}
	validForm = validZip && validForm;

	//Test age
	var hasBirth = valid(birthdate);
	if(hasBirth) {
		var diff = moment().diff(birthdate.value, 'years');
		if(diff < 13) {
			birthdate.className = birthdate.className + " invalid";
			document.getElementById('birthdateMessage').innerHTML = "You have to be at least 13 kid!";
			hasBirth = false;
		} else {
			birthdate.className = "form-control";
			document.getElementById('birthdateMessage').innerHTML = "";
		}
	}
	validForm = hasBirth && validForm;

	//Test occupation
	var occ = document.getElementById('occupation');
	if(occ.value == 'other') {
		var occupationOther = document.getElementsByName('occupationOther')[0];
		validForm = valid(occupationOther) && validForm;
	}

	return validForm
}

function valid(field) {
	if (field.value.trim().length < 1) {
		field.className = field.className + " invalid";
		return false;
	} else {
		field.className = "form-control";
		return true;
	}
}

function onSubmit(evt) {
	var valid = validateForm();
    if (evt.preventDefault && !valid) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return evt.returnValue;
}


document.addEventListener('DOMContentLoaded', function() {
	loadStates();
	//Add the other occupation box
	document.getElementById('occupation').addEventListener('change', checkOther);
	//Confirm if the user wants to leave the page
	document.getElementById('cancelButton').addEventListener('click', cancel);
	//Check for sumbit
	document.getElementById('signup').addEventListener('submit', onSubmit);
});