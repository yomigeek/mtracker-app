document.getElementById('signup-form').addEventListener('submit', userSignup);

const baseUrl = 'https://mtrack-app.herokuapp.com';

function userSignup(event) {

  document.querySelector('#signup-process').style.display = 'block';
  document.querySelector('#signup-form').style.display = 'none';

  event.preventDefault();

  let userEmail = document.getElementById('email').value;
  let userPassword = document.getElementById('password').value;
  let userDepartment = document.getElementById('department').value;
  let userFullname = document.getElementById('fullname').value;

  fetch(baseUrl + '/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail, password: userPassword, fullname: userFullname, department: userDepartment })
  }).then((response) => { return response.json() })
    .then((data) => {

      if (data.status == 'success') {

        document.getElementById('success-box').style.display = 'block';
        document.getElementById('signup-process').style.display = 'none';
        document.querySelector('#signup-form').style.display = 'none';

      } else {
        document.getElementById('signup-process').style.display = 'none';
        document.getElementById('success-box').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerHTML = data.message;
      }
    }
    )
    .catch((err) => console.log(err))
}
