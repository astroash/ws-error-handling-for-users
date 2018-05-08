var firstName = document.querySelector('#firstName');
var firstNameIcon = document.querySelector('#firstNameIcon');
var errorMessage = document.querySelector('#formError');

firstName.addEventListener('blur', function(event) {
  var value = event.target.value;
  var isLetters = RegExp('^[a-zA-Z s]*$').test(value);
  if (isLetters) {
    firstNameIcon.style.visibility = 'hidden';
    errorMessage.style.visibility = 'hidden';
    errorMessage.textContent = '';
  } else {
    firstNameIcon.style.visibility = 'visible';
    errorMessage.style.visibility = 'visible';
    errorMessage.textContent =
      'Names cannot contain numbers or special characters';
  }
  console.log(isLetters);
});
