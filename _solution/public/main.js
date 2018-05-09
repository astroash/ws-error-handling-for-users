var fullName = document.querySelector('#fullName');
var fullNameIcon = document.querySelector('#fullNameIcon');
var userName = document.querySelector('#userName');
var userNameIcon = document.querySelector('#userNameIcon');
var password = document.querySelector('#password');
var passwordIcon = document.querySelector('#passwordIcon');
var confirmPassword = document.querySelector('#confirmPassword');
var confirmPasswordIcon = document.querySelector('#confirmPasswordIcon');

var errorMessage = document.querySelector('#formError');
var formSubmit = document.querySelector('#formSubmit');

// Repetitive Solution
// fullName.addEventListener('blur', function(event) {
//   var value = event.target.value;
//   var isLetters = RegExp('^[a-zA-Z ]*$').test(value);
//   if (isLetters) {
//     fullNameIcon.style.visibility = 'hidden';
//     errorMessage.textContent = '';
//   } else {
//     fullNameIcon.style.visibility = 'visible';
//     errorMessage.textContent =
//       'Names cannot contain numbers or special characters';
//   }
// });

// userName.addEventListener('blur', function(event) {
//   var value = event.target.value;
//   var hasNoSpecialCharacters = RegExp('^[a-zA-Z0-9_]*$').test(value);
//   if (hasNoSpecialCharacters) {
//     userNameIcon.style.visibility = 'hidden';
//     errorMessage.textContent = '';
//   } else {
//     userNameIcon.style.visibility = 'visible';
//     errorMessage.textContent = 'Usernames cannot contain special characters';
//   }
// });

// password.addEventListener('blur', function(event) {
//   var value = event.target.value;
//   var strongPassword = RegExp(
//     '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
//   ).test(value);
//   if (value.length === 0 || strongPassword) {
//     passwordIcon.style.visibility = 'hidden';
//     errorMessage.textContent = '';
//   } else {
//     passwordIcon.style.visibility = 'visible';
//     errorMessage.textContent =
//       'Passwords must contain 1 uppercase, 1 lowercase letter, 1 number or special character and be at least 8 characters';
//   }
// });

// confirmPassword.addEventListener('blur', function(event) {
//   var value = event.target.value;
//   if (password.value === value) {
//     confirmPasswordIcon.style.visibility = 'hidden';
//     errorMessage.textContent = '';
//   } else {
//     confirmPasswordIcon.style.visibility = 'visible';
//     errorMessage.textContent = 'Both passwords must match';
//   }
// });

// Refactored Solution

function createErrorEventListener(element, errorCondition, errorIcon, errorMsg) { 
  element.addEventListener('blur', function(event) {
    var value = event.target.value;
    if (errorCondition(value)) {
      errorIcon.style.visibility = 'hidden';
      errorMessage.textContent = '';
    } else {
      errorIcon.style.visibility = 'visible';
      errorMessage.textContent = errorMsg;
    }
  });
};

var isLetters = function(value){
  return RegExp('^[a-zA-Z ]*$').test(value)
};

var hasNoSpecialCharacters = function(value){
  return RegExp('^[a-zA-Z0-9_]*$').test(value)
};

var isPasswordStrong = function(value){
  return value.length === 0 || RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
};

var arePasswordsMatching = function(value){
  return password.value === value
};

createErrorEventListener(fullName, isLetters, fullNameIcon, 'Names cannot contain numbers or special characters'
);

createErrorEventListener(userName, hasNoSpecialCharacters, userNameIcon, 'Usernames cannot contain special characters'
);

createErrorEventListener(password, isPasswordStrong, passwordIcon, 'Passwords must contain 1 uppercase, 1 lowercase letter, 1 number or special character and be at least 8 characters'
);

createErrorEventListener(confirmPassword, arePasswordsMatching, confirmPasswordIcon, 'Both passwords must match'
);

formSubmit.addEventListener('click' ,function(event){
  event.preventDefault()
  if (fullName.value.length > 0
  && isLetters(fullName.value)
  && userName.value.length > 0
  && hasNoSpecialCharacters(userName.value) 
  && password.value.length > 0
  && isPasswordStrong(password.value)
  && arePasswordsMatching(confirmPassword.value)
) {
      var data = JSON.stringify({
        fullName: fullName.value,
        userName: userName.value,
        password: password.value
      })
      fetch('/api/form', { 
        headers: { 'content-type': 'application/json' },
        method: 'POST', 
        body: data 
      })
      .then(res => res.json())
      .then(res => {
        if (res.error){
          errorMessage.textContent = res.message;
        } else if (res.success) {
          window.location = '/success';
        }
      })
      .catch(err => {
        errorMessage.textContent = 'There has been an error submitting your form. Please try again later.';
      })
    } else {
      errorMessage.textContent = 'Please complete the form before submitting';
    } 
})