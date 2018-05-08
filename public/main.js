var fullName = document.querySelector('#fullName');
var fullNameIcon = document.querySelector('#fullNameIcon');
var errorMessage = document.querySelector('#formError');
var formSubmit = document.querySelector('#formSubmit');

fullName.addEventListener('blur', function(event) {
  var value = event.target.value;
  var isLetters = RegExp('^[a-zA-Z ]*$').test(value);
  if (isLetters) {
    fullNameIcon.style.visibility = 'hidden';
    errorMessage.textContent = '';
  } else {
    fullNameIcon.style.visibility = 'visible';
    errorMessage.textContent =
      'Names cannot contain numbers or special characters';
  }
});
