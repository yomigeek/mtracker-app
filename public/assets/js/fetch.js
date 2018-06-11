document.getElementById('postForm').addEventListener('submit', userLogin);

const baseUrl = 'https://mtrack-app.herokuapp.com';


const htmlElementDisplay = (htmlId, displayStyle) => {
  document.getElementById(htmlId).style.display = displayStyle;
}

function userLogin(event) {

  htmlElementDisplay('working-msg', 'block');
  htmlElementDisplay('postForm', 'none');

  event.preventDefault();

  let userEmail = document.getElementById('emailtext').value;
  let userPassword = document.getElementById('passwordtext').value;


  fetch(baseUrl + '/api/v1/auth/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail, password: userPassword })
  }).then((response) => { return response.json() })
    .then((data) => {
      if (data.status == 'success') {

        htmlElementDisplay('working-msg', 'none');
        htmlElementDisplay('success-msg', 'block');
        htmlElementDisplay('postForm', 'none');
        htmlElementDisplay('form-footer', 'none');

        // const url = document.getElementById('url').value;

        localStorage.setItem("token", data.data.mytoken);
        localStorage.setItem("name", data.data.username);
        console.log(data.data.role);

        if (data.data.role == 'user') {
          window.location.href = '/user_dashboard.html';
        }
        if (data.data.role == 'admin') {
          window.location.href = '/admin_dashboard.html';
        }

      } else {

        htmlElementDisplay('postForm', 'block');
        htmlElementDisplay('error', 'block');
        htmlElementDisplay('working-msg', 'none');
        htmlElementDisplay('form-footer', 'block');
        document.getElementById('error').innerHTML = data.message;
      }
    }
    )
    .catch((err) => console.log(err))
}
