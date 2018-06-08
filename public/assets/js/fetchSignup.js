document.getElementById('signup-form').addEventListener('submit', userSignup);

const baseUrl = 'https://mtrack-app.herokuapp.com';

const htmlElementDisplay = (htmlId, displayStyle) => {
  document.getElementById(htmlId).style.display = displayStyle;
}

function userSignup(event) {

  htmlElementDisplay('signup-process', 'block');
  htmlElementDisplay('signup-form', 'none');

  event.preventDefault();

  let userEmail = document.getElementById('email').value;
  let userPassword = document.getElementById('password').value;
  let userDepartment = document.getElementById('department').value;
  let myUsername = document.getElementById('username').value;

  fetch(baseUrl + '/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail, password: userPassword, username: myUsername, department: userDepartment })
  }).then((response) => { return response.json() })
    .then((data) => {

      if (data.status == 'success') {

        htmlElementDisplay('success-box', 'block');
        htmlElementDisplay('signup-process', 'none');
        htmlElementDisplay('signup-form', 'none');
        htmlElementDisplay('form-footer', 'none');

      } else {

        htmlElementDisplay('signup-process', 'none');
        htmlElementDisplay('success-box', 'none');
        htmlElementDisplay('signup-form', 'block');
        htmlElementDisplay('error', 'block');
        document.getElementById('error').innerHTML = data.message;
      }
    }
    )
    .catch((err) => console.log(err))
}
